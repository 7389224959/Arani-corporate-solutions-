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
  bio: 'Under the leadership of Director Ashutosh Raj Choure, Aranii Corporate Solutions has established itself as a premier recruitment, staffing, and placement consultancy. He is dedicated to connecting ambitious job seekers with leading banking and corporate opportunities while providing employers with top-tier, screened talent.',
  signatureName: 'Ashutosh Raj Choure',
  signatureTitle: 'Managing Director, Aranii Corporate Solutions',
  highlights: [
    { title: 'Industry Experience', subtitle: '15+ Years in Banking & Corporate Staffing' },
    { title: 'Successful Placements', subtitle: '12,000+ Candidates Hired Nationally' },
    { title: 'Employer Network', subtitle: '350+ Partner Enterprises & Tier-1 Banks' },
    { title: 'Candidate Success Rate', subtitle: '98% Satisfaction & Retention SLA' }
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
    title: 'Office Reception & Corporate Headquarters',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    badge: 'Trusted Recruitment & Placement Consultancy',
    headline: 'Connecting Talent With Opportunity',
    subheadline: 'Aranii Corporate Solutions helps job seekers secure opportunities with leading companies while helping businesses hire qualified professionals across multiple industries.',
    tag: 'Corporate Headquarters'
  },
  {
    id: 2,
    title: 'Executive Recruitment & Talent Consultation',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    badge: '350+ Enterprise & Banking Employer Partners',
    headline: 'Engineered Talent for High-Growth Businesses',
    subheadline: 'From banking branch leadership to corporate executive positions, we deliver pre-screened, background-verified candidates within 72 hours.',
    tag: 'Talent Acquisition'
  },
  {
    id: 3,
    title: '1-on-1 Candidate Placement Session',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80',
    badge: '100% Free Placement Service For Job Seekers',
    headline: 'Accelerate Your Career in Banking & Corporate',
    subheadline: 'Access unadvertised vacancies in premier financial institutions with personalized resume guidance and zero candidate placement fees.',
    tag: 'Career Growth'
  },
  {
    id: 4,
    title: 'Modern Corporate Office Workspace',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80',
    badge: '12,000+ Successful Placements Made',
    headline: 'End-to-End HR & Staffing Advisory',
    subheadline: 'Permanent recruitment, contract staffing, payroll administration, and background verification backed by a 90-day replacement guarantee.',
    tag: 'HR Solutions'
  },
  {
    id: 5,
    title: 'Candidate Interview & Screening Session',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1920&q=80',
    badge: '98% Employer & Candidate Retention Rate',
    headline: 'Quality Hiring. Zero Recruitment Delay.',
    subheadline: 'Rigorous multi-stage screening and background verification ensure long-term employee retention and immediate office productivity.',
    tag: 'Executive Search'
  }
];

