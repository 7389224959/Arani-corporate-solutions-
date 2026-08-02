'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import {
  Building2,
  Users,
  PlusCircle,
  FileText,
  Clock,
  CheckCircle2,
  Download,
  Calendar,
  Send,
  Sparkles,
  Eye,
  X,
  Check,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function EmployerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'shortlists' | 'requirements' | 'post'>('overview');

  // Interactive Candidates Shortlist state
  const [candidates, setCandidates] = useState([
    {
      id: 'CAND-402',
      name: 'Ananya Deshmukh',
      role: 'Senior Credit Risk Analyst',
      experience: '4 Years',
      education: 'MBA Finance (NMIMS)',
      currentCompany: 'Tier-1 Private Bank',
      expectedSalary: '₹16L / yr',
      noticePeriod: '15 Days',
      matchScore: '94%',
      status: 'Shortlisted for Interview',
      nationalIdVerified: true,
      resumeUrl: 'Ananya_Deshmukh_CreditCV.pdf'
    },
    {
      id: 'CAND-409',
      name: 'Vikrant Roy',
      role: 'Branch Operations Officer',
      experience: '3 Years',
      education: 'M.Com Finance',
      currentCompany: 'National Bank',
      expectedSalary: '₹10L / yr',
      noticePeriod: 'Immediate / Buyout',
      matchScore: '89%',
      status: 'Screening Passed',
      nationalIdVerified: true,
      resumeUrl: 'Vikrant_Roy_BranchOps.pdf'
    },
    {
      id: 'CAND-415',
      name: 'Pooja Kulkarni',
      role: 'Corporate HR Business Partner',
      experience: '5 Years',
      education: 'MBA HR (TISS)',
      currentCompany: 'Global Enterprise Corp',
      expectedSalary: '₹20L / yr',
      noticePeriod: '30 Days',
      matchScore: '92%',
      status: 'Interview Scheduled',
      nationalIdVerified: true,
      resumeUrl: 'Pooja_Kulkarni_HRBP.pdf'
    }
  ]);

  // Requirements List
  const [requirements, setRequirements] = useState([
    {
      id: 'REQ-301',
      title: 'Senior Credit Risk Analyst',
      category: 'Banking',
      location: 'Mumbai / Hybrid',
      headcount: 2,
      shortlistedCount: 4,
      status: 'Active (SLA 72h)',
      postedDate: 'Aug 01, 2026'
    },
    {
      id: 'REQ-302',
      title: 'Branch Operations Lead',
      category: 'Banking',
      location: 'Delhi NCR',
      headcount: 5,
      shortlistedCount: 8,
      status: 'Active (SLA 72h)',
      postedDate: 'Jul 28, 2026'
    }
  ]);

  // Selected Candidate for One-Pager Resume Viewer Modal
  const [viewingCandidate, setViewingCandidate] = useState<typeof candidates[0] | null>(null);

  // Schedule Interview Modal
  const [interviewModalCandidate, setInterviewModalCandidate] = useState<typeof candidates[0] | null>(null);
  const [interviewDate, setInterviewDate] = useState('2026-08-05');
  const [interviewTime, setInterviewTime] = useState('14:00');
  const [interviewScheduledSuccess, setInterviewScheduledSuccess] = useState(false);

  // Post Wizard Form
  const [postForm, setPostForm] = useState({
    title: '',
    category: 'Banking',
    location: 'Mumbai',
    salary: '₹12L – ₹16L / yr',
    type: 'Full-Time',
    experience: '3–5 Years',
    headcount: '2',
    urgency: 'Within 72 Hours',
    description: '',
    mustHaves: ''
  });

  const [postedSuccess, setPostedSuccess] = useState(false);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title) return;

    const newReq = {
      id: `REQ-${Math.floor(300 + Math.random() * 100)}`,
      title: postForm.title,
      category: postForm.category,
      location: postForm.location,
      headcount: parseInt(postForm.headcount) || 1,
      shortlistedCount: 0,
      status: 'Active (SLA 72h)',
      postedDate: 'Today'
    };

    setRequirements([newReq, ...requirements]);
    setPostedSuccess(true);
    setTimeout(() => {
      setPostedSuccess(false);
      setActiveTab('requirements');
      setPostForm({
        title: '',
        category: 'Banking',
        location: 'Mumbai',
        salary: '₹12L – ₹16L / yr',
        type: 'Full-Time',
        experience: '3–5 Years',
        headcount: '2',
        urgency: 'Within 72 Hours',
        description: '',
        mustHaves: ''
      });
    }, 2000);
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    setInterviewScheduledSuccess(true);
    setTimeout(() => {
      setInterviewScheduledSuccess(false);
      setInterviewModalCandidate(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-paper text-ink-900 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-line shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AraniLogo className="h-9" variant="dark" />
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>Kotak Financial Services Portal</span>
            </div>
            <button
              onClick={() => setActiveTab('post')}
              className="px-3.5 py-2 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase tracking-wider rounded transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              Post Requirement
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Nav */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-surface border border-line rounded-lg p-5 shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center gap-3 pb-4 border-b border-line">
                <div className="w-10 h-10 rounded bg-ink-800 text-teal-300 font-display font-bold text-base flex items-center justify-center shrink-0">
                  KF
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-ink-900">Kotak Financial</h3>
                  <p className="text-xs text-slate font-mono">Enterprise Banking Client</p>
                </div>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2.5 ${
                    activeTab === 'overview'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-teal-600" />
                  Overview
                </button>

                <button
                  onClick={() => setActiveTab('shortlists')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-between ${
                    activeTab === 'shortlists'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-teal-600" />
                    Vetted Shortlists
                  </span>
                  <span className="bg-teal-200 text-teal-900 font-bold px-2 py-0.5 rounded text-[10px]">
                    {candidates.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('requirements')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-between ${
                    activeTab === 'requirements'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-teal-600" />
                    My Requirements
                  </span>
                  <span className="bg-slate-200 text-slate font-bold px-2 py-0.5 rounded text-[10px]">
                    {requirements.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('post')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2.5 ${
                    activeTab === 'post'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <PlusCircle className="w-4 h-4 text-teal-600" />
                  Post Requirement
                </button>
              </nav>

              <div className="pt-4 border-t border-line text-xs font-mono text-slate space-y-2">
                <div className="flex items-center justify-between">
                  <span>Active Guarantee:</span>
                  <span className="font-bold text-ok">90-Day Free Swap</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shortlist SLA:</span>
                  <span className="font-bold text-teal-600">72-Hour Max</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs space-y-2">
                    <span className="text-xs font-mono text-muted uppercase">Active Requirements</span>
                    <div className="text-3xl font-display font-bold text-ink-900">{requirements.length}</div>
                    <span className="text-xs text-teal-600 font-mono">72h SLA Active</span>
                  </div>
                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs space-y-2">
                    <span className="text-xs font-mono text-muted uppercase">Vetted Shortlists</span>
                    <div className="text-3xl font-display font-bold text-teal-600">{candidates.length}</div>
                    <span className="text-xs text-slate font-mono">Ready for Interview</span>
                  </div>
                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs space-y-2">
                    <span className="text-xs font-mono text-muted uppercase">Placements Made</span>
                    <div className="text-3xl font-display font-bold text-ink-900">18</div>
                    <span className="text-xs text-ok font-mono">90-Day Guarantee Active</span>
                  </div>
                </div>

                {/* Vetted Candidates Overview */}
                <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-line">
                    <h3 className="font-display font-bold text-lg text-ink-900">Recent Candidate Shortlists</h3>
                    <button
                      onClick={() => setActiveTab('shortlists')}
                      className="text-xs font-mono text-teal-600 hover:underline font-bold"
                    >
                      View All Shortlists →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {candidates.map((cand) => (
                      <div
                        key={cand.id}
                        className="p-4 bg-paper border border-line rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                              {cand.id}
                            </span>
                            <span className="font-bold text-sm text-ink-900">{cand.name}</span>
                            <span className="text-xs text-ok font-mono font-bold">
                              ✓ ID Verified
                            </span>
                          </div>
                          <p className="text-xs text-slate mt-1">
                            {cand.role} • {cand.experience} exp • {cand.currentCompany}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-teal-50 text-teal-700 font-mono font-bold text-xs rounded border border-teal-100">
                            Match {cand.matchScore}
                          </span>
                          <button
                            onClick={() => setViewingCandidate(cand)}
                            className="px-3 py-1.5 bg-paper border border-line text-slate hover:text-ink-900 text-xs font-mono font-bold rounded"
                          >
                            <Eye className="w-3.5 h-3.5 inline mr-1" />
                            Resume
                          </button>
                          <button
                            onClick={() => setInterviewModalCandidate(cand)}
                            className="px-3 py-1.5 bg-ink-800 text-surface text-xs font-bold uppercase rounded hover:bg-ink-900 transition"
                          >
                            Schedule
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VETTED SHORTLISTS TAB */}
            {activeTab === 'shortlists' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="pb-4 border-b border-line flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink-900">Vetted Candidate Shortlists</h3>
                    <p className="text-xs text-slate mt-0.5">
                      Pre-screened against your mandatory technical and regulatory criteria.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded">
                    SLA: Delivered within 72h
                  </span>
                </div>

                <div className="space-y-4">
                  {candidates.map((cand) => (
                    <div key={cand.id} className="p-5 bg-paper border border-line rounded-lg space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                              {cand.id}
                            </span>
                            <h4 className="font-display font-bold text-lg text-ink-900">{cand.name}</h4>
                            <span className="text-xs text-ok font-mono font-bold bg-ok/10 px-2 py-0.5 rounded">
                              ✓ ID &amp; CIBIL Verified
                            </span>
                          </div>
                          <p className="text-xs text-slate mt-0.5">
                            Target Position: <strong className="text-ink-900">{cand.role}</strong>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-teal-500 text-surface font-mono font-bold text-xs rounded">
                            Match Score: {cand.matchScore}
                          </span>
                        </div>
                      </div>

                      {/* Candidate Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono text-slate">
                        <div>
                          <span className="text-muted block text-[10px]">Education</span>
                          <span className="text-ink-900 font-semibold">{cand.education}</span>
                        </div>
                        <div>
                          <span className="text-muted block text-[10px]">Current Company</span>
                          <span className="text-ink-900 font-semibold">{cand.currentCompany}</span>
                        </div>
                        <div>
                          <span className="text-muted block text-[10px]">Expected CTC</span>
                          <span className="text-teal-700 font-semibold">{cand.expectedSalary}</span>
                        </div>
                        <div>
                          <span className="text-muted block text-[10px]">Notice Period</span>
                          <span className="text-ink-900 font-semibold">{cand.noticePeriod}</span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={() => setViewingCandidate(cand)}
                          className="px-4 py-2 bg-surface border border-line text-slate hover:text-ink-900 text-xs font-mono font-bold rounded transition flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-teal-600" /> View Resume One-Pager
                        </button>
                        <button
                          onClick={() => setInterviewModalCandidate(cand)}
                          className="px-4 py-2 bg-ink-800 text-surface text-xs font-bold uppercase rounded hover:bg-ink-900 transition flex items-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5 text-teal-400" /> Schedule Interview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MY REQUIREMENTS TAB */}
            {activeTab === 'requirements' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="pb-4 border-b border-line flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink-900">Active Hiring Requirements</h3>
                    <p className="text-xs text-slate mt-0.5">
                      Track intake status, headcount fulfillment, and shortlist delivery.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('post')}
                    className="px-3.5 py-2 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase rounded transition"
                  >
                    + Post New
                  </button>
                </div>

                <div className="space-y-4">
                  {requirements.map((req) => (
                    <div key={req.id} className="p-4 bg-paper border border-line rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                            {req.id}
                          </span>
                          <h4 className="font-display font-bold text-base text-ink-900">{req.title}</h4>
                        </div>
                        <p className="text-xs text-slate mt-1">
                          {req.category} • {req.location} • Headcount: {req.headcount}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right text-xs font-mono">
                          <span className="text-teal-700 font-bold block">{req.shortlistedCount} Shortlisted</span>
                          <span className="text-muted text-[10px]">{req.status}</span>
                        </div>
                        <button
                          onClick={() => setActiveTab('shortlists')}
                          className="px-3 py-1.5 bg-ink-800 text-surface text-xs font-bold uppercase rounded"
                        >
                          View Pool
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* POST REQUIREMENT WIZARD TAB */}
            {activeTab === 'post' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="pb-4 border-b border-line">
                  <h3 className="font-display font-bold text-xl text-ink-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-600" />
                    Post Requirement Intake Wizard
                  </h3>
                  <p className="text-xs text-slate mt-0.5">
                    Submit role specifications to activate Arani&apos;s 72-hour shortlisted candidate delivery.
                  </p>
                </div>

                {!postedSuccess ? (
                  <form onSubmit={handlePostSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Target Job Title *</label>
                        <input
                          type="text"
                          required
                          value={postForm.title}
                          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                          placeholder="e.g. Branch Credit Underwriter"
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Sector Category *</label>
                        <select
                          value={postForm.category}
                          onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        >
                          <option value="Banking">Banking &amp; Financial Services</option>
                          <option value="Corporate">Corporate HR &amp; Operations</option>
                          <option value="Finance">Finance &amp; FP&amp;A</option>
                          <option value="IT">IT Infrastructure</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Location / Hub</label>
                        <input
                          type="text"
                          value={postForm.location}
                          onChange={(e) => setPostForm({ ...postForm, location: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Budgeted CTC Band</label>
                        <input
                          type="text"
                          value={postForm.salary}
                          onChange={(e) => setPostForm({ ...postForm, salary: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Headcount Needed</label>
                        <input
                          type="text"
                          value={postForm.headcount}
                          onChange={(e) => setPostForm({ ...postForm, headcount: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate mb-1">Key Must-Have Qualifications / Certifications</label>
                      <textarea
                        rows={3}
                        value={postForm.mustHaves}
                        onChange={(e) => setPostForm({ ...postForm, mustHaves: e.target.value })}
                        placeholder="e.g. CA or MBA Finance, 3+ yrs commercial bank underwriting, CIBIL proficiency..."
                        className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase tracking-wider rounded transition flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Activate 72-Hour Sourcing SLA
                    </button>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
                    <h4 className="font-display font-bold text-xl text-ink-900">Requirement Activated!</h4>
                    <p className="text-xs text-slate max-w-sm mx-auto">
                      Your posting for <strong>{postForm.title}</strong> is now live in Arani&apos;s recruiter queue. Shortlisted candidates will be delivered within 72 hours.
                    </p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Resume One-Pager Modal */}
      {viewingCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 backdrop-blur-xs p-4">
          <div className="bg-surface border border-line rounded-lg p-6 max-w-lg w-full shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div>
                <h3 className="font-display font-bold text-lg text-ink-900">{viewingCandidate.name}</h3>
                <span className="text-xs font-mono text-teal-600 font-bold">{viewingCandidate.id} • Vetted Profile</span>
              </div>
              <button onClick={() => setViewingCandidate(null)} className="text-slate hover:text-ink-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-paper rounded border border-line">
                <span className="text-muted block text-[10px] font-mono">Current Employment</span>
                <p className="font-bold text-ink-900 mt-0.5">{viewingCandidate.role} at {viewingCandidate.currentCompany}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-2.5 bg-paper rounded border border-line">
                  <span className="text-muted block text-[10px]">Education</span>
                  <span className="font-semibold text-ink-900">{viewingCandidate.education}</span>
                </div>
                <div className="p-2.5 bg-paper rounded border border-line">
                  <span className="text-muted block text-[10px]">Experience</span>
                  <span className="font-semibold text-ink-900">{viewingCandidate.experience}</span>
                </div>
                <div className="p-2.5 bg-paper rounded border border-line">
                  <span className="text-muted block text-[10px]">Expected CTC</span>
                  <span className="font-semibold text-teal-700">{viewingCandidate.expectedSalary}</span>
                </div>
                <div className="p-2.5 bg-paper rounded border border-line">
                  <span className="text-muted block text-[10px]">Notice Period</span>
                  <span className="font-semibold text-ink-900">{viewingCandidate.noticePeriod}</span>
                </div>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-100 rounded text-teal-800">
                <span className="font-bold text-xs font-mono flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  National ID &amp; Background Screening Verified
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setViewingCandidate(null)}
                className="px-4 py-2 bg-paper border border-line text-slate font-mono text-xs uppercase rounded"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setInterviewModalCandidate(viewingCandidate);
                  setViewingCandidate(null);
                }}
                className="px-4 py-2 bg-ink-800 text-surface font-bold text-xs uppercase rounded hover:bg-ink-900"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {interviewModalCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 backdrop-blur-xs p-4">
          <div className="bg-surface border border-line rounded-lg p-6 max-w-md w-full shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h3 className="font-display font-bold text-lg text-ink-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                Schedule Candidate Interview
              </h3>
              <button onClick={() => setInterviewModalCandidate(null)} className="text-slate hover:text-ink-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!interviewScheduledSuccess ? (
              <form onSubmit={handleScheduleInterview} className="space-y-4">
                <p className="text-xs text-slate">
                  Scheduling discussion for candidate <strong>{interviewModalCandidate.name}</strong> ({interviewModalCandidate.role}).
                </p>

                <div>
                  <label className="block text-xs font-mono text-slate mb-1">Interview Date *</label>
                  <input
                    type="date"
                    required
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate mb-1">Time Slot (IST) *</label>
                  <input
                    type="time"
                    required
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase tracking-wider rounded transition"
                >
                  Send Interview Invite
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-teal-600 mx-auto" />
                <h4 className="font-display font-bold text-base text-ink-900">Interview Scheduled!</h4>
                <p className="text-xs text-slate">
                  An invite for {interviewDate} at {interviewTime} has been sent to {interviewModalCandidate.name} and your calendar.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
