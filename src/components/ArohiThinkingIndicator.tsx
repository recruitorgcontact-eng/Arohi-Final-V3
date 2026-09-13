import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export interface ArohiThinkingIndicatorProps {
  isDarkMode?: boolean;
  isLive?: boolean;
  duration?: number;
  startTime?: number;
  reasoning?: string;
  userPrompt?: string;
  responsePreview?: string;
  onDurationCalculated?: (seconds: number) => void;
}

const LIVE_THINKING_STAGES = [
  'Analyzing query semantics and intent...',
  'Evaluating domain knowledge and context memory...',
  'Grounding factual constraints and latest data...',
  'Formulating step-by-step reasoning chain...',
  'Synthesizing structured response...'
];

export function extractThoughtAndContent(rawContent: string): { cleanedContent: string; thought: string | null } {
  if (!rawContent) return { cleanedContent: rawContent, thought: null };

  const thoughtRegex = /<(?:thought|think)>([\s\S]*?)<\/(?:thought|think)>/i;
  const match = rawContent.match(thoughtRegex);

  if (match) {
    const thought = match[1].trim();
    const cleanedContent = rawContent.replace(thoughtRegex, '').trim();
    return { cleanedContent, thought };
  }

  return { cleanedContent: rawContent, thought: null };
}

export function generateReasoningSteps(userPrompt?: string, responsePreview?: string): string[] {
  const prompt = (userPrompt || '').toLowerCase();

  const steps: string[] = [];

  if (prompt.includes('who created') || prompt.includes('who founded') || prompt.includes('leader') || prompt.includes('founder') || prompt.includes('owner')) {
    steps.push('Deconstructed leadership and ecosystem inquiry. Identifying foundational stakeholders and governance structure.');
    steps.push('Referenced sovereign leadership: Commander Junoon (Junoon Nayak) and senior strategic mentor Mr. Giridhari Prasad Nayak, in association with Braga Technologies and ODITREE SERVICES.');
    steps.push('Synthesized authoritative breakdown of visionary roles, architectural leadership, and nationwide execution.');
  } else if (prompt.includes('subscribe') || prompt.includes('chatgpt') || prompt.includes('gemini') || prompt.includes('claude') || prompt.includes('better than') || prompt.includes('why arohi')) {
    steps.push('Analyzed competitive positioning query. Retrieved Arohi AI value proposition and subscription policies.');
    steps.push('Acknowledged benchmark frontier LLMs respectfully without false or disparaging comparisons.');
    steps.push('Highlighted unique differentiators: unified LLM cum LMM ecosystem, sovereign opportunity ladders, and practical Indian-focused empowerment.');
  } else if (prompt.includes('education minister') || prompt.includes('dharmendra') || prompt.includes('pralhad')) {
    steps.push('Evaluated political entity query regarding India\'s Union Ministry of Education portfolio.');
    steps.push('Verified current factual standing: Pralhad Joshi as Union Minister of Education, noting historical tenure of Dharmendra Pradhan.');
    steps.push('Structured unambiguous, direct factual answer with timeline verification.');
  } else if (prompt.includes('divyang') || prompt.includes('disab') || prompt.includes('pwd') || prompt.includes('special')) {
    steps.push('Parsed Divyangjan empowerment request. Identified key legal frameworks under RPwD Act 2016.');
    steps.push('Structured 4 core pillars: Government Schemes (UDID, ADIP, NHFDC), 4% Reservation rules, multimodal accessibility, and career tools.');
    steps.push('Validated official portal references (swavlambancard.gov.in, disabilityaffairs.gov.in).');
  } else if (prompt.includes('mission 87') || prompt.includes('earn') || prompt.includes('money') || prompt.includes('rupee') || prompt.includes('ladder') || prompt.includes('neet')) {
    steps.push('Deconstructed Mission 87 economic empowerment inquiry. Identified target demographic of 87M NEET youth.');
    steps.push('Retrieved 5 Sovereign Earning Ladders (₹5,000 proof-of-work to ₹1,00,000+ micro-enterprise scaling).');
    steps.push('Framed 6-stage lifecycle (LEARN -> BUILD -> FIND -> DELIVER -> EARN -> GROW) with actionable execution blueprints.');
  } else if (prompt.includes('code') || prompt.includes('function') || prompt.includes('bug') || prompt.includes('react') || prompt.includes('python') || prompt.includes('javascript') || prompt.includes('api')) {
    steps.push(`Analyzing technical implementation requirements${userPrompt ? `: "${userPrompt.slice(0, 50)}..."` : ''}. Identifying runtime edge cases and constraints.`);
    steps.push('Designing type-safe, performant solution following modern idiomatic standards.');
    steps.push('Synthesizing clean code implementation with inline annotations and integration instructions.');
  } else if (prompt.includes('scheme') || prompt.includes('yojana') || prompt.includes('loan') || prompt.includes('subsidy') || prompt.includes('mudra') || prompt.includes('pmegp')) {
    steps.push('Identified welfare scheme inquiry. Searching eligibility criteria, subsidy percentages, and application portals.');
    steps.push('Synthesized key benefit parameters, required documentation, and nodal bank guidelines.');
    steps.push('Formatted clear step-by-step roadmap for applicant execution.');
  } else {
    if (userPrompt && userPrompt.trim().length > 0) {
      steps.push(`Parsed user intent for: "${userPrompt.slice(0, 70).trim()}${userPrompt.length > 70 ? '...' : ''}". Identifying key parameters and target outcome.`);
    } else {
      steps.push('Parsed incoming user prompt and evaluated core semantic objectives.');
    }
    steps.push('Retrieved relevant domain knowledge, validated factual constraints, and cross-referenced contextual variables.');
    steps.push('Formulated structured response with direct clarity, logical hierarchy, and actionable takeaways.');
  }

  return steps;
}