export interface Job {
  id: string;
  title: string;
  category: 'Banking' | 'Corporate' | 'Finance' | 'Operations' | 'IT';
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
    id: 'ACS-8042',
    title: 'Senior Credit Risk Analyst',
    category: 'Banking',
    location: 'Mumbai / Hybrid',
    salary: '₹14L – ₹18L / yr ($3.5k–$4.5k/mo)',
    type: 'Full-Time',
    experience: '3–5 Years',
    postedDate: '2 hours ago',
    isUrgent: true,
    isFeatured: true,
    companyName: 'Tier-1 Private Bank',
    description: 'Lead credit underwriting, risk assessment, and financial due diligence for retail and commercial lending portfolios.',
    requirements: ['CA or MBA Finance from top institute', 'Min 3 years credit analysis experience in commercial bank', 'Proficiency in financial modelling & CIBIL analysis', 'Strong knowledge of RBI regulatory guidelines'],
    benefits: ['Competitive performance bonus', 'Comprehensive medical insurance', 'Fast-track career progression']
  },
  {
    id: 'ACS-8043',
    title: 'Branch Operations Officer',
    category: 'Banking',
    location: 'Delhi NCR / On-Site',
    salary: '₹8L – ₹11L / yr ($2.2k–$3.0k/mo)',
    type: 'Full-Time',
    experience: '1–3 Years',
    postedDate: '5 hours ago',
    isUrgent: false,
    isFeatured: true,
    companyName: 'Leading National Bank',
    description: 'Manage daily retail branch transactions, audit compliance, vault management, and customer account administration.',
    requirements: ['Graduate in Commerce/Finance', '1+ year experience in branch operations or retail banking', 'Excellent communication & audit compliance track record'],
    benefits: ['Subsidized loan facilities', 'Fixed annual performance appraisal', 'Branch location preference']
  },
  {
    id: 'ACS-8044',
    title: 'Corporate HR Business Partner',
    category: 'Corporate',
    location: 'Bengaluru / Hybrid',
    salary: '₹16L – ₹22L / yr ($4.0k–$5.5k/mo)',
    type: 'Full-Time',
    experience: '4–7 Years',
    postedDate: 'Today',
    isUrgent: true,
    isFeatured: false,
    companyName: 'Global Enterprise Corp',
    description: 'Drive talent strategy, performance management, employee engagement, and leadership coaching across corporate business units.',
    requirements: ['MBA in HR or equivalent degree', 'Demonstrated success as HRBP in 500+ employee organisation', 'Expertise in Workday/HRMS & talent retention frameworks'],
    benefits: ['Flexible hybrid work model', 'Wellness allowance & gym membership', 'Global mobility options']
  },
  {
    id: 'ACS-8045',
    title: 'KYC & AML Compliance Officer',
    category: 'Finance',
    location: 'Hyderabad / Remote',
    salary: '₹10L – ₹14L / yr ($2.5k–$3.5k/mo)',
    type: 'Full-Time',
    experience: '2–4 Years',
    postedDate: '1 day ago',
    isUrgent: false,
    isFeatured: true,
    isConfidential: true,
    companyName: 'Confidential Fintech Giant',
    description: 'Perform enhanced due diligence, transaction monitoring, customer onboarding screening, and regulatory filing audits.',
    requirements: ['CAMS certification preferred', '2+ years in AML/KYC screening in financial services', 'Experience with LexisNexis / World-Check tools'],
    benefits: ['100% remote flexibility', 'Certification sponsorship', 'Quarterly incentive plan']
  },
  {
    id: 'ACS-8046',
    title: 'Wealth Relationship Manager',
    category: 'Banking',
    location: 'Mumbai / Pune',
    salary: '₹12L – ₹20L + Incentives ($3.2k–$5.0k/mo)',
    type: 'Full-Time',
    experience: '2–5 Years',
    postedDate: '1 day ago',
    isUrgent: true,
    isFeatured: false,
    companyName: 'Multinational Wealth Bank',
    description: 'Manage HNI and Ultra-HNI investment portfolios, mutual fund advisory, estate planning, and wealth management services.',
    requirements: ['AMFI / NISM certification mandatory', 'Proven track record of managing ₹50Cr+ AUM', 'Exceptional relationship building & advisory skills'],
    benefits: ['Uncapped performance commissions', 'International annual incentive trips', 'Executive car program']
  },
  {
    id: 'ACS-8047',
    title: 'Senior Financial Analyst',
    category: 'Finance',
    location: 'Gurugram / Hybrid',
    salary: '₹15L – ₹19L / yr ($3.8k–$4.8k/mo)',
    type: 'Full-Time',
    experience: '3–6 Years',
    postedDate: '2 days ago',
    isUrgent: false,
    isFeatured: false,
    companyName: 'Big-4 Advisory Firm',
    description: 'Conduct financial planning & analysis (FP&A), variance modeling, quarterly forecasting, and executive reporting.',
    requirements: ['CA / CFA / MBA Finance', 'Strong proficiency in Advanced Excel, PowerBI, and SAP', 'Experience in financial audit or corporate FP&A'],
    benefits: ['Accelerated partner track', 'Continuous learning budget', 'Comprehensive health cover']
  },
  {
    id: 'ACS-8048',
    title: 'IT Systems & Infrastructure Lead',
    category: 'IT',
    location: 'Chennai / Hybrid',
    salary: '₹18L – ₹24L / yr ($4.5k–$6.0k/mo)',
    type: 'Full-Time',
    experience: '5–8 Years',
    postedDate: '2 days ago',
    isUrgent: false,
    isFeatured: true,
    companyName: 'Technology Solutions Corp',
    description: 'Oversee corporate IT operations, cloud infrastructure security, network administration, and helpdesk SLA delivery.',
    requirements: ['B.Tech / MCA in Computer Science/IT', 'AWS / Azure Certified Solutions Architect preferred', 'Hands-on experience with enterprise network security & IAM'],
    benefits: ['Stock options / RSU allocation', 'Flexible work hours', 'Annual tech allowance']
  },
  {
    id: 'ACS-8049',
    title: 'Corporate Operations Manager',
    category: 'Operations',
    location: 'Mumbai / On-Site',
    salary: '₹14L – ₹18L / yr ($3.5k–$4.5k/mo)',
    type: 'Full-Time',
    experience: '4–6 Years',
    postedDate: '3 days ago',
    isUrgent: false,
    isFeatured: false,
    companyName: 'Enterprise Logistics Group',
    description: 'Streamline operational workflows, vendor management, facility administration, and SLA optimization across regional hubs.',
    requirements: ['Bachelor/Master degree in Management', 'Six Sigma Green/Black Belt preferred', 'Proven operational leadership in corporate setup'],
    benefits: ['Relocation allowance', 'Family medical plan', 'Performance bonus']
  }
];

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Banking Career Roadmap 2026: The Shift Toward Digital Underwriting & Wealth Tech',
    category: 'Article',
    readTime: '6 min read',
    date: 'Aug 01, 2026',
    author: 'Aranii Research Team',
    summary: 'Discover the top skills tier-1 banks are screening for in 2026, from automated credit risk models to personalized wealth advisory frameworks.',
    image: 'https://picsum.photos/seed/banking2026/800/450',
    isFeatured: true
  },
  {
    id: 'art-2',
    title: 'How HR Directors Shortlist Talent in 72 Hours: The Aranii Screening Methodology',
    category: 'Guide',
    readTime: '4 min read',
    date: 'Jul 28, 2026',
    author: 'Sunil Mehta, Chief Talent Officer',
    summary: 'A step-by-step look at how pre-verified candidate pools eliminate hiring friction for enterprise corporate clients.',
    image: 'https://picsum.photos/seed/hrguide/600/350'
  },
  {
    id: 'art-3',
    title: 'Resume Mastery for Financial Services: 5 Costly Mistakes Candidates Make',
    category: 'Article',
    readTime: '5 min read',
    date: 'Jul 22, 2026',
    author: 'Priya Sharma, Senior Banking Recruiter',
    summary: 'Avoid common formatting traps, showcase quantifiable portfolio impact, and pass ATS filters effortlessly.',
    image: 'https://picsum.photos/seed/resumemastery/600/350'
  },
  {
    id: 'art-4',
    title: 'Executive Panel: Contract Staffing vs Full-Time Placement Trends in 2026',
    category: 'Video',
    readTime: '12 min video',
    date: 'Jul 15, 2026',
    author: 'Aranii Corporate Media',
    summary: 'Industry leaders discuss flexible workforce strategies, payroll outsourcing, and compliance risk mitigation.',
    image: 'https://picsum.photos/seed/executivevideo/600/350'
  }
];

