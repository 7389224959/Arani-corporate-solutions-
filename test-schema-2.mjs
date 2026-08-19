import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('job_applications').select('*').limit(1);
  if (data && data.length > 0) {
    console.log(data[0]);
  } else {
    // Let's insert a valid row and see
    const { data: d2, error: e2 } = await supabase.from('job_applications').insert([
    {
      job_code: "ACS-8042",
      full_name: "Test",
      email: "test@example.com",
      phone: "123",
      status: "Applied",
      created_at: new Date().toISOString()
    }
  ]).select();
    console.log(d2, e2);
  }
}
run();
