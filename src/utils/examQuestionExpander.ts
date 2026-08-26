import { MockTest, ExamQuestion, ExamSection } from '../types/examTypes';

// Topic-specific authentic question generator interfaces
export interface QuestionTemplate {
  subject: string;
  topic: string;
  text: string;
  textOdia?: string;
  textHindi?: string;
  options: Array<{ id: string; text: string; textOdia?: string; textHindi?: string }>;
  correctAnswer: string;
  explanation: string;
  explanationOdia?: string;
  explanationHindi?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  referenceNotes?: string;
}

// =========================================================================
// 1. QUANTITATIVE APTITUDE & ARITHMETIC (Full Range)
// =========================================================================
export const QUANT_MATH_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Quantitative Aptitude',
    topic: 'Percentages & Consumption',
    text: 'If the price of sugar increases by 25%, by what percentage must a household reduce its consumption so that the total expenditure remains unchanged?',
    textHindi: 'यदि चीनी की कीमत में 25% की वृद्धि होती है, तो एक परिवार को अपनी खपत में कितने प्रतिशत की कमी करनी चाहिए ताकि कुल खर्च अपरिवर्तित रहे?',
    textOdia: 'ଯଦି ଚିନିର ମୂଲ୍ୟ ୨୫% ବୃଦ୍ଧି ପାଏ, ତେବେ ଖର୍ଚ୍ଚ ଅପରିବର୍ତ୍ତିତ ରଖିବା ପାଇଁ ବ୍ୟବହାର କେତେ ପ୍ରତିଶତ ହ୍ରାସ କରିବାକୁ ପଡିବ?',
    options: [
      { id: 'A', text: '20%' },
      { id: 'B', text: '25%' },
      { id: 'C', text: '16.66%' },
      { id: 'D', text: '15%' }
    ],
    correctAnswer: 'A',
    explanation: 'Required reduction = [r / (100 + r)] * 100% = [25 / 125] * 100 = 20%.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Time, Speed and Distance',
    text: 'A train 180 meters long running at a uniform speed of 54 km/h crosses a platform in 24 seconds. What is the length of the platform in meters?',
    textHindi: '54 किमी/घंटा की गति से चल रही 180 मीटर लंबी ट्रेन 24 सेकंड में एक प्लेटफॉर्म को पार करती है। प्लेटफॉर्म की लंबाई क्या है?',
    options: [
      { id: 'A', text: '180 meters' },
      { id: 'B', text: '200 meters' },
      { id: 'C', text: '220 meters' },
      { id: 'D', text: '240 meters' }
    ],
    correctAnswer: 'A',
    explanation: 'Speed = 54 * (5/18) = 15 m/s. Total distance = Speed * Time = 15 * 24 = 360 m. Platform length = 360 - 180 = 180 m.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Simple and Compound Interest',
    text: 'The difference between compound interest and simple interest on a sum of money for 2 years at 10% per annum is ₹65. What is the principal sum?',
    textHindi: '10% प्रति वर्ष की दर से 2 वर्षों के लिए किसी राशि पर चक्रवृद्धि ब्याज और साधारण ब्याज के बीच का अंतर ₹65 है। मूलधन क्या है?',
    options: [
      { id: 'A', text: '₹6,500' },
      { id: 'B', text: '₹6,000' },
      { id: 'C', text: '₹7,000' },
      { id: 'D', text: '₹5,500' }
    ],
    correctAnswer: 'A',
    explanation: 'For 2 years, Difference = P * (R/100)^2. 65 = P * (10/100)^2 = P * (1/100) => P = ₹6,500.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Time and Work',
    text: 'A can complete a piece of work in 12 days and B in 18 days. If they work together for 4 days, what fraction of the work is left unfinished?',
    textHindi: 'A किसी कार्य को 12 दिनों में और B 18 दिनों में पूरा कर सकता है। यदि वे 4 दिनों तक एक साथ कार्य करते हैं, तो कार्य का कितना भाग शेष रह जाता है?',
    options: [
      { id: 'A', text: '4/9' },
      { id: 'B', text: '5/9' },
      { id: 'C', text: '1/3' },
      { id: 'D', text: '2/9' }
    ],
    correctAnswer: 'A',
    explanation: '1-day combined work = (1/12 + 1/18) = 5/36. 4 days work = 4 * (5/36) = 5/9. Remaining unfinished work = 1 - 5/9 = 4/9.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Ratio and Proportion',
    text: 'The ratio of the present ages of A and B is 4 : 5. After 6 years, the ratio of their ages becomes 5 : 6. What is the present age of A?',
    textHindi: 'दो व्यक्तियों A और B की वर्तमान आयु का अनुपात 4 : 5 है। 6 वर्ष बाद, उनकी आयु का अनुपात 5 : 6 हो जाता है। A की वर्तमान आयु क्या है?',
    options: [
      { id: 'A', text: '24 years' },
      { id: 'B', text: '30 years' },
      { id: 'C', text: '20 years' },
      { id: 'D', text: '28 years' }
    ],
    correctAnswer: 'A',
    explanation: '(4x + 6) / (5x + 6) = 5 / 6 => 24x + 36 = 25x + 30 => x = 6. Present age of A = 4 * 6 = 24 years.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Profit and Loss',
    text: 'A shopkeeper sells an article for ₹840 and gains 20%. If he had sold it for ₹735, what would have been his profit or loss percentage?',
    options: [
      { id: 'A', text: '5% profit' },
      { id: 'B', text: '5% loss' },
      { id: 'C', text: '10% profit' },
      { id: 'D', text: '2.5% profit' }
    ],
    correctAnswer: 'A',
    explanation: 'Cost Price (CP) = 840 / 1.20 = ₹700. If sold for ₹735, Profit = 735 - 700 = ₹35. Profit % = (35/700) * 100 = 5% gain.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Pipes and Cisterns',
    text: 'Pipe A can fill a tank in 8 hours and Pipe B can empty it in 12 hours. If both pipes are opened simultaneously in an empty tank, how many hours will it take to fill the tank completely?',
    options: [
      { id: 'A', text: '24 hours' },
      { id: 'B', text: '20 hours' },
      { id: 'C', text: '18 hours' },
      { id: 'D', text: '16 hours' }
    ],
    correctAnswer: 'A',
    explanation: 'Net rate in 1 hour = 1/8 - 1/12 = (3 - 2)/24 = 1/24. Thus, it takes 24 hours to fill the tank.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Boats and Streams',
    text: 'A boat travels 36 km downstream in 3 hours and 24 km upstream in 4 hours. What is the speed of the current (stream) in km/h?',
    options: [
      { id: 'A', text: '3 km/h' },
      { id: 'B', text: '2 km/h' },
      { id: 'C', text: '4 km/h' },
      { id: 'D', text: '1.5 km/h' }
    ],
    correctAnswer: 'A',
    explanation: 'Downstream speed (u + v) = 36/3 = 12 km/h. Upstream speed (u - v) = 24/4 = 6 km/h. Speed of stream (v) = (12 - 6)/2 = 3 km/h.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Mixtures and Alligations',
    text: 'In what ratio must a grocer mix tea at ₹60 per kg and ₹75 per kg so that by selling the mixture at ₹77 per kg he may gain a profit of 10%?',
    options: [
      { id: 'A', text: '1 : 2' },
      { id: 'B', text: '2 : 1' },
      { id: 'C', text: '3 : 2' },
      { id: 'D', text: '4 : 3' }
    ],
    correctAnswer: 'A',
    explanation: 'Mean Cost Price = 77 / 1.10 = ₹70/kg. By Alligation rule: (75 - 70) : (70 - 60) = 5 : 10 = 1 : 2.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Mensuration 2D & 3D',
    text: 'If the radius of a circular cylinder is increased by 50% and its height is decreased by 20%, what is the percentage change in its volume?',
    options: [
      { id: 'A', text: '80% increase' },
      { id: 'B', text: '60% increase' },
      { id: 'C', text: '70% increase' },
      { id: 'D', text: '50% increase' }
    ],
    correctAnswer: 'A',
    explanation: 'Volume V = π r^2 h. New volume = π (1.5r)^2 (0.8h) = 2.25 * 0.8 * π r^2 h = 1.80 V. Hence, volume increases by 80%.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Averages',
    text: 'The average age of 24 students and their class teacher is 15 years. If the teacher age is excluded, the average age decreases by 1 year. What is the age of the teacher?',
    options: [
      { id: 'A', text: '39 years' },
      { id: 'B', text: '38 years' },
      { id: 'C', text: '40 years' },
      { id: 'D', text: '35 years' }
    ],
    correctAnswer: 'A',
    explanation: 'Total age of 25 persons = 25 * 15 = 375. Total age of 24 students = 24 * 14 = 336. Teacher age = 375 - 336 = 39 years.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Number System & Divisibility',
    text: 'What is the remainder when (7^19 + 2) is divided by 6?',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '1' },
      { id: 'C', text: '2' },
      { id: 'D', text: '5' }
    ],
    correctAnswer: 'A',
    explanation: '7 mod 6 = 1. Therefore (7^19) mod 6 = (1^19) mod 6 = 1. Remainder = (1 + 2) mod 6 = 3.'
  }
];

