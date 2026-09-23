import React, { useState, useMemo } from 'react';
import { X, Search, Globe, Check, ArrowRightLeft, Sparkles, MapPin } from 'lucide-react';
import { SPEAKS_LANGUAGES } from '../../data/speaksData';
import { ALL_150_PLUS_LANGUAGES } from '../../data/languagesData';
import { SpeaksLanguage } from '../../types/speaksTypes';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceLanguage: SpeaksLanguage;
  targetLanguage: SpeaksLanguage;
  onSelectLanguages: (source: SpeaksLanguage, target: SpeaksLanguage) => void;
  isDarkMode?: boolean;
}

export default function LanguageSelectorModal({
  isOpen,
  onClose,
  sourceLanguage,
  targetLanguage,
  onSelectLanguages,
  isDarkMode = true
}: LanguageSelectorModalProps) {
  const [activePickingMode, setActivePickingMode] = useState<'target' | 'source'>('target');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'INDIAN' | 'GLOBAL'>('ALL');
  const [tempSource, setTempSource] = useState<SpeaksLanguage>(sourceLanguage);
  const [tempTarget, setTempTarget] = useState<SpeaksLanguage>(targetLanguage);

  // Merge full 190+ list with speaks curated metadata
  const unifiedLanguages: SpeaksLanguage[] = useMemo(() => {
    const existingCodes = new Set(SPEAKS_LANGUAGES.map(l => l.code));
    const extraLanguages: SpeaksLanguage[] = ALL_150_PLUS_LANGUAGES
      .filter(l => !existingCodes.has(l.code))
      .map(l => ({
        code: l.code,
        nativeName: l.native,
        englishName: l.english,
        flag: l.region === 'India' ? '🇮🇳' : '🌐',
        region: l.region === 'India' ? 'Indian' : 'Global',
        subRegion: l.region || 'Worldwide',
        script: l.symbol || 'Native',
        sampleGreeting: `${l.native}!`,
        ttsLocale: `${l.code}-${l.region === 'India' ? 'IN' : 'US'}`,
        speechRecognitionLocale: `${l.code}-${l.region === 'India' ? 'IN' : 'US'}`
      }));

    return [...SPEAKS_LANGUAGES, ...extraLanguages];
  }, []);

  const filteredLanguages = useMemo(() => {
    return unifiedLanguages.filter(lang => {
      const matchesCategory = 
        selectedCategory === 'ALL' ||
        (selectedCategory === 'INDIAN' && lang.region === 'Indian') ||
        (selectedCategory === 'GLOBAL' && lang.region === 'Global');

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        lang.englishName.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q) ||
        (lang.subRegion && lang.subRegion.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [unifiedLanguages, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handleSwap = () => {
    const s = tempSource;
    const t = tempTarget;
    setTempSource(t);
    setTempTarget(s);
  };

  const handleApply = () => {
    onSelectLanguages(tempSource, tempTarget);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700/80 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                Universal Language Selector
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/30">
                  170+ Languages
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Choose what you speak and what you want to master
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Pair Bar with Swap */}
        <div className="px-4 sm:px-6 py-4 bg-slate-800/40 border-b border-slate-700/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
            {/* Source Card */}
            <div 
              onClick={() => setActivePickingMode('source')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                activePickingMode === 'source'
                  ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 border-orange-500 ring-2 ring-orange-500/20 shadow-md'
                  : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Step 1: I Speak (Mother Tongue)
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{tempSource.flag}</span>
                  <div>
                    <h4 className="font-bold text-sm leading-tight text-white">{tempSource.englishName}</h4>
                    <span className="text-xs text-orange-400 font-medium">{tempSource.nativeName}</span>
                  </div>
                </div>
                {activePickingMode === 'source' && (
                  <span className="text-[10px] bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">
                    Selecting
                  </span>
                )}
              </div>
            </div>

            {/* Target Card */}
            <div 
              onClick={() => setActivePickingMode('target')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                activePickingMode === 'target'
                  ? 'bg-gradient-to-r from-amber-500/20 to-emerald-500/10 border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                  : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Step 2: I Want to Speak & Learn
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{tempTarget.flag}</span>
                  <div>
                    <h4 className="font-bold text-sm leading-tight text-white">{tempTarget.englishName}</h4>
                    <span className="text-xs text-amber-400 font-medium">{tempTarget.nativeName}</span>
                  </div>
                </div>
                {activePickingMode === 'target' && (
                  <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">
                    Selecting
                  </span>
                )}
              </div>
            </div>

            {/* Swap Button (Absolute center on desktop) */}
            <button
              onClick={handleSwap}
              title="Swap languages"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex w-9 h-9 rounded-full bg-slate-700 border border-slate-600 items-center justify-center text-slate-300 hover:text-white hover:bg-orange-500 transition-all shadow-lg z-10"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-700/40 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All (170+)
            </button>
            <button
              onClick={() => setSelectedCategory('INDIAN')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'INDIAN'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🇮🇳 Indian (22+)
            </button>
            <button
              onClick={() => setSelectedCategory('GLOBAL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'GLOBAL'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌐 Global (150+)
            </button>
          </div>

          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activePickingMode === 'source' ? 'your mother tongue' : 'target language'}...`}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Language Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[420px]">
          {filteredLanguages.map((lang) => {
            const isCurrentlySelected = activePickingMode === 'source' 
              ? tempSource.code === lang.code 
              : tempTarget.code === lang.code;

            return (
              <div
                key={lang.code}
                onClick={() => {
                  if (activePickingMode === 'source') {
                    setTempSource(lang);
                    setActivePickingMode('target');
                  } else {
                    setTempTarget(lang);
                  }
                }}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isCurrentlySelected
                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 border-orange-500 shadow-md ring-1 ring-orange-500/30'
                    : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-2xl flex-shrink-0">{lang.flag}</span>
                  <div className="truncate">
                    <h5 className="font-semibold text-sm text-white truncate leading-tight">
                      {lang.englishName}
                    </h5>
                    <p className="text-xs text-slate-400 truncate">
                      {lang.nativeName} • <span className="text-[11px] text-orange-400/90">{lang.subRegion || lang.region}</span>
                    </p>
                  </div>
                </div>

                {isCurrentlySelected && (
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 border-t border-slate-700/50 flex items-center justify-between bg-slate-900/90">
          <div className="text-xs text-slate-400 hidden sm:block">
            Pair selected: <span className="text-orange-400 font-bold">{tempSource.englishName}</span> ➔ <span className="text-amber-400 font-bold">{tempTarget.englishName}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start Speaking {tempTarget.englishName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
