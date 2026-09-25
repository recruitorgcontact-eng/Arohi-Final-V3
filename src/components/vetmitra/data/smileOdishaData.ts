// SMILE & Government of Odisha F&ARD Dairy & Poultry Knowledge Base
// Departmental Extension Field Guidelines & Clinical Practice Data

export interface PoultrySchemeItem {
  id: string;
  name: string;
  nameOdia: string;
  system: string;
  sizes: Array<{
    capacity: string;
    totalCostLakh: number;
    subsidy50Lakh: number;
    subsidy60Lakh: number;
  }>;
  facilitiesSupported: string[];
  beneficiaries: string;
  objective: string;
}

export const ODISHA_POULTRY_SCHEMES_2025_26: PoultrySchemeItem[] = [
  {
    id: 'broiler_farming',
    name: 'Broiler Farming',
    nameOdia: 'ବ୍ରଏଲର କୁକୁଡ଼ା ପାଳନ (ଡିପ୍-ଲିଟର୍ ପ୍ରଣାଳୀ)',
    system: 'Deep-litter system (Individual & Women SHG)',
    sizes: [
      { capacity: '500 birds', totalCostLakh: 1.80, subsidy50Lakh: 0.90, subsidy60Lakh: 1.08 },
      { capacity: '1,000 birds', totalCostLakh: 3.60, subsidy50Lakh: 1.80, subsidy60Lakh: 2.16 },
      { capacity: '1,500 birds', totalCostLakh: 5.40, subsidy50Lakh: 2.70, subsidy60Lakh: 3.24 },
      { capacity: '2,000 birds', totalCostLakh: 7.20, subsidy50Lakh: 3.60, subsidy60Lakh: 4.32 },
      { capacity: '2,500 birds', totalCostLakh: 9.00, subsidy50Lakh: 4.50, subsidy60Lakh: 5.40 },
      { capacity: '3,000 birds', totalCostLakh: 10.80, subsidy50Lakh: 5.40, subsidy60Lakh: 6.48 }
    ],
    facilitiesSupported: [
      'Shed construction',
      'Feeders and drinkers',
      'Initial stock of commercial day-old broiler chicks',
      'Equipment and other essential items'
    ],
    beneficiaries: 'Individual farmers, Women SHGs (WSHGs), and eligible entrepreneurs',
    objective: 'Promote commercial broiler poultry production, rural livelihoods, and meat supply.'
  },
  {
    id: 'layer_deep_litter',
    name: 'Layer Farming (Deep-litter System)',
    nameOdia: 'ଅଣ୍ଡା ଦିଆ କୁକୁଡ଼ା ପାଳନ (ଡିପ୍-ଲିଟର୍ ପ୍ରଣାଳୀ)',
    system: 'Deep-litter system for egg production',
    sizes: [
      { capacity: '1,000 birds', totalCostLakh: 8.225, subsidy50Lakh: 4.1125, subsidy60Lakh: 4.935 }
    ],
    facilitiesSupported: [
      'Shed construction',
      'Feeders and drinkers',
      'Litter management equipment',
      'Initial stock of commercial pullets',
      'Essential biosecurity items'
    ],
    beneficiaries: 'Individual farmers, Women SHGs, and eligible entrepreneurs',
    objective: 'Increase local table egg production and farm income in Odisha.'
  },
  {
    id: 'layer_cage_system',
    name: 'Layer Farming (Cage System)',
    nameOdia: 'ଅଣ୍ଡା ଦିଆ କୁକୁଡ଼ା ପାଳନ (କେଜ୍ / ଖୁଆଡ଼ ପ୍ରଣାଳୀ)',
    system: 'Commercial cage housing system',
    sizes: [
      { capacity: '1,000 birds', totalCostLakh: 8.225, subsidy50Lakh: 4.1125, subsidy60Lakh: 4.935 }
    ],
    facilitiesSupported: [
      'Modern tiered cage system',
      'Shed and roof structure',
      'Feeders and nipple drinkers',
      'Manure handling equipment',
      'Initial stock of pullets'
    ],
    beneficiaries: 'Individual farmers, Women SHGs, and eligible entrepreneurs',
    objective: 'Commercial hygienic egg production through space-efficient cage systems.'
  },
  {
    id: 'semi_commercial_duck',
    name: 'Semi-Commercial Duck Farming',
    nameOdia: 'ଅର୍ଦ୍ଧ-ବାଣିଜ୍ୟିକ ବତକ ପାଳନ',
    system: 'Semi-intensive housing with foraging/water facility',
    sizes: [
      { capacity: '1,000 birds', totalCostLakh: 4.40, subsidy50Lakh: 2.20, subsidy60Lakh: 2.64 }
    ],
    facilitiesSupported: [
      'Shed construction and fencing',
      'Feeders, drinkers, and water bath facility',
      'Initial stock of ducklings',
      'Biosecurity and essential farm items'
    ],
    beneficiaries: 'Individual farmers, Women SHGs, and eligible entrepreneurs',
    objective: 'Promote duck meat and egg production for diversified rural livelihoods.'
  },
  {
    id: 'chick_rearing_unit',
    name: 'Chick-Rearing Unit',
    nameOdia: 'ଚିକ୍-ରିୟରିଂ ୟୁନିଟ୍ (ଛୁଆ ବଢ଼ାଇବା କେନ୍ଦ୍ର)',
    system: 'Mother chick brooding & nursery unit',
    sizes: [
      { capacity: '1,000 chicks per batch', totalCostLakh: 2.54, subsidy50Lakh: 1.27, subsidy60Lakh: 1.524 }
    ],
    facilitiesSupported: [
      'Brooding equipment and brooder guards',
      'Electric/infrared heaters',
      'Feeders and drinkers',
      'Housing structure',
      'Initial stock of day-old chicks and vaccination equipment'
    ],
    beneficiaries: 'Individual farmers, Women SHGs, and eligible entrepreneurs',
    objective: 'Supply quality reared night-sheltered chicks to backyard poultry farmers.'
  },
  {
    id: 'mini_poultry_feed_mill',
    name: 'Mini Poultry Feed Mill',
    nameOdia: 'ମିନି କୁକୁଡ଼ା ଦାନା ମିଲ୍ (Feed Mill)',
    system: 'On-farm / decentralized commercial feed processing',
    sizes: [
      { capacity: '1 TPD (Tonne/day)', totalCostLakh: 2.80, subsidy50Lakh: 1.40, subsidy60Lakh: 1.68 },
      { capacity: '2 TPD (Tonnes/day)', totalCostLakh: 5.60, subsidy50Lakh: 2.80, subsidy60Lakh: 3.36 },
      { capacity: '3 TPD (Tonnes/day)', totalCostLakh: 8.40, subsidy50Lakh: 4.20, subsidy60Lakh: 5.04 }
    ],
    facilitiesSupported: [
      'Processing building/shed',
      'Feed processing machinery (hammer mill grinder, ribbon mixer, etc.)',
      'Electrical installation and motors',
      'Raw ingredient storage and bagging equipment'
    ],
    beneficiaries: 'Individual entrepreneurs, Farmer Producer Organisations (FPOs), Women SHGs',
    objective: 'Produce quality poultry feed locally and reduce feed cost for farmers.'
  }
];

