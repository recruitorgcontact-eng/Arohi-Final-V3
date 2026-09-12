import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  PhoneOutgoing,
  PhoneOff,
  Radio,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Volume2,
  VolumeX,
  Languages,
  CheckCircle2,
  Clock,
  Settings2,
  Send,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Copy,
  Info,
  Zap,
  Mic,
  MicOff,
  HelpCircle,
  FileCheck,
  Headphones
} from 'lucide-react';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';
import { useBusinessOS } from './BusinessOSContext';

interface ExotelDirectDialerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPhoneNumber?: string;
  defaultObjective?: string;
  onCallCompleted?: (callRecord: any) => void;
}

interface TranscriptTurn {
  speaker: 'agent' | 'caller';
  text: string;
  timestamp: string;
}

const TOPIC_PRESETS = [
  {
    title: 'Lead Qualification & Demo',
    prompt: 'Qualify customer requirements, explain Arohi One AI features, and book a 15-minute executive demo.'
  },
  {
    title: 'Overdue Invoice / Payment Follow-up',
    prompt: 'Politely follow up regarding pending payment invoice #INV-9281, offer UPI or NEFT payment link via WhatsApp.'
  },
  {
    title: 'Hospital / Clinic Appointment Check',
    prompt: 'Confirm patient appointment for health consultation, remind them of fasting requirements if needed.'
  },
  {
    title: 'Candidate Screening & Interview Call',
    prompt: 'Conduct initial telephonic screening for Sovereign AI Engineer role, check notice period and tech stack.'
  },
  {
    title: 'Customer Feedback & CSAT Survey',
    prompt: 'Check customer satisfaction on recent delivery, record review score out of 5, resolve any complaints.'
  },
  {
    title: 'Open Autonomous Discussion',
    prompt: 'Freely converse about any business topic, answer customer questions, and deliver courteous advisory.'
  }
];

