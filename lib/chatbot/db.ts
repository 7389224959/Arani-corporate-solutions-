import { getAdminSupabase } from '@/lib/supabase-admin';
import { getSupabase } from '@/lib/supabase';

export interface ChatSession {
  id: string;
  channel: 'whatsapp' | 'instagram' | 'web';
  channel_user_id: string;
  user_name?: string;
  user_phone?: string;
  user_email?: string;
  last_message?: string;
  last_message_at: string;
  unread_count: number;
  ai_enabled: boolean;
  status: 'active' | 'pending_human' | 'closed' | 'resolved';
  lead_captured: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender: 'user' | 'assistant' | 'agent' | 'admin';
  channel: string;
  content: string;
  message_id?: string;
  raw_payload?: any;
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  created_at: string;
}

export interface ChatLead {
  id: string;
  session_id?: string;
  channel: string;
  lead_type: 'candidate' | 'employer' | 'counselling' | 'general';
  name?: string;
  phone?: string;
  email?: string;
  role_interest?: string;
  experience_years?: string;
  expected_ctc?: string;
  company_name?: string;
  urgency?: string;
  notes?: string;
  raw_extracted?: any;
  created_at: string;
}

// In-Memory fallback store for environments without Supabase configured
const memSessions = new Map<string, ChatSession>();
const memMessages: ChatMessage[] = [];
const memLeads: ChatLead[] = [];

// Seed sample session if memory store is empty
function ensureSampleData() {
  if (memSessions.size === 0) {
    const s1Id = 'sample-sess-wa-1';
    memSessions.set(`whatsapp_+919876543210`, {
      id: s1Id,
      channel: 'whatsapp',
      channel_user_id: '+919876543210',
      user_name: 'Rahul Sharma',
      user_phone: '+919876543210',
      user_email: 'rahul.sharma@example.com',
      last_message: 'Hi, I am looking for Senior Credit Analyst roles in Mumbai. 4 yrs banking exp.',
      last_message_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      unread_count: 1,
      ai_enabled: true,
      status: 'active',
      lead_captured: true,
      metadata: { role_interest: 'Credit Analyst', experience: '4 years', location: 'Mumbai' },
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    });

    memMessages.push(
      {
        id: 'msg-1',
        session_id: s1Id,
        sender: 'user',
        channel: 'whatsapp',
        content: 'Hello, do you have banking openings in Mumbai?',
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        status: 'read',
      },
      {
        id: 'msg-2',
        session_id: s1Id,
        sender: 'assistant',
        channel: 'whatsapp',
        content: 'Namaste Rahul! Welcome to Aranii Corporate Solutions. Yes, we are actively recruiting for Private & PSU Banks in Mumbai for Credit Analyst, Branch Manager, and Wealth Management roles. Could you share your years of experience and preferred role?',
        created_at: new Date(Date.now() - 1000 * 60 * 59).toISOString(),
        status: 'read',
      },
      {
        id: 'msg-3',
        session_id: s1Id,
        sender: 'user',
        channel: 'whatsapp',
        content: 'Hi, I am looking for Senior Credit Analyst roles in Mumbai. 4 yrs banking exp.',
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        status: 'delivered',
      }
    );

    const s2Id = 'sample-sess-ig-1';
    memSessions.set(`instagram_ig_priya_finance`, {
      id: s2Id,
      channel: 'instagram',
      channel_user_id: 'ig_priya_finance',
      user_name: 'Priya Patel',
      user_email: 'priya@fintechcorp.in',
      last_message: 'We need 5 Relationship Managers for HDFC Bank branch expansion.',
      last_message_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      unread_count: 0,
      ai_enabled: false,
      status: 'pending_human',
      lead_captured: true,
      metadata: { company: 'FinTech Growth Partners', role_needed: 'Relationship Managers' },
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    });

    memMessages.push(
      {
        id: 'msg-4',
        session_id: s2Id,
        sender: 'user',
        channel: 'instagram',
        content: 'Hi, are you open for corporate talent sourcing partnerships?',
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        status: 'read',
      },
      {
        id: 'msg-5',
        session_id: s2Id,
        sender: 'assistant',
        channel: 'instagram',
        content: 'Hello Priya! Absolutely. Aranii Corporate Solutions works with leading banks and financial institutions for both volume and executive hiring.',
        created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        status: 'read',
      },
      {
        id: 'msg-6',
        session_id: s2Id,
        sender: 'user',
        channel: 'instagram',
        content: 'We need 5 Relationship Managers for HDFC Bank branch expansion.',
        created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        status: 'delivered',
      }
    );
  }
}

