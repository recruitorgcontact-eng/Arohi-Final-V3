// Arohi AI — Comprehensive Master School Boards Knowledge Graph (Classes 1 to 12)
// Encompasses Central Boards (CBSE, ICSE/ISC, NIOS) and 28 State Education Boards across India.

export interface SchoolBoardGradeSubject {
  id: string; // 'math-std' | 'science' | 'physics' | 'social-science' | 'biology' | ...
  name: string; // 'Mathematics Standard'
  nameHindi?: string;
  nameRegional?: string;
  code?: string;
  totalChapters?: number;
  sampleTopics: string[];
  durationMinutes: number;
  totalMarks: number;
  cbtQuestionsCount: number;
}

export interface SchoolBoardGrade {
  gradeNumber: number; // 1 to 12
  gradeSlug: string; // 'class-10' | 'class-12-science' | 'class-8'
  title: string; // 'Class 10 Matriculation Board Exam'
  stream?: 'General' | 'Science (PCM/PCB)' | 'Commerce' | 'Arts & Humanities' | 'Vocational';
  subjects: SchoolBoardGradeSubject[];
}

export interface MasterSchoolBoardDefinition {
  id: string; // 'cbse' | 'cisce' | 'nios' | 'bse-odisha' | 'chse-odisha' | 'upmsp' | 'bseb' | 'msbshse' | ...
  code: string; // 'CBSE' | 'ICSE' | 'BSE' | 'UPMSP'
  name: string; // 'Central Board of Secondary Education'
  nameRegional?: string;
  stateId: string; // 'central' | 'odisha' | 'uttar-pradesh' | 'bihar' | 'maharashtra' | ...
  stateName: string;
  headquarters: string;
  officialPortal: string;
  curriculumStandard: 'NCERT / NEP 2020' | 'State Specific SCERT' | 'CISCE Standard' | 'Open Schooling';
  mediumsOfInstruction: string[];
  establishedYear: number;
  classesCovered: number[]; // e.g. [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  examSeasons: string; // 'February - April Annual Board Examinations'
  gradesMap: Record<string, SchoolBoardGrade>;
}

