import { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Mic, 
  PhoneCall, 
  BookOpen, 
  Layers, 
  Award, 
  Play, 
  Clock, 
  Languages, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  Download, 
  Smartphone,
  ExternalLink,
  BrainCircuit,
  Atom,
  Binary,
  Compass
} from 'lucide-react';
import SmartBoardCanvas, { SmartBoardSlide } from './SmartBoardCanvas';
import ArohiVoiceCall from '../ArohiVoiceCall';
import MockTestsHub from '../mocktests/MockTestsHub';
import { useAuth } from '../../context/AuthContext';

interface TutorPersona {
  id: string;
  name: string;
  title: string;
  specialty: string;
  languages: string[];
  avatarBg: string;
  accentColor: string;
  voice: string;
  curriculum: string[];
  bio: string;
}

const TUTOR_PERSONAS: TutorPersona[] = [
  {
    id: 'ananya',
    name: 'Prof. Ananya',
    title: 'Senior Professor of STEM & Computational Science',
    specialty: 'Mathematics, Physics, Engineering & Coding Algorithms',
    languages: ['English', 'Hindi'],
    avatarBg: 'from-cyan-600 to-blue-700',
    accentColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
    voice: 'Zypher',
    curriculum: ['Calculus & Linear Algebra', 'Electromagnetism & Circuits', 'Data Structures & Algorithms', 'JEE Advanced Physics'],
    bio: 'Patient, first-principles academician who breaks rigorous equations down into intuitive physical visualizations on the smart board.'
  },
  {
    id: 'satyajit',
    name: 'Master Satyajit',
    title: 'State Board & Vernacular Pedagogy Mentor',
    specialty: 'Odia Language, General Science & State Competitive Exams',
    languages: ['Odia (ଓଡ଼ିଆ)', 'English', 'Hindi'],
    avatarBg: 'from-amber-600 to-emerald-700',
    accentColor: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
    voice: 'Zypher',
    curriculum: ['BSE Odisha High School Science', 'CHSE +2 Physics & Chemistry', 'OSSC / OPSC Prelims', 'Odia Sahitya & Grammar'],
    bio: 'Renowned vernacular teacher who explains complex concepts with relatable Odia metaphors, local state examples, and warm encouragement.'
  },
  {
    id: 'radhika',
    name: 'Dr. Radhika',
    title: 'Medical Sciences & NEET Biology Faculty',
    specialty: 'Human Physiology, Genetics, Botany & Clinical Correlations',
    languages: ['English', 'Hindi', 'Bengali'],
    avatarBg: 'from-emerald-600 to-teal-700',
    accentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
    voice: 'Zypher',
    curriculum: ['Human Endocrine & Nervous Systems', 'Mendelian & Molecular Genetics', 'Cell Biology & Biomolecules', 'NEET Top Ranker Strategies'],
    bio: 'Doctor and medical educator who sketches detailed biological pathways, mnemonic charts, and past 15-year NEET question patterns.'
  },
  {
    id: 'verma',
    name: 'Acharya Verma',
    title: 'UPSC & General Studies Historian & Jurist',
    specialty: 'Indian Polity, Constitution, Modern History & Economy',
    languages: ['Hindi', 'English'],
    avatarBg: 'from-rose-600 to-purple-700',
    accentColor: 'text-rose-400 border-rose-500/30 bg-rose-950/40',
    voice: 'Zypher',
    curriculum: ['Indian Constitution & Articles', 'Freedom Struggle & Modern History', 'Macroeconomics & Budget Analysis', 'UPSC Mains Answer Writing'],
    bio: 'Engaging orator and civil services mentor who builds clear timeline flowcharts and constitutional mind-maps on the digital whiteboard.'
  }
];

