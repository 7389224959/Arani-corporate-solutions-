import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

export interface EmployerLeadRow {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  industry?: string;
  roles_needed: string;
  headcount?: string;
  urgency?: string;
  notes?: string | string[];
  status?: string;
  created_at?: string;
}

const DEFAULT_SAMPLE_LEADS = [
  {
    company_name: 'Kotak Financial Services',
    contact_person: 'Vikram Malhotra',
    email: 'vikram.m@kotak.com',
    phone: '+91 98200 11223',
    industry: 'Commercial Banking',
    roles_needed: '15x Branch Operations Officers',
    headcount: '15',
    urgency: 'Within 72 Hours',
    notes: 'Requirements document received; Submitted SLA proposal on Aug 1',
    status: 'Proposal Sent'
  },
  {
    company_name: 'HDFC Securities',
    contact_person: 'Anand Rathi',
    email: 'anand.rathi@hdfcsec.com',
    phone: '+91 99300 44556',
    industry: 'Financial Services & Wealth',
    roles_needed: '5x Wealth Relationship Managers',
    headcount: '5',
    urgency: 'Immediate',
    notes: 'Introductory call completed; Scheduling detailed scoping meeting',
    status: 'Contacted'
  },
  {
    company_name: 'Bajaj Finserv Direct',
    contact_person: 'Kavita Menon',
    email: 'kavita.m@bajaj.com',
    phone: '+91 91111 22233',
    industry: 'NBFC & Fintech',
    roles_needed: '20x KYC & AML Analysts',
    headcount: '20',
    urgency: 'Within 72 Hours',
    notes: 'Lead submitted from Facebook B2B campaign',
    status: 'New Lead'
  }
];

function getClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
}

function isUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

function mapRowToLead(row: any) {
  let notesArray: string[] = [];
  if (Array.isArray(row.notes)) {
    notesArray = row.notes;
  } else if (typeof row.notes === 'string' && row.notes.trim()) {
    notesArray = row.notes.includes(';') ? row.notes.split(';').map((n: string) => n.trim()).filter(Boolean) : [row.notes];
  }

  return {
    id: row.id,
    companyName: row.company_name || 'Unnamed Enterprise',
    contactName: row.contact_person || 'HR Lead',
    email: row.email || '',
    phone: row.phone || '',
    requiredRole: row.roles_needed || row.role_needed || 'Corporate Recruitment',
    headcount: row.headcount || '1-3',
    estimatedValue: row.urgency ? `${row.urgency} SLA` : 'Standard Success Fee',
    stage: row.status || 'New Lead',
    source: row.industry ? `Industry: ${row.industry}` : 'Website Intake',
    notes: notesArray,
    createdAt: row.created_at ? new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
    rawCreatedAt: row.created_at
  };
}

