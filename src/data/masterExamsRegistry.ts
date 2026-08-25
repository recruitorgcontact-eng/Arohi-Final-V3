// Arohi AI — Master India Exam Knowledge Graph Registry
// Comprehensive relational database across all 26 Exam Sectors & 28 States of India

export interface MasterExamDefinition {
  id: string;
  code: string;
  name: string;
  nameHindi?: string;
  nameRegional?: string;
  regionalLanguageCode?: string;
  authority: string;
  authorityShort: string;
  sector: string;
  state: string; // "Central / All India" or State name
  stages: string[];
  eligibility: string;
  frequency: string;
  totalMarksPattern: string;
  negativeMarking: string;
  languagesAvailable: string[];
  testCountReady: number;
  featuredTestSlug: string;
  isHotTrending?: boolean;
  popularSearchTerms: string[];
  summaryOverview: string;
  syllabusHighlights: string[];
}

export interface ExamSectorCategory {
  id: string;
  title: string;
  icon: string;
  badge: string;
  description: string;
  totalExams: number;
  gradient: string;
}

export const MASTER_EXAM_SECTORS: ExamSectorCategory[] = [
  {
    id: 'upsc_civil',
    title: '1. UPSC & Central Civil Services',
    icon: 'Landmark',
    badge: 'IAS / IPS / IFS / CDS / NDA',
    description: 'Premier national civil, defence, engineering, and administrative recruitment examinations.',
    totalExams: 18,
    gradient: 'from-amber-600 to-orange-700'
  },
  {
    id: 'ssc_graduate_12th',
    title: '2. SSC (Staff Selection Commission)',
    icon: 'Building',
    badge: 'CGL / CHSL / MTS / GD / CPO',
    description: 'Central government ministries, subordinate offices, technical and police personnel selection.',
    totalExams: 16,
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'railway_rrb',
    title: '3. Railway Recruitment (RRB / RRC)',
    icon: 'Zap',
    badge: 'NTPC / Group D / ALP / JE / RPF',
    description: 'Indian Railways non-technical, technical, loco pilot, and safety force recruitments.',
    totalExams: 14,
    gradient: 'from-rose-600 to-red-700'
  },
  {
    id: 'banking_ibps',
    title: '4. Banking & IBPS Ecosystem',
    icon: 'Coins',
    badge: 'IBPS PO / Clerk / SO / RRB Officer',
    description: 'Nationalised public sector banks, specialist cadre, and regional rural banks.',
    totalExams: 15,
    gradient: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'sbi_rbi_financial',
    title: '5. SBI, RBI & Financial Regulatory',
    icon: 'Landmark',
    badge: 'SBI PO / RBI Gr B / NABARD / SEBI / LIC',
    description: 'Reserve Bank of India, State Bank of India, regulatory bodies, and insurance corporations.',
    totalExams: 22,
    gradient: 'from-cyan-600 to-blue-800'
  },
  {
    id: 'defence_paramilitary',
    title: '6. Defence Forces & CAPF',
    icon: 'ShieldCheck',
    badge: 'NDA / CDS / AFCAT / Agniveer / Coast Guard',
    description: 'Indian Army, Navy, Air Force, Coast Guard, and Central Armed Police Forces.',
    totalExams: 25,
    gradient: 'from-teal-600 to-emerald-800'
  },
  {
    id: 'police_state_cadres',
    title: '7. Police & Paramilitary Cadres',
    icon: 'Shield',
    badge: 'State SI / Constable / Jail Warder / BSF / CRPF',
    description: 'Delhi Police and state police constable, sub-inspector, and armed battalion selection.',
    totalExams: 30,
    gradient: 'from-purple-600 to-indigo-900'
  },
  {
    id: 'engineering_jee_gate',
    title: '8. Engineering Entrances & GATE',
    icon: 'Award',
    badge: 'JEE Main / Advanced / BITSAT / GATE / State CET',
    description: 'National and state B.Tech/M.Tech entrances and PSU technical recruitment papers.',
    totalExams: 24,
    gradient: 'from-orange-600 to-amber-700'
  },
  {
    id: 'medical_neet_nursing',
    title: '9. Medical, NEET & Nursing Officers',
    icon: 'HeartPulse',
    badge: 'NEET UG / PG / AIIMS NORCET / INI-CET / ESIC',
    description: 'MBBS/BDS entrances, postgraduate medical examinations, and Nursing Officer CBTs.',
    totalExams: 20,
    gradient: 'from-pink-600 to-rose-700'
  },
  {
    id: 'management_cat_mba',
    title: '10. Management & MBA Entrances',
    icon: 'TrendingUp',
    badge: 'CAT / XAT / CMAT / SNAP / IPMAT / NMAT',
    description: 'IIMs, top B-schools, undergraduate IPMAT, and state MBA common entrance tests.',
    totalExams: 18,
    gradient: 'from-violet-600 to-purple-800'
  },
  {
    id: 'law_clat_judiciary',
    title: '11. Law, CLAT & State Judiciary',
    icon: 'BookOpen',
    badge: 'CLAT UG/PG / AILET / Civil Judge / APO',
    description: 'National Law Universities admissions and State Judicial Services exams.',
    totalExams: 16,
    gradient: 'from-indigo-600 to-slate-800'
  },
  {
    id: 'teaching_tet_ctet',
    title: '12. Teaching & TET (All States)',
    icon: 'GraduationCap',
    badge: 'CTET / Super TET / REET / MahaTET / UPTET',
    description: 'Central and all 28 State Teacher Eligibility Tests, KVS, NVS, and DSSSB.',
    totalExams: 34,
    gradient: 'from-emerald-500 to-cyan-700'
  },
  {
    id: 'state_psc_all_28',
    title: '13. State PSCs (All 28 Indian States)',
    icon: 'Building',
    badge: 'BPSC / UPPSC / MPSC / TNPSC / OPSC / KPSC',
    description: 'Complete coverage for Civil Services (Group 1, 2, 3, 4) across all 28 Indian states.',
    totalExams: 45,
    gradient: 'from-fuchsia-600 to-pink-800'
  },
  {
    id: 'clerical_patwari_state',
    title: '14. Clerical, Patwari & Field Services',
    icon: 'FileText',
    badge: 'Patwari / Lekhpal / VDO / RI / Clerk / Amin',
    description: 'State revenue, panchayati raj, secretarial, and subordinate field cadre examinations.',
    totalExams: 28,
    gradient: 'from-amber-700 to-orange-900'
  },
  {
    id: 'commerce_ca_cma_cs',
    title: '15. Chartered Commerce & Professional',
    icon: 'Coins',
    badge: 'CA Foundation/Inter / CMA / CS / CFA',
    description: 'ICAI, ICMAI, ICSI professional accounting, auditing, and corporate secretarial exams.',
    totalExams: 12,
    gradient: 'from-blue-700 to-indigo-900'
  },
  {
    id: 'school_boards',
    title: '16. School, Scholarship & Class 1-12',
    icon: 'Sparkles',
    badge: 'CBSE / ICSE / State Boards / AISSEE / Navodaya',
    description: 'Board examinations, Sainik school, JNVST, NTSE, NMMS, and foundation mock tests.',
    totalExams: 22,
    gradient: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'agriculture_pharmacy_design',
    title: '17. Agriculture, Pharmacy & Design',
    icon: 'Lightbulb',
    badge: 'ICAR / GPAT / NIFT / NID / UCEED / NATA',
    description: 'Agricultural research, pharmaceutical entrances, design DAT, and architecture exams.',
    totalExams: 18,
    gradient: 'from-teal-600 to-emerald-700'
  }
];

