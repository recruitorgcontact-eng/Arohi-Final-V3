import React, { useState, useEffect } from 'react';
import { 
  Trophy, CheckCircle2, Flame, Award, ArrowRight, BookOpen, 
  GraduationCap, Building2, Play, Sparkles, TrendingUp, BarChart3, 
  FileText, BrainCircuit, Target, Check, ChevronRight, Crown,
  Layers, Star, ShieldCheck, Clock, LogIn, User, Bot, FileCheck
} from 'lucide-react';
import { MockTest } from '../../types/examTypes';
import { useAuth } from '../../context/AuthContext';
import ArohiGamingArenaBannerButton from './ArohiGamingArenaBannerButton';

interface ArohiExamsHomeProps {
  isDarkMode?: boolean;
  tests: MockTest[];
  onSelectCategory: (category: 'school' | 'competitive' | 'state') => void;
  onSelectTest: (test: MockTest) => void;
  onOpenSubjectPicker?: (category: 'school' | 'competitive' | 'state', test?: MockTest) => void;
  onOpenAiAnalysis: () => void;
  onOpenStudyPlan: () => void;
  onOpenAiMentor: () => void;
  onOpenExamPass: () => void;
  onOpenArena?: () => void;
  onNavigateTab?: (tab: string) => void;
  onOpenAuth?: () => void;
  freeAttemptsCount?: number;
  remainingFreeTests?: number;
  hasActivePass?: boolean;
  maxFreeTests?: number;
}

