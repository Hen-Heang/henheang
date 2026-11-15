-- Replace the legacy Dev Lab catalog row with the current VSTV Agent project.
-- The static case study remains the richest source for architecture fields.
update public.portfolio_projects
set
  title = 'VSTV Agent — Real Estate Platform & Operations Console',
  slug = 'vstv-agent',
  description = 'A public real-estate platform and private staff workspace for VSTV Agent: property discovery, agent contact, unit inventory, CSV import, and scheduled Telegram publishing for Phnom Penh rentals.',
  technologies = array['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM', 'Neon PostgreSQL', 'Spring Boot', 'Telegram'],
  image = '/image/vstv-logo-mark.png',
  github = 'https://github.com/Hen-Heang/vstv-agent-web',
  demo = 'https://vstv-agents.vercel.app/',
  overview = 'VSTV Agent is a full-stack real-estate application for VSTV Agent (Cambodia) Co., Ltd. The public site presents rental properties, services, agents, contact paths, and location information; the protected admin console manages staff, units, availability, imports, inquiries, and operational settings.',
  technical_details = 'The application uses Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, TanStack Query, Drizzle ORM, and Neon PostgreSQL. Browser code talks to typed API clients; server-only route handlers and services own database access. The migration keeps Spring Boot as the current backend for authentication and staff domains while Next.js serves the unit inventory and import domains. Telegram delivery is scheduled through the application workflow.',
  features = array['Public property discovery and agent/contact flows', 'Protected staff workspace with role-aware access', 'Searchable unit inventory and availability workflows', 'Two-step CSV preview and confirmed import', 'Scheduled Telegram publishing with private-field redaction'],
  challenges = array['Moving backend ownership incrementally without breaking a live public site', 'Keeping private owner contacts and internal notes out of public and Telegram payloads', 'Making imports and scheduled delivery safe to retry'],
  solutions = array['A stable /api/v1 boundary lets Spring Boot and Next.js migrate domain by domain', 'Server-side mapping and public-safe formatting omit sensitive fields before delivery', 'Preview/confirm imports and durable delivery claims make operational workflows recoverable'],
  role = 'Solo Developer — Full-Stack',
  duration = '2024 — Present',
  team_size = '1 developer',
  updated_at = now()
where slug = 'dev-lab' or title like 'Dev Lab%';

-- The legacy row may not exist in a fresh portfolio database. In that case the
-- static fallback remains authoritative until the project is seeded through the
-- admin UI.
