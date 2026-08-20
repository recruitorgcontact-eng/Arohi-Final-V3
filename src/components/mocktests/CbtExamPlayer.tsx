import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  Clock, AlertTriangle, ChevronLeft, ChevronRight, CheckCircle2, 
  HelpCircle, RotateCcw, Bookmark, Send, Eye, ShieldCheck, Flag,
  Maximize2, Minimize2, ZoomIn, ZoomOut, User, Award, ArrowLeft,
  Calculator, Edit3, Volume2, VolumeX, Keyboard, Sparkles, X,
  Trash2, Check, Smartphone, Layers
} from 'lucide-react';
import { MockTest, ExamQuestion, QuestionAttemptState, TestSubmission } from '../../types/examTypes';

interface CbtExamPlayerProps {
  test: MockTest;
  userName: string;
  userState?: string;
  isDarkMode?: boolean;
  onExit: () => void;
  onSubmit: (submission: TestSubmission) => void;
}

// Lightweight Web Audio API sound synthesizer
class ExamAudioEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled = true;

  constructor() {
    // Lazy initialized on first user interaction
  }

  public toggleSound(enabled?: boolean) {
    this.soundEnabled = enabled !== undefined ? enabled : !this.soundEnabled;
    return this.soundEnabled;
  }

  public isEnabled() {
    return this.soundEnabled;
  }

  private getContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch (e) {
      return null;
    }
  }

  public playOptionTap() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {}
  }

  public playButtonTap() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }

  public playWarningBeep() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }
}

const audioEngine = new ExamAudioEngine();

