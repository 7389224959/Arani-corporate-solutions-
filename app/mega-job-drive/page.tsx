import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { MegaJobDriveClient } from './MegaJobDriveClient';
import {
  Briefcase,
  CheckCircle2,
  Calendar,
  MapPin,
  Building2,
  Clock,
  Sparkles,
  Shield,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  Users,
  Video,
  Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mega Hiring Drive 2026 | Aranii Corporate Solutions',
  description:
    'Step Into High-Impact Roles – Join Our Mega Recruitment Drive. Virtual & Spot Interviews across Banking, IT & Corporate domains. 1,500+ vacancies.',
  openGraph: {
    title: 'Mega Hiring Drive 2026 | Aranii Corporate Solutions',
    description: 'Step Into High-Impact Roles – Join Our Mega Recruitment Drive across India.',
    images: ['/mega-drive-banner.png'],
  },
};

const DRIVE_SCHEDULE = {
  date: '20th to 27th Oct 2026',
  mode: 'Virtual & Walk-in Hubs',
  timing: '10:00 AM – 4:00 PM IST',
  locations: 'Mumbai • Bengaluru • Chennai • Pune • Delhi NCR',
};

const VACANCIES = [
  {
    title: 'Relationship Manager (Retail & Corporate Banking)',
    location: 'Mumbai / Bengaluru / Pune',
    exp: '0 - 5 Years',
    salary: '₹4.20 - ₹8.50 LPA',
    type: 'Full-Time',
    category: 'Banking',
  },
  {
    title: 'Credit Analyst & Loan Underwriter',
    location: 'Mumbai / Chennai / Delhi NCR',
    exp: '1 - 6 Years',
    salary: '₹5.50 - ₹12.00 LPA',
    type: 'Full-Time',
    category: 'Finance',
  },
  {
    title: 'Branch Operations Executive & Cashier',
    location: 'All Metro & Tier-1 Hubs',
    exp: '0 - 3 Years',
    salary: '₹3.60 - ₹5.80 LPA',
    type: 'Full-Time',
    category: 'Operations',
  },
  {
    title: 'ITIL Application & Production Support Specialist',
    location: 'Bengaluru / Chennai',
    exp: '2 - 7 Years',
    salary: '₹6.00 - ₹13.50 LPA',
    type: 'Full-Time / Hybrid',
    category: 'Technology',
  },
  {
    title: 'Customer Care & Premier Banking Specialist',
    location: 'Bengaluru / Mumbai / Work-From-Home',
    exp: '0 - 4 Years',
    salary: '₹3.80 - ₹6.20 LPA',
    type: 'Full-Time / Virtual',
    category: 'Customer Experience',
  },
  {
    title: 'Home Loan & Mortgages Sales Lead',
    location: 'Mumbai / Pune / Ahmedabad',
    exp: '1 - 8 Years',
    salary: '₹4.50 - ₹10.50 LPA + Inc.',
    type: 'Full-Time',
    category: 'Sales',
  },
  {
    title: 'Wealth Management & Private Banking Advisor',
    location: 'Mumbai / Bengaluru / Delhi NCR',
    exp: '3 - 10 Years',
    salary: '₹8.00 - ₹18.00 LPA',
    type: 'Full-Time',
    category: 'Wealth',
  },
  {
    title: 'Digital Banking & Fraud Risk Associate',
    location: 'Chennai / Bengaluru / Mumbai',
    exp: '0 - 4 Years',
    salary: '₹4.80 - ₹9.00 LPA',
    type: 'Full-Time',
    category: 'FinTech Risk',
  },
];

const PARTICIPATING_CLIENTS = [
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'IndusInd Bank',
  'Standard Chartered',
  'AU Small Finance Bank',
  'Federal Bank',
  'Bandhan Bank',
  'Bajaj Finserv',
];

const FAQS = [
  {
    q: 'How does the Mega Hiring Drive interview process work?',
    a: 'Once you submit your application form below, our recruitment panel screens your profile within 4 business hours. You receive your interview pass with confirmed video panel / center slot timings, interview link, and recruiter direct contact.',
  },
  {
    q: 'Who is eligible to participate in this hiring drive?',
    a: 'Candidates with undergraduate degrees (10th, 12th, BA, B.Com, B.Sc, B.Tech, BBA) or postgraduate degrees (MBA, M.Com, MCA) from batches 2018 to 2026 are eligible. Both freshers and experienced candidates up to 10+ years can participate.',
  },
  {
    q: 'What are the interview timings and mode?',
    a: 'Interviews are held continuously between 10:00 AM and 4:00 PM IST via scheduled Virtual Zoom/Teams panels and selected Aranii Assessment Hubs. Spot offer letters are issued within 24 to 48 hours to selected candidates.',
  },
  {
    q: 'What documents should candidates keep ready?',
    a: 'Keep an updated PDF resume, government photo ID proof (Aadhaar or PAN Card), and your highest qualification degree / marksheets ready for quick verification.',
  },
];

