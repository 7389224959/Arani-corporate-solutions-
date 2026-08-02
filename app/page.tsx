'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { AraniLogo } from '@/components/AraniLogo';
import { PromoBanner } from '@/components/PromoBanner';
import { JobQuickModal } from '@/components/JobQuickModal';
import { RoleChoiceModal } from '@/components/RoleChoiceModal';
import { SearchOverlay } from '@/components/SearchOverlay';
import {
  SAMPLE_JOBS,
  SAMPLE_ARTICLES,
  SAMPLE_TESTIMONIALS,
  SAMPLE_FAQS,
  PARTNER_LOGOS,
  Job
} from '@/lib/sampleData';
import {
  Search,
  Phone,
  Mail,
  Clock,
  Globe,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  UserCheck,
  Briefcase,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Star,
  Play,
  ChevronDown,
  Menu,
  X,
  Send,
  ArrowUp,
  Sparkles,
  Award,
  Users,
  FileText
} from 'lucide-react';

export default function HomePage() {
  // Navigation & Scroll states
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'seeker' | 'employer'>('seeker');

  // Modals & Overlays
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Audience view toggle in Hero (Seeker vs Employer)
  const [audienceView, setAudienceView] = useState<'seeker' | 'employer'>('seeker');

  // S5 Ledger Filter Category
  const [ledgerCategory, setLedgerCategory] = useState<string>('All');

  // S6 How It Works Tab
  const [howItWorksTab, setHowItWorksTab] = useState<'candidate' | 'employer'>('candidate');

  // S8 Testimonial Tab
  const [proofTab, setProofTab] = useState<'candidate' | 'employer'>('candidate');

  // S11 FAQ Active Tab & Expanded state
  const [faqTab, setFaqTab] = useState<'candidate' | 'employer'>('candidate');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-c1');

  // Search Inputs in Hero
  const [heroSearchKeyword, setHeroSearchKeyword] = useState('');
  const [heroSearchCategory, setHeroSearchCategory] = useState('All');

  // Employer Talent Request Form in Hero / Spotlight
  const [talentRequest, setTalentRequest] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    role: 'Banking Branch Manager',
    headcount: '1-5',
    urgency: 'Within 72 Hours'
  });
  const [talentSubmitted, setTalentSubmitted] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Track header shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };

  const handleRoleSelect = (role: 'candidate' | 'employer') => {
    setRoleModalOpen(false);
    if (role === 'candidate') {
      alert('Redirecting to Candidate Registration & Profile Builder...');
    } else {
      alert('Redirecting to Employer Talent Portal & Requirement Intake...');
    }
  };

  const handleTalentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!talentRequest.company || !talentRequest.email) return;
    setTalentSubmitted(true);
    setTimeout(() => {
      setTalentSubmitted(false);
      setTalentRequest({
        company: '',
        name: '',
        email: '',
        phone: '',
        role: 'Banking Branch Manager',
        headcount: '1-5',
        urgency: 'Within 72 Hours'
      });
    }, 4000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  const filteredJobs = ledgerCategory === 'All'
    ? SAMPLE_JOBS
    : SAMPLE_JOBS.filter((j) => j.category === ledgerCategory);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink-900 font-sans selection:bg-teal-500 selection:text-surface">
      
      {/* SECTION 10 (TOP PROMO BANNER) */}
      <PromoBanner onActionClick={() => setSearchOverlayOpen(true)} />

      {/* GLOBAL UTILITY BAR */}
      <div className="bg-ink-950 text-slate-300 text-[11px] font-mono py-1.5 px-4 border-b border-ink-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-teal-400">
              <Phone className="w-3 h-3" /> +91 (0) 800-ARANI-HR
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-teal-400" /> careers@aranicorporate.com
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-teal-400" /> Sun–Thu 9:00–18:00 IST
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded text-[10px] font-bold">
              FREE FOR CANDIDATES
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-surface">
              <Globe className="w-3 h-3 text-teal-400" /> EN / IN
            </span>
          </div>
        </div>
      </div>

      {/* GLOBAL HEADER */}
      <header
        className={`sticky top-0 z-40 bg-surface border-b border-line transition-all duration-300 ${
          scrolled ? 'py-2.5 shadow-md' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center">
            <AraniLogo size={scrolled ? 'sm' : 'md'} />
          </a>

          {/* Desktop Mega-Menu Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            
            {/* For Job Seekers dropdown tag */}
            <div className="relative group py-2">
              <a href="#jobs-ledger" className="flex items-center gap-1.5 text-ink-900 hover:text-teal-600 transition-colors">
                <span className="bg-teal-100 text-teal-800 font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
                  FOR SEEKERS
                </span>
                Job Opportunities
                <ChevronDown className="w-3.5 h-3.5 text-slate group-hover:rotate-180 transition-transform" />
              </a>
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-surface border border-line rounded-lg shadow-card p-3 space-y-2 text-xs">
                <a href="#jobs-ledger" className="block p-2 hover:bg-teal-50 rounded text-slate hover:text-teal-700 font-semibold">
                  Browse Banking Jobs
                </a>
                <a href="#how-it-works" className="block p-2 hover:bg-teal-50 rounded text-slate hover:text-teal-700 font-semibold">
                  Candidate Verification Steps
                </a>
                <a href="#proof" className="block p-2 hover:bg-teal-50 rounded text-slate hover:text-teal-700 font-semibold">
                  Candidate Success Stories
                </a>
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="w-full text-left p-2 bg-teal-500 text-surface rounded font-bold hover:bg-teal-600 transition"
                >
                  Create Free Profile →
                </button>
              </div>
            </div>

            {/* For Employers dropdown tag */}
            <div className="relative group py-2">
              <a href="#employer-spotlight" className="flex items-center gap-1.5 text-ink-900 hover:text-ink-700 transition-colors">
                <span className="bg-ink-800 text-surface font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
                  FOR EMPLOYERS
                </span>
                HR & Recruitment Services
                <ChevronDown className="w-3.5 h-3.5 text-slate group-hover:rotate-180 transition-transform" />
              </a>
              <div className="absolute top-full left-0 hidden group-hover:block w-72 bg-surface border border-line rounded-lg shadow-card p-3 space-y-2 text-xs">
                <a href="#employer-spotlight" className="block p-2 hover:bg-ink-50 rounded text-slate hover:text-ink-800 font-semibold">
                  End-to-End Recruitment
                </a>
                <a href="#employer-spotlight" className="block p-2 hover:bg-ink-50 rounded text-slate hover:text-ink-800 font-semibold">
                  Contract & Temp Staffing
                </a>
                <a href="#employer-spotlight" className="block p-2 hover:bg-ink-50 rounded text-slate hover:text-ink-800 font-semibold">
                  Background & Verification Services
                </a>
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="w-full text-left p-2 bg-ink-800 text-surface rounded font-bold hover:bg-ink-900 transition"
                >
                  Request Talent Shortlist (72h) →
                </button>
              </div>
            </div>

            <a href="#insights" className="text-slate hover:text-ink-900 transition-colors">
              Insights
            </a>
            <a href="#faq" className="text-slate hover:text-ink-900 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop Right CTA Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOverlayOpen(true)}
              className="p-2 rounded-md hover:bg-paper text-slate hover:text-ink-900 transition"
              aria-label="Search jobs"
            >
              <Search className="w-5 h-5 text-teal-600" />
            </button>
            <button
              onClick={() => setRoleModalOpen(true)}
              className="px-4 py-2 border border-line text-ink-900 font-semibold text-xs rounded hover:bg-paper transition"
            >
              Sign In
            </button>
            <button
              onClick={() => setRoleModalOpen(true)}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-xs rounded shadow-xs transition flex items-center gap-1.5"
            >
              Register
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-ink-900 hover:bg-paper rounded"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface border-b border-line p-4 space-y-4 animate-fadeIn">
            {/* Segmented Tab */}
            <div className="flex bg-paper p-1 rounded border border-line text-xs font-mono">
              <button
                onClick={() => setMobileTab('seeker')}
                className={`flex-1 py-1.5 rounded font-bold transition ${
                  mobileTab === 'seeker' ? 'bg-teal-500 text-surface' : 'text-slate'
                }`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setMobileTab('employer')}
                className={`flex-1 py-1.5 rounded font-bold transition ${
                  mobileTab === 'employer' ? 'bg-ink-800 text-surface' : 'text-slate'
                }`}
              >
                For Employers
              </button>
            </div>

            {mobileTab === 'seeker' ? (
              <div className="space-y-2 text-sm font-medium">
                <a href="#jobs-ledger" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900 border-b border-line">
                  Browse Banking Jobs
                </a>
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900 border-b border-line">
                  How Candidate Placement Works
                </a>
                <a href="#proof" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900">
                  Success Stories
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setRoleModalOpen(true);
                  }}
                  className="w-full mt-2 py-3 bg-teal-500 text-surface font-bold rounded shadow"
                >
                  Create Free Profile
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-sm font-medium">
                <a href="#employer-spotlight" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900 border-b border-line">
                  End-to-End Recruitment
                </a>
                <a href="#employer-spotlight" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900 border-b border-line">
                  Contract Staffing & Payroll
                </a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900">
                  Employer Pricing & 90-Day Guarantee
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setRoleModalOpen(true);
                  }}
                  className="w-full mt-2 py-3 bg-ink-800 text-surface font-bold rounded shadow"
                >
                  Request Talent Shortlist (72h)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sticky Slim CTA Bar on Scroll */}
        {scrolled && (
          <div className="hidden md:block bg-paper border-t border-line py-1.5 px-4 animate-fadeIn">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
              <span className="font-mono text-ink-900 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                2,400+ Open Banking & Corporate Roles Active Right Now
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSearchOverlayOpen(true)}
                  className="text-teal-600 font-bold hover:underline flex items-center gap-1"
                >
                  Quick Search <Search className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="px-3 py-1 bg-ink-800 text-surface font-bold rounded text-[11px] hover:bg-ink-900"
                >
                  Hire Talent in 72h
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* SECTION 1 — HERO SECTION (Asymmetric 55/45 split, Dual Audience Control) */}
      <section className="relative bg-paper blueprint-grid overflow-hidden border-b border-line pt-8 pb-16 md:pt-12 md:pb-24">
        
        {/* Background Rising Bars Motif */}
        <div className="absolute inset-0 rising-bars opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          {/* Audience Segmented Toggle Bar */}
          <div className="mb-8 inline-flex items-center p-1 bg-surface border-2 border-line rounded-lg shadow-xs">
            <button
              onClick={() => setAudienceView('seeker')}
              className={`px-4 py-2 rounded-md font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                audienceView === 'seeker'
                  ? 'bg-teal-500 text-surface shadow-xs'
                  : 'text-slate hover:text-ink-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              I&apos;m Looking for a Job
            </button>
            <button
              onClick={() => setAudienceView('employer')}
              className={`px-4 py-2 rounded-md font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                audienceView === 'employer'
                  ? 'bg-ink-800 text-surface shadow-xs'
                  : 'text-slate hover:text-ink-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              I&apos;m Hiring Talent
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN (55% / 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded">
                <span>{"// RECRUITMENT & HR ADVISORY"}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span>EST. CORPORATE CONSULTANCY</span>
              </div>

              {audienceView === 'seeker' ? (
                <>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-ink-950 leading-[1.1]">
                    Land Your Next Career in <span className="text-teal-500 underline decoration-teal-300 decoration-wavy underline-offset-8">Banking</span> &amp; Enterprise
                  </h1>
                  <p className="text-slate text-base md:text-lg leading-relaxed max-w-xl">
                    Direct candidate placement into tier-1 banks and leading MNCs. Zero registration fees, verified interview schedules, and personalized career consultation.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-ink-950 leading-[1.1]">
                    Engineered Talent for <span className="text-teal-500 underline decoration-teal-300 decoration-wavy underline-offset-8">High-Growth</span> Enterprises
                  </h1>
                  <p className="text-slate text-base md:text-lg leading-relaxed max-w-xl">
                    End-to-end HR services, contract staffing, and pre-verified candidate shortlists delivered in 72 hours. Backed by a 90-day replacement guarantee.
                  </p>
                </>
              )}

              {/* Animated Swoosh Line Motif */}
              <div className="w-48 h-2 bg-gradient-to-r from-teal-500 via-teal-300 to-transparent rounded-full opacity-80 animate-pulse-subtle" />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {audienceView === 'seeker' ? (
                  <>
                    <a
                      href="#jobs-ledger"
                      className="px-6 py-3.5 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-sm rounded shadow-card transition flex items-center gap-2"
                    >
                      Browse 2,400+ Openings
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setRoleModalOpen(true)}
                      className="px-6 py-3.5 bg-surface hover:bg-paper text-ink-900 font-bold text-sm border-2 border-line rounded transition"
                    >
                      Create Free Profile
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="#employer-spotlight"
                      className="px-6 py-3.5 bg-ink-800 hover:bg-ink-900 text-surface font-bold text-sm rounded shadow-card transition flex items-center gap-2"
                    >
                      Request Talent Shortlist
                      <ArrowUpRight className="w-4 h-4 text-teal-400" />
                    </a>
                    <a
                      href="#how-it-works"
                      className="px-6 py-3.5 bg-surface hover:bg-paper text-ink-900 font-bold text-sm border-2 border-line rounded transition"
                    >
                      Explore HR Services
                    </a>
                  </>
                )}
              </div>

              {/* Trust Metrics Badge Row */}
              <div className="pt-6 border-t border-line grid grid-cols-3 gap-4 font-mono text-xs text-slate">
                <div>
                  <span className="block text-xl font-display font-extrabold text-ink-900">4.8 / 5</span>
                  <span className="text-[11px] text-muted">Candidate Rating</span>
                </div>
                <div>
                  <span className="block text-xl font-display font-extrabold text-teal-600">12,000+</span>
                  <span className="text-[11px] text-muted">Placements Made</span>
                </div>
                <div>
                  <span className="block text-xl font-display font-extrabold text-ink-900">350+</span>
                  <span className="text-[11px] text-muted">Partner Banks &amp; MNCs</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (45% / 5 cols) */}
            <div className="lg:col-span-5">
              {audienceView === 'seeker' ? (
                /* LIVE JOB SEARCH CARD FOR SEEKERS */
                <div className="bg-surface border-2 border-line rounded-lg shadow-card p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold uppercase text-teal-600 bg-teal-100 px-2.5 py-1 rounded">
                      {"// Quick Job Search"}
                    </span>
                    <span className="text-xs text-muted font-mono">2,400+ Live Jobs</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-ink-900 mb-4">
                    Find Your Ideal Banking Role
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-slate mb-1">Keywords / Job Title</label>
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate absolute left-3 top-3" />
                        <input
                          type="text"
                          value={heroSearchKeyword}
                          onChange={(e) => setHeroSearchKeyword(e.target.value)}
                          placeholder="e.g. Credit Analyst, Branch Operations"
                          className="w-full pl-9 pr-3 py-2.5 bg-paper border border-line rounded text-sm text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Sector</label>
                        <select
                          value={heroSearchCategory}
                          onChange={(e) => setHeroSearchCategory(e.target.value)}
                          className="w-full px-3 py-2.5 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        >
                          <option value="All">All Sectors</option>
                          <option value="Banking">Banking</option>
                          <option value="Corporate">Corporate</option>
                          <option value="Finance">Finance</option>
                          <option value="Operations">Operations</option>
                          <option value="IT">IT</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Location</label>
                        <select className="w-full px-3 py-2.5 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500">
                          <option value="All">All Cities</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Delhi">Delhi NCR</option>
                          <option value="Bengaluru">Bengaluru</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Chennai">Chennai</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const ledgerEl = document.getElementById('jobs-ledger');
                        if (ledgerEl) ledgerEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-sm rounded shadow transition flex items-center justify-center gap-2 mt-2"
                    >
                      <Search className="w-4 h-4" />
                      Search 2,400+ Openings
                    </button>
                  </div>

                  {/* Popular Keyword Chips */}
                  <div className="mt-4 pt-4 border-t border-line">
                    <span className="text-[11px] font-mono text-muted block mb-2">Popular Searches:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Credit Analyst', 'Branch Officer', 'KYC/AML', 'Relationship Mgr', 'HRBP'].map((chip) => (
                        <button
                          key={chip}
                          onClick={() => setHeroSearchKeyword(chip)}
                          className="text-[11px] bg-paper hover:bg-teal-50 text-slate hover:text-teal-700 border border-line px-2 py-0.5 rounded transition"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                /* REQUEST TALENT MINI-FORM FOR EMPLOYERS */
                <div className="bg-ink-900 text-surface border-2 border-ink-800 rounded-lg shadow-card p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-bl-full pointer-events-none" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold uppercase text-teal-300 bg-ink-800 px-2.5 py-1 rounded">
                      {"// Employer Talent Request"}
                    </span>
                    <span className="text-xs text-teal-400 font-mono">72h SLA Shortlist</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-surface mb-2">
                    Request Vetted Candidates
                  </h3>
                  <p className="text-xs text-slate-300 mb-4">
                    No advance payment. Success-fee model with 90-day replacement guarantee.
                  </p>

                  {!talentSubmitted ? (
                    <form onSubmit={handleTalentSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={talentRequest.company}
                          onChange={(e) => setTalentRequest({ ...talentRequest, company: e.target.value })}
                          placeholder="e.g. Acme Financial Group"
                          className="w-full px-3 py-2 bg-ink-800 border border-ink-700 rounded text-sm text-surface focus:outline-none focus:border-teal-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">Work Email *</label>
                          <input
                            type="email"
                            required
                            value={talentRequest.email}
                            onChange={(e) => setTalentRequest({ ...talentRequest, email: e.target.value })}
                            placeholder="hr@acme.com"
                            className="w-full px-3 py-2 bg-ink-800 border border-ink-700 rounded text-xs text-surface focus:outline-none focus:border-teal-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">Headcount Need</label>
                          <select
                            value={talentRequest.headcount}
                            onChange={(e) => setTalentRequest({ ...talentRequest, headcount: e.target.value })}
                            className="w-full px-3 py-2 bg-ink-800 border border-ink-700 rounded text-xs text-surface focus:outline-none focus:border-teal-400"
                          >
                            <option value="1-5">1 – 5 Positions</option>
                            <option value="6-20">6 – 20 Positions</option>
                            <option value="20+">20+ Bulk Drive</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-sm rounded shadow transition flex items-center justify-center gap-2 mt-2"
                      >
                        <Send className="w-4 h-4" />
                        Get Vetted Shortlist (72 Hours)
                      </button>
                    </form>
                  ) : (
                    <div className="py-8 text-center space-y-2 bg-ink-800/50 rounded border border-teal-500/30 p-4">
                      <CheckCircle2 className="w-8 h-8 text-teal-400 mx-auto" />
                      <h4 className="font-display font-bold text-surface text-lg">Request Received!</h4>
                      <p className="text-xs text-slate-300">
                        Our Senior Corporate Account Lead will contact you at <strong>{talentRequest.email}</strong> within 2 hours.
                      </p>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-ink-800 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    Strict non-disclosure &amp; ISO-compliant data processing.
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2 — LIVE OPENINGS TICKER (Continuous Marquee) */}
      <section className="bg-ink-950 text-surface py-3 border-y border-ink-800 overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="bg-teal-500 text-ink-950 font-mono font-bold text-[10px] uppercase px-3 py-1 shrink-0 z-10 shadow-md">
            {"// LIVE OPENINGS"}
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee flex items-center gap-8">
              {SAMPLE_JOBS.concat(SAMPLE_JOBS).map((job, i) => (
                <div
                  key={`${job.id}-${i}`}
                  onClick={() => setSelectedJob(job)}
                  className="inline-flex items-center gap-2.5 text-xs font-mono cursor-pointer hover:text-teal-300 transition shrink-0 group"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="font-bold text-surface group-hover:underline">{job.title}</span>
                  <span className="text-slate-400">[{job.category}]</span>
                  <span className="text-teal-400 font-bold">{job.salary.split('(')[0]}</span>
                  <span className="text-muted text-[10px]">{job.location}</span>
                  <span className="text-slate-500 font-bold ml-2">Apply →</span>
                  <span className="text-ink-800 ml-4">|</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PARTNER LOGO MARQUEE */}
      <section className="py-8 bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center font-mono text-xs uppercase tracking-widest text-muted mb-6">
            Trusted by Hiring Teams at Leading Financial Institutions &amp; Enterprise Corporations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {PARTNER_LOGOS.map((partner, index) => (
              <div
                key={index}
                className="p-3 bg-paper border border-line rounded flex flex-col items-center justify-center text-center hover:border-teal-500 hover:shadow-xs transition duration-200 group cursor-default"
              >
                <span className="font-display font-bold text-sm text-slate group-hover:text-ink-900 transition-colors">
                  {partner.name}
                </span>
                <span className="font-mono text-[9px] text-muted uppercase tracking-wider mt-0.5">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — THE TWO PATHS ("One firm. Two promises." Asymmetric 60/40) */}
      <section className="py-16 md:py-24 bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase font-bold text-teal-600 tracking-wider block mb-2">
              {"// DUAL AUDIENCE FRAMEWORK"}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-ink-900">
              One Firm. Two Promises.
            </h2>
            <p className="text-slate text-sm mt-2">
              Tailored recruitment pathways engineered specifically for ambitious candidates and growing corporate employers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT PATH: CANDIDATES (60% / 7 cols) */}
            <div className="lg:col-span-7 bg-surface border-2 border-teal-500/40 rounded-lg p-8 shadow-card flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded mb-4">
                  <UserCheck className="w-4 h-4 text-teal-600" />
                  FOR JOB SEEKERS &amp; BANKING PROFESSIONALS
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-ink-900 mb-3">
                  Land the Job You&apos;ve Trained For
                </h3>
                <p className="text-slate text-sm leading-relaxed mb-6">
                  Access non-public banking vacancies, personalized interview coaching, and zero candidate fees.
                </p>

                <ul className="space-y-3 mb-8 text-sm text-ink-800">
                  {[
                    'Direct entry into Tier-1 private & public sector banks',
                    '100% free service with zero hidden placement charges',
                    'Verified interview schedules with corporate decision-makers',
                    'Transparent salary negotiation & uplift guidance'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        ↑
                      </span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-line flex items-center justify-between">
                <span className="font-mono text-xs text-muted">2,400+ Active Roles</span>
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-xs rounded shadow-xs transition flex items-center gap-1.5"
                >
                  Create Free Profile
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RIGHT PATH: EMPLOYERS (40% / 5 cols) */}
            <div className="lg:col-span-5 bg-ink-900 text-surface border-2 border-ink-800 rounded-lg p-8 shadow-card flex flex-col justify-between relative overflow-hidden rising-bars group">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-teal-300 bg-ink-800 px-3 py-1 rounded mb-4">
                  <Building2 className="w-4 h-4 text-teal-400" />
                  FOR EMPLOYERS &amp; HR LEADERS
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-surface mb-3">
                  Hire People Who Stay
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Pre-screened, background-verified candidate pools delivered in 72 hours. Success-based pricing.
                </p>

                <ul className="space-y-3 mb-8 text-sm text-slate-200">
                  {[
                    '72-Hour shortlist delivery SLA',
                    'Strict background & education verification',
                    '90-Day free candidate replacement guarantee',
                    'Contract staffing, executive search & payroll'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-ink-800 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">94% Retention Rate</span>
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="px-6 py-2.5 bg-surface hover:bg-paper text-ink-900 font-bold text-xs rounded shadow-xs transition flex items-center gap-1.5"
                >
                  Request Talent
                  <ArrowUpRight className="w-4 h-4 text-teal-600" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5 — FEATURED JOBS LEDGER (Table-like Ledger Rows) */}
      <section id="jobs-ledger" className="py-16 md:py-24 bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-teal-600 tracking-wider block mb-1">
                {"// LIVE JOB BOARD"}
              </span>
              <h2 className="text-3xl font-display font-bold text-ink-900">
                Featured Openings
              </h2>
              <p className="text-slate text-sm mt-1">
                Filtered, high-priority vacancies updated real-time across banking and enterprise sectors.
              </p>
            </div>

            {/* Filter Category Tabs */}
            <div className="flex flex-wrap gap-1 bg-paper p-1 rounded-lg border border-line text-xs font-mono">
              {['All', 'Banking', 'Corporate', 'Finance', 'Operations', 'IT'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLedgerCategory(cat)}
                  className={`px-3 py-1.5 rounded font-bold transition ${
                    ledgerCategory === cat
                      ? 'bg-teal-500 text-surface shadow-xs'
                      : 'text-slate hover:text-ink-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* LEDGER ROWS TABLE */}
          <div className="border border-line rounded-lg overflow-hidden shadow-card bg-surface">
            
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-paper border-b border-line font-mono text-[11px] text-muted uppercase tracking-wider font-bold">
              <div className="col-span-2">Job ID</div>
              <div className="col-span-4">Role Title &amp; Sector</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Salary Band</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {/* Ledger Rows */}
            <div className="divide-y divide-line">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 items-center hover:bg-teal-50/40 border-l-4 border-l-transparent hover:border-l-teal-500 transition-all group"
                >
                  {/* Job ID & Badges */}
                  <div className="md:col-span-2 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-teal-600 bg-teal-100 px-2 py-0.5 rounded">
                      {job.id}
                    </span>
                    {job.isUrgent && (
                      <span className="bg-danger text-surface text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                        URGENT
                      </span>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="md:col-span-4">
                    <h3
                      onClick={() => setSelectedJob(job)}
                      className="font-display font-bold text-ink-900 text-base group-hover:text-teal-600 transition-colors cursor-pointer"
                    >
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate">
                      <span className="bg-paper border border-line px-2 py-0.5 rounded font-mono text-[10px]">
                        {job.category}
                      </span>
                      <span>{job.companyName}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="md:col-span-2 text-xs text-slate font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{job.location}</span>
                  </div>

                  {/* Salary Band */}
                  <div className="md:col-span-2 text-xs font-mono font-bold text-teal-700">
                    {job.salary.split('(')[0]}
                  </div>

                  {/* Action Button */}
                  <div className="md:col-span-2 text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-4 py-1.5 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-xs rounded transition flex items-center gap-1 ml-auto"
                    >
                      Apply
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer */}
            <div className="p-4 bg-paper border-t border-line text-center">
              <button
                onClick={() => setSearchOverlayOpen(true)}
                className="font-mono text-xs font-bold text-teal-600 hover:text-teal-800 transition inline-flex items-center gap-1"
              >
                View All 2,400+ Active Openings →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6 — HOW IT WORKS (Tabbed Candidates / Employers Horizontal Rail) */}
      <section id="how-it-works" className="py-16 md:py-24 bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-xs uppercase font-bold text-teal-600 tracking-wider block mb-1">
              {"// TRANSPARENT PROCESS"}
            </span>
            <h2 className="text-3xl font-display font-bold text-ink-900">
              How Placement Works
            </h2>
            
            {/* Audience Tab Buttons */}
            <div className="inline-flex bg-surface p-1 rounded-lg border border-line text-xs font-mono mt-4">
              <button
                onClick={() => setHowItWorksTab('candidate')}
                className={`px-4 py-2 rounded font-bold transition ${
                  howItWorksTab === 'candidate'
                    ? 'bg-teal-500 text-surface shadow-xs'
                    : 'text-slate'
                }`}
              >
                For Candidates
              </button>
              <button
                onClick={() => setHowItWorksTab('employer')}
                className={`px-4 py-2 rounded font-bold transition ${
                  howItWorksTab === 'employer'
                    ? 'bg-ink-800 text-surface shadow-xs'
                    : 'text-slate'
                }`}
              >
                For Employers
              </button>
            </div>
          </div>

          {/* 4 Steps Horizontal Rail */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {howItWorksTab === 'candidate' ? (
              <>
                {[
                  { num: '01', title: 'Free Profile Setup', desc: 'Register in 2 minutes. Upload your resume, ID, and career preferences.' },
                  { num: '02', title: 'Verification & Match', desc: 'Our domain advisor reviews your credentials and matches top banking roles.' },
                  { num: '03', title: 'Direct Interviews', desc: 'Receive confirmed interview schedules directly with hiring managers.' },
                  { num: '04', title: 'Guaranteed Offer', desc: 'Secure your appointment letter with salary uplift consultation.' }
                ].map((step, idx) => (
                  <div key={idx} className="bg-surface border border-line rounded-lg p-6 relative shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-2xl font-bold text-teal-500 block mb-3">
                        {step.num}
                      </span>
                      <h3 className="font-display font-bold text-ink-900 text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {[
                  { num: '01', title: 'Requirements Intake', desc: 'Define your headcount, salary band, skill criteria, and urgency SLA.' },
                  { num: '02', title: '72-Hour Shortlist', desc: 'Receive a curated shortlist of pre-screened, background-checked talent.' },
                  { num: '03', title: 'Streamlined Interviews', desc: 'Conduct structured interviews with candidates ready for immediate joining.' },
                  { num: '04', title: 'Placement & 90d Guarantee', desc: 'Hassle-free onboarding backed by our 90-day free replacement policy.' }
                ].map((step, idx) => (
                  <div key={idx} className="bg-ink-900 text-surface border border-ink-800 rounded-lg p-6 relative shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-2xl font-bold text-teal-400 block mb-3">
                        {step.num}
                      </span>
                      <h3 className="font-display font-bold text-surface text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}

          </div>

        </div>
      </section>

      {/* SECTION 7 — EMPLOYER SPOTLIGHT (Ink Band, Animated Counters, Lead Form) */}
      <section id="employer-spotlight" className="py-16 md:py-24 bg-ink-900 text-surface rising-bars border-b border-ink-800">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy & Animated Stat Counters */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs uppercase font-bold text-teal-400 bg-ink-800 px-3 py-1 rounded inline-block">
                {"// ENTERPRISE TALENT ACQUISITION"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-surface leading-tight">
                The HR Department You Don&apos;t Have to Build.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Whether scaling a branch network or filling executive leadership roles, Arani Corporate Solutions provides end-to-end recruitment, contract staffing, and background verification.
              </p>

              {/* Animated Counters Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 font-mono">
                <div className="bg-ink-800 p-4 rounded border border-ink-700">
                  <span className="text-3xl font-display font-bold text-teal-400 block">21 Days</span>
                  <span className="text-xs text-slate-300 uppercase">Avg Time-To-Fill</span>
                </div>
                <div className="bg-ink-800 p-4 rounded border border-ink-700">
                  <span className="text-3xl font-display font-bold text-surface block">94%</span>
                  <span className="text-xs text-slate-300 uppercase">12-Mo Candidate Retention</span>
                </div>
                <div className="bg-ink-800 p-4 rounded border border-ink-700">
                  <span className="text-3xl font-display font-bold text-surface block">350+</span>
                  <span className="text-xs text-slate-300 uppercase">Corporate Partners</span>
                </div>
                <div className="bg-ink-800 p-4 rounded border border-ink-700">
                  <span className="text-3xl font-display font-bold text-teal-400 block">40+</span>
                  <span className="text-xs text-slate-300 uppercase">Sectors Covered</span>
                </div>
              </div>
            </div>

            {/* Right Column: Full "Request Talent" Lead Form */}
            <div className="lg:col-span-6 bg-surface text-ink-900 p-8 rounded-lg shadow-card border border-line">
              <h3 className="text-2xl font-display font-bold mb-2">
                Request Employer Consultation
              </h3>
              <p className="text-slate text-xs mb-6">
                Fill in your recruitment criteria and our Senior Account Manager will call you back within 2 business hours.
              </p>

              <form onSubmit={handleTalentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Bank Corp"
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">HR Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Sanjay Rao"
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="sanjay@acmebank.com"
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate mb-1">Primary Staffing Need</label>
                  <select className="w-full px-3 py-2 bg-paper border border-line rounded text-sm focus:outline-none focus:border-teal-500">
                    <option value="Permanent Recruitment">Permanent Banking Recruitment</option>
                    <option value="Contract Staffing">Contract &amp; Temporary Staffing</option>
                    <option value="Executive Search">Executive Search Leadership</option>
                    <option value="Background Verification">Background &amp; Audit Verification</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-ink-800 hover:bg-ink-900 text-surface font-bold text-sm rounded shadow transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-teal-400" />
                  Submit Request (72h SLA)
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8 — PROOF (Testimonials & Embedded Video Slot) */}
      <section id="proof" className="py-16 md:py-24 bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-teal-600 tracking-wider block mb-1">
                {"// VERIFIED RESULTS"}
              </span>
              <h2 className="text-3xl font-display font-bold text-ink-900">
                Proof of Impact
              </h2>
            </div>

            {/* Testimonial Filter Tabs */}
            <div className="inline-flex bg-paper p-1 rounded-lg border border-line text-xs font-mono mt-4 md:mt-0">
              <button
                onClick={() => setProofTab('candidate')}
                className={`px-4 py-1.5 rounded font-bold transition ${
                  proofTab === 'candidate' ? 'bg-teal-500 text-surface' : 'text-slate'
                }`}
              >
                Candidate Stories
              </button>
              <button
                onClick={() => setProofTab('employer')}
                className={`px-4 py-1.5 rounded font-bold transition ${
                  proofTab === 'employer' ? 'bg-ink-800 text-surface' : 'text-slate'
                }`}
              >
                Employer Endorsements
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {SAMPLE_TESTIMONIALS.filter((t) => t.type === proofTab).map((t) => (
              <div key={t.id} className="bg-paper border border-line rounded-lg p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                      {t.metric}
                    </span>
                    <div className="flex text-warn">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-warn text-warn" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate text-sm italic mb-6 leading-relaxed">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-line">
                  <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden shrink-0 relative">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-ink-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-slate font-mono">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* VIDEO FEATURE SLOT */}
            <div
              onClick={() => setVideoModalOpen(true)}
              className="bg-ink-900 text-surface border border-ink-800 rounded-lg p-6 shadow-xs flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('https://picsum.photos/seed/officevideo/600/400')` }} />
              
              <div className="relative z-10">
                <span className="font-mono text-[10px] uppercase font-bold text-teal-300 bg-ink-800 px-2 py-0.5 rounded">
                  {"// CASE STUDY VIDEO"}
                </span>
                <h3 className="font-display font-bold text-xl text-surface mt-3">
                  How Arani Placed 1,200+ Branch Officers in 2025
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  Watch our documentary on banking workforce expansion across tier-1 and tier-2 cities.
                </p>
              </div>

              <div className="relative z-10 pt-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal-500 text-ink-950 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shadow-md">
                  <Play className="w-5 h-5 fill-ink-950 ml-0.5" />
                </div>
                <span className="font-mono text-xs text-teal-300 font-bold">Watch Video (3:45)</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9 — INSIGHTS & RESOURCES (Editorial Layout) */}
      <section id="insights" className="py-16 md:py-24 bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-teal-600 tracking-wider block mb-1">
                {"// INDUSTRY INTELLIGENCE"}
              </span>
              <h2 className="text-3xl font-display font-bold text-ink-900">
                Career &amp; Hiring Insights
              </h2>
            </div>
            <a href="#insights" className="hidden sm:inline-flex font-mono text-xs font-bold text-teal-600 hover:underline">
              View All Insights →
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* FEATURED LARGE CARD (2 cols on desktop) */}
            <div className="lg:col-span-7 bg-surface border border-line rounded-lg overflow-hidden shadow-card flex flex-col justify-between group">
              <div className="h-64 overflow-hidden relative">
                <Image
                  src={SAMPLE_ARTICLES[0].image}
                  alt={SAMPLE_ARTICLES[0].title}
                  width={800}
                  height={450}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-teal-500 text-surface font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                  {SAMPLE_ARTICLES[0].category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 font-mono text-xs text-muted mb-2">
                  <span>{SAMPLE_ARTICLES[0].date}</span>
                  <span>•</span>
                  <span>{SAMPLE_ARTICLES[0].readTime}</span>
                  <span>•</span>
                  <span className="text-teal-700">{SAMPLE_ARTICLES[0].author}</span>
                </div>

                <h3 className="text-2xl font-display font-bold text-ink-900 group-hover:text-teal-600 transition-colors mb-3">
                  {SAMPLE_ARTICLES[0].title}
                </h3>
                <p className="text-slate text-sm leading-relaxed mb-4">
                  {SAMPLE_ARTICLES[0].summary}
                </p>

                <a href="#insights" className="font-mono text-xs font-bold text-teal-600 hover:underline flex items-center gap-1">
                  Read Full Article <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* STACKED SMALL CARDS (5 cols on desktop) */}
            <div className="lg:col-span-5 space-y-4">
              {SAMPLE_ARTICLES.slice(1).map((art) => (
                <div
                  key={art.id}
                  className="bg-surface border border-line rounded-lg p-4 shadow-xs hover:border-teal-500 transition group flex gap-4 items-center cursor-pointer"
                >
                  <div className="w-24 h-20 rounded bg-slate-200 overflow-hidden shrink-0 relative">
                    <Image src={art.image} alt={art.title} width={200} height={150} className="w-full h-full object-cover group-hover:scale-105 transition" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-muted mb-1">
                      <span className="bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded">
                        {art.category}
                      </span>
                      <span>{art.readTime}</span>
                    </div>
                    <h4 className="font-display font-bold text-ink-900 text-sm group-hover:text-teal-600 transition-colors line-clamp-2">
                      {art.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 11 — FAQ ACCORDION */}
      <section id="faq" className="py-16 md:py-24 bg-surface border-b border-line">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase font-bold text-teal-600 tracking-wider block mb-1">
              {"// GOT QUESTIONS?"}
            </span>
            <h2 className="text-3xl font-display font-bold text-ink-900">
              Frequently Asked Questions
            </h2>

            {/* FAQ Audience Tabs */}
            <div className="inline-flex bg-paper p-1 rounded-lg border border-line text-xs font-mono mt-4">
              <button
                onClick={() => setFaqTab('candidate')}
                className={`px-4 py-1.5 rounded font-bold transition ${
                  faqTab === 'candidate' ? 'bg-teal-500 text-surface' : 'text-slate'
                }`}
              >
                Candidate FAQ
              </button>
              <button
                onClick={() => setFaqTab('employer')}
                className={`px-4 py-1.5 rounded font-bold transition ${
                  faqTab === 'employer' ? 'bg-ink-800 text-surface' : 'text-slate'
                }`}
              >
                Employer FAQ
              </button>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {SAMPLE_FAQS.filter((f) => f.category === faqTab).map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-line rounded-lg overflow-hidden bg-paper transition"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left font-display font-bold text-ink-900 text-base flex items-center justify-between hover:bg-teal-50/50 transition"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-teal-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-slate text-sm leading-relaxed border-t border-line/50 bg-surface">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 12 — FINAL CTA BAND & NEWSLETTER */}
      <section className="bg-ink-900 text-surface border-b border-ink-800 py-16 md:py-20 rising-bars">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Split Reprise CTAs */}
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold text-teal-400 bg-ink-800 px-3 py-1 rounded">
                {"// START WITH ARANI TODAY"}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                Your Next Career or Your Next Hire is 72 Hours Away.
              </h2>
              <p className="text-slate-300 text-sm">
                Join thousands of banking candidates and hundreds of enterprise employers powered by Arani Corporate Solutions.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-sm rounded shadow transition flex items-center gap-2"
                >
                  Candidate Registration
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="px-6 py-3 bg-surface hover:bg-paper text-ink-900 font-bold text-sm rounded shadow transition flex items-center gap-2"
                >
                  Employer Consultation
                  <Building2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Newsletter Subscription Card */}
            <div className="bg-ink-800 border border-ink-700 p-8 rounded-lg">
              <h3 className="font-display font-bold text-xl mb-2">
                Subscribe to Monthly Intelligence
              </h3>
              <p className="text-slate-300 text-xs mb-4">
                Get monthly banking salary benchmarks, regulatory compliance updates, and executive hiring trends.
              </p>

              {!newsletterSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full px-3 py-2.5 bg-ink-900 border border-ink-600 rounded text-xs text-surface focus:outline-none focus:border-teal-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-xs rounded transition shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-teal-500/20 border border-teal-400/40 rounded text-xs text-teal-300 font-mono font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Successfully subscribed! Welcome to Arani Intelligence.
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <footer className="bg-ink-950 text-slate-300 pt-16 pb-8 border-t border-ink-800 text-xs">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-ink-800">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <AraniLogo variant="light" size="md" />
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Arani Corporate Solutions is a premier recruitment consultancy and HR advisory firm connecting talent with leading financial institutions and enterprise corporations.
              </p>
              <div className="font-mono text-[11px] text-teal-400 font-bold tracking-widest">
                TAGLINE: GROW WITH THE OPPORTUNITY
              </div>
            </div>

            {/* Candidate Nav */}
            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-surface mb-3">For Candidates</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#jobs-ledger" className="hover:text-surface transition">Browse Banking Jobs</a></li>
                <li><a href="#how-it-works" className="hover:text-surface transition">Verification Process</a></li>
                <li><a href="#proof" className="hover:text-surface transition">Success Stories</a></li>
                <li><a href="#faq" className="hover:text-surface transition">Candidate FAQ</a></li>
              </ul>
            </div>

            {/* Employer Nav */}
            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-surface mb-3">For Employers</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#employer-spotlight" className="hover:text-surface transition">Request Shortlist (72h)</a></li>
                <li><a href="#employer-spotlight" className="hover:text-surface transition">Contract Staffing</a></li>
                <li><a href="#employer-spotlight" className="hover:text-surface transition">Payroll &amp; Verification</a></li>
                <li><a href="#faq" className="hover:text-surface transition">90-Day Guarantee</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-surface mb-3">Headquarters</h4>
              <p className="text-slate-400 leading-relaxed mb-2">
                Arani Corporate Tower, Corporate District, Financial Hub, India
              </p>
              <p className="font-mono text-teal-400">+91 (0) 800-ARANI-HR</p>
              <p className="font-mono text-slate-400">careers@aranicorporate.com</p>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
            <div>
              © 2026 Arani Corporate Solutions. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
              <a href="#" className="hover:text-slate-300">Candidate Data Consent</a>
              <a href="#" className="hover:text-slate-300">Service Policy</a>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 bg-ink-900 border border-ink-800 rounded text-slate-300 hover:text-surface hover:bg-ink-800 transition flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

        </div>
      </footer>

      {/* MODALS & OVERLAYS */}
      <RoleChoiceModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        onSelectRole={handleRoleSelect}
      />

      <SearchOverlay
        isOpen={searchOverlayOpen}
        onClose={() => setSearchOverlayOpen(false)}
        onSelectJob={handleJobSelect}
      />

      <JobQuickModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApplySuccess={() => {
          alert('Application recorded! Check candidate portal for status updates.');
        }}
      />

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-surface rounded-lg overflow-hidden border border-line shadow-2xl">
            <div className="p-4 bg-ink-900 text-surface flex items-center justify-between">
              <span className="font-mono text-xs text-teal-400 font-bold">
                {"// ARANI DOCUMENTARY MOVIE"}
              </span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded text-slate hover:text-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center text-surface p-6 space-y-3">
                <Play className="w-16 h-16 text-teal-400 mx-auto animate-pulse" />
                <h3 className="font-display font-bold text-xl">
                  Banking Workforce Placement Documentary (2025–2026)
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Demonstrating Arani&apos;s 72-hour shortlist SLA, candidate verification, and branch scaling across tier-1 financial hubs.
                </p>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="px-6 py-2 bg-teal-500 text-surface font-bold text-xs rounded"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
