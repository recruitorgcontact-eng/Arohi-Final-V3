import React, { useState } from 'react';
import { 
  Search, Sparkles, Trophy, Clock, CheckCircle2, Award, 
  BookOpen, Brain, Play, Filter, HeartPulse, Landmark, 
  GraduationCap, Building, ChevronRight, Layers, HelpCircle,
  TrendingUp, Users, ShieldAlert, ArrowRight, Zap, ShieldCheck,
  Check, Lock, MapPin, Globe2, FileText, Info, X
} from 'lucide-react';
import { MockTest, ExamMainCategory, KGBreadcrumbItem, KGLevel } from '../../types/examTypes';
import { INITIAL_MOCK_TESTS, MOCK_EXAM_CATEGORIES } from '../../data/mockTestsData';
import { resolveKGLineage } from '../../data/examKnowledgeGraph';
import { isTestInCategory } from '../../utils/examCategoryClassifier';
import ExamKGBreadcrumbs from './ExamKGBreadcrumbs';
import { 
  MASTER_EXAMS_DATABASE, 
  MASTER_EXAM_SECTORS, 
  ALL_INDIAN_STATES, 
  MasterExamDefinition 
} from '../../data/masterExamsRegistry';

interface MockTestCatalogProps {
  tests?: MockTest[];
  isDarkMode?: boolean;
  onSelectTest: (test: MockTest) => void;
  onOpenCustomGenerator: () => void;
  onOpenLeaderboard: (test: MockTest) => void;
  onOpenInChatQuiz?: () => void;
  onOpenExamPass?: (tier?: 'silver' | 'gold' | 'platinum') => void;
  onOpenKGLanding?: (test: MockTest) => void;
  onOpenSchoolBoards?: () => void;
}

