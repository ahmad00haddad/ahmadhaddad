-- Equipment used in each work project
CREATE TABLE public.work_equipment (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  work_id UUID NOT NULL REFERENCES public.works(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL
);

GRANT SELECT ON public.work_equipment TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.work_equipment TO authenticated;
GRANT ALL ON public.work_equipment TO service_role;

ALTER TABLE public.work_equipment ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view work equipment"
  ON public.work_equipment FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage work equipment"
  ON public.work_equipment FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);
