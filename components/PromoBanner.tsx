'use client';

import React, { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onActionClick?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onActionClick }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-ink-950 via-ink-900 to-teal-900 text-surface text-xs md:text-sm py-2.5 px-4 border-b border-teal-500/30 relative z-30 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-teal-500 text-ink-950 font-bold font-mono text-[10px] uppercase px-2 py-0.5 rounded shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            URGENT HIRING DRIVE
          </span>
          <p className="truncate text-slate-200">
            <strong className="text-surface font-semibold">Banking Hiring Season 2026:</strong> 200+ new branch operations & credit analyst openings across major hubs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onActionClick}
            className="font-mono text-xs font-bold text-teal-300 hover:text-surface flex items-center gap-1 underline underline-offset-4 decoration-teal-400 hover:decoration-surface transition"
          >
            <span>Explore Drive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded text-slate-300 hover:text-surface hover:bg-white/10 transition"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
