export type KGLevel = 'country' | 'state' | 'authority' | 'exam' | 'stage' | 'subject';

export interface KGBreadcrumbItem {
  id: string;
  label: string;
  labelRegional?: string;
  slug: string;
  url: string;
  level: KGLevel;
  icon?: string;
  badge?: string;
}

export interface KGCountryNode {
  id: string; // 'india'
  name: string; // 'India'
  slug: string; // 'india'
  code: string; // 'IN'
}

export interface KGStateNode {
  id: string; // 'central' | 'odisha' | 'maharashtra' | 'uttar-pradesh' | ...
  name: string; // 'All-India / Central' | 'Odisha' | ...
  slug: string; // 'central' | 'odisha' | ...
  code: string; // 'OD' | 'MH' | 'UP' | 'DL' | ...
  capital?: string;
  officialLanguage?: string;
  isUnionTerritory?: boolean;
  isCentral?: boolean;
  totalAuthoritiesCount?: number;
  totalExamsCount?: number;
}

export interface KGAuthorityNode {
  id: string; // 'upsc' | 'ssc' | 'nta' | 'rrb' | 'ibps' | 'aiims' | 'opsc' | 'osssc' | 'bse-odisha' | ...
  name: string; // 'Union Public Service Commission' | 'Odisha Staff Selection Commission'
  shortName: string; // 'UPSC' | 'OSSSC'
  slug: string;
  stateId: string; // 'central' or stateId
  website?: string;
  category: string; // 'Central Commission' | 'State PSC' | 'Medical Board' | 'School Board'
  description?: string;
  totalExamsCount?: number;
}

export interface KGExamNode {
  id: string; // 'upsc-cse' | 'ssc-cgl' | 'aiims-norcet' | 'bse-odisha-10th' | ...
  name: string; // 'UPSC Civil Services Examination'
  nameHindi?: string;
  nameRegional?: string;
  shortName: string; // 'CSE' | 'CGL' | 'NORCET'
  code: string; // 'UPSC-CSE' | 'SSC-CGL'
  slug: string;
  authorityId: string;
  stateId: string;
  category: ExamMainCategory;
  subCategory?: ExamSubCategory;
  frequency: string;
  eligibility: string;
  defaultStages: string[]; // ['prelims', 'mains', 'interview']
  totalMarksPattern: string;
  negativeMarking: string;
  overview: string;
  syllabusHighlights: string[];
}

export interface KGStageNode {
  id: string; // 'prelims' | 'tier-1' | 'cbt-1' | 'mains' | 'single-stage' | 'annual-board'
  name: string; // 'Prelims (Paper 1 & Paper 2)'
  slug: string;
  type: ExamStageType;
  description?: string;
  defaultDurationMinutes?: number;
  defaultQuestionsCount?: number;
}

export interface KGSubjectNode {
  id: string; // 'general-studies-1' | 'csat' | 'quantitative-aptitude' | 'clinical-nursing' | ...
  name: string;
  slug: string;
  code?: string;
  category?: string;
  icon?: string;
  description?: string;
}

export interface ExamSEOMetadata {
  title: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  h1: string;
  structuredDataJsonLd?: Record<string, any>;
  ogType?: string;
}

export interface ExamKnowledgeGraphLineage {
  country: KGCountryNode;
  state: KGStateNode;
  authority: KGAuthorityNode;
  exam: KGExamNode;
  stage: KGStageNode;
  subject?: KGSubjectNode;
  canonicalPath: string; // e.g. "/exams/india/odisha/osssc/nursing-officer/cbt/clinical-nursing"
  breadcrumbs: KGBreadcrumbItem[];
  seoMeta: ExamSEOMetadata;
}

export type ExamMainCategory = 
  | 'all'
  | 'upsc_civil'
  | 'ssc_graduate_12th'
  | 'railway_rrb'
  | 'banking_ibps'
  | 'sbi_rbi_financial'
  | 'defence_paramilitary'
  | 'police_state_cadres'
  | 'engineering_jee_gate'
  | 'medical_neet_nursing'
  | 'management_cat_mba'
  | 'law_clat_judiciary'
  | 'teaching_tet_ctet'
  | 'state_psc_all_28'
  | 'clerical_patwari_state'
  | 'commerce_ca_cma_cs'
  | 'school_boards'
  | 'agriculture_pharmacy_design'
  | 'nursing' 
  | 'competitive_central' 
  | 'competitive_state' 
  | 'college_higher' 
  | 'entrance_exams';

export type ExamTestIntent = 
  | 'full_length_mock' 
  | 'pyq_archive' 
  | 'speed_drill_20min' 
  | 'topic_test' 
  | 'current_affairs_booster';

export type ExamStageType = 
  | 'prelims' 
  | 'mains' 
  | 'tier_1' 
  | 'tier_2' 
  | 'cbt_1' 
  | 'cbt_2' 
  | 'single_stage'
  | 'interview_personality';