export default function MegaJobDrivePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#003B71] selection:text-white flex flex-col">
      {/* 1. TOP MINIMAL UTILITY BAR (Movate clean style) */}
      <div className="bg-[#001D3D] text-slate-200 text-xs py-2 px-4 border-b border-[#003566]/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Mega Hiring Drive 2026:</span>
            <span className="text-slate-300">Virtual &amp; Spot Interview Slots Now Open</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-teal-300" /> {DRIVE_SCHEDULE.date}
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-300" /> {DRIVE_SCHEDULE.timing}
            </span>
            <Link
              href="/mega-job-drive/admin"
              className="text-teal-300 hover:text-white underline underline-offset-2 transition"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. CLEAN CORPORATE HEADER */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0" title="Return to Aranii Homepage">
            {/* Aranii Official Logo */}
            <AraniLogo size="sm" showTagline={false} className="shrink-0" />

            {/* Subtle Vertical Hairline Separator */}
            <div className="h-6 w-px bg-slate-300 hidden sm:block" />

            {/* Mega Drive Event Subtitle & Badge */}
            <div className="hidden sm:flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-extrabold text-[#001D3D] tracking-tight group-hover:text-[#00509D] transition">
                  MEGA HIRING DRIVE
                </span>
                <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-teal-200/70">
                  2026
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-tight">
                Official Banking &amp; Corporate Placement Hub
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a
              href="#openings"
              className="hidden md:inline-flex text-xs font-semibold text-slate-600 hover:text-[#003B71] transition"
            >
              Current Openings
            </a>
            <a
              href="#process"
              className="hidden md:inline-flex text-xs font-semibold text-slate-600 hover:text-[#003B71] transition"
            >
              Selection Process
            </a>
            <a
              href="#apply"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#00509D] hover:bg-[#003B71] shadow-sm hover:shadow-md transition gap-1.5 shrink-0"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* 3. MOVATE-STYLE HERO BANNER WITH DEEP BLUE GRADIENT & ROUNDED METRICS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001D3D] via-[#003566] to-[#00509D] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle geometric pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-teal-300 backdrop-blur-xs border border-white/15 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>NATIONWIDE TALENT RECRUITMENT INITIATIVE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Mega Hiring Drive
          </h1>

          {/* Movate Hero Badge Matrix */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-300" />
              <strong>Date:</strong> {DRIVE_SCHEDULE.date}
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <Video className="w-4 h-4 text-sky-300" />
              <strong>Interview mode:</strong> {DRIVE_SCHEDULE.mode}
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-300" />
              <strong>Interview timing:</strong> {DRIVE_SCHEDULE.timing}
            </span>
          </div>

          {/* Subheading in exact Movate style */}
          <div className="max-w-3xl mx-auto space-y-2 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-teal-200">
              Step Into High-Impact Roles – Join Our Mega Recruitment Drive
            </h2>
            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
              Explore the current openings at our Mumbai, Bengaluru, Chennai, and Pune partner banking centers.
              Join premier banking and corporate teams driving growth and modern customer experience.
              Take the next step in your career with us.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#apply"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm bg-white text-[#001D3D] hover:bg-slate-100 transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>Proceed With Application</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#openings"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full font-medium text-sm text-white bg-white/15 hover:bg-white/25 transition border border-white/20 flex items-center justify-center gap-2"
            >
              <span>View Current Openings (8 Roles)</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. CURRENT OPENINGS TABLE (Identical to Movate clean table format) */}
      <section id="openings" className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001D3D]">
            Explore Current Openings &amp; Locations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Click on <strong className="text-[#00509D]">Apply Now</strong> on any role to immediately pre-fill your preferred mandate in the application form below.
          </p>
        </div>

        {/* Movate-Style Clean Structured Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#001D3D] text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6">Job Title</th>
                  <th className="py-4 px-4 sm:px-6">Job Location</th>
                  <th className="py-4 px-4 sm:px-6">Experience &amp; CTC</th>
                  <th className="py-4 px-4 sm:px-6 text-center">Apply Here</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {VACANCIES.map((job, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/80 transition duration-150 group"
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-[#001D3D] group-hover:text-[#00509D] transition">
                        {job.title}
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {job.category} • {job.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-medium text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{job.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-medium">
                      <div className="text-slate-800 font-semibold">{job.salary}</div>
                      <span className="text-[11px] text-slate-500">Exp: {job.exp}</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <a
                        href="#apply"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold text-white bg-[#00509D] hover:bg-[#003B71] transition shadow-xs group-hover:shadow"
                      >
                        Apply Now
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note below table */}
        <p className="text-center text-xs text-slate-500 mt-4 italic">
          *All candidates receive confirmation with their interview slot upon completing registration.
        </p>
      </section>

      {/* 5. PARTICIPATING PARTNERS & TRUST STRIP */}
      <section className="bg-slate-100/80 border-y border-slate-200/80 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
            PARTICIPATING FINANCIAL INSTITUTIONS &amp; CORPORATE PARTNERS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            {PARTICIPATING_CLIENTS.map((bank) => (
              <span
                key={bank}
                className="bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs"
              >
                {bank}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW THE VIRTUAL INTERVIEW PROCESS WORKS (Clean 4-step Cards) */}
      <section id="process" className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-bold font-mono text-[#00509D] uppercase tracking-wider">
            SEAMLESS CANDIDATE JOURNEY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001D3D]">
            How The Selection Process Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A fast, 4-step interview pipeline designed to connect you directly with hiring managers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 relative hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00509D] flex items-center justify-center font-bold font-mono border border-blue-100">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">Apply Online</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fill out your profile, preferred role, and location below to submit your candidacy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 relative hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold font-mono border border-teal-100">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">Slot &amp; Admit Card</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive your confirmed interview schedule, video link, and personalized Admit Pass.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 relative hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold font-mono border border-sky-100">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">Virtual / Walk-in Panel</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Attend your 1-on-1 interview with senior Talent Acquisition heads between 10 AM &amp; 4 PM.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 relative hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold font-mono border border-emerald-100">
              04
            </div>
            <h3 className="text-sm font-bold text-slate-900">Spot Offer Letter</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Successful applicants receive official Letters of Intent with confirmed compensation details.
            </p>
          </div>
        </div>
      </section>

      {/* 7. REGISTRATION SECTION WITH THE CLIENT WIZARD */}
      <section id="apply" className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#00509D] border border-blue-200">
            <FileText className="w-3.5 h-3.5" />
            <span>ONLINE APPLICATION FORM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001D3D]">
            Register For The Mega Hiring Drive
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Complete the form below to lock in your interview slot and generate your candidate Admit Card.
          </p>
        </div>

        {/* Wizard Container with clean corporate border */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-4 sm:p-8">
          <Suspense
            fallback={
              <div className="text-center py-12 text-slate-500 font-mono text-xs">
                Loading Registration Form...
              </div>
            }
          >
            <MegaJobDriveClient />
          </Suspense>
        </div>
      </section>

      {/* 8. FAQ ACCORDION / LIST */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 space-y-1">
          <HelpCircle className="w-7 h-7 text-[#00509D] mx-auto mb-1" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#001D3D]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-600">Quick answers about our mega hiring drive process.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5"
            >
              <h3 className="text-xs sm:text-sm font-bold text-[#001D3D]">{faq.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. MOVATE-STYLE CLEAN CORPORATE FOOTER */}
      <footer className="mt-auto bg-[#001D3D] text-slate-300 py-12 px-4 border-t border-[#003566]">
        <div className="max-w-6xl mx-auto space-y-6 text-center text-xs">
          <div className="flex items-center justify-center gap-2.5 text-white font-extrabold text-base">
            <AraniLogo className="w-6 h-6" />
            <span>Aranii Corporate Solutions Private Limited</span>
          </div>

          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-[11px]">
            Leading recruitment advisory &amp; talent management platform connecting professionals with premier private banks, financial institutions, and enterprise tech corporations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
            <Link href="/mega-job-drive/terms" className="hover:text-white transition">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link href="/mega-job-drive/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/mega-job-drive/refund" className="hover:text-white transition">
              Refund Policy
            </Link>
            <span>•</span>
            <Link href="/mega-job-drive/admin" className="hover:text-white transition">
              Admin Verification Portal
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-white transition">
              Aranii Main Portal
            </Link>
          </div>

          <div className="text-[10px] text-slate-500 pt-4 border-t border-slate-800">
            © {new Date().getFullYear()} Aranii Corporate Solutions Pvt Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
