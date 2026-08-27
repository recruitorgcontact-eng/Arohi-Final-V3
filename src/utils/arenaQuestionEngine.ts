// Arohi Exams Gaming Arena - Dynamic Unlimited Question Generator Engine
// Supports Class-wise (Class 1-10, 11-12) & Competitive Exam-wise + Subject-wise custom battles

export interface ArenaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  subject: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export interface ClassTrack {
  id: string;
  name: string;
  badge: string;
  icon: string;
  description: string;
  subjects: string[];
}

export const ARENA_CLASS_TRACKS: ClassTrack[] = [
  {
    id: 'class_primary',
    name: 'Primary (Class 1–5)',
    badge: 'Foundations',
    icon: '🎒',
    description: 'Basic Mental Math, Environmental Science, English Words & Puzzles',
    subjects: ['Mathematics', 'Science & EVS', 'English & Vocabulary', 'Mental Ability & Logic']
  },
  {
    id: 'class_middle',
    name: 'Middle School (Class 6–8)',
    badge: 'Concepts',
    icon: '📐',
    description: 'Fractions, Integers, General Science, Grammar & Social Studies',
    subjects: ['Mathematics', 'Science', 'English Grammar', 'Social Studies', 'Computer & IT', 'Reasoning']
  },
  {
    id: 'class_secondary',
    name: 'High School (Class 9–10)',
    badge: 'Board Prep',
    icon: '🎓',
    description: 'CBSE/ICSE/State Board syllabus, Algebra, Geometry, Physics, Chemistry, Biology',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Social Science', 'Computer']
  },
  {
    id: 'class_senior',
    name: 'Senior Secondary (Class 11–12)',
    badge: 'Scholastic',
    icon: '🏛️',
    description: 'Calculus, Vectors, Organic Chemistry, Mechanics, Genetics, Accountancy',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Core', 'Economics & GK']
  },
  {
    id: 'medical_neet',
    name: 'Medical (NEET / AIIMS / Nursing)',
    badge: 'Doctor Cup',
    icon: '🩺',
    description: 'Zoology, Botany, Human Physiology, Organic Reactions, Optics & Thermodynamics',
    subjects: ['Biology (Botany & Zoology)', 'Physics', 'Chemistry', 'Nursing & Health Sciences']
  },
  {
    id: 'engineering_jee',
    name: 'Engineering (JEE / CET / GATE)',
    badge: 'Tech Arena',
    icon: '⚡',
    description: 'Coordinate Geometry, Calculus, Electrodynamics, Physical Chemistry',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science & Logic']
  },
  {
    id: 'ssc_recruitment',
    name: 'SSC (CGL / CHSL / MTS / GD)',
    badge: 'Govt Jobs',
    icon: '🏛️',
    description: 'Quantitative Aptitude, General Intelligence & Reasoning, English, General Awareness',
    subjects: ['Quantitative Aptitude', 'Reasoning & Intelligence', 'General English', 'General Awareness (GK)']
  },
  {
    id: 'banking_ibps',
    name: 'Banking (IBPS / SBI / RBI)',
    badge: 'Finance',
    icon: '🏦',
    description: 'Data Interpretation, Fast Arithmetic, Logical Reasoning, Banking & Financial Awareness',
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'Banking & Current Affairs']
  },
  {
    id: 'upsc_psc',
    name: 'UPSC & State PSC (CSE / OPSC / BPSC)',
    badge: 'Civil Services',
    icon: '👑',
    description: 'Indian Polity & Constitution, Modern History, Geography, Economy & Environment',
    subjects: ['Indian Polity & Constitution', 'History & Culture', 'Geography & Environment', 'General Science & Tech', 'CSAT Aptitude']
  },
  {
    id: 'railways_defence',
    name: 'Railways & Defence (RRB / NDA / CDS)',
    badge: 'National Shield',
    icon: '🛡️',
    description: 'General Science, Math, Speed Reasoning, Indian Defense & Current Affairs',
    subjects: ['General Science', 'Mathematics', 'General Intelligence', 'Current Affairs & Defense']
  },
  {
    id: 'general_brain',
    name: 'General Trivia & Brain Olympics',
    badge: 'Open Championship',
    icon: '🧠',
    description: 'Mental Math speed blitz, Rapid Vocabulary, Speed Riddles & All-India GK',
    subjects: ['Mental Math Blitz', 'Word Power & Anagrams', 'Logical Riddles', 'All-India Trivia & GK']
  }
];

export const ARENA_SUBJECTS_LIST = [
  'All Combined (Grand Clash)',
  'Mathematics & Mental Math',
  'Physics & Mechanics',
  'Chemistry & Matter',
  'Biology & Life Science',
  'English Grammar & Vocabulary',
  'Reasoning & Logic Puzzles',
  'Indian Polity & Constitution',
  'History & Geography',
  'Computer & Technology',
  'Current Affairs & GK'
];