/**
 * Retrieves an existing session or creates a new one
 */
export async function getOrCreateChatSession(
  channel: 'whatsapp' | 'instagram' | 'web',
  channelUserId: string,
  userName?: string,
  phone?: string,
  email?: string
): Promise<ChatSession> {
  const adminClient = await getAdminSupabase();

  if (adminClient) {
    try {
      const { data: existing, error: selectErr } = await adminClient
        .from('chat_sessions')
        .select('*')
        .eq('channel', channel)
        .eq('channel_user_id', channelUserId)
        .maybeSingle();

      if (!selectErr && existing) {
        if (userName || phone || email) {
          const updates: any = {};
          if (userName && !existing.user_name) updates.user_name = userName;
          if (phone && !existing.user_phone) updates.user_phone = phone;
          if (email && !existing.user_email) updates.user_email = email;

          if (Object.keys(updates).length > 0) {
            updates.updated_at = new Date().toISOString();
            const { data: updated } = await adminClient
              .from('chat_sessions')
              .update(updates)
              .eq('id', existing.id)
              .select()
              .single();
            if (updated) return updated;
          }
        }
        return existing;
      }

      // Create new session
      const newSessionPayload = {
        channel,
        channel_user_id: channelUserId,
        user_name: userName || (channel === 'whatsapp' ? channelUserId : undefined),
        user_phone: phone || (channel === 'whatsapp' ? channelUserId : undefined),
        user_email: email,
        last_message: '',
        last_message_at: new Date().toISOString(),
        unread_count: 0,
        ai_enabled: true,
        status: 'active',
        lead_captured: false,
        metadata: {},
      };

      const { data: created, error: insertErr } = await adminClient
        .from('chat_sessions')
        .insert([newSessionPayload])
        .select()
        .single();

      if (!insertErr && created) {
        return created;
      }
    } catch (e) {
      console.warn('[Supabase Session Error, falling back to memory]:', e);
    }
  }

  // Memory fallback
  ensureSampleData();
  const memKey = `${channel}_${channelUserId}`;
  let session = memSessions.get(memKey);
  if (!session) {
    const id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    session = {
      id,
      channel,
      channel_user_id: channelUserId,
      user_name: userName || (channel === 'whatsapp' ? channelUserId : undefined),
      user_phone: phone || (channel === 'whatsapp' ? channelUserId : undefined),
      user_email: email,
      last_message: '',
      last_message_at: new Date().toISOString(),
      unread_count: 0,
      ai_enabled: true,
      status: 'active',
      lead_captured: false,
      metadata: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    memSessions.set(memKey, session);
  } else {
    if (userName && !session.user_name) session.user_name = userName;
    if (phone && !session.user_phone) session.user_phone = phone;
    if (email && !session.user_email) session.user_email = email;
  }

  return session;
}

/**
 * Saves a new chat message to DB
 */
export async function saveChatMessage({
  sessionId,
  sender,
  channel,
  content,
  messageId,
  rawPayload,
  status = 'delivered',
}: {
  sessionId: string;
  sender: 'user' | 'assistant' | 'agent' | 'admin';
  channel: string;
  content: string;
  messageId?: string;
  rawPayload?: any;
  status?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
}): Promise<ChatMessage> {
  const adminClient = await getAdminSupabase();

  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('chat_messages')
        .insert([
          {
            session_id: sessionId,
            sender,
            channel,
            content,
            message_id: messageId,
            raw_payload: rawPayload || {},
            status,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        // Also update session last_message in case trigger isn't applied
        await adminClient
          .from('chat_sessions')
          .update({
            last_message: content,
            last_message_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', sessionId);

        return data;
      }
    } catch (e) {
      console.warn('[Supabase Message Error, using memory]:', e);
    }
  }

  // Memory fallback
  const newMsg: ChatMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    session_id: sessionId,
    sender,
    channel,
    content,
    message_id: messageId,
    raw_payload: rawPayload,
    status,
    created_at: new Date().toISOString(),
  };

  memMessages.push(newMsg);

  // Update session
  for (const sess of memSessions.values()) {
    if (sess.id === sessionId) {
      sess.last_message = content;
      sess.last_message_at = newMsg.created_at;
      sess.updated_at = newMsg.created_at;
      if (sender === 'user') sess.unread_count += 1;
      break;
    }
  }

  return newMsg;
}

/**
 * Gets conversation history for a session
 */
export async function getChatHistory(sessionId: string, limit = 30): Promise<ChatMessage[]> {
  const adminClient = await getAdminSupabase();

  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (!error && data) return data;
    } catch (e) {
      // Fallback
    }
  }

  ensureSampleData();
  return memMessages
    .filter((m) => m.session_id === sessionId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(-limit);
}

/**
 * Gets all sessions with optional filters
 */
export async function getAllChatSessions(filters?: {
  channel?: string;
  status?: string;
  search?: string;
}): Promise<ChatSession[]> {
  const adminClient = await getAdminSupabase();

  if (adminClient) {
    try {
      let query = adminClient
        .from('chat_sessions')
        .select('*')
        .order('last_message_at', { ascending: false });

      if (filters?.channel && filters.channel !== 'all') {
        query = query.eq('channel', filters.channel);
      }
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      if (filters?.search) {
        query = query.or(
          `user_name.ilike.%${filters.search}%,channel_user_id.ilike.%${filters.search}%,last_message.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      // fallback
    }
  }

  ensureSampleData();
  let list = Array.from(memSessions.values());

  if (filters?.channel && filters.channel !== 'all') {
    list = list.filter((s) => s.channel === filters.channel);
  }
  if (filters?.status && filters.status !== 'all') {
    list = list.filter((s) => s.status === filters.status);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (s) =>
        (s.user_name && s.user_name.toLowerCase().includes(q)) ||
        s.channel_user_id.toLowerCase().includes(q) ||
        (s.last_message && s.last_message.toLowerCase().includes(q))
    );
  }

  return list.sort(
    (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
  );
}

/**
 * Updates a chat session status or AI agent enabled mode
 */
export async function updateSessionStatus(
  sessionId: string,
  status?: 'active' | 'pending_human' | 'closed' | 'resolved',
  aiEnabled?: boolean
): Promise<boolean> {
  const adminClient = await getAdminSupabase();

  if (adminClient) {
    try {
      const updates: any = { updated_at: new Date().toISOString() };
      if (status !== undefined) updates.status = status;
      if (aiEnabled !== undefined) updates.ai_enabled = aiEnabled;

      const { error } = await adminClient
        .from('chat_sessions')
        .update(updates)
        .eq('id', sessionId);

      if (!error) return true;
    } catch (e) {
      // fallback
    }
  }

  for (const sess of memSessions.values()) {
    if (sess.id === sessionId) {
      if (status !== undefined) sess.status = status;
      if (aiEnabled !== undefined) sess.ai_enabled = aiEnabled;
      sess.updated_at = new Date().toISOString();
      return true;
    }
  }

  return false;
}

/**
 * Marks messages as read and resets unread count for session
 */
export async function markSessionAsRead(sessionId: string): Promise<void> {
  const adminClient = await getAdminSupabase();
  if (adminClient) {
    try {
      await adminClient.from('chat_sessions').update({ unread_count: 0 }).eq('id', sessionId);
      await adminClient.from('chat_messages').update({ status: 'read' }).eq('session_id', sessionId).eq('sender', 'user');
      return;
    } catch (e) {
      // fallback
    }
  }

  for (const sess of memSessions.values()) {
    if (sess.id === sessionId) {
      sess.unread_count = 0;
      break;
    }
  }
}

/**
 * Saves extracted lead into chat_leads table and existing CRM tables
 */
export async function saveChatLead(lead: {
  sessionId?: string;
  channel: string;
  leadType: 'candidate' | 'employer' | 'counselling' | 'general';
  name?: string;
  phone?: string;
  email?: string;
  roleInterest?: string;
  experienceYears?: string;
  expectedCtc?: string;
  companyName?: string;
  urgency?: string;
  notes?: string;
  rawExtracted?: any;
}): Promise<ChatLead> {
  const adminClient = await getAdminSupabase();

  const leadRecord: ChatLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    session_id: lead.sessionId,
    channel: lead.channel,
    lead_type: lead.leadType,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    role_interest: lead.roleInterest,
    experience_years: lead.experienceYears,
    expected_ctc: lead.expectedCtc,
    company_name: lead.companyName,
    urgency: lead.urgency,
    notes: lead.notes,
    raw_extracted: lead.rawExtracted || {},
    created_at: new Date().toISOString(),
  };

  if (adminClient) {
    try {
      await adminClient.from('chat_leads').insert([
        {
          session_id: lead.sessionId,
          channel: lead.channel,
          lead_type: lead.leadType,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          role_interest: lead.roleInterest,
          experience_years: lead.experienceYears,
          expected_ctc: lead.expectedCtc,
          company_name: lead.companyName,
          urgency: lead.urgency,
          notes: lead.notes,
          raw_extracted: lead.rawExtracted || {},
        },
      ]);

      if (lead.sessionId) {
        await adminClient
          .from('chat_sessions')
          .update({
            lead_captured: true,
            user_name: lead.name || undefined,
            user_phone: lead.phone || undefined,
            user_email: lead.email || undefined,
          })
          .eq('id', lead.sessionId);
      }

      // Sync into existing candidate_profiles / counselling_leads / employer_leads if details are provided
      if (lead.leadType === 'counselling' && lead.name && lead.phone) {
        await adminClient.from('counselling_leads').insert([
          {
            full_name: lead.name,
            phone: lead.phone,
            email: lead.email || 'pending@chat.com',
            sector: lead.roleInterest || 'Banking & Finance',
            experience: lead.experienceYears || '1-3 years',
            preferred_time: 'Next Available Callback',
            status: 'Pending Callback (From Chatbot)',
          },
        ]);
      } else if (lead.leadType === 'employer' && (lead.companyName || lead.name) && lead.phone) {
        await adminClient.from('employer_leads').insert([
          {
            company_name: lead.companyName || `${lead.name}'s Organization`,
            contact_person: lead.name || 'Hiring Lead',
            email: lead.email || 'hr@chat.com',
            phone: lead.phone,
            industry: 'Banking & Financial Services',
            roles_needed: lead.roleInterest || 'General Sourcing',
            headcount: '1-5',
            urgency: lead.urgency || 'Immediate',
            notes: lead.notes || 'Inquired via WhatsApp/Instagram Chatbot',
            status: 'New',
          },
        ]);
      } else if (lead.leadType === 'candidate' && lead.email && lead.name) {
        await adminClient.from('candidate_profiles').upsert([
          {
            email: lead.email,
            full_name: lead.name,
            phone: lead.phone,
            current_role: lead.roleInterest,
            experience_years: lead.experienceYears,
            expected_ctc: lead.expectedCtc,
            updated_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.warn('[Supabase Chat Lead Insert Error]:', e);
    }
  }

  memLeads.push(leadRecord);
  return leadRecord;
}

export function getMemoryStore() {
  return { memSessions, memMessages, memLeads };
}
