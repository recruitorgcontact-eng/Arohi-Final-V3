import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Brain, 
  Coffee, 
  Rocket, 
  Search, 
  Zap, 
  Wand2, 
  Atom, 
  Compass, 
  Cpu
} from 'lucide-react';

interface ArohiThinkingIndicatorProps {
  isDarkMode?: boolean;
}

const THINKING_STAGES = [
  { text: 'Engaging hyperdrive thinking coils...', icon: Rocket, color: 'text-amber-400' },
  { text: 'Doodling diagrams in neural memory...', icon: Wand2, color: 'text-pink-400' },
  { text: 'Brewing fresh insights...', icon: Coffee, color: 'text-emerald-400' },
  { text: 'Examining facts & quantum logic...', icon: Atom, color: 'text-cyan-400' },
  { text: 'Scanning multi-engine knowledge stream...', icon: Search, color: 'text-blue-400' },
  { text: 'Unleashing Arohi’s creative spark...', icon: Sparkles, color: 'text-purple-400' },
  { text: 'Synthesizing and structuring final response...', icon: Brain, color: 'text-violet-400' },
  { text: 'Calibrating vectors for supreme accuracy...', icon: Cpu, color: 'text-teal-400' },
  { text: 'Connecting neural puzzle pieces...', icon: Zap, color: 'text-yellow-400' }
];

export const ArohiThinkingIndicator: React.FC<ArohiThinkingIndicatorProps> = ({ isDarkMode = true }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [stageIndex, setStageIndex] = useState<number>(0);

  // Live stopwatch timer
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setSeconds(elapsed);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Cycle through playful Grok-style witty thinking stages
  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % THINKING_STAGES.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const currentStage = THINKING_STAGES[stageIndex];
  const CurrentIcon = currentStage.icon;

  return (
    <div id="arohi-thinking-indicator" className="py-2.5 max-w-2xl w-full select-none">
      <div 
        className={`relative overflow-hidden rounded-2xl p-3 sm:p-4 border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-[#160e33]/90 via-[#23124d]/80 to-[#120a2e]/90 border-violet-500/30 shadow-[0_4px_25px_rgba(139,92,246,0.15)]' 
            : 'bg-gradient-to-r from-purple-50/95 via-indigo-50/90 to-violet-50/95 border-purple-200 shadow-md'
        }`}
      >
        {/* Animated Background Shimmer Beam */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <motion.div 
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-violet-400/20 to-transparent skew-x-12"
            animate={{ x: ['-100%', '250%'] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Left: Animated Icon + Dynamic Grok-Style Thinking Stage */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Spinning/pulsing neon icon hub */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-400 opacity-70 blur-xs animate-pulse" />
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-700 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <motion.div
                  key={stageIndex}
                  initial={{ scale: 0.6, rotate: -30, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.6, rotate: 30, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                >
                  <CurrentIcon className={`w-4 h-4 ${currentStage.color}`} />
                </motion.div>
              </div>
            </div>

            {/* Rotating text with animated transitions */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-extrabold tracking-wider uppercase ${
                  isDarkMode ? 'text-violet-400' : 'text-purple-600'
                }`}>
                  Arohi Reasoning
                </span>
                <span className="flex gap-1 items-center">
                  <span className="w-1 h-1 rounded-full bg-violet-400 animate-ping" />
                  <span className="w-1 h-1 rounded-full bg-pink-400 animate-pulse delay-75" />
                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse delay-150" />
                </span>
              </div>

              <div className="h-5 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStage.text}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`text-xs sm:text-sm font-semibold truncate ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    {currentStage.text}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Live Stopwatch Badge */}
          <div className="flex items-center gap-2 self-start sm:self-center shrink-0 pl-11 sm:pl-0">
            <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border shadow-xs ${
              isDarkMode 
                ? 'bg-[#100926]/90 text-violet-300 border-violet-500/40' 
                : 'bg-white text-purple-700 border-purple-200'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Thinking {seconds.toFixed(1)}s</span>
            </div>
          </div>
        </div>

        {/* Ambient progress line along the bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500/20 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400"
            animate={{ 
              x: ['-100%', '0%', '100%']
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: 'linear' 
            }}
          />
        </div>
      </div>
    </div>
  );
};
