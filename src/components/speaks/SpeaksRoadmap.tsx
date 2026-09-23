import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Check, 
  Lock, 
  Star, 
  Gift, 
  Play, 
  ChevronRight, 
  Compass,
  Award,
  BookOpen,
  Coffee,
  Briefcase,
  UserCheck,
  Plane,
  HeartHandshake,
  Crown
} from 'lucide-react';
import { SpeaksWeek, SpeaksLessonNode, SpeaksUserProgress, SpeaksLanguage } from '../../types/speaksTypes';

interface SpeaksRoadmapProps {
  weeks: SpeaksWeek[];
  progress: SpeaksUserProgress;
  sourceLanguage: SpeaksLanguage;
  targetLanguage: SpeaksLanguage;
  onSelectLesson: (lesson: SpeaksLessonNode) => void;
  onOpenChest: (dayNumber: number) => void;
  isDarkMode?: boolean;
}

export default function SpeaksRoadmap({
  weeks,
  progress,
  sourceLanguage,
  targetLanguage,
  onSelectLesson,
  onOpenChest,
  isDarkMode = true
}: SpeaksRoadmapProps) {
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);

  const currentWeek = weeks.find(w => w.weekNumber === selectedWeekNum) || weeks[0];

  const getNodeIcon = (type: SpeaksLessonNode['iconType'], isChest?: boolean) => {
    if (isChest) return Gift;
    switch (type) {
      case 'intro': return UserCheck;
      case 'food': return Coffee;
      case 'travel': return Plane;
      case 'office': return Briefcase;
      case 'boss': return HeartHandshake;
      case 'interview': return Award;
      case 'exam': return Crown;
      default: return BookOpen;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Week Selector Ribbon */}
      <div className="w-full max-w-4xl px-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-md">
          {weeks.map((week) => {
            const isSelected = selectedWeekNum === week.weekNumber;
            const weekCompletedCount = week.lessons.filter(l => progress.completedDays.includes(l.dayNumber)).length;
            const isAllCompleted = weekCompletedCount === week.lessons.length;

            return (
              <button
                key={week.weekNumber}
                onClick={() => setSelectedWeekNum(week.weekNumber)}
                className={`p-3 rounded-xl transition-all text-left relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-r ${week.colorGradient} text-white shadow-lg shadow-orange-500/10`
                    : 'bg-slate-900/40 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    Week {week.weekNumber}
                  </span>
                  {isAllCompleted ? (
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  ) : (
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                      {weekCompletedCount}/7
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-xs sm:text-sm truncate leading-tight">
                  {week.theme}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Week Banner */}
      <div className="w-full max-w-2xl px-4 mb-8">
        <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r ${currentWeek.colorGradient} text-white shadow-xl relative overflow-hidden`}>
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest bg-black/20 px-2.5 py-1 rounded-full text-white/90">
                Week {currentWeek.weekNumber} of 4 • {targetLanguage.englishName} Journey
              </span>
              <h3 className="text-lg sm:text-xl font-black mt-2 tracking-tight">
                {currentWeek.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-md">
                {currentWeek.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-black/25 px-3.5 py-2 rounded-2xl backdrop-blur-md self-start sm:self-auto flex-shrink-0">
              <Trophy className="w-5 h-5 text-amber-300" />
              <div>
                <span className="text-[10px] uppercase tracking-wider block text-white/70">Milestone</span>
                <span className="text-xs font-bold truncate max-w-[140px] block">{currentWeek.milestoneName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* S-Curved Road Journey Path */}
      <div className="w-full max-w-lg px-4 flex flex-col items-center relative pb-16">
        {currentWeek.lessons.map((lesson, idx) => {
          const isCompleted = progress.completedDays.includes(lesson.dayNumber);
          const isCurrent = lesson.dayNumber === progress.currentDay;
          const isLocked = lesson.dayNumber > progress.currentDay && !isCompleted;
          const isChestNode = lesson.isChest;
          const IconComponent = getNodeIcon(lesson.iconType, isChestNode);

          // Alternating horizontal zigzag offset for game roadmap feel
          // 0 -> center, 1 -> -40px, 2 -> -70px, 3 -> 0px, 4 -> 70px, 5 -> 40px, 6 -> center
          const offsets = [0, -45, -75, 0, 75, 45, 0];
          const xOffset = offsets[idx % offsets.length];

          return (
            <div 
              key={lesson.id} 
              className="w-full flex flex-col items-center relative my-4"
              style={{ transform: `translateX(${xOffset}px)` }}
            >
              {/* Vertical connecting dash line to next node */}
              {idx < currentWeek.lessons.length - 1 && (
                <div 
                  className={`absolute top-16 w-1.5 h-16 rounded-full -z-0 ${
                    isCompleted ? 'bg-gradient-to-b from-amber-500 to-orange-500 shadow-sm' : 'bg-slate-700/60'
                  }`}
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                />
              )}

              {/* Node Card / Orb */}
              <div className="flex flex-col items-center z-10 group">
                <button
                  disabled={isLocked}
                  onClick={() => {
                    if (isChestNode && isCompleted) {
                      onOpenChest(lesson.dayNumber);
                    } else {
                      onSelectLesson(lesson);
                    }
                  }}
                  className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 text-slate-950 ring-4 ring-orange-500/40 shadow-2xl shadow-orange-500/50 scale-110 animate-pulse'
                      : isCompleted
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:scale-105'
                      : 'bg-slate-800 border-2 border-slate-700 text-slate-500 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <IconComponent className={`w-8 h-8 ${isCurrent ? 'stroke-[2.5]' : ''}`} />

                  {/* Day Number Badge */}
                  <span className={`absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
                    isCurrent 
                      ? 'bg-slate-900 text-amber-400 border border-amber-400' 
                      : isCompleted
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    Day {lesson.dayNumber}
                  </span>

                  {/* Checkmark or Lock status */}
                  {isCompleted && (
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  {isLocked && (
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-slate-400 flex items-center justify-center">
                      <Lock className="w-3 h-3" />
                    </div>
                  )}

                  {/* Pulsing Start Chip on current active lesson */}
                  {isCurrent && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950 text-white text-[10px] font-extrabold tracking-wider border border-orange-400/80 shadow-lg whitespace-nowrap flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current text-orange-400" />
                      START
                    </div>
                  )}
                </button>

                {/* Lesson Title & Scenario Label */}
                <div 
                  onClick={() => !isLocked && onSelectLesson(lesson)}
                  className={`mt-3.5 max-w-[220px] text-center cursor-pointer transition-all ${
                    isLocked ? 'opacity-40' : 'hover:scale-105'
                  }`}
                >
                  <h5 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                    {lesson.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {lesson.scenario}
                  </p>
                  
                  {/* Reward XP badge */}
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      +{lesson.rewardXp} XP
                    </span>
                    {isCompleted && (
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
