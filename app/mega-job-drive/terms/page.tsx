'use client';

import React from 'react';
import { MegaDriveLegalShell } from '@/components/MegaDriveLegalShell';

export default function MegaDriveTermsPage() {
  return (
    <MegaDriveLegalShell
      title="Terms & Conditions of Participation"
      subtitle="Rules, eligibility norms, and corporate protocols governing the All India Mega Banking Job Drive 2026."
      lastUpdated="October 13, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          1. Initiative Overview
        </h2>
        <p>
          The <b>All India Mega Banking Job Drive 2026</b> is an organized talent placement and career transition initiative conducted by <b>Aranii Corporate Solutions Private Limited</b> (&quot;Aranii&quot;, &quot;we&quot;, &quot;us&quot;), connecting qualified job aspirants with active recruitment mandates across premier Private Banks, Public Sector Banks, Non-Banking Financial Companies (NBFCs), and FinTech institutions across India.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          2. Candidate Eligibility &amp; Representation
        </h2>
        <p>
          By registering for the Mega Job Drive, candidates warrant and represent that:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
          <li>All submitted personal, academic, contact, and employment information is authentic, true, and verifiable.</li>
          <li>They possess or are in the final year of completing a recognized educational qualification from an accredited institution.</li>
          <li>They are legally entitled to work in India and possess a valid Aadhaar Card and Permanent Account Number (PAN).</li>
          <li>Submission of forged educational degrees, manipulated payslips, or false experience certificates will result in immediate disqualification and potential legal reporting.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          3. Nominal Application &amp; Verification Fee
        </h2>
        <p>
          A non-exclusive, nominal application verification fee of <b>₹499 (Rupees Four Hundred and Ninety-Nine Only)</b> is charged per registration. This fee covers:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
          <li>Individual document and academic eligibility screening.</li>
          <li>Assignment of a personalized Roll Number and issuance of the official interview Admit Card.</li>
          <li>Logistics coordination with participating bank HR panels.</li>
          <li>Aranii Corporate Solutions does <b>not</b> guarantee employment or offer letters solely upon payment of the application fee. Selection is strictly merit-based and dependent on candidate performance in interviews.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          4. Interview Conduct &amp; Reporting
        </h2>
        <p>
          Candidates must report to their assigned venue (or virtual interview meeting link) punctually at their designated reporting time. Attendees must adhere to formal corporate business attire and bring required copies of their CV, photo identity, and Admit Card.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider">
          5. Final Hiring Authority
        </h2>
        <p>
          Participating banks and corporate employers retain sole and ultimate discretion regarding candidate selection, compensation packages, background verification (BGV), credit score (CIBIL) criteria, and job location deployment. Aranii operates exclusively as an authorized recruitment consultancy and talent sourcing partner.
        </p>
      </section>
    </MegaDriveLegalShell>
  );
}