export default function MockTestCatalog({
  tests = INITIAL_MOCK_TESTS,
  isDarkMode = true,
  onSelectTest,
  onOpenCustomGenerator,
  onOpenLeaderboard,
  onOpenInChatQuiz,
  onOpenExamPass,
  onOpenKGLanding,
  onOpenSchoolBoards
}: MockTestCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('All-India / Central');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedQuestionFilter, setSelectedQuestionFilter] = useState<'all' | '100' | '50' | 'sectional'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamDetails, setSelectedExamDetails] = useState<MasterExamDefinition | null>(null);
  const [showKnowledgeGraphModal, setShowKnowledgeGraphModal] = useState(false);

  // Dynamically compute active Knowledge Graph breadcrumbs for the current filter state
  const catalogBreadcrumbs: KGBreadcrumbItem[] = [
    {
      level: 'country',
      id: 'india',
      label: 'India (National)',
      slug: 'india',
      url: '/mocktests',
      badge: 'National'
    }
  ];

  if (selectedState && selectedState !== 'all' && selectedState !== 'All-India / Central') {
    catalogBreadcrumbs.push({
      level: 'state',
      id: selectedState.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label: selectedState,
      slug: selectedState.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      url: `/mocktests/state/${selectedState.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      badge: 'State Cadre'
    });
  }

  if (selectedCategory && selectedCategory !== 'all') {
    const catObj = MOCK_EXAM_CATEGORIES.find(c => c.id === selectedCategory);
    catalogBreadcrumbs.push({
      level: 'authority',
      id: selectedCategory,
      label: catObj ? catObj.label : selectedCategory,
      slug: selectedCategory,
      url: `/mocktests/category/${selectedCategory}`,
      badge: 'Authority / Sector'
    });
  }

  if (selectedSubCategory && selectedSubCategory !== 'all') {
    const sample = tests.find(t => t.subCategory === selectedSubCategory);
    catalogBreadcrumbs.push({
      level: 'exam',
      id: selectedSubCategory,
      label: sample ? sample.targetExam : selectedSubCategory,
      slug: selectedSubCategory,
      url: `/mocktests/exam/${selectedSubCategory}`,
      badge: 'Target Exam'
    });
  }

  if (searchQuery) {
    catalogBreadcrumbs.push({
      level: 'subject',
      id: 'search',
      label: `Filter: "${searchQuery}"`,
      slug: 'search',
      url: `/mocktests?q=${encodeURIComponent(searchQuery)}`
    });
  }

  const handleBreadcrumbSelect = (level: KGLevel) => {
    if (level === 'country') {
      setSelectedState('All-India / Central');
      setSelectedCategory('all');
      setSelectedSubCategory('all');
      setSearchQuery('');
    } else if (level === 'state') {
      setSelectedCategory('all');
      setSelectedSubCategory('all');
      setSearchQuery('');
    } else if (level === 'authority') {
      setSelectedSubCategory('all');
      setSearchQuery('');
    } else if (level === 'exam') {
      setSearchQuery('');
    }
  };

  // Handle category change
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory('all');
  };

  // Derive available subcategories for current category
  const relevantTestsForSubcats = selectedCategory === 'all' 
    ? tests 
    : tests.filter(t => isTestInCategory(t, selectedCategory));

  const availableSubCategories = Array.from(
    new Set(relevantTestsForSubcats.map(t => t.subCategory))
  );

  const filteredTests = tests.filter((test) => {
    // State filter
    if (selectedState !== 'All-India / Central' && selectedState !== 'all') {
      const matchState = test.state === selectedState || test.state === 'All-India / Central' || !test.state;
      if (!matchState) return false;
    }

    // Category filter using intelligent categorizer
    if (selectedCategory !== 'all' && !isTestInCategory(test, selectedCategory)) {
      return false;
    }

    // SubCategory filter
    if (selectedSubCategory !== 'all' && test.subCategory !== selectedSubCategory) {
      return false;
    }

    // Language filter
    if (selectedLanguage !== 'all') {
      if (test.supportedLanguages && !test.supportedLanguages.includes(selectedLanguage)) {
        return false;
      }
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
      const matchTitle = test.title.toLowerCase().includes(q) || 
                         (test.titleOdia && test.titleOdia.includes(q)) || 
                         (test.titleHindi && test.titleHindi.includes(q));
      const matchDesc = test.shortDescription.toLowerCase().includes(q);
      const matchTarget = test.targetExam.toLowerCase().includes(q);
      const matchBoard = test.board?.toLowerCase().includes(q);
      const matchCategory = test.categoryLabel.toLowerCase().includes(q);
      const matchStateName = test.state?.toLowerCase().includes(q);
      const matchSubject = test.questions.some(qn => 
        qn.subject.toLowerCase().includes(q) || 
        qn.topic.toLowerCase().includes(q) ||
        (qn.textHindi && qn.textHindi.toLowerCase().includes(q))
      );
      if (!matchTitle && !matchDesc && !matchTarget && !matchSubject && !matchBoard && !matchCategory && !matchStateName) return false;
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
              <span>India\'s Master Exam Knowledge Graph &amp; CBT Simulator</span>
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${
              isDarkMode 
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' 
                : 'bg-purple-100 text-purple-900 border border-purple-200'
            }`}>
              All 28 Indian States • 26 Sectors • 150+ Exams Ready
            </span>
          </div>

          <h1 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Arohi AI Master India <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-amber-300 bg-clip-text text-transparent">
              Realistic Mock Tests &amp; Official Blueprint Engine
            </span>
          </h1>

          <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-2xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Appear for authentic, ready-to-take mock tests replicating official question patterns, negative marking penalties, sectional timers, state-wise rank prediction, and AI-powered diagnostic scorecards across all national &amp; state jurisdictions.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setShowKnowledgeGraphModal(true)}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Landmark className="w-4 h-4 text-slate-950" />
              <span>Explore 26 Exam Blueprints &amp; Syllabi</span>
            </button>

            {onOpenSchoolBoards && (
              <button
                onClick={onOpenSchoolBoards}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-emerald-200" />
                <span>Class 1–12 School Boards Hub</span>
              </button>
            )}

            <button
              onClick={onOpenCustomGenerator}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-black uppercase tracking-wider shadow-[0_4px_25px_rgba(124,58,237,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-yellow-300" />
              <span>Synthesize Custom Topic Test</span>
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
                <span>Take In-Chat Quiz</span>
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
              Available Test Papers
            </span>
            <div className={`text-lg sm:text-xl font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>
              {tests.length}+ Ready Tests
            </div>
          </div>
          
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Jurisdiction / State Scope
            </span>
            <div className={`text-lg sm:text-xl font-black truncate ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
              {selectedState === 'All-India / Central' ? 'All 28 Indian States' : selectedState}
            </div>
          </div>

          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Exam Sectors Covered
            </span>
            <div className={`text-lg sm:text-xl font-black truncate ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
              26 Master Sectors
            </div>
          </div>

          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Marking Simulation
            </span>
            <div className={`text-lg sm:text-xl font-black ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>
              Official Negative Ratios
            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC KNOWLEDGE GRAPH BREADCRUMB NAVIGATION & JURISDICTION PICKER */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Knowledge Graph Relational Lineage:
          </span>
          <span className={`text-[10px] font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
            {filteredTests.length} Matching Tests
          </span>
        </div>
        <ExamKGBreadcrumbs
          breadcrumbs={catalogBreadcrumbs}
          canonicalPath={catalogBreadcrumbs[catalogBreadcrumbs.length - 1].url}
          isDarkMode={isDarkMode}
          onSelectLevel={handleBreadcrumbSelect}
        />
      </div>

      <div className={`p-5 rounded-3xl border space-y-4 ${
        isDarkMode ? 'bg-[#120d2a] border-[#291e56]' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* State Dropdown Selector */}
          <div className="w-full md:w-72 shrink-0">
            <label className={`text-[10px] font-black uppercase tracking-wider block mb-1.5 flex items-center gap-1 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Select State / Jurisdiction:</span>
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className={`w-full border rounded-2xl px-3.5 py-2.5 text-xs font-bold focus:outline-none transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#1a123a] border-purple-500/40 text-white focus:border-amber-400' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-600'
              }`}
            >
              {ALL_INDIAN_STATES.map((state) => (
                <option key={state} value={state} className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 w-full">
            <label className={`text-[10px] font-black uppercase tracking-wider block mb-1.5 flex items-center gap-1 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <Search className="w-3.5 h-3.5 text-purple-400" />
              <span>Search Across All Exams, Authorities, Boards &amp; Subjects:</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search e.g. UPSC CSE, SSC CGL, RRB NTPC, IBPS PO, NEET UG, JEE Main, CTET, UP Police, BPSC, MPSC, OPSC..."
                className={`w-full border rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#1a123a] border-purple-500/40 text-white placeholder-slate-400 focus:border-purple-400' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                }`}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none text-xs border-t border-purple-500/15">
          <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1 ${
            isDarkMode ? 'text-purple-300' : 'text-purple-700'
          }`}>
            <Globe2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Language:</span>
          </span>

          {[
            { id: 'all', label: 'All Languages' },
            { id: 'en', label: 'English' },
            { id: 'hi', label: 'हिन्दी (Hindi)' },
            { id: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
            { id: 'mr', label: 'मराठी (Marathi)' },
            { id: 'ta', label: 'தமிழ் (Tamil)' },
            { id: 'te', label: 'తెలుగు (Telugu)' },
            { id: 'bn', label: 'বাংলা (Bengali)' },
            { id: 'gu', label: 'ગુજરાતી (Gujarati)' },
            { id: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' }
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`px-3 py-1 rounded-xl font-bold transition-all text-xs shrink-0 cursor-pointer ${
                selectedLanguage === lang.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : isDarkMode
                  ? 'bg-[#18113c] text-slate-300 border border-purple-500/20 hover:bg-purple-500/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-purple-50'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. TARGET EXAM CATEGORY SECTOR CAROUSEL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-base sm:text-lg font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <Layers className="w-5 h-5 text-purple-500" />
            <span>Select Target Exam Sector (All 26 Sectors)</span>
          </h2>
          <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {tests.length} Active CBT Papers
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_EXAM_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const categoryTestCount = cat.id === 'all' 
              ? tests.length 
              : tests.filter(t => isTestInCategory(t, cat.id)).length;

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
                    {cat.id === 'medical_neet_nursing' ? <HeartPulse className="w-4 h-4" /> :
                     cat.id === 'school_boards' ? <GraduationCap className="w-4 h-4" /> :
                     cat.id === 'engineering_jee_gate' ? <Award className="w-4 h-4" /> :
                     cat.id === 'state_psc_all_28' ? <Building className="w-4 h-4" /> :
                     cat.id === 'police_state_cadres' ? <ShieldCheck className="w-4 h-4" /> :
                     cat.id === 'upsc_civil' ? <Landmark className="w-4 h-4" /> :
                     cat.id === 'railway_rrb' ? <Zap className="w-4 h-4" /> :
                     cat.id === 'teaching_tet_ctet' ? <GraduationCap className="w-4 h-4" /> :
                     cat.id === 'management_cat_mba' ? <TrendingUp className="w-4 h-4" /> :
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

      {/* 4. SUB-CATEGORY & QUESTION LENGTH FILTERS */}
      <div className="space-y-3">
        {/* Sub-Category Filter Pills */}
        {availableSubCategories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <Filter className="w-3 h-3 text-purple-500" />
              <span>Specific Exam:</span>
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
              All Sub-Exams ({relevantTestsForSubcats.length})
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
            <span>Format / Volume:</span>
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

      {/* 5. TESTS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Ready-to-Appear Mock Tests ({filteredTests.length})
          </h3>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Showing {filteredTests.length} of {tests.length} Total Papers
          </span>
        </div>

        {filteredTests.length === 0 ? (
          <div className={`p-12 text-center border rounded-3xl space-y-4 ${
            isDarkMode ? 'bg-[#120d2a] border-[#2d2163]' : 'bg-white border-slate-200'
          }`}>
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              No mock tests matched your current filter criteria
            </h4>
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
            {filteredTests.map((test, idx) => (
              <div
                key={`${test.id}-${idx}`}
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
                        : 'bg-purple-50 text-purple-950 border-purple-300 font-bold'
                    }`}>
                      {test.categoryLabel}
                    </span>
                    {test.featuredBadge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                        isDarkMode 
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
                          : 'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold'
                      }`}>
                        <Sparkles className="w-3 h-3 text-amber-500" /> {test.featuredBadge}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-black leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {test.title}
                  </h3>

                  {test.titleHindi && (
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-amber-300/90' : 'text-amber-900'}`}>
                      {test.titleHindi}
                    </p>
                  )}

                  {test.titleOdia && (
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-purple-300/90' : 'text-purple-950'}`}>
                      {test.titleOdia}
                    </p>
                  )}

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-800 font-medium'}`}>
                    {test.shortDescription}
                  </p>

                  {/* Exam Specs Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className={`p-2 rounded-xl border ${
                      isDarkMode ? 'bg-[#18113c] border-purple-500/20' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Duration</span>
                      <span className={`text-xs font-black ${isDarkMode ? 'text-indigo-300' : 'text-slate-950'}`}>{test.durationMinutes} Mins</span>
                    </div>
                    <div className={`p-2 rounded-xl border ${
                      isDarkMode ? 'bg-[#18113c] border-purple-500/20' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Questions</span>
                      <span className={`text-xs font-black ${isDarkMode ? 'text-amber-300' : 'text-slate-950'}`}>{test.totalQuestions} Qs</span>
                    </div>
                    <div className={`p-2 rounded-xl border ${
                      isDarkMode ? 'bg-[#18113c] border-purple-500/20' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Total Marks</span>
                      <span className={`text-xs font-black ${isDarkMode ? 'text-emerald-300' : 'text-slate-950'}`}>{test.totalMarks} Marks</span>
                    </div>
                  </div>

                  {/* Section Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {test.sections.map((sec) => (
                      <span key={sec.id} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                        isDarkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'
                      }`}>
                        {sec.name} ({sec.totalQuestions}Q)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer & Action */}
                <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-2 ${
                  isDarkMode ? 'border-[#21184d] bg-[#0e0922]' : 'border-slate-100 bg-slate-50/80'
                }`}>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenLeaderboard(test)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold transition-colors cursor-pointer ${
                        isDarkMode ? 'text-amber-300 hover:text-amber-200' : 'text-amber-900 hover:text-amber-950'
                      }`}
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>Rankings</span>
                    </button>

                    {onOpenKGLanding && (
                      <button
                        onClick={() => onOpenKGLanding(test)}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold transition-colors cursor-pointer px-2 py-1 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-purple-900/30 text-purple-300 border-purple-500/30 hover:bg-purple-900/50' 
                            : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                        }`}
                        title="View Official Blueprint, Syllabus & Knowledge Graph Lineage"
                      >
                        <Landmark className="w-3.5 h-3.5 text-purple-400" />
                        <span>SEO Hub</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectTest(test)}
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    <span>Appear Now ⚡</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. MASTER EXAM KNOWLEDGE GRAPH MODAL */}
      {showKnowledgeGraphModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 space-y-6 shadow-2xl ${
            isDarkMode ? 'bg-[#100a28] border-purple-500/40 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black">
                    Master India Exam Knowledge Graph Registry
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Official Authority Blueprints, Stages, Syllabi &amp; Marking Schemes across India
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowKnowledgeGraphModal(false)}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  isDarkMode ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MASTER_EXAMS_DATABASE.map((exam) => (
                <div
                  key={exam.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isDarkMode ? 'bg-[#18113c] border-purple-500/20 hover:border-purple-400' : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {exam.authorityShort} • {exam.state}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400">
                      {exam.frequency}
                    </span>
                  </div>

                  <h4 className="text-sm font-black leading-snug">{exam.name}</h4>
                  {exam.nameHindi && <p className="text-xs text-amber-300">{exam.nameHindi}</p>}

                  <p className={`text-xs line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {exam.summaryOverview}
                  </p>

                  <div className="space-y-1.5 text-[11px] pt-1">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-purple-300">Pattern:</strong>
                      <span className="truncate">{exam.totalMarksPattern}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <strong className="text-rose-300">Penalty:</strong>
                      <span>{exam.negativeMarking}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {exam.stages.map((stage, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                        {stage}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400">
                      ✓ {exam.testCountReady} Ready Papers
                    </span>
                    <button
                      onClick={() => {
                        setShowKnowledgeGraphModal(false);
                        const match = tests.find(t => t.slug === exam.featuredTestSlug);
                        if (match) {
                          onSelectTest(match);
                        } else {
                          setSearchQuery(exam.name.split(' ')[0]);
                        }
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase cursor-pointer"
                    >
                      Appear for Test ⚡
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
