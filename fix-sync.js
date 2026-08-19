const fs = require('fs');

function makeAsync(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/const handleSubmit = \(e: React\.FormEvent\) => \{/g, 'const handleSubmit = async (e: React.FormEvent) => {');
  content = content.replace(/const handleSubmitApplication = \(e: React\.FormEvent\) => \{/g, 'const handleSubmitApplication = async (e: React.FormEvent) => {');
  fs.writeFileSync(file, content);
}

makeAsync('components/JobQuickModal.tsx');
makeAsync('app/jobs/[id]/page.tsx');
console.log('Fixed async');
