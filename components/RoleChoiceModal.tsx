'use client';

import React from 'react';
import { X, UserCheck, Building2, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface RoleChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: 'candidate' | 'employer') => void;
}

export const RoleChoiceModal: React.FC<RoleChoiceModalProps> = ({ isOpen, onClose, onSelectRole }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-surface border border-line rounded-lg shadow-card overflow-hidden">
        
        {/* Header */}
        <div className="bg-ink-900 text-surface p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded bg-ink-800 text-slate hover:text-surface transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs uppercase tracking-widest text-teal-400 font-bold block mb-1">
            {"// JOIN ARANI CORPORATE SOLUTIONS"}
          </span>
          <h2 className="text-2xl font-display font-bold">Choose Your Account Path</h2>
          <p className="text-xs text-slate mt-1 max-w-sm mx-auto">
            Select how you wish to interact with our recruitment & HR platform.
          </p>
        </div>

        {/* Audience Choices */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Candidate Path */}
          <div
            onClick={() => onSelectRole('candidate')}
            className="group relative p-5 bg-paper hover:bg-teal-50/50 border-2 border-line hover:border-teal-500 rounded-lg cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold text-teal-600 bg-teal-100 px-2 py-0.5 rounded">
                For Job Seekers
              </span>
              <h3 className="font-display font-bold text-ink-900 text-lg mt-2 group-hover:text-teal-600 transition-colors">
                Candidate Portal
              </h3>
              <p className="text-xs text-slate mt-1 leading-relaxed">
                Land high-paying banking and corporate roles. 100% free with direct interview screening.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Free profile verification
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Apply in 1-click
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs font-bold text-teal-600">
              <span>Register Free</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Employer Path */}
          <div
            onClick={() => onSelectRole('employer')}
            className="group relative p-5 bg-paper hover:bg-ink-900/5 border-2 border-line hover:border-ink-800 rounded-lg cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-ink-800 text-surface flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold text-ink-800 bg-slate/10 px-2 py-0.5 rounded">
                For Employers & HR
              </span>
              <h3 className="font-display font-bold text-ink-900 text-lg mt-2 group-hover:text-ink-800 transition-colors">
                Employer Portal
              </h3>
              <p className="text-xs text-slate mt-1 leading-relaxed">
                Source, screen, and hire vetted talent in 72 hours. Success-fee based with 90-day guarantee.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ink-700" /> Vetted candidate shortlist
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ink-700" /> End-to-end payroll & verification
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs font-bold text-ink-800">
              <span>Post Requirement</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
