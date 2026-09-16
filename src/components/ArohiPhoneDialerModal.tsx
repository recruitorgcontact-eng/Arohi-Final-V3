import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  X,
  Copy,
  Check,
  Globe,
  Settings,
  ShieldCheck,
  ChevronRight,
  Info,
  Hash,
  Download,
  FileText,
  RefreshCw,
  Zap,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArohiPhoneDialerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultNumber?: string;
  defaultTopic?: string;
  defaultLanguage?: string;
}

interface CallTurn {
  speaker: 'user' | 'arohi';
  text: string;
  timestamp: string;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', placeholder: '98765 43210' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸', placeholder: '202 555 0123' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', placeholder: '7911 123456' },
  { code: '+971', country: 'UAE', flag: '🇦🇪', placeholder: '50 123 4567' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', placeholder: '8123 4567' },
  { code: '+61', country: 'Australia', flag: '🇦🇺', placeholder: '412 345 678' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', placeholder: '151 23456789' }
];

const TOPIC_PRESETS = [
  {
    id: 'lead_followup',
    title: 'Customer Advisory & Lead Qualification',
    description: 'Instant follow-up call to qualify customer budget, timeline, and decision-making authority.'
  },
  {
    id: 'inbound_receptionist',
    title: 'Inbound Front-Desk & Booking',
    description: 'Autonomous receptionist answering business FAQs, verifying details, and booking meetings.'
  },
  {
    id: 'payment_followup',
    title: 'Payment & Dues Recovery Reminder',
    description: 'Courteous telephonic reminder regarding pending invoice dues, offering instant UPI link.'
  },
  {
    id: 'customer_feedback',
    title: 'Customer Satisfaction & NPS Survey',
    description: 'Autonomous feedback call to measure service satisfaction, gather ratings, and resolve issues.'
  },
  {
    id: 'career_advisory',
    title: 'Career & Resume Advisory',
    description: 'Arohi calls to guide the candidate on job applications, interview prep, and high-impact skills.'
  },
  {
    id: 'mission87',
    title: 'Mission 87 Earning Cadre',
    description: 'Walkthrough on sovereign earning ladders (₹5k - ₹1L+/month), digital services, and micro-production.'
  },
  {
    id: 'divyangjan',
    title: 'Divyangjan Schemes & PwD Support',
    description: 'Clear information on UDID cards, ADIP appliance schemes, 4% job reservations, and NHFDC loans.'
  },
  {
    id: 'business_loans',
    title: 'Business Setup & MUDRA / PMEGP Loans',
    description: 'Step-by-step guidance on setting up small-batch manufacturing, solar plants, and bank subsidies.'
  },
  {
    id: 'custom',
    title: 'Custom Spoken Conversation',
    description: 'Open human-like telephone conversation on any custom topic you specify.'
  }
];

const LANGUAGES = [
  { code: 'hi', name: 'Hindi (हिंदी)', greeting: 'नमस्ते! मैं आरोही हूँ।' },
  { code: 'en', name: 'English', greeting: 'Hello! I am Arohi.' },
  { code: 'or', name: 'Odia (ଓଡ଼ିଆ)', greeting: 'ନମସ୍କାର! ମୁଁ ଆରୋହୀ।' },
  { code: 'bn', name: 'Bengali (বাংলা)', greeting: 'নমস্কার! আমি আরোহী।' },
  { code: 'te', name: 'Telugu (తెలుగు)', greeting: 'నమస్కారం! నేను ఆరోహి.' },
  { code: 'ta', name: 'Tamil (தமிழ்)', greeting: 'வணக்கம்! நான் ஆரோஹி.' },
  { code: 'mr', name: 'Marathi (मराठी)', greeting: 'नमस्कार! मी आरोही आहे.' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)', greeting: 'નમસ્તે! હું આરોહી છું.' },
  { code: 'hinglish', name: 'Hinglish (Hindi + English)', greeting: 'Hi! Main Arohi bol rahi hoon.' }
];

const KEYPAD_BUTTONS = [
  { digit: '1', letters: '' },
  { digit: '2', letters: 'ABC' },
  { digit: '3', letters: 'DEF' },
  { digit: '4', letters: 'GHI' },
  { digit: '5', letters: 'JKL' },
  { digit: '6', letters: 'MNO' },
  { digit: '7', letters: 'PQRS' },
  { digit: '8', letters: 'TUV' },
  { digit: '9', letters: 'WXYZ' },
  { digit: '*', letters: '' },
  { digit: '0', letters: '+' },
  { digit: '#', letters: '' }
];

export default function ArohiPhoneDialerModal({
  isOpen,
  onClose,
  defaultNumber = '',
  defaultTopic = 'career_advisory',
  defaultLanguage = 'hi'
}: ArohiPhoneDialerModalProps) {
  // Config state
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState(defaultNumber);
  const [customerName, setCustomerName] = useState('Rahul');
  const [selectedTopic, setSelectedTopic] = useState(defaultTopic);
  const [customTopicPrompt, setCustomTopicPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  // Visual Theme: Primarily bright (clean, high-contrast light mode) by default, with dark mode toggle
  const [themeMode, setThemeMode] = useState<'bright' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('arohi_dialer_theme');
      return saved === 'dark' ? 'dark' : 'bright';
    } catch {
      return 'bright';
    }
  });

