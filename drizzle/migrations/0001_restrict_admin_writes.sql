DROP POLICY IF EXISTS "Auth manage clients" ON public.clients;
CREATE POLICY "Admins manage clients" ON public.clients FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "Authenticated users can manage works" ON public.works;
CREATE POLICY "Admins manage works" ON public.works FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "Auth manage site_settings" ON public.site_settings;
CREATE POLICY "Admins manage site_settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));