// Arohi AI — 12+ Official Indian Languages Definition & Translation Matrix
// Empowers programmatic multilingual SEO, hreflang alternate tags, native-script headings, and localization.

export interface IndianLanguageConfig {
  code: string; // 'en' | 'hi' | 'or' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'kn' | 'ml' | 'pa' | 'as'
  locale: string; // 'en-IN' | 'hi-IN' | 'or-IN' etc.
  nameEnglish: string;
  nameNative: string;
  script: string;
  direction: 'ltr' | 'rtl';
  popularRegions: string[];
  mockTestLabel: string;
  freeCbtLabel: string;
  syllabusLabel: string;
  previousPapersLabel: string;
  startTestLabel: string;
  allIndiaRankLabel: string;
  instantResultLabel: string;
  negativeMarkingLabel: string;
  questionsLabel: string;
  durationLabel: string;
  totalMarksLabel: string;
  viewSolutionsLabel: string;
  aiRemedialLabel: string;
  seoDescriptionTemplate: (examName: string, stateOrBoard: string) => string;
  seoH1Template: (examName: string, year?: number) => string;
}

export const INDIAN_LANGUAGES_REGISTRY: Record<string, IndianLanguageConfig> = {
  en: {
    code: 'en',
    locale: 'en-IN',
    nameEnglish: 'English',
    nameNative: 'English',
    script: 'Latin',
    direction: 'ltr',
    popularRegions: ['All-India', 'Pan-India Central Exams', 'Higher Education'],
    mockTestLabel: 'Mock Test Series',
    freeCbtLabel: 'Free Online CBT Practice',
    syllabusLabel: 'Official Syllabus & Pattern',
    previousPapersLabel: 'Previous Years Question Papers (PYQ)',
    startTestLabel: 'Appear Now (Live CBT)',
    allIndiaRankLabel: 'All-India Real-Time Rank',
    instantResultLabel: 'Instant Detailed Analysis',
    negativeMarkingLabel: 'Negative Marking',
    questionsLabel: 'Questions',
    durationLabel: 'Duration',
    totalMarksLabel: 'Total Marks',
    viewSolutionsLabel: 'Step-by-Step Solutions',
    aiRemedialLabel: 'Arohi AI Weakness Remediation',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `Practice free online CBT mock tests for ${examName} (${stateOrBoard}) 2026. Features real exam interface, negative marking scheme, bilingual questions, and instant All-India Rank analytics with Arohi AI.`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} Online CBT Mock Test Series ${year} — Free Practice & Solutions`
  },

  hi: {
    code: 'hi',
    locale: 'hi-IN',
    nameEnglish: 'Hindi',
    nameNative: 'हिन्दी',
    script: 'Devanagari',
    direction: 'ltr',
    popularRegions: ['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Rajasthan', 'Delhi', 'Haryana', 'Jharkhand', 'Uttarakhand', 'Chhattisgarh', 'Himachal Pradesh'],
    mockTestLabel: 'मॉक टेस्ट सीरीज़',
    freeCbtLabel: 'निःशुल्क ऑनलाइन सीबीटी अभ्यास',
    syllabusLabel: 'आधिकारिक पाठ्यक्रम और परीक्षा पैटर्न',
    previousPapersLabel: 'पिछले वर्षों के प्रश्न पत्र (PYQ)',
    startTestLabel: 'अभी परीक्षा दें (लाइव CBT)',
    allIndiaRankLabel: 'अखिल भारतीय रैंक (AIR)',
    instantResultLabel: 'तुरंत विस्तृत परिणाम व विश्लेषण',
    negativeMarkingLabel: 'नकारात्मक अंकन',
    questionsLabel: 'कुल प्रश्न',
    durationLabel: 'समय',
    totalMarksLabel: 'पूर्णांक',
    viewSolutionsLabel: 'व्याख्या सहित हल',
    aiRemedialLabel: 'आरोही एआई व्यक्तिगत सुधार मार्गदर्शन',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 के लिए निःशुल्क ऑनलाइन CBT मॉक टेस्ट का अभ्यास करें। आधिकारिक परीक्षा पैटर्न, नेगेटिव मार्किंग और आरोही AI विस्तृत समाधान व AIR रैंकिंग के साथ।`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} ऑनलाइन CBT मॉक टेस्ट सीरीज़ ${year} — फ्री अभ्यास और समाधान`
  },

  or: {
    code: 'or',
    locale: 'or-IN',
    nameEnglish: 'Odia',
    nameNative: 'ଓଡ଼ିଆ',
    script: 'Odia',
    direction: 'ltr',
    popularRegions: ['Odisha'],
    mockTestLabel: 'ମକ୍ ଟେଷ୍ଟ ସିରିଜ୍',
    freeCbtLabel: 'ମାଗଣା ଅନଲାଇନ୍ CBT ଅଭ୍ୟାସ',
    syllabusLabel: 'ଅଫିସିଆଲ୍ ପାଠ୍ୟକ୍ରମ ଏବଂ ପରୀକ୍ଷା ପ୍ୟାଟର୍ଣ୍ଣ',
    previousPapersLabel: 'ବିଗତ ବର୍ଷର ପ୍ରଶ୍ନପତ୍ର (PYQ)',
    startTestLabel: 'ଏବେ ପରୀକ୍ଷା ଦିଅନ୍ତୁ (CBT)',
    allIndiaRankLabel: 'ସର୍ବଭାରତୀୟ / ରାଜ୍ୟ ରାଙ୍କ୍',
    instantResultLabel: 'ତୁରନ୍ତ ଫଳାଫଳ ଓ ବିସ୍ତୃତ ବିଶ୍ଳେଷଣ',
    negativeMarkingLabel: 'ନେଗେଟିଭ୍ ମାର୍କିଂ',
    questionsLabel: 'ମୋଟ ପ୍ରଶ୍ନ',
    durationLabel: 'ସମୟସୀମା',
    totalMarksLabel: 'ମୋଟ ମାର୍କ',
    viewSolutionsLabel: 'ପ୍ରତ୍ୟେକ ପ୍ରଶ୍ନର ବ୍ୟାଖ୍ୟା ଓ ସମାଧାନ',
    aiRemedialLabel: 'ଆରୋହୀ ଏଆଇ ଦୁର୍ବଳତା ସଂଶୋଧନ ଗାଇଡ୍',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 ପାଇଁ ମାଗଣା ଅନଲାଇନ୍ CBT ମକ୍ ଟେଷ୍ଟ ଅଭ୍ୟାସ କରନ୍ତୁ। ପ୍ରକୃତ ପରୀକ୍ଷା ପରିବେଶ, ନେଗେଟିଭ୍ ମାର୍କିଂ, ଓଡ଼ିଆ ଓ ଇଂରାଜୀ ପ୍ରଶ୍ନ ଏବଂ ଆରୋହୀ ଏଆଇ ତୁରନ୍ତ ସମାଧାନ।`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} ଅନଲାଇନ୍ CBT ମକ୍ ଟେଷ୍ଟ ${year} — ମାଗଣା ଅଭ୍ୟାସ ଓ ସମାଧାନ`
  },

  bn: {
    code: 'bn',
    locale: 'bn-IN',
    nameEnglish: 'Bengali',
    nameNative: 'বাংলা',
    script: 'Bengali',
    direction: 'ltr',
    popularRegions: ['West Bengal', 'Tripura', 'Assam'],
    mockTestLabel: 'মক টেস্ট সিরিজ',
    freeCbtLabel: 'বিনামূল্যে অনলাইন সিবিটি অনুশীলন',
    syllabusLabel: 'অফিসিয়াল সিলেবাস ও পরীক্ষার প্যাটার্ন',
    previousPapersLabel: 'বিগত বছরের প্রশ্নপত্র (PYQ)',
    startTestLabel: 'এখনই পরীক্ষা দিন (Live CBT)',
    allIndiaRankLabel: 'অল ইন্ডিয়া / রাজ্য র‍্যাঙ্ক',
    instantResultLabel: 'তাত্ক্ষণিক ফলাফল ও বিশ্লেষণ',
    negativeMarkingLabel: 'নেগেটিভ মার্কিং',
    questionsLabel: 'মোট প্রশ্ন',
    durationLabel: 'সময়সীমা',
    totalMarksLabel: 'মোট নম্বর',
    viewSolutionsLabel: 'ধাপে ধাপে ব্যাখ্যা ও সমাধান',
    aiRemedialLabel: 'আরোহী এআই দুর্বলতা প্রতিকার নির্দেশিকা',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 পরীক্ষার জন্য বিনামূল্যে অনলাইন CBT মক টেস্ট দিন। রিয়েল টাইম টাইমার, নেগেটিভ মার্কিং এবং আরোহী AI এর মাধ্যমে নির্ভুল সমাধান।`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} অনলাইন CBT মক টেস্ট ${year} — বিনামূল্যে প্রস্তুতি ও সমাধান`
  },

  te: {
    code: 'te',
    locale: 'te-IN',
    nameEnglish: 'Telugu',
    nameNative: 'తెలుగు',
    script: 'Telugu',
    direction: 'ltr',
    popularRegions: ['Andhra Pradesh', 'Telangana'],
    mockTestLabel: 'మాక్ టెస్ట్ సిరీస్',
    freeCbtLabel: 'ఉచిత ఆన్‌లైన్ CBT ప్రాక్టీస్',
    syllabusLabel: 'అధికారిక సిలబస్ & పరీక్షా విధానం',
    previousPapersLabel: 'గత సంవత్సరాల ప్రశ్నపత్రాలు (PYQ)',
    startTestLabel: 'ఇప్పుడే పరీక్ష రాయండి (CBT)',
    allIndiaRankLabel: 'ఆల్ ఇండియా / స్టేట్ ర్యాంక్',
    instantResultLabel: 'తక్షణ ఫలితాలు & వివరణాత్మక విశ్లేషణ',
    negativeMarkingLabel: 'నెగెటివ్ మార్కింగ్',
    questionsLabel: 'మొత్తం ప్రశ్నలు',
    durationLabel: 'సమయం',
    totalMarksLabel: 'మొత్తం మార్కులు',
    viewSolutionsLabel: 'స్టెప్-బై-స్టెప్ సమాధానాలు',
    aiRemedialLabel: 'ఆరోహి AI వ్యక్తిగతీకరించిన మార్గదర్శకత్వం',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 పరీక్షలకు ఉచిత ఆన్‌లైన్ CBT మాక్ టెస్ట్‌లను ప్రాక్టీస్ చేయండి. అధికారిక పరీక్ష విధానం, నెగెటివ్ మార్కింగ్ మరియు ఆరోహి AI విశ్లేషణతో.`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} ఆన్‌లైన్ CBT మాక్ టెస్ట్ సిరీస్ ${year} — ఉచిత ప్రాక్టీస్ & సమాధానాలు`
  },

  mr: {
    code: 'mr',
    locale: 'mr-IN',
    nameEnglish: 'Marathi',
    nameNative: 'मराठी',
    script: 'Devanagari',
    direction: 'ltr',
    popularRegions: ['Maharashtra', 'Goa'],
    mockTestLabel: 'मॉक टेस्ट मालिका',
    freeCbtLabel: 'मोफत ऑनलाइन सीबीटी सराव',
    syllabusLabel: 'अधिकृत अभ्यासक्रम आणि परीक्षा पद्धती',
    previousPapersLabel: 'मागील वर्षांच्या प्रश्नपत्रिका (PYQ)',
    startTestLabel: 'आता परीक्षा द्या (Live CBT)',
    allIndiaRankLabel: 'अखिल भारतीय / राज्य रँक',
    instantResultLabel: 'त्वरित निकाल आणि सखोल विश्लेषण',
    negativeMarkingLabel: 'नकारात्मक गुण पद्धत',
    questionsLabel: 'एकूण प्रश्न',
    durationLabel: 'वेळ',
    totalMarksLabel: 'एकूण गुण',
    viewSolutionsLabel: 'स्पष्टीकरणासह उत्तरे',
    aiRemedialLabel: 'आरोही एआय वैयक्तिक सुधारणा मार्गदर्शन',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 परीक्षेसाठी मोफत ऑनलाइन CBT मॉक टेस्टचा सराव करा. अधिकृत पॅटर्न, निगेटिव्ह मार्किंग आणि आरोही AI तपशीलवार उत्तरांसह.`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} ऑनलाइन CBT मॉक टेस्ट ${year} — मोफत सराव व उत्तरे`
  },

  ta: {
    code: 'ta',
    locale: 'ta-IN',
    nameEnglish: 'Tamil',
    nameNative: 'தமிழ்',
    script: 'Tamil',
    direction: 'ltr',
    popularRegions: ['Tamil Nadu', 'Puducherry'],
    mockTestLabel: 'மாதிரித் தேர்வுத் தொடர்',
    freeCbtLabel: 'இலவச ஆன்லைன் CBT பயிற்சி',
    syllabusLabel: 'அதிகாரப்பூர்வ பாடத்திட்டம் & தேர்வு முறை',
    previousPapersLabel: 'முந்தைய ஆண்டு வினாத்தாள்கள் (PYQ)',
    startTestLabel: 'இப்போதே தேர்வு எழுதுங்கள் (CBT)',
    allIndiaRankLabel: 'அகில இந்திய / மாநில தரவரிசை',
    instantResultLabel: 'உடனடி முடிவுகள் & விரிவான பகுப்பாய்வு',
    negativeMarkingLabel: 'எதிர்மறை மதிப்பெண்',
    questionsLabel: 'மொத்த வினாக்கள்',
    durationLabel: 'கால அளவு',
    totalMarksLabel: 'மொத்த மதிப்பெண்கள்',
    viewSolutionsLabel: 'விளக்கங்களுடன் கூடிய விடைகள்',
    aiRemedialLabel: 'ஆரோஹி AI வழிகாட்டுதல்',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 தேர்வுகளுக்கான இலவச ஆன்லைன் CBT மாதிரித் தேர்வுகளைப் பயிற்சி செய்யுங்கள். துல்லியமான விடைகள் மற்றும் அகில இந்திய தரவரிசையுடன்.`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} ஆன்லைன் CBT மாதிரித் தேர்வு ${year} — இலவச பயிற்சி மற்றும் தீர்வுகள்`
  },

  gu: {
    code: 'gu',
    locale: 'gu-IN',
    nameEnglish: 'Gujarati',
    nameNative: 'ગુજરાતી',
    script: 'Gujarati',
    direction: 'ltr',
    popularRegions: ['Gujarat'],
    mockTestLabel: 'મોક ટેસ્ટ શ્રેણી',
    freeCbtLabel: 'મફત ઑનલાઇન CBT પ્રેક્ટિસ',
    syllabusLabel: 'સત્તાવાર અભ્યાસક્રમ અને પરીક્ષા પદ્ધતિ',
    previousPapersLabel: 'પાછલા વર્ષોના પ્રશ્નપત્રો (PYQ)',
    startTestLabel: 'હમણાં પરીક્ષા આપો (CBT)',
    allIndiaRankLabel: 'ઑલ ઇન્ડિયા / રાજ્ય રેન્ક',
    instantResultLabel: 'ત્વરિત પરિણામ અને વિગતવાર વિશ્લેષણ',
    negativeMarkingLabel: 'નેગેટિવ માર્કિંગ',
    questionsLabel: 'કુલ પ્રશ્નો',
    durationLabel: 'સમય',
    totalMarksLabel: 'કુલ ગુણ',
    viewSolutionsLabel: 'સમજૂતી સાથે ઉકેલો',
    aiRemedialLabel: 'આરોહી AI માર્ગદર્શન',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 માટે મફત ઑનલાઇન CBT મોક ટેસ્ટની પ્રેક્ટિસ કરો. સાચા પરીક્ષા માહોલ, નેગેટિવ માર્કિંગ અને આરોહી AI વિગતવાર જવાબો સાથે.`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} ઑનલાઇન CBT મોક ટેસ્ટ ${year} — મફત પ્રેક્ટિસ અને જવાબો`
  },

  kn: {
    code: 'kn',
    locale: 'kn-IN',
    nameEnglish: 'Kannada',
    nameNative: 'ಕನ್ನಡ',
    script: 'Kannada',
    direction: 'ltr',
    popularRegions: ['Karnataka'],
    mockTestLabel: 'ಮಾಕ್ ಟೆಸ್ಟ್ ಸರಣಿ',
    freeCbtLabel: 'ಉಚಿತ ಆನ್‌ಲೈನ್ CBT ಅಭ್ಯಾಸ',
    syllabusLabel: 'ಅಧಿಕೃತ ಪಠ್ಯಕ್ರಮ ಮತ್ತು ಪರೀಕ್ಷಾ ವಿಧಾನ',
    previousPapersLabel: 'ಹಿಂದಿನ ವರ್ಷಗಳ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು (PYQ)',
    startTestLabel: 'ಈಗಲೇ ಪರೀಕ್ಷೆ ಬರೆಯಿರಿ (CBT)',
    allIndiaRankLabel: 'ಅಖಿಲ ಭಾರತ / ರಾಜ್ಯ ಶ್ರೇಣಿ',
    instantResultLabel: 'ತ್ವರಿತ ಫಲಿತಾಂಶ ಮತ್ತು ವಿವರವಾದ ವಿಶ್ಲೇಷಣೆ',
    negativeMarkingLabel: 'ನೆಗೆಟಿವ್ ಅಂಕಗಳು',
    questionsLabel: 'ಒಟ್ಟು ಪ್ರಶ್ನೆಗಳು',
    durationLabel: 'ಸಮಯಾವಧಿ',
    totalMarksLabel: 'ಒಟ್ಟು ಅಂಕಗಳು',
    viewSolutionsLabel: 'ವಿವರಣೆಯೊಂದಿಗೆ ಉತ್ತರಗಳು',
    aiRemedialLabel: 'ಆರೋಹಿ AI ಸುಧಾರಣಾ ಮಾರ್ಗದರ್ಶನ',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 ಗಾಗಿ ಉಚಿತ ಆನ್‌ಲೈನ್ CBT ಮಾಕ್ ಪರೀಕ್ಷೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ. ಅಧಿಕೃತ ಪರೀಕ್ಷಾ ಮಾದರಿ, ನೆಗೆಟಿವ್ ಅಂಕಗಳು ಮತ್ತು ನಿಖರ ಉತ್ತರಗಳೊಂದಿಗೆ.`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} ಆನ್‌ಲೈನ್ CBT ಮಾಕ್ ಟೆಸ್ಟ್ ಸರಣಿ ${year} — ಉಚಿತ ಅಭ್ಯಾಸ ಮತ್ತು ಉತ್ತರಗಳು`
  },

  ml: {
    code: 'ml',
    locale: 'ml-IN',
    nameEnglish: 'Malayalam',
    nameNative: 'മലയാളം',
    script: 'Malayalam',
    direction: 'ltr',
    popularRegions: ['Kerala', 'Lakshadweep'],
    mockTestLabel: 'മോക്ക് ടെസ്റ്റ് പരമ്പര',
    freeCbtLabel: 'സൗജന്യ ഓൺലൈൻ സിബിടി പരിശീലനം',
    syllabusLabel: 'ഔദ്യോഗിക സിലബസും പരീക്ഷാ പാറ്റേണും',
    previousPapersLabel: 'മുൻവർഷങ്ങളിലെ ചോദ്യപേപ്പറുകൾ (PYQ)',
    startTestLabel: 'ഇപ്പോൾ പരീക്ഷ എഴുതുക (CBT)',
    allIndiaRankLabel: 'ഓൾ ഇന്ത്യ / സംസ്ഥാന റാങ്ക്',
    instantResultLabel: 'തൽക്ഷണ ഫലവും സമഗ്രമായ വിശകലനവും',
    negativeMarkingLabel: 'നെഗറ്റീവ് മാർക്കിംഗ്',
    questionsLabel: 'ആകെ ചോദ്യങ്ങൾ',
    durationLabel: 'സമയം',
    totalMarksLabel: 'ആകെ മാർക്ക്',
    viewSolutionsLabel: 'വിശദീകരണങ്ങളോടെയുള്ള ഉത്തരങ്ങൾ',
    aiRemedialLabel: 'ആരോഹി AI വ്യക്തിഗത മാർഗ്ഗനിർദ്ദേശം',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 പരീക്ഷകൾക്കായി സൗജന്യ ഓൺലൈൻ CBT മോക്ക് ടെസ്റ്റുകൾ പരിശീലിക്കുക. നെഗറ്റീവ് മാർക്കിംഗും കൃത്യമായ വിശദീകരണങ്ങളും സഹിതം.`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} ഓൺലൈൻ CBT മോക്ക് ടെസ്റ്റ് ${year} — സൗജന്യ പരിശീലനവും ഉത്തരങ്ങളും`
  },

  pa: {
    code: 'pa',
    locale: 'pa-IN',
    nameEnglish: 'Punjabi',
    nameNative: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    direction: 'ltr',
    popularRegions: ['Punjab', 'Chandigarh'],
    mockTestLabel: 'ਮੌਕ ਟੈਸਟ ਸੀਰੀਜ਼',
    freeCbtLabel: 'ਮੁਫ਼ਤ ਆਨਲਾਈਨ ਸੀਬੀਟੀ ਅਭਿਆਸ',
    syllabusLabel: 'ਅਧਿਕਾਰਤ ਸਿਲੇਬਸ ਅਤੇ ਪ੍ਰੀਖਿਆ ਪੈਟਰਨ',
    previousPapersLabel: 'ਪਿਛਲੇ ਸਾਲਾਂ ਦੇ ਪ੍ਰਸ਼ਨ ਪੱਤਰ (PYQ)',
    startTestLabel: 'ਹੁਣੇ ਪ੍ਰੀਖਿਆ ਦਿਓ (Live CBT)',
    allIndiaRankLabel: 'ਆਲ ਇੰਡੀਆ / ਸਟੇਟ ਰੈਂਕ',
    instantResultLabel: 'ਤੁਰੰਤ ਨਤੀਜੇ ਅਤੇ ਵਿਸਤ੍ਰਿਤ ਵਿਸ਼ਲੇਸ਼ਣ',
    negativeMarkingLabel: 'ਨੈਗੇਟਿਵ ਮਾਰਕਿੰਗ',
    questionsLabel: 'ਕੁੱਲ ਪ੍ਰਸ਼ਨ',
    durationLabel: 'ਸਮਾਂ',
    totalMarksLabel: 'ਕੁੱਲ ਅੰਕ',
    viewSolutionsLabel: 'ਵਿਆਖਿਆ ਸਮੇਤ ਹੱਲ',
    aiRemedialLabel: 'ਆਰੋਹੀ ਏਆਈ ਮਾਰਗਦਰਸ਼ਨ',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 ਲਈ ਮੁਫ਼ਤ ਆਨਲਾਈਨ CBT ਮੌਕ ਟੈਸਟ ਦਾ ਅਭਿਆਸ ਕਰੋ। ਅਧਿਕਾਰਤ ਪੈਟਰਨ, ਨੈਗੇਟਿਵ ਮਾਰਕਿੰਗ ਅਤੇ ਆਰੋਹੀ AI ਵਿਸਤ੍ਰਿਤ ਹੱਲਾਂ ਨਾਲ।`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} ਆਨਲਾਈਨ CBT ਮੌਕ ਟੈਸਟ ${year} — ਮੁਫ਼ਤ ਅਭਿਆਸ ਅਤੇ ਹੱਲ`
  },

  as: {
    code: 'as',
    locale: 'as-IN',
    nameEnglish: 'Assamese',
    nameNative: 'অসমীয়া',
    script: 'Bengali-Assamese',
    direction: 'ltr',
    popularRegions: ['Assam'],
    mockTestLabel: 'মক টেষ্ট শৃংখলা',
    freeCbtLabel: 'বিনামূলীয়া অনলাইন CBT অনুশীলন',
    syllabusLabel: 'আনুষ্ঠানিক পাঠ্যক্ৰম আৰু পৰীক্ষাৰ ধৰণ',
    previousPapersLabel: 'বিগত বৰ্ষৰ প্ৰশ্নকাকত (PYQ)',
    startTestLabel: 'এতিয়াই পৰীক্ষা দিয়ক (Live CBT)',
    allIndiaRankLabel: 'সৰ্বভাৰতীয় / ৰাজ্যিক ৰেংক',
    instantResultLabel: 'তাত্ক্ষণিক ফলাফল আৰু বিশদ বিশ্লেষণ',
    negativeMarkingLabel: 'ঋণাত্মক নম্বৰ (Negative Marking)',
    questionsLabel: 'মুঠ প্ৰশ্ন',
    durationLabel: 'সময়সীমা',
    totalMarksLabel: 'মুঠ নম্বৰ',
    viewSolutionsLabel: 'ব্যাখ্যা সহ সমাধান',
    aiRemedialLabel: 'আৰোহী এআই নিৰ্দেশনা',
    seoDescriptionTemplate: (examName, stateOrBoard) => 
      `${examName} (${stateOrBoard}) 2026 পৰীক্ষাৰ বাবে বিনামূলীয়া অনলাইন CBT মক টেষ্ট অভ্যাস কৰক। বাস্তৱ পৰীক্ষাৰ অভিজ্ঞতা আৰু আৰোহী AI সঠিক সমাধানৰ সৈতে।`,
    seoH1Template: (examName, year = 2026) => 
      `${examName} অনলাইন CBT মক টেষ্ট ${year} — বিনামূলীয়া অনুশীলন আৰু সমাধান`
  }
};

export const SUPPORTED_LANG_CODES = Object.keys(INDIAN_LANGUAGES_REGISTRY);

export function getLanguageConfig(langCode?: string): IndianLanguageConfig {
  if (!langCode || !INDIAN_LANGUAGES_REGISTRY[langCode]) {
    return INDIAN_LANGUAGES_REGISTRY.en;
  }
  return INDIAN_LANGUAGES_REGISTRY[langCode];
}

// Generate hreflang tag alternates array for programmatic SEO head tags
export function generateHreflangTags(canonicalBaseUrl: string) {
  return SUPPORTED_LANG_CODES.map((code) => {
    const config = INDIAN_LANGUAGES_REGISTRY[code];
    return {
      rel: 'alternate',
      hreflang: config.locale.toLowerCase(),
      href: `${canonicalBaseUrl}?lang=${code}`
    };
  });
}
