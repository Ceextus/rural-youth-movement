-- Migration: global site settings (single row) — powers editable logo, nav,
-- footer, contact info, socials, and SEO defaults.

create table if not exists public.site_settings (
  id text primary key default 'global',
  site_name text not null default 'Rural Youth Movement',
  tagline text,
  logo_url text,
  contact_email text,
  contact_phone text,
  contact_address text,
  seo_description text,
  socials jsonb not null default '{}'::jsonb,          -- {facebook, twitter, instagram, youtube, website}
  nav_links jsonb not null default '[]'::jsonb,         -- [{label, href}]
  footer_columns jsonb not null default '[]'::jsonb,    -- [{heading, links:[{label, href}]}]
  updated_at timestamptz not null default now()
);

-- Public read (settings drive the public layout); writes via service role only.
alter table public.site_settings enable row level security;
drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
  on public.site_settings for select to anon, authenticated using (true);

-- Seed the single global row with the current site content.
insert into public.site_settings (id, site_name, tagline, logo_url, contact_email, contact_phone, contact_address, seo_description, socials, nav_links, footer_columns)
values (
  'global',
  'Rural Youth Movement',
  'For the People, By the Youth. Mobilising the grassroots for rural development.',
  '/logo.png',
  'hello@rymovement.org',
  '+234 800 000 0000',
  'Plot 100, Grassroots Avenue, Central Business District, Abuja, FCT, Nigeria',
  'Mobilising the grassroots for rural development and civic participation across Nigeria''s 36 states.',
  '{"facebook":"#","twitter":"#","instagram":"#","website":"#"}'::jsonb,
  '[{"label":"Home","href":"/"},{"label":"About","href":"/about"},{"label":"Our Agenda","href":"/agenda"},{"label":"Chapters","href":"/chapters"},{"label":"News","href":"/news"},{"label":"Contact","href":"/contact"}]'::jsonb,
  '[{"heading":"Organization","links":[{"label":"National Secretariat","href":"/about"},{"label":"State Chapters","href":"/chapters"},{"label":"Constitution","href":"/about"}]},{"heading":"Initiatives","links":[{"label":"Policy Agenda","href":"/agenda"},{"label":"Rural Development","href":"/agenda"},{"label":"Civic Education","href":"/agenda"}]},{"heading":"Legal","links":[{"label":"Privacy Policy","href":"#"},{"label":"Terms of Service","href":"#"}]}]'::jsonb
)
on conflict (id) do nothing;
