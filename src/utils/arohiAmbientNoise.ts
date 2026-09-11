// Arohi Sovereign Ambient Acoustic Noise Engine
// Provides realistic background soundscapes to make voice agent calls feel 100% human and genuine
// Replicates actual telephonic environment noise without obscuring speech intelligibility

export type BackgroundSoundType = 'none' | 'office' | 'call_center' | 'traffic';

export interface BackgroundSoundOption {
  id: BackgroundSoundType;
  label: string;
  description: string;
  iconName: 'VolumeX' | 'Building2' | 'Headphones' | 'Car';
}

export const BACKGROUND_SOUND_OPTIONS: BackgroundSoundOption[] = [
  {
    id: 'none',
    label: 'No sound',
    description: 'Clean studio silence behind agent voice',
    iconName: 'VolumeX'
  },
  {
    id: 'office',
    label: 'Quiet office',
    description: 'Subtle room tone, soft AC hum, gentle ambient presence',
    iconName: 'Building2'
  },
  {
    id: 'call_center',
    label: 'Call center',
    description: 'Authentic telecaller floor murmur, headset sidetone, keyboard taps',
    iconName: 'Headphones'
  },
  {
    id: 'traffic',
    label: 'City traffic',
    description: 'Distant urban road rumble, transit acoustics outside window',
    iconName: 'Car'
  }
];

let ambientCtx: AudioContext | null = null;
let activeSourceNode: AudioBufferSourceNode | null = null;
let activeGainNode: GainNode | null = null;
let currentPlayingType: BackgroundSoundType = 'none';
let isAuditioning = false;
let auditionTimer: any = null;

function getAudioContext(): AudioContext {
  if (!ambientCtx || ambientCtx.state === 'closed') {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    ambientCtx = new AudioCtxClass();
  }
  if (ambientCtx.state === 'suspended') {
    ambientCtx.resume();
  }
  return ambientCtx;
}

// Generate realistic synthetic acoustic buffers (5 seconds seamlessly loopable)
function generateAmbientBuffer(ctx: AudioContext, type: BackgroundSoundType): AudioBuffer | null {
  if (type === 'none') return null;

  const sampleRate = ctx.sampleRate;
  const duration = 5.0; // 5-second seamless loop
  const frameCount = sampleRate * duration;
  const buffer = ctx.createBuffer(2, frameCount, sampleRate);
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  if (type === 'office') {
    // Quiet office: subtle pink noise + soft room air pressure + very faint keyboard taps
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < frameCount; i++) {
      const white = (Math.random() * 2 - 1);
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
      b6 = white * 0.115926;

      // Soft 50Hz subtle transformer AC hum
      const hum = Math.sin((2 * Math.PI * 50 * i) / sampleRate) * 0.008;
      
      // Random very subtle click/keystroke every ~1.5s
      const isClick = Math.random() < 0.00008;
      const clickVal = isClick ? (Math.random() * 0.06 - 0.03) : 0;

      left[i] = pink + hum + clickVal;
      right[i] = pink * 0.95 + hum + clickVal * 0.8;
    }
  } else if (type === 'call_center') {
    // Call center: multi-voice formant bandpass chatter simulation + headset sidetone + keyboard clatter
    let b0 = 0, b1 = 0;
    for (let i = 0; i < frameCount; i++) {
      const whiteL = Math.random() * 2 - 1;
      const whiteR = Math.random() * 2 - 1;
      
      // Filtered voice formants around 700Hz and 1400Hz
      const t = i / sampleRate;
      const formantLfo1 = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.3 * t);
      const formantLfo2 = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.7 * t);
      const chatterL = (whiteL * 0.03) * formantLfo1 * Math.sin(2 * Math.PI * 850 * t);
      const chatterR = (whiteR * 0.03) * formantLfo2 * Math.sin(2 * Math.PI * 1150 * t);

      // Keyboard taps cluster
      const isKey = Math.random() < 0.00025;
      const keyTap = isKey ? (Math.random() * 0.05 - 0.025) : 0;

      // Phone line analog sidetone hiss
      b0 = 0.95 * b0 + whiteL * 0.05;
      b1 = 0.95 * b1 + whiteR * 0.05;
      const sidetone = (whiteL - b0) * 0.012;

      left[i] = chatterL + sidetone + keyTap;
      right[i] = chatterR + sidetone + keyTap * 0.7;
    }
  } else if (type === 'traffic') {
    // City traffic: deep sub-bass brownian street rumble (<120Hz) + faint distance vehicles
    let brownL = 0;
    let brownR = 0;
    for (let i = 0; i < frameCount; i++) {
      const whiteL = Math.random() * 2 - 1;
      const whiteR = Math.random() * 2 - 1;
      brownL = (brownL + (0.02 * whiteL)) / 1.02;
      brownR = (brownR + (0.02 * whiteR)) / 1.02;

      // Passing car swell
      const t = i / sampleRate;
      const carSwell = (0.5 + 0.5 * Math.sin(2 * Math.PI * 0.15 * t)) * 0.015;

      left[i] = (brownL * 0.25) + carSwell;
      right[i] = (brownR * 0.25) + carSwell;
    }
  }

  // Fade in and out boundary (0.05s) to guarantee zero click when looping
  const fadeSamples = Math.floor(sampleRate * 0.05);
  for (let i = 0; i < fadeSamples; i++) {
    const ramp = i / fadeSamples;
    left[i] *= ramp;
    right[i] *= ramp;
    left[frameCount - 1 - i] *= ramp;
    right[frameCount - 1 - i] *= ramp;
  }

  return buffer;
}

