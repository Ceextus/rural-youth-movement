-- Migration: flexible key/value store for singleton page-section content
-- (hero copy, stats, CTA text, etc.). One row per section, value is JSONB.

create table if not exists public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
  on public.site_content for select to anon, authenticated using (true);
