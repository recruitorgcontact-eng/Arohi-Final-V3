import React from 'react';
import { ArrowRight, Sparkles, Flame, Zap } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface Mission87HeroBannerProps {
  onClick?: () => void;
  className?: string;
  isDarkMode?: boolean;
}

export default function Mission87HeroBanner({
  onClick,
  className = '',
  isDarkMode = true
}: Mission87HeroBannerProps) {
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
    <button
      type="button"
      id="home-mission-87-hero-banner-btn"
      onClick={handleClick}
      aria-label="Open Mission 87 Movement - National Youth Activation"
      className={`group relative w-full select-none cursor-pointer outline-none transition-all duration-200 transform hover:scale-[1.018] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950 ${className}`}
    >
      {/* 1. Multi-Color Joyful Spectrum Aura (Saffron - Hot Pink - Electric Cyan - Royal Purple - Emerald) */}
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-orange-500/60 via-pink-500/50 via-cyan-400/55 via-indigo-500/40 to-emerald-400/60 opacity-60 blur-md group-hover:opacity-90 group-hover:blur-xl transition-all duration-300 pointer-events-none" />

      {/* 2. Apple-Grade Jewel Micro-Border with Multi-Gradient Sheen */}
      <div className="relative overflow-hidden rounded-full p-[1.8px] bg-gradient-to-r from-amber-400 via-pink-500 via-cyan-400 via-indigo-400 via-emerald-400 to-amber-400 shadow-[0_4px_20px_rgba(249,115,22,0.35),0_0_15px_rgba(6,182,212,0.3)]">
        
        {/* 3. Cosmic Colorful Acrylic Capsule Body */}
        <div className="relative flex items-center justify-between gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#180933] via-[#091845] via-[#042436] to-[#120729]">
          
          {/* Top Glass Specular Curved Reflection (Apple Signature Glass Highlight) */}
          <div className="absolute inset-x-6 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-white/25 via-white/5 to-transparent pointer-events-none" />

          {/* Joyful Ambient Color Bleeds Inside Glass */}
          <div className="absolute left-10 top-0 w-24 h-full bg-orange-500/15 rounded-full blur-md pointer-events-none" />
          <div className="absolute right-12 top-0 w-24 h-full bg-cyan-500/15 rounded-full blur-md pointer-events-none" />

          {/* LEFT: Vibrant 3D Sovereign Jewel Orb with Multi-Color Halo */}
          <div className="relative z-10 flex items-center gap-2 shrink-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 via-pink-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(245,158,11,0.6)] shrink-0 group-hover:rotate-12 transition-transform duration-300">
              
              {/* Orb Interior */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#240d4f] via-[#0a1f4d] to-[#031d24] flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute top-0.5 inset-x-1.5 h-2 bg-white/40 rounded-full blur-[0.5px] pointer-events-none" />
                
                {/* 3D Indian Sovereign Flag Icon with Radiant Glow */}
                <span className="text-sm sm:text-base select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] filter group-hover:scale-110 transition-transform duration-200">
                  🇮🇳
                </span>
              </div>
            </div>
          </div>

          {/* CENTER: Energetic, Joyful & Multi-Gradient Typography */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center flex-1 min-w-0 px-0.5 sm:px-1">
            
            {/* Top Main Heading Row: "MISSION 87 MOVEMENT" */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 leading-none flex-wrap">
              {/* MISSION: Crisp Silver-Cyan Frost Gradient */}
              <span className="text-[11px] xs:text-xs sm:text-sm md:text-base font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-300 font-sans drop-shadow-[0_1px_6px_rgba(0,180,255,0.4)]">
                MISSION
              </span>
              
              {/* 87: Joyful Fire Gold-Saffron Gradient */}
              <span className="text-[11px] xs:text-xs sm:text-sm md:text-base font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-400 to-orange-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.8)] font-sans">
                87
              </span>

              {/* MOVEMENT: Vibrant Pink-Amber-Emerald Party Gradient */}
              <span className="text-[8.5px] xs:text-[9.5px] sm:text-[11px] md:text-xs font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-emerald-300 ml-0.5 font-sans drop-shadow-[0_1px_6px_rgba(236,72,153,0.5)]">
                MOVEMENT
              </span>

              {/* Official Cadet Pass Micro-Pill with Colorful Gradient Border */}
              <span className="hidden xs:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-amber-500/20 border border-purple-400/50 text-purple-200 font-extrabold text-[7px] sm:text-[8px] uppercase tracking-wider ml-0.5 shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                <Sparkles className="w-2 h-2 text-yellow-300" />
                SOVEREIGN PASS
              </span>
            </div>

            {/* Bottom Vibrant Multi-Gradient Tagline Row - Fully Visible & Never Cropped */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-[6.5px] xs:text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-extrabold tracking-normal uppercase mt-0.5 whitespace-nowrap max-w-full">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 shrink-0">One Dream</span>
              <span className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_4px_#f59e0b] shrink-0" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300 shrink-0">One India</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#06b6d4] shrink-0" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 shrink-0">Infinite Opportunities</span>
            </div>

            {/* Micro Action Callout with Joyful Glowing Pill */}
            <div className="flex items-center justify-center gap-1.5 text-[6px] xs:text-[6.5px] sm:text-[7.5px] font-black tracking-wider uppercase mt-0.5 whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300">
                BE A PART • BUILD THE FUTURE
              </span>
            </div>

          </div>

          {/* RIGHT: Radiant 3D Sunburst Action Button with Double Chevron */}
          <div className="relative z-10 flex items-center shrink-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 via-pink-500 via-orange-500 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,0.65)] group-hover:scale-110 transition-transform duration-200">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ff6b00] via-[#e11d48] to-[#9333ea] flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute top-0.5 inset-x-1 h-1.5 bg-white/50 rounded-full blur-[0.5px] pointer-events-none" />
                
                {/* Double Chevron Chevrons / Arrow */}
                <div className="flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] group-hover:translate-x-0.5 transition-transform duration-200">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current stroke-[3.2] stroke-linecap-round stroke-linejoin-round">
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </button>
  );
}
