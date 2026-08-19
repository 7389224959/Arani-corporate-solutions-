const fs = require('fs');

let cmsContent = fs.readFileSync('lib/supabase-cms.ts', 'utf8');

cmsContent = cmsContent.replace(
  /import \{ getSupabase \} from '\.\/supabase';\nimport \{ getSiteSettingsServer \} from '\.\/supabase-admin';\n\nexport async function getSiteSettings\(\) \{\n  return await getSiteSettingsServer\(\);\n\}\nimport \{ saveSiteSettingsServer \} from '\.\/supabase-admin';/,
  `import { getSupabase } from './supabase';\nimport { getSiteSettingsServer, saveSiteSettingsServer } from './supabase-admin';\n\nexport async function getSiteSettings() {\n  return await getSiteSettingsServer();\n}`
);
fs.writeFileSync('lib/supabase-cms.ts', cmsContent);
