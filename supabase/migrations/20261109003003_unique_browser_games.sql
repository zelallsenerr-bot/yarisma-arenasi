begin;

-- Each browser contributes at most one opening to each game.
create table arena_private.browser_games (
  game_id text not null references arena_private.games(id),
  browser_hash bytea not null references arena_private.browser_visits(browser_hash) on delete cascade,
  primary key (game_id, browser_hash)
);
create index browser_games_browser_hash_idx on arena_private.browser_games(browser_hash);
alter table arena_private.browser_games enable row level security;
revoke all on arena_private.browser_games from public, anon, authenticated;

create function public.arena_record_browser_game(p_browser_id uuid, p_game_id text)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_origin text := coalesce(nullif(current_setting('request.headers', true), ''), '{}')::jsonb ->> 'origin';
  v_hash bytea;
begin
  if not exists (select 1 from arena_private.settings where singleton and v_origin = any(allowed_origins)) then
    raise exception 'Origin not allowed' using errcode = '42501';
  end if;
  if p_browser_id is null or not exists (select 1 from arena_private.games where id = p_game_id) then
    raise exception 'Invalid browser or game' using errcode = '22023';
  end if;
  v_hash := pg_catalog.sha256(pg_catalog.uuid_send(p_browser_id));
  -- The game request can finish before the page's visit request.
  insert into arena_private.browser_visits (browser_hash) values (v_hash)
  on conflict (browser_hash) do nothing;
  insert into arena_private.browser_games (game_id, browser_hash)
  select p_game_id, v_hash from arena_private.browser_visits
  where browser_hash = v_hash and not excluded
  on conflict (game_id, browser_hash) do nothing;
end;
$$;
revoke all on function public.arena_record_browser_game(uuid, text) from public, anon, authenticated;
grant execute on function public.arena_record_browser_game(uuid, text) to anon;

-- Old pages can still call this endpoint, but their page-load counters are retired.
create or replace function public.arena_record_count(p_kind text, p_game_id text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_origin text := coalesce(nullif(current_setting('request.headers', true), ''), '{}')::jsonb ->> 'origin';
begin
  if not exists (select 1 from arena_private.settings where singleton and v_origin = any(allowed_origins)) then
    raise exception 'Origin not allowed' using errcode = '42501';
  end if;
  if p_kind = 'site_visit' and p_game_id is null then return; end if;
  if p_kind = 'game_open' and exists (select 1 from arena_private.games where id = p_game_id) then return; end if;
  raise exception 'Invalid count' using errcode = '22023';
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
  select coalesce(jsonb_agg(to_jsonb(d) order by d.day), '[]'::jsonb) into v_daily
  from (
    select to_char(v_start + days.offset_day, 'YYYY-MM-DD') as day, coalesce(b.visits, 0) as visits
    from generate_series(0, p_days - 1) as days(offset_day)
    left join (
      select first_seen, count(*) as visits from arena_private.browser_visits
      where not excluded and first_seen between v_start and v_today group by first_seen
    ) b on b.first_seen = v_start + days.offset_day
  ) d;
  -- Join the exclusion flag at read time so a later owner login also removes old game openings.
  with game_counts as (
    select bg.game_id, count(*) as opens
    from arena_private.browser_games bg
    join arena_private.browser_visits b on b.browser_hash = bg.browser_hash and not b.excluded
    group by bg.game_id
  ), report_rows as (
    select g.id, g.name, g.category, coalesce(c.opens, 0) as opens
    from arena_private.games g left join game_counts c on c.game_id = g.id
  )
  select jsonb_build_object('visits', v_visits, 'visitors', v_visits,
    'game_opens', coalesce(sum(opens), 0), 'played_games', count(*) filter (where opens > 0), 'active_seconds', null),
    coalesce(jsonb_agg(to_jsonb(g) order by g.opens desc, g.name), '[]'::jsonb)
  into v_summary, v_games from report_rows g;
  return jsonb_build_object('days', p_days, 'summary', v_summary, 'daily', v_daily, 'games', v_games);
end;
$$;
revoke all on function public.arena_read_counts(integer) from public, anon, authenticated;
grant execute on function public.arena_read_counts(integer) to authenticated;
commit;
