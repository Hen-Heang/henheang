-- Refresh the default career copy while preserving edited bullets, dates, and
-- unrelated content in the experience and CV records.
begin;

update public.portfolio_experience
set highlights = array_replace(
  array_replace(
    highlights,
    'Developing frontend pages with HTML/CSS and JavaScript (jQuery)',
    'Build voucher administration screens with HTML, CSS, and jQuery'
  ),
  'Building backend services with Java and MyBatis',
  'Develop Java and MyBatis services for government-facing financial applications'
)
where company = 'Bizplay'
  and highlights && array[
    'Developing frontend pages with HTML/CSS and JavaScript (jQuery)',
    'Building backend services with Java and MyBatis'
  ];

update public.portfolio_experience
set highlights = array_replace(
  highlights,
  'Built a B2B billing and payment platform for enterprise clients',
  'Contributed to WeBill365, a B2B billing product with Vietnamese banking integrations'
)
where company in (
    'KOSIGN',
    'KOSIGN [Korea Software Innovation Global Network]',
    'KOSIGN (Korea Software Innovation Global Network)'
  )
  and 'Built a B2B billing and payment platform for enterprise clients' = any(highlights);

with cv_copy(company, old_bullet, new_bullet) as (
  values
    (
      'Bizplay',
      'Implement Java and MyBatis services and SQL queries against an Oracle database for government-facing financial systems.',
      'Develop Java and MyBatis services and Oracle SQL queries for government-facing financial applications.'
    ),
    (
      'Bizplay',
      'Build supporting frontend pages with HTML, CSS, and JavaScript (jQuery) for internal enterprise tools.',
      'Build voucher administration screens with HTML, CSS, and jQuery.'
    ),
    (
      'KOSIGN (Korea Software Innovation Global Network)',
      'Designed and developed REST APIs with Spring Boot and MyBatis for an enterprise B2B billing platform integrated with Vietnamese banking systems.',
      'Developed Spring Boot and MyBatis REST APIs for WeBill365, a B2B billing product with Vietnamese banking integrations.'
    )
),
revised_cv as (
  select
    cv.data as original_data,
    jsonb_set(cv.data, '{experience}', to_jsonb(array(
      select case
        when jsonb_typeof(e.item->'bullets') = 'array' then jsonb_set(e.item, '{bullets}', to_jsonb(array(
          select coalesce(to_jsonb(c.new_bullet), b.item)
          from jsonb_array_elements(e.item->'bullets') with ordinality as b(item, position)
          left join cv_copy as c
            on c.company = e.item->>'company' and to_jsonb(c.old_bullet) = b.item
          order by b.position
        )), false)
        else e.item
      end
      from jsonb_array_elements(cv.data->'experience') with ordinality as e(item, position)
      order by e.position
    )), false) as revised_data
  from public.portfolio_site_content as cv
  where cv.key = 'cv' and jsonb_typeof(cv.data->'experience') = 'array'
)
update public.portfolio_site_content as cv
set data = revised_cv.revised_data, updated_at = now()
from revised_cv
where cv.key = 'cv'
  and cv.data = revised_cv.original_data
  and cv.data is distinct from revised_cv.revised_data;

commit;
