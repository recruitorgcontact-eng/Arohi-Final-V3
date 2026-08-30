import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Compass, 
  Factory, 
  Zap, 
  Phone, 
  Share2, 
  CheckCircle2, 
  Flame,
  Target,
  Calculator,
  Sprout,
  Sun,
  Palette,
  Wrench,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Mission87Enrollment, FutureMapResult, Mission87TrackType } from '../../types/mission87';
import { 
  MISSION_87_TRACKS, 
  STATES_AND_UT_LIST,
  TrackData 
} from '../../data/mission87Data';
import Mission87EnrollmentModal from './Mission87EnrollmentModal';
import FutureMapDiagnostic from './FutureMapDiagnostic';
import ManufacturingExplorer from './ManufacturingExplorer';
import Mission87IDCard from './Mission87IDCard';
import Mission87AwakeningTicker from './Mission87AwakeningTicker';
import Mission87RegionalSEOHub from './Mission87RegionalSEOHub';
import { audioEngine } from '../../utils/audioEngine';

interface Mission87PortalProps {
  onOpenAuth: () => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
  onNavigateTab?: (tab: string) => void;
  onShare?: () => void;
  isDarkMode?: boolean;
}

export default function Mission87Portal({
  onOpenAuth,
  onOpenChatWithPrompt,
  onNavigateTab,
  onShare,
  isDarkMode = true
}: Mission87PortalProps) {
  const { user, userData } = useAuth();

  // Navigation & Sub-views
  const [activeView, setActiveView] = useState<'story' | 'future_map' | 'manufacturing' | 'id_pass'>('story');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollment, setEnrollment] = useState<Mission87Enrollment | null>(null);
  
  // Interactive Calculator State
  const [calcHoursPerDay, setCalcHoursPerDay] = useState<number>(3);
  const [calcSelectedTrack, setCalcSelectedTrack] = useState<Mission87TrackType>('digital_business');
  const [calcCurrentStage, setCalcCurrentStage] = useState<number>(1);

  // Active Story Pathway Track
  const [selectedTrack, setSelectedTrack] = useState<TrackData>(MISSION_87_TRACKS[0]);

  // Interactive Live Pledge State
  const [pledgeName, setPledgeName] = useState('');
  const [pledgeState, setPledgeState] = useState('Uttar Pradesh');
  const [pledgeDistrict, setPledgeDistrict] = useState('Varanasi');
  const [pledgeGoal, setPledgeGoal] = useState<'5k' | '25k' | '50k' | '1lakh'>('25k');
  const [pledgeTrack, setPledgeTrack] = useState<Mission87TrackType>('digital_business');
  const [pledgeCommitted, setPledgeCommitted] = useState(false);

  const [copiedHelpline, setCopiedHelpline] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Auto-fill user details if logged in
  useEffect(() => {
    if (user) {
      setPledgeName(user.displayName || '');
      const stored = localStorage.getItem(`arohi_mission87_enrollment_${user.uid}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setEnrollment(parsed);
          setPledgeCommitted(true);
        } catch (e) {}
      } else if ((userData as any)?.mission87Enrollment) {
        setEnrollment((userData as any).mission87Enrollment);
        setPledgeCommitted(true);
      }
    }
  }, [user, userData]);

  const handleEnrollmentSuccess = (newEnrollment: Mission87Enrollment) => {
    setEnrollment(newEnrollment);
    setIsEnrollModalOpen(false);
    setPledgeCommitted(true);
    try {
      audioEngine.playSuccess();
    } catch {}
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim()) return;

    try {
      audioEngine.playSuccess();
    } catch {}

    const cadetId = `CADET-87-${Math.floor(100000 + Math.random() * 900000)}`;
    const newEnrollment: Mission87Enrollment = {
      userId: user ? user.uid : 'guest_cadet',
      cadetId,
      name: pledgeName.trim(),
      email: user?.email || '',
      phone: (user as any)?.phoneNumber || '',
      state: pledgeState,
      district: pledgeDistrict,
      townVillage: pledgeDistrict,
      ageGroup: '18-24',
      educationStatus: 'seeking_work',
      primaryTrack: pledgeTrack,
      hoursPerDay: `${calcHoursPerDay} hrs/day`,
      availableEquipment: ['Smartphone', 'Internet'],
      enrolledAt: new Date().toISOString(),
      milestones: ['enrolled'],
      verifiedProjects: []
    };

    setEnrollment(newEnrollment);
    setPledgeCommitted(true);

    if (user) {
      localStorage.setItem(`arohi_mission87_enrollment_${user.uid}`, JSON.stringify(newEnrollment));
    }
  };

  const calculateProjectedIncome = (hours: number, track: Mission87TrackType) => {
    const hourlyBase = track === 'digital_business' ? 180 : track === 'skilled_green' ? 220 : track === 'manufacturing' ? 200 : 160;
    const monthlyDays = 24;
    const month1 = Math.round(hours * hourlyBase * monthlyDays * 0.45); // Starter
    const month3 = Math.round(hours * hourlyBase * monthlyDays * 0.95); // Skilled
    const month6 = Math.round(hours * hourlyBase * monthlyDays * 1.85); // Advanced
    const month12 = Math.round(hours * hourlyBase * monthlyDays * 3.2); // Enterprise
    return {
      month1: Math.max(5000, month1),
      month3: Math.max(15000, month3),
      month6: Math.max(40000, month6),
      month12: Math.max(75000, month12)
    };
  };

  const projections = calculateProjectedIncome(calcHoursPerDay, calcSelectedTrack);

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'Sprout': return <Sprout className="w-5 h-5" />;
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      default: return <Wrench className="w-5 h-5" />;
    }
  };

  const handleShareMovement = () => {
    const shareText = `🇮🇳 MISSION 87 MOVEMENT: One Dream. One India. Infinite Opportunities. Join the national economic activation to achieve ₹5K to ₹1L+ monthly income with sovereign AI tools. Join the movement: ${window.location.origin}/mission87`;
    if (navigator.share) {
      navigator.share({
        title: 'Mission 87 Movement | Arohi AI',
        text: shareText,
        url: window.location.origin + '/mission87'
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    }
  };

  // Sub-views Renderers (Future Map / Manufacturing / ID Pass)
  if (activeView === 'future_map') {
    return (
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        <button
          onClick={() => setActiveView('story')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/40 text-purple-200 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
        >
          ← Back to Mission 87 Story
        </button>
        <FutureMapDiagnostic
          enrollment={enrollment}
          onOpenChatWithPrompt={onOpenChatWithPrompt}
          onSaveFutureMap={(newMap) => {
            if (enrollment) {
              const updated = { ...enrollment, futureMap: newMap };
              setEnrollment(updated);
              if (user) {
                localStorage.setItem(`arohi_mission87_enrollment_${user.uid}`, JSON.stringify(updated));
              }
            }
          }}
        />
      </div>
    );
  }

  if (activeView === 'manufacturing') {
    return (
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        <button
          onClick={() => setActiveView('story')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-900/30 hover:bg-amber-900/50 border border-amber-500/40 text-amber-200 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
        >
          ← Back to Mission 87 Story
        </button>
        <ManufacturingExplorer onOpenChatWithPrompt={onOpenChatWithPrompt} />
      </div>
    );
  }

  if (activeView === 'id_pass' && enrollment) {
    return (
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        <button
          onClick={() => setActiveView('story')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-200 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
        >
          ← Back to Mission 87 Story
        </button>
        <Mission87IDCard enrollment={enrollment} onShare={handleShareMovement} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-12 sm:space-y-20 text-slate-100 font-sans pb-32">
      
      {/* Dynamic Animated Storytelling Chronicle Ticker */}
      <Mission87AwakeningTicker isDarkMode={isDarkMode} />

      {/* ========================================================================= */}
      {/* ACT 1: THE SPARK & THE 87 MILLION AWAKENING (HERO STORY)                  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#070518] via-[#0e0a29] via-[#091538] to-[#041d24] border-2 border-cyan-400/40 shadow-[0_20px_70px_rgba(6,182,212,0.25)] text-left">
        
        {/* Ambient Tricolor Sovereign Aurora */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-white to-emerald-500 opacity-80" />

        <div className="relative z-10 space-y-6 sm:space-y-8">
          
          {/* Top Sovereign Movement Badge */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl filter drop-shadow">🇮🇳</span>
            <span className="bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-400 text-slate-950 font-black text-[9.5px] sm:text-xs uppercase px-3.5 py-1 rounded-full tracking-widest shadow-md">
              A NATIONAL YOUTH ECONOMIC ACTIVATION MOVEMENT
            </span>
            <span className="bg-purple-500/20 text-purple-200 border border-purple-400/40 text-[9.5px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              SOVEREIGN YOUTH INITIATIVE
            </span>
          </div>

          {/* Epic Main Headline */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
                MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">87</span>
              </h1>
              <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-200 uppercase tracking-widest">
                MOVEMENT
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              <p className="text-xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 tracking-tight leading-tight">
                87 MILLION ARE NOT WAITING FOR INDIA.
              </p>
              <p className="text-xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 tracking-tight leading-tight">
                INDIA IS WAITING FOR WHAT 87 MILLION CAN BUILD.
              </p>
            </div>
          </div>

          {/* The Story Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-slate-200">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
              <div className="text-amber-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                The Demographic Reality (NITI Aayog Data)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Official reports highlighted by <strong>NITI Aayog</strong> reveal that over <strong>87 Million (8.7 Crore) youth</strong> in India fall under the <strong>NEET</strong> category — <em className="text-amber-300">Not in Education, Employment, or Training</em>. This represents the world's largest untapped demographic force.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
              <div className="text-pink-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                The Core Problem
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Youth trapped in multi-year exam cycles and underemployment don't need another generic theoretical certificate. They need a <strong>verified, action-oriented earning pathway</strong> that moves them directly from confusion to cashflow and self-reliance.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
              <div className="text-cyan-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                The Mission 87 Answer
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                A grassroots sovereign movement to activate 87 Million youth out of the NEET bracket into <strong>active value creators</strong>, providing <strong>sovereign AI tools, verified execution blueprints, and micro-business pathways</strong> to achieve ₹5K to ₹1L+ monthly independence.
              </p>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => {
                const pledgeEl = document.getElementById('mission87-pledge-section');
                pledgeEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-slate-950" />
              <span>Take the Mission 87 Pledge 🇮🇳</span>
            </button>

            <button
              onClick={() => {
                const ladderEl = document.getElementById('mission87-earning-ladder');
                ladderEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3.5 bg-[#120a2e] hover:bg-[#1a0f45] border border-purple-500/40 text-purple-200 hover:text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-cyan-300" />
              <span>Explore ₹5K – ₹1L+ Roadmap</span>
            </button>

            <button
              onClick={handleShareMovement}
              className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-pink-400" />
              <span>{copiedShare ? 'Copied Link!' : 'Share Movement'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* ACT 2: THE CORE AGENDA — ₹5,000 TO ₹1,00,000+ MONTHLY EARNING ROADMAP      */}
      {/* ========================================================================= */}
      <section id="mission87-earning-ladder" className="space-y-8 text-left scroll-mt-20">
        
        {/* Section Header */}
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>THE CORE MOVEMENT AGENDA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The ₹5,000 to ₹1,00,000+ Monthly Earning Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl font-medium">
            Financial freedom is not an overnight miracle. Mission 87 breaks down real economic value creation into 4 verifiable stages with clear milestones and execution blueprints.
          </p>
        </div>

        {/* The 4-Tier Interactive Earning Ladder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* TIER 1: ₹5,000 - ₹15,000 */}
          <div 
            onClick={() => setCalcCurrentStage(1)}
            className={`relative p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
              calcCurrentStage === 1 
                ? 'bg-gradient-to-b from-[#1b103b] to-[#0d0724] border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] ring-1 ring-amber-400' 
                : 'bg-[#0d0a21]/90 border-purple-500/20 hover:border-purple-500/50'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  STAGE 01 • DAYS 1–30
                </span>
                <span className="text-xl font-black text-amber-400">₹5K - ₹15K</span>
              </div>
              <h3 className="text-base font-black text-white">Proof of Capability</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Unlocking your first ₹5,000 proves you can generate real value. Focus on AI-assisted micro-tasks: local business catalogs, social flyers, Google Maps optimization, and digital billing for neighborhood shops.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-300 font-bold">
              <span>Goal: First 2 Paid Clients</span>
              <span>⚡ High Velocity</span>
            </div>
          </div>

          {/* TIER 2: ₹15,000 - ₹40,000 */}
          <div 
            onClick={() => setCalcCurrentStage(2)}
            className={`relative p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
              calcCurrentStage === 2 
                ? 'bg-gradient-to-b from-[#091b3d] to-[#041126] border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400' 
                : 'bg-[#0d0a21]/90 border-purple-500/20 hover:border-purple-500/50'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  STAGE 02 • MONTHS 2–4
                </span>
                <span className="text-xl font-black text-cyan-400">₹15K - ₹40K</span>
              </div>
              <h3 className="text-base font-black text-white">Skill Stacking & Retainers</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Moving from one-off tasks to monthly retainers. Providing ongoing digital marketing, solar subsidy facilitation (PM Surya Ghar), or local agro-food packaging for multiple regional clients.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-cyan-300 font-bold">
              <span>Goal: 4–6 Steady Clients</span>
              <span>🔄 Recurring Income</span>
            </div>
          </div>

          {/* TIER 3: ₹40,000 - ₹75,000 */}
          <div 
            onClick={() => setCalcCurrentStage(3)}
            className={`relative p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
              calcCurrentStage === 3 
                ? 'bg-gradient-to-b from-[#06242a] to-[#021317] border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400' 
                : 'bg-[#0d0a21]/90 border-purple-500/20 hover:border-purple-500/50'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  STAGE 03 • MONTHS 4–8
                </span>
                <span className="text-xl font-black text-emerald-400">₹40K - ₹75K</span>
              </div>
              <h3 className="text-base font-black text-white">Professional Independence</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Specialized consulting, decentralized micro-production (leaf plates, spice milling, handicraft exports), or managing enterprise AI workflows for doctors, institutes, and MSMEs across districts.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300 font-bold">
              <span>Goal: High-Value Contracts</span>
              <span>⭐ Full Independence</span>
            </div>
          </div>

          {/* TIER 4: ₹75,000 - ₹1,00,000+ */}
          <div 
            onClick={() => setCalcCurrentStage(4)}
            className={`relative p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
              calcCurrentStage === 4 
                ? 'bg-gradient-to-b from-[#2b0c36] to-[#14041b] border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.3)] ring-1 ring-pink-400' 
                : 'bg-[#0d0a21]/90 border-purple-500/20 hover:border-purple-500/50'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  STAGE 04 • MONTHS 8–12+
                </span>
                <span className="text-xl font-black text-pink-400">₹1L+ / Month</span>
              </div>
              <h3 className="text-base font-black text-white">The Job Creator (Micro-Agency)</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Transitioning into an enterprise founder. Hiring 2 to 5 other youth in your hometown, fulfilling bulk orders, utilizing PMEGP/Mudra loans, and selling on ONDC & Amazon Karigar nationally.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-pink-300 font-bold">
              <span>Goal: Team of 2–5 Youth</span>
              <span>🚀 Job Creator</span>
            </div>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* INTERACTIVE EARNING POTENTIAL ESTIMATOR                                 */}
        {/* ======================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#100829] via-[#091533] to-[#041d24] border border-cyan-400/30 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Interactive Earning Potential Estimator</span>
              </div>
              <h4 className="text-lg font-black text-white mt-1">See Your Realistic 12-Month Trajectory</h4>
            </div>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 uppercase">
              Based on Real Cadet Execution Data
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Left Controls */}
            <div className="space-y-4 lg:col-span-1">
              <div>
                <label className="text-xs font-bold text-slate-300 flex justify-between mb-2">
                  <span>Daily Time Commitment:</span>
                  <span className="text-amber-400 font-black">{calcHoursPerDay} Hours / Day</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={calcHoursPerDay}
                  onChange={(e) => setCalcHoursPerDay(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#1b1444] rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
                  <span>1 hr (Side Hustle)</span>
                  <span>4 hrs (Part-time)</span>
                  <span>8 hrs (Full-time)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Select Target Economic Track:
                </label>
                <select
                  value={calcSelectedTrack}
                  onChange={(e) => setCalcSelectedTrack(e.target.value as Mission87TrackType)}
                  className="w-full bg-[#0d0a21] border border-purple-500/40 text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="digital_business">Digital Business & AI Services</option>
                  <option value="manufacturing">Regional Production / Manufacturing</option>
                  <option value="agritech_food">Agri-Tech & Food Processing</option>
                  <option value="skilled_green">Solar & Clean EV Mobility</option>
                  <option value="creative_commerce">Handicrafts & Global Exports</option>
                  <option value="services_trade">Hyper-Local Skilled Trades</option>
                </select>
              </div>
            </div>

            {/* Right Projection Milestones */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:col-span-2">
              <div className="p-4 rounded-2xl bg-[#080518] border border-amber-500/30 text-center space-y-1">
                <span className="text-[9px] font-extrabold uppercase text-slate-400">Month 1 (Starter)</span>
                <p className="text-xl font-black text-amber-400">₹{projections.month1.toLocaleString()}</p>
                <span className="text-[9px] text-amber-300/80 font-bold block">Unlock First ₹5K</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#080518] border border-cyan-500/30 text-center space-y-1">
                <span className="text-[9px] font-extrabold uppercase text-slate-400">Month 3 (Skilled)</span>
                <p className="text-xl font-black text-cyan-400">₹{projections.month3.toLocaleString()}</p>
                <span className="text-[9px] text-cyan-300/80 font-bold block">Repeatable Delivery</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#080518] border border-emerald-500/30 text-center space-y-1">
                <span className="text-[9px] font-extrabold uppercase text-slate-400">Month 6 (Master)</span>
                <p className="text-xl font-black text-emerald-400">₹{projections.month6.toLocaleString()}</p>
                <span className="text-[9px] text-emerald-300/80 font-bold block">High-Value Contracts</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#080518] border border-pink-500/30 text-center space-y-1">
                <span className="text-[9px] font-extrabold uppercase text-slate-400">Month 12 (Enterprise)</span>
                <p className="text-xl font-black text-pink-400">₹{projections.month12.toLocaleString()}+</p>
                <span className="text-[9px] text-pink-300/80 font-bold block">Job Creator Scale</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* ACT 3: THE 5 SOVEREIGN PILLARS OF THE MISSION 87 AGENDA                   */}
      {/* ========================================================================= */}
      <section className="space-y-8 text-left">
        
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SOVEREIGN FOUNDATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The 5 Pillars of the Movement
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl font-medium">
            Mission 87 is built on five non-negotiable principles designed to ensure true inclusivity, national self-reliance, and direct youth empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1b0e38] to-[#0c061c] border border-purple-500/30 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center font-black">
              01
            </div>
            <h3 className="text-lg font-black text-white">Sovereign AI Access & Empowerment</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Cutting-edge LLM cum LMM capabilities, exam solvers, and business OS tools are provided with zero barriers for youth across Bharat.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a1e3b] to-[#040e21] border border-cyan-500/30 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-black">
              02
            </div>
            <h3 className="text-lg font-black text-white">Tier-2 & Tier-3 City First</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Democratizing opportunity beyond metro cities so that a young mind in a small district has the exact same AI superpowers as someone in Silicon Valley or Bengaluru.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#062422] to-[#021312] border border-emerald-500/30 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center font-black">
              03
            </div>
            <h3 className="text-lg font-black text-white">Demolishing the Language Barrier</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Multilingual accessibility in Hindi, Tamil, Telugu, Odia, Bengali, Marathi, and 150+ regional languages. No youth will ever be left behind because of English.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#2e102e] to-[#140417] border border-pink-500/30 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-400/40 text-pink-300 flex items-center justify-center font-black">
              04
            </div>
            <h3 className="text-lg font-black text-white">Divyangjan & PwD Financial Dignity</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Audio-first voice navigation, screen-reader optimized interfaces, remote freelance curation, and direct government scheme guidance (UDID, ADIP, 4% quota).
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#2d1b09] to-[#170c02] border border-amber-500/30 space-y-3 shadow-lg md:col-span-2 lg:col-span-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-black">
              05
            </div>
            <h3 className="text-lg font-black text-white">The Job Creator Transformation</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Shifting youth psychology from passive job seekers (<em>"Please hire me"</em>) to active value creators (<em>"I build, deliver, and generate sustainable livelihoods"</em>).
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* ACT 4: THE 6 ACTION PATHWAYS & BLUEPRINTS (PRACTICAL EXECUTION)           */}
      {/* ========================================================================= */}
      <section className="space-y-8 text-left">
        
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>PRACTICAL EXECUTION TRACKS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The 6 Pathways of Financial Activation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl font-medium">
            Choose your dedicated domain. Each track comes with tested first-₹5,000 blueprints, target buyers, and real-world project roadmaps.
          </p>
        </div>

        {/* Track Selection Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MISSION_87_TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTrack(t)}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer border ${
                selectedTrack.id === t.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-300 text-white shadow-lg scale-105'
                  : 'bg-[#100b29] border-purple-500/30 text-slate-300 hover:border-purple-400 hover:text-white'
              }`}
            >
              <span>{getTrackIcon(t.iconName)}</span>
              <span>{t.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Track Detailed Blueprint Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c0822] via-[#120a2e] to-[#041d24] border-2 border-cyan-400/40 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  {selectedTrack.badge}
                </span>
                <span className="text-xs text-slate-400 font-bold">Official Pathway</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5">{selectedTrack.title}</h3>
              <p className="text-xs text-cyan-200 font-semibold mt-0.5">{selectedTrack.tagline}</p>
            </div>

            <button
              onClick={() => {
                if (onOpenChatWithPrompt) {
                  onOpenChatWithPrompt(`I want to start the Mission 87 pathway for "${selectedTrack.title}". Please guide me step-by-step to earn my first ₹5,000.`);
                }
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Zap className="w-3.5 h-3.5 text-slate-950" />
              <span>Launch AI Coach for this Track</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {selectedTrack.description}
          </p>

          {/* First ₹5k Blueprint Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 rounded-2xl bg-[#080518] border border-amber-500/30 space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> First ₹5,000 Deliverable & Target Buyers
              </span>
              <p className="text-xs text-white font-bold">{selectedTrack.first5kBlueprint.productToBuild}</p>
              <p className="text-[11px] text-slate-300 font-medium">
                <strong className="text-amber-300">Target Buyers:</strong> {selectedTrack.first5kBlueprint.targetBuyers}
              </p>
              <p className="text-[11px] text-slate-300 font-medium">
                <strong className="text-amber-300">Time to Complete:</strong> {selectedTrack.first5kBlueprint.timeRequired}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#080518] border border-cyan-500/30 space-y-2">
              <span className="text-[10px] font-black uppercase text-cyan-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 4-Step Execution Action Plan
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {selectedTrack.first5kBlueprint.actionPlan.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-black shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Starter Project Ideas */}
          <div className="pt-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              PROVEN STARTER PROJECT IDEAS FOR THIS TRACK:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedTrack.starterProjects.map((proj, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-200 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{proj}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* ACT 5: THE 5-YEAR NATIONAL IMPACT TARGETS (2026 – 2031)                   */}
      {/* ========================================================================= */}
      <section className="space-y-8 text-left">
        
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-pink-400">
            <Target className="w-4 h-4 text-pink-400" />
            <span>NATIONAL HORIZON</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            5-Year National Impact Milestones (2026 – 2031)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl font-medium">
            Mission 87 is not an abstract slogan. It is a measurable national transformation roadmap tracked across every Indian district.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#180e38] to-[#0a051c] border border-purple-500/30 space-y-2 text-left">
            <span className="text-[10px] font-black uppercase text-amber-400 font-mono">2026 MILESTONE</span>
            <p className="text-3xl sm:text-4xl font-black text-white">1M Youth</p>
            <p className="text-xs text-slate-300 font-medium">
              1 Million young Indians achieving their first verified ₹5,000 proof-of-capability milestone.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#091b3d] to-[#030d21] border border-cyan-500/30 space-y-2 text-left">
            <span className="text-[10px] font-black uppercase text-cyan-400 font-mono">2027 MILESTONE</span>
            <p className="text-3xl sm:text-4xl font-black text-white">10M Youth</p>
            <p className="text-xs text-slate-300 font-medium">
              10 Million youth reaching sustainable ₹25,000–₹50,000 monthly digital & trade income.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#062426] to-[#021213] border border-emerald-500/30 space-y-2 text-left">
            <span className="text-[10px] font-black uppercase text-emerald-400 font-mono">2028 MILESTONE</span>
            <p className="text-3xl sm:text-4xl font-black text-white">500K MSMEs</p>
            <p className="text-xs text-slate-300 font-medium">
              500,000+ youth-led micro-enterprises creating local employment across 700+ Indian districts.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#2b0c36] to-[#120317] border border-pink-500/30 space-y-2 text-left">
            <span className="text-[10px] font-black uppercase text-pink-400 font-mono">2031 TARGET</span>
            <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300">
              87M Lives
            </p>
            <p className="text-xs text-slate-300 font-medium">
              87 Million youth activated, adding billions to India's self-reliant $10 Trillion sovereign economy.
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* MEGA REGIONAL SEO & PAN-INDIA 28 STATES / 8 UTs ACTIVATION RADAR          */}
      {/* ========================================================================= */}
      <Mission87RegionalSEOHub
        onOpenChatWithPrompt={onOpenChatWithPrompt}
        onSelectState={(st) => setPledgeState(st)}
        isDarkMode={isDarkMode}
      />

      {/* ========================================================================= */}
      {/* ACT 6: THE MISSION 87 YOUTH PLEDGE & INSTANT PIONEER DIGITAL PASS         */}
      {/* ========================================================================= */}
      <section id="mission87-pledge-section" className="relative overflow-hidden rounded-[32px] p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0c0822] via-[#150a36] to-[#041d24] border-2 border-amber-400/50 shadow-[0_20px_60px_rgba(245,158,11,0.25)] text-left scroll-mt-20">
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          <div className="space-y-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>THE YOUTH OATH & PASS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Take the Mission 87 Pledge & Get Your Cadet ID
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl font-medium">
              Commit to self-reliance, practical skill mastery, and continuous financial progress. Receive your official <strong>Mission 87 Verified Pioneer ID Pass</strong> instantly.
            </p>
          </div>

          {!pledgeCommitted || !enrollment ? (
            <form onSubmit={handlePledgeSubmit} className="space-y-4 max-w-3xl">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={pledgeName}
                    onChange={(e) => setPledgeName(e.target.value)}
                    className="w-full bg-[#080518] border border-purple-500/40 text-white rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Your State / Union Territory *
                  </label>
                  <select
                    value={pledgeState}
                    onChange={(e) => setPledgeState(e.target.value)}
                    className="w-full bg-[#080518] border border-purple-500/40 text-white rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {STATES_AND_UT_LIST.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Your District / City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Varanasi, Sambalpur, Patna"
                    value={pledgeDistrict}
                    onChange={(e) => setPledgeDistrict(e.target.value)}
                    className="w-full bg-[#080518] border border-purple-500/40 text-white rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Your Target Monthly Goal *
                  </label>
                  <select
                    value={pledgeGoal}
                    onChange={(e) => setPledgeGoal(e.target.value as any)}
                    className="w-full bg-[#080518] border border-purple-500/40 text-white rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="5k">Stage 1: First ₹5,000 / month</option>
                    <option value="25k">Stage 2: Target ₹25,000 / month</option>
                    <option value="50k">Stage 3: Target ₹50,000 / month</option>
                    <option value="1lakh">Stage 4: Target ₹1,00,000+ / month (Job Creator)</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Your Primary Economic Track *
                </label>
                <select
                  value={pledgeTrack}
                  onChange={(e) => setPledgeTrack(e.target.value as Mission87TrackType)}
                  className="w-full bg-[#080518] border border-purple-500/40 text-white rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="digital_business">Digital Business & AI Services</option>
                  <option value="manufacturing">Regional Production / Manufacturing (Make in India)</option>
                  <option value="agritech_food">Agri-Tech & Food Processing</option>
                  <option value="skilled_green">Green Economy, Solar & EV Mobility</option>
                  <option value="creative_commerce">Handicrafts, Apparel & Global Exports</option>
                  <option value="services_trade">Hyper-Local Skilled Trades & Services</option>
                </select>
              </div>

              {/* Pledge Text Box */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 font-medium">
                ✋ <strong>My Youth Oath:</strong> <em>"I solemnly pledge to turn my energy into value, master practical skills with Arohi AI, generate honest income, and help build a self-reliant, prosperous Bharat."</em>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-slate-950" />
                <span>Confirm Pledge & Generate My Cadet ID</span>
              </button>

            </form>
          ) : (
            <div className="space-y-6">
              
              {/* Cadet Quick Status Header */}
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-300 flex items-center justify-center font-black">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">Cadet Pass Active: {enrollment.name}</h4>
                    <p className="text-xs text-emerald-200 font-mono font-bold">
                      ID: {enrollment.cadetId} • {enrollment.district}, {enrollment.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveView('id_pass')}
                    className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View & Download ID Card</span>
                  </button>

                  <button
                    onClick={handleShareMovement}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all cursor-pointer"
                    title="Share your Cadet status"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Direct Next Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveView('future_map')}
                  className="p-4 rounded-2xl bg-[#091533] border border-cyan-500/40 hover:border-cyan-300 text-left space-y-1 transition-all cursor-pointer group"
                >
                  <span className="text-xs font-black text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Compass className="w-4 h-4" /> 90-Day Diagnostic Map →
                  </span>
                  <p className="text-[11px] text-slate-300 font-medium">Create your personalized weekly milestone action plan.</p>
                </button>

                <button
                  onClick={() => setActiveView('manufacturing')}
                  className="p-4 rounded-2xl bg-[#1b103b] border border-amber-500/40 hover:border-amber-300 text-left space-y-1 transition-all cursor-pointer group"
                >
                  <span className="text-xs font-black text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Factory className="w-4 h-4" /> Make in India Explorer →
                  </span>
                  <p className="text-[11px] text-slate-300 font-medium">Explore physical products to manufacture in your district.</p>
                </button>

                <button
                  onClick={() => {
                    if (onOpenChatWithPrompt) {
                      onOpenChatWithPrompt(`I am Cadet ${enrollment.cadetId} from ${enrollment.district}, ${enrollment.state}. I want to unlock my first ₹5,000 milestone in ${enrollment.primaryTrack}. Please give me a detailed today's action plan.`);
                    }
                  }}
                  className="p-4 rounded-2xl bg-[#1c0828] border border-pink-500/40 hover:border-pink-300 text-left space-y-1 transition-all cursor-pointer group"
                >
                  <span className="text-xs font-black text-pink-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Zap className="w-4 h-4" /> Start Today's Earning Plan →
                  </span>
                  <p className="text-[11px] text-slate-300 font-medium">Get instant step-by-step guidance from Arohi AI.</p>
                </button>
              </div>

            </div>
          )}

        </div>

      </section>

      {/* ========================================================================= */}
      {/* FOOTER HELPLINE & MANIFESTO DESK                                          */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <span>🇮🇳 Built by Bharat, Built for Bharat</span>
          <span>•</span>
          <span className="text-amber-400 font-bold">ONE AI. INFINITE OPPORTUNITIES.</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText('+919090455555');
              setCopiedHelpline(true);
              setTimeout(() => setCopiedHelpline(false), 2000);
            }}
            className="text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{copiedHelpline ? 'Copied +91-90904 55555' : 'Helpline: +91-90904 55555'}</span>
          </button>

          <button
            onClick={handleShareMovement}
            className="text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-pink-400" />
            <span>Spread the Movement</span>
          </button>
        </div>
      </footer>

      {/* Enrollment Modal */}
      {isEnrollModalOpen && (
        <Mission87EnrollmentModal
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          onSuccess={handleEnrollmentSuccess}
          onOpenAuthModal={onOpenAuth}
        />
      )}

    </div>
  );
}
