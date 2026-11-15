-- Replace the legacy Money Flow portfolio entry with the current Luyra product.
-- This keeps the DB-backed public portfolio consistent with data/projects.ts.
update public.portfolio_projects
set
  title = 'Luyra — Personal Finance Workspace',
  slug = 'luyra',
  description = 'A personal finance workspace for money tracking, budgets, savings, analytics, and recurring financial reviews — built as the active product surface of Luyra.',
  technologies = array['Next.js 16', 'React 19', 'TypeScript', 'Supabase Auth', 'Neon Postgres', 'Vercel Cron', 'Anthropic'],
  image = '/image/luyra-preview.svg',
  github = 'https://github.com/Hen-Heang/luyra-web',
  demo = 'https://luyra.henheang.site/',
  overview = 'Luyra is a personal money-management workspace with finance as its active product surface. It combines transaction tracking, budgets, savings, analytics, financial reviews, settings, and an optional AI Money Coach behind a Next.js application. Supabase handles authentication while Luyra''s application data is served through a typed Next.js API boundary backed by Neon Postgres.',
  technical_details = 'Next.js 16 App Router and React 19 provide the application surface. Supabase Auth manages login and identity; Neon Postgres stores users, finance data, reports, and preferences. Zod validates request data, while a lib/api → route handler → service → repository boundary keeps components independent from SQL. Vercel Cron and Workflow run scheduled finance jobs, with optional Anthropic, Resend, Telegram, and Web Push integrations.',
  role = 'Solo Developer',
  duration = '2024 — Present',
  team_size = '1 developer',
  updated_at = now()
where slug = 'money-flow' or title like 'Money Flow%';

-- The legacy row may not exist in a fresh portfolio database. In that case the
-- static fallback remains authoritative until the project is seeded through the
-- admin UI.
