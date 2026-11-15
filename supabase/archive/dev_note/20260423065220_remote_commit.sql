-- Portfolio Schema
-- Public read, admin write via RLS

-- Projects
create table if not exists projects (
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

-- Skills
create table if not exists skill_categories (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  sort_order integer default 0
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references skill_categories(id) on delete cascade,
  name text not null,
  level integer check (level between 1 and 5),
  experience text,
  sort_order integer default 0
);

-- Experience
create table if not exists experience (
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
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  title text not null,
  institution text not null,
  description text,
  sort_order integer default 0
);

-- Achievements / Certificates
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  date text,
  description text,
  image text,
  sort_order integer default 0
);

-- Blog Posts
create table if not exists blog_posts (
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

-- Enable RLS on all tables
alter table projects enable row level security;
alter table skill_categories enable row level security;
alter table skills enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table achievements enable row level security;
alter table blog_posts enable row level security;

-- Public read policies (no login required)
create policy "public read projects" on projects for select using (true);
create policy "public read skill_categories" on skill_categories for select using (true);
create policy "public read skills" on skills for select using (true);
create policy "public read experience" on experience for select using (true);
create policy "public read education" on education for select using (true);
create policy "public read achievements" on achievements for select using (true);
create policy "public read blog_posts" on blog_posts for select using (published = true);

-- Admin write policies (only authenticated user = you)
create policy "admin all projects" on projects for all using (auth.role() = 'authenticated');
create policy "admin all skill_categories" on skill_categories for all using (auth.role() = 'authenticated');
create policy "admin all skills" on skills for all using (auth.role() = 'authenticated');
create policy "admin all experience" on experience for all using (auth.role() = 'authenticated');
create policy "admin all education" on education for all using (auth.role() = 'authenticated');
create policy "admin all achievements" on achievements for all using (auth.role() = 'authenticated');
create policy "admin all blog_posts" on blog_posts for all using (auth.role() = 'authenticated');
