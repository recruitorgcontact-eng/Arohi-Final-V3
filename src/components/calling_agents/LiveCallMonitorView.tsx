import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneOff,
  Radio,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Copy,
  Check,
  RefreshCw,
  Search,
  Filter,
  Activity,
  Maximize2,
  Minimize2,
  Smile,
  Meh,
  Frown,
  AlertTriangle,
  Clock,
  Send,
  Zap,
  ShieldCheck,
  X,
  Volume1,
  MessageSquare,
  Building,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';
import { CallLogItem } from '../business_os/BusinessVoiceAgentDashboard';

export interface LiveCallMonitorItem extends CallLogItem {
  speakingNow?: 'agent' | 'caller' | 'silence';
  sentimentScore?: number; // 0 to 100
  sentimentTrend?: 'improving' | 'stable' | 'declining';
  carrier?: string;
  detectedEmotion?: string;
  interruptionCount?: number;
  callQuality?: 'Excellent' | 'Good' | 'Fair';
  transcriptionStream?: Array<{
    id: string;
    speaker: 'agent' | 'caller';
    text: string;
    timestamp: string;
    sentiment?: 'positive' | 'neutral' | 'skeptical' | 'urgent' | 'negative';
    confidence?: number;
    intent?: string;
  }>;
}

interface LiveCallMonitorViewProps {
  onClose?: () => void;
  isModal?: boolean;
  onOpenDialer?: () => void;
  onOpenSimulator?: () => void;
}

