// Arohi MEET™ Data Models, Sample Data & Storage Helpers

export interface MeetingParticipant {
  id: string;
  name: string;
  role: string; // 'Chairperson' | 'Host' | 'Member' | 'Secretary' | 'Guest'
  avatar: string;
  isHost?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  isVideoOff?: boolean;
  initials?: string;
  badge?: string;
}

export interface TranscriptEntry {
  id: string;
  speakerId: string;
  speakerName: string;
  speakerRole?: string;
  avatar: string;
  timestamp: string;
  timeSeconds: number;
  text: string;
  translatedText?: string;
  language?: string;
  isHighlight?: boolean;
}

export interface DecisionItem {
  id: string;
  number: number;
  title: string;
  status: 'Approved' | 'Deferred' | 'Rejected' | 'In Review';
  proposedBy?: string;
  category?: string;
}

export interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  assigneeAvatar?: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
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

export const INITIAL_PARTICIPANTS: MeetingParticipant[] = [
  {
    id: 'junoon-nayak',
    name: 'Junoon Nayak',
    role: 'Chairperson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isHost: true,
    isSpeaking: true,
    isMuted: false,
    isVideoOff: false,
    initials: 'JN',
    badge: 'Chairperson'
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    isSpeaking: false,
    isMuted: true,
    isVideoOff: false,
    initials: 'PS',
    badge: 'Member'
  },
  {
    id: 'dr-s-mohanty',
    name: 'Dr. S. Mohanty',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isSpeaking: false,
    isMuted: false,
    isVideoOff: false,
    initials: 'DS',
    badge: 'Member'
  },
  {
    id: 'rakesh-verma',
    name: 'Rakesh Verma',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    isSpeaking: false,
    isMuted: true,
    isVideoOff: false,
    initials: 'RV',
    badge: 'Member'
  },
  {
    id: 'anita-das',
    name: 'Anita Das',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    isSpeaking: false,
    isMuted: true,
    isVideoOff: false,
    initials: 'AD',
    badge: 'Member'
  },
  {
    id: 's-khan',
    name: 'S. Khan',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    isSpeaking: false,
    isMuted: false,
    isVideoOff: false,
    initials: 'SK',
    badge: 'Member'
  }
];

export const INITIAL_OVERFLOW_PARTICIPANTS = [
  { name: 'Madhusmita', initials: 'M', bg: 'bg-blue-600' },
  { name: 'Rohit Patnaik', initials: 'R', bg: 'bg-purple-600' },
  { name: 'Alok Mishra', initials: 'A', bg: 'bg-emerald-600' },
  { name: 'Sunita Behera', initials: 'S', bg: 'bg-amber-600' },
  { name: 'Pradeep Jena', initials: 'P', bg: 'bg-rose-600' }
];

