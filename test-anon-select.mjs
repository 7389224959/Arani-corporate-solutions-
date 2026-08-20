import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await client.from('candidate_profiles').select('*').limit(1);
  console.log('error:', error);
  console.log('data:', data);
}
run();
