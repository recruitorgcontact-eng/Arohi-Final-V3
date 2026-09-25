// Dr. Bhaktahari Mallick Dairy Cow Ration Formulation Engine
// Reverse-engineered master logic specification from RATION CAL. FINAL 2.xlsx
// Approved by Veterinary Surgeon Dr. Bhaktahari Mallick for Arohi VetMitra

export interface AnimalProfile {
  bodyWeightKg: number;           // BW in kg (e.g. 250)
  milkYieldKgDay: number;         // Milk in kg/day (e.g. 8)
  milkFatPercent: number;         // Fat % (e.g. 4.5)
  milkProteinPercent: number;     // Protein % (e.g. 3.4)
  lactationStage: 'Early' | 'Mid' | 'Late' | 'Dry/Other';
  daysPregnant: number;          // PregDays in days (e.g. 0)
  parity: number;                 // Parity number (e.g. 2)
  targetBwChangeKgDay: number;    // Desired BW change in kg/day (e.g. 0)
}

export interface FeedMasterEntry {
  id: string;
  name: string;
  nameOdia: string;
  nameHindi: string;
  category: 'forage' | 'concentrate';
  dmPercent: number;              // DM %
  cpPercentDm: number;            // CP % DM
  dcpPercentDm: number;           // DCP % DM
  tdnPercentDm: number;           // TDN % DM
  ndfPercentDm: number;           // NDF % DM
  adfPercentDm: number;           // ADF % DM
  caPercentDm: number;            // Ca % DM
  pPercentDm: number;             // P % DM
  mgPercentDm: number;            // Mg % DM
  kPercentDm: number;             // K % DM
  naPercentDm: number;            // Na % DM
  sPercentDm: number;             // S % DM
  clPercentDm: number;            // Cl % DM
  znMgKgDm: number;               // Zn mg/kg DM
  cuMgKgDm: number;               // Cu mg/kg DM
  mnMgKgDm: number;               // Mn mg/kg DM
  seMgKgDm: number;               // Se mg/kg DM
  coMgKgDm: number;               // Co mg/kg DM
  iMgKgDm: number;                // I mg/kg DM
  feMgKgDm: number;               // Fe mg/kg DM
  starchPercentDm: number;        // Starch % DM
  nelMcalKgDm: number;            // NEL Mcal/kg DM
  notes?: string;
}

