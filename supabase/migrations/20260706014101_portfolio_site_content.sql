-- Singleton site content (profile, dashboard layout data, CV) as jsonb documents
create table if not exists public.portfolio_site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

alter table public.portfolio_site_content enable row level security;

create policy "public read" on public.portfolio_site_content
  for select using (true);

create policy "owner all" on public.portfolio_site_content
  for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
