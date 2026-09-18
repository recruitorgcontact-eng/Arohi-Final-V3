import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Cpu,
  Code2,
  Terminal,
  Languages,
  Globe,
  IndianRupee,
  TrendingUp,
  Flag,
  Landmark,
  Crown,
  Award,
  BarChart3,
  Rocket,
  Hammer,
  GraduationCap,
  BookOpen,
  Target,
  Lightbulb,
  Zap,
  Flame,
  Sparkles,
  Infinity as InfinityIcon,
  Compass,
  ShieldCheck,
  Eye,
  Trophy,
  Wrench,
  Search,
  Bot,
  Layers,
  Send
} from 'lucide-react';

interface TagConfig {
  icon: React.ComponentType<{ className?: string }>;
  badgeClass: string;
  iconClass: string;
}

// Semantic categorization for every motivational tag
const TAG_CONFIG_MAP: Record<string, TagConfig> = {
  // AI & Cognition
  "INTELLIGENCE": {
    icon: Brain,
    badgeClass: "bg-sky-500/10 border-sky-500/25 text-sky-600 dark:text-sky-400",
    iconClass: "text-sky-500 dark:text-sky-400"
  },
  "DEEP WISDOM": {
    icon: Brain,
    badgeClass: "bg-indigo-500/10 border-indigo-500/25 text-indigo-600 dark:text-indigo-400",
    iconClass: "text-indigo-500 dark:text-indigo-400"
  },
  "ALGORITHM": {
    icon: Cpu,
    badgeClass: "bg-violet-500/10 border-violet-500/25 text-violet-600 dark:text-violet-400",
    iconClass: "text-violet-500 dark:text-violet-400"
  },
  "AUTOMATION": {
    icon: Bot,
    badgeClass: "bg-cyan-500/10 border-cyan-500/25 text-cyan-600 dark:text-cyan-400",
    iconClass: "text-cyan-500 dark:text-cyan-400"
  },
  "ONE AI": {
    icon: Sparkles,
    badgeClass: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400",
    iconClass: "text-blue-500 dark:text-blue-400"
  },
  "SYNTHESIS": {
    icon: Cpu,
    badgeClass: "bg-purple-500/10 border-purple-500/25 text-purple-600 dark:text-purple-400",
    iconClass: "text-purple-500 dark:text-purple-400"
  },

  // Sovereign Movement, Bharat & National Scale
  "MISSION 87": {
    icon: Flag,
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    iconClass: "text-amber-600 dark:text-amber-400"
  },
  "BHARAT FIRST": {
    icon: Flag,
    badgeClass: "bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-300",
    iconClass: "text-orange-600 dark:text-orange-400"
  },
  "NATION BUILDER": {
    icon: Landmark,
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    iconClass: "text-amber-600 dark:text-amber-400"
  },
  "SOVEREIGN CREATOR": {
    icon: Crown,
    badgeClass: "bg-yellow-500/15 border-yellow-500/30 text-yellow-700 dark:text-yellow-300",
    iconClass: "text-yellow-600 dark:text-yellow-400"
  },
  "LEADERSHIP": {
    icon: Crown,
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    iconClass: "text-amber-600 dark:text-amber-400"
  },

  // Earning, Economics & Mastery
  "EARN & GROW": {
    icon: IndianRupee,
    badgeClass: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    iconClass: "text-emerald-600 dark:text-emerald-400"
  },
  "ENDURING VALUE": {
    icon: Award,
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    iconClass: "text-amber-600 dark:text-amber-400"
  },
  "MASTERY": {
    icon: Trophy,
    badgeClass: "bg-purple-500/10 border-purple-500/25 text-purple-600 dark:text-purple-400",
    iconClass: "text-purple-500 dark:text-purple-400"
  },
  "VICTORY": {
    icon: Trophy,
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    iconClass: "text-amber-600 dark:text-amber-400"
  },
  "GROWTH MINDSET": {
    icon: TrendingUp,
    badgeClass: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-500 dark:text-emerald-400"
  },
  "DAILY PROGRESS": {
    icon: TrendingUp,
    badgeClass: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-500 dark:text-emerald-400"
  },
  "LEVEL UP": {
    icon: TrendingUp,
    badgeClass: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-500 dark:text-emerald-400"
  },

  // Code & Engineering Craft
  "CLEAN CODE": {
    icon: Code2,
    badgeClass: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-500 dark:text-emerald-400"
  },
  "SOFTWARE CRAFT": {
    icon: Terminal,
    badgeClass: "bg-teal-500/10 border-teal-500/25 text-teal-600 dark:text-teal-400",
    iconClass: "text-teal-500 dark:text-teal-400"
  },
  "FULL STACK": {
    icon: Layers,
    badgeClass: "bg-violet-500/10 border-violet-500/25 text-violet-600 dark:text-violet-400",
    iconClass: "text-violet-500 dark:text-violet-400"
  },
  "ARCHITECTS": {
    icon: Layers,
    badgeClass: "bg-cyan-500/10 border-cyan-500/25 text-cyan-600 dark:text-cyan-400",
    iconClass: "text-cyan-500 dark:text-cyan-400"
  },
  "PROTOTYPE": {
    icon: Terminal,
    badgeClass: "bg-sky-500/10 border-sky-500/25 text-sky-600 dark:text-sky-400",
    iconClass: "text-sky-500 dark:text-sky-400"
  },

  // Language, Global Reach & Horizons
  "150+ LANGUAGES": {
    icon: Languages,
    badgeClass: "bg-teal-500/10 border-teal-500/25 text-teal-600 dark:text-teal-400",
    iconClass: "text-teal-500 dark:text-teal-400"
  },
  "GLOBAL SCALE": {
    icon: Globe,
    badgeClass: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400",
    iconClass: "text-blue-500 dark:text-blue-400"
  },
  "NEW HORIZONS": {
    icon: Compass,
    badgeClass: "bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400",
    iconClass: "text-rose-500 dark:text-rose-400"
  },
  "NO BOUNDARIES": {
    icon: Globe,
    badgeClass: "bg-indigo-500/10 border-indigo-500/25 text-indigo-600 dark:text-indigo-400",
    iconClass: "text-indigo-500 dark:text-indigo-400"
  },
  "OWN YOUR PATH": {
    icon: Compass,
    badgeClass: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    iconClass: "text-amber-500 dark:text-amber-400"
  },

  // Building, Shipping & Ambition
  "BUILD BIG": {
    icon: Hammer,
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    iconClass: "text-amber-600 dark:text-amber-400"
  },
  "MAKE IT REAL": {
    icon: Wrench,
    badgeClass: "bg-teal-500/10 border-teal-500/25 text-teal-600 dark:text-teal-400",
    iconClass: "text-teal-500 dark:text-teal-400"
  },
  "VENTURE FORWARD": {
    icon: Rocket,
    badgeClass: "bg-fuchsia-500/10 border-fuchsia-500/25 text-fuchsia-600 dark:text-fuchsia-400",
    iconClass: "text-fuchsia-500 dark:text-fuchsia-400"
  },
  "RAPID BUILD": {
    icon: Rocket,
    badgeClass: "bg-orange-500/10 border-orange-500/25 text-orange-600 dark:text-orange-400",
    iconClass: "text-orange-500 dark:text-orange-400"
  },
  "SHIP TODAY": {
    icon: Send,
    badgeClass: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-500 dark:text-emerald-400"
  },
  "INSTANT START": {
    icon: Zap,
    badgeClass: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    iconClass: "text-amber-500 dark:text-amber-400"
  },
  "BOLD AMBITION": {
    icon: Flame,
    badgeClass: "bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400",
    iconClass: "text-rose-500 dark:text-rose-400"
  },
  "BREAKTHROUGH": {
    icon: Zap,
    badgeClass: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    iconClass: "text-amber-500 dark:text-amber-400"
  },

  // Focus, Clarity & Research
  "DEEP FOCUS": {
    icon: Target,
    badgeClass: "bg-indigo-500/10 border-indigo-500/25 text-indigo-600 dark:text-indigo-400",
    iconClass: "text-indigo-500 dark:text-indigo-400"
  },
  "PURE FOCUS": {
    icon: Target,
    badgeClass: "bg-sky-500/10 border-sky-500/25 text-sky-600 dark:text-sky-400",
    iconClass: "text-sky-500 dark:text-sky-400"
  },
  "DISCIPLINE": {
    icon: Target,
    badgeClass: "bg-slate-500/10 border-slate-500/25 text-slate-700 dark:text-slate-300",
    iconClass: "text-slate-600 dark:text-slate-400"
  },
  "UNSHAKABLE": {
    icon: ShieldCheck,
    badgeClass: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-500 dark:text-emerald-400"
  },
  "RESILIENCE": {
    icon: ShieldCheck,
    badgeClass: "bg-teal-500/10 border-teal-500/25 text-teal-600 dark:text-teal-400",
    iconClass: "text-teal-500 dark:text-teal-400"
  },
  "COURAGE": {
    icon: ShieldCheck,
    badgeClass: "bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400",
    iconClass: "text-rose-500 dark:text-rose-400"
  },
  "DEEP RESEARCH": {
    icon: Search,
    badgeClass: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400",
    iconClass: "text-blue-500 dark:text-blue-400"
  },
  "DATA INSIGHTS": {
    icon: BarChart3,
    badgeClass: "bg-cyan-500/10 border-cyan-500/25 text-cyan-600 dark:text-cyan-400",
    iconClass: "text-cyan-500 dark:text-cyan-400"
  },
  "STRATEGY": {
    icon: Compass,
    badgeClass: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400",
    iconClass: "text-blue-500 dark:text-blue-400"
  },

  // Learning & Knowledge
  "ACCELERATED LEARNING": {
    icon: GraduationCap,
    badgeClass: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400",
    iconClass: "text-blue-500 dark:text-blue-400"
  },
  "LEARN BY BUILDING": {
    icon: GraduationCap,
    badgeClass: "bg-indigo-500/10 border-indigo-500/25 text-indigo-600 dark:text-indigo-400",
    iconClass: "text-indigo-500 dark:text-indigo-400"
  },
  "ACTIONABLE KNOWLEDGE": {
    icon: BookOpen,
    badgeClass: "bg-sky-500/10 border-sky-500/25 text-sky-600 dark:text-sky-400",
    iconClass: "text-sky-500 dark:text-sky-400"
  },
  "PROBLEM SOLVER": {
    icon: Wrench,
    badgeClass: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-500 dark:text-emerald-400"
  },

  // Inspiration & Spark
  "CREATIVE SPARK": {
    icon: Lightbulb,
    badgeClass: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    iconClass: "text-amber-500 dark:text-amber-400"
  },
  "INNOVATION": {
    icon: Lightbulb,
    badgeClass: "bg-yellow-500/10 border-yellow-500/25 text-yellow-600 dark:text-yellow-400",
    iconClass: "text-yellow-500 dark:text-yellow-400"
  },
  "CURIOSITY": {
    icon: Search,
    badgeClass: "bg-violet-500/10 border-violet-500/25 text-violet-600 dark:text-violet-400",
    iconClass: "text-violet-500 dark:text-violet-400"
  },
  "ILLUMINATE": {
    icon: Lightbulb,
    badgeClass: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    iconClass: "text-amber-500 dark:text-amber-400"
  },
  "ILLUMINATION": {
    icon: Lightbulb,
    badgeClass: "bg-yellow-500/10 border-yellow-500/25 text-yellow-600 dark:text-yellow-400",
    iconClass: "text-yellow-500 dark:text-yellow-400"
  },
  "PASSION & DRIVE": {
    icon: Flame,
    badgeClass: "bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400",
    iconClass: "text-rose-500 dark:text-rose-400"
  },
  "POTENTIAL": {
    icon: Zap,
    badgeClass: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    iconClass: "text-amber-500 dark:text-amber-400"
  },
  "INFINITE OPPORTUNITY": {
    icon: InfinityIcon,
    badgeClass: "bg-violet-500/10 border-violet-500/25 text-violet-600 dark:text-violet-400",
    iconClass: "text-violet-500 dark:text-violet-400"
  },
  "OPPORTUNITY": {
    icon: Sparkles,
    badgeClass: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400",
    iconClass: "text-blue-500 dark:text-blue-400"
  },
  "YOUR VISION": {
    icon: Eye,
    badgeClass: "bg-sky-500/10 border-sky-500/25 text-sky-600 dark:text-sky-400",
    iconClass: "text-sky-500 dark:text-sky-400"
  }
};

const DEFAULT_CONFIG: TagConfig = {
  icon: Sparkles,
  badgeClass: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
  iconClass: "text-blue-500 dark:text-blue-400"
};

export default function MotivationalTagBadge({ tag }: { tag: string }) {
  const normalizedTag = tag ? tag.trim().toUpperCase() : "A MORE HUMAN TOMORROW";
  const config = TAG_CONFIG_MAP[normalizedTag] || DEFAULT_CONFIG;
  const IconComponent = config.icon;

  return (
    <div className="h-7 inline-flex items-center justify-center mb-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={normalizedTag}
          initial={{ opacity: 0, scale: 0.92, y: 3 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -3 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors shadow-2xs ${config.badgeClass}`}
        >
          <IconComponent className={`w-3 h-3 shrink-0 ${config.iconClass}`} />
          <span className="truncate">{normalizedTag}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