export const ODISHA_POULTRY_ELIGIBILITY = [
  'Permanent resident of Odisha',
  'Individual farmer, Women Self Help Group (WSHG), Farmer Producer Organisation (FPO), or rural entrepreneur',
  'Availability of suitable land (own or long-term registered lease) and basic road/water/electricity infrastructure',
  'Willingness to maintain the unit as per technical and biosecurity standards of F&ARD Department',
  'Compliance with scheme operational guidelines for 2025–26'
];

export const ODISHA_POULTRY_DOCUMENTS = [
  'Filled Application Form (as per F&ARD operational format)',
  'Identity Proof (Aadhaar Card / Voter ID)',
  'Address Proof (Residence certificate, Ration Card, etc.)',
  'Land document / registered lease agreement (if required)',
  'Bank account details (cancelled cheque / passbook copy)',
  'SHG registration certificate and resolution copy (for group applications)',
  'Detailed Project Proposal / Cost Estimate (as per guideline)'
];

export const ODISHA_POULTRY_HOW_TO_APPLY = [
  { step: 1, title: 'Check Guidelines', desc: 'Review the latest F&ARD operational guideline for 2025–26.' },
  { step: 2, title: 'Obtain Form', desc: 'Obtain and fill the application form as per F&ARD instructions.' },
  { step: 3, title: 'Submit to CDVO', desc: 'Submit application to the Chief District Veterinary Officer (CDVO) or online portal.' },
  { step: 4, title: 'Site Verification', desc: 'Veterinary department officials conduct field site verification and technical feasibility.' },
  { step: 5, title: 'Implement Unit', desc: 'Construct shed and install equipment as per approved technical drawing.' },
  { step: 6, title: 'Subsidy Release', desc: 'Subsidy (50% general / 60% WSHG) released directly to bank account upon verification.' }
];

