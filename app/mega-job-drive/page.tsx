import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { MegaJobDriveLandingView } from './MegaJobDriveLandingView';

export const metadata: Metadata = {
  title: 'All India Mega Job Drive 2026 | 10 Lakh+ Vacancies • WFH, Data Entry, KYC & Freshers | Aranii',
  description:
    'Join the All India Mega Job Drive 2026. 10 Lakh+ verified openings in Work From Home, Data Entry, KYC Verification, Freshers (0 Exp), and Corporate sectors. 10th Pass, 12th Pass, Graduate & PG eligible. Official Candidate Intake & Admit Pass: ₹299.',
  openGraph: {
    title: 'All India Mega Job Drive 2026 | 10 Lakh+ Vacancies • Aranii',
    description:
      'Spot and virtual interviews open across India. Work From Home, Data Entry, KYC Verification, and Fresher roles. Candidate Intake Fee: ₹299.',
    images: ['/mega-drive-banner.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All India Mega Job Drive 2026 | 10 Lakh+ Vacancies',
    description: 'Work From Home, Data Entry, KYC Verification, and Fresher roles. Freshers & experienced welcome.',
    images: ['/mega-drive-banner.png'],
  },
};

export default function MegaJobDrivePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#001020] text-slate-300 flex items-center justify-center p-6 font-mono text-xs">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Loading Mega Job Drive 2026 Portal...</p>
          </div>
        </div>
      }
    >
      <MegaJobDriveLandingView />
    </Suspense>
  );
}