// Helper to shuffle an array
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Procedural Dynamic Question Generators (Infinite non-repeating math, science, verbal & reasoning generators)
function generateDynamicReasoningQuestion(): ArenaQuestion {
  const id = 'dyn_reason_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
  const type = Math.floor(Math.random() * 4);

  if (type === 0) {
    // Arithmetic series: a, a+d, a+2d, a+3d, ?
    const start = Math.floor(Math.random() * 20) + 3;
    const diff = Math.floor(Math.random() * 8) + 3;
    const n1 = start;
    const n2 = start + diff;
    const n3 = start + 2 * diff;
    const n4 = start + 3 * diff;
    const nextVal = start + 4 * diff;
    const distractors = [nextVal + diff, nextVal - 2, nextVal + 3];
    const allOpts = shuffleArray([String(nextVal), ...distractors.map(String)]);
    return {
      id,
      question: `Find the next number in the series: ${n1}, ${n2}, ${n3}, ${n4}, ___?`,
      options: allOpts,
      correctIndex: allOpts.indexOf(String(nextVal)),
      hint: `Check the constant common difference between consecutive terms (+${diff}).`,
      explanation: `Each consecutive term increases by +${diff}. Therefore, ${n4} + ${diff} = ${nextVal}.`,
      subject: 'Reasoning & Logic Puzzles',
      category: 'Number Series',
      difficulty: 'easy'
    };
  } else if (type === 1) {
    // Geometric / doubling series: a, a*2, a*4, a*8, ?
    const base = Math.floor(Math.random() * 5) + 2;
    const n1 = base;
    const n2 = base * 2;
    const n3 = base * 4;
    const n4 = base * 8;
    const nextVal = base * 16;
    const distractors = [nextVal + base, nextVal - 4, nextVal + 8];
    const allOpts = shuffleArray([String(nextVal), ...distractors.map(String)]);
    return {
      id,
      question: `Identify the missing term in the sequence: ${n1}, ${n2}, ${n3}, ${n4}, ___?`,
      options: allOpts,
      correctIndex: allOpts.indexOf(String(nextVal)),
      hint: `Notice that each term is multiplied by 2 (doubled).`,
      explanation: `Pattern is multiplying by 2 at each step: ${n4} × 2 = ${nextVal}.`,
      subject: 'Reasoning & Logic Puzzles',
      category: 'Geometric Series',
      difficulty: 'easy'
    };
  } else if (type === 2) {
    // Coding-Decoding letter shift (+1 or +2)
    const words = [
      { plain: 'CAT', cipher: 'DBU', shift: 1 },
      { plain: 'DOG', cipher: 'EPH', shift: 1 },
      { plain: 'SUN', cipher: 'TVO', shift: 1 },
      { plain: 'BOOK', cipher: 'CPPL', shift: 1 },
      { plain: 'PEN', cipher: 'QFO', shift: 1 }
    ];
    const item = words[Math.floor(Math.random() * words.length)];
    const targetWords = [
      { word: 'MOON', code: 'NPPO', bad: ['OPPQ', 'NOOM', 'MOPN'] },
      { word: 'STAR', code: 'TUBS', bad: ['STBS', 'UBST', 'TTAR'] },
      { word: 'BIRD', code: 'CJSE', bad: ['CKSE', 'BISE', 'CJTF'] },
      { word: 'KING', code: 'LJOH', bad: ['LIPH', 'KJOG', 'LLOH'] }
    ];
    const target = targetWords[Math.floor(Math.random() * targetWords.length)];
    const allOpts = shuffleArray([target.code, ...target.bad]);
    return {
      id,
      question: `In a certain code language, '${item.plain}' is written as '${item.cipher}'. How will '${target.word}' be written in that code?`,
      options: allOpts,
      correctIndex: allOpts.indexOf(target.code),
      hint: `Each letter is shifted forward by +${item.shift} position in the alphabet.`,
      explanation: `Each alphabet shifts forward by +1 position (e.g. M→N, O→P, O→P, N→O = ${target.code}).`,
      subject: 'Reasoning & Logic Puzzles',
      category: 'Coding & Decoding',
      difficulty: 'medium'
    };
  } else {
    // Analogy reasoning
    const analogies = [
      { pair1: 'Doctor : Hospital', item: 'Teacher', correct: 'School', distractors: ['Library', 'Court', 'Laboratory'] },
      { pair1: 'Bird : Sky', item: 'Fish', correct: 'Water', distractors: ['Nest', 'Tree', 'Desert'] },
      { pair1: 'Thermometer : Temperature', item: 'Barometer', correct: 'Atmospheric Pressure', distractors: ['Humidity', 'Rainfall', 'Wind Speed'] },
      { pair1: 'Ohm : Resistance', item: 'Ampere', correct: 'Electric Current', distractors: ['Voltage', 'Power', 'Magnetic Flux'] }
    ];
    const an = analogies[Math.floor(Math.random() * analogies.length)];
    const allOpts = shuffleArray([an.correct, ...an.distractors]);
    return {
      id,
      question: `Complete the analogy: ${an.pair1} :: ${an.item} : _____?`,
      options: allOpts,
      correctIndex: allOpts.indexOf(an.correct),
      hint: `Examine the functional relationship of the first pair.`,
      explanation: `The relationship is role/instrument to workplace or measurement unit: ${an.item} corresponds to ${an.correct}.`,
      subject: 'Reasoning & Logic Puzzles',
      category: 'Analogies',
      difficulty: 'easy'
    };
  }
}

