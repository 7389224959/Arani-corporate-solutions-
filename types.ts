export interface ReelTemplate {
  id: string;
  name: string;
  category: string;
  description?: string;
  preview_url?: string;
  duration?: number;
  hasVoiceover?: boolean;
  base_video_url?: string;
  music_url?: string;
  font_family?: string;
  font_color?: string;
  bg_color?: string;
  accent_color?: string;
  safe_limits?: {
    headline_words: number;
    subtitle_lines: number;
    ticker_characters: number;
  };
  coordinates?: {
    video_box?: string;
    headline_box?: string;
    subtitle_box?: string;
    ticker_box?: string;
    logo_box?: string;
    json_box?: string;
  };
  created_at?: string;
  mediaUrl?: string;
  screenshotUrl?: string;
  isActive?: boolean;
  isIntroCombined?: boolean;
  introDuration?: number;
  createdAt?: string;
  introMediaUrl?: string;
  outroMediaUrl?: string;
  bgmUrl?: string;
  fonts?: {
    headline?: string;
    subtitle?: string;
  };
  style_rules?: {
    theme?: string;
    ticker_speed?: number;
    text_shadow?: boolean;
  };
}

export interface Client {
  id: string;
  business_name: string;
  category: string;
  services: string;
  offer?: string;
  owner_name?: string;
  logo_url?: string;
}

export interface SiteSettings {
  clientReelTemplates?: ReelTemplate[];
  reelTemplates?: ReelTemplate[];
}
