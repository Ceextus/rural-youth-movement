-- Migration: create chapters + chapter_executives + a public per-state member-count view.

-- ---- chapters (one row per active state chapter) ----
create table if not exists public.chapters (
  id uuid primary key default gen_random_uuid(),
  state text unique not null,
  slug text unique not null,
  status text not null default 'active',      -- 'active' | 'forming'
  tagline text,
  about text,
  hq_address text,
  contact_email text,
  contact_phone text,
  established text,
  stat_projects int not null default 0,
  stat_communities int not null default 0,
  stat_events int not null default 0,
  stat_lgas int not null default 0,
  created_at timestamptz not null default now()
);

-- ---- chapter executives ----
create table if not exists public.chapter_executives (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  name text not null,
  role text not null,
  photo_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists chapter_executives_chapter_idx
  on public.chapter_executives (chapter_id, display_order);

-- ---- RLS: chapters + executives are public info (read-only for everyone) ----
alter table public.chapters enable row level security;
drop policy if exists "Public can read chapters" on public.chapters;
create policy "Public can read chapters"
  on public.chapters for select to anon, authenticated using (true);

alter table public.chapter_executives enable row level security;
drop policy if exists "Public can read executives" on public.chapter_executives;
create policy "Public can read executives"
  on public.chapter_executives for select to anon, authenticated using (true);

-- ---- Aggregate view: registered members per state ----
-- Runs with the view owner's privileges, so it exposes ONLY the counts
-- (never individual member rows) to the public.
create or replace view public.state_member_counts as
  select state, count(*)::int as members
  from public.members
  group by state;

grant select on public.state_member_counts to anon, authenticated;