// Built-in seed calls with vibrant active conversations across Indian languages
const SEED_ACTIVE_MONITOR_CALLS: LiveCallMonitorItem[] = [
  {
    id: 'CALL-MON-8910',
    direction: 'inbound',
    callType: 'inbound',
    customerName: 'Sanjay Deshmukh',
    customerNumber: '+91 98220 99411',
    callerPhone: '+91 98220 99411',
    companyName: 'Apex Green Energy',
    agentName: 'Priya Sharma (Delhi)',
    language: 'Hindi & Hinglish',
    status: 'connected',
    objective: 'Commercial Rooftop Solar Subsidy & Net Metering Ingestion',
    sentiment: 'positive',
    sentimentScore: 88,
    sentimentTrend: 'improving',
    speakingNow: 'agent',
    detectedEmotion: 'Optimistic & Eager',
    carrier: 'Exotel BSIP (Airtel Enterprise)',
    callQuality: 'Excellent',
    interruptionCount: 0,
    startTime: new Date(Date.now() - 74000).toISOString(),
    durationSeconds: 74,
    summary: 'Customer inquiring regarding PM Surya Ghar scheme subsidy split for commercial 25kW rooftop unit.',
    transcriptionStream: [
      {
        id: 't-1',
        speaker: 'agent',
        text: 'Namaste Sanjay ji! Main Priya baat kar rahi hoon Arohi Clean Energy Desk se. Batayein main aaj aapki kya sahayata kar sakti hoon?',
        timestamp: '11:42:05 AM',
        sentiment: 'positive',
        confidence: 0.98,
        intent: 'GREETING'
      },
      {
        id: 't-2',
        speaker: 'caller',
        text: 'Namaste Priya. Maine hamare Pune manufacturing plant ke liye solar estimation mangwaya tha. Mujhe net-metering aur DISCOM subsidy procedure janna hai.',
        timestamp: '11:42:18 AM',
        sentiment: 'neutral',
        confidence: 0.95,
        intent: 'INQUIRY_SUBSIDY'
      },
      {
        id: 't-3',
        speaker: 'agent',
        text: 'Bilkul Sanjay ji! Aapke 25 kilowatt plant par MSEDCL ki single-window net-metering portal par hum 3 dino mein application log kar denge.',
        timestamp: '11:42:32 AM',
        sentiment: 'positive',
        confidence: 0.97,
        intent: 'SOLUTION_EXPLANATION'
      },
      {
        id: 't-4',
        speaker: 'caller',
        text: 'Acha, iska capital subsidy deduction invoice mein hi adjust ho jayega ya reimbursement ke roop mein aayega?',
        timestamp: '11:42:47 AM',
        sentiment: 'neutral',
        confidence: 0.94,
        intent: 'COMMERCIAL_TERMS'
      },
      {
        id: 't-5',
        speaker: 'agent',
        text: 'Ji, government subsidy directly MNRE DBT account mein aayegi aur remaining balance par hamare paas 0% EMI financing model available hai.',
        timestamp: '11:43:02 AM',
        sentiment: 'positive',
        confidence: 0.99,
        intent: 'VALUE_PROPOSITION'
      }
    ]
  },
  {
    id: 'CALL-MON-8911',
    direction: 'outbound',
    callType: 'outbound',
    customerName: 'Dr. Debabrata Swain',
    customerNumber: '+91 94371 22890',
    callerPhone: '+91 94371 22890',
    companyName: 'Kalinga Hospital & Trauma Center',
    agentName: 'Deepak Mohapatra (Odisha)',
    language: 'Odia & Indian English',
    status: 'connected',
    objective: 'Clean Energy & Backup Solar Micro-grid Consultation',
    sentiment: 'positive',
    sentimentScore: 92,
    sentimentTrend: 'improving',
    speakingNow: 'caller',
    detectedEmotion: 'Decisive & Professional',
    carrier: 'Jio Enterprise SIP Trunk',
    callQuality: 'Excellent',
    interruptionCount: 1,
    startTime: new Date(Date.now() - 118000).toISOString(),
    durationSeconds: 118,
    summary: 'Hospital medical director reviewing energy security and zero-failure diesel generator replacement.',
    transcriptionStream: [
      {
        id: 'od-1',
        speaker: 'agent',
        text: 'ନମସ୍କାର ଡକ୍ଟର ସ୍ୱାଇଁ! ମୁଁ ଦୀପକ କହୁଛି ଆରୋହୀ ଏନର୍ଜିରୁ। ହସ୍ପିଟାଲ୍ ରୁଫଟପ୍ ସୋଲାର୍ ସର୍ଭେ ପାଇଁ କଥା ହୋଇପାରିବା କି?',
        timestamp: '11:41:20 AM',
        sentiment: 'positive',
        confidence: 0.97,
        intent: 'GREETING_ODIA'
      },
      {
        id: 'od-2',
        speaker: 'caller',
        text: 'ହଁ ଦୀପକ ବାବୁ, ଆମର ICU ଓ ଡାୟାଲିସିସ୍ ୱିଙ୍ଗ୍ ପାଇଁ ୨୪ ଘଣ୍ଟା ଅବିରତ ପାୱାର୍ ଦରକାର। ବ୍ୟାଟେରୀ ବ୍ୟାକଅପ୍ କେମିତି ରହିବ?',
        timestamp: '11:41:38 AM',
        sentiment: 'neutral',
        confidence: 0.96,
        intent: 'CRITICAL_REQUIREMENT'
      },
      {
        id: 'od-3',
        speaker: 'agent',
        text: 'ଆମେ ଲିଥିୟମ୍-ଫେରୋ-ଫସଫେଟ୍ (LFP) ସ୍ମାର୍ଟ ମାଇକ୍ରୋ-ଗ୍ରୀଡ୍ ଇନଷ୍ଟଲ୍ କରୁଛୁ ଯାହା ୧୦ ମିଲିସେକେଣ୍ଡରେ ଅଟୋମେଟିକ୍ ସୁଇଚ୍ ହୋଇଯିବ।',
        timestamp: '11:41:55 AM',
        sentiment: 'positive',
        confidence: 0.98,
        intent: 'TECHNICAL_ASSURANCE'
      },
      {
        id: 'od-4',
        speaker: 'caller',
        text: 'ଚମତ୍କାର! ଆପଣ କାଲି ସକାଳ ୧୦ ଟାରେ ଆମ ଇଞ୍ଜିନିୟରିଂ ଟିମ୍ ସହିତ ସାଇଟ୍ ସର୍ଭେ ପାଇଁ ଲୋକ ପଠାଇ ପାରିବେ କି?',
        timestamp: '11:42:15 AM',
        sentiment: 'positive',
        confidence: 0.99,
        intent: 'SITE_VISIT_BOOKING'
      }
    ]
  },
  {
    id: 'CALL-MON-8912',
    direction: 'inbound',
    callType: 'inbound',
    customerName: 'Meenakshi Sundaram',
    customerNumber: '+91 98401 77340',
    callerPhone: '+91 98401 77340',
    companyName: 'Sundaram Auto Precision Ltd',
    agentName: 'Ananya Iyer (Bengaluru)',
    language: 'Tamil & Indian English',
    status: 'connected',
    objective: 'High-Volume CNC Machine Spare Delivery & Escalation',
    sentiment: 'skeptical',
    sentimentScore: 54,
    sentimentTrend: 'declining',
    speakingNow: 'agent',
    detectedEmotion: 'Anxious / Urgent Concern',
    carrier: 'Vodafone Idea Cloud Trunk',
    callQuality: 'Good',
    interruptionCount: 2,
    startTime: new Date(Date.now() - 42000).toISOString(),
    durationSeconds: 42,
    summary: 'Customer checking why batch dispatch #PO-409 was delayed by 6 hours from Chennai warehouse.',
    transcriptionStream: [
      {
        id: 'tm-1',
        speaker: 'caller',
        text: 'Hello, our production line in Sriperumbudur is stalled waiting for the batch clearance for PO-409. Why has the courier not shared the tracking OTP?',
        timestamp: '11:42:40 AM',
        sentiment: 'urgent',
        confidence: 0.96,
        intent: 'URGENT_STATUS'
      },
      {
        id: 'tm-2',
        speaker: 'agent',
        text: 'Namaste Meenakshi ji! I understand the urgency completely. I am looking into PO-409 right now. The dedicated logistics vehicle is already dispatched and arriving at your dock in 35 minutes.',
        timestamp: '11:42:55 AM',
        sentiment: 'positive',
        confidence: 0.98,
        intent: 'EMPATHY_REASSURANCE'
      }
    ]
  },
  {
    id: 'CALL-MON-8913',
    direction: 'outbound',
    callType: 'outbound',
    customerName: 'Harpreet Singh',
    customerNumber: '+91 98140 33812',
    callerPhone: '+91 98140 33812',
    companyName: 'Golden Valley Banquets & Resorts',
    agentName: 'Neha Kapoor (North India)',
    language: 'Punjabi & Hindi',
    status: 'connected',
    objective: 'Destination Wedding Hall & Premium Catering Consultation',
    sentiment: 'positive',
    sentimentScore: 95,
    sentimentTrend: 'improving',
    speakingNow: 'caller',
    detectedEmotion: 'Enthusiastic & Joyful',
    carrier: 'Airtel Enterprise SIP',
    callQuality: 'Excellent',
    interruptionCount: 0,
    startTime: new Date(Date.now() - 156000).toISOString(),
    durationSeconds: 156,
    summary: 'Confirming December 2026 banquet date availability for 650 guests with royal palace catering package.',
    transcriptionStream: [
      {
        id: 'pb-1',
        speaker: 'agent',
        text: 'Sat Sri Akal Harpreet ji! Neha here from Golden Valley Banquets. Aapse wedding dates aur customized catering options discuss karne ke liye call kiya hai.',
        timestamp: '11:40:40 AM',
        sentiment: 'positive',
        confidence: 0.97,
        intent: 'GREETING_PUNJABI'
      },
      {
        id: 'pb-2',
        speaker: 'caller',
        text: 'Sat Sri Akal ji! Haan ji Neha, hum 12 aur 13 December ke liye Grand Ballroom book karna chahte hain. 650 guests ka setup ho payega?',
        timestamp: '11:41:02 AM',
        sentiment: 'positive',
        confidence: 0.98,
        intent: 'DATE_AVAILABILITY'
      },
      {
        id: 'pb-3',
        speaker: 'agent',
        text: 'Ji bilkul Harpreet ji! Grand Ballroom aur Poolside lawn dono available hain, aur humari live tandoor + Kashmiri wazwan catering team ready hai.',
        timestamp: '11:41:20 AM',
        sentiment: 'positive',
        confidence: 0.99,
        intent: 'OFFER_CONFIRMATION'
      }
    ]
  }
];

