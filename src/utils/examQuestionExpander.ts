import { MockTest, ExamQuestion, ExamSection, QuestionOption } from '../types/examTypes';

// Topic-specific authentic question generator generators
interface QuestionTemplate {
  subject: string;
  topic: string;
  text: string;
  textOdia?: string;
  textHindi?: string;
  options: Array<{ id: string; text: string; textOdia?: string; textHindi?: string }>;
  correctAnswer: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  referenceNotes?: string;
}

const NURSING_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Medical Surgical Nursing',
    topic: 'Cardiovascular & Critical Care',
    text: 'Which cardiac biomarker is the earliest and most specific indicator of acute myocardial infarction within 3-4 hours of onset?',
    textHindi: 'तीव्र रोधगलन (Acute MI) के 3-4 घंटों के भीतर कौन सा बायोमार्कर सबसे प्रारंभिक और विशिष्ट संकेतक है?',
    options: [
      { id: 'A', text: 'Troponin I / Troponin T' },
      { id: 'B', text: 'Creatine Kinase-MB (CK-MB)' },
      { id: 'C', text: 'Myoglobin' },
      { id: 'D', text: 'Lactate Dehydrogenase (LDH)' }
    ],
    correctAnswer: 'A',
    explanation: 'Cardiac Troponins (I and T) are gold standard cardiac biomarkers due to their ultra-high myocardial specificity and early rise (3-4 hrs), remaining elevated for up to 10-14 days.'
  },
  {
    subject: 'Obstetrics & Gynaecological Nursing',
    topic: 'Antenatal Assessment & Pre-eclampsia',
    text: 'What is the drug of choice for the prevention and control of seizures in severe pre-eclampsia and eclampsia?',
    textHindi: 'गंभीर प्री-एक्लेमप्सिया और एक्लेमप्सिया में दौरों की रोकथाम और नियंत्रण के लिए पहली पसंद की दवा कौन सी है?',
    options: [
      { id: 'A', text: 'Magnesium Sulfate (MgSO4) via Pritchard / Zuspan regimen' },
      { id: 'B', text: 'Diazepam IV bolus' },
      { id: 'C', text: 'Phenytoin sodium' },
      { id: 'D', text: 'Sodium Valproate' }
    ],
    correctAnswer: 'A',
    explanation: 'Magnesium Sulfate is the anticonvulsant of choice for eclampsia and severe pre-eclampsia, acting on NMDA receptors and reducing neuromuscular transmission.'
  },
  {
    subject: 'Pharmacology in Nursing',
    topic: 'High-Alert Medications & Infusion Rates',
    text: 'Prior to administering IV Digoxin, the nurse must assess which clinical parameter and withhold if below normal?',
    textHindi: 'IV डिगॉक्सिन देने से पहले, नर्स को किस नैदानिक पैरामीटर का आकलन करना चाहिए और यदि यह सामान्य से कम हो तो इसे रोक देना चाहिए?',
    options: [
      { id: 'A', text: 'Apical pulse for 1 full minute (withhold if < 60 bpm in adults)' },
      { id: 'B', text: 'Radial pulse for 15 seconds' },
      { id: 'C', text: 'Systolic blood pressure only' },
      { id: 'D', text: 'Hourly urine output' }
    ],
    correctAnswer: 'A',
    explanation: 'Digoxin is a cardiac glycoside with positive inotropic and negative chronotropic effects. The apical pulse must be assessed for a full 60 seconds; if < 60 bpm in adults (or < 90 in infants), it must be withheld and physician notified.'
  },
  {
    subject: 'Pediatric Nursing',
    topic: 'Immunization & Developmental Milestones',
    text: 'According to the National Immunization Schedule (NIS) in India, at what age is the first dose of Measles-Rubella (MR-1) vaccine administered?',
    textHindi: 'राष्ट्रीय टीकाकरण कार्यक्रम के अनुसार, खसरा-रूबेला (MR-1) का पहला टीका किस उम्र में दिया जाता है?',
    options: [
      { id: 'A', text: '9 to 12 completed months (Subcutaneously in right upper arm)' },
      { id: 'B', text: 'At birth along with BCG' },
      { id: 'C', text: '6 weeks with Pentavalent 1' },
      { id: 'D', text: '16 to 24 months' }
    ],
    correctAnswer: 'A',
    explanation: 'MR-1 is administered at 9-12 completed months (0.5 ml subcutaneously) alongside Vitamin A 1st dose (1 lakh IU).'
  },
  {
    subject: 'Fundamentals of Nursing',
    topic: 'Fluid Balance & TPN Administration',
    text: 'When caring for a patient receiving Total Parenteral Nutrition (TPN) through a central line, which complication is the highest priority for hourly glucose monitoring?',
    options: [
      { id: 'A', text: 'Hyperglycemia and hyperosmolar non-ketotic dehydration' },
      { id: 'B', text: 'Hypocalcemia' },
      { id: 'C', text: 'Hyperkalemia' },
      { id: 'D', text: 'Metabolic alkalosis' }
    ],
    correctAnswer: 'A',
    explanation: 'TPN solutions contain high dextrose concentrations (20-50%). Frequent blood glucose monitoring is mandatory to prevent severe hyperglycemia, osmotic diuresis, and dehydration.'
  }
];

