// Arohi AI — Relational Master Knowledge Graph (India -> State -> Authority -> Exam -> Stage -> Subject)
// Powers dynamic breadcrumb navigation, relational discovery, and targeted SEO landing page generation.

import { 
  KGCountryNode, 
  KGStateNode, 
  KGAuthorityNode, 
  KGExamNode, 
  KGStageNode, 
  KGSubjectNode, 
  KGBreadcrumbItem, 
  ExamKnowledgeGraphLineage, 
  ExamSEOMetadata,
  MockTest,
  ExamStageType
} from '../types/examTypes';

// 1. COUNTRY NODE
export const KG_COUNTRY_INDIA: KGCountryNode = {
  id: 'india',
  name: 'India',
  slug: 'india',
  code: 'IN'
};

// 2. STATE & TERRITORY NODES (28 States + 8 UTs + Central)
export const KG_STATES_MAP: Record<string, KGStateNode> = {
  central: {
    id: 'central',
    name: 'All-India / Central',
    slug: 'central',
    code: 'IN-ALL',
    isCentral: true,
    officialLanguage: 'English / Hindi',
    capital: 'New Delhi',
    totalAuthoritiesCount: 15,
    totalExamsCount: 120
  },
  odisha: {
    id: 'odisha',
    name: 'Odisha',
    slug: 'odisha',
    code: 'OD',
    officialLanguage: 'Odia',
    capital: 'Bhubaneswar',
    totalAuthoritiesCount: 6,
    totalExamsCount: 28
  },
  'uttar-pradesh': {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    code: 'UP',
    officialLanguage: 'Hindi',
    capital: 'Lucknow',
    totalAuthoritiesCount: 5,
    totalExamsCount: 22
  },
  bihar: {
    id: 'bihar',
    name: 'Bihar',
    slug: 'bihar',
    code: 'BR',
    officialLanguage: 'Hindi',
    capital: 'Patna',
    totalAuthoritiesCount: 4,
    totalExamsCount: 18
  },
  maharashtra: {
    id: 'maharashtra',
    name: 'Maharashtra',
    slug: 'maharashtra',
    code: 'MH',
    officialLanguage: 'Marathi',
    capital: 'Mumbai',
    totalAuthoritiesCount: 5,
    totalExamsCount: 20
  },
  rajasthan: {
    id: 'rajasthan',
    name: 'Rajasthan',
    slug: 'rajasthan',
    code: 'RJ',
    officialLanguage: 'Hindi',
    capital: 'Jaipur',
    totalAuthoritiesCount: 4,
    totalExamsCount: 19
  },
  'madhya-pradesh': {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    code: 'MP',
    officialLanguage: 'Hindi',
    capital: 'Bhopal',
    totalAuthoritiesCount: 4,
    totalExamsCount: 16
  },
  'west-bengal': {
    id: 'west-bengal',
    name: 'West Bengal',
    slug: 'west-bengal',
    code: 'WB',
    officialLanguage: 'Bengali',
    capital: 'Kolkata',
    totalAuthoritiesCount: 4,
    totalExamsCount: 17
  },
  'tamil-nadu': {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    slug: 'tamil-nadu',
    code: 'TN',
    officialLanguage: 'Tamil',
    capital: 'Chennai',
    totalAuthoritiesCount: 4,
    totalExamsCount: 18
  },
  karnataka: {
    id: 'karnataka',
    name: 'Karnataka',
    slug: 'karnataka',
    code: 'KA',
    officialLanguage: 'Kannada',
    capital: 'Bengaluru',
    totalAuthoritiesCount: 4,
    totalExamsCount: 16
  },
  'andhra-pradesh': {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    slug: 'andhra-pradesh',
    code: 'AP',
    officialLanguage: 'Telugu',
    capital: 'Amaravati',
    totalAuthoritiesCount: 3,
    totalExamsCount: 14
  },
  telangana: {
    id: 'telangana',
    name: 'Telangana',
    slug: 'telangana',
    code: 'TS',
    officialLanguage: 'Telugu',
    capital: 'Hyderabad',
    totalAuthoritiesCount: 3,
    totalExamsCount: 15
  },
  kerala: {
    id: 'kerala',
    name: 'Kerala',
    slug: 'kerala',
    code: 'KL',
    officialLanguage: 'Malayalam',
    capital: 'Thiruvananthapuram',
    totalAuthoritiesCount: 3,
    totalExamsCount: 15
  },
  gujarat: {
    id: 'gujarat',
    name: 'Gujarat',
    slug: 'gujarat',
    code: 'GJ',
    officialLanguage: 'Gujarati',
    capital: 'Gandhinagar',
    totalAuthoritiesCount: 3,
    totalExamsCount: 14
  },
  punjab: {
    id: 'punjab',
    name: 'Punjab',
    slug: 'punjab',
    code: 'PB',
    officialLanguage: 'Punjabi',
    capital: 'Chandigarh',
    totalAuthoritiesCount: 3,
    totalExamsCount: 12
  },
  haryana: {
    id: 'haryana',
    name: 'Haryana',
    slug: 'haryana',
    code: 'HR',
    officialLanguage: 'Hindi',
    capital: 'Chandigarh',
    totalAuthoritiesCount: 3,
    totalExamsCount: 14
  },
  delhi: {
    id: 'delhi',
    name: 'NCT of Delhi',
    slug: 'delhi',
    code: 'DL',
    isUnionTerritory: true,
    officialLanguage: 'Hindi / English',
    capital: 'Delhi',
    totalAuthoritiesCount: 4,
    totalExamsCount: 18
  },
  assam: {
    id: 'assam',
    name: 'Assam',
    slug: 'assam',
    code: 'AS',
    officialLanguage: 'Assamese',
    capital: 'Dispur',
    totalAuthoritiesCount: 3,
    totalExamsCount: 12
  },
  jharkhand: {
    id: 'jharkhand',
    name: 'Jharkhand',
    slug: 'jharkhand',
    code: 'JH',
    officialLanguage: 'Hindi',
    capital: 'Ranchi',
    totalAuthoritiesCount: 3,
    totalExamsCount: 12
  },
  chhattisgarh: {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    slug: 'chhattisgarh',
    code: 'CG',
    officialLanguage: 'Hindi',
    capital: 'Raipur',
    totalAuthoritiesCount: 3,
    totalExamsCount: 11
  },
  uttarakhand: {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    slug: 'uttarakhand',
    code: 'UK',
    officialLanguage: 'Hindi',
    capital: 'Dehradun',
    totalAuthoritiesCount: 3,
    totalExamsCount: 12
  },
  'himachal-pradesh': {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    code: 'HP',
    officialLanguage: 'Hindi',
    capital: 'Shimla',
    totalAuthoritiesCount: 3,
    totalExamsCount: 11
  },
  'jammu-kashmir': {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    slug: 'jammu-kashmir',
    code: 'JK',
    isUnionTerritory: true,
    officialLanguage: 'Urdu / Hindi',
    capital: 'Srinagar / Jammu',
    totalAuthoritiesCount: 3,
    totalExamsCount: 10
  },
  goa: {
    id: 'goa',
    name: 'Goa',
    slug: 'goa',
    code: 'GA',
    officialLanguage: 'Konkani',
    capital: 'Panaji',
    totalAuthoritiesCount: 2,
    totalExamsCount: 8
  },
  tripura: {
    id: 'tripura',
    name: 'Tripura',
    slug: 'tripura',
    code: 'TR',
    officialLanguage: 'Bengali',
    capital: 'Agartala',
    totalAuthoritiesCount: 2,
    totalExamsCount: 7
  },
  manipur: {
    id: 'manipur',
    name: 'Manipur',
    slug: 'manipur',
    code: 'MN',
    officialLanguage: 'Manipuri',
    capital: 'Imphal',
    totalAuthoritiesCount: 2,
    totalExamsCount: 7
  },
  meghalaya: {
    id: 'meghalaya',
    name: 'Meghalaya',
    slug: 'meghalaya',
    code: 'ML',
    officialLanguage: 'English',
    capital: 'Shillong',
    totalAuthoritiesCount: 2,
    totalExamsCount: 6
  },
  nagaland: {
    id: 'nagaland',
    name: 'Nagaland',
    slug: 'nagaland',
    code: 'NL',
    officialLanguage: 'English',
    capital: 'Kohima',
    totalAuthoritiesCount: 2,
    totalExamsCount: 6
  },
  mizoram: {
    id: 'mizoram',
    name: 'Mizoram',
    slug: 'mizoram',
    code: 'MZ',
    officialLanguage: 'Mizo',
    capital: 'Aizawl',
    totalAuthoritiesCount: 2,
    totalExamsCount: 6
  },
  sikkim: {
    id: 'sikkim',
    name: 'Sikkim',
    slug: 'sikkim',
    code: 'SK',
    officialLanguage: 'Nepali / English',
    capital: 'Gangtok',
    totalAuthoritiesCount: 2,
    totalExamsCount: 6
  },
  'arunachal-pradesh': {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    slug: 'arunachal-pradesh',
    code: 'AR',
    officialLanguage: 'English',
    capital: 'Itanagar',
    totalAuthoritiesCount: 2,
    totalExamsCount: 6
  },
  chandigarh: {
    id: 'chandigarh',
    name: 'Chandigarh',
    slug: 'chandigarh',
    code: 'CH',
    isUnionTerritory: true,
    officialLanguage: 'Punjabi / English',
    capital: 'Chandigarh',
    totalAuthoritiesCount: 1,
    totalExamsCount: 5
  },
  puducherry: {
    id: 'puducherry',
    name: 'Puducherry',
    slug: 'puducherry',
    code: 'PY',
    isUnionTerritory: true,
    officialLanguage: 'Tamil / French',
    capital: 'Puducherry',
    totalAuthoritiesCount: 1,
    totalExamsCount: 5
  },
  ladakh: {
    id: 'ladakh',
    name: 'Ladakh',
    slug: 'ladakh',
    code: 'LA',
    isUnionTerritory: true,
    officialLanguage: 'Ladakhi / Hindi',
    capital: 'Leh',
    totalAuthoritiesCount: 1,
    totalExamsCount: 4
  },
  'andaman-nicobar': {
    id: 'andaman-nicobar',
    name: 'Andaman & Nicobar Islands',
    slug: 'andaman-nicobar',
    code: 'AN',
    isUnionTerritory: true,
    officialLanguage: 'Hindi / English',
    capital: 'Port Blair',
    totalAuthoritiesCount: 1,
    totalExamsCount: 4
  }
};