export type ExamSubCategory =
  | 'aiims_norcet'
  | 'osssc_nursing'
  | 'esic_nursing'
  | 'cho_nhm'
  | 'nclex_nursing'
  | 'esic_paramedical'
  | 'ssc_cgl'
  | 'ssc_chsl'
  | 'ssc_mts'
  | 'ssc_cpo'
  | 'ssc_steno'
  | 'ssc_gd'
  | 'ssc_je'
  | 'upsc_cse'
  | 'upsc_prelims'
  | 'upsc_mains'
  | 'upsc_nda'
  | 'upsc_cds'
  | 'upsc_capf'
  | 'upsc_ese'
  | 'rrb_ntpc'
  | 'rrb_group_d'
  | 'rrb_alp'
  | 'rrb_je'
  | 'rrb_rpf'
  | 'ibps_po'
  | 'ibps_clerk'
  | 'ibps_rrb'
  | 'ibps_so'
  | 'sbi_po'
  | 'sbi_clerk'
  | 'sbi_so'
  | 'rbi_grade_b'
  | 'rbi_assistant'
  | 'lic_insurance'
  | 'nabard_sebi'
  | 'nda_defence'
  | 'defence_cds'
  | 'defence_afcat'
  | 'defence_capf'
  | 'defence_agniveer'
  | 'police_delhi'
  | 'police_up'
  | 'police_bihar'
  | 'police_maharashtra'
  | 'police_rajasthan'
  | 'police_mp'
  | 'police_odisha'
  | 'police_tamil_nadu'
  | 'police_west_bengal'
  | 'opsc_oas'
  | 'osssc_combined'
  | 'teaching_ctet_otet'
  | 'teaching_state_tet'
  | 'ugc_net'
  | 'csir_net'
  | 'kvs_nvs_teacher'
  | 'dsssb_teaching'
  | 'police_si'
  | 'state_psc_bpsc'
  | 'state_psc_uppsc'
  | 'state_psc_wbcs'
  | 'state_psc_mpsc'
  | 'state_psc_rpsc'
  | 'state_psc_appsc'
  | 'state_psc_tgpsc'
  | 'state_psc_kpsc'
  | 'state_psc_kerala'
  | 'state_psc_mppsc'
  | 'state_psc_gpsc'
  | 'state_psc_hpsc'
  | 'state_psc_ppsc'
  | 'state_psc_jpsc'
  | 'state_psc_cgpsc'
  | 'state_psc_apsc'
  | 'state_psc_spsc'
  | 'state_psc_tpsc'
  | 'state_psc_ukpsc'
  | 'state_psc_hp'
  | 'state_psc_goa'
  | 'state_clerical_patwari'
  | 'state_clerical_lekhpal'
  | 'state_clerical_vdo'
  | 'ca_foundation_inter'
  | 'cma_cs_commerce'
  | 'judiciary_civil_judge'
  | 'school_class_1_to_5'
  | 'school_class_6_to_8'
  | 'school_class_9_10'
  | 'cbse_class_10'
  | 'cbse_class_12'
  | 'icse_class_10'
  | 'bse_odisha_class_10'
  | 'chse_odisha_plus2'
  | 'olympiad_primary'
  | 'olympiad_science_math'
  | 'navodaya_jnvst'
  | 'sainik_school'
  | 'neet_ug'
  | 'neet_pg'
  | 'jee_main'
  | 'jee_advanced'
  | 'bitsat_engg'
  | 'wbjee_engg'
  | 'mht_cet_engg'
  | 'gate_engineering'
  | 'gate_cse'
  | 'gate_ece'
  | 'gate_ee'
  | 'gate_me'
  | 'gate_ce'
  | 'cat_mba'
  | 'xat_cmat_mba'
  | 'cuet_ug'
  | 'cuet_pg'
  | 'clat_law'
  | 'ailet_law'
  | 'icar_agriculture'
  | 'gpat_pharmacy'
  | 'nift_nid_design';

export interface ExamPassInfo {
  tier: 'silver' | 'gold';
  name: string;
  price: number;
  originalPrice: number;
  totalTests: number;
  questionsPerTest: number;
  totalQuestions: number;
  features: string[];
  badge?: string;
  testsRemaining?: number;
  activatedAt?: string;
  paymentMethod?: string;
}

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'single_choice' | 'multiple_choice' | 'numerical' | 'assertion_reason';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
  textOdia?: string;
  textHindi?: string;
  textRegional?: string;
  regionalLanguage?: string;
  image?: string;
}

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  sectionId: string;
  sectionName: string;
  subject: string;
  topic: string;
  type: QuestionType;
  text: string;
  textOdia?: string;
  textHindi?: string;
  textRegional?: string;
  regionalLanguage?: string;
  image?: string;
  options: QuestionOption[];
  correctAnswer: string; // 'A', 'B', 'C', 'D' or comma separated for multi
  positiveMarks: number;
  negativeMarks: number;
  difficulty: QuestionDifficulty;
  explanation: string;
  explanationOdia?: string;
  explanationHindi?: string;
  explanationRegional?: string;
  referenceNotes?: string;
}

