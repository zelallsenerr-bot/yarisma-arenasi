begin;
create table arena_private.player_reports (
 id uuid primary key, received_at timestamptz not null default now(),
 game_id text not null references arena_private.games(id), kind text not null check(kind in ('question','visual','flow','other')),
 note text not null check(char_length(note) between 3 and 1000), question_id text check(char_length(question_id)<=160),
 status text not null default 'new' check(status in ('new','reviewed','resolved'))
);
alter table arena_private.player_reports enable row level security;
revoke all on arena_private.player_reports from public,anon,authenticated;
create index player_reports_received_idx on arena_private.player_reports(received_at desc);
create function public.arena_submit_report(p_id uuid,p_game text,p_kind text,p_note text,p_question text default null)
returns uuid language plpgsql security definer set search_path='' as $$
declare v_origin text;
begin
v_origin:=coalesce(nullif(current_setting('request.headers',true),''),'{}')::jsonb->>'origin';
if not exists(select 1 from arena_private.settings where singleton and v_origin=any(allowed_origins)) then raise exception 'Origin not allowed' using errcode='42501';end if;
if p_id is null or p_game is null or p_kind is null or p_note is null or char_length(btrim(p_note)) not between 3 and 1000 or p_kind not in('question','visual','flow','other') or char_length(coalesce(p_question,''))>160 or not exists(select 1 from arena_private.games where id=p_game) then raise exception 'Invalid report' using errcode='22023';end if;
-- Bound public writes without collecting IP addresses or visitor identifiers.
perform pg_advisory_xact_lock(575031);
if exists(select 1 from arena_private.player_reports where id=p_id) then return p_id;end if;
if (select count(*) from arena_private.player_reports where received_at>now()-interval '1 day')>=500 then raise exception 'Report limit reached' using errcode='54000';end if;
insert into arena_private.player_reports(id,game_id,kind,note,question_id) values(p_id,p_game,p_kind,btrim(p_note),nullif(p_question,''));return p_id;
end $$;
revoke all on function public.arena_submit_report(uuid,text,text,text,text) from public;
grant execute on function public.arena_submit_report(uuid,text,text,text,text) to anon,authenticated;
create function public.arena_read_reports() returns jsonb language plpgsql security definer set search_path='' as $$
begin
if not exists(select 1 from arena_private.settings s join auth.users u on u.id=s.owner_user_id where s.singleton and u.id=auth.uid() and u.email_confirmed_at is not null) then raise exception 'Owner access required' using errcode='42501';end if;
return (select coalesce(jsonb_agg(to_jsonb(t) order by t.received_at desc),'[]'::jsonb) from(select r.*,g.name as game_name from arena_private.player_reports r join arena_private.games g on g.id=r.game_id where r.received_at>now()-interval '90 days' order by r.received_at desc limit 200)t);
end $$;
revoke all on function public.arena_read_reports() from public,anon;
grant execute on function public.arena_read_reports() to authenticated;
create function public.arena_set_report_status(p_id uuid,p_status text) returns void language plpgsql security definer set search_path='' as $$
begin
if not exists(select 1 from arena_private.settings s join auth.users u on u.id=s.owner_user_id where s.singleton and u.id=auth.uid() and u.email_confirmed_at is not null) then raise exception 'Owner access required' using errcode='42501';end if;
if p_status is null or p_status not in('new','reviewed','resolved') then raise exception 'Invalid status';end if;
update arena_private.player_reports set status=p_status where id=p_id;
end $$;
revoke all on function public.arena_set_report_status(uuid,text) from public,anon;
grant execute on function public.arena_set_report_status(uuid,text) to authenticated;
create or replace function arena_private.purge_expired_events() returns void language plpgsql security definer set search_path='' as $$
begin
delete from arena_private.events where received_at<now()-interval '90 days';
delete from arena_private.daily_counts where day<(now() at time zone 'Europe/Istanbul')::date-90;
delete from arena_private.player_reports where received_at<now()-interval '90 days';
end $$;
commit;
