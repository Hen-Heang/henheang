# Archived migrations (not applied to production)

These files used to live in `supabase/migrations/` but were never applied to the
production project (`money-flow`, `lqjjabfmaweztxkvfrsq`), and must not be:

- `20260423*` — the original schema for the retired `dev_note` project. They
  create unprefixed tables (`public.projects`, `public.experience`, …) and one
  runs `drop schema if exists portfolio cascade`. Production's portfolio tables
  were created instead by `20260706010944_portfolio_schema_owner_rls.sql`.
- `20260723120000_portfolio_ai_engineering.sql` — a later rewrite of the AI
  Engineering schema. Production already has those tables from the five
  `20260709*` migrations that actually ran, which are now in
  `supabase/migrations/`.

They are kept for reference only. The Supabase CLI does not read this folder.
