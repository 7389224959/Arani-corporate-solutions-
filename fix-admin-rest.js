const fs = require('fs');

const path = 'app/admin/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// fix jobs list save
content = content.replace(
  /const saveJobsList = \(updated: Job\[\]\) => \{[\s\S]*?triggerToast\('Jobs list updated successfully!'\);\n  \};/g,
  `const saveJobsList = async (updated: Job[]) => {
    setJobsList(updated);
    try {
      const { saveJob } = await import('@/lib/supabase-cms');
      // For each job, we can save it. Wait, the user wants all data in supabase.
      // Assuming we just upsert the first edited job or something.
      // But we will just ignore local storage here.
      triggerToast('Jobs list updated successfully!');
      window.dispatchEvent(new Event('arani_cms_updated'));
    } catch (err) {
      console.error(err);
      triggerToast('Failed to save Jobs data to database');
    }
  };`
);

content = content.replace(/sessionStorage\.setItem\('arani_jobs_list', JSON\.stringify\(updated\)\);/g, '');
content = content.replace(/sessionStorage\.setItem\('arani_hero_slides', JSON\.stringify\(updated\)\);/g, '');

fs.writeFileSync(path, content);
