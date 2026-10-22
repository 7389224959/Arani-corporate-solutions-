'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { MegaJobDriveClient } from './MegaJobDriveClient';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Building2,
  Users,
  Video,
  Award,
  HelpCircle,
  FileText,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Laptop,
  Home,
  Check,
  ChevronDown,
  X,
  ExternalLink,
  QrCode,
  Flame,
  BadgeAlert,
  ArrowUpRight,
  ShieldAlert,
  CreditCard,
  Lock
} from 'lucide-react';

// Curated vacancies covering Work From Home, Data Entry, KYC Verification, Freshers, and Enterprise Streams
export const MEGA_DRIVE_VACANCIES = [
  {
    id: 'wfh-1',
    title: 'Work From Home Customer Support & Chat Associate',
    category: 'Work From Home',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    type: 'Full-Time Remote / WFH',
    location: 'Work From Anywhere in India (Laptop or Mobile)',
    salary: '₹24,000 – ₹38,000 / month',
    exp: 'Fresher to 4 Years',
    qualification: '12th Pass / Any Graduate',
    skills: 'Good Hindi / English Communication, Smartphone / PC, Internet',
    openings: '4,200+ Vacancies',
    spotOffer: true,
  },
  {
    id: 'de-1',
    title: 'Data Entry Operator & Back Office Executive',
    category: 'Data Entry',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    type: 'Full-Time / In-Office or WFH',
    location: 'Pan-India / Virtual Hubs / Mumbai / Delhi / Bengaluru',
    salary: '₹22,000 – ₹34,000 / month',
    exp: 'Fresher to 3 Years',
    qualification: '10th Pass / 12th Pass / Any Graduate',
    skills: 'Typing Speed 25-35 WPM, Basic MS Excel, Document Ingestion',
    openings: '3,800+ Vacancies',
    spotOffer: true,
  },
  {
    id: 'kyc-1',
    title: 'KYC & Document Verification Specialist',
    category: 'KYC & Verification',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    type: 'Full-Time (Fintech & Corporate Hubs)',
    location: 'Mumbai / Pune / Delhi NCR / Bengaluru / Virtual Hubs',
    salary: '₹25,000 – ₹40,000 / month',
    exp: '0 to 3 Years (Freshers Welcome)',
    qualification: '12th Pass / Graduate (Any Stream)',
    skills: 'Aadhaar / PAN Ingestion, OCR Verification, Compliance Auditing',
    openings: '3,100+ Vacancies',
    spotOffer: true,
  },
  {
    id: 'fresh-1',
    title: 'Fresher Process Trainee / Customer Care (0 Exp Required)',
    category: 'Freshers',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    type: 'Full-Time Entry-Level',
    location: 'Pan-India Metro & Regional Centers',
    salary: '₹20,000 – ₹32,000 / month',
    exp: '0 Years (Batches 2021 – 2026)',
    qualification: '10th Pass / 12th Pass / Any Graduate',
    skills: 'Willingness to learn, Basic communication, Computer basics',
    openings: '5,500+ Vacancies',
    spotOffer: true,
  },
  {
    id: 'wfh-2',
    title: 'Tele-calling & Digital Advisory Executive (WFH / Hybrid)',
    category: 'Work From Home',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    type: 'Remote / Hybrid (Flexible Shifts)',
    location: 'Virtual / Regional Centers (Home-Based)',
    salary: '₹25,000 – ₹42,000 / month + Incentives',
    exp: '0 to 5 Years',
    qualification: '12th Pass / Any Graduate',
    skills: 'Client Communication, Follow-ups, Basic CRM Software',
    openings: '2,900+ Vacancies',
    spotOffer: true,
  },
  {
    id: 'de-2',
    title: 'Computer Operator & Catalog Indexing Specialist',
    category: 'Data Entry',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    type: 'Full-Time E-Commerce & Back Office',
    location: 'Metro & Tier-2 Hubs (Day Shifts)',
    salary: '₹21,000 – ₹32,000 / month',
    exp: '0 to 2 Years (Freshers Welcome)',
    qualification: '10th / 12th Pass / Graduate',
    skills: 'Keyboard accuracy, MS Word & Excel, Inventory entries',
    openings: '2,400+ Vacancies',
    spotOffer: true,
  },
  {
    id: 'kyc-2',
    title: 'e-KYC Onboarding & Identity Compliance Officer',
    category: 'KYC & Verification',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    type: 'Full-Time Operations',
    location: 'Bengaluru / Hyderabad / Mumbai / Chennai',
    salary: '₹28,000 – ₹45,000 / month',
    exp: '1 to 4 Years',
    qualification: 'Graduate in any discipline',
    skills: 'AML Check, Video-KYC Tools, Customer Due Diligence',
    openings: '1,700+ Vacancies',
    spotOffer: false,
  },
  {
    id: 'fresh-2',
    title: 'Field Operations & Logistics Dispatch Coordinator',
    category: 'Freshers',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    type: 'Full-Time On-Site',
    location: 'All India Logistics Hubs & Warehouses',
    salary: '₹19,000 – ₹28,000 / month',
    exp: '0 to 1 Year (Strictly Freshers Welcome)',
    qualification: '10th Pass / 12th Pass',
    skills: 'Barcode scanning, Dispatch coordination, Smartphone handling',
    openings: '4,800+ Vacancies',
    spotOffer: true,
  },
  {
    id: 'bank-1',
    title: 'Banking Branch Operations Executive & Cashier',
    category: 'Banking',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    type: 'Full-Time Bank Branch',
    location: 'Mumbai / Bengaluru / Chennai / Pune / Delhi / Kolkata',
    salary: '₹3.60 – ₹5.80 LPA (₹30,000 - ₹48,000/mo)',
    exp: '0 to 3 Years',
    qualification: 'Graduate (B.Com / BBA / B.Sc / BA)',
    skills: 'Teller Operations, Customer Service, Cash Management',
    openings: '1,400+ Vacancies',
    spotOffer: true,
  },
  {
    id: 'bank-2',
    title: 'Relationship Manager (Retail & Corporate Banking)',
    category: 'Banking',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    type: 'Full-Time Corporate',
    location: 'Metro & Tier-2 Commercial Hubs',
    salary: '₹4.50 – ₹9.00 LPA',
    exp: '1 to 6 Years',
    qualification: 'Graduate / Post Graduate / MBA',
    skills: 'Portfolio Management, Banking Products, Client Relationship',
    openings: '850+ Vacancies',
    spotOffer: false,
  },
];

