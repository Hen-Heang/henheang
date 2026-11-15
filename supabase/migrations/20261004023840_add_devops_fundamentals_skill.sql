-- Keep the Supabase-backed skill catalog aligned with the verified TFDevs
-- DevOps Essential certificate. This is foundational working knowledge, not a
-- claim of senior production DevOps experience.
insert into public.portfolio_skill_categories (category, sort_order)
values ('Tools', 3)
on conflict (category) do nothing;

insert into public.portfolio_skills (category_id, name, level, experience, sort_order)
select id, 'DevOps Fundamentals', 2, 'Foundational training', 0
from public.portfolio_skill_categories
where category = 'Tools'
on conflict (category_id, name) do update set
  level = excluded.level,
  experience = excluded.experience,
  sort_order = excluded.sort_order;
