// Screen 3: Live Conversational Veterinary Voice Call Screen
// Real-time bi-directional streaming voice call in Odia, Hindi, and English powered by
// Arohi's Gemini Live WebSocket engine (/api/live-ws) with direct acoustic PCM streaming,
// instant barge-in support, real-time live subtitles, veterinary clinical triage, and camera overlay.

import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneOff, Mic, MicOff, Volume2, VolumeX, Video, VideoOff, 
  Sparkles, Stethoscope, ChevronUp, ChevronDown,
  RefreshCw, Radio, HeartPulse
} from 'lucide-react';
import { VetLanguage, VetSpecies } from '../types';
import { VET_STOCK_IMAGES } from '../data/vetStockImages';
import { playArohiVoice, stopArohiVoice } from '../../../utils/arohiVoicePlayer';

interface Props {
  language: VetLanguage;
  species: VetSpecies;
  animalName?: string;
  animalNameOdia?: string;
  animalPhotoUrl?: string;
  uid?: string;
  onEndCall: () => void;
  onOpenEmergency: () => void;
}

interface DialogueTurn {
  id: string;
  speaker: 'user' | 'arohi';
  textOdia: string;
  textEn: string;
  time: string;
}

// Audio downsampling from input sample rate to 16000 Hz for Gemini Live API
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

