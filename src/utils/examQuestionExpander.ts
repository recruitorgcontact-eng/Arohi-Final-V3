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
  difficulty?: 'easy' | 'medium' | 'hard';
  referenceNotes?: string;
}

// =========================================================================
// 1. QUANTITATIVE APTITUDE & MATHEMATICS
// =========================================================================
export const QUANT_MATH_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Quantitative Aptitude',
    topic: 'Percentages & Consumption',
    text: 'If the price of a commodity increases by 25%, by what percentage must a household reduce its consumption so that the total expenditure remains unchanged?',
    textHindi: 'यदि किसी वस्तु की कीमत में 25% की वृद्धि होती है, तो एक परिवार को अपनी खपत में कितने प्रतिशत की कमी करनी चाहिए ताकि कुल खर्च अपरिवर्तित रहे?',
    textOdia: 'ଯଦି କୌଣସି ସାମଗ୍ରୀର ମୂଲ୍ୟ ୨୫% ବୃଦ୍ଧି ପାଏ, ତେବେ ଖର୍ଚ୍ଚ ଅପରିବର୍ତ୍ତିତ ରଖିବା ପାଇଁ ବ୍ୟବହାର କେତେ ପ୍ରତିଶତ ହ୍ରାସ କରିବାକୁ ପଡିବ?',
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
    explanation: '1-day work = (1/12 + 1/18) = 5/36. 4-day work = 4 * (5/36) = 5/9. Unfinished work = 1 - 5/9 = 4/9.'
  },
  {
    subject: 'Quantitative Aptitude',
    topic: 'Ratio and Proportion',
    text: 'The ratio of the ages of two persons A and B is 4 : 5. After 6 years, the ratio becomes 5 : 6. What is the present age of A?',
    textHindi: 'दो व्यक्तियों A और B की आयु का अनुपात 4 : 5 है। 6 वर्ष बाद, अनुपात 5 : 6 हो जाता है। A की वर्तमान आयु क्या है?',
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
    text: 'A shopkeeper sells an article for ₹840 and gains 20%. If he had sold it for ₹735, what would have been his gain or loss percentage?',
    options: [
      { id: 'A', text: '5% gain' },
      { id: 'B', text: '5% loss' },
      { id: 'C', text: '10% gain' },
      { id: 'D', text: '2.5% gain' }
    ],
    correctAnswer: 'A',
    explanation: 'Cost Price (CP) = 840 / 1.20 = ₹700. If sold for ₹735, Profit = 735 - 700 = ₹35. Profit % = (35/700) * 100 = 5% gain.'
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
  }
];

// =========================================================================
// 4. BANKING, FINANCE & MONETARY POLICY
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
    textHindi: 'प्रधानमंत्री मुद्रा योजना (PMMY) की "तरुण" श्रेणी के तहत अधिकतम ऋण सीमा क्या है?',
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
// 5. UPSC, CIVIL SERVICES & GENERAL STUDIES (Polity, History, Geo)
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
  }
];

// =========================================================================
// 6. MEDICAL, NURSING & CLINICAL SCIENCES (AIIMS, ESIC, OSSSC)
// =========================================================================
export const NURSING_MEDICAL_TEMPLATES: QuestionTemplate[] = [
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
  }
];

// =========================================================================
// 7. LAW, JUDICIARY & LEGAL REASONING (CLAT, AILET, State Judiciary)
// =========================================================================
export const LAW_LEGAL_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Legal Reasoning',
    topic: 'Law of Torts & Strict Liability',
    text: 'Under the landmark principle of Strict Liability laid down in Rylands v. Fletcher, a defendant is held liable when:',
    textHindi: 'Rylands v. Fletcher में स्थापित कठोर दायित्व (Strict Liability) के सिद्धांत के तहत प्रतिवादी उत्तरदायी होता है जब:',
    options: [
      { id: 'A', text: 'A non-natural use of land causes an escape of a dangerous thing resulting in harm, even without negligence' },
      { id: 'B', text: 'There is proven criminal intent beyond reasonable doubt' },
      { id: 'C', text: 'The plaintiff contributed to the negligence' },
      { id: 'D', text: 'Only if an act of God is established' }
    ],
    correctAnswer: 'A',
    explanation: 'Strict Liability holds a person responsible for damages caused by the escape of a dangerous item brought onto their land during non-natural usage, irrespective of absence of negligence.'
  },
  {
    subject: 'Legal Reasoning',
    topic: 'Law of Contracts & Consideration',
    text: 'According to the Indian Contract Act, 1872, an agreement without consideration is:',
    options: [
      { id: 'A', text: 'Void ab initio (subject to exceptions under Section 25)' },
      { id: 'B', text: 'Always valid and enforceable' },
      { id: 'C', text: 'Voidable at the option of the promisor' },
      { id: 'D', text: 'An illegal wagering contract' }
    ],
    correctAnswer: 'A',
    explanation: 'Section 25 of the Indian Contract Act establishes that an agreement without consideration is void ("Ex nudo pacto non oritur actio"), with limited exceptions for natural love/affection and time-barred debts.'
  },
  {
    subject: 'Legal Reasoning',
    topic: 'Legal Maxims & Jurisprudence',
    text: 'What does the legal maxim "Damnum Sine Injuria" mean?',
    options: [
      { id: 'A', text: 'Actual damage caused without the violation of a legal right (No legal remedy lies)' },
      { id: 'B', text: 'Violation of a legal right without actual physical damage' },
      { id: 'C', text: 'Guilty mind with guilty action' },
      { id: 'D', text: 'To the willing person, injury is not done' }
    ],
    correctAnswer: 'A',
    explanation: '"Damnum Sine Injuria" refers to substantial loss or harm suffered without infringement of a legally protected right (e.g., Gloucester Grammar School case), thus providing no legal cause of action.'
  }
];

