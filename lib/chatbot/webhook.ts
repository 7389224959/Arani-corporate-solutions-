/**
 * Webhook parser and normalization utility for Meta (WhatsApp & Instagram) webhooks.
 */

export interface NormalizedIncomingMessage {
  channel: 'whatsapp' | 'instagram';
  senderId: string; // WhatsApp phone number or Instagram scoped ID
  userName?: string;
  text: string;
  messageId: string;
  timestamp: number;
  rawPayload: any;
  isStatusUpdate?: boolean;
  statusDetails?: {
    messageId: string;
    status: 'sent' | 'delivered' | 'read' | 'failed';
    recipientId?: string;
  };
}

/**
 * Extracts normalized messages from a WhatsApp webhook payload
 */
export function parseWhatsAppWebhook(body: any): NormalizedIncomingMessage[] {
  const results: NormalizedIncomingMessage[] = [];

  if (!body || body.object !== 'whatsapp_business_account' || !Array.isArray(body.entry)) {
    return results;
  }

  for (const entry of body.entry) {
    if (!Array.isArray(entry.changes)) continue;

    for (const change of entry.changes) {
      const value = change.value;
      if (!value) continue;

      // 1. Handle Status Updates (delivered, read, sent)
      if (Array.isArray(value.statuses)) {
        for (const st of value.statuses) {
          results.push({
            channel: 'whatsapp',
            senderId: st.recipient_id || '',
            text: '',
            messageId: st.id,
            timestamp: parseInt(st.timestamp, 10) * 1000 || Date.now(),
            rawPayload: st,
            isStatusUpdate: true,
            statusDetails: {
              messageId: st.id,
              status: st.status as any,
              recipientId: st.recipient_id,
            },
          });
        }
      }

      // 2. Handle Incoming Messages
      if (Array.isArray(value.messages)) {
        // Find contact name if available
        const contacts = value.contacts || [];
        const contactMap = new Map<string, string>();
        for (const c of contacts) {
          if (c.wa_id && c.profile?.name) {
            contactMap.set(c.wa_id, c.profile.name);
          }
        }

        for (const msg of value.messages) {
          let text = '';
          const msgType = msg.type;

          if (msgType === 'text' && msg.text?.body) {
            text = msg.text.body;
          } else if (msgType === 'interactive') {
            if (msg.interactive?.type === 'button_reply') {
              text = msg.interactive.button_reply?.title || msg.interactive.button_reply?.id || '';
            } else if (msg.interactive?.type === 'list_reply') {
              text = msg.interactive.list_reply?.title || msg.interactive.list_reply?.id || '';
            }
          } else if (msgType === 'button' && msg.button?.text) {
            text = msg.button.text;
          } else if (msgType === 'reaction') {
            continue; // Ignore raw emoji reactions
          } else if (msgType === 'image' || msgType === 'document') {
            text = msg.caption || `[Sent ${msgType}]`;
          } else {
            text = `[${msgType} message]`;
          }

          if (text) {
            results.push({
              channel: 'whatsapp',
              senderId: msg.from,
              userName: contactMap.get(msg.from) || undefined,
              text: text.trim(),
              messageId: msg.id,
              timestamp: parseInt(msg.timestamp, 10) * 1000 || Date.now(),
              rawPayload: msg,
              isStatusUpdate: false,
            });
          }
        }
      }
    }
  }

  return results;
}

/**
 * Extracts normalized messages from an Instagram webhook payload
 */
export function parseInstagramWebhook(body: any): NormalizedIncomingMessage[] {
  const results: NormalizedIncomingMessage[] = [];

  if (!body || body.object !== 'instagram' || !Array.isArray(body.entry)) {
    return results;
  }

  for (const entry of body.entry) {
    if (!Array.isArray(entry.messaging)) continue;

    for (const event of entry.messaging) {
      const senderId = event.sender?.id;
      if (!senderId) continue;

      // Handle delivery / read receipts
      if (event.delivery || event.read) {
        results.push({
          channel: 'instagram',
          senderId,
          text: '',
          messageId: event.delivery?.mids?.[0] || event.read?.mid || '',
          timestamp: event.timestamp || Date.now(),
          rawPayload: event,
          isStatusUpdate: true,
          statusDetails: {
            messageId: event.delivery?.mids?.[0] || event.read?.mid || '',
            status: event.read ? 'read' : 'delivered',
          },
        });
        continue;
      }

      // Handle text messages and quick replies
      if (event.message) {
        if (event.message.is_echo) {
          continue; // Ignore echoes of our own messages
        }

        let text = '';
        if (event.message.quick_reply?.payload) {
          text = event.message.quick_reply.payload;
        } else if (event.message.text) {
          text = event.message.text;
        } else if (Array.isArray(event.message.attachments)) {
          text = `[Attachment received: ${event.message.attachments[0]?.type || 'media'}]`;
        }

        if (text) {
          results.push({
            channel: 'instagram',
            senderId,
            text: text.trim(),
            messageId: event.message.mid || `ig_${Date.now()}`,
            timestamp: event.timestamp || Date.now(),
            rawPayload: event,
            isStatusUpdate: false,
          });
        }
      } else if (event.postback?.payload) {
        results.push({
          channel: 'instagram',
          senderId,
          text: event.postback.payload.trim(),
          messageId: event.postback.mid || `ig_pb_${Date.now()}`,
          timestamp: event.timestamp || Date.now(),
          rawPayload: event,
          isStatusUpdate: false,
        });
      }
    }
  }

  return results;
}
