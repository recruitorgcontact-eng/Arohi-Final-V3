import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, 
  Flame, 
  Zap, 
  Bookmark, 
  PhoneCall, 
  Sparkles, 
  Compass, 
  Target, 
  BookOpen, 
  Trophy, 
  ArrowRightLeft,
  ChevronRight,
  ShieldCheck,
  Headphones,
  Award,
  Play
} from 'lucide-react';
import { 
  SPEAKS_LANGUAGES, 
  getSpeaksLanguage, 
  generateCurriculumRoadmap, 
  SPEAKS_ROLEPLAY_SCENARIOS, 
  INITIAL_VOCAB_CARDS, 
  DEFAULT_USER_PROGRESS 
} from '../../data/speaksData';
import { 
  SpeaksLanguage, 
  SpeaksWeek, 
  SpeaksLessonNode, 
  SpeaksRoleplayScenario, 
  SpeaksVocabCard, 
  SpeaksUserProgress, 
  SpeaksPhrase 
} from '../../types/speaksTypes';

import LanguageSelectorModal from './LanguageSelectorModal';
import SpeaksRoadmap from './SpeaksRoadmap';
import SpeaksPracticeEngine from './SpeaksPracticeEngine';
import SpeaksRoleplayModal from './SpeaksRoleplayModal';
import SpeaksShabdkosh from './SpeaksShabdkosh';
import SpeaksScorecardModal from './SpeaksScorecardModal';

interface ArohiSpeaksHubProps {
  isDarkMode?: boolean;
  onOpenVoiceCall?: () => void;
  onNavigateTab?: (tab: string) => void;
  onOpenAuth?: () => void;
}

