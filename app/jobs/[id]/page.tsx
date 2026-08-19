'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AraniLogo } from '@/components/AraniLogo';
import { SAMPLE_JOBS, Job } from '@/lib/sampleData';
import { generateJobPostingSchema } from '@/lib/jsonLd';
import { captureUtmParams, trackPixelEvent, getUtmParams } from '@/lib/metaPixel';
import {
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Send,
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck,
  Lock,
  Building2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const jobId = resolvedParams.id;

  const job: Job | undefined = SAMPLE_JOBS.find((j) => j.id === jobId) || SAMPLE_JOBS[0];

  useEffect(() => {
    captureUtmParams();
    if (job) {
      trackPixelEvent('ViewContent', { content_id: job.id, content_name: job.title, content_category: job.category });
    }
  }, [job]);

  // 3-Step Apply Flow state
  const [applyStep, setApplyStep] = useState<1 | 2 | 3>(1);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Step 1: Candidate Details
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [nationalId, setNationalId] = useState('ABCDE1234F');
  const [address, setAddress] = useState('Flat 402, Sunshine Heights, Powai, Mumbai - 400076');
  const [resumeName, setResumeName] = useState('Rahul_Sharma_Banking_Resume.pdf');

  // Step 2: Role-Specific Screening Questions
  const [q1ExpYears, setQ1ExpYears] = useState('3 Years');
  const [q2NoticePeriod, setQ2NoticePeriod] = useState('30 Days');
  const [q3DomainCert, setQ3DomainCert] = useState('CIBIL & Financial Modeling Certified');
  const [coverNote, setCoverNote] = useState('');

  // Step 3: Consent & Submission
  const [consentData, setConsentData] = useState(true);
  const [consentContact, setConsentContact] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !nationalId) return;
    setApplyStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setApplyStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentData || !consentContact) return;

    const utm = getUtmParams();
    trackPixelEvent('SubmitApplication', {
      job_id: job.id,
      job_title: job.title,
      applicant_name: fullName,
      applicant_email: email,
      ...utm
    });

    try {
      const { submitJobApplication } = await import('@/lib/supabase');
      await submitJobApplication({
        jobId: job.id,
        jobCode: job.id,
        fullName,
        email,
        phone,
        address,
        nationalId,
        resumeUrl: resumeName,
        status: 'Screening',
        coverNote
      });
    } catch (err) {
      console.warn('Failed to submit application to Supabase', err);
    }

    

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-paper text-ink-900 flex flex-col font-sans">
      {/* Inject JobPosting JSON-LD for Google for Jobs */}
      {job && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJobPostingSchema(job)) }}
        />
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-line shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AraniLogo className="h-9" variant="dark" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-slate hover:text-teal-600 transition">
              Home
            </Link>
            <Link href="/jobs" className="text-teal-600 font-bold">
              Live Job Board
            </Link>
            <Link href="/employers" className="text-slate hover:text-teal-600 transition">
              For Employers
            </Link>
            <Link href="/insights" className="text-slate hover:text-teal-600 transition">
              Insights
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/candidate/dashboard"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase tracking-wider rounded transition shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Candidate Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-600 hover:text-teal-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Live Job Board
          </Link>
          <div className="text-xs font-mono text-slate">
            Job ID: <span className="font-bold text-ink-900">{job.id}</span>
          </div>
        </div>

        {/* Hero Banner for Job */}
        <div className="bg-ink-950 text-surface p-6 md:p-8 rounded-lg border border-ink-800 shadow-xl rising-bars relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-teal-400 font-bold bg-ink-800 px-3 py-1 rounded border border-teal-500/30">
                  {job.id}
                </span>
                <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs px-3 py-0.5 rounded-full font-medium">
                  {job.category}
                </span>
                {job.isUrgent && (
                  <span className="bg-danger text-surface text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    URGENT REQUIREMENT
                  </span>
                )}
                {job.isConfidential && (
                  <span className="bg-ink-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-3 h-3 text-teal-400" /> Confidential Client
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-4xl font-display font-extrabold text-surface">
                {job.title}
              </h1>

              <p className="text-teal-300 font-medium text-sm md:text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-400" />
                {job.companyName} {job.isConfidential && '(Banking Client Confidential)'}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-3 rounded border text-xs font-mono font-bold transition flex items-center gap-2 ${
                  saved
                    ? 'bg-teal-500 text-surface border-teal-400'
                    : 'bg-ink-800 border-ink-700 text-slate-300 hover:text-surface'
                }`}
              >
                {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {saved ? 'Saved' : 'Save'}
              </button>

              <button
                onClick={handleShare}
                className="p-3 bg-ink-800 border border-ink-700 text-slate-300 hover:text-surface rounded text-xs font-mono font-bold transition flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-ink-800 text-xs font-mono">
            <div>
              <span className="text-muted block text-[10px] uppercase">Location Hub</span>
              <span className="font-semibold text-surface flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-teal-400" /> {job.location}
              </span>
            </div>
            <div>
              <span className="text-muted block text-[10px] uppercase">Annual CTC Range</span>
              <span className="font-semibold text-teal-400 flex items-center gap-1.5 mt-1">
                <DollarSign className="w-4 h-4 text-teal-400" /> {job.salary}
              </span>
            </div>
            <div>
              <span className="text-muted block text-[10px] uppercase">Employment Type</span>
              <span className="font-semibold text-surface flex items-center gap-1.5 mt-1">
                <Briefcase className="w-4 h-4 text-teal-400" /> {job.type}
              </span>
            </div>
            <div>
              <span className="text-muted block text-[10px] uppercase">Min. Experience</span>
              <span className="font-semibold text-surface flex items-center gap-1.5 mt-1">
                <Calendar className="w-4 h-4 text-teal-400" /> {job.experience}
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout: Details + 3-Step Apply Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-display font-bold text-xl text-ink-900 mb-3 pb-2 border-b border-line">
                  Position Description
                </h2>
                <p className="text-slate text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-xl text-ink-900 mb-3 pb-2 border-b border-line">
                  Mandatory Qualifications &amp; Skills
                </h2>
                <ul className="space-y-3 text-sm text-slate">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-xl text-ink-900 mb-3 pb-2 border-b border-line">
                  Perks &amp; Benefits Offered
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-paper border border-line rounded text-xs font-medium text-ink-900 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-teal-50 border border-teal-100 rounded-md flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm text-teal-900">
                    Arani Candidate Placement Promise
                  </h4>
                  <p className="text-xs text-slate">
                    This position is 100% free for all applicants. Your details are pre-screened directly with official hiring leads.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 3-Step Application Wizard Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-surface border border-line rounded-lg p-6 shadow-card space-y-6 sticky top-24">
              <div className="border-b border-line pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase font-bold text-teal-600">
                    {"// 3-STEP DIRECT APPLICATION"}
                  </span>
                  <span className="font-mono text-xs text-slate font-bold">
                    Step {applyStep} of 3
                  </span>
                </div>

                {/* Stepper Progress Bar */}
                <div className="grid grid-cols-3 gap-2">
                  <div className={`h-1.5 rounded-full ${applyStep >= 1 ? 'bg-teal-500' : 'bg-line'}`} />
                  <div className={`h-1.5 rounded-full ${applyStep >= 2 ? 'bg-teal-500' : 'bg-line'}`} />
                  <div className={`h-1.5 rounded-full ${applyStep >= 3 ? 'bg-teal-500' : 'bg-line'}`} />
                </div>
              </div>

              {!submitted ? (
                <>
                  {/* STEP 1: Profile & ID Snapshot */}
                  {applyStep === 1 && (
                    <form onSubmit={handleNextStep1} className="space-y-4">
                      <h3 className="font-display font-bold text-lg text-ink-900">
                        1. Confirm Profile &amp; ID Data
                      </h3>

                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Full Legal Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-slate mb-1">Email *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate mb-1">Mobile Phone *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">National ID / Passport No. *</label>
                        <input
                          type="text"
                          required
                          value={nationalId}
                          onChange={(e) => setNationalId(e.target.value)}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500 uppercase font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Full Residential Address *</label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Attached Resume</label>
                        <div className="p-2.5 bg-teal-50 border border-teal-100 rounded text-xs font-mono text-teal-800 flex items-center justify-between">
                          <span>✓ {resumeName}</span>
                          <span className="text-[10px] text-teal-600 underline cursor-pointer">Change</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-xs uppercase tracking-wider rounded transition flex items-center justify-center gap-2"
                      >
                        Proceed to Questions <ChevronRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* STEP 2: Role Screening Questions */}
                  {applyStep === 2 && (
                    <form onSubmit={handleNextStep2} className="space-y-4">
                      <h3 className="font-display font-bold text-lg text-ink-900">
                        2. Role Pre-Screening Questions
                      </h3>

                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">
                          Relevant Experience in Commercial Banking / Credit?
                        </label>
                        <select
                          value={q1ExpYears}
                          onChange={(e) => setQ1ExpYears(e.target.value)}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        >
                          <option value="1-2 Years">1–2 Years</option>
                          <option value="3 Years">3 Years</option>
                          <option value="4-5 Years">4–5 Years</option>
                          <option value="5+ Years">5+ Years</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Notice Period with Current Employer?</label>
                        <select
                          value={q2NoticePeriod}
                          onChange={(e) => setQ2NoticePeriod(e.target.value)}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        >
                          <option value="Immediate / Buyout">Immediate / Buyout available</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days">90 Days</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Professional Certifications</label>
                        <input
                          type="text"
                          value={q3DomainCert}
                          onChange={(e) => setQ3DomainCert(e.target.value)}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Brief Cover Note / Pitch (Optional)</label>
                        <textarea
                          rows={2}
                          value={coverNote}
                          onChange={(e) => setCoverNote(e.target.value)}
                          placeholder="Why you are a strong match for this banking role..."
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setApplyStep(1)}
                          className="w-1/3 py-2.5 bg-paper border border-line text-slate font-mono text-xs uppercase rounded"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 py-2.5 bg-teal-500 hover:bg-teal-600 text-surface font-bold text-xs uppercase tracking-wider rounded transition flex items-center justify-center gap-2"
                        >
                          Proceed to Consent <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 3: Consent & Final Submission */}
                  {applyStep === 3 && (
                    <form onSubmit={handleFinalSubmit} className="space-y-4">
                      <h3 className="font-display font-bold text-lg text-ink-900">
                        3. Review &amp; Consent
                      </h3>

                      <div className="p-3 bg-paper border border-line rounded space-y-2 text-xs">
                        <div className="flex justify-between text-slate">
                          <span>Applicant Name:</span>
                          <span className="font-bold text-ink-900">{fullName}</span>
                        </div>
                        <div className="flex justify-between text-slate">
                          <span>Target Position:</span>
                          <span className="font-bold text-teal-700">{job.title}</span>
                        </div>
                        <div className="flex justify-between text-slate">
                          <span>National ID:</span>
                          <span className="font-mono text-ink-900">{nationalId}</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 text-xs">
                        <label className="flex items-start gap-2 cursor-pointer text-slate">
                          <input
                            type="checkbox"
                            checked={consentData}
                            onChange={(e) => setConsentData(e.target.checked)}
                            className="mt-0.5 w-4 h-4 text-teal-600 rounded border-line"
                          />
                          <span>
                            I authorize Arani Corporate Solutions to store and process my profile, resume, and ID details for banking pre-screening.
                          </span>
                        </label>

                        <label className="flex items-start gap-2 cursor-pointer text-slate">
                          <input
                            type="checkbox"
                            checked={consentContact}
                            onChange={(e) => setConsentContact(e.target.checked)}
                            className="mt-0.5 w-4 h-4 text-teal-600 rounded border-line"
                          />
                          <span>
                            I agree to receive interview schedule updates via SMS, WhatsApp, and official email.
                          </span>
                        </label>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setApplyStep(2)}
                          className="w-1/3 py-2.5 bg-paper border border-line text-slate font-mono text-xs uppercase rounded"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!consentData || !consentContact}
                          className="w-2/3 py-3 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-surface font-bold text-xs uppercase tracking-wider rounded transition flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Submit Application
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-ink-900">
                    Application Queue Confirmed!
                  </h3>
                  <p className="text-xs text-slate">
                    Application ID: <strong className="font-mono text-teal-700">APP-1025</strong>
                  </p>
                  <p className="text-xs text-slate max-w-xs mx-auto">
                    Thank you, <strong>{fullName}</strong>. Your profile snapshot and responses have been routed to Arani&apos;s banking recruitment desk for {job.companyName}.
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/candidate/dashboard"
                      className="inline-block w-full py-2.5 bg-ink-800 text-surface font-mono font-bold text-xs uppercase rounded hover:bg-ink-900 transition"
                    >
                      Track in Candidate Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
