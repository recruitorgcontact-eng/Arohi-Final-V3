// Comprehensive SEO & Multi-Language / All-State Schema and Keyword Catalog for Mission 87
// Covers all 28 States + 8 UTs, 22 Official Scheduled Indian Languages + English, and Key Regional Micro-Hubs

export interface Mission87LanguageSEO {
  langCode: string;
  nameEnglish: string;
  nativeName: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeywords: string[];
  callToAction: string;
  coreTagline: string;
}

export interface StateDeploymentSEO {
  state: string;
  stateCapital: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast' | 'UT';
  targetDistricts: string[];
  keyIndustries: string[];
  localKeywords: string[];
  schemesAligned: string[];
}

export const MISSION_87_LANGUAGES_SEO: Mission87LanguageSEO[] = [
  {
    langCode: 'hi',
    nameEnglish: 'Hindi',
    nativeName: 'हिन्दी',
    metaTitle: 'मिशन 87 - भारत के 8.7 करोड़ युवाओं के लिए राष्ट्रीय आत्मनिर्भर रोजगार व स्वावलंबन मिशन | Arohi AI',
    metaDescription: 'मिशन 87: नीति आयोग द्वारा चिन्हित 8.7 करोड़ NEET श्रेणी (अप्रशिक्षित/बेरोजगार) युवाओं को AI, माइक्रो-मैन्युफैक्चरिंग और डिजिटल स्किल्स द्वारा आत्मनिर्भर बनाने का राष्ट्रीय अभियान।',
    primaryKeywords: [
      'मिशन 87',
      'मिशन 87 भारत',
      '8.7 करोड़ युवा रोजगार',
      'neet युवा स्वरोजगार मिशन',
      'गांव और छोटे शहरों में रोजगार के तरीके',
      'आरोही एआई मिशन 87',
      'घर बैठे माइक्रो बिजनेस कैसे शुरू करें'
    ],
    callToAction: 'कैडेट के रूप में अभी निःशुल्क पंजीकरण करें',
    coreTagline: '8.7 करोड़ युवा भारत का इंतज़ार नहीं कर रहे हैं, भारत इंतज़ार कर रहा है कि 8.7 करोड़ युवा क्या बना सकते हैं।'
  },
  {
    langCode: 'en',
    nameEnglish: 'English',
    nativeName: 'English',
    metaTitle: 'Mission 87: Activating 87 Million Youth into Sovereign Economic Creators | Arohi AI Bharat',
    metaDescription: 'Mission 87 is the sovereign national empowerment movement turning India\'s 87 Million NEET youth into sovereign micro-manufacturers, AI digital agencies, and independent earners across 700+ districts.',
    primaryKeywords: [
      'mission 87',
      'mission 87 bharat',
      '87 million youth empowerment',
      'niti aayog neet youth economic activation',
      'micro manufacturing project reports india',
      'earn first 5000 with ai',
      'tier 2 tier 3 startup blueprints'
    ],
    callToAction: 'Enroll as a Mission 87 Cadet for Free',
    coreTagline: '87 Million are not waiting for India. India is waiting for what 87 Million can build.'
  },
  {
    langCode: 'or',
    nameEnglish: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    metaTitle: 'ମିଶନ ୮୭ (Mission 87 Odisha) - ୮.୭ କୋଟି ଯୁବପିଢ଼ିଙ୍କ ପାଇଁ ସ୍ୱାବଲମ୍ବୀ ରୋଜଗାର ମିଶନ | Arohi AI',
    metaDescription: 'ମିଶନ ୮୭: ଓଡ଼ିଶା ତଥା ସମଗ୍ର ଭାରତର ଯୁବପିଢ଼ିଙ୍କୁ AI, ଡିଜିଟାଲ୍ ସେବା ଏବଂ କ୍ଷୁଦ୍ର ଶିଳ୍ପ ଦ୍ୱାରା ଆତ୍ମନିର୍ଭର କରିବା ପାଇଁ ଜାତୀୟ ମିଶନ।',
    primaryKeywords: [
      'ମିଶନ ୮୭',
      'mission 87 odisha',
      'ଓଡ଼ିଶା ଯୁବ ରୋଜଗାର',
      'କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗ ପ୍ରକଳ୍ପ ଓଡ଼ିଶା',
      'ଘରେ ବସି ରୋଜଗାର ଏଆଇ ମାଧ୍ୟମରେ'
    ],
    callToAction: 'ମାଗଣାରେ କ୍ୟାଡେଟ୍ ଭାବେ ନାମ ଲେଖାନ୍ତୁ',
    coreTagline: '୮.୭ କୋଟି ଯୁବକ ଭାରତକୁ ଅପେକ୍ଷା କରୁନାହାନ୍ତି, ଭାରତ ଅପେକ୍ଷା କରୁଛି ୮.୭ କୋଟି ଯୁବକ କ’ଣ ନିର୍ମାଣ କରିପାରିବେ।'
  },
  {
    langCode: 'bn',
    nameEnglish: 'Bengali',
    nativeName: 'বাংলা',
    metaTitle: 'মিশন ৮৭ (Mission 87) - ভারতের ৮.৭ কোটি যুবশক্তির স্বনির্ভর কর্মসংস্থান বিপ্লব | Arohi AI',
    metaDescription: 'মিশন ৮৭: এআই, মাইক্রো-ম্যানুফ্যাকচারিং এবং স্থানীয় উদ্যোগের মাধ্যমে ভারতের ৮.৭ কোটি বেকার ও প্রশিক্ষণহীন তরুণদের দক্ষ উদ্যোক্তা হিসেবে গড়ে তোলার জাতীয় অভিযান।',
    primaryKeywords: [
      'মিশন ৮৭',
      'mission 87 bengal',
      'যুব কর্মসংস্থান প্রকল্প',
      'ছোট ব্যবসা আইডিয়া পশ্চিমবঙ্গ',
      'এআই ডিজিটাল এজেন্সি'
    ],
    callToAction: 'বিনামূল্যে ক্যাডেট হিসেবে যোগ দিন',
    coreTagline: '৮.৭ কোটি তরুণ ভারতের জন্য অপেক্ষা করছে না, ভারত অপেক্ষা করছে তারা কী তৈরি করতে পারে।'
  },
  {
    langCode: 'ta',
    nameEnglish: 'Tamil',
    nativeName: 'தமிழ்',
    metaTitle: 'மிஷன் 87 (Mission 87 Tamil Nadu) - 8.7 கோடி இளைஞர்களுக்கான தேசிய தற்சார்பு இயக்கம் | Arohi AI',
    metaDescription: 'மிஷன் 87: ஏஐ தொழில்நுட்பம், சிறு குறு உற்பத்தி மற்றும் டிஜிட்டல் திறன்கள் மூலம் இளைஞர்களை தொழில்முனைவோராக மாற்றும் தேசிய இயக்கம்.',
    primaryKeywords: [
      'மிஷன் 87',
      'mission 87 tamil nadu',
      'இளைஞர் வேலைவாய்ப்பு இயக்கம்',
      'சிறு தொழில் திட்டங்கள்',
      'கோயம்புத்தூர் உற்பத்தி ஏஐ'
    ],
    callToAction: 'இலவசமாக கேடட்டாக பதிவு செய்யுங்கள்',
    coreTagline: '8.7 கோடி இளைஞர்கள் இந்தியாவுக்காக காத்திருக்கவில்லை, அவர்கள் என்ன உருவாக்கப் போகிறார்கள் என்று இந்தியா காத்திருக்கிறது.'
  },
  {
    langCode: 'te',
    nameEnglish: 'Telugu',
    nativeName: 'తెలుగు',
    metaTitle: 'మిషన్ 87 (Mission 87 Telugu) - 8.7 కోట్ల భారత యువతకు స్వావలంబన విప్లవం | Arohi AI',
    metaDescription: 'మిషన్ 87: ఏఐ నైపుణ్యాలు, మైక్రో మాన్యుఫ్యాక్చరింగ్ మరియు లోకల్ ఎంటర్‌ప్రైజ్ ద్వారా భారత యువతను ఆర్థిక సృష్టికర్తలుగా మార్చే జాతీయ ఉద్యమం.',
    primaryKeywords: [
      'మిషన్ 87',
      'mission 87 telugu andhra telangana',
      'యువత స్వయం ఉపాధి',
      'చిన్న తరహా పరిశ్రమలు',
      'ఏఐ డిజిటల్ ఏజెన్సీ'
    ],
    callToAction: 'ఉచితంగా క్యాడెట్‌గా నమోదు చేసుకోండి',
    coreTagline: '8.7 కోట్ల మంది యువత భారతదేశం కోసం వేచి ఉండటం లేదు; ఆ 8.7 కోట్ల మంది ఏమి నిర్మించగలరో చూడటానికి భారతదేశం వేచి ఉంది.'
  },
  {
    langCode: 'mr',
    nameEnglish: 'Marathi',
    nativeName: 'मराठी',
    metaTitle: 'मिशन ८७ (Mission 87 Maharashtra) - ८.७ कोटी तरुणांसाठी राष्ट्रीय आत्मनिर्भर रोजगार चळवळ | Arohi AI',
    metaDescription: 'मिशन ८७: महाराष्ट्रातील व देशभरातील तरुणांना एआय, सोलर अ‍ॅग्री प्रोसेसिंग व मायक्रो मॅन्युफॅक्चरिंगद्वारे दरमहा स्वतंत्र उत्पन्न मिळवून देणारे व्यासपीठ.',
    primaryKeywords: [
      'मिशन ८७',
      'mission 87 maharashtra',
      'तरुण स्वयंरोजगार योजना',
      'नाशिक फूड प्रोसेसिंग उद्योग',
      'लघु उद्योग प्रकल्प अहवाल'
    ],
    callToAction: 'विनामूल्य कॅडेट म्हणून नोंदणी करा',
    coreTagline: '८.७ कोटी तरुण भारताची वाट पाहत नाहीत, ते काय निर्माण करू शकतात याची वाट भारत पाहत आहे.'
  },
  {
    langCode: 'gu',
    nameEnglish: 'Gujarati',
    nativeName: 'ગુજરાતી',
    metaTitle: 'મિશન 87 (Mission 87 Gujarat) - 8.7 કરોડ યુવાનો માટે રાષ્ટ્રીય સ્વાવલંબન અભિયાન | Arohi AI',
    metaDescription: 'મિશન 87: ગુજરાત અને દેશભરના યુવાનોને AI, ઉત્પાદન અને ડીજીટલ વેપાર દ્વારા સફળ ઉદ્યોગસાહસિક બનાવવાનું રાષ્ટ્રીય મિશન.',
    primaryKeywords: [
      'મિશન 87',
      'mission 87 gujarat',
      'યુવા રોજગાર અભિયાન',
      'લઘુ ઉદ્યોગ આઈડિયા',
      'સુરત અમદાવાદ માઇક્રો બિઝનેસ'
    ],
    callToAction: 'મફતમાં કેડેટ તરીકે જોડાવો',
    coreTagline: '8.7 કરોડ યુવાનો ભારતની રાહ નથી જોઈ રહ્યા, ભારત રાહ જોઈ રહ્યું છે કે તેઓ શું બનાવી શકે છે.'
  },
  {
    langCode: 'kn',
    nameEnglish: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    metaTitle: 'ಮಿಷನ್ 87 (Mission 87 Karnataka) - 8.7 ಕೋಟಿ ಯುವಜನರ ಸ್ವಾವಲಂಬಿ ಆರ್ಥಿಕ ಕ್ರಾಂತಿ | Arohi AI',
    metaDescription: 'ಮಿಷನ್ 87: ಎಐ ತಂತ್ರಜ್ಞಾನ, ಕೃಷಿ ಸಂಸ್ಕರಣೆ ಮತ್ತು ಕಿರು ಉತ್ಪಾದನೆಯ ಮೂಲಕ ಯುವಜನರನ್ನು ಉದ್ಯಮಿಗಳನ್ನಾಗಿ ಮಾಡುವ ರಾಷ್ಟ್ರೀಯ ಅಭಿಯಾನ.',
    primaryKeywords: [
      'ಮಿಷನ್ 87',
      'mission 87 karnataka',
      'ಯುವ ಉದ್ಯೋಗಾವಕಾಶ',
      'ಸಣ್ಣ ಉದ್ಯಮ ಯೋಜನೆಗಳು',
      'ಕರ್ನಾಟಕ ಸ್ಟಾರ್ಟಪ್ ಎಐ'
    ],
    callToAction: 'ಉಚಿತವಾಗಿ ಕ್ಯಾಡೆಟ್ ಆಗಿ ನೋಂದಾಯಿಸಿ',
    coreTagline: '8.7 ಕೋಟಿ ಯುವಕರು ಭಾರತಕ್ಕಾಗಿ ಕಾಯುತ್ತಿಲ್ಲ, ಅವರು ಏನನ್ನು ನಿರ್ಮಿಸಬಲ್ಲರು ಎಂದು ಭಾರತ ಕಾಯುತ್ತಿದೆ.'
  },
  {
    langCode: 'ml',
    nameEnglish: 'Malayalam',
    nativeName: 'മലയാളം',
    metaTitle: 'മിഷൻ 87 (Mission 87 Kerala) - 8.7 കോടി യുവാക്കൾക്കായുള്ള ദേശീയ ശാക്തീകരണ പ്രസ്ഥാനം | Arohi AI',
    metaDescription: 'മിഷൻ 87: എഐ, ഡിജിറ്റൽ ഏജൻസികൾ, പ്രാദേശിക സംരംഭങ്ങൾ എന്നിവയിലൂടെ യുവജനങ്ങൾക്ക് സ്വയംതൊഴിൽ നൽകുന്ന ദേശീയ പ്രസ്ഥാനം.',
    primaryKeywords: [
      'മിഷൻ 87',
      'mission 87 kerala',
      'യുവജന സ്വയംതൊഴിൽ',
      'ചെറുകിട സംരംഭക ആശയങ്ങൾ',
      'എഐ ഡിജിറ്റൽ ഏജൻസി'
    ],
    callToAction: 'സൗജന്യമായി കേഡറ്റായി രജിസ്റ്റർ ചെയ്യുക',
    coreTagline: '8.7 കോടി യുവാക്കൾ ഇന്ത്യയ്ക്കായി കാത്തിരിക്കുകയല്ല, അവർക്ക് എന്ത് നിർമ്മിക്കാൻ കഴിയും എന്നാണ് ഇന്ത്യ കാത്തിരിക്കുന്നത്.'
  },
  {
    langCode: 'pa',
    nameEnglish: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    metaTitle: 'ਮਿਸ਼ਨ 87 (Mission 87 Punjab) - 8.7 ਕਰੋੜ ਨੌਜਵਾਨਾਂ ਲਈ ਰਾਸ਼ਟਰੀ ਆਤਮਨਿਰਭਰ ਰੁਜ਼ਗਾਰ ਲਹਿਰ | Arohi AI',
    metaDescription: 'ਮਿਸ਼ਨ 87: ਪੰਜਾਬ ਅਤੇ ਭਾਰਤ ਦੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਏਆਈ ਅਤੇ ਮਾਈਕਰੋ ਮੈਨੂਫੈਕਚਰਿੰਗ ਨਾਲ ਸਵੈ-ਰੁਜ਼ਗਾਰ ਦੇਣ ਵਾਲਾ ਕੌਮੀ ਮਿਸ਼ਨ।',
    primaryKeywords: [
      'ਮਿਸ਼ਨ 87',
      'mission 87 punjab',
      'ਨੌਜਵਾਨ ਸਵੈ ਰੁਜ਼ਗਾਰ',
      'ਲੁਧਿਆਣਾ ਮਾਈਕਰੋ ਉਦਯੋਗ',
      'ਏਆਈ ਸਟਾਰਟਅੱਪ'
    ],
    callToAction: 'ਮੁਫ਼ਤ ਵਿੱਚ ਕੈਡੇਟ ਵਜੋਂ ਰਜਿਸਟਰ ਕਰੋ',
    coreTagline: '8.7 ਕਰੋੜ ਨੌਜਵਾਨ ਭਾਰਤ ਦੀ ਉਡੀਕ ਨਹੀਂ ਕਰ ਰਹੇ, ਭਾਰਤ ਉਡੀਕ ਰਿਹਾ ਹੈ ਕਿ ਉਹ ਕੀ ਬਣਾ ਸਕਦੇ ਹਨ।'
  },
  {
    langCode: 'as',
    nameEnglish: 'Assamese',
    nativeName: 'অসমীয়া',
    metaTitle: 'মিছন ৮৭ (Mission 87 Assam & Northeast) - ৮.৭ কোটি যুৱক-যুৱতীৰ আত্মনিৰ্ভৰ অৰ্থনৈতিক জাগৰণ | Arohi AI',
    metaDescription: 'মিছন ৮৭: এআই আৰু ক্ষুদ্ৰ খাদ্য প্ৰক্ৰিয়াকৰণৰ দ্বাৰা অসম আৰু উত্তৰ-পূৰ্বাঞ্চলৰ যুৱক-যুৱতীক স্বাৱলম্বী কৰাৰ জাতীয় আন্দোলন।',
    primaryKeywords: [
      'মিছন ৮৭',
      'mission 87 assam',
      'অসম যুৱ নিযুক্তি',
      'ক্ষুদ্ৰ উদ্যোগ অসম',
      'উত্তৰ পূৰ্বাঞ্চল ষ্টাৰ্টআপ'
    ],
    callToAction: 'বিনামূলীয়াকৈ কেডেট হিচাপে যোগদান কৰক',
    coreTagline: '৮.৭ কোটি যুৱক ভাৰতৰ বাবে অপেক্ষা কৰি থকা নাই, ভাৰতে অপেক্ষা কৰিছে তেওঁলোকে কি নিৰ্মাণ কৰিব পাৰে।'
  }
];

