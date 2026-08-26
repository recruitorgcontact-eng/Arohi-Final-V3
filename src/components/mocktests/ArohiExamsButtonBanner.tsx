import React from 'react';
import { audioEngine } from '../../utils/audioEngine';

interface ArohiExamsButtonBannerProps {
  onClick?: () => void;
  className?: string;
  size?: 'normal' | 'compact' | 'large';
  isDarkMode?: boolean;
}

export default function ArohiExamsButtonBanner({
  onClick,
  className = '',
  size = 'compact',
  isDarkMode = true
}: ArohiExamsButtonBannerProps) {
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
      id="home-arohi-exams-banner-btn"
      onClick={handleClick}
      aria-label="Open Arohi Exams CBT Mock Tests - Prepare, Practice, Achieve"
      className={`group relative w-full select-none cursor-pointer outline-none transition-all duration-200 transform hover:scale-[1.015] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950 ${className}`}
    >
      {/* Outer Ambient Multi-Color Neon Backlight Glow */}
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 opacity-40 blur-md group-hover:opacity-75 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

      {/* Main Glassmorphic Pill Capsule Container */}
      <div className="relative overflow-hidden rounded-full p-[1.5px] bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 shadow-[0_4px_16px_rgba(14,165,233,0.25),0_0_12px_rgba(236,72,153,0.25)]">
        
        {/* Inner Solid Acrylic Capsule Body - Ultra-compact, high-contrast dark interior */}
        <div className="relative flex items-center justify-between gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#030a1c] via-[#05112d] via-[#081236] to-[#04091e]">
          
          {/* Top Glass Specular Curved Reflection */}
          <div className="absolute inset-x-6 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

          {/* LEFT: Compact 3D Arohi Neon Orb Logo */}
          <div className="relative z-10 flex items-center gap-2 shrink-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-pink-500 shadow-[0_0_10px_rgba(56,189,248,0.5)] shrink-0 group-hover:rotate-6 transition-transform duration-300">
              
              {/* Orb Glass Interior */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0a183d] via-[#040a1c] to-[#000511] flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute top-0.5 inset-x-1.5 h-2 bg-white/25 rounded-full blur-[0.5px] pointer-events-none" />
                
                {/* Arohi 3D Stylized Vector "A" Logo */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="arohiALeftLegCompact" x1="20" y1="80" x2="50" y2="20" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="60%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                    <linearGradient id="arohiARightLegCompact" x1="50" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                    <linearGradient id="arohiAOrbitCompact" x1="10" y1="65" x2="90" y2="40" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 16 68 C 22 84, 52 86, 78 52 C 92 34, 88 26, 74 38"
                    stroke="url(#arohiAOrbitCompact)"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 22 78 L 48 24 C 49 22, 51 22, 52 24 L 54 28 L 32 78 Z"
                    fill="url(#arohiALeftLegCompact)"
                  />
                  <path
                    d="M 50 22 C 52 22, 54 24, 55 26 L 76 80 C 74 84, 68 84, 64 78 L 46 32 Z"
                    fill="url(#arohiARightLegCompact)"
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

          {/* CENTER: Compact Streamlined Typography */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center flex-1 min-w-0 px-1">
            
            {/* Main Header Row: "AROHI EXAMS™" + Holographic Cap */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 leading-none">
              <span className="text-xs sm:text-base font-black uppercase tracking-tight text-cyan-300 font-sans">
                AROHI
              </span>
              <span className="text-xs sm:text-base font-black tracking-tight text-white drop-shadow-[0_1px_8px_rgba(255,255,255,0.6)] font-sans">
                EXAMS
              </span>
              <span className="text-[7.5px] sm:text-[9px] font-black text-cyan-300 self-start font-mono">
                TM
              </span>

              {/* Mini 3D Graduation Cap Icon */}
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg
                  viewBox="0 0 64 64"
                  className="w-full h-full drop-shadow-[0_0_6px_rgba(147,197,253,0.7)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="capGradTopMini" x1="0" y1="20" x2="64" y2="20" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                    <linearGradient id="capGradBaseMini" x1="16" y1="36" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20 32 C 20 44, 44 44, 44 32 L 44 26 C 44 26, 32 30, 20 26 Z"
                    fill="url(#capGradBaseMini)"
                    opacity="0.9"
                  />
                  <polygon
                    points="32,10 60,23 32,36 4,23"
                    fill="url(#capGradTopMini)"
                    stroke="#ffffff"
                    strokeWidth="1"
                  />
                  <circle cx="32" cy="23" r="2" fill="#ffffff" />
                  <path
                    d="M 32 23 C 48 24, 52 35, 53 43"
                    stroke="#f472b6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Compact Tagline */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-300 mt-0.5">
              <span className="text-cyan-300">Prepare</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              <span className="text-purple-300">Practice</span>
              <span className="w-1 h-1 rounded-full bg-purple-400" />
              <span className="text-pink-300">Achieve</span>
            </div>
          </div>

          {/* RIGHT: Compact Action Chevron Orb */}
          <div className="relative z-10 shrink-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0a1b42] via-[#040c24] to-[#01040f] flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute top-0.5 inset-x-1 h-1.5 bg-white/30 rounded-full blur-[0.5px] pointer-events-none" />
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-0.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </button>
  );
}