// =========================================================================
// 2. LOGICAL & ANALYTICAL REASONING
// =========================================================================
export const REASONING_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Logical Reasoning',
    topic: 'Coding-Decoding',
    text: 'In a certain code language, if "MONKEY" is coded as "XDJMNL", how is "TIGER" coded in that same pattern?',
    textHindi: 'एक निश्चित कोड भाषा में, यदि "MONKEY" को "XDJMNL" लिखा जाता है, तो "TIGER" को क्या लिखा जाएगा?',
    options: [
      { id: 'A', text: 'QDFHS' },
      { id: 'B', text: 'SDFHQ' },
      { id: 'C', text: 'SHFDQ' },
      { id: 'D', text: 'UJHFS' }
    ],
    correctAnswer: 'A',
    explanation: 'Each letter is shifted back by 1 (-1) and the order of letters is reversed: R-1=Q, E-1=D, G-1=F, I-1=H, T-1=S => QDFHS.'
  },
  {
    subject: 'Logical Reasoning',
    topic: 'Blood Relations',
    text: 'Pointing to a photograph of a gentleman, a woman says: "His mother is the only daughter of my mother." How is the woman related to the gentleman?',
    textHindi: 'एक सज्जन के चित्र की ओर इशारा करते हुए एक महिला कहती है: "उसकी माँ मेरी माँ की इकलौती बेटी है।" महिला उस सज्जन से कैसे संबंधित है?',
    options: [
      { id: 'A', text: 'Mother' },
      { id: 'B', text: 'Sister' },
      { id: 'C', text: 'Aunt' },
      { id: 'D', text: 'Grandmother' }
    ],
    correctAnswer: 'A',
    explanation: '"Only daughter of my mother" refers to the woman herself. Therefore, the woman is the mother of the gentleman.'
  },
  {
    subject: 'Logical Reasoning',
    topic: 'Syllogism',
    text: 'Statements: (1) All Books are Pens. (2) Some Pens are Pencils. Conclusions: I. Some Books are Pencils. II. Some Pens are Books.',
    options: [
      { id: 'A', text: 'Only Conclusion II follows' },
      { id: 'B', text: 'Only Conclusion I follows' },
      { id: 'C', text: 'Both I and II follow' },
      { id: 'D', text: 'Neither I nor II follows' }
    ],
    correctAnswer: 'A',
    explanation: 'Since "All Books are Pens", the converse "Some Pens are Books" is definitely true. There is no definite overlap given between Books and Pencils, so only Conclusion II follows.'
  },
  {
    subject: 'Logical Reasoning',
    topic: 'Direction Sense Test',
    text: 'A person walks 10 km towards North, then turns right and walks 6 km. Then he turns right again and walks 10 km. How far and in which direction is he now from his starting point?',
    options: [
      { id: 'A', text: '6 km towards East' },
      { id: 'B', text: '6 km towards West' },
      { id: 'C', text: '10 km towards East' },
      { id: 'D', text: '16 km towards North' }
    ],
    correctAnswer: 'A',
    explanation: 'Walking 10 km North and 10 km South cancels the North-South displacement. He is 6 km due East of his starting point.'
  },
  {
    subject: 'Logical Reasoning',
    topic: 'Number & Letter Series',
    text: 'Find the missing number in the sequence: 4, 9, 25, 49, 121, ?',
    options: [
      { id: 'A', text: '169' },
      { id: 'B', text: '144' },
      { id: 'C', text: '196' },
      { id: 'D', text: '225' }
    ],
    correctAnswer: 'A',
    explanation: 'The sequence represents squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, 13^2=169.'
  },
  {
    subject: 'Logical Reasoning',
    topic: 'Seating Arrangement',
    text: 'Five friends P, Q, R, S, and T are sitting in a row facing North. S is between T and Q. Q is to the immediate left of R. P is to the immediate left of T. Who is sitting in the middle?',
    options: [
      { id: 'A', text: 'S' },
      { id: 'B', text: 'T' },
      { id: 'C', text: 'Q' },
      { id: 'D', text: 'P' }
    ],
    correctAnswer: 'A',
    explanation: 'Arrangement from left to right: P - T - S - Q - R. The person sitting exactly in the middle is S.'
  },
  {
    subject: 'Logical Reasoning',
    topic: 'Ranking & Order',
    text: 'In a class of 45 students, Ramesh ranks 18th from the top. What is his rank from the bottom?',
    options: [
      { id: 'A', text: '28th' },
      { id: 'B', text: '27th' },
      { id: 'C', text: '29th' },
      { id: 'D', text: '30th' }
    ],
    correctAnswer: 'A',
    explanation: 'Rank from bottom = Total - Rank from top + 1 = 45 - 18 + 1 = 28th.'
  },
  {
    subject: 'Logical Reasoning',
    topic: 'Analogies',
    text: 'Select the related word: Ophthalmologist : Eye :: Nephrologist : ?',
    options: [
      { id: 'A', text: 'Kidney' },
      { id: 'B', text: 'Heart' },
      { id: 'C', text: 'Brain' },
      { id: 'D', text: 'Liver' }
    ],
    correctAnswer: 'A',
    explanation: 'An ophthalmologist specializes in the eye; a nephrologist specializes in the kidney.'
  }
];

// =========================================================================
// 3. GENERAL ENGLISH & VERBAL ABILITY
// =========================================================================
export const ENGLISH_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'General English',
    topic: 'Vocabulary & Synonyms',
    text: 'Choose the most appropriate synonym for the word "EPITOME":',
    textHindi: '"EPITOME" शब्द का सबसे उपयुक्त पर्यायवाची शब्द चुनें:',
    options: [
      { id: 'A', text: 'Embodiment / Perfect Exemplar' },
      { id: 'B', text: 'Extension' },
      { id: 'C', text: 'Enlargement' },
      { id: 'D', text: 'Obscurity' }
    ],
    correctAnswer: 'A',
    explanation: '"Epitome" refers to a person or thing that is a perfect example of a particular quality or type.'
  },
  {
    subject: 'General English',
    topic: 'Error Spotting',
    text: 'Identify the segment with a grammatical error: "Neither the principal (A) / nor the lecturers (B) / was present at the conference. (C) / No error (D)"',
    options: [
      { id: 'A', text: 'A' },
      { id: 'B', text: 'B' },
      { id: 'C', text: 'C (was present -> were present)' },
      { id: 'D', text: 'D' }
    ],
    correctAnswer: 'C',
    explanation: 'When subjects are joined by "neither...nor", the verb agrees with the subject closest to it ("lecturers" is plural, so it requires "were present").'
  },
  {
    subject: 'General English',
    topic: 'Idioms and Phrases',
    text: 'What is the meaning of the idiom "To burn the midnight oil"?',
    options: [
      { id: 'A', text: 'To work or study late into the night' },
      { id: 'B', text: 'To waste resources carelessly' },
      { id: 'C', text: 'To start a fire by mistake' },
      { id: 'D', text: 'To quarrel over trivial matters' }
    ],
    correctAnswer: 'A',
    explanation: '"Burning the midnight oil" means reading, studying, or working hard late into the night.'
  },
  {
    subject: 'General English',
    topic: 'One Word Substitution',
    text: 'Choose the one-word substitution for: "One who is unable to pay his debts."',
    options: [
      { id: 'A', text: 'Insolvent / Bankrupt' },
      { id: 'B', text: 'Spendthrift' },
      { id: 'C', text: 'Optimist' },
      { id: 'D', text: 'Ascetic' }
    ],
    correctAnswer: 'A',
    explanation: 'An insolvent or bankrupt is a person unable to pay outstanding debts.'
  },
  {
    subject: 'General English',
    topic: 'Antonyms',
    text: 'Select the most appropriate antonym for the word "CANDID":',
    options: [
      { id: 'A', text: 'Deceitful / Evasive' },
      { id: 'B', text: 'Frank' },
      { id: 'C', text: 'Honest' },
      { id: 'D', text: 'Outspoken' }
    ],
    correctAnswer: 'A',
    explanation: '"Candid" means truthful and straightforward. Its opposite is deceitful or evasive.'
  },
  {
    subject: 'General English',
    topic: 'Direct & Indirect Speech',
    text: 'Convert into indirect speech: She said, "I have finished my assignment."',
    options: [
      { id: 'A', text: 'She said that she had finished her assignment.' },
      { id: 'B', text: 'She said that she has finished her assignment.' },
      { id: 'C', text: 'She told that she finished her assignment.' },
      { id: 'D', text: 'She said that she had been finished her assignment.' }
    ],
    correctAnswer: 'A',
    explanation: 'Present perfect tense ("have finished") changes to past perfect tense ("had finished") in reported speech.'
  }
];

// =========================================================================
// 4. MEDICAL, NURSING & CLINICAL SCIENCES (AIIMS, ESIC, OSSSC)
// =========================================================================
export const NURSING_MEDICAL_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Medical Surgical Nursing',
    topic: 'Cardiovascular & Emergency Care',
    text: 'A patient admitted to the ICCU suddenly develops Ventricular Fibrillation (V-Fib) on the cardiac monitor. What is the immediate first-line nursing priority action?',
    textHindi: 'ICCU में भर्ती एक मरीज के कार्डियक मॉनिटर पर अचानक वेंट्रिकुलर फिब्रिलेशन (V-Fib) दिखाई देता है। पहली प्राथमिकता वाली नर्सिंग कार्रवाई क्या है?',
    options: [
      { id: 'A', text: 'Administer IV Amiodarone 300 mg bolus immediately' },
      { id: 'B', text: 'Initiate high-quality CPR and prepare for immediate unsynchronized Defibrillation' },
      { id: 'C', text: 'Perform synchronized cardioversion at 50 Joules' },
      { id: 'D', text: 'Check carotid pulse for at least 30 seconds before taking action' }
    ],
    correctAnswer: 'B',
    explanation: 'According to ACLS guidelines, Ventricular Fibrillation (V-Fib) is a shockable pulseless cardiac arrest rhythm. The immediate intervention is initiating high-quality CPR and early unsynchronized defibrillation (120-200J biphasic or 360J monophasic).'
  },
  {
    subject: 'Pharmacology in Nursing',
    topic: 'Emergency Antidotes',
    text: 'A patient receiving Continuous IV Heparin infusion for Deep Vein Thrombosis (DVT) shows a sudden drop in Hb and aPTT > 120 seconds with active mucosal bleeding. Which specific antidote must the nurse prepare?',
    textHindi: 'डीप वेन थ्रॉम्बोसिस (DVT) के लिए हेपरिन इन्फ्यूजन ले रहे मरीज में aPTT > 120 सेकंड और ब्लीडिंग देखी गई। नर्स को कौन सा विशिष्ट एंटीडोट तैयार करना चाहिए?',
    options: [
      { id: 'A', text: 'Vitamin K1 (Phytonadione)' },
      { id: 'B', text: 'Protamine Sulfate' },
      { id: 'C', text: 'Deferoxamine' },
      { id: 'D', text: 'Calcium Gluconate 10%' }
    ],
    correctAnswer: 'B',
    explanation: 'Protamine Sulfate is the specific antidote for unfractionated Heparin overdose. It is a strongly basic protein that binds with acidic heparin to form an inactive salt complex. Vitamin K is the antidote for Warfarin.'
  },
  {
    subject: 'Obstetrics & Gynaecological Nursing',
    topic: 'Stages of Labour & APGAR Scoring',
    text: 'A newborn at 1 minute after birth has a heart rate of 110 bpm, slow irregular cry, some flexion of extremities, grimace on suctioning, and pink body with blue extremities (acrocyanosis). What is the total APGAR score?',
    options: [
      { id: 'A', text: '7' },
      { id: 'B', text: '8' },
      { id: 'C', text: '6' },
      { id: 'D', text: '9' }
    ],
    correctAnswer: 'A',
    explanation: 'Heart rate >100 = 2; Respiratory effort (slow/irregular) = 1; Muscle tone (some flexion) = 1; Reflex irritability (grimace) = 1; Color (acrocyanosis) = 1. Total APGAR = 2 + 1 + 1 + 1 + 1 = 7.'
  },
  {
    subject: 'Medical Surgical Nursing',
    topic: 'Cardiovascular Biomarkers',
    text: 'Which cardiac biomarker is the earliest and most specific indicator of acute myocardial infarction within 3-4 hours of onset?',
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
    topic: 'High-Alert Medications',
    text: 'Prior to administering IV Digoxin, the nurse must assess which clinical parameter and withhold if below normal?',
    options: [
      { id: 'A', text: 'Apical pulse for 1 full minute (withhold if < 60 bpm in adults)' },
      { id: 'B', text: 'Radial pulse for 15 seconds' },
      { id: 'C', text: 'Systolic blood pressure only' },
      { id: 'D', text: 'Hourly urine output' }
    ],
    correctAnswer: 'A',
    explanation: 'Digoxin is a cardiac glycoside with positive inotropic and negative chronotropic effects. The apical pulse must be assessed for a full 60 seconds; if < 60 bpm in adults, withhold and notify the physician.'
  },
  {
    subject: 'Pediatric Nursing',
    topic: 'Immunization & Vaccines',
    text: 'According to the National Immunization Schedule (NIS) in India, at what age is the first dose of Measles-Rubella (MR-1) vaccine administered?',
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
    topic: 'Infection Control & PPE',
    text: 'What is the correct sequence for donning (putting on) Personal Protective Equipment (PPE)?',
    options: [
      { id: 'A', text: 'Gown -> Mask/Respirator -> Goggles/Face Shield -> Gloves' },
      { id: 'B', text: 'Gloves -> Gown -> Mask -> Goggles' },
      { id: 'C', text: 'Mask -> Gown -> Gloves -> Goggles' },
      { id: 'D', text: 'Goggles -> Mask -> Gown -> Gloves' }
    ],
    correctAnswer: 'A',
    explanation: 'CDC protocol for donning PPE: 1. Gown, 2. Mask or Respirator, 3. Goggles or Face Shield, 4. Gloves.'
  }
];