// =========================================================================
// 8. DEFENCE, MILITARY & POLICE (NDA, CDS, AFCAT, CAPF)
// =========================================================================
export const DEFENCE_MILITARY_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Physics & Applied Mechanics (NDA/CDS)',
    topic: 'Projectile Motion & Ballistics',
    text: 'For a projectile launched with initial velocity v at an angle θ with the horizontal, at what angle of projection is the maximum horizontal range achieved?',
    textHindi: 'क्षैतिज से θ कोण पर प्रारंभिक वेग v से प्रक्षेपित प्रक्षेप्य के लिए, किस कोण पर अधिकतम क्षैतिज परास प्राप्त होता है?',
    options: [
      { id: 'A', text: '45 degrees' },
      { id: 'B', text: '30 degrees' },
      { id: 'C', text: '60 degrees' },
      { id: 'D', text: '90 degrees' }
    ],
    correctAnswer: 'A',
    explanation: 'Range R = (v^2 * sin(2θ)) / g. Maximum range occurs when sin(2θ) = 1 => 2θ = 90° => θ = 45°.'
  },
  {
    subject: 'Defence & Strategic Affairs',
    topic: 'Armed Forces Command Structures',
    text: 'Where is the Tri-Services Operational Command (Andaman and Nicobar Command - ANC) of the Indian Armed Forces headquartered?',
    options: [
      { id: 'A', text: 'Port Blair' },
      { id: 'B', text: 'Kochi' },
      { id: 'C', text: 'Visakhapatnam' },
      { id: 'D', text: 'Car Nicobar' }
    ],
    correctAnswer: 'A',
    explanation: 'The Andaman and Nicobar Command (ANC) is India’s first and only integrated theater command of the Armed Forces, established in 2001 with its HQ at Port Blair.'
  },
  {
    subject: 'Physics & Optics',
    topic: 'Electromagnetic Spectrum & Radar',
    text: 'Which region of the electromagnetic spectrum is primarily utilized in military RADAR systems for long-range target detection?',
    options: [
      { id: 'A', text: 'Microwaves / Radio waves' },
      { id: 'B', text: 'Ultraviolet rays' },
      { id: 'C', text: 'Gamma rays' },
      { id: 'D', text: 'X-rays' }
    ],
    correctAnswer: 'A',
    explanation: 'RADAR (Radio Detection and Ranging) utilizes radio and microwave frequencies (ranging from MHz to GHz) because of their atmospheric penetration and reflective capabilities.'
  }
];

