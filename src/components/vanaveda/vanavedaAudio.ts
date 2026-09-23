// VanaVeda by Arohi - Sound Sanctuary & Sacred Audio Engine
// 100% Native Web Audio API (Bronze temple bells, Tibetan singing bowl harmonics, Tanpura drone, 432Hz tuning)
// Zero external audio asset dependencies for 100% offline resilience and zero 404s.

class VanaVedaAudioEngine {
  private ctx: AudioContext | null = null;
  private tanpuraGain: GainNode | null = null;
  private tanpuraOscs: OscillatorNode[] = [];
  private isTanpuraActive: boolean = false;
  private freqOsc: OscillatorNode | null = null;
  private freqGain: GainNode | null = null;
  private activeFreq: number | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Resonant bronze temple bell chime
   * Models the physical impact, bright attack harmonics, and long acoustic decay of Indian temple bells
   */
  public playTempleBell(frequency: number = 587.33) { // D5 default root
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Temple bell harmonic ratios: fundamental, minor third, fifth, octave, chime overtone
      const harmonicRatios = [1.0, 1.2, 1.5, 2.0, 2.76, 4.07];
      const harmonicGains = [0.35, 0.22, 0.18, 0.12, 0.08, 0.04];
      const decayTimes = [3.2, 2.8, 2.4, 1.8, 1.2, 0.8];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.7, now);
      masterGain.connect(ctx.destination);

      harmonicRatios.forEach((ratio, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(frequency * ratio, now);

        // Strike transient & natural decay
        gain.gain.setValueAtTime(harmonicGains[i], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decayTimes[i]);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decayTimes[i] + 0.1);
      });
    } catch (e) {
      console.warn('[VanaVeda Audio] Temple bell sound generation failed:', e);
    }
  }

  /**
   * Tibetan singing bowl overtone chime with slow pulsating warmth
   */
  public playSingingBowl(baseFreq: number = 432) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      // Subtle binaural pulse (beating effect)
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 2.76, now); // Metallic overtone

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.4, now + 0.15); // gentle mallet strike
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5); // long reverberation

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 4.6);
      osc2.stop(now + 4.6);
    } catch (e) {
      console.warn('[VanaVeda Audio] Singing bowl sound generation failed:', e);
    }
  }

  /**
   * Continuous Tanpura Drone (Sa - Pa - Sa) ambient foundation
   */
  public startTanpuraDrone(rootFreq: number = 136.1): boolean { // 136.1Hz is the cosmic OM / C#
    try {
      const ctx = this.getContext();
      if (this.isTanpuraActive) return true;

      const now = ctx.currentTime;
      this.tanpuraGain = ctx.createGain();
      this.tanpuraGain.gain.setValueAtTime(0.001, now);
      this.tanpuraGain.gain.exponentialRampToValueAtTime(0.12, now + 2.0); // Gentle fade in
      this.tanpuraGain.connect(ctx.destination);

      // Traditional Tanpura string tuning: Pa (fifth: 1.5x), Middle Sa (octave: 2.0x), Kharaj Sa (root: 1.0x)
      const freqs = [
        rootFreq,          // Kharaj Sa (136.1 Hz)
        rootFreq * 1.5,    // Pa (204.15 Hz)
        rootFreq * 2.0,    // Tar Sa (272.2 Hz)
        rootFreq * 2.01,   // Slight detune for shimmer
      ];

      this.tanpuraOscs = freqs.map((f, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now);

        // Low pass filter for soft organic string character
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, now);

        osc.connect(filter);
        if (this.tanpuraGain) {
          filter.connect(this.tanpuraGain);
        }
        osc.start(now);
        return osc;
      });

      this.isTanpuraActive = true;
      return true;
    } catch (e) {
      console.warn('[VanaVeda Audio] Tanpura drone failed to start:', e);
      return false;
    }
  }

  public stopTanpuraDrone() {
    try {
      if (!this.isTanpuraActive || !this.ctx) return;
      const now = this.ctx.currentTime;
      if (this.tanpuraGain) {
        this.tanpuraGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      }
      setTimeout(() => {
        this.tanpuraOscs.forEach((o) => {
          try { o.stop(); } catch (e) {}
        });
        this.tanpuraOscs = [];
        this.isTanpuraActive = false;
      }, 1600);
    } catch (e) {
      this.isTanpuraActive = false;
    }
  }

  public toggleTanpuraDrone(): boolean {
    if (this.isTanpuraActive) {
      this.stopTanpuraDrone();
      return false;
    } else {
      return this.startTanpuraDrone();
    }
  }

  public isDronePlaying(): boolean {
    return this.isTanpuraActive;
  }

  /**
   * Sonic Leaf Alchemy Frequency Generator (136.1Hz, 432Hz, 528Hz, 639Hz)
   */
  public playAlchemyFrequency(freq: number) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      if (this.activeFreq === freq && this.freqOsc) {
        this.stopAlchemyFrequency();
        return;
      }

      this.stopAlchemyFrequency();

      this.freqGain = ctx.createGain();
      this.freqGain.gain.setValueAtTime(0.001, now);
      this.freqGain.gain.exponentialRampToValueAtTime(0.18, now + 0.8);
      this.freqGain.connect(ctx.destination);

      this.freqOsc = ctx.createOscillator();
      this.freqOsc.type = 'sine';
      this.freqOsc.frequency.setValueAtTime(freq, now);
      this.freqOsc.connect(this.freqGain);
      this.freqOsc.start(now);

      this.activeFreq = freq;
    } catch (e) {
      console.warn('[VanaVeda Audio] Frequency generator failed:', e);
    }
  }

  public stopAlchemyFrequency() {
    if (this.freqGain && this.freqOsc && this.ctx) {
      const now = this.ctx.currentTime;
      try {
        this.freqGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        setTimeout(() => {
          try { this.freqOsc?.stop(); } catch (e) {}
          this.freqOsc = null;
          this.freqGain = null;
          this.activeFreq = null;
        }, 550);
      } catch (e) {
        this.freqOsc = null;
        this.freqGain = null;
        this.activeFreq = null;
      }
    }
  }

  public getActiveFrequency(): number | null {
    return this.activeFreq;
  }
}

export const vanavedaAudio = new VanaVedaAudioEngine();
