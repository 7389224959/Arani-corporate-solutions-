const fs = require('fs');

const path = 'components/JobQuickModal.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/await submitJobApplication\(newApp\);/, `await submitJobApplication({
          jobId: job.id,
          jobCode: job.id,
          fullName,
          email,
          phone,
          resumeUrl: resumeName,
          status: 'Applied'
        });`);

fs.writeFileSync(path, content);
