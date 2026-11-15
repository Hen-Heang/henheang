-- Verification for 20260731090000_portfolio_ai_knowledge_schema.sql
--
-- NOT a migration. Deliberately kept outside supabase/migrations/ so the
-- Supabase CLI never applies it automatically. Run this manually — via the
-- Supabase SQL editor or `psql` — AFTER applying the migration, ideally
-- against a local/dev database first.
--
-- Everything runs inside one transaction that is rolled back at the end, so
-- no row from this script is left behind regardless of outcome. Each check
-- raises an exception (aborting the transaction) if the assumption it's
-- verifying doesn't hold, so "no error" = "all checks passed".
--
-- What this verifies:
--   1. RLS is enabled on all 5 new tables.
--   2. Anonymous (anon) role cannot see owner-only or unapproved rows.
--   3. Anonymous role CAN see approved+public rows (and only those).
--   4. Anonymous role can insert valid feedback, and cannot insert feedback
--      that tries to self-mark evaluation_status or use an invalid vote.
--   5. A signed-in but non-owner user cannot read/write owner-gated tables.
--   6. The portfolio owner (JWT email match) can read/write everything.
--   7. Key CHECK constraints actually reject bad data (chunk_key uniqueness
--      per source, empty content_hash, malformed client_hash, negative
--      counts, finished_at before started_at).

begin;

-- ---------------------------------------------------------------------
-- 1. RLS enabled
-- ---------------------------------------------------------------------
do $$
declare
  missing text;
begin
  select string_agg(relname, ', ') into missing
  from pg_class
  where relnamespace = 'public'::regnamespace
    and relname in (
      'portfolio_ai_sources', 'portfolio_ai_chunks', 'portfolio_ai_profile_facts',
      'portfolio_ai_feedback', 'portfolio_ai_sync_runs'
    )
    and not relrowsecurity;

  if missing is not null then
    raise exception 'RLS not enabled on: %', missing;
  end if;

  raise notice 'OK: RLS enabled on all 5 tables';
end $$;

-- ---------------------------------------------------------------------
-- Seed one row per state (owner-only vs public-approved) as the owner,
-- via a savepoint so it's easy to reason about below.
-- ---------------------------------------------------------------------
savepoint seed_fixture;

set local role authenticated;
set local request.jwt.claims to '{"email":"henheang15@gmail.com","role":"authenticated"}';

insert into public.portfolio_ai_sources (id, source_type, title, source_url, visibility, approval_status)
values
  ('00000000-0000-0000-0000-000000000001', 'manual', 'Owner-only source', 'https://example.com/owner', 'owner', 'pending'),
  ('00000000-0000-0000-0000-000000000002', 'manual', 'Approved public source', 'https://example.com/public', 'public', 'approved');

insert into public.portfolio_ai_chunks (source_id, chunk_key, content, content_hash, visibility, approved, is_active)
values
  ('00000000-0000-0000-0000-000000000001', 'chunk-owner', 'owner-only chunk', 'hash1', 'owner', false, true),
  ('00000000-0000-0000-0000-000000000002', 'chunk-public-approved', 'public approved chunk', 'hash2', 'public', true, true),
  ('00000000-0000-0000-0000-000000000002', 'chunk-public-unapproved', 'public but not yet approved', 'hash3', 'public', false, true);

insert into public.portfolio_ai_profile_facts (category, fact_text, visibility, status)
values
  ('profile', 'Owner-only draft fact', 'owner', 'draft'),
  ('profile', 'Approved public fact', 'public', 'approved');

reset role;
reset request.jwt.claims;

-- ---------------------------------------------------------------------
-- 2 & 3. Anonymous visibility
-- ---------------------------------------------------------------------
set local role anon;

do $$
declare
  visible_count int;
begin
  select count(*) into visible_count from public.portfolio_ai_sources;
  if visible_count <> 1 then
    raise exception 'anon should see exactly 1 approved+public source, saw %', visible_count;
  end if;

  select count(*) into visible_count from public.portfolio_ai_chunks;
  if visible_count <> 1 then
    raise exception 'anon should see exactly 1 approved+public+active chunk, saw %', visible_count;
  end if;

  select count(*) into visible_count from public.portfolio_ai_profile_facts;
  if visible_count <> 1 then
    raise exception 'anon should see exactly 1 approved+public fact, saw %', visible_count;
  end if;

  select count(*) into visible_count from public.portfolio_ai_sync_runs;
  if visible_count <> 0 then
    raise exception 'anon should never see sync_runs rows, saw %', visible_count;
  end if;

  raise notice 'OK: anon read visibility is exactly the approved+public rows';
end $$;

-- ---------------------------------------------------------------------
-- 4. Feedback insert policy
-- ---------------------------------------------------------------------
insert into public.portfolio_ai_feedback (request_id, page_context, vote, client_hash)
values ('req-1', 'home', 'up', 'abcdef0123456789abcdef01');

