'use client';

import React, { useState } from 'react';
import { X, ArrowLeft, Phone, Mail, User, Briefcase, Calendar, CheckCircle2, Sparkles, GraduationCap, Clock } from 'lucide-react';

interface CounsellingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CounsellingModal: React.FC<CounsellingModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sector, setSector] = useState('Banking & Financial Services');
  const [experience, setExperience] = useState('Fresher / Graduate');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    // Save lead to localStorage
    try {
      const existingStr = localStorage.getItem('arani_counselling_leads') || '[]';
      const existing = JSON.parse(existingStr);
      const newLead = {
        id: `CNS-${Date.now().toString().slice(-4)}`,
        fullName,
        phone,
        email,
        sector,
        experience,
        preferredTime,
        bookedAt: new Date().toLocaleString(),
        status: 'Pending Callback'
      };
      localStorage.setItem('arani_counselling_leads', JSON.stringify([newLead, ...existing]));
    } catch (err) {
      console.warn('Failed to save counselling lead:', err);
    }

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 backdrop-blur-xs p-3 sm:p-4 animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-surface border border-line rounded-xl shadow-card my-auto max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-ink-900 text-surface p-5 sm:p-6 text-center relative shrink-0">
          <button
            onClick={handleResetAndClose}
            className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 p-1.5 sm:p-2 rounded bg-ink-800 text-slate hover:text-surface transition flex items-center gap-1 text-xs font-bold"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="inline">Back</span>
          </button>
          <button
            onClick={handleResetAndClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded bg-ink-800 text-slate hover:text-surface transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mt-8 sm:mt-2">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-teal-400 font-bold block mb-1">
              {"// 1-ON-1 EXPERT CAREER GUIDANCE"}
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold">Get Free Job Counselling</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
              Speak with senior banking &amp; corporate hiring advisors. Get customized career guidance &amp; job interview support.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-teal-700 font-bold bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  BOOKING CONFIRMED
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-950 mt-2">
                  Free Counselling Booked!
                </h3>
              </div>

              <div className="bg-teal-50/80 border border-teal-200 rounded-lg p-4 text-left space-y-2">
                <p className="text-sm font-semibold text-teal-950 flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span>
                    Your free counselling has been booked successfully. You will be called within 24 hours by one of our expert counsellors.
                  </span>
                </p>
              </div>

              <div className="bg-paper border border-line rounded-lg p-4 text-left text-xs space-y-2">
                <div className="font-bold text-ink-900 border-b border-line pb-1 text-[11px] uppercase tracking-wider">
                  Summary of your callback request:
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div><strong className="text-ink-900">Name:</strong> {fullName}</div>
                  <div><strong className="text-ink-900">Phone:</strong> {phone}</div>
                  <div className="col-span-2"><strong className="text-ink-900">Email:</strong> {email}</div>
                  <div className="col-span-2"><strong className="text-ink-900">Preferred Sector:</strong> {sector}</div>
                  <div className="col-span-2"><strong className="text-ink-900">Callback Slot:</strong> {preferredTime}</div>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-surface font-extrabold text-sm rounded-lg transition shadow-md"
              >
                Done &amp; Return to Homepage
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-ink-900 mb-1">
                  Full Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2.5 bg-paper border border-line rounded-lg text-xs font-medium text-ink-950 focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              {/* Mobile Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1">
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="w-full pl-9 pr-3 py-2.5 bg-paper border border-line rounded-lg text-xs font-medium text-ink-950 focus:outline-none focus:border-teal-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1">
                    Email ID <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-paper border border-line rounded-lg text-xs font-medium text-ink-950 focus:outline-none focus:border-teal-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Sector */}
              <div>
                <label className="block text-xs font-bold text-ink-900 mb-1">
                  Interested Job Sector / Industry
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-paper border border-line rounded-lg text-xs font-medium text-ink-950 focus:outline-none focus:border-teal-500 transition appearance-none"
                  >
                    <option value="Banking & Financial Services">Banking &amp; Financial Services</option>
                    <option value="Corporate HR & Administration">Corporate HR &amp; Administration</option>
                    <option value="Accounting & Finance">Accounting &amp; Finance</option>
                    <option value="IT & Technical Support">IT &amp; Technical Support</option>
                    <option value="Operations & Back Office">Operations &amp; Back Office</option>
                    <option value="Sales & Relationship Management">Sales &amp; Relationship Management</option>
                  </select>
                </div>
              </div>

              {/* Qualification & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1">
                    Current Qualification
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-paper border border-line rounded-lg text-xs font-medium text-ink-950 focus:outline-none focus:border-teal-500 transition appearance-none"
                    >
                      <option value="Fresher / Graduate">Fresher / Graduate</option>
                      <option value="Post Graduate (MBA / M.Com)">Post Graduate (MBA / M.Com)</option>
                      <option value="Working Professional (1-3 Yrs)">Working Professional (1-3 Yrs)</option>
                      <option value="Experienced Professional (3+ Yrs)">Experienced Professional (3+ Yrs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1">
                    Preferred Callback Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-paper border border-line rounded-lg text-xs font-medium text-ink-950 focus:outline-none focus:border-teal-500 transition appearance-none"
                    >
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                      <option value="Any Time">Any Time</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Trust Callout */}
              <div className="bg-teal-50/60 border border-teal-200/60 rounded-lg p-2.5 text-[11px] text-teal-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                <span>100% Free Service for Candidates. No hidden charges or placement fees.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-surface font-extrabold text-sm rounded-lg transition shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Book a Call Back</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
