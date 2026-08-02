'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { JobQuickModal } from '@/components/JobQuickModal';
import { SAMPLE_JOBS, Job } from '@/lib/sampleData';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  X,
  Bell,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function JobsPage() {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedJobType, setSelectedJobType] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [isRemoteOnly, setIsRemoteOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'salary' | 'relevance'>('newest');

  // Drawer state for mobile
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Saved Jobs state (persisted in localStorage demo)
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  // Selected Job for Quick View Modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Job alert modal
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSaved, setAlertSaved] = useState(false);

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((jId) => jId !== id));
    } else {
      setSavedJobIds([...savedJobIds, id]);
    }
  };

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;
    setAlertSaved(true);
    setTimeout(() => {
      setAlertSaved(false);
      setAlertModalOpen(false);
      setAlertEmail('');
    }, 2500);
  };

  // Filter Logic
  const filteredJobs = SAMPLE_JOBS.filter((job) => {
    if (selectedCategory !== 'All' && job.category !== selectedCategory) return false;
    if (selectedLocation !== 'All' && !job.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
    if (selectedJobType !== 'All' && job.type !== selectedJobType) return false;
    if (selectedExperience !== 'All' && !job.experience.includes(selectedExperience)) return false;
    if (isRemoteOnly && !job.location.toLowerCase().includes('remote')) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.companyName.toLowerCase().includes(q);
      const matchLoc = job.location.toLowerCase().includes(q);
      const matchReq = job.requirements.some((r) => r.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchLoc && !matchReq) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-paper text-ink-900 flex flex-col font-sans">
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
            <Link href="/jobs" className="text-teal-600 font-bold border-b-2 border-teal-500 pb-0.5">
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
              Candidate Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Sub-Header Banner */}
      <section className="bg-ink-900 text-surface py-8 border-b border-ink-800 rising-bars relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-400 bg-ink-800 px-3 py-1 rounded mb-2">
                <span>{"// LIVE BANKING & CORPORATE DIRECTORY"}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-surface">
                Explore Verified Career Opportunities
              </h1>
              <p className="text-slate text-xs md:text-sm mt-1 max-w-xl">
                100% free placement service for candidates. Direct pre-screening with top Indian banks &amp; MNC corporations.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setAlertModalOpen(true)}
                className="px-4 py-2.5 bg-ink-800 hover:bg-ink-700 text-teal-300 border border-teal-500/30 text-xs font-mono font-bold uppercase rounded transition flex items-center gap-2"
              >
                <Bell className="w-4 h-4 text-teal-400" />
                Create Job Alert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Job Ledger */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-surface border border-line rounded-lg p-5 shadow-xs sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h3 className="font-display font-bold text-ink-900 text-base flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                  Filter Openings
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLocation('All');
                    setSelectedJobType('All');
                    setSelectedExperience('All');
                    setIsRemoteOnly(false);
                    setSearchQuery('');
                  }}
                  className="text-xs text-teal-600 hover:underline font-mono font-medium"
                >
                  Reset All
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-mono uppercase font-bold text-slate mb-2">
                  Industry Sector
                </label>
                <div className="space-y-1.5 text-xs text-ink-900">
                  {['All', 'Banking', 'Corporate', 'Finance', 'Operations', 'IT'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-2.5 py-1.5 rounded font-medium transition flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-teal-50 text-teal-700 font-bold border-l-2 border-teal-500'
                          : 'hover:bg-paper text-slate'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] font-mono text-muted">
                        {cat === 'All'
                          ? SAMPLE_JOBS.length
                          : SAMPLE_JOBS.filter((j) => j.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div>
                <label className="block text-xs font-mono uppercase font-bold text-slate mb-2">
                  Employment Type
                </label>
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-full px-3 py-2 bg-paper border border-line rounded text-xs font-mono text-ink-900 focus:outline-none focus:border-teal-500"
                >
                  <option value="All">All Types</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-xs font-mono uppercase font-bold text-slate mb-2">
                  Location / Hub
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-paper border border-line rounded text-xs font-mono text-ink-900 focus:outline-none focus:border-teal-500"
                >
                  <option value="All">All Cities</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>

              {/* Remote Toggle */}
              <div className="pt-2 border-t border-line">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink-900">
                  <input
                    type="checkbox"
                    checked={isRemoteOnly}
                    onChange={(e) => setIsRemoteOnly(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 border-line"
                  />
                  <span>Remote / Hybrid Roles Only</span>
                </label>
              </div>

              {/* Saved Jobs Counter */}
              <div className="p-3 bg-teal-50 border border-teal-100 rounded text-xs font-mono flex items-center justify-between text-teal-800">
                <span className="flex items-center gap-1.5 font-bold">
                  <Bookmark className="w-3.5 h-3.5 text-teal-600" /> Saved Jobs
                </span>
                <span className="font-bold bg-teal-200 px-2 py-0.5 rounded text-teal-900">
                  {savedJobIds.length}
                </span>
              </div>
            </div>
          </aside>

          {/* Main Job Listing Ledger (9 Cols) */}
          <main className="lg:col-span-9 space-y-4">
            {/* Search & Sort Controls Bar */}
            <div className="bg-surface border border-line rounded-lg p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search role, skills, keywords..."
                  className="w-full pl-9 pr-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>

              <div className="flex items-center justify-between w-full md:w-auto gap-3">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-3 py-2 bg-paper border border-line rounded text-xs font-mono text-slate flex items-center gap-1.5"
                >
                  <Filter className="w-3.5 h-3.5 text-teal-600" />
                  Filters
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-slate">
                  <span>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2 py-1.5 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="salary">Salary (High to Low)</option>
                    <option value="relevance">Relevance</option>
                  </select>
                </div>

                <div className="text-xs font-mono text-slate hidden sm:block">
                  Showing <strong className="text-ink-900">{filteredJobs.length}</strong> roles
                </div>
              </div>
            </div>

            {/* Jobs Ledger Container */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-3">
                {filteredJobs.map((job) => {
                  const isSaved = savedJobIds.includes(job.id);
                  return (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className="bg-surface border border-line hover:border-teal-500 rounded-lg p-5 shadow-xs transition cursor-pointer group hover:shadow-card relative overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                              {job.id}
                            </span>
                            <span className="bg-slate-100 text-slate text-xs px-2.5 py-0.5 rounded-full font-medium">
                              {job.category}
                            </span>
                            {job.isUrgent && (
                              <span className="bg-danger text-surface text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                                URGENT
                              </span>
                            )}
                            {job.isFeatured && (
                              <span className="bg-ink-800 text-teal-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-teal-500/30">
                                FEATURED
                              </span>
                            )}
                          </div>

                          <div>
                            <h3 className="text-lg font-display font-bold text-ink-900 group-hover:text-teal-600 transition">
                              {job.title}
                            </h3>
                            <p className="text-xs text-slate font-medium flex items-center gap-1 mt-0.5">
                              <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                              {job.companyName} {job.isConfidential && '(Client Confidential)'}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-mono text-slate flex-wrap">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-teal-600" />
                              {job.location}
                            </span>
                            <span className="text-teal-700 font-bold flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5 text-teal-600" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-teal-600" />
                              {job.experience}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center md:flex-col justify-between md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-line">
                          <button
                            onClick={(e) => toggleSaveJob(job.id, e)}
                            className={`p-2 rounded border transition ${
                              isSaved
                                ? 'bg-teal-50 border-teal-200 text-teal-600'
                                : 'bg-paper border-line text-slate hover:text-teal-600'
                            }`}
                            title={isSaved ? 'Unsave Job' : 'Save Job'}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="w-4 h-4 text-teal-600" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>

                          <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase tracking-wider rounded transition flex items-center gap-1">
                            Apply <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-surface border border-line rounded-lg p-12 text-center space-y-3">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-ink-900">
                  No Openings Match Your Filter Criteria
                </h3>
                <p className="text-xs text-slate max-w-md mx-auto">
                  Try clearing some filter parameters or search terms to view all 2,400+ active banking &amp; corporate postings.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLocation('All');
                    setSelectedJobType('All');
                    setSelectedExperience('All');
                    setIsRemoteOnly(false);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-ink-800 text-surface text-xs font-mono font-bold uppercase rounded hover:bg-ink-900 transition"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      <JobQuickModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApplySuccess={() => {
          // Optional action
        }}
      />

      {/* Job Alert Modal */}
      {alertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 backdrop-blur-xs p-4">
          <div className="bg-surface border border-line rounded-lg p-6 max-w-md w-full shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h3 className="font-display font-bold text-lg text-ink-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-600" />
                Create Custom Job Alert
              </h3>
              <button onClick={() => setAlertModalOpen(false)} className="text-slate hover:text-ink-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!alertSaved ? (
              <form onSubmit={handleSaveAlert} className="space-y-4">
                <p className="text-xs text-slate">
                  Receive instant notifications when new banking, credit, or corporate roles match your criteria.
                </p>
                <div>
                  <label className="block text-xs font-mono text-slate mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate mb-1">Preferred Sector</label>
                  <select className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500">
                    <option value="Banking">Banking &amp; Financial Services</option>
                    <option value="Corporate">Corporate HR &amp; Operations</option>
                    <option value="Finance">Finance &amp; FP&amp;A</option>
                    <option value="IT">IT &amp; Systems</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase rounded shadow-xs transition"
                >
                  Subscribe to Job Alerts
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-teal-600 mx-auto" />
                <h4 className="font-display font-bold text-base text-ink-900">Job Alert Configured!</h4>
                <p className="text-xs text-slate">
                  We will send new role matches to <strong>{alertEmail}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="bg-surface w-4/5 max-w-xs h-full p-6 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <h3 className="font-display font-bold text-base text-ink-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-slate">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate mb-2">Sector</label>
              <div className="space-y-1 text-xs">
                {['All', 'Banking', 'Corporate', 'Finance', 'Operations', 'IT'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-1.5 rounded ${
                      selectedCategory === cat ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 bg-teal-500 text-surface font-bold text-xs uppercase rounded"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
