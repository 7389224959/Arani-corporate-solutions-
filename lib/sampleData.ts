export interface DirectorData {
  name: string;
  title: string;
  photoUrl: string;
  badgeText: string;
  experienceTag: string;
  bio: string;
  signatureName: string;
  signatureTitle: string;
  highlights: { title: string; subtitle: string }[];
}

export const DEFAULT_DIRECTOR_DATA: DirectorData = {
  name: 'Ashutosh Raj Choure',
  title: 'Managing Director & Founder',
  photoUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
  badgeText: '📷 Director Ashutosh Raj Choure at Aranii Corporate Solutions Head Office Desk',
  experienceTag: 'Director',
  bio: 'Under the leadership of Director Ashutosh Raj Choure, Aranii Corporate Solutions has established itself as an All-Stream recruitment and talent consultancy. Specializing in high-volume Work From Home, Data Entry, KYC Verification, and Fresher hiring drives, Aranii bridges job seekers with leading Indian enterprises, e-commerce giants, fintechs, and corporate houses.',
  signatureName: 'Ashutosh Raj Choure',
  signatureTitle: 'Managing Director, Aranii Corporate Solutions',
  highlights: [
    { title: 'Industry Experience', subtitle: '15+ Years in Multi-Stream Staffing & Recruitment' },
    { title: 'Successful Placements', subtitle: '14,000+ Candidates Placed Nationally' },
    { title: 'Employer Network', subtitle: '350+ Verified Corporate, Tech & BPO Employers' },
    { title: 'Specialized Streams', subtitle: 'Work From Home, Data Entry, KYC & Freshers' }
  ]
};

export interface CarouselSlideData {
  id: number | string;
  title: string;
  image: string;
  badge: string;
  headline: string;
  subheadline: string;
  tag: string;
}

export const DEFAULT_CAROUSEL_SLIDES: CarouselSlideData[] = [
  {
    id: 1,
    title: 'Work From Home & Remote Career Hub',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1920&q=80',
    badge: 'High-Demand Work From Home (WFH) Openings',
    headline: 'Work From Anywhere Across India',
    subheadline: 'Verified remote customer support, telecalling, and virtual operations roles with laptop/equipment allowances, flexible shifts, and guaranteed monthly bank payouts.',
    tag: 'Work From Home'
  },
  {
    id: 2,
    title: 'Data Entry & Back Office Operations',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=80',
    badge: '10th & 12th Pass Friendly • Immediate Onboarding',
    headline: 'High-Volume Data Entry & Back Office Jobs',
    subheadline: 'Computer operator, MS Excel, catalog processing, and document indexing vacancies with spot interview scheduling and typing speed assessments (25-35 WPM).',
    tag: 'Data Entry'
  },
  {
    id: 3,
    title: 'KYC & Document Verification Specialist Hub',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80',
    badge: 'Fintech, Telecom & Banking Compliance Openings',
    headline: 'Specialized KYC & Document Verification Careers',
    subheadline: 'Join India’s rapid e-KYC and digital onboarding revolution. Fast-track placement in customer identification, identity fraud prevention, and biometric verification.',
    tag: 'KYC Operations'
  },
  {
    id: 4,
    title: 'Fresher & Entry-Level Special Hiring Drive',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80',
    badge: '0 Experience Required • Batches 2021 - 2026',
    headline: 'Launch Your Career With Zero Prior Experience',
    subheadline: 'Dedicated placement tracks for fresh 10th pass, 12th pass, and college graduates with free induction training, resume building, and spot offer letters within 48 hours.',
    tag: 'Freshers Track'
  },
  {
    id: 5,
    title: 'Multi-Stream Enterprise Staffing Solutions',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    badge: '350+ Partner Companies Nationwide',
    headline: 'Hiring Across All Streams & Industries',
    subheadline: 'From Customer Care and IT Support to Logistics, Finance, and Corporate Administration — Aranii connects top employers with verified talent within 72 hours.',
    tag: 'All Streams'
  }
];