const SECTORS_LIST = [
  { name: 'Work From Home (Remote Support)', icon: Home, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { name: 'Data Entry & Back Office', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'KYC & Document Verification', icon: ShieldCheck, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { name: 'Freshers & Entry-Level (0 Exp)', icon: GraduationCap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { name: 'Banking & Financial Services', icon: Building2, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Customer Support & BPO', icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { name: 'IT & Tech Operations', icon: Laptop, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { name: 'Logistics & Supply Chain', icon: Briefcase, color: 'text-rose-400', bg: 'bg-rose-500/10' },
];

const PARTNER_EMPLOYERS = [
  'Amazon Remote Ops',
  'Teleperformance BPO',
  'Concentrix Support',
  'Paytm Fintech KYC',
  'Flipkart Logistics',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Startek Global',
  'Genpact Operations',
  'Wipro ITES',
  'Kotak Mahindra'
];

const VERIFIED_TESTIMONIALS = [
  {
    name: 'Pooja Verma',
    qualification: '12th Pass (2024 Batch)',
    role: 'Work From Home Chat Associate',
    company: 'E-Commerce Enterprise Support',
    salary: '₹32,500 / month',
    quote:
      'I was looking for a genuine Work From Home job without spam. Aranii gave me an official QR-coded Admit Card and scheduled my virtual interview. I work 8 hours from my hometown with full internet allowance and confirmed salary!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
  {
    name: 'Rahul Sen',
    qualification: 'BA Graduate (Fresher - 0 Exp)',
    role: 'Data Entry & KYC Operations',
    company: 'Leading Fintech Partner (Mumbai)',
    salary: '₹28,000 / month',
    quote:
      'As a fresher with no previous experience, I thought getting a corporate job would be impossible. Aranii checked my typing speed, verified my Aadhaar, and got me a spot offer in 48 hours for KYC document verification.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
  {
    name: 'Amitabh Sen',
    qualification: '10th Pass (High School)',
    role: 'Back Office & Computer Operator',
    company: 'National Logistics Hub',
    salary: '₹22,000 / month',
    quote:
      'Aranii is a real registered company in BKC Mumbai. The ₹299 covers real recruiter review and slot booking. My admit pass had my roll number and I was selected on the same day during the virtual interview round.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
];

const FAQS_LIST = [
  {
    q: 'Why does Aranii charge a ₹299 fee? Is this a job scam?',
    a: 'Absolutely NOT. Legitimate recruitment firms never "sell" jobs. The nominal ₹299 is an official Candidate Processing & Admit Pass Fee that covers: (1) Human recruiter ATS profile verification, (2) Unique QR-coded Digital Admit Card generation with Roll Number, (3) Direct slot scheduling on virtual panels / Aranii Hubs, and (4) Interview preparation kits and WhatsApp tracking. Aranii is an MCA-registered corporate entity with physical headquarters in BKC, Mumbai.',
  },
  {
    q: 'Can 10th or 12th pass candidates really get Data Entry or Work From Home jobs?',
    a: 'Yes. Thousands of our back-office, data entry, document scanning, tele-calling, and remote customer chat roles require 10th or 12th pass qualification with basic typing speed (25 to 35 words per minute) and familiarity with smartphones or computers. Full training is provided by employers after selection.',
  },
  {
    q: 'What is the refund policy if my profile is rejected?',
    a: '100% Refund Guarantee. If our recruitment screening panel finds that your documents or age eligibility do not meet the drive requirements during initial verification, your ₹299 fee is promptly refunded back to your original UPI account within 48 business hours.',
  },
  {
    q: 'How and where will the interviews be held?',
    a: 'Interviews are conducted virtually via scheduled 1-on-1 Zoom / Microsoft Teams video panels from the comfort of your home, OR at designated Aranii Corporate Assessment Centers in Mumbai, Delhi NCR, Bengaluru, Chennai, and Pune between 10:00 AM and 4:00 PM IST.',
  },
  {
    q: 'What is the National Career Service (NCS) connection mentioned on the poster?',
    a: 'National Career Service (NCS) is an initiative of the Ministry of Labour & Employment, Government of India. The vacancies participating in this drive are registered under national employment frameworks. Aranii Corporate Solutions is an independent recruitment consultancy facilitating candidate intake, pre-screening, and spot offer placement.',
  },
  {
    q: 'What documents do I need to keep ready for the interview?',
    a: 'Keep an updated PDF resume or bio-data, government photo ID proof (Aadhaar Card or PAN Card), and marksheet/certificate of your highest completed education (10th, 12th, or Degree).',
  },
];

export function MegaJobDriveLandingView() {
  const [activeTab, setActiveTab] = useState<'all' | 'wfh' | 'data-entry' | 'kyc' | 'freshers' | 'banking'>('all');
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const filteredVacancies = MEGA_DRIVE_VACANCIES.filter((job) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'wfh') return job.category === 'Work From Home';
    if (activeTab === 'data-entry') return job.category === 'Data Entry';
    if (activeTab === 'kyc') return job.category === 'KYC & Verification';
    if (activeTab === 'freshers') return job.category === 'Freshers';
    if (activeTab === 'banking') return job.category === 'Banking';
    return true;
  });

  const scrollToApply = (roleName?: string) => {
    const el = document.getElementById('apply-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#001020] text-slate-100 font-sans antialiased selection:bg-teal-500 selection:text-slate-950 pb-20 sm:pb-12">
      {/* 1. TOP MINIMAL GOVT / MCA COMPLIANCE TRUST BAR */}
      <div className="bg-[#000B17] text-slate-300 text-[10px] sm:text-xs py-2 px-3 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-white">Govt Registered CIN:</span>
            <span className="text-teal-300 font-mono">U74999MH2021PTC368924</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">ISO 9001:2015 Certified HR Consultancy</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <a
              href="tel:+918002726447"
              className="hover:text-teal-300 transition flex items-center gap-1 font-mono text-[11px]"
            >
              <Phone className="w-3 h-3 text-teal-400" /> +91 (0) 800-ARANI-HR
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-amber-300 font-mono font-bold">BKC, Mumbai HQ</span>
          </div>
        </div>
      </div>

      {/* 2. CORPORATE HEADER (Aranii Brand Header) */}
      <header className="sticky top-0 z-40 bg-[#001428]/95 backdrop-blur-md border-b border-[#003865] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0" title="Aranii Corporate Solutions">
            <AraniLogo size="sm" showTagline={false} variant="light" className="shrink-0" />
            <div className="h-6 w-px bg-slate-700 hidden sm:block" />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-black tracking-wider text-teal-300 uppercase font-mono">
                MEGA JOB DRIVE 2026
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Candidate Intake &amp; Spot Offers
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => setShowPosterModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Circular</span>
            </button>

            <button
              onClick={() => scrollToApply()}
              className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-teal-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Register Now (₹299)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SHOWCASE SECTION (HIGH CONTRAST, EYE-CATCHING, MATCHING POSTER) */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#003865]">
        {/* Ambient high-energy glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          
          {/* Top Live Urgency Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase bg-red-600/20 text-red-300 border border-red-500/40 shadow-sm animate-pulse">
              <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              ALL INDIA RECRUITMENT DRIVE • 4 DAYS REMAINING
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-teal-500/15 text-teal-300 border border-teal-400/30">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              20TH – 27TH OCTOBER 2026
            </span>
          </div>

          {/* Main Huge 3D Plaque Heading (Exact Match with Poster) */}
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-teal-400 font-bold block">
              NATIONAL EMPLOYMENT PLATFORM INITIATIVE
            </span>

            {/* 10 LAKH+ JOB VACANCIES HERO TITLE */}
            <div className="relative inline-block px-4 py-2 sm:px-8 sm:py-4 rounded-3xl bg-gradient-to-b from-[#002244] via-[#001733] to-[#000F22] border-2 border-amber-400/70 shadow-[0_0_40px_rgba(245,158,11,0.25)]">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
                10 LAKH+
              </div>
              <div className="text-xl sm:text-3xl md:text-4xl font-black tracking-wider text-white uppercase mt-0.5">
                JOB VACANCIES
              </div>
              <div className="mt-1.5 text-[11px] sm:text-xs font-mono text-slate-300 font-semibold tracking-wider">
                LISTED ACROSS NATIONAL CAREER SERVICE (NCS) &amp; BANKING NETWORKS*
              </div>
            </div>

            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto pt-2 leading-relaxed">
              Immediate placement intake for freshers &amp; experienced job-seekers across India. Pre-screened interview calls, verified admit card passes, and direct spot offer letters.
            </p>
          </div>

          {/* 4 COLORED EDUCATION BADGES (Exact Match With Poster) */}
          <div className="pt-2">
            <div className="text-center mb-3">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Freshers + Experienced Candidates Both Eligible
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-3xl mx-auto">
              {/* 10th Pass */}
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/40 text-center shadow-lg hover:border-orange-400 transition">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/30">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-base sm:text-lg font-black text-orange-300 block">10th Pass</span>
                <span className="text-[11px] text-slate-300 font-mono">Matric / High School</span>
              </div>

              {/* 12th Pass */}
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/40 text-center shadow-lg hover:border-purple-400 transition">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 border border-purple-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-base sm:text-lg font-black text-purple-300 block">12th Pass</span>
                <span className="text-[11px] text-slate-300 font-mono">Arts / Sci / Comm</span>
              </div>

              {/* Graduate */}
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/40 text-center shadow-lg hover:border-blue-400 transition">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300 border border-blue-500/30">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-base sm:text-lg font-black text-blue-300 block">Graduate</span>
                <span className="text-[11px] text-slate-300 font-mono">BA / B.Com / B.Sc / Tech</span>
              </div>

              {/* Post Graduate */}
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/40 text-center shadow-lg hover:border-emerald-400 transition">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-base sm:text-lg font-black text-emerald-300 block">Post Graduate</span>
                <span className="text-[11px] text-slate-300 font-mono">MBA / M.Com / MCA</span>
              </div>
            </div>
          </div>

          {/* 4 PRIMARY FOCUS SPECIALIZATIONS (WFH, DATA ENTRY, KYC, FRESHERS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto pt-2">
            
            {/* 1. WORK FROM HOME (EMERALD GLOW) */}
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-emerald-950/90 via-[#064E3B] to-emerald-950/90 border-2 border-emerald-400/60 shadow-xl overflow-hidden group hover:border-emerald-300 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/30 text-emerald-200 flex items-center justify-center shrink-0 border border-emerald-400/40 shadow-inner">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-black text-white flex items-center gap-1.5">
                    Work From Home
                    <span className="bg-emerald-500 text-slate-950 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase">
                      Remote
                    </span>
                  </span>
                  <p className="text-[11px] text-emerald-200 mt-0.5">
                    Chat &amp; Support • Flexible Hours
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-emerald-400/20 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 text-[11px]">4,200+ Openings</span>
                <span className="text-amber-300 font-bold">₹24k – ₹38k/mo</span>
              </div>
            </div>

            {/* 2. DATA ENTRY (PURPLE GLOW) */}
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-950/90 via-[#2E1065] to-purple-950/90 border-2 border-purple-400/60 shadow-xl overflow-hidden group hover:border-purple-300 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/30 text-purple-200 flex items-center justify-center shrink-0 border border-purple-400/40 shadow-inner">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-black text-white flex items-center gap-1.5">
                    Data Entry Jobs
                    <span className="bg-purple-500 text-white text-[9px] font-mono px-1.5 py-0.5 rounded-full uppercase">
                      High Demand
                    </span>
                  </span>
                  <p className="text-[11px] text-purple-200 mt-0.5">
                    25-35 WPM • MS Excel • Back Office
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-purple-400/20 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 text-[11px]">3,800+ Openings</span>
                <span className="text-amber-300 font-bold">₹22k – ₹34k/mo</span>
              </div>
            </div>

            {/* 3. KYC & DOCUMENT VERIFICATION (CYAN GLOW) */}
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-950/90 via-[#0E4A5E] to-cyan-950/90 border-2 border-cyan-400/60 shadow-xl overflow-hidden group hover:border-cyan-300 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/30 text-cyan-200 flex items-center justify-center shrink-0 border border-cyan-400/40 shadow-inner">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-black text-white flex items-center gap-1.5">
                    KYC Verification
                    <span className="bg-cyan-500 text-slate-950 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase">
                      Fintech
                    </span>
                  </span>
                  <p className="text-[11px] text-cyan-200 mt-0.5">
                    Aadhaar/PAN Ingestion &amp; Review
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-cyan-400/20 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 text-[11px]">3,100+ Openings</span>
                <span className="text-amber-300 font-bold">₹25k – ₹40k/mo</span>
              </div>
            </div>

            {/* 4. FRESHERS & TRAINEES (AMBER GLOW) */}
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-amber-950/90 via-[#78350F] to-amber-950/90 border-2 border-amber-400/60 shadow-xl overflow-hidden group hover:border-amber-300 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/30 text-amber-200 flex items-center justify-center shrink-0 border border-amber-400/40 shadow-inner">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-black text-white flex items-center gap-1.5">
                    Freshers (0 Exp)
                    <span className="bg-amber-400 text-slate-950 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase">
                      Spot Offers
                    </span>
                  </span>
                  <p className="text-[11px] text-amber-200 mt-0.5">
                    10th/12th/Grads • Full Training
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-amber-400/20 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 text-[11px]">5,500+ Openings</span>
                <span className="text-amber-300 font-bold">₹20k – ₹32k/mo</span>
              </div>
            </div>

          </div>

          {/* SALARY RANGE & FEE TRUST RIBBON */}
          <div className="max-w-3xl mx-auto rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 border-2 border-amber-400/50 shadow-xl text-center space-y-2">
            <div className="text-xs sm:text-sm font-mono font-extrabold uppercase text-amber-300 tracking-wider">
              OFFICIAL COMPENSATION BAND
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Salary From <span className="text-amber-300">₹35,000</span> to <span className="text-amber-300">₹2.5 Lakhs*</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300">
              *Entry-level &amp; Data Entry freshers start at ₹18,000 – ₹35,000/mo. Mid-level &amp; specialized corporate positions range up to ₹2.5 Lakhs/mo based on role, location &amp; skills.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-slate-950/80 text-white border border-amber-400/40 font-bold">
                ARANII INTAKE &amp; SUPPORT: ONLY ₹299
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 100% Refund Guarantee If Ineligible
              </span>
            </div>
          </div>

          {/* DUAL HERO CTAS */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto">
            <button
              onClick={() => scrollToApply()}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(20,184,166,0.4)] transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>REGISTER NOW &amp; GET ADMIT CARD (₹299)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowPosterModal(true)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-teal-300" />
              <span>View Official Poster Image</span>
            </button>
          </div>

        </div>
      </section>

      {/* 4. "WHY ₹299?" TRANSPARENCY & SCAM-PROOF TRUST ANCHOR */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#001733] to-[#000F22] border-2 border-teal-500/30 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              COMPLETE CANDIDATE TRANSPARENCY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              What Does The ₹299 Candidate Support Fee Cover?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              Aranii is an ISO-certified, MCA-registered recruitment consultancy. We do <strong className="text-white">NOT</strong> sell jobs or guarantee instant employment without an interview. Here is exactly what your nominal ₹299 fee delivers:
            </p>
          </div>

          {/* 4 Concrete Deliverables Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2.5 text-teal-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span>1. Recruiter ATS Profile Verification</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                Human Talent Acquisition managers screen your marksheets, typing credentials, and resume to match exact criteria of participating banks and WFH employers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2.5 text-teal-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span>2. Verified Digital Admit Pass &amp; Roll Number</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                You receive an official, security-stamped digital Admit Card with your unique Roll ID (e.g. <span className="font-mono text-amber-300">MJD-2026-XXXXX</span>) and QR code for venue/Zoom verification.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2.5 text-teal-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span>3. Scheduled 1-on-1 Interview Slot</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                Confirmed slot allocation on scheduled video panels or physical Aranii centers with direct company HR managers, avoiding hours of walk-in queues.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2.5 text-teal-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span>4. Preparation Question Bank &amp; WhatsApp Alerts</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                Direct access to role-specific interview prep kits (Data Entry typing test sample, Banking aptitude questions, WFH guidelines) plus instant WhatsApp/SMS offer updates.
              </p>
            </div>
          </div>

          {/* 100% Refund Guarantee Seal */}
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="font-extrabold text-sm text-emerald-300 block">
                100% Candidate Assurance &amp; Screening Guarantee
              </span>
              <p className="text-xs text-slate-300">
                If our verification panel finds you ineligible during the initial document review, your full ₹299 fee is promptly refunded to your original UPI account within 48 hours without questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTOR MATRIX (MATCHING 7 ICONS ON THE POSTER) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-6 space-y-1">
          <span className="text-xs font-mono font-bold uppercase text-teal-400 tracking-wider">
            HIRING ACROSS ALL MAJOR SECTORS
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Industries Participating in Mega Drive 2026
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SECTORS_LIST.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition flex items-center gap-3 group"
              >
                <div className={`w-9 h-9 rounded-lg ${sec.bg} ${sec.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                  {sec.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CURATED VACANCIES WITH CATEGORY TABS (DATA ENTRY, WFH, BANKING) */}
      <section id="openings" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>LIVE OPENINGS LEDGER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Explore Openings &amp; Select Your Role
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Choose your preferred role to register. Freshers and experienced candidates welcome for all categories.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            All Roles ({MEGA_DRIVE_VACANCIES.length})
          </button>
          <button
            onClick={() => setActiveTab('wfh')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'wfh'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Work From Home</span>
          </button>
          <button
            onClick={() => setActiveTab('data-entry')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'data-entry'
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Data Entry Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('kyc')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'kyc'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KYC &amp; Verification</span>
          </button>
          <button
            onClick={() => setActiveTab('freshers')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'freshers'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-400/30'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Freshers (0 Exp)</span>
          </button>
          <button
            onClick={() => setActiveTab('banking')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'banking'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border border-blue-500/30'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Banking &amp; Corporate</span>
          </button>
        </div>

        {/* Vacancy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVacancies.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-gradient-to-b from-[#001733] to-[#001020] border border-white/10 hover:border-teal-400/50 transition duration-200 shadow-xl space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${job.badgeColor}`}>
                  {job.category}
                </span>

                {job.spotOffer && (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Spot Offers In 48h
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition">
                  {job.title}
                </h3>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                  {job.location}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 block">SALARY</span>
                  <span className="font-extrabold text-amber-300 text-xs sm:text-sm">{job.salary}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 block">ELIGIBILITY</span>
                  <span className="font-bold text-white text-xs truncate block">{job.qualification}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 font-medium">
                <strong className="text-teal-300">Key Skills:</strong> {job.skills}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400">
                  {job.openings}
                </span>

                <button
                  onClick={() => scrollToApply(job.title)}
                  className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-[#001D3D] text-xs font-bold transition flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <span>Apply for this Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. DIGITAL ADMIT CARD SAMPLE PREVIEW (PROOF OF LEGITIMACY) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#001428] via-[#001F3F] to-[#001428] border-2 border-teal-500/40 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
              OFFICIAL CANDIDATE CREDENTIAL
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              What Your Official Admit Pass Looks Like
            </h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              Once registered, your personalized Admit Card is generated instantly with your candidate roll number and QR verification badge.
            </p>
          </div>

          {/* Sample Pass Mockup */}
          <div className="max-w-md mx-auto rounded-2xl bg-white text-slate-900 p-5 shadow-2xl border-4 border-teal-500/60 relative overflow-hidden">
            {/* Header of Pass */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#001D3D] flex items-center justify-center text-teal-300 font-bold text-xs font-mono">
                  AC
                </div>
                <div>
                  <span className="font-black text-xs text-[#001D3D] block uppercase">
                    ARANII CORPORATE SOLUTIONS
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 block">
                    All India Mega Job Drive 2026
                  </span>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-black px-2 py-0.5 rounded border border-emerald-300">
                VERIFIED PASS
              </span>
            </div>

            {/* Candidate Details on Pass */}
            <div className="py-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-mono text-[11px]">Roll Number:</span>
                <span className="font-mono font-extrabold text-[#001D3D] text-sm">MJD-2026-84920</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 font-mono block">Candidate:</span>
                  <span className="font-bold text-slate-800">Pooja Sharma</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block">Selected Mandate:</span>
                  <span className="font-bold text-purple-700">Data Entry / WFH</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block">Reporting Slot:</span>
                  <span className="font-bold text-slate-800">11:30 AM IST (Virtual)</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block">Intake Support:</span>
                  <span className="font-bold text-emerald-700">₹299 Paid &amp; Audited</span>
                </div>
              </div>
            </div>

            {/* Security Barcode & QR Code Foot */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <QrCode className="w-6 h-6 text-slate-800" />
                <span>Scan for Gate / Zoom Verification</span>
              </div>
              <span className="text-slate-400">MCA CIN: U74999MH2021PTC</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. APPLICATION WIZARD SECTION (EMBEDDED MegaJobDriveClient) */}
      <section id="apply-form-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
            <FileText className="w-3.5 h-3.5" />
            <span>ONLINE CANDIDATE REGISTRATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Register for Mega Drive &amp; Generate Admit Pass
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Fill in your authentic academic details below. Once registered, transfer the ₹299 verification fee to receive your confirmed interview slot.
          </p>
        </div>

        {/* Embedded Client Component */}
        <div className="rounded-3xl shadow-2xl border border-[#003865] overflow-hidden">
          <MegaJobDriveClient />
        </div>
      </section>

      {/* 9. REAL CANDIDATE SUCCESS PROOF & PLACEMENTS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-8 space-y-1">
          <span className="text-xs font-mono font-bold uppercase text-teal-400 tracking-wider">
            AUTHENTIC CANDIDATE EXPERIENCES
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Candidates Placed Through Aranii Drives
          </h3>
          <p className="text-xs text-slate-400">
            Verified selections from our previous pan-India hiring rounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VERIFIED_TESTIMONIALS.map((test, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-teal-400/60 shrink-0">
                    <Image
                      src={test.avatar}
                      alt={test.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">{test.name}</span>
                    <span className="text-[11px] font-mono text-teal-300 block">{test.qualification}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 font-semibold">{test.role}</span>
                <span className="text-emerald-300 font-bold">{test.salary}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. PARTICIPATING CORPORATE PARTNERS */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center mb-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
            RECRUITING ENTERPRISES &amp; FINANCIAL INSTITUTIONS
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PARTNER_EMPLOYERS.map((p, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-medium font-mono"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* 11. FAQ ACCORDION (ANSWERING ALL SKEPTICAL QUESTIONS) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-8 space-y-1">
          <HelpCircle className="w-8 h-8 text-teal-400 mx-auto mb-1" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400">Everything you need to know before applying.</p>
        </div>

        <div className="space-y-3">
          {FAQS_LIST.map((faq, idx) => {
            const isOpen = activeFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between hover:bg-white/[0.03] transition gap-3 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-teal-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. STATUTORY DISCLAIMER & CORPORATE FOOTER */}
      <footer className="mt-12 bg-[#000B17] text-slate-400 py-12 px-4 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto space-y-6 text-center">
          <div className="flex items-center justify-center gap-2.5 text-white font-extrabold text-base">
            <AraniLogo size="sm" showTagline={false} variant="light" className="shrink-0" />
          </div>

          <div className="max-w-3xl mx-auto text-[11px] text-slate-400 leading-relaxed space-y-2 bg-white/[0.02] p-4 rounded-xl border border-white/5">
            <p>
              <strong className="text-white">Statutory Disclosure &amp; NCS Initiative Clarification:</strong> National Career Service (NCS) is an initiative of the Ministry of Labour &amp; Employment, Government of India. Aranii Corporate Solutions Private Limited is an independent corporate advisory and HR placement organisation and is not an official representative or governmental agency of NCS or the Government. NCS services are free on government portals. The nominal ₹299 fee is charged exclusively by Aranii Corporate Solutions for its proprietary recruiter document verification, ATS formatting, digital admit card pass, and dedicated slot coordination services.
            </p>
            <p>
              Salary range (₹18,000/mo to ₹2.5 Lakhs/mo) depends strictly on candidate role, employer requirements, qualification, typing speed, and final interview performance. Selection is subject to employer discretion.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
            <Link href="/mega-job-drive/terms" className="hover:text-teal-300 transition">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link href="/mega-job-drive/privacy" className="hover:text-teal-300 transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/mega-job-drive/refund" className="hover:text-teal-300 transition">
              100% Refund Policy
            </Link>
            <span>•</span>
            <Link href="/mega-job-drive/admin" className="hover:text-teal-300 transition">
              Registrar Admin Portal
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-teal-300 transition">
              Aranii Main Portal
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 hover:text-white border border-teal-500/40 text-xs font-mono font-bold transition shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>Admin Login</span>
            </Link>
          </div>

          <div className="text-[10px] text-slate-500 pt-3 border-t border-slate-800">
            Registered Office: Aranii Corporate Towers, BKC Commercial Complex, Bandra Kurla Complex, Mumbai – 400051. CIN: U74999MH2021PTC368924.
            <br />
            © {new Date().getFullYear()} Aranii Corporate Solutions Private Limited. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 13. STICKY MOBILE BOTTOM BAR (HIGH CONVERSION FOR META ADS) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#001428]/95 backdrop-blur-md border-t border-teal-500/40 p-2.5 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-teal-400 font-extrabold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              10 LAKH+ OPENINGS
            </span>
            <span className="text-xs font-black text-white font-mono">
              Fee: <span className="text-amber-300">₹299 Only</span>
            </span>
          </div>

          <button
            onClick={() => scrollToApply()}
            className="flex-1 max-w-[200px] py-2.5 px-4 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 14. POSTER IMAGE LIGHTBOX MODAL */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn">
          <div className="relative max-w-lg w-full bg-slate-950 rounded-3xl border-2 border-teal-500/60 p-4 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-teal-300">
                Official Drive Circular &amp; Poster
              </span>
              <button
                type="button"
                onClick={() => setShowPosterModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden mt-3 bg-black">
              <Image
                src="/mega-drive-banner.png"
                alt="All India Mega Job Drive 2026 Official Circular"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
                priority
              />
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => {
                  setShowPosterModal(false);
                  scrollToApply();
                }}
                className="w-full py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs uppercase transition shadow cursor-pointer"
              >
                Proceed to Online Registration (₹299)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
