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
  DEFAULT_DIRECTOR_DATA,
  DEFAULT_CAROUSEL_SLIDES,
  DirectorData,
  CarouselSlideData,
  Job
} from '@/lib/sampleData';
import {
  Search,
  Phone,
  Mail,
  Clock,
  Globe,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  User,
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
  FileText,
  Check
} from 'lucide-react';

// Hero Carousel Slide Data
const HERO_CAROUSEL_SLIDES = [
  {
    id: 1,
    title: 'Office Reception & Corporate Headquarters',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    badge: 'Trusted Recruitment & Placement Consultancy',
    headline: 'Connecting Talent With Opportunity',
    subheadline: 'Arani Corporate Solutions helps job seekers secure opportunities with leading companies while helping businesses hire qualified professionals across multiple industries.',
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

export default function HomePage() {
  // Navigation & Scroll states
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'seeker' | 'employer'>('seeker');

  // CMS Dynamic State (Loads from localStorage with fallbacks)
  const [directorData, setDirectorData] = useState<DirectorData>(DEFAULT_DIRECTOR_DATA);
  const [heroCarouselSlides, setHeroCarouselSlides] = useState<CarouselSlideData[]>(DEFAULT_CAROUSEL_SLIDES);
  const [jobsList, setJobsList] = useState<Job[]>(SAMPLE_JOBS);
  const [partnerLogosList, setPartnerLogosList] = useState(PARTNER_LOGOS);
  const [testimonialsList, setTestimonialsList] = useState(SAMPLE_TESTIMONIALS);
  const [faqsList, setFaqsList] = useState(SAMPLE_FAQS);
  const [articlesList, setArticlesList] = useState(SAMPLE_ARTICLES);
  const [liveStats, setLiveStats] = useState({
    placements: '12,000+',
    timeToFill: '21 Days',
    retentionRate: '94%',
    partners: '350+'
  });

  // Load CMS data from localStorage on mount & listen to updates from Admin Panel
  useEffect(() => {
    const syncFromCms = () => {
      try {
        const storedDirector = localStorage.getItem('arani_director_data');
        if (storedDirector) setDirectorData(JSON.parse(storedDirector));

        const storedHero = localStorage.getItem('arani_hero_slides');
        if (storedHero) {
          const parsed = JSON.parse(storedHero);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setHeroCarouselSlides(parsed);
          }
        }

        const storedJobs = localStorage.getItem('arani_jobs_list');
        if (storedJobs) {
          const parsed = JSON.parse(storedJobs);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setJobsList(parsed);
          }
        }

        const storedLogos = localStorage.getItem('arani_partner_logos');
        if (storedLogos) setPartnerLogosList(JSON.parse(storedLogos));

        const storedTestimonials = localStorage.getItem('arani_testimonials');
        if (storedTestimonials) setTestimonialsList(JSON.parse(storedTestimonials));

        const storedFaqs = localStorage.getItem('arani_faqs');
        if (storedFaqs) setFaqsList(JSON.parse(storedFaqs));

        const storedArticles = localStorage.getItem('arani_articles');
        if (storedArticles) setArticlesList(JSON.parse(storedArticles));

        const storedStats = localStorage.getItem('arani_live_stats');
        if (storedStats) setLiveStats(JSON.parse(storedStats));
      } catch (err) {
        console.error('Error loading CMS data:', err);
      }
    };

    syncFromCms();

    window.addEventListener('arani_cms_updated', syncFromCms);
    window.addEventListener('storage', syncFromCms);

    return () => {
      window.removeEventListener('arani_cms_updated', syncFromCms);
      window.removeEventListener('storage', syncFromCms);
    };
  }, []);

  // Modals & Overlays
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Audience view selection tab (Looking for a Job vs Hiring Talent)
  const [audienceView, setAudienceView] = useState<'seeker' | 'employer'>('seeker');

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // S5 Ledger Filter Category
  const [ledgerCategory, setLedgerCategory] = useState<string>('All');

  // Partner Logo Filter Category
  const [partnerCategory, setPartnerCategory] = useState<string>('All');

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

  // Employer Talent Request Form
  const [talentRequest, setTalentRequest] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    role: 'Banking Branch Operations',
    headcount: '1-5',
    urgency: 'Within 72 Hours'
  });
  const [talentSubmitted, setTalentSubmitted] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Auto rotate carousel every 5 seconds
  useEffect(() => {
    if (isCarouselPaused || !heroCarouselSlides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroCarouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isCarouselPaused, heroCarouselSlides.length]);

  // Track header shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextSlide = () => {
    if (!heroCarouselSlides.length) return;
    setCurrentSlide((prev) => (prev + 1) % heroCarouselSlides.length);
  };

  const handlePrevSlide = () => {
    if (!heroCarouselSlides.length) return;
    setCurrentSlide((prev) => (prev - 1 + heroCarouselSlides.length) % heroCarouselSlides.length);
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
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
        role: 'Banking Branch Operations',
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
    ? jobsList
    : jobsList.filter((j) => j.category === ledgerCategory);

  const filteredPartners = partnerCategory === 'All'
    ? partnerLogosList
    : partnerLogosList.filter((p) => p.category.toLowerCase().includes(partnerCategory.toLowerCase()));

  const activeSlideData = heroCarouselSlides[currentSlide] || heroCarouselSlides[0];

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink-900 font-sans selection:bg-teal-500 selection:text-surface">
      
      {/* TOP PROMO BANNER */}
      <PromoBanner onActionClick={() => setSearchOverlayOpen(true)} />

      {/* GLOBAL UTILITY BAR */}
      <div className="bg-ink-950 text-slate-300 text-[11px] font-mono py-1.5 px-3 md:px-4 border-b border-ink-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left contact details */}
          <div className="flex items-center gap-3 min-w-0 shrink">
            <a href="tel:+918002726447" className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-semibold shrink-0">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">+91 (0) 800-ARANI-HR</span>
              <span className="sm:hidden text-[10px]">Call Us</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5 truncate">
              <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" /> careers@aranicorporate.com
            </span>
            <span className="hidden md:flex items-center gap-1.5 shrink-0">
              <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" /> Mon–Sat 9:00–18:00 IST
            </span>
          </div>

          {/* Right badges & links */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-[10px] sm:text-[11px]">
            <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-bold whitespace-nowrap">
              FREE FOR CANDIDATES
            </span>
            <a
              href="/admin"
              className="text-teal-400 hover:text-surface font-bold underline flex items-center gap-1 whitespace-nowrap"
            >
              <span>Staff Portal</span>
            </a>
            <span className="hidden xs:flex items-center gap-1 cursor-pointer hover:text-surface whitespace-nowrap">
              <Globe className="w-3.5 h-3.5 text-teal-400 shrink-0" /> EN / IN
            </span>
          </div>
        </div>
      </div>

      {/* GLOBAL HEADER */}
      <header
        className={`sticky top-0 z-40 bg-surface border-b border-line transition-all duration-300 ${
          scrolled ? 'py-2.5 shadow-md' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo with tagline below */}
          <a href="#" className="flex items-center">
            <AraniLogo
              size={scrolled ? 'sm' : 'md'}
              headerTagline="Recruitment | Staffing | HR Solutions"
            />
          </a>

          {/* Desktop Mega-Menu Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            
            <a href="#hero-section" className="text-slate hover:text-teal-600 transition-colors font-semibold">
              Home
            </a>

            {/* For Job Seekers dropdown */}
            <div className="relative group py-2">
              <a href="#jobs-ledger" className="flex items-center gap-1.5 text-ink-900 hover:text-teal-600 transition-colors font-semibold">
                <span className="bg-teal-100 text-teal-800 font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
                  SEEKERS
                </span>
                Job Placement
                <ChevronDown className="w-3.5 h-3.5 text-slate group-hover:rotate-180 transition-transform" />
              </a>
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-surface border border-line rounded-lg shadow-card p-3 space-y-2 text-xs">
                <a href="#jobs-ledger" className="block p-2 hover:bg-teal-50 rounded text-slate hover:text-teal-700 font-semibold">
                  Browse Banking &amp; Corporate Jobs
                </a>
                <a href="#services" className="block p-2 hover:bg-teal-50 rounded text-slate hover:text-teal-700 font-semibold">
                  Verified Openings &amp; Direct Interviews
                </a>
                <a href="#director-trust" className="block p-2 hover:bg-teal-50 rounded text-slate hover:text-teal-700 font-semibold">
                  Meet Our Leadership
                </a>
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="w-full text-left p-2 bg-teal-500 text-surface rounded font-bold hover:bg-teal-600 transition"
                >
                  Create Free Profile →
                </button>
              </div>
            </div>

            {/* For Employers dropdown */}
            <div className="relative group py-2">
              <a href="#employer-spotlight" className="flex items-center gap-1.5 text-ink-900 hover:text-ink-700 transition-colors font-semibold">
                <span className="bg-ink-800 text-surface font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
                  EMPLOYERS
                </span>
                HR &amp; Recruitment
                <ChevronDown className="w-3.5 h-3.5 text-slate group-hover:rotate-180 transition-transform" />
              </a>
              <div className="absolute top-full left-0 hidden group-hover:block w-72 bg-surface border border-line rounded-lg shadow-card p-3 space-y-2 text-xs">
                <a href="#services" className="block p-2 hover:bg-ink-50 rounded text-slate hover:text-ink-800 font-semibold">
                  Recruitment Solutions &amp; Executive Search
                </a>
                <a href="#employer-spotlight" className="block p-2 hover:bg-ink-50 rounded text-slate hover:text-ink-800 font-semibold">
                  Contract Staffing &amp; Payroll Advisory
                </a>
                <a href="#director-trust" className="block p-2 hover:bg-ink-50 rounded text-slate hover:text-ink-800 font-semibold">
                  Director Leadership &amp; Network
                </a>
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="w-full text-left p-2 bg-ink-800 text-surface rounded font-bold hover:bg-ink-900 transition"
                >
                  Request Talent Shortlist (72h) →
                </button>
              </div>
            </div>

            <a href="#director-trust" className="text-slate hover:text-ink-900 transition-colors font-semibold">
              About Director
            </a>

            <a href="#partners" className="text-slate hover:text-ink-900 transition-colors font-semibold">
              Clients
            </a>

            <a href="#insights" className="text-slate hover:text-ink-900 transition-colors font-semibold">
              Insights
            </a>

            <a href="#faq" className="text-slate hover:text-ink-900 transition-colors font-semibold">
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
                  Browse Banking &amp; Corporate Jobs
                </a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900 border-b border-line">
                  Our Four Placement Services
                </a>
                <a href="#director-trust" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900 border-b border-line">
                  Meet Our Director
                </a>
                <a href="#proof" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900">
                  Candidate Success Stories
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
                  Contract Staffing &amp; Payroll
                </a>
                <a href="#director-trust" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900 border-b border-line">
                  Director Leadership &amp; Network
                </a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-900">
                  Employer 90-Day Replacement Policy
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

        {/* Sticky Slim Bar on Scroll */}
        {scrolled && (
          <div className="hidden md:block bg-paper border-t border-line py-1.5 px-4 animate-fadeIn">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
              <span className="font-mono text-ink-900 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                Arani Corporate Solutions: 2,400+ Verified Openings Active Today
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
                  Hire Talent (72h SLA)
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* USER SELECTION TABS SECTION (Directly below Header, on White Canvas - matches Screenshot 2) */}
      <div className="bg-surface border-b border-line py-3 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setAudienceView('seeker')}
            className={`w-full py-3 px-5 rounded-lg font-display text-sm sm:text-base font-extrabold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xs ${
              audienceView === 'seeker'
                ? 'bg-teal-600 hover:bg-teal-700 text-surface shadow-md ring-2 ring-teal-400/40'
                : 'bg-surface text-ink-900 border border-line hover:border-teal-500 shadow-2xs hover:bg-paper'
            }`}
          >
            <User className={`w-5 h-5 ${audienceView === 'seeker' ? 'text-surface' : 'text-teal-600'}`} />
            <span>I'm Looking for a Job</span>
          </button>

          <button
            onClick={() => setAudienceView('employer')}
            className={`w-full py-3 px-5 rounded-lg font-display text-sm sm:text-base font-extrabold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xs ${
              audienceView === 'employer'
                ? 'bg-teal-600 hover:bg-teal-700 text-surface shadow-md ring-2 ring-teal-400/40'
                : 'bg-surface text-ink-900 border border-line hover:border-teal-500 shadow-2xs hover:bg-paper'
            }`}
          >
            <Building2 className={`w-5 h-5 ${audienceView === 'employer' ? 'text-surface' : 'text-teal-600'}`} />
            <span>I'm Hiring Talent</span>
          </button>
        </div>
      </div>

      {/* MAIN HERO SLIDING IMAGE CAROUSEL BANNER SECTION (Matches Screenshot 2) */}
      <section
        id="hero-section"
        className="relative bg-ink-950 text-surface overflow-hidden min-h-[480px] sm:min-h-[520px] md:min-h-[580px] flex items-center"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        {/* Full-width Carousel Background Images with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          {heroCarouselSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover object-center transform transition-transform duration-10000 ease-linear scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Dark Navy / Black Gradient Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-900/80 to-ink-950/40" />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
        </div>

        {/* Carousel Side Navigation Arrows (Left `<` and Right `>`) */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ink-900/70 hover:bg-teal-600 text-surface border border-surface/20 flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-sm group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ink-900/70 hover:bg-teal-600 text-surface border border-surface/20 flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-sm group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 py-12 md:py-16 w-full">
          <div className="max-w-2xl space-y-5 animate-fadeIn">
            
            {/* Top Teal Pill Badge (Matches "WELCOME TO ARANI CORPORATE SOLUTIONS" in Screenshot 2) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-teal-600 text-surface text-xs font-mono font-extrabold uppercase tracking-wider shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WELCOME TO ARANI CORPORATE SOLUTIONS</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-surface tracking-tight leading-[1.12] drop-shadow-md">
              {audienceView === 'seeker' ? (
                <>Connecting Talent with Opportunities</>
              ) : (
                <>Connecting Enterprises with Top Talent</>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed font-medium drop-shadow">
              {audienceView === 'seeker'
                ? 'Recruitment & Placement Consultancy for Top Companies & Job Seekers. Free service for candidates.'
                : 'Premier HR, Staffing & Talent Sourcing Services. Shortlist qualified candidates in 72 hours.'}
            </p>

            {/* Primary Action Button (Matches "Explore Opportunities →" in Screenshot 2) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  if (audienceView === 'seeker') {
                    window.location.href = '/candidate/dashboard';
                  } else {
                    const el = document.getElementById('employer-spotlight');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else setRoleModalOpen(true);
                  }
                }}
                className="px-7 py-3.5 bg-teal-500 hover:bg-teal-600 text-surface font-extrabold text-sm sm:text-base rounded-md shadow-lg hover:shadow-teal-500/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>{audienceView === 'seeker' ? 'Get a Job Now' : 'Request Talent Shortlist'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setRoleModalOpen(true)}
                className="px-6 py-3.5 bg-surface/10 hover:bg-surface/20 text-surface border border-surface/30 font-bold text-sm rounded-md backdrop-blur-md transition-all"
              >
                {audienceView === 'seeker' ? 'Upload Resume' : 'Schedule HR Call'}
              </button>
            </div>

          </div>
        </div>

        {/* Carousel Pagination Dots at Bottom Center */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-ink-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface/20">
          {HERO_CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? 'w-6 h-2.5 bg-teal-400 shadow-xs'
                  : 'w-2.5 h-2.5 bg-surface/50 hover:bg-surface'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* LIVE JOB OPENINGS SECTION (Kept directly below the banner section) */}
      <section id="live-job-openings" className="py-8 bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-surface border border-line rounded-2xl p-5 sm:p-6 shadow-card space-y-4">
            
            {/* Header / Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                </span>
                <div>
                  <h3 className="font-display font-extrabold text-ink-950 text-base sm:text-lg flex items-center gap-2">
                    Live Job Openings
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                      2,400+ Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate font-medium">Explore instant hiring drives across Tier-1 Banks &amp; Top Corporate Firms</p>
                </div>
              </div>

              {/* Quick Search & Filter Inputs */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-paper border border-line rounded-lg focus-within:border-teal-500 text-xs min-w-[180px]">
                  <Search className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <input
                    type="text"
                    value={heroSearchKeyword}
                    onChange={(e) => setHeroSearchKeyword(e.target.value)}
                    placeholder="Search designation or company..."
                    className="w-full bg-transparent text-xs font-semibold text-ink-950 focus:outline-none placeholder:text-slate-400"
                  />
                </div>
                <select
                  value={heroSearchCategory}
                  onChange={(e) => setHeroSearchCategory(e.target.value)}
                  className="bg-paper text-xs font-bold text-ink-900 border border-line rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Sectors</option>
                  <option value="Banking">Banking</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Finance">Finance</option>
                  <option value="IT">IT</option>
                </select>
              </div>
            </div>

            {/* Live Job Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {SAMPLE_JOBS
                .filter((job) => {
                  const matchesKeyword = heroSearchKeyword === '' ||
                    job.title.toLowerCase().includes(heroSearchKeyword.toLowerCase()) ||
                    job.companyName.toLowerCase().includes(heroSearchKeyword.toLowerCase());
                  const matchesCat = heroSearchCategory === 'All' || job.category === heroSearchCategory;
                  return matchesKeyword && matchesCat;
                })
                .slice(0, 4)
                .map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobSelect(job)}
                    className="p-4 bg-surface border border-line hover:border-teal-500 rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between gap-3 relative overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                          {job.category}
                        </span>
                        {job.isUrgent && (
                          <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            Urgent Drive
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-sm text-ink-950 group-hover:text-teal-600 transition-colors line-clamp-1">
                        {job.title}
                      </h4>
                      <div className="text-xs text-slate font-medium truncate">
                        {job.companyName} • <span className="font-mono font-bold text-teal-700">{job.salary.split('(')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-line/60 text-xs font-mono">
                      <span className="text-slate-400">{job.location}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobSelect(job);
                        }}
                        className="px-3 py-1 bg-teal-500 group-hover:bg-teal-600 text-surface text-xs font-bold rounded shadow-xs transition flex items-center gap-1"
                      >
                        Apply <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Bottom Link Bar */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate border-t border-line/60">
              <span className="flex items-center gap-1.5 text-teal-700 font-bold">
                ⚡ 100% Free Service For Job Candidates
              </span>
              <a
                href="#jobs-ledger"
                className="text-teal-700 font-bold hover:underline flex items-center gap-1"
              >
                View All 2,400+ Job Openings Below →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* DIRECTOR TRUST SECTION (Immediately Below Hero Banner) */}
      <section id="director-trust" className="py-16 md:py-24 bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="bg-gradient-to-r from-paper via-surface to-paper border-2 border-line rounded-2xl p-6 sm:p-10 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Side: Director Photograph Frame */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-surface bg-ink-950 group">
                  <Image
                    src={directorData.photoUrl}
                    alt={`${directorData.name} - ${directorData.title} of Arani Corporate Solutions`}
                    width={600}
                    height={750}
                    className="w-full h-[400px] sm:h-[460px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                  
                  {/* Floating Director Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md p-3.5 rounded-xl border border-line shadow-xl flex items-center justify-between">
                    <div>
                      <span className="font-display font-extrabold text-ink-950 text-base block">
                        {directorData.name}
                      </span>
                      <span className="font-mono text-xs text-teal-700 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                        {directorData.title}
                      </span>
                    </div>
                    <span className="bg-teal-600 text-surface font-mono font-bold text-[10px] uppercase px-2.5 py-1 rounded-md shadow-xs">
                      {directorData.experienceTag || 'Director'}
                    </span>
                  </div>
                </div>
                
                {/* Caption below photo */}
                <p className="text-[11px] font-mono text-slate text-center mt-2.5">
                  {directorData.badgeText || `📷 Director ${directorData.name} at Arani Corporate Solutions Head Office Desk`}
                </p>
              </div>

              {/* Right Side: Meet Our Director Details & Highlights */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded font-mono text-xs font-bold">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>LEADERSHIP &amp; RECRUITMENT EXPERTISE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-950">
                  Meet Our Director
                </h2>

                <div>
                  <h3 className="text-xl font-display font-bold text-ink-900">
                    {directorData.name} <span className="text-sm font-sans font-medium text-slate">| {directorData.title}</span>
                  </h3>
                  <p className="text-slate text-sm sm:text-base leading-relaxed mt-2">
                    {directorData.bio}
                  </p>
                </div>

                {/* Checkmark Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {directorData.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-surface border border-line rounded-lg shadow-xs">
                      <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-ink-950 text-sm">{item.title}</h4>
                        <p className="text-slate text-xs">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Professional Signature Style Element */}
                <div className="pt-4 border-t border-line flex items-center justify-between gap-4">
                  <div>
                    <span className="font-serif italic text-2xl text-ink-800 font-bold tracking-wide block">
                      {directorData.signatureName || directorData.name}
                    </span>
                    <span className="font-mono text-[11px] text-muted font-bold">
                      {directorData.signatureTitle || `${directorData.title}, Arani Corporate Solutions`}
                    </span>
                  </div>

                  <div className="hidden sm:block text-right">
                    <span className="inline-block px-3 py-1 bg-ink-950 text-teal-300 font-mono text-[10px] font-bold rounded">
                      VERIFIED LEADERSHIP SEAL
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION (Display 4 Key Corporate Cards) */}
      <section id="services" className="py-16 md:py-24 bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold text-teal-600 uppercase tracking-wider block mb-2">
              {"// OUR CORE SERVICES"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-950">
              End-to-End Recruitment &amp; Placement Solutions
            </h2>
            <p className="text-slate text-sm sm:text-base mt-2">
              Comprehensive talent solutions designed to empower job seekers while fulfilling corporate recruitment goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Job Placement */}
            <div className="p-6 bg-surface border-2 border-line hover:border-teal-500 rounded-xl shadow-xs hover:shadow-card transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-surface transition-colors flex items-center justify-center font-bold mb-4 shadow-sm">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-ink-950 group-hover:text-teal-600 transition-colors mb-2">
                  Job Placement
                </h3>
                <p className="text-slate text-xs sm:text-sm leading-relaxed">
                  Find verified opportunities from trusted employers with direct access to decision-makers and zero candidate fees.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-mono font-bold text-teal-600">
                <span>Free For Candidates</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Recruitment Solutions */}
            <div className="p-6 bg-surface border-2 border-line hover:border-teal-500 rounded-xl shadow-xs hover:shadow-card transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-surface transition-colors flex items-center justify-center font-bold mb-4 shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-ink-950 group-hover:text-teal-600 transition-colors mb-2">
                  Recruitment Solutions
                </h3>
                <p className="text-slate text-xs sm:text-sm leading-relaxed">
                  Hire qualified professionals efficiently with custom shortlists delivered within 72 hours for high-growth enterprises.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-mono font-bold text-teal-600">
                <span>72h Shortlist SLA</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Verified Openings */}
            <div className="p-6 bg-surface border-2 border-line hover:border-teal-500 rounded-xl shadow-xs hover:shadow-card transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-surface transition-colors flex items-center justify-center font-bold mb-4 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-ink-950 group-hover:text-teal-600 transition-colors mb-2">
                  Verified Openings
                </h3>
                <p className="text-slate text-xs sm:text-sm leading-relaxed">
                  Access genuine and screened job opportunities in private banking, corporate HR, finance, and cloud technologies.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-mono font-bold text-teal-600">
                <span>Genuine Employers</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: End-to-End Support */}
            <div className="p-6 bg-surface border-2 border-line hover:border-teal-500 rounded-xl shadow-xs hover:shadow-card transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-surface transition-colors flex items-center justify-center font-bold mb-4 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-ink-950 group-hover:text-teal-600 transition-colors mb-2">
                  End-to-End Support
                </h3>
                <p className="text-slate text-xs sm:text-sm leading-relaxed">
                  Dedicated guidance from initial resume drafting and interview preparation all the way through appointment offer placement.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-mono font-bold text-teal-600">
                <span>Complete Guidance</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TRUST & STATISTICS SECTION (Large Animated Counters) */}
      <section className="py-16 md:py-20 bg-ink-900 text-surface border-b border-ink-800 rising-bars relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase font-bold text-teal-400 bg-ink-800 px-3 py-1 rounded inline-block mb-2">
              {"// TRUST & VERIFIED METRICS"}
            </span>
            <h2 className="text-3xl font-display font-bold text-surface">
              Proven Placement Benchmark
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Transparent track record serving candidates and enterprise clients nationwide.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stat 1 */}
            <div className="p-6 bg-ink-800/90 border border-ink-700 rounded-xl text-center shadow-lg hover:border-teal-400/50 transition">
              <span className="block text-4xl sm:text-5xl font-display font-extrabold text-teal-400 mb-1">
                4.8 / 5
              </span>
              <div className="flex text-warn justify-center my-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warn text-warn" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-surface uppercase">Candidate Rating</span>
              <p className="text-[11px] text-slate-400 mt-1">Based on 3,400+ reviews</p>
            </div>

            {/* Stat 2 */}
            <div className="p-6 bg-ink-800/90 border border-ink-700 rounded-xl text-center shadow-lg hover:border-teal-400/50 transition">
              <span className="block text-4xl sm:text-5xl font-display font-extrabold text-surface mb-1">
                12,000+
              </span>
              <span className="font-mono text-xs font-bold text-teal-300 uppercase block mt-3">Placements Made</span>
              <p className="text-[11px] text-slate-400 mt-1">Banking &amp; Corporate</p>
            </div>

            {/* Stat 3 */}
            <div className="p-6 bg-ink-800/90 border border-ink-700 rounded-xl text-center shadow-lg hover:border-teal-400/50 transition">
              <span className="block text-4xl sm:text-5xl font-display font-extrabold text-teal-400 mb-1">
                350+
              </span>
              <span className="font-mono text-xs font-bold text-surface uppercase block mt-3">Partner Companies</span>
              <p className="text-[11px] text-slate-400 mt-1">Banks, IT &amp; Enterprises</p>
            </div>

            {/* Stat 4 */}
            <div className="p-6 bg-ink-800/90 border border-ink-700 rounded-xl text-center shadow-lg hover:border-teal-400/50 transition">
              <span className="block text-4xl sm:text-5xl font-display font-extrabold text-surface mb-1">
                98%
              </span>
              <span className="font-mono text-xs font-bold text-teal-300 uppercase block mt-3">Client Satisfaction</span>
              <p className="text-[11px] text-slate-400 mt-1">12-Month Retention Rate</p>
            </div>

          </div>

        </div>
      </section>

      {/* PARTNER COMPANIES SECTION (Logo Grid & Categorized Marquee) */}
      <section id="partners" className="py-16 md:py-24 bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">
                {"// INDUSTRY NETWORKS"}
              </span>
              <h2 className="text-3xl font-display font-bold text-ink-950">
                Trusted By Leading Companies
              </h2>
              <p className="text-slate text-xs sm:text-sm mt-1">
                Partnering with premier private banks, technology conglomerates, and manufacturing firms.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {['All', 'Banking', 'IT', 'Manufacturing', 'Corporate'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPartnerCategory(cat)}
                  className={`px-3 py-1.5 rounded-md font-bold transition ${
                    partnerCategory === cat
                      ? 'bg-teal-500 text-surface shadow-xs'
                      : 'bg-paper text-slate hover:bg-teal-50 border border-line'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredPartners.map((partner, index) => (
              <div
                key={index}
                className="p-4 bg-paper border border-line rounded-xl flex flex-col items-center justify-center text-center hover:border-teal-500 hover:shadow-card transition-all duration-200 group cursor-default"
              >
                <span className="font-display font-extrabold text-base text-slate group-hover:text-ink-950 transition-colors">
                  {partner.name}
                </span>
                <span className="font-mono text-[10px] text-teal-700 uppercase font-bold tracking-wider mt-1 bg-teal-50 px-2 py-0.5 rounded">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIVE OPENINGS TICKER MARQUEE */}
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

      {/* FEATURED LIVE OPENINGS LEDGER SECTION */}
      <section id="jobs-ledger" className="py-16 md:py-24 bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">
                {"// VERIFIED VACANCIES"}
              </span>
              <h2 className="text-3xl font-display font-bold text-ink-950">
                Live Openings on Arani
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
              {['All', 'Banking', 'Corporate', 'Finance', 'Operations', 'IT'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLedgerCategory(cat)}
                  className={`px-3 py-1.5 rounded-md font-bold transition whitespace-nowrap ${
                    ledgerCategory === cat
                      ? 'bg-teal-500 text-surface shadow-xs'
                      : 'bg-paper text-slate hover:bg-teal-50 hover:text-teal-700 border border-line'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job Rows */}
          <div className="space-y-3">
            {filteredJobs.slice(0, 6).map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="p-4 sm:p-5 bg-paper border border-line hover:border-teal-500 rounded-xl transition duration-200 cursor-pointer group shadow-xs hover:shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                    <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
                      {job.category}
                    </span>
                    {job.isUrgent && (
                      <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                        Urgent Hiring
                      </span>
                    )}
                    {job.isFeatured && (
                      <span className="bg-ink-800 text-surface font-bold px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                    <span className="text-muted">• {job.postedDate}</span>
                  </div>

                  <h3 className="font-display font-bold text-ink-950 text-base sm:text-lg group-hover:text-teal-600 transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate font-medium">
                    <span className="flex items-center gap-1 font-semibold text-ink-900">
                      <Building2 className="w-3.5 h-3.5 text-teal-600" />
                      {job.companyName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-mono font-bold text-teal-700">
                      {job.salary.split('(')[0]}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-line">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJob(job);
                    }}
                    className="w-full sm:w-auto px-5 py-2 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-xs rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    Apply Now
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setSearchOverlayOpen(true)}
              className="px-6 py-3 bg-surface hover:bg-paper text-ink-950 border border-line font-mono font-bold text-xs rounded-lg shadow-xs hover:border-teal-500 transition inline-flex items-center gap-2"
            >
              View All 2,400+ Open Positions →
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
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
                  <div key={idx} className="bg-surface border border-line rounded-xl p-6 relative shadow-xs flex flex-col justify-between">
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
                  <div key={idx} className="bg-ink-900 text-surface border border-ink-800 rounded-xl p-6 relative shadow-xs flex flex-col justify-between">
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

      {/* EMPLOYER SPOTLIGHT SECTION */}
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
                  <span className="text-xs text-slate-300 uppercase">12-Mo Retention</span>
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
            <div className="lg:col-span-6 bg-surface text-ink-900 p-8 rounded-xl shadow-card border border-line">
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
                  className="w-full py-3.5 bg-ink-800 hover:bg-ink-900 text-surface font-bold text-sm rounded-lg shadow transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-teal-400" />
                  Submit Request (72h SLA)
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* PROOF SECTION (Testimonials & Video) */}
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
              <div key={t.id} className="bg-paper border border-line rounded-xl p-6 shadow-xs flex flex-col justify-between">
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
              className="bg-ink-900 text-surface border border-ink-800 rounded-xl p-6 shadow-xs flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80')` }} />
              
              <div className="relative z-10">
                <span className="font-mono text-[10px] uppercase font-bold text-teal-300 bg-ink-800 px-2 py-0.5 rounded">
                  {"// CASE STUDY VIDEO"}
                </span>
                <h3 className="font-display font-bold text-xl text-surface mt-3">
                  How Arani Placed 1,200+ Branch Officers
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

      {/* INSIGHTS SECTION */}
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
            <div className="lg:col-span-7 bg-surface border border-line rounded-xl overflow-hidden shadow-card flex flex-col justify-between group">
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

            <div className="lg:col-span-5 space-y-4">
              {SAMPLE_ARTICLES.slice(1).map((art) => (
                <div
                  key={art.id}
                  className="bg-surface border border-line rounded-xl p-4 shadow-xs hover:border-teal-500 transition group flex gap-4 items-center cursor-pointer"
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

      {/* FAQ SECTION */}
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

          <div className="space-y-3">
            {SAMPLE_FAQS.filter((f) => f.category === faqTab).map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-line rounded-xl overflow-hidden bg-paper transition"
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

      {/* FINAL CTA BAND & NEWSLETTER */}
      <section className="bg-ink-900 text-surface border-b border-ink-800 py-16 md:py-20 rising-bars">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
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
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-sm rounded-lg shadow transition flex items-center gap-2"
                >
                  Candidate Registration
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="px-6 py-3 bg-surface hover:bg-paper text-ink-900 font-bold text-sm rounded-lg shadow transition flex items-center gap-2"
                >
                  Employer Consultation
                  <Building2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-ink-800 border border-ink-700 p-8 rounded-xl">
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
            
            <div className="lg:col-span-2 space-y-4">
              <AraniLogo variant="light" size="md" />
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Arani Corporate Solutions is a premier recruitment consultancy and HR advisory firm connecting talent with leading financial institutions and enterprise corporations.
              </p>
              <div className="font-mono text-[11px] text-teal-400 font-bold tracking-widest">
                TAGLINE: GROW WITH THE OPPORTUNITY
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-surface mb-3">For Candidates</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#jobs-ledger" className="hover:text-surface transition">Browse Banking Jobs</a></li>
                <li><a href="#services" className="hover:text-surface transition">Job Placement Services</a></li>
                <li><a href="#director-trust" className="hover:text-surface transition">Director Leadership</a></li>
                <li><a href="#faq" className="hover:text-surface transition">Candidate FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-surface mb-3">For Employers</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#employer-spotlight" className="hover:text-surface transition">Request Shortlist (72h)</a></li>
                <li><a href="#services" className="hover:text-surface transition">Recruitment Solutions</a></li>
                <li><a href="#partners" className="hover:text-surface transition">Our Partner Network</a></li>
                <li><a href="#faq" className="hover:text-surface transition">90-Day Guarantee</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase font-bold text-surface mb-3">Contact HQ</h4>
              <p className="text-slate-400 leading-relaxed mb-2">
                Arani Corporate Towers, BKC Commercial Complex, Mumbai - 400051
              </p>
              <p className="text-teal-400 font-mono font-bold">+91 (0) 800-ARANI-HR</p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
            <div>
              © {new Date().getFullYear()} Arani Corporate Solutions. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
              <a href="#" className="hover:text-slate-300">Candidate Data Consent</a>
            </div>
          </div>

        </div>
      </footer>

      {/* OVERLAYS & MODALS */}
      <RoleChoiceModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        onSelectRole={(role) => {
          setRoleModalOpen(false);
          alert(`Redirecting to ${role === 'candidate' ? 'Candidate Registration & Profile Builder' : 'Employer Requirement Intake'}...`);
        }}
      />

      <SearchOverlay
        isOpen={searchOverlayOpen}
        onClose={() => setSearchOverlayOpen(false)}
        onSelectJob={(job) => {
          setSearchOverlayOpen(false);
          setSelectedJob(job);
        }}
      />

      {selectedJob && (
        <JobQuickModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApplySuccess={() => {
            alert(`Application submitted for ${selectedJob.title} at ${selectedJob.companyName}!`);
            setSelectedJob(null);
          }}
        />
      )}

      {/* VIDEO MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface text-ink-950 rounded-2xl max-w-3xl w-full p-6 relative border border-line shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate hover:text-ink-950 rounded-full bg-paper"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-xl mb-4">
              Case Study: Arani Banking Placement Drive
            </h3>
            <div className="aspect-video bg-ink-950 rounded-xl flex items-center justify-center text-surface relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                alt="Video Case Study Preview"
                fill
                className="object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 text-center space-y-3 p-4">
                <div className="w-16 h-16 rounded-full bg-teal-500 text-ink-950 flex items-center justify-center mx-auto font-bold shadow-lg">
                  <Play className="w-8 h-8 fill-ink-950 ml-1" />
                </div>
                <p className="font-mono text-xs font-bold text-teal-300">
                  Documentary Video Playing (3:45)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
