-- Migration: All India Mega Banking Job Drive 2026 Registrations & Payment Verifications
-- Date: 2026-10-13

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.mega_job_drive_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_token TEXT UNIQUE NOT NULL,
  roll_number TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_number TEXT,
  city TEXT NOT NULL,
  state TEXT,
  highest_qualification TEXT NOT NULL,
  passout_year TEXT,
  total_experience TEXT NOT NULL,
  current_company TEXT,
  current_ctc TEXT,
  expected_ctc TEXT,
  target_role TEXT NOT NULL,
  preferred_location TEXT,
  resume_url TEXT,
  fee_amount NUMERIC DEFAULT 499,
  payment_status TEXT DEFAULT 'pending_verification' CHECK (payment_status IN ('pending_payment', 'pending_verification', 'verified', 'rejected')),
  payment_utr TEXT,
  payment_screenshot_url TEXT,
  payment_verified_at TIMESTAMP WITH TIME ZONE,
  verified_by TEXT,
  rejection_reason TEXT,
  interview_slot TEXT,
  interview_venue TEXT DEFAULT 'Aranii Corporate Hub & Participating Bank Regional Centers',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  raw_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_mega_job_drive_token ON public.mega_job_drive_registrations(registration_token);
CREATE INDEX IF NOT EXISTS idx_mega_job_drive_roll ON public.mega_job_drive_registrations(roll_number);
CREATE INDEX IF NOT EXISTS idx_mega_job_drive_phone ON public.mega_job_drive_registrations(phone);
CREATE INDEX IF NOT EXISTS idx_mega_job_drive_email ON public.mega_job_drive_registrations(email);
CREATE INDEX IF NOT EXISTS idx_mega_job_drive_status ON public.mega_job_drive_registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_mega_job_drive_role ON public.mega_job_drive_registrations(target_role);
CREATE INDEX IF NOT EXISTS idx_mega_job_drive_created ON public.mega_job_drive_registrations(created_at DESC);

-- Row Level Security
ALTER TABLE public.mega_job_drive_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert mega_job_drive_registrations"
ON public.mega_job_drive_registrations
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public select by token"
ON public.mega_job_drive_registrations
FOR SELECT
USING (true);

CREATE POLICY "Allow public update payment info"
ON public.mega_job_drive_registrations
FOR UPDATE
USING (true);
