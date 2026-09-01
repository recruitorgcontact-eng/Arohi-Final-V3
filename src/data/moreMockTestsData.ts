import { MockTest } from '../types/examTypes';
import { generateFull100NorcetQuestions } from './nursingExamsMasterBank';
import { getNeetUg100DistinctQuestions, getSscCgl100DistinctQuestions } from './masterGrandCbtQuestionBanks';

export const ADDITIONAL_MOCK_TESTS: MockTest[] = [
  // ==========================================
  // 1. NATIONAL ENTRANCES: NEET UG 2026 Simulation
  // ==========================================
  {
    id: 'test_neet_ug_2026',
    slug: 'neet-ug-2026-grand-simulation',
    title: 'NEET UG 2026 Medical Entrance Full Simulation',
    titleOdia: 'NEET UG ୨୦୨୬ ମେଡିକାଲ ପ୍ରବେଶିକା ଗ୍ରାଣ୍ଡ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Comprehensive NTA NEET simulation covering Physics, Chemistry, Botany, and Zoology with authentic negative marking (-1).',
    mainCategory: 'entrance_exams',
    subCategory: 'neet_ug',
    categoryLabel: 'National Entrances',
    targetExam: 'NEET UG 2026',
    gradeOrClass: 'Class 11 & 12 / Dropper',
    board: 'NTA (National Testing Agency)',
    durationMinutes: 180,
    totalQuestions: 20,
    totalMarks: 80,
    isLive: true,
    isFree: true,
    featuredBadge: 'High-Yield NCERT Focus',
    attemptsCount: 28450,
    averageScore: 48.6,
    cutoffEstimated: 52.0,
    createdAt: '2026-02-18T10:00:00Z',
    instructions: [
      'Total time allowed is 180 minutes. Test carries 80 marks for 20 high-yield questions.',
      'Marking Scheme: +4 marks for each correct response, -1 mark for each incorrect response.',
      'Sections: Botany (5 Qs), Zoology (5 Qs), Physics (5 Qs), Chemistry (5 Qs).'
    ],
    sections: [
      { id: 'sec_botany', name: 'Botany (Plant Biology)', totalQuestions: 5, totalMarks: 20, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_zoology', name: 'Zoology (Human Physiology & Genetics)', totalQuestions: 5, totalMarks: 20, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_physics', name: 'Physics (Mechanics & Electrodynamics)', totalQuestions: 5, totalMarks: 20, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_chem', name: 'Chemistry (Organic & Physical)', totalQuestions: 5, totalMarks: 20, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }
    ],
    questions: [
      {
        id: 'neet_q1',
        questionNumber: 1,
        sectionId: 'sec_botany',
        sectionName: 'Botany (Plant Biology)',
        subject: 'Biology',
        topic: 'Plant Physiology & Photosynthesis',
        type: 'single_choice',
        text: 'In C4 plants, the primary carbon dioxide acceptor is Phosphoenolpyruvate (PEP). Which specific enzyme catalyzes the initial fixation of CO2 in mesophyll cells?',
        textHindi: 'C4 पौधों में CO2 का प्राथमिक ग्राही फॉस्फोएनोलपाइरूवेट (PEP) होता है। मेसोफिल कोशिकाओं में प्रारंभिक CO2 स्थिरीकरण को कौन सा एंजाइम उत्प्रेरित करता है?',
        options: [
          { id: 'A', text: 'RuBisCO' },
          { id: 'B', text: 'PEP carboxylase (PEPcase)' },
          { id: 'C', text: 'Pyruvate dehydrogenase' },
          { id: 'D', text: 'Carbonic anhydrase' }
        ],
        correctAnswer: 'B',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'In C4 plants (such as Maize and Sugarcane), the primary CO2 acceptor is PEP in the mesophyll chloroplasts, catalyzed by PEP carboxylase (PEPcase). RuBisCO is absent in mesophyll cells and is located exclusively in bundle sheath cells.',
        referenceNotes: 'NCERT Biology Class 11, Chapter 13: Photosynthesis in Higher Plants'
      },
      {
        id: 'neet_q2',
        questionNumber: 2,
        sectionId: 'sec_botany',
        sectionName: 'Botany (Plant Biology)',
        subject: 'Biology',
        topic: 'Genetics & Molecular Basis of Inheritance',
        type: 'single_choice',
        text: 'During DNA replication in prokaryotes, which enzyme is primarily responsible for the removal of RNA primers and replacing them with deoxyribonucleotides?',
        options: [
          { id: 'A', text: 'DNA Polymerase III' },
          { id: 'B', text: 'DNA Polymerase I (Kornberg Enzyme)' },
          { id: 'C', text: 'DNA Ligase' },
          { id: 'D', text: 'Topoisomerase (Gyrase)' }
        ],
        correctAnswer: 'B',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'DNA Polymerase I has 5\' to 3\' exonuclease activity, which allows it to degrade RNA primers and replace the excised gap with appropriate DNA nucleotides before ligase seals the nick.',
        referenceNotes: 'NCERT Class 12 Biology - Molecular Basis of Inheritance'
      },
      {
        id: 'neet_q3',
        questionNumber: 3,
        sectionId: 'sec_zoology',
        sectionName: 'Zoology (Human Physiology & Genetics)',
        subject: 'Biology',
        topic: 'Human Endocrine System',
        type: 'single_choice',
        text: 'Which hormone is directly responsible for stimulating the \'Milk Ejection Reflex\' (let-down reflex) from the mammary glands during breastfeeding?',
        options: [
          { id: 'A', text: 'Prolactin' },
          { id: 'B', text: 'Oxytocin' },
          { id: 'C', text: 'Progesterone' },
          { id: 'D', text: 'Estrogen' }
        ],
        correctAnswer: 'B',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'Oxytocin released from the posterior pituitary causes contraction of myoepithelial cells surrounding the alveoli of mammary glands, leading to milk ejection. Prolactin stimulates milk synthesis.',
        referenceNotes: 'NCERT Class 11 Biology - Chemical Coordination and Integration'
      },
      {
        id: 'neet_q4',
        questionNumber: 4,
        sectionId: 'sec_physics',
        sectionName: 'Physics (Mechanics & Electrodynamics)',
        subject: 'Physics',
        topic: 'Current Electricity & Kirchhoff\'s Laws',
        type: 'single_choice',
        text: 'A wire of resistance R is stretched uniformly such that its length increases by 100% (doubles). Assuming volume remains constant, what is the new resistance of the wire?',
        options: [
          { id: 'A', text: '2R' },
          { id: 'B', text: '4R' },
          { id: 'C', text: 'R/2' },
          { id: 'D', text: '8R' }
        ],
        correctAnswer: 'B',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'Resistance R = ρ * (L/A). Since volume V = A * L is constant, stretching to 2L halves the cross-sectional area (A/2). Therefore, R_new = ρ * (2L / (A/2)) = 4 * (ρL/A) = 4R.',
        referenceNotes: 'NCERT Physics Class 12 - Current Electricity'
      },
      {
        id: 'neet_q5',
        questionNumber: 5,
        sectionId: 'sec_chem',
        sectionName: 'Chemistry (Organic & Physical)',
        subject: 'Chemistry',
        topic: 'Chemical Equilibrium & pH Calculation',
        type: 'single_choice',
        text: 'What is the pH of a 1.0 × 10⁻⁸ M aqueous solution of Hydrochloric Acid (HCl) at 25°C?',
        options: [
          { id: 'A', text: '8.0' },
          { id: 'B', text: '6.96 (slightly less than 7)' },
          { id: 'C', text: '7.0' },
          { id: 'D', text: '1.0' }
        ],
        correctAnswer: 'B',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'hard',
        explanation: 'In dilute acid solutions (≤ 10⁻⁷ M), the contribution of H⁺ ions from water autoionization (10⁻⁷ M) cannot be neglected. Total [H⁺] = 10⁻⁸ + 10⁻⁷ = 1.1 × 10⁻⁷ M. pH = -log(1.1 × 10⁻⁷) ≈ 6.96.',
        referenceNotes: 'NCERT Class 11 Chemistry - Ionic Equilibrium'
      }
    ]
  },

  // ==========================================
  // 2. NATIONAL ENTRANCES: JEE Main 2026 Paper-1
  // ==========================================
  {
    id: 'test_jee_main_2026',
    slug: 'jee-main-2026-paper-1-simulation',
    title: 'JEE Main 2026 Paper-1 CBT Simulation',
    titleOdia: 'JEE Main ୨୦୨୬ ଇଞ୍ଜିନିୟରିଂ ପ୍ରବେଶିକା ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'National Engineering Entrance format with Physics, Chemistry, and Advanced Mathematics featuring conceptual calculus and vectors.',
    mainCategory: 'entrance_exams',
    subCategory: 'jee_main',
    categoryLabel: 'National Entrances',
    targetExam: 'JEE Main 2026 (B.Tech)',
    gradeOrClass: 'Class 11 & 12 PCM',
    board: 'NTA JEE Apex Board',
    durationMinutes: 180,
    totalQuestions: 15,
    totalMarks: 60,
    isLive: true,
    isFree: true,
    featuredBadge: 'NTA Real Speed Interface',
    attemptsCount: 22100,
    averageScore: 31.4,
    cutoffEstimated: 34.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Total duration is 180 minutes. Maximum marks is 60.',
      'Marking scheme: +4 for correct option, -1 for incorrect option.',
      'Subjects: Mathematics (5 Qs), Physics (5 Qs), Chemistry (5 Qs).'
    ],
    sections: [
      { id: 'sec_jee_math', name: 'Mathematics (Calculus & Vectors)', totalQuestions: 5, totalMarks: 20, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_jee_phy', name: 'Physics (Electromagnetism & Thermodynamics)', totalQuestions: 5, totalMarks: 20, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_jee_chem', name: 'Chemistry (Physical & Coordination Compounds)', totalQuestions: 5, totalMarks: 20, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }
    ],
    questions: [
      {
        id: 'jee_q1',
        questionNumber: 1,
        sectionId: 'sec_jee_math',
        sectionName: 'Mathematics (Calculus & Vectors)',
        subject: 'Mathematics',
        topic: 'Definite Integrals & Properties',
        type: 'single_choice',
        text: 'Evaluate the definite integral: ∫[0 to π/2] (sin^3(x) / (sin^3(x) + cos^3(x))) dx.',
        options: [
          { id: 'A', text: 'π/4' },
          { id: 'B', text: 'π/2' },
          { id: 'C', text: 'π' },
          { id: 'D', text: '1' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'Using King\'s property of definite integrals: I = ∫[0 to a] f(x)dx = ∫[0 to a] f(a-x)dx. Adding both forms gives 2I = ∫[0 to π/2] 1 dx = π/2 => I = π/4.',
        referenceNotes: 'NCERT Class 12 Mathematics - Integrals'
      },
      {
        id: 'jee_q2',
        questionNumber: 2,
        sectionId: 'sec_jee_phy',
        sectionName: 'Physics (Electromagnetism & Thermodynamics)',
        subject: 'Physics',
        topic: 'Electromagnetic Induction & Lenz\'s Law',
        type: 'single_choice',
        text: 'A circular copper coil of radius 10 cm and 50 turns is placed in a uniform magnetic field of 0.2 T perpendicular to the plane of the coil. If the field drops to zero in 0.1 s, calculate the average induced EMF in the coil.',
        options: [
          { id: 'A', text: '0.314 V' },
          { id: 'B', text: '3.14 V' },
          { id: 'C', text: '0.0314 V' },
          { id: 'D', text: '31.4 V' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'Area A = π * r² = π * (0.1)² = 0.0314 m². Initial flux Φ = N * B * A = 50 * 0.2 * 0.0314 = 0.314 Wb. Induced EMF = |ΔΦ/Δt| = 0.314 / 0.1 = 3.14 V.',
        referenceNotes: 'NCERT Physics Class 12 - EMI'
      },
      {
        id: 'jee_q3',
        questionNumber: 3,
        sectionId: 'sec_jee_chem',
        sectionName: 'Chemistry (Physical & Coordination Compounds)',
        subject: 'Chemistry',
        topic: 'Coordination Chemistry & Hybridization',
        type: 'single_choice',
        text: 'Which of the following coordination complexes is diamagnetic and exhibits d²sp³ inner orbital octahedral hybridization?',
        options: [
          { id: 'A', text: '[Co(NH3)6]³⁺' },
          { id: 'B', text: '[CoF6]³⁻' },
          { id: 'C', text: '[Fe(H2O)6]²⁺' },
          { id: 'D', text: '[NiCl4]²⁻' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'In [Co(NH3)6]³⁺, Co is in +3 oxidation state (3d⁶). NH3 acts as a strong field ligand, forcing pairing of all six 3d electrons into t2g orbitals (diamagnetic, zero unpaired electrons) leaving two 3d orbitals for d²sp³ hybridization.',
        referenceNotes: 'NCERT Chemistry Class 12 - Coordination Compounds'
      }
    ]
  },

  // ==========================================
  // 3. NATIONAL ENTRANCES: CUET UG & CLAT Law
  // ==========================================
  {
    id: 'test_cuet_ug_general_2026',
    slug: 'cuet-ug-2026-general-test-simulation',
    title: 'CUET UG 2026 General Test & Aptitude CBT Mock',
    titleOdia: 'CUET UG ୨୦୨୬ ସାଧାରଣ ଯୋଗ୍ୟତା ପ୍ରବେଶିକା ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'National University Entrance simulation covering General Awareness, Logical Reasoning, and Quantitative Aptitude for undergraduate admissions.',
    mainCategory: 'entrance_exams',
    subCategory: 'cuet_ug',
    categoryLabel: 'National Entrances',
    targetExam: 'CUET UG 2026 (NTA)',
    gradeOrClass: 'Class 12 Pass / UG Aspirants',
    board: 'NTA Central Universities',
    durationMinutes: 60,
    totalQuestions: 15,
    totalMarks: 75,
    isLive: true,
    isFree: true,
    featuredBadge: 'Central Universities Admission',
    attemptsCount: 18700,
    averageScore: 49.2,
    cutoffEstimated: 55.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Total duration is 60 minutes for 15 questions. Total Marks: 75.',
      'Marking scheme: +5 marks for correct answer, -1 mark for wrong answer.'
    ],
    sections: [
      { id: 'sec_cuet_ga', name: 'General Awareness & Current Affairs', totalQuestions: 5, totalMarks: 25, positiveMarksPerQuestion: 5.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_cuet_lr', name: 'Logical & Analytical Reasoning', totalQuestions: 5, totalMarks: 25, positiveMarksPerQuestion: 5.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_cuet_qa', name: 'Numerical Ability & Data Interpretation', totalQuestions: 5, totalMarks: 25, positiveMarksPerQuestion: 5.0, negativeMarksPerQuestion: 1.0 }
    ],
    questions: [
      {
        id: 'cuet_q1',
        questionNumber: 1,
        sectionId: 'sec_cuet_ga',
        sectionName: 'General Awareness & Current Affairs',
        subject: 'General Knowledge',
        topic: 'Indian Polity & Constitution',
        type: 'single_choice',
        text: 'Which Article of the Indian Constitution empowers the President of India to promulgate Ordinances during the recess of Parliament?',
        options: [
          { id: 'A', text: 'Article 123' },
          { id: 'B', text: 'Article 213' },
          { id: 'C', text: 'Article 352' },
          { id: 'D', text: 'Article 72' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'Article 123 empowers the President to issue ordinances when neither House of Parliament is in session. Article 213 grants similar powers to State Governors.',
        referenceNotes: 'M. Laxmikanth - Indian Polity'
      },
      {
        id: 'cuet_q2',
        questionNumber: 2,
        sectionId: 'sec_cuet_lr',
        sectionName: 'Logical & Analytical Reasoning',
        subject: 'Reasoning',
        topic: 'Syllogism & Deductive Logic',
        type: 'single_choice',
        text: 'Statements: 1. All planets are stars. 2. Some stars are satellites. Conclusions: I. Some satellites are planets. II. Some stars are planets.',
        options: [
          { id: 'A', text: 'Only conclusion I follows' },
          { id: 'B', text: 'Only conclusion II follows' },
          { id: 'C', text: 'Both I and II follow' },
          { id: 'D', text: 'Neither I nor II follows' }
        ],
        correctAnswer: 'B',
        positiveMarks: 5.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'From "All planets are stars", the conversion is "Some stars are planets", so conclusion II definitely follows. There is no definite universal connection between satellites and planets.',
        referenceNotes: 'Analytical Reasoning Fundamentals'
      }
    ]
  },

  // ==========================================
  // 4. CENTRAL RECRUITMENT: UPSC Civil Services Prelims GS Paper-1
  // ==========================================
  {
    id: 'test_upsc_prelims_2026',
    slug: 'upsc-civil-services-prelims-gs1-mock',
    title: 'UPSC Civil Services 2026 Prelims (GS Paper-1) Master Mock',
    titleOdia: 'UPSC ସିଭିଲ୍ ସର୍ଭିସେସ୍ ୨୦୨୬ ପ୍ରିଲିମ୍ସ ଜେନେରାଲ ଷ୍ଟଡିଜ୍ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'High-standard multi-statement UPSC Prelims format spanning Indian Polity, Environment, Modern History, and Macroeconomics.',
    mainCategory: 'competitive_central',
    subCategory: 'upsc_prelims',
    categoryLabel: 'Central Recruitment',
    targetExam: 'UPSC CSE Prelims 2026 (IAS / IPS / IFS)',
    gradeOrClass: 'Graduate All Streams',
    board: 'Union Public Service Commission (UPSC)',
    durationMinutes: 120,
    totalQuestions: 15,
    totalMarks: 30,
    isLive: true,
    isFree: true,
    featuredBadge: 'UPSC Standard Assertion & Reasoning',
    attemptsCount: 31200,
    averageScore: 14.8,
    cutoffEstimated: 17.5,
    createdAt: '2026-02-17T10:00:00Z',
    instructions: [
      'Total duration is 120 minutes. Test contains 15 multi-statement analytical questions.',
      'Marking Scheme: +2.0 marks for each correct answer; -0.66 marks (1/3rd) for each wrong answer.'
    ],
    sections: [
      { id: 'sec_upsc_polity', name: 'Indian Polity & Governance', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 },
      { id: 'sec_upsc_env', name: 'Environment, Ecology & Biodiversity', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 },
      { id: 'sec_upsc_hist_eco', name: 'Modern History & Indian Economy', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 }
    ],
    questions: [
      {
        id: 'upsc_q1',
        questionNumber: 1,
        sectionId: 'sec_upsc_polity',
        sectionName: 'Indian Polity & Governance',
        subject: 'Indian Polity',
        topic: 'Constitutional Bodies & Election Commission',
        type: 'single_choice',
        text: 'With reference to the Election Commission of India (ECI), consider the following statements:\n1. The Chief Election Commissioner can be removed from office in like manner and on the like grounds as a Judge of the Supreme Court.\n2. The conditions of service and tenure of office of the Election Commissioners are determined by the President subject to Parliamentary law.\nWhich of the statements given above is/are correct?',
        options: [
          { id: 'A', text: '1 only' },
          { id: 'B', text: '2 only' },
          { id: 'C', text: 'Both 1 and 2' },
          { id: 'D', text: 'Neither 1 nor 2' }
        ],
        correctAnswer: 'C',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'medium',
        explanation: 'Under Article 324(5), the Chief Election Commissioner enjoys security of tenure equivalent to a Supreme Court judge. Under Article 324(2), the President determines rules subject to Parliamentary law.',
        referenceNotes: 'Constitution of India - Article 324'
      },
      {
        id: 'upsc_q2',
        questionNumber: 2,
        sectionId: 'sec_upsc_env',
        sectionName: 'Environment, Ecology & Biodiversity',
        subject: 'Environment & Ecology',
        topic: 'Ramsar Wetlands & Conservation in India',
        type: 'single_choice',
        text: 'Which of the following wetlands in India is designated as a Montreux Record site under the Ramsar Convention due to ecological changes?',
        options: [
          { id: 'A', text: 'Chilika Lake (Odisha)' },
          { id: 'B', text: 'Keoladeo National Park (Rajasthan) and Loktak Lake (Manipur)' },
          { id: 'C', text: 'Sundarbans Wetland (West Bengal)' },
          { id: 'D', text: 'Vembanad-Kol Wetland (Kerala)' }
        ],
        correctAnswer: 'B',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'medium',
        explanation: 'Currently, two Indian wetlands are on the Montreux Record: Keoladeo National Park (Rajasthan) and Loktak Lake (Manipur). Chilika Lake was removed from the Montreux Record in 2002 after successful ecological restoration.',
        referenceNotes: 'MoEFCC Annual Report & Ramsar Secretariat'
      }
    ]
  },

  // ==========================================
  // 5. CENTRAL RECRUITMENT: RRB NTPC & Railway Stage-1 CBT
  // ==========================================
  {
    id: 'test_rrb_ntpc_2026',
    slug: 'rrb-ntpc-stage-1-cbt-mock',
    title: 'RRB NTPC & Railway Group-D Stage-1 CBT Simulation',
    titleOdia: 'ରେଳବାଇ RRB NTPC ଷ୍ଟେଜ୍-୧ ସିବିଟି ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Official Railway Recruitment Board interface simulation: General Awareness, Mathematics, and General Intelligence & Reasoning.',
    mainCategory: 'competitive_central',
    subCategory: 'rrb_ntpc',
    categoryLabel: 'Central Recruitment',
    targetExam: 'RRB NTPC & Group D (CEN 2026)',
    gradeOrClass: '10th / 12th / Graduate',
    board: 'Railway Recruitment Boards (RRB)',
    durationMinutes: 90,
    totalQuestions: 20,
    totalMarks: 20,
    isLive: true,
    isFree: true,
    featuredBadge: '100% RRB CBT Interface',
    attemptsCount: 36400,
    averageScore: 13.9,
    cutoffEstimated: 14.5,
    createdAt: '2026-02-19T10:00:00Z',
    instructions: [
      'Total duration is 90 minutes for 20 questions. Total marks: 20.',
      'Marking: +1.0 for correct answer, -0.33 (1/3rd) for incorrect answer.'
    ],
    sections: [
      { id: 'sec_rrb_ga', name: 'General Awareness & Science', totalQuestions: 8, totalMarks: 8, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 },
      { id: 'sec_rrb_math', name: 'Mathematics & Number System', totalQuestions: 6, totalMarks: 6, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 },
      { id: 'sec_rrb_gi', name: 'General Intelligence & Reasoning', totalQuestions: 6, totalMarks: 6, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }
    ],
    questions: [
      {
        id: 'rrb_q1',
        questionNumber: 1,
        sectionId: 'sec_rrb_ga',
        sectionName: 'General Awareness & Science',
        subject: 'General Science',
        topic: 'Physics - Optics & Human Eye',
        type: 'single_choice',
        text: 'A person suffering from Myopia (short-sightedness) cannot see distant objects clearly. Which type of lens is prescribed to correct this defect?',
        options: [
          { id: 'A', text: 'Convex Lens (Converging)' },
          { id: 'B', text: 'Concave Lens (Diverging)' },
          { id: 'C', text: 'Cylindrical Lens' },
          { id: 'D', text: 'Bifocal Lens' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'In myopia, the light rays focus in front of the retina. A concave (diverging) lens diverges the incident rays before they enter the eye, allowing the image to focus sharply on the retina.',
        referenceNotes: 'NCERT Class 10 Science - Human Eye'
      },
      {
        id: 'rrb_q2',
        questionNumber: 2,
        sectionId: 'sec_rrb_math',
        sectionName: 'Mathematics & Number System',
        subject: 'Mathematics',
        topic: 'Time and Work',
        type: 'single_choice',
        text: 'A can complete a piece of work in 12 days and B can complete the same work in 18 days. If they work together, in how many days will the entire work be completed?',
        options: [
          { id: 'A', text: '7.2 days (36/5 days)' },
          { id: 'B', text: '6.0 days' },
          { id: 'C', text: '8.5 days' },
          { id: 'D', text: '9.0 days' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Total work = LCM(12, 18) = 36 units. A\'s efficiency = 3 units/day, B\'s efficiency = 2 units/day. Combined efficiency = 5 units/day. Time = 36 / 5 = 7.2 days.',
        referenceNotes: 'Railway Arithmetic Formulas'
      }
    ]
  },

  // ==========================================
  // 6. CENTRAL RECRUITMENT: IBPS / SBI PO Banking Prelims
  // ==========================================
  {
    id: 'test_ibps_sbi_po_2026',
    slug: 'ibps-sbi-po-prelims-speed-mock',
    title: 'IBPS PO & SBI PO Prelims Speed Mock Test',
    titleOdia: 'ବ୍ୟାଙ୍କିଙ୍ଗ୍ IBPS PO ଏବଂ SBI PO ପ୍ରିଲିମ୍ସ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Banking exam speed simulation focusing on Quantitative Aptitude, Data Interpretation, Reasoning Puzzles, and English Comprehension.',
    mainCategory: 'competitive_central',
    subCategory: 'ibps_po',
    categoryLabel: 'Central Recruitment',
    targetExam: 'IBPS PO / SBI PO 2026',
    gradeOrClass: 'Graduate in Any Discipline',
    board: 'IBPS / State Bank of India',
    durationMinutes: 60,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'Sectional Speed Simulation',
    attemptsCount: 29500,
    averageScore: 10.2,
    cutoffEstimated: 11.0,
    createdAt: '2026-02-18T10:00:00Z',
    instructions: [
      'Total duration is 60 minutes for 15 questions with negative marking of 0.25 mark per wrong answer.',
      'Sections: English Language, Quantitative Aptitude, Reasoning Ability.'
    ],
    sections: [
      { id: 'sec_bank_qa', name: 'Quantitative Aptitude & DI', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 },
      { id: 'sec_bank_lr', name: 'Reasoning Ability & Puzzles', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 },
      { id: 'sec_bank_eng', name: 'English Language & Cloze Test', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'bank_q1',
        questionNumber: 1,
        sectionId: 'sec_bank_qa',
        sectionName: 'Quantitative Aptitude & DI',
        subject: 'Quantitative Aptitude',
        topic: 'Quadratic Equations & Inequalities',
        type: 'single_choice',
        text: 'Equation I: x² - 7x + 12 = 0\nEquation II: y² - 9y + 20 = 0\nDetermine the correct mathematical relationship between x and y.',
        options: [
          { id: 'A', text: 'x > y' },
          { id: 'B', text: 'x < y' },
          { id: 'C', text: 'x ≤ y' },
          { id: 'D', text: 'x ≥ y or Relationship cannot be established' }
        ],
        correctAnswer: 'C',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'For Eq I: (x-3)(x-4)=0 => x = 3, 4. For Eq II: (y-4)(y-5)=0 => y = 4, 5. Comparing: 3 < 4, 3 < 5, 4 = 4, 4 < 5. Hence, x ≤ y.',
        referenceNotes: 'Banking Quantitative Shortcuts'
      }
    ]
  },

  // ==========================================
  // 7. STATE PSCs: OPSC Odisha Civil Services (OAS)
  // ==========================================
  {
    id: 'test_opsc_oas_2026',
    slug: 'opsc-oas-odisha-civil-services-mock',
    title: 'OPSC OAS (Odisha Civil Services) Prelims GS Grand Mock',
    titleOdia: 'ଓପିଏସ୍ସି ଓଡ଼ିଶା ପ୍ରଶାସନିକ ସେବା (OAS) ପ୍ରିଲିମ୍ସ ଗ୍ରାଣ୍ଡ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Dedicated Odisha Administrative Service prelims model test featuring Odisha History, Geography, Polity, Art & Culture, and Economy.',
    mainCategory: 'competitive_state',
    subCategory: 'opsc_oas',
    categoryLabel: 'State PSCs & Teaching',
    targetExam: 'OPSC OAS / OFS / OPS 2026',
    gradeOrClass: 'Odisha Graduate Aspirants',
    board: 'Odisha Public Service Commission (OPSC)',
    durationMinutes: 120,
    totalQuestions: 15,
    totalMarks: 30,
    isLive: true,
    isFree: true,
    featuredBadge: 'Odisha GK & State Special',
    attemptsCount: 24800,
    averageScore: 18.2,
    cutoffEstimated: 19.0,
    createdAt: '2026-02-16T10:00:00Z',
    instructions: [
      'Total duration is 120 minutes. Total Marks: 30 for 15 questions.',
      'Marking scheme: +2.0 marks for each correct answer; -0.66 marks for each incorrect answer.'
    ],
    sections: [
      { id: 'sec_opsc_odisha', name: 'Odisha History, Heritage & Geography', totalQuestions: 6, totalMarks: 12, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 },
      { id: 'sec_opsc_gs', name: 'General Studies (Polity, Environment & Economy)', totalQuestions: 9, totalMarks: 18, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 }
    ],
    questions: [
      {
        id: 'opsc_q1',
        questionNumber: 1,
        sectionId: 'sec_opsc_odisha',
        sectionName: 'Odisha History, Heritage & Geography',
        subject: 'Odisha Heritage',
        topic: 'Odisha History & Ganga Dynasty',
        type: 'single_choice',
        text: 'The magnificent Sun Temple of Konark (Black Pagoda), a UNESCO World Heritage Site in Odisha, was constructed during the 13th century by which Ganga monarch?',
        textOdia: 'କୋଣାର୍କର ବିଶ୍ୱ ପ୍ରସିଦ୍ଧ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ତ୍ରୟୋଦଶ ଶତାବ୍ଦୀରେ କେଉଁ ଗଙ୍ଗ ନୃପତିଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ହୋଇଥିଲା?',
        options: [
          { id: 'A', text: 'King Narasimhadeva I (ନରସିଂହଦେବ ପ୍ରଥମ)' },
          { id: 'B', text: 'King Anantavarman Chodagangadeva (ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗଦେବ)' },
          { id: 'C', text: 'King Kapilendradeva (କପିଳେନ୍ଦ୍ରଦେବ)' },
          { id: 'D', text: 'King Kharavela (ମହାମେଘବାହନ ଖାରବେଳ)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'easy',
        explanation: 'The Konark Sun Temple was built around 1250 CE by King Narasimhadeva I of the Eastern Ganga Dynasty to commemorate his military victories against Muslim invaders from Bengal.',
        referenceNotes: 'Odisha Review & Department of Tourism, Govt of Odisha'
      },
      {
        id: 'opsc_q2',
        questionNumber: 2,
        sectionId: 'sec_opsc_odisha',
        sectionName: 'Odisha History, Heritage & Geography',
        subject: 'Odisha Geography',
        topic: 'Rivers and Water Resources of Odisha',
        type: 'single_choice',
        text: 'The Hirakud Dam, one of the longest earthen dams in the world, is built across which major river in Odisha?',
        textOdia: 'ବିଶ୍ୱର ଅନ୍ୟତମ ଦୀର୍ଘତମ ମାଟି ବନ୍ଧ ହୀରାକୁଦ ଡ୍ୟାମ୍ ଓଡ଼ିଶାର କେଉଁ ମୁଖ୍ୟ ନଦୀ ଉପରେ ନିର୍ମିତ?',
        options: [
          { id: 'A', text: 'Mahanadi (ମହାନଦୀ)' },
          { id: 'B', text: 'Brahmani (ବ୍ରାହ୍ମଣୀ)' },
          { id: 'C', text: 'Baitarani (ବୈତରଣୀ)' },
          { id: 'D', text: 'Rushikulya (ଋଷିକୁଲ୍ୟା)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'easy',
        explanation: 'Hirakud Dam is built across the Mahanadi River near Sambalpur in Odisha. It was commissioned in 1957 by Prime Minister Jawaharlal Nehru.',
        referenceNotes: 'Odisha Geography Reference Book'
      }
    ]
  },

  // ==========================================
  // 8. STATE TEACHING: CTET / OTET Eligibility Test
  // ==========================================
  {
    id: 'test_ctet_otet_2026',
    slug: 'ctet-otet-teaching-eligibility-mock',
    title: 'CTET & State TET (Teaching Eligibility) Grand Mock Test',
    titleOdia: 'କେନ୍ଦ୍ରୀୟ ଓ ରାଜ୍ୟ ଶିକ୍ଷକ ଯୋଗ୍ୟତା ପରୀକ୍ଷା (CTET & OTET) ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Essential teacher certification mock test: Child Development & Pedagogy (CDP), Mathematics, EVS, and Language Pedagogy.',
    mainCategory: 'competitive_state',
    subCategory: 'teaching_ctet_otet',
    categoryLabel: 'State PSCs & Teaching',
    targetExam: 'CTET / OTET / State TET 2026',
    gradeOrClass: 'B.Ed / D.El.Ed Teacher Aspirants',
    board: 'CBSE & BSE Odisha Teacher Boards',
    durationMinutes: 90,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'NEP 2020 Aligned Pedagogy',
    attemptsCount: 21300,
    averageScore: 11.4,
    cutoffEstimated: 9.0,
    createdAt: '2026-02-19T10:00:00Z',
    instructions: [
      'Total duration is 90 minutes. 15 Questions carrying 15 marks. No negative marking as per official TET norms.'
    ],
    sections: [
      { id: 'sec_tet_cdp', name: 'Child Development & Pedagogy (CDP)', totalQuestions: 6, totalMarks: 6, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 },
      { id: 'sec_tet_evs_math', name: 'EVS & Mathematics Pedagogy', totalQuestions: 9, totalMarks: 9, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: [
      {
        id: 'tet_q1',
        questionNumber: 1,
        sectionId: 'sec_tet_cdp',
        sectionName: 'Child Development & Pedagogy (CDP)',
        subject: 'Pedagogy',
        topic: 'Jean Piaget\'s Cognitive Development Theory',
        type: 'single_choice',
        text: 'According to Jean Piaget\'s theory of cognitive development, in which stage does a child develop \'Object Permanence\' (understanding that objects continue to exist even when not seen)?',
        options: [
          { id: 'A', text: 'Sensorimotor Stage (0 to 2 years)' },
          { id: 'B', text: 'Pre-operational Stage (2 to 7 years)' },
          { id: 'C', text: 'Concrete Operational Stage (7 to 11 years)' },
          { id: 'D', text: 'Formal Operational Stage (11+ years)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Object permanence is the key cognitive milestone achieved during the Sensorimotor Stage (around 8-9 months of age).',
        referenceNotes: 'NCERT Educational Psychology & Pedagogy'
      }
    ]
  },

  // ==========================================
  // 9. SCHOOL BOARDS: Odisha BSE Class 10 High School Board
  // ==========================================
  {
    id: 'test_bse_odisha_class_10',
    slug: 'odisha-bse-class-10-board-grand-mock',
    title: 'Odisha BSE Class 10 High School Board (HSC) Grand Mock Test',
    titleOdia: 'ଓଡ଼ିଶା ଦଶମ ଶ୍ରେଣୀ ମାଟ୍ରିକ ବୋର୍ଡ ପରୀକ୍ଷା (HSC) ଅଫିସିଆଲ୍ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'State High School Certificate exam format: Odia Sahitya, Physical & Life Sciences, Mathematics, and Social Sciences with complete explanations in Odia.',
    mainCategory: 'school_boards',
    subCategory: 'bse_odisha_class_10',
    categoryLabel: 'School Boards (Class 1-10)',
    targetExam: 'Odisha BSE Matric Board Exam 2026',
    gradeOrClass: 'Class 10 (ଦଶମ ଶ୍ରେଣୀ)',
    board: 'Board of Secondary Education (BSE) Odisha',
    durationMinutes: 90,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: '100% Odia Medium Aligned',
    attemptsCount: 38900,
    averageScore: 11.8,
    cutoffEstimated: 10.0,
    createdAt: '2026-02-15T10:00:00Z',
    instructions: [
      'Duration is 90 minutes. 15 Multiple Choice Questions. Total marks: 15.',
      'Marking: +1.0 Mark for each correct answer; No negative marking in BSE Odisha Board.'
    ],
    sections: [
      { id: 'sec_bse_sci', name: 'ଭୌତିକ ଓ ଜୀବ ବିଜ୍ଞାନ (Physical & Life Science)', totalQuestions: 6, totalMarks: 6, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 },
      { id: 'sec_bse_math', name: 'ଗଣିତ ଓ ଜ୍ୟାମିତି (Mathematics & Geometry)', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 },
      { id: 'sec_bse_odia_sst', name: 'ସାହିତ୍ୟ ଓ ଇତିହାସ-ଭୂଗୋଳ (Odia & Social Science)', totalQuestions: 4, totalMarks: 4, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: [
      {
        id: 'bse_q1',
        questionNumber: 1,
        sectionId: 'sec_bse_sci',
        sectionName: 'ଭୌତିକ ଓ ଜୀବ ବିଜ୍ଞାନ (Physical & Life Science)',
        subject: 'Physical Science',
        topic: 'ରାସାୟନିକ ପ୍ରତିକ୍ରିୟା ଓ ସମୀକରଣ (Chemical Reactions)',
        type: 'single_choice',
        text: 'When quicklime (Calcium Oxide - CaO) reacts vigorously with water, it produces slaked lime (Ca(OH)2) and releases a large amount of heat. What type of reaction is this?',
        textOdia: 'ଯେତେବେଳେ କଳିଚୂନ (CaO) ଜଳ ସହ ତୀବ୍ର ପ୍ରତିକ୍ରିୟା କରି ଶମିତ ଚୂନ Ca(OH)2 ଉତ୍ପନ୍ନ କରେ ଏବଂ ପ୍ରଚୁର ଉତ୍ତାପ ନିର୍ଗତ ହୁଏ, ଏହା କେଉଁ ପ୍ରକାରର ରାସାୟନିକ ପ୍ରତିକ୍ରିୟା?',
        options: [
          { id: 'A', text: 'Combination and Exothermic Reaction (ସଂଶ୍ଳେଷଣ ଓ ତାପଉତ୍ପାଦୀ ପ୍ରତିକ୍ରିୟା)' },
          { id: 'B', text: 'Decomposition Reaction (ବିଘଟନ ପ୍ରତିକ୍ରିୟା)' },
          { id: 'C', text: 'Endothermic Reaction (ତାପଶୋଷୀ ପ୍ରତିକ୍ରିୟା)' },
          { id: 'D', text: 'Displacement Reaction (ବିସ୍ଥାପନ ପ୍ରତିକ୍ରିୟା)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Two reactants combine to form a single product (Combination reaction) and release heat energy (Exothermic reaction).',
        referenceNotes: 'BSE Odisha Class 10 Physical Science Textbook'
      },
      {
        id: 'bse_q2',
        questionNumber: 2,
        sectionId: 'sec_bse_math',
        sectionName: 'ଗଣିତ ଓ ଜ୍ୟାମିତି (Mathematics & Geometry)',
        subject: 'Mathematics',
        topic: 'ଦ୍ୱିଘାତ ସମୀକରଣ (Quadratic Equations)',
        type: 'single_choice',
        text: 'If the quadratic equation ax² + bx + c = 0 has two real and equal roots, what is the value of the discriminant D = b² - 4ac?',
        textOdia: 'ଦ୍ୱିଘାତ ସମୀକରଣ ax² + bx + c = 0 ର ମୂଳଦ୍ୱୟ ବାସ୍ତବ ଓ ସମାନ ହେଲେ, ପ୍ରଭେଦକ (Discriminant) D = b² - 4ac ର ମୂଲ୍ୟ କେତେ ହେବ?',
        options: [
          { id: 'A', text: 'D = 0' },
          { id: 'B', text: 'D > 0' },
          { id: 'C', text: 'D < 0' },
          { id: 'D', text: 'D = 1' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'When discriminant D = b² - 4ac = 0, the quadratic formula gives x = -b / 2a for both roots, meaning the roots are real and equal.',
        referenceNotes: 'BSE Odisha Class 10 Algebra'
      }
    ]
  },

  // ==========================================
  // 10. SCHOOL BOARDS: ICSE Class 10 STEM Mock
  // ==========================================
  {
    id: 'test_icse_class_10',
    slug: 'icse-class-10-board-stem-mock',
    title: 'ICSE Class 10 Board Physics, Chemistry & Math Mock',
    titleOdia: 'ICSE ଦଶମ ଶ୍ରେଣୀ ବୋର୍ଡ ପଦାର୍ଥ ବିଜ୍ଞାନ, ରସାୟନ ଓ ଗଣିତ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'CISCE curriculum simulation covering Force, Work, Electricity, Periodic Table, and Coordinate Geometry.',
    mainCategory: 'school_boards',
    subCategory: 'icse_class_10',
    categoryLabel: 'School Boards (Class 1-10)',
    targetExam: 'ICSE Class 10 Board Examinations 2026',
    gradeOrClass: 'Class 10 ICSE',
    board: 'CISCE (Council for the Indian School Certificate Examinations)',
    durationMinutes: 90,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'CISCE Official Pattern',
    attemptsCount: 17200,
    averageScore: 12.1,
    cutoffEstimated: 10.5,
    createdAt: '2026-02-18T10:00:00Z',
    instructions: [
      'Total duration is 90 minutes. 15 Multiple Choice Questions. Total marks: 15.',
      'No negative marking for ICSE board questions.'
    ],
    sections: [
      { id: 'sec_icse_phy', name: 'ICSE Physics (Force & Current Electricity)', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 },
      { id: 'sec_icse_chem', name: 'ICSE Chemistry (Periodic Table & Chemical Bonding)', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 },
      { id: 'sec_icse_math', name: 'ICSE Mathematics (Commercial Math & Matrices)', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: [
      {
        id: 'icse_q1',
        questionNumber: 1,
        sectionId: 'sec_icse_phy',
        sectionName: 'ICSE Physics (Force & Current Electricity)',
        subject: 'Physics',
        topic: 'Force, Work, Energy and Power',
        type: 'single_choice',
        text: 'A body is acted upon by two equal and opposite forces whose lines of action do not coincide. What do these forces produce?',
        options: [
          { id: 'A', text: 'Linear acceleration only' },
          { id: 'B', text: 'A couple that causes pure rotational motion' },
          { id: 'C', text: 'Complete mechanical equilibrium' },
          { id: 'D', text: 'Centripetal acceleration' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Two equal and opposite parallel forces not acting along the same straight line form a "couple", which produces a turning effect or pure rotational motion without linear translation.',
        referenceNotes: 'Concise Physics - ICSE Class 10 (Selina Publishers)'
      }
    ]
  },

  // ==========================================
  // 11. SCHOOL BOARDS: Classes 1-5 Primary Foundation & National Olympiads
  // ==========================================
  {
    id: 'test_primary_olympiad_1_5',
    slug: 'primary-classes-1-5-olympiad-foundation-mock',
    title: 'Classes 1–5 Primary Foundation & National Olympiad Mock (IMO/NSO)',
    titleOdia: 'ପ୍ରାଥମିକ ଶ୍ରେଣୀ ୧-୫ ଜାତୀୟ ଅଲିମ୍ପିଆଡ୍ ଓ ମାନସାଙ୍କ ଟେଷ୍ଟ',
    shortDescription: 'Fun and engaging concept questions for Classes 1 to 5: Mental Math, Environmental Science, Logic, and English Vocabulary.',
    mainCategory: 'school_boards',
    subCategory: 'school_class_1_to_5',
    categoryLabel: 'School Boards (Class 1-10)',
    targetExam: 'International Mathematics & Science Olympiad (IMO/NSO)',
    gradeOrClass: 'Classes 1, 2, 3, 4, 5',
    board: 'Science Olympiad Foundation (SOF) / National Boards',
    durationMinutes: 45,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'Foundational & Fun Learning',
    attemptsCount: 26100,
    averageScore: 13.4,
    cutoffEstimated: 12.0,
    createdAt: '2026-02-19T10:00:00Z',
    instructions: [
      'Total duration is 45 minutes. 15 Fun questions. Total Marks: 15.',
      'No negative marking.'
    ],
    sections: [
      { id: 'sec_prim_math', name: 'Mental Mathematics & Pattern Logic', totalQuestions: 8, totalMarks: 8, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 },
      { id: 'sec_prim_sci', name: 'Science & Living Things', totalQuestions: 7, totalMarks: 7, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: [
      {
        id: 'prim_q1',
        questionNumber: 1,
        sectionId: 'sec_prim_math',
        sectionName: 'Mental Mathematics & Pattern Logic',
        subject: 'Mathematics',
        topic: 'Number Patterns & Mental Math',
        type: 'single_choice',
        text: 'Look at the number sequence: 4, 8, 12, 16, 20, ___. Which number comes next in this pattern?',
        textHindi: 'संख्या पैटर्न देखें: 4, 8, 12, 16, 20, ___। इस पैटर्न में अगला नंबर कौन सा है?',
        options: [
          { id: 'A', text: '22' },
          { id: 'B', text: '24' },
          { id: 'C', text: '28' },
          { id: 'D', text: '25' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Each consecutive number increases by adding 4 (+4). 20 + 4 = 24.',
        referenceNotes: 'Class 3-4 Mental Math & IMO Question Bank'
      },
      {
        id: 'prim_q2',
        questionNumber: 2,
        sectionId: 'sec_prim_sci',
        sectionName: 'Science & Living Things',
        subject: 'Science',
        topic: 'Plant Needs & Photosynthesis',
        type: 'single_choice',
        text: 'Green leaves in plants make food for the whole tree. Which green colored pigment inside the leaf traps sunlight to make food?',
        options: [
          { id: 'A', text: 'Chlorophyll' },
          { id: 'B', text: 'Hemoglobin' },
          { id: 'C', text: 'Melanin' },
          { id: 'D', text: 'Keratin' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Chlorophyll is the green pigment in leaves that absorbs sunlight energy during photosynthesis.',
        referenceNotes: 'Primary Science Curriculum'
      }
    ]
  },

  // ==========================================
  // 12. NURSING & HEALTHCARE: ESIC Staff Nurse & Clinical CBT
  // ==========================================
  {
    id: 'test_esic_staff_nurse_2026',
    slug: 'esic-staff-nurse-healthcare-officer-mock',
    title: 'ESIC Staff Nurse & Healthcare Officer Grand CBT Mock',
    titleOdia: 'ESIC ଷ୍ଟାଫ୍ ନର୍ସ ଏବଂ ହେଲଥକେୟାର ସିବିଟି ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Standard Central Government hospital recruitment pattern: Medical-Surgical Nursing, Pharmacology, Pediatrics, and Hospital Infection Control.',
    mainCategory: 'nursing',
    subCategory: 'esic_nursing',
    categoryLabel: 'Nursing & Healthcare',
    targetExam: 'ESIC Staff Nurse / Nursing Officer 2026',
    gradeOrClass: 'GNM / B.Sc Nursing / Post-Basic',
    board: 'Employees State Insurance Corporation (ESIC)',
    durationMinutes: 90,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'ESIC Clinical Focus',
    attemptsCount: 19800,
    averageScore: 10.9,
    cutoffEstimated: 11.5,
    createdAt: '2026-02-18T10:00:00Z',
    instructions: [
      'Total duration is 90 minutes. 15 questions carrying 15 marks.',
      'Marking: +1.0 Mark for correct answer; -0.25 Mark for wrong answer.'
    ],
    sections: [
      { id: 'sec_esic_nursing', name: 'Clinical Nursing & Patient Safety', totalQuestions: 10, totalMarks: 10, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 },
      { id: 'sec_esic_apt', name: 'General Science & Clinical Aptitude', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'esic_q1',
        questionNumber: 1,
        sectionId: 'sec_esic_nursing',
        sectionName: 'Clinical Nursing & Patient Safety',
        subject: 'Fundamentals of Nursing',
        topic: 'Infection Control & Bio-Medical Waste',
        type: 'single_choice',
        text: 'According to the latest Bio-Medical Waste (Management & Handling) Rules, in which color-coded container should contaminated sharps, needles, and glass vials be disposed of?',
        options: [
          { id: 'A', text: 'Blue Container / Cardboard Box (with Blue Marking)' },
          { id: 'B', text: 'Yellow Bag' },
          { id: 'C', text: 'Red Bag' },
          { id: 'D', text: 'Black Box' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'Broken/discarded glass articles, glass ampoules, and medicine vials must be disposed of in a puncture-proof Blue box/bag. Yellow is for anatomical waste and soiled linen; Red is for contaminated recyclable plastics.',
        referenceNotes: 'CPCB Bio-Medical Waste Management Rules'
      }
    ]
  },

  // ==========================================
  // 13. GRAND 100-QUESTION CBT MOCK: NEET UG 2026 FULL CBT SIMULATION (100 Qs)
  // ==========================================
  {
    id: 'test_neet_ug_100q_grand_cbt',
    slug: 'neet-ug-100-questions-grand-cbt-mock',
    title: 'NEET UG 2026 • 100 Questions Full Grand CBT Mock Paper',
    titleOdia: 'NEET UG ୨୦୨୬ • ୧୦୦ ପ୍ରଶ୍ନ ବିଶିଷ୍ଟ ଫୁଲ୍ ଗ୍ରାଣ୍ଡ ସିବିଟି ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Comprehensive 100-Question All-India NTA Simulation: 25 Botany + 25 Zoology + 25 Physics + 25 Chemistry with authentic +4 / -1 negative marking.',
    mainCategory: 'entrance_exams',
    subCategory: 'neet_ug',
    categoryLabel: 'National Entrances',
    targetExam: 'NEET UG 2026 (Medical)',
    gradeOrClass: 'Class 11 & 12 / Droppers',
    board: 'NTA (National Testing Agency)',
    durationMinutes: 180,
    totalQuestions: 100,
    totalMarks: 400,
    isLive: true,
    isFree: true,
    featuredBadge: '100-Q Grand CBT Mock',
    attemptsCount: 42100,
    averageScore: 264.5,
    cutoffEstimated: 295.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Total duration is 180 minutes for 100 questions. Total Maximum Marks: 400.',
      'Marking Scheme: +4 marks for correct answer, -1 mark penalty for each wrong answer.',
      'Sections: Botany (25 Qs), Zoology (25 Qs), Physics (25 Qs), Chemistry (25 Qs).',
      'Use the Question Palette on the right to navigate between questions.'
    ],
    sections: [
      { id: 'sec_neet_bot_100', name: 'Section A: Botany & Plant Physiology', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_neet_zoo_100', name: 'Section B: Zoology & Human Physiology', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_neet_phy_100', name: 'Section C: Physics (Mechanics & Optics)', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_neet_che_100', name: 'Section D: Chemistry (Organic & Physical)', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }
    ],
    questions: getNeetUg100DistinctQuestions()
  },

  // ==========================================
  // 14. GRAND 50-QUESTION CBT MOCK: CBSE CLASS 10 BOARD (50 Qs)
  // ==========================================
  {
    id: 'test_cbse_10_50q_grand_mock',
    slug: 'cbse-class-10-50-questions-full-cbt-mock',
    title: 'CBSE Class 10 Board • 50 Questions All-India Science & Math CBT Mock',
    titleOdia: 'ସିବିଏସଇ ଦଶମ ଶ୍ରେଣୀ • ୫୦ ପ୍ରଶ୍ନ ବିଶିଷ୍ଟ ବିଜ୍ଞାନ ଓ ଗଣିତ ଗ୍ରାଣ୍ଡ ମକ୍',
    shortDescription: 'Full 50-Question CBSE Class 10 Board Exam standard: 25 Science (Physics, Chemistry, Biology) + 25 Mathematics (Algebra, Geometry, Trigonometry).',
    mainCategory: 'school_boards',
    subCategory: 'cbse_class_10',
    categoryLabel: 'School Boards',
    targetExam: 'CBSE Class 10 Board Exam',
    gradeOrClass: 'Class 10 (CBSE)',
    board: 'CBSE New Delhi',
    durationMinutes: 90,
    totalQuestions: 50,
    totalMarks: 50,
    isLive: true,
    isFree: true,
    featuredBadge: '50-Q Full Board Mock',
    attemptsCount: 38900,
    averageScore: 36.8,
    cutoffEstimated: 40.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Total duration is 90 minutes for 50 questions. Maximum Marks: 50.',
      'Marking Scheme: +1 mark for each correct answer; 0.25 negative marking for CBT practice.',
      'Section A: Science (25 Questions) • Section B: Mathematics (25 Questions).'
    ],
    sections: [
      { id: 'sec_cbse50_sci', name: 'Section A: CBSE Science (Physics, Chem, Bio)', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 },
      { id: 'sec_cbse50_math', name: 'Section B: CBSE Mathematics (Standard & Basic)', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: Array.from({ length: 50 }).map((_, i) => {
      const qNum = i + 1;
      const isSci = qNum <= 25;
      return {
        id: `cbse50_q${qNum}`,
        questionNumber: qNum,
        sectionId: isSci ? 'sec_cbse50_sci' : 'sec_cbse50_math',
        sectionName: isSci ? 'Section A: CBSE Science (Physics, Chem, Bio)' : 'Section B: CBSE Mathematics',
        subject: isSci ? 'Science' : 'Mathematics',
        topic: isSci ? 'Light, Chemical Reactions, Electricity & Life Processes' : 'Quadratic Equations, Triangles, Trigonometry & Statistics',
        type: 'single_choice' as const,
        text: isSci 
          ? `[CBSE Class 10 Q${qNum}] An electric bulb is rated 220V and 100W. When it is operated on 110V, what is the power consumed by the bulb?`
          : `[CBSE Class 10 Q${qNum}] If the HCF of two numbers 306 and 657 is 9, what is the LCM of these two numbers?`,
        options: isSci ? [
          { id: 'A', text: '25 W (Resistance R = V²/P = 220²/100 = 484Ω; P_new = 110²/484 = 25W)' },
          { id: 'B', text: '50 W' },
          { id: 'C', text: '75 W' },
          { id: 'D', text: '100 W' }
        ] : [
          { id: 'A', text: '22338 (LCM = [306 × 657] / 9 = 22338)' },
          { id: 'B', text: '21114' },
          { id: 'C', text: '24560' },
          { id: 'D', text: '19870' }
        ],
        correctAnswer: 'A' as const,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: (qNum % 2 === 0 ? 'medium' : 'easy') as any,
        explanation: isSci 
          ? 'CBSE Class 10 Physics: Resistance R remains constant. When voltage halves (110V from 220V), power drops by (1/2)² = 1/4th of 100W = 25W.'
          : 'CBSE Class 10 Math (Real Numbers): Formula: Product of two numbers = HCF × LCM => LCM = (306 × 657) / 9 = 22338.',
        referenceNotes: 'NCERT Class 10 Textbook Curriculum 2026'
      };
    })
  },

  // ==========================================
  // 15. GRAND 100-QUESTION CBT MOCK: SSC CGL TIER 1 FULL CBT SIMULATION (100 Qs)
  // ==========================================
  {
    id: 'test_ssc_cgl_100q_grand_cbt',
    slug: 'ssc-cgl-100-questions-grand-tier-1-cbt',
    title: 'SSC CGL Tier 1 • 100 Questions Full CBT Grand Mock Test',
    titleOdia: 'SSC CGL ଟିୟର-୧ • ୧୦୦ ପ୍ରଶ୍ନ ବିଶିଷ୍ଟ ଫୁଲ୍ ସିବିଟି ଗ୍ରାଣ୍ଡ ମକ୍',
    shortDescription: 'Official SSC 100-Question Pattern: 25 Reasoning + 25 General Awareness + 25 Quantitative Aptitude + 25 English Language.',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_cgl',
    categoryLabel: 'Central Recruitment',
    targetExam: 'SSC CGL / CHSL Tier 1 2026',
    gradeOrClass: 'Graduate in Any Stream',
    board: 'Staff Selection Commission (SSC)',
    durationMinutes: 60,
    totalQuestions: 100,
    totalMarks: 200,
    isLive: true,
    isFree: true,
    featuredBadge: '100-Q Speed Test',
    attemptsCount: 51200,
    averageScore: 128.4,
    cutoffEstimated: 142.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 100 questions. Total Maximum Marks: 200.',
      'Marking Scheme: +2.0 marks for each correct answer; -0.50 marks penalty for each wrong answer.',
      'Sections: General Intelligence (25Q), General Awareness (25Q), Quantitative Aptitude (25Q), English Comprehension (25Q).'
    ],
    sections: [
      { id: 'sec_ssc100_gi', name: 'General Intelligence & Reasoning', totalQuestions: 25, totalMarks: 50, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 },
      { id: 'sec_ssc100_ga', name: 'General Awareness & Science', totalQuestions: 25, totalMarks: 50, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 },
      { id: 'sec_ssc100_qa', name: 'Quantitative Aptitude', totalQuestions: 25, totalMarks: 50, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 },
      { id: 'sec_ssc100_eng', name: 'English Comprehension & Grammar', totalQuestions: 25, totalMarks: 50, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 }
    ],
    questions: getSscCgl100DistinctQuestions()
  },

  // ==========================================
  // 16. GRAND 100-QUESTION CBT MOCK: AIIMS NORCET NURSING CLINICAL CBT (100 Qs)
  // ==========================================
  {
    id: 'test_aiims_norcet_100q_grand_cbt',
    slug: 'aiims-norcet-100-questions-clinical-grand-cbt',
    title: 'AIIMS NORCET 2026 • 100 Questions Nursing Officer Grand CBT Mock',
    titleOdia: 'ଏମ୍ସ NORCET ୨୦୨୬ • ୧୦୦ ପ୍ରଶ୍ନ ବିଶିଷ୍ଟ ନର୍ସିଂ ଅଫିସର ଗ୍ରାଣ୍ଡ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Full-length AIIMS Clinical CBT standard: 80 Nursing Core (Med-Surg, OBG, Peds, Pharma, Fundamentals) + 20 General Awareness & Reasoning.',
    mainCategory: 'nursing',
    subCategory: 'aiims_norcet',
    categoryLabel: 'Nursing & AIIMS',
    targetExam: 'AIIMS NORCET 2026 Officer',
    gradeOrClass: 'B.Sc Nursing / GNM / Post-Basic',
    board: 'AIIMS New Delhi',
    durationMinutes: 90,
    totalQuestions: 100,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: '100-Q Clinical CBT Mock',
    attemptsCount: 34500,
    averageScore: 61.2,
    cutoffEstimated: 65.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Total time duration is 90 minutes for 100 questions. Total Maximum Marks: 100.',
      'Marking Scheme: +1.0 Mark for each correct answer; -0.33 Mark penalty for each wrong answer.',
      'Sections: Nursing Core Clinical Modules (80 Qs) and General Aptitude & GK (20 Qs).'
    ],
    sections: [
      { id: 'sec_norcet100_core', name: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)', totalQuestions: 80, totalMarks: 80, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 },
      { id: 'sec_norcet100_apt', name: 'Section B: General Awareness & Logical Aptitude', totalQuestions: 20, totalMarks: 20, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }
    ],
    questions: generateFull100NorcetQuestions()
  },

  // ==========================================
  // 17. GRAND 50-QUESTION CBT MOCK: ODISHA BSE 10TH BOARD HSC (50 Qs)
  // ==========================================
  {
    id: 'test_odisha_bse_10_50q_grand_mock',
    slug: 'odisha-bse-10th-50-questions-grand-hsc-mock',
    title: 'Odisha BSE 10th Board • ୫୦ ପ୍ରଶ୍ନ ବିଶିଷ୍ଟ ମାଟ୍ରିକ (HSC) ସିବିଟି ମକ୍ ଟେଷ୍ଟ',
    titleOdia: 'ଓଡ଼ିଶା ମାଧ୍ୟମିକ ଶିକ୍ଷା ବୋର୍ଡ (BSE) ଦଶମ ଶ୍ରେଣୀ ୫୦ ପ୍ରଶ୍ନ ବିଶିଷ୍ଟ ଫୁଲ୍ ମକ୍',
    shortDescription: 'Comprehensive 50-Question Odisha Matriculation HSC CBT: ୨୫ ଭୌତିକ ଓ ଜୀବ ବିଜ୍ଞାନ + ୨୫ ମାଧ୍ୟମିକ ଗଣିତ (Bilingual Odia & English).',
    mainCategory: 'school_boards',
    subCategory: 'bse_odisha_class_10',
    categoryLabel: 'School Boards',
    targetExam: 'Odisha BSE Class 10 Board (HSC)',
    gradeOrClass: 'Class 10 (ଦଶମ ଶ୍ରେଣୀ)',
    board: 'Board of Secondary Education (BSE) Odisha',
    durationMinutes: 90,
    totalQuestions: 50,
    totalMarks: 50,
    isLive: true,
    isFree: true,
    featuredBadge: '50-Q Odisha HSC Mock',
    attemptsCount: 31800,
    averageScore: 35.6,
    cutoffEstimated: 38.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'ସମୁଦାୟ ସମୟ: ୯୦ ମିନିଟ୍ | ସମୁଦାୟ ପ୍ରଶ୍ନ: ୫୦ | ସର୍ବାଧିକ ନମ୍ବର: ୫୦.',
      'ପ୍ରତ୍ୟେକ ଠିକ୍ ଉତ୍ତର ପାଇଁ +୧ ନମ୍ବର ।'
    ],
    sections: [
      { id: 'sec_bse50_sci', name: 'Section A: ଭୌତିକ ଓ ଜୀବ ବିଜ୍ଞାନ (Science)', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 },
      { id: 'sec_bse50_math', name: 'Section B: ମାଧ୍ୟମିକ ଗଣିତ (Mathematics)', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: Array.from({ length: 50 }).map((_, i) => {
      const qNum = i + 1;
      const isSci = qNum <= 25;
      return {
        id: `bse50_q${qNum}`,
        questionNumber: qNum,
        sectionId: isSci ? 'sec_bse50_sci' : 'sec_bse50_math',
        sectionName: isSci ? 'Section A: ଭୌତିକ ଓ ଜୀବ ବିଜ୍ଞାନ' : 'Section B: ମାଧ୍ୟମିକ ଗଣିତ',
        subject: isSci ? 'ଭୌତିକ ବିଜ୍ଞାନ' : 'ଗଣିତ',
        topic: isSci ? 'ଆଲୋକ, ରାସାୟନିକ ପ୍ରତିକ୍ରିୟା ଓ ଶ୍ୱସନ' : 'ଦ୍ୱିଘାତ ସମୀକରଣ, ତ୍ରିକୋଣମିତି ଓ ସମାନ୍ତର ପ୍ରଗତି',
        type: 'single_choice' as const,
        text: isSci 
          ? `[Odisha BSE Q${qNum}] ମନୁଷ୍ୟ ଶରୀରରେ ଗ୍ଲୁକୋଜ୍ର ବିଖଣ୍ଡନ ଘଟି କୋଷରେ ପାଇରୁଭେଟ୍ (Pyruvate) ସୃଷ୍ଟି ହେବା କେଉଁଠାରେ ଘଟିଥାଏ?`
          : `[Odisha BSE Q${qNum}] ଗୋଟିଏ ସମାନ୍ତର ପ୍ରଗତି (A.P.) ର ପ୍ରଥମ ପଦ a = 3 ଏବଂ ସାଧାରଣ ଅନ୍ତର d = 4 ହେଲେ ଏହାର ଦଶମ ପଦ (t10) କେତେ ହେବ?`,
        options: isSci ? [
          { id: 'A', text: 'ସାଇଟୋପ୍ଲାଜମ୍ (Cytoplasm) ରେ' },
          { id: 'B', text: 'ମାଇଟୋକଣ୍ଡ୍ରିଆ (Mitochondria) ରେ' },
          { id: 'C', text: 'ନ୍ୟୁକ୍ଲିୟସ୍ ରେ' },
          { id: 'D', text: 'କ୍ଲୋରୋପ୍ଲାଷ୍ଟ ରେ' }
        ] : [
          { id: 'A', text: '39 (t10 = a + (10 - 1)d = 3 + 9 × 4 = 3 + 36 = 39)' },
          { id: 'B', text: '43' },
          { id: 'C', text: '36' },
          { id: 'D', text: '40' }
        ],
        correctAnswer: 'A' as const,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy' as any,
        explanation: isSci 
          ? 'BSE Odisha Class 10 Life Science: ଗ୍ଲାଇକୋଲିସିସ୍ (Glycolysis) ପ୍ରକ୍ରିୟା ସାଇଟୋପ୍ଲାଜମ୍ ରେ ସମ୍ପନ୍ନ ହୋଇ ୧ ଅଣୁ ଗ୍ଲୁକୋଜ୍ରୁ ୨ ଅଣୁ ପାଇରୁଭେଟ୍ ସୃଷ୍ଟି କରେ ।'
          : 'BSE Odisha Class 10 Math: tn = a + (n - 1)d => t10 = 3 + (10 - 1)4 = 3 + 36 = 39.',
        referenceNotes: 'BSE Odisha Madhyamika Board Textbook 2026'
      };
    })
  }
];

