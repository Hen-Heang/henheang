-- Additive, nullable/defaulted columns for spam-signal observability in the
-- admin inbox. No behavior change for existing rows or the existing public
-- INSERT policy (with check (true)) — every new column has a default.
alter table public.portfolio_contact_messages
  add column if not exists honeypot_triggered boolean not null default false,
  add column if not exists client_elapsed_ms integer,
  add column if not exists user_agent text;

create index if not exists idx_contact_messages_honeypot
  on public.portfolio_contact_messages (honeypot_triggered)
  where honeypot_triggered;
