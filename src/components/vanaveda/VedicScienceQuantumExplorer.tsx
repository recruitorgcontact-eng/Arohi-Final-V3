// VanaVeda by Arohi - Vedic Science, Quantum Physics & 5-Kosha Matrix Explorer
// Rigveda Oshadhi Sukta, Nasadiya Sukta, 5 Prana flow vectors, Cymatics & Agnihotra physics

import React, { useState } from 'react';
import { 
  Sparkles, 
  Atom, 
  Volume2, 
  BookOpen, 
  Layers, 
  Compass, 
  Flame, 
  ArrowRight,
  Sun,
  ShieldCheck
} from 'lucide-react';
import { 
  VEDIC_SCRIPTURAL_MATRIX, 
  FIVE_KOSHA_DATA, 
  FIVE_PRANA_VECTORS, 
  VEDIC_SIX_SEASONS 
} from './vanavedaVedicData';
import { vanavedaAudio } from './vanavedaAudio';

interface Props {
  onConsultVedicNode: (nodeTitle: string) => void;
}

export const VedicScienceQuantumExplorer: React.FC<Props> = ({ onConsultVedicNode }) => {
  const [activeTab, setActiveTab] = useState<'scripture' | 'koshas' | 'prana' | 'ritucharya'>('scripture');
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);

  const handlePlayFrequency = (freq: number) => {
    if (activeFrequency === freq) {
      vanavedaAudio.stopAlchemyFrequency();
      setActiveFrequency(null);
    } else {
      vanavedaAudio.playAlchemyFrequency(freq);
      setActiveFrequency(freq);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAF5EC] via-[#F3ECE0] to-[#EFE7D8] dark:from-[#111A13] dark:via-[#162319] dark:to-[#0F1811] rounded-3xl p-6 sm:p-8 border border-[#E7DEC8] dark:border-[#203022] shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/10 dark:bg-[#15803D]/25 border border-[#15803D]/30 text-[#15803D] dark:text-[#4ADE80] text-xs font-bold uppercase tracking-wider mb-3">
            <Atom className="w-3.5 h-3.5" />
            <span>Vedic Science & Biophysics Nexus</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2B1B10] dark:text-[#F3F4F6] tracking-tight">
            Vedic Epistemology & Quantum Plant Mechanics
          </h2>
          <p className="mt-2 text-sm text-[#5D4A3A] dark:text-[#9CA3AF] leading-relaxed">
            The ancient Rishis did not view plants as mere biomass. Every leaf is an acoustic resonator, a biophoton antenna, and a living transformer of solar Agni into cellular Ojas. Explore the scriptural matrices bridging ancient mantras with modern physics.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveTab('scripture')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'scripture'
              ? 'bg-[#15803D] text-white shadow-md'
              : 'bg-[#FAF7F2] dark:bg-[#121B14] text-slate-600 dark:text-slate-400 border border-[#E7DEC8] dark:border-[#223324] hover:text-[#15803D]'
          }`}
        >
          📜 5 Vedic Shastra Nodes
        </button>
        <button
          onClick={() => setActiveTab('koshas')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'koshas'
              ? 'bg-[#15803D] text-white shadow-md'
              : 'bg-[#FAF7F2] dark:bg-[#121B14] text-slate-600 dark:text-slate-400 border border-[#E7DEC8] dark:border-[#223324] hover:text-[#15803D]'
          }`}
        >
          🌌 The 5 Koshas & Solfeggio
        </button>
        <button
          onClick={() => setActiveTab('prana')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'prana'
              ? 'bg-[#15803D] text-white shadow-md'
              : 'bg-[#FAF7F2] dark:bg-[#121B14] text-slate-600 dark:text-slate-400 border border-[#E7DEC8] dark:border-[#223324] hover:text-[#15803D]'
          }`}
        >
          💨 5 Prana Flow Vectors
        </button>
        <button
          onClick={() => setActiveTab('ritucharya')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'ritucharya'
              ? 'bg-[#15803D] text-white shadow-md'
              : 'bg-[#FAF7F2] dark:bg-[#121B14] text-slate-600 dark:text-slate-400 border border-[#E7DEC8] dark:border-[#223324] hover:text-[#15803D]'
          }`}
        >
          ☀️ Ritucharya (6 Vedic Seasons)
        </button>
      </div>

      {/* Tab 1: Vedic Shastra Nodes */}
      {activeTab === 'scripture' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VEDIC_SCRIPTURAL_MATRIX.map((node) => (
            <div
              key={node.id}
              className="bg-[#FAF7F2] dark:bg-[#121B14] p-6 rounded-3xl border border-[#E7DEC8] dark:border-[#223324] shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#B45309] dark:text-[#FBBF24]">
                  <span className="uppercase tracking-wider">{node.source}</span>
                  <BookOpen className="w-4 h-4 opacity-70" />
                </div>
                <div className="p-3 bg-[#FAF5EC] dark:bg-[#162319] rounded-2xl border border-[#E7DEC8]/80 dark:border-[#223324]">
                  <p className="font-serif font-bold text-sm text-[#2B1B10] dark:text-[#F3F4F6] leading-relaxed">
                    {node.verseDevanagari}
                  </p>
                  <p className="font-serif font-medium text-xs text-[#15803D] dark:text-[#4ADE80] mt-1">
                    {node.verseOdia}
                  </p>
                  <p className="text-[11px] italic text-slate-500 font-mono mt-1">
                    {node.transliteration}
                  </p>
                </div>
                <p className="text-xs text-[#2B1B10] dark:text-[#D1D5DB] leading-relaxed">
                  <span className="font-bold text-[#15803D] dark:text-[#4ADE80]">Vedic Meaning: </span>
                  {node.englishMeaning}
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-[#18231a] border border-[#E7DEC8] dark:border-[#2a3c2b] text-xs text-[#5D4A3A] dark:text-[#9CA3AF] space-y-1">
                  <span className="font-bold text-[#2B1B10] dark:text-[#E5E7EB] block">
                    ⚛️ Modern Biophysics Correlation:
                  </span>
                  <p className="leading-relaxed">{node.modernScienceParallel}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#E7DEC8]/60 dark:border-[#223324]">
                <span className="text-[11px] font-semibold text-[#15803D] dark:text-[#4ADE80]">
                  Herb: {node.botanicalApplication.split(',')[0]}
                </span>
                <button
                  onClick={() => onConsultVedicNode(node.source)}
                  className="text-xs font-bold text-[#B45309] dark:text-[#FBBF24] hover:text-[#15803D] flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire with Arohi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: The 5 Koshas & Solfeggio Frequencies */}
      {activeTab === 'koshas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {FIVE_KOSHA_DATA.map((k, idx) => {
              const isPlaying = activeFrequency === k.frequencyHz;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF7F2] dark:bg-[#121B14] p-5 rounded-3xl border border-[#E7DEC8] dark:border-[#223324] shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400">Layer {idx + 1}</span>
                      <span className="text-[11px] font-bold text-[#D97706]">{k.frequencyHz} Hz</span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#2B1B10] dark:text-[#F3F4F6]">
                      {k.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#15803D] dark:text-[#4ADE80]">
                      {k.sanskrit} • {k.odia}
                    </p>
                    <p className="text-[11px] text-[#5D4A3A] dark:text-[#9CA3AF] leading-relaxed">
                      {k.translation}
                    </p>
                    <div className="pt-2 text-[10px] text-slate-500 border-t border-[#E7DEC8]/60 dark:border-[#223324]">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Pathology Root: </span>
                      {k.pathologyOrigin}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handlePlayFrequency(k.frequencyHz)}
                      className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-[#15803D] text-white shadow-md animate-pulse'
                          : 'bg-white dark:bg-[#18231a] text-[#15803D] border border-[#E7DEC8] dark:border-[#2a3c2b] hover:bg-[#15803D]/10'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlaying ? 'Tuning Active' : `Sound ${k.frequencyHz}Hz`}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: 5 Prana Flow Vectors */}
      {activeTab === 'prana' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FIVE_PRANA_VECTORS.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] dark:bg-[#121B14] p-6 rounded-3xl border border-[#E7DEC8] dark:border-[#223324] shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-black text-lg text-[#2B1B10] dark:text-[#F3F4F6]">
                  {p.name}
                </h4>
                <span className="text-xs font-serif font-bold text-[#15803D] dark:text-[#4ADE80] bg-[#15803D]/10 px-2.5 py-0.5 rounded-full">
                  {p.sanskrit}
                </span>
              </div>
              <div className="text-xs space-y-1.5 text-[#5D4A3A] dark:text-[#9CA3AF]">
                <p>
                  <strong className="text-[#2B1B10] dark:text-[#E5E7EB]">Vector Flow: </strong>
                  {p.vector}
                </p>
                <p>
                  <strong className="text-[#2B1B10] dark:text-[#E5E7EB]">Anatomical Seat: </strong>
                  {p.seat}
                </p>
                <p>
                  <strong className="text-[#2B1B10] dark:text-[#E5E7EB]">Physiology: </strong>
                  {p.physiologicalRole}
                </p>
                <div className="p-3 bg-white dark:bg-[#18231a] rounded-xl border border-[#E7DEC8] dark:border-[#283929] mt-2">
                  <span className="font-bold text-rose-600 dark:text-rose-400 block text-[11px]">
                    Blockage Manifestation:
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">{p.blockageSymptoms}</p>
                  <span className="font-bold text-[#15803D] dark:text-[#4ADE80] block text-[11px] mt-2">
                    Botanical Antidote:
                  </span>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300">{p.botanicalCure}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Ritucharya (6 Vedic Seasons) */}
      {activeTab === 'ritucharya' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VEDIC_SIX_SEASONS.map((season) => (
            <div
              key={season.id}
              className="bg-[#FAF7F2] dark:bg-[#121B14] p-6 rounded-3xl border border-[#E7DEC8] dark:border-[#223324] shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-black text-base text-[#2B1B10] dark:text-[#F3F4F6]">
                    {season.nameSanskrit}
                  </h4>
                  <span className="text-[11px] font-bold text-[#B45309] dark:text-[#FBBF24]">
                    {season.nameOdia}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {season.nameEnglish} • {season.approxMonths}
                </p>
                <div className="p-3 bg-white dark:bg-[#18231a] rounded-xl border border-[#E7DEC8] dark:border-[#283929] space-y-1 text-xs">
                  <span className="font-bold text-[#D97706] block">Dosha Dynamic:</span>
                  <p className="text-[#5D4A3A] dark:text-[#9CA3AF] text-[11px]">{season.dominantDoshaState}</p>
                </div>
                <div className="text-xs space-y-1 text-[#5D4A3A] dark:text-[#D1D5DB]">
                  <strong className="text-[#15803D] dark:text-[#4ADE80]">Prescribed Leaves: </strong>
                  <span>{season.sacredBotanicalRegime.join(', ')}</span>
                </div>
                <div className="p-3 bg-[#FAF5EC] dark:bg-[#162319] rounded-xl border border-[#E7DEC8]/80 dark:border-[#223324] text-[11px] text-[#2B1B10] dark:text-[#D1D5DB]">
                  <strong className="text-[#B45309] dark:text-[#FBBF24]">Brewing Protocol: </strong>
                  {season.brewingProtocol}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
