-- ====================================================================
-- SUPABASE SETUP SCRIPT FOR WONDER ROOTS GALLERY
-- Run this in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste this script -> Run (Ctrl+Enter)
-- ====================================================================

-- 1. Create the `gallery_items` table
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    url TEXT NOT NULL,
    storage_path TEXT,
    category TEXT DEFAULT 'General',
    aspect_ratio TEXT DEFAULT 'auto',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) on gallery_items
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for public access (protected in frontend via Admin PIN)
-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public read access" ON public.gallery_items;
DROP POLICY IF EXISTS "Allow public insert" ON public.gallery_items;
DROP POLICY IF EXISTS "Allow public delete" ON public.gallery_items;

CREATE POLICY "Allow public read access"
ON public.gallery_items FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert"
ON public.gallery_items FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public delete"
ON public.gallery_items FOR DELETE
TO public
USING (true);

-- 4. Create the `gallery-media` Storage Bucket (if not already created)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'gallery-media',
    'gallery-media',
    true,
    52428800, -- 50 MB limit
    ARRAY[
        'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
        'video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'
    ]
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 52428800;

-- 5. Set up Storage Bucket Policies for `gallery-media`
DROP POLICY IF EXISTS "Public can view gallery media" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload gallery media" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete gallery media" ON storage.objects;

CREATE POLICY "Public can view gallery media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery-media');

CREATE POLICY "Public can upload gallery media"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'gallery-media');

CREATE POLICY "Public can delete gallery media"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'gallery-media');

-- 6. Insert Starter Demo Data (optional, safe to run)
INSERT INTO public.gallery_items (title, description, media_type, url, category)
VALUES
    ('Father''s Day Celebration', 'Precious moments celebrated with loving dads at Wonder Roots campus.', 'image', '/hero-1.jpg', 'Events & Celebrations'),
    ('Creative Clay & Craft Hour', 'Little hands sculpting imagination into colorful art forms.', 'image', '/hero-2.jpg', 'Art & Craft'),
    ('Green Day Plantation', 'Learning environmental care and planting saplings in the garden.', 'image', '/hero-3.jpg', 'Outdoor & Nature'),
    ('Fun with Numbers & Puzzles', 'Interactive early numeracy games and interactive building blocks.', 'image', '/hero-2.jpg', 'Classroom & Learning'),
    ('Annual Sports Day Sprint', 'Cheering our young champions as they dash across the finish line!', 'image', '/hero-1.jpg', 'Sports & Outdoor'),
    ('Kindergarten Dance Practice', 'Joyful rhythm, clapping and dance routines in our activity room.', 'video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'Events & Celebrations'),
    ('Young Explorers Science Discovery', 'Exploring magnets, magnifying glasses and nature wonders.', 'image', '/hero-3.jpg', 'Classroom & Learning')
ON CONFLICT DO NOTHING;

-- ====================================================================
-- 7. Create `admissions_leads` Table for Enroll Now & Contact Forms
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.admissions_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_type TEXT NOT NULL DEFAULT 'Enroll Now', -- 'Enroll Now' or 'Contact Section'
    parent_name TEXT NOT NULL,
    child_name TEXT DEFAULT '',
    phone TEXT NOT NULL,
    email TEXT DEFAULT '',
    city TEXT DEFAULT 'Not Specified',
    child_age TEXT DEFAULT '',
    program TEXT DEFAULT 'Playgroup',
    academic_session TEXT DEFAULT '2026-2027',
    message TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'New', -- 'New', 'Contacted', 'Visit Scheduled', 'Enrolled', 'Closed'
    admin_notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on admissions_leads
ALTER TABLE public.admissions_leads ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (secured in frontend via Admin PIN)
DROP POLICY IF EXISTS "Allow public read leads" ON public.admissions_leads;
DROP POLICY IF EXISTS "Allow public insert leads" ON public.admissions_leads;
DROP POLICY IF EXISTS "Allow public update leads" ON public.admissions_leads;
DROP POLICY IF EXISTS "Allow public delete leads" ON public.admissions_leads;

CREATE POLICY "Allow public read leads"
ON public.admissions_leads FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert leads"
ON public.admissions_leads FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update leads"
ON public.admissions_leads FOR UPDATE
TO public
USING (true);

CREATE POLICY "Allow public delete leads"
ON public.admissions_leads FOR DELETE
TO public
USING (true);

-- 8. Starter Demo Leads
INSERT INTO public.admissions_leads (form_type, parent_name, child_name, phone, email, city, child_age, program, message, status, admin_notes)
VALUES
    ('Enroll Now', 'Pooja Sharma', 'Aarav Sharma', '+91 98201 44521', 'pooja.sharma@gmail.com', 'Mumbai', '2-3 years', 'Playgroup', 'Interested in morning batch for Playgroup. Need bus transport facility.', 'New', 'Spoke briefly on phone. Follow-up scheduled for Monday.'),
    ('Contact Section', 'Rahul Verma', 'Ananya Verma', '+91 98112 33412', 'rahul.v@outlook.com', 'Delhi', '3-4 years', 'Nursery', 'Looking for a campus visit this Saturday at 11 AM.', 'Visit Scheduled', 'Visit confirmed for Saturday 11 AM with Head Teacher.'),
    ('Enroll Now', 'Sneha Patel', 'Kabir Patel', '+91 97245 88910', 'sneha.patel@yahoo.com', 'Ahmedabad', '4-5 years', 'LKG', 'Relocating to Ahmedabad next month from Pune, seeking mid-term admission.', 'Contacted', 'Shared curriculum overview and fee structure.')
ON CONFLICT DO NOTHING;

