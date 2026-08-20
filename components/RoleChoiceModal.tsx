'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, UserCheck, Building2, ArrowUpRight, CheckCircle2, ArrowLeft, Upload, Mail, Phone, User } from 'lucide-react';

interface RoleChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: 'candidate' | 'employer') => void;
}

export const RoleChoiceModal: React.FC<RoleChoiceModalProps> = ({ isOpen, onClose, onSelectRole }) => {
  const router = useRouter();
  const [step, setStep] = useState<'choice' | 'candidate-signup'>('choice');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', cv: null as File | null });

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('choice');
    setFormData({ name: '', email: '', phone: '', cv: null });
    onClose();
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalResumeUrl = null;
    
    // Save to Supabase
    try {
      const { saveCandidateProfile, uploadToSupabaseStorage } = await import('@/lib/supabase');

      if (formData.cv) {
        const url = await uploadToSupabaseStorage('counselling_resumes', formData.cv, 'resumes');
        if (url) {
          finalResumeUrl = url;
        }
      }

      await saveCandidateProfile({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        resume_url: finalResumeUrl,
        cv_url: finalResumeUrl,
        resumeUrl: finalResumeUrl,
        // Default empty values for the other required fields by saveCandidateProfile
        nationalId: '',
        address: '',
        district: '',
        city: '',
        state: '',
        zipCode: '',
        education: '',
        currentCompany: '',
        currentRole: '',
        experienceYears: '',
        expectedCtc: '',
        noticePeriod: '',
        skills: '',
        confidentialSearch: true
      });
    } catch (err) {
      console.warn('Failed to save candidate registration to Supabase', err);
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('arani_role_registration', JSON.stringify({
        role: 'Candidate',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        resume_url: finalResumeUrl,
        cv_url: finalResumeUrl,
        status: 'Active'
      }));
    }

    router.push('/candidate/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 backdrop-blur-xs p-3 sm:p-4 animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-surface border border-line rounded-lg shadow-card my-auto max-h-[90vh] flex flex-col overflow-hidden">
        
        {step === 'choice' && (
          <>
            {/* Header */}
            <div className="bg-ink-900 text-surface p-4 sm:p-6 text-center relative shrink-0">
              <button
                onClick={handleClose}
                className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 p-1.5 sm:p-2 rounded bg-ink-800 text-slate hover:text-surface transition flex items-center gap-1 text-xs font-bold"
                aria-label="Back to site"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="inline">Back</span>
              </button>
              <button
                onClick={handleClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded bg-ink-800 text-slate hover:text-surface transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mt-8 sm:mt-2">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-teal-400 font-bold block mb-1">
                  {"// PORTAL ACCESS & LOGIN"}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold">Select Portal Login & Registration</h2>
                <p className="text-xs text-slate mt-1 max-w-sm mx-auto">
                  Choose Candidate Portal for job seekers or Employer Portal for HR & Hiring teams.
                </p>
              </div>
            </div>

            {/* Audience Choices */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto">
              {/* Candidate Path */}
              <div
                onClick={() => setStep('candidate-signup')}
                className="group relative p-4 sm:p-5 bg-paper hover:bg-teal-50/50 border-2 border-line hover:border-teal-500 rounded-lg cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold text-teal-600 bg-teal-100 px-2 py-0.5 rounded">
                    For Job Seekers
                  </span>
                  <h3 className="font-display font-bold text-ink-900 text-base sm:text-lg mt-2 group-hover:text-teal-600 transition-colors">
                    Candidate Portal
                  </h3>
                  <p className="text-xs text-slate mt-1 leading-relaxed">
                    Land high-paying banking and corporate roles. 100% free with direct interview screening.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Free profile verification
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Apply in 1-click
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs font-bold text-teal-600">
                  <span>Register Free</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Employer Path */}
              <div
                onClick={() => onSelectRole('employer')}
                className="group relative p-4 sm:p-5 bg-paper hover:bg-ink-900/5 border-2 border-line hover:border-ink-800 rounded-lg cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-ink-800 text-surface flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold text-ink-800 bg-slate/10 px-2 py-0.5 rounded">
                    For Employers & HR
                  </span>
                  <h3 className="font-display font-bold text-ink-900 text-base sm:text-lg mt-2 group-hover:text-ink-800 transition-colors">
                    Employer Portal
                  </h3>
                  <p className="text-xs text-slate mt-1 leading-relaxed">
                    Source, screen, and hire vetted talent in 72 hours. Success-fee based with 90-day guarantee.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-ink-700" /> Vetted candidate shortlist
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-ink-700" /> End-to-end payroll & verification
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs font-bold text-ink-800">
                  <span>Post Requirement</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Staff Admin Link Footer */}
            <div className="bg-paper border-t border-line px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-mono shrink-0">
              <span className="text-slate text-[11px] sm:text-xs">Are you Arani Staff?</span>
              <a
                href="/admin"
                className="text-teal-600 font-bold hover:underline flex items-center gap-1 bg-surface px-2.5 py-1 rounded border border-line hover:border-teal-400 transition text-[11px] sm:text-xs"
              >
                <span>Staff Admin Gateway →</span>
              </a>
            </div>
          </>
        )}

        {step === 'candidate-signup' && (
          <>
            {/* Header */}
            <div className="bg-ink-900 text-surface p-4 sm:p-6 relative shrink-0">
              <button
                onClick={() => setStep('choice')}
                className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 p-1.5 sm:p-2 rounded bg-ink-800 text-slate hover:text-surface transition flex items-center gap-1 text-xs font-bold"
                aria-label="Back to choice"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="inline">Back</span>
              </button>
              <button
                onClick={handleClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded bg-ink-800 text-slate hover:text-surface transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mt-6 sm:mt-4">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-teal-400 font-bold block mb-1">
                  {"// CANDIDATE REGISTRATION"}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold">Create Your Profile</h2>
                <p className="text-xs text-slate mt-1 max-w-sm mx-auto">
                  Register to apply for jobs and get matched with top employers.
                </p>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegisterSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="text"
                      className="w-full pl-9 pr-3 py-2 border border-line rounded focus:outline-none focus:border-teal-500 text-sm"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      className="w-full pl-9 pr-3 py-2 border border-line rounded focus:outline-none focus:border-teal-500 text-sm"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    className="w-full pl-9 pr-3 py-2 border border-line rounded focus:outline-none focus:border-teal-500 text-sm"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 mb-1">Upload CV / Resume *</label>
                <div className="border-2 border-dashed border-line rounded-lg p-4 sm:p-6 text-center hover:bg-paper transition cursor-pointer">
                  <input
                    required
                    type="file"
                    className="hidden"
                    id="cv-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, cv: e.target.files?.[0] || null })}
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mb-2" />
                    <span className="text-xs sm:text-sm font-bold text-ink-900">
                      {formData.cv ? formData.cv.name : 'Click to upload your CV'}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate mt-1">PDF, DOC, DOCX (Max 5MB)</span>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-surface font-bold py-2.5 sm:py-3 rounded-md transition-colors text-sm"
                >
                  Create Account & Continue
                </button>
              </div>
              <p className="text-[10px] text-center text-slate mt-2">
                By registering, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

