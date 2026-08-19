-- ====================================================================
-- ARANI CORPORATE SOLUTIONS - COMPLETE SUPABASE DATABASE & STORAGE SCHEMA
-- Run this script in your Supabase SQL Editor (https://app.supabase.com -> SQL Editor)
-- ====================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. COUNSELLING LEADS TABLE
-- Stores requests from candidates seeking free job counselling
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.counselling_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    sector TEXT DEFAULT 'Banking & Financial Services',
    experience TEXT DEFAULT 'Fresher / Graduate',
    preferred_time TEXT DEFAULT 'Morning (9 AM - 12 PM)',
    status TEXT DEFAULT 'Pending Callback', -- 'Pending Callback', 'Contacted', 'Completed', 'Cancelled'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for counselling_leads
ALTER TABLE public.counselling_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to insert new counselling requests
CREATE POLICY "Allow public insert into counselling_leads" 
ON public.counselling_leads FOR INSERT 
WITH CHECK (true);

-- Allow public read access to own/authenticated staff (or select all for staff role)
CREATE POLICY "Allow read access to counselling_leads" 
ON public.counselling_leads FOR SELECT 
USING (true);

CREATE POLICY "Allow update/delete on counselling_leads" 
ON public.counselling_leads FOR ALL 
USING (true);


-- --------------------------------------------------------------------
-- 2. EMPLOYER LEADS & TALENT REQUIREMENTS TABLE
-- Stores B2B requests from companies requesting staff / HR advisory
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.employer_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    industry TEXT NOT NULL,
    roles_needed TEXT NOT NULL,
    headcount TEXT DEFAULT '1-3',
    urgency TEXT DEFAULT 'Within 72 Hours',
    notes TEXT,
    status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'Proposal Sent', 'Contract Signed', 'Closed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.employer_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert into employer_leads" 
ON public.employer_leads FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read employer_leads" 
ON public.employer_leads FOR SELECT 
USING (true);

CREATE POLICY "Allow all management on employer_leads" 
ON public.employer_leads FOR ALL 
USING (true);


-- --------------------------------------------------------------------
-- 3. JOBS TABLE
-- Stores job postings (Banking, Finance, Corporate, IT, Operations)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_code TEXT UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Banking', 'Corporate HR', 'Finance', 'Operations', 'IT'
    location TEXT NOT NULL,
    salary_min NUMERIC,
    salary_max NUMERIC,
    salary_display TEXT,
    type TEXT DEFAULT 'Full-time', -- 'Full-time', 'Contract', 'Part-time'
    experience TEXT DEFAULT '0-2 Yrs',
    description TEXT,
    requirements TEXT[],
    status TEXT DEFAULT 'Open', -- 'Open', 'Urgent', 'Featured', 'Closed'
    is_confidential BOOLEAN DEFAULT false,
    posted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to jobs" 
ON public.jobs FOR SELECT 
USING (true);

CREATE POLICY "Allow full access to jobs" 
ON public.jobs FOR ALL 
USING (true);


-- --------------------------------------------------------------------
-- 4. CANDIDATE PROFILES TABLE
-- Stores full profiles of candidates registered on the portal
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.candidate_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    national_id TEXT,
    address TEXT,
    district TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    education TEXT,
    current_company TEXT,
    current_role TEXT,
    experience_years TEXT,
    expected_ctc TEXT,
    notice_period TEXT,
    skills TEXT,
    confidential_search BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert candidate_profiles" 
ON public.candidate_profiles FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update candidate_profiles" 
ON public.candidate_profiles FOR UPDATE
USING (true);

CREATE POLICY "Allow full access candidate_profiles" 
ON public.candidate_profiles FOR ALL 
USING (true);


-- --------------------------------------------------------------------
-- 5. JOB APPLICATIONS TABLE
-- Stores candidate job applications & uploaded resume URLs
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
    job_code TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    national_id TEXT,
    resume_url TEXT,
    status TEXT DEFAULT 'Applied', -- 'Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'
    cover_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert job_applications" 
ON public.job_applications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow full access job_applications" 
ON public.job_applications FOR ALL 
USING (true);


-- --------------------------------------------------------------------
-- 5. DIRECTORS & LEADERSHIP TEAM TABLE
-- Stores profiles & photo URLs of company directors and leadership
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.directors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    linkedin_url TEXT,
    email TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.directors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read directors" 
ON public.directors FOR SELECT 
USING (true);

CREATE POLICY "Allow full management directors" 
ON public.directors FOR ALL 
USING (true);


-- --------------------------------------------------------------------
-- 6. MEDIA ASSETS & HERO SLIDES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    headline TEXT NOT NULL,
    subheadline TEXT,
    cta_label TEXT,
    cta_link TEXT,
    background_url TEXT,
    target_audience TEXT DEFAULT 'all', -- 'all', 'seeker', 'employer'
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read hero_slides" 
ON public.hero_slides FOR SELECT 
USING (true);

CREATE POLICY "Allow full access hero_slides" 
ON public.hero_slides FOR ALL 
USING (true);


-- --------------------------------------------------------------------
-- 7. STORAGE BUCKETS SETUP INSTRUCTIONS FOR SUPABASE STORAGE
-- Run these SQL statements or create buckets in Supabase Storage Dashboard:
-- --------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('counselling_resumes', 'counselling_resumes', true),
  ('director_photos', 'director_photos', true),
  ('media_assets', 'media_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Security Policies for public uploads & public downloads
CREATE POLICY "Public Read counselling_resumes" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'counselling_resumes');

CREATE POLICY "Public Upload counselling_resumes" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'counselling_resumes');

CREATE POLICY "Public Read director_photos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'director_photos');

CREATE POLICY "Public Upload director_photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'director_photos');

CREATE POLICY "Public Read media_assets" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'media_assets');

CREATE POLICY "Public Upload media_assets" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'media_assets');

-- Done! Your Supabase database & storage schema is completely ready!
