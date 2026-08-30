// Arohi Flagship Live Voice Synthesizer for Arohi Exams Gaming Arena
// Voiced exclusively by "Arohi Zypher" (The exact natural 24kHz HD live voice persona from Arohi Call and Arohi Chat)

class ArohiArenaVoiceEngine {
  private muted: boolean = false;
  private isCurrentlySpeaking: boolean = false;
  private listeners: Set<(speaking: boolean) => void> = new Set();
  private muteListeners: Set<(muted: boolean) => void> = new Set();
  
  private audioCtx: AudioContext | null = null;
  private activeSources: AudioBufferSourceNode[] = [];
  private nextStartTime: number = 0;
  private currentWs: WebSocket | null = null;
  private audioCache: Map<string, AudioBuffer> = new Map();
  private accumulatedChunks: string[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('arohi_arena_voice_muted');
      if (savedMute !== null) {
        this.muted = savedMute === 'true';
      }

      // Auto-unlock AudioContext on first user touch/click to comply with browser audio policies
      const unlockAudio = () => {
        this.initAudioContext();
      };

      window.addEventListener('pointerdown', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
      window.addEventListener('click', unlockAudio, { once: true });

      // Preload Flagship Arohi Zypher welcome audio into cache for instant HD playback
      this.preloadWelcomeAudio();
    }
  }

