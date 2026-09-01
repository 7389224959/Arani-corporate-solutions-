import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { fullName, email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email ID is required' }, { status: 400 });
    }

    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: 'Full Name is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Return a successful fallback response if Supabase is not configured
      return NextResponse.json({
        success: true,
        isNew: false,
        profile: {
          fullName: cleanName,
          email: cleanEmail,
          phone: '',
          city: 'Mumbai',
          education: 'Graduate / Post-Graduate',
          currentCompany: 'Banking / Corporate Firm',
          currentRole: 'Credit Analyst / Banking Officer',
          experienceYears: '1-3 Years',
          expectedCtc: '₹6,00,000 - ₹12,00,000 / yr',
          noticePeriod: '30 Days',
          skills: 'Banking Operations, Credit Analysis, Customer Relationship, KYC & Compliance, Financial Evaluation',
          preferredLocation: 'Mumbai / Hybrid'
        },
        applications: []
      });
    }

    const client = createClient(supabaseUrl, supabaseKey);

    // 1. Check for existing candidate profile by email
    const { data: existingProfiles, error: profileFetchError } = await client
      .from('candidate_profiles')
      .select('*')
      .ilike('email', cleanEmail)
      .limit(1);

    if (profileFetchError) {
      console.warn('Error querying candidate profile:', profileFetchError);
    }

    // 2. Fetch any submitted job applications for this candidate
    const { data: jobApps, error: jobAppsError } = await client
      .from('job_applications')
      .select('*')
      .ilike('email', cleanEmail)
      .order('created_at', { ascending: false });

    if (jobAppsError) {
      console.warn('Error querying job applications for candidate:', jobAppsError);
    }

    const appliedJobIds = (jobApps || [])
      .map((app) => app.job_id || app.job_code)
      .filter(Boolean);

    if (existingProfiles && existingProfiles.length > 0) {
      const dbProfile = existingProfiles[0];
      
      // Update full_name if changed or updated_at
      await client
        .from('candidate_profiles')
        .update({
          full_name: cleanName,
          updated_at: new Date().toISOString()
        })
        .eq('id', dbProfile.id);

      return NextResponse.json({
        success: true,
        isNew: false,
        profile: {
          fullName: cleanName || dbProfile.full_name,
          email: cleanEmail,
          phone: dbProfile.phone || '',
          nationalId: dbProfile.national_id || '',
          address: dbProfile.address || '',
          district: dbProfile.district || '',
          city: dbProfile.city || 'Mumbai',
          state: dbProfile.state || '',
          zipCode: dbProfile.zip_code || '',
          education: dbProfile.education || 'Graduate / Post-Graduate',
          currentCompany: dbProfile.current_company || 'Banking / Corporate Firm',
          currentRole: dbProfile.current_role || 'Credit Analyst / Banking Officer',
          experienceYears: dbProfile.experience_years || '1-3 Years',
          expectedCtc: dbProfile.expected_ctc || '₹6,00,000 - ₹12,00,000 / yr',
          noticePeriod: dbProfile.notice_period || '30 Days',
          skills: dbProfile.skills || 'Banking Operations, Credit Analysis, Customer Relationship, KYC & Compliance, Financial Evaluation',
          confidentialSearch: dbProfile.confidential_search ?? true,
          resumeUrl: dbProfile.resume_url || null
        },
        applications: appliedJobIds
      });
    }

    // 3. Candidate profile not found in table - Create a new starter profile for them
    const newProfileData = {
      email: cleanEmail,
      full_name: cleanName,
      phone: '',
      city: 'Mumbai',
      education: 'Graduate / Post-Graduate',
      current_company: 'Banking / Corporate Firm',
      current_role: 'Credit Analyst / Banking Officer',
      experience_years: '1-3 Years',
      expected_ctc: '₹6,00,000 - ₹12,00,000 / yr',
      notice_period: '30 Days',
      skills: 'Banking Operations, Credit Analysis, Customer Relationship, KYC & Compliance, Financial Evaluation',
      confidential_search: true,
      updated_at: new Date().toISOString()
    };

    const { error: insertError } = await client
      .from('candidate_profiles')
      .upsert([newProfileData], { onConflict: 'email' });

    if (insertError) {
      console.warn('Could not insert new candidate profile:', insertError);
    }

    return NextResponse.json({
      success: true,
      isNew: true,
      profile: {
        fullName: cleanName,
        email: cleanEmail,
        phone: '',
        city: 'Mumbai',
        education: 'Graduate / Post-Graduate',
        currentCompany: 'Banking / Corporate Firm',
        currentRole: 'Credit Analyst / Banking Officer',
        experienceYears: '1-3 Years',
        expectedCtc: '₹6,00,000 - ₹12,00,000 / yr',
        noticePeriod: '30 Days',
        skills: 'Banking Operations, Credit Analysis, Customer Relationship, KYC & Compliance, Financial Evaluation',
        confidentialSearch: true
      },
      applications: appliedJobIds
    });
  } catch (error: any) {
    console.error('Candidate login API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process candidate login' },
      { status: 500 }
    );
  }
}
