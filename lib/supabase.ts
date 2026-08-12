import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://')) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
      return supabaseInstance;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return null;
}

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://')
  );
};

// Helper: Insert Counselling Lead
export async function submitCounsellingLead(data: {
  fullName: string;
  phone: string;
  email: string;
  sector: string;
  experience: string;
  preferredTime: string;
}) {
  const client = getSupabase();
  const timestamp = new Date().toISOString();
  
  if (client) {
    const { data: inserted, error } = await client
      .from('counselling_leads')
      .insert([
        {
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          sector: data.sector,
          experience: data.experience,
          preferred_time: data.preferredTime,
          status: 'Pending Callback',
          created_at: timestamp,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase counselling insertion error:', error);
      throw error;
    }
    return inserted;
  } else {
    // LocalStorage Fallback for preview mode
    console.info('Supabase env vars not configured. Saving counselling lead to localStorage fallback.');
    const existingStr = typeof window !== 'undefined' ? localStorage.getItem('arani_counselling_leads') || '[]' : '[]';
    const existing = JSON.parse(existingStr);
    const newLead = {
      id: `CNS-${Date.now().toString().slice(-4)}`,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      sector: data.sector,
      experience: data.experience,
      preferredTime: data.preferredTime,
      bookedAt: new Date().toLocaleString(),
      status: 'Pending Callback'
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('arani_counselling_leads', JSON.stringify([newLead, ...existing]));
    }
    return [newLead];
  }
}

// Helper: Submit Employer Talent Requirement
export async function submitEmployerLead(data: {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  rolesNeeded: string;
  headcount: string;
  urgency: string;
  notes?: string;
}) {
  const client = getSupabase();
  const timestamp = new Date().toISOString();

  if (client) {
    const { data: inserted, error } = await client
      .from('employer_leads')
      .insert([
        {
          company_name: data.companyName,
          contact_person: data.contactPerson,
          email: data.email,
          phone: data.phone,
          industry: data.industry,
          roles_needed: data.rolesNeeded,
          headcount: data.headcount,
          urgency: data.urgency,
          notes: data.notes || '',
          status: 'New',
          created_at: timestamp,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase employer lead error:', error);
      throw error;
    }
    return inserted;
  } else {
    // LocalStorage Fallback
    const existingStr = typeof window !== 'undefined' ? localStorage.getItem('arani_employer_leads') || '[]' : '[]';
    const existing = JSON.parse(existingStr);
    const newLead = {
      id: `EMP-${Date.now().toString().slice(-4)}`,
      ...data,
      created_at: new Date().toLocaleString(),
      status: 'New'
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('arani_employer_leads', JSON.stringify([newLead, ...existing]));
    }
    return [newLead];
  }
}

export async function saveCandidateProfile(profileData: any) {
  const client = getSupabase();
  if (client) {
    const { data: inserted, error } = await client
      .from('candidate_profiles')
      .upsert([
        {
          email: profileData.email,
          full_name: profileData.fullName,
          phone: profileData.phone,
          national_id: profileData.nationalId,
          address: profileData.address,
          district: profileData.district,
          city: profileData.city,
          state: profileData.state,
          zip_code: profileData.zipCode,
          education: profileData.education,
          current_company: profileData.currentCompany,
          current_role: profileData.currentRole,
          experience_years: profileData.experienceYears,
          expected_ctc: profileData.expectedCtc,
          notice_period: profileData.noticePeriod,
          skills: profileData.skills,
          confidential_search: profileData.confidentialSearch,
          updated_at: new Date().toISOString()
        }
      ], { onConflict: 'email' })
      .select();
      
    if (error) {
      console.error('Supabase save candidate profile error:', error);
      throw error;
    }
    return inserted;
  }
}

export async function getCandidateProfiles() {
  const client = getSupabase();
  if (client) {
    const { data, error } = await client
      .from('candidate_profiles')
      .select('*')
      .order('updated_at', { ascending: false });
      
    if (error) {
      console.error('Supabase fetch candidate profiles error:', error);
      return [];
    }
    return data;
  }
  return [];
}

export async function submitJobApplication(applicationData: any) {
  const client = getSupabase();
  if (client) {
    const { data: inserted, error } = await client
      .from('job_applications')
      .insert([
        {
          job_id: applicationData.jobId || null,
          job_code: applicationData.jobCode || '',
          full_name: applicationData.fullName,
          email: applicationData.email,
          phone: applicationData.phone,
          address: applicationData.address || '',
          national_id: applicationData.nationalId || '',
          resume_url: applicationData.resumeUrl || '',
          status: applicationData.status || 'Applied',
          cover_note: applicationData.coverNote || '',
          created_at: new Date().toISOString()
        }
      ])
      .select();
      
    if (error) {
      console.error('Supabase job application error:', error);
      throw error;
    }
    return inserted;
  }
}

export async function getJobApplications() {
  const client = getSupabase();
  if (client) {
    const { data, error } = await client
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Supabase fetch job applications error:', error);
      return [];
    }
    return data;
  }
  return [];
}

// Helper: Upload file to Supabase Storage Bucket
export async function uploadToSupabaseStorage(
  bucketName: 'counselling_resumes' | 'director_photos' | 'media_assets',
  file: File,
  folderPath: string = ''
): Promise<string | null> {
  const client = getSupabase();
  if (!client) {
    console.info('Supabase not configured. Storage upload skipped.');
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

  const { error: uploadError } = await client.storage
    .from(bucketName)
    .upload(filePath, file, { cacheControl: '3600', upsert: true });

  if (uploadError) {
    console.error('Supabase Storage upload error:', uploadError);
    throw uploadError;
  }

  const { data: publicUrlData } = client.storage.from(bucketName).getPublicUrl(filePath);
  return publicUrlData?.publicUrl || null;
}
