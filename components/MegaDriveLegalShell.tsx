'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AraniLogo } from '@/components/AraniLogo';
import { Shield, ArrowLeft, FileText, Lock, RefreshCw, Mail, Phone, Building2 } from 'lucide-react';

interface MegaDriveLegalShellProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function MegaDriveLegalShell({
  title,
  subtitle,
  lastUpdated = 'October 13, 2026',
  children,
}: MegaDriveLegalShellProps) {
  const pathname = usePathname();

  const legalLinks = [
    { href: '/mega-job-drive/terms', label: 'Terms & Conditions', icon: FileText },
    { href: '/mega-job-drive/privacy', label: 'Privacy Policy', icon: Lock },
    { href: '/mega-job-drive/refund', label: 'Refund Policy', icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/mega-job-drive"
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1.5 text-xs font-mono font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Drive</span>
            </Link>
            <div className="h-5 w-[1px] bg-slate-800" />
            <Link href="/" className="flex items-center gap-2">
              <AraniLogo className="w-6 h-6" />
              <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                Aranii <span className="text-teal-400">Mega Job Drive</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
              <Shield className="w-3.5 h-3.5" />
              <span>Official Policy</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        {/* Title Header */}
        <div className="mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest font-bold mb-2">
            <span>Aranii Corporate Solutions</span>
            <span>•</span>
            <span>Mega Banking Drive 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
            {title}
          </h1>
          <p className="text-slate-400 text-sm">{subtitle}</p>
          <div className="mt-3 text-xs font-mono text-slate-500">
            Effective &amp; Last Updated: {lastUpdated}
          </div>

          {/* Quick Legal Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
            {legalLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition shrink-0 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert prose-slate max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
          {children}
        </div>

        {/* Contact & Grievance Box */}
        <div className="mt-12 p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm font-mono uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Grievance Officer &amp; Support Contact</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            For candidate registration grievances, payment verification status, or policy clarifications regarding the All India Mega Banking Job Drive 2026:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <span>megadrive@aranicorporate.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <span>WhatsApp Helpline: +91 98765 43210</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs font-mono text-slate-500">
        <p>© 2026 Aranii Corporate Solutions Private Limited. All Rights Reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/mega-job-drive/terms" className="hover:text-teal-400 transition">Terms</Link>
          <Link href="/mega-job-drive/privacy" className="hover:text-teal-400 transition">Privacy</Link>
          <Link href="/mega-job-drive/refund" className="hover:text-teal-400 transition">Refund Policy</Link>
          <Link href="/mega-job-drive" className="hover:text-teal-400 transition">Job Drive</Link>
        </div>
      </footer>
    </div>
  );
}