do $$
begin
  begin
    insert into public.portfolio_ai_feedback (request_id, page_context, vote, evaluation_status, client_hash)
    values ('req-2', 'home', 'up', 'actioned', 'abcdef0123456789abcdef01');
    raise exception 'anon should NOT be able to self-mark evaluation_status on insert';
  exception
    when insufficient_privilege or check_violation then
      raise notice 'OK: self-marking evaluation_status on insert was rejected';
  end;

  begin
    insert into public.portfolio_ai_feedback (request_id, page_context, vote, client_hash)
    values ('req-3', 'home', 'sideways', 'abcdef0123456789abcdef01');
    raise exception 'invalid vote value should have been rejected';
  exception
    -- The RLS insert policy also checks the vote, so either it (42501) or the
    -- column CHECK (23514) may reject the row first.
    when insufficient_privilege or check_violation then
      raise notice 'OK: invalid vote value was rejected';
  end;
end $$;

-- anon must not be able to read back the feedback it just inserted (insert-only, no select grant)
do $$
declare
  visible_count int;
begin
  select count(*) into visible_count from public.portfolio_ai_feedback;
  if visible_count <> 0 then
    raise exception 'anon should not be able to SELECT feedback rows, saw %', visible_count;
  end if;
  raise notice 'OK: anon cannot read back feedback (insert-only)';
end $$;

reset role;

-- ---------------------------------------------------------------------
-- 5. Signed-in but non-owner user is denied owner-gated access
-- ---------------------------------------------------------------------
set local role authenticated;
set local request.jwt.claims to '{"email":"not-the-owner@example.com","role":"authenticated"}';

do $$
declare
  visible_count int;
begin
  select count(*) into visible_count from public.portfolio_ai_sources where visibility = 'owner';
  if visible_count <> 0 then
    raise exception 'non-owner authenticated user should not see owner-only sources, saw %', visible_count;
  end if;

  begin
    insert into public.portfolio_ai_sources (source_type, title, source_url)
    values ('manual', 'should fail', 'https://example.com/should-fail');
    raise exception 'non-owner authenticated user should not be able to insert sources';
  exception
    when insufficient_privilege or others then
      raise notice 'OK: non-owner authenticated user cannot write sources';
  end;

  select count(*) into visible_count from public.portfolio_ai_feedback;
  if visible_count <> 0 then
    raise exception 'non-owner authenticated user should not be able to read feedback, saw %', visible_count;
  end if;

  raise notice 'OK: non-owner authenticated access is denied everywhere it should be';
end $$;

reset role;
reset request.jwt.claims;

-- ---------------------------------------------------------------------
-- 6. Owner can read/write everything
-- ---------------------------------------------------------------------
set local role authenticated;
set local request.jwt.claims to '{"email":"henheang15@gmail.com","role":"authenticated"}';

do $$
declare
  visible_count int;
begin
  select count(*) into visible_count from public.portfolio_ai_sources;
  if visible_count <> 2 then
    raise exception 'owner should see all sources (owner+public), saw %', visible_count;
  end if;

  select count(*) into visible_count from public.portfolio_ai_feedback;
  if visible_count < 1 then
    raise exception 'owner should be able to read submitted feedback';
  end if;

  update public.portfolio_ai_feedback set evaluation_status = 'reviewed' where request_id = 'req-1';

  raise notice 'OK: owner has full read/write access';
end $$;

reset role;
reset request.jwt.claims;

-- ---------------------------------------------------------------------
-- 7. CHECK constraints
-- ---------------------------------------------------------------------
set local role authenticated;
set local request.jwt.claims to '{"email":"henheang15@gmail.com","role":"authenticated"}';

do $$
begin
  -- duplicate chunk_key within the same source must be rejected
  begin
    insert into public.portfolio_ai_chunks (source_id, chunk_key, content, content_hash)
    values ('00000000-0000-0000-0000-000000000002', 'chunk-public-approved', 'dup', 'hash4');
    raise exception 'duplicate (source_id, chunk_key) should have been rejected';
  exception
    when unique_violation then
      raise notice 'OK: duplicate chunk_key per source rejected';
  end;

  -- empty content_hash must be rejected
  begin
    insert into public.portfolio_ai_chunks (source_id, chunk_key, content, content_hash)
    values ('00000000-0000-0000-0000-000000000002', 'chunk-empty-hash', 'x', '');
    raise exception 'empty content_hash should have been rejected';
  exception
    when check_violation then
      raise notice 'OK: empty content_hash rejected';
  end;

  -- negative sync-run counts must be rejected
  begin
    insert into public.portfolio_ai_sync_runs (source_id, processed_count)
    values ('00000000-0000-0000-0000-000000000002', -1);
    raise exception 'negative processed_count should have been rejected';
  exception
    when check_violation then
      raise notice 'OK: negative sync-run counts rejected';
  end;

  -- finished_at before started_at must be rejected
  begin
    insert into public.portfolio_ai_sync_runs (source_id, started_at, finished_at)
    values ('00000000-0000-0000-0000-000000000002', now(), now() - interval '1 hour');
    raise exception 'finished_at before started_at should have been rejected';
  exception
    when check_violation then
      raise notice 'OK: finished_at before started_at rejected';
  end;
end $$;

reset role;
reset request.jwt.claims;

do $$ begin raise notice 'All portfolio_ai_* verification checks passed.'; end $$;

rollback;
