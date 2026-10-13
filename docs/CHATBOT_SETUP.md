# Aranii Corporate Solutions - WhatsApp & Instagram Chatbot Integration

Comprehensive setup guide for configuring Meta Cloud API (WhatsApp Business & Instagram Direct) with Google Gemini AI agent and Supabase persistent storage.

---

## 1. Architecture Overview

```
                          ┌───────────────────────┐
                          │   Meta Graph API      │
                          │ (WhatsApp / Instagram)│
                          └───────────┬───────────┘
                                      │ Webhook POST / GET
                                      ▼
                      ┌───────────────────────────────┐
                      │ /api/chatbot/whatsapp/webhook │
                      │ /api/chatbot/instagram/webhook│
                      └───────────────┬───────────────┘
                                      │
            ┌─────────────────────────┴────────────────────────┐
            ▼                                                  ▼
┌───────────────────────┐                          ┌───────────────────────┐
│ lib/chatbot/security  │                          │    lib/chatbot/db     │
│ HMAC-SHA256 Signature │                          │ Supabase Persistence  │
└───────────────────────┘                          │ (Sessions & Messages) │
            │                                      └───────────┬───────────┘
            ▼                                                  │
┌───────────────────────┐                                      ▼
│   lib/chatbot/agent   │                          ┌───────────────────────┐
│ Gemini 3.8 Flash AI   │                          │ /app/admin/chat       │
│ Lead Capture & Intent │                          │ Live Operator Inbox   │
└───────────────────────┘                          └───────────────────────┘
```

- **Meta Cloud API**: WhatsApp Business & Instagram Direct webhooks send incoming events.
- **HMAC-SHA256 Security**: Verifies `x-hub-signature-256` header against `META_APP_SECRET`.
- **AI Talent Agent (`gemini-3.8-flash`)**: Understands banking job inquiries, career counselling bookings, employer talent mandates, and extracts structured leads.
- **Supabase Integration**: Stores sessions, chat messages, and auto-syncs captured leads into `candidate_profiles`, `counselling_leads`, and `employer_leads`.
- **Admin Live Inbox (`/admin/chat`)**: Multi-channel unified console to monitor chats, switch between AI and Human Operator mode, and reply in real-time.

---

## 2. Meta WhatsApp Business Cloud API Setup

1. **Create Meta Developer App**:
   - Go to [Meta for Developers](https://developers.facebook.com/).
   - Click **Create App** → Select **Business** as the app type.
   - Name your app `Aranii Talent Assistant`.

2. **Add WhatsApp Product**:
   - In the App Dashboard, click **Set Up** on **WhatsApp**.
   - Navigate to **WhatsApp** → **API Setup**.
   - Copy your **Phone number ID** into `WHATSAPP_PHONE_NUMBER_ID`.

3. **Generate Permanent Access Token**:
   - Go to **Business Settings** → **Users** → **System Users**.
   - Create a System User with Admin permissions.
   - Generate a token with `whatsapp_business_messaging` and `whatsapp_business_management` permissions.
   - Copy the token into `WHATSAPP_ACCESS_TOKEN`.

4. **Configure WhatsApp Webhook**:
   - In App Dashboard, go to **WhatsApp** → **Configuration**.
   - Click **Edit** under **Webhook**:
     - **Callback URL**: `https://<YOUR_DOMAIN>/api/chatbot/whatsapp/webhook`
     - **Verify Token**: `aranii_meta_webhook_verify_token_2026` (or the value set in `META_VERIFY_TOKEN`).
   - Click **Verify and save**.
   - Under **Webhook fields**, click **Manage** and subscribe to **`messages`**.

---

## 3. Meta Instagram Direct Messaging API Setup

1. **Prerequisites**:
   - Professional or Business Instagram account connected to your Facebook Page.
   - In Instagram Mobile App: **Settings** → **Messages and story replies** → **Message controls** → Turn on **Allow access to messages**.

2. **Add Messenger / Instagram Messaging**:
   - In your Meta Developer App, add **Messenger** or configure **Instagram Graph API**.
   - Connect your Facebook Page associated with the Instagram account.
   - Note the **Page ID** into `INSTAGRAM_PAGE_ID`.
   - Generate a Page Access Token with `instagram_manage_messages` and `pages_messaging`.
   - Copy the token into `INSTAGRAM_ACCESS_TOKEN`.

3. **Configure Instagram Webhook**:
   - In Webhooks, select **Instagram** from the dropdown:
     - **Callback URL**: `https://<YOUR_DOMAIN>/api/chatbot/instagram/webhook`
     - **Verify Token**: `aranii_meta_webhook_verify_token_2026`.
   - Subscribe to **`messages`** and **`messaging_postbacks`**.

---

## 4. Supabase Database Migration

Execute the migration file located at `supabase/migrations/20261008_chatbot.sql` in your Supabase SQL Editor.

It creates:
- `chat_sessions`: Unified session table with channel, channel_user_id, unread counts, and AI toggle.
- `chat_messages`: Complete message history with sender tracking (`user`, `assistant`, `admin`).
- `chat_leads`: Extracted lead intelligence (Name, Phone, Email, Target Role, CTC, Company).
- Trigger `trg_new_chat_message` to update session last message timestamp and unread counters.

*Note: The backend includes an in-memory fallback layer so all webhooks and the admin inbox continue functioning even during database maintenance.*

---

## 5. Environment Variables Configuration

Add the following variables to your `.env` or deployment environment:

```env
# GEMINI AI API (Required for intelligent recruitment agent)
GEMINI_API_KEY="your-gemini-api-key"

# SUPABASE CREDENTIALS
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# META WEBHOOK VERIFICATION & SECURITY
META_VERIFY_TOKEN="aranii_meta_webhook_verify_token_2026"
META_APP_SECRET="your-meta-app-secret-for-sha256-verification"

# WHATSAPP BUSINESS CLOUD API
WHATSAPP_PHONE_NUMBER_ID="your-whatsapp-phone-number-id"
WHATSAPP_ACCESS_TOKEN="your-whatsapp-system-user-access-token"

# INSTAGRAM DIRECT GRAPH API
INSTAGRAM_PAGE_ID="your-instagram-page-id"
INSTAGRAM_ACCESS_TOKEN="your-instagram-access-token"

# CHATBOT CONTROL
CHATBOT_AI_ENABLED="true"
```

---

## 6. Admin Live Inbox Operation (`/admin/chat`)

- Access the inbox directly via `/admin/chat` or via the **Chatbot Live Inbox** button in the main Admin sidebar.
- **Channel Filters**: Switch seamlessly between WhatsApp and Instagram conversations.
- **Human Hand-Off**: Click the **AI Handling Active** button to switch any conversation into **Human Operator Mode**. Incoming messages will pause AI generation, alerting human recruiters to respond.
- **Quick Templates**: One-click reply templates for interview scheduling, CV requests, and employer proposals.
- **Interactive Sandbox**: Use the test simulator panel on the right to test candidate queries in real-time.
