import { MockTest } from '../types/examTypes';

export const EXPANDED_SECTOR_MOCK_TESTS: MockTest[] = [
  // ==========================================
  // 1. TEACHING & TET (CTET, Super TET, REET, OTET, KVS, UGC NET)
  // ==========================================
  {
    id: 'test_ctet_paper1_cdp_math_2026',
    slug: 'ctet-paper-1-child-development-mathematics-pedagogy',
    title: 'CTET Paper-1 (Classes 1–5) • Child Development, Pedagogy & Primary Math Drill',
    titleHindi: 'CTET पेपर-1 • बाल विकास, शिक्षाशास्त्र और प्राथमिक गणित',
    shortDescription: 'National Curriculum Framework (NCF 2023) & NEP 2020 aligned: Piaget, Vygotsky, Kohlberg stages, inclusive education, and primary math pedagogy.',
    mainCategory: 'teaching_tet_ctet',
    subCategory: 'ctet_paper1' as any,
    categoryLabel: 'Teaching & Education',
    targetExam: 'CTET 2026',
    gradeOrClass: 'D.El.Ed / B.Ed',
    board: 'Central Board of Secondary Education (CBSE)',
    durationMinutes: 60,
    totalQuestions: 10,
    totalMarks: 10,
    isLive: true,
    isFree: true,
    featuredBadge: 'NEP 2020 Aligned',
    attemptsCount: 32400,
    averageScore: 7.8,
    cutoffEstimated: 6.5,
    createdAt: '2026-03-01T08:00:00Z',
    instructions: ['10 High-Yield Questions (+1.0 correct, no negative marking per CTET guidelines).'],
    sections: [
      { id: 'sec_cdp', name: 'Child Development & Pedagogy (CDP)', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0 },
      { id: 'sec_math_ped', name: 'Mathematics Pedagogy', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0 }
    ],
    questions: [
      {
        id: 'ctet_cdp_q1',
        questionNumber: 1,
        sectionId: 'sec_cdp',
        sectionName: 'Child Development & Pedagogy',
        subject: 'Child Development',
        topic: 'Vygotsky Zone of Proximal Development (ZPD) & Scaffolding',
        type: 'single_choice',
        text: 'According to Lev Vygotsky’s socio-cultural theory, the temporary assistance given by a teacher or peer to help a child bridge the gap between what they can do alone and what they can achieve with guidance is termed as:',
        options: [
          { id: 'A', text: 'Conditioning' },
          { id: 'B', text: 'Scaffolding' },
          { id: 'C', text: 'Assimilation' },
          { id: 'D', text: 'Conservation' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'easy',
        explanation: 'Scaffolding is the temporary support structure provided by More Knowledgeable Others (MKOs) within the Zone of Proximal Development (ZPD).',
        referenceNotes: 'Vygotsky Socio-Cultural Learning Framework'
      },
      {
        id: 'ctet_cdp_q2',
        questionNumber: 2,
        sectionId: 'sec_cdp',
        sectionName: 'Child Development & Pedagogy',
        subject: 'Educational Psychology',
        topic: 'Jean Piaget Cognitive Stages',
        type: 'single_choice',
        text: 'A 7-year-old child understands that pouring water from a wide glass into a tall thin glass does not change the quantity of water. Which Piagetian cognitive stage has the child reached?',
        options: [
          { id: 'A', text: 'Sensorimotor Stage' },
          { id: 'B', text: 'Pre-operational Stage' },
          { id: 'C', text: 'Concrete Operational Stage' },
          { id: 'D', text: 'Formal Operational Stage' }
        ],
        correctAnswer: 'C',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'medium',
        explanation: 'The Concrete Operational stage (ages 7–11) is characterized by the acquisition of Conservation of volume, reversibility, and decentration.',
        referenceNotes: 'Piaget Theory of Cognitive Development'
      },
      {
        id: 'ctet_cdp_q3',
        questionNumber: 3,
        sectionId: 'sec_cdp',
        sectionName: 'Child Development & Pedagogy',
        subject: 'Inclusive Education',
        topic: 'Learning Disabilities (Dyscalculia & Dyslexia)',
        type: 'single_choice',
        text: 'A primary school learner continuously struggles with recognizing mathematical symbols (+, -, ×), recalling arithmetic facts, and estimating spatial measurements. The child is exhibiting symptoms of:',
        options: [
          { id: 'A', text: 'Dysgraphia' },
          { id: 'B', text: 'Dyspraxia' },
          { id: 'C', text: 'Dyscalculia' },
          { id: 'D', text: 'ADHD' }
        ],
        correctAnswer: 'C',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'easy',
        explanation: 'Dyscalculia is a specific learning disorder characterized by severe difficulties in understanding numbers, arithmetic facts, calculation, and math concepts.',
        referenceNotes: 'RPwD Act 2016 & Special Education Norms'
      },
      {
        id: 'ctet_cdp_q4',
        questionNumber: 4,
        sectionId: 'sec_cdp',
        sectionName: 'Child Development & Pedagogy',
        subject: 'Policy Framework',
        topic: 'NEP 2020 Pedagogical Structure',
        type: 'single_choice',
        text: 'What is the new curricular and pedagogical structure introduced by the National Education Policy (NEP) 2020 replacing the 10+2 system?',
        options: [
          { id: 'A', text: '5 + 3 + 3 + 4' },
          { id: 'B', text: '5 + 4 + 3 + 3' },
          { id: 'C', text: '3 + 5 + 4 + 3' },
          { id: 'D', text: '4 + 4 + 3 + 4' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'easy',
        explanation: 'NEP 2020 restructured school education into 5 (Foundational) + 3 (Preparatory) + 3 (Middle) + 4 (Secondary) covering ages 3 to 18.',
        referenceNotes: 'Ministry of Education - NEP 2020 Policy Document'
      },
      {
        id: 'ctet_cdp_q5',
        questionNumber: 5,
        sectionId: 'sec_cdp',
        sectionName: 'Child Development & Pedagogy',
        subject: 'Moral Development',
        topic: 'Lawrence Kohlberg Moral Reasoning',
        type: 'single_choice',
        text: 'A child says, "I must not steal cookies because my mother will punish me and take away my playtime." According to Kohlberg, at which level of moral development is this child operating?',
        options: [
          { id: 'A', text: 'Pre-conventional Level (Stage 1: Punishment and Obedience)' },
          { id: 'B', text: 'Conventional Level (Stage 3: Good Interpersonal Relationships)' },
          { id: 'C', text: 'Post-conventional Level (Stage 5: Social Contract)' },
          { id: 'D', text: 'Conventional Level (Stage 4: Law and Order)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'medium',
        explanation: 'In Kohlberg’s Pre-conventional Level Stage 1, moral reasoning is based strictly on direct physical consequences (avoiding punishment and obeying power).',
        referenceNotes: 'Kohlberg Stages of Moral Development'
      },
      {
        id: 'ctet_math_q6',
        questionNumber: 6,
        sectionId: 'sec_math_ped',
        sectionName: 'Mathematics Pedagogy',
        subject: 'Primary Mathematics',
        topic: 'Van Hiele Model of Geometric Thinking',
        type: 'single_choice',
        text: 'A learner identifies a square by its visual appearance ("it looks like a box/window") but cannot yet define it by its mathematical properties. According to the Van Hiele model, at which level is the student?',
        options: [
          { id: 'A', text: 'Level 0 (Visualisation / Recognition)' },
          { id: 'B', text: 'Level 1 (Analysis)' },
          { id: 'C', text: 'Level 2 (Abstraction / Informal Deduction)' },
          { id: 'D', text: 'Level 3 (Deduction)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'medium',
        explanation: 'Level 0 (Visualisation) is where children perceive shapes as holistic visual entities rather than analyzing properties.',
        referenceNotes: 'Van Hiele Geometry Learning Framework'
      },
      {
        id: 'ctet_math_q7',
        questionNumber: 7,
        sectionId: 'sec_math_ped',
        sectionName: 'Mathematics Pedagogy',
        subject: 'Primary Mathematics',
        topic: 'Place Value Manipulatives (Dienes Blocks / Napier Rods)',
        type: 'single_choice',
        text: 'Which classroom manipulative is most pedagogically effective for teaching the concept of place value and base-10 addition/subtraction with regrouping in primary classes?',
        options: [
          { id: 'A', text: 'Dienes Base-10 Blocks' },
          { id: 'B', text: 'Protractor' },
          { id: 'C', text: 'Geoboard' },
          { id: 'D', text: 'Tangram' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'easy',
        explanation: 'Dienes blocks (units, rods/longs, flats, and cubes) provide concrete tactile representations of ones, tens, hundreds, and thousands.',
        referenceNotes: 'NCERT Primary Mathematics Teaching Manual'
      },
      {
        id: 'ctet_math_q8',
        questionNumber: 8,
        sectionId: 'sec_math_ped',
        sectionName: 'Mathematics Pedagogy',
        subject: 'Primary Mathematics',
        topic: 'Fraction Models',
        type: 'single_choice',
        text: 'Which teaching approach is best to demonstrate that 1/2 is greater than 1/4 to grade 3 students without premature formal cross-multiplication?',
        options: [
          { id: 'A', text: 'Paper folding and shaded circular fraction discs' },
          { id: 'B', text: 'Writing formula on the blackboard and asking for rote memorization' },
          { id: 'C', text: 'Direct long decimal division (0.5 vs 0.25)' },
          { id: 'D', text: 'Solving algebra equations on paper' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'easy',
        explanation: 'Concrete visual and manipulatable models like circular fraction kits or strip paper folding anchor the concept of parts of a whole.',
        referenceNotes: 'Bruner EIS Concrete-Pictorial-Abstract Model'
      },
      {
        id: 'ctet_math_q9',
        questionNumber: 9,
        sectionId: 'sec_math_ped',
        sectionName: 'Mathematics Pedagogy',
        subject: 'Primary Mathematics',
        topic: 'Error Analysis in Subtraction',
        type: 'single_choice',
        text: 'When asked to compute 43 - 27, a student writes 24 (subtracting 3 from 7 instead of borrowing). What error pattern is demonstrated?',
        options: [
          { id: 'A', text: 'Reversal and smaller-from-larger systematic error without regrouping' },
          { id: 'B', text: 'Random guessing error' },
          { id: 'C', text: 'Careless handwriting only' },
          { id: 'D', text: 'Multiplication confusion' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'medium',
        explanation: 'This is the classic "smaller from larger" subtraction error where the learner subtracts digits in columns without understanding place-value borrowing.',
        referenceNotes: 'Diagnostic Mathematics Assessment Guidelines'
      },
      {
        id: 'ctet_math_q10',
        questionNumber: 10,
        sectionId: 'sec_math_ped',
        sectionName: 'Mathematics Pedagogy',
        subject: 'Primary Mathematics',
        topic: 'Problem Solving & Polya Principles',
        type: 'single_choice',
        text: 'According to George Polya’s classic problem-solving stages, what is the correct four-step sequence?',
        options: [
          { id: 'A', text: 'Understand problem → Devise a plan → Carry out plan → Look back (Evaluate)' },
          { id: 'B', text: 'Calculate → Memorize → Write → Submit' },
          { id: 'C', text: 'Devise plan → Guess answer → Compute → Finish' },
          { id: 'D', text: 'Read formula → Copy numbers → Solve → End' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0,
        difficulty: 'easy',
        explanation: 'George Polya’s famous four principles: 1. Understand the problem, 2. Devise a plan, 3. Carry out the plan, 4. Look back/Reflect.',
        referenceNotes: 'George Polya - How to Solve It'
      }
    ]
  },

  // ==========================================
  // 2. POLICE & PARAMILITARY (UP Police, Delhi Police, Bihar Police, SSC GD)
  // ==========================================
  {
    id: 'test_up_police_constable_speed_2026',
    slug: 'up-police-constable-samanya-hindi-math-reasoning',
    title: 'UP Police Constable • Samanya Hindi, Mool Vidhi, GK & Mental Ability CBT',
    titleHindi: 'यूपी पुलिस कांस्टेबल • सामान्य हिंदी, मूल विधि, सामान्य ज्ञान एवं मानसिक योग्यता',
    shortDescription: 'Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) official CBT layout with General Hindi, Indian Constitution, Numerical Ability & Logical Reasoning.',
    mainCategory: 'police_state_cadres',
    subCategory: 'up_police' as any,
    categoryLabel: 'Police & Paramilitary',
    targetExam: 'UP Police Constable 2026',
    gradeOrClass: '12th Pass',
    board: 'UPPRPB Lucknow',
    state: 'Uttar Pradesh',
    durationMinutes: 60,
    totalQuestions: 10,
    totalMarks: 20,
    isLive: true,
    isFree: true,
    featuredBadge: 'UPPRPB Real Pattern',
    attemptsCount: 45200,
    averageScore: 14.2,
    cutoffEstimated: 13.0,
    createdAt: '2026-03-01T08:00:00Z',
    instructions: ['10 Questions (+2.0 Marks for correct, -0.5 Mark negative penalty).'],
    sections: [
      { id: 'sec_hindi', name: 'Samanya Hindi & Grammar', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 },
      { id: 'sec_gk_law', name: 'General Knowledge, Constitution & Reasoning', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 }
    ],
    questions: [
      {
        id: 'up_pol_q1',
        questionNumber: 1,
        sectionId: 'sec_hindi',
        sectionName: 'Samanya Hindi & Grammar',
        subject: 'Hindi Grammar',
        topic: 'Sandhi & Sandhi Vichhed',
        type: 'single_choice',
        text: '\'सूर्योदय\' शब्द का सही संधि-विच्छेद निम्नलिखित में से कौन सा है?',
        options: [
          { id: 'A', text: 'सूर्य + उदय (गुण स्वर संधि)' },
          { id: 'B', text: 'सूर्यो + दय' },
          { id: 'C', text: 'सूर्य + दय' },
          { id: 'D', text: 'सूर्यः + उदय' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'सूर्य + उदय = सूर्योदय (अ + उ = ओ)। यह गुण स्वर संधि का उदाहरण है।',
        referenceNotes: 'Lucent Samanya Hindi Grammar'
      },
      {
        id: 'up_pol_q2',
        questionNumber: 2,
        sectionId: 'sec_hindi',
        sectionName: 'Samanya Hindi & Grammar',
        subject: 'Hindi Grammar',
        topic: 'Samas (Compound Words)',
        type: 'single_choice',
        text: '\'पीताम्बर\' (पीत है अम्बर जिसका अर्थात श्रीकृष्ण) में कौन सा समास है?',
        options: [
          { id: 'A', text: 'बहुव्रीहि समास' },
          { id: 'B', text: 'द्विगु समास' },
          { id: 'C', text: 'द्वंद्व समास' },
          { id: 'D', text: 'अव्ययीभाव समास' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'जिस समास में दोनों पद अप्रधान हों और तीसरा पद प्रधान हो, वहाँ बहुव्रीहि समास होता है (पीताम्बर = श्रीकृष्ण)।',
        referenceNotes: 'Hindi Vyakaran Manjusha'
      },
      {
        id: 'up_pol_q3',
        questionNumber: 3,
        sectionId: 'sec_hindi',
        sectionName: 'Samanya Hindi & Grammar',
        subject: 'Hindi Literature',
        topic: 'Munshi Premchand Novels & Awards',
        type: 'single_choice',
        text: 'प्रसिद्ध उपन्यास \'गोदान\' और \'गबन\' के रचनाकार कौन हैं?',
        options: [
          { id: 'A', text: 'मुंशी प्रेमचंद' },
          { id: 'B', text: 'जयशंकर प्रसाद' },
          { id: 'C', text: 'महादेवी वर्मा' },
          { id: 'D', text: 'सूर्यकांत त्रिपाठी निराला' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'उपन्यास सम्राट मुंशी प्रेमचंद ने गोदान, गबन, सेवासदन, रंगभूमि, कर्मभूमि आदि कालजयी उपन्यासों की रचना की।',
        referenceNotes: 'Hindi Sahitya Ka Itihas'
      },
      {
        id: 'up_pol_q4',
        questionNumber: 4,
        sectionId: 'sec_hindi',
        sectionName: 'Samanya Hindi & Grammar',
        subject: 'Hindi Grammar',
        topic: 'Vilom Shabd (Antonyms)',
        type: 'single_choice',
        text: '\'अनुराग\' शब्द का सही विलोम शब्द क्या है?',
        options: [
          { id: 'A', text: 'विराग' },
          { id: 'B', text: 'राग' },
          { id: 'C', text: 'प्रेम' },
          { id: 'D', text: 'नफ़रत' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'अनुराग का विलोम शब्द \'विराग\' होता है।',
        referenceNotes: 'Standard Hindi Lexicon'
      },
      {
        id: 'up_pol_q5',
        questionNumber: 5,
        sectionId: 'sec_hindi',
        sectionName: 'Samanya Hindi & Grammar',
        subject: 'Hindi Grammar',
        topic: 'Ras & Sthayi Bhav',
        type: 'single_choice',
        text: '\'वीर रस\' का स्थायी भाव निम्नलिखित में से क्या है?',
        options: [
          { id: 'A', text: 'उत्साह' },
          { id: 'B', text: 'क्रोध' },
          { id: 'C', text: 'रति' },
          { id: 'D', text: 'शोक' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'वीर रस का स्थायी भाव \'उत्साह\' होता है। (रौद्र का क्रोध, शृंगार का रति, करुण का शोक)।',
        referenceNotes: 'Hindi Kavyashastra'
      },
      {
        id: 'up_pol_q6',
        questionNumber: 6,
        sectionId: 'sec_gk_law',
        sectionName: 'General Knowledge & Reasoning',
        subject: 'Indian Polity & Law',
        topic: 'Fundamental Rights & Article 21',
        type: 'single_choice',
        text: 'भारतीय संविधान के किस अनुच्छेद के अंतर्गत \'प्राण एवं दैहिक स्वतंत्रता का अधिकार\' (Right to Life and Personal Liberty) सुरक्षित किया गया है?',
        options: [
          { id: 'A', text: 'अनुच्छेद 21' },
          { id: 'B', text: 'अनुच्छेद 19' },
          { id: 'C', text: 'अनुच्छेद 14' },
          { id: 'D', text: 'अनुच्छेद 32' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'अनुच्छेद 21 घोषित करता है कि किसी व्यक्ति को उसके प्राण या दैहिक स्वतंत्रता से विधि द्वारा स्थापित प्रक्रिया के अनुसार ही वंचित किया जाएगा, अन्यथा नहीं।',
        referenceNotes: 'M. Laxmikanth Indian Polity'
      },
      {
        id: 'up_pol_q7',
        questionNumber: 7,
        sectionId: 'sec_gk_law',
        sectionName: 'General Knowledge & Reasoning',
        subject: 'Uttar Pradesh GK',
        topic: 'UP Geography & Administrative Capital',
        type: 'single_choice',
        text: 'उत्तर प्रदेश का राज्य पक्षी (State Bird) कौन सा है?',
        options: [
          { id: 'A', text: 'सारस (क्रौंच / Sarus Crane)' },
          { id: 'B', text: 'मोर' },
          { id: 'C', text: 'तोता' },
          { id: 'D', text: 'हंस' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'उत्तर प्रदेश का राजकीय पक्षी सारस (Sarus Crane) है। राजकीय पशु बारहसिंगा तथा राजकीय वृक्ष अशोक है।',
        referenceNotes: 'UP Facts & General Studies Handbook'
      },
      {
        id: 'up_pol_q8',
        questionNumber: 8,
        sectionId: 'sec_gk_law',
        sectionName: 'General Knowledge & Reasoning',
        subject: 'General Science',
        topic: 'Human Anatomy & Blood Circulation',
        type: 'single_choice',
        text: 'मानव शरीर में रक्त का थक्का (Blood Clotting) बनने में कौन सा विटामिन महत्वपूर्ण भूमिका निभाता है?',
        options: [
          { id: 'A', text: 'विटामिन K (Phylloquinone)' },
          { id: 'B', text: 'विटामिन C' },
          { id: 'C', text: 'विटामिन A' },
          { id: 'D', text: 'विटामिन D' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'विटामिन K यकृत में प्रोथ्रोम्बिन और क्लॉटिंग कारकों (II, VII, IX, X) के संश्लेषण के लिए आवश्यक है।',
        referenceNotes: 'General Science NCERT Class 10'
      },
      {
        id: 'up_pol_q9',
        questionNumber: 9,
        sectionId: 'sec_gk_law',
        sectionName: 'General Knowledge & Reasoning',
        subject: 'Logical Reasoning',
        topic: 'Number Series Completion',
        type: 'single_choice',
        text: 'निम्नलिखित संख्या श्रृंखला में लुप्त पद ज्ञात कीजिए: 4, 9, 25, 49, 121, ?',
        options: [
          { id: 'A', text: '169 (13 का वर्ग)' },
          { id: 'B', text: '144' },
          { id: 'C', text: '196' },
          { id: 'D', text: '225' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'medium',
        explanation: 'यह लगातार अभाज्य संख्याओं (Prime Numbers) के वर्गों की श्रृंखला है: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121, अतः अगली अभाज्य संख्या 13 का वर्ग = 169 होगा।',
        referenceNotes: 'R.S. Aggarwal Quantitative & Reasoning'
      },
      {
        id: 'up_pol_q10',
        questionNumber: 10,
        sectionId: 'sec_gk_law',
        sectionName: 'General Knowledge & Reasoning',
        subject: 'Quantitative Aptitude',
        topic: 'Profit, Loss and Discount',
        type: 'single_choice',
        text: 'एक दुकानदार किसी वस्तु पर 20% की छूट देने के बाद भी 20% का लाभ कमाता है। यदि वस्तु का क्रय मूल्य ₹500 है, तो उसका अंकित मूल्य (Marked Price) क्या होगा?',
        options: [
          { id: 'A', text: '₹750' },
          { id: 'B', text: '₹700' },
          { id: 'C', text: '₹600' },
          { id: 'D', text: '₹800' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'medium',
        explanation: 'CP = ₹500. SP = 500 × 1.20 = ₹600. MP पर 20% छूट के बाद SP = 0.80 × MP = 600 => MP = 600 / 0.80 = ₹750.',
        referenceNotes: 'Quantitative Aptitude Arithmetic'
      }
    ]
  },

  // ==========================================
  // 3. RAILWAYS (RRB ALP, RRB Technician, RRB Group D)
  // ==========================================
  {
    id: 'test_rrb_alp_tech_basic_science_2026',
    slug: 'rrb-alp-technician-basic-science-engineering-drill',
    title: 'RRB ALP & Technician • Basic Science & Engineering + Physics Drill',
    titleHindi: 'आरआरबी एएलपी एवं तकनीशियन • बेसिक साइंस एवं इंजीनियरिंग मॉक',
    shortDescription: 'Railway Recruitment Board CBT pattern: Mechanics, Heat & Temperature, Levers & Simple Machines, Basic Electricity & Engineering Drawing.',
    mainCategory: 'railway_rrb',
    subCategory: 'rrb_alp' as any,
    categoryLabel: 'Railways RRB',
    targetExam: 'RRB ALP 2026',
    gradeOrClass: 'ITI / Diploma / B.Tech',
    board: 'Railway Recruitment Control Board (RRB)',
    durationMinutes: 60,
    totalQuestions: 10,
    totalMarks: 10,
    isLive: true,
    isFree: true,
    featuredBadge: 'RRB High Yield',
    attemptsCount: 38900,
    averageScore: 6.9,
    cutoffEstimated: 6.0,
    createdAt: '2026-03-01T08:00:00Z',
    instructions: ['10 Questions (+1.0 Mark for correct, -0.33 Mark penalty per incorrect response).'],
    sections: [
      { id: 'sec_rrb_science', name: 'Basic Science & Physics', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 },
      { id: 'sec_rrb_engg', name: 'Engineering Basics & Machines', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }
    ],
    questions: [
      {
        id: 'rrb_alp_q1',
        questionNumber: 1,
        sectionId: 'sec_rrb_science',
        sectionName: 'Basic Science & Physics',
        subject: 'Physics',
        topic: 'Work, Power & Energy',
        type: 'single_choice',
        text: 'A force of 50 N is applied to move an object horizontally through a distance of 10 meters in the direction of the force in 5 seconds. What is the power delivered?',
        options: [
          { id: 'A', text: '100 Watts' },
          { id: 'B', text: '50 Watts' },
          { id: 'C', text: '500 Watts' },
          { id: 'D', text: '25 Watts' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Work = Force × Displacement = 50 N × 10 m = 500 Joules. Power = Work / Time = 500 J / 5 s = 100 Watts.',
        referenceNotes: 'NCERT Class 9/10 Physics Work and Energy'
      },
      {
        id: 'rrb_alp_q2',
        questionNumber: 2,
        sectionId: 'sec_rrb_science',
        sectionName: 'Basic Science & Physics',
        subject: 'Physics',
        topic: 'Heat & Specific Heat Capacity',
        type: 'single_choice',
        text: 'What is the SI unit of Specific Heat Capacity?',
        options: [
          { id: 'A', text: 'J / (kg · K)' },
          { id: 'B', text: 'J / kg' },
          { id: 'C', text: 'Calories / gram' },
          { id: 'D', text: 'Watt / Kelvin' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Specific heat capacity s = Q / (m × ΔT), so unit is Joules per kilogram Kelvin (J/(kg·K)).',
        referenceNotes: 'Thermodynamics & Heat Units'
      },
      {
        id: 'rrb_alp_q3',
        questionNumber: 3,
        sectionId: 'sec_rrb_science',
        sectionName: 'Basic Science & Physics',
        subject: 'Physics',
        topic: 'Ohm\'s Law & Equivalent Resistance',
        type: 'single_choice',
        text: 'Three identical resistors of 6 Ω each are connected in parallel. What is the equivalent resistance of the network?',
        options: [
          { id: 'A', text: '2 Ω' },
          { id: 'B', text: '18 Ω' },
          { id: 'C', text: '3 Ω' },
          { id: 'D', text: '1 Ω' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'In parallel with n identical resistors: R_eq = R / n = 6 / 3 = 2 Ω.',
        referenceNotes: 'Basic Electrical Circuit Fundamentals'
      },
      {
        id: 'rrb_alp_q4',
        questionNumber: 4,
        sectionId: 'sec_rrb_science',
        sectionName: 'Basic Science & Physics',
        subject: 'Physics',
        topic: 'Speed, Velocity & Acceleration',
        type: 'single_choice',
        text: 'A train accelerates uniformly from rest to a speed of 72 km/h in 20 seconds. What is the acceleration of the train in m/s²?',
        options: [
          { id: 'A', text: '1.0 m/s²' },
          { id: 'B', text: '3.6 m/s²' },
          { id: 'C', text: '0.5 m/s²' },
          { id: 'D', text: '2.0 m/s²' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Initial velocity u = 0. Final velocity v = 72 × (5/18) = 20 m/s. Acceleration a = (v - u) / t = (20 - 0) / 20 = 1.0 m/s².',
        referenceNotes: 'Kinematics Equations of Motion'
      },
      {
        id: 'rrb_alp_q5',
        questionNumber: 5,
        sectionId: 'sec_rrb_science',
        sectionName: 'Basic Science & Physics',
        subject: 'Physics',
        topic: 'Density & Archimedes Principle',
        type: 'single_choice',
        text: 'The relative density of silver is 10.8. What is the density of silver in SI units (kg/m³), given water density = 1000 kg/m³?',
        options: [
          { id: 'A', text: '10,800 kg/m³' },
          { id: 'B', text: '1,080 kg/m³' },
          { id: 'C', text: '108 kg/m³' },
          { id: 'D', text: '108,000 kg/m³' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Relative density = Density of substance / Density of water. Density of silver = 10.8 × 1000 = 10,800 kg/m³.',
        referenceNotes: 'Fluid Mechanics Fundamentals'
      },
      {
        id: 'rrb_alp_q6',
        questionNumber: 6,
        sectionId: 'sec_rrb_engg',
        sectionName: 'Engineering Basics & Machines',
        subject: 'Basic Engineering',
        topic: 'Levers & Mechanical Advantage',
        type: 'single_choice',
        text: 'A wheelbarrow where the load is between the fulcrum and the applied effort belongs to which class of lever?',
        options: [
          { id: 'A', text: 'Class 2 Lever' },
          { id: 'B', text: 'Class 1 Lever' },
          { id: 'C', text: 'Class 3 Lever' },
          { id: 'D', text: 'Compound Lever' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'In a Class 2 lever (e.g. wheelbarrow, nutcracker, bottle opener), the load (L) is between the fulcrum (F) and the effort (E). Mechanical Advantage is always > 1.',
        referenceNotes: 'Simple Machines & Mechanical Advantage'
      },
      {
        id: 'rrb_alp_q7',
        questionNumber: 7,
        sectionId: 'sec_rrb_engg',
        sectionName: 'Engineering Basics & Machines',
        subject: 'Basic Engineering',
        topic: 'Engineering Drawing Projection Methods',
        type: 'single_choice',
        text: 'In First Angle Projection used widely in Indian (BIS) engineering standards, where is the top view located relative to the front view?',
        options: [
          { id: 'A', text: 'Below the front view' },
          { id: 'B', text: 'Above the front view' },
          { id: 'C', text: 'On the right of the front view' },
          { id: 'D', text: 'Coinciding with the front view' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'In First Angle Projection, the object lies in the 1st quadrant between observer and plane. Hence, the top view is projected onto the horizontal plane BELOW the front elevation.',
        referenceNotes: 'Engineering Drawing BIS SP 46:2003'
      },
      {
        id: 'rrb_alp_q8',
        questionNumber: 8,
        sectionId: 'sec_rrb_engg',
        sectionName: 'Engineering Basics & Machines',
        subject: 'Basic Engineering',
        topic: 'Occupational Safety & Fire Classes',
        type: 'single_choice',
        text: 'Which type of fire extinguisher is strictly required for electrical equipment fires (Class C/E fires) to avoid electrocution hazard?',
        options: [
          { id: 'A', text: 'Carbon Dioxide (CO2) or Dry Chemical Powder (DCP)' },
          { id: 'B', text: 'Plain Water jet' },
          { id: 'C', text: 'Foam extinguisher' },
          { id: 'D', text: 'Wet Chemical' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Water is conductive and hazardous for energized electrical fires. Non-conductive CO2 gas or Dry Chemical Powder is mandatory.',
        referenceNotes: 'Industrial Safety & Fire Fighting Standards'
      },
      {
        id: 'rrb_alp_q9',
        questionNumber: 9,
        sectionId: 'sec_rrb_engg',
        sectionName: 'Engineering Basics & Machines',
        subject: 'Basic Engineering',
        topic: 'IT Literacy & Number Systems',
        type: 'single_choice',
        text: 'What is the binary representation of decimal number 25?',
        options: [
          { id: 'A', text: '11001' },
          { id: 'B', text: '10011' },
          { id: 'C', text: '11100' },
          { id: 'D', text: '10101' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: '25 = 16 + 8 + 0 + 0 + 1 = 1·2⁴ + 1·2³ + 0·2² + 0·2¹ + 1·2⁰ = (11001)₂.',
        referenceNotes: 'Digital Electronics & Binary Arithmetic'
      },
      {
        id: 'rrb_alp_q10',
        questionNumber: 10,
        sectionId: 'sec_rrb_engg',
        sectionName: 'Engineering Basics & Machines',
        subject: 'Basic Engineering',
        topic: 'Environmental Education & Ozone Depletion',
        type: 'single_choice',
        text: 'Which international treaty signed in 1987 is designed to protect the stratospheric ozone layer by phasing out the production of CFCs and halons?',
        options: [
          { id: 'A', text: 'Montreal Protocol' },
          { id: 'B', text: 'Kyoto Protocol' },
          { id: 'C', text: 'Paris Climate Agreement' },
          { id: 'D', text: 'Ramsar Convention' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'The Montreal Protocol (1987) is the landmark international environmental agreement aimed at eliminating Ozone Depleting Substances (ODS).',
        referenceNotes: 'Environmental Studies & Global Protocols'
      }
    ]
  }
];