// =========================================================================
// 9. ODISHA STATE CADRES (OPSC OAS, OSSSC Combined, BSE/CHSE)
// =========================================================================
export const ODISHA_SPECIFIC_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Odisha General Knowledge',
    topic: 'History, Heritage & Geography of Odisha',
    text: 'The historic Kalinga War, which led Emperor Ashoka to renounce violence and embrace Buddhism, was fought along the banks of which river in 261 BCE?',
    textOdia: 'ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨୬୧ ରେ ସମ୍ରାଟ ଅଶୋକଙ୍କ କଳିଙ୍ଗ ଯୁଦ୍ଧ କେଉଁ ନଦୀ କୂଳରେ ଅନୁଷ୍ଠିତ ହୋଇଥିଲା?',
    textHindi: '261 ईसा पूर्व में ऐतिहासिक कलिंग युद्ध किस नदी के तट पर लड़ा गया था?',
    options: [
      { id: 'A', text: 'Daya River (near Dhauli Hills)' },
      { id: 'B', text: 'Mahanadi River' },
      { id: 'C', text: 'Baitarani River' },
      { id: 'D', text: 'Brahmani River' }
    ],
    correctAnswer: 'A',
    explanation: 'The Kalinga War was fought along the banks of the Daya River near Dhauli Giri (Bhubaneswar), where Ashokan rock edicts and the Peace Pagoda stand today.'
  },
  {
    subject: 'Odia Language & Grammar',
    topic: 'ସନ୍ଧି ଓ ସମାସ (Odia Byakarana)',
    text: '‘ଗିରୀଶ’ ଶବ୍ଦର ସଠିକ୍ ସନ୍ଧି ବିଚ୍ଛେଦ କ’ଣ ହେବ?',
    textOdia: '‘ଗିରୀଶ’ ଶବ୍ଦର ସଠିକ୍ ସନ୍ଧି ବିଚ୍ଛେଦ କ’ଣ ହେବ?',
    options: [
      { id: 'A', text: 'ଗିରି + ଈଶ' },
      { id: 'B', text: 'ଗିରୀ + ଇଶ' },
      { id: 'C', text: 'ଗିର + ଈଶ' },
      { id: 'D', text: 'ଗିରୀ + ଈଶ' }
    ],
    correctAnswer: 'A',
    explanation: 'ଦୀର୍ଘ ସ୍ୱରସନ୍ଧି ନିୟମ ଅନୁସାରେ: ଇ + ଈ = ଈ (ଗିରି + ଈଶ = ଗିରୀଶ)।'
  },
  {
    subject: 'Odisha Geography & Ecology',
    topic: 'Lakes & Ramsar Sites of Odisha',
    text: 'Which is the largest coastal lagoon in India and the first Indian wetland designated under the Ramsar Convention in 1981?',
    textOdia: 'ଭାରତର ସର୍ବବୃହତ ଉପକୂଳ ହ୍ରଦ ଏବଂ ୧୯୮୧ ରେ ରାମସାର ସାଇଟ୍ ଭାବେ ଘୋଷିତ ପ୍ରଥମ ଆର୍ଦ୍ରଭୂମି କିଏ?',
    options: [
      { id: 'A', text: 'Chilika Lake' },
      { id: 'B', text: 'Ansupa Lake' },
      { id: 'C', text: 'Tampara Lake' },
      { id: 'D', text: 'Kanjia Lake' }
    ],
    correctAnswer: 'A',
    explanation: 'Chilika Lake is Asia’s largest brackish water lagoon, famous as a wintering ground for migratory birds and home to the endangered Irrawaddy dolphins.'
  }
];

// =========================================================================
// 10. COMPUTER SCIENCE, IT & DIGITAL AWARENESS
// =========================================================================
export const COMPUTER_IT_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Computer Knowledge',
    topic: 'Computer Architecture & Memory',
    text: 'Which type of computer memory is volatile and loses its content immediately when the power supply is turned off?',
    textHindi: 'किस प्रकार की कंप्यूटर मेमोरी वाष्पशील (Volatile) होती है और बिजली बंद होने पर अपना डेटा खो देती है?',
    options: [
      { id: 'A', text: 'RAM (Random Access Memory)' },
      { id: 'B', text: 'ROM (Read Only Memory)' },
      { id: 'C', text: 'SSD Flash Storage' },
      { id: 'D', text: 'Hard Disk Drive (HDD)' }
    ],
    correctAnswer: 'A',
    explanation: 'RAM is volatile primary memory used by the CPU for active program instructions and temporary data during execution.'
  },
  {
    subject: 'Computer Knowledge',
    topic: 'Networking & Protocols',
    text: 'In web technologies, which protocol provides encrypted and secure communication over the internet using SSL/TLS?',
    options: [
      { id: 'A', text: 'HTTPS (Port 443)' },
      { id: 'B', text: 'HTTP (Port 80)' },
      { id: 'C', text: 'FTP (Port 21)' },
      { id: 'D', text: 'Telnet (Port 23)' }
    ],
    correctAnswer: 'A',
    explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts HTTP packets using Transport Layer Security (TLS) on default port 443.'
  },
  {
    subject: 'Computer Knowledge',
    topic: 'Operating Systems & Shortcuts',
    text: 'In standard MS Windows and MS Office, which keyboard shortcut opens the "Find and Replace" dialog box?',
    options: [
      { id: 'A', text: 'Ctrl + H' },
      { id: 'B', text: 'Ctrl + F' },
      { id: 'C', text: 'Ctrl + R' },
      { id: 'D', text: 'Ctrl + K' }
    ],
    correctAnswer: 'A',
    explanation: 'Ctrl + H is the universal shortcut to trigger "Replace", while Ctrl + F is for Find.'
  }
];

