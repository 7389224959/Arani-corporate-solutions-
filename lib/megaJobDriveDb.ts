import { getAdminSupabase } from '@/lib/supabase-admin';

export interface MegaDriveRegistration {
  id: string;
  registration_token: string;
  roll_number?: string | null;
  full_name: string;
  email: string;
  phone: string;
  whatsapp_number?: string;
  city: string;
  state?: string;
  highest_qualification: string;
  passout_year?: string;
  total_experience: string;
  current_company?: string;
  current_ctc?: string;
  expected_ctc?: string;
  target_role: string;
  preferred_location?: string;
  resume_url?: string;
  fee_amount: number;
  payment_status: 'pending_payment' | 'pending_verification' | 'verified' | 'rejected';
  payment_utr?: string | null;
  payment_screenshot_url?: string | null;
  payment_verified_at?: string | null;
  verified_by?: string | null;
  rejection_reason?: string | null;
  interview_slot?: string | null;
  interview_venue?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  raw_metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Global in-memory store fallback when Supabase is unconfigured or tables pending migration
const memRegistrations: Map<string, MegaDriveRegistration> =
  (globalThis as any).__megaDriveRegistrations ||
  ((globalThis as any).__megaDriveRegistrations = new Map<string, MegaDriveRegistration>());

// Seed sample registration for preview demonstration
function seedSample() {
  if (memRegistrations.size === 0) {
    const sampleToken = 'MJD-2026-BK89-4102';
    memRegistrations.set(sampleToken, {
      id: 'sample-mjd-1',
      registration_token: sampleToken,
      roll_number: 'ARANI-MJD-26-0042',
      full_name: 'Amitabh Sen',
      email: 'amitabh.sen@example.com',
      phone: '+91 98201 23456',
      whatsapp_number: '+91 98201 23456',
      city: 'Mumbai',
      state: 'Maharashtra',
      highest_qualification: 'MBA in Finance / Post Graduate',
      passout_year: '2023',
      total_experience: '2 Years',
      current_company: 'Private Sector NBFC',
      current_ctc: '₹5,50,000 / annum',
      expected_ctc: '₹8,50,000 / annum',
      target_role: 'Senior Credit Analyst / Relationship Manager',
      preferred_location: 'Mumbai / Pune',
      fee_amount: 499,
      payment_status: 'verified',
      payment_utr: '428819034821',
      payment_screenshot_url: '/mega-job-drive-upi-qr.png',
      payment_verified_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      verified_by: 'Senior HR Registrar',
      interview_slot: 'Saturday, 14 Nov 2026 • 10:30 AM (Slot A)',
      interview_venue: 'Aranii Corporate Hub, BKC Complex, Mumbai',
      utm_source: 'meta_ads',
      utm_campaign: 'mega_banking_drive',
      created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    });

    const pendingToken = 'MJD-2026-RL12-9901';
    memRegistrations.set(pendingToken, {
      id: 'sample-mjd-2',
      registration_token: pendingToken,
      roll_number: null,
      full_name: 'Pooja Verma',
      email: 'pooja.verma@example.com',
      phone: '+91 91672 88990',
      whatsapp_number: '+91 91672 88990',
      city: 'Delhi NCR',
      state: 'Delhi',
      highest_qualification: 'B.Com Graduate',
      passout_year: '2024',
      total_experience: 'Fresher',
      current_company: 'None',
      current_ctc: 'Fresher',
      expected_ctc: '₹4,20,000 / annum',
      target_role: 'Branch Operations Executive',
      preferred_location: 'Delhi NCR / Gurgaon',
      fee_amount: 499,
      payment_status: 'pending_verification',
      payment_utr: '429109482711',
      payment_screenshot_url: '/mega-job-drive-upi-qr.png',
      utm_source: 'instagram',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    });
  }
}

seedSample();

export async function createMegaDriveRegistration(data: Partial<MegaDriveRegistration>): Promise<MegaDriveRegistration> {
  const token = data.registration_token || `MJD-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
  const now = new Date().toISOString();

  const record: MegaDriveRegistration = {
    id: `mjd_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    registration_token: token,
    roll_number: null,
    full_name: data.full_name || '',
    email: data.email || '',
    phone: data.phone || '',
    whatsapp_number: data.whatsapp_number || data.phone || '',
    city: data.city || '',
    state: data.state || '',
    highest_qualification: data.highest_qualification || '',
    passout_year: data.passout_year || '',
    total_experience: data.total_experience || '',
    current_company: data.current_company || '',
    current_ctc: data.current_ctc || '',
    expected_ctc: data.expected_ctc || '',
    target_role: data.target_role || '',
    preferred_location: data.preferred_location || '',
    resume_url: data.resume_url || '',
    fee_amount: data.fee_amount || 499,
    payment_status: 'pending_verification',
    payment_utr: data.payment_utr || null,
    payment_screenshot_url: data.payment_screenshot_url || null,
    payment_verified_at: null,
    verified_by: null,
    rejection_reason: null,
    interview_slot: null,
    interview_venue: 'Aranii Corporate Hub & Regional Bank Centers',
    utm_source: data.utm_source || 'direct',
    utm_medium: data.utm_medium || '',
    utm_campaign: data.utm_campaign || '',
    utm_content: data.utm_content || '',
    utm_term: data.utm_term || '',
    raw_metadata: data.raw_metadata || {},
    created_at: now,
    updated_at: now,
  };

