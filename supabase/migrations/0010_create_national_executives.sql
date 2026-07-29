-- Migration: create national_executives table for national-level leadership.

create table if not exists public.national_executives (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_url text,
  bio text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- RLS: national executives are public info
alter table public.national_executives enable row level security;
drop policy if exists "Public can read national executives" on public.national_executives;
create policy "Public can read national executives"
  on public.national_executives for select to anon, authenticated using (true);
