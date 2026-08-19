const fs = require('fs');
const path = 'lib/supabase-cms.ts';
let content = fs.readFileSync(path, 'utf8');

const replacement = `import { saveSiteSettingsServer } from './supabase-admin';

export async function saveSiteSettings(settings: any) {
  await saveSiteSettingsServer(settings);
}`;

content = content.replace(/export async function saveSiteSettings\(settings: any\) \{[\s\S]*?\}\s*(?=\nexport async function)/, replacement + '\n\n');
fs.writeFileSync(path, content);