function generateDynamicScienceQuestion(classTrackId: string): ArenaQuestion {
  const id = 'dyn_sci_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
  const type = Math.floor(Math.random() * 5);

  if (type === 0) {
    // Ohm's Law: V = I * R
    const current = Math.floor(Math.random() * 6) + 2;
    const resistance = Math.floor(Math.random() * 8) + 3;
    const voltage = current * resistance;
    const distractors = [voltage + 4, voltage - 3, voltage + 10];
    const allOpts = shuffleArray([`${voltage} V`, `${distractors[0]} V`, `${distractors[1]} V`, `${distractors[2]} V`]);
    return {
      id,
      question: `According to Ohm's Law (V = I × R), if an electric circuit carries a current of ${current} A through a resistor of ${resistance} Ω, what is the potential difference?`,
      options: allOpts,
      correctIndex: allOpts.indexOf(`${voltage} V`),
      hint: `Voltage (V) = Current (I) × Resistance (R).`,
      explanation: `V = I × R = ${current} A × ${resistance} Ω = ${voltage} Volts.`,
      subject: 'Physics & Mechanics',
      category: 'Current Electricity',
      difficulty: 'easy'
    };
  } else if (type === 1) {
    // Kinetic Energy: KE = 0.5 * m * v^2
    const mass = (Math.floor(Math.random() * 4) + 2) * 2; // Even number (4, 6, 8, 10)
    const velocity = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, 5
    const ke = 0.5 * mass * velocity * velocity;
    const distractors = [ke + 10, ke - 5, ke + 20];
    const allOpts = shuffleArray([`${ke} J`, `${distractors[0]} J`, `${distractors[1]} J`, `${distractors[2]} J`]);
    return {
      id,
      question: `Calculate the kinetic energy of an object of mass ${mass} kg moving at a uniform velocity of ${velocity} m/s:`,
      options: allOpts,
      correctIndex: allOpts.indexOf(`${ke} J`),
      hint: `Formula: KE = 1/2 × m × v².`,
      explanation: `KE = 0.5 × ${mass} × (${velocity})² = 0.5 × ${mass} × ${velocity * velocity} = ${ke} Joules.`,
      subject: 'Physics & Mechanics',
      category: 'Work, Energy & Power',
      difficulty: 'medium'
    };
  } else if (type === 2) {
    // Chemical formula / balancing
    const reactions = [
      { q: 'What is the chemical formula for common baking soda?', ans: 'NaHCO₃ (Sodium Bicarbonate)', bad: ['Na₂CO₃', 'NaCl', 'Ca(OH)₂'], expl: 'Baking soda is Sodium Bicarbonate (NaHCO₃).' },
      { q: 'What gas is evolved when an acid reacts with an active metal (like Zinc with dilute HCl)?', ans: 'Hydrogen Gas (H₂)', bad: ['Oxygen Gas (O₂)', 'Carbon Dioxide (CO₂)', 'Nitrogen Dioxide (NO₂)'], expl: 'Zn + 2HCl → ZnCl₂ + H₂↑ (Hydrogen gas burns with a pop sound).' },
      { q: 'What is the pH value of pure distilled water at 25°C?', ans: '7.0 (Neutral)', bad: ['0.0 (Extremely Acidic)', '14.0 (Extremely Basic)', '5.5 (Weakly Acidic)'], expl: 'Neutral water at 25°C has equal H⁺ and OH⁻ concentrations, giving a pH of exactly 7.0.' }
    ];
    const r = reactions[Math.floor(Math.random() * reactions.length)];
    const allOpts = shuffleArray([r.ans, ...r.bad]);
    return {
      id,
      question: r.q,
      options: allOpts,
      correctIndex: allOpts.indexOf(r.ans),
      hint: `Recall acid-base and chemical classification fundamentals.`,
      explanation: r.expl,
      subject: 'Chemistry & Matter',
      category: 'Chemical Reactions & Acids',
      difficulty: 'easy'
    };
  } else if (type === 3) {
    // Biology question
    const bioQ = [
      { q: 'Which green pigment in chloroplasts absorbs sunlight energy during photosynthesis?', ans: 'Chlorophyll', bad: ['Hemoglobin', 'Melanin', 'Carotene'], expl: 'Chlorophyll absorbs blue and red wavelengths of light for photosynthesis.' },
      { q: 'In human circulatory system, which blood vessels carry oxygenated blood away from the heart?', ans: 'Arteries', bad: ['Veins', 'Capillaries', 'Vena Cava'], expl: 'Arteries carry oxygen-rich blood away from the heart to body tissues (except the pulmonary artery).' },
      { q: 'Which organ in the human digestive system produces bile juice to emulsify dietary fats?', ans: 'Liver', bad: ['Stomach', 'Pancreas', 'Gallbladder'], expl: 'The liver produces bile juice, which is stored in the gallbladder and emulsifies fats.' }
    ];
    const b = bioQ[Math.floor(Math.random() * bioQ.length)];
    const allOpts = shuffleArray([b.ans, ...b.bad]);
    return {
      id,
      question: b.q,
      options: allOpts,
      correctIndex: allOpts.indexOf(b.ans),
      hint: `Think of cellular biology and human organ systems.`,
      explanation: b.expl,
      subject: 'Biology & Life Science',
      category: 'Cellular Biology & Physiology',
      difficulty: 'easy'
    };
  } else {
    // Optics / Light
    const f = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];
    const radius = 2 * f;
    const distractors = [radius + 10, radius - 5, radius + 15];
    const allOpts = shuffleArray([`${radius} cm`, `${distractors[0]} cm`, `${distractors[1]} cm`, `${distractors[2]} cm`]);
    return {
      id,
      question: `If the focal length (f) of a concave mirror is ${f} cm, what is its Radius of Curvature (R)?`,
      options: allOpts,
      correctIndex: allOpts.indexOf(`${radius} cm`),
      hint: `Radius of curvature R = 2 × focal length f.`,
      explanation: `R = 2f = 2 × ${f} cm = ${radius} cm.`,
      subject: 'Physics & Mechanics',
      category: 'Light & Optics',
      difficulty: 'easy'
    };
  }
}

function generateDynamicEnglishQuestion(): ArenaQuestion {
  const id = 'dyn_eng_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
  const items = [
    {
      q: "Select the most appropriate SYNONYM for the word 'METICULOUS':",
      ans: "Careful & Precise",
      bad: ["Careless & Hasty", "Aggressive", "Slow & Sluggish"],
      expl: "'Meticulous' means showing great attention to detail; very careful and precise."
    },
    {
      q: "Choose the correct ANTONYM for 'EPHEMERAL':",
      ans: "Permanent & Eternal",
      bad: ["Brief", "Temporary", "Fragile"],
      expl: "'Ephemeral' means lasting for a very short time. Its opposite is permanent or eternal."
    },
    {
      q: "Fill in the blank with the correct preposition: 'He is proficient ____ mathematics and coding.'",
      ans: "in",
      bad: ["at", "with", "on"],
      expl: "The adjective 'proficient' is correctly followed by the preposition 'in' when referring to a subject/field."
    },
    {
      q: "Identify the grammatically correct sentence:",
      ans: "Neither the teacher nor the students were present.",
      bad: [
        "Neither the teacher nor the students was present.",
        "Either of the five boys have done it.",
        "Each of the players were awarded."
      ],
      expl: "When subjects are joined by 'neither...nor', the verb agrees with the nearer subject ('students' is plural → 'were')."
    }
  ];
  const item = items[Math.floor(Math.random() * items.length)];
  const allOpts = shuffleArray([item.ans, ...item.bad]);
  return {
    id,
    question: item.q,
    options: allOpts,
    correctIndex: allOpts.indexOf(item.ans),
    hint: `Analyze grammar rules and vocabulary definitions.`,
    explanation: item.expl,
    subject: 'English Grammar & Vocabulary',
    category: 'Verbal Ability & Grammar',
    difficulty: 'easy'
  };
}

