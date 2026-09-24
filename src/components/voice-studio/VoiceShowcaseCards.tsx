import React, { useState } from 'react';
import { HEAR_THE_DIFFERENCE_CARDS, ProofCard } from '../../data/voiceStudioData';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';
import { 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Disc
} from 'lucide-react';

interface VoiceShowcaseCardsProps {
  isDarkMode?: boolean;
}

export const VoiceShowcaseCards: React.FC<VoiceShowcaseCardsProps> = ({ isDarkMode = false }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handlePlayCard = (card: ProofCard) => {
    if (activeCardId === card.id) {
      stopArohiVoice();
      setActiveCardId(null);
      return;
    }

    const voiceToUse = card.id === 'code-switching' || card.id === 'abbreviations' ? 'Fenrir' : 'Aoede';
    const langToUse = card.id === 'pronunciation' ? 'or' : card.id === 'expressive' ? 'hi' : 'en';

    playArohiVoice(card.sampleScript, {
      voice: voiceToUse,
      language: langToUse,
      onStart: () => setActiveCardId(card.id),
      onEnd: () => setActiveCardId(null),
      onError: () => setActiveCardId(null)
    });
  };

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Hear the difference
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Expressive, accurate voices built for every Indian language. Click any card to listen.
        </p>
      </div>

      {/* 4 Interactive Audio Proof Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HEAR_THE_DIFFERENCE_CARDS.map((card) => {
          const isPlaying = activeCardId === card.id;

          return (
            <div
              key={card.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between min-h-[320px] transition-all hover:scale-[1.02] shadow-sm relative overflow-hidden group ${
                isPlaying
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg bg-emerald-50/30 dark:bg-emerald-950/20'
                  : isDarkMode
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-white border-slate-200'
              }`}
            >
              {/* Subtle Ambient Background Gradient Disc */}
              <div className={`absolute -right-8 -bottom-8 w-36 h-36 rounded-full blur-2xl transition-opacity pointer-events-none ${
                card.id === 'expressive' ? 'bg-blue-500/10' :
                card.id === 'code-switching' ? 'bg-amber-500/10' :
                card.id === 'pronunciation' ? 'bg-emerald-500/10' : 'bg-purple-500/10'
              } ${isPlaying ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'}`}></div>

              <div className="space-y-3 relative z-10 text-left">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {card.category}
                </span>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Sample Script Snippet & Playback Button */}
              <div className="pt-6 relative z-10 space-y-4">
                <div className={`p-3 rounded-xl border text-[11px] italic font-serif leading-relaxed line-clamp-2 ${
                  isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  "{card.sampleScript}"
                </div>

                <div className="flex items-center justify-between">
                  {/* Play Button */}
                  <button
                    type="button"
                    onClick={() => handlePlayCard(card)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                      isPlaying
                        ? 'bg-emerald-600 text-white animate-pulse'
                        : 'bg-black dark:bg-white text-white dark:text-black hover:scale-105'
                    }`}
                    title={isPlaying ? 'Pause Sample' : 'Play Sample'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="text-right">
                    <span className="block text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {card.badge}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {card.voiceName}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
