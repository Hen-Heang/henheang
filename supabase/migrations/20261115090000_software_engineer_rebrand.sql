-- Align the Supabase-backed profile, CV, and experience records with the
-- "Software Engineer – Backend & AI-Assisted Development" positioning in
-- data/profile.ts, data/cv-data.ts, and data/experience.ts.
--
-- Every statement is guarded on the *old default* value, so a record that was
-- already customised in /admin is left alone. Re-running is a no-op.
begin;

-- 1. Profile (portfolio_site_content.key = 'profile'): title and summary copy.
update public.portfolio_site_content
set
  data = data || jsonb_build_object(
    'title', 'Software Engineer – Backend & AI-Assisted Development',
    'heroValueProposition', 'Building reliable backend systems with Java and Spring Boot while using AI-assisted development to improve software engineering workflows.',
    'heroBio', 'I build business logic, SQL, and data models with Java, Spring Boot, MyBatis, PostgreSQL, and Oracle, and use AI-assisted development to analyze, investigate, verify, and document work without giving up engineering judgment.',
    'bio', 'Software Engineer in Seoul focused on backend systems and AI-assisted development. I turn business rules into dependable Java services, design REST APIs and data models with Spring Boot, MyBatis, and PostgreSQL/Oracle, and support delivery with Next.js when needed. I use AI coding assistants in day-to-day development and am learning Agent Harness, MCP, guardrails, and evaluations through structured labs.',
    'description', 'Software Engineer in Seoul focused on backend systems and AI-assisted development. 2+ years building Java, Spring Boot, MyBatis, PostgreSQL, and Oracle applications in Cambodian and Korean enterprise environments, currently at Bizplay (Webcash Group).',
    'rotatingRoles', jsonb_build_array(
      'Software Engineer – Backend & AI-Assisted Development',
      'Java · Spring Boot · REST APIs',
      'Backend · MyBatis · PostgreSQL / Oracle',
      'AI-Assisted Development'
    )
  ),
  updated_at = now()
where key = 'profile'
  and data->>'title' = 'Backend / AX Software Engineer';

-- 2. CV (portfolio_site_content.key = 'cv'): header title and summary.
update public.portfolio_site_content
set
  data = jsonb_set(
    jsonb_set(data, '{personal,title}', to_jsonb('Software Engineer – Backend & AI-Assisted Development'::text), false),
    '{summary}',
    to_jsonb('Software Engineer focused on backend systems and AI-assisted development, with 2+ years of experience building Java and Spring Boot applications in Cambodian and Korean enterprise environments. Currently maintaining and developing enterprise financial applications at Bizplay (Webcash Group) with Java, MyBatis, and Oracle SQL. Experienced in REST APIs, Spring Security, PostgreSQL, and SQL-driven business logic for financial and B2B platforms. I use AI coding assistants such as Claude Code and Codex for requirement analysis, codebase exploration, debugging, SQL analysis, test preparation, and review, and I remain responsible for verifying every change. I am learning Agent Harness, MCP, and evaluation concepts through structured practice; these are growth areas, not production experience.'::text),
    false
  ),
  updated_at = now()
where key = 'cv'
  and data->'personal'->>'title' = 'Backend / AX Software Engineer';

-- 3. CV: the Bizplay entry's title and bullets (dates and stack untouched).
with revised as (
  select
    cv.data as original_data,
    jsonb_set(cv.data, '{experience}', to_jsonb(array(
      select case
        when e.item->>'company' = 'Bizplay'
         and e.item->>'title' = 'Backend Developer (Java & Spring Boot)'
        then e.item || jsonb_build_object(
          'title', 'Software Engineer – Backend & AI-Assisted Development',
          'bullets', jsonb_build_array(
            'Maintain and develop enterprise financial applications for government agencies and corporate clients (Bizplay, Webcash Group).',
            'Implement Java and MyBatis business logic and write Oracle SQL queries.',
            'Develop and maintain enterprise web interfaces, including voucher administration screens built with HTML, CSS, and jQuery.',
            'Analyze technical requirements and system design before implementation.',
            'Use AI coding assistants for code analysis, implementation, troubleshooting, and review preparation, while owning the correctness of each change.',
            'Collaborate with development teams and follow established coding standards.'
          )
        )
        else e.item
      end
      from jsonb_array_elements(cv.data->'experience') with ordinality as e(item, position)
      order by e.position
    )), false) as revised_data
  from public.portfolio_site_content as cv
  where cv.key = 'cv' and jsonb_typeof(cv.data->'experience') = 'array'
)
update public.portfolio_site_content as cv
set data = revised.revised_data, updated_at = now()
from revised
where cv.key = 'cv'
  and cv.data = revised.original_data
  and cv.data is distinct from revised.revised_data;

-- 4. Experience table (homepage + /about timeline): the Bizplay row.
update public.portfolio_experience
set
  role = 'Software Engineer – Backend & AI-Assisted Development',
  summary = 'Maintaining and developing enterprise financial applications at Bizplay (Webcash Group) for government agencies and corporate clients — Java and MyBatis business logic, Oracle SQL, and the enterprise web interfaces around them.',
  highlights = array[
    'Implement Java and MyBatis business logic for enterprise financial applications',
    'Write and analyze SQL queries against Oracle databases',
    'Develop and maintain enterprise web interfaces, including voucher administration screens built with HTML, CSS, and jQuery',
    'Analyze technical requirements and system design before implementation',
    'Use AI coding assistants for code analysis, implementation, troubleshooting, and review preparation, while owning the correctness of each change',
    'Collaborate with development teams and follow established coding standards in a Korean enterprise environment'
  ],
  stack = array['Java', 'MyBatis', 'Oracle', 'SQL', 'JavaScript', 'jQuery', 'HTML/CSS', 'REST APIs']
where company = 'Bizplay'
  and role = 'Backend Developer (Java & Spring Boot)';

commit;