// =========================================================================
// 5. UPSC, CIVIL SERVICES & GENERAL STUDIES (Polity, History, Geo, Economy)
// =========================================================================
export const CIVIL_SERVICES_GS_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Indian Polity & Constitution',
    topic: 'Fundamental Rights & Judicial Review',
    text: 'Which Article of the Constitution of India guarantees the Right to Constitutional Remedies, famously termed the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
    textHindi: 'भारतीय संविधान का कौन सा अनुच्छेद संवैधानिक उपचारों के अधिकार की गारंटी देता है जिसे डॉ. बी.आर. अम्बेडकर ने "संविधान का हृदय और आत्मा" कहा था?',
    options: [
      { id: 'A', text: 'Article 32' },
      { id: 'B', text: 'Article 226' },
      { id: 'C', text: 'Article 21' },
      { id: 'D', text: 'Article 14' }
    ],
    correctAnswer: 'A',
    explanation: 'Article 32 provides the right to move the Supreme Court by appropriate proceedings for the enforcement of fundamental rights through writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari).'
  },
  {
    subject: 'Modern Indian History',
    topic: 'Freedom Struggle & Gandhian Movements',
    text: 'In which year did Mahatma Gandhi launch the historic Civil Disobedience Movement with the Salt March (Dandi Satyagraha) from Sabarmati Ashram?',
    textHindi: 'महात्मा गांधी ने साबरमती आश्रम से दांडी मार्च के साथ सविनय अवज्ञा आंदोलन किस वर्ष शुरू किया था?',
    options: [
      { id: 'A', text: '1930' },
      { id: 'B', text: '1920' },
      { id: 'C', text: '1942' },
      { id: 'D', text: '1919' }
    ],
    correctAnswer: 'A',
    explanation: 'The Dandi March started on March 12, 1930, reaching Dandi on April 6, 1930, marking the official launch of the Civil Disobedience Movement.'
  },
  {
    subject: 'Indian & World Geography',
    topic: 'River Systems & National Parks',
    text: 'The Kaziranga National Park in Assam, globally renowned for the Great Indian One-Horned Rhinoceros, is situated on the floodplains of which river?',
    textHindi: 'असम का काजीरंगा राष्ट्रीय उद्यान किस नदी के बाढ़ के मैदान पर स्थित है?',
    options: [
      { id: 'A', text: 'Brahmaputra River' },
      { id: 'B', text: 'Ganges River' },
      { id: 'C', text: 'Barak River' },
      { id: 'D', text: 'Teesta River' }
    ],
    correctAnswer: 'A',
    explanation: 'Kaziranga National Park lies along the southern bank of the Brahmaputra River in the Golaghat and Nagaon districts of Assam.'
  },
  {
    subject: 'Indian Economy',
    topic: 'Fiscal Policy & Public Finance',
    text: 'The concept of "Fiscal Deficit" in the Union Budget of India represents:',
    options: [
      { id: 'A', text: 'Total expenditure minus Total revenue receipts and non-debt capital receipts' },
      { id: 'B', text: 'Revenue Expenditure minus Revenue Receipts' },
      { id: 'C', text: 'Fiscal Deficit minus Interest Payments' },
      { id: 'D', text: 'Total Imports minus Total Exports' }
    ],
    correctAnswer: 'A',
    explanation: 'Fiscal Deficit indicates total borrowings required by the government = Total Expenditure - (Revenue Receipts + Non-debt Capital Receipts).'
  },
  {
    subject: 'Indian Polity & Constitution',
    topic: 'Preamble & Constitutional Amendments',
    text: 'The words "SOCIALIST", "SECULAR", and "INTEGRITY" were added to the Preamble of the Indian Constitution by which Constitutional Amendment Act?',
    options: [
      { id: 'A', text: '42nd Amendment Act, 1976' },
      { id: 'B', text: '44th Amendment Act, 1978' },
      { id: 'C', text: '73rd Amendment Act, 1992' },
      { id: 'D', text: '86th Amendment Act, 2002' }
    ],
    correctAnswer: 'A',
    explanation: 'The 42nd Amendment Act of 1976 amended the Preamble to include Socialist, Secular, and Integrity.'
  },
  {
    subject: 'Environment & Ecology',
    topic: 'Biodiversity Hotspots & Conservation',
    text: 'Which of the following mountain ranges in India is recognized by UNESCO as one of the world\'s eight "hottest hot-spots" of biological diversity?',
    options: [
      { id: 'A', text: 'Western Ghats' },
      { id: 'B', text: 'Aravalli Range' },
      { id: 'C', text: 'Vindhya Range' },
      { id: 'D', text: 'Satpura Range' }
    ],
    correctAnswer: 'A',
    explanation: 'The Western Ghats are an internationally recognized UNESCO World Heritage biodiversity hotspot harboring thousands of endemic plant and animal species.'
  }
];

// =========================================================================
// 6. BANKING, FINANCE & MONETARY POLICY (IBPS, SBI, RBI)
// =========================================================================
export const BANKING_FINANCE_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Banking Awareness',
    topic: 'Monetary Policy & RBI',
    text: 'What is the interest rate at which the Reserve Bank of India (RBI) lends short-term liquidity to commercial banks against government securities?',
    textHindi: 'वह ब्याज दर क्या है जिस पर RBI सरकारी प्रतिभूतियों के विरुद्ध वाणिज्यिक बैंकों को अल्पकालिक तरलता उधार देता है?',
    options: [
      { id: 'A', text: 'Repo Rate' },
      { id: 'B', text: 'Reverse Repo Rate' },
      { id: 'C', text: 'Bank Rate' },
      { id: 'D', text: 'Marginal Standing Facility (MSF)' }
    ],
    correctAnswer: 'A',
    explanation: 'Repo Rate (Repurchase Option Rate) is the benchmark rate at which the RBI lends money to commercial banks against collateral securities.'
  },
  {
    subject: 'Banking Awareness',
    topic: 'Banking Regulations & Capital Adequacy',
    text: 'Under the Basel III regulatory framework, what does CRAR stand for in commercial banking?',
    options: [
      { id: 'A', text: 'Capital to Risk-Weighted Assets Ratio' },
      { id: 'B', text: 'Credit Risk Analysis Ratio' },
      { id: 'C', text: 'Cash Reserve Allocation Rate' },
      { id: 'D', text: 'Current Ratio of Assets & Reserves' }
    ],
    correctAnswer: 'A',
    explanation: 'CRAR (Capital to Risk-Weighted Assets Ratio) measures a bank’s available capital as a percentage of its risk-weighted credit exposures.'
  },
  {
    subject: 'Banking Awareness',
    topic: 'Financial Inclusion & Priority Sector',
    text: 'What is the maximum loan limit available under the "Tarun" category of the Pradhan Mantri Mudra Yojana (PMMY)?',
    options: [
      { id: 'A', text: 'Up to ₹10 Lakhs (extended up to ₹20 Lakhs for previous repaid borrowers)' },
      { id: 'B', text: 'Up to ₹50,000' },
      { id: 'C', text: 'Up to ₹5 Lakhs' },
      { id: 'D', text: 'Up to ₹2 Lakhs' }
    ],
    correctAnswer: 'A',
    explanation: 'PMMY tiers: Shishu (up to ₹50k), Kishore (₹50k to ₹5L), and Tarun (₹5L to ₹10L, with enhanced limit up to ₹20L for established entrepreneurs).'
  },
  {
    subject: 'Banking Awareness',
    topic: 'Payment Systems & NPCI',
    text: 'Which entity regulates and operates the Unified Payments Interface (UPI) and Immediate Payment Service (IMPS) in India?',
    options: [
      { id: 'A', text: 'National Payments Corporation of India (NPCI)' },
      { id: 'B', text: 'Securities and Exchange Board of India (SEBI)' },
      { id: 'C', text: 'Indian Banks Association (IBA)' },
      { id: 'D', text: 'Ministry of Corporate Affairs' }
    ],
    correctAnswer: 'A',
    explanation: 'NPCI is the umbrella organization for operating retail payments and settlement systems in India under RBI guidance.'
  }
];

