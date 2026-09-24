import React from 'react';

interface SakshamProductArtProps {
  category: 'smart-iot' | 'classic-cane' | 'premium-cane' | 'all-in-one' | 'bulk-kit';
  modelCode: string;
  className?: string;
}

export const SakshamProductArt: React.FC<SakshamProductArtProps> = ({
  category,
  modelCode,
  className = 'w-full h-56'
}) => {
  switch (category) {
    case 'smart-iot':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-900 via-zinc-900 to-black rounded-2xl p-6 overflow-hidden select-none border border-slate-800 shadow-inner ${className}`}>
          {/* Subtle radar sonar wave animations */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-64 h-64 rounded-full border border-cyan-400/40 animate-ping duration-1000"></div>
            <div className="w-48 h-48 rounded-full border border-blue-500/50"></div>
            <div className="w-32 h-32 rounded-full border border-cyan-300/60"></div>
          </div>

          <svg viewBox="0 0 320 220" className="w-full h-full max-h-52 drop-shadow-2xl">
            <defs>
              <linearGradient id="iotBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#27272a" />
                <stop offset="50%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>
              <linearGradient id="iotAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <linearGradient id="sensorGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="lanyardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Lanyard Strap */}
            <path
              d="M 120 40 C 140 10, 200 10, 220 50 C 230 70, 210 90, 195 85"
              fill="none"
              stroke="url(#lanyardGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="4 2"
              opacity="0.85"
            />

            {/* Main Ergonomic Device Body (Modeled faithfully after the DLI010 flyer photo) */}
            <path
              d="M 110 65 
                 C 140 55, 190 60, 205 85 
                 C 220 110, 225 145, 200 180 
                 C 185 200, 140 205, 115 190 
                 C 95 178, 85 140, 92 110 
                 C 96 90, 100 70, 110 65 Z"
              fill="url(#iotBody)"
              stroke="#3f3f46"
              strokeWidth="3"
            />

            {/* High-Grip Textured Contour */}
            <path
              d="M 95 110 Q 100 135 105 160"
              fill="none"
              stroke="#52525b"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 103 112 Q 108 135 112 158"
              fill="none"
              stroke="#52525b"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Dual Sonar Transducer Eyes (Left Side Sensors) */}
            <circle cx="120" cy="115" r="14" fill="#09090b" stroke="#71717a" strokeWidth="2.5" />
            <circle cx="120" cy="115" r="8" fill="url(#sensorGlow)" />
            <circle cx="120" cy="115" r="3" fill="#ffffff" opacity="0.9" />

            <circle cx="125" cy="155" r="14" fill="#09090b" stroke="#71717a" strokeWidth="2.5" />
            <circle cx="125" cy="155" r="8" fill="url(#sensorGlow)" />
            <circle cx="125" cy="155" r="3" fill="#ffffff" opacity="0.9" />

            {/* Sonar Acoustic Waves Emitted */}
            <path d="M 85 105 C 75 115, 75 125, 85 135" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M 70 95 C 55 115, 55 135, 70 155" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M 55 85 C 35 115, 35 145, 55 175" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

            {/* Red Arohi Care Branding on Device */}
            <text x="160" y="132" fill="#ef4444" fontSize="11" fontWeight="900" transform="rotate(75, 160, 132)" letterSpacing="1">
              Arohi Care
            </text>

            {/* Tactile Mode Button & Power LED */}
            <rect x="175" y="90" width="16" height="24" rx="6" fill="#27272a" stroke="#71717a" strokeWidth="1.5" />
            <circle cx="183" cy="98" r="2.5" fill="#22c55e" />
            <circle cx="183" cy="106" r="2.5" fill="#eab308" />

            {/* 100-Hour Battery & Sonar Badge Callouts */}
            <g transform="translate(210, 120)">
              <rect x="0" y="0" width="85" height="24" rx="6" fill="#18181b" stroke="#0284c7" strokeWidth="1" />
              <text x="8" y="16" fill="#38bdf8" fontSize="10" fontWeight="bold">100H BATTERY</text>
            </g>
            <g transform="translate(210, 155)">
              <rect x="0" y="0" width="85" height="24" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1" />
              <text x="8" y="16" fill="#f87171" fontSize="10" fontWeight="bold">SONAR RADAR</text>
            </g>
          </svg>

          {/* Model Pill Tag */}
          <div className="absolute bottom-3 left-3 bg-red-600/90 text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded shadow">
            MODEL: {modelCode}
          </div>
          <div className="absolute top-3 right-3 bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded">
            IoT Sonar Tech
          </div>
        </div>
      );

    case 'classic-cane':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-slate-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl p-6 overflow-hidden select-none border border-slate-200 dark:border-zinc-800 ${className}`}>
          <svg viewBox="0 0 320 220" className="w-full h-full max-h-52 drop-shadow-md">
            <defs>
              <linearGradient id="alumShaft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="caneGrip" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#27272a" />
              </linearGradient>
            </defs>

            {/* Folded 4 Segments (Faithfully representing DLC010 from flyer) */}
            {/* Segment 1 (Handle + Top Tube) */}
            <g transform="translate(60, 40)">
              {/* Handle Grip */}
              <rect x="0" y="0" width="16" height="55" rx="4" fill="url(#caneGrip)" stroke="#09090b" strokeWidth="1" />
              {/* Grip Texture lines */}
              <line x1="0" y1="15" x2="16" y2="15" stroke="#3f3f46" strokeWidth="1" />
              <line x1="0" y1="25" x2="16" y2="25" stroke="#3f3f46" strokeWidth="1" />
              <line x1="0" y1="35" x2="16" y2="35" stroke="#3f3f46" strokeWidth="1" />
              <line x1="0" y1="45" x2="16" y2="45" stroke="#3f3f46" strokeWidth="1" />
              {/* Wrist loop */}
              <path d="M 8 0 C 8 -25, -20 -15, -15 15 C -12 30, 2 10, 8 5" fill="none" stroke="#18181b" strokeWidth="3" />
              {/* White aluminium tube */}
              <rect x="2" y="55" width="12" height="75" rx="1" fill="url(#alumShaft)" stroke="#94a3b8" strokeWidth="1" />
              {/* Joint sleeve connector */}
              <rect x="0" y="125" width="16" height="12" rx="2" fill="#475569" />
            </g>

            {/* Elastic Shock Cord joining segments */}
            <path d="M 68 175 C 68 200, 110 200, 110 175" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="3 1" />

            {/* Segment 2 */}
            <g transform="translate(102, 50)">
              <rect x="0" y="0" width="16" height="12" rx="2" fill="#475569" />
              <rect x="2" y="12" width="12" height="115" rx="1" fill="url(#alumShaft)" stroke="#94a3b8" strokeWidth="1" />
              <rect x="0" y="127" width="16" height="12" rx="2" fill="#475569" />
            </g>

            {/* Elastic Shock Cord 2 */}
            <path d="M 110 45 C 110 20, 155 20, 155 45" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="3 1" />

            {/* Segment 3 */}
            <g transform="translate(147, 50)">
              <rect x="0" y="0" width="16" height="12" rx="2" fill="#475569" />
              <rect x="2" y="12" width="12" height="115" rx="1" fill="url(#alumShaft)" stroke="#94a3b8" strokeWidth="1" />
              <rect x="0" y="127" width="16" height="12" rx="2" fill="#475569" />
            </g>

            {/* Elastic Shock Cord 3 */}
            <path d="M 155 175 C 155 200, 195 200, 195 175" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="3 1" />

            {/* Segment 4 (Base + Red Reflective Tape + Wear Resistant Tip) */}
            <g transform="translate(187, 50)">
              <rect x="0" y="0" width="16" height="12" rx="2" fill="#475569" />
              <rect x="2" y="12" width="12" height="60" rx="1" fill="url(#alumShaft)" stroke="#94a3b8" strokeWidth="1" />
              {/* High visibility Red Reflective safety tape */}
              <rect x="2" y="72" width="12" height="50" fill="#dc2626" stroke="#991b1b" strokeWidth="0.5" />
              <line x1="2" y1="85" x2="14" y2="85" stroke="#fecaca" strokeWidth="1" />
              <line x1="2" y1="100" x2="14" y2="100" stroke="#fecaca" strokeWidth="1" />
              {/* Bottom Ground Tip */}
              <path d="M 2 122 L 14 122 L 11 140 L 5 140 Z" fill="#09090b" stroke="#27272a" strokeWidth="1" />
              <circle cx="8" cy="142" r="4" fill="#cbd5e1" />
            </g>

            {/* Technical Labels */}
            <g transform="translate(225, 60)">
              <rect x="0" y="0" width="85" height="22" rx="4" fill="#0284c7" opacity="0.9" />
              <text x="8" y="15" fill="#ffffff" fontSize="9" fontWeight="bold">4 SEGMENTS</text>
            </g>
            <g transform="translate(225, 95)">
              <rect x="0" y="0" width="85" height="22" rx="4" fill="#059669" opacity="0.9" />
              <text x="8" y="15" fill="#ffffff" fontSize="9" fontWeight="bold">170g WEIGHT</text>
            </g>
            <g transform="translate(225, 130)">
              <rect x="0" y="0" width="85" height="22" rx="4" fill="#dc2626" opacity="0.9" />
              <text x="8" y="15" fill="#ffffff" fontSize="9" fontWeight="bold">RED REFLECTOR</text>
            </g>
          </svg>

          <div className="absolute bottom-3 left-3 bg-blue-600 text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded shadow">
            MODEL: {modelCode}
          </div>
          <div className="absolute top-3 right-3 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
            120cm · 4-Fold · Industrial Alloy
          </div>
        </div>
      );

    case 'premium-cane':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-amber-500/10 via-zinc-900 to-black rounded-2xl p-6 overflow-hidden select-none border border-amber-500/20 shadow-inner ${className}`}>
          <svg viewBox="0 0 320 220" className="w-full h-full max-h-52 drop-shadow-xl">
            <defs>
              <linearGradient id="ionizedMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="35%" stopColor="#e2e8f0" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="brassBush" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="pouchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>
            </defs>

            {/* Travel Carrying Pouch (DLC02D accessory shown on left) */}
            <g transform="translate(25, 45)">
              <rect x="0" y="0" width="38" height="135" rx="8" fill="url(#pouchGrad)" stroke="#52525b" strokeWidth="1.5" />
              <line x1="19" y1="10" x2="19" y2="125" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="19" cy="15" r="4" fill="#a1a1aa" />
              <text x="19" y="80" fill="#a1a1aa" fontSize="8" fontWeight="bold" transform="rotate(-90, 19, 80)" textAnchor="middle">
                POUCH CASE
              </text>
            </g>

            {/* Premium 5/6-Fold Canes with Ionized Bush Joint connectors */}
            <g transform="translate(85, 30)">
              {/* Handle */}
              <rect x="0" y="0" width="14" height="50" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
              <path d="M 7 -5 C -8 -5, -8 15, 7 10" fill="none" stroke="#f59e0b" strokeWidth="2" />
              {/* Shaft */}
              <rect x="1.5" y="50" width="11" height="85" fill="url(#ionizedMetal)" stroke="#64748b" strokeWidth="0.8" />
              {/* Precision Brass Bush Joint */}
              <rect x="-0.5" y="135" width="15" height="14" rx="2" fill="url(#brassBush)" stroke="#78350f" strokeWidth="1" />
            </g>

            <g transform="translate(115, 45)">
              <rect x="-0.5" y="0" width="15" height="14" rx="2" fill="url(#brassBush)" stroke="#78350f" strokeWidth="1" />
              <rect x="1.5" y="14" width="11" height="110" fill="url(#ionizedMetal)" stroke="#64748b" strokeWidth="0.8" />
              <rect x="-0.5" y="124" width="15" height="14" rx="2" fill="url(#brassBush)" stroke="#78350f" strokeWidth="1" />
            </g>

            <g transform="translate(145, 45)">
              <rect x="-0.5" y="0" width="15" height="14" rx="2" fill="url(#brassBush)" stroke="#78350f" strokeWidth="1" />
              <rect x="1.5" y="14" width="11" height="110" fill="url(#ionizedMetal)" stroke="#64748b" strokeWidth="0.8" />
              <rect x="-0.5" y="124" width="15" height="14" rx="2" fill="url(#brassBush)" stroke="#78350f" strokeWidth="1" />
            </g>

            <g transform="translate(175, 45)">
              <rect x="-0.5" y="0" width="15" height="14" rx="2" fill="url(#brassBush)" stroke="#78350f" strokeWidth="1" />
              <rect x="1.5" y="14" width="11" height="55" fill="url(#ionizedMetal)" stroke="#64748b" strokeWidth="0.8" />
              {/* High Visibility Ionized Red Guidance Tape */}
              <rect x="1.5" y="69" width="11" height="55" fill="#dc2626" stroke="#991b1b" strokeWidth="0.5" />
              <line x1="1.5" y1="85" x2="12.5" y2="85" stroke="#fecaca" strokeWidth="1" />
              <line x1="1.5" y1="105" x2="12.5" y2="105" stroke="#fecaca" strokeWidth="1" />
              {/* Rolling Glide Tip */}
              <circle cx="7" cy="132" r="7" fill="#ffffff" stroke="#09090b" strokeWidth="2" />
            </g>

            {/* Bush Joint Callout */}
            <g transform="translate(205, 55)">
              <rect x="0" y="0" width="105" height="24" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1" />
              <text x="8" y="16" fill="#fbbf24" fontSize="9" fontWeight="bold">PRECISION BUSHES</text>
            </g>
            <g transform="translate(205, 90)">
              <rect x="0" y="0" width="105" height="24" rx="6" fill="#18181b" stroke="#38bdf8" strokeWidth="1" />
              <text x="8" y="16" fill="#7dd3fc" fontSize="9" fontWeight="bold">IONIZED COATING</text>
            </g>
            <g transform="translate(205, 125)">
              <rect x="0" y="0" width="105" height="24" rx="6" fill="#18181b" stroke="#e11d48" strokeWidth="1" />
              <text x="8" y="16" fill="#fda4af" fontSize="9" fontWeight="bold">4 SIZES AVAILABLE</text>
            </g>
          </svg>

          <div className="absolute bottom-3 left-3 bg-amber-600 text-slate-950 font-mono text-xs font-bold px-2.5 py-0.5 rounded shadow">
            SERIES: {modelCode}
          </div>
          <div className="absolute top-3 right-3 text-amber-400/90 text-[11px] font-mono">
            DLC02A / B / C / D
          </div>
        </div>
      );

    case 'all-in-one':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-indigo-950 via-slate-900 to-black rounded-2xl p-6 overflow-hidden select-none border border-indigo-500/30 shadow-inner ${className}`}>
          <svg viewBox="0 0 320 220" className="w-full h-full max-h-52 drop-shadow-2xl">
            <defs>
              <linearGradient id="allInOneShaft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#e0e7ff" />
                <stop offset="100%" stopColor="#a5b4fc" />
              </linearGradient>
              <linearGradient id="ledBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Active Forward LED Flashlight Beam */}
            <polygon points="120,48 240,-10 280,70" fill="url(#ledBeam)" />

            {/* Smart Handle with Forward LED Light Housing */}
            <g transform="translate(70, 30)">
              {/* Ergonomic Contour Handle */}
              <path
                d="M 0 15 
                   C 10 -5, 45 -5, 55 12 
                   C 58 18, 52 30, 42 26 
                   C 32 22, 22 25, 15 32 
                   C 10 38, 5 35, 0 15 Z"
                fill="#18181b"
                stroke="#4338ca"
                strokeWidth="2"
              />
              {/* LED Head Lens */}
              <circle cx="50" cy="18" r="7" fill="#fef08a" stroke="#ffffff" strokeWidth="2" />
              <circle cx="50" cy="18" r="3" fill="#ffffff" />
              {/* Power Toggle Switch */}
              <rect x="22" y="8" width="10" height="6" rx="2" fill="#22c55e" />
              {/* Wrist Strap */}
              <path d="M 0 15 C -15 15, -15 45, -2 40" fill="none" stroke="#6366f1" strokeWidth="2.5" />
            </g>

            {/* Foldable Shaft Segment */}
            <g transform="translate(100, 60)">
              <rect x="0" y="0" width="14" height="70" fill="url(#allInOneShaft)" stroke="#6366f1" strokeWidth="1" />
              {/* Joint Bush Lock */}
              <rect x="-1" y="70" width="16" height="12" rx="2" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
              {/* Red Reflective Strip */}
              <rect x="0" y="82" width="14" height="40" fill="#ef4444" />
              <line x1="0" y1="95" x2="14" y2="95" stroke="#ffffff" strokeWidth="1" />
              <line x1="0" y1="108" x2="14" y2="108" stroke="#ffffff" strokeWidth="1" />
            </g>

            {/* Multi-Terrain Roller Tip Assembly */}
            <g transform="translate(93, 182)">
              {/* Heavy-duty housing */}
              <path d="M 12 0 L 16 0 L 22 10 L 6 10 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
              {/* 360-degree rolling ball base */}
              <circle cx="14" cy="18" r="12" fill="#f8fafc" stroke="#312e81" strokeWidth="2" />
              <circle cx="14" cy="18" r="7" fill="#cbd5e1" opacity="0.6" />
              {/* Roller rotation arrows */}
              <path d="M 2 18 C 2 12, 8 8, 14 8" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Feature Callouts */}
            <g transform="translate(160, 80)">
              <rect x="0" y="0" width="145" height="24" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
              <text x="8" y="16" fill="#c7d2fe" fontSize="9" fontWeight="bold">💡 FORWARD LED LIGHT</text>
            </g>
            <g transform="translate(160, 115)">
              <rect x="0" y="0" width="145" height="24" rx="6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1" />
              <text x="8" y="16" fill="#bae6fd" fontSize="9" fontWeight="bold">🔄 MULTI-TERRAIN ROLLER</text>
            </g>
            <g transform="translate(160, 150)">
              <rect x="0" y="0" width="145" height="24" rx="6" fill="#1e1b4b" stroke="#34d399" strokeWidth="1" />
              <text x="8" y="16" fill="#a7f3d0" fontSize="9" fontWeight="bold">🛡️ 4 TYPES IN 1 CANE</text>
            </g>
          </svg>

          <div className="absolute bottom-3 left-3 bg-indigo-600 text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded shadow">
            MODEL: {modelCode}
          </div>
          <div className="absolute top-3 right-3 text-indigo-300 text-[11px] font-semibold">
            All-In-One Mobility
          </div>
        </div>
      );

    case 'bulk-kit':
    default:
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-b from-emerald-950 via-slate-900 to-black rounded-2xl p-6 overflow-hidden select-none border border-emerald-500/30 shadow-inner ${className}`}>
          <svg viewBox="0 0 320 220" className="w-full h-full max-h-52 drop-shadow-xl">
            {/* Master Box Pack */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="240" height="130" rx="8" fill="#132a13" stroke="#22c55e" strokeWidth="1.5" />
              <rect x="10" y="10" width="220" height="110" rx="6" fill="#0f172a" stroke="#166534" strokeWidth="1" />

              {/* Inside kit components displayed */}
              {/* Mini Sonar IoT device */}
              <rect x="25" y="25" width="45" height="65" rx="6" fill="#27272a" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="47" cy="42" r="5" fill="#38bdf8" />
              <circle cx="47" cy="58" r="5" fill="#38bdf8" />
              <text x="47" y="78" fill="#f87171" fontSize="7" fontWeight="bold" textAnchor="middle">DLI010</text>

              {/* Mini Canes Bundle */}
              <rect x="85" y="25" width="12" height="80" rx="2" fill="#f8fafc" stroke="#dc2626" strokeWidth="1" />
              <rect x="102" y="25" width="12" height="80" rx="2" fill="#f8fafc" stroke="#f59e0b" strokeWidth="1" />
              <rect x="119" y="25" width="12" height="80" rx="2" fill="#f8fafc" stroke="#6366f1" strokeWidth="1" />

              {/* Official Seal / ADIP Stamp */}
              <circle cx="175" cy="55" r="22" fill="#15803d" stroke="#86efac" strokeWidth="1.5" />
              <text x="175" y="52" fill="#ffffff" fontSize="7" fontWeight="900" textAnchor="middle">ADIP</text>
              <text x="175" y="62" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">SCHEME</text>

              {/* Partner Badging */}
              <text x="175" y="95" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">
                ODITREE
              </text>
              <text x="175" y="105" fill="#6ee7b7" fontSize="7" textAnchor="middle">
                Bulk Supply Kit
              </text>
            </g>
          </svg>

          <div className="absolute bottom-3 left-3 bg-emerald-600 text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded shadow">
            KIT: {modelCode}
          </div>
          <div className="absolute top-3 right-3 text-emerald-300 text-[11px] font-semibold">
            Institutional ADIP Pack
          </div>
        </div>
      );
  }
};
