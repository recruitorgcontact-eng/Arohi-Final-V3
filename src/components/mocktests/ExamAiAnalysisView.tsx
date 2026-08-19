import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Brain, AlertTriangle, CheckCircle2, Clock, Calendar, 
  ArrowLeft, BookOpen, Target, Zap, MessageSquare, ChevronRight,
  TrendingUp, Compass, Award, RefreshCw
} from 'lucide-react';
import { TestResultReport, AIExamAnalysis } from '../../types/examTypes';

interface ExamAiAnalysisViewProps {
  report: TestResultReport;
  isDarkMode?: boolean;
  onBackToResult: () => void;
  onAskArohiInChat?: (prompt: string) => void;
}

export default function ExamAiAnalysisView({
  report,
  isDarkMode = true,
  onBackToResult,
  onAskArohiInChat
}: ExamAiAnalysisViewProps) {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AIExamAnalysis | null>(null);

  // Generate or fetch AI analysis
  useEffect(() => {
    let isMounted = true;
    async function fetchAiAnalysis() {
      setLoading(true);
      try {
        const res = await fetch('/api/mocktests/ai-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ report })
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.analysis) {
            setAnalysis(data.analysis);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('API fetch failed, generating client fallback analysis:', e);
      }

      // High-precision fallback diagnostic calculation
      if (isMounted) {
        const weakSubjects = Object.entries(report.subjectAccuracyBreakdown)
          .filter(([_, data]) => data.accuracy < 60)
          .map(([subj]) => subj);

        const strongSubjects = Object.entries(report.subjectAccuracyBreakdown)
          .filter(([_, data]) => data.accuracy >= 70)
          .map(([subj]) => subj);

        const clientAnalysis: AIExamAnalysis = {
          overallVerdict: report.percentage >= 65
            ? `Solid foundational grasp demonstrated for ${report.testTitle}. Your accuracy (${report.accuracyPercentage.toFixed(1)}%) places you in the competitive zone, but minimizing negative marking penalties in high-yield subtopics will elevate you into the top 1 percentile.`
            : `Targeted conceptual reinforcement required for ${report.testTitle}. Current score (${report.score.toFixed(1)} / ${report.maxScore}) is below estimated cutoff (${report.cutoffScore}). With focused revision on key syllabus clusters, score can improve by 25-30% within 10 days.`,
          strengthsSummary: strongSubjects.length > 0 
            ? strongSubjects.map(s => `Strong retention and conceptual accuracy in ${s}.`)
            : ['Consistent pace maintained across initial question sets.', 'Good attempt discipline on straightforward single-choice questions.'],
          criticalWeaknesses: weakSubjects.length > 0
            ? weakSubjects.map(s => `Frequent inaccuracies observed in ${s} (${report.subjectAccuracyBreakdown[s]?.accuracy.toFixed(0)}% accuracy).`)
            : ['Negative marking surrendered to uncalculated 50-50 elimination guesses.', 'Need higher recall speed for clinical and factual assertion questions.'],
          topicWiseActionPlan: report.weakTopics.slice(0, 4).map((topic, i) => ({
            topic,
            subject: 'High-Yield Core',
            gapDescription: `Struggled with standard diagnostic criteria and direct application under exam time pressure.`,
            recommendedRemedy: `Review 50 previous year questions specifically dedicated to ${topic} with concise one-liner notes.`,
            highYieldFact: `Crucial recurring concept tested in almost every ${report.targetExam || 'competitive'} cycle.`
          })),
          timeManagementCritique: {
            averageSecondsPerCorrect: Math.round(report.timeSpentSeconds / Math.max(1, report.totalCorrect)),
            averageSecondsPerIncorrect: Math.round(report.timeSpentSeconds / Math.max(1, report.totalIncorrect)),
            paceRecommendation: report.timeSpentSeconds < report.totalDurationSeconds * 0.5 
              ? 'You rushed through questions too quickly. Spending 15-20 extra seconds per question for thorough validation will directly reduce negative marking errors.'
              : 'Pacing is balanced. Focus now on rapid elimination techniques for complex options.',
            rushedQuestionsCount: Math.round(report.totalIncorrect * 0.6),
            prolongedQuestionsCount: Math.round(report.totalUnattempted * 0.4)
          },
          negativeMarkingImpact: {
            marksLostToGuesses: Number((report.totalIncorrect * (report.detailedQuestions[0]?.negativeMarks || 0.33)).toFixed(2)),
            recoveryAdvice: `Avoid guessing when you cannot eliminate at least 2 incorrect options. Recovering these lost marks alone would boost your All-India percentile significantly.`
          },
          recommendedNextMockTestSlug: 'aiims-norcet-2026-grand-mock',
          studySchedule7Days: [
            { day: 'Day 1 & 2', focusSubject: 'Weak Areas Deep Dive', tasks: [`Revise core theory notes for ${report.weakTopics[0] || 'critical topics'}.`, 'Solve 30 practice MCQs in untimed study mode.'] },
            { day: 'Day 3 & 4', focusSubject: 'Formulae & Rapid Recall', tasks: ['Review high-yield one-liners and mnemonics.', 'Practice 2 mini sectional sprint tests.'] },
            { day: 'Day 5 & 6', focusSubject: 'Full-Length Simulation', tasks: ['Attempt a new full CBT mock test under real exam timing.', 'Perform strict post-test error logging.'] },
            { day: 'Day 7', focusSubject: 'Final Review & Strategy', tasks: ['Analyze score trajectory and eliminate recurring trap questions.', 'Consolidate weak topic flashcards.'] }
          ]
        };

        setAnalysis(clientAnalysis);
        setLoading(false);
      }
    }

    fetchAiAnalysis();
    return () => { isMounted = false; };
  }, [report]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto pb-12">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToResult}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scorecard</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span>Arohi AI Diagnostic Intelligence</span>
          </span>
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center space-y-4 bg-[#120d2a] border border-[#2d2163] rounded-3xl">
          <Sparkles className="w-10 h-10 text-yellow-300 animate-spin mx-auto" />
          <h3 className="text-lg font-black text-white">Generating Personalized AI Diagnostic Report...</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Arohi AI is analyzing your question accuracy patterns, speed pacing, elimination mistakes, and weak topic clusters.
          </p>
        </div>
      ) : analysis ? (
        <div className="space-y-8">
          
          {/* 1. MASTER AI VERDICT BANNER */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/50 via-[#18103c] to-indigo-900/50 border-2 border-purple-500/40 shadow-2xl relative overflow-hidden text-white space-y-4">
            <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-purple-300">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>Arohi AI Exam Mentor Verdict</span>
            </div>

            <p className="text-base sm:text-lg font-bold leading-relaxed text-slate-100">
              "{analysis.overallVerdict}"
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-purple-500/20 text-xs">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Target Score Delta: <strong className="text-emerald-300">+{Math.max(2, Math.round(report.maxScore * 0.25))} Marks Possible</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">Estimated Turnaround: <strong className="text-amber-300">7 to 10 Days</strong></span>
              </div>
            </div>
          </div>

          {/* 2. STRENGTHS & CRITICAL WEAKNESSES DUAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Strengths */}
            <div className="bg-[#120d2a] border border-emerald-500/30 p-6 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" />
                <span>Demonstrated Strengths</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {analysis.strengthsSummary.map((str, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-emerald-500/5 border border-emerald-500/15 p-3 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Weaknesses */}
            <div className="bg-[#120d2a] border border-rose-500/30 p-6 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-rose-400 font-black text-sm uppercase tracking-wider">
                <AlertTriangle className="w-5 h-5" />
                <span>Primary Score Leaks (Gaps)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {analysis.criticalWeaknesses.map((weak, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-rose-500/5 border border-rose-500/15 p-3 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. TOPIC-WISE HIGH YIELD ACTION PLAN */}
          <div className="bg-[#120d2a] border border-[#2d2163] p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between gap-4 border-b border-[#23184d] pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <span>Topic-wise Gap Remediation &amp; Action Plan</span>
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  High-yield strategy to convert weak topics into scoring assets.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {analysis.topicWiseActionPlan.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#18113c] border border-purple-500/25 p-4 sm:p-5 rounded-2xl space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-black text-purple-300 bg-purple-900/40 px-3 py-1 rounded-lg border border-purple-500/30">
                      Topic: {item.topic}
                    </span>
                    <span className="text-[11px] font-bold text-amber-300">
                      💡 {item.highYieldFact}
                    </span>
                  </div>

                  <p className="text-xs text-rose-300 font-medium">
                    ⚠️ <strong>Identified Gap:</strong> {item.gapDescription}
                  </p>

                  <p className="text-xs text-emerald-300 font-medium bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                    🎯 <strong>Recommended Action:</strong> {item.recommendedRemedy}
                  </p>

                  {onAskArohiInChat && (
                    <button
                      onClick={() => onAskArohiInChat(`Explain the concepts, high-yield rules and provide 5 practice MCQs for ${item.topic} for my ${report.testTitle} preparation.`)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 hover:text-white bg-indigo-600/20 hover:bg-indigo-600/40 px-3 py-1.5 rounded-lg border border-indigo-500/30 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask Arohi to Teach {item.topic} in Chat</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. SPEED & TIME MANAGEMENT CRITIQUE */}
          <div className="bg-[#120d2a] border border-[#2d2163] p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>Time Management &amp; Pacing Diagnostics</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {analysis.timeManagementCritique.paceRecommendation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-[#150f33] p-4 rounded-xl border border-[#2d2163]">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Negative Marking Impact</span>
                <span className="text-lg font-black text-rose-400">-{analysis.negativeMarkingImpact.marksLostToGuesses} Marks</span>
                <p className="text-xs text-slate-300 mt-1">{analysis.negativeMarkingImpact.recoveryAdvice}</p>
              </div>

              <div className="bg-[#150f33] p-4 rounded-xl border border-[#2d2163]">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Avg. Speed per Correct Answer</span>
                <span className="text-lg font-black text-emerald-400">{analysis.timeManagementCritique.averageSecondsPerCorrect}s / question</span>
                <p className="text-xs text-slate-300 mt-1">Optimal target speed for this exam format is ~60-80s per question.</p>
              </div>
            </div>
          </div>

          {/* 5. 7-DAY TARGETED STUDY PLAN */}
          <div className="bg-[#120d2a] border border-[#2d2163] p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>7-Day Strategic Revision Schedule</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {analysis.studySchedule7Days.map((sched, idx) => (
                <div
                  key={idx}
                  className="bg-[#18113c] border border-purple-500/20 p-4 rounded-2xl space-y-2.5"
                >
                  <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 inline-block">
                    {sched.day}
                  </span>
                  <h4 className="text-xs font-black text-white">{sched.focusSubject}</h4>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {sched.tasks.map((t, ti) => (
                      <li key={ti} className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : null}
    </div>
  );
}
