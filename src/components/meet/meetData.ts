// Arohi MEET™ Data Models, Real-Time Interfaces & Storage Helpers
// Global, Multi-User Production Configuration (No Hardcoded Demo Artifacts)

export interface MeetingParticipant {
  id: string;
  name: string;
  role: string; // 'Chairperson' | 'Host' | 'Speaker' | 'Member' | 'Secretary' | 'Guest'
  avatar?: string;
  avatarColor?: string;
  isHost?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  isVideoOff?: boolean;
  isHandRaised?: boolean;
  isScreenSharing?: boolean;
  initials?: string;
  badge?: string;
  stream?: MediaStream;
}

export interface TranscriptEntry {
  id: string;
  speakerId: string;
  speakerName: string;
  speakerRole?: string;
  avatar?: string;
  avatarColor?: string;
  timestamp: string;
  timeSeconds: number;
  text: string;
  translatedText?: string;
  language?: string;
  isHighlight?: boolean;
  isFinal?: boolean;
}

export interface DecisionItem {
  id: string;
  number: number;
  title: string;
  status: 'Approved' | 'Deferred' | 'Rejected' | 'In Review';
  proposedBy?: string;
  category?: string;
  timestamp?: string;
}

export interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  assigneeAvatar?: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority?: 'High' | 'Medium' | 'Low';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  role?: string;
  text: string;
  timestamp: string;
  isAnnouncement?: boolean;
}

export interface MeetingSession {
  id: string;
  code: string;
  title: string;
  date: string;
  timeRange: string;
  durationFormatted: string;
  durationSeconds: number;
  mode: 'video' | 'audio' | 'in-person';
  location: string;
  participantsCount: number;
  organizer: string;
  status: 'upcoming' | 'live' | 'completed';
  executiveSummary: string;
  description: string;
  agenda: string[];
  participants: MeetingParticipant[];
  transcript: TranscriptEntry[];
  decisions: DecisionItem[];
  actionItems: ActionItem[];
  chatMessages?: ChatMessage[];
  recordingUrl?: string;
  aiMinutesGeneratedTime?: string;
  accuracyScore: number;
  settings: {
    enableAiMinutes: boolean;
    allowRecording: boolean;
    liveTranscript: boolean;
    multiLanguage: boolean;
    autoActionItems: boolean;
    allowScreenSharing: boolean;
    language: string;
  };
}

// Google STUN Public Relay for WebRTC Mesh
export const DEFAULT_RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' }
  ]
};

// Generates an initials abbreviation e.g. "Junoon Nayak" -> "JN"
export function getInitials(name: string = 'User'): string {
  if (!name.trim()) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Generates a deterministic vibrant avatar color from name
export function getAvatarColor(name: string = ''): string {
  const colors = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#6366F1', // Indigo
    '#14B8A6'  // Teal
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// Format 9-digit standardized room codes: ARM-XXX-XXX
export function generateRoomCode(): string {
  const p1 = Math.floor(100 + Math.random() * 900);
  const p2 = Math.floor(100 + Math.random() * 900);
  return `ARM-${p1}-${p2}`;
}

// Clean session factory - Zero hardcoded demo artifacts
export function createRealMeetingSession(
  title: string = 'Executive Strategy Session',
  hostName: string = 'Host User',
  hostRole: string = 'Host',
  customAgenda?: string[]
): MeetingSession {
  const code = generateRoomCode();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const hostUser: MeetingParticipant = {
    id: `host-${Date.now()}`,
    name: hostName || 'You (Host)',
    role: hostRole || 'Host',
    avatarColor: getAvatarColor(hostName),
    isHost: true,
    isSpeaking: false,
    isMuted: false,
    isVideoOff: false,
    initials: getInitials(hostName),
    badge: 'Host'
  };

  return {
    id: `meet-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    code,
    title,
    date: dateStr,
    timeRange: `${timeStr} – Live`,
    durationFormatted: '00:00',
    durationSeconds: 0,
    mode: 'video',
    location: 'Arohi Virtual Room',
    participantsCount: 1,
    organizer: hostName,
    status: 'live',
    executiveSummary: 'Session initiated. Arohi AI is listening and actively transcribing spoken discussion in real-time.',
    description: 'Live real-time collaborative video meeting session.',
    agenda: customAgenda && customAgenda.length > 0 ? customAgenda : [
      'Welcome & Meeting Agenda',
      'Strategic Discussion & Updates',
      'Action Items & Decisions Summary'
    ],
    participants: [hostUser],
    transcript: [],
    decisions: [],
    actionItems: [],
    chatMessages: [],
    aiMinutesGeneratedTime: 'Live Session in Progress',
    accuracyScore: 99,
    settings: {
      enableAiMinutes: true,
      allowRecording: true,
      liveTranscript: true,
      multiLanguage: true,
      autoActionItems: true,
      allowScreenSharing: true,
      language: 'en'
    }
  };
}

const STORAGE_KEY = 'arohi_meet_sessions_v2';
const CURRENT_MEETING_KEY = 'arohi_meet_current_id_v2';

export function getStoredMeetings(): MeetingSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMeeting(meeting: MeetingSession): void {
  if (typeof window === 'undefined') return;
  try {
    const meetings = getStoredMeetings();
    const idx = meetings.findIndex((m) => m.id === meeting.id || m.code === meeting.code);
    if (idx >= 0) {
      meetings[idx] = meeting;
    } else {
      meetings.unshift(meeting);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings.slice(0, 30)));
    localStorage.setItem(CURRENT_MEETING_KEY, meeting.id);
  } catch (err) {
    console.error('Failed to save meeting session:', err);
  }
}

export function getCurrentMeeting(): MeetingSession {
  const meetings = getStoredMeetings();
  if (typeof window !== 'undefined') {
    const currentId = localStorage.getItem(CURRENT_MEETING_KEY);
    if (currentId) {
      const found = meetings.find((m) => m.id === currentId || m.code === currentId);
      if (found) return found;
    }
  }

  if (meetings.length > 0) {
    return meetings[0];
  }

  // Generate a clean fresh session
  return createRealMeetingSession('Live Strategy Session', 'You (Host)', 'Host');
}
