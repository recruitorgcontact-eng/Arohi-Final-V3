import React from 'react';
import { 
  Sparkles, MessageSquare, BookOpen, BrainCircuit, FileText, 
  HelpCircle, Lightbulb, TrendingUp, Users, ArrowLeft, ArrowRight
} from 'lucide-react';

interface ArohiAiMentorScreenProps {
  isDarkMode?: boolean;
  onBack: () => void;
  onAskArohiInChat?: (prompt: string) => void;
}

export default function ArohiAiMentorScreen({
  isDarkMode = false,
  onBack,
  onAskArohiInChat
}: ArohiAiMentorScreenProps) {
  const handlePromptClick = (prompt: string) => {
    if (onAskArohiInChat) {
      onAskArohiInChat(prompt);
    }
  };

  return (
    <div className="space-y-7 max-w-4xl mx-auto pb-28 animate-in fade-in duration-300">
      
      {/* 1. TOP BAR */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exams</span>
        </button>

        <span className="px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 text-xs font-black border border-purple-200 dark:border-purple-800 shadow-xs">
          ✨ 24/7 AI Mentor Live
        </span>
      </div>

      {/* 2. HERO MENTOR BANNER */}
      <div className={`p-6 sm:p-7 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-r from-purple-50/90 via-white to-purple-50/50 border-purple-100'
      }`}>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-xs font-black uppercase tracking-wider">
              🤖 Intelligent Study Companion
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            Meet Arohi – Your Personal AI Mentor
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 max-w-xl leading-relaxed">
            "I'm here 24/7 to solve your toughest exam doubts, explain tricky derivations, decode PYQ patterns, and optimize your study schedule. What would you like to master today?"
          </p>
        </div>

        {/* 3D Character Illustration */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-purple-400 bg-purple-50 flex items-center justify-center shrink-0 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
            alt="Arohi AI Mentor"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 3. FIVE CORE CAPABILITIES PILLS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-1.5 shadow-xs">
          <div className="text-2xl">❓</div>
          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Doubt Solver</div>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-1.5 shadow-xs">
          <div className="text-2xl">💡</div>
          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Concept Explainer</div>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-1.5 shadow-xs">
          <div className="text-2xl">🎯</div>
          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Study Guidance</div>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-1.5 shadow-xs">
          <div className="text-2xl">📋</div>
          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Exam Strategy</div>
        </div>
        <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-1.5 col-span-2 sm:col-span-1 shadow-xs">
          <div className="text-2xl">✨</div>
          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">Motivation</div>
        </div>
      </div>

      {/* 4. AI STUDY TOOLS */}
      <div className="space-y-3.5">
        <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">AI Study Accelerators</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {/* AI Doubt Solver */}
          <div 
            onClick={() => handlePromptClick("Arohi, solve this exam question step-by-step with formulas and shortcuts: ")}
            className={`p-5 rounded-3xl border space-y-3 cursor-pointer transition-all active:scale-95 ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/80 hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center text-2xl shadow-xs">
              ❓
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">AI Doubt Solver</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Instant step-by-step solutions with shortcuts and tricks</p>
            </div>
          </div>

          {/* Notes Generator */}
          <div 
            onClick={() => handlePromptClick("Arohi, generate concise, revision-ready study notes for: ")}
            className={`p-5 rounded-3xl border space-y-3 cursor-pointer transition-all active:scale-95 ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500' : 'bg-white border-slate-200/80 hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-2xl shadow-xs">
              📝
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">Notes Generator</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">High-yield bullet summaries and quick-revision cheatsheets</p>
            </div>
          </div>

          {/* Mind Map Builder */}
          <div 
            onClick={() => handlePromptClick("Arohi, create an interactive conceptual mind map for this topic: ")}
            className={`p-5 rounded-3xl border space-y-3 cursor-pointer transition-all active:scale-95 ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-200/80 hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 flex items-center justify-center text-2xl shadow-xs">
              🗺️
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">Mind Map Builder</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Visual concept hierarchy for long-term memory retention</p>
            </div>
          </div>

          {/* Flashcards */}
          <div 
            onClick={() => handlePromptClick("Arohi, generate 10 high-yield flashcards with front/back Q&A for: ")}
            className={`p-5 rounded-3xl border space-y-3 cursor-pointer transition-all active:scale-95 ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500' : 'bg-white border-slate-200/80 hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 flex items-center justify-center text-2xl shadow-xs">
              🗂️
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">Flashcard Deck</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Spaced repetition active recall cards for high-frequency topics</p>
            </div>
          </div>

          {/* Formula Finder */}
          <div 
            onClick={() => handlePromptClick("Arohi, list all essential formulas and SI units for: ")}
            className={`p-5 rounded-3xl border space-y-3 cursor-pointer transition-all active:scale-95 ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-rose-500' : 'bg-white border-slate-200/80 hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center justify-center text-2xl shadow-xs">
              📐
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">Formula Navigator</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">All physics & math formulas with SI units and derivations</p>
            </div>
          </div>

          {/* PYQ Explorer */}
          <div 
            onClick={() => handlePromptClick("Arohi, give me the last 5 years most repeated PYQs with solutions for: ")}
            className={`p-5 rounded-3xl border space-y-3 cursor-pointer transition-all active:scale-95 ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-indigo-500' : 'bg-white border-slate-200/80 hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-2xl shadow-xs">
              📑
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">PYQ Explorer</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Last 5 years previous exam trends and recurring patterns</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. TALK TO AROHI PROMPTS */}
      <div className="space-y-3.5">
        <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Quick Prompts for Arohi</h2>

        <div className="space-y-3">
          <div 
            onClick={() => handlePromptClick("Explain Ohm's Law and its mathematical formula with practical examples.")}
            className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/80 hover:border-purple-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">💬</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">"Explain Ohm's Law with real-world examples"</span>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-600 shrink-0" />
          </div>

          <div 
            onClick={() => handlePromptClick("What are the best recommended books and strategy for JEE Main preparation?")}
            className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/80 hover:border-purple-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">💬</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">"Best recommended books & strategy for JEE Main"</span>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-600 shrink-0" />
          </div>

          <div 
            onClick={() => handlePromptClick("Give me proven exam hacks and tips to improve negative marking and accuracy in MCQ tests.")}
            className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/80 hover:border-purple-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">💬</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">"How to eliminate negative marking in MCQs"</span>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-600 shrink-0" />
          </div>

          <div 
            onClick={() => handlePromptClick("Create a customized 3-month timetable and syllabus plan for my upcoming exam.")}
            className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] ${
              isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500' : 'bg-white border-slate-200/80 hover:border-purple-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">💬</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">"Create a 3-month high-yield exam timetable"</span>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-600 shrink-0" />
          </div>
        </div>
      </div>

    </div>
  );
}
