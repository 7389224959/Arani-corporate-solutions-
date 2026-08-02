'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { SAMPLE_JOBS, SAMPLE_ARTICLES, SAMPLE_TESTIMONIALS, SAMPLE_FAQS, PARTNER_LOGOS, Job, Article, Testimonial, FAQ } from '@/lib/sampleData';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Filter,
  Search,
  ChevronRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  Bell,
  Download,
  Upload,
  Copy,
  Save,
  Phone,
  Mail,
  Globe,
  Calendar,
  DollarSign,
  Check,
  X,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Layers,
  Video,
  Award,
  Star,
  Share2,
  Lock,
  RefreshCw
} from 'lucide-react';

// Admin CMS Types
export interface HeroSlide {
  id: string;
  headline: string;
  highlightText: string;
  subtext: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  audience: 'Seekers' | 'Employers' | 'Both';
  bgImageUrl: string;
  isActive: boolean;
  order: number;
  startDate?: string;
  endDate?: string;
  utmVariant?: string;
}

export interface PromoBannerConfig {
  text: string;
  badgeText: string;
  linkText: string;
  linkUrl: string;
  isActive: boolean;
  expiryDate: string;
  placement: 'TopRibbon' | 'InlineHero' | 'Both';
}

export interface LiveStats {
  placements: string;
  timeToFillDays: number;
  retentionPercent: number;
  partnerCompanies: number;
}

export interface EmployerLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  requiredRole: string;
  headcount: number;
  estimatedValue: string;
  stage: 'New Lead' | 'Contacted' | 'Proposal Sent' | 'Won / Active' | 'Closed';
  source: string;
  utmCampaign?: string;
  notes: string[];
  createdAt: string;
}

export interface CandidateApplicant {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  nationalId: string;
  address: string;
  jobId: string;
  jobTitle: string;
  appliedDate: string;
  stage: 'Applied' | 'Screening' | 'Interview Scheduled' | 'Offer Extended' | 'Hired' | 'Rejected';
  matchScore: string;
  resumeName: string;
  utmSource: string;
  screeningAnswers: { question: string; answer: string }[];
  evaluationNotes: string[];
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'kpi' | 'content' | 'jobs' | 'applicants' | 'crm' | 'users' | 'settings'>('kpi');
  const [contentSubTab, setContentSubTab] = useState<'hero' | 'promo' | 'articles' | 'videos' | 'testimonials' | 'logos' | 'stats' | 'faqs' | 'ticker'>('hero');

  // Search & Global Filter State
  const [globalSearch, setGlobalSearch] = useState('');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Initializing state with defaults or localStorage sync
  const [jobsList, setJobsList] = useState<Job[]>(SAMPLE_JOBS);
  const [articlesList, setArticlesList] = useState<Article[]>(SAMPLE_ARTICLES);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(SAMPLE_TESTIMONIALS);
  const [faqsList, setFaqsList] = useState<FAQ[]>(SAMPLE_FAQS);
  const [partnerLogos, setPartnerLogos] = useState(PARTNER_LOGOS);

  // Hero Banners State
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([
    {
      id: 'HERO-101',
      headline: 'Land the Banking or Corporate Role You Have Trained For',
      highlightText: 'Trained For',
      subtext: 'Direct access to 2,400+ pre-vetted banking, finance, and corporate openings with top-tier firms. 100% free for job seekers.',
      ctaText: 'Search 2,400+ Openings',
      ctaUrl: '/jobs',
      secondaryCtaText: 'Register Profile Free',
      secondaryCtaUrl: '/register',
      audience: 'Seekers',
      bgImageUrl: 'https://picsum.photos/seed/bankinghero/1600/900',
      isActive: true,
      order: 1,
      utmVariant: 'meta_fb_seekers_q3'
    },
    {
      id: 'HERO-102',
      headline: 'Hire the Right Banking & HR Talent in 72 Hours',
      highlightText: '72 Hours',
      subtext: 'End-to-end recruitment, contract staffing, and background verification with a 90-day placement guarantee.',
      ctaText: 'Request Talent Shortlist',
      ctaUrl: '/employers',
      secondaryCtaText: 'Book HR Consultation',
      secondaryCtaUrl: '/employers#consultation',
      audience: 'Employers',
      bgImageUrl: 'https://picsum.photos/seed/corporatehero/1600/900',
      isActive: true,
      order: 2,
      utmVariant: 'meta_b2b_corporate'
    }
  ]);

  // Promo Banner State
  const [promoConfig, setPromoConfig] = useState<PromoBannerConfig>({
    text: 'Banking Hiring Season 2026: 200+ new branch operations & credit analyst openings across major hubs.',
    badgeText: 'URGENT HIRING DRIVE',
    linkText: 'Explore Drive',
    linkUrl: '/jobs?urgent=true',
    isActive: true,
    expiryDate: '2026-08-31',
    placement: 'Both'
  });

  // Live Counter Stats
  const [liveStats, setLiveStats] = useState<LiveStats>({
    placements: '12,000+',
    timeToFillDays: 21,
    retentionPercent: 94,
    partnerCompanies: 350
  });

  // Video Spotlight State
  const [videoSpotlights, setVideoSpotlights] = useState([
    {
      id: 'VID-1',
      title: 'Banking Career Roadmap 2026 Panel Discussion',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/vid1/600/350',
      placement: 'Homepage Insights Section',
      isActive: true
    }
  ]);

  // Openings Ticker Items
  const [tickerItems, setTickerItems] = useState([
    { id: 'TICK-1', label: 'Senior Credit Analyst — Banking — ₹14L–18L — Apply Now', isPinned: true },
    { id: 'TICK-2', label: 'Branch Operations Officer — Delhi NCR — 15 Immediate Openings', isPinned: true },
    { id: 'TICK-3', label: 'Urgent: Wealth Managers needed for Mumbai branch drive — Shortlist in 48h', isPinned: false }
  ]);

