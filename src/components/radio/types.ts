// Arohi Radio - Core TypeScript Data Models
// "A new kind of radio — powered by AI."

export type RadioLanguage = 'en' | 'or' | 'hi' | 'bn';

export type ContentStatus = 'LIVE' | 'RECENT' | 'AI-GENERATED' | 'ARCHIVED';

export interface NewsStory {
  id: string;
  headline: string;
  summary: string;
  timestamp: string; // ISO or relative human string
  source: string; // e.g. "PTI", "PIB India", "Reuters", "Odisha F&ARD", "TechCrunch"
  sourceUrl?: string;
  type: ContentStatus;
  category: string;
  audioDurationSeconds?: number;
  tags?: string[];
  keyBulletPoints?: string[];
  // Translations for instant multilingual on-air switches
  translations?: {
    en?: { headline: string; summary: string };
    or?: { headline: string; summary: string };
    hi?: { headline: string; summary: string };
    bn?: { headline: string; summary: string };
  };
}

export interface Programme {
  id: string;
  timeSlot: string; // e.g. "06:00", "08:00", "12:00"
  title: string;
  host: string; // e.g. "RJ Arohi", "Arohi AI Editorial", "Guest Analyst"
  tagline: string;
  description: string;
  type: ContentStatus;
  durationMinutes: number;
  sourceAttribution: string;
  topics: string[];
  audioUrl?: string;
  stories: NewsStory[];
  ambientTrackId?: 'news_bulletin' | 'market_pulse' | 'stadium_roar' | 'odisha_flute' | 'youth_synth' | 'ambient_meditation' | 'global_frequencies';
}

export interface Channel {
  id: string;
  channelNumber: number; // 1 to 7
  name: string; // e.g. "AROHI NEWS 24×7"
  shortName: string; // "NEWS 24×7"
  frequency: string; // e.g. "91.2 FM"
  tagline: string;
  description: string;
  category: 'News' | 'Business' | 'Sports' | 'Regional' | 'Youth' | 'Music' | 'World';
  primaryLanguage: RadioLanguage | 'multilingual';
  accentColor: string; // Tailwind color class or hex
  glowGradient: string;
  live: boolean;
  listenerCount: number;
  currentProgramme: Programme;
  programmes: Programme[];
  curator: string;
  badges: string[];
  isOriginalArohiChannel: boolean;
}

export interface RadioStation {
  id: string;
  name: string;
  callsign: string;
  frequency: string;
  city: string;
  state?: string;
  country: string;
  countryCode: string;
  region: 'Odisha' | 'India' | 'Asia' | 'Europe' | 'Americas' | 'Global';
  latitude: number;
  longitude: number;
  language: string;
  genre: string;
  currentProgramme: string;
  streamStatus: 'LIVE' | 'BUFFERING' | 'OFFLINE';
  streamUrl: string;
  bitrate: string;
  isPublicLegalStream: boolean;
  attribution: string;
}

export interface TranscriptLine {
  id: string;
  timestamp: string;
  speaker: 'RJ Arohi' | 'Co-Host' | 'Correspondent' | 'User';
  text: string;
  textOdia?: string;
  textHindi?: string;
  textBengali?: string;
  storyId?: string;
}

export interface UserRadioProfile {
  name: string;
  preferredLanguage: RadioLanguage;
  favoriteChannelIds: string[];
  favoriteStationIds: string[];
  bookmarkedStoryIds: string[];
  history: Array<{
    channelId: string;
    programmeTitle: string;
    timestamp: number;
  }>;
  audioQuality: 'low_bandwidth' | 'standard' | 'studio_hd';
  autoResumePlayback: boolean;
}

export type RadioTab = 'home' | 'channels' | 'explore' | 'search' | 'library';

export interface AskArohiQuery {
  question: string;
  contextStory?: NewsStory;
  channelId?: string;
  language?: RadioLanguage;
}

export interface AskArohiResponse {
  answer: string;
  spokenAudioText: string;
  sourceAttribution?: string;
  suggestedFollowUps?: string[];
  languageUsed: RadioLanguage;
}