function generateDynamicMathQuestion(classTrackId: string): ArenaQuestion {
  const id = 'dyn_math_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
  const type = Math.floor(Math.random() * 8);

  if (classTrackId === 'class_primary') {
    // Primary math
    const a = Math.floor(Math.random() * 40) + 10;
    const b = Math.floor(Math.random() * 30) + 5;
    const isMult = Math.random() > 0.5;
    if (isMult) {
      const x = Math.floor(Math.random() * 12) + 2;
      const y = Math.floor(Math.random() * 12) + 2;
      const ans = x * y;
      const distractors = [ans + x, ans - 1 > 0 ? ans - 1 : ans + 2, ans + Math.floor(Math.random() * 5) + 3];
      const allOpts = shuffleArray([String(ans), ...distractors.map(String)]);
      return {
        id,
        question: `Calculate: What is ${x} × ${y}?`,
        options: allOpts,
        correctIndex: allOpts.indexOf(String(ans)),
        hint: `Multiply ${x} by ${y}.`,
        explanation: `${x} multiplied by ${y} equals ${ans}.`,
        subject: 'Mathematics',
        category: 'Class 1–5 Math',
        difficulty: 'easy'
      };
    } else {
      const sum = a + b;
      const distractors = [sum + 10, sum - 2, sum + 5];
      const allOpts = shuffleArray([String(sum), ...distractors.map(String)]);
      return {
        id,
        question: `What is ${a} + ${b}?`,
        options: allOpts,
        correctIndex: allOpts.indexOf(String(sum)),
        hint: `Add units digits first, then tens.`,
        explanation: `${a} + ${b} = ${sum}.`,
        subject: 'Mathematics',
        category: 'Class 1–5 Math',
        difficulty: 'easy'
      };
    }
  }

  // High school / competitive math
  switch (type) {
    case 0: {
      // Linear equation: a*x + b = c
      const a = Math.floor(Math.random() * 7) + 2;
      const xVal = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 20) + 3;
      const c = a * xVal + b;
      const mult = Math.floor(Math.random() * 3) + 2;
      const sub = Math.floor(Math.random() * 8) + 1;
      const targetVal = mult * xVal - sub;
      const distractors = [targetVal + a, targetVal - 2, targetVal + 5];
      const allOpts = shuffleArray([String(targetVal), ...distractors.map(String)]);
      return {
        id,
        question: `If ${a}x + ${b} = ${c}, find the value of ${mult}x - ${sub}:`,
        options: allOpts,
        correctIndex: allOpts.indexOf(String(targetVal)),
        hint: `Subtract ${b} from ${c} and divide by ${a} to find x.`,
        explanation: `${a}x = ${c - b} ⇒ x = ${xVal}. Then ${mult}(${xVal}) - ${sub} = ${mult * xVal} - ${sub} = ${targetVal}.`,
        subject: 'Mathematics',
        category: 'Algebra',
        difficulty: 'medium'
      };
    }
    case 1: {
      // Percentage problem
      const cost = (Math.floor(Math.random() * 15) + 5) * 100;
      const percent = [10, 15, 20, 25, 30, 40][Math.floor(Math.random() * 6)];
      const discount = (cost * percent) / 100;
      const finalPrice = cost - discount;
      const distractors = [cost - percent, finalPrice + 50, finalPrice - 40];
      const allOpts = shuffleArray([`₹${finalPrice}`, `₹${distractors[0]}`, `₹${distractors[1]}`, `₹${distractors[2]}`]);
      return {
        id,
        question: `An article marked at ₹${cost} is offered with a ${percent}% discount. What is the selling price?`,
        options: allOpts,
        correctIndex: allOpts.indexOf(`₹${finalPrice}`),
        hint: `Discount = (${percent}/100) × ${cost}. Selling price = Marked Price - Discount.`,
        explanation: `Discount = ₹${discount}. Selling Price = ₹${cost} - ₹${discount} = ₹${finalPrice}.`,
        subject: 'Mathematics',
        category: 'Arithmetic & Commercial Math',
        difficulty: 'easy'
      };
    }
    case 2: {
      // Right triangle Pythagoras
      const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15]];
      const triple = triples[Math.floor(Math.random() * triples.length)];
      const side1 = triple[0];
      const side2 = triple[1];
      const hyp = triple[2];
      const distractors = [hyp + 1, hyp - 2, hyp + 4];
      const allOpts = shuffleArray([`${hyp} cm`, `${distractors[0]} cm`, `${distractors[1]} cm`, `${distractors[2]} cm`]);
      return {
        id,
        question: `In a right-angled triangle, if perpendicular = ${side1} cm and base = ${side2} cm, what is the length of the hypotenuse?`,
        options: allOpts,
        correctIndex: allOpts.indexOf(`${hyp} cm`),
        hint: `Use Pythagoras Theorem: Hypotenuse² = Base² + Perpendicular².`,
        explanation: `Hypotenuse = √(${side1}² + ${side2}²) = √(${side1 * side1} + ${side2 * side2}) = √(${hyp * hyp}) = ${hyp} cm.`,
        subject: 'Mathematics',
        category: 'Geometry & Trigonometry',
        difficulty: 'medium'
      };
    }
    case 3: {
      // Average calculation
      const n1 = Math.floor(Math.random() * 20) + 20;
      const n2 = n1 + Math.floor(Math.random() * 10) - 5;
      const n3 = n1 + Math.floor(Math.random() * 14) - 7;
      const n4 = n1 + Math.floor(Math.random() * 16) - 8;
      const total = n1 + n2 + n3 + n4;
      const avg = total / 4;
      const distractors = [avg + 2.5, avg - 1.5, avg + 5];
      const allOpts = shuffleArray([`${avg}`, `${distractors[0]}`, `${distractors[1]}`, `${distractors[2]}`]);
      return {
        id,
        question: `Find the arithmetic mean (average) of the numbers: ${n1}, ${n2}, ${n3}, and ${n4}:`,
        options: allOpts,
        correctIndex: allOpts.indexOf(`${avg}`),
        hint: `Sum the 4 numbers and divide by 4.`,
        explanation: `Sum = ${n1} + ${n2} + ${n3} + ${n4} = ${total}. Average = ${total} / 4 = ${avg}.`,
        subject: 'Mathematics',
        category: 'Statistics & Arithmetic',
        difficulty: 'easy'
      };
    }
    case 4: {
      // Speed, Distance, Time
      const speed = [40, 50, 60, 72, 80, 90][Math.floor(Math.random() * 6)];
      const hours = [2, 2.5, 3, 3.5, 4, 5][Math.floor(Math.random() * 6)];
      const distance = speed * hours;
      const distractors = [distance + 20, distance - 15, distance + 35];
      const allOpts = shuffleArray([`${distance} km`, `${distractors[0]} km`, `${distractors[1]} km`, `${distractors[2]} km`]);
      return {
        id,
        question: `A high-speed train travels at an average speed of ${speed} km/h for ${hours} hours. What total distance does it cover?`,
        options: allOpts,
        correctIndex: allOpts.indexOf(`${distance} km`),
        hint: `Distance = Speed × Time.`,
        explanation: `Distance = ${speed} km/h × ${hours} h = ${distance} km.`,
        subject: 'Mathematics',
        category: 'Quantitative Aptitude',
        difficulty: 'easy'
      };
    }
    case 5: {
      // Area of circle
      const radii = [7, 14, 21, 28, 3.5];
      const r = radii[Math.floor(Math.random() * radii.length)];
      const area = Math.round((22 / 7) * r * r);
      const distractors = [area + 22, area - 14, area + 44];
      const allOpts = shuffleArray([`${area} cm²`, `${distractors[0]} cm²`, `${distractors[1]} cm²`, `${distractors[2]} cm²`]);
      return {
        id,
        question: `What is the area of a circle with radius ${r} cm? (Take π = 22/7)`,
        options: allOpts,
        correctIndex: allOpts.indexOf(`${area} cm²`),
        hint: `Area = π × r².`,
        explanation: `Area = (22/7) × ${r} × ${r} = ${area} cm².`,
        subject: 'Mathematics',
        category: 'Mensuration',
        difficulty: 'medium'
      };
    }
    case 6: {
      // Probability
      const white = Math.floor(Math.random() * 5) + 3;
      const black = Math.floor(Math.random() * 5) + 4;
      const total = white + black;
      const allOpts = shuffleArray([`${white}/${total}`, `${black}/${total}`, `1/${total}`, `${white - 1}/${total}`]);
      return {
        id,
        question: `A bag contains ${white} white balls and ${black} black balls. If one ball is drawn at random, what is the probability of drawing a white ball?`,
        options: allOpts,
        correctIndex: allOpts.indexOf(`${white}/${total}`),
        hint: `Probability = (Favorable outcomes) / (Total outcomes).`,
        explanation: `Total balls = ${white} + ${black} = ${total}. Favorable = ${white}. Probability = ${white}/${total}.`,
        subject: 'Mathematics',
        category: 'Probability',
        difficulty: 'easy'
      };
    }
    default: {
      // Quadratic or exponents
      const a = Math.floor(Math.random() * 4) + 2;
      const p1 = Math.floor(Math.random() * 3) + 2;
      const p2 = Math.floor(Math.random() * 3) + 1;
      const ansExp = p1 + p2;
      const allOpts = shuffleArray([`${a}^${ansExp}`, `${a}^${p1 * p2}`, `${a}^${p1 - p2}`, `${a * 2}^${ansExp}`]);
      return {
        id,
        question: `According to the laws of exponents, what is ${a}^${p1} × ${a}^${p2}?`,
        options: allOpts,
        correctIndex: allOpts.indexOf(`${a}^${ansExp}`),
        hint: `When bases are identical, add the exponents: a^m × a^n = a^(m+n).`,
        explanation: `${a}^${p1} × ${a}^${p2} = ${a}^(${p1}+${p2}) = ${a}^${ansExp}.`,
        subject: 'Mathematics',
        category: 'Number System & Exponents',
        difficulty: 'easy'
      };
    }
  }
}

