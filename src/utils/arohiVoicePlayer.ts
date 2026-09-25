// Arohi Sovereign Voice Engine - 24kHz Studio HD Neural Voice Player
// Provides natural, human-like voice synthesis identical to Arohi Flagship Live Voice

export interface ArohiVoiceOptions {
  voice?: string; // 'Zypher' | 'Aoede' | 'Fenrir' | 'Puck' | 'Charon'
  language?: string; // language code or dialect name
  userId?: string;
  isMuted?: boolean;
  allowBrowserRoboticVoice?: boolean; // STRICTLY false by default: never speak in robotic system voices
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Active singleton audio playback handles
let activeAudioCtx: AudioContext | null = null;
let activeWs: WebSocket | null = null;
let activeSources: AudioBufferSourceNode[] = [];
let nextStartTime = 0;
let isPlaybackActive = false;

// Client memory cache for synthesized 24kHz HD neural audio
const neuralAudioBufferCache = new Map<string, AudioBuffer>();

// Dynamic script & language detection for authentic regional resonance
export function detectVoiceLanguage(text: string, explicitLang?: string): { langTag: string; langCode: string } {
  const explicitLower = (explicitLang || '').toLowerCase();
  if (explicitLower.includes('odia') || explicitLower.includes('or-in') || explicitLower === 'or') {
    return { langTag: 'or-IN', langCode: 'or' };
  }
  if (explicitLower.includes('hindi') || explicitLower.includes('hi-in') || explicitLower === 'hi') {
    return { langTag: 'hi-IN', langCode: 'hi' };
  }
  if (explicitLower.includes('bengali') || explicitLower.includes('bn-in') || explicitLower === 'bn') {
    return { langTag: 'bn-IN', langCode: 'bn' };
  }
  if (explicitLower.includes('telugu') || explicitLower.includes('te-in') || explicitLower === 'te') {
    return { langTag: 'te-IN', langCode: 'te' };
  }
  if (explicitLower.includes('tamil') || explicitLower.includes('ta-in') || explicitLower === 'ta') {
    return { langTag: 'ta-IN', langCode: 'ta' };
  }
  if (explicitLower.includes('marathi') || explicitLower.includes('mr-in') || explicitLower === 'mr') {
    return { langTag: 'mr-IN', langCode: 'mr' };
  }
  if (explicitLower.includes('gujarati') || explicitLower.includes('gu-in') || explicitLower === 'gu') {
    return { langTag: 'gu-IN', langCode: 'gu' };
  }
  if (explicitLower.includes('kannada') || explicitLower.includes('kn-in') || explicitLower === 'kn') {
    return { langTag: 'kn-IN', langCode: 'kn' };
  }
  if (explicitLower.includes('malayalam') || explicitLower.includes('ml-in') || explicitLower === 'ml') {
    return { langTag: 'ml-IN', langCode: 'ml' };
  }
  if (explicitLower.includes('punjabi') || explicitLower.includes('pa-in') || explicitLower === 'pa') {
    return { langTag: 'pa-IN', langCode: 'pa' };
  }
  if (explicitLower.includes('urdu') || explicitLower.includes('ur-in') || explicitLower === 'ur') {
    return { langTag: 'ur-IN', langCode: 'ur' };
  }

  // Script inspection
  if (/[\u0B00-\u0B7F]/.test(text)) return { langTag: 'or-IN', langCode: 'or' }; // Odia
  if (/[\u0980-\u09FF]/.test(text)) return { langTag: 'bn-IN', langCode: 'bn' }; // Bengali
  if (/[\u0900-\u097F]/.test(text)) return { langTag: 'hi-IN', langCode: 'hi' }; // Devanagari (Hindi/Marathi)
  if (/[\u0C00-\u0C7F]/.test(text)) return { langTag: 'te-IN', langCode: 'te' }; // Telugu
  if (/[\u0B80-\u0BFF]/.test(text)) return { langTag: 'ta-IN', langCode: 'ta' }; // Tamil
  if (/[\u0A80-\u0AFF]/.test(text)) return { langTag: 'gu-IN', langCode: 'gu' }; // Gujarati
  if (/[\u0C80-\u0CFF]/.test(text)) return { langTag: 'kn-IN', langCode: 'kn' }; // Kannada
  if (/[\u0D00-\u0D7F]/.test(text)) return { langTag: 'ml-IN', langCode: 'ml' }; // Malayalam
  if (/[\u0A00-\u0A7F]/.test(text)) return { langTag: 'pa-IN', langCode: 'pa' }; // Punjabi
  if (/[\u0600-\u06FF]/.test(text)) return { langTag: 'ur-IN', langCode: 'ur' }; // Urdu

  return { langTag: 'en-IN', langCode: 'en' };
}

// Clean dialogue for optimal, natural pronunciation
export function sanitizeSpeechText(text: string): string {
  return text
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*#_~]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Map telephony profile to flagship neural voice
export function mapTelephonyVoice(voiceProfile?: string): string {
  const vp = (voiceProfile || '').toLowerCase();
  if (vp.includes('executive') || vp.includes('male') || vp.includes('corporate')) {
    return 'Fenrir';
  }
  if (vp.includes('energetic') || vp.includes('support')) {
    return 'Puck';
  }
  if (vp.includes('empathetic') || vp.includes('care') || vp.includes('clinic')) {
    return 'Aoede';
  }
  // Default to Arohi Flagship Warm Signature Voice
  return 'Zypher';
}

// Stop any currently playing audio across both Neural and Fallback engines
export function stopArohiVoice(): void {
  isPlaybackActive = false;

  if (activeWs) {
    try {
      activeWs.close();
    } catch (e) {}
    activeWs = null;
  }

  if (activeSources.length > 0) {
    activeSources.forEach((src) => {
      try {
        src.stop();
        src.disconnect();
      } catch (e) {}
    });
    activeSources = [];
  }

  if (activeAudioCtx && activeAudioCtx.state !== 'closed') {
    try {
      activeAudioCtx.close().catch(() => {});
    } catch (e) {}
    activeAudioCtx = null;
  }

  nextStartTime = 0;

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

// Helper to convert base64 PCM16 or WAV to an AudioBuffer
async function decodeBase64ToAudioBuffer(
  audioCtx: AudioContext,
  base64Audio: string,
  sampleRate: number = 24000
): Promise<AudioBuffer> {
  const binary = window.atob(base64Audio);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  // If container format like WAV/RIFF, decode directly via Web Audio API
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
    try {
      return await audioCtx.decodeAudioData(bytes.buffer.slice(0));
    } catch (e) {
      console.warn('WAV decode failed, trying PCM16 parsing:', e);
    }
  }

  // Raw PCM16 24kHz LE
  const numSamples = Math.floor(len / 2);
  const float32 = new Float32Array(numSamples);
  const dataView = new DataView(bytes.buffer, bytes.byteOffset, numSamples * 2);
  for (let i = 0; i < numSamples; i++) {
    const pcm16 = dataView.getInt16(i * 2, true);
    float32[i] = pcm16 / 32768.0;
  }

  const audioBuffer = audioCtx.createBuffer(1, numSamples, sampleRate);
  audioBuffer.getChannelData(0).set(float32);
  return audioBuffer;
}

// Dedicated 24kHz Studio HD Neural HTTP Fallback (Guarantees authentic Arohi voice without robotic speech)
async function playFromNeuralHttpEndpoint(
  cleanText: string,
  voiceName: string,
  detectedLang: { langTag: string; langCode: string },
  options: ArohiVoiceOptions,
  audioCtx: AudioContext
): Promise<boolean> {
  if (!isPlaybackActive) return false;

  const cacheKey = `${voiceName.toLowerCase()}_${cleanText.toLowerCase()}`;
  if (neuralAudioBufferCache.has(cacheKey)) {
    const cachedBuffer = neuralAudioBufferCache.get(cacheKey)!;
    playSingleAudioBuffer(audioCtx, cachedBuffer, options);
    return true;
  }

  try {
    const response = await fetch('/api/tts/arohi-zypher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: cleanText,
        voice: voiceName,
        language: detectedLang.langCode
      })
    });

