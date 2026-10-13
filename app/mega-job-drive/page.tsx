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
  Award,
  Users,
  Clock,
  Sparkles,
  Shield,
  ArrowRight,
  TrendingUp,
  FileCheck,
  ChevronDown,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'All India Mega Banking Job Drive 2026 | Aranii Corporate Solutions',
  description:
    'Direct placement drive for 1,500+ vacancies in top Private & PSU Banks. Salaries from ₹3.5 LPA to ₹18 LPA. Same-day interview & spot offer letters. Register online.',
  openGraph: {
    title: 'All India Mega Banking Job Drive 2026 | Aranii Corporate Solutions',
    description: '1,500+ Banking Vacancies. Spot Interviews & Offer Letters. Apply online.',
    images: ['/mega-job-drive-poster.png'],
  },
};

const PARTICIPATING_BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'IndusInd Bank',
  'AU Small Finance Bank',
  'Bandhan Bank',
  'Federal Bank',
  'Standard Chartered',
  'Bajaj Finserv',
];

const JOB_VACANCIES = [
  {
    role: 'Relationship Manager (Retail & Corporate Banking)',
    experience: '0 - 5 Years',
    salary: '₹4.20 - ₹8.50 LPA',
    openings: '380 Vacancies',
    qualification: 'Any Graduate / Post Graduate / MBA',
    description: 'Customer acquisition, portfolio management, CASA, banking products cross-sell & client relationship.',
  },
  {
    role: 'Credit Analyst & Loan Underwriter',
    experience: '1 - 6 Years',
    salary: '₹5.50 - ₹12.00 LPA',
    openings: '210 Vacancies',
    qualification: 'B.Com / MBA Finance / CA / Inter CA / CFA',
    description: 'Financial statement analysis, balance sheet audit, CAM preparation, borrower risk assessment.',
  },
  {
    role: 'Branch Operations Executive & Teller',
    experience: '0 - 3 Years',
    salary: '₹3.60 - ₹5.80 LPA',
    openings: '340 Vacancies',
    qualification: 'Graduates (Any stream) / Final Year Eligible',
    description: 'Branch daily cash handling, customer transactions, KYC compliance, customer servicing.',
  },
  {
    role: 'Home Loan & Mortgages Sales Manager',
    experience: '1 - 8 Years',
    salary: '₹4.50 - ₹10.50 LPA + Incentives',
    openings: '270 Vacancies',
    qualification: 'Graduate / Post Graduate',
    description: 'Builder tie-ups, retail home loans, LAP sourcing, DSA channel partner management.',
  },
  {
    role: 'Wealth Advisory & Premier Banking Manager',
    experience: '3 - 10 Years',
    salary: '₹8.00 - ₹18.00 LPA',
    openings: '120 Vacancies',
    qualification: 'MBA Finance / NISM Certified / CFP',
    description: 'HNI & Ultra-HNI portfolio advisory, mutual funds, PMS, insurance, offshore wealth planning.',
  },
  {
    role: 'Digital Banking & FinTech Risk Associate',
    experience: '0 - 4 Years',
    salary: '₹4.80 - ₹9.00 LPA',
    openings: '180 Vacancies',
    qualification: 'B.Tech / BCA / MCA / B.Sc IT / MBA',
    description: 'Digital payments, fraud monitoring, UPI & gateway operations, card risk compliance.',
  },
];

const FAQS = [
  {
    q: 'Who is eligible to participate in the Mega Job Drive 2026?',
    a: 'Any candidate with a recognized Bachelor degree, Post Graduate degree, MBA, or Professional qualification (CA/CMA) from batches 2018 to 2026 is eligible. Both freshers and experienced banking professionals (up to 10+ years) can register.',
  },
  {
    q: 'How does the selection and spot offer letter process work?',
    a: 'Step 1: Register online and complete application verification. Step 2: Download your official Admit Card with your reporting slot. Step 3: Attend the in-person or scheduled virtual interview panel with participating bank hiring managers. Step 4: Shortlisted candidates receive spot Letter of Intent (LOI) / Offer Letters within 24 to 48 hours.',
  },
  {
    q: 'Why is there a nominal verification fee of ₹499?',
    a: 'The nominal application fee covers personalized profile verification, candidate document credential check, unique Admit Card generation, and prevents frivolous non-serious registrations. It is covered under Aranii Candidate Assurance.',
  },
  {
    q: 'Can candidates from non-finance degrees apply?',
    a: 'Yes! Roles like Relationship Manager, Branch Operations, and Digital Banking welcome graduates from Arts, Science, Commerce, and Engineering streams. Full role training is provided by the hiring banks upon onboarding.',
  },
  {
    q: 'What should I carry on the interview drive day?',
    a: 'Candidates must carry 3 hard copies of their updated Resume, printout of the Aranii Mega Job Drive Admit Card, original Photo ID (Aadhaar or PAN Card), and copies of their highest educational marksheets.',
  },
];

