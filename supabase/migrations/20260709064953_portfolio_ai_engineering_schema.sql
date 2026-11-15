-- AI Engineering hub content, admin-editable via the existing owner-only RLS pattern.

create table if not exists public.portfolio_ai_categories (
  slug text primary key,
  title text not null,
  emoji text not null,
  icon text not null,
  description text not null,
  sort_order integer default 0
);

create table if not exists public.portfolio_ai_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  category_slug text not null references public.portfolio_ai_categories(slug) on delete restrict,
  tags text[] not null default '{}',
  technologies text[] not null default '{}',
  published_at date not null default current_date,
  updated_at date,
  reading_time integer not null default 5,
  difficulty text not null default 'beginner' check (difficulty in ('beginner', 'intermediate', 'advanced')),
  author text not null default 'Hen Heang',
  featured boolean not null default false,
  cover_emoji text not null default '📝',
  body jsonb not null default '[]'::jsonb,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.portfolio_ai_prompts (
  id uuid primary key default gen_random_uuid(),
  prompt_id text unique not null,
  title text not null,
  category text not null check (category in ('backend', 'api-design', 'database', 'code-review', 'bug-fixing', 'refactoring', 'system-design', 'learning')),
  description text not null,
  prompt text not null,
  expected_output text not null,
  best_practices text[] not null default '{}',
  tags text[] not null default '{}',
  sort_order integer default 0
);

create table if not exists public.portfolio_ai_snippets (
  id uuid primary key default gen_random_uuid(),
  snippet_id text unique not null,
  title text not null,
  language text not null,
  code text not null,
  tags text[] not null default '{}',
  explanation text not null,
  sort_order integer default 0
);

alter table public.portfolio_ai_categories enable row level security;
alter table public.portfolio_ai_articles enable row level security;
alter table public.portfolio_ai_prompts enable row level security;
alter table public.portfolio_ai_snippets enable row level security;

create policy "public read" on public.portfolio_ai_categories for select using (true);
create policy "public read" on public.portfolio_ai_articles for select using (true);
create policy "public read" on public.portfolio_ai_prompts for select using (true);
create policy "public read" on public.portfolio_ai_snippets for select using (true);

create policy "owner all" on public.portfolio_ai_categories for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_ai_articles for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_ai_prompts for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_ai_snippets for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
;
