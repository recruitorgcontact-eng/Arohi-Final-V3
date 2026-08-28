export type Mission87TrackType = 
  | 'digital_business'
  | 'manufacturing'
  | 'agritech_food'
  | 'skilled_green'
  | 'creative_commerce'
  | 'services_trade';

export type Mission87EducationStatus = 
  | 'studying'
  | 'seeking_work'
  | 'left_education'
  | 'skilled_unrecognized'
  | 'aspiring_builder';

export type Mission87Milestone = 
  | 'enrolled'
  | 'diagnostic_completed'
  | 'first_blueprint_unlocked'
  | 'prototype_built'
  | 'mission_5k_achieved'
  | 'micro_enterprise_active';

export interface VerifiedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  valueGenerated?: number;
  clientFeedback?: string;
  evidenceUrl?: string;
}

export interface FutureMapResult {
  cadetTitle: string;
  trackName: string;
  summaryVision: string;
  geographicScope: {
    local: string;
    district: string;
    national: string;
    global: string;
  };
  phase1Learn: {
    title: string;
    duration: string;
    skills: string[];
    tools: string[];
    aiGuidance: string;
  };
  phase2Build: {
    title: string;
    duration: string;
    prototypeIdea: string;
    deliverable: string;
    testMilestone: string;
  };
  phase3Find: {
    title: string;
    duration: string;
    targetAudiences: string[];
    outreachStrategy: string;
    closingPitch: string;
  };
  phase4DeliverEarn: {
    title: string;
    duration: string;
    milestone5kGoal: string;
    valueProposition: string;
    nextScaleLadder: string;
  };
  manufacturingScope?: {
    rawMaterials: string[];
    machines: string[];
    schemes: string[];
    demandNiche: string;
    estimatedCapital: string;
  };
}

export interface Mission87Enrollment {
  cadetId: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  townVillage: string;
  ageGroup: string;
  educationStatus: Mission87EducationStatus;
  primaryTrack: Mission87TrackType;
  hoursPerDay: string;
  availableEquipment: string[];
  enrolledAt: string;
  futureMap?: FutureMapResult;
  milestones: Mission87Milestone[];
  verifiedProjects: VerifiedProject[];
  totalEarningsLogged?: number;
}
