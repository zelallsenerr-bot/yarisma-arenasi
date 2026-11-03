begin;
create table arena_private.daily_counts(day date not null,game_id text not null default '',opens bigint not null default 0 check(opens>=0),primary key(day,game_id));
alter table arena_private.daily_counts enable row level security;
revoke all on arena_private.daily_counts from public,anon,authenticated;
create function public.arena_record_count(p_kind text,p_game_id text default null) returns void language plpgsql security definer set search_path='' as $$
declare v_origin text;v_game text;v_day date;
begin
v_origin:=coalesce(nullif(current_setting('request.headers',true),''),'{}')::jsonb->>'origin';
if not exists(select 1 from arena_private.settings where singleton and v_origin=any(allowed_origins)) then raise exception 'Origin not allowed' using errcode='42501';end if;
if p_kind='site_visit' and p_game_id is null then v_game:='';
elsif p_kind='game_open' and exists(select 1 from arena_private.games where id=p_game_id) then v_game:=p_game_id;
else raise exception 'Invalid count' using errcode='22023';end if;
v_day:=(now() at time zone 'Europe/Istanbul')::date;
insert into arena_private.daily_counts(day,game_id,opens) values(v_day,v_game,1) on conflict(day,game_id) do update set opens=arena_private.daily_counts.opens+1;
end $$;
revoke all on function public.arena_record_count(text,text) from public;
grant execute on function public.arena_record_count(text,text) to anon,authenticated;
create function public.arena_read_counts(p_days integer default 30) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_owner uuid;v_start date;v_summary jsonb;v_daily jsonb;v_games jsonb;
begin
select owner_user_id into v_owner from arena_private.settings where singleton;
if auth.uid() is null or v_owner is null or auth.uid()<>v_owner or not exists(select 1 from auth.users where id=v_owner and email_confirmed_at is not null) then raise exception 'Owner access required' using errcode='42501';end if;
if p_days is null or p_days not in(7,30,90) then raise exception 'Invalid date range' using errcode='22023';end if;
v_start:=(now() at time zone 'Europe/Istanbul')::date-(p_days-1);
select jsonb_build_object('visits',coalesce(sum(opens) filter(where game_id=''),0),'game_opens',coalesce(sum(opens) filter(where game_id<>''),0),'played_games',count(distinct game_id) filter(where game_id<>''),'visitors',null,'active_seconds',null) into v_summary from arena_private.daily_counts where day>=v_start;
select coalesce(jsonb_agg(to_jsonb(d) order by d.day),'[]'::jsonb) into v_daily from(select to_char(ds.day,'YYYY-MM-DD') as day,coalesce(sum(c.opens) filter(where c.game_id=''),0) as visits from generate_series(v_start,(now() at time zone 'Europe/Istanbul')::date,interval '1 day') ds(day) left join arena_private.daily_counts c on c.day=ds.day::date group by ds.day)d;
select coalesce(jsonb_agg(to_jsonb(g) order by g.opens desc,g.name),'[]'::jsonb) into v_games from(select g.id,g.name,g.category,coalesce(sum(c.opens),0) as opens from arena_private.games g left join arena_private.daily_counts c on c.game_id=g.id and c.day>=v_start group by g.id,g.name,g.category)g;
return jsonb_build_object('days',p_days,'summary',v_summary,'daily',v_daily,'games',v_games);
end $$;
revoke all on function public.arena_read_counts(integer) from public,anon;
grant execute on function public.arena_read_counts(integer) to authenticated;
-- Retire the old identifier-based public collector; old records retain their already-approved expiry.
revoke execute on function public.arena_record_event(uuid,uuid,uuid,text,text,integer) from anon,authenticated,public;
create or replace function arena_private.purge_expired_events() returns void language plpgsql security definer set search_path='' as $$
begin
delete from arena_private.events where received_at<now()-interval '90 days';
delete from arena_private.daily_counts where day<(now() at time zone 'Europe/Istanbul')::date-90;
end $$;
revoke all on function arena_private.purge_expired_events() from public,anon,authenticated;
commit;