export default function LiveCallMonitorView({
  onClose,
  isModal = false,
  onOpenDialer,
  onOpenSimulator
}: LiveCallMonitorViewProps) {
  const [activeCalls, setActiveCalls] = useState<LiveCallMonitorItem[]>(SEED_ACTIVE_MONITOR_CALLS);
  const [selectedCallId, setSelectedCallId] = useState<string>(SEED_ACTIVE_MONITOR_CALLS[0].id);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'neutral' | 'skeptical' | 'urgent'>('all');
  const [directionFilter, setDirectionFilter] = useState<'all' | 'inbound' | 'outbound'>('all');
  const [elapsedClock, setElapsedClock] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingTurnId, setPlayingTurnId] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState<boolean>(false);
  const [isWhisperOpen, setIsWhisperOpen] = useState<boolean>(false);
  const [whisperMessage, setWhisperMessage] = useState<string>('');
  const [whisperSentNotice, setWhisperSentNotice] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const transcriptScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll transcript container to bottom as dynamic turns stream in
  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [activeCalls, selectedCallId]);

  // Clock ticker for active elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedClock((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Poll backend for real live calls (sync with Exotel and local database)
  const fetchBackendCalls = async () => {
    try {
      const res = await fetch('/api/arohi-one/voice-agents/call-logs');
      if (res.ok) {
        const data = await res.json();
        const logs: CallLogItem[] = data.calls || [];
        const realConnectedCalls = logs.filter(
          (c) => c.status === 'connected' || c.status === 'dialing' || c.status === 'dialing_carrier'
        );

        if (realConnectedCalls.length > 0) {
          setActiveCalls((prev) => {
            // Merge existing rich simulation items with backend updates
            const merged = [...prev];
            realConnectedCalls.forEach((rc) => {
              const idx = merged.findIndex((m) => m.id === rc.id);
              if (idx >= 0) {
                merged[idx] = { ...merged[idx], ...rc };
              } else {
                merged.unshift({
                  ...rc,
                  speakingNow: 'agent',
                  sentimentScore: 85,
                  sentimentTrend: 'improving',
                  detectedEmotion: 'Attentive',
                  callQuality: 'Excellent',
                  transcriptionStream: (rc.transcript || []).map((t, i) => ({
                    id: `tr-${i}`,
                    speaker: t.speaker === 'caller' ? 'caller' : 'agent',
                    text: t.text,
                    timestamp: t.timestamp || new Date().toLocaleTimeString(),
                    sentiment: (rc.sentiment as any) || 'positive',
                    confidence: 0.95
                  }))
                });
              }
            });
            return merged;
          });
        }
      }
    } catch (e) {
      console.warn('Could not sync live calls:', e);
    }
  };

  useEffect(() => {
    fetchBackendCalls();
  }, []);

  // Dynamic Live Transcript Streaming Generator (simulates realistic conversation turns and speech changes)
  useEffect(() => {
    if (!isLiveStreaming) return;

    const streamInterval = setInterval(() => {
      setActiveCalls((prevCalls) => {
        return prevCalls.map((call) => {
          if (call.status !== 'connected') return call;

          // Toggle speaking avatar between agent and caller
          const nextSpeaker: 'agent' | 'caller' = call.speakingNow === 'agent' ? 'caller' : 'agent';

          // Every ~9 seconds add a realistic new conversational turn to selected or active call
          const shouldAddTurn = Math.random() > 0.45;
          if (!shouldAddTurn) {
            return {
              ...call,
              speakingNow: nextSpeaker,
              durationSeconds: (call.durationSeconds || 0) + 3
            };
          }

          const agentPhrases = [
            'Aapka point bilkul valid hai. Main is document ki soft copy turant aapke WhatsApp par share kar rahi hoon.',
            'Hamare technical engineer kal dopahar 2 baje aapke address par physical inspection ke liye available hain.',
            'Aap bilkul befikar rahein, government DBT guidelines ke according aapka subsidy amount direct bank credit hoga.',
            'Isme koi bhi hidden charge nahi hai. Saari details transparent tax invoice ke saath deliver hongi.',
            'Kya main is booking ko aapke registered mobile number par final confirm kar doon?'
          ];

          const callerPhrases = [
            'Haan bilkul, WhatsApp par bhej dijiye taaki main hamare directors ke saath review kar sakoon.',
            'Thik hai, kal 2 baje humare factory manager wahan present rahenge.',
            'Achha, iska warranty period aur maintenance support kitne saal ka rehta hai?',
            'Dhanyawaad, mujhe saari jankari clear ho gayi hai. Next step bataiye.',
            'Ye solution hamare current setup ke saath fully compatible rahega na?'
          ];

          const phrases = nextSpeaker === 'agent' ? agentPhrases : callerPhrases;
          const chosenText = phrases[Math.floor(Math.random() * phrases.length)];

          const newTurn = {
            id: `live-turn-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            speaker: nextSpeaker,
            text: chosenText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            sentiment: (call.sentiment as any) || 'positive',
            confidence: 0.96 + Math.random() * 0.03,
            intent: nextSpeaker === 'agent' ? 'ASSISTANCE' : 'CUSTOMER_RESPONSE'
          };

          const updatedStream = [...(call.transcriptionStream || []), newTurn];

          // Dynamic sentiment calculation based on dialogue
          const sentimentDelta = nextSpeaker === 'caller' ? (Math.random() > 0.3 ? 2 : -1) : 1;
          const newScore = Math.min(99, Math.max(30, (call.sentimentScore || 80) + sentimentDelta));
          const sentimentLabel: 'positive' | 'neutral' | 'skeptical' | 'urgent' =
            newScore > 75 ? 'positive' : newScore > 55 ? 'neutral' : newScore > 40 ? 'skeptical' : 'urgent';

          return {
            ...call,
            speakingNow: nextSpeaker,
            sentiment: sentimentLabel,
            sentimentScore: newScore,
            sentimentTrend: sentimentDelta >= 0 ? 'improving' : 'declining',
            durationSeconds: (call.durationSeconds || 0) + 3,
            transcriptionStream: updatedStream
          };
        });
      });
    }, 4500);

    return () => clearInterval(streamInterval);
  }, [isLiveStreaming]);

  // Filter calls
  const filteredCalls = activeCalls.filter((call) => {
    const matchesSearch =
      !searchQuery.trim() ||
      (call.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (call.customerNumber || '').includes(searchQuery) ||
      (call.agentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (call.objective || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSentiment =
      sentimentFilter === 'all' || (call.sentiment || '').toLowerCase() === sentimentFilter;

    const matchesDirection =
      directionFilter === 'all' || (call.direction || call.callType) === directionFilter;

    return matchesSearch && matchesSentiment && matchesDirection;
  });

  const selectedCall = activeCalls.find((c) => c.id === selectedCallId) || filteredCalls[0] || activeCalls[0];

  const handleDisconnectCall = (callId: string) => {
    stopArohiVoice();
    setActiveCalls((prev) =>
      prev.map((c) =>
        c.id === callId
          ? {
              ...c,
              status: 'completed',
              speakingNow: 'silence',
              summary: 'Call concluded via Live Call Monitor operator console.'
            }
          : c
      )
    );
  };

  const handleCopyFullTranscript = (call: LiveCallMonitorItem) => {
    if (!call || !call.transcriptionStream) return;
    const text = call.transcriptionStream
      .map((t) => `[${t.timestamp}] ${t.speaker === 'agent' ? call.agentName || 'Arohi AI' : call.customerName || 'Customer'}: ${t.text}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedId(call.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayTurnVoice = (turnText: string, turnId: string) => {
    if (playingTurnId === turnId) {
      stopArohiVoice();
      setPlayingTurnId(null);
      return;
    }

    stopArohiVoice();
    setAudioLoading(true);
    setPlayingTurnId(turnId);

    playArohiVoice(turnText, {
      voice: 'Zypher',
      onStart: () => setAudioLoading(false),
      onEnd: () => {
        setAudioLoading(false);
        setPlayingTurnId(null);
      },
      onError: () => {
        setAudioLoading(false);
        setPlayingTurnId(null);
      }
    });
  };

  const handleSendWhisper = () => {
    if (!whisperMessage.trim() || !selectedCall) return;
    setWhisperSentNotice(`Prompt whispered to ${selectedCall.agentName}: "${whisperMessage.trim()}"`);
    setWhisperMessage('');
    setIsWhisperOpen(false);
    setTimeout(() => setWhisperSentNotice(null), 4000);
  };

  const getSentimentBadge = (sentiment?: string, score?: number) => {
    switch ((sentiment || '').toLowerCase()) {
      case 'positive':
        return {
          icon: Smile,
          color: 'text-emerald-700 dark:text-emerald-300',
          bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
          barColor: 'bg-emerald-500',
          label: 'Positive'
        };
      case 'neutral':
        return {
          icon: Meh,
          color: 'text-blue-700 dark:text-blue-300',
          bg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800',
          barColor: 'bg-blue-500',
          label: 'Neutral'
        };
      case 'skeptical':
        return {
          icon: Frown,
          color: 'text-amber-700 dark:text-amber-300',
          bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
          barColor: 'bg-amber-500',
          label: 'Skeptical'
        };
      case 'urgent':
      case 'negative':
        return {
          icon: AlertTriangle,
          color: 'text-rose-700 dark:text-rose-300',
          bg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
          barColor: 'bg-rose-500',
          label: 'Urgent / Escalation'
        };
      default:
        return {
          icon: Smile,
          color: 'text-emerald-700 dark:text-emerald-300',
          bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
          barColor: 'bg-emerald-500',
          label: 'Positive'
        };
    }
  };

  const selectedSentiment = getSentimentBadge(selectedCall?.sentiment, selectedCall?.sentimentScore);

  return (
    <div
      className={`font-sans text-left text-zinc-900 dark:text-zinc-100 ${
        isModal
          ? 'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden'
          : 'w-full space-y-4'
      }`}
    >
      <div
        className={`w-full bg-white dark:bg-[#111319] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isModal ? (isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-7xl max-h-[94vh] h-[92vh]') : 'min-h-[720px]'
        }`}
      >
        {/* TOP MONITOR HEADER */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-transparent border-b border-black/8 dark:border-white/8 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <Radio className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111319] animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
                  Live Call Monitor
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  REAL-TIME STREAM
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 text-[10px] font-mono font-bold">
                  {activeCalls.filter((c) => c.status === 'connected').length} Calls Active
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Dynamic telemetry showing active speaker detection, live caller sentiment analysis, and continuous audio transcripts.
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Stream On/Pause Toggle */}
            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isLiveStreaming
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
              }`}
              title={isLiveStreaming ? 'Dynamic streaming is live' : 'Streaming paused'}
            >
              <Activity className={`w-3.5 h-3.5 ${isLiveStreaming ? 'animate-spin text-emerald-500' : ''}`} />
              <span>{isLiveStreaming ? 'Live Sync Active' : 'Feed Paused'}</span>
            </button>

            {/* Quick Actions */}
            {onOpenDialer && (
              <button
                onClick={onOpenDialer}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <PhoneOutgoing className="w-3.5 h-3.5 text-amber-300" />
                <span>+ Dial Outbound</span>
              </button>
            )}

            {isModal && (
              <>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-all cursor-pointer"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Monitor'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                {onClose && (
                  <button
                    onClick={() => {
                      stopArohiVoice();
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-black/5 hover:bg-rose-500 hover:text-white dark:bg-white/5 dark:hover:bg-rose-500 text-zinc-600 dark:text-zinc-400 transition-all cursor-pointer"
                    title="Close Monitor"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* TOAST NOTICE FOR WHISPER / COPILOT INSTRUCTIONS */}
        {whisperSentNotice && (
          <div className="bg-purple-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between animate-fadeIn shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>{whisperSentNotice}</span>
            </div>
            <button onClick={() => setWhisperSentNotice(null)} className="text-white/80 hover:text-white cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {/* MAIN BODY: SPLIT VIEW (Active Calls Feed on Left, Live Dynamic Transcript & Intelligence on Right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-0">
          
          {/* LEFT COLUMN: ACTIVE CALLS LIST (5 Columns) */}
          <div className="lg:col-span-5 border-r border-black/8 dark:border-white/8 flex flex-col bg-zinc-50/50 dark:bg-[#0c0d12]/50 overflow-hidden">
            
            {/* Search and Filters Header */}
            <div className="p-3 border-b border-black/8 dark:border-white/8 space-y-2 shrink-0 bg-white/60 dark:bg-[#111319]/60">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by caller, agent, phone or topic..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Sentiment Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1">
                <span className="text-zinc-400 font-bold flex items-center gap-1 shrink-0">
                  <Filter className="w-3 h-3" />
                  Sentiment:
                </span>
                {(['all', 'positive', 'neutral', 'skeptical', 'urgent'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSentimentFilter(filter)}
                    className={`px-2 py-0.5 rounded-lg font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                      sentimentFilter === filter
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Calls Feed */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {filteredCalls.length === 0 ? (
                <div className="p-8 text-center text-zinc-400 space-y-2">
                  <PhoneOff className="w-8 h-8 mx-auto text-zinc-300 dark:text-zinc-600" />
                  <p className="text-xs font-semibold">No calls match active filter parameters.</p>
                </div>
              ) : (
                filteredCalls.map((call) => {
                  const isSelected = selectedCall?.id === call.id;
                  const sentimentMeta = getSentimentBadge(call.sentiment, call.sentimentScore);
                  const isSpeakingAgent = call.speakingNow === 'agent';
                  const isSpeakingCaller = call.speakingNow === 'caller';
                  const SentimentIcon = sentimentMeta.icon;

                  return (
                    <div
                      key={call.id}
                      onClick={() => setSelectedCallId(call.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden text-left ${
                        isSelected
                          ? 'bg-white dark:bg-[#161822] border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                          : 'bg-white/80 dark:bg-[#13151c]/80 border-black/8 dark:border-white/8 hover:border-emerald-500/40'
                      }`}
                    >
                      {/* Top Row: Caller & Status */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                              call.direction === 'inbound'
                                ? 'bg-gradient-to-tr from-blue-600 to-cyan-600'
                                : 'bg-gradient-to-tr from-emerald-600 to-teal-600'
                            }`}
                          >
                            {call.direction === 'inbound' ? (
                              <PhoneIncoming className="w-4 h-4" />
                            ) : (
                              <PhoneOutgoing className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="text-xs font-black text-zinc-900 dark:text-white truncate">
                                {call.customerName || 'Indian Enterprise Lead'}
                              </h4>
                              <span className="text-[10px] text-zinc-400 font-mono">
                                {call.customerNumber}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                              {call.companyName || 'Private Caller'}
                            </p>
                          </div>
                        </div>

                        {/* Live Timer Pill */}
                        <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>
                            {String(Math.floor((call.durationSeconds || 0) / 60)).padStart(2, '0')}:
                            {String((call.durationSeconds || 0) % 60).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* Speaking Now Indicator Banner */}
                      <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-400 text-[10px]">Speaking:</span>
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold flex items-center gap-1 ${
                              isSpeakingAgent
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300'
                                : isSpeakingCaller
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                          >
                            {isSpeakingAgent ? (
                              <>
                                <Bot className="w-3 h-3 text-purple-600 animate-pulse" />
                                <span>Agent ({call.agentName?.split(' ')[0] || 'Arohi'})</span>
                              </>
                            ) : (
                              <>
                                <User className="w-3 h-3 text-amber-600 animate-pulse" />
                                <span>Customer</span>
                              </>
                            )}
                          </span>
                        </div>

                        {/* Sentiment Chip */}
                        <div
                          className={`px-2 py-0.5 rounded-md border text-[10px] font-bold flex items-center gap-1 ${sentimentMeta.bg} ${sentimentMeta.color}`}
                        >
                          <SentimentIcon className="w-3 h-3" />
                          <span>{sentimentMeta.label}</span>
                          <span className="font-mono text-[9px]">({call.sentimentScore || 80}%)</span>
                        </div>
                      </div>

                      {/* Active Waveform Graphic */}
                      <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400">
                        <span className="truncate max-w-[180px]">
                          <strong>Agent:</strong> {call.agentName}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1 h-3.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                          <span className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.25s]" />
                          <span className="text-[9px] font-mono font-bold text-emerald-600 ml-1">LIVE</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE TRANSCRIPT & TELEMETRY INSPECTOR (7 Columns) */}
          {selectedCall ? (
            <div className="lg:col-span-7 flex flex-col bg-white dark:bg-[#111319] overflow-hidden">
              
              {/* Telemetry Header */}
              <div className="p-4 border-b border-black/8 dark:border-white/8 bg-gradient-to-r from-zinc-50 to-white dark:from-[#13151d] dark:to-[#111319] shrink-0 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-zinc-900 dark:text-white">
                          {selectedCall.agentName || 'Arohi Calling Agent'}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                          {selectedCall.language || 'Hinglish / Odia'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        In dialogue with <strong className="text-zinc-800 dark:text-zinc-200">{selectedCall.customerName}</strong> ({selectedCall.customerNumber})
                      </p>
                    </div>
                  </div>

                  {/* Actions: Whisper to Agent & Disconnect */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsWhisperOpen(!isWhisperOpen)}
                      className="px-2.5 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Whisper a directive to the AI agent during live call"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                      <span>Whisper to Agent</span>
                    </button>

                    <button
                      onClick={() => handleDisconnectCall(selectedCall.id)}
                      className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Gracefully disconnect active call"
                    >
                      <PhoneOff className="w-3.5 h-3.5" />
                      <span>End Call</span>
                    </button>
                  </div>
                </div>

                {/* WHISPER INPUT BOX */}
                {isWhisperOpen && (
                  <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center gap-2 animate-fadeIn">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <input
                      type="text"
                      value={whisperMessage}
                      onChange={(e) => setWhisperMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendWhisper()}
                      placeholder="e.g. Offer 10% instant discount if client confirms today..."
                      className="flex-1 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-xl text-xs border border-purple-200 dark:border-purple-700 text-zinc-900 dark:text-zinc-100 focus:outline-hidden"
                    />
                    <button
                      onClick={handleSendWhisper}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-purple-700"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send</span>
                    </button>
                  </div>
                )}

                {/* 3 Real-time Indicator Badges: Sentiment, Speaking Indicator & Carrier Quality */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {/* Speaker Status */}
                  <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/6 dark:border-white/6 text-left">
                    <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">
                      Speaking Active
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedCall.speakingNow === 'agent'
                            ? 'bg-purple-500 animate-ping'
                            : 'bg-amber-500 animate-ping'
                        }`}
                      />
                      <strong className="text-xs text-zinc-900 dark:text-white">
                        {selectedCall.speakingNow === 'agent' ? selectedCall.agentName?.split(' ')[0] : 'Customer'}
                      </strong>
                    </div>
                  </div>

                  {/* Real-Time Sentiment Gauge */}
                  <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/6 dark:border-white/6 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        Customer Sentiment
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-600">
                        {selectedCall.sentimentScore || 85}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
                      <div
                        className={`h-full ${selectedSentiment.barColor} transition-all duration-500`}
                        style={{ width: `${selectedCall.sentimentScore || 85}%` }}
                      />
                    </div>
                  </div>

                  {/* Carrier & Quality */}
                  <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/6 dark:border-white/6 text-left">
                    <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">
                      Carrier Trunk
                    </span>
                    <div className="flex items-center gap-1 mt-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{selectedCall.carrier || 'Exotel BSIP (+91)'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TRANSCRIPTION STREAM PANE */}
              <div className="p-3 border-b border-black/8 dark:border-white/8 flex items-center justify-between bg-zinc-50/70 dark:bg-[#0e1017]/70 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black tracking-tight text-zinc-900 dark:text-white uppercase">
                    Live Dynamic Transcript
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    ({selectedCall.transcriptionStream?.length || 0} spoken turns)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyFullTranscript(selectedCall)}
                    className="px-2 py-1 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === selectedCall.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy All</span>
                  </button>
                </div>
              </div>

              {/* CHAT STREAM (Scrolls Dynamically as new words/phrases are spoken) */}
              <div
                ref={transcriptScrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/40 dark:bg-[#0c0d12]/40"
              >
                {(selectedCall.transcriptionStream || []).map((turn, idx) => {
                  const isAgent = turn.speaker === 'agent';
                  const isPlayingThis = playingTurnId === turn.id;

                  return (
                    <div
                      key={turn.id || idx}
                      className={`flex flex-col animate-fade-in ${isAgent ? 'items-start' : 'items-end'}`}
                    >
                      {/* Speaker Identity & Timestamp Header */}
                      <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-zinc-400">
                        {isAgent ? (
                          <>
                            <Bot className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                            <strong className="text-zinc-700 dark:text-zinc-300">
                              {selectedCall.agentName || 'Arohi AI'}
                            </strong>
                          </>
                        ) : (
                          <>
                            <strong className="text-zinc-700 dark:text-zinc-300">
                              {selectedCall.customerName || 'Customer'}
                            </strong>
                            <User className="w-3 h-3 text-amber-500" />
                          </>
                        )}
                        <span>•</span>
                        <span className="font-mono text-[10px]">{turn.timestamp}</span>
                        {turn.intent && (
                          <span className="px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/5 text-[9px] font-mono text-zinc-500">
                            {turn.intent}
                          </span>
                        )}
                      </div>

                      {/* Speech Bubble */}
                      <div
                        className={`group relative max-w-[85%] sm:max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs transition-all ${
                          isAgent
                            ? 'bg-white dark:bg-[#1a1d27] border border-purple-500/20 text-zinc-800 dark:text-zinc-200 rounded-tl-xs'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-xs shadow-emerald-500/10'
                        }`}
                      >
                        <p>{turn.text}</p>

                        {/* Audio Preview Button */}
                        <div className="mt-2 flex items-center justify-between gap-2 pt-1.5 border-t border-black/5 dark:border-white/5 text-[10px]">
                          <span className={isAgent ? 'text-zinc-400' : 'text-emerald-100'}>
                            {turn.confidence ? `STT Confidence: ${Math.round(turn.confidence * 100)}%` : 'Synthesized Voice'}
                          </span>

                          <button
                            onClick={() => handlePlayTurnVoice(turn.text, turn.id)}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                              isAgent
                                ? 'text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/60'
                                : 'text-white hover:bg-white/20'
                            }`}
                            title="Hear voice synthesis of this turn"
                          >
                            {isPlayingThis ? (
                              <Pause className="w-3 h-3 text-rose-500 animate-pulse" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                            <span>{isPlayingThis ? 'Playing...' : 'Audition'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Dynamic Real-Time Speaking indicator when an utterance is currently being received */}
                {selectedCall.status === 'connected' && (
                  <div
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold animate-pulse ${
                      selectedCall.speakingNow === 'agent'
                        ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 w-fit'
                        : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 w-fit ml-auto'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>
                      {selectedCall.speakingNow === 'agent'
                        ? `${selectedCall.agentName?.split(' ')[0] || 'Agent'} is actively speaking...`
                        : `${selectedCall.customerName} is talking on line...`}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Summary Bar */}
              <div className="p-3 bg-white dark:bg-[#111319] border-t border-black/8 dark:border-white/8 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>
                    Elapsed: <strong className="text-zinc-800 dark:text-zinc-200 font-mono">{selectedCall.durationSeconds || 0}s</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Quality: <strong className="text-emerald-600 dark:text-emerald-400">{selectedCall.callQuality || 'Excellent (HD)'}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onOpenSimulator) onOpenSimulator();
                    }}
                    className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Open Interactive Simulator</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 text-center text-zinc-400">
              <Headphones className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mb-2" />
              <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Select an Active Call</h3>
              <p className="text-xs text-zinc-500">Pick any active call from the left list to inspect live speech and transcripts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
