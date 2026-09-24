// Voice Studio Data & Showcase Metadata
// Arohi Voice Labs™ Sovereign Indic Audio Architecture

export interface StudioVoice {
  id: string;
  name: string;
  language: string;
  languageCode: string;
  gender: 'female' | 'male';
  category: 'Storyteller' | 'Podcaster' | 'News Anchor' | 'Warm Companion' | 'Formal Guide' | 'Commercial';
  tagline: string;
  description: string;
  discGradient: string; // CSS gradient for tactile vinyl disc
  sampleText: string;
  nativeScript: string;
  accentNote: string;
}

export const REGIONAL_STUDIO_VOICES: StudioVoice[] = [
  {
    id: 'ritu-hindi',
    name: 'Ritu',
    language: 'Hindi',
    languageCode: 'hi',
    gender: 'female',
    category: 'Warm Companion',
    tagline: 'Expressive · Emotional',
    description: 'Empathetic, clear, and nuanced tone ideal for citizen dialogue, audiobooks, and customer care.',
    discGradient: 'from-blue-400 via-indigo-500 to-sky-400',
    sampleText: 'नमस्ते! आरोही वॉइस स्टूडियो में आपका स्वागत है। तकनीक जब अपनी भाषा में बोलती है, तो हर दिल तक पहुँचती है।',
    nativeScript: 'ऋतु (हिंदी)',
    accentNote: 'Standard Khari Boli with natural emotion'
  },
  {
    id: 'priya-odia',
    name: 'Priya',
    language: 'Odia',
    languageCode: 'or',
    gender: 'female',
    category: 'Warm Companion',
    tagline: 'Native · Resonant',
    description: 'Authentic coastal and standard Odia intonation with flawless rounded vowels and respectful cadence.',
    discGradient: 'from-emerald-400 via-teal-500 to-cyan-400',
    sampleText: 'ନମସ୍କାର! ଆରୋହୀ ଧ୍ୱନି ଷ୍ଟୁଡିଓରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ। ପ୍ରତ୍ୟେକଟି ଓଡ଼ିଆ ଶବ୍ଦ ଏଠାରେ ସ୍ୱଚ୍ଛ ଓ ପ୍ରାକୃତିକ ଭାବେ ଶୁଣାଯାଏ।',
    nativeScript: 'ପ୍ରିୟା (ଓଡ଼ିଆ)',
    accentNote: 'Pristine coastal Odia phonetics'
  },
  {
    id: 'arjun-english',
    name: 'Arjun',
    language: 'Indian English',
    languageCode: 'en-in',
    gender: 'male',
    category: 'Podcaster',
    tagline: 'Modern · Dynamic',
    description: 'Crisp Indian English accent perfect for tech podcasts, SaaS explainers, and corporate presentations.',
    discGradient: 'from-amber-400 via-orange-500 to-yellow-400',
    sampleText: 'Welcome to Arohi Voice Labs. Powering the next generation of voice-first conversational AI across Bharat.',
    nativeScript: 'Arjun (Indian English)',
    accentNote: 'Urban Indian corporate and podcast cadence'
  },
  {
    id: 'shreya-tamil',
    name: 'Shreya',
    language: 'Tamil',
    languageCode: 'ta',
    gender: 'female',
    category: 'News Anchor',
    tagline: 'Expressive · Emotional',
    description: 'Clear, dignified Tamil with precise retroflex pronunciation, suitable for broadcasts and edtech.',
    discGradient: 'from-orange-400 via-rose-400 to-amber-400',
    sampleText: 'வணக்கம்! ஆரோஹி வாய்ஸ் லேப்ஸ் உங்களை அன்புடன் வரவேற்கிறது. இயற்கையான குரலில் உங்கள் சிந்தனைகளை ஒலிக்கச் செய்யுங்கள்.',
    nativeScript: 'ஷ்ரேயா (தமிழ்)',
    accentNote: 'Classic Chennai / Kongu clarity'
  },
  {
    id: 'ratan-gujarati',
    name: 'Ratan',
    language: 'Gujarati',
    languageCode: 'gu',
    gender: 'male',
    category: 'Commercial',
    tagline: 'Expressive · Emotional',
    description: 'Enthusiastic and trustworthy tone tailored for commerce, enterprise announcements, and storytelling.',
    discGradient: 'from-lime-400 via-emerald-500 to-green-400',
    sampleText: 'નમસ્તે! આરોહી વોઇસ સ્ટુડિયોમાં તમારું હાર્દિક સ્વાગત છે. વેપાર અને શિક્ષણ માટે સૌથી સચોટ ભારતીય અવાજ.',
    nativeScript: 'રતન (ગુજરાતી)',
    accentNote: 'Authentic Ahmedabad commercial tone'
  },
  {
    id: 'mani-punjabi',
    name: 'Mani',
    language: 'Punjabi',
    languageCode: 'pa',
    gender: 'male',
    category: 'Storyteller',
    tagline: 'Expressive · Emotional',
    description: 'Warm, spirited Punjabi cadence with authentic tonal inflections for media and youth communication.',
    discGradient: 'from-pink-400 via-rose-500 to-fuchsia-400',
    sampleText: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਆਰੋਹੀ ਵੌਇਸ ਸਟੂਡੀਓ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਹਰ ਲਫ਼ਜ਼ ਦਿਲ ਨੂੰ ਛੋਹ ਜਾਵੇਗਾ।',
    nativeScript: 'ਮਨੀ (ਪੰਜਾਬੀ)',
    accentNote: 'Natural Majhi / Doabi cadence'
  },
  {
    id: 'kavita-telugu',
    name: 'Kavita',
    language: 'Telugu',
    languageCode: 'te',
    gender: 'female',
    category: 'Formal Guide',
    tagline: 'Melodious · Clear',
    description: 'Pure, melodious Telugu intonation suited for institutional communication, governance, and e-learning.',
    discGradient: 'from-violet-400 via-purple-500 to-indigo-400',
    sampleText: 'నమస్కారం! ఆరోహి వాయిస్ స్టూడియోకి స్వాగతం. మీ మాటలకు సహజమైన భారతీయ స్వరాన్ని అందించండి.',
    nativeScript: 'కవిత (తెలుగు)',
    accentNote: 'Standard Coastal Andhra & Telangana clarity'
  },
  {
    id: 'debashis-bengali',
    name: 'Debashis',
    language: 'Bengali',
    languageCode: 'bn',
    gender: 'male',
    category: 'Storyteller',
    tagline: 'Lyrical · Warm',
    description: 'Lyrical and deeply expressive Bengali tone with natural vowel rounding for literature and audiobooks.',
    discGradient: 'from-teal-400 via-cyan-500 to-sky-400',
    sampleText: 'নমস্কার! আরোহী ভয়েস স্টুডিওতে আপনাকে স্বাগত জানাই। প্রতিটি শব্দে বাংলার নিজস্ব মাধুর্য ও আবেগ অনুভব করুন।',
    nativeScript: 'দেবাশীষ (বাংলা)',
    accentNote: 'Refined Kolkata literary cadence'
  },
  {
    id: 'pooja-marathi',
    name: 'Pooja',
    language: 'Marathi',
    languageCode: 'mr',
    gender: 'female',
    category: 'Podcaster',
    tagline: 'Crisp · Vibrant',
    description: 'Fast, crisp Marathi diction tuned for news summaries, educational lectures, and banking IVR.',
    discGradient: 'from-amber-400 via-rose-500 to-red-400',
    sampleText: 'नमस्कार! आरोही व्हॉइस स्टुडिओमध्ये आपले सहर्ष स्वागत आहे. अस्सल मराठी लहेजा आणि मानवी भावनांचा मिलाफ.',
    nativeScript: 'पूजा (मराठी)',
    accentNote: 'Standard Pune / Mumbai rhythm'
  },
  {
    id: 'subrat-sambalpuri',
    name: 'Subrat',
    language: 'Sambalpuri / Western Odia',
    languageCode: 'or-sam',
    gender: 'male',
    category: 'Storyteller',
    tagline: 'Folk · Deeply Grounded',
    description: 'Rich Western Odisha regional dialect with organic village cadence, perfect for folk outreach and farmer care.',
    discGradient: 'from-yellow-400 via-emerald-500 to-teal-400',
    sampleText: 'ଜୁହାର! ଆରୋହୀ ଷ୍ଟୁଡିଓରେ ଆପନକୁ ସ୍ୱାଗତ। ଆମର ନିଜର ମାଟିର କଥା ଏବେ ସବୁଠୁ ସ୍ପଷ୍ଟ ଭାବେ ଶୁଣାଯିବା।',
    nativeScript: 'ସୁବ୍ରତ (ସମ୍ବଲପୁରୀ)',
    accentNote: 'Authentic Sambalpuri / Kosali cadence'
  },
  {
    id: 'kiran-malayalam',
    name: 'Kiran',
    language: 'Malayalam',
    languageCode: 'ml',
    gender: 'male',
    category: 'News Anchor',
    tagline: 'Articulate · Authoritative',
    description: 'Accurate Malayalam consonant clusters and compound words without synthetic truncation.',
    discGradient: 'from-emerald-400 via-teal-600 to-green-500',
    sampleText: 'നമസ്കാരം! ആരോഹി വോയ്സ് ലാബ്സിലേക്ക് സ്വാഗതം. കൃത്യമായ ഉച്ചാരണവും സ്വാഭാവികമായ ശബ്ദഭംഗിയും.',
    nativeScript: 'കിരൺ (മലയാളം)',
    accentNote: 'Standard Travancore-Cochin broadcast clarity'
  },
  {
    id: 'asha-kannada',
    name: 'Asha',
    language: 'Kannada',
    languageCode: 'kn',
    gender: 'female',
    category: 'Warm Companion',
    tagline: 'Gentle · Soothing',
    description: 'Soothing and dignified Kannada tone ideal for guided assistance, medical voicebots, and classroom reading.',
    discGradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    sampleText: 'ನಮಸ್ಕಾರ! ಆರೋಹಿ ವಾಯ್ಸ್ ಸ್ಟುಡಿಯೋಗೆ ಸುಸ್ವಾಗತ. ಪ್ರತಿಯೊಂದು ಮಾತಿನಲ್ಲೂ ಸ್ವಾಭಾವಿಕತೆ ಮತ್ತು ಸ್ಪಷ್ಟತೆ.',
    nativeScript: 'ಆಶಾ (ಕನ್ನಡ)',
    accentNote: 'Clean Mysuru / Bengaluru standard Kannada'
  }
];

