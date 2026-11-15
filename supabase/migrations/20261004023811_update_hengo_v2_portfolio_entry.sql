-- Refresh the DB-backed portfolio entry to match the focused Hengo V2 product.
update public.portfolio_projects
set
  title = 'Hengo — Focused Korean Learning Platform',
  description = 'A focused AI-assisted Korean learning platform for software engineers and international professionals living and working in Korea.',
  technologies = array['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Vercel AI SDK', 'OpenAI', 'Tailwind CSS'],
  image = '/image/hengo-preview.svg',
  github = 'https://github.com/Hen-Heang/hengo',
  demo = 'https://hengo.henheang.site/home',
  overview = 'Hengo V2 is a practical Korean-learning assistant for someone living and working in Korea. Its focused product loop is Capture → Review → Practice → Speak → Improve, with Today, Vocabulary, Practice, Coach, and Study as the five primary destinations.',
  technical_details = 'Next.js 16 and React 19 form a client-side SPA over Supabase Auth and Postgres with RLS. TanStack Query manages server state, while thin Next.js AI routes verify the Supabase JWT and use the Vercel AI SDK with OpenAI for structured JSON, streamed SSE feedback, transcription, speech, and voice-coach workflows. Tailwind CSS v4 and shadcn-style primitives provide the responsive interface.',
  role = 'Solo Developer',
  duration = '2024 — Present',
  team_size = '1 developer',
  updated_at = now()
where slug = 'hengo' or title like 'Hengo%';
