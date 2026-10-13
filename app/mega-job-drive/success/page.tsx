'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import { trackMegaDriveAdmitCardDownload } from '@/lib/metaPixel';
import {
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2,
  User,
  GraduationCap,
  Briefcase,
  FileText,
  ArrowLeft,
  Share2
} from 'lucide-react';

interface RegistrationDetails {
  id: string;
  registration_token: string;
  roll_number?: string | null;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  highest_qualification: string;
  total_experience: string;
  target_role: string;
  fee_amount: number;
  payment_status: 'pending_payment' | 'pending_verification' | 'verified' | 'rejected';
  payment_utr?: string | null;
  interview_slot?: string | null;
  interview_venue?: string;
  rejection_reason?: string | null;
  created_at: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [registration, setRegistration] = useState<RegistrationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setErrorMsg('No registration token specified. Please register first.');
      setIsLoading(false);
      return;
    }

    const fetchRegistration = async () => {
      try {
        const res = await fetch(`/api/mega-job-drive/registration/${token}`);
        if (!res.ok) {
          throw new Error('Registration details not found.');
        }
        const data = await res.json();
        setRegistration(data.registration);
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to load admit card details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistration();
  }, [token]);

  const handlePrint = () => {
    if (token) {
      trackMegaDriveAdmitCardDownload(token);
    }
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <span>Generating Admit Card &amp; Fetching Registration...</span>
        </div>
      </div>
    );
  }

  if (errorMsg || !registration) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans text-slate-100">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">Registration Notice</h2>
          <p className="text-xs text-slate-400">{errorMsg || 'Could not locate your registration profile.'}</p>
          <Link
            href="/mega-job-drive"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-mono font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Mega Job Drive</span>
          </Link>
        </div>
      </div>
    );
  }

  const isVerified = registration.payment_status === 'verified';
  const isRejected = registration.payment_status === 'rejected';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation / Action bar */}
        <div className="flex items-center justify-between no-print">
          <Link
            href="/mega-job-drive"
            className="p-2 rounded hover:bg-slate-900 text-slate-400 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Mega Job Drive Home</span>
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-mono text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Admit Card</span>
          </button>
        </div>

        {/* STATUS ALERT NOTIFICATION */}
        <div className="no-print">
          {isVerified ? (
            <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-600/80 text-emerald-200 text-xs font-mono flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block text-white">Payment Verified &amp; Admit Card Active!</span>
                <span>
                  Your registration fee and UTR have been confirmed by our admissions team. Your official Roll Number is{' '}
                  <b className="text-emerald-300 font-mono">{registration.roll_number}</b>.
                </span>
              </div>
            </div>
          ) : isRejected ? (
            <div className="p-4 rounded-xl bg-red-950/70 border border-red-700 text-red-200 text-xs font-mono flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block text-white">Verification Discrepancy</span>
                <span>
                  Reason: {registration.rejection_reason || 'UTR proof could not be verified with banking records.'}{' '}
                  Please contact the WhatsApp helpline below to re-verify.
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-950/70 border border-amber-600/80 text-amber-200 text-xs font-mono flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block text-white">
                  Payment Verification Under Review (Ref: {registration.payment_utr || 'Pending'})
                </span>
                <span>
                  Your 12-digit UPI UTR has been logged. Our finance registrar verifies submissions within 15–30 minutes during drive hours. Keep this pass saved.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* OFFICIAL PRINTABLE ADMIT CARD PASS */}
        <div className="bg-slate-900 border-2 border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-black print:shadow-none">
          {/* Decorative Security Border Watermark */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-500" />

          {/* Admit Card Header */}
          <div className="border-b border-slate-800 print:border-gray-300 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AraniLogo className="w-8 h-8" />
              <div>
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-teal-400 print:text-teal-700 block">
                  ARANII CORPORATE SOLUTIONS PRIVATE LIMITED
                </span>
                <h1 className="text-base sm:text-lg font-black text-white print:text-black tracking-tight">
                  ALL INDIA MEGA BANKING JOB DRIVE 2026 • ADMIT CARD
                </h1>
              </div>
            </div>

            <div className="text-right sm:text-right font-mono">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block">TOKEN ID</span>
              <span className="text-xs font-bold text-white print:text-black bg-slate-950 print:bg-gray-100 px-2.5 py-1 rounded border border-slate-800 print:border-gray-300">
                {registration.registration_token}
              </span>
            </div>
          </div>

          {/* Roll Number & Status Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-200">
            <div>
              <span className="text-[10px] font-mono text-slate-500 print:text-gray-500 uppercase block">
                Official Roll Number
              </span>
              <span className="text-sm font-mono font-extrabold text-teal-400 print:text-teal-800">
                {registration.roll_number || 'PENDING VERIFICATION'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 print:text-gray-500 uppercase block">
                Verification Status
              </span>
              <span
                className={`text-xs font-mono font-bold uppercase inline-flex items-center gap-1 ${
                  isVerified
                    ? 'text-emerald-400 print:text-emerald-700'
                    : isRejected
                    ? 'text-red-400 print:text-red-700'
                    : 'text-amber-400 print:text-amber-700'
                }`}
              >
                {isVerified ? '✓ Verified / Confirmed' : isRejected ? '✗ Action Required' : '⏳ UTR Logged (Pending)'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 print:text-gray-500 uppercase block">
                Payment Ref / UTR
              </span>
              <span className="text-xs font-mono font-bold text-slate-200 print:text-gray-800">
                {registration.payment_utr || 'Direct Cash / Desk'}
              </span>
            </div>
          </div>

          {/* Candidate Dossier Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans mb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 print:text-gray-500 uppercase block">Candidate Name</span>
              <span className="font-bold text-white print:text-black text-sm">{registration.full_name}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 print:text-gray-500 uppercase block">Target Banking Role</span>
              <span className="font-bold text-teal-300 print:text-teal-900 text-sm">{registration.target_role}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 print:text-gray-500 uppercase block">Registered Mobile / Phone</span>
              <span className="font-mono text-slate-200 print:text-gray-800">{registration.phone}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 print:text-gray-500 uppercase block">Email Address</span>
              <span className="font-mono text-slate-200 print:text-gray-800">{registration.email}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 print:text-gray-500 uppercase block">Educational Qualification</span>
              <span className="text-slate-200 print:text-gray-800">{registration.highest_qualification}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 print:text-gray-500 uppercase block">Experience &amp; City</span>
              <span className="text-slate-200 print:text-gray-800">
                {registration.total_experience} • {registration.city}
              </span>
            </div>
          </div>

          {/* Reporting Schedule & Venue Box */}
          <div className="p-4 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300 mb-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-teal-400 print:text-teal-800 uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>Interview Slot &amp; Reporting Instructions</span>
            </div>
            <div className="text-xs text-slate-300 print:text-gray-800 space-y-1">
              <p>
                <b>Assigned Slot:</b>{' '}
                {registration.interview_slot || 'Saturday, 14 Nov 2026 • Reporting 09:30 AM (Batch 1)'}
              </p>
              <p>
                <b>Venue / Center:</b>{' '}
                {registration.interview_venue || 'Aranii Corporate Hub, BKC Complex, Mumbai / Regional Participating Centers'}
              </p>
            </div>
          </div>

          {/* Mandatory Document Checklist */}
          <div className="border-t border-slate-800 print:border-gray-200 pt-4 space-y-2 text-[11px] text-slate-400 print:text-gray-600">
            <span className="font-bold text-xs text-slate-300 print:text-black block font-mono">
              MANDATORY CHECKLIST FOR DRIVE INTERVIEW DAY:
            </span>
            <ul className="list-disc pl-4 space-y-1">
              <li>Carry 3 hard copies of your updated CV / Resume.</li>
              <li>Carry 1 printed copy of this official Admit Card pass.</li>
              <li>Original Photo ID proof (Aadhaar Card, PAN Card, or Passport).</li>
              <li>Photocopies of your highest qualification marksheets &amp; experience payslips (if any).</li>
              <li>Formal corporate attire required for participating bank HR rounds.</li>
            </ul>
          </div>
        </div>

        {/* WhatsApp Helpline Box */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs no-print">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="font-bold text-white block">Need assistance with your Admit Card or reporting slot?</span>
            <span className="text-slate-400 text-[11px]">Direct WhatsApp Admissions desk helpline available 24/7.</span>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20have%20registered%20for%20Aranii%20Mega%20Banking%20Job%20Drive.%20My%20Token%20is%20"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-mono font-bold transition flex items-center gap-1.5 shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp Helpline</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-xs">Loading Admit Card...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
