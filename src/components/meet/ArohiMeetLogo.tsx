import React from 'react';

interface ArohiMeetLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  taglineText?: string;
  className?: string;
  iconOnly?: boolean;
}

export const ArohiMeetLogo: React.FC<ArohiMeetLogoProps> = ({
  size = 'md',
  showTagline = true,
  taglineText = 'MEET • DECIDE • REMEMBER • ACT',
  className = '',
  iconOnly = false
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    hero: 'w-24 h-24 md:w-32 md:h-32'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    hero: 'text-3xl md:text-5xl'
  };

  const meetSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[11px] tracking-[0.3em]',
    lg: 'text-sm tracking-[0.35em]',
    hero: 'text-base md:text-xl tracking-[0.4em]'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D Radiant Squircle Emblem */}
      <div
        className={`relative ${iconSizes[size]} rounded-[26%] p-[2px] bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-900 shadow-[0_0_25px_rgba(6,182,212,0.45)] group`}
      >
        <div className="w-full h-full rounded-[24%] bg-gradient-to-b from-[#0e172e] via-[#080d1a] to-[#04060d] p-1.5 flex items-center justify-center relative overflow-hidden backdrop-blur-md">
          {/* Inner Gloss Highlights */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/25 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[45%] bg-gradient-to-b from-white/20 to-transparent rounded-t-[22%] pointer-events-none" />

          {/* Holographic Stylized 'A' + Camera Prism Ribbon Glyph */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_2px_12px_rgba(56,189,248,0.7)]"
          >
            <defs>
              <linearGradient id="meetGradRibbon" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="35%" stopColor="#38BDF8" />
                <stop offset="70%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
              <linearGradient id="prismAperture" x1="60" y1="30" x2="90" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
              <linearGradient id="sparkleGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#67E8F9" />
              </linearGradient>
            </defs>

            {/* Camera Prism / Aperture Wing */}
            <path
              d="M66 33 L85 24 C87.5 22.5 90 24.5 90 27.5 L90 58 C90 61 87.5 62.8 85 61.5 L67 52 Z"
              fill="url(#prismAperture)"
              opacity="0.9"
            />

            {/* Stylized 'A' Arch with Feminine Profile Silhouette on Left Flank */}
            <path
              d="M48 10 C32 10 18 28 17 50 C16 70 30 78 40 78 C35 72 32 64 34 54 C35 48 37 44 40 40 C43 36 42 30 38 27 C45 22 55 24 58 35 C62 46 66 62 72 73 C75 78 68 83 62 82 C55 81 50 72 48 64 L30 64 C26 73 21 80 14 83 C26 89 54 89 68 80 C80 72 74 44 64 26 C59 16 54 10 48 10 Z"
              fill="url(#meetGradRibbon)"
            />

            {/* Sparkle star atop */}
            <path
              d="M82 12 C82 17 84 19 89 19 C84 19 82 21 82 26 C82 21 80 19 75 19 C80 19 82 17 82 12 Z"
              fill="url(#sparkleGrad)"
            />
          </svg>
        </div>
      </div>

      {/* Typography Block */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1 leading-none">
            <span
              className={`font-black tracking-tight text-white ${titleSizes[size]} drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}
            >
              Arohi
            </span>
            {/* Sparkle beside text */}
            <span className="text-violet-400 text-xs md:text-sm animate-pulse">✦</span>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 ${meetSizes[size]}`}
            >
              M E E T
            </span>
          </div>

          {showTagline && (
            <p className="text-[8px] md:text-[9.5px] uppercase tracking-wider text-slate-400 font-medium mt-0.5">
              {taglineText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArohiMeetLogo;
