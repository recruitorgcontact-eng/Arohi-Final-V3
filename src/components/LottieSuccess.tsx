import React from 'react';
import Lottie from 'lottie-react';
import { CheckCircle2, Sparkles, X, ArrowRight, ShieldCheck } from 'lucide-react';

// Embedded light Lottie animation JSON for 100% reliable offline success checkmark burst
export const successLottieAnimationData = {
  v: "5.7.8",
  fr: 60,
  ip: 0,
  op: 90,
  w: 200,
  h: 200,
  nm: "Success Checkmark Lottie",
  ddd: 0,
  assets: [],
  layers: [
    // Layer 1: Confetti / Spark Particles
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Spark 1",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], h: 1 },
            { t: 15, s: [100], h: 1 },
            { t: 45, s: [100], h: 1 },
            { t: 60, s: [0], h: 1 }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 10, s: [0, 0, 100] },
            { t: 35, s: [120, 120, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [12, 12] },
              p: { a: 0, k: [0, -75] },
              nm: "Dot 1"
            },
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [10, 10] },
              p: { a: 0, k: [65, -35] },
              nm: "Dot 2"
            },
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [10, 10] },
              p: { a: 0, k: [-65, -35] },
              nm: "Dot 3"
            },
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [12, 12] },
              p: { a: 0, k: [50, 50] },
              nm: "Dot 4"
            },
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [12, 12] },
              p: { a: 0, k: [-50, 50] },
              nm: "Dot 5"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.13, 0.77, 0.36, 1] }, // Emerald / Green
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },
    // Layer 2: Checkmark Path
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Checkmark",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 10, s: [0, 0, 100] },
            { t: 25, s: [115, 115, 100] },
            { t: 35, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-28, 2], [-8, 22], [30, -18]],
                  c: false
                }
              }
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 1, 1, 1] }, // White checkmark
              o: { a: 0, k: 100 },
              w: { a: 0, k: 10 },
              lc: 2,
              lj: 2
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },
    // Layer 3: Main Gradient Circle
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0, 100] },
            { t: 20, s: [110, 110, 100] },
            { t: 30, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [110, 110] },
              p: { a: 0, k: [0, 0] }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.08, 0.72, 0.38, 1] }, // Emerald Success Green
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    }
  ]
};

export interface LottieSuccessProps {
  size?: number;
  loop?: boolean;
}

export const LottieSuccessAnimation: React.FC<LottieSuccessProps> = ({ size = 120, loop = false }) => {
  return (
    <div className="relative flex items-center justify-center pointer-events-none" style={{ width: size, height: size }}>
      {/* Background radial glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
      <Lottie
        animationData={successLottieAnimationData}
        loop={loop}
        autoplay={true}
        aria-hidden="true"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export interface LottieSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  details?: { label: string; value: string }[];
  buttonText?: string;
  badgeText?: string;
}

export const LottieSuccessModal: React.FC<LottieSuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Payment & Purchase Confirmed!",
  message = "Your Arohi AI Premium plan has been successfully activated with all pro features.",
  details,
  buttonText = "Continue to Dashboard",
  badgeText = "VERIFIED SUCCESS"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03010a]/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#130b2e] via-[#0d0721] to-[#060312] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(16,185,129,0.3)] my-auto text-center overflow-hidden">
        
        {/* Top Decorative Laser */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-[#1a1140] border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all active:scale-95 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lottie Animation Header */}
        <div className="flex justify-center mb-2">
          <LottieSuccessAnimation size={140} loop={false} />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{badgeText}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          {title}
        </h3>

        {/* Subtitle Message */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 max-w-xs mx-auto">
          {message}
        </p>

        {/* Key details list if provided */}
        {details && details.length > 0 && (
          <div className="bg-[#080418]/80 border border-emerald-500/20 rounded-2xl p-3.5 mb-6 text-left space-y-2 text-xs font-mono">
            {details.map((d, i) => (
              <div key={i} className="flex justify-between items-center gap-2 border-b border-slate-800/80 last:border-0 pb-1.5 last:pb-0">
                <span className="text-slate-400 font-sans font-medium text-[11px]">{d.label}:</span>
                <span className="text-emerald-300 font-bold truncate max-w-[190px]">{d.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-[0_4px_25px_rgba(16,185,129,0.4)] cursor-pointer transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
