'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
  AlertTriangle,
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
  ChevronDown,
  Trash2,
  Key,
  CheckCheck
} from 'lucide-react';

interface CampaignItem {
  id: string;
  name: string;
  reelTitle: string;
  caption: string;
  videoUrl?: string;
  platforms: ('facebook' | 'instagram')[];
  postIds: {
    facebook?: string;
    instagram?: string;
  };
  postUrls: {
    facebook?: string;
    instagram?: string;
  };
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'IN_REVIEW';
  budgetType: 'daily' | 'lifetime';
  budgetAmount: number;
  durationDays: number;
  objective: string;
  targetAudience: {
    locations: string[];
    ageMin: number;
    ageMax: number;
    interests: string[];
  };
  createdAt: string;
  metrics: {
    impressions: number;
    reach: number;
    videoPlays: number;
    clicks: number;
    leads: number;
    spent: number;
    cpc: number;
  };
  isLiveCampaign?: boolean;
}

interface ConnectedAccounts {
  facebook: {
    id: string;
    name: string;
    handle: string;
    isConnected: boolean;
    isLiveTokenConfigured: boolean;
    category: string;
    followers: string;
    pageUrl: string;
    pictureUrl?: string | null;
    isLive?: boolean;
    source?: string;
  };
  instagram: {
    id: string;
    username: string;
    name?: string;
    isConnected: boolean;
    isLiveTokenConfigured: boolean;
    category: string;
    followers: string;
    postsCount: number;
    profileUrl: string;
    profilePictureUrl?: string | null;
    isLive?: boolean;
    source?: string;
  };
  metaAdAccount: {
    id: string;
    name: string;
    currency: string;
    status: string;
    pixelId: string;
    isPixelActive: boolean;
    billingThreshold?: string;
    amountSpent?: string;
    balance?: string;
    isLive?: boolean;
    source?: string;
  };
}

