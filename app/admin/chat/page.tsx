'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  ArrowLeft,
  Phone,
  Mail,
  CheckCheck,
  Check,
  Clock,
  Sparkles,
  UserCheck,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Copy,
  Zap,
  Building2,
  Briefcase,
  Sliders,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface ChatSession {
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
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  session_id: string;
  sender: 'user' | 'assistant' | 'agent' | 'admin';
  channel: string;
  content: string;
  message_id?: string;
  status?: string;
  created_at: string;
}

interface InboxStats {
  totalSessions: number;
  whatsappCount: number;
  instagramCount: number;
  pendingHumanCount: number;
  leadsCount: number;
}

const QUICK_TEMPLATES = [
  {
    title: 'Schedule Interview',
    text: 'Namaste! Our banking talent team would love to schedule a 15-minute introductory screening call. Could you let us know if tomorrow between 2 PM and 5 PM works for you?',
  },
  {
    title: 'Request Resume',
    text: 'Please share your updated CV (PDF format) here on WhatsApp so our senior recruiters can match you with open mandates in Private & PSU Banks.',
  },
  {
    title: 'Counselling Booking',
    text: 'We have reserved a 1-on-1 Career Counselling slot with our BFSI Lead Consultant. We will ring you on your registered number at your preferred time.',
  },
  {
    title: 'Employer Proposal',
    text: 'Thank you for your hiring requirement. Our Corporate Partnership Director will email you our talent SLA, fee structure, and vetted candidate shortlists within 2 business hours.',
  },
];

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stats, setStats] = useState<InboxStats>({
    totalSessions: 0,
    whatsappCount: 0,
    instagramCount: 0,
    pendingHumanCount: 0,
    leadsCount: 0,
  });

  const [channelFilter, setChannelFilter] = useState<'all' | 'whatsapp' | 'instagram'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending_human' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUpdatingAi, setIsUpdatingAi] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Simulator tab state
  const [simulatorInput, setSimulatorInput] = useState('');
  const [simulatorChannel, setSimulatorChannel] = useState<'whatsapp' | 'instagram'>('whatsapp');
  const [isSimulating, setIsSimulating] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch session list
  const fetchSessions = async (keepSelection = true) => {
    try {
      const params = new URLSearchParams();
      if (channelFilter !== 'all') params.set('channel', channelFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);

      const res = await fetch(`/api/chatbot/inbox?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
        if (data.stats) setStats(data.stats);

        if (!selectedSessionId && data.sessions?.length > 0 && !keepSelection) {
          setSelectedSessionId(data.sessions[0].id);
        }
      }
    } catch (e) {
      console.error('Error fetching sessions:', e);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  // Fetch messages for selected session
  const fetchMessages = async (sessionId: string) => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch(`/api/chatbot/inbox?sessionId=${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (e) {
      console.error('Error fetching messages:', e);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchSessions(false);
    const interval = setInterval(() => fetchSessions(true), 12000);
    return () => clearInterval(interval);
  }, [channelFilter, statusFilter]);

  useEffect(() => {
    if (selectedSessionId) {
      fetchMessages(selectedSessionId);
    }
  }, [selectedSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeSession = sessions.find((s) => s.id === selectedSessionId);

  // Send admin reply
  const handleSendReply = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!replyText.trim() || !selectedSessionId || isSending) return;

    setIsSending(true);
    try {
      const res = await fetch('/api/chatbot/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_reply',
          sessionId: selectedSessionId,
          content: replyText.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          setMessages((prev) => [...prev, data.message]);
        }
        setReplyText('');
        fetchSessions(true);
        showToast('Reply dispatched to user!');
      }
    } catch (err) {
      console.error('Failed to send reply:', err);
    } finally {
      setIsSending(false);
    }
  };

  // Toggle AI handling vs Human Takeover
  const handleToggleAi = async (currentVal: boolean) => {
    if (!selectedSessionId || isUpdatingAi) return;
    setIsUpdatingAi(true);
    try {
      const res = await fetch('/api/chatbot/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_ai',
          sessionId: selectedSessionId,
          aiEnabled: !currentVal,
        }),
      });

      if (res.ok) {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === selectedSessionId ? { ...s, ai_enabled: !currentVal, status: !currentVal ? 'active' : 'pending_human' } : s
          )
        );
        showToast(!currentVal ? 'AI Talent Agent resumed' : 'Human Operator takeover active');
      }
    } catch (err) {
      console.error('Failed to toggle AI mode:', err);
    } finally {
      setIsUpdatingAi(false);
    }
  };

  // Change status
  const handleUpdateStatus = async (status: 'active' | 'pending_human' | 'resolved' | 'closed') => {
    if (!selectedSessionId) return;
    try {
      const res = await fetch('/api/chatbot/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_status',
          sessionId: selectedSessionId,
          status,
        }),
      });

      if (res.ok) {
        setSessions((prev) =>
          prev.map((s) => (s.id === selectedSessionId ? { ...s, status } : s))
        );
        showToast(`Conversation marked as ${status}`);
      }
    } catch (e) {
      console.error('Status update failed:', e);
    }
  };

  // Run test simulation message
  const handleSimulateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatorInput.trim() || isSimulating) return;

    setIsSimulating(true);
    try {
      const senderId = simulatorChannel === 'whatsapp' ? '+919876500000' : 'ig_test_candidate';
      const res = await fetch('/api/chatbot/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: simulatorChannel,
          senderId,
          text: simulatorInput.trim(),
          userName: simulatorChannel === 'whatsapp' ? 'Simulated Candidate' : 'IG Banking Seeker',
          dispatchExternal: false,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSimulatorInput('');
        await fetchSessions(false);
        if (data.sessionId) {
          setSelectedSessionId(data.sessionId);
        }
        showToast('Simulated message processed by AI Agent!');
      }
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-teal-600 text-white text-xs font-mono font-bold px-4 py-2.5 rounded shadow-lg flex items-center gap-2 border border-teal-400 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur px-4 lg:px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1.5 text-xs font-mono font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Admin</span>
          </Link>
          <div className="h-5 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <AraniLogo className="w-6 h-6" />
            <span className="font-mono text-sm font-extrabold tracking-wider uppercase text-white">
              Aranii <span className="text-teal-400">Chatbot Inbox</span>
            </span>
            <span className="bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ml-1">
              WhatsApp &amp; Instagram Meta API
            </span>
          </div>
        </div>

        {/* STATS CHIPS */}
        <div className="hidden md:flex items-center gap-3 text-xs font-mono">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1 rounded flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-slate-400">Total:</span>
            <span className="font-bold text-white">{stats.totalSessions}</span>
          </div>
          <div className="bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded flex items-center gap-1.5 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WhatsApp: {stats.whatsappCount}</span>
          </div>
          <div className="bg-fuchsia-950/40 border border-fuchsia-800/40 px-3 py-1 rounded flex items-center gap-1.5 text-fuchsia-300">
            <span>Instagram: {stats.instagramCount}</span>
          </div>
          {stats.pendingHumanCount > 0 && (
            <div className="bg-amber-950/50 border border-amber-800/50 px-3 py-1 rounded flex items-center gap-1.5 text-amber-300 font-bold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{stats.pendingHumanCount} Need Human</span>
            </div>
          )}
          <button
            onClick={() => fetchSessions(true)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition"
            title="Refresh conversations"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* MAIN CHAT WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* COLUMN 1: CONVERSATION LIST */}
        <aside className="w-80 lg:w-96 border-r border-slate-800 bg-slate-950/50 flex flex-col shrink-0">
          {/* SEARCH & FILTERS */}
          <div className="p-3 border-b border-slate-800 space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate name, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchSessions(true)}
                className="w-full bg-slate-900 border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>

            {/* CHANNEL SELECTOR */}
            <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded border border-slate-800 text-[11px] font-mono font-bold">
              <button
                onClick={() => setChannelFilter('all')}
                className={`py-1 rounded text-center transition ${
                  channelFilter === 'all' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setChannelFilter('whatsapp')}
                className={`py-1 rounded text-center transition flex items-center justify-center gap-1 ${
                  channelFilter === 'whatsapp' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-400'
                }`}
              >
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => setChannelFilter('instagram')}
                className={`py-1 rounded text-center transition flex items-center justify-center gap-1 ${
                  channelFilter === 'instagram' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-fuchsia-400'
                }`}
              >
                <span>Instagram</span>
              </button>
            </div>

            {/* STATUS FILTER PILLS */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2 py-0.5 rounded border ${
                  statusFilter === 'all'
                    ? 'bg-slate-800 border-teal-500 text-teal-300'
                    : 'border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                All ({sessions.length})
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-2 py-0.5 rounded border ${
                  statusFilter === 'active'
                    ? 'bg-teal-950/60 border-teal-500 text-teal-300'
                    : 'border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                Active AI
              </button>
              <button
                onClick={() => setStatusFilter('pending_human')}
                className={`px-2 py-0.5 rounded border ${
                  statusFilter === 'pending_human'
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                Human Attention
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={`px-2 py-0.5 rounded border ${
                  statusFilter === 'resolved'
                    ? 'bg-slate-800 border-slate-600 text-slate-300'
                    : 'border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>

          {/* SESSIONS LIST SCROLL */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {isLoadingSessions && sessions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                Loading conversations...
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-700 mx-auto" />
                <p>No conversations found</p>
                <p className="text-[10px] text-slate-600">
                  Use the simulator on the right to test incoming WhatsApp or Instagram messages.
                </p>
              </div>
            ) : (
              sessions.map((sess) => {
                const isSelected = sess.id === selectedSessionId;
                const isWhatsApp = sess.channel === 'whatsapp';
                return (
                  <button
                    key={sess.id}
                    onClick={() => setSelectedSessionId(sess.id)}
                    className={`w-full text-left p-3.5 transition flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-teal-950/40 border-l-4 border-teal-500'
                        : 'hover:bg-slate-900/60 border-l-4 border-transparent'
                    }`}
                  >
                    {/* AVATAR & CHANNEL BADGE */}
                    <div className="relative shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                          isWhatsApp ? 'bg-emerald-700' : 'bg-fuchsia-700'
                        }`}
                      >
                        {(sess.user_name || sess.channel_user_id).charAt(0).toUpperCase()}
                      </div>
                      <span
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white border border-slate-950 ${
                          isWhatsApp ? 'bg-emerald-500' : 'bg-fuchsia-500'
                        }`}
                        title={sess.channel}
                      >
                        {isWhatsApp ? 'W' : 'I'}
                      </span>
                    </div>

                    {/* CONTENT PREVIEW */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-slate-100 truncate">
                          {sess.user_name || sess.channel_user_id}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {new Date(sess.last_message_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 truncate mb-1.5 font-sans">
                        {sess.last_message || 'No messages yet'}
                      </p>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {sess.ai_enabled ? (
                          <span className="bg-teal-950 border border-teal-800/60 text-teal-300 text-[9px] font-mono px-1.5 py-0.2 rounded flex items-center gap-1">
                            <Bot className="w-2.5 h-2.5" /> AI Active
                          </span>
                        ) : (
                          <span className="bg-amber-950 border border-amber-800/60 text-amber-300 text-[9px] font-mono px-1.5 py-0.2 rounded flex items-center gap-1">
                            <User className="w-2.5 h-2.5" /> Operator Takeover
                          </span>
                        )}

                        {sess.lead_captured && (
                          <span className="bg-emerald-950 border border-emerald-800/60 text-emerald-300 text-[9px] font-mono px-1.5 py-0.2 rounded">
                            ★ Lead Captured
                          </span>
                        )}

                        {sess.unread_count > 0 && (
                          <span className="ml-auto bg-teal-500 text-slate-950 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                            {sess.unread_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* COLUMN 2: ACTIVE CONVERSATION PANE */}
        <main className="flex-1 flex flex-col bg-slate-900 min-w-0">
          {activeSession ? (
            <>
              {/* CONVERSATION HEADER */}
              <div className="h-16 border-b border-slate-800 bg-slate-950/60 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                      activeSession.channel === 'whatsapp' ? 'bg-emerald-700' : 'bg-fuchsia-700'
                    }`}
                  >
                    {(activeSession.user_name || activeSession.channel_user_id).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white truncate">
                        {activeSession.user_name || activeSession.channel_user_id}
                      </h3>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          activeSession.channel === 'whatsapp'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-800'
                        }`}
                      >
                        {activeSession.channel}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      ID: {activeSession.channel_user_id}
                      {activeSession.user_phone && ` • ${activeSession.user_phone}`}
                    </p>
                  </div>
                </div>

                {/* CONTROLS: AI TOGGLE & STATUS */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleToggleAi(activeSession.ai_enabled)}
                    disabled={isUpdatingAi}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-2 border transition cursor-pointer ${
                      activeSession.ai_enabled
                        ? 'bg-teal-950/80 border-teal-500 text-teal-300 hover:bg-teal-900/80'
                        : 'bg-amber-950/80 border-amber-500 text-amber-300 hover:bg-amber-900/80'
                    }`}
                  >
                    {activeSession.ai_enabled ? (
                      <>
                        <Bot className="w-3.5 h-3.5 text-teal-400" />
                        <span>AI Handling Active</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>Human Operator Mode</span>
                      </>
                    )}
                  </button>

                  <select
                    value={activeSession.status}
                    onChange={(e) => handleUpdateStatus(e.target.value as any)}
                    className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono px-2.5 py-1.5 rounded focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="active">Status: Active</option>
                    <option value="pending_human">Status: Pending Human</option>
                    <option value="resolved">Status: Resolved</option>
                    <option value="closed">Status: Closed</option>
                  </select>
                </div>
              </div>

              {/* MESSAGE STREAM */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-900/40">
                {isLoadingMessages ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono">
                    Loading conversation messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono space-y-1">
                    <p>No messages yet in this session.</p>
                  </div>
                ) : (
                  messages.map((m) => {
                    const isUser = m.sender === 'user';
                    const isAdmin = m.sender === 'admin';
                    const isAssistant = m.sender === 'assistant' || m.sender === 'agent';

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2.5 text-xs shadow-xs ${
                            isUser
                              ? 'bg-slate-800 text-slate-100 border border-slate-700/80'
                              : isAdmin
                              ? 'bg-indigo-900/90 text-indigo-100 border border-indigo-700'
                              : 'bg-teal-900/90 text-teal-50 border border-teal-700/80'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 text-[10px] font-mono mb-1 pb-1 border-b border-white/10 opacity-80">
                            <span className="flex items-center gap-1 font-bold">
                              {isUser ? (
                                <>
                                  <User className="w-3 h-3" />
                                  <span>Candidate / Contact</span>
                                </>
                              ) : isAdmin ? (
                                <>
                                  <ShieldCheck className="w-3 h-3 text-indigo-300" />
                                  <span>Aranii Admin Operator</span>
                                </>
                              ) : (
                                <>
                                  <Bot className="w-3 h-3 text-teal-300" />
                                  <span>Aranii AI Concierge (Gemini)</span>
                                </>
                              )}
                            </span>
                            <span>
                              {new Date(m.created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>

                          <p className="whitespace-pre-wrap leading-relaxed font-sans">{m.content}</p>
                        </div>

                        <div className="text-[10px] text-slate-500 font-mono mt-0.5 px-1 flex items-center gap-1">
                          {isUser ? (
                            <span>Received</span>
                          ) : (
                            <>
                              <span>Dispatched</span>
                              <CheckCheck className="w-3 h-3 text-teal-400" />
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* QUICK RESPONSE TEMPLATES */}
              <div className="p-2 border-t border-slate-800 bg-slate-950/70 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold shrink-0 pl-1">
                  Templates:
                </span>
                {QUICK_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReplyText(tmpl.text)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-mono shrink-0 transition border border-slate-700/60"
                  >
                    {tmpl.title}
                  </button>
                ))}
              </div>

              {/* REPLY COMPOSER */}
              <form
                onSubmit={handleSendReply}
                className="p-3 border-t border-slate-800 bg-slate-950 flex items-end gap-2 shrink-0"
              >
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded focus-within:border-teal-500 transition">
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                    placeholder={`Reply to ${activeSession.user_name || activeSession.channel_user_id} via ${
                      activeSession.channel === 'whatsapp' ? 'WhatsApp' : 'Instagram'
                    }... (Enter to send, Shift+Enter for newline)`}
                    className="w-full bg-transparent p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending || !replyText.trim()}
                  className="px-4 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded font-mono text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 font-mono">
              <MessageSquare className="w-12 h-12 text-slate-700 mb-3" />
              <h3 className="text-sm font-bold text-slate-300 mb-1">Select a Conversation</h3>
              <p className="text-xs max-w-sm">
                Pick a WhatsApp or Instagram conversation from the left to monitor messages, toggle AI, or dispatch replies.
              </p>
            </div>
          )}
        </main>

        {/* COLUMN 3: LEAD DOSSIER & SIMULATION SANDBOX */}
        <aside className="w-80 lg:w-96 border-l border-slate-800 bg-slate-950/60 p-4 flex flex-col overflow-y-auto space-y-5 shrink-0">
          {/* DOSSIER CARD */}
          {activeSession ? (
            <div className="bg-slate-900 border border-slate-800 rounded p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-xs font-mono font-bold uppercase text-teal-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Lead Intelligence</span>
                </h4>
                {activeSession.lead_captured && (
                  <span className="bg-emerald-950 border border-emerald-700 text-emerald-300 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                    Verified Lead
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Candidate Name</span>
                  <span className="font-bold text-white">
                    {activeSession.user_name || 'Not provided yet'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Phone Contact</span>
                  <span className="font-mono text-slate-200">
                    {activeSession.user_phone || activeSession.channel_user_id}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Email Address</span>
                  <span className="font-mono text-slate-200">
                    {activeSession.user_email || 'Awaiting candidate input'}
                  </span>
                </div>
                {activeSession.metadata && Object.keys(activeSession.metadata).length > 0 && (
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Extracted Metadata</span>
                    <div className="bg-slate-950 p-2 rounded text-[11px] font-mono text-teal-300 space-y-1">
                      {Object.entries(activeSession.metadata).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-slate-500">{k}:</span>
                          <span className="font-bold">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800 flex gap-2">
                <Link
                  href="/admin"
                  className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-center rounded text-[11px] font-mono font-bold text-slate-300 transition"
                >
                  View in Admin CRM
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    const text = `Lead: ${activeSession.user_name || activeSession.channel_user_id} | Phone: ${
                      activeSession.user_phone || activeSession.channel_user_id
                    } | Channel: ${activeSession.channel}`;
                    navigator.clipboard.writeText(text);
                    showToast('Lead info copied to clipboard');
                  }}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition"
                  title="Copy Lead info"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : null}

          {/* SIMULATION / TEST HARNESS */}
          <div className="bg-slate-900 border border-slate-800 rounded p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Test Chatbot Sandbox</span>
              </h4>
              <span className="text-[9px] font-mono text-slate-500">Live Gemini Test</span>
            </div>

            <p className="text-[11px] text-slate-400">
              Simulate an incoming user message as if received via WhatsApp or Instagram to observe AI response &amp; lead capture:
            </p>

            <form onSubmit={handleSimulateMessage} className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setSimulatorChannel('whatsapp')}
                  className={`py-1 rounded border text-center font-bold ${
                    simulatorChannel === 'whatsapp'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'border-slate-800 text-slate-500'
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatorChannel('instagram')}
                  className={`py-1 rounded border text-center font-bold ${
                    simulatorChannel === 'instagram'
                      ? 'bg-fuchsia-950 border-fuchsia-500 text-fuchsia-300'
                      : 'border-slate-800 text-slate-500'
                  }`}
                >
                  Instagram
                </button>
              </div>

              <textarea
                rows={3}
                value={simulatorInput}
                onChange={(e) => setSimulatorInput(e.target.value)}
                placeholder="Example: 'Hi, I have 3 yrs experience as Credit Analyst in Axis Bank. Looking for Branch Manager jobs in Pune. My phone is 9876543210'"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none font-sans"
              />

              <button
                type="submit"
                disabled={isSimulating || !simulatorInput.trim()}
                className="w-full py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-mono font-bold text-xs rounded transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSimulating ? 'Processing AI...' : 'Simulate Incoming Message'}</span>
              </button>
            </form>
          </div>

          {/* SETUP & WEBHOOK GUIDE LINK */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded p-3 text-[11px] font-mono space-y-1.5 text-slate-400">
            <span className="text-teal-400 font-bold block">Meta Webhook Endpoints:</span>
            <div className="space-y-1 text-[10px] break-all bg-slate-950 p-2 rounded">
              <div>
                <span className="text-slate-500">WA:</span> /api/chatbot/whatsapp/webhook
              </div>
              <div>
                <span className="text-slate-500">IG:</span> /api/chatbot/instagram/webhook
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Verify Token: <code className="text-teal-300">aranii_meta_webhook_verify_token_2026</code>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
