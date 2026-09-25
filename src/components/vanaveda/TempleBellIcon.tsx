import React from 'react';

interface TempleBellIconProps {
  isRinging?: boolean;
  isDroneActive?: boolean;
  className?: string;
  size?: number;
}

/**
 * Traditional Indian Bronze Temple Bell (घण्टा / ଘଣ୍ଟା)
 * Digitized with classical geometry: Suspension bail, lotus kalasam dome,
 * flared resonant bronze rim, internal clapper, and sacred acoustic vibration aura.
 */
export const TempleBellIcon: React.FC<TempleBellIconProps> = ({
  isRinging = false,
  isDroneActive = false,
  className = '',
  size = 20
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        isRinging ? 'animate-temple-bell-ring' : ''
      } ${isDroneActive && !isRinging ? 'animate-temple-drone-glow' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        transformOrigin: '50% 12%'
      }}
      aria-label="Sacred Temple Bell"
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300 overflow-visible"
      >
        <defs>
          {/* Bronze Bell Body Metallic Gradient */}
          <linearGradient id="templeBronzeGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />    {/* Shimmer Gold */}
            <stop offset="25%" stopColor="#F59E0B" />   {/* Warm Amber */}
            <stop offset="65%" stopColor="#D97706" />   {/* Deep Temple Bronze */}
            <stop offset="100%" stopColor="#92400E" />  {/* Aged Copper/Brass */}
          </linearGradient>

          {/* Active Radiance Aura */}
          <radialGradient id="sacredBellAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Aura Ring during Active Tanpura Drone or Ringing */}
        {(isDroneActive || isRinging) && (
          <circle
            cx="12"
            cy="13"
            r="10"
            fill="url(#sacredBellAura)"
            className={isRinging ? 'animate-ping opacity-60' : 'opacity-40 animate-pulse'}
          />
        )}

        {/* Top Hanging Bail / Suspension Loop */}
        <path
          d="M10 3.5C10 2.4 10.9 1.5 12 1.5C13.1 1.5 14 2.4 14 3.5V4.5H10V3.5Z"
          stroke="url(#templeBronzeGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#B45309"
          fillOpacity="0.4"
        />

        {/* Top Ornamental Finial Bead (Kalasa / Chhatra) */}
        <circle
          cx="12"
          cy="5"
          r="1.25"
          fill="url(#templeBronzeGradient)"
          stroke="#92400E"
          strokeWidth="0.5"
        />

        {/* Main Sacred Bell Dome (Sacred Ghanta Curve) */}
        <path
          d="M6 16.5C6 16.5 6.5 11 9.5 8C10.5 7 11.2 6.5 12 6.5C12.8 6.5 13.5 7 14.5 8C17.5 11 18 16.5 18 16.5C18.8 17.5 19.5 18 19.5 18.5C19.5 19.2 18.8 19.5 12 19.5C5.2 19.5 4.5 19.2 4.5 18.5C4.5 18 5.2 17.5 6 16.5Z"
          fill="url(#templeBronzeGradient)"
          stroke="#78350F"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Decorative Engraved Belt around the Bell Waist */}
        <path
          d="M7.8 14.5C9.5 15.2 14.5 15.2 16.2 14.5"
          stroke="#FEF3C7"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />

        {/* Bell Internal Bronze Clapper (Lolakam) with Swing Physics */}
        <g
          className={isRinging ? 'animate-pulse' : ''}
          style={{
            transformOrigin: '12px 18px',
            transform: isRinging ? 'translateX(-0.75px)' : 'none'
          }}
        >
          {/* Clapper Stem */}
          <line
            x1="12"
            y1="18.5"
            x2="12"
            y2="21.5"
            stroke="#92400E"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Clapper Weighted Bronze Ball */}
          <circle
            cx="12"
            cy="21.5"
            r="1.6"
            fill="url(#templeBronzeGradient)"
            stroke="#78350F"
            strokeWidth="0.6"
          />
        </g>

        {/* Resonant Acoustic Vibrational Waves (Rendered when Chime is Triggered) */}
        {isRinging && (
          <>
            <path
              d="M3 13C2 14.5 2 16.5 3 18"
              stroke="#F59E0B"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="opacity-80 animate-ping"
            />
            <path
              d="M21 13C22 14.5 22 16.5 21 18"
              stroke="#F59E0B"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="opacity-80 animate-ping"
            />
          </>
        )}
      </svg>
    </div>
  );
};
