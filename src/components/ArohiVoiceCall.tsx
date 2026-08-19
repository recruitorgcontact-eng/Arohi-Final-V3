import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneOff, 
  Phone, 
  Mic, 
  MicOff, 
  Radio, 
  AlertCircle, 
  X, 
  MessageSquare, 
  Pause, 
  Play, 
  Sliders, 
  Keyboard, 
  Send, 
  Sparkles, 
  Volume2, 
  History, 
  Copy, 
  Check, 
  ChevronDown, 
  Settings, 
  Bookmark, 
  Trash2,
  Globe
} from 'lucide-react';
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
  const smoothedVolumeRef = useRef<number>(0);
  const lastVolumeUpdateRef = useRef<number>(0);
  const [currentSpeech, setCurrentSpeech] = useState('');
  const [textInput, setTextInput] = useState('');
  const [showKeyboardDrawer, setShowKeyboardDrawer] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showSessionHistory, setShowSessionHistory] = useState(false);

  const [turns, setTurns] = useState<SpeechTurn[]>([]);

  const [liveUserSpeech, setLiveUserSpeech] = useState('');
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [copiedSnapshotId, setCopiedSnapshotId] = useState<string | null>(null);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Temporary Session History state
  const [savedSnapshots, setSavedSnapshots] = useState<SavedSnapshot[]>(() => {
    try {
      const stored = sessionStorage.getItem('arohi_session_history');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  // Audio nodes and context refs
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Precise scheduling variables for gapless playback
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const isMutedRef = useRef<boolean>(false);
  const isNormalCloseRef = useRef<boolean>(false);
  const statusRef = useRef<string>(status);
  const hasReceivedAudioStreamRef = useRef<boolean>(false);
  const liveTypingTimerRef = useRef<any>(null);

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
        
        // Match chosen language with fallback to english or hindi
        const langMap: Record<string, string> = {
          hi: 'hi-IN',
          en: 'en-IN',
          or: 'or-IN',
          bn: 'bn-IN',
          te: 'te-IN',
          ta: 'ta-IN',
          mr: 'mr-IN',
          gu: 'gu-IN',
          kn: 'kn-IN',
          ml: 'ml-IN',
          pa: 'pa-IN',
          ur: 'ur-IN'
        };
        const targetLangCode = (activeLanguage && activeLanguage !== 'auto') 
          ? (langMap[activeLanguage] || 'en-IN') 
          : (language && language !== 'auto' ? (langMap[language] || 'en-IN') : 'en-IN');
        recognition.lang = targetLangCode;

        let silenceTimer: any = null;

        recognition.onresult = (event: any) => {
          if (!isMounted || isMutedRef.current) return;

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
          if (!activeText) return;

          // REAL-TIME BARGE-IN: If user speaks into microphone while AI audio is playing, interrupt AI audio & switch to listening
          if (
            statusRef.current === 'speaking' || 
            audioQueueRef.current.length > 0 || 
            (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking)
          ) {
            stopAllPlayback();
            setStatus('listening');
          }

          setLiveUserSpeech(activeText);

          if (silenceTimer) clearTimeout(silenceTimer);

          const commitUserTurn = async (text: string) => {
            if (!text || !text.trim()) return;

            // Reset audio stream received flag for new turn
            hasReceivedAudioStreamRef.current = false;
            setLiveUserSpeech('');

            const userTurn: SpeechTurn = {
              speaker: 'user',
              text: text,
              timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
            };

            setTurns(prev => [...prev, userTurn]);

            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              try {
                wsRef.current.send(JSON.stringify({ text: text }));
              } catch (e) {
                console.warn('Error sending transcribed text prompt over WebSocket:', e);
              }
            } else {
              // Resilient Voice API Turn Fallback
              try {
                const response = await fetch('/api/live-voice-turn', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    prompt: text,
                    history: turns,
                    language: activeLanguage || language || 'en',
                    uid
                  })
                });
                if (response.ok) {
                  const data = await response.json();
                  if (data.transcript && isMounted) {
                    const replyText = data.transcript;
                    setStatus('speaking');
                    speakWithBrowserTTS(replyText);
                  }
                }
              } catch (turnErr) {
                console.warn('Live voice turn fetch fallback notice:', turnErr);
              }
            }
          };

          if (finalTranscript.trim()) {
            commitUserTurn(finalTranscript.trim());
          } else {
            // Trigger turn completion after short silence
            silenceTimer = setTimeout(() => {
              if (isMounted && activeText) {
                commitUserTurn(activeText);
              }
            }, 900);
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

  // Auto-scroll transcript container to keep newest dialogue in view
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
    const timeoutId = setTimeout(scrollToBottom, 60);
    return () => clearTimeout(timeoutId);
  }, [turns, currentSpeech, liveUserSpeech, status]);

  const showToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 2500);
  };

  const handleCopyTranscript = () => {
    if (turns.length === 0) return;
    const fullText = turns.map(t => `[${t.timestamp}] ${t.speaker === 'user' ? 'You' : 'Arohi'}: ${t.text}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedTranscript(true);
    showToast('Transcript copied to clipboard');
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

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

  const handleDeleteSnapshot = (id: string) => {
    setSavedSnapshots(prev => prev.filter(s => s.id !== id));
    showToast('Removed item from history');
  };

  const handleCopySnapshotText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnapshotId(id);
    setTimeout(() => setCopiedSnapshotId(null), 2000);
  };

  // Downsample Float32 array from input sample rate to target sample rate (16000Hz for Gemini)
  const downsampleBuffer = (buffer: Float32Array, inputSampleRate: number, outputSampleRate = 16000): Float32Array => {
    if (!buffer || buffer.length === 0 || inputSampleRate === outputSampleRate) {
      return buffer;
    }
    const sampleRateRatio = inputSampleRate / outputSampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      let accum = 0, count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = count > 0 ? accum / count : 0;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
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

  // Global user gesture listener to unlock AudioContext & SpeechSynthesis on browsers
  useEffect(() => {
    const unlockAudio = () => {
      if (inputAudioCtxRef.current && inputAudioCtxRef.current.state === 'suspended') {
        inputAudioCtxRef.current.resume().catch(() => {});
      }
      if (outputAudioCtxRef.current && outputAudioCtxRef.current.state === 'suspended') {
        outputAudioCtxRef.current.resume().catch(() => {});
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try { window.speechSynthesis.resume(); } catch (e) {}
      }
    };

    unlockAudio();
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('click', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
  }, []);

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
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      const startTime = Math.max(currentTime, nextStartTimeRef.current);
      source.start(startTime);
      nextStartTimeRef.current = startTime + audioBuffer.duration;

      audioQueueRef.current.push(source);
      source.onended = () => {
        audioQueueRef.current = audioQueueRef.current.filter(s => s !== source);
        if (audioQueueRef.current.length === 0 && !isMutedRef.current) {
          setStatus('listening');
          setCurrentSpeech(fullText => {
            const cleanedText = (fullText || '').trim();
            if (cleanedText) {
              setTurns(prev => {
                const last = prev[prev.length - 1];
                if (last && last.speaker === 'arohi' && (last.text === cleanedText || last.text.includes(cleanedText))) {
                  return prev;
                }
                return [
                  ...prev,
                  {
                    speaker: 'arohi',
                    text: cleanedText,
                    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                  }
                ];
              });
            }
            return '';
          });
        }
      };
    } catch (e) {
      console.error('Error decoding audio chunk:', e);
    }
  };

  // Browser TTS Fallback with Indian Regional Voice Optimization
  const speakWithBrowserTTS = (text: string) => {
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
      activeUtteranceRef.current = utterance;

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

      let detectedLangTag = 'en-IN';
      if (/[\u0B00-\u0B7F]/.test(cleanText)) {
        detectedLangTag = 'or-IN';
      } else if (/[\u0980-\u09FF]/.test(cleanText)) {
        detectedLangTag = 'bn-IN';
      } else if (/[\u0900-\u097F]/.test(cleanText)) {
        detectedLangTag = 'hi-IN';
      } else if (/[\u0C00-\u0C7F]/.test(cleanText)) {
        detectedLangTag = 'te-IN';
      } else if (/[\u0B80-\u0BFF]/.test(cleanText)) {
        detectedLangTag = 'ta-IN';
      } else if (/[\u0A80-\u0AFF]/.test(cleanText)) {
        detectedLangTag = 'gu-IN';
      } else if (/[\u0C80-\u0CFF]/.test(cleanText)) {
        detectedLangTag = 'kn-IN';
      } else if (/[\u0D00-\u0D7F]/.test(cleanText)) {
        detectedLangTag = 'ml-IN';
      } else if (/[\u0A00-\u0A7F]/.test(cleanText)) {
        detectedLangTag = 'pa-IN';
      } else if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(cleanText)) {
        detectedLangTag = 'ur-IN';
      } else if (langMap[activeLanguage]) {
        detectedLangTag = langMap[activeLanguage];
      } else if (langMap[language]) {
        detectedLangTag = langMap[language];
      }

      utterance.lang = detectedLangTag;
      utterance.rate = 1.0;
      utterance.pitch = 1.35;

      const setVoiceAndSpeak = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            const shortLang = detectedLangTag.split('-')[0].toLowerCase();

            const strictlyFemaleVoices = voices.filter(v => {
              const nameLower = v.name.toLowerCase();
              const isExplicitMale = /\b(male|david|mark|george|ravi|hemant|prakash|richard|james|guy|stefan|daniel|alex|fred|thomas|nil|bruce|stefanos|adult|system)\b/i.test(nameLower) ||
                                     /google us english|google uk english male|microsoft david|microsoft mark/i.test(nameLower);
              return !isExplicitMale;
            });

            const pool = strictlyFemaleVoices.length > 0 ? strictlyFemaleVoices : voices;

            const preferredVoice = 
              pool.find(v => (v.lang.toLowerCase().startsWith(shortLang) || v.lang.toLowerCase().includes(shortLang)) && 
                /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
              pool.find(v => (v.lang.toLowerCase().startsWith(shortLang) || v.lang.toLowerCase().includes(shortLang))) ||
              pool.find(v => /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
              pool.find(v => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('-in'));

            if (preferredVoice) {
              utterance.voice = preferredVoice;
            }
          }

          let typingTimer: any = null;

          utterance.onstart = () => {
            setStatus('speaking');
            setCurrentSpeech('');
            
            // Progressive word/character typer fallback to ensure real-time typed words appear even on mobile browsers where onboundary is intermittent
            const words = cleanText.split(' ');
            let wordIdx = 0;
            const estimatedWordDuration = (cleanText.length > 0 ? (cleanText.length * 55) / words.length : 200);
            const intervalMs = Math.max(120, Math.min(320, estimatedWordDuration));

            typingTimer = setInterval(() => {
              wordIdx++;
              if (wordIdx <= words.length) {
                const currentSlice = words.slice(0, wordIdx).join(' ');
                setCurrentSpeech(currentSlice);
              } else {
                clearInterval(typingTimer);
              }
            }, intervalMs);
          };

          utterance.onboundary = (event: any) => {
            if (event.name === 'word') {
              if (typingTimer) {
                clearInterval(typingTimer);
                typingTimer = null;
              }
              const charIndex = typeof event.charIndex === 'number' ? event.charIndex : 0;
              const charLength = typeof event.charLength === 'number' && event.charLength > 0 ? event.charLength : (cleanText.indexOf(' ', charIndex) > -1 ? cleanText.indexOf(' ', charIndex) - charIndex : cleanText.length - charIndex);
              const spokenSlice = cleanText.slice(0, charIndex + charLength).trim();
              if (spokenSlice) {
                setCurrentSpeech(spokenSlice);
              }
            }
          };

          utterance.onend = () => {
            if (typingTimer) clearInterval(typingTimer);
            setStatus(isMutedRef.current ? 'muted' : 'listening');
            activeUtteranceRef.current = null;
            setCurrentSpeech('');
            setTurns(prev => [
              ...prev,
              {
                speaker: 'arohi',
                text: cleanText,
                timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          };
          utterance.onerror = (e) => {
            if (typingTimer) clearInterval(typingTimer);
            console.warn('SpeechSynthesis error:', e);
            setStatus(isMutedRef.current ? 'muted' : 'listening');
            activeUtteranceRef.current = null;
            setCurrentSpeech('');
            setTurns(prev => [
              ...prev,
              {
                speaker: 'arohi',
                text: cleanText,
                timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          };

          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.error('Error executing speechSynthesis.speak:', err);
        }
      };

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
    if (liveTypingTimerRef.current) {
      clearInterval(liveTypingTimerRef.current);
      liveTypingTimerRef.current = null;
    }
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
  const handleSendTextPrompt = async () => {
    if (!textInput.trim()) return;
    const msg = textInput.trim();

    hasReceivedAudioStreamRef.current = false;

    const newTurn: SpeechTurn = {
      speaker: 'user',
      text: msg,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    setTurns(prev => [...prev, newTurn]);
    setTextInput('');
    setShowKeyboardDrawer(false);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({ text: msg }));
      } catch (e) {
        console.warn('Notice sending text prompt over WebSocket:', e);
      }
    } else {
      try {
        setStatus('speaking');
        const response = await fetch('/api/live-voice-turn', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: msg,
            history: turns,
            language: activeLanguage || language,
            uid
          })
        });
        if (response.ok) {
          const data = await response.json();
          if (data.transcript) {
            const replyText = data.transcript;
            speakWithBrowserTTS(replyText);
          }
        }
      } catch (e) {
        console.warn('Voice turn error:', e);
      }
    }
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
          if (active) {
            setStatus('listening');
            reconnectAttemptsRef.current = 0;
          }
        };

        ws.onmessage = async (event) => {
          if (!active) return;
          try {
            const data = JSON.parse(event.data);

            // Raw PCM Audio Stream
            if (data.audio || (data.type === 'audio' && data.data)) {
              hasReceivedAudioStreamRef.current = true;
              setStatus('speaking');
              playAudioChunk(data.audio || data.data);
            } 
            // Spoken transcript chunk from server
            else if (data.transcript || data.text || (data.type === 'text' && data.data)) {
              const textChunk = data.transcript || data.text || data.data;
              const speaker = data.speaker || 'arohi';

              if (speaker === 'arohi') {
                const cleaned = textChunk.replace(/[*#`_~]/g, '');
                if (cleaned) {
                  setStatus('speaking');
                  // Live type streaming text on active screen
                  setCurrentSpeech(prev => {
                    if (!prev) return cleaned.trimStart();
                    // If server sends full accumulated string or diff chunk
                    if (cleaned.startsWith(prev)) return cleaned;
                    if (prev.endsWith(' ') || cleaned.startsWith(' ')) {
                      return prev + cleaned;
                    }
                    return prev + ' ' + cleaned;
                  });

                  // If server didn't provide raw PCM audio stream, trigger regional browser TTS
                  if (!hasReceivedAudioStreamRef.current) {
                    speakWithBrowserTTS(cleaned);
                  }
                }
              } else if (speaker === 'user') {
                const userCleaned = textChunk.replace(/[*#`_~]/g, '').trim();
                if (userCleaned) {
                  setTurns(prev => {
                    const last = prev[prev.length - 1];
                    if (last && last.speaker === 'user' && (last.text.includes(userCleaned) || userCleaned.includes(last.text))) {
                      return prev;
                    }
                    return [
                      ...prev,
                      {
                        speaker: 'user',
                        text: userCleaned,
                        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                      }
                    ];
                  });
                }
              }
            } 
            // Interruption Notice
            else if (data.interrupted) {
              stopAllPlayback();
              setStatus(isMutedRef.current ? 'muted' : 'listening');
              setCurrentSpeech('');
            }
            // Turn Completion - commit current speech to turns history and clear streaming banner
            else if (data.turnComplete || data.type === 'turnComplete') {
              setCurrentSpeech(fullText => {
                const cleanedText = (fullText || '').trim();
                if (cleanedText) {
                  setTurns(prev => {
                    const last = prev[prev.length - 1];
                    if (last && last.speaker === 'arohi' && (last.text === cleanedText || last.text.includes(cleanedText))) {
                      return prev;
                    }
                    return [
                      ...prev,
                      {
                        speaker: 'arohi',
                        text: cleanedText,
                        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                      }
                    ];
                  });

                  if (!hasReceivedAudioStreamRef.current && cleanedText) {
                    speakWithBrowserTTS(cleanedText);
                  }
                }
                return '';
              });
            } else if (data.type === 'error' || data.error) {
              console.warn('Voice WebSocket notice:', data.message || data.error);
            }
          } catch (e) {
            console.warn('Error parsing WebSocket message:', e);
          }
        };

        ws.onerror = (err) => {
          console.warn('Voice WebSocket status notice (active with resilient voice pipeline):', err);
          if (active && statusRef.current === 'connecting') {
            setStatus('listening');
          }
        };

        ws.onclose = (event) => {
          if (!active || isNormalCloseRef.current) return;

          if (reconnectAttemptsRef.current < 2) {
            reconnectAttemptsRef.current += 1;
            const backoffMs = 1500;
            setTimeout(() => {
              if (active && !isNormalCloseRef.current) {
                setSessionKey(k => k + 1);
              }
            }, backoffMs);
          } else {
            // Keep call connected and active in resilient voice mode
            setStatus('listening');
          }
        };

        // Microphone & Web Audio Input Setup
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        micStreamRef.current = stream;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const inputCtx = new AudioContextClass();
        inputAudioCtxRef.current = inputCtx;

        const outputCtx = new AudioContextClass({ sampleRate: 24000 });
        outputAudioCtxRef.current = outputCtx;

        const source = inputCtx.createMediaStreamSource(stream);
        const scriptProcessor = inputCtx.createScriptProcessor(2048, 1, 1);
        scriptProcessorRef.current = scriptProcessor;

        source.connect(scriptProcessor);
        scriptProcessor.connect(inputCtx.destination);

        scriptProcessor.onaudioprocess = (e) => {
          if (!active || isMutedRef.current || ws.readyState !== WebSocket.OPEN) return;

          const float32Data = e.inputBuffer.getChannelData(0);

          let sum = 0;
          for (let i = 0; i < float32Data.length; i++) {
            sum += float32Data[i] * float32Data[i];
          }
          const rms = Math.sqrt(sum / float32Data.length);
          const rawVol = Math.min(100, Math.round(rms * 400));

          smoothedVolumeRef.current = smoothedVolumeRef.current * 0.7 + rawVol * 0.3;
          const now = Date.now();
          if (now - lastVolumeUpdateRef.current > 60) {
            setUserVolume(Math.round(smoothedVolumeRef.current));
            lastVolumeUpdateRef.current = now;
          }

          if (rawVol > 16 && (audioQueueRef.current.length > 0 || statusRef.current === 'speaking')) {
            stopAllPlayback();
            setStatus(isMutedRef.current ? 'muted' : 'listening');
          }

          const downsampledData = downsampleBuffer(float32Data, inputCtx.sampleRate || 16000, 16000);
          const rawBuffer = floatTo16BitPCM(downsampledData);
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

  // Determine active speaking states for real-time background color orchestration
  const isArohiSpeaking = status === 'speaking' || Boolean(currentSpeech && currentSpeech.trim().length > 0);
  const isUserSpeaking = status === 'listening' && (userVolume > 5 || Boolean(liveUserSpeech && liveUserSpeech.trim().length > 0));
  const isConnecting = status === 'connecting';
  const isMutedState = status === 'muted' || isMuted;

  // Get conversation turns for the primary screen (all turns so user and Arohi entries appear below intro)
  const visibleTurns = turns;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#06060c] text-white flex flex-col justify-between p-4 sm:p-6 font-sans select-none overflow-hidden transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. HYPNOTIC COLOR FLOW ORB BACKGROUND WITH REAL-TIME COLOR CHANGES */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        
        {/* Layer 1: Ambient Full-Screen Reactive Radial Gradient */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: isArohiSpeaking
              ? 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.32) 0%, rgba(236,72,153,0.22) 35%, rgba(6,182,212,0.15) 60%, rgba(6,6,12,0.98) 90%)'
              : isUserSpeaking
              ? 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.34) 0%, rgba(6,182,212,0.24) 35%, rgba(245,158,11,0.15) 60%, rgba(6,6,12,0.98) 90%)'
              : isConnecting
              ? 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.25) 0%, rgba(124,58,237,0.18) 40%, rgba(6,6,12,0.98) 85%)'
              : isMutedState
              ? 'radial-gradient(ellipse at 50% 50%, rgba(225,29,72,0.2) 0%, rgba(15,23,42,0.4) 40%, rgba(6,6,12,0.98) 85%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.22) 0%, rgba(79,70,229,0.15) 40%, rgba(14,165,233,0.08) 65%, rgba(6,6,12,0.98) 85%)'
          }}
        />

        {/* Layer 2: Floating Top-Left Aurora Atmosphere Cloud */}
        <div 
          className="absolute -top-20 -left-20 w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] rounded-full blur-[90px] sm:blur-[120px] transition-all duration-1000 ease-out animate-voice-fluid pointer-events-none"
          style={{
            background: isArohiSpeaking
              ? 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(147,51,234,0.4) 50%, transparent 80%)'
              : isUserSpeaking
              ? 'radial-gradient(circle, rgba(16,185,129,0.6) 0%, rgba(6,182,212,0.45) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.25) 50%, transparent 80%)',
            opacity: isArohiSpeaking || isUserSpeaking ? 0.9 : 0.45
          }}
        />

        {/* Layer 3: Floating Bottom-Right Aurora Atmosphere Cloud */}
        <div 
          className="absolute -bottom-20 -right-20 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full blur-[90px] sm:blur-[120px] transition-all duration-1000 ease-out animate-voice-spin-reverse pointer-events-none"
          style={{
            background: isArohiSpeaking
              ? 'radial-gradient(circle, rgba(6,182,212,0.65) 0%, rgba(217,70,239,0.45) 50%, transparent 80%)'
              : isUserSpeaking
              ? 'radial-gradient(circle, rgba(245,158,11,0.55) 0%, rgba(16,185,129,0.45) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(79,70,229,0.25) 50%, transparent 80%)',
            opacity: isArohiSpeaking || isUserSpeaking ? 0.9 : 0.45
          }}
        />

        {/* Layer 4: Voice-Reactive Concentric Soundwave Ripple Rings */}
        {(isArohiSpeaking || isUserSpeaking) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Ripple 1 */}
            <div 
              className={`absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full border border-dashed transition-colors duration-700 animate-voice-ripple-1 ${
                isArohiSpeaking 
                  ? 'border-fuchsia-400/40 shadow-[0_0_40px_rgba(217,70,239,0.35)]' 
                  : 'border-emerald-400/50 shadow-[0_0_40px_rgba(16,185,129,0.4)]'
              }`}
            />
            {/* Ripple 2 */}
            <div 
              className={`absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full border transition-colors duration-700 animate-voice-ripple-2 ${
                isArohiSpeaking 
                  ? 'border-cyan-400/35 shadow-[0_0_50px_rgba(6,182,212,0.3)]' 
                  : 'border-teal-400/45 shadow-[0_0_50px_rgba(20,184,166,0.35)]'
              }`}
            />
            {/* Ripple 3 */}
            <div 
              className={`absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full border border-dotted transition-colors duration-700 animate-voice-ripple-3 ${
                isArohiSpeaking 
                  ? 'border-purple-400/30 shadow-[0_0_60px_rgba(168,85,247,0.25)]' 
                  : 'border-amber-400/40 shadow-[0_0_60px_rgba(245,158,11,0.3)]'
              }`}
            />
          </div>
        )}

        {/* Layer 5: Dynamic Hypnotic Core Orb (Vivid Color Shift & Swirl) */}
        <div 
          className={`relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full blur-[75px] sm:blur-[105px] transition-all duration-700 ease-out ${
            isArohiSpeaking
              ? 'scale-115 opacity-90 animate-voice-spin-fast'
              : isUserSpeaking
              ? 'opacity-90 animate-voice-spin'
              : 'scale-95 opacity-60 animate-voice-spin'
          }`}
          style={{
            transform: isUserSpeaking ? `scale(${1.05 + Math.min(0.35, userVolume / 70)})` : undefined,
            background: isArohiSpeaking
              ? 'radial-gradient(circle, rgba(236,72,153,0.98) 0%, rgba(168,85,247,0.9) 25%, rgba(6,182,212,0.85) 50%, rgba(99,102,241,0.6) 75%, rgba(6,6,12,0) 90%)'
              : isUserSpeaking
              ? 'radial-gradient(circle, rgba(52,211,153,0.98) 0%, rgba(20,184,166,0.9) 25%, rgba(6,182,212,0.85) 50%, rgba(245,158,11,0.65) 75%, rgba(6,6,12,0) 90%)'
              : isConnecting
              ? 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.8) 30%, rgba(147,51,234,0.6) 65%, rgba(6,6,12,0) 85%)'
              : isMutedState
              ? 'radial-gradient(circle, rgba(244,63,94,0.75) 0%, rgba(159,18,57,0.6) 35%, rgba(51,65,85,0.5) 65%, rgba(6,6,12,0) 85%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.85) 0%, rgba(14,165,233,0.75) 35%, rgba(79,70,229,0.55) 65%, rgba(6,6,12,0) 85%)'
          }}
        />

        {/* Layer 6: Secondary Harmonic Counter-Swirling Flow Orb */}
        <div 
          className="absolute w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] rounded-full blur-[65px] sm:blur-[85px] pointer-events-none transition-all duration-700 ease-out animate-voice-spin-reverse"
          style={{
            opacity: isArohiSpeaking ? 0.85 : isUserSpeaking ? 0.8 : 0.5,
            transform: `scale(${1 + (isUserSpeaking ? Math.min(0.25, userVolume / 90) : isArohiSpeaking ? 0.12 : 0)}) rotate(${duration * 15}deg)`,
            background: isArohiSpeaking
              ? 'radial-gradient(circle at 35% 35%, rgba(56,189,248,0.9) 0%, rgba(217,70,239,0.75) 45%, rgba(251,113,133,0.5) 75%, transparent 90%)'
              : isUserSpeaking
              ? 'radial-gradient(circle at 65% 35%, rgba(16,185,129,0.92) 0%, rgba(14,165,233,0.75) 45%, rgba(250,204,21,0.55) 75%, transparent 90%)'
              : 'radial-gradient(circle, rgba(96,165,250,0.75) 0%, rgba(147,51,234,0.45) 50%, transparent 80%)'
          }}
        />

        {/* Layer 7: Center Sound Energy Core Glow */}
        <div 
          className={`absolute w-[120px] sm:w-[160px] h-[120px] sm:h-[160px] rounded-full blur-[40px] sm:blur-[50px] transition-all duration-500 pointer-events-none ${
            isArohiSpeaking 
              ? 'bg-fuchsia-300/80 scale-125' 
              : isUserSpeaking 
              ? 'bg-emerald-300/85 scale-120' 
              : 'bg-cyan-400/50 scale-100'
          }`}
          style={{
            transform: isUserSpeaking ? `scale(${1 + Math.min(0.4, userVolume / 60)})` : undefined
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP HEADER BAR: AROHI TITLE, SUBTITLE & CALL TIMER */}
      {/* ========================================================================= */}
      <header className="relative z-20 flex flex-col items-center justify-center w-full max-w-md mx-auto pt-2 sm:pt-4 px-4 text-center">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
          <span>Arohi</span>
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-tight mt-0.5">
          In call with Arohi by Arohi Xaldra 7.0
        </p>
        
        {/* Call Timer directly below the subtitle */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-xs sm:text-sm font-mono font-medium text-slate-200 tracking-wider shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{formatDuration(duration)}</span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. CENTER CONVERSATIONAL FLOW (TYPED LIVE TEXT ON SCREEN) */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-lg mx-auto px-4 sm:px-6 my-auto select-text overflow-hidden">
        
        {/* Scrollable Conversation Stream Overlay */}
        <div 
          ref={transcriptContainerRef}
          className="w-full max-h-[50vh] overflow-y-auto space-y-4 sm:space-y-6 no-scrollbar py-4"
        >
          {visibleTurns.map((turn, idx) => (
            <div 
              key={idx} 
              className={`transition-all duration-300 ${
                turn.speaker === 'user' ? 'text-left' : 'text-left'
              }`}
            >
              {turn.speaker === 'arohi' ? (
                /* Arohi Response: Crisp High-Contrast Bold White Typography */
                <p className="text-white text-base sm:text-xl md:text-2xl font-bold leading-relaxed tracking-tight select-text">
                  {turn.text}
                </p>
              ) : (
                /* User Speech: Soft Dimmed Slate/Silver Typography */
                <p className="text-slate-400 text-sm sm:text-base md:text-lg font-medium leading-normal select-text">
                  {turn.text}
                </p>
              )}
            </div>
          ))}

          {/* Real-time Streaming of Arohi's text if currently streaming */}
          {currentSpeech && (
            <div className="text-left animate-in fade-in duration-150">
              <p className="text-white text-base sm:text-xl md:text-2xl font-bold leading-relaxed tracking-tight select-text">
                {currentSpeech}
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1.5 animate-pulse" />
              </p>
            </div>
          )}

          {/* Real-time Speech-to-Text of User speaking */}
          {liveUserSpeech && (
            <div className="text-left animate-in fade-in duration-150">
              <p className="text-slate-400 text-sm sm:text-base md:text-lg font-medium leading-normal italic select-text">
                {liveUserSpeech}...
              </p>
            </div>
          )}

          <div ref={transcriptEndRef} />
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

      {/* ========================================================================= */}
      {/* 4. BOTTOM STATUS BADGE & CALL ACTION CONTROLS (KIMI STYLE) */}
      {/* ========================================================================= */}
      <footer className="relative z-20 w-full max-w-md mx-auto flex flex-col items-center gap-4 sm:gap-5 pb-2 sm:pb-4">
        
        {/* Status Indicator Line (e.g. "Arohi is thinking" with 7 step dots) */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-300">
            {isArohiSpeaking 
              ? <span className="text-fuchsia-300 font-bold drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">Arohi is speaking...</span> 
              : isUserSpeaking 
              ? <span className="text-emerald-300 font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">Listening to you...</span> 
              : isConnecting
              ? <span className="text-amber-300 font-bold">Connecting to Arohi...</span>
              : isMutedState
              ? <span className="text-slate-400">Call Paused / Muted</span>
              : <span className="text-cyan-200">Arohi is listening...</span>}
          </p>

          {/* 7 Pulsating Step Dots (Kimi Visual Signature) */}
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const isPulsing = (isArohiSpeaking || isUserSpeaking || status === 'listening' || status === 'connecting');
              return (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isArohiSpeaking
                      ? 'bg-fuchsia-400 shadow-[0_0_6px_rgba(217,70,239,0.8)]'
                      : isUserSpeaking
                      ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]'
                      : 'bg-cyan-400/70'
                  }`}
                  style={{
                    opacity: isPulsing ? 0.35 + (Math.sin((duration * 4) + i * 0.8) * 0.45 + 0.45) * 0.65 : 0.4,
                    transform: isPulsing ? `scale(${1 + Math.sin((duration * 4) + i * 0.8) * 0.3})` : 'scale(1)'
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Circular Action Buttons Dock: Pause / Resume & End Call */}
        <div className="flex items-center justify-center gap-10 sm:gap-14 w-full px-6">
          
          {/* Pause / Resume Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={toggleMute}
              disabled={status === 'connecting' || status === 'error'}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xl ${
                isMuted
                  ? 'bg-amber-600/80 border border-amber-500 text-white hover:bg-amber-500'
                  : 'bg-white/10 hover:bg-white/15 border border-white/10 text-white backdrop-blur-md'
              }`}
              title={isMuted ? 'Resume Call' : 'Pause Call'}
            >
              {isMuted ? (
                <Play className="w-6 h-6 fill-current translate-x-0.5 text-white" />
              ) : (
                <Pause className="w-6 h-6 text-white" />
              )}
            </button>
            <span className="text-xs text-slate-400 font-medium">
              {isMuted ? 'Resume' : 'Pause'}
            </span>
          </div>

          {/* End Call Button (Red Circle) */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleEndCall}
              className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-lg shadow-rose-950/60"
              title="End Call"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
            <span className="text-xs text-slate-400 font-medium">End</span>
          </div>

        </div>

        {/* Tap to Show Keyboard Trigger Link */}
        <button
          onClick={() => setShowKeyboardDrawer(true)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer pt-1"
        >
          <Keyboard className="w-4 h-4 text-slate-400" />
          <span>Tap to show keyboard</span>
        </button>

      </footer>

      {/* ========================================================================= */}
      {/* 5. KEYBOARD DRAWER MODAL (TYPE PROMPTS TO AROHI) */}
      {/* ========================================================================= */}
      {showKeyboardDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-lg mx-auto bg-[#101018] border-t border-white/10 p-4 rounded-t-3xl shadow-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
                Type to Arohi during call
              </span>
              <button
                onClick={() => setShowKeyboardDrawer(false)}
                className="p-1 hover:text-white rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendTextPrompt()}
                placeholder="Ask or tell Arohi anything..."
                autoFocus
                className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleSendTextPrompt}
                disabled={!textInput.trim()}
                className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-white rounded-xl cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SETTINGS & LANGUAGE DRAWER */}
      {/* ========================================================================= */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#0e0e17] border-l border-white/10 h-full flex flex-col shadow-2xl p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Call & Voice Settings</h3>
              </div>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selector */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" /> Regional Voice Language
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
                  { code: 'hi', label: 'हिंदी (Hindi)' },
                  { code: 'en', label: 'English (India)' },
                  { code: 'bn', label: 'বাংলা (Bengali)' },
                  { code: 'te', label: 'తెలుగు (Telugu)' },
                  { code: 'ta', label: 'தமிழ் (Tamil)' },
                  { code: 'mr', label: 'मराठी (Marathi)' },
                  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
                  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
                  { code: 'ml', label: 'മലയാളം (Malayalam)' }
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setActiveLanguage(item.code);
                      showToast(`Switched language to ${item.label}`);
                      setShowSettingsDrawer(false);
                      setSessionKey(k => k + 1);
                    }}
                    className={`p-2 rounded-xl text-left font-medium border transition-all cursor-pointer ${
                      activeLanguage === item.code
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Call Telemetry Card */}
            <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Call Duration:</span>
                <span className="font-mono text-cyan-300 font-bold">{formatDuration(duration)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Voice Persona:</span>
                <span className="font-mono text-white">Zypher (Arohi Regional)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Model Engine:</span>
                <span className="font-mono text-emerald-400 font-bold">Arohi Xaldra 7.0 Live</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Transcript Turns:</span>
                <span className="font-mono text-slate-200">{turns.length} turns</span>
              </div>
            </div>

            {/* Copy Transcript Button */}
            <button
              onClick={handleCopyTranscript}
              className="w-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              {copiedTranscript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedTranscript ? 'Copied Transcript!' : 'Copy Full Transcript'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. FULL TRANSCRIPT & HISTORY DRAWER */}
      {/* ========================================================================= */}
      {showSessionHistory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0c0c14] border-l border-white/10 h-full flex flex-col shadow-2xl">
            <div className="p-4 bg-[#12121c] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Full Call Transcript</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveSessionSnapshot}
                  className="text-xs bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-cyan-900"
                >
                  Save Snapshot
                </button>
                <button
                  onClick={() => setShowSessionHistory(false)}
                  className="p-1 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs text-left">
              {turns.map((turn, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-xl border ${
                    turn.speaker === 'user' 
                      ? 'bg-blue-950/30 border-blue-800/40 text-slate-200' 
                      : 'bg-white/5 border-white/10 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-cyan-400">
                      {turn.speaker === 'user' ? 'You' : 'Arohi'}
                    </span>
                    <span>{turn.timestamp}</span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{turn.text}</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-[#10101a]">
              <button
                onClick={handleCopyTranscript}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2"
              >
                {copiedTranscript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedTranscript ? 'Copied to Clipboard!' : 'Copy Entire Conversation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastNotification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-cyan-500/50 text-slate-100 text-xs font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in duration-200">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{toastNotification}</span>
        </div>
      )}

    </div>
  );
}