// Master 15 Feed Library exactly as defined in Dr. Bhaktahari Mallick's Workbook
export const DR_MALLICK_FEED_DATABASE: FeedMasterEntry[] = [
  {
    id: 'wheat_bran_coarse',
    name: 'Wheat bran coarse',
    nameOdia: 'ଗହମ ଚୋକଡ଼ (ମୋଟା)',
    nameHindi: 'गेहूं चोकर (मोटा)',
    category: 'concentrate',
    dmPercent: 89,
    cpPercentDm: 16.0,
    dcpPercentDm: 11.0,
    tdnPercentDm: 68.0,
    ndfPercentDm: 42.0,
    adfPercentDm: 13.0,
    caPercentDm: 0.13,
    pPercentDm: 1.10,
    mgPercentDm: 0.35,
    kPercentDm: 1.20,
    naPercentDm: 0.05,
    sPercentDm: 0.18,
    clPercentDm: 0.08,
    znMgKgDm: 85,
    cuMgKgDm: 15,
    mnMgKgDm: 110,
    seMgKgDm: 0.15,
    coMgKgDm: 0.10,
    iMgKgDm: 0.20,
    feMgKgDm: 120,
    starchPercentDm: 18.0,
    nelMcalKgDm: 1.55,
    notes: 'Standard high-phosphorus energy-protein by-product bran.'
  },
  {
    id: 'wheat_bran_polish',
    name: 'Wheat bran polish',
    nameOdia: 'ଗହମ ପଲିସ୍ ଚୋକଡ଼',
    nameHindi: 'गेहूं पॉलिश चोकर',
    category: 'concentrate',
    dmPercent: 90,
    cpPercentDm: 15.0,
    dcpPercentDm: 10.5,
    tdnPercentDm: 70.0,
    ndfPercentDm: 35.0,
    adfPercentDm: 11.0,
    caPercentDm: 0.12,
    pPercentDm: 1.05,
    mgPercentDm: 0.32,
    kPercentDm: 1.15,
    naPercentDm: 0.04,
    sPercentDm: 0.17,
    clPercentDm: 0.07,
    znMgKgDm: 80,
    cuMgKgDm: 14,
    mnMgKgDm: 105,
    seMgKgDm: 0.14,
    coMgKgDm: 0.09,
    iMgKgDm: 0.18,
    feMgKgDm: 110,
    starchPercentDm: 24.0,
    nelMcalKgDm: 1.60,
    notes: 'Higher starch and TDN than coarse bran.'
  },
  {
    id: 'mung_chuni',
    name: 'Mung chuni',
    nameOdia: 'ମୁଗ ଚୁନି / ଚୂନା',
    nameHindi: 'मूंग चूनी',
    category: 'concentrate',
    dmPercent: 90,
    cpPercentDm: 18.0,
    dcpPercentDm: 13.0,
    tdnPercentDm: 65.0,
    ndfPercentDm: 35.0,
    adfPercentDm: 22.0,
    caPercentDm: 0.35,
    pPercentDm: 0.45,
    mgPercentDm: 0.25,
    kPercentDm: 1.10,
    naPercentDm: 0.04,
    sPercentDm: 0.22,
    clPercentDm: 0.06,
    znMgKgDm: 45,
    cuMgKgDm: 12,
    mnMgKgDm: 35,
    seMgKgDm: 0.12,
    coMgKgDm: 0.15,
    iMgKgDm: 0.15,
    feMgKgDm: 95,
    starchPercentDm: 32.0,
    nelMcalKgDm: 1.48,
    notes: 'Traditional pulse by-product with good starch and palatability.'
  },
  {
    id: 'biri_chuni',
    name: 'Biri chuni (Urad)',
    nameOdia: 'ବିରି ଚୁନି',
    nameHindi: 'उड़द चूनी',
    category: 'concentrate',
    dmPercent: 90,
    cpPercentDm: 18.5,
    dcpPercentDm: 13.5,
    tdnPercentDm: 65.0,
    ndfPercentDm: 36.0,
    adfPercentDm: 23.0,
    caPercentDm: 0.40,
    pPercentDm: 0.42,
    mgPercentDm: 0.26,
    kPercentDm: 1.05,
    naPercentDm: 0.05,
    sPercentDm: 0.23,
    clPercentDm: 0.07,
    znMgKgDm: 48,
    cuMgKgDm: 13,
    mnMgKgDm: 38,
    seMgKgDm: 0.13,
    coMgKgDm: 0.16,
    iMgKgDm: 0.15,
    feMgKgDm: 100,
    starchPercentDm: 30.0,
    nelMcalKgDm: 1.48,
    notes: 'Black gram pulse husk and broken cotyledons.'
  },
  {
    id: 'dorb',
    name: 'DORB (Deoiled Rice Bran)',
    nameOdia: 'ଡି-ଅଏଲ୍ଡ ରାଇସ୍ ବ୍ରାନ୍ (DORB)',
    nameHindi: 'डी-ऑयल्ड राइस ब्रान',
    category: 'concentrate',
    dmPercent: 90,
    cpPercentDm: 14.0,
    dcpPercentDm: 8.0,
    tdnPercentDm: 55.0,
    ndfPercentDm: 38.0,
    adfPercentDm: 22.0,
    caPercentDm: 0.10,
    pPercentDm: 0.60,
    mgPercentDm: 0.40,
    kPercentDm: 1.30,
    naPercentDm: 0.06,
    sPercentDm: 0.20,
    clPercentDm: 0.09,
    znMgKgDm: 75,
    cuMgKgDm: 12,
    mnMgKgDm: 130,
    seMgKgDm: 0.18,
    coMgKgDm: 0.12,
    iMgKgDm: 0.22,
    feMgKgDm: 180,
    starchPercentDm: 15.0,
    nelMcalKgDm: 1.35,
    notes: 'Deliberately conservative formulation-credit values. Lab COA should override.'
  },
  {
    id: 'ground_maize',
    name: 'Ground maize',
    nameOdia: 'ମକା ଚୂନା / ଗୁଣ୍ଡ',
    nameHindi: 'मक्का दलिया/चूना',
    category: 'concentrate',
    dmPercent: 89,
    cpPercentDm: 9.0,
    dcpPercentDm: 6.0,
    tdnPercentDm: 88.0,
    ndfPercentDm: 10.0,
    adfPercentDm: 3.0,
    caPercentDm: 0.03,
    pPercentDm: 0.30,
    mgPercentDm: 0.12,
    kPercentDm: 0.35,
    naPercentDm: 0.03,
    sPercentDm: 0.11,
    clPercentDm: 0.05,
    znMgKgDm: 22,
    cuMgKgDm: 5,
    mnMgKgDm: 8,
    seMgKgDm: 0.08,
    coMgKgDm: 0.05,
    iMgKgDm: 0.08,
    feMgKgDm: 45,
    starchPercentDm: 72.0,
    nelMcalKgDm: 2.05,
    notes: 'Highest energy, high starch grain for dairy production.'
  },
  {
    id: 'gnoc',
    name: 'GNOC (Groundnut Oil Cake)',
    nameOdia: 'ଚିନାବାଦାମ ଖଳି (GNOC)',
    nameHindi: 'मूंगफली की खली',
    category: 'concentrate',
    dmPercent: 92,
    cpPercentDm: 45.0,
    dcpPercentDm: 36.0,
    tdnPercentDm: 75.0,
    ndfPercentDm: 15.0,
    adfPercentDm: 10.0,
    caPercentDm: 0.20,
    pPercentDm: 0.60,
    mgPercentDm: 0.30,
    kPercentDm: 1.25,
    naPercentDm: 0.05,
    sPercentDm: 0.32,
    clPercentDm: 0.06,
    znMgKgDm: 55,
    cuMgKgDm: 18,
    mnMgKgDm: 42,
    seMgKgDm: 0.25,
    coMgKgDm: 0.18,
    iMgKgDm: 0.25,
    feMgKgDm: 150,
    starchPercentDm: 8.0,
    nelMcalKgDm: 1.75,
    notes: 'High-protein palatable oilcake.'
  },
  {
    id: 'soya_doc',
    name: 'Soya DOC',
    nameOdia: 'ସୋୟାବିନ୍ ଡି.ଓ.ସି (DOC)',
    nameHindi: 'सोयाबीन डीओसी',
    category: 'concentrate',
    dmPercent: 90,
    cpPercentDm: 48.0,
    dcpPercentDm: 39.0,
    tdnPercentDm: 80.0,
    ndfPercentDm: 14.0,
    adfPercentDm: 9.0,
    caPercentDm: 0.30,
    pPercentDm: 0.65,
    mgPercentDm: 0.28,
    kPercentDm: 2.10,
    naPercentDm: 0.04,
    sPercentDm: 0.38,
    clPercentDm: 0.05,
    znMgKgDm: 50,
    cuMgKgDm: 20,
    mnMgKgDm: 35,
    seMgKgDm: 0.28,
    coMgKgDm: 0.20,
    iMgKgDm: 0.28,
    feMgKgDm: 140,
    starchPercentDm: 6.0,
    nelMcalKgDm: 1.88,
    notes: 'Premium amino acid profile, highest CP & DCP.'
  },
  {
    id: 'mustard_doc',
    name: 'Mustard DOC / Cake',
    nameOdia: 'ସୋରିଷ ଖଳି (Mustard DOC)',
    nameHindi: 'सरसों की खली / डीओसी',
    category: 'concentrate',
    dmPercent: 90,
    cpPercentDm: 37.0,
    dcpPercentDm: 29.0,
    tdnPercentDm: 68.0,
    ndfPercentDm: 25.0,
    adfPercentDm: 18.0,
    caPercentDm: 0.70,
    pPercentDm: 1.10,
    mgPercentDm: 0.45,
    kPercentDm: 1.35,
    naPercentDm: 0.08,
    sPercentDm: 0.95,
    clPercentDm: 0.08,
    znMgKgDm: 65,
    cuMgKgDm: 16,
    mnMgKgDm: 55,
    seMgKgDm: 0.35,
    coMgKgDm: 0.22,
    iMgKgDm: 0.30,
    feMgKgDm: 160,
    starchPercentDm: 9.0,
    nelMcalKgDm: 1.62,
    notes: 'Common Indian oilcake, rich in calcium, phosphorus, and sulfur.'
  },
  {
    id: 'sunflower_doc',
    name: 'Sunflower DOC',
    nameOdia: 'ସୂର୍ଯ୍ୟମୁଖୀ ଡି.ଓ.ସି (DOC)',
    nameHindi: 'सूरजमुखी डीओसी',
    category: 'concentrate',
    dmPercent: 90,
    cpPercentDm: 32.0,
    dcpPercentDm: 23.0,
    tdnPercentDm: 60.0,
    ndfPercentDm: 40.0,
    adfPercentDm: 28.0,
    caPercentDm: 0.35,
    pPercentDm: 0.95,
    mgPercentDm: 0.38,
    kPercentDm: 1.20,
    naPercentDm: 0.05,
    sPercentDm: 0.40,
    clPercentDm: 0.07,
    znMgKgDm: 70,
    cuMgKgDm: 22,
    mnMgKgDm: 45,
    seMgKgDm: 0.30,
    coMgKgDm: 0.20,
    iMgKgDm: 0.25,
    feMgKgDm: 170,
    starchPercentDm: 7.0,
    nelMcalKgDm: 1.45,
    notes: 'Moderate protein with higher fiber.'
  },
  {
    id: 'hybrid_napier',
    name: 'Hybrid Napier green',
    nameOdia: 'ହାଇବ୍ରିଡ୍ ନେପିୟର୍ ଘାସ (ହରିତ)',
    nameHindi: 'हाइब्रिड नेपियर हरी घास',
    category: 'forage',
    dmPercent: 20,
    cpPercentDm: 10.0,
    dcpPercentDm: 5.5,
    tdnPercentDm: 55.0,
    ndfPercentDm: 65.0,
    adfPercentDm: 38.0,
    caPercentDm: 0.45,
    pPercentDm: 0.28,
    mgPercentDm: 0.22,
    kPercentDm: 2.40,
    naPercentDm: 0.08,
    sPercentDm: 0.18,
    clPercentDm: 0.45,
    znMgKgDm: 35,
    cuMgKgDm: 8,
    mnMgKgDm: 65,
    seMgKgDm: 0.15,
    coMgKgDm: 0.12,
    iMgKgDm: 0.25,
    feMgKgDm: 210,
    starchPercentDm: 3.0,
    nelMcalKgDm: 1.20,
    notes: 'Prime cultivated green forage. 80% moisture, 20% DM.'
  },
  {
    id: 'paddy_straw',
    name: 'Paddy straw',
    nameOdia: 'ଧାନ ନଡ଼ା / ପୁଆଳ',
    nameHindi: 'धान का पुआल / पराली',
    category: 'forage',
    dmPercent: 90,
    cpPercentDm: 3.5,
    dcpPercentDm: 0.0,
    tdnPercentDm: 41.0,
    ndfPercentDm: 70.0,
    adfPercentDm: 49.0,
    caPercentDm: 0.30,
    pPercentDm: 0.10,
    mgPercentDm: 0.15,
    kPercentDm: 1.45,
    naPercentDm: 0.12,
    sPercentDm: 0.12,
    clPercentDm: 0.40,
    znMgKgDm: 25,
    cuMgKgDm: 4,
    mnMgKgDm: 120,
    seMgKgDm: 0.08,
    coMgKgDm: 0.08,
    iMgKgDm: 0.15,
    feMgKgDm: 320,
    starchPercentDm: 1.0,
    nelMcalKgDm: 0.85,
    notes: 'Primary dry roughage in eastern India. High silica, 0% DCP.'
  },
  {
    id: 'broken_rice',
    name: 'Broken rice',
    nameOdia: 'ଖୁଦ / ଭଙ୍ଗା ଚାଉଳ (ଶୁଖିଲା)',
    nameHindi: 'टूटा चावल / खुदी',
    category: 'concentrate',
    dmPercent: 89,
    cpPercentDm: 8.0,
    dcpPercentDm: 5.5,
    tdnPercentDm: 88.0,
    ndfPercentDm: 10.0,
    adfPercentDm: 3.0,
    caPercentDm: 0.03,
    pPercentDm: 0.15,
    mgPercentDm: 0.08,
    kPercentDm: 0.25,
    naPercentDm: 0.02,
    sPercentDm: 0.10,
    clPercentDm: 0.04,
    znMgKgDm: 18,
    cuMgKgDm: 4,
    mnMgKgDm: 15,
    seMgKgDm: 0.06,
    coMgKgDm: 0.04,
    iMgKgDm: 0.06,
    feMgKgDm: 30,
    starchPercentDm: 76.0,
    nelMcalKgDm: 1.95,
    notes: 'Dry, coarsely crushed broken rice. High starch (~0.5 kg/cow/day practical start).'
  },
  {
    id: 'traditional_kulchi',
    name: 'Traditional Kulchi (dry equiv)',
    nameOdia: 'ପାରମ୍ପରିକ କୁଲଚି (ରାନ୍ଧିବା ପୂର୍ବ ଶୁଖିଲା ଓଜନ)',
    nameHindi: 'पारंपरिक कुलची (पकाने से पहले का सूखा वजन)',
    category: 'concentrate',
    dmPercent: 89,
    cpPercentDm: 7.5,
    dcpPercentDm: 5.0,
    tdnPercentDm: 82.0,
    ndfPercentDm: 13.0,
    adfPercentDm: 6.0,
    caPercentDm: 0.10,
    pPercentDm: 0.20,
    mgPercentDm: 0.10,
    kPercentDm: 0.30,
    naPercentDm: 0.03,
    sPercentDm: 0.11,
    clPercentDm: 0.05,
    znMgKgDm: 20,
    cuMgKgDm: 5,
    mnMgKgDm: 20,
    seMgKgDm: 0.07,
    coMgKgDm: 0.05,
    iMgKgDm: 0.07,
    feMgKgDm: 35,
    starchPercentDm: 69.0,
    nelMcalKgDm: 1.80,
    notes: 'CRITICAL RULE: Enter dry-equivalent weight BEFORE cooking. Cooking water does NOT count toward DM, CP, starch or energy.'
  },
  {
    id: 'fresh_azolla',
    name: 'Fresh Azolla',
    nameOdia: 'ସତେଜ ଆଜୋଲା (Fresh Azolla)',
    nameHindi: 'ताज़ा अजोला',
    category: 'forage',
    dmPercent: 5,
    cpPercentDm: 23.5,
    dcpPercentDm: 15.0,
    tdnPercentDm: 50.0,
    ndfPercentDm: 55.0,
    adfPercentDm: 32.0,
    caPercentDm: 1.69,
    pPercentDm: 0.54,
    mgPercentDm: 0.35,
    kPercentDm: 1.80,
    naPercentDm: 0.15,
    sPercentDm: 0.30,
    clPercentDm: 0.18,
    znMgKgDm: 60,
    cuMgKgDm: 16,
    mnMgKgDm: 90,
    seMgKgDm: 0.22,
    coMgKgDm: 0.15,
    iMgKgDm: 0.35,
    feMgKgDm: 450,
    starchPercentDm: 4.0,
    nelMcalKgDm: 1.15,
    notes: 'CRITICAL RULE: Exactly 5% DM. 1 kg fresh Azolla = only 0.05 kg DM. Never treat 1 kg fresh as 1 kg DM.'
  }
];

