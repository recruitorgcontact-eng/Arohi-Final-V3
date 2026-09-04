import { MockTest, ExamPassInfo } from '../types/examTypes';
import { resolveKGLineage } from './examKnowledgeGraph';
import { ADDITIONAL_MOCK_TESTS } from './moreMockTestsData';
import { COMPREHENSIVE_EXPANDED_MOCK_TESTS } from './comprehensiveMockTestsData';
import { MEGA_SCHOOL_MOCK_TESTS } from './megaSchoolMockTestsData';
import { MEGA_ENTRANCE_MOCK_TESTS } from './megaEntranceMockTestsData';
import { MEGA_CENTRAL_GOVT_MOCK_TESTS } from './megaCentralGovtMockTestsData';
import { MEGA_STATE_TEACHING_NURSING_MOCK_TESTS } from './megaStateTeachingNursingData';
import { EXPANDED_SECTOR_MOCK_TESTS } from './expandedSectorMockTestsData';
import { PAN_INDIA_MASTER_MOCK_TESTS } from './masterMockTestsData';
import { classifyTestCategory } from '../utils/examCategoryClassifier';

export const AROHI_EXAM_PASSES: ExamPassInfo[] = [
  {
    tier: 'silver',
    name: 'Arohi Exams™ Starter Pass',
    price: 99,
    originalPrice: 499,
    totalTests: 10,
    questionsPerTest: 100,
    totalQuestions: 1000,
    validityDays: 30,
    badge: 'Starter Speed Prep (30 Days)',
    features: [
      '10 Full-Length CBT Mock Tests (100 Qs each = 1,000 Questions)',
      '30 Days Unlimited Portal Validity',
      'Dynamic Question & Option Shuffle on every attempt',
      'Arohi CBT Engine with live countdown timer & question palette',
      'Instant Scorecard, All-India Rank (AIR) & Percentile Curve',
      'Official "Arohi Exams" Watermarked Digital Marksheet & PDF Export',
      'Valid across School (Class 1-10) and All Competitive Exams'
    ]
  },
  {
    tier: 'gold',
    name: 'Arohi Exams™ Gold Pass',
    price: 199,
    originalPrice: 899,
    totalTests: 25,
    questionsPerTest: 100,
    totalQuestions: 2500,
    validityDays: 90,
    badge: 'Most Popular Choice (90 Days)',
    features: [
      '25 Full-Length CBT Mock Tests (100 Qs each = 2,500 Questions)',
      '90 Days Unlimited Portal Validity',
      'Dynamic Question & Option Shuffle on every attempt (No duplicate papers)',
      'All Categories Unlocked (School Classes 1-10, Medical, SSC, UPSC, Bank, Railway)',
      'AI Weakness Diagnostic & Remedial Review after every exam',
      '1-Click "Ask Arohi AI" Instant Doubt Clarification in Chat',
      'All-India Leaderboard with Category-Wise Cutoff Benchmarking',
      'Official "Arohi Exams" Watermarked Performance Marksheet & PDF Export'
    ]
  },
  {
    tier: 'platinum',
    name: 'Arohi Exams™ Platinum Mega Pass',
    price: 299,
    originalPrice: 1499,
    totalTests: 60,
    questionsPerTest: 100,
    totalQuestions: 6000,
    validityDays: 365,
    badge: 'Maximum Value • 1 Year (365 Days)',
    features: [
      '60 Full-Length CBT Mock Tests (100 Qs each = 6,000 Questions)',
      '365 Days (1 Full Year) Complete Access Validity',
      'Dynamic Question & Option Shuffle on every attempt (Zero duplicates)',
      'All 20+ Categories Unlocked (School Classes 1-10, AIIMS, NEET, JEE, OPSC, SSC, UPSC, Bank, Railway)',
      'Unlimited AI Weakness Diagnostic, 7-Day Sprint Plans & Remedial Tests',
      '1-Click "Ask Arohi AI" Instant Doubt Clarification in Live Chat',
      'All-India Leaderboard with State & Category Cutoff Benchmarking',
      'Priority Evaluation with Official Watermarked Certificate & PDF Export'
    ]
  }
];