// The 6 Major Dairy Problems Reported by Odisha Farmers
export interface SixProblemsCategory {
  id: string;
  number: number;
  title: string;
  titleOdia: string;
  iconName: string;
  reportedProblems: string[];
  trainingFocus: string;
  clinicalSolution: string;
}

export const SIX_MAJOR_DAIRY_PROBLEMS: SixProblemsCategory[] = [
  {
    id: 'feeding_nutrition',
    number: 1,
    title: 'Feeding and Nutrition',
    titleOdia: 'ଖାଦ୍ୟ ଓ ପୁଷ୍ଟିସାର ସମସ୍ୟା',
    iconName: 'Wheat',
    reportedProblems: [
      'Insufficient green fodder (mostly depends on wheat bran and paddy straw)',
      'Unbalanced ration (too much wheat bran, low energy/starch)',
      'Low milk yield due to inadequate feeding',
      'Lack of knowledge on feed quantity, dry matter, and type of feed',
      'Mineral mixture and common salt not given regularly',
      'High feed cost and low dairy profit',
      'Seasonal fodder shortage in summer and dry months'
    ],
    trainingFocus: 'Optimising feeding schedule, balanced Total Mixed Ration (TMR), fodder cultivation (Hybrid Napier, CO-4/5), and cost-effective feeding with Azolla.',
    clinicalSolution: 'Enforce the 3% BW DMI rule. Replace excessive wheat bran with crushed maize and protein cakes (Mustard DOC/GNOC). Maintain 1.2–1.6:1 Ca:P ratio with Sea-Shell powder/Limestone and 50g salt daily.'
  },
  {
    id: 'milk_production',
    number: 2,
    title: 'Milk Production Related Issues',
    titleOdia: 'ଦୁଧ ଉତ୍ପାଦନ ଓ ଫ୍ୟାଟ୍ ସମସ୍ୟା',
    iconName: 'Droplet',
    reportedProblems: [
      'Low milk yield and poor peak yield',
      'Milk yield drops sharply in summer due to heat stress',
      'Sudden fall in milk after calving (transition breakdown)',
      'Poor milk persistency across mid and late lactation',
      'Low milk fat percentage and SNF',
      'Poor body condition score (BCS < 2.5)',
      'High feed cost per litre of milk produced'
    ],
    trainingFocus: 'Improving milk production through balanced feeding, health management, heat stress control (shed cooling, water spray), and transition feeding.',
    clinicalSolution: 'Introduce whole-plant corn silage (10-12 kg/day) or TMR with 10 kg chopped green Napier. Feed 21-day transition diet before calving to prevent negative energy balance.'
  },
  {
    id: 'udder_health_mastitis',
    number: 3,
    title: 'Udder Health and Mastitis',
    titleOdia: 'ଥନ ରୋଗ ଓ ମାଷ୍ଟାଇଟିସ୍ (Mastitis)',
    iconName: 'AlertCircle',
    reportedProblems: [
      'Clinical and subclinical mastitis in high-yielding cows',
      'Swelling, pain, heat, and abnormal milk (clots, flakes, watery milk)',
      'Reduced milk yield and permanent quarter loss',
      'Repeated mastitis cases across successive lactations',
      'Lack of knowledge on clean milking practices and teat hygiene',
      'No or irregular use of post-milking teat dips',
      'Contaminated milk and price deductions at milk chilling centers'
    ],
    trainingFocus: 'Mastitis prevention and control, clean milk production, strip cup / CMT test, teat dip with povidone iodine, and dry cow therapy.',
    clinicalSolution: 'Perform California Mastitis Test (CMT) monthly. Always practice post-milking teat dipping in 0.5% povidone iodine. Never allow cow to sit down for 30 minutes after milking. Maintain dry bedding.'
  },
  {
    id: 'reproductive_problems',
    number: 4,
    title: 'Reproductive Problems',
    titleOdia: 'ପ୍ରଜନନ ଓ ବାରମ୍ବାର ଗର୍ଭଧାରଣ ବିଫଳତା',
    iconName: 'HeartHandshake',
    reportedProblems: [
      'Delayed heat or no heat after calving (anoestrus > 90 days)',
      'Repeat breeding (cow comes into heat repeatedly after 3+ AI)',
      'Silent heat (weak heat symptoms not detected by farmer)',
      'Long gap between calving and conception',
      'Insemination timing issues (AI done too early or too late)',
      'Low conception rate and early embryonic death',
      'Uterine infections (endometritis, cloudy discharge)'
    ],
    trainingFocus: 'Heat detection skills (AM-PM rule), correct insemination timing, repeat breeding management, mineral supplementation (P, Zn, Mn, Cu, Se), and reproductive check-ups.',
    clinicalSolution: 'Correct severe phosphorus and trace mineral deficits (Zn, Mn, Cu) that suppress oestrus. Follow AM-PM rule: Cow in heat in morning -> AI in evening; heat in evening -> AI next morning. Screen for endometritis.'
  },
  {
    id: 'calf_young_stock',
    number: 5,
    title: 'Calf and Young Stock Management',
    titleOdia: 'ବାଛୁରୀ ଯତ୍ନ ଓ ମୃତ୍ୟୁହାର ରୋକିବା',
    iconName: 'Smile',
    reportedProblems: [
      'Calf diarrhea (white scours) and high calf mortality',
      'Poor colostrum feeding (delayed or inadequate amount)',
      'Respiratory infections and pneumonia in poorly ventilated sheds',
      'Slow growth and low body weight in growing heifers',
      'Lack of knowledge on milk feeding schedule and calf starter',
      'Delayed age at first insemination (> 28-36 months)',
      'Inadequate vaccination and deworming in calves'
    ],
    trainingFocus: 'Calf care, colostrum management within 2 hours of birth (10% of BW), health and vaccination, calf starter feeding, and heifer growth management.',
    clinicalSolution: 'Feed 3-4 litres of warm colostrum within the first 2 hours of birth for passive immunoglobulin transfer. Deworm at 14 days of age. Introduce calf starter pellets from 2nd week to accelerate rumen papillae development.'
  },
  {
    id: 'general_health',
    number: 6,
    title: 'General Health and Farm Management',
    titleOdia: 'ସାଧାରଣ ସ୍ୱାସ୍ଥ୍ୟ, ଟିକାକରଣ ଓ ଫାର୍ମ ପରିଚାଳନା',
    iconName: 'ShieldCheck',
    reportedProblems: [
      'Frequent outbreaks of infectious diseases (FMD, HS, BQ)',
      'Irregular vaccination and missing booster shots',
      'Internal and external parasites (ticks, lice, liver fluke)',
      'Metabolic problems around calving (milk fever, ketosis, downer cow)',
      'Lameness and hoof lesions from wet, unpaved floors',
      'Poor housing, high humidity, and poor ventilation',
      'Heat stress in summer causing panting and immune suppression'
    ],
    trainingFocus: 'Preventive health care, strict vaccination calendar (FMD, HS, BQ), periodic deworming, biosecurity, housing management, and control of metabolic diseases.',
    clinicalSolution: 'Follow Odisha vaccination calendar: FMD biannual (Feb & Aug), HS pre-monsoon (May-June), BQ pre-monsoon. Routine fecal testing and rotational deworming. Provide rubber mats or dry grooved pucca floors to prevent foot rot.'
  }
];