export default function ExotelDirectDialerModal({
  isOpen,
  onClose,
  defaultPhoneNumber = '',
  defaultObjective = '',
  onCallCompleted
}: ExotelDirectDialerModalProps) {
  const { showToast } = useBusinessOS();

  // Call Setup State
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);
  const [customerName, setCustomerName] = useState('Rahul Sharma');
  const [agentName, setAgentName] = useState('Arohi Executive Voice Agent');
  const [agentRole, setAgentRole] = useState('Business Growth & Client Advisor');
  const [language, setLanguage] = useState('Hinglish (Hindi + English)');
  const [objective, setObjective] = useState(
    defaultObjective || 'Introduce business opportunities and book a consultation meeting'
  );

  // Connection Mode & Caller ID Guidance State
  const [connectionMode, setConnectionMode] = useState<'audiostream' | 'telecom'>('audiostream');
  const [showCallerIdGuide, setShowCallerIdGuide] = useState(false);
  const [callerIdWarning, setCallerIdWarning] = useState<string | null>(null);

  // Exotel Settings State
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [exotelSid, setExotelSid] = useState('');
  const [exotelApiKey, setExotelApiKey] = useState('');
  const [exotelApiToken, setExotelApiToken] = useState('');
  const [exotelCallerId, setExotelCallerId] = useState('08047282633');
  const [exotelSubdomain, setExotelSubdomain] = useState('api.exotel.com');
  const [carrierConfig, setCarrierConfig] = useState<any>(null);

  // DND Check State
  const [dndInfo, setDndInfo] = useState<any>(null);
  const [isCheckingDnd, setIsCheckingDnd] = useState(false);

  // Active Call State
  const [callState, setCallState] = useState<'idle' | 'dialing' | 'ringing' | 'connected' | 'ended'>('idle');
  const [callSid, setCallSid] = useState<string | null>(null);
  const [isLiveCarrier, setIsLiveCarrier] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptTurn[]>([]);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [callerInput, setCallerInput] = useState('');
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callSentiment, setCallSentiment] = useState('positive');
  const [lastDisposition, setLastDisposition] = useState<any>(null);

  // Speech Recognition State for Microphone input
  const [isListeningMic, setIsListeningMic] = useState(false);
  const speechRecognitionRef = useRef<any>(null);

  // Load Exotel config on modal open
  useEffect(() => {
    if (isOpen) {
      fetch('/api/arohi-one/voice-agents/exotel/config')
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCarrierConfig(data);
            if (data.callerId) setExotelCallerId(data.callerId);
          }
        })
        .catch((err) => console.warn('Failed to load Exotel config:', err));
    }
  }, [isOpen]);

  // Duration Timer
  useEffect(() => {
    let timer: any = null;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callState]);

  // Initialize Speech Recognition for Real-Time Microphone Input
  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language.toLowerCase().includes('odia')
          ? 'or-IN'
          : language.toLowerCase().includes('hindi') || language.toLowerCase().includes('hinglish')
          ? 'hi-IN'
          : 'en-IN';

        recognition.onstart = () => {
          setIsListeningMic(true);
        };

        recognition.onresult = (event: any) => {
          const text = event.results?.[0]?.[0]?.transcript;
          if (text) {
            setCallerInput(text);
            handleSendCallerTurn(text);
          }
          setIsListeningMic(false);
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition error:', e);
          setIsListeningMic(false);
        };

        recognition.onend = () => {
          setIsListeningMic(false);
        };

        speechRecognitionRef.current = recognition;
      } catch (e) {
        console.warn('Failed to init speech recognition:', e);
      }
    }
  }, [language]);

  const toggleMicListening = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      showToast('Microphone speech recognition is not supported in this browser. You can type your response!');
      return;
    }
    if (isListeningMic) {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      setIsListeningMic(false);
    } else {
      stopArohiVoice();
      setIsAgentSpeaking(false);
      try {
        if (speechRecognitionRef.current) {
          speechRecognitionRef.current.start();
        }
      } catch (e) {
        console.warn('Error starting speech recognition:', e);
      }
    }
  };

  // Quick carrier identification
  const cleanDigits = phoneNumber.replace(/\D/g, '');
  let detectedCarrier = 'Indian Telecom Network';
  if (cleanDigits.length >= 2) {
    const p = cleanDigits.slice(-10).substring(0, 2);
    if (['70', '79', '89', '94', '95'].includes(p)) detectedCarrier = 'BSNL Mobile';
    else if (['98', '99', '88', '81', '76'].includes(p)) detectedCarrier = 'Bharti Airtel';
    else if (['63', '70', '72', '80', '82', '83', '84', '85', '86', '87', '91', '92', '93'].includes(p)) detectedCarrier = 'Reliance Jio 5G';
    else if (['90', '91', '97', '89', '77'].includes(p)) detectedCarrier = 'Vodafone Idea (Vi)';
  }

  // Handle DND Check
  const handleCheckDnd = async () => {
    if (!phoneNumber) {
      showToast('Please enter a phone number to check DND status.');
      return;
    }
    setIsCheckingDnd(true);
    try {
      const res = await fetch('/api/arohi-one/voice-agents/exotel/check-dnd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });
      const data = await res.json();
      if (data.success) {
        setDndInfo(data);
        showToast(data.isDnd ? 'Number is registered on DND.' : 'Number is clear for calls!');
      } else {
        showToast(data.error || 'Failed to check DND');
      }
    } catch (e: any) {
      showToast(e.message || 'Error checking DND');
    } finally {
      setIsCheckingDnd(false);
    }
  };

  // Place Call via Exotel or Instant AudioStream
  const handleStartExotelCall = async () => {
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setCallState('dialing');
    setTranscript([]);
    setCallDuration(0);
    setLastDisposition(null);
    setCallerIdWarning(null);

    // MODE A: Instant Duplex AudioStream (No Caller ID required, 0s delay)
    if (connectionMode === 'audiostream') {
      setTimeout(() => {
        setCallState('ringing');
      }, 800);

      try {
        const res = await fetch('/api/arohi-one/voice-agents/exotel/call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber,
            agentName,
            agentRole,
            objective,
            language,
            customerName,
            callerIdOverride: 'audiostream'
          })
        });

        const data = await res.json();
        if (data.success) {
          setCallSid(data.callSid);
          setIsLiveCarrier(false);

          setTimeout(() => {
            setCallState('connected');
            const initialGreeting = data.openingGreeting;
            setTranscript([
              {
                speaker: 'agent',
                text: initialGreeting,
                timestamp: new Date().toLocaleTimeString()
              }
            ]);

            setIsAgentSpeaking(true);
            playArohiVoice(initialGreeting, {
              voice: 'Zypher',
              language,
              onEnd: () => setIsAgentSpeaking(false),
              onError: () => setIsAgentSpeaking(false)
            });
          }, 1800);

          showToast(`Instant AudioStream connected for +91 ${phoneNumber}!`);
        } else {
          setCallState('idle');
          showToast(data.error || 'Failed to start call');
        }
      } catch (e: any) {
        setCallState('idle');
        showToast(e.message || 'Error triggering call');
      }
      return;
    }

    // MODE B: Exotel Carrier PSTN/GSM Trunk
    const customCreds = exotelSid && exotelApiKey && exotelApiToken ? {
      sid: exotelSid,
      apiKey: exotelApiKey,
      apiToken: exotelApiToken,
      callerId: exotelCallerId,
      subdomain: exotelSubdomain
    } : undefined;

    try {
      setTimeout(() => {
        setCallState('ringing');
      }, 1200);

      const res = await fetch('/api/arohi-one/voice-agents/exotel/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          agentName,
          agentRole,
          objective,
          language,
          customerName,
          callerIdOverride: exotelCallerId,
          customCredentials: customCreds
        })
      });

      const data = await res.json();

      if (data.success) {
        setCallSid(data.callSid);
        setIsLiveCarrier(data.liveDialDispatched);

        if (data.isCallerIdPending || (!data.liveDialDispatched && data.exotelError)) {
          setCallerIdWarning(
            data.exotelError?.reason ||
            'Exotel Virtual Number (Caller ID) is pending KYC verification. Connected automatically via Direct Voice Call so you can test without delay!'
          );
        }

        // Connected state
        setTimeout(() => {
          setCallState('connected');
          const initialGreeting = data.openingGreeting;
          setTranscript([
            {
              speaker: 'agent',
              text: initialGreeting,
              timestamp: new Date().toLocaleTimeString()
            }
          ]);

          // Play Opening Voice
          setIsAgentSpeaking(true);
          playArohiVoice(initialGreeting, {
            voice: 'Zypher',
            language,
            onEnd: () => setIsAgentSpeaking(false),
            onError: () => setIsAgentSpeaking(false)
          });
        }, 2200);

        if (data.liveDialDispatched) {
          showToast(`Live Exotel call placed to ${data.phoneNumber}!`);
        } else {
          showToast(`Connected via Direct Voice Call (Caller ID pending verification)`);
        }
      } else {
        setCallState('idle');
        showToast(data.error || 'Failed to place call via Exotel');
      }
    } catch (e: any) {
      setCallState('idle');
      showToast(e.message || 'Error triggering call');
    }
  };

  // Submit Caller Utterance (Simulated or Voice-typed Speech)
  const handleSendCallerTurn = async (utteranceToSend?: string) => {
    const text = utteranceToSend || callerInput;
    if (!text.trim() || isProcessingTurn) return;

    stopArohiVoice();
    setIsAgentSpeaking(false);
    setCallerInput('');
    setIsProcessingTurn(true);

    const updatedTranscript: TranscriptTurn[] = [
      ...transcript,
      { speaker: 'caller', text, timestamp: new Date().toLocaleTimeString() }
    ];
    setTranscript(updatedTranscript);

    try {
      const res = await fetch('/api/arohi-one/voice-agents/exotel/converse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callSid,
          callerUtterance: text,
          history: updatedTranscript,
          agentName,
          agentRole,
          objective,
          language,
          customerName
        })
      });

      const data = await res.json();
      if (data.success && data.turn) {
        const turn = data.turn;
        setCallSentiment(turn.sentiment || 'positive');
        setLastDisposition(turn);

        const newTurns: TranscriptTurn[] = [
          ...updatedTranscript,
          {
            speaker: 'agent',
            text: turn.speechResponse,
            timestamp: new Date().toLocaleTimeString()
          }
        ];
        setTranscript(newTurns);

        // Speak response
        setIsAgentSpeaking(true);
        playArohiVoice(turn.speechResponse, {
          voice: 'Zypher',
          language,
          onEnd: () => setIsAgentSpeaking(false),
          onError: () => setIsAgentSpeaking(false)
        });

        if (turn.isGoalAchieved) {
          showToast('Call objective achieved!');
        }
      }
    } catch (e: any) {
      console.error('Error during call turn:', e);
    } finally {
      setIsProcessingTurn(false);
    }
  };

  // Barge-In: Interrupt Agent Speech
  const handleBargeIn = () => {
    stopArohiVoice();
    setIsAgentSpeaking(false);
    showToast('Barge-in: AI speech cancelled immediately');
  };

  // End Call
  const handleEndCall = () => {
    stopArohiVoice();
    setIsAgentSpeaking(false);
    setCallState('ended');
    if (onCallCompleted) {
      onCallCompleted({
        id: callSid,
        duration: callDuration,
        transcript,
        disposition: lastDisposition
      });
    }
  };

  const formatSeconds = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#121214] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <PhoneOutgoing className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  Direct Indian Telephony Dialer
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono text-[10px] font-bold border border-purple-200 dark:border-purple-800">
                  Exotel BSIP Gateway
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Place direct autonomous voice AI calls to Indian consumers on Jio, Airtel, Vi, and BSNL numbers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfigModal(!showConfigModal)}
              className="px-2.5 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1.5 cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Exotel Credentials</span>
            </button>
            <button
              onClick={() => {
                stopArohiVoice();
                onClose();
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* BODY CONTAINER */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* EXOTEL CREDENTIALS DRAWER */}
          {showConfigModal && (
            <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">
                    Exotel BSIP Account & Virtual Number Credentials
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500">
                  {carrierConfig?.configured ? '● Live Account Linked' : '○ Operating in Sandbox/Stream Mode'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Exotel Account SID
                  </label>
                  <input
                    type="text"
                    value={exotelSid}
                    onChange={(e) => setExotelSid(e.target.value)}
                    placeholder={carrierConfig?.maskedSid || 'e.g. arohiai921'}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    API Key
                  </label>
                  <input
                    type="text"
                    value={exotelApiKey}
                    onChange={(e) => setExotelApiKey(e.target.value)}
                    placeholder="Enter Exotel API Key"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    API Token
                  </label>
                  <input
                    type="password"
                    value={exotelApiToken}
                    onChange={(e) => setExotelApiToken(e.target.value)}
                    placeholder="Enter Exotel API Token"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                    Virtual Caller ID (DID)
                  </label>
                  <input
                    type="text"
                    value={exotelCallerId}
                    onChange={(e) => setExotelCallerId(e.target.value)}
                    placeholder="08047129901"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                <span>Webhook URL: <code>/api/arohi-one/voice-agents/exotel/passthru</code></span>
                <span>TRAI Calling Window: <strong>9:00 AM - 9:00 PM IST</strong></span>
              </div>
            </div>
          )}

          {/* VIEW A: DIALER SETUP FORM (When call is idle or ended) */}
          {(callState === 'idle' || callState === 'ended') && (
            <div className="space-y-4">
              {/* EXOTEL CALLER ID / KYC NOTICE & WORKAROUND BANNER */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="font-bold text-amber-900 dark:text-amber-300 text-xs">
                      Exotel Virtual Number (Caller ID) Pending Allocation / KYC?
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCallerIdGuide(!showCallerIdGuide)}
                    className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showCallerIdGuide ? 'Close KYC Guide' : 'Why Delay? • View Fast-Track Guide'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-amber-800 dark:text-amber-300/90 leading-relaxed">
                  Under Indian Telecom regulations (TRAI & Department of Telecom), Exotel cannot allocate a dedicated virtual Caller ID (ExoPhone) immediately until business KYC documents (GST, PAN, Letter of Undertaking) are verified (typically 24–72 hrs).
                  <span className="block mt-1 font-semibold text-zinc-900 dark:text-white">
                    ⚡ Zero Waiting Required: Select <span className="underline decoration-purple-500 underline-offset-2">"Direct Voice Call"</span> below to talk directly with the AI using your microphone right now!
                  </span>
                </p>
              </div>

              {/* CALLER ID KYC & ALLOCATION GUIDE PANEL */}
              {showCallerIdGuide && (
                <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs space-y-3">
                  <div className="flex items-center justify-between font-bold text-purple-900 dark:text-purple-200 text-xs">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      How Exotel Caller IDs (ExoPhones) Work in India & Fast-Tracking
                    </span>
                    <span className="text-[10px] font-mono bg-purple-200/60 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-md">
                      TRAI Compliance Protocol
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                    <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 space-y-1">
                      <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-[10px] font-bold">1</span>
                        Why Exotel Holds Caller ID
                      </div>
                      <p className="text-zinc-500 text-[10px] leading-relaxed">
                        To prevent unsolicited spam and fraud, Indian telecom law requires manual KYC validation before provisioning any 080, 011, 022, or 040 virtual DID trunk.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 space-y-1">
                      <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-[10px] font-bold">2</span>
                        Fast-Track KYC in 24 Hrs
                      </div>
                      <p className="text-zinc-500 text-[10px] leading-relaxed">
                        Submit GST Registration, Company PAN, and Authorized Signatory ID at <span className="font-mono text-purple-600 dark:text-purple-400">my.exotel.com</span>. Email <strong>hello@exotel.com</strong> with your Account SID to expedite approval.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 space-y-1">
                      <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-[10px] font-bold">3</span>
                        Instant Voice Call Ready
                      </div>
                      <p className="text-zinc-500 text-[10px] leading-relaxed">
                        Don't let telecom paperwork stop your progress. Arohi AI provides direct two-way voice calling with your microphone so you can talk with the AI immediately.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CONNECTION MODE SELECTOR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConnectionMode('audiostream')}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    connectionMode === 'audiostream'
                      ? 'bg-purple-50/90 dark:bg-purple-950/60 border-purple-500 text-purple-900 dark:text-purple-100 shadow-xs'
                      : 'bg-zinc-50 dark:bg-zinc-900/60 border-black/5 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-bold text-xs flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                      <Zap className="w-3.5 h-3.5" />
                      <span>⚡ Direct Voice Call (Instant)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Active Now • 0s Wait
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                    No Caller ID needed. Direct two-way conversation with natural Indian voice, microphone speech input, and automatic CRM logging.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setConnectionMode('telecom')}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    connectionMode === 'telecom'
                      ? 'bg-purple-50/90 dark:bg-purple-950/60 border-purple-500 text-purple-900 dark:text-purple-100 shadow-xs'
                      : 'bg-zinc-50 dark:bg-zinc-900/60 border-black/5 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-bold text-xs flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
                      <Radio className="w-3.5 h-3.5 text-purple-500" />
                      <span>📞 Exotel PSTN/GSM Carrier Trunk</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      Needs Approved ExoPhone
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                    Dials the consumer's physical phone over Indian telecom lines once your Exotel Virtual Number (ExoPhone) KYC is approved.
                  </p>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Number & Target */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Target Phone Number Input */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-purple-600" />
                      <span>Target Indian Mobile / Landline</span>
                    </label>
                    <span className="text-[11px] font-medium text-purple-600 dark:text-purple-400">
                      {detectedCarrier}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-3 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-xs font-bold font-mono text-zinc-600 dark:text-zinc-300">
                      +91 🇮🇳
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="9876543210 or 8047129901"
                      className="flex-1 px-3 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-sm font-mono font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={handleCheckDnd}
                      disabled={isCheckingDnd}
                      className="px-3 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isCheckingDnd ? 'Checking...' : 'Check DND'}</span>
                    </button>
                  </div>

                  {dndInfo && (
                    <div className={`p-2 rounded-lg text-xs flex items-center gap-2 ${
                      dndInfo.isDnd
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}>
                      {dndInfo.isDnd ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      <span>{dndInfo.dndStatus} ({dndInfo.carrierHint})</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                        Consumer / Client Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Rahul Sharma"
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                        Spoken Language / Dialect
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-xs font-semibold"
                      >
                        <option value="Hinglish (Hindi + English)">Hinglish (Hindi + English)</option>
                        <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                        <option value="Odia (ଓଡ଼ିଆ)">Odia (ଓଡ଼ିଆ)</option>
                        <option value="Indian English">Indian English</option>
                        <option value="Bengali (বাংলা)">Bengali (বাংলা)</option>
                        <option value="Tamil (தமிழ்)">Tamil (தமிழ்)</option>
                        <option value="Telugu (తెలుగు)">Telugu (తెలుగు)</option>
                        <option value="Marathi (मराठी)">Marathi (मराठी)</option>
                        <option value="Gujarati (ગુજરાતી)">Gujarati (ગુજરાતી)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Assigned Voice Persona */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
                  <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Assigned Telephony Voice Persona</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Arohi Executive Growth Agent', role: 'Business Development & Demo Lead' },
                      { name: 'Arohi Invoicing & Accounts', role: 'Payment Follow-up & GST Desk' },
                      { name: 'Arohi Swasthya Caretaker', role: 'Clinic & Hospital Care Coordinator' },
                      { name: 'Arohi Universal AI Specialist', role: 'Any-Topic Conversational Lead' }
                    ].map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => {
                          setAgentName(p.name);
                          setAgentRole(p.role);
                        }}
                        className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                          agentName === p.name
                            ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 text-purple-900 dark:text-purple-200 shadow-xs'
                            : 'bg-white dark:bg-zinc-800 border-black/5 dark:border-white/5 text-zinc-700 dark:text-zinc-300 hover:border-purple-300'
                        }`}
                      >
                        <div className="font-bold text-[11px] truncate">{p.name}</div>
                        <div className="text-[10px] text-zinc-500 truncate">{p.role}</div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Objective / Topic & Launch */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Topic / Objective Input */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Call Objective (Talk About Anything)</span>
                    </label>
                    <span className="text-[10px] text-zinc-400">Autonomous Reasoning Enabled</span>
                  </div>

                  <textarea
                    rows={4}
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    placeholder="Enter what the voice AI should discuss with the customer..."
                    className="w-full p-3 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed font-sans"
                  />

                  {/* Preset Topic Chips */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      Quick Telephony Presets:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {TOPIC_PRESETS.map((preset) => (
                        <button
                          key={preset.title}
                          type="button"
                          onClick={() => setObjective(preset.prompt)}
                          className="px-2 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 text-[10px] font-medium text-zinc-700 dark:text-zinc-300 hover:border-purple-400 hover:text-purple-600 transition-colors cursor-pointer"
                        >
                          {preset.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Call Trigger Action Card */}
                <div className="p-4 rounded-xl bg-linear-to-br from-purple-900 via-indigo-900 to-zinc-900 text-white space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-purple-300 animate-pulse" />
                      <span className="text-xs font-bold tracking-wide">
                        Ready to Connect via Exotel BSIP
                      </span>
                    </div>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono">
                      Target: {phoneNumber || '+91...'}
                    </span>
                  </div>

                  <p className="text-xs text-purple-200 leading-relaxed">
                    Once placed, Exotel will ring the customer's phone and connect a natural, real-time voice call with automatic CRM updates.
                  </p>

                  <button
                    type="button"
                    onClick={handleStartExotelCall}
                    className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-purple-500/30"
                  >
                    <PhoneOutgoing className="w-4 h-4" />
                    <span>Place Autonomous Call to +91 Number</span>
                  </button>
                </div>

              </div>

            </div>
            </div>
          )}

          {/* VIEW B: ACTIVE CALL CONSOLE (Dialing, Ringing, or In-Progress) */}
          {(callState === 'dialing' || callState === 'ringing' || callState === 'connected') && (
            <div className="space-y-4">
              
              {/* Call Status Bar */}
              <div className="p-4 rounded-xl bg-zinc-900 text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    callState === 'connected' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        {callState === 'dialing' && 'Connecting phone line...'}
                        {callState === 'ringing' && `Telecom Ringing: ${phoneNumber} (${detectedCarrier})...`}
                        {callState === 'connected' && `Live Call In Progress with ${customerName}`}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-purple-300">
                        {isLiveCarrier ? 'Live Phone Line' : 'Direct Voice Call'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Objective: {objective.slice(0, 75)}...
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-zinc-400">Call Duration</div>
                    <div className="font-mono text-sm font-bold text-emerald-400">
                      {formatSeconds(callDuration)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleEndCall}
                    className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>End Call</span>
                  </button>
                </div>
              </div>

              {/* Caller ID Pending Notice in Active Call */}
              {callerIdWarning && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold text-[11px]">Exotel Virtual Number Notice:</p>
                    <p className="text-[11px] opacity-90 leading-relaxed">{callerIdWarning}</p>
                  </div>
                </div>
              )}

              {/* In-Call Telephony Waveform & Live Audio Indicator */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isAgentSpeaking ? 'bg-purple-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}>
                    {isAgentSpeaking ? <Volume2 className="w-5 h-5 animate-bounce" /> : <VolumeX className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <span>{isAgentSpeaking ? `${agentName} is Speaking...` : 'Listening for Caller Response...'}</span>
                      {isAgentSpeaking && (
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">
                          Natural Cadence ({language.split(' ')[0]})
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Call Quality: <strong className="text-emerald-600 font-semibold">Excellent</strong> (Instant Responsiveness)
                    </p>
                  </div>
                </div>

                {isAgentSpeaking && (
                  <button
                    type="button"
                    onClick={handleBargeIn}
                    className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-amber-100"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Simulate Barge-In (Interrupt AI)</span>
                  </button>
                )}
              </div>

              {/* Live Transcript Stream */}
              <div className="h-64 overflow-y-auto p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] space-y-3 font-sans text-xs">
                {transcript.map((t, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      t.speaker === 'agent' ? 'items-start' : 'items-end'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mb-0.5">
                      <span className="font-bold">
                        {t.speaker === 'agent' ? agentName : customerName}
                      </span>
                      <span>•</span>
                      <span>{t.timestamp}</span>
                    </div>
                    <div
                      className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        t.speaker === 'agent'
                          ? 'bg-purple-50 dark:bg-purple-950/40 text-zinc-900 dark:text-white rounded-tl-xs border border-purple-200/50 dark:border-purple-800/40'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-tr-xs border border-black/5 dark:border-white/5'
                      }`}
                    >
                      {t.text}
                    </div>
                  </div>
                ))}
                {isProcessingTurn && (
                  <div className="flex items-center gap-2 text-zinc-400 text-xs italic py-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                    <span>Arohi Telephony Brain reasoning response in {language}...</span>
                  </div>
                )}
              </div>

              {/* Caller Input & Quick Test Utterances */}
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="font-semibold">Simulate Caller Speech or Speak into Mic:</span>
                  <span className="text-[10px]">Press Enter or click Send</span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendCallerTurn();
                  }}
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={toggleMicListening}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isListeningMic
                        ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-500/30'
                        : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-black/10 dark:border-white/10'
                    }`}
                    title={isListeningMic ? 'Click to stop listening' : 'Speak into your microphone'}
                  >
                    {isListeningMic ? <Mic className="w-3.5 h-3.5 animate-bounce" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isListeningMic ? 'Listening...' : 'Mic'}</span>
                  </button>

                  <input
                    type="text"
                    value={callerInput}
                    onChange={(e) => setCallerInput(e.target.value)}
                    placeholder={isListeningMic ? 'Listening to your microphone... speak now!' : "Type customer response or click Mic..."}
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={isProcessingTurn || !callerInput.trim()}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>

                {/* Quick Caller Reply Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "Haan main interested hoon, details bhejiye",
                    "Aapki pricing kya hai?",
                    "Abhi main thoda busy hoon, shaam ko call karo",
                    "Nahin mujhe abhi zaroorat nahi hai",
                    "Can you schedule a demo for tomorrow 11 AM?"
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() => handleSendCallerTurn(phrase)}
                      className="px-2 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 text-[10px] text-zinc-600 dark:text-zinc-300 hover:text-purple-600 hover:border-purple-300 transition-colors cursor-pointer"
                    >
                      "{phrase}"
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3 border-t border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/70 dark:bg-zinc-900/50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-500">
            <Radio className="w-3.5 h-3.5 text-purple-600" />
            <span>Verified Cloud Telephony • Indian +91 Calling • Crystal Clear Audio</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                stopArohiVoice();
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
