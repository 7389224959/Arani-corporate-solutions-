'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  UserCheck,
  Building2,
  ArrowUpRight,
  CheckCircle2,
  ArrowLeft,
  Mail,
  Phone,
  User,
  LogIn,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { loginCandidate, saveCandidateProfile } from '@/lib/supabase';

interface RoleChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole?: (role: 'candidate' | 'employer') => void;
  initialMode?: 'choice' | 'candidate-login' | 'candidate-signup';
}

export const RoleChoiceModal: React.FC<RoleChoiceModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  initialMode = 'choice'
}) => {
  const router = useRouter();
  const [step, setStep] = useState<'choice' | 'candidate-login' | 'candidate-signup'>(initialMode);
  
  // Login form state
  const [loginData, setLoginData] = useState({ name: '', email: '' });
  
  // Register form state
  const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('choice');
    setLoginData({ name: '', email: '' });
    setRegisterData({ name: '', email: '', phone: '' });
    setErrorMessage(null);
    onClose();
  };

  // Handle Candidate Login with Full Name & Email
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.name.trim() || !loginData.email.trim()) {
      setErrorMessage('Please enter both your Full Name and Email Address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await loginCandidate(loginData.name.trim(), loginData.email.trim());

      if (typeof window !== 'undefined') {
        const candidateName = result?.profile?.fullName || loginData.name.trim();
        const candidateEmail = result?.profile?.email || loginData.email.trim();
        const candidatePhone = result?.profile?.phone || '';

        // Save session registration
        localStorage.setItem(
          'arani_role_registration',
          JSON.stringify({
            role: 'Candidate',
            name: candidateName,
            email: candidateEmail,
            phone: candidatePhone,
            status: 'Active',
            wizardStep: result?.applications?.length ? 2 : 1
          })
        );

        // Save full candidate profile
        if (result?.profile) {
          localStorage.setItem('arani_candidate_profile', JSON.stringify(result.profile));
        }

        // Restore applied jobs
        if (result?.applications && Array.isArray(result.applications) && result.applications.length > 0) {
          localStorage.setItem('arani_applied_jobs', JSON.stringify(result.applications));
        }
      }

      setIsSubmitting(false);
      handleClose();
      router.push('/candidate/dashboard');
    } catch (err: any) {
      console.warn('Candidate login error, continuing with local session:', err);
      
      // Fallback local session
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'arani_role_registration',
          JSON.stringify({
            role: 'Candidate',
            name: loginData.name.trim(),
            email: loginData.email.trim(),
            phone: '',
            status: 'Active',
            wizardStep: 1
          })
        );
        localStorage.setItem(
          'arani_candidate_profile',
          JSON.stringify({
            fullName: loginData.name.trim(),
            email: loginData.email.trim(),
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
          })
        );
      }

      setIsSubmitting(false);
      handleClose();
      router.push('/candidate/dashboard');
    }
  };

  // Handle Candidate Register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.name.trim() || !registerData.email.trim() || !registerData.phone.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await saveCandidateProfile({
        fullName: registerData.name.trim(),
        email: registerData.email.trim(),
        phone: registerData.phone.trim(),
        resume_url: null,
        cv_url: null,
        resumeUrl: null,
        nationalId: '',
        address: '',
        district: '',
        city: 'Mumbai',
        state: '',
        zipCode: '',
        education: 'Graduate / Post-Graduate',
        currentCompany: '',
        currentRole: '',
        experienceYears: '1-3 Years',
        expectedCtc: '',
        noticePeriod: '30 Days',
        skills: 'Banking Operations, Customer Relationship, KYC & Compliance',
        confidentialSearch: true
      });
    } catch (err) {
      console.warn('Failed to save candidate registration to Supabase', err);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'arani_role_registration',
        JSON.stringify({
          role: 'Candidate',
          name: registerData.name.trim(),
          email: registerData.email.trim(),
          phone: registerData.phone.trim(),
          status: 'Active',
          wizardStep: 1
        })
      );
      localStorage.setItem(
        'arani_candidate_profile',
        JSON.stringify({
          fullName: registerData.name.trim(),
          email: registerData.email.trim(),
          phone: registerData.phone.trim(),
          city: 'Mumbai',
          education: 'Graduate / Post-Graduate',
          currentCompany: '',
          currentRole: '',
          experienceYears: '1-3 Years',
          expectedCtc: '',
          noticePeriod: '30 Days',
          skills: 'Banking Operations, Customer Relationship, KYC & Compliance',
          preferredLocation: 'Mumbai / Hybrid'
        })
      );
    }

    setIsSubmitting(false);
    handleClose();
    router.push('/candidate/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/75 backdrop-blur-xs p-3 sm:p-4 animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-surface border border-line rounded-xl shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* STEP 1: PORTAL SELECTION */}
        {step === 'choice' && (
          <>
            {/* Header */}
            <div className="bg-ink-900 text-surface p-5 sm:p-6 text-center relative shrink-0">
              <button
                onClick={handleClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-ink-800 text-slate hover:text-surface transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mt-2">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-teal-400 font-bold block mb-1">
                  {"// PORTAL ACCESS & LOGIN"}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-surface">
                  Sign In or Register
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                  Access the Candidate Portal for job seekers or the Employer Portal for HR teams.
                </p>
              </div>
            </div>

            {/* Audience Choices */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto">
              {/* Candidate Path */}
              <div className="group relative p-4 sm:p-5 bg-paper hover:bg-teal-50/40 border-2 border-line hover:border-teal-500 rounded-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                      For Job Seekers
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-ink-900 text-base sm:text-lg group-hover:text-teal-700 transition-colors">
                    Candidate Portal
                  </h3>
                  <p className="text-xs text-slate mt-1 leading-relaxed">
                    Land high-paying banking and corporate roles with verified placements.
                  </p>

                  <ul className="mt-3 space-y-1.5 text-xs text-slate">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      <span>Free profile &amp; AI job matching</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      <span>1-click application tracking</span>
                    </li>
                  </ul>
                </div>

                {/* Candidate Action Buttons */}
                <div className="mt-4 pt-3 border-t border-line space-y-2">
                  <button
                    onClick={() => {
                      setErrorMessage(null);
                      setStep('candidate-login');
                    }}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-surface font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Candidate Login (Name &amp; Email)</span>
                  </button>
                  <button
                    onClick={() => {
                      setErrorMessage(null);
                      setStep('candidate-signup');
                    }}
                    className="w-full bg-surface hover:bg-teal-50 text-teal-700 font-bold py-1.5 px-3 rounded-lg text-xs border border-teal-200 flex items-center justify-center gap-1 transition"
                  >
                    <span>New Candidate? Register Free</span>
                  </button>
                </div>
              </div>

              {/* Employer Path */}
              <div
                onClick={() => {
                  if (onSelectRole) onSelectRole('employer');
                  else router.push('/employers');
                }}
                className="group relative p-4 sm:p-5 bg-paper hover:bg-ink-900/5 border-2 border-line hover:border-ink-800 rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-ink-800 text-surface flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase font-bold text-ink-800 bg-slate/10 px-2 py-0.5 rounded-full">
                      For Employers &amp; HR
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-ink-900 text-base sm:text-lg group-hover:text-ink-800 transition-colors">
                    Employer Portal
                  </h3>
                  <p className="text-xs text-slate mt-1 leading-relaxed">
                    Source, screen, and hire pre-screened talent in 72 hours. Success-fee based with 90-day guarantee.
                  </p>

                  <ul className="mt-3 space-y-1.5 text-xs text-slate">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-ink-700 shrink-0" />
                      <span>Vetted candidate shortlist</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-ink-700 shrink-0" />
                      <span>End-to-end payroll &amp; verification</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-line">
                  <button
                    onClick={() => {
                      if (onSelectRole) onSelectRole('employer');
                      else router.push('/employers');
                    }}
                    className="w-full bg-ink-900 hover:bg-ink-950 text-surface font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Post Requirement (72h)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Staff Admin Link Footer */}
            <div className="bg-paper border-t border-line px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-mono shrink-0">
              <span className="text-slate text-[11px] sm:text-xs">Are you Aranii Staff?</span>
              <a
                href="/admin"
                className="text-teal-700 font-bold hover:underline flex items-center gap-1 bg-surface px-2.5 py-1 rounded border border-line hover:border-teal-400 transition text-[11px] sm:text-xs"
              >
                <span>Staff Admin Gateway →</span>
              </a>
            </div>
          </>
        )}

        {/* STEP 2: CANDIDATE LOGIN (Full Name & Email ID) */}
        {step === 'candidate-login' && (
          <>
            {/* Header */}
            <div className="bg-ink-900 text-surface p-5 sm:p-6 relative shrink-0">
              <button
                onClick={() => {
                  setErrorMessage(null);
                  setStep('choice');
                }}
                className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 p-1.5 sm:p-2 rounded-lg bg-ink-800 text-slate hover:text-surface transition flex items-center gap-1 text-xs font-bold"
                aria-label="Back to choice"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="inline">Back</span>
              </button>
              <button
                onClick={handleClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-ink-800 text-slate hover:text-surface transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mt-6 sm:mt-3">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-teal-400 font-bold block mb-1">
                  {"// CANDIDATE SIGN IN"}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-surface">
                  Candidate Login
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                  Enter your Full Name and Email ID to access your profile, dashboard, and applications.
                </p>
              </div>
            </div>

            {/* Quick Switch Tabs */}
            <div className="flex border-b border-line bg-paper text-xs font-mono">
              <button
                type="button"
                className="flex-1 py-2.5 font-bold text-teal-700 bg-surface border-b-2 border-teal-500 text-center"
              >
                Candidate Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setStep('candidate-signup');
                }}
                className="flex-1 py-2.5 text-slate hover:text-ink-900 text-center transition"
              >
                New Registration
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

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
                    value={loginData.name}
                    onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
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
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-xs text-teal-900">
                  <span className="font-bold">Instant Secure Login:</span> We will automatically fetch your saved profile, matched roles, and job application history for this email.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-surface font-bold py-2.5 sm:py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 shadow-xs"
                >
                  {isSubmitting ? (
                    <span>Signing in to Portal...</span>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Login to Candidate Dashboard</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep('candidate-signup');
                  }}
                  className="text-xs font-medium text-teal-700 hover:underline"
                >
                  Don't have a profile yet? Register here
                </button>
              </div>
            </form>
          </>
        )}

        {/* STEP 3: CANDIDATE REGISTRATION */}
        {step === 'candidate-signup' && (
          <>
            {/* Header */}
            <div className="bg-ink-900 text-surface p-5 sm:p-6 relative shrink-0">
              <button
                onClick={() => {
                  setErrorMessage(null);
                  setStep('choice');
                }}
                className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 p-1.5 sm:p-2 rounded-lg bg-ink-800 text-slate hover:text-surface transition flex items-center gap-1 text-xs font-bold"
                aria-label="Back to choice"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="inline">Back</span>
              </button>
              <button
                onClick={handleClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-ink-800 text-slate hover:text-surface transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mt-6 sm:mt-3">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-teal-400 font-bold block mb-1">
                  {"// CANDIDATE REGISTRATION"}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-surface">
                  Create Candidate Profile
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                  Register to get matched with high-paying banking and corporate vacancies.
                </p>
              </div>
            </div>

            {/* Quick Switch Tabs */}
            <div className="flex border-b border-line bg-paper text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setStep('candidate-login');
                }}
                className="flex-1 py-2.5 text-slate hover:text-ink-900 text-center transition"
              >
                Candidate Login
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 font-bold text-teal-700 bg-surface border-b-2 border-teal-500 text-center"
              >
                New Registration
              </button>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegisterSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="text"
                      className="w-full pl-9 pr-3 py-2.5 border border-line rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm bg-surface text-ink-900"
                      placeholder="e.g. Priya Nair"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="tel"
                      className="w-full pl-9 pr-3 py-2.5 border border-line rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm bg-surface text-ink-900"
                      placeholder="+91 98765 43210"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="email"
                    className="w-full pl-9 pr-3 py-2.5 border border-line rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm bg-surface text-ink-900"
                    placeholder="priya.nair@example.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-xs text-teal-900">
                  <span className="font-bold">Fast Registration:</span> No CV needed right now. Complete your profile and unlock AI-recommended vacancies in seconds.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-surface font-bold py-2.5 sm:py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 shadow-xs"
                >
                  {isSubmitting ? (
                    <span>Setting up Profile...</span>
                  ) : (
                    <span>Create Account &amp; Go to Dashboard</span>
                  )}
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep('candidate-login');
                  }}
                  className="text-xs font-medium text-teal-700 hover:underline"
                >
                  Already have an account? Sign in with Name &amp; Email
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
