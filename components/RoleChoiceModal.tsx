'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Mail,
  Phone,
  User,
  LogIn,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Briefcase,
  Building2,
  Award,
  Zap,
  Compass,
  Lock
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

  useEffect(() => {
    if (isOpen) {
      setStep(initialMode);
      setErrorMessage(null);
    }
  }, [isOpen, initialMode]);

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
            currentCompany: 'Corporate / Operations Firm',
            currentRole: 'Work From Home / Data Entry / KYC Specialist',
            experienceYears: 'Fresher / 0-2 Years',
            expectedCtc: '₹3,00,000 - ₹5,50,000 / yr',
            noticePeriod: 'Immediate',
            skills: 'Data Entry, 30 WPM Typing, MS Excel, KYC Document Verification, Customer Support, WFH Operations',
            preferredLocation: 'Remote / Pan-India'
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
        skills: 'Data Entry, Typing 30 WPM, MS Excel, KYC Document Verification, Customer Support',
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
          currentRole: 'Fresher / Trainee',
          experienceYears: '0-1 Years',
          expectedCtc: '',
          noticePeriod: 'Immediate',
          skills: 'Data Entry, Typing 30 WPM, MS Excel, KYC Document Verification, Customer Support',
          preferredLocation: 'Remote / Pan-India'
        })
      );
    }

    setIsSubmitting(false);
    handleClose();
    router.push('/candidate/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 backdrop-blur-sm p-3 sm:p-4 animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-surface border border-slate-200/80 dark:border-ink-700 rounded-2xl shadow-2xl my-auto max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* STEP 1: CANDIDATE PORTAL OVERVIEW (No employer section - 100% Candidate focused) */}
        {step === 'choice' && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-br from-ink-950 via-ink-900 to-teal-950 text-surface p-6 sm:p-7 relative shrink-0 border-b border-teal-500/20">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-xl bg-surface/10 hover:bg-surface/20 text-slate-300 hover:text-surface transition backdrop-blur-xs"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>Candidate Career Gateway • Professional Consultancy</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-surface tracking-tight leading-tight">
                Candidate Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed max-w-md">
                Fast-track your job search with top private banks, NBFCs, and leading corporate enterprises across India.
              </p>
            </div>

            {/* Portal Content Area */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto bg-surface">
              
              {/* Value Highlights Pill Row */}
              <div className="grid grid-cols-3 gap-2 py-1">
                <div className="p-2.5 bg-paper rounded-xl border border-line text-center flex flex-col items-center justify-center">
                  <Building2 className="w-4 h-4 text-teal-600 mb-1" />
                  <span className="text-[11px] font-bold text-ink-900 leading-tight">Top Banks</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Direct Placements</span>
                </div>
                <div className="p-2.5 bg-paper rounded-xl border border-line text-center flex flex-col items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-500 mb-1" />
                  <span className="text-[11px] font-bold text-ink-900 leading-tight">72h Shortlist</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Priority Line</span>
                </div>
                <div className="p-2.5 bg-paper rounded-xl border border-line text-center flex flex-col items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-teal-600 mb-1" />
                  <span className="text-[11px] font-bold text-ink-900 leading-tight">Verified Roles</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Top Enterprises</span>
                </div>
              </div>

              {/* ⭐ PRIMARY STAR CTA: PREMIUM NEW CANDIDATE REGISTRATION BUTTON */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep('candidate-signup');
                  }}
                  className="w-full text-left group relative overflow-hidden rounded-xl p-5 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 hover:from-teal-700 hover:via-teal-600 hover:to-emerald-700 text-surface shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {/* Subtle decorative glow overlay */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-surface/10 pointer-events-none blur-xl group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface/20 text-[10px] font-mono font-extrabold uppercase tracking-wider text-surface">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Recommended for Job Seekers</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-surface flex items-center gap-2">
                        New Candidate Registration
                      </h3>
                      <p className="text-xs text-teal-100 max-w-xs sm:max-w-sm leading-relaxed">
                        Create your profile in under 60 seconds. Get instantly matched with 2,400+ active corporate openings.
                      </p>
                    </div>

                    <div className="shrink-0 ml-3 w-11 h-11 rounded-xl bg-surface text-teal-700 flex items-center justify-center shadow-md group-hover:translate-x-1 group-hover:bg-teal-50 transition-all">
                      <ArrowRight className="w-5 h-5 font-bold" />
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-surface/20 flex items-center gap-3 text-[11px] text-teal-50 font-medium">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      No CV required upfront
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      Instant application access
                    </span>
                  </div>
                </button>
              </div>

              {/* SECONDARY ACTION: RETURNING CANDIDATE SIGN IN */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep('candidate-login');
                  }}
                  className="w-full text-left p-4 rounded-xl border border-line bg-paper hover:bg-teal-50/40 hover:border-teal-400 transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-teal-100/80 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                      <LogIn className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-display font-bold text-ink-900 group-hover:text-teal-700 transition-colors">
                        Already Registered? Sign In
                      </div>
                      <div className="text-xs text-slate-500">
                        Access saved applications and status via Name &amp; Email
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-teal-600 group-hover:text-teal-700 flex items-center gap-1 shrink-0 ml-2">
                    Sign In
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Trust Badge Guarantee */}
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 flex items-start gap-2.5 text-xs text-teal-950">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold">Candidate Trust Guarantee:</span> Aranii Corporate Solutions provides transparent consultancy terms. Your personal contact details are strictly confidential and only shared with verified corporate interview panels.
                </div>
              </div>

            </div>

            {/* Modal Bottom Footer */}
            <div className="bg-paper border-t border-line px-5 py-3 flex items-center justify-between text-xs shrink-0">
              <span className="text-slate-500 text-[11px]">Need guidance? Call Career Counselling</span>
              <div className="flex items-center gap-3">
                <a
                  href="tel:+919425545374"
                  className="text-teal-700 font-bold hover:underline flex items-center gap-1 text-[11px]"
                >
                  <Phone className="w-3 h-3 text-teal-600" />
                  <span>+91 94255 45374</span>
                </a>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    router.push('/admin');
                  }}
                  className="text-slate-600 hover:text-teal-700 font-mono text-[11px] font-bold flex items-center gap-1 transition"
                  title="Administrator Portal"
                >
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Admin Login</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* STEP 2: CANDIDATE LOGIN (Full Name & Email ID) */}
        {step === 'candidate-login' && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-br from-ink-950 via-ink-900 to-teal-950 text-surface p-5 sm:p-6 relative shrink-0 border-b border-teal-500/20">
              <button
                onClick={() => {
                  setErrorMessage(null);
                  setStep('choice');
                }}
                className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 p-1.5 sm:p-2 rounded-lg bg-surface/10 hover:bg-surface/20 text-slate-200 hover:text-surface transition flex items-center gap-1 text-xs font-bold"
                aria-label="Back to overview"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="inline">Back</span>
              </button>
              <button
                onClick={handleClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-surface/10 hover:bg-surface/20 text-slate-200 hover:text-surface transition"
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
                  Enter your Full Name and Email ID to access your profile, matched roles, and job application history.
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
                className="flex-1 py-2.5 text-slate-600 hover:text-ink-900 text-center transition"
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
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-surface font-bold py-2.5 sm:py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 shadow-sm"
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
                  Don&apos;t have a profile yet? Register here
                </button>
              </div>
            </form>
          </>
        )}

        {/* STEP 3: CANDIDATE REGISTRATION */}
        {step === 'candidate-signup' && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-br from-ink-950 via-ink-900 to-teal-950 text-surface p-5 sm:p-6 relative shrink-0 border-b border-teal-500/20">
              <button
                onClick={() => {
                  setErrorMessage(null);
                  setStep('choice');
                }}
                className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 p-1.5 sm:p-2 rounded-lg bg-surface/10 hover:bg-surface/20 text-slate-200 hover:text-surface transition flex items-center gap-1 text-xs font-bold"
                aria-label="Back to overview"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="inline">Back</span>
              </button>
              <button
                onClick={handleClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-surface/10 hover:bg-surface/20 text-slate-200 hover:text-surface transition"
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
                  Register to get matched with high-paying banking and corporate vacancies in under 60 seconds.
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
                className="flex-1 py-2.5 text-slate-600 hover:text-ink-900 text-center transition"
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
                      autoFocus
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
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-surface font-bold py-2.5 sm:py-3 rounded-lg transition-all text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <span>Setting up Profile...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Create Account &amp; Go to Dashboard</span>
                    </>
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

