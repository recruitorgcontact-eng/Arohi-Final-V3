// Authentic Indian Voice Personas Registry for Arohi Voice Labs™
// Providing named Indian regional identities with genuine vernacular cadence,
// pitch contours, speech pacing, and authentic Desi accents.

export interface IndianVoicePersona {
  id: string;
  name: string;
  gender: 'female' | 'male';
  title: string;
  region: string;
  languages: string[];
  nativeScript: string;
  accentCadence: string;
  timbreDescription: string;
  pitchHz: number;
  pitchRatio: number; // for Web Speech fallback
  speedRatio: number;
  samplePhrase: string;
  geminiVoice: 'Aoede' | 'Fenrir' | 'Puck' | 'Charon' | 'Kore';
  avatarEmoji: string;
  accentTag: string;
  characterBio: string;
}

export const INDIAN_VOICE_PERSONAS: IndianVoicePersona[] = [
  // --- FEMALE INDIAN VOICES ---
  {
    id: 'arohi-zypher',
    name: 'Arohi (Flagship)',
    gender: 'female',
    title: 'Arohi Sovereign Voice · Sweet & Melodic',
    region: 'Pan-India · Odisha & Delhi',
    languages: ['Hindi', 'Odia', 'Indian English', 'Hinglish'],
    nativeScript: 'ଆରୋହୀ / आरोही',
    accentCadence: 'Sweet, melodious, affectionate Desi rhythm with warm conversational cadence',
    timbreDescription: 'Silky Warm Formants, Soft Breathy Pacing & Radiant Resonance',
    pitchHz: 220,
    pitchRatio: 1.15,
    speedRatio: 0.98,
    samplePhrase: 'ନମସ୍କାର! ମୁଁ ଆରୋହୀ। ଆପଣଙ୍କ ସ୍ୱର ଏବଂ ଭାବନାକୁ ନିଜର ମାତୃଭାଷାରେ ଜୀବନ୍ତ କରନ୍ତୁ।',
    geminiVoice: 'Aoede',
    avatarEmoji: '✨',
    accentTag: 'Arohi Flagship Live',
    characterBio: 'The signature 24kHz HD live voice of Arohi AI. Extremely warm, clear, and comforting with zero mechanical tone.'
  },
  {
    id: 'priya-delhi',
    name: 'Priya Sharma',
    gender: 'female',
    title: 'Executive Reception & Corporate Lead',
    region: 'Delhi NCR · North India',
    languages: ['Hindi', 'Indian English', 'Hinglish'],
    nativeScript: 'प्रिया शर्मा (हिंदी / English)',
    accentCadence: 'Urban North Indian clarity, polished corporate articulation and bright energy',
    timbreDescription: 'Crisp High-Fidelity Consonants, Engaging Pitch Lilt',
    pitchHz: 235,
    pitchRatio: 1.18,
    speedRatio: 1.02,
    samplePhrase: 'नमस्ते! मैं प्रिया बोल रही हूँ। आपकी सभी व्यावसायिक जरूरतों और पूछताछ में आपकी मदद करके मुझे खुशी होगी।',
    geminiVoice: 'Aoede',
    avatarEmoji: '👩‍💼',
    accentTag: 'Delhi Modern Clear',
    characterBio: 'Ideal for customer experience, professional presentations, edtech, and front-desk AI assistants.'
  },
  {
    id: 'lipi-odisha',
    name: 'Rajeshwari Sahoo (Lipi)',
    gender: 'female',
    title: 'Regional Cultural & Citizen Care Guide',
    region: 'Bhubaneswar & Cuttack · Coastal Odisha',
    languages: ['Odia', 'Hindi', 'Indian English'],
    nativeScript: 'ରାଜେଶ୍ୱରୀ ସାହୁ (ଲିପି)',
    accentCadence: 'Pure coastal Odia intonation, flawless rounded vowels and respectful native cadence',
    timbreDescription: 'Deeply Resonant Melodic Tone, Authentic Vernacular Heritage',
    pitchHz: 215,
    pitchRatio: 1.10,
    speedRatio: 0.97,
    samplePhrase: 'ନମସ୍କାର! ମୁଁ ଲିପି କହୁଛି। ଆମ ଓଡ଼ିଶାର ମାଟିର ଭାଷା ଏବଂ ସଂସ୍କୃତି ସହିତ ଆପଣଙ୍କ ସେବାରେ ସର୍ବଦା ପ୍ରସ୍ତୁତ।',
    geminiVoice: 'Aoede',
    avatarEmoji: '🌺',
    accentTag: 'Authentic Coastal Odia',
    characterBio: 'Honors pristine coastal Odia phonetics with rich retroflexes, perfect for civic helplines and audiobooks.'
  },
  {
    id: 'ananya-south',
    name: 'Ananya Iyer',
    gender: 'female',
    title: 'Healthcare & Compassionate Care Advisor',
    region: 'Bengaluru & Chennai · South India',
    languages: ['Indian English', 'Tamil', 'Kannada', 'Hindi'],
    nativeScript: 'அனன்யா ஐயர் (English / தமிழ்)',
    accentCadence: 'Gentle, deeply empathetic, articulate South Indian English with soothing cadence',
    timbreDescription: 'Velvety Soft Formants, Mindful Pacing & Reassuring Warmth',
    pitchHz: 210,
    pitchRatio: 1.08,
    speedRatio: 0.96,
    samplePhrase: 'Vanakkam! Ananya here. I am here to guide you with care, clarity, and patient attention at every step.',
    geminiVoice: 'Aoede',
    avatarEmoji: '👩‍⚕️',
    accentTag: 'South Indian Cultured',
    characterBio: 'Gentle, comforting voice perfect for medical consultations, mindfulness, and wellness bots.'
  },
  {
    id: 'kavita-gujarat',
    name: 'Kavita Patel',
    gender: 'female',
    title: 'Commerce, Accounts & Friendly Sales Advisor',
    region: 'Ahmedabad & Surat · Gujarat',
    languages: ['Gujarati', 'Hindi', 'Indian English'],
    nativeScript: 'કવિતા પટેલ (ગુજરાતી / હિન્દી)',
    accentCadence: 'Courteous, sweet yet structured Western Indian dialect with enthusiastic merchant tone',
    timbreDescription: 'Bright Harmonic Resonance, Agile Pacing',
    pitchHz: 228,
    pitchRatio: 1.14,
    speedRatio: 1.0,
    samplePhrase: 'નમસ્તે! હું કવિતા છું. તમારા બિઝનેસ અને ફાયનાન્સ માટે સૌથી વિશ્વસનીય અને સ્પષ્ટ ભારતીય અવાજ.',
    geminiVoice: 'Aoede',
    avatarEmoji: '💼',
    accentTag: 'Gujarati Commercial',
    characterBio: 'Upbeat and trustworthy tone built for enterprise commerce, retail voicebots, and customer billing.'
  },

  // --- MALE INDIAN VOICES ---
  {
    id: 'arjun-mumbai',
    name: 'Arjun Mehta',
    gender: 'male',
    title: 'Senior Enterprise Sales & Tech Podcaster',
    region: 'Mumbai & Pune · Maharashtra',
    languages: ['Indian English', 'Hindi', 'Marathi'],
    nativeScript: 'अर्जुन मेहता (English / हिंदी)',
    accentCadence: 'Dynamic, confident urban Indian male cadence, crisp consonant attack and energetic pacing',
    timbreDescription: 'Clear Modern Tenor, Sharp Articulation & Professional Authority',
    pitchHz: 148,
    pitchRatio: 0.88,
    speedRatio: 1.02,
    samplePhrase: 'Hello! Arjun here. Empowering the next generation of builders, founders, and enterprises across Bharat.',
    geminiVoice: 'Fenrir',
    avatarEmoji: '👨‍💼',
    accentTag: 'Mumbai Modern Dynamic',
    characterBio: 'Crisp Indian English and conversational Hindi male tone, perfect for tech explainers, demos, and B2B.'
  },
  {
    id: 'advocate-amit',
    name: 'Advocate Amit Tripathi',
    gender: 'male',
    title: 'Legal Counsel & Senior Administrative Advisor',
    region: 'Lucknow & Varanasi · Uttar Pradesh',
    languages: ['Hindi', 'Indian English'],
    nativeScript: 'अधिवक्ता अमित त्रिपाठी (हिंदी)',
    accentCadence: 'Authoritative, calm, deeply measured Shuddh Hindi diction with resonant baritone depth',
    timbreDescription: 'Deep Resonant Chest Register, Measured Pausing & Grave Dignity',
    pitchHz: 118,
    pitchRatio: 0.72,
    speedRatio: 0.94,
    samplePhrase: 'प्रणाम! मैं अमित त्रिपाठी। सत्य, निष्ठा और स्पष्टता के साथ आपके हर महत्वपूर्ण दस्तावेज़ और विचार को स्वर देना हमारा ध्येय है।',
    geminiVoice: 'Fenrir',
    avatarEmoji: '⚖️',
    accentTag: 'Lucknow Resonant Baritone',
    characterBio: 'Deep, mature male voice suited for legal advisory, institutional announcements, and documentary narration.'
  },
  {
    id: 'subrat-sambalpuri',
    name: 'Subrat Pradhan',
    gender: 'male',
    title: 'Rural Community & Folk Voice Companion',
    region: 'Sambalpur & Bargarh · Western Odisha',
    languages: ['Sambalpuri', 'Odia', 'Hindi'],
    nativeScript: 'ସୁବ୍ରତ ପ୍ରଧାନ (ସମ୍ବଲପୁରୀ / ଓଡ଼ିଆ)',
    accentCadence: 'Earthy, heartfelt Western Odisha village dialect with organic warmth and honest cadence',
    timbreDescription: 'Warm Grounded Texture, Deeply Rooted Desi Cadence',
    pitchHz: 132,
    pitchRatio: 0.80,
    speedRatio: 0.98,
    samplePhrase: 'ଜୁହାର! ମୁଁ ସୁବ୍ରତ କହୁଛେଁ। ଆମର ନିଜର ମାଟିର କଥା ଆଉ ଆପନକର ହକ୍ ସବୁଠୁ ସ୍ପଷ୍ଟ ଭାବେ ପହଞ୍ଚିବା।',
    geminiVoice: 'Fenrir',
    avatarEmoji: '🌾',
    accentTag: 'Sambalpuri Folk Warmth',
    characterBio: 'Rich regional Western Odisha accent, unmatched for farmer outreach, agriculture, and grassroots campaigns.'
  },
  {
    id: 'gurpreet-punjab',
    name: 'Gurpreet Singh',
    gender: 'male',
    title: 'Youth Brand, Logistics & Energetic Voice',
    region: 'Chandigarh & Ludhiana · Punjab',
    languages: ['Punjabi', 'Hindi', 'Indian English'],
    nativeScript: 'ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ (ਪੰਜਾਬੀ / Hindi)',
    accentCadence: 'High-spirited, transparent, friendly Punjabi cadence with punchy rhythmic inflection',
    timbreDescription: 'Vibrant Articulate Tenor, Energetic Dialectal Punch',
    pitchHz: 165,
    pitchRatio: 0.96,
    speedRatio: 1.05,
    samplePhrase: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਗੁਰਪ੍ਰੀਤ ਹਾਜ਼ਰ ਹੈ। ਪੂਰੇ ਜੋਸ਼ ਅਤੇ ਸੱਚੇ ਦਿਲ ਨਾਲ ਤੁਹਾਡੇ ਸੁਨੇਹੇ ਨੂੰ ਲੋਕਾਂ ਤੱਕ ਪਹੁੰଚਾਵਾਂਗੇ।',
    geminiVoice: 'Puck',
    avatarEmoji: '🧔‍♂️',
    accentTag: 'Punjabi High-Spirited',
    characterBio: 'Vibrant, friendly, and direct male voice ideal for retail deliveries, youth platforms, and commercials.'
  },
  {
    id: 'rohan-kolkata',
    name: 'Rohan Mukherjee',
    gender: 'male',
    title: 'Academic Mentor & Cultural Storyteller',
    region: 'Kolkata · West Bengal',
    languages: ['Bengali', 'Indian English', 'Hindi'],
    nativeScript: 'রোহন মুখার্জি (বাংলা / English)',
    accentCadence: 'Lyrical, deeply expressive Bengali cadence with rounded vowels and intellectual elegance',
    timbreDescription: 'Warm Lyrical Mid-Range, Thoughtful Narrative Articulation',
    pitchHz: 138,
    pitchRatio: 0.84,
    speedRatio: 0.98,
    samplePhrase: 'নমস্কার! আমি রোহন বলছি। শিক্ষা, সাহিত্য এবং আপনার চিন্তাভাবনাকে স্পষ্ট ও সুন্দর কণ্ঠে রূপ দিন।',
    geminiVoice: 'Fenrir',
    avatarEmoji: '👨‍🏫',
    accentTag: 'Kolkata Lyrical Bengali',
    characterBio: 'Articulate, cultured male voice ideal for university counseling, audiobooks, and historical storytelling.'
  },
  {
    id: 'venkatesh-hyderabad',
    name: 'Venkatesh Rao',
    gender: 'male',
    title: 'Property Advisory & Customer Success Head',
    region: 'Hyderabad · Telangana & Andhra',
    languages: ['Telugu', 'Indian English', 'Hindi'],
    nativeScript: 'వెంకటేష్ రావు (తెలుగు / English)',
    accentCadence: 'Confident, structured, helpful Deccan Telugu & South Indian English blend',
    timbreDescription: 'Clear Confident Baritone, Steady Structured Pacing',
    pitchHz: 126,
    pitchRatio: 0.76,
    speedRatio: 1.0,
    samplePhrase: 'నమస్కారం! వెంకటేష్ మాట్లాడుతున్నాను. మీ ప్రశ్నలకు అత్యంత స్పష్టమైన మరియు నమ్మకమైన సమాధానాలు ఇక్కడ లభిస్తాయి.',
    geminiVoice: 'Fenrir',
    avatarEmoji: '🏢',
    accentTag: 'Telugu Deccan Baritone',
    characterBio: 'Steady, highly confident male voice built for financial consulting, real estate, and enterprise tech.'
  }
];

export function getPersonaById(id: string): IndianVoicePersona {
  return INDIAN_VOICE_PERSONAS.find(p => p.id === id) || INDIAN_VOICE_PERSONAS[0];
}

export function findBestPersonaForAcoustics(pitchHz: number, detectedGender?: 'male' | 'female' | 'neutral'): IndianVoicePersona {
  const isMale = detectedGender === 'male' || (pitchHz > 0 && pitchHz < 165);
  
  if (isMale) {
    if (pitchHz < 125) {
      return getPersonaById('advocate-amit'); // Deep Baritone
    } else if (pitchHz < 145) {
      return getPersonaById('arjun-mumbai'); // Modern Professional Male
    } else {
      return getPersonaById('gurpreet-punjab'); // Agile Tenor Male
    }
  } else {
    if (pitchHz > 225) {
      return getPersonaById('priya-delhi'); // High, Bright Female
    } else if (pitchHz > 200) {
      return getPersonaById('arohi-zypher'); // Signature Melodic Female
    } else {
      return getPersonaById('ananya-south'); // Gentle Soft Female
    }
  }
}
