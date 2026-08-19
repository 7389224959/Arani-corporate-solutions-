import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('job_applications').select('*').limit(1);
  if (data && data.length > 0) {
    console.log("Cols:", Object.keys(data[0]));
  }
}
run();
