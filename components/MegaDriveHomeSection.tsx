'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  Flame,
  Award,
  Users
} from 'lucide-react';

const TOP_BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra',
  'IndusInd Bank',
  'Standard Chartered',
  'AU Small Finance',
  'Bajaj Finserv'
];

export function MegaDriveHomeSection() {
  return (
    <section className="relative py-10 sm:py-14 bg-paper border-b border-line overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00509D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Banner Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#001428] via-[#001D3D] to-[#002855] text-white shadow-2xl border border-[#003865]">
          {/* Subtle geometric grid background */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10 p-6 sm:p-10 lg:p-12">
            {/* Top Status & Badge Line */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  FLAGSHIP HIRING EVENT
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  10 LAKH+ VACANCIES
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  20th – 27th Oct 2026
                </span>
                <span className="hidden md:flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  Virtual &amp; 500+ Hubs
                </span>
              </div>
            </div>

            {/* Central Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
              {/* Left Column: Headlines & Value Prop */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-teal-400 text-xs sm:text-sm font-bold tracking-wider uppercase font-mono block">
                  All India Mega Banking &amp; Corporate Recruitment Drive
                </span>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                  Step Into High-Impact Roles With Leading Banks &amp; MNCs
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Virtual &amp; spot interview slots now open for freshers and experienced professionals. Direct interview scheduling, candidate pre-screening, and spot offer letters backed by Aranii Corporate Solutions.
                </p>

                {/* Key Benefit Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>10th to Post-Graduate</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Spot Offers in 48h</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200 col-span-2 sm:col-span-1">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Nominal Fee: ₹299 Only</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/mega-job-drive"
                    className="px-6 py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 text-[#001D3D] font-extrabold text-sm shadow-lg hover:shadow-teal-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span>Register for Mega Drive (₹299)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/mega-job-drive#openings"
                    className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition flex items-center gap-2"
                  >
                    <span>View All 1,500+ Openings</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: High-Value Metric Matrix */}
              <div className="lg:col-span-5">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-300">
                      Drive Fast Facts
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Pan-India Coverage
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#001020]/60 p-3.5 rounded-xl border border-white/5">
                      <span className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-400 block">
                        10L+
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        Verified Vacancies
                      </span>
                    </div>

                    <div className="bg-[#001020]/60 p-3.5 rounded-xl border border-white/5">
                      <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300 block">
                        ₹3.5 - 18L
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        Salary CTC Range
                      </span>
                    </div>

                    <div className="bg-[#001020]/60 p-3.5 rounded-xl border border-white/5">
                      <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white block">
                        500+
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        Metro &amp; Tier-2 Hubs
                      </span>
                    </div>

                    <div className="bg-[#001020]/60 p-3.5 rounded-xl border border-white/5">
                      <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 block">
                        ₹299
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        Registration &amp; Admit Pass
                      </span>
                    </div>
                  </div>

                  {/* Candidate Advisory Note */}
                  <div className="pt-2 text-[11px] text-slate-400 flex items-start gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                    <Award className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>
                      Direct interviews with leading private banks, NBFCs, and enterprise tech employers. Verified candidate passes with confirmed interview slot.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Marquee / Partner Bank Badges */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
                <span>PARTICIPATING EMPLOYERS:</span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-xs">
                {TOP_BANKS.map((bank, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-medium text-[11px] transition"
                  >
                    {bank}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
