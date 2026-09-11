import React from 'react';

/**
 * 3D Gradient Icon 1: Arohi One Business OS
 * Stacked isometric sheets with vibrant royal blue / sky blue lighting and gloss reflections
 */
export function Icon3DBusinessOS({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_14px_rgba(37,99,235,0.25)]">
        <defs>
          <linearGradient id="sheet-grad-1" x1="12" y1="36" x2="52" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e40af" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="sheet-grad-2" x1="12" y1="26" x2="52" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="sheet-grad-3" x1="12" y1="14" x2="52" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#93c5fd" />
          </linearGradient>
          <linearGradient id="sheet-top-gloss" x1="16" y1="16" x2="48" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Bottom layer */}
        <path d="M12 40L32 50L52 40L32 30L12 40Z" fill="url(#sheet-grad-1)" />
        <path d="M12 40L32 50V53L12 43V40Z" fill="#1e3a8a" />
        <path d="M52 40L32 50V53L52 43V40Z" fill="#1d4ed8" />
        {/* Middle layer */}
        <path d="M12 28L32 38L52 28L32 18L12 28Z" fill="url(#sheet-grad-2)" />
        <path d="M12 28L32 38V41L12 31V28Z" fill="#1e40af" />
        <path d="M52 28L32 38V41L52 31V28Z" fill="#2563eb" />
        {/* Top layer */}
        <path d="M12 16L32 26L52 16L32 6L12 16Z" fill="url(#sheet-grad-3)" />
        <path d="M12 16L32 26V29L12 19V16Z" fill="#2563eb" />
        <path d="M52 16L32 26V29L52 19V16Z" fill="#3b82f6" />
        {/* Gloss reflection on top */}
        <path d="M16 16L32 24L48 16L32 8L16 16Z" fill="url(#sheet-top-gloss)" opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * 3D Gradient Icon 2: Arohi AI Assistant
 * Glowing iridescent spherical glass orb with cyan, deep royal blue, and violet dispersion
 */
export function Icon3DAssistantOrb({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_10px_18px_rgba(37,99,235,0.35)]">
        <defs>
          <radialGradient id="orb-core" cx="32" cy="32" r="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="45%" stopColor="#1d4ed8" />
            <stop offset="75%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <radialGradient id="orb-highlight" cx="24" cy="22" r="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#67e8f9" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-rim" cx="42" cy="42" r="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
            <stop offset="80%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
          </radialGradient>
          <linearGradient id="orb-ring" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#a855f7" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {/* Core sphere */}
        <circle cx="32" cy="32" r="26" fill="url(#orb-core)" />
        {/* Iridescent outer edge reflection */}
        <circle cx="32" cy="32" r="26" fill="url(#orb-rim)" />
        {/* Outer glowing halo ring */}
        <circle cx="32" cy="32" r="25.5" stroke="url(#orb-ring)" strokeWidth="1.5" opacity="0.8" />
        {/* Specular high-light */}
        <ellipse cx="25" cy="22" rx="14" ry="10" fill="url(#orb-highlight)" transform="rotate(-25 25 22)" />
        {/* Secondary bright sparkle */}
        <circle cx="21" cy="18" r="2.5" fill="#ffffff" opacity="0.95" />
        <ellipse cx="44" cy="44" rx="8" ry="4" fill="#38bdf8" opacity="0.45" transform="rotate(-30 44 44)" />
      </svg>
    </div>
  );
}

/**
 * 3D Gradient Icon 3: Arohi Calling Agents
 * 3D glossy emerald telephone receiver with radiating sound waves
 */
export function Icon3DCallingAgents({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]">
        <defs>
          <linearGradient id="phone-grad" x1="12" y1="48" x2="38" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#059669" />
            <stop offset="0.5" stopColor="#10b981" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="wave-grad" x1="32" y1="16" x2="52" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="phone-specular" x1="18" y1="20" x2="30" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Handset depth shadow */}
        <path d="M16.5 44C20.5 48 27 49 32 44.5L28.5 39C26.5 39.5 24.5 38 23 36.5C21.5 35 20 33 20.5 31L15 27.5C10.5 32.5 11.5 39 16.5 44Z" fill="#047857" />
        {/* Handset glossy body */}
        <path d="M16 42.5C19.5 46.5 25.5 47.5 30 43.5L27 38.5C25.2 39 23.5 37.5 22.2 36.2C20.9 34.9 19.4 33.2 19.9 31.4L14.9 28.4C10.9 32.9 12 38.5 16 42.5Z" fill="url(#phone-grad)" />
        {/* Top earpiece bulb */}
        <ellipse cx="14" cy="27" rx="6" ry="4.5" fill="url(#phone-grad)" transform="rotate(-40 14 27)" />
        {/* Bottom mic bulb */}
        <ellipse cx="29" cy="42" rx="6" ry="4.5" fill="url(#phone-grad)" transform="rotate(-40 29 42)" />
        {/* Specular gloss */}
        <path d="M14 26C15 22 20 23 23 26C24 27 24 28 23 28.5" stroke="url(#phone-specular)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Radiating sound waves */}
        <path d="M38 18C44 24 44 32 38 38" stroke="url(#wave-grad)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M46 12C54 20 54 40 46 48" stroke="url(#wave-grad)" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  );
}