const MATH_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Mathematics',
    topic: 'Percentages & Arithmetic',
    text: 'If the price of a commodity increases by 25%, by what percentage must a household reduce its consumption so that the total expenditure remains unchanged?',
    options: [
      { id: 'A', text: '20%' },
      { id: 'B', text: '25%' },
      { id: 'C', text: '16.66%' },
      { id: 'D', text: '15%' }
    ],
    correctAnswer: 'A',
    explanation: 'Formula: Reduction % = [r / (100 + r)] × 100% = [25 / 125] × 100% = 20%.'
  },
  {
    subject: 'Mathematics',
    topic: 'Algebra & Quadratic Equations',
    text: 'If α and β are the roots of the quadratic equation 2x² - 7x + 3 = 0, find the value of (α + β) + αβ.',
    options: [
      { id: 'A', text: '5' },
      { id: 'B', text: '7/2' },
      { id: 'C', text: '3/2' },
      { id: 'D', text: '4' }
    ],
    correctAnswer: 'A',
    explanation: 'Sum of roots (α + β) = -(-7)/2 = 7/2. Product of roots (αβ) = 3/2. Therefore, (α + β) + αβ = 7/2 + 3/2 = 10/2 = 5.'
  },
  {
    subject: 'Mathematics',
    topic: 'Geometry & Mensuration',
    text: 'A cylinder has a radius of 7 cm and height of 10 cm. What is its total surface area? (Take π = 22/7)',
    options: [
      { id: 'A', text: '748 cm²' },
      { id: 'B', text: '616 cm²' },
      { id: 'C', text: '440 cm²' },
      { id: 'D', text: '880 cm²' }
    ],
    correctAnswer: 'A',
    explanation: 'Total Surface Area = 2πr(h + r) = 2 × (22/7) × 7 × (10 + 7) = 44 × 17 = 748 cm².'
  },
  {
    subject: 'Mathematics',
    topic: 'Time, Speed and Distance',
    text: 'A train 180 meters long running at a speed of 72 km/h crosses an electric pole in how many seconds?',
    options: [
      { id: 'A', text: '9 seconds' },
      { id: 'B', text: '10 seconds' },
      { id: 'C', text: '12 seconds' },
      { id: 'D', text: '8 seconds' }
    ],
    correctAnswer: 'A',
    explanation: 'Speed in m/s = 72 × (5/18) = 20 m/s. Time = Distance / Speed = 180 / 20 = 9 seconds.'
  },
  {
    subject: 'Mathematics',
    topic: 'Probability & Statistics',
    text: 'Two dice are thrown simultaneously. What is the probability of getting a sum equal to 8?',
    options: [
      { id: 'A', text: '5/36' },
      { id: 'B', text: '1/6 (6/36)' },
      { id: 'C', text: '7/36' },
      { id: 'D', text: '1/9 (4/36)' }
    ],
    correctAnswer: 'A',
    explanation: 'Favorable pairs for sum = 8 are (2,6), (3,5), (4,4), (5,3), (6,2) = 5 outcomes out of 36 total. Probability = 5/36.'
  }
];

