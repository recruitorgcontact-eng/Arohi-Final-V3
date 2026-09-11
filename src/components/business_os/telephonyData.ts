// Arohi Sovereign 22-Language Telephony Matrix & Call Flow System
// Completely isolated inside Arohi ONE Business OS

export interface IndianLanguageOption {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  speechCode: string;
  dialects: string[];
  defaultGreeting: string;
  sampleCallerUtterance: string;
  popularRegions: string;
  flag: string;
  isFlagship?: boolean;
}

export const INDIAN_22_LANGUAGES: IndianLanguageOption[] = [
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Odia',
    speechCode: 'or-IN',
    dialects: [
      'Standard Coastal (Bhubaneswar, Cuttack, Puri)',
      'Western Odia / Sambalpuri-Koshali (Sambalpur, Rourkela, Bargarh)',
      'Southern Odia (Ganjam, Berhampur)',
      'Odia + English Code-Switching'
    ],
    defaultGreeting: 'ନମସ୍କାର! ଆରୋହୀ ଏଣ୍ଟରପ୍ରାଇଜେସକୁ ସ୍ୱାଗତ। ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?',
    sampleCallerUtterance: 'ମୋତେ ନୂଆ ପ୍ରଡକ୍ଟର ଦାମ୍ ଏବଂ ଡେଲିଭରୀ ବିଷୟରେ ଜାଣିବାକୁ ଥିଲା।',
    popularRegions: 'Odisha, Jharkhand, West Bengal border',
    flag: '🇮🇳',
    isFlagship: true
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    speechCode: 'hi-IN',
    dialects: [
      'Standard Formal (Corporate / Khari Boli)',
      'Hinglish (Hindi + English Business Colloquial)',
      'Awadhi / Purvanchal & Bhojpuri-tinted',
      'Mumbai Colloquial'
    ],
    defaultGreeting: 'नमस्ते! हमारी कंपनी में आपका स्वागत है। बताइए आज मैं आपकी क्या सहायता कर सकती हूँ?',
    sampleCallerUtterance: 'मुझे आपकी सर्विस के प्राइसिंग और डेमो के बारे में जानकारी चाहिए थी।',
    popularRegions: 'Delhi, UP, MP, Bihar, Rajasthan, Haryana',
    flag: '🇮🇳'
  },
  {
    code: 'en-in',
    name: 'Indian English',
    nativeName: 'English (India)',
    script: 'Latin',
    speechCode: 'en-IN',
    dialects: [
      'Neutral Corporate Indian English',
      'Metro Tech Hub (Bengaluru / Gurgaon)',
      'Formal Executive'
    ],
    defaultGreeting: 'Hello and welcome! Thank you for calling our business desk. How may I assist you today?',
    sampleCallerUtterance: 'Hi, I would like to check the status of my invoice and schedule an onboarding call.',
    popularRegions: 'Pan-India Corporate & Enterprise',
    flag: '🇮🇳'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    speechCode: 'bn-IN',
    dialects: [
      'Kolkata Standard Colloquial',
      'North Bengal (Siliguri / Jalpaiguri)',
      'Banglish (Bengali + English Corporate)'
    ],
    defaultGreeting: 'নমস্কার! আমাদের সংস্থায় আপনাকে স্বাগত। আজ আপনাকে কীভাবে সাহায্য করতে পারি?',
    sampleCallerUtterance: 'আমি আপনাদের নতুন প্ল্যান সম্পর্কে জানতে চাই এবং বুকিং করতে চাই।',
    popularRegions: 'West Bengal, Tripura, Assam',
    flag: '🇮🇳'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    speechCode: 'te-IN',
    dialects: [
      'Hyderabad Corporate Colloquial',
      'Coastal Andhra (Vijayawada / Visakhapatnam)',
      'Rayalaseema',
      'Tenglish (Telugu + English)'
    ],
    defaultGreeting: 'నమస్కారం! మా వ్యాపార విభాగానికి స్వాగతం. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?',
    sampleCallerUtterance: 'నాకు మీ కొత్త సర్వీస్ డెమో కావాలి మరియు కొటేషన్ వివరాలు చెప్పండి.',
    popularRegions: 'Andhra Pradesh, Telangana',
    flag: '🇮🇳'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    speechCode: 'ta-IN',
    dialects: [
      'Chennai Business Standard',
      'Kongu Tamil (Coimbatore / Erode)',
      'Madurai Colloquial',
      'Tanglish (Tamil + English)'
    ],
    defaultGreeting: 'வணக்கம்! எங்களின் வாடிக்கையாளர் சேவைக்கு உங்களை வரவேற்கிறோம். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    sampleCallerUtterance: 'உங்கள் தயாரிப்புகள் மற்றும் விலைப்பட்டியல் பற்றி நான் தெரிந்து கொள்ள வேண்டும்.',
    popularRegions: 'Tamil Nadu, Puducherry',
    flag: '🇮🇳'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    speechCode: 'mr-IN',
    dialects: [
      'Pune Formal Shuddh Marathi',
      'Mumbai Business Marathi',
      'Vidarbha / Nagpur',
      'Marath-English'
    ],
    defaultGreeting: 'नमस्कार! आमच्या कंपनीमध्ये आपले सहर्ष स्वागत आहे. आज मी आपली काय मदत करू शकते?',
    sampleCallerUtterance: 'मला तुमच्या व्यावसायिक सेवांबद्दल आणि मासिक शुल्काबद्दल माहिती हवी आहे.',
    popularRegions: 'Maharashtra, Goa',
    flag: '🇮🇳'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    speechCode: 'gu-IN',
    dialects: [
      'Ahmedabad Business Standard',
      'Surati Commercial',
      'Kathiyawadi / Saurashtra',
      'Guj-English'
    ],
    defaultGreeting: 'નમસ્તે! અમારી કંપનીમાં આપનું હાર્દિક સ્વાગત છે. હું આપને કેવી રીતે મદદ કરી શકું?',
    sampleCallerUtterance: 'મને તમારા જીએસટી ઇન્વોઇસિંગ અને સોલ્યુશન વિશે વિગતો જોઈએ છે.',
    popularRegions: 'Gujarat, Daman & Diu',
    flag: '🇮🇳'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    speechCode: 'kn-IN',
    dialects: [
      'Bengaluru Corporate Tech',
      'Mysuru Formal',
      'North Karnataka (Hubballi-Dharwad)',
      'Kanglish'
    ],
    defaultGreeting: 'ನಮಸ್ಕಾರ! ನಮ್ಮ ಕಂಪನಿಗೆ ಸ್ವಾಗತ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    sampleCallerUtterance: 'ನನಗೆ ನಿಮ್ಮ ಸಾಫ್ಟ್‌ವೇರ್ ಡೆಮೊ ಮತ್ತು ಬೆಲೆಗಳ ವಿವರ ತಿಳಿಯಬೇಕಿದೆ.',
    popularRegions: 'Karnataka',
    flag: '🇮🇳'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
    speechCode: 'ml-IN',
    dialects: [
      'Central Kerala (Kochi / Thrissur)',
      'Travancore (Thiruvananthapuram)',
      'Malabar (Kozhikode)',
      'Manglish'
    ],
    defaultGreeting: 'നമസ്കാരം! ഞങ്ങളുടെ സ്ഥാപനത്തിലേക്ക് സ്വാഗതം. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കണം?',
    sampleCallerUtterance: 'നിങ്ങളുടെ സർവീസുകളെക്കുറിച്ചും പ്ലാനുകളെക്കുറിച്ചും അറിയാൻ താല്പര്യമുണ്ട്.',
    popularRegions: 'Kerala, Lakshadweep',
    flag: '🇮🇳'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    speechCode: 'pa-IN',
    dialects: [
      'Majhi Standard',
      'Malwai Commercial (Ludhiana / Patiala)',
      'Doabi',
      'Panj-English'
    ],
    defaultGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਸਾਡੀ ਕੰਪਨੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਦੱਸੋ ਜੀ ਮੈਂ ਤੁਹਾਡੀ ਕੀ ਸਹਾਇਤਾ ਕਰ ਸਕਦੀ ਹਾਂ?',
    sampleCallerUtterance: 'ਮੈਨੂੰ ਤੁਹਾਡੇ ਪ੍ਰੋਡਕਟਾਂ ਅਤੇ ਆਰਡਰ ਬਾਰੇ ਜਾਣਕਾਰੀ ਚਾਹੀਦੀ ਸੀ।',
    popularRegions: 'Punjab, Chandigarh, Delhi NCR',
    flag: '🇮🇳'
  },
  {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    script: 'Bengali-Assamese',
    speechCode: 'as-IN',
    dialects: [
      'Eastern / Brahmaputra Standard',
      'Kamrupi / Western Assamese',
      'Assamese-English'
    ],
    defaultGreeting: 'নমস্কাৰ! আমাৰ প্ৰতিষ্ঠানলৈ স্বাগতম। আজি আপোনাক মই কিদৰে সহায় কৰিব পাৰোঁ?',
    sampleCallerUtterance: 'মোক আপোনালোকৰ সেৱাসমূহ আৰু পেমেন্টৰ বিষয়ে জানিবলৈ লাগিছিল।',
    popularRegions: 'Assam, Northeast India',
    flag: '🇮🇳'
  },
  {
    code: 'mai',
    name: 'Maithili',
    nativeName: 'मैथिली',
    script: 'Devanagari',
    speechCode: 'mai-IN',
    dialects: ['Standard Mithilanchal', 'Darbhanga / Madhubani'],
    defaultGreeting: 'प्रणाम! हमर कम्पनी में अहाँक स्वागत अछि। कहू हम अहाँक की सहायता कऽ सकैत छी?',
    sampleCallerUtterance: 'हमरा अहाँक योजना आ डेमो के बारे में जानकारी चाही छल।',
    popularRegions: 'Mithila, North Bihar, Jharkhand',
    flag: '🇮🇳'
  },
  {
    code: 'sat',
    name: 'Santali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki',
    speechCode: 'sat-IN',
    dialects: ['Mayurbhanj / Odisha Ol Chiki', 'Jharkhand Standard'],
    defaultGreeting: 'ᱡᱚᱦᱟᱨ! ᱟᱞᱮᱭᱟᱜ ᱠᱚᱢᱯᱟᱱᱤ ᱨᱮ ᱟᱯᱮᱭᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ। ᱪᱮᱫ ᱜᱚᱲᱚᱧ ᱮᱢ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ?',
    sampleCallerUtterance: 'ᱤᱧ ᱱᱟᱶᱟ ᱥᱩᱵᱤᱫᱷᱟ ᱵᱟᱵᱚᱛ ᱵᱟᱰᱟᱭ ᱥᱟᱱᱟᱹᱧ ᱠᱟᱱᱟ।',
    popularRegions: 'Odisha (Mayurbhanj), Jharkhand, Bengal',
    flag: '🇮🇳'
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    script: 'Perso-Arabic',
    speechCode: 'ur-IN',
    dialects: ['Deccani (Hyderabad)', 'Delhi / Lucknow Formal', 'Urdu-English'],
    defaultGreeting: 'آداب! ہماری کمپنی میں خوش آمدید۔ فرمائیے آج میں آپ کی کیا مدد کر سکتی ہوں؟',
    sampleCallerUtterance: 'مجھے آپ کے ادارے کی خدمات اور نرخ نامے کی تفصیل درکار ہے۔',
    popularRegions: 'Telangana, UP, Delhi, Bihar, J&K',
    flag: '🇮🇳'
  },
  {
    code: 'ks',
    name: 'Kashmiri',
    nativeName: 'کٲشُر / कॉशुर',
    script: 'Perso-Arabic / Devanagari',
    speechCode: 'ks-IN',
    dialects: ['Srinagar Standard', 'Mirpur / Southern Valley'],
    defaultGreeting: 'سلام! اساندرے ادارس منز خوش آمدید। بہٕ کیتھ پٲٹھۍ ہیکہٕ تُہنز مدد کٔرِتھ؟',
    sampleCallerUtterance: 'مےٚ چھےٚ تُہنزَن سٔروِسَن مُتعلِق معلوٗماتھ پَکار۔',
    popularRegions: 'Jammu & Kashmir',
    flag: '🇮🇳'
  },
  {
    code: 'kok',
    name: 'Konkani',
    nativeName: 'कोंकणी',
    script: 'Devanagari',
    speechCode: 'kok-IN',
    dialects: ['Goan Konkani', 'Mangalorean Konkani', 'Karwar'],
    defaultGreeting: 'नमस्कार! आमचे कंपनींत तुमकां येवकार। आयज हांव तुमकां कशी मदत करूं?',
    sampleCallerUtterance: 'म्हाका तुमच्या सेवां आनी बुकिंगा खातीर म्हायती जाय आशिल्ली।',
    popularRegions: 'Goa, Coastal Karnataka, Maharashtra',
    flag: '🇮🇳'
  },
  {
    code: 'sd',
    name: 'Sindhi',
    nativeName: 'سنڌي / सिन्धी',
    script: 'Perso-Arabic / Devanagari',
    speechCode: 'sd-IN',
    dialects: ['Indian Sindhi Business Standard'],
    defaultGreeting: 'نمسڪار! اسان جي اداري ۾ ڀلي ڪري آيا. مان اوهان جي ڪهڙي مدد ڪري سگهان ٿي؟',
    sampleCallerUtterance: 'مون کي اوهان جي پيداوار ۽ فيس بابت ڄاڻڻو هو.',
    popularRegions: 'Gujarat, Maharashtra, Rajasthan',
    flag: '🇮🇳'
  },
  {
    code: 'doi',
    name: 'Dogri',
    nativeName: 'डोगरी',
    script: 'Devanagari',
    speechCode: 'doi-IN',
    dialects: ['Jammu Standard', 'Kandi'],
    defaultGreeting: 'नमस्ते जी! साढ़ी कंपनी च थुआढ़ा सुआगत ऐ। दस्सो आज मैं थुआढ़ी केह् मदद करी सकनी आं?',
    sampleCallerUtterance: 'मीगी थुआढ़े कम-काज ते फीस बारै पुच्छना हा।',
    popularRegions: 'Jammu, Himachal Pradesh',
    flag: '🇮🇳'
  },
  {
    code: 'mni',
    name: 'Manipuri',
    nativeName: 'ꯃꯤꯇꯩꯂꯣꯟ (Meitei)',
    script: 'Meitei Mayek / Bengali',
    speechCode: 'mni-IN',
    dialects: ['Imphal Valley Standard'],
    defaultGreeting: 'ꯈꯨꯔꯨꯝꯖꯔꯤ! ꯑꯩꯈꯣꯏꯒꯤ ꯀꯝꯄꯅꯤꯗ ꯇꯔꯥꯝꯅ ꯑꯣꯛꯆꯔꯤ। ꯉꯁꯤ ꯑꯩꯅ ꯑꯗꯣꯝꯕꯨ ꯀꯔꯝꯅ ꯃꯇꯦꯡ ꯄꯥꯡꯒꯦ?',
    sampleCallerUtterance: 'ꯑꯩꯍꯥꯛ ꯑꯗꯣꯝꯒꯤ ꯁꯔꯚꯤꯁ ꯑꯃꯁꯨꯡ ꯃꯃꯜ ꯈꯪꯅꯤꯡꯏ।',
    popularRegions: 'Manipur',
    flag: '🇮🇳'
  },
  {
    code: 'brx',
    name: 'Bodo',
    nativeName: 'बर\'',
    script: 'Devanagari',
    speechCode: 'brx-IN',
    dialects: ['Kokrajhar / Bodoland Territorial Region'],
    defaultGreeting: 'खुलुमबाय! जोंनि कम्पानियाव बरायबाय। दिनै आं नोंथांखौ माबोरै हेफाजाब होनो हागोन?',
    sampleCallerUtterance: 'आंनो नोंथांमोननि सिबिथाय आरो खावनायनि सोमोन्दै मिथिनो गोसो दं।',
    popularRegions: 'Bodoland (Assam)',
    flag: '🇮🇳'
  },
  {
    code: 'sa',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    script: 'Devanagari',
    speechCode: 'sa-IN',
    dialects: ['Classical Vedic & Conversational Sanskrit'],
    defaultGreeting: 'नमो नमः! अस्माकं संस्थायां भवतां स्वागतम्। अद्य अहं भवतां कथं साहाय्यं कर्तुं शक्नोमि?',
    sampleCallerUtterance: 'अहं भवतां सेवानां तथा परामर्शस्य विषये ज्ञातुम् इच्छामि।',
    popularRegions: 'Scholarly, Vedic & Cultural Institutions Pan-India',
    flag: '🇮🇳'
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    script: 'Devanagari',
    speechCode: 'ne-IN',
    dialects: ['Sikkim / Darjeeling Standard'],
    defaultGreeting: 'नमस्ते! हाम्रो संस्थामा यहाँलाई स्वागत छ। आज म तपाईंलाई कसरी सहयोग गर्न सक्छु?',
    sampleCallerUtterance: 'मलाई तपाईंको नयाँ सेवा र शुल्क बारे जानकारी चाहिएको थियो।',
    popularRegions: 'Sikkim, Darjeeling (West Bengal), Assam',
    flag: '🇮🇳'
  }
];