export const VetMitraVoiceCallScreen: React.FC<Props> = ({
  language,
  species,
  animalName,
  animalNameOdia,
  animalPhotoUrl,
  uid,
  onEndCall,
  onOpenEmergency,
}) => {
  const isOdia = language === 'or';
  const isHindi = language === 'hi';
  const isUniversalMode = !animalName;
  const displayAnimalName = isOdia && animalNameOdia ? animalNameOdia : animalName;

  // Call timer starts from 00:00
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<'connecting' | 'listening' | 'thinking' | 'speaking'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);

  // Live audio metering (0-100) from user's microphone
  const [userVolume, setUserVolume] = useState(0);
  const [interimSpeech, setInterimSpeech] = useState('');

  // Subtitle history
  const [dialogueHistory, setDialogueHistory] = useState<DialogueTurn[]>([]);
  const [activeUserTurn, setActiveUserTurn] = useState<{ odia: string; en: string; time: string } | null>(null);
  const [activeArohiTurn, setActiveArohiTurn] = useState<{ odia: string; en: string; time: string } | null>(null);

  // Web Audio & WebSocket refs
  const wsRef = useRef<WebSocket | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const nextStartTimeRef = useRef<number>(0);
  const hasReceivedAudioStreamRef = useRef<boolean>(false);
  const smoothedVolumeRef = useRef<number>(0);
  const lastVolumeUpdateRef = useRef<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMutedRef = useRef(isMuted);
  const isSpeakerOnRef = useRef(isSpeakerOn);
  const callStatusRef = useRef(callStatus);
  const activeArohiAccumulatorRef = useRef<string>('');

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    isSpeakerOnRef.current = isSpeakerOn;
  }, [isSpeakerOn]);

  useEffect(() => {
    callStatusRef.current = callStatus;
  }, [callStatus]);

  // Universal or species-specific backdrop image
  const speciesBackdrop = animalPhotoUrl || {
    cattle: VET_STOCK_IMAGES.cattleJersey,
    goat: VET_STOCK_IMAGES.goatPortrait,
    dog: VET_STOCK_IMAGES.dogLabrador,
    cat: VET_STOCK_IMAGES.catPortrait,
  }[species] || VET_STOCK_IMAGES.heroGroup;

  // Species emoji & labels
  const speciesIcon = {
    cattle: '🐄',
    goat: '🐐',
    dog: '🐶',
    cat: '🐱',
  }[species] || '🩺';

  const speciesLabelOr = {
    cattle: 'ଗାଈ',
    goat: 'ଛେଳି',
    dog: 'କୁକୁର',
    cat: 'ବିରାଡ଼ି',
  }[species] || 'ପଶୁ';

  // Universal & species-tailored quick conversation suggestion chips
  const quickChips = isUniversalMode ? [
    { id: 'mic_check', labelOr: 'ଶୁଭୁଛି କି? (ମାଇକ୍ ଚେକ୍)', labelEn: 'Can you hear me?', query: 'ମୁଁ କଣ କହୁଛି ଶୁଭୁଛି ନା ଶୁଭୁନି?' },
    { id: 'milk_drop', labelOr: 'ଗାଈ ଦୁଧ କମିବା / ଖାଉନାହିଁ', labelEn: 'Cow milk drop / off-feed', query: 'ମୋ ଗାଈ ଦୁଧ କମିଯାଇଛି ଏବଂ ଜାବର କାଟୁନାହିଁ। କଣ କରିବି?' },
    { id: 'goat_bloat', labelOr: 'ଛେଳି ପେଟ ଫୁଲିଛି (Bloat)', labelEn: 'Goat bloat alert', query: 'ମୋ ଛେଳିର ପେଟ ଢୋଲ ପରି ଫୁଲିଯାଇଛି ଓ ନିଶ୍ୱାସ ନେଇପାରୁନାହିଁ।' },
    { id: 'dog_vomit', labelOr: 'କୁକୁର ବାନ୍ତି ଓ ଦୁର୍ବଳତା', labelEn: 'Dog vomiting & weak', query: 'ମୋ କୁକୁର ବାନ୍ତି କରୁଛି ଓ କିଛି ଖାଉନାହିଁ।' },
    { id: 'cat_urinary', labelOr: 'ବିରାଡ଼ି ପରିସ୍ରା କଷ୍ଟ (FLUTD)', labelEn: 'Cat litter straining', query: 'ମୋ ବିରାଡ଼ି ପରିସ୍ରା କରିବାରେ ବହୁତ କଷ୍ଟ ପାଉଛି।' },
    { id: 'fever_vax', labelOr: 'ଜ୍ୱର ଓ ଟିକାକରଣ ପରାମର୍ଶ', labelEn: 'Fever & vaccines', query: 'ପଶୁଙ୍କ ଶରୀର ଖୁବ୍ ଗରମ ଲାଗୁଛି, ପ୍ରାଥମିକ ଚିକିତ୍ସା କଣ?' },
    { id: 'emergency_1962', labelOr: 'ଜରୁରୀ ସହାୟତା ୧୯୬୨', labelEn: 'Emergency Vet 1962', query: 'ଅତ୍ୟନ୍ତ ଜରୁରୀ ଅବସ୍ଥାରେ ୧୯୬୨ ଭେଟେରିନାରୀ ଆମ୍ବୁଲାନ୍ସ କିପରି ଡକାଯାଏ?' },
  ] : {
    cat: [
      { id: 'mic_check', labelOr: 'ଶୁଭୁଛି କି? (ମାଇକ୍ ଚେକ୍)', labelEn: 'Can you hear me?', query: 'ମୁଁ କଣ କହୁଛି ଶୁଭୁଛି ନା ଶୁଭୁନି?' },
      { id: 'vomit', labelOr: 'ବିରାଡ଼ି ବାନ୍ତି କରୁଛି', labelEn: 'Cat is vomiting', query: 'ମୋ ବିରାଡ଼ି ବାନ୍ତି କରୁଛି ଏବଂ କିଛି ଖାଉନାହିଁ।' },
      { id: 'flutd', labelOr: 'ଲିଟର ବକ୍ସ କଷ୍ଟ (FLUTD)', labelEn: 'Straining in litter', query: 'ମୋ ବିରାଡ଼ି ଲିଟର ବକ୍ସରେ ପରିସ୍ରା କରିବାରେ ବହୁତ କଷ୍ଟ ପାଉଛି।' },
      { id: 'off_feed', labelOr: 'ଖାଦ୍ୟ ଖାଉନାହିଁ', labelEn: 'Refusing food', query: 'ମୋ ବିରାଡ଼ି ଆଜି ସକାଳୁ କୌଣସି ଖାଦ୍ୟ କିମ୍ବା ପାଣି ପିଉନାହିଁ।' },
    ],
    dog: [
      { id: 'mic_check', labelOr: 'ଶୁଭୁଛି କି? (ମାଇକ୍ ଚେକ୍)', labelEn: 'Can you hear me?', query: 'ମୁଁ କଣ କହୁଛି ଶୁଭୁଛି ନା ଶୁଭୁନି?' },
      { id: 'vomit_fever', labelOr: 'ବାନ୍ତି ଓ ଦୁର୍ବଳତା', labelEn: 'Vomiting & lethargic', query: 'ମୋ କୁକୁର ବାନ୍ତି କରୁଛି ଓ ଖୁବ୍ ଦୁର୍ବଳ ହୋଇ ଶୋଇ ରହୁଛି।' },
      { id: 'parvo_check', labelOr: 'ପାର୍ଭୋ ଲକ୍ଷଣ ଯାଞ୍ଚ', labelEn: 'Parvo alert check', query: 'କୁକୁର ପାଇଁ ପାର୍ଭୋ ରୋଗର ମୁଖ୍ୟ ଲକ୍ଷଣ ଓ ପ୍ରାଥମିକ ସତର୍କତା କଣ?' },
      { id: 'cough_tick', labelOr: 'କାଶ ଓ ଉକୁଣି ସମସ୍ୟା', labelEn: 'Cough & ticks', query: 'କୁକୁର ବାରମ୍ବାର କାଶୁଛି ଏବଂ ଶରୀରରେ ଉକୁଣି ଅଛନ୍ତି।' },
    ],
    goat: [
      { id: 'mic_check', labelOr: 'ଶୁଭୁଛି କି? (ମାଇକ୍ ଚେକ୍)', labelEn: 'Can you hear me?', query: 'ମୁଁ କଣ କହୁଛି ଶୁଭୁଛି ନା ଶୁଭୁନି?' },
      { id: 'bloat', labelOr: 'ପେଟ ଫୁଲିଛି (Bloat)', labelEn: 'Rumen bloat', query: 'ମୋ ଛେଳିର ପେଟ ଢୋଲ ପରି ଫୁଲିଯାଇଛି ଓ ନିଶ୍ୱାସ ନେଇପାରୁନାହିଁ।' },
      { id: 'ppr', labelOr: 'PPR ଟିକା ସୂଚନା', labelEn: 'PPR vaccine guide', query: 'ଛେଳି ବସନ୍ତ (PPR) ଟିକା କେବେ ଓ କିପରି ଦେବା ଉଚିତ୍?' },
      { id: 'deworm', labelOr: 'କୃମିନାଶକ ଔଷଧ', labelEn: 'Goat deworming', query: 'ଛେଳି ମାନଙ୍କୁ କେଉଁ କୃମି ଔଷଧ କେତେ ମାତ୍ରାରେ ଦିଆଯାଏ?' },
    ],
    cattle: [
      { id: 'mic_check', labelOr: 'ଶୁଭୁଛି କି? (ମାଇକ୍ ଚେକ୍)', labelEn: 'Can you hear me?', query: 'ମୁଁ କଣ କହୁଛି ଶୁଭୁଛି ନା ଶୁଭୁନି?' },
      { id: 'milk_drop', labelOr: 'ଦୁଧ କମିଛି', labelEn: 'Milk yield drop', query: 'ମୋ ଗାଈର ଦୁଧ ୧୨ ଲିଟରରୁ ୯ ଲିଟରକୁ କମିଛି। କଣ ଖାଇବାକୁ ଦେବି?' },
      { id: 'mastitis', labelOr: 'ମାଷ୍ଟାଇଟିସ୍ (ଥନ ଫୁଲିବା)', labelEn: 'Swollen udder', query: 'ଗାଈର ଥନ ଫୁଲିଯାଇଛି ଓ କ୍ଷୀର ଛିଣ୍ଡି ଯାଉଛି। ପ୍ରାଥମିକ ଉପଚାର କଣ?' },
      { id: 'rumen', labelOr: 'ଜାବର କାଟୁନାହିଁ', labelEn: 'No rumination', query: 'ଗାଈ ସକାଳୁ ଜାବର କାଟୁନାହିଁ ଓ ଖାଇବା ଛାଡ଼ି ଦେଇଛି।' },
    ],
  }[species] || [
    { id: 'mic_check', labelOr: 'ଶୁଭୁଛି କି? (ମାଇକ୍ ଚେକ୍)', labelEn: 'Can you hear me?', query: 'ମୁଁ କଣ କହୁଛି ଶୁଭୁଛି ନା ଶୁଭୁନି?' },
    { id: 'general', labelOr: 'ଅସୁସ୍ଥତାର ଲକ୍ଷଣ', labelEn: 'Health symptoms', query: 'ମୋ ପଶୁ ଅସୁସ୍ଥ ଦେଖାଯାଉଛି, ପ୍ରାଥମିକ ଯାଞ୍ଚ କିପରି କରିବି?' }
  ];

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Gapless 24kHz audio playback for incoming Gemini Live PCM stream
  const playAudioChunk = (base64Audio: string) => {
    if (!isSpeakerOnRef.current) return;
    const ctx = outputAudioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const binary = window.atob(base64Audio);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      
      const numSamples = Math.floor(len / 2);
      if (numSamples <= 0) return;

      const float32 = new Float32Array(numSamples);
      const dataView = new DataView(bytes.buffer, bytes.byteOffset, numSamples * 2);
      for (let i = 0; i < numSamples; i++) {
        const pcm16 = dataView.getInt16(i * 2, true);
        float32[i] = pcm16 / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, numSamples, 24000);
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
          setCallStatus('listening');
        }
      };
    } catch (e) {
      console.warn('Error playing live audio chunk:', e);
    }
  };

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

  // Immediate query dispatcher: sends text directly over WebSocket if open, else falls back to REST
  const sendQuery = async (queryText: string) => {
    const cleanText = (queryText || '').trim();
    if (!cleanText) return;

    stopAllPlayback();
    setInterimSpeech('');
    setCallStatus('thinking');

    const currentTimeStr = formatTimer(callDuration);
    setActiveUserTurn({
      odia: cleanText,
      en: cleanText,
      time: currentTimeStr,
    });
    setActiveArohiTurn(null);
    activeArohiAccumulatorRef.current = '';

    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ text: cleanText }));
        return;
      } catch (e) {
        console.warn('Error forwarding query over WebSocket, activating fallback:', e);
      }
    }

    // Fail-Safe REST Fallback
    try {
      const res = await fetch('/api/live-voice-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: cleanText,
          language: isOdia ? 'or' : isHindi ? 'hi' : 'en',
          species: isUniversalMode ? 'universal' : species,
          animalName: animalName || undefined,
          mode: 'veterinary',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const replyText = data.transcript || data.reply || (isOdia ? 'ହଁ ଆଜ୍ଞା, ମୁଁ ଶୁଣିଲି।' : 'I have noted your concern.');
        const spokenTime = formatTimer(callDuration + 1);

        setActiveArohiTurn({
          odia: replyText,
          en: data.enSummary || replyText,
          time: spokenTime,
        });

        if (isSpeakerOnRef.current) {
          setCallStatus('speaking');
          playArohiVoice(replyText, {
            language: isOdia ? 'or-IN' : isHindi ? 'hi-IN' : 'en-IN',
            voice: 'Aoede',
            onEnd: () => setCallStatus('listening'),
            onError: () => setCallStatus('listening'),
          });
        } else {
          setCallStatus('listening');
        }
      }
    } catch (err) {
      console.warn('Fallback turn error:', err);
      setCallStatus('listening');
    }
  };

  // Main Live Session Lifecycle: WebSocket + 16kHz PCM Stream
  useEffect(() => {
    let active = true;

    // Call timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Audio unlock listener for mobile & browser gesture policies
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
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('click', unlockAudio);

    const startSession = async () => {
      try {
        setCallStatus('connecting');

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const langParam = isOdia ? 'or' : isHindi ? 'hi' : 'en';
        const wsUrl = `${protocol}//${window.location.host}/api/live-ws?voice=Zypher&lang=${encodeURIComponent(langParam)}&mode=vetmitra&species=${encodeURIComponent(species)}${animalName ? `&animal=${encodeURIComponent(animalName)}` : ''}${uid ? `&uid=${encodeURIComponent(uid)}` : ''}`;

        console.log('Connecting VetMitra live voice WebSocket:', wsUrl);
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          if (!active) return;
          console.log('VetMitra Live Voice WebSocket connected successfully.');
          setCallStatus('listening');
        };

        ws.onmessage = (event) => {
          if (!active) return;
          try {
            const data = JSON.parse(event.data);

            // 1. Raw PCM audio stream (Gemini Live 24kHz voice output)
            if (data.audio || (data.type === 'audio' && data.data)) {
              hasReceivedAudioStreamRef.current = true;
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                try { window.speechSynthesis.cancel(); } catch (e) {}
              }
              setCallStatus('speaking');
              playAudioChunk(data.audio || data.data);
            }
            // 2. Real-time spoken transcript chunks (User or Arohi VetMitra)
            else if (data.transcript || data.text || (data.type === 'text' && data.data)) {
              const textChunk = data.transcript || data.text || data.data;
              const speaker = data.speaker || 'arohi';

              if (speaker === 'arohi') {
                setInterimSpeech('');
                const cleaned = textChunk.replace(/[*#`_~]/g, '');
                if (cleaned) {
                  setCallStatus('speaking');
                  activeArohiAccumulatorRef.current = activeArohiAccumulatorRef.current 
                    ? (activeArohiAccumulatorRef.current.endsWith(' ') ? activeArohiAccumulatorRef.current + cleaned : activeArohiAccumulatorRef.current + ' ' + cleaned)
                    : cleaned;

                  setActiveArohiTurn({
                    odia: activeArohiAccumulatorRef.current,
                    en: activeArohiAccumulatorRef.current,
                    time: formatTimer(callDuration),
                  });
                }
              } else if (speaker === 'user') {
                const userCleaned = textChunk.replace(/[*#`_~]/g, '').trim();
                if (userCleaned) {
                  setInterimSpeech(userCleaned);
                  setActiveUserTurn({
                    odia: userCleaned,
                    en: userCleaned,
                    time: formatTimer(callDuration),
                  });
                }
              }
            }
            // 3. Barge-In Interruption Notice
            else if (data.interrupted) {
              stopAllPlayback();
              setCallStatus(isMutedRef.current ? 'listening' : 'listening');
              setInterimSpeech('');
            }
            // 4. Turn Completion
            else if (data.turnComplete || data.type === 'turnComplete') {
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
                    textOdia: finalArohi,
                    textEn: finalArohi,
                    time: formatTimer(callDuration),
                  }
                ]);
              }
              activeArohiAccumulatorRef.current = '';
              hasReceivedAudioStreamRef.current = false;
            } else if (data.error) {
              console.warn('VetMitra Live WebSocket notice:', data.error);
            }
          } catch (err) {
            console.warn('Error parsing VetMitra WebSocket event:', err);
          }
        };

        ws.onerror = (err) => {
          console.warn('VetMitra WebSocket connection notice:', err);
          if (active && callStatusRef.current === 'connecting') {
            setCallStatus('listening');
          }
        };

        ws.onclose = () => {
          console.log('VetMitra WebSocket closed.');
          if (active) {
            setCallStatus('listening');
          }
        };

        // Microphone & Web Audio Stream Setup
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

          // INSTANT AUDIO BARGE-IN: If farmer speaks into mic while Arohi is speaking, halt voice immediately
          if (rawVol > 18 && (audioQueueRef.current.length > 0 || callStatusRef.current === 'speaking' || (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking))) {
            stopAllPlayback();
            setCallStatus(isMutedRef.current ? 'listening' : 'listening');
            activeArohiAccumulatorRef.current = '';
            if (ws && ws.readyState === WebSocket.OPEN) {
              try {
                ws.send(JSON.stringify({ interrupted: true }));
              } catch (e) {}
            }
          }

          // Downsample input float32 audio to 16kHz linear PCM for Gemini Live API
          const downsampledData = downsampleBuffer(float32Data, inputCtx.sampleRate || 16000, 16000);
          const rawBuffer = floatTo16BitPCM(downsampledData);
          const base64Pcm = arrayBufferToBase64(rawBuffer);

          if (ws && ws.readyState === WebSocket.OPEN) {
            try {
              ws.send(JSON.stringify({ audio: base64Pcm }));
            } catch (sendErr) {
              // Socket closing
            }
          }
        };

      } catch (err) {
        console.error('Error starting VetMitra live voice session:', err);
        if (active) {
          setCallStatus('listening');
        }
      }
    };

    startSession();

    return () => {
      active = false;
      clearInterval(timer);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);

      if (wsRef.current) {
        try { wsRef.current.close(); } catch (e) {}
        wsRef.current = null;
      }
      stopAllPlayback();

      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(t => t.stop());
        micStreamRef.current = null;
      }
      if (scriptProcessorRef.current) {
        try { scriptProcessorRef.current.disconnect(); } catch (e) {}
        scriptProcessorRef.current = null;
      }
      if (inputAudioCtxRef.current) {
        try { inputAudioCtxRef.current.close(); } catch (e) {}
        inputAudioCtxRef.current = null;
      }
      if (outputAudioCtxRef.current) {
        try { outputAudioCtxRef.current.close(); } catch (e) {}
        outputAudioCtxRef.current = null;
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const camStream = videoRef.current.srcObject as MediaStream;
        camStream.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [species, language, animalName, uid]);

  // Handle Live Camera Toggle
  const toggleCamera = async () => {
    if (isCameraActive) {
      setIsCameraActive(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
    } else {
      try {
        const camStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraActive(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = camStream;
          }
        }, 100);
      } catch (err) {
        console.warn('Camera permission unavailable:', err);
      }
    }
  };

  return (
    <div className="relative min-h-[720px] rounded-3xl overflow-hidden bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-6 shadow-2xl border-2 border-slate-800 animate-in fade-in-50 duration-300 select-none">
      {/* Background Ambience with Dynamic Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={speciesBackdrop}
          alt="Vet backdrop"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[1px] transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
      </div>

      {/* Top Status & Emergency Bar */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
            <Stethoscope className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-tight text-slate-100 flex items-center gap-2">
              <span>Arohi VetMitra™</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE CALL
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              {isUniversalMode ? (
                <span>{isOdia ? 'ସର୍ବଭାରତୀୟ ପଶୁ ଚିକିତ୍ସା ଓ ପରାମର୍ଶ (Universal AI Vet)' : 'Universal AI Veterinary Doctor • 24x7'}</span>
              ) : (
                <>
                  <span>{speciesIcon}</span>
                  <span>{displayAnimalName} ({species.toUpperCase()})</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Call Timer */}
          <div className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono font-bold flex items-center gap-2 text-emerald-400 shadow-inner">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{formatTimer(callDuration)}</span>
          </div>

          <button
            onClick={onOpenEmergency}
            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
          >
            <span>Emergency 1962</span>
          </button>
        </div>
      </div>

      {/* Live Video Camera Overlay if active */}
      {isCameraActive && (
        <div className="relative z-15 my-2 max-w-sm mx-auto w-full rounded-2xl overflow-hidden border-2 border-emerald-500/60 shadow-xl bg-black">
          <div className="relative h-44 w-full">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 text-[10px] text-emerald-400 font-bold backdrop-blur-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE ANIMAL CAMERA</span>
            </div>
          </div>
        </div>
      )}

      {/* Central Interactive Voice Core (Dynamic Resonance Core & Audio Visualizer) */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-4 space-y-4 text-center">
        {/* Animated Resonant Soundwave Rings that respond to user's real mic volume */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
          {/* Outer Pulsing Aura scaling with volume */}
          <div 
            className="absolute rounded-full bg-emerald-500/20 transition-transform duration-75"
            style={{
              inset: `${Math.max(0, 20 - userVolume * 0.3)}px`,
              opacity: callStatus === 'speaking' ? 0.6 : Math.min(1, 0.2 + userVolume * 0.015),
              transform: `scale(${1 + (callStatus === 'speaking' ? 0.15 : userVolume * 0.008)})`
            }}
          />
          <div 
            className="absolute inset-3 rounded-full bg-gradient-to-tr from-emerald-500/30 to-teal-400/20 blur-md transition-all duration-100"
            style={{
              opacity: callStatus === 'speaking' ? 0.9 : 0.4 + userVolume * 0.01
            }}
          />
          
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 shadow-2xl shadow-emerald-500/50 flex items-center justify-center border-4 border-emerald-300/40 transition-transform duration-100">
            {/* Center Core: Displays Animal Photo if selected from Passport, or Universal Stethoscope Doctor Avatar */}
            <div className="w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border-2 border-emerald-400/60 shadow-inner relative group">
              {animalPhotoUrl ? (
                <img
                  src={animalPhotoUrl}
                  alt={displayAnimalName || 'Animal'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-emerald-400">
                  <Stethoscope className="w-10 h-10 text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 mt-1">Vet AI</span>
                </div>
              )}
              {/* Dynamic Status Glow Overlay */}
              <div 
                className={`absolute inset-0 transition-opacity duration-200 pointer-events-none ${
                  callStatus === 'speaking' 
                    ? 'bg-emerald-500/30' 
                    : callStatus === 'thinking'
                    ? 'bg-amber-500/30'
                    : userVolume > 15
                    ? 'bg-teal-400/30'
                    : 'bg-transparent'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="space-y-1.5 max-w-sm mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200">
            {callStatus === 'listening' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400">
                  {isOdia ? 'ଆରୋହୀ ଶୁଣୁଛି... (Arohi is listening)' : 'Arohi is listening...'}
                </span>
              </>
            )}
            {callStatus === 'thinking' && (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span className="text-amber-400">
                  {isOdia ? 'ଡାକ୍ତରୀ ବିଶ୍ଳେଷଣ କରୁଛି... (Analyzing...)' : 'Analyzing clinical advice...'}
                </span>
              </>
            )}
            {callStatus === 'speaking' && (
              <>
                <Volume2 className="w-3.5 h-3.5 text-teal-300 animate-bounce" />
                <span className="text-teal-300">
                  {isOdia ? 'ଆରୋହୀ ଉତ୍ତର ଦେଉଛି... (Arohi is speaking)' : 'Arohi is speaking...'}
                </span>
              </>
            )}
            {callStatus === 'connecting' && (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="text-slate-400">{isOdia ? 'ସଂଯୋଗ ହେଉଛି...' : 'Connecting to Arohi...'}</span>
              </>
            )}
          </div>

          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {isOdia
              ? 'ସ୍ୱାଭାବିକ ଭାବେ ଓଡ଼ିଆରେ କଥା ହୁଅନ୍ତୁ। ଆରୋହୀ ସିଧାସଳଖ ଲାଇଭ୍ ଶୁଣୁଛି ଏବଂ ତୁରନ୍ତ ଉତ୍ତର ଦେବ।'
              : 'Speak naturally in Odia, Hindi, or English. Arohi listens and responds immediately in real-time.'}
          </p>
        </div>

        {/* Mode & Audio Indicators */}
        <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isUniversalMode ? 'UNIVERSAL VET MODE' : `${species.toUpperCase()} MODE`}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 font-medium">
            {isOdia ? 'ଓଡ଼ିଆ (Odia Live)' : isHindi ? 'हिंदी (Hindi Live)' : 'English Live'}
          </span>
        </div>
      </div>

      {/* Dual Real-Time Subtitles Stream */}
      {showSubtitles && (
        <div className="relative z-10 space-y-2 max-w-xl mx-auto w-full my-2">
          {/* User Bubble (Real-time Live Speech) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 space-y-1 backdrop-blur-md transition-all">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Mic className="w-3 h-3 text-emerald-400" />
                <span>You (Farmer / Pet Parent)</span>
                {interimSpeech && (
                  <span className="text-[10px] text-emerald-300 font-mono animate-pulse">
                    • listening...
                  </span>
                )}
              </span>
              <span>{activeUserTurn ? activeUserTurn.time : formatTimer(callDuration)}</span>
            </div>
            <p className="text-xs font-bold text-slate-100">
              {interimSpeech ? interimSpeech : activeUserTurn ? activeUserTurn.odia : (
                <span className="text-slate-400 italic">
                  {isOdia ? 'ସ୍ୱାଭାବିକ ଭାବେ କହିବା ଆରମ୍ଭ କରନ୍ତୁ କିମ୍ବା ତଳେ ଥିବା ପ୍ରଶ୍ନ ଚୟନ କରନ୍ତୁ...' : 'Start speaking into your mic or tap a question below...'}
                </span>
              )}
            </p>
          </div>

          {/* Arohi Spoken Response Bubble */}
          {activeArohiTurn && (
            <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-3 space-y-1 backdrop-blur-md transition-all">
              <div className="flex items-center justify-between text-[10px] text-emerald-300">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Arohi VetMitra</span>
                </span>
                <span>{activeArohiTurn.time}</span>
              </div>
              <p className="text-xs font-bold text-emerald-100 leading-relaxed">
                {activeArohiTurn.odia}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 1-Tap Quick Spoken Suggestion Chips */}
      <div className="relative z-10 flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-none">
        {quickChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => sendQuery(chip.query)}
            disabled={callStatus === 'thinking'}
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-emerald-500/50 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
          >
            <span>{isUniversalMode ? '🐾' : speciesIcon}</span>
            <span>{isOdia ? chip.labelOr : chip.labelEn}</span>
          </button>
        ))}
      </div>

      {/* Primary Call Controls */}
      <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 pt-3 border-t border-slate-800/80">
        {/* Mute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isMuted 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-md' 
              : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Speaker Toggle */}
        <button
          onClick={() => {
            if (isSpeakerOn) {
              stopAllPlayback();
              setIsSpeakerOn(false);
            } else {
              setIsSpeakerOn(true);
            }
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isSpeakerOn 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
          title="Speaker"
        >
          {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        {/* Video Camera Toggle */}
        <button
          onClick={toggleCamera}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isCameraActive 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-slate-900 text-slate-200 border border-slate-800'
          }`}
          title="Live Camera Feed"
        >
          {isCameraActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* End Call (Big Crimson Pill) */}
        <button
          onClick={() => {
            stopAllPlayback();
            onEndCall();
          }}
          className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-900/50 transition-transform active:scale-95"
          title="End Call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>

      {/* Subtitles Toggle Bar at bottom */}
      <div className="relative z-10 text-center pt-2">
        <button
          onClick={() => setShowSubtitles(!showSubtitles)}
          className="text-[11px] text-slate-500 hover:text-slate-300 font-semibold inline-flex items-center gap-1 transition-colors"
        >
          <span>Live Subtitles: {showSubtitles ? 'On' : 'Off'} (ରିଅଲ୍ ଟାଇମ୍ ଅନୁବାଦ)</span>
          {showSubtitles ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
