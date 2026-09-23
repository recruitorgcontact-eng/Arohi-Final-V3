import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Lock,
  Star,
  Play,
  Flame,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  Volume2,
  Clock,
  Compass,
  X
} from 'lucide-react';
import { ROADMAP_LESSONS, RoadmapLesson, SpeaksLanguage } from './speaksData';

interface ArohiSpeaksRoadmapProps {
  currentDay: number;
  completedDays: number[];
  fluencyScore: number;
  streakDays: number;
  motherTongue: SpeaksLanguage;
  snailMode: boolean;
  onToggleSnailMode: () => void;
  onSelectLesson: (lesson: RoadmapLesson) => void;
  onOpenArenas: () => void;
  onOpenLanguageSelector: () => void;
  isDarkMode?: boolean;
}

export default function ArohiSpeaksRoadmap({
  currentDay,
  completedDays,
  fluencyScore,
  streakDays,
  motherTongue,
  snailMode,
  onToggleSnailMode,
  onSelectLesson,
  onOpenArenas,
  onOpenLanguageSelector,
  isDarkMode = true
}: ArohiSpeaksRoadmapProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(Math.ceil(currentDay / 7) || 1);
  const [activePreviewLesson, setActivePreviewLesson] = useState<RoadmapLesson | null>(null);

  const weekLessons = ROADMAP_LESSONS.filter((l) => l.week === selectedWeek);

  const weekDescriptions: Record<number, { title: string; subtitle: string; icon: string }> = {
    1: {
      title: 'Week 1: Overcoming Hesitation & First Words',
      subtitle: 'Break shyness, master warm greetings, order food, and introduce yourself without fear.',
      icon: '🌱'
    },
    2: {
      title: 'Week 2: Sentence Construction & Daily Conversations',
      subtitle: 'Family talks, shopping & prices, mastering past tense and making weekend plans.',
      icon: '💬'
    },
    3: {
      title: 'Week 3: Professional Confidence & Problem Solving',
      subtitle: 'Job interviews, strengths, phone call etiquette, agreeing & disagreeing with poise.',
      icon: '💼'
    },
    4: {
      title: 'Week 4: Fluency, Spontaneous Storytelling & Graduation',
      subtitle: 'Narrative storytelling, impromptu 60-second challenge, and Master Fluency Certificate.',
      icon: '🎓'
    }
  };

  const handleNodeClick = (lesson: RoadmapLesson) => {
    setActivePreviewLesson(lesson);
  };

  return (
    <div className={`max-w-3xl mx-auto px-4 py-6 select-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner & Stats Overview */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-purple-950/60 via-[#101428] to-indigo-950/70 border border-purple-500/30 shadow-xl space-y-4">
        {/* Quick Top Bar */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎙️</span>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                <span>Arohi Speaks</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  4-Week Road
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">Speak Any Language • Empathy-First Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mother tongue switcher */}
            <button
              onClick={onOpenLanguageSelector}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 cursor-pointer flex items-center gap-1 transition-all"
            >
              <span>{motherTongue.flag}</span>
              <span className="hidden sm:inline">{motherTongue.name}</span>
            </button>

            {/* Snail mode button */}
            <button
              onClick={onToggleSnailMode}
              title="Slow speech down to 0.75x"
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center gap-1 ${
                snailMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
            >
              <span>🐌</span>
              <span className="text-[10px] font-mono">0.75x</span>
            </button>
          </div>
        </div>

        {/* High-Level User Metrics */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="p-3 rounded-2xl bg-black/30 border border-white/5 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Fluency Score</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xl font-black text-emerald-400">{fluencyScore}%</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/30 border border-white/5 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Daily Streak</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xl font-black text-amber-400">{streakDays} Days</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/30 border border-white/5 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Road Progress</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xl font-black text-purple-300">{completedDays.length}/28</span>
            </div>
          </div>
        </div>

        {/* Quick Action: Roleplay Arenas Banner */}
        <div
          onClick={onOpenArenas}
          className="p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-all cursor-pointer flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-white block">Real-World Speaking Arenas</span>
              <span className="text-[10px] text-purple-300">Job Interviews, Café Orders, Airport Check-in & Free Chat</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-purple-300 shrink-0" />
        </div>
      </div>

      {/* Week Tabs Selector */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[1, 2, 3, 4].map((wk) => {
          const isSelected = selectedWeek === wk;
          const isCurrent = Math.ceil(currentDay / 7) === wk;
          return (
            <button
              key={wk}
              onClick={() => setSelectedWeek(wk)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{weekDescriptions[wk].icon}</span>
              <span>Week {wk}</span>
              {isCurrent && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Week Header Description */}
      <div className="mt-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
        <h3 className="text-sm font-black text-white">{weekDescriptions[selectedWeek].title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{weekDescriptions[selectedWeek].subtitle}</p>
      </div>

      {/* 7 Interactive Nodes in the Winding Roadmap */}
      <div className="mt-6 space-y-4">
        {weekLessons.map((lesson, idx) => {
          const isCompleted = completedDays.includes(lesson.day);
          const isCurrent = lesson.day === currentDay;
          const isLocked = lesson.day > currentDay && !isCompleted;

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleNodeClick(lesson)}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-3 relative overflow-hidden ${
                isCurrent
                  ? 'bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-purple-400 shadow-xl shadow-purple-900/30 ring-1 ring-purple-400'
                  : isCompleted
                  ? 'bg-white/[0.03] border-emerald-500/30 hover:border-emerald-500/50'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 opacity-70'
              }`}
            >
              {/* Left icon & details */}
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                    isCurrent
                      ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/40 ring-2 ring-purple-400/50'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-white/5 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-6 h-6 stroke-[3]" /> : isLocked ? <Lock className="w-5 h-5" /> : lesson.icon}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">
                      Day {lesson.day}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold animate-pulse">
                        Current Focus
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-emerald-400" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-white mt-0.5">{lesson.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{lesson.scenario}</p>
                </div>
              </div>

              {/* Right Action Button */}
              <div className="shrink-0">
                {isCurrent ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(lesson);
                    }}
                    className="px-4 py-2 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Practice</span>
                  </button>
                ) : isCompleted ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(lesson);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
                  >
                    <span>Replay</span>
                  </button>
                ) : (
                  <div className="p-2 text-slate-600">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lesson Details Modal / Bottom Sheet */}
      <AnimatePresence>
        {activePreviewLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#14182b] to-[#0d1020] border border-purple-500/30 p-5 shadow-2xl space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{activePreviewLesson.icon}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">
                      Day {activePreviewLesson.day} • Week {activePreviewLesson.week}
                    </span>
                    <h3 className="text-base font-black text-white">{activePreviewLesson.title}</h3>
                  </div>
                </div>

                <button
                  onClick={() => setActivePreviewLesson(null)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lesson Objectives */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {activePreviewLesson.description}
              </p>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Real-World Context:</span>
                <p className="text-xs font-semibold text-purple-300">{activePreviewLesson.scenario}</p>
              </div>

              {/* Sneak peek of common mistake */}
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-300">
                  Target Sentence Pattern:
                </span>
                <div className="text-xs text-slate-300">
                  <span className="text-rose-400 line-through mr-2">{activePreviewLesson.commonMistake.wrong}</span>
                  <span className="text-emerald-400 font-bold">{activePreviewLesson.commonMistake.right}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  const target = activePreviewLesson;
                  setActivePreviewLesson(null);
                  onSelectLesson(target);
                }}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider py-4 rounded-2xl shadow-lg shadow-purple-600/30 cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Speaking Practice Now 🚀</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
