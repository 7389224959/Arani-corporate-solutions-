const fs = require('fs');
let code = fs.readFileSync('components/RoleChoiceModal.tsx', 'utf8');

const updatedSubmit = `  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalResumeUrl = null;
    
    // Save to Supabase
    try {
      const { saveCandidateProfile, uploadFile } = await import('@/lib/supabase');

      if (formData.cv) {
        const url = await uploadFile('counselling_resumes', formData.cv, 'resumes');
        if (url) {
          finalResumeUrl = url;
        }
      }

      await saveCandidateProfile({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        resume_url: finalResumeUrl,
        cv_url: finalResumeUrl,
        resumeUrl: finalResumeUrl,
        // Default empty values for the other required fields by saveCandidateProfile
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
        confidentialSearch: true
      });
    } catch (err) {
      console.warn('Failed to save candidate registration to Supabase', err);
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('arani_role_registration', JSON.stringify({
        role: 'Candidate',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        resume_url: finalResumeUrl,
        cv_url: finalResumeUrl,
        status: 'Active'
      }));
    }

    router.push('/candidate/dashboard');
  };`;

code = code.replace(
  /  const handleRegisterSubmit = async \(e: React\.FormEvent\) => \{[\s\S]*?router\.push\('\/candidate\/dashboard'\);\n  \};/,
  updatedSubmit
);

fs.writeFileSync('components/RoleChoiceModal.tsx', code);
console.log('Done');
