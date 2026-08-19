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
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto pb-12">
      {/* 1. TOP NAVIGATION HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Mock Tests</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetakeTest}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Test</span>
          </button>

          <button
            onClick={onOpenLeaderboard}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>All India Leaderboard</span>
          </button>

          <button
            onClick={onOpenAiAnalysis}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-black uppercase tracking-wider shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>AI Diagnostic &amp; Weakness Report</span>
          </button>
        </div>
      </div>

      {/* 2. HERO SCORECARD BANNER */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#18113c] via-[#100b29] to-[#1e0e3d] border-purple-500/40 text-white' 
          : 'bg-white border-purple-200 text-slate-900'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Examination Evaluated
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                {report.testTitle}
              </h1>
              <p className="text-xs text-slate-300 font-semibold mt-1">
                Candidate: <strong className="text-purple-300">{report.userName}</strong> ({report.userState}) • Submitted on {new Date(report.submittedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Cutoff Status Chip */}
            <div className={`px-4 py-2.5 rounded-2xl border text-center font-bold ${
              report.hasClearedCutoff
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
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
            <div className="bg-[#120d2a] border border-[#2d2163] p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Final Score</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                {report.score.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ {report.maxScore}</span>
              </div>
              <span className="text-[10px] text-purple-300 font-bold block">{report.percentage.toFixed(1)}% Marks</span>
            </div>

            {/* All India Rank */}
            <div className="bg-[#120d2a] border border-[#2d2163] p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">All India Rank</span>
              <div className="text-2xl sm:text-3xl font-black text-purple-400">
                #{report.allIndiaRank}
              </div>
              <span className="text-[10px] text-slate-400 font-bold block">of {report.totalParticipants.toLocaleString()} Aspirants</span>
            </div>

            {/* Percentile */}
            <div className="bg-[#120d2a] border border-[#2d2163] p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Percentile</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                {report.percentile.toFixed(1)}%ile
              </div>
              <span className="text-[10px] text-emerald-300/80 font-bold block">Top {Math.max(1, Math.round(100 - report.percentile))}% Pool</span>
            </div>

            {/* Accuracy */}
            <div className="bg-[#120d2a] border border-[#2d2163] p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Accuracy</span>
              <div className="text-2xl sm:text-3xl font-black text-cyan-300">
                {report.accuracyPercentage.toFixed(1)}%
              </div>
              <span className="text-[10px] text-slate-400 font-bold block">{report.totalCorrect} of {report.totalAttempted} right</span>
            </div>

            {/* State Rank */}
            <div className="bg-[#120d2a] border border-[#2d2163] p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">State Rank</span>
              <div className="text-2xl sm:text-3xl font-black text-rose-400">
                #{report.stateRank}
              </div>
              <span className="text-[10px] text-slate-400 font-bold block">{report.userState} State</span>
            </div>

            {/* Time Taken */}
            <div className="bg-[#120d2a] border border-[#2d2163] p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Time Taken</span>
              <div className="text-xl sm:text-2xl font-black text-indigo-300 font-mono">
                {formatSeconds(report.timeSpentSeconds)}
              </div>
              <span className="text-[10px] text-slate-400 font-bold block">Limit: {Math.round(report.totalDurationSeconds / 60)} min</span>
            </div>
          </div>

          {/* Positive vs Negative Marks Breakdown */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0920] border border-[#23184d] p-3.5 rounded-2xl text-xs">
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-bold">Marking Breakdown:</span>
              <span className="text-emerald-400 font-black">+{report.positiveMarksTotal.toFixed(1)} Earned</span>
              <span className="text-rose-400 font-black">-{report.negativeMarksDeducted.toFixed(1)} Lost to Penalties</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> {report.totalCorrect} Correct</span>
              <span className="flex items-center gap-1 text-rose-400"><XCircle className="w-3.5 h-3.5" /> {report.totalIncorrect} Incorrect</span>
              <span className="flex items-center gap-1 text-slate-400"><AlertCircle className="w-3.5 h-3.5" /> {report.totalUnattempted} Skipped</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTIONAL PERFORMANCE BREAKDOWN */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          <span>Section-wise Performance Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.sectionResults.map((sec) => (
            <div
              key={sec.sectionId}
              className={`p-5 rounded-2xl border ${
                isDarkMode ? 'bg-[#120d2a] border-[#291e56]' : 'bg-white border-slate-200'
              } space-y-4`}
            >
              <div className="flex items-start justify-between gap-2 border-b border-purple-500/15 pb-3">
                <div>
                  <h4 className="text-sm font-black text-white">{sec.sectionName}</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {sec.totalQuestions} Questions • Max Score: {sec.maxScore}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-amber-300">{sec.score.toFixed(1)}</span>
                  <span className="text-xs text-slate-400 font-normal"> / {sec.maxScore}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-[#181138] p-2 rounded-xl border border-purple-500/20">
                  <span className="text-[10px] text-slate-400 block font-bold">Attempted</span>
                  <span className="text-sm font-black text-white">{sec.attempted}</span>
                </div>
                <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-300 block font-bold">Correct</span>
                  <span className="text-sm font-black text-emerald-400">{sec.correct}</span>
                </div>
                <div className="bg-rose-500/10 p-2 rounded-xl border border-rose-500/30">
                  <span className="text-[10px] text-rose-300 block font-bold">Incorrect</span>
                  <span className="text-sm font-black text-rose-400">{sec.incorrect}</span>
                </div>
                <div className="bg-cyan-500/10 p-2 rounded-xl border border-cyan-500/30">
                  <span className="text-[10px] text-cyan-300 block font-bold">Accuracy</span>
                  <span className="text-sm font-black text-cyan-400">{sec.accuracy.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. DETAILED QUESTION-BY-QUESTION SOLUTIONS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#21184d] pb-3">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Question Paper Solutions &amp; Step-by-Step Derivations</span>
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">
              Review official answer keys, rationale, and your recorded choices.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#120d2a] p-1 rounded-xl border border-[#2d2163]">
            <button
              onClick={() => setQuestionFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionFilter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({report.detailedQuestions.length})
            </button>
            <button
              onClick={() => setQuestionFilter('correct')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionFilter === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Correct ({report.totalCorrect})
            </button>
            <button
              onClick={() => setQuestionFilter('incorrect')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionFilter === 'incorrect' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Incorrect ({report.totalIncorrect})
            </button>
            <button
              onClick={() => setQuestionFilter('unattempted')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionFilter === 'unattempted' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
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
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  isDarkMode ? 'bg-[#120d2a] border-[#291e56]' : 'bg-white border-slate-200'
                } overflow-hidden`}
              >
                {/* Collapsible Header */}
                <div
                  onClick={() => setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)}
                  className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                      isCorrect 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : isAttempted 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      Q{q.questionNumber || (idx + 1)}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/30">
                          {q.subject}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold truncate max-w-xs">
                          {q.topic}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1 mt-1">
                        {q.text}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                      isCorrect
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isAttempted
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isCorrect ? '+Earned' : isAttempted ? '-Penalty' : 'Skipped'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-5 border-t border-[#23184d] space-y-4 bg-[#0d0920]">
                    {/* Full Question Text */}
                    <div className="text-sm font-semibold text-slate-100 leading-relaxed">
                      {q.text}
                    </div>

                    {/* Options List with Color Coding */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt) => {
                        const isChosen = q.userResponse === opt.id;
                        const isRightAnswer = q.correctAnswer === opt.id;

                        let optClasses = 'bg-[#150f33] border-[#291e56] text-slate-300';
                        if (isRightAnswer) {
                          optClasses = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 font-bold';
                        } else if (isChosen && !isRightAnswer) {
                          optClasses = 'bg-rose-500/15 border-rose-500 text-rose-200 ring-1 ring-rose-500 font-bold';
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${optClasses}`}
                          >
                            <span className="font-black shrink-0">({opt.id})</span>
                            <span className="flex-1">{opt.text}</span>
                            {isRightAnswer && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                            {isChosen && !isRightAnswer && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Rationale & Explanation Box */}
                    <div className="bg-[#18113c] border border-purple-500/30 p-4 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-purple-300 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span>Official Solution &amp; Conceptual Rationale</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {q.explanation}
                      </p>
                      {q.referenceNotes && (
                        <p className="text-[10px] text-purple-300/80 font-mono pt-1">
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
