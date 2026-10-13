'use client';

import React from 'react';
import { MegaDriveLegalShell } from '@/components/MegaDriveLegalShell';

export default function MegaDrivePrivacyPage() {
  return (
    <MegaDriveLegalShell
      title="Candidate Privacy & Data Protection Policy"
      subtitle="How Aranii Corporate Solutions safeguards candidate personally identifiable information (PII) during the Mega Banking Job Drive."
      lastUpdated="October 13, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          1. Information We Collect
        </h2>
        <p>
          When you register for the All India Mega Banking Job Drive 2026, we collect necessary candidate data to evaluate eligibility and schedule interviews, including:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
          <li><b>Identity &amp; Contact:</b> Full name, mobile number, WhatsApp number, email address, current city and state.</li>
          <li><b>Academic &amp; Professional:</b> Highest degree, passing year, total work experience, current employer, current &amp; expected CTC, resume URL.</li>
          <li><b>Payment Verification:</b> UPI transaction reference / UTR number and payment receipt screenshot.</li>
          <li><b>Campaign Attribution:</b> Anonymous referral sources, campaign parameters (UTM tags), and Meta Pixel interaction events.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          2. How Your Data Is Used
        </h2>
        <p>Candidate information is used solely for the following legitimate recruitment purposes:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
          <li>Verifying candidate qualifications and generating your official Admit Card with assigned interview time slots.</li>
          <li>Sharing candidate resume summaries with talent acquisition teams of participating private &amp; PSU banks for shortlist matching.</li>
          <li>Sending critical drive updates, hall ticket downloads, and interview confirmations via SMS, WhatsApp, and email.</li>
          <li>Audit compliance and verification against unauthorized or duplicate registrations.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          3. We Do Not Sell Your Data
        </h2>
        <p>
          Aranii Corporate Solutions maintains a strict zero-spam, anti-sale policy. Candidate data is <b>never sold, leased, or rented</b> to third-party telemarketing firms, personal loan lead aggregators, or unauthorized commercial databases. Data is shared strictly with banks participating in the drive for hiring consideration.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          4. Data Storage &amp; Security Measures
        </h2>
        <p>
          All candidate records and uploaded documents are encrypted in transit via SSL/TLS 1.3 and stored in secured cloud databases enforcing Row Level Security (RLS). Access to candidate dossiers is restricted to authorized recruitment consultants.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          5. Data Subject Rights &amp; Deletion
        </h2>
        <p>
          Candidates may request a copy of their stored registration information or request deletion of their profile following the conclusion of the recruitment drive by contacting our Data Protection Desk at <code className="text-teal-300">privacy@aranicorporate.com</code>.
        </p>
      </section>
    </MegaDriveLegalShell>
  );
}
