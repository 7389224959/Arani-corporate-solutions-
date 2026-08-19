const fs = require('fs');

const path = 'app/admin/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace synchronous sessionStorage init with just default values
content = content.replace(/useState<DirectorData>\(\(\) => \{[\s\S]*?return DEFAULT_DIRECTOR_DATA;\n  \}\)/g, 'useState<DirectorData>(DEFAULT_DIRECTOR_DATA)');
content = content.replace(/useState<Job\[\]>\(\(\) => \{[\s\S]*?return SAMPLE_JOBS;\n  \}\)/g, 'useState<Job[]>(SAMPLE_JOBS)');
content = content.replace(/useState<HeroSlide\[\]>\(\(\) => \{[\s\S]*?return \[[^\]]*\];\n  \}\)/g, "useState<HeroSlide[]>([\n    {\n      id: 'h1',\n      title: 'Scaling Tech Ecosystems with Elite Engineering Leadership',\n      subtitle: 'Arani connects visionary founders with the top 1% of technical talent in India.',\n      primaryCta: 'Hire Talent',\n      secondaryCta: 'Explore Roles',\n      imageUrl: '/images/hero-1.jpg',\n      metrics: [{ label: 'Placements', value: '12K+' }]\n    }\n  ])");
content = content.replace(/useState<CandidateApplicant\[\]>\(\(\) => \{[\s\S]*?return initial;\n  \}\)/g, "useState<CandidateApplicant[]>([\n    {\n      id: 'APP-1001',\n      candidateName: 'Rahul Verma',\n      email: 'rahul.v@example.com',\n      phone: '+91 98765 43210',\n      nationalId: 'ABCDE1234F',\n      address: 'Koramangala, Bengaluru, Karnataka',\n      jobId: 'ACS-8049',\n      jobTitle: 'Senior React Native Developer',\n      appliedDate: 'Oct 24, 2023',\n      stage: 'Shortlisted',\n      matchScore: '94%',\n      resumeName: 'Rahul_Verma_Resume_v2.pdf',\n      utmSource: 'linkedin',\n      screeningAnswers: [\n        { question: 'Years of React Native experience?', answer: '5 years' },\n        { question: 'Notice period?', answer: '30 days' }\n      ],\n      evaluationNotes: []\n    }\n  ])");
content = content.replace(/useState\(\(\) => \{[\s\S]*?const initial = \[[^\]]*\];[\s\S]*?return initial;\n  \}\)/g, "useState([\n    { id: 'USR-001', name: 'Ashutosh Choure', email: 'director@aranicorporate.com', role: 'Super Admin', status: 'Active', verified: true, joined: 'Jan 2020' },\n    { id: 'USR-002', name: 'Sunil Sharma', email: 'admin@aranicorporate.com', role: 'Admin', status: 'Active', verified: true, joined: 'Mar 2021' }\n  ])");

fs.writeFileSync(path, content);
console.log('Fixed state initializers');
