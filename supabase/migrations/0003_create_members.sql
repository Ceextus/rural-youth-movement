-- Migration: create members table
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  state text not null,
  lga text not null,
  ward text not null,
  interests text[] not null default '{}',
  vision text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists members_email_idx on public.members (email);
create index if not exists members_state_idx on public.members (state);