const SCIENCE_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Physics',
    topic: 'Optics & Light',
    text: 'An object is placed at 2F₁ in front of a convex lens. Where is the image formed, and what are its characteristics?',
    options: [
      { id: 'A', text: 'At 2F₂, Real, Inverted, and Same Size' },
      { id: 'B', text: 'At F₂, Real, Inverted, and Diminished' },
      { id: 'C', text: 'Beyond 2F₂, Virtual, Erect, and Enlarged' },
      { id: 'D', text: 'Between F₂ and 2F₂, Real, Inverted, and Diminished' }
    ],
    correctAnswer: 'A',
    explanation: 'When an object is placed at 2F (center of curvature) of a convex lens, light rays converge at 2F on the opposite side, producing a real, inverted image of identical size.'
  },
  {
    subject: 'Chemistry',
    topic: 'Periodic Properties & Chemical Bonding',
    text: 'Which of the following elements has the highest first ionization enthalpy across the second period?',
    options: [
      { id: 'A', text: 'Neon (Ne)' },
      { id: 'B', text: 'Fluorine (F)' },
      { id: 'C', text: 'Nitrogen (N)' },
      { id: 'D', text: 'Oxygen (O)' }
    ],
    correctAnswer: 'A',
    explanation: 'Neon has a completely filled octet (2s² 2p⁶) stable electronic configuration, giving it the highest first ionization enthalpy in period 2.'
  },
  {
    subject: 'Biology',
    topic: 'Human Physiology & Circulatory System',
    text: 'In the human heart, the tricuspid valve regulates the unidirectional flow of blood between which two chambers?',
    options: [
      { id: 'A', text: 'Right Atrium and Right Ventricle' },
      { id: 'B', text: 'Left Atrium and Left Ventricle' },
      { id: 'C', text: 'Right Ventricle and Pulmonary Artery' },
      { id: 'D', text: 'Left Ventricle and Aorta' }
    ],
    correctAnswer: 'A',
    explanation: 'The tricuspid (right atrioventricular) valve prevents backflow of deoxygenated blood from the right ventricle into the right atrium during ventricular systole.'
  },
  {
    subject: 'Physics',
    topic: 'Electricity & Ohm\'s Law',
    text: 'Three resistors of resistances 2Ω, 3Ω, and 6Ω are connected in parallel. What is their equivalent resistance?',
    options: [
      { id: 'A', text: '1.0 Ω' },
      { id: 'B', text: '11.0 Ω' },
      { id: 'C', text: '2.5 Ω' },
      { id: 'D', text: '0.5 Ω' }
    ],
    correctAnswer: 'A',
    explanation: '1/R_eq = 1/2 + 1/3 + 1/6 = (3 + 2 + 1) / 6 = 6/6 = 1. Therefore, R_eq = 1.0 Ω.'
  },
  {
    subject: 'Chemistry',
    topic: 'Acids, Bases & Salts',
    text: 'What is the pH of a 0.001 M hydrochloric acid (HCl) aqueous solution at 25°C?',
    options: [
      { id: 'A', text: '3.0' },
      { id: 'B', text: '2.0' },
      { id: 'C', text: '4.0' },
      { id: 'D', text: '1.0' }
    ],
    correctAnswer: 'A',
    explanation: 'HCl is a strong acid that dissociates completely: [H⁺] = 10⁻³ M. pH = -log₁₀[H⁺] = -log₁₀(10⁻³) = 3.0.'
  }
];

