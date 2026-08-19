import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Clock, AlertTriangle, ChevronLeft, ChevronRight, CheckCircle2, 
  HelpCircle, RotateCcw, Bookmark, Send, Eye, ShieldCheck, Flag,
  Maximize2, Minimize2, ZoomIn, ZoomOut, User, Award, ArrowLeft
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
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

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

  // Timer Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
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

  // Auto-submit when time expires
  useEffect(() => {
    if (isTimeUp && secondsRemaining === 0) {
      handleFinalSubmit();
    }
  }, [isTimeUp, secondsRemaining]);

  // Update time spent when switching question
  const recordQuestionTime = () => {
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
  };

  // Option selection
  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
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
  const handleSaveAndNext = () => {
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
  };

  // Jump to specific question
  const handleJumpToQuestion = (sectionIdx: number, qIdx: number) => {
    recordQuestionTime();
    setActiveSectionIndex(sectionIdx);
    setCurrentQuestionIndex(qIdx);
  };

  // Final submission calculation
  const handleFinalSubmit = () => {
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
  };

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

  return (
    <div className={`fixed inset-0 z-[150] flex flex-col font-sans select-none overflow-hidden ${
      isDarkMode ? 'bg-[#090714] text-slate-100' : 'bg-[#f4f6fb] text-slate-900'
    }`}>
      {/* 1. TOP CBT APP HEADER */}
      <header className={`px-4 py-2.5 border-b flex items-center justify-between gap-4 shrink-0 shadow-md ${
        isDarkMode ? 'bg-[#120d2a] border-[#2d2163]' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to exit the exam? Your current progress will be paused.')) {
                onExit();
              }
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Exit CBT Player"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-600/20 text-purple-300 border border-purple-500/30 text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
                {test.targetExam}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">
                ● Live CBT Session
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-black truncate max-w-[280px] sm:max-w-md mt-0.5">
              {test.title}
            </h2>
          </div>
        </div>

        {/* Center: Countdown Timer */}
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-black text-sm sm:text-base transition-all shadow-inner ${
          isLowTime 
            ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
            : isDarkMode
            ? 'bg-[#1c1542] border-[#3b2c80] text-amber-300'
            : 'bg-amber-50 border-amber-300 text-amber-800'
        }`}>
          <Clock className={`w-4 h-4 ${isLowTime ? 'text-rose-400 animate-spin' : 'text-amber-400'}`} />
          <span>{formatTimer(secondsRemaining)}</span>
        </div>

        {/* Right: Candidate Profile & Submit */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-1 text-[11px] font-bold bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setSelectedLanguage('english')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                selectedLanguage === 'english' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setSelectedLanguage('odia')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                selectedLanguage === 'odia' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ଓଡ଼ିଆ
            </button>
            <button
              onClick={() => setSelectedLanguage('hindi')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                selectedLanguage === 'hindi' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Font Resizing Controls */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/10 text-[10px] font-black text-slate-300">
            <span>Font:</span>
            <button 
              onClick={() => setFontSizeLevel('normal')} 
              className={`px-1.5 py-0.5 rounded ${fontSizeLevel === 'normal' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'}`}
            >
              A
            </button>
            <button 
              onClick={() => setFontSizeLevel('large')} 
              className={`px-1.5 py-0.5 rounded ${fontSizeLevel === 'large' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'}`}
            >
              A+
            </button>
            <button 
              onClick={() => setFontSizeLevel('xlarge')} 
              className={`px-1.5 py-0.5 rounded ${fontSizeLevel === 'xlarge' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'}`}
            >
              A++
            </button>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* 2. SECTION TABS BAR */}
      <div className={`px-4 py-2 border-b flex items-center gap-2 overflow-x-auto shrink-0 ${
        isDarkMode ? 'bg-[#0f0a24] border-[#22184d]' : 'bg-slate-100 border-slate-200'
      }`}>
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
                recordQuestionTime();
                setActiveSectionIndex(idx);
                setCurrentQuestionIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-md'
                  : isDarkMode
                  ? 'bg-[#18123a] text-slate-300 hover:bg-[#251d52]'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{sec.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                isSelected ? 'bg-purple-800 text-purple-200' : 'bg-slate-700/50 text-slate-300'
              }`}>
                {secAnswered}/{sec.totalQuestions}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. MAIN DUAL-PANE BODY */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT PANE: QUESTION DISPLAY & CONTROLS */}
        <div className="flex-1 flex flex-col overflow-y-auto border-r border-[#21184d]/60">
          
          {/* Question Meta Bar */}
          <div className={`px-6 py-3 border-b flex items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#110c2e]/60 border-[#22184d]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-purple-400">
                Question {currentQuestion?.questionNumber || (currentQuestionIndex + 1)} of {test.totalQuestions}
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-extrabold border border-slate-700">
                Subject: {currentQuestion?.subject || activeSection.name}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px]">
                +{currentQuestion?.positiveMarks || activeSection.positiveMarksPerQuestion} Marks
              </span>
              <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded text-[11px]">
                -{currentQuestion?.negativeMarks || activeSection.negativeMarksPerQuestion} Marks
              </span>
            </div>
          </div>

          {/* Question Text & Options Canvas */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {currentQuestion ? (
              <div className="space-y-6 max-w-4xl">
                {/* Question Text */}
                <div className={`font-semibold leading-relaxed ${
                  fontSizeLevel === 'large' ? 'text-lg' : fontSizeLevel === 'xlarge' ? 'text-xl' : 'text-base'
                }`}>
                  <p className="text-white whitespace-pre-line">
                    {selectedLanguage === 'odia' && currentQuestion.textOdia 
                      ? currentQuestion.textOdia 
                      : selectedLanguage === 'hindi' && currentQuestion.textHindi
                      ? currentQuestion.textHindi
                      : currentQuestion.text}
                  </p>
                </div>

                {/* Question Image if present */}
                {currentQuestion.image && (
                  <div className="my-4 rounded-xl overflow-hidden border border-purple-500/30 max-w-lg">
                    <img src={currentQuestion.image} alt="Question diagram" className="w-full h-auto object-contain" />
                  </div>
                )}

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQuestion.options.map((opt) => {
                    const currentSelected = questionStates[currentQuestion.id]?.selectedOption === opt.id;
                    const optText = (selectedLanguage === 'odia' && opt.textOdia) 
                      ? opt.textOdia 
                      : (selectedLanguage === 'hindi' && opt.textHindi)
                      ? opt.textHindi
                      : opt.text;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                          currentSelected
                            ? 'bg-gradient-to-r from-purple-900/90 to-indigo-900/90 border-purple-400 shadow-[0_4px_20px_rgba(124,58,237,0.25)] text-white'
                            : isDarkMode
                            ? 'bg-[#130e30] border-[#281c57] hover:border-purple-500/50 hover:bg-[#1a1340] text-slate-200'
                            : 'bg-white border-slate-300 hover:border-purple-400 text-slate-800'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-xl border flex items-center justify-center font-black text-xs shrink-0 mt-0.5 transition-all ${
                          currentSelected
                            ? 'bg-purple-500 border-purple-300 text-white shadow-md'
                            : isDarkMode
                            ? 'border-slate-600 bg-slate-800 text-slate-300'
                            : 'border-slate-300 bg-slate-100 text-slate-700'
                        }`}>
                          {opt.id}
                        </div>
                        <div className={`flex-1 font-medium leading-relaxed ${
                          fontSizeLevel === 'large' ? 'text-base' : fontSizeLevel === 'xlarge' ? 'text-lg' : 'text-sm'
                        }`}>
                          {optText}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">No question selected.</div>
            )}
          </div>

          {/* Bottom Action Footer Bar */}
          <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 shrink-0 ${
            isDarkMode ? 'bg-[#100b2b] border-[#22184d]' : 'bg-white border-slate-200'
          }`}>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleMarkForReviewAndNext}
                className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Mark for Review & Next</span>
              </button>

              <button
                onClick={handleClearResponse}
                className="bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentQuestionIndex === 0 && activeSectionIndex === 0}
                onClick={() => {
                  recordQuestionTime();
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(prev => prev - 1);
                  } else if (activeSectionIndex > 0) {
                    setActiveSectionIndex(prev => prev - 1);
                    const prevSecQs = test.questions.filter(q => q.sectionId === test.sections[activeSectionIndex - 1].id);
                    setCurrentQuestionIndex(prevSecQs.length - 1);
                  }
                }}
                className="disabled:opacity-40 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleSaveAndNext}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-1"
              >
                <span>Save &amp; Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: QUESTION PALETTE & CANDIDATE STATS */}
        <div className={`w-full lg:w-80 border-t lg:border-t-0 flex flex-col shrink-0 overflow-y-auto ${
          isDarkMode ? 'bg-[#0d0922]' : 'bg-slate-50'
        }`}>
          {/* Candidate Card */}
          <div className="p-4 border-b border-[#21184d] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-400/50 flex items-center justify-center font-black text-purple-300 text-sm shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-white truncate">{userName}</p>
              <p className="text-[10px] text-slate-400">Candidate State: {userState}</p>
            </div>
          </div>

          {/* Legend Grid */}
          <div className="p-4 border-b border-[#21184d] space-y-2 text-[10px] font-bold">
            <span className="text-slate-400 uppercase tracking-wider text-[9px] block">Status Legend:</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-[9px]">
                  {summaryCounts.answered}
                </span>
                <span className="text-slate-300 truncate">Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-rose-500 text-white font-black flex items-center justify-center text-[9px]">
                  {summaryCounts.notAnswered}
                </span>
                <span className="text-slate-300 truncate">Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-purple-500 text-white font-black flex items-center justify-center text-[9px]">
                  {summaryCounts.markedForReview}
                </span>
                <span className="text-slate-300 truncate">Marked Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-slate-700 text-slate-300 font-black flex items-center justify-center text-[9px]">
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

                let colorClasses = 'bg-slate-800 border-slate-700 text-slate-400';
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
                      isCurrent ? 'ring-2 ring-white scale-105' : ''
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

      {/* 4. SUBMISSION CONFIRMATION MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#120d2a] border-2 border-purple-500/50 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-left text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-[#2d2163] pb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black">Confirm Examination Submission</h3>
                <p className="text-xs text-slate-400 font-semibold">{test.title}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Review your response summary before final evaluation. Once submitted, your all-India percentile, subject breakdown, and AI diagnostic report will be instantly calculated.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-center">
                  <span className="text-xs text-emerald-300 block font-bold">Answered</span>
                  <span className="text-lg font-black text-emerald-400">{summaryCounts.answered}</span>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-center">
                  <span className="text-xs text-rose-300 block font-bold">Unanswered</span>
                  <span className="text-lg font-black text-rose-400">{summaryCounts.notAnswered}</span>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-xl text-center">
                  <span className="text-xs text-purple-300 block font-bold">Marked</span>
                  <span className="text-lg font-black text-purple-400">{summaryCounts.markedForReview}</span>
                </div>
                <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl text-center">
                  <span className="text-xs text-slate-400 block font-bold">Not Visited</span>
                  <span className="text-lg font-black text-slate-200">{summaryCounts.notVisited}</span>
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
