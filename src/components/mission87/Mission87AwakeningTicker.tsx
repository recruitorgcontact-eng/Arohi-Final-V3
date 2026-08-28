import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  Sprout, 
  Factory, 
  Rocket, 
  Cpu, 
  Coins, 
  Globe, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft,
  Layers,
  Compass
} from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

export interface Mission87AwakeningTickerProps {
  isDarkMode?: boolean;
  onExploreTrack?: (trackName: string) => void;
  className?: string;
}

interface StoryBeat {
  id: string;
  tag: string;
  headline: string;
  subtext: string;
  metric: string;
  icon: any;
  accentColor: string;
  glowColor: string;
  badgeColor: string;
  district: string;
}

const AWAKENING_STORY_BEATS: StoryBeat[] = [
  {
    id: 'demographic_spark',
    tag: 'National Awakening',
    headline: 'Awakening 87,000,000 Hidden Powerhouses across Bharat',
    subtext: 'Transforming world’s largest untapped youth demographic from NEET bracket into sovereign value creators.',
    metric: '8.7 Cr Youth',
    icon: Flame,
    accentColor: 'text-amber-400',
    glowColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
    badgeColor: 'bg-amber-500/15 border-amber-400/40 text-amber-300',
    district: '700+ Districts'
  },
  {
    id: 'varanasi_digital',
    tag: 'Digital Agency Track',
    headline: 'Varanasi youth turning smartphone into local AI automation agency',
    subtext: 'Deploying automated billing, lead-gen, and CRM bots for 40+ local merchants without writing code.',
    metric: '₹38,500/mo',
    icon: Zap,
    accentColor: 'text-cyan-400',
    glowColor: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    badgeColor: 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300',
    district: 'Varanasi, UP'
  },
  {
    id: 'nashik_agritech',
    tag: 'Skilled Green Economy',
    headline: 'Nashik agricultural innovator deploying solar food dehydrators',
    subtext: 'Zero-spoilage onion and tomato processing network generating export-grade dehydrated packets directly at farm-gate.',
    metric: '₹52,000/mo',
    icon: Sprout,
    accentColor: 'text-emerald-400',
    glowColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    badgeColor: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300',
    district: 'Nashik, MH'
  },
  {
    id: 'coimbatore_manufacturing',
    tag: 'Micro-Manufacturing',
    headline: 'Coimbatore precision workshop winning direct industrial export contracts',
    subtext: 'Turning idle 3-axis CNC machines into high-margin EV connector component supplies via Arohi ONE RFQs.',
    metric: '₹84,000/mo',
    icon: Factory,
    accentColor: 'text-amber-400',
    glowColor: 'from-orange-500/20 via-amber-500/10 to-transparent',
    badgeColor: 'bg-orange-500/15 border-orange-400/40 text-orange-300',
    district: 'Coimbatore, TN'
  },
  {
    id: 'patna_d2c',
    tag: 'Hyperlocal Commerce',
    headline: 'Patna artisan collective scaling direct-to-consumer handcrafts',
    subtext: 'Multimodal AI product imaging and automated shipping integration replacing predatory middlemen.',
    metric: '₹64,000/mo',
    icon: Rocket,
    accentColor: 'text-pink-400',
    glowColor: 'from-pink-500/20 via-purple-500/10 to-transparent',
    badgeColor: 'bg-pink-500/15 border-pink-400/40 text-pink-300',
    district: 'Patna, Bihar'
  },
  {
    id: 'vernacular_ai',
    tag: 'Sovereign Multimodal AI',
    headline: '150+ Multilingual AI Voice Copilots eliminating literacy barriers',
    subtext: 'Hands-free voice accounting, GST invoices, and business proposals generated purely by speaking in regional dialects.',
    metric: '150+ Dialects',
    icon: Cpu,
    accentColor: 'text-purple-400',
    glowColor: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    badgeColor: 'bg-purple-500/15 border-purple-400/40 text-purple-300',
    district: 'Pan-Bharat'
  },
  {
    id: 'gdp_activation',
    tag: 'Economic Sovereign Superpower',
    headline: 'Unlocking ₹10,000 Crore annual decentralized GDP directly at grassroots',
    subtext: 'When 87 million young minds build instead of wait, India’s economic momentum becomes unstoppable.',
    metric: '₹10,000 Cr+',
    icon: Coins,
    accentColor: 'text-yellow-400',
    glowColor: 'from-yellow-500/20 via-amber-500/10 to-transparent',
    badgeColor: 'bg-yellow-500/15 border-yellow-400/40 text-yellow-300',
    district: 'Bharat Sovereign'
  }
];

