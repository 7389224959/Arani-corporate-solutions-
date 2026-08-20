'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { SAMPLE_FAQS } from '@/lib/sampleData';
import {
  Building2,
  Users,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  ChevronRight,
  Send,
  FileCheck,
  UserCheck,
  CreditCard,
  Briefcase,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function EmployersPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: 'Commercial Banking',
    roleNeeded: 'Branch Operations Lead',
    headcount: '1-5 Openings',
    urgency: 'Within 72 Hours',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const employerFaqs = SAMPLE_FAQS.filter((f) => f.category === 'employer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) return;
    setIsSubmitting(true);
    try {
      const { submitEmployerLead } = await import('@/lib/supabase');
      await submitEmployerLead({
        companyName: formData.companyName,
        contactPerson: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        industry: formData.industry,
        rolesNeeded: formData.roleNeeded,
        headcount: formData.headcount,
        urgency: formData.urgency,
        notes: formData.notes
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Error submitting employer lead to Supabase:', err);
      // Still show success to user
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink-900 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-line shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AraniLogo className="h-9" variant="dark" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-slate hover:text-teal-600 transition">
              Home
            </Link>
            <Link href="/jobs" className="text-slate hover:text-teal-600 transition">
              Live Job Board
            </Link>
            <Link href="/employers" className="text-teal-600 font-bold border-b-2 border-teal-500 pb-0.5">
              For Employers
            </Link>
            <Link href="/insights" className="text-slate hover:text-teal-600 transition">
              Insights
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/employer/dashboard"
              className="px-4 py-2 bg-ink-800 hover:bg-ink-900 text-surface text-xs font-bold uppercase tracking-wider rounded transition flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              Employer Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-ink-950 text-surface py-16 md:py-24 border-b border-ink-800 rising-bars relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-teal-400 bg-ink-800 px-3 py-1 rounded border border-teal-500/30">
              <span>{"// ENTERPRISE RECRUITMENT & HR ADVISORY"}</span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-surface leading-tight">
              The Right Hire in <span className="text-teal-400">72 Hours</span>, Not 72 Days.
            </h1>

            <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
              Aranii Corporate Solutions connects premier banks, NBFCs, and enterprise MNCs with pre-screened, interview-ready talent. Success-fee model — no shortlist, no invoice.
            </p>

            {/* SLA Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2 text-xs font-mono">
              <div className="p-3.5 bg-ink-900 border border-ink-800 rounded">
                <span className="text-teal-400 text-xl font-display font-bold block">72 Hours</span>
                <span className="text-muted">Shortlist Delivery SLA</span>
              </div>
              <div className="p-3.5 bg-ink-900 border border-ink-800 rounded">
                <span className="text-teal-400 text-xl font-display font-bold block">90 Days</span>
                <span className="text-muted">Free Replacement Guarantee</span>
              </div>
              <div className="p-3.5 bg-ink-900 border border-ink-800 rounded col-span-2 md:col-span-1">
                <span className="text-teal-400 text-xl font-display font-bold block">0 upfront</span>
                <span className="text-muted">Success-Fee Pricing</span>
              </div>
            </div>
          </div>

          {/* Request Talent Lead Form */}
          <div className="lg:col-span-5 bg-surface text-ink-900 p-6 md:p-8 rounded-lg border border-line shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
              <h3 className="font-display font-bold text-xl text-ink-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                Request Vetted Shortlist
              </h3>
              <span className="font-mono text-[10px] uppercase font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded">
                Fast-Track Intake
              </span>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Kotak Bank / HDFC"
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Name / Designation"
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="corporate@company.com"
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Target Role</label>
                    <select
                      value={formData.roleNeeded}
                      onChange={(e) => setFormData({ ...formData, roleNeeded: e.target.value })}
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                    >
                      <option value="Senior Credit Risk Analyst">Senior Credit Risk Analyst</option>
                      <option value="Branch Operations Lead">Branch Operations Lead</option>
                      <option value="Corporate HR Business Partner">Corporate HR Business Partner</option>
                      <option value="KYC & AML Officer">KYC &amp; AML Officer</option>
                      <option value="Wealth Relationship Manager">Wealth Relationship Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate mb-1">Headcount Needed</label>
                    <select
                      value={formData.headcount}
                      onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                      className="w-full px-3 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
                    >
                      <option value="1-5 Openings">1–5 Openings</option>
                      <option value="6-15 Openings">6–15 Openings</option>
                      <option value="16+ Bulk Drive">16+ Bulk Campus Drive</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-bold uppercase tracking-wider rounded shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Activate 72-Hour Shortlist SLA
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
                <h4 className="font-display font-bold text-xl text-ink-900">Intake Received!</h4>
                <p className="text-xs text-slate max-w-xs mx-auto">
                  An Account Lead from Aranii Corporate Solutions will review your requirement and reach out to <strong>{formData.email}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-ink-800 text-surface text-xs font-mono font-bold uppercase rounded hover:bg-ink-900 transition"
                >
                  Submit Another Intake
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5 Core Services Portfolio Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-xs uppercase font-bold text-teal-600 tracking-wider">
            {"// END-TO-END HR & RECRUITMENT PORTFOLIO"}
          </span>
          <h2 className="text-3xl font-display font-bold text-ink-900">
            5 Tailored Solutions for Corporate Hiring Teams
          </h2>
          <p className="text-slate text-sm">
            From single executive searches to 200+ branch hiring drives, Aranii delivers high retention and complete regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-line rounded-lg p-6 shadow-xs hover:border-teal-500 transition space-y-3">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded flex items-center justify-center font-bold font-mono">
              01
            </div>
            <h3 className="font-display font-bold text-lg text-ink-900">Permanent Talent Placement</h3>
            <p className="text-xs text-slate leading-relaxed">
              Full-cycle executive search and contingency placement for commercial banking, credit underwriting, and corporate leadership.
            </p>
          </div>

          <div className="bg-surface border border-line rounded-lg p-6 shadow-xs hover:border-teal-500 transition space-y-3">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded flex items-center justify-center font-bold font-mono">
              02
            </div>
            <h3 className="font-display font-bold text-lg text-ink-900">Contract &amp; Temp Staffing</h3>
            <p className="text-xs text-slate leading-relaxed">
              Agile workforce solutions for seasonal banking operations, audit drives, and project-based fintech deployments.
            </p>
          </div>

          <div className="bg-surface border border-line rounded-lg p-6 shadow-xs hover:border-teal-500 transition space-y-3">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded flex items-center justify-center font-bold font-mono">
              03
            </div>
            <h3 className="font-display font-bold text-lg text-ink-900">Executive Search</h3>
            <p className="text-xs text-slate leading-relaxed">
              Confidential headhunting for C-suite, VP, and Vice President level appointments across banking and financial conglomerates.
            </p>
          </div>

          <div className="bg-surface border border-line rounded-lg p-6 shadow-xs hover:border-teal-500 transition space-y-3">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded flex items-center justify-center font-bold font-mono">
              04
            </div>
            <h3 className="font-display font-bold text-lg text-ink-900">Background Verification (BGV)</h3>
            <p className="text-xs text-slate leading-relaxed">
              Rigorous 7-point background checks covering educational verification, employment history, CIBIL credit checks, and criminal records.
            </p>
          </div>

          <div className="bg-surface border border-line rounded-lg p-6 shadow-xs hover:border-teal-500 transition space-y-3 md:col-span-2">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded flex items-center justify-center font-bold font-mono">
              05
            </div>
            <h3 className="font-display font-bold text-lg text-ink-900">Payroll &amp; HR Advisory Services</h3>
            <p className="text-xs text-slate leading-relaxed">
              Statutory compliance management (PF, ESI, LWF), automated monthly payroll processing, and labor law advisory for growing corporate teams.
            </p>
          </div>
        </div>
      </section>

      {/* Process Rail Section */}
      <section className="bg-ink-900 text-surface py-16 rising-bars border-y border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs uppercase font-bold text-teal-400">
              {"// HOW WE DELIVER IN 72 HOURS"}
            </span>
            <h2 className="text-3xl font-display font-bold text-surface">
              The 4-Step Shortlist Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="p-5 bg-ink-800/80 border border-ink-700 rounded-lg space-y-3">
              <div className="text-2xl font-display font-bold text-teal-400 font-mono">01</div>
              <h4 className="font-display font-bold text-base text-surface">Requirement Intake</h4>
              <p className="text-xs text-slate-300">Detailed job description, CTC band, and must-have skill mapping with dedicated Account Lead.</p>
            </div>

            <div className="p-5 bg-ink-800/80 border border-ink-700 rounded-lg space-y-3">
              <div className="text-2xl font-display font-bold text-teal-400 font-mono">02</div>
              <h4 className="font-display font-bold text-base text-surface">Pre-Screening &amp; ID Check</h4>
              <p className="text-xs text-slate-300">Vetting against 12,000+ active profiles, National ID check, and technical domain screening.</p>
            </div>

            <div className="p-5 bg-ink-800/80 border border-ink-700 rounded-lg space-y-3">
              <div className="text-2xl font-display font-bold text-teal-400 font-mono">03</div>
              <h4 className="font-display font-bold text-base text-surface">72h Shortlist Delivery</h4>
              <p className="text-xs text-slate-300">Delivery of 3–5 interview-ready candidate profiles with match scores and verified resumes.</p>
            </div>

            <div className="p-5 bg-ink-800/80 border border-ink-700 rounded-lg space-y-3">
              <div className="text-2xl font-display font-bold text-teal-400 font-mono">04</div>
              <h4 className="font-display font-bold text-base text-surface">Placement &amp; 90-Day Guarantee</h4>
              <p className="text-xs text-slate-300">Seamless offer rollout and 90-day free replacement guarantee active upon joining.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase font-bold text-teal-600">
            {"// FREQUENTLY ASKED QUESTIONS"}
          </span>
          <h2 className="text-3xl font-display font-bold text-ink-900">
            Employer Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {employerFaqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div key={faq.id} className="bg-surface border border-line rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 font-display font-bold text-ink-900 text-sm md:text-base flex items-center justify-between gap-4 hover:bg-paper transition"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-teal-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate leading-relaxed border-t border-line pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
