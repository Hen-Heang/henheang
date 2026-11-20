-- Luyra (personal finance) has been merged into H-Space as its Finance area
-- (/finance in Hen-Heang/h-space). Bring the DB-backed portfolio in line with
-- data/projects.ts and data/cv-data.ts:
--   1. the hengo row becomes the full H-Space entry, including Finance;
--   2. the standalone luyra row is removed (/projects/luyra now redirects to
--      /projects/hengo in next.config.js);
--   3. the CV drops its separate Luyra project and folds it into H-Space.
-- Snapshots of the rows taken before this ran are in supabase/backups/.
-- Re-running is a no-op.

-- 1. H-Space portfolio entry (keeps the hengo slug so existing links resolve).
update public.portfolio_projects
set
  title = 'H-Space — Personal Software Ecosystem',
  description = $$A personal software ecosystem that brings my learning, finance, and productivity tools into one Next.js app — Hengo Learning for Korean, plus the Luyra finance app merged in as Finance.$$,
  technologies = array['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Neon Postgres', 'Vercel Cron', 'Vercel AI SDK', 'OpenAI', 'Tailwind CSS'],
  github = 'https://github.com/Hen-Heang/h-space',
  demo = 'https://hengo.henheang.site/home',
  overview = $$H-Space is my personal software ecosystem. Hengo Learning keeps the original Korean-learning data and routes. Luyra, formerly a standalone app, now runs inside H-Space as Finance (/finance) — transactions, budgets, savings, reviews, reports, and scheduled alerts — with records in a separate Neon Postgres database.$$,
  features = array[
    'Dashboard linking each connected application and its source code',
    'Finance (from Luyra): transactions, recurring entries, budgets, savings goals, subscriptions, and analytics',
    'Monthly reviews with a next-month budget plan, printable reports, and CSV/JSON export',
    'Scheduled budget alerts and weekly/monthly reports by Telegram or email',
    'Hengo Learning: vocabulary capture, spaced repetition, and practice sessions',
    'Korean Coach with AI feedback for speaking, listening, and mistake review'
  ],
  technical_details = $$Next.js 16 and React 19 SPA over Supabase Auth and Postgres with RLS. AI routes verify the Supabase JWT and call OpenAI through the Vercel AI SDK for feedback, streaming, and voice coaching. Finance runs through server-only /api/finance routes that reuse Luyra's services and repositories over a separate Neon database, and Vercel Cron runs its recurring and alert jobs behind a shared secret.$$,
  challenges = array[
    'Simplifying a broad platform without deleting working features or user data',
    'Merging a separately deployed finance app without exposing finance records to the browser',
    'Running scheduled finance jobs without an always-on server or duplicate deliveries'
  ],
  solutions = array[
    'Kept a few primary destinations, preserved hidden routes, and kept standalone Luyra as the rollback during the merge',
    'Server-only finance routes resolve an explicit account link and scope every Neon query by it',
    'Secret-protected Vercel Cron routes; sent reports are recorded per month and channel so reruns never resend'
  ],
  role = 'Solo Developer',
  duration = '2024 — Present',
  team_size = '1 developer',
  updated_at = now()
where slug = 'hengo'
  and title is distinct from 'H-Space — Personal Software Ecosystem';

-- 2. The standalone Luyra entry is now part of H-Space.
delete from public.portfolio_projects
where slug = 'luyra';

-- 3. CV: drop the separate Luyra project and describe Finance under H-Space.
-- Only entries still named 'Luyra' / 'H-Space' are touched; every other CV
-- field and project is left as it is.
with revised as (
  select
    cv.data as original_data,
    jsonb_set(cv.data, '{projects}', to_jsonb(array(
      select case
        when p.item->>'name' = 'H-Space' then p.item || jsonb_build_object(
          'description', $$Personal software ecosystem on Next.js, Supabase, and Neon Postgres that brings my learning, finance, and productivity apps into one place — Hengo Learning for Korean and the Luyra finance workspace merged in as Finance.$$,
          'bullets', jsonb_build_array(
            'Merged the standalone Luyra finance app into H-Space: transactions, budgets, savings, reviews, reports, and scheduled Telegram/email alerts behind server-only route handlers that scope every Neon query to an explicitly linked account.',
            'Kept learning data behind Supabase RLS and routed authenticated AI work through JWT-verified Next.js handlers with per-user limits, using OpenAI and the Vercel AI SDK.'
          ),
          'technologies', jsonb_build_array('Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Neon Postgres', 'Vercel AI SDK', 'OpenAI'),
          'featured', true
        )
        else p.item
      end
      from jsonb_array_elements(cv.data->'projects') with ordinality as p(item, position)
      where p.item->>'name' is distinct from 'Luyra'
      order by p.position
    )), false) as revised_data
  from public.portfolio_site_content as cv
  where cv.key = 'cv' and jsonb_typeof(cv.data->'projects') = 'array'
)
update public.portfolio_site_content as cv
set data = revised.revised_data, updated_at = now()
from revised
where cv.key = 'cv'
  and cv.data = revised.original_data
  and cv.data is distinct from revised.revised_data;
