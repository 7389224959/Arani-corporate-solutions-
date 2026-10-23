'use client';

import React from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { Lock, Phone, Mail, MapPin, FileText } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-ink-950 text-slate-300 pt-16 pb-6 border-t border-ink-800 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-ink-800">
          
          <div className="lg:col-span-2 space-y-4">
            <AraniLogo variant="light" size="md" />
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Aranii Corporate Solutions is an all-stream recruitment and HR advisory firm connecting talent with leading companies, specializing in Work From Home, Data Entry, KYC Verification, and Fresher hiring.
            </p>
            <div className="font-mono text-[11px] text-teal-400 font-bold tracking-widest">
              TAGLINE: GROW WITH THE OPPORTUNITY
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-surface mb-3">For Candidates</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/jobs" className="hover:text-surface transition">Browse Jobs by Stream</Link></li>
              <li><Link href="/#services" className="hover:text-surface transition">WFH &amp; Data Entry Tracks</Link></li>
              <li><Link href="/mega-job-drive" className="hover:text-surface transition text-amber-300 font-bold">Mega Job Drive 2026</Link></li>
              <li><Link href="/#faq" className="hover:text-surface transition">Candidate FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-surface mb-3">For Employers</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/employers" className="hover:text-surface transition">Request Shortlist (72h)</Link></li>
              <li><Link href="/employers" className="hover:text-surface transition">Recruitment Solutions</Link></li>
              <li><Link href="/#partners" className="hover:text-surface transition">Our Partner Network</Link></li>
              <li><Link href="/employers" className="hover:text-surface transition">90-Day Guarantee</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-surface mb-3">Contact HQ</h4>
            <p className="text-slate-400 leading-relaxed mb-2 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
              <span>Aranii Corporate Towers, BKC Commercial Complex, Mumbai - 400051</span>
            </p>
            <p className="text-teal-400 font-mono font-bold mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 (0) 800-ARANII-HR</span>
            </p>
            <div className="pt-2 border-t border-ink-800">
              <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Staff Access</span>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-300 transition font-mono"
              >
                <Lock className="w-3 h-3 text-teal-400" />
                <span>Admin Portal Login →</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Legal & Standard Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} Aranii Corporate Solutions. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/mega-job-drive/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <span className="text-slate-700">•</span>
            <Link href="/mega-job-drive/terms" className="hover:text-teal-300 font-semibold transition">Terms &amp; Conditions (T&amp;C)</Link>
            <span className="text-slate-700">•</span>
            <Link href="/mega-job-drive/refund" className="hover:text-slate-300 transition">Refund Policy</Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-ink-900 hover:bg-teal-950/80 text-teal-400 hover:text-teal-300 border border-ink-700 hover:border-teal-500/50 shadow-xs transition font-mono font-bold text-xs group"
              title="Aranii Administrator Portal"
            >
              <Lock className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>

        {/* Bottom End Administrative Strip with T&C Button */}
        <div className="mt-8 pt-4 border-t border-ink-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Aranii Secure Operations &amp; Enterprise Governance</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* T&C Page Button */}
            <Link
              href="/mega-job-drive/terms"
              id="footer-bottom-tc-btn"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 hover:text-white border border-teal-500/40 hover:border-teal-400 font-bold text-xs transition shadow-xs group"
              title="Read Terms and Conditions (T&C)"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>Terms &amp; Conditions (T&amp;C)</span>
            </Link>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 hidden sm:inline">Authorized Staff Only:</span>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 hover:text-surface border border-teal-500/40 hover:border-teal-400 font-bold text-xs transition-all shadow-xs group"
              >
                <Lock className="w-3.5 h-3.5 text-teal-400 group-hover:rotate-12 transition-transform" />
                <span>Admin Login</span>
                <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 group-hover:bg-teal-500/30">
                  CMS &amp; CRM
                </span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
