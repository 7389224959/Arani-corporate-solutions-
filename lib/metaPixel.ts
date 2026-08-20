// Meta Pixel & Conversions API Tracking Helper + UTM Manager for Aranii Corporate Solutions

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_url?: string;
  timestamp?: string;
}

const UTM_STORAGE_KEY = 'arani_utm_params';
const PIXEL_EVENTS_KEY = 'arani_pixel_events';

/**
 * Capture UTM parameters from URL search query and save into sessionStorage
 */
export function captureUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmContent = urlParams.get('utm_content');
    const utmTerm = urlParams.get('utm_term');
    const variant = urlParams.get('v');

    // If new UTM parameters exist in current URL, overwrite stored params
    if (utmSource || utmMedium || utmCampaign || variant) {
      const captured: UtmParams = {
        utm_source: utmSource || (variant ? `meta_ad_${variant}` : 'direct_web'),
        utm_medium: utmMedium || (variant ? 'cpc' : 'organic'),
        utm_campaign: utmCampaign || (variant ? `${variant}_hiring_campaign` : 'brand_awareness'),
        utm_content: utmContent || 'ad_creative_v1',
        utm_term: utmTerm || 'banking_jobs_consultancy',
        landing_url: window.location.href,
        timestamp: new Date().toISOString()
      };
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
      return captured;
    }

    // Fallback to existing saved params
    const saved = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Failed to parse UTM parameters:', err);
  }

  // Default organic fallback
  const defaultParams: UtmParams = {
    utm_source: 'organic',
    utm_medium: 'direct',
    utm_campaign: 'brand_direct',
    landing_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString()
  };
  return defaultParams;
}

/**
 * Get current saved UTM params for form submission payload
 */
export function getUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const saved = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // ignore
  }

  return captureUtmParams();
}

/**
 * Track standard & custom Meta Pixel events
 * Standard events: PageView, ViewContent, Lead, CompleteRegistration, SubmitApplication, RequestQuote
 */
export function trackPixelEvent(eventName: string, data: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  const utm = getUtmParams();
  const payload = {
    ...data,
    ...utm,
    event_time: new Date().toISOString()
  };

  // 1. Call Meta Pixel window.fbq if initialized
  if ((window as any).fbq) {
    try {
      (window as any).fbq('trackCustom', eventName, payload);
    } catch (e) {
      console.warn('Meta Pixel tracking error:', e);
    }
  }

  // 2. Persist to local event log for debug/audit in Admin panel
  try {
    const existingStr = localStorage.getItem(PIXEL_EVENTS_KEY) || '[]';
    const existing = JSON.parse(existingStr);
    const newLog = [{ eventName, payload, id: Date.now().toString() }, ...existing].slice(0, 50);
    localStorage.setItem(PIXEL_EVENTS_KEY, JSON.stringify(newLog));
  } catch (e) {
    // ignore
  }

  // Dev log
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Meta Pixel Event]: ${eventName}`, payload);
  }
}

/**
 * Retrieve recent tracked pixel events for testing / admin audit
 */
export function getPixelEventLogs() {
  if (typeof window === 'undefined') return [];
  try {
    const str = localStorage.getItem(PIXEL_EVENTS_KEY);
    return str ? JSON.parse(str) : [];
  } catch {
    return [];
  }
}