export const INITIAL_TRANSCRIPT: TranscriptEntry[] = [
  {
    id: 't-1',
    speakerId: 'junoon-nayak',
    speakerName: 'Junoon Nayak',
    speakerRole: 'Chairperson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    timestamp: '10:14 AM',
    timeSeconds: 840,
    text: "Let's start with the budget review for the next quarter.",
    translatedText: 'आइए अगली तिमाही के लिए बजट समीक्षा शुरू करते हैं।',
    isHighlight: false
  },
  {
    id: 't-2',
    speakerId: 'priya-sharma',
    speakerName: 'Priya Sharma',
    speakerRole: 'Member',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    timestamp: '10:16 AM',
    timeSeconds: 960,
    text: 'I suggest we allocate additional funds for the digital campaign, especially in Tier 2 and Tier 3 cities.',
    translatedText: 'मेरा सुझाव है कि हम विशेष रूप से टियर 2 और टियर 3 शहरों में डिजिटल अभियान के लिए अतिरिक्त फंड आवंटित करें।',
    isHighlight: true
  },
  {
    id: 't-3',
    speakerId: 'dr-s-mohanty',
    speakerName: 'Dr. S. Mohanty',
    speakerRole: 'Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    timestamp: '10:17 AM',
    timeSeconds: 1020,
    text: 'We should also consider the infrastructure upgrade for the production unit. It\'s critical for next quarter.',
    translatedText: 'हमें उत्पादन इकाई के लिए बुनियादी ढांचे के उन्नयन पर भी विचार करना चाहिए। यह अगली तिमाही के लिए महत्वपूर्ण है।',
    isHighlight: false
  },
  {
    id: 't-4',
    speakerId: 'rakesh-verma',
    speakerName: 'Rakesh Verma',
    speakerRole: 'Member',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    timestamp: '10:18 AM',
    timeSeconds: 1080,
    text: 'I agree. We can approve this with a phased approach and track the ROI monthly.',
    translatedText: 'मैं सहमत हूँ। हम इसे चरणबद्ध तरीके से मंजूरी दे सकते हैं और मासिक आरओआई को ट्रैक कर सकते हैं।',
    isHighlight: false
  },
  {
    id: 't-5',
    speakerId: 'anita-das',
    speakerName: 'Anita Das',
    speakerRole: 'Member',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    timestamp: '10:19 AM',
    timeSeconds: 1140,
    text: 'Action item: I will prepare the detailed proposal for digital campaign and share it by October 5.',
    translatedText: 'कार्रवाई मद: मैं डिजिटल अभियान के लिए विस्तृत प्रस्ताव तैयार करूंगी और इसे 5 अक्टूबर तक साझा करूंगी।',
    isHighlight: true
  },
  {
    id: 't-6',
    speakerId: 's-khan',
    speakerName: 'S. Khan',
    speakerRole: 'Member',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    timestamp: '10:20 AM',
    timeSeconds: 1200,
    text: "Let's also review the vendor options and share comparison before finalizing.",
    translatedText: 'अंतिम रूप देने से पहले आइए विक्रेता विकल्पों की भी समीक्षा करें और तुलना साझा करें।',
    isHighlight: false
  },
  {
    id: 't-7',
    speakerId: 'junoon-nayak',
    speakerName: 'Junoon Nayak',
    speakerRole: 'Chairperson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    timestamp: '10:21 AM',
    timeSeconds: 1260,
    text: 'Great. Arohi, please mark these action items and share the executive summary after the meeting.',
    translatedText: 'शानदार। आरोही, कृपया इन एक्शन आइटम्स को चिह्नित करें और बैठक के बाद कार्यकारी सारांश साझा करें।',
    isHighlight: true
  }
];

export const INITIAL_DECISIONS: DecisionItem[] = [
  {
    id: 'd-1',
    number: 1,
    title: 'Approval for ₹25 lakh allocation for digital campaign.',
    status: 'Approved',
    proposedBy: 'Priya Sharma',
    category: 'Budget'
  },
  {
    id: 'd-2',
    number: 2,
    title: 'Infrastructure upgrade to be done in phases (Phase 1 by Dec 2026).',
    status: 'Approved',
    proposedBy: 'Dr. S. Mohanty',
    category: 'Infrastructure'
  },
  {
    id: 'd-3',
    number: 3,
    title: 'New vendor evaluation committee to be formed (Rakesh, Anita, S. Khan).',
    status: 'Approved',
    proposedBy: 'S. Khan',
    category: 'Operations'
  },
  {
    id: 'd-4',
    number: 4,
    title: 'Next review meeting scheduled for 30 October 2026.',
    status: 'Approved',
    proposedBy: 'Junoon Nayak',
    category: 'Governance'
  }
];

export const INITIAL_ACTION_ITEMS: ActionItem[] = [
  {
    id: 'a-1',
    task: 'Prepare detailed proposal for digital campaign',
    assignee: 'Anita Das',
    dueDate: '5 Oct 2026',
    status: 'Pending'
  },
  {
    id: 'a-2',
    task: 'Review vendor options and share comparison',
    assignee: 'S. Khan',
    dueDate: '10 Oct 2026',
    status: 'Pending'
  },
  {
    id: 'a-3',
    task: 'Prepare infrastructure plan and capex budget',
    assignee: 'Rakesh Verma',
    dueDate: '20 Oct 2026',
    status: 'In Progress'
  },
  {
    id: 'a-4',
    task: 'Circulate meeting notes to all members',
    assignee: 'Secretariat',
    dueDate: '25 Sep 2026',
    status: 'Completed'
  }
];

