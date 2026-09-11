import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  Target, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  Clock, 
  Sparkles, 
  FileCheck, 
  ShieldCheck, 
  Play,
  Award
} from 'lucide-react';

interface ArohiExamsProductPageProps {
  onStartExams: () => void;
  onNavigateTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export default function ArohiExamsProductPage({
  onStartExams,
  onNavigateTab,
  isDarkMode = true
}: ArohiExamsProductPageProps) {
  const badges = [
    '10L+ Students Learning',
    '500+ Exams Covered',
    '95% Score Improvement',
    '24/7 AI Doubt Solving'
  ];

  const tools = [
    {
      title: 'AI Adaptive Practice Tests',
      desc: 'Questions dynamically adapt to your strengths, identifying weak spots in real-time.',
      icon: Target,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Full-Length Mock Exams',
      desc: 'Exact exam patterns, timed countdowns, negative marking and AIR ranking simulations.',
      icon: FileCheck,
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Deep Performance Diagnostics',
      desc: 'Granular chapter-level accuracy, speed benchmarks, and time distribution metrics.',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Personalized Study Roadmaps',
      desc: 'Custom daily revision plans tailored to your exam target date and syllabus status.',
      icon: Clock,
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Previous 10-Year Papers',
      desc: 'Solved PYQs with step-by-step logic, alternative short-cuts, and concept tags.',
      icon: BookOpen,
      color: 'from-rose-500 to-pink-600'
    },
    {
      title: 'Instant 24/7 Doubt Solver',
      desc: 'Snap a picture of any complex equation or question to get instant vernacular explanations.',
      icon: HelpCircle,
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const examCategories = [
    {
      category: 'School Boards (Classes 6–12)',
      exams: ['CBSE Board', 'ICSE / ISC', 'State Boards (UP, Bihar, Odisha, Maharashtra)', 'Olympiads (IMO, NSO)']
    },
    {
      category: 'Competitive Government Exams',
      exams: ['SSC CGL & CHSL', 'Banking (IBPS PO, SBI Clerk)', 'Railways RRB NTPC', 'Defence (NDA, CDS, AFCAT)']
    },
    {
      category: 'Engineering & Medical Entrances',
      exams: ['JEE Main & Advanced', 'NEET UG', 'CUET UG / PG', 'State Engineering CETs']
    },
    {
      category: 'Civil Services & State PSCs',
      exams: ['UPSC Civil Services (IAS/IPS)', 'State PCS (BPSC, UPPSC, OPSC, MPSC)', 'Staff Selection Commissions']
    },
    {
      category: 'Professional & Commerce',
      exams: ['CA Foundation & Inter', 'CS Executive', 'CMA India', 'Law (CLAT UG/PG)']
    },
    {
      category: 'International & Post-Graduation',
      exams: ['CAT / XAT / SNAP (MBA)', 'GATE (All Branches)', 'GRE & GMAT', 'IELTS / TOEFL English']
    }
  ];

  return (
    <div className="w-full space-y-12 pb-20 font-sans">
      {/* 1. Hero Section */}
      <section className="text-center pt-4 sm:pt-8 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>AROHI EXAMS &amp; ASSESSMENTS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          Smarter assessments for a brighter future.
        </h1>
        <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          AI-powered practice, personalized learning, and real exam readiness for every learner across India.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {badges.map((b, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              ✓ {b}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={onStartExams}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Start Practice Tests</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateTab('syllabus')}
            className="px-5 py-3 rounded-2xl bg-white/80 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>School Syllabus AI (Classes 1–12)</span>
          </button>
        </div>
      </section>

      {/* 2. 6 Core Assessment Tools */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            6 Intelligent Tools for Exam Mastery
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Built from scratch to turn syllabus anxiety into structured, test-day confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {tools.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isDarkMode ? 'bg-[#15171e] border-white/8 hover:border-amber-500/40' : 'bg-white border-black/8 hover:shadow-md'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} text-white flex items-center justify-center mb-3 shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{t.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Comprehensive Exam Coverage */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-amber-950/20 via-orange-950/20 to-slate-950/30 rounded-3xl border border-amber-500/20 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                500+ EXAMS SUPPORTED
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
                Popular Exams Covered by Arohi
              </h2>
            </div>
            <button
              onClick={onStartExams}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Browse Full Question Bank →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {examCategories.map((c, i) => (
              <div 
                key={i}
                className="bg-white/80 dark:bg-[#12141c]/80 rounded-2xl p-4 border border-black/6 dark:border-white/8"
              >
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-500 mb-2">
                  {c.category}
                </h3>
                <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                  {c.exams.map((exam, exIdx) => (
                    <li key={exIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{exam}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Metrics Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-amber-500 font-display">10L+</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Students Guided</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-blue-500 font-display">50,000+</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Mock Tests Attempted</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-emerald-500 font-display">95%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Report Higher Scores</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-purple-500 font-display">100%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Syllabus Alignment</div>
          </div>
        </div>
      </section>
    </div>
  );
}
