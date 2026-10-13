import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookChallenge, verifyWebhookSignature, sanitizeUserInput } from '@/lib/chatbot/security';
import { parseWhatsAppWebhook } from '@/lib/chatbot/webhook';
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
  markWhatsAppAsRead,
} from '@/lib/chatbot/meta';

export const dynamic = 'force-dynamic';

/**
 * GET: Meta Webhook Verification Challenge
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const expectedToken = process.env.META_VERIFY_TOKEN || 'aranii_meta_webhook_verify_token_2026';

  const verification = verifyWebhookChallenge(mode, token, challenge, expectedToken);

  if (verification.isValid && verification.challenge) {
    return new Response(verification.challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

/**
 * POST: Meta Webhook Incoming WhatsApp Messages & Statuses
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signatureHeader = req.headers.get('x-hub-signature-256');
    const appSecret = process.env.META_APP_SECRET;

    // Verify signature if app secret is configured
    if (appSecret && appSecret !== 'your-meta-app-secret-for-sha256-verification') {
      const isValid = verifyWebhookSignature(rawBody, signatureHeader, appSecret);
      if (!isValid) {
        console.warn('[WhatsApp Webhook] Signature verification failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    let parsedBody: any;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const messages = parseWhatsAppWebhook(parsedBody);

    for (const item of messages) {
      if (item.isStatusUpdate) {
        // Handled status receipt
        continue;
      }

      const cleanText = sanitizeUserInput(item.text);
      if (!cleanText) continue;

      // Get or create conversation session
      const session = await getOrCreateChatSession(
        'whatsapp',
        item.senderId,
        item.userName,
        item.senderId
      );

      // Save user message to database
      await saveChatMessage({
        sessionId: session.id,
        sender: 'user',
        channel: 'whatsapp',
        content: cleanText,
        messageId: item.messageId,
        rawPayload: item.rawPayload,
      });

      // Mark message as read on WhatsApp
      if (item.messageId) {
        markWhatsAppAsRead(item.messageId).catch(() => {});
      }

      // Check if AI processing is enabled for this session
      const isAiGlobalEnabled = process.env.CHATBOT_AI_ENABLED !== 'false';
      if (session.ai_enabled && isAiGlobalEnabled) {
        const history = await getChatHistory(session.id, 10);
        const agentResult = await processChatbotMessage({
          channel: 'whatsapp',
          senderId: item.senderId,
          userMessage: cleanText,
          session,
          history,
        });

        // Handle human agent handoff
        if (agentResult.humanHandoffRequested) {
          await updateSessionStatus(session.id, 'pending_human', false);
        }

        // Send WhatsApp reply back to user
        if (agentResult.buttons && agentResult.buttons.length > 0) {
          await sendWhatsAppButtons({
            to: item.senderId,
            bodyText: agentResult.replyText,
            buttons: agentResult.buttons,
          });
        } else {
          await sendWhatsAppMessage({
            to: item.senderId,
            text: agentResult.replyText,
          });
        }

        // Save assistant reply to database
        await saveChatMessage({
          sessionId: session.id,
          sender: 'assistant',
          channel: 'whatsapp',
          content: agentResult.replyText,
          status: 'sent',
        });
      }
    }

    // Always return HTTP 200 to acknowledge Meta webhook
    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error: any) {
    console.error('[WhatsApp Webhook Handler Error]:', error);
    // Still return 200 to avoid webhook back-off from Meta
    return NextResponse.json({ status: 'error', message: error.message }, { status: 200 });
  }
}
