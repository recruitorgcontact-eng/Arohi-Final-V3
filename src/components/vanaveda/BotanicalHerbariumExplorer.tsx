// VanaVeda by Arohi - Botanical Herbarium Interactive Explorer
// High-fidelity presentation of 10 sacred trees and leaves with classical shlokas, virya/vipaka, and brewing methods

import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Search, 
  Flame, 
  Snowflake, 
  Clock, 
  AlertTriangle, 
  Droplet, 
  CheckCircle2, 
  Volume2, 
  ExternalLink,
  Info
} from 'lucide-react';
import { SACRED_BOTANICAL_HERBARIUM, MedicinalLeaf } from './vanavedaData';
import { BotanicalLeafSvg } from './BotanicalLeafSvg';
import { vanavedaAudio } from './vanavedaAudio';
import { playArohiVoice, stopArohiVoice, sanitizeSpeechText } from '../../utils/arohiVoicePlayer';
import { VolumeX } from 'lucide-react';

interface Props {
  language: string;
  onConsultLeafWithArohi: (leafName: string) => void;
}

export const BotanicalHerbariumExplorer: React.FC<Props> = ({
  language,
  onConsultLeafWithArohi
}) => {
  const [selectedLeafId, setSelectedLeafId] = useState<string>('tulsi');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'vata' | 'pitta' | 'kapha'>('all');
  const [isSpeakingShloka, setIsSpeakingShloka] = useState(false);

  React.useEffect(() => {
    return () => {
      stopArohiVoice();
    };
  }, []);

  const handleReciteShloka = (shlokaText: string, meaningText: string) => {
    if (isSpeakingShloka) {
      stopArohiVoice();
      setIsSpeakingShloka(false);
      return;
    }

    stopArohiVoice();
    setIsSpeakingShloka(true);
    vanavedaAudio.playSingingBowl(432);

    const speechText = sanitizeSpeechText(`${shlokaText}. Meaning: ${meaningText}`);
    playArohiVoice(speechText, {
      language: language === 'or' ? 'or-IN' : 'hi-IN',
      voice: 'Zypher',
      onStart: () => setIsSpeakingShloka(true),
      onEnd: () => setIsSpeakingShloka(false),
      onError: () => setIsSpeakingShloka(false)
    });
  };

  const selectedLeaf = SACRED_BOTANICAL_HERBARIUM.find(l => l.id === selectedLeafId) || SACRED_BOTANICAL_HERBARIUM[0];

  const filteredLeaves = SACRED_BOTANICAL_HERBARIUM.filter(leaf => {
    const matchesSearch = 
      leaf.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leaf.nameSanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leaf.nameOdia.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leaf.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leaf.primaryAffinity.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'vata') return leaf.tridoshaBalance.vata === 'Pacifies';
    if (activeFilter === 'pitta') return leaf.tridoshaBalance.pitta === 'Pacifies';
    if (activeFilter === 'kapha') return leaf.tridoshaBalance.kapha === 'Pacifies';

    return true;
  });

  const handleSelectLeaf = (id: string) => {
    setSelectedLeafId(id);
    vanavedaAudio.playTempleBell(523.25); // C5 temple bell note
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Philosophy */}
      <div className="bg-gradient-to-r from-[#FAF5EC] via-[#F3ECE0] to-[#EFE7D8] dark:from-[#111A13] dark:via-[#162319] dark:to-[#0F1811] rounded-3xl p-6 sm:p-8 border border-[#E7DEC8] dark:border-[#203022] shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/10 dark:bg-[#15803D]/25 border border-[#15803D]/30 text-[#15803D] dark:text-[#4ADE80] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Classical Botanical Pharmacopeia (द्रव्यगुण विज्ञान)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2B1B10] dark:text-[#F3F4F6] tracking-tight">
            The Sacred Living Herbarium
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5D4A3A] dark:text-[#9CA3AF] leading-relaxed">
            "Every leaf and tree on earth holds a sacred secret to heal human suffering." Explore 10 classical botanical masterworks with authentic Rigvedic shlokas, Sushruta preparations, and modern phytochemical pathways.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Thumbnails List, Right Deep Dive Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Leaf Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search & Dosha Filter */}
          <div className="bg-[#FAF7F2] dark:bg-[#121B14] p-4 rounded-2xl border border-[#E7DEC8] dark:border-[#223324] space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by leaf, Odia name, or disease..."
                className="w-full bg-white dark:bg-[#18231a] border border-[#E7DEC8] dark:border-[#2c3d2d] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2B1B10] dark:text-[#EDE6D6] placeholder:text-slate-400 focus:outline-none focus:border-[#15803D]"
              />
            </div>

            {/* Dosha Filter Tabs */}
            <div className="grid grid-cols-4 gap-1 text-[11px] font-semibold">
              <button
                onClick={() => setActiveFilter('all')}
                className={`py-1.5 rounded-lg transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'bg-white/60 dark:bg-[#18231a] text-slate-600 dark:text-slate-400 hover:text-[#15803D]'
                }`}
              >
                All (10)
              </button>
              <button
                onClick={() => setActiveFilter('vata')}
                className={`py-1.5 rounded-lg transition-all ${
                  activeFilter === 'vata'
                    ? 'bg-[#B45309] text-white shadow-xs'
                    : 'bg-white/60 dark:bg-[#18231a] text-slate-600 dark:text-slate-400 hover:text-[#B45309]'
                }`}
              >
                Vata
              </button>
              <button
                onClick={() => setActiveFilter('pitta')}
                className={`py-1.5 rounded-lg transition-all ${
                  activeFilter === 'pitta'
                    ? 'bg-[#D97706] text-white shadow-xs'
                    : 'bg-white/60 dark:bg-[#18231a] text-slate-600 dark:text-slate-400 hover:text-[#D97706]'
                }`}
              >
                Pitta
              </button>
              <button
                onClick={() => setActiveFilter('kapha')}
                className={`py-1.5 rounded-lg transition-all ${
                  activeFilter === 'kapha'
                    ? 'bg-[#166534] text-white shadow-xs'
                    : 'bg-white/60 dark:bg-[#18231a] text-slate-600 dark:text-slate-400 hover:text-[#166534]'
                }`}
              >
                Kapha
              </button>
            </div>
          </div>

          {/* Leaf Items Scrollable List */}
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredLeaves.map((leaf) => {
              const isSelected = leaf.id === selectedLeafId;
              return (
                <div
                  key={leaf.id}
                  onClick={() => handleSelectLeaf(leaf.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-white dark:bg-[#162218] border-[#15803D] dark:border-[#4ADE80] shadow-md scale-[1.01]'
                      : 'bg-[#FAF7F2] dark:bg-[#121B14] border-[#E7DEC8] dark:border-[#223324] hover:border-[#15803D]/50 hover:bg-white dark:hover:bg-[#152016]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#15803D]/10 dark:bg-[#15803D]/20 flex items-center justify-center shrink-0">
                      <BotanicalLeafSvg leafId={leaf.id} className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#2B1B10] dark:text-[#F3F4F6]">
                        {leaf.nameEnglish}
                      </h4>
                      <p className="text-[11px] text-[#B45309] dark:text-[#FBBF24] font-medium">
                        {leaf.nameOdia} • {leaf.nameDevanagari}
                      </p>
                      <p className="text-[10px] text-slate-500 italic mt-0.5">
                        {leaf.botanicalName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#15803D]/10 text-[#15803D] dark:text-[#4ADE80] font-bold">
                      {leaf.virya.split(' ')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Leaf Master Codex (8 cols) */}
        <div className="lg:col-span-8 bg-[#FAF7F2] dark:bg-[#121B14] rounded-3xl border border-[#E7DEC8] dark:border-[#223324] p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7DEC8] dark:border-[#223324]">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#15803D]/15 dark:bg-[#15803D]/25 border border-[#15803D]/30 flex items-center justify-center shrink-0 shadow-inner">
                <BotanicalLeafSvg leafId={selectedLeaf.id} className="w-10 h-10" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif font-black text-2xl text-[#2B1B10] dark:text-[#F3F4F6]">
                    {selectedLeaf.nameEnglish}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#B45309]/15 text-[#B45309] dark:text-[#FBBF24] font-bold border border-[#B45309]/30">
                    {selectedLeaf.nameOdia}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#5D4A3A] dark:text-[#9CA3AF] mt-0.5">
                  <span className="italic font-bold">{selectedLeaf.botanicalName}</span> • Family: {selectedLeaf.family}
                </p>
                <p className="text-xs text-[#15803D] dark:text-[#4ADE80] font-medium mt-1">
                  Vedic Origin: {selectedLeaf.vedicOrigin}
                </p>
              </div>
            </div>

            <button
              onClick={() => onConsultLeafWithArohi(selectedLeaf.nameEnglish)}
              className="px-4 py-2.5 rounded-2xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <span>Consult Arohi on This Leaf</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Classical Shloka Manuscript Parchment Box */}
          <div className="bg-[#FAF5EC] dark:bg-[#162319] p-5 rounded-2xl border-l-4 border-[#B45309] shadow-inner space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#B45309] dark:text-[#FBBF24]">
              <span className="uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Classical Nighantu / Sushruta Shloka</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReciteShloka(selectedLeaf.shlokaDevanagari, selectedLeaf.shlokaMeaning)}
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs transition-all cursor-pointer ${
                    isSpeakingShloka
                      ? 'bg-emerald-600 text-white shadow-xs animate-pulse font-bold'
                      : 'bg-[#15803D]/10 hover:bg-[#15803D]/20 text-[#15803D] dark:text-[#4ADE80] border border-[#15803D]/30'
                  }`}
                  title={isSpeakingShloka ? "Stop Arohi's Recitation" : "Listen to Arohi Recite this Shloka"}
                >
                  {isSpeakingShloka ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop Arohi</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Arohi's Voice</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => vanavedaAudio.playSingingBowl(432)}
                  className="hover:text-[#15803D] flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border border-[#E7DEC8] dark:border-[#2a3c2b] bg-white/70 dark:bg-black/20"
                  title="Ring 432Hz bronze singing bowl"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>432Hz Bowl</span>
                </button>
              </div>
            </div>
            <p className="font-serif text-base sm:text-lg font-bold text-[#2B1B10] dark:text-[#F3F4F6] leading-relaxed">
              {selectedLeaf.shlokaDevanagari}
            </p>
            <p className="text-xs italic text-[#5D4A3A] dark:text-[#9CA3AF] font-mono">
              {selectedLeaf.shlokaTransliteration}
            </p>
            <p className="text-xs text-[#2B1B10] dark:text-[#D1D5DB] pt-1 border-t border-[#E7DEC8]/80 dark:border-[#223324] leading-relaxed">
              <span className="font-bold text-[#15803D] dark:text-[#4ADE80]">Meaning: </span>
              {selectedLeaf.shlokaMeaning}
            </p>
          </div>

          {/* Dravyaguna Energetics Matrix (Rasa, Virya, Vipaka, Prabhava) */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#2B1B10] dark:text-[#F3F4F6] mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#D97706]" />
              <span>Dravyaguna Pharmacology Matrix (द्रव्यगुण संघटन)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white dark:bg-[#18231a] rounded-xl border border-[#E7DEC8] dark:border-[#2a3c2b] text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Rasa (Taste)</span>
                <span className="text-xs font-bold text-[#2B1B10] dark:text-[#F3F4F6] mt-1 block">
                  {selectedLeaf.rasa.join(', ')}
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-[#18231a] rounded-xl border border-[#E7DEC8] dark:border-[#2a3c2b] text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Virya (Potency)</span>
                <span className="text-xs font-bold text-[#D97706] mt-1 block">
                  {selectedLeaf.virya}
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-[#18231a] rounded-xl border border-[#E7DEC8] dark:border-[#2a3c2b] text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Vipaka (Post-Digestive)</span>
                <span className="text-xs font-bold text-[#2B1B10] dark:text-[#F3F4F6] mt-1 block">
                  {selectedLeaf.vipaka}
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-[#18231a] rounded-xl border border-[#E7DEC8] dark:border-[#2a3c2b] text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Prabhava (Divine Efficacy)</span>
                <span className="text-xs font-bold text-[#15803D] dark:text-[#4ADE80] mt-1 block">
                  {selectedLeaf.prabhava.split('(')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Modern Phytochemicals & Active Mechanisms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-[#18231a] rounded-2xl border border-[#E7DEC8] dark:border-[#2a3c2b] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] dark:text-[#4ADE80] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active Phytochemical Complex</span>
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedLeaf.activePhytochemicals.map((chem, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-1 rounded-md bg-[#15803D]/10 dark:bg-[#15803D]/20 text-[#15803D] dark:text-[#86EFAC] border border-[#15803D]/20 font-semibold"
                  >
                    {chem}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#18231a] rounded-2xl border border-[#E7DEC8] dark:border-[#2a3c2b] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] dark:text-[#FBBF24] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Cellular Mechanism</span>
              </span>
              <p className="text-xs text-[#5D4A3A] dark:text-[#D1D5DB] leading-relaxed">
                {selectedLeaf.modernMechanism}
              </p>
            </div>
          </div>

          {/* Sushruta Classical Preparations & Brewing Protocols */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#2B1B10] dark:text-[#F3F4F6] flex items-center gap-2">
              <Droplet className="w-4 h-4 text-[#15803D]" />
              <span>Sushruta Classical Preparations & Sacred Brewing Protocol</span>
            </h4>
            <div className="space-y-3">
              {selectedLeaf.sushrutaPreparations.map((prep, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white dark:bg-[#18231a] rounded-2xl border border-[#E7DEC8] dark:border-[#2a3c2b] space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif font-bold text-sm text-[#15803D] dark:text-[#4ADE80]">
                      {prep.form} — {prep.sanskritName}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#FAF5EC] dark:bg-[#121B14] text-slate-500 border border-[#E7DEC8] dark:border-[#223324]">
                      Classical Protocol
                    </span>
                  </div>
                  <p className="text-xs text-[#5D4A3A] dark:text-[#9CA3AF]">
                    <span className="font-bold text-[#2B1B10] dark:text-[#E5E7EB]">Target Indication: </span>
                    {prep.indication}
                  </p>
                  <div className="p-3 bg-[#FAF5EC] dark:bg-[#121B14] rounded-xl text-xs text-[#2B1B10] dark:text-[#D1D5DB] border border-[#E7DEC8]/80 dark:border-[#223324] leading-relaxed">
                    <span className="font-bold text-[#D97706]">Brewing Guide: </span>
                    {prep.brewingMethod}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anupana & Contraindications Footer */}
          <div className="p-4 bg-[#FAF5EC] dark:bg-[#162319] rounded-2xl border border-[#E7DEC8] dark:border-[#223324] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-[#15803D] dark:text-[#4ADE80]">Anupana (Carrier Vehicle): </span>
              <span className="text-[#5D4A3A] dark:text-[#D1D5DB]">{selectedLeaf.anupana.join(', ')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{selectedLeaf.contraindications}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