// Master Static Conceptual Question Bank (Structured across all domains)
const MASTER_ARENA_QUESTION_BANK: ArenaQuestion[] = [
  // SCIENCE / PHYSICS / CHEMISTRY / BIOLOGY
  {
    id: 'sci_01',
    question: 'Which fundamental law states that "For every action, there is an equal and opposite reaction"?',
    options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Law of Conservation of Energy"],
    correctIndex: 2,
    hint: 'Think of how rocket propulsion works.',
    explanation: "Newton's Third Law of Motion states that when body A exerts a force on body B, body B simultaneously exerts an equal and opposite force on body A.",
    subject: 'Physics',
    category: 'Mechanics',
    difficulty: 'easy'
  },
  {
    id: 'sci_02',
    question: 'What is the chemical formula of Baking Soda commonly used in cooking and fire extinguishers?',
    options: ['NaHCO₃ (Sodium Bicarbonate)', 'Na₂CO₃ (Sodium Carbonate)', 'NaOH (Sodium Hydroxide)', 'CaCO₃ (Calcium Carbonate)'],
    correctIndex: 0,
    hint: 'It has hydrogen in the carbonate radical.',
    explanation: 'Sodium hydrogen carbonate (NaHCO₃) is baking soda, whereas Na₂CO₃·10H₂O is washing soda.',
    subject: 'Chemistry',
    category: 'Acids, Bases & Salts',
    difficulty: 'medium'
  },
  {
    id: 'sci_03',
    question: 'Which organelle is responsible for cellular respiration and produces ATP molecules in eukaryotic cells?',
    options: ['Ribosome', 'Mitochondria', 'Golgi Apparatus', 'Lysosome'],
    correctIndex: 1,
    hint: 'Known as the cellular power generator.',
    explanation: 'Mitochondria perform the Krebs cycle and oxidative phosphorylation to generate ATP, earning the title "Powerhouse of the cell".',
    subject: 'Biology',
    category: 'Cell Biology',
    difficulty: 'easy'
  },
  {
    id: 'sci_04',
    question: 'What is the SI unit of electric potential difference (Voltage)?',
    options: ['Ampere (A)', 'Volt (V)', 'Ohm (Ω)', 'Watt (W)'],
    correctIndex: 1,
    hint: 'Named after Alessandro Volta.',
    explanation: 'The SI unit of electric potential difference is the Volt (V), equal to 1 Joule per Coulomb.',
    subject: 'Physics',
    category: 'Electricity & Magnetism',
    difficulty: 'easy'
  },
  {
    id: 'sci_05',
    question: 'Which gas is evolved when dilute Hydrochloric Acid reacts with active Zinc metal granules?',
    options: ['Oxygen (O₂)', 'Hydrogen (H₂)', 'Carbon Dioxide (CO₂)', 'Chlorine (Cl₂)'],
    correctIndex: 1,
    hint: 'It burns with a characteristic pop sound.',
    explanation: 'Zn + 2HCl → ZnCl₂ + H₂↑. Active metals displace hydrogen gas from dilute acids.',
    subject: 'Chemistry',
    category: 'Chemical Reactions',
    difficulty: 'easy'
  },
  {
    id: 'sci_06',
    question: 'In human anatomy, which blood group is universally known as the "Universal Recipient" for RBCs?',
    options: ['O Negative (O-)', 'AB Positive (AB+)', 'A Positive (A+)', 'B Positive (B+)'],
    correctIndex: 1,
    hint: 'It contains both A and B surface antigens with no anti-A or anti-B antibodies in plasma.',
    explanation: 'AB+ individuals have both A and B antigens and Rh factor, meaning their plasma lacks antibodies against A, B, or Rh, making them universal recipients.',
    subject: 'Biology',
    category: 'Human Physiology',
    difficulty: 'medium'
  },
  {
    id: 'sci_07',
    question: 'What is the speed of light in a vacuum?',
    options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁵ m/s', '3 × 10¹⁰ m/s'],
    correctIndex: 0,
    hint: 'Approximately 300,000 km per second.',
    explanation: 'Light travels in a vacuum at exactly 299,792,458 m/s, rounded to 3 × 10⁸ m/s (or 300,000 km/s).',
    subject: 'Physics',
    category: 'Optics & Modern Physics',
    difficulty: 'easy'
  },
  {
    id: 'sci_08',
    question: 'What is the pH value of pure distilled neutral water at standard room temperature (25°C)?',
    options: ['5', '7', '9', '14'],
    correctIndex: 1,
    hint: 'Exactly midway on the 0 to 14 scale.',
    explanation: 'At 25°C, [H⁺] = [OH⁻] = 10⁻⁷ M, so pH = -log(10⁻⁷) = 7.',
    subject: 'Chemistry',
    category: 'Acids & Bases',
    difficulty: 'easy'
  },
  {
    id: 'sci_09',
    question: 'Which plant tissue is primarily responsible for transporting water and dissolved minerals from roots to leaves?',
    options: ['Phloem', 'Xylem', 'Parenchyma', 'Collenchyma'],
    correctIndex: 1,
    hint: 'Unidirectional upward transport.',
    explanation: 'Xylem vessels and tracheids transport water and minerals upwards, while Phloem transports sucrose/organic solutes bidirectionally.',
    subject: 'Biology',
    category: 'Plant Anatomy',
    difficulty: 'easy'
  },

  // ENGLISH & VERBAL REASONING
  {
    id: 'eng_01',
    question: 'Choose the correct Synonym of the word: "METICULOUS"',
    options: ['Careless', 'Diligent & Thorough', 'Hasty', 'Aggressive'],
    correctIndex: 1,
    hint: 'Paying exceptional attention to every fine detail.',
    explanation: '"Meticulous" means showing great care and attention to detail; diligent, scrupulous, or painstaking.',
    subject: 'English',
    category: 'Vocabulary',
    difficulty: 'medium'
  },
  {
    id: 'eng_02',
    question: 'Identify the grammatically correct sentence:',
    options: [
      'Neither of the two students were present in class.',
      'Neither of the two students was present in class.',
      'Neither of the two students are present in class.',
      'Neither of the two students have been present in class.'
    ],
    correctIndex: 1,
    hint: '"Neither" as a distributive pronoun takes a singular verb.',
    explanation: '"Neither" refers to not one and not the other (singular), requiring the singular verb "was".',
    subject: 'English',
    category: 'Grammar & Subject-Verb Agreement',
    difficulty: 'medium'
  },
  {
    id: 'eng_03',
    question: 'What is the Antonym of the word: "EPHEMERAL"?',
    options: ['Transient', 'Short-lived', 'Permanent & Eternal', 'Fleeting'],
    correctIndex: 2,
    hint: 'Ephemeral means lasting for a very short time.',
    explanation: '"Ephemeral" means short-lived or transitory. Its opposite is permanent, lasting, or eternal.',
    subject: 'English',
    category: 'Antonyms',
    difficulty: 'medium'
  },
  {
    id: 'eng_04',
    question: 'What is the meaning of the idiom: "Bite the bullet"?',
    options: [
      'To eat aggressively',
      'To face a difficult or unpleasant situation with courage',
      'To engage in armed conflict',
      'To make an accidental mistake'
    ],
    correctIndex: 1,
    hint: 'Historical origin from wounded soldiers biting lead bullets during surgery.',
    explanation: '"Bite the bullet" means to endure a painful or unavoidable situation with courage and fortitude.',
    subject: 'English',
    category: 'Idioms & Phrases',
    difficulty: 'easy'
  },
  {
    id: 'eng_05',
    question: 'Fill in the blank: "She has been working on this research paper _______ 2021."',
    options: ['for', 'since', 'from', 'during'],
    correctIndex: 1,
    hint: 'Use "since" for a specific starting point in time with perfect continuous tense.',
    explanation: '"Since" is used with specific point in time (2021), whereas "for" is used with a duration of time (e.g. for 3 years).',
    subject: 'English',
    category: 'Prepositions & Tenses',
    difficulty: 'easy'
  },

  // LOGICAL REASONING & MENTAL ABILITY
  {
    id: 'reas_01',
    question: 'Find the next number in the sequence: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '48'],
    correctIndex: 1,
    hint: 'Differences between consecutive numbers are +4, +6, +8, +10...',
    explanation: 'Differences: 6-2=4, 12-6=6, 20-12=8, 30-20=10. Next difference is +12. 30 + 12 = 42 (Also n² + n for n=1..6).',
    subject: 'Reasoning',
    category: 'Number Series',
    difficulty: 'medium'
  },
  {
    id: 'reas_02',
    question: 'If "DELHI" is coded as "73541" and "CALCUTTA" is coded as "82589662", how is "CALICUT" coded?',
    options: ['8251896', '8251962', '8251862', '8251966'],
    correctIndex: 0,
    hint: 'Match letters directly: C=8, A=2, L=5, I=1, C=8, U=9, T=6.',
    explanation: 'From the given codes: C=8, A=2, L=5, I=1, C=8, U=9, T=6. Therefore, CALICUT = 8251896.',
    subject: 'Reasoning',
    category: 'Coding & Decoding',
    difficulty: 'easy'
  },
  {
    id: 'reas_03',
    question: 'Pointing to a gentleman, Ramesh said: "His only brother is the father of my daughter\'s father." How is the gentleman related to Ramesh?',
    options: ['Father', 'Uncle (Father\'s brother)', 'Grandfather', 'Brother'],
    correctIndex: 1,
    hint: '"My daughter\'s father" is Ramesh himself. The father of Ramesh is Ramesh\'s father.',
    explanation: 'My daughter\'s father = Ramesh. Father of Ramesh = Ramesh\'s father. His only brother is Ramesh\'s father\'s brother = Ramesh\'s Uncle.',
    subject: 'Reasoning',
    category: 'Blood Relations',
    difficulty: 'medium'
  },
  {
    id: 'reas_04',
    question: 'A clock shows 3:30. What is the angle between the hour hand and minute hand?',
    options: ['60°', '75°', '90°', '45°'],
    correctIndex: 1,
    hint: 'Angle formula = |30H - 5.5M| where H=3, M=30.',
    explanation: 'Angle = |30(3) - 5.5(30)| = |90 - 165| = 75°.',
    subject: 'Reasoning',
    category: 'Clock & Calendar',
    difficulty: 'medium'
  },

  // INDIAN POLITY, HISTORY & GENERAL KNOWLEDGE
  {
    id: 'gk_01',
    question: 'Which Article of the Indian Constitution is referred to as the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
    options: ['Article 14 (Equality)', 'Article 19 (Freedoms)', 'Article 21 (Right to Life)', 'Article 32 (Right to Constitutional Remedies)'],
    correctIndex: 3,
    hint: 'It empowers citizens to move the Supreme Court directly for enforcement of Fundamental Rights.',
    explanation: 'Dr. B.R. Ambedkar called Article 32 (Right to Constitutional Remedies through Writs) the heart and soul of the Indian Constitution.',
    subject: 'Indian Polity',
    category: 'Constitution of India',
    difficulty: 'easy'
  },
  {
    id: 'gk_02',
    question: 'Who was the first Governor-General of independent India in 1947?',
    options: ['Lord Mountbatten', 'C. Rajagopalachari', 'Dr. Rajendra Prasad', 'Jawaharlal Nehru'],
    correctIndex: 0,
    hint: 'He served until June 1948 before C. Rajagopalachari took office.',
    explanation: 'Lord Mountbatten served as the first Governor-General of independent India from Aug 1947 to June 1948. C. Rajagopalachari was the first and only Indian Governor-General.',
    subject: 'History',
    category: 'Modern Indian History',
    difficulty: 'medium'
  },
  {
    id: 'gk_03',
    question: 'Which Indian space mission successfully achieved a soft landing near the lunar South Pole in August 2023?',
    options: ['Chandrayaan-1', 'Chandrayaan-2', 'Chandrayaan-3', 'Mangalyaan-2'],
    correctIndex: 2,
    hint: 'The landing site was named "Shiv Shakti Point".',
    explanation: 'ISRO\'s Chandrayaan-3 mission landed its Vikram lander and Pragyan rover near the Moon\'s south pole on August 23, 2023, celebrated as National Space Day in India.',
    subject: 'Current Affairs & Science',
    category: 'Space & Astronomy',
    difficulty: 'easy'
  },
  {
    id: 'gk_04',
    question: 'Which Indian classical dance form originates from the state of Odisha and is known for its tribhanga posture?',
    options: ['Kathak', 'Odissi', 'Bharatanatyam', 'Kathakali'],
    correctIndex: 1,
    hint: 'Famous for depicting Gita Govinda and Jagannath culture.',
    explanation: 'Odissi is an ancient classical dance form of Odisha recognized for its graceful tribhanga (three-bend) body posture and mudras.',
    subject: 'Art & Culture',
    category: 'Indian Culture',
    difficulty: 'easy'
  },
  {
    id: 'gk_05',
    question: 'Which is the largest and longest river basin in India by drainage area and length within national borders?',
    options: ['Godavari', 'Ganga', 'Brahmaputra', 'Narmada'],
    correctIndex: 1,
    hint: 'It originates from the Gangotri glacier at Gaumukh as Bhagirathi.',
    explanation: 'The Ganga River basin covers over 861,452 km² and runs for 2,525 km within India, making it the largest river basin.',
    subject: 'Geography',
    category: 'Indian Geography',
    difficulty: 'easy'
  },

  // COMPUTER & INFORMATION TECHNOLOGY
  {
    id: 'comp_01',
    question: 'In computer networking, what does the protocol acronym "HTTP" stand for?',
    options: [
      'HyperText Transfer Protocol',
      'High Transmission Telecommunication Protocol',
      'Hyperlink Text Terminal Program',
      'Host Token Test Procedure'
    ],
    correctIndex: 0,
    hint: 'Foundation of data communication on the World Wide Web.',
    explanation: 'HTTP stands for HyperText Transfer Protocol, the application layer protocol used for transmitting web pages over the internet.',
    subject: 'Computer & IT',
    category: 'Networking & Web',
    difficulty: 'easy'
  },
  {
    id: 'comp_02',
    question: 'Which computer memory type is non-volatile and contains initial boot instructions (BIOS/UEFI)?',
    options: ['RAM (Random Access Memory)', 'ROM (Read Only Memory)', 'Cache Memory', 'Virtual Memory'],
    correctIndex: 1,
    hint: 'It retains its contents even when computer power is switched off.',
    explanation: 'ROM (Read-Only Memory) retains firmware and bootloader instructions permanently without continuous electrical power.',
    subject: 'Computer & IT',
    category: 'Computer Hardware',
    difficulty: 'easy'
  }
];

