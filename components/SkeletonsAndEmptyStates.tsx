'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Briefcase, FileText, Inbox, RefreshCw, PlusCircle, ArrowRight } from 'lucide-react';

/* ==================== SKELETON LOADERS ==================== */

export function JobCardSkeleton() {
  return (
    <div className="bg-surface border border-line rounded-lg p-5 shadow-xs animate-pulse space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-slate-200 rounded" />
          <div className="h-5 w-24 bg-slate-200 rounded-full" />
        </div>
        <div className="h-4 w-20 bg-slate-200 rounded" />
      </div>
      <div className="h-6 w-2/3 bg-slate-200 rounded" />
      <div className="flex items-center gap-4">
        <div className="h-4 w-32 bg-slate-200 rounded" />
        <div className="h-4 w-28 bg-slate-200 rounded" />
        <div className="h-4 w-24 bg-slate-200 rounded" />
      </div>
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-surface border border-line rounded-lg overflow-hidden shadow-xs animate-pulse space-y-4">
      <div className="h-48 bg-slate-200 w-full" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-32 bg-slate-200 rounded" />
        <div className="h-6 w-5/6 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
        <div className="pt-4 border-t border-line flex justify-between">
          <div className="h-4 w-24 bg-slate-200 rounded" />
          <div className="h-4 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface p-5 border border-line rounded-lg space-y-3">
            <div className="h-3 w-24 bg-slate-200 rounded" />
            <div className="h-8 w-16 bg-slate-200 rounded" />
            <div className="h-3 w-32 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-surface p-6 border border-line rounded-lg h-64 space-y-4">
        <div className="h-5 w-48 bg-slate-200 rounded" />
        <div className="h-40 bg-slate-100 rounded w-full" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-surface border border-line rounded-lg overflow-hidden animate-pulse">
      <div className="h-12 bg-slate-100 border-b border-line w-full" />
      <div className="divide-y divide-line">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between gap-4">
            <div className="h-5 w-1/4 bg-slate-200 rounded" />
            <div className="h-5 w-1/5 bg-slate-200 rounded" />
            <div className="h-5 w-1/6 bg-slate-200 rounded" />
            <div className="h-5 w-20 bg-slate-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================== EMPTY STATES ==================== */

export function EmptyJobsState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="bg-surface border border-line rounded-lg p-12 text-center space-y-4 shadow-xs">
      <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mx-auto">
        <Search className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-lg text-ink-900">No Matching Banking or Corporate Openings</h3>
        <p className="text-xs text-slate max-w-md mx-auto">
          We couldn&apos;t find any active positions matching your current search criteria or category filter.
        </p>
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface font-mono text-xs font-bold uppercase rounded shadow-xs transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Filters &amp; View All Jobs
        </button>
      )}
    </div>
  );
}

export function EmptyApplicationsState() {
  return (
    <div className="bg-surface border border-line rounded-lg p-12 text-center space-y-4 shadow-xs">
      <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mx-auto">
        <Briefcase className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-lg text-ink-900">No Applications Submitted Yet</h3>
        <p className="text-xs text-slate max-w-md mx-auto">
          You haven&apos;t applied to any banking or corporate positions. Explore 2,400+ active roles and submit with 1 click.
        </p>
      </div>
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-surface font-mono text-xs font-bold uppercase rounded shadow-xs transition"
      >
        Browse Open Positions <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export function EmptyArticlesState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="bg-surface border border-line rounded-lg p-12 text-center space-y-4 shadow-xs col-span-full">
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate flex items-center justify-center mx-auto">
        <FileText className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-lg text-ink-900">No Articles Match Your Search</h3>
        <p className="text-xs text-slate max-w-md mx-auto">
          Try searching for keywords like &quot;banking&quot;, &quot;resume&quot;, &quot;interview&quot;, or &quot;compliance&quot;.
        </p>
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface font-mono text-xs font-bold uppercase rounded shadow-xs transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Clear Search
        </button>
      )}
    </div>
  );
}

export function EmptyLeadsState({ onAction }: { onAction?: () => void }) {
  return (
    <div className="bg-surface border border-line rounded-lg p-12 text-center space-y-4 shadow-xs">
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate flex items-center justify-center mx-auto">
        <Inbox className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-lg text-ink-900">No Employer Enquiries Recorded</h3>
        <p className="text-xs text-slate max-w-md mx-auto">
          There are currently no employer leads in this status pipeline. New enquiries from the website will appear here automatically.
        </p>
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-surface font-mono text-xs font-bold uppercase rounded shadow-xs transition"
        >
          <PlusCircle className="w-3.5 h-3.5" /> Log Manual Employer Lead
        </button>
      )}
    </div>
  );
}
