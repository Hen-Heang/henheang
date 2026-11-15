-- Rename the CV's Hengo project to H-Space, matching the /projects/hengo case
-- study and data/cv-data.ts. Only the entry still named 'Hengo' is rewritten;
-- every other CV field and project is left untouched. Re-running is a no-op.
with revised as (
  select
    cv.data as original_data,
    jsonb_set(cv.data, '{projects}', to_jsonb(array(
      select case
        when p.item->>'name' = 'Hengo' then p.item || jsonb_build_object(
          'name', 'H-Space',
          'category', 'Full-Stack App',
          'description', 'Personal software ecosystem on Next.js and Supabase connecting my learning, finance, AI engineering, and productivity apps, with Hengo Learning as its Korean-learning experience.',
          'bullets', jsonb_build_array(
            'Built the H-Space hub that connects my existing applications and their source code, while preserving Hengo Learning''s routes, data, spaced repetition, and AI coaching.',
            'Kept data behind Supabase RLS and routed authenticated AI work through JWT-verified Next.js handlers with per-user limits, using OpenAI and the Vercel AI SDK.'
          ),
          'technologies', jsonb_build_array('Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Vercel AI SDK', 'OpenAI', 'Tailwind CSS'),
          'github', 'https://github.com/Hen-Heang/h-space',
          'live', 'https://hengo.henheang.site/home',
          'caseStudy', '/projects/hengo'
        )
        else p.item
      end
      from jsonb_array_elements(cv.data->'projects') with ordinality as p(item, position)
      order by p.position
    )), false) as revised_data
  from public.portfolio_site_content as cv
  where cv.key = 'cv' and jsonb_typeof(cv.data->'projects') = 'array'
)
update public.portfolio_site_content as cv
set data = revised.revised_data, updated_at = now()
from revised
where cv.key = 'cv'
  and cv.data = revised.original_data
  and cv.data is distinct from revised.revised_data;