export interface ExamSection {
  id: string;
  name: string;
  totalQuestions: number;
  totalMarks: number;
  positiveMarksPerQuestion: number;
  negativeMarksPerQuestion: number;
  sectionTimeLimitMinutes?: number; // Optional sectional timing
}

export interface MockTest {
  id: string;
  slug: string;
  title: string;
  titleOdia?: string;
  titleHindi?: string;
  shortDescription: string;
  mainCategory: ExamMainCategory;
  subCategory: ExamSubCategory;
  categoryLabel: string;
  targetExam: string; // e.g. "AIIMS NORCET 2026", "OSSSC Nursing Officer", "UPSC CSE Prelims"
  gradeOrClass?: string; // e.g. "Class 10", "+2 Science", "Graduate"
  board?: string; // "UPSC", "SSC", "NTA", "IBPS", "RRB", "OPSC", "BPSC", "UPPSC", "MPSC", "TNPSC", "CBSE"
  conductingAuthority?: string; // "Union Public Service Commission", "Staff Selection Commission", "State PSC", etc.
  state?: string; // "All-India / Central" or specific Indian state e.g. "Maharashtra", "Uttar Pradesh", "Bihar"
  examStage?: ExamStageType; // prelims, mains, tier_1, tier_2, cbt_1, single_stage
  testIntent?: ExamTestIntent; // full_length_mock, pyq_archive, speed_drill_20min, topic_test
  supportedLanguages?: string[]; // ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'or', 'gu', 'kn', 'pa', 'ml']
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  sections: ExamSection[];
  questions: ExamQuestion[];
  isLive: boolean;
  isFree: boolean;
  featuredBadge?: string; // "High Yield", "Real Exam Replicate", "Most Popular", "Official PYQ"
  attemptsCount: number;
  averageScore?: number;
  cutoffEstimated?: number;
  instructions: string[];
  createdAt: string;
  kgLineage?: ExamKnowledgeGraphLineage;
  resolvedCategory?: string;
}

export interface QuestionAttemptState {
  questionId: string;
  selectedOption?: string;
  status: 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_and_marked';
  timeSpentSeconds: number;
  isCorrect?: boolean;
}

export interface TestSubmission {
  testId: string;
  userId?: string;
  userName: string;
  userEmail?: string;
  userState?: string;
  userCity?: string;
  startedAt: string;
  completedAt: string;
  totalTimeTakenSeconds: number;
  answers: Record<string, string>; // questionId -> selectedOption
  questionStates: Record<string, QuestionAttemptState>;
}

export interface SectionResult {
  sectionId: string;
  sectionName: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number;
  maxScore: number;
  accuracy: number;
  timeSpentSeconds: number;
}

export interface TestResultReport {
  id: string;
  testId: string;
  testTitle: string;
  targetExam?: string;
  mainCategory: ExamMainCategory;
  subCategory: ExamSubCategory;
  userName: string;
  userState: string;
  score: number;
  maxScore: number;
  percentage: number;
  accuracyPercentage: number;
  percentile: number;
  allIndiaRank: number;
  totalParticipants: number;
  stateRank: number;
  totalStateParticipants: number;
  timeSpentSeconds: number;
  totalDurationSeconds: number;
  totalQuestions: number;
  totalAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalUnattempted: number;
  totalMarkedForReview: number;
  positiveMarksTotal: number;
  negativeMarksDeducted: number;
  cutoffScore: number;
  hasClearedCutoff: boolean;
  sectionResults: SectionResult[];
  subjectAccuracyBreakdown: Record<string, { attempted: number; correct: number; accuracy: number }>;
  weakTopics: string[];
  strongTopics: string[];
  submittedAt: string;
  detailedQuestions: Array<ExamQuestion & { userResponse?: string; isCorrect: boolean; timeTaken: number }>;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatarUrl?: string;
  userState: string;
  score: number;
  maxScore: number;
  accuracy: number;
  timeTakenMinutes: number;
  percentile: number;
  badge?: 'Gold' | 'Silver' | 'Bronze' | 'Top 1%';
  submittedAt: string;
}

export interface AIExamAnalysis {
  overallVerdict: string;
  strengthsSummary: string[];
  criticalWeaknesses: string[];
  topicWiseActionPlan: Array<{
    topic: string;
    subject: string;
    gapDescription: string;
    recommendedRemedy: string;
    highYieldFact: string;
  }>;
  timeManagementCritique: {
    averageSecondsPerCorrect: number;
    averageSecondsPerIncorrect: number;
    paceRecommendation: string;
    rushedQuestionsCount: number;
    prolongedQuestionsCount: number;
  };
  negativeMarkingImpact: {
    marksLostToGuesses: number;
    recoveryAdvice: string;
  };
  recommendedNextMockTestSlug: string;
  studySchedule7Days: Array<{
    day: string;
    focusSubject: string;
    tasks: string[];
  }>;
}
