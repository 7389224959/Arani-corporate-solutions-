'use client';

import React from 'react';
import { MegaDriveLegalShell } from '@/components/MegaDriveLegalShell';

export default function MegaDriveRefundPage() {
  return (
    <MegaDriveLegalShell
      title="Cancellation & Refund Policy"
      subtitle="Candidate financial assurance, refund eligibility scenarios, and processing timelines for the Mega Banking Job Drive."
      lastUpdated="October 13, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          1. General Policy
        </h2>
        <p>
          Aranii Corporate Solutions values complete financial transparency. The registration fee of <b>₹499</b> covers administrative costs, preliminary candidate credential screening, and dedicated logistics for the recruitment drive.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          2. Refund Eligibility Scenarios
        </h2>
        <p>Candidates are eligible for a <b>100% full refund</b> under any of the following verifiable circumstances:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
          <li><b>Accidental Duplicate Payment:</b> If an applicant is charged multiple times due to a network glitch or double UPI submission for the same token, the duplicate charge will be refunded in full immediately.</li>
          <li><b>Drive Rescheduling Conflict:</b> In the unforeseen event that the drive dates are rescheduled by the organizers and the candidate is unavailable for the revised dates, a full refund may be requested within 48 hours of notification.</li>
          <li><b>Ineligible Candidate Cancellation Before Verification:</b> If an applicant requests cancellation prior to their credentials being audited and prior to the Admit Card being generated (within 2 hours of payment).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          3. Non-Refundable Scenarios
        </h2>
        <p>Refunds cannot be issued under the following situations:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
          <li>Candidate fails to report or attend their assigned interview slot (Candidate No-Show).</li>
          <li>Candidate is not selected or rejected during bank panel interviews. As a placement consultancy, Aranii provides interview access; employment offers depend entirely on interview merit.</li>
          <li>Candidate provides falsified educational documents or forged employment records that result in screening rejection.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          4. How to Request a Refund
        </h2>
        <p>
          To submit a refund request, send an email to <code className="text-teal-300">refunds@aranicorporate.com</code> or reach out on our WhatsApp support helpline with:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
          <li>Your unique Registration Token ID (e.g. <code className="text-slate-200">MJD-2026-XXXX-XXXX</code>).</li>
          <li>The 12-digit UPI UTR Number.</li>
          <li>Screenshot of the payment debit notification showing date and time.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          5. Processing Timelines
        </h2>
        <p>
          Approved refund claims are processed back to the original source bank account / UPI VPA within <b>3 to 5 business banking days</b> via standard National Payments Corporation of India (NPCI) UPI reversal channels.
        </p>
      </section>
    </MegaDriveLegalShell>
  );
}
