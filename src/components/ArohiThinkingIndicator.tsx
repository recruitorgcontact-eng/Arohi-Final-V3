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
  Cpu, 
  ChevronDown, 
  CheckCircle2, 
  Layers, 
  Workflow
} from 'lucide-react';

export interface ArohiThinkingIndicatorProps {
  isDarkMode?: boolean;
  isLive?: boolean;
  duration?: number;
  startTime?: number;
  onDurationCalculated?: (seconds: number) => void;
}

const THINKING_STAGES = [
  { text: 'Engaging hyperdrive thinking coils...', icon: Rocket, color: 'text-amber-400', step: 'Model Routing' },
  { text: 'Doodling diagrams in neural memory...', icon: Wand2, color: 'text-pink-400', step: 'Context Indexing' },
  { text: 'Brewing fresh insights...', icon: Coffee, color: 'text-emerald-400', step: 'Idea Synthesis' },
  { text: 'Examining facts & quantum logic...', icon: Atom, color: 'text-cyan-400', step: 'Fact Verification' },
  { text: 'Scanning multi-engine knowledge stream...', icon: Search, color: 'text-blue-400', step: 'Search Grounding' },
  { text: 'Unleashing Arohi’s creative spark...', icon: Sparkles, color: 'text-purple-400', step: 'Creative Polish' },
  { text: 'Synthesizing and structuring final response...', icon: Brain, color: 'text-violet-400', step: 'Structured Output' },
  { text: 'Calibrating vectors for supreme accuracy...', icon: Cpu, color: 'text-teal-400', step: 'Vector Precision' },
  { text: 'Connecting neural puzzle pieces...', icon: Zap, color: 'text-yellow-400', step: 'Final Coherence' }
];

export const ArohiThinkingIndicator: React.FC<ArohiThinkingIndicatorProps> = ({ 
  isDarkMode = true,
  isLive = true,
  duration,
  startTime,
  onDurationCalculated
}) => {
  const [seconds, setSeconds] = useState<number>(duration || 0);
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Live stopwatch timer while actively thinking
  useEffect(() => {
    if (!isLive) {
      if (duration !== undefined && duration > 0) {
        setSeconds(duration);
      }
      return;
    }

    const start = startTime || Date.now();
    const interval = setInterval(() => {
      const elapsed = Number(((Date.now() - start) / 1000).toFixed(1));
      setSeconds(elapsed);
      if (onDurationCalculated) {
        onDurationCalculated(elapsed);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLive, startTime, duration, onDurationCalculated]);

  // Cycle through playful Grok-style witty thinking stages while live
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % THINKING_STAGES.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [isLive]);

  const currentStage = THINKING_STAGES[stageIndex];
  const CurrentIcon = currentStage.icon;
  const displaySeconds = duration !== undefined && duration > 0 ? duration.toFixed(1) : Math.max(0.8, seconds).toFixed(1);

  // COMPLETED ACCORDION MODE (Thought for Xs ⌄)
  if (!isLive) {
    return (
      <div id="arohi-thought-accordion" className="mb-3.5 select-none max-w-2xl">
        <div 
          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
            isDarkMode 
              ? 'bg-[#150d30]/80 hover:bg-[#1a113d]/90 border-violet-500/30 text-slate-200' 
              : 'bg-gradient-to-r from-purple-50/80 to-indigo-50/80 hover:bg-purple-100/70 border-purple-200/80 text-slate-700'
          }`}
        >
          {/* Clickable Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-3.5 py-2 flex items-center justify-between gap-2.5 text-left cursor-pointer transition-colors"
            title="Click to view Arohi reasoning steps"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
                <Brain className="w-3 h-3 text-violet-200" />
              </div>
              <span className={`text-xs font-semibold tracking-wide ${
                isDarkMode ? 'text-violet-300' : 'text-purple-900'
              }`}>
                Thought for <span className="font-mono font-bold text-emerald-400">{displaySeconds}s</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                Reasoning Complete
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[11px] font-medium hidden sm:inline ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {isExpanded ? 'Hide process' : 'Show reasoning'}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-violet-400"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
          </button>

          {/* Collapsible Reasoning Details Body */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className={`px-3.5 pb-3.5 pt-1.5 border-t ${
                  isDarkMode ? 'border-violet-500/20 bg-[#0e0821]/60' : 'border-purple-200/60 bg-white/60'
                }`}>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      <span>Reasoning Trace & Execution Pipeline</span>
                      <span className="text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified ({displaySeconds}s)
                      </span>
                    </div>

                    {/* Step Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className={`p-2 rounded-xl border flex items-start gap-2 ${
                        isDarkMode ? 'bg-[#180f38] border-violet-500/20 text-slate-300' : 'bg-purple-50 border-purple-100 text-slate-700'
                      }`}>
                        <Search className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-[11px]">Knowledge & Memory Stream</div>
                          <div className="text-[10px] opacity-75">Cross-referenced chat history and context memory.</div>
                        </div>
                      </div>

                      <div className={`p-2 rounded-xl border flex items-start gap-2 ${
                        isDarkMode ? 'bg-[#180f38] border-violet-500/20 text-slate-300' : 'bg-purple-50 border-purple-100 text-slate-700'
                      }`}>
                        <Atom className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-[11px]">Logic & Fact Alignment</div>
                          <div className="text-[10px] opacity-75">Evaluated user intent and structured response schema.</div>
                        </div>
                      </div>

                      <div className={`p-2 rounded-xl border flex items-start gap-2 ${
                        isDarkMode ? 'bg-[#180f38] border-violet-500/20 text-slate-300' : 'bg-purple-50 border-purple-100 text-slate-700'
                      }`}>
                        <Cpu className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-[11px]">Vector Calibrations</div>
                          <div className="text-[10px] opacity-75">Applied formatting and language localization rules.</div>
                        </div>
                      </div>

                      <div className={`p-2 rounded-xl border flex items-start gap-2 ${
                        isDarkMode ? 'bg-[#180f38] border-violet-500/20 text-slate-300' : 'bg-purple-50 border-purple-100 text-slate-700'
                      }`}>
                        <Sparkles className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-[11px]">Arohi Tone & Clarity Polish</div>
                          <div className="text-[10px] opacity-75">Structured actionable bullets, key terms, and visual cues.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // LIVE ANIMATED ACTIVE THINKING MODE (Counting live timer + animated stage)
  return (
    <div id="arohi-thinking-indicator-live" className="py-2.5 max-w-2xl w-full select-none">
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
              <span>Thinking {displaySeconds}s</span>
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