export interface RationIngredientInput {
  feedId: string;
  asFedKg: number;
}

export interface NutrientComparison {
  nutrient: string;
  unit: string;
  required: number;
  supplied: number;
  gap: number;
  adequacyPercent: number;
  status: 'DEFICIT' | 'ADEQUATE' | 'HIGH';
  interpretation?: string;
}

export interface DrMallickRationEvaluation {
  animal: AnimalProfile;
  planningDmiKg: number;
  totalAsFedKg: number;
  totalDmKg: number;
  forageDmKg: number;
  concentrateDmKg: number;
  foragePercent: number;
  concentratePercent: number;
  fcStatus: 'BALANCED' | 'CONCENTRATE HIGH' | 'FORAGE HIGH';

  // Starch screening
  starchKg: number;
  starchPercentDm: number;
  starchStatus: 'LOW STARCH — REVIEW ENERGY DENSITY' | 'PRACTICAL RANGE' | 'HIGH STARCH — CHECK RUMEN FIBRE';

  // Energy screening
  nelMaintenanceMcal: number;
  nelLactationMcal: number;
  nelBwChangeMcal: number;
  nelRequiredMcal: number;
  nelSuppliedMcal: number;
  nelBalanceMcal: number;
  nelAdequacyPercent: number;
  nelStatus: 'NEGATIVE ENERGY BALANCE RISK' | 'MILD ENERGY DEFICIT' | 'NON-NEGATIVE';

