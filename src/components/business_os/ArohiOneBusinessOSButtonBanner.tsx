import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface ArohiOneBusinessOSButtonBannerProps {
  onClick?: () => void;
  className?: string;
  isDarkMode?: boolean;
}

export default function ArohiOneBusinessOSButtonBanner({
  onClick,
  className = '',
  isDarkMode = true
}: ArohiOneBusinessOSButtonBannerProps) {
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
      id="home-arohi-one-business-os-banner-btn"
      onClick={handleClick}
      aria-label="Open AROHI ONE Business OS - Your Business. One Intelligent OS."
      className={`group relative w-full select-none cursor-pointer outline-none transition-all duration-200 transform hover:scale-[1.015] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950 ${className}`}
    >
      {/* Outer Ambient Multi-Color Neon Backlight Glow */}
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-40 blur-md group-hover:opacity-75 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

      {/* Main Glassmorphic Pill Capsule Container */}
      <div className="relative overflow-hidden rounded-full p-[1.5px] bg-gradient-to-r from-cyan-400 via-blue-500 via-indigo-500 to-purple-500 shadow-[0_4px_16px_rgba(6,182,212,0.25),0_0_12px_rgba(168,85,247,0.25)]">
        
        {/* Inner Solid Acrylic Capsule Body - Ultra-compact high-contrast glossy interior */}
        <div className="relative flex items-center justify-between gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#030a21] via-[#061239] via-[#091547] to-[#040c26]">
          
          {/* Top Glass Specular Curved Reflection */}
          <div className="absolute inset-x-6 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

          {/* LEFT: Compact 3D Arohi Neon Orb Logo */}
          <div className="relative z-10 flex items-center gap-2 shrink-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(56,189,248,0.5)] shrink-0 group-hover:rotate-6 transition-transform duration-300">
              
              {/* Orb Glass Interior */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0a1b4d] via-[#05102e] to-[#010617] flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute top-0.5 inset-x-1.5 h-2 bg-white/25 rounded-full blur-[0.5px] pointer-events-none" />
                
                {/* Arohi 3D Stylized Vector "A" Logo */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_6px_rgba(56,189,248,0.85)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="arohiOneALeftLegCompact" x1="20" y1="80" x2="50" y2="20" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="60%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                    <linearGradient id="arohiOneARightLegCompact" x1="50" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient id="arohiOneAOrbitCompact" x1="10" y1="65" x2="90" y2="40" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
                      <stop offset="100%" stopColor="#e879f9" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 16 68 C 22 84, 52 86, 78 52 C 92 34, 88 26, 74 38"
                    stroke="url(#arohiOneAOrbitCompact)"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 22 78 L 48 24 C 49 22, 51 22, 52 24 L 54 28 L 32 78 Z"
                    fill="url(#arohiOneALeftLegCompact)"
                  />
                  <path
                    d="M 50 22 C 52 22, 54 24, 55 26 L 76 80 C 74 84, 68 84, 64 78 L 46 32 Z"
                    fill="url(#arohiOneARightLegCompact)"
                  />
                  <path
                    d="M 30 58 Q 50 48 70 54 Q 50 56 30 58 Z"
                    fill="#ffffff"
                    opacity="0.95"
                  />
                  <path
                    d="M 72 20 Q 72 26 78 26 Q 72 26 72 32 Q 72 26 66 26 Q 72 26 72 20 Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* CENTER: Compact Typography & Badging */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center flex-1 min-w-0 px-1">
            
            {/* Top Main Heading Row */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 leading-none">
              <span className="text-xs sm:text-base font-black tracking-tight text-white drop-shadow-[0_1px_6px_rgba(255,255,255,0.6)] font-sans">
                AROHI
              </span>
              <span className="text-xs sm:text-base font-black tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_1px_8px_rgba(56,189,248,0.7)] font-sans">
                ONE
              </span>
              <span className="text-[7.5px] sm:text-[9px] font-black text-cyan-300 self-start font-mono">
                TM
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-black uppercase tracking-wider text-cyan-300/90 ml-1 border-l border-cyan-400/30 pl-1.5">
                Business OS
              </span>
            </div>

            {/* Bottom Compact Tagline */}
            <div className="flex items-center justify-center gap-1 text-[7.5px] sm:text-[9px] font-medium text-slate-200 mt-0.5">
              <Sparkles className="w-2.5 h-2.5 text-cyan-300 shrink-0" />
              <span className="truncate">Your Business. One Intelligent OS.</span>
            </div>

            {/* Tiny Under Beta Testing Notice */}
            <div className="flex items-center justify-center gap-1 text-[6px] sm:text-[7.5px] font-bold tracking-widest uppercase text-amber-300/90 mt-0.5 drop-shadow-[0_0_4px_rgba(251,191,36,0.35)]">
              <span className="inline-block w-1 h-1 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span>UNDER BETA TESTING</span>
            </div>
          </div>

          {/* RIGHT: Compact Circular Glowing Action Button */}
          <div className="relative z-10 flex items-center shrink-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-[1.5px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0c2461] via-[#1e3799] to-[#4a69bd] flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute top-0.5 inset-x-1 h-1.5 bg-white/35 rounded-full blur-[0.5px] pointer-events-none" />
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.5] group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </button>
  );
}