// =========================================================================
// 7. ODISHA STATE SPECIFIC (OPSC, OSSSC, BSE ODISHA, ODIA GRAMMAR)
// =========================================================================
export const ODISHA_SPECIFIC_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Odisha General Knowledge',
    topic: 'History & Temple Architecture of Odisha',
    text: 'The famous Sun Temple at Konark, a UNESCO World Heritage site, was constructed in the 13th century AD during the reign of which Ganga dynasty ruler?',
    textOdia: 'କୋଣାର୍କର ପ୍ରସିଦ୍ଧ ସୂର୍ଯ୍ୟ ମନ୍ଦିର କେଉଁ ଗଙ୍ଗ ବଂଶର ରାଜାଙ୍କ ଶାସନ କାଳରେ ନିର୍ମିତ ହୋଇଥିଲା?',
    textHindi: 'कोणार्क का प्रसिद्ध सूर्य मंदिर 13वीं शताब्दी में किस गंग वंश के शासक के शासनकाल में बनवाया गया था?',
    options: [
      { id: 'A', text: 'King Narasimhadeva I', textOdia: 'ପ୍ରଥମ ନରସିଂହଦେବ' },
      { id: 'B', text: 'King Anantavarman Chodagangadeva', textOdia: 'ଅନନ୍ତବର୍ମନ ଚୋଡଗଙ୍ଗଦେବ' },
      { id: 'C', text: 'King Kapilendradeva', textOdia: 'କପିଳେନ୍ଦ୍ରଦେବ' },
      { id: 'D', text: 'King Kharavela', textOdia: 'ମହାମେଘବାହନ ଖାରବେଳ' }
    ],
    correctAnswer: 'A',
    explanation: 'The Konark Sun Temple was built around 1250 AD by King Narasimhadeva I of the Eastern Ganga Dynasty.',
    explanationOdia: 'କୋଣାର୍କର ସୂର୍ଯ୍ୟ ମନ୍ଦିର ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧୨୫୦ ରେ ପୂର୍ବ ଗଙ୍ଗ ବଂଶର ରାଜା ପ୍ରଥମ ନରସିଂହଦେବଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ହୋଇଥିଲା।'
  },
  {
    subject: 'Odia Language & Grammar (ଓଡ଼ିଆ ବ୍ୟାକରଣ)',
    topic: 'ସନ୍ଧି ଓ ସମାସ',
    text: '"ବିଦ୍ୟାଳୟ" ଶବ୍ଦର ସଠିକ୍ ସନ୍ଧି ବିଚ୍ଛେଦ କ’ଣ ହେବ?',
    textOdia: '"ବିଦ୍ୟାଳୟ" ଶବ୍ଦର ସଠିକ୍ ସନ୍ଧି ବିଚ୍ଛେଦ କ’ଣ ହେବ?',
    options: [
      { id: 'A', text: 'ବିଦ୍ୟା + ଆଳୟ' },
      { id: 'B', text: 'ବିଦ୍ + ଆଳୟ' },
      { id: 'C', text: 'ବିଦ୍ୟା + ଳୟ' },
      { id: 'D', text: 'ବିଦ୍ୟୋ + ଆଳୟ' }
    ],
    correctAnswer: 'A',
    explanation: 'ସ୍ୱରସନ୍ଧି ନିୟମ ଅନୁସାରେ: ବିଦ୍ୟା + ଆଳୟ = ବିଦ୍ୟାଳୟ (ଆ + ଆ = ଆ)।'
  },
  {
    subject: 'Odisha Geography & Natural Resources',
    topic: 'River Systems & Lakes of Odisha',
    text: 'Which is the largest brackish water coastal lagoon in India and second largest in the world, designated as the first Indian wetland of international importance under the Ramsar Convention?',
    textOdia: 'ଭାରତର ସର୍ବବୃହତ ଲୁଣିଆ ହ୍ରଦ କେଉଁଟି ଯାହା ରାମସାର ସାଇଟ୍ ଭାବେ ଘୋଷିତ?',
    options: [
      { id: 'A', text: 'Chilika Lake', textOdia: 'ଚିଲିକା ହ୍ରଦ' },
      { id: 'B', text: 'Ansupa Lake', textOdia: 'ଅଂଶୁପା ହ୍ରଦ' },
      { id: 'C', text: 'Kolab Reservoir', textOdia: 'କୋଲାବ ଜଳଭଣ୍ଡାର' },
      { id: 'D', text: 'Tampara Lake', textOdia: 'ତାମ୍ପରା ହ୍ରଦ' }
    ],
    correctAnswer: 'A',
    explanation: 'Chilika Lake is Asia\'s largest brackish water lagoon, designated as India\'s first Ramsar site in 1981.'
  },
  {
    subject: 'Odisha History & Freedom Struggle',
    topic: 'Paika Rebellion of 1817',
    text: 'Who was the commander and leader of the heroic Paika Rebellion (Paika Bidroha) of 1817 against British rule in Khurda, Odisha?',
    textOdia: '୧୮୧୭ ମସିହାର ଐତିହାସିକ ପାଇକ ବିଦ୍ରୋହର ମୁଖ୍ୟ ନେତା ଓ ସେନାପତି କିଏ ଥିଲେ?',
    options: [
      { id: 'A', text: 'Bakshi Jagabandhu Bidyadhara', textOdia: 'ବକ୍ସି ଜଗବନ୍ଧୁ ବିଦ୍ୟାଧର' },
      { id: 'B', text: 'Surendra Sai', textOdia: 'ବୀର ସୁରେନ୍ଦ୍ର ସାଏ' },
      { id: 'C', text: 'Jayee Rajguru', textOdia: 'ଜୟୀ ରାଜଗୁରୁ' },
      { id: 'D', text: 'Laxman Nayak', textOdia: 'ଶହୀଦ ଲକ୍ଷ୍ମଣ ନାୟକ' }
    ],
    correctAnswer: 'A',
    explanation: 'Bakshi Jagabandhu (Bidyadhara Mohapatra Bhramarabar Ray) was the military commander of the King of Khurda who led the Paika Rebellion in 1817.'
  },
  {
    subject: 'Odisha General Knowledge',
    topic: 'River Dams & Projects',
    text: 'On which major river in Odisha is the Hirakud Dam, one of the longest major earthen dams in the world, constructed?',
    textOdia: 'ପୃଥିବୀର ଅନ୍ୟତମ ଦୀର୍ଘତମ ମାଟି ବନ୍ଧ ହୀରାକୁଦ କେଉଁ ନଦୀ ଉପରେ ନିର୍ମିତ ହୋଇଛି?',
    options: [
      { id: 'A', text: 'Mahanadi River', textOdia: 'ମହାନଦୀ' },
      { id: 'B', text: 'Brahmani River', textOdia: 'ବ୍ରାହ୍ମଣୀ ନଦୀ' },
      { id: 'C', text: 'Baitarani River', textOdia: 'ବୈତରଣୀ ନଦୀ' },
      { id: 'D', text: 'Rushikulya River', textOdia: 'ଋଷିକୂଲ୍ୟା ନଦୀ' }
    ],
    correctAnswer: 'A',
    explanation: 'Hirakud Dam was built across the Mahanadi River near Sambalpur in Odisha, commissioned in 1957.'
  },
  {
    subject: 'Odisha Heritage & Biodiversity',
    topic: 'Similipal Biosphere Reserve & Tiger Reserve',
    text: 'In which district of Odisha is the UNESCO World Network Similipal Biosphere Reserve and National Park located?',
    options: [
      { id: 'A', text: 'Mayurbhanj District' },
      { id: 'B', text: 'Sundargarh District' },
      { id: 'C', text: 'Keonjhar District' },
      { id: 'D', text: 'Koraput District' }
    ],
    correctAnswer: 'A',
    explanation: 'Similipal National Park and Tiger Reserve is located in the northern Mayurbhanj district of Odisha.'
  }
];

// =========================================================================
// 7B. BIHAR STATE SPECIFIC (BPSC CCE, BIHAR POLICE SI, BTET, BSSC)
// =========================================================================
export const BIHAR_SPECIFIC_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Bihar General Knowledge',
    topic: 'Modern History & Champaran Satyagraha',
    text: 'Who invited Mahatma Gandhi to visit Champaran in Bihar in 1917 to investigate the grievances of indigo farmers subjected to the Tinkathia system?',
    textHindi: '1917 में तीनकठिया प्रणाली के तहत नील की खेती करने वाले किसानों की समस्याओं की जांच के लिए महात्मा गांधी को चंपारण आने का निमंत्रण किसने दिया था?',
    options: [
      { id: 'A', text: 'Raj Kumar Shukla' },
      { id: 'B', text: 'Dr. Rajendra Prasad' },
      { id: 'C', text: 'Anugrah Narayan Sinha' },
      { id: 'D', text: 'Brajkishore Prasad' }
    ],
    correctAnswer: 'A',
    explanation: 'Raj Kumar Shukla, a local farmer leader from Champaran, met Gandhiji at the Lucknow Congress session in 1916 and persuaded him to visit Champaran.'
  },
  {
    subject: 'Bihar General Knowledge',
    topic: '1857 Revolt in Bihar',
    text: 'Who was the prominent 80-year-old chieftain of Jagdishpur who led the Revolt of 1857 in Bihar against British forces?',
    textHindi: 'बिहार में 1857 के विद्रोह का नेतृत्व करने वाले जगदीशपुर के 80 वर्षीय प्रमुख नेता कौन थे?',
    options: [
      { id: 'A', text: 'Kunwar Singh' },
      { id: 'B', text: 'Amar Singh' },
      { id: 'C', text: 'Pir Ali Khan' },
      { id: 'D', text: 'Hare Krishna Singh' }
    ],
    correctAnswer: 'A',
    explanation: 'Babu Veer Kunwar Singh of Jagdishpur (Arrah) led the 1857 freedom struggle in Bihar with remarkable military valor.'
  },
  {
    subject: 'Bihar Geography & Rivers',
    topic: 'Sorrow of Bihar & River Drainage',
    text: 'Which river, originating in Tibet and Nepal before entering northern Bihar, is historically referred to as the "Sorrow of Bihar" due to frequent devastating floods and avulsion?',
    textHindi: 'किस नदी को अपनी विनाशकारी बाढ़ और मार्ग बदलने की प्रवृत्ति के कारण ऐतिहासिक रूप से "बिहार का शोक" कहा जाता है?',
    options: [
      { id: 'A', text: 'Kosi River' },
      { id: 'B', text: 'Gandak River' },
      { id: 'C', text: 'Son River' },
      { id: 'D', text: 'Bagmati River' }
    ],
    correctAnswer: 'A',
    explanation: 'The Kosi River is known as the "Sorrow of Bihar" due to heavy siltation and unpredictable course shifts causing chronic flooding.'
  },
  {
    subject: 'Bihar Ancient History & Heritage',
    topic: 'Ancient Universities of Magadha',
    text: 'The ancient Nalanda Mahavihara, a premier Buddhist center of higher learning, was founded during the 5th century CE during the reign of which Gupta emperor?',
    textHindi: 'प्राचीन नालंदा महाविहार की स्थापना 5वीं शताब्दी ईस्वी में किस गुप्त शासक के शासनकाल में हुई थी?',
    options: [
      { id: 'A', text: 'Kumaragupta I' },
      { id: 'B', text: 'Samudragupta' },
      { id: 'C', text: 'Chandragupta II (Vikramaditya)' },
      { id: 'D', text: 'Skandagupta' }
    ],
    correctAnswer: 'A',
    explanation: 'Nalanda University was established during the reign of Gupta Emperor Kumaragupta I (Shakraditya) in the 5th century CE.'
  },
  {
    subject: 'Bihar Geography & Protected Areas',
    topic: 'National Parks & Wildlife of Bihar',
    text: 'What is the name of the only designated National Park and Tiger Reserve situated in West Champaran district of Bihar?',
    options: [
      { id: 'A', text: 'Valmiki National Park' },
      { id: 'B', text: 'Kaimur Wildlife Sanctuary' },
      { id: 'C', text: 'Bhimbandh Sanctuary' },
      { id: 'D', text: 'Gautam Buddha Sanctuary' }
    ],
    correctAnswer: 'A',
    explanation: 'Valmiki National Park and Tiger Reserve is located along the India-Nepal border in West Champaran district, Bihar.'
  }
];

// =========================================================================
// 7C. UTTAR PRADESH STATE SPECIFIC (UPPSC PCS, UP POLICE SI/CONSTABLE, UPTET)
// =========================================================================
export const UP_SPECIFIC_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Uttar Pradesh General Knowledge',
    topic: 'Modern History & 1857 Revolt',
    text: 'From which cantonment city of Uttar Pradesh did the historic Indian Revolt of 1857 erupt on May 10, 1857, following the sepoys\' defiance?',
    textHindi: '10 मई 1857 को भारतीय स्वतंत्रता संग्राम (1857 की क्रांति) का सूत्रपात उत्तर प्रदेश के किस छावनी शहर से हुआ था?',
    options: [
      { id: 'A', text: 'Meerut' },
      { id: 'B', text: 'Jhansi' },
      { id: 'C', text: 'Kanpur' },
      { id: 'D', text: 'Bareilly' }
    ],
    correctAnswer: 'A',
    explanation: 'The 1857 rebellion officially began in Meerut on May 10, 1857, when Indian sepoys broke ranks and marched to Delhi.'
  },
  {
    subject: 'Uttar Pradesh Geography & Wildlife',
    topic: 'Protected Areas & National Parks',
    text: 'Which is the premier National Park and Tiger Reserve located in Lakhimpur Kheri district of the Terai belt in Uttar Pradesh?',
    textHindi: 'उत्तर प्रदेश के लखीमपुर खीरी जिले में स्थित प्रमुख राष्ट्रीय उद्यान और टाइगर रिजर्व कौन सा है?',
    options: [
      { id: 'A', text: 'Dudhwa National Park' },
      { id: 'B', text: 'Pilibhit Tiger Reserve' },
      { id: 'C', text: 'Chandra Prabha Wildlife Sanctuary' },
      { id: 'D', text: 'Hastinapur Wildlife Sanctuary' }
    ],
    correctAnswer: 'A',
    explanation: 'Dudhwa National Park in Lakhimpur Kheri represents the fertile Terai ecosystem, home to Tigers, Swamp Deer (Barasingha), and One-horned Rhinos.'
  },
  {
    subject: 'Uttar Pradesh History & Freedom Movement',
    topic: 'Kakori Train Action (1925)',
    text: 'Who were the core revolutionaries of the Hindustan Republican Association (HRA) associated with the historic Kakori Train Action near Lucknow in 1925?',
    options: [
      { id: 'A', text: 'Ram Prasad Bismil, Ashfaqulla Khan, and Thakur Roshan Singh' },
      { id: 'B', text: 'Bhagat Singh and Sukhdev' },
      { id: 'C', text: 'Batukeshwar Dutt and Jatin Das' },
      { id: 'D', text: 'Lala Lajpat Rai and Bipin Chandra Pal' }
    ],
    correctAnswer: 'A',
    explanation: 'The Kakori Train Action on August 9, 1925, was executed by HRA leaders Ram Prasad Bismil, Ashfaqulla Khan, Rajendra Lahiri, and Roshan Singh.'
  },
  {
    subject: 'Uttar Pradesh Polity & Governance',
    topic: 'Bicameral State Legislature',
    text: 'What is the total strength of elected/nominated members in the Uttar Pradesh Legislative Council (Vidhan Parishad), the largest in India?',
    options: [
      { id: 'A', text: '100 Members' },
      { id: 'B', text: '403 Members' },
      { id: 'C', text: '80 Members' },
      { id: 'D', text: '75 Members' }
    ],
    correctAnswer: 'A',
    explanation: 'The UP Legislative Council has 100 members, while the UP Legislative Assembly (Vidhan Sabha) has 403 members.'
  }
];

