begin;
create schema if not exists arena_private;
revoke all on schema arena_private from public, anon, authenticated;
create table if not exists arena_private.settings (
  singleton boolean primary key default true check (singleton),
  owner_user_id uuid,
  allowed_origins text[] not null default array['https://yarismaatolyesi.com','https://www.yarismaatolyesi.com']
);
insert into arena_private.settings(singleton) values (true) on conflict do nothing;
create table if not exists arena_private.games (id text primary key, name text not null, category text not null);
create table if not exists arena_private.events (
  event_id uuid primary key,
  visitor_id uuid not null,
  session_id uuid not null,
  kind text not null check (kind in ('site_visit','game_open','game_engagement')),
  game_id text references arena_private.games(id),
  seconds integer not null default 0 check (seconds between 0 and 60),
  received_at timestamptz not null default now(),
  check ((kind='site_visit' and game_id is null and seconds=0) or
         (kind='game_open' and game_id is not null and seconds=0) or
         (kind='game_engagement' and game_id is not null and seconds between 1 and 60))
);
create index if not exists arena_events_received on arena_private.events(received_at);
create index if not exists arena_events_session_time on arena_private.events(session_id,received_at);
create index if not exists arena_events_visitor_time on arena_private.events(visitor_id,received_at);
alter table arena_private.events enable row level security;
alter table arena_private.games enable row level security;
alter table arena_private.settings enable row level security;
revoke all on all tables in schema arena_private from public,anon,authenticated;
-- No table policies/grants: browsers can never read the raw event IDs or owner settings.
create or replace function public.arena_record_event(
 p_event_id uuid,p_visitor_id uuid,p_session_id uuid,p_kind text,
 p_game_id text default null,p_seconds integer default 0
) returns void language plpgsql security definer set search_path='' as $$
declare v_headers jsonb; v_origin text; v_count integer;
begin
 v_headers:=coalesce(nullif(current_setting('request.headers',true),''),'{}')::jsonb;
 v_origin:=v_headers->>'origin';
 if v_origin is null or not exists(select 1 from arena_private.settings s where s.singleton and v_origin=any(s.allowed_origins)) then
  raise exception 'Origin not allowed' using errcode='42501';
 end if;
 if p_event_id is null or p_visitor_id is null or p_session_id is null or p_kind is null or p_seconds is null or
    p_kind not in ('site_visit','game_open','game_engagement') or p_seconds not between 0 and 60 then
  raise exception 'Invalid event' using errcode='22023';
 end if;
 if p_kind='site_visit' and (p_game_id is not null or p_seconds<>0) then raise exception 'Invalid visit' using errcode='22023'; end if;
 if p_kind<>'site_visit' and not exists(select 1 from arena_private.games g where g.id=p_game_id) then raise exception 'Invalid game' using errcode='22023'; end if;
 if (p_kind='game_open' and p_seconds<>0) or (p_kind='game_engagement' and p_seconds<1) then raise exception 'Invalid duration' using errcode='22023'; end if;
 -- A public collector cannot establish a person's identity. Per-browser rate limits reduce accidental/spam inflation.
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_visitor_id::text,0));
 select count(*) into v_count from arena_private.events e where e.visitor_id=p_visitor_id and e.received_at>now()-interval '1 minute';
 if v_count>=120 then raise exception 'Rate limit' using errcode='54000'; end if;
 insert into arena_private.events(event_id,visitor_id,session_id,kind,game_id,seconds)
 values(p_event_id,p_visitor_id,p_session_id,p_kind,p_game_id,p_seconds)
 on conflict(event_id) do nothing;
end $$;
revoke all on function public.arena_record_event(uuid,uuid,uuid,text,text,integer) from public,anon,authenticated;
grant execute on function public.arena_record_event(uuid,uuid,uuid,text,text,integer) to anon,authenticated;
create or replace function public.arena_read_stats(p_days integer default 30)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_owner uuid; v_start timestamptz; v_summary jsonb; v_daily jsonb; v_games jsonb;
begin
 select owner_user_id into v_owner from arena_private.settings where singleton;
 if v_owner is null or auth.uid() is null or auth.uid()<>v_owner or
    not exists(select 1 from auth.users u where u.id=v_owner and u.email_confirmed_at is not null) then
  raise exception 'Owner access required' using errcode='42501';
 end if;
 if p_days is null or p_days not in (7,30,90) then raise exception 'Invalid date range' using errcode='22023'; end if;
 v_start:=(((now() at time zone 'Europe/Istanbul')::date-(p_days-1))::timestamp at time zone 'Europe/Istanbul');
 select jsonb_build_object('visitors',count(distinct visitor_id),'sessions',count(distinct session_id),
  'visits',count(*) filter(where kind='site_visit'),'game_opens',count(*) filter(where kind='game_open'),
  'active_seconds',coalesce(sum(seconds) filter(where kind='game_engagement'),0))
 into v_summary from arena_private.events where received_at>=v_start;
 select coalesce(jsonb_agg(to_jsonb(d) order by d.day),'[]'::jsonb) into v_daily from (
  select to_char(days.day,'YYYY-MM-DD') as day,count(distinct e.visitor_id) as visitors,
   count(*) filter(where e.kind='site_visit') as visits,count(*) filter(where e.kind='game_open') as game_opens
  from generate_series((v_start at time zone 'Europe/Istanbul')::date,(now() at time zone 'Europe/Istanbul')::date,interval '1 day') days(day)
  left join arena_private.events e on (e.received_at at time zone 'Europe/Istanbul')::date=days.day::date and e.received_at>=v_start
  group by days.day
 ) d;
 select coalesce(jsonb_agg(to_jsonb(g) order by g.opens desc,g.name),'[]'::jsonb) into v_games from (
  select c.id,c.name,c.category,count(*) filter(where e.kind='game_open') as opens,
   count(distinct e.visitor_id) filter(where e.kind='game_open') as visitors,
   coalesce(sum(e.seconds) filter(where e.kind='game_engagement'),0) as active_seconds
  from arena_private.games c left join arena_private.events e on e.game_id=c.id and e.received_at>=v_start
  group by c.id,c.name,c.category
 ) g;
 return jsonb_build_object('days',p_days,'timezone','Europe/Istanbul','generated_at',now(),'summary',v_summary,'daily',v_daily,'games',v_games);
end $$;
revoke all on function public.arena_read_stats(integer) from public,anon,authenticated;
grant execute on function public.arena_read_stats(integer) to authenticated;
create or replace function arena_private.purge_expired_events() returns void language sql security definer set search_path='' as $$
 delete from arena_private.events where received_at<now()-interval '90 days';
$$;
revoke all on function arena_private.purge_expired_events() from public,anon,authenticated;
-- Configure a daily pg_cron invocation at deployment; never grant this to a browser role.
commit;
