-- Add is_read flag to contact_messages for admin inbox tracking.
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false;