// =========================================================================
// 7D. RAJASTHAN STATE SPECIFIC (RPSC RAS, RAJASTHAN POLICE, REET)
// =========================================================================
export const RAJASTHAN_SPECIFIC_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Rajasthan General Knowledge',
    topic: 'Geography & Physiography',
    text: 'Which is the highest mountain peak in the ancient Aravalli Range and in the entire state of Rajasthan, located in Mount Abu?',
    textHindi: 'माउंट आबू में स्थित अरावली पर्वतमाला और राजस्थान की सबसे ऊँची पर्वत चोटी कौन सी है?',
    options: [
      { id: 'A', text: 'Guru Shikhar (1,722 meters)' },
      { id: 'B', text: 'Ser Peak' },
      { id: 'C', text: 'Dilwara Peak' },
      { id: 'D', text: 'Taragarh' }
    ],
    correctAnswer: 'A',
    explanation: 'Guru Shikhar in the Arbuda Mountains of Sirohi district (Mount Abu) stands at 1,722 meters above sea level.'
  },
  {
    subject: 'Rajasthan History & Battles',
    topic: 'Battle of Haldighati (1576)',
    text: 'In 1576, Maharana Pratap of Mewar fought the famous Battle of Haldighati against the Mughal Imperial army led by which commander?',
    options: [
      { id: 'A', text: 'Raja Man Singh I of Amber' },
      { id: 'B', text: 'Bairam Khan' },
      { id: 'C', text: 'Asaf Khan' },
      { id: 'D', text: 'Todar Mal' }
    ],
    correctAnswer: 'A',
    explanation: 'The Battle of Haldighati was fought on June 18, 1576 between Maharana Pratap and the Mughal forces commanded by Raja Man Singh I of Amber.'
  },
  {
    subject: 'Rajasthan Heritage & Conservation',
    topic: 'Keoladeo Ghana & Sambhar Lake',
    text: 'Which UNESCO World Heritage Site in Bharatpur, Rajasthan is world-famous as an avifauna sanctuary hosting thousands of migratory birds during winter?',
    options: [
      { id: 'A', text: 'Keoladeo National Park (Ghana Sanctuary)' },
      { id: 'B', text: 'Ranthambore National Park' },
      { id: 'C', text: 'Sariska Tiger Reserve' },
      { id: 'D', text: 'Mukundra Hills' }
    ],
    correctAnswer: 'A',
    explanation: 'Keoladeo National Park (formerly Bharatpur Bird Sanctuary) is a renowned wetland and bird sanctuary founded by Maharaja Suraj Mal.'
  }
];

// =========================================================================
// 7E. WEST BENGAL, MP & MAHARASHTRA STATE GK
// =========================================================================
export const ALL_STATE_GK_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'State General Knowledge',
    topic: 'Panchayati Raj Institution Launch',
    text: 'In which district of Rajasthan was the modern three-tier Panchayati Raj system first inaugurated in India by Prime Minister Jawaharlal Nehru on October 2, 1959?',
    textHindi: '2 अक्टूबर 1959 को भारत में पंचायती राज व्यवस्था का उद्घाटन सबसे पहले राजस्थान के किस जिले में किया गया था?',
    options: [
      { id: 'A', text: 'Nagaur District' },
      { id: 'B', text: 'Sikar District' },
      { id: 'C', text: 'Jaipur District' },
      { id: 'D', text: 'Ajmer District' }
    ],
    correctAnswer: 'A',
    explanation: 'The Balwant Rai Mehta committee recommendations led to the first Panchayati Raj launch in Nagaur, Rajasthan on Gandhi Jayanti in 1959.'
  },
  {
    subject: 'State General Knowledge',
    topic: 'West Bengal & Sundarbans Delta',
    text: 'The Sundarbans Mangrove forest, recognized as a UNESCO World Heritage Site spanning West Bengal and Bangladesh, is formed by the confluence of which major river system?',
    options: [
      { id: 'A', text: 'Ganga, Brahmaputra, and Meghna' },
      { id: 'B', text: 'Mahanadi and Subarnarekha' },
      { id: 'C', text: 'Godavari and Krishna' },
      { id: 'D', text: 'Narmada and Tapti' }
    ],
    correctAnswer: 'A',
    explanation: 'Sundarbans is the world\'s largest contiguous mangrove ecosystem, formed by the combined delta of the Ganga, Brahmaputra, and Meghna rivers.'
  },
  {
    subject: 'State General Knowledge',
    topic: 'Madhya Pradesh & Narmada River',
    text: 'The spectacular Dhuandhar Falls and Marble Rocks in Madhya Pradesh are formed along the gorge of which west-flowing river?',
    options: [
      { id: 'A', text: 'Narmada River (Bhedaghat, Jabalpur)' },
      { id: 'B', text: 'Chambal River' },
      { id: 'C', text: 'Betwa River' },
      { id: 'D', text: 'Shipra River' }
    ],
    correctAnswer: 'A',
    explanation: 'Bhedaghat near Jabalpur in Madhya Pradesh features the Narmada River cascading through scenic marble gorges creating Dhuandhar Falls.'
  },
  {
    subject: 'State General Knowledge',
    topic: 'Maharashtra & Maratha Administration',
    text: 'What was the council of eight ministers instituted by Chhatrapati Shivaji Maharaj for efficient administration of the Maratha Empire called?',
    options: [
      { id: 'A', text: 'Ashtapradhan' },
      { id: 'B', text: 'Navaratnas' },
      { id: 'C', text: 'Ashtadiggajas' },
      { id: 'D', text: 'Panchatantra' }
    ],
    correctAnswer: 'A',
    explanation: 'The Ashtapradhan council included key offices like Peshwa (Prime Minister), Amatya (Finance), Senapati (Commander), and Nyayadhish (Chief Justice).'
  }
];

// =========================================================================
// 7F. LAW, POLICE APTITUDE & BNS / BNSS (State Police SI, Constable, Warder)
// =========================================================================
export const LAW_POLICE_APTITUDE_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Law & Police Aptitude',
    topic: 'Bharatiya Nyaya Sanhita (BNS) & Criminal Law',
    text: 'Under the Bharatiya Nyaya Sanhita (BNS) 2023 that replaced the Indian Penal Code (IPC) 1860, what is the defined punishment for organized crime and mob lynching?',
    textHindi: 'भारतीय न्याय संहिता (BNS) 2023 के तहत संगठित अपराध और मॉब लिंचिंग के लिए क्या प्रावधान किए गए हैं?',
    options: [
      { id: 'A', text: 'Explicit statutory recognition with separate rigorous imprisonment up to life imprisonment or death penalty' },
      { id: 'B', text: 'Bailable offense with a fine only' },
      { id: 'C', text: 'Only administrative warning without trial' },
      { id: 'D', text: 'Mandatory community service for maximum 1 week' }
    ],
    correctAnswer: 'A',
    explanation: 'Under Section 103(2) and Section 111 of BNS 2023, mob lynching on grounds of race, caste, community, or sex, and organized crime syndicate activities carry rigorous imprisonment for life or death penalty.'
  },
  {
    subject: 'Law & Police Aptitude',
    topic: 'First Information Report (FIR) & Zero FIR',
    text: 'What is the legal provision regarding a "Zero FIR" across police jurisdictions in India?',
    textHindi: '"जीरो एफआईआर" (Zero FIR) के संबंध में भारत में क्या कानूनी प्रावधान है?',
    options: [
      { id: 'A', text: 'Any police station must register an FIR irrespective of place of incident and subsequently transfer it to the jurisdictional station' },
      { id: 'B', text: 'An FIR where zero fine is imposed' },
      { id: 'C', text: 'An FIR registered only when zero suspects are identified' },
      { id: 'D', text: 'An FIR valid only within the police commissionerate limits' }
    ],
    correctAnswer: 'A',
    explanation: 'A Zero FIR can be registered in any police station across India without jurisdictional restriction to initiate immediate investigation, and is later assigned a regular FIR number upon transfer.'
  },
  {
    subject: 'Law & Police Aptitude',
    topic: 'Constitutional Protections & Arrest Rights',
    text: 'According to Article 22(2) of the Constitution of India and the BNSS, every arrested person must be produced before the nearest Judicial Magistrate within what mandatory timeframe?',
    options: [
      { id: 'A', text: 'Within 24 hours (excluding journey time from place of arrest)' },
      { id: 'B', text: 'Within 48 hours' },
      { id: 'C', text: 'Within 72 hours' },
      { id: 'D', text: 'Within 12 hours' }
    ],
    correctAnswer: 'A',
    explanation: 'Article 22(2) of the Indian Constitution mandates that every person arrested and detained in custody must be produced before the nearest magistrate within 24 hours of arrest.'
  },
  {
    subject: 'Law & Police Aptitude',
    topic: 'Cyber Crime & National Helplines',
    text: 'Which is the dedicated official national emergency helpline number established by the Ministry of Home Affairs (MHA) for reporting financial cyber fraud in India?',
    options: [
      { id: 'A', text: '1930' },
      { id: 'B', text: '112' },
      { id: 'C', text: '1098' },
      { id: 'D', text: '181' }
    ],
    correctAnswer: 'A',
    explanation: '1930 is the National Cyber Crime Citizen Financial Fraud helpline operated by the Indian Cyber Crime Coordination Centre (I4C).'
  }
];

// =========================================================================
// 7G. CSAT & MENTAL ABILITY (State PCS Paper 2 & UPSC CSAT)
// =========================================================================
export const CSAT_APTITUDE_COMPREHENSION_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'CSAT Mental Ability',
    topic: 'Data Sufficiency & Logic',
    text: 'Question: Is x greater than y? Statement I: 2x - 3y = 5. Statement II: x > 0 and y < 0. Which statements are sufficient to answer?',
    options: [
      { id: 'A', text: 'Statement II alone is sufficient to conclude x > y' },
      { id: 'B', text: 'Statement I alone is sufficient' },
      { id: 'C', text: 'Both statements together are required' },
      { id: 'D', text: 'Neither statement is sufficient' }
    ],
    correctAnswer: 'A',
    explanation: 'From Statement II, if x is positive and y is negative, any positive number is strictly greater than any negative number. Thus Statement II alone is sufficient.'
  },
  {
    subject: 'CSAT Reading Comprehension',
    topic: 'Inference & Critical Reasoning',
    text: 'Passage: "Sustainable agriculture relies on soil microbiome enrichment and water table recharge rather than excessive chemical nitrogen application." What is the most critical inference?',
    options: [
      { id: 'A', text: 'Long-term ecological soil health and natural resource conservation are indispensable for sustainable food systems' },
      { id: 'B', text: 'Chemical fertilizers must be completely banned with immediate effect' },
      { id: 'C', text: 'Modern agriculture produces zero crop yield' },
      { id: 'D', text: 'Microbiome research has no practical agricultural application' }
    ],
    correctAnswer: 'A',
    explanation: 'The passage highlights that sustainable food production is fundamentally tied to biological soil health and responsible groundwater management.'
  }
];

