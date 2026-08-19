const fs = require('fs');

// Update lib/supabase-admin.ts
let adminContent = fs.readFileSync('lib/supabase-admin.ts', 'utf8');
adminContent += `\nexport async function getSiteSettingsServer() {
  const client = await getAdminSupabase();
  if (client) {
    const { data, error } = await client.from('site_settings').select('*').eq('id', 1).single();
    if (!error && data) return data;
  }
  return null;
}\n`;
fs.writeFileSync('lib/supabase-admin.ts', adminContent);

// Update lib/supabase-cms.ts to proxy getSiteSettings to the server action
let cmsContent = fs.readFileSync('lib/supabase-cms.ts', 'utf8');
cmsContent = cmsContent.replace(
  /export async function getSiteSettings\(\) \{[\s\S]*?return null;\n\}/,
  `import { getSiteSettingsServer } from './supabase-admin';\n\nexport async function getSiteSettings() {\n  return await getSiteSettingsServer();\n}`
);
fs.writeFileSync('lib/supabase-cms.ts', cmsContent);

console.log('Fixed reads');