export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ananya Deshmukh',
    role: 'Senior Credit Risk Analyst',
    company: 'Placed at HDFC Bank',
    avatar: 'https://picsum.photos/seed/ananya/120/120',
    quote: 'Aranii Corporate Solutions transformed my job search. Their banking consultants guided me through interview rounds and secured a 42% salary uplift in less than two weeks.',
    type: 'candidate',
    metric: '+42% Salary Uplift',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Vikram Malhotra',
    role: 'VP – Human Resources',
    company: 'Kotak Financial Services',
    avatar: 'https://picsum.photos/seed/vikram/120/120',
    quote: 'When we needed 15 pre-screened branch operations officers across Maharashtra, Aranii delivered shortlisted candidates in 48 hours. 100% compliance and zero hassle.',
    type: 'employer',
    metric: '15 Positions Filled in 5 Days',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Rohan Verma',
    role: 'Branch Operations Lead',
    company: 'Placed at ICICI Bank',
    avatar: 'https://picsum.photos/seed/rohan/120/120',
    quote: 'As a candidate, you pay ₹0. The team at Aranii verified my profile, coached me on branch audit standards, and arranged my direct interview smoothly.',
    type: 'candidate',
    metric: 'Landed Dream Role',
    rating: 5
  },
  {
    id: 't-4',
    name: 'Deepika Sen',
    role: 'Head of Talent Acquisition',
    company: 'Enterprise Technology Corp',
    avatar: 'https://picsum.photos/seed/deepika/120/120',
    quote: 'Aranii is the most reliable recruitment partner we have worked with. Their 90-day placement guarantee and thorough background checks give us complete peace of mind.',
    type: 'employer',
    metric: '96% Retention Rate',
    rating: 5
  }
];