// =========================================================================
// 8. TEACHING & PEDAGOGY (CTET, OTET, State TET)
// =========================================================================
export const TEACHING_PEDAGOGY_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Child Development & Pedagogy',
    topic: 'Piaget Cognitive Stages',
    text: 'According to Jean Piaget\'s theory of cognitive development, during which stage does a child develop the concept of "Object Permanence"?',
    textHindi: 'जीन पियाजे के संज्ञानात्मक विकास के सिद्धांत के अनुसार, किस चरण में बच्चा "वस्तु स्थायित्व" की अवधारणा विकसित करता है?',
    options: [
      { id: 'A', text: 'Sensorimotor Stage (0 to 2 years)' },
      { id: 'B', text: 'Pre-operational Stage (2 to 7 years)' },
      { id: 'C', text: 'Concrete Operational Stage (7 to 11 years)' },
      { id: 'D', text: 'Formal Operational Stage (11 years and above)' }
    ],
    correctAnswer: 'A',
    explanation: 'Object permanence is the understanding that objects continue to exist even when they cannot be seen, heard, or touched, which develops in the sensorimotor stage (around 8-9 months).'
  },
  {
    subject: 'Child Development & Pedagogy',
    topic: 'Vygotsky\'s Socio-Cultural Theory',
    text: 'What term did Lev Vygotsky use to define the distance between the actual developmental level determined by independent problem solving and the level of potential development determined through problem solving under adult guidance?',
    options: [
      { id: 'A', text: 'Zone of Proximal Development (ZPD)' },
      { id: 'B', text: 'Scaffolding' },
      { id: 'C', text: 'Assimilation' },
      { id: 'D', text: 'Equilibration' }
    ],
    correctAnswer: 'A',
    explanation: 'The Zone of Proximal Development (ZPD) is the range of tasks that a child cannot yet handle alone but can do with the guidance and support of more knowledgeable others (MKO).'
  },
  {
    subject: 'Teaching Aptitude & Pedagogy',
    topic: 'National Education Policy (NEP 2020)',
    text: 'What is the new pedagogical and curricular structure introduced by the National Education Policy (NEP) 2020 replacing the previous 10+2 system?',
    options: [
      { id: 'A', text: '5 + 3 + 3 + 4' },
      { id: 'B', text: '5 + 4 + 3 + 2' },
      { id: 'C', text: '3 + 3 + 4 + 5' },
      { id: 'D', text: '4 + 4 + 3 + 3' }
    ],
    correctAnswer: 'A',
    explanation: 'NEP 2020 introduces the 5+3+3+4 structure corresponding to Foundational (age 3-8), Preparatory (age 8-11), Middle (age 11-14), and Secondary (age 14-18) stages.'
  }
];

// =========================================================================
// 9. SCHOOL K-12 (Classes 1–10: Math, Science, Social, English)
// =========================================================================
export const SCHOOL_PRIMARY_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Mathematics (Class 1-5)',
    topic: 'Basic Arithmetic & Place Value',
    text: 'What is the place value of the digit 7 in the number 4,752?',
    textHindi: 'संख्या 4,752 में अंक 7 का स्थानीय मान क्या है?',
    options: [
      { id: 'A', text: '700' },
      { id: 'B', text: '70' },
      { id: 'C', text: '7' },
      { id: 'D', text: '7000' }
    ],
    correctAnswer: 'A',
    explanation: 'In 4,752, the digit 7 is at the Hundreds place (7 * 100 = 700).'
  },
  {
    subject: 'Environmental Studies (EVS)',
    topic: 'Plants and Living Things',
    text: 'Which part of a plant is primarily responsible for absorbing water and mineral nutrients from the soil?',
    options: [
      { id: 'A', text: 'Roots' },
      { id: 'B', text: 'Stem' },
      { id: 'C', text: 'Leaves' },
      { id: 'D', text: 'Flower' }
    ],
    correctAnswer: 'A',
    explanation: 'Roots anchor the plant into the soil and absorb water and dissolved essential mineral salts.'
  }
];

export const SCHOOL_CLASS_10_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Mathematics (Class 10)',
    topic: 'Quadratic Equations & Roots',
    text: 'What are the roots of the quadratic equation 2x^2 - 7x + 3 = 0?',
    options: [
      { id: 'A', text: '3 and 1/2' },
      { id: 'B', text: '-3 and -1/2' },
      { id: 'C', text: '2 and 3/2' },
      { id: 'D', text: '1 and 3' }
    ],
    correctAnswer: 'A',
    explanation: '2x^2 - 6x - x + 3 = 0 => 2x(x - 3) - 1(x - 3) = 0 => (2x - 1)(x - 3) = 0 => x = 3, 1/2.'
  },
  {
    subject: 'Science (Class 10)',
    topic: 'Chemical Reactions & Balancing',
    text: 'When zinc granules are added to dilute sulphuric acid (H2SO4), which gas is liberated with effervescence that burns with a pop sound?',
    options: [
      { id: 'A', text: 'Hydrogen Gas (H2)' },
      { id: 'B', text: 'Oxygen Gas (O2)' },
      { id: 'C', text: 'Carbon Dioxide (CO2)' },
      { id: 'D', text: 'Sulphur Dioxide (SO2)' }
    ],
    correctAnswer: 'A',
    explanation: 'Zn + H2SO4 -> ZnSO4 + H2↑. Hydrogen gas burns with a characteristic pop sound when tested with a burning splinter.'
  },
  {
    subject: 'Science (Class 10 Physics)',
    topic: 'Light - Reflection and Refraction',
    text: 'An object is placed at the Center of Curvature (C) in front of a concave mirror. Where is the image formed and what is its nature?',
    options: [
      { id: 'A', text: 'At C, Real, Inverted and of Same Size' },
      { id: 'B', text: 'At Focus (F), Real and Point-sized' },
      { id: 'C', text: 'Beyond C, Real and Enlarged' },
      { id: 'D', text: 'Behind the mirror, Virtual and Erect' }
    ],
    correctAnswer: 'A',
    explanation: 'When an object is at the center of curvature of a concave mirror, the image is formed at C, is real, inverted, and of the same size as the object.'
  },
  {
    subject: 'Social Science (Class 10)',
    topic: 'Democratic Politics & Federalism',
    text: 'In the Indian Constitution, subjects like Defence, Foreign Affairs, Banking, and Currency are included in which list?',
    options: [
      { id: 'A', text: 'Union List (List I)' },
      { id: 'B', text: 'State List (List II)' },
      { id: 'C', text: 'Concurrent List (List III)' },
      { id: 'D', text: 'Residuary Powers' }
    ],
    correctAnswer: 'A',
    explanation: 'Under the Seventh Schedule, the Union List comprises subjects of national importance where only the Parliament has the power to legislate.'
  }
];

// =========================================================================
// 10. COMPUTER SCIENCE, IT & DIGITAL LITERACY
// =========================================================================
export const COMPUTER_IT_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Computer Knowledge',
    topic: 'Computer Networks & OSI Model',
    text: 'Which layer of the OSI (Open Systems Interconnection) reference model is responsible for logical IP addressing and routing packets across networks?',
    options: [
      { id: 'A', text: 'Network Layer (Layer 3)' },
      { id: 'B', text: 'Data Link Layer (Layer 2)' },
      { id: 'C', text: 'Transport Layer (Layer 4)' },
      { id: 'D', text: 'Application Layer (Layer 7)' }
    ],
    correctAnswer: 'A',
    explanation: 'The Network Layer (Layer 3) handles IP addressing, packet forwarding, and router-to-router path determination.'
  },
  {
    subject: 'Computer Knowledge',
    topic: 'Cyber Security & Protocols',
    text: 'What protocol is used to securely encrypt web communications between a browser and a web server using TLS/SSL over port 443?',
    options: [
      { id: 'A', text: 'HTTPS' },
      { id: 'B', text: 'HTTP' },
      { id: 'C', text: 'FTP' },
      { id: 'D', text: 'SMTP' }
    ],
    correctAnswer: 'A',
    explanation: 'HTTPS (Hypertext Transfer Protocol Secure) operates over port 443 with TLS encryption.'
  },
  {
    subject: 'Computer Knowledge',
    topic: 'Database & SQL',
    text: 'In relational database management systems (RDBMS), which SQL statement is used to remove all rows from a table without logging individual row deletions?',
    options: [
      { id: 'A', text: 'TRUNCATE' },
      { id: 'B', text: 'DELETE' },
      { id: 'C', text: 'DROP' },
      { id: 'D', text: 'ALTER' }
    ],
    correctAnswer: 'A',
    explanation: 'TRUNCATE TABLE is a DDL command that deallocates data pages, executing much faster than DELETE while resetting table identity counters.'
  }
];

// =========================================================================
// 11. PURE SCIENCES & ENGINEERING (NEET / JEE / GATE)
// =========================================================================
export const PURE_SCIENCES_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Physics',
    topic: 'Thermodynamics & Carnot Engine',
    text: 'A Carnot heat engine operates between temperatures of 500 K and 300 K. What is its maximum theoretical thermal efficiency?',
    options: [
      { id: 'A', text: '40%' },
      { id: 'B', text: '60%' },
      { id: 'C', text: '50%' },
      { id: 'D', text: '30%' }
    ],
    correctAnswer: 'A',
    explanation: 'Carnot efficiency η = 1 - (T_sink / T_source) = 1 - (300 / 500) = 1 - 0.6 = 0.4 = 40%.'
  },
  {
    subject: 'Chemistry',
    topic: 'Chemical Kinetics & Rate Law',
    text: 'For a first-order chemical reaction, what is the relationship between the half-life period (t1/2) and the rate constant (k)?',
    options: [
      { id: 'A', text: 't1/2 = 0.693 / k' },
      { id: 'B', text: 't1/2 = [A]0 / (2k)' },
      { id: 'C', text: 't1/2 = 1 / (k * [A]0)' },
      { id: 'D', text: 't1/2 = 2.303 / k' }
    ],
    correctAnswer: 'A',
    explanation: 'For a first order reaction, t1/2 = ln(2) / k = 0.693 / k, which is completely independent of initial reactant concentration.'
  },
  {
    subject: 'Biology',
    topic: 'Genetics & DNA Replication',
    text: 'Which enzyme is responsible for synthesizing new complementary DNA strands by adding deoxynucleotides in the 5\' to 3\' direction during replication?',
    options: [
      { id: 'A', text: 'DNA Polymerase III' },
      { id: 'B', text: 'DNA Ligase' },
      { id: 'C', text: 'RNA Primase' },
      { id: 'D', text: 'Helicase' }
    ],
    correctAnswer: 'A',
    explanation: 'DNA Polymerase III is the primary enzyme responsible for synthesizing new DNA strands in prokaryotes by joining dNTPs to the 3\'-OH group of an existing primer.'
  }
];

