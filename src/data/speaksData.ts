import { 
  SpeaksLanguage, 
  SpeaksWeek, 
  SpeaksLessonNode, 
  SpeaksRoleplayScenario, 
  SpeaksVocabCard, 
  SpeaksUserProgress 
} from '../types/speaksTypes';

export const SPEAKS_LANGUAGES: SpeaksLanguage[] = [
  // --- Indian Official & Regional Languages ---
  {
    code: 'hi',
    nativeName: 'हिंदी',
    englishName: 'Hindi',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'North & Central India',
    script: 'Devanagari',
    sampleGreeting: 'नमस्ते! आप कैसे हैं?',
    ttsLocale: 'hi-IN',
    speechRecognitionLocale: 'hi-IN'
  },
  {
    code: 'or',
    nativeName: 'ଓଡ଼ିଆ',
    englishName: 'Odia',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Odisha',
    script: 'Odia',
    sampleGreeting: 'ନମସ୍କାର! ଆପଣ କେମିତି ଅଛନ୍ତି?',
    ttsLocale: 'or-IN',
    speechRecognitionLocale: 'or-IN'
  },
  {
    code: 'bn',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'West Bengal & Tripura',
    script: 'Bengali',
    sampleGreeting: 'নমস্কার! আপনি কেমন আছেন?',
    ttsLocale: 'bn-IN',
    speechRecognitionLocale: 'bn-IN'
  },
  {
    code: 'te',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Andhra Pradesh & Telangana',
    script: 'Telugu',
    sampleGreeting: 'నమస్కారం! మీరు ఎలా ఉన్నారు?',
    ttsLocale: 'te-IN',
    speechRecognitionLocale: 'te-IN'
  },
  {
    code: 'mr',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Maharashtra',
    script: 'Devanagari',
    sampleGreeting: 'नमस्कार! तुम्ही कसे आहात?',
    ttsLocale: 'mr-IN',
    speechRecognitionLocale: 'mr-IN'
  },
  {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Tamil Nadu & Puducherry',
    script: 'Tamil',
    sampleGreeting: 'வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்?',
    ttsLocale: 'ta-IN',
    speechRecognitionLocale: 'ta-IN'
  },
  {
    code: 'gu',
    nativeName: 'ગુજરાતી',
    englishName: 'Gujarati',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Gujarat',
    script: 'Gujarati',
    sampleGreeting: 'નમસ્તે! તમે કેમ છો?',
    ttsLocale: 'gu-IN',
    speechRecognitionLocale: 'gu-IN'
  },
  {
    code: 'kn',
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Karnataka',
    script: 'Kannada',
    sampleGreeting: 'ನಮಸ್ಕಾರ! ನೀವು ಹೇಗಿದ್ದೀರಿ?',
    ttsLocale: 'kn-IN',
    speechRecognitionLocale: 'kn-IN'
  },
  {
    code: 'ml',
    nativeName: 'മലയാളം',
    englishName: 'Malayalam',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Kerala',
    script: 'Malayalam',
    sampleGreeting: 'നമസ്കാരം! സുഖമാണോ?',
    ttsLocale: 'ml-IN',
    speechRecognitionLocale: 'ml-IN'
  },
  {
    code: 'pa',
    nativeName: 'ਪੰਜਾਬੀ',
    englishName: 'Punjabi',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Punjab',
    script: 'Gurmukhi',
    sampleGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?',
    ttsLocale: 'pa-IN',
    speechRecognitionLocale: 'pa-IN'
  },
  {
    code: 'as',
    nativeName: 'অসমীয়া',
    englishName: 'Assamese',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Assam',
    script: 'Bengali-Assamese',
    sampleGreeting: 'নমস্কাৰ! আপুনি কেনে আছে?',
    ttsLocale: 'as-IN',
    speechRecognitionLocale: 'as-IN'
  },
  {
    code: 'sa',
    nativeName: 'संस्कृतम्',
    englishName: 'Sanskrit',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Classical Bharat',
    script: 'Devanagari',
    sampleGreeting: 'नमो नमः! भवान् कथम् अस्ति?',
    ttsLocale: 'hi-IN',
    speechRecognitionLocale: 'hi-IN'
  },
  {
    code: 'ur',
    nativeName: 'اردو',
    englishName: 'Urdu',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Pan-India',
    script: 'Nastaliq',
    sampleGreeting: 'آداب! آپ کیسے ہیں؟',
    ttsLocale: 'ur-IN',
    speechRecognitionLocale: 'ur-IN'
  },
  {
    code: 'bho',
    nativeName: 'भोजपुरी',
    englishName: 'Bhojpuri',
    flag: '🇮🇳',
    region: 'Indian',
    subRegion: 'Bihar & Purvanchal',
    script: 'Devanagari',
    sampleGreeting: 'प्रणाम! रउआ कइसन बानी?',
    ttsLocale: 'hi-IN',
    speechRecognitionLocale: 'hi-IN'
  },

  // --- Major Global Languages ---
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    flag: '🇬🇧',
    region: 'Global',
    subRegion: 'International & Commonwealth',
    script: 'Latin',
    sampleGreeting: 'Hello! How are you doing today?',
    ttsLocale: 'en-US',
    speechRecognitionLocale: 'en-US'
  },
  {
    code: 'de',
    nativeName: 'Deutsch',
    englishName: 'German',
    flag: '🇩🇪',
    region: 'Global',
    subRegion: 'Germany, Austria & Switzerland',
    script: 'Latin',
    sampleGreeting: 'Guten Tag! Wie geht es Ihnen?',
    ttsLocale: 'de-DE',
    speechRecognitionLocale: 'de-DE'
  },
  {
    code: 'fr',
    nativeName: 'Français',
    englishName: 'French',
    flag: '🇫🇷',
    region: 'Global',
    subRegion: 'France, Canada & Francophonie',
    script: 'Latin',
    sampleGreeting: 'Bonjour! Comment allez-vous?',
    ttsLocale: 'fr-FR',
    speechRecognitionLocale: 'fr-FR'
  },
  {
    code: 'es',
    nativeName: 'Español',
    englishName: 'Spanish',
    flag: '🇪🇸',
    region: 'Global',
    subRegion: 'Spain & Latin America',
    script: 'Latin',
    sampleGreeting: '¡Hola! ¿Cómo estás?',
    ttsLocale: 'es-ES',
    speechRecognitionLocale: 'es-ES'
  },
  {
    code: 'ja',
    nativeName: '日本語',
    englishName: 'Japanese',
    flag: '🇯🇵',
    region: 'Global',
    subRegion: 'Japan',
    script: 'Kanji / Hiragana / Katakana',
    sampleGreeting: 'こんにちは！お元気ですか？',
    ttsLocale: 'ja-JP',
    speechRecognitionLocale: 'ja-JP'
  },
  {
    code: 'zh',
    nativeName: '中文 (普通话)',
    englishName: 'Mandarin Chinese',
    flag: '🇨🇳',
    region: 'Global',
    subRegion: 'China, Singapore & Taiwan',
    script: 'Simplified Hanzi',
    sampleGreeting: '你好！最近怎么样？',
    ttsLocale: 'zh-CN',
    speechRecognitionLocale: 'zh-CN'
  },
  {
    code: 'ko',
    nativeName: '한국어',
    englishName: 'Korean',
    flag: '🇰🇷',
    region: 'Global',
    subRegion: 'South Korea',
    script: 'Hangul',
    sampleGreeting: '안녕하세요! 잘 지내시죠?',
    ttsLocale: 'ko-KR',
    speechRecognitionLocale: 'ko-KR'
  },
  {
    code: 'ar',
    nativeName: 'العربية',
    englishName: 'Arabic',
    flag: '🇦🇪',
    region: 'Global',
    subRegion: 'Middle East & North Africa',
    script: 'Arabic',
    sampleGreeting: 'مرحباً! كيف حالك اليوم؟',
    ttsLocale: 'ar-SA',
    speechRecognitionLocale: 'ar-SA'
  },
  {
    code: 'ru',
    nativeName: 'Русский',
    englishName: 'Russian',
    flag: '🇷🇺',
    region: 'Global',
    subRegion: 'Eurasia',
    script: 'Cyrillic',
    sampleGreeting: 'Здравствуйте! Как ваши дела?',
    ttsLocale: 'ru-RU',
    speechRecognitionLocale: 'ru-RU'
  },
  {
    code: 'it',
    nativeName: 'Italiano',
    englishName: 'Italian',
    flag: '🇮🇹',
    region: 'Global',
    subRegion: 'Italy',
    script: 'Latin',
    sampleGreeting: 'Ciao! Come va oggi?',
    ttsLocale: 'it-IT',
    speechRecognitionLocale: 'it-IT'
  },
  {
    code: 'pt',
    nativeName: 'Português',
    englishName: 'Portuguese',
    flag: '🇵🇹',
    region: 'Global',
    subRegion: 'Brazil & Portugal',
    script: 'Latin',
    sampleGreeting: 'Olá! Como vai você?',
    ttsLocale: 'pt-PT',
    speechRecognitionLocale: 'pt-PT'
  },
  {
    code: 'tr',
    nativeName: 'Türkçe',
    englishName: 'Turkish',
    flag: '🇹🇷',
    region: 'Global',
    subRegion: 'Turkey',
    script: 'Latin',
    sampleGreeting: 'Merhaba! Nasılsınız?',
    ttsLocale: 'tr-TR',
    speechRecognitionLocale: 'tr-TR'
  },
  {
    code: 'nl',
    nativeName: 'Nederlands',
    englishName: 'Dutch',
    flag: '🇳🇱',
    region: 'Global',
    subRegion: 'Netherlands & Belgium',
    script: 'Latin',
    sampleGreeting: 'Hallo! Hoe gaat het met je?',
    ttsLocale: 'nl-NL',
    speechRecognitionLocale: 'nl-NL'
  }
];

