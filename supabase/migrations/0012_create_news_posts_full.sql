-- Migration: create the full news_posts table for the CMS.

CREATE TABLE IF NOT EXISTS public.news_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  body text NOT NULL DEFAULT '',
  cover_image text,
  tag text DEFAULT 'General',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS news_posts_status_idx
  ON public.news_posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS news_posts_slug_idx
  ON public.news_posts (slug);

-- Public can read published posts only
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published news" ON public.news_posts;
CREATE POLICY "Public can read published news"
  ON public.news_posts FOR SELECT TO anon, authenticated
  USING (status = 'published');
