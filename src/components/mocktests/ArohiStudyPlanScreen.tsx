import React, { useState } from 'react';
import { 
  Calendar, Flame, Clock, Target, CheckCircle2, BookOpen, 
  Sparkles, Check, ChevronRight, Edit3, ArrowLeft
} from 'lucide-react';

interface ArohiStudyPlanScreenProps {
  isDarkMode?: boolean;
  onBack: () => void;
  onOpenAiMentor: () => void;
  onAskArohiInChat?: (prompt: string) => void;
}

export default function ArohiStudyPlanScreen({
  isDarkMode = false,
  onBack,
  onOpenAiMentor,
  onAskArohiInChat
}: ArohiStudyPlanScreenProps) {
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Physics – Electrostatics', sub: 'Theory Revision', time: '60 min', completed: true, icon: '📘' },
    { id: 't2', title: 'Chemistry – Organic Chemistry', sub: 'Practice Questions', time: '45 min', completed: false, icon: '🧪' },
    { id: 't3', title: 'Mathematics – Calculus', sub: 'Formula Practice', time: '60 min', completed: false, icon: 'π' },
    { id: 't4', title: 'JEE Main Previous Year (2024)', sub: 'Full Length Test', time: '180 min', completed: false, icon: '📑' }
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
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

        <button
          onClick={() => {
            if (onAskArohiInChat) {
              onAskArohiInChat("Arohi, help me optimize my 3-month daily study schedule for JEE Main.");
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold cursor-pointer active:scale-95 shadow-sm transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Ask Arohi AI</span>
        </button>
      </div>

      {/* 2. HEADER */}
      <div className={`p-6 sm:p-7 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-r from-purple-50/80 via-white to-purple-50/40 border-purple-100'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-xs font-black uppercase tracking-wider">
              📅 AI Smart Schedule
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            Target Study Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
            Adaptive daily milestones, streak tracking, and personalized syllabus completion tracker.
          </p>
        </div>

        <button
          onClick={onOpenAiMentor}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Arohi AI Mentor</span>
        </button>
      </div>

      {/* 3. EXAM COUNTDOWN CARD */}
      <div className={`p-6 rounded-3xl border grid grid-cols-3 gap-3 text-center shadow-sm ${
        isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
      }`}>
        <div className="space-y-1">
          <div className="text-base sm:text-xl font-black text-slate-900 dark:text-white">JEE Main 2026</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Target Exam</div>
        </div>

        <div className="space-y-1 border-x border-slate-200 dark:border-slate-800 px-2">
          <div className="text-xl sm:text-3xl font-black text-purple-600">120</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Days Left</div>
        </div>

        <div className="space-y-1">
          <div className="text-base sm:text-xl font-black text-slate-900 dark:text-white">Jan 24, 2026</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Target Date</div>
        </div>
      </div>

      {/* 4. YOUR STUDY STREAK */}
      <div className={`p-5 sm:p-6 rounded-3xl border space-y-4 shadow-sm ${
        isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">Active Study Streak</h3>
          </div>
          <span className="text-xs sm:text-sm font-black text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800">
            🔥 12 Days Unbroken
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-3 text-center pt-2">
          {/* Mon */}
          <div className="space-y-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400 font-bold">Mon</span>
            <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">12</div>
            <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
              ✓
            </div>
          </div>

          {/* Tue */}
          <div className="space-y-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400 font-bold">Tue</span>
            <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">13</div>
            <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
              ✓
            </div>
          </div>

          {/* Wed */}
          <div className="space-y-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400 font-bold">Wed</span>
            <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">14</div>
            <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
              ✓
            </div>
          </div>

          {/* Thu */}
          <div className="space-y-2 p-2 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800">
            <span className="text-xs text-purple-600 font-black">Thu</span>
            <div className="text-xs sm:text-sm font-black text-purple-600">15</div>
            <div className="w-7 h-7 mx-auto rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black shadow-md">
              ★
            </div>
          </div>

          {/* Fri */}
          <div className="space-y-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400 font-bold">Fri</span>
            <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">16</div>
            <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
              ✓
            </div>
          </div>

          {/* Sat */}
          <div className="space-y-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400 font-bold">Sat</span>
            <div className="text-xs sm:text-sm font-bold text-slate-400">17</div>
            <div className="w-7 h-7 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center text-xs font-black">
              •
            </div>
          </div>

          {/* Sun */}
          <div className="space-y-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400 font-bold">Sun</span>
            <div className="text-xs sm:text-sm font-bold text-slate-400">18</div>
            <div className="w-7 h-7 mx-auto rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center text-xs font-black">
              •
            </div>
          </div>
        </div>
      </div>

      {/* 5. PROGRESS OVERVIEW */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Progress Overview</h3>
          <span className="text-xs sm:text-sm text-purple-600 font-bold">Detailed Metrics →</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Topics Completed */}
          <div className={`p-5 rounded-3xl border space-y-2 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Topics Mastered</div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">68 <span className="text-xs font-bold text-slate-400">/ 180</span></div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-blue-600 w-[37.8%]"></div>
            </div>
            <div className="text-xs text-slate-500 font-semibold">37.8% Finished</div>
          </div>

          {/* Tests Attempted */}
          <div className={`p-5 rounded-3xl border space-y-2 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Mocks Taken</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">24</div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-600 w-[60%]"></div>
            </div>
            <div className="text-xs text-slate-500 font-semibold">60% of Goal</div>
          </div>

          {/* Study Hours */}
          <div className={`p-5 rounded-3xl border space-y-2 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Study Hours</div>
            <div className="text-2xl sm:text-3xl font-black text-purple-600">86.5h</div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-purple-600 w-[72%]"></div>
            </div>
            <div className="text-xs text-slate-500 font-semibold">72% of Weekly Goal</div>
          </div>

          {/* Accuracy */}
          <div className={`p-5 rounded-3xl border space-y-2 ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Overall Accuracy</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">82.6%</div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-amber-500 w-[82.6%]"></div>
            </div>
            <div className="text-xs text-slate-500 font-semibold">High Precision Band</div>
          </div>
        </div>
      </div>

      {/* 6. TODAY'S PLAN */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Today's Schedule</h3>
            <span className="px-3 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-xs font-bold">4 Active Tasks</span>
          </div>
          <span className="text-xs sm:text-sm font-bold text-purple-600">All Tasks →</span>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 sm:p-5 rounded-3xl border flex items-center justify-between gap-4 cursor-pointer transition-all active:scale-[0.99] ${
                task.completed
                  ? 'bg-purple-50/50 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800 opacity-90'
                  : 'bg-white dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-3xl">{task.icon}</span>
                <div>
                  <h4 className={`text-sm sm:text-base font-black ${task.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{task.sub}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 shrink-0">
                <span className="text-xs sm:text-sm text-slate-500 font-bold flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  {task.time}
                </span>
                <div className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-colors shadow-xs ${
                  task.completed ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300 dark:border-slate-700'
                }`}>
                  {task.completed && <Check className="w-4 h-4" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. STUDY PLANNER GOALS */}
      <div className="space-y-3.5">
        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Planner Targets</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className={`p-5 rounded-3xl border flex items-center justify-between ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Daily Goal</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">6 hrs / day</div>
              <span className="text-xs text-purple-600 font-bold">Edit Target</span>
            </div>
            <div className="text-3xl">⏱️</div>
          </div>

          <div className={`p-5 rounded-3xl border flex items-center justify-between ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Weekly Target</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">36 hrs / wk</div>
              <span className="text-xs text-purple-600 font-bold">Edit Target</span>
            </div>
            <div className="text-3xl">🎯</div>
          </div>

          <div className={`p-5 rounded-3xl border flex items-center justify-between ${isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
            <div className="space-y-1">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Pace</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-600">24.5 hrs done</div>
              <span className="text-xs text-emerald-600 font-bold">66% on track</span>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>
      </div>

      {/* 8. MOTIVATION FOOTER CARD */}
      <div className={`p-6 sm:p-7 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm ${
        isDarkMode ? 'bg-purple-950/40 border-purple-800/50' : 'bg-purple-50/80 border-purple-200/80'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-purple-400 shrink-0 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
              alt="Arohi Character"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>Consistency is the key to top rank! 🔑</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-1">
              You are maintaining 82%+ accuracy. Maintain this pace and your All India Rank will continue to climb.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (onAskArohiInChat) {
              onAskArohiInChat("Arohi, give me an energetic, inspiring motivational booster for my exam study session right now!");
            }
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer shrink-0 active:scale-95 text-center"
        >
          Arohi Booster ✨
        </button>
      </div>

    </div>
  );
}
