import React, { useState } from 'react';
import { 
  Trophy, CheckCircle2, XCircle, AlertCircle, Clock, Award, 
  Sparkles, ArrowLeft, RefreshCw, BarChart2, Share2, Download,
  Check, ChevronDown, ChevronUp, BookOpen, Layers, ShieldCheck
} from 'lucide-react';
import { TestResultReport } from '../../types/examTypes';

interface ExamResultViewProps {
  report: TestResultReport;
  isDarkMode?: boolean;
  onOpenAiAnalysis: () => void;
  onOpenLeaderboard: () => void;
  onRetakeTest: () => void;
  onBackToCatalog: () => void;
}

export default function ExamResultView({
  report,
  isDarkMode = true,
  onOpenAiAnalysis,
  onOpenLeaderboard,
  onRetakeTest,
  onBackToCatalog
}: ExamResultViewProps) {
  const [questionFilter, setQuestionFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const filteredQuestions = report.detailedQuestions.filter((q) => {
    if (questionFilter === 'correct') return q.isCorrect;
    if (questionFilter === 'incorrect') return q.userResponse && !q.isCorrect;
    if (questionFilter === 'unattempted') return !q.userResponse;
    return true;
  });

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="relative space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto pb-12">
      {/* Official Arohi Exams Anti-Counterfeit Background Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex flex-wrap items-center justify-around opacity-[0.03] select-none text-slate-100 rotate-[-25deg] scale-125">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="text-4xl sm:text-5xl font-black uppercase tracking-[0.3em] m-12 whitespace-nowrap">
            AROHI EXAMS • OFFICIAL CBT MARKSHEET
          </div>
        ))}
      </div>

      {/* 1. TOP NAVIGATION HEADER */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBackToCatalog}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            isDarkMode 
              ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10' 
              : 'bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border-slate-300 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Mock Tests</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
            }`}
            title="Download / Print Official Watermarked Marksheet"
          >
            <Download className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Export Marksheet</span>
          </button>

          <button
            onClick={onRetakeTest}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10' 
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake (Shuffled)</span>
          </button>

          <button
            onClick={onOpenLeaderboard}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30' 
                : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300 font-black shadow-sm'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>AIR Leaderboard</span>
          </button>

          <button
            onClick={onOpenAiAnalysis}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-black uppercase tracking-wider shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>AI Diagnostic</span>
          </button>
        </div>
      </div>

      {/* 2. HERO SCORECARD BANNER */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#18113c] via-[#100b29] to-[#1e0e3d] border-purple-500/40 text-white dark-card' 
          : 'bg-white border-purple-200 text-slate-900 shadow-purple-50'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-5 ${
            isDarkMode ? 'border-purple-500/20' : 'border-slate-200'
          }`}>
            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 border ${
                isDarkMode 
                  ? 'bg-[#00e676]/10 text-[#00e676] border-[#00e676]/30' 
                  : 'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Examination Evaluated
              </span>
              <h1 className={`text-xl sm:text-2xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                {report.testTitle}
              </h1>
              <p className={`text-xs font-semibold mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Candidate: <strong className={isDarkMode ? 'text-purple-300' : 'text-purple-950 font-bold'}>{report.userName}</strong> ({report.userState}) • Submitted on {new Date(report.submittedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Cutoff Status Chip */}
            <div className={`px-4 py-2.5 rounded-2xl border text-center font-bold ${
              report.hasClearedCutoff
                ? isDarkMode ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : isDarkMode ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <span className="text-[10px] uppercase tracking-wider block font-black">Estimated Cutoff ({report.cutoffScore})</span>
              <span className="text-sm font-black flex items-center justify-center gap-1 mt-0.5">
                {report.hasClearedCutoff ? '🎉 Cutoff Cleared!' : '⚠️ Needs Improvement'}
              </span>
            </div>
          </div>

          {/* Core Metric Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Score */}
            <div className={`p-4 rounded-2xl text-center space-y-1 border ${
              isDarkMode 
                ? 'bg-[#120d2a] border-[#2d2163]' 
                : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <span className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Final Score</span>
              <div className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                {report.score.toFixed(1)} <span className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>/ {report.maxScore}</span>
              </div>
              <span className={`text-[10px] font-bold block ${isDarkMode ? 'text-purple-300' : 'text-purple-900'}`}>{report.percentage.toFixed(1)}% Marks</span>
            </div>

            {/* All India Rank */}
            <div className={`p-4 rounded-2xl text-center space-y-1 border ${
              isDarkMode 
                ? 'bg-[#120d2a] border-[#2d2163]' 
                : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <span className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>All India Rank</span>
              <div className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-purple-400' : 'text-purple-900'}`}>
                #{report.allIndiaRank}
              </div>
              <span className={`text-[10px] font-bold block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>of {report.totalParticipants.toLocaleString()} Aspirants</span>
            </div>

            {/* Percentile */}
            <div className={`p-4 rounded-2xl text-center space-y-1 border ${
              isDarkMode 
                ? 'bg-[#120d2a] border-[#2d2163]' 
                : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <span className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Percentile</span>
              <div className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>
                {report.percentile.toFixed(1)}%ile
              </div>
              <span className={`text-[10px] font-bold block ${isDarkMode ? 'text-emerald-300/80' : 'text-emerald-900'}`}>Top {Math.max(1, Math.round(100 - report.percentile))}% Pool</span>
            </div>

            {/* Accuracy */}
            <div className={`p-4 rounded-2xl text-center space-y-1 border ${
              isDarkMode 
                ? 'bg-[#120d2a] border-[#2d2163]' 
                : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <span className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Accuracy</span>
              <div className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>
                {report.accuracyPercentage.toFixed(1)}%
              </div>
              <span className={`text-[10px] font-bold block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{report.totalCorrect} of {report.totalAttempted} right</span>
            </div>

            {/* State Rank */}
            <div className={`p-4 rounded-2xl text-center space-y-1 border ${
              isDarkMode 
                ? 'bg-[#120d2a] border-[#2d2163]' 
                : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <span className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>State Rank</span>
              <div className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-rose-400' : 'text-rose-800'}`}>
                #{report.stateRank}
              </div>
              <span className={`text-[10px] font-bold block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{report.userState} State</span>
            </div>

            {/* Time Taken */}
            <div className={`p-4 rounded-2xl text-center space-y-1 border ${
              isDarkMode 
                ? 'bg-[#120d2a] border-[#2d2163]' 
                : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <span className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Time Taken</span>
              <div className={`text-xl sm:text-2xl font-black font-mono ${isDarkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                {formatSeconds(report.timeSpentSeconds)}
              </div>
              <span className={`text-[10px] font-bold block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Limit: {Math.round(report.totalDurationSeconds / 60)} min</span>
            </div>
          </div>

          {/* Positive vs Negative Marks Breakdown */}
          <div className={`flex flex-wrap items-center justify-between gap-3 border p-3.5 rounded-2xl text-xs ${
            isDarkMode 
              ? 'bg-[#0d0920] border-[#23184d]' 
              : 'bg-slate-100/80 border-slate-200'
          }`}>
            <div className="flex items-center gap-4">
              <span className={isDarkMode ? 'text-slate-400 font-bold' : 'text-slate-700 font-bold'}>Marking Breakdown:</span>
              <span className={isDarkMode ? 'text-emerald-400 font-black' : 'text-emerald-800 font-black'}>+{report.positiveMarksTotal.toFixed(1)} Earned</span>
              <span className={isDarkMode ? 'text-rose-400 font-black' : 'text-rose-800 font-black'}>-{report.negativeMarksDeducted.toFixed(1)} Lost to Penalties</span>
            </div>
            <div className={`flex items-center gap-3 text-[11px] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <span className={`flex items-center gap-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}><CheckCircle2 className="w-3.5 h-3.5" /> {report.totalCorrect} Correct</span>
              <span className={`flex items-center gap-1 ${isDarkMode ? 'text-rose-400' : 'text-rose-800'}`}><XCircle className="w-3.5 h-3.5" /> {report.totalIncorrect} Incorrect</span>
              <span className={`flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}><AlertCircle className="w-3.5 h-3.5" /> {report.totalUnattempted} Skipped</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTIONAL PERFORMANCE BREAKDOWN */}
      <div className="space-y-4">
        <h3 className={`text-lg font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
          <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span>Section-wise Performance Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.sectionResults.map((sec, sIdx) => (
            <div
              key={`${sec.sectionId}-${sIdx}`}
              className={`p-5 rounded-2xl border ${
                isDarkMode ? 'bg-[#120d2a] border-[#291e56]' : 'bg-white border-slate-200 shadow-sm'
              } space-y-4`}
            >
              <div className={`flex items-start justify-between gap-2 border-b pb-3 ${
                isDarkMode ? 'border-purple-500/15' : 'border-slate-200'
              }`}>
                <div>
                  <h4 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{sec.sectionName}</h4>
                  <p className={`text-[11px] font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {sec.totalQuestions} Questions • Max Score: {sec.maxScore}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-base font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>{sec.score.toFixed(1)}</span>
                  <span className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}> / {sec.maxScore}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className={`p-2 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-[#181138] border-purple-500/20' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Attempted</span>
                  <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{sec.attempted}</span>
                </div>
                <div className={`p-2 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                    : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>Correct</span>
                  <span className={`text-sm font-black ${isDarkMode ? 'text-emerald-400' : 'text-emerald-900'}`}>{sec.correct}</span>
                </div>
                <div className={`p-2 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-rose-500/10 border-rose-500/30' 
                    : 'bg-rose-50 border-rose-200'
                }`}>
                  <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-rose-300' : 'text-rose-800'}`}>Incorrect</span>
                  <span className={`text-sm font-black ${isDarkMode ? 'text-rose-400' : 'text-rose-900'}`}>{sec.incorrect}</span>
                </div>
                <div className={`p-2 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-cyan-500/10 border-cyan-500/30' 
                    : 'bg-cyan-50 border-cyan-200'
                }`}>
                  <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Accuracy</span>
                  <span className={`text-sm font-black ${isDarkMode ? 'text-cyan-400' : 'text-cyan-900'}`}>{sec.accuracy.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. DETAILED QUESTION-BY-QUESTION SOLUTIONS */}
      <div className="space-y-4">
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3 ${
          isDarkMode ? 'border-[#21184d]' : 'border-slate-200'
        }`}>
          <div>
            <h3 className={`text-lg font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Question Paper Solutions &amp; Step-by-Step Derivations</span>
            </h3>
            <p className={`text-xs font-semibold mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Review official answer keys, rationale, and your recorded choices.
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`flex items-center gap-1.5 p-1 rounded-xl border ${
            isDarkMode ? 'bg-[#120d2a] border-[#2d2163]' : 'bg-white border-slate-300 shadow-sm'
          }`}>
            <button
              onClick={() => setQuestionFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionFilter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              All ({report.detailedQuestions.length})
            </button>
            <button
              onClick={() => setQuestionFilter('correct')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionFilter === 'correct' 
                  ? 'bg-emerald-600 text-white' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Correct ({report.totalCorrect})
            </button>
            <button
              onClick={() => setQuestionFilter('incorrect')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionFilter === 'incorrect' 
                  ? 'bg-rose-600 text-white' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Incorrect ({report.totalIncorrect})
            </button>
            <button
              onClick={() => setQuestionFilter('unattempted')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionFilter === 'unattempted' 
                  ? 'bg-slate-700 text-white' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Skipped ({report.totalUnattempted})
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isExpanded = expandedQuestionId === q.id || filteredQuestions.length <= 5;
            const isCorrect = q.isCorrect;
            const isAttempted = !!q.userResponse;

            return (
              <div
                key={`${q.id}-${idx}`}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isDarkMode ? 'bg-[#120d2a] border-[#291e56]' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {/* Collapsible Header */}
                <div
                  onClick={() => setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)}
                  className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                      isCorrect 
                        ? isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                        : isAttempted 
                        ? isDarkMode ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-rose-100 text-rose-950 border border-rose-300'
                        : isDarkMode ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}>
                      Q{q.questionNumber || (idx + 1)}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                          isDarkMode 
                            ? 'text-purple-400 bg-purple-900/30 border-purple-500/30' 
                            : 'text-purple-950 bg-purple-100 border-purple-300'
                        }`}>
                          {q.subject}
                        </span>
                        <span className={`text-[10px] font-semibold truncate max-w-xs ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {q.topic}
                        </span>
                      </div>
                      <p className={`text-xs font-bold line-clamp-1 mt-1 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                        {q.text}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                      isCorrect
                        ? isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : isAttempted
                        ? isDarkMode ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-rose-100 text-rose-900 border border-rose-300'
                        : isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isCorrect ? '+Earned' : isAttempted ? '-Penalty' : 'Skipped'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`p-5 border-t space-y-4 ${
                    isDarkMode ? 'border-[#23184d] bg-[#0d0920]' : 'border-slate-200 bg-slate-50'
                  }`}>
                    {/* Full Question Text */}
                    <div className={`text-sm font-semibold leading-relaxed ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-950'
                    }`}>
                      {q.text}
                    </div>

                    {/* Options List with Color Coding */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = q.userResponse === opt.id;
                        const isRightAnswer = q.correctAnswer === opt.id;

                        let optClasses = isDarkMode 
                          ? 'bg-[#150f33] border-[#291e56] text-slate-300' 
                          : 'bg-white border-slate-200 text-slate-800';

                        if (isRightAnswer) {
                          optClasses = isDarkMode 
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 font-bold'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500 font-bold';
                        } else if (isChosen && !isRightAnswer) {
                          optClasses = isDarkMode 
                            ? 'bg-rose-500/15 border-rose-500 text-rose-200 ring-1 ring-rose-500 font-bold'
                            : 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500 font-bold';
                        }

                        return (
                          <div
                            key={`${opt.id}-${oIdx}`}
                            className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${optClasses}`}
                          >
                            <span className="font-black shrink-0">({opt.id})</span>
                            <span className="flex-1">{opt.text}</span>
                            {isRightAnswer && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                            {isChosen && !isRightAnswer && <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Rationale & Explanation Box */}
                    <div className={`p-4 rounded-xl space-y-2 border ${
                      isDarkMode 
                        ? 'bg-[#18113c] border-purple-500/30' 
                        : 'bg-white border-purple-200 shadow-sm'
                    }`}>
                      <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${
                        isDarkMode ? 'text-purple-300' : 'text-purple-950'
                      }`}>
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Official Solution &amp; Conceptual Rationale</span>
                      </div>
                      <p className={`text-xs leading-relaxed ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-800 font-medium'
                      }`}>
                        {q.explanation}
                      </p>
                      {q.referenceNotes && (
                        <p className={`text-[10px] font-mono pt-1 ${
                          isDarkMode ? 'text-purple-300/80' : 'text-purple-900 font-semibold'
                        }`}>
                          📖 Reference: {q.referenceNotes}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