export function getSpeaksLanguage(code: string): SpeaksLanguage {
  return SPEAKS_LANGUAGES.find(l => l.code === code) || SPEAKS_LANGUAGES[0];
}

// 4-Week Curriculum generator for any source-to-target language pair
export function generateCurriculumRoadmap(sourceCode: string, targetCode: string): SpeaksWeek[] {
  const target = getSpeaksLanguage(targetCode);
  const source = getSpeaksLanguage(sourceCode);

  // We craft tailored curricula based on target language
  const isEnglishTarget = targetCode === 'en';
  const isGermanTarget = targetCode === 'de';
  const isJapaneseTarget = targetCode === 'ja';
  const isFrenchTarget = targetCode === 'fr';
  const isSpanishTarget = targetCode === 'es';

  return [
    {
      weekNumber: 1,
      title: 'Week 1: Hesitation Buster & Sound Identity',
      nativeTitle: sourceCode === 'hi' 
        ? 'सप्ताह 1: डर और झिझक खत्म, आवाज़ शुरू' 
        : sourceCode === 'or' 
        ? 'ସପ୍ତାହ ୧: ଭୟ ଏବଂ ଦ୍ୱିଧା ଦୂର, ଆତ୍ମବିଶ୍ୱାସ ଆରମ୍ଭ'
        : `Week 1: Overcoming Hesitation in ${target.englishName}`,
      subtitle: `Master core sounds, introduction, and zero-panic sentence building in ${target.englishName}.`,
      theme: 'Zero-Hesitation Foundation',
      milestoneName: 'The Voice Breakthrough Chest',
      colorGradient: 'from-amber-500 to-orange-600',
      lessons: [
        {
          id: 'w1d1',
          dayNumber: 1,
          weekNumber: 1,
          title: 'Introducing Yourself Confidently',
          nativeTitle: sourceCode === 'hi' ? 'बिना झिझक अपना परिचय देना' : 'Confident Self Introduction',
          scenario: 'Meeting a new friend or colleague for the first time',
          iconType: 'intro',
          conversationGoal: `Say your name, where you are from, and that you are excited to learn ${target.englishName}.`,
          rewardXp: 50,
          phrases: [
            {
              id: 'p1',
              targetText: isEnglishTarget 
                ? "Hello! My name is Junoon, and I am pleased to meet you." 
                : isGermanTarget 
                ? "Hallo! Ich heiße Junoon, und ich freue mich, Sie kennenzulernen."
                : isJapaneseTarget
                ? "はじめまして、ジュヌーンです。よろしくお願いします。"
                : isSpanishTarget
                ? "¡Hola! Me llamo Junoon, y mucho gusto en conocerte."
                : `Hello! My name is Junoon. Nice to meet you in ${target.englishName}.`,
              transliteration: isEnglishTarget
                ? "हैलो! माय नेम इज़ जुनून, एंड आई ऍम प्लीज़्ड टू मीट यू।"
                : isGermanTarget
                ? "हालो! इष हाइसे जुनून, उंट इष फ्रॉये मिख, ज़ी केननत्सुलेर्नेन।"
                : isJapaneseTarget
                ? "हाजिमेमाश़िते, जुनून देसु। योरोश़िकु ओनेगाइशिमासु।"
                : isSpanishTarget
                ? "ओला! मे यामो जुनून, इ मूचो गुस्तो एन कोनोसेरते।"
                : "Hello! My name is...",
              sourceTranslation: sourceCode === 'hi'
                ? "नमस्ते! मेरा नाम जुनून है, और आपसे मिलकर बहुत खुशी हुई।"
                : sourceCode === 'or'
                ? "ନମସ୍କାର! ମୋ ନାମ ଜୁନୁନ୍, ଏବଂ ଆପଣଙ୍କୁ ଭେଟି ବହୁତ ଖୁସି ଲାଗିଲା।"
                : "Hello! My name is Junoon, pleased to meet you.",
              breakdownNotes: "Keep your shoulders relaxed. Smile warmly while uttering the greeting.",
              syllables: [
                { syllable: "Hel-lo", phonetic: "heh-loh", accuracy: "perfect" },
                { syllable: "Pleased", phonetic: "pleezd", accuracy: "perfect" },
                { syllable: "Meet", phonetic: "meet", accuracy: "perfect" }
              ]
            },
            {
              id: 'p2',
              targetText: isEnglishTarget
                ? "I am from India, and I work in technology."
                : isGermanTarget
                ? "Ich komme aus Indien und arbeite im Technologiebereich."
                : isJapaneseTarget
                ? "私はインド出身で、ITの仕事をしています。"
                : "I come from India and I love learning languages.",
              transliteration: isEnglishTarget
                ? "आई ऍम फ्रॉम इंडिया, एंड आई वर्क इन टेक्नोलॉजी।"
                : isGermanTarget
                ? "इष कॉमे आउस इंडिएन उंट आरबाइटे इम टेक्नोलोजीबराइख।"
                : isJapaneseTarget
                ? "वाताशी वा इंदो शुश्शिन दे, आइटी नो शिगोतो ओ शितेइमासु।"
                : "I am from India...",
              sourceTranslation: sourceCode === 'hi'
                ? "मैं भारत से हूँ, और मैं टेक्नोलॉजी में काम करता हूँ।"
                : sourceCode === 'or'
                ? "ମୁଁ ଭାରତରୁ ଆସିଛି, ଏବଂ ମୁଁ ଟେକ୍ନୋଲୋଜି କ୍ଷେତ୍ରରେ କାର୍ଯ୍ୟ କରେ।"
                : "I am from India and work in technology.",
              breakdownNotes: "Clear stress on nationality and profession."
            }
          ]
        },
        {
          id: 'w1d2',
          dayNumber: 2,
          weekNumber: 1,
          title: 'Daily Routine & What You Love Doing',
          nativeTitle: sourceCode === 'hi' ? 'अपनी दिनचर्या और शौक बताना' : 'Daily Routine & Passions',
          scenario: 'Casual chit-chat about how you spend your day',
          iconType: 'social',
          conversationGoal: 'Describe your morning routine and one hobby effortlessly.',
          rewardXp: 60,
          phrases: [
            {
              id: 'p3',
              targetText: isEnglishTarget
                ? "I usually wake up early and practice speaking every single day."
                : isGermanTarget
                ? "Normalerweise stehe ich früh auf und übe jeden Tag das Sprechen."
                : isJapaneseTarget
                ? "普段は早起きして、毎日話す練習をしています。"
                : "I wake up early and practice speaking every day.",
              transliteration: isEnglishTarget
                ? "आई यूज़ुअली वेक अप अर्ली एंड प्रैक्टिस स्पीकिंग एव्री सिंगल डे।"
                : isGermanTarget
                ? "नोर्मलर्वाइज़े श्टेहे इष फ्रूह आउफ़ उंट ऊबे येडेन टाग डास श्प्रेखन।"
                : isJapaneseTarget
                ? "फुदान वा हायाओकि शिते, मैनिचि हानासु रेंशू ओ शितेइमासु।"
                : "I usually wake up early...",
              sourceTranslation: sourceCode === 'hi'
                ? "मैं आमतौर पर सुबह जल्दी उठता हूँ और रोज़ बोलने का अभ्यास करता हूँ।"
                : "I usually wake up early and practice speaking every day.",
              breakdownNotes: "Notice the rhythm on 'usually' - don't rush the vowels."
            }
          ]
        },
        {
          id: 'w1d3',
          dayNumber: 3,
          weekNumber: 1,
          title: 'Saying "I Don\'t Understand" with Elegance',
          nativeTitle: sourceCode === 'hi' ? 'जब समझ न आए तो शालीनता से कैसे कहें' : 'Polite Clarification',
          scenario: 'When someone speaks too fast or with an unfamiliar accent',
          iconType: 'social',
          conversationGoal: 'Ask the speaker to repeat or slow down politely without panic.',
          rewardXp: 65,
          phrases: [
            {
              id: 'p4',
              targetText: isEnglishTarget
                ? "Could you please repeat that a little more slowly? I am still learning."
                : isGermanTarget
                ? "Könnten Sie das bitte etwas langsamer wiederholen? Ich lerne noch."
                : isJapaneseTarget
                ? "もう少しゆっくり言っていただけますか？まだ勉強中です。"
                : "Could you please speak a little slower?",
              transliteration: isEnglishTarget
                ? "कुड यू प्लीज़ रिपीट दैट अ लिटिल मोर स्लोली? आई ऍम स्टिल लर्निंग।"
                : isGermanTarget
                ? "क्योन्टेन ज़ी डास बिट्टे एतवास लांगज़ामर वीदरहोलन? इष लेर्ने नोख।"
                : isJapaneseTarget
                ? "मोउ सुकोशि युक्कुरी इत्ते इतादाकेमासु का? मादा बेंगक्योउ चू देसु।"
                : "Could you please repeat that slowly...",
              sourceTranslation: sourceCode === 'hi'
                ? "क्या आप कृपया थोड़ा धीरे दोहरा सकते हैं? मैं अभी सीख रहा हूँ।"
                : "Could you please repeat that more slowly? I am still learning.",
              breakdownNotes: "Supernova golden rule: Never freeze or say 'Huh?'. Use this polite magic phrase."
            }
          ]
        },
        {
          id: 'w1d4',
          dayNumber: 4,
          weekNumber: 1,
          title: 'Expressing Opinions & Preferences',
          nativeTitle: sourceCode === 'hi' ? 'अपनी पसंद और राय व्यक्त करना' : 'Likes, Dislikes & Opinions',
          scenario: 'Talking about books, movies, food, or career aspirations',
          iconType: 'social',
          conversationGoal: 'Say two things you love and give a simple reason.',
          rewardXp: 70,
          phrases: [
            {
              id: 'p5',
              targetText: isEnglishTarget
                ? "In my opinion, continuous practice builds unbeatable confidence."
                : isGermanTarget
                ? "Meiner Meinung nach baut ständige Übung unschlagbares Selbstvertrauen auf."
                : "In my opinion, daily practice gives great confidence.",
              transliteration: isEnglishTarget
                ? "इन माय ओपिनियन, कंटीन्यूअस प्रैक्टिस बिल्ड्स अनबीटेबल कॉन्फिडेंस।"
                : "इन माय ओपिनियन...",
              sourceTranslation: sourceCode === 'hi'
                ? "मेरी राय में, निरंतर अभ्यास से अटूट आत्मविश्वास बनता है।"
                : "In my opinion, regular practice builds true confidence.",
              breakdownNotes: "Use 'In my opinion' instead of 'I think that' for higher impact."
            }
          ]
        },
        {
          id: 'w1d5',
          dayNumber: 5,
          weekNumber: 1,
          title: 'Small Talk at the Water Cooler / Gathering',
          nativeTitle: sourceCode === 'hi' ? 'हल्की-फुल्की बातचीत (Small Talk)' : 'Casual Small Talk',
          scenario: 'Waiting for an elevator or drinking tea with a peer',
          iconType: 'social',
          conversationGoal: 'Initiate a casual 3-sentence conversation about the weather or weekend.',
          rewardXp: 75,
          phrases: [
            {
              id: 'p6',
              targetText: isEnglishTarget
                ? "How has your day been going so far? Looks like great weather outside."
                : isGermanTarget
                ? "Wie war Ihr Tag bisher? Draußen scheint tolles Wetter zu sein."
                : "How is your day going?",
              transliteration: isEnglishTarget
                ? "हाउ हैज़ योर डे बीन गोइंग सो फार? लुक्स लाइक ग्रेट वेदर आउटसाइड।"
                : "हाउ हैज़ योर डे बीन...",
              sourceTranslation: sourceCode === 'hi'
                ? "आपका दिन अब तक कैसा चल रहा है? बाहर मौसम बहुत अच्छा लग रहा है।"
                : "How has your day been going so far?",
              breakdownNotes: "Friendly pitch inflection at the end of questions."
            }
          ]
        },
        {
          id: 'w1d6',
          dayNumber: 6,
          weekNumber: 1,
          title: 'Mastering Transition Phrases (No More Um/Uh)',
          nativeTitle: sourceCode === 'hi' ? 'बिना रुके बोलना — फिलर वर्ड्स को अलविदा' : 'Smooth Flow Transitions',
          scenario: 'Thinking on your feet while speaking without long awkward pauses',
          iconType: 'social',
          conversationGoal: 'Use 2 bridge phrases like "As a matter of fact" or "To be honest".',
          rewardXp: 80,
          phrases: [
            {
              id: 'p7',
              targetText: isEnglishTarget
                ? "That is a very interesting point. Let me share my perspective on this."
                : isGermanTarget
                ? "Das ist ein sehr interessanter Punkt. Lassen Sie mich meine Sichtweise teilen."
                : "That is an interesting point. Let me share my thoughts.",
              transliteration: isEnglishTarget
                ? "दैट इज़ अ वेरी इंटरेस्टिंग पॉइंट। लेट मी शेयर माय पर्स्पेक्टिव ऑन दिस।"
                : "दैट इज़ अ वेरी...",
              sourceTranslation: sourceCode === 'hi'
                ? "यह एक बहुत दिलचस्प बात है। मुझे इस पर अपना दृष्टिकोण साझा करने दें।"
                : "That's an interesting point. Let me share my perspective.",
              breakdownNotes: "Gives your brain 2 seconds to formulate thoughts cleanly."
            }
          ]
        },
        {
          id: 'w1d7',
          dayNumber: 7,
          weekNumber: 1,
          title: 'Week 1 Graduation: The 3-Minute Free Speech',
          nativeTitle: sourceCode === 'hi' ? 'सप्ताह 1 परीक्षा: 3 मिनट का बिना रुके संवाद' : 'Week 1 Milestone Call',
          scenario: 'Live interactive milestone call with Arohi',
          iconType: 'chest',
          isChest: true,
          conversationGoal: 'Complete a continuous conversation with Arohi covering self-intro and daily goals.',
          rewardXp: 150,
          phrases: [
            {
              id: 'p8',
              targetText: isEnglishTarget
                ? "I have overcome my initial hesitation, and I am ready for real-world fluency!"
                : isGermanTarget
                ? "Ich habe meine anfängliche Zögerlichkeit überwunden und bin bereit für die Praxis!"
                : "I am ready for the real world!",
              transliteration: isEnglishTarget
                ? "आई हैव ओवरकम माय इनिशियल हेज़िटेशन, एंड आई ऍम रेडी फॉर रियल-वर्ल्ड फ्लूएंसी!"
                : "आई हैव ओवरकम...",
              sourceTranslation: sourceCode === 'hi'
                ? "मैंने अपनी शुरुआती झिझक पर काबू पा लिया है, और मैं अब आगे के लिए पूरी तरह तैयार हूँ!"
                : "I have conquered my hesitation and am ready!",
              breakdownNotes: "Celebrate your milestone! Week 1 unlock complete."
            }
          ]
        }
      ]
    },

    {
      weekNumber: 2,
      title: 'Week 2: Real-World Social & Public Survival',
      nativeTitle: sourceCode === 'hi' ? 'सप्ताह 2: बाज़ार, यात्रा और सार्वजनिक बातचीत' : `Week 2: Real-World Public Situations`,
      subtitle: `Ordering food, asking for directions, airport check-in, and handling public encounters smoothly.`,
      theme: 'Everyday Fluency',
      milestoneName: 'The World Traveler Chest',
      colorGradient: 'from-emerald-500 to-teal-700',
      lessons: [
        {
          id: 'w2d8',
          dayNumber: 8,
          weekNumber: 2,
          title: 'Ordering at a Café & Customizing Drink',
          nativeTitle: sourceCode === 'hi' ? 'कैफे में ड्रिंक ऑर्डर करना और बदलाव बताना' : 'Ordering at a Café',
          scenario: 'Ordering at Starbucks or a busy local bakery',
          iconType: 'food',
          conversationGoal: 'Order a specific drink, ask for oat milk, and pay with card.',
          rewardXp: 85,
          phrases: [
            {
              id: 'p9',
              targetText: isEnglishTarget
                ? "Hi! Could I please get an iced caramel latte with oat milk, less ice?"
                : isGermanTarget
                ? "Hallo! Könnte ich bitte einen Eiskaffee mit Hafermilch und wenig Eis bekommen?"
                : "Hi! Can I get a coffee with oat milk please?",
              transliteration: isEnglishTarget
                ? "हाय! कुड आई प्लीज़ गेट एन आइस्ड कैरामल लाटे विद ओट मिल्क, लेस आइस?"
                : "हाय! कुड आई प्लीज़...",
              sourceTranslation: sourceCode === 'hi'
                ? "नमस्ते! क्या मुझे ओट मिल्क और कम बर्फ के साथ एक आइस्ड कारमेल लाटे मिल सकती है?"
                : "Could I please get a coffee with oat milk?",
              breakdownNotes: "Super polite with 'Could I please get...'"
            }
          ]
        },
        {
          id: 'w2d9',
          dayNumber: 9,
          weekNumber: 2,
          title: 'Asking for the Bill & Splitting Payment',
          nativeTitle: sourceCode === 'hi' ? 'बिल मांगना और पेमेंट बांटना' : 'Bill & Payment',
          scenario: 'Finishing a meal with friends at a restaurant',
          iconType: 'food',
          conversationGoal: 'Ask the waiter for the bill and ask if you can pay separately.',
          rewardXp: 85,
          phrases: [
            {
              id: 'p10',
              targetText: isEnglishTarget
                ? "Excuse me, could we have the bill please? Can we split it between two cards?"
                : isGermanTarget
                ? "Entschuldigung, können wir bitte die Rechnung haben? Können wir getrennt zahlen?"
                : "Excuse me, can we have the bill please?",
              transliteration: isEnglishTarget
                ? "एक्सक्यूज़ मी, कुड वी हैव द बिल प्लीज़? कैन वी स्प्लिट इट बिटवीन टू कार्ड्स?"
                : "एक्सक्यूज़ मी...",
              sourceTranslation: sourceCode === 'hi'
                ? "माफ़ कीजियेगा, क्या हमें बिल मिल सकता है? क्या हम इसे दो कार्डों में विभाजित कर सकते हैं?"
                : "Excuse me, could we get the check please?",
              breakdownNotes: "Say 'split the bill' naturally."
            }
          ]
        },
        {
          id: 'w2d10',
          dayNumber: 10,
          weekNumber: 2,
          title: 'Asking for Directions & Metro Navigation',
          nativeTitle: sourceCode === 'hi' ? 'रास्ता पूछना और मेट्रो/बस की जानकारी लेना' : 'Transit & Directions',
          scenario: 'Lost in a new city seeking the nearest train station',
          iconType: 'travel',
          conversationGoal: 'Ask a pedestrian how to reach the central station.',
          rewardXp: 90,
          phrases: [
            {
              id: 'p11',
              targetText: isEnglishTarget
                ? "Pardon me, which platform does the express train to the city center depart from?"
                : isGermanTarget
                ? "Verzeihung, von welchem Gleis fährt der Expresszug ins Stadtzentrum ab?"
                : "Excuse me, where is the train to city center?",
              transliteration: isEnglishTarget
                ? "पार्डन मी, विच प्लेटफॉर्म डज़ द एक्सप्रेस ट्रेन टू द सिटी सेंटर डिपार्ट फ्रॉम?"
                : "पार्डन मी...",
              sourceTranslation: sourceCode === 'hi'
                ? "माफ़ कीजिए, सिटी सेंटर जाने वाली एक्सप्रेस ट्रेन किस प्लेटफॉर्म से छूटती है?"
                : "Which platform does the train depart from?",
              breakdownNotes: "Use 'Pardon me' or 'Excuse me' before asking strangers."
            }
          ]
        },
        {
          id: 'w2d11',
          dayNumber: 11,
          weekNumber: 2,
          title: 'Hotel Check-In & Requesting Amenities',
          nativeTitle: sourceCode === 'hi' ? 'होटल चेक-इन और अतिरिक्त सुविधाएं मांगना' : 'Hotel Check-In',
          scenario: 'Arriving at a hotel front desk after a long flight',
          iconType: 'travel',
          conversationGoal: 'Check in under your reservation name and request quiet room & WiFi password.',
          rewardXp: 90,
          phrases: [
            {
              id: 'p12',
              targetText: isEnglishTarget
                ? "Good evening! I have a reservation under the name Junoon. Could I also have the WiFi details?"
                : isGermanTarget
                ? "Guten Abend! Ich habe eine Reservierung auf den Namen Junoon. Könnte ich auch die WLAN-Daten bekommen?"
                : "Good evening, I have a reservation.",
              transliteration: isEnglishTarget
                ? "गुड इवनिंग! आई हैव अ रिज़र्वेशन अंडर द नेम जुनून। कुड आई ऑल्सो हैव द वाईफाई डिटेल्स?"
                : "गुड इवनिंग...",
              sourceTranslation: sourceCode === 'hi'
                ? "शुभ संध्या! जुनून के नाम से मेरी बुकिंग है। क्या मुझे वाईफाई की जानकारी भी मिल सकती है?"
                : "Good evening! I have a reservation.",
              breakdownNotes: "Confidence at reception desks opens doors to free upgrades."
            }
          ]
        },
        {
          id: 'w2d12',
          dayNumber: 12,
          weekNumber: 2,
          title: 'Shopping, Size Inquiries & Polite Bargaining',
          nativeTitle: sourceCode === 'hi' ? 'शॉपिंग, साइज पूछना और मोल-भाव' : 'Shopping & Returns',
          scenario: 'Browsing an apparel store or asking for discount/fitting room',
          iconType: 'social',
          conversationGoal: 'Ask if they have a medium size and where the fitting rooms are.',
          rewardXp: 95,
          phrases: [
            {
              id: 'p13',
              targetText: isEnglishTarget
                ? "Do you have this jacket in a medium size? Also, where is the fitting room located?"
                : isGermanTarget
                ? "Haben Sie diese Jacke in Größe M? Und wo befinden sich die Umkleidekabinen?"
                : "Do you have this in medium?",
              transliteration: isEnglishTarget
                ? "डू यू हैव दिस जैकेट इन अ मीडियम साइज? ऑल्सो, वेयर इज़ द फिटिंग रूम लोकेटेड?"
                : "डू यू हैव...",
              sourceTranslation: sourceCode === 'hi'
                ? "क्या आपके पास यह जैकेट मीडियम साइज़ में है? और ट्रायल रूम कहाँ है?"
                : "Do you have this in medium size?",
              breakdownNotes: "Fitting room vs. changing room."
            }
          ]
        },
        {
          id: 'w2d13',
          dayNumber: 13,
          weekNumber: 2,
          title: 'Doctor Visit & Explaining Physical Symptoms',
          nativeTitle: sourceCode === 'hi' ? 'डॉक्टर के पास बीमारी और लक्षण बताना' : 'Health & Doctor Visit',
          scenario: 'Describing a fever, headache, or allergy at a clinic',
          iconType: 'social',
          conversationGoal: 'Explain when symptoms started and ask about medicine dosage.',
          rewardXp: 100,
          phrases: [
            {
              id: 'p14',
              targetText: isEnglishTarget
                ? "I have had a throbbing headache and mild fever since yesterday morning."
                : isGermanTarget
                ? "Ich habe seit gestern Morgen pochende Kopfschmerzen und leichtes Fieber."
                : "I have had a headache since yesterday.",
              transliteration: isEnglishTarget
                ? "आई हैव हैड अ थ्रॉबिंग हेडेक एंड माइल्ड फीवर सिंस यस्टरडे मॉर्निंग।"
                : "आई हैव हैड...",
              sourceTranslation: sourceCode === 'hi'
                ? "मुझे कल सुबह से तेज सिरदर्द और हल्का बुखार है।"
                : "I have a throbbing headache and mild fever.",
              breakdownNotes: "Throbbing = pulsating pain."
            }
          ]
        },
        {
          id: 'w2d14',
          dayNumber: 14,
          weekNumber: 2,
          title: 'Week 2 Graduation: Airport Customs & Simulation',
          nativeTitle: sourceCode === 'hi' ? 'सप्ताह 2 परीक्षा: एयरपोर्ट इमिग्रेशन सिमुलेशन' : 'Week 2 Milestone: Airport Simulation',
          scenario: 'Face-to-face simulation with an airport border officer',
          iconType: 'chest',
          isChest: true,
          conversationGoal: 'Explain the purpose of your visit, duration of stay, and hotel address clearly.',
          rewardXp: 200,
          phrases: [
            {
              id: 'p15',
              targetText: isEnglishTarget
                ? "I am visiting for a business conference and will be staying for two weeks at the Marriott."
                : isGermanTarget
                ? "Ich bin für eine Geschäftskonferenz hier und werde zwei Wochen im Marriott bleiben."
                : "I am visiting for business for two weeks.",
              transliteration: isEnglishTarget
                ? "आई ऍम विजिटिंग फॉर अ बिज़नेस कॉन्फ्रेंस एंड विल बी स्टेइंग फॉर टू वीक्स एट द मैरियट।"
                : "आई ऍम विजिटिंग...",
              sourceTranslation: sourceCode === 'hi'
                ? "मैं एक बिजनेस कॉन्फ्रेंस के लिए आया हूँ और मैरियट होटल में दो हफ्ते रहूँगा।"
                : "I am here for a business conference for two weeks.",
              breakdownNotes: "Keep eye contact with border control and answer strictly what is asked."
            }
          ]
        }
      ]
    },

    {
      weekNumber: 3,
      title: 'Week 3: Corporate, Office & High-Stakes Workplace',
      nativeTitle: sourceCode === 'hi' ? 'सप्ताह 3: कॉर्पोरेट ऑफिस, मीटिंग्स और ईमेल' : `Week 3: Corporate & Workplace English`,
      subtitle: `Master professional phone calls, speaking up in meetings, managing conflicts, and client diplomacy.`,
      theme: 'Professional Mastery',
      milestoneName: 'The Corporate Leader Chest',
      colorGradient: 'from-blue-600 to-indigo-800',
      lessons: [
        {
          id: 'w3d15',
          dayNumber: 15,
          weekNumber: 3,
          title: 'Professional Phone Call & Leaving Messages',
          nativeTitle: sourceCode === 'hi' ? 'प्रोफेशनल फोन कॉल और वॉइस मैसेज छोड़ना' : 'Professional Phone Calls',
          scenario: 'Calling a business partner who is currently in another meeting',
          iconType: 'office',
          conversationGoal: 'Introduce yourself, state the reason for calling, and request a callback.',
          rewardXp: 110,
          phrases: [
            {
              id: 'p16',
              targetText: isEnglishTarget
                ? "Good morning! This is Junoon calling regarding the Q3 product roadmap. Could you please ask him to return my call?"
                : isGermanTarget
                ? "Guten Morgen! Hier ist Junoon bezüglich der Produkt-Roadmap für Q3. Könnten Sie ihn bitten, mich zurückzurufen?"
                : "Good morning! This is Junoon calling regarding the project.",
              transliteration: isEnglishTarget
                ? "गुड मॉर्निंग! दिस इज़ जुनून कॉलिंग रिगार्डिंग द Q3 प्रोडक्ट रोडमैप। कुड यू प्लीज़ आस्क हिम टू रिटर्न माय कॉल?"
                : "गुड मॉर्निंग...",
              sourceTranslation: sourceCode === 'hi'
                ? "शुभ प्रभात! मैं Q3 प्रोडक्ट रोडमैप के संबंध में जुनून बात कर रहा हूँ। क्या आप उनसे मुझे वापस कॉल करने के लिए कह सकते हैं?"
                : "Good morning, this is Junoon regarding the Q3 roadmap.",
              breakdownNotes: "Say 'This is [Name] calling', never 'I am [Name]' on phone calls."
            }
          ]
        },
        {
          id: 'w3d16',
          dayNumber: 16,
          weekNumber: 3,
          title: 'Giving Status Updates in Standup Meetings',
          nativeTitle: sourceCode === 'hi' ? 'मीटिंग में स्टेटस अपडेट देना (Standup)' : 'Agile Standup Updates',
          scenario: 'Your turn to speak in front of 10 team members and leadership',
          iconType: 'office',
          conversationGoal: 'Deliver: What I did yesterday, what I am doing today, and blockers.',
          rewardXp: 115,
          phrases: [
            {
              id: 'p17',
              targetText: isEnglishTarget
                ? "Yesterday I completed the API integration. Today I am conducting QA tests, and there are currently no blockers."
                : isGermanTarget
                ? "Gestern habe ich die API-Integration abgeschlossen. Heute führe ich Qualitätstests durch, und es gibt derzeit keine Hindernisse."
                : "Yesterday I completed the integration. Today I am running tests.",
              transliteration: isEnglishTarget
                ? "यस्टरडे आई कम्प्लीटेड द एपीआई इंटीग्रेशन। टुडे आई ऍम कंडक्टिंग क्यूए टेस्ट्स, एंड देयर आर करेंटली नो ब्लॉकर्स।"
                : "यस्टरडे आई कम्प्लीटेड...",
              sourceTranslation: sourceCode === 'hi'
                ? "कल मैंने एपीआई इंटीग्रेशन पूरा कर लिया था। आज मैं टेस्टिंग कर रहा हूँ, और अभी कोई रुकावट नहीं है।"
                : "Yesterday I finished integration, today testing, no blockers.",
              breakdownNotes: "Crisp, confident delivery without rambling."
            }
          ]
        },
        {
          id: 'w3d17',
          dayNumber: 17,
          weekNumber: 3,
          title: 'Disagreeing Politely with Senior Leadership',
          nativeTitle: sourceCode === 'hi' ? 'मीटिंग में सीनियर्स से शालीनता से असहमत होना' : 'Diplomatic Disagreement',
          scenario: 'When a manager proposes a deadline that is unrealistic',
          iconType: 'boss',
          conversationGoal: 'Acknowledge their goal, propose a realistic alternative, and justify with data.',
          rewardXp: 120,
          phrases: [
            {
              id: 'p18',
              targetText: isEnglishTarget
                ? "I completely understand the urgency, but to guarantee top quality, I recommend phasing the launch over two sprints."
                : isGermanTarget
                ? "Ich verstehe die Dringlichkeit vollkommen, aber um höchste Qualität zu gewährleisten, empfehle ich, den Start auf zwei Sprints aufzuteilen."
                : "I understand the urgency, but I recommend launching in two phases.",
              transliteration: isEnglishTarget
                ? "आई कम्प्लीटली अंडरस्टैंड द अर्जेंसी, बट टू गारंटी टॉप क्वालिटी, आई रेकमेंड फेज़िंग द लॉन्च ओवर टू स्प्रिंट्स।"
                : "आई कम्प्लीटली अंडरस्टैंड...",
              sourceTranslation: sourceCode === 'hi'
                ? "मैं तात्कालिकता को पूरी तरह समझता हूँ, लेकिन उच्चतम गुणवत्ता की गारंटी के लिए, मैं दो चरणों में लॉन्च करने की सिफारिश करता हूँ।"
                : "I understand the urgency, but suggest a phased launch for quality.",
              breakdownNotes: "Avoid 'You are wrong'. Use 'I understand the urgency, but recommend...'"
            }
          ]
        },
        {
          id: 'w3d18',
          dayNumber: 18,
          weekNumber: 3,
          title: 'Requesting Leaves, Deadline Extensions & Support',
          nativeTitle: sourceCode === 'hi' ? 'छुट्टी मांगना या डेडलाइन आगे बढ़वाना' : 'Requesting Leave & Extensions',
          scenario: '1-on-1 meeting with your direct reporting manager',
          iconType: 'boss',
          conversationGoal: 'Explain the reason, handover plan, and clear timeline.',
          rewardXp: 125,
          phrases: [
            {
              id: 'p19',
              targetText: isEnglishTarget
                ? "I have delegated my critical tasks to Priya, and I will be fully reachable via email if anything urgent arises."
                : isGermanTarget
                ? "Ich habe meine wichtigsten Aufgaben an Priya delegiert und bin bei dringenden Anliegen per E-Mail erreichbar."
                : "I have handed over my tasks and will be available for emergencies.",
              transliteration: isEnglishTarget
                ? "आई हैव डेलीगेटेड माय क्रिटिकल टास्कस टू प्रिया, एंड आई विल बी फुल्ली रीचेबल वाया ईमेल इफ एनीथिंग अर्जेंट अराइज़ेस।"
                : "आई हैव डेलीगेटेड...",
              sourceTranslation: sourceCode === 'hi'
                ? "मैंने अपने ज़रूरी कार्य प्रिया को सौंप दिए हैं, और यदि कोई अत्यावश्यक बात होगी तो मैं ईमेल पर उपलब्ध रहूँगा।"
                : "I delegated tasks to Priya and remain reachable for urgent matters.",
              breakdownNotes: "Shows high accountability and professionalism."
            }
          ]
        },
        {
          id: 'w3d19',
          dayNumber: 19,
          weekNumber: 3,
          title: 'Presenting a Slide Deck or Project Demo',
          nativeTitle: sourceCode === 'hi' ? 'प्रोजेक्ट डेमो या प्रेजेंटेशन देना' : 'Delivering Presentations',
          scenario: 'Speaking in front of stakeholders or clients',
          iconType: 'office',
          conversationGoal: 'Guide the audience through key metrics and takeaways.',
          rewardXp: 130,
          phrases: [
            {
              id: 'p20',
              targetText: isEnglishTarget
                ? "As you can see on this slide, our user retention has grown by 42 percent over the past quarter."
                : isGermanTarget
                ? "Wie Sie auf dieser Folie sehen können, ist unsere Nutzerbindung im letzten Quartal um 42 Prozent gestiegen."
                : "As you can see on this slide, our growth has been significant.",
              transliteration: isEnglishTarget
                ? "एज़ यू कैन सी ऑन दिस स्लाइड, आवर यूजर रिटेंशन हैज़ ग्रोन बाय 42 परसेंट ओवर द पास्ट क्वार्टर।"
                : "एज़ यू कैन सी...",
              sourceTranslation: sourceCode === 'hi'
                ? "जैसा कि आप इस स्लाइड पर देख सकते हैं, पिछली तिमाही में हमारे यूजर रिटेंशन में 42 प्रतिशत की वृद्धि हुई है।"
                : "As you see on this slide, user retention grew 42%.",
              breakdownNotes: "Keep eye contact up, not buried in notes."
            }
          ]
        },
        {
          id: 'w3d20',
          dayNumber: 20,
          weekNumber: 3,
          title: 'Client Negotiations & Handling Objections',
          nativeTitle: sourceCode === 'hi' ? 'क्लाइंट बातचीत और आपत्तियों का समाधान' : 'Client Negotiations',
          scenario: 'Client pushes back on pricing or scope of work',
          iconType: 'office',
          conversationGoal: 'Reframe price objections into long-term ROI value.',
          rewardXp: 140,
          phrases: [
            {
              id: 'p21',
              targetText: isEnglishTarget
                ? "While the upfront investment is higher, the automation will save your team over twenty hours each week."
                : isGermanTarget
                ? "Obwohl die Anfangsinvestition höher ist, spart die Automatisierung Ihrem Team über zwanzig Stunden pro Woche."
                : "While upfront cost is higher, the automation saves your team hours weekly.",
              transliteration: isEnglishTarget
                ? "व्हाइल द अपफ्रंट इन्वेस्टमेंट इज़ हायर, द ऑटोमेशन विल सेव योर टीम ओवर ट्वेंटी आवर्स ईच वीक।"
                : "व्हाइल द अपफ्रंट...",
              sourceTranslation: sourceCode === 'hi'
                ? "हालाँकि शुरुआती निवेश थोड़ा अधिक है, लेकिन यह ऑटोमेशन आपकी टीम के हर हफ्ते 20 से ज्यादा घंटे बचाएगा।"
                : "While upfront cost is higher, automation saves 20+ hours weekly.",
              breakdownNotes: "Focus on business value, not defensive explanations."
            }
          ]
        },
        {
          id: 'w3d21',
          dayNumber: 21,
          weekNumber: 3,
          title: 'Week 3 Graduation: Live Executive Boardroom Simulation',
          nativeTitle: sourceCode === 'hi' ? 'सप्ताह 3 परीक्षा: एग्जीक्यूटिव बोर्डरूम सिमुलेशन' : 'Week 3 Milestone: Boardroom Simulation',
          scenario: 'Pitching a new initiative to senior executives',
          iconType: 'chest',
          isChest: true,
          conversationGoal: 'Present your idea, defend against 2 tough questions, and close with conviction.',
          rewardXp: 250,
          phrases: [
            {
              id: 'p22',
              targetText: isEnglishTarget
                ? "With this strategic initiative, we are positioned to lead the market and deliver exceptional shareholder value."
                : isGermanTarget
                ? "Mit dieser strategischen Initiative sind wir bestens positioniert, um den Markt anzuführen und außergewöhnlichen Mehrwert zu schaffen."
                : "With this strategy, we will lead the market.",
              transliteration: isEnglishTarget
                ? "विद दिस स्ट्रैटेजिक इनिशिएटिव, वी आर पोजिशन्ड टू लीड द मार्केट एंड डिलीवर एक्सेप्शनल शेयरहोल्डर वैल्यू।"
                : "विद दिस...",
              sourceTranslation: sourceCode === 'hi'
                ? "इस रणनीतिक पहल के साथ, हम बाज़ार का नेतृत्व करने और असाधारण मूल्य प्रदान करने के लिए पूरी तरह तैयार हैं।"
                : "With this strategy, we are ready to lead and create value.",
              breakdownNotes: "Command the room with sovereign poise."
            }
          ]
        }
      ]
    },

    {
      weekNumber: 4,
      title: 'Week 4: High-Stakes Mastery & Career Readiness',
      nativeTitle: sourceCode === 'hi' ? 'सप्ताह 4: जॉब इंटरव्यू, वीज़ा और सर्वोच्च फ्लूएंसी' : `Week 4: High-Stakes Mastery & Interviews`,
      subtitle: `Master job interviews, embassy visa questions, impromptu debates, and salary negotiations.`,
      theme: 'Unstoppable Fluency',
      milestoneName: 'The Sovereign Polyglot Crown',
      colorGradient: 'from-purple-600 via-pink-600 to-amber-500',
      lessons: [
        {
          id: 'w4d22',
          dayNumber: 22,
          weekNumber: 4,
          title: '"Tell Me About Yourself" (The Winning Formula)',
          nativeTitle: sourceCode === 'hi' ? '"अपने बारे में बताएं" — सबसे सटीक और प्रभावशाली फॉर्मूला' : 'Tell Me About Yourself',
          scenario: 'Opening question in top corporate / MNC job interview',
          iconType: 'interview',
          conversationGoal: 'Deliver Past -> Present -> Future career trajectory in 90 seconds.',
          rewardXp: 150,
          phrases: [
            {
              id: 'p23',
              targetText: isEnglishTarget
                ? "I am a proactive software engineer with a deep passion for building scalable solutions that empower communities."
                : isGermanTarget
                ? "Ich bin ein engagierter Software-Ingenieur mit einer großen Leidenschaft für die Entwicklung skalierbarer Lösungen."
                : "I am a proactive engineer passionate about building scalable solutions.",
              transliteration: isEnglishTarget
                ? "आई ऍम अ प्रोएक्टिव सॉफ्टवेयर इंजीनियर विद अ डीप पैशन फॉर बिल्डिंग स्केलेबल सॉल्यूशंस दैट एम्पावर कम्युनिटीज।"
                : "आई ऍम अ प्रोएक्टिव...",
              sourceTranslation: sourceCode === 'hi'
                ? "मैं एक सक्रिय सॉफ्टवेयर इंजीनियर हूँ, जिसे ऐसे स्केलेबल समाधान बनाने का गहरा जुनून है जो समुदायों को सशक्त बनाते हैं।"
                : "I am a proactive engineer passionate about scalable solutions.",
              breakdownNotes: "Never recite your resume line-by-line; tell your growth story."
            }
          ]
        },
        {
          id: 'w4d23',
          dayNumber: 23,
          weekNumber: 4,
          title: 'Framing Strengths, Weaknesses & Learnings',
          nativeTitle: sourceCode === 'hi' ? 'कमजोरियों को ताकत और सीख के रूप में बताना' : 'Strengths & Growth Areas',
          scenario: 'Interview question: "What is your greatest weakness?"',
          iconType: 'interview',
          conversationGoal: 'Present an authentic weakness followed by active steps you take to overcome it.',
          rewardXp: 160,
          phrases: [
            {
              id: 'p24',
              targetText: isEnglishTarget
                ? "Earlier, I struggled with delegation, but I have now implemented structured tracking systems to trust my team fully."
                : isGermanTarget
                ? "Früher fiel mir das Delegieren schwer, aber inzwischen nutze ich strukturierte Systeme, um meinem Team voll zu vertrauen."
                : "Earlier I struggled with delegation, but now I use tracking systems.",
              transliteration: isEnglishTarget
                ? "अर्लियर, आई स्ट्रगल्ड विद डेलीगेशन, बट आई हैव नाउ इम्प्लीमेंटेड स्ट्रक्चर्ड ट्रैकिंग सिस्टम्स टू ट्रस्ट माय टीम फुल्ली।"
                : "अर्लियर, आई...",
              sourceTranslation: sourceCode === 'hi'
                ? "पहले मुझे काम दूसरों को सौंपने में कठिनाई होती थी, लेकिन अब मैंने अपनी टीम पर पूरा भरोसा करने के लिए संरचित ट्रैकिंग सिस्टम लागू किए हैं।"
                : "Earlier I struggled with delegation, but now use structured systems.",
              breakdownNotes: "Shows emotional intelligence and continuous self-improvement."
            }
          ]
        },
        {
          id: 'w4d24',
          dayNumber: 24,
          weekNumber: 4,
          title: 'Handling Behavioral Questions (STAR Method)',
          nativeTitle: sourceCode === 'hi' ? 'व्यवहार संबंधी प्रश्न और STAR तकनीक' : 'Behavioral & STAR Method',
          scenario: '"Tell me about a time you handled a difficult client or crisis."',
          iconType: 'interview',
          conversationGoal: 'Explain Situation, Task, Action, and Result clearly.',
          rewardXp: 170,
          phrases: [
            {
              id: 'p25',
              targetText: isEnglishTarget
                ? "When our server crashed during peak hours, I quickly coordinated the recovery, reducing downtime to just 8 minutes."
                : isGermanTarget
                ? "Als unser Server zu Spitzenzeiten ausfiel, koordinierte ich schnell die Wiederherstellung und verkürzte die Ausfallzeit auf nur 8 Minuten."
                : "During a peak crash, I coordinated recovery and reduced downtime to 8 minutes.",
              transliteration: isEnglishTarget
                ? "व्हेन आवर सर्वर क्रैश्ड ड्यूरिंग पीक आवर्स, आई क्विकली कोऑर्डिनेटेड द रिकवरी, रिड्यूसिंग डाउनटाइम टू जस्ट 8 मिनट्स।"
                : "व्हेन आवर सर्वर...",
              sourceTranslation: sourceCode === 'hi'
                ? "जब पीक ऑवर्स के दौरान हमारा सर्वर क्रैश हुआ, तो मैंने तुरंत रिकवरी का समन्वय किया और डाउनटाइम को घटाकर केवल 8 मिनट कर दिया।"
                : "During peak outage, I coordinated recovery and cut downtime to 8 mins.",
              breakdownNotes: "Metrics make stories 10x more credible."
            }
          ]
        },
        {
          id: 'w4d25',
          dayNumber: 25,
          weekNumber: 4,
          title: 'Salary & Compensation Negotiation',
          nativeTitle: sourceCode === 'hi' ? 'सैलरी और पैकेज पर गर्व से बातचीत' : 'Salary Negotiation',
          scenario: 'HR asks: "What are your salary expectations?"',
          iconType: 'interview',
          conversationGoal: 'Anchor in market benchmarks and your demonstrated track record.',
          rewardXp: 180,
          phrases: [
            {
              id: 'p26',
              targetText: isEnglishTarget
                ? "Based on the scope of this role and current market benchmarks, I am targeting a package in the range of twenty to twenty-four LPA."
                : isGermanTarget
                ? "Basierend auf dem Umfang dieser Rolle und den Marktstandards strebe ich ein Jahresgehalt von fünfundachtzigtausend Euro an."
                : "Based on the role and market standards, I am targeting this compensation range.",
              transliteration: isEnglishTarget
                ? "बेस्ड ऑन द स्कोप ऑफ दिस रोल एंड करेंट मार्केट बेंचमार्क्स, आई ऍम टारगेटिंग अ पैकेज इन द रेंज ऑफ ट्वेंटी टू ट्वेंटी-फोर एलपीए।"
                : "बेस्ड ऑन द...",
              sourceTranslation: sourceCode === 'hi'
                ? "इस भूमिका के दायरे और मौजूदा बाज़ार मानकों के आधार पर, मैं 20 से 24 लाख प्रति वर्ष के दायरे में पैकेज का लक्ष्य रख रहा हूँ।"
                : "Based on scope and market benchmarks, I am targeting this range.",
              breakdownNotes: "State your number calmly without apology or hesitation."
            }
          ]
        },
        {
          id: 'w4d26',
          dayNumber: 26,
          weekNumber: 4,
          title: 'Visa Consulate Interview (US / Schengen / Japan)',
          nativeTitle: sourceCode === 'hi' ? 'दूतावास वीज़ा इंटरव्यू में आत्मविश्वास' : 'Visa Consulate Interview',
          scenario: 'Answering visa officer questions about ties to home country',
          iconType: 'exam',
          conversationGoal: 'Convince the visa officer of your bona fide intentions and return plans.',
          rewardXp: 190,
          phrases: [
            {
              id: 'p27',
              targetText: isEnglishTarget
                ? "I have deep family and professional ties here in India, and I will be returning promptly upon completing my program."
                : isGermanTarget
                ? "Ich habe tiefe familiäre und berufliche Bindungen hier in Indien und werde nach Abschluss meines Programms sofort zurückkehren."
                : "I have strong ties in India and will return after my program.",
              transliteration: isEnglishTarget
                ? "आई हैव डीप फैमिली एंड प्रोफेशनल टाइज़ हियर इन इंडिया, एंड आई विल बी रिटर्निंग प्रॉम्प्टली अपॉन कम्प्लीटिंग माय प्रोग्राम।"
                : "आई हैव डीप...",
              sourceTranslation: sourceCode === 'hi'
                ? "भारत में मेरे गहरे पारिवारिक और व्यावसायिक संबंध हैं, और मैं अपना कार्यक्रम पूरा होते ही तुरंत वापस आ जाऊँगा।"
                : "I have deep ties here and will return immediately upon completion.",
              breakdownNotes: "Keep answers succinct, honest, and firm."
            }
          ]
        },
        {
          id: 'w4d27',
          dayNumber: 27,
          weekNumber: 4,
          title: 'JAM (Just a Minute) — Impromptu Speaking',
          nativeTitle: sourceCode === 'hi' ? 'तत्काल भाषण (JAM — Just a Minute)' : 'Just-A-Minute (JAM) Drill',
          scenario: 'Given a random topic to speak on for 60 seconds without pausing',
          iconType: 'social',
          conversationGoal: 'Speak for 1 minute on "How Artificial Intelligence Transforms Education".',
          rewardXp: 200,
          phrases: [
            {
              id: 'p28',
              targetText: isEnglishTarget
                ? "Artificial intelligence democratizes knowledge, allowing every student to have a world-class personalized mentor."
                : isGermanTarget
                ? "Künstliche Intelligenz demokratisiert Wissen und ermöglicht jedem Schüler einen erstklassigen persönlichen Mentor."
                : "AI democratizes education and empowers every learner.",
              transliteration: isEnglishTarget
                ? "आर्टिफिशियल इंटेलिजेंस डेमोक्रेटाइज़ेज़ नॉलेज, अलाउइंग एव्री स्टूडेंट टू हैव अ वर्ल्ड-क्लास पर्सनलाइज़्ड मेंटर।"
                : "आर्टिफिशियल...",
              sourceTranslation: sourceCode === 'hi'
                ? "आर्टिफिशियल इंटेलिजेंस ज्ञान का लोकतंत्रीकरण करता है, जिससे प्रत्येक छात्र को एक विश्वस्तरीय व्यक्तिगत शिक्षक मिल सकता है।"
                : "AI democratizes knowledge, giving every student a personal mentor.",
              breakdownNotes: "Structure: Hook -> Core Argument -> Inspiring Conclusion."
            }
          ]
        },
        {
          id: 'w4d28',
          dayNumber: 28,
          weekNumber: 4,
          title: 'Grand Graduation: The Sovereign Polyglot Crown',
          nativeTitle: sourceCode === 'hi' ? 'महा दीक्षांत परीक्षा: संप्रभु बहुभाषी ताज' : 'Grand Graduation Call',
          scenario: 'Comprehensive multi-scenario live graduation call with Arohi',
          iconType: 'chest',
          isChest: true,
          conversationGoal: 'Demonstrate full fluency across social, workplace, and interview scenarios.',
          rewardXp: 500,
          phrases: [
            {
              id: 'p29',
              targetText: isEnglishTarget
                ? "Today I stand confident, articulate, and completely fearless. Language is my superpower!"
                : isGermanTarget
                ? "Heute stehe ich selbstbewusst, wortgewandt und furchtlos da. Sprache ist meine Superkraft!"
                : "Today I speak with total confidence and zero fear!",
              transliteration: isEnglishTarget
                ? "टुडे आई स्टैंड कॉन्फिडेंट, आर्टिकुलेट, एंड कम्प्लीटली फीयरलेस। लैंग्वेज इज़ माय सुपरपावर!"
                : "टुडे आई स्टैंड...",
              sourceTranslation: sourceCode === 'hi'
                ? "आज मैं आत्मविश्वासी, सुस्पष्ट और पूरी तरह से निडर हूँ। भाषा मेरी महाशक्ति है!"
                : "Today I am confident, articulate, and fearless!",
              breakdownNotes: "Congratulations! You have completed the 28-day Sovereign Arohi Speaks Journey!"
            }
          ]
        }
      ]
    }
  ];
}

