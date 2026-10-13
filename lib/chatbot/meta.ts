/**
 * Meta Graph API Client for WhatsApp Cloud API and Instagram Direct Messaging
 */

export interface WhatsAppButton {
  id: string;
  title: string;
}

export interface SendWhatsAppMessageOptions {
  to: string; // Recipient WhatsApp phone number (with country code, no +)
  text: string;
  previewUrl?: boolean;
}

export interface SendWhatsAppButtonsOptions {
  to: string;
  bodyText: string;
  buttons: WhatsAppButton[];
  headerText?: string;
  footerText?: string;
}

export interface SendInstagramMessageOptions {
  recipientId: string; // Instagram Scoped ID (IGSID)
  text: string;
}

export interface SendInstagramQuickRepliesOptions {
  recipientId: string;
  text: string;
  quickReplies: { title: string; payload: string }[];
}

const GRAPH_API_VERSION = 'v21.0';
const GRAPH_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

/**
 * Sends a text message to a user via WhatsApp Business Cloud API
 */
export async function sendWhatsAppMessage({
  to,
  text,
  previewUrl = false,
}: SendWhatsAppMessageOptions): Promise<{ success: boolean; data?: any; error?: string }> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  // Clean phone number (remove +, spaces, dashes)
  const cleanTo = to.replace(/[^0-9]/g, '');

  if (!phoneNumberId || !accessToken || accessToken.startsWith('your-')) {
    console.info(`[WhatsApp DEV-MOCK] Would send to ${cleanTo}: "${text}"`);
    return {
      success: true,
      data: {
        mock: true,
        messages: [{ id: `mock_wam_${Date.now()}` }],
      },
    };
  }

  try {
    const url = `${GRAPH_BASE_URL}/${phoneNumberId}/messages`;
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: cleanTo,
      type: 'text',
      text: {
        preview_url: previewUrl,
        body: text,
      },
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('[WhatsApp API Error]', data);
      return {
        success: false,
        error: data.error?.message || 'Failed to send WhatsApp message',
        data,
      };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('[WhatsApp Network Error]', err);
    return { success: false, error: err.message || 'Network error sending WhatsApp message' };
  }
}

/**
 * Sends interactive buttons to a WhatsApp recipient (up to 3 buttons supported by Meta)
 */
export async function sendWhatsAppButtons({
  to,
  bodyText,
  buttons,
  headerText,
  footerText = 'Aranii Corporate Solutions',
}: SendWhatsAppButtonsOptions): Promise<{ success: boolean; data?: any; error?: string }> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const cleanTo = to.replace(/[^0-9]/g, '');

  if (!phoneNumberId || !accessToken || accessToken.startsWith('your-')) {
    console.info(`[WhatsApp DEV-MOCK Buttons] To ${cleanTo}: "${bodyText}" with buttons:`, buttons);
    return {
      success: true,
      data: { mock: true, messages: [{ id: `mock_wam_btn_${Date.now()}` }] },
    };
  }

  try {
    const url = `${GRAPH_BASE_URL}/${phoneNumberId}/messages`;
    
    // Meta allows maximum 3 quick reply buttons in interactive button type
    const validButtons = buttons.slice(0, 3).map((b) => ({
      type: 'reply',
      reply: {
        id: b.id.slice(0, 256),
        title: b.title.slice(0, 20), // Meta limit is 20 chars for button title
      },
    }));

    const interactivePayload: any = {
      type: 'button',
      body: { text: bodyText },
      action: { buttons: validButtons },
    };

    if (headerText) {
      interactivePayload.header = { type: 'text', text: headerText };
    }
    if (footerText) {
      interactivePayload.footer = { text: footerText };
    }

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: cleanTo,
      type: 'interactive',
      interactive: interactivePayload,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      // If interactive buttons fail (e.g. template constraint), fallback to regular text
      console.warn('[WhatsApp Buttons Failed, falling back to text]:', data);
      return sendWhatsAppMessage({ to: cleanTo, text: `${bodyText}\n\nOptions:\n${buttons.map(b => `• ${b.title}`).join('\n')}` });
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('[WhatsApp Buttons Error]', err);
    return sendWhatsAppMessage({ to: cleanTo, text: bodyText });
  }
}

/**
 * Marks incoming WhatsApp message as read to show blue ticks
 */
export async function markWhatsAppAsRead(messageId: string): Promise<boolean> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken || !messageId || messageId.startsWith('mock_')) {
    return true;
  }

  try {
    const url = `${GRAPH_BASE_URL}/${phoneNumberId}/messages`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
      }),
    });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Sends a direct message via Instagram Messaging API
 */
export async function sendInstagramMessage({
  recipientId,
  text,
}: SendInstagramMessageOptions): Promise<{ success: boolean; data?: any; error?: string }> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const pageId = process.env.INSTAGRAM_PAGE_ID;

  if (!accessToken || accessToken.startsWith('your-')) {
    console.info(`[Instagram DEV-MOCK] Would send to ${recipientId}: "${text}"`);
    return {
      success: true,
      data: {
        mock: true,
        message_id: `mock_ig_${Date.now()}`,
      },
    };
  }

  try {
    const endpoint = pageId ? `${GRAPH_BASE_URL}/${pageId}/messages` : `${GRAPH_BASE_URL}/me/messages`;
    const payload = {
      recipient: { id: recipientId },
      message: { text },
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('[Instagram API Error]', data);
      return {
        success: false,
        error: data.error?.message || 'Failed to send Instagram message',
        data,
      };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('[Instagram Network Error]', err);
    return { success: false, error: err.message || 'Network error sending Instagram message' };
  }
}

/**
 * Sends direct message with quick replies via Instagram Messaging API
 */
export async function sendInstagramQuickReplies({
  recipientId,
  text,
  quickReplies,
}: SendInstagramQuickRepliesOptions): Promise<{ success: boolean; data?: any; error?: string }> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const pageId = process.env.INSTAGRAM_PAGE_ID;

  if (!accessToken || accessToken.startsWith('your-')) {
    console.info(`[Instagram DEV-MOCK Quick Replies] To ${recipientId}: "${text}"`, quickReplies);
    return {
      success: true,
      data: { mock: true, message_id: `mock_ig_qr_${Date.now()}` },
    };
  }

  try {
    const endpoint = pageId ? `${GRAPH_BASE_URL}/${pageId}/messages` : `${GRAPH_BASE_URL}/me/messages`;
    const payload = {
      recipient: { id: recipientId },
      message: {
        text,
        quick_replies: quickReplies.slice(0, 10).map((qr) => ({
          content_type: 'text',
          title: qr.title.slice(0, 20),
          payload: qr.payload,
        })),
      },
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return sendInstagramMessage({ recipientId, text });
    }

    return { success: true, data };
  } catch (err) {
    return sendInstagramMessage({ recipientId, text });
  }
}
