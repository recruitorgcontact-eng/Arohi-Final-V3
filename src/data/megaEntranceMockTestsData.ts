import { MockTest } from '../types/examTypes';

export const MEGA_ENTRANCE_MOCK_TESTS: MockTest[] = [
  // 1. NEET UG Physics Mechanics & Modern Physics
  {
    id: 'test_neet_physics_speed_cbt',
    slug: 'neet-ug-physics-mechanics-modern-physics-cbt',
    title: 'NEET UG Physics • Mechanics, Electrodynamics & Modern Physics Drill',
    titleOdia: 'NEET UG ପଦାର୍ଥ ବିଜ୍ଞାନ • ମେକାନିକ୍ସ ଓ ଆଧୁନିକ ପଦାର୍ଥ ବିଜ୍ଞାନ ମକ୍',
    shortDescription: 'Targeted NTA NEET UG Physics: Kinematics, Rotational Motion, Current Electricity, Optics, and Photoelectric Effect.',
    mainCategory: 'entrance_exams',
    subCategory: 'neet_ug',
    categoryLabel: 'National Entrances',
    targetExam: 'NEET UG 2026',
    gradeOrClass: 'Class 11 & 12 / Dropper',
    board: 'National Testing Agency (NTA)',
    durationMinutes: 45,
    totalQuestions: 25,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'NEET Physics 180/180',
    attemptsCount: 38900,
    averageScore: 68.5,
    cutoffEstimated: 75.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+4 for correct, -1 penalty for incorrect response).'],
    sections: [{ id: 'sec_np', name: 'NEET Physics Drill', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'np_q1',
        questionNumber: 1,
        sectionId: 'sec_np',
        sectionName: 'Modern Physics',
        subject: 'Physics',
        topic: 'Dual Nature of Radiation & Matter',
        type: 'single_choice',
        text: 'The de Broglie wavelength (λ) of an electron accelerated from rest through a potential difference of V volts is approximately given by:',
        options: [
          { id: 'A', text: 'λ = 12.27 / √V Å (in Angstroms)' },
          { id: 'B', text: 'λ = 1.227 / V Å' },
          { id: 'C', text: 'λ = √V / 12.27 Å' },
          { id: 'D', text: 'λ = 12.27 × V Å' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'For an electron: λ = h / √(2m·e·V) = 1.227 / √V nm = 12.27 / √V Å.',
        referenceNotes: 'NCERT Class 12 Physics Dual Nature'
      }
    ]
  },

  // 2. NEET UG Chemistry Organic Reaction Mechanisms
  {
    id: 'test_neet_chemistry_organic_drill',
    slug: 'neet-ug-organic-chemistry-reaction-mechanisms',
    title: 'NEET UG Chemistry • Complete Organic Reactions & Named Reagents',
    titleOdia: 'NEET UG ରସାୟନ ବିଜ୍ଞାନ • ଅର୍ଗାନିକ୍ ରିଆକ୍ସନ ମେକାନିଜିମ୍ ମକ୍',
    shortDescription: 'Aldehydes, Ketones, Carboxylic Acids, Amines, Biomolecules, SN1/SN2 mechanisms, Aldol, Cannizzaro, and Gabriel Phthalimide.',
    mainCategory: 'entrance_exams',
    subCategory: 'neet_ug',
    categoryLabel: 'National Entrances',
    targetExam: 'NEET UG 2026',
    gradeOrClass: 'Class 12 / Repeater',
    board: 'National Testing Agency (NTA)',
    durationMinutes: 45,
    totalQuestions: 25,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'Organic Chem Mastery',
    attemptsCount: 36400,
    averageScore: 72.4,
    cutoffEstimated: 80.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['Official NEET UG Marking (+4 / -1).'],
    sections: [{ id: 'sec_nc', name: 'Organic Chemistry', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'nc_q1',
        questionNumber: 1,
        sectionId: 'sec_nc',
        sectionName: 'Organic Reactions',
        subject: 'Chemistry',
        topic: 'Aldehydes, Ketones & Cannizzaro Reaction',
        type: 'single_choice',
        text: 'Which of the following compounds undergoes the Cannizzaro reaction upon heating with concentrated aqueous sodium hydroxide (50% NaOH)?',
        options: [
          { id: 'A', text: 'Benzaldehyde (C₆H₅CHO, lacks alpha-hydrogen)' },
          { id: 'B', text: 'Acetaldehyde (CH₃CHO)' },
          { id: 'C', text: 'Acetone (CH₃COCH₃)' },
          { id: 'D', text: 'Propanal (CH₃CH₂CHO)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'Aldehydes having no alpha-hydrogen atom (like benzaldehyde and formaldehyde) undergo disproportionation (Cannizzaro reaction) in concentrated alkali to form an alcohol and a carboxylate salt.',
        referenceNotes: 'NCERT Class 12 Chemistry Organic Unit'
      }
    ]
  },

  // 3. NEET UG Botany Genetics & Molecular Biology
  {
    id: 'test_neet_botany_genetics_cbt',
    slug: 'neet-ug-botany-genetics-molecular-biology',
    title: 'NEET UG Botany • Principles of Inheritance & Molecular Basis of Genetics',
    titleOdia: 'NEET UG ବୃକ୍ଷ ବିଜ୍ଞାନ • ଜେନେଟିକ୍ସ ଓ ମଲିକ୍ୟୁଲାର ବାୟୋଲୋଜି ମକ୍',
    shortDescription: 'Mendelian ratios, DNA replication enzymes, Transcription, Translation, Lac Operon, and Genetic Code.',
    mainCategory: 'entrance_exams',
    subCategory: 'neet_ug',
    categoryLabel: 'National Entrances',
    targetExam: 'NEET UG 2026',
    gradeOrClass: 'Class 12 / Medical Aspirant',
    board: 'National Testing Agency (NTA)',
    durationMinutes: 45,
    totalQuestions: 25,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'Botany 180 Track',
    attemptsCount: 41200,
    averageScore: 78.6,
    cutoffEstimated: 84.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['Pure NCERT line-by-line questions (+4 / -1).'],
    sections: [{ id: 'sec_nb', name: 'Botany Section', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'nb_q1',
        questionNumber: 1,
        sectionId: 'sec_nb',
        sectionName: 'Genetics',
        subject: 'Biology (Botany)',
        topic: 'Molecular Basis of Inheritance & Lac Operon',
        type: 'single_choice',
        text: 'In the classic E. coli Lac Operon model proposed by Jacob and Monod, the "lac z" gene codes for which essential enzyme?',
        options: [
          { id: 'A', text: 'Beta-galactosidase (Hydrolyzes lactose into glucose and galactose)' },
          { id: 'B', text: 'Permease' },
          { id: 'C', text: 'Transacetylase' },
          { id: 'D', text: 'RNA Polymerase' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'Lac z codes for beta-galactosidase; lac y codes for permease; lac a codes for transacetylase.',
        referenceNotes: 'NCERT Class 12 Biology Chapter 6'
      }
    ]
  },

  // 4. NEET PG / NExT Medical High-Yield Clinical
  {
    id: 'test_neet_pg_clinical_vignettes',
    slug: 'neet-pg-next-clinical-vignettes-grand-mock',
    title: 'NEET PG / NExT • All-India Clinical Vignettes & Diagnostic Mock',
    titleOdia: 'NEET PG / NExT ମେଡିକାଲ ପୋଷ୍ଟ-ଗ୍ରାଜୁଏଟ୍ • କ୍ଲିନିକାଲ ସିବିଟି ମକ୍',
    shortDescription: 'National Board of Examinations (NBE) format: Clinical case scenarios, ECG interpretation, Image-based questions, Surgery, Medicine, OBG & Pharmacology.',
    mainCategory: 'entrance_exams',
    subCategory: 'neet_pg',
    categoryLabel: 'National Entrances',
    targetExam: 'NEET PG / NExT 2026',
    gradeOrClass: 'MBBS Graduates / Interns',
    board: 'National Board of Examinations in Medical Sciences (NBEMS)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'MBBS / PG Aspirants',
    attemptsCount: 21800,
    averageScore: 61.2,
    cutoffEstimated: 68.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Clinical Vignettes (+4 correct, -1 incorrect).'],
    sections: [{ id: 'sec_pg', name: 'Clinical Medicine & Surgery', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'pg_q1',
        questionNumber: 1,
        sectionId: 'sec_pg',
        sectionName: 'Internal Medicine',
        subject: 'Cardiology',
        topic: 'Acute Myocardial Infarction & ECG Localization',
        type: 'single_choice',
        text: 'A 55-year-old diabetic male presents to the Emergency Department with crushing substernal chest pain. The 12-lead ECG demonstrates ST-segment elevation in leads II, III, and aVF with reciprocal depressions in leads I and aVL. Which coronary artery is most likely occluded?',
        options: [
          { id: 'A', text: 'Right Coronary Artery (RCA) - Inferior Wall STEMI' },
          { id: 'B', text: 'Left Anterior Descending (LAD)' },
          { id: 'C', text: 'Left Circumflex Artery (LCx)' },
          { id: 'D', text: 'Left Main Coronary Artery' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'ST elevation in leads II, III, and aVF signifies an acute Inferior Wall Myocardial Infarction, which in 85–90% of cases is caused by occlusion of the Right Coronary Artery (RCA).',
        referenceNotes: 'Harrison\'s Principles of Internal Medicine'
      }
    ]
  },

  // 5. INI-CET AIIMS Resident Mock
  {
    id: 'test_inicet_aiims_resident_mock',
    slug: 'ini-cet-aiims-pomer-jipmer-resident-mock',
    title: 'INI-CET (AIIMS, JIPMER, PGIMER, NIMHANS) • High-Yield Resident Mock',
    titleOdia: 'INI-CET (AIIMS / JIPMER / PGIMER) • ମେଡିକାଲ ପିଜି ଏଣ୍ଟ୍ରାନ୍ସ ମକ୍',
    shortDescription: 'Multi-institute PG entrance: Single best response, multiple correct, and clinical decision-making algorithms.',
    mainCategory: 'entrance_exams',
    subCategory: 'neet_pg',
    categoryLabel: 'National Entrances',
    targetExam: 'INI-CET 2026',
    gradeOrClass: 'MBBS Doctor',
    board: 'AIIMS New Delhi Examination Section',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'AIIMS INI-CET Track',
    attemptsCount: 18400,
    averageScore: 15.2,
    cutoffEstimated: 16.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['Marking: +1.0 for correct answer, -0.33 for wrong answer.'],
    sections: [{ id: 'sec_inicet', name: 'INI-CET High Yield', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }],
    questions: [
      {
        id: 'ini_q1',
        questionNumber: 1,
        sectionId: 'sec_inicet',
        sectionName: 'Pharmacology',
        subject: 'Clinical Pharmacology',
        topic: 'Drug Antidotes & Toxicology',
        type: 'single_choice',
        text: 'What is the specific, life-saving antidote administered to reverse acute Paracetamol (Acetaminophen) toxicity and replenish hepatic glutathione stores?',
        options: [
          { id: 'A', text: 'N-Acetylcysteine (NAC)' },
          { id: 'B', text: 'Flumazenil' },
          { id: 'C', text: 'Naloxone' },
          { id: 'D', text: 'Atropine' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'N-acetylcysteine (NAC) acts as a glutathione precursor and sulfhydryl group donor that detoxifies the reactive, hepatotoxic paracetamol metabolite NAPQI.',
        referenceNotes: 'KDT Pharmacology Toxicological Emergencies'
      }
    ]
  },

  // 6. JEE Main Mathematics Calculus & Conics
  {
    id: 'test_jee_main_math_calculus',
    slug: 'jee-main-math-calculus-vectors-conics-cbt',
    title: 'JEE Main Mathematics • Definite Integrals, Vectors & Coordinate Geometry',
    titleOdia: 'JEE Main ଗଣିତ • କାଲକୁଲସ, ଭେକ୍ଟର ଓ କନିକ୍ସ ସିବିଟି ମକ୍',
    shortDescription: 'National Testing Agency JEE Main pattern: Continuity & Differentiability, Definite Integrals, 3D Geometry, and Probability.',
    mainCategory: 'entrance_exams',
    subCategory: 'jee_main',
    categoryLabel: 'National Entrances',
    targetExam: 'JEE Main 2026',
    gradeOrClass: 'Class 12 / Engineering Aspirant',
    board: 'National Testing Agency (NTA)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'JEE Math 100 Percentile',
    attemptsCount: 39500,
    averageScore: 54.2,
    cutoffEstimated: 60.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+4 correct, -1 incorrect).'],
    sections: [{ id: 'sec_jm_m', name: 'Mathematics Core', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'jmm_q1',
        questionNumber: 1,
        sectionId: 'sec_jm_m',
        sectionName: 'Calculus',
        subject: 'Mathematics',
        topic: 'Definite Integrals & King\'s Property',
        type: 'single_choice',
        text: 'What is the value of the definite integral: I = ∫ [0 to π/2] (sin x) / (sin x + cos x) dx?',
        options: [
          { id: 'A', text: 'π/4 (By applying property ∫[0 to a] f(x)dx = ∫[0 to a] f(a-x)dx => 2I = π/2 => I = π/4)' },
          { id: 'B', text: 'π/2' },
          { id: 'C', text: 'π' },
          { id: 'D', text: '1' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'Applying King\'s property f(x) -> f(π/2 - x) transforms sin x to cos x. Adding the two integrals gives 2I = ∫[0 to π/2] 1 dx = π/2, so I = π/4.',
        referenceNotes: 'NCERT Class 12 Math Chapter 7'
      }
    ]
  },

  // 7. JEE Main Chemistry Physical & Inorganic
  {
    id: 'test_jee_main_chemistry_full',
    slug: 'jee-main-chemistry-thermodynamics-coordination-cbt',
    title: 'JEE Main Chemistry • Thermodynamics, Electrochemistry & Coordination Compounds',
    titleOdia: 'JEE Main ରସାୟନ ବିଜ୍ଞାନ • ତାପଗତିକୀ ଓ ସମନ୍ୱୟ ଯୌଗିକ ମକ୍',
    shortDescription: 'Chemical Kinetics, Solutions, Coordination Chemistry, Crystal Field Theory (CFT), and p-Block.',
    mainCategory: 'entrance_exams',
    subCategory: 'jee_main',
    categoryLabel: 'National Entrances',
    targetExam: 'JEE Main 2026',
    gradeOrClass: 'Class 12 / Engineering Aspirant',
    board: 'National Testing Agency (NTA)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'Chemistry 100 Percentile',
    attemptsCount: 37200,
    averageScore: 62.8,
    cutoffEstimated: 68.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+4 / -1).'],
    sections: [{ id: 'sec_jm_c', name: 'Chemistry Section', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'jmc_q1',
        questionNumber: 1,
        sectionId: 'sec_jm_c',
        sectionName: 'Inorganic Chemistry',
        subject: 'Chemistry',
        topic: 'Coordination Chemistry & Werner Theory',
        type: 'single_choice',
        text: 'How many moles of AgCl precipitate are formed when 1 mole of [Co(NH₃)₅Cl]Cl₂ is treated with excess aqueous silver nitrate (AgNO₃)?',
        options: [
          { id: 'A', text: '2 moles of AgCl (Only the 2 ionizable chloride ions in the outer coordination sphere precipitate)' },
          { id: 'B', text: '3 moles' },
          { id: 'C', text: '1 mole' },
          { id: 'D', text: 'Zero moles' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'The complex dissociates as [Co(NH₃)₅Cl]²⁺ + 2Cl⁻. Only the 2 free outer-sphere chloride counter-ions react with Ag⁺ to form 2 moles of AgCl.',
        referenceNotes: 'NCERT Class 12 Chemistry Coordination Compounds'
      }
    ]
  },

  // 8. JEE Advanced Multi-Concept Drill
  {
    id: 'test_jee_advanced_master_simulation',
    slug: 'jee-advanced-multi-concept-physics-math-chem',
    title: 'JEE Advanced (IIT Entrance) • Multi-Concept Analytical Simulation',
    titleOdia: 'JEE Advanced (IIT ପ୍ରବେଶ) • ମଲ୍ଟି-କନସେପ୍ଟ ଆନାଲିଟିକାଲ ମକ୍',
    shortDescription: 'IIT Madras/Bombay pattern: Multi-correct questions, Integer type numericals, and comprehensive paragraph analysis in Physics, Chemistry & Math.',
    mainCategory: 'entrance_exams',
    subCategory: 'jee_advanced',
    categoryLabel: 'National Entrances',
    targetExam: 'JEE Advanced 2026',
    gradeOrClass: 'Class 12 / Top 2.5 Lakh JEE Main Qualifiers',
    board: 'Joint Admission Board (IIT JAB)',
    durationMinutes: 90,
    totalQuestions: 20,
    totalMarks: 60,
    isLive: true,
    isFree: true,
    featuredBadge: 'IIT Aspirant Ultra',
    attemptsCount: 22800,
    averageScore: 28.5,
    cutoffEstimated: 32.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['Advanced analytical reasoning with partial marking (+3 for correct, -1 for wrong).'],
    sections: [{ id: 'sec_jeeadv', name: 'IIT Advanced Paper', totalQuestions: 20, totalMarks: 60, positiveMarksPerQuestion: 3.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'jadv_q1',
        questionNumber: 1,
        sectionId: 'sec_jeeadv',
        sectionName: 'Physics',
        subject: 'Physics',
        topic: 'Rotational Dynamics & Rolling without Slipping',
        type: 'single_choice',
        text: 'A solid sphere, a solid cylinder, and a hollow sphere of equal mass and radius are released from rest at the top of an inclined plane and roll down without slipping. Which object reaches the bottom first?',
        options: [
          { id: 'A', text: 'Solid Sphere (Smallest moment of inertia ratio I/mR² = 2/5 = 0.40 => Highest linear acceleration a = g sinθ / (1 + I/mR²))' },
          { id: 'B', text: 'Solid Cylinder (I/mR² = 0.50)' },
          { id: 'C', text: 'Hollow Sphere (I/mR² = 0.67)' },
          { id: 'D', text: 'All reach simultaneously' }
        ],
        correctAnswer: 'A',
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'Acceleration on an incline rolling without slipping is a = g sinθ / (1 + k²/R²). Since the solid sphere has the smallest k²/R² (0.4), it has the greatest linear acceleration and reaches the bottom in the shortest time.',
        referenceNotes: 'Irodov / HC Verma Concepts of Physics'
      }
    ]
  },

  // 9. BITSAT 2026 Speed & Accuracy CBT
  {
    id: 'test_bitsat_speed_accuracy_mock',
    slug: 'bitsat-speed-accuracy-cbt-mock',
    title: 'BITSAT 2026 • Full Speed CBT (Physics, Chem, Math, English & Logic)',
    titleOdia: 'BITSAT ୨୦୨୬ • ବିଟ୍ସ ପିଲାନି ସ୍ପିଡ୍ ସିବିଟି ମକ୍',
    shortDescription: 'Birla Institute of Technology and Science Aptitude Test: 30 Questions across 5 sections with +3 / -1 marking.',
    mainCategory: 'entrance_exams',
    subCategory: 'bitsat_engg',
    categoryLabel: 'National Entrances',
    targetExam: 'BITSAT 2026',
    gradeOrClass: 'Class 12 / Engineering',
    board: 'BITS Pilani',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 75,
    isLive: true,
    isFree: true,
    featuredBadge: 'BITS Pilani Track',
    attemptsCount: 29400,
    averageScore: 48.2,
    cutoffEstimated: 52.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['Marking: +3 for correct answer, -1 penalty for incorrect answer.'],
    sections: [{ id: 'sec_bits', name: 'BITSAT Core', totalQuestions: 25, totalMarks: 75, positiveMarksPerQuestion: 3.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'bits_q1',
        questionNumber: 1,
        sectionId: 'sec_bits',
        sectionName: 'Logical Reasoning',
        subject: 'Logical Reasoning',
        topic: 'Analogy & Verbal Logic',
        type: 'single_choice',
        text: 'Thermometer is to Temperature as Hygrometer is to:',
        options: [
          { id: 'A', text: 'Humidity' },
          { id: 'B', text: 'Atmospheric Pressure' },
          { id: 'C', text: 'Wind Velocity' },
          { id: 'D', text: 'Electric Current' }
        ],
        correctAnswer: 'A',
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'A hygrometer is an instrument used for measuring the moisture content or humidity of the atmosphere.',
        referenceNotes: 'BITSAT English Proficiency and Logical Reasoning'
      }
    ]
  },

  // 10. WBJEE Engineering Mock
  {
    id: 'test_wbjee_engineering_mock',
    slug: 'wbjee-engineering-math-physics-chem-mock',
    title: 'WBJEE (West Bengal JEE) • Mathematics & Physical Sciences CBT Mock',
    titleOdia: 'WBJEE (ପଶ୍ଚିମବଙ୍ଗ ଜେଇଇ) • ଗଣିତ ଓ ପଦାର୍ଥ-ରସାୟନ ସିବିଟି ମକ୍',
    shortDescription: 'West Bengal Joint Entrance Examinations Board pattern: High weightage Calculus, Coordinate Geometry, and Mechanics.',
    mainCategory: 'entrance_exams',
    subCategory: 'wbjee_engg',
    categoryLabel: 'National Entrances',
    targetExam: 'WBJEE 2026',
    gradeOrClass: 'Class 12 / Engineering',
    board: 'WBJEEB',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 50,
    isLive: true,
    isFree: true,
    featuredBadge: 'Jadavpur & WB Engineering',
    attemptsCount: 24300,
    averageScore: 32.1,
    cutoffEstimated: 35.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['Standard WBJEE pattern (+2 / -0.5).'],
    sections: [{ id: 'sec_wbjee', name: 'WBJEE Core', totalQuestions: 25, totalMarks: 50, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 }],
    questions: [
      {
        id: 'wbj_q1',
        questionNumber: 1,
        sectionId: 'sec_wbjee',
        sectionName: 'Mathematics',
        subject: 'Mathematics',
        topic: 'Matrices & Determinants',
        type: 'single_choice',
        text: 'If A is a square matrix of order 3 × 3 such that |A| = 5, what is the value of the determinant |adj A|?',
        options: [
          { id: 'A', text: '25 (|adj A| = |A|ⁿ⁻¹ = 5³⁻¹ = 5² = 25)' },
          { id: 'B', text: '125' },
          { id: 'C', text: '5' },
          { id: 'D', text: '15' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'For any square matrix of order n, |adj A| = |A|ⁿ⁻¹. For n=3 and |A|=5, |adj A| = 5² = 25.',
        referenceNotes: 'WBJEE Mathematics Practice Series'
      }
    ]
  },

  // 11. CAT MBA (IIMs) Quantitative & DILR
  {
    id: 'test_cat_mba_quant_dilr',
    slug: 'cat-iim-mba-quant-dilr-varc-mock',
    title: 'CAT 2026 (IIM MBA) • Quantitative Aptitude & Data Interpretation (DILR)',
    titleOdia: 'CAT ୨୦୨୬ (IIM ପ୍ରବେଶ) • କ୍ୱାଣ୍ଟ ଓ ଡାଟା ଇଣ୍ଟରପ୍ରିଟେସନ ମକ୍',
    shortDescription: 'Common Admission Test for IIMs: Arithmetic Word Problems, Algebra, Geometry, Logical Puzzles, and Data Arrangements.',
    mainCategory: 'entrance_exams',
    subCategory: 'cat_mba',
    categoryLabel: 'National Entrances',
    targetExam: 'CAT 2026',
    gradeOrClass: 'Graduates in Any Discipline',
    board: 'Indian Institutes of Management (IIMs)',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 60,
    isLive: true,
    isFree: true,
    featuredBadge: 'IIM 99+ Percentile Track',
    attemptsCount: 31200,
    averageScore: 31.4,
    cutoffEstimated: 36.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['20 Questions (+3 correct, -1 penalty for incorrect MCQs).'],
    sections: [{ id: 'sec_cat', name: 'CAT Quant & DILR', totalQuestions: 20, totalMarks: 60, positiveMarksPerQuestion: 3.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'cat_q1',
        questionNumber: 1,
        sectionId: 'sec_cat',
        sectionName: 'Quantitative Aptitude',
        subject: 'Quantitative Aptitude',
        topic: 'Time, Speed and Distance',
        type: 'single_choice',
        text: 'A train traveling at 72 km/h crosses a 200-metre-long stationary platform in 20 seconds. What is the length of the train in metres?',
        options: [
          { id: 'A', text: '200 metres (Speed = 72 × 5/18 = 20 m/s. Distance = 20 × 20 = 400 m. Train length = 400 - 200 = 200 m)' },
          { id: 'B', text: '180 metres' },
          { id: 'C', text: '250 metres' },
          { id: 'D', text: '150 metres' }
        ],
        correctAnswer: 'A',
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'Speed = 72 × (5/18) = 20 m/s. Total distance crossed = speed × time = 20 × 20 = 400 m. Length of train = Total distance - Platform length = 400 - 200 = 200 m.',
        referenceNotes: 'Arun Sharma - Quantitative Aptitude for CAT'
      }
    ]
  },

  // 12. GATE Computer Science (CS & IT)
  {
    id: 'test_gate_cs_algorithms_os_mock',
    slug: 'gate-computer-science-algorithms-os-dbms-mock',
    title: 'GATE CS & IT • Algorithms, Operating Systems, DBMS & Computer Networks',
    titleOdia: 'GATE କମ୍ପ୍ୟୁଟର ସାଇନ୍ସ • ଆଲଗୋରିଦିମ୍, OS ଓ ନେଟୱର୍କସ୍ ମକ୍',
    shortDescription: 'IIT GATE CS pattern: Asymptotic time complexity, Paging & Virtual Memory, SQL & Normalization, TCP/IP, and Discrete Mathematics.',
    mainCategory: 'entrance_exams',
    subCategory: 'gate_engineering',
    categoryLabel: 'National Entrances',
    targetExam: 'GATE CS 2026',
    gradeOrClass: 'B.Tech CSE / IT / MCA',
    board: 'IIT GATE Organizing Committee / IISc',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 30,
    isLive: true,
    isFree: true,
    featuredBadge: 'IIT M.Tech & PSU Recruitment',
    attemptsCount: 26100,
    averageScore: 17.8,
    cutoffEstimated: 19.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['GATE standard marking (+1 / +2 with -0.33 / -0.66 negative marking).'],
    sections: [{ id: 'sec_gate_cs', name: 'GATE CS Core', totalQuestions: 20, totalMarks: 30, positiveMarksPerQuestion: 1.5, negativeMarksPerQuestion: 0.5 }],
    questions: [
      {
        id: 'gcs_q1',
        questionNumber: 1,
        sectionId: 'sec_gate_cs',
        sectionName: 'Algorithms',
        subject: 'Computer Science',
        topic: 'Graph Algorithms & Shortest Path',
        type: 'single_choice',
        text: 'What is the tight worst-case time complexity of Dijkstra\'s algorithm to find the single-source shortest path in a graph with V vertices and E edges using a binary min-heap priority queue?',
        options: [
          { id: 'A', text: 'O((V + E) log V)' },
          { id: 'B', text: 'O(V²)' },
          { id: 'C', text: 'O(V · E)' },
          { id: 'D', text: 'O(E log E)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.5,
        negativeMarks: 0.5,
        difficulty: 'medium',
        explanation: 'Using an adjacency list and binary min-heap, each vertex extraction takes O(log V) and each edge relaxation takes O(log V), yielding O((V + E) log V).',
        referenceNotes: 'Cormen (CLRS) Introduction to Algorithms'
      }
    ]
  },

  // 13. GATE Mechanical Engineering
  {
    id: 'test_gate_mechanical_thermo_fluids',
    slug: 'gate-mechanical-thermodynamics-fluid-mechanics',
    title: 'GATE Mechanical • Thermodynamics, Fluid Mechanics & Strength of Materials',
    titleOdia: 'GATE ମେକାନିକାଲ ଇଞ୍ଜିନିୟରିଂ • ଥର୍ମୋଡାଇନାମିକ୍ସ ଓ ଫ୍ଲୁଇଡ୍ ମେକାନିକ୍ସ ମକ୍',
    shortDescription: 'Carnot cycles, Bernoulli equation, Mohr\'s Circle, Gear trains, and Manufacturing science.',
    mainCategory: 'entrance_exams',
    subCategory: 'gate_engineering',
    categoryLabel: 'National Entrances',
    targetExam: 'GATE ME 2026',
    gradeOrClass: 'B.Tech Mechanical',
    board: 'IIT GATE Organizing Committee',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 30,
    isLive: true,
    isFree: true,
    featuredBadge: 'PSU ME Career Track',
    attemptsCount: 23400,
    averageScore: 16.5,
    cutoffEstimated: 18.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['GATE ME standard test.'],
    sections: [{ id: 'sec_gate_me', name: 'GATE ME Section', totalQuestions: 20, totalMarks: 30, positiveMarksPerQuestion: 1.5, negativeMarksPerQuestion: 0.5 }],
    questions: [
      {
        id: 'gme_q1',
        questionNumber: 1,
        sectionId: 'sec_gate_me',
        sectionName: 'Applied Thermodynamics',
        subject: 'Mechanical Engineering',
        topic: 'Carnot Engine & Maximum Thermal Efficiency',
        type: 'single_choice',
        text: 'A reversible Carnot heat engine operates between temperatures of 600 K (source) and 300 K (sink). What is its maximum theoretical thermal efficiency (η)?',
        options: [
          { id: 'A', text: '50% (η = 1 - T_sink/T_source = 1 - 300/600 = 0.50 = 50%)' },
          { id: 'B', text: '75%' },
          { id: 'C', text: '33.3%' },
          { id: 'D', text: '100%' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.5,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'Carnot efficiency η = 1 - (T_sink / T_source) = 1 - (300 / 600) = 0.50 or 50%.',
        referenceNotes: 'PK Nag Basic & Applied Thermodynamics'
      }
    ]
  },

  // 14. CUET UG Humanities & Social Sciences
  {
    id: 'test_cuet_ug_humanities_domain',
    slug: 'cuet-ug-humanities-history-polscience-economics',
    title: 'CUET UG (Central Universities) • History, Political Science & Economics',
    titleOdia: 'CUET UG (କେନ୍ଦ୍ରୀୟ ବିଶ୍ୱବିଦ୍ୟାଳୟ) • ଇତିହାସ, ରାଜନୀତି ବିଜ୍ଞାନ ଓ ଅର୍ଥନୀତି',
    shortDescription: 'National Testing Agency CUET UG Domain Mock: Harappan Civilization, Cold War Era, Indian Constitution, and Macroeconomic Policies.',
    mainCategory: 'entrance_exams',
    subCategory: 'cuet_ug',
    categoryLabel: 'National Entrances',
    targetExam: 'CUET UG 2026',
    gradeOrClass: 'Class 12 Pass / DU Aspirant',
    board: 'National Testing Agency (NTA)',
    durationMinutes: 45,
    totalQuestions: 25,
    totalMarks: 125,
    isLive: true,
    isFree: true,
    featuredBadge: 'DU / JNU / BHU Track',
    attemptsCount: 32900,
    averageScore: 92.4,
    cutoffEstimated: 100.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+5 marks per correct answer, -1 mark penalty per incorrect response).'],
    sections: [{ id: 'sec_cuet_hum', name: 'Humanities Domain', totalQuestions: 25, totalMarks: 125, positiveMarksPerQuestion: 5.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'cuet_h_q1',
        questionNumber: 1,
        sectionId: 'sec_cuet_hum',
        sectionName: 'History',
        subject: 'Indian History',
        topic: 'Harappan Civilization & Urban Planning',
        type: 'single_choice',
        text: 'The famous "Great Bath" excavated from the Indus Valley Civilization was discovered at which ancient archaeological site?',
        options: [
          { id: 'A', text: 'Mohenjo-daro' },
          { id: 'B', text: 'Harappa' },
          { id: 'C', text: 'Lothal' },
          { id: 'D', text: 'Kalibangan' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'The Great Bath was discovered in the citadel mound of Mohenjo-daro in Sindh (modern Pakistan).',
        referenceNotes: 'NCERT Class 12 Themes in Indian History Part 1'
      }
    ]
  },

  // 15. CUET UG Commerce Domain
  {
    id: 'test_cuet_ug_commerce_domain',
    slug: 'cuet-ug-commerce-accountancy-business-economics',
    title: 'CUET UG Commerce • Accountancy, Business Studies & Economics Domain',
    titleOdia: 'CUET UG ବାଣିଜ୍ୟ • ଆକାଉଣ୍ଟାନ୍ସି ଓ ବିଜନେସ ଷ୍ଟଡିଜ୍ ମକ୍',
    shortDescription: 'NTA CUET Commerce: Financial Statements Analysis, Capital Structure, Consumer Protection Act, and Microeconomics.',
    mainCategory: 'entrance_exams',
    subCategory: 'cuet_ug',
    categoryLabel: 'National Entrances',
    targetExam: 'CUET UG 2026',
    gradeOrClass: 'Class 12 Commerce',
    board: 'National Testing Agency (NTA)',
    durationMinutes: 45,
    totalQuestions: 25,
    totalMarks: 125,
    isLive: true,
    isFree: true,
    featuredBadge: 'SRCC / Commerce Elite',
    attemptsCount: 29800,
    averageScore: 89.6,
    cutoffEstimated: 95.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['Marking: +5 for correct, -1 for wrong answer.'],
    sections: [{ id: 'sec_cuet_com', name: 'Commerce Domain', totalQuestions: 25, totalMarks: 125, positiveMarksPerQuestion: 5.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'cuet_c_q1',
        questionNumber: 1,
        sectionId: 'sec_cuet_com',
        sectionName: 'Business Studies',
        subject: 'Business Studies',
        topic: 'Principles of Management by Henri Fayol',
        type: 'single_choice',
        text: 'Which management principle formulated by Henri Fayol states that an employee should receive orders from one and only one superior authority?',
        options: [
          { id: 'A', text: 'Unity of Command' },
          { id: 'B', text: 'Unity of Direction' },
          { id: 'C', text: 'Scalar Chain' },
          { id: 'D', text: 'Division of Work' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'Unity of Command ensures clarity and avoids conflicting instructions by having each subordinate report to only one direct supervisor.',
        referenceNotes: 'NCERT Class 12 Business Studies Principles of Management'
      }
    ]
  },

  // 16. CLAT 2026 Legal Reasoning & Constitutional Principles
  {
    id: 'test_clat_legal_reasoning_grand',
    slug: 'clat-legal-reasoning-constitutional-torts-crimes',
    title: 'CLAT 2026 (NLU Law) • Legal Reasoning, Torts, Crimes & Contracts Mock',
    titleOdia: 'CLAT ୨୦୨୬ (ନ୍ୟାସନାଲ ଲ ୟୁନିଭର୍ସିଟି) • ଆଇନଗତ ତର୍କ ଓ ସମ୍ବିଧାନ ମକ୍',
    shortDescription: 'Consortium of NLUs passage-based pattern: Principle-Fact scenarios in Constitutional Law, Law of Torts (Strict & Absolute Liability), and Indian Penal Code.',
    mainCategory: 'entrance_exams',
    subCategory: 'clat_law',
    categoryLabel: 'National Entrances',
    targetExam: 'CLAT 2026',
    gradeOrClass: 'Class 12 / Law Aspirant',
    board: 'Consortium of National Law Universities',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'NLU Top Ranker',
    attemptsCount: 27600,
    averageScore: 16.8,
    cutoffEstimated: 18.5,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Passage-based questions (+1.0 for correct, -0.25 penalty for wrong answer).'],
    sections: [{ id: 'sec_clat', name: 'Legal Reasoning Section', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }],
    questions: [
      {
        id: 'clat_q1',
        questionNumber: 1,
        sectionId: 'sec_clat',
        sectionName: 'Law of Torts',
        subject: 'Legal Reasoning',
        topic: 'Absolute Liability Principle in India',
        type: 'single_choice',
        text: 'In the landmark case of M.C. Mehta v. Union of India (Oleum Gas Leak case, 1987), the Supreme Court of India established the doctrine of:',
        options: [
          { id: 'A', text: 'Absolute Liability without any exceptions of Rylands v. Fletcher' },
          { id: 'B', text: 'Strict Liability with Act of God exceptions' },
          { id: 'C', text: 'Vicarious Liability of State only' },
          { id: 'D', text: 'Contributory Negligence' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: 'Chief Justice P.N. Bhagwati held that an enterprise engaged in a hazardous or inherently dangerous industry owes an absolute and non-delegable duty to the community, without any exceptions available under strict liability.',
        referenceNotes: 'CLAT Legal Aptitude - Supreme Court Landmark Judgments'
      }
    ]
  },

  // 17. National Institute of Design (NID DAT / NIFT)
  {
    id: 'test_nid_nift_design_aptitude',
    slug: 'nid-nift-design-aptitude-test-creativity-mock',
    title: 'NID DAT & NIFT • Design Aptitude, Visual Spatial Ability & Color Theory',
    titleOdia: 'NID DAT ଓ NIFT • ଡିଜାଇନ୍ ଆପ୍ଟିଚ୍ୟୁଡ୍ ଓ ଭିଜୁଆଲ ସ୍ପାସିଆଲ ମକ୍',
    shortDescription: 'National Design entrance: Observation skills, color harmony, visual logic, geometry, and creative problem-solving.',
    mainCategory: 'entrance_exams',
    subCategory: 'entrance_exams' as any,
    categoryLabel: 'National Entrances',
    targetExam: 'NID DAT / NIFT 2026',
    gradeOrClass: '10+2 / Design Aspirant',
    board: 'National Institute of Design & NIFT',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 40,
    isLive: true,
    isFree: true,
    featuredBadge: 'Design & Fashion Track',
    attemptsCount: 16900,
    averageScore: 28.5,
    cutoffEstimated: 31.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['20 Questions (+2.0 marks each with zero negative marking).'],
    sections: [{ id: 'sec_nid', name: 'Design Aptitude', totalQuestions: 20, totalMarks: 40, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.0 }],
    questions: [
      {
        id: 'nid_q1',
        questionNumber: 1,
        sectionId: 'sec_nid',
        sectionName: 'Color Theory',
        subject: 'Design Fundamentals',
        topic: 'Complementary Color Harmony',
        type: 'single_choice',
        text: 'In the traditional standard color wheel, what is the exact complementary color located directly opposite to Blue?',
        options: [
          { id: 'A', text: 'Orange' },
          { id: 'B', text: 'Green' },
          { id: 'C', text: 'Violet' },
          { id: 'D', text: 'Red' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Complementary colors sit directly opposite each other on the color wheel: Blue pairs with Orange, Red with Green, and Yellow with Purple.',
        referenceNotes: 'NID Foundation Design Studies'
      }
    ]
  },

  // 18. NCHMCT JEE Hotel Management Entrance
  {
    id: 'test_nchmct_jee_hotel_management',
    slug: 'nchmct-jee-hotel-management-entrance-mock',
    title: 'NCHMCT JEE • Hospitality Aptitude, Service GK & Reasoning Mock',
    titleOdia: 'NCHMCT JEE ହୋଟେଲ ମ୍ୟାନେଜମେଣ୍ଟ • ସର୍ଭିସ ଆପ୍ଟିଚ୍ୟୁଡ୍ ଓ ରିଜନିଂ ମକ୍',
    shortDescription: 'National Council for Hotel Management Joint Entrance Exam: Service Sector Aptitude, Numerical Ability, Reasoning & GK.',
    mainCategory: 'entrance_exams',
    subCategory: 'entrance_exams' as any,
    categoryLabel: 'National Entrances',
    targetExam: 'NCHMCT JEE 2026',
    gradeOrClass: '10+2 Any Stream',
    board: 'National Testing Agency (NTA)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'IHM Hospitality Track',
    attemptsCount: 15400,
    averageScore: 74.2,
    cutoffEstimated: 80.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+4 correct, -1 penalty).'],
    sections: [{ id: 'sec_nchm', name: 'NCHMCT Core', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'nchm_q1',
        questionNumber: 1,
        sectionId: 'sec_nchm',
        sectionName: 'Service Aptitude',
        subject: 'Hospitality Aptitude',
        topic: 'Guest Relations & Front Office Etiquette',
        type: 'single_choice',
        text: 'When an agitated guest approaches the hotel front desk complaining loudly about a delay in room service, what is the most appropriate first step for the front desk executive?',
        options: [
          { id: 'A', text: 'Listen calmly and attentively without interrupting, empathize, and immediately apologize for the inconvenience' },
          { id: 'B', text: 'Explain that the kitchen is short-staffed and tell the guest to wait' },
          { id: 'C', text: 'Ask the guest to speak quietly before taking any action' },
          { id: 'D', text: 'Transfer the complaint directly to the security guard' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'Active listening, empathy, and maintaining composure de-escalate tension and are the cornerstone principles of premium hospitality service.',
        referenceNotes: 'NCHMCT Service Sector Aptitude'
      }
    ]
  },

  // 19. NIMCET MCA Entrance Examination
  {
    id: 'test_nimcet_mca_entrance_mock',
    slug: 'nimcet-nit-mca-entrance-math-computer-mock',
    title: 'NIMCET (NIT MCA) • Higher Mathematics, Computer Awareness & Logic',
    titleOdia: 'NIMCET (NIT ଏମସିଏ ପ୍ରବେଶ) • ଉଚ୍ଚତର ଗଣିତ ଓ କମ୍ପ୍ୟୁଟର ମକ୍',
    shortDescription: 'NIT MCA Common Entrance: Coordinate Geometry, Probability, Set Theory, Boolean Algebra, and Computer Architecture.',
    mainCategory: 'entrance_exams',
    subCategory: 'entrance_exams' as any,
    categoryLabel: 'National Entrances',
    targetExam: 'NIMCET 2026',
    gradeOrClass: 'B.Sc / BCA / B.Com with Mathematics',
    board: 'National Institutes of Technology (NITs)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'NIT MCA Master',
    attemptsCount: 19800,
    averageScore: 64.8,
    cutoffEstimated: 70.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+4 / -1 marking).'],
    sections: [{ id: 'sec_nimcet', name: 'NIMCET Paper', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'nim_q1',
        questionNumber: 1,
        sectionId: 'sec_nimcet',
        sectionName: 'Computer Awareness',
        subject: 'Computer Science',
        topic: 'Digital Logic & Boolean Algebra',
        type: 'single_choice',
        text: 'In Boolean algebra, what is the simplified output of the expression: F = A + A·B?',
        options: [
          { id: 'A', text: 'A (By Absorption Law: A + AB = A(1 + B) = A(1) = A)' },
          { id: 'B', text: 'B' },
          { id: 'C', text: 'A·B' },
          { id: 'D', text: '1' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'According to the Absorption Law in Boolean algebra, A + A·B = A(1 + B) = A · 1 = A.',
        referenceNotes: 'Morris Mano Digital Logic and Computer Design'
      }
    ]
  },

  // 20. IPMAT (IIM Indore / Rohtak Integrated MBA)
  {
    id: 'test_ipmat_iim_integrated_mba',
    slug: 'ipmat-iim-indore-rohtak-integrated-management-mock',
    title: 'IPMAT (IIM Integrated MBA) • Quantitative Ability & Verbal Ability Mock',
    titleOdia: 'IPMAT (IIM ଇଣ୍ଟିଗ୍ରେଟେଡ୍ ଏମବିଏ) • କ୍ୱାଣ୍ଟ ଓ ଭର୍ବାଲ ଆବିଲିଟି ମକ୍',
    shortDescription: 'Integrated Program in Management Aptitude Test: Higher Math (Matrices, P&C), Short Answer Quant, and Reading Comprehension.',
    mainCategory: 'entrance_exams',
    subCategory: 'entrance_exams' as any,
    categoryLabel: 'National Entrances',
    targetExam: 'IPMAT 2026',
    gradeOrClass: 'Class 12 Pass (10+2)',
    board: 'IIM Indore & IIM Rohtak',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'IIM 5-Year Dual Degree',
    attemptsCount: 22100,
    averageScore: 61.5,
    cutoffEstimated: 68.0,
    createdAt: '2026-02-22T08:00:00Z',
    instructions: ['25 Questions (+4 / -1 marking).'],
    sections: [{ id: 'sec_ipmat', name: 'IPMAT Aptitude', totalQuestions: 25, totalMarks: 100, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }],
    questions: [
      {
        id: 'ipm_q1',
        questionNumber: 1,
        sectionId: 'sec_ipmat',
        sectionName: 'Quantitative Ability',
        subject: 'Mathematics',
        topic: 'Permutations and Combinations',
        type: 'single_choice',
        text: 'In how many distinct ways can the letters of the word "AROHI" be arranged such that all vowels (A, O, I) always remain together?',
        options: [
          { id: 'A', text: '36 ways (Treat vowels {A,O,I} as 1 unit + 2 consonants {R,H} = 3 units arranged in 3! = 6 ways; 3 vowels arranged among themselves in 3! = 6 ways; Total = 6 × 6 = 36)' },
          { id: 'B', text: '120 ways' },
          { id: 'C', text: '24 ways' },
          { id: 'D', text: '72 ways' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'Letters = {A, R, O, H, I}. Vowels = {A, O, I} (3 vowels), Consonants = {R, H} (2 consonants). Group vowels into 1 block. Total blocks = 1 + 2 = 3, arranged in 3! = 6 ways. The 3 vowels arrange internally in 3! = 6 ways. Total = 6 × 6 = 36 ways.',
        referenceNotes: 'IPMAT Higher Quantitative Aptitude'
      }
    ]
  }
];