  private async preloadWelcomeAudio() {
    const welcomeText = "Welcome to Arohi Exams Gaming Arena! I am Arohi. Compete in live One v One duels, conquer Boss Battles, master your weak concepts, and climb the National Leaderboard to win real cash prizes!";
    const cacheKey = welcomeText.toLowerCase();
    try {
      const response = await fetch('/api/tts/arohi-zypher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: welcomeText, voice: 'Zypher' })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.audioBase64) {
          const buffer = this.createBufferFromPcm(data.audioBase64, data.sampleRate || 24000);
          if (buffer) {
            this.audioCache.set(cacheKey, buffer);
          }
        }
      }
    } catch {}
  }

  private initAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        try {
          this.audioCtx = new AudioCtxClass({ sampleRate: 24000 });
        } catch {
          this.audioCtx = new AudioCtxClass();
        }
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('arohi_arena_voice_muted', String(muted));
      } catch {}
      if (muted) {
        this.stopSpeaking();
      }
    }
    this.muteListeners.forEach(cb => cb(this.muted));
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public subscribeSpeaking(callback: (speaking: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  public subscribeMute(callback: (muted: boolean) => void): () => void {
    this.muteListeners.add(callback);
    return () => this.muteListeners.delete(callback);
  }

  public stopSpeaking() {
    // 1. Close active WebSocket session if open
    if (this.currentWs) {
      try {
        this.currentWs.onclose = null;
        this.currentWs.onerror = null;
        this.currentWs.onmessage = null;
        this.currentWs.close();
      } catch {}
      this.currentWs = null;
    }

    // 2. Stop all currently playing audio sources
    if (this.activeSources.length > 0) {
      this.activeSources.forEach(source => {
        try {
          source.stop();
          source.disconnect();
        } catch {}
      });
      this.activeSources = [];
    }

    this.nextStartTime = 0;
    this.accumulatedChunks = [];

    // 3. Cancel any browser TTS fallback if active
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }

    this.setSpeaking(false);
  }

  private setSpeaking(val: boolean) {
    if (this.isCurrentlySpeaking !== val) {
      this.isCurrentlySpeaking = val;
      this.listeners.forEach(cb => cb(val));
    }
  }

  public getSpeakingState(): boolean {
    return this.isCurrentlySpeaking;
  }

  /**
   * Helper to decode Base64 16-bit PCM chunk (24000Hz) into Web AudioBuffer
   */
  private createBufferFromPcm(base64Data: string, sampleRate = 24000): AudioBuffer | null {
    const ctx = this.initAudioContext();
    if (!ctx) return null;

    try {
      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const numSamples = Math.floor(len / 2);
      if (numSamples <= 0) return null;

      const float32 = new Float32Array(numSamples);
      const dataView = new DataView(bytes.buffer, bytes.byteOffset, numSamples * 2);
      for (let i = 0; i < numSamples; i++) {
        const pcm16 = dataView.getInt16(i * 2, true);
        float32[i] = pcm16 / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, numSamples, sampleRate);
      audioBuffer.getChannelData(0).set(float32);
      return audioBuffer;
    } catch (e) {
      console.warn('Error converting Arohi PCM audio chunk:', e);
      return null;
    }
  }

  /**
   * Combines all collected chunks into a single cached AudioBuffer
   */
  private createCombinedBuffer(chunks: string[], sampleRate = 24000): AudioBuffer | null {
    const ctx = this.initAudioContext();
    if (!ctx || chunks.length === 0) return null;

    try {
      let totalSamples = 0;
      const buffers: Float32Array[] = [];

      for (const chunk of chunks) {
        const binaryString = window.atob(chunk);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const numSamples = Math.floor(len / 2);
        if (numSamples <= 0) continue;

        const float32 = new Float32Array(numSamples);
        const dataView = new DataView(bytes.buffer, bytes.byteOffset, numSamples * 2);
        for (let i = 0; i < numSamples; i++) {
          const pcm16 = dataView.getInt16(i * 2, true);
          float32[i] = pcm16 / 32768.0;
        }

        buffers.push(float32);
        totalSamples += numSamples;
      }

      if (totalSamples === 0) return null;

      const fullBuffer = ctx.createBuffer(1, totalSamples, sampleRate);
      const fullChannelData = fullBuffer.getChannelData(0);
      let offset = 0;
      for (const b of buffers) {
        fullChannelData.set(b, offset);
        offset += b.length;
      }
      return fullBuffer;
    } catch (e) {
      console.warn('Error creating combined Arohi audio buffer:', e);
      return null;
    }
  }

  /**
   * Speaks the given announcement using the flagship Arohi Live Voice WebSocket engine
   */
  public speak(
    text: string, 
    options?: { 
      rate?: number; 
      pitch?: number; 
      langTag?: string; 
      onStart?: () => void; 
      onEnd?: () => void;
      force?: boolean; // bypass muted if explicitly user triggered (e.g. clicking Read button)
    }
  ) {
    if (this.muted && !options?.force) return;
    if (!text || !text.trim()) return;

    this.stopSpeaking();

    // Clean text for speech: normalize mathematical notations, acronyms, and formatting
    const cleanText = text
      .replace(/[*_#`~[\]]/g, '')
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/θ/g, ' theta ')
      .replace(/²/g, ' squared ')
      .replace(/³/g, ' cubed ')
      .replace(/≠/g, ' not equal to ')
      .replace(/≤/g, ' less than or equal to ')
      .replace(/≥/g, ' greater than or equal to ')
      .replace(/±/g, ' plus or minus ')
      .replace(/√/g, ' square root of ')
      .replace(/%/g, ' percent ')
      .replace(/₹/g, ' Rupees ')
      .replace(/\b1v1\b/gi, 'One v One')
      .replace(/\b4v4\b/gi, 'Four v Four')
      .replace(/\bXP\b/g, 'X P')
      .replace(/\bGK\b/g, 'G K')
      .replace(/\bAI\b/g, 'A I')
      .replace(/\bCBT\b/g, 'C B T')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    this.setSpeaking(true);
    if (options?.onStart) options.onStart();

    const cacheKey = cleanText.toLowerCase();

    // 1. Instant zero-latency playback if already cached in memory
    if (this.audioCache.has(cacheKey)) {
      const cachedBuffer = this.audioCache.get(cacheKey)!;
      this.playCachedBuffer(cachedBuffer, options?.onEnd);
      return;
    }

    // 2. Stream directly from Flagship Arohi Live WebSocket (exact voice used on Arohi Live Calls)
    this.streamLiveVoice(cleanText, cacheKey, options);
  }

  private playCachedBuffer(buffer: AudioBuffer, onEnd?: () => void) {
    const ctx = this.initAudioContext();
    if (!ctx) {
      this.setSpeaking(false);
      if (onEnd) onEnd();
      return;
    }

    try {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);

      source.onended = () => {
        this.activeSources = this.activeSources.filter(s => s !== source);
        if (this.activeSources.length === 0) {
          this.setSpeaking(false);
          if (onEnd) onEnd();
        }
      };

      this.activeSources.push(source);
      source.start(0);
    } catch (e) {
      console.error('Error playing cached Arohi voice buffer:', e);
      this.setSpeaking(false);
      if (onEnd) onEnd();
    }
  }

  private streamLiveVoice(
    cleanText: string, 
    cacheKey: string, 
    options?: { onEnd?: () => void; langTag?: string }
  ) {
    const ctx = this.initAudioContext();
    if (!ctx) {
      this.speakWithBrowserFallback(cleanText, options);
      return;
    }

    this.nextStartTime = 0;
    this.activeSources = [];
    this.accumulatedChunks = [];

    // Detect language code for the live voice model
    let langCode = 'en';
    if (/[\u0B00-\u0B7F]/.test(cleanText)) langCode = 'or';
    else if (/[\u0900-\u097F]/.test(cleanText)) langCode = 'hi';
    else if (/[\u0980-\u09FF]/.test(cleanText)) langCode = 'bn';
    else if (/[\u0B80-\u0BFF]/.test(cleanText)) langCode = 'ta';
    else if (/[\u0C00-\u0C7F]/.test(cleanText)) langCode = 'te';
    else if (/[\u0A80-\u0AFF]/.test(cleanText)) langCode = 'gu';

    const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = typeof window !== 'undefined' ? window.location.host : 'localhost:3000';
    const wsUrl = `${protocol}//${host}/api/live-ws?voice=Zypher&mode=read_aloud&lang=${encodeURIComponent(langCode)}`;

    let receivedAudio = false;
    let turnCompleted = false;

    try {
      const ws = new WebSocket(wsUrl);
      this.currentWs = ws;

      const playAudioChunk = (base64Audio: string) => {
        if (!ctx || ctx.state === 'closed') return;
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }

        const audioBuffer = this.createBufferFromPcm(base64Audio, 24000);
        if (!audioBuffer) return;

        this.accumulatedChunks.push(base64Audio);

        try {
          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(ctx.destination);

          const currentTime = ctx.currentTime;
          const startTime = Math.max(currentTime, this.nextStartTime);
          source.start(startTime);
          this.nextStartTime = startTime + audioBuffer.duration;

          this.activeSources.push(source);

          source.onended = () => {
            this.activeSources = this.activeSources.filter(s => s !== source);
            if (this.activeSources.length === 0 && turnCompleted) {
              this.setSpeaking(false);
              // Cache combined audio for zero-latency future playback
              if (this.accumulatedChunks.length > 0) {
                const combined = this.createCombinedBuffer(this.accumulatedChunks, 24000);
                if (combined) {
                  if (this.audioCache.size > 150) {
                    const firstKey = this.audioCache.keys().next().value;
                    if (firstKey) this.audioCache.delete(firstKey);
                  }
                  this.audioCache.set(cacheKey, combined);
                }
              }
              if (options?.onEnd) options.onEnd();
            }
          };
        } catch (playErr) {
          console.error('Error playing live Arohi audio chunk:', playErr);
        }
      };

      ws.onopen = () => {
        try {
          ws.send(JSON.stringify({ text: cleanText }));
        } catch (sendErr) {
          console.error('Failed to send text to Arohi Live Voice WS:', sendErr);
          this.fallbackToHttpOrBrowser(cleanText, cacheKey, options);
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            receivedAudio = true;
            playAudioChunk(data.audio);
          }
          if (data.turnComplete) {
            turnCompleted = true;
            if (this.activeSources.length === 0) {
              this.setSpeaking(false);
              if (options?.onEnd) options.onEnd();
            }
          }
          if (data.error && !receivedAudio) {
            console.warn('Arohi Live Voice returned notice, falling back:', data.error);
            this.fallbackToHttpOrBrowser(cleanText, cacheKey, options);
          }
        } catch (msgErr) {
          console.error('Error parsing Arohi Live message:', msgErr);
        }
      };

      ws.onerror = (err) => {
        console.warn('Arohi Live WebSocket error:', err);
        if (!receivedAudio) {
          this.fallbackToHttpOrBrowser(cleanText, cacheKey, options);
        }
      };

      ws.onclose = () => {
        if (!receivedAudio) {
          this.fallbackToHttpOrBrowser(cleanText, cacheKey, options);
        }
      };
    } catch (wsInitErr) {
      console.error('Failed to establish Live Voice WS connection:', wsInitErr);
      this.fallbackToHttpOrBrowser(cleanText, cacheKey, options);
    }
  }

  private async fallbackToHttpOrBrowser(
    cleanText: string, 
    cacheKey: string, 
    options?: { onEnd?: () => void; langTag?: string }
  ) {
    try {
      const response = await fetch('/api/tts/arohi-zypher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, voice: 'Zypher' })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.audioBase64) {
          const audioBuffer = this.createBufferFromPcm(data.audioBase64, data.sampleRate || 24000);
          if (audioBuffer) {
            this.audioCache.set(cacheKey, audioBuffer);
            this.playCachedBuffer(audioBuffer, options?.onEnd);
            return;
          }
        }
      }
    } catch {}

    // Resilient speech fallback
    this.speakWithBrowserFallback(cleanText, options);
  }

  private speakWithBrowserFallback(
    cleanText: string, 
    options?: { rate?: number; pitch?: number; langTag?: string; onEnd?: () => void }
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.setSpeaking(false);
      if (options?.onEnd) options.onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      let detectedLangTag = options?.langTag || 'en-IN';
      if (/[\u0900-\u097F]/.test(cleanText)) detectedLangTag = 'hi-IN';
      else if (/[\u0980-\u09FF]/.test(cleanText)) detectedLangTag = 'bn-IN';
      else if (/[\u0B80-\u0BFF]/.test(cleanText)) detectedLangTag = 'ta-IN';
      else if (/[\u0C00-\u0C7F]/.test(cleanText)) detectedLangTag = 'te-IN';
      else if (/[\u0A80-\u0AFF]/.test(cleanText)) detectedLangTag = 'gu-IN';
      else if (/[\u0B00-\u0B7F]/.test(cleanText)) detectedLangTag = 'or-IN';
      else if (/[\u0C80-\u0CFF]/.test(cleanText)) detectedLangTag = 'kn-IN';
      else if (/[\u0D00-\u0D7F]/.test(cleanText)) detectedLangTag = 'ml-IN';

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = detectedLangTag;
      utterance.pitch = 1.35;
      utterance.rate = 1.02;

      const setVoiceAndSpeak = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            const shortLang = detectedLangTag.split('-')[0].toLowerCase();
            const tagLower = detectedLangTag.toLowerCase();

            const strictlyFemaleVoices = voices.filter(v => {
              const nameLower = v.name.toLowerCase();
              const isExplicitMale = /\b(male|david|mark|george|ravi|hemant|prakash|richard|james|guy|stefan|daniel|alex|fred|thomas|nil|bruce|stefanos|adult|system)\b/i.test(nameLower) ||
                                     /google us english|google uk english male|microsoft david|microsoft mark/i.test(nameLower);
              return !isExplicitMale;
            });

            const pool = strictlyFemaleVoices.length > 0 ? strictlyFemaleVoices : voices;

            const preferredVoice = 
              pool.find(v => (v.lang.toLowerCase() === tagLower) && 
                /\b(sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|female|woman|girl|natural|online|google)\b/i.test(v.name)) ||
              pool.find(v => (v.lang.toLowerCase().startsWith(shortLang) || v.lang.toLowerCase().includes(shortLang)) && 
                /\b(female|woman|girl|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online|google)\b/i.test(v.name)) ||
              pool.find(v => v.lang.toLowerCase() === tagLower) ||
              pool.find(v => v.lang.toLowerCase().startsWith(shortLang)) ||
              pool.find(v => /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha)\b/i.test(v.name)) ||
              pool.find(v => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('-in')) ||
              pool[0];

            if (preferredVoice) {
              utterance.voice = preferredVoice;
            }
          }

          utterance.onend = () => {
            this.setSpeaking(false);
            if (options?.onEnd) options.onEnd();
          };

          utterance.onerror = (e) => {
            console.warn('Arohi fallback utterance notice:', e);
            this.setSpeaking(false);
            if (options?.onEnd) options.onEnd();
          };

          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.error('Error invoking speech fallback:', err);
          this.setSpeaking(false);
          if (options?.onEnd) options.onEnd();
        }
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoiceAndSpeak();
          window.speechSynthesis.onvoiceschanged = null;
        };
      } else {
        setVoiceAndSpeak();
      }
    } catch (err) {
      console.error('Failed to initialize speech fallback:', err);
      this.setSpeaking(false);
      if (options?.onEnd) options.onEnd();
    }
  }

  // Pre-crafted announcements voiced with natural Arohi encouragement
  public announceArenaWelcome() {
    this.speak(
      "Welcome to Arohi Exams Gaming Arena! I am Arohi. Compete in live One v One duels, conquer Boss Battles, master your weak concepts, and climb the National Leaderboard to win real cash prizes!"
    );
  }

  public announceDuelMatchFound(opponentName: string, subject: string) {
    this.speak(
      `Match found! You are battling ${opponentName} in ${subject}. 5 questions, 15 seconds each. Give it your best shot!`
    );
  }

  public announceStreak(streak: number) {
    if (streak === 2) {
      this.speak("Great shot! Streak two!");
    } else if (streak === 3) {
      this.speak("Unstoppable! Three in a row! Triple combo!");
    } else if (streak >= 5) {
      this.speak(`Monster streak of ${streak}! You are on fire!`);
    } else {
      this.speak("Correct! Streak bonus added!");
    }
  }

  public announceIncorrect() {
    const encouragements = [
      "Keep your focus! Learn from this and bounce back on the next question!",
      "Good try! Review the concept and strike back!",
      "Stay in the game! Accuracy wins the battle!"
    ];
    const pick = encouragements[Math.floor(Math.random() * encouragements.length)];
    this.speak(pick);
  }

  public announceDuelVictory(score: number, coins: number, xp: number) {
    this.speak(
      `Victory! You won the duel with ${score} points! Earned ${coins} Arena Coins and ${xp} X P. Outstanding performance!`
    );
  }

  public announceDuelDefeat(score: number) {
    this.speak(
      `Duel finished with ${score} points! Good effort. Analyze your errors and challenge again to reclaim your rank!`
    );
  }

  public announceBossBattleStart(bossName: string, subject: string) {
    this.speak(
      `Boss Battle initiated against ${bossName} in ${subject}! Answer correctly to strike the Boss down before time runs out!`
    );
  }

  public announceBossDefeated(bossName: string, coins: number, gems: number) {
    this.speak(
      `Incredible! ${bossName} has been defeated! You unlocked the Boss Slayer trophy, ${coins} coins, and ${gems} gems!`
    );
  }

  public announceWeaknessQuestStart(topic: string) {
    this.speak(
      `Arohi A I Adaptive Weakness Quest activated for ${topic}. Let's target your weak spots and master every single concept together!`
    );
  }

  public announceWeaknessMastered(topic?: string, newAccuracy?: number) {
    if (topic && newAccuracy) {
      this.speak(
        `Concept mastered! Your ${topic} accuracy increased to ${newAccuracy} percent! Power up successful!`
      );
    } else {
      this.speak(
        "Concept mastered! Your diagnostic score and topic accuracy have increased!"
      );
    }
  }

  public announceRewardClaimed(coins: number, gems: number) {
    this.speak(
      `Daily reward claimed! ${coins} Arena Coins and ${gems} Gems deposited into your vault!`
    );
  }

  public announceTournamentJoined(title: string, prizePool: string) {
    this.speak(
      `You are now registered for the ${title} with a prize pool of ${prizePool}! Prepare well and aim for the National Crown!`
    );
  }

  public announceItemEquipped(name: string) {
    this.speak(`Equipped ${name}! Ready to dominate the arena.`);
  }

  public announceQuestion(questionText: string, options: string[]) {
    const formattedOptions = options.map((opt, i) => `Option ${String.fromCharCode(65 + i)}: ${opt}`).join('. ');
    this.speak(`${questionText}. ${formattedOptions}`, { force: true });
  }
}

export const arohiArenaVoice = new ArohiArenaVoiceEngine();
