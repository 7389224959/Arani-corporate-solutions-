import { NextRequest, NextResponse } from 'next/server';
import { sanitizeUserInput } from '@/lib/chatbot/security';
import {
  getOrCreateChatSession,
  saveChatMessage,
  getChatHistory,
  updateSessionStatus,
} from '@/lib/chatbot/db';
import { processChatbotMessage } from '@/lib/chatbot/agent';
import {
  sendWhatsAppMessage,
  sendWhatsAppButtons,
  sendInstagramMessage,
} from '@/lib/chatbot/meta';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      channel = 'whatsapp',
      senderId,
      text,
      userName,
      userPhone,
      userEmail,
      dispatchExternal = false,
    } = body;

    if (!senderId || !text) {
      return NextResponse.json(
        { error: 'Missing required parameters: senderId, text' },
        { status: 400 }
      );
    }

    const cleanText = sanitizeUserInput(text);
    if (!cleanText) {
      return NextResponse.json({ error: 'Empty message text' }, { status: 400 });
    }

    // 1. Get or create session
    const session = await getOrCreateChatSession(
      channel,
      senderId,
      userName,
      userPhone || (channel === 'whatsapp' ? senderId : undefined),
      userEmail
    );

    // 2. Save incoming user message
    const userMsg = await saveChatMessage({
      sessionId: session.id,
      sender: 'user',
      channel,
      content: cleanText,
      status: 'delivered',
    });

    // 3. Process with AI Agent
    const history = await getChatHistory(session.id, 10);
    const agentResult = await processChatbotMessage({
      channel,
      senderId,
      userMessage: cleanText,
      session,
      history,
    });

    // 4. Handle human handoff if requested
    if (agentResult.humanHandoffRequested) {
      await updateSessionStatus(session.id, 'pending_human', false);
    }

    // 5. Dispatch to Meta if explicitly requested
    if (dispatchExternal) {
      if (channel === 'whatsapp') {
        if (agentResult.buttons && agentResult.buttons.length > 0) {
          await sendWhatsAppButtons({
            to: senderId,
            bodyText: agentResult.replyText,
            buttons: agentResult.buttons,
          });
        } else {
          await sendWhatsAppMessage({ to: senderId, text: agentResult.replyText });
        }
      } else if (channel === 'instagram') {
        await sendInstagramMessage({
          recipientId: senderId,
          text: agentResult.replyText,
        });
      }
    }

    // 6. Save assistant message
    const botMsg = await saveChatMessage({
      sessionId: session.id,
      sender: 'assistant',
      channel,
      content: agentResult.replyText,
      status: 'delivered',
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      userMessage: userMsg,
      assistantMessage: botMsg,
      replyText: agentResult.replyText,
      buttons: agentResult.buttons,
      extractedLead: agentResult.extractedLead,
      humanHandoffRequested: agentResult.humanHandoffRequested,
    });
  } catch (error: any) {
    console.error('[Chatbot Process Error]:', error);
    return NextResponse.json(
      { error: 'Internal processing error', message: error.message },
      { status: 500 }
    );
  }
}
