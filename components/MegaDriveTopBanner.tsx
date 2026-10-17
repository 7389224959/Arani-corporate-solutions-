'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export function MegaDriveTopBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const pathname = usePathname();

  // Suppress top banner on the dedicated Mega Job Drive landing page itself
  if (pathname === '/mega-job-drive' || isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Mega Job Drive 2026 Announcement"
      className="w-full bg-[#001428] text-white border-b border-[#003865]/80 relative z-40 shadow-sm"
    >
      {/* Sleek Executive Notification Ribbon */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3 text-xs">
        
        {/* Left / Center Link to Landing Page */}
        <Link
          href="/mega-job-drive"
          className="flex-1 flex items-center gap-2 sm:gap-3 overflow-hidden group hover:opacity-95 transition"
        >
          {/* Status Badge */}
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase bg-teal-500/20 text-teal-300 border border-teal-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            MEGA JOB DRIVE 2026
          </span>

          {/* Primary Announcement Copy */}
          <div className="truncate flex items-center gap-2 text-slate-200">
            <span className="font-semibold text-white truncate">
              10 Lakh+ Banking &amp; Corporate Vacancies Across India
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-teal-300 font-medium">
              10th to Post-Graduate
            </span>
            <span className="hidden lg:inline text-slate-400">•</span>
            <span className="hidden lg:inline text-amber-300 font-mono font-semibold">
              Intake Fee ₹299
            </span>
          </div>
        </Link>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/mega-job-drive"
            className="px-3 sm:px-3.5 py-1 rounded-full bg-teal-500 hover:bg-teal-400 text-[#001D3D] text-[11px] sm:text-xs font-bold shadow-xs hover:shadow transition flex items-center gap-1"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          {/* Quick Details Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition flex items-center gap-0.5 text-[11px] font-mono"
            aria-label={isExpanded ? 'Collapse drive details' : 'Expand drive details'}
            title={isExpanded ? 'Collapse details' : 'View drive summary'}
          >
            <span className="hidden sm:inline text-[10px]">
              {isExpanded ? 'Hide' : 'Details'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Dismiss banner"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Executive Mini-Summary (Only visible when user clicks Details) */}
      {isExpanded && (
        <div className="bg-[#001D3D] border-t border-[#003865] px-4 py-4 sm:py-5 animate-fadeIn">
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  All India Mega Banking &amp; Corporate Recruitment Drive Overview
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Spot and virtual interview schedules coordinated with premier private banks and multinational enterprises.
                </p>
              </div>

              <Link
                href="/mega-job-drive"
                className="self-start sm:self-auto px-4 py-1.5 rounded-full bg-teal-500 hover:bg-teal-400 text-[#001D3D] text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <span>Open Full Drive Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-slate-400 block text-[11px] font-mono">VACANCIES</span>
                <span className="font-extrabold text-teal-300 text-sm sm:text-base">10 Lakh+ Positions</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-slate-400 block text-[11px] font-mono">DRIVE WINDOW</span>
                <span className="font-bold text-white text-sm sm:text-base">20th – 27th Oct 2026</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-slate-400 block text-[11px] font-mono">ELIGIBILITY</span>
                <span className="font-bold text-white text-sm sm:text-base">10th, 12th, Graduate, PG</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-slate-400 block text-[11px] font-mono">REGISTRATION FEE</span>
                <span className="font-bold text-amber-300 text-sm sm:text-base">₹299 (Pass &amp; Support)</span>
              </div>
            </div>

            {/* Participating Banks Pills */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] pt-1">
              <span className="text-slate-400 font-mono flex items-center gap-1">
                <Building2 className="w-3 h-3 text-teal-400" />
                Featured Employers:
              </span>
              {['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'IndusInd', 'Standard Chartered'].map(
                (name, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
