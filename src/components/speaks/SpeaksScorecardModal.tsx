import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  Zap, 
  RotateCcw 
} from 'lucide-react';
import { SpeaksUserProgress, SpeaksLanguage } from '../../types/speaksTypes';

interface SpeaksScorecardModalProps {
  isOpen: boolean;
  onClose: () => void;
  xpGained: number;
  progress: SpeaksUserProgress;
  targetLanguage: SpeaksLanguage;
  sourceLanguage: SpeaksLanguage;
  isDarkMode?: boolean;
}

export default function SpeaksScorecardModal({
  isOpen,
  onClose,
  xpGained,
  progress,
  targetLanguage,
  sourceLanguage,
  isDarkMode = true
}: SpeaksScorecardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-8 text-center relative overflow-hidden ${
          isDarkMode 
            ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-700 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Background glow orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

        {/* Celebration Trophy Badge */}
        <div className="relative z-10 w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-0.5 shadow-2xl shadow-orange-500/40 flex items-center justify-center mb-4 animate-bounce">
          <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-amber-400" />
          </div>
        </div>

        <h3 className="text-2xl font-black tracking-tight text-white mb-1">
          Lesson Completed!
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Great job speaking {targetLanguage.englishName} without hesitation!
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {/* XP Gained */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <div className="text-lg font-black text-amber-400">+{xpGained}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">XP Earned</div>
          </div>

          {/* Pronunciation Match */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <div className="text-lg font-black text-emerald-400">{progress.fluencyScore}%</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Fluency</div>
          </div>

          {/* Daily Streak */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1 fill-orange-500" />
            <div className="text-lg font-black text-orange-400">{progress.streakDays} Days</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Streak</div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6 text-xs text-amber-200/90 font-medium">
          "Consistency builds fluency. Speaking 5 minutes every day is 100x better than studying grammar for hours."
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950 font-black text-sm hover:brightness-110 shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
        >
          Continue Journey
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
