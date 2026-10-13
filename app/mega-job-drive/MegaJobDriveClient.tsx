'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  trackMegaDriveLead,
  trackMegaDriveInitiateCheckout,
  trackMegaDrivePurchase,
  getUtmParams,
} from '@/lib/metaPixel';
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  CreditCard,
  QrCode,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Briefcase,
  User,
  GraduationCap,
  Building2,
  Sparkles,
} from 'lucide-react';

const BANKING_ROLES = [
  'Relationship Manager (Retail / Corporate)',
  'Branch Operations Executive / Teller',
  'Credit Analyst / Underwriter',
  'Home Loan & LAP Sales Officer',
  'Gold Loan & Microfinance Officer',
  'Wealth Management / Premier Banking Advisor',
  'KYC, AML & Risk Operations',
  'Digital Banking & FinTech Solutions',
];

const QUALIFICATIONS = [
  'Graduate (B.Com / BBA / B.Sc / BA)',
  'Post Graduate / MBA (Finance / Marketing)',
  'Engineering Graduate (B.Tech / B.E)',
  'CA / CMA / CFA / CS Pursuing / Qualified',
  'Diploma / Final Year Student (2026 Batch)',
];

const EXPERIENCE_LEVELS = [
  'Fresher (0 Years)',
  '1 - 2 Years',
  '3 - 5 Years',
  '5 - 8 Years',
  '8+ Years (Managerial / VP Level)',
];

