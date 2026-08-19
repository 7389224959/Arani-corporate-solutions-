-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. candidate_profiles
CREATE TABLE IF NOT EXISTS public.candidate_profiles (
  email TEXT PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  national_id TEXT,
  address TEXT,
  district TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  education TEXT,
  current_company TEXT,
  "current_role" TEXT,
  experience_years TEXT,
  expected_ctc TEXT,
  notice_period TEXT,
  skills TEXT,
  confidential_search BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. counselling_leads
CREATE TABLE IF NOT EXISTS public.counselling_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  sector TEXT,
  experience TEXT,
  preferred_time TEXT,
  status TEXT DEFAULT 'Pending Callback',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. employer_leads
CREATE TABLE IF NOT EXISTS public.employer_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  industry TEXT,
  roles_needed TEXT,
  headcount TEXT,
  urgency TEXT,
  notes TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. job_applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id TEXT,
  job_code TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  national_id TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'Applied',
  cover_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. jobs
CREATE TABLE IF NOT EXISTS public.jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  type TEXT,
  experience TEXT,
  status TEXT DEFAULT 'Open',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'Candidate',
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. site_settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  director_data JSONB,
  hero_slides JSONB,
  partner_logos JSONB,
  testimonials JSONB,
  faqs JSONB,
  articles JSONB,
  live_stats JSONB,
  "clientReelTemplates" JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial site_settings row to ensure updates work
INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
