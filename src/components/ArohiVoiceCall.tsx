import React, { useState, useEffect, useRef } from 'react';
import { PhoneOff, Mic, MicOff, Radio, AlertCircle, X, MessageSquare, Maximize2, Minimize2, Copy, Check, Sparkles, User, Bot, Volume2, Bookmark, History, Download, Trash2, Save, Send, ThumbsUp, ThumbsDown, MoreHorizontal, MoreVertical, Video, VideoOff, Upload, Cast, Menu } from 'lucide-react';
import ArohiAvatar from './ArohiAvatar';
import { formatDuration, SpeechTurn } from '../lib/pdfGenerator';

interface SavedSnapshot {
  id: string;
  timestamp: string;
  title: string;
  text: string;
  turnsCount: number;
}

interface ArohiVoiceCallProps {
  onClose: () => void;
  language?: string;
  onNavigateTab?: (tab: string) => void;
  uid?: string;
  onCallComplete?: (summary: {
    duration: number;
    turns: SpeechTurn[];
    date: string;
    summaryText: string;
    analysis?: any;
  }) => void;
}

export default function ArohiVoiceCall({ onClose, language = 'en', onNavigateTab, uid, onCallComplete }: ArohiVoiceCallProps) {
  const [status, setStatus] = useState<'connecting' | 'listening' | 'speaking' | 'muted' | 'error' | 'ended'>('connecting');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const selectedVoice = 'Zypher'; // Preferred Zypher voice persona for Arohi
  const [activeLanguage, setActiveLanguage] = useState<string>(() => {
    if (language && language !== 'en') return language;
    return 'or'; // Default to Odia & Auto-Detect for India's regional warmth
  });
  const [sessionKey, setSessionKey] = useState(0);
  const reconnectAttemptsRef = useRef<number>(0);

  // Call duration & audio volume states
  const [duration, setDuration] = useState(0);
  const [userVolume, setUserVolume] = useState(0);
  const [currentSpeech, setCurrentSpeech] = useState('');
  const [textInput, setTextInput] = useState('');

  const DEFAULT_GREETING = "Namaste ji! Welcome to Arohi AI. I am Arohi, your loving friend and AI Opportunity Guide. Whether you are a student, teacher, doctor, scientist, government aspirant, parent, entrepreneur, or running an MSME — I am right here for you in Odia (ଓଡ଼ିଆ), Hindi (हिंदी), English, and 150+ languages with live voice calls. How can I empower you and fuel your journey today?";

  const [turns, setTurns] = useState<SpeechTurn[]>(() => [
    {
      speaker: 'arohi',
      text: DEFAULT_GREETING,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [liveUserSpeech, setLiveUserSpeech] = useState('');
  const [isExpandedTranscript, setIsExpandedTranscript] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [responseFeedback, setResponseFeedback] = useState<'liked' | 'disliked' | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [copiedResponseText, setCopiedResponseText] = useState(false);

  // Temporary Session History state
  const [savedSnapshots, setSavedSnapshots] = useState<SavedSnapshot[]>(() => {
    try {
      const stored = sessionStorage.getItem('arohi_session_history');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  const [showSessionHistory, setShowSessionHistory] = useState(false);
  const [copiedSnapshotId, setCopiedSnapshotId] = useState<string | null>(null);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Sync savedSnapshots to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('arohi_session_history', JSON.stringify(savedSnapshots));
    } catch (e) {}
  }, [savedSnapshots]);

  // Audio nodes and context refs
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);

  // Precise scheduling variables for gapless playback
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const isMutedRef = useRef<boolean>(false);
  const isNormalCloseRef = useRef<boolean>(false);
  const statusRef = useRef<string>(status);
  const hasReceivedAudioStreamRef = useRef<boolean>(false);

  // Sync status to ref
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Sync mute state to ref
  useEffect(() => {
    isMutedRef.current = isMuted;
    if (isMuted) {
      setStatus(prev => prev === 'listening' ? 'muted' : prev);
    } else {
      setStatus(prev => prev === 'muted' ? 'listening' : prev);
    }
  }, [isMuted]);

  // Handle continuous call duration timer
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Robust Browser Speech Recognition (Instant STT transcription as user speaks)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let isMounted = true;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition is not supported natively in this browser.');
      return;
    }

    const startRecognition = () => {
      if (!isMounted || statusRef.current === 'ended' || statusRef.current === 'error') return;

      try {
        if (speechRecognitionRef.current) {
          try { speechRecognitionRef.current.stop(); } catch (e) {}
          speechRecognitionRef.current = null;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        // Match chosen language
        const langMap: Record<string, string> = {
          hi: 'hi-IN',
          or: 'or-IN',
          bn: 'bn-IN',
          te: 'te-IN',
          ta: 'ta-IN',
          mr: 'mr-IN',
          gu: 'gu-IN',
          kn: 'kn-IN',
          ml: 'ml-IN',
          pa: 'pa-IN',
          ur: 'ur-IN',
          en: 'en-IN'
        };
        const targetLangCode = activeLanguage === 'auto' ? (language === 'or' ? 'or-IN' : 'hi-IN') : (langMap[activeLanguage] || langMap[language] || 'or-IN');
        recognition.lang = targetLangCode;

        let silenceTimer: any = null;

        recognition.onresult = (event: any) => {
          if (!isMounted || isMutedRef.current) return;

          // ECHO PREVENTION: Do NOT process or transcribe speech while Arohi is actively speaking out loud
          if (
            statusRef.current === 'speaking' || 
            audioQueueRef.current.length > 0 || 
            (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking)
          ) {
            return;
          }

          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const activeText = (finalTranscript || interimTranscript).trim();

          // FILTER NOISE ARTIFACTS OR ECHOED NUMBERS LIKE "150", "150+", "150 languages", "namaste"
          const cleanLower = activeText.toLowerCase();
          const isNumericEcho = /^(150|150\+|150 languages|languages|namaste|welcome|hello|\d{1,3})$/i.test(cleanLower);
          if (!activeText || isNumericEcho) return;

          setLiveUserSpeech(activeText);

          if (silenceTimer) clearTimeout(silenceTimer);

          const commitUserTurn = (text: string) => {
            if (!text) return;
            const textLower = text.toLowerCase().trim();
            if (/^(150|150\+|150 languages|languages|\d{1,3})$/i.test(textLower)) return;

            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              try {
                wsRef.current.send(JSON.stringify({ text: text }));
              } catch (e) {
                console.error('Error sending transcribed text prompt over WebSocket:', e);
              }
            }
            setTurns(prev => {
              const last = prev[prev.length - 1];
              if (last && last.speaker === 'user') {
                if (last.text === text || last.text.endsWith(text)) return prev;
                if (text.startsWith(last.text)) {
                  return [
                    ...prev.slice(0, -1),
                    { speaker: 'user', text: text, timestamp: last.timestamp }
                  ];
                }
                const updated = (last.text + ' ' + text).replace(/\s+/g, ' ').trim();
                return [
                  ...prev.slice(0, -1),
                  { speaker: 'user', text: updated, timestamp: last.timestamp }
                ];
              } else {
                return [
                  ...prev,
                  {
                    speaker: 'user',
                    text: text,
                    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                  }
                ];
              }
            });
          };

          if (finalTranscript.trim()) {
            commitUserTurn(finalTranscript.trim());
            setLiveUserSpeech('');
          } else {
            // Auto-commit interim transcript if user pauses for 1.2s
            silenceTimer = setTimeout(() => {
              if (isMounted && activeText) {
                commitUserTurn(activeText);
                setLiveUserSpeech('');
              }
            }, 1200);
          }
        };

        recognition.onerror = (err: any) => {
          console.warn('SpeechRecognition notice:', err?.error);
        };

        recognition.onend = () => {
          if (isMounted && !isMutedRef.current && statusRef.current !== 'ended' && statusRef.current !== 'error') {
            setTimeout(() => {
              if (isMounted && !isMutedRef.current && statusRef.current !== 'ended' && statusRef.current !== 'error') {
                try { recognition.start(); } catch (e) { startRecognition(); }
              }
            }, 300);
          }
        };

        try { recognition.start(); } catch (e) {}
        speechRecognitionRef.current = recognition;
      } catch (err) {
        console.warn('SpeechRecognition initialization notice:', err);
      }
    };

    startRecognition();

    return () => {
      isMounted = false;
      if (speechRecognitionRef.current) {
        try { speechRecognitionRef.current.stop(); } catch (e) {}
        speechRecognitionRef.current = null;
      }
    };
  }, [activeLanguage, language]);

  // Auto-scroll transcript log to bottom smoothly
  useEffect(() => {
    const scrollToBottom = () => {
      if (transcriptEndRef.current) {
        transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      if (transcriptContainerRef.current) {
        transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
      }
    };

    scrollToBottom();
    const timeoutId = setTimeout(scrollToBottom, 50);

    return () => clearTimeout(timeoutId);
  }, [turns, currentSpeech, liveUserSpeech, isExpandedTranscript, status]);

  const handleCopyTranscript = () => {
    if (turns.length === 0) return;
    const fullText = turns.map(t => `[${t.timestamp}] ${t.speaker === 'user' ? 'You' : 'Arohi'}: ${t.text}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  const showToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 2500);
  };

  // Save current conversation transcript snapshot
  const handleSaveSessionSnapshot = () => {
    if (turns.length === 0) {
      showToast('No speech transcript to save yet');
      return;
    }

    const fullText = turns.map(t => `[${t.timestamp}] ${t.speaker === 'user' ? 'You' : 'Arohi'}: ${t.text}`).join('\n\n');
    const newSnapshot: SavedSnapshot = {
      id: 'snap-' + Date.now(),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      title: `Call Snapshot (${turns.length} turns)`,
      text: fullText,
      turnsCount: turns.length
    };

    setSavedSnapshots(prev => [newSnapshot, ...prev]);
    showToast('Saved snapshot to Session History!');
  };

  // Save individual turn
  const handleSaveTurnSnippet = (turn: SpeechTurn) => {
    const snippetText = `[${turn.timestamp}] ${turn.speaker === 'user' ? 'You' : 'Arohi'}: ${turn.text}`;
    const newSnapshot: SavedSnapshot = {
      id: 'turn-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      timestamp: turn.timestamp,
      title: `${turn.speaker === 'user' ? 'User Note' : 'Arohi Response'}`,
      text: snippetText,
      turnsCount: 1
    };

    setSavedSnapshots(prev => [newSnapshot, ...prev]);
    showToast(`Saved ${turn.speaker === 'user' ? 'your note' : "Arohi's response"} to history`);
  };

  const handleDeleteSnapshot = (id: string) => {
    setSavedSnapshots(prev => prev.filter(s => s.id !== id));
    showToast('Removed item from history');
  };

  const handleCopySnapshotText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnapshotId(id);
    setTimeout(() => setCopiedSnapshotId(null), 2000);
  };

  // Convert Float32 array to 16-bit PCM
  const floatTo16BitPCM = (input: Float32Array): ArrayBuffer => {
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);
    let offset = 0;
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return buffer;
  };

  // Convert ArrayBuffer to Base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Play incoming audio chunks gaplessly
  const playAudioChunk = (base64Audio: string) => {
    const ctx = outputAudioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const binary = window.atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const numSamples = bytes.length / 2;
      const float32Data = new Float32Array(numSamples);
      const dataView = new DataView(bytes.buffer);

      for (let i = 0; i < numSamples; i++) {
        const pcm16 = dataView.getInt16(i * 2, true);
        float32Data[i] = pcm16 / 32768;
      }

      const audioBuffer = ctx.createBuffer(1, numSamples, 24000);
      audioBuffer.getChannelData(0).set(float32Data);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      let startTime = nextStartTimeRef.current;

      if (startTime < currentTime) {
        startTime = currentTime + 0.05;
      }

      source.start(startTime);
      audioQueueRef.current.push(source);

      nextStartTimeRef.current = startTime + audioBuffer.duration;
      setStatus('speaking');

      const durationMs = audioBuffer.duration * 1000;
      setTimeout(() => {
        if (ctx.currentTime >= nextStartTimeRef.current - 0.05) {
          setStatus(isMutedRef.current ? 'muted' : 'listening');
        }
      }, durationMs);

    } catch (err) {
      console.error('Error decoding/playing model audio chunk:', err);
    }
  };

  // Active utterance ref to prevent Chrome/Android garbage collection stopping speech
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Robust Browser TTS Helper that resumes SpeechSynthesis & handles voice selection
  const speakTextWithBrowserTTS = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
      window.speechSynthesis.resume();

      const cleanText = text
        .replace(/\[.*?\]\(.*?\)/g, '')
        .replace(/[*#`_~]/g, '')
        .replace(/<[^>]*>/g, '')
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      activeUtteranceRef.current = utterance; // Retain reference to prevent premature GC

      const langMap: Record<string, string> = {
        hi: 'hi-IN',
        or: 'or-IN',
        bn: 'bn-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        pa: 'pa-IN',
        ur: 'ur-IN',
        en: 'en-IN'
      };
      // Automatic Language Script Detection from Response Text
      let detectedLangTag = 'en-IN';
      if (/[\u0B00-\u0B7F]/.test(cleanText)) {
        detectedLangTag = 'or-IN'; // Odia script
      } else if (/[\u0900-\u097F]/.test(cleanText)) {
        detectedLangTag = 'hi-IN'; // Devanagari script
      } else if (/[\u0980-\u09FF]/.test(cleanText)) {
        detectedLangTag = 'bn-IN'; // Bengali script
      } else if (/[\u0C00-\u0C7F]/.test(cleanText)) {
        detectedLangTag = 'te-IN'; // Telugu script
      } else if (/[\u0B80-\u0BFF]/.test(cleanText)) {
        detectedLangTag = 'ta-IN'; // Tamil script
      } else if (/[\u0A80-\u0AFF]/.test(cleanText)) {
        detectedLangTag = 'gu-IN'; // Gujarati script
      } else if (langMap[activeLanguage]) {
        detectedLangTag = langMap[activeLanguage];
      } else if (langMap[language]) {
        detectedLangTag = langMap[language];
      }

      utterance.lang = detectedLangTag;
      utterance.rate = 1.0;
      utterance.pitch = 1.25; // Warm feminine pitch

      const setVoiceAndSpeak = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            const shortLang = detectedLangTag.split('-')[0].toLowerCase(); // e.g. 'or', 'hi', 'bn'

            // STRICT EXCLUSION OF MALE SYSTEM VOICES
            const nonMaleVoices = voices.filter(v => {
              const nameLower = v.name.toLowerCase();
              return !/\b(male|david|mark|george|ravi|hemant|prakash|richard|james|guy|stefan|daniel|alex|fred|thomas|nil|bruce|stefanos)\b/i.test(nameLower);
            });

            const pool = nonMaleVoices.length > 0 ? nonMaleVoices : voices;

            const preferredVoice = 
              pool.find(v => (v.lang.toLowerCase().startsWith(shortLang) || v.lang.toLowerCase().includes(shortLang)) && 
                /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri)\b/i.test(v.name)) ||
              pool.find(v => (v.lang.toLowerCase().startsWith(shortLang) || v.lang.toLowerCase().includes(shortLang))) ||
              pool.find(v => /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri)\b/i.test(v.name)) ||
              pool.find(v => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('-in')) ||
              pool[0];

            if (preferredVoice) {
              utterance.voice = preferredVoice;
            }
          }

          utterance.onstart = () => {
            setStatus('speaking');
          };
          utterance.onend = () => {
            setStatus(isMutedRef.current ? 'muted' : 'listening');
            activeUtteranceRef.current = null;
          };
          utterance.onerror = (e) => {
            console.warn('SpeechSynthesis error:', e);
            setStatus(isMutedRef.current ? 'muted' : 'listening');
            activeUtteranceRef.current = null;
          };

          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.error('Error executing speechSynthesis.speak:', err);
        }
      };

      // Ensure voices are loaded on Chrome/Safari before triggering speak
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoiceAndSpeak();
          window.speechSynthesis.onvoiceschanged = null;
        };
        setTimeout(setVoiceAndSpeak, 100);
      } else {
        setTimeout(setVoiceAndSpeak, 30);
      }
    } catch (e) {
      console.error('Browser TTS error:', e);
    }
  };

  const stopAllPlayback = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    audioQueueRef.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {}
    });
    audioQueueRef.current = [];
    nextStartTimeRef.current = 0;
  };

  // Handle manual user text prompt inside voice call
  const handleSendTextPrompt = () => {
    if (!textInput.trim()) return;
    const msg = textInput.trim();

    // Append to turns as user speaker
    const newTurn: SpeechTurn = {
      speaker: 'user',
      text: msg,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    setTurns(prev => [...prev, newTurn]);

    // Send via WebSocket if open
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({ text: msg }));
      } catch (e) {
        console.error('Error sending text prompt over WebSocket:', e);
      }
    }
    setTextInput('');
  };

  const handleManualResume = () => {
    reconnectAttemptsRef.current = 0;
    isNormalCloseRef.current = false;
    setStatus('connecting');
    setErrorMessage('');
    setSessionKey(k => k + 1);
  };

  useEffect(() => {
    let active = true;
    isNormalCloseRef.current = false;

    const startSession = async () => {
      try {
        setStatus('connecting');
        hasReceivedAudioStreamRef.current = false;

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/api/live-ws?voice=${selectedVoice}&lang=${encodeURIComponent(activeLanguage || language)}${uid ? `&uid=${encodeURIComponent(uid)}` : ''}`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('Voice call WebSocket connected successfully.');
          reconnectAttemptsRef.current = 0;
          if (active) {
            setStatus(isMutedRef.current ? 'muted' : 'listening');
          }
        };

        ws.onmessage = (event) => {
          if (!active) return;
          try {
            const data = JSON.parse(event.data);
            if (data.error) {
              if (reconnectAttemptsRef.current < 2) {
                reconnectAttemptsRef.current += 1;
                console.log(`Live voice error encountered. Auto-reconnecting attempt ${reconnectAttemptsRef.current}/2...`);
                setStatus('connecting');
                showToast(`Reconnecting live voice link...`);
                setTimeout(() => {
                  if (active && !isNormalCloseRef.current) {
                    setSessionKey(k => k + 1);
                  }
                }, 1200);
              } else {
                setErrorMessage(data.error);
                setStatus('error');
              }
              return;
            }
            if (data.audio) {
              hasReceivedAudioStreamRef.current = true;
              playAudioChunk(data.audio);
            }
            if (data.interrupted) {
              stopAllPlayback();
              setStatus(isMutedRef.current ? 'muted' : 'listening');
            }

            // Real-Time Transcript Streaming Handler
            if (data.transcript) {
              const text = data.transcript.trim();
              if (text) {
                setCurrentSpeech(text);

                // Speech TTS playback fallback when raw PCM audio stream isn't supplied
                // ONLY trigger if NO live audio stream was ever received in this call session
                if (data.speaker === 'arohi' && !data.audio && !hasReceivedAudioStreamRef.current && statusRef.current !== 'speaking') {
                  speakTextWithBrowserTTS(text);
                }

                setTurns(prev => {
                  const last = prev[prev.length - 1];
                  const currentSpeaker = data.speaker || 'arohi';
                  
                  if (last && last.speaker === currentSpeaker) {
                    if (last.text === text || last.text.endsWith(text)) return prev;

                    if (text.startsWith(last.text)) {
                      return [
                        ...prev.slice(0, -1),
                        { speaker: currentSpeaker, text: text, timestamp: last.timestamp }
                      ];
                    }

                    if (last.text.startsWith(text)) return prev;

                    const updatedText = (last.text + " " + text).replace(/\s+/g, " ").trim();
                    return [
                      ...prev.slice(0, -1),
                      { 
                        speaker: currentSpeaker, 
                        text: updatedText,
                        timestamp: last.timestamp 
                      }
                    ];
                  } else {
                    return [
                      ...prev,
                      {
                        speaker: currentSpeaker,
                        text: text,
                        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                      }
                    ];
                  }
                });
              }
            }
          } catch (err) {
            console.error('Error parsing WebSocket message:', err);
          }
        };

        ws.onclose = (event) => {
          if (active) {
            if (isNormalCloseRef.current || event.code === 1000 || event.code === 1001 || event.code === 1005) {
              if (status !== 'error') {
                setStatus('ended');
              }
            } else {
              if (reconnectAttemptsRef.current < 2) {
                reconnectAttemptsRef.current += 1;
                console.log(`Live voice link closed (${event.reason || 'Code ' + event.code}). Auto-reconnecting attempt ${reconnectAttemptsRef.current}/2...`);
                setStatus('connecting');
                showToast(`Reconnecting voice link...`);
                setTimeout(() => {
                  if (active && !isNormalCloseRef.current) {
                    setSessionKey(k => k + 1);
                  }
                }, 1200);
              } else {
                const reasonMsg = event.reason ? `: ${event.reason}` : '';
                setErrorMessage(`The live voice stream reached its continuous limit or experienced a network reset (${reasonMsg || 'Quota or Session Timeout'}). Tap 'Resume Call' to continue speaking!`);
                setStatus('error');
              }
            }
          }
        };

        // Microphones and Audio Context setup
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            sampleRate: 16000,
            echoCancellation: true,
            noiseSuppression: true,
          }
        });
        micStreamRef.current = stream;

        const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        inputAudioCtxRef.current = inputCtx;

        const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        outputAudioCtxRef.current = outputCtx;

        const source = inputCtx.createMediaStreamSource(stream);
        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
        scriptProcessorRef.current = processor;

        source.connect(processor);
        processor.connect(inputCtx.destination);

        processor.onaudioprocess = (e) => {
          if (!active || isMutedRef.current || ws.readyState !== WebSocket.OPEN) return;
          
          const float32Data = e.inputBuffer.getChannelData(0);
          
          let sum = 0;
          for (let i = 0; i < float32Data.length; i++) {
            sum += float32Data[i] * float32Data[i];
          }
          const rms = Math.sqrt(sum / float32Data.length);
          const vol = Math.min(100, Math.floor(rms * 450));
          setUserVolume(vol);

          // Instant Client-side Barge-In: If user speaks into mic (vol > 16) while Arohi is playing audio, stop audio playback immediately so Arohi listens
          if (vol > 16 && audioQueueRef.current.length > 0) {
            stopAllPlayback();
            setStatus(isMutedRef.current ? 'muted' : 'listening');
          }

          const rawBuffer = floatTo16BitPCM(float32Data);
          const base64Pcm = arrayBufferToBase64(rawBuffer);

          ws.send(JSON.stringify({ audio: base64Pcm }));
        };

      } catch (err: any) {
        console.error('Error starting live voice session:', err);
        if (active) {
          setErrorMessage(err.message || 'Could not access microphone or configure sound channels.');
          setStatus('error');
        }
      }
    };

    startSession();

    return () => {
      active = false;
      cleanup();
    };
  }, [selectedVoice, activeLanguage, sessionKey]);

  const cleanup = () => {
    isNormalCloseRef.current = true;
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch (e) {}
      wsRef.current = null;
    }

    stopAllPlayback();

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }

    if (scriptProcessorRef.current) {
      try {
        scriptProcessorRef.current.disconnect();
      } catch (e) {}
      scriptProcessorRef.current = null;
    }

    if (inputAudioCtxRef.current) {
      try {
        inputAudioCtxRef.current.close();
      } catch (e) {}
      inputAudioCtxRef.current = null;
    }

    if (outputAudioCtxRef.current) {
      try {
        outputAudioCtxRef.current.close();
      } catch (e) {}
      outputAudioCtxRef.current = null;
    }
  };

  const handleEndCall = () => {
    cleanup();
    if (onCallComplete) {
      onCallComplete({
        duration: duration,
        turns: turns,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        summaryText: ''
      });
    }
    onClose();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (status === 'ended') {
    return null;
  }

  const latestArohiTurn = [...turns].reverse().find(t => t.speaker === 'arohi');
  const latestUserTurn = [...turns].reverse().find(t => t.speaker === 'user');

  // Real-time sentiment analysis from live speech and recent conversation turns
  const activeSpeechText = (liveUserSpeech || latestUserTurn?.text || latestArohiTurn?.text || '').toLowerCase();
  
  const detectSentiment = (text: string) => {
    if (!text) return 'neutral';
    if (/\b(great|awesome|excel|good|love|thank|happy|excited|super|wow|perfect|yes|nice|fantastic|bright|boost)\b/i.test(text)) {
      return 'positive';
    }
    if (/\b(how|what|why|when|where|can|could|help|explain|tell|suggest|guide|show|\?)\b/i.test(text)) {
      return 'curious';
    }
    if (/\b(urgent|important|problem|error|fail|issue|stuck|worry|hard|difficult)\b/i.test(text)) {
      return 'focused';
    }
    return 'neutral';
  };

  const detectedSentiment = detectSentiment(activeSpeechText);

  // Compute dynamic background theme classes based on volume level and sentiment
  const getThemeBackgroundClasses = () => {
    if (status === 'speaking') {
      if (detectedSentiment === 'positive') {
        return 'bg-gradient-to-b from-[#18082a] via-[#240b3c] to-[#0d0417]';
      }
      if (detectedSentiment === 'curious') {
        return 'bg-gradient-to-b from-[#0b0c2a] via-[#141740] to-[#050618]';
      }
      return 'bg-gradient-to-b from-[#160628] via-[#200838] to-[#090216]';
    }

    if (status === 'listening') {
      if (userVolume > 30) {
        return 'bg-gradient-to-b from-[#03291d] via-[#063b2a] to-[#02130e]';
      }
      if (userVolume > 12) {
        return 'bg-gradient-to-b from-[#042228] via-[#07323b] to-[#021216]';
      }
      if (detectedSentiment === 'positive') {
        return 'bg-gradient-to-b from-[#1a1205] via-[#261a07] to-[#0c0802]';
      }
      return 'bg-gradient-to-b from-[#0a0818] via-[#110e28] to-[#05040e]';
    }

    return 'bg-[#04030a]';
  };

  // Compute dynamic ambient aura gradient
  const getAmbientAuraClasses = () => {
    if (status === 'speaking') {
      if (detectedSentiment === 'positive') {
        return 'bg-gradient-to-r from-fuchsia-600 via-amber-500 to-purple-600 scale-125 opacity-30';
      }
      if (detectedSentiment === 'curious') {
        return 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 scale-120 opacity-30';
      }
      return 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 scale-125 opacity-25';
    }

    if (status === 'listening') {
      if (userVolume > 30) {
        return 'bg-gradient-to-r from-emerald-400 via-lime-400 to-teal-500 scale-135 opacity-40';
      }
      if (userVolume > 12) {
        return 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 scale-115 opacity-30';
      }
      return 'bg-gradient-to-r from-purple-900 via-indigo-900 to-cyan-950 scale-100 opacity-20';
    }

    return 'bg-gradient-to-r from-purple-950 via-indigo-950 to-black opacity-15';
  };

  return (
    <div className={`fixed inset-0 z-50 text-white flex flex-col justify-between p-3 sm:p-6 font-sans select-none overflow-hidden transition-colors duration-700 ${getThemeBackgroundClasses()}`}>
      
      {/* Dynamic Atmospheric Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary Ambient Aura */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700 ${getAmbientAuraClasses()}`} />
        
        {/* Volume Level Reactive Secondary Pulse Ring */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-all duration-150 pointer-events-none"
          style={{
            width: `${350 + Math.min(250, userVolume * 5)}px`,
            height: `${350 + Math.min(250, userVolume * 5)}px`,
            backgroundColor: status === 'speaking' 
              ? 'rgba(217, 70, 239, 0.15)' 
              : userVolume > 10 
              ? 'rgba(16, 185, 129, 0.25)' 
              : 'rgba(99, 102, 241, 0.08)',
            transform: `translate(-50%, -50%) scale(${1 + Math.min(0.5, userVolume / 80)})`
          }}
        />
      </div>

      {/* TOP HEADER BAR */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-2xl mx-auto pt-1 sm:pt-2 px-2">
        {/* Left Menu & Live Indicator */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSessionHistory(!showSessionHistory)}
            className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
            title="Session History"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="font-extrabold text-sm tracking-wide text-white">Arohi Live</span>
          </div>
        </div>

        {/* Center Call Timer */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-300 shadow-lg">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>{formatDuration(duration)}</span>
        </div>

        {/* Right Action Icons (Cast, Options, Close) */}
        <div className="flex items-center gap-2">
          <button 
            className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
            title="Screen Cast"
          >
            <Cast className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setShowSessionHistory(!showSessionHistory)}
            className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
            title="Options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
            title="Close call"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>



      {/* MAIN FUTURISTIC ORB & WAVEFORM VISUALIZER DISPLAY AREA */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto my-2 px-3 sm:px-6 select-none">
        
        {/* CENTER CONCENTRIC GLOWING ORB */}
        <div className="relative flex items-center justify-center my-4 sm:my-6">
          {/* Outer Pulsing Glow Aura */}
          <div className={`absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl transition-all duration-500 ${
            status === 'speaking'
              ? 'bg-fuchsia-600/30 scale-110 animate-pulse'
              : status === 'listening' && userVolume > 5
              ? 'bg-emerald-500/30 scale-105'
              : 'bg-purple-600/20'
          }`} />

          {/* Outer Outer Concentric Orbit Ring */}
          <div className={`w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-purple-500/20 flex items-center justify-center transition-transform duration-700 ${
            status === 'speaking' ? 'scale-105 border-fuchsia-500/40' : status === 'listening' && userVolume > 5 ? 'border-emerald-400/40' : ''
          }`}>
            {/* Middle Concentric Orbit Ring */}
            <div className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-indigo-400/30 flex items-center justify-center transition-all duration-300 ${
              status === 'speaking' ? 'border-purple-400/60 shadow-[0_0_25px_rgba(217,70,239,0.3)]' : status === 'listening' && userVolume > 5 ? 'border-emerald-300/60 shadow-[0_0_25px_rgba(16,185,129,0.3)]' : ''
            }`}>
              {/* Inner Glowing Core Badge */}
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0d0824] border-2 flex items-center justify-center relative shadow-2xl transition-all duration-300 ${
                status === 'speaking'
                  ? 'border-fuchsia-400 shadow-[0_0_40px_rgba(217,70,239,0.6)] scale-105'
                  : status === 'listening' && userVolume > 5
                  ? 'border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.6)] scale-105'
                  : 'border-cyan-400/60 shadow-[0_0_30px_rgba(168,85,247,0.4)]'
              }`}>
                
                {/* Orbital dots around core */}
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '20s' }} />
                
                {/* Center "A" Branding Logo Badge */}
                <div className="relative flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-2xl shadow-inner border border-white/30">
                    A
                  </div>
                </div>

                {/* Live Pulse Indicator dot inside orb */}
                <div className={`absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full border-2 border-[#0d0824] ${
                  status === 'speaking' ? 'bg-fuchsia-400 animate-ping' : status === 'listening' && userVolume > 5 ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'
                }`} />
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC WAVEFORM VISUALIZER CONTAINER CARD */}
        <div className="w-full max-w-sm sm:max-w-md bg-[#0a0718]/90 border border-purple-500/25 rounded-3xl p-4 sm:p-5 shadow-[0_12px_45px_rgba(124,58,237,0.2)] backdrop-blur-2xl flex flex-col items-center my-3 relative overflow-hidden">
          
          {/* Top Ambient Glow Line inside Card */}
          <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r transition-all duration-300 ${
            status === 'speaking'
              ? 'from-fuchsia-500 via-purple-400 to-pink-500 opacity-100'
              : status === 'listening' && userVolume > 5
              ? 'from-emerald-400 via-teal-300 to-cyan-400 opacity-100'
              : 'from-cyan-500/40 via-purple-500/40 to-indigo-500/40 opacity-50'
          }`} />

          {/* 28 Dynamic Waveform Bars */}
          <div className="flex items-center justify-center gap-1.5 h-16 w-full px-2 my-1">
            {[...Array(28)].map((_, i) => {
              const centerFactor = 1 - Math.abs(i - 13.5) / 14;
              let height = 8;
              let colorClass = 'bg-slate-700';

              if (status === 'speaking') {
                const phase = Math.sin((i * 0.6) + (Date.now() / 80)) * 0.5 + 0.5;
                height = 10 + (phase * 42 * centerFactor);
                colorClass = 'bg-gradient-to-t from-fuchsia-500 via-purple-400 to-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.7)]';
              } else if (status === 'listening') {
                if (userVolume > 5) {
                  const vf = Math.min(1, userVolume / 50);
                  const wave = Math.sin((i * 0.5) + (Date.now() / 100)) * 0.4 + 0.6;
                  height = Math.max(8, Math.min(48, (vf * 40 * centerFactor * wave) + 8));
                  colorClass = 'bg-gradient-to-t from-emerald-500 via-teal-300 to-cyan-200 shadow-[0_0_10px_rgba(16,185,129,0.8)]';
                } else {
                  const idleWave = Math.sin((i * 0.4) + (Date.now() / 250)) * 0.5 + 0.5;
                  height = 8 + (idleWave * 10 * centerFactor);
                  colorClass = 'bg-gradient-to-t from-indigo-500/70 to-cyan-400/80';
                }
              }

              return (
                <div
                  key={i}
                  style={{ height: `${height}px` }}
                  className={`w-1 sm:w-1.5 rounded-full transition-all duration-75 ${colorClass}`}
                />
              );
            })}
          </div>

          {/* Dynamic Status Text & Audio Detection Percentage */}
          <div className="mt-2 text-center space-y-1">
            {status === 'speaking' ? (
              <div className="animate-in fade-in duration-200">
                <p className="text-sm font-extrabold text-fuchsia-300 flex items-center justify-center gap-1.5 tracking-wide">
                  <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
                  <span>AROHI is Speaking...</span>
                </p>
                <p className="text-[11px] text-slate-400 font-medium">Listening to live voice output</p>
              </div>
            ) : status === 'listening' ? (
              <div className="animate-in fade-in duration-200">
                {userVolume > 5 ? (
                  <div>
                    <p className="text-sm font-extrabold text-emerald-400 flex items-center justify-center gap-1.5 tracking-wide">
                      <Mic className="w-4 h-4 text-emerald-400 animate-bounce" />
                      <span>Listening to Your Voice...</span>
                    </p>
                    <p className="text-[11px] text-emerald-300/90 font-mono font-semibold">
                      Audio Detection: {Math.min(100, Math.round((userVolume / 50) * 100))}%
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-bold text-cyan-300 flex items-center justify-center gap-1.5 tracking-wide">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>Listening... Speak Anytime</span>
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">Ready for your voice input</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm font-bold text-amber-300 animate-pulse">
                  Connecting to Arohi Live...
                </p>
              </div>
            )}


          </div>

        </div>

        {/* Call Status Alert if Error */}
        {status === 'error' && (
          <div className="bg-rose-950/90 border border-rose-800 p-3.5 rounded-2xl text-rose-200 text-xs max-w-sm mx-auto my-2 shadow-2xl flex flex-col items-center gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Voice Stream Disconnected</span>
            </div>
            <p className="text-[11px] text-slate-300 text-center leading-relaxed">
              {errorMessage || 'Voice stream experienced a network reset.'}
            </p>
            <button
              onClick={handleManualResume}
              className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-full text-xs cursor-pointer"
            >
              Resume Call
            </button>
          </div>
        )}
      </main>

      {/* BOTTOM GEMINI LIVE AUDIO VISUALIZER & DOCK CONTROLS */}
      <footer className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center gap-3 pb-2 pt-1">
        
        {/* Gemini Live Control Dock with Ambient Audio Capsule */}
        <div className="flex items-center justify-between w-full px-2 sm:px-4">
          
          {/* Camera / Video Button */}
          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-lg active:scale-95 ${
              isCameraActive
                ? 'bg-violet-600 border-violet-500 text-white'
                : 'bg-[#18181b] border-white/10 text-slate-300 hover:bg-[#27272a] hover:text-white'
            }`}
            title="Toggle Camera"
          >
            {isCameraActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Upload / Share Image Button */}
          <button
            className="w-12 h-12 rounded-full bg-[#18181b] border border-white/10 text-slate-300 hover:bg-[#27272a] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
            title="Attach file/image"
          >
            <Upload className="w-5 h-5" />
          </button>

          {/* Central Glowing Gemini Ambient Audio Visualizer Capsule */}
          <div className="flex-1 max-w-[160px] sm:max-w-[200px] h-12 bg-[#0d0d12] border border-[#2e264f] rounded-full flex items-center justify-center px-4 relative overflow-hidden shadow-xl mx-2">
            
            {/* Ambient Bottom Pulse Glow Line */}
            <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-fuchsia-500 transition-opacity duration-300 ${
              status === 'speaking' ? 'opacity-100 animate-pulse' : 'opacity-50'
            }`} />

            {/* Dynamic Waveform Bars */}
            <div className="flex items-center gap-1 h-6 w-full justify-center">
              {[...Array(14)].map((_, i) => {
                const centerMult = 1 - Math.abs(i - 6.5) / 7;
                let h = 6;
                let bg = 'bg-slate-600';

                if (status === 'speaking') {
                  const phase = Math.sin((i * 0.7) + (Date.now() / 90)) * 0.5 + 0.5;
                  h = 8 + (phase * 22 * centerMult);
                  bg = 'bg-gradient-to-t from-violet-400 via-cyan-300 to-white';
                } else if (status === 'listening') {
                  if (userVolume > 3) {
                    const vf = Math.min(1, userVolume / 50);
                    h = Math.max(6, Math.min(24, (vf * 20 * centerMult) + 6));
                    bg = 'bg-gradient-to-t from-emerald-400 via-cyan-300 to-white';
                  } else {
                    h = 6 + Math.sin((i * 0.5) + (Date.now() / 200)) * 4;
                    bg = 'bg-cyan-500/60';
                  }
                }

                return (
                  <div
                    key={i}
                    style={{ height: `${h}px` }}
                    className={`w-1 rounded-full transition-all duration-75 ${bg}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Mute / Microphone Button */}
          <button
            onClick={toggleMute}
            disabled={status === 'connecting' || status === 'error'}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-lg active:scale-95 ${
              isMuted
                ? 'bg-rose-600 border-rose-500 text-white'
                : 'bg-[#18181b] border-white/10 text-slate-300 hover:bg-[#27272a] hover:text-white'
            }`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End Call / Close Button */}
          <button
            onClick={handleEndCall}
            className="w-12 h-12 bg-[#27272a] hover:bg-red-600 text-slate-300 hover:text-white rounded-full flex items-center justify-center transition-all border border-white/10 cursor-pointer active:scale-95 shadow-lg"
            title="End Call"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastNotification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-violet-500/50 text-slate-100 text-xs font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in duration-200">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Session History Drawer */}
      {showSessionHistory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-950 border-l border-white/10 h-full flex flex-col shadow-2xl">
            <div className="p-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Temporary Session History</h3>
              </div>
              <button
                onClick={() => setShowSessionHistory(false)}
                className="p-1 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs">
              {savedSnapshots.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 my-auto">
                  <Bookmark className="w-8 h-8 mb-2 opacity-40" />
                  <p>No saved snippets yet</p>
                </div>
              ) : (
                savedSnapshots.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-white/10 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-bold text-violet-300">{item.title}</span>
                      <span>{item.timestamp}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-white/5 text-slate-200 whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {item.text}
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleCopySnapshotText(item.text, item.id)}
                        className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                      >
                        {copiedSnapshotId === item.id ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleDeleteSnapshot(item.id)}
                        className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