const CURATED_LESSONS: Record<string, SmartBoardSlide[]> = {
  ananya: [
    {
      id: 'calc-1',
      topic: 'Differential Calculus & Tangent Lines',
      title: 'Derivatives as Instantaneous Rates of Change',
      latexFormula: "f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}",
      diagramType: 'cartesian',
      bullets: [
        'A secant line measures the average rate of change between two distinct points.',
        'As Δx approaches zero, the secant line collapses into the tangent line at x.',
        'The slope of this tangent line represents the instantaneous velocity / derivative.',
        'Critical points occur where dy/dx = 0 or the derivative does not exist.'
      ],
      keyInsight: 'In competitive exams (JEE/GATE), always inspect boundary conditions and non-differentiable sharp cusps before applying Fermat theorem.',
      practiceQuestion: {
        question: 'If f(x) = x³ - 3x + 2, what are the stationary critical points where the tangent line is horizontal?',
        options: ['x = ±1', 'x = 0 and 2', 'x = ±3', 'x = 1 only'],
        correctIndex: 0,
        explanation: "f'(x) = 3x² - 3 = 3(x² - 1) = 0. Solving x² = 1 yields x = +1 and x = -1."
      }
    },
    {
      id: 'circ-1',
      topic: 'Current Electricity & Network Theorems',
      title: "Ohm's Law & Kirchhoff's Current Law (KCL)",
      latexFormula: '\\sum I_{\\text{in}} = \\sum I_{\\text{out}} \\quad \\text{and} \\quad V = I \\cdot R',
      diagramType: 'circuit',
      bullets: [
        'Charge conservation guarantees that electric charge cannot accumulate at an electrical node.',
        'Total current entering any junction equals total current exiting that junction.',
        'Voltage drops across passive resistors follow Ohm’s relation V = I·R.',
        'Ideal batteries maintain electromotive force regardless of connected branch impedance.'
      ],
      keyInsight: 'Always establish a reference ground node (0V) first. Node analysis reduces an n-loop circuit to simple linear simultaneous equations.',
      practiceQuestion: {
        question: 'At a circuit junction, three wires bring 2A, 3A, and 4A into the node. If two wires leave the node and one carries 5A, how much current does the other wire carry?',
        options: ['4 A', '9 A', '2 A', '14 A'],
        correctIndex: 0,
        explanation: 'Total in = 2 + 3 + 4 = 9A. Total out must be 9A. Since one wire carries 5A, the remaining wire must carry 9 - 5 = 4A.'
      }
    }
  ],
  radhika: [
    {
      id: 'bio-1',
      topic: 'Molecular Basis of Inheritance',
      title: 'DNA Double Helix Architecture & Replication',
      latexFormula: '\\text{Purines} (A + G) = \\text{Pyrimidines} (T + C) \\quad [\\text{Chargaff Rule}]',
      diagramType: 'dna',
      bullets: [
        'Anti-parallel double helical chains with a sugar-phosphate backbone on the exterior.',
        'Adenine pairs exclusively with Thymine via 2 hydrogen bonds (A = T).',
        'Guanine pairs exclusively with Cytosine via 3 hydrogen bonds (G ≡ C).',
        'Pitch of the helix is 3.4 nm with roughly 10 base pairs per helical turn.'
      ],
      keyInsight: 'Because G≡C pairs have 3 hydrogen bonds compared to 2 in A=T, DNA fragments with high GC-content require a significantly higher melting temperature (Tm) in PCR.',
      practiceQuestion: {
        question: 'If a double-stranded DNA segment contains 20% Adenine, what percentage of Cytosine does it contain according to Chargaff’s rule?',
        options: ['30%', '20%', '40%', '60%'],
        correctIndex: 0,
        explanation: 'If A = 20%, then T = 20% (Total A+T = 40%). The remaining 60% is shared equally between G and C. Thus, Cytosine = 60% / 2 = 30%.'
      }
    },
    {
      id: 'bio-2',
      topic: 'Cell Biology & Organelles',
      title: 'Eukaryotic Cell Compartmentalization',
      latexFormula: '\\text{Mitochondria: ATP Generation via Oxidative Phosphorylation}',
      diagramType: 'cell',
      bullets: [
        'The nucleus houses genomic DNA packaged into chromatin fibers.',
        'Mitochondria feature their own circular DNA and 70S ribosomes (endosymbiosis).',
        'Endoplasmic reticulum coordinates protein folding and lipid biogenesis.',
        'Golgi apparatus modifies, sorts, and packages glycoproteins for secretion.'
      ],
      keyInsight: 'NEET questions frequently target the semi-autonomous nature of mitochondria and chloroplasts. Remember they divide via binary fission-like processes.',
      practiceQuestion: {
        question: 'Which of the following cellular organelles possesses its own circular DNA genome and 70S ribosomes?',
        options: ['Mitochondria', 'Golgi Apparatus', 'Lysosome', 'Endoplasmic Reticulum'],
        correctIndex: 0,
        explanation: 'Mitochondria (and chloroplasts in plants) have their own circular double-stranded DNA and 70S ribosomes, reflecting their endosymbiotic bacterial origin.'
      }
    }
  ],
  satyajit: [
    {
      id: 'odia-1',
      topic: 'High School Physical Science & Mechanics',
      title: 'ଗତିର ନିୟମ ଓ ବଳ (Newtonian Mechanics in Odia)',
      latexFormula: 'F = m \\cdot a \\quad \\text{ଏବଂ} \\quad p = m \\cdot v',
      diagramType: 'circuit',
      bullets: [
        'ପ୍ରଥମ ନିୟମ (ଜଡ଼ତ୍ଵ ନିୟମ): ବାହ୍ୟ ବଳ ବିନା ବସ୍ତୁ ନିଜ ସ୍ଥିତି ବଜାୟ ରଖେ।',
        'ଦ୍ଵିତୀୟ ନିୟମ: ସଂବେଗ ପରିବର୍ତ୍ତନ ହାର ପ୍ରଯୁକ୍ତ ବଳ ସହିତ ସମାନୁପାତୀ (F = ma)।',
        'ତୃତୀୟ ନିୟମ: ପ୍ରତ୍ୟେକ କ୍ରିୟାର ସମାନ ଏବଂ ବିପରୀତ ପ୍ରତିକ୍ରିୟା ଥାଏ।',
        'ସଂବେଗ ସଂରକ୍ଷଣ ନିୟମ ରକେଟ ପ୍ରୋପଲସନରେ କାର୍ଯ୍ୟ କରେ।'
      ],
      keyInsight: 'BSE Odisha ପରୀକ୍ଷାରେ ଏକକ (Units) ମନେରଖନ୍ତୁ: ବଳର SI ଏକକ ନିଉଟନ (Newton) ଏବଂ CGS ଏକକ ଡାଇନ (Dyne)। 1 N = 10⁵ Dyne.',
      practiceQuestion: {
        question: 'ଏକ 5 kg ବସ୍ତୁ ଉପରେ 20 N ବଳ ପ୍ରୟୋଗ କଲେ ତାହାର ତ୍ୱରଣ (Acceleration) କେତେ ହେବ?',
        options: ['4 m/s²', '100 m/s²', '15 m/s²', '0.25 m/s²'],
        correctIndex: 0,
        explanation: 'F = m × a ⇒ a = F / m = 20 / 5 = 4 m/s²।'
      }
    }
  ],
  verma: [
    {
      id: 'polity-1',
      topic: 'Indian Constitution & Governance',
      title: 'Preamble, Fundamental Rights & Basic Structure',
      latexFormula: '\\text{Kesavananda Bharati (1973): Parliament cannot alter Basic Structure}',
      diagramType: 'flowchart',
      bullets: [
        'Part III of the Constitution guarantees Fundamental Rights (Articles 12 to 35).',
        'Article 21 guarantees Right to Life and Personal Liberty with expanding judicial scope.',
        'Article 32 allows citizens to move Supreme Court for enforcement of rights (Writs).',
        'Dr. B.R. Ambedkar hailed Article 32 as the "Heart and Soul of the Constitution".'
      ],
      keyInsight: 'In UPSC Prelims, differentiate carefully between rights available to citizens only (Articles 15, 16, 19, 29, 30) versus rights available to all persons (Articles 14, 20, 21, 22, 23, 24, 25, 26, 27, 28).',
      practiceQuestion: {
        question: 'Which Article of the Indian Constitution is termed by Dr. B.R. Ambedkar as the "Heart and Soul of the Constitution"?',
        options: ['Article 32', 'Article 21', 'Article 19', 'Article 14'],
        correctIndex: 0,
        explanation: 'Article 32 guarantees the Right to Constitutional Remedies via Writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).'
      }
    }
  ]
};

