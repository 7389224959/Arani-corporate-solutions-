'use client';

import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { Video, Type, Image as ImageIcon, Music, Play, Plus, Upload, Save, Trash2, Sliders, Layout, Sparkles, Loader2 } from 'lucide-react';
import { SAMPLE_JOBS } from '@/lib/sampleData';

// --- Types ---
type OverlayType = 'text' | 'visual' | 'ticker';

interface OverlayConfig {
  id: string;
  type: OverlayType;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface Asset {
  id: string;
  type: 'background' | 'music' | 'intro' | 'outro';
  name: string;
  url: string; 
}

interface Template {
  id: string;
  name: string;
  backgroundId: string | null;
  musicId: string | null;
  introId: string | null;
  outroId: string | null;
  overlays: OverlayConfig[];
}

interface GeneratedContent {
  headline: string;
  ticker: string;
  voiceoverScript: string;
  caption: string;
}

export function MarketingReelWizard() {
  const [activeTab, setActiveTab] = useState<'generator' | 'templates' | 'assets'>('generator');

  // Sample Assets
  const [assets, setAssets] = useState<Asset[]>([
    { id: 'a1', type: 'background', name: 'Corporate Office Pan', url: 'https://videos.pexels.com/video-files/3129671/3129671-sd_360_640_30fps.mp4' },
    { id: 'a2', type: 'music', name: 'Upbeat Tech Sync', url: '' },
    { id: 'a3', type: 'intro', name: 'Arani Logo Reveal', url: '' },
    { id: 'a4', type: 'outro', name: 'Contact CTA Loop', url: '' },
  ]);

  // Sample Templates
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 't1',
      name: 'Standard Job Posting Reel',
      backgroundId: 'a1',
      musicId: 'a2',
      introId: 'a3',
      outroId: 'a4',
      overlays: [
        { id: 'o1', type: 'text', label: 'Job Headline', x: 20, y: 50, width: 320, height: 80 },
        { id: 'o2', type: 'visual', label: 'Company/Job Image', x: 60, y: 150, width: 240, height: 240 },
        { id: 'o3', type: 'ticker', label: 'Salary/Location Ticker', x: 0, y: 580, width: 360, height: 40 },
      ]
    }
  ]);

  // Current Editing State
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(templates[0].id);

  // Generator State
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [overlayValues, setOverlayValues] = useState<Record<string, string>>({});
  const [statusMsg, setStatusMsg] = useState<string>('');
  
  const currentTemplate = templates.find(t => t.id === editingTemplateId);

  // File Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: Asset['type']) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAssets([...assets, { id: Date.now().toString(), type, name: file.name, url }]);
    }
  };

  const addOverlay = (type: OverlayType) => {
    if (!currentTemplate) return;
    const newOverlay: OverlayConfig = {
      id: Date.now().toString(),
      type,
      label: `New ${type}`,
      x: 50,
      y: 50,
      width: type === 'ticker' ? 360 : 150,
      height: type === 'ticker' ? 40 : 80,
    };
    const updated = { ...currentTemplate, overlays: [...currentTemplate.overlays, newOverlay] };
    setTemplates(templates.map(t => t.id === updated.id ? updated : t));
  };

  const updateOverlay = (id: string, updates: Partial<OverlayConfig>) => {
    if (!currentTemplate) return;
    const updatedOverlays = currentTemplate.overlays.map(o => o.id === id ? { ...o, ...updates } : o);
    const updated = { ...currentTemplate, overlays: updatedOverlays };
    setTemplates(templates.map(t => t.id === updated.id ? updated : t));
  };

  const removeOverlay = (id: string) => {
    if (!currentTemplate) return;
    const updatedOverlays = currentTemplate.overlays.filter(o => o.id !== id);
    const updated = { ...currentTemplate, overlays: updatedOverlays };
    setTemplates(templates.map(t => t.id === updated.id ? updated : t));
  };

  // --- AI GENERATION FLOW (Similar to News Repo but adapted for Jobs) ---
  const handleGenerateScript = async () => {
    if (!selectedJobId) return alert('Please select a job.');
    if (!currentTemplate) return alert('Please select a template.');

    const job = SAMPLE_JOBS.find(j => j.id === selectedJobId);
    if (!job) return;

    setIsGenerating(true);
    setStatusMsg('Drafting script & mapping elements...');
    setGeneratedContent(null);

    const prompt = `
# ROLE AND PERSONA
You are an elite Corporate Recruiter and Social Media Marketing Strategist. Your goal is to transform a raw job posting into a 25-40 second video reel script that hooks top-tier candidates, builds urgency, and drives applications.

# DURATION & PACING (STRICT 25-40 SECONDS)
Target Duration MUST BE STRICTLY BETWEEN 25 AND 40 SECONDS (~50 to 80 words spoken). Do not force stretch.

# SCRIPT STRUCTURE & PACING
[0:00 - 0:05] THE SCROLL-STOPPER (The Hook) - Break the user's scrolling trance with a visual/verbal paradox or a highly relatable question. (e.g., "Are you stuck in a slow-moving bank? Stop scrolling.")
[0:05 - 0:15] THE CONTEXT & THE STAKES - Explain the role and why it's a massive opportunity today.
[0:15 - 0:30] THE CORE STORY / THE PERKS - Highlight salary, location, or unique benefits.
[0:30 - 0:40] THE CTA - Clear call to action to apply via Arani Corporate Solutions.

# INPUT (RAW JOB DATA):
Title: ${job.title}
Sector: ${job.category}
Location: ${job.location}
Salary: ${job.salary}
Requirements: ${job.requirements.join(', ')}

# OUTPUT REQUIREMENTS:
Return EXACTLY VALID MAPPED JSON (No markdown formatting, no comments).
{
  "headline": "Short, punchy text for the main video text overlay (max 5-7 words, e.g. 'Hiring: Top Tier Credit Analyst!')",
  "ticker": "Scrolling ticker text summarizing key facts (e.g. '📍 ${job.location} | 💰 ${job.salary} | Apply via Arani')",
  "voiceoverScript": "The full spoken voiceover script in English.",
  "caption": "An engaging Instagram/Facebook caption with 2-3 emojis and relevant hashtags."
}
    `;

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      
      // Clean json blocks if any
      let rawText = data.text;
      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed: GeneratedContent = JSON.parse(rawText);

      setGeneratedContent(parsed);
      
      // Auto-map to overlays based on type/label heuristics
      const newOverlayValues: Record<string, string> = {};
      currentTemplate.overlays.forEach(o => {
        if (o.type === 'ticker') newOverlayValues[o.id] = parsed.ticker;
        else if (o.type === 'text' && o.label.toLowerCase().includes('headline')) newOverlayValues[o.id] = parsed.headline;
        else if (o.type === 'text') newOverlayValues[o.id] = parsed.headline;
      });
      setOverlayValues(newOverlayValues);

      setStatusMsg('Ready for FFmpeg Render!');
    } catch (err) {
      console.error(err);
      alert('Failed to generate script. Check console.');
      setStatusMsg('');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-surface border border-line rounded-lg shadow-sm overflow-hidden flex flex-col h-[800px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line bg-ink-950 text-surface">
        <div>
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <Video className="w-5 h-5 text-teal-400" />
            AI Auto Marketing Reel Wizard
          </h2>
          <p className="text-xs text-slate-300 font-mono mt-1">Generate dynamic job alerts using AI scripts and FFmpeg templating.</p>
        </div>
        <div className="flex bg-ink-900 border border-ink-800 rounded p-1 font-mono text-xs font-bold">
          <button onClick={() => setActiveTab('generator')} className={`px-4 py-1.5 rounded transition ${activeTab === 'generator' ? 'bg-teal-500 text-surface' : 'text-slate-400 hover:text-surface'}`}>
            Generator
          </button>
          <button onClick={() => setActiveTab('templates')} className={`px-4 py-1.5 rounded transition ${activeTab === 'templates' ? 'bg-teal-500 text-surface' : 'text-slate-400 hover:text-surface'}`}>
            Templates
          </button>
          <button onClick={() => setActiveTab('assets')} className={`px-4 py-1.5 rounded transition ${activeTab === 'assets' ? 'bg-teal-500 text-surface' : 'text-slate-400 hover:text-surface'}`}>
            Assets
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-paper flex">
        
        {/* ASSETS TAB */}
        {activeTab === 'assets' && (
          <div className="p-6 w-full space-y-6">
            <h3 className="font-display font-bold text-ink-900">Media Asset Library</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(['background', 'music', 'intro', 'outro'] as const).map(type => (
                <div key={type} className="bg-surface border border-line rounded-lg p-4 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="font-mono text-xs uppercase font-bold text-teal-700">{type}s</span>
                    <label className="cursor-pointer bg-ink-900 hover:bg-ink-800 text-surface px-2 py-1 rounded text-[10px] flex items-center gap-1 transition">
                      <Upload className="w-3 h-3" /> Add
                      <input type="file" accept={type === 'music' ? 'audio/*' : 'video/*,image/*'} className="hidden" onChange={(e) => handleFileUpload(e, type)} />
                    </label>
                  </div>
                  <div className="space-y-2 h-48 overflow-y-auto pr-1">
                    {assets.filter(a => a.type === type).map(asset => (
                      <div key={asset.id} className="flex items-center justify-between bg-paper border border-line p-2 rounded">
                        <span className="text-xs truncate font-mono text-ink-800">{asset.name}</span>
                        <button onClick={() => setAssets(assets.filter(a => a.id !== asset.id))} className="text-danger hover:text-danger/80">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {assets.filter(a => a.type === type).length === 0 && (
                      <p className="text-[10px] text-slate-400 font-mono">No {type}s uploaded.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <div className="flex w-full h-full">
            {/* Template List Sidebar */}
            <div className="w-64 border-r border-line bg-surface p-4 flex flex-col gap-4">
              <button 
                onClick={() => {
                  const newT: Template = { id: Date.now().toString(), name: 'New Template', backgroundId: null, musicId: null, introId: null, outroId: null, overlays: [] };
                  setTemplates([...templates, newT]);
                  setEditingTemplateId(newT.id);
                }}
                className="w-full bg-teal-600 hover:bg-teal-500 text-surface font-bold uppercase font-mono text-[10px] py-2 rounded flex items-center justify-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> New Template
              </button>
              <div className="space-y-2 flex-1 overflow-y-auto">
                {templates.map(t => (
                  <div 
                    key={t.id} 
                    onClick={() => setEditingTemplateId(t.id)}
                    className={`p-3 border rounded cursor-pointer transition ${editingTemplateId === t.id ? 'border-teal-500 bg-teal-50 shadow-sm' : 'border-line hover:border-slate-300'}`}
                  >
                    <div className="text-xs font-bold text-ink-900 truncate">{t.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{t.overlays.length} Overlays</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Editor */}
            {currentTemplate ? (
              <div className="flex-1 flex bg-slate-100 relative">
                {/* Canvas Area (9:16 aspect ratio representation) */}
                <div className="flex-1 p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="w-[360px] h-[640px] bg-ink-900 rounded-xl border-[8px] border-ink-950 shadow-2xl relative overflow-hidden">
                    {/* Background Preview */}
                    {currentTemplate.backgroundId && assets.find(a => a.id === currentTemplate.backgroundId)?.url ? (
                      <video src={assets.find(a => a.id === currentTemplate.backgroundId)?.url} className="absolute inset-0 w-full h-full object-cover opacity-50" loop muted autoPlay playsInline />
                    ) : (
                      <div className="absolute inset-0 bg-ink-800 flex items-center justify-center">
                        <span className="text-slate-500 font-mono text-xs">No Background</span>
                      </div>
                    )}
                    
                    {/* Overlays */}
                    {currentTemplate.overlays.map(overlay => (
                      <Rnd
                        key={overlay.id}
                        bounds="parent"
                        size={{ width: overlay.width, height: overlay.height }}
                        position={{ x: overlay.x, y: overlay.y }}
                        onDragStop={(e, d) => updateOverlay(overlay.id, { x: d.x, y: d.y })}
                        onResizeStop={(e, direction, ref, delta, position) => {
                          updateOverlay(overlay.id, {
                            width: parseInt(ref.style.width, 10),
                            height: parseInt(ref.style.height, 10),
                            ...position
                          });
                        }}
                        className={`border-2 ${
                          overlay.type === 'text' ? 'border-teal-400 bg-teal-500/20 text-teal-100' :
                          overlay.type === 'visual' ? 'border-amber-400 bg-amber-500/20 text-amber-100' :
                          'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                        } flex items-center justify-center flex-col cursor-move select-none overflow-hidden group`}
                      >
                        {overlay.type === 'text' && <Type className="w-6 h-6 mb-1 opacity-70" />}
                        {overlay.type === 'visual' && <ImageIcon className="w-6 h-6 mb-1 opacity-70" />}
                        {overlay.type === 'ticker' && <Layout className="w-6 h-6 mb-1 opacity-70" />}
                        <span className="font-mono text-[10px] uppercase font-bold text-center px-1 truncate w-full">{overlay.label}</span>
                        {/* Remove overlay button inside Rnd */}
                        <button 
                          onClick={() => removeOverlay(overlay.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-white bg-danger rounded p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Rnd>
                    ))}
                  </div>
                </div>

                {/* Template Settings Sidebar */}
                <div className="w-80 bg-surface border-l border-line p-5 overflow-y-auto">
                  <h3 className="font-display font-bold text-sm mb-4 border-b border-line pb-2">Template Settings</h3>
                  <div className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="block text-slate-500 uppercase font-bold mb-1 text-[10px]">Template Name</label>
                      <input 
                        type="text" 
                        value={currentTemplate.name} 
                        onChange={e => setTemplates(templates.map(t => t.id === currentTemplate.id ? { ...t, name: e.target.value } : t))}
                        className="w-full border border-line bg-paper rounded px-2 py-1.5 outline-none focus:border-teal-500" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-slate-500 uppercase font-bold mb-1 text-[10px]">Associated Assets</label>
                      {(['background', 'music', 'intro', 'outro'] as const).map(type => (
                        <div key={type} className="flex flex-col gap-1">
                          <span className="text-[10px] text-ink-900 capitalize">{type}</span>
                          <select 
                            value={currentTemplate[`${type}Id`] || ''}
                            onChange={e => setTemplates(templates.map(t => t.id === currentTemplate.id ? { ...t, [`${type}Id`]: e.target.value || null } : t))}
                            className="w-full border border-line bg-paper rounded px-2 py-1.5 outline-none"
                          >
                            <option value="">-- Select {type} --</option>
                            {assets.filter(a => a.type === type).map(a => (
                              <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-line">
                      <label className="block text-slate-500 uppercase font-bold mb-2 text-[10px]">Add Overlays</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => addOverlay('text')} className="bg-ink-900 text-surface p-2 rounded hover:bg-ink-800 transition flex flex-col items-center gap-1">
                          <Type className="w-4 h-4 text-teal-400" />
                          <span className="text-[10px]">Text Box</span>
                        </button>
                        <button onClick={() => addOverlay('visual')} className="bg-ink-900 text-surface p-2 rounded hover:bg-ink-800 transition flex flex-col items-center gap-1">
                          <ImageIcon className="w-4 h-4 text-amber-400" />
                          <span className="text-[10px]">Visual</span>
                        </button>
                        <button onClick={() => addOverlay('ticker')} className="col-span-2 bg-ink-900 text-surface p-2 rounded hover:bg-ink-800 transition flex flex-col items-center gap-1">
                          <Layout className="w-4 h-4 text-emerald-400" />
                          <span className="text-[10px]">Ticker Tape</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <Sliders className="w-12 h-12 mb-2 opacity-20" />
                <p className="font-mono text-sm">Select or create a template to edit.</p>
              </div>
            )}
          </div>
        )}

        {/* GENERATOR TAB */}
        {activeTab === 'generator' && (
          <div className="flex w-full h-full">
            <div className="w-1/2 p-8 overflow-y-auto bg-surface border-r border-line">
              <h3 className="font-display font-bold text-xl text-ink-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-500" />
                AI Reel Generator
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-2">1. Select Job Posting</label>
                  <select 
                    value={selectedJobId} 
                    onChange={e => setSelectedJobId(e.target.value)}
                    className="w-full p-2.5 bg-paper border border-line rounded text-sm outline-none focus:border-teal-500"
                  >
                    <option value="" disabled>Select a live job...</option>
                    {SAMPLE_JOBS.map(job => <option key={job.id} value={job.id}>{job.title} ({job.location})</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-2">2. Select Template</label>
                  <select 
                    value={editingTemplateId || ''} 
                    onChange={e => setEditingTemplateId(e.target.value)}
                    className="w-full p-2.5 bg-paper border border-line rounded text-sm outline-none focus:border-teal-500"
                  >
                    <option value="" disabled>Choose a template...</option>
                    {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>

                <button 
                  disabled={!selectedJobId || !currentTemplate || isGenerating}
                  onClick={handleGenerateScript}
                  className={`w-full py-3 rounded font-mono font-bold uppercase transition flex items-center justify-center gap-2 ${selectedJobId && currentTemplate && !isGenerating ? 'bg-teal-600 hover:bg-teal-500 text-surface shadow-md' : 'bg-line text-slate-400 cursor-not-allowed'}`}
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} 
                  {isGenerating ? 'Drafting Script & Aligning AI...' : '3. Generate AI Script'}
                </button>

                {statusMsg && (
                  <div className="text-xs font-mono text-teal-600 font-bold bg-teal-50 p-2 rounded text-center">
                    {statusMsg}
                  </div>
                )}

                {currentTemplate && generatedContent && (
                  <div className="space-y-4 pt-4 border-t border-line">
                    <h4 className="text-xs font-mono font-bold uppercase text-ink-900">4. Review Overlay Content</h4>
                    {currentTemplate.overlays.map(overlay => (
                      <div key={overlay.id}>
                        <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">{overlay.label} ({overlay.type})</label>
                        {overlay.type === 'visual' ? (
                          <div className="flex items-center gap-2">
                            <input type="file" accept="image/*" className="text-xs" />
                          </div>
                        ) : (
                          <textarea 
                            rows={overlay.type === 'ticker' ? 1 : 2}
                            value={overlayValues[overlay.id] || ''}
                            onChange={(e) => setOverlayValues({...overlayValues, [overlay.id]: e.target.value})}
                            className="w-full p-2 bg-paper border border-line rounded text-xs outline-none focus:border-teal-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {generatedContent && (
                  <button 
                    onClick={() => {
                      alert('Mocking FFmpeg Rendering Process...\n\nIn a real implementation, this would trigger a background task (e.g. Supabase Edge Function or local API) that uses @ffmpeg/ffmpeg to stitch the background, music, and AI-generated overlays at their exact coordinates into a final 9:16 MP4.');
                    }}
                    className="w-full py-3 rounded font-mono font-bold uppercase transition flex items-center justify-center gap-2 bg-ink-900 hover:bg-ink-800 text-surface shadow-md"
                  >
                    <Play className="w-4 h-4" /> Start FFmpeg Render
                  </button>
                )}
              </div>
            </div>
            
            <div className="w-1/2 p-8 bg-ink-950 text-surface flex flex-col justify-start">
               {generatedContent ? (
                 <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
                   <div className="text-center mb-6 border-b border-ink-800 pb-4">
                     <Video className="w-12 h-12 text-teal-500 mx-auto mb-2" />
                     <h4 className="font-display font-bold text-lg">AI Generated Script</h4>
                     <p className="text-[10px] text-slate-400 font-mono">Ready for TTS & FFmpeg</p>
                   </div>
                   
                   <div>
                     <span className="text-[10px] font-mono font-bold uppercase text-teal-400">Voiceover Script (25-40s)</span>
                     <p className="mt-1 text-sm bg-ink-900 p-3 rounded border border-ink-800">{generatedContent.voiceoverScript}</p>
                   </div>
                   
                   <div>
                     <span className="text-[10px] font-mono font-bold uppercase text-teal-400">Social Caption</span>
                     <p className="mt-1 text-xs text-slate-300 bg-ink-900 p-3 rounded border border-ink-800 whitespace-pre-wrap">{generatedContent.caption}</p>
                   </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center">
                   <Video className="w-16 h-16 text-ink-800 mb-4" />
                   <h4 className="font-display font-bold text-lg">FFmpeg Render Pipeline</h4>
                   <p className="text-xs text-slate-400 font-mono mt-2 max-w-sm">
                     Select a job and generate the script. The AI will output hooks, captions, and text overlays, preparing them to be composited with FFmpeg into a final MP4.
                   </p>
                 </div>
               )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Temporary X icon component
const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);