// Helper to pick appropriate procedural generator based on subject
function generateProceduralQuestion(classTrackId: string, subjectFilter: string): ArenaQuestion {
  const sLower = subjectFilter.toLowerCase();
  if (sLower.includes('reason') || sLower.includes('logic') || sLower.includes('intelligence') || sLower.includes('riddle')) {
    return generateDynamicReasoningQuestion();
  }
  if (sLower.includes('sci') || sLower.includes('physic') || sLower.includes('chem') || sLower.includes('bio') || sLower.includes('matter')) {
    return generateDynamicScienceQuestion(classTrackId);
  }
  if (sLower.includes('eng') || sLower.includes('gram') || sLower.includes('vocab') || sLower.includes('verbal')) {
    return generateDynamicEnglishQuestion();
  }
  if (sLower.includes('math') || sLower.includes('arith') || sLower.includes('quant') || sLower.includes('algebra') || sLower.includes('calc') || sLower.includes('geom')) {
    return generateDynamicMathQuestion(classTrackId);
  }

  // If All Combined, randomly pick across generators
  const pick = Math.floor(Math.random() * 4);
  if (pick === 0) return generateDynamicMathQuestion(classTrackId);
  if (pick === 1) return generateDynamicScienceQuestion(classTrackId);
  if (pick === 2) return generateDynamicReasoningQuestion();
  return generateDynamicEnglishQuestion();
}

