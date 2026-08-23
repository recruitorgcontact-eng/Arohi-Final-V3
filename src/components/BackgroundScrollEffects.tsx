import React, { useEffect, useRef } from 'react';

interface BackgroundScrollEffectsProps {
  isDarkMode?: boolean;
}

export default function BackgroundScrollEffects({ isDarkMode = true }: BackgroundScrollEffectsProps) {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const translateY1 = (scrollY * 0.08) % 60;
          const translateY2 = (scrollY * -0.1) % 70;
          const gridOffsetY = (scrollY * 0.2) % 40;

          if (orb1Ref.current) {
            orb1Ref.current.style.transform = `translate3d(0, ${translateY1}px, 0)`;
          }
          if (orb2Ref.current) {
            orb2Ref.current.style.transform = `translate3d(0, ${translateY2}px, 0)`;
          }
          if (orb3Ref.current) {
            orb3Ref.current.style.transform = `translate3d(0, ${translateY1 * -0.5}px, 0)`;
          }
          if (gridRef.current) {
            gridRef.current.style.transform = `translate3d(0, ${gridOffsetY}px, 0)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none aria-hidden:true transform-gpu">
      {/* 1. Ultra-Smooth Ambient Atmosphere Orbs (Wide 120px blur for zero hard edges) */}
      <div
        ref={orb1Ref}
        className={`absolute -top-[15%] -left-[10%] w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] rounded-full blur-[120px] transform-gpu will-change-transform transition-opacity duration-700 ${
          isDarkMode
            ? 'opacity-15 bg-gradient-to-br from-purple-800 via-indigo-900 to-cyan-900'
            : 'opacity-5 bg-gradient-to-br from-purple-400 via-indigo-300 to-sky-300'
        }`}
      />

      <div
        ref={orb2Ref}
        className={`absolute top-[40%] -right-[15%] w-[55vw] max-w-[650px] h-[55vw] max-h-[650px] rounded-full blur-[140px] transform-gpu will-change-transform transition-opacity duration-700 ${
          isDarkMode
            ? 'opacity-15 bg-gradient-to-bl from-teal-800 via-purple-950 to-emerald-900'
            : 'opacity-5 bg-gradient-to-bl from-teal-300 via-purple-200 to-emerald-200'
        }`}
      />

      <div
        ref={orb3Ref}
        className={`absolute -bottom-[15%] left-[5%] w-[45vw] max-w-[500px] h-[45vw] max-h-[500px] rounded-full blur-[120px] transform-gpu will-change-transform transition-opacity duration-700 ${
          isDarkMode
            ? 'opacity-15 bg-gradient-to-tr from-fuchsia-900 via-purple-950 to-amber-900'
            : 'opacity-5 bg-gradient-to-tr from-fuchsia-300 via-purple-200 to-amber-200'
        }`}
      />

      {/* 2. Cyber Mesh Grid Pattern */}
      <div
        ref={gridRef}
        className={`absolute inset-0 bg-grid-cyber transform-gpu will-change-transform transition-opacity duration-500 ${
          isDarkMode ? 'opacity-[0.03]' : 'opacity-[0.015]'
        }`}
        style={{
          backgroundSize: '60px 60px'
        }}
      />

      {/* 3. Horizon fading vignette gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[25vh] opacity-20 overflow-hidden transform-gpu pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDarkMode 
            ? 'from-[#070814] via-[#070814]/80 to-transparent' 
            : 'from-[#f8f9fe] via-[#f8f9fe]/80 to-transparent'
        }`} />
      </div>

      {/* 4. Drifting Floating Particles Starfield (Subtle in dark mode, hidden in light mode) */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
        isDarkMode ? 'opacity-25' : 'opacity-0'
      }`}>
        <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#06b6d4]" />
        <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc]" />
        <div className="absolute top-[50%] left-[8%] w-1 h-1 bg-teal-300 rounded-full shadow-[0_0_6px_#14b8a6]" />
        <div className="absolute top-[70%] right-[12%] w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
        <div className="absolute top-[85%] left-[30%] w-2 h-2 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#e879f9]" />
      </div>
    </div>
  );
}
