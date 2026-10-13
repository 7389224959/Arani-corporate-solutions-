-- Supabase Migration: WhatsApp & Instagram Chatbot Integration for Aranii Corporate Solutions
-- Migration Date: 2026-10-08

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CHAT SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'instagram', 'web')),
  channel_user_id TEXT NOT NULL, -- Phone number for WhatsApp, IGSID/Sender ID for Instagram
  user_name TEXT,
  user_phone TEXT,
  user_email TEXT,
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unread_count INT DEFAULT 0,
  ai_enabled BOOLEAN DEFAULT true, -- Allows human agent handoff
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending_human', 'closed', 'resolved')),
  lead_captured BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT uq_channel_user UNIQUE (channel, channel_user_id)
);

-- 2. CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant', 'agent', 'admin')),
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'instagram', 'web')),
  content TEXT NOT NULL,
  message_id TEXT, -- Meta/WhatsApp message ID (wamid / mid)
  raw_payload JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'delivered' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CHAT LEADS TABLE
CREATE TABLE IF NOT EXISTS public.chat_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE SET NULL,
  channel TEXT,
  lead_type TEXT DEFAULT 'candidate' CHECK (lead_type IN ('candidate', 'employer', 'counselling', 'general')),
  name TEXT,
  phone TEXT,
  email TEXT,
  role_interest TEXT,
  experience_years TEXT,
  expected_ctc TEXT,
  company_name TEXT,
  urgency TEXT,
  notes TEXT,
  raw_extracted JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_chat_sessions_channel_user ON public.chat_sessions(channel, channel_user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_last_message ON public.chat_sessions(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON public.chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON public.chat_messages(session_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_chat_leads_session ON public.chat_leads(session_id);

-- TRIGGER FUNCTION TO AUTO UPDATE SESSION ON NEW MESSAGE
CREATE OR REPLACE FUNCTION public.handle_new_chat_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.chat_sessions
  SET 
    last_message = NEW.content,
    last_message_at = NEW.created_at,
    updated_at = NOW(),
    unread_count = CASE 
      WHEN NEW.sender = 'user' THEN unread_count + 1
      ELSE unread_count
    END
  WHERE id = NEW.session_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_new_chat_message ON public.chat_messages;
CREATE TRIGGER trg_new_chat_message
AFTER INSERT ON public.chat_messages
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_chat_message();

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;

-- Allow public / anon read & insert for webhooks & public forms
CREATE POLICY "Allow public read chat_sessions" ON public.chat_sessions FOR SELECT USING (true);
CREATE POLICY "Allow public insert chat_sessions" ON public.chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update chat_sessions" ON public.chat_sessions FOR UPDATE USING (true);

CREATE POLICY "Allow public read chat_messages" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert chat_messages" ON public.chat_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read chat_leads" ON public.chat_leads FOR SELECT USING (true);
CREATE POLICY "Allow public insert chat_leads" ON public.chat_leads FOR INSERT WITH CHECK (true);
