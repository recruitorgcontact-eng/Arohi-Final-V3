// Arohi VetMitra - Data Types & Interfaces
// Self-contained veterinary & livestock intelligence module

export type VetSpecies = 'cattle' | 'goat' | 'dog' | 'cat';

export type VetLanguage = 'or' | 'hi' | 'bn' | 'en';

export interface CowAnimalProfile {
  id: string;
  name?: string;
  tagNumber?: string;
  species: 'cattle';
  breed: string; // e.g. 'Crossbred Jersey', 'Holstein Friesian', 'Sahiwal', 'Gir', 'Murrah'
  bodyWeightKg: number; // e.g. 400
  milkYieldKgDay: number; // e.g. 10
  milkFatPercent: number; // e.g. 4.5
  milkTrueProteinPercent: number; // e.g. 3.5
  milkLactosePercent?: number; // default 4.85%
  daysInMilk: number; // DIM, e.g. 90
  parity: number; // 1 = primiparous, 2+ = multiparous
  bodyConditionScore: number; // 1 to 5, e.g. 3.0
  pregnancyDays: number; // e.g. 0 (manual add-on for late gestation)
  healthContext?: string;
}

export interface FeedItem {
  id: string;
  name: string;
  nameOdia: string;
  nameHindi: string;
  category: 'forage_green' | 'forage_dry' | 'concentrate' | 'mineral';
  dmPercent: number; // Dry Matter % (e.g. 20% for Hybrid Napier)
  cpPercent: number; // Crude Protein % of DM
  ndfPercent: number; // Neutral Detergent Fiber % of DM
  adfPercent: number; // Acid Detergent Fiber % of DM
  caPercent: number; // Calcium % of DM
  pPercent: number; // Phosphorus % of DM
  mgPercent: number; // Magnesium % of DM
  kPercent: number; // Potassium % of DM
  isCustom?: boolean;
}

export interface RationEntry {
  feedId: string;
  asFedKgDay: number; // physical weight offered per day
}

export interface NutrientComparison {
  nutrientName: string;
  nutrientKey: string;
  unit: string;
  requirement: number;
  supplied: number;
  difference: number;
  percentTarget: number;
  status: 'LOW' | 'OK' | 'HIGH';
  targetExplanation?: string;
}

export interface NasemCalculationResult {
  milkEnergyMcalDay: number;
  predictedDmiKgDay: number;
  actualDmiKgDay: number;
  dmiBalanceKgDay: number;
  comparisons: NutrientComparison[];
  totalAsFedKgDay: number;
  forageToConcentrateRatio: { forage: number; concentrate: number };
  screeningObservations: string[];
  recommendations: string[];
}

export interface VetChatMessage {
  id: string;
  sender: 'user' | 'arohi';
  text: string;
  timestamp: Date;
  species?: VetSpecies;
  audioUrl?: string;
  attachments?: {
    type: 'image' | 'document' | 'report';
    url: string;
    name: string;
    extractedText?: string;
  }[];
  triageBucket?: string;
  isEmergencyAlert?: boolean;
  followUpQuestions?: string[];
  recommendedTests?: string[];
}

export interface VetScenarioItem {
  id: number;
  titleOdia: string;
  titleEnglish: string;
  category: string;
  dialogue: {
    speaker: 'farmer' | 'arohi';
    text: string;
  }[];
  clinicalFocus: string;
  probingQuestions: string[];
  redFlags: string[];
  suggestedTests: string[];
}

export type PetPostVisibility = 'public' | 'followers' | 'private';

export interface PetSocialComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likesCount: number;
}

export interface PetSocialPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorLocation: string;
  petId?: string;
  petName: string;
  petSpecies: VetSpecies;
  petBreed?: string;
  petAge?: string;
  content: string;
  contentOdia?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  visibility: PetPostVisibility;
  tags: string[];
  taggedProductIds?: string[];
  likesCount: number;
  isLiked?: boolean;
  commentsCount: number;
  comments: PetSocialComment[];
  createdAt: string;
  askVetMitraContext?: string;
}

export type PetIndustryCategory = 'nutrition' | 'wellness' | 'accessories' | 'services' | 'clinic';

export interface PetIndustryProduct {
  id: string;
  name: string;
  nameOdia?: string;
  brand: string;
  category: PetIndustryCategory;
  species: VetSpecies[];
  rating: number;
  reviewsCount: number;
  price: string;
  originalPrice?: string;
  description: string;
  descriptionOdia?: string;
  imageUrl: string;
  verifiedBadge: boolean;
  deliveryInfo?: string;
  bookingAvailable?: boolean;
  keyBenefits: string[];
  keyBenefitsOdia?: string[];
  contactOrAction?: string;
}