  // Fiber analysis
  totalNdfKg: number;
  strawNdfKg: number;
  otherNdfKg: number;
  strawNdfPercent: number;

  // Minerals & Auto Corrections
  calciumG: number;
  phosphorusG: number;
  caPRatio: number;
  caPStatus: 'LOW Ca:P' | 'HIGH Ca:P' | 'ON TARGET' | 'NO P';
  seaShellCorrectionG: number;
  correctedCaG: number;
  correctedCaPRatio: number;

  // Salt inclusion
  automaticNaclG: number;
  sodiumFromNaclG: number;
  chlorideFromNaclG: number;
  totalSodiumG: number;
  totalChlorideG: number;

  // Full Nutrient Balance table
  nutrientComparisons: NutrientComparison[];

  // Ingredients breakdown
  ingredientsBreakdown: Array<{
    feedId: string;
    name: string;
    asFedKg: number;
    dmKg: number;
    cpKg: number;
    tdnKg: number;
    nelMcal: number;
  }>;

  // Key Clinical Observations & Suggested Adjustments
  keyObservations: string[];
  suggestedAdjustments: string[];
}

/**
 * Executes the complete 40-Step Dr. Bhaktahari Mallick Calculation Pipeline
 */
export function calculateDrMallickRation(
  animal: AnimalProfile,
  rationInputs: RationIngredientInput[],
  seaShellElementalCaPercent: number = 36.0
): DrMallickRationEvaluation {
  const {
    bodyWeightKg: bw,
    milkYieldKgDay: milk,
    milkFatPercent: fat,
    milkProteinPercent: protein,
    lactationStage: stage,
    daysPregnant: pregDays,
    targetBwChangeKgDay: bwChange
  } = animal;

  // STEP 3: Planning DMI (Dry Matter Intake)
  // DMI = MAX(0.025 * BW + 0.1 * Milk, 0.03 * BW)
  const dmiCandidate1 = (0.025 * bw) + (0.1 * milk);
  const dmiMinFloor = 0.03 * bw;
  const planningDmi = Math.max(dmiCandidate1, dmiMinFloor);

  // STEP 4: Crude Protein (CP) Requirement (Stage dependent)
  // Early: 16%, Mid: 15%, Late: 14%, Dry/Other: 12% of DMI
  let cpStagePercent = 0.15;
  if (stage === 'Early') cpStagePercent = 0.16;
  else if (stage === 'Mid') cpStagePercent = 0.15;
  else if (stage === 'Late') cpStagePercent = 0.14;
  else if (stage === 'Dry/Other') cpStagePercent = 0.12;

  const cpRequirementKg = planningDmi * cpStagePercent;

  // STEP 5: DCP Requirement = 0.65 * CP Requirement
  const dcpRequirementKg = 0.65 * cpRequirementKg;

  // STEP 6: TDN Requirement
  // TDN = 0.035 * BW^0.75 + 0.31 * Milk * (0.4 + 0.15 * Fat) + IF(Early, 0.5, 0)
  const bwP075 = Math.pow(bw, 0.75);
  const earlyAdjustment = stage === 'Early' ? 0.5 : 0;
  const tdnRequirementKg = (0.035 * bwP075) + (0.31 * milk * (0.4 + 0.15 * fat)) + earlyAdjustment;

  // STEP 7 & 8: Fibre Requirements (Minimum planning targets)
  const ndfRequirementKg = 0.28 * planningDmi;
  const adfRequirementKg = 0.19 * planningDmi;

  // STEP 9: Calcium Requirement (g/day)
  // Ca = 0.03 * BW^0.75 + 1.22 * Milk
  const caRequirementG = (0.03 * bwP075) + (1.22 * milk);

  // STEP 10: Phosphorus Requirement (g/day)
  // P = 0.02 * BW^0.75 + 0.9 * Milk + (12 if PregDays >= 190 else 0)
  const pregPAddition = pregDays >= 190 ? 12 : 0;
  const pRequirementG = (0.02 * bwP075) + (0.9 * milk) + pregPAddition;

  // STEP 11: Macromineral Requirements
  const mgRequirementG = 0.0025 * planningDmi * 1000; // 0.25% of DM
  const kRequirementG = 0.01 * planningDmi * 1000;    // 1.0% of DM
  const naRequirementG = 0.0022 * planningDmi * 1000; // 0.22% of DM
  const sRequirementG = 0.002 * planningDmi * 1000;   // 0.20% of DM
  const clRequirementG = 0.0028 * planningDmi * 1000; // 0.28% of DM

  // STEP 12: Trace Mineral Requirements (mg/day)
  const znRequirementMg = 50 * planningDmi;
  const cuRequirementMg = 10 * planningDmi;
  const mnRequirementMg = 40 * planningDmi;
  const seRequirementMg = 0.30 * planningDmi;
  const coRequirementMg = 0.20 * planningDmi;
  const iRequirementMg = 0.50 * planningDmi;
  const feRequirementMg = 50 * planningDmi;

  // STEP 13-18: Read feeds & calculate supplied nutrients
  let totalAsFedKg = 0;
  let totalDmKg = 0;
  let forageDmKg = 0;
  let concentrateDmKg = 0;

  let suppliedCpKg = 0;
  let suppliedDcpKg = 0;
  let suppliedTdnKg = 0;
  let suppliedNdfKg = 0;
  let strawNdfKg = 0;
  let suppliedAdfKg = 0;
  let suppliedStarchKg = 0;
  let suppliedNelMcal = 0;

  let suppliedCaG = 0;
  let suppliedPG = 0;
  let suppliedMgG = 0;
  let suppliedKG = 0;
  let suppliedNaG = 0;
  let suppliedSG = 0;
  let suppliedClG = 0;

  let suppliedZnMg = 0;
  let suppliedCuMg = 0;
  let suppliedMnMg = 0;
  let suppliedSeMg = 0;
  let suppliedCoMg = 0;
  let suppliedIMg = 0;
  let suppliedFeMg = 0;

  const ingredientsBreakdown: DrMallickRationEvaluation['ingredientsBreakdown'] = [];

  for (const input of rationInputs) {
    if (input.asFedKg <= 0) continue;
    const feed = DR_MALLICK_FEED_DATABASE.find(f => f.id === input.feedId);
    if (!feed) continue;

    totalAsFedKg += input.asFedKg;
    const feedDmKg = (input.asFedKg * feed.dmPercent) / 100;
    totalDmKg += feedDmKg;

    if (feed.category === 'forage') {
      forageDmKg += feedDmKg;
    } else {
      concentrateDmKg += feedDmKg;
    }

    const feedCpKg = (feedDmKg * feed.cpPercentDm) / 100;
    const feedDcpKg = (feedDmKg * feed.dcpPercentDm) / 100;
    const feedTdnKg = (feedDmKg * feed.tdnPercentDm) / 100;
    const feedNdfKg = (feedDmKg * feed.ndfPercentDm) / 100;
    const feedAdfKg = (feedDmKg * feed.adfPercentDm) / 100;
    const feedStarchKg = (feedDmKg * feed.starchPercentDm) / 100;
    const feedNelMcal = feedDmKg * feed.nelMcalKgDm;

    suppliedCpKg += feedCpKg;
    suppliedDcpKg += feedDcpKg;
    suppliedTdnKg += feedTdnKg;
    suppliedNdfKg += feedNdfKg;
    if (feed.id === 'paddy_straw') {
      strawNdfKg += feedNdfKg;
    }
    suppliedAdfKg += feedAdfKg;
    suppliedStarchKg += feedStarchKg;
    suppliedNelMcal += feedNelMcal;

    // Minerals: % DM * 10 gives grams per kg DM
    suppliedCaG += feedDmKg * feed.caPercentDm * 10;
    suppliedPG += feedDmKg * feed.pPercentDm * 10;
    suppliedMgG += feedDmKg * feed.mgPercentDm * 10;
    suppliedKG += feedDmKg * feed.kPercentDm * 10;
    suppliedNaG += feedDmKg * feed.naPercentDm * 10;
    suppliedSG += feedDmKg * feed.sPercentDm * 10;
    suppliedClG += feedDmKg * feed.clPercentDm * 10;

    // Trace: mg/kg DM
    suppliedZnMg += feedDmKg * feed.znMgKgDm;
    suppliedCuMg += feedDmKg * feed.cuMgKgDm;
    suppliedMnMg += feedDmKg * feed.mnMgKgDm;
    suppliedSeMg += feedDmKg * feed.seMgKgDm;
    suppliedCoMg += feedDmKg * feed.coMgKgDm;
    suppliedIMg += feedDmKg * feed.iMgKgDm;
    suppliedFeMg += feedDmKg * feed.feMgKgDm;

    ingredientsBreakdown.push({
      feedId: feed.id,
      name: feed.name,
      asFedKg: Number(input.asFedKg.toFixed(2)),
      dmKg: Number(feedDmKg.toFixed(3)),
      cpKg: Number(feedCpKg.toFixed(3)),
      tdnKg: Number(feedTdnKg.toFixed(3)),
      nelMcal: Number(feedNelMcal.toFixed(3))
    });
  }

  // STEP 20: Starch % of ration DM
  const starchPercentDm = totalDmKg > 0 ? (suppliedStarchKg / totalDmKg) * 100 : 0;
  let starchStatus: DrMallickRationEvaluation['starchStatus'] = 'PRACTICAL RANGE';
  if (starchPercentDm < 18.0) {
    starchStatus = 'LOW STARCH — REVIEW ENERGY DENSITY';
  } else if (starchPercentDm > 24.0) {
    starchStatus = 'HIGH STARCH — CHECK RUMEN FIBRE';
  }

  // STEP 21-25: NEL (Net Energy for Lactation) Requirement
  // Maintenance = 0.08 * BW^0.75
  const nelMaintenanceMcal = 0.08 * bwP075;
  // Lactation = Milk * (0.0929 * Fat + 0.0547 * Protein + 0.192)  [Direct numbers: Fat=4.5, Protein=3.4]
  const nelLactationMcal = milk * ((0.0929 * fat) + (0.0547 * protein) + 0.192);
  // BW Change = +5 if >=0 else -4 per kg
  const nelBwChangeMcal = bwChange >= 0 ? bwChange * 5 : bwChange * 4;
  const nelRequiredMcal = nelMaintenanceMcal + nelLactationMcal + nelBwChangeMcal;
  const nelBalanceMcal = suppliedNelMcal - nelRequiredMcal;
  const nelAdequacyPercent = nelRequiredMcal > 0 ? (suppliedNelMcal / nelRequiredMcal) * 100 : 100;

  let nelStatus: DrMallickRationEvaluation['nelStatus'] = 'NON-NEGATIVE';
  if (nelBalanceMcal < -1.0) {
    nelStatus = 'NEGATIVE ENERGY BALANCE RISK';
  } else if (nelBalanceMcal < 0) {
    nelStatus = 'MILD ENERGY DEFICIT';
  }

  // STEP 29: Calcium:Phosphorus Ratio
  const caPRatio = suppliedPG > 0 ? suppliedCaG / suppliedPG : 0;
  let caPStatus: DrMallickRationEvaluation['caPStatus'] = 'ON TARGET';
  if (suppliedPG === 0) {
    caPStatus = 'NO P';
  } else if (caPRatio < 1.09) {
    caPStatus = 'LOW Ca:P';
  } else if (caPRatio > 1.11) {
    caPStatus = 'HIGH Ca:P';
  }

  // STEP 30: Sea-shell / CaCO3 Correction
  // Target Ca = 1.10 * Current P
  const targetCaG = 1.10 * suppliedPG;
  const caNeededG = Math.max(0, targetCaG - suppliedCaG);
  const seaShellCorrectionG = (caNeededG / (seaShellElementalCaPercent / 100));
  const correctedCaG = suppliedCaG + caNeededG;
  const correctedCaPRatio = suppliedPG > 0 ? correctedCaG / suppliedPG : 0;

  // STEP 31-32: Automatic NaCl (0.5% of total ration DM)
  // 5 g NaCl per kg DM => DM * 0.5 * 10
  const automaticNaclG = totalDmKg * 0.5 * 10;
  const sodiumFromNaclG = automaticNaclG * 0.3933;
  const chlorideFromNaclG = automaticNaclG * 0.6067;
  const totalSodiumG = suppliedNaG + sodiumFromNaclG;
  const totalChlorideG = suppliedClG + chlorideFromNaclG;

  // STEP 33-35: Forage : Concentrate Ratio
  const foragePercent = totalDmKg > 0 ? (forageDmKg / totalDmKg) * 100 : 0;
  const concentratePercent = totalDmKg > 0 ? (concentrateDmKg / totalDmKg) * 100 : 0;
  let fcStatus: DrMallickRationEvaluation['fcStatus'] = 'BALANCED';
  if (foragePercent < 50.0) {
    fcStatus = 'CONCENTRATE HIGH';
  } else if (foragePercent > 65.0) {
    fcStatus = 'FORAGE HIGH';
  }

  // STEP 36: Fiber source contribution
  const otherNdfKg = Math.max(0, suppliedNdfKg - strawNdfKg);
  const strawNdfPercent = suppliedNdfKg > 0 ? (strawNdfKg / suppliedNdfKg) * 100 : 0;

  // Helper for generic status
  const evaluateNutrient = (
    nutrient: string,
    unit: string,
    required: number,
    supplied: number,
    isMinTarget: boolean = false
  ): NutrientComparison => {
    const gap = supplied - required;
    const adequacyPercent = required > 0 ? (supplied / required) * 100 : 100;
    let status: 'DEFICIT' | 'ADEQUATE' | 'HIGH' = 'ADEQUATE';
    if (adequacyPercent < 90) status = 'DEFICIT';
    else if (adequacyPercent > 120) status = 'HIGH';

    let interpretation: string | undefined = undefined;
    if (isMinTarget && status === 'HIGH') {
      interpretation = 'Minimum target safely achieved; excess fiber is non-toxic.';
    }

    return {
      nutrient,
      unit,
      required: Number(required.toFixed(2)),
      supplied: Number(supplied.toFixed(2)),
      gap: Number(gap.toFixed(2)),
      adequacyPercent: Number(adequacyPercent.toFixed(1)),
      status,
      interpretation
    };
  };

  // STEP 27-28: Full Nutrient comparisons list
  const nutrientComparisons: NutrientComparison[] = [
    evaluateNutrient('Dry Matter (DMI)', 'kg/day', planningDmi, totalDmKg),
    evaluateNutrient('Crude Protein (CP)', 'kg/day', cpRequirementKg, suppliedCpKg),
    evaluateNutrient('Digestible CP (DCP)', 'kg/day', dcpRequirementKg, suppliedDcpKg),
    evaluateNutrient('TDN Energy', 'kg/day', tdnRequirementKg, suppliedTdnKg),
    evaluateNutrient('NDF Fibre', 'kg/day', ndfRequirementKg, suppliedNdfKg, true),
    evaluateNutrient('ADF Fibre', 'kg/day', adfRequirementKg, suppliedAdfKg, true),
    evaluateNutrient('Net Energy (NEL)', 'Mcal/day', nelRequiredMcal, suppliedNelMcal),
    evaluateNutrient('Calcium (Ca)', 'g/day', caRequirementG, suppliedCaG),
    evaluateNutrient('Phosphorus (P)', 'g/day', pRequirementG, suppliedPG),
    evaluateNutrient('Magnesium (Mg)', 'g/day', mgRequirementG, suppliedMgG),
    evaluateNutrient('Potassium (K)', 'g/day', kRequirementG, suppliedKG),
    evaluateNutrient('Sodium (Native Na)', 'g/day', naRequirementG, suppliedNaG),
    evaluateNutrient('Total Sodium (+NaCl)', 'g/day', naRequirementG, totalSodiumG),
    evaluateNutrient('Sulfur (S)', 'g/day', sRequirementG, suppliedSG),
    evaluateNutrient('Chloride (Native Cl)', 'g/day', clRequirementG, suppliedClG),
    evaluateNutrient('Total Chloride (+NaCl)', 'g/day', clRequirementG, totalChlorideG),
    evaluateNutrient('Zinc (Zn)', 'mg/day', znRequirementMg, suppliedZnMg),
    evaluateNutrient('Copper (Cu)', 'mg/day', cuRequirementMg, suppliedCuMg),
    evaluateNutrient('Manganese (Mn)', 'mg/day', mnRequirementMg, suppliedMnMg),
    evaluateNutrient('Selenium (Se)', 'mg/day', seRequirementMg, suppliedSeMg),
    evaluateNutrient('Cobalt (Co)', 'mg/day', coRequirementMg, suppliedCoMg),
    evaluateNutrient('Iodine (I)', 'mg/day', iRequirementMg, suppliedIMg),
    evaluateNutrient('Iron (Fe)', 'mg/day', feRequirementMg, suppliedFeMg)
  ];

  // STEP 39-40: Clinical Observations & Practical Adjustment Suggestions
  const keyObservations: string[] = [];
  const suggestedAdjustments: string[] = [];

  // DMI check
  if (totalDmKg < planningDmi * 0.9) {
    const diff = (planningDmi - totalDmKg).toFixed(2);
    keyObservations.push(`Total dry matter supplied (${totalDmKg.toFixed(2)} kg) is ${diff} kg below the 3% BW planning threshold.`);
    suggestedAdjustments.push(`Increase green fodder or fibrous roughage to meet rumen gut fill capacity.`);
  }

  // Energy & Starch
  if (nelStatus === 'NEGATIVE ENERGY BALANCE RISK') {
    keyObservations.push(`Predicted energy deficit of ${Math.abs(nelBalanceMcal).toFixed(2)} Mcal/day indicates risk of mobilization of body reserves.`);
    suggestedAdjustments.push(`Add energy-dense concentrates like Ground Maize or Broken Rice (0.5 - 1.0 kg), while monitoring rumen fiber.`);
  }

  if (starchStatus === 'LOW STARCH — REVIEW ENERGY DENSITY') {
    keyObservations.push(`Ration starch is ${starchPercentDm.toFixed(1)}% DM (below 18% band).`);
    suggestedAdjustments.push(`Supplement crushed maize or broken rice to sustain microbial protein synthesis and milk yield.`);
  } else if (starchStatus === 'HIGH STARCH — CHECK RUMEN FIBRE') {
    keyObservations.push(`Ration starch is ${starchPercentDm.toFixed(1)}% DM (exceeds 24% limit). Risk of Subacute Ruminal Acidosis (SARA).`);
    suggestedAdjustments.push(`Reduce starchy grains and increase chopped green fodder or wheat bran to buffer rumen pH.`);
  }

  // CP & DCP
  if (suppliedCpKg < cpRequirementKg * 0.9) {
    const cpDef = (cpRequirementKg - suppliedCpKg).toFixed(2);
    keyObservations.push(`Crude protein is deficient by ${cpDef} kg/day for ${stage} lactation.`);
    suggestedAdjustments.push(`Add protein cakes (Mustard DOC, GNOC, or Soya DOC) by 250 - 500 g.`);
  }

  // Ca:P Ratio
  if (caPStatus === 'LOW Ca:P') {
    keyObservations.push(`Ca:P ratio is ${caPRatio.toFixed(2)} : 1 (below Dr. Mallick's target of 1.10 : 1). Excess phosphorus relative to calcium.`);
    suggestedAdjustments.push(`Add ${seaShellCorrectionG.toFixed(1)} g of Sea-Shell powder (36% Ca) or CaCO3 daily to reach the balanced 1.10 : 1 ratio.`);
  } else if (caPStatus === 'HIGH Ca:P') {
    keyObservations.push(`Ca:P ratio is ${caPRatio.toFixed(2)} : 1 (above 1.11 : 1 target).`);
  }

  // Forage:Concentrate
  if (fcStatus === 'CONCENTRATE HIGH') {
    keyObservations.push(`Forage constitutes only ${foragePercent.toFixed(1)}% of diet DM (<50%). High risk of milk fat depression.`);
    suggestedAdjustments.push(`Raise green grass or straw intake to bring forage DM into the safe 50-65% window.`);
  } else if (fcStatus === 'FORAGE HIGH') {
    keyObservations.push(`Forage constitutes ${foragePercent.toFixed(1)}% of diet DM (>65%). Bulk may limit high-producing cow intake.`);
  }

  // Straw fiber proportion
  if (strawNdfPercent > 60) {
    keyObservations.push(`Paddy straw supplies ${strawNdfPercent.toFixed(1)}% of total NDF. Straw fiber is lignified with 0% DCP.`);
    suggestedAdjustments.push(`Substitute part of paddy straw with succulent green fodder (Napier/Berseem) for better rumen passage rate.`);
  }

  // Salt inclusion
  keyObservations.push(`Automatic salt (NaCl) inclusion: ${automaticNaclG.toFixed(1)} g/day (5 g/kg DM).`);

  return {
    animal,
    planningDmiKg: Number(planningDmi.toFixed(3)),
    totalAsFedKg: Number(totalAsFedKg.toFixed(2)),
    totalDmKg: Number(totalDmKg.toFixed(3)),
    forageDmKg: Number(forageDmKg.toFixed(3)),
    concentrateDmKg: Number(concentrateDmKg.toFixed(3)),
    foragePercent: Number(foragePercent.toFixed(1)),
    concentratePercent: Number(concentratePercent.toFixed(1)),
    fcStatus,
    starchKg: Number(suppliedStarchKg.toFixed(3)),
    starchPercentDm: Number(starchPercentDm.toFixed(2)),
    starchStatus,
    nelMaintenanceMcal: Number(nelMaintenanceMcal.toFixed(3)),
    nelLactationMcal: Number(nelLactationMcal.toFixed(3)),
    nelBwChangeMcal: Number(nelBwChangeMcal.toFixed(3)),
    nelRequiredMcal: Number(nelRequiredMcal.toFixed(3)),
    nelSuppliedMcal: Number(suppliedNelMcal.toFixed(3)),
    nelBalanceMcal: Number(nelBalanceMcal.toFixed(3)),
    nelAdequacyPercent: Number(nelAdequacyPercent.toFixed(1)),
    nelStatus,
    totalNdfKg: Number(suppliedNdfKg.toFixed(3)),
    strawNdfKg: Number(strawNdfKg.toFixed(3)),
    otherNdfKg: Number(otherNdfKg.toFixed(3)),
    strawNdfPercent: Number(strawNdfPercent.toFixed(1)),
    calciumG: Number(suppliedCaG.toFixed(2)),
    phosphorusG: Number(suppliedPG.toFixed(2)),
    caPRatio: Number(caPRatio.toFixed(2)),
    caPStatus,
    seaShellCorrectionG: Number(seaShellCorrectionG.toFixed(1)),
    correctedCaG: Number(correctedCaG.toFixed(2)),
    correctedCaPRatio: Number(correctedCaPRatio.toFixed(2)),
    automaticNaclG: Number(automaticNaclG.toFixed(1)),
    sodiumFromNaclG: Number(sodiumFromNaclG.toFixed(2)),
    chlorideFromNaclG: Number(chlorideFromNaclG.toFixed(2)),
    totalSodiumG: Number(totalSodiumG.toFixed(2)),
    totalChlorideG: Number(totalChlorideG.toFixed(2)),
    nutrientComparisons,
    ingredientsBreakdown,
    keyObservations,
    suggestedAdjustments
  };
}

