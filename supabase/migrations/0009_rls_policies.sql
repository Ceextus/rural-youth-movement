-- Migration: row level security policies
--
-- members + contact_messages: the public may INSERT (submit) but never SELECT.
-- Reads happen server-side via the service-role key, which bypasses RLS.

-- ---- members ----
alter table public.members enable row level security;

drop policy if exists "Public can submit membership" on public.members;
create policy "Public can submit membership"
  on public.members
  for insert
  to anon, authenticated
  with check (true);

-- ---- contact_messages ----
alter table public.contact_messages enable row level security;

drop policy if exists "Public can submit contact message" on public.contact_messages;
create policy "Public can submit contact message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
