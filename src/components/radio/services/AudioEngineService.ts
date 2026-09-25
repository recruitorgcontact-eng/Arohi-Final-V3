// Arohi Radio - Audio Engine & Real-Time Synthesis Service
// Handles HTML5 Audio streaming, Web Audio API synthesis, audio ducking, and frequency analysis

export type AmbientSoundscapeType = 
  | 'news_bulletin'
  | 'market_pulse'
  | 'stadium_roar'
  | 'odisha_flute'
  | 'youth_synth'
  | 'ambient_meditation'
  | 'global_frequencies';

class AudioEngineService {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private duckGain: GainNode | null = null;
  private synthGain: GainNode | null = null;
  
  private activeOscillators: OscillatorNode[] = [];
  private ambientInterval: number | null = null;
  
  private htmlAudio: HTMLAudioElement | null = null;
  private isHtmlAudioPlaying: boolean = false;
  
  private currentVolume: number = 0.8;
  private isMuted: boolean = false;
  private isDucked: boolean = false;
  
  private sleepTimerId: number | null = null;
  private sleepTimerSecondsRemaining: number = 0;
  private sleepTimerCallback: (() => void) | null = null;
  
  private currentSpeakerUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    // Lazily initialize on first user interaction to comply with browser autoplay policies
  }

  public initAudioContext(): void {
    if (this.audioCtx) {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.audioCtx.currentTime);

      this.duckGain = this.audioCtx.createGain();
      this.duckGain.gain.setValueAtTime(1.0, this.audioCtx.currentTime);

      this.synthGain = this.audioCtx.createGain();
      this.synthGain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);

      // Route: Synthesizer / Audio -> DuckGain -> Analyser -> MasterGain -> Destination
      this.synthGain.connect(this.duckGain);
      this.duckGain.connect(this.analyser);
      this.analyser.connect(this.masterGain);
      this.masterGain.connect(this.audioCtx.destination);
    } catch (e) {
      console.warn('Web Audio API not supported or restricted:', e);
    }
  }

  // --- AUDIO STREAM PLAYBACK (Real Streams) ---
  public playStream(url: string, onPlay?: () => void, onError?: (err: unknown) => void): void {
    this.initAudioContext();
    this.stopProceduralAmbiance();

    if (!this.htmlAudio) {
      this.htmlAudio = new Audio();
      this.htmlAudio.crossOrigin = 'anonymous';
      this.htmlAudio.preload = 'none';

      this.htmlAudio.addEventListener('playing', () => {
        this.isHtmlAudioPlaying = true;
        if (onPlay) onPlay();
      });

      this.htmlAudio.addEventListener('error', (e) => {
        this.isHtmlAudioPlaying = false;
        console.warn('Live stream connection failed, falling back to studio acoustic generator:', e);
        if (onError) onError(e);
      });
    }

    this.htmlAudio.src = url;
    this.htmlAudio.volume = this.isMuted ? 0 : this.currentVolume;
    
    this.htmlAudio.play().catch((err) => {
      console.warn('Direct stream autoplay prevented or failed:', err);
      if (onError) onError(err);
    });
  }

  public stopStream(): void {
    if (this.htmlAudio) {
      this.htmlAudio.pause();
      this.htmlAudio.removeAttribute('src');
      this.htmlAudio.load();
      this.isHtmlAudioPlaying = false;
    }
  }

  // --- PROCEDURAL ACOUSTIC SYNTHESIS (Warm Studio Ambiance) ---
  public startProceduralAmbiance(type: AmbientSoundscapeType = 'news_bulletin'): void {
    this.initAudioContext();
    this.stopProceduralAmbiance();
    if (!this.audioCtx || !this.synthGain) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Harmonically rich base chord frequencies according to channel mood
    let chordFreqs = [220, 277.18, 329.63]; // A Major
    let waveType: OscillatorType = 'sine';

    switch (type) {
      case 'news_bulletin':
        chordFreqs = [174.61, 261.63, 349.23]; // F-C-F news chime tone
        waveType = 'sine';
        break;
      case 'market_pulse':
        chordFreqs = [196.00, 293.66, 392.00]; // G-D-G dynamic
        waveType = 'triangle';
        break;
      case 'odisha_flute':
        chordFreqs = [146.83, 220.00, 293.66, 440.00]; // D modal tanpura drone
        waveType = 'sine';
        break;
      case 'youth_synth':
        chordFreqs = [130.81, 196.00, 261.63, 329.63]; // Cmaj7 modern warm synth
        waveType = 'triangle';
        break;
      case 'ambient_meditation':
        chordFreqs = [108.00, 216.00, 432.00]; // 432Hz deep focus binaural octave
        waveType = 'sine';
        break;
      case 'stadium_roar':
        chordFreqs = [164.81, 246.94, 329.63]; // E minor energetic
        waveType = 'triangle';
        break;
      case 'global_frequencies':
      default:
        chordFreqs = [138.59, 207.65, 277.18]; // Db atmospheric
        waveType = 'sine';
        break;
    }

    // Create gentle oscillating voices
    chordFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = waveType;
      osc.frequency.setValueAtTime(freq, now);

      // Subtle slow frequency modulation (LFO vibrato)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.2 + idx * 0.1, now);
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      this.activeOscillators.push(lfo);

      // Low pass filter for soft analog warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + idx * 200, now);

      const level = 0.08 / (idx + 1);
      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.exponentialRampToValueAtTime(level, now + 1.5);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.synthGain!);

      osc.start(now);
      this.activeOscillators.push(osc);
    });
  }

  public stopProceduralAmbiance(): void {
    if (this.activeOscillators.length > 0) {
      this.activeOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.activeOscillators = [];
    }

    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  // --- AUDIO DUCKING (Smooth volume dip for on-air speech) ---
  public setDucked(ducked: boolean): void {
    this.isDucked = ducked;
    const targetGain = ducked ? 0.15 : 1.0;

    // Duck Web Audio synth
    if (this.audioCtx && this.duckGain) {
      const now = this.audioCtx.currentTime;
      this.duckGain.gain.cancelScheduledValues(now);
      this.duckGain.gain.linearRampToValueAtTime(targetGain, now + 0.4);
    }

    // Duck HTML5 live audio stream if playing
    if (this.htmlAudio && !this.isMuted) {
      this.htmlAudio.volume = ducked ? this.currentVolume * 0.2 : this.currentVolume;
    }
  }

  // --- AUDIO REACTIVE WAVEFORM DATA ---
  public getByteFrequencyData(outputArray: Uint8Array): void {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(outputArray);
    } else {
      // Simulate soft organic wave if Web Audio is suspended
      const time = Date.now() * 0.004;
      for (let i = 0; i < outputArray.length; i++) {
        const val = Math.sin(time + i * 0.2) * 40 + Math.cos(time * 0.5 + i * 0.1) * 30 + 70;
        outputArray[i] = Math.max(0, Math.min(255, Math.floor(val)));
      }
    }
  }

  // --- MASTER CONTROLS ---
  public setVolume(vol: number): void {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.audioCtx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.currentVolume, this.audioCtx.currentTime);
    }
    if (this.htmlAudio && !this.isMuted) {
      this.htmlAudio.volume = this.isDucked ? this.currentVolume * 0.2 : this.currentVolume;
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    this.setVolume(this.currentVolume);
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // --- SPEECH SYNTHESIS / RJ AROHI VOICE ---
  public speakVoice(
    text: string, 
    lang: string = 'en', 
    onStart?: () => void, 
    onEnd?: () => void
  ): void {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Stop existing speech
    window.speechSynthesis.cancel();

    // Duck background radio smoothly
    this.setDucked(true);

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentSpeakerUtterance = utterance;

    // Pick best available voice matching language
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase()) && (v.name.includes('India') || v.name.includes('Natural') || v.name.includes('Google')));
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase())) || voices.find(v => v.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 0.98; // Eloquent, steady radio anchor cadence
    utterance.pitch = 1.02;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentSpeakerUtterance = null;
      this.setDucked(false); // Restore background radio
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      this.currentSpeakerUtterance = null;
      this.setDucked(false);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentSpeakerUtterance = null;
    this.setDucked(false);
  }

  // --- SLEEP TIMER ---
  public setSleepTimer(minutes: number, onExpire: () => void): void {
    this.clearSleepTimer();
    if (minutes <= 0) return;

    this.sleepTimerSecondsRemaining = minutes * 60;
    this.sleepTimerCallback = onExpire;

    this.sleepTimerId = window.setInterval(() => {
      this.sleepTimerSecondsRemaining -= 1;
      if (this.sleepTimerSecondsRemaining <= 0) {
        this.clearSleepTimer();
        if (this.sleepTimerCallback) {
          this.sleepTimerCallback();
        }
      }
    }, 1000);
  }

  public clearSleepTimer(): void {
    if (this.sleepTimerId) {
      clearInterval(this.sleepTimerId);
      this.sleepTimerId = null;
    }
    this.sleepTimerSecondsRemaining = 0;
    this.sleepTimerCallback = null;
  }

  public getSleepTimerRemaining(): number {
    return this.sleepTimerSecondsRemaining;
  }
}

export const audioEngine = new AudioEngineService();
