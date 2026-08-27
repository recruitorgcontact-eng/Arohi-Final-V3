import React, { useState } from 'react';
import { 
  Search, Bell, BookOpen, GraduationCap, Building2, Flame, 
  Sparkles, Gift, Heart, ArrowRight, ChevronRight, Crown,
  Clock, CheckCircle, FileText
} from 'lucide-react';
import { MockTest } from '../../types/examTypes';
import ArohiGamingArenaBannerButton from './ArohiGamingArenaBannerButton';
import { useAuth } from '../../context/AuthContext';

interface ArohiExamsCatalogViewProps {
  isDarkMode?: boolean;
  tests: MockTest[];
  onSelectTest: (test: MockTest) => void;
  onOpenSubjectPicker?: (category?: 'all' | 'school' | 'competitive' | 'state', test?: MockTest) => void;
  onOpenExamPass: () => void;
  onOpenArena?: () => void;
  initialCategoryTab?: 'all' | 'school' | 'competitive' | 'state';
  freeAttemptsCount?: number;
  remainingFreeTests?: number;
  hasActivePass?: boolean;
  maxFreeTests?: number;
}

export default function ArohiExamsCatalogView({
  isDarkMode = false,
  tests,
  onSelectTest,
  onOpenSubjectPicker,
  onOpenExamPass,
  onOpenArena,
  initialCategoryTab = 'all',
  freeAttemptsCount = 0,
  remainingFreeTests = 5,
  hasActivePass = false,
  maxFreeTests = 5
}: ArohiExamsCatalogViewProps) {
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'school' | 'competitive' | 'state'>(initialCategoryTab);
  const [activeFilter, setActiveFilter] = useState<'all' | 'trending' | 'new' | 'free' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Count tests by categories
  const schoolTestsCount = tests.filter(t => t.mainCategory?.toLowerCase().includes('school') || t.board).length;
  const compTestsCount = tests.filter(t => t.mainCategory?.toLowerCase().includes('central') || t.mainCategory?.toLowerCase().includes('national') || t.subCategory?.includes('JEE') || t.subCategory?.includes('NEET') || t.subCategory?.includes('UPSC') || t.subCategory?.includes('SSC')).length;
  const stateTestsCount = tests.filter(t => t.mainCategory?.toLowerCase().includes('state') || t.subCategory?.includes('OPSC') || t.subCategory?.includes('BPSC') || t.subCategory?.includes('Police')).length;

  // Filter tests
  const filteredTests = tests.filter(t => {
    if (activeCategoryTab === 'school') {
      if (!t.mainCategory?.toLowerCase().includes('school') && !t.board) return false;
    } else if (activeCategoryTab === 'competitive') {
      if (!t.mainCategory?.toLowerCase().includes('central') && !t.mainCategory?.toLowerCase().includes('national') && !t.subCategory?.includes('JEE') && !t.subCategory?.includes('NEET') && !t.subCategory?.includes('UPSC') && !t.subCategory?.includes('SSC')) return false;
    } else if (activeCategoryTab === 'state') {
      if (!t.mainCategory?.toLowerCase().includes('state') && !t.subCategory?.includes('OPSC') && !t.subCategory?.includes('Police')) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.subCategory?.toLowerCase().includes(q) ||
        t.mainCategory?.toLowerCase().includes(q) ||
        t.board?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const { userData } = useAuth();
  const activePass = userData?.examPass || (() => {
    try {
      const stored = localStorage.getItem('arohi_exam_pass');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  })();

  const passTestsRemaining = typeof activePass?.testsRemaining === 'number' 
    ? activePass.testsRemaining 
    : (activePass?.totalTests || 10);
  const passTotalTests = activePass?.totalTests || (activePass?.tier === 'silver' ? 10 : activePass?.tier === 'gold' ? 25 : 60);

  return (
    <div className="space-y-7 max-w-4xl mx-auto pb-28 animate-in fade-in duration-300">
      
      {/* 1. HEADER WITH AROHI EXAMS HERO */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Exams Hub</span>
            <span className="text-2xl">📚</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
            Choose your exam category and start high-yield CBT practice
          </p>
        </div>

        {/* 3D Character Illustration */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-purple-300 bg-gradient-to-tr from-purple-100 to-indigo-100 flex items-center justify-center shrink-0 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
            alt="Arohi Character"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* GAMING ARENA HERO BUTTON BANNER */}
      {onOpenArena && (
        <ArohiGamingArenaBannerButton
          onClick={onOpenArena}
          isDarkMode={isDarkMode}
        />
      )}

      {/* 2. FREE QUOTA & PASS STATUS BANNER */}
      <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 shadow-xs ${
        hasActivePass
          ? isDarkMode
            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
            : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          : isDarkMode
            ? 'bg-purple-950/40 border-purple-800/60 text-purple-300'
            : 'bg-purple-50 border-purple-200 text-purple-950'
      }`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{hasActivePass ? '👑' : '🎁'}</span>
          <div>
            <div className="font-black text-sm sm:text-base flex items-center gap-2">
              <span>{hasActivePass ? (activePass?.name || 'Arohi Exam Pass Active') : `Free Quota: ${remainingFreeTests} of ${maxFreeTests} Tests Left`}</span>
              {hasActivePass ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white uppercase tracking-wider">
                  {passTestsRemaining} of {passTotalTests} Tests Left
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white uppercase tracking-wider">
                  All Categories
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
              {hasActivePass 
                ? `You have ${passTestsRemaining} CBT tests remaining. Dynamic shuffle and official marksheet generation active.` 
                : 'In Free tier you can attend 5 tests across School, Competitive, and State categories. Upgrade for 10-60+ tests.'}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenExamPass}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shrink-0 cursor-pointer transition-all text-center active:scale-95 shadow-xs ${
            hasActivePass
              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
              : 'bg-purple-600 text-white hover:bg-purple-500'
          }`}
        >
          {hasActivePass ? 'Pass Details & Top-up' : 'Upgrade (From ₹99)'}
        </button>
      </div>

      {/* 3. THREE TOP LEVEL CATEGORY PILLS */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setActiveCategoryTab('school')}
          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 active:scale-95 ${
            activeCategoryTab === 'school'
              ? 'bg-purple-50/90 border-purple-400 text-purple-950 dark:bg-purple-950/60 dark:border-purple-500 dark:text-purple-100 shadow-xs scale-[1.02]'
              : 'bg-white border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-200'
          }`}
        >
          <span className="text-2xl">🏫</span>
          <div className="text-sm font-bold leading-tight">School Exams</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Classes 1–12</div>
        </button>

        <button
          onClick={() => setActiveCategoryTab('competitive')}
          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 active:scale-95 ${
            activeCategoryTab === 'competitive'
              ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-100 shadow-xs scale-[1.02]'
              : 'bg-white border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-200'
          }`}
        >
          <span className="text-2xl">🎓</span>
          <div className="text-sm font-bold leading-tight">Competitive</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">JEE, NEET, UPSC</div>
        </button>

        <button
          onClick={() => setActiveCategoryTab('state')}
          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 active:scale-95 ${
            activeCategoryTab === 'state'
              ? 'bg-blue-50/90 border-blue-400 text-blue-950 dark:bg-blue-950/60 dark:border-blue-500 dark:text-blue-100 shadow-xs scale-[1.02]'
              : 'bg-white border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-200'
          }`}
        >
          <span className="text-2xl">🏛️</span>
          <div className="text-sm font-bold leading-tight">State Exams</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">State PCS, Police</div>
        </button>
      </div>

      {/* 3. SEARCH BAR */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search 136+ exams (e.g. JEE Main, NEET 2026, UPSC GS, Class 10)..."
          className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800 text-white placeholder-slate-500' 
              : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-xs'
          }`}
        />
      </div>

      {/* 4. SCHOOL EXAMS SUB-CATEGORY */}
      {(activeCategoryTab === 'all' || activeCategoryTab === 'school') && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">School Exams</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">CBSE, ICSE, State Boards and Olympiads</p>
            </div>
            <button 
              onClick={() => setActiveCategoryTab('school')}
              className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* CBSE */}
            <div 
              onClick={() => {
                const cbse = tests.find(t => t.board === 'CBSE' || t.title.includes('CBSE')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('school', cbse);
                else onSelectTest(cbse);
              }}
              className={`p-5 rounded-2xl border text-center space-y-2.5 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/70 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">📖</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">CBSE</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Classes 1–12</div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>

            {/* ICSE */}
            <div 
              onClick={() => {
                const icse = tests.find(t => t.board === 'ICSE' || t.title.includes('ICSE')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('school', icse);
                else onSelectTest(icse);
              }}
              className={`p-5 rounded-2xl border text-center space-y-2.5 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/70 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">📘</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">ICSE</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Classes 1–12</div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>

            {/* State Board */}
            <div 
              onClick={() => {
                const stateB = tests.find(t => t.board?.includes('BSE') || t.title.includes('State') || t.title.includes('BSE')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('school', stateB);
                else onSelectTest(stateB);
              }}
              className={`p-5 rounded-2xl border text-center space-y-2.5 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/70 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">🗺️</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">State Board</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Classes 1–12</div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>

            {/* Sample Papers */}
            <div 
              onClick={() => {
                const sample = tests.find(t => t.title.includes('Sample') || t.title.includes('Olympiad')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('school', sample);
                else onSelectTest(sample);
              }}
              className={`p-5 rounded-2xl border text-center space-y-2.5 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/70 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">📋</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Sample Papers</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">All Classes</div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. COMPETITIVE EXAMS SUB-CATEGORY */}
      {(activeCategoryTab === 'all' || activeCategoryTab === 'competitive') && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Competitive Exams</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Engineering, Medical, Government & Banking</p>
            </div>
            <button 
              onClick={() => {
                if (onOpenSubjectPicker) onOpenSubjectPicker('competitive');
                else setActiveCategoryTab('competitive');
              }}
              className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Choose Paper</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            {/* JEE Main */}
            <div 
              onClick={() => {
                const jee = tests.find(t => t.title.includes('JEE Main')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('competitive', jee);
                else onSelectTest(jee);
              }}
              className={`p-4 rounded-2xl border text-center space-y-2 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500' : 'bg-white border-slate-200/70 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">📐</div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">JEE Main</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Engineering</div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>

            {/* JEE Advanced */}
            <div 
              onClick={() => {
                const jeeAdv = tests.find(t => t.title.includes('JEE Advanced')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('competitive', jeeAdv);
                else onSelectTest(jeeAdv);
              }}
              className={`p-4 rounded-2xl border text-center space-y-2 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500' : 'bg-white border-slate-200/70 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">🔬</div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">JEE Adv</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">IIT Entrance</div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>

            {/* NEET */}
            <div 
              onClick={() => {
                const neet = tests.find(t => t.title.includes('NEET')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('competitive', neet);
                else onSelectTest(neet);
              }}
              className={`p-4 rounded-2xl border text-center space-y-2 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500' : 'bg-white border-slate-200/70 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">🩺</div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">NEET UG</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Medical</div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>

            {/* UPSC */}
            <div 
              onClick={() => {
                const upsc = tests.find(t => t.title.includes('UPSC')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('competitive', upsc);
                else onSelectTest(upsc);
              }}
              className={`p-4 rounded-2xl border text-center space-y-2 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500' : 'bg-white border-slate-200/70 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">🏛️</div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">UPSC CSE</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Civil Services</div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 text-xs font-bold">
                Choose Paper
              </span>
            </div>

            {/* SSC / Bank */}
            <div 
              onClick={() => {
                const ssc = tests.find(t => t.title.includes('SSC') || t.title.includes('Bank')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('competitive', ssc);
                else onSelectTest(ssc);
              }}
              className={`p-4 rounded-2xl border text-center space-y-2 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500' : 'bg-white border-slate-200/70 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">💳</div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">SSC & Bank</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">CGL, PO, Clerk</div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. STATE EXAMS SUB-CATEGORY */}
      {(activeCategoryTab === 'all' || activeCategoryTab === 'state') && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">State Exams</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">State PCS, Police, TET, and more</p>
            </div>
            <button 
              onClick={() => {
                if (onOpenSubjectPicker) onOpenSubjectPicker('state');
                else setActiveCategoryTab('state');
              }}
              className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Choose Exam</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* State PCS */}
            <div 
              onClick={() => {
                const statePcs = tests.find(t => t.title.includes('OPSC') || t.title.includes('BPSC') || t.title.includes('PCS')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('state', statePcs);
                else onSelectTest(statePcs);
              }}
              className={`p-5 rounded-2xl border text-center space-y-2.5 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-200/70 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">🏛️</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">State PCS</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Civil Services</div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>

            {/* Police Exams */}
            <div 
              onClick={() => {
                const police = tests.find(t => t.title.includes('Police') || t.title.includes('SI')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('state', police);
                else onSelectTest(police);
              }}
              className={`p-5 rounded-2xl border text-center space-y-2.5 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-200/70 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">👮</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Police Exams</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Constable, SI & more</div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>

            {/* TET Exams */}
            <div 
              onClick={() => {
                const tet = tests.find(t => t.title.includes('TET') || t.title.includes('CTET')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('state', tet);
                else onSelectTest(tet);
              }}
              className={`p-5 rounded-2xl border text-center space-y-2.5 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-200/70 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">🧑‍🏫</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">TET Exams</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Teaching Eligibility</div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>

            {/* Other State Exams */}
            <div 
              onClick={() => {
                const other = tests.find(t => t.title.includes('OSSSC') || t.title.includes('RI')) || tests[0];
                if (onOpenSubjectPicker) onOpenSubjectPicker('state', other);
                else onSelectTest(other);
              }}
              className={`p-5 rounded-2xl border text-center space-y-2.5 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-200/70 hover:shadow-md'
              }`}
            >
              <div className="text-3xl">📜</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Other State</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Group C & D Exams</div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 text-xs font-bold">
                Choose Subject
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 7. QUICK FILTERS PILLS */}
      <div className="space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Quick Filters</h3>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
              activeFilter === 'all'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            ✨ All Exams
          </button>
          <button
            onClick={() => setActiveFilter('trending')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
              activeFilter === 'trending'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            🔥 Trending
          </button>
          <button
            onClick={() => setActiveFilter('new')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
              activeFilter === 'new'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            ⚡ Newly Added
          </button>
          <button
            onClick={() => setActiveFilter('free')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
              activeFilter === 'free'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            🎁 Free Tests
          </button>
          <button
            onClick={() => setActiveFilter('favorites')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
              activeFilter === 'favorites'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            ❤️ Favorites
          </button>
        </div>
      </div>

      {/* 8. AROHI PRO ADVANTAGE CARD */}
      <div className={`p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border-purple-800/50' 
          : 'bg-gradient-to-r from-purple-50/90 to-indigo-50/90 border-purple-200/80'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-500 flex items-center justify-center shrink-0 text-2xl shadow-xs">
            🏆
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">Arohi Pro Advantage</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Unlock all 136+ mock tests, AI weak-area analysis, and 1-on-1 personalized study roadmap.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenExamPass}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer shrink-0 inline-flex items-center justify-center gap-2 active:scale-95"
        >
          <Crown className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span>Go Pro</span>
        </button>
      </div>

      {/* 9. LIST OF AVAILABLE TESTS FOR DIRECT LAUNCH */}
      <div className="space-y-3.5 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Available Mock Tests ({filteredTests.length})
          </h3>
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Tap to Start Instant CBT</span>
        </div>

        <div className="space-y-3">
          {filteredTests.slice(0, 15).map((test) => (
            <div
              key={test.id}
              onClick={() => onSelectTest(test)}
              className={`p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all hover:scale-[1.01] group shadow-xs active:scale-[0.99] ${
                isDarkMode 
                  ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500/80' 
                  : 'bg-white border-slate-200/80 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 font-black text-lg shadow-xs">
                  {test.title.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                      {test.title}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold">
                      {(test as any).difficulty || 'Moderate'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {test.subCategory || test.mainCategory} • {test.totalQuestions} Questions • {test.durationMinutes} Mins • Max Marks: {(test as any).maxMarks || test.totalQuestions * 4}
                  </p>
                </div>
              </div>

              <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs sm:text-sm font-bold group-hover:bg-purple-500 transition-all shrink-0 shadow-xs text-center">
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