// 3. CONDUCTING AUTHORITIES REGISTRY
export const KG_AUTHORITIES_MAP: Record<string, KGAuthorityNode> = {
  upsc: {
    id: 'upsc',
    name: 'Union Public Service Commission',
    shortName: 'UPSC',
    slug: 'upsc',
    stateId: 'central',
    category: 'Central Constitutional Commission',
    website: 'https://upsc.gov.in',
    description: 'Premier constitutional recruiting agency for the Government of India civil, defence, and engineering services.',
    totalExamsCount: 18
  },
  ssc: {
    id: 'ssc',
    name: 'Staff Selection Commission',
    shortName: 'SSC',
    slug: 'ssc',
    stateId: 'central',
    category: 'Central Staff Recruitment',
    website: 'https://ssc.gov.in',
    description: 'Recruiting organization for Group B & Group C non-technical and technical posts in Government ministries.',
    totalExamsCount: 16
  },
  rrb: {
    id: 'rrb',
    name: 'Railway Recruitment Control Board',
    shortName: 'RRB / RRC',
    slug: 'rrb',
    stateId: 'central',
    category: 'Railway Recruitment Agency',
    website: 'https://indianrailways.gov.in',
    description: 'Apex selection board for Indian Railways executive, technical, loco pilot, and safety categories.',
    totalExamsCount: 14
  },
  ibps: {
    id: 'ibps',
    name: 'Institute of Banking Personnel Selection',
    shortName: 'IBPS',
    slug: 'ibps',
    stateId: 'central',
    category: 'Autonomous Banking Selection Body',
    website: 'https://ibps.in',
    description: 'National recruitment body conducting common selection tests for 11+ Public Sector Banks and 43+ RRBs.',
    totalExamsCount: 15
  },
  sbi: {
    id: 'sbi',
    name: 'State Bank of India Recruitment Board',
    shortName: 'SBI',
    slug: 'sbi',
    stateId: 'central',
    category: 'Public Sector Banking Leader',
    website: 'https://sbi.co.in/careers',
    description: 'Recruitment division for India’s largest commercial bank (Probationary Officers, Clerks, Specialist Cadres).',
    totalExamsCount: 10
  },
  rbi: {
    id: 'rbi',
    name: 'Reserve Bank of India Services Board',
    shortName: 'RBI',
    slug: 'rbi',
    stateId: 'central',
    category: 'Central Banking Regulatory Board',
    website: 'https://rbi.org.in',
    description: 'Apex selection board for India’s central bank, conducting Grade B Officer and Assistant examinations.',
    totalExamsCount: 8
  },
  nta: {
    id: 'nta',
    name: 'National Testing Agency',
    shortName: 'NTA',
    slug: 'nta',
    stateId: 'central',
    category: 'Autonomous National Assessment Agency',
    website: 'https://nta.ac.in',
    description: 'Premier national testing organization for NEET UG, JEE Main, CUET UG/PG, UGC NET, and CMAT.',
    totalExamsCount: 20
  },
  aiims: {
    id: 'aiims',
    name: 'All India Institute of Medical Sciences Examination Section',
    shortName: 'AIIMS Exams',
    slug: 'aiims',
    stateId: 'central',
    category: 'Premier National Medical Authority',
    website: 'https://aiimsexams.ac.in',
    description: 'Apex medical institute conducting Nursing Officer Recruitment Common Eligibility Test (NORCET) & INI-CET.',
    totalExamsCount: 12
  },
  osssc: {
    id: 'osssc',
    name: 'Odisha Sub-Ordinate Staff Selection Commission',
    shortName: 'OSSSC',
    slug: 'osssc',
    stateId: 'odisha',
    category: 'State Sub-Ordinate Selection Board',
    website: 'https://osssc.gov.in',
    description: 'State statutory body for recruiting Nursing Officers, Pharmacists, RI, AMIN, and Multipurpose Health Workers in Odisha.',
    totalExamsCount: 14
  },
  opsc: {
    id: 'opsc',
    name: 'Odisha Public Service Commission',
    shortName: 'OPSC',
    slug: 'opsc',
    stateId: 'odisha',
    category: 'State Public Service Commission',
    website: 'https://opsc.gov.in',
    description: 'Constitutional recruiting body for Odisha Administrative Service (OAS), Police Service (OPS), Medical Officers & Lecturers.',
    totalExamsCount: 12
  },
  'bse-odisha': {
    id: 'bse-odisha',
    name: 'Board of Secondary Education, Odisha',
    shortName: 'BSE Odisha',
    slug: 'bse-odisha',
    stateId: 'odisha',
    category: 'State School Education Board',
    website: 'https://bseodisha.ac.in',
    description: 'Official board administering High School Certificate (HSC Class 10) Examination, OTET, and OSSTET in Odisha.',
    totalExamsCount: 10
  },
  cbse: {
    id: 'cbse',
    name: 'Central Board of Secondary Education',
    shortName: 'CBSE',
    slug: 'cbse',
    stateId: 'central',
    category: 'National School Education Board',
    website: 'https://cbse.gov.in',
    description: 'Apex national board governing Class 1 to 12 curricula, AISSE Class 10, AISSCE Class 12, and CTET.',
    totalExamsCount: 24
  },
  cisce: {
    id: 'cisce',
    name: 'Council for the Indian School Certificate Examinations',
    shortName: 'CISCE / ICSE',
    slug: 'cisce',
    stateId: 'central',
    category: 'National Private Education Board',
    website: 'https://cisce.org',
    description: 'Premier national educational council conducting ICSE (Class 10) and ISC (Class 12) examinations.',
    totalExamsCount: 16
  },
  bpsc: {
    id: 'bpsc',
    name: 'Bihar Public Service Commission',
    shortName: 'BPSC',
    slug: 'bpsc',
    stateId: 'bihar',
    category: 'State Public Service Commission',
    website: 'https://bpsc.bih.nic.in',
    description: 'Constitutional state body conducting Combined Competitive Exam (CCE) and Teacher Recruitment Exam (TRE) in Bihar.',
    totalExamsCount: 15
  },
  uppsc: {
    id: 'uppsc',
    name: 'Uttar Pradesh Public Service Commission',
    shortName: 'UPPSC',
    slug: 'uppsc',
    stateId: 'uttar-pradesh',
    category: 'State Public Service Commission',
    website: 'https://uppsc.up.nic.in',
    description: 'State constitutional authority conducting Combined State / Upper Subordinate Exam (PCS) and RO/ARO.',
    totalExamsCount: 16
  },
  mpsc: {
    id: 'mpsc',
    name: 'Maharashtra Public Service Commission',
    shortName: 'MPSC',
    slug: 'mpsc',
    stateId: 'maharashtra',
    category: 'State Public Service Commission',
    website: 'https://mpsc.gov.in',
    description: 'State body conducting Maharashtra Civil Services, Rajyaseva, Police Sub-Inspector, and Sales Tax Inspector exams.',
    totalExamsCount: 14
  },
  rpsc: {
    id: 'rpsc',
    name: 'Rajasthan Public Service Commission',
    shortName: 'RPSC',
    slug: 'rpsc',
    stateId: 'rajasthan',
    category: 'State Public Service Commission',
    website: 'https://rpsc.rajasthan.gov.in',
    description: 'State recruitment commission conducting Rajasthan Administrative Services (RAS/RTS), REET, and Grade 1/2/3 Teachers.',
    totalExamsCount: 14
  },
  'police-odisha': {
    id: 'police-odisha',
    name: 'State Police Recruitment Board, Odisha',
    shortName: 'Odisha Police',
    slug: 'police-odisha',
    stateId: 'odisha',
    category: 'State Police Selection Board',
    website: 'https://odishapolice.gov.in',
    description: 'Recruitment authority for Odisha Police Sub-Inspectors, Constables, and Armed Police Battalions (OSAP/IRB).',
    totalExamsCount: 8
  },
  'police-delhi': {
    id: 'police-delhi',
    name: 'Delhi Police Recruitment Cell',
    shortName: 'Delhi Police',
    slug: 'police-delhi',
    stateId: 'delhi',
    category: 'Metropolitan Police Recruitment',
    website: 'https://delhipolice.gov.in',
    description: 'Recruiting division for Executive Constables, Head Constables (AWO/TPO), and Sub-Inspectors.',
    totalExamsCount: 8
  },
  'iit-consortium': {
    id: 'iit-consortium',
    name: 'Consortium of Indian Institutes of Technology',
    shortName: 'IITs / JAB',
    slug: 'iit-consortium',
    stateId: 'central',
    category: 'Premier Engineering Consortium',
    website: 'https://jeeadv.ac.in',
    description: 'Organizing committee conducting JEE Advanced and Graduate Aptitude Test in Engineering (GATE).',
    totalExamsCount: 12
  },
  'nlu-consortium': {
    id: 'nlu-consortium',
    name: 'Consortium of National Law Universities',
    shortName: 'Consortium of NLUs',
    slug: 'nlu-consortium',
    stateId: 'central',
    category: 'National Law Entrance Authority',
    website: 'https://consortiumofnlus.ac.in',
    description: 'Apex body conducting Common Law Admission Test (CLAT UG & CLAT PG) for 24+ National Law Universities.',
    totalExamsCount: 6
  }
};

