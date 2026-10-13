import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookChallenge, verifyWebhookSignature, sanitizeUserInput } from '@/lib/chatbot/security';
import { parseInstagramWebhook } from '@/lib/chatbot/webhook';
import {
  getOrCreateChatSession,
  saveChatMessage,
  getChatHistory,
  updateSessionStatus,
} from '@/lib/chatbot/db';
import { processChatbotMessage } from '@/lib/chatbot/agent';
import {
  sendInstagramMessage,
  sendInstagramQuickReplies,
} from '@/lib/chatbot/meta';

export const dynamic = 'force-dynamic';

/**
 * GET: Meta Webhook Verification Challenge for Instagram
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
 * POST: Meta Webhook Incoming Instagram Direct Messages
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
        console.warn('[Instagram Webhook] Signature verification failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    let parsedBody: any;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const messages = parseInstagramWebhook(parsedBody);

    for (const item of messages) {
      if (item.isStatusUpdate) continue;

      const cleanText = sanitizeUserInput(item.text);
      if (!cleanText) continue;

      // Get or create conversation session
      const session = await getOrCreateChatSession(
        'instagram',
        item.senderId,
        item.userName || `IG User ${item.senderId.slice(-4)}`
      );

      // Save user message to database
      await saveChatMessage({
        sessionId: session.id,
        sender: 'user',
        channel: 'instagram',
        content: cleanText,
        messageId: item.messageId,
        rawPayload: item.rawPayload,
      });

      // Check if AI processing is enabled for this session
      const isAiGlobalEnabled = process.env.CHATBOT_AI_ENABLED !== 'false';
      if (session.ai_enabled && isAiGlobalEnabled) {
        const history = await getChatHistory(session.id, 10);
        const agentResult = await processChatbotMessage({
          channel: 'instagram',
          senderId: item.senderId,
          userMessage: cleanText,
          session,
          history,
        });

        // Handle human agent handoff
        if (agentResult.humanHandoffRequested) {
          await updateSessionStatus(session.id, 'pending_human', false);
        }

        // Send Instagram Direct reply back to user
        if (agentResult.buttons && agentResult.buttons.length > 0) {
          await sendInstagramQuickReplies({
            recipientId: item.senderId,
            text: agentResult.replyText,
            quickReplies: agentResult.buttons.map((b) => ({
              title: b.title,
              payload: b.id,
            })),
          });
        } else {
          await sendInstagramMessage({
            recipientId: item.senderId,
            text: agentResult.replyText,
          });
        }

        // Save assistant reply to database
        await saveChatMessage({
          sessionId: session.id,
          sender: 'assistant',
          channel: 'instagram',
          content: agentResult.replyText,
          status: 'sent',
        });
      }
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error: any) {
    console.error('[Instagram Webhook Handler Error]:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 200 });
  }
}
