-- Drop portfolio schema tables and recreate in public schema with portfolio_ prefix

drop schema if exists portfolio cascade;

-- Projects
create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  technologies text[] not null default '{}',
  image text,
  github text,
  demo text,
  overview text,
  features text[],
  technical_details text,
  challenges text[],
  solutions text[],
  role text,
  duration text,
  team_size text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Skill categories
create table if not exists public.portfolio_skill_categories (
  id uuid primary key default gen_random_uuid(),
  category text not null unique,
  sort_order integer default 0
);

-- Skills
create table if not exists public.portfolio_skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.portfolio_skill_categories(id) on delete cascade,
  name text not null,
  level integer check (level between 1 and 5),
  experience text,
  sort_order integer default 0,
  unique(category_id, name)
);

-- Experience
create table if not exists public.portfolio_experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  location text,
  summary text,
  highlights text[],
  stack text[],
  sort_order integer default 0,
  unique(company, period)
);

-- Education
create table if not exists public.portfolio_education (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  title text not null,
  institution text not null,
  description text,
  sort_order integer default 0,
  unique(title, institution)
);

-- Achievements
create table if not exists public.portfolio_achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  date text,
  type text default 'certificate' check (type in ('certificate', 'graduation', 'award')),
  description text,
  image text,
  link text,
  sort_order integer default 0,
  unique(title, issuer)
);

-- Blog posts
create table if not exists public.portfolio_blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  date date,
  read_time text,
  category text,
  tags text[] default '{}',
  image text,
  author text,
  featured boolean default false,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_skill_categories enable row level security;
alter table public.portfolio_skills enable row level security;
alter table public.portfolio_experience enable row level security;
alter table public.portfolio_education enable row level security;
alter table public.portfolio_achievements enable row level security;
alter table public.portfolio_blog_posts enable row level security;

-- Public read
create policy "public read" on public.portfolio_projects for select using (true);
create policy "public read" on public.portfolio_skill_categories for select using (true);
create policy "public read" on public.portfolio_skills for select using (true);
create policy "public read" on public.portfolio_experience for select using (true);
create policy "public read" on public.portfolio_education for select using (true);
create policy "public read" on public.portfolio_achievements for select using (true);
create policy "public read" on public.portfolio_blog_posts for select using (published = true);

-- Admin write
create policy "admin all" on public.portfolio_projects for all to authenticated using (true);
create policy "admin all" on public.portfolio_skill_categories for all to authenticated using (true);
create policy "admin all" on public.portfolio_skills for all to authenticated using (true);
create policy "admin all" on public.portfolio_experience for all to authenticated using (true);
create policy "admin all" on public.portfolio_education for all to authenticated using (true);
create policy "admin all" on public.portfolio_achievements for all to authenticated using (true);
create policy "admin all" on public.portfolio_blog_posts for all to authenticated using (true);