export interface Job {
  id: string;
  title: string;
  category: 'Work From Home' | 'Data Entry' | 'KYC & Verification' | 'Freshers' | 'Banking' | 'Customer Support' | 'Corporate' | 'IT';
  location: string;
  salary: string;
  type: string;
  experience: string;
  postedDate: string;
  isUrgent?: boolean;
  isFeatured?: boolean;
  isConfidential?: boolean;
  companyName: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface Article {
  id: string;
  title: string;
  category: 'Article' | 'Video' | 'Guide';
  readTime: string;
  date: string;
  author: string;
  summary: string;
  image: string;
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  type: 'candidate' | 'employer';
  metric?: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'candidate' | 'employer';
}

export const SAMPLE_JOBS: Job[] = [
  {
    id: 'ACS-WFH-101',
    title: 'Work From Home Customer Support & Chat Associate',
    category: 'Work From Home',
    location: 'Remote (Work From Anywhere in India)',
    salary: '₹24,000 – ₹38,000 / mo',
    type: 'Full-Time Remote',
    experience: 'Fresher to 3 Years',
    postedDate: '1 hour ago',
    isUrgent: true,
    isFeatured: true,
    companyName: 'Global Cloud Support Services',
    description: 'Provide live chat and inbound support to customers, resolve order and account inquiries from home using company-provided portal software.',
    requirements: ['12th Pass or Graduate in any stream', 'Good typing speed (25+ WPM) and clear Hindi / English communication', 'Personal Laptop/PC or Android smartphone with steady broadband connection', 'Freshers eligible with immediate joining readiness'],
    benefits: ['100% Work from home setup', 'Monthly internet allowance', 'Performance-based weekly incentives', 'Paid medical & accidental cover']
  },
  {
    id: 'ACS-DE-202',
    title: 'Data Entry Operator & Back Office Executive',
    category: 'Data Entry',
    location: 'Pan-India Hubs / Hybrid / Remote Option',
    salary: '₹22,000 – ₹34,000 / mo',
    type: 'Full-Time',
    experience: '0 to 2 Years (Freshers Welcome)',
    postedDate: '3 hours ago',
    isUrgent: true,
    isFeatured: true,
    companyName: 'Apex Data & E-Commerce Logistics',
    description: 'Perform alpha-numeric data entry, customer invoice processing, MS Excel spreadsheet updates, and scanned document digital filing.',
    requirements: ['10th Pass, 12th Pass, or any Bachelor’s degree', 'Basic understanding of MS Excel, Word, and Google Sheets', 'Typing speed minimum 25-30 WPM with 95% accuracy', 'Freshers with quick learning ability encouraged to apply'],
    benefits: ['Spot interview & offer letter', 'Fixed day shifts with Sunday off', 'Overtime allowances', 'Annual appraisal & skill upgrades']
  },
  {
    id: 'ACS-KYC-303',
    title: 'KYC & Document Verification Specialist',
    category: 'KYC & Verification',
    location: 'Mumbai / Pune / Delhi NCR / Remote Hubs',
    salary: '₹25,000 – ₹40,000 / mo',
    type: 'Full-Time',
    experience: '0 to 3 Years',
    postedDate: 'Today',
    isUrgent: true,
    isFeatured: true,
    companyName: 'Fintech ID & Compliance Solutions',
    description: 'Verify identity documents (Aadhaar, PAN, Passport, Bank Passbooks) against regulatory databases and approve seamless account onboarding.',
    requirements: ['12th Pass or Graduate (BA, B.Com, B.Sc, BBA)', 'Attention to detail for identifying forged or blurry documents', 'Basic familiarity with computer portals and verification workflows', 'Previous BPO or document verification experience is a plus, but freshers trained fully'],
    benefits: ['Comprehensive regulatory training', 'Corporate health insurance', 'Quarterly performance bonuses', 'Fast-track promotion to Team Lead']
  },
  {
    id: 'ACS-FRESH-404',
    title: 'Fresher Trainee / Process Associate (Immediate Spot Offers)',
    category: 'Freshers',
    location: 'Bengaluru / Hyderabad / Chennai / Kolkata',
    salary: '₹20,000 – ₹32,000 / mo',
    type: 'Full-Time',
    experience: '0 Years (Strictly Freshers Batches 2021-2026)',
    postedDate: 'Today',
    isUrgent: true,
    isFeatured: true,
    companyName: 'Enterprise BPO & Tech Operations',
    description: 'Entry-level trainee position designed for candidates starting their professional career. Full 15-day paid induction training provided upon selection.',
    requirements: ['10th Pass / 12th Pass / Any Graduate (Arts, Science, Commerce, Diploma)', 'Basic spoken and written language skills', 'Positive attitude and willingness to learn corporate operations', 'No prior experience required whatsoever'],
    benefits: ['100% paid induction training', 'Spot selection and confirmed joining letter', 'Free company transport / night shift cabs where applicable', 'Subsidized meals & cafeteria']
  },
  {
    id: 'ACS-WFH-105',
    title: 'Tele-Calling & Digital Advisory Associate (Remote)',
    category: 'Work From Home',
    location: 'Virtual / Home-Based (Pan-India)',
    salary: '₹26,000 – ₹45,000 / mo + Incentives',
    type: 'Full-Time Remote',
    experience: '0 to 4 Years',
    postedDate: '1 day ago',
    isUrgent: false,
    isFeatured: false,
    companyName: 'Omnichannel Consumer Services',
    description: 'Contact verified warm customer leads to explain services, book appointments, and capture customer requirements in CRM software from home.',
    requirements: ['Fluent spoken Hindi or regional language (English is a bonus)', 'Polite telephone manner and customer-centric mindset', 'Android smartphone or laptop with headset', 'Freshers with persuasive communication skills accepted'],
    benefits: ['Uncapped daily & weekly sales incentives', 'Flexible day shift options', 'Mobile recharge allowance provided']
  },
  {
    id: 'ACS-DE-206',
    title: 'Computer Operator & Catalog Indexing Executive',
    category: 'Data Entry',
    location: 'Delhi NCR / Jaipur / Indore / Lucknow',
    salary: '₹21,000 – ₹30,000 / mo',
    type: 'Full-Time',
    experience: 'Fresher to 2 Years',
    postedDate: '1 day ago',
    isUrgent: false,
    isFeatured: false,
    companyName: 'National Retail & Warehouse Network',
    description: 'Input product SKU codes, inventory logs, stock registers, and vendor delivery challans into enterprise ERP systems.',
    requirements: ['Minimum 10th or 12th standard pass', 'Good keyboard numeric keypad typing accuracy', 'Honest and punctual work approach'],
    benefits: ['ESI & Provident Fund (PF) benefits', 'Annual performance bonus', 'Comfortable air-conditioned office environment']
  },
  {
    id: 'ACS-BNK-507',
    title: 'Branch Operations Officer & Customer Desk Lead',
    category: 'Banking',
    location: 'Mumbai / Pune / Ahmedabad / Chandigarh',
    salary: '₹30,000 – ₹48,000 / mo (₹3.6L – ₹5.8L / yr)',
    type: 'Full-Time',
    experience: '1 to 4 Years',
    postedDate: '2 days ago',
    isUrgent: false,
    isFeatured: true,
    companyName: 'Leading Private Banking Partner',
    description: 'Oversee daily retail branch transactions, locker operations, account opening verification, and customer service delivery.',
    requirements: ['Graduate in Commerce, Economics, or Business Administration', '1+ year experience in financial services or branch operations', 'Strong compliance and customer handling skills'],
    benefits: ['Subsidized loan facilities', 'Fixed annual performance appraisal', 'Branch location preference']
  },
  {
    id: 'ACS-IT-608',
    title: 'Technical Helpdesk & IT Support Associate',
    category: 'IT',
    location: 'Bengaluru / Chennai / Hybrid',
    salary: '₹28,000 – ₹44,000 / mo',
    type: 'Full-Time',
    experience: '0 to 3 Years',
    postedDate: '3 days ago',
    isUrgent: false,
    isFeatured: false,
    companyName: 'Technology Infrastructure Corp',
    description: 'Assist internal staff with remote desktop support, password resets, hardware diagnostics, and ticket resolution.',
    requirements: ['B.Sc IT / BCA / Diploma in Computer Science / Any Tech Grad', 'Knowledge of Windows OS, MS Office 365, and basic LAN troubleshooting', 'Fresh tech graduates welcome'],
    benefits: ['Certification sponsorship', 'Shift allowances', 'Comprehensive family health cover']
  }
];

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'How to Land a Legitimate Work From Home Job in 2026: Avoiding Scams and Spotting Real Offers',
    category: 'Guide',
    readTime: '5 min read',
    date: 'Aug 10, 2026',
    author: 'Aranii Career Advisory Desk',
    summary: 'A step-by-step checklist to verify remote customer support and data entry job offers, understand digital admit passes, and avoid fraudulent up-front fees.',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  },
  {
    id: 'art-2',
    title: 'Top In-Demand Data Entry & KYC Skills Employers Look For in Freshers',
    category: 'Article',
    readTime: '4 min read',
    date: 'Aug 04, 2026',
    author: 'Sunil Mehta, Chief Talent Officer',
    summary: 'Mastering 30+ WPM typing, Excel formulas, and Aadhaar/PAN compliance inspection can double your starting salary in back-office roles.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'art-3',
    title: 'Fresher Placement Guide: How 10th & 12th Pass Candidates Get Direct Spot Offers',
    category: 'Guide',
    readTime: '6 min read',
    date: 'Jul 28, 2026',
    author: 'Priya Sharma, Senior Recruitment Lead',
    summary: 'Everything you need to know about preparing for phone and video interviews, submitting verified IDs, and receiving written offer letters in 48 hours.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'art-4',
    title: 'Employer Playbook: Bulk Sourcing 500+ Verified WFH & Operations Staff in 72 Hours',
    category: 'Video',
    readTime: '10 min video',
    date: 'Jul 19, 2026',
    author: 'Aranii Corporate Media',
    summary: 'How fast-growing e-commerce and fintech companies scale their customer onboarding and verification teams with pre-screened talent pools.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  }
];

