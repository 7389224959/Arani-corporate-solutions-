# Aranii Corporate Solutions — Meta Ads & Agentic Growth Operating Manual
**Document Version:** 2.6 (Enterprise Client Handover Edition)  
**Handover Date:** October 2026  
**Target Audience:** Client Executive Team, Recruitment Managers, Growth Marketers, and IT Operations  
**Architecture:** Next.js 15 App Router • Meta Graph API v21.0 • Google Gemini 3.8 / 2.5 Flash • Supabase Cloud  

---

## Executive Summary

Welcome to the **Official Meta Ads Operating Manual** for **Aranii Corporate Solutions**. This guide documents the step-by-step procedures for launching high-impact short-form video advertising (Facebook & Instagram Reels) directly from your customized administrative control panel, backed by our proprietary **Agentic Closed-Loop Recruitment Funnel**.

Unlike conventional recruitment portals where ad spend is lost to cumbersome static web forms and prolonged recruiter delays, your platform leverages an autonomous conversational AI agent (Gemini 3.8 Flash) integrated natively with Meta Cloud APIs (WhatsApp Business & Instagram Direct). Clicks from your Meta ads convert directly into pre-qualified, verified applicants within 60 seconds.

---

## 1. Especialities & Superpowers of Your Agentic Website

Before detailing the launch steps, understand the architectural superpowers embedded within your new platform:

```
┌────────────────────────────────────────────────────────────────────────┐
│               ARANII AGENTIC CLOSED-LOOP RECRUITMENT FUNNEL           │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌───────────────────────┐                           ┌───────────────────────┐
│     Meta Ad (Reel)    │                           │    Meta Ad (Reel)     │
│   Instagram Reels Tab │                           │  Facebook Video Feed  │
└──────────┬────────────┘                           └───────────┬───────────┘
           │                                                    │
           └─────────────────────────┬──────────────────────────┘
                                     │ User Clicks "Apply via WhatsApp" / CTA
                                     ▼
               ┌───────────────────────────────────────────┐
               │    Autonomous Gemini 3.8 Flash Agent      │
               │   (Omnichannel WhatsApp + IG Direct)      │
               └─────────────────────┬─────────────────────┘
                                     │ Pre-screens qualifications, location, CTC
                                     │ Parses candidate resume / biodata
                                     ▼
               ┌───────────────────────────────────────────┐
               │         Supabase Cloud Candidate CRM      │
               │   • Automated Match Score (0–100%)        │
               │   • Fast-Track Interview Slot Booking     │
               │   • Candidate Card in Admin Inbox         │
               └─────────────────────┬─────────────────────┘
                                     │
                                     ▼
               ┌───────────────────────────────────────────┐
               │     Admin Live Operator Console           │
               │   (/admin/chat) Real-time Human Takeover  │
               └───────────────────────────────────────────┘
```

### 🌟 Key Proprietary Advantages:
1. **Zero Lead Leakage with 60-Second Conversion:**
   Traditional job forms suffer a 70%+ drop-off rate on mobile devices. Our system routes candidates directly into WhatsApp or direct messaging where Gemini conversational agents guide them through qualifications and resume upload in natural language.
2. **Built-In Gemini 2.5 Flash Copywriting Studio:**
   Recruitment managers never have to hire external ad agencies or write copy manually. Inputting the job designation and salary automatically produces viral captions, compliance-checked body copy, and 15 trending hashtags calibrated for Indian metro job seekers.
3. **Integrated Video Reel Studio (`reel-wizard`):**
   Staff can create branded vertical 9:16 recruitment reels with synthetic voiceover, dynamic captions, and an animated lower-third job ticker without third-party editing tools.
4. **Real-Time Financial Modeling in INR:**
   All ad campaigns operate natively in Indian Rupees (INR ₹) with real-time performance forecasts (impressions, reach, reel plays, clicks, and cost-per-lead) and automatic 18% GST calculation.
5. **Live Operator Handoff (`/admin/chat`):**
   Your recruitment team can monitor incoming chats across WhatsApp and Instagram in real time, view candidate evaluation notes, and seamlessly switch between autonomous AI mode and manual recruiter takeover.

---

## 2. Step-by-Step Meta Ads Launch Walkthrough

### Step 1: Navigating to the Ad Manager
1. Log in to the administrative console at `/admin`.
2. In the left navigation sidebar under the Content & Media group, click **Ai Page Add Manager**.
3. In the top channels status bar, verify the three connection badges:
   - **Facebook Page:** `Aranii Corporate Solutions Official` (Connected)
   - **Instagram Account:** `@aranii_corporate_official` (Connected)
   - **Meta Ad Account:** `act_592019481920` (Pixel Active)

