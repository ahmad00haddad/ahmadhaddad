DROP POLICY IF EXISTS "Auth manage testimonials" ON public.testimonials;
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Anyone can view work equipment" ON public.work_equipment;
CREATE POLICY "View equipment of published works" ON public.work_equipment FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.works w WHERE w.id = work_id AND w.published = true) OR public.has_role(auth.uid(), 'admin'));