export function MegaJobDriveClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    city: '',
    state: '',
    highestQualification: QUALIFICATIONS[0],
    passoutYear: '2024',
    totalExperience: 'Fresher (0 Years)',
    currentCompany: '',
    currentCtc: '',
    expectedCtc: '',
    targetRole: BANKING_ROLES[0],
    preferredLocation: '',
  });

  // Payment State
  const [paymentUtr, setPaymentUtr] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isUploadingProof, setIsUploadingProof] = useState(false);

  // Generated Registration Info
  const [registrationToken, setRegistrationToken] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const feeAmount = Number(process.env.NEXT_PUBLIC_MEGA_DRIVE_FEE) || 499;
  const upiId = process.env.NEXT_PUBLIC_MEGA_DRIVE_UPI_ID || 'aranii@icici';
  const upiName = process.env.NEXT_PUBLIC_MEGA_DRIVE_UPI_NAME || 'Aranii Corporate Solutions';

  // Check if token was provided in URL query (resume payment flow)
  useEffect(() => {
    const existingToken = searchParams.get('token');
    if (existingToken) {
      setRegistrationToken(existingToken);
      setStep(2);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 1 Submission: Register Candidate details
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.city.trim()) {
      setErrorMsg('Please fill in all required contact and location fields.');
      return;
    }

    if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const utm = getUtmParams();

      const res = await fetch('/api/mega-job-drive/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          utm,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit candidate profile');
      }

      setRegistrationToken(data.registrationToken);

      // Track Meta Pixel Lead & Initiate Checkout
      trackMegaDriveLead({
        role: formData.targetRole,
        city: formData.city,
        experience: formData.totalExperience,
      });
      trackMegaDriveInitiateCheckout(feeAmount, formData.targetRole);

      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Payment Screenshot File Upload
  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Screenshot file size exceeds 5MB. Please upload a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setScreenshotPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Step 2 Submission: Submit UPI UTR & Payment Proof
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!paymentUtr.trim() || paymentUtr.trim().length < 6) {
      setErrorMsg('Please enter the 12-digit UPI Reference / UTR Number found on your payment receipt.');
      return;
    }

    if (!registrationToken) {
      setErrorMsg('Registration token missing. Please start again from Step 1.');
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/mega-job-drive/submit-payment-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationToken,
          paymentUtr: paymentUtr.trim(),
          paymentScreenshotUrl: screenshotPreview || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit payment verification proof');
      }

      // Track Meta Pixel Purchase
      trackMegaDrivePurchase(feeAmount, registrationToken, paymentUtr.trim());

      // Redirect to Admit Card / Success page
      router.push(`/mega-job-drive/success?token=${registrationToken}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification proof submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    upiName
  )}&am=${feeAmount}&cu=INR&tn=${encodeURIComponent(
    registrationToken ? `MJD Fee ${registrationToken}` : 'Mega Job Drive Fee'
  )}`;

  return (
    <div id="register-section" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Wizard Progress Stepper */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm transition ${
                step >= 1 ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'
              }`}
            >
              1
            </div>
            <span className="text-[11px] font-mono mt-1 text-slate-300 font-bold">Profile Details</span>
          </div>

          <div className={`flex-1 h-1 mx-3 rounded ${step >= 2 ? 'bg-teal-500' : 'bg-slate-800'}`} />

          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm transition ${
                step >= 2 ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'
              }`}
            >
              2
            </div>
            <span className="text-[11px] font-mono mt-1 text-slate-300 font-bold">UPI Payment</span>
          </div>

          <div className={`flex-1 h-1 mx-3 rounded ${step >= 3 ? 'bg-teal-500' : 'bg-slate-800'}`} />

          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm transition ${
                step >= 3 ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'
              }`}
            >
              3
            </div>
            <span className="text-[11px] font-mono mt-1 text-slate-300 font-bold">Admit Card</span>
          </div>
        </div>
      </div>

      {/* Global Error Banner */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-700/80 text-red-200 text-xs font-mono flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block mb-0.5">Registration Attention Required:</span>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {/* STEP 1: CANDIDATE PROFILE FORM */}
      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1 of 2: Candidate Eligibility &amp; Profile</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Register for All India Banking Drive
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Provide your accurate contact and academic details. Shortlisted candidates receive spot interview interview slots.
            </p>
          </div>

          {/* Section: Personal & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase font-bold text-teal-400 tracking-wider flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>1. Contact &amp; Identity</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Full Name (as per Aadhaar / PAN) <span className="text-teal-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Email Address <span className="text-teal-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. rahul.sharma@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Primary Mobile Number <span className="text-teal-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  WhatsApp Number (for Admit Card updates)
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  placeholder="Leave blank if same as mobile"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Current City <span className="text-teal-400">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Mumbai, Pune, Delhi, Bangalore"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="e.g. Maharashtra, Karnataka, Delhi"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Section: Academic & Career */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-mono uppercase font-bold text-teal-400 tracking-wider flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>2. Qualifications &amp; Banking Preferences</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Highest Qualification <span className="text-teal-400">*</span>
                </label>
                <select
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 font-sans cursor-pointer"
                >
                  {QUALIFICATIONS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Passout Year</label>
                <select
                  name="passoutYear"
                  value={formData.passoutYear}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 font-sans cursor-pointer"
                >
                  {['2026 (Appearing)', '2025', '2024', '2023', '2022', '2021', '2020 & Earlier'].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Total Experience <span className="text-teal-400">*</span>
                </label>
                <select
                  name="totalExperience"
                  value={formData.totalExperience}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 font-sans cursor-pointer"
                >
                  {EXPERIENCE_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Target Banking Role <span className="text-teal-400">*</span>
                </label>
                <select
                  name="targetRole"
                  value={formData.targetRole}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 font-sans cursor-pointer"
                >
                  {BANKING_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Current Company &amp; Current CTC (if experienced)
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  placeholder="e.g. HDFC Bank, ₹4.5 LPA (or Fresher)"
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Expected CTC &amp; Preferred City
                </label>
                <input
                  type="text"
                  name="preferredLocation"
                  placeholder="e.g. ₹6-8 LPA, Mumbai / Pune"
                  value={formData.preferredLocation}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{isSubmitting ? 'Registering Candidate Profile...' : 'Proceed to Application Verification (Step 2)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2 font-mono">
              By proceeding, you agree to the{' '}
              <a href="/mega-job-drive/terms" target="_blank" className="text-teal-400 hover:underline">
                Terms of Job Drive
              </a>{' '}
              and{' '}
              <a href="/mega-job-drive/privacy" target="_blank" className="text-teal-400 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      )}

      {/* STEP 2: UPI PAYMENT & PROOF SUBMISSION */}
      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 mx-auto mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit Candidate Profile</span>
            </button>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Step 2 of 2: Application Fee &amp; UPI Verification</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Complete Verification Fee Payment
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Token ID: <span className="text-teal-400 font-mono font-bold">{registrationToken}</span>
            </p>
          </div>

          {/* Payment Instructions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Left: QR Code Display */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-56 h-56 bg-white p-3 rounded-2xl shadow-md border-2 border-teal-500/40">
                <Image
                  src="/mega-job-drive-upi-qr.png"
                  alt="Mega Job Drive UPI QR Code"
                  fill
                  className="object-contain p-2"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-3 space-y-1">
                <span className="text-xs font-mono text-slate-400 block">Scan using any UPI App</span>
                <span className="text-lg font-mono font-extrabold text-teal-400 block">
                  Amount: ₹{feeAmount}
                </span>
                <span className="text-[11px] text-slate-500 block">Google Pay • PhonePe • Paytm • BHIM • Cred</span>
              </div>
            </div>

            {/* Right: Manual Copy & Details */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                    Official Business UPI ID
                  </span>
                  <div className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 font-mono text-xs">
                    <span className="font-bold text-white select-all">{upiId}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(upiId)}
                      className="px-2.5 py-1 bg-teal-600/30 hover:bg-teal-600 text-teal-300 hover:text-white rounded text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">Payee Name</span>
                  <span className="text-xs text-slate-300 font-bold block">{upiName}</span>
                </div>

                {/* Mobile Direct UPI Intent Button */}
                <div className="pt-2">
                  <a
                    href={upiIntentUrl}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Pay directly via Mobile UPI App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 bg-slate-900/50 p-3 rounded-lg border border-slate-800/60">
                <span className="font-bold text-slate-300 block">Payment Steps:</span>
                <p>1. Open GPay/PhonePe/Paytm and scan QR or transfer to <b>{upiId}</b>.</p>
                <p>2. Enter exact amount: <b>₹{feeAmount}</b>.</p>
                <p>3. Note the 12-digit UPI Reference / UTR Number from transaction details.</p>
                <p>4. Enter the UTR number below and submit to generate your Admit Card.</p>
              </div>
            </div>
          </div>

          {/* UTR Input & Screenshot Upload */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase font-bold text-teal-400 tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Submit Payment Verification Details</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  12-Digit UPI Reference / UTR Number <span className="text-teal-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 428819034821"
                  value={paymentUtr}
                  onChange={(e) => setPaymentUtr(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono tracking-wider font-bold"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Found on your GPay/PhonePe/Paytm receipt as &quot;UPI Ref ID&quot; or &quot;UTR&quot;.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Payment Screenshot (Optional but speeds up verification)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-mono file:font-bold file:bg-teal-600 file:text-white hover:file:bg-teal-500 cursor-pointer"
                />
              </div>
            </div>

            {screenshotPreview && (
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
                <div className="w-16 h-16 relative rounded overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={screenshotPreview} alt="Screenshot Preview" className="w-full h-full object-cover" />
                </div>
                <div className="text-xs">
                  <span className="text-emerald-400 font-bold block">✓ Screenshot Attached</span>
                  <span className="text-slate-400 text-[11px]">Ready for official registrar audit.</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !paymentUtr.trim()}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl font-mono text-sm font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{isSubmitting ? 'Verifying & Generating Admit Card...' : 'Confirm Payment & Generate Admit Card'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2 font-mono">
              Fee is covered under Aranii Candidate Assurance. See{' '}
              <a href="/mega-job-drive/refund" target="_blank" className="text-teal-400 hover:underline">
                Refund Policy
              </a>
              .
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
