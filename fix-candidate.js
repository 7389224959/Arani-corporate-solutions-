const fs = require('fs');

const path = 'app/candidate/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace synchronous load
content = content.replace(/const \[profile, setProfile\] = useState<any>\(\(\) => \{[\s\S]*?confidentialSearch: false\n    \};\n  \}\);/, `const [profile, setProfile] = useState<any>({
    fullName: '',
    email: '',
    phone: '',
    nationalId: '',
    address: '',
    district: '',
    city: '',
    state: '',
    zipCode: '',
    education: '',
    currentCompany: '',
    currentRole: '',
    experienceYears: '',
    expectedCtc: '',
    noticePeriod: '',
    skills: '',
    confidentialSearch: false
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { getCandidateProfiles } = await import('@/lib/supabase');
        const profiles = await getCandidateProfiles();
        if (profiles && profiles.length > 0) {
          const dbProfile = profiles[0];
          setProfile({
            fullName: dbProfile.full_name || '',
            email: dbProfile.email || '',
            phone: dbProfile.phone || '',
            nationalId: dbProfile.national_id || '',
            address: dbProfile.address || '',
            district: dbProfile.district || '',
            city: dbProfile.city || '',
            state: dbProfile.state || '',
            zipCode: dbProfile.zip_code || '',
            education: dbProfile.education || '',
            currentCompany: dbProfile.current_company || '',
            currentRole: dbProfile.current_role || '',
            experienceYears: dbProfile.experience_years || '',
            expectedCtc: dbProfile.expected_ctc || '',
            noticePeriod: dbProfile.notice_period || '',
            skills: dbProfile.skills || '',
            confidentialSearch: dbProfile.confidential_search || false
          });
        }
      } catch (err) {}
    };
    loadProfile();
  }, []);`);

// Remove fallback local storage in save
content = content.replace(/\/\/ Fallback\/Demo local storage\s*\n\s*if \(typeof window !== 'undefined'\) \{[\s\S]*?\}\s*\n\s*triggerToast\('Profile updated successfully!'\);/, `triggerToast('Profile updated successfully!');`);

// Remove initial job applications from sessionStorage
content = content.replace(/const \[applications, setApplications\] = useState<any\[\]>\(\(\) => \{[\s\S]*?\}\);/, `const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const { getJobApplications } = await import('@/lib/supabase');
        const apps = await getJobApplications();
        if (apps && apps.length > 0) {
          setApplications(apps.map((a: any) => ({
            id: a.id,
            jobTitle: a.job_code ? \`Job: \${a.job_code}\` : 'General Application',
            company: 'Arani Corporate',
            appliedDate: new Date(a.created_at).toLocaleDateString(),
            status: a.status || 'Under Review',
            matchScore: 'N/A'
          })));
        }
      } catch (err) {}
    };
    loadApps();
  }, []);`);

fs.writeFileSync(path, content);
console.log('Fixed candidate dashboard');
