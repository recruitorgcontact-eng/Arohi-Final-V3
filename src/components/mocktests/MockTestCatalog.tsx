import React, { useState } from 'react';
import { 
  Search, Sparkles, Trophy, Clock, CheckCircle2, Award, 
  BookOpen, Brain, Play, Filter, HeartPulse, Landmark, 
  GraduationCap, Building, ChevronRight, Layers, HelpCircle,
  TrendingUp, Users, ShieldAlert, ArrowRight, Zap, ShieldCheck,
  Check, Lock
} from 'lucide-react';
import { MockTest, ExamMainCategory } from '../../types/examTypes';
import { INITIAL_MOCK_TESTS, MOCK_EXAM_CATEGORIES } from '../../data/mockTestsData';

interface MockTestCatalogProps {
  tests?: MockTest[];
  isDarkMode?: boolean;
  onSelectTest: (test: MockTest) => void;
  onOpenCustomGenerator: () => void;
  onOpenLeaderboard: (test: MockTest) => void;
  onOpenInChatQuiz?: () => void;
  onOpenExamPass?: (tier?: 'silver' | 'gold') => void;
}

export default function MockTestCatalog({
  tests = INITIAL_MOCK_TESTS,
  isDarkMode = true,
  onSelectTest,
  onOpenCustomGenerator,
  onOpenLeaderboard,
  onOpenInChatQuiz,
  onOpenExamPass
}: MockTestCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedQuestionFilter, setSelectedQuestionFilter] = useState<'all' | '100' | '50' | 'sectional'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle category change
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory('all');
  };

  // Derive available subcategories for current category
  const relevantTestsForSubcats = selectedCategory === 'all' 
    ? tests 
    : tests.filter(t => t.mainCategory === selectedCategory);

  const availableSubCategories = Array.from(
    new Set(relevantTestsForSubcats.map(t => t.subCategory))
  );

  const filteredTests = tests.filter((test) => {
    // Category filter
    if (selectedCategory !== 'all' && test.mainCategory !== selectedCategory) {
      return false;
    }
    // SubCategory filter
    if (selectedSubCategory !== 'all' && test.subCategory !== selectedSubCategory) {
      return false;
    }
    // Question length filter
    if (selectedQuestionFilter === '100' && test.totalQuestions !== 100) {
      return false;
    }
    if (selectedQuestionFilter === '50' && (test.totalQuestions < 50 || test.totalQuestions === 100)) {
      return false;
    }
    if (selectedQuestionFilter === 'sectional' && test.totalQuestions >= 50) {
      return false;
    }
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = test.title.toLowerCase().includes(q) || (test.titleOdia && test.titleOdia.includes(q));
      const matchDesc = test.shortDescription.toLowerCase().includes(q);
      const matchTarget = test.targetExam.toLowerCase().includes(q);
      const matchBoard = test.board?.toLowerCase().includes(q);
      const matchCategory = test.categoryLabel.toLowerCase().includes(q);
      const matchSubject = test.questions.some(qn => qn.subject.toLowerCase().includes(q) || qn.topic.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTarget && !matchSubject && !matchBoard && !matchCategory) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16 max-w-7xl mx-auto">
      
      {/* 1. HERO BANNER */}
      <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#1b1042] via-[#100a2a] to-[#260f4e] border-purple-500/40 text-white' 
          : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200 text-slate-900 shadow-purple-100'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isDarkMode 
                ? 'bg-[#00e676]/15 text-[#00e676] border border-[#00e676]/30' 
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Realistic CBT Examination Engine</span>
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${
              isDarkMode 
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' 
                : 'bg-purple-100 text-purple-900 border border-purple-200'
            }`}>
              Class 1-12 • All Boards • Nursing • Central &amp; State Competitive
            </span>
          </div>

          <h1 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Arohi AI All-India Realistic <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-amber-300 bg-clip-text text-transparent">
              Mock Tests &amp; AI Diagnostic Platform
            </span>
          </h1>

          <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-2xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Simulate exact real exam interfaces with authentic timings, negative marking ratios, All-India Leaderboards, state-wise rank tracking, and deep AI diagnostic reports highlighting your exact improvement areas.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenCustomGenerator}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-black uppercase tracking-wider shadow-[0_4px_25px_rgba(124,58,237,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-yellow-300" />
              <span>Create AI Custom Test on Any Topic</span>
            </button>

            {onOpenInChatQuiz && (
              <button
                onClick={onOpenInChatQuiz}
                className={`px-5 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border-white/20' 
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                }`}
              >
                <HelpCircle className={`w-4 h-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} />
                <span>Take In-Chat Interactive Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Floating Quick Stats based on selected category */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 mt-6 border-t text-xs ${
          isDarkMode ? 'border-purple-500/20' : 'border-purple-200'
        }`}>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {selectedCategory === 'all' ? 'Total Available Tests' : 'Active Category Tests'}
            </span>
            <div className={`text-lg sm:text-xl font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>
              {selectedCategory === 'all' ? `${tests.length}+ Tests` : `${tests.filter(t => t.mainCategory === selectedCategory).length} Real Tests`}
            </div>
          </div>
          
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {selectedCategory === 'school_boards' ? 'Active Board Tracks' :
               selectedCategory === 'nursing' ? 'Target Nursing Exams' :
               selectedCategory === 'competitive_central' ? 'Central Govt Tracks' :
               selectedCategory === 'entrance_exams' ? 'Target Entrances' :
               selectedCategory === 'competitive_state' ? 'State PSC & Teaching' :
               'All-India Exam Tracks'}
            </span>
            <div className={`text-lg sm:text-xl font-black truncate ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
              {selectedCategory === 'school_boards' ? 'CBSE / ICSE / Odisha BSE' :
               selectedCategory === 'nursing' ? 'AIIMS / OSSSC / ESIC' :
               selectedCategory === 'competitive_central' ? 'UPSC / SSC / RRB / IBPS' :
               selectedCategory === 'entrance_exams' ? 'NEET / JEE / CUET / CLAT' :
               selectedCategory === 'competitive_state' ? 'OPSC / SI / CTET / OTET' :
               'School, Nursing & Govt'}
            </div>
          </div>

          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {selectedCategory === 'school_boards' ? 'Grades & Subjects' :
               selectedCategory === 'nursing' ? 'Clinical Focus' :
               selectedCategory === 'competitive_central' ? 'Tiers & Stages' :
               selectedCategory === 'entrance_exams' ? 'Curriculum Scope' :
               'Coverage Depth'}
            </span>
            <div className={`text-lg sm:text-xl font-black truncate ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {selectedCategory === 'school_boards' ? 'Class 1 to 10 (All Subjects)' :
               selectedCategory === 'nursing' ? 'Core Clinical & OBG/Peds' :
               selectedCategory === 'competitive_central' ? 'Tier-1 & Tier-2 CBT' :
               selectedCategory === 'entrance_exams' ? 'NTA Realistic Standard' :
               '100% Official Blueprint'}
            </div>
          </div>

          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Evaluation Mode</span>
            <div className={`text-lg sm:text-xl font-black ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>
              Real Negative Marking
            </div>
          </div>
        </div>
      </div>

      {/* 2. AROHI EXAMS™ OFFICIAL TEST PASSES (₹99 for 20 Tests / ₹199 for 50 Tests) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-base sm:text-lg font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Arohi Exams™ Passes • Unlock 100-Question CBT Tests</span>
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Valid across School Classes 1-10 (All Indian Boards) &amp; All Competitive Exams. Separate from Arohi AI subscription.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Silver Pass (20 Tests × 100 Qs = ₹99) */}
          <div className={`p-5 rounded-3xl border relative overflow-hidden transition-all flex flex-col justify-between ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#1b143c] to-[#110d29] border-purple-500/40 hover:border-purple-400' 
              : 'bg-white border-purple-200 shadow-md hover:border-purple-300'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-slate-700/50 text-slate-200 border-slate-600' 
                    : 'bg-slate-100 text-slate-800 border-slate-300'
                }`}>
                  🥈 Silver Pass
                </span>
                <span className={`text-xs font-bold line-through ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>₹499</span>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹99</span>
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>/ one-time</span>
                </div>
                <h3 className={`text-sm font-black mt-1 ${isDarkMode ? 'text-purple-200' : 'text-purple-900'}`}>
                  20 Full CBT Tests × 100 Questions (2,000 Qs)
                </h3>
              </div>

              <ul className={`space-y-1.5 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Dynamic question &amp; option shuffle on every attempt</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Official Arohi CBT Engine with live countdown timer</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Official "Arohi Exams" watermarked report export</span>
                </li>
              </ul>
            </div>

            <div className={`pt-4 mt-4 border-t ${isDarkMode ? 'border-purple-500/20' : 'border-purple-100'}`}>
              <button
                onClick={() => onOpenExamPass?.('silver')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-300" />
                <span>Unlock 20 Tests for ₹99</span>
              </button>
            </div>
          </div>

          {/* Gold Mega Pass (50 Tests × 100 Qs = ₹199) */}
          <div className={`p-5 rounded-3xl border relative overflow-hidden transition-all flex flex-col justify-between shadow-xl ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#26174a] via-[#1a0f38] to-[#120a2e] border-amber-500/50 hover:border-amber-400' 
              : 'bg-amber-50/70 border-amber-300 hover:border-amber-400'
          }`}>
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-xl shadow-md">
              👑 Best Value
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  🥇 Gold Mega Pass
                </span>
                <span className={`text-xs font-bold line-through ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>₹999</span>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-3xl font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>₹199</span>
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>/ one-time</span>
                </div>
                <h3 className={`text-sm font-black mt-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-900'}`}>
                  50 Full CBT Tests × 100 Questions (5,000 Qs)
                </h3>
              </div>

              <ul className={`space-y-1.5 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>50 full-length tests with dynamic shuffling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>All categories unlocked: Class 1-10, AIIMS NORCET, SSC, UPSC</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Unlimited AI Weakness Diagnostic &amp; Remedial practice</span>
                </li>
              </ul>
            </div>

            <div className={`pt-4 mt-4 border-t ${isDarkMode ? 'border-amber-500/20' : 'border-amber-200'}`}>
              <button
                onClick={() => onOpenExamPass?.('gold')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>Unlock 50 Tests for ₹199</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CATEGORY SELECTOR CAROUSEL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-base sm:text-lg font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <Layers className="w-5 h-5 text-purple-500" />
            <span>Select Your Target Exam Track</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_EXAM_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const categoryTestCount = cat.id === 'all' 
              ? tests.length 
              : tests.filter(t => t.mainCategory === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 select-none ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-700 to-indigo-700 border-purple-500 shadow-[0_4px_20px_rgba(124,58,237,0.3)] text-white scale-[1.02]'
                    : isDarkMode
                    ? 'bg-[#120d2a] border-[#291e56] hover:border-purple-500/50 hover:bg-[#191238] text-slate-300'
                    : 'bg-white border-slate-200 hover:border-purple-300 text-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isSelected 
                      ? 'bg-purple-500 text-white' 
                      : isDarkMode 
                      ? 'bg-purple-600/20 text-purple-300' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {cat.id === 'nursing' ? <HeartPulse className="w-4 h-4" /> :
                     cat.id === 'school_boards' ? <GraduationCap className="w-4 h-4" /> :
                     cat.id === 'entrance_exams' ? <Award className="w-4 h-4" /> :
                     cat.id === 'competitive_state' ? <Building className="w-4 h-4" /> :
                     cat.id === 'competitive_central' ? <Landmark className="w-4 h-4" /> :
                     <Sparkles className="w-4 h-4" />}
                  </span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    isSelected
                      ? 'bg-purple-800 text-white border-purple-400'
                      : isDarkMode 
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                      : 'bg-purple-50 text-purple-800 border-purple-200'
                  }`}>
                    {categoryTestCount} Tests
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black leading-snug">{cat.label}</h4>
                  <p className={`text-[10px] font-medium truncate mt-0.5 ${
                    isSelected ? 'text-purple-100' : isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>{cat.count}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SEARCH & SUB-CATEGORY FILTERS */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all mock tests (e.g. AIIMS NORCET, Odisha BSE 10th, CBSE 10, SSC CGL, NEET, UPSC, RRB NTPC, CTET)..."
              className={`w-full border rounded-2xl pl-10 pr-4 py-3 text-xs font-medium focus:outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#120d2a] border-[#2d2163] text-white placeholder-slate-400 focus:border-purple-400' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-500 shadow-sm'
              }`}
            />
          </div>

          <button
            onClick={onOpenCustomGenerator}
            className={`w-full sm:w-auto px-4 py-3 rounded-2xl border text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
              isDarkMode 
                ? 'bg-purple-600/20 hover:bg-purple-600/30 border-purple-500/40 text-purple-300 hover:text-white' 
                : 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-800'
            }`}
          >
            <Brain className="w-4 h-4 text-amber-500" />
            <span>Generate On-Demand Test</span>
          </button>
        </div>

        {/* Sub-Category Filter Pills */}
        {availableSubCategories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <Filter className="w-3 h-3 text-purple-500" />
              <span>Sub-Track:</span>
            </span>

            <button
              onClick={() => setSelectedSubCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs shrink-0 cursor-pointer ${
                selectedSubCategory === 'all'
                  ? 'bg-purple-600 text-white shadow-md'
                  : isDarkMode
                  ? 'bg-[#18113c] text-slate-300 border border-purple-500/20 hover:bg-purple-500/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-purple-50'
              }`}
            >
              All Sub-Tracks ({relevantTestsForSubcats.length})
            </button>

            {availableSubCategories.map((subcat) => {
              const count = relevantTestsForSubcats.filter(t => t.subCategory === subcat).length;
              const sampleTest = relevantTestsForSubcats.find(t => t.subCategory === subcat);
              const label = sampleTest ? sampleTest.targetExam.replace(/\s*2026/g, '') : subcat;

              return (
                <button
                  key={subcat}
                  onClick={() => setSelectedSubCategory(subcat)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    selectedSubCategory === subcat
                      ? 'bg-purple-600 text-white shadow-md'
                      : isDarkMode
                      ? 'bg-[#18113c] text-slate-300 border border-purple-500/20 hover:bg-purple-500/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-purple-50'
                  }`}
                >
                  <span>{label}</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Question Volume Filter Pills (100 Qs / 50 Qs / Drills) */}
        <div className={`flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none text-xs border-t ${
          isDarkMode ? 'border-purple-500/15' : 'border-slate-200'
        }`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1 ${
            isDarkMode ? 'text-amber-400' : 'text-amber-700'
          }`}>
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Question Volume:</span>
          </span>

          <button
            onClick={() => setSelectedQuestionFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs shrink-0 cursor-pointer ${
              selectedQuestionFilter === 'all'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : isDarkMode
                ? 'bg-[#18113c] text-slate-300 border border-purple-500/20 hover:bg-purple-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
            }`}
          >
            All Papers ({tests.length})
          </button>

          <button
            onClick={() => setSelectedQuestionFilter('100')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedQuestionFilter === '100'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black shadow-md'
                : isDarkMode
                ? 'bg-[#18113c] text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <span>💯 100-Question Grand CBT Mocks</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              isDarkMode ? 'bg-amber-950/40 text-amber-300' : 'bg-amber-100 text-amber-900'
            }`}>
              {tests.filter(t => t.totalQuestions === 100).length}
            </span>
          </button>

          <button
            onClick={() => setSelectedQuestionFilter('50')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedQuestionFilter === '50'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 font-black shadow-md'
                : isDarkMode
                ? 'bg-[#18113c] text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20'
                : 'bg-white text-cyan-800 border border-cyan-200 hover:bg-cyan-50'
            }`}
          >
            <span>⚡ 50-Question Full Mocks</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              isDarkMode ? 'bg-cyan-950/40 text-cyan-300' : 'bg-cyan-100 text-cyan-900'
            }`}>
              {tests.filter(t => t.totalQuestions >= 50 && t.totalQuestions < 100).length}
            </span>
          </button>

          <button
            onClick={() => setSelectedQuestionFilter('sectional')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedQuestionFilter === 'sectional'
                ? 'bg-purple-600 text-white font-black shadow-md'
                : isDarkMode
                ? 'bg-[#18113c] text-purple-300 border border-purple-500/30 hover:bg-purple-500/20'
                : 'bg-white text-purple-800 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            <span>🎯 High-Yield Sectional Drills</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              isDarkMode ? 'bg-purple-950/40 text-purple-300' : 'bg-purple-100 text-purple-900'
            }`}>
              {tests.filter(t => t.totalQuestions < 50).length}
            </span>
          </button>
        </div>
      </div>

      {/* 4. TESTS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Available Mock Tests ({filteredTests.length})
          </h3>
        </div>

        {filteredTests.length === 0 ? (
          <div className={`p-12 text-center border rounded-3xl space-y-4 ${
            isDarkMode ? 'bg-[#120d2a] border-[#2d2163]' : 'bg-white border-slate-200'
          }`}>
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No mock tests matched your search query</h4>
            <p className={`text-xs max-w-md mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              You can instantly synthesize a custom exam paper with Arohi AI for your exact subject or syllabus.
            </p>
            <button
              onClick={onOpenCustomGenerator}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Generate AI Custom Test
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-lg ${
                  isDarkMode 
                    ? 'bg-[#120d2a] border-[#291e56] hover:border-purple-500/60 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]' 
                    : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                {/* Card Header & Badges */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-purple-900/40 text-purple-300 border-purple-500/30' 
                        : 'bg-purple-50 text-purple-800 border-purple-200'
                    }`}>
                      {test.categoryLabel}
                    </span>
                    {test.featuredBadge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                        isDarkMode 
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        <Sparkles className="w-3 h-3 text-amber-500" /> {test.featuredBadge}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-black leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {test.title}
                  </h3>

                  {test.titleOdia && (
                    <p className={`text-xs font-semibold ${isDarkMode ? 'text-purple-300/90' : 'text-purple-700'}`}>
                      {test.titleOdia}
                    </p>
                  )}

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {test.shortDescription}
                  </p>

                  {/* Exam Specs Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className={`p-2 rounded-xl border ${
                      isDarkMode ? 'bg-[#18113c] border-purple-500/20' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Duration</span>
                      <span className={`text-xs font-black ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>{test.durationMinutes} Mins</span>
                    </div>
                    <div className={`p-2 rounded-xl border ${
                      isDarkMode ? 'bg-[#18113c] border-purple-500/20' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Questions</span>
                      <span className={`text-xs font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>{test.totalQuestions} Qs</span>
                    </div>
                    <div className={`p-2 rounded-xl border ${
                      isDarkMode ? 'bg-[#18113c] border-purple-500/20' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Marks</span>
                      <span className={`text-xs font-black ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{test.totalMarks} Marks</span>
                    </div>
                  </div>

                  {/* Section Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {test.sections.map((sec) => (
                      <span key={sec.id} className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                        isDarkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        {sec.name} ({sec.totalQuestions}Q)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer & Action */}
                <div className={`p-4 border-t flex items-center justify-between gap-3 ${
                  isDarkMode ? 'border-[#21184d] bg-[#0e0922]' : 'border-slate-100 bg-slate-50/80'
                }`}>
                  <button
                    onClick={() => onOpenLeaderboard(test)}
                    className={`inline-flex items-center gap-1 text-[11px] font-bold transition-colors cursor-pointer ${
                      isDarkMode ? 'text-amber-300 hover:text-amber-200' : 'text-amber-700 hover:text-amber-800'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Leaderboard</span>
                  </button>

                  <button
                    onClick={() => onSelectTest(test)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    <span>Start Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
