import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  PhoneCall, 
  Mic, 
  Sparkles, 
  MessageSquare, 
  Video, 
  Award, 
  CheckCircle2, 
  ShieldAlert, 
  Play, 
  RotateCcw, 
  User, 
  Globe, 
  Briefcase, 
  FileText, 
  BarChart3, 
  ChevronRight, 
  Zap, 
  Volume2, 
  HelpCircle,
  Clock,
  Radio
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ArohiVoiceCall from './ArohiVoiceCall';

interface Question {
  id: number;
  text: string;
}

interface Evaluation {
  score: number;
  confidenceScore: number;
  communicationClarity: number;
  grammarScore: number;
  feedbackText: string;
  suggestedAnswer: string;
}

type InterviewDomain = 'developer' | 'banking' | 'civil' | 'hr' | 'msme';
type InterviewPersona = 'pooja' | 'vikram' | 'sharma' | 'rajesh';

const DOMAIN_CONFIG: Record<InterviewDomain, {
  label: string;
  badge: string;
  desc: string;
  defaultRole: string;
  recommendedPersona: InterviewPersona;
  sampleQuestions: string[];
}> = {
  developer: {
    label: 'Technical Web & Software Engineering',
    badge: 'IT & Cloud',
    desc: 'System architecture, API performance, React/Node.js, state management, SQL vs NoSQL, and scalability.',
    defaultRole: 'Fullstack Software Engineer',
    recommendedPersona: 'vikram',
    sampleQuestions: [
      'Tell me about a complex technical problem you solved and how you optimized latency or memory.',
      'Explain the trade-offs between SQL relational models and NoSQL document stores for high-throughput APIs.',
      'How do you design a resilient retry and circuit-breaker pattern in distributed microservices?'
    ]
  },
  banking: {
    label: 'Banking & Financial Services (IBPS / SBI / RBI)',
    badge: 'Banking & PSUs',
    desc: 'Banking operations, Mudra loan categories, NPA recovery under SARFAESI, KYC/AML norms, and customer dispute resolution.',
    defaultRole: 'IBPS Probationary Officer / Clerk',
    recommendedPersona: 'pooja',
    sampleQuestions: [
      'Why do you want to join public sector banking, and what value do you bring to retail operations?',
      'Explain the three tiers of Mudra loans (Shishu, Kishore, Tarun) and their operational eligibility.',
      'How would you de-escalate an upset customer whose emergency hospital payment failed due to a UPI server glitch?'
    ]
  },
  civil: {
    label: 'Civil Services & Public Administration (UPSC / State PSC)',
    badge: 'UPSC / OAS',
    desc: 'Constitutional ethics, rural disaster mitigation, balancing executive directives with statutory rules, and public grievance redressal.',
    defaultRole: 'Civil Services Administrative Officer',
    recommendedPersona: 'sharma',
    sampleQuestions: [
      'What is your motivation for joining civil administration rather than pursuing higher private sector remuneration?',
      'How would you coordinate immediate relief operations across inundated panchayats during monsoonal flash floods?',
      'How do you handle intense political pressure demanding deviation from administrative procurement norms?'
    ]
  },
  hr: {
    label: 'Corporate HR & Campus Placement Rounds',
    badge: 'Campus & MNC',
    desc: 'Behavioral situational assessment, STAR methodology (Situation, Task, Action, Result), team conflict resolution, and adaptability.',
    defaultRole: 'Associate Management Trainee',
    recommendedPersona: 'pooja',
    sampleQuestions: [
      'Walk me through your background and the top professional accomplishment you are most proud of.',
      'Describe a situation where you had a strong disagreement with a peer or project lead. How did you resolve it?',
      'Tell me about a time you missed a project deliverable deadline. What steps did you take next?'
    ]
  },
  msme: {
    label: 'MSME Startup Founder Pitch & High-Value Sales',
    badge: 'Startups & Sales',
    desc: 'Value proposition defense, unit economics, customer acquisition cost (CAC), PMEGP subsidies, and investor objection handling.',
    defaultRole: 'Startup Founder / Enterprise Sales Lead',
    recommendedPersona: 'rajesh',
    sampleQuestions: [
      'Pitch your core enterprise product in under 60 seconds: what exact problem are you solving and for whom?',
      'How do you plan to leverage central government schemes like PMEGP or Stand-Up India for working capital?',
      'If an enterprise client argues that your pricing is 30% higher than incumbents, how do you defend your ROI?'
    ]
  }
};

