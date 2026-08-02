'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { JobQuickModal } from '@/components/JobQuickModal';
import { SAMPLE_JOBS, Job } from '@/lib/sampleData';
import { captureUtmParams, trackPixelEvent } from '@/lib/metaPixel';
import { generateOrganizationSchema } from '@/lib/jsonLd';
import { JobCardSkeleton, EmptyJobsState } from '@/components/SkeletonsAndEmptyStates';
import {
  Search,
  MapPin,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  PhoneCall,
  UserCheck,
  Briefcase
} from 'lucide-react';

interface CampaignVariant {
  title: string;
  highlightText: string;
  subtitle: string;
  kicker: string;
  categoryFilter: string;
  bulletPoints: string[];
  ctaText: string;
}

const CAMPAIGN_VARIANTS: Record<string, CampaignVariant> = {
  banking: {
    kicker: '// URGENT BANKING HIRING CAMPAIGN',
    title: 'Direct Walk-In & Interview Connect for ',
    highlightText: 'Branch Banking & Credit Roles',
    subtitle: 'Free consultancy service for candidates. Get shortlisted for HDFC, ICICI, Kotak, and Axis Bank positions across India.',
    categoryFilter: 'Banking',
    bulletPoints: [
      '₹0 Candidate Fee Guaranteed',
      'Direct Recruiter Connect within 24 Hours',
      '42% Average Salary Uplift for Banking Professionals'
    ],
    ctaText: 'Apply for Banking Positions'
  },
  corporate: {
    kicker: '// CORPORATE HR & ENTERPRISE ROLES',
    title: 'Land Top Corporate HR & ',
    highlightText: 'Operations Positions',
    subtitle: 'Direct placement with Fortune 500 enterprise corporations and fast-growing multinational companies.',
    categoryFilter: 'Corporate',
    bulletPoints: [
      'Pre-vetted Corporate Employers',
      'Confidential Search Protection',
      'Fast-track 7-Day Selection Process'
    ],
    ctaText: 'Apply for Corporate Positions'
  },
  finance: {
    kicker: '// HIGH-PAY FINANCE & COMPLIANCE HIRING',
    title: 'Senior Financial Analyst & ',
    highlightText: 'KYC/AML Compliance Careers',
    subtitle: 'Join leading fintech firms and Big-4 advisory practices. Competitive packages with remote & hybrid options.',
    categoryFilter: 'Finance',
    bulletPoints: [
      'High-growth FinTech & Advisory Openings',
      'Hybrid & Remote Flexibility Available',
      'Quarterly Performance Incentive Structures'
    ],
    ctaText: 'Apply for Finance Positions'
  },
  default: {
    kicker: '// META AD CAMPAIGN LANDING PAGE',
    title: 'Get Hired into Premier ',
    highlightText: 'Banking & Corporate Roles',
    subtitle: '100% Free service for candidates. Direct interviews with HDFC, ICICI, Kotak, and top enterprise corporations across India.',
    categoryFilter: 'All',
    bulletPoints: [
      '₹0 Candidate Fee Guaranteed',
      'Direct Bank Recruiter Connect',
      '24h Profile Verification & Shortlisting'
    ],
    ctaText: 'Register & Apply Free'
  }
};