export const SPEAKS_ROLEPLAY_SCENARIOS: SpeaksRoleplayScenario[] = [
  {
    id: 'sc-starbucks',
    title: 'Starbucks Coffee & Custom Bakery',
    nativeTitle: 'कैफे में ड्रिंक और स्नैक ऑर्डर करना',
    category: 'daily',
    description: 'You are ordering coffee at a lively international café. Customize your milk, sugar, and ask for a toasted croissant.',
    aiPersonaName: 'Emily (Barista)',
    aiRole: 'Friendly Barista at Starbucks downtown',
    userRole: 'Customer ordering morning coffee',
    location: 'Starbucks, Downtown High Street',
    difficulty: 'Beginner',
    systemPromptTemplate: 'You are Emily, an upbeat, friendly barista at a bustling café. Speak naturally, ask if they want whipped cream, iced or hot, and take card payment. Gently prompt them if they hesitate.',
    starterMessage: {
      target: "Hi there! Welcome to Starbucks. What can I get started for you today?",
      transliteration: "हाय देयर! वेलकम टू स्टारबक्स। व्हाट कैन आई गेट स्टार्टेड फॉर यू टुडे?",
      source: "नमस्ते! स्टारबक्स में आपका स्वागत है। आज मैं आपके लिए क्या बनाऊँ?"
    },
    suggestedResponses: [
      "Hi! Could I please get a large cappuccino with oat milk?",
      "Can you make that with caramel syrup and less sugar?",
      "Do you have any warm croissants available?"
    ],
    goals: [
      { id: 'g1', description: 'Order a specific beverage with cup size', completed: false },
      { id: 'g2', description: 'Request a customization (milk/sugar/ice)', completed: false },
      { id: 'g3', description: 'Complete payment with card or phone', completed: false }
    ]
  },
  {
    id: 'sc-airport-customs',
    title: 'International Airport Immigration & Customs',
    nativeTitle: 'अंतर्राष्ट्रीय एयरपोर्ट इमिग्रेशन और कस्टम्स',
    category: 'travel',
    description: 'You have just landed in London Heathrow / Frankfurt / JFK. Answer the immigration officer with precision and calm poise.',
    aiPersonaName: 'Officer Miller',
    aiRole: 'Border Security & Immigration Officer',
    userRole: 'International Traveler arriving at passport control',
    location: 'Heathrow Airport Terminal 5, Border Control',
    difficulty: 'Intermediate',
    systemPromptTemplate: 'You are Officer Miller, a firm but professional border immigration officer. Check passport purpose of visit, return ticket, and accommodation address. Keep questions direct.',
    starterMessage: {
      target: "Good afternoon. Passport and landing card please. What is the primary purpose of your visit?",
      transliteration: "गुड आफ्टरनून। पासपोर्ट एंड लैंडिंग कार्ड प्लीज़। व्हाट इज़ द प्राइमरी पर्पस ऑफ योर विजिट?",
      source: "शुभ दोपहर। कृपया पासपोर्ट और लैंडिंग कार्ड दें। आपकी यात्रा का मुख्य उद्देश्य क्या है?"
    },
    suggestedResponses: [
      "Good afternoon officer, here is my passport. I am visiting for a two-week tech conference.",
      "I will be staying at the Hilton Hotel downtown and have a return flight booked for the 15th.",
      "Here is my conference invitation letter and hotel confirmation."
    ],
    goals: [
      { id: 'g1', description: 'State purpose of visit clearly', completed: false },
      { id: 'g2', description: 'Confirm duration of stay & accommodation', completed: false },
      { id: 'g3', description: 'Present return ticket certainty', completed: false }
    ]
  },
  {
    id: 'sc-job-interview',
    title: 'Top Corporate Tech Job Interview',
    nativeTitle: 'कॉर्पोरेट टेक जॉब इंटरव्यू',
    category: 'career',
    description: 'Interviewing with a Senior Hiring Director. Shine through your project experience and communication clarity.',
    aiPersonaName: 'David Vance (Director of Engineering)',
    aiRole: 'Senior Hiring Manager at Global Tech Firm',
    userRole: 'Candidate interviewing for Engineering / Leadership Role',
    location: 'Google Meet / Zoom Corporate Boardroom',
    difficulty: 'Advanced',
    systemPromptTemplate: 'You are David Vance, Director of Engineering. You value clarity, ownership, and practical results. Ask about their background, handling critical deadlines, and teamwork.',
    starterMessage: {
      target: "Thanks for taking the time to meet today! Let's start with a brief overview of your background and what excites you about this role.",
      transliteration: "थैंक्स फॉर टेकिंग द टाइम टू मीट टुडे! लेट्स स्टार्ट विद अ ब्रीफ ओवरव्यू ऑफ योर बैकग्राउंड एंड व्हाट एक्साइट्स यू अबाउट दिस रोल।",
      source: "आज मिलने के लिए समय निकालने के लिए धन्यवाद! आइए आपकी पृष्ठभूमि और इस पद के प्रति आपके उत्साह के संक्षिप्त विवरण से शुरुआत करें।"
    },
    suggestedResponses: [
      "Thank you David! Over the past four years, I have architected high-performance systems and led critical integrations.",
      "What excites me most about your team is the scale and focus on high-impact customer problems.",
      "I take strong end-to-end ownership from design to deployment."
    ],
    goals: [
      { id: 'g1', description: 'Deliver concise 60-second self-introduction', completed: false },
      { id: 'g2', description: 'Explain a technical accomplishment with metrics', completed: false },
      { id: 'g3', description: 'Ask an insightful question about team culture', completed: false }
    ]
  },
  {
    id: 'sc-doctor-clinic',
    title: 'Medical Clinic & Urgent Health Consultation',
    nativeTitle: 'डॉक्टर क्लिनिक और स्वास्थ्य परामर्श',
    category: 'emergency',
    description: 'Explain sudden symptoms, past allergies, and understand the physician’s prescription advice.',
    aiPersonaName: 'Dr. Sarah Patel',
    aiRole: 'Attending General Physician',
    userRole: 'Patient consulting for acute symptoms',
    location: 'City Health Clinic, Consultation Room 3',
    difficulty: 'Intermediate',
    systemPromptTemplate: 'You are Dr. Sarah Patel, a compassionate doctor. Ask the patient about onset of symptoms, pain scale from 1 to 10, and explain the treatment clearly.',
    starterMessage: {
      target: "Hello! Come in and take a seat. How can I help you today? What symptoms have you been experiencing?",
      transliteration: "हैलो! कम इन एंड टेक अ सीट। हाउ कैन आई हेल्प यू टुडे? व्हाट सिम्पटम्स हैव यू बीन एक्सपीरियंसिंग?",
      source: "नमस्ते! अंदर आइए और बैठिए। आज मैं आपकी क्या मदद कर सकती हूँ? आपको क्या लक्षण महसूस हो रहे हैं?"
    },
    suggestedResponses: [
      "Hello doctor, I have had acute stomach cramps and a mild fever since last night.",
      "The pain is around a 6 out of 10 and feels worse after meals.",
      "I am not allergic to any medications as far as I know."
    ],
    goals: [
      { id: 'g1', description: 'Describe specific symptoms and timeline', completed: false },
      { id: 'g2', description: 'State pain level on scale of 1-10', completed: false },
      { id: 'g3', description: 'Clarify dosage instructions for medication', completed: false }
    ]
  }
];

