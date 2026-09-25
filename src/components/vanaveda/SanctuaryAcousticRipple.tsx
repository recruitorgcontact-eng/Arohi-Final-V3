import React, { useEffect, useState } from 'react';

interface SanctuaryAcousticRippleProps {
  /** Timestamp or counter to re-trigger the ripple */
  triggerKey: number;
  /** Active drone status for subtle continuous ambient breathing */
  isDroneActive?: boolean;
}

/**
 * Subtle Meditative Acoustic Ripple Overlay for VanaVeda Sanctuary
 * Emanates concentric sound waves across the screen when the Temple Bell & Tanpura drone are toggled.
 * Implements subtle sacred geometry acoustic waves without obstructing any UI interaction.
 */
export const SanctuaryAcousticRipple: React.FC<SanctuaryAcousticRippleProps> = ({
  triggerKey,
  isDroneActive = false
}) => {
  const [activeRipples, setActiveRipples] = useState<number[]>([]);

  useEffect(() => {
    if (triggerKey > 0) {
      setActiveRipples(prev => [...prev.slice(-2), triggerKey]);
      const timer = setTimeout(() => {
        setActiveRipples(prev => prev.filter(k => k !== triggerKey));
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [triggerKey]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Active Chime Wavefronts */}
      {activeRipples.map((key) => (
        <div key={key} className="absolute inset-0">
          {/* Ambient Screen Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.04] via-emerald-500/[0.02] to-transparent animate-sanctuary-sweep" />

          {/* Primary Acoustic Wavefront radiating from top-right Temple Bell controls */}
          <div className="absolute -top-32 right-12 sm:right-32 w-96 h-96 rounded-full border border-amber-400/40 dark:border-amber-300/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] animate-sanctuary-wave-1" />

          {/* Secondary Overtone Wavefront */}
          <div className="absolute -top-32 right-12 sm:right-32 w-96 h-96 rounded-full border border-emerald-500/30 dark:border-emerald-400/25 shadow-[0_0_60px_rgba(16,185,129,0.15)] animate-sanctuary-wave-2" />

          {/* Tertiary Deep Resonance Wavefront */}
          <div className="absolute -top-32 right-12 sm:right-32 w-96 h-96 rounded-full border border-amber-500/20 dark:border-amber-400/15 shadow-[0_0_80px_rgba(245,158,11,0.1)] animate-sanctuary-wave-3" />
        </div>
      ))}

      {/* Subtle Continuous Ambient Breathing Aura when Tanpura Drone is Playing */}
      {isDroneActive && (
        <div
          className="absolute top-0 right-0 w-80 h-40 bg-radial from-amber-400/[0.06] via-emerald-500/[0.03] to-transparent transition-opacity duration-1000 opacity-80"
          style={{ filter: 'blur(30px)' }}
        />
      )}
    </div>
  );
};
