alter table public.portfolio_projects add column if not exists slug text;

update public.portfolio_projects
set slug = regexp_replace(regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'), '(^-|-$)', '', 'g')
where slug is null;

-- Match the slugs the site already uses (shorter than the auto-generated ones)
update public.portfolio_projects set slug = 'h-phsar' where title like 'H-Phsar%';
update public.portfolio_projects set slug = 'hengo' where title like 'Hengo%';
update public.portfolio_projects set slug = 'money-flow' where title like 'Money Flow%';
update public.portfolio_projects set slug = 'we-commerce' where title like 'We Commerce%';

alter table public.portfolio_projects alter column slug set not null;
alter table public.portfolio_projects add constraint portfolio_projects_slug_key unique (slug);
