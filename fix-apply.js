const fs = require('fs');

const path = 'app/jobs/[id]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/\/\/ Save to localStorage for candidate & admin inbox \(fallback & demo\)[\s\S]*?console\.warn\('Failed to save application locally:', e\);\n    \}/g, '');

fs.writeFileSync(path, content);
