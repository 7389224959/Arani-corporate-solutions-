# All India Mega Banking Job Drive 2026 - Setup & Operations Guide

Comprehensive guide for the **All India Mega Banking Job Drive 2026** campaign on **Aranii Corporate Solutions**, covering Meta Pixel tracking, UPI payments, admissions verification, Admit Card generation, and database migrations.

---

## 1. Funnel Architecture & User Journey

```
                              ┌────────────────────────────────────────┐
                              │ Meta Ads / WhatsApp / Organic Search   │
                              │ (UTM Parameters: source, campaign, ad) │
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │   /mega-job-drive Landing Page         │
                              │   • 1,500+ Banking Vacancies           │
                              │   • Participating Banks: HDFC, ICICI   │
                              │   • Eligibility & CTC Breakdown        │
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │ Step 1: Candidate Registration         │
                              │ • Name, Phone, Email, City             │
                              │ • Qualification, Experience, Role      │
                              │ • Fires: 'Lead' Event                  │
                              └───────────────────┬────────────────────┘
                                                  │ Generates Unique Token
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │ Step 2: Nominal Verification Fee (₹499)│
                              │ • Dynamic UPI QR Code (aranii@icici)   │
                              │ • Direct Mobile UPI Deep Link          │
                              │ • Candidate submits 12-digit UTR       │
                              │ • Fires: 'InitiateCheckout' & 'Purchase│
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │ /mega-job-drive/success?token=...      │
                              │ • Official Printable Admit Card        │
                              │ • Assigned Interview Slot & Venue      │
                              │ • Document Checklist & Instructions    │
                              │ • Fires: 'CompleteRegistration'        │
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │ /mega-job-drive/admin                  │
                              │ • Review UTRs & Payment Screenshots    │
                              │ • Approve & Issue Official Roll Number │
                              │ • Export Candidate Rosters to CSV      │
                              └────────────────────────────────────────┘
```

---

## 2. Supabase SQL Database Migration

Execute the migration file located at `supabase/migrations/20261013_mega_job_drive.sql` in your **Supabase Project &rarr; SQL Editor**:

```sql
-- Creates public.mega_job_drive_registrations table
-- with token, roll_number, applicant details, payment UTR,
-- verification audit fields, and performance indexes.
```

*Note: The platform features an automated in-memory fallback layer, ensuring candidate registrations and the admin console work smoothly even before the database is connected.*

---

## 3. Environment Variables Configuration

Add the following variables to your environment or `.env` file:

```env
# META PIXEL TRACKING
NEXT_PUBLIC_META_PIXEL_ID="your-meta-pixel-id"

# MEGA JOB DRIVE PAYMENT CONFIGURATION
NEXT_PUBLIC_MEGA_DRIVE_UPI_ID="aranii@icici"
NEXT_PUBLIC_MEGA_DRIVE_UPI_NAME="Aranii Corporate Solutions"
NEXT_PUBLIC_MEGA_DRIVE_FEE="499"

# MEGA JOB DRIVE ADMIN CONSOLE KEY
MEGA_DRIVE_ADMIN_SECRET="aranii_admin_secret_2026"
```

---

## 4. Meta Pixel & Conversion API Tracking

The integration automatically tracks standard Meta (Facebook/Instagram) advertising events:

| Event Name | Trigger Point | Payload / Parameters |
| :--- | :--- | :--- |
| `PageView` | Every route transition | `path`, UTM parameters |
| `Lead` | Step 1 Candidate Profile submit | `content_name`, `target_role`, `candidate_city`, `candidate_experience` |
| `InitiateCheckout` | Step 2 UPI Payment Screen view | `content_name`, `value: 499`, `currency: 'INR'`, `target_role` |
| `Purchase` | Step 2 UTR & Proof submit | `value: 499`, `currency: 'INR'`, `registration_token`, `payment_utr` |
| `CompleteRegistration`| Admit Card Download / Print | `registration_token` |

UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) are stored in session storage on landing and attached to all candidate records.

---

## 5. Admin Verification Console (`/mega-job-drive/admin`)

- **Access URL**: `/mega-job-drive/admin`
- **Default Authentication Key**: `aranii_admin_secret_2026` (or `admin123`)
- **Key Capabilities**:
  1. **Audit UTR Numbers**: View candidate-provided 12-digit transaction references against your bank account statement.
  2. **Inspect Payment Proof**: Zoom into uploaded UPI payment screenshots.
  3. **Approve & Issue Roll Number**: Generates an official `ARANI-MJD-26-XXXX` roll number and schedules the candidate's interview slot.
  4. **Export CSV**: Download the verified candidate roster with contact numbers, roles, and interview slots for your on-ground drive desk.

---

## 6. Official Legal & Regulatory Compliance Pages

- **Terms & Conditions**: `/mega-job-drive/terms`
- **Candidate Privacy Policy**: `/mega-job-drive/privacy`
- **Cancellation & 100% Refund Policy**: `/mega-job-drive/refund`
