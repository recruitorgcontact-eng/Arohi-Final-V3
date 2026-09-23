// VanaVeda by Arohi - Sacred Ayurvedic Live Voice Call Screen
// Real-time bi-directional streaming voice call in Odia, Hindi, and English powered by
// Arohi's Gemini Live WebSocket engine (/api/live-ws?mode=vanaveda) with direct acoustic PCM streaming,
// instant voice barge-in, sacred sound bells, live botanical camera inspection, and real-time clinical subtitles.

import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneOff, Mic, MicOff, Volume2, VolumeX, Video, VideoOff, 
  Sparkles, ChevronUp, ChevronDown, RefreshCw, Radio,
  Leaf, AlertTriangle, ShieldCheck, HeartPulse
} from 'lucide-react';
import { vanavedaAudio } from './vanavedaAudio';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';

interface Props {
  language: 'or' | 'hi' | 'en';
  selectedLeafContext?: string | null;
  uid?: string;
  onEndCall: () => void;
}

interface DialogueTurn {
  id: string;
  speaker: 'user' | 'arohi';
  text: string;
  time: string;
}

// Audio downsampling from browser rate to 16000 Hz for Gemini Live
function downsampleBuffer(buffer: Float32Array, inputSampleRate: number, outputSampleRate: number = 16000): Float32Array {
  if (outputSampleRate === inputSampleRate) return buffer;
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
}

// Convert Float32Array audio samples into 16-bit linear PCM
function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
  const output = new DataView(new ArrayBuffer(input.length * 2));
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return output.buffer;
}

