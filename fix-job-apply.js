const fs = require('fs');

const fixApply = (path) => {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(
    /const existingStr = sessionStorage\.getItem\('arani_candidate_applications'\) \|\| '\[\]';[\s\S]*?sessionStorage\.setItem\('arani_candidate_applications', JSON\.stringify\(\[newApp, \.\.\.existing\]\)\);/,
    `try {
        const { submitJobApplication } = await import('@/lib/supabase');
        await submitJobApplication(newApp);
      } catch (err) {
        console.error('Failed to submit application to database', err);
      }`
  );
  content = content.replace(
    /const existingStr = localStorage\.getItem\('arani_candidate_applications'\) \|\| '\[\]';[\s\S]*?localStorage\.setItem\('arani_candidate_applications', JSON\.stringify\(\[newApp, \.\.\.existing\]\)\);/,
    ``
  );
  fs.writeFileSync(path, content);
};

fixApply('app/jobs/[id]/page.tsx');
fixApply('components/JobQuickModal.tsx');
console.log('Fixed job application persistence');
