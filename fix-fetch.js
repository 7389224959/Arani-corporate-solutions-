const fs = require('fs');
const path = 'app/admin/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const fetchBlock = `        // Fetch Site Settings
        const { getSiteSettings } = await import('@/lib/supabase-cms');
        const settings = await getSiteSettings();
        if (settings) {
          setSiteSettings(prev => ({ ...prev, ...settings }));
          if (settings.director_data) setDirectorData(settings.director_data);
          if (settings.hero_slides && settings.hero_slides.length > 0) setHeroSlides(settings.hero_slides);
          if (settings.partner_logos) setPartnerLogos(settings.partner_logos);
          if (settings.testimonials) setTestimonialsList(settings.testimonials);
          if (settings.faqs) setFaqsList(settings.faqs);
          if (settings.articles) setArticlesList(settings.articles);
          if (settings.live_stats) setLiveStats(settings.live_stats);
        }

        const dbApps = await getJobApplications();`;

content = content.replace(/const dbApps = await getJobApplications\(\);/, fetchBlock);

content = content.replace(
  /<ClientTemplatesAdmin\s*\n\s*settings=\{siteSettings as any\}\s*\n\s*onSaveSettings=\{async \(updated: any\) => \{\s*\n\s*setSiteSettings\(prev => \(\{ \.\.\.prev, \.\.\.updated \}\)\);\s*\n\s*\}\}\s*\n\s*\/>/g,
  `<ClientTemplatesAdmin 
    settings={siteSettings as any}
    onSaveSettings={async (updated: any) => {
      setSiteSettings(prev => ({ ...prev, ...updated }));
      try {
        const { saveSiteSettings } = await import('@/lib/supabase-cms');
        await saveSiteSettings(updated);
        triggerToast('Client reel templates saved to database!');
      } catch (err) {
        console.error('Failed to save templates', err);
        triggerToast('Failed to save templates to database');
      }
    }}
  />`
);

fs.writeFileSync(path, content);
console.log('Fixed fetchSupabaseData and ClientTemplatesAdmin save');
