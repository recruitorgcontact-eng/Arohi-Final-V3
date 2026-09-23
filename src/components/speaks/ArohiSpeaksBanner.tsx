import React from 'react';
import { Mic, Sparkles, ArrowRight, Volume2, ShieldCheck, Heart } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface ArohiSpeaksBannerProps {
  onClick?: () => void;
  className?: string;
  isDarkMode?: boolean;
}

export default function ArohiSpeaksBanner({
  onClick,
  className = '',
  isDarkMode = true
}: ArohiSpeaksBannerProps) {
  const handleClick = () => {
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
      id="home-arohi-speaks-banner"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`group relative w-full select-none cursor-pointer rounded-2xl sm:rounded-3xl p-[1.5px] transition-all duration-300 transform hover:scale-[1.012] active:scale-[0.99] outline-none ${className}`}
    >
      {/* Outer ambient purple-indigo aura glow */}
      <div className="absolute -inset-0.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 opacity-30 blur-md group-hover:opacity-60 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

      {/* Border gradient ring */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-[1.5px] bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 shadow-xl">
        {/* Inner container */}
        <div className={`relative px-4 sm:px-6 py-4 sm:py-5 rounded-[calc(theme(borderRadius.2xl)-1.5px)] sm:rounded-[calc(theme(borderRadius.3xl)-1.5px)] transition-all overflow-hidden ${
          isDarkMode
            ? 'bg-gradient-to-r from-[#0F1322] via-[#14182E] to-[#0A0D18] text-white'
            : 'bg-gradient-to-r from-[#F5F3FF] via-[#EDE9FE] to-[#FDF4FF] text-zinc-900'
        }`}>
          {/* Subtle decorative background circles */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />
          <div className="absolute left-1/3 -top-12 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-lg shadow-purple-900/30 shrink-0 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[14px] bg-[#0F1322] flex items-center justify-center relative overflow-hidden">
                  <Mic className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    New Course
                  </span>
                  <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-amber-400" />
                    No Judgement • Zero Fear
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black tracking-tight mt-1 flex items-center gap-1.5 font-display">
                  <span>Arohi Speaks™</span>
                  <span className="text-xs sm:text-sm font-normal text-zinc-400">
                    Spoken English AI
                  </span>
                </h3>

                <p className="text-xs text-zinc-400 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-purple-300 font-medium">Bilingual Corrections (सही Sentence)</span>
                  <span>•</span>
                  <span>Snail Mode 0.75x Audio</span>
                  <span>•</span>
                  <span>4-Week Guided Journey</span>
                </p>
              </div>
            </div>

            {/* Right: CTA button */}
            <div className="shrink-0 self-stretch sm:self-auto flex items-center justify-end">
              <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 group-hover:from-purple-500 group-hover:to-indigo-500 transition-all">
                <span>Start Speaking Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
