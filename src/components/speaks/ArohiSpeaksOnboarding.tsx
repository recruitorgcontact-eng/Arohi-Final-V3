import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Heart,
  Volume2,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';
import {
  MOTHER_TONGUES,
  STICKING_POINTS,
  SPEAKING_GOALS,
  PROFICIENCY_LEVELS,
  DAILY_COMMITMENTS,
  SpeaksLanguage,
  StickingPointOption,
  GoalOption,
  ProficiencyLevel,
  DailyCommitment
} from './speaksData';

export interface OnboardingState {
  motherTongue: SpeaksLanguage;
  stickingPoints: string[];
  goals: string[];
  proficiency: ProficiencyLevel;
  dailyCommitment: DailyCommitment;
  hasSeenAssurance: boolean;
}

interface ArohiSpeaksOnboardingProps {
  onComplete: (data: OnboardingState) => void;
  isDarkMode?: boolean;
}

export default function ArohiSpeaksOnboarding({ onComplete, isDarkMode = true }: ArohiSpeaksOnboardingProps) {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 7;

  // Selections
  const [selectedLanguage, setSelectedLanguage] = useState<SpeaksLanguage>(MOTHER_TONGUES[0]);
  const [selectedStickingPoints, setSelectedStickingPoints] = useState<string[]>(['hesitation_shyness', 'grammar_rules']);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['job_interview', 'social_confidence']);
  const [selectedProficiency, setSelectedProficiency] = useState<ProficiencyLevel>(PROFICIENCY_LEVELS[1]);
  const [selectedCommitment, setSelectedCommitment] = useState<DailyCommitment>(DAILY_COMMITMENTS[1]);

  const toggleStickingPoint = (id: string) => {
    setSelectedStickingPoints((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      onComplete({
        motherTongue: selectedLanguage,
        stickingPoints: selectedStickingPoints,
        goals: selectedGoals,
        proficiency: selectedProficiency,
        dailyCommitment: selectedCommitment,
        hasSeenAssurance: true
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className={`min-h-[82vh] flex flex-col justify-between max-w-2xl mx-auto px-4 py-6 select-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Header & Progress Indicator */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <span className="text-xs font-black uppercase tracking-wider text-purple-400">Arohi Speaks</span>
            </div>
          )}

          {/* Stepper Pills */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx + 1 === step
                    ? 'w-6 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-sm shadow-purple-500/50'
                    : idx + 1 < step
                    ? 'w-2 bg-purple-400/80'
                    : 'w-2 bg-slate-700/40'
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] font-mono font-bold text-slate-400">
            {step}/{totalSteps}
          </span>
        </div>

        {/* Dynamic Step Content */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Mother Tongue Selection */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  Step 1 • Your Mother Tongue
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
                  Which language do you feel most comfortable thinking in?
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Arohi will explain grammar rules and corrections in this language so you understand instantly.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 max-h-[50vh] overflow-y-auto pr-1">
                {MOTHER_TONGUES.map((lang) => {
                  const isSelected = selectedLanguage.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-900/60 to-indigo-950/80 border-purple-400 shadow-lg shadow-purple-900/40 text-white'
                          : 'bg-white/[0.03] border-white/10 hover:border-purple-400/40 hover:bg-white/[0.06] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{lang.flag}</span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-black text-sm text-white">{lang.name}</div>
                        <div className="text-xs text-purple-300/90 font-medium">{lang.nativeName}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sample greeting preview */}
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-3">
                <span className="text-xl">✨</span>
                <div className="text-xs">
                  <span className="font-bold text-purple-300">Arohi's Welcome Voice in {selectedLanguage.name}:</span>
                  <p className="text-slate-300 mt-0.5 italic">"{selectedLanguage.sampleGreeting}"</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Sticking Points */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  Step 2 • Identifying The Barrier
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
                  Where do you get stuck when speaking?
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select all that apply. Arohi designs special exercises to dissolve these exact mental blocks.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {STICKING_POINTS.map((sp: StickingPointOption) => {
                  const isSelected = selectedStickingPoints.includes(sp.id);
                  return (
                    <div
                      key={sp.id}
                      onClick={() => toggleStickingPoint(sp.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-purple-950/60 border-purple-400 shadow-md text-white'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{sp.icon}</span>
                        <div>
                          <p className="text-sm font-black text-white">{sp.title}</p>
                          <p className="text-xs text-slate-400 leading-snug">{sp.subtitle}</p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Goals */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  Step 3 • Your Big Dream
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
                  Why do you want to master speaking fluently?
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select your primary motivations so your practice scenarios match your real life.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {SPEAKING_GOALS.map((goal: GoalOption) => {
                  const isSelected = selectedGoals.includes(goal.id);
                  return (
                    <div
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-emerald-950/50 border-emerald-400 shadow-md text-white'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <div>
                          <p className="text-sm font-black text-white">{goal.title}</p>
                          <p className="text-xs text-slate-400 leading-snug">{goal.subtitle}</p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Proficiency Level */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  Step 4 • Baseline Check
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
                  What is your current speaking comfort level?
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Be 100% honest! There is zero test pressure here. We start at the exact pace you need.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {PROFICIENCY_LEVELS.map((lvl) => {
                  const isSelected = selectedProficiency.id === lvl.id;
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => setSelectedProficiency(lvl)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-sky-950/60 border-sky-400 shadow-md text-white'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">{lvl.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                            {lvl.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{lvl.subtitle}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-sky-500 border-sky-400 text-white' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <span className="text-xs font-bold">✓</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Daily Commitment */}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  Step 5 • The Daily Habit
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
                  How much time can you practice each day?
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Consistency beats long sessions. Even 10 minutes daily trains your mouth muscles and brain wiring.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {DAILY_COMMITMENTS.map((dc) => {
                  const isSelected = selectedCommitment.minutes === dc.minutes;
                  return (
                    <div
                      key={dc.minutes}
                      onClick={() => setSelectedCommitment(dc)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-rose-950/60 border-rose-400 shadow-md text-white'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {dc.badge}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-rose-500 border-rose-400 text-white' : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <span className="text-xs font-bold">✓</span>}
                        </div>
                      </div>
                      <div>
                        <p className="text-base font-black text-white">{dc.label}</p>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">{dc.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 6: The 3 Gold Assurances (Strictly No Judgement) */}
          {step === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center space-y-2 py-2">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 to-amber-500 p-0.5 shadow-xl shadow-purple-600/30 flex items-center justify-center">
                  <div className="w-full h-full bg-[#0e101d] rounded-[22px] flex items-center justify-center text-3xl">
                    🛡️
                  </div>
                </div>
                <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                  Arohi's Sacred Promise
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  No Judgement. No Shaming. No Fear.
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Speaking a new language is vulnerable. In this room, you are protected and celebrated every single day.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Mistakes are Celebrated, Not Mocked</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Every time you fumble or say something wrong, Arohi smiles and shows you the natural way gently without pointing fingers.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Hinglish & Mother Tongue are 100% Welcome</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      If you ever get stuck, mix words from your mother tongue freely! Arohi understands seamlessly and helps bridge the sentence.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Snail Mode for Crystal Clear Pronunciation</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Listen to any response at 0.75x slow speed with a single tap, so your ears absorb every sound without rushing.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 7: 4-Week Custom Roadmap Ready */}
          {step === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center space-y-2 py-2">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-purple-600 p-0.5 shadow-xl shadow-emerald-500/30 flex items-center justify-center">
                  <div className="w-full h-full bg-[#0e101d] rounded-[22px] flex items-center justify-center text-3xl">
                    🎉
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                  Custom Plan Activated
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Your 4-Week Speaking Road is Ready!
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Tailored for your mother tongue ({selectedLanguage.name}) and designed for {selectedCommitment.minutes} minutes of daily courage.
                </p>
              </div>

              {/* Fluency Curve Card */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-purple-950/60 to-indigo-950/70 border border-purple-500/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Projected Fluency Trajectory</span>
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold text-[10px]">
                    +60% Boost
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-2xl bg-black/30 border border-white/5 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Score</span>
                    <span className="text-2xl font-black text-amber-400">{selectedProficiency.initialScore}%</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{selectedProficiency.badge}</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/30 border border-purple-500/30 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-purple-500/20 rounded-full blur-xl"></div>
                    <span className="text-[10px] text-purple-300 uppercase font-bold block">Week 4 Goal</span>
                    <span className="text-2xl font-black text-emerald-400">88%</span>
                    <span className="text-[10px] text-purple-300 block mt-0.5">Fluent Communicator</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Week 1: Overcome fear & master first 50 daily sentences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Week 2: Construct natural past & future conversations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Week 3: Workplace meetings, phone calls & interviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Week 4: Spontaneous storytelling & Master Fluency Certificate</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Button */}
      <div className="pt-6 border-t border-white/10 mt-6">
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider py-4 rounded-2xl shadow-lg shadow-purple-600/30 cursor-pointer transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
        >
          <span>{step === 7 ? 'Start Day 1 Practice Now 🚀' : 'Continue'}</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
