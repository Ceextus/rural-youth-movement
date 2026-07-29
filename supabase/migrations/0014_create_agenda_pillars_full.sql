-- Migration: create the full agenda_pillars table.

CREATE TABLE IF NOT EXISTS public.agenda_pillars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'flag',
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.agenda_pillars ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read agenda pillars" ON public.agenda_pillars;
CREATE POLICY "Public can read agenda pillars"
  ON public.agenda_pillars FOR SELECT TO anon, authenticated USING (true);