export const DEMO_MEETING: MeetingSession = {
  id: 'demo-gbm-2026-09-23',
  code: 'ARM-883-912',
  title: 'General Body Meeting (Demo)',
  date: '23 September 2026',
  timeRange: '11:00 AM – 01:00 PM',
  durationFormatted: '1h 47m',
  durationSeconds: 6452,
  mode: 'video',
  location: 'Virtual Meeting',
  participantsCount: 30,
  organizer: 'Junoon Nayak',
  status: 'completed',
  executiveSummary:
    'The General Body Meeting discussed the quarterly budget, digital campaign proposal, infrastructure upgrade and vendor options. Key decisions were taken and action items assigned with clear timelines.',
  description: 'Quarterly review, new proposals and budget discussion across core committee members.',
  agenda: [
    'Project Updates & Status Review',
    'Quarterly Budget Review & Allocation',
    'Digital Campaign Proposal & Outlay',
    'Infrastructure Upgrade & Vendor Selection',
    'Open Discussion & Next Action Protocol'
  ],
  participants: INITIAL_PARTICIPANTS,
  transcript: INITIAL_TRANSCRIPT,
  decisions: INITIAL_DECISIONS,
  actionItems: INITIAL_ACTION_ITEMS,
  aiMinutesGeneratedTime: '28 seconds',
  accuracyScore: 98,
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

export function createRealMeetingSession(title: string = 'Executive Strategy Session', customAgenda?: string[]): MeetingSession {
  const code = `ARM-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return {
    id: `meet-${Date.now()}`,
    code,
    title,
    date: dateStr,
    timeRange: `${timeStr} – In Progress`,
    durationFormatted: '00:00',
    durationSeconds: 0,
    mode: 'video',
    location: 'Arohi Virtual Room',
    participantsCount: 1,
    organizer: 'You (Host)',
    status: 'live',
    executiveSummary: 'Meeting in progress. Real-time spoken dialogue and discussion points are actively being transcribed by Arohi AI.',
    description: 'Live real-time collaborative video meeting session.',
    agenda: customAgenda && customAgenda.length > 0 ? customAgenda : [
      'Welcome & Meeting Objective',
      'Discussion & Live Collaborative Notes',
      'Action Items & Decisions Recap'
    ],
    // Only the real user is in the meeting to begin with
    participants: [
      {
        id: 'user-self',
        name: 'You (Chairperson)',
        role: 'Chairperson',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        isHost: true,
        isSpeaking: false,
        isMuted: false,
        isVideoOff: false,
        initials: 'YOU',
        badge: 'Host'
      }
    ],
    // Clean empty slate for real speech-to-text
    transcript: [],
    // Empty decisions until extracted live from real spoken dialogue
    decisions: [],
    // Empty action items until extracted live from real spoken dialogue
    actionItems: [],
    aiMinutesGeneratedTime: 'Pending Meeting End',
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

export const DEFAULT_MEETING: MeetingSession = DEMO_MEETING;

const STORAGE_KEY = 'arohi_meet_sessions_v1';
const CURRENT_MEETING_KEY = 'arohi_meet_current_id';

export function getStoredMeetings(): MeetingSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_MEETING]));
      return [DEFAULT_MEETING];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [DEFAULT_MEETING];
  } catch {
    return [DEFAULT_MEETING];
  }
}

export function saveMeeting(meeting: MeetingSession): void {
  try {
    const meetings = getStoredMeetings();
    const idx = meetings.findIndex((m) => m.id === meeting.id);
    if (idx >= 0) {
      meetings[idx] = meeting;
    } else {
      meetings.unshift(meeting);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
    localStorage.setItem(CURRENT_MEETING_KEY, meeting.id);
  } catch (err) {
    console.error('Failed to save meeting session:', err);
  }
}

export function getCurrentMeeting(): MeetingSession {
  const meetings = getStoredMeetings();
  const currentId = localStorage.getItem(CURRENT_MEETING_KEY);
  if (currentId) {
    const found = meetings.find((m) => m.id === currentId);
    if (found) return found;
  }
  return meetings[0] || DEFAULT_MEETING;
}