// Interactive "Hear the Difference" proof cards
export interface ProofCard {
  id: string;
  category: string;
  title: string;
  description: string;
  sampleScript: string;
  language: string;
  voiceName: string;
  badge: string;
  comparisonNote: string;
}

export const HEAR_THE_DIFFERENCE_CARDS: ProofCard[] = [
  {
    id: 'expressive',
    category: 'Expressiveness',
    title: 'Emotion-Rich and Human-Like Voices',
    description: 'Avoid flat, monotone speech. Arohi captures real pauses, gentle breath contours, and emotional warmth.',
    sampleScript: 'जब कोई छात्र पहली बार कोई कठिन गणित समझ जाता है, तो जो खुशी होती है ना... ठीक वही खुशी हमें अपनी तकनीक में महसूस करानी है।',
    language: 'Hindi',
    voiceName: 'Ritu (Hindi)',
    badge: 'Zero Robotic Drone',
    comparisonNote: 'Dynamic pitch variation and natural empathy instead of mechanical frequency'
  },
  {
    id: 'code-switching',
    category: 'Code-Switching',
    title: 'Effortless Language Switching (Hinglish & Vernacular)',
    description: 'Seamlessly weaves between Indian English and mother tongues without sudden accent stumbles or awkward pauses.',
    sampleScript: 'Aapka application approve ho gaya hai, bas document verification ke liye kal bank branch visit kar lijiye.',
    language: 'Hinglish',
    voiceName: 'Arjun (Indian English / Hindi)',
    badge: 'Fluid Bilingual Cadence',
    comparisonNote: 'Preserves native rhythm across sudden English loanwords and terms'
  },
  {
    id: 'pronunciation',
    category: 'Pronunciation',
    title: 'Authentic Pronunciation of Indian Names & Places',
    description: 'Accurately articulates complex Indian surnames, pilgrimage sites, district names, and Sanskrit/Dravidian roots.',
    sampleScript: 'ଭୁବନେଶ୍ୱର, ଜଗତସିଂହପୁର, ବାରିପଦା ଏବଂ ସମ୍ବଲପୁରର ପ୍ରତ୍ୟେକ ନାଗରିକଙ୍କ ପାଇଁ ଆରୋହୀ ଏବେ ସର୍ବଦା ଉପଲବ୍ଧ।',
    language: 'Odia',
    voiceName: 'Priya (Odia)',
    badge: '100% Indian Phoneme Mastery',
    comparisonNote: 'No anglicized flattening of retroflexes (ଟ, ଠ, ଡ, ଢ, ଣ)'
  },
  {
    id: 'abbreviations',
    category: 'Abbreviations',
    title: 'Natural Abbreviations, Acronyms & Currency',
    description: 'Reads out ₹ lakhs, crores, dates, percentages, GSTIN, UDID, and ADIP scheme codes like a seasoned human speaker.',
    sampleScript: 'Under the ADIP scheme, eligible PwD applicants with income below ₹20,000 receive 100% subsidy on assistive devices.',
    language: 'English / Hindi',
    voiceName: 'Arjun & Ritu',
    badge: 'Context-Aware Tokenizer',
    comparisonNote: 'Expands acronyms and currency figures into natural spoken grammar'
  }
];