export const ALL_INDIAN_STATES: string[] = [
  'All-India / Central',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR'
];

export const MASTER_EXAMS_DATABASE: MasterExamDefinition[] = [
  // 1. UPSC CSE
  {
    id: 'upsc_cse_prelims',
    code: 'UPSC-CSE-PRE',
    name: 'UPSC Civil Services Examination (CSE Prelims)',
    nameHindi: 'संघ लोक सेवा आयोग सिविल सेवा परीक्षा (प्रारंभिक)',
    authority: 'Union Public Service Commission',
    authorityShort: 'UPSC',
    sector: 'upsc_civil',
    state: 'All-India / Central',
    stages: ['Prelims (GS 1 & CSAT)', 'Mains (9 Papers)', 'Interview (Personality Test)'],
    eligibility: 'Graduate in any discipline (Age: 21-32 years for General, relaxations apply)',
    frequency: 'Annual (May - June)',
    totalMarksPattern: 'GS Paper 1: 200 Marks (100 Qs) | CSAT: 200 Marks (80 Qs, Qualifying 33%)',
    negativeMarking: '-0.66 per incorrect MCQ (1/3rd penalty)',
    languagesAvailable: ['en', 'hi'],
    testCountReady: 24,
    featuredTestSlug: 'upsc-cse-prelims-gs-paper-1-grand-mock',
    isHotTrending: true,
    popularSearchTerms: ['upsc mock test', 'upsc prelims test series', 'upsc free mock test', 'upsc online test hindi', 'upsc csat mock'],
    summaryOverview: 'India\'s premier examination for recruitment to the Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), and Indian Revenue Service (IRS).',
    syllabusHighlights: ['Indian Polity & Governance', 'Modern Indian History & Freedom Struggle', 'Physical & Economic Geography', 'Environment, Ecology & Climate Change', 'General Science & Tech', 'National & International Current Events', 'Logical Reasoning & Quantitative CSAT']
  },
  // 2. SSC CGL
  {
    id: 'ssc_cgl_tier1',
    code: 'SSC-CGL-T1',
    name: 'SSC Combined Graduate Level (SSC CGL)',
    nameHindi: 'कर्मचारी चयन आयोग संयुक्त स्नातक स्तरीय परीक्षा',
    authority: 'Staff Selection Commission',
    authorityShort: 'SSC',
    sector: 'ssc_graduate_12th',
    state: 'All-India / Central',
    stages: ['Tier 1 (Computer Based Test)', 'Tier 2 (Objective + Typing/Skill Test)'],
    eligibility: 'Bachelor\'s Degree in any stream (Age 18-32 years)',
    frequency: 'Annual (September - October)',
    totalMarksPattern: 'Tier 1: 200 Marks (100 Qs: 25 GA + 25 Reasoning + 25 Quant + 25 English)',
    negativeMarking: '-0.50 Marks per wrong answer',
    languagesAvailable: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'or', 'gu'],
    testCountReady: 32,
    featuredTestSlug: 'ssc-cgl-tier-1-all-india-grand-mock',
    isHotTrending: true,
    popularSearchTerms: ['ssc cgl mock test', 'ssc cgl tier 1 practice test', 'ssc cgl free online test', 'ssc cgl pyq test series'],
    summaryOverview: 'Recruits Group B and Group C officers into central ministries, Income Tax, GST & Central Excise, CBI, Enforcement Directorate, and Comptroller & Auditor General (CAG).',
    syllabusHighlights: ['Quantitative Aptitude & Advanced Maths (Trigonometry, Geometry)', 'General Intelligence & Reasoning', 'General Awareness, Polity & Static GK', 'English Comprehension & Grammar']
  },
  // 3. RRB NTPC
  {
    id: 'rrb_ntpc_cbt1',
    code: 'RRB-NTPC-CBT1',
    name: 'RRB Non-Technical Popular Categories (RRB NTPC)',
    nameHindi: 'रेलवे भर्ती बोर्ड गैर-तकनीकी लोकप्रिय श्रेणियां',
    authority: 'Railway Recruitment Control Board',
    authorityShort: 'RRB',
    sector: 'railway_rrb',
    state: 'All-India / Central',
    stages: ['CBT 1 (Screening)', 'CBT 2 (Post Specific)', 'CBAT / Typing Skill Test', 'Document Verification'],
    eligibility: '12th Pass for Undergraduate & Graduate for Graduate level posts',
    frequency: 'Notified periodically by Ministry of Railways',
    totalMarksPattern: 'CBT 1: 100 Marks (100 Qs: 40 GA + 30 Math + 30 General Intelligence) - 90 Minutes',
    negativeMarking: '-0.33 Marks per wrong answer (1/3rd penalty)',
    languagesAvailable: ['en', 'hi', 'or', 'bn', 'mr', 'ta', 'te', 'kn', 'gu', 'pa'],
    testCountReady: 28,
    featuredTestSlug: 'rrb-ntpc-cbt-1-all-india-grand-mock',
    isHotTrending: true,
    popularSearchTerms: ['rrb ntpc mock test', 'railway ntpc cbt 1 test series', 'rrb mock test in hindi', 'rrb ntpc free test'],
    summaryOverview: 'Mass recruitment for Station Master, Goods Guard, Senior Clerk cum Typist, Commercial Apprentice, Junior Account Assistant, and Traffic Assistant in Indian Railways.',
    syllabusHighlights: ['General Awareness & Current Affairs (40 Qs)', 'Mathematics & Arithmetic Aptitude (30 Qs)', 'General Intelligence & Logical Reasoning (30 Qs)']
  },
  // 4. IBPS PO
  {
    id: 'ibps_po_prelims',
    code: 'IBPS-PO-PRE',
    name: 'IBPS Probationary Officer / Management Trainee (IBPS PO)',
    nameHindi: 'आईबीपीएस प्रोबेशनरी ऑफिसर प्रारंभिक परीक्षा',
    authority: 'Institute of Banking Personnel Selection',
    authorityShort: 'IBPS',
    sector: 'banking_ibps',
    state: 'All-India / Central',
    stages: ['Prelims (Objective CBT - 60 Min)', 'Mains (Objective + Descriptive)', 'Interview'],
    eligibility: 'Graduation in any discipline from a recognized University',
    frequency: 'Annual (October - November)',
    totalMarksPattern: 'Prelims: 100 Marks (100 Qs: 30 English + 35 Quant + 35 Reasoning) - 20 Min per section',
    negativeMarking: '-0.25 Marks per wrong response (1/4th penalty)',
    languagesAvailable: ['en', 'hi'],
    testCountReady: 30,
    featuredTestSlug: 'ibps-po-prelims-grand-mock-test',
    isHotTrending: true,
    popularSearchTerms: ['ibps po mock test', 'bank po test series', 'ibps po prelims free test', 'ibps sectional timer test'],
    summaryOverview: 'National level recruitment for Officer Scale-I vacancies in 11 participating public sector banks across India including PNB, Bank of Baroda, Canara Bank, and Union Bank.',
    syllabusHighlights: ['Quantitative Aptitude & DI (35 Qs)', 'Reasoning Ability & Puzzles (35 Qs)', 'English Language Reading Comprehension & Cloze Test (30 Qs)']
  },
  // 5. SBI PO
  {
    id: 'sbi_po_prelims',
    code: 'SBI-PO-PRE',
    name: 'SBI Probationary Officer (SBI PO)',
    nameHindi: 'भारतीय स्टेट बैंक प्रोबेशनरी ऑफिसर परीक्षा',
    authority: 'State Bank of India',
    authorityShort: 'SBI',
    sector: 'sbi_rbi_financial',
    state: 'All-India / Central',
    stages: ['Phase I (Prelims)', 'Phase II (Mains + Descriptive)', 'Phase III (Psychometric Test + GE + Interview)'],
    eligibility: 'Graduation in any discipline',
    frequency: 'Annual',
    totalMarksPattern: 'Phase I: 100 Marks (100 Qs: 30 English + 35 Quant + 35 Reasoning) - 60 Mins with Sectional Locks',
    negativeMarking: '-0.25 Marks per incorrect answer',
    languagesAvailable: ['en', 'hi'],
    testCountReady: 25,
    featuredTestSlug: 'sbi-po-prelims-all-india-mock-test',
    isHotTrending: true,
    popularSearchTerms: ['sbi po mock test', 'sbi po free online test', 'sbi po prelims test series'],
    summaryOverview: 'Premier banking recruitment into India\'s largest public lender, offering accelerated career growth to top managerial cadres in State Bank of India.',
    syllabusHighlights: ['Quantitative Aptitude & High-Level DI', 'Reasoning Puzzles, Seating Arrangements & Critical Reasoning', 'English Error Spotting & Paragraph Fillers']
  },
  // 6. RBI Grade B
  {
    id: 'rbi_grade_b_phase1',
    code: 'RBI-GR-B-P1',
    name: 'RBI Grade B Officer (Phase 1 Examination)',
    nameHindi: 'भारतीय रिज़र्व बैंक ग्रेड बी अधिकारी परीक्षा',
    authority: 'Reserve Bank of India Services Board',
    authorityShort: 'RBI',
    sector: 'sbi_rbi_financial',
    state: 'All-India / Central',
    stages: ['Phase 1 (Objective Online Exam - 200 Marks)', 'Phase 2 (ESI + FM + English)', 'Phase 3 (Interview)'],
    eligibility: 'Graduation with min 60% marks (50% for SC/ST/PwD)',
    frequency: 'Annual',
    totalMarksPattern: '200 Marks (200 Qs: 80 GA + 60 Reasoning + 30 English + 30 Quant) - 120 Minutes',
    negativeMarking: '-0.25 Marks per wrong response',
    languagesAvailable: ['en', 'hi'],
    testCountReady: 18,
    featuredTestSlug: 'rbi-grade-b-phase-1-all-india-mock-test',
    isHotTrending: true,
    popularSearchTerms: ['rbi grade b mock test', 'rbi grade b phase 1 test series', 'rbi grade b free mock'],
    summaryOverview: 'India\'s most prestigious central banking career, directly formulating monetary policy, foreign exchange supervision, and financial system regulations.',
    syllabusHighlights: ['Economic & Banking Current Affairs & RBI Bulletins (80 Qs)', 'High-Level Logical Reasoning & Machine Input (60 Qs)', 'Quantitative Aptitude (30 Qs)', 'Advanced English Comprehension (30 Qs)']
  },
  // 7. NEET UG
  {
    id: 'neet_ug_national',
    code: 'NEET-UG',
    name: 'NEET UG (National Eligibility cum Entrance Test)',
    nameHindi: 'राष्ट्रीय पात्रता सह प्रवेश परीक्षा (नीट यूजी)',
    authority: 'National Testing Agency',
    authorityShort: 'NTA',
    sector: 'medical_neet_nursing',
    state: 'All-India / Central',
    stages: ['Single Stage Pen-and-Paper / CBT (200 Qs, attempt 180 Qs) - 200 Minutes'],
    eligibility: '10+2 with Physics, Chemistry, Biology/Biotechnology & English (Min 50%)',
    frequency: 'Annual (First Sunday of May)',
    totalMarksPattern: '720 Marks (180 Qs: 45 Physics + 45 Chemistry + 90 Biology/Botany/Zoology)',
    negativeMarking: '+4 Marks for correct, -1 Mark for incorrect response',
    languagesAvailable: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'or', 'gu', 'kn', 'ml', 'pa', 'as', 'ur'],
    testCountReady: 35,
    featuredTestSlug: 'neet-ug-grand-all-india-mock-test',
    isHotTrending: true,
    popularSearchTerms: ['neet ug mock test', 'neet free online test series', 'neet 720 marks full mock', 'neet biology mock test'],
    summaryOverview: 'Sole entrance gateway for admission to MBBS, BDS, BAMS, BHMS, BSMS, and B.Sc Nursing across AIIMS, JIPMER, Central Universities, and state medical colleges.',
    syllabusHighlights: ['Physics: Mechanics, Electrodynamics, Modern Physics, Thermodynamics', 'Chemistry: Organic Reactions, Inorganic NCERT Line-by-Line, Physical Chemistry', 'Biology: Genetics, Human Physiology, Plant Physiology, Ecology, Cell Biology']
  },
  // 8. JEE Main
  {
    id: 'jee_main_nta',
    code: 'JEE-MAIN',
    name: 'JEE Main (Joint Entrance Examination)',
    nameHindi: 'संयुक्त प्रवेश परीक्षा (जेईई मेन)',
    authority: 'National Testing Agency',
    authorityShort: 'NTA',
    sector: 'engineering_jee_gate',
    state: 'All-India / Central',
    stages: ['Session 1 (January)', 'Session 2 (April)', 'Qualifying for JEE Advanced'],
    eligibility: '10+2 with Physics and Mathematics along with Chemistry/Biotech/Technical subject',
    frequency: 'Twice a year (Jan & April)',
    totalMarksPattern: '300 Marks (75 Qs to attempt: 25 Physics + 25 Chemistry + 25 Mathematics - MCQs & Numericals)',
    negativeMarking: '+4 for correct, -1 for incorrect (both MCQs & Numerical Entry)',
    languagesAvailable: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'or', 'gu', 'kn', 'ml', 'pa', 'as', 'ur'],
    testCountReady: 30,
    featuredTestSlug: 'jee-main-full-syllabus-all-india-mock',
    isHotTrending: true,
    popularSearchTerms: ['jee main mock test', 'jee main cbt test series', 'jee main free mock test 300 marks', 'jee numerical practice'],
    summaryOverview: 'National entrance examination for admissions into NITs, IIITs, CFTIs and the screening benchmark for the top 2.5 lakh candidates eligible for JEE Advanced (IITs).',
    syllabusHighlights: ['Physics: Kinematics, Rotational Motion, Optics, Current Electricity, Semiconductor Devices', 'Chemistry: Coordination Compounds, Chemical Bonding, Organic Mechanisms, Equilibrium', 'Mathematics: Calculus, Vectors & 3D, Matrices & Determinants, Coordinate Geometry']
  },
  // 9. GATE CSE
  {
    id: 'gate_cse_tech',
    code: 'GATE-CSE',
    name: 'GATE (Graduate Aptitude Test in Engineering - CSE/IT)',
    nameHindi: 'ग्रेजुएट एप्टीट्यूड टेस्ट इन इंजीनियरिंग (कंप्यूटर साइंस)',
    authority: 'IITs & IISc Bangalore',
    authorityShort: 'GATE',
    sector: 'engineering_jee_gate',
    state: 'All-India / Central',
    stages: ['Single Stage Online CBT (65 Questions - 100 Marks - 3 Hours)'],
    eligibility: 'B.E. / B.Tech / M.Sc / MCA or final year engineering undergraduates',
    frequency: 'Annual (February)',
    totalMarksPattern: '100 Marks (65 Qs: 15 General Aptitude + 85 CSE Core - MCQs, MSQs, NATs)',
    negativeMarking: '1-mark MCQ: -0.33; 2-mark MCQ: -0.66; Zero penalty for MSQs & NATs',
    languagesAvailable: ['en'],
    testCountReady: 20,
    featuredTestSlug: 'gate-cse-full-length-cbt-mock-test',
    isHotTrending: true,
    popularSearchTerms: ['gate cse mock test', 'gate computer science test series', 'gate free online test', 'gate nat question practice'],
    summaryOverview: 'Direct gateway for admissions into M.Tech/Ph.D at IISc/IITs/NITs and recruitment into premier PSUs like ONGC, IOCL, NTPC, POSOCO, and DRDO.',
    syllabusHighlights: ['Algorithms & Data Structures', 'Computer Networks & Network Security', 'Operating Systems & Concurrency', 'Theory of Computation & Compiler Design', 'Databases (DBMS & SQL)', 'Discrete Mathematics & Linear Algebra']
  },
  // 10. CTET
  {
    id: 'ctet_paper1_2',
    code: 'CTET-CENTRAL',
    name: 'Central Teacher Eligibility Test (CTET Paper 1 & 2)',
    nameHindi: 'केंद्रीय शिक्षक पात्रता परीक्षा (सीटीईटी)',
    authority: 'Central Board of Secondary Education',
    authorityShort: 'CBSE',
    sector: 'teaching_tet_ctet',
    state: 'All-India / Central',
    stages: ['Paper 1 (Class 1 to 5 Primary)', 'Paper 2 (Class 6 to 8 Upper Primary)'],
    eligibility: 'D.El.Ed / B.Ed / Integrated B.El.Ed',
    frequency: 'Twice a year (January & July/August)',
    totalMarksPattern: '150 Marks (150 MCQs: CDP 30 + Lang I 30 + Lang II 30 + Math 30 + EVS/Science 30) - 150 Mins',
    negativeMarking: 'No Negative Marking (0 marks penalty)',
    languagesAvailable: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'or', 'gu', 'kn', 'pa', 'ml', 'sa'],
    testCountReady: 25,
    featuredTestSlug: 'ctet-paper-1-and-2-grand-mock-test',
    isHotTrending: true,
    popularSearchTerms: ['ctet mock test', 'ctet paper 1 test series', 'ctet paper 2 mock test', 'ctet free cdp practice'],
    summaryOverview: 'Mandatory eligibility certification for appointment as school teacher in KVS, NVS, Central Tibetan Schools, and schools under UTs of Delhi, Chandigarh, and Pan-India.',
    syllabusHighlights: ['Child Development & Pedagogy (CDP)', 'Concept of Inclusive Education & Children with Special Needs (PwD/Divyangjan)', 'Learning Pedagogy & Cognitive Development', 'Language 1 & Language 2 Comprehension & Pedagogy', 'Mathematics & Environmental Studies (EVS)']
  },
  // 11. UP Police Constable & SI
  {
    id: 'up_police_constable',
    code: 'UP-POLICE-CONST',
    name: 'UP Police Constable & Sub-Inspector Recruitment',
    nameHindi: 'उत्तर प्रदेश पुलिस कांस्टेबल एवं उप-निरीक्षक भर्ती परीक्षा',
    authority: 'Uttar Pradesh Police Recruitment & Promotion Board',
    authorityShort: 'UPPRPB',
    sector: 'police_state_cadres',
    state: 'Uttar Pradesh',
    stages: ['Written Examination (CBT/OMR)', 'Document Verification & Physical Standard Test (PST)', 'Physical Efficiency Test (PET)'],
    eligibility: '10+2 Pass for Constable; Graduation for Sub-Inspector',
    frequency: 'State Government Notified',
    totalMarksPattern: '300 Marks (150 Questions: General Hindi 37 + General Knowledge 38 + Numerical Aptitude 38 + Mental Ability 37)',
    negativeMarking: '-0.50 Marks per wrong answer',
    languagesAvailable: ['hi', 'en'],
    testCountReady: 25,
    featuredTestSlug: 'up-police-constable-grand-mock-test',
    isHotTrending: true,
    popularSearchTerms: ['up police mock test', 'up police constable practice set in hindi', 'up police si test series', 'up police free mock'],
    summaryOverview: 'Massive recruitment for 60,000+ Constables and Sub-Inspectors in Uttar Pradesh Civil Police, PAC, and Special Security Forces.',
    syllabusHighlights: ['General Hindi (सामान्य हिन्दी व व्याकरण)', 'General Knowledge & UP Specific GK (सामान्य ज्ञान व यूपी विशेष)', 'Numerical & Mental Ability (संख्यात्मक एवं मानसिक योग्यता)', 'Mental Aptitude, IQ & Reasoning (मानसिक अभिरुचि व तार्किक क्षमता)']
  },
  // 12. BPSC CCE (Bihar Public Service Commission)
  {
    id: 'bpsc_cce_prelims',
    code: 'BPSC-CCE-PRE',
    name: 'BPSC Combined Competitive Examination (BPSC CCE)',
    nameHindi: 'बिहार लोक सेवा आयोग संयुक्त प्रतियोगी परीक्षा',
    authority: 'Bihar Public Service Commission',
    authorityShort: 'BPSC',
    sector: 'state_psc_all_28',
    state: 'Bihar',
    stages: ['Prelims (Objective - 150 Qs)', 'Mains (Written Descriptive - 900 Marks)', 'Interview (120 Marks)'],
    eligibility: 'Graduation in any stream from recognized University',
    frequency: 'Annual (September - October)',
    totalMarksPattern: '150 Marks (150 Qs: History, Bihar Special, Polity, Economy, Geography, Current Affairs, Science, Mental Ability) - 2 Hours',
    negativeMarking: '-0.33 Marks per wrong answer (1/3rd penalty)',
    languagesAvailable: ['hi', 'en'],
    testCountReady: 22,
    featuredTestSlug: 'bpsc-cce-prelims-all-bihar-grand-mock',
    isHotTrending: true,
    popularSearchTerms: ['bpsc mock test', 'bpsc prelims test series in hindi', 'bpsc bihar special test', 'bpsc 70th cce mock test'],
    summaryOverview: 'Premier administrative recruitment for Deputy Collector (SDM), Deputy Superintendent of Police (DSP), Commercial Tax Officer, and Revenue Officers in Bihar.',
    syllabusHighlights: ['Bihar History, Art & Culture, Ancient Magadha & Champaran Satyagraha', 'General Science & Tech', 'Indian National Movement & Bihar\'s Role in 1857 & 1942', 'Indian Polity & Bihar Panchayati Raj', 'National & International Current Affairs']
  },
  // 13. MPSC Rajyaseva (Maharashtra)
  {
    id: 'mpsc_rajyaseva_pre',
    code: 'MPSC-RAJ-PRE',
    name: 'MPSC Rajyaseva Civil Services (MPSC State Services)',
    nameHindi: 'महाराष्ट्र लोकसेवा आयोग राज्यसेवा परीक्षा',
    nameRegional: 'महाराष्ट्र लोकसेवा आयोग राज्यसेवा पूर्व परीक्षा',
    regionalLanguageCode: 'mr',
    authority: 'Maharashtra Public Service Commission',
    authorityShort: 'MPSC',
    sector: 'state_psc_all_28',
    state: 'Maharashtra',
    stages: ['Prelims (Paper 1 GS + Paper 2 CSAT)', 'Mains (Descriptive UPSC Pattern)', 'Interview'],
    eligibility: 'Degree from a recognized University, Marathi language proficiency',
    frequency: 'Annual',
    totalMarksPattern: 'Paper 1 GS: 200 Marks (100 Qs) + Paper 2 CSAT: 200 Marks (80 Qs, Qualifying 33%)',
    negativeMarking: '-0.50 Marks (1/4th penalty) per wrong answer',
    languagesAvailable: ['mr', 'en'],
    testCountReady: 24,
    featuredTestSlug: 'mpsc-rajyaseva-prelims-grand-mock-marathi',
    isHotTrending: true,
    popularSearchTerms: ['mpsc mock test in marathi', 'mpsc rajyaseva test series', 'mpsc combine group b c mock test', 'mpsc free online test'],
    summaryOverview: 'State civil services recruitment for Deputy Collector, Deputy SP / ACP, Tehsildar, Naib Tehsildar, and Block Development Officers in Maharashtra.',
    syllabusHighlights: ['Maharashtra History, Social Reformers (Jyotirao Phule, Shahu Maharaj, Dr. Ambedkar)', 'Geography of Maharashtra & Western Ghats', 'Indian Constitution & Maharashtra State Governance', 'Agriculture & Maharashtra Economy', 'Environmental Ecology & General Science']
  },
  // 14. OPSC OAS & OSSSC (Odisha)
  {
    id: 'opsc_ocs_prelims',
    code: 'OPSC-OCS-PRE',
    name: 'OPSC Odisha Civil Services (OAS / OPS / OFS)',
    nameHindi: 'ओडिशा लोक सेवा आयोग सिविल सेवा परीक्षा',
    nameRegional: 'ଓଡ଼ିଶା ଲୋକସେବା ଆୟୋଗ ସିଭିଲ୍ ସର୍ଭିସେସ୍ ପରୀକ୍ଷା (OAS)',
    regionalLanguageCode: 'or',
    authority: 'Odisha Public Service Commission',
    authorityShort: 'OPSC',
    sector: 'state_psc_all_28',
    state: 'Odisha',
    stages: ['Prelims (Paper 1 GS 200 Marks + Paper 2 CSAT 200 Marks)', 'Mains (Written - 7 Papers)', 'Personality Test'],
    eligibility: 'Bachelor\'s Degree with Odia language up to Class 7 standard',
    frequency: 'Annual',
    totalMarksPattern: 'Paper 1: 200 Marks (100 Qs: 2 Marks each) | Paper 2 CSAT: 200 Marks (Qualifying 33%)',
    negativeMarking: '-0.66 Marks per wrong answer (1/3rd penalty)',
    languagesAvailable: ['en', 'or'],
    testCountReady: 26,
    featuredTestSlug: 'opsc-oas-prelims-paper-1-grand-mock',
    isHotTrending: true,
    popularSearchTerms: ['opsc oas mock test', 'opsc test series in odia', 'osssc cgl mock test', 'opsc free online test'],
    summaryOverview: 'Recruitment for Odisha Administrative Service (OAS Group A), Odisha Police Service (OPS), Odisha Finance Service (OFS), and Odisha Revenue Service (ORS).',
    syllabusHighlights: ['History of Odisha & Indian Freedom Movement in Odisha', 'Geography of Odisha (Chilika, Mahanadi basin, Minerals)', 'Odia Literature & Cultural Heritage', 'Indian Polity & Panchayati Raj in Odisha', 'Current National & Odisha State Affairs']
  },
  // 15. TNPSC Group 1 & Group 4 (Tamil Nadu)
  {
    id: 'tnpsc_group_1_4',
    code: 'TNPSC-GRP1-4',
    name: 'TNPSC Combined Civil Services (Group 1, 2, 4 & VAO)',
    nameHindi: 'तमिलनाडु लोक सेवा आयोग ग्रुप 1 एवं 4 परीक्षा',
    nameRegional: 'தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம் குரூப் 1 & 4 தேர்வு',
    regionalLanguageCode: 'ta',
    authority: 'Tamil Nadu Public Service Commission',
    authorityShort: 'TNPSC',
    sector: 'state_psc_all_28',
    state: 'Tamil Nadu',
    stages: ['Prelims (Single Paper - 200 Qs - 300 Marks)', 'Mains (Written)', 'Interview / Document Verification'],
    eligibility: 'SSLC for Group 4 / Degree for Group 1 & 2 with Tamil Language proficiency',
    frequency: 'Annual',
    totalMarksPattern: '300 Marks (200 Questions: General Studies 75 + Aptitude 25 + General Tamil / General English 100) - 3 Hours',
    negativeMarking: 'No Negative Marking in TNPSC Prelims',
    languagesAvailable: ['ta', 'en'],
    testCountReady: 25,
    featuredTestSlug: 'tnpsc-group-4-and-vao-grand-mock-tamil',
    isHotTrending: true,
    popularSearchTerms: ['tnpsc mock test in tamil', 'tnpsc group 4 free online test', 'tnpsc group 1 test series', 'tnpsc vao mock test'],
    summaryOverview: 'State administration recruitment for Deputy Collector, DSP, Commercial Tax Officer (Group 1) and Village Administrative Officer (VAO), Junior Assistant (Group 4).',
    syllabusHighlights: ['History, Culture, Heritage and Socio-Political Movements in Tamil Nadu (Unit 8)', 'Development Administration in Tamil Nadu (Unit 9)', 'Thirukkural, Dravidian Movement & Justice Party', 'Mental Aptitude & Simplification (25 Qs)', 'General Science, Geography & Polity']
  },
  // 16. AIIMS NORCET
  {
    id: 'aiims_norcet_nursing',
    code: 'AIIMS-NORCET',
    name: 'AIIMS NORCET Nursing Officer Recruitment',
    nameHindi: 'एम्स नॉर्सेट नर्सिंग ऑफिसर भर्ती परीक्षा',
    authority: 'All India Institute of Medical Sciences',
    authorityShort: 'AIIMS',
    sector: 'medical_neet_nursing',
    state: 'All-India / Central',
    stages: ['NORCET Prelims (Stage I CBT - 100 Qs)', 'NORCET Mains (Stage II Clinical Scenario CBT - 100 Qs)'],
    eligibility: 'B.Sc Nursing / Post-Basic B.Sc Nursing / GNM with 2 years hospital experience',
    frequency: 'Twice a year',
    totalMarksPattern: '100 Marks (100 Qs: 80% Nursing Core + 20% GK & Aptitude) - 90 Minutes',
    negativeMarking: '-0.33 Marks per wrong answer (1/3rd penalty)',
    languagesAvailable: ['en', 'hi', 'or'],
    testCountReady: 25,
    featuredTestSlug: 'aiims-norcet-2026-grand-mock',
    isHotTrending: true,
    popularSearchTerms: ['norcet mock test', 'aiims nursing officer test series', 'norcet stage 2 clinical mock', 'norcet free test'],
    summaryOverview: 'National selection for Nursing Officers (Staff Nurse Grade II) across all AIIMS institutes (New Delhi, Bhubaneswar, Bhopal, Rishikesh, Jodhpur, Patna, etc.) and central govt hospitals.',
    syllabusHighlights: ['Medical-Surgical Nursing & ICU Protocols', 'Obstetrics & Gynecological Nursing', 'Pediatric & Neonatal Nursing', 'Pharmacology, Drug Calculations & Adverse Effects', 'Fundamentals of Nursing & Infection Control', 'General Awareness & Reasoning Aptitude']
  },
  // 17. CAT (Common Admission Test)
  {
    id: 'cat_mba_iim',
    code: 'CAT-IIM-MBA',
    name: 'CAT (Common Admission Test for IIMs & Top B-Schools)',
    nameHindi: 'कैट (कॉमन एडमिशन टेस्ट आईआईएम)',
    authority: 'Indian Institutes of Management (IIMs)',
    authorityShort: 'IIM CAT',
    sector: 'management_cat_mba',
    state: 'All-India / Central',
    stages: ['Single Stage Computer Based Test (66 Questions - 120 Minutes - 40 Mins per Section)'],
    eligibility: 'Bachelor\'s Degree with min 50% marks or equivalent CGPA',
    frequency: 'Annual (Last Sunday of November)',
    totalMarksPattern: '198 Marks (66 Qs: 24 VARC + 20 DILR + 22 QA - MCQs & TITA Non-MCQ)',
    negativeMarking: '+3 Marks for correct MCQ, -1 Mark for wrong MCQ; Zero negative for TITA',
    languagesAvailable: ['en'],
    testCountReady: 18,
    featuredTestSlug: 'cat-full-length-percentile-booster-mock',
    isHotTrending: true,
    popularSearchTerms: ['cat mock test', 'cat free test series', 'cat dilr set practice', 'cat varc rc mock'],
    summaryOverview: 'The premier national entrance exam for admission into MBA/PGP programs at 21 IIMs (Ahmedabad, Bangalore, Calcutta, etc.), FMS Delhi, SPJIMR, and IIT B-Schools.',
    syllabusHighlights: ['VARC: Reading Comprehension Passages, Para Jumbles, Para Summary, Odd One Out', 'DILR: Complex Arrangements, Games & Tournaments, Matrix Puzzles, Data Tables & Charts', 'Quantitative Aptitude: Arithmetic, Algebra, Geometry & Modern Maths']
  },
  // 18. CLAT UG (Common Law Admission Test)
  {
    id: 'clat_ug_nlu',
    code: 'CLAT-UG-NLU',
    name: 'CLAT UG (Common Law Admission Test for NLUs)',
    nameHindi: 'क्लेट यूजी (कॉमन लॉ एडमिशन टेस्ट)',
    authority: 'Consortium of National Law Universities',
    authorityShort: 'NLU Consortium',
    sector: 'law_clat_judiciary',
    state: 'All-India / Central',
    stages: ['Single Stage Offline/CBT (120 Questions - 120 Minutes)'],
    eligibility: '10+2 with minimum 45% marks (40% for SC/ST)',
    frequency: 'Annual (December)',
    totalMarksPattern: '120 Marks (120 Passage-Based MCQs: English 24 + Current Affairs/GK 30 + Legal Reasoning 32 + Logical Reasoning 24 + Quant 10)',
    negativeMarking: '-0.25 Marks per wrong answer (1/4th penalty)',
    languagesAvailable: ['en'],
    testCountReady: 16,
    featuredTestSlug: 'clat-ug-all-india-grand-mock-test',
    isHotTrending: true,
    popularSearchTerms: ['clat mock test', 'clat passage based test series', 'clat legal reasoning mock', 'clat free test'],
    summaryOverview: 'Direct admission gateway to 5-year Integrated LLB (BA LLB, BBA LLB, B.Sc LLB) programs across 24 National Law Universities including NLSIU Bengaluru, NALSAR Hyderabad, and WBNUJS Kolkata.',
    syllabusHighlights: ['Passage-based Legal Reasoning (Constitutional Law, Torts, Contracts, Criminal Law)', 'Current Affairs & Legal GK', 'English Reading Comprehension & Inferences', 'Critical Reasoning & Deductive Logic', 'Quantitative Techniques (Data Interpretation)']
  },
  // 19. State Patwari & Lekhpal
  {
    id: 'state_patwari_lekhpal',
    code: 'STATE-PATWARI-LEK',
    name: 'State Revenue Patwari, Lekhpal & VDO Combined',
    nameHindi: 'राज्य पटवारी, लेखपाल एवं ग्राम विकास अधिकारी भर्ती परीक्षा',
    authority: 'State Subordinate Services Selection Boards (UPSSSC, RSSB, HSSC, MPESB)',
    authorityShort: 'SSSC / Vyapam',
    sector: 'clerical_patwari_state',
    state: 'All-India / Central',
    stages: ['Written Competitive Examination (CBT/OMR) + Document Verification'],
    eligibility: '12th Pass / Graduate + Computer Certificate (CCC or equivalent)',
    frequency: 'State Government Notified',
    totalMarksPattern: '100-200 Marks (General Hindi, Village Society & Rural Development, Mathematics, General Knowledge)',
    negativeMarking: '-0.25 to -0.33 Marks per incorrect response',
    languagesAvailable: ['hi', 'en', 'mr', 'or', 'pa', 'gu'],
    testCountReady: 24,
    featuredTestSlug: 'upsssc-lekhpal-and-patwari-grand-mock-test',
    isHotTrending: true,
    popularSearchTerms: ['patwari mock test', 'up lekhpal test series', 'rajasthan patwari free mock', 'gram vikas adhikari vdo mock test'],
    summaryOverview: 'Ground-level revenue administration and rural development recruitment covering land record management, mutation, crop insurance surveys, and village panchayat execution.',
    syllabusHighlights: ['Rural Society & Village Development (ग्राम्य समाज एवं विकास व सरकारी योजनाएं)', 'General Hindi & Official Drafting', 'Mathematics & Land Measurement (Bigha, Acre, Hectare calculations)', 'General Knowledge & State Geography']
  },
  // 20. CA Foundation (ICAI)
  {
    id: 'ca_foundation_icai',
    code: 'CA-FOUNDATION',
    name: 'CA Foundation Examination (ICAI Chartered Accountancy)',
    nameHindi: 'सीए फाउंडेशन परीक्षा (आईसीएआई)',
    authority: 'Institute of Chartered Accountants of India',
    authorityShort: 'ICAI',
    sector: 'commerce_ca_cma_cs',
    state: 'All-India / Central',
    stages: ['CA Foundation (4 Papers)', 'CA Intermediate (6 Papers)', 'Articleship & CA Final'],
    eligibility: '10+2 Pass registered with Board of Studies (ICAI)',
    frequency: 'Thrice a year (January, May/June, September)',
    totalMarksPattern: '400 Marks (Paper 1: Accounting + Paper 2: Business Laws + Paper 3: Quant Aptitude + Paper 4: Business Economics)',
    negativeMarking: '-0.25 Marks in Objective Papers (Paper 3 & Paper 4)',
    languagesAvailable: ['en', 'hi'],
    testCountReady: 15,
    featuredTestSlug: 'ca-foundation-principles-of-accounting-mock',
    isHotTrending: true,
    popularSearchTerms: ['ca foundation mock test', 'icai ca foundation test series', 'ca foundation free mcq practice', 'ca foundation accounts mock'],
    summaryOverview: 'Entry level exam to India\'s most prestigious commerce profession, qualifying candidates for corporate auditing, financial taxation, advisory, and CFO roles.',
    syllabusHighlights: ['Accounting: Partnership Accounts, Depreciation, Bank Reconciliation, Final Accounts', 'Business Laws: Indian Contract Act, Sale of Goods Act, Companies Act 2013', 'Quantitative Aptitude: Mathematics of Finance, Permutations, Statistics, Correlation', 'Business Economics: Micro & Macroeconomic Concepts, Market Structures']
  }
];

