import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('job_applications').insert([
    {
      job_id: "ACS-8042",
      job_code: "ACS-8042",
      full_name: "Test",
      email: "test@example.com",
      phone: "123",
      address: "test",
      national_id: "123",
      resume_url: "",
      status: "Applied",
      cover_note: "",
      created_at: new Date().toISOString()
    }
  ]);
  console.log(error || 'Insert succeeded!');
}
run();