export const ArohiThinkingIndicator: React.FC<ArohiThinkingIndicatorProps> = ({ 
  isDarkMode = true,
  isLive = true,
  duration,
  startTime,
  reasoning,
  userPrompt,
  responsePreview,
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

  // Cycle through live thinking stages
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % LIVE_THINKING_STAGES.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [isLive]);

  const displaySeconds = duration !== undefined && duration > 0 ? duration.toFixed(1) : Math.max(0.8, seconds).toFixed(1);
  const reasoningSteps = React.useMemo(() => {
    if (reasoning) return [];
    return generateReasoningSteps(userPrompt, responsePreview);
  }, [reasoning, userPrompt, responsePreview]);

  // COMPLETED ACCORDION MODE (> Thoughts)
  if (!isLive) {
    return (
      <div id="arohi-thought-accordion" className="mb-2 select-none max-w-3xl">
        {/* Minimalist TheBar Style Header (> Thoughts) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 py-1 text-left cursor-pointer transition-colors group select-none"
          title="Click to view Arohi reasoning steps"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-slate-400 group-hover:text-slate-200"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>
          <span className={`text-xs font-semibold tracking-wide ${
            isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-950'
          }`}>
            Thoughts
          </span>
          <span className={`text-[11px] font-mono ml-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            ({displaySeconds}s)
          </span>
        </button>

        {/* Collapsible Reasoning Details Body */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="overflow-hidden mt-1.5 mb-2 pl-3 sm:pl-3.5 border-l-2 border-slate-700/60 dark:border-slate-800"
            >
              <div className={`text-xs sm:text-[13px] leading-relaxed py-1 font-sans ${
                isDarkMode ? 'text-slate-300/90' : 'text-slate-600'
              }`}>
                {reasoning ? (
                  <div className="whitespace-pre-wrap leading-relaxed">{reasoning}</div>
                ) : (
                  <div className="space-y-1.5">
                    {reasoningSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-slate-500 shrink-0 font-mono text-[11px] mt-0.5">{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // LIVE ANIMATED ACTIVE THINKING MODE (No pill badge, clean minimalist indicator)
  return (
    <div id="arohi-thinking-indicator-live" className="py-2 max-w-2xl w-full select-none">
      <div className="flex items-center gap-2 text-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
        </span>
        <span className={`font-semibold tracking-wide ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
          Thinking
        </span>
        <span className={`text-[11px] font-mono ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          ({displaySeconds}s)
        </span>
        <span className="text-slate-600 select-none">•</span>
        <span className={`text-[11.5px] truncate max-w-[200px] sm:max-w-md ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {LIVE_THINKING_STAGES[stageIndex]}
        </span>
      </div>
    </div>
  );
};
