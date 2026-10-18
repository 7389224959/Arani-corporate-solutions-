import type {Metadata} from 'next';
import './globals.css';
import { MetaPixel } from '@/components/MetaPixel';
import { MegaDriveTopBanner } from '@/components/MegaDriveTopBanner';

export const metadata: Metadata = {
  title: 'Aranii Corporate Solutions | Multi-Stream Recruitment: Work From Home, Data Entry, KYC & Freshers',
  description: 'Connecting job seekers and enterprise employers across India. Specializing in Work From Home jobs, Data Entry, KYC Verification, Fresher hiring, and Corporate placements.',
  verification: {
    google: 'googlecde01b7b69da4d8f',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-paper text-ink-900 antialiased font-sans">
        <MetaPixel />
        <MegaDriveTopBanner />
        {children}
      </body>
    </html>
  );
}