export default function MegaJobDrivePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Announcement Ribbon */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-sky-900 text-teal-200 text-[11px] font-mono py-1.5 px-4 text-center border-b border-teal-700/60 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        <span className="font-bold text-white">OFFICIAL HIRING MANDATE:</span>
        <span>All India Mega Banking Job Drive 2026 • 1,500+ Openings Across Private &amp; PSU Banks</span>
      </div>

      {/* Main Navigation */}
      <nav className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <AraniLogo className="w-7 h-7" />
          <div className="flex flex-col">
            <span className="font-mono text-sm font-extrabold uppercase tracking-wider text-white">
              Aranii <span className="text-teal-400">Corporate Solutions</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Banking Recruitment &amp; Talent Advisory</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/mega-job-drive/admin"
            className="hidden sm:inline-flex text-slate-400 hover:text-white transition px-2.5 py-1.5 rounded"
          >
            Admin Verification
          </Link>
          <a
            href="#register-section"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT BANK PLACEMENT DRIVE 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            All India Mega Banking <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-300">
              Job Drive 2026
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Exclusive multi-bank hiring drive connecting qualified talent with direct employment opportunities in India&apos;s leading Private Banks, PSU Banks, and NBFCs.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Openings</span>
              <span className="text-xl font-bold font-mono text-teal-400">1,500+</span>
              <span className="text-[10px] text-slate-500 block">Across 40+ Cities</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Salary Package</span>
              <span className="text-xl font-bold font-mono text-sky-400">₹3.5 - 18 LPA</span>
              <span className="text-[10px] text-slate-500 block">+ Annual Incentives</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Selection Mode</span>
              <span className="text-xl font-bold font-mono text-amber-400">Spot Offers</span>
              <span className="text-[10px] text-slate-500 block">Same-Day Decisions</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Eligibility</span>
              <span className="text-xl font-bold font-mono text-emerald-400">0 - 10 Yrs</span>
              <span className="text-[10px] text-slate-500 block">Freshers &amp; Exp.</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#register-section"
              className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition shadow-xl shadow-teal-900/30 flex items-center justify-center gap-2"
            >
              <span>Register &amp; Claim Admit Card</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#vacancies-section"
              className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-mono text-sm font-bold transition border border-slate-800 flex items-center justify-center gap-2"
            >
              <span>Explore Roles &amp; Salaries</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Campaign Banner Poster Showcase */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
          <div className="relative aspect-[16/9] w-full bg-slate-900">
            <Image
              src="/mega-job-drive-poster.png"
              alt="Aranii All India Mega Banking Job Drive 2026 Poster"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </div>
      </section>

      {/* PARTICIPATING BANKS MARQUEE */}
      <section className="border-y border-slate-800/80 bg-slate-900/50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-bold">
            PARTICIPATING FINANCIAL INSTITUTIONS &amp; HIRING PARTNERS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
            {PARTICIPATING_BANKS.map((bank) => (
              <div
                key={bank}
                className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-800/80 text-xs sm:text-sm font-bold text-slate-300 font-mono"
              >
                {bank}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTION PROCESS (4 STEPS) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How The Selection Process Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Transparent, SLA-backed hiring pipeline designed to give you direct interview access to decision-makers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold font-mono border border-teal-500/20">
              01
            </div>
            <h3 className="text-base font-bold text-white">Online Registration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submit your academic qualifications, target banking roles, and complete nominal application verification.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold font-mono border border-sky-500/20">
              02
            </div>
            <h3 className="text-base font-bold text-white">Admit Card Issuance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant registration pass generation with Roll Number, interview slot timings, and reporting venue guidelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono border border-amber-500/20">
              03
            </div>
            <h3 className="text-base font-bold text-white">Spot Panel Interview</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Attend your interview panel directly with senior Talent Acquisition heads and Branch Banking Vice Presidents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono border border-emerald-500/20">
              04
            </div>
            <h3 className="text-base font-bold text-white">Spot Offer Letter</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Selected candidates receive instant Letter of Intent with CTC breakdown, joining date, and corporate benefits.
            </p>
          </div>
        </div>
      </section>

      {/* VACANCIES DIRECTORY */}
      <section id="vacancies-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-bold">
            1,500+ DIRECT MANDATES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Vacancies by Banking Domain &amp; CTC
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JOB_VACANCIES.map((job, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 transition space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-bold text-white leading-snug">{job.role}</h3>
                <span className="bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0">
                  {job.openings}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="bg-slate-950 px-2 py-0.5 rounded text-sky-300 font-bold">
                  CTC: {job.salary}
                </span>
                <span className="bg-slate-950 px-2 py-0.5 rounded text-slate-400">
                  Exp: {job.experience}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{job.description}</p>
              <div className="text-[11px] font-mono text-slate-500">
                <span className="text-slate-400 font-bold">Eligibility:</span> {job.qualification}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTRATION WIZARD SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <Suspense fallback={<div className="text-center py-12 text-slate-500 font-mono">Loading Registration Wizard...</div>}>
          <MegaJobDriveClient />
        </Suspense>
      </section>

      {/* FAQS SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <HelpCircle className="w-8 h-8 text-teal-400 mx-auto mb-2" />
          <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-1">Everything you need to know about participating in the job drive.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-white font-sans">{faq.q}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 text-center text-xs font-mono text-slate-500 space-y-3 mt-auto">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
          <AraniLogo className="w-5 h-5" />
          <span>Aranii Corporate Solutions Private Limited</span>
        </div>
        <p>Regd Office: Corporate Financial Hub, BKC Complex, Mumbai, Maharashtra 400051</p>
        <p>WhatsApp Candidate Helpline: +91 98765 43210 • Email: megadrive@aranicorporate.com</p>

        <div className="flex flex-wrap justify-center gap-4 text-[11px] pt-3 text-slate-400">
          <Link href="/mega-job-drive/terms" className="hover:text-teal-400 transition">Terms &amp; Conditions</Link>
          <span>•</span>
          <Link href="/mega-job-drive/privacy" className="hover:text-teal-400 transition">Privacy Policy</Link>
          <span>•</span>
          <Link href="/mega-job-drive/refund" className="hover:text-teal-400 transition">Cancellation &amp; Refund</Link>
          <span>•</span>
          <Link href="/mega-job-drive/admin" className="hover:text-teal-400 transition">Admin Verification Portal</Link>
          <span>•</span>
          <Link href="/" className="hover:text-teal-400 transition">Aranii Main Portal</Link>
        </div>
      </footer>
    </div>
  );
}
