begin;

-- A new ledger starts the visible visit counter at zero. Historical aggregate
-- rows retain their retention policy and are no longer part of visitor reports.
create table arena_private.browser_visits (
  browser_hash bytea primary key,
  first_seen date not null default ((now() at time zone 'Europe/Istanbul')::date),
  excluded boolean not null default false
);
alter table arena_private.browser_visits enable row level security;
revoke all on arena_private.browser_visits from public, anon, authenticated;

-- The public collector can insert one pseudonymous row and cannot read rows.
create function public.arena_record_browser_visit(p_browser_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_origin text := coalesce(nullif(current_setting('request.headers', true), ''), '{}')::jsonb ->> 'origin';
begin
  if not exists (select 1 from arena_private.settings where singleton and v_origin = any(allowed_origins)) then
    raise exception 'Origin not allowed' using errcode = '42501';
  end if;
  if p_browser_id is null then
    raise exception 'Browser identifier required' using errcode = '22023';
  end if;
  insert into arena_private.browser_visits (browser_hash)
  values (pg_catalog.sha256(pg_catalog.uuid_send(p_browser_id)))
  on conflict (browser_hash) do nothing;
end;
$$;
revoke all on function public.arena_record_browser_visit(uuid) from public, anon, authenticated;
grant execute on function public.arena_record_browser_visit(uuid) to anon;

-- A verified owner may exclude their current browser, including any earlier visit.
create function public.arena_exclude_browser(p_browser_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not exists (
    select 1 from arena_private.settings s join auth.users u on u.id = s.owner_user_id
    where s.singleton and s.owner_user_id = auth.uid() and u.email_confirmed_at is not null
  ) then
    raise exception 'Owner access required' using errcode = '42501';
  end if;
  if p_browser_id is null then
    raise exception 'Browser identifier required' using errcode = '22023';
  end if;
  insert into arena_private.browser_visits (browser_hash, excluded)
  values (pg_catalog.sha256(pg_catalog.uuid_send(p_browser_id)), true)
  on conflict (browser_hash) do update set excluded = true;
end;
$$;
revoke all on function public.arena_exclude_browser(uuid) from public, anon, authenticated;
grant execute on function public.arena_exclude_browser(uuid) to authenticated;

create or replace function public.arena_record_count(p_kind text, p_game_id text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_origin text := coalesce(nullif(current_setting('request.headers', true), ''), '{}')::jsonb ->> 'origin';
begin
  if not exists (select 1 from arena_private.settings where singleton and v_origin = any(allowed_origins)) then
    raise exception 'Origin not allowed' using errcode = '42501';
  end if;
  -- Cached pages can continue calling this endpoint during the rollout.
  if p_kind = 'site_visit' and p_game_id is null then return; end if;
  if p_kind is distinct from 'game_open' or not exists (select 1 from arena_private.games where id = p_game_id) then
    raise exception 'Invalid count' using errcode = '22023';
  end if;
  insert into arena_private.daily_counts(day, game_id, opens)
  values ((now() at time zone 'Europe/Istanbul')::date, p_game_id, 1)
  on conflict (day, game_id) do update set opens = arena_private.daily_counts.opens + 1;
end;
$$;

create or replace function public.arena_read_counts(p_days integer default 30)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_today date := (now() at time zone 'Europe/Istanbul')::date;
  v_start date;
  v_visits bigint;
  v_summary jsonb;
  v_daily jsonb;
  v_games jsonb;
begin
  if not exists (
    select 1 from arena_private.settings s join auth.users u on u.id = s.owner_user_id
    where s.singleton and s.owner_user_id = auth.uid() and u.email_confirmed_at is not null
  ) then
    raise exception 'Owner access required' using errcode = '42501';
  end if;
  if p_days is null or p_days not in (7, 30, 90) then
    raise exception 'Invalid date range' using errcode = '22023';
  end if;
  v_start := v_today - (p_days - 1);
  select count(*) into v_visits from arena_private.browser_visits where not excluded;
  select jsonb_build_object('visits', v_visits, 'visitors', v_visits,
    'game_opens', coalesce(sum(opens), 0), 'played_games', count(distinct game_id), 'active_seconds', null)
  into v_summary from arena_private.daily_counts where game_id <> '' and day between v_start and v_today;
  select coalesce(jsonb_agg(to_jsonb(d) order by d.day), '[]'::jsonb) into v_daily
  from (
    select to_char(v_start + days.offset_day, 'YYYY-MM-DD') as day, coalesce(b.visits, 0) as visits
    from generate_series(0, p_days - 1) as days(offset_day)
    left join (
      select first_seen, count(*) as visits from arena_private.browser_visits
      where not excluded and first_seen between v_start and v_today group by first_seen
    ) b on b.first_seen = v_start + days.offset_day
  ) d;
  select coalesce(jsonb_agg(to_jsonb(g) order by g.opens desc, g.name), '[]'::jsonb) into v_games
  from (
    select g.id, g.name, g.category, coalesce(sum(c.opens), 0) as opens
    from arena_private.games g left join arena_private.daily_counts c on c.game_id = g.id and c.day between v_start and v_today
    group by g.id, g.name, g.category
  ) g;
  return jsonb_build_object('days', p_days, 'summary', v_summary, 'daily', v_daily, 'games', v_games);
end;
$$;
revoke all on function public.arena_read_counts(integer) from public, anon, authenticated;
grant execute on function public.arena_read_counts(integer) to authenticated;
commit;