  // Applicant Inbox state
  const [applicants, setApplicants] = useState<CandidateApplicant[]>([
    {
      id: 'APP-1001',
      candidateName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      nationalId: 'ABCDE1234F / PAN',
      address: 'Bandram, Mumbai, MH - 400050',
      jobId: 'ACS-8042',
      jobTitle: 'Senior Credit Risk Analyst',
      appliedDate: 'Aug 02, 2026',
      stage: 'Screening',
      matchScore: '92%',
      resumeName: 'Rahul_Sharma_CV.pdf',
      utmSource: 'meta_fb_ads',
      screeningAnswers: [
        { question: 'Do you have CA/MBA Finance qualification?', answer: 'Yes, MBA Finance from NMIMS (2021)' },
        { question: 'Years of commercial banking experience?', answer: '4 years at ICICI Commercial Credit' }
      ],
      evaluationNotes: ['Strong financial modeling credentials', 'Ready for round 1 interview with client lead']
    },
    {
      id: 'APP-1002',
      candidateName: 'Priya Deshmukh',
      email: 'priya.d@example.com',
      phone: '+91 98123 45678',
      nationalId: 'PQRST5678K / PAN',
      address: 'Connaught Place, New Delhi - 110001',
      jobId: 'ACS-8043',
      jobTitle: 'Branch Operations Officer',
      appliedDate: 'Aug 01, 2026',
      stage: 'Interview Scheduled',
      matchScore: '88%',
      resumeName: 'Priya_Deshmukh_Resume.pdf',
      utmSource: 'google_search',
      screeningAnswers: [
        { question: 'Experience in retail branch vault & audit?', answer: '2 years as teller & ops desk at Axis Bank' }
      ],
      evaluationNotes: ['Passed preliminary phone screening', 'Interview scheduled for Aug 5 at 11:00 AM']
    },
    {
      id: 'APP-1003',
      candidateName: 'Amitabh Sen',
      email: 'amitabh.sen@example.com',
      phone: '+91 97777 88888',
      nationalId: 'XYZ1234567 / Passport',
      address: 'Indiranagar, Bengaluru, KA - 560038',
      jobId: 'ACS-8044',
      jobTitle: 'Corporate HR Business Partner',
      appliedDate: 'Jul 30, 2026',
      stage: 'Offer Extended',
      matchScore: '95%',
      resumeName: 'Amitabh_HRBP_Portfolio.pdf',
      utmSource: 'linkedin_direct',
      screeningAnswers: [
        { question: 'Notice period in current company?', answer: '30 Days (Negotiable)' }
      ],
      evaluationNotes: ['Top client score', 'Offer letter dispatched on July 31']
    }
  ]);

  // Employer CRM state
  const [leads, setLeads] = useState<EmployerLead[]>([
    {
      id: 'LEAD-501',
      companyName: 'Kotak Financial Services',
      contactName: 'Vikram Malhotra',
      email: 'vikram.m@kotak.com',
      phone: '+91 98200 11223',
      requiredRole: '15x Branch Operations Officers',
      headcount: 15,
      estimatedValue: '₹4.5L Success Fee',
      stage: 'Proposal Sent',
      source: 'UTM: meta_corporate_hiring',
      notes: ['Requirements document received', 'Submitted SLA proposal on Aug 1'],
      createdAt: 'Aug 01, 2026'
    },
    {
      id: 'LEAD-502',
      companyName: 'HDFC Securities',
      contactName: 'Anand Rathi',
      email: 'anand.rathi@hdfcsec.com',
      phone: '+91 99300 44556',
      requiredRole: '5x Wealth Relationship Managers',
      headcount: 5,
      estimatedValue: '₹3.2L Success Fee',
      stage: 'Contacted',
      source: 'Direct Website Form',
      notes: ['Introductory call completed', 'Scheduling detailed scoping meeting'],
      createdAt: 'Jul 30, 2026'
    },
    {
      id: 'LEAD-503',
      companyName: 'Bajaj Finserv Direct',
      contactName: 'Kavita Menon',
      email: 'kavita.m@bajaj.com',
      phone: '+91 91111 22233',
      requiredRole: '20x KYC & AML Analysts',
      headcount: 20,
      estimatedValue: '₹6.0L Success Fee',
      stage: 'New Lead',
      source: 'UTM: meta_ad_b2b',
      notes: ['Lead submitted from Facebook B2B campaign'],
      createdAt: 'Aug 02, 2026'
    }
  ]);