// Convert ArrayBuffer into base64 string
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export const VanaVedaVoiceCallScreen: React.FC<Props> = ({
  language,
  selectedLeafContext,
  uid,
  onEndCall,
}) => {
  const isOdia = language === 'or';
  const isHindi = language === 'hi';

  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<'connecting' | 'listening' | 'thinking' | 'speaking'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);

  const [userVolume, setUserVolume] = useState(0);
  const [interimSpeech, setInterimSpeech] = useState('');

  const [dialogueHistory, setDialogueHistory] = useState<DialogueTurn[]>([]);
  const [activeUserTurn, setActiveUserTurn] = useState<{ text: string; time: string } | null>(null);
  const [activeArohiTurn, setActiveArohiTurn] = useState<{ text: string; time: string } | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const nextStartTimeRef = useRef<number>(0);
  const smoothedVolumeRef = useRef<number>(0);
  const lastVolumeUpdateRef = useRef<number>(0);
  const cameraIntervalRef = useRef<any>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMutedRef = useRef(isMuted);
  const isSpeakerOnRef = useRef(isSpeakerOn);
  const callStatusRef = useRef(callStatus);
  const activeArohiAccumulatorRef = useRef<string>('');
  const callDurationRef = useRef(callDuration);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    isSpeakerOnRef.current = isSpeakerOn;
  }, [isSpeakerOn]);

  useEffect(() => {
    callStatusRef.current = callStatus;
  }, [callStatus]);

  useEffect(() => {
    callDurationRef.current = callDuration;
  }, [callDuration]);

  // Format MM:SS timer
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Botanical quick inquiry voice chips
  const quickChips = [
    { 
      id: 'mic_check', 
      labelOr: 'ଶୁଭୁଛି କି? (ମାଇକ୍ ଚେକ୍)', 
      labelHi: 'क्या आवाज़ आ रही है?', 
      labelEn: 'Can you hear me?', 
      query: isOdia ? 'ମୁଁ କଣ କହୁଛି ଶୁଭୁଛି ନା ଶୁଭୁନି?' : isHindi ? 'क्या मेरी आवाज़ आ रही है?' : 'Can you hear me clearly?' 
    },
    { 
      id: 'pitta_acid', 
      labelOr: 'ପିତ୍ତ ଶାନ୍ତି ଓ ଏସିଡିଟି (Pitta)', 
      labelHi: 'पित्त शांति व एसिडिटी', 
      labelEn: 'Cool Pitta & Acidity', 
      query: isOdia ? 'ମୋ ଛାତି ଓ ପେଟରେ ଖୁବ୍ ଜ୍ୱଳନ ହେଉଛି ଏବଂ ଏସିଡିଟି ବଢ଼ିଛି, ପିତ୍ତ ଶାନ୍ତି ପାଇଁ କଣ କରିବି?' : isHindi ? 'पेट और सीने में अत्यधिक जलन व एसिडिटी है, पित्त शांत करने के लिए क्या करूं?' : 'I have severe burning in chest and stomach with acidity. What herbs soothe this Pitta flare?' 
    },
    { 
      id: 'digestive_agni', 
      labelOr: 'ଦୁର୍ବଳ ଅଗ୍ନି ଓ ଅଜୀର୍ଣ୍ଣ (Agni)', 
      labelHi: 'मंद अग्नि व अपच', 
      labelEn: 'Kindle Digestive Agni', 
      query: isOdia ? 'ମୋର ଭୋକ ଲାଗୁନାହିଁ, ପେଟ ଭାରି ଲାଗୁଛି ଓ ହଜମ ହେଉନାହିଁ।' : isHindi ? 'भूख नहीं लग रही है, पेट भारी है और खाना पच नहीं रहा।' : 'My digestion is very sluggish, appetite is low and feeling heavy after meals.' 
    },
    { 
      id: 'brahmi_stress', 
      labelOr: 'ମସ୍ତିଷ୍କ ଚିନ୍ତା ଓ ନିଦ୍ରାହୀନତା', 
      labelHi: 'तनाव, स्मृति व अनिद्रा', 
      labelEn: 'Brahmi / Sleep & Mind', 
      query: isOdia ? 'ରାତିରେ ନିଦ ହେଉନାହିଁ, ମନରେ ଉଦ୍‌ବେଗ ଓ ମୁଣ୍ଡ ଭାରି ଲାଗୁଛି।' : isHindi ? 'रात को नींद नहीं आती, सिर भारी रहता है और तनाव महसूस होता है।' : 'I am struggling with poor sleep, racing thoughts, and mental fatigue.' 
    },
    { 
      id: 'joint_parijat', 
      labelOr: 'ସନ୍ଧିବାତ ଓ ଗଣ୍ଠି ଯନ୍ତ୍ରଣା (Vata)', 
      labelHi: 'जोड़ों का दर्द व वात', 
      labelEn: 'Joint Pain & Parijat', 
      query: isOdia ? 'ଗଣ୍ଠି ଗଣ୍ଠିରେ କଷ୍ଟ ଓ ବାତ ଯନ୍ତ୍ରଣା ହେଉଛି। ପାରିଜାତ କିମ୍ବା ନିର୍ଗୁଣ୍ଡି ପତ୍ର କିପରି ବ୍ୟବହାର କରିବି?' : isHindi ? 'जोड़ों में अकड़न और वात का दर्द है। पारिजात का प्रयोग कैसे करें?' : 'I have chronic joint stiffness and Vata pain. How can I use Parijat or Nirgundi leaves?' 
    },
    { 
      id: 'arjuna_heart', 
      labelOr: 'ଅର୍ଜୁନ ଛାଲି ଓ ରକ୍ତଚାପ', 
      labelHi: 'अर्जुन छाल व हृदय स्वास्थ्य', 
      labelEn: 'Arjuna Bark for Heart', 
      query: isOdia ? 'ଉଚ୍ଚ ରକ୍ତଚାପ ଓ ହୃଦୟ ସୁରକ୍ଷା ପାଇଁ ଅର୍ଜୁନ କ୍ଷୀରପାକ କିପରି ତିଆରି କରିବି?' : isHindi ? 'हृदय स्वास्थ्य व रक्तचाप के लिए अर्जुन क्षीरपाक कैसे तैयार करें?' : 'How should I prepare Arjuna bark milk decoction for cardiovascular strength?' 
    },
  ];

  // Stop current speech playback
  const stopAllPlayback = () => {
    audioQueueRef.current.forEach(source => {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {}
    });
    audioQueueRef.current = [];
    nextStartTimeRef.current = 0;
    stopArohiVoice();
  };

  // Play incoming 24kHz PCM chunk (supports Base64 string or binary ArrayBuffer)
  const playLiveAudioChunk = (pcmData: string | ArrayBuffer) => {
    if (!isSpeakerOnRef.current) return;
    try {
      const ctx = outputAudioCtxRef.current;
      if (!ctx || ctx.state === 'closed') return;

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      let float32Array: Float32Array;
      let sampleCount = 0;

      if (typeof pcmData === 'string') {
        const binary = window.atob(pcmData);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        sampleCount = Math.floor(len / 2);
        if (sampleCount <= 0) return;
        float32Array = new Float32Array(sampleCount);
        const dataView = new DataView(bytes.buffer, bytes.byteOffset, sampleCount * 2);
        for (let i = 0; i < sampleCount; i++) {
          const pcm16 = dataView.getInt16(i * 2, true);
          float32Array[i] = pcm16 / 32768.0;
        }
      } else {
        sampleCount = Math.floor(pcmData.byteLength / 2);
        if (sampleCount <= 0) return;
        const dataView = new DataView(pcmData);
        float32Array = new Float32Array(sampleCount);
        for (let i = 0; i < sampleCount; i++) {
          const pcm16 = dataView.getInt16(i * 2, true);
          float32Array[i] = pcm16 / 32768.0;
        }
      }

      const audioBuffer = ctx.createBuffer(1, sampleCount, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

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
          setCallStatus('listening');
        }
      };
    } catch (e) {
      console.warn('[VanaVeda Live Voice] Error playing audio chunk:', e);
    }
  };

  // Commit user spoken text to persistent transcript dialogue history
  const commitUserSpeech = (userSpokenText: string) => {
    const clean = (userSpokenText || '').trim();
    if (!clean) return;

    setDialogueHistory(prev => {
      const last = prev[prev.length - 1];
      if (last && last.speaker === 'user' && (last.text === clean || clean.startsWith(last.text))) {
        return [...prev.slice(0, -1), { ...last, text: clean }];
      }
      return [
        ...prev,
        {
          id: 'user-' + Date.now(),
          speaker: 'user',
          text: clean,
          time: formatTimer(callDurationRef.current),
        }
      ];
    });
    setActiveUserTurn(null);
    setInterimSpeech('');
  };

  // Send textual query over open WebSocket or failover to REST
  const sendQuery = async (queryText: string) => {
    const cleanText = (queryText || '').trim();
    if (!cleanText) return;

    stopAllPlayback();
    setInterimSpeech('');
    setCallStatus('thinking');

    const currentTimeStr = formatTimer(callDurationRef.current);
    setActiveUserTurn({
      text: cleanText,
      time: currentTimeStr,
    });
    commitUserSpeech(cleanText);
    setActiveArohiTurn(null);
    activeArohiAccumulatorRef.current = '';

    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ text: cleanText }));
        return;
      } catch (e) {
        console.warn('WebSocket send failed, switching to REST fallback:', e);
      }
    }

    // Fail-safe REST fallback
    try {
      const res = await fetch('/api/live-voice-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: cleanText,
          language: isOdia ? 'or' : isHindi ? 'hi' : 'en',
          mode: 'vanaveda',
          uid,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.transcript || data.reply || (isOdia ? 'ହରି ଓଁ, ମୁଁ ଆପଣଙ୍କ କଥା ଶୁଣିଲି।' : 'Harih Om, I have noted your concern.');
        const spokenTime = formatTimer(callDurationRef.current + 1);
        const cleanReply = replyText.replace(/[*#_`~]/g, '').trim();

        setActiveArohiTurn({
          text: cleanReply,
          time: spokenTime,
        });

        setDialogueHistory(prev => [
          ...prev,
          {
            id: 'arohi-' + Date.now(),
            speaker: 'arohi',
            text: cleanReply,
            time: spokenTime,
          }
        ]);

        if (isSpeakerOnRef.current) {
          setCallStatus('speaking');
          playArohiVoice(cleanReply, {
            language: isOdia ? 'or-IN' : isHindi ? 'hi-IN' : 'en-IN',
            voice: 'Zypher',
            onEnd: () => {
              setCallStatus('listening');
              setActiveArohiTurn(null);
            },
            onError: () => {
              setCallStatus('listening');
              setActiveArohiTurn(null);
            },
          });
        } else {
          setCallStatus('listening');
          setActiveArohiTurn(null);
        }
      }
    } catch (err) {
      console.warn('REST fallback error:', err);
      setCallStatus('listening');
      setActiveArohiTurn(null);
    }
  };

  // Camera video frame capture for botanical inspection
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      videoStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);

      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext('2d');

      // Send 1 frame every 1.5s for live leaf/herb vision
      cameraIntervalRef.current = setInterval(() => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN || !videoRef.current || !ctx) return;
        try {
          ctx.drawImage(videoRef.current, 0, 0, 320, 240);
          const base64Data = canvas.toDataURL('image/jpeg', 0.6).split(',')[1];
          wsRef.current.send(JSON.stringify({
            image: base64Data,
            realtimeInput: {
              mediaChunks: [{ mimeType: 'image/jpeg', data: base64Data }]
            }
          }));
        } catch (e) {}
      }, 1500);
    } catch (e) {
      console.warn('Could not access camera:', e);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraIntervalRef.current) {
      clearInterval(cameraIntervalRef.current);
      cameraIntervalRef.current = null;
    }
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach(t => t.stop());
      videoStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Main Live Session Lifecycle
  useEffect(() => {
    let active = true;

    // Bell chime on initiation
    vanavedaAudio.playTempleBell(587.33);

    // Call duration timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Audio unlock listener for mobile gesture restrictions
    const unlockAudio = () => {
      if (inputAudioCtxRef.current && inputAudioCtxRef.current.state === 'suspended') {
        inputAudioCtxRef.current.resume().catch(() => {});
      }
      if (outputAudioCtxRef.current && outputAudioCtxRef.current.state === 'suspended') {
        outputAudioCtxRef.current.resume().catch(() => {});
      }
    };
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('click', unlockAudio);

    const startSession = async () => {
      try {
        setCallStatus('connecting');

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const langParam = isOdia ? 'or' : isHindi ? 'hi' : 'en';
        const leafParam = selectedLeafContext ? `&leaf=${encodeURIComponent(selectedLeafContext)}` : '';
        const wsUrl = `${protocol}//${window.location.host}/api/live-ws?voice=Zypher&lang=${encodeURIComponent(langParam)}&mode=vanaveda${leafParam}${uid ? `&uid=${encodeURIComponent(uid)}` : ''}`;

        console.log('[VanaVeda Live Voice] Connecting WebSocket:', wsUrl);
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          if (!active) return;
          console.log('[VanaVeda Live Voice] WebSocket connected successfully.');
          setCallStatus('listening');
        };

        ws.onmessage = async (event) => {
          if (!active) return;
          try {
            // Handle binary PCM directly
            if (event.data instanceof Blob) {
              const buffer = await event.data.arrayBuffer();
              setCallStatus('speaking');
              playLiveAudioChunk(buffer);
              return;
            } else if (event.data instanceof ArrayBuffer) {
              setCallStatus('speaking');
              playLiveAudioChunk(event.data);
              return;
            }

            const data = JSON.parse(event.data);

            // 1. Spoken base64 audio
            if (data.audio) {
              setCallStatus('speaking');
              playLiveAudioChunk(data.audio);
            }

            // 2. Real-time Transcript
            if (data.transcript || data.text || data.data) {
              const textChunk = data.transcript || data.text || data.data;
              const speaker = data.speaker || 'arohi';

              if (speaker === 'arohi') {
                setInterimSpeech('');
                const cleaned = textChunk.replace(/[*#`_~]/g, '');
                if (cleaned) {
                  setCallStatus('speaking');
                  // If there was an active user speech bubble, commit it before Arohi speaks
                  if (activeUserTurn) {
                    commitUserSpeech(activeUserTurn.text);
                  }

                  activeArohiAccumulatorRef.current = activeArohiAccumulatorRef.current 
                    ? (activeArohiAccumulatorRef.current.endsWith(' ') ? activeArohiAccumulatorRef.current + cleaned : activeArohiAccumulatorRef.current + ' ' + cleaned)
                    : cleaned;

                  setActiveArohiTurn({
                    text: activeArohiAccumulatorRef.current,
                    time: formatTimer(callDurationRef.current),
                  });
                }
              } else if (speaker === 'user') {
                const userCleaned = textChunk.replace(/[*#`_~]/g, '').trim();
                if (userCleaned) {
                  setInterimSpeech(userCleaned);
                  setActiveUserTurn({
                    text: userCleaned,
                    time: formatTimer(callDurationRef.current),
                  });
                }
              }
            }

            // 3. Barge-In Interruption Notice
            if (data.interrupted) {
              stopAllPlayback();
              setCallStatus('listening');
              setInterimSpeech('');
              activeArohiAccumulatorRef.current = '';
              setActiveArohiTurn(null);
            }

            // 4. Turn Completion
            if (data.turnComplete || data.type === 'turnComplete') {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                try { window.speechSynthesis.cancel(); } catch (e) {}
              }
              const finalArohi = activeArohiAccumulatorRef.current.trim();
              if (finalArohi) {
                setDialogueHistory(prev => [
                  ...prev,
                  {
                    id: 'arohi-' + Date.now(),
                    speaker: 'arohi',
                    text: finalArohi,
                    time: formatTimer(callDurationRef.current),
                  }
                ]);
              }
              activeArohiAccumulatorRef.current = '';
              setActiveArohiTurn(null);
              if (audioQueueRef.current.length === 0 && !isMutedRef.current) {
                setCallStatus('listening');
              }
            } else if (data.error) {
              console.warn('[VanaVeda Live Voice] WebSocket notice:', data.error);
            }
          } catch (err) {
            console.warn('Error parsing VanaVeda WebSocket message:', err);
          }
        };

        ws.onerror = (err) => {
          console.warn('[VanaVeda Live Voice] WebSocket notice:', err);
          if (active && callStatusRef.current === 'connecting') {
            setCallStatus('listening');
          }
        };

        ws.onclose = () => {
          console.log('[VanaVeda Live Voice] WebSocket closed.');
          if (active) {
            setCallStatus('listening');
          }
        };

        // Initialize SpeechRecognition for zero-latency local Odia transcription
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRec) {
          try {
            const recognition = new SpeechRec();
            recognitionRef.current = recognition;
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = isOdia ? 'or-IN' : isHindi ? 'hi-IN' : 'en-IN';

            recognition.onresult = (evt: any) => {
              if (callStatusRef.current === 'speaking') return;

              let interim = '';
              let finalTranscript = '';
              for (let i = evt.resultIndex; i < evt.results.length; ++i) {
                const transcript = evt.results[i][0].transcript;
                if (evt.results[i].isFinal) {
                  finalTranscript += transcript;
                } else {
                  interim += transcript;
                }
              }

              const displayInterim = (interim || finalTranscript).trim();
              if (displayInterim) {
                setInterimSpeech(displayInterim);
                setActiveUserTurn({
                  text: displayInterim,
                  time: formatTimer(callDurationRef.current),
                });
              }

              if (finalTranscript.trim()) {
                const finalClean = finalTranscript.trim();
                commitUserSpeech(finalClean);
                if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                  try {
                    wsRef.current.send(JSON.stringify({ text: finalClean }));
                  } catch (e) {}
                }
              }
            };

            recognition.onerror = (recErr: any) => {
              if (recErr.error !== 'no-speech' && recErr.error !== 'aborted') {
                console.warn('[VanaVeda STT notice]:', recErr.error);
              }
            };

            recognition.onend = () => {
              if (active && !isMutedRef.current && callStatusRef.current !== 'connecting') {
                try {
                  recognition.start();
                } catch (e) {}
              }
            };

            recognition.start();
          } catch (sttErr) {
            console.warn('[VanaVeda STT] SpeechRecognition not active:', sttErr);
          }
        }

        // Microphone Setup
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          }
        });
        micStreamRef.current = stream;

        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const inputCtx = new AudioCtx();
        inputAudioCtxRef.current = inputCtx;

        const outputCtx = new AudioCtx({ sampleRate: 24000 });
        outputAudioCtxRef.current = outputCtx;

        const source = inputCtx.createMediaStreamSource(stream);
        const scriptProcessor = inputCtx.createScriptProcessor(2048, 1, 1);
        scriptProcessorRef.current = scriptProcessor;

        source.connect(scriptProcessor);
        scriptProcessor.connect(inputCtx.destination);

        scriptProcessor.onaudioprocess = (e) => {
          if (!active || isMutedRef.current || ws.readyState !== WebSocket.OPEN) return;

          const float32Data = e.inputBuffer.getChannelData(0);

          // Volume metering
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

          // Voice barge-in: If caller speaks clearly into mic while Arohi is speaking, halt voice immediately
          if (rawVol > 22 && (audioQueueRef.current.length > 0 || callStatusRef.current === 'speaking' || (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking))) {
            stopAllPlayback();
            setCallStatus('listening');
            activeArohiAccumulatorRef.current = '';
            setActiveArohiTurn(null);
            if (ws && ws.readyState === WebSocket.OPEN) {
              try {
                ws.send(JSON.stringify({ interrupted: true }));
              } catch (e) {}
            }
          }

          // Downsample input float32 audio to 16kHz linear PCM for Gemini Live API
          const downsampled = downsampleBuffer(float32Data, inputCtx.sampleRate || 16000, 16000);
          const pcm16 = floatTo16BitPCM(downsampled);
          const base64Audio = arrayBufferToBase64(pcm16);

          if (ws && ws.readyState === WebSocket.OPEN) {
            try {
              ws.send(JSON.stringify({ audio: base64Audio }));
            } catch (err) {}
          }
        };
      } catch (err) {
        console.warn('[VanaVeda Live Voice] Media error:', err);
        setCallStatus('listening');
      }
    };

    startSession();

    return () => {
      active = false;
      clearInterval(timer);
      stopCamera();
      stopAllPlayback();

      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);

      if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
        scriptProcessorRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
      if (inputAudioCtxRef.current && inputAudioCtxRef.current.state !== 'closed') {
        inputAudioCtxRef.current.close().catch(() => {});
      }
      if (outputAudioCtxRef.current && outputAudioCtxRef.current.state !== 'closed') {
        outputAudioCtxRef.current.close().catch(() => {});
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.abort();
        } catch (e) {}
        recognitionRef.current = null;
      }

      // Closing singing bowl overtone
      vanavedaAudio.playSingingBowl(528);
    };
  }, []);

  const handleEndCall = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }
    stopAllPlayback();
    onEndCall();
  };

  const statusLabel = {
    connecting: isOdia ? 'ସଂଯୋଗ ହେଉଛି...' : isHindi ? 'जुड़ रहे हैं...' : 'Connecting...',
    listening: isOdia ? 'ଆରୋହୀ ଶୁଣୁଛନ୍ତି • କୁହନ୍ତୁ' : isHindi ? 'आरोही सुन रही हैं • बोलिए' : 'Arohi is Listening • Speak now',
    thinking: isOdia ? 'ଚିନ୍ତନ କରୁଛନ୍ତି...' : isHindi ? 'विचार कर रही हैं...' : 'Consulting Sushruta scriptures...',
    speaking: isOdia ? 'ଆରୋହୀ କହୁଛନ୍ତି...' : isHindi ? 'आरोही बोल रही हैं...' : 'Arohi is Speaking...',
  }[callStatus];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-linear-to-b from-[#041a10] via-[#072e1d] to-[#02130b] text-emerald-50 overflow-hidden select-none font-sans">
      {/* Background Sacred Geometric Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-emerald-500/20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-amber-500/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-radial from-emerald-500/10 to-transparent blur-2xl" />
      </div>

      {/* Top App Bar */}
      <header className="relative z-10 px-4 pt-4 pb-3 flex items-center justify-between border-b border-emerald-900/40 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/40">
            <Leaf className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-base sm:text-lg text-emerald-100 tracking-wide flex items-center gap-1.5">
                <span>ଆରୋହୀ ବେଦ-ବୈଦ୍ୟ</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-sans border border-amber-500/30">
                  LIVE CALL
                </span>
              </h2>
            </div>
            <p className="text-xs text-emerald-300/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>{formatTimer(callDuration)}</span>
              <span>•</span>
              <span className="text-amber-200">24kHz Zypher Neural HD</span>
            </p>
          </div>
        </div>

        {/* Status Chip */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-2 backdrop-blur-md transition-all ${
            callStatus === 'speaking' 
              ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200 shadow-md shadow-emerald-500/20'
              : callStatus === 'thinking'
              ? 'bg-amber-500/20 border-amber-400/50 text-amber-200'
              : callStatus === 'listening'
              ? 'bg-teal-500/20 border-teal-400/50 text-teal-200'
              : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
          }`}>
            <Radio className={`w-3.5 h-3.5 ${callStatus === 'speaking' ? 'animate-pulse text-emerald-400' : 'text-amber-400'}`} />
            <span>{statusLabel}</span>
          </div>
        </div>
      </header>

      {/* Main Sanctuary Avatar & Visualizer Body */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 min-h-0">
        {/* Optional Live Camera Preview for Leaves/Herbs */}
        {isCameraActive && (
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-emerald-500/60 mb-3 bg-black">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>BOTANICAL VISION</span>
            </div>
          </div>
        )}

        {/* Sacred Vaidya Central Avatar */}
        <div className="relative flex items-center justify-center">
          {/* Animated Prana / Ojas Vitality Rings */}
          <div className={`absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full transition-transform duration-500 border border-emerald-400/20 ${
            callStatus === 'speaking' ? 'scale-125 border-emerald-400/40 animate-ping' : ''
          }`} />
          <div className={`absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full transition-transform duration-300 border border-amber-400/20 ${
            callStatus === 'speaking' ? 'scale-110 border-amber-400/30' : ''
          }`} />

          {/* User Mic Volume Feedback Ring */}
          <div 
            className="absolute rounded-full border-2 border-emerald-400/60 transition-all duration-75 pointer-events-none"
            style={{
              width: `${160 + userVolume * 1.2}px`,
              height: `${160 + userVolume * 1.2}px`,
              opacity: userVolume > 5 ? Math.min(1, userVolume / 40) : 0,
            }}
          />

          {/* Central Portrait Disc */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-linear-to-b from-[#0b4d30] to-[#042416] p-1.5 shadow-2xl shadow-emerald-950/80 ring-4 ring-emerald-500/30">
            <div className="w-full h-full rounded-full overflow-hidden relative flex flex-col items-center justify-center bg-radial from-emerald-800/40 to-emerald-950">
              <div className="text-4xl sm:text-5xl mb-1 filter drop-shadow-md">🌿</div>
              <span className="font-serif font-bold text-sm sm:text-base text-amber-200 tracking-wide">
                ଆରୋହୀ ବୈଦ୍ୟ
              </span>
              <span className="text-[10px] text-emerald-300 font-sans tracking-widest uppercase mt-0.5">
                VEDA-VAIDYA AI
              </span>

              {/* Spoken Aura Glow when Arohi Speaks */}
              {callStatus === 'speaking' && (
                <div className="absolute inset-0 bg-radial from-emerald-400/20 via-transparent to-transparent animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Live Audio Frequency Bars */}
        <div className="mt-4 flex items-center justify-center gap-1.5 h-8">
          {[...Array(12)].map((_, i) => {
            const isArohiSpeaking = callStatus === 'speaking';
            const heightMultiplier = isArohiSpeaking 
              ? Math.sin(Date.now() / 150 + i) * 16 + 18 
              : userVolume > 5 
              ? (userVolume / 100) * (20 + (i % 4) * 4) + 4
              : 4;

            return (
              <div 
                key={i}
                className={`w-1 rounded-full transition-all duration-75 ${
                  isArohiSpeaking ? 'bg-amber-400' : 'bg-emerald-400'
                }`}
                style={{ height: `${Math.max(4, Math.min(32, heightMultiplier))}px` }}
              />
            );
          })}
        </div>

        {/* Real-time Rolling Spoken Subtitle */}
        <div className="mt-3 w-full max-w-xl text-center px-4 min-h-[50px] flex items-center justify-center">
          {callStatus === 'speaking' && activeArohiTurn ? (
            <p className="text-sm sm:text-base font-serif text-emerald-100 font-medium leading-relaxed animate-fade-in line-clamp-3">
              "{activeArohiTurn.text}"
            </p>
          ) : interimSpeech || activeUserTurn ? (
            <p className="text-sm sm:text-base text-amber-200 font-medium leading-relaxed animate-fade-in line-clamp-2">
              "{interimSpeech || activeUserTurn?.text}"
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-emerald-300/70 italic flex items-center gap-1.5 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isOdia 
                  ? 'ଆପଣ ଯେକୌଣସି ଭାଷାରେ (ଓଡ଼ିଆ, ହିନ୍ଦୀ, ଇଂରାଜୀ) କହିପାରିବେ। ଆରୋହୀ ଶୁଣୁଛନ୍ତି।' 
                  : isHindi 
                  ? 'आप किसी भी भाषा (ओड़िया, हिंदी, अंग्रेज़ी) में बात कर सकते हैं।' 
                  : 'Speak naturally in Odia, Hindi, or English. Arohi is listening.'}
              </span>
            </p>
          )}
        </div>

        {/* Quick Clinical Voice Inquiry Chips */}
        <div className="w-full max-w-2xl mt-4 px-2 overflow-x-auto no-scrollbar flex items-center gap-2 py-1 justify-start sm:justify-center">
          {quickChips.map(chip => (
            <button
              key={chip.id}
              onClick={() => sendQuery(chip.query)}
              className="px-3 py-1.5 rounded-full text-xs font-medium shrink-0 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 border border-emerald-700/40 hover:border-amber-400/50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Leaf className="w-3 h-3 text-emerald-400" />
              <span>{isOdia ? chip.labelOr : isHindi ? chip.labelHi : chip.labelEn}</span>
            </button>
          ))}
        </div>
      </main>

      {/* Collapsible Transcript Drawer */}
      {showSubtitles && (
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 mb-2 max-h-36 overflow-y-auto no-scrollbar bg-black/40 backdrop-blur-md rounded-2xl border border-emerald-800/40 p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-emerald-400 border-b border-emerald-900/40 pb-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>{isOdia ? 'ସମ୍ଭାଷଣ ଲିପି (LIVE TRANSCRIPT)' : 'LIVE PRESCRIPTION TRANSCRIPT'}</span>
            </span>
            <button 
              onClick={() => setShowSubtitles(false)}
              className="text-emerald-400 hover:text-emerald-200"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {dialogueHistory.length === 0 && !activeArohiTurn && !activeUserTurn && (
            <p className="text-xs text-emerald-400/60 italic text-center py-2">
              {isOdia ? 'କଥୋପକଥନ ଆରମ୍ଭ ହେଲେ ଏଠାରେ ଲିପି ପ୍ରକାଶ ପାଇବ।' : 'Live transcript will appear here as you speak.'}
            </p>
          )}

          {dialogueHistory.map((item) => (
            <div key={item.id} className={`text-xs ${item.speaker === 'user' ? 'text-amber-200' : 'text-emerald-100'}`}>
              <span className="font-bold text-[10px] text-emerald-400 mr-1.5">
                {item.speaker === 'user' ? '👤 YOU:' : '🌿 AROHI:'}
              </span>
              <span>{item.text}</span>
            </div>
          ))}

          {activeUserTurn && (
            <div className="text-xs text-amber-200 bg-amber-950/30 p-1.5 rounded border border-amber-800/40">
              <span className="font-bold text-[10px] text-amber-300 mr-1.5">👤 YOU:</span>
              <span>{activeUserTurn.text}</span>
            </div>
          )}

          {activeArohiTurn && (
            <div className="text-xs text-emerald-200 bg-emerald-950/40 p-1.5 rounded border border-emerald-800/40">
              <span className="font-bold text-[10px] text-amber-300 mr-1.5">🌿 AROHI:</span>
              <span>{activeArohiTurn.text}</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom Floating Control Bar */}
      <footer className="relative z-10 px-4 py-4 bg-black/40 backdrop-blur-lg border-t border-emerald-900/40 flex items-center justify-around sm:justify-center sm:gap-6">
        {/* Toggle Mute Mic */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isMuted 
              ? 'bg-amber-600/80 text-white ring-2 ring-amber-400 shadow-lg' 
              : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50'
          }`}
          title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Toggle Speaker Audio */}
        <button
          onClick={() => {
            if (isSpeakerOn) {
              stopAllPlayback();
            }
            setIsSpeakerOn(!isSpeakerOn);
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            !isSpeakerOn 
              ? 'bg-amber-600/80 text-white ring-2 ring-amber-400 shadow-lg' 
              : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50'
          }`}
          title={isSpeakerOn ? 'Mute Speaker' : 'Turn On Speaker'}
        >
          {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        {/* Toggle Leaf Inspection Camera */}
        <button
          onClick={() => {
            if (isCameraActive) {
              stopCamera();
            } else {
              startCamera();
            }
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isCameraActive 
              ? 'bg-teal-500 text-white ring-2 ring-teal-300 shadow-lg' 
              : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50'
          }`}
          title="Inspect Leaf / Herb via Camera"
        >
          {isCameraActive ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* Subtitles Toggle */}
        <button
          onClick={() => setShowSubtitles(!showSubtitles)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            showSubtitles 
              ? 'bg-emerald-800/80 text-amber-300 border border-amber-400/40' 
              : 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/40'
          }`}
          title="Toggle Subtitles Drawer"
        >
          {showSubtitles ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="w-14 h-14 rounded-full bg-linear-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white flex items-center justify-center shadow-xl shadow-red-950/80 ring-4 ring-red-400/30 active:scale-95 transition-all"
          title="End Consultation Call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};