// 4. MASTER EXAMS MAP
export const KG_EXAMS_MAP: Record<string, KGExamNode> = {
  'upsc-cse': {
    id: 'upsc-cse',
    name: 'UPSC Civil Services Examination',
    nameHindi: 'संघ लोक सेवा आयोग सिविल सेवा परीक्षा',
    shortName: 'CSE',
    code: 'UPSC-CSE',
    slug: 'upsc-civil-services',
    authorityId: 'upsc',
    stateId: 'central',
    category: 'upsc_civil',
    frequency: 'Annually (May-June)',
    eligibility: 'Graduate Degree in any discipline (Min age 21 years)',
    defaultStages: ['prelims', 'mains', 'interview'],
    totalMarksPattern: 'Prelims: 400 Marks (Paper 1 + CSAT) | Mains: 1750 Marks | Interview: 275 Marks',
    negativeMarking: '0.33 (1/3rd deduction for wrong response)',
    overview: 'India’s premier competitive examination selecting officers for IAS, IPS, IFS, IRS, and Central Group A & B services.',
    syllabusHighlights: ['Indian Polity & Constitution', 'Modern Indian History & Culture', 'Geography & Environment', 'Economic Development', 'CSAT Quantitative & Reasoning']
  },
  'ssc-cgl': {
    id: 'ssc-cgl',
    name: 'SSC Combined Graduate Level Examination',
    nameHindi: 'कर्मचारी चयन आयोग संयुक्त स्नातक स्तरीय परीक्षा',
    shortName: 'SSC CGL',
    code: 'SSC-CGL',
    slug: 'ssc-combined-graduate-level',
    authorityId: 'ssc',
    stateId: 'central',
    category: 'ssc_graduate_12th',
    frequency: 'Annually',
    eligibility: 'Bachelor’s Degree from a recognised university',
    defaultStages: ['tier-1', 'tier-2'],
    totalMarksPattern: 'Tier-1: 200 Marks (100 Qs) | Tier-2: 390 Marks (130 Qs)',
    negativeMarking: 'Tier-1: 0.50 Marks | Tier-2: 1.00 Mark per wrong response',
    overview: 'Flagship national examination recruiting Assistant Section Officers, Inspectors (Income Tax/Excise), and Sub-Inspectors (CBI).',
    syllabusHighlights: ['Quantitative Aptitude & Advanced Maths', 'General Intelligence & Reasoning', 'English Comprehension', 'General Awareness', 'Computer Knowledge & Typing']
  },
  'rrb-ntpc': {
    id: 'rrb-ntpc',
    name: 'RRB Non-Technical Popular Categories',
    nameHindi: 'रेलवे भर्ती बोर्ड गैर-तकनीकी लोकप्रिय श्रेणियां',
    shortName: 'RRB NTPC',
    code: 'RRB-NTPC',
    slug: 'rrb-ntpc-recruitment',
    authorityId: 'rrb',
    stateId: 'central',
    category: 'railway_rrb',
    frequency: 'Periodic Recruitment Cycle',
    eligibility: '12th Pass (Undergraduate posts) or Bachelor’s Degree (Graduate posts)',
    defaultStages: ['cbt-1', 'cbt-2'],
    totalMarksPattern: 'CBT-1: 100 Marks (100 Qs, 90 mins) | CBT-2: 120 Marks (120 Qs, 90 mins)',
    negativeMarking: '1/3rd (0.33) deduction per wrong answer',
    overview: 'Massive recruitment examination for Station Masters, Goods Guards, Commercial Apprentices, and Senior Clerks across Indian Railways.',
    syllabusHighlights: ['General Awareness & Current Affairs', 'Mathematics & Arithmetic', 'General Intelligence & Reasoning']
  },
  'ibps-po': {
    id: 'ibps-po',
    name: 'IBPS Probationary Officer / Management Trainee',
    nameHindi: 'आईबीपीएस प्रोबेशनरी ऑफिसर',
    shortName: 'IBPS PO',
    code: 'IBPS-PO',
    slug: 'ibps-probationary-officer',
    authorityId: 'ibps',
    stateId: 'central',
    category: 'banking_ibps',
    frequency: 'Annually (Oct-Nov)',
    eligibility: 'Graduation in any discipline from recognised university',
    defaultStages: ['prelims', 'mains', 'interview'],
    totalMarksPattern: 'Prelims: 100 Marks (100 Qs, 60 mins) | Mains: 225 Marks (including Descriptive)',
    negativeMarking: '0.25 (1/4th deduction for incorrect choice)',
    overview: 'Common written examination for appointment as Probationary Officers across 11 nationalized public sector banks.',
    syllabusHighlights: ['Data Analysis & Quantitative Aptitude', 'Reasoning & Computer Aptitude', 'English Language', 'Banking & Financial Awareness']
  },
  'aiims-norcet': {
    id: 'aiims-norcet',
    name: 'AIIMS Nursing Officer Recruitment Common Eligibility Test (NORCET)',
    nameHindi: 'एम्स नर्सिंग ऑफिसर भर्ती परीक्षा (नॉरसेट)',
    shortName: 'AIIMS NORCET',
    code: 'AIIMS-NORCET',
    slug: 'aiims-norcet-nursing-officer',
    authorityId: 'aiims',
    stateId: 'central',
    category: 'nursing',
    frequency: 'Bi-annually (April & September)',
    eligibility: 'B.Sc. (Hons.) Nursing / B.Sc. Nursing or GNM with 2 years clinical hospital experience',
    defaultStages: ['prelims', 'mains'],
    totalMarksPattern: 'Stage 1: 100 MCQs (100 Marks, 90 mins) | Stage 2: 100 Case-scenario MCQs (100 Marks, 90 mins)',
    negativeMarking: '1/3rd (0.33) marks per wrong response',
    overview: 'Apex national recruitment examination for Nursing Officer (Group B) positions in AIIMS New Delhi and all 20+ AIIMS institutions across India.',
    syllabusHighlights: ['Medical-Surgical Nursing', 'Obstetrics & Gynaecological Nursing', 'Pediatric Nursing & Neonatology', 'Community Health Nursing', 'Pharmacology & Fundamentals']
  },
  'osssc-nursing': {
    id: 'osssc-nursing',
    name: 'OSSSC Nursing Officer Recruitment Examination',
    nameHindi: 'ओडिशा नर्सिंग ऑफिसर भर्ती परीक्षा',
    nameRegional: 'ଓଡ଼ିଶା ନର୍ସିଂ ଅଫିସର ନିଯୁକ୍ତି ପରୀକ୍ଷା',
    shortName: 'OSSSC Nursing',
    code: 'OSSSC-NO',
    slug: 'osssc-nursing-officer',
    authorityId: 'osssc',
    stateId: 'odisha',
    category: 'nursing',
    frequency: 'Annual State Recruitment',
    eligibility: 'B.Sc Nursing or GNM from recognised institution with ONMRC Registration',
    defaultStages: ['single-stage'],
    totalMarksPattern: '100 Questions (100 Marks, 120 minutes duration)',
    negativeMarking: '0.25 (1/4th deduction per wrong answer)',
    overview: 'Odisha state recruitment for Staff Nursing Officers in all government Medical College Hospitals and District Headquarters Hospitals.',
    syllabusHighlights: ['Nursing Subjects & Clinical Practice', 'Practical & Skill Based Questions', 'Basic English & Arithmetic']
  },
  'bse-odisha-10th': {
    id: 'bse-odisha-10th',
    name: 'BSE Odisha High School Certificate (HSC Class 10) Examination',
    nameHindi: 'बीएसई ओडिशा 10वीं बोर्ड परीक्षा',
    nameRegional: 'ଓଡ଼ିଶା ମାଧ୍ୟମିକ ଶିକ୍ଷା ପରିଷଦ ଦଶମ ଶ୍ରେଣୀ ବୋର୍ଡ ପରୀକ୍ଷା (HSC)',
    shortName: 'BSE 10th',
    code: 'BSE-OD-10',
    slug: 'bse-odisha-class-10-board',
    authorityId: 'bse-odisha',
    stateId: 'odisha',
    category: 'school_boards',
    frequency: 'Annual Board Exam (Feb-March)',
    eligibility: 'Class 10 enrolled students under BSE Odisha syllabus',
    defaultStages: ['annual-board'],
    totalMarksPattern: '80 Marks per subject (50 Objective MCQs in OMR + 30 Subjective)',
    negativeMarking: 'No Negative Marking for Board Exams',
    overview: 'Official state matriculation examination conducted by the Board of Secondary Education, Odisha for Class 10 students.',
    syllabusHighlights: ['MTH (Mathematics & Geometry)', 'GSC (Physical & Life Science)', 'SSC (History, Civics & Geography)', 'FLO (First Language Odia)', 'SLE (Second Language English)']
  },
  'cbse-class-10': {
    id: 'cbse-class-10',
    name: 'CBSE Class 10 All-India Secondary School Examination (AISSE)',
    nameHindi: 'सीबीएसई 10वीं बोर्ड परीक्षा',
    shortName: 'CBSE 10th',
    code: 'CBSE-10',
    slug: 'cbse-class-10-board',
    authorityId: 'cbse',
    stateId: 'central',
    category: 'school_boards',
    frequency: 'Annual Board Exam (Feb-March)',
    eligibility: 'Class 10 students in CBSE affiliated schools',
    defaultStages: ['annual-board'],
    totalMarksPattern: '80 Marks Theory + 20 Marks Internal Assessment',
    negativeMarking: 'No Negative Marking',
    overview: 'National standard Class 10 board examination for all CBSE schools covering science, maths, social sciences, and languages.',
    syllabusHighlights: ['Mathematics Standard/Basic', 'Science (Physics, Chemistry, Biology)', 'Social Science', 'English Language & Literature']
  },
  'neet-ug': {
    id: 'neet-ug',
    name: 'National Eligibility cum Entrance Test (NEET UG)',
    nameHindi: 'राष्ट्रीय पात्रता सह प्रवेश परीक्षा (नीट यूजी)',
    shortName: 'NEET UG',
    code: 'NEET-UG',
    slug: 'neet-ug-medical-entrance',
    authorityId: 'nta',
    stateId: 'central',
    category: 'entrance_exams',
    frequency: 'Annually (First Sunday of May)',
    eligibility: '10+2 with Physics, Chemistry, Biology/Biotechnology and English',
    defaultStages: ['single-stage'],
    totalMarksPattern: '720 Marks (180 Questions to attempt out of 200, 200 minutes)',
    negativeMarking: '+4 for correct, -1 for incorrect answer',
    overview: 'Sole all-India entrance examination for admission into undergraduate medical (MBBS), dental (BDS), AYUSH, and B.Sc Nursing programs.',
    syllabusHighlights: ['Botany & Zoology (360 Marks)', 'Physics (180 Marks)', 'Chemistry (180 Marks)']
  },
  'jee-main': {
    id: 'jee-main',
    name: 'Joint Entrance Examination (JEE Main)',
    nameHindi: 'संयुक्त प्रवेश परीक्षा (जेईई मेन)',
    shortName: 'JEE Main',
    code: 'JEE-MAIN',
    slug: 'jee-main-engineering-entrance',
    authorityId: 'nta',
    stateId: 'central',
    category: 'entrance_exams',
    frequency: 'Two Sessions (January & April)',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/Technical Vocational Subject',
    defaultStages: ['single-stage'],
    totalMarksPattern: '300 Marks (75 Questions: 20 MCQs + 5 NVQs per subject)',
    negativeMarking: '+4 for correct, -1 for incorrect answer (both MCQs & NVQs)',
    overview: 'Premier national computer-based engineering entrance exam for admissions to NITs, IIITs, CFTIs, and qualifying for JEE Advanced.',
    syllabusHighlights: ['Mathematics (Algebra, Calculus, Coordinate)', 'Physics (Mechanics, Electromagnetism, Modern Physics)', 'Chemistry (Physical, Organic, Inorganic)']
  },
  'clat-ug': {
    id: 'clat-ug',
    name: 'Common Law Admission Test (CLAT UG)',
    nameHindi: 'कॉमन लॉ एडमिशन टेस्ट',
    shortName: 'CLAT',
    code: 'CLAT-UG',
    slug: 'clat-law-admission-test',
    authorityId: 'nlu-consortium',
    stateId: 'central',
    category: 'entrance_exams',
    frequency: 'Annually (December)',
    eligibility: '10+2 or equivalent with 45% marks (40% for SC/ST)',
    defaultStages: ['single-stage'],
    totalMarksPattern: '120 Questions (120 Marks, 120 minutes)',
    negativeMarking: '+1 for correct, -0.25 for incorrect answer',
    overview: 'National centralized entrance examination for admissions to 5-year integrated LL.B. degree courses across 24 NLUs.',
    syllabusHighlights: ['Legal Reasoning & Case Scenarios', 'Current Affairs including GK', 'Logical Reasoning', 'English Comprehension', 'Quantitative Techniques']
  },
  'ctet-paper-1-2': {
    id: 'ctet-paper-1-2',
    name: 'Central Teacher Eligibility Test (CTET)',
    nameHindi: 'केंद्रीय शिक्षक पात्रता परीक्षा',
    shortName: 'CTET',
    code: 'CTET',
    slug: 'central-teacher-eligibility-test',
    authorityId: 'cbse',
    stateId: 'central',
    category: 'competitive_central',
    frequency: 'Bi-annually (January & July)',
    eligibility: 'Senior Secondary with D.El.Ed / B.El.Ed or Graduation with B.Ed',
    defaultStages: ['paper-1', 'paper-2'],
    totalMarksPattern: '150 MCQs (150 Marks, 150 minutes duration)',
    negativeMarking: 'No Negative Marking',
    overview: 'Mandatory national benchmark examination for teacher recruitment in Central Government Schools (KVS, NVS, Army Schools).',
    syllabusHighlights: ['Child Development and Pedagogy', 'Mathematics & Environmental Studies', 'Language I & Language II']
  },
  'opsc-oas': {
    id: 'opsc-oas',
    name: 'Odisha Civil Services (OCS / OAS)',
    nameHindi: 'ओडिशा सिविल सेवा परीक्षा',
    nameRegional: 'ଓଡ଼ିଶା ପ୍ରଶାସନିକ ସେବା ପରୀକ୍ଷା (OAS / OPS / OFS)',
    shortName: 'OPSC OAS',
    code: 'OPSC-OCS',
    slug: 'opsc-odisha-civil-services',
    authorityId: 'opsc',
    stateId: 'odisha',
    category: 'competitive_state',
    frequency: 'Annual State Civil Service',
    eligibility: 'Bachelor’s Degree with ability to read, write and speak Odia (Passed ME School standard in Odia)',
    defaultStages: ['prelims', 'mains', 'interview'],
    totalMarksPattern: 'Prelims: 400 Marks (Paper 1 + Paper 2) | Mains: 1750 Marks',
    negativeMarking: '1/3rd (0.33) marks deduction in Prelims',
    overview: 'Premier state administrative examination selecting Odisha Administrative Service (OAS), Police Service (OPS), and Finance Service (OFS) cadre officers.',
    syllabusHighlights: ['Odisha History, Art, Culture & Heritage', 'Indian Polity & Governance', 'Odisha Geography & Natural Resources', 'Economic & Social Development', 'CSAT & Odia Comprehension']
  }
};