// GET /api/employer-leads
export async function GET() {
  try {
    const client = getClient();
    if (!client) {
      // Fallback in-memory/mock if no Supabase credentials
      return NextResponse.json({
        leads: DEFAULT_SAMPLE_LEADS.map((l, idx) => mapRowToLead({ id: `LEAD-50${idx + 1}`, ...l, created_at: new Date().toISOString() })),
        source: 'fallback_no_client'
      });
    }

    const { data: rows, error } = await client
      .from('employer_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase employer_leads fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If table is empty, auto-seed with default sample leads
    if (!rows || rows.length === 0) {
      try {
        const seedRows = DEFAULT_SAMPLE_LEADS.map((lead) => ({
          id: randomUUID(),
          company_name: lead.company_name,
          contact_person: lead.contact_person,
          email: lead.email,
          phone: lead.phone,
          industry: lead.industry,
          roles_needed: lead.roles_needed,
          headcount: lead.headcount,
          urgency: lead.urgency,
          notes: lead.notes,
          status: lead.status,
          created_at: new Date().toISOString()
        }));

        await client.from('employer_leads').insert(seedRows);
        const { data: seeded } = await client.from('employer_leads').select('*').order('created_at', { ascending: false });
        if (seeded && seeded.length > 0) {
          return NextResponse.json({ leads: seeded.map(mapRowToLead), source: 'supabase_seeded' });
        }
      } catch (seedErr) {
        console.warn('Auto seed employer_leads error:', seedErr);
      }
    }

    return NextResponse.json({ leads: (rows || []).map(mapRowToLead), source: 'supabase' });
  } catch (err: any) {
    console.error('API GET /api/employer-leads error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/employer-leads (Add / Submit Lead)
export async function POST(req: NextRequest) {
  try {
    const client = getClient();
    if (!client) {
      return NextResponse.json({ error: 'Supabase client not configured' }, { status: 500 });
    }

    const body = await req.json();

    const companyName = body.companyName || body.company_name;
    const contactPerson = body.contactName || body.contact_person || body.contactPerson || 'HR Lead';
    const email = body.email;
    const phone = body.phone;
    const rolesNeeded = body.requiredRole || body.roles_needed || body.roleNeeded || body.rolesNeeded || 'Corporate Positions';
    const industry = body.source || body.industry || 'Banking & Financial Services';
    const headcount = body.headcount ? String(body.headcount) : '1-3';
    const urgency = body.urgency || body.estimatedValue || 'Within 72 Hours';
    const status = body.stage || body.status || 'New Lead';
    
    let notesText = '';
    if (Array.isArray(body.notes)) {
      notesText = body.notes.join('; ');
    } else if (typeof body.notes === 'string') {
      notesText = body.notes;
    }

    if (!companyName || !email || !phone) {
      return NextResponse.json({ error: 'Company name, email, and phone number are required' }, { status: 400 });
    }

    const rowId = isUUID(body.id || '') ? body.id : randomUUID();

    const payload = {
      id: rowId,
      company_name: companyName,
      contact_person: contactPerson,
      email: email,
      phone: phone,
      industry: industry,
      roles_needed: rolesNeeded,
      headcount: headcount,
      urgency: urgency,
      notes: notesText,
      status: status,
      created_at: body.createdAt && !isNaN(Date.parse(body.createdAt)) ? new Date(body.createdAt).toISOString() : new Date().toISOString()
    };

    const { data, error } = await client
      .from('employer_leads')
      .insert([payload])
      .select();

    if (error) {
      console.error('Supabase employer_leads insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const saved = data && data[0] ? mapRowToLead(data[0]) : mapRowToLead(payload);
    return NextResponse.json({ success: true, lead: saved });
  } catch (err: any) {
    console.error('API POST /api/employer-leads error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/employer-leads (Update Lead Stage / Notes / Details)
export async function PUT(req: NextRequest) {
  try {
    const client = getClient();
    if (!client) {
      return NextResponse.json({ error: 'Supabase client not configured' }, { status: 500 });
    }

    const body = await req.json();
    const leadId = body.id;

    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID is required for update' }, { status: 400 });
    }

    const updatePayload: any = {};
    if (body.companyName || body.company_name) updatePayload.company_name = body.companyName || body.company_name;
    if (body.contactName || body.contact_person || body.contactPerson) updatePayload.contact_person = body.contactName || body.contact_person || body.contactPerson;
    if (body.email) updatePayload.email = body.email;
    if (body.phone) updatePayload.phone = body.phone;
    if (body.requiredRole || body.roles_needed) updatePayload.roles_needed = body.requiredRole || body.roles_needed;
    if (body.industry || body.source) updatePayload.industry = body.industry || body.source;
    if (body.headcount) updatePayload.headcount = String(body.headcount);
    if (body.urgency || body.estimatedValue) updatePayload.urgency = body.urgency || body.estimatedValue;
    if (body.stage || body.status) updatePayload.status = body.stage || body.status;
    if (body.notes !== undefined) {
      updatePayload.notes = Array.isArray(body.notes) ? body.notes.join('; ') : body.notes;
    }

    let query = client.from('employer_leads').update(updatePayload);
    if (isUUID(leadId)) {
      query = query.eq('id', leadId);
    } else {
      query = query.or(`id.eq.${leadId},email.eq.${body.email || ''}`);
    }

    const { data, error } = await query.select();

    if (error) {
      console.error('Supabase employer_leads PUT error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const updated = data && data[0] ? mapRowToLead(data[0]) : null;
    return NextResponse.json({ success: true, lead: updated });
  } catch (err: any) {
    console.error('API PUT /api/employer-leads error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/employer-leads (Delete Lead)
export async function DELETE(req: NextRequest) {
  try {
    const client = getClient();
    if (!client) {
      return NextResponse.json({ error: 'Supabase client not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    let leadId = searchParams.get('id');

    if (!leadId) {
      try {
        const body = await req.json();
        leadId = body.id;
      } catch {
        // no body
      }
    }

    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID is required for deletion' }, { status: 400 });
    }

    let deleteQuery = client.from('employer_leads').delete();
    if (isUUID(leadId)) {
      deleteQuery = deleteQuery.eq('id', leadId);
    } else {
      deleteQuery = deleteQuery.eq('id', leadId);
    }

    const { error } = await deleteQuery;

    if (error) {
      console.error('Supabase employer_leads DELETE error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedId: leadId });
  } catch (err: any) {
    console.error('API DELETE /api/employer-leads error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