export const INITIAL_VOCAB_CARDS: SpeaksVocabCard[] = [
  {
    id: 'vc-1',
    targetWord: 'Perseverance',
    transliteration: 'पर्सिवियरेंस',
    meaning: 'निरंतर प्रयास / दृढ़ता (Never giving up despite hurdles)',
    partOfSpeech: 'Noun',
    exampleSentenceTarget: 'Her perseverance through challenging times earned her tremendous success.',
    exampleSentenceSource: 'कठिन समय में उनकी दृढ़ता ने उन्हें जबरदस्त सफलता दिलाई।',
    sourceLang: 'hi',
    targetLang: 'en',
    masteryLevel: 3,
    timesReviewed: 5,
    lastReviewedAt: '2026-09-22',
    tags: ['Mindset', 'Leadership']
  },
  {
    id: 'vc-2',
    targetWord: 'Articulate',
    transliteration: 'आर्टिकुलेट',
    meaning: 'विचारों को स्पष्ट और प्रभावशाली रूप में व्यक्त करना',
    partOfSpeech: 'Verb / Adjective',
    exampleSentenceTarget: 'He was able to articulate complex ideas with remarkable simplicity.',
    exampleSentenceSource: 'वह जटिल विचारों को उल्लेखनीय सादगी के साथ स्पष्ट रूप से व्यक्त करने में सक्षम थे।',
    sourceLang: 'hi',
    targetLang: 'en',
    masteryLevel: 4,
    timesReviewed: 7,
    lastReviewedAt: '2026-09-22',
    tags: ['Communication', 'Interview']
  },
  {
    id: 'vc-3',
    targetWord: 'Plausible',
    transliteration: 'प्लॉसिबल',
    meaning: 'तर्कसंगत / विश्वसनीय (Reasonable and likely to be true)',
    partOfSpeech: 'Adjective',
    exampleSentenceTarget: 'The engineer presented a very plausible explanation for the unexpected anomaly.',
    exampleSentenceSource: 'इंजीनियर ने अप्रत्याशित समस्या का बहुत ही विश्वसनीय स्पष्टीकरण प्रस्तुत किया।',
    sourceLang: 'hi',
    targetLang: 'en',
    masteryLevel: 2,
    timesReviewed: 3,
    lastReviewedAt: '2026-09-21',
    tags: ['Workplace', 'Logic']
  },
  {
    id: 'vc-4',
    targetWord: 'Guten Tag',
    transliteration: 'गुटेन टाग',
    meaning: 'शुभ दिन / नमस्ते (Good day / Hello in German)',
    partOfSpeech: 'Greeting',
    exampleSentenceTarget: 'Guten Tag! Wie kann ich Ihnen heute behilflich sein?',
    exampleSentenceSource: 'नमस्ते! आज मैं आपकी क्या मदद कर सकता हूँ?',
    sourceLang: 'hi',
    targetLang: 'de',
    masteryLevel: 5,
    timesReviewed: 10,
    lastReviewedAt: '2026-09-23',
    tags: ['German', 'Greetings']
  }
];

export const DEFAULT_USER_PROGRESS: SpeaksUserProgress = {
  sourceLanguageCode: 'hi',
  targetLanguageCode: 'en',
  currentDay: 1,
  completedDays: [],
  unlockedChests: [],
  totalXp: 120,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  savedWordsCount: 4,
  fluencyScore: 78,
  accuracyHistory: [
    { date: 'Day 1', score: 72, wpm: 95 },
    { date: 'Day 2', score: 76, wpm: 108 },
    { date: 'Day 3', score: 81, wpm: 115 }
  ]
};