    if (!response.ok) return false;
    const data = await response.json();

    if (data.success && data.audioBase64) {
      const audioBuffer = await decodeBase64ToAudioBuffer(audioCtx, data.audioBase64, data.sampleRate || 24000);
      neuralAudioBufferCache.set(cacheKey, audioBuffer);
      playSingleAudioBuffer(audioCtx, audioBuffer, options);
      return true;
    }
  } catch (err) {
    console.warn('Neural HTTP voice synthesis notice:', err);
  }

  return false;
}

// Play a single continuous AudioBuffer cleanly
function playSingleAudioBuffer(
  audioCtx: AudioContext,
  audioBuffer: AudioBuffer,
  options: ArohiVoiceOptions
) {
  if (!isPlaybackActive || audioCtx.state === 'closed') return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);

  options.onStart?.();
  source.start(0);
  activeSources.push(source);

  source.onended = () => {
    activeSources = activeSources.filter((s) => s !== source);
    if (activeSources.length === 0 && isPlaybackActive) {
      options.onEnd?.();
      stopArohiVoice();
    }
  };
}

// Fallback to high-pitch natural browser speech synthesis ONLY if explicitly allowed
function executeFallbackSpeech(
  cleanText: string,
  detectedLang: { langTag: string; langCode: string },
  options: ArohiVoiceOptions
): void {
  // STRICT RULE: By default, never degrade to robotic system voices
  if (!options.allowBrowserRoboticVoice) {
    console.info('[Arohi Flagship Voice] Robotic system voice suppressed to preserve studio acoustic standards.');
    options.onEnd?.();
    return;
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options.onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const rawChunks = cleanText.match(/[^.!?\n।]+[.!?\n।]+|[^.!?\n।]+$/g) || [cleanText];
    const chunks = rawChunks.map((c) => c.trim()).filter((c) => c.length > 0);

    const voices = window.speechSynthesis.getVoices();
    const shortLang = detectedLang.langCode.toLowerCase();
    const tagLower = detectedLang.langTag.toLowerCase();

    const requestedVoiceLower = (options.voice || '').toLowerCase();
    const isMaleRequested = ['fenrir', 'arjun', 'amit', 'subrat', 'gurpreet', 'rohan', 'venkatesh', 'suresh', 'vikram', 'male'].some(m => requestedVoiceLower.includes(m));

    let pool = voices;
    if (isMaleRequested) {
      const maleVoices = voices.filter(v => {
        const nameLower = v.name.toLowerCase();
        return /\b(male|david|mark|george|ravi|hemant|prakash|guy|daniel|alex|rishi)\b/i.test(nameLower);
      });
      if (maleVoices.length > 0) pool = maleVoices;
    } else {
      const strictlyFemaleVoices = voices.filter((v) => {
        const nameLower = v.name.toLowerCase();
        const isExplicitMale =
          /\b(male|david|mark|george|ravi|hemant|prakash|richard|james|guy|stefan|daniel|alex|fred|thomas|nil|bruce|stefanos|adult|system)\b/i.test(
            nameLower
          ) || /google us english|google uk english male|microsoft david|microsoft mark/i.test(nameLower);
        return !isExplicitMale;
      });
      if (strictlyFemaleVoices.length > 0) pool = strictlyFemaleVoices;
    }

    const bestVoice =
      pool.find(
        (v) =>
          v.lang.toLowerCase() === tagLower &&
          (isMaleRequested
            ? /\b(male|ravi|hemant|prakash|rishi|google)\b/i.test(v.name)
            : /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)
          )
      ) ||
      pool.find((v) => v.lang.toLowerCase() === tagLower) ||
      pool.find((v) => v.lang.toLowerCase().startsWith(shortLang)) ||
      pool[0];

    let currentChunkIndex = 0;
    options.onStart?.();

    const speakNextChunk = () => {
      if (!isPlaybackActive || currentChunkIndex >= chunks.length) {
        options.onEnd?.();
        return;
      }

      const chunkText = chunks[currentChunkIndex];
      const utterance = new SpeechSynthesisUtterance(chunkText);
      utterance.lang = detectedLang.langTag;
      utterance.rate = 1.0;
      utterance.pitch = 1.05; // Natural, conversational pitch (never exaggerated)
      if (bestVoice) utterance.voice = bestVoice;

      utterance.onend = () => {
        currentChunkIndex++;
        speakNextChunk();
      };
      utterance.onerror = () => {
        currentChunkIndex++;
        if (currentChunkIndex < chunks.length) {
          speakNextChunk();
        } else {
          options.onEnd?.();
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  } catch (err) {
    console.warn('Speech fallback error:', err);
    options.onEnd?.();
  }
}

// Primary: Stream 24kHz HD Studio Neural Voice via Arohi Flagship Live Audio Pipeline
export function playArohiVoice(text: string, options: ArohiVoiceOptions = {}): () => void {
  const cleanText = sanitizeSpeechText(text);
  if (!cleanText || options.isMuted) {
    options.onEnd?.();
    return () => {};
  }

  stopArohiVoice();
  isPlaybackActive = true;

  const detectedLang = detectVoiceLanguage(cleanText, options.language);
  const voiceName = options.voice || 'Zypher';
  const cacheKey = `${voiceName.toLowerCase()}_${cleanText.toLowerCase()}`;

  // Primary: Use 24kHz AudioContext + Live WS Read-Aloud Mode
  const AudioCtxClass = typeof window !== 'undefined' ? window.AudioContext || (window as any).webkitAudioContext : null;
  if (!AudioCtxClass) {
    executeFallbackSpeech(cleanText, detectedLang, options);
    return stopArohiVoice;
  }

  try {
    const audioCtx = new AudioCtxClass({ sampleRate: 24000 });
    activeAudioCtx = audioCtx;
    nextStartTime = 0;
    activeSources = [];

    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }

    // Instant zero-latency replay if already in client neural cache
    if (neuralAudioBufferCache.has(cacheKey)) {
      const cached = neuralAudioBufferCache.get(cacheKey)!;
      playSingleAudioBuffer(audioCtx, cached, options);
      return stopArohiVoice;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const uidParam = options.userId ? `&uid=${encodeURIComponent(options.userId)}` : '';
    const wsUrl = `${protocol}//${window.location.host}/api/live-ws?voice=${encodeURIComponent(
      voiceName
    )}&mode=read_aloud&lang=${encodeURIComponent(detectedLang.langCode)}${uidParam}`;

    const ws = new WebSocket(wsUrl);
    activeWs = ws;

    let receivedAudioPacket = false;
    let turnCompleteReceived = false;
    let didCallStart = false;
    let isTransitioningToHttpFallback = false;

    const executeNeuralFallback = async () => {
      if (isTransitioningToHttpFallback || !isPlaybackActive) return;
      isTransitioningToHttpFallback = true;
      if (activeWs) {
        try { activeWs.close(); } catch (e) {}
        activeWs = null;
      }
      const played = await playFromNeuralHttpEndpoint(cleanText, voiceName, detectedLang, options, audioCtx);
      if (!played) {
        executeFallbackSpeech(cleanText, detectedLang, options);
      }
    };

    // Zero-gap 24kHz PCM16 audio scheduling
    const playChunk = (base64Audio: string) => {
      if (!isPlaybackActive || !audioCtx || audioCtx.state === 'closed') return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
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

        const audioBuffer = audioCtx.createBuffer(1, numSamples, 24000);
        audioBuffer.getChannelData(0).set(float32);

        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);

        const currentTime = audioCtx.currentTime;
        const startTime = Math.max(currentTime, nextStartTime);
        source.start(startTime);
        nextStartTime = startTime + audioBuffer.duration;

        activeSources.push(source);

        if (!didCallStart) {
          didCallStart = true;
          options.onStart?.();
        }

        source.onended = () => {
          activeSources = activeSources.filter((s) => s !== source);
          if (activeSources.length === 0 && turnCompleteReceived && isPlaybackActive) {
            options.onEnd?.();
            stopArohiVoice();
          }
        };
      } catch (e) {
        console.error('Error decoding Arohi voice audio chunk:', e);
      }
    };

    // Generous watchdog timer: 4500ms allows complete Gemini Live bidirectional handshake
    // If Live WS doesn't stream within 4500ms, seamlessly routes to 24kHz Studio HD HTTP endpoint
    const watchdogTimer = setTimeout(() => {
      if (!receivedAudioPacket && isPlaybackActive) {
        console.warn('[Arohi Flagship Voice] Live WS audio handshake exceeded 4.5s, routing to 24kHz Studio Neural Endpoint...');
        executeNeuralFallback();
      }
    }, 4500);

    ws.onopen = () => {
      try {
        ws.send(JSON.stringify({ text: cleanText }));
      } catch (e) {
        console.error('Failed to send speech to Arohi voice WS:', e);
        clearTimeout(watchdogTimer);
        executeNeuralFallback();
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.audio) {
          clearTimeout(watchdogTimer);
          receivedAudioPacket = true;
          playChunk(data.audio);
        }
        if (data.turnComplete) {
          turnCompleteReceived = true;
          if (activeSources.length === 0 && isPlaybackActive) {
            options.onEnd?.();
            stopArohiVoice();
          }
        }
        if (data.error && !receivedAudioPacket) {
          clearTimeout(watchdogTimer);
          console.warn('Arohi live voice notice, activating 24kHz neural endpoint:', data.error);
          executeNeuralFallback();
        }
      } catch (err) {
        console.error('Error in Arohi voice WS message:', err);
      }
    };

    ws.onerror = (err) => {
      clearTimeout(watchdogTimer);
      console.warn('Arohi voice WS connection notice, routing to 24kHz neural endpoint:', err);
      if (!receivedAudioPacket && isPlaybackActive) {
        executeNeuralFallback();
      }
    };

    ws.onclose = () => {
      clearTimeout(watchdogTimer);
      if (!receivedAudioPacket && isPlaybackActive) {
        executeNeuralFallback();
      }
    };

    return stopArohiVoice;
  } catch (err) {
    console.error('Failed to initialize Arohi Live Audio player:', err);
    executeFallbackSpeech(cleanText, detectedLang, options);
    return stopArohiVoice;
  }
}