export default function ArohiSpeaksHub({
  isDarkMode = true,
  onOpenVoiceCall,
  onNavigateTab,
  onOpenAuth
}: ArohiSpeaksHubProps) {
  // Active sub-tab inside Arohi Speaks
  const [activeSubTab, setActiveSubTab] = useState<'roadmap' | 'roleplay' | 'shabdkosh'>('roadmap');

  // Selected Languages
  const [sourceLanguage, setSourceLanguage] = useState<SpeaksLanguage>(() => {
    const saved = localStorage.getItem('arohi_speaks_source_lang');
    return saved ? getSpeaksLanguage(saved) : getSpeaksLanguage('hi'); // Default: Hindi
  });

  const [targetLanguage, setTargetLanguage] = useState<SpeaksLanguage>(() => {
    const saved = localStorage.getItem('arohi_speaks_target_lang');
    return saved ? getSpeaksLanguage(saved) : getSpeaksLanguage('en'); // Default: English
  });

  // User Progress state
  const [progress, setProgress] = useState<SpeaksUserProgress>(() => {
    const saved = localStorage.getItem('arohi_speaks_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_USER_PROGRESS;
  });

  // Vocab Cards state
  const [vocabCards, setVocabCards] = useState<SpeaksVocabCard[]>(() => {
    const saved = localStorage.getItem('arohi_speaks_vocab_cards');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_VOCAB_CARDS;
  });

  // Modals state
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<SpeaksLessonNode | null>(null);
  const [activeRoleplayScenario, setActiveRoleplayScenario] = useState<SpeaksRoleplayScenario | null>(null);
  const [isScorecardOpen, setIsScorecardOpen] = useState(false);
  const [lastXpGained, setLastXpGained] = useState(50);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('arohi_speaks_source_lang', sourceLanguage.code);
    localStorage.setItem('arohi_speaks_target_lang', targetLanguage.code);
  }, [sourceLanguage.code, targetLanguage.code]);

  useEffect(() => {
    localStorage.setItem('arohi_speaks_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('arohi_speaks_vocab_cards', JSON.stringify(vocabCards));
  }, [vocabCards]);

  // Generate dynamic 4-week curriculum based on selected language pair
  const curriculumWeeks = useMemo(() => {
    return generateCurriculumRoadmap(sourceLanguage.code, targetLanguage.code);
  }, [sourceLanguage.code, targetLanguage.code]);

  const handleSelectLanguages = (source: SpeaksLanguage, target: SpeaksLanguage) => {
    setSourceLanguage(source);
    setTargetLanguage(target);
  };

  const handleCompleteLesson = (xpGained: number) => {
    if (!activeLesson) return;

    setLastXpGained(xpGained);
    setProgress(prev => {
      const alreadyCompleted = prev.completedDays.includes(activeLesson.dayNumber);
      const nextCompleted = alreadyCompleted ? prev.completedDays : [...prev.completedDays, activeLesson.dayNumber];
      const nextDay = Math.max(prev.currentDay, activeLesson.dayNumber + 1);

      return {
        ...prev,
        completedDays: nextCompleted,
        currentDay: Math.min(28, nextDay),
        totalXp: prev.totalXp + xpGained,
        fluencyScore: Math.min(100, prev.fluencyScore + 1)
      };
    });

    setActiveLesson(null);
    setIsScorecardOpen(true);
  };

  const handleSaveWordToShabdkosh = (phrase: SpeaksPhrase) => {
    const newCard: SpeaksVocabCard = {
      id: `vc-${Date.now()}`,
      targetWord: phrase.targetText,
      transliteration: phrase.transliteration,
      meaning: phrase.sourceTranslation,
      exampleSentenceTarget: phrase.targetText,
      exampleSentenceSource: phrase.sourceTranslation,
      sourceLang: sourceLanguage.code,
      targetLang: targetLanguage.code,
      masteryLevel: 1,
      timesReviewed: 1,
      lastReviewedAt: new Date().toISOString().split('T')[0]
    };

    setVocabCards(prev => [newCard, ...prev]);
    setProgress(prev => ({
      ...prev,
      savedWordsCount: prev.savedWordsCount + 1
    }));
  };

  return (
    <div className={`min-h-screen w-full pb-20 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Floating Command Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 py-3.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Brand & Language Pair Switcher */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-orange-500/25 font-black text-lg">
                🎙️
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                  Arohi Speaks™
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 font-extrabold border border-orange-500/30">
                    POLYGLOT ACADEMY
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Zero-Hesitation Voice Learning for 22+ Indian & 150+ Global Languages
                </p>
              </div>
            </div>

            {/* Language Pair Button */}
            <button
              onClick={() => setIsLangModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-orange-500/60 transition-all text-xs font-bold text-white shadow-sm"
              title="Change source or target language"
            >
              <span>{sourceLanguage.flag} {sourceLanguage.englishName}</span>
              <ArrowRightLeft className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-amber-400">{targetLanguage.flag} {targetLanguage.englishName}</span>
            </button>
          </div>

          {/* User Metrics & Live Call Trigger */}
          <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 overflow-x-auto">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-400 font-bold text-xs">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span>{progress.streakDays} Day Streak</span>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold text-xs">
              <Zap className="w-4 h-4 fill-amber-400" />
              <span>{progress.totalXp} XP</span>
            </div>

            {/* Words Saved */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold text-xs">
              <Bookmark className="w-4 h-4" />
              <span>{vocabCards.length} Words</span>
            </div>

            {/* Live Voice Call Button */}
            {onOpenVoiceCall && (
              <button
                onClick={onOpenVoiceCall}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all flex-shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Arohi</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-3 flex items-center gap-2 border-t border-slate-800/60 pt-2.5">
          <button
            onClick={() => setActiveSubTab('roadmap')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'roadmap'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            4-Week Visual Roadmap
          </button>

          <button
            onClick={() => setActiveSubTab('roleplay')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'roleplay'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Roleplay Arena ({SPEAKS_ROLEPLAY_SCENARIOS.length})
          </button>

          <button
            onClick={() => setActiveSubTab('shabdkosh')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'shabdkosh'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Universal Shabdkosh ({vocabCards.length})
          </button>
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* ROADMAP TAB */}
        {activeSubTab === 'roadmap' && (
          <SpeaksRoadmap
            weeks={curriculumWeeks}
            progress={progress}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onSelectLesson={(lesson) => setActiveLesson(lesson)}
            onOpenChest={(day) => {
              setLastXpGained(150);
              setIsScorecardOpen(true);
            }}
            isDarkMode={isDarkMode}
          />
        )}

        {/* ROLEPLAY ARENA TAB */}
        {activeSubTab === 'roleplay' && (
          <div className="w-full max-w-5xl mx-auto">
            <div className="mb-6 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                <Target className="w-6 h-6 text-orange-400" />
                Global Roleplay Arena
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-world simulation rooms. Practice ordering coffee, clearing immigration, handling corporate meetings, and high-stakes job interviews in {targetLanguage.englishName}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPEAKS_ROLEPLAY_SCENARIOS.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => setActiveRoleplayScenario(sc)}
                  className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/60 hover:bg-slate-900 transition-all cursor-pointer shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                        {sc.category} • {sc.difficulty}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Partner: <strong className="text-slate-200">{sc.aiPersonaName}</strong>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {sc.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                      {sc.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 truncate max-w-[220px]">
                      📍 {sc.location}
                    </span>
                    <span className="text-orange-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Enter Arena <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SHABDKOSH TAB */}
        {activeSubTab === 'shabdkosh' && (
          <SpeaksShabdkosh
            cards={vocabCards}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onUpdateCardMastery={(id, lvl) => {
              setVocabCards(prev => prev.map(c => c.id === id ? { ...c, masteryLevel: lvl } : c));
            }}
            onDeleteCard={(id) => {
              setVocabCards(prev => prev.filter(c => c.id !== id));
            }}
            onAddNewCard={(card) => {
              setVocabCards(prev => [card as SpeaksVocabCard, ...prev]);
            }}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* MODALS */}
      {/* 1. Language Selector Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onSelectLanguages={handleSelectLanguages}
        isDarkMode={isDarkMode}
      />

      {/* 2. Practice Engine Modal */}
      {activeLesson && (
        <SpeaksPracticeEngine
          lesson={activeLesson}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onCompleteLesson={handleCompleteLesson}
          onClose={() => setActiveLesson(null)}
          onSaveWordToShabdkosh={handleSaveWordToShabdkosh}
          isDarkMode={isDarkMode}
        />
      )}

      {/* 3. Roleplay Scenario Modal */}
      {activeRoleplayScenario && (
        <SpeaksRoleplayModal
          scenario={activeRoleplayScenario}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onClose={() => setActiveRoleplayScenario(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* 4. Scorecard Modal */}
      <SpeaksScorecardModal
        isOpen={isScorecardOpen}
        onClose={() => setIsScorecardOpen(false)}
        xpGained={lastXpGained}
        progress={progress}
        targetLanguage={targetLanguage}
        sourceLanguage={sourceLanguage}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
