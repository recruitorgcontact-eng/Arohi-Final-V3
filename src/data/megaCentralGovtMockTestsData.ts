import { MockTest } from '../types/examTypes';

export const MEGA_CENTRAL_GOVT_MOCK_TESTS: MockTest[] = [
  // 1. UPSC CSE Prelims CSAT Paper-2
  {
    id: 'test_upsc_csat_paper2_mock',
    slug: 'upsc-civil-services-csat-paper-2-mock',
    title: 'UPSC CSE CSAT (Paper-2) • Reading Comprehension & Analytical Reasoning',
    titleOdia: 'UPSC ସିଭିଲ୍ ସର୍ଭିସେସ୍ CSAT (ପେପର-୨) • ରିଜନିଂ ଓ କମ୍ପ୍ରିହେନସନ୍ ମକ୍',
    shortDescription: 'Union Public Service Commission CSAT Qualifying Paper: Critical Reading, Logical Deduction, Data Sufficiency, and Syllogisms.',
    mainCategory: 'competitive_central',
    subCategory: 'upsc_prelims',
    categoryLabel: 'Central Recruitment',
    targetExam: 'UPSC CSE CSAT 2026',
    gradeOrClass: 'Graduate in Any Discipline',
    board: 'Union Public Service Commission (UPSC)',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 50,
    isLive: true,
    isFree: true,
    featuredBadge: 'UPSC CSAT Qualifying',
    attemptsCount: 35600,
    averageScore: 32.8,
    cutoffEstimated: 33.3,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['20 Questions (+2.5 marks per correct answer, -0.83 mark penalty per incorrect answer).'],
    sections: [{ id: 'sec_csat', name: 'CSAT Paper-2', totalQuestions: 20, totalMarks: 50, positiveMarksPerQuestion: 2.5, negativeMarksPerQuestion: 0.83 }],
    questions: [
      {
        id: 'csat_q1',
        questionNumber: 1,
        sectionId: 'sec_csat',
        sectionName: 'Logical Reasoning',
        subject: 'General Mental Ability',
        topic: 'Direction Sense & Vectors',
        type: 'single_choice',
        text: 'A person walks 12 km towards North, then turns right and walks 5 km. How far and in which direction is the person now from the original starting point?',
        options: [
          { id: 'A', text: '13 km North-East (Hypotenuse = √(12² + 5²) = √(144 + 25) = √169 = 13 km)' },
          { id: 'B', text: '17 km North-East' },
          { id: 'C', text: '13 km South-West' },
          { id: 'D', text: '7 km North' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.5,
        negativeMarks: 0.83,
        difficulty: 'easy',
        explanation: 'By Pythagoras theorem: Distance = √(12² + 5²) = √(144 + 25) = √169 = 13 km in the North-East direction.',
        referenceNotes: 'UPSC CSAT Analytical Reasoning'
      }
    ]
  },

  // 2. UPSC Combined Defence Services (CDS)
  {
    id: 'test_upsc_cds_defence_mock',
    slug: 'upsc-cds-combined-defence-services-officer-mock',
    title: 'UPSC CDS (IMA, OTA, AFA, INA) • General Knowledge & Elementary Math',
    titleOdia: 'UPSC CDS (ସମ୍ମିଳିତ ପ୍ରତିରକ୍ଷା ସେବା) • ଅଫିସର କ୍ୟାଡେଟ୍ ସିବିଟି ମକ୍',
    shortDescription: 'UPSC CDS Officer Entry: Modern Indian History, Physical Geography, International Geopolitics, and Arithmetic.',
    mainCategory: 'competitive_central',
    subCategory: 'defence_cds',
    categoryLabel: 'Central Recruitment',
    targetExam: 'UPSC CDS 2026',
    gradeOrClass: 'Graduate in Any Discipline / Engineering',
    board: 'Union Public Service Commission (UPSC)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'Military Officer Cadet',
    attemptsCount: 31400,
    averageScore: 14.8,
    cutoffEstimated: 16.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['Marking: +1.0 for correct, -0.33 for incorrect response.'],
    sections: [{ id: 'sec_cds', name: 'General Knowledge', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }],
    questions: [
      {
        id: 'cds_q1',
        questionNumber: 1,
        sectionId: 'sec_cds',
        sectionName: 'General Knowledge',
        subject: 'Defence & Geography',
        topic: 'Strategic Straits & Maritime Chokepoints',
        type: 'single_choice',
        text: 'Which strategic maritime strait connects the Persian Gulf with the Gulf of Oman and is a primary corridor for global petroleum transit?',
        options: [
          { id: 'A', text: 'Strait of Hormuz' },
          { id: 'B', text: 'Strait of Malacca' },
          { id: 'C', text: 'Bab-el-Mandeb' },
          { id: 'D', text: 'Strait of Gibraltar' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'The Strait of Hormuz is located between Oman and Iran, connecting the Persian Gulf with the Gulf of Oman and the Arabian Sea.',
        referenceNotes: 'UPSC CDS World Geography & Maritime Strategy'
      }
    ]
  },

  // 3. UPSC CAPF (Assistant Commandant)
  {
    id: 'test_upsc_capf_ac_paper1',
    slug: 'upsc-capf-assistant-commandant-paper-1-mock',
    title: 'UPSC CAPF (Assistant Commandant) • General Ability & Intelligence Paper-1',
    titleOdia: 'UPSC CAPF (ସହକାରୀ କମାଣ୍ଡାଣ୍ଟ) • ଜେନେରାଲ ଏବିଲିଟି ଓ ଇଣ୍ଟେଲିଜେନ୍ସ ମକ୍',
    shortDescription: 'CRPF, BSF, CISF, ITBP, SSB Assistant Commandant: Internal Security, Indian Polity, Modern History, and General Science.',
    mainCategory: 'competitive_central',
    subCategory: 'defence_capf',
    categoryLabel: 'Central Recruitment',
    targetExam: 'UPSC CAPF AC 2026',
    gradeOrClass: 'Bachelor\'s Degree in Any Discipline',
    board: 'Union Public Service Commission (UPSC)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 50,
    isLive: true,
    isFree: true,
    featuredBadge: 'Paramilitary Gazetted Officer',
    attemptsCount: 28900,
    averageScore: 31.4,
    cutoffEstimated: 34.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+2.0 marks per correct, -0.66 mark penalty).'],
    sections: [{ id: 'sec_capf', name: 'General Ability Paper-1', totalQuestions: 25, totalMarks: 50, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 }],
    questions: [
      {
        id: 'capf_q1',
        questionNumber: 1,
        sectionId: 'sec_capf',
        sectionName: 'Polity & Security',
        subject: 'Indian Polity',
        topic: 'Emergency Provisions & Article 356',
        type: 'single_choice',
        text: 'Under Article 356 of the Indian Constitution, President\'s Rule can be imposed in a state on the grounds of failure of constitutional machinery. What is the maximum period it can remain in force with repeated parliamentary approvals?',
        options: [
          { id: 'A', text: '3 Years (Subject to 6-month periodic parliamentary approval)' },
          { id: 'B', text: '1 Year' },
          { id: 'C', text: '6 Months only' },
          { id: 'D', text: 'Indefinitely' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'medium',
        explanation: 'President\'s Rule can be extended every six months up to a maximum period of three years with the approval of both Houses of Parliament.',
        referenceNotes: 'M. Laxmikanth - Indian Polity Emergency Provisions'
      }
    ]
  },

  // 4. AFCAT (Air Force Common Admission Test)
  {
    id: 'test_afcat_air_force_officer_mock',
    slug: 'afcat-air-force-officer-general-awareness-reasoning',
    title: 'AFCAT (Indian Air Force) • Verbal, Numerical, Reasoning & Military Aptitude',
    titleOdia: 'AFCAT (ଭାରତୀୟ ବାୟୁସେନା) • ଫ୍ଲାଇଙ୍ଗ ଓ ଗ୍ରାଉଣ୍ଡ ଡ୍ୟୁଟି ଅଫିସର ମକ୍',
    shortDescription: 'IAF Officer Selection: Military Aircraft Awareness, Spatial Reasoning, Speed Math, and English Comprehension.',
    mainCategory: 'competitive_central',
    subCategory: 'defence_afcat',
    categoryLabel: 'Central Recruitment',
    targetExam: 'AFCAT 2026',
    gradeOrClass: 'Graduate with 60% / B.Tech',
    board: 'Indian Air Force (IAF)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 75,
    isLive: true,
    isFree: true,
    featuredBadge: 'IAF Officer Entry',
    attemptsCount: 33100,
    averageScore: 49.2,
    cutoffEstimated: 54.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+3 marks for correct, -1 mark penalty for wrong answer).'],
    sections: [{ id: 'sec_afcat', name: 'AFCAT Core Paper', totalQuestions: 25, totalMarks: 75, positiveMarksPerQuestion: 3.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'afcat_q1',
        questionNumber: 1,
        sectionId: 'sec_afcat',
        sectionName: 'Military Aptitude',
        subject: 'Defence GK',
        topic: 'Indian Air Force Aircraft & Inventory',
        type: 'single_choice',
        text: 'The indigenous light combat aircraft (LCA) developed by Aeronautical Development Agency (ADA) and Hindustan Aeronautics Limited (HAL) is named:',
        options: [
          { id: 'A', text: 'Tejas' },
          { id: 'B', text: 'Rafale' },
          { id: 'C', text: 'Sukhoi Su-30MKI' },
          { id: 'D', text: 'Mirage 2000' }
        ],
        correctAnswer: 'A',
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'LCA Tejas is India\'s single-engine, delta-wing, multirole light fighter aircraft designed by ADA and manufactured by HAL.',
        referenceNotes: 'IAF Aviation & Military Technology'
      }
    ]
  },

  // 5. SSC CPO (Central Police Organization Sub-Inspector)
  {
    id: 'test_ssc_cpo_si_tier1_mock',
    slug: 'ssc-cpo-sub-inspector-delhi-police-capf-mock',
    title: 'SSC CPO (Delhi Police & CAPF SI) • Tier 1 CBT Speed Simulation',
    titleOdia: 'SSC CPO (ଦିଲ୍ଲୀ ପୋଲିସ ଓ CAPF ସବ୍-ଇନ୍ସପେକ୍ଟର) • ଟିୟର-୧ ସିବିଟି ମକ୍',
    shortDescription: 'Sub-Inspector in Delhi Police, CISF, BSF, CRPF, ITBP & SSB: Reasoning, General Knowledge, Quantitative Aptitude, and English.',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_cpo',
    categoryLabel: 'Central Recruitment',
    targetExam: 'SSC CPO SI 2026',
    gradeOrClass: 'Graduate in Any Discipline',
    board: 'Staff Selection Commission (SSC)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'Delhi Police & CAPF SI',
    attemptsCount: 36700,
    averageScore: 16.4,
    cutoffEstimated: 18.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 for correct, -0.25 penalty for wrong answer).'],
    sections: [{ id: 'sec_cpo', name: 'SSC CPO Tier-1', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'cpo_q1',
        questionNumber: 1,
        sectionId: 'sec_cpo',
        sectionName: 'General Awareness',
        subject: 'General Science',
        topic: 'Human Endocrine System & Hormones',
        type: 'single_choice',
        text: 'Which hormone, commonly referred to as the "Emergency Hormone" or "Fight-or-Flight Hormone", is secreted by the adrenal medulla during stress?',
        options: [
          { id: 'A', text: 'Adrenaline (Epinephrine)' },
          { id: 'B', text: 'Insulin' },
          { id: 'C', text: 'Thyroxine' },
          { id: 'D', text: 'Melatonin' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'Adrenaline prepares the body for rapid physical action by increasing heart rate, blood pressure, and blood glucose levels.',
        referenceNotes: 'SSC General Science Biology'
      }
    ]
  },

  // 6. SSC Stenographer Grade C & D
  {
    id: 'test_ssc_steno_grade_cd_mock',
    slug: 'ssc-stenographer-grade-c-d-reasoning-english-gk',
    title: 'SSC Stenographer (Grade C & D) • Reasoning, GK & English Master Mock',
    titleOdia: 'SSC ଷ୍ଟେନୋଗ୍ରାଫର (ଗ୍ରେଡ୍ C & D) • ରିଜନିଂ, ଜିକେ ଓ ଇଂଲିଶ ମକ୍',
    shortDescription: 'General Intelligence, General Awareness, and Comprehensive English Language (Grammar, Idioms & Comprehension without Math section).',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_steno',
    categoryLabel: 'Central Recruitment',
    targetExam: 'SSC Stenographer 2026',
    gradeOrClass: '10+2 Intermediate Pass',
    board: 'Staff Selection Commission (SSC)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: '10+2 Central Govt Steno',
    attemptsCount: 30800,
    averageScore: 17.2,
    cutoffEstimated: 18.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, -0.25 penalty).'],
    sections: [{ id: 'sec_steno', name: 'Steno CBT Paper', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'steno_q1',
        questionNumber: 1,
        sectionId: 'sec_steno',
        sectionName: 'English Language',
        subject: 'English Grammar',
        topic: 'Idioms and Phrases',
        type: 'single_choice',
        text: 'What is the precise meaning of the idiomatic expression "To burn the midnight oil"?',
        options: [
          { id: 'A', text: 'To work or study late into the night' },
          { id: 'B', text: 'To waste fuel carelessly' },
          { id: 'C', text: 'To start a sudden fire' },
          { id: 'D', text: 'To sleep very early' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'To burn the midnight oil means to study or work hard until late at night.',
        referenceNotes: 'SSC English Idioms & Phrases'
      }
    ]
  },

  // 7. SSC Selection Post Phase XII
  {
    id: 'test_ssc_selection_post_phase12',
    slug: 'ssc-selection-post-phase-12-cbt-mock',
    title: 'SSC Selection Post Phase XII • Graduate & Higher Secondary Level CBT',
    titleOdia: 'SSC ସିଲେକ୍ସନ ପୋଷ୍ଟ ଫେଜ୍-୧୨ • ସିବିଟି ଅଲ୍ ଇଣ୍ଡିଆ ମକ୍',
    shortDescription: 'Technical and Non-Technical central department posts: Quantitative, Reasoning, English, and General Awareness.',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_cgl',
    categoryLabel: 'Central Recruitment',
    targetExam: 'SSC Selection Post 2026',
    gradeOrClass: '10th / 10+2 / Graduation',
    board: 'Staff Selection Commission (SSC)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 50,
    isLive: true,
    isFree: true,
    featuredBadge: 'SSC Phase XII',
    attemptsCount: 29800,
    averageScore: 33.1,
    cutoffEstimated: 36.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+2.0 correct, -0.50 penalty).'],
    sections: [{ id: 'sec_sel_post', name: 'Selection Post CBT', totalQuestions: 25, totalMarks: 50, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 }],
    questions: [
      {
        id: 'sp_q1',
        questionNumber: 1,
        sectionId: 'sec_sel_post',
        sectionName: 'Quantitative Aptitude',
        subject: 'Arithmetic',
        topic: 'Simple and Compound Interest',
        type: 'single_choice',
        text: 'What is the compound interest on ₹10,000 for 2 years at an annual interest rate of 10% compounded annually?',
        options: [
          { id: 'A', text: '₹2,100 (A = 10000 × (1.1)² = 10000 × 1.21 = ₹12,100 => CI = 12100 - 10000 = ₹2,100)' },
          { id: 'B', text: '₹2,000' },
          { id: 'C', text: '₹2,200' },
          { id: 'D', text: '₹1,500' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'Amount = P(1 + r/100)ᵗ = 10000(1.1)² = 12100. CI = 12100 - 10000 = ₹2,100.',
        referenceNotes: 'SSC Quantitative Aptitude Mastery'
      }
    ]
  },

  // 8. RRB NTPC Graduate Level CBT-2
  {
    id: 'test_rrb_ntpc_cbt2_grand_mock',
    slug: 'rrb-ntpc-graduate-level-cbt-2-grand-mock',
    title: 'RRB NTPC CBT-2 (Level 4, 5, 6) • Station Master & Traffic Assistant Mock',
    titleOdia: 'ରେଳବାଇ RRB NTPC ସିବିଟି-୨ • ଷ୍ଟେସନ ମାଷ୍ଟର ଓ ଗୁଡ୍ସ ଗାର୍ଡ ମକ୍',
    shortDescription: 'Railway Recruitment Boards CBT-2 Level: 35 General Awareness, 35 Mathematics, and 35 General Intelligence.',
    mainCategory: 'competitive_central',
    subCategory: 'rrb_ntpc',
    categoryLabel: 'Central Recruitment',
    targetExam: 'RRB NTPC CBT-2 2026',
    gradeOrClass: 'Graduate in Any Discipline',
    board: 'Railway Recruitment Boards',
    durationMinutes: 90,
    totalQuestions: 30,
    totalMarks: 30,
    isLive: true,
    isFree: true,
    featuredBadge: 'Station Master Track',
    attemptsCount: 42100,
    averageScore: 21.8,
    cutoffEstimated: 24.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['30 Questions (+1.0 correct, -0.33 penalty per wrong response).'],
    sections: [{ id: 'sec_ntpc2', name: 'NTPC CBT-2 Paper', totalQuestions: 30, totalMarks: 30, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }],
    questions: [
      {
        id: 'ntpc2_q1',
        questionNumber: 1,
        sectionId: 'sec_ntpc2',
        sectionName: 'General Awareness',
        subject: 'Indian Railways & Transport',
        topic: 'KAVACH Automatic Train Protection (ATP) System',
        type: 'single_choice',
        text: 'What is the name of India\'s indigenously developed Automatic Train Protection (ATP) system designed by RDSO to prevent train collisions?',
        options: [
          { id: 'A', text: 'KAVACH' },
          { id: 'B', text: 'SURAKSHA' },
          { id: 'C', text: 'RAKSHAK' },
          { id: 'D', text: 'DRISHTI' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'KAVACH is India\'s cutting-edge indigenous Automatic Train Protection (ATP) system designed to avert Signal Passing At Danger (SPAD) and head-on/rear-end collisions.',
        referenceNotes: 'Indian Railways RDSO Technology Updates'
      }
    ]
  },

  // 9. RRB Junior Engineer (JE) CBT-1
  {
    id: 'test_rrb_je_cbt1_science_math',
    slug: 'rrb-junior-engineer-je-cbt-1-mock',
    title: 'RRB Junior Engineer (JE) • CBT-1 General Science, Math & Reasoning Mock',
    titleOdia: 'ରେଳବାଇ RRB ଜୁନିଅର ଇଞ୍ଜିନିୟର (JE) • ସିବିଟି-୧ ସାଇନ୍ସ ଓ ଗଣିତ ମକ୍',
    shortDescription: 'Diploma/B.Tech Railway JE: Physics, Chemistry, Life Sciences up to 10th standard, Math, and General Awareness.',
    mainCategory: 'competitive_central',
    subCategory: 'rrb_group_d',
    categoryLabel: 'Central Recruitment',
    targetExam: 'RRB JE 2026',
    gradeOrClass: 'Diploma / B.Tech in Engineering',
    board: 'Railway Recruitment Boards',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'Railway Engineering Track',
    attemptsCount: 31200,
    averageScore: 16.2,
    cutoffEstimated: 18.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, -0.33 wrong).'],
    sections: [{ id: 'sec_rrb_je', name: 'RRB JE CBT-1', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }],
    questions: [
      {
        id: 'rje_q1',
        questionNumber: 1,
        sectionId: 'sec_rrb_je',
        sectionName: 'General Science',
        subject: 'Physics',
        topic: 'Ohm\'s Law & Electrical Resistance',
        type: 'single_choice',
        text: 'If the length of a uniform cylindrical metallic wire is stretched to double its original length keeping its volume constant, its new electrical resistance becomes:',
        options: [
          { id: 'A', text: '4 times its original resistance (R ∝ L² when volume is constant => (2)² = 4R)' },
          { id: 'B', text: '2 times' },
          { id: 'C', text: 'Half' },
          { id: 'D', text: 'Remains unchanged' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'When stretched, volume V = A·L is constant. Doubling length halves area (A\' = A/2). Resistance R\' = ρ(2L)/(A/2) = 4(ρL/A) = 4R.',
        referenceNotes: 'NCERT Class 10 Physics Electricity'
      }
    ]
  },

  // 10. IBPS PO Mains Data Analysis & Reasoning Puzzles
  {
    id: 'test_ibps_po_mains_puzzle_drill',
    slug: 'ibps-po-mains-data-analysis-reasoning-puzzles',
    title: 'IBPS PO Mains • High-Level Data Analysis & Floor/Box Seating Puzzles',
    titleOdia: 'IBPS PO ମେନସ୍ • ଉଚ୍ଚ-ସ୍ତରୀୟ ଡାଟା ଆନାଲିସିସ୍ ଓ ସିଟିଂ ପଜଲ୍ସ ମକ୍',
    shortDescription: 'Banking Personnel Selection: Caselet DI, Missing DI, Critical Reasoning, Input-Output, and Banking Awareness.',
    mainCategory: 'competitive_central',
    subCategory: 'ibps_po',
    categoryLabel: 'Central Recruitment',
    targetExam: 'IBPS PO Mains 2026',
    gradeOrClass: 'Graduate in Any Discipline',
    board: 'Institute of Banking Personnel Selection (IBPS)',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 30,
    isLive: true,
    isFree: true,
    featuredBadge: 'Bank PO Mains Master',
    attemptsCount: 29800,
    averageScore: 14.5,
    cutoffEstimated: 16.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['20 Questions (+1.5 for correct, -0.375 for wrong answer).'],
    sections: [{ id: 'sec_ibps_m', name: 'PO Mains High Level', totalQuestions: 20, totalMarks: 30, positiveMarksPerQuestion: 1.5, negativeMarksPerQuestion: 0.375 }],
    questions: [
      {
        id: 'ibps_m_q1',
        questionNumber: 1,
        sectionId: 'sec_ibps_m',
        sectionName: 'Banking Awareness',
        subject: 'Banking & Financial Economy',
        topic: 'Monetary Policy Tools & Repo Rate',
        type: 'single_choice',
        text: 'The interest rate at which the Reserve Bank of India (RBI) provides overnight liquidity to commercial banks against eligible government securities under the Liquidity Adjustment Facility (LAF) is known as:',
        options: [
          { id: 'A', text: 'Repo Rate (Repurchase Option Rate)' },
          { id: 'B', text: 'Reverse Repo Rate' },
          { id: 'C', text: 'Bank Rate' },
          { id: 'D', text: 'Marginal Cost of Funds based Lending Rate (MCLR)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.5,
        negativeMarks: 0.375,
        difficulty: 'easy',
        explanation: 'Repo rate is the key policy rate at which the central bank lends short-term money to commercial banks against pledged government collateral.',
        referenceNotes: 'RBI Monetary Policy Framework'
      }
    ]
  },

  // 11. SBI PO Prelims High-Difficulty Mock
  {
    id: 'test_sbi_po_prelims_expert_drill',
    slug: 'sbi-po-prelims-high-difficulty-quant-reasoning',
    title: 'SBI PO Prelims • High-Difficulty Quantitative, Puzzles & Cloze Test',
    titleOdia: 'SBI PO ପ୍ରିଲିମ୍ସ • କଠିନ କ୍ୱାଣ୍ଟ, ପଜଲ୍ସ ଓ ଇଂରାଜୀ ସିବିଟି ମକ୍',
    shortDescription: 'State Bank of India Probationary Officer pattern: Circular & Linear Seating Arrangements, Quadratic Inequalities, and Error Spotting.',
    mainCategory: 'competitive_central',
    subCategory: 'ibps_po',
    categoryLabel: 'Central Recruitment',
    targetExam: 'SBI PO Prelims 2026',
    gradeOrClass: 'Graduate in Any Discipline',
    board: 'State Bank of India (SBI)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'SBI PO Elite Tier',
    attemptsCount: 35100,
    averageScore: 15.2,
    cutoffEstimated: 17.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, -0.25 penalty).'],
    sections: [{ id: 'sec_sbi_po', name: 'SBI PO Core', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'sbi_po_q1',
        questionNumber: 1,
        sectionId: 'sec_sbi_po',
        sectionName: 'Reasoning Ability',
        subject: 'Reasoning Ability',
        topic: 'Syllogism (Only A Few Case)',
        type: 'single_choice',
        text: 'Statements: "Only a few Pens are Pencils." "All Pencils are Erasers." Conclusions: I. Some Pens are not Pencils. II. All Pens can never be Pencils. Which conclusion(s) logically follow?',
        options: [
          { id: 'A', text: 'Both Conclusion I and Conclusion II follow ("Only a few A are B" inherently implies "Some A are B" AND "Some A are not B")' },
          { id: 'B', text: 'Only Conclusion I follows' },
          { id: 'C', text: 'Only Conclusion II follows' },
          { id: 'D', text: 'Neither follows' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: '"Only a few A are B" is a compound statement meaning both "Some A are B" and "Some A are NOT B" are true facts. Hence, all A can never be B.',
        referenceNotes: 'Banking Syllogism New Pattern Rules'
      }
    ]
  },

  // 12. RBI Grade B Officer Phase-1
  {
    id: 'test_rbi_grade_b_phase1_mock',
    slug: 'rbi-grade-b-officer-phase-1-general-awareness-mock',
    title: 'RBI Grade B Officer • Phase 1 Economic & Financial Awareness Master Mock',
    titleOdia: 'RBI ଗ୍ରେଡ୍ B ଅଫିସର • ଫେଜ୍-୧ ଅର୍ଥନୈତିକ ଓ ବ୍ୟାଙ୍କିଙ୍ଗ ସଚେତନତା ମକ୍',
    shortDescription: 'Reserve Bank of India Direct Recruitment: Macroeconomics, Fiscal Deficit, Monetary Policy Committee (MPC), and International Organizations (IMF, World Bank, BIS).',
    mainCategory: 'competitive_central',
    subCategory: 'rbi_grade_b',
    categoryLabel: 'Central Recruitment',
    targetExam: 'RBI Grade B 2026',
    gradeOrClass: 'Graduation with 60% / Post Graduation',
    board: 'Reserve Bank of India (RBI)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'Apex Central Bank Officer',
    attemptsCount: 28400,
    averageScore: 14.8,
    cutoffEstimated: 16.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, -0.25 penalty).'],
    sections: [{ id: 'sec_rbi', name: 'RBI Phase 1 Paper', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'rbi_q1',
        questionNumber: 1,
        sectionId: 'sec_rbi',
        sectionName: 'Economic & Financial Awareness',
        subject: 'Economics',
        topic: 'Monetary Policy Committee (MPC) Composition',
        type: 'single_choice',
        text: 'How many total members constitute the Monetary Policy Committee (MPC) of India under Section 45ZB of the amended RBI Act, 1934?',
        options: [
          { id: 'A', text: '6 Members (3 from RBI including Governor + 3 external members appointed by Central Government)' },
          { id: 'B', text: '5 Members' },
          { id: 'C', text: '8 Members' },
          { id: 'D', text: '4 Members' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'The MPC has 6 members: 3 RBI officials (Governor, Deputy Governor, one official) and 3 external experts appointed by the Central Government.',
        referenceNotes: 'RBI Act 1934 & Monetary Policy Guidelines'
      }
    ]
  },

  // 13. RBI Assistant Prelims Speed Mock
  {
    id: 'test_rbi_assistant_prelims_speed',
    slug: 'rbi-assistant-clerical-prelims-speed-mock',
    title: 'RBI Assistant • 100% Accuracy Speed CBT Prelims Mock',
    titleOdia: 'RBI ଆସିଷ୍ଟାଣ୍ଟ • ପ୍ରିଲିମ୍ସ ସ୍ପିଡ୍ ସିବିଟି ମକ୍',
    shortDescription: 'Numerical Ability, Reasoning Ability, and English Language for RBI clerical entry.',
    mainCategory: 'competitive_central',
    subCategory: 'rbi_grade_b',
    categoryLabel: 'Central Recruitment',
    targetExam: 'RBI Assistant 2026',
    gradeOrClass: 'Graduate in Any Discipline (50%)',
    board: 'Reserve Bank of India (RBI)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'RBI Clerical Track',
    attemptsCount: 31900,
    averageScore: 19.8,
    cutoffEstimated: 22.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, -0.25 penalty). High cutoff track.'],
    sections: [{ id: 'sec_rbi_asst', name: 'RBI Assistant Speed Paper', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'rbi_a_q1',
        questionNumber: 1,
        sectionId: 'sec_rbi_asst',
        sectionName: 'Numerical Ability',
        subject: 'Arithmetic',
        topic: 'Ages Word Problems',
        type: 'single_choice',
        text: 'The ratio of present ages of A and B is 4 : 5. Six years hence, the ratio of their ages will become 5 : 6. What is the present age of A in years?',
        options: [
          { id: 'A', text: '24 years (Let ages be 4x and 5x. (4x+6)/(5x+6) = 5/6 => 24x + 36 = 25x + 30 => x = 6 => A = 4 × 6 = 24)' },
          { id: 'B', text: '30 years' },
          { id: 'C', text: '20 years' },
          { id: 'D', text: '28 years' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'Cross multiplying (4x + 6) / (5x + 6) = 5/6 gives x = 6. Present age of A = 4x = 24 years.',
        referenceNotes: 'Quantitative Aptitude for Banking'
      }
    ]
  },

  // 14. SEBI Grade A (Assistant Manager) General Stream
  {
    id: 'test_sebi_grade_a_general_mock',
    slug: 'sebi-grade-a-assistant-manager-phase-1-mock',
    title: 'SEBI Grade A (Assistant Manager) • Securities, Finance & Management Mock',
    titleOdia: 'SEBI ଗ୍ରେଡ୍ A (ସିକ୍ୟୁରିଟିଜ୍ ଆଣ୍ଡ ଏକ୍ସଚେଞ୍ଜ ବୋର୍ଡ) • ଆସିଷ୍ଟାଣ୍ଟ ମ୍ୟାନେଜର ମକ୍',
    shortDescription: 'Securities and Exchange Board of India: Financial Markets, Companies Act 2013, Costing, Economics, and Management.',
    mainCategory: 'competitive_central',
    subCategory: 'rbi_grade_b',
    categoryLabel: 'Central Recruitment',
    targetExam: 'SEBI Grade A 2026',
    gradeOrClass: 'Master\'s Degree / CA / CS / Law / B.Tech',
    board: 'Securities and Exchange Board of India (SEBI)',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 20,
    isLive: true,
    isFree: true,
    featuredBadge: 'Securities Market Regulator',
    attemptsCount: 21500,
    averageScore: 12.8,
    cutoffEstimated: 14.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['20 Questions (+1.0 correct, -0.25 penalty).'],
    sections: [{ id: 'sec_sebi', name: 'SEBI Paper-1 Core', totalQuestions: 20, totalMarks: 20, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'sebi_q1',
        questionNumber: 1,
        sectionId: 'sec_sebi',
        sectionName: 'Financial Markets',
        subject: 'Securities Market',
        topic: 'Primary Market vs Secondary Market',
        type: 'single_choice',
        text: 'When a private unlisted company offers its shares to the public for the first time to raise equity capital from investors, it is termed as an:',
        options: [
          { id: 'A', text: 'Initial Public Offering (IPO)' },
          { id: 'B', text: 'Follow-on Public Offering (FPO)' },
          { id: 'C', text: 'Rights Issue' },
          { id: 'D', text: 'Bonus Issue' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'An Initial Public Offering (IPO) is the initial sale of stock by a private company to the general public on a stock exchange.',
        referenceNotes: 'SEBI Regulations & Capital Market Fundamentals'
      }
    ]
  },

  // 15. NABARD Grade A (Assistant Manager - RDBS)
  {
    id: 'test_nabard_grade_a_agri_rural',
    slug: 'nabard-grade-a-agriculture-rural-development-mock',
    title: 'NABARD Grade A (RDBS) • Agriculture, Rural Development & Social Issues Mock',
    titleOdia: 'NABARD ଗ୍ରେଡ୍ A • କୃଷି ଓ ଗ୍ରାମୀଣ ବିକାଶ (ARD) ମକ୍',
    shortDescription: 'National Bank for Agriculture and Rural Development: Agronomy, Soil Science, Irrigation, Farm Mechanization, Rural Credit, and Schemes.',
    mainCategory: 'competitive_central',
    subCategory: 'rbi_grade_b',
    categoryLabel: 'Central Recruitment',
    targetExam: 'NABARD Grade A 2026',
    gradeOrClass: 'Bachelor\'s Degree with 60%',
    board: 'NABARD',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'Agri & Rural Banking',
    attemptsCount: 23100,
    averageScore: 14.2,
    cutoffEstimated: 15.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, -0.25 penalty).'],
    sections: [{ id: 'sec_nabard', name: 'ARD & ESI Section', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'nab_q1',
        questionNumber: 1,
        sectionId: 'sec_nabard',
        sectionName: 'Agriculture & Rural Development',
        subject: 'Agronomy',
        topic: 'Soil Nutrients & NPK Ratio',
        type: 'single_choice',
        text: 'What is the universally recommended ideal ratio of Nitrogen (N), Phosphorus (P), and Potassium (K) for balanced agricultural soil fertility in general Indian field crops?',
        options: [
          { id: 'A', text: '4 : 2 : 1 (N : P : K)' },
          { id: 'B', text: '2 : 1 : 1' },
          { id: 'C', text: '1 : 2 : 4' },
          { id: 'D', text: '3 : 1 : 2' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'The standard agronomic benchmark for N:P:K consumption ratio for balanced crop nutrition in India is 4:2:1.',
        referenceNotes: 'NABARD Agriculture and Rural Development Handbook'
      }
    ]
  },

  // 16. LIC AAO (Assistant Administrative Officer)
  {
    id: 'test_lic_aao_insurance_mock',
    slug: 'lic-aao-assistant-administrative-officer-mock',
    title: 'LIC AAO (Life Insurance Corporation) • Insurance & Financial Market Awareness',
    titleOdia: 'LIC AAO (ଭାରତୀୟ ଜୀବନ ବୀମା ନିଗମ) • ବୀମା ଓ ଫାଇନାନ୍ସିଆଲ ମାର୍କେଟ ମକ୍',
    shortDescription: 'LIC AAO Prelims & Mains: Insurance Principles (Utmost Good Faith, Insurable Interest, Indemnity, Subrogation), Financial Sector, and Reasoning.',
    mainCategory: 'competitive_central',
    subCategory: 'lic_insurance',
    categoryLabel: 'Central Recruitment',
    targetExam: 'LIC AAO 2026',
    gradeOrClass: 'Bachelor\'s Degree in Any Discipline',
    board: 'Life Insurance Corporation of India (LIC)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'LIC Officer Cadet',
    attemptsCount: 27800,
    averageScore: 16.1,
    cutoffEstimated: 17.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, -0.25 penalty).'],
    sections: [{ id: 'sec_lic', name: 'LIC Insurance Paper', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'lic_q1',
        questionNumber: 1,
        sectionId: 'sec_lic',
        sectionName: 'Insurance Awareness',
        subject: 'Insurance Principles',
        topic: 'Doctrine of Uberrima Fides (Utmost Good Faith)',
        type: 'single_choice',
        text: 'The fundamental legal principle in all insurance contracts requiring both the policyholder and the insurer to disclose all material facts fully and honestly without concealment is known as:',
        options: [
          { id: 'A', text: 'Doctrine of Uberrima Fides (Utmost Good Faith)' },
          { id: 'B', text: 'Principle of Indemnity' },
          { id: 'C', text: 'Doctrine of Subrogation' },
          { id: 'D', text: 'Principle of Proximate Cause' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'Uberrima Fides (Utmost Good Faith) is the foundational doctrine of insurance ensuring full transparency of all material medical and personal facts.',
        referenceNotes: 'Insurance Institute of India (III) Principles of Insurance'
      }
    ]
  },

  // 17. Intelligence Bureau (IB ACIO Tier-1)
  {
    id: 'test_ib_acio_tier1_mock',
    slug: 'intelligence-bureau-ib-acio-grade-2-mock',
    title: 'Intelligence Bureau (IB ACIO Grade II) • Current Affairs & Analytical Mock',
    titleOdia: 'ଇଣ୍ଟେଲିଜେନ୍ସ ବ୍ୟୁରୋ (IB ACIO) • କରେଣ୍ଟ ଆଫେୟାର୍ସ ଓ ଆନାଲିଟିକାଲ ମକ୍',
    shortDescription: 'Ministry of Home Affairs Intelligence Officer: National Security, Geopolitics, Quantitative Aptitude, and English.',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_cgl',
    categoryLabel: 'Central Recruitment',
    targetExam: 'IB ACIO 2026',
    gradeOrClass: 'Graduate in Any Discipline',
    board: 'Intelligence Bureau (MHA)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'National Intelligence Track',
    attemptsCount: 34200,
    averageScore: 14.8,
    cutoffEstimated: 16.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, -0.25 penalty).'],
    sections: [{ id: 'sec_ib', name: 'IB ACIO Paper', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'ib_q1',
        questionNumber: 1,
        sectionId: 'sec_ib',
        sectionName: 'Current Affairs & Security',
        subject: 'National Security',
        topic: 'Indian Space Assets & NavIC Satellite Constellation',
        type: 'single_choice',
        text: 'What is the official operational name of India\'s autonomous regional satellite navigation system developed by ISRO to provide accurate positioning within India and extending up to 1,500 km around its borders?',
        options: [
          { id: 'A', text: 'NavIC (Navigation with Indian Constellation / IRNSS)' },
          { id: 'B', text: 'GAGAN' },
          { id: 'C', text: 'BHUVAN' },
          { id: 'D', text: 'ASTROSAT' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'NavIC (Navigation with Indian Constellation) is India\'s independent indigenous satellite navigation system designed by ISRO with a constellation of 7 operational satellites.',
        referenceNotes: 'ISRO Space Technology & Security Applications'
      }
    ]
  },

  // 18. DRDO CEPTAM (Senior Technical Assistant)
  {
    id: 'test_drdo_ceptam_sta_mock',
    slug: 'drdo-ceptam-senior-technical-assistant-mock',
    title: 'DRDO CEPTAM • Senior Technical Assistant & Technician Tier-1 CBT Mock',
    titleOdia: 'DRDO CEPTAM • ସିନିଅର ଟେକ୍ନିକାଲ ଆସିଷ୍ଟାଣ୍ଟ ସିବିଟି ମକ୍',
    shortDescription: 'Defence Research and Development Organisation: Quantitative Ability, General Intelligence, General Science, and General English.',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_cgl',
    categoryLabel: 'Central Recruitment',
    targetExam: 'DRDO CEPTAM 2026',
    gradeOrClass: 'B.Sc / Diploma in Engineering',
    board: 'DRDO CEPTAM',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'Defence Research Track',
    attemptsCount: 26900,
    averageScore: 17.5,
    cutoffEstimated: 19.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, 0 negative marking for Tier 1 screening).'],
    sections: [{ id: 'sec_drdo', name: 'CEPTAM Tier-1', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }],
    questions: [
      {
        id: 'drdo_q1',
        questionNumber: 1,
        sectionId: 'sec_drdo',
        sectionName: 'General Science',
        subject: 'Applied Physics & Sound',
        topic: 'Speed of Sound in Different Media',
        type: 'single_choice',
        text: 'Through which of the following media does sound travel with the highest propagation velocity at standard room temperature?',
        options: [
          { id: 'A', text: 'Solid Steel / Iron (~5,120 m/s)' },
          { id: 'B', text: 'Water (~1,480 m/s)' },
          { id: 'C', text: 'Air (~343 m/s)' },
          { id: 'D', text: 'Vacuum (0 m/s, cannot travel)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Sound travels fastest in dense elastic solids (e.g. steel ~5120 m/s) because particles are closely packed and transfer kinetic energy much more rapidly than in liquids or gases.',
        referenceNotes: 'NCERT Class 9 Physics Sound'
      }
    ]
  },

  // 19. ISRO Assistant & Junior Personal Assistant
  {
    id: 'test_isro_assistant_recruitment_mock',
    slug: 'isro-assistant-junior-personal-assistant-cbt-mock',
    title: 'ISRO Assistant • General Knowledge, Reasoning & Arithmetic CBT Mock',
    titleOdia: 'ISRO ଆସିଷ୍ଟାଣ୍ଟ ଓ JPA • ସିବିଟି ଅଲ୍ ଇଣ୍ଡିଆ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Indian Space Research Organisation Central Administrative Recruitment: Space Science GK, Reasoning, Math, and English.',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_cgl',
    categoryLabel: 'Central Recruitment',
    targetExam: 'ISRO Assistant 2026',
    gradeOrClass: 'Graduate with 60%',
    board: 'ISRO Centralised Recruitment Board (ICRB)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'ISRO Space Administrative',
    attemptsCount: 25800,
    averageScore: 16.9,
    cutoffEstimated: 18.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+1.0 correct, -0.25 penalty).'],
    sections: [{ id: 'sec_isro', name: 'ISRO Assistant Paper', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'isro_q1',
        questionNumber: 1,
        sectionId: 'sec_isro',
        sectionName: 'Space Science GK',
        subject: 'Space Science',
        topic: 'Chandrayaan-3 & Lunar South Pole Landing',
        type: 'single_choice',
        text: 'On August 23, 2023, India\'s Chandrayaan-3 lander made a historic soft landing near the Moon\'s south pole. What is the official name designated for this landing spot by Prime Minister Narendra Modi?',
        options: [
          { id: 'A', text: 'Shiv Shakti Point' },
          { id: 'B', text: 'Tiranga Point' },
          { id: 'C', text: 'Jawahar Point' },
          { id: 'D', text: 'Vikram Point' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'The lunar touchdown site of Chandrayaan-3 was officially named "Shiv Shakti Point", and August 23 was declared as "National Space Day".',
        referenceNotes: 'ISRO Space Mission Archives'
      }
    ]
  },

  // 20. National Defence Academy (NDA) Mathematics Paper-1
  {
    id: 'test_nda_math_speed_simulation',
    slug: 'nda-na-mathematics-calculus-trigonometry-mock',
    title: 'NDA & NA • Paper 1 Mathematics (Trigonometry, Calculus & Matrices)',
    titleOdia: 'NDA & NA • ଗଣିତ ପେପର-୧ (ତ୍ରିକୋଣମିତି, କାଲକୁଲସ ଓ ମାଟ୍ରିକ୍ସ) ମକ୍',
    shortDescription: 'UPSC NDA Cadet Selection: 120-question format drill with Trigonometric Identities, Complex Numbers, Derivatives, and 3D Vectors.',
    mainCategory: 'competitive_central',
    subCategory: 'nda_defence',
    categoryLabel: 'Central Recruitment',
    targetExam: 'UPSC NDA & NA 2026',
    gradeOrClass: '10+2 Intermediate (Physics & Math)',
    board: 'Union Public Service Commission (UPSC)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 62.5,
    isLive: true,
    isFree: true,
    featuredBadge: 'NDA Armed Forces Cadet',
    attemptsCount: 37400,
    averageScore: 36.8,
    cutoffEstimated: 40.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+2.5 marks per correct answer, -0.83 mark penalty).'],
    sections: [{ id: 'sec_nda_m', name: 'Mathematics Paper-1', totalQuestions: 25, totalMarks: 62.5, positiveMarksPerQuestion: 2.5, negativeMarksPerQuestion: 0.83 }],
    questions: [
      {
        id: 'nda_m_q1',
        questionNumber: 1,
        sectionId: 'sec_nda_m',
        sectionName: 'Trigonometry',
        subject: 'Mathematics',
        topic: 'Trigonometric Identities & Values',
        type: 'single_choice',
        text: 'What is the exact value of tan 15° (or tan(45° - 30°))?',
        options: [
          { id: 'A', text: '2 - √3 (Since (1 - 1/√3)/(1 + 1/√3) = (√3 - 1)/(√3 + 1) = (√3 - 1)² / 2 = (4 - 2√3)/2 = 2 - √3)' },
          { id: 'B', text: '2 + √3' },
          { id: 'C', text: '√3 - 1' },
          { id: 'D', text: '1 - √3' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.5,
        negativeMarks: 0.83,
        difficulty: 'easy',
        explanation: 'tan(45° - 30°) = (tan 45° - tan 30°) / (1 + tan 45° tan 30°) = (1 - 1/√3) / (1 + 1/√3) = (√3 - 1)/(√3 + 1) = 2 - √3.',
        referenceNotes: 'NCERT Class 11 Trigonometric Functions'
      }
    ]
  }
];