// Telephony Visual Call Flow Node Architecture
export type TelephonyNodeType =
  | 'greeting'
  | 'intent_branch'
  | 'whatsapp_hook'
  | 'razorpay_hook'
  | 'booking_hook'
  | 'inventory_hook'
  | 'human_transfer'
  | 'closing';

export interface TelephonyFlowNode {
  id: string;
  type: TelephonyNodeType;
  title: string;
  subtitle: string;
  language: string;
  iconName: string;
  color: string;
  config: {
    dialogueText?: string;
    targetIntent?: string;
    branchRules?: { condition: string; nextNodeId: string; label: string }[];
    toolAction?: string;
    fallbackText?: string;
    delayMs?: number;
  };
}

export const DEFAULT_TELEPHONY_FLOW_NODES: TelephonyFlowNode[] = [
  {
    id: 'node-greeting',
    type: 'greeting',
    title: '1. Multilingual Greeting & Voice Intake',
    subtitle: 'Dynamic greeting with automatic 22-language detection',
    language: 'Odia (ଓଡ଼ିଆ) + English / Hindi',
    iconName: 'Mic',
    color: 'emerald',
    config: {
      dialogueText: 'ନମସ୍କାର! ଆରୋହୀ ଏଣ୍ଟରପ୍ରାଇଜେସ୍ ତରଫରୁ ସ୍ୱାଗତ। ମୁଁ ଆପଣଙ୍କୁ ଆଜି କିପରି ସାହାଯ୍ୟ କରିପାରିବି? (Hello! Welcome to our enterprise desk. How may I assist you today?)',
      delayMs: 300
    }
  },
  {
    id: 'node-intent',
    type: 'intent_branch',
    title: '2. Sub-500ms Intent Classification',
    subtitle: 'Live semantic routing into sales, billing, support or human handoff',
    language: 'Auto-Detect',
    iconName: 'Radio',
    color: 'purple',
    config: {
      branchRules: [
        { condition: 'Interested in Product / Pricing', nextNodeId: 'node-whatsapp', label: 'Pricing / Catalog' },
        { condition: 'Pending Payment / Invoice', nextNodeId: 'node-razorpay', label: 'Payment Link' },
        { condition: 'Schedule Onboarding / Demo', nextNodeId: 'node-booking', label: 'Book Calendar' },
        { condition: 'Complex Escalation / Angry Caller', nextNodeId: 'node-transfer', label: 'Human Transfer' }
      ]
    }
  },
  {
    id: 'node-whatsapp',
    type: 'whatsapp_hook',
    title: '3A. Real-Time WhatsApp Catalog Hook',
    subtitle: 'Dispatches PDF catalog & quotation link to caller WhatsApp during live phone call',
    language: 'Vernacular SMS/WhatsApp',
    iconName: 'Share2',
    color: 'emerald',
    config: {
      dialogueText: 'ମୁଁ ଆପଣଙ୍କ ହ୍ୱାଟ୍ସଆପ୍ ନମ୍ବରକୁ ଆମର ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରଡକ୍ଟ କାଟାଲଗ୍ ଏବଂ ଦରତାଲିକା ପଠାଇ ଦେଇଛି। (I have just sent our product catalog directly to your WhatsApp number.)',
      toolAction: 'DISPATCH_WHATSAPP_BROCHURE'
    }
  },
  {
    id: 'node-razorpay',
    type: 'razorpay_hook',
    title: '3B. Instant GST Payment Link Hook',
    subtitle: 'Generates real-time Razorpay payment link via SMS while caller is on line',
    language: 'Bilingual',
    iconName: 'Zap',
    color: 'amber',
    config: {
      dialogueText: 'ଆପଣଙ୍କ ଇନଭଏସର ପେମେଣ୍ଟ ଲିଙ୍କ୍ ମୁଁ SMS ମାଧ୍ୟମରେ ପଠାଇ ଦେଲି, ଆପଣ କଲ୍ ଚାଲୁଥିବା ସମୟରେ ମଧ୍ୟ UPI ଦ୍ୱାରା ପେମେଣ୍ଟ କରିପାରିବେ।',
      toolAction: 'GENERATE_RAZORPAY_INVOICE_LINK'
    }
  },
  {
    id: 'node-booking',
    type: 'booking_hook',
    title: '3C. Autonomous Calendar Slot Booking',
    subtitle: 'Checks Google Calendar / CRM availability and locks meeting slot',
    language: 'Auto',
    iconName: 'Calendar',
    color: 'blue',
    config: {
      dialogueText: 'କାଲି ଅପରାହ୍ନ ୩ ଟାରେ ଆମ ଟେକ୍ନିକାଲ୍ ଟିମ୍ ସହିତ ଆପଣଙ୍କ ଡେମୋ ବୁକ୍ କରିଦେଲି। ଆପଣଙ୍କୁ ଇମେଲ୍ ଏବଂ ମେସେଜ୍ ମଧ୍ୟ ପଠାଯାଇଛି।',
      toolAction: 'LOCK_CALENDAR_SLOT'
    }
  },
  {
    id: 'node-transfer',
    type: 'human_transfer',
    title: '3D. Warm SIP / PSTN Human Escalation',
    subtitle: 'Instant conference or forward to founder / senior manager phone with caller briefing',
    language: 'All Dialects',
    iconName: 'PhoneOutgoing',
    color: 'rose',
    config: {
      dialogueText: 'ଦୟାକରି କିଛି ସମୟ ଅପେକ୍ଷା କରନ୍ତୁ, ମୁଁ ଆପଣଙ୍କ କଲ୍ ଆମର ବରିଷ୍ଠ ମ୍ୟାନେଜରଙ୍କ ସହିତ ସଂଯୋଗ କରୁଛି...',
      toolAction: 'SIP_WARM_TRANSFER_TO_HUMAN'
    }
  },
  {
    id: 'node-closing',
    type: 'closing',
    title: '4. Wrap-up, CRM Sync & Lead Scoring',
    subtitle: 'Autonomous call transcription, lead status update, and AI quality scorecard',
    language: '22 Languages',
    iconName: 'CheckCircle2',
    color: 'zinc',
    config: {
      dialogueText: 'ଆମକୁ କଲ୍ କରିଥିବାରୁ ବହୁତ ବହୁତ ଧନ୍ୟବାଦ! ଆପଣଙ୍କ ଦିନଟି ଶୁଭମୟ ହେଉ। (Thank you for calling. Have a wonderful day ahead!)',
      toolAction: 'SYNC_TO_AROHI_CRM_LEADS'
    }
  }
];
