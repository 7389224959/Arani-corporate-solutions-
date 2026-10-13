'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Download,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail,
  User,
  GraduationCap,
  Calendar,
  Lock,
  ArrowLeft,
  X,
  CreditCard,
  FileSpreadsheet,
} from 'lucide-react';

interface RegistrationItem {
  id: string;
  registration_token: string;
  roll_number?: string | null;
  full_name: string;
  email: string;
  phone: string;
  whatsapp_number?: string;
  city: string;
  state?: string;
  highest_qualification: string;
  passout_year?: string;
  total_experience: string;
  current_company?: string;
  current_ctc?: string;
  expected_ctc?: string;
  target_role: string;
  preferred_location?: string;
  fee_amount: number;
  payment_status: 'pending_payment' | 'pending_verification' | 'verified' | 'rejected';
  payment_utr?: string | null;
  payment_screenshot_url?: string | null;
  payment_verified_at?: string | null;
  verified_by?: string | null;
  rejection_reason?: string | null;
  interview_slot?: string | null;
  interview_venue?: string;
  utm_source?: string;
  utm_campaign?: string;
  created_at: string;
}

interface AdminStats {
  total: number;
  pending: number;
  verified: number;
  rejected: number;
  totalRevenue: number;
}

export default function MegaDriveAdminPage() {
  const [adminSecret, setAdminSecret] = useState('aranii_admin_secret_2026');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authInput, setAuthInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0,
    totalRevenue: 0,
  });

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending_verification' | 'verified' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Active Candidate Modal
  const [selectedCandidate, setSelectedCandidate] = useState<RegistrationItem | null>(null);
  const [decisionLoading, setDecisionLoading] = useState(false);
  const [rejectReasonInput, setRejectReasonInput] = useState('');
  const [customSlotInput, setCustomSlotInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check session storage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('mjd_admin_auth');
    if (saved) {
      setAdminSecret(saved);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const pass = authInput.trim();
    if (pass === 'aranii_admin_secret_2026' || pass === 'admin123') {
      setAdminSecret(pass);
      setIsAuthenticated(true);
      sessionStorage.setItem('mjd_admin_auth', pass);
    } else {
      setAuthError('Invalid Admin Key. Default development key is: aranii_admin_secret_2026');
    }
  };

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('adminSecret', adminSecret);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);

      const res = await fetch(`/api/mega-job-drive/admin/list?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations || []);
        if (data.stats) setStats(data.stats);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('mjd_admin_auth');
      }
    } catch (e) {
      console.error('Fetch admin error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated, statusFilter]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDecision = async (decision: 'verify' | 'reject') => {
    if (!selectedCandidate) return;
    setDecisionLoading(true);
    try {
      const res = await fetch('/api/mega-job-drive/admin/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationToken: selectedCandidate.registration_token,
          decision,
          rejectionReason: decision === 'reject' ? rejectReasonInput : undefined,
          interviewSlot: decision === 'verify' ? customSlotInput || 'Saturday, 14 Nov 2026 • 10:00 AM (Slot 1)' : undefined,
          verifiedBy: 'Admissions Desk Supervisor',
          adminSecret,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        showToast(
          decision === 'verify'
            ? `Candidate verified! Roll Number issued: ${data.rollNumber}`
            : 'Candidate application rejected.'
        );
        setSelectedCandidate(null);
        setRejectReasonInput('');
        setCustomSlotInput('');
        fetchRegistrations();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update candidate status');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDecisionLoading(false);
    }
  };

  const exportCSV = () => {
    if (registrations.length === 0) return;
    const headers = [
      'Token',
      'Roll Number',
      'Name',
      'Phone',
      'Email',
      'City',
      'Target Role',
      'Experience',
      'Qualification',
      'Status',
      'UTR Number',
      'Interview Slot',
      'Registered At',
    ];

    const rows = registrations.map((r) => [
      `"${r.registration_token}"`,
      `"${r.roll_number || ''}"`,
      `"${r.full_name}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      `"${r.city}"`,
      `"${r.target_role}"`,
      `"${r.total_experience}"`,
      `"${r.highest_qualification}"`,
      `"${r.payment_status}"`,
      `"${r.payment_utr || ''}"`,
      `"${r.interview_slot || ''}"`,
      `"${new Date(r.created_at).toLocaleString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Mega_Job_Drive_Registrations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <AraniLogo className="w-10 h-10 mx-auto" />
            <h2 className="text-xl font-extrabold text-white">Mega Job Drive Admissions Desk</h2>
            <p className="text-xs text-slate-400 font-mono">Restricted Candidate Verification &amp; UTR Audit Console</p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/80 border border-red-700 text-red-200 text-xs font-mono rounded">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Enter Admin Secret Key</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="e.g. aranii_admin_secret_2026"
                  value={authInput}
                  onChange={(e) => setAuthInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Default Key: aranii_admin_secret_2026</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate &amp; Open Portal</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/mega-job-drive" className="text-xs font-mono text-slate-500 hover:text-white transition">
              ← Return to Candidate Landing Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-teal-600 text-white text-xs font-mono font-bold px-4 py-2.5 rounded shadow-lg flex items-center gap-2 border border-teal-400 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1 text-xs font-mono font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Admin</span>
          </Link>
          <div className="h-5 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <AraniLogo className="w-6 h-6" />
            <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
              Mega Job Drive <span className="text-teal-400">Registrar Console</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={exportCSV}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-bold transition border border-slate-700 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={fetchRegistrations}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setIsAuthenticated(false);
              sessionStorage.removeItem('mjd_admin_auth');
            }}
            className="text-[11px] text-red-400 hover:text-red-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* KPI METRIC TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Candidates</span>
            <span className="text-2xl font-bold font-mono text-white">{stats.total}</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300">
            <span className="text-[10px] font-mono uppercase block flex items-center gap-1">
              <Clock className="w-3 h-3" /> Pending Review
            </span>
            <span className="text-2xl font-bold font-mono text-amber-400">{stats.pending}</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
            <span className="text-[10px] font-mono uppercase block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Admit Cards Issued
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400">{stats.verified}</span>
          </div>

          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300">
            <span className="text-[10px] font-mono uppercase block flex items-center gap-1">
              <XCircle className="w-3 h-3" /> Discrepancies
            </span>
            <span className="text-2xl font-bold font-mono text-red-400">{stats.rejected}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Verified Collections</span>
            <span className="text-2xl font-bold font-mono text-teal-400">₹{stats.totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg border font-bold transition ${
                statusFilter === 'all'
                  ? 'bg-teal-600 text-white border-teal-500'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter('pending_verification')}
              className={`px-3 py-1.5 rounded-lg border font-bold transition flex items-center gap-1 ${
                statusFilter === 'pending_verification'
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-slate-950 border-slate-800 text-amber-400 hover:text-amber-300'
              }`}
            >
              <span>Pending</span>
              <span className="bg-amber-950 px-1.5 rounded text-[10px]">{stats.pending}</span>
            </button>
            <button
              onClick={() => setStatusFilter('verified')}
              className={`px-3 py-1.5 rounded-lg border font-bold transition ${
                statusFilter === 'verified'
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-950 border-slate-800 text-emerald-400 hover:text-emerald-300'
              }`}
            >
              Verified ({stats.verified})
            </button>
            <button
              onClick={() => setStatusFilter('rejected')}
              className={`px-3 py-1.5 rounded-lg border font-bold transition ${
                statusFilter === 'rejected'
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-slate-950 border-slate-800 text-red-400 hover:text-red-300'
              }`}
            >
              Rejected ({stats.rejected})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate, phone, UTR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchRegistrations()}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>
        </div>

        {/* REGISTRATIONS TABLE */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Candidate Details</th>
                  <th className="p-3.5">Target Role &amp; Exp</th>
                  <th className="p-3.5">Payment UTR / Fee</th>
                  <th className="p-3.5">Status &amp; Roll No.</th>
                  <th className="p-3.5">Registered</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                      Loading registrations...
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                      No registrations found matching criteria.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-white text-xs">{reg.full_name}</div>
                        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                          <span>{reg.phone}</span>
                          <span>•</span>
                          <span>{reg.city}</span>
                        </div>
                        <div className="text-[10px] font-mono text-teal-400">{reg.registration_token}</div>
                      </td>

                      <td className="p-3.5">
                        <div className="text-xs text-slate-200 font-bold">{reg.target_role}</div>
                        <div className="text-[11px] text-slate-400">{reg.total_experience} • {reg.highest_qualification}</div>
                      </td>

                      <td className="p-3.5 font-mono">
                        <div className="text-xs font-bold text-slate-200">
                          UTR: {reg.payment_utr || <span className="text-slate-500">Not submitted</span>}
                        </div>
                        <div className="text-[11px] text-teal-400">₹{reg.fee_amount || 499}</div>
                      </td>

                      <td className="p-3.5 font-mono">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            reg.payment_status === 'verified'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : reg.payment_status === 'rejected'
                              ? 'bg-red-950 text-red-300 border border-red-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {reg.payment_status === 'verified' ? 'Verified' : reg.payment_status === 'rejected' ? 'Rejected' : 'Pending UTR'}
                        </span>
                        {reg.roll_number && (
                          <div className="text-[10px] text-slate-400 mt-0.5">Roll: {reg.roll_number}</div>
                        )}
                      </td>

                      <td className="p-3.5 text-[11px] font-mono text-slate-500">
                        {new Date(reg.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedCandidate(reg)}
                          className="px-3 py-1 bg-slate-800 hover:bg-teal-600 text-slate-200 hover:text-white rounded text-xs font-mono font-bold transition cursor-pointer"
                        >
                          Review &amp; Verify
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CANDIDATE VERIFICATION MODAL */}
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                  <h3 className="text-base font-bold text-white">Admissions Candidate Audit</h3>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Candidate Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 font-sans">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Candidate Name</span>
                  <span className="font-bold text-white text-sm">{selectedCandidate.full_name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Registration Token</span>
                  <span className="font-mono text-teal-400 font-bold">{selectedCandidate.registration_token}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Mobile &amp; WhatsApp</span>
                  <span className="text-slate-300 font-mono">{selectedCandidate.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Email Address</span>
                  <span className="text-slate-300 font-mono">{selectedCandidate.email}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Target Banking Role</span>
                  <span className="text-slate-200 font-bold">{selectedCandidate.target_role}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Qualification &amp; Experience</span>
                  <span className="text-slate-300">{selectedCandidate.highest_qualification} ({selectedCandidate.total_experience})</span>
                </div>
              </div>

              {/* Payment Proof Section */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-teal-400 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" /> UPI Transaction Proof
                  </span>
                  <span className="text-xs font-mono font-bold text-white">Amount: ₹{selectedCandidate.fee_amount || 499}</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Claimed UTR Reference:</span>
                  <span className="text-sm font-mono font-extrabold text-amber-300 tracking-wider">
                    {selectedCandidate.payment_utr || 'NOT ENTERED YET'}
                  </span>
                </div>

                {selectedCandidate.payment_screenshot_url && (
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Attached Payment Screenshot</span>
                    <div className="h-44 w-full relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedCandidate.payment_screenshot_url}
                        alt="Candidate UPI proof"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Verification Inputs */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Assign Reporting Slot (Defaults to Standard Batch 1)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Saturday, 14 Nov 2026 • 10:00 AM (Slot 1)"
                    value={customSlotInput}
                    onChange={(e) => setCustomSlotInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    disabled={decisionLoading}
                    onClick={() => handleDecision('verify')}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve &amp; Issue Official Admit Card</span>
                  </button>

                  <button
                    type="button"
                    disabled={decisionLoading}
                    onClick={() => {
                      const reason = prompt('Enter rejection discrepancy reason:', 'UTR number mismatched on bank statement');
                      if (reason) {
                        setRejectReasonInput(reason);
                        handleDecision('reject');
                      }
                    }}
                    className="px-4 py-3 bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 font-mono text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