// 1. STANDARD SUBJECT TEMPLATES FOR GRADES
const GRADE_10_CORE_SUBJECTS: SchoolBoardGradeSubject[] = [
  {
    id: 'maths-standard',
    name: 'Mathematics Standard & Basic',
    nameHindi: 'गणित (मानक व आधारभूत)',
    sampleTopics: ['Real Numbers', 'Polynomials', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Trigonometry', 'Circles', 'Surface Areas & Volumes', 'Statistics & Probability'],
    durationMinutes: 180,
    totalMarks: 80,
    cbtQuestionsCount: 40
  },
  {
    id: 'science-physics-chem-bio',
    name: 'Science (Physics, Chemistry & Biology)',
    nameHindi: 'विज्ञान (भौतिकी, रसायन व जीव विज्ञान)',
    sampleTopics: ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Metals & Non-metals', 'Carbon & its Compounds', 'Life Processes', 'Control & Coordination', 'How do Organisms Reproduce', 'Heredity & Evolution', 'Light Reflection & Refraction', 'Electricity', 'Magnetic Effects of Electric Current'],
    durationMinutes: 180,
    totalMarks: 80,
    cbtQuestionsCount: 40
  },
  {
    id: 'social-science',
    name: 'Social Science (History, Civics, Geography, Economics)',
    nameHindi: 'सामाजिक विज्ञान',
    sampleTopics: ['The Rise of Nationalism in Europe', 'Nationalism in India', 'Resources & Development', 'Agriculture', 'Minerals & Energy Resources', 'Power Sharing', 'Federalism', 'Democracy & Diversity', 'Development', 'Sectors of Indian Economy', 'Money & Credit'],
    durationMinutes: 180,
    totalMarks: 80,
    cbtQuestionsCount: 40
  },
  {
    id: 'english-language-literature',
    name: 'English Language & Literature',
    sampleTopics: ['Reading Comprehension', 'Analytical Paragraph Writing', 'Formal Letters', 'Grammar Tenses & Modals', 'First Flight Prose & Poetry', 'Footprints without Feet'],
    durationMinutes: 180,
    totalMarks: 80,
    cbtQuestionsCount: 40
  },
  {
    id: 'regional-first-language',
    name: 'Regional First Language (Hindi Course A/B, Odia Sahitya, Bengali, etc.)',
    nameHindi: 'प्रथम भाषा (मातृभाषा / क्षेत्रीय)',
    sampleTopics: ['Gadhya & Padhya Sahitya', 'Grammar / Vyakaran', 'Composition / Nibandh', 'Patra Lekhan', 'Unseen Passages'],
    durationMinutes: 180,
    totalMarks: 80,
    cbtQuestionsCount: 40
  }
];

const GRADE_12_SCIENCE_SUBJECTS: SchoolBoardGradeSubject[] = [
  {
    id: 'physics-12',
    name: 'Physics (Class 12 Board & NEET/JEE Base)',
    nameHindi: 'भौतिक विज्ञान (12वीं)',
    sampleTopics: ['Electrostatics & Capacitance', 'Current Electricity', 'Magnetic Effects & Magnetism', 'Electromagnetic Induction & AC', 'Optics (Ray & Wave)', 'Dual Nature of Radiation', 'Atoms & Nuclei', 'Semiconductor Electronics'],
    durationMinutes: 180,
    totalMarks: 70,
    cbtQuestionsCount: 35
  },
  {
    id: 'chemistry-12',
    name: 'Chemistry (Organic, Inorganic & Physical)',
    nameHindi: 'रसायन विज्ञान (12वीं)',
    sampleTopics: ['Solutions', 'Electrochemistry', 'Chemical Kinetics', 'd and f Block Elements', 'Coordination Compounds', 'Haloalkanes & Haloarenes', 'Alcohols, Phenols & Ethers', 'Aldehydes, Ketones & Carboxylic Acids', 'Amines', 'Biomolecules'],
    durationMinutes: 180,
    totalMarks: 70,
    cbtQuestionsCount: 35
  },
  {
    id: 'mathematics-12',
    name: 'Mathematics (Class 12 Higher Secondary)',
    nameHindi: 'गणित (12वीं)',
    sampleTopics: ['Relations & Functions', 'Matrices & Determinants', 'Continuity & Differentiability', 'Application of Derivatives', 'Integrals & Definite Integrals', 'Differential Equations', 'Vector Algebra & 3D Geometry', 'Linear Programming', 'Probability'],
    durationMinutes: 180,
    totalMarks: 80,
    cbtQuestionsCount: 40
  },
  {
    id: 'biology-12',
    name: 'Biology (Botany & Zoology)',
    nameHindi: 'जीव विज्ञान (12वीं)',
    sampleTopics: ['Sexual Reproduction in Flowering Plants', 'Human Reproduction', 'Reproductive Health', 'Principles of Inheritance & Variation', 'Molecular Basis of Inheritance', 'Evolution', 'Human Health & Diseases', 'Biotechnology Principles & Processes', 'Ecosystem & Biodiversity'],
    durationMinutes: 180,
    totalMarks: 70,
    cbtQuestionsCount: 35
  }
];

const GRADE_12_COMMERCE_SUBJECTS: SchoolBoardGradeSubject[] = [
  {
    id: 'accountancy-12',
    name: 'Accountancy (Partnership, Companies & Analysis)',
    sampleTopics: ['Accounting for Partnership Firms', 'Admission, Retirement & Death of Partner', 'Accounting for Share Capital & Debentures', 'Financial Statements of a Company', 'Ratio Analysis', 'Cash Flow Statement'],
    durationMinutes: 180,
    totalMarks: 80,
    cbtQuestionsCount: 40
  },
  {
    id: 'business-studies-12',
    name: 'Business Studies (Management Principles & Finance)',
    sampleTopics: ['Nature & Significance of Management', 'Principles of Management', 'Business Environment', 'Planning, Organizing, Staffing, Directing, Controlling', 'Financial Management & Financial Markets', 'Marketing Management', 'Consumer Protection'],
    durationMinutes: 180,
    totalMarks: 80,
    cbtQuestionsCount: 40
  },
  {
    id: 'economics-12',
    name: 'Economics (Macroeconomics & Indian Economic Development)',
    sampleTopics: ['National Income Accounting', 'Money and Banking', 'Determination of Income and Employment', 'Government Budget', 'Balance of Payments', 'Development Experience (1947-90)', 'Economic Reforms Since 1991', 'Current Challenges in Indian Economy'],
    durationMinutes: 180,
    totalMarks: 80,
    cbtQuestionsCount: 40
  }
];

// Helper to assemble full grade structure (Classes 1 to 12)
function createGradesMapForBoard(boardCode: string): Record<string, SchoolBoardGrade> {
  const map: Record<string, SchoolBoardGrade> = {};

  // Classes 1 to 5 (Primary Foundation)
  for (let g = 1; g <= 5; g++) {
    map[`class-${g}`] = {
      gradeNumber: g,
      gradeSlug: `class-${g}`,
      title: `Class ${g} Foundational School Exam (${boardCode})`,
      stream: 'General',
      subjects: [
        {
          id: `maths-${g}`,
          name: `Class ${g} Mathematics (Foundational Numeracy)`,
          sampleTopics: ['Shapes & Space', 'Numbers & Place Value', 'Addition & Subtraction', 'Multiplication Tables', 'Measurement & Time'],
          durationMinutes: 60,
          totalMarks: 50,
          cbtQuestionsCount: 25
        },
        {
          id: `evs-${g}`,
          name: `Class ${g} Environmental Studies (EVS / General Science)`,
          sampleTopics: ['My Family & Surroundings', 'Plants & Animals', 'Food & Health', 'Water & Air', 'Community Helpers'],
          durationMinutes: 60,
          totalMarks: 50,
          cbtQuestionsCount: 25
        },
        {
          id: `english-${g}`,
          name: `Class ${g} English Language & Phonics`,
          sampleTopics: ['Reading Simple Sentences', 'Vocabulary & Rhymes', 'Spelling & Grammar', 'Creative Picture Comprehension'],
          durationMinutes: 60,
          totalMarks: 50,
          cbtQuestionsCount: 25
        }
      ]
    };
  }

  // Classes 6 to 8 (Upper Primary Middle School)
  for (let g = 6; g <= 8; g++) {
    map[`class-${g}`] = {
      gradeNumber: g,
      gradeSlug: `class-${g}`,
      title: `Class ${g} Middle School Exam (${boardCode})`,
      stream: 'General',
      subjects: [
        {
          id: `maths-${g}`,
          name: `Class ${g} Mathematics`,
          sampleTopics: ['Integers & Fractions', 'Algebraic Expressions', 'Simple Equations', 'Geometry & Triangles', 'Mensuration & Perimeter', 'Data Handling'],
          durationMinutes: 120,
          totalMarks: 80,
          cbtQuestionsCount: 30
        },
        {
          id: `science-${g}`,
          name: `Class ${g} General Science`,
          sampleTopics: ['Food & Nutrition in Living Organisms', 'Heat & Temperature', 'Acids, Bases & Salts', 'Physical & Chemical Changes', 'Motion & Time', 'Electric Current & Circuits'],
          durationMinutes: 120,
          totalMarks: 80,
          cbtQuestionsCount: 30
        },
        {
          id: `social-science-${g}`,
          name: `Class ${g} Social Science`,
          sampleTopics: ['Our Pasts History', 'The Earth Our Habitat', 'Social and Political Life', 'Environment & Resources'],
          durationMinutes: 120,
          totalMarks: 80,
          cbtQuestionsCount: 30
        }
      ]
    };
  }

  // Class 9 & Class 10 (Secondary & Matriculation)
  map['class-9'] = {
    gradeNumber: 9,
    gradeSlug: 'class-9',
    title: `Class 9 Annual Secondary Exam (${boardCode})`,
    stream: 'General',
    subjects: GRADE_10_CORE_SUBJECTS.map(s => ({ ...s, id: `${s.id}-c9`, name: `Class 9 ${s.name}` }))
  };

  map['class-10'] = {
    gradeNumber: 10,
    gradeSlug: 'class-10',
    title: `Class 10 Matriculation Board Examination (${boardCode})`,
    stream: 'General',
    subjects: GRADE_10_CORE_SUBJECTS
  };

  // Class 11 & Class 12 Streams
  map['class-11-science'] = {
    gradeNumber: 11,
    gradeSlug: 'class-11-science',
    title: `Class 11 Higher Secondary Science (${boardCode})`,
    stream: 'Science (PCM/PCB)',
    subjects: GRADE_12_SCIENCE_SUBJECTS.map(s => ({ ...s, id: `${s.id}-c11`, name: `Class 11 ${s.name}` }))
  };

  map['class-12-science'] = {
    gradeNumber: 12,
    gradeSlug: 'class-12-science',
    title: `Class 12 Higher Secondary Board Exam — Science Stream (${boardCode})`,
    stream: 'Science (PCM/PCB)',
    subjects: GRADE_12_SCIENCE_SUBJECTS
  };

  map['class-12-commerce'] = {
    gradeNumber: 12,
    gradeSlug: 'class-12-commerce',
    title: `Class 12 Higher Secondary Board Exam — Commerce Stream (${boardCode})`,
    stream: 'Commerce',
    subjects: GRADE_12_COMMERCE_SUBJECTS
  };

  return map;
}

// 2. MASTER ALL-INDIA SCHOOL BOARDS DIRECTORY
export const MASTER_SCHOOL_BOARDS_MAP: Record<string, MasterSchoolBoardDefinition> = {
  // NATIONAL CENTRAL BOARDS
  cbse: {
    id: 'cbse',
    code: 'CBSE',
    name: 'Central Board of Secondary Education',
    nameRegional: 'केंद्रीय माध्यमिक शिक्षा बोर्ड',
    stateId: 'central',
    stateName: 'All-India / National',
    headquarters: 'New Delhi',
    officialPortal: 'https://www.cbse.gov.in',
    curriculumStandard: 'NCERT / NEP 2020',
    mediumsOfInstruction: ['English', 'Hindi'],
    establishedYear: 1929,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'February to April (AISSE 10th & AISSCE 12th)',
    gradesMap: createGradesMapForBoard('CBSE')
  },

  cisce: {
    id: 'cisce',
    code: 'CISCE / ICSE',
    name: 'Council for the Indian School Certificate Examinations (ICSE / ISC)',
    stateId: 'central',
    stateName: 'All-India / National',
    headquarters: 'New Delhi',
    officialPortal: 'https://cisce.org',
    curriculumStandard: 'CISCE Standard',
    mediumsOfInstruction: ['English'],
    establishedYear: 1958,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'February to March (ICSE 10th & ISC 12th)',
    gradesMap: createGradesMapForBoard('ICSE/ISC')
  },

  nios: {
    id: 'nios',
    code: 'NIOS',
    name: 'National Institute of Open Schooling',
    stateId: 'central',
    stateName: 'All-India / National',
    headquarters: 'Noida, Uttar Pradesh',
    officialPortal: 'https://www.nios.ac.in',
    curriculumStandard: 'Open Schooling',
    mediumsOfInstruction: ['English', 'Hindi', 'Regional Languages'],
    establishedYear: 1989,
    classesCovered: [3, 5, 8, 10, 12],
    examSeasons: 'April-May (Block 1) & October-November (Block 2)',
    gradesMap: createGradesMapForBoard('NIOS')
  },

  // 28 STATE EDUCATION BOARDS
  'bse-odisha': {
    id: 'bse-odisha',
    code: 'BSE Odisha',
    name: 'Board of Secondary Education, Odisha',
    nameRegional: 'ମାଧ୍ୟମିକ ଶିକ୍ଷା ପରିଷଦ, ଓଡ଼ିଶା (ମାଟ୍ରିକ୍ ବୋର୍ଡ)',
    stateId: 'odisha',
    stateName: 'Odisha',
    headquarters: 'Cuttack, Odisha',
    officialPortal: 'http://bseodisha.ac.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Odia', 'English', 'Hindi', 'Telugu'],
    establishedYear: 1953,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    examSeasons: 'February-March (Odisha High School Certificate HSC Examination)',
    gradesMap: createGradesMapForBoard('BSE Odisha')
  },

  'chse-odisha': {
    id: 'chse-odisha',
    code: 'CHSE Odisha',
    name: 'Council of Higher Secondary Education, Odisha (+2)',
    nameRegional: 'ଉଚ୍ଚ ମାଧ୍ୟମିକ ଶିକ୍ଷା ପରିଷଦ, ଓଡ଼ିଶା (+୨ ପରୀକ୍ଷା)',
    stateId: 'odisha',
    stateName: 'Odisha',
    headquarters: 'Bhubaneswar, Odisha',
    officialPortal: 'http://chseodisha.nic.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['English', 'Odia'],
    establishedYear: 1982,
    classesCovered: [11, 12],
    examSeasons: 'February-March (+2 Science, Commerce, Arts Annual Examination)',
    gradesMap: createGradesMapForBoard('CHSE Odisha')
  },

  upmsp: {
    id: 'upmsp',
    code: 'UPMSP',
    name: 'Uttar Pradesh Madhyamik Shiksha Parishad (UP Board)',
    nameRegional: 'उत्तर प्रदेश माध्यमिक शिक्षा परिषद् (यूपी बोर्ड 10वीं व 12वीं)',
    stateId: 'uttar-pradesh',
    stateName: 'Uttar Pradesh',
    headquarters: 'Prayagraj, Uttar Pradesh',
    officialPortal: 'https://upmsp.edu.in',
    curriculumStandard: 'NCERT / NEP 2020',
    mediumsOfInstruction: ['Hindi', 'English'],
    establishedYear: 1921,
    classesCovered: [9, 10, 11, 12],
    examSeasons: 'February-March (High School & Intermediate Examination)',
    gradesMap: createGradesMapForBoard('UP Board')
  },

  bseb: {
    id: 'bseb',
    code: 'BSEB',
    name: 'Bihar School Examination Board',
    nameRegional: 'बिहार विद्यालय परीक्षा समिति (मैट्रिक व इंटरमीडिएट)',
    stateId: 'bihar',
    stateName: 'Bihar',
    headquarters: 'Patna, Bihar',
    officialPortal: 'http://biharboardonline.bihar.gov.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Hindi', 'English', 'Urdu'],
    establishedYear: 1952,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'February (Matriculation 10th & Intermediate 12th Exam)',
    gradesMap: createGradesMapForBoard('BSEB Bihar')
  },

  msbshse: {
    id: 'msbshse',
    code: 'MSBSHSE',
    name: 'Maharashtra State Board of Secondary and Higher Secondary Education (SSC & HSC)',
    nameRegional: 'महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ',
    stateId: 'maharashtra',
    stateName: 'Maharashtra',
    headquarters: 'Pune, Maharashtra',
    officialPortal: 'https://mahahsscboard.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Marathi', 'English', 'Hindi', 'Urdu', 'Gujarati'],
    establishedYear: 1965,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'February-March (SSC 10th & HSC 12th Board Examinations)',
    gradesMap: createGradesMapForBoard('Maharashtra Board')
  },

  rbse: {
    id: 'rbse',
    code: 'RBSE',
    name: 'Board of Secondary Education, Rajasthan',
    nameRegional: 'माध्यमिक शिक्षा बोर्ड राजस्थान (अजमेर)',
    stateId: 'rajasthan',
    stateName: 'Rajasthan',
    headquarters: 'Ajmer, Rajasthan',
    officialPortal: 'http://rajeduboard.rajasthan.gov.in',
    curriculumStandard: 'NCERT / NEP 2020',
    mediumsOfInstruction: ['Hindi', 'English'],
    establishedYear: 1957,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'March-April (Secondary & Higher Secondary Examinations)',
    gradesMap: createGradesMapForBoard('RBSE Rajasthan')
  },

  wbbse: {
    id: 'wbbse',
    code: 'WBBSE / WBCHSE',
    name: 'West Bengal Board of Secondary & Higher Secondary Education (Madhyamik & HS)',
    nameRegional: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (মাধ্যমিক ও উচ্চ মাধ্যমিক)',
    stateId: 'west-bengal',
    stateName: 'West Bengal',
    headquarters: 'Kolkata, West Bengal',
    officialPortal: 'https://wbbse.wb.gov.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Bengali', 'English', 'Hindi', 'Nepali', 'Urdu'],
    establishedYear: 1951,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'February (Madhyamik Pariksha 10th & Uchha Madhyamik 12th)',
    gradesMap: createGradesMapForBoard('West Bengal Board')
  },

  bsemp: {
    id: 'bsemp',
    code: 'MPBSE',
    name: 'Madhya Pradesh Board of Secondary Education (MP Board)',
    nameRegional: 'माध्यमिक शिक्षा मण्डल, मध्य प्रदेश',
    stateId: 'madhya-pradesh',
    stateName: 'Madhya Pradesh',
    headquarters: 'Bhopal, Madhya Pradesh',
    officialPortal: 'https://mpbse.nic.in',
    curriculumStandard: 'NCERT / NEP 2020',
    mediumsOfInstruction: ['Hindi', 'English'],
    establishedYear: 1965,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'February-March (High School 10th & Higher Secondary 12th)',
    gradesMap: createGradesMapForBoard('MPBSE')
  },

  tnscert: {
    id: 'tnscert',
    code: 'TNDGE',
    name: 'Tamil Nadu Directorate of Government Examinations (TN SSLC & HSE)',
    nameRegional: 'தமிழ்நாடு அரசுத் தேர்வுகள் இயக்ககம் (10th & 12th)',
    stateId: 'tamil-nadu',
    stateName: 'Tamil Nadu',
    headquarters: 'Chennai, Tamil Nadu',
    officialPortal: 'https://dge.tn.gov.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Tamil', 'English'],
    establishedYear: 1975,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'March-April (SSLC 10th & +2 Higher Secondary)',
    gradesMap: createGradesMapForBoard('Tamil Nadu Board')
  },

  kseab: {
    id: 'kseab',
    code: 'KSEAB',
    name: 'Karnataka School Examination and Assessment Board (KSEEB SSLC & 2nd PUC)',
    nameRegional: 'ಕರ್ನಾಟಕ ಶಾಲಾ ಪರೀಕ್ಷೆ ಮತ್ತು ಮೌಲ್ಯನಿರ್ಣಯ ಮಂಡಳಿ',
    stateId: 'karnataka',
    stateName: 'Karnataka',
    headquarters: 'Bengaluru, Karnataka',
    officialPortal: 'https://kseab.karnataka.gov.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Kannada', 'English'],
    establishedYear: 1966,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'March-April (SSLC 10th & 2nd PUC 12th Exams)',
    gradesMap: createGradesMapForBoard('Karnataka Board')
  },

  bseap: {
    id: 'bseap',
    code: 'BSEAP & BIEAP',
    name: 'Board of Secondary Education & Board of Intermediate Education, Andhra Pradesh',
    nameRegional: 'ఆంధ్రప్రదేశ్ సెకండరీ & ఇంటర్మీడియట్ బోర్డు',
    stateId: 'andhra-pradesh',
    stateName: 'Andhra Pradesh',
    headquarters: 'Vijayawada, Andhra Pradesh',
    officialPortal: 'https://bse.ap.gov.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Telugu', 'English'],
    establishedYear: 1953,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'March-April (AP SSC 10th & Intermediate 1st & 2nd Year)',
    gradesMap: createGradesMapForBoard('AP Board')
  },

  bsetelangana: {
    id: 'bsetelangana',
    code: 'BSET & TS BIE',
    name: 'Telangana Directorate of Government Examinations (TS SSC & Inter)',
    nameRegional: 'తెలంగాణ ఎస్.ఎస్.సి మరియు ఇంటర్మీడియట్ బోర్డు',
    stateId: 'telangana',
    stateName: 'Telangana',
    headquarters: 'Hyderabad, Telangana',
    officialPortal: 'https://bse.telangana.gov.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Telugu', 'English', 'Urdu'],
    establishedYear: 2014,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'March-April (TS SSC 10th & Inter Public Examinations)',
    gradesMap: createGradesMapForBoard('Telangana Board')
  },

  gseb: {
    id: 'gseb',
    code: 'GSEB',
    name: 'Gujarat Secondary and Higher Secondary Education Board',
    nameRegional: 'ગુજરાત માધ્યમિક અને ઉચ્ચતર માધ્યમિક શિક્ષણ બોર્ડ (એસએસસી અને એચએસસી)',
    stateId: 'gujarat',
    stateName: 'Gujarat',
    headquarters: 'Gandhinagar, Gujarat',
    officialPortal: 'https://www.gseb.org',
    curriculumStandard: 'NCERT / NEP 2020',
    mediumsOfInstruction: ['Gujarati', 'English', 'Hindi'],
    establishedYear: 1960,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'March (SSC 10th & HSC 12th General & Science Streams)',
    gradesMap: createGradesMapForBoard('GSEB Gujarat')
  },

  kbpe: {
    id: 'kbpe',
    code: 'KBPE / DHSE',
    name: 'Kerala Directorate of Higher Secondary Education & Pareeksha Bhavan (SSLC & +2)',
    nameRegional: 'കേരള ഹയർ സെക്കൻഡറി വിദ്യാഭ്യാസ വകുപ്പ് (എസ്.എസ്.എൽ.സി & +2)',
    stateId: 'kerala',
    stateName: 'Kerala',
    headquarters: 'Thiruvananthapuram, Kerala',
    officialPortal: 'http://keralapareekshabhavan.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Malayalam', 'English'],
    establishedYear: 1965,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'March-April (Kerala SSLC & DHSE Plus Two Examination)',
    gradesMap: createGradesMapForBoard('Kerala Board')
  },

  pseb: {
    id: 'pseb',
    code: 'PSEB',
    name: 'Punjab School Education Board',
    nameRegional: 'ਪੰਜਾਬ ਸਕੂਲ ਸਿੱਖਿਆ ਬੋਰਡ (ਮੈਟ੍ਰਿਕ ਅਤੇ ਸੀਨੀਅਰ ਸੈਕੰਡਰੀ)',
    stateId: 'punjab',
    stateName: 'Punjab',
    headquarters: 'SAS Nagar (Mohali), Punjab',
    officialPortal: 'https://www.pseb.ac.in',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Punjabi', 'English', 'Hindi'],
    establishedYear: 1969,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'February-March (Class 5, 8, 10 & 12 Annual Examinations)',
    gradesMap: createGradesMapForBoard('PSEB Punjab')
  },

  seba: {
    id: 'seba',
    code: 'SEBA & AHSEC',
    name: 'Board of Secondary Education, Assam & Assam Higher Secondary Education Council',
    nameRegional: 'অসম মাধ্যমিক শিক্ষা পৰিষদ (হাইস্কুল শিক্ষান্ত পৰীক্ষা HSLC)',
    stateId: 'assam',
    stateName: 'Assam',
    headquarters: 'Guwahati, Assam',
    officialPortal: 'https://sebaonline.org',
    curriculumStandard: 'State Specific SCERT',
    mediumsOfInstruction: ['Assamese', 'English', 'Bengali', 'Bodo'],
    establishedYear: 1962,
    classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    examSeasons: 'February-March (HSLC 10th & HS 12th Examinations)',
    gradesMap: createGradesMapForBoard('SEBA Assam')
  }
};

export const ALL_SCHOOL_BOARDS_LIST = Object.values(MASTER_SCHOOL_BOARDS_MAP);
