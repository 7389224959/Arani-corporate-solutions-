import { getSupabase } from './supabase';

export async function getSiteSettings() {
  const client = getSupabase();
  if (client) {
    const { data, error } = await client.from('site_settings').select('*').eq('id', 1).single();
    if (!error && data) return data;
  }
  return null;
}

export async function saveSiteSettings(settings: any) {
  const client = getSupabase();
  if (client) {
    const { error } = await client.from('site_settings').upsert([{ id: 1, ...settings, updated_at: new Date().toISOString() }]);
    if (error) throw error;
  }
}

export async function getJobsList() {
  const client = getSupabase();
  if (client) {
    const { data, error } = await client.from('jobs').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  return null;
}

export async function saveJob(job: any) {
  const client = getSupabase();
  if (client) {
    const { error } = await client.from('jobs').upsert([{ ...job }]);
    if (error) throw error;
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
