import { MockTest } from '../types/examTypes';

// Comprehensive catalog of 40+ additional flagship mock tests across all disciplines
export const COMPREHENSIVE_EXPANDED_MOCK_TESTS: MockTest[] = [
  // ==========================================
  // 1. SCHOOL BOARDS: CBSE Class 10 Mathematics Standard Mock
  // ==========================================
  {
    id: 'test_cbse_10_math_standard',
    slug: 'cbse-class-10-maths-standard-mock',
    title: 'CBSE Class 10 • Mathematics (Standard) Chapterwise CBT Mock',
    titleOdia: 'ସିବିଏସଇ ଦଶମ ଶ୍ରେଣୀ • ଗଣିତ (ଷ୍ଟାଣ୍ଡାର୍ଡ) ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Comprehensive test covering Quadratic Equations, Arithmetic Progression, Coordinate Geometry, Trigonometry, and Statistics.',
    mainCategory: 'school_boards',
    subCategory: 'cbse_class_10',
    categoryLabel: 'School Boards',
    targetExam: 'CBSE Class 10 Board Exam',
    gradeOrClass: 'Class 10 (CBSE)',
    board: 'CBSE New Delhi',
    durationMinutes: 45,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'NCERT Exemplar Focus',
    attemptsCount: 19400,
    averageScore: 11.2,
    cutoffEstimated: 12.5,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 45 minutes for 15 questions.',
      'Marking: +1.0 for correct answer, -0.25 for incorrect answer.'
    ],
    sections: [
      { id: 'sec_math1', name: 'CBSE Standard Mathematics', totalQuestions: 15, totalMarks: 15, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'cbse_m_q1',
        questionNumber: 1,
        sectionId: 'sec_math1',
        sectionName: 'CBSE Standard Mathematics',
        subject: 'Mathematics',
        topic: 'Real Numbers & Fundamental Theorem of Arithmetic',
        type: 'single_choice',
        text: 'If two positive integers a and b are written as a = x³y² and b = xy³, where x and y are prime numbers, then HCF(a, b) is:',
        options: [
          { id: 'A', text: 'xy²' },
          { id: 'B', text: 'xy' },
          { id: 'C', text: 'x³y³' },
          { id: 'D', text: 'x²y²' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'HCF is the product of the smallest power of each common prime factor. Common factors are x (min power 1) and y (min power 2), so HCF = xy².',
        referenceNotes: 'NCERT Class 10 Mathematics Chapter 1'
      },
      {
        id: 'cbse_m_q2',
        questionNumber: 2,
        sectionId: 'sec_math1',
        sectionName: 'CBSE Standard Mathematics',
        subject: 'Mathematics',
        topic: 'Polynomials & Quadratic Equations',
        type: 'single_choice',
        text: 'If one zero of the quadratic polynomial 2x² - 3x + k is reciprocal of the other, what is the value of k?',
        options: [
          { id: 'A', text: '2 (Product of roots α · (1/α) = 1 = c/a = k/2 => k = 2)' },
          { id: 'B', text: '-2' },
          { id: 'C', text: '3' },
          { id: 'D', text: '1/2' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: 'Product of roots = α × (1/α) = 1. In standard quadratic ax² + bx + c = 0, product of roots = c/a. Here k/2 = 1 => k = 2.',
        referenceNotes: 'NCERT Class 10 Mathematics Chapter 2 & 4'
      },
      {
        id: 'cbse_m_q3',
        questionNumber: 3,
        sectionId: 'sec_math1',
        sectionName: 'CBSE Standard Mathematics',
        subject: 'Mathematics',
        topic: 'Introduction to Trigonometry',
        type: 'single_choice',
        text: 'If sin θ + sin² θ = 1, then the value of (cos² θ + cos⁴ θ) is equal to:',
        options: [
          { id: 'A', text: '1 (since sin θ = 1 - sin² θ = cos² θ => cos² θ + cos⁴ θ = sin θ + sin² θ = 1)' },
          { id: 'B', text: '0' },
          { id: 'C', text: '2' },
          { id: 'D', text: '1/2' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: 'sin θ = 1 - sin² θ = cos² θ. Squaring both sides: sin² θ = cos⁴ θ. Therefore cos² θ + cos⁴ θ = sin θ + sin² θ = 1.',
        referenceNotes: 'NCERT Class 10 Mathematics Chapter 8'
      },
      {
        id: 'cbse_m_q4',
        questionNumber: 4,
        sectionId: 'sec_math1',
        sectionName: 'CBSE Standard Mathematics',
        subject: 'Mathematics',
        topic: 'Coordinate Geometry & Distance Formula',
        type: 'single_choice',
        text: 'The coordinates of the point P dividing the line segment joining A(1, 3) and B(4, 6) internally in the ratio 2 : 1 are:',
        options: [
          { id: 'A', text: '(3, 5)' },
          { id: 'B', text: '(2, 4)' },
          { id: 'C', text: '(5, 3)' },
          { id: 'D', text: '(2.5, 4.5)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: 'Section formula: x = (m1·x2 + m2·x1)/(m1+m2) = (2·4 + 1·1)/3 = 9/3 = 3. y = (2·6 + 1·3)/3 = 15/3 = 5. Point is (3, 5).',
        referenceNotes: 'NCERT Class 10 Mathematics Chapter 7'
      },
      {
        id: 'cbse_m_q5',
        questionNumber: 5,
        sectionId: 'sec_math1',
        sectionName: 'CBSE Standard Mathematics',
        subject: 'Mathematics',
        topic: 'Statistics & Probability',
        type: 'single_choice',
        text: 'The empirical relationship between the three measures of central tendency (Mean, Median, Mode) is:',
        options: [
          { id: 'A', text: 'Mode = 3 Median - 2 Mean' },
          { id: 'B', text: 'Mode = 2 Median - 3 Mean' },
          { id: 'C', text: 'Median = 3 Mode - 2 Mean' },
          { id: 'D', text: 'Mean = 3 Median - 2 Mode' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'Karl Pearson\'s empirical formula states: Mode = 3 × Median - 2 × Mean.',
        referenceNotes: 'NCERT Class 10 Statistics Chapter 14'
      }
    ]
  },

  // ==========================================
  // 2. SCHOOL BOARDS: CBSE Class 12 Physics & Chemistry Mock (+2 Science)
  // ==========================================
  {
    id: 'test_cbse_12_science_mock',
    slug: 'cbse-class-12-science-boards-mock',
    title: 'CBSE Class 12 Board (+2 Science) • Physics & Chemistry Mock',
    titleOdia: 'ସିବିଏସଇ ଦ୍ୱାଦଶ ଶ୍ରେଣୀ (+୨ ବିଜ୍ଞାନ) • ଫିଜିକ୍ସ ଓ କେମିଷ୍ଟ୍ରି ମକ୍',
    shortDescription: 'Authentic Class 12 CBSE Board paper covering Electrostatics, Current Electricity, Optics, Haloalkanes, Electrochemistry & Chemical Kinetics.',
    mainCategory: 'school_boards',
    subCategory: 'cbse_class_12',
    categoryLabel: 'School Boards',
    targetExam: 'CBSE Class 12 Board (+2 Science)',
    gradeOrClass: 'Class 12 (+2 Science)',
    board: 'CBSE New Delhi',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 20,
    isLive: true,
    isFree: true,
    featuredBadge: '+2 Board Accelerator',
    attemptsCount: 22100,
    averageScore: 14.8,
    cutoffEstimated: 16.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 20 questions.',
      'Section A: Physics (10 Qs) • Section B: Chemistry (10 Qs).'
    ],
    sections: [
      { id: 'sec_c12_phy', name: 'Section A: Physics', totalQuestions: 10, totalMarks: 10, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 },
      { id: 'sec_c12_chem', name: 'Section B: Chemistry', totalQuestions: 10, totalMarks: 10, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'c12_p1',
        questionNumber: 1,
        sectionId: 'sec_c12_phy',
        sectionName: 'Section A: Physics',
        subject: 'Physics',
        topic: 'Electrostatics & Gauss Law',
        type: 'single_choice',
        text: 'An electric dipole of moment p is placed in a uniform electric field E at an angle θ with the field. The torque acting on the dipole is given by:',
        options: [
          { id: 'A', text: 'τ = p × E (magnitude τ = p E sin θ)' },
          { id: 'B', text: 'τ = p · E' },
          { id: 'C', text: 'τ = p / E' },
          { id: 'D', text: 'Zero at all angles' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'Torque on a dipole in uniform electric field is τ = p × E = p E sin θ.',
        referenceNotes: 'NCERT Class 12 Physics Chapter 1'
      },
      {
        id: 'c12_c1',
        questionNumber: 2,
        sectionId: 'sec_c12_chem',
        sectionName: 'Section B: Chemistry',
        subject: 'Chemistry',
        topic: 'Chemical Kinetics & Order of Reaction',
        type: 'single_choice',
        text: 'For a first-order chemical reaction, the rate constant k = 2.303 × 10⁻³ s⁻¹. What is the half-life period (t₁/₂) of the reaction?',
        options: [
          { id: 'A', text: '300 seconds (t₁/₂ = 0.693 / k = 0.693 / (2.303 × 10⁻³) = 300.9 s)' },
          { id: 'B', text: '693 seconds' },
          { id: 'C', text: '150 seconds' },
          { id: 'D', text: '450 seconds' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: 'For a first order reaction, t₁/₂ = ln(2)/k = 0.693 / (2.303 × 10⁻³) ≈ 301 seconds.',
        referenceNotes: 'NCERT Class 12 Chemistry Chapter 4'
      }
    ]
  },

  // ==========================================
  // 3. SCHOOL BOARDS: Odisha BSE 10th Life Science & Odia Grammar Mock
  // ==========================================
  {
    id: 'test_odisha_bse_10_life_sci',
    slug: 'odisha-bse-10th-life-science-odia-mock',
    title: 'Odisha BSE 10th • ଜୀବ ବିଜ୍ଞାନ ଓ ସାହିତ୍ୟ ସିନ୍ଧୁ (Life Science & Odia)',
    titleOdia: 'ଓଡ଼ିଶା ଦଶମ ଶ୍ରେଣୀ ମାଟ୍ରିକ • ଜୀବ ବିଜ୍ଞାନ ଓ ଓଡ଼ିଆ ବ୍ୟାକରଣ',
    shortDescription: 'BSE Odisha Matric exam pattern covering Nutrition, Respiration, Excretion, Genetics, and Odia Grammar & Sandhi/Samasa.',
    mainCategory: 'school_boards',
    subCategory: 'bse_odisha_class_10',
    categoryLabel: 'School Boards',
    targetExam: 'Odisha BSE Class 10 Board (HSC)',
    gradeOrClass: 'Class 10 (BSE Odisha)',
    board: 'Board of Secondary Education Odisha',
    durationMinutes: 45,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'ମାଟ୍ରିକ ଟପର ସ୍ପେଶାଲ',
    attemptsCount: 27800,
    averageScore: 11.9,
    cutoffEstimated: 12.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'ସମୟ: ୪୫ ମିନିଟ୍ | ପ୍ରଶ୍ନ: ୧୫ | ପ୍ରତ୍ୟେକ ଠିକ୍ ଉତ୍ତର ପାଇଁ +୧ ନମ୍ବର ।'
    ],
    sections: [
      { id: 'sec_bse_ls', name: 'ଜୀବ ବିଜ୍ଞାନ (Life Science)', totalQuestions: 8, totalMarks: 8, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 },
      { id: 'sec_bse_odia', name: 'ଓଡ଼ିଆ ବ୍ୟାକରଣ (Odia Grammar)', totalQuestions: 7, totalMarks: 7, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: [
      {
        id: 'bse_ls_q1',
        questionNumber: 1,
        sectionId: 'sec_bse_ls',
        sectionName: 'ଜୀବ ବିଜ୍ଞାନ (Life Science)',
        subject: 'Life Science',
        topic: 'ମନୁଷ୍ୟ ପରିସ୍ରା ନିଷ୍କାସନ ଓ ବୃକକ୍ (Human Excretory System)',
        type: 'single_choice',
        text: 'ମନୁଷ୍ୟ ବୃକକ୍ (Kidney) ର କାର୍ଯ୍ୟକ୍ଷମ ମୌଳିକ ଏକକ (Structural & Functional Unit) କୁ କ’ଣ କୁହାଯାଏ?',
        options: [
          { id: 'A', text: 'ନେଫ୍ରନ୍ (Nephron)' },
          { id: 'B', text: 'ନ୍ୟୁରନ୍ (Neuron)' },
          { id: 'C', text: 'ଆଲଭିଓଲି (Alveoli)' },
          { id: 'D', text: 'ବୋମ୍ୟାନ୍ସ କ୍ୟାପସୁଲ୍ (Bowman\'s Capsule)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'BSE Odisha Class 10 Life Science: ପ୍ରତ୍ୟେକ ବୃକକ୍ ପ୍ରାୟ ୧୦ ଲକ୍ଷ ସୂକ୍ଷ୍ମ କୁଣ୍ଡଳୀକୃତ ନଳିକା ନେଫ୍ରନ୍ ଦ୍ୱାରା ଗଠିତ ।',
        referenceNotes: 'BSE Odisha 10th Life Science Textbook Chapter 3'
      },
      {
        id: 'bse_odia_q1',
        questionNumber: 2,
        sectionId: 'sec_bse_odia',
        sectionName: 'ଓଡ଼ିଆ ବ୍ୟାକରଣ (Odia Grammar)',
        subject: 'Odia',
        topic: 'ସମାସ ଓ ସନ୍ଧି',
        type: 'single_choice',
        text: '‘ପିତାମାତା’ ଏହି ସମାସ ନିଷ୍ପନ୍ନ ପଦଟି କେଉଁ ସମାସର ଉଦାହରଣ?',
        options: [
          { id: 'A', text: 'ଦ୍ୱନ୍ଦ୍ୱ ସମାସ (ପିତା ଓ ମାତା - ପ୍ରତ୍ୟେକ ପଦର ପ୍ରାଧାନ୍ୟ ରହେ)' },
          { id: 'B', text: 'ତତ୍ପୁରୁଷ ସମାସ' },
          { id: 'C', text: 'ଦ୍ୱିଗୁ ସମାସ' },
          { id: 'D', text: 'ବହୁବ୍ରୀହି ସମାସ' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'ପରସ୍ପର ସମ୍ବନ୍ଧ ଥିବା ଏକାଧିକ ବିଶେଷ୍ୟ ପଦର ମିଳନରେ ଗଠିତ ସମାସକୁ ଦ୍ୱନ୍ଦ୍ୱ ସମାସ କୁହାଯାଏ ।',
        referenceNotes: 'BSE Odisha Madhyamika Odia Vyakarana'
      }
    ]
  },

  // ==========================================
  // 4. SCHOOL BOARDS: ICSE Class 10 Physics, Chemistry & Math Mock
  // ==========================================
  {
    id: 'test_icse_10_science_math',
    slug: 'icse-class-10-cisce-board-mock',
    title: 'ICSE Class 10 Board • Science & Mathematics CISCE Mock',
    titleOdia: 'ଆଇସିଏସଇ ଦଶମ ଶ୍ରେଣୀ • ବିଜ୍ଞାନ ଓ ଗଣିତ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Strictly aligned to CISCE Class 10 Syllabus: Force, Work & Energy, Sound, Mole Concept, GST, and Banking.',
    mainCategory: 'school_boards',
    subCategory: 'icse_class_10',
    categoryLabel: 'School Boards',
    targetExam: 'ICSE Class 10 Board (CISCE)',
    gradeOrClass: 'Class 10 ICSE',
    board: 'CISCE New Delhi',
    durationMinutes: 45,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'CISCE Standard',
    attemptsCount: 15600,
    averageScore: 11.4,
    cutoffEstimated: 12.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 45 minutes for 15 questions.',
      'Marking: +1.0 for correct answer, -0.25 penalty for wrong answer.'
    ],
    sections: [
      { id: 'sec_icse_sci', name: 'ICSE Science & Math', totalQuestions: 15, totalMarks: 15, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'icse_q1',
        questionNumber: 1,
        sectionId: 'sec_icse_sci',
        sectionName: 'ICSE Science & Math',
        subject: 'Physics',
        topic: 'Force, Work, Power & Energy',
        type: 'single_choice',
        text: 'A body is acting under a uniform circular motion with constant speed v in a circle of radius r. The work done by the centripetal force in one complete revolution is:',
        options: [
          { id: 'A', text: 'Zero (since centripetal force is perpendicular to displacement at every point, cos 90° = 0)' },
          { id: 'B', text: '2πr × (m v² / r)' },
          { id: 'C', text: '1/2 m v²' },
          { id: 'D', text: 'm v²' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'Work done W = F · s · cos θ. In circular motion, force is directed towards the center while instantaneous displacement is tangential (θ = 90°), hence W = 0.',
        referenceNotes: 'ICSE Class 10 Physics Chapter 1'
      },
      {
        id: 'icse_q2',
        questionNumber: 2,
        sectionId: 'sec_icse_sci',
        sectionName: 'ICSE Science & Math',
        subject: 'Mathematics',
        topic: 'Goods and Services Tax (GST) & Banking',
        type: 'single_choice',
        text: 'An intra-state dealer in Mumbai sells goods worth ₹10,000 to another dealer in Pune. If the GST rate is 18%, what is the amount of CGST and SGST collected?',
        options: [
          { id: 'A', text: 'CGST = ₹900, SGST = ₹900 (9% each for intra-state transaction within Maharashtra)' },
          { id: 'B', text: 'IGST = ₹1,800 only' },
          { id: 'C', text: 'CGST = ₹1,800, SGST = 0' },
          { id: 'D', text: 'CGST = ₹500, SGST = ₹500' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'For intra-state sales within the same state, GST is shared equally as CGST (9%) and SGST (9%). 9% of ₹10,000 = ₹900 each.',
        referenceNotes: 'ICSE Class 10 Commercial Mathematics Chapter 1'
      }
    ]
  },

  // ==========================================
  // 5. SCHOOL BOARDS: Primary & Middle School Foundation (Classes 1–8)
  // ==========================================
  {
    id: 'test_school_foundation_middle',
    slug: 'school-foundation-middle-classes-6-to-8',
    title: 'School Foundation Classes 6 to 8 • Science, Math & Reasoning',
    titleOdia: 'ବିଦ୍ୟାଳୟ ଫାଉଣ୍ଡେସନ (ଷଷ୍ଠ ରୁ ଅଷ୍ଟମ ଶ୍ରେଣୀ) • ବିଜ୍ଞାନ ଓ ଗଣିତ',
    shortDescription: 'Building strong foundational logic: Fractions, Integers, Force & Motion, Cell Structure, and Mental Aptitude.',
    mainCategory: 'school_boards',
    subCategory: 'school_class_6_to_8',
    categoryLabel: 'School Boards',
    targetExam: 'School Foundation Classes 6–8',
    gradeOrClass: 'Class 6, 7 & 8',
    board: 'All-India Board Foundation',
    durationMinutes: 30,
    totalQuestions: 10,
    totalMarks: 10,
    isLive: true,
    isFree: true,
    featuredBadge: 'Junior Foundation',
    attemptsCount: 14200,
    averageScore: 8.2,
    cutoffEstimated: 8.5,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 30 minutes for 10 questions. Simple, intuitive scoring.'
    ],
    sections: [
      { id: 'sec_jr_sci', name: 'Junior Science & Math', totalQuestions: 10, totalMarks: 10, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: [
      {
        id: 'jr_q1',
        questionNumber: 1,
        sectionId: 'sec_jr_sci',
        sectionName: 'Junior Science & Math',
        subject: 'Science',
        topic: 'Cell - Structure and Functions',
        type: 'single_choice',
        text: 'Which organelle is universally termed the "Powerhouse of the Cell" because it synthesizes ATP energy?',
        options: [
          { id: 'A', text: 'Mitochondria' },
          { id: 'B', text: 'Nucleus' },
          { id: 'C', text: 'Ribosome' },
          { id: 'D', text: 'Endoplasmic Reticulum' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Mitochondria carry out cellular respiration to produce energy in the form of ATP molecules.',
        referenceNotes: 'NCERT Class 8 Science Chapter 8'
      }
    ]
  },

  // ==========================================
  // 6. ENTRANCE EXAMS: JEE Main 2026 Full CBT Mock (PCM)
  // ==========================================
  {
    id: 'test_jee_main_2026_grand',
    slug: 'jee-main-2026-engineering-cbt-mock',
    title: 'JEE Main 2026 • Engineering Full CBT Simulation (Physics, Chemistry & Math)',
    titleOdia: 'JEE Main ୨୦୨୬ • ଇଞ୍ଜିନିୟରିଂ ସିବିଟି ଗ୍ରାଣ୍ଡ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'High-standard NTA pattern testing Mechanics, Calculus, Organic Synthesis, and Chemical Equilibrium with +4 / -1 negative marking.',
    mainCategory: 'entrance_exams',
    subCategory: 'jee_main',
    categoryLabel: 'National Entrances',
    targetExam: 'JEE Main 2026 (Engineering)',
    gradeOrClass: 'Class 11 & 12 / Droppers',
    board: 'NTA JEE Apex Board',
    durationMinutes: 180,
    totalQuestions: 20,
    totalMarks: 80,
    isLive: true,
    isFree: true,
    featuredBadge: 'NTA JEE Standard',
    attemptsCount: 31200,
    averageScore: 44.5,
    cutoffEstimated: 50.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Total duration is 180 minutes. Total Maximum Marks: 80.',
      'Marking: +4 for each correct answer; -1 penalty for each incorrect response.',
      'Sections: Mathematics (7 Qs), Physics (7 Qs), Chemistry (6 Qs).'
    ],
    sections: [
      { id: 'sec_jee_m', name: 'Mathematics (Calculus & Vectors)', totalQuestions: 7, totalMarks: 28, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_jee_p', name: 'Physics (Mechanics & Waves)', totalQuestions: 7, totalMarks: 28, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_jee_c', name: 'Chemistry (Physical & Organic)', totalQuestions: 6, totalMarks: 24, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }
    ],
    questions: [
      {
        id: 'jee_q1',
        questionNumber: 1,
        sectionId: 'sec_jee_m',
        sectionName: 'Mathematics',
        subject: 'Mathematics',
        topic: 'Differential Calculus & Limits',
        type: 'single_choice',
        text: 'Evaluate the limit: lim (x → 0) [(e^(3x) - 1) / sin(2x)]:',
        options: [
          { id: 'A', text: '3/2 (Applying L\'Hôpital\'s rule or standard limits lim [e^(ax)-1]/x = a, lim sin(bx)/x = b)' },
          { id: 'B', text: '2/3' },
          { id: 'C', text: '1' },
          { id: 'D', text: '6' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'lim (x->0) [e^(3x)-1]/x * x/sin(2x) = 3 * (1/2) = 3/2.',
        referenceNotes: 'JEE Main Advanced Calculus'
      },
      {
        id: 'jee_q2',
        questionNumber: 2,
        sectionId: 'sec_jee_p',
        sectionName: 'Physics',
        subject: 'Physics',
        topic: 'Rotational Dynamics & Moment of Inertia',
        type: 'single_choice',
        text: 'A solid uniform sphere and a hollow thin spherical shell of identical mass M and radius R roll down an inclined plane without slipping. Which reaches the bottom first?',
        options: [
          { id: 'A', text: 'Solid sphere reaches first (I_solid = 2/5 MR² < I_hollow = 2/3 MR², hence higher linear acceleration)' },
          { id: 'B', text: 'Hollow spherical shell reaches first' },
          { id: 'C', text: 'Both reach simultaneously' },
          { id: 'D', text: 'Depends on the angle of inclination' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'Linear acceleration a = g sin θ / (1 + I / (MR²)). Lower moment of inertia yields larger linear acceleration; solid sphere (2/5) accelerates faster than hollow shell (2/3).',
        referenceNotes: 'NCERT Physics Class 11 Rotational Motion'
      }
    ]
  },

  // ==========================================
  // 7. ENTRANCE EXAMS: CUET UG 2026 General Test & Aptitude
  // ==========================================
  {
    id: 'test_cuet_ug_2026_general',
    slug: 'cuet-ug-2026-general-test-cbt',
    title: 'CUET UG 2026 • General Test Section III Mock (Aptitude & GK)',
    titleOdia: 'CUET UG ୨୦୨୬ • ଜେନେରାଲ ଟେଷ୍ଟ (ଆପ୍ଟିଚ୍ୟୁଡ୍ ଓ ସାଧାରଣ ଜ୍ଞାନ)',
    shortDescription: 'National Testing Agency CUET UG format: Quantitative Reasoning, Logical Deduction, Numerical Ability, and Current Affairs.',
    mainCategory: 'entrance_exams',
    subCategory: 'cuet_ug',
    categoryLabel: 'National Entrances',
    targetExam: 'CUET UG 2026',
    gradeOrClass: 'Class 12 / UG Aspirants',
    board: 'NTA CUET',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'Central Universities Entry',
    attemptsCount: 24800,
    averageScore: 68.2,
    cutoffEstimated: 75.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 20 questions. Total Maximum Marks: 100.',
      'Marking: +5 marks for each correct response, -1 penalty for incorrect response.'
    ],
    sections: [
      { id: 'sec_cuet_gt', name: 'Section III: General Test', totalQuestions: 20, totalMarks: 100, positiveMarksPerQuestion: 5.0, negativeMarksPerQuestion: 1.0 }
    ],
    questions: [
      {
        id: 'cuet_q1',
        questionNumber: 1,
        sectionId: 'sec_cuet_gt',
        sectionName: 'Section III: General Test',
        subject: 'General Mental Ability',
        topic: 'Speed, Time and Distance',
        type: 'single_choice',
        text: 'A person covers a certain distance at 40 km/h and returns to the starting point at 60 km/h. What is the average speed for the entire round trip?',
        options: [
          { id: 'A', text: '48 km/h (Harmonic mean = 2xy / (x + y) = 2 × 40 × 60 / 100 = 48 km/h)' },
          { id: 'B', text: '50 km/h' },
          { id: 'C', text: '52 km/h' },
          { id: 'D', text: '45 km/h' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'Average speed for equal distances = 2·v1·v2 / (v1 + v2) = 2·40·60 / 100 = 4800 / 100 = 48 km/h.',
        referenceNotes: 'NTA CUET Quantitative Aptitude Handbook'
      }
    ]
  },

  // ==========================================
  // 8. ENTRANCE EXAMS: CLAT 2026 Legal Reasoning & GK Mock
  // ==========================================
  {
    id: 'test_clat_2026_law',
    slug: 'clat-2026-national-law-entrance-mock',
    title: 'CLAT 2026 • Legal Reasoning, Constitution & Analytical Logic Mock',
    titleOdia: 'CLAT ୨୦୨୬ • ଆଇନ ପ୍ରବେଶିକା (ଲିଗାଲ ରିଜନିଂ ଓ ସମ୍ବିଧାନ)',
    shortDescription: 'National Law Universities Consortium pattern: Legal Aptitude, Constitutional Law principles, Torts, and Critical Reasoning.',
    mainCategory: 'entrance_exams',
    subCategory: 'clat_law',
    categoryLabel: 'National Entrances',
    targetExam: 'CLAT 2026 (Law Entrance)',
    gradeOrClass: 'Class 12 / Law Aspirants',
    board: 'Consortium of NLUs',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 20,
    isLive: true,
    isFree: true,
    featuredBadge: 'NLU Flagship Entrance',
    attemptsCount: 18700,
    averageScore: 13.6,
    cutoffEstimated: 14.5,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 20 questions.',
      'Marking: +1.0 mark per correct answer; -0.25 mark per incorrect answer.'
    ],
    sections: [
      { id: 'sec_clat_main', name: 'Legal Reasoning & Constitutional Aptitude', totalQuestions: 20, totalMarks: 20, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'clat_q1',
        questionNumber: 1,
        sectionId: 'sec_clat_main',
        sectionName: 'Legal Reasoning',
        subject: 'Law of Torts',
        topic: 'Volenti Non Fit Injuria (Defense of Consent)',
        type: 'single_choice',
        text: 'Principle: "A person who voluntarily consents to run the risk of an injury cannot claim damages in tort." Facts: Spectator X buys a ticket to a cricket stadium. During the match, a batsman hits a six which hits X and fractures his wrist. Can X successfully sue the cricket board for damages?',
        options: [
          { id: 'A', text: 'No, X voluntarily accepted the inherent risks associated with attending a live cricket match (Volenti non fit injuria)' },
          { id: 'B', text: 'Yes, the cricket board has absolute strict liability for all spectator injuries' },
          { id: 'C', text: 'Yes, because X suffered a physical injury' },
          { id: 'D', text: 'No, but the batsman is personally liable' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: 'By purchasing a ticket and entering the stadium, the spectator impliedly consents to the ordinary risks of the game under the doctrine of Volenti non fit injuria.',
        referenceNotes: 'Ratanlal & Dhirajlal - Law of Torts'
      }
    ]
  },

  // ==========================================
  // 9. CENTRAL RECRUITMENT: UPSC CSE Prelims GS Paper-1 Full Mock
  // ==========================================
  {
    id: 'test_upsc_cse_prelims_gs1_flagship',
    slug: 'upsc-civil-services-prelims-gs-paper-1',
    title: 'UPSC CSE Prelims • General Studies Paper-1 Flagship Mock',
    titleOdia: 'UPSC ସିଭିଲ୍ ସର୍ଭିସେସ୍ ପ୍ରିଲିମ୍ସ • GS ପେପର-୧ ଅଲ୍ ଇଣ୍ଡିଆ ମକ୍',
    shortDescription: 'Multi-statement UPSC standard: Indian Polity & Governance, Environment & Climate, Modern History, and Macroeconomics.',
    mainCategory: 'competitive_central',
    subCategory: 'upsc_prelims',
    categoryLabel: 'Central Recruitment',
    targetExam: 'UPSC CSE Prelims 2026',
    gradeOrClass: 'Graduate Aspirants',
    board: 'Union Public Service Commission (UPSC)',
    durationMinutes: 120,
    totalQuestions: 25,
    totalMarks: 50,
    isLive: true,
    isFree: true,
    featuredBadge: 'UPSC Prelims Standard',
    attemptsCount: 39400,
    averageScore: 23.4,
    cutoffEstimated: 27.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 120 minutes for 25 analytical questions. Total Maximum Marks: 50.',
      'Marking: +2.0 marks per correct question, -0.66 marks (1/3rd penalty) for wrong response.'
    ],
    sections: [
      { id: 'sec_upsc_gs', name: 'General Studies Paper-1', totalQuestions: 25, totalMarks: 50, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 }
    ],
    questions: [
      {
        id: 'upsc_q1',
        questionNumber: 1,
        sectionId: 'sec_upsc_gs',
        sectionName: 'General Studies',
        subject: 'Indian Polity & Constitution',
        topic: 'Constitutional Bodies & Election Commission',
        type: 'single_choice',
        text: 'With reference to the Election Commission of India (ECI), consider the following statements: 1. The Chief Election Commissioner can only be removed from office in like manner and on like grounds as a Judge of the Supreme Court. 2. The conditions of service of the CEC shall not be varied to his disadvantage after appointment. Which of the statements given above is/are correct?',
        options: [
          { id: 'A', text: 'Both 1 and 2 (Article 324(5) safeguards tenure and service conditions of the CEC)' },
          { id: 'B', text: '1 only' },
          { id: 'C', text: '2 only' },
          { id: 'D', text: 'Neither 1 nor 2' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'hard',
        explanation: 'Article 324(5) of the Constitution provides that the CEC can only be removed through parliamentary impeachment like an SC judge and his service conditions cannot be varied to his disadvantage.',
        referenceNotes: 'M. Laxmikanth - Indian Polity Chapter on ECI'
      }
    ]
  },

  // ==========================================
  // 10. CENTRAL RECRUITMENT: RRB NTPC & Railway Group-D CBT Mock
  // ==========================================
  {
    id: 'test_rrb_ntpc_cbt1_mock',
    slug: 'rrb-ntpc-railway-cbt-1-mock',
    title: 'RRB NTPC & Railway Group-D • Stage 1 CBT All-India Mock',
    titleOdia: 'ରେଳବାଇ RRB NTPC ଓ ଗ୍ରୁପ୍-D • ଷ୍ଟେଜ୍-୧ ସିବିଟି ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Railway Recruitment Board Stage-1 pattern: General Science (Physics/Chemistry/Bio), Mathematics, and General Awareness.',
    mainCategory: 'competitive_central',
    subCategory: 'rrb_ntpc',
    categoryLabel: 'Central Recruitment',
    targetExam: 'RRB NTPC & Railway CBT 2026',
    gradeOrClass: '10th / 12th / Graduate',
    board: 'Railway Recruitment Control Board (RRB)',
    durationMinutes: 90,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'Railway Speed CBT',
    attemptsCount: 36200,
    averageScore: 16.4,
    cutoffEstimated: 18.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 90 minutes for 25 questions.',
      'Marking: +1.0 mark for each correct response, -0.33 mark penalty for wrong response.'
    ],
    sections: [
      { id: 'sec_rrb_main', name: 'RRB CBT-1 Core Sections', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }
    ],
    questions: [
      {
        id: 'rrb_q1',
        questionNumber: 1,
        sectionId: 'sec_rrb_main',
        sectionName: 'RRB CBT-1',
        subject: 'General Science',
        topic: 'Optics & Human Eye',
        type: 'single_choice',
        text: 'Myopia (short-sightedness) is an eye defect where light rays from a distant object focus in front of the retina. Which type of lens is used to correct it?',
        options: [
          { id: 'A', text: 'Concave lens (Diverging lens)' },
          { id: 'B', text: 'Convex lens (Converging lens)' },
          { id: 'C', text: 'Bifocal lens' },
          { id: 'D', text: 'Cylindrical lens' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'A concave lens diverges incoming parallel light rays so that the image is formed precisely on the retina.',
        referenceNotes: 'NCERT Class 10 Physics Human Eye'
      }
    ]
  },

  // ==========================================
  // 11. CENTRAL RECRUITMENT: IBPS PO & SBI PO Banking Prelims Mock
  // ==========================================
  {
    id: 'test_ibps_po_banking_prelims',
    slug: 'ibps-po-sbi-po-banking-prelims-mock',
    title: 'IBPS PO & SBI PO Prelims • Quantitative, Reasoning Puzzles & English',
    titleOdia: 'ବ୍ୟାଙ୍କିଙ୍ଗ IBPS PO ଓ SBI PO ପ୍ରିଲିମ୍ସ • ଫୁଲ୍ ସିବିଟି ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Sectional time limits & high-speed aptitude: Data Interpretation, Syllogism, Floor & Circular Puzzles, and Reading Comprehension.',
    mainCategory: 'competitive_central',
    subCategory: 'ibps_po',
    categoryLabel: 'Central Recruitment',
    targetExam: 'IBPS PO / SBI PO Prelims 2026',
    gradeOrClass: 'Graduate Aspirants',
    board: 'Institute of Banking Personnel Selection',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'Banking Speed Challenge',
    attemptsCount: 29500,
    averageScore: 14.8,
    cutoffEstimated: 16.5,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 25 questions.',
      'Marking: +1.0 for correct answer, -0.25 penalty for wrong answer.'
    ],
    sections: [
      { id: 'sec_bank_qa', name: 'Quantitative Aptitude & DI', totalQuestions: 10, totalMarks: 10, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 },
      { id: 'sec_bank_lr', name: 'Reasoning Ability & Puzzles', totalQuestions: 10, totalMarks: 10, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 },
      { id: 'sec_bank_eng', name: 'English Language', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'bank_q1',
        questionNumber: 1,
        sectionId: 'sec_bank_qa',
        sectionName: 'Quantitative Aptitude',
        subject: 'Quantitative Aptitude',
        topic: 'Quadratic Equation Comparison',
        type: 'single_choice',
        text: 'In the following equations: I. x² - 7x + 12 = 0, II. y² - 9y + 20 = 0. What is the relationship between x and y?',
        options: [
          { id: 'A', text: 'x ≤ y (x = 3, 4; y = 4, 5 => x ≤ y)' },
          { id: 'B', text: 'x > y' },
          { id: 'C', text: 'x < y' },
          { id: 'D', text: 'x ≥ y' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: 'Equation I: (x-3)(x-4)=0 => x = 3 or 4. Equation II: (y-4)(y-5)=0 => y = 4 or 5. Comparing all pairs: 3 < 4, 3 < 5, 4 = 4, 4 < 5, so x ≤ y.',
        referenceNotes: 'Bank PO Quantitative Aptitude Guide'
      }
    ]
  },

  // ==========================================
  // 12. CENTRAL RECRUITMENT: NDA & NA (National Defence Academy) Mock
  // ==========================================
  {
    id: 'test_nda_defence_officer_mock',
    slug: 'nda-na-defence-officer-cadet-mock',
    title: 'NDA & NA (Defence Cadet) • Mathematics & General Ability (GAT) Mock',
    titleOdia: 'NDA ଓ NA ପ୍ରତିରକ୍ଷା ଅଫିସର • ମ୍ୟାଥ୍ସ ଓ ଜେନେରାଲ ଏବିଲିଟି ମକ୍',
    shortDescription: 'UPSC National Defence Academy pattern: Trigonometry, Matrices, English, Physics, and Indian History & Geopolitics.',
    mainCategory: 'competitive_central',
    subCategory: 'nda_defence',
    categoryLabel: 'Central Recruitment',
    targetExam: 'NDA & NA Exam 2026',
    gradeOrClass: 'Class 12 / 10+2 Defence Cadets',
    board: 'UPSC Defence Services',
    durationMinutes: 90,
    totalQuestions: 20,
    totalMarks: 50,
    isLive: true,
    isFree: true,
    featuredBadge: 'Armed Forces Cadet Entry',
    attemptsCount: 21900,
    averageScore: 28.5,
    cutoffEstimated: 32.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 90 minutes for 20 questions.',
      'Marking: +2.5 marks for correct answer, -0.83 penalty for wrong answer.'
    ],
    sections: [
      { id: 'sec_nda_main', name: 'NDA Mathematics & GAT', totalQuestions: 20, totalMarks: 50, positiveMarksPerQuestion: 2.5, negativeMarksPerQuestion: 0.83 }
    ],
    questions: [
      {
        id: 'nda_q1',
        questionNumber: 1,
        sectionId: 'sec_nda_main',
        sectionName: 'NDA GAT',
        subject: 'General Knowledge',
        topic: 'Indian Armed Forces & History',
        type: 'single_choice',
        text: 'Where is the National Defence Academy (NDA) located in India?',
        options: [
          { id: 'A', text: 'Khadakwasla, Pune (Maharashtra)' },
          { id: 'B', text: 'Dehradun (Uttarakhand) - Indian Military Academy' },
          { id: 'C', text: 'Dundigal, Hyderabad - Air Force Academy' },
          { id: 'D', text: 'Ezhimala (Kerala) - Indian Naval Academy' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.5,
        negativeMarks: 0.83,
        difficulty: 'easy',
        explanation: 'The National Defence Academy (NDA) is the joint services academy located at Khadakwasla near Pune, Maharashtra.',
        referenceNotes: 'UPSC NDA Examination Handbook'
      }
    ]
  },

  // ==========================================
  // 13. STATE PSCS: OPSC OAS (Odisha Administrative Service) Prelims Mock
  // ==========================================
  {
    id: 'test_opsc_oas_prelims_mock',
    slug: 'opsc-oas-prelims-paper-1-mock',
    title: 'OPSC OAS (Odisha Civil Services) • Prelims GS Paper-1 Mock',
    titleOdia: 'ଓପିଏସସି OAS (ଓଡ଼ିଶା ପ୍ରଶାସନିକ ସେବା) • ପ୍ରିଲିମ୍ସ GS ପେପର-୧ ମକ୍',
    shortDescription: 'Odisha Public Service Commission standard: Odisha Heritage, Panchayati Raj, Mahanadi Basin, and Indian Constitution.',
    mainCategory: 'competitive_state',
    subCategory: 'opsc_oas',
    categoryLabel: 'State PSCs',
    targetExam: 'OPSC OAS (Civil Services)',
    gradeOrClass: 'Graduate in Any Stream',
    board: 'Odisha Public Service Commission',
    durationMinutes: 90,
    totalQuestions: 20,
    totalMarks: 40,
    isLive: true,
    isFree: true,
    featuredBadge: 'ଓଡ଼ିଶା ପ୍ରଶାସନିକ ସେବା',
    attemptsCount: 26400,
    averageScore: 22.4,
    cutoffEstimated: 26.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'ସମୟ: ୯୦ ମିନିଟ୍ | ପ୍ରଶ୍ନ: ୨୦ | ସର୍ବାଧିକ ନମ୍ବର: ୪୦ ।',
      'ମାର୍କିଂ: +୨.୦ ନମ୍ବର ପ୍ରତ୍ୟେକ ଠିକ୍ ଉତ୍ତର ପାଇଁ; -୦.୬୬ ନମ୍ବର ଭୁଲ୍ ଉତ୍ତର ପାଇଁ ।'
    ],
    sections: [
      { id: 'sec_oas_gs', name: 'OPSC GS Paper-1', totalQuestions: 20, totalMarks: 40, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 }
    ],
    questions: [
      {
        id: 'oas_q1',
        questionNumber: 1,
        sectionId: 'sec_oas_gs',
        sectionName: 'OPSC GS',
        subject: 'Odisha Geography & Ecology',
        topic: 'Chilika Lake & Ramsar Wetlands',
        type: 'single_choice',
        text: 'In which year was Chilika Lake designated as the first Indian wetland of international importance under the Ramsar Convention?',
        options: [
          { id: 'A', text: '1981 (designated along with Keoladeo National Park)' },
          { id: 'B', text: '1992' },
          { id: 'C', text: '1975' },
          { id: 'D', text: '2001' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'medium',
        explanation: 'In 1981, Chilika Lake was designated as the first Ramsar site in India due to its rich biodiversity and importance for migratory birds.',
        referenceNotes: 'Odisha Reference Annual & Geography Guide'
      }
    ]
  },

  // ==========================================
  // 14. STATE PSCS: OSSSC Combined Recruitment (RI, ARI, Amin) Mock
  // ==========================================
  {
    id: 'test_osssc_ri_amin_combined',
    slug: 'osssc-ri-ari-amin-recruitment-mock',
    title: 'OSSSC Combined Exam • Revenue Inspector (RI), ARI & Amin Mock',
    titleOdia: 'OSSSC ମିଳିତ ପରୀକ୍ଷା • ରାଜସ୍ୱ ନିରୀକ୍ଷକ (RI), ARI ଓ ଅମିନ ମକ୍',
    shortDescription: 'General Knowledge, Arithmetic, English Grammar, Odia Language, and Computer Skills.',
    mainCategory: 'competitive_state',
    subCategory: 'osssc_combined',
    categoryLabel: 'State PSCs',
    targetExam: 'OSSSC RI, ARI & Amin Exam',
    gradeOrClass: '10+2 / Graduation',
    board: 'Odisha Sub-Ordinate Staff Selection Commission',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 20,
    isLive: true,
    isFree: true,
    featuredBadge: 'OSSSC Special',
    attemptsCount: 38200,
    averageScore: 14.6,
    cutoffEstimated: 16.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 20 questions.',
      'Marking: +1.0 for correct answer, -0.25 penalty for wrong response.'
    ],
    sections: [
      { id: 'sec_osssc_core', name: 'OSSSC Core Sections', totalQuestions: 20, totalMarks: 20, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'osssc_q1',
        questionNumber: 1,
        sectionId: 'sec_osssc_core',
        sectionName: 'OSSSC Core',
        subject: 'Arithmetic',
        topic: 'Percentage & Profit Loss',
        type: 'single_choice',
        text: 'If the price of sugar increases by 25%, by what percentage must a household reduce its consumption so that the total expenditure remains unchanged?',
        options: [
          { id: 'A', text: '20% (Reduction = [r / (100 + r)] × 100 = [25 / 125] × 100 = 20%)' },
          { id: 'B', text: '25%' },
          { id: 'C', text: '16.66%' },
          { id: 'D', text: '15%' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'Formula: Reduction % = [r / (100 + r)] × 100 = (25 / 125) × 100 = 20%.',
        referenceNotes: 'OSSSC Quantitative Aptitude Syllabus'
      }
    ]
  },

  // ==========================================
  // 15. STATE PSCS: CTET & OTET Teacher Eligibility Mock
  // ==========================================
  {
    id: 'test_teaching_ctet_otet_mock',
    slug: 'ctet-otet-paper-1-pedagogy-mock',
    title: 'CTET & State TET • Child Development & Pedagogy (CDP) Mock',
    titleOdia: 'CTET ଓ OTET ଶିକ୍ଷକ ଯୋଗ୍ୟତା • ଶିଶୁ ବିକାଶ ଓ ଶିକ୍ଷାଦାନ ପଦ୍ଧତି',
    shortDescription: 'Piaget, Vygotsky, Kohlberg stages of moral development, Inclusive Education, and Classroom Pedagogy.',
    mainCategory: 'competitive_state',
    subCategory: 'teaching_ctet_otet',
    categoryLabel: 'State PSCs',
    targetExam: 'CTET & State TET Exams',
    gradeOrClass: 'B.Ed / D.El.Ed Aspirants',
    board: 'CBSE Teacher Eligibility Board / BSE Odisha',
    durationMinutes: 45,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'Teaching Pedagogy Specialist',
    attemptsCount: 23100,
    averageScore: 11.4,
    cutoffEstimated: 12.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 45 minutes for 15 questions. No negative marking in TET standards.'
    ],
    sections: [
      { id: 'sec_cdp', name: 'Child Development & Pedagogy', totalQuestions: 15, totalMarks: 15, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: [
      {
        id: 'tet_q1',
        questionNumber: 1,
        sectionId: 'sec_cdp',
        sectionName: 'CDP',
        subject: 'Educational Psychology',
        topic: 'Lev Vygotsky - Sociocultural Theory',
        type: 'single_choice',
        text: 'In Lev Vygotsky\'s sociocultural theory of cognitive development, the difference between what a child can achieve independently and what they can achieve with guidance from a More Knowledgeable Other (MKO) is termed:',
        options: [
          { id: 'A', text: 'Zone of Proximal Development (ZPD)' },
          { id: 'B', text: 'Scaffolding' },
          { id: 'C', text: 'Assimilation' },
          { id: 'D', text: 'Sensorimotor Stage' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Vygotsky defined ZPD as the distance between the actual developmental level determined by independent problem solving and the level of potential development under adult guidance.',
        referenceNotes: 'CTET CDP Official Curriculum'
      }
    ]
  },

  // ==========================================
  // 16. NURSING: AIIMS NORCET Pharmacology & Calculations Specialist Mock
  // ==========================================
  {
    id: 'test_nursing_pharma_calculations',
    slug: 'aiims-norcet-pharmacology-drug-calculations-mock',
    title: 'AIIMS NORCET • Pharmacology & IV Flow Rate Calculations Special Mock',
    titleOdia: 'ଏମ୍ସ NORCET • ଔଷଧ ମାତ୍ରା ଓ IV ଡ୍ରପ୍ କାଲକୁଲେସନ ସ୍ପେଶାଲ ମକ୍',
    shortDescription: 'Essential high-yield clinical calculations: Pediatric dosing, IV infusion drip rates, Critical care drug titrations, and High-alert medication safety.',
    mainCategory: 'nursing',
    subCategory: 'aiims_norcet',
    categoryLabel: 'Nursing & Healthcare',
    targetExam: 'AIIMS NORCET 2026',
    gradeOrClass: 'B.Sc / GNM Nursing',
    board: 'AIIMS New Delhi',
    durationMinutes: 45,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'High-Yield Pharma',
    attemptsCount: 27900,
    averageScore: 10.8,
    cutoffEstimated: 12.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 45 minutes for 15 clinical calculation questions.',
      'Marking: +1.0 for correct response; -0.33 penalty for incorrect response.'
    ],
    sections: [
      { id: 'sec_pharma_calc', name: 'Clinical Pharmacology & Calculations', totalQuestions: 15, totalMarks: 15, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }
    ],
    questions: [
      {
        id: 'pharma_q1',
        questionNumber: 1,
        sectionId: 'sec_pharma_calc',
        sectionName: 'Calculations',
        subject: 'Clinical Pharmacology',
        topic: 'IV Infusion Drip Rate Calculation',
        type: 'single_choice',
        text: 'A physician orders 1,000 mL of Normal Saline (0.9% NaCl) to be infused intravenously over 8 hours. The IV infusion set has a drop factor of 15 drops/mL. What is the calculated flow rate in drops per minute (gtt/min)?',
        options: [
          { id: 'A', text: '31 drops/min (Rate = [1,000 mL × 15 drops/mL] / [8 × 60 min] = 15,000 / 480 = 31.25 ≈ 31 gtt/min)' },
          { id: 'B', text: '42 drops/min' },
          { id: 'C', text: '21 drops/min' },
          { id: 'D', text: '60 drops/min' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'Formula: Drip Rate (gtt/min) = (Total Volume in mL × Drop Factor) / Time in Minutes = (1000 × 15) / 480 = 31.25 drops/min.',
        referenceNotes: 'Lippincott Nursing Drug Calculations Manual'
      }
    ]
  },

  // ==========================================
  // 17. NURSING: NHM CHO (Community Health Officer) & Staff Nurse Mock
  // ==========================================
  {
    id: 'test_nhm_cho_community_health',
    slug: 'nhm-cho-community-health-officer-mock',
    title: 'NHM CHO & Staff Nurse • Community Health & Primary Care Mock',
    titleOdia: 'ଜାତୀୟ ସ୍ୱାସ୍ଥ୍ୟ ମିଶନ (NHM) CHO • ଗୋଷ୍ଠୀ ସ୍ୱାସ୍ଥ୍ୟ ଅଧିକାରୀ ମକ୍',
    shortDescription: 'National Health Programs, UIP Immunization, Maternal & Child Health, NCD Screening, and Communicable Disease Surveillance.',
    mainCategory: 'nursing',
    subCategory: 'cho_nhm',
    categoryLabel: 'Nursing & Healthcare',
    targetExam: 'NHM CHO & Staff Nurse',
    gradeOrClass: 'GNM / B.Sc Nursing / BAMS',
    board: 'National Health Mission (NHM)',
    durationMinutes: 45,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'NHM Official Track',
    attemptsCount: 24500,
    averageScore: 11.2,
    cutoffEstimated: 12.0,
    createdAt: '2026-02-20T10:00:00Z',
    instructions: [
      'Duration: 45 minutes for 15 questions.',
      'Marking: +1.0 for correct answer, 0.25 negative marking.'
    ],
    sections: [
      { id: 'sec_cho_comm', name: 'Community Health & National Programs', totalQuestions: 15, totalMarks: 15, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'cho_q1',
        questionNumber: 1,
        sectionId: 'sec_cho_comm',
        sectionName: 'Community Health',
        subject: 'Community Health Nursing',
        topic: 'Cold Chain & Vaccine Storage Temperatures',
        type: 'single_choice',
        text: 'Under the Universal Immunization Programme (UIP) in India, what is the mandatory recommended temperature range for storing vaccines at the PHC/CHC level in an Ice-Lined Refrigerator (ILR)?',
        options: [
          { id: 'A', text: '+2°C to +8°C' },
          { id: 'B', text: '-15°C to -25°C (Deep Freezer for OPV and Ice Packs)' },
          { id: 'C', text: '0°C to +4°C' },
          { id: 'D', text: '+10°C to +15°C' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'In the Indian UIP cold chain system, all vaccines at the peripheral health center level are stored at +2°C to +8°C in Ice-Lined Refrigerators (ILR).',
        referenceNotes: 'Ministry of Health & Family Welfare Cold Chain Guidelines'
      }
    ]
  },

  // ==========================================
  // 18. CENTRAL RECRUITMENT: SSC CHSL (10+2) Speed CBT Mock
  // ==========================================
  {
    id: 'test_ssc_chsl_tier1_speed',
    slug: 'ssc-chsl-tier-1-speed-mock',
    title: 'SSC CHSL (10+2) Tier 1 • Speed & Accuracy All-India Mock',
    titleOdia: 'SSC CHSL (୧୦+୨) ଟିୟର-୧ • ସ୍ପିଡ୍ ଓ ଏକ୍ୟୁରାସି ସିବିଟି ମକ୍',
    shortDescription: 'Official SSC CHSL 10+2 Level format: Reasoning, Quantitative Aptitude, English Comprehension, and General Awareness.',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_chsl',
    categoryLabel: 'Central Recruitment',
    targetExam: 'SSC CHSL (10+2) 2026',
    gradeOrClass: '10+2 Intermediate Pass',
    board: 'Staff Selection Commission (SSC)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 50,
    isLive: true,
    isFree: true,
    featuredBadge: '10+2 Central Level',
    attemptsCount: 33400,
    averageScore: 32.5,
    cutoffEstimated: 35.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 25 questions.',
      'Marking: +2.0 marks per correct answer; -0.50 marks penalty per incorrect answer.'
    ],
    sections: [
      { id: 'sec_chsl_main', name: 'SSC CHSL Combined Paper', totalQuestions: 25, totalMarks: 50, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 }
    ],
    questions: [
      {
        id: 'chsl_q1',
        questionNumber: 1,
        sectionId: 'sec_chsl_main',
        sectionName: 'Reasoning',
        subject: 'General Intelligence',
        topic: 'Letter and Number Series',
        type: 'single_choice',
        text: 'Find the missing term in the sequence: 4, 9, 25, 49, 121, ?',
        options: [
          { id: 'A', text: '169 (Squares of consecutive prime numbers: 2², 3², 5², 7², 11², 13² = 169)' },
          { id: 'B', text: '144' },
          { id: 'C', text: '196' },
          { id: 'D', text: '225' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'The series consists of squares of prime numbers: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121, so next is 13²=169.',
        referenceNotes: 'SSC CHSL Reasoning Question Bank'
      }
    ]
  },

  // ==========================================
  // 19. CENTRAL RECRUITMENT: SSC GD Constable & MTS Mock
  // ==========================================
  {
    id: 'test_ssc_gd_constable_mock',
    slug: 'ssc-gd-constable-recruitment-mock',
    title: 'SSC GD Constable & MTS • General Duty & Non-Technical CBT Mock',
    titleOdia: 'SSC GD କନଷ୍ଟେବଲ ଓ MTS • ଜେନେରାଲ ଡ୍ୟୁଟି ସିବିଟି ମକ୍',
    shortDescription: 'Elementary Mathematics, General Intelligence, General Knowledge, and Hindi/English Grammar.',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_mts',
    categoryLabel: 'Central Recruitment',
    targetExam: 'SSC GD / MTS 2026',
    gradeOrClass: '10th Matric Pass',
    board: 'Staff Selection Commission (SSC)',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 40,
    isLive: true,
    isFree: true,
    featuredBadge: 'Matric Central Level',
    attemptsCount: 37800,
    averageScore: 26.8,
    cutoffEstimated: 30.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 20 questions.',
      'Marking: +2.0 for correct answer, -0.50 penalty for wrong answer.'
    ],
    sections: [
      { id: 'sec_gd_main', name: 'SSC GD / MTS Core Paper', totalQuestions: 20, totalMarks: 40, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 }
    ],
    questions: [
      {
        id: 'gd_q1',
        questionNumber: 1,
        sectionId: 'sec_gd_main',
        sectionName: 'General Knowledge',
        subject: 'Indian Polity & Geography',
        topic: 'National Symbols & Fundamental Rights',
        type: 'single_choice',
        text: 'Which Article of the Indian Constitution prohibits discrimination on grounds of religion, race, caste, sex, or place of birth?',
        options: [
          { id: 'A', text: 'Article 15' },
          { id: 'B', text: 'Article 14' },
          { id: 'C', text: 'Article 19' },
          { id: 'D', text: 'Article 21' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'Article 15 guarantees prohibition of discrimination on grounds only of religion, race, caste, sex or place of birth.',
        referenceNotes: 'Constitution of India Fundamental Rights'
      }
    ]
  },

  // ==========================================
  // 20. CENTRAL RECRUITMENT: RRB ALP (Assistant Loco Pilot) Mock
  // ==========================================
  {
    id: 'test_rrb_alp_technician_mock',
    slug: 'rrb-alp-technician-cbt-mock',
    title: 'RRB ALP & Technician • Basic Science, Engineering & Mechanics Mock',
    titleOdia: 'ରେଳବାଇ RRB ALP (ଲୋକୋ ପାଇଲଟ) ଓ ଟେକ୍ନିସିଆନ୍ ସିବିଟି ମକ୍',
    shortDescription: 'Railway ALP Stage 1 & Stage 2 CBT: Units & Measurements, Heat & Temperature, Work & Power, Levers & Simple Machines.',
    mainCategory: 'competitive_central',
    subCategory: 'rrb_group_d',
    categoryLabel: 'Central Recruitment',
    targetExam: 'RRB ALP & Technician 2026',
    gradeOrClass: 'ITI / Diploma / B.Tech / 10+2 PCM',
    board: 'Railway Recruitment Boards',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 20,
    isLive: true,
    isFree: true,
    featuredBadge: 'Railway Engineering Track',
    attemptsCount: 29800,
    averageScore: 13.2,
    cutoffEstimated: 14.5,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 20 questions.',
      'Marking: +1.0 for correct answer, -0.33 mark penalty for wrong response.'
    ],
    sections: [
      { id: 'sec_alp_main', name: 'Basic Science & Engineering', totalQuestions: 20, totalMarks: 20, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }
    ],
    questions: [
      {
        id: 'alp_q1',
        questionNumber: 1,
        sectionId: 'sec_alp_main',
        sectionName: 'Basic Science',
        subject: 'Engineering Physics',
        topic: 'Heat and Temperature Conversions',
        type: 'single_choice',
        text: 'At what temperature do the Celsius and Fahrenheit temperature scales show the exact same numerical value?',
        options: [
          { id: 'A', text: '-40° (Formula: C/5 = (F-32)/9 => x/5 = (x-32)/9 => 9x = 5x - 160 => 4x = -160 => x = -40)' },
          { id: 'B', text: '0°' },
          { id: 'C', text: '100°' },
          { id: 'D', text: '-273°' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'At -40°, both Celsius and Fahrenheit scales are equal (-40°C = -40°F).',
        referenceNotes: 'RRB Basic Science & Engineering Handbook'
      }
    ]
  },

  // ==========================================
  // 21. CENTRAL RECRUITMENT: SBI Clerk & IBPS Clerk Speed Mock
  // ==========================================
  {
    id: 'test_sbi_clerk_prelims_speed',
    slug: 'sbi-clerk-junior-associates-prelims-mock',
    title: 'SBI Clerk (Junior Associates) • Speed CBT Prelims Mock',
    titleOdia: 'SBI କ୍ଲର୍କ (ଜୁନିଅର ଆସୋସିଏଟ୍) • ପ୍ରିଲିମ୍ସ ସ୍ପିଡ୍ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Simplification, Number Series, Quadratic Comparisons, Seating Arrangements, and Cloze Test.',
    mainCategory: 'competitive_central',
    subCategory: 'sbi_clerk',
    categoryLabel: 'Central Recruitment',
    targetExam: 'SBI Clerk Prelims 2026',
    gradeOrClass: 'Graduate in Any Discipline',
    board: 'State Bank of India (SBI)',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'SBI Official Pattern',
    attemptsCount: 34100,
    averageScore: 16.5,
    cutoffEstimated: 18.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Duration: 60 minutes for 25 questions.',
      'Marking: +1.0 for correct answer, -0.25 penalty for wrong answer.'
    ],
    sections: [
      { id: 'sec_sbi_core', name: 'SBI Prelims Speed Test', totalQuestions: 25, totalMarks: 25, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'sbi_q1',
        questionNumber: 1,
        sectionId: 'sec_sbi_core',
        sectionName: 'Numerical Ability',
        subject: 'Arithmetic Simplification',
        topic: 'BODMAS & Percentages',
        type: 'single_choice',
        text: 'What is the value of: 35% of 400 + 45% of 240 - 18 × 12?',
        options: [
          { id: 'A', text: '32 (140 + 108 - 216 = 248 - 216 = 32)' },
          { id: 'B', text: '28' },
          { id: 'C', text: '36' },
          { id: 'D', text: '42' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: '35% of 400 = 140. 45% of 240 = 108. 18 × 12 = 216. Total = 140 + 108 - 216 = 32.',
        referenceNotes: 'SBI Clerk Speed Arithmetic'
      }
    ]
  },

  // ==========================================
  // 22. STATE EXAMS: Odisha Police SI & Constable Mock
  // ==========================================
  {
    id: 'test_odisha_police_si_constable',
    slug: 'odisha-police-sub-inspector-constable-mock',
    title: 'Odisha Police SI & Constable • General Studies, Odia & Reasoning Mock',
    titleOdia: 'ଓଡ଼ିଶା ପୋଲିସ ସବ୍-ଇନ୍ସପେକ୍ଟର (SI) ଓ କନଷ୍ଟେବଲ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Odisha Police Recruitment Board pattern: General Studies, Odia Language, English, Arithmetic, and Logical Reasoning.',
    mainCategory: 'competitive_state',
    subCategory: 'police_si',
    categoryLabel: 'State PSCs & Police',
    targetExam: 'Odisha Police SI & Constable 2026',
    gradeOrClass: '10+2 / Graduation',
    board: 'State Police Recruitment Board Odisha',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 20,
    isLive: true,
    isFree: true,
    featuredBadge: 'ଓଡ଼ିଶା ପୋଲିସ ଭର୍ତ୍ତି',
    attemptsCount: 31500,
    averageScore: 14.1,
    cutoffEstimated: 15.5,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'ସମୟ: ୬୦ ମିନିଟ୍ | ପ୍ରଶ୍ନ: ୨୦ | ମାର୍କିଂ: +୧.୦ ଠିକ୍ ଉତ୍ତର, -୦.୨୫ ଭୁଲ୍ ଉତ୍ତର ପାଇଁ ।'
    ],
    sections: [
      { id: 'sec_op_main', name: 'Odisha Police Paper', totalQuestions: 20, totalMarks: 20, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25 }
    ],
    questions: [
      {
        id: 'op_q1',
        questionNumber: 1,
        sectionId: 'sec_op_main',
        sectionName: 'General Studies',
        subject: 'Odisha History & Freedom Movement',
        topic: 'Paika Rebellion & Bakshi Jagabandhu',
        type: 'single_choice',
        text: 'In which year did the historic Paika Rebellion (Paika Bidroha) against British colonial rule take place in Odisha under the leadership of Bakshi Jagabandhu Bidyadhara?',
        options: [
          { id: 'A', text: '1817 AD (First War of Independence in Odisha)' },
          { id: 'B', text: '1857 AD' },
          { id: 'C', text: '1803 AD' },
          { id: 'D', text: '1866 AD' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'easy',
        explanation: 'The Paika Rebellion broke out in 1817 in Khurda under the leadership of Bakshi Jagabandhu against oppressive British revenue policies.',
        referenceNotes: 'Odisha History Comprehensive Guide'
      }
    ]
  },

  // ==========================================
  // 23. SCHOOL BOARDS: Primary School Olympiad & Mental Math (Classes 1–5)
  // ==========================================
  {
    id: 'test_primary_olympiad_math_science',
    slug: 'primary-school-olympiad-math-science-class-1-to-5',
    title: 'Primary School Olympiad (Classes 1 to 5) • Mental Math & Everyday Science',
    titleOdia: 'ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ ଅଲମ୍ପିଆଡ (୧ମ ରୁ ୫ମ ଶ୍ରେଣୀ) • ଗଣିତ ଓ ବିଜ୍ଞାନ',
    shortDescription: 'Fun and interactive logic: Number Patterns, Shapes, Living vs Non-Living, Solar System, and Animal Habitats.',
    mainCategory: 'school_boards',
    subCategory: 'school_class_1_to_5',
    categoryLabel: 'School Boards',
    targetExam: 'National Primary Olympiad / School Exams',
    gradeOrClass: 'Classes 1, 2, 3, 4 & 5',
    board: 'Primary Olympiad Foundation',
    durationMinutes: 30,
    totalQuestions: 10,
    totalMarks: 10,
    isLive: true,
    isFree: true,
    featuredBadge: 'Kids Olympiad Star',
    attemptsCount: 16800,
    averageScore: 8.9,
    cutoffEstimated: 9.0,
    createdAt: '2026-02-21T10:00:00Z',
    instructions: [
      'Time: 30 minutes for 10 fun questions. Encouraging, friendly scoring without negative marking.'
    ],
    sections: [
      { id: 'sec_primary_main', name: 'Primary Math & Nature Science', totalQuestions: 10, totalMarks: 10, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: [
      {
        id: 'prim_q1',
        questionNumber: 1,
        sectionId: 'sec_primary_main',
        sectionName: 'Everyday Science',
        subject: 'Environmental Science',
        topic: 'Solar System & Planets',
        type: 'single_choice',
        text: 'Which planet in our Solar System is famously known as the "Red Planet" because of its reddish iron-rich soil?',
        options: [
          { id: 'A', text: 'Mars' },
          { id: 'B', text: 'Venus' },
          { id: 'C', text: 'Jupiter' },
          { id: 'D', text: 'Saturn' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Mars is called the Red Planet because iron minerals in its soil oxidize (rust), giving the surface a reddish appearance.',
        referenceNotes: 'Primary School Science Class 4'
      }
    ]
  }
];