---

### Step 2: Uploading or Selecting the Video Reel Asset
Meta algorithms prioritize 9:16 vertical short-form video over static images.
- **Option A (Direct File Upload):** Drag-and-drop your custom corporate video or click the upload container. The system accepts `.mp4`, `.mov`, and `.webm` up to 150MB.
- **Option B (Sample Reel):** Click **Use Sample Reel** to immediately populate the high-converting banking recruitment sample video (`/sample-hiring-reel.mp4`).
- **Option C (AI Reel Studio):** Generate a custom video from scratch in the **AI Reel Wizard** tab (`reel-wizard`) and import it into the ad manager.

> **Technical Video Specifications:**
> - Aspect Ratio: `9:16` vertical (1080 × 1920 px)
> - Duration: 15 to 45 seconds recommended
> - Audio: Clear dialogue with music bed; crucial hook in the first 3 seconds.

---

### Step 3: Generating High-Converting AI Copy with Gemini
In Card 2 (**Reel Post Details & AI Caption Studio**):
1. **Fill in the Opportunity Parameters:**
   - **Job Designation:** e.g., *Branch Operations & Credit Officer*
   - **Locations:** e.g., *Mumbai, Pune, Delhi NCR*
   - **Salary Package:** e.g., *₹3.5L – ₹6.5L PA + Performance Bonus*
   - **Key Perks:** e.g., *Zero candidate placement fee, immediate joining, fast-track shortlisting*
2. **Select AI Tone:**
   - 🔥 *Urgent & High-Energy* (Walk-in drives & massive hiring sprees)
   - 💼 *Corporate & Executive* (Mid-to-senior banking and compliance analysts)
   - 🎓 *Fresher Friendly* (Entry-level KYC analysts & relationship associates)
3. Click **Generate High-Converting Copy & Hashtags**.
4. The Gemini 2.5 Flash model will automatically populate the full reel caption, 10–15 trending hashtags, the Meta Ad headline (under 40 chars), and primary text. You can make manual tweaks in the editable text areas.

---

### Step 4: Selecting Target Destination Channels
In Card 3 (**Select Connected Destination Pages**):
- Check **Facebook Page** to broadcast to your official Page feed and Facebook Reels tab.
- Check **Instagram Profile** to broadcast to your Instagram business account Reels feed and optionally share to the profile grid.
- Both can be toggled on simultaneously for maximum cross-platform reach.

---

### Step 5: Configuring Meta Ad Budget & Demographics
Ensure the **"Launch Ad for this Reel Post (Meta Ads)"** toggle is switched to **ON**.

1. **Select Budget Strategy:**
   - **Daily Budget (Recommended):** Spend evenly per day (e.g., ₹1,000/day). Meta algorithms optimize delivery for active job seeker hours (10:00 AM – 9:00 PM).
   - **Lifetime Budget:** Cap total expenditure over the campaign duration.
2. **Set Budget Amount in INR:**
   - Choose one of the quick presets (₹500, ₹1,000, ₹2,500, ₹5,000, ₹10,000) or type a custom amount.
3. **Set Campaign Flight Duration:**
   - Select 3, 5, 7, 14, or 30 days.
   - Review the automatic 18% GST and total net payable summary.
4. **Choose Campaign Objective:**
   - `OUTCOME_LEADS` — Instant candidate lead forms (Best for fast high-volume applications).
   - `OUTCOME_MESSAGES` — Direct WhatsApp conversations routed to the Gemini AI Agent (Highest qualification rate).
   - `OUTCOME_TRAFFIC` — Direct traffic to your website job board (`/jobs`).
   - `OUTCOME_AWARENESS` — Maximum video reel plays for employer branding.
5. **Select Target Locations (India):**
   - Select one or more target metro clusters: *Mumbai MMR, Pune, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Chandigarh, or Pan-India*.
6. **Set Age Demographics & Call-to-Action (CTA):**
   - Min Age: 20 | Max Age: 35
   - Select CTA: `APPLY_NOW` (Recommended) or `SEND_WHATSAPP_MESSAGE`.

---