export default function AiPageAdManager() {
  const [activeTab, setActiveTab] = useState<'create' | 'campaigns' | 'settings'>('create');
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Connected accounts & campaigns from API
  const [accounts, setAccounts] = useState<ConnectedAccounts | null>(null);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Video Upload & Player State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('/sample-hiring-reel.mp4');
  const [videoFileName, setVideoFileName] = useState<string>('sample-hiring-reel.mp4');
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reel Post Content Form State
  const [reelTitle, setReelTitle] = useState('Urgent Banking Hiring Drive 2026');
  const [roleTitle, setRoleTitle] = useState('Branch Operations & Credit Officer');
  const [jobCategory, setJobCategory] = useState('Banking & Financial Services');
  const [jobLocation, setJobLocation] = useState('Mumbai, Pune, Delhi NCR');
  const [salaryBand, setSalaryBand] = useState('₹3.5L - ₹6.2L PA + Incentives');
  const [perksText, setPerksText] = useState('Immediate joining, verified bank partners, rapid promotion');
  const [caption, setCaption] = useState(
    '🚀 URGENT HIRING: 200+ Branch Operations & Credit Officers wanted across Mumbai, Pune & Delhi NCR!\n\n💼 Salary: ₹3.5L - ₹6.2L PA + Bonus\n🎓 Eligibility: Any Graduate / Final Year\n📍 Walk-in & direct interview shortlist in 48 hours.\n\n👉 Tap link in bio or message us on WhatsApp to apply now!'
  );
  const [hashtags, setHashtags] = useState(
    '#BankingJobs #HiringAlert #MumbaiJobs #Career2026 #JobSearchIndia #AraniiCorporate #FinanceCareers'
  );

  // Platforms to post
  const [postToFacebook, setPostToFacebook] = useState(true);
  const [postToInstagram, setPostToInstagram] = useState(true);

  // AI Copy Generation State
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiTone, setAiTone] = useState<'high_energy' | 'professional' | 'fresher'>('high_energy');

  // Ad Campaign Launch State
  const [launchAdEnabled, setLaunchAdEnabled] = useState(true);
  const [campaignName, setCampaignName] = useState('Banking Reel Ad Boost - Metro Cities');
  const [budgetType, setBudgetType] = useState<'daily' | 'lifetime'>('daily');
  const [budgetAmount, setBudgetAmount] = useState<number>(1000);
  const [durationDays, setDurationDays] = useState<number>(7);
  const [adObjective, setAdObjective] = useState<'OUTCOME_LEADS' | 'OUTCOME_TRAFFIC' | 'OUTCOME_MESSAGES' | 'OUTCOME_AWARENESS'>('OUTCOME_LEADS');
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['Mumbai MMR', 'Pune', 'Delhi NCR']);
  const [ageMin, setAgeMin] = useState<number>(21);
  const [ageMax, setAgeMax] = useState<number>(32);
  const [adHeadline, setAdHeadline] = useState('Hiring: 200+ Branch Officers (CTC ₹3.5L–₹6.2L)');
  const [adPrimaryText, setAdPrimaryText] = useState('Walk-in & Direct Shortlisting with Aranii Corporate Solutions. Zero Placement Fee for Candidates.');
  const [ctaType, setCtaType] = useState('APPLY_NOW');

  // Submission / Action Progress State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>('');
  const [lastSuccessResult, setLastSuccessResult] = useState<any>(null);

  // Settings modal & quick connect form state
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [runtimePageId, setRuntimePageId] = useState('');
  const [runtimePageToken, setRuntimePageToken] = useState('');
  const [runtimeIgId, setRuntimeIgId] = useState('');
  const [runtimeIgToken, setRuntimeIgToken] = useState('');
  const [runtimeAdAccountId, setRuntimeAdAccountId] = useState('');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testFeedback, setTestFeedback] = useState<any>(null);

  // Fetch initial accounts and campaigns from API
  const fetchMetaStatus = async (showNotification = false) => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/meta-ads', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setAccounts(data.connectedAccounts);
        setCampaigns(data.campaigns || []);
        setDiagnostics(data.diagnostics);
        setIsLiveMode(Boolean(data.isLiveMode));

        if (showNotification) {
          if (data.isLiveMode) {
            triggerToast(`✅ Live Meta Graph API Active: Connected to ${data.connectedAccounts?.facebook?.name || 'Page'}`);
          } else if (data.diagnostics?.graphApiErrors?.length > 0) {
            triggerToast(`⚠️ Meta Graph API returned error: ${data.diagnostics.graphApiErrors[0]}`);
          } else {
            triggerToast('Synced Meta connection status successfully.');
          }
        }
      }
    } catch (err: any) {
      console.error('Error fetching Meta status:', err);
      if (showNotification) {
        triggerToast('Failed to connect to Meta endpoint: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetaStatus();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Handle Video Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file (MP4, MOV, WebM)');
      return;
    }

    if (file.size > 150 * 1024 * 1024) {
      alert('Video file size exceeds 150MB. Please select a smaller file for fast uploading.');
      return;
    }

    setVideoFile(file);
    setVideoFileName(file.name);
    const objectUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(objectUrl);
    triggerToast(`Selected video "${file.name}" ready for Reel publishing!`);
  };

  const handleUseSampleVideo = () => {
    setVideoFile(null);
    setVideoFileName('sample-hiring-reel.mp4');
    setVideoPreviewUrl('/sample-hiring-reel.mp4');
    triggerToast('Sample Hiring Reel loaded successfully!');
  };

  // Video playback toggle
  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // AI Copy Generation with Gemini
  const handleGenerateAiCopy = async () => {
    try {
      setIsAiGenerating(true);
      const res = await fetch('/api/admin/meta-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_ai_copy',
          roleTitle,
          category: jobCategory,
          location: jobLocation,
          salary: salaryBand,
          perks: perksText,
          tone: aiTone,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.caption) setCaption(data.caption);
        if (data.hashtags) setHashtags(data.hashtags);
        if (data.adHeadline) setAdHeadline(data.adHeadline);
        if (data.adPrimaryText) setAdPrimaryText(data.adPrimaryText);
        triggerToast('AI generated viral caption & ad pitch successfully!');
      } else {
        alert(data.error || 'Failed to generate copy');
      }
    } catch (e: any) {
      alert('Error connecting to AI service: ' + e.message);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Save runtime credentials directly
  const handleSaveRuntimeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsTestingConnection(true);
      setTestFeedback(null);

      const res = await fetch('/api/admin/meta-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_runtime_credentials',
          pageId: runtimePageId || undefined,
          pageAccessToken: runtimePageToken || undefined,
          instagramId: runtimeIgId || undefined,
          instagramAccessToken: runtimeIgToken || undefined,
          adAccountId: runtimeAdAccountId || undefined,
        }),
      });

      const data = await res.json();
      setTestFeedback(data);

      if (data.success) {
        if (data.isLive) {
          triggerToast(`🎉 Successfully connected to live page: ${data.facebook?.name || 'Facebook Page'}!`);
        } else if (data.errors?.length > 0) {
          triggerToast(`⚠️ Credentials saved but Meta returned: ${data.errors[0]}`);
        } else {
          triggerToast('Credentials updated. Refreshing status...');
        }
        await fetchMetaStatus();
      } else {
        alert(data.error || 'Failed to update credentials');
      }
    } catch (err: any) {
      alert('Connection error: ' + err.message);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleResetRuntimeCredentials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/meta-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset_runtime_credentials' }),
      });
      const data = await res.json();
      setRuntimePageId('');
      setRuntimePageToken('');
      setRuntimeIgId('');
      setRuntimeIgToken('');
      setRuntimeAdAccountId('');
      setTestFeedback(null);
      triggerToast('Reset to Vercel environment variables. Refreshing...');
      await fetchMetaStatus();
    } catch (e: any) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculations for estimated metrics
  const totalBudgetInr = budgetType === 'daily' ? budgetAmount * durationDays : budgetAmount;
  const gstTax = Math.round(totalBudgetInr * 0.18);
  const totalPayable = totalBudgetInr + gstTax;

  const estimatedImpressions = Math.round((totalBudgetInr / 55) * 1000);
  const estimatedReach = Math.round(estimatedImpressions * 0.72);
  const estimatedVideoPlays = Math.round(estimatedImpressions * 0.65);
  const estimatedClicks = Math.round(estimatedImpressions * 0.028);
  const estimatedLeads = Math.round(estimatedClicks * 0.24);

  // Main Submit: Post Reel & Launch Ad
  const handlePublishReelAndAd = async () => {
    if (!postToFacebook && !postToInstagram) {
      alert('Please select at least one platform (Facebook or Instagram) to publish.');
      return;
    }

    if (!caption.trim()) {
      alert('Please enter a caption for your reel post.');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmissionStep('1. Uploading video media to Meta Graph API servers...');

      const selectedPlatforms: ('facebook' | 'instagram')[] = [];
      if (postToFacebook) selectedPlatforms.push('facebook');
      if (postToInstagram) selectedPlatforms.push('instagram');

      // Step 1: Post Reel
      setSubmissionStep('2. Publishing Reel to connected Facebook Page and Instagram Profile...');
      const postRes = await fetch('/api/admin/meta-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'post_reel',
          videoUrl: videoPreviewUrl,
          videoFileName,
          caption: `${caption}\n\n${hashtags}`,
          title: reelTitle,
          platforms: selectedPlatforms,
          shareToFeed: true,
        }),
      });

      const postData = await postRes.json();
      if (!postData.success) {
        throw new Error(postData.error || 'Failed to post reel to Meta platforms');
      }

      let launchedCampaignData = null;

      // Step 2: If Ad is enabled, launch ad campaign with budget
      if (launchAdEnabled) {
        setSubmissionStep('3. Creating Meta Ad Campaign & setting daily budget in Meta Ad Account...');
        const adRes = await fetch('/api/admin/meta-ads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'launch_ad',
            campaignName: campaignName || `${reelTitle} Boost`,
            reelTitle,
            caption: `${caption}\n\n${hashtags}`,
            videoUrl: videoPreviewUrl,
            platforms: selectedPlatforms,
            budgetType,
            budgetAmount,
            durationDays,
            objective: adObjective,
            targetAudience: {
              locations: selectedLocations,
              ageMin,
              ageMax,
              interests: ['Banking', 'Finance', 'Job Opportunities'],
            },
            adHeadline,
            adPrimaryText,
            ctaType,
            postIds: {
              facebook: postData.results?.facebook?.postId,
              instagram: postData.results?.instagram?.postId,
            },
            postUrls: {
              facebook: postData.results?.facebook?.postUrl,
              instagram: postData.results?.instagram?.postUrl,
            },
          }),
        });

        const adData = await adRes.json();
        if (!adData.success) {
          throw new Error(adData.error || 'Reel posted, but failed to launch Ad Campaign');
        }
        launchedCampaignData = adData;
      }

      setSubmissionStep('4. Finalizing synchronization with Meta Ads Manager...');
      await new Promise((r) => setTimeout(r, 600));

      setLastSuccessResult({
        postData,
        adData: launchedCampaignData,
        platforms: selectedPlatforms,
      });

      triggerToast(
        launchAdEnabled
          ? '🎉 Reel posted to connected Meta channels and Ad Campaign launched with set budget!'
          : '🎉 Reel published successfully to connected Meta channels!'
      );

      // Refresh list
      fetchMetaStatus();
    } catch (err: any) {
      console.error('Error publishing reel/ad:', err);
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
      setSubmissionStep('');
    }
  };

  // Toggle Campaign Status
  const handleToggleCampaignStatus = async (campaignId: string) => {
    try {
      const res = await fetch('/api/admin/meta-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_ad_status',
          campaignId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCampaigns((prev) =>
          prev.map((c) => (c.id === campaignId ? { ...c, status: data.campaign.status } : c))
        );
        triggerToast(`Campaign status changed to ${data.campaign.status}`);
      }
    } catch (e: any) {
      alert('Failed to update campaign: ' + e.message);
    }
  };

  // Delete Campaign
  const handleDeleteCampaign = async (campaignId: string) => {
    if (!confirm('Are you sure you want to remove this campaign record?')) return;
    try {
      const res = await fetch('/api/admin/meta-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_campaign',
          campaignId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCampaigns((prev) => prev.filter((c) => c.id !== campaignId));
        triggerToast('Campaign removed from dashboard.');
      }
    } catch (e: any) {
      alert('Failed to delete campaign: ' + e.message);
    }
  };

  // Avatar initials helper
  const getInitials = (name?: string) => {
    if (!name) return 'AP';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-teal-600 text-white px-4 py-3 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-2 border border-teal-300 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-teal-100" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-ink-950 via-teal-950 to-ink-900 border border-teal-500/30 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-teal-500/40">
                <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
                <span>Meta Marketing Graph API v21.0</span>
              </div>

              {isLiveMode ? (
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-mono font-bold border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Live Page Connected</span>
                </span>
              ) : diagnostics?.hasLiveFbToken ? (
                <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-mono font-bold border border-amber-500/40">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Tokens Detected (Click Settings to Verify)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-xs font-mono font-bold border border-slate-500/40">
                  <span>Demo Mode (Vercel Env / Token Setup Available)</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
              AI Page Ad Manager
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Upload and publish hiring reels directly to your live connected Facebook &amp; Instagram pages, and launch targeted high-performing Meta Ad campaigns by setting a custom budget in INR.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowConfigModal(true)}
              className="px-3.5 py-2 bg-ink-800/80 hover:bg-ink-700 text-slate-200 border border-ink-600 rounded-lg text-xs font-mono flex items-center gap-2 transition cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-teal-400" />
              <span>Connection &amp; Tokens</span>
            </button>
            <button
              onClick={() => fetchMetaStatus(true)}
              className="p-2 bg-ink-800/80 hover:bg-ink-700 text-slate-200 border border-ink-600 rounded-lg text-xs transition cursor-pointer"
              title="Refresh connection status from Meta Graph API"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-teal-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Live Warning Notice if Meta Graph API returned error */}
        {diagnostics?.graphApiErrors && diagnostics.graphApiErrors.length > 0 && (
          <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start justify-between gap-3 text-xs text-amber-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-amber-300">Meta Graph API Sync Notice:</strong>
                <p className="text-amber-200/90 text-[11px] leading-relaxed mt-0.5">
                  {diagnostics.graphApiErrors[0]}
                </p>
                <p className="text-[10px] text-amber-300/80 mt-1 font-mono">
                  Tip: Check your Page Access Token in Vercel settings or use the &quot;Connection &amp; Tokens&quot; button to test your token directly.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowConfigModal(true)}
              className="shrink-0 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded font-mono text-[10px] border border-amber-500/40 cursor-pointer"
            >
              Fix Tokens
            </button>
          </div>
        )}

        {/* Connected Channels Status Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-teal-500/20">
          {/* Facebook */}
          <div className="bg-ink-900/60 backdrop-blur-xs border border-ink-700/60 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              {accounts?.facebook?.pictureUrl ? (
                <img
                  src={accounts.facebook.pictureUrl}
                  alt="Facebook Page"
                  className="w-9 h-9 rounded-lg object-cover border border-blue-500/40 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Facebook className="w-4 h-4 fill-current" />
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white truncate">
                    {accounts?.facebook?.name || 'Facebook Page'}
                  </span>
                  {accounts?.facebook?.isLive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {accounts?.facebook?.handle || `@page_${accounts?.facebook?.id || ''}`}
                  {accounts?.facebook?.followers && ` • ${accounts.facebook.followers} followers`}
                </p>
              </div>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                accounts?.facebook?.isLive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : accounts?.facebook?.isLiveTokenConfigured
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-700/60 text-slate-300 border-slate-600'
              }`}
            >
              {accounts?.facebook?.isLive
                ? 'Live'
                : accounts?.facebook?.isLiveTokenConfigured
                ? 'Configured'
                : 'Demo'}
            </span>
          </div>

          {/* Instagram */}
          <div className="bg-ink-900/60 backdrop-blur-xs border border-ink-700/60 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              {accounts?.instagram?.profilePictureUrl ? (
                <img
                  src={accounts.instagram.profilePictureUrl}
                  alt="Instagram Account"
                  className="w-9 h-9 rounded-lg object-cover border border-pink-500/40 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white truncate">
                    {accounts?.instagram?.name || 'Instagram Profile'}
                  </span>
                  {accounts?.instagram?.isLive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  @{accounts?.instagram?.username || 'instagram_account'}
                  {accounts?.instagram?.followers && ` • ${accounts.instagram.followers} followers`}
                </p>
              </div>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                accounts?.instagram?.isLive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : accounts?.instagram?.isLiveTokenConfigured
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-700/60 text-slate-300 border-slate-600'
              }`}
            >
              {accounts?.instagram?.isLive
                ? 'Live'
                : accounts?.instagram?.isLiveTokenConfigured
                ? 'Configured'
                : 'Demo'}
            </span>
          </div>

          {/* Meta Ad Account */}
          <div className="bg-ink-900/60 backdrop-blur-xs border border-ink-700/60 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-teal-600/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white truncate">
                    {accounts?.metaAdAccount?.name || 'Meta Ad Account'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                </div>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  {accounts?.metaAdAccount?.id || 'act_configured'} ({accounts?.metaAdAccount?.currency || 'INR'})
                </p>
              </div>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                accounts?.metaAdAccount?.isLive
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-700/60 text-slate-300 border-slate-600'
              }`}
            >
              {accounts?.metaAdAccount?.isLive ? 'Live Ads' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'create'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate hover:bg-paper'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Upload Reel &amp; Launch Ad</span>
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'campaigns'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate hover:bg-paper'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Active Ads &amp; Posted Reels</span>
            <span className="bg-teal-100 text-teal-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1">
              {campaigns.length}
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate">
          <span>Active Ad Currency:</span>
          <span className="font-bold text-ink-900 bg-paper px-2 py-0.5 rounded border border-line">
            {accounts?.metaAdAccount?.currency || 'INR'} (₹)
          </span>
        </div>
      </div>

      {/* TAB 1: UPLOAD REEL & LAUNCH AD */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT 7 COLS: FORM CONTROLS */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Video File Selection Card */}
            <div className="bg-surface border border-line rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-mono text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-display font-bold text-base text-ink-900">
                    Upload Reel Post Video
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleUseSampleVideo}
                  className="text-xs font-mono text-teal-700 hover:text-teal-900 underline flex items-center gap-1 cursor-pointer"
                >
                  <FileVideo className="w-3.5 h-3.5" />
                  <span>Use Sample Reel</span>
                </button>
              </div>

              {/* Upload Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/40 hover:bg-teal-50/70 rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/mp4,video/quicktime,video/webm"
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-teal-200 flex items-center justify-center group-hover:scale-110 transition">
                  <Upload className="w-6 h-6 text-teal-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-ink-900">
                    Click to browse or drop vertical video reel
                  </p>
                  <p className="text-xs text-slate">
                    Recommended 9:16 vertical ratio (1080×1920) • MP4, MOV, or WebM up to 150MB
                  </p>
                </div>
                {videoFileName && (
                  <div className="mt-2 inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-teal-200 text-xs font-mono text-teal-800 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span className="font-bold truncate max-w-xs">{videoFileName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Content & AI Copy Generator Card */}
            <div className="bg-surface border border-line rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-mono text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-display font-bold text-base text-ink-900">
                    Reel Post Details &amp; AI Caption Studio
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 bg-paper px-2 py-1 rounded border border-line text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-ink-900 font-bold">Gemini AI Powered</span>
                </div>
              </div>

              {/* Quick Preset Inputs for AI */}
              <div className="bg-paper border border-line rounded-lg p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-bold text-slate">
                    Hiring Opportunity Parameters (Auto-Feeds AI)
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <span className="text-muted">Tone:</span>
                    <select
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value as any)}
                      className="bg-white border border-line rounded px-1.5 py-0.5 text-xs text-ink-900 font-sans"
                    >
                      <option value="high_energy">🔥 Urgent &amp; High-Energy</option>
                      <option value="professional">💼 Corporate &amp; Executive</option>
                      <option value="fresher">🎓 Fresher Friendly</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate font-bold mb-1">Job Designation</label>
                    <input
                      type="text"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      placeholder="e.g. Senior Credit Analyst"
                      className="w-full bg-white border border-line rounded px-3 py-1.5 text-ink-900 outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate font-bold mb-1">Locations</label>
                    <input
                      type="text"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      placeholder="e.g. Mumbai, Pune, Delhi NCR"
                      className="w-full bg-white border border-line rounded px-3 py-1.5 text-ink-900 outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate font-bold mb-1">Salary Package</label>
                    <input
                      type="text"
                      value={salaryBand}
                      onChange={(e) => setSalaryBand(e.target.value)}
                      placeholder="e.g. ₹3.5L - ₹6.5L PA"
                      className="w-full bg-white border border-line rounded px-3 py-1.5 text-ink-900 outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate font-bold mb-1">Key Perks / Urgency</label>
                    <input
                      type="text"
                      value={perksText}
                      onChange={(e) => setPerksText(e.target.value)}
                      placeholder="e.g. Immediate Joining, Top Partner Banks"
                      className="w-full bg-white border border-line rounded px-3 py-1.5 text-ink-900 outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={handleGenerateAiCopy}
                    disabled={isAiGenerating}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white font-mono text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isAiGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Crafting Viral Copy with Gemini...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Generate High-Converting Copy &amp; Hashtags</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Reel Caption Editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-ink-900">
                    Reel Post Caption (Shows on FB &amp; IG)
                  </label>
                  <span className="text-[10px] font-mono text-muted">
                    {caption.length} characters
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write caption with emojis, details, and call to action..."
                  className="w-full bg-paper border border-line rounded-lg p-3 text-xs text-ink-900 focus:bg-white focus:border-teal-500 outline-none transition font-sans"
                />
              </div>

              {/* Hashtags Input */}
              <div>
                <label className="block text-xs font-bold text-ink-900 mb-1">
                  Meta Viral Hashtags
                </label>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2 text-xs text-ink-900 focus:bg-white focus:border-teal-500 outline-none transition font-mono"
                />
              </div>
            </div>

            {/* Step 3: Destination Platforms (Live Connected Accounts) */}
            <div className="bg-surface border border-line rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-mono text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-display font-bold text-base text-ink-900">
                    Select Connected Destination Pages
                  </h3>
                </div>
                {accounts?.facebook?.isLive && (
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified Meta Graph API
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Facebook Checkbox Card */}
                <label
                  className={`border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition ${
                    postToFacebook
                      ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500/20'
                      : 'border-line bg-paper opacity-70'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={postToFacebook}
                    onChange={(e) => setPostToFacebook(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Facebook className="w-4 h-4 text-blue-600 fill-current" />
                      <span className="font-bold text-xs text-ink-900 truncate">
                        {accounts?.facebook?.name || 'Connected Facebook Page'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate mt-0.5 truncate">
                      {accounts?.facebook?.handle || `@page_${accounts?.facebook?.id || ''}`}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-mono text-blue-700 bg-blue-100/60 px-1.5 py-0.2 rounded inline-block">
                        Reels Feed &amp; Page
                      </span>
                      {accounts?.facebook?.isLive && (
                        <span className="text-[9px] font-mono text-emerald-700 font-bold">
                          ● Live
                        </span>
                      )}
                    </div>
                  </div>
                </label>

                {/* Instagram Checkbox Card */}
                <label
                  className={`border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition ${
                    postToInstagram
                      ? 'border-pink-500 bg-pink-50/40 ring-1 ring-pink-500/20'
                      : 'border-line bg-paper opacity-70'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={postToInstagram}
                    onChange={(e) => setPostToInstagram(e.target.checked)}
                    className="mt-1 w-4 h-4 text-pink-600 rounded border-slate-300 focus:ring-pink-500"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-xs text-ink-900 truncate">
                        {accounts?.instagram?.name || 'Instagram Profile'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate mt-0.5 truncate">
                      @{accounts?.instagram?.username || 'instagram_account'}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-mono text-pink-700 bg-pink-100/60 px-1.5 py-0.2 rounded inline-block">
                        Reels Tab &amp; Grid
                      </span>
                      {accounts?.instagram?.isLive && (
                        <span className="text-[9px] font-mono text-emerald-700 font-bold">
                          ● Live
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 4: Launch Ad for this Reel Post with Budget */}
            <div className="bg-surface border border-line rounded-xl p-5 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-mono text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-ink-900">
                      Launch Ad for this Reel Post (Meta Ads)
                    </h3>
                    <p className="text-xs text-slate">
                      Boost this reel across Instagram &amp; Facebook with a targeted ad budget in INR.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={launchAdEnabled}
                    onChange={(e) => setLaunchAdEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600" />
                </label>
              </div>

              {launchAdEnabled && (
                <div className="space-y-5">
                  {/* Budget Configuration */}
                  <div className="bg-gradient-to-br from-teal-50/70 to-emerald-50/50 border border-teal-200 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-teal-700" />
                        <span className="font-mono text-xs font-bold uppercase text-teal-900 tracking-wider">
                          Campaign Budget Settings
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-teal-200 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setBudgetType('daily')}
                          className={`px-2.5 py-1 rounded transition cursor-pointer ${
                            budgetType === 'daily'
                              ? 'bg-teal-600 text-white font-bold'
                              : 'text-slate hover:bg-slate-100'
                          }`}
                        >
                          Daily Budget
                        </button>
                        <button
                          type="button"
                          onClick={() => setBudgetType('lifetime')}
                          className={`px-2.5 py-1 rounded transition cursor-pointer ${
                            budgetType === 'lifetime'
                              ? 'bg-teal-600 text-white font-bold'
                              : 'text-slate hover:bg-slate-100'
                          }`}
                        >
                          Lifetime Budget
                        </button>
                      </div>
                    </div>

                    {/* Preset Budget Buttons */}
                    <div>
                      <label className="block text-xs font-bold text-ink-900 mb-2">
                        Select Budget Amount ({budgetType === 'daily' ? 'per day' : 'total'} in INR)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {[500, 1000, 2500, 5000, 10000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setBudgetAmount(amt)}
                            className={`py-2 px-3 rounded-lg border text-xs font-mono font-bold transition flex flex-col items-center justify-center cursor-pointer ${
                              budgetAmount === amt
                                ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                                : 'bg-white text-ink-900 border-teal-200 hover:bg-teal-50'
                            }`}
                          >
                            <span>₹{amt.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] font-normal opacity-80">
                              {budgetType === 'daily' ? '/day' : 'total'}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Custom budget input */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-slate font-mono">Custom Amount (₹):</span>
                        <div className="relative flex-1 max-w-xs">
                          <span className="absolute left-3 top-2 text-xs font-mono text-slate">₹</span>
                          <input
                            type="number"
                            min="100"
                            step="100"
                            value={budgetAmount}
                            onChange={(e) => setBudgetAmount(Math.max(100, Number(e.target.value)))}
                            className="w-full bg-white border border-teal-200 rounded-lg pl-7 pr-3 py-1.5 text-xs font-mono text-ink-900 outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Campaign Duration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-teal-200/60">
                      <div>
                        <label className="block text-xs font-bold text-ink-900 mb-1">
                          Ad Duration (Days)
                        </label>
                        <div className="flex items-center gap-2">
                          {[3, 5, 7, 14, 30].map((days) => (
                            <button
                              key={days}
                              type="button"
                              onClick={() => setDurationDays(days)}
                              className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                                durationDays === days
                                  ? 'bg-teal-800 text-white font-bold'
                                  : 'bg-white text-ink-900 border border-teal-200 hover:bg-teal-50'
                              }`}
                            >
                              {days}d
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink-900 mb-1">
                          Ad Objective
                        </label>
                        <select
                          value={adObjective}
                          onChange={(e) => setAdObjective(e.target.value as any)}
                          className="w-full bg-white border border-teal-200 rounded px-2.5 py-1.5 text-xs font-mono text-ink-900 outline-none focus:border-teal-500"
                        >
                          <option value="OUTCOME_LEADS">🎯 Generate Leads (Instant Forms &amp; WhatsApp)</option>
                          <option value="OUTCOME_TRAFFIC">🚀 Drive Traffic to Jobs Portal</option>
                          <option value="OUTCOME_MESSAGES">💬 Direct Inquiries via Instagram DM</option>
                          <option value="OUTCOME_AWARENESS">📢 Brand Awareness &amp; Video Views</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Final Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePublishReelAndAd}
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-display font-bold text-base rounded-xl shadow-lg transition flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{submissionStep || 'Processing Meta Graph API Call...'}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>
                      {launchAdEnabled
                        ? `Publish Reel & Launch Meta Ad (₹${totalPayable.toLocaleString('en-IN')})`
                        : 'Publish Reel to Connected Channels'}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT 5 COLS: LIVE PREVIEW & PHONE MOCKUP */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface border border-line rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-teal-600" />
                  <h3 className="font-display font-bold text-sm text-ink-900">
                    Live Reel &amp; Feed Preview
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-muted">
                  Instagram / Facebook Format
                </span>
              </div>

              {/* Realistic Mobile Reel Mockup */}
              <div className="relative mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900 w-full max-w-[310px] aspect-[9/16] flex flex-col justify-between select-none">
                {/* Background Video */}
                <video
                  ref={videoRef}
                  src={videoPreviewUrl}
                  loop
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  onClick={toggleVideoPlayback}
                />

                {/* Play/Pause Center Overlay */}
                <button
                  type="button"
                  onClick={toggleVideoPlayback}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition group"
                >
                  <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition">
                    {isVideoPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-1 text-teal-300" />
                    )}
                  </div>
                </button>

                {/* Top Reel Status Bar */}
                <div className="relative z-10 p-3 flex items-center justify-between text-white drop-shadow-md text-xs font-mono">
                  <span className="font-bold flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-teal-400" />
                    <span>Reels</span>
                  </span>
                  {launchAdEnabled && (
                    <span className="bg-teal-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs border border-teal-300/40">
                      Sponsored Ad
                    </span>
                  )}
                </div>

                {/* Right Side Social Interactions */}
                <div className="relative z-10 p-3 self-end flex flex-col items-center gap-3.5 text-white drop-shadow-lg">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                      <span className="text-red-500 text-lg">♥</span>
                    </div>
                    <span className="text-[10px] font-mono mt-0.5 font-bold">14.2K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] font-mono mt-0.5 font-bold">384</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] font-mono mt-0.5 font-bold">Share</span>
                  </div>
                </div>

                {/* Bottom Overlay: Profile Info, Caption & CTA Button */}
                <div className="relative z-10 p-3.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white space-y-2">
                  <div className="flex items-center gap-2">
                    {accounts?.instagram?.profilePictureUrl || accounts?.facebook?.pictureUrl ? (
                      <img
                        src={accounts.instagram.profilePictureUrl || accounts.facebook.pictureUrl || ''}
                        alt="Profile Avatar"
                        className="w-7 h-7 rounded-full object-cover border border-white"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-teal-500 border border-white flex items-center justify-center text-[10px] font-bold text-white uppercase">
                        {getInitials(accounts?.facebook?.name || 'Aranii Corporate')}
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="font-bold text-xs truncate block">
                        {accounts?.instagram?.username || (accounts?.facebook?.name ? accounts.facebook.name.toLowerCase().replace(/[^a-z0-9]/g, '') : 'aranii_corporate_official')}
                      </span>
                    </div>
                    <span className="bg-white/20 text-white text-[9px] px-2 py-0.5 rounded font-bold ml-auto shrink-0">
                      Follow
                    </span>
                  </div>

                  {/* Caption snippet */}
                  <p className="text-[11px] text-white/90 line-clamp-2 leading-tight">
                    {caption}
                  </p>

                  {/* Sponsored CTA banner if ad is enabled */}
                  {launchAdEnabled && (
                    <div className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-between shadow-lg cursor-pointer">
                      <span className="truncate">{adHeadline || 'Apply for Open Positions'}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                    </div>
                  )}
                </div>
              </div>

              {/* Success Result Modal / Card */}
              {lastSuccessResult && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-950 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-sm">Published to Connected Meta Channels</h4>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Your reel has been sent to Meta Graph API. You can view the live reel posts or track active ad performance:
                  </p>
                  <div className="flex flex-col gap-1.5 text-xs font-mono">
                    {lastSuccessResult.postData?.results?.facebook?.postUrl && (
                      <a
                        href={lastSuccessResult.postData.results.facebook.postUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 hover:underline flex items-center gap-1.5"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                        <span>View Facebook Reel Post ↗</span>
                      </a>
                    )}
                    {lastSuccessResult.postData?.results?.instagram?.postUrl && (
                      <a
                        href={lastSuccessResult.postData.results.instagram.postUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pink-700 hover:underline flex items-center gap-1.5"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>View Instagram Reel Post ↗</span>
                      </a>
                    )}
                  </div>
                  {lastSuccessResult.adData && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('campaigns')}
                      className="w-full mt-2 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                    >
                      View Live Campaign Analytics →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE ADS & CAMPAIGNS FEED */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-xl text-ink-900">
                Meta Ad Campaigns &amp; Reel Posts Directory
              </h2>
              <p className="text-xs text-slate">
                Real-time tracking of active Meta Reel ad campaigns, spent budget, impressions, and applicant leads.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('create')}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>New Reel Ad</span>
            </button>
          </div>

          {campaigns.length === 0 ? (
            <div className="bg-surface border border-line rounded-xl p-12 text-center space-y-3">
              <BarChart3 className="w-12 h-12 text-slate mx-auto" />
              <h3 className="font-bold text-base text-ink-900">No Meta Campaigns Launched Yet</h3>
              <p className="text-xs text-slate max-w-md mx-auto">
                Upload your first reel post and configure a budget above to launch your first targeted Meta Ad campaign.
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-mono font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Upload &amp; Launch First Ad</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((cam) => {
                const isActive = cam.status === 'ACTIVE';
                return (
                  <div
                    key={cam.id}
                    className="bg-surface border border-line rounded-xl p-5 shadow-xs hover:shadow-md transition space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-teal-700 font-bold">{cam.id}</span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                              isActive
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : cam.status === 'PAUSED'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {cam.status}
                          </span>
                          {cam.isLiveCampaign && (
                            <span className="bg-teal-100 text-teal-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-teal-300">
                              Live Meta Ad
                            </span>
                          )}
                          <span className="text-xs text-muted font-mono">
                            {new Date(cam.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-lg text-ink-900 mt-1">
                          {cam.name}
                        </h3>
                        <p className="text-xs text-slate truncate max-w-xl">
                          Reel: {cam.reelTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleCampaignStatus(cam.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            isActive
                              ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                          }`}
                        >
                          {isActive ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Pause Ad</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              <span>Resume Ad</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCampaign(cam.id)}
                          className="p-1.5 text-slate hover:text-danger hover:bg-danger/10 rounded transition cursor-pointer"
                          title="Delete Campaign"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
                      <div className="p-2.5 bg-paper rounded-lg">
                        <p className="text-[10px] font-mono text-muted uppercase">Budget Plan</p>
                        <p className="font-bold text-sm text-ink-900 mt-0.5">
                          ₹{cam.budgetAmount.toLocaleString('en-IN')}/{cam.budgetType === 'daily' ? 'd' : 'tot'}
                        </p>
                        <span className="text-[10px] text-slate">{cam.durationDays} Days</span>
                      </div>
                      <div className="p-2.5 bg-paper rounded-lg">
                        <p className="text-[10px] font-mono text-muted uppercase">Spent</p>
                        <p className="font-bold text-sm text-teal-700 mt-0.5">
                          ₹{cam.metrics.spent.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] text-slate">Meta Invoiced</span>
                      </div>
                      <div className="p-2.5 bg-paper rounded-lg">
                        <p className="text-[10px] font-mono text-muted uppercase">Reel Plays</p>
                        <p className="font-bold text-sm text-ink-900 mt-0.5">
                          {cam.metrics.videoPlays.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] text-slate">Video Views</span>
                      </div>
                      <div className="p-2.5 bg-paper rounded-lg">
                        <p className="text-[10px] font-mono text-muted uppercase">Impressions</p>
                        <p className="font-bold text-sm text-ink-900 mt-0.5">
                          {cam.metrics.impressions.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] text-slate">Reach: {cam.metrics.reach.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-2.5 bg-paper rounded-lg">
                        <p className="text-[10px] font-mono text-muted uppercase">Clicks</p>
                        <p className="font-bold text-sm text-ink-900 mt-0.5">
                          {cam.metrics.clicks.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] text-slate">CPC: ₹{cam.metrics.cpc}</span>
                      </div>
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <p className="text-[10px] font-mono text-emerald-800 uppercase font-bold">
                          Leads Won
                        </p>
                        <p className="font-bold text-sm text-emerald-700 mt-0.5">
                          {cam.metrics.leads} Candidates
                        </p>
                        <span className="text-[10px] text-emerald-600 font-mono">Verified</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* META CONFIGURATION MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-teal-600" />
                <h3 className="font-display font-bold text-lg text-ink-900">
                  Meta Graph API &amp; Vercel Environment Configuration
                </h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1 hover:bg-paper rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5 text-slate" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              {/* Vercel Environment Variables Status */}
              <div className="bg-paper border border-line rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-ink-900 font-display text-sm">
                    Vercel Environment Variables Audit
                  </h4>
                  <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Server Status: {isLiveMode ? 'Live Connected' : 'Checking'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate">
                  {diagnostics?.envAudit &&
                    Object.entries(diagnostics.envAudit).map(([k, v]: [string, any]) => {
                      const isSet = v !== 'Not Set';
                      return (
                        <div
                          key={k}
                          className="flex items-center justify-between p-2.5 bg-surface rounded-lg border border-line"
                        >
                          <span className="font-mono text-[11px] font-bold text-ink-900">{k}</span>
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                              isSet
                                ? 'bg-emerald-100 text-emerald-800 font-bold'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String(v)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Direct Live Connection & Override Form */}
              <form onSubmit={handleSaveRuntimeCredentials} className="bg-teal-50/50 border border-teal-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-teal-950 font-display text-sm">
                      Live Test &amp; Immediate Token Override
                    </h4>
                    <p className="text-[11px] text-teal-800 mt-0.5">
                      Test your Facebook Page ID and Access Token live against Meta Graph API:
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetRuntimeCredentials}
                    className="text-[10px] font-mono text-slate hover:text-ink-900 underline cursor-pointer"
                  >
                    Reset Overrides
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate font-bold mb-1">Facebook Page ID</label>
                    <input
                      type="text"
                      value={runtimePageId}
                      onChange={(e) => setRuntimePageId(e.target.value)}
                      placeholder={accounts?.facebook?.id || 'e.g. 10849204918231'}
                      className="w-full bg-white border border-teal-200 rounded px-3 py-1.5 text-ink-900 outline-none focus:border-teal-500 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate font-bold mb-1">Facebook Page Access Token</label>
                    <input
                      type="password"
                      value={runtimePageToken}
                      onChange={(e) => setRuntimePageToken(e.target.value)}
                      placeholder="EAAB... (Paste Token)"
                      className="w-full bg-white border border-teal-200 rounded px-3 py-1.5 text-ink-900 outline-none focus:border-teal-500 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate font-bold mb-1">Instagram Business Account ID (Optional)</label>
                    <input
                      type="text"
                      value={runtimeIgId}
                      onChange={(e) => setRuntimeIgId(e.target.value)}
                      placeholder={accounts?.instagram?.id || 'e.g. 17841400293819'}
                      className="w-full bg-white border border-teal-200 rounded px-3 py-1.5 text-ink-900 outline-none focus:border-teal-500 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate font-bold mb-1">Meta Ad Account ID (Optional)</label>
                    <input
                      type="text"
                      value={runtimeAdAccountId}
                      onChange={(e) => setRuntimeAdAccountId(e.target.value)}
                      placeholder={accounts?.metaAdAccount?.id || 'e.g. act_592019481920'}
                      className="w-full bg-white border border-teal-200 rounded px-3 py-1.5 text-ink-900 outline-none focus:border-teal-500 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-teal-800">
                    {testFeedback?.message && (
                      <span className="font-bold text-teal-900">{testFeedback.message}</span>
                    )}
                  </span>
                  <button
                    type="submit"
                    disabled={isTestingConnection}
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-mono text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isTestingConnection ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying with Meta...</span>
                      </>
                    ) : (
                      <>
                        <Key className="w-3.5 h-3.5" />
                        <span>Test &amp; Connect Live Now</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Troubleshooting Instructions */}
              <div className="space-y-2">
                <h4 className="font-bold text-ink-900">Configuring in Vercel Project Settings</h4>
                <p className="text-slate leading-relaxed">
                  To permanently configure your connected Facebook Page and Instagram Account in Vercel:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate text-[11px]">
                  <li>Open your project dashboard on Vercel &rarr; Settings &rarr; <strong>Environment Variables</strong>.</li>
                  <li>Add <code>META_PAGE_ID</code> (e.g. your numerical Facebook Page ID from Meta Business Suite).</li>
                  <li>Add <code>META_PAGE_ACCESS_TOKEN</code> (your permanent System User or Page Access Token starting with <code>EAAB...</code>).</li>
                  <li>Add <code>INSTAGRAM_PAGE_ID</code> (your Instagram Business Account ID).</li>
                  <li>Add <code>META_AD_ACCOUNT_ID</code> (e.g. <code>act_1234567890</code>).</li>
                  <li>Redeploy your project on Vercel so the server runtime loads the new environment variables.</li>
                </ol>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold rounded-lg transition cursor-pointer"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
