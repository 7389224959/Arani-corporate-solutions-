import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { SAMPLE_JOBS, Job } from '@/lib/sampleData';

export const dynamic = 'force-dynamic';

function getClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
}

function isUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

function mapDbRowToJob(row: any): Job {
  return {
    id: row.job_code || row.id,
    title: row.title || 'Untitled Role',
    category: (row.category as any) || 'Banking',
    location: row.location || 'Pan India',
    salary: row.salary_display || (row.salary_min && row.salary_max ? `₹${row.salary_min}L – ₹${row.salary_max}L / yr` : 'Competitive CTC'),
    type: row.type || 'Full-Time',
    experience: row.experience || '1–3 Years',
    postedDate: row.posted_at ? new Date(row.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
    isUrgent: row.status === 'Urgent',
    isFeatured: row.status === 'Featured',
    isConfidential: Boolean(row.is_confidential),
    companyName: row.is_confidential ? 'Confidential Financial Client' : (row.company_name || 'Tier-1 Partner Bank / Corporate Client'),
    description: row.description || '',
    requirements: Array.isArray(row.requirements) ? row.requirements : (typeof row.requirements === 'string' ? [row.requirements] : ['Relevant banking/corporate domain experience required']),
    benefits: Array.isArray(row.benefits) ? row.benefits : ['Competitive CTC & bonus', 'Comprehensive medical insurance', 'Fast-track career progression']
  };
}

// GET all jobs from Supabase. If table is empty, auto-seed with SAMPLE_JOBS.
export async function GET() {
  try {
    const client = getClient();
    if (!client) {
      return NextResponse.json({ jobs: SAMPLE_JOBS, source: 'fallback_no_db' });
    }

    const { data: rows, error } = await client
      .from('jobs')
      .select('*')
      .order('posted_at', { ascending: false });

    if (error) {
      console.error('Supabase jobs fetch error:', error);
      return NextResponse.json({ jobs: SAMPLE_JOBS, source: 'fallback_error', error: error.message });
    }

    if (!rows || rows.length === 0) {
      // Auto-seed initial SAMPLE_JOBS into Supabase so database is initialized
      try {
        const seedRows = SAMPLE_JOBS.map((job) => ({
          id: randomUUID(),
          job_code: job.id,
          title: job.title,
          category: job.category,
          location: job.location,
          salary_display: job.salary,
          type: job.type,
          experience: job.experience,
          description: job.description,
          requirements: job.requirements,
          status: job.isUrgent ? 'Urgent' : job.isFeatured ? 'Featured' : 'Open',
          is_confidential: Boolean(job.isConfidential),
          posted_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));

        await client.from('jobs').upsert(seedRows, { onConflict: 'job_code' });
        const { data: seededRows } = await client.from('jobs').select('*').order('posted_at', { ascending: false });
        if (seededRows && seededRows.length > 0) {
          return NextResponse.json({ jobs: seededRows.map(mapDbRowToJob), source: 'supabase_seeded' });
        }
      } catch (seedErr) {
        console.warn('Auto-seed warning:', seedErr);
      }
      return NextResponse.json({ jobs: SAMPLE_JOBS, source: 'fallback_empty' });
    }

    return NextResponse.json({ jobs: rows.map(mapDbRowToJob), source: 'supabase' });
  } catch (err: any) {
    console.error('API GET /api/jobs error:', err);
    return NextResponse.json({ jobs: SAMPLE_JOBS, source: 'fallback_catch', error: err.message });
  }
}

// POST create a new job in Supabase
export async function POST(req: NextRequest) {
  try {
    const client = getClient();
    if (!client) {
      return NextResponse.json({ error: 'Supabase client not configured' }, { status: 500 });
    }

    const body = await req.json();
    const jobCode = body.id || body.job_code || `ACS-${Math.floor(8000 + Math.random() * 1000)}`;
    const rowId = isUUID(body.db_id || '') ? body.db_id : randomUUID();

    const status = body.isUrgent ? 'Urgent' : body.isFeatured ? 'Featured' : (body.status || 'Open');

    const payload = {
      id: rowId,
      job_code: jobCode,
      title: body.title || 'New Job Posting',
      category: body.category || 'Banking',
      location: body.location || 'Mumbai / Hybrid',
      salary_display: body.salary || body.salary_display || 'Competitive Salary',
      type: body.type || 'Full-Time',
      experience: body.experience || '1–3 Years',
      description: body.description || '',
      requirements: Array.isArray(body.requirements) ? body.requirements : (body.requirements ? [body.requirements] : []),
      status: status,
      is_confidential: Boolean(body.isConfidential ?? body.is_confidential),
      posted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await client
      .from('jobs')
      .upsert([payload], { onConflict: 'job_code' })
      .select();

    if (error) {
      console.error('Supabase job POST error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const savedJob = data && data[0] ? mapDbRowToJob(data[0]) : mapDbRowToJob(payload);
    return NextResponse.json({ success: true, job: savedJob });
  } catch (err: any) {
    console.error('API POST /api/jobs error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update an existing job in Supabase
export async function PUT(req: NextRequest) {
  try {
    const client = getClient();
    if (!client) {
      return NextResponse.json({ error: 'Supabase client not configured' }, { status: 500 });
    }

    const body = await req.json();
    const jobCode = body.id || body.job_code;
    if (!jobCode) {
      return NextResponse.json({ error: 'Job ID/code is required for update' }, { status: 400 });
    }

    const status = body.isUrgent ? 'Urgent' : body.isFeatured ? 'Featured' : (body.status || 'Open');

    const updatePayload: any = {
      title: body.title,
      category: body.category,
      location: body.location,
      salary_display: body.salary || body.salary_display,
      type: body.type,
      experience: body.experience,
      description: body.description,
      requirements: Array.isArray(body.requirements) ? body.requirements : (body.requirements ? [body.requirements] : []),
      status: status,
      is_confidential: Boolean(body.isConfidential ?? body.is_confidential),
      updated_at: new Date().toISOString()
    };

    // Remove undefined values
    Object.keys(updatePayload).forEach(k => updatePayload[k] === undefined && delete updatePayload[k]);

    // Try matching by job_code first, then by id if it's a UUID
    let res = await client
      .from('jobs')
      .update(updatePayload)
      .eq('job_code', jobCode)
      .select();

    if (res.error || !res.data || res.data.length === 0) {
      if (isUUID(jobCode)) {
        res = await client
          .from('jobs')
          .update(updatePayload)
          .eq('id', jobCode)
          .select();
      }
    }

    // If still not found, upsert as new record with this job_code
    if (!res.data || res.data.length === 0) {
      const rowId = isUUID(body.db_id || '') ? body.db_id : randomUUID();
      const insertPayload = {
        id: rowId,
        job_code: jobCode,
        posted_at: new Date().toISOString(),
        ...updatePayload
      };
      res = await client.from('jobs').upsert([insertPayload], { onConflict: 'job_code' }).select();
    }

    if (res.error) {
      console.error('Supabase job PUT error:', res.error);
      return NextResponse.json({ error: res.error.message }, { status: 500 });
    }

    const updatedJob = res.data && res.data[0] ? mapDbRowToJob(res.data[0]) : null;
    return NextResponse.json({ success: true, job: updatedJob });
  } catch (err: any) {
    console.error('API PUT /api/jobs error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE a job from Supabase
export async function DELETE(req: NextRequest) {
  try {
    const client = getClient();
    if (!client) {
      return NextResponse.json({ error: 'Supabase client not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    let jobId = searchParams.get('id');

    if (!jobId) {
      try {
        const body = await req.json();
        jobId = body.id || body.job_code;
      } catch {
        // no body
      }
    }

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required for deletion' }, { status: 400 });
    }

    // Attempt delete by job_code first
    const { error: codeErr } = await client.from('jobs').delete().eq('job_code', jobId);
    
    // Also attempt delete by id if UUID
    if (isUUID(jobId)) {
      await client.from('jobs').delete().eq('id', jobId);
    }

    if (codeErr) {
      console.error('Supabase job DELETE error:', codeErr);
      return NextResponse.json({ error: codeErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedId: jobId });
  } catch (err: any) {
    console.error('API DELETE /api/jobs error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
