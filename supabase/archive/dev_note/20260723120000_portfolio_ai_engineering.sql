-- AI Engineering content (articles, prompts, snippets, categories) — these
-- tables were referenced by src/lib/admin/entities.ts and src/lib/db/ai-engineering.ts
-- but were never migrated, so getAICategories/getAIArticles/getAIPrompts/
-- getAISnippets always returned [] (query against a nonexistent table errors,
-- and the app silently swallows that error as an empty result).
-- Column names/types mirror what src/lib/db/ai-engineering.ts's mapCategory/
-- mapArticle/mapPrompt/mapSnippet read, and what src/lib/admin/entities.ts's
-- ai_categories/ai_articles/ai_prompts/ai_snippets forms write.

create table if not exists public.portfolio_ai_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
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
  category_slug text references public.portfolio_ai_categories(slug),
  tags text[] not null default '{}',
  technologies text[] not null default '{}',
  published_at text not null,
  updated_at text,
  reading_time integer not null,
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
  author text not null,
  featured boolean default false,
  cover_emoji text not null,
  body jsonb not null default '[]'::jsonb,
  sort_order integer default 0
);

create table if not exists public.portfolio_ai_prompts (
  id uuid primary key default gen_random_uuid(),
  prompt_id text unique not null,
  title text not null,
  category text not null check (
    category in ('backend', 'api-design', 'database', 'code-review', 'bug-fixing', 'refactoring', 'system-design', 'learning')
  ),
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

-- Public read (same policy shape as portfolio_projects/experience/etc.)
create policy "public read" on public.portfolio_ai_categories for select using (true);
create policy "public read" on public.portfolio_ai_articles for select using (true);
create policy "public read" on public.portfolio_ai_prompts for select using (true);
create policy "public read" on public.portfolio_ai_snippets for select using (true);

-- Owner-only writes via the existing public.portfolio_is_owner() helper
create policy "owner all" on public.portfolio_ai_categories for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_ai_articles for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_ai_prompts for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_ai_snippets for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