export default function LandingPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [variantKey, setVariantKey] = useState<string>('default');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Capture UTM parameters & track Meta Pixel PageView
    const utm = captureUtmParams();
    const urlParams = new URLSearchParams(window.location.search);
    const variantParam =
      urlParams.get('v') ||
      (utm.utm_campaign?.includes('banking')
        ? 'banking'
        : utm.utm_campaign?.includes('corporate')
        ? 'corporate'
        : utm.utm_campaign?.includes('finance')
        ? 'finance'
        : 'default');

    const key = CAMPAIGN_VARIANTS[variantParam] ? variantParam : 'default';

    // Delay state setting to avoid synchronous setState inside effect body error
    const timer1 = setTimeout(() => {
      setVariantKey(key);
      setIsLoading(false);
    }, 100);

    trackPixelEvent('PageView', { page: 'meta_ad_landing_page', variant: key });

    return () => clearTimeout(timer1);
  }, []);

  const variant = CAMPAIGN_VARIANTS[variantKey] || CAMPAIGN_VARIANTS.default;

  // Filter jobs based on campaign variant
  const matchedJobs = SAMPLE_JOBS.filter((job) =>
    variant.categoryFilter === 'All' ? true : job.category === variant.categoryFilter
  );

  const displayJobs = matchedJobs.length > 0 ? matchedJobs : SAMPLE_JOBS;

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    trackPixelEvent('ViewContent', { content_id: job.id, content_name: job.title });
  };

  return (
    <div className="min-h-screen bg-paper text-ink-900 flex flex-col font-sans pb-16 md:pb-0">
      {/* Inject Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
      />

      {/* Simplified High-Conversion Header (No navigation distractor links) */}
      <header className="bg-surface border-b border-line py-3 px-4 shadow-xs sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <AraniLogo className="h-8 md:h-10" variant="dark" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-[11px] text-ok font-bold uppercase bg-ok/10 px-2.5 py-1 rounded border border-ok/20">
              ✓ 100% Free for Candidates
            </span>
            <Link
              href="/candidate/dashboard"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-mono font-bold uppercase rounded shadow-xs transition"
            >
              Register Free
            </Link>
          </div>
        </div>
      </header>

      {/* Message-Matched Hero Banner */}
      <section className="bg-ink-950 text-surface py-12 md:py-16 rising-bars relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-teal-400 bg-ink-800 px-3 py-1.5 rounded border border-teal-500/30 shadow-xs">
            <span>{variant.kicker}</span>
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-surface leading-tight max-w-3xl mx-auto">
            {variant.title}
            <span className="text-teal-400">{variant.highlightText}</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {variant.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs font-mono text-teal-300 pt-2">
            {variant.bulletPoints.map((bp, idx) => (
              <span key={idx} className="flex items-center gap-1.5 bg-ink-900 px-3 py-1 rounded border border-teal-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                {bp}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="bg-surface border-b border-line py-3 px-4 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-slate">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>4.8/5 Rating from Placed Candidates</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-teal-600" />
            <span>350+ Banking &amp; Corporate Employers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-teal-600" />
            <span>12,000+ Successful Placements</span>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <main className="max-w-5xl mx-auto px-4 py-10 flex-1 w-full space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-line gap-2">
          <div>
            <h2 className="text-xl font-display font-bold text-ink-900">
              Immediate Openings matching your Meta Search
            </h2>
            <p className="text-xs text-slate">Click any role to review requirements and submit your application instantly.</p>
          </div>
          <span className="text-xs font-mono text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded border border-teal-100">
            {displayJobs.length} Positions Available Today
          </span>
        </div>

        {/* Jobs List */}
        {isLoading ? (
          <div className="space-y-4">
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        ) : displayJobs.length === 0 ? (
          <EmptyJobsState />
        ) : (
          <div className="space-y-3">
            {displayJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleApplyClick(job)}
                className="bg-surface border border-line hover:border-teal-500 rounded-lg p-5 shadow-xs transition cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                      {job.id}
                    </span>
                    <span className="bg-slate-100 text-slate text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                      {job.category}
                    </span>
                    {job.isUrgent && (
                      <span className="bg-warn/10 text-warn font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink-900 group-hover:text-teal-600 transition">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate">
                    {job.companyName} • {job.location} • <strong className="text-teal-700 font-mono">{job.salary}</strong>
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplyClick(job);
                  }}
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-mono font-bold uppercase rounded shadow-xs transition flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Process Step Summary */}
        <div className="bg-surface border border-line rounded-xl p-6 md:p-8 space-y-6 shadow-xs">
          <h3 className="font-display font-bold text-lg text-ink-900 text-center">
            How Arani Helps You Get Hired in 3 Simple Steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 text-center p-4 bg-paper rounded-lg">
              <span className="font-mono text-xs font-bold text-teal-600 bg-teal-100 px-2.5 py-1 rounded-full">
                STEP 01
              </span>
              <h4 className="font-display font-bold text-sm text-ink-900">Submit Resume &amp; ID</h4>
              <p className="text-xs text-slate">Complete quick profile registration with your PDF resume &amp; basic details.</p>
            </div>

            <div className="space-y-2 text-center p-4 bg-paper rounded-lg">
              <span className="font-mono text-xs font-bold text-teal-600 bg-teal-100 px-2.5 py-1 rounded-full">
                STEP 02
              </span>
              <h4 className="font-display font-bold text-sm text-ink-900">24h Profile Verification</h4>
              <p className="text-xs text-slate">Our banking recruitment consultants review and verify your profile metrics.</p>
            </div>

            <div className="space-y-2 text-center p-4 bg-paper rounded-lg">
              <span className="font-mono text-xs font-bold text-teal-600 bg-teal-100 px-2.5 py-1 rounded-full">
                STEP 03
              </span>
              <h4 className="font-display font-bold text-sm text-ink-900">Direct Bank Interview</h4>
              <p className="text-xs text-slate">Get scheduled for direct interview rounds with hiring managers at zero cost.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Apply Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-ink-950 border-t border-teal-500/30 p-3 z-40 flex items-center justify-between shadow-2xl">
        <div>
          <p className="text-[11px] font-mono text-teal-300">100% Free Candidate Search</p>
          <p className="text-xs font-bold text-surface">2,400+ Open Banking Roles</p>
        </div>
        <Link
          href="/candidate/dashboard"
          className="px-4 py-2 bg-teal-500 text-surface text-xs font-mono font-bold uppercase rounded shadow-xs"
        >
          {variant.ctaText}
        </Link>
      </div>

      {/* Quick Apply Modal */}
      <JobQuickModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
