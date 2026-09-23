import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Briefcase,
  Coffee,
  Plane,
  Users,
  Sparkles,
  ChevronRight,
  Flame,
  Volume2
} from 'lucide-react';
import { SPEAKING_ARENAS, SpeakingArena, SpeaksLanguage } from './speaksData';

interface ArohiSpeaksArenasProps {
  onSelectArena: (arena: SpeakingArena) => void;
  onBack: () => void;
  motherTongue: SpeaksLanguage;
  isDarkMode?: boolean;
}

export default function ArohiSpeaksArenas({
  onSelectArena,
  onBack,
  motherTongue,
  isDarkMode = true
}: ArohiSpeaksArenasProps) {
  return (
    <div className={`max-w-3xl mx-auto px-4 py-6 select-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roadmap</span>
        </button>

        <span className="text-xs font-black uppercase tracking-wider text-purple-400">
          Real-World Arenas
        </span>
      </div>

      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Roleplay Arenas: Real Situations
        </h2>
        <p className="text-xs text-slate-400">
          Choose a scenario to practice speaking English under realistic everyday conditions with Arohi.
        </p>
      </div>

      {/* Grid of Arenas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SPEAKING_ARENAS.map((arena, idx) => {
          return (
            <motion.div
              key={arena.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelectArena(arena)}
              className="p-5 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 hover:border-purple-400/50 hover:bg-white/[0.06] transition-all cursor-pointer flex flex-col justify-between gap-4 group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {arena.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    {arena.badge}
                  </span>
                </div>

                <h3 className="text-base font-black text-white mt-3 group-hover:text-purple-300 transition-colors">
                  {arena.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {arena.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-purple-300">
                <span>Enter Arena</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
