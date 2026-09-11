import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  Award, 
  Landmark, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Compass, 
  HeartHandshake
} from 'lucide-react';

interface ArohiOpportunitiesProductPageProps {
  onNavigateTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export default function ArohiOpportunitiesProductPage({
  onNavigateTab,
  isDarkMode = true
}: ArohiOpportunitiesProductPageProps) {
  const opportunityCategories = [
    {
      title: 'Skills & Practical Training',
      desc: 'High-income digital skills, AI tools mastery, vernacular copywriting, and decentralized fabrication.',
      icon: GraduationCap,
      color: 'from-blue-600 to-cyan-600',
      tab: 'courses',
      badge: 'Learn & Build'
    },
    {
      title: 'Jobs & Verified Careers',
      desc: 'Curated corporate, startup, remote and government openings with direct verified employer applications.',
      icon: Briefcase,
      color: 'from-emerald-600 to-teal-600',
      tab: 'jobs',
      badge: '50K+ Openings'
    },
    {
      title: 'Paid Internships & Apprenticeships',
      desc: 'Real-world project experience with stipends, mentorship, and full-time hiring conversion tracks.',
      icon: Rocket,
      color: 'from-amber-600 to-orange-600',
      tab: 'jobs',
      badge: 'Zero Experience Needed'
    },
    {
      title: 'Sovereign Entrepreneurship',
      desc: 'Build your micro-agency, WhatsApp digital storefront, local SEO agency, or physical manufacturing unit.',
      icon: Award,
      color: 'from-purple-600 to-indigo-600',
      tab: 'mission87',
      badge: '₹5K to ₹1L/mo'
    },
    {
      title: 'National & State Scholarships',
      desc: 'Merit and means scholarships for school, diploma, undergraduate, and PwD/Divyangjan students.',
      icon: Compass,
      color: 'from-rose-600 to-pink-600',
      tab: 'schemes',
      badge: 'Full Financial Aid'
    },
    {
      title: 'Government Schemes & Subsidies',
      desc: 'PMEGP, MUDRA loans, PM Vishwakarma toolkits, and state youth self-employment subsidies.',
      icon: Landmark,
      color: 'from-teal-600 to-emerald-600',
      tab: 'schemes',
      badge: '35% Govt Subsidy'
    }
  ];

  const flagshipPrograms = [
    {
      title: 'Mission 87 National Movement',
      desc: 'A nationwide campaign to activate 87 Million Indian NEET youth into self-reliant Sovereign Economic Creators.',
      badge: 'FLAGSHIP',
      actionText: 'Explore Mission 87 →',
      actionTab: 'mission87'
    },
    {
      title: 'Arohi AI for Youth',
      desc: 'Practical, hands-on generative AI and LLM training for school and college students in their own regional languages.',
      badge: 'STUDENT INITIATIVE',
      actionText: 'Start Learning →',
      actionTab: 'courses'
    },
    {
      title: 'Divyangjan & PwD Empowerment',
      desc: '4% Government job reservation guidance, UDID assistance, accessible ATS resume builder, and adaptive voice interview coaching.',
      badge: 'INCLUSION',
      actionText: 'View PwD Pathways →',
      actionTab: 'career'
    },
    {
      title: 'Decentralized District Incubation',
      badge: 'RURAL BHARAT',
      desc: 'Empowering local cadet units in every district to supply products and services to GeM and international markets.',
      actionText: 'Join Cadet Network →',
      actionTab: 'mission87'
    }
  ];

  return (
    <div className="w-full space-y-12 pb-20 font-sans">
      {/* 1. Hero Section */}
      <section className="text-center pt-4 sm:pt-8 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-widest mb-4">
          <Users className="w-3.5 h-3.5" />
          <span>OPPORTUNITIES &amp; CAREERS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          Your Skills. Our AI. A Brighter Tomorrow.
        </h1>
        <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          Discover opportunities, build future-ready skills, and be part of a stronger, smarter, self-reliant India.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            ✓ 1M+ Youth Reached
          </span>
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            ✓ 50,000+ Active Job Postings
          </span>
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            ✓ 5 Sovereign Earning Ladders
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={() => onNavigateTab('mission87')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Explore Mission 87 Movement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateTab('jobs')}
            className="px-5 py-3 rounded-2xl bg-white/80 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-purple-500" />
            <span>Search Verified Jobs</span>
          </button>
        </div>
      </section>

      {/* 2. 6 Opportunity Categories */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            Pillars of Economic &amp; Career Growth
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Whatever your starting point, there is a proven pathway forward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {opportunityCategories.map((op, idx) => {
            const Icon = op.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigateTab(op.tab)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  isDarkMode ? 'bg-[#15171e] border-white/8 hover:border-purple-500/40' : 'bg-white border-black/8 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${op.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-500">
                    {op.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{op.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed line-clamp-2">{op.desc}</p>
                <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-bold text-purple-500">
                  <span>Explore Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Flagship National Programs */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-950/20 via-indigo-950/20 to-slate-950/30 rounded-3xl border border-purple-500/20 p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
              COMMUNITY IMPACT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
              National Movements Powered by Arohi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {flagshipPrograms.map((prog, i) => (
              <div 
                key={i}
                className="bg-white/80 dark:bg-[#12141c]/80 rounded-2xl p-4 border border-black/6 dark:border-white/8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">
                    {prog.badge}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-2">{prog.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{prog.desc}</p>
                </div>
                <button
                  onClick={() => onNavigateTab(prog.actionTab)}
                  className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 text-xs font-bold text-purple-500 hover:text-purple-400 flex items-center justify-between cursor-pointer w-full text-left"
                >
                  <span>{prog.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
