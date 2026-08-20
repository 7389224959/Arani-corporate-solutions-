import React, { useState } from 'react';
import { RefreshCw, Zap, X, ChevronRight, ChevronLeft, Mic } from 'lucide-react';
import { ReelTemplate } from '../types';
import { generateClientReelScript, generateReelAudio, ANCHOR_VOICES } from '../services/geminiService';
import { pcmBase64ToWavUrl, pcmBase64ToWavDataUri } from '../src/utils/audioUtils';

export default function ClientReelWizard({ settings, onClose }: { settings: any, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [reelCategory, setReelCategory] = useState<string>('Hiring Reel');
  const [prompt, setPrompt] = useState<string>('');
  const [jobDetails, setJobDetails] = useState({ designation: '', location: '', salary: '', experience: '' });
  
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [scriptData, setScriptData] = useState<any>({ fullScript: '', headline: '', ticker: '', voiceoverScript: '' });
  const [selectedVoice, setSelectedVoice] = useState<string>('Puck');
  
  const [audioUrl, setAudioUrl] = useState('');
  const [audioDataUri, setAudioDataUri] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');

  const REEL_CATEGORIES = ['Hiring Reel', 'Promotion Reel', 'Educational Reel', 'Testimonial', 'Service Showcase'];

  const templates: ReelTemplate[] = settings?.clientReelTemplates || settings?.reelTemplates || [];
  const filteredTemplates = templates;

  const getBoxStyle = (boxName: string, defaultStyle: React.CSSProperties): React.CSSProperties => {
    const t = filteredTemplates.find(t=>t.id===selectedTemplateId);
    if (!t || !t.coordinates) {
      return defaultStyle;
    }
    const coordStr = (t.coordinates as any)?.[boxName];
    if (!coordStr || coordStr === 'hidden') {
      return defaultStyle;
    }
    const [x, y, w, h] = coordStr.split(',').map(Number);
    return {
      position: 'absolute',
      left: `${(x / 1080) * 100}%`,
      top: `${(y / 1920) * 100}%`,
      width: `${(w / 1080) * 100}%`,
      height: `${(h / 1920) * 100}%`,
      zIndex: 20,
      overflow: 'hidden'
    };
  };

  const handleGenerateScript = async () => {
    const template = templates.find(t => t.id === selectedTemplateId);
    
    setIsGenerating(true);
    setStatus('Generating AI reel script...');
    try {
      // Build specific prompt for hiring
      let finalPrompt = prompt;
      let prefilledHeadline = '';
      if (reelCategory === 'Hiring Reel' && jobDetails.designation) {
        finalPrompt = `Generate a hiring reel for ${jobDetails.designation} located in ${jobDetails.location} with salary ${jobDetails.salary} and experience required ${jobDetails.experience}. ${prompt}`;
        prefilledHeadline = `{\n  "Role": "${jobDetails.designation}",\n  "Loc": "${jobDetails.location}",\n  "Pay": "${jobDetails.salary}",\n  "Exp": "${jobDetails.experience}"\n}`;
      }

      const clientContext = {
        business_name: settings?.companyName || 'Arani Corporate Solutions',
        category: 'Corporate Staffing & Banking Recruitment',
        services: 'Executive Search, Bulk Hiring, Branch Operations Recruitment',
        offer: '72-Hour Candidate Shortlist SLA',
        owner_name: 'Arani Corporate Solutions'
      };

      const data = await generateClientReelScript(clientContext, reelCategory, finalPrompt, template);
      
      if (prefilledHeadline) {
        data.headline = prefilledHeadline;
      }
      
      setScriptData(data);
      setStep(3);

    } catch (e: any) {
      alert("Error generating script: " + e.message);
    } finally {
      setIsGenerating(false);
      setStatus('');
    }
  };

  const handleGenerateAudio = async () => {
    setIsGenerating(true);
    setStatus('Generating voiceover...');
    try {
      const b64 = await generateReelAudio(scriptData.voiceoverScript, selectedVoice);
      setAudioUrl(pcmBase64ToWavUrl(b64));
      setAudioDataUri(pcmBase64ToWavDataUri(b64));
      setStep(4);
    } catch (e: any) {
      alert("Error generating audio: " + e.message);
    } finally {
      setIsGenerating(false);
      setStatus('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col w-full max-h-[90vh] lg:max-h-[80vh] border border-gray-100 overflow-y-auto">
      <div className="bg-gradient-to-r from-teal-700 to-ink-900 p-4 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-300" />
          <h2 className="text-lg font-bold font-display">AI Marketing Reel Wizard</h2>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Panel: Steps & Controls */}
        <div className="w-full lg:w-1/2 p-4 lg:p-6 lg:border-r border-gray-200">
          
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-ink-900">1. Reel Context & Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reel Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {REEL_CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setReelCategory(cat)}
                      className={`p-2.5 border rounded-lg text-sm font-medium transition-all ${reelCategory === cat ? 'bg-teal-600 text-white border-teal-600 shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {reelCategory === 'Hiring Reel' ? (
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-700 text-sm">Job Details (Formatted for Reel Layout)</h4>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Designation / Role</label>
                    <input 
                      value={jobDetails.designation}
                      onChange={e => setJobDetails({...jobDetails, designation: e.target.value})}
                      placeholder="e.g. Senior Credit Analyst"
                      className="w-full border rounded p-2 text-sm bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Location</label>
                      <input 
                        value={jobDetails.location}
                        onChange={e => setJobDetails({...jobDetails, location: e.target.value})}
                        placeholder="e.g. Mumbai, BKC"
                        className="w-full border rounded p-2 text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Salary Band</label>
                      <input 
                        value={jobDetails.salary}
                        onChange={e => setJobDetails({...jobDetails, salary: e.target.value})}
                        placeholder="e.g. ₹14L - ₹18L PA"
                        className="w-full border rounded p-2 text-sm bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Experience Required</label>
                    <input 
                      value={jobDetails.experience}
                      onChange={e => setJobDetails({...jobDetails, experience: e.target.value})}
                      placeholder="e.g. 3-5 Years (Banking / NBFC)"
                      className="w-full border rounded p-2 text-sm bg-white"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specific Prompt / Topic (Optional)</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., We are urgently hiring senior credit analysts for leading private banks..."
                    className="w-full border rounded-lg p-3 h-28 focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={() => setStep(2)}
                  className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 flex items-center shadow-xs transition"
                >
                  Next: Choose Template <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <button onClick={() => setStep(1)} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-5 h-5"/></button>
                <h3 className="text-xl font-semibold text-ink-900">2. Choose Template</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {filteredTemplates.map(t => (
                  <div 
                    key={t.id}
                    onClick={() => setSelectedTemplateId(t.id)}
                    className={`cursor-pointer border-2 rounded-xl overflow-hidden transition-all ${selectedTemplateId === t.id ? 'border-teal-600 shadow-md scale-[1.02]' : 'border-gray-200 hover:border-teal-300'}`}
                  >
                    <div className="aspect-[9/16] relative bg-black">
                       <img src={t.screenshotUrl || t.mediaUrl} className="w-full h-full object-cover opacity-80" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 text-white">
                         <span className="font-bold text-sm truncate">{t.name}</span>
                         <span className="text-xs text-teal-300 mb-1">{t.category}</span>
                         {t.hasVoiceover === false && (
                           <span className="text-[10px] bg-red-500/80 text-white px-2 py-0.5 rounded w-max">No Voiceover</span>
                         )}
                       </div>
                    </div>
                  </div>
                ))}
                {filteredTemplates.length === 0 && (
                  <div className="col-span-2 text-gray-500 text-center py-8 bg-gray-50 rounded-lg">No templates configured. Go to Reel Templates tab to add templates.</div>
                )}
              </div>

              <div className="pt-4 flex justify-between">
                <button onClick={() => setStep(1)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700">Back</button>
                <button 
                  onClick={handleGenerateScript}
                  disabled={!selectedTemplateId || isGenerating}
                  className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 flex items-center shadow-xs transition"
                >
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin mr-1.5" /> : 'Generate AI Script'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <button onClick={() => setStep(2)} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-5 h-5"/></button>
                <h3 className="text-xl font-semibold text-ink-900">3. Review AI Script</h3>
              </div>

              <div className="space-y-4">
                {scriptData.headline && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase">Headline Overlay</label>
                    <textarea 
                      value={scriptData.headline}
                      onChange={e => setScriptData({...scriptData, headline: e.target.value})}
                      className="w-full border-2 border-gray-200 py-2 px-2 focus:border-teal-500 outline-none font-bold text-sm font-mono h-32 rounded"
                    />
                  </div>
                )}
                
                {scriptData.ticker && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase">Scrolling Ticker</label>
                    <input 
                      value={scriptData.ticker}
                      onChange={e => setScriptData({...scriptData, ticker: e.target.value})}
                      className="w-full border-b-2 border-gray-200 py-2 focus:border-teal-500 outline-none font-mono text-sm bg-yellow-50 px-2"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Voiceover Script (SSML/Text)</label>
                  <textarea 
                    value={scriptData.voiceoverScript}
                    onChange={e => setScriptData({...scriptData, voiceoverScript: e.target.value})}
                    className="w-full border rounded-lg p-3 h-40 focus:ring-2 focus:ring-teal-500 text-sm leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Voice</label>
                  <div className="flex flex-wrap gap-2">
                    {ANCHOR_VOICES.map(v => (
                      <button 
                        key={v.id}
                        onClick={() => setSelectedVoice(v.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border ${selectedVoice === v.id ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        {v.name} ({v.gender})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button onClick={() => setStep(2)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700">Back</button>
                {filteredTemplates.find(t=>t.id===selectedTemplateId)?.hasVoiceover !== false ? (
                  <button 
                    onClick={handleGenerateAudio}
                    disabled={isGenerating || !scriptData.voiceoverScript}
                    className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 flex items-center shadow-xs transition"
                  >
                    {isGenerating ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                    Generate Audio
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setAudioUrl('');
                      setAudioDataUri('');
                      setStep(4);
                    }}
                    disabled={isGenerating}
                    className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 flex items-center shadow-xs transition"
                  >
                    Next: Final Output <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button onClick={() => setStep(3)} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-5 h-5"/></button>
                  <h3 className="text-xl font-semibold text-ink-900">4. Final Output</h3>
                </div>
              </div>

              {audioUrl ? (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-2">Voiceover Audio</h4>
                  <audio controls src={audioUrl} className="w-full mb-4" />
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-2">Voiceover</h4>
                  <p className="text-sm text-gray-500">Audio generation was disabled for this template.</p>
                </div>
              )}
              
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-sm border border-emerald-200">
                <p className="font-bold mb-1">Ready for Rendering</p>
                <p>The reel script {audioUrl ? 'and voiceover audio are' : 'is'} ready for video composition and rendering.</p>
              </div>

            </div>
          )}

        </div>

        {/* Right Panel: Preview */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-4 lg:p-6 flex flex-col items-center justify-start lg:justify-center border-t lg:border-t-0 lg:border-l border-gray-200 min-h-[400px]">
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] shrink-0 flex items-center justify-center ring-4 ring-gray-900">
            
            {/* Background Template */}
            {selectedTemplateId ? (
              filteredTemplates.find(t=>t.id===selectedTemplateId)?.mediaUrl ? (
                <video src={filteredTemplates.find(t=>t.id===selectedTemplateId)?.mediaUrl} poster={filteredTemplates.find(t=>t.id===selectedTemplateId)?.screenshotUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <img src={filteredTemplates.find(t=>t.id===selectedTemplateId)?.screenshotUrl} className="absolute inset-0 w-full h-full object-cover" />
              )
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 font-medium bg-gray-100 ring-inset ring-1 ring-gray-200">
                <svg className="w-12 h-12 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>Select a Template</span>
              </div>
            )}

            {/* Simulated Overlays */}
            {scriptData.headline && (
              scriptData.headline.trim().startsWith('{') ? (
                <div 
                  style={getBoxStyle('json_box', { top: '30%', left: '10%', width: '80%', position: 'absolute' })} 
                  className="bg-[#0B1626]/85 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] text-left z-20 border border-white/10 overflow-hidden flex flex-col"
                >
                  <div className="bg-[#16263F]/90 px-3 py-2 sm:px-4 sm:py-3 border-b border-white/10 flex items-center justify-between">
                    <span className="font-extrabold text-[11px] sm:text-sm text-white uppercase tracking-wider truncate mr-2">{jobDetails.designation || "ROLE DETAILS"}</span>
                    <span className="bg-[#159E8C] text-white text-[8px] sm:text-[10px] font-bold px-2 py-1 rounded-full tracking-widest uppercase shrink-0">Hiring</span>
                  </div>
                  
                  <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
                  {(() => {
                    try {
                      const jsonObj = JSON.parse(scriptData.headline);
                      return Object.entries(jsonObj).map(([k, v], i) => (
                        <div key={i} className="flex flex-row items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                          <span className="text-[#6FD0C2] text-[9px] sm:text-[11px] font-bold uppercase tracking-widest">{k}</span>
                          <span className="text-white text-[11px] sm:text-[13px] font-semibold text-right max-w-[60%] truncate">{String(v)}</span>
                        </div>
                      ));
                    } catch (e) {
                      return <pre className="text-white whitespace-pre-wrap text-[10px] font-mono">{scriptData.headline}</pre>;
                    }
                  })()}
                  </div>
                </div>
              ) : (
                <div style={getBoxStyle('headline_box', { top: '25%', left: 0, width: '100%', padding: '0 1.5rem', position: 'absolute', textAlign: 'center' })} className="z-20 flex items-center justify-center">
                  <pre className="text-lg sm:text-xl font-extrabold text-white drop-shadow-lg whitespace-pre-wrap text-center" style={{textShadow: '0 4px 8px rgba(0,0,0,0.8)'}}>{scriptData.headline}</pre>
                </div>
              )
            )}

            {scriptData.ticker && (
              <div style={getBoxStyle('ticker_box', { bottom: '4rem', left: 0, right: 0, position: 'absolute' })} className="bg-[#159E8C]/95 border-y border-white/20 text-white font-bold whitespace-nowrap py-1 px-4 text-[10px] sm:text-[11px] tracking-widest uppercase z-20 flex items-center overflow-hidden">
                <span className="truncate w-full">{scriptData.ticker}</span>
              </div>
            )}
            
            {step > 1 && (
              <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-xs font-semibold">
                {settings?.companyName || 'Arani Corporate Solutions'}
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
                 <RefreshCw className="w-12 h-12 text-teal-400 animate-spin mb-4" />
                 <span className="text-white font-medium px-6 text-center">{status}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Just defining Loader2 since we used it directly above
function Loader2(props: any) {
  return <RefreshCw {...props} />;
}
