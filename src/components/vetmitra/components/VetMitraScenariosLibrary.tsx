// Arohi VetMitra - 50 Odia Dairy Farmer Scenarios Library
// Searchable, filterable interactive repository with Voice Playback & Chat Injection

import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Volume2, Play, AlertTriangle, 
  CheckCircle2, ArrowRight, Stethoscope, Sparkles 
} from 'lucide-react';
import { ODIA_DAIRY_50_SCENARIOS } from '../data/vetScenariosOdia';
import { VetScenarioItem, VetLanguage } from '../types';
import { playArohiVoice, stopArohiVoice } from '../../../utils/arohiVoicePlayer';

interface Props {
  language: VetLanguage;
  onSelectScenarioForChat?: (scenario: VetScenarioItem) => void;
}

const CATEGORIES = [
  { id: 'all', nameOdia: 'ସମସ୍ତ ୫୦ ଘଟଣା', nameEnglish: 'All 50 Scenarios' },
  { id: 'early_lactation', nameOdia: 'ପ୍ରସବ ପରବର୍ତ୍ତୀ ସ୍ୱାସ୍ଥ୍ୟ', nameEnglish: 'Early Lactation & Fresh Cow' },
  { id: 'mastitis', nameOdia: 'ମାଷ୍ଟାଇଟିସ୍ ଓ ଥନ ସ୍ୱାସ୍ଥ୍ୟ', nameEnglish: 'Mastitis & Udder Health' },
  { id: 'calf_health', nameOdia: 'ବାଛୁରୀ ସ୍ୱାସ୍ଥ୍ୟ ଓ ଯତ୍ନ', nameEnglish: 'Calf Health & Diarrhea' },
  { id: 'rumen_health', nameOdia: 'ପାଚନ ଓ ରୁମେନ୍ ସମସ୍ୟା', nameEnglish: 'Rumen & Digestion' },
  { id: 'nutrition', nameOdia: 'NASEM 2021 ପୋଷଣ ଓ ରେସନ୍', nameEnglish: 'NASEM Nutrition & Ration' },
  { id: 'reproduction', nameOdia: 'ପ୍ରଜନନ ଓ ଗର୍ଭାବସ୍ଥା', nameEnglish: 'Reproduction & Calving' },
  { id: 'emergency', nameOdia: 'ଜରୁରୀକାଳୀନ ଅବସ୍ଥା (Emergency)', nameEnglish: 'Emergency Triage' },
  { id: 'diagnostics', nameOdia: 'ରିପୋର୍ଟ ଓ ଟେଷ୍ଟ୍ ବିଶ୍ଳେଷଣ', nameEnglish: 'Lab Diagnostics' },
];

export const VetMitraScenariosLibrary: React.FC<Props> = ({
  language,
  onSelectScenarioForChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedScenarioId, setExpandedScenarioId] = useState<number | null>(1);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const filteredScenarios = useMemo(() => {
    return ODIA_DAIRY_50_SCENARIOS.filter((sc) => {
      const matchesCat = activeCategory === 'all' || sc.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        sc.titleOdia.toLowerCase().includes(q) ||
        sc.titleEnglish.toLowerCase().includes(q) ||
        sc.clinicalFocus.toLowerCase().includes(q) ||
        sc.dialogue.some((d) => d.text.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handlePlayDialogue = (scenario: VetScenarioItem) => {
    if (playingId === scenario.id) {
      stopArohiVoice();
      setPlayingId(null);
      return;
    }

    const narrationText = scenario.dialogue
      .map((d) => `${d.speaker === 'farmer' ? 'ଚାଷୀ କହିଲେ' : 'ଆରୋହୀ କହିଲେ'}: ${d.text}`)
      .join('. ');

    stopArohiVoice();
    setPlayingId(scenario.id);
    playArohiVoice(narrationText, {
      language: 'or-IN',
      voice: 'Aoede',
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base sm:text-lg font-semibold text-slate-100">
                {language === 'or' ? '୫୦ ପ୍ରକୃତ ଓଡ଼ିଆ ଚାଷୀ ପରାମର୍ଶ ଲାଇବ୍ରେରୀ' : '50 Authentic Odia Dairy Consult Scenarios'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Field-tested farmer dialogues in colloquial Odia covering systemic disease, NASEM 2021 feeding, udder health, and clinical triage.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={language === 'or' ? 'ଖୋଜନ୍ତୁ (ଝାଡ଼ା, ଥନ, ବ୍ଲୋଟ୍...)' : 'Search scenarios...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-slate-950 font-semibold'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'or' ? cat.nameOdia : cat.nameEnglish}
            </button>
          ))}
        </div>
      </div>

      {/* Scenarios Grid / List */}
      <div className="space-y-3">
        {filteredScenarios.map((sc) => {
          const isExpanded = expandedScenarioId === sc.id;
          const isPlaying = playingId === sc.id;

          return (
            <div
              key={sc.id}
              className={`bg-slate-900/70 border rounded-2xl transition-all overflow-hidden ${
                isExpanded ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header Accordion Bar */}
              <div
                onClick={() => setExpandedScenarioId(isExpanded ? null : sc.id)}
                className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-emerald-400 shrink-0">
                    {sc.id}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-100 truncate">
                      {sc.titleOdia}
                    </h3>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {sc.titleEnglish} • <span className="text-emerald-400/90">{sc.clinicalFocus}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayDialogue(sc);
                    }}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isPlaying
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Audio Narration in Odia"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  {onSelectScenarioForChat && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectScenarioForChat(sc);
                      }}
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-medium text-emerald-300 transition-colors"
                    >
                      <span>Try Case</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Dialogue & Clinical Analysis */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-4 text-xs">
                  {/* Dialogue Script */}
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === 'or' ? 'ଓଡ଼ିଆ କଥୋପକଥନ (Authentic Dialogue):' : 'Farmer Dialogue Script:'}</span>
                    </div>

                    <div className="space-y-2 pt-1">
                      {sc.dialogue.map((d, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-2 p-2 rounded-lg ${
                            d.speaker === 'farmer'
                              ? 'bg-slate-900/60 text-slate-200'
                              : 'bg-emerald-950/30 border border-emerald-500/20 text-emerald-100'
                          }`}
                        >
                          <span className="font-semibold shrink-0 w-16 text-[11px] text-slate-400">
                            {d.speaker === 'farmer' ? '👨‍🌾 Farmer:' : '🤖 Arohi:'}
                          </span>
                          <span className="leading-relaxed">{d.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Probing, Red Flags, and Tests Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                        <span>Key Probing Questions</span>
                      </div>
                      <ul className="space-y-1 text-slate-400 text-[11px]">
                        {sc.probingQuestions.map((q, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-teal-400">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl space-y-1.5">
                      <div className="text-[11px] font-semibold text-rose-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Clinical Red Flags</span>
                      </div>
                      <ul className="space-y-1 text-slate-400 text-[11px]">
                        {sc.redFlags.map((rf, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-400">•</span>
                            <span>{rf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl space-y-1.5">
                      <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Suggested Confirmatory Tests</span>
                      </div>
                      <ul className="space-y-1 text-slate-400 text-[11px]">
                        {sc.suggestedTests.map((st, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400">•</span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredScenarios.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No scenarios found matching "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};