// Total Mixed Ration (TMR) Recipes for Odisha
export interface TmrRecipe {
  id: string;
  name: string;
  nameOdia: string;
  description: string;
  targetCow: string;
  ingredients: Array<{
    name: string;
    asFedKg: number;
    dmKg: number;
    purpose: string;
  }>;
  totalAsFedKg: number;
  totalDmKg: number;
  cpKg: number;
  tdnKg: number;
  ndfPercentDm: number;
  caG: number;
  pG: number;
  caPRatio: number;
  benefits: string[];
}

export const TMR_RECIPES_ODISHA: TmrRecipe[] = [
  {
    id: 'tmr_with_corn_silage',
    name: 'TMR with Whole-Crop Maize Silage',
    nameOdia: 'ମକା ସାଇଲେଜ୍ ଯୁକ୍ତ ସମ୍ପୂର୍ଣ୍ଣ ମିଶ୍ରିତ ଖାଦ୍ୟ (TMR)',
    description: 'Gold standard balanced ration for 10L milk crossbred cow using high-energy whole-crop corn silage.',
    targetCow: '300 kg Cow, 10 Litre Milk/day (Mid-lactation)',
    ingredients: [
      { name: 'Whole-crop maize silage (with cob & grain)', asFedKg: 12.0, dmKg: 3.6, purpose: 'High energy + effective fiber' },
      { name: 'Hybrid Napier (chopped green)', asFedKg: 5.0, dmKg: 1.0, purpose: 'Green succulence, calcium & vitamins' },
      { name: 'Paddy straw (chopped 1-2 inches)', asFedKg: 1.5, dmKg: 1.2, purpose: 'Rumen scratch factor & effective NDF' },
      { name: 'Wheat bran (coarse)', asFedKg: 1.5, dmKg: 1.3, purpose: 'Energy, phosphorus & palatability' },
      { name: 'Mung chuni', asFedKg: 1.0, dmKg: 0.9, purpose: 'Pulse protein & moderate starch' },
      { name: 'Oil cake (GNOC / Mustard / Soya)', asFedKg: 0.5, dmKg: 0.45, purpose: 'High-quality bypass & rumen protein' },
      { name: 'Fresh Azolla', asFedKg: 1.0, dmKg: 0.10, purpose: 'Cost-effective protein, vitamins A/B/E & minerals' },
      { name: 'Mineral mixture', asFedKg: 0.05, dmKg: 0.05, purpose: 'Chelated Zn, Mn, Cu, Co, Se & calcium' },
      { name: 'Common salt (NaCl)', asFedKg: 0.05, dmKg: 0.05, purpose: 'Sodium & chloride balance, appetite' }
    ],
    totalAsFedKg: 22.6,
    totalDmKg: 9.65,
    cpKg: 1.42,
    tdnKg: 6.35,
    ndfPercentDm: 30.5,
    caG: 72.0,
    pG: 44.0,
    caPRatio: 1.63,
    benefits: [
      'Prevents selective feed sorting in the manger',
      'Provides steady rumen pH and prevents subacute acidosis (SARA)',
      'Maintains persistent peak milk yield and high fat %',
      'Improves post-calving energy balance and conception rates',
      'Significantly lowers cost per litre compared to commercial pellets'
    ]
  },
  {
    id: 'tmr_without_corn_silage',
    name: 'TMR without Corn Silage (Local Feeds + Azolla)',
    nameOdia: 'ବିନା ସାଇଲେଜ୍ ସ୍ଥାନୀୟ ଖାଦ୍ୟ ଓ ଆଜୋଲା TMR',
    description: 'Practical, low-cost balanced TMR formulated for small and marginal dairy farmers using easily available farm forages.',
    targetCow: '300 kg Cow, 10 Litre Milk/day (Mid-lactation)',
    ingredients: [
      { name: 'Hybrid Napier (chopped green)', asFedKg: 10.0, dmKg: 2.0, purpose: 'Green succulence, calcium & vitamins' },
      { name: 'Paddy straw (chopped)', asFedKg: 2.0, dmKg: 1.6, purpose: 'Effective structural fiber' },
      { name: 'Fresh Azolla', asFedKg: 1.0, dmKg: 0.10, purpose: 'Vitamins, minerals, sustainable protein' },
      { name: 'Wheat bran', asFedKg: 1.5, dmKg: 1.3, purpose: 'Energy & rumen digestibility' },
      { name: 'Mung chuni', asFedKg: 1.0, dmKg: 0.9, purpose: 'High protein pulse by-product' },
      { name: 'Oil cake (Mustard / GNOC / Soya)', asFedKg: 0.5, dmKg: 0.45, purpose: 'Concentrated protein' },
      { name: 'Maize or broken rice (crushed)', asFedKg: 0.5, dmKg: 0.45, purpose: 'Essential starch energy' },
      { name: 'Mineral mixture', asFedKg: 0.05, dmKg: 0.05, purpose: 'Trace minerals & macro elements' },
      { name: 'Common salt', asFedKg: 0.05, dmKg: 0.05, purpose: 'Sodium & electrolyte balance' }
    ],
    totalAsFedKg: 16.6,
    totalDmKg: 9.35,
    cpKg: 1.35,
    tdnKg: 6.05,
    ndfPercentDm: 31.0,
    caG: 68.0,
    pG: 38.0,
    caPRatio: 1.78,
    benefits: [
      'Zero dependency on commercial silage companies',
      'Utilizes on-farm Azolla pits and cultivated Hybrid Napier grass',
      'Keeps feed cost under ₹140–160/day for 10L milk',
      'Provides optimal Ca:P ratio (1.78:1) to prevent milk fever and silent heat'
    ]
  }
];

