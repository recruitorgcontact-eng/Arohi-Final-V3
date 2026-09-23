export interface SpeaksLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  sampleGreeting: string;
}

export const MOTHER_TONGUES: SpeaksLanguage[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', sampleGreeting: 'नमस्ते! बिना किसी डर के अंग्रेजी बोलना शुरू करें।' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', sampleGreeting: 'ନମସ୍କାର! ବିନା କୌଣସି ଡରରେ ଇଂରାଜୀ କହିବା ଅଭ୍ୟାସ କରନ୍ତୁ।' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', sampleGreeting: 'নমস্কার! কোনো দ্বিধা ছাড়াই ইংরেজি বলা শিখুন।' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', sampleGreeting: 'నమస్కారం! ఎటువంటి భయం లేకుండా ఇంగ్లీష్ మాట్లాడండి.' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', sampleGreeting: 'வணக்கம்! எந்த தயக்கமும் இல்லாமல் ஆங்கிலம் பேசுங்கள்.' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', sampleGreeting: 'नमस्कार! कसल्याही भीतीशिवाय इंग्रजी बोलायला शिका.' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', sampleGreeting: 'નમસ્તે! કોઈ પણ સંકોચ વગર અંગ્રેજી બોલતા શીખો.' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', sampleGreeting: 'ನಮಸ್ಕಾರ! ಯಾವುದೇ ಭಯವಿಲ್ಲದೆ ಇಂಗ್ಲಿಷ್ ಮಾತನಾಡಿ.' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', sampleGreeting: 'നമസ്കാരം! ഭയമില്ലാതെ ഇംഗ്ലീഷ് സംസാരിക്കാൻ പഠിക്കൂ.' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', sampleGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਬਿਨਾਂ ਕਿਸੇ ਡਰ ਦੇ ਅੰਗਰੇਜ਼ੀ ਬੋਲਣੀ ਸ਼ੁਰੂ ਕਰੋ।' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🌐', sampleGreeting: 'Welcome! Master confident spoken English with empathy.' }
];

