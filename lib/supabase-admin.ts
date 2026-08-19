"use server";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function getAdminSupabase() {
  if (supabaseUrl && supabaseServiceKey) {
    return createClient(supabaseUrl, supabaseServiceKey);
  }
  return null;
}

export async function saveSiteSettingsServer(settings: any) {
  const client = await getAdminSupabase();
  if (client) {
    const payload: any = {
      id: 1,
      updated_at: new Date().toISOString()
    };
    
    if (settings.director_data !== undefined) payload.director_data = settings.director_data;
    if (settings.hero_slides !== undefined) payload.hero_slides = settings.hero_slides;
    if (settings.partner_logos !== undefined) payload.partner_logos = settings.partner_logos;
    if (settings.testimonials !== undefined) payload.testimonials = settings.testimonials;
    if (settings.faqs !== undefined) payload.faqs = settings.faqs;
    if (settings.articles !== undefined) payload.articles = settings.articles;
    if (settings.live_stats !== undefined) payload.live_stats = settings.live_stats;
    if (settings.clientReelTemplates !== undefined) payload.clientReelTemplates = settings.clientReelTemplates;

    const { error } = await client.from('site_settings').upsert([payload]);
    if (error) throw error;
  } else {
    throw new Error('Server-side Supabase client not initialized (missing service role key)');
  }
}
