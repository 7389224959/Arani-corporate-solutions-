'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { SAMPLE_JOBS } from '@/lib/sampleData';
import {
  User,
  FileText,
  Briefcase,
  Bookmark,
  Bell,
  Settings,
  CheckCircle2,
  Clock,
  Upload,
  Sparkles,
  ShieldCheck,
  Building2,
  MapPin,
  DollarSign,
  Send,
  MessageSquare,
  AlertCircle,
  FileSpreadsheet,
  Calendar,
  Check,
  ChevronRight
} from 'lucide-react';

export default function CandidateDashboardPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'overview' | 'applications' | 'profile' | 'saved' | 'alerts' | 'messages'>('available');

  // Candidate Profile State with detailed Phase 3 fields
  const [profile, setProfile] = useState(() => {
    let defaultProfile = {
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      nationalId: 'ABCDE1234F',
      address: 'Flat 402, Sunshine Heights, Powai',
      district: 'Mumbai Suburban',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400076',
      education: 'MBA Finance, Mumbai University (2022)',
      currentCompany: 'Private Sector Bank',
      currentRole: 'Assistant Credit Analyst',
      experienceYears: '3 Years',
      expectedCtc: '₹14,00,000 / yr ($3.5k/mo)',
      noticePeriod: '30 Days',
      skills: 'Credit Risk Analysis, Financial Modeling, CIBIL Verification, Commercial Underwriting, RBI Compliance',
      confidentialSearch: true
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
      } catch (e) {
        console.warn('Could not parse registration data from local storage', e);
      }
      
      const saved = null;
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return defaultProfile;
  });

  const [resumeUploaded, setResumeUploaded] = useState('Rahul_Sharma_Banking_CV_2026.pdf');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Attempt Supabase save first
    try {
      const { saveCandidateProfile } = await import('@/lib/supabase');
      await saveCandidateProfile(profile);
    } catch (err) {
      console.warn('Failed to save candidate profile to Supabase', err);
    }

    // Fallback/Demo local storage
    if (typeof window !== 'undefined') {
      

      const savedUsersStr = '[]';
      try {
        let savedUsers = JSON.parse(savedUsersStr);
        const existingIdx = savedUsers.findIndex((u: any) => u.email === profile.email);
        if (existingIdx >= 0) {
          savedUsers[existingIdx] = { ...savedUsers[existingIdx], name: profile.fullName };
        } else {
          savedUsers.unshift({
            id: `USR-${Date.now().toString().slice(-3)}`,
            name: profile.fullName,
            email: profile.email,
            role: 'Candidate',
            status: 'Active',
            verified: false,
            joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          });
        }
        
      } catch (e) {
        console.error(e);
      }
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeUploaded(e.target.files[0].name);
    }
  };

  // Applications with timelines & timestamps
  const [applications, setApplications] = useState<{ id: string; jobId: string; title: string; company: string; appliedDate: string; status: string; stepIndex: number; timeline: { title: string; date: string; completed: boolean }[] }[]>(() => {
    const initial = [
      {
        id: 'APP-1024',
        jobId: 'ACS-8042',
        title: 'Senior Credit Risk Analyst',
        company: 'Tier-1 Private Bank',
        appliedDate: 'Aug 01, 2026 • 10:30 AM',
        status: 'Screening Passed',
        stepIndex: 2,
        timeline: [
          { title: 'Application Submitted', date: 'Aug 01, 2026 • 10:30 AM', completed: true },
          { title: 'Profile & National ID Verified', date: 'Aug 01, 2026 • 02:15 PM', completed: true },
          { title: 'Screening Passed — Recruiter Shortlisted', date: 'Aug 02, 2026 • 09:00 AM', completed: true },
          { title: 'Technical Interview Round', date: 'Scheduled for Aug 05, 2026', completed: false },
          { title: 'Final Offer & Placement', date: 'Pending Interview', completed: false }
        ]
      },
      {
        id: 'APP-0988',
        jobId: 'ACS-8043',
        title: 'Branch Operations Officer',
        company: 'Leading National Bank',
        appliedDate: 'Jul 24, 2026 • 04:45 PM',
        status: 'Interview Scheduled',
        stepIndex: 3,
        timeline: [
          { title: 'Application Submitted', date: 'Jul 24, 2026 • 04:45 PM', completed: true },
          { title: 'Profile & National ID Verified', date: 'Jul 25, 2026 • 11:00 AM', completed: true },
          { title: 'Screening Passed', date: 'Jul 26, 2026 • 03:20 PM', completed: true },
          { title: 'Branch Ops Interview Scheduled', date: 'Aug 04, 2026 • 02:00 PM', completed: true },
          { title: 'Final Offer & Placement', date: 'Pending', completed: false }
        ]
      }
    ];

    if (typeof window !== 'undefined') {
      const savedAppsStr = null;
      if (savedAppsStr) {
        try {
          const parsed = JSON.parse(savedAppsStr);
          const mapped = parsed.map((app: any) => ({
            id: app.id,
            jobId: app.jobId,
            title: app.jobTitle,
            company: app.company,
            appliedDate: app.appliedDate,
            status: app.status,
            stepIndex: 1, // Start at 1
            timeline: [
              { title: 'Application Submitted', date: app.appliedDate, completed: true },
              { title: 'Profile & National ID Verified', date: 'Pending', completed: false },
              { title: 'Screening Passed — Recruiter Shortlisted', date: 'Pending', completed: false },
              { title: 'Technical Interview Round', date: 'Pending', completed: false },
              { title: 'Final Offer & Placement', date: 'Pending', completed: false }
            ]
          }));
          return [...mapped, ...initial];
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initial;
  });

  // Saved Jobs
  const [savedJobs, setSavedJobs] = useState(SAMPLE_JOBS.slice(0, 3));

  // Messages State
  const [messages, setMessages] = useState([
    {
      id: 'M-1',
      sender: 'Arani Senior Banking Recruiter',
      subject: 'Interview Schedule Confirmation for Senior Credit Risk Analyst (ACS-8042)',
      time: 'Today • 09:15 AM',
      body: 'Hi Rahul, your profile snapshot has passed preliminary screening with Tier-1 Private Bank. We have scheduled your first technical discussion for Wednesday, Aug 5 at 2:00 PM IST via Video Conference.'
    },
    {
      id: 'M-2',
      sender: 'Arani Talent Desk',
      subject: 'Profile Verification Completed',
      time: 'Yesterday • 02:15 PM',
      body: 'Your National ID (ABCDE1234F) and resume credentials have been successfully verified. Your candidate profile is now active in our priority recruiter pool.'
    }
  ]);

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
              <span className="w-2 h-2 rounded-full bg-ok" />
              <span className="hidden sm:inline">Verified Candidate Account</span>
            </div>
            <Link
              href="/jobs"
              className="px-3.5 py-1.5 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase rounded transition shadow-xs flex items-center gap-1"
            >
              <Briefcase className="w-3.5 h-3.5" />
              Browse Openings
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Navigation (3 Cols) */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-surface border border-line rounded-lg p-5 shadow-xs space-y-6 sticky top-24">
              {/* Profile Card Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-line">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 font-display font-bold text-lg flex items-center justify-center border-2 border-teal-500 shrink-0">
                  RS
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-display font-bold text-base text-ink-900 truncate">
                    {profile.fullName}
                  </h3>
                  <p className="text-xs text-slate font-mono truncate">{profile.email}</p>
                  <span className="inline-block font-mono text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded mt-1">
                    ID: {profile.nationalId}
                  </span>
                </div>
              </div>

              {/* Navigation List */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('available')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2.5 ${
                    activeTab === 'available'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-teal-600" />
                  Available Jobs
                </button>

                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2.5 ${
                    activeTab === 'overview'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <User className="w-4 h-4 text-teal-600" />
                  Overview
                </button>

                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-between ${
                    activeTab === 'applications'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-teal-600" />
                    My Applications
                  </span>
                  <span className="bg-teal-200 text-teal-900 font-bold px-2 py-0.5 rounded text-[10px]">
                    {applications.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2.5 ${
                    activeTab === 'profile'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <FileText className="w-4 h-4 text-teal-600" />
                  Profile Builder
                </button>

                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-between ${
                    activeTab === 'saved'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Bookmark className="w-4 h-4 text-teal-600" />
                    Saved Openings
                  </span>
                  <span className="bg-slate-200 text-slate font-bold px-2 py-0.5 rounded text-[10px]">
                    {savedJobs.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-between ${
                    activeTab === 'messages'
                      ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500'
                      : 'text-slate hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-teal-600" />
                    Recruiter Inbox
                  </span>
                  <span className="bg-teal-500 text-surface font-bold px-1.5 py-0.5 rounded text-[10px]">
                    {messages.length}
                  </span>
                </button>
              </nav>

              <div className="pt-4 border-t border-line text-xs font-mono text-slate space-y-2">
                <div className="flex items-center justify-between">
                  <span>Candidate Status:</span>
                  <span className="font-bold text-ok">Active Vetted</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Placement Fee:</span>
                  <span className="font-bold text-teal-600">₹0 (100% Free)</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Panel (9 Cols) */}
          <main className="lg:col-span-9 space-y-6">
            {/* AVAILABLE JOBS TAB */}
            {activeTab === 'available' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-xl text-ink-900">Available Jobs for You</h3>
                <div className="space-y-3">
                  {SAMPLE_JOBS.map((job) => (
                    <div key={job.id} className="p-4 bg-paper border border-line rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded">
                          {job.id}
                        </span>
                        <h4 className="font-display font-bold text-base text-ink-900 mt-1">{job.title}</h4>
                        <p className="text-xs text-slate">{job.companyName} • {job.location} • {job.salary}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (!savedJobs.find(j => j.id === job.id)) {
                                setSavedJobs([...savedJobs, job]);
                            }
                          }}
                          className={`px-4 py-2 border text-xs font-bold uppercase rounded transition ${savedJobs.find(j => j.id === job.id) ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-paper border-teal-500 text-teal-600 hover:bg-teal-50'}`}
                        >
                          {savedJobs.find(j => j.id === job.id) ? 'Saved' : 'Save'}
                        </button>
                        <Link
                          href={`/jobs/${job.id}`}
                          className="px-4 py-2 bg-teal-500 text-surface text-xs font-bold uppercase rounded hover:bg-teal-600 transition"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Top Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs space-y-2">
                    <span className="text-xs font-mono text-muted uppercase">Active Applications</span>
                    <div className="text-3xl font-display font-bold text-ink-900">
                      {applications.length}
                    </div>
                    <span className="text-xs text-ok font-mono font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 1 Interview Scheduled
                    </span>
                  </div>

                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs space-y-2">
                    <span className="text-xs font-mono text-muted uppercase">Profile Completeness</span>
                    <div className="text-3xl font-display font-bold text-teal-600">95%</div>
                    <span className="text-xs text-teal-700 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> National ID &amp; Resume Verified
                    </span>
                  </div>

                  <div className="bg-surface border border-line rounded-lg p-5 shadow-xs space-y-2">
                    <span className="text-xs font-mono text-muted uppercase">Recruiter Views</span>
                    <div className="text-3xl font-display font-bold text-ink-900">18</div>
                    <span className="text-xs text-teal-600 font-mono">+6 views this week</span>
                  </div>
                </div>

                {/* Application Stage Tracker */}
                <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-line">
                    <h3 className="font-display font-bold text-lg text-ink-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-teal-600" />
                      Live Application Stage Timelines
                    </h3>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="text-xs font-mono text-teal-600 hover:underline font-bold"
                    >
                      View All Details →
                    </button>
                  </div>

                  <div className="space-y-6">
                    {applications.map((app) => (
                      <div key={app.id} className="p-5 bg-paper border border-line rounded-lg space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                                {app.jobId}
                              </span>
                              <span className="text-xs text-slate font-mono">{app.appliedDate}</span>
                            </div>
                            <h4 className="font-display font-bold text-base text-ink-900 mt-1">
                              {app.title}
                            </h4>
                            <p className="text-xs text-slate font-medium">{app.company}</p>
                          </div>
                          <span className="px-3 py-1 bg-teal-500 text-surface text-xs font-bold uppercase rounded self-start sm:self-center">
                            {app.status}
                          </span>
                        </div>

                        {/* Progress Stepper */}
                        <div className="grid grid-cols-5 gap-2 pt-2 text-[10px] font-mono text-center">
                          <div className="space-y-1">
                            <div className="h-2 bg-teal-500 rounded-full" />
                            <span className="font-bold text-teal-700">Applied</span>
                          </div>
                          <div className="space-y-1">
                            <div className={`h-2 rounded-full ${app.stepIndex >= 2 ? 'bg-teal-500' : 'bg-line'}`} />
                            <span className={app.stepIndex >= 2 ? 'font-bold text-teal-700' : 'text-muted'}>
                              Screening
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className={`h-2 rounded-full ${app.stepIndex >= 3 ? 'bg-teal-500' : 'bg-line'}`} />
                            <span className={app.stepIndex >= 3 ? 'font-bold text-teal-700' : 'text-muted'}>
                              Interview
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className={`h-2 rounded-full ${app.stepIndex >= 4 ? 'bg-teal-500' : 'bg-line'}`} />
                            <span className="text-muted">Offer</span>
                          </div>
                          <div className="space-y-1">
                            <div className={`h-2 rounded-full ${app.stepIndex >= 5 ? 'bg-teal-500' : 'bg-line'}`} />
                            <span className="text-muted">Hired</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Jobs */}
                <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-4">
                  <h3 className="font-display font-bold text-lg text-ink-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-600" />
                    Recommended Banking Openings for Rahul
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SAMPLE_JOBS.slice(2, 4).map((job) => (
                      <div key={job.id} className="p-4 bg-paper border border-line rounded-lg space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded">
                            {job.id}
                          </span>
                          <span className="text-xs font-mono font-bold text-teal-700">{job.salary}</span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-ink-900">{job.title}</h4>
                        <p className="text-xs text-slate">{job.companyName} • {job.location}</p>
                        <Link
                          href={`/jobs/${job.id}`}
                          className="inline-block mt-2 text-xs font-bold text-teal-600 hover:underline"
                        >
                          View &amp; Apply →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MY APPLICATIONS TAB */}
            {activeTab === 'applications' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="pb-4 border-b border-line">
                  <h3 className="font-display font-bold text-xl text-ink-900">
                    Application History &amp; Timestamps
                  </h3>
                  <p className="text-xs text-slate mt-0.5">
                    Track real-time status changes, interview invites, and recruiter feedback.
                  </p>
                </div>

                <div className="space-y-8">
                  {applications.map((app) => (
                    <div key={app.id} className="border border-line rounded-lg p-5 space-y-4 bg-paper">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-line pb-3">
                        <div>
                          <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                            {app.jobId}
                          </span>
                          <h4 className="font-display font-bold text-lg text-ink-900 mt-1">{app.title}</h4>
                          <p className="text-xs text-slate">{app.company}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 bg-teal-500 text-surface text-xs font-bold uppercase rounded">
                            {app.status}
                          </span>
                          <span className="block text-[10px] font-mono text-slate mt-1">{app.appliedDate}</span>
                        </div>
                      </div>

                      {/* Detailed Timeline Events */}
                      <div className="space-y-3 pt-2">
                        <h5 className="font-mono text-xs uppercase font-bold text-slate">Audit Log &amp; Milestones</h5>
                        <div className="space-y-2 border-l-2 border-teal-500 pl-4 text-xs font-mono">
                          {app.timeline.map((item, idx) => (
                            <div key={idx} className="relative">
                              <span className={`w-2 h-2 rounded-full absolute -left-[21px] top-1 ${item.completed ? 'bg-teal-500' : 'bg-line'}`} />
                              <div className={item.completed ? 'text-ink-900 font-bold' : 'text-slate'}>
                                {item.title}
                              </div>
                              <span className="text-[10px] text-muted">{item.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE BUILDER TAB */}
            {activeTab === 'profile' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink-900">
                      Candidate Profile Builder &amp; Resume Capture
                    </h3>
                    <p className="text-xs text-slate mt-0.5">
                      Required fields for bank pre-screening: National ID, Passport, residential address, and domain credentials.
                    </p>
                  </div>
                  {savedSuccess && (
                    <span className="text-xs font-mono text-ok font-bold bg-teal-50 px-3 py-1 rounded border border-teal-100">
                      ✓ Changes Saved
                    </span>
                  )}
                </div>

                <form onSubmit={handleProfileSave} className="space-y-6">
                  {/* Resume Upload Section */}
                  <div className="p-4 bg-teal-50 border border-teal-100 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-teal-600" />
                        <div>
                          <h4 className="font-display font-bold text-sm text-teal-900">Resume / CV Document</h4>
                          <p className="text-xs text-slate">PDF or DOCX max 10MB</p>
                        </div>
                      </div>
                      <label className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-surface font-mono font-bold text-xs uppercase rounded cursor-pointer transition">
                        Upload New Resume
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
                      </label>
                    </div>
                    {resumeUploaded && (
                      <div className="text-xs font-mono text-ok font-bold">
                        Current File: {resumeUploaded}
                      </div>
                    )}
                  </div>

                  {/* Section 1: Personal Identification */}
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase text-teal-600 mb-3">{"// 1. Personal & Identification Data"}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Full Legal Name *</label>
                        <input
                          type="text"
                          required
                          value={profile.fullName}
                          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">National ID / PAN / Passport No. *</label>
                        <input
                          type="text"
                          required
                          value={profile.nationalId}
                          onChange={(e) => setProfile({ ...profile, nationalId: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500 uppercase font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Contact & Detailed Residential Address */}
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase text-teal-600 mb-3">{"// 2. Contact & Residential Address"}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Mobile Phone *</label>
                        <input
                          type="tel"
                          required
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-mono text-slate mb-1">Full Street Address *</label>
                        <input
                          type="text"
                          required
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">District / Region *</label>
                        <input
                          type="text"
                          required
                          value={profile.district}
                          onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">City &amp; Zip Code *</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            value={profile.city}
                            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                            placeholder="City"
                            className="w-2/3 px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                          />
                          <input
                            type="text"
                            required
                            value={profile.zipCode}
                            onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                            placeholder="ZIP"
                            className="w-1/3 px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Professional & Compensation Specs */}
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase text-teal-600 mb-3">{"// 3. Domain Specs & Notice Period"}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Educational Degree *</label>
                        <input
                          type="text"
                          required
                          value={profile.education}
                          onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Current Designation *</label>
                        <input
                          type="text"
                          required
                          value={profile.currentRole}
                          onChange={(e) => setProfile({ ...profile, currentRole: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Expected Annual CTC *</label>
                        <input
                          type="text"
                          required
                          value={profile.expectedCtc}
                          onChange={(e) => setProfile({ ...profile, expectedCtc: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate mb-1">Notice Period *</label>
                        <input
                          type="text"
                          required
                          value={profile.noticePeriod}
                          onChange={(e) => setProfile({ ...profile, noticePeriod: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-mono text-slate mb-1">Domain Skills &amp; Certifications</label>
                        <textarea
                          rows={2}
                          value={profile.skills}
                          onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                          className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase tracking-wider rounded shadow-xs transition"
                  >
                    Save &amp; Verify Updated Profile
                  </button>
                </form>
              </div>
            )}

            {/* SAVED JOBS TAB */}
            {activeTab === 'saved' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-xl text-ink-900">Saved Banking &amp; Corporate Openings</h3>
                <div className="space-y-3">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="p-4 bg-paper border border-line rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded">
                          {job.id}
                        </span>
                        <h4 className="font-display font-bold text-base text-ink-900 mt-1">{job.title}</h4>
                        <p className="text-xs text-slate">{job.companyName} • {job.location} • {job.salary}</p>
                      </div>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="px-4 py-2 bg-teal-500 text-surface text-xs font-bold uppercase rounded hover:bg-teal-600 transition"
                      >
                        Apply Now
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RECRUITER INBOX TAB */}
            {activeTab === 'messages' && (
              <div className="bg-surface border border-line rounded-lg p-6 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-xl text-ink-900">Recruiter Messages</h3>
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-4 bg-paper border border-line rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-teal-700">{msg.sender}</span>
                        <span className="text-[10px] font-mono text-slate">{msg.time}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-ink-900">{msg.subject}</h4>
                      <p className="text-xs text-slate leading-relaxed">{msg.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