export function startAmbientNoise(type: BackgroundSoundType, volume = 0.08): void {
  stopAmbientNoise();
  if (type === 'none') {
    currentPlayingType = 'none';
    return;
  }

  try {
    const ctx = getAudioContext();
    const buffer = generateAmbientBuffer(ctx, type);
    if (!buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Filter to keep background sounds warm and unobtrusive
    const filter = ctx.createBiquadFilter();
    if (type === 'office') {
      filter.type = 'lowpass';
      filter.frequency.value = 850;
    } else if (type === 'call_center') {
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 0.7;
    } else if (type === 'traffic') {
      filter.type = 'lowpass';
      filter.frequency.value = 320;
    }

    const gain = ctx.createGain();
    // Gentle volume so agent voice remains crisp and dominant
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume), ctx.currentTime + 0.3);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(0);

    activeSourceNode = source;
    activeGainNode = gain;
    currentPlayingType = type;
  } catch (err) {
    console.warn('Failed to start ambient noise generator:', err);
  }
}

export function stopAmbientNoise(): void {
  if (auditionTimer) {
    clearTimeout(auditionTimer);
    auditionTimer = null;
  }
  isAuditioning = false;

  if (activeGainNode && ambientCtx) {
    try {
      activeGainNode.gain.setValueAtTime(activeGainNode.gain.value, ambientCtx.currentTime);
      activeGainNode.gain.exponentialRampToValueAtTime(0.0001, ambientCtx.currentTime + 0.15);
    } catch {}
  }

  setTimeout(() => {
    if (activeSourceNode) {
      try {
        activeSourceNode.stop();
        activeSourceNode.disconnect();
      } catch {}
      activeSourceNode = null;
    }
    activeGainNode = null;
    currentPlayingType = 'none';
  }, 160);
}

export function isAmbientNoiseActive(): boolean {
  return currentPlayingType !== 'none';
}

export function getCurrentAmbientType(): BackgroundSoundType {
  return currentPlayingType;
}

export function isAuditionPlaying(): boolean {
  return isAuditioning;
}

// Preview/Audition ambient sound with auto-stop after 6 seconds
export function toggleAuditionAmbientNoise(type: BackgroundSoundType, onStateChange?: (playing: boolean) => void): void {
  if (isAuditioning && currentPlayingType === type) {
    stopAmbientNoise();
    onStateChange?.(false);
    return;
  }

  if (type === 'none') {
    stopAmbientNoise();
    onStateChange?.(false);
    return;
  }

  startAmbientNoise(type, 0.12);
  isAuditioning = true;
  onStateChange?.(true);

  if (auditionTimer) clearTimeout(auditionTimer);
  auditionTimer = setTimeout(() => {
    stopAmbientNoise();
    onStateChange?.(false);
  }, 6000);
}