  const adminClient = await getAdminSupabase();
  if (adminClient) {
    try {
      const { data: inserted, error } = await adminClient
        .from('mega_job_drive_registrations')
        .insert([record])
        .select()
        .single();
      if (!error && inserted) {
        memRegistrations.set(token, inserted);
        return inserted;
      }
    } catch (e) {
      console.warn('Supabase insertion failed, falling back to memory store:', e);
    }
  }

  memRegistrations.set(token, record);
  return record;
}

export async function getMegaDriveRegistration(token: string): Promise<MegaDriveRegistration | null> {
  const adminClient = await getAdminSupabase();
  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('mega_job_drive_registrations')
        .select('*')
        .eq('registration_token', token)
        .maybeSingle();
      if (!error && data) return data;
    } catch (e) {
      // fallback
    }
  }

  seedSample();
  return memRegistrations.get(token) || null;
}

export async function updateMegaDrivePayment(
  token: string,
  utr: string,
  screenshotUrl?: string
): Promise<MegaDriveRegistration | null> {
  const now = new Date().toISOString();
  const adminClient = await getAdminSupabase();

  if (adminClient) {
    try {
      const updates: any = {
        payment_utr: utr,
        payment_status: 'pending_verification',
        updated_at: now,
      };
      if (screenshotUrl) updates.payment_screenshot_url = screenshotUrl;

      const { data, error } = await adminClient
        .from('mega_job_drive_registrations')
        .update(updates)
        .eq('registration_token', token)
        .select()
        .single();

      if (!error && data) return data;
    } catch (e) {
      // fallback
    }
  }

  seedSample();
  const reg = memRegistrations.get(token);
  if (reg) {
    reg.payment_utr = utr;
    reg.payment_status = 'pending_verification';
    if (screenshotUrl) reg.payment_screenshot_url = screenshotUrl;
    reg.updated_at = now;
    return reg;
  }
  return null;
}

export async function listAllMegaDriveRegistrations(): Promise<MegaDriveRegistration[]> {
  const adminClient = await getAdminSupabase();
  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('mega_job_drive_registrations')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      // fallback
    }
  }

  seedSample();
  return Array.from(memRegistrations.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function setMegaDriveDecision(
  token: string,
  decision: 'verify' | 'reject',
  options?: {
    rejectionReason?: string;
    interviewSlot?: string;
    verifiedBy?: string;
  }
): Promise<MegaDriveRegistration | null> {
  const now = new Date().toISOString();
  const adminClient = await getAdminSupabase();

  let rollNumber: string | null = null;
  if (decision === 'verify') {
    rollNumber = `ARANI-MJD-26-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  const updates: any = {
    updated_at: now,
  };

  if (decision === 'verify') {
    updates.payment_status = 'verified';
    updates.roll_number = rollNumber;
    updates.payment_verified_at = now;
    updates.verified_by = options?.verifiedBy || 'Admissions Desk';
    updates.interview_slot = options?.interviewSlot || 'Saturday, 14 Nov 2026 • 10:00 AM (Slot 1)';
  } else {
    updates.payment_status = 'rejected';
    updates.rejection_reason = options?.rejectionReason || 'UTR / Payment proof invalid or mismatched.';
  }

  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('mega_job_drive_registrations')
        .update(updates)
        .eq('registration_token', token)
        .select()
        .single();
      if (!error && data) return data;
    } catch (e) {
      // fallback
    }
  }

  seedSample();
  const reg = memRegistrations.get(token);
  if (reg) {
    Object.assign(reg, updates);
    return reg;
  }
  return null;
}
