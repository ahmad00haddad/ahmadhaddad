
-- site_settings: flexible key/value store for all editable site content
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Auth manage site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Film',
  title text NOT NULL,
  title_en text,
  description text,
  description_en text,
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Auth manage services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- testimonials
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  quote text NOT NULL,
  quote_en text,
  avatar_url text,
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Auth manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- clients (logos)
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  url text,
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.clients TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients TO authenticated;
GRANT ALL ON public.clients TO service_role;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read clients" ON public.clients FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Auth manage clients" ON public.clients FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER trg_clients_updated BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed default site settings (Arabic + English content) so admin sees existing copy
INSERT INTO public.site_settings (key, value) VALUES
  ('brand', '{"name_ar":"أحمد حدّاد","name_en":"Ahmad Haddad","tagline_ar":"استوديو","tagline_en":"Studio","logo_url":""}'::jsonb),
  ('hero', '{"eyebrow_ar":"إطار وَ تركيز","eyebrow_en":"Frame & Focus","title_ar":"حكاياتٌ تُروى بالضوء","title_en":"Stories Told in Light","subtitle_ar":"مخرج ومصوّر سينمائي. أصنع أفلامًا قصيرة وإعلانات بصرية بلمسة سينمائية أصيلة.","subtitle_en":"Director & cinematographer crafting short films and visual ads with authentic cinematic touch.","portrait_url":""}'::jsonb),
  ('about', '{"title_ar":"عن أحمد","title_en":"About Ahmad","body_ar":"مخرج ومصوّر سينمائي شغوف بسرد القصص بصريًا. أعمل بين الأفلام القصيرة والإعلانات التجارية والتوثيق.","body_en":"Director and cinematographer passionate about visual storytelling. I work between short films, commercials, and documentary."}'::jsonb),
  ('contact', '{"email":"hello@haddad.studio","phone":"+962 7 0000 0000","city_ar":"عمّان، الأردن","city_en":"Amman, Jordan","instagram":"https://instagram.com/","youtube":"https://youtube.com/","vimeo":"https://vimeo.com/","linkedin":""}'::jsonb),
  ('footer', '{"copyright_ar":"© جميع الحقوق محفوظة — أحمد حدّاد","copyright_en":"© All rights reserved — Ahmad Haddad"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