export const SAMPLE_FAQS: FAQ[] = [
  {
    id: 'faq-c1',
    question: 'Is Aranii Corporate Solutions completely free for job seekers?',
    answer: 'Yes! Our placement and career consultation services are 100% free for all candidates. We never charge candidates any registration, processing, or placement fees.',
    category: 'candidate'
  },
  {
    id: 'faq-c2',
    question: 'How long does it take to get interviewed after submitting my profile?',
    answer: 'Once your profile and resume are verified by our banking/corporate talent team, suitable profiles are matched with open roles within 24–48 hours. Most verified candidates receive interview schedules within 3–7 business days.',
    category: 'candidate'
  },
  {
    id: 'faq-c3',
    question: 'What documents do I need to complete my candidate registration?',
    answer: 'To complete your profile builder, you will need an updated PDF/DOC resume, basic contact details, your National ID/Passport number, educational background, and employment history.',
    category: 'candidate'
  },
  {
    id: 'faq-c4',
    question: 'Do you help candidates with interview preparation and resume building?',
    answer: 'Absolutely. Our domain-specialized recruitment advisors provide tailored guidance on resume optimization, banking interview formats, credit analysis case studies, and salary negotiation techniques.',
    category: 'candidate'
  },
  {
    id: 'faq-c5',
    question: 'Can I apply for multiple roles at once?',
    answer: 'Yes, once registered, you can track all active applications directly from your Candidate Dashboard and apply to multiple relevant openings with one click.',
    category: 'candidate'
  },
  {
    id: 'faq-c6',
    question: 'How do you keep my current employment status confidential?',
    answer: 'We treat candidate privacy with utmost seriousness. You can toggle "Confidential Search" in your profile, ensuring your current employer is never contacted or notified during preliminary screening.',
    category: 'candidate'
  },
  {
    id: 'faq-e1',
    question: 'How quickly can Aranii provide a shortlisted pool of candidates?',
    answer: 'For standard banking and corporate roles, our dedicated talent sourcing team provides a vetted, interview-ready shortlist of qualified candidates within 72 hours of receiving your requirement.',
    category: 'employer'
  },
  {
    id: 'faq-e2',
    question: 'What is your commercial model and pricing structure?',
    answer: 'We operate on a pure success-fee model for permanent staffing. You only pay when you successfully hire a candidate. If no hire is made from our shortlist, there is zero fee or invoice.',
    category: 'employer'
  },
  {
    id: 'faq-e3',
    question: 'Do you offer a replacement guarantee if a candidate leaves?',
    answer: 'Yes. All permanent placements come with a standard 90-day replacement guarantee. If a hired candidate resigns or fails probation within 90 days, we provide a replacement at no additional cost.',
    category: 'employer'
  },
  {
    id: 'faq-e4',
    question: 'Do you provide contract staffing and background verification services?',
    answer: 'Yes, we provide end-to-end HR solutions including Contract & Temporary Staffing, Payroll Outsourcing, Executive Search, and comprehensive Background Verification (education, employment, criminal, and credit check).',
    category: 'employer'
  },
  {
    id: 'faq-e5',
    question: 'Which industries and geographies do you cover?',
    answer: 'We specialize in Commercial & Investment Banking, Non-Banking Financial Companies (NBFCs), Corporate HR, FinTech, IT Infrastructure, Supply Chain Operations, and Enterprise Management across all major metro and tier-2 hubs.',
    category: 'employer'
  },
  {
    id: 'faq-e6',
    question: 'How do I submit a new hiring requirement?',
    answer: 'You can submit your requirements via the "Request Talent" form on our website or contact our Corporate Client desk directly at business@aranicorporate.com. A dedicated Account Lead will be assigned within 2 hours.',
    category: 'employer'
  }
];

export const PARTNER_LOGOS = [
  { name: 'HDFC Bank', category: 'Banking' },
  { name: 'ICICI Bank', category: 'Banking' },
  { name: 'HSBC Corporate', category: 'Banking' },
  { name: 'Axis Bank', category: 'Banking' },
  { name: 'Kotak Mahindra', category: 'Banking' },
  { name: 'Deloitte', category: 'Consulting' },
  { name: 'PwC India', category: 'Consulting' },
  { name: 'Tata Consultancy', category: 'Enterprise' },
  { name: 'Infosys', category: 'Enterprise' },
  { name: 'Tech Mahindra', category: 'Technology' },
  { name: 'Wipro Limited', category: 'Technology' },
  { name: 'Accenture', category: 'Consulting' }
];
