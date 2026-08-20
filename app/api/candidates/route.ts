import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
    }

    const client = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await client
      .from('candidate_profiles')
      .select('*')
      .order('updated_at', { ascending: false });
      
    if (error) {
      console.error('profile error:', error);
      return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API candidates fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
}
