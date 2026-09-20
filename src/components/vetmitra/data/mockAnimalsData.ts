// Mock Animal Database for Universal Animal Passport (Cattle, Goats, Dogs, Cats)
import { VET_STOCK_IMAGES } from './vetStockImages';

export interface UniversalAnimalRecord {
  id: string;
  name: string;
  nameOdia: string;
  species: 'cattle' | 'goat' | 'dog' | 'cat';
  breed: string;
  tagNumber: string;
  ageYears: number;
  weightKg: number;
  photoUrl: string;
  status: string;
  statusColor: 'emerald' | 'amber' | 'rose';
  // Cattle specific
  milkYieldLDay?: number;
  recentYieldDropLDay?: number;
  lactationNo?: number;
  expectedCalvingDate?: string;
  daysToCalving?: number;
  // Common vitals
  temperatureC: number;
  appetite: 'Good' | 'Reduced' | 'Off-Feed';
  ruminationOrActivity: 'Normal' | 'Slow' | 'Absent';
  bodyConditionScore: number;
  // Preventative
  vaccinations: {
    name: string;
    date: string;
    dueDate?: string;
    status: 'up_to_date' | 'due_soon' | 'overdue';
  }[];
  deworming: {
    lastDate: string;
    dueDate: string;
    dueInDays: number;
    medicineName: string;
  };
  reproduction?: {
    lastServiceDate: string;
    serviceType: string;
    expectedCalvingDate: string;
  };
  recentActivities: {
    date: string;
    title: string;
    category: 'vaccine' | 'deworming' | 'milk_check' | 'treatment' | 'ration';
  }[];
  arohiInsight?: {
    message: string;
    messageOdia: string;
    actionLabel: string;
    severity: 'info' | 'warning' | 'urgent';
  };
}