export default function Mission87AwakeningTicker({
  isDarkMode = true,
  onExploreTrack,
  className = ''
}: Mission87AwakeningTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance ticker every 4.2 seconds when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AWAKENING_STORY_BEATS.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentBeat = AWAKENING_STORY_BEATS[currentIndex];
  const CurrentIcon = currentBeat.icon;

  const handleNext = () => {
    try {
      audioEngine.playButtonTap();
    } catch {}
    setCurrentIndex((prev) => (prev + 1) % AWAKENING_STORY_BEATS.length);
  };

  const handlePrev = () => {
    try {
      audioEngine.playButtonTap();
    } catch {}
    setCurrentIndex((prev) => (prev - 1 + AWAKENING_STORY_BEATS.length) % AWAKENING_STORY_BEATS.length);
  };

  const togglePlay = () => {
    try {
      audioEngine.playButtonTap();
    } catch {}
    setIsPlaying(!isPlaying);
  };

  const selectBeat = (idx: number) => {
    try {
      audioEngine.playButtonTap();
    } catch {}
    setCurrentIndex(idx);
  };

  return (
    <div 
      id="mission87-live-story-ticker"
      className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-300 select-none ${
        isDarkMode 
          ? 'bg-[#0d0924]/90 border-purple-500/30 text-slate-100 shadow-[0_10px_35px_rgba(147,51,234,0.15)]' 
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-lg'
      } ${className}`}
    >
      {/* Background Subtle Gradient Glow */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${currentBeat.glowColor} opacity-50 transition-all duration-700 pointer-events-none`} 
      />

      {/* Top Bar: Live Pulse Indicator + Stage Counter + Controls */}
      <div className={`relative z-10 flex items-center justify-between px-3.5 sm:px-5 pt-3 pb-2 border-b ${
        isDarkMode ? 'border-purple-500/20 bg-[#09061a]/60' : 'border-slate-100 bg-slate-50/70'
      }`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] sm:text-xs font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="uppercase tracking-wider">Live Story Pulse</span>
          </div>

          <span className={`text-[10px] sm:text-xs font-semibold truncate ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Chronicle {currentIndex + 1} of {AWAKENING_STORY_BEATS.length}
          </span>
        </div>

        {/* Playback Controls & Location Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isDarkMode ? 'bg-purple-900/30 border-purple-500/30 text-purple-300' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}>
            📍 {currentBeat.district}
          </span>

          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause Chronicle Animation" : "Resume Chronicle Animation"}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={handlePrev}
            title="Previous Story Beat"
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-3 h-3" />
          </button>

          <button
            onClick={handleNext}
            title="Next Story Beat"
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Animated Story Stage Body */}
      <div className="relative z-10 p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left: Dynamic Animated Icon & Glowing Shell */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center shrink-0 border shadow-md transition-all ${
            isDarkMode 
              ? 'bg-[#150f38] border-purple-500/40 shadow-purple-950/50' 
              : 'bg-purple-50 border-purple-200 shadow-purple-100'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBeat.id}
                initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.6, rotate: 20, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <CurrentIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${currentBeat.accentColor}`} />
              </motion.div>
            </AnimatePresence>
            
            {/* Corner Micro Ping */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-[#0d0924]" />
          </div>

          {/* Center: Dynamic Animated Typography */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${currentBeat.badgeColor}`}>
                {currentBeat.tag}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold sm:hidden">
                • {currentBeat.district}
              </span>
            </div>

            <div className="overflow-hidden min-h-[3.2rem] sm:min-h-[2.8rem] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBeat.headline}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-0.5"
                >
                  <h3 className={`text-xs sm:text-sm md:text-base font-black tracking-tight leading-snug line-clamp-2 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {currentBeat.headline}
                  </h3>
                  <p className={`text-[11px] sm:text-xs leading-relaxed line-clamp-1 font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {currentBeat.subtext}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right: Key Target Metric Badge */}
        <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-1.5 shrink-0 pl-14 sm:pl-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/40">
          <div className="text-left sm:text-right">
            <div className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
              Verified Economic Target
            </div>
            <div className="text-sm sm:text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-emerald-400 font-mono">
              {currentBeat.metric}
            </div>
          </div>

          {/* Quick Stage Indicator Dots */}
          <div className="flex items-center gap-1">
            {AWAKENING_STORY_BEATS.map((beat, idx) => (
              <button
                key={beat.id}
                onClick={() => selectBeat(idx)}
                aria-label={`Jump to chronicle ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-5 bg-gradient-to-r from-amber-400 to-cyan-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]' 
                    : 'w-1.5 bg-slate-600/40 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Animated Laser Runner (Tricolor Flowing Beam) */}
      <div className={`relative h-[2px] w-full overflow-hidden ${
        isDarkMode ? 'bg-[#1a123d]' : 'bg-slate-200'
      }`}>
        <motion.div 
          className="h-full w-1/3 bg-gradient-to-r from-amber-400 via-white to-emerald-400"
          animate={isPlaying ? { 
            x: ['-100%', '300%']
          } : { x: '0%' }}
          transition={{ 
            repeat: Infinity, 
            duration: 3.5, 
            ease: 'linear' 
          }}
        />
      </div>
    </div>
  );
}