  // Candidates & Employers User Directory
  const [userAccounts, setUserAccounts] = useState([
    { id: 'USR-201', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', role: 'Candidate', status: 'Active', verified: true, joined: 'Jul 2026' },
    { id: 'USR-202', name: 'Priya Deshmukh', email: 'priya.d@example.com', role: 'Candidate', status: 'Active', verified: true, joined: 'Jul 2026' },
    { id: 'USR-203', name: 'Kotak Financial', email: 'vikram.m@kotak.com', role: 'Employer', status: 'Active', verified: true, joined: 'Jun 2026' },
    { id: 'USR-204', name: 'Sanjay Kapoor', email: 'sanjay.k@example.com', role: 'Candidate', status: 'Suspended', verified: false, joined: 'May 2026' }
  ]);

  // Settings & Audit Log State
  const [siteSettings, setSiteSettings] = useState({
    companyName: 'Arani Corporate Solutions',
    phone: '+91 98765 00000',
    email: 'contact@aranicorporate.com',
    address: 'Suite 402, Financial Centre, BKC, Mumbai - 400051',
    workingHours: 'Sun–Thu 9:00–18:00',
    currency: 'INR (₹)',
    metaPixelId: '123456789098765',
    metaCapiEnabled: true,
    maintenanceMode: false,
    emailTemplateAppReceived: 'Dear {candidate_name}, Your application for {job_title} at Arani Corporate Solutions has been received. Our team will review your profile within 48 hours.',
    emailTemplateInterview: 'Dear {candidate_name}, You have been shortlisted for an interview for {job_title}. Details: {interview_date}.'
  });

  const [auditLogs, setAuditLogs] = useState([
    { timestamp: '14:02:11', user: 'Admin Sunil', action: 'Published job posting ACS-8049', target: 'ACS-8049' },
    { timestamp: '12:45:30', user: 'Recruiter Anjali', action: 'Moved candidate APP-1001 to Interview stage', target: 'APP-1001' },
    { timestamp: '09:15:04', user: 'System', action: 'Meta Pixel Conversions API event synced (Lead ID: LEAD-503)', target: 'CAPI-API' },
    { timestamp: '08:00:12', user: 'Admin Sunil', action: 'Updated Promo Banner urgency configuration', target: 'PROMO-SYS' }
  ]);

  // Modals & Active Inspector Controls
  const [selectedApplicant, setSelectedApplicant] = useState<CandidateApplicant | null>(null);
  const [selectedLead, setSelectedLead] = useState<EmployerLead | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [isAddingHero, setIsAddingHero] = useState(false);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  // Helper trigger notification
  const triggerToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // CSV Export utility
  const exportToCSV = (filename: string, rows: object[]) => {
    if (!rows.length) return;
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = (row as any)[k] === null || (row as any)[k] === undefined ? '' : (row as any)[k];
              cell = cell instanceof Array ? cell.join('; ') : cell.toString();
              cell = cell.replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
              return cell;
            })
            .join(separator);
        })
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Exported ${filename}.csv successfully`);
  };

  return (
    <div className="min-h-screen bg-paper text-ink-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-4 right-4 z-50 bg-teal-600 text-surface px-4 py-3 rounded-lg shadow-xl font-mono text-xs flex items-center gap-2 border border-teal-300 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-teal-200" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-ink-950 text-surface border-b border-ink-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <AraniLogo className="h-8 logo--light" variant="light" />
            </Link>
            <span className="font-mono text-xs font-bold text-teal-400 bg-ink-800 px-2.5 py-0.5 rounded border border-teal-500/30">
              ADMIN CMS &amp; CRM v2.4
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-ink-900 border border-ink-800 rounded px-3 py-1.5 w-72 text-xs">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Quick search jobs, leads, users..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-surface placeholder-slate-400 w-full font-mono"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <div className="hidden sm:flex items-center gap-2 bg-ink-900 px-2.5 py-1 rounded border border-ink-800 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-ok animate-pulse" />
              <span>Meta CAPI: Active</span>
            </div>
            <Link href="/" className="hover:text-teal-400 underline flex items-center gap-1">
              <span>Exit Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Admin Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-surface border border-line rounded-lg p-4 shadow-xs space-y-2">
              <div className="pb-3 border-b border-line mb-3">
                <p className="text-[10px] font-mono text-slate uppercase font-bold tracking-widest">Admin Control Panel</p>
                <h2 className="font-display font-bold text-sm text-ink-900">Arani Operations Hub</h2>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('kpi')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2.5 ${
                    activeTab === 'kpi'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500 shadow-xs'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-teal-600" />
                  KPI &amp; Analytics
                </button>

                <button
                  onClick={() => setActiveTab('content')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-between ${
                    activeTab === 'content'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500 shadow-xs'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-teal-600" />
                    Homepage CMS
                  </span>
                  <span className="bg-teal-100 text-teal-800 text-[10px] px-1.5 py-0.5 rounded">9 Tools</span>
                </button>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-between ${
                    activeTab === 'jobs'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500 shadow-xs'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-teal-600" />
                    Jobs Manager
                  </span>
                  <span className="bg-ink-800 text-surface text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                    {jobsList.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('applicants')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-between ${
                    activeTab === 'applicants'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500 shadow-xs'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-teal-600" />
                    Applicant Inbox
                  </span>
                  <span className="bg-teal-500 text-surface text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {applicants.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('crm')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-between ${
                    activeTab === 'crm'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500 shadow-xs'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    Employer CRM
                  </span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {leads.length} Leads
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2.5 ${
                    activeTab === 'users'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500 shadow-xs'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Users Directory
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2.5 ${
                    activeTab === 'settings'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500 shadow-xs'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <Settings className="w-4 h-4 text-teal-600" />
                  Settings &amp; Audit Log
                </button>
              </nav>
            </div>

            {/* Quick Action Widget */}
            <div className="bg-ink-900 text-surface rounded-lg p-4 border border-ink-800 space-y-3">
              <span className="text-[10px] font-mono text-teal-400 uppercase font-bold tracking-widest block">
                Quick Dispatch
              </span>
              <p className="text-xs text-slate-300">Fast action triggers for recruitment advisors and staff.</p>
              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => {
                    setActiveTab('jobs');
                    setIsAddingJob(true);
                  }}
                  className="w-full text-left px-2.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-surface text-xs font-bold rounded flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Post New Banking Job
                </button>
                <button
                  onClick={() => {
                    setActiveTab('crm');
                    setIsAddingLead(true);
                  }}
                  className="w-full text-left px-2.5 py-1.5 bg-ink-800 hover:bg-ink-700 text-surface text-xs font-bold rounded flex items-center gap-1.5 transition border border-ink-700"
                >
                  <Building2 className="w-3.5 h-3.5 text-teal-400" />
                  Log Employer Lead
                </button>
              </div>
            </div>
          </aside>

          {/* Main Work Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* 1. KPI & ANALYTICS TAB */}
            {activeTab === 'kpi' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-ink-900">Executive Overview &amp; Analytics</h2>
                    <p className="text-xs text-slate mt-0.5">Real-time recruitment pipeline metrics, ad conversion analytics, and system audit logs.</p>
                  </div>
                  <button
                    onClick={() => triggerToast('Analytics refreshed with latest Meta CAPI data.')}
                    className="px-3 py-1.5 bg-surface border border-line hover:bg-paper rounded font-mono text-xs font-bold text-slate flex items-center gap-1.5 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-teal-600" />
                    Refresh Analytics
                  </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs relative overflow-hidden">
                    <span className="text-[10px] font-mono text-muted uppercase font-bold tracking-wider">Applications Today</span>
                    <div className="text-3xl font-display font-bold text-ink-900 mt-1">42</div>
                    <div className="flex items-center gap-1 text-xs text-ok font-mono font-bold mt-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+18% vs yesterday</span>
                    </div>
                    <div className="absolute top-4 right-4 p-2 bg-teal-50 rounded text-teal-700">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs relative overflow-hidden">
                    <span className="text-[10px] font-mono text-muted uppercase font-bold tracking-wider">Active Job Postings</span>
                    <div className="text-3xl font-display font-bold text-teal-600 mt-1">{jobsList.length}</div>
                    <div className="text-xs text-slate font-mono mt-1">
                      <span>8 Urgent • 4 Featured</span>
                    </div>
                    <div className="absolute top-4 right-4 p-2 bg-teal-50 rounded text-teal-700">
                      <Briefcase className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs relative overflow-hidden">
                    <span className="text-[10px] font-mono text-muted uppercase font-bold tracking-wider">Open Employer Leads</span>
                    <div className="text-3xl font-display font-bold text-ink-900 mt-1">{leads.length}</div>
                    <div className="text-xs text-amber-700 font-mono font-bold mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>72h SLA Active</span>
                    </div>
                    <div className="absolute top-4 right-4 p-2 bg-amber-50 rounded text-amber-700">
                      <Building2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs relative overflow-hidden">
                    <span className="text-[10px] font-mono text-muted uppercase font-bold tracking-wider">Meta Ad Conversion</span>
                    <div className="text-3xl font-display font-bold text-ok mt-1">4.8%</div>
                    <div className="text-xs text-slate font-mono mt-1">
                      <span>ROAS 3.4x • CPL ₹42</span>
                    </div>
                    <div className="absolute top-4 right-4 p-2 bg-emerald-50 rounded text-emerald-700">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Interactive 30-Day Application Trend Chart */}
                <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-ink-900">30-Day Application &amp; Lead Conversion Velocity</h3>
                      <p className="text-xs text-slate">Daily candidate submissions across Meta Ads, Google Organic, and Employer Inquiries.</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 bg-teal-500 rounded-xs inline-block" /> Candidates</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 bg-ink-800 rounded-xs inline-block" /> B2B Leads</span>
                    </div>
                  </div>

                  {/* Simulated Bar Chart */}
                  <div className="h-44 pt-6 flex items-end justify-between gap-1 border-b border-line pb-2">
                    {[32, 45, 28, 52, 60, 48, 70, 65, 80, 54, 62, 75, 88, 92, 70, 64, 82, 95, 102, 85, 90, 110, 95, 88, 105, 115, 120, 108, 125, 140].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <div
                          className="w-full bg-teal-500 group-hover:bg-teal-400 rounded-t transition-all"
                          style={{ height: `${(val / 140) * 100}%` }}
                        />
                        {/* Tooltip */}
                        <div className="absolute -top-9 hidden group-hover:flex flex-col items-center z-10 bg-ink-950 text-surface px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap shadow-lg">
                          <span>Day {idx + 1}: {val} apps</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-muted uppercase">
                    <span>30 Days Ago</span>
                    <span>15 Days Ago</span>
                    <span>Today (Aug 2)</span>
                  </div>
                </div>

                {/* Audit & Activity Stream */}
                <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-ink-900">Live Operations Activity Feed</h3>
                    <span className="text-xs font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Real-time Sync Active
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    {auditLogs.map((log, index) => (
                      <div key={index} className="p-3 bg-paper border border-line rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                          <span className="font-bold text-ink-900">{log.action}</span>
                        </div>
                        <div className="text-slate text-[11px] flex items-center gap-3">
                          <span>Target: {log.target}</span>
                          <span>•</span>
                          <span>{log.user}</span>
                          <span>•</span>
                          <span className="text-muted">{log.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. HOMEPAGE CMS MANAGER TAB */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-2xl text-ink-900">Homepage CMS &amp; Content Management</h2>
                  <p className="text-xs text-slate mt-0.5">Directly edit hero slides, urgency promo banners, articles, testimonials, partner logos, and ticker announcements.</p>
                </div>

                {/* Sub-navigation tabs */}
                <div className="flex flex-wrap gap-2 border-b border-line pb-2 text-xs font-mono">
                  {[
                    { id: 'hero', label: 'Hero Banners' },
                    { id: 'promo', label: 'Promo Ribbon' },
                    { id: 'articles', label: 'Articles & News' },
                    { id: 'testimonials', label: 'Testimonials' },
                    { id: 'logos', label: 'Partner Logos' },
                    { id: 'stats', label: 'Live Stats Counters' },
                    { id: 'faqs', label: 'FAQ Manager' },
                    { id: 'ticker', label: 'Openings Ticker' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setContentSubTab(sub.id as any)}
                      className={`px-3 py-1.5 rounded font-bold uppercase transition ${
                        contentSubTab === sub.id
                          ? 'bg-ink-800 text-surface shadow-xs'
                          : 'bg-surface text-slate border border-line hover:bg-paper'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {/* HERO BANNERS TOOL */}
                {contentSubTab === 'hero' && (
                  <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-line">
                      <div>
                        <h3 className="font-display font-bold text-lg text-ink-900">Hero Carousel &amp; A/B Campaign Slides</h3>
                        <p className="text-xs text-slate">Manage hero headlines, background imagery, and campaign UTM variations.</p>
                      </div>
                      <button
                        onClick={() => {
                          const newSlide: HeroSlide = {
                            id: `HERO-${100 + heroSlides.length + 1}`,
                            headline: 'New Campaign Hero Headline for Banking Seekers',
                            highlightText: 'Banking Seekers',
                            subtext: 'Description for campaign slide...',
                            ctaText: 'Explore Roles',
                            ctaUrl: '/jobs',
                            secondaryCtaText: 'Contact Advisor',
                            secondaryCtaUrl: '/contact',
                            audience: 'Seekers',
                            bgImageUrl: 'https://picsum.photos/seed/heronew/1600/900',
                            isActive: true,
                            order: heroSlides.length + 1,
                            utmVariant: 'meta_ad_new_variant'
                          };
                          setHeroSlides([...heroSlides, newSlide]);
                          triggerToast('New Hero Slide added.');
                        }}
                        className="px-3.5 py-2 bg-teal-600 text-surface font-bold text-xs uppercase rounded hover:bg-teal-500 transition flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        Add Hero Slide
                      </button>
                    </div>

                    <div className="space-y-4">
                      {heroSlides.map((slide, idx) => (
                        <div key={slide.id} className="p-4 bg-paper border border-line rounded-lg space-y-3 font-sans">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs font-bold bg-ink-800 text-surface px-2 py-1 rounded">
                                #{slide.order}
                              </span>
                              <div>
                                <span className="font-mono text-[10px] text-teal-700 font-bold uppercase tracking-wider block">
                                  Audience: {slide.audience} • UTM: {slide.utmVariant || 'Default'}
                                </span>
                                <h4 className="font-display font-bold text-base text-ink-900">{slide.headline}</h4>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  const updated = heroSlides.map((s) => (s.id === slide.id ? { ...s, isActive: !s.isActive } : s));
                                  setHeroSlides(updated);
                                }}
                                className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
                                  slide.isActive ? 'bg-ok/10 text-ok border border-ok/30' : 'bg-slate/10 text-slate'
                                }`}
                              >
                                {slide.isActive ? 'Active' : 'Inactive'}
                              </button>

                              <button
                                onClick={() => {
                                  const dup: HeroSlide = {
                                    ...slide,
                                    id: `HERO-AB-${Math.floor(Math.random() * 1000)}`,
                                    headline: `[A/B Variant] ${slide.headline}`,
                                    utmVariant: `variant_ab_${Math.floor(Math.random() * 100)}`
                                  };
                                  setHeroSlides([...heroSlides, dup]);
                                  triggerToast('Duplicated as A/B Campaign Variant');
                                }}
                                className="p-1.5 bg-surface border border-line rounded hover:bg-paper text-slate"
                                title="Duplicate as A/B Variant"
                              >
                                <Copy className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => {
                                  setHeroSlides(heroSlides.filter((s) => s.id !== slide.id));
                                  triggerToast('Hero slide removed');
                                }}
                                className="p-1.5 bg-danger/10 text-danger rounded hover:bg-danger/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-slate">{slide.subtext}</p>

                          <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-2 border-t border-line text-slate">
                            <span>Primary CTA: <strong className="text-teal-700">{slide.ctaText}</strong> ({slide.ctaUrl})</span>
                            <span>Secondary CTA: <strong className="text-ink-800">{slide.secondaryCtaText}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PROMO BANNER RIBBON TOOL */}
                {contentSubTab === 'promo' && (
                  <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                    <div className="pb-4 border-b border-line">
                      <h3 className="font-display font-bold text-lg text-ink-900">Top Urgency Promo Ribbon Editor</h3>
                      <p className="text-xs text-slate">Configure site-wide notification banners for special hiring drives.</p>
                    </div>

                    {/* Banner Live Preview */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase font-bold text-muted">Live Preview:</span>
                      <div className="bg-gradient-to-r from-ink-950 via-ink-900 to-teal-900 text-surface text-xs py-2.5 px-4 rounded border border-teal-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-teal-500 text-ink-950 font-bold font-mono text-[10px] uppercase px-2 py-0.5 rounded">
                            {promoConfig.badgeText}
                          </span>
                          <span>{promoConfig.text}</span>
                        </div>
                        <span className="font-mono text-teal-300 underline font-bold">{promoConfig.linkText} &rarr;</span>
                      </div>
                    </div>

                    {/* Edit Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-mono text-muted uppercase font-bold mb-1">Badge Text</label>
                        <input
                          type="text"
                          value={promoConfig.badgeText}
                          onChange={(e) => setPromoConfig({ ...promoConfig, badgeText: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded font-sans text-ink-900"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-muted uppercase font-bold mb-1">Expiration Date</label>
                        <input
                          type="date"
                          value={promoConfig.expiryDate}
                          onChange={(e) => setPromoConfig({ ...promoConfig, expiryDate: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded font-sans text-ink-900"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block font-mono text-muted uppercase font-bold mb-1">Main Banner Announcement Text</label>
                        <input
                          type="text"
                          value={promoConfig.text}
                          onChange={(e) => setPromoConfig({ ...promoConfig, text: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded font-sans text-ink-900"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-muted uppercase font-bold mb-1">Link Button Label</label>
                        <input
                          type="text"
                          value={promoConfig.linkText}
                          onChange={(e) => setPromoConfig({ ...promoConfig, linkText: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded font-sans text-ink-900"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-muted uppercase font-bold mb-1">Destination URL Target</label>
                        <input
                          type="text"
                          value={promoConfig.linkUrl}
                          onChange={(e) => setPromoConfig({ ...promoConfig, linkUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded font-sans text-ink-900"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => triggerToast('Promo ribbon configuration saved successfully.')}
                        className="px-4 py-2 bg-teal-600 text-surface font-bold text-xs uppercase rounded hover:bg-teal-500 transition flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        Save Promo Ribbon Settings
                      </button>
                    </div>
                  </div>
                )}

                {/* ARTICLES & INSIGHTS TOOL */}
                {contentSubTab === 'articles' && (
                  <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-line">
                      <div>
                        <h3 className="font-display font-bold text-lg text-ink-900">Career Insights &amp; Market Research Articles</h3>
                        <p className="text-xs text-slate">Publish banking guides, HR industry reports, and candidate advice.</p>
                      </div>
                      <button
                        onClick={() => {
                          const newArticle: Article = {
                            id: `art-${articlesList.length + 1}`,
                            title: 'New Banking & Financial Industry Guide',
                            category: 'Article',
                            readTime: '5 min read',
                            date: 'Aug 02, 2026',
                            author: 'Arani Editorial Team',
                            summary: 'Summary of career insight or corporate hiring market trends...',
                            image: 'https://picsum.photos/seed/newart/800/450'
                          };
                          setArticlesList([...articlesList, newArticle]);
                          triggerToast('New article drafted');
                        }}
                        className="px-3.5 py-2 bg-teal-600 text-surface font-bold text-xs uppercase rounded hover:bg-teal-500 transition flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        Draft Article
                      </button>
                    </div>

                    <div className="space-y-3">
                      {articlesList.map((art) => (
                        <div key={art.id} className="p-4 bg-paper border border-line rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
                          <div className="flex items-start gap-3">
                            <img src={art.image} alt="" className="w-16 h-12 rounded object-cover shrink-0" />
                            <div>
                              <div className="flex items-center gap-2 text-xs font-mono">
                                <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">{art.category}</span>
                                <span className="text-muted">{art.date} • {art.readTime}</span>
                              </div>
                              <h4 className="font-display font-bold text-sm text-ink-900 mt-1">{art.title}</h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setArticlesList(articlesList.filter((a) => a.id !== art.id));
                                triggerToast('Article deleted');
                              }}
                              className="p-1.5 bg-danger/10 text-danger rounded hover:bg-danger/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TESTIMONIALS QUEUE TOOL */}
                {contentSubTab === 'testimonials' && (
                  <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-line">
                      <div>
                        <h3 className="font-display font-bold text-lg text-ink-900">Candidate &amp; Employer Testimonials</h3>
                        <p className="text-xs text-slate">Approve, edit, or feature user feedback and success metrics.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {testimonialsList.map((t) => (
                        <div key={t.id} className="p-4 bg-paper border border-line rounded-lg space-y-3 text-xs">
                          <div className="flex items-center gap-3">
                            <img src={t.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <h4 className="font-bold text-ink-900 text-sm">{t.name}</h4>
                              <p className="text-slate">{t.role} • <span className="text-teal-700 font-bold">{t.company}</span></p>
                            </div>
                          </div>
                          <p className="text-slate italic">&ldquo;{t.quote}&rdquo;</p>
                          <div className="flex items-center justify-between pt-2 border-t border-line font-mono text-[11px]">
                            <span className="text-ok font-bold">{t.metric || '5.0 Rating'}</span>
                            <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-bold uppercase">{t.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LIVE STATS COUNTERS TOOL */}
                {contentSubTab === 'stats' && (
                  <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                    <div className="pb-4 border-b border-line">
                      <h3 className="font-display font-bold text-lg text-ink-900">Homepage Counter Metrics Editor</h3>
                      <p className="text-xs text-slate">Update live trust metrics displayed across candidate and employer banners.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <label className="block text-muted uppercase font-bold mb-1">Total Placements Delivered</label>
                        <input
                          type="text"
                          value={liveStats.placements}
                          onChange={(e) => setLiveStats({ ...liveStats, placements: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900 font-sans font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-muted uppercase font-bold mb-1">Avg Time-to-Fill SLA (Days)</label>
                        <input
                          type="number"
                          value={liveStats.timeToFillDays}
                          onChange={(e) => setLiveStats({ ...liveStats, timeToFillDays: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900 font-sans font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-muted uppercase font-bold mb-1">12-Month Retention Rate (%)</label>
                        <input
                          type="number"
                          value={liveStats.retentionPercent}
                          onChange={(e) => setLiveStats({ ...liveStats, retentionPercent: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900 font-sans font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-muted uppercase font-bold mb-1">Partner Enterprise Clients</label>
                        <input
                          type="number"
                          value={liveStats.partnerCompanies}
                          onChange={(e) => setLiveStats({ ...liveStats, partnerCompanies: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900 font-sans font-bold"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => triggerToast('Homepage counters updated.')}
                        className="px-4 py-2 bg-teal-600 text-surface font-bold text-xs uppercase rounded hover:bg-teal-500 transition flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        Update Live Counters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. JOBS MANAGER TAB */}
            {activeTab === 'jobs' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink-900">Job Directory Management</h3>
                    <p className="text-xs text-slate">CRUD operations for banking, finance, and corporate postings.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportToCSV('arani_jobs_directory', jobsList)}
                      className="px-3 py-2 bg-surface border border-line hover:bg-paper text-slate font-mono text-xs font-bold rounded flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4 text-teal-600" />
                      Export Jobs CSV
                    </button>
                    <button
                      onClick={() => setIsAddingJob(true)}
                      className="px-4 py-2 bg-teal-600 text-surface font-bold text-xs uppercase rounded hover:bg-teal-500 transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      Post New Job
                    </button>
                  </div>
                </div>

                {/* Job Listing Table / Ledger */}
                <div className="space-y-3">
                  {jobsList.map((job) => (
                    <div key={job.id} className="p-4 bg-paper border border-line rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-sans">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {job.id}
                          </span>
                          <h4 className="font-display font-bold text-base text-ink-900">{job.title}</h4>
                          <span className="bg-ink-800 text-surface px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                            {job.category}
                          </span>
                          {job.isUrgent && (
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                              Urgent
                            </span>
                          )}
                          {job.isConfidential && (
                            <span className="bg-slate/10 text-slate px-2 py-0.5 rounded text-[10px] font-mono">
                              Confidential Client
                            </span>
                          )}
                        </div>
                        <p className="text-slate">
                          {job.companyName} • {job.location} • <strong className="text-ink-900 font-mono">{job.salary}</strong> • {job.type} ({job.experience})
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingJob(job)}
                          className="px-3 py-1.5 bg-surface border border-line hover:bg-paper rounded font-mono font-bold text-slate flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-teal-600" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            const duplicate: Job = {
                              ...job,
                              id: `ACS-${Math.floor(8000 + Math.random() * 1000)}`,
                              title: `${job.title} (Copy)`,
                              postedDate: 'Just now'
                            };
                            setJobsList([duplicate, ...jobsList]);
                            triggerToast(`Duplicated job as ${duplicate.id}`);
                          }}
                          className="p-1.5 bg-surface border border-line rounded hover:bg-paper text-slate"
                          title="Duplicate Job"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setJobsList(jobsList.filter((j) => j.id !== job.id));
                            triggerToast(`Job ${job.id} removed`);
                          }}
                          className="p-1.5 bg-danger/10 text-danger rounded hover:bg-danger/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. APPLICANT INBOX & PIPELINE TAB */}
            {activeTab === 'applicants' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink-900">Applicant Pipeline Inbox</h3>
                    <p className="text-xs text-slate">Evaluate candidate profiles, review resumes, and move stages.</p>
                  </div>

                  <button
                    onClick={() => exportToCSV('arani_applicants_pipeline', applicants)}
                    className="px-3.5 py-2 bg-surface border border-line hover:bg-paper text-slate font-mono text-xs font-bold rounded flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-teal-600" />
                    Export Applicants CSV
                  </button>
                </div>

                <div className="space-y-4">
                  {applicants.map((app) => (
                    <div key={app.id} className="p-4 bg-paper border border-line rounded-lg space-y-3 font-sans">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-xs">
                              {app.id}
                            </span>
                            <h4 className="font-display font-bold text-base text-ink-900">{app.candidateName}</h4>
                            <span className="bg-ok/10 text-ok px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                              Match: {app.matchScore}
                            </span>
                          </div>
                          <p className="text-xs text-slate mt-0.5">
                            Role: <strong className="text-ink-900">{app.jobTitle}</strong> ({app.jobId}) • Applied: {app.appliedDate}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <select
                            value={app.stage}
                            onChange={(e) => {
                              const newStage = e.target.value as any;
                              setApplicants(applicants.map((a) => (a.id === app.id ? { ...a, stage: newStage } : a)));
                              triggerToast(`Updated ${app.candidateName} stage to ${newStage}`);
                            }}
                            className="px-3 py-1.5 bg-surface border border-line rounded font-mono text-xs text-ink-900 font-bold"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Screening">Screening</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Offer Extended">Offer Extended</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>

                          <button
                            onClick={() => setSelectedApplicant(app)}
                            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-surface rounded text-xs font-bold transition flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Inspect Profile
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between pt-2 border-t border-line text-xs font-mono text-slate">
                        <span>Contact: {app.email} • {app.phone}</span>
                        <span className="text-teal-700 font-bold">Resume File: {app.resumeName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. EMPLOYER CRM TAB */}
            {activeTab === 'crm' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink-900">Employer Lead Pipeline CRM</h3>
                    <p className="text-xs text-slate">Manage corporate recruitment service inquiries and contract staffing proposals.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportToCSV('employer_crm_leads', leads)}
                      className="px-3 py-2 bg-surface border border-line hover:bg-paper text-slate font-mono text-xs font-bold rounded flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4 text-teal-600" />
                      Export CRM CSV
                    </button>
                    <button
                      onClick={() => setIsAddingLead(true)}
                      className="px-4 py-2 bg-teal-600 text-surface font-bold text-xs uppercase rounded hover:bg-teal-500 transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Add Lead
                    </button>
                  </div>
                </div>

                {/* Leads Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="bg-paper border border-line rounded-lg p-4 space-y-3 font-sans relative">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-teal-700">{lead.id}</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-mono font-bold rounded">
                          {lead.stage}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-base text-ink-900">{lead.companyName}</h4>
                        <p className="text-xs text-slate">{lead.contactName} ({lead.email})</p>
                      </div>

                      <div className="p-2 bg-surface border border-line rounded text-xs space-y-1">
                        <p className="font-bold text-ink-900">{lead.requiredRole}</p>
                        <p className="text-teal-700 font-mono font-bold">{lead.estimatedValue}</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-muted pt-1">
                        <span>Source: {lead.source}</span>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="text-teal-700 underline font-bold"
                        >
                          Details &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. USERS DIRECTORY TAB */}
            {activeTab === 'users' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink-900">User Account Directory</h3>
                    <p className="text-xs text-slate">Registered candidate profiles and corporate employer accounts.</p>
                  </div>
                  <button
                    onClick={() => exportToCSV('user_accounts_directory', userAccounts)}
                    className="px-3.5 py-2 bg-surface border border-line hover:bg-paper text-slate font-mono text-xs font-bold rounded flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-teal-600" />
                    Export Users CSV
                  </button>
                </div>

                <div className="space-y-3">
                  {userAccounts.map((user) => (
                    <div key={user.id} className="p-4 bg-paper border border-line rounded-lg flex items-center justify-between gap-4 text-xs font-sans">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-teal-700 font-bold">{user.id}</span>
                          <h4 className="font-bold text-ink-900">{user.name}</h4>
                          <span className="bg-ink-800 text-surface text-[10px] font-mono px-2 py-0.5 rounded">
                            {user.role}
                          </span>
                        </div>
                        <p className="text-slate mt-0.5">{user.email} • Joined: {user.joined}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
                            setUserAccounts(userAccounts.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
                            triggerToast(`User ${user.id} status changed to ${newStatus}`);
                          }}
                          className={`px-3 py-1 rounded font-mono text-xs font-bold ${
                            user.status === 'Active' ? 'bg-ok/10 text-ok' : 'bg-danger/10 text-danger'
                          }`}
                        >
                          {user.status}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. SETTINGS & AUDIT LOG TAB */}
            {activeTab === 'settings' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="pb-4 border-b border-line">
                  <h3 className="font-display font-bold text-xl text-ink-900">System Settings &amp; Ad Tracking Configuration</h3>
                  <p className="text-xs text-slate">Configure Meta Pixel ID, email notification templates, and system parameters.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-sm text-ink-900 font-sans border-b border-line pb-1">Company Contact Info</h4>
                    <div>
                      <label className="block text-muted uppercase font-bold mb-1">Company Name</label>
                      <input
                        type="text"
                        value={siteSettings.companyName}
                        onChange={(e) => setSiteSettings({ ...siteSettings, companyName: e.target.value })}
                        className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-muted uppercase font-bold mb-1">Support Phone Desk</label>
                      <input
                        type="text"
                        value={siteSettings.phone}
                        onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-muted uppercase font-bold mb-1">Working Hours Label</label>
                      <input
                        type="text"
                        value={siteSettings.workingHours}
                        onChange={(e) => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                        className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-sm text-ink-900 font-sans border-b border-line pb-1">Meta Pixel &amp; CAPI Settings</h4>
                    <div>
                      <label className="block text-muted uppercase font-bold mb-1">Meta Pixel ID</label>
                      <input
                        type="text"
                        value={siteSettings.metaPixelId}
                        onChange={(e) => setSiteSettings({ ...siteSettings, metaPixelId: e.target.value })}
                        className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900 font-sans"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="capiCheck"
                        checked={siteSettings.metaCapiEnabled}
                        onChange={(e) => setSiteSettings({ ...siteSettings, metaCapiEnabled: e.target.checked })}
                        className="rounded border-line text-teal-600"
                      />
                      <label htmlFor="capiCheck" className="text-ink-900 font-bold">
                        Enable Conversions API (CAPI) Server-Side Event Sync
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-line flex justify-end">
                  <button
                    onClick={() => triggerToast('System settings saved successfully.')}
                    className="px-5 py-2.5 bg-teal-600 text-surface font-bold text-xs uppercase rounded hover:bg-teal-500 transition flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Save All Settings
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* APPLICANT INSPECTOR MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-lg max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-line pb-3">
              <div>
                <span className="font-mono text-xs text-teal-700 font-bold">{selectedApplicant.id}</span>
                <h3 className="font-display font-bold text-xl text-ink-900">{selectedApplicant.candidateName}</h3>
                <p className="text-xs text-slate">Applying for: {selectedApplicant.jobTitle} ({selectedApplicant.jobId})</p>
              </div>
              <button onClick={() => setSelectedApplicant(null)} className="p-1 hover:bg-paper rounded">
                <X className="w-5 h-5 text-slate" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3 bg-paper border border-line rounded">
                <span className="font-mono text-[10px] text-muted uppercase font-bold block">Contact Details</span>
                <p className="font-bold text-ink-900 mt-1">{selectedApplicant.phone}</p>
                <p className="text-slate">{selectedApplicant.email}</p>
              </div>
              <div className="p-3 bg-paper border border-line rounded">
                <span className="font-mono text-[10px] text-muted uppercase font-bold block">Identity &amp; Address</span>
                <p className="font-bold text-ink-900 mt-1">{selectedApplicant.nationalId}</p>
                <p className="text-slate">{selectedApplicant.address}</p>
              </div>
            </div>

            <div className="p-3 bg-teal-50 border border-teal-200 rounded text-xs space-y-2">
              <h4 className="font-bold text-teal-900 font-display">Screening Questionnaire Responses</h4>
              {selectedApplicant.screeningAnswers.map((ans, idx) => (
                <div key={idx} className="text-slate">
                  <span className="font-bold text-ink-900 block">• {ans.question}</span>
                  <p className="pl-3 text-teal-800">{ans.answer}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  triggerToast(`Resume file ${selectedApplicant.resumeName} downloaded.`);
                }}
                className="px-3.5 py-2 bg-surface border border-line hover:bg-paper text-slate font-mono text-xs font-bold rounded flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-teal-600" />
                Download Resume PDF
              </button>
              <button
                onClick={() => {
                  triggerToast(`Sent Interview Invitation Email to ${selectedApplicant.email}`);
                }}
                className="px-4 py-2 bg-teal-600 text-surface font-bold text-xs uppercase rounded hover:bg-teal-500 transition"
              >
                Send Interview Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW JOB MODAL */}
      {isAddingJob && (
        <div className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-lg max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-display font-bold text-xl text-ink-900">Post New Banking / Corporate Job</h3>
              <button onClick={() => setIsAddingJob(false)} className="p-1 hover:bg-paper rounded">
                <X className="w-5 h-5 text-slate" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const newJob: Job = {
                  id: `ACS-${Math.floor(8000 + Math.random() * 1000)}`,
                  title: (form.elements.namedItem('title') as HTMLInputElement).value,
                  category: (form.elements.namedItem('category') as HTMLSelectElement).value as any,
                  location: (form.elements.namedItem('location') as HTMLInputElement).value,
                  salary: (form.elements.namedItem('salary') as HTMLInputElement).value,
                  type: 'Full-Time',
                  experience: (form.elements.namedItem('experience') as HTMLInputElement).value,
                  postedDate: 'Just now',
                  isUrgent: true,
                  companyName: (form.elements.namedItem('companyName') as HTMLInputElement).value,
                  description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
                  requirements: ['Relevant qualification/experience required'],
                  benefits: ['Competitive compensation', 'Medical cover']
                };
                setJobsList([newJob, ...jobsList]);
                setIsAddingJob(false);
                triggerToast(`Job ${newJob.id} posted successfully.`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-mono text-muted uppercase font-bold mb-1">Job Title</label>
                <input required name="title" type="text" placeholder="e.g. Credit Risk Analyst" className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-muted uppercase font-bold mb-1">Category</label>
                  <select name="category" className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900">
                    <option value="Banking">Banking</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="IT">IT</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-muted uppercase font-bold mb-1">Company Name</label>
                  <input required name="companyName" type="text" placeholder="Tier-1 Bank / Corporate Client" className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-muted uppercase font-bold mb-1">Location</label>
                  <input required name="location" type="text" placeholder="Mumbai / Hybrid" className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900" />
                </div>
                <div>
                  <label className="block font-mono text-muted uppercase font-bold mb-1">Salary Band</label>
                  <input required name="salary" type="text" placeholder="₹12L – ₹16L / yr" className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900" />
                </div>
              </div>

              <div>
                <label className="block font-mono text-muted uppercase font-bold mb-1">Experience Required</label>
                <input required name="experience" type="text" placeholder="2–4 Years" className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900" />
              </div>

              <div>
                <label className="block font-mono text-muted uppercase font-bold mb-1">Job Description</label>
                <textarea required name="description" rows={3} placeholder="Key responsibilities and overview..." className="w-full px-3 py-2 bg-paper border border-line rounded text-ink-900" />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddingJob(false)} className="px-4 py-2 bg-paper border border-line rounded text-slate">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-teal-600 text-surface font-bold uppercase rounded hover:bg-teal-500">
                  Publish Job Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
