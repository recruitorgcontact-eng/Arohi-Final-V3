import React, { useId } from 'react';

interface ArohiAvatarProps {
  className?: string;
}

export default function ArohiAvatar({ className = 'w-full h-full' }: ArohiAvatarProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const neonMainId = `arohi-neon-main-${uid}`;
  const bgCoreId = `arohi-bg-core-${uid}`;
  const centerGlowId = `arohi-center-glow-${uid}`;

  return (
    <div 
      className={`${className} relative select-none flex items-center justify-center shrink-0`}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-[0_0_12px_rgba(124,58,237,0.5)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={neonMainId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f3ff" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          <radialGradient id={bgCoreId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e1346" />
            <stop offset="65%" stopColor="#0f0928" />
            <stop offset="100%" stopColor="#050310" />
          </radialGradient>

          <radialGradient id={centerGlowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f0928" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Base Core Background Circle */}
        <circle cx="50" cy="50" r="47" fill={`url(#${bgCoreId})`} />

        {/* 2. Outer Cyber Glowing Ring */}
        <circle cx="50" cy="50" r="46" stroke={`url(#${neonMainId})`} strokeWidth="2" strokeOpacity="0.9" />
        <circle cx="50" cy="50" r="42" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.4" />

        {/* 3. Tech Crosshairs & Radar Grid */}
        <line x1="50" y1="12" x2="50" y2="88" stroke="#7c3aed" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="12" y1="50" x2="88" y2="50" stroke="#7c3aed" strokeWidth="0.8" strokeOpacity="0.3" />

        {/* 4. Dashed Outer Spinning Orbit */}
        <circle 
          cx="50" 
          cy="50" 
          r="35" 
          stroke="#00f3ff" 
          strokeWidth="1.2" 
          strokeDasharray="4, 5" 
          strokeOpacity="0.8"
          className="animate-spin"
          style={{ transformOrigin: 'center', animationDuration: '20s' }}
        />

        {/* 5. Inner Orbital Ellipses */}
        <ellipse 
          cx="50" 
          cy="50" 
          rx="26" 
          ry="10" 
          stroke="#e879f9" 
          strokeWidth="1" 
          strokeDasharray="3, 3" 
          strokeOpacity="0.5" 
          transform="rotate(45 50 50)" 
        />
        <ellipse 
          cx="50" 
          cy="50" 
          rx="26" 
          ry="10" 
          stroke="#00f3ff" 
          strokeWidth="1" 
          strokeDasharray="3, 3" 
          strokeOpacity="0.5" 
          transform="rotate(-45 50 50)" 
        />

        {/* 6. Constellation Nodes */}
        <circle cx="30" cy="30" r="2.5" fill="#00f3ff" className="animate-pulse" />
        <circle cx="70" cy="30" r="2.5" fill="#d946ef" />
        <circle cx="30" cy="70" r="2.5" fill="#ec4899" />
        <circle cx="70" cy="70" r="2.5" fill="#00f3ff" />

        {/* 7. Luminous Center Aura Disk */}
        <circle cx="50" cy="50" r="22" fill={`url(#${centerGlowId})`} />

        {/* 8. Bold Luminous "A" Emblem */}
        <text
          x="50"
          y="59"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="28"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{
            textShadow: '0 0 10px rgba(0,243,255,0.8), 0 0 20px rgba(217,70,239,0.8)'
          }}
          className="select-none pointer-events-none"
        >
          A
        </text>

        {/* 9. Small Orbiting Cyan Marker */}
        <g className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '5s' }}>
          <circle cx="75" cy="50" r="2.5" fill="#00f3ff" />
        </g>

        {/* 10. Active Status Green Dot (Integrated) */}
        <circle cx="78" cy="78" r="6" fill="#000000" />
        <circle cx="78" cy="78" r="4.5" fill="#00e676" className="animate-pulse" />
      </svg>
    </div>
  );
}
