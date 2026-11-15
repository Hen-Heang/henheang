-- Allow anyone to view images in portfolio bucket
create policy "public read portfolio storage"
  on storage.objects for select
  using (bucket_id = 'portfolio');

-- Allow authenticated user (admin) to upload/update/delete
create policy "admin write portfolio storage"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio');

create policy "admin update portfolio storage"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio');

create policy "admin delete portfolio storage"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio');
