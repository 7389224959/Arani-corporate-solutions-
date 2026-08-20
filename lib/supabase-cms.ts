import { getSupabase } from './supabase';
import { getSiteSettingsServer, saveSiteSettingsServer } from './supabase-admin';
import { Job } from './sampleData';

export async function getSiteSettings() {
  return await getSiteSettingsServer();
}

export async function saveSiteSettings(settings: any) {
  await saveSiteSettingsServer(settings);
}

export async function getJobsList(): Promise<Job[] | null> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/jobs', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.jobs && Array.isArray(json.jobs)) {
          return json.jobs;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch /api/jobs, falling back to direct client:', e);
    }
  }

  const client = getSupabase();
  if (client) {
    const { data, error } = await client.from('jobs').select('*').order('posted_at', { ascending: false });
    if (!error && data) {
      return data.map((row: any) => ({
        id: row.job_code || row.id,
        title: row.title || 'Untitled Role',
        category: row.category || 'Banking',
        location: row.location || 'Pan India',
        salary: row.salary_display || 'Competitive Salary',
        type: row.type || 'Full-Time',
        experience: row.experience || '1–3 Years',
        postedDate: row.posted_at ? new Date(row.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
        isUrgent: row.status === 'Urgent',
        isFeatured: row.status === 'Featured',
        isConfidential: Boolean(row.is_confidential),
        companyName: row.is_confidential ? 'Confidential Financial Client' : (row.company_name || 'Tier-1 Partner Bank / Corporate Client'),
        description: row.description || '',
        requirements: Array.isArray(row.requirements) ? row.requirements : (row.requirements ? [row.requirements] : []),
        benefits: Array.isArray(row.benefits) ? row.benefits : ['Competitive CTC & bonus', 'Comprehensive medical insurance', 'Fast-track career progression']
      }));
    }
  }
  return null;
}

export async function saveJob(job: Partial<Job> & { id?: string; job_code?: string; title: string }) {
  if (typeof window !== 'undefined') {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to save job to Supabase database');
    }
    const json = await res.json();
    return json.job;
  }

  const client = getSupabase();
  if (client) {
    const payload = {
      job_code: job.id || job.job_code,
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
      updated_at: new Date().toISOString()
    };
    const { data, error } = await client.from('jobs').upsert([payload], { onConflict: 'job_code' }).select();
    if (error) throw error;
    return data?.[0];
  }
}

export async function deleteJob(jobId: string) {
  if (typeof window !== 'undefined') {
    const res = await fetch(`/api/jobs?id=${encodeURIComponent(jobId)}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to delete job from Supabase database');
    }
    return await res.json();
  }

  const client = getSupabase();
  if (client) {
    const { error } = await client.from('jobs').delete().eq('job_code', jobId);
    if (error) throw error;
    return { success: true };
  }
}

export async function getUsersList() {
  const client = getSupabase();
  if (client) {
    const { data, error } = await client.from('users').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  return null;
}

export async function saveUser(user: any) {
  const client = getSupabase();
  if (client) {
    const { error } = await client.from('users').upsert([{ ...user }]);
    if (error) throw error;
  }
}

export async function getEmployerLeads() {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/employer-leads', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.leads && Array.isArray(json.leads)) {
          return json.leads;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch /api/employer-leads, falling back to direct client:', e);
    }
  }

  const client = getSupabase();
  if (client) {
    const { data, error } = await client.from('employer_leads').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  return null;
}

export async function saveEmployerLead(lead: any) {
  if (typeof window !== 'undefined') {
    const res = await fetch('/api/employer-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to save employer lead to Supabase database');
    }
    const json = await res.json();
    return json.lead;
  }

  const client = getSupabase();
  if (client) {
    const payload = {
      company_name: lead.companyName || lead.company_name,
      contact_person: lead.contactName || lead.contact_person,
      email: lead.email,
      phone: lead.phone,
      industry: lead.source || lead.industry || 'Banking & Financial Services',
      roles_needed: lead.requiredRole || lead.roles_needed || 'Corporate Positions',
      headcount: lead.headcount ? String(lead.headcount) : '1-3',
      urgency: lead.urgency || lead.estimatedValue || 'Within 72 Hours',
      notes: Array.isArray(lead.notes) ? lead.notes.join('; ') : lead.notes,
      status: lead.stage || lead.status || 'New Lead'
    };
    const { data, error } = await client.from('employer_leads').insert([payload]).select();
    if (error) throw error;
    return data?.[0];
  }
}

export async function updateEmployerLead(lead: any) {
  if (typeof window !== 'undefined') {
    const res = await fetch('/api/employer-leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to update employer lead in Supabase database');
    }
    const json = await res.json();
    return json.lead;
  }

  const client = getSupabase();
  if (client) {
    const { data, error } = await client
      .from('employer_leads')
      .update({
        company_name: lead.companyName,
        contact_person: lead.contactName,
        email: lead.email,
        phone: lead.phone,
        status: lead.stage,
        notes: Array.isArray(lead.notes) ? lead.notes.join('; ') : lead.notes
      })
      .eq('id', lead.id)
      .select();
    if (error) throw error;
    return data?.[0];
  }
}

export async function deleteEmployerLead(leadId: string) {
  if (typeof window !== 'undefined') {
    const res = await fetch(`/api/employer-leads?id=${encodeURIComponent(leadId)}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to delete employer lead from Supabase database');
    }
    return await res.json();
  }

  const client = getSupabase();
  if (client) {
    const { error } = await client.from('employer_leads').delete().eq('id', leadId);
    if (error) throw error;
    return { success: true };
  }
}

export async function getCounsellingLeads() {
  const client = getSupabase();
  if (client) {
    const { data, error } = await client.from('counselling_leads').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  return null;
}