// Real Production Use Cases
export interface UseCaseData {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  sampleAudioText: string;
}

export const PRODUCTION_USE_CASES: UseCaseData[] = [
  {
    id: 'dubbing-localization',
    title: 'Dubbing & Multilingual Localization',
    category: 'Media, EdTech & Public Broadcasts',
    description: 'Transform keynotes, YouTube videos, and educational series into 11+ Indian languages while maintaining the original speaker\'s emotion and lip timing.',
    tags: ['Public Announcements', 'Educational Content', 'Marketing Promos & Ads', 'Podcasts & Informational Videos'],
    gradient: 'from-blue-900/60 via-slate-900 to-indigo-950/60',
    sampleAudioText: 'Public announcement: Clean water and solar irrigation subsidies are now open across all block development offices.'
  },
  {
    id: 'customer-interaction',
    title: 'Voice Agents & Telephony Calling',
    category: 'Enterprise Customer Operations',
    description: 'Sub-200ms latency voice agents that converse like empathetic, polite human agents over SIP, PSTN, or mobile browser lines.',
    tags: ['Customer Support', 'Sales & Lead Qualification', 'EdTech Tutors', 'Social & Companion Bots'],
    gradient: 'from-amber-900/50 via-slate-900 to-orange-950/60',
    sampleAudioText: 'Namaskar! I am calling from Arohi Care. Your smart mobility cane order has been dispatched and will reach you tomorrow.'
  },
  {
    id: 'training-education',
    title: 'Enterprise Training & Governance Enablement',
    category: 'Workforce & Corporate Learning',
    description: 'Produce high-retention audio walkthroughs, safety drills, and HR onboarding in regional languages for non-English frontline workers.',
    tags: ['Company-wide Announcements', 'Product Walkthroughs', 'Employee Training & Enablement', 'Safety Compliance'],
    gradient: 'from-emerald-900/50 via-slate-900 to-teal-950/60',
    sampleAudioText: 'Step 1: Verify the seal on the safety valve before initiating high-pressure boiler calibration.'
  }
];