### Step 6: Review in Live Mobile Phone Simulator
Look at the right column to inspect the realistic **9:16 Mobile Mockup**:
- Tap the **Play / Pause** button to preview how your video will look on an iPhone / Android screen.
- Verify the **Sponsored Ad** badge, the live account handle (`aranii_corporate_official`), the text overlay, and the pulsing CTA button.
- Check the **Estimated Meta Performance Forecast** grid:
  - *Full Reel Plays*
  - *Unique Reach*
  - *Estimated Clicks (~2.8% CTR)*
  - *Verified Candidate Leads (~₹8 to ₹18 per lead)*

---

### Step 7: Publishing the Reel & Launching the Ad Campaign
1. Click the gradient launch button:  
   `Post Reel to FB & IG + Launch Ad Campaign (₹Budget)`
2. The system executes the 4-stage synchronization pipeline:
   - Uploads the video file to Meta Graph API servers.
   - Publishes the Reel container to Facebook & Instagram.
   - Creates the Meta Ad Campaign and Ad Set under account `act_592019481920`.
   - Returns verified URLs so you can view the live posts on Facebook and Instagram immediately.

---

### Step 8: Post-Launch Campaign Optimization
Click over to the **Active Ads & Posted Reels** tab:
- **Pause Ad:** Temporarily halt ad spend when recruiter interview quotas are full.
- **Resume Ad:** Reactivate paused campaigns with a single click.
- **Live Metrics Tracking:** Inspect total budget spent, actual impressions, reel plays, cost-per-click (CPC), and verified candidate applicants.

---

## 3. Financial & ROI Benchmarks for India Recruitment

| Campaign Tier | Daily Budget | Duration | Total Net Spend | Est. Reel Plays | Est. Candidate Leads | Approx. Cost/Lead |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Starter Drive** | ₹500 / day | 5 Days | ₹2,500 + GST | ~29,500 | 118 – 140 | ~₹18.00 |
| **Metro Walk-In** | ₹1,000 / day | 7 Days | ₹7,000 + GST | ~82,700 | 330 – 380 | ~₹18.50 |
| **Mega Hiring** | ₹2,500 / day | 7 Days | ₹17,500 + GST | ~206,000 | 820 – 950 | ~₹18.40 |
| **Pan-India Blitz** | ₹5,000 / day | 10 Days | ₹50,000 + GST | ~590,000 | 2,400 – 2,750 | ~₹18.20 |

---

## 4. Production Meta API Credentials & Tokens (IT Handover)

To connect the application to your production Meta Business Manager, supply the following values in your hosting server environment variables:

```bash
# Official Facebook Page ID & Permanent Page Access Token
META_PAGE_ID="your_facebook_page_id"
META_PAGE_ACCESS_TOKEN="EAAB...your_long_lived_system_user_token"

# Connected Instagram Business Profile ID & Publishing Token
INSTAGRAM_PAGE_ID="your_instagram_business_id"
INSTAGRAM_ACCESS_TOKEN="EAAB...your_instagram_token"

# Meta Ad Account configured for Indian Rupee (INR) billing
META_AD_ACCOUNT_ID="act_your_ad_account_id"

# Meta Pixel ID (Client & Conversions API Tracking)
NEXT_PUBLIC_META_PIXEL_ID="your_meta_pixel_id"

# Meta App Secret (For Webhook HMAC Verification)
META_APP_SECRET="your_meta_app_secret"

# WhatsApp Cloud API Credentials
WHATSAPP_PHONE_NUMBER_ID="your_whatsapp_phone_number_id"
WHATSAPP_ACCESS_TOKEN="EAAB...your_whatsapp_cloud_token"
```

> **Security Note:** Never commit raw API secrets into client-side code. All tokens are securely guarded on the server side (`/app/api/admin/meta-ads/route.ts`).

---

## 5. Meta Special Ad Category (Employment Compliance)

Recruitment advertisements in India must comply with Meta's **Special Ad Category: Employment** rules:
1. **Non-Discrimination:** Ads cannot restrict targeting based on gender, religion, marital status, or age brackets under 18.
2. **Zero Candidate Fee Mandate:** In compliance with Indian labor norms and Aranii company policy, all ad copy must explicitly state that no placement fees are charged to candidates.
3. **Truth in Advertising:** CTC ranges, job designations, and qualifications generated by the AI Copy Studio must reflect actual employer partner mandates.

---

## 6. Support & Maintenance Contacts

For operational inquiries, technical token renewals, or custom ad objective extensions, contact your delivery engineering team or open the **Settings & Audit Log** tab in the Admin Console.

*End of Client Operating Manual.*
