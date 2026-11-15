-- Add missing fields to achievements
alter table portfolio.achievements add column if not exists type text default 'certificate' check (type in ('certificate', 'graduation', 'award'));
alter table portfolio.achievements add column if not exists link text;
