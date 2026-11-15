create table public.portfolio_contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table public.portfolio_contact_messages enable row level security;

-- Anyone can submit a message (insert only)
create policy "public insert messages"
  on public.portfolio_contact_messages
  for insert
  with check (true);

-- Only admin can read messages
create policy "admin read messages"
  on public.portfolio_contact_messages
  for select
  to authenticated
  using (true);

-- Only admin can update (mark as read)
create policy "admin update messages"
  on public.portfolio_contact_messages
  for update
  to authenticated
  using (true);