// Whole-Crop Corn Silage Quality Checklist
export interface SilageQualityCheck {
  id: string;
  criterion: string;
  criterionOdia: string;
  goodIndicator: string;
  badIndicator: string;
  scientificReason: string;
}

export const SILAGE_QUALITY_CHECKLIST: SilageQualityCheck[] = [
  {
    id: 'grain_presence',
    criterion: 'Cob and Grain Pieces',
    criterionOdia: 'ମକା କେଣ୍ଡା ଓ ଦାନାର ଉପସ୍ଥିତି',
    goodIndicator: 'Visible bright yellow grain pieces and soft crushed cob throughout the silage.',
    badIndicator: 'No cob or grain pieces; only leaves and fibrous stem (plant-only silage).',
    scientificReason: 'Whole-crop maize with cob has 65-70% TDN; without cob energy drops to <52% TDN.'
  },
  {
    id: 'chop_length',
    criterion: 'Chop Length',
    criterionOdia: 'କଟା ହୋଇଥିବା ଆକାର (Chop Size)',
    goodIndicator: 'Uniformly chopped to 1 to 2 cm (approx. 0.5 - 0.75 inch).',
    badIndicator: 'Long uncut leaves (> 5 cm) or coarse shredded stalks.',
    scientificReason: '1-2 cm chop facilitates tight air exclusion during compaction and provides optimal rumen scratch.'
  },
  {
    id: 'moisture_dm',
    criterion: 'Moisture & Dry Matter Content',
    criterionOdia: 'ଆର୍ଦ୍ରତା ଓ ଶୁଷ୍କ ପଦାର୍ଥ (DM %)',
    goodIndicator: '30% to 35% Dry Matter. Moist to touch, but water does NOT drip when squeezed firmly in hand.',
    badIndicator: 'Very wet and dripping water (<25% DM) or brittle, dry straw-like (>45% DM).',
    scientificReason: 'Harvesting at milky to early dough stage (90-110 days) ensures optimal lactic fermentation without clostridial rotting.'
  },
  {
    id: 'aroma_smell',
    criterion: 'Fermentation Aroma',
    criterionOdia: 'ବାସ୍ନା (Pleasant Fermented Aroma)',
    goodIndicator: 'Pleasant, sweet-sour, fresh pickled smell (lactic acid aroma).',
    badIndicator: 'Foul, rotten, putrid smell or rancid butter odor (butyric acid contamination).',
    scientificReason: 'Lactic acid bacteria rapidly drop pH to 3.8-4.2; butyric smell indicates clostridial spoilage that causes ketosis.'
  },
  {
    id: 'color_mold',
    criterion: 'Color & Mold Freedom',
    criterionOdia: 'ରଙ୍ଗ ଓ ଫିମ୍ପି ମୁକ୍ତ',
    goodIndicator: 'Light greenish-yellow to olive brown color; completely free of mold.',
    badIndicator: 'Black or white mold patches, slimy feel, or deep charred black color.',
    scientificReason: 'Black/white mold produces dangerous mycotoxins (aflatoxin) that poison cows and cause abortion.'
  }
];

