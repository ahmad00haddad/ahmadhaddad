DROP POLICY IF EXISTS "Public read media" ON storage.objects;
CREATE POLICY "Admin read media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));