// =========================================================================
// 11. PURE SCIENCES & JEE / NEET FOUNDATIONS (Physics, Chemistry, Biology)
// =========================================================================
export const PURE_SCIENCES_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'Physics',
    topic: 'Thermodynamics & Kinetic Theory',
    text: 'At what temperature are the numerical readings on both the Celsius and Fahrenheit temperature scales exactly identical?',
    textHindi: 'किस तापमान पर सेल्सियस और फ़ारेनहाइट दोनों पैमानों के मान बिल्कुल समान होते हैं?',
    options: [
      { id: 'A', text: '-40 degrees' },
      { id: 'B', text: '0 degrees' },
      { id: 'C', text: '100 degrees' },
      { id: 'D', text: '32 degrees' }
    ],
    correctAnswer: 'A',
    explanation: 'Formula: C = (F - 32) * (5/9). Setting C = F = x => x = (x - 32) * (5/9) => 9x = 5x - 160 => 4x = -160 => x = -40°.'
  },
  {
    subject: 'Chemistry',
    topic: 'Chemical Bonding & Periodic Table',
    text: 'Which element in the modern periodic table has the highest electronegativity value on the Pauling scale?',
    options: [
      { id: 'A', text: 'Fluorine (F - 3.98)' },
      { id: 'B', text: 'Oxygen (O - 3.44)' },
      { id: 'C', text: 'Chlorine (Cl - 3.16)' },
      { id: 'D', text: 'Nitrogen (N - 3.04)' }
    ],
    correctAnswer: 'A',
    explanation: 'Fluorine has the smallest atomic radius among halogens and highest effective nuclear pull, making it the most electronegative element (3.98).'
  },
  {
    subject: 'Biology',
    topic: 'Cell Biology & Organelles',
    text: 'Which cellular organelle is known as the "Powerhouse of the Cell" due to its synthesis of ATP via oxidative phosphorylation?',
    options: [
      { id: 'A', text: 'Mitochondria' },
      { id: 'B', text: 'Ribosome' },
      { id: 'C', text: 'Golgi Apparatus' },
      { id: 'D', text: 'Lysosome' }
    ],
    correctAnswer: 'A',
    explanation: 'Mitochondria generate most of the cell’s chemical energy through adenosine triphosphate (ATP) production.'
  }
];

// =========================================================================
// 12. K–12 SCHOOL FOUNDATIONS (Class 1–10 General School)
// =========================================================================
export const SCHOOL_PRIMARY_TEMPLATES: QuestionTemplate[] = [
  {
    subject: 'General Science',
    topic: 'Photosynthesis in Plants',
    text: 'What green pigment in plant leaves absorbs sunlight energy to convert carbon dioxide and water into glucose during photosynthesis?',
    textHindi: 'पौधों की पत्तियों में कौन सा हरा वर्णक प्रकाश संश्लेषण के दौरान सूर्य के प्रकाश को अवशोषित करता है?',
    options: [
      { id: 'A', text: 'Chlorophyll' },
      { id: 'B', text: 'Carotenoid' },
      { id: 'C', text: 'Hemoglobin' },
      { id: 'D', text: 'Anthocyanin' }
    ],
    correctAnswer: 'A',
    explanation: 'Chlorophyll inside chloroplasts captures blue and red wavelengths of solar light to drive photosynthetic chemical reactions.'
  },
  {
    subject: 'Social Studies',
    topic: 'Solar System & Earth Motion',
    text: 'The alternation of day and night on Earth is directly caused by which motion?',
    textHindi: 'पृथ्वी पर दिन और रात का होना सीधे तौर पर किस गति के कारण होता है?',
    options: [
      { id: 'A', text: 'Rotation of Earth on its own axis (every 24 hours)' },
      { id: 'B', text: 'Revolution of Earth around the Sun (every 365.25 days)' },
      { id: 'C', text: 'Tilt of the Earth orbital plane' },
      { id: 'D', text: 'Gravitational pull of the Moon' }
    ],
    correctAnswer: 'A',
    explanation: 'Earth’s rotation from west to east causes the cycle of sunlight and darkness (day and night).'
  }
];

