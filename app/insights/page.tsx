'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AraniLogo } from '@/components/AraniLogo';
import { SAMPLE_ARTICLES, Article } from '@/lib/sampleData';
import { ArticleCardSkeleton, EmptyArticlesState } from '@/components/SkeletonsAndEmptyStates';
import { trackPixelEvent, captureUtmParams } from '@/lib/metaPixel';
import { generateArticleSchema } from '@/lib/jsonLd';
import {
  FileText,
  Play,
  Clock,
  Calendar,
  ArrowRight,
  Search,
  Share2,
  Bookmark,
  CheckCircle2,
  X,
  Mail,
  User,
  Tag,
  Sparkles
} from 'lucide-react';

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    captureUtmParams();
    trackPixelEvent('PageView', { page: 'insights_hub' });

    // Simulate initial loading state
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filtered articles
  const filteredArticles = SAMPLE_ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredArticle = SAMPLE_ARTICLES.find((a) => a.isFeatured) || SAMPLE_ARTICLES[0];

  const handleOpenArticle = (art: Article) => {
    setActiveArticle(art);
    trackPixelEvent('ViewContent', { content_name: art.title, content_category: art.category });
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    trackPixelEvent('Lead', { type: 'newsletter_insight', email: newsletterEmail });
    setNewsletterSubscribed(true);
    setTimeout(() => setNewsletterSubscribed(false), 5000);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-paper text-ink-900 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-line shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AraniLogo className="h-9" variant="dark" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-slate hover:text-teal-600 transition">
              Home
            </Link>
            <Link href="/jobs" className="text-slate hover:text-teal-600 transition">
              Live Job Board
            </Link>
            <Link href="/employers" className="text-slate hover:text-teal-600 transition">
              For Employers
            </Link>
            <Link href="/insights" className="text-teal-600 font-bold border-b-2 border-teal-500 pb-0.5">
              Insights
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/candidate/dashboard"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface text-xs font-mono font-bold uppercase rounded shadow-xs transition"
            >
              Candidate Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        {/* Hero Banner */}
        <div className="bg-ink-950 text-surface rounded-xl p-8 md:p-12 rising-bars relative overflow-hidden shadow-card">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-teal-400 bg-ink-800 px-3 py-1 rounded border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{"// CAREER & HIRING INTELLIGENCE HUB"}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-surface leading-tight">
              Banking Market Reports &amp; HR Advisory Insights
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              In-depth salary benchmarks, digital underwriting career guides, and candidate screening methodologies published directly by Aranii Corporate Solutions recruiters.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-surface p-4 border border-line rounded-lg shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {['All', 'Article', 'Guide', 'Video'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-mono font-bold uppercase transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-surface shadow-xs'
                    : 'bg-paper text-slate hover:text-ink-900 hover:bg-line'
                }`}
              >
                {cat === 'Video' ? '🎬 Videos' : cat === 'Guide' ? '📘 Guides' : cat === 'Article' ? '📄 Articles' : 'All Topics'}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports or guides..."
              className="w-full pl-9 pr-4 py-2 bg-paper border border-line rounded text-xs text-ink-900 focus:outline-none focus:border-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink-900 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Featured Article Spotlight (when no active category or query filter) */}
        {!searchQuery && selectedCategory === 'All' && featuredArticle && (
          <div className="bg-surface border border-line rounded-xl overflow-hidden shadow-card grid grid-cols-1 md:grid-cols-12 gap-0 group">
            <div className="md:col-span-7 relative h-64 md:h-auto min-h-[280px]">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-teal-500 text-surface font-mono text-[10px] font-bold uppercase px-3 py-1 rounded shadow-xs">
                FEATURED REPORT
              </span>
            </div>
            <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 font-mono text-xs text-muted">
                  <span className="text-teal-600 font-bold">{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-ink-900 group-hover:text-teal-600 transition leading-snug">
                  {featuredArticle.title}
                </h2>
                <p className="text-xs text-slate leading-relaxed">{featuredArticle.summary}</p>
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-between">
                <span className="font-mono text-xs text-slate">By {featuredArticle.author}</span>
                <button
                  onClick={() => handleOpenArticle(featuredArticle)}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface font-mono text-xs font-bold uppercase rounded shadow-xs transition flex items-center gap-1.5"
                >
                  Read Full Report <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
          </div>
        ) : filteredArticles.length === 0 ? (
          <EmptyArticlesState onReset={() => { setSearchQuery(''); setSelectedCategory('All'); }} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => handleOpenArticle(art)}
                className="bg-surface border border-line rounded-lg overflow-hidden shadow-card group flex flex-col justify-between cursor-pointer hover:border-teal-500 transition"
              >
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <Image
                    src={art.image}
                    alt={art.title}
                    width={600}
                    height={350}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-ink-900/90 text-surface font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded backdrop-blur-xs">
                    {art.category === 'Video' ? '🎬 VIDEO' : art.category}
                  </span>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-ink-900 group-hover:text-teal-600 transition leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate line-clamp-2 leading-relaxed">{art.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between text-xs font-mono font-bold text-teal-600">
                    <span className="text-slate font-normal">By {art.author}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Subscription Box */}
        <div className="bg-ink-900 text-surface p-8 rounded-xl border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-teal-400">
              <Mail className="w-4 h-4" />
              <span>{"// MONTHLY BANKING HIRING BRIEFING"}</span>
            </div>
            <h3 className="text-xl font-display font-bold">Subscribe to Executive Career &amp; HR Insights</h3>
            <p className="text-xs text-slate-300">
              Join 12,000+ HR heads and banking professionals receiving monthly compensation benchmark reports and market trends.
            </p>
          </div>

          <form onSubmit={handleSubscribeNewsletter} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter corporate email..."
              className="px-4 py-2.5 bg-ink-800 border border-ink-700 rounded text-xs text-surface placeholder:text-slate focus:outline-none focus:border-teal-400 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-surface font-mono text-xs font-bold uppercase rounded shadow-xs transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          {newsletterSubscribed && (
            <div className="fixed bottom-6 right-6 bg-ok text-surface p-4 rounded-lg shadow-lg font-mono text-xs flex items-center gap-2 z-50 animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              <span>Subscribed successfully! Welcome to Aranii Insights.</span>
            </div>
          )}
        </div>
      </main>

      {/* Article Modal Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          {/* Inject JSON-LD for active article */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateArticleSchema(activeArticle)) }}
          />

          <div className="bg-surface max-w-3xl w-full rounded-xl overflow-hidden shadow-2xl border border-line my-8 relative flex flex-col max-h-[90vh]">
            <div className="sticky top-0 bg-surface border-b border-line px-6 py-4 flex items-center justify-between z-10">
              <span className="font-mono text-xs uppercase font-bold text-teal-600">
                {activeArticle.category} • {activeArticle.readTime}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded text-slate hover:text-ink-900 hover:bg-paper transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 font-mono text-xs text-muted">
                  <span>Published {activeArticle.date}</span>
                  <span>•</span>
                  <span>By {activeArticle.author}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-extrabold text-ink-900 leading-tight">
                  {activeArticle.title}
                </h2>
              </div>

              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border border-line">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="prose prose-slate max-w-none text-xs md:text-sm text-slate space-y-4 leading-relaxed">
                <p className="font-medium text-ink-900 text-sm md:text-base border-l-4 border-teal-500 pl-4 py-1 bg-paper rounded-r">
                  {activeArticle.summary}
                </p>

                <p>
                  The Indian financial services and retail banking ecosystem is undergoing rapid structural evolution in 2026. As digital underwriting engines and real-time credit scoring platforms automate foundational processing, top private banks like HDFC, ICICI, and Kotak are actively restructuring talent requirements.
                </p>

                <h3 className="font-display font-bold text-lg text-ink-900 pt-2">
                  Key Talent Trends for Banking Candidates
                </h3>

                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Credit Risk &amp; CIBIL Analytics:</strong> Underwriters are expected to combine traditional financial ratio analysis with automated AI fraud detection tools.</li>
                  <li><strong>Branch Operations Modernization:</strong> Operational managers must maintain 100% audit compliance while driving digital customer onboarding.</li>
                  <li><strong>Wealth Advisory Certifications:</strong> NISM and AMFI certifications remain mandatory for relationship managers handling HNI portfolios.</li>
                </ul>

                <p>
                  For corporate clients, Aranii Corporate Solutions provides pre-screened talent shortlists within 72 hours, backed by a 90-day replacement guarantee.
                </p>
              </div>

              {/* Author Bio Box */}
              <div className="pt-6 border-t border-line flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center font-bold font-mono">
                    ACS
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-ink-900">{activeArticle.author}</h4>
                    <p className="text-[11px] text-slate">Senior Banking Talent Sourcing Desk</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }}
                  className="px-3 py-1.5 bg-paper hover:bg-line text-ink-900 font-mono text-xs font-bold rounded border border-line flex items-center gap-1.5 transition"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
