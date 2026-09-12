import React, { useState, useEffect } from 'react';
import {
  Globe,
  Play,
  Pause,
  CheckCircle2,
  Sparkles,
  Search,
  Volume2,
  Bot,
  ArrowRight,
  ShieldCheck,
  Radio,
  Share2
} from 'lucide-react';
import { INDIAN_22_LANGUAGES, IndianLanguageOption } from './telephonyData';
import { useBusinessOS } from './BusinessOSContext';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';

interface IndianLanguageMatrixViewProps {
  onSelectLanguageForAgent?: (lang: IndianLanguageOption) => void;
  onTestCallInLanguage?: (lang: IndianLanguageOption) => void;
}

export default function IndianLanguageMatrixView({
  onSelectLanguageForAgent,
  onTestCallInLanguage
}: IndianLanguageMatrixViewProps) {
  const { showToast, inboundAgents, activeInboundAgentId, updateInboundAgent } = useBusinessOS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>('or'); // Odia by default!
  const [isPlayingCode, setIsPlayingCode] = useState<string | null>(null);

  const activeAgent = inboundAgents.find(a => a.id === activeInboundAgentId) || inboundAgents[0];

  const filteredLanguages = INDIAN_22_LANGUAGES.filter(
    lang =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.popularRegions.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLanguage =
    INDIAN_22_LANGUAGES.find(l => l.code === selectedLanguageCode) || INDIAN_22_LANGUAGES[0];

  useEffect(() => {
    return () => {
      stopArohiVoice();
    };
  }, []);

  const handlePlayGreeting = (lang: IndianLanguageOption) => {
    if (isPlayingCode === lang.code) {
      stopArohiVoice();
      setIsPlayingCode(null);
      return;
    }

    stopArohiVoice();
    setIsPlayingCode(lang.code);
    showToast(`Playing ${lang.name} (${lang.nativeName}) with Arohi Natural Voice...`);

    playArohiVoice(lang.defaultGreeting, {
      voice: 'Zypher',
      language: lang.code,
      onStart: () => setIsPlayingCode(lang.code),
      onEnd: () => setIsPlayingCode(null),
      onError: () => setIsPlayingCode(null)
    });
  };

  const handleAssignToActiveAgent = (lang: IndianLanguageOption) => {
    if (activeAgent) {
      updateInboundAgent(activeAgent.id, {
        language: `${lang.name} (${lang.nativeName})`,
        greetingMessage: lang.defaultGreeting
      });
      showToast(`Assigned ${lang.name} (${lang.nativeName}) to Voice Agent "${activeAgent.name}"!`);
      if (onSelectLanguageForAgent) {
        onSelectLanguageForAgent(lang);
      }
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner: Sovereign 22-Language Telephony Coverage */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-purple-500/10 dark:from-emerald-950/30 dark:via-amber-950/20 dark:to-purple-950/30 border border-[#d4af37]/30 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] font-bold text-[10px] uppercase tracking-wider">
                Eighth Schedule of the Constitution of India
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 22 Languages Verified
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-newsreader text-zinc-900 dark:text-white">
              Sovereign Vernacular Telephony Engine
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
              Every phone agent in Arohi Telephony natively comprehends, speaks, and code-switches across all 22 official Indian languages. Powered by regional acoustic models with first-class Odia (ଓଡ଼ିଆ) dialect support.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <div className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/8 dark:border-white/10 text-center shadow-xs">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Total Dialects</span>
              <p className="text-sm font-bold text-[#d4af37]">48+ Regional</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/8 dark:border-white/10 text-center shadow-xs">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Code-Switching</span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Sub-300ms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search language, script, or region..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.1] text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Targeting Active Agent:</span>
          <span className="font-bold text-zinc-900 dark:text-white px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
            {activeAgent ? activeAgent.name : 'Priya Sharma'}
          </span>
        </div>
      </div>

      {/* Flagship Odia Spotlight Card */}
      {selectedLanguage.code === 'or' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#d4af37]/10 to-amber-500/10 border-2 border-emerald-500/30 dark:border-emerald-500/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase">
                  Flagship Vernacular Priority
                </span>
                <span className="font-newsreader font-bold text-lg text-zinc-900 dark:text-white">
                  ଓଡ଼ିଆ (Odia)
                </span>
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 max-w-xl">
                Trained for Coastal Odia (Bhubaneswar/Cuttack), Sambalpuri-Koshali, and Southern Odia with seamless Odia-English code-switching for government, real-estate, agriculture &amp; MSME telephony.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                {selectedLanguage.dialects.map((d, dIdx) => (
                  <span
                    key={dIdx}
                    className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-zinc-900/80 border border-emerald-500/20 text-[10px] font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    ✓ {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
              <button
                onClick={() => handlePlayGreeting(selectedLanguage)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen Odia Greeting</span>
              </button>
              <button
                onClick={() => handleAssignToActiveAgent(selectedLanguage)}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs shadow-xs hover:opacity-90 transition-all cursor-pointer"
              >
                Assign to Agent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of 22 Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredLanguages.map(lang => {
          const isSelected = lang.code === selectedLanguageCode;
          const isPlaying = isPlayingCode === lang.code;

          return (
            <div
              key={lang.code}
              onClick={() => setSelectedLanguageCode(lang.code)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative ${
                isSelected
                  ? 'bg-white dark:bg-[#15161c] border-[#d4af37] ring-2 ring-[#d4af37]/20 shadow-md'
                  : 'bg-white/80 dark:bg-[#121214]/80 border-black/[0.06] dark:border-white/[0.08] hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-zinc-900 dark:text-white font-newsreader">
                        {lang.nativeName}
                      </span>
                      {lang.isFlagship && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                          Flagship
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {lang.name} • {lang.script} Script
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handlePlayGreeting(lang);
                    }}
                    className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#d4af37]/20 text-zinc-700 dark:text-zinc-200 hover:text-[#d4af37] transition-all cursor-pointer shrink-0"
                    title={`Listen to ${lang.name} Greeting`}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="mt-2.5 p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]">
                  <p className="text-[11px] text-zinc-700 dark:text-zinc-300 italic line-clamp-2 leading-relaxed font-sans">
                    "{lang.defaultGreeting}"
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-[10px]">
                <span className="text-zinc-400 font-medium truncate max-w-[150px]">
                  {lang.popularRegions}
                </span>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handleAssignToActiveAgent(lang);
                  }}
                  className="font-bold text-[#d4af37] hover:underline cursor-pointer"
                >
                  Set as Active ➔
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
