const fs = require('fs');
const path = 'app/admin/page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/stage: 'Shortlisted'/g, "stage: 'Screening'");

fs.writeFileSync(path, content);