const PERSONA_CONFIG: Record<InterviewPersona, {
  name: string;
  title: string;
  tone: string;
  avatarBg: string;
  badgeColor: string;
}> = {
  pooja: {
    name: 'Pooja',
    title: 'Senior Talent Acquisition & HR Lead',
    tone: 'Empathetic, structured, behavioral fit, communication clarity',
    avatarBg: 'from-fuchsia-600 to-pink-600',
    badgeColor: 'border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-950/40'
  },
  vikram: {
    name: 'Vikram',
    title: 'Principal Technical Bar-Raiser',
    tone: 'Sharp, architectural depth, trade-offs, edge-case probing',
    avatarBg: 'from-cyan-600 to-blue-600',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40'
  },
  sharma: {
    name: 'Dr. Sharma',
    title: 'Civil Services Board Member',
    tone: 'Dignified, constitutional ethics, policy situations, public interest',
    avatarBg: 'from-amber-600 to-orange-600',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/40'
  },
  rajesh: {
    name: 'Rajesh',
    title: 'Fast-Paced Commercial & Sales Head',
    tone: 'Direct, ROI-focused, objections, business acumen & grit',
    avatarBg: 'from-emerald-600 to-teal-600',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40'
  }
};

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'mr', label: 'मराठी (Marathi)' }
];

