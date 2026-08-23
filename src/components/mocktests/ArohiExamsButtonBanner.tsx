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
  size = 'normal',
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
      className={`group relative w-full select-none cursor-pointer outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${className}`}
    >
      {/* Outer Ambient Multi-Color Neon Backlight Glow */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 via-purple-600 to-pink-500 opacity-60 blur-xl group-hover:opacity-90 group-hover:blur-2xl transition-all duration-500 pointer-events-none" />

      {/* Main Glassmorphic Pill Capsule Container */}
      <div className="relative overflow-hidden rounded-full p-[2px] sm:p-[2.5px] bg-gradient-to-r from-cyan-400 via-blue-500 via-indigo-500 via-purple-500 to-pink-500 shadow-[0_10px_35px_rgba(14,165,233,0.35),0_0_25px_rgba(236,72,153,0.35)]">
        
        {/* Inner Solid Acrylic Capsule Body - always high-contrast dark interior for luminous readability */}
        <div className="relative flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#030a1c] via-[#05112d] via-[#081236] to-[#04091e]">
          
          {/* Top Glass Specular Curved Reflection */}
          <div className="absolute inset-x-8 top-0 h-[48%] rounded-t-full bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

          {/* Background Ambient Radial Highlights */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/25 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/25 rounded-full blur-2xl pointer-events-none" />

          {/* LEFT: 3D Arohi Neon Orb Logo */}
          <div className="relative z-10 flex items-center gap-2.5 sm:gap-4 shrink-0">
            <div className="relative w-11 h-11 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-pink-500 shadow-[0_0_15px_rgba(56,189,248,0.6)] shrink-0 group-hover:rotate-6 transition-transform duration-500">
              
              {/* Orb Glass Interior */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0a183d] via-[#040a1c] to-[#000511] flex items-center justify-center relative overflow-hidden shadow-inner">
                {/* Orb Top Highlight */}
                <div className="absolute top-1 inset-x-2 h-3 bg-white/25 rounded-full blur-[1px] pointer-events-none" />
                
                {/* Arohi 3D Stylized Vector "A" Logo with Orbit & Sparkle */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 sm:w-10 sm:h-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="arohiALeftLeg" x1="20" y1="80" x2="50" y2="20" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="60%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                    <linearGradient id="arohiARightLeg" x1="50" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                    <linearGradient id="arohiAOrbit" x1="10" y1="65" x2="90" y2="40" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id="orbGlow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 3D Swoop / Orbital Ring wrapping around A */}
                  <path
                    d="M 16 68 C 22 84, 52 86, 78 52 C 92 34, 88 26, 74 38"
                    stroke="url(#arohiAOrbit)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#orbGlow)"
                  />

                  {/* Left Leg of A */}
                  <path
                    d="M 22 78 L 48 24 C 49 22, 51 22, 52 24 L 54 28 L 32 78 Z"
                    fill="url(#arohiALeftLeg)"
                  />

                  {/* Right Curved Leg of A */}
                  <path
                    d="M 50 22 C 52 22, 54 24, 55 26 L 76 80 C 74 84, 68 84, 64 78 L 46 32 Z"
                    fill="url(#arohiARightLeg)"
                  />

                  {/* Dynamic Crossbar Swoop of A */}
                  <path
                    d="M 30 58 Q 50 48 70 54 Q 50 56 30 58 Z"
                    fill="#ffffff"
                    opacity="0.95"
                  />

                  {/* 4-Point Brilliant White/Cyan Star Sparkle */}
                  <path
                    d="M 72 20 Q 72 26 78 26 Q 72 26 72 32 Q 72 26 66 26 Q 72 26 72 20 Z"
                    fill="#ffffff"
                    filter="url(#orbGlow)"
                  />
                </svg>
              </div>
            </div>

            {/* Subtle Vertical Neon Divider */}
            <div className="hidden xs:block w-[1.5px] h-8 sm:h-11 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />
          </div>

          {/* CENTER: Typography, "Exams" Title with 3D Mortarboard, & Tagline */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center flex-1 min-w-0 px-1 sm:px-2">
            
            {/* Top Tag: — A R O H I — */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 mb-[-2px] sm:mb-0">
              <span className="w-3 sm:w-6 h-[1.5px] bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.28em] text-cyan-300 font-mono">
                AROHI
              </span>
              <span className="w-3 sm:w-6 h-[1.5px] bg-gradient-to-l from-transparent to-cyan-400" />
            </div>

            {/* Center Main: "Exams" + Holographic Graduation Cap */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 py-0.5">
              <span className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.6)] font-sans">
                Exams
              </span>

              {/* 3D Holographic Graduation Cap SVG */}
              <div className="relative w-7 h-7 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg
                  viewBox="0 0 64 64"
                  className="w-full h-full drop-shadow-[0_0_10px_rgba(147,197,253,0.7)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="capGradTop" x1="0" y1="20" x2="64" y2="20" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                    <linearGradient id="capGradBase" x1="16" y1="36" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  
                  {/* Skull cap band */}
                  <path
                    d="M 20 32 C 20 44, 44 44, 44 32 L 44 26 C 44 26, 32 30, 20 26 Z"
                    fill="url(#capGradBase)"
                    opacity="0.9"
                  />

                  {/* Mortarboard Diamond Top */}
                  <polygon
                    points="32,10 60,23 32,36 4,23"
                    fill="url(#capGradTop)"
                    stroke="#ffffff"
                    strokeWidth="1"
                  />

                  {/* Top Gloss Reflection */}
                  <polygon
                    points="32,13 54,23 32,33 10,23"
                    fill="#ffffff"
                    opacity="0.25"
                  />

                  {/* Center Cap Button */}
                  <circle cx="32" cy="23" r="2.5" fill="#ffffff" />

                  {/* Swinging Tassel Ribbon */}
                  <path
                    d="M 32 23 C 48 24, 52 35, 53 43"
                    stroke="#f472b6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Tassel End Drop */}
                  <polygon points="51,43 55,43 53,50" fill="#f472b6" />
                </svg>
              </div>
            </div>

            {/* Bottom Subtitle: PREPARE • PRACTICE • ACHIEVE */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10.5px] font-black uppercase tracking-[0.22em] text-white font-mono mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              <span className="text-cyan-200">PREPARE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="text-pink-200">PRACTICE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
              <span className="text-amber-200">ACHIEVE</span>
            </div>
          </div>

          {/* RIGHT: Glowing Circular Action Orb with Chevron Arrow */}
          <div className="relative z-10 shrink-0">
            <div className="relative w-9 h-9 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_18px_rgba(236,72,153,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              
              {/* Inner Orb Sphere */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0a1b42] via-[#040c24] to-[#01040f] flex items-center justify-center relative overflow-hidden shadow-inner">
                
                {/* Top Orb Highlight */}
                <div className="absolute top-1 inset-x-2 h-2.5 bg-white/30 rounded-full blur-[0.5px] pointer-events-none" />

                {/* Arrow Icon with Hover Shift */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-7 sm:h-7 text-white group-hover:translate-x-0.5 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
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