  const toggleTheme = () => {
    setThemeMode(prev => {
      const next = prev === 'bright' ? 'dark' : 'bright';
      try {
        localStorage.setItem('arohi_dialer_theme', next);
      } catch {}
      return next;
    });
  };

  const isBright = themeMode === 'bright';

  // Telephony backend status
  const [telephonyStatus, setTelephonyStatus] = useState<any>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  // Call lifecycle state: 'idle' | 'calling' | 'ringing' | 'connected' | 'ended'
  const [callState, setCallState] = useState<'idle' | 'calling' | 'ringing' | 'connected' | 'ended'>('idle');
  const [callSid, setCallSid] = useState<string>('');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showKeypad, setShowKeypad] = useState(false);
  const [dialedDigits, setDialedDigits] = useState('');
  const [textInput, setTextInput] = useState('');
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  // Active call audio and transcripts
  const [activeCallMode, setActiveCallMode] = useState<'real_phone' | 'simulator'>('real_phone');
  const [speakerStatus, setSpeakerStatus] = useState<'arohi_speaking' | 'listening' | 'idle'>('idle');
  const [turns, setTurns] = useState<CallTurn[]>([]);
  const [liveTranscript, setLiveTranscript] = useState('');

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const timerRef = useRef<any>(null);
  const pollIntervalRef = useRef<any>(null);

  // Fetch telephony configuration status from backend
  useEffect(() => {
    if (isOpen) {
      fetchTelephonyStatus();
    }
  }, [isOpen]);

  const fetchTelephonyStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const res = await fetch('/api/telephony/status');
      if (res.ok) {
        const data = await res.json();
        setTelephonyStatus(data);
        const verified = data.providers?.twilio?.verifiedNumbers;
        if (Array.isArray(verified) && verified.length > 0) {
          const firstNum = verified[0];
          if (firstNum.startsWith('+91')) {
            setCountryCode('+91');
            setPhoneNumber(firstNum.replace('+91', '').trim());
          } else {
            setPhoneNumber(firstNum.trim());
          }
        }
      }
    } catch (e) {
      console.warn('Error checking telephony status:', e);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  // Play DTMF tones using Web Audio API
  const playDtmfTone = (digit: string) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const dtmfFrequencies: Record<string, [number, number]> = {
        '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
        '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
        '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
        '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
      };

      const freqs = dtmfFrequencies[digit];
      if (freqs) {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.value = freqs[0];
        osc2.frequency.value = freqs[1];
        gain.gain.value = 0.15;

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        setTimeout(() => {
          osc1.stop();
          osc2.stop();
          ctx.close();
        }, 120);
      }
    } catch (e) {}
  };

  // Play realistic ringing tone
  const playRingtone = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      // Standard Indian/UK ringback: 400Hz + 450Hz
      osc1.frequency.value = 400;
      osc2.frequency.value = 450;
      gain.gain.value = 0.08;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      setTimeout(() => {
        osc1.stop();
        osc2.stop();
        ctx.close();
      }, 1400);
    } catch (e) {}
  };

  // Timer effect for active call
  useEffect(() => {
    if (callState === 'connected') {
      setCallDuration(0);
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  // Clean up on unmount or close
  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Trigger outbound call
  const handleInitiateCall = async (mode: 'real_phone' | 'simulator') => {
    let cleanNum = phoneNumber.replace(/[\s\-\(\)]/g, '');
    if (cleanNum.startsWith('+91')) {
      cleanNum = cleanNum.slice(3);
    } else if (cleanNum.startsWith('91') && cleanNum.length === 12) {
      cleanNum = cleanNum.slice(2);
    } else if (cleanNum.startsWith('0') && cleanNum.length === 11) {
      cleanNum = cleanNum.slice(1);
    }

    const fullNumber = `${countryCode}${cleanNum}`;
    if (!cleanNum || cleanNum.length < 5) {
      alert('Please enter a valid telephone number.');
      return;
    }

    setActiveCallMode(mode);
    setCallState('calling');
    setTurns([]);
    setLiveTranscript('');

    const activeTopicObj = TOPIC_PRESETS.find(t => t.id === selectedTopic);
    const topicText = selectedTopic === 'custom' ? customTopicPrompt : activeTopicObj?.title;

    try {
      const res = await fetch('/api/telephony/outbound-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: fullNumber,
          customerName,
          topic: topicText,
          language: selectedLanguage,
          persona: 'Arohi Voice Agent',
          provider: mode === 'real_phone' ? 'auto' : 'simulator'
        })
      });

      const data = await res.json();
      if (data.success) {
        setCallSid(data.callSid);
        setCallState('ringing');
        playRingtone();

        if (mode === 'real_phone') {
          // Poll real telephone call status and transcripts
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = setInterval(async () => {
            try {
              const pollRes = await fetch('/api/telephony/calls');
              if (pollRes.ok) {
                const pollData = await pollRes.json();
                const currentCall = pollData.calls?.find((c: any) => c.callSid === data.callSid);
                if (currentCall) {
                  if (currentCall.status === 'in-progress' || currentCall.status === 'connected') {
                    setCallState('connected');
                  } else if (currentCall.status === 'completed' || currentCall.status === 'busy' || currentCall.status === 'no-answer') {
                    setCallState('ended');
                    if (pollIntervalRef.current) {
                      clearInterval(pollIntervalRef.current);
                      pollIntervalRef.current = null;
                    }
                  }
                  if (Array.isArray(currentCall.transcripts) && currentCall.transcripts.length > 0) {
                    setTurns(currentCall.transcripts);
                  }
                }
              }
            } catch (err) {}
          }, 2000);
        } else {
          // Connect audio stream for browser simulator
          setTimeout(() => {
            connectLivePhoneStream(data.callSid, fullNumber, topicText);
          }, 1800);
        }
      } else {
        alert(data.error || 'Failed to place call');
        setCallState('idle');
      }
    } catch (e: any) {
      console.error('Call initiation error:', e);
      setCallState('idle');
    }
  };

  // Connect to /ws/phone-stream for live speech-to-speech interaction
  const connectLivePhoneStream = (currentCallSid: string, phone: string, topicText?: string) => {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/phone-stream`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[Phone Dialer] Connected to Telephony Media WebSocket');
        setCallState('connected');

        // Send standard Telephony start handshake
        ws.send(JSON.stringify({
          event: 'start',
          streamSid: `STREAM_${Date.now()}`,
          start: {
            streamSid: `STREAM_${Date.now()}`,
            callSid: currentCallSid,
            customParameters: {
              callerName: customerName,
              to: phone,
              topic: topicText || 'Telephonic Advisory',
              language: selectedLanguage,
              persona: 'Arohi AI Voice Guide'
            }
          }
        }));

        // Start microphone capture for user audio
        startMicrophoneCapture(ws);
      };

      ws.onmessage = async (event) => {
        try {
          const packet = JSON.parse(event.data);
          if (packet.event === 'media' && packet.media?.payload) {
            setSpeakerStatus('arohi_speaking');
            playUlawAudio(packet.media.payload);
          } else if (packet.event === 'clear') {
            setSpeakerStatus('listening');
          }
        } catch (e) {}
      };

      ws.onerror = (err) => {
        console.warn('[Phone Dialer WS Notice]:', err);
      };

      ws.onclose = () => {
        console.log('[Phone Dialer WS] Stream disconnected');
        if (callState === 'connected') {
          setCallState('ended');
        }
      };
    } catch (e) {
      console.error('Error opening phone stream:', e);
    }
  };

  // Play incoming 8kHz u-law audio chunks from telephony bridge
  const playUlawAudio = (base64Ulaw: string) => {
    try {
      if (!isSpeakerOn) return;

      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 8000 });
      }

      const rawUlaw = atob(base64Ulaw);
      const len = rawUlaw.length;
      const audioCtx = audioContextRef.current;
      const audioBuffer = audioCtx.createBuffer(1, len, 8000);
      const channelData = audioBuffer.getChannelData(0);

      // Fast u-law decode in browser
      for (let i = 0; i < len; i++) {
        let u = ~rawUlaw.charCodeAt(i) & 0xff;
        let t = ((u & 0x0f) << 3) + 0x84;
        t <<= (u & 0x70) >> 4;
        let pcm = (u & 0x80) ? (0x84 - t) : (t - 0x84);
        channelData[i] = pcm / 32768.0;
      }

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();

      source.onended = () => {
        setSpeakerStatus('listening');
      };
    } catch (e) {}
  };

  // Capture user microphone and stream 8kHz u-law chunks to telephony bridge
  const startMicrophoneCapture = async (ws: WebSocket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 8000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 8000 });
      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(1024, 1, 1);

      processor.onaudioprocess = (e) => {
        if (isMuted || ws.readyState !== WebSocket.OPEN) return;

        const inputData = e.inputBuffer.getChannelData(0);
        let hasVoice = false;

        // Convert PCM float [-1, 1] to 8-bit u-law
        const ulawBytes = new Uint8Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          let s = Math.max(-1, Math.min(1, inputData[i])) * 32767;
          if (Math.abs(s) > 800) hasVoice = true;

          // Encode to u-law
          const BIAS = 0x84;
          const CLIP = 32635;
          let sign = (s < 0) ? 0x80 : 0;
          if (s < 0) s = -s;
          if (s > CLIP) s = CLIP;
          s += BIAS;

          let exponent = 7;
          for (let expMask = 0x4000; (s & expMask) === 0 && exponent > 0; expMask >>= 1) {
            exponent--;
          }
          let mantissa = (s >> (exponent + 3)) & 0x0f;
          ulawBytes[i] = ~(sign | (exponent << 4) | mantissa) & 0xff;
        }

        if (hasVoice) {
          setSpeakerStatus('listening');
        }

        // Base64 encode and send to phone stream
        let binary = '';
        for (let i = 0; i < ulawBytes.length; i++) {
          binary += String.fromCharCode(ulawBytes[i]);
        }
        const base64 = btoa(binary);

        ws.send(JSON.stringify({
          event: 'media',
          media: {
            payload: base64
          }
        }));
      };

      source.connect(processor);
      processor.connect(audioCtx.destination);
    } catch (e) {
      console.warn('Microphone permission not granted for call:', e);
    }
  };

  // End active call
  const endCall = () => {
    if (wsRef.current) {
      try {
        wsRef.current.send(JSON.stringify({ event: 'stop' }));
        wsRef.current.close();
      } catch (e) {}
      wsRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (e) {}
      audioContextRef.current = null;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }

    setCallState('ended');
    setSpeakerStatus('idle');
  };

  // Send typed text to call (if user prefers typing or in noisy surroundings)
  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || !wsRef.current) return;

    wsRef.current.send(JSON.stringify({
      event: 'user_text_input',
      text: textInput.trim()
    }));

    setTurns(prev => [
      ...prev,
      { speaker: 'user', text: textInput.trim(), timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setTextInput('');
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 transition-colors duration-200 ${
      isBright ? 'bg-slate-900/50 backdrop-blur-sm' : 'bg-black/80 backdrop-blur-md'
    }`}>
      <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-200 ${
        isBright
          ? 'bg-white border border-slate-200 text-slate-900 ring-1 ring-slate-900/5'
          : 'bg-[#0f172a] border border-slate-700 text-white'
      }`}>
        
        {/* TOP BAR */}
        <div className={`flex items-center justify-between px-6 py-4 border-b transition-colors ${
          isBright
            ? 'border-slate-200 bg-slate-50/90 text-slate-900'
            : 'border-slate-800 bg-slate-900/90 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
              isBright
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 shadow-xs'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}>
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold tracking-tight flex items-center gap-2 ${
                isBright ? 'text-slate-900' : 'text-white'
              }`}>
                Arohi Phone Calling
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isBright
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  GSM / VoLTE Live
                </span>
              </h2>
              <p className={`text-xs font-medium ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                Direct speech-to-speech calling to any mobile number
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Theme Toggle Button: Bright vs Dark */}
            <button
              onClick={toggleTheme}
              title={isBright ? "Switch to Dark Mode" : "Switch to Bright Mode"}
              aria-label="Toggle Bright / Dark UI"
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                isBright
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-amber-300'
              }`}
            >
              {isBright ? (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="hidden sm:inline text-[11px]">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline text-[11px]">Bright</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowConfigGuide(!showConfigGuide)}
              title="Telephony Credentials & Setup"
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                showConfigGuide
                  ? (isBright ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300')
                  : (isBright ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600' : 'hover:bg-slate-800 border-transparent text-slate-400')
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => { endCall(); onClose(); }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isBright
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 hover:text-slate-900'
                  : 'hover:bg-slate-800 border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className={`p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar transition-colors ${
          isBright ? 'bg-white' : 'bg-[#0f172a]'
        }`}>

          {/* CREDENTIALS GUIDANCE BANNER */}
          {showConfigGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 rounded-2xl border text-xs space-y-2.5 transition-colors ${
                isBright
                  ? 'bg-indigo-50/70 border-indigo-200 text-slate-800'
                  : 'bg-indigo-950/40 border-indigo-500/30 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className={`flex items-center gap-1.5 ${isBright ? 'text-indigo-900' : 'text-indigo-300'}`}>
                  <ShieldCheck className="w-4 h-4" /> Telephony Carrier Integration
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                  isBright
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-800'
                    : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                }`}>
                  Twilio & Exotel Bridge
                </span>
              </div>
              <p className={`leading-relaxed ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                Arohi AI connects to telecom carriers via standard WebSockets (<code className={`font-semibold ${isBright ? 'text-emerald-700' : 'text-emerald-300'}`}>/ws/phone-stream</code>). Audio is transcoded between <strong>8kHz G.711 μ-law</strong> and Arohi's real-time multimodal audio engine.
              </p>
              <div className={`p-2.5 rounded-xl border font-mono text-[11px] space-y-1 ${
                isBright ? 'bg-white border-indigo-200 text-indigo-950 font-semibold shadow-xs' : 'bg-black/40 border-white/5 text-slate-300'
              }`}>
                <div>TWILIO_ACCOUNT_SID=your_account_sid</div>
                <div>TWILIO_AUTH_TOKEN=your_auth_token</div>
                <div>TWILIO_PHONE_NUMBER=+1xxxxxxxxxx</div>
              </div>
              <p className={`text-[11px] ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
                Don't have Twilio credentials yet? You can still test phone calls immediately using the <strong>Live Phone Simulator</strong> below!
              </p>
            </motion.div>
          )}

          {/* VIEW A: DIALER SETUP FORM */}
          {callState === 'idle' && (
            <div className="space-y-4">
              {/* Phone Number Input */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  isBright ? 'text-slate-800' : 'text-slate-200'
                }`}>
                  Recipient Telephone Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none transition-all cursor-pointer ${
                      isBright
                        ? 'bg-slate-50 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 shadow-xs'
                        : 'bg-slate-800 border border-slate-700 text-white focus:border-emerald-500'
                    }`}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code} className={isBright ? "bg-white text-slate-900 font-medium" : "bg-slate-900 text-white font-medium"}>
                        {c.flag} {c.code} ({c.country})
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter 10-digit phone number"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none transition-all font-mono tracking-wider ${
                        isBright
                          ? 'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 shadow-xs'
                          : 'bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Verified Numbers Badge */}
                {telephonyStatus?.providers?.twilio?.verifiedNumbers?.length > 0 && (
                  <div className={`mt-2.5 p-3 rounded-xl flex items-center justify-between border transition-colors ${
                    isBright
                      ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950 shadow-xs'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <div className={`text-xs font-bold flex items-center gap-1 ${
                          isBright ? 'text-emerald-900' : 'text-emerald-300'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Twilio Verified Recipient Number
                        </div>
                        <div className={`text-[11px] font-mono font-bold ${
                          isBright ? 'text-emerald-800' : 'text-slate-300'
                        }`}>
                          {telephonyStatus.providers.twilio.verifiedNumbers[0]}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const verified = telephonyStatus.providers.twilio.verifiedNumbers[0];
                        if (verified.startsWith('+91')) {
                          setCountryCode('+91');
                          setPhoneNumber(verified.replace('+91', '').trim());
                        } else {
                          setPhoneNumber(verified.trim());
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        isBright
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      Fill This Number
                    </button>
                  </div>
                )}
              </div>

              {/* Recipient Name */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  isBright ? 'text-slate-800' : 'text-slate-200'
                }`}>
                  Recipient Name (Caller Identity)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none transition-all ${
                    isBright
                      ? 'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 shadow-xs'
                      : 'bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500'
                  }`}
                />
              </div>

              {/* Spoken Language */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between ${
                  isBright ? 'text-slate-800' : 'text-slate-200'
                }`}>
                  <span>Spoken Conversation Language</span>
                  <span className={`text-[11px] font-bold ${isBright ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    150+ Multilingual
                  </span>
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none transition-all cursor-pointer ${
                    isBright
                      ? 'bg-white border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 shadow-xs'
                      : 'bg-slate-800 border border-slate-700 text-white focus:border-emerald-500'
                  }`}
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className={isBright ? "bg-white text-slate-900 font-medium" : "bg-slate-900 text-white font-medium"}>
                      {lang.name} — "{lang.greeting}"
                    </option>
                  ))}
                </select>
              </div>

              {/* Call Topic / Persona */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  isBright ? 'text-slate-800' : 'text-slate-200'
                }`}>
                  Call Objective & Persona
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TOPIC_PRESETS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTopic(t.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                        selectedTopic === t.id
                          ? isBright
                            ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 shadow-sm ring-1 ring-emerald-500/20'
                            : 'bg-emerald-500/20 border-2 border-emerald-400 text-white shadow-lg shadow-emerald-950/40'
                          : isBright
                            ? 'bg-slate-50/80 hover:bg-slate-100 border border-slate-200 text-slate-800 hover:border-slate-300 shadow-xs'
                            : 'bg-slate-800/60 border border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className={`font-bold mb-1 flex items-center gap-1.5 ${
                        selectedTopic === t.id
                          ? (isBright ? 'text-emerald-950' : 'text-emerald-300')
                          : (isBright ? 'text-slate-900' : 'text-white')
                      }`}>
                        {selectedTopic === t.id && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        {t.title}
                      </span>
                      <span className={`text-[11px] line-clamp-2 leading-relaxed ${
                        selectedTopic === t.id
                          ? (isBright ? 'text-emerald-800 font-medium' : 'text-emerald-200')
                          : (isBright ? 'text-slate-600' : 'text-slate-400')
                      }`}>
                        {t.description}
                      </span>
                    </button>
                  ))}
                </div>

                {selectedTopic === 'custom' && (
                  <div className="mt-2.5">
                    <textarea
                      value={customTopicPrompt}
                      onChange={(e) => setCustomTopicPrompt(e.target.value)}
                      placeholder="Describe what Arohi should talk about during this phone call..."
                      className={`w-full p-3.5 rounded-xl text-xs font-medium focus:outline-none transition-all h-20 ${
                        isBright
                          ? 'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 shadow-xs'
                          : 'bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => handleInitiateCall('real_phone')}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Real Phone (GSM/VoLTE)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleInitiateCall('simulator')}
                  className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isBright
                      ? 'bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 shadow-xs'
                      : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Test in Browser Simulator</span>
                </button>
              </div>
            </div>
          )}

          {/* VIEW B: ACTIVE TELEPHONE CALL SCREEN */}
          {(callState === 'calling' || callState === 'ringing' || callState === 'connected' || callState === 'ended') && (
            <div className="flex flex-col items-center justify-center py-4 space-y-6">

              {/* CALLING AVATAR & RIPPLE ANIMATION */}
              <div className="relative flex items-center justify-center">
                {(callState === 'ringing' || callState === 'connected') && (
                  <div className="absolute w-36 h-36 rounded-full bg-emerald-500/20 animate-ping opacity-60 pointer-events-none" />
                )}
                {(speakerStatus === 'arohi_speaking') && (
                  <div className="absolute w-44 h-44 rounded-full bg-fuchsia-500/20 animate-pulse pointer-events-none" />
                )}
                
                <div className={`relative w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all ${
                  speakerStatus === 'arohi_speaking'
                    ? (isBright ? 'border-fuchsia-500 bg-fuchsia-100 shadow-[0_0_30px_rgba(217,70,239,0.3)]' : 'border-fuchsia-400 bg-fuchsia-950/40 shadow-[0_0_30px_rgba(217,70,239,0.4)]')
                    : speakerStatus === 'listening'
                    ? (isBright ? 'border-emerald-500 bg-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_30px_rgba(16,185,129,0.4)]')
                    : (isBright ? 'border-slate-300 bg-slate-100 shadow-md' : 'border-white/20 bg-slate-900')
                }`}>
                  <Phone className={`w-10 h-10 ${
                    callState === 'connected'
                      ? (isBright ? 'text-emerald-600' : 'text-emerald-400')
                      : (isBright ? 'text-slate-600' : 'text-slate-300')
                  }`} />
                </div>
              </div>

              {/* CALL STATUS & RECIPIENT */}
              <div className="text-center space-y-1">
                <h3 className={`text-xl font-bold tracking-tight ${isBright ? 'text-slate-900' : 'text-white'}`}>
                  {customerName || 'Telephone Caller'}
                </h3>
                <p className={`text-xs font-mono font-bold ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
                  {countryCode} {phoneNumber}
                </p>

                <div className="pt-2 flex items-center justify-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    callState === 'connected'
                      ? 'bg-emerald-500 animate-pulse'
                      : callState === 'ringing'
                      ? 'bg-amber-500 animate-bounce'
                      : 'bg-rose-500'
                  }`} />
                  <span className={`text-xs font-bold ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                    {callState === 'calling' && 'Connecting to telecom carrier network...'}
                    {callState === 'ringing' && 'Ringing telephone handset...'}
                    {callState === 'connected' && (
                      speakerStatus === 'arohi_speaking'
                        ? 'Arohi Speaking...'
                        : 'Arohi Listening to you...'
                    )}
                    {callState === 'ended' && 'Call Disconnected'}
                  </span>
                </div>

                {activeCallMode === 'real_phone' && (callState === 'calling' || callState === 'ringing' || callState === 'connected') && (
                  <div className={`mt-3 mx-auto max-w-sm p-3.5 rounded-2xl border text-center space-y-1 ${
                    isBright
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  }`}>
                    <div className={`text-xs font-bold flex items-center justify-center gap-1.5 ${
                      isBright ? 'text-emerald-900' : 'text-emerald-300'
                    }`}>
                      <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                      Live Cellular/VoLTE Call Placed
                    </div>
                    <p className={`text-xs leading-snug ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                      Your phone <strong className={`font-mono font-bold ${isBright ? 'text-emerald-950' : 'text-white'}`}>{countryCode} {phoneNumber}</strong> is ringing! Answer on your mobile handset to speak directly with Arohi.
                    </p>
                  </div>
                )}

                {callState === 'connected' && (
                  <div className={`text-base font-mono font-bold pt-1 ${
                    isBright ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    {formatDuration(callDuration)}
                  </div>
                )}
              </div>

              {/* IN-CALL DIALPAD TOGGLE & BUTTONS */}
              {showKeypad && callState === 'connected' && (
                <div className={`w-full max-w-xs p-3 rounded-2xl border ${
                  isBright ? 'bg-slate-50 border-slate-200 shadow-sm' : 'bg-white/[0.04] border-white/10'
                }`}>
                  <div className={`text-center text-sm font-mono h-6 tracking-widest mb-2 font-bold ${
                    isBright ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>
                    {dialedDigits || 'Press digits for IVR'}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {KEYPAD_BUTTONS.map((btn) => (
                      <button
                        key={btn.digit}
                        onClick={() => {
                          setDialedDigits(prev => prev + btn.digit);
                          playDtmfTone(btn.digit);
                        }}
                        className={`py-2.5 rounded-xl font-mono font-bold text-base flex flex-col items-center justify-center active:scale-95 transition-all cursor-pointer ${
                          isBright
                            ? 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 shadow-xs'
                            : 'bg-white/[0.06] hover:bg-white/[0.14] text-white'
                        }`}
                      >
                        <span>{btn.digit}</span>
                        {btn.letters && <span className={`text-[8px] font-sans font-medium ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>{btn.letters}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* IN-CALL ACTION CONTROLS */}
              {callState === 'connected' && (
                <div className="flex items-center gap-4">
                  {/* Mute Toggle */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isMuted
                        ? 'bg-rose-500/20 border-rose-500 text-rose-500'
                        : isBright
                        ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                        : 'bg-white/[0.06] border-white/10 text-white hover:bg-white/15'
                    }`}
                    title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  {/* Speaker Toggle */}
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      !isSpeakerOn
                        ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                        : isBright
                        ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                        : 'bg-white/[0.06] border-white/10 text-white hover:bg-white/15'
                    }`}
                    title={isSpeakerOn ? 'Turn off speaker' : 'Turn on speaker'}
                  >
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>

                  {/* Keypad Button */}
                  <button
                    onClick={() => setShowKeypad(!showKeypad)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      showKeypad
                        ? 'bg-indigo-500/30 border-indigo-500 text-indigo-500'
                        : isBright
                        ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                        : 'bg-white/[0.06] border-white/10 text-white hover:bg-white/15'
                    }`}
                    title="Keypad for DTMF"
                  >
                    <Hash className="w-5 h-5" />
                  </button>

                  {/* End Call Button */}
                  <button
                    onClick={endCall}
                    className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 active:scale-95 transition-all cursor-pointer"
                    title="Hang Up"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* RECONNECT / CALL AGAIN BUTTON IF ENDED */}
              {callState === 'ended' && (
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setCallState('idle')}
                    className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Call Another Number</span>
                  </button>
                  <button
                    onClick={onClose}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold border cursor-pointer ${
                      isBright
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                        : 'bg-white/10 hover:bg-white/15 border-transparent text-white'
                    }`}
                  >
                    Close
                  </button>
                </div>
              )}

              {/* IN-CALL TEXT CHAT / TRANSCRIPT INPUT */}
              {callState === 'connected' && (
                <form onSubmit={handleSendText} className="w-full flex gap-2">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type to Arohi during the call..."
                    className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${
                      isBright
                        ? 'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 shadow-xs'
                        : 'bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={!textInput.trim()}
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* TRANSCRIPT TURNS PREVIEW */}
              {turns.length > 0 && (
                <div className={`w-full p-3.5 rounded-2xl border max-h-36 overflow-y-auto text-xs space-y-2 ${
                  isBright
                    ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
                    : 'bg-white/[0.03] border-white/10 text-slate-200'
                }`}>
                  <div className={`text-[10px] uppercase font-mono font-bold tracking-wider ${
                    isBright ? 'text-slate-500' : 'text-slate-400'
                  }`}>Live Call Transcripts</div>
                  {turns.map((t, idx) => (
                    <div key={idx} className="leading-relaxed">
                      <span className={`font-bold ${
                        t.speaker === 'arohi'
                          ? (isBright ? 'text-fuchsia-700' : 'text-fuchsia-400')
                          : (isBright ? 'text-emerald-700' : 'text-emerald-400')
                      }`}>
                        {t.speaker === 'arohi' ? 'Arohi: ' : 'You: '}
                      </span>
                      <span className={isBright ? 'text-slate-800 font-medium' : 'text-slate-200'}>{t.text}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className={`px-6 py-3.5 border-t flex items-center justify-between text-[11px] font-semibold transition-colors ${
          isBright
            ? 'border-slate-200 bg-slate-50/90 text-slate-600'
            : 'border-slate-800 bg-slate-900/90 text-slate-400'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Multimodal Live API Bridge (WebSockets)</span>
          </div>
          <span>Arohi Sovereign Voice</span>
        </div>

      </div>
    </div>
  );
}
