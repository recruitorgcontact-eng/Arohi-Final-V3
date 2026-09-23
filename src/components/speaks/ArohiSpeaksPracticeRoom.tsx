import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Send,
  HelpCircle,
  Eye,
  EyeOff,
  Languages,
  Award,
  Zap,
  Flame,
  ChevronLeft
} from 'lucide-react';
import { RoadmapLesson, SpeaksLanguage, SpeakingArena } from './speaksData';

export interface EvaluationResult {
  isCorrect: boolean;
  score: number;
  whatYouSaid: string;
  correctedSentence: string;
  vernacularExplanation: string;
  encouragement: string;
  nextArohiMessage?: string;
}

interface ArohiSpeaksPracticeRoomProps {
  lesson?: RoadmapLesson;
  arena?: SpeakingArena;
  motherTongue: SpeaksLanguage;
  snailMode: boolean;
  onToggleSnailMode: () => void;
  onFinishLesson: (score: number) => void;
  onExit: () => void;
  isDarkMode?: boolean;
}

export default function ArohiSpeaksPracticeRoom({
  lesson,
  arena,
  motherTongue,
  snailMode,
  onToggleSnailMode,
  onFinishLesson,
  onExit,
  isDarkMode = true
}: ArohiSpeaksPracticeRoomProps) {
  // Current dialogue step
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingArohi, setIsSpeakingArohi] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Correction evaluation state
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [hasTriedAgain, setHasTriedAgain] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [recordedExchanges, setRecordedExchanges] = useState<number>(0);

  // Speech recognition ref
  const recognitionRef = useRef<any>(null);

  // Current prompt details (from lesson or arena)
  const currentPrompt = lesson
    ? lesson.arohiPrompt
    : arena
    ? arena.arohiFirstMessage
    : 'Hello! I am ready to practice speaking with you.';

  const currentTranslation = lesson?.arohiPromptTranslation[motherTongue.code]
    || lesson?.arohiPromptTranslation['hi']
    || arena?.arohiFirstMessageTranslation[motherTongue.code]
    || arena?.arohiFirstMessageTranslation['hi']
    || '';

  const scenarioName = lesson ? `Day ${lesson.day} • ${lesson.title}` : arena ? arena.title : 'Live Speaking Arena';

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian-English optimized

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    // Auto-speak Arohi prompt on mount
    playArohiVoice(currentPrompt, snailMode ? 0.75 : 1.0);

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentPrompt]);

  // Voice playback
  const playArohiVoice = (text: string, rate: number = 1.0) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1.05;

    // Pick female or pleasant voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        (v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')) &&
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Female'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeakingArohi(true);
    utterance.onend = () => setIsSpeakingArohi(false);
    utterance.onerror = () => setIsSpeakingArohi(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleToggleListen = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          setUserInput('');
          recognitionRef.current.start();
        } catch (e) {
          console.warn('Failed to start recognition, retrying:', e);
          setIsListening(false);
        }
      } else {
        alert('Voice recognition is not supported in this browser. Please type your response below!');
      }
    }
  };

  // Evaluate user response (via server or robust fallback)
  const handleSubmitResponse = async () => {
    if (!userInput.trim()) return;

    setIsEvaluating(true);

    try {
      // Call backend evaluation endpoint
      const res = await fetch('/api/speaks/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSentence: userInput.trim(),
          contextPrompt: currentPrompt,
          motherTongueCode: motherTongue.code,
          expectedHint: lesson?.expectedAnswerHint || '',
          sampleGoodAnswer: lesson?.sampleGoodAnswer || ''
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluation(data);
        setTotalScore((prev) => prev + (data.score || 85));
        setRecordedExchanges((prev) => prev + 1);
      } else {
        throw new Error('Fallback to local evaluation');
      }
    } catch (e) {
      // Robust offline fallback based on common mistakes data
      const cleanUser = userInput.trim();
      const lower = cleanUser.toLowerCase();

      let isCorrect = true;
      let score = 90;
      let correctedSentence = cleanUser;
      let vernacularExplanation = 'आपका वाक्य बहुत अच्छा और स्वाभाविक है! इसी तरह बिना झिझक अभ्यास करते रहें।';

      if (lesson?.commonMistake) {
        const wrongLower = lesson.commonMistake.wrong.toLowerCase();
        // Check if user made the common mistake or similar pattern
        if (
          lower.includes('myself ') ||
          lower.includes('i am agree') ||
          lower.includes('give me ') ||
          lower.includes('peoples') ||
          lower.includes('did not went') ||
          lower.includes('will going') ||
          lower.includes('according to me')
        ) {
          isCorrect = false;
          score = 65;
          correctedSentence = lesson.commonMistake.right;
          vernacularExplanation =
            lesson.commonMistake.explanation[motherTongue.code] ||
            lesson.commonMistake.explanation['hi'] ||
            'Notice the natural phrasing. Practice saying it aloud!';
        } else {
          // Capitalize first letter and check period
          correctedSentence = cleanUser.charAt(0).toUpperCase() + cleanUser.slice(1);
          if (!correctedSentence.endsWith('.') && !correctedSentence.endsWith('!') && !correctedSentence.endsWith('?')) {
            correctedSentence += '.';
          }
        }
      }

      const evalData: EvaluationResult = {
        isCorrect,
        score,
        whatYouSaid: cleanUser,
        correctedSentence,
        vernacularExplanation,
        encouragement: isCorrect ? 'Superb! You spoke with clarity!' : 'Good effort! Notice the small difference below:'
      };

      setEvaluation(evalData);
      setTotalScore((prev) => prev + score);
      setRecordedExchanges((prev) => prev + 1);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRetrySpeaking = () => {
    setUserInput('');
    setEvaluation(null);
    setHasTriedAgain(true);
    handleToggleListen();
  };

  const handleNextStep = () => {
    setEvaluation(null);
    setUserInput('');
    setHasTriedAgain(false);

    // If it's a 1-2 step lesson, mark as finished
    setLessonCompleted(true);
  };

  return (
    <div className={`min-h-[82vh] flex flex-col justify-between max-w-2xl mx-auto px-4 py-4 select-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Bar Navigation & Controls */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
          <button
            onClick={onExit}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Roadmap</span>
          </button>

          {/* Snail Mode Toggle */}
          <button
            onClick={onToggleSnailMode}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              snailMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/30'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
            }`}
          >
            <span>🐌</span>
            <span>Snail Mode (0.75x)</span>
            <span className={`w-2 h-2 rounded-full ${snailMode ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'}`}></span>
          </button>

          {/* Mother Tongue Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
            <span>{motherTongue.flag}</span>
            <span>{motherTongue.name}</span>
          </div>
        </div>

        {/* Lesson Breadcrumb */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-purple-300">{scenarioName}</span>
          {lesson && (
            <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold text-[10px]">
              {lesson.estimatedMinutes} mins practice
            </span>
          )}
        </div>

        {/* Lesson Completed Celebration View */}
        {lessonCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/70 to-indigo-950/80 border border-purple-500/30 shadow-2xl text-center space-y-4 my-8"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-purple-600 p-1 flex items-center justify-center shadow-xl shadow-purple-600/30">
              <div className="w-full h-full bg-[#0e101d] rounded-[22px] flex items-center justify-center text-4xl">
                🏆
              </div>
            </div>

            <div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Practice Completed
              </span>
              <h3 className="text-2xl font-black text-white mt-2">Magnificent Effort!</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                You spoke without fear and earned today's fluency points! Consistency is your superpower.
              </p>
            </div>

            {/* Score summary */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-around">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Fluency Score</span>
                <span className="text-2xl font-black text-emerald-400">+{totalScore || 88} pts</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Daily Streak</span>
                <span className="text-2xl font-black text-amber-400 flex items-center gap-1 justify-center">
                  <Flame className="w-5 h-5 fill-amber-400" />
                  <span>1 Day</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => onFinishLesson(totalScore || 88)}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider py-4 rounded-2xl shadow-lg shadow-emerald-600/30 cursor-pointer transition-all hover:scale-[1.01] active:scale-95"
            >
              Collect Rewards & Return to Roadmap 🌟
            </button>
          </motion.div>
        ) : (
          /* Main Interactive Conversation Arena */
          <div className="mt-4 space-y-4">
            {/* Arohi Persona Dialogue Box */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border border-purple-500/30 shadow-lg relative overflow-hidden">
              {/* Header with Arohi tag & Voice replay button */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 p-0.5 shadow-md">
                      <div className="w-full h-full bg-[#121629] rounded-[14px] flex items-center justify-center text-lg">
                        👩🏽‍💼
                      </div>
                    </div>
                    {isSpeakingArohi && (
                      <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500"></span>
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sm text-white">Arohi</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Language Coach
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">Listening with 100% empathy</span>
                  </div>
                </div>

                {/* Voice Replay Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => playArohiVoice(currentPrompt, 1.0)}
                    title="Play regular speed (1.0x)"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-purple-400" />
                  </button>
                  <button
                    onClick={() => playArohiVoice(currentPrompt, 0.75)}
                    title="Play slow speed in Snail Mode (0.75x)"
                    className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors cursor-pointer text-xs font-bold flex items-center gap-0.5"
                  >
                    <span>🐌</span>
                    <span>0.75x</span>
                  </button>
                </div>
              </div>

              {/* Prompt Text in English */}
              <p className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
                "{currentPrompt}"
              </p>

              {/* Translation Toggle & Text */}
              {currentTranslation && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 font-semibold cursor-pointer"
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span>{showTranslation ? 'Hide Translation' : `${motherTongue.nativeName} में देखें (Translate)`}</span>
                  </button>

                  <AnimatePresence>
                    {showTranslation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-xs text-slate-300 italic bg-black/20 p-2.5 rounded-xl border border-white/5"
                      >
                        {currentTranslation}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Hint Dropdown */}
            {lesson?.expectedAnswerHint && (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showHint ? 'Hide Hint' : 'Need an idea of what to say? (Hint)'}</span>
                </button>
              </div>
            )}

            {showHint && lesson?.expectedAnswerHint && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200"
              >
                <span className="font-bold">💡 Hint: </span>
                <span>{lesson.expectedAnswerHint}</span>
              </motion.div>
            )}

            {/* THE FLAGSHIP "SAHI SENTENCE DEKHEIN" CORRECTION CARD */}
            <AnimatePresence>
              {evaluation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#14182b] to-[#0d1020] p-4 sm:p-5 shadow-2xl space-y-4"
                >
                  {/* Banner Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                        ✨
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">
                          Sahi Sentence Dekhein
                        </h4>
                        <span className="text-[10px] text-purple-300 font-medium">Check Correct Sentence</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{evaluation.score}% Accuracy</span>
                    </div>
                  </div>

                  {/* 1. What You Said (Red/Amber) */}
                  <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">
                      What you said:
                    </span>
                    <p className="text-sm font-semibold text-rose-200">
                      "{evaluation.whatYouSaid}"
                    </p>
                  </div>

                  {/* 2. Corrected Natural Sentence (Emerald) with Audio */}
                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                        Natural & Correct Sentence:
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => playArohiVoice(evaluation.correctedSentence, 1.0)}
                          title="Listen at normal speed"
                          className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => playArohiVoice(evaluation.correctedSentence, 0.75)}
                          title="Listen slowly (Snail Mode 0.75x)"
                          className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold cursor-pointer flex items-center gap-0.5"
                        >
                          <span>🐌</span>
                          <span>Slow</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-base font-black text-emerald-300 leading-snug">
                      "{evaluation.correctedSentence}"
                    </p>
                  </div>

                  {/* 3. Vernacular Explanation ("Arohi Samjha Rahi Hai") */}
                  <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                      <span>💡</span>
                      <span>Arohi Samjha Rahi Hai ({motherTongue.name}):</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {evaluation.vernacularExplanation}
                    </p>
                  </div>

                  {/* Micro-Loop Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <button
                      onClick={handleRetrySpeaking}
                      className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try Saying Again</span>
                    </button>

                    <button
                      onClick={handleNextStep}
                      className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom Microphone & Text Input Dock (when not finished and not evaluating) */}
      {!lessonCompleted && !evaluation && (
        <div className="pt-4 border-t border-white/10 mt-4 space-y-3">
          {/* Live Transcript / Input preview */}
          {userInput && (
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-200 italic font-medium">"{userInput}"</span>
              <button
                onClick={() => setUserInput('')}
                className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer underline shrink-0"
              >
                Clear
              </button>
            </div>
          )}

          {/* Interactive Mic Trigger Section */}
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <button
              onClick={handleToggleListen}
              className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl relative ${
                isListening
                  ? 'bg-rose-500 text-white shadow-rose-500/50 scale-110 animate-pulse'
                  : 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-600 hover:scale-105 text-white shadow-purple-600/40'
              }`}
            >
              {isListening ? (
                <>
                  <span className="absolute -inset-2 rounded-full border-2 border-rose-400 animate-ping opacity-60"></span>
                  <MicOff className="w-8 h-8" />
                </>
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              {isListening ? 'Listening to your voice... (Tap to finish)' : 'Tap to Speak in English'}
            </span>
          </div>

          {/* Keyboard input fallback */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitResponse()}
              placeholder="Or type what you want to say in English..."
              className="flex-1 bg-white/[0.04] border border-white/10 focus:border-purple-400 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              disabled={!userInput.trim() || isEvaluating}
              onClick={handleSubmitResponse}
              className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white font-bold text-xs cursor-pointer transition-all shrink-0 flex items-center gap-1.5"
            >
              {isEvaluating ? (
                <span className="animate-spin text-sm">⏳</span>
              ) : (
                <>
                  <span>Check</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
