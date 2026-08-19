export type ExamMainCategory = 
  | 'nursing' 
  | 'competitive_central' 
  | 'competitive_state' 
  | 'school_boards' 
  | 'college_higher' 
  | 'entrance_exams';

export type ExamSubCategory =
  | 'aiims_norcet'
  | 'osssc_nursing'
  | 'esic_nursing'
  | 'cho_nhm'
  | 'ssc_cgl'
  | 'ssc_chsl'
  | 'ssc_mts'
  | 'upsc_prelims'
  | 'rrb_ntpc'
  | 'rrb_group_d'
  | 'ibps_po'
  | 'sbi_clerk'
  | 'nda_defence'
  | 'opsc_oas'
  | 'osssc_combined'
  | 'teaching_ctet_otet'
  | 'cbse_class_10'
  | 'cbse_class_12'
  | 'icse_class_10'
  | 'bse_odisha_class_10'
  | 'chse_odisha_plus2'
  | 'neet_ug'
  | 'jee_main'
  | 'cuet_ug';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'single_choice' | 'multiple_choice' | 'numerical' | 'assertion_reason';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
  textOdia?: string;
  textHindi?: string;
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
  image?: string;
  options: QuestionOption[];
  correctAnswer: string; // 'A', 'B', 'C', 'D' or comma separated for multi
  positiveMarks: number;
  negativeMarks: number;
  difficulty: QuestionDifficulty;
  explanation: string;
  explanationOdia?: string;
  explanationHindi?: string;
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
  shortDescription: string;
  mainCategory: ExamMainCategory;
  subCategory: ExamSubCategory;
  categoryLabel: string;
  targetExam: string; // e.g. "AIIMS NORCET 2026", "OSSSC Nursing Officer", "CBSE Class 10 Board"
  gradeOrClass?: string; // e.g. "Class 10", "+2 Science", "Graduate"
  board?: string; // "CBSE", "ICSE", "Odisha State Board", "Central NTA"
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  sections: ExamSection[];
  questions: ExamQuestion[];
  isLive: boolean;
  isFree: boolean;
  featuredBadge?: string; // "High Yield", "Real Exam Replicate", "Most Popular"
  attemptsCount: number;
  averageScore?: number;
  cutoffEstimated?: number;
  instructions: string[];
  createdAt: string;
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
