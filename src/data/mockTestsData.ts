import { MockTest } from '../types/examTypes';

export const INITIAL_MOCK_TESTS: MockTest[] = [
  // 1. AIIMS NORCET 2026 Grand Mock Test (Nursing)
  {
    id: 'test_aiims_norcet_2026',
    slug: 'aiims-norcet-2026-grand-mock',
    title: 'AIIMS NORCET 2026 Nursing Officer Grand Mock Test',
    titleOdia: 'ଏମ୍ସ NORCET ୨୦୨୬ ନର୍ସିଂ ଅଫିସର ଗ୍ରାଣ୍ଡ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Exact AIIMS NORCET CBT pattern with 80% Nursing Core + 20% General Knowledge, Aptitude & Clinical Skill scenarios.',
    mainCategory: 'nursing',
    subCategory: 'aiims_norcet',
    categoryLabel: 'Nursing & AIIMS',
    targetExam: 'AIIMS NORCET 2026',
    gradeOrClass: 'B.Sc Nursing / GNM',
    board: 'AIIMS New Delhi',
    durationMinutes: 90,
    totalQuestions: 25,
    totalMarks: 25,
    isLive: true,
    isFree: true,
    featuredBadge: 'AIIMS Real CBT Simulation',
    attemptsCount: 14820,
    averageScore: 16.4,
    cutoffEstimated: 15.5,
    createdAt: '2026-02-15T10:00:00Z',
    instructions: [
      'Total duration is 90 minutes. Test contains 25 questions representing standard NORCET sections.',
      'Marking Scheme: +1.0 Mark for each correct answer; -0.33 Mark penalty for each wrong answer.',
      'Sections include Medical Surgical Nursing, OBG, Pediatrics, Pharmacology, Fundamentals, GK & Reasoning.',
      'You can switch between sections at any point. Do not refresh or close browser while test is in progress.'
    ],
    sections: [
      { id: 'sec_nurs_core', name: 'Nursing Core & Clinical Scenarios', totalQuestions: 20, totalMarks: 20, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 },
      { id: 'sec_gen_apt', name: 'General Awareness & Reasoning', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }
    ],
    questions: [
      {
        id: 'norcet_q1',
        questionNumber: 1,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Medical Surgical Nursing',
        topic: 'Cardiovascular System & Emergency ECG',
        type: 'single_choice',
        text: 'A patient admitted to the ICCU suddenly develops Ventricular Fibrillation (V-Fib) on the cardiac monitor. What is the immediate first-line nursing priority action?',
        textHindi: 'ICCU में भर्ती एक मरीज के कार्डियक मॉनिटर पर अचानक वेंट्रिकुलर फिब्रिलेशन (V-Fib) दिखाई देता है। पहली प्राथमिकता वाली नर्सिंग कार्रवाई क्या है?',
        options: [
          { id: 'A', text: 'Administer IV Amiodarone 300 mg bolus immediately' },
          { id: 'B', text: 'Initiate high-quality CPR and prepare for immediate unsynchronized Defibrillation' },
          { id: 'C', text: 'Perform synchronized cardioversion at 50 Joules' },
          { id: 'D', text: 'Check carotid pulse for at least 30 seconds before taking action' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'According to ACLS guidelines, Ventricular Fibrillation (V-Fib) is a shockable pulseless cardiac arrest rhythm. The immediate intervention is initiating high-quality CPR and early unsynchronized defibrillation (120-200J biphasic or 360J monophasic). Synchronized cardioversion is contraindicated for VF.',
        referenceNotes: 'AHA ACLS 2025-2026 Guidelines - Cardiac Arrest Protocol'
      },
      {
        id: 'norcet_q2',
        questionNumber: 2,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Pharmacology',
        topic: 'Emergency Antidotes',
        type: 'single_choice',
        text: 'A patient receiving Continuous IV Heparin infusion for Deep Vein Thrombosis (DVT) shows a sudden drop in Hb and aPTT > 120 seconds with active mucosal bleeding. Which specific antidote must the nurse prepare?',
        textHindi: 'डीप वेन थ्रॉम्बोसिस (DVT) के लिए हेपरिन इन्फ्यूजन ले रहे मरीज में aPTT > 120 सेकंड और ब्लीडिंग देखी गई। नर्स को कौन सा विशिष्ट एंटीडोट तैयार करना चाहिए?',
        options: [
          { id: 'A', text: 'Vitamin K1 (Phytonadione)' },
          { id: 'B', text: 'Protamine Sulfate' },
          { id: 'C', text: 'Deleferoxamine' },
          { id: 'D', text: 'Calcium Gluconate 10%' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Protamine Sulfate is the specific antidote for unfractionated Heparin overdose. It is a strongly basic protein that binds with strongly acidic heparin to form an inactive, stable salt complex. Vitamin K is the antidote for Warfarin.',
        referenceNotes: 'Standard Clinical Pharmacology for Nursing - Anticoagulants'
      },
      {
        id: 'norcet_q3',
        questionNumber: 3,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Obstetrics & Gynaecology Nursing',
        topic: 'Stages of Labour & APGAR Scoring',
        type: 'single_choice',
        text: 'A newborn at 1 minute of life has a heart rate of 110 bpm, slow irregular respirations, active motion with flexed extremities, grimace on suctioning, and pink body with cyanotic hands and feet (Acrocyanosis). What is the calculated APGAR score?',
        textHindi: 'जन्म के 1 मिनट बाद एक नवजात का हृदय गति 110 bpm, अनियमित श्वसन, अंगों में फ्लेक्सन, सक्शन पर ग्रिमेस, और एक्रोसायनोसिस है। APGAR स्कोर क्या है?',
        options: [
          { id: 'A', text: 'Score = 9' },
          { id: 'B', text: 'Score = 7' },
          { id: 'C', text: 'Score = 8' },
          { id: 'D', text: 'Score = 6' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'APGAR Breakdown: Heart Rate > 100 = 2; Respiratory effort (slow/irregular) = 1; Muscle Tone (flexed extremities/active) = 2; Reflex irritability (grimace) = 1; Color (acrocyanosis / pink body with blue extremities) = 1. Total APGAR = 2 + 1 + 2 + 1 + 1 = 7.',
        referenceNotes: 'Standard OBG & Neonatal Care Guidelines'
      },
      {
        id: 'norcet_q4',
        questionNumber: 4,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Nursing Fundamentals',
        topic: 'IV Fluid Calculations & TPN',
        type: 'single_choice',
        text: 'A doctor prescribes 1000 mL of Ringer Lactate (RL) to be infused over 8 hours using a standard macro-drip set with a drop factor of 15 drops/mL. What should be the flow rate in drops per minute (gtts/min)?',
        textHindi: '1000 mL रिंगर लैक्टेट 8 घंटे में ड्रिप सेट (ड्रॉप फैक्टर 15 gtts/mL) से देना है। प्रति मिनट ड्रॉप्स की दर क्या होगी?',
        options: [
          { id: 'A', text: '31 drops/min' },
          { id: 'B', text: '42 drops/min' },
          { id: 'C', text: '25 drops/min' },
          { id: 'D', text: '52 drops/min' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Formula: Drops/min = (Total Volume in mL × Drop Factor) / (Time in Minutes). Here: (1000 mL × 15) / (8 × 60 min) = 15000 / 480 = 31.25 ≈ 31 drops/min.',
        referenceNotes: 'Potter & Perry Clinical Nursing Calculations'
      },
      {
        id: 'norcet_q5',
        questionNumber: 5,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Pediatric Nursing',
        topic: 'Congenital Heart Defects',
        type: 'single_choice',
        text: 'Which of the following congenital heart conditions is characteristically recognized as a Cyanotic Heart Defect presenting with "Boot-Shaped" heart on chest X-ray?',
        options: [
          { id: 'A', text: 'Ventricular Septal Defect (VSD)' },
          { id: 'B', text: 'Patent Ductus Arteriosus (PDA)' },
          { id: 'C', text: 'Tetralogy of Fallot (TOF)' },
          { id: 'D', text: 'Coarctation of Aorta' }
        ],
        correctAnswer: 'C',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'Tetralogy of Fallot (TOF) consists of: 1) Pulmonary Stenosis, 2) Right Ventricular Hypertrophy, 3) Overriding of Aorta, and 4) VSD. RVH causes the cardiac apex to tilt upwards, producing the classic "Coeur en sabot" or boot-shaped heart on X-ray.',
        referenceNotes: 'Nelson Textbook of Pediatrics - Cyanotic CHD'
      },
      {
        id: 'norcet_q6',
        questionNumber: 6,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Infection Control',
        topic: 'Biomedical Waste Management (BMWM) 2016 Rules',
        type: 'single_choice',
        text: 'As per the updated Biomedical Waste Management Rules in India, in which colored container must blood-soaked cotton swabs, soiled dressings, and anatomical human tissue be discarded?',
        options: [
          { id: 'A', text: 'Red Container / Polybag' },
          { id: 'B', text: 'Yellow Container / Polybag' },
          { id: 'C', text: 'Blue Cardboard Box' },
          { id: 'D', text: 'White Translucent Puncture-Proof Container' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Yellow bags are dedicated for anatomical waste, animal waste, soiled waste (cotton swabs, dressings contaminated with blood/body fluids), expired cytotoxic drugs, and microbiology culture media.',
        referenceNotes: 'Biomedical Waste Management Rules 2016 & Amendments'
      },
      {
        id: 'norcet_q7',
        questionNumber: 7,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Community Health Nursing',
        topic: 'Immunization Schedule & Cold Chain',
        type: 'single_choice',
        text: 'Under the Universal Immunization Programme (UIP) in India, what is the recommended temperature range for maintaining the vaccine cold chain in ILR (Ice-Lined Refrigerators)?',
        options: [
          { id: 'A', text: '-15°C to -25°C' },
          { id: 'B', text: '+2°C to +8°C' },
          { id: 'C', text: '0°C to +4°C' },
          { id: 'D', text: '+10°C to +15°C' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'The standard cold chain storage temperature for all vaccines at PHC/CHC level in Ice Lined Refrigerators (ILRs) is +2°C to +8°C. Deep freezers (-15°C to -25°C) are utilized at district and regional stores for OPV and preparing ice packs.',
        referenceNotes: 'National Health Mission - Immunization Handbook'
      },
      {
        id: 'norcet_q8',
        questionNumber: 8,
        sectionId: 'sec_gen_apt',
        sectionName: 'General Awareness & Reasoning',
        subject: 'General Knowledge & Healthcare Initiatives',
        topic: 'Ayushman Bharat & Health Schemes',
        type: 'single_choice',
        text: 'Under Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY), what is the maximum cashless health coverage provided per eligible family per year?',
        options: [
          { id: 'A', text: '₹2 Lakhs per annum' },
          { id: 'B', text: '₹3 Lakhs per annum' },
          { id: 'C', text: '₹5 Lakhs per annum' },
          { id: 'D', text: '₹10 Lakhs per annum' }
        ],
        correctAnswer: 'C',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'AB-PMJAY provides a defined health cover of ₹5 Lakhs per eligible family per year for secondary and tertiary care hospitalization across public and empaneled private hospitals in India.',
        referenceNotes: 'National Health Authority (NHA) Official Guidelines'
      },
      {
        id: 'norcet_q9',
        questionNumber: 9,
        sectionId: 'sec_gen_apt',
        sectionName: 'General Awareness & Reasoning',
        subject: 'General Intelligence & Reasoning',
        topic: 'Blood Relations & Direction Sense',
        type: 'single_choice',
        text: 'A nurse walks 20 meters North from the nursing station, turns right and walks 30 meters to ICU, then turns right again and walks 20 meters to the pharmacy. In which direction and at what distance is the pharmacy from the nursing station?',
        options: [
          { id: 'A', text: '30 meters East' },
          { id: 'B', text: '30 meters West' },
          { id: 'C', text: '20 meters South' },
          { id: 'D', text: '50 meters East' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'North 20m (+Y), Right (East) 30m (+X), Right (South) 20m (-Y). The vertical coordinates cancel out (+20 - 20 = 0), leaving the final position at 30 meters East of the starting point.',
        referenceNotes: 'Standard Reasoning Practice'
      },
      {
        id: 'norcet_q10',
        questionNumber: 10,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Psychiatric Nursing',
        topic: 'Therapeutic Lithium Monitoring',
        type: 'single_choice',
        text: 'A patient with Bipolar Affective Disorder is maintained on Lithium Carbonate. What is the therapeutic serum level of Lithium for acute manic episodes?',
        options: [
          { id: 'A', text: '0.2 to 0.5 mEq/L' },
          { id: 'B', text: '0.6 to 1.2 mEq/L' },
          { id: 'C', text: '1.5 to 2.0 mEq/L' },
          { id: 'D', text: '2.5 to 3.5 mEq/L' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'Therapeutic serum Lithium levels range from 0.8 to 1.2 mEq/L during acute mania and 0.6 to 1.0 mEq/L for long-term maintenance. Serum levels above 1.5 mEq/L indicate toxicity requiring immediate clinical intervention.',
        referenceNotes: 'Kaplan & Sadock Psychiatric Mental Health Nursing'
      }
    ]
  },

  // 2. OSSSC Nursing Officer 2026 Special Mock Test (Odisha Specific + Nursing Core)
  {
    id: 'test_osssc_nursing_2026',
    slug: 'osssc-nursing-officer-2026-mock',
    title: 'OSSSC Nursing Officer 2026 Complete Mock Test',
    titleOdia: 'OSSSC ନର୍ସିଂ ଅଫିସର ୨୦୨୬ ସ୍ପେଶାଲ ମକ୍ ଟେଷ୍ଟ (ଓଡ଼ିଶା)',
    shortDescription: 'Designed as per Odisha Sub-Ordinate Staff Selection Commission (OSSSC) pattern with Odia language option, ANM/GNM Diploma questions & state health schemes.',
    mainCategory: 'nursing',
    subCategory: 'osssc_nursing',
    categoryLabel: 'Odisha State Nursing (OSSSC)',
    targetExam: 'OSSSC Nursing Officer 2026',
    gradeOrClass: 'GNM / B.Sc Nursing Diploma',
    board: 'OSSSC Bhubaneswar',
    durationMinutes: 120,
    totalQuestions: 20,
    totalMarks: 100,
    isLive: true,
    isFree: true,
    featuredBadge: 'OSSSC Exact Marks Scheme',
    attemptsCount: 21350,
    averageScore: 68.2,
    cutoffEstimated: 65.0,
    createdAt: '2026-02-18T10:00:00Z',
    instructions: [
      'Total Questions: 20 | Duration: 120 Minutes | Total Marks: 100.',
      'Marking Scheme: +5.0 Marks per correct answer; -1.25 Marks penalty (0.25 negative ratio) per wrong answer.',
      'Includes Nursing Subjects (80%), HSC Level Practical Science (10%), and Odisha GK / Health Schemes (10%).',
      'Questions available with Odia translations for maximum regional clarity.'
    ],
    sections: [
      { id: 'sec_osssc_nursing', name: 'Diploma Nursing & Midwifery Subjects', totalQuestions: 15, totalMarks: 75, positiveMarksPerQuestion: 5.0, negativeMarksPerQuestion: 1.25 },
      { id: 'sec_osssc_odisha_gk', name: 'Practical Science & Odisha Health Portals', totalQuestions: 5, totalMarks: 25, positiveMarksPerQuestion: 5.0, negativeMarksPerQuestion: 1.25 }
    ],
    questions: [
      {
        id: 'osssc_q1',
        questionNumber: 1,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Fundamentals of Nursing',
        topic: 'Pressure Ulcer Staging',
        type: 'single_choice',
        text: 'A bedridden patient has a localized area of intact skin with non-blanchable erythema over the sacral region. What stage of pressure injury is this classified as?',
        textOdia: 'ଜଣେ ଶଯ୍ୟାଶାୟୀ ରୋଗୀଙ୍କ ସାକ୍ରାଲ ଅଂଚଳରେ ଚର୍ମ ଅକ୍ଷତ ଥାଇ ନନ୍-ବ୍ଲାଞ୍ଚେବଲ୍ ଲାଲ୍ ଦାଗ ଦେଖାଯାଏ। ଏହା କେଉଁ ଷ୍ଟେଜ୍ ର ପ୍ରେସର୍ ସୋର୍ (Pressure Ulcer)?',
        options: [
          { id: 'A', text: 'Stage I Pressure Ulcer', textOdia: 'ଷ୍ଟେଜ୍ I (Stage 1) ପ୍ରେସର୍ ଅଲସର୍' },
          { id: 'B', text: 'Stage II Pressure Ulcer', textOdia: 'ଷ୍ଟେଜ୍ II (Stage 2) ପ୍ରେସର୍ ଅଲସର୍' },
          { id: 'C', text: 'Stage III Pressure Ulcer', textOdia: 'ଷ୍ଟେଜ୍ III (Stage 3) ପ୍ରେସର୍ ଅଲସର୍' },
          { id: 'D', text: 'Unstageable Pressure Injury', textOdia: 'ଅନଷ୍ଟେଜେବଲ୍ ପ୍ରେସର୍ ଇଞ୍ଜୁରୀ' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Stage I is defined by intact skin with a localized area of non-blanchable erythema. Stage II involves partial-thickness loss of skin with exposed dermis. Stage III involves full-thickness skin loss with adipose visible.',
        referenceNotes: 'NPUAP / EPUAP Pressure Injury Classification Guidelines'
      },
      {
        id: 'osssc_q2',
        questionNumber: 2,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Midwifery & Obstetrical Nursing',
        topic: 'Postpartum Hemorrhage (PPH) Management',
        type: 'single_choice',
        text: 'Following a normal vaginal delivery, the patient experiences continuous vaginal bleeding with a soft, boggy, uncontracted uterus. What is the most common cause and first-line nursing intervention?',
        textOdia: 'ପ୍ରସବ ପରେ ରୋଗୀଙ୍କ ନରମ ଓ ଶିଥିଳ ଗର୍ଭାଶୟ (Uterus) ସହିତ ରକ୍ତସ୍ରାବ ହେଉଛି। ଏହାର ମୁଖ୍ୟ କାରଣ ଏବଂ ପ୍ରାଥମିକ ନର୍ସିଂ ପଦକ୍ଷେପ କ’ଣ?',
        options: [
          { id: 'A', text: 'Cervical Laceration; prepare for surgical repair immediately' },
          { id: 'B', text: 'Uterine Atony; perform immediate Fundal Uterine Massage and administer Oxytocin' },
          { id: 'C', text: 'Retained Placental Cotyledon; perform manual removal without fluids' },
          { id: 'D', text: 'Coagulopathy; transfuse Fresh Frozen Plasma (FFP)' }
        ],
        correctAnswer: 'B',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'medium',
        explanation: 'Uterine Atony accounts for 70-80% of Postpartum Hemorrhage (PPH). The initial first-line management is vigorous bimanual fundal massage to stimulate myometrial contractions alongside uterotonic medications (Oxytocin IV/IM).',
        referenceNotes: 'WHO Guidelines for the Management of Postpartum Haemorrhage'
      },
      {
        id: 'osssc_q3',
        questionNumber: 3,
        sectionId: 'sec_osssc_odisha_gk',
        sectionName: 'Practical Science & Odisha Health Portals',
        subject: 'State Health Schemes',
        topic: 'Biju Swasthya Kalyan Yojana (BSKY) & Nabin Card',
        type: 'single_choice',
        text: 'Under the BSKY Health Assurance Scheme in Odisha, what is the annual cashless financial healthcare assistance specifically provided for female members of the family?',
        textOdia: 'ଓଡ଼ିଶାର ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ଯୋଜନା (BSKY) ରେ ପରିବାରର ମହିଳା ସଦସ୍ୟାଙ୍କ ପାଇଁ ବାର୍ଷିକ କେତେ ଟଙ୍କାର ନିଃଶୁଳ୍କ ଚିକିତ୍ସା ସୁବିଧା ପ୍ରଦାନ କରାଯାଏ?',
        options: [
          { id: 'A', text: '₹5 Lakh per annum', textOdia: 'ବାର୍ଷିକ ୫ ଲକ୍ଷ ଟଙ୍କା' },
          { id: 'B', text: '₹7 Lakh per annum', textOdia: 'ବାର୍ଷିକ ୭ ଲକ୍ଷ ଟଙ୍କା' },
          { id: 'C', text: '₹10 Lakh per annum', textOdia: 'ବାର୍ଷିକ ୧୦ ଲକ୍ଷ ଟଙ୍କା' },
          { id: 'D', text: '₹15 Lakh per annum', textOdia: 'ବାର୍ଷିକ ୧୫ ଲକ୍ଷ ଟଙ୍କା' }
        ],
        correctAnswer: 'C',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'In Odisha under BSKY, cashless healthcare coverage is ₹5 Lakhs per annum per family, and an enhanced coverage of up to ₹10 Lakhs per annum specifically for women members.',
        referenceNotes: 'Health & Family Welfare Dept, Govt of Odisha'
      },
      {
        id: 'osssc_q4',
        questionNumber: 4,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Pediatrics',
        topic: 'Neonatal Jaundice & Phototherapy',
        type: 'single_choice',
        text: 'While managing a neonate undergoing continuous phototherapy for unconjugated hyperbilirubinemia, which two anatomical areas MUST the nurse strictly cover with protective shields?',
        textOdia: 'ଫୋଟୋଥେରାପି (Phototherapy) ପାଉଥିବା ନବଜାତ ଶିଶୁର କେଉଁ ଦୁଇଟି ଅଙ୍ଗକୁ ସୁରକ୍ଷା ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ଘୋଡ଼ାଇ ରଖିବା ଜରୁରୀ?',
        options: [
          { id: 'A', text: 'Eyes and Genitalia' },
          { id: 'B', text: 'Chest and Abdomen' },
          { id: 'C', text: 'Hands and Feet' },
          { id: 'D', text: 'Ears and Nose' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'During phototherapy, the neonate’s eyes must be shielded with opaque eye patches to prevent retinal photochemical damage, and the genital area must be covered with a small diaper/shield to safeguard gonadal tissue.',
        referenceNotes: 'Standard Pediatric Nursing Procedures'
      }
    ]
  },

  // 3. SSC CGL Tier 1 Full Syllabus Speed Mock Test
  {
    id: 'test_ssc_cgl_tier1_2026',
    slug: 'ssc-cgl-tier1-cbt-mock',
    title: 'SSC CGL 2026 Tier-1 Official Pattern Mock Test',
    titleOdia: 'SSC CGL ୨୦୨୬ ଟାୟାର-୧ ଅଫିସିଆଲ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: '100% SSC TCS CBT Interface Replicate: Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension.',
    mainCategory: 'competitive_central',
    subCategory: 'ssc_cgl',
    categoryLabel: 'Staff Selection Commission (SSC)',
    targetExam: 'SSC CGL 2026 Tier 1',
    gradeOrClass: 'Graduate Level',
    board: 'Staff Selection Commission',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 40,
    isLive: true,
    isFree: true,
    featuredBadge: 'Real TCS Engine Layout',
    attemptsCount: 38400,
    averageScore: 28.5,
    cutoffEstimated: 27.0,
    createdAt: '2026-02-10T10:00:00Z',
    instructions: [
      'Duration: 60 minutes. Total Marks: 40 (2 Marks for each correct question).',
      'Negative Marking: 0.50 marks deducted for each wrong answer.',
      'Sections: General Intelligence (GI), General Awareness (GA), Quantitative Aptitude (QA), English Language (EL).'
    ],
    sections: [
      { id: 'sec_gi', name: 'General Intelligence & Reasoning', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 },
      { id: 'sec_ga', name: 'General Awareness & Indian Economy', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 },
      { id: 'sec_qa', name: 'Quantitative Aptitude', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 },
      { id: 'sec_el', name: 'English Comprehension & Grammar', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 }
    ],
    questions: [
      {
        id: 'ssc_q1',
        questionNumber: 1,
        sectionId: 'sec_qa',
        sectionName: 'Quantitative Aptitude',
        subject: 'Mathematics',
        topic: 'Profit, Loss & Discount',
        type: 'single_choice',
        text: 'A shopkeeper marks an article at 40% above its cost price and offers a discount of 25% on the marked price. What is his net profit or loss percentage?',
        options: [
          { id: 'A', text: '5% Profit' },
          { id: 'B', text: '10% Profit' },
          { id: 'C', text: '5% Loss' },
          { id: 'D', text: '15% Profit' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'medium',
        explanation: 'Let CP = 100. Marked Price (MP) = 140. Selling Price (SP) = 140 × (1 - 0.25) = 140 × 0.75 = 105. Net Profit = SP - CP = 105 - 100 = 5%.',
        referenceNotes: 'SSC CGL Arithmetic Shortcuts'
      },
      {
        id: 'ssc_q2',
        questionNumber: 2,
        sectionId: 'sec_ga',
        sectionName: 'General Awareness & Indian Economy',
        subject: 'Indian Polity & Constitution',
        topic: 'Fundamental Rights & Writs',
        type: 'single_choice',
        text: 'Which writ is issued by the Supreme Court or High Court to compel a public official or authority to perform a mandatory statutory duty they have failed to execute?',
        options: [
          { id: 'A', text: 'Habeas Corpus' },
          { id: 'B', text: 'Mandamus' },
          { id: 'C', text: 'Quo-Warranto' },
          { id: 'D', text: 'Certiorari' }
        ],
        correctAnswer: 'B',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'Mandamus literally means "We Command". It is a judicial writ issued to any constitutional, statutory, or public authority commanding them to perform their public duty under Article 32 (SC) and Article 226 (HC).',
        referenceNotes: 'M. Laxmikanth Indian Polity - Chapter on Fundamental Rights'
      },
      {
        id: 'ssc_q3',
        questionNumber: 3,
        sectionId: 'sec_gi',
        sectionName: 'General Intelligence & Reasoning',
        subject: 'Reasoning',
        topic: 'Number Analogy & Series',
        type: 'single_choice',
        text: 'Select the related number from the given alternatives: 7 : 344 :: 9 : ?',
        options: [
          { id: 'A', text: '728' },
          { id: 'B', text: '730' },
          { id: 'C', text: '512' },
          { id: 'D', text: '810' }
        ],
        correctAnswer: 'B',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'medium',
        explanation: 'Pattern: n : (n³ + 1). For 7 -> 7³ + 1 = 343 + 1 = 344. For 9 -> 9³ + 1 = 729 + 1 = 730.',
        referenceNotes: 'Standard SSC Analogy Rules'
      },
      {
        id: 'ssc_q4',
        questionNumber: 4,
        sectionId: 'sec_el',
        sectionName: 'English Comprehension & Grammar',
        subject: 'English',
        topic: 'Idioms and Phrases',
        type: 'single_choice',
        text: 'Choose the correct meaning of the underlined idiom: "The auditor found that the accountant had been cooking the books for over three years."',
        options: [
          { id: 'A', text: 'Writing culinary recipes in official ledgers' },
          { id: 'B', text: 'Falsifying or manipulating financial accounts' },
          { id: 'C', text: 'Destroying damaged old office files' },
          { id: 'D', text: 'Printing duplicate government receipts' }
        ],
        correctAnswer: 'B',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'The idiom "cook the books" means to manipulate or alter accounting numbers fraudulently to mislead investors, authorities, or auditors.',
        referenceNotes: 'Word Power & Idiomatic English'
      }
    ]
  },

  // 4. CBSE Class 10 Board Exam Science & Mathematics Sprint Mock
  {
    id: 'test_cbse_class10_board',
    slug: 'cbse-class-10-board-mock',
    title: 'CBSE Class 10 Board Exam Science & Math Official Mock',
    titleOdia: 'CBSE ଦଶମ ଶ୍ରେଣୀ ବୋର୍ଡ ପରୀକ୍ଷା ବିଜ୍ଞାନ ଓ ଗଣିତ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Latest 2026 NCERT Competency-Based MCQs & Assertion-Reasoning for CBSE Class 10 Board Aspirants.',
    mainCategory: 'school_boards',
    subCategory: 'cbse_class_10',
    categoryLabel: 'School Board (Class 10)',
    targetExam: 'CBSE Class 10 Boards 2026',
    gradeOrClass: 'Class 10',
    board: 'CBSE New Delhi',
    durationMinutes: 60,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'NCERT Competency Aligned',
    attemptsCount: 19800,
    averageScore: 11.2,
    cutoffEstimated: 10.0,
    createdAt: '2026-02-12T10:00:00Z',
    instructions: [
      'Duration: 60 minutes. Total marks: 15.',
      'Marking scheme: +1 mark for each correct answer; No negative marking (CBSE Board Standard).',
      'Questions cover Physics (Light & Electricity), Chemistry (Chemical Reactions & Acids), Biology (Life Processes), and Math (Quadratic & Trigonometry).'
    ],
    sections: [
      { id: 'sec_sci', name: 'Science (Physics, Chemistry, Biology)', totalQuestions: 10, totalMarks: 10, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 },
      { id: 'sec_math', name: 'Mathematics (Standard & Basic)', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.0 }
    ],
    questions: [
      {
        id: 'cbse10_q1',
        questionNumber: 1,
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Physics',
        topic: 'Electricity & Ohm’s Law',
        type: 'single_choice',
        text: 'A uniform cylindrical wire of resistance R is stretched such that its length is doubled without changing its volume. What will be its new resistance?',
        options: [
          { id: 'A', text: '2R' },
          { id: 'B', text: '4R' },
          { id: 'C', text: 'R / 2' },
          { id: 'D', text: 'R / 4' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'medium',
        explanation: 'Since volume V = A × L is constant, when length is doubled (L\' = 2L), the cross-sectional area becomes halved (A\' = A/2). Resistance R\' = ρ(L\'/A\') = ρ(2L / (A/2)) = 4 × ρ(L/A) = 4R.',
        referenceNotes: 'NCERT Class 10 Science - Chapter 12: Electricity'
      },
      {
        id: 'cbse10_q2',
        questionNumber: 2,
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Chemistry',
        topic: 'Chemical Reactions & Equations',
        type: 'single_choice',
        text: 'When lead nitrate Pb(NO3)2 crystals are heated strongly in a dry test tube, which brown-colored gas is evolved along with crackling sound?',
        options: [
          { id: 'A', text: 'Nitrogen gas (N2)' },
          { id: 'B', text: 'Nitrogen dioxide (NO2)' },
          { id: 'C', text: 'Nitrous oxide (N2O)' },
          { id: 'D', text: 'Lead oxide fumes only' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Thermal decomposition reaction: 2Pb(NO3)2(s) --Δ--> 2PbO(s) [yellow residue] + 4NO2(g) [brown gas fumes] + O2(g). The brown fumes are Nitrogen Dioxide.',
        referenceNotes: 'NCERT Class 10 Science - Chapter 1: Chemical Reactions'
      },
      {
        id: 'cbse10_q3',
        questionNumber: 3,
        sectionId: 'sec_math',
        sectionName: 'Mathematics (Standard & Basic)',
        subject: 'Mathematics',
        topic: 'Introduction to Trigonometry',
        type: 'single_choice',
        text: 'If sin θ + cos θ = √2 cos θ (where θ ≠ 90°), what is the value of (cos θ - sin θ)?',
        options: [
          { id: 'A', text: '√2 sin θ' },
          { id: 'B', text: 'sin θ' },
          { id: 'C', text: '√2' },
          { id: 'D', text: '-√2 cos θ' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'hard',
        explanation: 'Given: sin θ = (√2 - 1)cos θ. Multiply both sides by (√2 + 1): (√2 + 1)sin θ = (√2 + 1)(√2 - 1)cos θ = (2 - 1)cos θ = cos θ. Rearranging gives: cos θ - sin θ = √2 sin θ.',
        referenceNotes: 'NCERT Class 10 Mathematics - Chapter 8: Trigonometry'
      }
    ]
  },

  // 5. UPSC CSE Prelims General Studies Paper-1 Simulation
  {
    id: 'test_upsc_prelims_2026',
    slug: 'upsc-cse-prelims-gs1-mock',
    title: 'UPSC Civil Services Prelims GS Paper 1 All-India Mock',
    titleOdia: 'UPSC ସିଭିଲ୍ ସର୍ଭିସେସ୍ ପ୍ରିଲିମ୍ସ GS-୧ ଅଖିଳ ଭାରତୀୟ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Rigorous high-order questions: Indian Polity, Modern History, Ecology & Biodiversity, Economy, and Science & Tech.',
    mainCategory: 'competitive_central',
    subCategory: 'upsc_prelims',
    categoryLabel: 'UPSC Civil Services (IAS/IPS)',
    targetExam: 'UPSC CSE Prelims 2026',
    gradeOrClass: 'Graduate All Disciplines',
    board: 'Union Public Service Commission',
    durationMinutes: 120,
    totalQuestions: 15,
    totalMarks: 30,
    isLive: true,
    isFree: true,
    featuredBadge: 'UPSC Standard Assertion Patterns',
    attemptsCount: 29100,
    averageScore: 14.8,
    cutoffEstimated: 14.0,
    createdAt: '2026-02-05T10:00:00Z',
    instructions: [
      'Total Questions: 15 | Duration: 120 Minutes | Total Marks: 30 (+2 per correct question).',
      'Negative Marking: 0.66 marks penalty per wrong answer (1/3rd penalty).',
      'Read all statements carefully before choosing the correct option code.'
    ],
    sections: [
      { id: 'sec_upsc_gs', name: 'General Studies Paper 1', totalQuestions: 15, totalMarks: 30, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 }
    ],
    questions: [
      {
        id: 'upsc_q1',
        questionNumber: 1,
        sectionId: 'sec_upsc_gs',
        sectionName: 'General Studies Paper 1',
        subject: 'Environment & Biodiversity',
        topic: 'Ramsar Wetlands & Mangrove Conservation',
        type: 'single_choice',
        text: 'Consider the following statements regarding the Bhitarkanika Mangroves in Odisha:\n1. It is a Ramsar Wetland of International Importance.\n2. It is the second-largest mangrove ecosystem in mainland India after Sundarbans.\n3. It hosts the largest concentration of endangered Saltwater Crocodiles (Crocodylus porosus) in India.\nWhich of the statements given above are correct?',
        options: [
          { id: 'A', text: '1 and 2 only' },
          { id: 'B', text: '2 and 3 only' },
          { id: 'C', text: '1 and 3 only' },
          { id: 'D', text: '1, 2 and 3' }
        ],
        correctAnswer: 'D',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'hard',
        explanation: 'All three statements are correct. Bhitarkanika in Kendrapara district of Odisha was designated a Ramsar site in 2002, is the 2nd largest mangrove delta in India (Brahmani-Baitarani-Dhamra rivers), and holds the Guinness World Record for the largest population of estuarine saltwater crocodiles.',
        referenceNotes: 'MoEFCC Annual Ecological Report & Ramsar Directory'
      },
      {
        id: 'upsc_q2',
        questionNumber: 2,
        sectionId: 'sec_upsc_gs',
        sectionName: 'General Studies Paper 1',
        subject: 'Indian Economy',
        topic: 'Monetary Policy & Inflation Targeting',
        type: 'single_choice',
        text: 'With reference to the Monetary Policy Committee (MPC) in India, consider the following statements:\n1. The MPC consists of 6 members with the RBI Governor acting as the ex-officio Chairperson.\n2. Under the RBI Act 1934, the statutory flexible inflation target is set at 4% with a tolerance band of ± 2%.\n3. In case of equality of votes, the RBI Governor possesses a second or casting vote.\nWhich of the statements given above are correct?',
        options: [
          { id: 'A', text: '1 and 2 only' },
          { id: 'B', text: '2 and 3 only' },
          { id: 'C', text: '1, 2 and 3' },
          { id: 'D', text: '1 only' }
        ],
        correctAnswer: 'C',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'medium',
        explanation: 'All statements 1, 2, and 3 are correct. The MPC comprises 6 members (3 from RBI, 3 nominated by Central Govt). The target is 4% ± 2% (2% to 6% band) CPI inflation. The Governor presides and has a casting vote in case of a tie.',
        referenceNotes: 'RBI Act, 1934 Section 45ZB & Economic Survey'
      }
    ]
  },

  // 6. NEET UG 2026 Biology, Chemistry & Physics Grand Mock
  {
    id: 'test_neet_ug_2026',
    slug: 'neet-ug-2026-medical-mock',
    title: 'NEET UG 2026 All-India Medical Entrance Mock Test',
    titleOdia: 'NEET UG ୨୦୨୬ ମେଡିକାଲ ପ୍ରବେଶିକା ଅଖିଳ ଭାରତୀୟ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Strict NTA Pattern (+4, -1 marking) for Medical Aspirants covering Biology (Botany & Zoology), Chemistry, and Physics.',
    mainCategory: 'entrance_exams',
    subCategory: 'neet_ug',
    categoryLabel: 'Medical Entrance (NEET UG)',
    targetExam: 'NEET UG 2026',
    gradeOrClass: '+2 Science / Dropper',
    board: 'National Testing Agency (NTA)',
    durationMinutes: 90,
    totalQuestions: 15,
    totalMarks: 60,
    isLive: true,
    isFree: true,
    featuredBadge: 'NTA Official +4 / -1 Scheme',
    attemptsCount: 42000,
    averageScore: 42.6,
    cutoffEstimated: 38.0,
    createdAt: '2026-02-14T10:00:00Z',
    instructions: [
      'Duration: 90 Minutes | Total Questions: 15 | Total Marks: 60.',
      'Marking Scheme: +4 Marks for each correct answer; -1 Mark penalty for each wrong answer.',
      'Sections: Botany, Zoology, Chemistry, and Physics.'
    ],
    sections: [
      { id: 'sec_bio', name: 'Biology (Botany & Zoology)', totalQuestions: 9, totalMarks: 36, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_chem', name: 'Chemistry (Organic & Physical)', totalQuestions: 3, totalMarks: 12, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_phy', name: 'Physics (Mechanics & Modern)', totalQuestions: 3, totalMarks: 12, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }
    ],
    questions: [
      {
        id: 'neet_q1',
        questionNumber: 1,
        sectionId: 'sec_bio',
        sectionName: 'Biology (Botany & Zoology)',
        subject: 'Zoology',
        topic: 'Human Physiology - Endocrine System',
        type: 'single_choice',
        text: 'Which hormone is synthesized by the hypothalamus and transported axonally to the posterior pituitary (neurohypophysis) for storage and release, acting to increase water reabsorption in distal convoluted tubules and collecting ducts?',
        options: [
          { id: 'A', text: 'Adrenocorticotropic Hormone (ACTH)' },
          { id: 'B', text: 'Antidiuretic Hormone (ADH / Vasopressin)' },
          { id: 'C', text: 'Aldosterone' },
          { id: 'D', text: 'Atrial Natriuretic Peptide (ANP)' }
        ],
        correctAnswer: 'B',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'ADH (Vasopressin) and Oxytocin are synthesized in supraoptic and paraventricular nuclei of the hypothalamus and transported via hypothalamo-hypophyseal tract to the posterior pituitary. ADH inserts aquaporin-2 water channels in DCT and collecting ducts.',
        referenceNotes: 'NCERT Class 11 Biology - Chapter 22: Chemical Coordination'
      },
      {
        id: 'neet_q2',
        questionNumber: 2,
        sectionId: 'sec_bio',
        sectionName: 'Biology (Botany & Zoology)',
        subject: 'Botany',
        topic: 'Genetics & Molecular Basis of Inheritance',
        type: 'single_choice',
        text: 'In a double-stranded B-DNA molecule, if Cytosine constitutes 28% of the total nitrogenous bases, what percentage of Thymine will be present in this DNA molecule according to Chargaff’s Rule?',
        options: [
          { id: 'A', text: '28%' },
          { id: 'B', text: '22%' },
          { id: 'C', text: '44%' },
          { id: 'D', text: '14%' }
        ],
        correctAnswer: 'B',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'easy',
        explanation: 'According to Chargaff’s rule: %G = %C and %A = %T. Since C = 28%, then G = 28%. Total (G + C) = 56%. Therefore, (A + T) = 100% - 56% = 44%. Since A = T, Thymine % = 44 / 2 = 22%.',
        referenceNotes: 'NCERT Class 12 Biology - Chapter 6: Molecular Inheritance'
      }
    ]
  }
];

export const MOCK_EXAM_CATEGORIES = [
  { id: 'all', label: 'All Exam Tracks', count: '100+ Tests', icon: 'Sparkles', color: 'from-purple-500 to-indigo-600' },
  { id: 'nursing', label: 'Nursing & Healthcare', count: 'AIIMS / OSSSC / ESIC / CHO', icon: 'HeartPulse', color: 'from-rose-500 to-pink-600', badge: 'Special Focus' },
  { id: 'competitive_central', label: 'Central Govt Exams', count: 'UPSC / SSC / RRB / IBPS / NDA', icon: 'Landmark', color: 'from-blue-600 to-cyan-600' },
  { id: 'school_boards', label: 'School Boards (1-12)', count: 'CBSE / ICSE / Odisha BSE / CHSE', icon: 'GraduationCap', color: 'from-amber-500 to-orange-600', badge: 'Class 1-12' },
  { id: 'entrance_exams', label: 'National Entrances', count: 'NEET UG / JEE Main / CUET / CLAT', icon: 'Award', color: 'from-emerald-500 to-teal-600' },
  { id: 'competitive_state', label: 'State & Odisha PSC', count: 'OPSC OAS / OSSSC / Police / OTET', icon: 'Building', color: 'from-violet-600 to-purple-700' }
];