export const SAMPLE_ANIMAL_RECORDS: UniversalAnimalRecord[] = [
  {
    id: 'animal_ganga_cow',
    name: 'Ganga',
    nameOdia: 'ଗଙ୍ଗା',
    species: 'cattle',
    breed: 'Crossbred Jersey',
    tagNumber: 'OD-2024-0156',
    ageYears: 4,
    weightKg: 420,
    photoUrl: VET_STOCK_IMAGES.cattleJersey,
    status: 'Healthy & Productive',
    statusColor: 'emerald',
    milkYieldLDay: 12,
    recentYieldDropLDay: 9,
    lactationNo: 2,
    expectedCalvingDate: '20 Feb 2025',
    daysToCalving: 153,
    temperatureC: 38.5,
    appetite: 'Reduced',
    ruminationOrActivity: 'Slow',
    bodyConditionScore: 3.0,
    vaccinations: [
      { name: 'FMD (ଖୁରା ରୋଗ)', date: '12 Jan 2025', status: 'up_to_date' },
      { name: 'HS (ଗଳାଫୁଲା)', date: '12 Jan 2025', status: 'up_to_date' },
      { name: 'BQ (ଫାଶିଆ)', date: '12 Jan 2025', status: 'up_to_date' },
      { name: 'Brucellosis', date: 'Due 12 Apr 2025', status: 'due_soon' },
    ],
    deworming: {
      lastDate: '12 Sep 2024',
      dueDate: '08 Oct 2024',
      dueInDays: 18,
      medicineName: 'Albendazole Suspension 100ml',
    },
    reproduction: {
      lastServiceDate: '15 May 2024',
      serviceType: 'AI (Artificial Insemination)',
      expectedCalvingDate: '20 Feb 2025',
    },
    recentActivities: [
      { date: '12 Sep 2024', title: 'Deworming (Albendazole)', category: 'deworming' },
      { date: '10 Sep 2024', title: 'Milk yield recorded (12 L)', category: 'milk_check' },
      { date: '28 Aug 2024', title: 'FMD Booster Vaccination', category: 'vaccine' },
      { date: '15 Aug 2024', title: 'Body weight check (420 kg)', category: 'treatment' },
    ],
    arohiInsight: {
      message: 'Milk yield has reduced by 25% in the last 5 days (from 12L to 9L). Rumen cudding is slower. Feed balance and early mastitis screening recommended.',
      messageOdia: 'ଗତ ୫ ଦିନରେ କ୍ଷୀର ୧୨ ଲିଟରରୁ ୯ ଲିଟରକୁ କମିଯାଇଛି। ଖାଦ୍ୟ ସନ୍ତୁଳନ ଓ ଥନ ପରୀକ୍ଷା ଆବଶ୍ୟକ।',
      actionLabel: 'Consult on Ganga (ଗଙ୍ଗା ପାଇଁ ପରାମର୍ଶ)',
      severity: 'warning',
    }
  },
  {
    id: 'animal_ramu_goat',
    name: 'Ramu',
    nameOdia: 'ରାମୁ',
    species: 'goat',
    breed: 'Black Bengal Cross',
    tagNumber: 'OD-GT-8842',
    ageYears: 2,
    weightKg: 28,
    photoUrl: VET_STOCK_IMAGES.goatPortrait,
    status: 'Alert & Active',
    statusColor: 'emerald',
    temperatureC: 39.2,
    appetite: 'Good',
    ruminationOrActivity: 'Normal',
    bodyConditionScore: 3.2,
    vaccinations: [
      { name: 'PPR (ଛେଳି ବସନ୍ତ)', date: '04 Mar 2024', status: 'up_to_date' },
      { name: 'Enterotoxemia (ET)', date: '15 Jun 2024', status: 'up_to_date' },
      { name: 'Goat Pox', date: 'Due 10 Nov 2024', status: 'due_soon' },
    ],
    deworming: {
      lastDate: '20 Aug 2024',
      dueDate: '20 Nov 2024',
      dueInDays: 61,
      medicineName: 'Fenbendazole 10% Oral',
    },
    recentActivities: [
      { date: '20 Aug 2024', title: 'Deworming dosage administered', category: 'deworming' },
      { date: '15 Jun 2024', title: 'ET Booster vaccine given', category: 'vaccine' },
    ],
    arohiInsight: {
      message: 'Body weight has gained 2.5 kg this month. Mineral salt block licking is supporting optimal rumination.',
      messageOdia: 'ଏହି ମାସରେ ଓଜନ ୨.୫ କିଲୋ ବୃଦ୍ଧି ପାଇଛି। ସ୍ୱାସ୍ଥ୍ୟ ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱାଭାବିକ ଅଛି।',
      actionLabel: 'Check Goat Nutrition',
      severity: 'info',
    }
  },
  {
    id: 'animal_bruno_dog',
    name: 'Bruno',
    nameOdia: 'ବ୍ରୁନୋ',
    species: 'dog',
    breed: 'Labrador Retriever',
    tagNumber: 'PET-DOG-092',
    ageYears: 3,
    weightKg: 31,
    photoUrl: VET_STOCK_IMAGES.dogLabrador,
    status: 'Deworming Due Soon',
    statusColor: 'amber',
    temperatureC: 38.6,
    appetite: 'Good',
    ruminationOrActivity: 'Normal',
    bodyConditionScore: 3.5,
    vaccinations: [
      { name: 'Anti-Rabies (ARV)', date: '14 Jan 2024', status: 'up_to_date' },
      { name: 'DHPPi (7-in-1)', date: '14 Jan 2024', status: 'up_to_date' },
      { name: 'Kennel Cough', date: 'Due 15 Oct 2024', status: 'due_soon' },
    ],
    deworming: {
      lastDate: '10 Jun 2024',
      dueDate: '10 Sep 2024',
      dueInDays: -10,
      medicineName: 'Praziquantel + Pyrantel Embonate',
    },
    recentActivities: [
      { date: '15 Jul 2024', title: 'Tick & Flea topical application', category: 'treatment' },
      { date: '14 Jan 2024', title: 'Annual ARV & DHPPi shots', category: 'vaccine' },
    ],
    arohiInsight: {
      message: 'Quarterly deworming cycle is due. Administer weight-appropriate broad spectrum tablet on an empty stomach.',
      messageOdia: 'କୃମି ଔଷଧ ଦେବାର ସମୟ ହୋଇଛି। ଡାକ୍ତରୀ ମାତ୍ରାରେ ଟାବଲେଟ୍ ଦିଅନ୍ତୁ।',
      actionLabel: 'View Dog Medication Guide',
      severity: 'warning',
    }
  },
  {
    id: 'animal_lucy_cat',
    name: 'Lucy',
    nameOdia: 'ଲୁସି',
    species: 'cat',
    breed: 'Domestic Shorthair',
    tagNumber: 'PET-CAT-044',
    ageYears: 2,
    weightKg: 4.2,
    photoUrl: VET_STOCK_IMAGES.catPortrait,
    status: 'Healthy & Vaccinated',
    statusColor: 'emerald',
    temperatureC: 38.8,
    appetite: 'Good',
    ruminationOrActivity: 'Normal',
    bodyConditionScore: 3.0,
    vaccinations: [
      { name: 'Tricat Trio (FVRCP)', date: '02 Feb 2024', status: 'up_to_date' },
      { name: 'Anti-Rabies', date: '02 Feb 2024', status: 'up_to_date' },
    ],
    deworming: {
      lastDate: '01 Aug 2024',
      dueDate: '01 Nov 2024',
      dueInDays: 42,
      medicineName: 'Spot-on Feline Dewormer',
    },
    recentActivities: [
      { date: '01 Aug 2024', title: 'Preventative spot-on applied', category: 'deworming' },
      { date: '02 Feb 2024', title: 'Annual FVRCP Booster', category: 'vaccine' },
    ],
    arohiInsight: {
      message: 'Hydration and urinary habits are normal. Continue wet food supplementation for kidney protection.',
      messageOdia: 'ପିଶାବ ଓ ପାଣି ପିଇବା ସ୍ୱାଭାବିକ ଅଛି। ସ୍ୱାସ୍ଥ୍ୟ ଉତ୍ତମ ରହିଛି।',
      actionLabel: 'Cat Care Tips',
      severity: 'info',
    }
  }
];