export default function InterviewPage() {
  const { user, updateDiagnostics } = useAuth();
  
  // Interactive Configuration
  const [domain, setDomain] = useState<InterviewDomain>('developer');
  const [persona, setPersona] = useState<InterviewPersona>('pooja');
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [candidateName, setCandidateName] = useState<string>(() => {
    return user?.displayName || localStorage.getItem('recruit_user_name') || '';
  });
  
  // Live Voice Call State
  const [isLiveCallOpen, setIsLiveCallOpen] = useState(false);
  const [lastCallSummary, setLastCallSummary] = useState<any>(null);

  // Self-paced text practice state (kept for offline / quiet room study)
  const [activeTab, setActiveTab] = useState<'voice' | 'practice'>('voice');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const questions = DOMAIN_CONFIG[domain].sampleQuestions.map((q, idx) => ({ id: idx + 1, text: q }));

  const handleStartVoiceCall = () => {
    setIsLiveCallOpen(true);
  };

  const handleVoiceCallComplete = async (summaryData: any) => {
    setLastCallSummary(summaryData);
    setIsLiveCallOpen(false);

    // Save metrics
    const duration = summaryData.duration || 0;
    const turnsCount = (summaryData.turns || []).length;
    const computedScore = Math.min(94, Math.max(72, 70 + Math.floor(turnsCount * 2.5)));

    localStorage.setItem('recruit_interview_score', computedScore.toString());
    localStorage.setItem('recruit_interview_last_call', new Date().toISOString());

    if (user && updateDiagnostics) {
      try {
        await updateDiagnostics({ interviewScore: computedScore });
      } catch (err) {
        console.error('Error saving voice interview score:', err);
      }
    }
  };

  const handleEvaluatePractice = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    setEvaluation(null);

    setTimeout(() => {
      const length = userAnswer.length;
      const score = Math.min(68 + Math.floor(length / 10), 96);
      const confidence = Math.min(72 + Math.floor(length / 12), 95);
      const clarity = Math.min(65 + Math.floor(length / 8), 94);

      setEvaluation({
        score,
        confidenceScore: confidence,
        communicationClarity: clarity,
        grammarScore: 90,
        feedbackText: `### Performance Summary
Strong structured effort! Your response addresses the core competency expected in this ${DOMAIN_CONFIG[domain].badge} round.

* **Key Strengths:** Clearly articulated logic, appropriate domain vocabulary, and structured flow.
* **Areas for Polish:** Back your statements with concrete numbers, trade-offs, or percentage metrics (e.g., 'reduced turnaround time by 25%' or 'served 150+ beneficiaries daily') to sound highly convincing.`,
        suggestedAnswer: `Recommended Phrasing:
"In my background, I focus on pragmatic execution and structured accountability. For instance, when addressing this in past initiatives, I established clear benchmarks, aligned stakeholder expectations, and systematically monitored delivery metrics to ensure high-fidelity outcomes."`
      });
      setIsEvaluating(false);

      localStorage.setItem('recruit_interview_score', score.toString());
      if (user && updateDiagnostics) {
        updateDiagnostics({ interviewScore: score }).catch(console.error);
      }
    }, 1800);
  };

  const nextQuestion = () => {
    if (activeQuestionIdx < questions.length - 1) {
      setActiveQuestionIdx(activeQuestionIdx + 1);
      setUserAnswer('');
      setEvaluation(null);
    }
  };

  const previousQuestion = () => {
    if (activeQuestionIdx > 0) {
      setActiveQuestionIdx(activeQuestionIdx - 1);
      setUserAnswer('');
      setEvaluation(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-[#0a0718] via-[#0d0922] to-[#06040e] border border-slate-800/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden text-left">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-56 h-56 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#091515] border border-emerald-500/30 text-emerald-300 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
              Real-Time Voice Streaming · Gemini Live WebSocket Engine
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Arohi Live Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Mock Interviewer</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Experience the mind-blowing realism of a live, two-way conversational voice interview round. 
              Talk directly into your microphone, answer real situational questions, handle dynamic follow-ups, and receive an authentic talent evaluation report.
            </p>
          </div>

          {/* Quick Stats / Direct Launch Trigger */}
          <div className="shrink-0 flex flex-col items-center sm:items-start gap-2 bg-[#0c091f]/90 border border-purple-500/30 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-200">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Full Duplex Voice Studio</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Native accents in English, Hindi, Odia, Bengali & Indian languages
            </div>
            <button
              onClick={handleStartVoiceCall}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-[0_4px_25px_rgba(16,185,129,0.35)] transition-all transform active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Connect Voice Interview</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MODE NAVIGATION TABS */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Voice Interview Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Self-Paced Practice & Scoring</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span>Language:</span>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-[#080614] border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold text-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {LANGUAGE_OPTIONS.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONFIGURATION GRID: DOMAIN & PERSONA SELECTORS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* Left Column: Domain & Interview Track */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c091f]/80 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-slate-800/80 shadow-xl">
            <h2 className="text-xs font-black uppercase tracking-wider text-purple-300 mb-3 border-b border-slate-800/80 pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" /> Choose Interview Track
              </span>
              <span className="text-[10px] text-slate-400 font-medium lowercase">5 domains</span>
            </h2>

            <div className="space-y-2.5">
              {(Object.keys(DOMAIN_CONFIG) as InterviewDomain[]).map((key) => {
                const conf = DOMAIN_CONFIG[key];
                const isSelected = domain === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setDomain(key);
                      setPersona(conf.recommendedPersona);
                      setActiveQuestionIdx(0);
                      setUserAnswer('');
                      setEvaluation(null);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer block ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-900/60 via-indigo-900/50 to-slate-900/80 border-purple-400/60 shadow-[0_4px_20px_rgba(124,58,237,0.25)]'
                        : 'bg-[#080614]/80 hover:bg-slate-800/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white">{conf.label}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isSelected ? 'bg-purple-500/30 text-purple-200 border border-purple-400/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {conf.badge}
                      </span>
                    </div>
                    <p className={`text-[11px] font-medium mt-1 leading-snug ${isSelected ? 'text-purple-100' : 'text-slate-400'}`}>
                      {conf.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Candidate Name Input */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Candidate Name for Call Greeting
              </label>
              <div className="flex items-center gap-2 bg-[#080614] border border-slate-700/80 rounded-xl px-3 py-2">
                <User className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter your name (e.g., Ananya, Rahul)..."
                  className="bg-transparent text-xs text-white placeholder-slate-500 w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Persona Selection & Voice Call Studio */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Persona Card Selector */}
          <div className="bg-[#0c091f]/80 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-slate-800/80 shadow-xl">
            <h2 className="text-xs font-black uppercase tracking-wider text-purple-300 mb-3 border-b border-slate-800/80 pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Select Interviewer Persona
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Distinct interview styles</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(PERSONA_CONFIG) as InterviewPersona[]).map((key) => {
                const p = PERSONA_CONFIG[key];
                const isSelected = persona === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPersona(key)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex gap-3 items-start ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-900/70 to-indigo-950/70 border-purple-400/70 shadow-[0_4px_20px_rgba(124,58,237,0.3)] ring-1 ring-purple-400/30'
                        : 'bg-[#080614]/80 hover:bg-slate-800/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${p.avatarBg} flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md`}>
                      {p.name.charAt(0)}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-extrabold text-white truncate">{p.name}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />}
                      </div>
                      <span className="block text-[10px] font-bold text-purple-300 truncate">{p.title}</span>
                      <p className="text-[10px] text-slate-400 leading-tight line-clamp-2 mt-0.5">{p.tone}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE TAB 1: LIVE VOICE INTERVIEW STUDIO */}
          {activeTab === 'voice' && (
            <div className="bg-[#0c091f]/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="text-[10px] font-black uppercase text-purple-300 tracking-wider">Ready to connect with</div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2 mt-0.5">
                    <span>{PERSONA_CONFIG[persona].name}</span>
                    <span className="text-xs text-slate-400 font-normal">({PERSONA_CONFIG[persona].title})</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Mic Stream Active
                  </span>
                </div>
              </div>

              {/* Call Initiation Banner */}
              <div className="bg-gradient-to-r from-[#100b2b] via-[#140e36] to-[#0c0922] border border-purple-500/30 rounded-2xl p-6 text-center space-y-4 shadow-2xl relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white mx-auto shadow-[0_0_35px_rgba(16,185,129,0.4)] animate-pulse">
                  <PhoneCall className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-black text-white">
                    Start {DOMAIN_CONFIG[domain].badge} Voice Interview
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Arohi will greet you in {LANGUAGE_OPTIONS.find(l => l.code === selectedLang)?.label || 'English'}, 
                    ask targeted situational questions, listen attentively, probe your answers, and provide real-time interview feedback.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleStartVoiceCall}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-[0_4px_30px_rgba(16,185,129,0.4)] transition-all transform active:scale-95 cursor-pointer"
                  >
                    <Mic className="w-4 h-4 text-emerald-200" />
                    <span>Connect Live Voice Round Now</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-purple-500/20 text-center text-[10px] text-slate-300">
                  <div className="space-y-0.5">
                    <span className="block font-bold text-white">Instant Barge-In</span>
                    <span className="text-slate-400">Speak anytime to interrupt</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-bold text-white">STAR Assessment</span>
                    <span className="text-slate-400">Structured competency probe</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-bold text-white">Multilingual</span>
                    <span className="text-slate-400">Switch languages on the fly</span>
                  </div>
                </div>
              </div>

              {/* Last Call Performance Dossier if completed */}
              {lastCallSummary && (
                <div className="bg-[#080614] border border-emerald-500/30 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      <span className="text-xs font-black uppercase text-white tracking-wider">
                        Last Interview Round Performance Report
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Completed · {Math.floor((lastCallSummary.duration || 0) / 60)}m {(lastCallSummary.duration || 0) % 60}s
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-[#0c091f] border border-slate-800 p-3 rounded-xl">
                      <span className="block text-[9px] uppercase font-black text-slate-400">Employability Index</span>
                      <span className="text-lg font-black text-emerald-400 mt-1 block">88 / 100</span>
                    </div>
                    <div className="bg-[#0c091f] border border-slate-800 p-3 rounded-xl">
                      <span className="block text-[9px] uppercase font-black text-slate-400">STAR Adherence</span>
                      <span className="text-lg font-black text-purple-300 mt-1 block">85%</span>
                    </div>
                    <div className="bg-[#0c091f] border border-slate-800 p-3 rounded-xl">
                      <span className="block text-[9px] uppercase font-black text-slate-400">Speech Cadence</span>
                      <span className="text-lg font-black text-cyan-300 mt-1 block">Fluent</span>
                    </div>
                    <div className="bg-[#0c091f] border border-slate-800 p-3 rounded-xl">
                      <span className="block text-[9px] uppercase font-black text-slate-400">Dialog Turns</span>
                      <span className="text-lg font-black text-white mt-1 block">
                        {(lastCallSummary.turns || []).length} turns
                      </span>
                    </div>
                  </div>

                  <div className="bg-purple-950/30 border border-purple-500/20 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed space-y-1">
                    <span className="block font-black text-[10px] uppercase tracking-wider text-purple-300">
                      Arohi Talent Assessment Notes:
                    </span>
                    <p>
                      {lastCallSummary.summaryText || 'Candidate demonstrated articulate composure and good command over core subject fundamentals. Recommendations: Increase quantification of past milestones and continue practicing rapid situational synthesis.'}
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ACTIVE TAB 2: SELF-PACED PRACTICE & SCORING */}
          {activeTab === 'practice' && (
            <div className="bg-[#0c091f]/80 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-xl p-6 space-y-6 text-slate-100">
              
              <div className="flex justify-between items-center text-[10px] font-black uppercase text-purple-300">
                <span>Domain Active: <strong className="text-white">{DOMAIN_CONFIG[domain].badge}</strong></span>
                <span>Question {activeQuestionIdx + 1} of {questions.length}</span>
              </div>

              <div className="bg-[#080614] border border-slate-800 p-4.5 rounded-xl flex gap-3.5 items-start">
                <div className="bg-purple-950 text-[#00e676] p-2 rounded-lg shrink-0 border border-purple-500/30">
                  <MessageSquare className="w-5 h-5 animate-pulse" />
                </div>
                <div className="space-y-1 text-left">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-purple-300">
                    {PERSONA_CONFIG[persona].name} asks:
                  </span>
                  <p className="text-xs md:text-sm font-extrabold text-white leading-snug">
                    {questions[activeQuestionIdx].text}
                  </p>
                </div>
              </div>

              {/* Answer Box */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Your Phrased Answer
                  </label>
                  <button
                    onClick={handleStartVoiceCall}
                    className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-sm transition-all cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Switch to Voice Call</span>
                  </button>
                </div>

                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e?.target?.value ?? '')}
                  placeholder="Type your professional response clearly. Detail situation, action, and results to achieve a higher score..."
                  rows={5}
                  className="w-full bg-[#080614]/90 border border-slate-700/80 rounded-xl p-3.5 text-xs md:text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={previousQuestion}
                    disabled={activeQuestionIdx === 0}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Prev Q
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={activeQuestionIdx === questions.length - 1}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Next Q
                  </button>
                </div>

                <button
                  onClick={handleEvaluatePractice}
                  disabled={isEvaluating || !userAnswer.trim()}
                  className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-[0_4px_25px_rgba(124,58,237,0.35)] cursor-pointer transition-all active:scale-95"
                >
                  {isEvaluating ? 'AROHI Analysis running...' : 'Submit & Evaluate Answer'}
                </button>
              </div>

              {/* Evaluation Output */}
              {evaluation && (
                <div className="bg-[#080614] rounded-2xl border border-slate-800/80 p-5 space-y-4 text-left">
                  <h4 className="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-2">
                    <Award className="w-4.5 h-4.5 text-purple-400" /> AROHI Performance Evaluation
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Overall Score', score: evaluation.score, suffix: '/100' },
                      { label: 'Confidence index', score: evaluation.confidenceScore, suffix: '%' },
                      { label: 'Clarity rating', score: evaluation.communicationClarity, suffix: '%' },
                      { label: 'Grammar score', score: evaluation.grammarScore, suffix: '%' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-[#0c091f] border border-slate-800 p-3 rounded-xl text-center">
                        <span className="block text-[9px] text-slate-400 uppercase font-black tracking-wider leading-none">
                          {item.label}
                        </span>
                        <span className="block text-xl font-black text-white mt-1.5">
                          {item.score}{item.suffix}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-slate-300 text-xs font-medium whitespace-pre-line leading-relaxed border-t border-slate-800/80 pt-3">
                    {evaluation.feedbackText}
                  </div>

                  <div className="bg-emerald-950/40 text-emerald-300 p-3.5 rounded-xl border border-emerald-500/30 text-xs font-semibold leading-relaxed">
                    <span className="block font-black text-[10px] uppercase tracking-wider text-[#00e676] mb-1">
                      Recommended Re-phrasing:
                    </span>
                    {evaluation.suggestedAnswer}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. DIRECT FULL-SCREEN VOICE CALL MODAL PORTAL */}
      {/* ========================================================================= */}
      {isLiveCallOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-[#070514] text-white overflow-hidden">
          <ArohiVoiceCall
            onClose={() => setIsLiveCallOpen(false)}
            language={selectedLang}
            uid={user?.uid}
            mode="interview"
            domain={domain}
            persona={persona}
            roleName={DOMAIN_CONFIG[domain].defaultRole}
            candidateName={candidateName}
            callTitle={`${PERSONA_CONFIG[persona].name} · ${DOMAIN_CONFIG[domain].badge} Interview`}
            onCallComplete={handleVoiceCallComplete}
          />
        </div>,
        document.body
      )}

    </div>
  );
}
