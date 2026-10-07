ALTER TABLE public.work_equipment ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
DROP POLICY IF EXISTS "Authenticated users can manage work equipment" ON public.work_equipment;
CREATE POLICY "Admins manage work equipment" ON public.work_equipment FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));