interface ArohiAiTutorProps {
  onOpenAuth?: () => void;
  onNavigateTab?: (tab: string) => void;
  isDarkMode?: boolean;
}

export default function ArohiAiTutor({
  onOpenAuth,
  onNavigateTab,
  isDarkMode = true
}: ArohiAiTutorProps) {
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'classroom' | 'smartboard' | 'exams'>('classroom');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('ananya');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isVoiceCallActive, setIsVoiceCallActive] = useState<boolean>(false);
  const [customTopic, setCustomTopic] = useState<string>('');

  const activePersona = TUTOR_PERSONAS.find(p => p.id === selectedPersonaId) || TUTOR_PERSONAS[0];
  const personaLessons = CURATED_LESSONS[activePersona.id] || CURATED_LESSONS.ananya;
  const currentSlide = personaLessons[activeSlideIndex] || personaLessons[0];

  const handleStartClassroomCall = () => {
    setIsVoiceCallActive(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-2 sm:px-4 pb-16">
      
      {/* 1. HERO HEADER WITH 4-PILLAR SUBTAB SWITCHER */}
      <div className="bg-gradient-to-br from-[#070514] via-[#0b0820] to-[#04020a] border border-slate-800/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden text-left">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#091515] border border-emerald-500/30 text-emerald-300 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
            AROHI AI TUTOR · LIVE CLASSROOM &amp; SMART BOARD
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Arohi AI Tutor &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Smart Board Arena</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed mt-2">
            Attend live interactive lectures with specialist faculty personas. Interrupt anytime via voice to clear doubts while mathematical formulas, diagrams, and notes render in real-time on your 4K Smart Board.
          </p>

          {/* Navigation Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 mt-5 p-1.5 bg-[#080514]/90 border border-slate-800/90 rounded-2xl backdrop-blur-xl shadow-lg w-fit">
            <button
              onClick={() => setActiveSubTab('classroom')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'classroom'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Mic className="w-4 h-4 text-emerald-300" />
              <span>Live Voice Classroom</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-950/80 border border-emerald-400/40 text-emerald-300">
                Voice AI
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('smartboard')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'smartboard'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-300" />
              <span>Interactive Smart Board</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-cyan-950/80 border border-cyan-400/40 text-cyan-300">
                4K Canvas
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('exams')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'exams'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-purple-300" />
              <span>Arohi Exams™ CBT Arena</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-purple-950/80 border border-purple-400/40 text-purple-300">
                Mock Tests
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SUBTAB: CLASSROOM & SMART BOARD INTEGRATED ARENA */}
      {(activeSubTab === 'classroom' || activeSubTab === 'smartboard') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
          
          {/* Left Column: Tutor Selection & Classroom Controls (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Faculty Selector Card */}
            <div className="bg-[#0b081e]/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  Select Faculty Specialist
                </h3>
                <span className="text-[10px] text-slate-400 font-bold">4 Mentors</span>
              </div>

              <div className="space-y-2.5">
                {TUTOR_PERSONAS.map((persona) => {
                  const isSelected = selectedPersonaId === persona.id;
                  return (
                    <button
                      key={persona.id}
                      onClick={() => {
                        setSelectedPersonaId(persona.id);
                        setActiveSlideIndex(0);
                      }}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-white/10 border-emerald-500 shadow-md shadow-emerald-950/50'
                          : 'bg-white/[0.02] border-slate-800/80 hover:bg-white/[0.05] hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${persona.avatarBg} flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md`}>
                        {persona.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-white truncate">
                            {persona.name}
                          </h4>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          )}
                        </div>
                        <p className="text-[10px] text-slate-300 font-medium truncate mt-0.5">
                          {persona.title}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {persona.languages.map((lang, lIdx) => (
                            <span key={lIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-slate-400 border border-white/5 font-mono">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bio & Specialty Summary */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <span className="text-[9px] font-black uppercase text-slate-400 font-mono tracking-wider block">
                  Active Faculty Dossier:
                </span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {activePersona.bio}
                </p>
              </div>

              {/* Language Choice for the Class */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 font-mono tracking-wider flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-cyan-400" />
                  Spoken Medium of Instruction
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'Hindi (हिंदी)' },
                    { code: 'or', label: 'Odia (ଓଡ଼ିଆ)' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedLanguage === lang.code
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-white/5 text-slate-300 hover:text-white border border-white/5'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Topic Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 font-mono tracking-wider">
                  Target Chapter or Doubt
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g. Wave Optics, Integration by Parts..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Action Button: Start Class */}
              <button
                onClick={handleStartClassroomCall}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-emerald-200" />
                <span>Enter Live Class with {activePersona.name}</span>
              </button>

            </div>

            {/* Smart Board Slide Selector List */}
            <div className="bg-[#0b081e]/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono flex items-center justify-between">
                <span>Lecture Board Slides ({personaLessons.length})</span>
                <span className="text-[10px] text-cyan-400 font-mono">Interactive</span>
              </h4>
              <div className="space-y-2">
                {personaLessons.map((slide, sIdx) => {
                  const isActive = activeSlideIndex === sIdx;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlideIndex(sIdx)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 font-bold'
                          : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="text-[10px] text-slate-400 block font-mono">Slide {sIdx + 1}: {slide.topic}</span>
                        <span className="truncate block font-semibold">{slide.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 shrink-0 text-slate-500" />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: 4K Smart Board Canvas (8 cols on lg) */}
          <div className="lg:col-span-8 h-[650px] sm:h-[720px]">
            <SmartBoardCanvas
              activeSlide={currentSlide}
              tutorName={activePersona.name}
              tutorTitle={activePersona.title}
              subject={activePersona.specialty}
              isSpeaking={isVoiceCallActive}
              onAskTutorDoubt={(doubt) => {
                setCustomTopic(doubt);
                setIsVoiceCallActive(true);
              }}
            />
          </div>

        </div>
      )}

      {/* 3. SUBTAB: AROHI EXAMS CBT ARENA DIRECT INTEGRATION */}
      {activeSubTab === 'exams' && (
        <div className="space-y-6">
          <div className="bg-[#0b081e] border border-purple-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-left shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-400 font-mono tracking-widest block">
                AROHI EXAMS™ · ALL-INDIA COMPUTER-BASED TEST (CBT) PLATFORM
              </span>
              <h2 className="text-base sm:text-lg font-black text-white">
                Transition from Smart Board Lectures to Timed Exam Series
              </h2>
              <p className="text-xs text-slate-300 font-medium max-w-3xl leading-relaxed">
                Validate what you learned with full-length mock tests for UPSC, SSC, Banking, NEET, JEE, OPSC, and CBSE/ICSE. Instant scorecards, national percentiles, and AI voice mistake reviews.
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('classroom')}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>Back to Smart Board</span>
            </button>
          </div>

          {/* Render MockTestsHub */}
          <MockTestsHub
            isDarkMode={isDarkMode}
            onOpenAuth={onOpenAuth}
            onNavigateTab={onNavigateTab}
          />
        </div>
      )}

      {/* 4. LIVE ACOUSTIC VOICE CALL MODAL FOR CLASSROOM */}
      {isVoiceCallActive && (
        <ArohiVoiceCall
          onClose={() => setIsVoiceCallActive(false)}
          mode="tutor"
          persona={activePersona.id}
          subject={activePersona.specialty}
          topic={customTopic || currentSlide.title}
          candidateName={user?.displayName || 'Student'}
          language={selectedLanguage}
          callTitle={`${activePersona.name} · ${activePersona.specialty}`}
          onNavigateTab={onNavigateTab}
        />
      )}

    </div>
  );
}
