import React from 'react';
import { 
  Sparkles, CheckCircle2, AlertCircle, ArrowLeft, Target, 
  TrendingUp, Award, BookOpen, Clock, Zap, ArrowRight, BrainCircuit
} from 'lucide-react';
import { TestResultReport } from '../../types/examTypes';

interface ArohiAiAnalysisScreenProps {
  isDarkMode?: boolean;
  report?: TestResultReport | null;
  onBackToResult: () => void;
  onAskArohiInChat?: (prompt: string) => void;
  onOpenStudyPlan?: () => void;
}

export default function ArohiAiAnalysisScreen({
  isDarkMode = false,
  report,
  onBackToResult,
  onAskArohiInChat,
  onOpenStudyPlan
}: ArohiAiAnalysisScreenProps) {
  return (
    <div className="space-y-7 max-w-4xl mx-auto pb-28 animate-in fade-in duration-300">
      
      {/* 1. TOP BAR */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToResult}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Result</span>
        </button>

        <button
          onClick={() => {
            if (onAskArohiInChat) {
              onAskArohiInChat("Arohi, give me a personalized study roadmap to boost my Physics Electrostatics score from 42% to 90%.");
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold cursor-pointer active:scale-95 shadow-sm transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Ask Arohi AI</span>
        </button>
      </div>

      {/* 2. HERO AROHI AI ANALYSIS HEADER */}
      <div className={`p-6 sm:p-7 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-r from-purple-50/80 via-white to-purple-50/40 border-purple-100'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-xs font-black uppercase tracking-wider">
              ✨ AI Diagnostic Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            Arohi AI Deep Performance Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
            Personalized cognitive breakdown, topic accuracy mapping, and automated score-enhancement plan.
          </p>
        </div>

        {/* 3D Arohi Mentor Visual */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-purple-400 bg-purple-100 flex items-center justify-center shrink-0 shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
            alt="Arohi Character"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 3. TEST SUMMARY BANNER */}
      <div className={`p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
        isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center text-2xl font-bold shrink-0">
            📋
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              {report?.testTitle || 'JEE Main Full Mock Test'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              PCM Pattern • 45 Questions Analyzed • High Precision Report
            </p>
          </div>
        </div>

        <button
          onClick={onBackToResult}
          className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <span>View Marksheet</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4. 4 QUICK METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className={`p-5 rounded-3xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Score</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{report?.score || 182} <span className="text-xs font-bold text-slate-400">/ 300</span></div>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">Good</span>
        </div>

        <div className={`p-5 rounded-3xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Accuracy</div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600">{report?.accuracyPercentage || 82.6}%</div>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 text-xs font-bold">High Precision</span>
        </div>

        <div className={`p-5 rounded-3xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Percentile</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-600">{report?.percentile || 94.7}%ile</div>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 text-xs font-bold">Top 5%</span>
        </div>

        <div className={`p-5 rounded-3xl border space-y-1.5 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">All India Rank</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">#{(report?.allIndiaRank || 2453).toLocaleString()}</div>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-bold">Competitive</span>
        </div>
      </div>

      {/* 5. YOUR STRENGTHS & AREAS TO IMPROVE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Your Strengths */}
        <div className={`p-5 sm:p-6 rounded-3xl border space-y-4 shadow-sm ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
        }`}>
          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Core Strengths</span>
            <span>💪</span>
          </h3>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Mechanics & Kinematics Mastery</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Scored 86% with lightning 48s average solving time.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">High Problem Solving Accuracy</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Maintained 85%+ accuracy without blind guesswork.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Effective Pacing & Time Management</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Saved 36 minutes for thorough revision.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Areas to Improve */}
        <div className={`p-5 sm:p-6 rounded-3xl border space-y-4 shadow-sm ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
        }`}>
          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Target Growth Areas</span>
            <span>🎯</span>
          </h3>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Electrostatics & Field Calculations</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Score: 42% (Need formula revision & PYQs).</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Organic Chemistry Mechanisms</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Score: 38% (Focus on named reactions & reagents).</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Numericals Speed & Shortcuts</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Time per numerical is 30% higher than AIR top 100.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. PERFORMANCE RADAR & TOPIC PROGRESS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Radar Spider Simulation */}
        <div className={`p-5 sm:p-6 rounded-3xl border space-y-3.5 shadow-sm ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
        }`}>
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Cognitive Benchmark Radar</h3>

          <div className="h-48 relative flex items-center justify-center">
            {/* SVG Spider Chart */}
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {/* Background Concentric Polygons */}
              <polygon points="100,20 180,75 150,165 50,165 20,75" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <polygon points="100,45 155,85 135,145 65,145 45,85" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <polygon points="100,70 130,95 120,125 80,125 70,95" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              
              {/* Top 10% Students (Dashed Blue) */}
              <polygon points="100,25 170,80 145,155 55,155 30,80" fill="rgba(59, 130, 246, 0.08)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* You (Purple) */}
              <polygon points="100,35 150,90 120,140 70,135 40,85" fill="rgba(147, 51, 234, 0.25)" stroke="#9333ea" strokeWidth="2.5" />
              
              {/* Labels */}
              <text x="100" y="14" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="bold">Physics</text>
              <text x="185" y="78" textAnchor="start" fontSize="9" fill="#64748b" fontWeight="bold">Chemistry</text>
              <text x="145" y="182" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="bold">Maths</text>
              <text x="55" y="182" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="bold">Accuracy</text>
              <text x="12" y="78" textAnchor="end" fontSize="9" fill="#64748b" fontWeight="bold">Speed</text>
            </svg>
          </div>

          <div className="flex items-center justify-center gap-5 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-1.5 bg-purple-600 rounded-full"></span>
              <span className="text-slate-800 dark:text-slate-200">You (Candidate)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-1.5 border-b-2 border-dashed border-blue-500"></span>
              <span className="text-slate-500">Top 10% Toppers</span>
            </div>
          </div>
        </div>

        {/* Topic-Wise Performance */}
        <div className={`p-5 sm:p-6 rounded-3xl border space-y-4 shadow-sm ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">Topic-Wise Accuracy Mapping</h3>
            <span className="text-xs text-purple-600 font-bold">5 Topics Tracked</span>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5">
                <span className="text-slate-800 dark:text-slate-200">Mechanics</span>
                <span className="font-black text-emerald-600">86%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[86%]"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5">
                <span className="text-slate-800 dark:text-slate-200">Optics</span>
                <span className="font-black text-emerald-600">78%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[78%]"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5">
                <span className="text-slate-800 dark:text-slate-200">Current Electricity</span>
                <span className="font-black text-amber-500">62%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[62%]"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5">
                <span className="text-slate-800 dark:text-slate-200">Electrostatics</span>
                <span className="font-black text-rose-500">42%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-[42%]"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5">
                <span className="text-slate-800 dark:text-slate-200">Organic Chemistry</span>
                <span className="font-black text-rose-500">38%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-[38%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. AROHI AI INSIGHTS CARD */}
      <div className={`p-6 sm:p-7 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm ${
        isDarkMode ? 'bg-purple-950/40 border-purple-800/50' : 'bg-purple-50/80 border-purple-200/80'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-3xl shrink-0 shadow-md">
            🧠
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">Arohi AI Recommendation</h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 dark:bg-purple-900 dark:text-purple-200 text-[10px] font-black uppercase">Adaptive</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-1 max-w-xl leading-relaxed">
              You have strong conceptual understanding in mechanics and calculus. By allocating 45 minutes daily to Electrostatics and Organic Reactions, you can elevate your score by <strong>+35 to 45 marks</strong> in the next mock test.
            </p>
          </div>
        </div>

        <div className="text-center shrink-0 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 w-full sm:w-auto shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Target Potential</div>
          <div className="text-3xl font-black text-purple-600">225+</div>
          <div className="text-xs text-slate-500 font-medium mt-0.5">Marks in reach 🚀</div>
        </div>
      </div>

      {/* 8. PERSONALIZED RECOMMENDATIONS (4 ACTION BUTTONS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Next Action Steps</h3>
          <span 
            onClick={onOpenStudyPlan}
            className="text-xs sm:text-sm font-bold text-purple-600 hover:underline cursor-pointer"
          >
            View Full Study Plan →
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Revise Weak Topics */}
          <div className={`p-5 rounded-3xl border text-center space-y-3 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="text-3xl">📖</div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Revise Weak Topics</h4>
              <p className="text-xs text-slate-400 mt-0.5">Electrostatics & Organics</p>
            </div>
            <button 
              onClick={() => {
                if (onAskArohiInChat) {
                  onAskArohiInChat("Arohi, generate revision flashcards and key formula sheet for Electrostatics.");
                }
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors active:scale-95 shadow-xs"
            >
              Start Revision
            </button>
          </div>

          {/* Topic Tests */}
          <div className={`p-5 rounded-3xl border text-center space-y-3 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="text-3xl">🎯</div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Topic Tests</h4>
              <p className="text-xs text-slate-400 mt-0.5">Targeted 15-min drill</p>
            </div>
            <button 
              onClick={onBackToResult}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-colors active:scale-95 shadow-xs"
            >
              Attempt Drill
            </button>
          </div>

          {/* Previous Year Papers */}
          <div className={`p-5 rounded-3xl border text-center space-y-3 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="text-3xl">📑</div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">PYQ Practice</h4>
              <p className="text-xs text-slate-400 mt-0.5">Past 10 Years JEE</p>
            </div>
            <button 
              onClick={onBackToResult}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer transition-colors active:scale-95 shadow-xs"
            >
              Practice PYQs
            </button>
          </div>

          {/* Daily Goal */}
          <div className={`p-5 rounded-3xl border text-center space-y-3 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="text-3xl">📅</div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Daily Milestone</h4>
              <p className="text-xs text-slate-400 mt-0.5">30 Questions Goal</p>
            </div>
            <button 
              onClick={onOpenStudyPlan}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer transition-colors active:scale-95 shadow-xs"
            >
              Open Plan
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
