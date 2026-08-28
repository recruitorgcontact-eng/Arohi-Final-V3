import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Compass, 
  Factory, 
  Phone, 
  Users, 
  Flame, 
  MapPin, 
  Download, 
  ChevronRight,
  MessageSquare,
  Lock,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Mission87Enrollment, Mission87TrackType } from '../../types/mission87';
import { 
  MISSION_87_MANIFESTO, 
  MISSION_87_TRACKS, 
  SAMPLE_CADET_METRICS,
  STATES_AND_UT_LIST,
  TrackData
} from '../../data/mission87Data';
import Mission87EnrollmentModal from './Mission87EnrollmentModal';
import Mission87IDCard from './Mission87IDCard';
import Mission87AwakeningTicker from './Mission87AwakeningTicker';

interface Mission87SectionProps {
  onOpenAuth: () => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
  onNavigateTab?: (tab: string) => void;
  onShare?: () => void;
  isDarkMode?: boolean;
}

export default function Mission87Section({
  onOpenAuth,
  onOpenChatWithPrompt,
  onNavigateTab,
  onShare,
  isDarkMode = true
}: Mission87SectionProps) {
  const { user, userData } = useAuth();

  const [enrollment, setEnrollment] = useState<Mission87Enrollment | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackData>(MISSION_87_TRACKS[0]);
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  // Inline Quick Enrollment Form State
  const [fullName, setFullName] = useState('');
  const [stateName, setStateName] = useState('Uttar Pradesh');
  const [districtName, setDistrictName] = useState('Varanasi');
  const [trackChoice, setTrackChoice] = useState<Mission87TrackType>('digital_business');
  const [ageGroup, setAgeGroup] = useState('18-24');
  const [isSubmittingInline, setIsSubmittingInline] = useState(false);
  const [inlineSuccess, setInlineSuccess] = useState(false);

  // Sync user details and saved enrollment
  useEffect(() => {
    if (user) {
      setFullName(user.displayName || '');
      const stored = localStorage.getItem(`arohi_mission87_enrollment_${user.uid}`);
      if (stored) {
        try {
          setEnrollment(JSON.parse(stored));
        } catch (e) {}
      } else if ((userData as any)?.mission87Enrollment) {
        setEnrollment((userData as any).mission87Enrollment);
      }
    }
  }, [user, userData]);

  const handleInlineEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }

    if (!fullName.trim()) return;

    setIsSubmittingInline(true);
    const cadetNum = `CADET-87-${Math.floor(100000 + Math.random() * 900000)}`;
    const newEnrollment: Mission87Enrollment = {
      userId: user.uid,
      cadetId: cadetNum,
      name: fullName.trim(),
      email: user.email || '',
      phone: (user as any).phoneNumber || '',
      state: stateName,
      district: districtName,
      townVillage: districtName,
      ageGroup: ageGroup,
      educationStatus: 'seeking_work',
      primaryTrack: trackChoice,
      hoursPerDay: '3-4 hours/day',
      availableEquipment: ['Smartphone with Internet', 'Computer / Laptop'],
      enrolledAt: new Date().toISOString(),
      milestones: ['enrolled'],
      verifiedProjects: []
    };

    localStorage.setItem(`arohi_mission87_enrollment_${user.uid}`, JSON.stringify(newEnrollment));
    setEnrollment(newEnrollment);
    setIsSubmittingInline(false);
    setInlineSuccess(true);
    setTimeout(() => setInlineSuccess(false), 5000);
  };

  const handleEnrollmentSuccess = (newEnrollment: Mission87Enrollment) => {
    setEnrollment(newEnrollment);
    setIsEnrollModalOpen(false);
    setShowIdCardModal(true);
  };

  const downloadManifesto = () => {
    const text = `=====================================================================
🇮🇳 MISSION 87: A NATIONAL YOUTH ECONOMIC ACTIVATION MOVEMENT
AROHI AI — ONE AI. INFINITE OPPORTUNITIES.
=====================================================================

"87 MILLION ARE NOT WAITING FOR INDIA.
INDIA IS WAITING FOR WHAT 87 MILLION CAN BUILD."

---------------------------------------------------------------------
THE MANIFESTO

India has millions of young people standing at a crossroads.
Some are studying.
Some are searching for work.
Some have left education.
Some have skills but no opportunity.
Some want to start something but don't know where to begin.

And many are looking at Artificial Intelligence and asking:
"What happens to my future now?"

AROHI AI believes the answer cannot simply be another course.
It has to be a pathway.
A pathway from confusion to clarity.
From learning to skill.
From skill to work.
From work to income.
From income to enterprise.
From enterprise to industry.

---------------------------------------------------------------------
THE 6 STEPS OF ACTIVATION:
1. LEARN: Acquire real, practical, directly applicable micro-skills.
2. BUILD: Create tangible prototypes and solutions for real problems.
3. FIND: Connect with employers, buyers, and regional MSMEs.
4. DELIVER: Generate measurable value with zero compromise on quality.
5. EARN: Get paid for real value — unlocking the first ₹5,000 milestone.
6. GROW: Scale that proof-of-work into micro-enterprises and regional industries.

---------------------------------------------------------------------
OFFICIAL HELPLINES:
📞 National Helpline: +91-90904 55555
📞 Cadet Support Desk: +91-93379 52401
🌐 Official Web: https://arohiai.com
=====================================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mission_87_Manifesto_Arohi_AI.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100 font-sans">
      
      {/* Live Animated Storytelling Chronicle Ticker */}
      <Mission87AwakeningTicker isDarkMode={isDarkMode} />

      {/* 1. Sovereign Movement Banner & Hero Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0c0822] via-[#140e36] to-[#1f0f4a] border-2 border-purple-500/40 shadow-[0_20px_60px_rgba(124,58,237,0.3)] text-left">
        {/* Tri-Color Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/15 via-teal-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Movement Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-2xl sm:text-3xl">🇮🇳</span>
            <span className="bg-gradient-to-r from-amber-500 via-purple-500 to-emerald-500 text-white font-black text-[10px] sm:text-xs uppercase px-3 py-1 rounded-full tracking-widest shadow-md">
              A NATIONAL YOUTH ECONOMIC ACTIVATION MOVEMENT
            </span>
            <span className="bg-purple-500/20 text-purple-200 border border-purple-400/40 text-[10px] sm:text-xs font-bold uppercase px-3 py-1 rounded-full">
              SOVEREIGN CITIZEN ENROLLMENT
            </span>
          </div>

          {/* Primary Declarative Headline */}
          <div className="space-y-2.5">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              MISSION 87
            </h2>
            <div className="space-y-1">
              <p className="text-lg sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-amber-400 tracking-tight">
                87 MILLION ARE NOT WAITING FOR INDIA.
              </p>
              <p className="text-lg sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 tracking-tight">
                INDIA IS WAITING FOR WHAT 87 MILLION CAN BUILD.
              </p>
            </div>
            <p className="text-xs sm:text-sm text-purple-200 font-mono tracking-wider pt-1">
              ✨ ONE AI. INFINITE OPPORTUNITIES.
            </p>
          </div>

          {/* Philosophy Statement */}
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-medium">
            India has millions of young people standing at a crossroads. Arohi AI believes the answer cannot simply be another course. It has to be a sovereign pathway: 
            <span className="text-amber-300 font-semibold"> From confusion to clarity</span> • 
            <span className="text-purple-300 font-semibold"> From learning to skill</span> • 
            <span className="text-cyan-300 font-semibold"> From skill to work</span> • 
            <span className="text-emerald-300 font-semibold"> From work to income</span> • 
            <span className="text-amber-300 font-semibold"> From income to enterprise</span> • 
            <span className="text-rose-300 font-semibold"> From enterprise to industry</span>.
          </p>

          {/* Quick Header CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#join-movement"
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join the Movement 🇮🇳</span>
            </a>

            <button
              onClick={downloadManifesto}
              className="px-5 py-3.5 bg-[#1b1444] hover:bg-[#281b66] border border-purple-500/40 text-purple-200 hover:text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Manifesto</span>
            </button>

            {enrollment && (
              <button
                onClick={() => setShowIdCardModal(true)}
                className="px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>View Cadet Pass ({enrollment.cadetId})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. National Live Pulse Ticker */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Active Cadets Enrolled', value: `${SAMPLE_CADET_METRICS.nationalEnrolledCadets.toLocaleString()}+`, icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Districts Covered', value: `${SAMPLE_CADET_METRICS.districtsActive}/780`, icon: MapPin, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Prototypes Built', value: `${SAMPLE_CADET_METRICS.projectsBuilt.toLocaleString()}+`, icon: Sparkles, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'First ₹5K Unlocked', value: `${SAMPLE_CADET_METRICS.first5kAchieved.toLocaleString()}+`, icon: Flame, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Enterprises Active', value: `${SAMPLE_CADET_METRICS.enterprisesLaunched.toLocaleString()}+`, icon: Factory, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-4 bg-[#120d2a] rounded-2xl border border-purple-500/20 text-left space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{m.label}</span>
                <div className={`p-1.5 rounded-lg ${m.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-black text-white">{m.value}</p>
            </div>
          );
        })}
      </div>

      {/* 3. PROMINENT 'JOIN THE MOVEMENT' REGISTRATION SECTION */}
      <div id="join-movement" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#130d33] via-[#1a1146] to-[#0c0822] border-2 border-amber-500/40 p-6 sm:p-10 shadow-[0_16px_50px_rgba(245,158,11,0.15)] text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Movement Value Proposition */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cadet Activation Desk</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Claim Your Official Cadet ID & Unlock Your 90-Day Future Map
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Join millions of Indian innovators moving from passive browsing to active economic production. Get immediate access to:
            </p>

            <div className="space-y-3">
              {[
                { title: 'Verifiable Digital Cadet Pass', desc: 'Unique Sovereign ID, district badge & encrypted QR code.' },
                { title: 'Personalized 90-Day Execution Blueprint', desc: 'Customized action plan based on your education & district potential.' },
                { title: 'Mission ₹5K First-Income Roadmap', desc: 'Step-by-step guidance to deliver real value and earn your first ₹5,000.' },
                { title: '24x7 Multilingual Voice AI Mentorship', desc: 'Arohi AI speaks 150+ languages for real-time problem solving.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Helpline Info */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Phone className="w-3.5 h-3.5" />
                <span>Helpline: +91-90904 55555</span>
              </span>
              <span className="text-purple-300">
                Support: +91-93379 52401
              </span>
            </div>
          </div>

          {/* Right Column: Direct Registration / Cadet Status Card */}
          <div className="lg:col-span-6">
            {enrollment ? (
              // Enrolled State Card
              <div className="bg-[#0b081e] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-5 text-center shadow-xl">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                  <UserCheck className="w-8 h-8" />
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    ACTIVE CADET STATUS
                  </span>
                  <h4 className="text-xl font-black text-white">{enrollment.name}</h4>
                  <p className="text-xs font-mono text-purple-300 font-bold tracking-wider">
                    {enrollment.cadetId}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left text-xs bg-[#120d2c] p-3.5 rounded-xl border border-purple-500/20">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-bold">Location</span>
                    <span className="font-semibold text-white truncate block">{enrollment.district}, {enrollment.state}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-bold">Track</span>
                    <span className="font-semibold text-amber-300 truncate block">{enrollment.primaryTrack}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => setShowIdCardModal(true)}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>View Cadet Pass</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onNavigateTab) {
                        onNavigateTab('mission87');
                      }
                    }}
                    className="flex-1 py-3 bg-[#1e1548] hover:bg-[#2b1f66] border border-purple-500/40 text-purple-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>Open 90-Day Map</span>
                  </button>
                </div>
              </div>
            ) : (
              // Registration Form (or Auth Trigger)
              <div className="bg-[#0b081e] border-2 border-purple-500/40 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                  <div>
                    <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider">Instant 1-Click Enrollment</span>
                    <h4 className="text-lg font-black text-white">Join Mission 87 Now</h4>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    OFFICIAL PASS
                  </span>
                </div>

                <form onSubmit={handleInlineEnroll} className="space-y-3">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#150f33] border border-purple-500/30 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>

                  {/* State and District */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">State / UT</label>
                      <select
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full bg-[#150f33] border border-purple-500/30 focus:border-amber-400 rounded-xl px-2.5 py-2 text-xs text-white outline-none cursor-pointer"
                      >
                        {STATES_AND_UT_LIST.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">District / Town</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Varanasi"
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                        className="w-full bg-[#150f33] border border-purple-500/30 focus:border-amber-400 rounded-xl px-2.5 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  {/* Track Selection */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">Target Activation Track</label>
                    <select
                      value={trackChoice}
                      onChange={(e) => setTrackChoice(e.target.value as Mission87TrackType)}
                      className="w-full bg-[#150f33] border border-purple-500/30 focus:border-amber-400 rounded-xl px-2.5 py-2 text-xs text-white outline-none cursor-pointer"
                    >
                      <option value="digital_business">Track 1: AI-Enabled Digital Business</option>
                      <option value="manufacturing">Track 2: Regional Manufacturing & ODOP</option>
                      <option value="agritech_food">Track 3: Agri-Tech & Food Value Addition</option>
                      <option value="skilled_green">Track 4: Green Economy & Solar / EV</option>
                      <option value="creative_commerce">Track 5: Creative Handicrafts & Exports</option>
                      <option value="services_trade">Track 6: Hyper-Local Skilled Trades</option>
                    </select>
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    {!user ? (
                      <button
                        type="button"
                        onClick={onOpenAuth}
                        className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Sign In & Activate Cadet Pass 🇮🇳</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmittingInline}
                        className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{isSubmittingInline ? 'Activating Cadet Pass...' : 'Activate Cadet Pass 🇮🇳'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[10px] text-center text-slate-400 font-medium">
                    By enrolling, you accept the Mission 87 Citizen Action Pledge.
                  </p>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 4. CLEARLY DEFINED MILESTONES: THE MISSION ₹5K ECONOMIC SCALE LADDER */}
      <div className="bg-[#120d2c]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
              Step-by-Step Economic Progression
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              The 5-Level Economic Scale Ladder
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Start with ₹5,000 proof, then scale to enterprise
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {MISSION_87_MANIFESTO.ladderSteps.map((ls, idx) => (
            <div 
              key={idx} 
              className="p-4 bg-[#0a0718] rounded-2xl border border-purple-500/20 hover:border-amber-400/50 transition-all space-y-2 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/30 inline-block">
                  {ls.milestone}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  L{idx + 1}
                </span>
              </div>
              <h5 className="text-sm font-black text-white">{ls.label}</h5>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">{ls.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CLEARLY DEFINED PATHWAYS: 6 CORE ACTIVATION TRACKS */}
      <div className="space-y-6 text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
              Sovereign Production Domains
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              6 Core Activation Tracks & ₹5K Action Blueprints
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-400">
            Select a track to view practical execution blueprints
          </span>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 select-none">
          {MISSION_87_TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTrack(t)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer border ${
                selectedTrack.id === t.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-lg scale-105'
                  : 'bg-[#120d2a] border-purple-500/20 text-slate-400 hover:text-white'
              }`}
            >
              <span>{t.badge}</span>
            </button>
          ))}
        </div>

        {/* Selected Track Detailed Blueprint Card */}
        <div className="bg-[#120d2a] border-2 border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {selectedTrack.badge}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-1.5">{selectedTrack.title}</h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5">{selectedTrack.description}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30 inline-block">
                ₹5,000 in {selectedTrack.first5kBlueprint.timeRequired}
              </span>
            </div>
          </div>

          {/* 3 Pillars of the Blueprint */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-[#0a0718] rounded-2xl border border-purple-500/20 space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-300 block">1. Micro-Skill to Learn</span>
              <p className="text-xs text-slate-100 font-bold">{selectedTrack.first5kBlueprint.skillToLearn}</p>
            </div>
            <div className="p-4 bg-[#0a0718] rounded-2xl border border-purple-500/20 space-y-1">
              <span className="text-[10px] font-black uppercase text-amber-300 block">2. Tangible Product to Build</span>
              <p className="text-xs text-slate-100 font-bold">{selectedTrack.first5kBlueprint.productToBuild}</p>
            </div>
            <div className="p-4 bg-[#0a0718] rounded-2xl border border-purple-500/20 space-y-1">
              <span className="text-[10px] font-black uppercase text-cyan-300 block">3. Target Paying Buyers</span>
              <p className="text-xs text-slate-100 font-bold">{selectedTrack.first5kBlueprint.targetBuyers}</p>
            </div>
          </div>

          {/* Step-by-Step Action Plan */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-slate-400 block tracking-wider">
              Execution Sequence ({selectedTrack.first5kBlueprint.timeRequired}):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedTrack.first5kBlueprint.actionPlan.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0e0a26] border border-purple-500/20">
                  <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/40">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-slate-200 font-medium leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger with Arohi AI */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (onOpenChatWithPrompt) {
                  onOpenChatWithPrompt(`Hi Arohi, I want to activate the ${selectedTrack.title} Mission ₹5K blueprint. What is my exact Day 1 action in my local district?`);
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Day 1 with Arohi AI Mentorship ✨</span>
            </button>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('mission87')}
                className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Open Full Movement Portal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 6. Sovereign Movement Support & Helplines */}
      <div className="bg-[#0e0a24] border-2 border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📞</span>
              <h3 className="text-base sm:text-lg font-black text-white">
                Mission 87 National Desk & Helplines
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Direct telephone, WhatsApp, and official web support for all registered cadets and district innovators.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
              ● Active 24x7
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-[#080516] rounded-2xl border border-purple-500/20 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[9px] font-black uppercase text-amber-400 block">NATIONAL HELPLINE</span>
              <p className="text-sm font-black text-white mt-1">+91-90904 55555</p>
            </div>
            <a
              href="tel:+919090455555"
              className="text-[10px] font-bold text-purple-300 hover:text-white uppercase flex items-center gap-1"
            >
              Call Now →
            </a>
          </div>

          <div className="p-4 bg-[#080516] rounded-2xl border border-purple-500/20 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[9px] font-black uppercase text-cyan-400 block">CADET SUPPORT DESK</span>
              <p className="text-sm font-black text-white mt-1">+91-93379 52401</p>
            </div>
            <a
              href="tel:+919337952401"
              className="text-[10px] font-bold text-purple-300 hover:text-white uppercase flex items-center gap-1"
            >
              Call Now →
            </a>
          </div>

          <div className="p-4 bg-[#080516] rounded-2xl border border-purple-500/20 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[9px] font-black uppercase text-emerald-400 block">OFFICIAL PORTAL</span>
              <p className="text-sm font-black text-white mt-1">arohiai.com</p>
            </div>
            <a
              href="https://arohiai.com"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold text-purple-300 hover:text-white uppercase flex items-center gap-1"
            >
              Visit Portal →
            </a>
          </div>
        </div>
      </div>

      {/* ID Card Modal */}
      {showIdCardModal && enrollment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <Mission87IDCard 
              enrollment={enrollment}
              onShare={onShare}
              onClose={() => setShowIdCardModal(false)}
            />
          </div>
        </div>
      )}

      {/* Enrollment Modal */}
      <Mission87EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        onSuccess={handleEnrollmentSuccess}
        onOpenAuthModal={onOpenAuth}
      />

    </section>
  );
}
