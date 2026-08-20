import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
    }

    const client = createClient(supabaseUrl, supabaseKey);
    
    const { error: profileError } = await client.from('candidate_profiles').upsert([{
      email: data.email,
      full_name: data.fullName,
      phone: data.phone,
      national_id: data.nationalId || null,
      address: data.address || null,
      district: data.district || null,
      city: data.city || null,
      state: data.state || null,
      zip_code: data.zipCode || null,
      education: data.education || null,
      current_company: data.currentCompany || null,
      current_role: data.currentRole || null,
      experience_years: data.experienceYears || null,
      expected_ctc: data.expectedCtc || null,
      notice_period: data.noticePeriod || null,
      skills: data.skills || null,
      confidential_search: data.confidentialSearch || false,
      updated_at: new Date().toISOString()
    }], { onConflict: 'email' });
    
    if (profileError) {
      console.error('profile error:', profileError);
    }
    
    // Also log this in job_applications to store the resume_url
    if (data.resumeUrl) {
      const { error: jobAppError } = await client.from('job_applications').insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        resume_url: data.resumeUrl,
        job_code: 'REG-PROFILE',
        status: 'Lead',
        created_at: new Date().toISOString()
      }]);
      if (jobAppError) {
         console.error('job app error:', jobAppError);
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API candidate register error:', error);
    return NextResponse.json({ error: 'Failed to save candidate' }, { status: 500 });
  }
}