/**
 * Natural language farmer input parser
 * Parses strings like: "6 kg napier, 1 kg straw, 2.5 kg bran, 1.2 kg maize, 1 kg azolla"
 */
export function parseFarmerFeedText(text: string): RationIngredientInput[] {
  const normalized = text.toLowerCase();
  const results: RationIngredientInput[] = [];

  const feedMatchers: Array<{ feedId: string; patterns: RegExp[] }> = [
    { feedId: 'hybrid_napier', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:napier|hybrid napier|green grass|ghasa|ghas)/i, /(?:napier|green grass)\s*[:=]?\s*(\d+(?:\.\d+)?)/i] },
    { feedId: 'paddy_straw', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:paddy straw|straw|nada|puala|pual|dry straw)/i, /(?:straw|nada|puala)\s*[:=]?\s*(\d+(?:\.\d+)?)/i] },
    { feedId: 'wheat_bran_coarse', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:coarse bran|wheat bran|chokada|choker|chokar|bran)/i, /(?:bran|chokada)\s*[:=]?\s*(\d+(?:\.\d+)?)/i] },
    { feedId: 'wheat_bran_polish', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:polish bran|polish chokada)/i] },
    { feedId: 'mung_chuni', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:mung chuni|moong chuni|mung)/i, /(?:mung chuni)\s*[:=]?\s*(\d+(?:\.\d+)?)/i] },
    { feedId: 'biri_chuni', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:biri chuni|urad chuni|biri)/i, /(?:biri chuni)\s*[:=]?\s*(\d+(?:\.\d+)?)/i] },
    { feedId: 'ground_maize', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:maize|maka|makka|corn|daliya)/i, /(?:maize|maka)\s*[:=]?\s*(\d+(?:\.\d+)?)/i] },
    { feedId: 'gnoc', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:gnoc|groundnut cake|chinabadam khali|badam khali)/i] },
    { feedId: 'mustard_doc', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:mustard doc|mustard cake|sorisa khali|sarson khali)/i, /(?:mustard|sorisa khali)\s*[:=]?\s*(\d+(?:\.\d+)?)/i] },
    { feedId: 'soya_doc', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:soya doc|soyabean doc|soya meal)/i] },
    { feedId: 'dorb', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:dorb|deoiled rice bran)/i] },
    { feedId: 'broken_rice', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:broken rice|khuda|khudi|dry rice)/i] },
    { feedId: 'traditional_kulchi', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:kulchi|cooked rice)/i] },
    { feedId: 'fresh_azolla', patterns: [/(\d+(?:\.\d+)?)\s*(?:kg|kilo)?\s*(?:fresh azolla|azolla|ajola)/i, /(?:azolla)\s*[:=]?\s*(\d+(?:\.\d+)?)/i] }
  ];

  for (const item of feedMatchers) {
    for (const pattern of item.patterns) {
      const match = normalized.match(pattern);
      if (match && match[1]) {
        const qty = parseFloat(match[1]);
        if (!isNaN(qty) && qty > 0) {
          results.push({ feedId: item.feedId, asFedKg: qty });
          break;
        }
      }
    }
  }

  return results;
}
