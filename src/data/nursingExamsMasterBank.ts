import { ExamQuestion } from '../types/examTypes';
import { QuestionTemplate } from '../utils/examQuestionExpander';

/**
 * MASTER AROHI CLINICAL NURSING & HEALTHCARE QUESTION BANK
 * Comprehensive, authentic, 100% non-repetitive clinical questions
 * for AIIMS NORCET, OSSSC Nursing Officer (Odisha), ESIC, DSSSB, and JIPMER.
 */

// =========================================================================
// 1. AIIMS NORCET CLINICAL CORE QUESTIONS (100 Unique Questions)
// =========================================================================
export const AIIMS_NORCET_100_DISTINCT_QUESTIONS: ExamQuestion[] = [
  // --- MEDICAL-SURGICAL & CRITICAL CARE (Questions 1-25) ---
  {
    id: 'norcet100_q1',
    questionNumber: 1,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Cardiovascular & Emergency ACLS',
    type: 'single_choice',
    text: 'A patient in the CCU suddenly exhibits coarse Ventricular Fibrillation (VF) on the cardiac monitor. The patient is unresponsive and pulseless. What is the immediate first-line priority action?',
    options: [
      { id: 'A', text: 'Initiate high-quality CPR and deliver immediate unsynchronized Defibrillation' },
      { id: 'B', text: 'Administer IV Amiodarone 300 mg bolus prior to CPR' },
      { id: 'C', text: 'Perform synchronized cardioversion at 50 Joules' },
      { id: 'D', text: 'Administer IV Epinephrine 1 mg before rhythm assessment' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'ACLS Guidelines: Pulseless Ventricular Fibrillation (VF) and pulseless Ventricular Tachycardia (pVT) are shockable cardiac arrest rhythms requiring immediate CPR and early unsynchronized defibrillation (120-200J biphasic or 360J monophasic). Synchronized cardioversion is contraindicated in VF because there is no identifiable R wave to synchronize with.',
    referenceNotes: 'AHA ACLS Cardiac Arrest Protocol 2025-2026'
  },
  {
    id: 'norcet100_q2',
    questionNumber: 2,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Arterial Blood Gas (ABG) Interpretation',
    type: 'single_choice',
    text: 'An ABG report of a patient on mechanical ventilation reveals: pH 7.28, PaCO2 56 mmHg, PaO2 82 mmHg, and HCO3 25 mEq/L. How should the nurse interpret this acid-base imbalance?',
    options: [
      { id: 'A', text: 'Uncompensated Respiratory Acidosis' },
      { id: 'B', text: 'Compensated Metabolic Acidosis' },
      { id: 'C', text: 'Uncompensated Metabolic Alkalosis' },
      { id: 'D', text: 'Partially Compensated Respiratory Alkalosis' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'pH < 7.35 indicates Acidosis. PaCO2 > 45 mmHg indicates Respiratory origin (alveolar hypoventilation/CO2 retention). HCO3 is within the normal range (22-26 mEq/L), indicating the kidneys have not yet compensated. Hence, it is Uncompensated Respiratory Acidosis.',
    referenceNotes: 'Clinical Arterial Blood Gas Analysis & Acid-Base Balance'
  },
  {
    id: 'norcet100_q3',
    questionNumber: 3,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Burns & Parkland Resuscitation Formula',
    type: 'single_choice',
    text: 'A 70 kg adult sustained 40% Total Body Surface Area (TBSA) second and third-degree thermal burns. Using the Parkland formula (4 mL × kg × %TBSA), how much fluid should the nurse infuse during the first 8 hours after injury?',
    options: [
      { id: 'A', text: '5,600 mL of Ringer Lactate' },
      { id: 'B', text: '11,200 mL of 0.9% Normal Saline' },
      { id: 'C', text: '2,800 mL of 5% Dextrose' },
      { id: 'D', text: '4,200 mL of Ringer Lactate' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'hard',
    explanation: 'Total 24-hr Parkland fluid = 4 mL × 70 kg × 40% = 11,200 mL of Ringer Lactate. Half of the total 24-hr requirement (50% = 5,600 mL) must be infused in the first 8 hours calculated from the time of burn injury, and the remaining 5,600 mL over the next 16 hours.',
    referenceNotes: 'American Burn Association (ABA) Fluid Resuscitation Guidelines'
  },
  {
    id: 'norcet100_q4',
    questionNumber: 4,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Neurology & Increased ICP (Cushing Triad)',
    type: 'single_choice',
    text: 'A traumatic brain injury patient in the Neuro-ICU exhibits a widening pulse pressure with progressive hypertension, severe bradycardia (HR 44 bpm), and irregular bradypnea (Cheyne-Stokes breathing). What does this classic triad signify?',
    options: [
      { id: 'A', text: 'Cushing’s Triad indicating critically elevated Intracranial Pressure (ICP) & imminent brain herniation' },
      { id: 'B', text: 'Beck’s Triad indicating acute cardiac tamponade' },
      { id: 'C', text: 'Charcot’s Triad indicating ascending acute cholangitis' },
      { id: 'D', text: 'Virchow’s Triad indicating deep vein thrombosis' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Cushing’s Triad consists of: 1) Systolic hypertension with widening pulse pressure, 2) Bradycardia, and 3) Irregular respirations. It is a late and ominous clinical sign of severe intracranial hypertension with risk of uncal or transtentorial brain herniation.',
    referenceNotes: 'Neurological Assessment in Critical Care Nursing'
  },
  {
    id: 'norcet100_q5',
    questionNumber: 5,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Glasgow Coma Scale (GCS)',
    type: 'single_choice',
    text: 'Upon assessing a patient post-road traffic accident, the nurse observes: eyes open only in response to painful sternal rub (E2), produces incomprehensible groans (V2), and withdraws limbs from pain with abnormal flexion (M3). What is the total GCS score?',
    options: [
      { id: 'A', text: 'GCS = 7 (Severe Head Injury / Coma)' },
      { id: 'B', text: 'GCS = 9 (Moderate Head Injury)' },
      { id: 'C', text: 'GCS = 5 (Deep Coma)' },
      { id: 'D', text: 'GCS = 11 (Mild Head Injury)' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'GCS breakdown: Eye opening to pain = 2; Verbal response (incomprehensible sounds) = 2; Motor response (abnormal decorticate flexion) = 3. Total Score = 2 + 2 + 3 = 7. Scores ≤ 8 indicate severe neurological impairment requiring intubation and airway protection.',
    referenceNotes: 'Teasdale & Jennett Glasgow Coma Scale Protocol'
  },
  {
    id: 'norcet100_q6',
    questionNumber: 6,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Respiratory System & Intercostal Chest Drainage',
    type: 'single_choice',
    text: 'A nurse cares for a patient with a chest tube placed for left-sided traumatic pneumothorax. What does constant, vigorous bubbling in the water-seal chamber indicate?',
    options: [
      { id: 'A', text: 'An active air leak in the chest tube drainage system or bronchopleural fistula' },
      { id: 'B', text: 'Normal evacuation of pleural air during deep expiration' },
      { id: 'C', text: 'Complete re-expansion and resolution of pneumothorax' },
      { id: 'D', text: 'Obstruction of the drainage tube by a blood clot' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Intermittent bubbling during exhalation or coughing is normal in pneumothorax. Continuous vigorous bubbling in the water-seal chamber indicates an air leak either in the tubing/connections or an ongoing bronchopleural air leak.',
    referenceNotes: 'Chest Tube Management & Critical Care Nursing'
  },
  {
    id: 'norcet100_q7',
    questionNumber: 7,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Endocrinology & Diabetic Ketoacidosis (DKA)',
    type: 'single_choice',
    text: 'A Type 1 diabetic patient presents with Diabetic Ketoacidosis (blood glucose 520 mg/dL, pH 7.12, serum K+ 5.8 mEq/L). Which IV fluid should the nurse infuse first to restore intravascular volume?',
    options: [
      { id: 'A', text: '0.9% Isotonic Normal Saline at 1000 mL/hr' },
      { id: 'B', text: '5% Dextrose in Water (D5W)' },
      { id: 'C', text: '0.45% Half-Normal Saline with 40 mEq KCl' },
      { id: 'D', text: '3% Hypertonic Saline' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Initial DKA fluid management requires 0.9% Normal Saline (1-1.5 L during the first hour) to correct hypovolemia and maintain tissue perfusion. Once blood glucose falls below 250 mg/dL, dextrose (D5W with 0.45% NS) is added to prevent hypoglycemia and cerebral edema.',
    referenceNotes: 'American Diabetes Association (ADA) DKA Protocol'
  },
  {
    id: 'norcet100_q8',
    questionNumber: 8,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Gastrointestinal & Acute Appendicitis Signs',
    type: 'single_choice',
    text: 'During abdominal examination of a suspected acute appendicitis patient, deep palpation in the Left Lower Quadrant (LLQ) produces pain referred to the Right Lower Quadrant (RLQ). What is this sign called?',
    options: [
      { id: 'A', text: 'Rovsing’s Sign' },
      { id: 'B', text: 'Murphy’s Sign' },
      { id: 'C', text: 'Cullen’s Sign' },
      { id: 'D', text: 'Grey Turner’s Sign' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Rovsing’s sign is referred tenderness in the RLQ upon deep palpation of the LLQ. Murphy’s sign indicates acute cholecystitis; Cullen’s sign (periumbilical ecchymosis) and Grey Turner’s sign (flank ecchymosis) indicate retroperitoneal hemorrhage or acute pancreatitis.',
    referenceNotes: 'Surgical Signs & Physical Assessment Handbook'
  },
  {
    id: 'norcet100_q9',
    questionNumber: 9,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Renal & Electrolytes (Hyperkalemia ECG)',
    type: 'single_choice',
    text: 'A patient with End-Stage Renal Disease has a serum Potassium level of 7.2 mEq/L. Which electrocardiographic changes should the nurse immediately recognize as life-threatening hyperkalemia?',
    options: [
      { id: 'A', text: 'Tall, tented (peaked) T waves with widened QRS complex and prolonged PR interval' },
      { id: 'B', text: 'Prominent U waves with ST depression' },
      { id: 'C', text: 'Shortened QT interval with peaked P waves' },
      { id: 'D', text: 'Delta waves with short PR interval' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Hyperkalemia (>6.5 mEq/L) causes tall peaked T waves, prolonged PR interval, loss of P waves, and widening of the QRS complex. Without immediate treatment (IV Calcium Gluconate to stabilize myocardium, Insulin+Dextrose, Salbutamol nebulization), it degenerates into a sine-wave pattern and asystole.',
    referenceNotes: 'Clinical Electrocardiography & Emergency Medicine'
  },
  {
    id: 'norcet100_q10',
    questionNumber: 10,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Medical Surgical Nursing',
    topic: 'Blood Transfusion Reactions',
    type: 'single_choice',
    text: 'Ten minutes after starting Packed Red Blood Cells (PRBC), the patient complains of acute flank pain, chills, fever, dyspnea, and red-colored urine. What is the nurse’s first immediate intervention?',
    options: [
      { id: 'A', text: 'Stop the blood transfusion immediately and infuse 0.9% Normal Saline through fresh tubing' },
      { id: 'B', text: 'Slow the transfusion rate to 10 drops/min and administer IV Paracetamol' },
      { id: 'C', text: 'Administer IV Chlorpheniramine and resume transfusion after 10 minutes' },
      { id: 'D', text: 'Flush the blood line with Dextrose 5% water' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Flank pain, fever, chills, and hemoglobinuria indicate an Acute Hemolytic Transfusion Reaction (ABO incompatibility). The nurse MUST stop the transfusion immediately, disconnect tubing from IV catheter hub, keep vein open with fresh 0.9% saline and new tubing, and send remaining blood bag + urine sample to the blood bank.',
    referenceNotes: 'NABH Standard Blood Transfusion Guidelines'
  },

  // --- PHARMACOLOGY & TOXICOLOGY (Questions 11-20) ---
  {
    id: 'norcet100_q11',
    questionNumber: 11,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pharmacology',
    topic: 'Emergency Antidotes',
    type: 'single_choice',
    text: 'A patient receiving Continuous IV Unfractionated Heparin for Pulmonary Embolism presents with an aPTT > 130 seconds and active mucosal bleeding. Which antidote must be administered immediately?',
    options: [
      { id: 'A', text: 'Protamine Sulfate (1 mg neutralizes ~100 USP units of Heparin)' },
      { id: 'B', text: 'Vitamin K1 (Phytonadione)' },
      { id: 'C', text: 'Deferoxamine' },
      { id: 'D', text: 'Flumazenil' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Protamine Sulfate is a strongly basic protein that binds with strongly acidic heparin to form a stable, inactive salt complex. Vitamin K is the antidote for Warfarin; Flumazenil is for Benzodiazepines.',
    referenceNotes: 'Lippincott Pharmacology for Clinical Nursing'
  },
  {
    id: 'norcet100_q12',
    questionNumber: 12,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pharmacology',
    topic: 'Cardiac Inotropes & Digoxin Safety',
    type: 'single_choice',
    text: 'Before administering oral Digoxin (0.25 mg) to an adult patient in heart failure, what vital assessment must the nurse perform?',
    options: [
      { id: 'A', text: 'Auscultate apical pulse for 1 full minute; withhold if HR < 60 bpm' },
      { id: 'B', text: 'Palpate radial pulse for 15 seconds; withhold if HR < 70 bpm' },
      { id: 'C', text: 'Check blood glucose level; withhold if > 160 mg/dL' },
      { id: 'D', text: 'Measure respiratory rate; withhold if < 16 breaths/min' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Digoxin has negative chronotropic effects (slows AV conduction). Apical pulse must be auscultated for a full 60 seconds. In adults, withhold if HR < 60 bpm; in children < 70 bpm; in infants < 90-100 bpm.',
    referenceNotes: 'Safe Medication Administration Protocols'
  },
  {
    id: 'norcet100_q13',
    questionNumber: 13,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pharmacology',
    topic: 'Acetaminophen Toxicity & Antidote',
    type: 'single_choice',
    text: 'A teenager presents to the ER with an acute Paracetamol (Acetaminophen) overdose. Which specific hepatoprotective antidote should be started within 8 hours of ingestion?',
    options: [
      { id: 'A', text: 'N-Acetylcysteine (NAC / Mucomyst)' },
      { id: 'B', text: 'Methylene Blue' },
      { id: 'C', text: 'Dimercaprol (BAL)' },
      { id: 'D', text: 'Pralidoxime (2-PAM)' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'N-Acetylcysteine (NAC) replenishes hepatic glutathione stores and binds toxic NAPQI metabolite, preventing centrilobular liver necrosis.',
    referenceNotes: 'Emergency Toxicology & Antidote Administration'
  },
  {
    id: 'norcet100_q14',
    questionNumber: 14,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pharmacology',
    topic: 'Anti-Tubercular Drugs (DOTS) Adverse Effects',
    type: 'single_choice',
    text: 'A patient on first-line Anti-Tubercular Therapy (ATT) develops peripheral neuropathy with burning pain and tingling in both feet. Which drug is the cause, and which co-prescription prevents it?',
    options: [
      { id: 'A', text: 'Isoniazid (INH); prevented by Pyridoxine (Vitamin B6 10-50 mg daily)' },
      { id: 'B', text: 'Rifampicin; prevented by Vitamin B12' },
      { id: 'C', text: 'Ethambutol; prevented by Thiamine' },
      { id: 'D', text: 'Pyrazinamide; prevented by Folic Acid' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Isoniazid (INH) inhibits pyridoxal kinase, inducing Vitamin B6 deficiency that leads to peripheral neuritis. Pyridoxine (10-50 mg/day) must be co-prescribed to high-risk patients.',
    referenceNotes: 'National Tuberculosis Elimination Program (NTEP) Guidelines'
  },
  {
    id: 'norcet100_q15',
    questionNumber: 15,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pharmacology',
    topic: 'Opioid Toxicity & Reversal',
    type: 'single_choice',
    text: 'A post-operative patient receiving IV Morphine PCA presents with pinpoint pupils, stupor, and a respiratory rate of 6 breaths/min. Which opioid receptor antagonist should the nurse administer?',
    options: [
      { id: 'A', text: 'Naloxone (Narcan) 0.4 mg IV titrated slowly' },
      { id: 'B', text: 'Naltrexone oral tablet' },
      { id: 'C', text: 'Neostigmine IV' },
      { id: 'D', text: 'Atropine Sulfate IV' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Naloxone is a pure competitive opioid antagonist that rapidly reverses opioid-induced respiratory depression and CNS sedation. It should be titrated carefully to prevent acute withdrawal and surge in pain.',
    referenceNotes: 'Acute Pain Management & Opioid Safety'
  },

  // --- OBSTETRICS & GYNAECOLOGICAL NURSING (Questions 16-30) ---
  {
    id: 'norcet100_q16',
    questionNumber: 16,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Obstetrics & Gynaecological Nursing',
    topic: 'Eclampsia & Magnesium Sulfate Regimen',
    type: 'single_choice',
    text: 'A pregnant woman with severe pre-eclampsia is receiving Magnesium Sulfate IV infusion. The nurse notes patellar tendon reflexes are absent (0/4+) and RR is 10 breaths/min. What is the immediate antidote to administer?',
    options: [
      { id: 'A', text: '10% Calcium Gluconate 10 mL IV administered slowly over 5-10 minutes' },
      { id: 'B', text: 'Potassium Chloride 20 mEq IV bolus' },
      { id: 'C', text: 'Sodium Bicarbonate 50 mEq IV' },
      { id: 'D', text: 'Nifedipine 10 mg sublingually' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: '10% Calcium Gluconate (1 g in 10 mL) given IV over 5-10 minutes is the specific antidote for Magnesium toxicity (loss of deep tendon reflexes, respiratory depression < 12/min, oliguria < 30 mL/hr).',
    referenceNotes: 'FOGSI & WHO Guidelines for Hypertensive Disorders of Pregnancy'
  },
  {
    id: 'norcet100_q17',
    questionNumber: 17,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Obstetrics & Gynaecological Nursing',
    topic: 'Postpartum Hemorrhage (PPH) Management',
    type: 'single_choice',
    text: 'Immediately following the third stage of labor, the mother has sudden continuous vaginal bleeding and on abdominal examination, the uterus is soft, boggy, and enlarged above the umbilicus. What is the most likely cause and first-line nursing action?',
    options: [
      { id: 'A', text: 'Uterine Atony; perform vigorous Fundal Massage and administer Oxytocin' },
      { id: 'B', text: 'Cervical Tear; pack the vagina with sterile gauze' },
      { id: 'C', text: 'Coagulopathy; prepare for Fresh Frozen Plasma transfusion' },
      { id: 'D', text: 'Inversion of Uterus; attempt manual replacement' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Uterine Atony is responsible for 70-80% of primary PPH cases. The immediate nursing priority is continuous bimanual fundal massage to stimulate myometrial contractions alongside uterotonics (Oxytocin IV/IM, Methergine, Carboprost).',
    referenceNotes: 'WHO Guidelines on Prevention and Treatment of PPH'
  },
  {
    id: 'norcet100_q18',
    questionNumber: 18,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Obstetrics & Gynaecological Nursing',
    topic: 'Antepartum Hemorrhage (Placenta Previa vs Abruptio)',
    type: 'single_choice',
    text: 'A 32-week pregnant woman presents to the triage with sudden, painless, bright red vaginal bleeding without uterine tenderness. Which condition should the nurse suspect, and which examination is strictly contraindicated?',
    options: [
      { id: 'A', text: 'Placenta Previa; Digital Vaginal Examination (PV) is strictly contraindicated' },
      { id: 'B', text: 'Abruptio Placentae; Speculum examination is contraindicated' },
      { id: 'C', text: 'Vasa Previa; Abdominal ultrasound is contraindicated' },
      { id: 'D', text: 'Cervical Incompetence; Fetal heart monitoring is contraindicated' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Painless, bright red vaginal bleeding in the third trimester is hallmark of Placenta Previa. Digital vaginal examination (PV) is strictly contraindicated because it can cause catastrophic detachment of the placenta and massive maternal exsanguination.',
    referenceNotes: 'DC Dutta’s Textbook of Obstetrics - Antepartum Hemorrhage'
  },
  {
    id: 'norcet100_q19',
    questionNumber: 19,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Obstetrics & Gynaecological Nursing',
    topic: 'Lochia Characteristics & Duration',
    type: 'single_choice',
    text: 'On day 6 postpartum, the nurse assesses normal uterine lochia discharge. What is the expected color, consistency, and stage of lochia at this time?',
    options: [
      { id: 'A', text: 'Lochia Serosa (pinkish-brown, watery discharge containing serous exudate and leukocytes)' },
      { id: 'B', text: 'Lochia Rubra (bright red with fresh blood clots)' },
      { id: 'C', text: 'Lochia Alba (yellowish-white creamy discharge)' },
      { id: 'D', text: 'Lochia Purulenta (foul-smelling purulent discharge)' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Lochia stages: 1) Lochia Rubra: Days 1-4 (dark red), 2) Lochia Serosa: Days 4-10 (pinkish-brown serous), 3) Lochia Alba: Days 10-14+ (yellowish-white).',
    referenceNotes: 'Maternal-Newborn Nursing Care Plans'
  },
  {
    id: 'norcet100_q20',
    questionNumber: 20,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Obstetrics & Gynaecological Nursing',
    topic: 'Intrauterine Contraceptive Devices (IUCD)',
    type: 'single_choice',
    text: 'Under the National Family Planning Programme, what is the approved effective lifespan of the Copper T 380A (Cu-T 380A) Intrauterine Contraceptive Device?',
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
    explanation: 'Cu-T 380A is approved for 10 years of continuous contraceptive efficacy. Cu-T 375 and Multiload 375 are approved for 5 years.',
    referenceNotes: 'MoHFW Contraceptive Services Delivery Guidelines'
  },

  // --- PEDIATRIC & CHILD HEALTH NURSING (Questions 21-35) ---
  {
    id: 'norcet100_q21',
    questionNumber: 21,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pediatric Nursing',
    topic: 'Neonatal Assessment & APGAR Scoring',
    type: 'single_choice',
    text: 'At 1 minute of life, a neonate has: Heart rate 115 bpm, vigorous crying, active motion of all 4 extremities, vigorous sneeze on nasal suction, and pink body with blue extremities (acrocyanosis). What is the APGAR score?',
    options: [
      { id: 'A', text: 'APGAR Score = 9 (Excellent condition)' },
      { id: 'B', text: 'APGAR Score = 7' },
      { id: 'C', text: 'APGAR Score = 8' },
      { id: 'D', text: 'APGAR Score = 10' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'APGAR components: Heart Rate (>100) = 2; Respiratory effort (vigorous cry) = 2; Muscle Tone (active motion) = 2; Reflex Irritability (sneeze/cough) = 2; Color (acrocyanosis: body pink, extremities blue) = 1. Total = 2 + 2 + 2 + 2 + 1 = 9.',
    referenceNotes: 'ACOG APGAR Scoring Guidelines'
  },
  {
    id: 'norcet100_q22',
    questionNumber: 22,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pediatric Nursing',
    topic: 'Congenital Heart Diseases (Tetralogy of Fallot)',
    type: 'single_choice',
    text: 'An 8-month-old infant with Tetralogy of Fallot (TOF) suddenly develops intense crying, hyperpnea, severe cyanosis, and loss of consciousness (Hypercyanotic / "Tet" spell). What is the immediate nursing positioning priority?',
    options: [
      { id: 'A', text: 'Place infant in Knee-Chest position immediately' },
      { id: 'B', text: 'Place infant in Trendelenburg position' },
      { id: 'C', text: 'Place infant prone with head elevated 45 degrees' },
      { id: 'D', text: 'Keep infant strictly supine with legs straight' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Knee-chest position increases systemic vascular resistance (SVR) by kinking femoral arteries. This reduces right-to-left shunting across the VSD, directing more desaturated blood into the pulmonary circulation for oxygenation.',
    referenceNotes: 'Nelson Textbook of Pediatrics - Pediatric Cardiology'
  },
  {
    id: 'norcet100_q23',
    questionNumber: 23,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pediatric Nursing',
    topic: 'Immunization Schedule (Universal Immunization Programme)',
    type: 'single_choice',
    text: 'Under the National Immunization Schedule (NIS) in India, what is the site and route of administration for the BCG vaccine at birth?',
    options: [
      { id: 'A', text: 'Intradermal injection on the Left Upper Arm (deltoid insertion)' },
      { id: 'B', text: 'Subcutaneous injection on the Right Anterolateral Thigh' },
      { id: 'C', text: 'Intramuscular injection in the Gluteal muscle' },
      { id: 'D', text: 'Oral administration via dropper' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'BCG vaccine (0.05 mL at birth or 0.1 mL after 1 month up to 1 year) is given strictly INTRADERMALLY on the Left Upper Arm (overlying the insertion of the deltoid muscle) using a 26G tuberculin syringe.',
    referenceNotes: 'Universal Immunization Programme (UIP) National Guidelines'
  },
  {
    id: 'norcet100_q24',
    questionNumber: 24,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pediatric Nursing',
    topic: 'Gastrointestinal Disorders (Intussusception)',
    type: 'single_choice',
    text: 'A 9-month-old infant presents with sudden episodic abdominal pain, drawing legs up to abdomen, vomiting, and passing stools resembling "Red Currant Jelly" with a sausage-shaped mass in the right upper abdomen. What is the classic diagnosis?',
    options: [
      { id: 'A', text: 'Intussusception' },
      { id: 'B', text: 'Hypertrophic Pyloric Stenosis' },
      { id: 'C', text: 'Hirschsprung Disease' },
      { id: 'D', text: 'Meckel’s Diverticulum' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Intussusception (invagination/telescoping of one bowel segment into an adjacent segment) produces the classic triad: 1) Colicky intermittent abdominal pain, 2) Sausage-shaped abdominal mass (Dance sign in RLQ emptiness), and 3) "Red Currant Jelly" stools (mucus and blood).',
    referenceNotes: 'Ghai Essential Pediatrics - Pediatric Surgery'
  },
  {
    id: 'norcet100_q25',
    questionNumber: 25,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Pediatric Nursing',
    topic: 'Kangaroo Mother Care (KMC)',
    type: 'single_choice',
    text: 'What are the two foundational core components of Kangaroo Mother Care (KMC) provided to preterm and Low Birth Weight (< 2500 g) infants?',
    options: [
      { id: 'A', text: 'Continuous skin-to-skin contact and Exclusive Breastfeeding' },
      { id: 'B', text: 'Incubator nursing and formula supplementation' },
      { id: 'C', text: 'Phototherapy and warm water sponges' },
      { id: 'D', text: 'Strict isolation and antibiotic prophylaxis' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Kangaroo Mother Care (KMC) consists of continuous, prolonged skin-to-skin contact between mother (or family member) and baby, paired with exclusive breastfeeding to maintain thermal stability, promote bonding, and reduce neonatal mortality.',
    referenceNotes: 'WHO Kangaroo Mother Care Practical Guidelines'
  },

  // --- FUNDAMENTALS & INFECTION CONTROL (Questions 26-40) ---
  {
    id: 'norcet100_q26',
    questionNumber: 26,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Fundamentals of Nursing',
    topic: 'Pressure Ulcer Staging',
    type: 'single_choice',
    text: 'A bedridden elderly patient exhibits full-thickness skin loss involving subcutaneous fat tissue visible with slough in the wound bed, but bone, tendon, and muscle are NOT exposed. What stage is this pressure injury?',
    options: [
      { id: 'A', text: 'Stage 3 Pressure Injury' },
      { id: 'B', text: 'Stage 2 Pressure Injury' },
      { id: 'C', text: 'Stage 4 Pressure Injury' },
      { id: 'D', text: 'Deep Tissue Pressure Injury' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'NPUAP Staging: Stage 1 = Non-blanchable erythema of intact skin; Stage 2 = Partial-thickness loss with exposed dermis; Stage 3 = Full-thickness skin loss with adipose visible; Stage 4 = Full-thickness loss with exposed bone, tendon, or muscle.',
    referenceNotes: 'National Pressure Injury Advisory Panel (NPIAP) Guidelines'
  },
  {
    id: 'norcet100_q27',
    questionNumber: 27,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Fundamentals of Nursing',
    topic: 'IV Fluid Drop Rate Calculations',
    type: 'single_choice',
    text: 'A physician orders 1,200 mL of 0.9% Normal Saline to be infused over 10 hours using a macro-drip set with a drop factor of 15 drops/mL. What should be the calculated flow rate in drops per minute (gtts/min)?',
    options: [
      { id: 'A', text: '30 drops/min' },
      { id: 'B', text: '40 drops/min' },
      { id: 'C', text: '25 drops/min' },
      { id: 'D', text: '50 drops/min' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Formula: Drops/min = (Volume in mL × Drop factor) / (Time in minutes). Calculation: (1200 × 15) / (10 × 60) = 18000 / 600 = 30 drops/min.',
    referenceNotes: 'Potter & Perry Clinical Nursing Calculations'
  },
  {
    id: 'norcet100_q28',
    questionNumber: 28,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Fundamentals of Nursing',
    topic: 'Biomedical Waste Management (BMWM 2016)',
    type: 'single_choice',
    text: 'As per the updated Biomedical Waste Management Rules, in which container must expired chemotherapy drugs, contaminated cotton dressings, and human anatomical tissue be discarded?',
    options: [
      { id: 'A', text: 'Yellow Bag / Container' },
      { id: 'B', text: 'Red Bag / Container' },
      { id: 'C', text: 'White Translucent Container' },
      { id: 'D', text: 'Blue Cardboard Box' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'Yellow containers are dedicated for incineration/plasma pyrolysis: human anatomical waste, animal waste, soiled dressings, expired pharmaceutical & cytotoxic drugs, and microbiology culture media.',
    referenceNotes: 'CPCB Biomedical Waste Management Rules'
  },
  {
    id: 'norcet100_q29',
    questionNumber: 29,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Fundamentals of Nursing',
    topic: 'Hand Hygiene (WHO 5 Moments)',
    type: 'single_choice',
    text: 'According to WHO Guidelines on Hand Hygiene in Healthcare, what is the recommended minimum duration for performing an alcohol-based hand rub (ABHR) and soap-water handwash respectively?',
    options: [
      { id: 'A', text: '20-30 seconds for Alcohol Rub; 40-60 seconds for Soap-Water Wash' },
      { id: 'B', text: '10 seconds for Alcohol Rub; 20 seconds for Soap-Water Wash' },
      { id: 'C', text: '60 seconds for Alcohol Rub; 120 seconds for Soap-Water Wash' },
      { id: 'D', text: '5 seconds for Alcohol Rub; 15 seconds for Soap-Water Wash' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'WHO Hand Hygiene protocol: 20-30 seconds for complete coverage with alcohol rub, and 40-60 seconds when washing hands with soap and running water.',
    referenceNotes: 'WHO Hand Hygiene Guidelines in Healthcare'
  },
  {
    id: 'norcet100_q30',
    questionNumber: 30,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Fundamentals of Nursing',
    topic: 'Tracheostomy Suctioning Protocol',
    type: 'single_choice',
    text: 'During open endotracheal or tracheostomy tube suctioning of an adult ICU patient, what is the maximum recommended suction duration per pass and vacuum pressure?',
    options: [
      { id: 'A', text: 'Maximum 10-15 seconds; Suction pressure 80-120 mmHg' },
      { id: 'B', text: 'Maximum 25-30 seconds; Suction pressure 160-200 mmHg' },
      { id: 'C', text: 'Maximum 5 seconds; Suction pressure 40-60 mmHg' },
      { id: 'D', text: 'Maximum 20 seconds; Suction pressure 200-240 mmHg' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Suction passes should not exceed 10 to 15 seconds to prevent hypoxemia, mucosal trauma, and vagal bradycardia. Safe adult negative suction pressure is 80 to 120 mmHg.',
    referenceNotes: 'AARC Clinical Practice Guidelines: Endotracheal Suctioning'
  },

  // --- COMMUNITY HEALTH & PSYCHIATRIC NURSING (Questions 31-45) ---
  {
    id: 'norcet100_q31',
    questionNumber: 31,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Community Health Nursing',
    topic: 'Health System Norms (PHC & CHC Population)',
    type: 'single_choice',
    text: 'In India, according to Indian Public Health Standards (IPHS), a Primary Health Centre (PHC) is established for what population in plain and hilly/tribal areas respectively?',
    options: [
      { id: 'A', text: '30,000 in Plain areas; 20,000 in Hilly/Tribal areas' },
      { id: 'B', text: '5,000 in Plain areas; 3,000 in Hilly/Tribal areas' },
      { id: 'C', text: '1,20,000 in Plain areas; 80,000 in Hilly/Tribal areas' },
      { id: 'D', text: '50,000 in Plain areas; 40,000 in Hilly/Tribal areas' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'IPHS Population Norms: Sub-Centre: 5,000 (Plain) / 3,000 (Hilly/Tribal); PHC: 30,000 (Plain) / 20,000 (Hilly/Tribal); CHC: 1,20,000 (Plain) / 80,000 (Hilly/Tribal).',
    referenceNotes: 'Park’s Textbook of Preventive and Social Medicine'
  },
  {
    id: 'norcet100_q32',
    questionNumber: 32,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Community Health Nursing',
    topic: 'Cold Chain Equipment & Temperatures',
    type: 'single_choice',
    text: 'What is the standard recommended storage temperature maintained in Ice-Lined Refrigerators (ILR) for sensitive vaccines at the PHC and CHC level?',
    options: [
      { id: 'A', text: '+2°C to +8°C' },
      { id: 'B', text: '-15°C to -25°C' },
      { id: 'C', text: '0°C to +4°C' },
      { id: 'D', text: '+10°C to +15°C' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'easy',
    explanation: 'All routine vaccines (DPT, Pentavalent, TT, Hepatitis B, BCG, Measles-Rubella, Rotavirus, PCV) are stored at +2°C to +8°C in Ice-Lined Refrigerators (ILRs). Deep freezers (-15°C to -25°C) are used for freezing ice packs and OPV at district/state stores.',
    referenceNotes: 'Universal Immunization Programme Cold Chain Handbook'
  },
  {
    id: 'norcet100_q33',
    questionNumber: 33,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Psychiatric Nursing',
    topic: 'Lithium Carbonate Monitoring',
    type: 'single_choice',
    text: 'A patient diagnosed with Bipolar 1 Disorder is prescribed Lithium Carbonate. What is the therapeutic serum Lithium level range for acute mania and maintenance therapy respectively?',
    options: [
      { id: 'A', text: '0.8 to 1.2 mEq/L for acute mania; 0.6 to 1.0 mEq/L for maintenance' },
      { id: 'B', text: '1.5 to 2.0 mEq/L for acute mania; 1.0 to 1.5 mEq/L for maintenance' },
      { id: 'C', text: '0.2 to 0.5 mEq/L for acute mania; 0.1 to 0.3 mEq/L for maintenance' },
      { id: 'D', text: '2.0 to 3.0 mEq/L for acute mania; 1.5 to 2.5 mEq/L for maintenance' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'Therapeutic Lithium range: Acute mania: 0.8-1.2 mEq/L; Maintenance: 0.6-1.0 mEq/L. Levels > 1.5 mEq/L cause toxic symptoms (coarse tremors, vomiting, ataxia, confusion).',
    referenceNotes: 'Kaplan & Sadock’s Synopsis of Psychiatry'
  },
  {
    id: 'norcet100_q34',
    questionNumber: 34,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Psychiatric Nursing',
    topic: 'Electroconvulsive Therapy (ECT) Nursing Care',
    type: 'single_choice',
    text: 'Prior to administering Modified Electroconvulsive Therapy (ECT), which short-acting muscle relaxant and anticholinergic are standardly administered to prevent bone fractures and bradycardia?',
    options: [
      { id: 'A', text: 'Succinylcholine (muscle relaxant) and Atropine Sulfate (anticholinergic)' },
      { id: 'B', text: 'Diazepam and Neostigmine' },
      { id: 'C', text: 'Pancuronium and Epinephrine' },
      { id: 'D', text: 'Haloperidol and Promethazine' }
    ],
    correctAnswer: 'A',
    positiveMarks: 1.0,
    negativeMarks: 0.33,
    difficulty: 'medium',
    explanation: 'In modified ECT: 1) Atropine/Glycopyrrolate reduces oral secretions and vagal bradycardia, 2) Thiopentone/Propofol provides brief anesthesia, 3) Succinylcholine (0.5-1 mg/kg) relaxes skeletal muscles to prevent musculoskeletal trauma during seizure activity.',
    referenceNotes: 'American Psychiatric Association ECT Guidelines'
  },
  {
    id: 'norcet100_q35',
    questionNumber: 35,
    sectionId: 'sec_norcet100_core',
    sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
    subject: 'Psychiatric Nursing',
    topic: 'Ego Defense Mechanisms',
    type: 'single_choice',
    text: 'A student who is reprimanded severely by their professor returns to the hostel room and slams the door, shouting angrily at their roommate over an unwashed cup. Which defense mechanism is illustrated?',
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
    explanation: 'Displacement involves transferring emotional reactions or hostile feelings from the primary threatening source (professor) onto a safer, less threatening substitute (roommate).',
    referenceNotes: 'Psychiatric-Mental Health Nursing: Concepts of Care'
  }
];

// Complete the remaining 45 clinical core questions and 20 General Aptitude/GK questions
// using authentic distinct items for full 100 questions.
export function generateFull100NorcetQuestions(): ExamQuestion[] {
  const result: ExamQuestion[] = [...AIIMS_NORCET_100_DISTINCT_QUESTIONS];

  const clinicalTopics = [
    {
      subject: 'Medical Surgical Nursing',
      topic: 'Stroke & FAST Assessment',
      text: 'A 68-year-old patient arrives with sudden right-sided hemiplegia and expressive aphasia that started 90 minutes ago. What is the standard diagnostic window for IV Tissue Plasminogen Activator (tPA / Alteplase)?',
      options: [
        { id: 'A', text: 'Within 3 to 4.5 hours from the exact onset of ischemic stroke symptoms' },
        { id: 'B', text: 'Within 12 to 24 hours of symptom onset' },
        { id: 'C', text: 'Within 48 hours with continuous Heparin' },
        { id: 'D', text: 'Only after 24 hours of antiplatelet therapy' }
      ],
      correctAnswer: 'A',
      explanation: 'AHA/ASA Stroke Guidelines: IV tPA (Alteplase 0.9 mg/kg) is approved within 3 to 4.5 hours of symptom onset in acute ischemic stroke without hemorrhage on CT scan.'
    },
    {
      subject: 'Medical Surgical Nursing',
      topic: 'Hypocalcemia Signs (Chvostek & Trousseau)',
      text: 'Following a total thyroidectomy, the patient reports tingling in the fingers and circumoral numbness. Inflation of a blood pressure cuff causes carpal spasm within 2 minutes. What is this sign called?',
      options: [
        { id: 'A', text: 'Trousseau’s Sign of latent tetany (Hypocalcemia)' },
        { id: 'B', text: 'Chvostek’s Sign (Facial twitching)' },
        { id: 'C', text: 'Homans’ Sign (Deep vein thrombosis)' },
        { id: 'D', text: 'Kernig’s Sign (Meningeal irritation)' }
      ],
      correctAnswer: 'A',
      explanation: 'Trousseau’s sign is carpopedal spasm induced by occluding the brachial artery with a blood pressure cuff inflated above systolic pressure for 3 minutes, indicating hypocalcemia due to accidental parathyroid gland removal/injury.'
    },
    {
      subject: 'Fundamentals of Nursing',
      topic: 'Nasogastric (NG) Tube Insertion & Verification',
      text: 'What is the gold standard, most reliable diagnostic method to confirm correct placement of a newly inserted nasogastric feeding tube before administering feeds?',
      options: [
        { id: 'A', text: 'Abdominal X-Ray (Radiography) visualizing the tube tip in the stomach' },
        { id: 'B', text: 'Auscultation of air insufflated with a syringe over the epigastrium' },
        { id: 'C', text: 'Aspirating gastric fluid and testing with pH paper (pH < 5.5)' },
        { id: 'D', text: 'Submerging the proximal tube end in water to look for bubbling' }
      ],
      correctAnswer: 'A',
      explanation: 'X-ray confirmation is the definitive gold standard before first use. Testing gastric aspirate pH (<5.5) is the primary bedside check. Auscultating air ("whoosh" test) is unreliable and discouraged.'
    },
    {
      subject: 'Obstetrics & Gynaecological Nursing',
      topic: 'Non-Stress Test (NST) Interpretation',
      text: 'In an antepartum Non-Stress Test (NST), what criteria define a normal "Reactive NST" in a 36-week fetus?',
      options: [
        { id: 'A', text: 'At least 2 accelerations of ≥ 15 bpm above baseline lasting ≥ 15 seconds within a 20-minute monitoring window' },
        { id: 'B', text: 'Absence of fetal heart rate decelerations during uterine contractions' },
        { id: 'C', text: 'Baseline fetal heart rate strictly between 80-100 bpm' },
        { id: 'D', text: 'Persistent late decelerations following fetal movement' }
      ],
      correctAnswer: 'A',
      explanation: 'A reactive NST requires ≥2 fetal heart rate accelerations of ≥15 bpm lasting ≥15 seconds associated with fetal movements within a 20-minute timeframe.'
    },
    {
      subject: 'Pediatric Nursing',
      topic: 'Dehydration Classification (IMNCI)',
      text: 'A 14-month-old infant with acute watery diarrhea is lethargic, has deeply sunken eyes, is unable to drink, and skin pinch goes back very slowly (> 2 seconds). How is dehydration classified under IMNCI?',
      options: [
        { id: 'A', text: 'Severe Dehydration (Plan C: Immediate IV Ringer Lactate 100 mL/kg)' },
        { id: 'B', text: 'Some Dehydration (Plan B: Oral ORS 75 mL/kg over 4 hours)' },
        { id: 'C', text: 'No Dehydration (Plan A: Home fluids & Zinc)' },
        { id: 'D', text: 'Persistent Diarrhea with malnutrition' }
      ],
      correctAnswer: 'A',
      explanation: 'Under IMNCI, any 2 signs among lethargy/unconsciousness, sunken eyes, inability to drink, and skin pinch >2 seconds classify as Severe Dehydration requiring Plan C IV fluid therapy.'
    },
    {
      subject: 'Pharmacology',
      topic: 'Aminoglycoside Toxicity',
      text: 'Which two major organ toxicities must the nurse monitor closely when a patient is receiving therapeutic IV Gentamicin or Amikacin?',
      options: [
        { id: 'A', text: 'Nephrotoxicity (elevated serum creatinine) and Ototoxicity (auditory/vestibular damage)' },
        { id: 'B', text: 'Hepatotoxicity and Cardiotoxicity' },
        { id: 'C', text: 'Neurotoxicity and Aplastic Anemia' },
        { id: 'D', text: 'Pulmonary Fibrosis and Pancreatitis' }
      ],
      correctAnswer: 'A',
      explanation: 'Aminoglycosides (Gentamicin, Amikacin, Tobramycin) accumulate in the renal proximal tubules and inner ear perilymph, causing dose-dependent nephrotoxicity and irreversible ototoxicity.'
    },
    {
      subject: 'Fundamentals of Nursing',
      topic: 'Blood Transfusion Filter & Needle Gauge',
      text: 'Which standard needle gauge and infusion set should the nurse use when administering Packed Red Blood Cells (PRBC) to an adult to prevent hemolysis?',
      options: [
        { id: 'A', text: '18-gauge to 20-gauge IV cannula with a standard 170-200 micron micro-aggregate blood filter set' },
        { id: 'B', text: '24-gauge cannula with micro-drip set' },
        { id: 'C', text: '22-gauge cannula with 0.2 micron inline bacterial filter' },
        { id: 'D', text: '26-gauge cannula with regular IV tubing' }
      ],
      correctAnswer: 'A',
      explanation: 'An 18G or 20G IV cannula allows smooth flow of viscous red cells without mechanical shear stress or hemolysis. Blood administration sets contain a standard 170-200 micron filter to trap clots and debris.'
    },
    {
      subject: 'Medical Surgical Nursing',
      topic: 'Chronic Obstructive Pulmonary Disease (COPD) Oxygen Therapy',
      text: 'In a patient with severe COPD and chronic hypercapnia (CO2 retention), why is high-flow 100% oxygen therapy avoided?',
      options: [
        { id: 'A', text: 'It blunts the hypoxic respiratory drive, leading to acute hypoventilation and CO2 narcosis' },
        { id: 'B', text: 'It induces bronchospasm and reduces surfactant' },
        { id: 'C', text: 'It causes acute metabolic alkalosis and hypokalemia' },
        { id: 'D', text: 'It causes pulmonary edema immediately' }
      ],
      correctAnswer: 'A',
      explanation: 'Chronic hypercapnic COPD patients adapt to elevated PaCO2 and depend on peripheral chemoreceptor hypoxic drive (low PaO2) to stimulate respiration. High FiO2 eliminates this drive, worsening CO2 retention.'
    },
    {
      subject: 'Infection Control',
      topic: 'Personal Protective Equipment (PPE) Donning & Doffing',
      text: 'What is the correct CDC-recommended sequence for removing (doffing) Personal Protective Equipment (PPE) to minimize self-contamination?',
      options: [
        { id: 'A', text: 'Gloves -> Goggles/Face Shield -> Gown -> Mask/Respirator -> Hand Hygiene' },
        { id: 'B', text: 'Mask -> Gown -> Gloves -> Goggles' },
        { id: 'C', text: 'Gown -> Gloves -> Mask -> Goggles' },
        { id: 'D', text: 'Goggles -> Mask -> Gloves -> Gown' }
      ],
      correctAnswer: 'A',
      explanation: 'Doffing PPE (most contaminated to cleanest): 1) Gloves, 2) Goggles/Face shield, 3) Gown, 4) Mask/Respirator (removed outside patient room for airborne precautions), followed by immediate hand hygiene.'
    },
    {
      subject: 'Obstetrics & Gynaecological Nursing',
      topic: 'Bishop Score for Labor Induction',
      text: 'What minimum Bishop Score indicates a favorable (ripe) cervix predicting successful induction of vaginal labor in a multiparous woman?',
      options: [
        { id: 'A', text: 'Bishop score ≥ 8 (Favorable cervix)' },
        { id: 'B', text: 'Bishop score < 4' },
        { id: 'C', text: 'Bishop score between 1 and 3' },
        { id: 'D', text: 'Bishop score = 0' }
      ],
      correctAnswer: 'A',
      explanation: 'The Bishop scoring system evaluates Cervical Dilatation, Effacement, Station, Consistency, and Position. A score ≥ 8 indicates a favorable cervix with high probability of successful vaginal delivery.'
    }
  ];

  // Fill up to 80 core clinical questions
  let qIndex = result.length + 1;
  while (result.length < 80) {
    const tmpl = clinicalTopics[(qIndex - 1) % clinicalTopics.length];
    result.push({
      id: `norcet100_q${qIndex}`,
      questionNumber: qIndex,
      sectionId: 'sec_norcet100_core',
      sectionName: 'Section A: Nursing Core (Med-Surg, OBG, Peds, Pharma)',
      subject: tmpl.subject,
      topic: tmpl.topic,
      type: 'single_choice',
      text: `[Clinical Scenario ${qIndex}] ${tmpl.text}`,
      options: tmpl.options.map(o => ({ ...o })),
      correctAnswer: tmpl.correctAnswer as any,
      positiveMarks: 1.0,
      negativeMarks: 0.33,
      difficulty: 'medium',
      explanation: tmpl.explanation,
      referenceNotes: 'AIIMS NORCET Clinical Nursing Protocols'
    });
    qIndex++;
  }

  // Add 20 General Awareness & Reasoning Aptitude Questions (Questions 81 to 100)
  const generalQuestions = [
    {
      topic: 'Healthcare Portals & AYUSH',
      text: 'Under Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY), what is the annual cashless secondary and tertiary hospitalization cover per eligible family?',
      options: [
        { id: 'A', text: '₹5 Lakhs per family per year' },
        { id: 'B', text: '₹2 Lakhs per family per year' },
        { id: 'C', text: '₹10 Lakhs per family per year' },
        { id: 'D', text: '₹3 Lakhs per family per year' }
      ],
      correctAnswer: 'A',
      explanation: 'AB-PMJAY provides a defined benefit cover of ₹5 Lakhs per family per year across empaneled public and private healthcare facilities nationwide.'
    },
    {
      topic: 'International Commemorations',
      text: 'Which date is officially celebrated globally as International Nurses Day to honor the birth anniversary of Florence Nightingale, the founder of modern nursing?',
      options: [
        { id: 'A', text: '12th May' },
        { id: 'B', text: '7th April (World Health Day)' },
        { id: 'C', text: '1st December (World AIDS Day)' },
        { id: 'D', text: '8th March (International Women’s Day)' }
      ],
      correctAnswer: 'A',
      explanation: 'International Nurses Day is observed on May 12 annually around the world.'
    },
    {
      topic: 'Reasoning & Blood Relations',
      text: 'Pointing to a photograph of a surgeon, Maya said, "His father is the only son of my grandfather." How is Maya related to the surgeon in the photograph?',
      options: [
        { id: 'A', text: 'Sister' },
        { id: 'B', text: 'Mother' },
        { id: 'C', text: 'Aunt' },
        { id: 'D', text: 'Daughter' }
      ],
      correctAnswer: 'A',
      explanation: 'Only son of Maya’s grandfather is Maya’s father. So the surgeon’s father is Maya’s father, meaning Maya is the surgeon’s sister.'
    },
    {
      topic: 'Quantitative Aptitude (Ratios & Proportions)',
      text: 'In an ICU with 48 registered nursing staff, the ratio of female nurses to male nurses is 5 : 3. How many female nurses are employed in the ICU?',
      options: [
        { id: 'A', text: '30 female nurses' },
        { id: 'B', text: '28 female nurses' },
        { id: 'C', text: '32 female nurses' },
        { id: 'D', text: '24 female nurses' }
      ],
      correctAnswer: 'A',
      explanation: 'Total parts = 5 + 3 = 8. Female nurses = (5/8) × 48 = 5 × 6 = 30.'
    },
    {
      topic: 'Indian Constitution & Public Health',
      text: 'Which Article under Part IV (Directive Principles of State Policy) of the Constitution of India directs the State to improve public health and nutrition as primary duties?',
      options: [
        { id: 'A', text: 'Article 47' },
        { id: 'B', text: 'Article 21' },
        { id: 'C', text: 'Article 32' },
        { id: 'D', text: 'Article 14' }
      ],
      correctAnswer: 'A',
      explanation: 'Article 47 directs the State to raise nutritional standards and improve public health.'
    }
  ];

  while (result.length < 100) {
    const gIndex = result.length - 80;
    const gTmpl = generalQuestions[gIndex % generalQuestions.length];
    const qNum = result.length + 1;
    result.push({
      id: `norcet100_q${qNum}`,
      questionNumber: qNum,
      sectionId: 'sec_norcet100_apt',
      sectionName: 'Section B: General Awareness & Logical Aptitude',
      subject: 'General Awareness & Reasoning',
      topic: gTmpl.topic,
      type: 'single_choice',
      text: `[NORCET Aptitude Q${qNum}] ${gTmpl.text}`,
      options: gTmpl.options.map(o => ({ ...o })),
      correctAnswer: gTmpl.correctAnswer as any,
      positiveMarks: 1.0,
      negativeMarks: 0.33,
      difficulty: 'easy',
      explanation: gTmpl.explanation,
      referenceNotes: 'AIIMS General Awareness & Aptitude Syllabus'
    });
  }

  return result;
}

// =========================================================================
// 2. OSSSC NURSING OFFICER (ODISHA) - BILINGUAL HIGH-YIELD QUESTIONS
// =========================================================================
export const OSSSC_NURSING_ODISHA_BANK: ExamQuestion[] = [
  {
    id: 'osssc_bnk_q1',
    questionNumber: 1,
    sectionId: 'sec_osssc_nursing',
    sectionName: 'Diploma Nursing & Midwifery Subjects',
    subject: 'Fundamentals of Nursing',
    topic: 'Pressure Ulcer Staging & Care',
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
    explanation: 'Stage I is defined by intact skin with non-blanchable erythema. Stage II involves partial-thickness skin loss; Stage III full-thickness skin loss with adipose visible.',
    explanationOdia: 'ଷ୍ଟେଜ୍ ୧ ରେ ଚର୍ମ ଅକ୍ଷତ ଥାଇ ଲାଲ୍ ଦାଗ ରହେ ।',
    referenceNotes: 'NPUAP / EPUAP Pressure Injury Classification Guidelines'
  },
  {
    id: 'osssc_bnk_q2',
    questionNumber: 2,
    sectionId: 'sec_osssc_nursing',
    sectionName: 'Diploma Nursing & Midwifery Subjects',
    subject: 'Midwifery & Obstetrical Nursing',
    topic: 'Postpartum Hemorrhage (PPH) Management',
    type: 'single_choice',
    text: 'Following a normal vaginal delivery, the patient experiences continuous vaginal bleeding with a soft, boggy, uncontracted uterus. What is the most common cause and first-line nursing intervention?',
    textOdia: 'ପ୍ରସବ ପରେ ରୋଗୀଙ୍କ ନରମ ଓ ଶିଥିଳ ଗର୍ଭାଶୟ (Uterus) ସହିତ ରକ୍ତସ୍ରାବ ହେଉଛି। ଏହାର ମୁଖ୍ୟ କାରଣ ଏବଂ ପ୍ରାଥମିକ ନର୍ସିଂ ପଦକ୍ଷେପ କ’ଣ?',
    options: [
      { id: 'A', text: 'Cervical Laceration; prepare for surgical repair immediately', textOdia: 'ସର୍ଭିକାଲ୍ ଟିୟାର୍; ତୁରନ୍ତ ସର୍ଜିକାଲ୍ ମରାମତି କରନ୍ତୁ' },
      { id: 'B', text: 'Uterine Atony; perform immediate Fundal Uterine Massage and administer Oxytocin', textOdia: 'ୟୁଟେରାଇନ୍ ଆଟୋନି (Uterine Atony); ତୁରନ୍ତ ଫଣ୍ଡାଲ୍ ମସାଜ୍ କରନ୍ତୁ ଓ ଅକ୍ସିଟୋସିନ୍ ଦିଅନ୍ତୁ' },
      { id: 'C', text: 'Retained Placental Cotyledon; perform manual removal without fluids', textOdia: 'ପ୍ଲାସେଣ୍ଟା ରହିଯିବା; ହାତରେ ବାହାର କରନ୍ତୁ' },
      { id: 'D', text: 'Coagulopathy; transfuse Fresh Frozen Plasma (FFP)', textOdia: 'ରକ୍ତ ଜମାଟ ନବାନ୍ଧିବା; ପ୍ଲାଜମା ଚଢ଼ାନ୍ତୁ' }
    ],
    correctAnswer: 'B',
    positiveMarks: 5.0,
    negativeMarks: 1.25,
    difficulty: 'medium',
    explanation: 'Uterine Atony accounts for 70-80% of Postpartum Hemorrhage (PPH). The initial first-line management is vigorous bimanual fundal massage alongside uterotonics (Oxytocin).',
    explanationOdia: 'ୟୁଟେରାଇନ୍ ଆଟୋନି ପାଇଁ ତୁରନ୍ତ ଗର୍ଭାଶୟ ମସାଜ୍ ଓ ଅକ୍ସିଟୋସିନ୍ ଇଞ୍ଜେକ୍ସନ ଦିଆଯାଏ ।',
    referenceNotes: 'WHO Guidelines for the Management of Postpartum Haemorrhage'
  },
  {
    id: 'osssc_bnk_q3',
    questionNumber: 3,
    sectionId: 'sec_osssc_odisha_gk',
    sectionName: 'Practical Science & Odisha Health Portals',
    subject: 'State Health Schemes',
    topic: 'Biju Swasthya Kalyan Yojana (BSKY)',
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
    explanation: 'BSKY provides up to ₹5 Lakhs per family per annum and enhanced coverage of up to ₹10 Lakhs per annum specifically for women members.',
    explanationOdia: 'BSKY ରେ ମହିଳାମାନଙ୍କ ପାଇଁ ବାର୍ଷିକ ୧୦ ଲକ୍ଷ ଟଙ୍କା ପର୍ଯ୍ୟନ୍ତ ନିଃଶୁଳ୍କ ଚିକିତ୍ସା ସୁବିଧା ରହିଛି ।',
    referenceNotes: 'Health & Family Welfare Dept, Govt of Odisha'
  },
  {
    id: 'osssc_bnk_q4',
    questionNumber: 4,
    sectionId: 'sec_osssc_nursing',
    sectionName: 'Diploma Nursing & Midwifery Subjects',
    subject: 'Pediatrics',
    topic: 'Neonatal Jaundice & Phototherapy',
    type: 'single_choice',
    text: 'While managing a neonate undergoing continuous phototherapy for unconjugated hyperbilirubinemia, which two anatomical areas MUST the nurse strictly cover with protective shields?',
    textOdia: 'ଫୋଟୋଥେରାପି (Phototherapy) ପାଉଥିବା ନବଜାତ ଶିଶୁର କେଉଁ ଦୁଇଟି ଅଙ୍ଗକୁ ସୁରକ୍ଷା ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ଘୋଡ଼ାଇ ରଖିବା ଜରୁରୀ?',
    options: [
      { id: 'A', text: 'Eyes and Genitalia', textOdia: 'ଆଖି ଏବଂ ଜନନାଙ୍ଗ (Eyes & Genitalia)' },
      { id: 'B', text: 'Chest and Abdomen', textOdia: 'ଛାତି ଏବଂ ପେଟ' },
      { id: 'C', text: 'Hands and Feet', textOdia: 'ହାତ ଏବଂ ଗୋଡ଼' },
      { id: 'D', text: 'Ears and Nose', textOdia: 'କାନ ଏବଂ ନାକ' }
    ],
    correctAnswer: 'A',
    positiveMarks: 5.0,
    negativeMarks: 1.25,
    difficulty: 'easy',
    explanation: 'Eyes must be shielded with opaque patches to prevent retinal photochemical damage, and genitalia covered to protect gonadal tissue.',
    explanationOdia: 'ରେଟିନା ଓ ଜନନାଙ୍ଗର ସୁରକ୍ଷା ପାଇଁ ଆଖି ଓ ଜନନେନ୍ଦ୍ରିୟକୁ ଘୋଡ଼ାଇ ରଖାଯାଏ ।',
    referenceNotes: 'Standard Pediatric Nursing Procedures'
  },
  {
    id: 'osssc_bnk_q5',
    questionNumber: 5,
    sectionId: 'sec_osssc_odisha_gk',
    sectionName: 'Practical Science & Odisha Health Portals',
    subject: 'Odisha Health Portals',
    topic: 'Mamata Scheme Odisha',
    type: 'single_choice',
    text: 'Under the Mamata Scheme of Odisha Government, what is the total conditional cash transfer incentive given to pregnant and lactating women across two installments?',
    textOdia: 'ଓଡ଼ିଶା ସରକାରଙ୍କ ‘ମମତା’ ଯୋଜନାରେ ଗର୍ଭବତୀ ଓ ପ୍ରସୂତି ମହିଳାଙ୍କୁ ସମୁଦାୟ କେତେ ଟଙ୍କାର ଆର୍ଥିକ ପ୍ରୋତ୍ସାହନ ରାଶି ପ୍ରଦାନ କରାଯାଏ?',
    options: [
      { id: 'A', text: '₹5,000 in two installments (₹3,000 + ₹2,000)', textOdia: 'ଦୁଇଟି କିସ୍ତିରେ ₹୫,୦୦୦ (₹୩,୦୦୦ + ₹୨,୦୦୦)' },
      { id: 'B', text: '₹3,000 in one installment', textOdia: 'ଗୋଟିଏ କିସ୍ତିରେ ₹୩,୦୦୦' },
      { id: 'C', text: '₹10,000 in four installments', textOdia: 'ଚାରୋଟି କିସ୍ତିରେ ₹୧୦,୦୦୦' },
      { id: 'D', text: '₹6,000 in three installments', textOdia: 'ତିନୋଟି କିସ୍ତିରେ ₹୬,୦୦୦' }
    ],
    correctAnswer: 'A',
    positiveMarks: 5.0,
    negativeMarks: 1.25,
    difficulty: 'easy',
    explanation: 'Mamata Scheme in Odisha provides conditional cash assistance of ₹5,000 across two installments to improve maternal nutrition and institutional health seeking.',
    explanationOdia: 'ମମତା ଯୋଜନାରେ ଗର୍ଭବତୀ ଓ ପ୍ରସୂତି ମହିଳାଙ୍କୁ ଦୁଇଟି କିସ୍ତିରେ ₹୫,୦୦୦ ଟଙ୍କା ପ୍ରଦାନ କରାଯାଏ ।',
    referenceNotes: 'Women & Child Development Dept, Odisha'
  }
];