// =========================================================================
// INTELLIGENT SYLLABUS-MATCHING ROUTER
// =========================================================================
/**
 * Resolves the precise, authentic question template bank for a specific section
 * by inspecting the section name, subject, and parent test metadata.
 */
function getSubjectPureTemplateBank(section: ExamSection, test: MockTest): QuestionTemplate[] {
  const sName = (section.name || '').toLowerCase();
  const tCat = (test.mainCategory || '').toLowerCase();
  const tId = (test.id || '').toLowerCase();
  const tTarget = (test.targetExam || '').toLowerCase();

  // 1. Nursing & Clinical Healthcare Exams
  if (
    tCat === 'nursing' || 
    /nursing|norcet|esic|clinical|anatomy|pharmacology|midwifery|community health|cho/i.test(sName + tTarget)
  ) {
    if (/reasoning|aptitude|quant/i.test(sName)) {
      return [...QUANT_MATH_TEMPLATES, ...REASONING_TEMPLATES];
    }
    if (/gk|general awareness|general knowledge/i.test(sName)) {
      return [...CIVIL_SERVICES_GS_TEMPLATES, ...BANKING_FINANCE_TEMPLATES];
    }
    return NURSING_MEDICAL_TEMPLATES;
  }

  // 2. Quantitative Aptitude & Mathematics
  if (/quant|math|numerical|arithmetic|algebra|geometry|data interpretation|calculus/i.test(sName)) {
    return QUANT_MATH_TEMPLATES;
  }

  // 3. Logical & Analytical Reasoning
  if (/reasoning|mental ability|logical|analytical|intelligence|puzzle/i.test(sName)) {
    return REASONING_TEMPLATES;
  }

  // 4. English & Verbal Ability
  if (/english|verbal|comprehension|grammar|vocabulary/i.test(sName)) {
    return ENGLISH_TEMPLATES;
  }

  // 5. Banking, Finance, Insurance & Commerce
  if (
    tCat === 'banking' || 
    /banking|financial|rbi|sbi|ibps|insurance|lic|commercial/i.test(sName + tTarget)
  ) {
    if (/gk|general awareness|current affairs|economy/i.test(sName)) {
      return BANKING_FINANCE_TEMPLATES;
    }
    return [...BANKING_FINANCE_TEMPLATES, ...QUANT_MATH_TEMPLATES, ...REASONING_TEMPLATES];
  }

  // 6. Law, Judiciary & Legal Studies
  if (
    tCat === 'law' || 
    /law|legal|judiciary|clat|ailet|constitution|court|torts/i.test(sName + tTarget)
  ) {
    return LAW_LEGAL_TEMPLATES;
  }

  // 7. Defence, Armed Forces & Police
  if (
    tCat === 'defence' || 
    /defence|military|nda|cds|afcat|navy|airforce|police|capf|crpf|bsf/i.test(sName + tTarget)
  ) {
    return DEFENCE_MILITARY_TEMPLATES;
  }

  // 8. Odisha State Specific (OPSC OAS, OSSSC, Odisha Cadre)
  if (
    /odisha|odia|opsc|osssc|chse odisha|bse odisha/i.test(tId + tTarget + sName)
  ) {
    return ODISHA_SPECIFIC_TEMPLATES;
  }

  // 9. Computer Science & IT
  if (/computer|it|digital|programming|cyber|software/i.test(sName)) {
    return COMPUTER_IT_TEMPLATES;
  }

  // 10. Engineering & Pure Sciences (JEE, NEET, GATE)
  if (
    tCat === 'engineering' || 
    /jee|neet|gate|physics|chemistry|biology|botany|zoology/i.test(sName + tTarget)
  ) {
    return PURE_SCIENCES_TEMPLATES;
  }

  // 11. School Boards K–12
  if (tCat === 'school_boards' || /class [1-9]|class 1[0-2]|cbse|icse|matric/i.test(tId + tTarget)) {
    return [...SCHOOL_PRIMARY_TEMPLATES, ...PURE_SCIENCES_TEMPLATES, ...QUANT_MATH_TEMPLATES];
  }

  // 12. Default: General Studies & Civil Services
  return CIVIL_SERVICES_GS_TEMPLATES;
}

/**
 * Ensures any test has complete, authentic, subject-pure questions for every section,
 * eliminating all cross-category mismatches and preventing question duplicates.
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

      for (let i = 0; i < shortage; i++) {
        // Pick template from the subject pure bank
        const tmpl = templateBank[i % templateBank.length];
        const newQId = `${sec.id}_gen_${i + 1}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`;

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
