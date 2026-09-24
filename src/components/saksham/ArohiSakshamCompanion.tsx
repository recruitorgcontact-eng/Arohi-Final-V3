// Arohi Saksham - Dedicated Divyangjan & PwD Natural Conversational AI Companion
// Hands-free Voice Interaction, Studio Neural Audio Readout, High-Contrast & Large-Print Accessible UI

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RefreshCw, 
  Loader2, 
  Check, 
  Copy, 
  Mic, 
  MicOff, 
  HeartHandshake, 
  ShieldCheck, 
  PhoneCall, 
  PhoneOff, 
  HelpCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Accessibility,
  Sliders,
  Type
} from 'lucide-react';
import { playArohiVoice, stopArohiVoice, sanitizeSpeechText } from '../../utils/arohiVoicePlayer';

interface ChatMessage {
  id: string;
  sender: 'arohi' | 'user';
  text: string;
  timestamp: string;
  language?: string;
}

interface ArohiSakshamCompanionProps {
  isDarkMode?: boolean;
  highContrast?: boolean;
  onSelectProduct?: (productId: string) => void;
  onViewSchemes?: () => void;
  prefillPrompt?: string;
}

const QUICK_PROMPTS = [
  {
    label: 'UDID Card Application',
    icon: '🪪',
    prompt: 'How do I apply for a UDID Card step-by-step on swavlambancard.gov.in, and what documents are required?'
  },
  {
    label: 'ADIP 100% Free Aids',
    icon: '♿',
    prompt: 'What are the income limits and eligibility rules to get free motorized tricycles and smart sonar canes under the ADIP scheme?'
  },
  {
    label: '4% Govt Job Reservation',
    icon: '🏛️',
    prompt: 'Explain the 4% reservation under Section 34 of RPwD Act 2016 and 10-year age relaxation for government jobs.'
  },
  {
    label: 'Scribe 20 Min/Hr Rule',
    icon: '✍️',
    prompt: 'What are the official rules for appointing a scribe and getting 20 minutes compensatory extra time per hour in exams?'
  },
  {
    label: 'NHFDC 4% Business Loans',
    icon: '💼',
    prompt: 'How can a person with disability apply for NHFDC concessional business loans up to 50 Lakhs at 4% to 6% interest?'
  },
  {
    label: 'Railway & Flight Concession',
    icon: '🚆',
    prompt: 'How do I get the 50% to 75% Indian Railways and airline fare concession ticket for myself and my escort?'
  }
];

