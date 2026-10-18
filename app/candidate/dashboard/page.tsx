'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { SAMPLE_JOBS, Job } from '@/lib/sampleData';
import { JobQuickModal } from '@/components/JobQuickModal';
import { getJobsList } from '@/lib/supabase-cms';
import { loginCandidate } from '@/lib/supabase';
import {
  User,
  FileText,
  Briefcase,
  Upload,
  Sparkles,
  CheckCircle2,
  Building2,
  MapPin,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
  RefreshCw,
  X,
  Target,
  Zap,
  Bookmark,
  Check,
  Clock,
  ShieldCheck,
  ChevronRight,
  FileSpreadsheet,
  LogIn,
  LogOut,
  Mail,
  Phone,
  AlertCircle
} from 'lucide-react';

interface RecommendedJob extends Job {
  matchScore: number;
  matchReasons: string[];
}

export default function CandidateDashboardPage() {
  const [wizardStep, setWizardStep] = useState<1 | 2>(1); // 1 = Profile Builder, 2 = Jobs For You
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginInputs, setLoginInputs] = useState({ fullName: '', email: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);

  // Candidate Profile State
  const [profile, setProfile] = useState(() => {
    const defaultProfile = {
      fullName: '',
      email: '',
      phone: '',
      city: 'Mumbai',
      education: 'Graduate / Post-Graduate',
      currentCompany: 'Banking / Corporate Firm',
      currentRole: 'Credit Analyst / Banking Officer',
      experienceYears: '1-3 Years',
      expectedCtc: '₹6,00,000 - ₹12,00,000 / yr',
      noticePeriod: '30 Days',
      skills: 'Banking Operations, Credit Analysis, Customer Relationship, KYC & Compliance, Financial Evaluation',
      preferredLocation: 'Mumbai / Hybrid'
    };

    if (typeof window !== 'undefined') {
      try {
        const registrationData = localStorage.getItem('arani_role_registration');
        if (registrationData) {
          const parsed = JSON.parse(registrationData);
          if (parsed.name) defaultProfile.fullName = parsed.name;
          if (parsed.email) defaultProfile.email = parsed.email;
          if (parsed.phone) defaultProfile.phone = parsed.phone;
        }

        const savedProfile = localStorage.getItem('arani_candidate_profile');
        if (savedProfile) {
          const parsedSaved = JSON.parse(savedProfile);
          return { ...defaultProfile, ...parsedSaved };
        }
      } catch (e) {
        console.warn('Could not parse registration data', e);
      }
    }
    return defaultProfile;
  });

  const [resumeUploaded, setResumeUploaded] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [allJobs, setAllJobs] = useState<Job[]>(SAMPLE_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [isAiMatching, setIsAiMatching] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Manual search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSubTab, setActiveSubTab] = useState<'ai' | 'all'>('ai');

  // Load jobs from Supabase CMS if available
  useEffect(() => {
    async function loadCmsJobs() {
      try {
        const jobs = await getJobsList();
        if (jobs && Array.isArray(jobs) && jobs.length > 0) {
          setAllJobs(jobs);
        }
      } catch (err) {
        console.warn('Using default job data', err);
      }
    }
    loadCmsJobs();

    // Check if user already had previous session
    if (typeof window !== 'undefined') {
      try {
        const savedApps = localStorage.getItem('arani_applied_jobs');
        if (savedApps) setAppliedJobIds(JSON.parse(savedApps));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Candidate Login Handler (Full Name & Email ID)
  const handleCandidateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInputs.fullName.trim() || !loginInputs.email.trim()) {
      setLoginErrorMessage('Please enter both your Full Name and Email Address.');
      return;
    }

    setIsLoggingIn(true);
    setLoginErrorMessage(null);

    try {
      const result = await loginCandidate(loginInputs.fullName.trim(), loginInputs.email.trim());

      const candidateName = result?.profile?.fullName || loginInputs.fullName.trim();
      const candidateEmail = result?.profile?.email || loginInputs.email.trim();
      const candidatePhone = result?.profile?.phone || profile.phone || '';

      const updatedProfile = {
        ...profile,
        ...(result?.profile || {}),
        fullName: candidateName,
        email: candidateEmail,
        phone: candidatePhone
      };

      setProfile(updatedProfile);

      if (result?.applications && Array.isArray(result.applications) && result.applications.length > 0) {
        setAppliedJobIds(result.applications);
        if (typeof window !== 'undefined') {
          localStorage.setItem('arani_applied_jobs', JSON.stringify(result.applications));
        }
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('arani_candidate_profile', JSON.stringify(updatedProfile));
        localStorage.setItem(
          'arani_role_registration',
          JSON.stringify({
            role: 'Candidate',
            name: candidateName,
            email: candidateEmail,
            phone: candidatePhone,
            status: 'Active',
            wizardStep: 2
          })
        );
      }

      setIsLoggingIn(false);
      setShowLoginModal(false);
      setLoginInputs({ fullName: '', email: '' });
      showToast(`Welcome, ${candidateName}! Your candidate profile and jobs are active.`);
    } catch (err: any) {
      console.warn('Login fallback:', err);
      const updatedProfile = {
        ...profile,
        fullName: loginInputs.fullName.trim(),
        email: loginInputs.email.trim()
      };
      setProfile(updatedProfile);
      if (typeof window !== 'undefined') {
        localStorage.setItem('arani_candidate_profile', JSON.stringify(updatedProfile));
        localStorage.setItem(
          'arani_role_registration',
          JSON.stringify({
            role: 'Candidate',
            name: loginInputs.fullName.trim(),
            email: loginInputs.email.trim(),
            phone: profile.phone || '',
            status: 'Active',
            wizardStep: 1
          })
        );
      }
      setIsLoggingIn(false);
      setShowLoginModal(false);
      setLoginInputs({ fullName: '', email: '' });
      showToast(`Logged in as ${loginInputs.fullName.trim()}!`);
    }
  };

  const handleCandidateLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('arani_role_registration');
      localStorage.removeItem('arani_candidate_profile');
      localStorage.removeItem('arani_applied_jobs');
    }
    setProfile({
      fullName: '',
      email: '',
      phone: '',
      city: 'Mumbai',
      education: 'Graduate / Post-Graduate',
      currentCompany: 'Banking / Corporate Firm',
      currentRole: 'Credit Analyst / Banking Officer',
      experienceYears: '1-3 Years',
      expectedCtc: '₹6,00,000 - ₹12,00,000 / yr',
      noticePeriod: '30 Days',
      skills: 'Banking Operations, Credit Analysis, Customer Relationship, KYC & Compliance, Financial Evaluation',
      preferredLocation: 'Mumbai / Hybrid'
    });
    setAppliedJobIds([]);
    setSavedJobIds([]);
    setWizardStep(1);
    showToast('Signed out of candidate session.');
  };

  // Compute AI Job Matches based on profile skills & experience
  const computeAiRecommendations = (): RecommendedJob[] => {
    const skillsLower = (profile.skills || '').toLowerCase();
    const roleLower = (profile.currentRole || '').toLowerCase();
    const expLower = (profile.experienceYears || '').toLowerCase();

    return allJobs.map((job) => {
      let score = 78;
      const reasons: string[] = [];

      if (job.category === 'Banking' && (roleLower.includes('bank') || roleLower.includes('credit') || skillsLower.includes('credit') || skillsLower.includes('bank'))) {
        score += 16;
        reasons.push('Matches your Banking & Credit domain experience');
      } else if ((job.category as string) === 'Finance' && (skillsLower.includes('financial') || skillsLower.includes('kyc') || skillsLower.includes('eval'))) {
        score += 14;
        reasons.push('Fits your Financial operations & Compliance skillset');
      } else if (job.category === 'Corporate' || (job.category as string) === 'Operations') {
        score += 10;
        reasons.push('Matches Corporate & Operational workflow skills');
      }

      if (job.location.toLowerCase().includes((profile.city || 'mumbai').toLowerCase())) {
        score += 5;
        reasons.push(`Direct opening in ${profile.city || 'your preferred city'}`);
      }

      if (job.experience.includes('1') || expLower.includes('1') || expLower.includes('3')) {
        score += 4;
        reasons.push('Matches your experience tier');
      }

      if (reasons.length === 0) {
        reasons.push('Verified enterprise opening matching your qualifications');
      }

      const boundedScore = Math.min(Math.max(score, 82), 98);

      return {
        ...job,
        matchScore: boundedScore,
        matchReasons: reasons.slice(0, 2)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const recommendedJobs = computeAiRecommendations();

  // Handle Resume Upload
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeUploaded(file.name);

      try {
        const { uploadToSupabaseStorage } = await import('@/lib/supabase');
        await uploadToSupabaseStorage('counselling_resumes', file, 'candidate_resumes');
        showToast(`CV "${file.name}" uploaded successfully!`);
      } catch (err) {
        showToast(`CV "${file.name}" attached to your profile!`);
      }
    }
  };

  // Handle Step 1 Submission -> Step 2
  const handleProceedToJobs = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { saveCandidateProfile } = await import('@/lib/supabase');
      await saveCandidateProfile({
        ...profile,
        resumeUrl: resumeUploaded
      });
    } catch (err) {
      console.warn('Could not save candidate to Supabase', err);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('arani_candidate_profile', JSON.stringify(profile));
      localStorage.setItem('arani_role_registration', JSON.stringify({
        role: 'Candidate',
        name: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        resume_url: resumeUploaded,
        status: 'Active'
      }));
    }

    setIsSaving(false);
    setWizardStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Profile saved! Generating your AI job recommendations...');
  };

  // Re-run AI Matching
  const triggerAiReMatch = () => {
    setIsAiMatching(true);
    setTimeout(() => {
      setIsAiMatching(false);
      showToast('AI recommendations refreshed for your latest profile!');
    }, 800);
  };

  // Apply to Job
  const handleApplyJob = (job: Job) => {
    if (appliedJobIds.includes(job.id)) {
      showToast(`You have already applied for ${job.title}.`);
      return;
    }

    const updated = [job.id, ...appliedJobIds];
    setAppliedJobIds(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('arani_applied_jobs', JSON.stringify(updated));
    }
    showToast(`Application submitted for ${job.title}! Recruiter will review shortly.`);
  };

  // Toggle Save Job
  const toggleSaveJob = (jobId: string) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter((id) => id !== jobId));
      showToast('Removed from saved list');
    } else {
      setSavedJobIds([jobId, ...savedJobIds]);
      showToast('Job saved to your bookmarks!');
    }
  };

  // Filtered manual jobs
  const filteredJobs = allJobs.filter((job) => {
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      job.title.toLowerCase().includes(q) ||
      job.companyName.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.requirements.some((r) => r.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-paper text-ink-900 flex flex-col font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink-900 text-surface px-4 py-3 rounded-lg shadow-xl border border-teal-500/50 flex items-center gap-3 animate-fadeIn max-w-md">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="text-xs font-mono font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate hover:text-surface ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Clean Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-line shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AraniLogo className="h-9" variant="dark" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {appliedJobIds.length > 0 && (
              <button
                onClick={() => setShowApplicationsModal(true)}
                className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100/80 text-teal-800 border border-teal-200 text-xs font-mono font-bold rounded-lg transition flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                <span>My Applications ({appliedJobIds.length})</span>
              </button>
            )}

            {/* Candidate Login / Switch Account Button */}
            <button
              onClick={() => {
                setLoginErrorMessage(null);
                setLoginInputs({
                  fullName: profile.fullName || '',
                  email: profile.email || ''
                });
                setShowLoginModal(true);
              }}
              className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-mono font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Candidate Login</span>
              <span className="xs:hidden">Login</span>
            </button>

            {profile.fullName ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-slate bg-slate-50 px-3 py-1.5 rounded-full border border-line">
                  <span className="w-2 h-2 rounded-full bg-ok animate-pulse" />
                  <span className="font-bold text-ink-900 truncate max-w-[100px] sm:max-w-[140px]">
                    {profile.fullName}
                  </span>
                </div>
                <button
                  onClick={handleCandidateLogout}
                  title="Sign Out"
                  className="p-1.5 text-slate hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        
        {/* Returning Candidate Quick Login Banner */}
        {!profile.fullName && (
          <div className="bg-gradient-to-r from-teal-50 via-teal-100/40 to-surface border border-teal-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-surface flex items-center justify-center shrink-0">
                <LogIn className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-sm text-ink-950">
                  Returning Candidate? Login with Full Name &amp; Email ID
                </h2>
                <p className="text-xs text-slate mt-0.5">
                  Restore your saved preferences, resume, submitted applications, and personalized AI job matches.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setLoginErrorMessage(null);
                setLoginInputs({ fullName: '', email: '' });
                setShowLoginModal(true);
              }}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-surface font-bold text-xs rounded-lg transition shrink-0 flex items-center gap-1.5 shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login Now</span>
            </button>
          </div>
        )}
        
        {/* WIZARD STEPPER BAR */}
        <div className="bg-surface border border-line rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                AI Job Finder Wizard
              </span>
              <h1 className="text-xl sm:text-2xl font-display font-extrabold text-ink-950 mt-1">
                {wizardStep === 1 ? 'Step 1: Build Your Profile' : 'Step 2: Jobs Recommended For You'}
              </h1>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="font-bold text-teal-600">Step {wizardStep}</span>
              <span className="text-slate"> / 2</span>
            </div>
          </div>

          {/* Visual 2-Step Progress Indicator */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setWizardStep(1)}
              className={`p-3 rounded-xl border-2 transition text-left flex items-center gap-3 ${
                wizardStep === 1
                  ? 'bg-teal-50/80 border-teal-500 shadow-xs'
                  : 'bg-surface border-line text-slate hover:border-teal-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                wizardStep === 1 ? 'bg-teal-500 text-surface' : 'bg-teal-100 text-teal-800'
              }`}>
                {wizardStep === 2 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-ink-950 text-xs sm:text-sm truncate">1. Profile &amp; CV</div>
                <div className="text-[11px] text-slate truncate">Enter details &amp; optional CV</div>
              </div>
            </button>

            <button
              onClick={() => setWizardStep(2)}
              className={`p-3 rounded-xl border-2 transition text-left flex items-center gap-3 ${
                wizardStep === 2
                  ? 'bg-teal-50/80 border-teal-500 shadow-xs'
                  : 'bg-surface border-line text-slate hover:border-teal-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                wizardStep === 2 ? 'bg-teal-500 text-surface' : 'bg-slate-100 text-slate-600'
              }`}>
                2
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-ink-950 text-xs sm:text-sm truncate">2. Jobs For You</div>
                <div className="text-[11px] text-slate truncate">AI Matches &amp; 1-Click Apply</div>
              </div>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STEP 1: PROFILE BUILDER & CV CAPTURE                         */}
        {/* ============================================================ */}
        {wizardStep === 1 && (
          <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 shadow-card space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-ink-950">
                Fill Your Details for AI Job Auto-Matching
              </h2>
              <p className="text-xs sm:text-sm text-slate mt-1">
                Enter your work background and preferences below. You can also attach your CV if available.
              </p>
            </div>

            <form onSubmit={handleProceedToJobs} className="space-y-6">
              
              {/* Optional CV Upload Box */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-teal-50/60 to-surface border-2 border-dashed border-teal-300 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500 text-surface flex items-center justify-center shrink-0 shadow-xs">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-ink-950 flex items-center gap-2">
                        Upload Your CV / Resume (Optional)
                      </div>
                      <p className="text-xs text-slate mt-0.5">
                        Have a resume ready? Upload it to boost recruiter shortlists. Don&apos;t have one? Simply fill the fields below!
                      </p>
                    </div>
                  </div>

                  <label className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface font-mono font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer transition shadow-xs flex items-center justify-center gap-2 shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>{resumeUploaded ? 'Change CV' : 'Upload CV'}</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {resumeUploaded && (
                  <div className="p-2.5 bg-surface border border-teal-200 rounded-lg flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-teal-900 font-bold truncate">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="truncate">Attached: {resumeUploaded}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeUploaded(null)}
                      className="text-slate hover:text-red-500 text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* 1. Basic Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase text-teal-800 tracking-wider flex items-center gap-1.5 border-b border-line pb-2">
                  <User className="w-4 h-4 text-teal-600" />
                  <span>1. Contact &amp; Location Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Current City *</label>
                    <input
                      type="text"
                      required
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      placeholder="e.g. Mumbai / Delhi NCR / Pune"
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Highest Qualification *</label>
                    <input
                      type="text"
                      required
                      value={profile.education}
                      onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                      placeholder="e.g. MBA / B.Com / B.Tech / Any Graduate"
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Preferred Location</label>
                    <input
                      type="text"
                      value={profile.preferredLocation}
                      onChange={(e) => setProfile({ ...profile, preferredLocation: e.target.value })}
                      placeholder="e.g. Mumbai / Hybrid / Remote"
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Professional Background */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase text-teal-800 tracking-wider flex items-center gap-1.5 border-b border-line pb-2">
                  <Briefcase className="w-4 h-4 text-teal-600" />
                  <span>2. Experience &amp; Role Preferences</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Current / Target Role *</label>
                    <input
                      type="text"
                      required
                      value={profile.currentRole}
                      onChange={(e) => setProfile({ ...profile, currentRole: e.target.value })}
                      placeholder="e.g. Credit Analyst, Branch Executive"
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Total Experience *</label>
                    <select
                      value={profile.experienceYears}
                      onChange={(e) => setProfile({ ...profile, experienceYears: e.target.value })}
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium cursor-pointer"
                    >
                      <option value="Fresher (0-1 Year)">Fresher (0-1 Year)</option>
                      <option value="1-3 Years">1-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5-8 Years">5-8 Years</option>
                      <option value="8+ Years (Senior / Leadership)">8+ Years (Senior / Leadership)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Expected Salary / CTC *</label>
                    <input
                      type="text"
                      required
                      value={profile.expectedCtc}
                      onChange={(e) => setProfile({ ...profile, expectedCtc: e.target.value })}
                      placeholder="e.g. ₹8,00,000 / yr"
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Current / Previous Company</label>
                    <input
                      type="text"
                      value={profile.currentCompany}
                      onChange={(e) => setProfile({ ...profile, currentCompany: e.target.value })}
                      placeholder="e.g. HDFC, ICICI, Axis or Any Firm"
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Notice Period *</label>
                    <select
                      value={profile.noticePeriod}
                      onChange={(e) => setProfile({ ...profile, noticePeriod: e.target.value })}
                      className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium cursor-pointer"
                    >
                      <option value="Immediate Joiner">Immediate Joiner</option>
                      <option value="15 Days">15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="60 Days">60 Days</option>
                      <option value="90 Days">90 Days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1">
                    Key Skills &amp; Domain Expertise (Comma Separated) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={profile.skills}
                    onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                    placeholder="e.g. Banking Operations, Credit Risk, KYC Verification, Customer Relationship, Financial Modeling"
                    className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
              </div>

              {/* Action Button: Next to Jobs */}
              <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate">
                  <ShieldCheck className="w-4 h-4 text-ok" />
                  <span>100% Confidential &amp; Verified Recruiter Portal</span>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-8 py-3.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-surface font-mono font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{isSaving ? 'Saving Profile...' : 'Next: Find Recommended Jobs'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: JOBS FOR YOU (AI RECOMMENDED & MANUAL EXPLORATION)   */}
        {/* ============================================================ */}
        {wizardStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Match Summary & Controls */}
            <div className="bg-gradient-to-r from-teal-900 to-ink-950 text-surface rounded-2xl p-6 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-teal-500/20 border border-teal-400/30 text-teal-300 text-[11px] font-mono font-bold uppercase mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    AI Auto-Match Active
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-surface">
                    Recommended Openings for {profile.fullName || 'You'}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                    Matched against your background: <span className="text-teal-300 font-bold">{profile.currentRole}</span> ({profile.experienceYears}) • Expected: <span className="text-teal-300 font-bold">{profile.expectedCtc}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={triggerAiReMatch}
                    disabled={isAiMatching}
                    className="px-3.5 py-2 bg-surface/10 hover:bg-surface/20 text-surface border border-surface/20 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isAiMatching ? 'animate-spin' : ''}`} />
                    <span>{isAiMatching ? 'Matching...' : 'Re-Match AI'}</span>
                  </button>

                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-3.5 py-2 bg-teal-500 hover:bg-teal-600 text-surface rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Sub-Tabs: AI Recommended vs All Openings */}
              <div className="flex items-center gap-2 pt-2 border-t border-surface/10">
                <button
                  onClick={() => setActiveSubTab('ai')}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition flex items-center gap-2 ${
                    activeSubTab === 'ai'
                      ? 'bg-surface text-ink-950 shadow-xs'
                      : 'text-slate-300 hover:text-surface'
                  }`}
                >
                  <Target className="w-3.5 h-3.5 text-teal-600" />
                  <span>AI Recommended ({recommendedJobs.length})</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('all')}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition flex items-center gap-2 ${
                    activeSubTab === 'all'
                      ? 'bg-surface text-ink-950 shadow-xs'
                      : 'text-slate-300 hover:text-surface'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-teal-600" />
                  <span>Browse All Openings ({allJobs.length})</span>
                </button>
              </div>
            </div>

            {/* TAB 1: AI RECOMMENDED JOBS */}
            {activeSubTab === 'ai' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate">
                  <span>Sorted by AI Relevance Score</span>
                  <span>{recommendedJobs.length} Verified Openings</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {recommendedJobs.map((job) => {
                    const isApplied = appliedJobIds.includes(job.id);
                    const isSaved = savedJobIds.includes(job.id);

                    return (
                      <div
                        key={job.id}
                        className="bg-surface border border-line hover:border-teal-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-xs hover:shadow-md space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                                {job.category}
                              </span>
                              <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-emerald-600" />
                                {job.matchScore}% Match
                              </span>
                              <span className="font-mono text-[10px] text-slate">ID: {job.id}</span>
                            </div>

                            <h3 className="text-base sm:text-lg font-display font-bold text-ink-950 pt-1">
                              {job.title}
                            </h3>

                            <div className="flex items-center gap-4 text-xs text-slate flex-wrap pt-0.5">
                              <span className="flex items-center gap-1 font-medium text-ink-900">
                                <Building2 className="w-3.5 h-3.5 text-teal-600" />
                                {job.companyName}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1 font-bold text-teal-700">
                                <DollarSign className="w-3.5 h-3.5" />
                                {job.salary}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                                {job.experience}
                              </span>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className={`p-2 rounded-lg border transition ${
                                isSaved
                                  ? 'bg-teal-50 border-teal-300 text-teal-700'
                                  : 'border-line text-slate hover:text-ink-900 bg-paper'
                              }`}
                              title="Bookmark Opening"
                            >
                              <Bookmark className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setSelectedJob(job)}
                              className="px-3.5 py-2 bg-paper hover:bg-slate-100 text-ink-900 border border-line rounded-lg text-xs font-mono font-bold transition"
                            >
                              View Details
                            </button>

                            <button
                              onClick={() => handleApplyJob(job)}
                              disabled={isApplied}
                              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition shadow-xs flex items-center gap-1.5 ${
                                isApplied
                                  ? 'bg-ok/10 text-ok border border-ok/30 cursor-default'
                                  : 'bg-teal-500 hover:bg-teal-600 text-surface'
                              }`}
                            >
                              {isApplied ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Applied</span>
                                </>
                              ) : (
                                <>
                                  <Zap className="w-3.5 h-3.5" />
                                  <span>1-Click Apply</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Match Reasons */}
                        <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl space-y-1.5 text-xs">
                          <div className="font-mono text-[11px] font-bold text-teal-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                            Why you match this role:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {job.matchReasons.map((reason, i) => (
                              <span key={i} className="inline-flex items-center gap-1 text-[11px] text-teal-800 bg-surface px-2 py-0.5 rounded border border-teal-200/60 font-medium">
                                <Check className="w-3 h-3 text-teal-600" />
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: MANUAL BROWSE & APPLY */}
            {activeSubTab === 'all' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="bg-surface border border-line rounded-xl p-4 shadow-xs space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-8 relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title, skills, bank name or city..."
                        className="w-full pl-9 pr-4 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-paper border border-line rounded-lg text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-medium cursor-pointer"
                      >
                        <option value="All">All Sectors</option>
                        <option value="Banking">Banking</option>
                        <option value="Finance">Finance</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Operations">Operations</option>
                        <option value="IT & Fintech">IT &amp; Fintech</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Job Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {filteredJobs.map((job) => {
                    const isApplied = appliedJobIds.includes(job.id);
                    const isSaved = savedJobIds.includes(job.id);

                    return (
                      <div
                        key={job.id}
                        className="bg-surface border border-line hover:border-teal-500/50 rounded-2xl p-5 sm:p-6 transition shadow-xs hover:shadow-md space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                                {job.category}
                              </span>
                              <span className="font-mono text-[10px] text-slate">ID: {job.id}</span>
                            </div>

                            <h3 className="text-base sm:text-lg font-display font-bold text-ink-950">
                              {job.title}
                            </h3>

                            <div className="flex items-center gap-4 text-xs text-slate flex-wrap">
                              <span className="font-medium text-ink-900">{job.companyName}</span>
                              <span>• {job.location}</span>
                              <span className="font-bold text-teal-700">• {job.salary}</span>
                              <span>• {job.experience}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className={`p-2 rounded-lg border transition ${
                                isSaved
                                  ? 'bg-teal-50 border-teal-300 text-teal-700'
                                  : 'border-line text-slate hover:text-ink-900 bg-paper'
                              }`}
                            >
                              <Bookmark className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setSelectedJob(job)}
                              className="px-3.5 py-2 bg-paper hover:bg-slate-100 text-ink-900 border border-line rounded-lg text-xs font-mono font-bold transition"
                            >
                              View
                            </button>

                            <button
                              onClick={() => handleApplyJob(job)}
                              disabled={isApplied}
                              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition shadow-xs flex items-center gap-1.5 ${
                                isApplied
                                  ? 'bg-ok/10 text-ok border border-ok/30 cursor-default'
                                  : 'bg-teal-500 hover:bg-teal-600 text-surface'
                              }`}
                            >
                              {isApplied ? 'Applied' : 'Apply Now'}
                            </button>
                          </div>
                        </div>

                        {/* Requirements snippet */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.requirements.slice(0, 3).map((req, i) => (
                            <span key={i} className="text-[11px] bg-paper text-slate px-2 py-0.5 rounded border border-line">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* Candidate Login Modal (Full Name & Email ID) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-ink-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-surface border border-line rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl my-auto animate-fadeIn relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate hover:text-ink-900 hover:bg-paper transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-2">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-3">
                <LogIn className="w-6 h-6" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-teal-600 font-bold block mb-1">
                {"// CANDIDATE PORTAL ACCESS"}
              </span>
              <h3 className="text-xl font-display font-bold text-ink-950">
                Candidate Login
              </h3>
              <p className="text-xs text-slate mt-1 max-w-xs mx-auto">
                Enter your Full Name and Email ID to load your profile, applications, and AI job recommendations.
              </p>
            </div>

            {loginErrorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{loginErrorMessage}</span>
              </div>
            )}

            <form onSubmit={handleCandidateLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-900 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    className="w-full pl-9 pr-3 py-2.5 border border-line rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm bg-surface text-ink-900"
                    placeholder="e.g. Rahul Sharma"
                    value={loginInputs.fullName}
                    onChange={(e) => setLoginInputs({ ...loginInputs, fullName: e.target.value })}
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="email"
                    className="w-full pl-9 pr-3 py-2.5 border border-line rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm bg-surface text-ink-900"
                    placeholder="e.g. rahul.sharma@example.com"
                    value={loginInputs.email}
                    onChange={(e) => setLoginInputs({ ...loginInputs, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg flex items-start gap-2 text-xs text-teal-900">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  No password required. Login instantly with your registered name &amp; email.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-surface font-bold py-2.5 rounded-lg transition text-sm flex items-center justify-center gap-2 shadow-xs"
              >
                {isLoggingIn ? (
                  <span>Logging in...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Login with Name &amp; Email</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal for Selected Job */}
      {selectedJob && (
        <JobQuickModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApplySuccess={() => {
            handleApplyJob(selectedJob);
            setSelectedJob(null);
          }}
        />
      )}

      {/* Applications Modal */}
      {showApplicationsModal && (
        <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="text-lg font-display font-bold text-ink-950 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-teal-600" />
                <span>My Submitted Applications</span>
              </h3>
              <button
                onClick={() => setShowApplicationsModal(false)}
                className="text-slate hover:text-ink-900 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {appliedJobIds.map((jobId) => {
                const job = allJobs.find((j) => j.id === jobId);
                if (!job) return null;

                return (
                  <div key={jobId} className="p-4 bg-paper border border-line rounded-xl space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {job.category}
                        </span>
                        <h4 className="font-bold text-ink-950 text-sm mt-1">{job.title}</h4>
                        <p className="text-xs text-slate">{job.companyName} • {job.location}</p>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-ok bg-ok/10 px-2 py-1 rounded border border-ok/20">
                        Screening In Progress
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