export default function ArohiExamsHome({
  isDarkMode = false,
  tests,
  onSelectCategory,
  onSelectTest,
  onOpenSubjectPicker,
  onOpenAiAnalysis,
  onOpenStudyPlan,
  onOpenAiMentor,
  onOpenExamPass,
  onOpenArena,
  onNavigateTab,
  onOpenAuth,
  freeAttemptsCount = 0,
  remainingFreeTests = 5,
  hasActivePass = false,
  maxFreeTests = 5
}: ArohiExamsHomeProps) {
  const { user, userData, userMemory } = useAuth();
  const [localPass, setLocalPass] = useState<any>(() => {
    try {
      const stored = localStorage.getItem('arohi_exam_pass');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  useEffect(() => {
    const handlePassUpdate = (e: any) => {
      if (e.detail) setLocalPass(e.detail);
    };
    window.addEventListener('arohi_exam_pass_activated', handlePassUpdate);
    window.addEventListener('arohi_exam_pass_updated', handlePassUpdate);
    return () => {
      window.removeEventListener('arohi_exam_pass_activated', handlePassUpdate);
      window.removeEventListener('arohi_exam_pass_updated', handlePassUpdate);
    };
  }, []);

  const activePass = userData?.examPass || localPass;
  const passTestsRemaining = typeof activePass?.testsRemaining === 'number' 
    ? activePass.testsRemaining 
    : (activePass?.totalTests || (activePass?.tier === 'silver' ? 10 : activePass?.tier === 'gold' ? 25 : 60));
  const passTotalTests = activePass?.totalTests || (activePass?.tier === 'silver' ? 10 : activePass?.tier === 'gold' ? 25 : 60);
  const isPassExpired = Boolean(activePass?.expiresAt && new Date(activePass.expiresAt).getTime() < Date.now());
  const isSubscriber = Boolean(
    userData?.isSubscribed || 
    (userData?.subscriptionEndDate && userData.subscriptionEndDate > Date.now())
  );
  const isPassValid = Boolean((activePass && passTestsRemaining > 0 && !isPassExpired) || isSubscriber);
  
  // Resolve user display name strictly from logged-in credentials or fallback to 'Candidate'
  const rawDisplayName = 
    userData?.profile?.name || 
    userData?.displayName || 
    userMemory?.displayName || 
    user?.displayName || 
    (user?.email ? user.email.split('@')[0] : '');

  const resolvedName = rawDisplayName && rawDisplayName.trim().length > 0 
    ? rawDisplayName.trim() 
    : 'Candidate';

  const greetingName = user ? resolvedName : 'Candidate';
  const isCandidateLoggedIn = Boolean(user && user.uid);

  // Candidate recent progress from localStorage or default simulation
  const [userStats, setUserStats] = useState({
    testsTaken: 48,
    averageScore: '82.6%',
    allIndiaRank: '2,453',
    percentile: '94.7',
    streakDays: 27
  });

  useEffect(() => {
    try {
      const historyStr = localStorage.getItem('arohi_mock_test_submissions');
      if (historyStr) {
        const history = JSON.parse(historyStr);
        if (Array.isArray(history) && history.length > 0) {
          const totalScores = history.reduce((acc: number, curr: any) => acc + (curr.accuracy || 80), 0);
          setUserStats(prev => ({
            ...prev,
            testsTaken: Math.max(history.length, 48),
            averageScore: `${Math.round(totalScores / history.length)}%`
          }));
        }
      }
    } catch (e) {}
  }, []);

  // Representative resume test
  const resumeTest = tests.find(t => t.slug?.includes('jee') || t.title?.toLowerCase().includes('jee')) || tests[0];

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24 animate-in fade-in duration-200">
      
      {/* 1. STUDENT WELCOME & STREAK BANNER (Apple ID Aesthetic) */}
      <div className={`p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between gap-3 relative overflow-hidden transition-all ${
        isDarkMode 
          ? 'bg-zinc-900/60 border-white/[0.08] text-white' 
          : 'bg-white/90 border-black/[0.06] text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
      }`}>
        <div className="flex items-center gap-3 z-10 min-w-0">
          <div className="relative shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/70 dark:border-white/[0.08] flex items-center justify-center font-semibold text-sm text-zinc-800 dark:text-zinc-200">
              {isCandidateLoggedIn ? (
                greetingName.charAt(0).toUpperCase()
              ) : (
                <User className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              )}
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 ${
              isDarkMode ? 'border-zinc-900' : 'border-white'
            } ${isCandidateLoggedIn ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-sm sm:text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 truncate">
                Hello, {greetingName}
              </h1>
              <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/[0.08]">
                {isCandidateLoggedIn ? 'Active' : 'Guest'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
              Practice Today, Achieve Tomorrow • Computer Based Test Hub
            </p>
          </div>
        </div>

        {/* Day Streak Capsule */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span className="text-xs font-semibold">{userStats.streakDays}</span>
          <span className="text-[10px] tracking-wider uppercase font-medium hidden xs:inline">Days</span>
        </div>
      </div>

      {/* 2. 4-METRIC STATS STRIP (Micro Minimal Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Tests Taken */}
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
          isDarkMode ? 'bg-zinc-900/40 border-white/[0.06]' : 'bg-white/80 border-black/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
        }`}>
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider truncate">Tests Taken</div>
            <div className="text-sm sm:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight mt-0.5">{userStats.testsTaken}</div>
          </div>
        </div>

        {/* Average Score */}
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
          isDarkMode ? 'bg-zinc-900/40 border-white/[0.06]' : 'bg-white/80 border-black/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
        }`}>
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Target className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider truncate">Avg Score</div>
            <div className="text-sm sm:text-[15px] font-semibold text-emerald-600 dark:text-emerald-400 leading-tight mt-0.5">{userStats.averageScore}</div>
          </div>
        </div>

        {/* All India Rank */}
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
          isDarkMode ? 'bg-zinc-900/40 border-white/[0.06]' : 'bg-white/80 border-black/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
        }`}>
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider truncate">All India Rank</div>
            <div className="text-sm sm:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight mt-0.5">{userStats.allIndiaRank}</div>
          </div>
        </div>

        {/* Percentile */}
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
          isDarkMode ? 'bg-zinc-900/40 border-white/[0.06]' : 'bg-white/80 border-black/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
        }`}>
          <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider truncate">Percentile</div>
            <div className="text-sm sm:text-[15px] font-semibold text-purple-600 dark:text-purple-400 leading-tight mt-0.5">{userStats.percentile}</div>
          </div>
        </div>
      </div>

      {/* 3. FREE QUOTA & EXAM PASS BANNER (Apple Wallet Style) */}
      <div className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
        hasActivePass
          ? isDarkMode
            ? 'bg-emerald-950/20 border-emerald-500/20 text-white'
            : 'bg-emerald-50/50 border-emerald-200/80 text-zinc-900'
          : isDarkMode 
            ? 'bg-zinc-900/50 border-white/[0.08] text-white' 
            : 'bg-zinc-50/80 border-black/[0.06] text-zinc-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            isPassValid ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
          }`}>
            {isPassValid ? (
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            ) : (
              <Crown className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-[13px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {isPassValid ? (activePass?.name || 'Arohi Exam Pass') : 'Free Tier (5 Practice Tests)'}
              </h3>
              <span className="text-[9.5px] font-medium px-2 py-0.2 rounded-full bg-zinc-200/70 dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-300">
                {isPassValid ? `${passTestsRemaining}/${passTotalTests} Left` : `${remainingFreeTests}/${maxFreeTests} Left`}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isPassValid 
                ? 'Full CBT simulator unlocked across School, Competitive, and State Exams.'
                : '5 tests included free. Upgrade for extended test packs starting at ₹99.'}
            </p>
          </div>
        </div>
        
        <button
          onClick={onOpenExamPass}
          className="self-stretch sm:self-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 active:scale-95 transition-all cursor-pointer text-center shrink-0"
        >
          {isPassValid ? 'Pass Details' : 'View Passes (₹99)'}
        </button>
      </div>

      {/* 3.5 AROHI EXAMS GAMING ARENA HERO */}
      <ArohiGamingArenaBannerButton
        onClick={() => {
          if (onOpenArena) onOpenArena();
        }}
        isDarkMode={isDarkMode}
      />

      {/* 4. EXPLORE TESTS CATEGORY CARDS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div>
            <h2 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">Domains</h2>
            <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Explore Examination Categories</p>
          </div>
          <button 
            onClick={() => onSelectCategory('competitive')}
            className="text-[11px] font-medium text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* School Exams Card */}
          <div 
            onClick={() => onOpenSubjectPicker ? onOpenSubjectPicker('school') : onSelectCategory('school')}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:border-zinc-400 dark:hover:border-white/30 active:scale-[0.99] group ${
              isDarkMode 
                ? 'bg-zinc-900/50 border-white/[0.08]' 
                : 'bg-white border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300">
                Classes 1–12
              </span>
            </div>
            <h3 className="font-semibold text-xs sm:text-[13px] text-zinc-900 dark:text-zinc-100">School Exams</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">CBSE, ICSE & State Boards</p>
            <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-500 transition-colors">
              <span>Choose Subject</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Competitive Exams Card */}
          <div 
            onClick={() => onOpenSubjectPicker ? onOpenSubjectPicker('competitive') : onSelectCategory('competitive')}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:border-zinc-400 dark:hover:border-white/30 active:scale-[0.99] group ${
              isDarkMode 
                ? 'bg-zinc-900/50 border-white/[0.08]' 
                : 'bg-white border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300">
                National Level
              </span>
            </div>
            <h3 className="font-semibold text-xs sm:text-[13px] text-zinc-900 dark:text-zinc-100">Competitive Exams</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">JEE, NEET, UPSC, SSC, Bank & RLY</p>
            <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-500 transition-colors">
              <span>Choose Subject</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* State Exams Card */}
          <div 
            onClick={() => onOpenSubjectPicker ? onOpenSubjectPicker('state') : onSelectCategory('state')}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:border-zinc-400 dark:hover:border-white/30 active:scale-[0.99] group ${
              isDarkMode 
                ? 'bg-zinc-900/50 border-white/[0.08]' 
                : 'bg-white border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300">
                State Boards
              </span>
            </div>
            <h3 className="font-semibold text-xs sm:text-[13px] text-zinc-900 dark:text-zinc-100">State Exams</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">PCS, Police SI, TET & State Gov</p>
            <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors">
              <span>Choose Subject</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. CONTINUE YOUR PREPARATION (Compact Pill Card) */}
      <div className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        isDarkMode ? 'bg-zinc-900/40 border-white/[0.08]' : 'bg-white border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
      }`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-purple-600 dark:text-purple-400">
                In Progress
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-[10px] text-zinc-400 font-medium">60% Completed</span>
            </div>
            <h3 className="text-xs sm:text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 truncate mt-0.5">
              {resumeTest.title}
            </h3>
          </div>
        </div>

        <button
          onClick={() => onSelectTest(resumeTest)}
          className="self-stretch sm:self-center px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-medium hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0 text-center"
        >
          Resume Test
        </button>
      </div>

      {/* 6. AI FEATURES STRIP (4 Micro Blocks) */}
      <div className="space-y-2">
        <div className="px-0.5">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">AI Intelligence</h2>
          <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Smart Exam Tools</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Arohi AI Analysis */}
          <div 
            onClick={onOpenAiAnalysis}
            className={`p-3 rounded-xl border cursor-pointer transition-all hover:border-zinc-400 dark:hover:border-white/30 active:scale-[0.98] ${
              isDarkMode ? 'bg-zinc-900/40 border-white/[0.06]' : 'bg-white border-black/[0.05]'
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-500 flex items-center justify-center mb-2">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">AI Analysis</h4>
            <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-1">Personalized feedback</p>
          </div>

          {/* Smart Recommendations */}
          <div 
            onClick={onOpenStudyPlan}
            className={`p-3 rounded-xl border cursor-pointer transition-all hover:border-zinc-400 dark:hover:border-white/30 active:scale-[0.98] ${
              isDarkMode ? 'bg-zinc-900/40 border-white/[0.06]' : 'bg-white border-black/[0.05]'
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
              <Target className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Study Plan</h4>
            <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-1">Target weak areas</p>
          </div>

          {/* Performance Tracking */}
          <div 
            onClick={onOpenAiAnalysis}
            className={`p-3 rounded-xl border cursor-pointer transition-all hover:border-zinc-400 dark:hover:border-white/30 active:scale-[0.98] ${
              isDarkMode ? 'bg-zinc-900/40 border-white/[0.06]' : 'bg-white border-black/[0.05]'
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">AIR Tracking</h4>
            <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-1">Detailed ranking data</p>
          </div>

          {/* PDF Solutions */}
          <div 
            onClick={onOpenAiMentor}
            className={`p-3 rounded-xl border cursor-pointer transition-all hover:border-zinc-400 dark:hover:border-white/30 active:scale-[0.98] ${
              isDarkMode ? 'bg-zinc-900/40 border-white/[0.06]' : 'bg-white border-black/[0.05]'
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
              <FileCheck className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Solutions</h4>
            <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-1">Step-by-step papers</p>
          </div>
        </div>
      </div>

    </div>
  );
}
