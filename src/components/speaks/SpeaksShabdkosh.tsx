import React, { useState } from 'react';
import { 
  Bookmark, 
  Volume2, 
  Search, 
  Sparkles, 
  Star, 
  Check, 
  Trash2, 
  Plus, 
  Repeat, 
  BookOpen,
  Filter
} from 'lucide-react';
import { SpeaksVocabCard, SpeaksLanguage } from '../../types/speaksTypes';

interface SpeaksShabdkoshProps {
  cards: SpeaksVocabCard[];
  sourceLanguage: SpeaksLanguage;
  targetLanguage: SpeaksLanguage;
  onUpdateCardMastery: (cardId: string, newLevel: number) => void;
  onDeleteCard: (cardId: string) => void;
  onAddNewCard: (card: Partial<SpeaksVocabCard>) => void;
  isDarkMode?: boolean;
}

export default function SpeaksShabdkosh({
  cards,
  sourceLanguage,
  targetLanguage,
  onUpdateCardMastery,
  onDeleteCard,
  onAddNewCard,
  isDarkMode = true
}: SpeaksShabdkoshProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'ALL' | 'LEARNING' | 'MASTERED'>('ALL');
  const [flippedCardIds, setFlippedCardIds] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New word form state
  const [newTargetWord, setNewTargetWord] = useState('');
  const [newTransliteration, setNewTransliteration] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newExampleTarget, setNewExampleTarget] = useState('');
  const [newExampleSource, setNewExampleSource] = useState('');

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLanguage.ttsLocale;
    window.speechSynthesis.speak(utterance);
  };

  const toggleFlip = (id: string) => {
    setFlippedCardIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredCards = cards.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      c.targetWord.toLowerCase().includes(q) ||
      c.meaning.toLowerCase().includes(q) ||
      c.transliteration.toLowerCase().includes(q);

    const matchesFilter = 
      filterMode === 'ALL' ||
      (filterMode === 'LEARNING' && c.masteryLevel < 4) ||
      (filterMode === 'MASTERED' && c.masteryLevel >= 4);

    return matchesQuery && matchesFilter;
  });

  const handleCreateWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTargetWord.trim() || !newMeaning.trim()) return;

    onAddNewCard({
      id: `vc-${Date.now()}`,
      targetWord: newTargetWord.trim(),
      transliteration: newTransliteration.trim() || newTargetWord.trim(),
      meaning: newMeaning.trim(),
      exampleSentenceTarget: newExampleTarget.trim() || newTargetWord.trim(),
      exampleSentenceSource: newExampleSource.trim() || newMeaning.trim(),
      sourceLang: sourceLanguage.code,
      targetLang: targetLanguage.code,
      masteryLevel: 1,
      timesReviewed: 1,
      lastReviewedAt: new Date().toISOString().split('T')[0]
    });

    setNewTargetWord('');
    setNewTransliteration('');
    setNewMeaning('');
    setNewExampleTarget('');
    setNewExampleSource('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-amber-400 fill-amber-400" />
              Universal Shabdkosh (Vocabulary Vault)
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              {cards.length} Words
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Interactive Spaced-Repetition flashcards with native pronunciation and mother-tongue bridge.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 hover:brightness-110 shadow-lg shadow-orange-500/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Custom Word
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-slate-800/60 border border-slate-700/60">
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterMode === 'ALL'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Cards ({cards.length})
          </button>
          <button
            onClick={() => setFilterMode('LEARNING')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterMode === 'LEARNING'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Learning
          </button>
          <button
            onClick={() => setFilterMode('MASTERED')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterMode === 'MASTERED'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mastered ⭐
          </button>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, meanings..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Flashcards Grid */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-16 p-6 rounded-3xl bg-slate-800/40 border border-slate-700/60">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h4 className="font-bold text-white text-base">No vocabulary words found</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Bookmark words during your daily lessons or click "Add Custom Word" to build your personal lexicon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card) => {
            const isFlipped = flippedCardIds.has(card.id);

            return (
              <div
                key={card.id}
                className="h-64 relative perspective-1000 group cursor-pointer"
                onClick={() => toggleFlip(card.id)}
              >
                <div
                  className={`w-full h-full duration-500 transform-style-3d relative rounded-3xl p-5 flex flex-col justify-between border shadow-lg transition-all ${
                    isFlipped
                      ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-amber-500/60 ring-1 ring-amber-500/30'
                      : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  {/* Top Bar on Card */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <Star
                          key={lvl}
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateCardMastery(card.id, lvl);
                          }}
                          className={`w-3.5 h-3.5 cursor-pointer ${
                            lvl <= card.masteryLevel
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(card.targetWord);
                        }}
                        title="Listen pronunciation"
                        className="p-1.5 rounded-xl bg-slate-700/80 hover:bg-orange-500 text-slate-300 hover:text-white transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCard(card.id);
                        }}
                        title="Remove word"
                        className="p-1.5 rounded-xl bg-slate-700/80 hover:bg-rose-500 text-slate-400 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="my-auto text-center">
                    {!isFlipped ? (
                      <>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                          {card.targetWord}
                        </h3>
                        <div className="text-xs font-semibold text-amber-400 mt-1">
                          🗣️ "{card.transliteration}"
                        </div>
                        {card.partOfSpeech && (
                          <span className="inline-block mt-2 text-[10px] uppercase font-bold text-slate-400 bg-slate-700/60 px-2 py-0.5 rounded-md">
                            {card.partOfSpeech}
                          </span>
                        )}
                        <p className="text-[11px] text-slate-500 mt-3 flex items-center justify-center gap-1">
                          <Repeat className="w-3 h-3" /> Tap to reveal meaning & example
                        </p>
                      </>
                    ) : (
                      <div className="animate-fadeIn">
                        <span className="text-[11px] uppercase font-bold text-amber-400 block mb-1">
                          Meaning in {sourceLanguage.englishName}
                        </span>
                        <h4 className="text-sm font-bold text-white mb-3">
                          {card.meaning}
                        </h4>

                        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-left">
                          <p className="text-xs text-white/90 font-medium italic">
                            "{card.exampleSentenceTarget}"
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {card.exampleSentenceSource}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Tags */}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-700/40 pt-2">
                    <span>Reviewed: {card.timesReviewed}x</span>
                    <span>{isFlipped ? 'Tap to flip back' : 'Spaced Repetition'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Custom Word Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-2xl text-white">
            <h3 className="text-lg font-bold mb-1">Add New Word to Shabdkosh</h3>
            <p className="text-xs text-slate-400 mb-4">
              Add any word you encounter during your journey in {targetLanguage.englishName}.
            </p>

            <form onSubmit={handleCreateWord} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Word in {targetLanguage.englishName}</label>
                <input
                  type="text"
                  required
                  value={newTargetWord}
                  onChange={(e) => setNewTargetWord(e.target.value)}
                  placeholder="e.g. Eloquent, Resilient, Danke"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Phonetic Transliteration (Mother Tongue)</label>
                <input
                  type="text"
                  value={newTransliteration}
                  onChange={(e) => setNewTransliteration(e.target.value)}
                  placeholder="e.g. एलोक्वेंट"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Meaning in {sourceLanguage.englishName}</label>
                <input
                  type="text"
                  required
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  placeholder="e.g. सुवक्ता / विचारों को खूबसूरती से व्यक्त करने वाला"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Example Sentence</label>
                <input
                  type="text"
                  value={newExampleTarget}
                  onChange={(e) => setNewExampleTarget(e.target.value)}
                  placeholder="e.g. Her speech was remarkably eloquent."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:brightness-110 shadow"
                >
                  Save Word
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