export default function CbtExamPlayer({
  test,
  userName,
  userState = 'Odisha',
  isDarkMode = true,
  onExit,
  onSubmit
}: CbtExamPlayerProps) {
  // Timing State
  const initialTimeSeconds = test.durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(initialTimeSeconds);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Active Navigation
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'odia' | 'hindi'>('english');
  
  // Modals & Panels
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isKeyboardHelpOpen, setIsKeyboardHelpOpen] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Scratchpad Content
  const [scratchpadText, setScratchpadText] = useState('');
  
  // Calculator state
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcMemory, setCalcMemory] = useState<number | null>(null);

  // Question Attempt States dictionary
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionAttemptState>>(() => {
    const initial: Record<string, QuestionAttemptState> = {};
    test.questions.forEach((q) => {
      initial[q.id] = {
        questionId: q.id,
        status: 'not_visited',
        timeSpentSeconds: 0
      };
    });
    return initial;
  });

  // Track time spent per active question
  const lastQuestionSwitchTimeRef = useRef<number>(Date.now());

  // Filter questions for active section
  const activeSection = test.sections[activeSectionIndex] || test.sections[0];
  const sectionQuestions = useMemo(() => {
    return test.questions.filter(q => q.sectionId === activeSection.id);
  }, [test.questions, activeSection.id]);

  const currentQuestion = sectionQuestions[currentQuestionIndex] || sectionQuestions[0];

  // Mark current question as visited if not visited before
  useEffect(() => {
    if (!currentQuestion) return;
    setQuestionStates((prev) => {
      const existing = prev[currentQuestion.id];
      if (existing && existing.status === 'not_visited') {
        return {
          ...prev,
          [currentQuestion.id]: {
            ...existing,
            status: 'not_answered'
          }
        };
      }
      return prev;
    });
  }, [currentQuestion?.id]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    } catch (e) {}
  };

  // Timer Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === 300) {
          // 5 minute warning
          audioEngine.playWarningBeep();
        }
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update time spent when switching question
  const recordQuestionTime = useCallback(() => {
    if (!currentQuestion) return;
    const now = Date.now();
    const elapsed = Math.round((now - lastQuestionSwitchTimeRef.current) / 1000);
    lastQuestionSwitchTimeRef.current = now;

    setQuestionStates((prev) => {
      const existing = prev[currentQuestion.id] || { questionId: currentQuestion.id, status: 'not_answered', timeSpentSeconds: 0 };
      return {
        ...prev,
        [currentQuestion.id]: {
          ...existing,
          timeSpentSeconds: (existing.timeSpentSeconds || 0) + elapsed
        }
      };
    });
  }, [currentQuestion]);

  // Option selection
  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    audioEngine.playOptionTap();
    setQuestionStates((prev) => {
      const existing = prev[currentQuestion.id] || { questionId: currentQuestion.id, status: 'not_answered', timeSpentSeconds: 0 };
      const newOption = existing.selectedOption === optionId ? undefined : optionId;
      return {
        ...prev,
        [currentQuestion.id]: {
          ...existing,
          selectedOption: newOption,
          status: newOption ? 'answered' : 'not_answered'
        }
      };
    });
  };

  // Clear current response
  const handleClearResponse = () => {
    if (!currentQuestion) return;
    audioEngine.playButtonTap();
    setQuestionStates((prev) => {
      const existing = prev[currentQuestion.id] || { questionId: currentQuestion.id, status: 'not_answered', timeSpentSeconds: 0 };
      return {
        ...prev,
        [currentQuestion.id]: {
          ...existing,
          selectedOption: undefined,
          status: 'not_answered'
        }
      };
    });
  };

  // Mark for review & next
  const handleMarkForReviewAndNext = () => {
    if (!currentQuestion) return;
    audioEngine.playButtonTap();
    recordQuestionTime();
    setQuestionStates((prev) => {
      const existing = prev[currentQuestion.id] || { questionId: currentQuestion.id, status: 'not_answered', timeSpentSeconds: 0 };
      const isAnswered = !!existing.selectedOption;
      return {
        ...prev,
        [currentQuestion.id]: {
          ...existing,
          status: isAnswered ? 'answered_and_marked' : 'marked_for_review'
        }
      };
    });

    // Move next
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (activeSectionIndex < test.sections.length - 1) {
      setActiveSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  // Save & Next
  const handleSaveAndNext = useCallback(() => {
    audioEngine.playButtonTap();
    recordQuestionTime();
    if (!currentQuestion) return;
    setQuestionStates((prev) => {
      const existing = prev[currentQuestion.id] || { questionId: currentQuestion.id, status: 'not_answered', timeSpentSeconds: 0 };
      return {
        ...prev,
        [currentQuestion.id]: {
          ...existing,
          status: existing.selectedOption ? 'answered' : 'not_answered'
        }
      };
    });

    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (activeSectionIndex < test.sections.length - 1) {
      setActiveSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    }
  }, [currentQuestion, recordQuestionTime, currentQuestionIndex, sectionQuestions.length, activeSectionIndex, test.sections.length]);

  const handlePrevious = useCallback(() => {
    audioEngine.playButtonTap();
    recordQuestionTime();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (activeSectionIndex > 0) {
      const prevSecIdx = activeSectionIndex - 1;
      setActiveSectionIndex(prevSecIdx);
      const prevSecQs = test.questions.filter(q => q.sectionId === test.sections[prevSecIdx].id);
      setCurrentQuestionIndex(Math.max(0, prevSecQs.length - 1));
    }
  }, [currentQuestionIndex, activeSectionIndex, recordQuestionTime, test.questions, test.sections]);

  // Jump to specific question
  const handleJumpToQuestion = (sectionIdx: number, qIdx: number) => {
    audioEngine.playButtonTap();
    recordQuestionTime();
    setActiveSectionIndex(sectionIdx);
    setCurrentQuestionIndex(qIdx);
    setIsMobilePaletteOpen(false);
  };

  // Final submission calculation
  const handleFinalSubmit = useCallback(() => {
    recordQuestionTime();
    const answers: Record<string, string> = {};
    Object.entries(questionStates).forEach(([qId, st]) => {
      if (st.selectedOption) {
        answers[qId] = st.selectedOption;
      }
    });

    const totalTimeTakenSeconds = Math.max(1, (test.durationMinutes * 60) - secondsRemaining);

    const submission: TestSubmission = {
      testId: test.id,
      userName: userName || 'Aspirant',
      userState: userState || 'Odisha',
      startedAt: new Date(startTimeRef.current).toISOString(),
      completedAt: new Date().toISOString(),
      totalTimeTakenSeconds,
      answers,
      questionStates
    };

    onSubmit(submission);
  }, [recordQuestionTime, questionStates, test.durationMinutes, secondsRemaining, test.id, userName, userState, onSubmit]);

  // Auto-submit when time expires
  useEffect(() => {
    if (isTimeUp && secondsRemaining === 0) {
      handleFinalSubmit();
    }
  }, [isTimeUp, secondsRemaining, handleFinalSubmit]);

  // Keyboard Shortcuts Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if inside textarea/input (e.g. scratchpad)
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '1' || e.key === 'a' || e.key === 'A') {
        handleSelectOption('A');
      } else if (e.key === '2' || e.key === 'b' || e.key === 'B') {
        handleSelectOption('B');
      } else if (e.key === '3' || e.key === 'c' || e.key === 'C') {
        if (!e.ctrlKey && !e.metaKey) handleSelectOption('C');
      } else if (e.key === '4' || e.key === 'd' || e.key === 'D') {
        handleSelectOption('D');
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleSaveAndNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'm' || e.key === 'M') {
        handleMarkForReviewAndNext();
      } else if (e.key === 'x' || e.key === 'X') {
        handleClearResponse();
      } else if (e.key === '?') {
        setIsKeyboardHelpOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveAndNext, handlePrevious, handleSelectOption]);

  // Summary counts
  const summaryCounts = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let notVisited = 0;
    let markedForReview = 0;
    let answeredAndMarked = 0;

    test.questions.forEach((q) => {
      const st = questionStates[q.id]?.status || 'not_visited';
      if (st === 'answered') answered++;
      else if (st === 'not_answered') notAnswered++;
      else if (st === 'not_visited') notVisited++;
      else if (st === 'marked_for_review') markedForReview++;
      else if (st === 'answered_and_marked') answeredAndMarked++;
    });

    return { answered, notAnswered, notVisited, markedForReview, answeredAndMarked, total: test.questions.length };
  }, [test.questions, questionStates]);

  // Formatted Timer String
  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = secondsRemaining < 300; // < 5 mins
  const progressPercent = Math.round(((summaryCounts.answered + summaryCounts.answeredAndMarked) / Math.max(1, summaryCounts.total)) * 100);

  // Calculator Helper
  const handleCalcInput = (val: string) => {
    audioEngine.playOptionTap();
    if (val === 'C') {
      setCalcDisplay('0');
    } else if (val === 'DEL') {
      setCalcDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (val === '=') {
      try {
        // Safe evaluation of simple math expression
        const sanitized = calcDisplay.replace(/[^0-9+\-*/.%()]/g, '');
        const res = Function(`"use strict"; return (${sanitized})`)();
        setCalcDisplay(String(Number(res.toFixed(6))));
      } catch (e) {
        setCalcDisplay('Error');
      }
    } else if (val === 'sqrt') {
      try {
        const num = parseFloat(calcDisplay);
        if (num >= 0) setCalcDisplay(String(Math.sqrt(num).toFixed(4)));
        else setCalcDisplay('Error');
      } catch (e) {
        setCalcDisplay('Error');
      }
    } else {
      setCalcDisplay(prev => prev === '0' || prev === 'Error' ? val : prev + val);
    }
  };

  return (
    <div className={`fixed inset-0 z-[150] flex flex-col font-sans select-none overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-[#090714] text-slate-100' : 'bg-[#f4f6fb] text-slate-900'
    }`}>
      
      {/* 1. TOP CBT APP HEADER */}
      <header className={`px-3 sm:px-6 py-2.5 border-b flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-md ${
        isDarkMode ? 'bg-[#120d2a] border-[#2d2163]' : 'bg-white border-slate-200'
      }`}>
        {/* Left: Exit & Exam Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to pause/exit the examination? You can resume or view your attempt summary.')) {
                onExit();
              }
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0 border border-white/10"
            title="Exit CBT Player"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="bg-purple-600/25 text-purple-300 border border-purple-500/35 text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md truncate max-w-[130px] sm:max-w-none">
                {test.targetExam}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold hidden md:inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live CBT Engine</span>
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-black truncate max-w-[160px] sm:max-w-xs md:max-w-md mt-0.5 text-white">
              {test.title}
            </h2>
          </div>
        </div>

        {/* Center: Countdown Timer with Progress Ring */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl border font-mono font-black text-xs sm:text-base transition-all shadow-inner ${
            isLowTime 
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.35)]' 
              : isDarkMode
              ? 'bg-[#1a123e] border-[#3b2b7d] text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
              : 'bg-amber-50 border-amber-300 text-amber-800'
          }`}>
            <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLowTime ? 'text-rose-400 animate-spin' : 'text-amber-400'}`} />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          {/* Quick Progress Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-950/60 border border-purple-800/40 text-[10px] font-black text-purple-300">
            <span>Progress:</span>
            <span className="text-emerald-400">{progressPercent}%</span>
          </div>
        </div>

        {/* Right: Quick Tools, Language & Submit */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Audio Feedback Toggle */}
          <button
            onClick={() => {
              const res = audioEngine.toggleSound();
              setSoundEnabled(res);
            }}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer hidden sm:flex items-center justify-center ${
              soundEnabled ? 'bg-purple-600/20 border-purple-500/30 text-purple-300' : 'bg-white/5 border-white/10 text-slate-500'
            }`}
            title={soundEnabled ? 'Mute Sound' : 'Enable Tactile Tap Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Calculator Tool Toggle */}
          <button
            onClick={() => setIsCalculatorOpen(prev => !prev)}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
              isCalculatorOpen ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md' : 'bg-white/5 hover:bg-white/10 text-amber-300 border-amber-500/30'
            }`}
            title="Open CBT Scientific Calculator"
          >
            <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden lg:inline text-[11px]">Calc</span>
          </button>

          {/* Scratchpad Sheet Toggle */}
          <button
            onClick={() => setIsScratchpadOpen(prev => !prev)}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
              isScratchpadOpen ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md' : 'bg-white/5 hover:bg-white/10 text-cyan-300 border-cyan-500/30'
            }`}
            title="Open Rough Scratchpad Sheet"
          >
            <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden lg:inline text-[11px]">Rough Sheet</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer hidden md:flex items-center justify-center"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Examination Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Keyboard Shortcuts Help */}
          <button
            onClick={() => setIsKeyboardHelpOpen(prev => !prev)}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 border border-purple-500/20 transition-all cursor-pointer hidden lg:flex items-center justify-center"
            title="Keyboard Shortcuts Guide"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Submit Test CTA */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-[11px] sm:text-xs uppercase tracking-wider px-3 sm:px-4 py-2 rounded-xl shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit</span>
          </button>
        </div>
      </header>

      {/* 2. SECTION TABS BAR WITH CONTROLS */}
      <div className={`px-3 sm:px-6 py-2 border-b flex items-center justify-between gap-3 overflow-x-auto shrink-0 ${
        isDarkMode ? 'bg-[#0f0a24] border-[#22184d]' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Sections:
          </span>
          {test.sections.map((sec, idx) => {
            const isSelected = activeSectionIndex === idx;
            const secQuestions = test.questions.filter(q => q.sectionId === sec.id);
            const secAnswered = secQuestions.filter(q => questionStates[q.id]?.status === 'answered' || questionStates[q.id]?.status === 'answered_and_marked').length;

            return (
              <button
                key={sec.id}
                onClick={() => {
                  audioEngine.playButtonTap();
                  recordQuestionTime();
                  setActiveSectionIndex(idx);
                  setCurrentQuestionIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-black ring-2 ring-purple-400/50'
                    : isDarkMode
                    ? 'bg-[#18123a] text-slate-300 hover:bg-[#251d52] border border-[#2b2158]'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{sec.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  isSelected ? 'bg-purple-950 text-purple-200' : 'bg-slate-800 text-slate-300'
                }`}>
                  {secAnswered}/{sec.totalQuestions}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right side Language & Font Sizers */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-[11px] font-bold bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => { audioEngine.playOptionTap(); setSelectedLanguage('english'); }}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                selectedLanguage === 'english' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => { audioEngine.playOptionTap(); setSelectedLanguage('odia'); }}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                selectedLanguage === 'odia' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              ଓଡ଼ିଆ
            </button>
            <button
              onClick={() => { audioEngine.playOptionTap(); setSelectedLanguage('hindi'); }}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                selectedLanguage === 'hindi' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Font Controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 px-2 py-1 rounded-xl border border-white/10 text-[10px] font-black text-slate-300">
            <span>Font:</span>
            <button 
              onClick={() => setFontSizeLevel('normal')} 
              className={`px-1.5 py-0.5 rounded-lg ${fontSizeLevel === 'normal' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'}`}
            >
              A
            </button>
            <button 
              onClick={() => setFontSizeLevel('large')} 
              className={`px-1.5 py-0.5 rounded-lg ${fontSizeLevel === 'large' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'}`}
            >
              A+
            </button>
            <button 
              onClick={() => setFontSizeLevel('xlarge')} 
              className={`px-1.5 py-0.5 rounded-lg ${fontSizeLevel === 'xlarge' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'}`}
            >
              A++
            </button>
          </div>

          {/* Mobile Palette Trigger */}
          <button
            onClick={() => setIsMobilePaletteOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-purple-600/30 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-xl text-xs font-bold cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Palette ({summaryCounts.answered}/{summaryCounts.total})</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN DUAL-PANE BODY */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* LEFT PANE: QUESTION DISPLAY & CONTROLS */}
        <div className="flex-1 flex flex-col overflow-y-auto border-r border-[#21184d]/60 relative">
          
          {/* Question Meta Header Bar */}
          <div className={`px-4 sm:px-8 py-3 border-b flex items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#110c2e]/70 border-[#22184d]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-sm sm:text-base font-black text-purple-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>Question {currentQuestion?.questionNumber || (currentQuestionIndex + 1)}</span>
                <span className="text-xs text-slate-500 font-semibold">of {test.totalQuestions}</span>
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md font-extrabold border border-slate-700">
                {currentQuestion?.subject || activeSection.name}
              </span>
              {currentQuestion?.topic && (
                <span className="text-[10px] bg-purple-950/60 text-purple-300 px-2 py-0.5 rounded-md font-semibold border border-purple-800/40 hidden md:inline">
                  {currentQuestion.topic}
                </span>
              )}
            </div>

            {/* Marks Legend */}
            <div className="flex items-center gap-2 text-xs font-bold shrink-0">
              <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-lg text-[11px] font-black">
                +{currentQuestion?.positiveMarks || activeSection.positiveMarksPerQuestion} Marks
              </span>
              <span className="text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2 py-0.5 rounded-lg text-[11px] font-black">
                -{currentQuestion?.negativeMarks || activeSection.negativeMarksPerQuestion}
              </span>
            </div>
          </div>

          {/* Question Text & Options Canvas */}
          <div className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
            {currentQuestion ? (
              <div className="space-y-6 max-w-4xl">
                
                {/* Question Statement */}
                <div className={`font-semibold leading-relaxed ${
                  fontSizeLevel === 'large' ? 'text-lg sm:text-xl' : fontSizeLevel === 'xlarge' ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                }`}>
                  <p className="text-white whitespace-pre-line tracking-wide">
                    {selectedLanguage === 'odia' && currentQuestion.textOdia 
                      ? currentQuestion.textOdia 
                      : selectedLanguage === 'hindi' && currentQuestion.textHindi
                      ? currentQuestion.textHindi
                      : currentQuestion.text}
                  </p>
                </div>

                {/* Question Diagram / Image if present */}
                {currentQuestion.image && (
                  <div className="my-4 rounded-2xl overflow-hidden border border-purple-500/30 max-w-lg bg-black/40 p-2">
                    <img src={currentQuestion.image} alt="Question diagram" className="w-full h-auto object-contain rounded-xl" />
                  </div>
                )}

                {/* Options List */}
                <div className="space-y-3.5 pt-2">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = questionStates[currentQuestion.id]?.selectedOption === opt.id;
                    const optText = (selectedLanguage === 'odia' && opt.textOdia) 
                      ? opt.textOdia 
                      : (selectedLanguage === 'hindi' && opt.textHindi)
                      ? opt.textHindi
                      : opt.text;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 select-none ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-950 border-purple-400 shadow-[0_4px_25px_rgba(124,58,237,0.35)] text-white scale-[1.01] ring-2 ring-purple-400/40'
                            : isDarkMode
                            ? 'bg-[#130e30] border-[#291e5c] hover:border-purple-500/50 hover:bg-[#1a1340] text-slate-200'
                            : 'bg-white border-slate-300 hover:border-purple-400 text-slate-800'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center font-black text-xs shrink-0 transition-all ${
                          isSelected
                            ? 'bg-purple-500 border-purple-300 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                            : isDarkMode
                            ? 'border-slate-600 bg-slate-800 text-slate-300'
                            : 'border-slate-300 bg-slate-100 text-slate-700'
                        }`}>
                          {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : opt.id}
                        </div>
                        <div className={`flex-1 font-medium leading-relaxed self-center ${
                          fontSizeLevel === 'large' ? 'text-base sm:text-lg' : fontSizeLevel === 'xlarge' ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
                        }`}>
                          {optText}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 font-medium">No question found.</div>
            )}
          </div>

          {/* Bottom Action Footer Bar */}
          <div className={`p-3 sm:p-4 border-t flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg ${
            isDarkMode ? 'bg-[#100b2b] border-[#22184d]' : 'bg-white border-slate-200'
          }`}>
            {/* Left side actions: Review & Clear */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleMarkForReviewAndNext}
                className="bg-purple-600/20 hover:bg-purple-600/35 text-purple-300 border border-purple-500/40 text-xs font-bold px-3.5 sm:px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-sm"
              >
                <Bookmark className="w-3.5 h-3.5 text-purple-300" />
                <span className="hidden sm:inline">Mark for Review &amp; Next</span>
                <span className="sm:hidden">Mark Review</span>
              </button>

              <button
                onClick={handleClearResponse}
                className="bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-xs font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear Response</span>
                <span className="sm:hidden">Clear</span>
              </button>
            </div>

            {/* Right side navigation: Previous & Save & Next */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentQuestionIndex === 0 && activeSectionIndex === 0}
                onClick={handlePrevious}
                className="disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-bold px-3.5 sm:px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleSaveAndNext}
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-black uppercase tracking-wider px-5 sm:px-6 py-2.5 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-1.5"
              >
                <span>Save &amp; Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: QUESTION PALETTE & CANDIDATE STATS (Desktop) */}
        <div className={`hidden lg:flex w-80 border-t lg:border-t-0 flex-col shrink-0 overflow-y-auto ${
          isDarkMode ? 'bg-[#0d0922]' : 'bg-slate-50'
        }`}>
          {/* Candidate Card */}
          <div className="p-4 border-b border-[#21184d] flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 border border-purple-400/50 flex items-center justify-center font-black text-white text-sm shrink-0 shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-white truncate">{userName}</p>
              <p className="text-[10px] text-slate-400 font-semibold">Candidate • {userState}</p>
            </div>
          </div>

          {/* Legend Grid */}
          <div className="p-4 border-b border-[#21184d] space-y-2 text-[10px] font-bold">
            <span className="text-slate-400 uppercase tracking-wider text-[9px] block">Status Legend:</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-[10px] shadow-sm">
                  {summaryCounts.answered}
                </span>
                <span className="text-slate-300 truncate">Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-rose-500 text-white font-black flex items-center justify-center text-[10px] shadow-sm">
                  {summaryCounts.notAnswered}
                </span>
                <span className="text-slate-300 truncate">Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-purple-500 text-white font-black flex items-center justify-center text-[10px] shadow-sm">
                  {summaryCounts.markedForReview}
                </span>
                <span className="text-slate-300 truncate">Marked Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-slate-700 text-slate-300 font-black flex items-center justify-center text-[10px]">
                  {summaryCounts.notVisited}
                </span>
                <span className="text-slate-300 truncate">Not Visited</span>
              </div>
            </div>
          </div>

          {/* Question Palette Grid */}
          <div className="p-4 flex-1 overflow-y-auto">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-purple-300 mb-3 flex items-center justify-between">
              <span>{activeSection.name}</span>
              <span className="text-slate-400 font-mono text-[10px]">
                {sectionQuestions.length} Questions
              </span>
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {sectionQuestions.map((q, qIdx) => {
                const st = questionStates[q.id]?.status || 'not_visited';
                const isCurrent = currentQuestionIndex === qIdx;

                let colorClasses = 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700';
                if (st === 'answered') {
                  colorClasses = 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-sm';
                } else if (st === 'not_answered') {
                  colorClasses = 'bg-rose-500 border-rose-400 text-white font-black';
                } else if (st === 'marked_for_review') {
                  colorClasses = 'bg-purple-600 border-purple-400 text-white font-black';
                } else if (st === 'answered_and_marked') {
                  colorClasses = 'bg-purple-600 border-emerald-400 text-white font-black relative ring-2 ring-emerald-400';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(activeSectionIndex, qIdx)}
                    className={`h-9 rounded-xl border flex items-center justify-center text-xs font-black transition-all cursor-pointer hover:scale-105 active:scale-95 ${colorClasses} ${
                      isCurrent ? 'ring-2 ring-white scale-105 shadow-md' : ''
                    }`}
                  >
                    {q.questionNumber || (qIdx + 1)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Submit Test Footer in Palette */}
          <div className="p-4 border-t border-[#21184d] bg-[#0c081e]">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
            >
              Submit Examination ({summaryCounts.answered}/{summaryCounts.total})
            </button>
          </div>
        </div>

      </div>

      {/* 4. MOBILE DRAWER QUESTION PALETTE */}
      {isMobilePaletteOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden bg-slate-950/80 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-[#120d2a] border-t-2 border-purple-500/50 rounded-t-3xl p-5 max-h-[80vh] flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-[#2d2163] pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-black text-white">Question Palette</h3>
              </div>
              <button
                onClick={() => setIsMobilePaletteOpen(false)}
                className="p-1 rounded-lg bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
              <div className="bg-emerald-500/20 text-emerald-300 p-2 rounded-xl border border-emerald-500/30">
                <div className="font-black text-base">{summaryCounts.answered}</div>
                <div>Answered</div>
              </div>
              <div className="bg-rose-500/20 text-rose-300 p-2 rounded-xl border border-rose-500/30">
                <div className="font-black text-base">{summaryCounts.notAnswered}</div>
                <div>Unanswered</div>
              </div>
              <div className="bg-purple-500/20 text-purple-300 p-2 rounded-xl border border-purple-500/30">
                <div className="font-black text-base">{summaryCounts.markedForReview}</div>
                <div>Review</div>
              </div>
              <div className="bg-slate-800 text-slate-300 p-2 rounded-xl border border-slate-700">
                <div className="font-black text-base">{summaryCounts.notVisited}</div>
                <div>Not Visited</div>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="flex-1 overflow-y-auto max-h-60 pr-1">
              <div className="grid grid-cols-6 gap-2">
                {sectionQuestions.map((q, qIdx) => {
                  const st = questionStates[q.id]?.status || 'not_visited';
                  const isCurrent = currentQuestionIndex === qIdx;

                  let colorClasses = 'bg-slate-800 border-slate-700 text-slate-400';
                  if (st === 'answered') colorClasses = 'bg-emerald-500 border-emerald-400 text-slate-950 font-black';
                  else if (st === 'not_answered') colorClasses = 'bg-rose-500 border-rose-400 text-white font-black';
                  else if (st === 'marked_for_review') colorClasses = 'bg-purple-600 border-purple-400 text-white font-black';

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(activeSectionIndex, qIdx)}
                      className={`h-10 rounded-xl border flex items-center justify-center text-xs font-black transition-all cursor-pointer ${colorClasses} ${
                        isCurrent ? 'ring-2 ring-white scale-105' : ''
                      }`}
                    >
                      {q.questionNumber || (qIdx + 1)}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                setIsMobilePaletteOpen(false);
                setIsSubmitModalOpen(true);
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase py-3 rounded-xl shadow-md"
            >
              Submit Examination ({summaryCounts.answered}/{summaryCounts.total})
            </button>
          </div>
        </div>
      )}

      {/* 5. CBT SCIENTIFIC CALCULATOR MODAL */}
      {isCalculatorOpen && (
        <div className="fixed bottom-16 right-4 sm:right-8 z-[200] w-72 sm:w-80 bg-[#120d2a] border-2 border-amber-500/50 rounded-3xl p-4 shadow-2xl space-y-3 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-[#2d2163] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
              <Calculator className="w-4 h-4" />
              <span>Standard CBT Calculator</span>
            </div>
            <button
              onClick={() => setIsCalculatorOpen(false)}
              className="p-1 rounded-lg bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Calculator Screen */}
          <div className="bg-[#090618] border border-[#2b2158] rounded-xl p-3 text-right font-mono font-black text-xl text-amber-300 overflow-x-auto">
            {calcDisplay}
          </div>

          {/* Calc Buttons */}
          <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
            {['C', 'DEL', 'sqrt', '/'].map(btn => (
              <button
                key={btn}
                onClick={() => handleCalcInput(btn)}
                className="p-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-800/50 text-purple-200 cursor-pointer active:scale-95 font-mono"
              >
                {btn}
              </button>
            ))}
            {['7', '8', '9', '*'].map(btn => (
              <button
                key={btn}
                onClick={() => handleCalcInput(btn)}
                className={`p-2.5 rounded-xl border cursor-pointer active:scale-95 font-mono ${
                  btn === '*' ? 'bg-purple-950/80 border-purple-800/50 text-purple-200' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                }`}
              >
                {btn}
              </button>
            ))}
            {['4', '5', '6', '-'].map(btn => (
              <button
                key={btn}
                onClick={() => handleCalcInput(btn)}
                className={`p-2.5 rounded-xl border cursor-pointer active:scale-95 font-mono ${
                  btn === '-' ? 'bg-purple-950/80 border-purple-800/50 text-purple-200' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                }`}
              >
                {btn}
              </button>
            ))}
            {['1', '2', '3', '+'].map(btn => (
              <button
                key={btn}
                onClick={() => handleCalcInput(btn)}
                className={`p-2.5 rounded-xl border cursor-pointer active:scale-95 font-mono ${
                  btn === '+' ? 'bg-purple-950/80 border-purple-800/50 text-purple-200' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                }`}
              >
                {btn}
              </button>
            ))}
            {['0', '.', '%', '='].map(btn => (
              <button
                key={btn}
                onClick={() => handleCalcInput(btn)}
                className={`p-2.5 rounded-xl border cursor-pointer active:scale-95 font-mono ${
                  btn === '=' ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black border-amber-400' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. ROUGH SCRATCHPAD SHEET MODAL */}
      {isScratchpadOpen && (
        <div className="fixed bottom-16 left-4 sm:left-8 z-[200] w-80 sm:w-96 bg-[#120d2a] border-2 border-cyan-500/50 rounded-3xl p-4 shadow-2xl space-y-3 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-[#2d2163] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-cyan-300">
              <Edit3 className="w-4 h-4" />
              <span>Rough Working Scratchpad</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setScratchpadText('')}
                className="p-1 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300"
                title="Clear Notes"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsScratchpadOpen(false)}
                className="p-1 rounded-lg bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            value={scratchpadText}
            onChange={(e) => setScratchpadText(e.target.value)}
            placeholder="Type rough calculations, formulas, elimination notes here..."
            className="w-full h-48 bg-[#080516] border border-[#2d2158] rounded-xl p-3 text-xs text-cyan-200 font-mono focus:outline-none focus:border-cyan-400 resize-none"
          />
          <div className="text-[9px] text-slate-400 text-right">
            Scratchpad notes are strictly private and preserved during this session.
          </div>
        </div>
      )}

      {/* 7. KEYBOARD SHORTCUTS MODAL */}
      {isKeyboardHelpOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#120d2a] border-2 border-purple-500/50 rounded-3xl max-w-md w-full p-6 space-y-4 text-white shadow-2xl animate-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between border-b border-[#2d2163] pb-3">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-black">CBT Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={() => setIsKeyboardHelpOpen(false)}
                className="p-1 rounded-lg bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-300">Select Option A, B, C, D</span>
                <span className="font-mono font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-800 text-purple-200">1, 2, 3, 4 or A, B, C, D</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-300">Save &amp; Next</span>
                <span className="font-mono font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-800 text-purple-200">Right Arrow / Enter</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-300">Previous Question</span>
                <span className="font-mono font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-800 text-purple-200">Left Arrow</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-300">Mark for Review &amp; Next</span>
                <span className="font-mono font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-800 text-purple-200">M</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-300">Clear Current Selection</span>
                <span className="font-mono font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-800 text-purple-200">X</span>
              </div>
            </div>

            <button
              onClick={() => setIsKeyboardHelpOpen(false)}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase py-2.5 rounded-xl"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* 8. SUBMISSION CONFIRMATION MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#120d2a] border-2 border-purple-500/50 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-left text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-[#2d2163] pb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black">Confirm Examination Submission</h3>
                <p className="text-xs text-slate-400 font-semibold truncate max-w-xs sm:max-w-sm">{test.title}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Review your response summary before final evaluation. Once submitted, your all-India percentile, subject breakdown, and AI diagnostic report will be instantly calculated.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl text-center">
                  <span className="text-xs text-emerald-300 block font-bold">Answered</span>
                  <span className="text-xl font-black text-emerald-400">{summaryCounts.answered}</span>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-2xl text-center">
                  <span className="text-xs text-rose-300 block font-bold">Unanswered</span>
                  <span className="text-xl font-black text-rose-400">{summaryCounts.notAnswered}</span>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-2xl text-center">
                  <span className="text-xs text-purple-300 block font-bold">Marked</span>
                  <span className="text-xl font-black text-purple-400">{summaryCounts.markedForReview}</span>
                </div>
                <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-2xl text-center">
                  <span className="text-xs text-slate-400 block font-bold">Not Visited</span>
                  <span className="text-xl font-black text-slate-200">{summaryCounts.notVisited}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Return to Test
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                Confirm &amp; View Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