// SMILE Sample Cow Status Card Data
export interface SmileFarmerProfile {
  farmerId: string;
  name: string;
  village: string;
  block: string;
  district: string;
  mobile: string;
  aadhaarMasked: string;
  dairyExperienceYears: number;
  farm: {
    cowsCount: number;
    heifersCount: number;
    calvesCount: number;
    breeds: string;
    housing: string;
    fodderLandAcre: number;
    majorFeeds: string[];
    milkMarketing: string;
  };
  cows: Array<{
    cowNo: string;
    tagNo: string;
    breed: string;
    ageYears: number;
    parity: number;
    milkYieldKgDay: number;
    daysInMilk: number;
    lastCalvingDate: string;
    reproductiveStatus: string;
    vaccinationStatus: {
      fmd: 'Completed' | 'Due' | 'Pending';
      hs: 'Completed' | 'Due' | 'Pending';
      bq: 'Completed' | 'Due' | 'Pending';
    };
    healthStatus: string;
    aiFlags: Array<{
      category: 'Reproduction' | 'Feeding' | 'Vaccination' | 'Mastitis' | 'Health';
      severity: 'red' | 'yellow' | 'green';
      message: string;
    }>;
  }>;
}

export const SAMPLE_SMILE_FARMER_ODISHA: SmileFarmerProfile = {
  farmerId: 'SMILE-OD-12345',
  name: 'Ramesh Pradhan',
  village: 'Balipatna',
  block: 'Balianta',
  district: 'Khordha',
  mobile: '98XXXXXXXX',
  aadhaarMasked: '23XXXXXXXXXX',
  dairyExperienceYears: 5,
  farm: {
    cowsCount: 3,
    heifersCount: 1,
    calvesCount: 2,
    breeds: 'CB Jersey / HF Cross',
    housing: 'Pucca shed with concrete floor',
    fodderLandAcre: 0.5,
    majorFeeds: ['Hybrid Napier', 'Paddy straw', 'Wheat bran', 'Mung chuni'],
    milkMarketing: 'MPCS (Milk Producer Cooperative Society - OMFED)'
  },
  cows: [
    {
      cowNo: 'Cow 01',
      tagNo: 'IN-OD-102931',
      breed: 'CB Jersey',
      ageYears: 5,
      parity: 3,
      milkYieldKgDay: 8.0,
      daysInMilk: 110,
      lastCalvingDate: '2024-05-12',
      reproductiveStatus: 'Not inseminated after last calving (Delayed heat / Anoestrus)',
      vaccinationStatus: {
        fmd: 'Completed',
        hs: 'Due',
        bq: 'Completed'
      },
      healthStatus: 'Healthy body, but reproductive inactivity',
      aiFlags: [
        { category: 'Reproduction', severity: 'red', message: 'Delayed heat at 110 DIM. Plan gynaecological exam and mineral therapy.' },
        { category: 'Feeding', severity: 'yellow', message: 'High wheat bran proportion; low energy and inverted Ca:P ratio.' },
        { category: 'Vaccination', severity: 'red', message: 'Hemorrhagic Septicemia (HS) vaccination is overdue!' }
      ]
    },
    {
      cowNo: 'Cow 02',
      tagNo: 'IN-OD-102932',
      breed: 'HF Cross',
      ageYears: 4,
      parity: 2,
      milkYieldKgDay: 12.0,
      daysInMilk: 60,
      lastCalvingDate: '2024-07-02',
      reproductiveStatus: 'Inseminated 20 days ago (Heat monitoring required)',
      vaccinationStatus: {
        fmd: 'Completed',
        hs: 'Completed',
        bq: 'Completed'
      },
      healthStatus: 'History of subclinical mastitis in right rear quarter',
      aiFlags: [
        { category: 'Mastitis', severity: 'yellow', message: 'Past mastitis history. Perform monthly CMT test and apply post-milking teat dip.' },
        { category: 'Feeding', severity: 'yellow', message: 'Peak lactation energy deficit. Add 1 kg crushed maize to prevent negative energy balance.' }
      ]
    },
    {
      cowNo: 'Cow 03',
      tagNo: 'IN-OD-102933',
      breed: 'CB Jersey',
      ageYears: 6,
      parity: 4,
      milkYieldKgDay: 6.0,
      daysInMilk: 250,
      lastCalvingDate: '2023-12-10',
      reproductiveStatus: 'Pregnant (Confirmed 6 months)',
      vaccinationStatus: {
        fmd: 'Completed',
        hs: 'Completed',
        bq: 'Due'
      },
      healthStatus: 'Healthy pregnant cow',
      aiFlags: [
        { category: 'Feeding', severity: 'yellow', message: 'Prepare for drying off in 30 days. Begin 21-day transition feeding protocol.' },
        { category: 'Vaccination', severity: 'yellow', message: 'Black Quarter (BQ) vaccination due next month.' }
      ]
    }
  ]
};
