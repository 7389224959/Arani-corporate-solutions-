'use client';

import React, { useState } from 'react';
import { Job } from '@/lib/sampleData';
import { trackPixelEvent, getUtmParams } from '@/lib/metaPixel';
import { X, MapPin, DollarSign, Briefcase, Calendar, CheckCircle2, ShieldCheck, Send, Sparkles } from 'lucide-react';

interface JobQuickModalProps {
  job: Job | null;
  onClose: () => void;
  onApplySuccess?: () => void;
}

export const JobQuickModal: React.FC<JobQuickModalProps> = ({ job, onClose, onApplySuccess }) => {
  const [applied, setApplied] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeName, setResumeName] = useState<string | null>(null);

  if (!job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const utm = getUtmParams();

    // Track Meta Pixel Event
    trackPixelEvent('SubmitApplication', {
      job_id: job.id,
      job_title: job.title,
      job_category: job.category,
      applicant_name: fullName,
      applicant_email: email,
      ...utm
    });

    // Save application to localStorage for Candidate & Admin dashboards
    try {
      try {
        const { submitJobApplication } = await import('@/lib/supabase');
        await submitJobApplication({
          jobId: job.id,
          jobCode: job.id,
          fullName,
          email,
          phone,
          resumeUrl: resumeName,
          status: 'Applied'
        });
      } catch (err) {
        console.error('Failed to submit application to database', err);
      }
    } catch (err) {
      console.warn('Failed to persist application:', err);
    }

    setApplied(true);
    if (onApplySuccess) onApplySuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-surface border border-line rounded-lg shadow-card overflow-hidden my-8">
        
        {/* Header Band */}
        <div className="bg-ink-900 text-surface p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-md bg-ink-800 text-slate hover:text-surface hover:bg-ink-700 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-teal-400 font-bold bg-ink-800 px-2.5 py-1 rounded">
              {job.id}
            </span>
            <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs px-2.5 py-0.5 rounded-full font-medium">
              {job.category}
            </span>
            {job.isUrgent && (
              <span className="bg-danger text-surface text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                URGENT
              </span>
            )}
          </div>

          <h2 className="text-2xl font-display font-bold text-surface mb-1">
            {job.title}
          </h2>
          <p className="text-teal-300 font-medium text-sm flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-teal-400" />
            {job.companyName} {job.isConfidential && '(Client Confidential)'}
          </p>
        </div>

        {/* Quick Info Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-paper border-b border-line text-xs font-mono">
          <div>
            <span className="text-muted block text-[10px] uppercase">Location</span>
            <span className="font-semibold text-ink-800 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" /> {job.location}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[10px] uppercase">Salary</span>
            <span className="font-semibold text-teal-700 flex items-center gap-1 mt-0.5">
              <DollarSign className="w-3.5 h-3.5 text-teal-600" /> {job.salary}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[10px] uppercase">Job Type</span>
            <span className="font-semibold text-ink-800 flex items-center gap-1 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-teal-600" /> {job.type}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[10px] uppercase">Experience</span>
            <span className="font-semibold text-ink-800 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-teal-600" /> {job.experience}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {!applied ? (
            <>
              <div>
                <h3 className="font-display font-bold text-ink-900 text-lg mb-2">Role Overview</h3>
                <p className="text-slate text-sm leading-relaxed">{job.description}</p>
              </div>

              <div>
                <h3 className="font-display font-bold text-ink-900 text-lg mb-3">Key Requirements</h3>
                <ul className="space-y-2 text-sm text-slate">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-teal-50 border border-teal-100 rounded-md">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase font-mono tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Candidate Guarantee &amp; Privacy
                </div>
                <p className="text-xs text-slate">
                  This role is 100% free for candidates. Aranii Corporate Solutions handles all initial screening with strict confidentiality.
                </p>
              </div>

              {/* Quick Application Form */}
              <form onSubmit={handleSubmit} className="pt-4 border-t border-line space-y-4">
                <h3 className="font-display font-bold text-ink-900 text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Apply in 60 Seconds
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 bg-paper border border-line rounded focus:border-teal-500 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul.sharma@example.com"
                      className="w-full px-3 py-2 bg-paper border border-line rounded focus:border-teal-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-paper border border-line rounded focus:border-teal-500 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Attach Resume (PDF/DOC)</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setResumeName(e.target.files[0].name);
                        }
                      }}
                      className="w-full px-2 py-1.5 bg-paper border border-line rounded text-xs text-slate file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-teal-500 file:text-surface hover:file:bg-teal-600"
                    />
                  </div>
                </div>

                {resumeName && (
                  <p className="text-xs text-ok font-mono font-medium">
                    ✓ Resume attached: {resumeName}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-surface font-bold rounded-md shadow-sm transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Application for {job.id}
                </button>
              </form>
            </>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-bold text-ink-900">
                Application Submitted!
              </h3>
              <p className="text-slate text-sm max-w-md mx-auto">
                Thank you, <strong className="text-ink-900">{fullName}</strong>. Your profile has been queued for preliminary screening. Our banking recruiter will contact you at <strong className="text-teal-700">{email}</strong> within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-ink-800 text-surface font-semibold text-sm rounded hover:bg-ink-900 transition"
                >
                  Close &amp; Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
