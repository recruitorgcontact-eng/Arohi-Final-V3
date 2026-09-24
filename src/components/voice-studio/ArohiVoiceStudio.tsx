import React, { useState } from 'react';
import { TextToSpeechTab } from './tabs/TextToSpeechTab';
import { VoiceCloningTab } from './tabs/VoiceCloningTab';
import { DubbingTab } from './tabs/DubbingTab';
import { SpeechToTextTab } from './tabs/SpeechToTextTab';
import { MusicTab } from './tabs/MusicTab';
import { VoiceShowcaseCards } from './VoiceShowcaseCards';
import { VoiceDiscGallery } from './VoiceDiscGallery';
import { SovereignVoicePricing } from './SovereignVoicePricing';
import { 
  PRODUCTION_USE_CASES, 
  StudioVoice 
} from '../../data/voiceStudioData';
import { playArohiVoice } from '../../utils/arohiVoicePlayer';
import { 
  Volume2, 
  Sparkles, 
  Headphones, 
  Film, 
  Mic, 
  Music, 
  FileText, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Play,
  Share2
} from 'lucide-react';

interface ArohiVoiceStudioProps {
  isDarkMode?: boolean;
  onNavigateTab?: (tab: string) => void;
}

export type VoiceStudioSubTab = 'tts' | 'cloning' | 'dubbing' | 'stt' | 'music';

export const ArohiVoiceStudio: React.FC<ArohiVoiceStudioProps> = ({ 
  isDarkMode = false,
  onNavigateTab 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<VoiceStudioSubTab>('tts');
  const [activeUseCaseAudio, setActiveUseCaseAudio] = useState<string | null>(null);

  const handlePlayUseCase = (useCaseId: string, text: string) => {
    setActiveUseCaseAudio(useCaseId);
    playArohiVoice(text, {
      voice: 'Aoede',
      onEnd: () => setActiveUseCaseAudio(null),
      onError: () => setActiveUseCaseAudio(null)
    });
  };

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-[#06090e] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Banner & Platform Badge */}
      <section className={`border-b py-2 px-4 text-center text-xs font-semibold ${
        isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-900 dark:text-white">Arohi Voice Labs™</span>
            <span className="text-slate-400">· Sovereign Indic Neural Speech Studio</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>24kHz HD Audio</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">11+ Indian Languages</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-emerald-500 font-bold">Sub-150ms Streaming</span>
          </div>
        </div>
      </section>

      {/* Main Studio Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Studio Hero */}
        <header className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Bringing technology to life
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Powering the best enterprises, creators, and developers across Bharat. From Voice Agents for customer experience, to AI Dubbing, Voice Cloning, and the leading Indic AI voice generator.
          </p>

          {/* Sub-Product Pill Bar */}
          <div className="pt-6 flex justify-center">
            <div className={`p-1.5 rounded-full border shadow-lg backdrop-blur-md flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/95 border-slate-200'
            }`}>
              
              <button
                type="button"
                onClick={() => setActiveSubTab('tts')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeSubTab === 'tts'
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🎙️</span>
                <span>Text to Speech</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('cloning')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeSubTab === 'cloning'
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🧬</span>
                <span>Voice Cloning</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('dubbing')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeSubTab === 'dubbing'
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🎬</span>
                <span>AI Dubbing</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('stt')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeSubTab === 'stt'
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>📝</span>
                <span>Speech to Text</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('music')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeSubTab === 'music'
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🎵</span>
                <span>AI Music</span>
              </button>

            </div>
          </div>
        </header>

        {/* PRIMARY ACTIVE PRODUCT WORKSPACE */}
        <section>
          {activeSubTab === 'tts' && <TextToSpeechTab isDarkMode={isDarkMode} />}
          {activeSubTab === 'cloning' && <VoiceCloningTab isDarkMode={isDarkMode} />}
          {activeSubTab === 'dubbing' && <DubbingTab isDarkMode={isDarkMode} />}
          {activeSubTab === 'stt' && <SpeechToTextTab isDarkMode={isDarkMode} />}
          {activeSubTab === 'music' && <MusicTab isDarkMode={isDarkMode} />}
        </section>

        {/* Key Acoustic Proof Deck */}
        <VoiceShowcaseCards isDarkMode={isDarkMode} />

        {/* Real Production Use Cases */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Text to Speech for every use case
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              From voice agents to content platforms. Real use cases, already in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTION_USE_CASES.map((uc) => (
              <div
                key={uc.id}
                className={`rounded-3xl p-6 border flex flex-col justify-between min-h-[300px] shadow-sm transition-all hover:scale-[1.02] ${
                  isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      {uc.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePlayUseCase(uc.id, uc.sampleAudioText)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        activeUseCaseAudio === uc.id
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-800 dark:text-white'
                      }`}
                      title="Play sample use-case audio"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {uc.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {uc.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-6 flex flex-wrap gap-2">
                  {uc.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 35+ Regional Voice Avatars Gallery */}
        <VoiceDiscGallery 
          isDarkMode={isDarkMode} 
          onSelectVoiceForStudio={() => {
            setActiveSubTab('tts');
            window.scrollTo({ top: 300, behavior: 'smooth' });
          }}
        />

        {/* Transparent ₹30 / 10k Chars Pricing */}
        <SovereignVoicePricing isDarkMode={isDarkMode} />

        {/* Clean Minimalist Tagline Footer */}
        <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <p className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
            Arohi Voice Labs™ · ONE AI. INFINITE OPPORTUNITIES.
          </p>
        </footer>

      </div>

    </div>
  );
};