export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Pooja Verma',
    role: 'Work From Home Support Associate',
    company: 'Placed via Aranii Remote Drive',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    quote: 'I wanted a genuine Work From Home job where I could work from my home with my laptop. Aranii conducted my skill test, verified my documents, and scheduled a direct video interview. I am now earning ₹32,000/month with zero commuting costs!',
    type: 'candidate',
    metric: '₹32k/mo WFH Offer',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Rahul Sen',
    role: 'Data Entry & KYC Operations Specialist',
    company: 'Fintech ID Services (Mumbai)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote: 'As a 12th pass candidate, most job boards only gave spam calls. Aranii gave me an official QR-coded pass and scheduled my interview with an actual operations head. Got my offer letter in 48 hours for data verification.',
    type: 'candidate',
    metric: 'Spot Offer in 48h',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Amitabh Sen',
    role: 'Fresher Process Associate',
    company: 'E-Commerce Back-Office Hub',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    quote: 'I graduated in 2024 with zero prior work experience. Aranii’s team provided typing test mock papers and guided me through the interview round. Very professional and supportive throughout.',
    type: 'candidate',
    metric: 'Zero Exp to Hired',
    rating: 5
  },
  {
    id: 't-4',
    name: 'Deepika Sen',
    role: 'VP – Talent Acquisition & Workforce',
    company: 'Enterprise Customer Operations',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    quote: 'When we needed 120 verified Work From Home and Data Entry executives across India in one week, Aranii delivered pre-screened shortlists that met 100% of our SLA criteria. Exceptional speed and candidate retention.',
    type: 'employer',
    metric: '120 Hires in 7 Days',
    rating: 5
  }
];