/**
 * 3D Gradient Icon 4: Arohi Exams
 * 3D isometric amber graduation mortarboard cap with hanging tassel
 */
export function Icon3DExamsCap({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_16px_rgba(245,158,11,0.3)]">
        <defs>
          <linearGradient id="cap-top" x1="10" y1="24" x2="54" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf24" />
            <stop offset="0.5" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="cap-under" x1="20" y1="32" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b45309" />
            <stop offset="1" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="cap-gloss" x1="16" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Skull-cap base under */}
        <path d="M22 32V42C22 47 42 47 42 42V32L32 37L22 32Z" fill="url(#cap-under)" />
        {/* 3D Rhombus Mortarboard Flat Top */}
        <path d="M10 24L32 34L54 24L32 14L10 24Z" fill="url(#cap-top)" />
        {/* 3D rim thickness edges */}
        <path d="M10 24L32 34V36.5L10 26.5V24Z" fill="#b45309" />
        <path d="M54 24L32 34V36.5L54 26.5V24Z" fill="#d97706" />
        {/* Top gloss highlight */}
        <path d="M14 24L32 32L50 24L32 16L14 24Z" fill="url(#cap-gloss)" opacity="0.45" />
        {/* Center button */}
        <circle cx="32" cy="24" r="2.5" fill="#fef3c7" />
        {/* Hanging Tassel */}
        <path d="M32 24C38 26 44 32 46 42" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
        <rect x="44.5" y="42" width="3.5" height="7" rx="1.5" fill="#f59e0b" />
      </svg>
    </div>
  );
}

/**
 * 3D Gradient Icon 5: Arohi for Institutions / Govt
 * 3D Classical Rose Neoclassical Architecture Facade
 */
export function Icon3DInstitutions({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_16px_rgba(244,63,94,0.3)]">
        <defs>
          <linearGradient id="pediment-grad" x1="12" y1="16" x2="52" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fb7185" />
            <stop offset="1" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="pillar-grad" x1="0" y1="28" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f43f5e" />
            <stop offset="1" stopColor="#be123c" />
          </linearGradient>
          <linearGradient id="base-grad" x1="10" y1="48" x2="54" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f43f5e" />
            <stop offset="1" stopColor="#9f1239" />
          </linearGradient>
        </defs>
        {/* Triangular Pediment / Roof */}
        <path d="M32 12L12 24H52L32 12Z" fill="url(#pediment-grad)" />
        <path d="M12 24H52V27H12V24Z" fill="#be123c" />
        {/* 4 Classical Pillars */}
        <rect x="15" y="27" width="5.5" height="19" rx="1.5" fill="url(#pillar-grad)" />
        <rect x="25" y="27" width="5.5" height="19" rx="1.5" fill="url(#pillar-grad)" />
        <rect x="35" y="27" width="5.5" height="19" rx="1.5" fill="url(#pillar-grad)" />
        <rect x="44.5" y="27" width="5.5" height="19" rx="1.5" fill="url(#pillar-grad)" />
        {/* Steps / Foundation Base */}
        <rect x="11" y="46" width="42" height="4" rx="1" fill="url(#base-grad)" />
        <rect x="8" y="50" width="48" height="4.5" rx="1.5" fill="#9f1239" />
      </svg>
    </div>
  );
}

/**
 * 3D Gradient Icon 6: Opportunities
 * 3D Royal Blue Team Cluster Silhouette
 */
export function Icon3DOpportunities({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_16px_rgba(59,130,246,0.3)]">
        <defs>
          <linearGradient id="opp-leader" x1="20" y1="14" x2="44" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="opp-side" x1="10" y1="20" x2="54" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {/* Left member */}
        <circle cx="20" cy="24" r="6" fill="url(#opp-side)" opacity="0.85" />
        <path d="M11 46C11 38 15 35 20 35C24 35 27 37 28 41L25 46H11Z" fill="url(#opp-side)" opacity="0.85" />
        {/* Right member */}
        <circle cx="44" cy="24" r="6" fill="url(#opp-side)" opacity="0.85" />
        <path d="M53 46C53 38 49 35 44 35C40 35 37 37 36 41L39 46H53Z" fill="url(#opp-side)" opacity="0.85" />
        {/* Central Leader member (foreground with 3D prominence) */}
        <circle cx="32" cy="19" r="7.5" fill="url(#opp-leader)" />
        <path d="M19 49C19 39 25 36 32 36C39 36 45 39 45 49H19Z" fill="url(#opp-leader)" />
        {/* Ambient specular */}
        <ellipse cx="30" cy="16" rx="3" ry="2" fill="#ffffff" opacity="0.55" />
      </svg>
    </div>
  );
}
