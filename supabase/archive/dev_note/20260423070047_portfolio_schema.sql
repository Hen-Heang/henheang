-- Create dedicated portfolio schema
create schema if not exists portfolio;

-- Grant usage to anon and authenticated roles
grant usage on schema portfolio to anon, authenticated;
grant all on all tables in schema portfolio to authenticated;
grant select on all tables in schema portfolio to anon;
alter default privileges in schema portfolio grant select on tables to anon;
alter default privileges in schema portfolio grant all on tables to authenticated;

-- Projects
create table portfolio.projects (
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
create table portfolio.skill_categories (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  sort_order integer default 0
);

-- Skills
create table portfolio.skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references portfolio.skill_categories(id) on delete cascade,
  name text not null,
  level integer check (level between 1 and 5),
  experience text,
  sort_order integer default 0
);

-- Experience
create table portfolio.experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  location text,
  summary text,
  highlights text[],
  stack text[],
  sort_order integer default 0
);

-- Education
create table portfolio.education (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  title text not null,
  institution text not null,
  description text,
  sort_order integer default 0
);

-- Achievements / Certificates
create table portfolio.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  date text,
  description text,
  image text,
  sort_order integer default 0
);

-- Blog posts
create table portfolio.blog_posts (
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
alter table portfolio.projects enable row level security;
alter table portfolio.skill_categories enable row level security;
alter table portfolio.skills enable row level security;
alter table portfolio.experience enable row level security;
alter table portfolio.education enable row level security;
alter table portfolio.achievements enable row level security;
alter table portfolio.blog_posts enable row level security;

-- Public read policies
create policy "public read" on portfolio.projects for select to anon using (true);
create policy "public read" on portfolio.skill_categories for select to anon using (true);
create policy "public read" on portfolio.skills for select to anon using (true);
create policy "public read" on portfolio.experience for select to anon using (true);
create policy "public read" on portfolio.education for select to anon using (true);
create policy "public read" on portfolio.achievements for select to anon using (true);
create policy "public read" on portfolio.blog_posts for select to anon using (published = true);

-- Admin write policies
create policy "admin all" on portfolio.projects for all to authenticated using (true);
create policy "admin all" on portfolio.skill_categories for all to authenticated using (true);
create policy "admin all" on portfolio.skills for all to authenticated using (true);
create policy "admin all" on portfolio.experience for all to authenticated using (true);
create policy "admin all" on portfolio.education for all to authenticated using (true);
create policy "admin all" on portfolio.achievements for all to authenticated using (true);
create policy "admin all" on portfolio.blog_posts for all to authenticated using (true);
