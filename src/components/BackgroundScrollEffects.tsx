import React, { useEffect, useRef } from 'react';

export default function BackgroundScrollEffects() {
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
          const translateY1 = (scrollY * 0.12) % 80;
          const translateY2 = (scrollY * -0.15) % 90;
          const gridOffsetY = (scrollY * 0.3) % 50;

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
      {/* 1. Animated Radial Ambient Gradient Orbs (Optimized GPU blur) */}
      <div
        ref={orb1Ref}
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-25 blur-3xl bg-gradient-to-br from-purple-700 via-indigo-800 to-cyan-600 transform-gpu will-change-transform"
      />

      <div
        ref={orb2Ref}
        className="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] rounded-full opacity-20 blur-3xl bg-gradient-to-bl from-teal-600 via-purple-900 to-emerald-700 transform-gpu will-change-transform"
      />

      <div
        ref={orb3Ref}
        className="absolute -bottom-[20%] left-[20%] w-[45vw] h-[45vw] rounded-full opacity-15 blur-3xl bg-gradient-to-tr from-fuchsia-700 via-purple-900 to-amber-600 transform-gpu will-change-transform"
      />

      {/* 2. Cyber Mesh Grid Pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.05] bg-grid-cyber transform-gpu will-change-transform"
        style={{
          backgroundSize: '60px 60px'
        }}
      />

      {/* 3. Horizon fading vignette gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[25vh] opacity-15 overflow-hidden transform-gpu pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030208] via-[#030208]/70 to-transparent" />
      </div>

      {/* 4. Drifting Floating Particles Starfield (Smooth GPU dots) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#06b6d4]" />
        <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc]" />
        <div className="absolute top-[50%] left-[8%] w-1 h-1 bg-teal-300 rounded-full shadow-[0_0_6px_#14b8a6]" />
        <div className="absolute top-[70%] right-[12%] w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
        <div className="absolute top-[85%] left-[30%] w-2 h-2 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#e879f9]" />
      </div>
    </div>
  );
}
