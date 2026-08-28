import React, { useState, useEffect, useRef } from 'react';
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
  const onDurationRef = useRef(onDurationCalculated);

  useEffect(() => {
    onDurationRef.current = onDurationCalculated;
  }, [onDurationCalculated]);

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
      if (onDurationRef.current) {
        onDurationRef.current(elapsed);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLive, startTime, duration]);

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
          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
            isDarkMode 
              ? 'bg-zinc-900/90 hover:bg-zinc-800/80 border-zinc-800 text-zinc-200' 
              : 'bg-zinc-100 hover:bg-zinc-200/80 border-zinc-200 text-zinc-800'
          }`}
        >
          {/* Clickable Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-3.5 py-2 flex items-center justify-between gap-2.5 text-left cursor-pointer transition-colors"
            title="Click to view Arohi reasoning steps"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                isDarkMode ? 'bg-zinc-800 border-zinc-700/60 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700'
              }`}>
                <Brain className="w-3 h-3" />
              </div>
              <span className={`text-xs font-medium tracking-wide ${
                isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
              }`}>
                Thought for <span className="font-mono font-semibold text-emerald-400">{displaySeconds}s</span>
              </span>
              <span className={`hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full border ${
                isDarkMode ? 'bg-zinc-800/80 text-zinc-400 border-zinc-700/60' : 'bg-zinc-200/70 text-zinc-600 border-zinc-300'
              }`}>
                Reasoning Complete
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[11px] font-medium hidden sm:inline ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                {isExpanded ? 'Hide process' : 'Show reasoning'}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}
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
                <div className={`px-3.5 pb-3.5 pt-2 border-t ${
                  isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-zinc-50'
                }`}>
                  <div className="space-y-2 text-xs">
                    <div className={`flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider pb-1 mb-1 border-b ${
                      isDarkMode ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-200 text-zinc-500'
                    }`}>
                      <span>Reasoning Trace & Execution Pipeline</span>
                      <span className="text-emerald-400 font-mono flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Verified ({displaySeconds}s)
                      </span>
                    </div>

                    {/* Step Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                        isDarkMode ? 'bg-zinc-900 border-zinc-800/80 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700 shadow-xs'
                      }`}>
                        <Search className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-[11.5px] text-zinc-200">Knowledge & Memory Stream</div>
                          <div className="text-[10.5px] text-zinc-400">Cross-referenced chat history and context memory.</div>
                        </div>
                      </div>

                      <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                        isDarkMode ? 'bg-zinc-900 border-zinc-800/80 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700 shadow-xs'
                      }`}>
                        <Atom className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-[11.5px] text-zinc-200">Logic & Fact Alignment</div>
                          <div className="text-[10.5px] text-zinc-400">Evaluated user intent and structured response schema.</div>
                        </div>
                      </div>

                      <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                        isDarkMode ? 'bg-zinc-900 border-zinc-800/80 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700 shadow-xs'
                      }`}>
                        <Cpu className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-[11.5px] text-zinc-200">Vector Calibrations</div>
                          <div className="text-[10.5px] text-zinc-400">Applied formatting and language localization rules.</div>
                        </div>
                      </div>

                      <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                        isDarkMode ? 'bg-zinc-900 border-zinc-800/80 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700 shadow-xs'
                      }`}>
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-[11.5px] text-zinc-200">Arohi Tone & Clarity Polish</div>
                          <div className="text-[10.5px] text-zinc-400">Structured actionable bullets, key terms, and visual cues.</div>
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
    <div id="arohi-thinking-indicator-live" className="py-2 max-w-2xl w-full select-none">
      <div 
        className={`relative overflow-hidden rounded-2xl p-3 sm:p-3.5 border transition-all duration-200 ${
          isDarkMode 
            ? 'bg-zinc-900/90 border-zinc-800 text-zinc-200 shadow-sm' 
            : 'bg-zinc-100 border-zinc-200 text-zinc-800 shadow-sm'
        }`}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Left: Animated Icon + Dynamic Stage */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700/60 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700'
            }`}>
              <motion.div
                key={stageIndex}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CurrentIcon className={`w-3.5 h-3.5 ${currentStage.color}`} />
              </motion.div>
            </div>

            {/* Rotating text with animated transitions */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  Arohi Reasoning
                </span>
                <span className="flex gap-1 items-center">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  <span className="w-1 h-1 rounded-full bg-zinc-400" />
                </span>
              </div>

              <div className="h-5 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStage.text}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={`text-xs sm:text-[13px] font-medium truncate ${
                      isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
                    }`}
                  >
                    {currentStage.text}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Live Stopwatch Badge */}
          <div className="flex items-center gap-2 self-start sm:self-center shrink-0 pl-9 sm:pl-0">
            <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 border shadow-xs ${
              isDarkMode 
                ? 'bg-zinc-950/80 text-zinc-300 border-zinc-800' 
                : 'bg-white text-zinc-700 border-zinc-200'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Thinking {displaySeconds}s</span>
            </div>
          </div>
        </div>

        {/* Ambient subtle progress line along the bottom border */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden ${
          isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'
        }`}>
          <motion.div 
            className="h-full bg-emerald-400/80 w-1/3"
            animate={{ 
              x: ['-100%', '300%']
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.2, 
              ease: 'easeInOut' 
            }}
          />
        </div>
      </div>
    </div>
  );
};