const GK_GENERAL_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Indian Polity',
    topic: 'Constitutional Articles & Fundamental Rights',
    text: 'Which Article of the Constitution of India guarantees the Right to Constitutional Remedies, famously termed the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
    textHindi: 'भारतीय संविधान का कौन सा अनुच्छेद संवैधानिक उपचार के अधिकार की गारंटी देता है जिसे डॉ. बी.आर. अम्बेडकर ने "संविधान का हृदय और आत्मा" कहा था?',
    options: [
      { id: 'A', text: 'Article 32' },
      { id: 'B', text: 'Article 21' },
      { id: 'C', text: 'Article 19' },
      { id: 'D', text: 'Article 14' }
    ],
    correctAnswer: 'A',
    explanation: 'Article 32 empowers citizens to move the Supreme Court directly for the enforcement of Fundamental Rights via writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari).'
  },
  {
    subject: 'Indian Economy',
    topic: 'Monetary Policy & Central Banking',
    text: 'What is the term for the interest rate at which the Reserve Bank of India (RBI) lends short-term money to commercial banks against government securities?',
    options: [
      { id: 'A', text: 'Repo Rate' },
      { id: 'B', text: 'Reverse Repo Rate' },
      { id: 'C', text: 'Bank Rate' },
      { id: 'D', text: 'Marginal Standing Facility (MSF)' }
    ],
    correctAnswer: 'A',
    explanation: 'Repo Rate (Repurchase Option Rate) is the benchmark policy rate at which RBI injects liquidity into the banking system against eligible government collateral.'
  },
  {
    subject: 'Indian Geography',
    topic: 'River Systems & National Parks',
    text: 'The Kaziranga National Park in Assam, globally renowned for the Great Indian One-Horned Rhinoceros, is situated on the floodplains of which river?',
    options: [
      { id: 'A', text: 'Brahmaputra River' },
      { id: 'B', text: 'Ganges River' },
      { id: 'C', text: 'Barak River' },
      { id: 'D', text: 'Teesta River' }
    ],
    correctAnswer: 'A',
    explanation: 'Kaziranga National Park lies along the southern bank of the Brahmaputra River in Golaghat and Nagaon districts of Assam, UNESCO World Heritage Site since 1985.'
  },
  {
    subject: 'Reasoning & Aptitude',
    topic: 'Coding-Decoding & Series',
    text: 'In a certain code language, if "KAVITA" is written as "MDXKXF", how will "MOHAN" be coded in that same pattern?',
    options: [
      { id: 'A', text: 'OQKER' },
      { id: 'B', text: 'OQKDS' },
      { id: 'C', text: 'OPKDR' },
      { id: 'D', text: 'NRJBM' }
    ],
    correctAnswer: 'A',
    explanation: 'Pattern adds +2, +3, +2, +3, +2, +3 to alphabets: M(+2)=O, O(+3)=R, H(+2)=J etc. (Alternate letter shift).'
  },
  {
    subject: 'General English',
    topic: 'Vocabulary & Idioms',
    text: 'Choose the correct synonym for the word "EPITOME":',
    options: [
      { id: 'A', text: 'Embodiment / Perfect Exemplar' },
      { id: 'B', text: 'Extension' },
      { id: 'C', text: 'Enlargement' },
      { id: 'D', text: 'Obscurity' }
    ],
    correctAnswer: 'A',
    explanation: 'Epitome means a person or thing that is a perfect example of a particular quality or type (synonyms: embodiment, paradigm, quintessence).'
  }
];

const SCHOOL_PRIMARY_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Environmental Studies',
    topic: 'Animals, Habitats & Senses',
    text: 'Which of the following animals has the ability to see things clearly in four times greater distance than human beings during daylight?',
    options: [
      { id: 'A', text: 'Eagles and Hawks' },
      { id: 'B', text: 'Dogs and Cats' },
      { id: 'C', text: 'Frogs and Toads' },
      { id: 'D', text: 'Snakes and Lizards' }
    ],
    correctAnswer: 'A',
    explanation: 'Birds of prey like Eagles, Kites, and Vultures have large foveas and high photoreceptor density, enabling them to see four times as far as humans.'
  },
  {
    subject: 'Mathematics',
    topic: 'Fractions & Decimals',
    text: 'If a pizza is divided into 8 equal slices and Ananya eats 3 slices, what fraction of the pizza is remaining?',
    options: [
      { id: 'A', text: '5/8' },
      { id: 'B', text: '3/8' },
      { id: 'C', text: '1/2' },
      { id: 'D', text: '5/6' }
    ],
    correctAnswer: 'A',
    explanation: 'Remaining slices = 8 - 3 = 5. Fraction remaining = 5/8.'
  },
  {
    subject: 'General Science',
    topic: 'States of Matter & Water Cycle',
    text: 'The process by which water vapor in the atmosphere cools and changes back into tiny liquid water droplets is called:',
    options: [
      { id: 'A', text: 'Condensation' },
      { id: 'B', text: 'Evaporation' },
      { id: 'C', text: 'Transpiration' },
      { id: 'D', text: 'Precipitation' }
    ],
    correctAnswer: 'A',
    explanation: 'Condensation is the physical transition of water vapor (gas) into liquid water, forming clouds in the sky.'
  }
];