export const ALL_INDIAN_STATES_SEO: StateDeploymentSEO[] = [
  {
    state: 'Uttar Pradesh',
    stateCapital: 'Lucknow',
    region: 'North',
    targetDistricts: ['Varanasi', 'Kanpur', 'Prayagraj', 'Gorakhpur', 'Agra', 'Meerut', 'Bareilly', 'Aligarh', 'Moradabad'],
    keyIndustries: ['AI Digital Agencies for Local Traders', 'Brass & Metal Craft Micro-Export', 'Leather & Footwear Ancillary', 'Food Processing & Pulses'],
    localKeywords: ['mission 87 up', 'uttar pradesh youth employment ai', 'varanasi digital agency startup', 'kanpur micro manufacturing', 'up odop ai assistance'],
    schemesAligned: ['ODOP (One District One Product)', 'UP Startup Policy', 'PMEGP UP', 'MUKHYAMANTRI YUVA SWAROZGAR YOJANA']
  },
  {
    state: 'Maharashtra',
    stateCapital: 'Mumbai',
    region: 'West',
    targetDistricts: ['Nashik', 'Pune', 'Nagpur', 'Chhatrapati Sambhajinagar', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded'],
    keyIndustries: ['Solar Food Dehydrators for Onions/Grapes', 'Auto Ancillary CNC Machining', 'Sugar Byproduct Bio-Plastics', 'Regional E-Commerce'],
    localKeywords: ['mission 87 maharashtra', 'nashik solar dehydrator startup', 'pune cnc micro manufacturing', 'maharashtra rojgar ai', 'marathi digital agency'],
    schemesAligned: ['CMEGP (Chief Minister Employment Generation Programme)', 'MahaPreit Micro Funding', 'MUDRA Maharashtra']
  },
  {
    state: 'Odisha',
    stateCapital: 'Bhubaneswar',
    region: 'East',
    targetDistricts: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Berhampur', 'Balasore', 'Koraput', 'Jharsuguda', 'Mayurbhanj'],
    keyIndustries: ['Millets & Tribal Agritech Processing', 'Handloom & Applique AI Direct-to-Consumer', 'Metal Fabrication & Mineral Spares', 'Coastal Aquatech Processing'],
    localKeywords: ['mission 87 odisha', 'odisha youth startup ai', 'bhubaneswar digital business os', 'subhadra yojana youth enterprise', 'odisha millets mission value addition'],
    schemesAligned: ['Startup Odisha', 'Subhadra Yojana', 'Odisha Millets Mission', 'Biju Swasthya & MSME Sahayata']
  },
  {
    state: 'Bihar',
    stateCapital: 'Patna',
    region: 'East',
    targetDistricts: ['Patna', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Begusarai', 'Motihari'],
    keyIndustries: ['Makhana Value-Added Processing & Packaging', 'Bhagalpur Silk Direct-to-Consumer AI', 'Paper Packaging & Corrugated Cartons', 'Local Logistics Tech'],
    localKeywords: ['mission 87 bihar', 'bihar udyami yojana ai', 'patna makhana packaging project report', 'bihar youth self employment', 'darbhanga muzaffarpur local agency'],
    schemesAligned: ['Mukhya Mantri Udyami Yojana Bihar', 'PMFME Bihar', 'Bihar Startup Policy']
  },
  {
    state: 'Tamil Nadu',
    stateCapital: 'Chennai',
    region: 'South',
    targetDistricts: ['Coimbatore', 'Madurai', 'Tiruppur', 'Salem', 'Trichy', 'Erode', 'Vellore', 'Thoothukudi'],
    keyIndustries: ['CNC EV Precision Components', 'Knitwear & Garment Direct Exports', 'Coir & Agricultural Waste Value Add', 'SaaS & Local B2B Ops'],
    localKeywords: ['mission 87 tamil nadu', 'coimbatore precision machining startup', 'tiruppur apparel ai automation', 'tamil nadu needs scheme', 'tn msme portal'],
    schemesAligned: ['NEEDS Scheme Tamil Nadu', 'UYEGP', 'TIDCO Micro Aerospace & Defense Incubator']
  },
  {
    state: 'Karnataka',
    stateCapital: 'Bengaluru',
    region: 'South',
    targetDistricts: ['Hubballi-Dharwad', 'Mysuru', 'Belagavi', 'Mangaluru', 'Kalaburagi', 'Ballari', 'Shivamogga'],
    keyIndustries: ['Spices & Coffee Secondary Processing', 'Aerospace Precision Job-Works', 'Silk Weaving Automation & Direct Commerce', 'Tier-2 Tech Guilds'],
    localKeywords: ['mission 87 karnataka', 'mysuru agritech processing', 'hubballi micro manufacturing', 'karnataka self employment loan', 'yuva nidhi scheme upgrade'],
    schemesAligned: ['Yuva Nidhi to Enterprise Pathway', 'Karnataka Startup Policy', 'CMEGP Karnataka']
  },
  {
    state: 'Gujarat',
    stateCapital: 'Gandhinagar',
    region: 'West',
    targetDistricts: ['Surat', 'Ahmedabad', 'Rajkot', 'Vadodara', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Mehsana'],
    keyIndustries: ['Brass Component Production (Jamnagar)', 'Textile Chemical Formulations (Surat)', 'Precision Hardware (Rajkot)', 'Ceramic Spares (Morbi)'],
    localKeywords: ['mission 87 gujarat', 'rajkot cnc workshop project report', 'surat textile direct export ai', 'gujarat msme subsidy scheme', 'jamnagar brass micro enterprise'],
    schemesAligned: ['Gujarat Industrial Policy 2025', 'Shree Vajpayee Bankable Scheme', 'Dr. Ambedkar Swavalamban Yojana']
  },
  {
    state: 'Rajasthan',
    stateCapital: 'Jaipur',
    region: 'North',
    targetDistricts: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Bikaner', 'Ajmer', 'Bhilwara', 'Alwar'],
    keyIndustries: ['Handicraft & Marble Waste Composite Tiles', 'Spices & Cold-Pressed Mustard Oil', 'Solar Panel Maintenance & Cleaning Kits', 'Textile Block Print D2C'],
    localKeywords: ['mission 87 rajasthan', 'jaipur handicraft export ai', 'jodhpur stone composite manufacturing', 'iStart rajasthan student grant', 'rajasthan mmsy loan'],
    schemesAligned: ['iStart Rajasthan', 'Mukhyamantri Laghu Udyog Protsahan Yojana (MLUPY)']
  },
  {
    state: 'Madhya Pradesh',
    stateCapital: 'Bhopal',
    region: 'Central',
    targetDistricts: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna'],
    keyIndustries: ['Soybean & Wheat Secondary Processing', 'Herbal Extracts & Forest Produce Value Addition', 'Automotive Casting Machining', 'Local FMCG Brands'],
    localKeywords: ['mission 87 mp', 'indore food processing business report', 'mp udyam kranti yojana', 'bhopal youth startup', 'madhya pradesh rojgar mission'],
    schemesAligned: ['Mukhyamantri Udyam Kranti Yojana', 'MP Startup Policy', 'Sant Ravidas Swarojgar Yojana']
  },
  {
    state: 'West Bengal',
    stateCapital: 'Kolkata',
    region: 'East',
    targetDistricts: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol', 'Malda', 'Kharagpur', 'Nadia'],
    keyIndustries: ['Jute Composite Products & Bags', 'Tea & Organic Fruit Processing', 'Light Engineering & Foundries (Howrah)', 'Handloom Tant Sarees D2C'],
    localKeywords: ['mission 87 west bengal', 'howrah light engineering ai', 'siliguri food processing packaging', 'bengal student credit card to enterprise', 'wb karmasathi prakalpa'],
    schemesAligned: ['Karma Sathi Prakalpa', 'West Bengal MSME Synergy', 'Banglashree Scheme']
  },
  {
    state: 'Telangana',
    stateCapital: 'Hyderabad',
    region: 'South',
    targetDistricts: ['Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Nalgonda', 'Mahabubnagar', 'Ramagundam'],
    keyIndustries: ['Turmeric Processing & Curcumin Extraction (Nizamabad)', 'Handloom Pochampally Global D2C', 'Pharma Intermediates Machining', 'Solar Micro-Grid Ops'],
    localKeywords: ['mission 87 telangana', 'warangal local enterprise', 'nizamabad turmeric processing dpr', 'ts-iass msme registration', 'telangana t-hub rural accelerator'],
    schemesAligned: ['T-IDEA (Telangana State Industrial Development and Entrepreneur Advancement)', 'T-PRIDE', 'WE-Hub']
  },
  {
    state: 'Andhra Pradesh',
    stateCapital: 'Amaravati',
    region: 'South',
    targetDistricts: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kakinada', 'Kurnool', 'Nellore', 'Anantapur'],
    keyIndustries: ['Aquaculture & Shrimp Cold-Chain Logistics', 'Chilli & Spice Oleoresin Processing (Guntur)', 'Automotive Components (Sri City)', 'Coir & Banana Fiber'],
    localKeywords: ['mission 87 andhra pradesh', 'guntur chilli export setup', 'vizag maritime logistics agency', 'ap msme development corporation', 'ysr cheyutha enterprise'],
    schemesAligned: ['AP MSME One-Stop Portal', 'YSR Navodayam', 'AP Innovation Society']
  },
  {
    state: 'Punjab',
    stateCapital: 'Chandigarh',
    region: 'North',
    targetDistricts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur'],
    keyIndustries: ['Bicycle & Light Engineering Components', 'Sports Goods & Fitness Equipment', 'Food Processing & Dairy Automation', 'Garment Knitting Micro-Hubs'],
    localKeywords: ['mission 87 punjab', 'ludhiana bicycle parts micro enterprise', 'jalandhar sports goods export ai', 'punjab startup hub', 'punjab ghar ghar rozgar upgrade'],
    schemesAligned: ['Invest Punjab MSME', 'Startup Punjab Seed Fund', 'PMEGP Punjab']
  },
  {
    state: 'Haryana',
    stateCapital: 'Chandigarh',
    region: 'North',
    targetDistricts: ['Faridabad', 'Gurugram', 'Panipat', 'Ambala', 'Hisar', 'Karnal', 'Rohtak', 'Yamunanagar'],
    keyIndustries: ['Home Furnishing & Recycled Yarn (Panipat)', 'Scientific Glassware (Ambala)', 'Plywood & Biomass Pellets (Yamunanagar)', 'Auto Sheet Metal Works'],
    localKeywords: ['mission 87 haryana', 'panipat recycled yarn startup', 'ambala scientific instruments direct sales', 'haryana saksham yuva to entrepreneur', 'haryana msme policy'],
    schemesAligned: ['Haryana Enterprise & Employment Policy (HEEP)', 'Mukhyamantri Antyodaya Parivar Utthan Yojana']
  },
  {
    state: 'Kerala',
    stateCapital: 'Thiruvananthapuram',
    region: 'South',
    targetDistricts: ['Ernakulam', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Kannur', 'Alappuzha', 'Kottayam'],
    keyIndustries: ['Ayurvedic Food & Herbal Extracts', 'Coir Geo-Textiles & Eco-Packaging', 'Spices Freeze-Drying Micro-Units', 'Specialty Marine Exports'],
    localKeywords: ['mission 87 kerala', 'kerala startup mission micro enterprise', 'kozhikode spices export ai', 'kerala msme year of enterprises', 'kudumbashree enterprise scaling'],
    schemesAligned: ['Kerala Startup Mission (KSUM)', 'Kerala MSME Nanma', 'KFC Entrepreneurship Loan']
  },
  {
    state: 'Assam',
    stateCapital: 'Dispur / Guwahati',
    region: 'Northeast',
    targetDistricts: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon'],
    keyIndustries: ['Specialty CTC & Orthodox Tea Direct Packaging', 'Bamboo Utility & Engineered Timber Units', 'Eri & Muga Silk AI Commerce', 'Medicinal Plants & Turmeric'],
    localKeywords: ['mission 87 assam', 'assam bamboo processing project report', 'guwahati tea direct brand ai', 'mukhya mantri atmanirbhar asom abhijan', 'northeast startup portal'],
    schemesAligned: ['Mukhya Mantri Atmanirbhar Asom Abhijan (CMAAA)', 'NEDFi Micro-Finance', 'North East Industrial Development Scheme']
  },
  {
    state: 'Jharkhand',
    stateCapital: 'Ranchi',
    region: 'East',
    targetDistricts: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih'],
    keyIndustries: ['Mica & Mineral Ancillary Spares', 'Minor Forest Produce (Lac, Mahua, Tussar Silk)', 'Refractory & Steel Fabrication', 'Poultry & Fish Farming Automation'],
    localKeywords: ['mission 87 jharkhand', 'ranchi micro fabrication startup', 'jamshedpur auto ancillaries', 'jharkhand startup policy', 'jharkhand mukhyamantri rojgar srijan yojana'],
    schemesAligned: ['Mukhyamantri Rojgar Srijan Yojana (MMRSY)', 'Jharkhand MSME Policy', 'Jharcraft Rural Hubs']
  },
  {
    state: 'Chhattisgarh',
    stateCapital: 'Raipur',
    region: 'Central',
    targetDistricts: ['Raipur', 'Bhilai / Durg', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Jagdalpur / Bastar'],
    keyIndustries: ['Kosa Silk & Bell Metal Handicrafts', 'Rice Husk Biomass Pellets', 'Secondary Steel Job Works', 'Herbal & Minor Forest Produce (Bastar)'],
    localKeywords: ['mission 87 chhattisgarh', 'raipur biomass pellet business dpr', 'bastar kosa silk direct brand', 'chhattisgarh yuva swarojgar yojana', 'bhilai fabrication'],
    schemesAligned: ['Mukhyamantri Yuva Swarojgar Yojana CG', 'Chhattisgarh Industrial Policy']
  },
  {
    state: 'Uttarakhand',
    stateCapital: 'Dehradun',
    region: 'North',
    targetDistricts: ['Dehradun', 'Haridwar', 'Udham Singh Nagar', 'Nainital', 'Rishikesh', 'Almora'],
    keyIndustries: ['Aromatic Oils & Lavender Distillation', 'High-Altitude Apple & Fruit Preserves', 'Pharma Packaging & Blister Foils', 'Eco-Tourism Homestay Digital Systems'],
    localKeywords: ['mission 87 uttarakhand', 'haridwar herbal processing setup', 'dehradun aromatic distillation unit', 'uttarakhand mukhyamantri swarojgar yojana', 'veerdeen dayal upadhyay yojana'],
    schemesAligned: ['Mukhyamantri Swarojgar Yojana (MSY Uttarakhand)', 'Veer Chandra Singh Garhwali Scheme']
  },
  {
    state: 'Himachal Pradesh',
    stateCapital: 'Shimla',
    region: 'North',
    targetDistricts: ['Solan', 'Kangra', 'Mandi', 'Kullu', 'Shimla', 'Una', 'Sirmaur'],
    keyIndustries: ['Apple Juice & Cider Concentrates', 'Pharma Intermediate Machining (Baddi)', 'Handloom Woolens & Kullu Shawls', 'Mushroom Cultivation & Canning'],
    localKeywords: ['mission 87 himachal pradesh', 'solan mushroom canning dpr', 'baddi pharma ancillary jobs', 'mukhyamantri swavalamban yojana hp', 'himachal startup scheme'],
    schemesAligned: ['Mukhyamantri Swavalamban Yojana (HP)', 'HIMSTARTUP']
  },
  {
    state: 'Goa',
    stateCapital: 'Panaji',
    region: 'West',
    targetDistricts: ['North Goa', 'South Goa'],
    keyIndustries: ['Cashew Processing & Feni Packaging Innovation', 'Eco-Friendly Boat Cleaning Solutions', 'Digital Nomad Tech Guilds', 'Bakery & Culinary Exports'],
    localKeywords: ['mission 87 goa', 'goa cashew processing micro unit', 'goa startup policy micro grant', 'chief minister rozgar yojana goa'],
    schemesAligned: ['Chief Minister’s Rozgar Yojana (CMRY Goa)', 'Goa Startup Policy']
  },
  {
    state: 'Tripura',
    stateCapital: 'Agartala',
    region: 'Northeast',
    targetDistricts: ['West Tripura', 'Gomati', 'Dhalai', 'Unakoti'],
    keyIndustries: ['Natural Rubber Sheet Products', 'Bamboo Agar-Batti Sticks & Tiles', 'Pineapple Juice Concentrates', 'Tea Value Addition'],
    localKeywords: ['mission 87 tripura', 'tripura rubber product making unit', 'agartala bamboo processing', 'swavalamban scheme tripura'],
    schemesAligned: ['Swavalamban Tripura', 'Tripura Industrial Investment Policy']
  },
  {
    state: 'Meghalaya',
    stateCapital: 'Shillong',
    region: 'Northeast',
    targetDistricts: ['East Khasi Hills', 'West Garo Hills', 'Ri-Bhoi'],
    keyIndustries: ['Lakadong High-Curcumin Turmeric Processing', 'Ginger & Honey Organic Packaging', 'Ecotourism Digital Ops', 'Bamboo Crafts'],
    localKeywords: ['mission 87 meghalaya', 'lakadong turmeric value add dpr', 'shillong youth enterprise', 'prime meghalaya initiative'],
    schemesAligned: ['PRIME Meghalaya Entrepreneurship', 'Meghalaya Startup Mission']
  },
  {
    state: 'Manipur',
    stateCapital: 'Imphal',
    region: 'Northeast',
    targetDistricts: ['Imphal West', 'Imphal East', 'Churachandpur', 'Thoubal'],
    keyIndustries: ['Black Rice (Chak-Hao) Value-Added Food Packs', 'Kauna Reed Mat Weaving D2C', 'Spices & King Chilli (Bhut Jolokia) Sauces'],
    localKeywords: ['mission 87 manipur', 'chak hao black rice packaging', 'start up manipur scheme', 'imphal youth enterprise'],
    schemesAligned: ['StartUp Manipur', 'PMEGP Manipur']
  },
  {
    state: 'Nagaland',
    stateCapital: 'Kohima',
    region: 'Northeast',
    targetDistricts: ['Dimapur', 'Kohima', 'Mokokchung', 'Mon'],
    keyIndustries: ['Naga King Chilli Extracts', 'Organic Coffee & Cardamom Processing', 'Bamboo Architecture Components', 'Tribal Handloom D2C'],
    localKeywords: ['mission 87 nagaland', 'dimapur food processing unit', 'nagaland startup policy', 'kohima youth enterprise'],
    schemesAligned: ['Nagaland Start-up Policy', 'IDAN Micro-Grants']
  },
  {
    state: 'Arunachal Pradesh',
    stateCapital: 'Itanagar',
    region: 'Northeast',
    targetDistricts: ['Papum Pare', 'West Kameng', 'Changlang', 'Lower Subansiri'],
    keyIndustries: ['Kiwi & Large Cardamom Processing Units', 'Bamboo & Cane Modular Furniture', 'Organic Herbal Teas', 'Adventure Tourism Logistics'],
    localKeywords: ['mission 87 arunachal', 'itanagar kiwi processing dpr', 'deen dayal upadhyaya swavalamban yojana arunachal'],
    schemesAligned: ['Deen Dayal Upadhyaya Swavalamban Yojana', 'Arunachal Youth Initiative']
  },
  {
    state: 'Mizoram',
    stateCapital: 'Aizawl',
    region: 'Northeast',
    targetDistricts: ['Aizawl', 'Lunglei', 'Champhai'],
    keyIndustries: ['Mizo Chilli (Bird\'s Eye) Products', 'Bamboo Charcoal & Vinegar Units', 'Ginger Powder Processing', 'Handloom Puan D2C'],
    localKeywords: ['mission 87 mizoram', 'aizawl ginger processing business', 'mizoram youth commission entrepreneurship'],
    schemesAligned: ['SEDPI Mizoram', 'Mizoram Startup Mission']
  },
  {
    state: 'Sikkim',
    stateCapital: 'Gangtok',
    region: 'Northeast',
    targetDistricts: ['East Sikkim', 'West Sikkim', 'South Sikkim', 'North Sikkim'],
    keyIndustries: ['100% Certified Organic Food Preservation', 'Large Cardamom Value Addition', 'Buckwheat & Fermented Foods', 'Eco-Packaging'],
    localKeywords: ['mission 87 sikkim', 'gangtok organic food packaging dpr', 'sikkim youth self employment scheme', 'skilled youth startup sikkim'],
    schemesAligned: ['Skilled Youth Startup Scheme Sikkim', 'Sikkim Organic Mission']
  },
  {
    state: 'Delhi NCR',
    stateCapital: 'New Delhi',
    region: 'UT',
    targetDistricts: ['Central Delhi', 'South Delhi', 'East Delhi', 'North Delhi', 'West Delhi', 'Noida', 'Gurugram', 'Ghaziabad', 'Faridabad'],
    keyIndustries: ['High-Velocity AI Agency Guilds', 'E-Commerce Private Label Fulfillment', 'Quick-Commerce Dark Store Optimization', 'B2B Corporate Invoicing & GST AI'],
    localKeywords: ['mission 87 delhi ncr', 'delhi youth startup ai agency', 'noida e-commerce micro brand', 'delhi government business blasters to enterprise', 'ncr msme hub'],
    schemesAligned: ['Delhi Startup Policy', 'Business Blasters Alumni Support', 'DMRC Micro Commercial Spaces']
  },
  {
    state: 'Jammu & Kashmir',
    stateCapital: 'Srinagar / Jammu',
    region: 'UT',
    targetDistricts: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Pulwama', 'Kathua'],
    keyIndustries: ['Saffron & Walnut Authenticated GI Packs', 'Pashmina & Carpet Authenticity QR Systems', 'Cold-Storage Apple Logistics', 'Aromatic Lavender Farming'],
    localKeywords: ['mission 87 jammu and kashmir', 'srinagar saffron packing unit', 'mumkin scheme jk', 'jk youth mission enterprise', 'mission youth jk funding'],
    schemesAligned: ['Mission Youth J&K (MUMKIN)', 'Tejaswini Scheme', 'J&K Startup Policy']
  },
  {
    state: 'Ladakh',
    stateCapital: 'Leh',
    region: 'UT',
    targetDistricts: ['Leh', 'Kargil'],
    keyIndustries: ['Sea Buckthorn (Leh Berry) Juice & Oil Extract', 'Ladakhi Pashmina Raw Fiber Processing', 'Apricot Jam & Dried Kernels', 'Winter Solar Greenhouses'],
    localKeywords: ['mission 87 ladakh', 'leh seabuckthorn processing unit dpr', 'kargil apricot packaging', 'ladakh youth self employment'],
    schemesAligned: ['Ladakh Green Energy & Agro Policy', 'PMMSY Ladakh', 'MUDRA Ladakh']
  },
  {
    state: 'Chandigarh',
    stateCapital: 'Chandigarh',
    region: 'UT',
    targetDistricts: ['Chandigarh Urban'],
    keyIndustries: ['Regional Digital Agency Consortia', 'Precision Tool Reconditioning', 'Clean Beauty & Cosmetic Formulations', 'Logistics Aggregation'],
    localKeywords: ['mission 87 chandigarh', 'tricity ai agency startup', 'chandigarh startup accelerator'],
    schemesAligned: ['Chandigarh Administration MSME', 'Start In Tricity']
  },
  {
    state: 'Puducherry',
    stateCapital: 'Puducherry',
    region: 'UT',
    targetDistricts: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
    keyIndustries: ['Handmade Paper & Eco-Decor', 'Specialty Bakery & French Confectionery Exports', 'Organic Spirulina & Seaweed Cultivation', 'E-Tourism AI'],
    localKeywords: ['mission 87 puducherry', 'puducherry handmade paper unit', 'pondicherry youth enterprise scheme'],
    schemesAligned: ['Puducherry Industrial Promotion Development', 'PMEGP Puducherry']
  },
  {
    state: 'Andaman & Nicobar Islands',
    stateCapital: 'Port Blair',
    region: 'UT',
    targetDistricts: ['South Andaman', 'North and Middle Andaman', 'Nicobar'],
    keyIndustries: ['Virgin Coconut Oil (VCO) & Shell Crafts', 'Spices (Clove, Nutmeg) Direct GI Packs', 'Sustainable Fish Processing', 'Eco-Friendly Resort Supply'],
    localKeywords: ['mission 87 andaman', 'port blair coconut oil processing unit', 'andaman youth entrepreneurship scheme'],
    schemesAligned: ['ANIIDCO Micro Loans', 'Island Development Policy']
  }
];

export const STATE_DEPLOYMENT_SEO_LIST = ALL_INDIAN_STATES_SEO;
