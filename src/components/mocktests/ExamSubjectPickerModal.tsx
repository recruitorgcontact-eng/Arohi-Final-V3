import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Check, Sparkles, BookOpen, Clock, Award, ShieldCheck, 
  ChevronRight, ArrowRight, Layers, HelpCircle, Flame, 
  Building2, GraduationCap, Globe, CheckCircle2, RotateCcw
} from 'lucide-react';
import { MockTest, ExamSection, ExamQuestion, QuestionOption } from '../../types/examTypes';
import { ensureTestComplete } from '../../utils/examQuestionExpander';

export interface ExamSubjectOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  defaultQuestions: number;
  durationMinutes: number;
  positiveMarks: number;
  negativeMarks: number;
  subjectKeywords: string[];
}

interface ExamSubjectPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLaunch: (preparedTest: MockTest) => void;
  initialCategory?: 'all' | 'school' | 'competitive' | 'state';
  initialTest?: MockTest | null;
  tests: MockTest[];
  isDarkMode?: boolean;
  userState?: string;
}

// Preset subjects per exam category / family
const EXAM_FAMILY_SUBJECTS: Record<string, ExamSubjectOption[]> = {
  // 1. STATE CIVIL SERVICES (OPSC OAS, BPSC, UPPSC, WBCS, RAS, MPSC)
  state_pcs: [
    {
      id: 'full_mock',
      name: 'Full Combined Paper (GS + CSAT)',
      icon: '🎯',
      description: 'Standard multi-section pattern with General Studies and Aptitude',
      defaultQuestions: 100,
      durationMinutes: 120,
      positiveMarks: 2.0,
      negativeMarks: 0.66,
      subjectKeywords: ['all', 'general studies', 'csat', 'state']
    },
    {
      id: 'gs_paper_1',
      name: 'General Studies (Paper 1)',
      icon: '📖',
      description: 'Indian Polity, History, Geography, Economy, Ecology & Current Affairs',
      defaultQuestions: 50,
      durationMinutes: 60,
      positiveMarks: 2.0,
      negativeMarks: 0.66,
      subjectKeywords: ['general studies', 'polity', 'history', 'geography', 'economy']
    },
    {
      id: 'csat_paper_2',
      name: 'CSAT & Mental Ability (Paper 2)',
      icon: '🧠',
      description: 'Logical Reasoning, Quantitative Aptitude, Data Interpretation & English',
      defaultQuestions: 50,
      durationMinutes: 60,
      positiveMarks: 2.0,
      negativeMarks: 0.66,
      subjectKeywords: ['csat', 'reasoning', 'aptitude', 'quant', 'comprehension']
    },
    {
      id: 'state_special_gk',
      name: 'State Special GK & Heritage',
      icon: '🏛️',
      description: 'State History, Geography, Demographics, Culture, Art & State Schemes',
      defaultQuestions: 40,
      durationMinutes: 45,
      positiveMarks: 2.0,
      negativeMarks: 0.5,
      subjectKeywords: ['odisha', 'state gk', 'heritage', 'culture', 'state']
    },
    {
      id: 'language_paper',
      name: 'Language & Comprehension',
      icon: '✍️',
      description: 'State Regional Language (Odia/Hindi/Bengali) & General English Grammar',
      defaultQuestions: 40,
      durationMinutes: 45,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['english', 'odia', 'hindi', 'language', 'grammar']
    }
  ],

  // 2. STATE POLICE & DEFENSE (Police SI, Constable, Forest Guard, Jail Warder)
  state_police: [
    {
      id: 'full_mock',
      name: 'Full Police Recruitment Paper',
      icon: '🎯',
      description: 'Combined General Awareness, Reasoning, Math & Language',
      defaultQuestions: 100,
      durationMinutes: 120,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['all', 'police', 'general', 'reasoning']
    },
    {
      id: 'general_awareness',
      name: 'General Awareness & Current Affairs',
      icon: '📰',
      description: 'Indian Polity, History, Science, Sports, Awards & National Events',
      defaultQuestions: 40,
      durationMinutes: 40,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['general awareness', 'gk', 'current affairs']
    },
    {
      id: 'reasoning_quant',
      name: 'Reasoning & Numerical Aptitude',
      icon: '🔢',
      description: 'Arithmetic, Basic Algebra, Series, Coding-Decoding, Blood Relations',
      defaultQuestions: 40,
      durationMinutes: 45,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['quant', 'math', 'reasoning', 'numerical']
    },
    {
      id: 'law_police_aptitude',
      name: 'Law, IPC/BNS & Police Aptitude',
      icon: '👮',
      description: 'Constitution, Basic Law, Human Rights, Crime Investigation Aptitude',
      defaultQuestions: 30,
      durationMinutes: 30,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['police', 'law', 'aptitude', 'investigation']
    },
    {
      id: 'language_paper',
      name: 'English & Regional Language',
      icon: '✍️',
      description: 'Vocabulary, Grammar, Sentence Correction & Reading Passages',
      defaultQuestions: 30,
      durationMinutes: 30,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['english', 'odia', 'hindi', 'language']
    }
  ],

  // 2B. STATE GROUP C & D / SSC (Revenue Inspector, Patwari, Amin, PEO, Jr Assistant)
  state_group_c: [
    {
      id: 'full_mock',
      name: 'Full Group C Combined Paper',
      icon: '🎯',
      description: 'General Knowledge, Mathematics, Reasoning, Basic Computer & Language',
      defaultQuestions: 100,
      durationMinutes: 120,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['all', 'group c', 'osssc', 'upsssc', 'bssc']
    },
    {
      id: 'general_awareness',
      name: 'General Knowledge & State Affairs',
      icon: '📰',
      description: 'National and State GK, Current Events, Geography & Governance',
      defaultQuestions: 35,
      durationMinutes: 35,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['gk', 'general knowledge', 'state gk']
    },
    {
      id: 'arithmetic_math',
      name: 'Basic Mathematics & Arithmetic',
      icon: '🔢',
      description: 'Percentages, Profit & Loss, Simple Interest, Ratios, Speed & Time',
      defaultQuestions: 35,
      durationMinutes: 40,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['math', 'arithmetic', 'quant']
    },
    {
      id: 'reasoning_ability',
      name: 'Logical Reasoning & Mental Ability',
      icon: '🧠',
      description: 'Number & Letter Series, Coding-Decoding, Direction Sense, Analogies',
      defaultQuestions: 25,
      durationMinutes: 25,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['reasoning', 'logic', 'mental ability']
    },
    {
      id: 'computer_it',
      name: 'Computer Knowledge & IT Literacy',
      icon: '💻',
      description: 'MS Office, Internet & Networking, Cyber Security, OS & Shortcuts',
      defaultQuestions: 25,
      durationMinutes: 20,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['computer', 'it', 'digital', 'software']
    }
  ],

  // 3. TEACHING & TET (OTET, OSSTET, CTET, UPTET, REET, BTET, KVS)
  teaching_tet: [
    {
      id: 'full_mock',
      name: 'Full TET Paper (All 5 Sections)',
      icon: '🎯',
      description: 'Complete syllabus covering CDP, Languages, Mathematics & EVS',
      defaultQuestions: 100,
      durationMinutes: 120,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['all', 'tet', 'cdp', 'pedagogy']
    },
    {
      id: 'cdp_pedagogy',
      name: 'Child Development & Pedagogy (CDP)',
      icon: '🧑‍🏫',
      description: 'Child Psychology, Learning Theories, Inclusive Education, NEP 2020',
      defaultQuestions: 30,
      durationMinutes: 30,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['cdp', 'pedagogy', 'child development', 'teaching']
    },
    {
      id: 'maths_evs',
      name: 'Mathematics & Environmental Studies (EVS)',
      icon: '🌱',
      description: 'Basic Mathematics, Geometry, Environmental Ecology & Pedagogy',
      defaultQuestions: 40,
      durationMinutes: 45,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['math', 'evs', 'environment', 'science']
    },
    {
      id: 'language_1',
      name: 'Language I (Regional / Mother Tongue)',
      icon: '📘',
      description: 'Prose, Poetry, Grammar & Pedagogy of Language Development',
      defaultQuestions: 30,
      durationMinutes: 30,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['language', 'odia', 'hindi', 'bengali']
    },
    {
      id: 'language_2_english',
      name: 'Language II (English Pedagogy)',
      icon: '📖',
      description: 'Comprehension, Grammar, Vocabulary & English Teaching Methods',
      defaultQuestions: 30,
      durationMinutes: 30,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['english', 'comprehension', 'pedagogy']
    }
  ],

  // 4. ENGINEERING ENTRANCE (JEE Main, JEE Advanced, BITSAT, WBJEE)
  engineering_jee: [
    {
      id: 'full_mock',
      name: 'Full PCM Paper (Physics + Chem + Maths)',
      icon: '🎯',
      description: 'Exact NTA standard pattern with 75-90 balanced questions',
      defaultQuestions: 75,
      durationMinutes: 180,
      positiveMarks: 4.0,
      negativeMarks: 1.0,
      subjectKeywords: ['all', 'pcm', 'physics', 'chemistry', 'maths']
    },
    {
      id: 'physics_section',
      name: 'Physics (Complete Syllabus)',
      icon: '⚡',
      description: 'Mechanics, Electrodynamics, Optics, Thermodynamics, Modern Physics',
      defaultQuestions: 25,
      durationMinutes: 60,
      positiveMarks: 4.0,
      negativeMarks: 1.0,
      subjectKeywords: ['physics', 'mechanics', 'optics', 'electrodynamics']
    },
    {
      id: 'chemistry_section',
      name: 'Chemistry (Physical, Organic, Inorganic)',
      icon: '🧪',
      description: 'Coordination Compounds, Reaction Mechanisms, Equilibrium, Bonding',
      defaultQuestions: 25,
      durationMinutes: 60,
      positiveMarks: 4.0,
      negativeMarks: 1.0,
      subjectKeywords: ['chemistry', 'organic', 'inorganic', 'physical']
    },
    {
      id: 'maths_section',
      name: 'Mathematics (Calculus, Algebra, Coordinate)',
      icon: '📐',
      description: 'Calculus, Vectors, Matrices, 3D Geometry, Probability, Coordinate',
      defaultQuestions: 25,
      durationMinutes: 60,
      positiveMarks: 4.0,
      negativeMarks: 1.0,
      subjectKeywords: ['math', 'calculus', 'algebra', 'coordinate']
    }
  ],

  // 5. MEDICAL ENTRANCE (NEET UG, AIIMS NORCET, Nursing)
  medical_neet: [
    {
      id: 'full_mock',
      name: 'Full PCB Mock Paper (Bio + Chem + Physics)',
      icon: '🎯',
      description: 'Complete 180 Questions NTA standard mock simulation',
      defaultQuestions: 180,
      durationMinutes: 200,
      positiveMarks: 4.0,
      negativeMarks: 1.0,
      subjectKeywords: ['all', 'pcb', 'biology', 'botany', 'zoology']
    },
    {
      id: 'biology_section',
      name: 'Biology (Botany & Zoology)',
      icon: '🌿',
      description: 'Human Physiology, Genetics, Plant Physiology, Ecology, Cell Biology',
      defaultQuestions: 90,
      durationMinutes: 90,
      positiveMarks: 4.0,
      negativeMarks: 1.0,
      subjectKeywords: ['biology', 'botany', 'zoology', 'genetics', 'physiology']
    },
    {
      id: 'chemistry_section',
      name: 'Chemistry (High-Yield NEET)',
      icon: '🧪',
      description: 'Organic Name Reactions, Periodic Trends, Thermodynamics, Biomolecules',
      defaultQuestions: 45,
      durationMinutes: 50,
      positiveMarks: 4.0,
      negativeMarks: 1.0,
      subjectKeywords: ['chemistry', 'organic', 'inorganic']
    },
    {
      id: 'physics_section',
      name: 'Physics (Numerical & Conceptual)',
      icon: '⚡',
      description: 'Mechanics, Wave Optics, Current Electricity, Semiconductor, Modern',
      defaultQuestions: 45,
      durationMinutes: 60,
      positiveMarks: 4.0,
      negativeMarks: 1.0,
      subjectKeywords: ['physics', 'mechanics', 'modern physics']
    }
  ],

  // 6. UPSC CIVIL SERVICES
  upsc_cse: [
    {
      id: 'full_mock',
      name: 'GS Paper 1 (Full Prelims Syllabus)',
      icon: '🎯',
      description: 'Complete 100 Qs simulation covering all 7 pillars of General Studies',
      defaultQuestions: 100,
      durationMinutes: 120,
      positiveMarks: 2.0,
      negativeMarks: 0.66,
      subjectKeywords: ['all', 'general studies', 'polity', 'history']
    },
    {
      id: 'csat_paper_2',
      name: 'CSAT Paper 2 (Aptitude & Reading)',
      icon: '🧠',
      description: 'Reading Comprehension, Logical Reasoning, Number System & DI',
      defaultQuestions: 80,
      durationMinutes: 120,
      positiveMarks: 2.5,
      negativeMarks: 0.83,
      subjectKeywords: ['csat', 'reading', 'reasoning', 'aptitude']
    },
    {
      id: 'polity_governance',
      name: 'Indian Polity, Governance & Constitution',
      icon: '⚖️',
      description: 'Fundamental Rights, Parliament, Judiciary, Panchayati Raj, Acts',
      defaultQuestions: 50,
      durationMinutes: 60,
      positiveMarks: 2.0,
      negativeMarks: 0.66,
      subjectKeywords: ['polity', 'constitution', 'governance']
    },
    {
      id: 'history_art_culture',
      name: 'History, Art & Culture (Ancient to Modern)',
      icon: '📜',
      description: 'Freedom Movement, Art & Architecture, Temple Styles, Modern India',
      defaultQuestions: 40,
      durationMinutes: 45,
      positiveMarks: 2.0,
      negativeMarks: 0.66,
      subjectKeywords: ['history', 'culture', 'modern history']
    },
    {
      id: 'geo_environment',
      name: 'Geography, Environment & Climate Change',
      icon: '🌍',
      description: 'Physical Geography, National Parks, Bio-reserves, Treaties & Reports',
      defaultQuestions: 40,
      durationMinutes: 45,
      positiveMarks: 2.0,
      negativeMarks: 0.66,
      subjectKeywords: ['geography', 'environment', 'ecology']
    }
  ],

  // 7. SSC & CENTRAL GOVT (SSC CGL, CHSL, MTS, CPO, GD)
  ssc_govt: [
    {
      id: 'full_mock',
      name: 'Full Tier 1 Mock (4 Sections)',
      icon: '🎯',
      description: 'Quantitative, Reasoning, English, General Awareness (100 Qs)',
      defaultQuestions: 100,
      durationMinutes: 60,
      positiveMarks: 2.0,
      negativeMarks: 0.5,
      subjectKeywords: ['all', 'ssc', 'cgl', 'quant', 'reasoning']
    },
    {
      id: 'quantitative_aptitude',
      name: 'Quantitative Aptitude (Mathematics)',
      icon: '🔢',
      description: 'Arithmetic, Geometry, Trigonometry, Mensuration, Algebra',
      defaultQuestions: 25,
      durationMinutes: 20,
      positiveMarks: 2.0,
      negativeMarks: 0.5,
      subjectKeywords: ['quant', 'math', 'arithmetic', 'geometry']
    },
    {
      id: 'reasoning_general_intelligence',
      name: 'General Intelligence & Reasoning',
      icon: '🧠',
      description: 'Syllogisms, Analogies, Blood Relations, Non-verbal, Puzzles',
      defaultQuestions: 25,
      durationMinutes: 15,
      positiveMarks: 2.0,
      negativeMarks: 0.5,
      subjectKeywords: ['reasoning', 'intelligence', 'logic']
    },
    {
      id: 'general_awareness',
      name: 'General Awareness & Current GK',
      icon: '📰',
      description: 'History, Polity, Economics, Static GK, Science, Current Affairs',
      defaultQuestions: 25,
      durationMinutes: 10,
      positiveMarks: 2.0,
      negativeMarks: 0.5,
      subjectKeywords: ['general awareness', 'gk', 'static gk']
    },
    {
      id: 'english_comprehension',
      name: 'English Comprehension & Grammar',
      icon: '✍️',
      description: 'Spotting Errors, Idioms & Phrases, Cloze Test, Reading Passages',
      defaultQuestions: 25,
      durationMinutes: 15,
      positiveMarks: 2.0,
      negativeMarks: 0.5,
      subjectKeywords: ['english', 'grammar', 'comprehension', 'vocabulary']
    }
  ],

  // 8. BANKING & FINANCIAL (IBPS PO/Clerk, SBI PO, RBI Grade B, RRB)
  banking_finance: [
    {
      id: 'full_mock',
      name: 'Full Prelims Mock Test',
      icon: '🎯',
      description: 'Quantitative Aptitude, Reasoning Ability, English Language',
      defaultQuestions: 100,
      durationMinutes: 60,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['all', 'bank', 'ibps', 'sbi']
    },
    {
      id: 'quantitative_aptitude',
      name: 'Quantitative Aptitude & Data Interpretation',
      icon: '📊',
      description: 'DI Sets, Quadratic Equations, Number Series, Simplification, Arithmetic',
      defaultQuestions: 35,
      durationMinutes: 20,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['quant', 'math', 'di', 'data interpretation']
    },
    {
      id: 'reasoning_ability',
      name: 'Reasoning Ability & Complex Puzzles',
      icon: '🧩',
      description: 'Seating Arrangements, Floor Puzzles, Inequalities, Coding, Input-Output',
      defaultQuestions: 35,
      durationMinutes: 20,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['reasoning', 'puzzles', 'seating']
    },
    {
      id: 'english_language',
      name: 'English Language & Reading Skills',
      icon: '📖',
      description: 'Reading Comprehension, Parajumbles, Fillers, Error Detection',
      defaultQuestions: 30,
      durationMinutes: 20,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['english', 'reading', 'parajumbles']
    },
    {
      id: 'banking_awareness',
      name: 'Banking & Financial Awareness',
      icon: '💳',
      description: 'RBI Monetary Policy, Financial Terms, Headquarters, Digital Banking',
      defaultQuestions: 40,
      durationMinutes: 25,
      positiveMarks: 1.0,
      negativeMarks: 0.25,
      subjectKeywords: ['banking', 'finance', 'economy', 'rbi']
    }
  ],

  // 9. SCHOOL BOARDS (CBSE, ICSE, BSE Odisha, State Boards Class 1-12)
  school_boards: [
    {
      id: 'full_mock',
      name: 'Full Board Exam Model Paper',
      icon: '🎯',
      description: 'All Core Subjects Combined (Board Sample Pattern)',
      defaultQuestions: 80,
      durationMinutes: 120,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['all', 'board', 'school', 'cbse']
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: '📐',
      description: 'Algebra, Geometry, Trigonometry, Statistics, Real Numbers, Linear Eq.',
      defaultQuestions: 30,
      durationMinutes: 45,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['math', 'mathematics', 'geometry', 'algebra']
    },
    {
      id: 'science',
      name: 'Science (Physics, Chemistry, Biology)',
      icon: '🔬',
      description: 'Chemical Reactions, Electricity, Life Processes, Light, Periodic Table',
      defaultQuestions: 30,
      durationMinutes: 45,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['science', 'physics', 'chemistry', 'biology']
    },
    {
      id: 'social_science',
      name: 'Social Science (History, Geo, Civics, Eco)',
      icon: '🌍',
      description: 'Nationalism in India, Resources, Democratic Politics, Development',
      defaultQuestions: 30,
      durationMinutes: 45,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['social science', 'history', 'geography', 'civics', 'economics']
    },
    {
      id: 'english_language',
      name: 'English Language & Literature',
      icon: '✍️',
      description: 'Reading Comprehension, Grammar, Writing Skills & Literature Text',
      defaultQuestions: 25,
      durationMinutes: 30,
      positiveMarks: 1.0,
      negativeMarks: 0.0,
      subjectKeywords: ['english', 'literature', 'grammar']
    }
  ]
};

