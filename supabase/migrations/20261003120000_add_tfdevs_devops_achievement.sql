-- Add the verified TFDevs achievement with a locally-redacted certificate
-- image. The redacted asset removes the recipient's date of birth.
insert into public.portfolio_achievements (
  title,
  issuer,
  date,
  type,
  description,
  image,
  link,
  sort_order
)
values (
  'DevOps Essential',
  'TFDevs',
  '2026',
  'certificate',
  'Completed and passed TFDevs'' DevOps Essential course. Certificate No. TFD-2026-000019.',
  '/certificate/tfdevs-devops-essential-redacted.png',
  null,
  19
)
on conflict (title, issuer) do update set
  date = excluded.date,
  type = excluded.type,
  description = excluded.description,
  image = excluded.image,
  link = excluded.link,
  sort_order = excluded.sort_order;
