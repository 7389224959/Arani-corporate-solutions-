import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aranii Corporate Solutions | Banking & Corporate Recruitment, HR Advisory',
  description: 'Connecting top talent with leading banks and enterprise corporations. End-to-end HR services, contract staffing, and career placement.',
  verification: {
    google: 'googlecde01b7b69da4d8f',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-paper text-ink-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
