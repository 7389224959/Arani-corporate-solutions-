import { NextRequest, NextResponse } from 'next/server';
import {
  getAllChatSessions,
  getChatHistory,
  saveChatMessage,
  updateSessionStatus,
  markSessionAsRead,
  getOrCreateChatSession,
} from '@/lib/chatbot/db';
import {
  sendWhatsAppMessage,
  sendInstagramMessage,
} from '@/lib/chatbot/meta';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const channel = searchParams.get('channel') || 'all';
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';

    // If specific session requested, return session & full message history
    if (sessionId) {
      const messages = await getChatHistory(sessionId, 100);
      await markSessionAsRead(sessionId);

      // Find session info
      const allSessions = await getAllChatSessions();
      const session = allSessions.find((s) => s.id === sessionId);

      return NextResponse.json({
        success: true,
        session: session || null,
        messages,
      });
    }

    // List all sessions with filters
    const sessions = await getAllChatSessions({
      channel: channel === 'all' ? undefined : channel,
      status: status === 'all' ? undefined : status,
      search: search || undefined,
    });

    const all = await getAllChatSessions();
    const stats = {
      totalSessions: all.length,
      whatsappCount: all.filter((s) => s.channel === 'whatsapp').length,
      instagramCount: all.filter((s) => s.channel === 'instagram').length,
      pendingHumanCount: all.filter((s) => s.status === 'pending_human' || !s.ai_enabled).length,
      leadsCount: all.filter((s) => s.lead_captured).length,
    };

    return NextResponse.json({
      success: true,
      sessions,
      stats,
    });
  } catch (err: any) {
    console.error('[Inbox GET Error]:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve inbox data', message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, sessionId, content, aiEnabled, status } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    const allSessions = await getAllChatSessions();
    const session = allSessions.find((s) => s.id === sessionId);

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // ACTION 1: Send manual operator / admin reply
    if (action === 'send_reply') {
      if (!content || !content.trim()) {
        return NextResponse.json({ error: 'Content is required' }, { status: 400 });
      }

      // Save admin message to DB
      const adminMsg = await saveChatMessage({
        sessionId,
        sender: 'admin',
        channel: session.channel,
        content: content.trim(),
        status: 'sent',
      });

      // Dispatch real message via Meta API to user
      let dispatchResult: any = { mock: true };
      if (session.channel === 'whatsapp') {
        dispatchResult = await sendWhatsAppMessage({
          to: session.channel_user_id,
          text: content.trim(),
        });
      } else if (session.channel === 'instagram') {
        dispatchResult = await sendInstagramMessage({
          recipientId: session.channel_user_id,
          text: content.trim(),
        });
      }

      // After admin replies, optionally pause AI for 24h or keep manual
      return NextResponse.json({
        success: true,
        message: adminMsg,
        dispatchResult,
      });
    }

    // ACTION 2: Toggle AI Mode / Human Hand-off
    if (action === 'toggle_ai') {
      if (typeof aiEnabled !== 'boolean') {
        return NextResponse.json({ error: 'aiEnabled boolean required' }, { status: 400 });
      }

      const newStatus = aiEnabled ? 'active' : 'pending_human';
      await updateSessionStatus(sessionId, newStatus, aiEnabled);

      return NextResponse.json({
        success: true,
        sessionId,
        aiEnabled,
        status: newStatus,
      });
    }

    // ACTION 3: Update session status
    if (action === 'update_status') {
      if (!status) {
        return NextResponse.json({ error: 'status is required' }, { status: 400 });
      }

      await updateSessionStatus(sessionId, status as any);

      return NextResponse.json({
        success: true,
        sessionId,
        status,
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    console.error('[Inbox POST Error]:', err);
    return NextResponse.json(
      { error: 'Failed to process inbox action', message: err.message },
      { status: 500 }
    );
  }
}
