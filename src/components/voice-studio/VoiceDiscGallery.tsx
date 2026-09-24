import React, { useState } from 'react';
import { REGIONAL_STUDIO_VOICES, StudioVoice } from '../../data/voiceStudioData';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';
import { Play, Pause, Disc } from 'lucide-react';

interface VoiceDiscGalleryProps {
  isDarkMode?: boolean;
  onSelectVoiceForStudio?: (voice: StudioVoice) => void;
}

export const VoiceDiscGallery: React.FC<VoiceDiscGalleryProps> = ({ 
  isDarkMode = false,
  onSelectVoiceForStudio
}) => {
  const [activeVoiceId, setActiveVoiceId] = useState<string | null>(null);

  const handleTogglePlay = (voice: StudioVoice) => {
    if (activeVoiceId === voice.id) {
      stopArohiVoice();
      setActiveVoiceId(null);
      return;
    }

    const voiceToUse = voice.name === 'Arjun' || voice.name === 'Debashis' || voice.name === 'Ratan' || voice.name === 'Mani' || voice.name === 'Subrat' ? 'Fenrir' : 'Aoede';

    playArohiVoice(voice.sampleText, {
      voice: voiceToUse,
      language: voice.languageCode,
      onStart: () => setActiveVoiceId(voice.id),
      onEnd: () => setActiveVoiceId(null),
      onError: () => setActiveVoiceId(null)
    });
  };

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          35+ natural voices across every Indian language
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          From Hindi and Tamil to Odia, Gujarati, and Punjabi. Every voice trained natively on Indian speech data.
        </p>
      </div>

      {/* Grid of Tactile Vinyl Disc Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {REGIONAL_STUDIO_VOICES.map((voice) => {
          const isPlaying = activeVoiceId === voice.id;

          return (
            <div
              key={voice.id}
              className={`rounded-3xl p-5 border flex flex-col items-center justify-between text-center transition-all hover:scale-[1.03] shadow-sm relative group cursor-pointer ${
                isPlaying
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-lg'
                  : isDarkMode
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => handleTogglePlay(voice)}
            >
              {/* Tactile 3D Vinyl Audio Disc */}
              <div className="py-4 relative flex items-center justify-center">
                <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr ${voice.discGradient} p-1.5 shadow-xl relative flex items-center justify-center transition-transform ${
                  isPlaying ? 'animate-spin' : 'group-hover:rotate-6'
                }`} style={{ animationDuration: '5s' }}>
                  
                  {/* Subtle Vinyl Grooves Pattern */}
                  <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center">
                        
                        {/* Center Hub & Play/Pause Icon */}
                        <div className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-white">
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-current text-white animate-pulse" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5 text-white" />
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-1 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20">
                  {isPlaying ? 'Playing' : '0:08'}
                </span>
              </div>

              {/* Voice Name & Language Label */}
              <div className="space-y-1 w-full pt-2">
                <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  {voice.name} ({voice.language})
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {voice.tagline}
                </p>
                <span className="inline-block text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  {voice.nativeScript}
                </span>
              </div>

              {/* Quick Action: Open in Studio */}
              {onSelectVoiceForStudio && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectVoiceForStudio(voice);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-500 transition-colors"
                >
                  Use in Studio →
                </button>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
};