// 5. STAGES REGISTRY
export const KG_STAGES_MAP: Record<string, KGStageNode> = {
  prelims: {
    id: 'prelims',
    name: 'Prelims Examination (Stage 1 Screening)',
    slug: 'prelims',
    type: 'prelims',
    description: 'First screening phase consisting of objective multiple choice questions.',
    defaultDurationMinutes: 120,
    defaultQuestionsCount: 100
  },
  'tier-1': {
    id: 'tier-1',
    name: 'Tier-1 Computer Based Examination',
    slug: 'tier-1',
    type: 'tier_1',
    description: 'First tier national computer based testing phase with negative marking.',
    defaultDurationMinutes: 60,
    defaultQuestionsCount: 100
  },
  'tier-2': {
    id: 'tier-2',
    name: 'Tier-2 Mains Computer Based Examination',
    slug: 'tier-2',
    type: 'tier_2',
    description: 'Advanced merit decisive computer based testing phase.',
    defaultDurationMinutes: 135,
    defaultQuestionsCount: 130
  },
  'cbt-1': {
    id: 'cbt-1',
    name: 'CBT Stage-1 Examination',
    slug: 'cbt-1',
    type: 'cbt_1',
    description: 'Initial computer based screening test.',
    defaultDurationMinutes: 90,
    defaultQuestionsCount: 100
  },
  'cbt-2': {
    id: 'cbt-2',
    name: 'CBT Stage-2 Examination',
    slug: 'cbt-2',
    type: 'cbt_2',
    description: 'Second round computer based test for shortlisted candidates.',
    defaultDurationMinutes: 90,
    defaultQuestionsCount: 120
  },
  mains: {
    id: 'mains',
    name: 'Mains Examination',
    slug: 'mains',
    type: 'mains',
    description: 'Comprehensive written / clinical scenario evaluation phase.',
    defaultDurationMinutes: 180,
    defaultQuestionsCount: 100
  },
  'single-stage': {
    id: 'single-stage',
    name: 'Single-Stage All-India CBT',
    slug: 'single-stage',
    type: 'single_stage',
    description: 'Single direct merit-ranking computer based examination.',
    defaultDurationMinutes: 120,
    defaultQuestionsCount: 100
  },
  'paper-1': {
    id: 'paper-1',
    name: 'Paper-I (Primary Level / Shift 1)',
    slug: 'paper-1',
    type: 'single_stage',
    description: 'Primary stage examination paper.',
    defaultDurationMinutes: 150,
    defaultQuestionsCount: 150
  },
  'paper-2': {
    id: 'paper-2',
    name: 'Paper-II (Upper Primary / Shift 2)',
    slug: 'paper-2',
    type: 'single_stage',
    description: 'Upper primary / specialization paper.',
    defaultDurationMinutes: 150,
    defaultQuestionsCount: 150
  },
  'annual-board': {
    id: 'annual-board',
    name: 'Annual Board Examination Model Paper',
    slug: 'annual-board',
    type: 'single_stage',
    description: 'Official board format mock examination with both objective OMR and theoretical patterns.',
    defaultDurationMinutes: 150,
    defaultQuestionsCount: 50
  }
};

