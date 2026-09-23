export interface SpeaksLanguage {
  code: string;
  nativeName: string;
  englishName: string;
  flag: string;
  region: 'Indian' | 'Global';
  subRegion?: string;
  script: string;
  sampleGreeting: string;
  transliterationGuide?: string;
  ttsLocale: string;
  speechRecognitionLocale: string;
}

export interface SpeaksSyllable {
  syllable: string;
  phonetic: string;
  accuracy: 'perfect' | 'good' | 'needs_work';
  tip?: string;
}

export interface SpeaksPhrase {
  id: string;
  targetText: string;
  transliteration: string; // Phonetic pronunciation in user's mother tongue
  sourceTranslation: string; // Meaning in user's mother tongue
  breakdownNotes?: string; // Etiquette, grammar rule, or cultural nuance
  syllables?: SpeaksSyllable[];
  audioUrl?: string;
  formalVariant?: string;
  casualVariant?: string;
}

export interface SpeaksLessonNode {
  id: string;
  dayNumber: number; // 1 to 28
  weekNumber: number; // 1 to 4
  title: string;
  nativeTitle: string;
  scenario: string;
  iconType: 'intro' | 'social' | 'office' | 'interview' | 'travel' | 'food' | 'boss' | 'chest' | 'exam';
  phrases: SpeaksPhrase[];
  conversationGoal: string;
  isChest?: boolean;
  rewardXp: number;
}

export interface SpeaksWeek {
  weekNumber: number;
  title: string;
  nativeTitle: string;
  subtitle: string;
  theme: string;
  milestoneName: string;
  colorGradient: string;
  lessons: SpeaksLessonNode[];
}

export interface SpeaksRoleplayScenario {
  id: string;
  title: string;
  nativeTitle: string;
  category: 'travel' | 'workplace' | 'daily' | 'career' | 'emergency';
  description: string;
  aiPersonaName: string;
  aiRole: string;
  userRole: string;
  location: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  systemPromptTemplate: string;
  starterMessage: {
    target: string;
    transliteration: string;
    source: string;
  };
  suggestedResponses: string[];
  goals: {
    id: string;
    description: string;
    completed: boolean;
  }[];
}

export interface SpeaksVocabCard {
  id: string;
  targetWord: string;
  transliteration: string;
  meaning: string;
  partOfSpeech?: string;
  exampleSentenceTarget: string;
  exampleSentenceSource: string;
  sourceLang: string;
  targetLang: string;
  masteryLevel: number; // 0 to 5
  timesReviewed: number;
  lastReviewedAt: string;
  tags?: string[];
}

export interface SpeaksUserProgress {
  sourceLanguageCode: string;
  targetLanguageCode: string;
  currentDay: number;
  completedDays: number[];
  unlockedChests: number[];
  totalXp: number;
  streakDays: number;
  lastActiveDate: string;
  savedWordsCount: number;
  fluencyScore: number; // 0 - 100
  accuracyHistory: {
    date: string;
    score: number;
    wpm: number;
  }[];
}

export interface SpeaksEvaluationResult {
  score: number; // 0 to 100
  fluencyScore: number;
  pronunciationScore: number;
  recognizedText: string;
  targetText: string;
  feedbackHindi: string;
  feedbackEnglish: string;
  betterAlternative?: string;
  syllables: {
    text: string;
    status: 'perfect' | 'acceptable' | 'missed';
  }[];
  encouragement: string;
}