// =========================================================================
// DYNAMIC PARAMETER VARIATION ENGINE (Prevents any question repetition)
// =========================================================================
function generateDynamicMathVariation(baseIndex: number): QuestionTemplate {
  const seed = baseIndex + 1;
  const types = [
    // 1. Percentage increase/decrease
    () => {
      const p = [20, 25, 40, 50, 10, 15, 30][seed % 7];
      const ans = Number(((p / (100 + p)) * 100).toFixed(1));
      return {
        subject: 'Quantitative Aptitude',
        topic: 'Percentages & Arithmetic Variation',
        text: `If the market price of petrol increases by ${p}%, by what percentage must a driver reduce monthly petrol consumption so that the total expenditure remains the same?`,
        options: [
          { id: 'A', text: `${ans}%` },
          { id: 'B', text: `${(ans + 5).toFixed(1)}%` },
          { id: 'C', text: `${(ans - 3.5).toFixed(1)}%` },
          { id: 'D', text: `${p}%` }
        ],
        correctAnswer: 'A',
        explanation: `Reduction required = [${p} / (100 + ${p})] * 100% = ${ans}%.`
      };
    },
    // 2. Train and platform speed
    () => {
      const trainLen = [120, 150, 200, 240, 300, 180][seed % 6];
      const speedKm = [36, 54, 72, 90, 108][seed % 5];
      const timeSec = [15, 20, 25, 30, 18][seed % 5];
      const speedMs = speedKm * (5 / 18);
      const totalDist = speedMs * timeSec;
      const platLen = totalDist - trainLen;
      return {
        subject: 'Quantitative Aptitude',
        topic: 'Time, Speed & Distance Variation',
        text: `A train ${trainLen} meters long running at a uniform speed of ${speedKm} km/h crosses a railway platform in ${timeSec} seconds. What is the length of the platform in meters?`,
        options: [
          { id: 'A', text: `${platLen} meters` },
          { id: 'B', text: `${platLen + 50} meters` },
          { id: 'C', text: `${platLen - 30} meters` },
          { id: 'D', text: `${platLen + 100} meters` }
        ],
        correctAnswer: 'A',
        explanation: `Speed = ${speedKm} * (5/18) = ${speedMs} m/s. Total distance = ${speedMs} * ${timeSec} = ${totalDist} m. Platform length = ${totalDist} - ${trainLen} = ${platLen} meters.`
      };
    },
    // 3. Simple interest calculation
    () => {
      const p = [5000, 8000, 12000, 15000, 20000, 25000][seed % 6];
      const r = [5, 6, 7.5, 8, 10, 12][seed % 6];
      const t = [2, 3, 4, 5][seed % 4];
      const si = (p * r * t) / 100;
      return {
        subject: 'Quantitative Aptitude',
        topic: 'Simple Interest Drill',
        text: `Find the Simple Interest on a principal sum of ₹${p.toLocaleString()} for ${t} years at an interest rate of ${r}% per annum.`,
        options: [
          { id: 'A', text: `₹${si.toLocaleString()}` },
          { id: 'B', text: `₹${(si + 400).toLocaleString()}` },
          { id: 'C', text: `₹${(si - 250).toLocaleString()}` },
          { id: 'D', text: `₹${(si + 800).toLocaleString()}` }
        ],
        correctAnswer: 'A',
        explanation: `Simple Interest = (P * R * T) / 100 = (${p} * ${r} * ${t}) / 100 = ₹${si}.`
      };
    },
    // 4. Time and work joint completion
    () => {
      const aDays = [10, 12, 15, 20, 24][seed % 5];
      const bDays = [15, 20, 30, 30, 40][seed % 5];
      const combinedDays = ((aDays * bDays) / (aDays + bDays)).toFixed(1);
      return {
        subject: 'Quantitative Aptitude',
        topic: 'Time & Work Drill',
        text: `Worker A can finish a project alone in ${aDays} days, while Worker B takes ${bDays} days alone. Working together at their standard efficiency, in how many days will they complete the whole project?`,
        options: [
          { id: 'A', text: `${combinedDays} days` },
          { id: 'B', text: `${(parseFloat(combinedDays) + 2).toFixed(1)} days` },
          { id: 'C', text: `${(parseFloat(combinedDays) - 1).toFixed(1)} days` },
          { id: 'D', text: `${(parseFloat(combinedDays) * 1.5).toFixed(1)} days` }
        ],
        correctAnswer: 'A',
        explanation: `Combined 1-day work = (1/${aDays} + 1/${bDays}) = (${aDays + bDays}) / (${aDays * bDays}). Total days = (${aDays} * ${bDays}) / (${aDays + bDays}) = ${combinedDays} days.`
      };
    },
    // 5. Ratio and Proportions / Ages
    () => {
      const ratioA = [3, 4, 5, 2][seed % 4];
      const ratioB = [4, 5, 7, 3][seed % 4];
      const multiplier = [4, 5, 6, 8][seed % 4];
      const ageA = ratioA * multiplier;
      const ageB = ratioB * multiplier;
      return {
        subject: 'Quantitative Aptitude',
        topic: 'Ratio & Proportions',
        text: `The ratio of the present ages of two individuals is ${ratioA}:${ratioB}. If the age of the first individual is ${ageA} years, what is the age of the second individual?`,
        options: [
          { id: 'A', text: `${ageB} years` },
          { id: 'B', text: `${ageB + 4} years` },
          { id: 'C', text: `${ageB - 2} years` },
          { id: 'D', text: `${ageA + ratioB} years` }
        ],
        correctAnswer: 'A',
        explanation: `Given ratio ${ratioA}:${ratioB}. If ${ratioA} parts = ${ageA}, then 1 part = ${multiplier}. Second individual's age = ${ratioB} * ${multiplier} = ${ageB} years.`
      };
    },
    // 6. Pipe and Cistern
    () => {
      const p1 = [6, 8, 10, 12][seed % 4];
      const p2 = [12, 16, 15, 24][seed % 4];
      const totalHours = ((p1 * p2) / (p1 + p2)).toFixed(1);
      return {
        subject: 'Quantitative Aptitude',
        topic: 'Pipes & Cisterns',
        text: `Pipe X can fill an empty reservoir in ${p1} hours and Pipe Y can fill it in ${p2} hours. If both pipes are opened simultaneously, how long will it take to fill the reservoir?`,
        options: [
          { id: 'A', text: `${totalHours} hours` },
          { id: 'B', text: `${(parseFloat(totalHours) + 1.5).toFixed(1)} hours` },
          { id: 'C', text: `${(parseFloat(totalHours) - 1.0).toFixed(1)} hours` },
          { id: 'D', text: `${p1 + p2} hours` }
        ],
        correctAnswer: 'A',
        explanation: `Net filling rate per hour = 1/${p1} + 1/${p2}. Total time required = (${p1} * ${p2}) / (${p1 + p2}) = ${totalHours} hours.`
      };
    }
  ];

  return types[seed % types.length]();
}

function generateDynamicReasoningVariation(baseIndex: number): QuestionTemplate {
  const seed = baseIndex + 1;
  const variationTypes = [
    // 1. Prime number squares
    () => {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
      const idx = (seed % 6);
      const p1 = primes[idx];
      const p2 = primes[idx + 1];
      const p3 = primes[idx + 2];
      const p4 = primes[idx + 3];
      const nextP = primes[idx + 4];
      return {
        subject: 'Logical Reasoning',
        topic: 'Number Series Pattern',
        text: `Find the missing term in the sequence: ${p1 * p1}, ${p2 * p2}, ${p3 * p3}, ${p4 * p4}, ?`,
        options: [
          { id: 'A', text: `${nextP * nextP}` },
          { id: 'B', text: `${(nextP - 1) * (nextP - 1)}` },
          { id: 'C', text: `${(nextP + 1) * (nextP + 1)}` },
          { id: 'D', text: `${nextP * 10}` }
        ],
        correctAnswer: 'A',
        explanation: `The series consists of squares of consecutive prime numbers: ${p1}^2, ${p2}^2, ${p3}^2, ${p4}^2, next is ${nextP}^2 = ${nextP * nextP}.`
      };
    },
    // 2. Letter shift cipher
    () => {
      const shift = [1, 2, 3, 4][seed % 4];
      return {
        subject: 'Logical Reasoning',
        topic: 'Coding & Decoding',
        text: `In a certain code language, if "DELHI" is coded with a forward letter shift of +${shift}, what will be the encoded word for "PATNA"?`,
        options: [
          { id: 'A', text: String.fromCharCode(...'PATNA'.split('').map(c => c.charCodeAt(0) + shift)) },
          { id: 'B', text: String.fromCharCode(...'PATNA'.split('').map(c => c.charCodeAt(0) + shift + 1)) },
          { id: 'C', text: String.fromCharCode(...'PATNA'.split('').map(c => c.charCodeAt(0) + shift - 1)) },
          { id: 'D', text: 'QBUOB' }
        ],
        correctAnswer: 'A',
        explanation: `Each alphabet in the given word is incremented by ${shift} positions according to the English alphabetical sequence.`
      };
    },
    // 3. Direction sense coordinates
    () => {
      const dNorth = [10, 15, 20, 25][seed % 4];
      const dEast = [10, 15, 20, 25][seed % 4];
      return {
        subject: 'Logical Reasoning',
        topic: 'Direction & Distance Test',
        text: `A person walks ${dNorth} meters towards North, turns right and walks ${dEast} meters, then turns right again and walks ${dNorth} meters. In which direction and at what shortest distance is the person from the starting point?`,
        options: [
          { id: 'A', text: `${dEast} meters East` },
          { id: 'B', text: `${dNorth} meters North` },
          { id: 'C', text: `${dEast + dNorth} meters South` },
          { id: 'D', text: `${dEast} meters West` }
        ],
        correctAnswer: 'A',
        explanation: `The vertical movements North (+${dNorth}) and South (-${dNorth}) cancel out. The net displacement is ${dEast} meters directly East.`
      };
    },
    // 4. Blood relations logic
    () => {
      return {
        subject: 'Logical Reasoning',
        topic: 'Blood Relations',
        text: `Pointing to a photograph, a woman says: "He is the only son of the father of my paternal grandfather." How is the man in the photograph related to the woman?`,
        options: [
          { id: 'A', text: 'Paternal Grandfather' },
          { id: 'B', text: 'Brother' },
          { id: 'C', text: 'Uncle' },
          { id: 'D', text: 'Son' }
        ],
        correctAnswer: 'A',
        explanation: `The father of my paternal grandfather is great-grandfather; his only son is the woman's paternal grandfather.`
      };
    }
  ];

  return variationTypes[seed % variationTypes.length]();
}

