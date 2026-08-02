'use client';

import React, { useState } from 'react';
import { Search, X, ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { SAMPLE_JOBS, Job } from '@/lib/sampleData';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectJob: (job: Job) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSelectJob }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? SAMPLE_JOBS.filter(
        (j) =>
          j.title.toLowerCase().includes(query.toLowerCase()) ||
          j.id.toLowerCase().includes(query.toLowerCase()) ||
          j.category.toLowerCase().includes(query.toLowerCase()) ||
          j.location.toLowerCase().includes(query.toLowerCase()) ||
          j.companyName.toLowerCase().includes(query.toLowerCase())
      )
    : SAMPLE_JOBS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-sm p-4 md:p-12 animate-fadeIn flex flex-col items-center justify-start pt-16 md:pt-24">
      <div className="w-full max-w-2xl bg-surface border border-line rounded-lg shadow-2xl overflow-hidden">
        
        {/* Search Bar Input */}
        <div className="relative border-b border-line p-4 flex items-center gap-3 bg-paper">
          <Search className="w-5 h-5 text-teal-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by job title, ID (e.g. ACS-8042), sector, or city..."
            className="w-full bg-transparent text-ink-900 font-medium placeholder-slate focus:outline-none text-base"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate hover:text-ink-900 bg-line/50 hover:bg-line transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px] text-muted uppercase tracking-wider mb-2">
            <span>{query.trim() ? `Search Results (${filtered.length})` : 'Popular Live Openings'}</span>
            <span>Click to view details</span>
          </div>

          {filtered.length > 0 ? (
            filtered.map((job) => (
              <div
                key={job.id}
                onClick={() => {
                  onSelectJob(job);
                  onClose();
                }}
                className="p-3 rounded border border-line hover:border-teal-500 hover:bg-teal-50/50 transition cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-teal-600 bg-teal-100 font-bold px-1.5 py-0.5 rounded">
                      {job.id}
                    </span>
                    <span className="text-xs font-semibold text-ink-900 group-hover:text-teal-700 transition-colors">
                      {job.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate font-mono">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-teal-600" /> {job.companyName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-600" /> {job.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block font-mono text-xs font-bold text-teal-700">
                    {job.salary.split('(')[0]}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate font-mono text-xs">
              No matching job roles found for &quot;{query}&quot;. Try searching &quot;Banking&quot; or &quot;Credit&quot;.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-paper border-t border-line text-center text-[11px] font-mono text-muted">
          Press ESC to exit search
        </div>
      </div>
    </div>
  );
};
