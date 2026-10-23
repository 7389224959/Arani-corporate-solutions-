'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AraniLogo } from '@/components/AraniLogo';
import {
  Share2,
  Video,
  Upload,
  Sparkles,
  TrendingUp,
  DollarSign,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Eye,
  Users,
  Target,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sliders,
  Settings,
  HelpCircle,
  Copy,
  Check,
  X,
  MessageSquare,
  Facebook,
  Instagram,
  BarChart3,
  Globe,
  Radio,
  FileVideo,
  Printer,
  ChevronRight,
  Clock,
  Briefcase,
  Award,
  ChevronDown,
  ArrowLeft,
  Smartphone,
  CheckSquare,
  Flame,
  Bot,
  Wallet
} from 'lucide-react';

export default function MetaAdsManualPage() {
  const [activeSection, setActiveSection] = useState<'overview' | 'steps' | 'agentic' | 'calculator' | 'checklist' | 'api-setup'>('steps');
  const [copiedTokenVar, setCopiedTokenVar] = useState<string | null>(null);

  // Interactive ROI Calculator State
  const [calcBudget, setCalcBudget] = useState<number>(2500);
  const [calcDuration, setCalcDuration] = useState<number>(7);
  const [calcType, setCalcType] = useState<'daily' | 'lifetime'>('daily');

  // Checklist interactive state
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'c1': true,
    'c2': true,
    'c3': false,
    'c4': false,
    'c5': false,
    'c6': false,
    'c7': false,
  });

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyText = (txt: string, label: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedTokenVar(label);
    setTimeout(() => setCopiedTokenVar(null), 3000);
  };

  const calcTotalSpend = calcType === 'daily' ? calcBudget * calcDuration : calcBudget;
  const calcGst = Math.round(calcTotalSpend * 0.18);
  const calcEstImpressions = Math.round((calcTotalSpend / 55) * 1000);
  const calcEstReach = Math.round(calcEstImpressions * 0.72);
  const calcEstPlays = Math.round(calcEstImpressions * 0.65);
  const calcEstClicks = Math.round(calcEstImpressions * 0.028);
  const calcEstLeads = Math.round(calcEstClicks * 0.24);
  const calcCostPerLead = Math.max(15, Math.round(calcTotalSpend / Math.max(1, calcEstLeads)));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-ink-900 font-sans pb-24 selection:bg-teal-500 selection:text-white">
      {/* Top Client Handover Banner */}
      <div className="bg-gradient-to-r from-ink-950 via-teal-950 to-ink-900 text-white border-b border-teal-500/30 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-teal-200 text-xs font-mono flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Admin Dashboard</span>
            </Link>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-xs font-mono text-teal-300 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>OFFICIAL CLIENT HANDOVER DOCUMENTATION (V2.6)</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF Manual</span>
            </button>
            <Link
              href="/admin?tab=ai-page-ad-manager"
              className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-2 shadow-xs transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Open Ad Manager Tool</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-surface border-b border-line shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Executive Operations &amp; Marketing Manual</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink-950 tracking-tight leading-tight">
                Launching Meta Ads from Aranii Corporate Admin Panel
              </h1>
              <p className="text-base sm:text-lg text-slate leading-relaxed">
                A complete operational guide for hiring managers and digital marketers to publish high-impact 9:16 vertical reels to Facebook &amp; Instagram, launch targeted sponsored Meta Ad campaigns with custom INR budgets, and capture candidate leads directly into the autonomous Gemini AI ecosystem.
              </p>

              {/* Handover Metadata Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate">
                <span className="bg-paper px-3 py-1.5 rounded-lg border border-line flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                  <strong>Client:</strong> Aranii Corporate Solutions
                </span>
                <span className="bg-paper px-3 py-1.5 rounded-lg border border-line flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <strong>Engine:</strong> Meta Graph API v21.0 &amp; Gemini 2.5 Flash
                </span>
                <span className="bg-paper px-3 py-1.5 rounded-lg border border-line flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <strong>Handover Date:</strong> October 2026
                </span>
              </div>
            </div>

            {/* Visual Executive Badge Card */}
            <div className="lg:w-80 shrink-0 bg-gradient-to-br from-teal-900 via-ink-900 to-ink-950 text-white rounded-2xl p-6 shadow-xl border border-teal-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold">
                    System Architecture
                  </span>
                  <span className="bg-emerald-500 text-ink-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Active Handover
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-display font-extrabold text-white">
                    Agentic Ad Hub
                  </div>
                  <p className="text-xs text-slate-300">
                    Dual-Platform Meta Reels &amp; Conversational AI Lead Capture
                  </p>
                </div>
                <div className="border-t border-teal-500/20 pt-3 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Ad Format:</span>
                    <strong className="text-white">9:16 Vertical Reel</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Channels:</span>
                    <strong className="text-teal-300">FB Page + IG Profile</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Currency:</span>
                    <strong className="text-white">Indian Rupee (INR ₹)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Conversational Bot:</span>
                    <strong className="text-emerald-300">WhatsApp &amp; Direct</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-line overflow-x-auto print:hidden">
            {[
              { id: 'steps', label: '1. Step-by-Step Launch Guide', icon: Sparkles },
              { id: 'agentic', label: '2. Agentic Superpowers & Funnel', icon: Zap },
              { id: 'overview', label: '3. Visual Architecture Diagram', icon: Layers },
              { id: 'calculator', label: '4. Interactive Budget & ROI Calculator', icon: DollarSign },
              { id: 'checklist', label: '5. Launch Day Checklist', icon: CheckSquare },
              { id: 'api-setup', label: '6. Meta Tokens & Credentials', icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-md'
                      : 'bg-paper text-slate hover:bg-slate-200 border border-line'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* SECTION 1: STEP BY STEP GUIDE */}
        {(activeSection === 'steps' || activeSection === 'overview') && (
          <div className="space-y-10">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink-950">
                  Step-by-Step Guide: Launching Meta Ads in 4 Minutes
                </h2>
                <p className="text-sm text-slate mt-1">
                  Follow these 6 operational steps to create, target, budget, and broadcast verified recruitment campaigns.
                </p>
              </div>
              <span className="hidden sm:inline-block bg-teal-100 text-teal-800 text-xs font-mono font-bold px-3 py-1 rounded-full border border-teal-300">
                End-to-End Workflow
              </span>
            </div>

            {/* STEP 1 */}
            <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-mono text-lg font-extrabold flex items-center justify-center shadow-md">
                      01
                    </span>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-teal-700 font-bold">
                        Stage 1 • Navigation &amp; Channel Verification
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-900">
                        Access the AI Page Ad Manager &amp; Verify Status Badges
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate leading-relaxed">
                    Log in to the Admin Dashboard at <code className="bg-paper px-2 py-0.5 rounded text-teal-800 font-mono font-bold">/admin</code> using your credentials. In the left navigation sidebar under the Content &amp; Media group, click on <strong className="text-ink-900">Ai Page Add Manager</strong>.
                  </p>

                  <div className="bg-paper border border-line rounded-xl p-4 space-y-2 text-xs">
                    <h4 className="font-bold text-ink-900 font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Inspect Connected Account Badges</span>
                    </h4>
                    <p className="text-slate">
                      Before proceeding, verify that the 3 top status indicators show active green pills:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate pl-2">
                      <li><strong>Facebook Page:</strong> Connected (Aranii Corporate Solutions Official)</li>
                      <li><strong>Instagram Account:</strong> Connected (@aranii_corporate_official)</li>
                      <li><strong>Meta Ad Account:</strong> Active (act_592019481920) with Meta Pixel configured</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-muted">
                    <HelpCircle className="w-4 h-4 text-teal-600" />
                    <span>Tip: If badges ever show disconnected, click the <strong>Meta Setup &amp; Tokens</strong> modal button in the top right to verify environment variables.</span>
                  </div>
                </div>

                {/* Visual Step Mockup */}
                <div className="w-full lg:w-96 bg-ink-950 text-white rounded-2xl p-5 border border-teal-500/30 shadow-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono text-teal-300 font-bold">Admin Navigation</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-teal-500/20 border border-teal-400/40 text-teal-200 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-teal-300" />
                        <strong>Ai Page Add Manager</strong>
                      </span>
                      <span className="bg-purple-500/40 text-purple-200 text-[10px] px-1.5 py-0.5 rounded">
                        FB + IG Ads
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white/5 text-slate-400 flex items-center gap-2">
                      <Video className="w-3.5 h-3.5" />
                      <span>AI Reel Wizard</span>
                    </div>
                    <div className="p-2 rounded bg-white/5 text-slate-400 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Reel Templates</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Target Ad Currency:</span>
                    <strong className="text-emerald-400">INR (₹) Official</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-mono text-lg font-extrabold flex items-center justify-center shadow-md">
                      02
                    </span>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-teal-700 font-bold">
                        Stage 2 • Video Reel Asset Selection
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-900">
                        Upload Vertical Reel Video (9:16 Ratio) or Select Sample
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate leading-relaxed">
                    Meta algorithms heavily favor short-form vertical video (Reels) on both Instagram and Facebook. The system supports full 9:16 high-definition video assets up to 150MB.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-paper border border-line rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-800">
                        <Upload className="w-4 h-4 text-teal-600" />
                        <span>Option A: Direct Video Upload</span>
                      </div>
                      <p className="text-xs text-slate">
                        Click the upload drop zone or drag-and-drop your custom corporate reel (<code className="font-mono text-ink-900">.mp4</code>, <code className="font-mono text-ink-900">.mov</code>, or <code className="font-mono text-ink-900">.webm</code>). The system instantly previews the media in the interactive mobile frame.
                      </p>
                    </div>

                    <div className="bg-paper border border-line rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-800">
                        <FileVideo className="w-4 h-4 text-purple-600" />
                        <span>Option B: Use Sample Reel / Reel Wizard</span>
                      </div>
                      <p className="text-xs text-slate">
                        Click <strong>Use Sample Reel</strong> to load the pre-rendered banking recruitment video, or build a bespoke video from job descriptions using the AI Reel Studio tab (<code className="font-mono text-ink-900">reel-wizard</code>).
                      </p>
                    </div>
                  </div>

                  {/* Video Specs Callout */}
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-start gap-3 text-xs text-teal-900">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Recommended Video Production Specifications:</strong>
                      <span>Resolution: 1080×1920 pixels (9:16 vertical) • Optimal Length: 15 to 45 seconds • Codec: H.264 / AAC Audio • Key message &amp; salary hook placed in the first 3 seconds.</span>
                    </div>
                  </div>
                </div>

                {/* Visual Graphic */}
                <div className="w-full lg:w-96 bg-slate-900 text-white rounded-2xl p-5 border border-slate-700 shadow-xl space-y-3">
                  <div className="text-xs font-mono text-teal-400 font-bold flex items-center justify-between">
                    <span>9:16 REEL CONTAINER PREVIEW</span>
                    <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">1080×1920</span>
                  </div>
                  <div className="relative aspect-[9/12] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                    <div className="text-center space-y-2 p-4">
                      <div className="w-12 h-12 rounded-full bg-teal-600/30 border border-teal-400 text-teal-300 flex items-center justify-center mx-auto animate-pulse">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                      <p className="text-xs font-bold text-white">sample-hiring-reel.mp4</p>
                      <p className="text-[10px] font-mono text-slate-400">Audio: Corporate Voiceover | 1080p</p>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 flex items-center justify-center gap-1.5 pt-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Validated for Facebook &amp; Instagram Reels</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-mono text-lg font-extrabold flex items-center justify-center shadow-md">
                      03
                    </span>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-teal-700 font-bold">
                        Stage 3 • Gemini 2.5 Flash Copywriting Studio
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-900">
                        Generate High-Converting Ad Copy, Captions &amp; Hashtags
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate leading-relaxed">
                    Never worry about crafting copy from scratch. The admin portal embeds a specialized Google Gemini 2.5 AI copywriting engine calibrated for the Indian recruitment industry.
                  </p>

                  <div className="bg-paper border border-line rounded-xl p-4 space-y-3">
                    <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-slate">
                      How to feed parameters into the AI generator:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-lg border border-line">
                        <strong className="block text-ink-900 mb-1">1. Job Designation:</strong>
                        <span className="text-slate">e.g. Branch Operations &amp; Credit Officer</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-line">
                        <strong className="block text-ink-900 mb-1">2. Target Locations:</strong>
                        <span className="text-slate">e.g. Mumbai, Pune, Delhi NCR, Bengaluru</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-line">
                        <strong className="block text-ink-900 mb-1">3. Salary Band (CTC):</strong>
                        <span className="text-slate">e.g. ₹3.5L – ₹6.5L PA + Performance Incentives</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-line">
                        <strong className="block text-ink-900 mb-1">4. Select AI Tone:</strong>
                        <span className="text-slate font-medium text-teal-700">🔥 Urgent &amp; High-Energy | 💼 Corporate | 🎓 Fresher</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate leading-relaxed">
                    Click the purple-to-teal button <strong className="text-ink-900">Generate High-Converting Copy &amp; Hashtags</strong>. Within 2 seconds, Gemini synthesizes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate pl-2">
                    <li>An emoji-rich viral reel caption with clear eligibility and CTA.</li>
                    <li>10-15 high-reach recruitment hashtags (<code className="font-mono text-teal-800">#BankingJobs #AraniiCorporate #HiringAlert</code>).</li>
                    <li>Punchy Meta Ad Headline under 40 characters for the sponsored card.</li>
                    <li>High-converting primary ad pitch emphasizing zero candidate fees.</li>
                  </ul>
                </div>

                {/* Visual Sample Output Box */}
                <div className="w-full lg:w-96 bg-white border border-teal-300 rounded-2xl p-5 shadow-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Gemini Generated Copy</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      High CTR ~3.4%
                    </span>
                  </div>
                  <div className="bg-paper p-3 rounded-xl border border-line text-xs font-sans space-y-2 text-ink-900">
                    <p className="font-bold text-teal-900">
                      🚀 URGENT HIRING: Tier-1 Partner Banks are recruiting 200+ Branch Operations &amp; Credit Officers!
                    </p>
                    <p className="text-[11px] text-slate leading-relaxed">
                      💼 CTC: ₹3.5L - ₹6.5L PA + Medical Insurance<br />
                      📍 Locations: Mumbai MMR, Pune, Delhi NCR<br />
                      ✨ Zero Placement Fee | Direct Walk-in Shortlisting
                    </p>
                    <p className="text-[11px] text-purple-800 font-mono font-bold">
                      #BankingJobs #AraniiCorporate #Career2026 #JobSearchIndia
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between font-mono">
                    <span>Ad Headline:</span>
                    <strong className="text-ink-900">Hiring: 200+ Branch Officers</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-mono text-lg font-extrabold flex items-center justify-center shadow-md">
                      04
                    </span>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-teal-700 font-bold">
                        Stage 4 • Platform &amp; Audience Configuration
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-900">
                        Choose Destination Channels &amp; Target Demographics
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate leading-relaxed">
                    Decide where the reel should live organically, and which candidate demographics Meta should target with your sponsored budget.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-paper border border-line rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Facebook className="w-4 h-4 text-blue-600 fill-current" />
                        <span className="font-bold text-xs text-ink-900">Facebook Distribution</span>
                      </div>
                      <p className="text-xs text-slate">
                        Broadcasts to the Official Aranii Facebook Page, appearing across Facebook Reels Feed and Followers Timeline.
                      </p>
                    </div>

                    <div className="bg-paper border border-line rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-pink-600" />
                        <span className="font-bold text-xs text-ink-900">Instagram Distribution</span>
                      </div>
                      <p className="text-xs text-slate">
                        Publishes to the Instagram Business Profile, appearing in the dedicated Reels tab and optionally sharing to the main grid.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-ink-900 flex items-center gap-2">
                      <Target className="w-4 h-4 text-teal-600" />
                      <span>Audience Micro-Targeting Options:</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['Pan-India', 'Mumbai MMR', 'Pune', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Kolkata', 'Ahmedabad'].map(city => (
                        <span key={city} className="px-2.5 py-1 bg-white border border-line rounded-full text-xs font-mono text-ink-900 font-bold shadow-2xs">
                          📍 {city}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate pt-1">
                      <span><strong>Age Range:</strong> 20 to 35 Years (Job Seekers)</span>
                      <span><strong>Interests:</strong> Banking, Finance, Career Development</span>
                    </div>
                  </div>
                </div>

                {/* Audience Targeting Matrix */}
                <div className="w-full lg:w-96 bg-paper border border-line rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="text-xs font-mono font-bold text-ink-900">Targeting Summary</span>
                    <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">
                      Meta Ad Set
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-line/60">
                      <span className="text-slate">Geographies:</span>
                      <strong className="text-ink-900">Mumbai MMR, Pune, NCR</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-line/60">
                      <span className="text-slate">Demographic Age:</span>
                      <strong className="text-ink-900">21 – 32 Years</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-line/60">
                      <span className="text-slate">Optimization Goal:</span>
                      <strong className="text-teal-700 font-bold">Candidate Leads</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate">Primary CTA:</span>
                      <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                        APPLY_NOW
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 5 */}
            <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-mono text-lg font-extrabold flex items-center justify-center shadow-md">
                      05
                    </span>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-teal-700 font-bold">
                        Stage 5 • Budgeting in INR &amp; Performance Forecast
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-900">
                        Set Ad Budget in Indian Rupees (INR) &amp; Campaign Duration
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate leading-relaxed">
                    Toggle <strong className="text-ink-900">&quot;Launch Ad for this Reel Post&quot;</strong> to activate the Meta Ads budget manager. Select your budgeting model and investment level:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-paper border border-line rounded-xl p-4 space-y-1.5">
                      <span className="text-xs font-mono uppercase font-bold text-teal-800">
                        1. Daily Budget (Recommended)
                      </span>
                      <p className="text-xs text-slate">
                        Specifies an amount spent per day (e.g. ₹1,000/day for 7 days = ₹7,000 total). Meta algorithms dynamically distribute spend across peak candidate browsing hours (10:00 AM - 9:00 PM).
                      </p>
                    </div>

                    <div className="bg-paper border border-line rounded-xl p-4 space-y-1.5">
                      <span className="text-xs font-mono uppercase font-bold text-teal-800">
                        2. Lifetime Budget
                      </span>
                      <p className="text-xs text-slate">
                        Sets an absolute financial cap across the entire chosen duration. Meta paces the budget to avoid exhausting funds early.
                      </p>
                    </div>
                  </div>

                  {/* Preset amounts & GST display */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-950 uppercase">
                        Real-Time Spend &amp; GST Transparency
                      </span>
                      <span className="text-[11px] font-mono text-emerald-800">
                        Indian Financial Year 2026-27 Compliant
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      The calculator automatically calculates the applicable 18% GST (Goods and Services Tax) so your finance team knows the exact invoice amount before clicking launch.
                    </p>
                  </div>
                </div>

                {/* Visual Real-Time Forecast Box */}
                <div className="w-full lg:w-96 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-300 rounded-2xl p-5 shadow-md space-y-3">
                  <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                    <span className="text-xs font-mono font-bold text-teal-900 uppercase">
                      Meta Performance Forecast
                    </span>
                    <span className="text-xs font-mono font-bold text-ink-950">
                      ₹7,000 Budget
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-white p-2.5 rounded-lg border border-teal-200">
                      <span className="text-[10px] font-mono uppercase text-slate">Full Reel Plays</span>
                      <div className="text-lg font-display font-extrabold text-teal-800">82,700</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-teal-200">
                      <span className="text-[10px] font-mono uppercase text-slate">Unique Reach</span>
                      <div className="text-lg font-display font-extrabold text-teal-800">91,600</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-teal-200">
                      <span className="text-[10px] font-mono uppercase text-slate">Est. Clicks</span>
                      <div className="text-lg font-display font-extrabold text-teal-800">3,560</div>
                    </div>
                    <div className="bg-emerald-100/70 p-2.5 rounded-lg border border-emerald-300">
                      <span className="text-[10px] font-mono uppercase text-emerald-900 font-bold">Est. Leads</span>
                      <div className="text-lg font-display font-extrabold text-emerald-800">854</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-center text-teal-800 pt-1">
                    Estimated Cost per Candidate: ~₹8.20 / lead
                  </div>
                </div>
              </div>

              {/* Demo Ad Wallet Spotlight */}
              <div className="mt-6 pt-5 border-t border-line bg-gradient-to-r from-emerald-50/80 to-teal-50/60 rounded-xl p-4 sm:p-5 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-ink-900">
                      Client Demo Ad Wallet (Simulated Spend &amp; Balance Tracking)
                    </h4>
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Zero Connection with Live Meta Business Suite Billing
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Your platform features a dedicated <strong>Demo Ad Wallet</strong> accessible directly under the Meta Ads sub-navigation. This wallet is engineered specifically for recruitment clients and talent directors to:
                </p>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
                  <li><strong>Show Exact Spend:</strong> Displays cumulative simulated money spent across active and historical reel ad campaigns.</li>
                  <li><strong>Show Money Left:</strong> Highlights remaining available demo funds in bold INR (₹) with real-time burn rate and candidate runway forecasts.</li>
                  <li><strong>Safe Sandbox Environment:</strong> Has <em>no connection</em> with the original credit card or bank billing in your Meta Business Suite, allowing unlimited dry runs, candidate yield modeling, and budget top-up tests.</li>
                  <li><strong>Exportable Statements:</strong> Download instant text statements with full transaction audit logs (+credits and -debits) for client financial reporting.</li>
                </ul>
              </div>
            </div>

            {/* STEP 6 */}
            <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-mono text-lg font-extrabold flex items-center justify-center shadow-md">
                      06
                    </span>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-teal-700 font-bold">
                        Stage 6 • Launch Execution &amp; Live Tracking
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-900">
                        Launch Campaign &amp; Monitor Metrics in Real Time
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate leading-relaxed">
                    Click the primary launch button: <code className="bg-teal-50 text-teal-900 px-2.5 py-1 rounded font-mono font-bold text-xs">Post Reel to FB &amp; IG + Launch Ad Campaign</code>.
                  </p>

                  <div className="bg-paper border border-line rounded-xl p-4 space-y-2">
                    <h4 className="font-bold text-xs font-mono uppercase text-ink-900">
                      Behind-the-Scenes Meta Pipeline (Completed in 4 Seconds):
                    </h4>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate pl-2">
                      <li><strong>Media Ingestion:</strong> Video binary uploaded to Facebook Graph API <code className="font-mono text-slate-700">/{'{page-id}'}/videos</code>.</li>
                      <li><strong>Instagram Containerization:</strong> Generates an IG Reels media container via <code className="font-mono text-slate-700">/{'{ig-id}'}/media</code>.</li>
                      <li><strong>Media Publishing:</strong> Publishes media to Reels feed with customized captions and hashtags.</li>
                      <li><strong>Ad Set Creation:</strong> Creates a Meta Ad Campaign under <code className="font-mono text-slate-700">act_592019481920</code> with targeting and designated INR budget.</li>
                    </ol>
                  </div>

                  <p className="text-sm text-slate leading-relaxed">
                    Switch to the <strong className="text-ink-900">&quot;Active Ads &amp; Posted Reels&quot;</strong> tab to track live campaigns. You can pause, resume, or inspect live impressions, spent budget, and verified candidate applications at any time.
                  </p>
                </div>

                {/* Campaign Card Preview */}
                <div className="w-full lg:w-96 bg-surface border border-line rounded-2xl p-5 shadow-md space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="text-xs font-mono font-bold text-teal-700">CAM-META-901</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                      ACTIVE
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-ink-900">Banking Officers Walk-In Drive 2026</h4>
                    <p className="text-xs text-slate">Reel: Urgent Hiring: 200+ Branch Officers</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-paper p-2 rounded">
                      <span className="text-[10px] font-mono text-muted uppercase">Spent</span>
                      <strong className="block text-ink-900">₹4,500</strong>
                    </div>
                    <div className="bg-paper p-2 rounded">
                      <span className="text-[10px] font-mono text-muted uppercase">Reach</span>
                      <strong className="block text-ink-900">34.1K</strong>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded border border-emerald-200">
                      <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold">Leads</span>
                      <strong className="block text-emerald-700">318</strong>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-line/60 text-xs font-mono">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-600 hover:underline flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5" />
                      <span>View Reel ↗</span>
                    </a>
                    <button className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded font-bold">
                      Pause Ad
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: AGENTIC SUPERPOWERS & FUNNEL */}
        {(activeSection === 'agentic' || activeSection === 'overview') && (
          <div className="space-y-8 pt-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink-950 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-amber-500" />
                  <span>The Especialities of our Agentic Website</span>
                </h2>
                <p className="text-sm text-slate mt-1">
                  Why this is not just a standard website: how the autonomous AI ecosystem turns Meta Ad clicks into qualified hires.
                </p>
              </div>
              <span className="bg-purple-100 text-purple-900 text-xs font-mono font-bold px-3 py-1 rounded-full border border-purple-300">
                AI Agent Advantage
              </span>
            </div>

            {/* Visual Funnel Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Conventional Flow */}
              <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 space-y-4 opacity-75">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-slate-600">Standard Agency Website Flow</span>
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded">High Drop-Off</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold">1</span>
                    <span>Candidate clicks Meta Ad on Instagram</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold">2</span>
                    <span>Forced to fill static 20-field web registration form</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold">3</span>
                    <span>Waits 4-7 days for recruiter email callback</span>
                  </div>
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg font-bold">
                    Result: 70%+ drop-off rate, high cost per lead, low response rate.
                  </div>
                </div>
              </div>

              {/* Aranii Agentic Flow */}
              <div className="bg-gradient-to-br from-teal-900 to-ink-950 text-white border border-teal-500/40 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-mono uppercase font-bold text-teal-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                    <span>Our Agentic Closed-Loop Funnel</span>
                  </span>
                  <span className="bg-emerald-400 text-ink-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    3.8× Higher Conversion
                  </span>
                </div>
                <div className="space-y-3 text-xs font-mono relative z-10">
                  <div className="p-3 bg-white/10 rounded-lg border border-teal-500/30 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">1</span>
                    <span>Candidate taps Reel CTA (&quot;Apply via WhatsApp&quot; or &quot;Apply Now&quot;)</span>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg border border-teal-500/30 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">2</span>
                    <span><strong>Gemini 3.8 Flash AI Talent Agent</strong> instantly engages in conversational chat</span>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg border border-teal-500/30 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">3</span>
                    <span>Bot validates qualification, location &amp; parses uploaded resume</span>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg border border-teal-500/30 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">4</span>
                    <span>Lead auto-populates Supabase CRM with Match Score &amp; Slot</span>
                  </div>
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-lg font-bold">
                    Result: Under 60-second qualification, ₹8.20/lead, zero lead leakage.
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Agentic Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-surface border border-line rounded-2xl p-5 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-ink-900">
                  1. Omnichannel Bot Agent
                </h4>
                <p className="text-xs text-slate leading-relaxed">
                  Dual integration with Meta WhatsApp Cloud API and Instagram Direct. The AI handles candidate queries, schedules interviews, and pre-qualifies candidates 24/7 without recruiter overtime.
                </p>
              </div>

              <div className="bg-surface border border-line rounded-2xl p-5 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-ink-900">
                  2. In-App AI Reel Studio
                </h4>
                <p className="text-xs text-slate leading-relaxed">
                  Transform any job opening into a vertical 9:16 video reel with automated AI voiceover, animated captions, and job ticker bar right inside the admin dashboard (<code className="font-mono text-teal-800">reel-wizard</code>).
                </p>
              </div>

              <div className="bg-surface border border-line rounded-2xl p-5 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-ink-900">
                  3. Live Operator Handoff
                </h4>
                <p className="text-xs text-slate leading-relaxed">
                  Recruiters can monitor live WhatsApp conversations inside <code className="font-mono text-teal-800">/admin/chat</code>. With one switch, toggle between autonomous AI mode and human recruiter takeover.
                </p>
              </div>

              <div className="bg-surface border border-line rounded-2xl p-5 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-ink-900">
                  4. Real-Time Supabase Sync
                </h4>
                <p className="text-xs text-slate leading-relaxed">
                  Every applicant who registers or chats is automatically matched to job requirements, generating match scores and instant candidate profile cards in the Applicant Inbox.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: INTERACTIVE BUDGET & ROI CALCULATOR */}
        {(activeSection === 'calculator' || activeSection === 'overview') && (
          <div className="space-y-8 pt-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink-950 flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-teal-600" />
                  <span>Interactive Meta Ads Budget &amp; Candidate ROI Estimator</span>
                </h2>
                <p className="text-sm text-slate mt-1">
                  Model your recruitment campaign investment in Indian Rupees before launching in the admin panel.
                </p>
              </div>
              <span className="bg-emerald-100 text-emerald-900 text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-300">
                Live Simulator
              </span>
            </div>

            <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Sliders & Controls */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate mb-2">
                      1. Budget Strategy Model
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCalcType('daily')}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition ${
                          calcType === 'daily'
                            ? 'bg-teal-700 text-white shadow-xs'
                            : 'bg-paper text-slate hover:bg-slate-200 border border-line'
                        }`}
                      >
                        Daily Budget (Recommended)
                      </button>
                      <button
                        onClick={() => setCalcType('lifetime')}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition ${
                          calcType === 'lifetime'
                            ? 'bg-teal-700 text-white shadow-xs'
                            : 'bg-paper text-slate hover:bg-slate-200 border border-line'
                        }`}
                      >
                        Lifetime Budget (Fixed Cap)
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-ink-900">
                        Budget Amount ({calcType === 'daily' ? 'Per Day' : 'Total'} in INR):
                      </span>
                      <strong className="text-teal-700 text-base">₹{calcBudget.toLocaleString('en-IN')}</strong>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="20000"
                      step="500"
                      value={calcBudget}
                      onChange={(e) => setCalcBudget(Number(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-muted mt-1">
                      <span>₹500/min</span>
                      <span>₹5,000 (Popular)</span>
                      <span>₹10,000</span>
                      <span>₹20,000/max</span>
                    </div>
                  </div>

                  {calcType === 'daily' && (
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-2">
                        <span className="font-bold text-ink-900">Campaign Flight Duration:</span>
                        <strong className="text-teal-700 text-base">{calcDuration} Days</strong>
                      </div>
                      <div className="flex gap-2">
                        {[3, 5, 7, 10, 14, 30].map(d => (
                          <button
                            key={d}
                            onClick={() => setCalcDuration(d)}
                            className={`flex-1 py-2 rounded-lg text-xs font-mono transition ${
                              calcDuration === d
                                ? 'bg-teal-800 text-white font-bold'
                                : 'bg-paper text-slate hover:bg-slate-200 border border-line'
                            }`}
                          >
                            {d}d
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-paper border border-line rounded-xl p-4 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-slate block">Net Meta Media Spend:</span>
                      <strong className="text-sm text-ink-900">₹{calcTotalSpend.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate block">+ 18% GST:</span>
                      <strong className="text-sm text-ink-900">₹{calcGst.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="text-right bg-white p-2 rounded-lg border border-teal-200 shadow-2xs">
                      <span className="text-slate block">Total Payable:</span>
                      <strong className="text-sm text-teal-800 font-extrabold">
                        ₹{(calcTotalSpend + calcGst).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Forecast Results Card */}
                <div className="lg:col-span-5 bg-gradient-to-br from-teal-950 via-ink-900 to-ink-950 text-white rounded-2xl p-6 shadow-xl border border-teal-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono font-bold text-teal-300 uppercase">
                      Estimated Recruitment ROI
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      India Benchmarks
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                      <span className="text-xs text-slate-300 font-mono">Projected Reel Plays:</span>
                      <span className="text-base font-display font-extrabold text-white">
                        {calcEstPlays.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                      <span className="text-xs text-slate-300 font-mono">Total Unique Reach:</span>
                      <span className="text-base font-display font-extrabold text-white">
                        {calcEstReach.toLocaleString('en-IN')} Job Seekers
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                      <span className="text-xs text-slate-300 font-mono">Ad Clicks to Bot / Form:</span>
                      <span className="text-base font-display font-extrabold text-teal-300">
                        {calcEstClicks.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-emerald-300 font-bold block">
                          Verified Candidate Leads
                        </span>
                        <span className="text-2xl font-display font-extrabold text-emerald-400">
                          {calcEstLeads.toLocaleString('en-IN')} Applicants
                        </span>
                      </div>
                      <div className="text-right font-mono text-xs text-emerald-200">
                        <span className="block text-[10px] text-slate-300 uppercase">Cost Per Lead</span>
                        <strong className="text-sm">~₹{calcCostPerLead}</strong>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                    * Projections derived from Aranii&apos;s average Meta Ads CPM of ₹55, 2.8% CTR for banking short-form reels, and 24% conversion through the automated WhatsApp bot funnel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: LAUNCH DAY CHECKLIST */}
        {(activeSection === 'checklist' || activeSection === 'overview') && (
          <div className="space-y-6 pt-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink-950 flex items-center gap-3">
                  <CheckSquare className="w-8 h-8 text-teal-600" />
                  <span>Pre-Flight Launch Checklist for Staff</span>
                </h2>
                <p className="text-sm text-slate mt-1">
                  Use this interactive checklist prior to pushing every live ad campaign.
                </p>
              </div>
              <button
                onClick={() => setChecklist({ c1: true, c2: true, c3: true, c4: true, c5: true, c6: true, c7: true })}
                className="text-xs font-mono text-teal-700 hover:underline"
              >
                Mark All Complete
              </button>
            </div>

            <div className="bg-surface border border-line rounded-2xl p-6 space-y-3 shadow-xs">
              {[
                { id: 'c1', title: 'Video Format & Orientation Verified', desc: 'Reel is 9:16 vertical ratio (1080×1920) with crisp audio and clear corporate branding in first 3 seconds.' },
                { id: 'c2', title: 'Salary & Zero Candidate Fee Compliance', desc: 'Reel copy clearly discloses compensation and abides by Aranii zero placement fee guarantee.' },
                { id: 'c3', title: 'AI Copy Generated & Reviewed', desc: 'Gemini has generated urgent hook, role details, and verified WhatsApp / bio link call to action.' },
                { id: 'c4', title: 'Target Metros Selected', desc: 'Targeting matches actual branch openings (e.g. Mumbai MMR, Pune, Delhi NCR) to prevent irrelevant inquiries.' },
                { id: 'c5', title: 'Budget & Duration Validated', desc: 'Daily budget (e.g. ₹1,000/day) and duration (e.g. 7 days) approved with 18% GST accounted for.' },
                { id: 'c6', title: 'Live Chatbot Standby Confirmed', desc: 'WhatsApp Cloud API webhook is active so candidates contacting the bot receive instant AI responses.' },
                { id: 'c7', title: 'Mobile Preview Checked', desc: 'Simulated 9:16 reel frame in admin tool reviewed to ensure headline text does not clash with Instagram UI.' },
              ].map(item => {
                const isChecked = checklist[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-4 rounded-xl border transition flex items-start gap-3.5 cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300 text-ink-950'
                        : 'bg-paper border-line text-slate hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-ink-900 flex items-center gap-2">
                        <span>{item.title}</span>
                        {isChecked && (
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                            PASS
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 5: META TOKENS & IT CREDENTIALS */}
        {(activeSection === 'api-setup' || activeSection === 'overview') && (
          <div className="space-y-6 pt-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink-950 flex items-center gap-3">
                  <Settings className="w-8 h-8 text-teal-600" />
                  <span>Production Meta Graph API Setup &amp; Token Secrets</span>
                </h2>
                <p className="text-sm text-slate mt-1">
                  For your IT department or technical administrator during production environment handover.
                </p>
              </div>
              <span className="bg-slate-200 text-slate-800 text-xs font-mono font-bold px-3 py-1 rounded-full">
                Technical Handover
              </span>
            </div>

            <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <p className="text-sm text-slate leading-relaxed">
                The AI Page Ad Manager connects natively to Meta Graph API v21.0. When configured in production, reel publishing and ad set creation execute directly against your official Meta Business Account. In local/preview environments, the system runs with realistic simulation and validation.
              </p>

              <div className="bg-ink-950 text-slate-100 rounded-xl p-5 font-mono text-xs space-y-3 border border-teal-500/30">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-teal-400 font-bold">Required Environment Configuration (.env)</span>
                  {copiedTokenVar && (
                    <span className="text-emerald-400 text-[11px]">Copied {copiedTokenVar} to clipboard!</span>
                  )}
                </div>

                <div className="space-y-2 text-[11px]">
                  {[
                    { key: 'META_PAGE_ID', val: '10849204918231', comment: 'Official Facebook Page ID for Aranii Corporate Solutions' },
                    { key: 'META_PAGE_ACCESS_TOKEN', val: 'EAAB...your-long-lived-page-access-token', comment: 'System user access token with pages_manage_posts and pages_read_engagement' },
                    { key: 'INSTAGRAM_PAGE_ID', val: '17841400293819', comment: 'Connected Instagram Business Account ID' },
                    { key: 'INSTAGRAM_ACCESS_TOKEN', val: 'EAAB...your-instagram-content-publishing-token', comment: 'Token with instagram_basic, instagram_content_publish permissions' },
                    { key: 'META_AD_ACCOUNT_ID', val: 'act_592019481920', comment: 'Meta Ad Account configured for Indian Rupee (INR) billing' },
                    { key: 'NEXT_PUBLIC_META_PIXEL_ID', val: '123456789098765', comment: 'Browser & Server-side Conversions API Meta Pixel tracking ID' },
                  ].map(env => (
                    <div key={env.key} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded bg-white/5 gap-2">
                      <div>
                        <span className="text-teal-300 font-bold">{env.key}</span>=
                        <span className="text-yellow-200">&quot;{env.val}&quot;</span>
                        <span className="text-slate-400 block text-[10px] mt-0.5 font-sans"># {env.comment}</span>
                      </div>
                      <button
                        onClick={() => copyText(`${env.key}="${env.val}"`, env.key)}
                        className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-300 rounded text-[10px] font-mono flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Troubleshooting Card */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-2 text-xs text-amber-950">
                <h4 className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Important Meta Policy Note for Recruitment Advertising:</span>
                </h4>
                <p className="leading-relaxed">
                  Meta classifies job openings under the <strong>Special Ad Category: Employment</strong>. Under Meta compliance guidelines, ads must maintain non-discriminatory targeting and cannot discriminate on gender, caste, religion, or age under 18. Our platform automatically enforces these parameters to prevent ad account suspensions.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Floating Action Bar for Client */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-line py-3 px-4 z-40 print:hidden shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate font-bold">Ready to Launch Ads?</span>
            <span className="text-muted hidden md:inline">Open the admin tool to launch your first reel campaign.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2 bg-paper hover:bg-slate-200 text-ink-900 rounded-lg text-xs font-mono font-bold border border-line flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Manual (PDF)</span>
            </button>
            <Link
              href="/admin?tab=ai-page-ad-manager"
              className="flex-1 sm:flex-none px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Launch Live Meta Ad Now →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