// 6. SUBJECTS REGISTRY
export const KG_SUBJECTS_MAP: Record<string, KGSubjectNode> = {
  'gs-paper-1': {
    id: 'gs-paper-1',
    name: 'General Studies Paper-I',
    slug: 'gs-paper-1',
    category: 'General Studies',
    description: 'Indian Polity, History, Geography, Economy, Ecology and Current Events.'
  },
  csat: {
    id: 'csat',
    name: 'Civil Services Aptitude Test (CSAT)',
    slug: 'csat',
    category: 'Aptitude',
    description: 'Comprehension, Interpersonal Skills, Logical Reasoning, and Basic Numeracy.'
  },
  'clinical-nursing': {
    id: 'clinical-nursing',
    name: 'Clinical Nursing & Medical Sciences',
    slug: 'clinical-nursing',
    category: 'Nursing',
    description: 'Core Medical-Surgical, OBG, Pediatric, Psychiatric and Community Health Nursing.'
  },
  'quantitative-aptitude': {
    id: 'quantitative-aptitude',
    name: 'Quantitative Aptitude & Mathematics',
    slug: 'quantitative-aptitude',
    category: 'Mathematics',
    description: 'Arithmetic, Advanced Mathematics, Geometry, Mensuration, and Data Interpretation.'
  },
  reasoning: {
    id: 'reasoning',
    name: 'General Intelligence & Reasoning',
    slug: 'reasoning',
    category: 'Reasoning',
    description: 'Verbal, Non-Verbal, Analytical, Puzzles, and Critical Thinking.'
  },
  'english-language': {
    id: 'english-language',
    name: 'English Language & Comprehension',
    slug: 'english-language',
    category: 'Languages',
    description: 'Grammar, Vocabulary, Reading Comprehension, Error Spotting, and Sentence Rearrangement.'
  },
  'general-awareness': {
    id: 'general-awareness',
    name: 'General Awareness & Current Affairs',
    slug: 'general-awareness',
    category: 'General Knowledge',
    description: 'National and International Current Affairs, Static GK, and Government Schemes.'
  },
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    slug: 'mathematics',
    category: 'School & Engineering',
    description: 'Algebra, Trigonometry, Calculus, Coordinate Geometry, and Probability.'
  },
  science: {
    id: 'science',
    name: 'General Science',
    slug: 'science',
    category: 'School Science',
    description: 'Physics, Chemistry, Life Sciences, and Everyday Scientific Discoveries.'
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    slug: 'physics',
    category: 'Physical Sciences',
    description: 'Mechanics, Thermodynamics, Electromagnetism, Optics, and Modern Physics.'
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    slug: 'chemistry',
    category: 'Chemical Sciences',
    description: 'Physical, Inorganic, and Organic Chemistry.'
  },
  biology: {
    id: 'biology',
    name: 'Biology (Botany & Zoology)',
    slug: 'biology',
    category: 'Life Sciences',
    description: 'Genetics, Physiology, Ecology, Cell Biology, and Human Anatomy.'
  },
  'odia-language': {
    id: 'odia-language',
    name: 'First Language Odia (FLO) & Sahitya',
    slug: 'odia-language',
    category: 'Regional Languages',
    description: 'Odia Byakarana (Grammar), Gadya, Padya, and Comprehension.'
  },
  'social-science': {
    id: 'social-science',
    name: 'Social Science (History, Civics & Geography)',
    slug: 'social-science',
    category: 'Social Studies',
    description: 'Indian Freedom Movement, World History, Indian Constitution, and Regional Geography.'
  },
  'legal-reasoning': {
    id: 'legal-reasoning',
    name: 'Legal Reasoning & Constitutional Law',
    slug: 'legal-reasoning',
    category: 'Law',
    description: 'Legal Propositions, Case Analysis, Constitutional Principles, and Torts/Contracts/Criminal Law.'
  },
  'child-pedagogy': {
    id: 'child-pedagogy',
    name: 'Child Development and Pedagogy',
    slug: 'child-pedagogy',
    category: 'Education & Teaching',
    description: 'Educational Psychology, Learning Theories, Inclusive Education, and Curriculum Planning.'
  }
};

