-- Add member_code and photo_url to members
ALTER TABLE public.members 
ADD COLUMN IF NOT EXISTS member_code TEXT,
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Generate unique member codes for existing members using RYM-[STATE]-[SHORT_UUID]
DO $$ 
DECLARE
    r RECORD;
    short_uuid TEXT;
    state_code TEXT;
BEGIN
    FOR r IN SELECT id, state FROM public.members WHERE member_code IS NULL LOOP
        short_uuid := UPPER(SUBSTRING(r.id::text, 1, 6));
        state_code := UPPER(SUBSTRING(r.state, 1, 3));
        
        -- Fallback if state is null
        IF state_code IS NULL THEN
            state_code := 'NAT';
        END IF;

        UPDATE public.members 
        SET member_code = 'RYM-' || state_code || '-' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' || short_uuid
        WHERE id = r.id;
    END LOOP;
END $$;

-- Make member_code unique
ALTER TABLE public.members ADD CONSTRAINT members_member_code_key UNIQUE (member_code);

-- Create storage bucket for member photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('member_photos', 'member_photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'member_photos'
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'member_photos' );

CREATE POLICY "Allow public uploads to member_photos" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'member_photos' );