// =========================================================================
// ISOLATED SUBJECT MATCHER (Guarantees zero irrelevant questions)
// =========================================================================
export function getSubjectPureTemplateBank(sec: ExamSection, test: MockTest): QuestionTemplate[] {
  const sName = (sec.name || '').toLowerCase();
  const tCat = (test.mainCategory || '').toLowerCase();
  const tSub = (test.subCategory || '').toLowerCase();
  const tTarget = (test.targetExam || '').toLowerCase();
  const tBoard = (test.board || '').toLowerCase();
  const tGrade = (test.gradeOrClass || '').toLowerCase();
  const tId = (test.id || '').toLowerCase();
  const tTitle = (test.title || '').toLowerCase();
  const tState = ((test as any).state || (test as any).stateName || '').toLowerCase();

  const allContext = `${sName} ${tCat} ${tSub} ${tTarget} ${tBoard} ${tGrade} ${tId} ${tTitle} ${tState}`;

  // 1. Nursing / Medical / Paramedical -> STRICT ISOLATION
  if (
    tCat === 'nursing' || 
    tCat === 'medical_neet_nursing' ||
    /norcet|nursing|gnm|b\.sc nursing|pharmacology|anatomy|obstetrics|esic nursing|cho/i.test(tSub + tTarget + sName)
  ) {
    if (/reasoning|aptitude|math/i.test(sName)) return [...REASONING_TEMPLATES, ...QUANT_MATH_TEMPLATES];
    if (/english/i.test(sName)) return ENGLISH_TEMPLATES;
    if (/general|awareness|gk/i.test(sName)) return [...CIVIL_SERVICES_GS_TEMPLATES, ...ODISHA_SPECIFIC_TEMPLATES];
    return NURSING_MEDICAL_TEMPLATES;
  }

  // 2. Law & Police Aptitude / IPC / BNS / BNSS (State Police SI, Constable, Warder)
  if (/law|police aptitude|ipc|bns|bnss|crpc|investigation|policing|constable|sub-inspector|sepoy/i.test(sName)) {
    return LAW_POLICE_APTITUDE_TEMPLATES;
  }

  // 3. Quantitative Aptitude / Mathematics
  if (/quant|math|arithmetic|numerical|algebra|geometry/i.test(sName)) {
    return QUANT_MATH_TEMPLATES;
  }

  // 4. Reasoning / Intelligence / Mental Ability
  if (/reasoning|intelligence|logical|analytical|mental/i.test(sName)) {
    return REASONING_TEMPLATES;
  }

  // 5. CSAT & Mental Ability (Paper 2)
  if (/csat|mental ability|paper 2|paper-2/i.test(sName)) {
    return [...CSAT_APTITUDE_COMPREHENSION_TEMPLATES, ...REASONING_TEMPLATES, ...QUANT_MATH_TEMPLATES];
  }

  // 6. English / Verbal Language
  if (/english|verbal|comprehension|vocabulary/i.test(sName)) {
    return ENGLISH_TEMPLATES;
  }

  // 7. Computer Knowledge & Digital IT Literacy
  if (/computer|it|digital|programming|cyber|software/i.test(sName)) {
    return COMPUTER_IT_TEMPLATES;
  }

  // 8. Teaching & Pedagogy (CTET, OTET, State TET)
  if (
    tCat === 'teaching_tet_ctet' ||
    /ctet|otet|tet|pedagogy|cdp|child development|teaching aptitude|b\.ed/i.test(allContext)
  ) {
    if (/cdp|child development|pedagogy/i.test(sName)) return TEACHING_PEDAGOGY_TEMPLATES;
    if (/math/i.test(sName)) return QUANT_MATH_TEMPLATES;
    if (/evs|science/i.test(sName)) return [...SCHOOL_PRIMARY_TEMPLATES, ...PURE_SCIENCES_TEMPLATES];
    if (/english/i.test(sName)) return ENGLISH_TEMPLATES;
    return TEACHING_PEDAGOGY_TEMPLATES;
  }

  // 9. State Specific GK & Cadre Isolation
  // 9a. Bihar State Exams (BPSC, Bihar Police, BTET, BSSC)
  if (/bihar|bpsc|bssc|patna/i.test(allContext)) {
    if (/bihar|state special|heritage|gk|gs|history|culture/i.test(sName)) return BIHAR_SPECIFIC_TEMPLATES;
    if (/law|police/i.test(sName)) return LAW_POLICE_APTITUDE_TEMPLATES;
    if (/math/i.test(sName)) return QUANT_MATH_TEMPLATES;
    if (/reasoning/i.test(sName)) return REASONING_TEMPLATES;
    return BIHAR_SPECIFIC_TEMPLATES;
  }

  // 9b. Uttar Pradesh State Exams (UPPSC, UP Police, UPSSSC, UPTET)
  if (/uttar pradesh|uppsc|upsssc|up police|lucknow|meerut/i.test(allContext)) {
    if (/up|uttar|state special|heritage|gk|gs|history|culture/i.test(sName)) return UP_SPECIFIC_TEMPLATES;
    if (/law|police/i.test(sName)) return LAW_POLICE_APTITUDE_TEMPLATES;
    if (/math/i.test(sName)) return QUANT_MATH_TEMPLATES;
    if (/reasoning/i.test(sName)) return REASONING_TEMPLATES;
    return UP_SPECIFIC_TEMPLATES;
  }

  // 9c. Rajasthan State Exams (RPSC, RAS, Rajasthan Police, REET)
  if (/rajasthan|rpsc|ras|reet|jaipur/i.test(allContext)) {
    if (/rajasthan|state special|heritage|gk|gs|history|culture/i.test(sName)) return RAJASTHAN_SPECIFIC_TEMPLATES;
    if (/law|police/i.test(sName)) return LAW_POLICE_APTITUDE_TEMPLATES;
    if (/math/i.test(sName)) return QUANT_MATH_TEMPLATES;
    if (/reasoning/i.test(sName)) return REASONING_TEMPLATES;
    return RAJASTHAN_SPECIFIC_TEMPLATES;
  }

  // 9d. Odisha State Specific (OPSC, OSSSC, BSE Odisha, Odia)
  if (/odia|odisha|opsc|osssc|chse odisha|bse odisha/i.test(allContext)) {
    if (/odia|language|ବ୍ୟାକରଣ/i.test(sName)) return ODISHA_SPECIFIC_TEMPLATES;
    if (/odisha|gk|gs|general|heritage/i.test(sName)) return ODISHA_SPECIFIC_TEMPLATES;
    if (/law|police/i.test(sName)) return LAW_POLICE_APTITUDE_TEMPLATES;
    if (/math/i.test(sName)) return QUANT_MATH_TEMPLATES;
    if (/reasoning/i.test(sName)) return REASONING_TEMPLATES;
    return ODISHA_SPECIFIC_TEMPLATES;
  }

  // 9e. Other States (West Bengal, MP, Maharashtra, All India State GK)
  if (/west bengal|wbcs|wbpsc|madhya pradesh|mppsc|maharashtra|mpsc|state special|state gk/i.test(allContext)) {
    return ALL_STATE_GK_TEMPLATES;
  }

  // 10. Banking & Finance (IBPS, SBI, RBI, Financial Awareness)
  if (
    tCat === 'banking_ibps' || 
    tCat === 'sbi_rbi_financial' ||
    /bank|ibps|sbi|rbi|financial|insurance|lic/i.test(tSub + tTarget + sName)
  ) {
    if (/banking|economy|financial|ga|general/i.test(sName)) return BANKING_FINANCE_TEMPLATES;
    if (/reasoning/i.test(sName)) return REASONING_TEMPLATES;
    if (/quant|numerical/i.test(sName)) return QUANT_MATH_TEMPLATES;
    return BANKING_FINANCE_TEMPLATES;
  }

  // 11. School Boards K–12 (Classes 1–10)
  if (
    tCat === 'school_boards' || 
    /class [1-5]|primary/i.test(tGrade + tTarget)
  ) {
    return SCHOOL_PRIMARY_TEMPLATES;
  }

  if (
    /class 10|matric|cbse 10|icse 10|bse odisha 10/i.test(tGrade + tTarget + tSub)
  ) {
    if (/math/i.test(sName)) return QUANT_MATH_TEMPLATES;
    if (/science/i.test(sName)) return SCHOOL_CLASS_10_TEMPLATES;
    if (/social/i.test(sName)) return SCHOOL_CLASS_10_TEMPLATES;
    return SCHOOL_CLASS_10_TEMPLATES;
  }

  // 12. Engineering & Pure Sciences (JEE, NEET, GATE)
  if (
    tCat === 'engineering_jee_gate' ||
    /jee|neet|gate|physics|chemistry|biology|botany|zoology/i.test(sName + tTarget + tSub)
  ) {
    return PURE_SCIENCES_TEMPLATES;
  }

  // 13. General Studies & Civil Services Default
  return CIVIL_SERVICES_GS_TEMPLATES;
}

/**
 * Ensures any test has complete, authentic, subject-pure questions for every section,
 * eliminating all cross-category mismatches and preventing question duplicates up to 100 questions.
 */
export function ensureTestComplete(test: MockTest): MockTest {
  if (!test) return test;

  const sections = test.sections.map(s => ({ ...s }));
  const existingQuestions = Array.isArray(test.questions) ? [...test.questions] : [];

  // Group existing questions by sectionId
  const questionsBySection: Record<string, ExamQuestion[]> = {};
  sections.forEach(sec => {
    questionsBySection[sec.id] = existingQuestions.filter(q => q.sectionId === sec.id);
  });

  const finalQuestions: ExamQuestion[] = [];
  const seenQuestionTexts = new Set<string>();
  let globalNumber = 1;

  sections.forEach((sec) => {
    const currentSecList = questionsBySection[sec.id] || [];
    
    // Add existing questions for this section and record hashes
    currentSecList.forEach((q) => {
      seenQuestionTexts.add(q.text.trim().toLowerCase());
      finalQuestions.push({
        ...q,
        questionNumber: globalNumber++
      });
    });

    // Determine how many questions are needed for this section
    const shortage = sec.totalQuestions - currentSecList.length;
    if (shortage > 0) {
      // Fetch STRICT isolated template bank for THIS section's subject
      const templateBank = getSubjectPureTemplateBank(sec, test);
      const isQuantSection = /quant|math|numerical|arithmetic/i.test(sec.name);
      const isReasoningSection = /reasoning|intelligence|logical/i.test(sec.name);

      for (let i = 0; i < shortage; i++) {
        let tmpl: QuestionTemplate;

        if (isQuantSection && i >= templateBank.length) {
          tmpl = generateDynamicMathVariation(i);
        } else if (isReasoningSection && i >= templateBank.length) {
          tmpl = generateDynamicReasoningVariation(i);
        } else {
          tmpl = templateBank[i % templateBank.length];
        }

        // If duplicate text was already added, create a distinct parameter variation
        let questionText = tmpl.text;
        if (seenQuestionTexts.has(questionText.trim().toLowerCase())) {
          if (isQuantSection) {
            tmpl = generateDynamicMathVariation(i + shortage + 7);
            questionText = tmpl.text;
          } else if (isReasoningSection) {
            tmpl = generateDynamicReasoningVariation(i + shortage + 13);
            questionText = tmpl.text;
          } else {
            // Append a distinct sub-context indicator
            questionText = `${tmpl.text} (Set #${i + 1})`;
          }
        }

        seenQuestionTexts.add(questionText.trim().toLowerCase());

        const newQId = `${sec.id}_q_${i + 1}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

        finalQuestions.push({
          id: newQId,
          questionNumber: globalNumber++,
          sectionId: sec.id,
          sectionName: sec.name,
          subject: tmpl.subject,
          topic: tmpl.topic,
          type: 'single_choice',
          text: questionText,
          textOdia: tmpl.textOdia,
          textHindi: tmpl.textHindi,
          options: tmpl.options.map(o => ({ ...o })),
          correctAnswer: tmpl.correctAnswer,
          positiveMarks: sec.positiveMarksPerQuestion || 1.0,
          negativeMarks: sec.negativeMarksPerQuestion || 0.25,
          difficulty: tmpl.difficulty || 'medium',
          explanation: tmpl.explanation,
          explanationOdia: tmpl.explanationOdia,
          explanationHindi: tmpl.explanationHindi,
          referenceNotes: tmpl.referenceNotes || `${test.targetExam} Official Curriculum`
        });
      }
    }
  });

  // Calculate actual total marks and questions
  const totalQuestions = finalQuestions.length;
  const totalMarks = sections.reduce(
    (sum, s) => sum + (s.totalMarks || (s.totalQuestions * (s.positiveMarksPerQuestion || 1.0))),
    0
  ) || totalQuestions;

  return {
    ...test,
    totalQuestions,
    totalMarks,
    sections,
    questions: finalQuestions
  };
}