/**
 * Ensures any test has complete, fully populated questions for every section,
 * eliminating all missing question mismatches.
 */
export function ensureTestComplete(test: MockTest): MockTest {
  if (!test) return test;

  // Make a shallow copy of test & sections
  const sections = test.sections.map(s => ({ ...s }));
  let existingQuestions = Array.isArray(test.questions) ? [...test.questions] : [];

  // Group existing questions by sectionId
  const questionsBySection: Record<string, ExamQuestion[]> = {};
  sections.forEach(sec => {
    questionsBySection[sec.id] = existingQuestions.filter(q => q.sectionId === sec.id);
  });

  // Select suitable template bank based on category
  let templateBank: QuestionTemplate[] = GK_GENERAL_TEMPLATES;
  if (test.mainCategory === 'nursing') {
    templateBank = [...NURSING_TEMPLATES, ...GK_GENERAL_TEMPLATES];
  } else if (test.mainCategory === 'school_boards') {
    templateBank = [...MATH_TEMPLATES, ...SCIENCE_TEMPLATES, ...SCHOOL_PRIMARY_TEMPLATES, ...GK_GENERAL_TEMPLATES];
  } else if (test.mainCategory === 'entrance_exams') {
    templateBank = [...SCIENCE_TEMPLATES, ...MATH_TEMPLATES, ...GK_GENERAL_TEMPLATES];
  } else {
    templateBank = [...GK_GENERAL_TEMPLATES, ...MATH_TEMPLATES, ...SCIENCE_TEMPLATES];
  }

  const finalQuestions: ExamQuestion[] = [];
  let globalNumber = 1;

  sections.forEach((sec) => {
    const currentSecList = questionsBySection[sec.id] || [];
    const needed = Math.max(sec.totalQuestions, currentSecList.length, 1);

    // Add existing questions for this section
    currentSecList.forEach((q) => {
      finalQuestions.push({
        ...q,
        questionNumber: globalNumber++
      });
    });

    // If section needs more questions to reach sec.totalQuestions
    const shortage = sec.totalQuestions - currentSecList.length;
    if (shortage > 0) {
      for (let i = 0; i < shortage; i++) {
        const tmplIdx = (currentSecList.length + i) % templateBank.length;
        const tmpl = templateBank[tmplIdx];
        const newQId = `${sec.id}_gen_${i + 1}_${Date.now().toString(36)}`;

        finalQuestions.push({
          id: newQId,
          questionNumber: globalNumber++,
          sectionId: sec.id,
          sectionName: sec.name,
          subject: tmpl.subject,
          topic: tmpl.topic,
          type: 'single_choice',
          text: tmpl.text,
          textOdia: tmpl.textOdia,
          textHindi: tmpl.textHindi,
          options: tmpl.options.map(o => ({ ...o })),
          correctAnswer: tmpl.correctAnswer,
          positiveMarks: sec.positiveMarksPerQuestion || 1.0,
          negativeMarks: sec.negativeMarksPerQuestion || 0.25,
          difficulty: tmpl.difficulty || 'medium',
          explanation: tmpl.explanation,
          referenceNotes: tmpl.referenceNotes || `${test.targetExam} Official Syllabus Core`
        });
      }
    }
  });

  // Calculate actual total marks and questions
  const totalQuestions = finalQuestions.length;
  const totalMarks = sections.reduce((sum, s) => sum + (s.totalMarks || (s.totalQuestions * s.positiveMarksPerQuestion)), 0) || totalQuestions;

  return {
    ...test,
    totalQuestions,
    totalMarks,
    sections,
    questions: finalQuestions
  };
}