// Available States for State Exams
const INDIAN_STATES = [
  { id: 'odisha', name: 'Odisha', code: 'OD', flag: '🏛️', defaultPsc: 'OPSC OAS', defaultPolice: 'Odisha Police SI' },
  { id: 'bihar', name: 'Bihar', code: 'BR', flag: '🏛️', defaultPsc: 'BPSC CCE', defaultPolice: 'Bihar Police SI' },
  { id: 'uttar_pradesh', name: 'Uttar Pradesh', code: 'UP', flag: '🏛️', defaultPsc: 'UPPSC PCS', defaultPolice: 'UP Police SI' },
  { id: 'rajasthan', name: 'Rajasthan', code: 'RJ', flag: '🏛️', defaultPsc: 'RPSC RAS', defaultPolice: 'Rajasthan Police' },
  { id: 'west_bengal', name: 'West Bengal', code: 'WB', flag: '🏛️', defaultPsc: 'WBCS Executive', defaultPolice: 'WB Police SI' },
  { id: 'maharashtra', name: 'Maharashtra', code: 'MH', flag: '🏛️', defaultPsc: 'MPSC Rajyaseva', defaultPolice: 'Maharashtra Police' },
  { id: 'madhya_pradesh', name: 'Madhya Pradesh', code: 'MP', flag: '🏛️', defaultPsc: 'MPPSC State Service', defaultPolice: 'MP Police SI' },
  { id: 'delhi', name: 'Delhi (NCR)', code: 'DL', flag: '🏛️', defaultPsc: 'DSSSB Combined', defaultPolice: 'Delhi Police SI' },
  { id: 'all_india', name: 'All States Combined', code: 'IN', flag: '🇮🇳', defaultPsc: 'State Civil Services', defaultPolice: 'State Police Cadres' }
];

