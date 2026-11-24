-- First-party visitor analytics: page views, letter opens, shares.
CREATE TABLE public.site_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  event TEXT NOT NULL CHECK (char_length(event) <= 40),
  path TEXT CHECK (char_length(path) <= 200),
  work_id TEXT CHECK (char_length(work_id) <= 64),
  title TEXT CHECK (char_length(title) <= 200),
  visitor_id TEXT CHECK (char_length(visitor_id) <= 64),
  referrer TEXT CHECK (char_length(referrer) <= 200),
  device TEXT CHECK (char_length(device) <= 16)
);

CREATE INDEX site_events_created_at_idx ON public.site_events (created_at DESC);

GRANT INSERT ON public.site_events TO anon, authenticated;
GRANT SELECT, DELETE ON public.site_events TO authenticated;
GRANT ALL ON public.site_events TO service_role;

ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log events"
  ON public.site_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins read events"
  ON public.site_events FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete events"
  ON public.site_events FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