export const ArohiSakshamCompanion: React.FC<ArohiSakshamCompanionProps> = ({
  isDarkMode = false,
  highContrast = false,
  onSelectProduct,
  onViewSchemes,
  prefillPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-saksham',
      sender: 'arohi',
      text: `Namaste! I am Arohi Saksham — your dedicated AI companion for Divyangjan (Persons with Disabilities / PwD) welfare, legal rights, and government schemes.

I am here to ensure that every right guaranteed under the RPwD Act 2016, every free aid under the ADIP scheme, and every educational or financial opportunity reaches you easily. 

How can I support you today? You can type, speak using the microphone, or listen aloud with my studio voice.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: 'en-IN'
    }
  ]);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speechRecognitionActive, setSpeechRecognitionActive] = useState(false);
  const [autoReadAloud, setAutoReadAloud] = useState(true);
  const [largeTextMode, setLargeTextMode] = useState(false);
  const [isLiveCallActive, setIsLiveCallActive] = useState(false);
  const [liveCallTranscript, setLiveCallTranscript] = useState('');
  const [liveCallStatus, setLiveCallStatus] = useState<'idle' | 'listening' | 'speaking' | 'processing'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Handle prefill prompt if passed from parent
  useEffect(() => {
    if (prefillPrompt && prefillPrompt.trim()) {
      handleSend(prefillPrompt.trim());
    }
  }, [prefillPrompt]);

  // Stop voice on unmount
  useEffect(() => {
    return () => {
      stopArohiVoice();
    };
  }, []);

  // Natural Audio Voice Readout (Signature Warm Aoede Voice)
  const handleReadAloud = (msgId: string, text: string) => {
    if (activeSpeakingMsgId === msgId) {
      stopArohiVoice();
      setActiveSpeakingMsgId(null);
      return;
    }

    stopArohiVoice();
    setActiveSpeakingMsgId(msgId);

    const clean = sanitizeSpeechText(text);

    // Detect language script for optimal speech accent
    const isOdia = /[\u0B00-\u0B7F]/.test(clean);
    const isHindi = /[\u0900-\u097F]/.test(clean);
    const lang = isOdia ? 'or-IN' : isHindi ? 'hi-IN' : 'en-IN';

    playArohiVoice(clean, {
      language: lang,
      voice: 'Aoede', // Signature warm neural studio voice
      onStart: () => setActiveSpeakingMsgId(msgId),
      onEnd: () => setActiveSpeakingMsgId(curr => curr === msgId ? null : curr),
      onError: () => setActiveSpeakingMsgId(curr => curr === msgId ? null : curr)
    });
  };

  // Speech Recognition (Microphone Input)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (speechRecognitionActive) {
      setSpeechRecognitionActive(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN'; // Will detect English and Indian accented speech
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setSpeechRecognitionActive(true);
      };

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        if (spoken) {
          setInput(spoken);
          // Directly send spoken message for true hands-free voice experience
          handleSend(spoken);
        }
        setSpeechRecognitionActive(false);
      };

      recognition.onerror = () => {
        setSpeechRecognitionActive(false);
      };

      recognition.onend = () => {
        setSpeechRecognitionActive(false);
      };

      recognition.start();
    } catch (e) {
      setSpeechRecognitionActive(false);
    }
  };

  // Live Simulated Voice Call mode for true hands-free dialogue
  const startLiveVoiceCall = () => {
    setIsLiveCallActive(true);
    setLiveCallStatus('speaking');
    const greeting = "Namaste! I am Arohi Saksham on live voice. I am listening to you. Please tell me what scheme, certificate, or assistance you need.";
    setLiveCallTranscript(greeting);
    
    playArohiVoice(greeting, {
      voice: 'Aoede',
      language: 'en-IN',
      onEnd: () => {
        setLiveCallStatus('listening');
        // trigger speech recognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-IN';
            recognition.interimResults = false;
            recognition.onresult = (e: any) => {
              const query = e.results[0][0].transcript;
              if (query) {
                setLiveCallStatus('processing');
                setLiveCallTranscript(`You asked: "${query}"`);
                handleVoiceTurn(query);
              }
            };
            recognition.onerror = () => setLiveCallStatus('idle');
            recognition.start();
          } catch {
            setLiveCallStatus('idle');
          }
        }
      }
    });
  };

  const handleVoiceTurn = async (spokenText: string) => {
    try {
      const resp = await fetch('/api/voice-call-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: spokenText,
          mode: 'saksham',
          language: 'en'
        })
      });

      if (!resp.ok) throw new Error('Call error');
      const data = await resp.json();
      const reply = data.spokenReply || data.text || "I understand. Let me guide you with the official ADIP and UDID procedures.";
      setLiveCallTranscript(reply);
      setLiveCallStatus('speaking');

      playArohiVoice(sanitizeSpeechText(reply), {
        voice: 'Aoede',
        language: 'en-IN',
        onEnd: () => setLiveCallStatus('idle')
      });
    } catch (err) {
      const fallback = "Under the central ADIP scheme, eligible citizens receive one hundred percent free assistive devices, and UDID cards can be registered at swavlambancard.gov.in.";
      setLiveCallTranscript(fallback);
      setLiveCallStatus('speaking');
      playArohiVoice(fallback, {
        voice: 'Aoede',
        language: 'en-IN',
        onEnd: () => setLiveCallStatus('idle')
      });
    }
  };

  const endLiveVoiceCall = () => {
    stopArohiVoice();
    setIsLiveCallActive(false);
    setLiveCallStatus('idle');
    setLiveCallTranscript('');
  };

  // Submit Query to /api/chat with mode = 'saksham'
  const handleSend = async (queryText?: string) => {
    const q = (queryText || input).trim();
    if (!q || isThinking) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const contextMandate = `DIVYANGJAN COMPANION MANDATE: Provide compassionate, practical, actionable steps for Persons with Disabilities (PwD). Reference official portals like swavlambancard.gov.in and disabilityaffairs.gov.in. If assistive devices are relevant, reference Arohi Care & ODITREE SERVICES products (Sonar IoT DLI010, Canes). Format beautifully with bullet points without excessive markdown asterisks.`;

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          history: historyPayload,
          mode: 'saksham',
          systemContext: contextMandate
        })
      });

      if (!resp.ok) throw new Error('API error');
      const data = await resp.json();
      const botResponse = data.response || "I have noted your query. The Government of India provides full assistance under the ADIP scheme and RPwD Act 2016.";

      const botMsgId = `arohi-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: 'arohi',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);

      // Auto-read aloud if enabled
      if (autoReadAloud) {
        handleReadAloud(botMsgId, botResponse);
      }
    } catch (err) {
      console.warn('API error, using Divyangjan knowledge fallback:', err);
      const fallbackText = `Under the ADIP Scheme (Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances), citizens with 40% or more benchmark disability and a family income up to ₹20,000 per month are eligible for 100% free modern assistive devices including motorized tricycles, smart sonar canes, and hearing aids.

For digital identity and welfare recognition across all states, register at swavlambancard.gov.in for your UDID Card.

Under Section 34 of the RPwD Act 2016, 4% mandatory reservation and 10 years age relaxation are provided in Government appointments. For examinations, candidates are entitled to 20 minutes compensatory extra time per hour.`;

      const botMsgId = `arohi-fb-${Date.now()}`;
      const fallbackMsg: ChatMessage = {
        id: botMsgId,
        sender: 'arohi',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, fallbackMsg]);

      if (autoReadAloud) {
        handleReadAloud(botMsgId, fallbackText);
      }
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    const clean = text.replace(/[*#_~`]/g, '');
    navigator.clipboard.writeText(clean);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Formatter for clean readability
  const renderFormattedText = (rawText: string) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');

    return (
      <div className={`space-y-2.5 ${largeTextMode ? 'text-lg leading-relaxed' : 'text-sm leading-relaxed'}`}>
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // Bullet points
          if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('* ')) {
            const cleanBullet = trimmed.replace(/^[-*•]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1">
                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                <span className="flex-1">{cleanBullet.replace(/[*#_~`]/g, '')}</span>
              </div>
            );
          }

          // Numbered list
          const numMatch = trimmed.match(/^(\d+)[.)]\s+(.+)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                  {numMatch[1]}
                </span>
                <span className="flex-1">{numMatch[2].replace(/[*#_~`]/g, '')}</span>
              </div>
            );
          }

          // Header
          if (trimmed.startsWith('#') || trimmed.endsWith(':')) {
            return (
              <p key={idx} className="font-bold text-emerald-700 dark:text-emerald-300 pt-1">
                {trimmed.replace(/^[#\s]+/, '').replace(/[*_~`]/g, '')}
              </p>
            );
          }

          return (
            <p key={idx}>
              {trimmed.replace(/[*_~`]/g, '')}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`w-full rounded-3xl border transition-all duration-300 overflow-hidden shadow-2xl flex flex-col ${
      highContrast
        ? 'bg-black text-amber-300 border-amber-500'
        : isDarkMode
          ? 'bg-[#0c1219] text-slate-100 border-emerald-500/20'
          : 'bg-white text-slate-900 border-emerald-500/20'
    }`} style={{ minHeight: '680px' }}>
      
      {/* Top Companion Header */}
      <div className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-4 ${
        highContrast
          ? 'bg-zinc-950 border-amber-500/50'
          : isDarkMode
            ? 'bg-gradient-to-r from-emerald-950/70 via-[#0d1c18] to-slate-950 border-emerald-500/20'
            : 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border-emerald-100'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
              ♿
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
                <span>Arohi Saksham</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                  Divyangjan Persona
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Natural Spoken Companion · All Government Welfare Schemes · 150+ Languages
            </p>
          </div>
        </div>

        {/* Accessibility & Voice Toggles */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Live Voice Call Button */}
          <button
            type="button"
            onClick={isLiveCallActive ? endLiveVoiceCall : startLiveVoiceCall}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isLiveCallActive 
                ? 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90'
            }`}
            title="Start hands-free voice dialogue"
          >
            {isLiveCallActive ? <PhoneOff className="w-3.5 h-3.5" /> : <PhoneCall className="w-3.5 h-3.5" />}
            <span>{isLiveCallActive ? 'End Live Talk' : 'Talk with Voice'}</span>
          </button>

          {/* Auto Read Aloud Toggle */}
          <button
            type="button"
            onClick={() => {
              setAutoReadAloud(!autoReadAloud);
              if (autoReadAloud) stopArohiVoice();
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1 cursor-pointer ${
              autoReadAloud
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                : 'bg-transparent text-slate-500 border-slate-300 dark:border-slate-700'
            }`}
            title="Toggle automatic speech readout for responses"
          >
            {autoReadAloud ? <Volume2 className="w-3.5 h-3.5 text-emerald-500" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline">{autoReadAloud ? 'Voice ON' : 'Voice Muted'}</span>
          </button>

          {/* Large Text Size Toggle */}
          <button
            type="button"
            onClick={() => setLargeTextMode(!largeTextMode)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1 cursor-pointer ${
              largeTextMode
                ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
                : 'bg-transparent text-slate-500 border-slate-300 dark:border-slate-700'
            }`}
            title="Toggle larger typography for visual comfort"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{largeTextMode ? 'Large' : 'Normal'}</span>
          </button>
        </div>
      </div>

      {/* Live Voice Call Simulation Banner if active */}
      {isLiveCallActive && (
        <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-4 border-b border-emerald-500/40 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center animate-ping">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Live Hands-Free Conversation Active
              </p>
              <p className="text-sm font-medium line-clamp-1">
                {liveCallTranscript || 'Listening to your voice...'}
              </p>
            </div>
          </div>
          <button
            onClick={endLiveVoiceCall}
            className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold"
          >
            Hang Up
          </button>
        </div>
      )}

      {/* Quick Prompts Bar */}
      <div className="p-3 sm:p-4 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Instant Divyangjan Schemes &amp; Rights Queries:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(qp.prompt)}
              className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>{qp.icon}</span>
              <span>{qp.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[480px]">
        {messages.map((m) => {
          const isArohi = m.sender === 'arohi';
          const isSpeakingThis = activeSpeakingMsgId === m.id;

          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isArohi ? 'justify-start' : 'justify-end'}`}
            >
              {isArohi && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center text-base shrink-0 shadow-sm mt-1">
                  ♿
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-sm transition-all ${
                isArohi
                  ? highContrast
                    ? 'bg-zinc-900 border-2 border-amber-400 text-amber-200'
                    : isDarkMode
                      ? 'bg-[#131b24] border border-white/8 text-slate-100'
                      : 'bg-emerald-50/70 border border-emerald-200/60 text-slate-900'
                  : highContrast
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium'
              }`}>
                {/* Header line for Arohi message */}
                {isArohi && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-black/5 dark:border-white/5">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Arohi Saksham Companion
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleReadAloud(m.id, m.text)}
                        className={`p-1 rounded-lg transition-all cursor-pointer ${
                          isSpeakingThis
                            ? 'bg-emerald-500 text-white animate-pulse'
                            : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500'
                        }`}
                        title={isSpeakingThis ? 'Stop voice readout' : 'Read aloud with Arohi voice'}
                      >
                        {isSpeakingThis ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(m.id, m.text)}
                        className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 transition-all cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Message Body */}
                {renderFormattedText(m.text)}

                {/* Timestamp */}
                <div className={`mt-2 text-[10px] text-right ${
                  isArohi ? 'text-slate-400' : 'text-emerald-100'
                }`}>
                  {m.timestamp}
                </div>
              </div>

              {!isArohi && (
                <div className="w-9 h-9 rounded-xl bg-slate-700 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm mt-1">
                  You
                </div>
              )}
            </div>
          );
        })}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center text-base shrink-0 shadow-sm">
              ♿
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-300 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
              <span>Arohi is formulating step-by-step Divyangjan assistance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className={`p-4 border-t ${
        highContrast
          ? 'bg-zinc-950 border-amber-500/50'
          : isDarkMode
            ? 'bg-[#0d141b] border-white/8'
            : 'bg-slate-50 border-slate-200'
      }`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Speech-to-Text Microphone Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-3 rounded-2xl transition-all cursor-pointer shadow-sm shrink-0 ${
              speechRecognitionActive
                ? 'bg-rose-600 text-white animate-pulse shadow-rose-500/30'
                : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
            }`}
            title="Speak your question hands-free"
          >
            {speechRecognitionActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about UDID, ADIP free aids, 4% jobs, scribe rules, loans..."
            className={`flex-1 px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none ${
              highContrast
                ? 'bg-black text-amber-300 border-amber-500 focus:border-amber-300'
                : isDarkMode
                  ? 'bg-[#151e28] text-white border-white/10 focus:border-emerald-500/60'
                  : 'bg-white text-slate-900 border-slate-300 focus:border-emerald-500'
            }`}
          />

          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
              !input.trim() || isThinking
                ? 'bg-slate-400/40 text-slate-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20'
            }`}
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-1 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Arohi Voice Engine (24kHz HD Neural Studio) Active</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://www.swavlambancard.gov.in" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-emerald-500 flex items-center gap-0.5 underline decoration-emerald-500/40"
            >
              <span>swavlambancard.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <a 
              href="https://disabilityaffairs.gov.in" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-emerald-500 flex items-center gap-0.5 underline decoration-emerald-500/40"
            >
              <span>disabilityaffairs.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
