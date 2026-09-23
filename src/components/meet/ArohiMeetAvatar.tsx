import React from 'react';

interface ArohiMeetAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'listening' | 'ready' | 'thinking' | 'idle' | 'speaking';
  showBadge?: boolean;
  className?: string;
  pulseGlow?: boolean;
}

export const ArohiMeetAvatar: React.FC<ArohiMeetAvatarProps> = ({
  size = 'md',
  status = 'ready',
  showBadge = false,
  className = '',
  pulseGlow = true
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {/* Radiant Ambient Glow Rings */}
      {pulseGlow && (
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-60 blur-md ${
            status === 'listening' || status === 'speaking' ? 'animate-pulse scale-110' : ''
          }`}
        />
      )}

      {/* Outer Border Halo */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 shadow-[0_0_16px_rgba(6,182,212,0.4)]`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center relative">
          {/* Authentic 3D Render / Avatar representation */}
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
            alt="Arohi AI Avatar"
            className="w-full h-full object-cover object-top scale-105"
            onError={(e) => {
              // Fallback SVG portrait if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Holographic Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/30 pointer-events-none" />
        </div>
      </div>

      {/* Status Indicator Dot / Badge */}
      {showBadge && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              status === 'listening'
                ? 'bg-cyan-400'
                : status === 'speaking'
                ? 'bg-emerald-400'
                : 'bg-purple-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 border-2 border-slate-950 ${
              status === 'listening'
                ? 'bg-cyan-400'
                : status === 'speaking'
                ? 'bg-emerald-400'
                : 'bg-purple-400'
            }`}
          />
        </span>
      )}
    </div>
  );
};

export default ArohiMeetAvatar;