export interface StickingPointOption {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export const STICKING_POINTS: StickingPointOption[] = [
  {
    id: 'grammar_rules',
    icon: '🧩',
    title: 'Grammar Rules Confusion',
    subtitle: 'Confused between is/am/are, has/have, past and present tenses.'
  },
  {
    id: 'hesitation_shyness',
    icon: '🫣',
    title: 'Hesitation & Shyness',
    subtitle: 'I know the words in my head, but I freeze in front of people.'
  },
  {
    id: 'word_translation',
    icon: '🔄',
    title: 'Translating Word-by-Word',
    subtitle: 'I first think in my mother tongue and translate, which slows me down.'
  },
  {
    id: 'vocabulary_shortage',
    icon: '📚',
    title: 'Shortage of Right Words',
    subtitle: 'Struggling to find the right word at the exact moment of speaking.'
  },
  {
    id: 'fear_mistakes',
    icon: '🛡️',
    title: 'Fear of Being Judged',
    subtitle: 'Scared someone will laugh at my pronunciation or mistakes.'
  }
];

export interface GoalOption {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export const SPEAKING_GOALS: GoalOption[] = [
  {
    id: 'job_interview',
    icon: '💼',
    title: 'Job Interview & Career Promotion',
    subtitle: 'Crack HR & Technical rounds, client calls, and workplace discussions.'
  },
  {
    id: 'social_confidence',
    icon: '✨',
    title: 'Social Confidence & Daily Life',
    subtitle: 'Speak effortlessly at parties, cafes, banks, and with friends.'
  },
  {
    id: 'college_exams',
    icon: '🎓',
    title: 'College & Academic Presentations',
    subtitle: 'Group discussions, seminar presentations, and campus placements.'
  },
  {
    id: 'travel_global',
    icon: '✈️',
    title: 'Travel & International Clients',
    subtitle: 'Navigate airports, hotels, and connect with global colleagues.'
  },
  {
    id: 'parenting_family',
    icon: '👨‍👩‍👧',
    title: 'Parenting & Helping Children',
    subtitle: 'Interact with school teachers with confidence and guide kids at home.'
  }
];

export interface ProficiencyLevel {
  id: 'beginner' | 'hesitant' | 'intermediate' | 'advanced';
  title: string;
  subtitle: string;
  badge: string;
  initialScore: number;
}

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
  {
    id: 'beginner',
    title: 'Absolute Beginner',
    subtitle: 'I know basic alphabets & words, but struggle to build a full sentence.',
    badge: 'Level 1: Novice',
    initialScore: 28
  },
  {
    id: 'hesitant',
    title: 'Hesitant Speaker',
    subtitle: 'I can read English well, but I fumble and hesitate when speaking.',
    badge: 'Level 2: Explorer',
    initialScore: 42
  },
  {
    id: 'intermediate',
    title: 'Conversational Speaker',
    subtitle: 'I can speak simple sentences, but need more fluency, grammar & polish.',
    badge: 'Level 3: Communicator',
    initialScore: 58
  },
  {
    id: 'advanced',
    title: 'Fluency Seeker',
    subtitle: 'I speak comfortably, but want professional confidence & native rhythm.',
    badge: 'Level 4: Achiever',
    initialScore: 74
  }
];

export interface DailyCommitment {
  minutes: number;
  label: string;
  description: string;
  badge: string;
}

export const DAILY_COMMITMENTS: DailyCommitment[] = [
  { minutes: 5, label: '5 Minutes / Day', description: 'Quick bite-sized daily speaking check-in', badge: 'Casual' },
  { minutes: 10, label: '10 Minutes / Day', description: 'Standard recommended pace for steady progress', badge: 'Recommended' },
  { minutes: 15, label: '15 Minutes / Day', description: 'Accelerated speaking habit for quick fluency', badge: 'Intensive' },
  { minutes: 20, label: '20 Minutes / Day', description: 'Full immersion with multi-scenario roleplays', badge: 'Pro Champion' }
];

export interface RoadmapLesson {
  id: string;
  day: number;
  week: number;
  title: string;
  description: string;
  scenario: string;
  estimatedMinutes: number;
  category: 'basics' | 'daily' | 'professional' | 'fluency';
  icon: string;
  arohiPrompt: string;
  arohiPromptTranslation: Record<string, string>;
  expectedAnswerHint: string;
  sampleGoodAnswer: string;
  commonMistake: {
    wrong: string;
    right: string;
    explanation: Record<string, string>;
  };
  dialogueSteps: {
    speaker: 'arohi' | 'user';
    text: string;
    translation?: Record<string, string>;
    hint?: string;
  }[];
}

export const ROADMAP_LESSONS: RoadmapLesson[] = [
  // WEEK 1
  {
    id: 'day-1',
    day: 1,
    week: 1,
    title: 'Warm Greetings Without Fear',
    description: 'Learn how to greet someone warmly in English and reply with genuine smile and confidence.',
    scenario: 'Meeting someone new at an event or morning walk',
    estimatedMinutes: 4,
    category: 'basics',
    icon: '👋',
    arohiPrompt: 'Good morning! It is wonderful to meet you today. How is your day going so far?',
    arohiPromptTranslation: {
      hi: 'शुभ प्रभात! आज आपसे मिलकर बहुत खुशी हुई। आपका दिन अब तक कैसा चल रहा है?',
      or: 'ଶୁଭ ସକାଳ! ଆଜି ଆପଣଙ୍କୁ ଭେଟି ବହୁତ ଖୁସି ଲାଗିଲା। ଆପଣଙ୍କ ଦିନ କିପରି ଚାଲିଛି?',
      bn: 'সুপ্রভাত! আজ আপনার সাথে দেখা হয়ে খুব ভালো লাগলো। আপনার দিন কেমন কাটছে?'
    },
    expectedAnswerHint: 'Say good morning, express your mood (e.g., "Good morning! My day is going well, thank you.").',
    sampleGoodAnswer: 'Good morning Arohi! My day is going very well, thank you. How are you doing today?',
    commonMistake: {
      wrong: 'I am good. You?',
      right: 'I am doing great, thank you! How about you?',
      explanation: {
        hi: 'सिर्फ "I am good. You?" बोलने की जगह "I am doing great, thank you! How about you?" बोलना ज़्यादा विनम्र और प्राकृतिक लगता है।',
        or: 'କେବଳ "I am good. You?" କହିବା ବଦଳରେ "I am doing great, thank you! How about you?" କହିଲେ ବେଶୀ ଭଦ୍ର ଓ ସ୍ୱାଭାବିକ ଲାଗେ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Good morning! It is wonderful to meet you today. How is your day going so far?',
        translation: {
          hi: 'शुभ प्रभात! आज आपसे मिलकर बहुत खुशी हुई। आपका दिन अब तक कैसा चल रहा है?',
          or: 'ଶୁଭ ସକାଳ! ଆଜି ଆପଣଙ୍କୁ ଭେଟି ବହୁତ ଖୁସି ଲାଗିଲା। ଆପଣଙ୍କ ଦିନ କିପରି ଚାଲିଛି?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Say: "Good morning! My day is going well, thank you. How about you?"'
      }
    ]
  },
  {
    id: 'day-2',
    day: 2,
    week: 1,
    title: 'Introducing Yourself Confidently',
    description: 'Tell your name, where you are from, and what you love doing in 2 simple sentences.',
    scenario: 'First day at a new club, college or workshop',
    estimatedMinutes: 5,
    category: 'basics',
    icon: '🌟',
    arohiPrompt: 'Could you please introduce yourself? Where are you from and what do you do?',
    arohiPromptTranslation: {
      hi: 'क्या आप अपना परिचय दे सकते हैं? आप कहाँ से हैं और आप क्या करते हैं?',
      or: 'ଆପଣ ନିଜର ପରିଚୟ ଦେଇପାରିବେ କି? ଆପଣ କେଉଁଠାରୁ ଆସିଛନ୍ତି ଏବଂ ଆପଣ କ’ଣ କରୁଛନ୍ତି?'
    },
    expectedAnswerHint: 'My name is [Name], I am from [City], and I am working as [Role] / studying [Subject].',
    sampleGoodAnswer: 'Hello! My name is Rahul. I am from Bhubaneswar, Odisha, and I am currently preparing for government exams.',
    commonMistake: {
      wrong: 'Myself Rahul and I come from Bhubaneswar.',
      right: 'My name is Rahul and I am from Bhubaneswar.',
      explanation: {
        hi: '"Myself Rahul" बोलना ग्रामर के अनुसार गलत होता है। हमेशा "My name is Rahul" या "I am Rahul" बोलें।',
        or: '"Myself Rahul" କହିବା ଭୁଲ। ସର୍ବଦା "My name is Rahul" କିମ୍ବା "I am Rahul" କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Could you please introduce yourself? Tell me your name, where you are from, and what you enjoy doing.',
        translation: {
          hi: 'कृपया अपना परिचय दें। आपका नाम क्या है, आप कहाँ से हैं, और आपको क्या करना पसंद है?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Use "My name is..." instead of "Myself..."'
      }
    ]
  },
  {
    id: 'day-3',
    day: 3,
    week: 1,
    title: 'Ordering Food at a Café',
    description: 'Order your favorite drink or snack politely using "Could I have..." or "I would like...".',
    scenario: 'Coffee Shop Counter with a friendly Barista',
    estimatedMinutes: 4,
    category: 'daily',
    icon: '☕',
    arohiPrompt: 'Welcome to Arohi Café! What can I get started for you today?',
    arohiPromptTranslation: {
      hi: 'आरोही कैफे में आपका स्वागत है! आज आपके लिए क्या लाऊं?',
      or: 'ଆରୋହୀ କାଫେକୁ ସ୍ୱାଗତ! ଆଜି ମୁଁ ଆପଣଙ୍କ ପାଇଁ କ’ଣ ଆଣିପାରିବି?'
    },
    expectedAnswerHint: 'I would like a hot cappuccino with less sugar, please.',
    sampleGoodAnswer: 'Hi! Could I please have a hot cappuccino with oat milk and less sugar?',
    commonMistake: {
      wrong: 'Give me one coffee fast.',
      right: 'Could I please have a cup of coffee?',
      explanation: {
        hi: 'इंग्लिश में "Give me..." बोलना रूखा (impolite) लगता है। हमेशा "Could I please have..." या "I would like..." का उपयोग करें।',
        or: '"Give me..." କହିବା ଟିକେ ରୁକ୍ଷ ଲାଗେ। ସର୍ବଦା "Could I please have..." ବା "I would like..." ବ୍ୟବହାର କରନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Welcome to Arohi Café! What can I get started for you today?',
        translation: {
          hi: 'आरोही कैफे में स्वागत है! आप क्या लेना पसंद करेंगे?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Say: "I would like a hot coffee, please."'
      }
    ]
  },
  {
    id: 'day-4',
    day: 4,
    week: 1,
    title: 'Asking for Directions & Places',
    description: 'Politely ask a stranger or security guard how to reach a metro station or building.',
    scenario: 'Standing in a busy city market looking for the Metro station',
    estimatedMinutes: 4,
    category: 'daily',
    icon: '🗺️',
    arohiPrompt: 'Excuse me! You look like you are searching for something. Can I help you with directions?',
    arohiPromptTranslation: {
      hi: 'माफ़ कीजिए! ऐसा लग रहा है कि आप कुछ ढूँढ रहे हैं। क्या मैं आपको रास्ता बता सकती हूँ?',
      or: 'କ୍ଷମା କରିବେ! ଲାଗୁଛି ଆପଣ କିଛି ଖୋଜୁଛନ୍ତି। ମୁଁ ଆପଣଙ୍କୁ ରାସ୍ତା ଦେଖାଇବାରେ ସାହାଯ୍ୟ କରିବି କି?'
    },
    expectedAnswerHint: 'Excuse me, could you please tell me the way to the nearest metro station?',
    sampleGoodAnswer: 'Excuse me, yes please! Could you guide me to the nearest metro station from here?',
    commonMistake: {
      wrong: 'Where is metro? Tell me.',
      right: 'Excuse me, could you please tell me where the metro station is?',
      explanation: {
        hi: 'सीधे "Where is metro?" पूछने के बजाय "Excuse me, could you please tell me where the metro station is?" कहना बहुत बेहतर होता है।',
        or: 'ସିଧାସଳଖ "Where is metro?" ପଚାରିବା ବଦଳରେ "Excuse me, could you please tell me where the metro station is?" କହିବା ବହୁତ ଭଲ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Excuse me! You look like you are searching for something. Can I help you with directions?',
        translation: {
          hi: 'माफ़ कीजिए! क्या मैं आपको रास्ता बताने में मदद करूँ?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Start with "Excuse me, could you please tell me..."'
      }
    ]
  },
  {
    id: 'day-5',
    day: 5,
    week: 1,
    title: 'Expressing Feelings & Emotions',
    description: 'Describe how you feel today (excited, tired, hopeful, energetic) and why.',
    scenario: 'Casual evening catch-up with an old friend',
    estimatedMinutes: 5,
    category: 'basics',
    icon: '❤️',
    arohiPrompt: 'You have worked so hard this week! How are you feeling right now?',
    arohiPromptTranslation: {
      hi: 'आपने इस हफ्ते बहुत मेहनत की है! अभी आप कैसा महसूस कर रहे हैं?',
      or: 'ଆପଣ ଏହି ସପ୍ତାହରେ ବହୁତ ପରିଶ୍ରମ କରିଛନ୍ତି! ବର୍ତ୍ତମାନ ଆପଣ କିପରି ଅନୁଭବ କରୁଛନ୍ତି?'
    },
    expectedAnswerHint: 'I am feeling very tired but satisfied because I learned something new.',
    sampleGoodAnswer: 'I am feeling quite energetic and happy because I practiced my English today!',
    commonMistake: {
      wrong: 'I am feeling happy today because today is nice.',
      right: 'I feel very happy today because I completed all my tasks.',
      explanation: {
        hi: '"I feel happy" या "I am feeling happy" दोनों सही हैं, लेकिन वजह बताते समय specific कारण जोड़ें जैसे "because I practiced today".',
        or: '"I feel happy" କହିବା ସହିତ କାରଣ ଯୋଡ଼ିଲେ ବାକ୍ୟ ଆହୁରି ସୁନ୍ଦର ହୁଏ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'You have worked so hard this week! How are you feeling right now?',
        translation: {
          hi: 'आपने इस हफ्ते बहुत मेहनत की है! आप कैसा महसूस कर रहे हैं?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Express: "I feel proud because I am learning step by step."'
      }
    ]
  },
  {
    id: 'day-6',
    day: 6,
    week: 1,
    title: 'Tongue Twisters & Pronunciation Fun',
    description: 'Train your mouth muscles for English vowels and clarity with fun tongue twisters.',
    scenario: 'Vocal warm-up studio with Arohi',
    estimatedMinutes: 4,
    category: 'fluency',
    icon: '👅',
    arohiPrompt: 'Let us loosen your mouth muscles! Try saying: "She sells seashells on the seashore." Ready?',
    arohiPromptTranslation: {
      hi: 'चलिए अपनी जुबान के मसल्स को थोड़ा एक्टिव करते हैं! बोलकर देखिए: "She sells seashells on the seashore."',
      or: 'ଚାଲନ୍ତୁ ଉଚ୍ଚାରଣ ସଫା କରିବା! ଏହା କହିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ: "She sells seashells on the seashore."'
    },
    expectedAnswerHint: 'She sells seashells on the seashore.',
    sampleGoodAnswer: 'She sells seashells on the seashore.',
    commonMistake: {
      wrong: 'See sells seacells on the seashore.',
      right: 'She sells seashells on the seashore.',
      explanation: {
        hi: '"Sh" और "S" के अंतर पर ध्यान दें! "She" में जीभ पीछे जाती है, "Sells" में आगे रहती है।',
        or: '"Sh" ଏବଂ "S" ର ଉଚ୍ଚାରଣ ଭିନ୍ନ। ଶବ୍ଦ ଉପରେ ଧ୍ୟାନ ଦିଅନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Repeat after me: "She sells seashells on the seashore." Take your time, speed does not matter, clarity does!',
        translation: {
          hi: 'मेरे बाद बोलिए: "She sells seashells on the seashore." जल्दबाज़ी नहीं, साफ़ उच्चारण ज़रूरी है।'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Pronounce the "Sh" sound clearly.'
      }
    ]
  },
  {
    id: 'day-7',
    day: 7,
    week: 1,
    title: 'Week 1 Fluency Milestone Challenge',
    description: 'Combine greeting, introducing yourself, and sharing your goal in one fluent 45-second talk.',
    scenario: 'Week 1 Review & Star Badge Celebration',
    estimatedMinutes: 6,
    category: 'fluency',
    icon: '🏆',
    arohiPrompt: 'Congratulations on reaching Day 7! Tell me about yourself, what you do, and why you are learning English.',
    arohiPromptTranslation: {
      hi: '7वें दिन पहुँचने पर बहुत-बहुत बधाई! अपने बारे में बताएं, आप क्या करते हैं और आप अंग्रेज़ी क्यों सीख रहे हैं।',
      or: '୭ମ ଦିନରେ ପହଞ୍ଚିବା ପାଇଁ ଅଭିନନ୍ଦନ! ନିଜ ବିଷୟରେ କୁହନ୍ତୁ, ଆପଣ କ’ଣ କରନ୍ତି ଏବଂ ଆପଣ ଇଂରାଜୀ କାହିଁକି ଶିଖୁଛନ୍ତି।'
    },
    expectedAnswerHint: 'Combine 3 sentences: Hello! My name is... I am from... I want to speak English fluently because...',
    sampleGoodAnswer: 'Hello Arohi! My name is Amit. I am from Cuttack, and I want to speak English fluently to grow in my career.',
    commonMistake: {
      wrong: 'I am want to speak English for get job.',
      right: 'I want to speak English fluently to get a good job.',
      explanation: {
        hi: '"I am want" गलत है। सिर्फ "I want to speak" बोलें। और "for get job" के बजाय "to get a good job" बोलें।',
        or: '"I am want" ଭୁଲ। କେବଳ "I want" କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Congratulations on reaching Day 7! Speak 2 or 3 sentences about yourself and your dream goal.',
        translation: {
          hi: '7वें दिन पहुँचने की बधाई! अपने और अपने लक्ष्य के बारे में 2-3 वाक्य बोलिए।'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Say your name, city, and why you want to master English.'
      }
    ]
  },

  // WEEK 2
  {
    id: 'day-8',
    day: 8,
    week: 2,
    title: 'Talking About Family & Loved Ones',
    description: 'Describe your family members and what they do with love and correct plurals.',
    scenario: 'Friendly chat with a roommate or colleague',
    estimatedMinutes: 5,
    category: 'daily',
    icon: '👨‍👩‍👦',
    arohiPrompt: 'Family is so special! Could you tell me a little bit about who is in your family?',
    arohiPromptTranslation: {
      hi: 'परिवार बहुत ख़ास होता है! क्या आप मुझे अपने परिवार के सदस्यों के बारे में बता सकते हैं?',
      or: 'ପରିବାର ବହୁତ ଖାସ୍। ଆପଣଙ୍କ ପରିବାରରେ କିଏ କିଏ ଅଛନ୍ତି ମୋତେ କହିବେ କି?'
    },
    expectedAnswerHint: 'There are four members in my family: my father, mother, younger sister, and me.',
    sampleGoodAnswer: 'There are four members in my family. My father is a teacher, my mother is a homemaker, and I have a younger brother.',
    commonMistake: {
      wrong: 'In my family there is 4 peoples.',
      right: 'There are four members in my family.',
      explanation: {
        hi: '"peoples" नहीं होता, "people" खुद बहुवचन है। या बेहतर है कि कहें: "There are four members in my family."',
        or: '"peoples" ଭୁଲ, "people" ନିଜେ ବହୁବଚନ। "four members" କହିବା ସବୁଠୁ ଭଲ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Family is so special! Could you tell me a little bit about who is in your family?',
        translation: {
          hi: 'परिवार बहुत ख़ास होता है! आपके परिवार में कौन-कौन हैं?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Use: "There are [number] members in my family..."'
      }
    ]
  },
  {
    id: 'day-9',
    day: 9,
    week: 2,
    title: 'Shopping, Prices & Polite Bargaining',
    description: 'Ask for prices, sizes, and polite discounts at a clothing or electronics store.',
    scenario: 'Retail shopping mall or boutique store',
    estimatedMinutes: 5,
    category: 'daily',
    icon: '🛍️',
    arohiPrompt: 'Hello! Welcome to our store. Are you looking for anything specific today?',
    arohiPromptTranslation: {
      hi: 'नमस्ते! हमारे स्टोर में स्वागत है। क्या आप आज कुछ ख़ास देख रहे हैं?',
      or: 'ନମସ୍କାର! ଆମ ଦୋକାନକୁ ସ୍ୱାଗତ। ଆଜି ଆପଣ କିଛି ନିର୍ଦ୍ଦିଷ୍ଟ ଜିନିଷ ଖୋଜୁଛନ୍ତି କି?'
    },
    expectedAnswerHint: 'Yes, I am looking for a blue shirt. How much does this one cost?',
    sampleGoodAnswer: 'Yes, I am looking for a cotton shirt. Could you show me what sizes you have in blue, and how much is it?',
    commonMistake: {
      wrong: 'How much price of this?',
      right: 'How much does this cost? / What is the price of this?',
      explanation: {
        hi: '"How much price" के बजाय "How much does this cost?" या "What is the price of this?" बोलना सही है।',
        or: '"How much price" ଭୁଲ। "How much does this cost?" କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Hello! Welcome to our store. Are you looking for anything specific today?',
        translation: {
          hi: 'नमस्ते! क्या आप आज कुछ ख़ास देख रहे हैं?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Ask: "How much does this cost, and do you have a discount?"'
      }
    ]
  },
  {
    id: 'day-10',
    day: 10,
    week: 2,
    title: 'Describing Yesterday (Past Tense Mastery)',
    description: 'Master the past tense by recounting 2 things you did yesterday using correct verbs.',
    scenario: 'Morning status update with a coworker or Arohi',
    estimatedMinutes: 5,
    category: 'basics',
    icon: '⏳',
    arohiPrompt: 'What did you do yesterday evening after finishing your work?',
    arohiPromptTranslation: {
      hi: 'कल शाम काम ख़त्म करने के बाद आपने क्या किया था?',
      or: 'କାଲି ସନ୍ଧ୍ୟାରେ କାମ ସାରିବା ପରେ ଆପଣ କ’ଣ କରିଥିଲେ?'
    },
    expectedAnswerHint: 'Yesterday evening, I went for a walk and then I cooked dinner with my family.',
    sampleGoodAnswer: 'Yesterday evening, I went to the park for a walk, and later I read a chapter of a book.',
    commonMistake: {
      wrong: 'Yesterday I did not went anywhere.',
      right: 'Yesterday I did not go anywhere.',
      explanation: {
        hi: 'जब "did" या "did not" आता है, तो उसके बाद हमेशा verb की 1st form (go) आती है, "went" नहीं!',
        or: '"Did" ସହିତ ସର୍ବଦା ମୂଳ verb (go) ଲାଗେ, "went" ନୁହେଁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'What did you do yesterday evening after finishing your work?',
        translation: {
          hi: 'कल शाम आपने क्या किया था?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Use past tense verbs: "I visited...", "I watched...", "I talked to..."'
      }
    ]
  },
  {
    id: 'day-11',
    day: 11,
    week: 2,
    title: 'Making Weekend Plans (Future Tense)',
    description: 'Speak about upcoming plans using "I am planning to...", "I will...", and "I intend to...".',
    scenario: 'Friday afternoon discussion about the upcoming weekend',
    estimatedMinutes: 5,
    category: 'daily',
    icon: '📅',
    arohiPrompt: 'The weekend is finally here! Do you have any plans for this Saturday or Sunday?',
    arohiPromptTranslation: {
      hi: 'वीकेंड आ गया है! क्या इस शनिवार या रविवार को आपकी कोई योजना है?',
      or: 'ସପ୍ତାହାନ୍ତ ଆସିଗଲା! ଏହି ଶନିବାର କିମ୍ବା ରବିବାର ପାଇଁ ଆପଣଙ୍କର କୌଣସି ପ୍ଲାନ ଅଛି କି?'
    },
    expectedAnswerHint: 'This weekend, I am planning to visit my grandparents and watch a new movie.',
    sampleGoodAnswer: 'Yes! On Saturday, I am planning to visit my friends, and on Sunday I will relax at home.',
    commonMistake: {
      wrong: 'I will going to market this Sunday.',
      right: 'I will go to the market this Sunday. / I am going to the market this Sunday.',
      explanation: {
        hi: '"I will going" कभी नहीं होता। या तो "I will go" बोलें, या "I am going to" बोलें।',
        or: '"I will going" ଭୁଲ। "I will go" ବା "I am going" କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'The weekend is finally here! Do you have any plans for this Saturday or Sunday?',
        translation: {
          hi: 'वीकेंड आ गया है! क्या इस शनिवार या रविवार की कोई योजना है?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Use: "I am planning to..." or "I will..."'
      }
    ]
  },
  {
    id: 'day-12',
    day: 12,
    week: 2,
    title: 'Describing Your Daily Routine & Work',
    description: 'Explain your typical day from waking up to sleeping using simple present tense.',
    scenario: 'Explaining your lifestyle to a friend or mentor',
    estimatedMinutes: 5,
    category: 'daily',
    icon: '⏰',
    arohiPrompt: 'Walk me through your typical morning routine! What time do you wake up and how do you start your day?',
    arohiPromptTranslation: {
      hi: 'मुझे अपनी रोज़ाना की सुबह की दिनचर्या बताएं! आप कितने बजे उठते हैं और दिन की शुरुआत कैसे करते हैं?',
      or: 'ଆପଣଙ୍କ ପ୍ରତିଦିନ ସକାଳର ରୁଟିନ୍ ମୋତେ କୁହନ୍ତୁ! ଆପଣ କେତେବେଳେ ଉଠନ୍ତି ଏବଂ ଦିନଟି କିପରି ଆରମ୍ଭ କରନ୍ତି?'
    },
    expectedAnswerHint: 'I usually wake up at 6:30 AM, drink a glass of water, and then go for a jog.',
    sampleGoodAnswer: 'I usually wake up around 6:30 AM, do a quick workout, have my breakfast, and then start my study sessions.',
    commonMistake: {
      wrong: 'Every day I am waking up at 6 AM.',
      right: 'Every day I wake up at 6 AM.',
      explanation: {
        hi: 'रोज़ाना की आदतों के लिए Present Continuous ("am waking up") नहीं, बल्कि Simple Present ("I wake up") इस्तेमाल किया जाता है।',
        or: 'ପ୍ରତିଦିନର ଅଭ୍ୟାସ ପାଇଁ "I wake up" କୁହାଯାଏ, "am waking up" ନୁହେଁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Walk me through your typical morning routine! What time do you wake up and how do you start your day?',
        translation: {
          hi: 'अपनी सुबह की दिनचर्या बताइए! आप कितने बजे उठते हैं?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Say: "I usually wake up at [time] and then I..."'
      }
    ]
  },
  {
    id: 'day-13',
    day: 13,
    week: 2,
    title: 'Making Polite Requests & Saying No Gracefully',
    description: 'Learn the power of "Would you mind...", "Could you possibly...", and declining politely.',
    scenario: 'Office or group project collaboration',
    estimatedMinutes: 5,
    category: 'professional',
    icon: '🤝',
    arohiPrompt: 'Imagine a colleague asks you to work overtime on a day you have a family function. How would you decline politely?',
    arohiPromptTranslation: {
      hi: 'सोचिए किसी साथी ने आपको ओवरटाइम करने को कहा, पर आपका पारिवारिक कार्यक्रम है। आप विनम्रता से कैसे मना करेंगे?',
      or: 'ଭାବନ୍ତୁ କେହି ଜଣେ ଆପଣଙ୍କୁ ଅଧିକ ସମୟ କାମ କରିବାକୁ କହିଲେ କିନ୍ତୁ ଆପଣଙ୍କ ଘରେ କାମ ଅଛି। ଆପଣ ନମ୍ରତାର ସହ କିପରି ମନା କରିବେ?'
    },
    expectedAnswerHint: 'I would love to help, but unfortunately I have an important family commitment today.',
    sampleGoodAnswer: 'I would really love to help, but unfortunately I have a prior family commitment tonight. Could I complete this first thing tomorrow morning?',
    commonMistake: {
      wrong: 'I can not do. I have family work.',
      right: 'I would love to help, but I have a prior family commitment today.',
      explanation: {
        hi: '"I cannot do" सीधा और रूखा लगता है। "I would love to help, but unfortunately I have a commitment" कहना पेशेवर और सम्मानजनक होता है।',
        or: '"I cannot do" ଖୋଲାଖୋଲି ରୁକ୍ଷ ଶୁଭେ। ନମ୍ର ଭାଷାରେ ମନା କରିବା ଶିଖନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'A colleague asks you to help with overtime. How would you decline politely while offering an alternative?',
        translation: {
          hi: 'विनम्रता से मना करते हुए दूसरा विकल्प कैसे देंगे?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Use: "I would love to help, but unfortunately..."'
      }
    ]
  },
  {
    id: 'day-14',
    day: 14,
    week: 2,
    title: 'Week 2 Fluency Milestone Challenge',
    description: 'Explain a problem you faced recently and how you resolved it in 3 connected sentences.',
    scenario: 'Midway Fluency Milestone Review',
    estimatedMinutes: 6,
    category: 'fluency',
    icon: '🏅',
    arohiPrompt: 'You are half-way through the 4-week roadmap! Tell me about a small challenge you faced recently and how you solved it.',
    arohiPromptTranslation: {
      hi: 'आप 4 हफ़्ते के रोडमैप के आधे पड़ाव पर पहुँच गए हैं! किसी छोटी चुनौती के बारे में बताएं जिसे आपने हाल ही में हल किया हो।',
      or: 'ଆପଣ ଅଧା ବାଟ ପାର କରିସାରିଛନ୍ତି! ନିକଟରେ ସାମ୍ନା କରିଥିବା ଏକ ଛୋଟ ସମସ୍ୟା ଓ ତାର ସମାଧାନ କୁହନ୍ତୁ।'
    },
    expectedAnswerHint: 'Recently I had trouble waking up early, so I started keeping my alarm across the room, which helped a lot.',
    sampleGoodAnswer: 'Recently I struggled with managing my study schedule. To solve this, I created a daily checklist every morning, and it helped me stay focused.',
    commonMistake: {
      wrong: 'I am agree with your point.',
      right: 'I agree with your point.',
      explanation: {
        hi: '"Agree" खुद एक verb है, इसलिए इसके साथ "am" लगाने की ज़रूरत नहीं होती। "I agree" बोलना ही सही है।',
        or: '"Agree" ଏକ verb, ତେଣୁ "am agree" ଭୁଲ। "I agree" କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Tell me about a small challenge you overcame recently. Take a deep breath and speak in 2-3 sentences.',
        translation: {
          hi: 'हाल ही में आपने किसी छोटी मुश्किल को कैसे सुलझाया? 2-3 वाक्यों में बताइए।'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Describe the situation, your action, and the result.'
      }
    ]
  },

  // WEEK 3
  {
    id: 'day-15',
    day: 15,
    week: 3,
    title: 'Interview: "Tell Me About Yourself"',
    description: 'Master the #1 most asked interview question using the Present-Past-Future formula.',
    scenario: 'Job Interview Chamber with Senior Hiring Manager',
    estimatedMinutes: 6,
    category: 'professional',
    icon: '💼',
    arohiPrompt: 'Welcome to this interview! To kick things off, could you please walk me through your background and tell me about yourself?',
    arohiPromptTranslation: {
      hi: 'इंटरव्यू में स्वागत है! शुरुआत में, क्या आप मुझे अपनी पृष्ठभूमि और अपने बारे में बता सकते हैं?',
      or: 'ଇଣ୍ଟରଭ୍ୟୁକୁ ସ୍ୱାଗତ! ଆରମ୍ଭରେ, ଆପଣ ନିଜ ବିଷୟରେ ଏବଂ ଆପଣଙ୍କ ବ୍ୟାକଗ୍ରାଉଣ୍ଡ ବିଷୟରେ କିଛି କହିପାରିବେ କି?'
    },
    expectedAnswerHint: 'Structure: Present role/studies -> Past key achievement -> Why you are excited for this opportunity.',
    sampleGoodAnswer: 'Thank you for this opportunity. I am currently a graduate in Commerce with a strong focus on data analysis. Over the past year, I led several student projects and developed strong communication skills. I am excited about this role because it aligns with my goal of building a career in modern operations.',
    commonMistake: {
      wrong: 'Myself Ramesh, born and brought up in Puri, father is doing business...',
      right: 'Thank you for having me. My name is Ramesh and I am a software engineer...',
      explanation: {
        hi: 'इंटरव्यू में "Myself" से शुरू न करें और पारिवारिक इतिहास के बजाय अपनी पढ़ाई, स्किल्स और उपलब्धियों पर ध्यान केंद्रित करें।',
        or: 'ଇଣ୍ଟରଭ୍ୟୁରେ ପାରିବାରିକ ବିବରଣୀ ଦେବା ବଦଳରେ ନିଜର ଦକ୍ଷତା ଓ ଶିକ୍ଷା ଉପରେ କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Welcome to this interview! Could you please introduce yourself and highlight what you are passionate about?',
        translation: {
          hi: 'इंटरव्यू में स्वागत है! कृपया अपने बारे में बताएं और अपनी खूबियों पर प्रकाश डालें।'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Start with: "Thank you for this opportunity. My name is..."'
      }
    ]
  },
  {
    id: 'day-16',
    day: 16,
    week: 3,
    title: 'Explaining Your Strengths with Examples',
    description: 'Learn how to highlight your greatest strength with a real-life proof instead of empty words.',
    scenario: 'Job interview follow-up on key strengths',
    estimatedMinutes: 5,
    category: 'professional',
    icon: '💪',
    arohiPrompt: 'That is great. What would you say is your greatest professional strength?',
    arohiPromptTranslation: {
      hi: 'बहुत बढ़िया। आपकी सबसे बड़ी ताकत क्या है?',
      or: 'ବହୁତ ଭଲ। ଆପଣଙ୍କର ସବୁଠୁ ବଡ଼ ଶକ୍ତି କ’ଣ?'
    },
    expectedAnswerHint: 'My greatest strength is my problem-solving ability. For example, when my team faced a deadline...',
    sampleGoodAnswer: 'My greatest strength is adaptability. For example, during college exams, our syllabus changed suddenly, and I quickly organized group study notes to help our entire class score high marks.',
    commonMistake: {
      wrong: 'I am hard working person and good in all things.',
      right: 'My greatest strength is adaptability, which helps me learn new tools quickly.',
      explanation: {
        hi: 'सिर्फ "I am hard working" बोलना सामान्य है। एक ख़ास खूबी बताएं और उसके साथ छोटा उदाहरण जोड़ें।',
        or: 'ନିର୍ଦ୍ଦିଷ୍ଟ ଗୋଟିଏ ଶକ୍ତି କହି ଉଦାହରଣ ଦିଅନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'What is your greatest strength, and can you share a quick example of when you used it?',
        translation: {
          hi: 'आपकी सबसे बड़ी ताकत क्या है, और क्या आप उसका कोई उदाहरण दे सकते हैं?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Use: "My greatest strength is [strength]. For example, when..."'
      }
    ]
  },
  {
    id: 'day-17',
    day: 17,
    week: 3,
    title: 'Handling Difficult & Tricky Questions',
    description: 'Answer questions like "What is your weakness?" without self-sabotage.',
    scenario: 'Overcoming the hardest interview question',
    estimatedMinutes: 5,
    category: 'professional',
    icon: '🎯',
    arohiPrompt: 'Every person has areas they are improving. What is one area or weakness you are actively working on?',
    arohiPromptTranslation: {
      hi: 'हर इंसान में कोई न कोई कमी होती है। ऐसी कौन सी कमज़ोरी है जिसे आप सुधारने की कोशिश कर रहे हैं?',
      or: 'ପ୍ରତ୍ୟେକ ବ୍ୟକ୍ତିଙ୍କ କିଛି ଦୁର୍ବଳତା ଥାଏ। ଆପଣ କେଉଁ ଦିଗରେ ନିଜକୁ ସୁଧାରିବାକୁ ଚେଷ୍ଟା କରୁଛନ୍ତି?'
    },
    expectedAnswerHint: 'Mention a real technical or habit weakness, followed immediately by what you are doing to improve it.',
    sampleGoodAnswer: 'Earlier, I used to hesitate when speaking in public. To improve this, I started participating in group discussions and practicing daily speaking with Arohi AI, and my confidence has improved significantly.',
    commonMistake: {
      wrong: 'I have no weakness. I am perfect.',
      right: 'In the past I used to take too much time on details, so now I use checklists to stay on schedule.',
      explanation: {
        hi: '"I have no weakness" कहना अहंकारी लग सकता है। कोई ईमानदार बात बोलें और बताएं कि आप उसे कैसे सुधार रहे हैं।',
        or: 'ନିଜର ଏକ ସାଧାରଣ ଦୁର୍ବଳତା କହି ତାହା କିପରି ସୁଧାରୁଛନ୍ତି ତାହା କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'What is one area of improvement you are currently focusing on?',
        translation: {
          hi: 'ऐसी कौन सी चीज़ है जिसे आप अभी सुधारने पर काम कर रहे हैं?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Share a real area and say: "To overcome this, I am..."'
      }
    ]
  },
  {
    id: 'day-18',
    day: 18,
    week: 3,
    title: 'Professional Phone Call Etiquette',
    description: 'Start, navigate, and end a professional phone or Zoom call with poise and clarity.',
    scenario: 'Calling a client or manager for a project update',
    estimatedMinutes: 5,
    category: 'professional',
    icon: '📞',
    arohiPrompt: 'Ring ring! Hello, this is Priya from Marketing. How can I help you today?',
    arohiPromptTranslation: {
      hi: 'ट्रिंग ट्रिंग! हेलो, मैं मार्केटिंग से प्रिया बात कर रही हूँ। मैं आपकी क्या मदद कर सकती हूँ?',
      or: 'ଟ୍ରିଙ୍ଗ ଟ୍ରିଙ୍ଗ! ହେଲୋ, ମୁଁ ମାର୍କେଟିଂରୁ ପ୍ରିୟା। ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?'
    },
    expectedAnswerHint: 'Hello Priya, this is [Name]. I am calling to discuss the quarterly project report.',
    sampleGoodAnswer: 'Hello Priya! This is Rahul calling from the design team. Is this a good time to speak for two minutes regarding the project timeline?',
    commonMistake: {
      wrong: 'Who is this? Tell Priya to talk.',
      right: 'Hello Priya, this is Rahul. Hope you are having a productive day.',
      explanation: {
        hi: 'फोन पर हमेशा पहले अपना नाम बताएं और पूछें "Is this a good time to talk?" यह बहुत सम्मानजनक होता है।',
        or: 'ଫୋନରେ ପ୍ରଥମେ ନିଜର ପରିଚୟ ଦେଇ କଥା ହେବା ଉଚିତ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Ring ring! Hello, this is Priya from the office. How are you doing today?',
        translation: {
          hi: 'ट्रिंग ट्रिंग! हेलो, मैं ऑफिस से प्रिया बोल रही हूँ। आप कैसे हैं?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Say: "Hello Priya, this is [Your Name]. I am calling regarding..."'
      }
    ]
  },
  {
    id: 'day-19',
    day: 19,
    week: 3,
    title: 'Agreeing & Disagreeing Politely',
    description: 'Learn how to disagree without being rude: "I see your point, however..."',
    scenario: 'Group discussion or office strategy meeting',
    estimatedMinutes: 5,
    category: 'professional',
    icon: '⚖️',
    arohiPrompt: 'I believe we should cancel all remote work and bring everyone to the office 6 days a week. What is your perspective?',
    arohiPromptTranslation: {
      hi: 'मुझे लगता है कि वर्क फ्रॉम होम खत्म करके सबको हफ़्ते में 6 दिन ऑफिस बुलाना चाहिए। आपकी क्या राय है?',
      or: 'ମୋ ମତରେ ୱାର୍କ ଫ୍ରମ ହୋମ ବନ୍ଦ କରି ସମସ୍ତଙ୍କୁ ସପ୍ତାହରେ ୬ ଦିନ ଅଫିସ ଆସିବା ଉଚିତ। ଆପଣଙ୍କ ମତ କ’ଣ?'
    },
    expectedAnswerHint: 'I understand your perspective, however, hybrid flexibility often boosts employee productivity and retention.',
    sampleGoodAnswer: 'I understand where you are coming from, however, a hybrid approach might be better because it keeps employees motivated and saves daily commute stress.',
    commonMistake: {
      wrong: 'You are wrong. This idea is very bad.',
      right: 'I see your point, however, another perspective to consider is...',
      explanation: {
        hi: '"You are wrong" बोलने से सामने वाला आहत हो सकता है। हमेशा "I see your point, however..." कहकर अपनी बात रखें।',
        or: '"You are wrong" ନକହି "I see your point, however..." କହିଲେ ବହୁତ ଭଦ୍ର ଲାଗେ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'I think remote work should be stopped entirely. What do you think about this?',
        translation: {
          hi: 'मुझे लगता है रिमोट वर्क पूरी तरह बंद होना चाहिए। आपकी क्या सोच है?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Start with: "I understand your point, however..."'
      }
    ]
  },
  {
    id: 'day-20',
    day: 20,
    week: 3,
    title: 'Giving Opinions in a Group Meeting',
    description: 'Step up and share your idea clearly in front of 5-10 people without freezing.',
    scenario: 'Team brainstorming session on improving customer experience',
    estimatedMinutes: 5,
    category: 'professional',
    icon: '💡',
    arohiPrompt: 'We are opening the floor for suggestions to improve our customer service. Does anyone have an idea to share?',
    arohiPromptTranslation: {
      hi: 'हम कस्टमर सर्विस बेहतर करने के लिए सुझाव ले रहे हैं। क्या किसी के पास कोई अच्छा विचार है?',
      or: 'ଆମେ ଗ୍ରାହକ ସେବା ଉନ୍ନତ କରିବା ପାଇଁ ମତାମତ ନେଉଛୁ। କାହା ପାଖରେ କିଛି ଭଲ ଉପାୟ ଅଛି କି?'
    },
    expectedAnswerHint: 'If I may add a suggestion, I think introducing quick WhatsApp updates would reduce customer waiting time.',
    sampleGoodAnswer: 'If I may chime in, I believe introducing an automated WhatsApp status notification would significantly reduce customer anxiety and phone calls.',
    commonMistake: {
      wrong: 'Listen me! We should do WhatsApp.',
      right: 'If I may suggest, I think we could implement automated WhatsApp notifications.',
      explanation: {
        hi: '"Listen me" गलत इंग्लिश है। हमेशा बोलें: "If I may suggest..." या "I would like to add a point here."',
        or: '"Listen me" ଭୁଲ। "If I may suggest..." ବ୍ୟବହାର କରନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Does anyone have an idea on how we can improve our customer communication?',
        translation: {
          hi: 'क्या किसी के पास हमारे कस्टमर कम्युनिकेशन को बेहतर बनाने का सुझाव है?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Use: "If I may add a quick suggestion..."'
      }
    ]
  },
  {
    id: 'day-21',
    day: 21,
    week: 3,
    title: 'Week 3 Professional Milestone Challenge',
    description: 'Simulate a full 90-second mini-interview: Introduction, Strengths, and Handling a Work Scenario.',
    scenario: 'Week 3 Executive Fluency Review',
    estimatedMinutes: 7,
    category: 'fluency',
    icon: '🎖️',
    arohiPrompt: 'You have conquered Week 3! Now, let us simulate a 1-minute professional interview response. Tell me why you would be an asset to our team.',
    arohiPromptTranslation: {
      hi: 'आपने तीसरा हफ़्ता पार कर लिया है! अब 1 मिनट में बताइए कि आप हमारी टीम के लिए एक मूल्यवान साथी क्यों साबित होंगे।',
      or: 'ଆପଣ ୩ୟ ସପ୍ତାହ ସଫଳତାର ସହ ଶେଷ କଲେ! କୁହନ୍ତୁ ଆପଣ ଆମ ଟିମ ପାଇଁ କାହିଁକି ଜଣେ ଭଲ ସାଥୀ ହେବେ।'
    },
    expectedAnswerHint: 'I would be an asset because I combine strong technical skills with high dedication and a positive attitude toward learning.',
    sampleGoodAnswer: 'I believe I would be a great asset because I am deeply committed to continuous learning, proactive problem-solving, and collaborating seamlessly with my teammates to deliver top-quality results on time.',
    commonMistake: {
      wrong: 'I will do any work you give because I am need money.',
      right: 'I am excited to bring my dedication and proactive mindset to help the team succeed.',
      explanation: {
        hi: 'इंटरव्यू में अपनी मजबूरी बताने के बजाय अपनी योग्यता और टीम के काम में योगदान देने की इच्छा पर ज़ोर दें।',
        or: 'ନିଜର ଆବଶ୍ୟକତା ବଦଳରେ କମ୍ପାନୀକୁ ଆପଣ କ’ଣ ଦେଇପାରିବେ ତାହା କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Why should we hire you, and what makes you unique?',
        translation: {
          hi: 'हम आपको क्यों चुनें, और आपकी क्या विशेषता है?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Highlight your skills, dedication, and eagerness to contribute.'
      }
    ]
  },

  // WEEK 4
  {
    id: 'day-22',
    day: 22,
    week: 4,
    title: 'Storytelling: A Memorable Childhood Day',
    description: 'Practice the art of narrative storytelling with flow, transitions, and natural pauses.',
    scenario: 'Story circle around an evening bonfire',
    estimatedMinutes: 6,
    category: 'fluency',
    icon: '📖',
    arohiPrompt: 'Storytelling connects hearts! Tell me about one of your happiest childhood memories.',
    arohiPromptTranslation: {
      hi: 'कहानियां दिलों को जोड़ती हैं! मुझे अपने बचपन की किसी बहुत प्यारी याद के बारे में बताइए।',
      or: 'ଗଳ୍ପ ହୃଦୟକୁ ଯୋଡ଼ିଥାଏ! ଆପଣଙ୍କ ପିଲାଦିନର ଏକ ସୁନ୍ଦର ସ୍ମୃତି କୁହନ୍ତୁ।'
    },
    expectedAnswerHint: 'When I was ten years old, my grandfather took me to the village fair for the first time...',
    sampleGoodAnswer: 'When I was around ten years old, my grandfather took me to our village fair. I remember riding the giant wheel and eating hot jalebis with him. It is a memory that still brings a warm smile to my face.',
    commonMistake: {
      wrong: 'In my child time, I and my grandfather went to mela.',
      right: 'During my childhood, my grandfather and I visited a village fair.',
      explanation: {
        hi: '"In my child time" गलत है, हमेशा "During my childhood" या "When I was a child" बोलें। और "my grandfather and I" सही क्रम है।',
        or: '"In my child time" ଭୁଲ। "During my childhood" କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Tell me about one of your happiest childhood memories. What happened and why do you remember it?',
        translation: {
          hi: 'बचपन की किसी प्यारी याद के बारे में बताइए। उस दिन क्या हुआ था?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Start with: "When I was young, I remember..."'
      }
    ]
  },
  {
    id: 'day-23',
    day: 23,
    week: 4,
    title: 'Expressing Opinions on News & Technology',
    description: 'Share your thoughtful viewpoint on AI, smartphones, and the future of work.',
    scenario: 'Thought leadership panel or college symposium',
    estimatedMinutes: 5,
    category: 'fluency',
    icon: '🤖',
    arohiPrompt: 'Artificial Intelligence is evolving rapidly across India. In your view, will AI help young people or replace jobs?',
    arohiPromptTranslation: {
      hi: 'आर्टिफिशियल इंटेलिजेंस पूरे भारत में तेजी से बढ़ रहा है। आपकी राय में क्या AI युवाओं की मदद करेगा या नौकरियाँ कम करेगा?',
      or: 'କୃତ୍ରିମ ବୁଦ୍ଧିମତା (AI) ଦ୍ରୁତ ଗତିରେ ବୃଦ୍ଧି ପାଉଛି। ଆପଣଙ୍କ ମତରେ AI ଯୁବପିଢ଼ିଙ୍କୁ ସାହାଯ୍ୟ କରିବ ନା ଚାକିରି ଛଡ଼ାଇନେବ?'
    },
    expectedAnswerHint: 'In my opinion, AI will empower youth who learn how to use it, rather than replacing them.',
    sampleGoodAnswer: 'In my opinion, AI is a powerful multiplier. While it may automate routine tasks, it creates enormous new opportunities for youth who embrace technology to build their own ventures.',
    commonMistake: {
      wrong: 'According to me, AI is very dangerous.',
      right: 'In my opinion, AI brings both challenges and opportunities.',
      explanation: {
        hi: 'अंग्रेज़ी में अपनी राय के लिए "According to me" बोलना थोड़ा अप्राकृतिक लगता है। हमेशा "In my opinion" या "From my perspective" बोलें।',
        or: '"According to me" ବଦଳରେ "In my opinion" କହିବା ଅଧିକ ସଠିକ୍।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'What is your opinion on how Artificial Intelligence will impact jobs and education in India?',
        translation: {
          hi: 'भारत में नौकरियों और शिक्षा पर AI का क्या असर होगा, आपकी क्या राय है?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Start with: "In my opinion, AI will..."'
      }
    ]
  },
  {
    id: 'day-24',
    day: 24,
    week: 4,
    title: 'Spontaneous Speaking: The 60-Second Challenge',
    description: 'Speak spontaneously on an unexpected topic without pausing or translating in your head.',
    scenario: 'Impromptu Jam Session (Just A Minute)',
    estimatedMinutes: 5,
    category: 'fluency',
    icon: '⚡',
    arohiPrompt: 'Here is your spontaneous topic: "If you were granted one superpower, what would it be and why?" Go!',
    arohiPromptTranslation: {
      hi: 'आपका बिना तैयारी का विषय है: "अगर आपको कोई एक सुपरपॉवर मिले, तो वह क्या होगी और क्यों?" बोलिए!',
      or: 'ଆପଣଙ୍କର ତତ୍କାଳ ବିଷୟ: "ଯଦି ଆପଣଙ୍କୁ ଗୋଟିଏ ସୁପରପାୱାର ମିଳେ, ତେବେ ତାହା କ’ଣ ହେବ ଏବଂ କାହିଁକି?" କୁହନ୍ତୁ!'
    },
    expectedAnswerHint: 'If I had one superpower, I would choose the ability to heal people and cure illnesses...',
    sampleGoodAnswer: 'If I were granted one superpower, I would choose the ability to teleport anywhere in the world instantly. It would allow me to travel everywhere, help people in emergencies without delay, and see all the wonders of our planet.',
    commonMistake: {
      wrong: 'If I will get superpower I will fly.',
      right: 'If I had a superpower, I would choose the power to fly.',
      explanation: {
        hi: 'काल्पनिक स्थिति (Hypothetical condition) में "If I had..., I would..." का फॉर्मूला इस्तेमाल होता है, "If I will get" नहीं!',
        or: 'କାଳ୍ପନିକ କଥା ପାଇଁ "If I had..., I would..." ବ୍ୟବହାର ହୁଏ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'If you could have any superpower in the universe, what would you choose and what would you do with it?',
        translation: {
          hi: 'अगर आपको दुनिया की कोई भी सुपरपॉवर मिल जाए, तो आप क्या चुनेंगे और उससे क्या करेंगे?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Use: "If I had the superpower to [power], I would [action]..."'
      }
    ]
  },
  {
    id: 'day-25',
    day: 25,
    week: 4,
    title: 'Mastering Voice Tone, Pace & Pauses',
    description: 'Learn how great speakers pause between thoughts instead of saying "uhmm", "err", or "like".',
    scenario: 'TED-style presentation practice room',
    estimatedMinutes: 5,
    category: 'fluency',
    icon: '🎙️',
    arohiPrompt: 'Notice how I pause when I want to emphasize a key idea? Now practice pausing naturally while speaking about something you believe in.',
    arohiPromptTranslation: {
      hi: 'ध्यान दीजिए कि मैं किसी महत्वपूर्ण बात पर कैसे थोड़ा रुकती हूँ? अब आप भी अपने किसी विश्वास के बारे में बोलते हुए यह अभ्यास कीजिए।',
      or: 'ଲକ୍ଷ୍ୟ କରନ୍ତୁ ମୁଁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ କଥା କହିବା ବେଳେ କିପରି ସାମାନ୍ୟ ରହୁଛି। ଆପଣ ମଧ୍ୟ ଅଭ୍ୟାସ କରନ୍ତୁ।'
    },
    expectedAnswerHint: 'I believe... that consistent daily practice... can transform any person into a confident communicator.',
    sampleGoodAnswer: 'I strongly believe that consistency beats raw talent. When you commit even ten minutes every day, you unlock momentum that carries you through any obstacle.',
    commonMistake: {
      wrong: 'Uhh... like... I think that... umm... practice is good.',
      right: 'I believe that daily practice is the true key to mastery.',
      explanation: {
        hi: 'जब दिमाग में शब्द न आएं, तो "uhh" या "umm" बोलने के बजाय 1 सेकंड के लिए चुप हो जाइए। वह चुप्पी आपको बहुत समझदार और गंभीर दिखाती है।',
        or: '"Uhh", "umm" ନକହି ଗୋଟିଏ ସେକେଣ୍ଡ ନୀରବ ରୁହନ୍ତୁ। ତାହା ଆପଣଙ୍କୁ ବହୁତ ପରିପକ୍ୱ ଦେଖାଇବ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Speak 2 sentences about something you strongly believe in. Remember: replace "uhm" with a confident pause.',
        translation: {
          hi: 'किसी ऐसी बात पर 2 वाक्य बोलिए जिस पर आपको गहरा विश्वास है। "uhm" की जगह शांत ठहराव लें।'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Speak slowly, clearly, with pauses between thoughts.'
      }
    ]
  },
  {
    id: 'day-26',
    day: 26,
    week: 4,
    title: '3-Minute Non-Stop Fluency Marathon',
    description: 'Speak continuously for 3 minutes on your journey from hesitant beginner to confident speaker.',
    scenario: 'Fluency Marathon Stage',
    estimatedMinutes: 6,
    category: 'fluency',
    icon: '🏃',
    arohiPrompt: 'You have come so far! Look back at Day 1. Tell me how your confidence has grown over these 4 weeks.',
    arohiPromptTranslation: {
      hi: 'आप बहुत आगे आ चुके हैं! पहले दिन को याद कीजिए। मुझे बताइए कि इन 4 हफ़्तों में आपका आत्मविश्वास कैसे बढ़ा है।',
      or: 'ଆପଣ ବହୁତ ଆଗକୁ ଆସିଗଲେଣି! ପ୍ରଥମ ଦିନକୁ ମନେ ପକାନ୍ତୁ। ଏହି ୪ ସପ୍ତାହରେ ଆପଣଙ୍କ ଆତ୍ମବିଶ୍ୱାସ କିପରି ବଢ଼ିଛି କୁହନ୍ତୁ।'
    },
    expectedAnswerHint: 'When I started on Day 1, I was afraid of making mistakes. Today, I can express my thoughts freely without fear.',
    sampleGoodAnswer: 'When I first started on Day 1, I used to freeze whenever I tried speaking English. Over the past four weeks, by practicing with Arohi every day without fear of judgement, I have learned to think directly in English and speak with genuine confidence.',
    commonMistake: {
      wrong: 'Now I am speak very well without any tension.',
      right: 'Now I speak much more confidently without any hesitation.',
      explanation: {
        hi: '"I am speak" व्याकरण के अनुसार गलत है। हमेशा "I speak" बोलें।',
        or: '"I am speak" ଭୁଲ। "I speak" କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Look at how much you have grown! Tell me how you feel about speaking English today compared to Day 1.',
        translation: {
          hi: 'देखिए आपने कितनी प्रगति की है! पहले दिन की तुलना में आज आप कैसा महसूस करते हैं?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Share your personal transformation journey with pride!'
      }
    ]
  },
  {
    id: 'day-27',
    day: 27,
    week: 4,
    title: 'Comprehensive Fluency Evaluation Exam',
    description: 'Full simulation test covering general small talk, job interview, and personal storytelling.',
    scenario: 'Arohi AI Master Fluency Evaluation Chamber',
    estimatedMinutes: 7,
    category: 'fluency',
    icon: '📊',
    arohiPrompt: 'Welcome to your Comprehensive Fluency Evaluation! Imagine you are meeting a prospective employer or mentor. Present your vision for the next 2 years.',
    arohiPromptTranslation: {
      hi: 'आपके व्यापक फ्लुएंसी मूल्यांकन में स्वागत है! सोचिए कि आप किसी बड़े नियोक्ता या मेंटर से मिल रहे हैं। अगले 2 सालों के लिए अपना विज़न बताइए।',
      or: 'ଆପଣଙ୍କର ସଂପୂର୍ଣ୍ଣ ଇଂରାଜୀ ମୂଲ୍ୟାଙ୍କନକୁ ସ୍ୱାଗତ! ଆଗାମୀ ୨ ବର୍ଷ ପାଇଁ ଆପଣଙ୍କର ଲକ୍ଷ୍ୟ କ’ଣ କୁହନ୍ତୁ।'
    },
    expectedAnswerHint: 'Over the next two years, my goal is to master my domain, take on leadership responsibilities, and contribute to meaningful projects.',
    sampleGoodAnswer: 'Over the next two years, I envision myself growing into a leadership role within my field. I intend to deepen my domain expertise, mentor upcoming team members, and leverage cutting-edge AI tools to drive impactful real-world results.',
    commonMistake: {
      wrong: 'In future two years I will be doing big job.',
      right: 'Over the next two years, I plan to achieve leadership in my field.',
      explanation: {
        hi: '"In future two years" के बजाय "Over the next two years" या "In the next two years" बोलना सबसे प्राकृतिक और प्रभावशाली है।',
        or: '"Over the next two years" କହିବା ଅଧିକ ପ୍ରଭାବଶାଳୀ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Where do you see yourself in the next two years, and how will your English fluency help you get there?',
        translation: {
          hi: 'अगले दो वर्षों में आप खुद को कहाँ देखते हैं, और आपकी इंग्लिश इसमें कैसे मदद करेगी?'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Articulate your 2-year aspiration clearly and boldly.'
      }
    ]
  },
  {
    id: 'day-28',
    day: 28,
    week: 4,
    title: 'Graduation Day & Master Fluency Certificate',
    description: 'Celebrate your 28-day milestone! Deliver your graduation speech and unlock your verified certificate.',
    scenario: 'Arohi Speaks Grand Convocation Stage',
    estimatedMinutes: 5,
    category: 'fluency',
    icon: '🎓',
    arohiPrompt: 'You have done it! 28 consecutive days of courage, consistency, and spoken English growth. Deliver your final victory speech to the world!',
    arohiPromptTranslation: {
      hi: 'आपने कर दिखाया! 28 दिनों का साहस, निरंतरता और अंग्रेजी में बोलने की प्रगति। दुनिया के सामने अपना अंतिम विजय भाषण दीजिए!',
      or: 'ଆପଣ କରି ଦେଖାଇଲେ! ୨୮ ଦିନର ସାହସ ଓ ନିରନ୍ତର ଅଭ୍ୟାସ। ନିଜର ବିଜୟ ଭାଷଣ ଦିଅନ୍ତୁ!'
    },
    expectedAnswerHint: 'Thank you Arohi! This journey taught me that mistakes are not failures, but stepping stones to fluency.',
    sampleGoodAnswer: 'Thank you Arohi and Arohi AI! This 28-day journey taught me that fluency is not about perfection, but about the courage to express who I am without fear. Today, I stand confident, ready to take on the world!',
    commonMistake: {
      wrong: 'I am very thank you to Arohi.',
      right: 'I am deeply grateful to Arohi and proud of my progress.',
      explanation: {
        hi: '"I am very thank you" नहीं होता। हमेशा "Thank you so much" या "I am deeply grateful" बोलें।',
        or: '"I am deeply grateful" ବା "Thank you so much" କୁହନ୍ତୁ।'
      }
    },
    dialogueSteps: [
      {
        speaker: 'arohi',
        text: 'Congratulations Graduate! Share your graduation thoughts with pride and gratitude.',
        translation: {
          hi: 'बधाई हो ग्रेजुएट! गर्व और कृतज्ञता के साथ अपने अंतिम शब्द कहिए।'
        }
      },
      {
        speaker: 'user',
        text: '',
        hint: 'Say: "Thank you Arohi! Today I speak without fear, ready for every opportunity."'
      }
    ]
  }
];

export interface SpeakingArena {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  color: string;
  scenarioDescription: string;
  arohiFirstMessage: string;
  arohiFirstMessageTranslation: Record<string, string>;
}

export const SPEAKING_ARENAS: SpeakingArena[] = [
  {
    id: 'interview',
    title: 'Job Interview Chamber',
    subtitle: 'Practice with a senior HR Director who asks behavioral, technical, and salary negotiation questions.',
    badge: 'High Impact',
    icon: '💼',
    color: 'from-blue-600 to-indigo-700',
    scenarioDescription: 'Professional job interview for a corporate or government role',
    arohiFirstMessage: 'Hello and welcome to this interview. Please take a seat. To begin, could you walk me through your career background and what makes you interested in this position?',
    arohiFirstMessageTranslation: {
      hi: 'नमस्ते और इंटरव्यू में आपका स्वागत है। कृपया बैठिए। शुरुआत में, क्या आप अपनी कार्य पृष्ठभूमि और इस पद में आपकी रुचि के बारे में बता सकते हैं?',
      or: 'ନମସ୍କାର ଏବଂ ଇଣ୍ଟରଭ୍ୟୁକୁ ସ୍ୱାଗତ। ଦୟାକରି ବସନ୍ତୁ। ଆରମ୍ଭରେ ଆପଣ ନିଜ କ୍ୟାରିଅର ଏବଂ ଏହି ଚାକିରି ପ୍ରତି ଆପଣଙ୍କ ଆଗ୍ରହ ବିଷୟରେ କୁହନ୍ତୁ।'
    }
  },
  {
    id: 'cafe_order',
    title: 'Café & Restaurant',
    subtitle: 'Order coffee, customized bakery treats, ask for the bill, and request dietary adjustments.',
    badge: 'Everyday Life',
    icon: '☕',
    color: 'from-amber-600 to-orange-700',
    scenarioDescription: 'Ordering at a bustling city coffee house',
    arohiFirstMessage: 'Hi there! Welcome to the artisanal bakery. What can I brew or pack fresh for you today?',
    arohiFirstMessageTranslation: {
      hi: 'नमस्ते! बेकरी में आपका स्वागत है। आज मैं आपके लिए क्या ताज़ा तैयार करूँ?',
      or: 'ନମସ୍କାର! ବେକେରୀକୁ ସ୍ୱାଗତ। ଆଜି ମୁଁ ଆପଣଙ୍କ ପାଇଁ କ’ଣ ପ୍ରସ୍ତୁତ କରିବି?'
    }
  },
  {
    id: 'hotel_travel',
    title: 'Airport & Hotel Check-in',
    subtitle: 'Navigate flight gates, luggage inquiries, hotel check-ins, room upgrades, and local sightseeing.',
    badge: 'Traveler',
    icon: '✈️',
    color: 'from-emerald-600 to-teal-700',
    scenarioDescription: 'Front desk reception at a 4-star hotel in a new city',
    arohiFirstMessage: 'Good evening and welcome to the Grand Palace Hotel! Are you checking in with a reservation today?',
    arohiFirstMessageTranslation: {
      hi: 'शुभ संध्या और ग्रैंड पैलेस होटल में स्वागत है! क्या आज आपके पास पहले से कोई बुकिंग है?',
      or: 'ଶୁଭ ସନ୍ଧ୍ୟା ଏବଂ ଗ୍ରାଣ୍ଡ ପ୍ୟାଲେସ ହୋଟେଲକୁ ସ୍ୱାଗତ! ଆଜି ଆପଣଙ୍କର କୌଣସି ବୁକିଂ ଅଛି କି?'
    }
  },
  {
    id: 'office_smalltalk',
    title: 'Office Water Cooler & Colleague Chat',
    subtitle: 'Casual chats about weekend plans, hobbies, coffee breaks, and bonding with teammates.',
    badge: 'Workplace',
    icon: '👥',
    color: 'from-purple-600 to-pink-700',
    scenarioDescription: 'Casual Friday lunch break in a corporate cafeteria',
    arohiFirstMessage: 'Hey! Mind if I join you at this table? How has your week been treating you so far?',
    arohiFirstMessageTranslation: {
      hi: 'अरे! क्या मैं इस टेबल पर आपके साथ बैठ सकती हूँ? आपका यह हफ़्ता कैसा बीत रहा है?',
      or: 'ହେଲୋ! ମୁଁ ଏଠାରେ ବସିପାରିବି କି? ଆପଣଙ୍କ ସପ୍ତାହ କିପରି କଟୁଛି?'
    }
  },
  {
    id: 'free_talk',
    title: 'Open Free-Flow Conversation',
    subtitle: 'Speak freely on any topic under the sun — dreams, passions, books, philosophy, or daily reflections.',
    badge: 'Unlimited',
    icon: '✨',
    color: 'from-fuchsia-600 to-rose-700',
    scenarioDescription: 'Heart-to-heart friendly chat with Arohi',
    arohiFirstMessage: 'I am so happy to chat with you today! What is on your mind? You can talk about your day, your dreams, or anything you love.',
    arohiFirstMessageTranslation: {
      hi: 'आज आपसे बात करके बहुत खुशी हो रही है! आपके मन में क्या चल रहा है? आप अपने दिन, अपने सपनों या किसी भी चीज़ पर खुलकर बात कर सकते हैं।',
      or: 'ଆଜି ଆପଣଙ୍କ ସହ କଥା ହୋଇ ମୋତେ ବହୁତ ଖୁସି ଲାଗୁଛି! ଆପଣଙ୍କ ମନରେ କ’ଣ ଅଛି? ଆପଣ ଯେକୌଣସି ବିଷୟରେ କଥା ହୋଇପାରିବେ।'
    }
  }
];
