import React, { useState, useEffect } from 'react';
import { 
  Trophy, CheckCircle2, Flame, Award, ArrowRight, BookOpen, 
  GraduationCap, Building2, Play, Sparkles, TrendingUp, BarChart3, 
  FileText, BrainCircuit, Target, Check, ChevronRight, Crown,
  Layers, Star, ShieldCheck, Clock, LogIn, User
} from 'lucide-react';
import { MockTest } from '../../types/examTypes';
import { useAuth } from '../../context/AuthContext';

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
  onNavigateTab,
  onOpenAuth,
  freeAttemptsCount = 0,
  remainingFreeTests = 5,
  hasActivePass = false,
  maxFreeTests = 5
}: ArohiExamsHomeProps) {
  const { user, userData, userMemory } = useAuth();
  
  // Resolve user display name strictly from logged-in credentials or fallback to 'User'
  const rawDisplayName = 
    userData?.profile?.name || 
    userData?.displayName || 
    userMemory?.displayName || 
    user?.displayName || 
    (user?.email ? user.email.split('@')[0] : '');

  const resolvedName = rawDisplayName && rawDisplayName.trim().length > 0 
    ? rawDisplayName.trim() 
    : 'User';

  const greetingName = user ? resolvedName : 'User';
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
    <div className="space-y-7 max-w-4xl mx-auto pb-28 animate-in fade-in duration-300">
      
      {/* 1. STUDENT WELCOME & STREAK BANNER */}
      <div className={`p-5 sm:p-6 rounded-3xl border flex items-center justify-between gap-4 relative overflow-hidden transition-all shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/95 border-slate-800 text-white' 
          : 'bg-gradient-to-r from-white via-purple-50/20 to-white border-slate-200/80 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center gap-4 z-10">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-purple-400 bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-800 shadow-md flex items-center justify-center">
              {isCandidateLoggedIn ? (
                <div className="w-full h-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-800 text-white font-black text-2xl flex items-center justify-center">
                  {greetingName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div className="w-full h-full bg-slate-800 text-purple-300 flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className={`absolute -bottom-1 -right-1 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white dark:border-slate-900 shadow-xs ${
              isCandidateLoggedIn ? 'bg-emerald-600' : 'bg-purple-600'
            }`}>
              {isCandidateLoggedIn ? 'ACTIVE' : 'GUEST'}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Hello, {greetingName}!
              </h1>
              <span className="text-2xl">👋</span>
            </div>
            {!isCandidateLoggedIn && onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer flex items-center gap-1 mt-1"
              >
                <span>Log in to save test scores & marksheets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
              Ready to test your knowledge today?
            </p>
            <p className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 mt-0.5">
              ✨ "Practice Today, Achieve Tomorrow!"
            </p>
          </div>
        </div>

        {/* Day Streak Card */}
        <div className={`px-4 sm:px-5 py-3 rounded-2xl border flex items-center gap-3 z-10 shadow-xs shrink-0 ${
          isDarkMode 
            ? 'bg-slate-800/90 border-slate-700' 
            : 'bg-orange-50/90 border-orange-200/80 text-orange-950'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500 animate-pulse" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
              {userStats.streakDays}
            </div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Day Streak
            </div>
          </div>
        </div>
      </div>

      {/* 2. 4-METRIC STATS STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Tests Taken */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex items-center gap-3.5 transition-all hover:scale-[1.02] shadow-xs ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/70'
        }`}>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Tests Taken</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">{userStats.testsTaken}</div>
          </div>
        </div>

        {/* Average Score */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex items-center gap-3.5 transition-all hover:scale-[1.02] shadow-xs ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/70'
        }`}>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Average Score</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{userStats.averageScore}</div>
          </div>
        </div>

        {/* All India Rank */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex items-center gap-3.5 transition-all hover:scale-[1.02] shadow-xs ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/70'
        }`}>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">All India Rank</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">{userStats.allIndiaRank}</div>
          </div>
        </div>

        {/* Percentile */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex items-center gap-3.5 transition-all hover:scale-[1.02] shadow-xs ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/70'
        }`}>
          <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Percentile</div>
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 mt-0.5">{userStats.percentile}</div>
          </div>
        </div>
      </div>

      {/* 3. FREE QUOTA & EXAM PASS BANNER */}
      <div className={`p-5 sm:p-6 rounded-3xl border relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
        hasActivePass
          ? isDarkMode
            ? 'bg-gradient-to-r from-emerald-950/50 via-teal-950/30 to-purple-950/40 border-emerald-700/50'
            : 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-indigo-50 border-emerald-300/80'
          : isDarkMode 
            ? 'bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-purple-950/50 border-purple-700/50' 
            : 'bg-gradient-to-r from-purple-50 via-pink-50/50 to-indigo-50 border-purple-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
            hasActivePass 
              ? 'bg-emerald-500/20 text-emerald-400' 
              : 'bg-amber-400/20 text-amber-500'
          }`}>
            {hasActivePass ? (
              <ShieldCheck className="w-7 h-7 text-emerald-500" />
            ) : (
              <Crown className="w-7 h-7 fill-amber-400 text-amber-500" />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                {hasActivePass ? 'Arohi Exam Pass Active' : 'Free Plan: 5 Tests in All Categories'}
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              {!hasActivePass && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white uppercase tracking-wider">
                  {remainingFreeTests} of {maxFreeTests} Free Left
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
              {hasActivePass 
                ? 'Full CBT simulator unlocked across all School (Class 1-10) and Indian Competitive Exams with AIR rankings.' 
                : `In Free tier, you can attend 5 tests across all categories. Upgrade for 10–60+ tests, AIR rank curves & digital marksheets.`}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenExamPass}
          className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-white text-sm font-black shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer active:scale-95 text-center ${
            hasActivePass
              ? 'bg-emerald-600 hover:bg-emerald-500'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
          }`}
        >
          {hasActivePass ? 'Manage Pass' : 'View Pass Options (From ₹99)'}
        </button>
      </div>

      {/* 4. EXPLORE TESTS CATEGORY CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Explore Tests</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Choose your domain to begin instant CBT practice</p>
          </div>
          <button 
            onClick={() => onSelectCategory('competitive')}
            className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* School Exams Card */}
          <div 
            onClick={() => onOpenSubjectPicker ? onOpenSubjectPicker('school') : onSelectCategory('school')}
            className={`p-6 rounded-3xl border text-center space-y-4 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group shadow-xs ${
              isDarkMode 
                ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50' 
                : 'bg-white border-slate-200/70 hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-4xl shadow-xs group-hover:scale-110 transition-transform">
              🏫
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">School Exams</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Classes 1–12 • CBSE, ICSE, State Boards</p>
            </div>
            <button className="w-full py-2.5 px-4 rounded-xl bg-purple-600 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 group-hover:bg-purple-500 transition-colors shadow-xs">
              <span>Choose Subject</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Competitive Exams Card */}
          <div 
            onClick={() => onOpenSubjectPicker ? onOpenSubjectPicker('competitive') : onSelectCategory('competitive')}
            className={`p-6 rounded-3xl border text-center space-y-4 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group shadow-xs ${
              isDarkMode 
                ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50' 
                : 'bg-white border-slate-200/70 hover:border-emerald-300 hover:shadow-md'
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-4xl shadow-xs group-hover:scale-110 transition-transform">
              🎓
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">Competitive Exams</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">JEE, NEET, UPSC, SSC, Bank & Railways</p>
            </div>
            <button className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 group-hover:bg-emerald-500 transition-colors shadow-xs">
              <span>Choose Subject</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* State Exams Card */}
          <div 
            onClick={() => onOpenSubjectPicker ? onOpenSubjectPicker('state') : onSelectCategory('state')}
            className={`p-6 rounded-3xl border text-center space-y-4 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group shadow-xs ${
              isDarkMode 
                ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/50' 
                : 'bg-white border-slate-200/70 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-4xl shadow-xs group-hover:scale-110 transition-transform">
              🏛️
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">State Exams</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">State PCS, Police SI, TET, BPSC, OPSC</p>
            </div>
            <button className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 group-hover:bg-blue-500 transition-colors shadow-xs">
              <span>Choose Subject</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. CONTINUE YOUR PREPARATION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Continue Your Preparation</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Resume right where you left off</p>
          </div>
          <button 
            onClick={() => onSelectCategory('competitive')}
            className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className={`p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/70 shadow-xs'
        }`}>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-7 h-7" />
            </div>
            <div className="space-y-2 flex-1 sm:flex-initial">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {resumeTest.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {resumeTest.subCategory || 'General'} • {resumeTest.totalQuestions} Questions
              </p>
              <div className="flex items-center gap-3">
                <div className="w-36 sm:w-48 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full w-[60%]"></div>
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">60% Completed</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectTest(resumeTest)}
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer text-center active:scale-95"
          >
            Resume Test
          </button>
        </div>
      </div>

      {/* 6. AI FEATURES STRIP (4 CARDS) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">AI Features</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Supercharge your score with intelligent exam tools</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Arohi AI Analysis */}
          <div 
            onClick={onOpenAiAnalysis}
            className={`p-5 rounded-2xl border space-y-3 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/70 hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl shadow-xs">
              🤖
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Arohi AI Analysis</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1">Get smart insights & personalized feedback</p>
            </div>
          </div>

          {/* Smart Recommendations */}
          <div 
            onClick={onOpenStudyPlan}
            className={`p-5 rounded-2xl border space-y-3 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500' : 'bg-white border-slate-200/70 hover:border-amber-300 hover:shadow-md'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl shadow-xs">
              🎯
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Smart Recommendations</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1">Focus on weak topics with AI guidance</p>
            </div>
          </div>

          {/* Performance Tracking */}
          <div 
            onClick={onOpenAiAnalysis}
            className={`p-5 rounded-2xl border space-y-3 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500' : 'bg-white border-slate-200/70 hover:border-emerald-300 hover:shadow-md'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl shadow-xs">
              📈
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Performance Tracking</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1">Track your progress with detailed reports</p>
            </div>
          </div>

          {/* PDF Solutions */}
          <div 
            onClick={onOpenAiMentor}
            className={`p-5 rounded-2xl border space-y-3 cursor-pointer transition-all hover:scale-[1.02] shadow-xs active:scale-[0.98] ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-200/70 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl shadow-xs">
              📑
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">PDF Solutions</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1">Get detailed solutions for all tests</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
