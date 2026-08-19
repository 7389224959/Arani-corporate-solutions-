const fs = require('fs');
const path = 'app/candidate/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/sessionStorage\.setItem\([^;]+\);/g, '');

fs.writeFileSync(path, content);