const DEFAULT_MOCK_TESTS: MockTest[] = [
  // 1. AIIMS NORCET 2026 Grand Mock Test (Nursing) - 25 Complete Questions
  {
    id: 'test_aiims_norcet_2026',
    slug: 'aiims-norcet-2026-grand-mock',
    title: 'AIIMS NORCET 2026 Nursing Officer Grand Mock Test',
    titleOdia: 'ଏମ୍ସ NORCET ୨୦୨୬ ନର୍ସିଂ ଅଫିସର ଗ୍ରାଣ୍ଡ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Exact AIIMS NORCET CBT pattern with 80% Nursing Core (20 Qs) + 20% General Knowledge, Aptitude & Reasoning (5 Qs).',
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
      },
      {
        id: 'norcet_q9',
        questionNumber: 9,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Medical Surgical Nursing',
        topic: 'Endocrine Emergencies & DKA',
        type: 'single_choice',
        text: 'A patient with Type 1 Diabetes presents with Diabetic Ketoacidosis (DKA). Blood glucose is 480 mg/dL, arterial pH is 7.15, and serum potassium is 5.8 mEq/L. Which IV fluid is initial fluid of choice for resuscitation?',
        options: [
          { id: 'A', text: '0.9% Normal Saline (Isotonic NaCl)' },
          { id: 'B', text: '5% Dextrose in Water (D5W)' },
          { id: 'C', text: '0.45% Half-Normal Saline' },
          { id: 'D', text: '3% Hypertonic Saline' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'In initial management of DKA, 0.9% Normal Saline is given at 1000-1500 mL/hr during the first 1-2 hours to restore intravascular volume and renal perfusion before switching to 0.45% Saline or D5W once glucose drops below 250 mg/dL.',
        referenceNotes: 'ADA Guidelines for Management of Hyperglycemic Crises'
      },
      {
        id: 'norcet_q10',
        questionNumber: 10,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Medical Surgical Nursing',
        topic: 'Neurological Assessment & GCS',
        type: 'single_choice',
        text: 'A head injury victim opens eyes to painful stimulus (E2), produces incomprehensible sounds (V2), and shows abnormal flexion / decorticate posturing (M3). What is the patient\'s Glasgow Coma Scale (GCS) score?',
        options: [
          { id: 'A', text: 'GCS = 5' },
          { id: 'B', text: 'GCS = 7' },
          { id: 'C', text: 'GCS = 9' },
          { id: 'D', text: 'GCS = 11' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'GCS Calculation: Eye Opening to pain (E) = 2; Verbal incomprehensible sounds (V) = 2; Motor abnormal decorticate flexion (M) = 3. Total GCS = 2 + 2 + 3 = 7 (Severe Head Injury / Comatose).',
        referenceNotes: 'Advanced Trauma Life Support (ATLS) Protocols'
      },
      {
        id: 'norcet_q11',
        questionNumber: 11,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Obstetrics & Gynaecology Nursing',
        topic: 'Preeclampsia & Magnesium Toxicity',
        type: 'single_choice',
        text: 'A severe pre-eclampsia patient is on Magnesium Sulfate IV infusion. The nurse notices patellar tendon reflexes are absent (0/4+) and respiratory rate has dropped to 10 breaths/min. What is the immediate antidote to administer?',
        options: [
          { id: 'A', text: '10% Calcium Gluconate 10 mL IV slowly over 5-10 minutes' },
          { id: 'B', text: 'Naloxone 0.4 mg IV' },
          { id: 'C', text: 'Sodium Bicarbonate 50 mEq IV' },
          { id: 'D', text: 'Potassium Chloride 20 mEq IV' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: '10% Calcium Gluconate (1g in 10 mL) administered IV over 5-10 minutes is the specific antidote for Magnesium toxicity (loss of DTRs, respiratory depression, oliguria).',
        referenceNotes: 'FOGSI & Williams Obstetrics - Hypertensive Disorders'
      },
      {
        id: 'norcet_q12',
        questionNumber: 12,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Nursing Fundamentals',
        topic: 'Tracheostomy Care & Suctioning',
        type: 'single_choice',
        text: 'During open endotracheal or tracheostomy tube suctioning of an adult patient, what is the maximum duration per suction pass and recommended wall suction pressure?',
        options: [
          { id: 'A', text: 'Maximum 10-15 seconds; Suction pressure 80-120 mmHg' },
          { id: 'B', text: 'Maximum 25-30 seconds; Suction pressure 150-200 mmHg' },
          { id: 'C', text: 'Maximum 5 seconds; Suction pressure 40-60 mmHg' },
          { id: 'D', text: 'Maximum 20 seconds; Suction pressure 200-250 mmHg' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'Suction duration must never exceed 10 to 15 seconds per pass to prevent hypoxia and vagal bradycardia. Safe adult negative wall suction pressure is 80 to 120 mmHg (up to 150 mmHg).',
        referenceNotes: 'American Association of Respiratory Care (AARC) Clinical Guidelines'
      },
      {
        id: 'norcet_q13',
        questionNumber: 13,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Medical Surgical Nursing',
        topic: 'Blood Transfusion Reactions',
        type: 'single_choice',
        text: 'Ten minutes after starting a Packed Red Blood Cells (PRBC) transfusion, the patient reports severe lower back pain, chills, fever, and dyspnea with dark burgundy urine. What is the first immediate nursing action?',
        options: [
          { id: 'A', text: 'Stop the blood transfusion immediately and infuse 0.9% Normal Saline via fresh tubing' },
          { id: 'B', text: 'Slow the transfusion rate to 10 drops/min and give oral paracetamol' },
          { id: 'C', text: 'Administer IV Diphenhydramine and resume after 15 minutes' },
          { id: 'D', text: 'Flush the existing blood administration set with sterile water' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'These are classic signs of an Acute Hemolytic Transfusion Reaction (ABO incompatibility). The nurse MUST immediately stop the transfusion, disconnect the blood tubing at the hub, keep vein open with normal saline via new IV set, and notify doctor & blood bank.',
        referenceNotes: 'NABH Standard Operating Procedure for Blood Transfusion'
      },
      {
        id: 'norcet_q14',
        questionNumber: 14,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Pharmacology',
        topic: 'Cardiac Glycosides & Digoxin Toxicity',
        type: 'single_choice',
        text: 'Before administering Digoxin (Lanoxin) 0.25 mg orally to an adult patient with Congestive Heart Failure, which assessment must the nurse prioritize?',
        options: [
          { id: 'A', text: 'Check apical pulse for 1 full minute; withhold if heart rate < 60 bpm' },
          { id: 'B', text: 'Check radial pulse for 15 seconds; withhold if heart rate < 80 bpm' },
          { id: 'C', text: 'Check blood glucose level; withhold if > 180 mg/dL' },
          { id: 'D', text: 'Check urinary output; withhold if < 100 mL/hr' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'The nurse must auscultate the apical pulse for 60 full seconds (1 minute). If HR is less than 60 bpm in adults (or < 90 in infants), digoxin is withheld due to risk of severe bradyarrhythmia.',
        referenceNotes: 'Lippincott Pharmacology for Nurses - Inotropic Agents'
      },
      {
        id: 'norcet_q15',
        questionNumber: 15,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Pediatric Nursing',
        topic: 'Fluid Resuscitation & Parkland Formula',
        type: 'single_choice',
        text: 'An adult weighing 60 kg sustains 40% Total Body Surface Area (TBSA) partial and full-thickness burns. Using the Parkland Formula (4 mL × kg × %TBSA), how much Ringer Lactate should be infused in the first 8 hours post-injury?',
        options: [
          { id: 'A', text: '4,800 mL' },
          { id: 'B', text: '9,600 mL' },
          { id: 'C', text: '2,400 mL' },
          { id: 'D', text: '3,600 mL' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'Total 24-hr Fluid = 4 mL × 60 kg × 40% = 9,600 mL. In the first 8 hours, half of the total volume (50%) is infused: 9,600 / 2 = 4,800 mL. The remaining half is infused over the next 16 hours.',
        referenceNotes: 'Parkland Burn Resuscitation Protocol'
      },
      {
        id: 'norcet_q16',
        questionNumber: 16,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Medical Surgical Nursing',
        topic: 'Chest Tube Drainage Care',
        type: 'single_choice',
        text: 'A nurse is monitoring a patient with an Underwater Seal Intercostal Drainage (ICD) tube for pneumothorax. What does continuous, vigorous bubbling in the water seal chamber indicate?',
        options: [
          { id: 'A', text: 'An air leak in the system or persistent bronchopleural fistula' },
          { id: 'B', text: 'Normal functioning during respiratory expiration' },
          { id: 'C', text: 'Complete re-expansion of the lung' },
          { id: 'D', text: 'Blockage of the chest tube by a blood clot' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'Intermittent bubbling with coughing is expected in pneumothorax. However, continuous bubbling in the water-seal chamber indicates an active air leak (either in the tubing connections or ongoing pleural rupture).',
        referenceNotes: 'Brunner & Suddarth’s Textbook of Medical-Surgical Nursing'
      },
      {
        id: 'norcet_q17',
        questionNumber: 17,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Community Health Nursing',
        topic: 'Epidemiology & Disease Surveillance',
        type: 'single_choice',
        text: 'The constant presence and usual prevalence of an infectious disease or agent within a given geographic area or population group is termed as:',
        options: [
          { id: 'A', text: 'Endemic' },
          { id: 'B', text: 'Epidemic' },
          { id: 'C', text: 'Pandemic' },
          { id: 'D', text: 'Sporadic' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Endemic refers to the constant baseline presence of a disease in a geographic location (e.g. malaria in coastal Odisha). An epidemic is an unexpected surge above baseline; a pandemic is worldwide spread.',
        referenceNotes: 'Park’s Textbook of Preventive and Social Medicine'
      },
      {
        id: 'norcet_q18',
        questionNumber: 18,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Psychiatric Nursing',
        topic: 'Defense Mechanisms',
        type: 'single_choice',
        text: 'A candidate who fails a job interview returns home and shouts at his family members over a minor issue. Which ego defense mechanism is being exhibited?',
        options: [
          { id: 'A', text: 'Displacement' },
          { id: 'B', text: 'Projection' },
          { id: 'C', text: 'Rationalization' },
          { id: 'D', text: 'Sublimation' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Displacement involves redirecting negative emotional impulses (anger, frustration) from the actual threatening source (the interviewer) onto a safer, non-threatening target (family members).',
        referenceNotes: 'Ahuja’s Postgraduate Psychiatry for Nurses'
      },
      {
        id: 'norcet_q19',
        questionNumber: 19,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Medical Surgical Nursing',
        topic: 'Electrolyte Imbalances & ECG',
        type: 'single_choice',
        text: 'Which classic electrocardiogram (ECG) changes are hallmark indicators of severe Hyperkalemia (serum K+ > 6.5 mEq/L)?',
        options: [
          { id: 'A', text: 'Tall, tented (peaked) T waves with widened QRS complex and prolonged PR interval' },
          { id: 'B', text: 'Prominent U waves with ST segment depression' },
          { id: 'C', text: 'Shortened QT interval with peaked P waves' },
          { id: 'D', text: 'Delta wave with short PR interval' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'Hyperkalemia causes symmetrical, tall peaked T-waves initially, followed by PR prolongation, flattening of P wave, widening of QRS complex, and progression to sine-wave pattern and cardiac arrest if untreated.',
        referenceNotes: 'Marriott’s Practical Electrocardiography'
      },
      {
        id: 'norcet_q20',
        questionNumber: 20,
        sectionId: 'sec_nurs_core',
        sectionName: 'Nursing Core & Clinical Scenarios',
        subject: 'Obstetrics & Gynaecology Nursing',
        topic: 'Contraception & Intrauterine Devices',
        type: 'single_choice',
        text: 'What is the effective lifespan / duration of protection provided by the Cu-T 380A Intrauterine Contraceptive Device (IUCD) under the National Family Planning Program?',
        options: [
          { id: 'A', text: '10 Years' },
          { id: 'B', text: '5 Years' },
          { id: 'C', text: '3 Years' },
          { id: 'D', text: '7 Years' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Cu-T 380A provides contraception for 10 years. In contrast, Cu-T 200/375 is approved for 5 years.',
        referenceNotes: 'Ministry of Health & Family Welfare (MoHFW) Contraceptive Guidelines'
      },
      // NORCET General Awareness & Aptitude Section (5 Questions)
      {
        id: 'norcet_q21',
        questionNumber: 21,
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
        id: 'norcet_q22',
        questionNumber: 22,
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
        id: 'norcet_q23',
        questionNumber: 23,
        sectionId: 'sec_gen_apt',
        sectionName: 'General Awareness & Reasoning',
        subject: 'Quantitative Aptitude',
        topic: 'Ratios & Percentages',
        type: 'single_choice',
        text: 'In a hospital ward of 120 patients, 45% are admitted with respiratory disorders, 35% with cardiac conditions, and the remaining with orthopedic injuries. How many patients are admitted with orthopedic injuries?',
        options: [
          { id: 'A', text: '24 patients' },
          { id: 'B', text: '20 patients' },
          { id: 'C', text: '28 patients' },
          { id: 'D', text: '32 patients' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Percentage of orthopedic patients = 100% - (45% + 35%) = 100% - 80% = 20%. Number of patients = 20% of 120 = 0.20 × 120 = 24.',
        referenceNotes: 'Basic Arithmetic for General Aptitude'
      },
      {
        id: 'norcet_q24',
        questionNumber: 24,
        sectionId: 'sec_gen_apt',
        sectionName: 'General Awareness & Reasoning',
        subject: 'General Knowledge & Current Affairs',
        topic: 'Indian Constitution & Public Health',
        type: 'single_choice',
        text: 'Under which Article of the Constitution of India is the Improvement of Public Health declared as a primary duty of the State under Directive Principles of State Policy (DPSP)?',
        options: [
          { id: 'A', text: 'Article 47' },
          { id: 'B', text: 'Article 21' },
          { id: 'C', text: 'Article 32' },
          { id: 'D', text: 'Article 51A' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'Article 47 directs the State to raise the level of nutrition and the standard of living of its people and the improvement of public health as among its primary duties.',
        referenceNotes: 'Constitution of India - Part IV (DPSP)'
      },
      {
        id: 'norcet_q25',
        questionNumber: 25,
        sectionId: 'sec_gen_apt',
        sectionName: 'General Awareness & Reasoning',
        subject: 'General Intelligence & Reasoning',
        topic: 'Letter & Number Coding Series',
        type: 'single_choice',
        text: 'If in a certain code language, DOCTOR is coded as 4153201518, how will NURSE be coded in the same system?',
        options: [
          { id: 'A', text: '142118195' },
          { id: 'B', text: '132017184' },
          { id: 'C', text: '142119185' },
          { id: 'D', text: '152219206' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Each letter is replaced by its alphabetical position: N=14, U=21, R=18, S=19, E=5. Result: 142118195.',
        referenceNotes: 'Analytical Reasoning Fundamentals'
      }
    ]
  },

  // 2. OSSSC Nursing Officer 2026 Special Mock Test (Odisha Specific + Nursing Core) - 20 Complete Questions
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
      },
      {
        id: 'osssc_q5',
        questionNumber: 5,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Community Health Nursing',
        topic: 'ASHA & Anganwadi Norms',
        type: 'single_choice',
        text: 'In rural plain areas in India, one Accredited Social Health Activist (ASHA) worker is generally appointed for what target population size?',
        options: [
          { id: 'A', text: '1,000 population' },
          { id: 'B', text: '500 population' },
          { id: 'C', text: '2,500 population' },
          { id: 'D', text: '5,000 population' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Under National Rural Health Mission (NRHM), one ASHA worker is selected per 1,000 rural population in plain areas (and 1 per hamlet/habitation in tribal/hilly areas).',
        referenceNotes: 'NRHM Operational Guidelines'
      },
      {
        id: 'osssc_q6',
        questionNumber: 6,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Fundamentals of Nursing',
        topic: 'Enema Administration Technique',
        type: 'single_choice',
        text: 'Which patient position is recommended as the most anatomically suitable position for administering an evacuation enema?',
        options: [
          { id: 'A', text: 'Left Lateral (Sims’) position' },
          { id: 'B', text: 'Right Lateral position' },
          { id: 'C', text: 'High Fowler’s position' },
          { id: 'D', text: 'Lithotomy position' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Left Lateral (Sims’) position allows the enema solution to flow downward by gravity along the natural anatomical curvature of the sigmoid colon and rectum.',
        referenceNotes: 'Clinical Nursing Skills & Techniques'
      },
      {
        id: 'osssc_q7',
        questionNumber: 7,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Medical Surgical Nursing',
        topic: 'Tuberculosis DOTS Therapy',
        type: 'single_choice',
        text: 'Which first-line anti-tubercular drug (ATT) is widely known for causing Retrobulbar Optic Neuritis with red-green color blindness as a significant adverse effect?',
        options: [
          { id: 'A', text: 'Ethambutol (E)' },
          { id: 'B', text: 'Isoniazid (INH)' },
          { id: 'C', text: 'Rifampicin (R)' },
          { id: 'D', text: 'Pyrazinamide (Z)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Ethambutol (E) can cause dose-dependent optic neuritis leading to decreased visual acuity and inability to differentiate red and green colors.',
        referenceNotes: 'NTEP (National Tuberculosis Elimination Program) Clinical Guidelines'
      },
      {
        id: 'osssc_q8',
        questionNumber: 8,
        sectionId: 'sec_osssc_odisha_gk',
        sectionName: 'Practical Science & Odisha Health Portals',
        subject: 'Odisha Geography & Public Health',
        topic: 'Odisha Major Rivers & Waterborne Diseases',
        type: 'single_choice',
        text: 'Hirakud Dam, the longest earthen dam in India built on which major river in Odisha, plays a crucial role in flood control and regional sanitation in Sambalpur?',
        textOdia: 'ଓଡ଼ିଶାର ହୀରାକୁଦ ବନ୍ଧ କେଉଁ ନଦୀ ଉପରେ ନିର୍ମିତ?',
        options: [
          { id: 'A', text: 'Mahanadi' },
          { id: 'B', text: 'Brahmani' },
          { id: 'C', text: 'Baitarani' },
          { id: 'D', text: 'Subarnarekha' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Hirakud Dam is constructed across the Mahanadi River in Sambalpur district, Odisha.',
        referenceNotes: 'Odisha General Knowledge - Geography'
      },
      {
        id: 'osssc_q9',
        questionNumber: 9,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Obstetrics & Gynaecology Nursing',
        topic: 'Lochia Stages',
        type: 'single_choice',
        text: 'The normal postpartum vaginal discharge occurring between day 4 and day 9 post-delivery, having a pinkish-brown color, is known as:',
        options: [
          { id: 'A', text: 'Lochia Serosa' },
          { id: 'B', text: 'Lochia Rubra' },
          { id: 'C', text: 'Lochia Alba' },
          { id: 'D', text: 'Lochia Purulenta' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Lochia Rubra lasts 1-3 days (dark red); Lochia Serosa lasts 4-9 days (pinkish/brown serous); Lochia Alba lasts 10-14+ days (yellowish-white).',
        referenceNotes: 'DC Dutta’s Textbook of Obstetrics'
      },
      {
        id: 'osssc_q10',
        questionNumber: 10,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Pharmacology',
        topic: 'Insulin Storage & Administration',
        type: 'single_choice',
        text: 'Unopened vials of regular or NPH insulin must be stored at what temperature to prevent denaturation of peptide chains?',
        options: [
          { id: 'A', text: '2°C to 8°C (Refrigerator)' },
          { id: 'B', text: '-20°C (Deep Freezer)' },
          { id: 'C', text: '25°C to 30°C (Direct Sunlight)' },
          { id: 'D', text: '0°C (Ice box direct contact)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Unopened insulin should be refrigerated at 2°C to 8°C. It must NEVER be frozen. Opened in-use vials can be kept at room temperature (below 25-30°C) for up to 28 days.',
        referenceNotes: 'Clinical Diabetology & Pharmacology'
      },
      {
        id: 'osssc_q11',
        questionNumber: 11,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Pediatrics',
        topic: 'Kangaroo Mother Care (KMC)',
        type: 'single_choice',
        text: 'What are the two essential foundational components of Kangaroo Mother Care (KMC) provided to Low Birth Weight (LBW) and preterm infants?',
        options: [
          { id: 'A', text: 'Continuous skin-to-skin contact and Exclusive Breastfeeding' },
          { id: 'B', text: 'Incubator placement and formula milk' },
          { id: 'C', text: 'Phototherapy and daily oil massage' },
          { id: 'D', text: 'Antibiotic prophylaxis and warm blankets' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'KMC consists of early, continuous, and prolonged skin-to-skin contact between mother and baby combined with exclusive breastfeeding / breast milk feeding.',
        referenceNotes: 'WHO Kangaroo Mother Care Practical Guide'
      },
      {
        id: 'osssc_q12',
        questionNumber: 12,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Fundamentals of Nursing',
        topic: 'Hand Hygiene Steps (WHO 5 Moments)',
        type: 'single_choice',
        text: 'According to WHO Guidelines on Hand Hygiene in Healthcare, what is the minimum duration recommended for performing an Alcohol-Based Handrub (ABHR)?',
        options: [
          { id: 'A', text: '20 to 30 seconds' },
          { id: 'B', text: '5 to 10 seconds' },
          { id: 'C', text: '60 to 90 seconds' },
          { id: 'D', text: '2 to 3 minutes' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'WHO recommends 20-30 seconds for an alcohol handrub, and 40-60 seconds for handwashing with soap and water.',
        referenceNotes: 'WHO Clean Care is Safer Care Guidelines'
      },
      {
        id: 'osssc_q13',
        questionNumber: 13,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Medical Surgical Nursing',
        topic: 'Myocardial Infarction Biomarkers',
        type: 'single_choice',
        text: 'Which cardiac serum biomarker is considered the most specific and gold-standard sensitive indicator for diagnosing Acute Myocardial Infarction (AMI)?',
        options: [
          { id: 'A', text: 'Cardiac Troponin I / T (cTnI / cTnT)' },
          { id: 'B', text: 'Serum Myoglobin' },
          { id: 'C', text: 'Lactate Dehydrogenase (LDH)' },
          { id: 'D', text: 'Aspartate Aminotransferase (AST)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Cardiac Troponins (cTnI and cTnT) have nearly 100% myocardial tissue specificity and remain elevated for 7-14 days post-infarction.',
        referenceNotes: 'ESC/ACC Universal Definition of Myocardial Infarction'
      },
      {
        id: 'osssc_q14',
        questionNumber: 14,
        sectionId: 'sec_osssc_odisha_gk',
        sectionName: 'Practical Science & Odisha Health Portals',
        subject: 'Odisha Health Portals',
        topic: 'SAMMPRITI & Mamata Scheme',
        type: 'single_choice',
        text: 'Under the Mamata Scheme of Odisha Government, what is the total conditional cash transfer incentive given to pregnant and lactating women?',
        textOdia: 'ଓଡ଼ିଶା ସରକାରଙ୍କ ‘ମମତା’ ଯୋଜନାରେ ଗର୍ଭବତୀ ଓ ପ୍ରସୂତି ମହିଳାଙ୍କୁ ସମୁଦାୟ କେତେ ଟଙ୍କାର ଆର୍ଥିକ ପ୍ରୋତ୍ସାହନ ରାଶି ପ୍ରଦାନ କରାଯାଏ?',
        options: [
          { id: 'A', text: '₹5,000 in two installments' },
          { id: 'B', text: '₹3,000 in one installment' },
          { id: 'C', text: '₹10,000 in four installments' },
          { id: 'D', text: '₹8,000 in three installments' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Mamata Scheme in Odisha provides conditional cash assistance of ₹5,000 in two installments (₹3,000 during pregnancy after antenatal checkups and ₹2,000 after child immunization).',
        referenceNotes: 'Women & Child Development Dept, Odisha'
      },
      {
        id: 'osssc_q15',
        questionNumber: 15,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Community Health Nursing',
        topic: 'Oral Rehydration Salts (ORS) Formula',
        type: 'single_choice',
        text: 'What is the total osmolarity of the WHO Reduced Osmolarity ORS solution in mOsm/L?',
        options: [
          { id: 'A', text: '245 mOsm/L' },
          { id: 'B', text: '311 mOsm/L' },
          { id: 'C', text: '180 mOsm/L' },
          { id: 'D', text: '290 mOsm/L' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'medium',
        explanation: 'WHO/UNICEF Reduced Osmolarity ORS has a total osmolarity of 245 mOsm/L (Sodium 75, Chloride 65, Glucose 75, Potassium 20, Citrate 10).',
        referenceNotes: 'WHO/UNICEF Diarrhea Management Guidelines'
      },
      {
        id: 'osssc_q16',
        questionNumber: 16,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Fundamentals of Nursing',
        topic: 'Oxygen Therapy Devices',
        type: 'single_choice',
        text: 'Which oxygen administration device delivers the highest fraction of inspired oxygen (FiO2 up to 80-95%) in emergency clinical resuscitation?',
        options: [
          { id: 'A', text: 'Non-Rebreather Mask (NRBM) with reservoir bag' },
          { id: 'B', text: 'Nasal Cannula (Prongs)' },
          { id: 'C', text: 'Simple Face Mask' },
          { id: 'D', text: 'Venturi Mask' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'A Non-Rebreather Mask (NRBM) with flow set at 10-15 L/min delivers 80% to 95% FiO2 due to one-way valves that prevent room air entrainment.',
        referenceNotes: 'Emergency Nursing & Airway Management'
      },
      {
        id: 'osssc_q17',
        questionNumber: 17,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Midwifery & Obstetrical Nursing',
        topic: 'Fetal Heart Rate Monitoring',
        type: 'single_choice',
        text: 'What is the normal baseline range of Fetal Heart Rate (FHR) in a healthy full-term fetus?',
        options: [
          { id: 'A', text: '110 to 160 beats per minute' },
          { id: 'B', text: '80 to 110 beats per minute' },
          { id: 'C', text: '160 to 200 beats per minute' },
          { id: 'D', text: '60 to 90 beats per minute' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Normal baseline Fetal Heart Rate is 110-160 bpm. <110 bpm is fetal bradycardia; >160 bpm is fetal tachycardia.',
        referenceNotes: 'RCOG & ACOG Intrapartum Monitoring'
      },
      {
        id: 'osssc_q18',
        questionNumber: 18,
        sectionId: 'sec_osssc_odisha_gk',
        sectionName: 'Practical Science & Odisha Health Portals',
        subject: 'Odisha Culture & General Science',
        topic: 'Odisha Public Health Milestones',
        type: 'single_choice',
        text: 'Which district in Odisha is globally famous for the Sun Temple at Konark, an architectural masterpiece built by King Narasimhadeva I?',
        textOdia: 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ଓଡ଼ିଶାର କେଉଁ ଜିଲ୍ଲାରେ ଅବସ୍ଥିତ?',
        options: [
          { id: 'A', text: 'Puri District' },
          { id: 'B', text: 'Khurda District' },
          { id: 'C', text: 'Cuttack District' },
          { id: 'D', text: 'Ganjam District' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Konark Sun Temple is situated in Puri district along the coastline of Odisha.',
        referenceNotes: 'Odisha Tourism & Cultural Heritage'
      },
      {
        id: 'osssc_q19',
        questionNumber: 19,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Medical Surgical Nursing',
        topic: 'Appendicitis Physical Signs',
        type: 'single_choice',
        text: 'Palpation of the left lower quadrant causing increased sharp pain in the right lower quadrant is known as which diagnostic sign of acute appendicitis?',
        options: [
          { id: 'A', text: 'Rovsing’s sign' },
          { id: 'B', text: 'Murphy’s sign' },
          { id: 'C', text: 'Cullen’s sign' },
          { id: 'D', text: 'Kernig’s sign' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'medium',
        explanation: 'Rovsing’s sign is positive when deep pressure in the LLQ produces referred pain in the RLQ (McBurney’s point) due to peritoneal shift. Murphy’s is for cholecystitis.',
        referenceNotes: 'Bailey & Love’s Short Practice of Surgery'
      },
      {
        id: 'osssc_q20',
        questionNumber: 20,
        sectionId: 'sec_osssc_nursing',
        sectionName: 'Diploma Nursing & Midwifery Subjects',
        subject: 'Pediatrics',
        topic: 'Protein-Energy Malnutrition (PEM)',
        type: 'single_choice',
        text: 'A 2-year-old child presents with severe generalized edema, "flag sign" hair changes, dermatitis (flaky-paint dermatosis), and lethargy with a Moon face appearance. What condition is this?',
        options: [
          { id: 'A', text: 'Kwashiorkor (Severe Protein Deficiency)' },
          { id: 'B', text: 'Marasmus (Calorie Deficiency)' },
          { id: 'C', text: 'Rickets (Vitamin D Deficiency)' },
          { id: 'D', text: 'Scurvy (Vitamin C Deficiency)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 5.0,
        negativeMarks: 1.25,
        difficulty: 'easy',
        explanation: 'Kwashiorkor is characterized by bilateral pitting edema, enlarged fatty liver, dermatosis, apathy, and moon face with preserved subcutaneous fat, caused primarily by severe protein deficit.',
        referenceNotes: 'IAP Textbook of Pediatrics'
      }
    ]
  },

  // 3. School Board Curriculum: CBSE Class 10 Board Science & Mathematics (15 Questions)
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
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Biology',
        topic: 'Life Processes - Excretion in Humans',
        type: 'single_choice',
        text: 'In the human nephron, where does maximum selective tubular reabsorption of useful substances like glucose, amino acids, and major water take place?',
        options: [
          { id: 'A', text: 'Proximal Convoluted Tubule (PCT)' },
          { id: 'B', text: 'Loop of Henle' },
          { id: 'C', text: 'Distal Convoluted Tubule (DCT)' },
          { id: 'D', text: 'Collecting Duct' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'PCT is lined by simple cuboidal brush border epithelium which increases surface area for 70-80% reabsorption of electrolytes and 100% of glucose and amino acids.',
        referenceNotes: 'NCERT Class 10 Biology - Chapter 6: Life Processes'
      },
      {
        id: 'cbse10_q4',
        questionNumber: 4,
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Physics',
        topic: 'Light - Reflection and Refraction',
        type: 'single_choice',
        text: 'An object is placed at a distance of 20 cm in front of a convex lens of focal length 10 cm. What is the nature and magnification of the image formed?',
        options: [
          { id: 'A', text: 'Real, inverted and magnification m = -1' },
          { id: 'B', text: 'Virtual, erect and magnification m = +2' },
          { id: 'C', text: 'Real, inverted and magnification m = -2' },
          { id: 'D', text: 'Virtual, inverted and magnification m = +1' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'medium',
        explanation: 'Here u = -20 cm, f = +10 cm. Since u = 2f (at center of curvature), the image is formed at v = +20 cm (at 2F2 on other side). Nature: Real, inverted, same size (m = v/u = +20 / -20 = -1).',
        referenceNotes: 'NCERT Class 10 Physics - Chapter 10: Light'
      },
      {
        id: 'cbse10_q5',
        questionNumber: 5,
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Chemistry',
        topic: 'Metals and Non-metals',
        type: 'single_choice',
        text: 'Which metal is extracted by electrolysis of its molten chloride rather than chemical reduction by carbon because of its high electropositive affinity for oxygen?',
        options: [
          { id: 'A', text: 'Sodium (Na)' },
          { id: 'B', text: 'Zinc (Zn)' },
          { id: 'C', text: 'Iron (Fe)' },
          { id: 'D', text: 'Lead (Pb)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Highly reactive metals at top of reactivity series (K, Na, Ca, Mg, Al) have greater affinity for oxygen than carbon and cannot be reduced by carbon. Sodium is obtained by electrolysis of molten NaCl.',
        referenceNotes: 'NCERT Class 10 Chemistry - Chapter 3: Metals'
      },
      {
        id: 'cbse10_q6',
        questionNumber: 6,
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Biology',
        topic: 'Heredity & Evolution',
        type: 'single_choice',
        text: 'When a pure tall pea plant (TT) is crossed with a pure dwarf pea plant (tt), what is the phenotypic ratio of tall to dwarf plants in the F2 generation?',
        options: [
          { id: 'A', text: '3 : 1' },
          { id: 'B', text: '1 : 2 : 1' },
          { id: 'C', text: '9 : 3 : 3 : 1' },
          { id: 'D', text: '2 : 1' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Mendel\'s Monohybrid Cross: F1 generation is all Tt (tall). Self-pollination of F1 yields F2 with genotypes 1 TT : 2 Tt : 1 tt, giving a phenotypic ratio of 3 Tall : 1 Dwarf.',
        referenceNotes: 'NCERT Class 10 Biology - Chapter 9: Heredity'
      },
      {
        id: 'cbse10_q7',
        questionNumber: 7,
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Chemistry',
        topic: 'Acids, Bases and Salts',
        type: 'single_choice',
        text: 'What is the chemical formula of Plaster of Paris (POP) and how is it prepared from Gypsum?',
        options: [
          { id: 'A', text: 'CaSO4 · 1/2 H2O (Calcium Sulfate Hemihydrate) by heating Gypsum at 373 K' },
          { id: 'B', text: 'CaSO4 · 2 H2O by cooling Slaked Lime' },
          { id: 'C', text: 'CaCO3 by heating Quicklime at 500 K' },
          { id: 'D', text: 'CaOCl2 by chlorinating Bleaching powder' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'On heating gypsum (CaSO4·2H2O) at 373 K (100°C), it loses water molecules and becomes calcium sulfate hemihydrate (CaSO4·1/2H2O), known as Plaster of Paris.',
        referenceNotes: 'NCERT Class 10 Chemistry - Chapter 2: Acids, Bases, Salts'
      },
      {
        id: 'cbse10_q8',
        questionNumber: 8,
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Physics',
        topic: 'Magnetic Effects of Electric Current',
        type: 'single_choice',
        text: 'According to Fleming’s Left-Hand Rule used for electric motors, what does the Middle Finger represent?',
        options: [
          { id: 'A', text: 'Direction of electric current in the conductor' },
          { id: 'B', text: 'Direction of magnetic field' },
          { id: 'C', text: 'Direction of force / motion of conductor' },
          { id: 'D', text: 'Direction of induced electromotive force' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Fleming\'s Left-Hand Rule: Thumb represents Motion/Force (F), Forefinger represents Magnetic Field (B), and Middle Finger represents Current (I).',
        referenceNotes: 'NCERT Class 10 Physics - Chapter 13'
      },
      {
        id: 'cbse10_q9',
        questionNumber: 9,
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Biology',
        topic: 'Control & Coordination in Plants',
        type: 'single_choice',
        text: 'Which plant hormone is responsible for the ripening of fruits and abscission of leaves?',
        options: [
          { id: 'A', text: 'Ethylene' },
          { id: 'B', text: 'Auxin' },
          { id: 'C', text: 'Gibberellin' },
          { id: 'D', text: 'Cytokinin' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Ethylene is a gaseous phytohormone that promotes fruit ripening and senescence. Auxins and Gibberellins promote growth and elongation.',
        referenceNotes: 'NCERT Class 10 Biology - Chapter 7'
      },
      {
        id: 'cbse10_q10',
        questionNumber: 10,
        sectionId: 'sec_sci',
        sectionName: 'Science (Physics, Chemistry, Biology)',
        subject: 'Chemistry',
        topic: 'Carbon and its Compounds',
        type: 'single_choice',
        text: 'The functional group present in propanone (CH3-CO-CH3) is:',
        options: [
          { id: 'A', text: 'Ketone (-CO-)' },
          { id: 'B', text: 'Aldehyde (-CHO)' },
          { id: 'C', text: 'Alcohol (-OH)' },
          { id: 'D', text: 'Carboxylic Acid (-COOH)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Propanone (acetone) has the carbonyl group (>C=O) bonded to two alkyl groups, which represents the Ketone family.',
        referenceNotes: 'NCERT Class 10 Chemistry - Chapter 4: Carbon'
      },
      // Mathematics Section (5 Questions)
      {
        id: 'cbse10_q11',
        questionNumber: 11,
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
      },
      {
        id: 'cbse10_q12',
        questionNumber: 12,
        sectionId: 'sec_math',
        sectionName: 'Mathematics (Standard & Basic)',
        subject: 'Mathematics',
        topic: 'Quadratic Equations',
        type: 'single_choice',
        text: 'For what value of k will the quadratic equation 2x² - kx + 8 = 0 have two equal real roots?',
        options: [
          { id: 'A', text: 'k = ± 8' },
          { id: 'B', text: 'k = ± 4' },
          { id: 'C', text: 'k = 16' },
          { id: 'D', text: 'k = ± 2' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'medium',
        explanation: 'For equal real roots, Discriminant D = b² - 4ac = 0. Here (-k)² - 4(2)(8) = 0 => k² - 64 = 0 => k² = 64 => k = ±8.',
        referenceNotes: 'NCERT Class 10 Mathematics - Chapter 4'
      },
      {
        id: 'cbse10_q13',
        questionNumber: 13,
        sectionId: 'sec_math',
        sectionName: 'Mathematics (Standard & Basic)',
        subject: 'Mathematics',
        topic: 'Arithmetic Progressions (AP)',
        type: 'single_choice',
        text: 'In an AP, if the first term a = 3, common difference d = 4, what is the sum of the first 20 terms (S20)?',
        options: [
          { id: 'A', text: '820' },
          { id: 'B', text: '760' },
          { id: 'C', text: '840' },
          { id: 'D', text: '900' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'easy',
        explanation: 'Sn = (n/2)[2a + (n - 1)d]. S20 = (20/2)[2(3) + (19)(4)] = 10 [6 + 76] = 10 [82] = 820.',
        referenceNotes: 'NCERT Class 10 Mathematics - Chapter 5'
      },
      {
        id: 'cbse10_q14',
        questionNumber: 14,
        sectionId: 'sec_math',
        sectionName: 'Mathematics (Standard & Basic)',
        subject: 'Mathematics',
        topic: 'Circles & Tangents',
        type: 'single_choice',
        text: 'If tangents PA and PB from a point P to a circle with center O are inclined to each other at an angle of 80°, then angle ∠POA is equal to:',
        options: [
          { id: 'A', text: '50°' },
          { id: 'B', text: '60°' },
          { id: 'C', text: '70°' },
          { id: 'D', text: '80°' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'medium',
        explanation: 'In quadrilateral PAOB, angles at A and B are 90°. Thus ∠AOB + ∠APB = 180° => ∠AOB = 180° - 80° = 100°. The line PO bisects ∠AOB, so ∠POA = 100° / 2 = 50°.',
        referenceNotes: 'NCERT Class 10 Mathematics - Chapter 10: Circles'
      },
      {
        id: 'cbse10_q15',
        questionNumber: 15,
        sectionId: 'sec_math',
        sectionName: 'Mathematics (Standard & Basic)',
        subject: 'Mathematics',
        topic: 'Surface Areas and Volumes',
        type: 'single_choice',
        text: 'A solid metallic sphere of radius 6 cm is melted and recast into small solid cones of radius 3 cm and height 4 cm. How many small cones are obtained?',
        options: [
          { id: 'A', text: '24 cones' },
          { id: 'B', text: '18 cones' },
          { id: 'C', text: '32 cones' },
          { id: 'D', text: '12 cones' }
        ],
        correctAnswer: 'A',
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        difficulty: 'medium',
        explanation: 'Volume of sphere = (4/3)πR³ = (4/3)π(6)³ = (4/3)π(216) = 288π cm³. Volume of one cone = (1/3)πr²h = (1/3)π(3)²(4) = 12π cm³. Number of cones = 288π / 12π = 24.',
        referenceNotes: 'NCERT Class 10 Mathematics - Chapter 13'
      }
    ]
  },

  // 4. SSC CGL Tier-1 CBT Speed Mock Test (20 Questions)
  {
    id: 'test_ssc_cgl_tier1_2026',
    slug: 'ssc-cgl-tier1-cbt-mock',
    title: 'SSC CGL 2026 Tier-1 Official Pattern Mock Test',
    titleOdia: 'SSC CGL ୨୦୨୬ ଟାୟାର-୧ ଅଫିସିଆଲ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: '100% SSC CBT Interface Replicate: Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension.',
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
    featuredBadge: 'Arohi CBT Speed Layout',
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
      },
      {
        id: 'ssc_q5',
        questionNumber: 5,
        sectionId: 'sec_qa',
        sectionName: 'Quantitative Aptitude',
        subject: 'Mathematics',
        topic: 'Time and Work',
        type: 'single_choice',
        text: 'A can complete a piece of work in 12 days, and B can complete the same work in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?',
        options: [
          { id: 'A', text: '4 / 9' },
          { id: 'B', text: '5 / 9' },
          { id: 'C', text: '1 / 3' },
          { id: 'D', text: '2 / 9' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'medium',
        explanation: 'Total work = LCM(12, 18) = 36 units. Efficiency of A = 36/12 = 3 u/day; B = 36/18 = 2 u/day. Together in 4 days = (3 + 2) × 4 = 20 units. Remaining work = 36 - 20 = 16 units. Fraction remaining = 16 / 36 = 4/9.',
        referenceNotes: 'SSC Quantitative Aptitude Tricks'
      },
      {
        id: 'ssc_q6',
        questionNumber: 6,
        sectionId: 'sec_ga',
        sectionName: 'General Awareness & Indian Economy',
        subject: 'General Science',
        topic: 'Periodic Table & Chemistry',
        type: 'single_choice',
        text: 'Which metal in the modern periodic table has the highest melting point (approx 3422°C) and is used as filaments in incandescent bulbs?',
        options: [
          { id: 'A', text: 'Tungsten (W)' },
          { id: 'B', text: 'Platinum (Pt)' },
          { id: 'C', text: 'Titanium (Ti)' },
          { id: 'D', text: 'Tantalum (Ta)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'Tungsten (Wolfram, W, atomic number 74) has the highest melting point of all metallic elements (3,422°C / 6,192°F).',
        referenceNotes: 'General Science NCERT Revision'
      },
      {
        id: 'ssc_q7',
        questionNumber: 7,
        sectionId: 'sec_gi',
        sectionName: 'General Intelligence & Reasoning',
        subject: 'Reasoning',
        topic: 'Syllogism',
        type: 'single_choice',
        text: 'Statements: 1. All doctors are researchers. 2. Some researchers are scientists.\nConclusions: I. Some doctors are scientists. II. Some scientists are researchers.',
        options: [
          { id: 'A', text: 'Only conclusion II follows' },
          { id: 'B', text: 'Only conclusion I follows' },
          { id: 'C', text: 'Both conclusions I and II follow' },
          { id: 'D', text: 'Neither conclusion follows' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'medium',
        explanation: 'From "Some researchers are scientists", the converse "Some scientists are researchers" is direct and valid (Conclusion II follows). "Some doctors are scientists" is not necessarily true (I does not follow).',
        referenceNotes: 'Syllogism Rules for Central Exams'
      },
      {
        id: 'ssc_q8',
        questionNumber: 8,
        sectionId: 'sec_el',
        sectionName: 'English Comprehension & Grammar',
        subject: 'English',
        topic: 'One Word Substitution',
        type: 'single_choice',
        text: 'Select the word which means the same as the group of words given: "A person who loves, collects, and studies books."',
        options: [
          { id: 'A', text: 'Bibliophile' },
          { id: 'B', text: 'Philatelist' },
          { id: 'C', text: 'Numismatist' },
          { id: 'D', text: 'Polyglot' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'Bibliophile = lover of books. Philatelist = stamp collector. Numismatist = coin collector. Polyglot = speaker of many languages.',
        referenceNotes: 'High-School English Grammar & Composition'
      },
      {
        id: 'ssc_q9',
        questionNumber: 9,
        sectionId: 'sec_qa',
        sectionName: 'Quantitative Aptitude',
        subject: 'Mathematics',
        topic: 'Simple and Compound Interest',
        type: 'single_choice',
        text: 'The difference between Compound Interest and Simple Interest on a sum of money for 2 years at 10% per annum compounded annually is ₹65. What is the principal sum?',
        options: [
          { id: 'A', text: '₹6,500' },
          { id: 'B', text: '₹5,500' },
          { id: 'C', text: '₹7,200' },
          { id: 'D', text: '₹6,000' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'medium',
        explanation: 'For 2 years: CI - SI = P × (r/100)². Here 65 = P × (10/100)² = P × (1/100) => P = 65 × 100 = ₹6,500.',
        referenceNotes: 'SSC CGL Arithmetic Formulas'
      },
      {
        id: 'ssc_q10',
        questionNumber: 10,
        sectionId: 'sec_ga',
        sectionName: 'General Awareness & Indian Economy',
        subject: 'Indian History',
        topic: 'Modern Indian History & Freedom Struggle',
        type: 'single_choice',
        text: 'Who was the Governor-General of India when the Indian National Congress (INC) was founded in Bombay in December 1885?',
        options: [
          { id: 'A', text: 'Lord Dufferin' },
          { id: 'B', text: 'Lord Ripon' },
          { id: 'C', text: 'Lord Curzon' },
          { id: 'D', text: 'Lord Dalhousie' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'Lord Dufferin served as the Viceroy of India from 1884 to 1888 when the INC was founded by Allan Octavian Hume in 1885.',
        referenceNotes: 'Bipan Chandra - India\'s Struggle for Independence'
      }
    ]
  }
];

const RAW_INITIAL_MOCK_TESTS: MockTest[] = [
  ...DEFAULT_MOCK_TESTS,
  ...PAN_INDIA_MASTER_MOCK_TESTS,
  ...ADDITIONAL_MOCK_TESTS,
  ...COMPREHENSIVE_EXPANDED_MOCK_TESTS,
  ...MEGA_SCHOOL_MOCK_TESTS,
  ...MEGA_ENTRANCE_MOCK_TESTS,
  ...MEGA_CENTRAL_GOVT_MOCK_TESTS,
  ...MEGA_STATE_TEACHING_NURSING_MOCK_TESTS,
  ...EXPANDED_SECTOR_MOCK_TESTS
];

const seenTestIds = new Set<string>();
const DEDUPED_MOCK_TESTS: MockTest[] = [];

for (const test of RAW_INITIAL_MOCK_TESTS) {
  if (!seenTestIds.has(test.id)) {
    seenTestIds.add(test.id);
    DEDUPED_MOCK_TESTS.push(test);
  }
}

export const INITIAL_MOCK_TESTS: MockTest[] = DEDUPED_MOCK_TESTS.map(test => {
  const resolvedCategory = classifyTestCategory(test);
  return {
    ...test,
    totalSets: test.totalSets || 20,
    currentSetNumber: test.currentSetNumber || 1,
    setNumber: test.currentSetNumber || 1,
    resolvedCategory,
    kgLineage: test.kgLineage || resolveKGLineage(test)
  };
});

export const MOCK_EXAM_CATEGORIES = [
  { id: 'all', label: 'All Exam Tracks', count: '150+ Tests', icon: 'Sparkles', color: 'from-purple-500 to-indigo-600' },
  { id: 'upsc_civil', label: 'UPSC & Civil Services', count: 'CSE / IAS / IPS / NDA / CDS', icon: 'Landmark', color: 'from-amber-600 to-orange-600', badge: 'National' },
  { id: 'ssc_graduate_12th', label: 'SSC Recruitment', count: 'CGL / CHSL / MTS / GD / CPO', icon: 'Building', color: 'from-blue-600 to-indigo-600' },
  { id: 'railway_rrb', label: 'Railways (RRB / RRC)', count: 'NTPC / Group D / ALP / JE', icon: 'Zap', color: 'from-rose-600 to-red-600' },
  { id: 'banking_ibps', label: 'Banking & Financial', count: 'IBPS PO / SBI / RBI / LIC', icon: 'Coins', color: 'from-emerald-600 to-teal-600' },
  { id: 'state_psc_all_28', label: '28 State PSCs & SSBs', count: 'BPSC / UPPSC / MPSC / OPSC', icon: 'Building', color: 'from-violet-600 to-purple-700', badge: 'All 28 States' },
  { id: 'police_state_cadres', label: 'Police & Paramilitary', count: 'UP Police / Delhi / SI / GD', icon: 'ShieldCheck', color: 'from-cyan-600 to-blue-700' },
  { id: 'medical_neet_nursing', label: 'Medical & Nursing', count: 'NEET UG / AIIMS NORCET / ESIC', icon: 'HeartPulse', color: 'from-rose-500 to-pink-600', badge: 'Special Focus' },
  { id: 'engineering_jee_gate', label: 'Engineering & GATE', count: 'JEE Main / Advanced / GATE CSE', icon: 'Award', color: 'from-orange-500 to-amber-600' },
  { id: 'teaching_tet_ctet', label: 'Teaching & TET', count: 'CTET / Super TET / State TETs', icon: 'GraduationCap', color: 'from-teal-500 to-emerald-600' },
  { id: 'management_cat_mba', label: 'Management & Law', count: 'CAT / CLAT / CMAT / Judiciary', icon: 'TrendingUp', color: 'from-indigo-600 to-slate-700' },
  { id: 'school_boards', label: 'School Boards (Class 1-10)', count: 'CBSE / ICSE / State Boards', icon: 'GraduationCap', color: 'from-amber-500 to-orange-600', badge: 'All Curriculums' }
];