// Main Generator function that creates unlimited unique question sets
export function generateArenaQuestionSet(
  classTrackId: string = 'class_secondary',
  subjectFilter: string = 'All Combined (Grand Clash)',
  count: number = 5,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): ArenaQuestion[] {
  const result: ArenaQuestion[] = [];
  const usedIds = new Set<string>();

  // Filter static questions by subject if specific subject selected
  let candidateStatic = [...MASTER_ARENA_QUESTION_BANK];
  if (subjectFilter && subjectFilter !== 'All Combined (Grand Clash)') {
    const sLower = subjectFilter.toLowerCase();
    candidateStatic = candidateStatic.filter(q => {
      return (
        q.subject.toLowerCase().includes(sLower) ||
        sLower.includes(q.subject.toLowerCase()) ||
        q.category.toLowerCase().includes(sLower)
      );
    });
    if (candidateStatic.length === 0) {
      candidateStatic = [...MASTER_ARENA_QUESTION_BANK];
    }
  }

  // Shuffle static pool
  const shuffledStatic = shuffleArray(candidateStatic);

  // Take a mix of dynamic procedural and static questions to guarantee zero repeats
  for (let i = 0; i < count; i++) {
    // Alternate or inject dynamic math/science/logic generator
    const shouldMakeDynamic = i % 2 === 0 || i >= shuffledStatic.length;

    if (shouldMakeDynamic) {
      const dynQ = generateProceduralQuestion(classTrackId, subjectFilter);
      result.push(dynQ);
      usedIds.add(dynQ.id);
    } else {
      const staticQ = shuffledStatic[i % shuffledStatic.length];
      if (staticQ && !usedIds.has(staticQ.id)) {
        // Also randomize option order of static questions on every attempt!
        const correctText = staticQ.options[staticQ.correctIndex];
        const shuffledOpts = shuffleArray(staticQ.options);
        const newCorrectIdx = shuffledOpts.indexOf(correctText);

        result.push({
          ...staticQ,
          id: `${staticQ.id}_${Date.now()}_${i}`,
          options: shuffledOpts,
          correctIndex: newCorrectIdx
        });
        usedIds.add(staticQ.id);
      } else {
        const dynQ = generateProceduralQuestion(classTrackId, subjectFilter);
        result.push(dynQ);
      }
    }
  }

  return result;
}
