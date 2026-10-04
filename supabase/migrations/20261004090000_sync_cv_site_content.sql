-- Bring the DB-backed CV (/cv and /resume) in line with data/cv-data.ts after
-- the Luyra / Hengo v2 / DevOps content update. Only the entries that update
-- touched are rewritten, so any other admin edits to the CV row are kept.
update public.portfolio_site_content
set
  data = jsonb_set(
    jsonb_set(
      data,
      '{skills}',
      (
        select jsonb_agg(
          case s.value->>'category'
            when 'AI & Developer Productivity' then jsonb_set(
              s.value, '{items}',
              (
                select jsonb_agg(
                  case i.value #>> '{}' when 'Google Gemini API' then to_jsonb('Anthropic API'::text) else i.value end
                  order by i.ord
                )
                from jsonb_array_elements(s.value->'items') with ordinality as i(value, ord)
              )
            )
            when 'Tools & Delivery' then
              case
                when s.value->'items' ? 'DevOps Fundamentals' then s.value
                else jsonb_set(s.value, '{items}', '["DevOps Fundamentals"]'::jsonb || (s.value->'items'))
              end
            else s.value
          end
          order by s.ord
        )
        from jsonb_array_elements(data->'skills') with ordinality as s(value, ord)
      )
    ),
    '{projects}',
    (
      select jsonb_agg(
        case p.value->>'name'
          when 'Money Flow' then p.value || jsonb_build_object(
            'name', 'Luyra',
            'category', 'Full-Stack App',
            'description', 'Personal finance workspace on Next.js, Supabase Auth, and Neon Postgres with scheduled reviews and finance automation.',
            'bullets', jsonb_build_array(
              'Built transaction, budgeting, savings, analytics, and financial-review workflows behind authenticated Next.js route handlers.',
              'Added an optional Anthropic Money Coach plus scheduled budget alerts, summaries, reports, and multi-channel delivery.'
            ),
            'technologies', jsonb_build_array('Next.js 16', 'TypeScript', 'Supabase Auth', 'Neon Postgres', 'Anthropic'),
            'github', 'https://github.com/Hen-Heang/luyra-web',
            'live', 'https://luyra.henheang.site/',
            'caseStudy', '/projects/luyra'
          )
          when 'Hengo' then p.value || jsonb_build_object(
            'description', 'Focused AI-assisted Korean learning platform on Next.js, Supabase Auth/Postgres with RLS, and JWT-verified AI routes.',
            'bullets', jsonb_build_array(
              'Built the Today, Vocabulary, Practice, Coach, and Study loop around spaced repetition, workplace Korean, and voice practice.',
              'Kept data behind Supabase RLS and routed authenticated AI work through thin Next.js handlers with OpenAI and the Vercel AI SDK.'
            ),
            'technologies', jsonb_build_array('Next.js 16', 'TypeScript', 'Supabase', 'Vercel AI SDK', 'OpenAI', 'Tailwind CSS'),
            'live', 'https://hengo.henheang.site/home'
          )
          else p.value
        end
        order by p.ord
      )
      from jsonb_array_elements(data->'projects') with ordinality as p(value, ord)
    )
  ),
  updated_at = now()
where key = 'cv'
  and jsonb_typeof(data->'skills') = 'array'
  and jsonb_typeof(data->'projects') = 'array';