export const SAMPLE_FAQS: FAQ[] = [
  {
    id: 'faq-c1',
    question: 'What job streams and categories does Aranii specialize in?',
    answer: 'Aranii Corporate Solutions operates across all employment streams, with specialized high-volume recruitment verticals for: (1) Work From Home (Remote customer care, chat support, telecalling), (2) Data Entry & Back Office, (3) KYC & Document Verification, (4) Freshers (0 experience, 10th/12th/Graduates), as well as Banking & Financial Services, BPO, and Corporate Operations.',
    category: 'candidate'
  },
  {
    id: 'faq-c2',
    question: 'Can freshers or 10th / 12th pass candidates apply?',
    answer: 'Yes! We run dedicated drives specifically for 10th pass, 12th pass, and college freshers. Many of our Data Entry, WFH Chat Support, and KYC verification positions require zero prior experience. Complete company induction training is provided upon selection.',
    category: 'candidate'
  },
  {
    id: 'faq-c3',
    question: 'How do Work From Home jobs work, and what equipment is needed?',
    answer: 'For remote/WFH roles, you need a desktop PC, laptop, or good Android smartphone with a stable internet connection. Interviews and training are conducted 100% online, and your salary is directly deposited into your bank account monthly.',
    category: 'candidate'
  },
  {
    id: 'faq-c4',
    question: 'How long does it take to get interviewed after submitting my profile?',
    answer: 'Once your profile and resume are verified by our recruitment team, your application is matched with active vacancies within 24–48 hours. Most verified candidates receive their interview schedule within 3 to 5 business days.',
    category: 'candidate'
  },
  {
    id: 'faq-c5',
    question: 'What is the National Mega Job Drive and why is there a nominal ₹299 pass fee?',
    answer: 'The Mega Job Drive is a centralized hiring initiative listing 10 Lakh+ vacancies across India. The nominal ₹299 fee is an official Candidate Intake & Admit Pass processing fee that covers recruiter human screening, ATS parsing, QR-coded digital admit pass generation, and virtual/spot interview slot booking with refund protection.',
    category: 'candidate'
  },
  {
    id: 'faq-c6',
    question: 'How do you keep my job search confidential?',
    answer: 'If you are currently working, you can toggle "Confidential Search" in your candidate profile, ensuring your existing employer is never contacted or notified during preliminary evaluations.',
    category: 'candidate'
  },
  {
    id: 'faq-e1',
    question: 'Can Aranii supply bulk talent for Work From Home, KYC, or Data Entry teams?',
    answer: 'Yes, bulk and high-volume recruitment is our core strength. We routinely supply 50 to 500+ pre-screened, identity-verified candidates for remote support, data entry operations, and KYC compliance within 72 hours.',
    category: 'employer'
  },
  {
    id: 'faq-e2',
    question: 'What is your commercial model for corporate employers?',
    answer: 'We operate on a pure success-fee model for permanent recruitment. You only pay upon successful joining of a candidate from our shortlist. If no hire is made, there is zero fee.',
    category: 'employer'
  },
  {
    id: 'faq-e3',
    question: 'Do you offer a replacement guarantee if a candidate leaves?',
    answer: 'Yes, all permanent placements come with a standard 90-day replacement guarantee. If a hired employee resigns or fails probation within 90 days, we provide a replacement at no extra charge.',
    category: 'employer'
  },
  {
    id: 'faq-e4',
    question: 'Do you provide contract staffing and background verification services?',
    answer: 'Yes, we provide end-to-end HR services including Contract & Remote Staffing, Payroll Management, Executive Search, and comprehensive Background Verification (identity, education, criminal, and previous employer checks).',
    category: 'employer'
  },
  {
    id: 'faq-e5',
    question: 'Which industries and geographies do you cover?',
    answer: 'We cover all of India across Metro cities, Tier-2, and Tier-3 hubs, as well as 100% remote talent across E-Commerce, Fintech, BPO & Customer Service, IT & Tech, Banking & NBFCs, Logistics, and Corporate Operations.',
    category: 'employer'
  },
  {
    id: 'faq-e6',
    question: 'How do I submit an urgent bulk hiring requisition?',
    answer: 'Submit your requirement via the "Request Talent" form on our website or email business@aranicorporate.com. A dedicated Account Manager will connect with you within 2 business hours.',
    category: 'employer'
  }
];

export const PARTNER_LOGOS = [
  { name: 'Teleperformance', category: 'BPO & WFH' },
  { name: 'Concentrix', category: 'Customer Support' },
  { name: 'Amazon Operations', category: 'E-Commerce & WFH' },
  { name: 'Flipkart Logistics', category: 'Logistics & Data' },
  { name: 'Paytm Fintech', category: 'KYC & Fintech' },
  { name: 'HDFC Bank', category: 'Banking' },
  { name: 'ICICI Bank', category: 'Banking' },
  { name: 'Startek Global', category: 'Customer Care' },
  { name: 'Wipro Limited', category: 'IT & ITES' },
  { name: 'Tata Consultancy', category: 'Enterprise' },
  { name: 'Infosys BPM', category: 'Operations' },
  { name: 'Genpact', category: 'KYC & Operations' }
];
