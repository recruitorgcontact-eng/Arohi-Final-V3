import React, { useState } from 'react';
import { 
  Search, Sparkles, Trophy, Clock, CheckCircle2, Award, 
  BookOpen, Brain, Play, Filter, HeartPulse, Landmark, 
  GraduationCap, Building, ChevronRight, Layers, HelpCircle,
  TrendingUp, Users, ShieldAlert, ArrowRight
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
}

export default function MockTestCatalog({
  tests = INITIAL_MOCK_TESTS,
  isDarkMode = true,
  onSelectTest,
  onOpenCustomGenerator,
  onOpenLeaderboard,
  onOpenInChatQuiz
}: MockTestCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');

  const filteredTests = tests.filter((test) => {
    // Category filter
    if (selectedCategory !== 'all' && test.mainCategory !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = test.title.toLowerCase().includes(q) || (test.titleOdia && test.titleOdia.includes(q));
      const matchDesc = test.shortDescription.toLowerCase().includes(q);
      const matchTarget = test.targetExam.toLowerCase().includes(q);
      const matchSubject = test.questions.some(qn => qn.subject.toLowerCase().includes(q) || qn.topic.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTarget && !matchSubject) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16 max-w-7xl mx-auto">
      
      {/* 1. HERO BANNER */}
      <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#1b1042] via-[#100a2a] to-[#260f4e] border-purple-500/40 text-white' 
          : 'bg-white border-purple-200 text-slate-900'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#00e676]/15 text-[#00e676] border border-[#00e676]/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Realistic CBT Examination Engine</span>
            </span>
            <span className="text-xs bg-purple-600/30 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full font-bold">
              Class 1-12 • All Boards • Nursing • Central &amp; State Competitive
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Arohi AI All-India Realistic <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Mock Tests &amp; AI Diagnostic Platform
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
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
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/20 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-purple-300" />
                <span>Take In-Chat Interactive Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Floating Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 mt-6 border-t border-purple-500/20 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Attempts</span>
            <div className="text-lg sm:text-xl font-black text-amber-300">145,000+</div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Special Nursing Track</span>
            <div className="text-lg sm:text-xl font-black text-rose-400">AIIMS / OSSSC / ESIC</div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">School &amp; Boards</span>
            <div className="text-lg sm:text-xl font-black text-emerald-400">Class 1-12 &amp; +2/+3</div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Marking Simulation</span>
            <div className="text-lg sm:text-xl font-black text-cyan-300">Real Negative Ratios</div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY SELECTOR CAROUSEL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <span>Select Your Target Exam Track</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_EXAM_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 select-none ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-purple-400 shadow-[0_4px_20px_rgba(124,58,237,0.3)] text-white scale-[1.02]'
                    : isDarkMode
                    ? 'bg-[#120d2a] border-[#291e56] hover:border-purple-500/50 hover:bg-[#191238] text-slate-300'
                    : 'bg-white border-slate-200 hover:border-purple-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-purple-500 text-white' : 'bg-purple-600/20 text-purple-300'
                  }`}>
                    {cat.id === 'nursing' ? <HeartPulse className="w-4 h-4" /> :
                     cat.id === 'school_boards' ? <GraduationCap className="w-4 h-4" /> :
                     cat.id === 'entrance_exams' ? <Award className="w-4 h-4" /> :
                     cat.id === 'competitive_state' ? <Building className="w-4 h-4" /> :
                     cat.id === 'competitive_central' ? <Landmark className="w-4 h-4" /> :
                     <Sparkles className="w-4 h-4" />}
                  </span>
                  {cat.badge && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-black leading-snug">{cat.label}</h4>
                  <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{cat.count}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SEARCH & FILTERS BAR */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mock tests (e.g. AIIMS NORCET, OSSSC Nursing, CBSE Class 10, SSC CGL, NEET, UPSC)..."
            className="w-full bg-[#120d2a] border border-[#2d2163] rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all font-medium"
          />
        </div>
      </div>

      {/* 4. TESTS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-300 uppercase tracking-wider">
            Available Mock Tests ({filteredTests.length})
          </h3>
        </div>

        {filteredTests.length === 0 ? (
          <div className="p-12 text-center bg-[#120d2a] border border-[#2d2163] rounded-3xl space-y-4">
            <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
            <h4 className="text-base font-black text-white">No mock tests matched your search query</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
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
                className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-xl ${
                  isDarkMode 
                    ? 'bg-[#120d2a] border-[#291e56] hover:border-purple-500/60 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]' 
                    : 'bg-white border-slate-200 hover:border-purple-300'
                }`}
              >
                {/* Card Header & Badges */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="bg-purple-900/40 text-purple-300 border border-purple-500/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                      {test.categoryLabel}
                    </span>
                    {test.featuredBadge && (
                      <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-yellow-300" /> {test.featuredBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-white leading-snug">
                    {test.title}
                  </h3>

                  {test.titleOdia && (
                    <p className="text-xs text-purple-300/90 font-medium">
                      {test.titleOdia}
                    </p>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {test.shortDescription}
                  </p>

                  {/* Exam Specs Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="bg-[#18113c] p-2 rounded-xl border border-purple-500/20">
                      <span className="text-[10px] text-slate-400 block font-bold">Duration</span>
                      <span className="text-xs font-black text-indigo-300">{test.durationMinutes} Mins</span>
                    </div>
                    <div className="bg-[#18113c] p-2 rounded-xl border border-purple-500/20">
                      <span className="text-[10px] text-slate-400 block font-bold">Questions</span>
                      <span className="text-xs font-black text-amber-300">{test.totalQuestions} Qs</span>
                    </div>
                    <div className="bg-[#18113c] p-2 rounded-xl border border-purple-500/20">
                      <span className="text-[10px] text-slate-400 block font-bold">Total Marks</span>
                      <span className="text-xs font-black text-emerald-300">{test.totalMarks} Marks</span>
                    </div>
                  </div>

                  {/* Section Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {test.sections.map((sec) => (
                      <span key={sec.id} className="text-[10px] font-medium bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded-md">
                        {sec.name} ({sec.totalQuestions}Q)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer & Action */}
                <div className="p-4 border-t border-[#21184d] bg-[#0e0922] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenLeaderboard(test)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Leaderboard</span>
                  </button>

                  <button
                    onClick={() => onSelectTest(test)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-1.5"
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
