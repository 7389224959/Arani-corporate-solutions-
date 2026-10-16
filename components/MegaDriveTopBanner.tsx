'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Briefcase,
  Flame,
  CheckCircle2
} from 'lucide-react';

export function MegaDriveTopBanner() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  // On the dedicated Mega Drive landing page itself, suppress the top referral banner
  if (pathname === '/mega-job-drive') {
    return null;
  }

  return (
    <aside aria-label="Mega Job Drive Announcement" className="w-full bg-slate-950 border-b-2 border-amber-500 shadow-xl relative z-40">
      {/* Dynamic Top Announcement Strip */}
      <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-slate-950 px-3 py-1.5 text-xs font-mono font-black flex items-center justify-between shadow-inner">
        <Link
          href="/mega-job-drive"
          className="flex-1 flex items-center justify-center gap-2 overflow-hidden hover:opacity-90 transition text-center"
        >
          <span className="bg-slate-950 text-amber-300 text-[10px] uppercase px-2 py-0.5 rounded font-extrabold shrink-0 flex items-center gap-1 shadow-xs">
            <Flame className="w-3 h-3 text-red-400 fill-red-400 animate-pulse" />
            4 DAYS ONLY
          </span>
          <span className="truncate tracking-wide uppercase font-black text-[11px] sm:text-xs">
            🚨 ARANII MEGA JOB DRIVE: 10 LAKH+ VACANCIES • 10th / 12th / GRADUATE / PG • REGISTRATION &amp; SUPPORT ONLY ₹299!
          </span>
          <span className="hidden md:inline-flex items-center gap-1 bg-slate-950 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
            REGISTER NOW <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded text-slate-900 hover:bg-black/10 transition shrink-0 ml-2"
          aria-label={isExpanded ? 'Collapse banner' : 'Expand banner'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Clickable Hero Visual Banner Container */}
      {isExpanded && (
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-2 sm:p-3">
          <Link
            href="/mega-job-drive"
            className="block max-w-5xl mx-auto rounded-xl overflow-hidden border-2 border-amber-400/80 hover:border-amber-300 shadow-2xl transition duration-300 transform hover:-translate-y-0.5 group bg-slate-950"
            title="Click to Register for All India Mega Banking & Corporate Job Drive"
          >
            {/* Desktop & Tablet Panorama View */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[16/6] md:aspect-[16/5] bg-slate-950 overflow-hidden flex items-center justify-between">
              <Image
                src="/mega-drive-banner.png"
                alt="All India Mega Job Drive 2026 - 10 Lakh+ Vacancies, Pan India Opportunity, Registration only ₹299"
                fill
                className="object-cover object-top group-hover:scale-[1.02] transition duration-500"
                priority
                referrerPolicy="no-referrer"
              />

              {/* Gradient Scrim for crisp text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/80 pointer-events-none" />

              {/* Dynamic Overlay Content for High Readability across all viewports */}
              <div className="relative z-10 p-4 sm:p-6 w-full flex flex-col justify-between h-full pointer-events-none">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-amber-400 text-slate-950 font-black font-mono text-[10px] sm:text-xs uppercase px-2.5 py-1 rounded shadow-md tracking-wider">
                    PAN-INDIA OPPORTUNITY • 12 OCT – 15 OCT
                  </span>
                  <span className="bg-red-600 text-white font-black font-mono text-[10px] sm:text-xs uppercase px-2.5 py-1 rounded shadow-md animate-pulse">
                    FEE ONLY ₹299
                  </span>
                </div>

                <div className="max-w-xl space-y-1">
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight uppercase leading-none">
                    MEGA JOB DRIVE
                  </h2>
                  <p className="text-white text-xs sm:text-sm md:text-base font-extrabold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    10 LAKH+ JOB VACANCIES • 10th, 12th, Graduate &amp; Post Graduate
                  </p>
                  <p className="text-slate-300 text-[11px] sm:text-xs hidden sm:block drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Banking, IT, Retail, Healthcare, Data Entry &amp; Work From Home • Salary ₹35,000 to ₹2.5 Lakhs*
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[10px] sm:text-xs font-mono text-slate-300 font-bold hidden sm:inline-block">
                    Listed on National Career Service (NCS) Platform*
                  </span>
                  <span className="px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-red-600 to-amber-500 group-hover:from-red-500 group-hover:to-amber-400 text-white font-mono text-xs sm:text-sm font-black rounded-lg uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition ml-auto">
                    <span>APPLY ONLINE NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </aside>
  );
}
