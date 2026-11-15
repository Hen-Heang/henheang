alter table public.portfolio_ai_categories add column id uuid default gen_random_uuid();
update public.portfolio_ai_categories set id = gen_random_uuid() where id is null;
alter table public.portfolio_ai_categories alter column id set not null;
alter table public.portfolio_ai_categories add constraint portfolio_ai_categories_slug_key unique (slug);
alter table public.portfolio_ai_articles drop constraint portfolio_ai_articles_category_slug_fkey;
alter table public.portfolio_ai_categories drop constraint portfolio_ai_categories_pkey;
alter table public.portfolio_ai_categories add primary key (id);
alter table public.portfolio_ai_articles add constraint portfolio_ai_articles_category_slug_fkey
  foreign key (category_slug) references public.portfolio_ai_categories(slug) on delete restrict;
;