export function getMasterExamById(id: string): MasterExamDefinition | undefined {
  return MASTER_EXAMS_DATABASE.find(e => e.id === id || e.code === id || e.featuredTestSlug === id);
}

export function getExamsBySector(sectorId: string): MasterExamDefinition[] {
  if (sectorId === 'all') return MASTER_EXAMS_DATABASE;
  return MASTER_EXAMS_DATABASE.filter(e => e.sector === sectorId);
}

export function getExamsByState(stateName: string): MasterExamDefinition[] {
  if (!stateName || stateName === 'All-India / Central' || stateName === 'all') {
    return MASTER_EXAMS_DATABASE;
  }
  return MASTER_EXAMS_DATABASE.filter(e => e.state === stateName || e.state === 'All-India / Central');
}

export function searchMasterExams(query: string): MasterExamDefinition[] {
  if (!query) return MASTER_EXAMS_DATABASE;
  const q = query.toLowerCase().trim();
  return MASTER_EXAMS_DATABASE.filter(e => 
    e.name.toLowerCase().includes(q) ||
    (e.nameHindi && e.nameHindi.toLowerCase().includes(q)) ||
    (e.nameRegional && e.nameRegional.toLowerCase().includes(q)) ||
    e.code.toLowerCase().includes(q) ||
    e.authority.toLowerCase().includes(q) ||
    e.authorityShort.toLowerCase().includes(q) ||
    e.state.toLowerCase().includes(q) ||
    e.popularSearchTerms.some(term => term.toLowerCase().includes(q)) ||
    e.syllabusHighlights.some(s => s.toLowerCase().includes(q))
  );
}
