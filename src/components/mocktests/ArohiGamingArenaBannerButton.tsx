import React from 'react';
import { Trophy, Swords, Sparkles, ChevronRight, Zap, Flame, Crown } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface ArohiGamingArenaBannerButtonProps {
  onClick?: () => void;
  className?: string;
  isDarkMode?: boolean;
}

export default function ArohiGamingArenaBannerButton({
  onClick,
  className = '',
  isDarkMode = false
}: ArohiGamingArenaBannerButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    try {
      audioEngine.playButtonTap();
    } catch {
      // Audio fallback
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
      id="arohi-gaming-arena-banner-btn"
      aria-label="Enter Arohi Exams Gaming Arena"
      className={`group relative w-full select-none cursor-pointer outline-none transition-all duration-200 active:scale-[0.99] ${className}`}
    >
      {/* Sleek Apple-style Frosted Glass Card with hairline border */}
      <div className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
        isDarkMode
          ? 'bg-zinc-900/60 hover:bg-zinc-900/80 border-white/[0.08] hover:border-amber-400/30 text-white'
          : 'bg-white hover:bg-zinc-50/80 border-black/[0.06] hover:border-amber-500/30 text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
      }`}>
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          {/* Left: Micro Tag + Title + Description */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 shadow-xs">
              <Swords className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Arena Arcade
                </span>
                <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Battles
                </span>
              </div>
              <h3 className="text-sm sm:text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <span>Exams Gaming Arena</span>
                <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 opacity-90" />
              </h3>
              <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-snug font-normal max-w-lg">
                Challenge peers in 1v1 academic duels, 4v4 squad tournaments, and conquer subject boss battles for national rankings.
              </p>
            </div>
          </div>

          {/* Right: Compact Action Pill Button */}
          <div className="flex items-center gap-2 sm:self-center shrink-0 pt-1 sm:pt-0">
            <div className="hidden lg:flex items-center gap-1.5 text-[10.5px] font-medium text-zinc-400 mr-2">
              <span>1v1 Duels</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span>Boss Fights</span>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>Enter Arena</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Micro Pill Strip at bottom */}
        <div className="relative z-10 flex items-center flex-wrap gap-1.5 pt-3 mt-3 border-t border-zinc-100 dark:border-white/[0.05] text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
          <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/[0.06]">
            ⚡ Instant Matchmaking
          </span>
          <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/[0.06]">
            🏆 National Leaderboard
          </span>
          <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/[0.06]">
            🎁 Seasonal Rewards
          </span>
        </div>
      </div>
    </div>
  );
}