export default function ExamSubjectPickerModal({
  isOpen,
  onClose,
  onConfirmLaunch,
  initialCategory = 'all',
  initialTest = null,
  tests,
  isDarkMode = false,
  userState = 'Odisha'
}: ExamSubjectPickerModalProps) {
  if (!isOpen) return null;

  // Selected High-Level Category: 'state' | 'competitive' | 'school'
  const [selectedCategory, setSelectedCategory] = useState<'state' | 'competitive' | 'school'>(() => {
    if (initialCategory === 'state') return 'state';
    if (initialCategory === 'school') return 'school';
    if (initialCategory === 'competitive') return 'competitive';
    if (initialTest?.mainCategory?.toLowerCase().includes('state')) return 'state';
    if (initialTest?.mainCategory?.toLowerCase().includes('school') || initialTest?.board) return 'school';
    return 'state'; // default to state as requested
  });

  // State selection for State Category
  const [selectedStateId, setSelectedStateId] = useState<string>(() => {
    const match = INDIAN_STATES.find(s => s.name.toLowerCase() === userState?.toLowerCase());
    return match ? match.id : 'odisha';
  });

  // Sub-category / Stream selector within the category
  const [selectedStream, setSelectedStream] = useState<string>(() => {
    if (initialTest) {
      if (initialTest.title.includes('OPSC') || initialTest.title.includes('BPSC') || initialTest.title.includes('PCS')) return 'state_pcs';
      if (initialTest.title.includes('Police') || initialTest.title.includes('SI')) return 'state_police';
      if (initialTest.title.includes('TET') || initialTest.title.includes('CTET')) return 'teaching_tet';
      if (initialTest.title.includes('JEE')) return 'engineering_jee';
      if (initialTest.title.includes('NEET') || initialTest.title.includes('NORCET')) return 'medical_neet';
      if (initialTest.title.includes('UPSC')) return 'upsc_cse';
      if (initialTest.title.includes('SSC')) return 'ssc_govt';
      if (initialTest.title.includes('Bank') || initialTest.title.includes('PO') || initialTest.title.includes('Clerk')) return 'banking_finance';
      if (initialTest.board || initialTest.gradeOrClass) return 'school_boards';
    }
    return selectedCategory === 'state' ? 'state_pcs' : selectedCategory === 'school' ? 'school_boards' : 'engineering_jee';
  });

  // Selected State Object (declared early to avoid reference before declaration)
  const selectedStateObj = useMemo(() => {
    return INDIAN_STATES.find(s => s.id === selectedStateId) || INDIAN_STATES[0];
  }, [selectedStateId]);

  // Available subjects for the active stream
  const availableSubjects = useMemo(() => {
    const rawList = EXAM_FAMILY_SUBJECTS[selectedStream] || EXAM_FAMILY_SUBJECTS.state_pcs;
    if (selectedCategory !== 'state') return rawList;

    // Enhance state-specific labels with selected state context
    const stateName = selectedStateObj?.name || 'State';
    return rawList.map(s => {
      if (s.id === 'state_special_gk') {
        return {
          ...s,
          name: `${stateName} Special GK & Heritage`,
          description: `History, Geography, Demographics, Culture, Monuments & Schemes of ${stateName}`
        };
      }
      if (s.id === 'language_paper') {
        const regionalLang = stateName === 'Odisha' ? 'Odia' : stateName === 'West Bengal' ? 'Bengali' : stateName === 'Maharashtra' ? 'Marathi' : 'Hindi';
        return {
          ...s,
          description: `${stateName} Regional Language (${regionalLang}) & General English Grammar`
        };
      }
      return s;
    });
  }, [selectedStream, selectedCategory, selectedStateObj]);

  // Selected subject/paper option
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(availableSubjects[0]?.id || 'full_mock');

  // Test mode: 'speed' (20 Qs) | 'sectional' (40-50 Qs) | 'full' (Full exam standard)
  const [testMode, setTestMode] = useState<'speed' | 'sectional' | 'full'>('sectional');

  // Language Medium
  const [languageMedium, setLanguageMedium] = useState<'english' | 'hindi' | 'odia' | 'bilingual'>('bilingual');

  // Sync available subjects when stream changes
  useEffect(() => {
    if (availableSubjects.length > 0 && !availableSubjects.some(s => s.id === selectedSubjectId)) {
      setSelectedSubjectId(availableSubjects[0].id);
    }
  }, [selectedStream, availableSubjects, selectedSubjectId]);

  // Current active subject object
  const activeSubject = useMemo(() => {
    return availableSubjects.find(s => s.id === selectedSubjectId) || availableSubjects[0];
  }, [availableSubjects, selectedSubjectId]);

  // Compute final question count and duration based on mode and subject
  const resolvedQuestionsCount = useMemo(() => {
    if (testMode === 'speed') return 20;
    if (testMode === 'sectional') return Math.min(50, activeSubject.defaultQuestions);
    return activeSubject.defaultQuestions;
  }, [testMode, activeSubject]);

  const resolvedDurationMinutes = useMemo(() => {
    if (testMode === 'speed') return 20;
    if (testMode === 'sectional') return Math.max(30, Math.round(activeSubject.durationMinutes * 0.6));
    return activeSubject.durationMinutes;
  }, [testMode, activeSubject]);

  // Find a matching base test from tests array or fallback
  const baseMatchingTest = useMemo(() => {
    if (initialTest) return initialTest;
    
    // Look for best match in tests
    if (selectedCategory === 'state') {
      if (selectedStream === 'state_pcs') {
        return tests.find(t => t.title.includes('OPSC') || t.title.includes('BPSC') || t.title.includes('PCS')) || tests[0];
      } else if (selectedStream === 'state_police') {
        return tests.find(t => t.title.includes('Police') || t.title.includes('SI')) || tests[0];
      } else if (selectedStream === 'teaching_tet') {
        return tests.find(t => t.title.includes('TET') || t.title.includes('CTET')) || tests[0];
      }
      return tests.find(t => t.mainCategory?.toLowerCase().includes('state')) || tests[0];
    } else if (selectedCategory === 'competitive') {
      if (selectedStream === 'engineering_jee') return tests.find(t => t.title.includes('JEE')) || tests[0];
      if (selectedStream === 'medical_neet') return tests.find(t => t.title.includes('NEET') || t.title.includes('NORCET')) || tests[0];
      if (selectedStream === 'upsc_cse') return tests.find(t => t.title.includes('UPSC')) || tests[0];
      if (selectedStream === 'ssc_govt') return tests.find(t => t.title.includes('SSC')) || tests[0];
      if (selectedStream === 'banking_finance') return tests.find(t => t.title.includes('Bank') || t.title.includes('PO')) || tests[0];
      return tests[0];
    } else {
      return tests.find(t => t.board || t.mainCategory?.toLowerCase().includes('school')) || tests[0];
    }
  }, [initialTest, selectedCategory, selectedStream, tests]);

  // Derive target title label
  const examDisplayTitle = useMemo(() => {
    if (selectedCategory === 'state') {
      const stateName = selectedStateObj.name;
      if (selectedStream === 'state_pcs') return `${stateName} Civil Services (${selectedStateObj.defaultPsc}) 2026`;
      if (selectedStream === 'state_police') return `${stateName} Police Recruitment (${selectedStateObj.defaultPolice})`;
      if (selectedStream === 'teaching_tet') return `${stateName} Teacher Eligibility Test (TET)`;
      return `${stateName} Combined Competitive Exam`;
    } else if (selectedCategory === 'competitive') {
      if (selectedStream === 'engineering_jee') return 'JEE Main 2026 (NTA All-India)';
      if (selectedStream === 'medical_neet') return 'NEET UG 2026 (Medical All-India)';
      if (selectedStream === 'upsc_cse') return 'UPSC Civil Services Examination (CSE)';
      if (selectedStream === 'ssc_govt') return 'SSC CGL Tier-1 Combined Graduate Level';
      if (selectedStream === 'banking_finance') return 'IBPS / SBI PO & Clerk Combined';
      return 'National Competitive Examination';
    } else {
      return 'Class 10 CBSE & State Board Model Paper';
    }
  }, [selectedCategory, selectedStateObj, selectedStream]);

  // Handle Confirmed Launch with proper section and question synthesis
  const handleConfirmAndLaunch = () => {
    // Build an adapted MockTest object
    const isSingleSubject = activeSubject.id !== 'full_mock';
    const sectionName = isSingleSubject ? activeSubject.name : 'All Sections Combined';

    const preparedSections: ExamSection[] = isSingleSubject
      ? [
          {
            id: `sec_${activeSubject.id}`,
            name: activeSubject.name,
            totalQuestions: resolvedQuestionsCount,
            totalMarks: resolvedQuestionsCount * activeSubject.positiveMarks,
            positiveMarksPerQuestion: activeSubject.positiveMarks,
            negativeMarksPerQuestion: activeSubject.negativeMarks
          }
        ]
      : [
          {
            id: 'sec_part_1',
            name: `${activeSubject.name} - Part A`,
            totalQuestions: Math.ceil(resolvedQuestionsCount / 2),
            totalMarks: Math.ceil(resolvedQuestionsCount / 2) * activeSubject.positiveMarks,
            positiveMarksPerQuestion: activeSubject.positiveMarks,
            negativeMarksPerQuestion: activeSubject.negativeMarks
          },
          {
            id: 'sec_part_2',
            name: `${activeSubject.name} - Part B`,
            totalQuestions: Math.floor(resolvedQuestionsCount / 2),
            totalMarks: Math.floor(resolvedQuestionsCount / 2) * activeSubject.positiveMarks,
            positiveMarksPerQuestion: activeSubject.positiveMarks,
            negativeMarksPerQuestion: activeSubject.negativeMarks
          }
        ];

    const customizedTest: MockTest = {
      ...baseMatchingTest,
      id: `custom_${selectedStream}_${activeSubject.id}_${Date.now()}`,
      slug: `custom-${selectedStream}-${activeSubject.id}`,
      title: `${examDisplayTitle} • ${activeSubject.name}`,
      shortDescription: `${activeSubject.description} (${resolvedQuestionsCount} Qs • ${resolvedDurationMinutes} Mins)`,
      mainCategory: selectedCategory === 'state' 
        ? (selectedStream === 'state_police' ? 'police_state_cadres' : 'state_psc_all_28') 
        : selectedCategory === 'school' 
        ? 'school_boards' 
        : 'competitive_central',
      subCategory: (baseMatchingTest.subCategory || 'general') as any,
      targetExam: examDisplayTitle,
      categoryLabel: selectedCategory === 'state' ? `${selectedStateObj.name} State Exams` : selectedCategory === 'school' ? 'School Board Exam' : 'Competitive Exam',
      state: selectedCategory === 'state' ? selectedStateObj.name : undefined,
      totalQuestions: resolvedQuestionsCount,
      durationMinutes: resolvedDurationMinutes,
      totalMarks: resolvedQuestionsCount * activeSubject.positiveMarks,
      sections: preparedSections,
      questions: [] // ensureTestComplete will populate subject-pure authentic questions!
    };

    const readyTest = ensureTestComplete(customizedTest);
    onConfirmLaunch(readyTest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* TOP HEADER */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between gap-3 ${
          isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/80 border-slate-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-600/15 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl shadow-xs">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[11px] font-black uppercase tracking-wider">
                  Exam Configurator
                </span>
                <span className="text-xs text-slate-400 font-semibold">• Step 1 of 2</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                Choose Subject & Paper
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* 1. THREE HIGH-LEVEL CATEGORY TABS */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              1. Select Domain
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('state');
                  setSelectedStream('state_pcs');
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 active:scale-95 ${
                  selectedCategory === 'state'
                    ? 'bg-blue-50 border-blue-500 text-blue-900 dark:bg-blue-950/60 dark:border-blue-500 dark:text-blue-200 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/80 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xl">🏛️</span>
                <span className="text-xs sm:text-sm font-bold">State Exams</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('competitive');
                  setSelectedStream('engineering_jee');
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 active:scale-95 ${
                  selectedCategory === 'competitive'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/80 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xl">🎓</span>
                <span className="text-xs sm:text-sm font-bold">Competitive</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('school');
                  setSelectedStream('school_boards');
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 active:scale-95 ${
                  selectedCategory === 'school'
                    ? 'bg-purple-50 border-purple-500 text-purple-900 dark:bg-purple-950/60 dark:border-purple-500 dark:text-purple-200 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/80 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xl">🏫</span>
                <span className="text-xs sm:text-sm font-bold">School Boards</span>
              </button>
            </div>
          </div>

          {/* 2. STATE SELECTOR (When State Exams is selected) */}
          {selectedCategory === 'state' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  2. Select State Authority
                </label>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Selected: {selectedStateObj.name}
                </span>
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {INDIAN_STATES.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStateId(st.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 ${
                      selectedStateId === st.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300'
                    }`}
                  >
                    <span>{st.flag}</span>
                    <span>{st.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. CADRE / STREAM SELECTOR */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {selectedCategory === 'state' ? '3. Select Exam Cadre' : '2. Select Exam Stream'}
            </label>

            {selectedCategory === 'state' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStream('state_pcs')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedStream === 'state_pcs'
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-200'
                  }`}
                >
                  <div className="text-base">🏛️</div>
                  <div className="font-bold text-xs sm:text-sm mt-1">State PCS</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">OAS / BPSC / UPPSC</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStream('state_police')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedStream === 'state_police'
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-200'
                  }`}
                >
                  <div className="text-base">👮</div>
                  <div className="font-bold text-xs sm:text-sm mt-1">Police & Defense</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">SI & Constable</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStream('teaching_tet')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedStream === 'teaching_tet'
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-200'
                  }`}
                >
                  <div className="text-base">🧑‍🏫</div>
                  <div className="font-bold text-xs sm:text-sm mt-1">Teaching TET</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">OTET / CTET / BTET</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStream('state_group_c')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedStream === 'state_group_c'
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-200'
                  }`}
                >
                  <div className="text-base">📑</div>
                  <div className="font-bold text-xs sm:text-sm mt-1">Group C / SSC</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">RI / Amin / PEO / Patwari</div>
                </button>
              </div>
            )}

            {selectedCategory === 'competitive' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStream('engineering_jee')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedStream === 'engineering_jee'
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 font-bold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-lg">📐</span>
                  <div className="text-xs font-bold mt-1">JEE Main / Adv</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStream('medical_neet')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedStream === 'medical_neet'
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 font-bold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-lg">🩺</span>
                  <div className="text-xs font-bold mt-1">NEET UG Medical</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStream('upsc_cse')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedStream === 'upsc_cse'
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 font-bold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-lg">🏛️</span>
                  <div className="text-xs font-bold mt-1">UPSC CSE Civil</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStream('ssc_govt')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedStream === 'ssc_govt'
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 font-bold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-lg">💳</span>
                  <div className="text-xs font-bold mt-1">SSC CGL / Bank</div>
                </button>
              </div>
            )}

            {selectedCategory === 'school' && (
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStream('school_boards')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedStream === 'school_boards'
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="text-base">📖</div>
                  <div className="font-bold text-xs sm:text-sm mt-1">Class 10 Board</div>
                  <div className="text-[10px] text-slate-500">CBSE & State Board</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStream('school_boards')}
                  className="p-3 rounded-2xl border text-left transition-all cursor-pointer bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-90"
                >
                  <div className="text-base">📘</div>
                  <div className="font-bold text-xs sm:text-sm mt-1">Class 12 Board</div>
                  <div className="text-[10px] text-slate-500">Science & Commerce</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStream('school_boards')}
                  className="p-3 rounded-2xl border text-left transition-all cursor-pointer bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-90"
                >
                  <div className="text-base">🏆</div>
                  <div className="font-bold text-xs sm:text-sm mt-1">Olympiads</div>
                  <div className="text-[10px] text-slate-500">Science & Math</div>
                </button>
              </div>
            )}
          </div>

          {/* 4. CHOOSE EXACT SUBJECT / PAPER (THE CORE APPROVAL STEP) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                <span>⭐ Select Subject / Paper</span>
              </label>
              <span className="text-xs text-slate-500">Tap to select your topic</span>
            </div>

            <div className="space-y-2.5">
              {availableSubjects.map((subj) => {
                const isSelected = subj.id === selectedSubjectId;
                return (
                  <div
                    key={subj.id}
                    onClick={() => setSelectedSubjectId(subj.id)}
                    className={`p-4 rounded-2xl border flex items-start justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] ${
                      isSelected
                        ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-500 dark:border-purple-500 shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="text-2xl mt-0.5">{subj.icon}</span>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white">
                            {subj.name}
                          </h4>
                          {subj.id === 'full_mock' && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider">
                              Full Syllabus
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                          {subj.description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-semibold pt-0.5">
                          <span>{subj.defaultQuestions} Questions</span>
                          <span>•</span>
                          <span>{subj.durationMinutes} Mins</span>
                          <span>•</span>
                          <span>+{subj.positiveMarks} / -{subj.negativeMarks} Marks</span>
                        </div>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                      isSelected
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. TEST MODE & TIMING */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              5. Test Mode & Length
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setTestMode('speed')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer active:scale-95 ${
                  testMode === 'speed'
                    ? 'bg-amber-50 border-amber-500 text-amber-950 dark:bg-amber-950/60 dark:border-amber-500 dark:text-amber-200 font-bold'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-base">⚡</div>
                <div className="text-xs font-bold mt-0.5">Speed Drill</div>
                <div className="text-[10px] text-slate-500">20 Qs • 20 Mins</div>
              </button>

              <button
                type="button"
                onClick={() => setTestMode('sectional')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer active:scale-95 ${
                  testMode === 'sectional'
                    ? 'bg-purple-50 border-purple-500 text-purple-950 dark:bg-purple-950/60 dark:border-purple-500 dark:text-purple-200 font-bold'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-base">🎯</div>
                <div className="text-xs font-bold mt-0.5">Sectional Test</div>
                <div className="text-[10px] text-slate-500">
                  {Math.min(50, activeSubject.defaultQuestions)} Qs • {Math.max(30, Math.round(activeSubject.durationMinutes * 0.6))} Mins
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTestMode('full')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer active:scale-95 ${
                  testMode === 'full'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-200 font-bold'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-base">🏆</div>
                <div className="text-xs font-bold mt-0.5">Full Simulation</div>
                <div className="text-[10px] text-slate-500">
                  {activeSubject.defaultQuestions} Qs • {activeSubject.durationMinutes} Mins
                </div>
              </button>
            </div>
          </div>

          {/* 6. LANGUAGE MEDIUM */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              6. Test Medium & Language
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setLanguageMedium('bilingual')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                  languageMedium === 'bilingual'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                🌐 Bilingual
              </button>
              <button
                type="button"
                onClick={() => setLanguageMedium('english')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                  languageMedium === 'english'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguageMedium('odia')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                  languageMedium === 'odia'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                ଓଡ଼ିଆ (Odia)
              </button>
              <button
                type="button"
                onClick={() => setLanguageMedium('hindi')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                  languageMedium === 'hindi'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>

          {/* 7. EXPLICIT CONFIRMATION SUMMARY CARD (Approval Preview) */}
          <div className={`p-5 rounded-3xl border space-y-3.5 ${
            isDarkMode 
              ? 'bg-purple-950/30 border-purple-800/50' 
              : 'bg-purple-50/80 border-purple-200'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Exam Confirmation Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Target Exam:</span>
                <div className="font-black text-slate-900 dark:text-white truncate">
                  {examDisplayTitle}
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Selected Subject:</span>
                <div className="font-black text-purple-600 dark:text-purple-400 truncate">
                  {activeSubject.name}
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Total Questions & Time:</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  {resolvedQuestionsCount} Questions • {resolvedDurationMinutes} Minutes
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Marking Pattern:</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  +{activeSubject.positiveMarks} Correct | -{activeSubject.negativeMarks} Negative
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BAR */}
        <div className={`p-5 sm:p-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-100'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
          >
            Cancel / Back
          </button>

          <button
            type="button"
            onClick={handleConfirmAndLaunch}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-black shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Launch Confirmed CBT Exam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