// ==========================================
// 7. KNOWLEDGE GRAPH RESOLVER ENGINE
// ==========================================

export function resolveKGLineage(test: Partial<MockTest>): ExamKnowledgeGraphLineage {
  const country = KG_COUNTRY_INDIA;

  // 1. Resolve State
  let stateKey = 'central';
  const testStateLower = (test.state || '').toLowerCase();
  if (testStateLower.includes('odisha')) stateKey = 'odisha';
  else if (testStateLower.includes('uttar pradesh') || testStateLower.includes('up')) stateKey = 'uttar-pradesh';
  else if (testStateLower.includes('bihar')) stateKey = 'bihar';
  else if (testStateLower.includes('maharashtra')) stateKey = 'maharashtra';
  else if (testStateLower.includes('rajasthan')) stateKey = 'rajasthan';
  else if (testStateLower.includes('delhi')) stateKey = 'delhi';
  else if (testStateLower.includes('bengal')) stateKey = 'west-bengal';
  else if (testStateLower.includes('tamil')) stateKey = 'tamil-nadu';
  else if (testStateLower.includes('karnataka')) stateKey = 'karnataka';
  else if (testStateLower.includes('andhra')) stateKey = 'andhra-pradesh';
  else if (testStateLower.includes('telangana')) stateKey = 'telangana';
  else if (testStateLower.includes('kerala')) stateKey = 'kerala';
  else if (testStateLower.includes('madhya')) stateKey = 'madhya-pradesh';
  else if (testStateLower.includes('gujarat')) stateKey = 'gujarat';
  else if (testStateLower.includes('punjab')) stateKey = 'punjab';
  else if (testStateLower.includes('haryana')) stateKey = 'haryana';

  const stateNode = KG_STATES_MAP[stateKey] || KG_STATES_MAP.central;

  // 2. Resolve Authority
  let authorityKey = 'upsc';
  const boardLower = (test.board || test.conductingAuthority || test.title || '').toLowerCase();
  const subCat = (test.subCategory || '').toLowerCase();
  const targetLower = (test.targetExam || '').toLowerCase();

  if (boardLower.includes('osssc') || subCat.includes('osssc')) authorityKey = 'osssc';
  else if (boardLower.includes('opsc') || subCat.includes('opsc')) authorityKey = 'opsc';
  else if (boardLower.includes('bse odisha') || boardLower.includes('bse_odisha') || subCat.includes('bse_odisha')) authorityKey = 'bse-odisha';
  else if (boardLower.includes('aiims') || subCat.includes('norcet') || subCat.includes('aiims')) authorityKey = 'aiims';
  else if (boardLower.includes('ssc') || subCat.startsWith('ssc_')) authorityKey = 'ssc';
  else if (boardLower.includes('rrb') || subCat.startsWith('rrb_')) authorityKey = 'rrb';
  else if (boardLower.includes('ibps') || subCat.startsWith('ibps_')) authorityKey = 'ibps';
  else if (boardLower.includes('sbi') || subCat.startsWith('sbi_')) authorityKey = 'sbi';
  else if (boardLower.includes('rbi') || subCat.startsWith('rbi_')) authorityKey = 'rbi';
  else if (boardLower.includes('cbse') || subCat.includes('cbse')) authorityKey = 'cbse';
  else if (boardLower.includes('icse') || boardLower.includes('cisce') || subCat.includes('icse')) authorityKey = 'cisce';
  else if (boardLower.includes('nta') || subCat.includes('neet') || subCat.includes('jee') || subCat.includes('cuet')) authorityKey = 'nta';
  else if (boardLower.includes('bpsc') || subCat.includes('bpsc')) authorityKey = 'bpsc';
  else if (boardLower.includes('uppsc') || subCat.includes('uppsc')) authorityKey = 'uppsc';
  else if (boardLower.includes('mpsc') || subCat.includes('mpsc')) authorityKey = 'mpsc';
  else if (boardLower.includes('rpsc') || subCat.includes('rpsc')) authorityKey = 'rpsc';
  else if (boardLower.includes('police') && stateKey === 'odisha') authorityKey = 'police-odisha';
  else if (boardLower.includes('police') && stateKey === 'delhi') authorityKey = 'police-delhi';
  else if (boardLower.includes('clat') || subCat.includes('clat')) authorityKey = 'nlu-consortium';
  else if (boardLower.includes('gate') || subCat.includes('gate')) authorityKey = 'iit-consortium';

  const authorityNode = KG_AUTHORITIES_MAP[authorityKey] || {
    id: authorityKey,
    name: test.conductingAuthority || test.board || 'All-India Examination Authority',
    shortName: test.board || 'Authority',
    slug: authorityKey,
    stateId: stateNode.id,
    category: 'Examination Board'
  };

  // 3. Resolve Exam Node
  let examKey = 'upsc-cse';
  if (subCat.includes('norcet') || targetLower.includes('norcet') || targetLower.includes('aiims')) examKey = 'aiims-norcet';
  else if (subCat.includes('osssc_nursing') || targetLower.includes('osssc nursing')) examKey = 'osssc-nursing';
  else if (subCat.includes('cgl') || targetLower.includes('cgl')) examKey = 'ssc-cgl';
  else if (subCat.includes('ntpc') || targetLower.includes('ntpc')) examKey = 'rrb-ntpc';
  else if (subCat.includes('ibps_po') || targetLower.includes('ibps po')) examKey = 'ibps-po';
  else if (subCat.includes('bse_odisha') || targetLower.includes('odisha 10th') || targetLower.includes('bse')) examKey = 'bse-odisha-10th';
  else if (subCat.includes('cbse_class_10') || targetLower.includes('cbse 10')) examKey = 'cbse-class-10';
  else if (subCat.includes('neet') || targetLower.includes('neet')) examKey = 'neet-ug';
  else if (subCat.includes('jee') || targetLower.includes('jee')) examKey = 'jee-main';
  else if (subCat.includes('clat') || targetLower.includes('clat')) examKey = 'clat-ug';
  else if (subCat.includes('ctet') || targetLower.includes('ctet')) examKey = 'ctet-paper-1-2';
  else if (subCat.includes('opsc') || targetLower.includes('oas') || targetLower.includes('opsc')) examKey = 'opsc-oas';

  const examNode = KG_EXAMS_MAP[examKey] || {
    id: examKey,
    name: test.targetExam || test.title || 'National Mock Examination',
    shortName: test.targetExam || 'Exam',
    code: (test.targetExam || 'EXAM').toUpperCase().replace(/\s+/g, '-'),
    slug: test.slug || examKey,
    authorityId: authorityNode.id,
    stateId: stateNode.id,
    category: test.mainCategory || 'competitive_central',
    frequency: 'Annual',
    eligibility: 'Standard Educational Requirements',
    defaultStages: ['prelims'],
    totalMarksPattern: `${test.totalMarks || 100} Marks`,
    negativeMarking: '0.25 - 0.33 per wrong response',
    overview: test.shortDescription || 'Standard computerized examination.',
    syllabusHighlights: ['Core Curriculum', 'Aptitude', 'General Awareness']
  };

  // 4. Resolve Stage Node
  let stageKey = 'single-stage';
  const stageType = test.examStage;
  if (stageType === 'tier_1') stageKey = 'tier-1';
  else if (stageType === 'tier_2') stageKey = 'tier-2';
  else if (stageType === 'cbt_1') stageKey = 'cbt-1';
  else if (stageType === 'cbt_2') stageKey = 'cbt-2';
  else if (stageType === 'prelims') stageKey = 'prelims';
  else if (stageType === 'mains') stageKey = 'mains';
  else if (test.mainCategory === 'school_boards') stageKey = 'annual-board';

  const stageNode = KG_STAGES_MAP[stageKey] || KG_STAGES_MAP['single-stage'];

  // 5. Resolve Subject Node
  let subjectNode: KGSubjectNode | undefined = undefined;
  const titleLower = (test.title || '').toLowerCase();
  if (titleLower.includes('nursing') || titleLower.includes('clinical') || test.mainCategory === 'nursing') {
    subjectNode = KG_SUBJECTS_MAP['clinical-nursing'];
  } else if (titleLower.includes('math') || titleLower.includes('geometry') || titleLower.includes('algebra')) {
    subjectNode = KG_SUBJECTS_MAP['mathematics'];
  } else if (titleLower.includes('science') || titleLower.includes('physics') || titleLower.includes('chemistry')) {
    subjectNode = KG_SUBJECTS_MAP['science'];
  } else if (titleLower.includes('odia')) {
    subjectNode = KG_SUBJECTS_MAP['odia-language'];
  } else if (titleLower.includes('social') || titleLower.includes('history') || titleLower.includes('geography')) {
    subjectNode = KG_SUBJECTS_MAP['social-science'];
  } else if (titleLower.includes('gs') || titleLower.includes('general studies')) {
    subjectNode = KG_SUBJECTS_MAP['gs-paper-1'];
  } else if (titleLower.includes('csat') || titleLower.includes('reasoning')) {
    subjectNode = KG_SUBJECTS_MAP['csat'];
  }

  // 6. Build Canonical Path
  // Format: /exams/india/{stateSlug}/{authoritySlug}/{examSlug}/{stageSlug}[/{subjectSlug}]
  let canonicalPath = `/exams/india/${stateNode.slug}/${authorityNode.slug}/${examNode.slug}/${stageNode.slug}`;
  if (subjectNode) {
    canonicalPath += `/${subjectNode.slug}`;
  }

  // 7. Build Dynamic Breadcrumbs
  const breadcrumbs: KGBreadcrumbItem[] = [
    {
      id: 'country',
      label: country.name,
      slug: country.slug,
      url: `/exams/india`,
      level: 'country',
      badge: 'National'
    },
    {
      id: stateNode.id,
      label: stateNode.name,
      slug: stateNode.slug,
      url: `/exams/india/${stateNode.slug}`,
      level: 'state',
      badge: stateNode.code
    },
    {
      id: authorityNode.id,
      label: authorityNode.shortName || authorityNode.name,
      slug: authorityNode.slug,
      url: `/exams/india/${stateNode.slug}/${authorityNode.slug}`,
      level: 'authority',
      badge: 'Board'
    },
    {
      id: examNode.id,
      label: examNode.shortName || examNode.name,
      labelRegional: examNode.nameRegional || examNode.nameHindi,
      slug: examNode.slug,
      url: `/exams/india/${stateNode.slug}/${authorityNode.slug}/${examNode.slug}`,
      level: 'exam',
      badge: examNode.code
    },
    {
      id: stageNode.id,
      label: stageNode.name,
      slug: stageNode.slug,
      url: `/exams/india/${stateNode.slug}/${authorityNode.slug}/${examNode.slug}/${stageNode.slug}`,
      level: 'stage',
      badge: stageNode.type.toUpperCase()
    }
  ];

  if (subjectNode) {
    breadcrumbs.push({
      id: subjectNode.id,
      label: subjectNode.name,
      slug: subjectNode.slug,
      url: canonicalPath,
      level: 'subject',
      badge: 'Paper'
    });
  }

  // 8. Generate Targeted SEO Metadata
  const seoTitle = `${examNode.name} Mock Test 2026 (${stageNode.name}) — Realistic CBT | Arohi Exams`;
  const seoDesc = `Practice official ${examNode.name} mock tests conducted by ${authorityNode.name} (${stateNode.name}). Features realistic negative marking, dynamic question shuffling, detailed step-by-step solutions, and All-India Rank analytics.`;
  const seoKeywords = [
    examNode.name,
    examNode.code,
    authorityNode.shortName,
    authorityNode.name,
    `${examNode.shortName} Mock Test 2026`,
    `${examNode.shortName} CBT Practice`,
    `${examNode.name} Syllabus and Pattern`,
    `${stateNode.name} Government Exams`,
    'Arohi AI CBT Engine'
  ];

  const structuredDataJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: examNode.name,
    description: seoDesc,
    url: `https://arohiai.com${canonicalPath}`,
    credentialCategory: 'Government Recruitment & Academic Competitive Examination',
    recognizedBy: {
      '@type': 'Organization',
      name: authorityNode.name,
      alternateName: authorityNode.shortName,
      url: authorityNode.website
    },
    educationalLevel: examNode.eligibility,
    hasCourse: {
      '@type': 'Course',
      name: `${examNode.name} Full-Length CBT Simulation Course`,
      description: examNode.overview,
      provider: {
        '@type': 'Organization',
        name: 'Arohi AI Exams Platform',
        url: 'https://arohiai.com'
      }
    }
  };

  const seoMeta: ExamSEOMetadata = {
    title: seoTitle,
    metaDescription: seoDesc,
    keywords: seoKeywords,
    canonicalUrl: canonicalPath,
    h1: `${examNode.name} Official CBT Mock Test Series 2026`,
    structuredDataJsonLd,
    ogType: 'website'
  };

  return {
    country,
    state: stateNode,
    authority: authorityNode,
    exam: examNode,
    stage: stageNode,
    subject: subjectNode,
    canonicalPath,
    breadcrumbs,
    seoMeta
  };
}

// Generate JSON-LD BreadcrumbList Schema for Google Search
export function generateBreadcrumbJsonLd(breadcrumbs: KGBreadcrumbItem[]): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `https://arohiai.com${item.url}`
    }))
  };
}

// Get Knowledge Graph Statistics
export function getKGStats() {
  return {
    totalStates: Object.keys(KG_STATES_MAP).length,
    totalAuthorities: Object.keys(KG_AUTHORITIES_MAP).length,
    totalExams: Object.keys(KG_EXAMS_MAP).length,
    totalStages: Object.keys(KG_STAGES_MAP).length,
    totalSubjects: Object.keys(KG_SUBJECTS_MAP).length
  };
}
