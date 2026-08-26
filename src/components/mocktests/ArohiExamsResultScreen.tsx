import React, { useState } from 'react';
import { 
  Trophy, CheckCircle2, Download, Share2, ArrowLeft, RefreshCw,
  TrendingUp, Award, BarChart2, Check, AlertCircle, ChevronDown, ChevronUp,
  FileText, Sparkles, BookOpen, Clock, Target, ShieldCheck
} from 'lucide-react';
import { TestResultReport } from '../../types/examTypes';
import { useAuth } from '../../context/AuthContext';

interface ArohiExamsResultScreenProps {
  isDarkMode?: boolean;
  report?: TestResultReport | null;
  onOpenAiAnalysis: () => void;
  onRetakeTest: () => void;
  onBackToCatalog: () => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
}

export default function ArohiExamsResultScreen({
  isDarkMode = false,
  report,
  onOpenAiAnalysis,
  onRetakeTest,
  onBackToCatalog,
  onOpenChatWithPrompt
}: ArohiExamsResultScreenProps) {
  const { user, userData, userMemory } = useAuth();
  const rawDisplayName = 
    userData?.profile?.name || 
    userData?.displayName || 
    userMemory?.displayName || 
    user?.displayName || 
    (user?.email ? user.email.split('@')[0] : '');
  const candidateName = user ? (rawDisplayName?.trim() || 'User') : 'User';
  const candidateState = (userData?.profile?.location || (user as any)?.state) || 'Odisha';

  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'mistakes' | 'solutions'>('overview');
  const [expandedQId, setExpandedQId] = useState<string | null>(null);

  // Fallback realistic simulation if viewed directly from Results tab
  const activeReport = report || {
    id: 'report_sample',
    testId: 'jee_main_mock',
    testTitle: 'JEE Main Mock Test',
    mainCategory: 'National Entrance Exams',
    subCategory: 'Engineering',
    userName: candidateName,
    userState: candidateState,
    score: 182,
    maxScore: 300,
    percentage: 60.67,
    accuracyPercentage: 82.6,
    percentile: 94.7,
    allIndiaRank: 2453,
    totalParticipants: 125678,
    stateRank: 184,
    totalStateParticipants: 15000,
    timeSpentSeconds: 5040,
    totalDurationSeconds: 7200,
    totalQuestions: 45,
    totalAttempted: 30,
    totalCorrect: 21,
    totalIncorrect: 4,
    totalUnattempted: 15,
    totalMarkedForReview: 2,
    positiveMarksTotal: 186,
    negativeMarksDeducted: 4,
    cutoffScore: 160,
    hasClearedCutoff: true,
    submittedAt: new Date().toISOString(),
    sectionResults: [
      { sectionId: 'phy', sectionName: 'Physics', totalQuestions: 15, attempted: 12, correct: 10, incorrect: 2, unattempted: 3, score: 82, maxScore: 100, accuracy: 84, timeSpentSeconds: 1800 },
      { sectionId: 'chem', sectionName: 'Chemistry', totalQuestions: 15, attempted: 10, correct: 7, incorrect: 3, unattempted: 5, score: 58, maxScore: 100, accuracy: 72, timeSpentSeconds: 1500 },
      { sectionId: 'math', sectionName: 'Mathematics', totalQuestions: 15, attempted: 8, correct: 5, incorrect: 3, unattempted: 7, score: 42, maxScore: 100, accuracy: 60, timeSpentSeconds: 1740 }
    ],
    subjectAccuracyBreakdown: {},
    weakTopics: ['Electrostatics', 'Organic Chemistry'],
    strongTopics: ['Mechanics', 'Optics', 'Calculus'],
    detailedQuestions: []
  };

  return (
    <div className="space-y-7 max-w-4xl mx-auto pb-28 animate-in fade-in duration-300">
      
      {/* 1. TOP BAR WITH EXAM TITLE & ACTIONS */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exams</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs transition-all"
          >
            <Download className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">Download Marksheet</span>
            <span className="sm:hidden">Marksheet</span>
          </button>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: activeReport.testTitle, text: `I scored ${activeReport.score}/${activeReport.maxScore} (${activeReport.percentile} Percentile) on Arohi Exams!` });
              }
            }}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs transition-all"
            title="Share Result"
          >
            <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      </div>

      {/* 2. HERO TROPHY CARD */}
      <div className={`p-6 sm:p-7 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-r from-white via-purple-50/40 to-white border-slate-200/80'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400/20 text-amber-500 flex items-center justify-center text-4xl shrink-0 shadow-xs border border-amber-300/40">
            🏆
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
                ✓ Test Completed
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-xs font-bold">
                AIR #{activeReport.allIndiaRank.toLocaleString()}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {activeReport.testTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Candidate: <span className="font-bold text-slate-900 dark:text-white">{activeReport.userName}</span> • {activeReport.userState}
            </p>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2.5 w-full sm:w-auto shrink-0">
          <button
            onClick={onOpenAiAnalysis}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Arohi AI Analysis</span>
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            <span>Step Solutions</span>
          </button>
        </div>
      </div>

      {/* 3. 4-CARD PERFORMANCE METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Your Score */}
        <div className={`p-5 rounded-3xl border space-y-1.5 ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Your Score</div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
            {activeReport.score} <span className="text-base font-bold text-slate-400">/ {activeReport.maxScore}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold">
              {activeReport.percentage}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Cleared Cutoff</span>
          </div>
        </div>

        {/* Accuracy */}
        <div className={`p-5 rounded-3xl border space-y-1.5 ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Accuracy</span>
            <Target className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {activeReport.accuracyPercentage}%
          </div>
          <div className="flex items-center gap-2 text-xs font-bold pt-1">
            <span className="text-emerald-600 dark:text-emerald-400">✓ {activeReport.totalCorrect} Correct</span>
            <span className="text-rose-500">✗ {activeReport.totalIncorrect} Wrong</span>
          </div>
        </div>

        {/* Percentile */}
        <div className={`p-5 rounded-3xl border space-y-1.5 ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Percentile</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
            {activeReport.percentile}%ile
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-snug pt-1">
            Top {Math.max(1, parseFloat((100 - activeReport.percentile).toFixed(1)))}% in India
          </p>
        </div>

        {/* All India Rank */}
        <div className={`p-5 rounded-3xl border space-y-1.5 ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">AIR Rank</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">
            #{activeReport.allIndiaRank.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-snug pt-1">
            Out of {activeReport.totalParticipants.toLocaleString()} aspirants
          </p>
        </div>
      </div>

      {/* 4. SECTIONAL PERFORMANCE TABLE */}
      <div className={`p-5 sm:p-6 rounded-3xl border space-y-4 shadow-sm ${
        isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Sectional Breakdown</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Subject-wise marks and accuracy distribution</p>
          </div>
          <button 
            onClick={onOpenAiAnalysis}
            className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>AI Topic Analysis</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-5 text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="col-span-2">Section</div>
          <div>Score</div>
          <div>Accuracy</div>
          <div>Percentile</div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {/* Physics */}
          <div className="grid grid-cols-5 items-center text-xs sm:text-sm font-semibold">
            <div className="col-span-2 flex items-center gap-2.5">
              <span className="text-xl">⚛️</span>
              <span className="text-slate-900 dark:text-white font-bold">Physics</span>
            </div>
            <div>
              <span className="font-black text-emerald-600">82</span> <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="text-slate-700 dark:text-slate-300 font-bold">84%</div>
            <div className="font-black text-purple-600">96.3</div>
          </div>

          {/* Chemistry */}
          <div className="grid grid-cols-5 items-center text-xs sm:text-sm font-semibold">
            <div className="col-span-2 flex items-center gap-2.5">
              <span className="text-xl">🧪</span>
              <span className="text-slate-900 dark:text-white font-bold">Chemistry</span>
            </div>
            <div>
              <span className="font-black text-amber-600">58</span> <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="text-slate-700 dark:text-slate-300 font-bold">72%</div>
            <div className="font-black text-purple-600">88.2</div>
          </div>

          {/* Mathematics */}
          <div className="grid grid-cols-5 items-center text-xs sm:text-sm font-semibold">
            <div className="col-span-2 flex items-center gap-2.5">
              <span className="text-xl">📐</span>
              <span className="text-slate-900 dark:text-white font-bold">Mathematics</span>
            </div>
            <div>
              <span className="font-black text-rose-500">42</span> <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="text-slate-700 dark:text-slate-300 font-bold">60%</div>
            <div className="font-black text-purple-600">79.4</div>
          </div>

          {/* Overall */}
          <div className="grid grid-cols-5 items-center text-xs sm:text-sm font-black pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="col-span-2 flex items-center gap-2.5">
              <span className="text-xl">📊</span>
              <span className="text-slate-900 dark:text-white">Overall Total</span>
            </div>
            <div>
              <span className="font-black text-emerald-600">{activeReport.score}</span> <span className="text-xs text-slate-400">/ {activeReport.maxScore}</span>
            </div>
            <div className="text-slate-900 dark:text-white">{activeReport.accuracyPercentage}%</div>
            <div className="font-black text-purple-600">{activeReport.percentile}</div>
          </div>
        </div>
      </div>

      {/* 5. PERFORMANCE OVER TIME & TOP RANKERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Performance Over Time Card */}
        <div className={`p-5 sm:p-6 rounded-3xl border space-y-3.5 shadow-sm ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
        }`}>
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Performance Trajectory</h3>
          
          <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-[11px] font-bold text-purple-600">45%</span>
              <div className="w-full bg-purple-200 dark:bg-purple-950/50 rounded-t-xl h-16"></div>
              <span className="text-[10px] text-slate-500 font-medium">Apr 20</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-[11px] font-bold text-purple-600">52%</span>
              <div className="w-full bg-purple-300 dark:bg-purple-900/50 rounded-t-xl h-20"></div>
              <span className="text-[10px] text-slate-500 font-medium">Apr 27</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-[11px] font-bold text-purple-600">61%</span>
              <div className="w-full bg-purple-400 dark:bg-purple-800/50 rounded-t-xl h-24"></div>
              <span className="text-[10px] text-slate-500 font-medium">May 04</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-[11px] font-bold text-purple-600">55%</span>
              <div className="w-full bg-purple-300 dark:bg-purple-900/50 rounded-t-xl h-21"></div>
              <span className="text-[10px] text-slate-500 font-medium">May 11</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-[11px] font-black text-emerald-600">60.7%</span>
              <div className="w-full bg-purple-600 rounded-t-xl h-28 shadow-sm"></div>
              <span className="text-[10px] font-black text-purple-600">Today</span>
            </div>
          </div>
        </div>

        {/* Top Rankers Leaderboard Card */}
        <div className={`p-5 sm:p-6 rounded-3xl border space-y-3.5 shadow-sm ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">Top Rankers Hall of Fame</h3>
            <span className="text-xs text-purple-600 font-bold">AIR Benchmark</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🥇</span>
                <span className="font-bold text-slate-900 dark:text-white">Rohan Verma (Delhi)</span>
              </div>
              <div className="font-black text-slate-900 dark:text-white">295 <span className="text-xs text-slate-400">/ 300</span></div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🥈</span>
                <span className="font-bold text-slate-900 dark:text-white">Ananya Sharma (Jaipur)</span>
              </div>
              <div className="font-black text-slate-900 dark:text-white">287 <span className="text-xs text-slate-400">/ 300</span></div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🥉</span>
                <span className="font-bold text-slate-900 dark:text-white">Karthik Reddy (Hyderabad)</span>
              </div>
              <div className="font-black text-slate-900 dark:text-white">276 <span className="text-xs text-slate-400">/ 300</span></div>
            </div>

            {/* You */}
            <div className="flex items-center justify-between text-xs sm:text-sm p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2.5">
                <span className="font-black text-purple-600 px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/50">#2453</span>
                <span className="font-black text-purple-950 dark:text-purple-200">{activeReport.userName} (You)</span>
              </div>
              <div className="font-black text-purple-600">{activeReport.score} <span className="text-xs text-purple-400">/ {activeReport.maxScore}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM FOUR TAB SWITCHER */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          ⏱️ Overview
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'analysis'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          📋 Question Analysis
        </button>
        <button
          onClick={() => setActiveTab('mistakes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'mistakes'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          ✓ Mistake Review
        </button>
        <button
          onClick={() => setActiveTab('solutions')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'solutions'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          📑 Solutions
        </button>
      </div>

      {/* 7. GREAT EFFORT MOTIVATION BANNER */}
      <div className={`p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
        isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center text-3xl shrink-0">
            ⭐
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              Great Effort! You are improving consistently.
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Analyze your mistakes and focus on weak topics with Arohi AI Mentor to reach 240+ marks.
            </p>
          </div>
        </div>

        <button
          onClick={onRetakeTest}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer text-center active:scale-95 shrink-0"
        >
          Practice Again
        </button>
      </div>

    </div>
  );
}
