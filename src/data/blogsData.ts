export interface BlogPost {
  id: string;
  slug: string;
  category: 'ai-tech' | 'sarkari-jobs' | 'msme-business' | 'pm-schemes' | 'career-resume' | 'education' | 'women-empowerment';
  categoryLabel: string;
  trendingTag: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  views: number;
  shares: number;
  isTrending?: boolean;
  isFeatured?: boolean;
  tags: string[];
  title: Record<string, string>; // Language code mapped to localized title (en, hi, or, bn, te, mr, ta, gu, kn, ml, pa, ur)
  summary: Record<string, string>;
  content: Record<string, string>;
  keyTakeaways: Record<string, string[]>;
  relatedTab: string; // The primary Arohi AI tab to link back to
  relatedTabLabel: string;
  linkbacks: Array<{
    anchorText: string;
    tab: string;
    context: string;
  }>;
}

export const BLOG_CATEGORIES = [
  { id: 'all', label: '🌐 All Topics', icon: '🔥' },
  { id: 'ai-tech', label: '🤖 AI & Voice Innovation', icon: '⚡' },
  { id: 'sarkari-jobs', label: '💼 Sarkari & Private Jobs', icon: '🏛️' },
  { id: 'msme-business', label: '🚀 MSME Business & Loans', icon: '📈' },
  { id: 'pm-schemes', label: '🇮🇳 PM Schemes & Yojanas', icon: '🎯' },
  { id: 'career-resume', label: '📝 Resume & Interview AI', icon: '💡' },
  { id: 'education', label: '🎓 Education & CBSE/Odisha', icon: '📚' },
  { id: 'women-empowerment', label: '🌺 Women Entrepreneurship', icon: '✨' },
];

export const INDIAN_LANGUAGES_BLOG = [
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'English' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳', label: 'Hindi' },
  { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳', label: 'Odia' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳', label: 'Bengali' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳', label: 'Telugu' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳', label: 'Marathi' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳', label: 'Tamil' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳', label: 'Gujarati' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', label: 'Kannada' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳', label: 'Malayalam' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳', label: 'Punjabi' },
  { code: 'ur', name: 'اردو', flag: '🇮🇳', label: 'Urdu' },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'ai-voice-assistant-revolution-2026',
    slug: 'ai-voice-assistant-revolution-2026',
    category: 'ai-tech',
    categoryLabel: 'AI & Voice Innovation',
    trendingTag: '🔥 Trending #1 in India AI',
    readTime: '5 min read',
    publishDate: 'Aug 04, 2026',
    author: {
      name: 'Dr. Aarav Sengupta',
      role: 'Chief AI Strategist, Arohi AI Labs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80&referrerpolicy=no-referrer'
    },
    views: 48920,
    shares: 3410,
    isTrending: true,
    isFeatured: true,
    tags: ['AI Voice Guide', 'Multilingual AI', 'Arohi AI', 'Careers in 2026', 'Speech Tech'],
    relatedTab: 'arohi',
    relatedTabLabel: 'Talk to Arohi AI Voice Guide',
    linkbacks: [
      { anchorText: 'Arohi Live Multilingual AI Voice Assistant', tab: 'arohi', context: 'Get instant live voice answers in 150+ regional Indian languages.' },
      { anchorText: 'Arohi AI Resume Score Analyzer', tab: 'resume', context: 'Grade your CV against international ATS algorithms instantly.' },
      { anchorText: 'Sarkari & Private Jobs Board', tab: 'jobs', context: 'Explore over 10,000+ verified active vacancies across India.' }
    ],
    title: {
      en: 'How Multilingual AI Voice Assistants Are Transforming Job Search & Career Growth in 2026',
      hi: 'बहुभाषी एआई वॉयस असिस्टेंट 2026 में नौकरी खोज और करियर विकास को कैसे बदल रहे हैं',
      or: '୨୦୨୬ ରେ ବହୁଭାଷୀ AI ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ କିପରି ଚାକିରି ସନ୍ଧାନ ଓ କ୍ୟାରିୟର ବୃଦ୍ଧିକୁ ବଦଳାଉଛି',
      bn: 'বহুভাষিক এআই ভয়েস অ্যাসিস্ট্যান্ট কীভাবে ২০২৬ সালে চাকরি খোঁজা এবং ক্যারিয়ার সমৃদ্ধি রূপান্তর করছে',
      te: '2026 లో ఉద్యోగ శోధన మరియు కెరీర్ ಬೆಳవణికను బహుభాషా AI వాయిస్ అసిస్టెంట్లు ఎలా మారుస్తున్నాయి',
      mr: '2026 मध्ये बहुभाषिक AI व्हॉईस असिस्टंट्स नोकरी शोध आणि करिअर वाढीस कशी दिशा देत आहेत',
      ta: '2026 இல் பன்மொழி AI குரல் உதவியாளர்கள் வேலை தேடல் மற்றும் தொழில் வளர்ச்சியை எவ்வாறு மாற்றுகின்றன',
      gu: '2026 માં મલ્ટિલિંગ્યુઅલ AI વોઇસ આસિસ્ટન્ટ્સ નોકરીની શોધ અને કરિયર ગ્રોથને કેવી રીતે બદલી રહ્યા છે'
    },
    summary: {
      en: 'Discover how Indian candidates and students are leveraging voice-guided AI in 150+ regional languages to prepare for exams, practice mock interviews, scan resumes, and unlock government subsidies.',
      hi: 'जानें कि कैसे भारतीय उम्मीदवार और छात्र 150+ क्षेत्रीय भाषाओं में वॉयस-गाइडेड AI का लाभ उठाकर परीक्षाओं की तैयारी कर रहे हैं, मॉक इंटरव्यू का अभ्यास कर रहे हैं और सरकारी सब्सिडी का लाभ उठा रहे हैं।',
      or: 'ଜାଣନ୍ତୁ କିପରି ଭାରତୀୟ ପରୀକ୍ଷାର୍ଥୀ ଓ ଛାତ୍ରଛାତ୍ରୀମାନେ ୧୫୦+ ଆଞ୍ଚଳିକ ଭାଷାରେ AI ଭଏସ୍ ମାର୍ଗଦର୍ଶନ ପାଇ ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି, ମକ୍ ଇଣ୍ଟରଭ୍ୟୁ ଓ ସରକାରୀ ଯୋଜନାର ସୁଫଳ ନେଉଛନ୍ତି।',
      bn: 'জানুন কিভাবে ভারতীয় প্রার্থীরা ১৫০+ আঞ্চলিক ভাষায় এআই ভয়েস নির্দেশিকা ব্যবহার করে পরীক্ষার প্রস্তুতি নিচ্ছেন এবং সরকারি সুযোগ সুবিধা পাচ্ছেন।'
    },
    keyTakeaways: {
      en: [
        'Voice interaction removes language barriers for tier-2, tier-3 city candidates across India.',
        'Real-time voice feedback accelerates interview prep and confidence by 300%.',
        'Direct link to Arohi AI Voice Guide provides 24/7 access to Sarkari job alerts and MSME grant criteria.'
      ],
      hi: [
        'वॉयस इंटरैक्शन भारत के tier-2 और tier-3 शहरों के उम्मीदवारों के लिए भाषा की बाधाओं को खत्म करता है।',
        'रियल-टाइम वॉयस फीडबैक इंटरव्यू की तैयारी और आत्मविश्वास को 300% तक बढ़ाता है।',
        'आरोही एआई वॉयस गाइड सीधे 24/7 सरकारी नौकरी अलर्ट और एमएसएमई अनुदान मानदंडों तक पहुंच प्रदान करता है।'
      ],
      or: [
        'ଭଏସ୍ କଥୋପକଥନ ଭାରତର ଗ୍ରାମାଞ୍ଚଳ ଓ ସହରାଞ୍ଚଳର ପରୀକ୍ଷାର୍ଥୀଙ୍କ ପାଇଁ ଭାଷା ପ୍ରତିବନ୍ଧକ ଦୂର କରିଥାଏ।',
        'ରିଏଲ୍-ଟାଇମ୍ ଭଏସ୍ ମାର୍ଗଦର୍ଶନ ଇଣ୍ଟରଭ୍ୟୁ ପ୍ରସ୍ତୁତିକୁ ୩୦୦% ଦ୍ରୁତତର କରିଥାଏ।',
        'ଆରୋହୀ AI ଭଏସ୍ ସହାୟତା ୨୪/୭ ସରକାରୀ ଚାକିରି ଖବର ଓ MSME ଋଣ ସହାୟତା ଯୋଗାଇଥାଏ।'
      ]
    },
    content: {
      en: `
### The New Era of AI-Powered Job Discovery in India

The landscape of professional growth and government job recruitment in India is undergoing a massive paradigm shift. In 2026, text-only search engines are quickly giving way to intelligent, conversational voice assistants capable of understanding nuances in regional dialects such as **Hindi, Odia, Bengali, Telugu, Tamil, Marathi, and Gujarati**.

Whether you are an SSC CGL candidate in Patna, an engineering graduate in Bhubaneswar, or a rural entrepreneur seeking PM Mudra loan assistance in Cuttack, voice guidance eliminates technical friction.

#### Why Voice Search Matters for Indian Aspirants:
1. **Instant Dialect Understanding**: Candidates no longer need complex English keyboarding skills to discover exam cutoffs, syllabus updates, or notification PDFs.
2. **Interactive Mock Interview Coaching**: Speech-to-speech feedback enables students to practice verbal responses, polish posture, and eliminate hesitation before stepping into real job panels.
3. **Seamless Access to Government Schemes**: From **PM Vishwakarma** to **Lakhpati Didi**, candidates can speak directly to an AI coach to compute their subsidy eligibility in under 30 seconds.

#### How to Utilize Arohi AI for Maximum Career Advantage
You can test this technology live right inside our ecosystem. Simply head over to the **[Arohi AI Voice Assistant Portal](/?tab=arohi)** and click "Talk to Arohi". You can ask questions in your mother tongue like:
- *"SSC CGL 2026 exam date and age limit kitni hai?"*
- *"Odisha Subhadra Yojana form apply kaise karein?"*
- *"Suggest top high-paying IT skills for freshers in 2026."*

#### Unlock Full Career Suite LinkBacks
To get ahead of competition:
- Evaluate your CV with our **[Arohi AI Resume Score Analyzer](/?tab=resume)** to achieve 90%+ ATS compatibility.
- Explore the **[Sarkari & Private Jobs Board](/?tab=jobs)** to apply directly for live vacancies.
- Check MSME startup funding options on our **[MSME Business & Startup Portal](/?tab=business)**.
      `,
      hi: `
### भारत में एआई-संचालित नौकरी खोज का नया युग

2026 में भारत में करियर विकास और सरकारी नौकरी भर्ती का तरीका तेजी से बदल रहा है। अब केवल टेक्स्ट सर्च की जगह **हिंदी, ओडिया, बंगाली, तेलुगु, तमिल, मराठी और गुजराती** जैसी क्षेत्रीय भाषाओं में वॉयस असिस्टेंट ले रहे हैं।

#### भारतीय उम्मीदवारों के लिए वॉयस असिस्टेंट क्यों महत्वपूर्ण है:
1. **अपनी भाषा में सीधी बात**: उम्मीदवारों को परीक्षा कटऑफ, पाठ्यक्रम और अधिसूचना पाने के लिए अंग्रेजी टाइपिंग की आवश्यकता नहीं है।
2. **लाइव मॉक इंटरव्यू कोचिंग**: वॉयस फीडबैक से छात्र साक्षात्कार में आत्मविश्वास बढ़ा सकते हैं।
3. **सरकारी योजनाओं की जानकारी**: **प्रधानमंत्री मुद्रा योजना** और **सुभद्रा योजना** की पात्रता 30 सेकंड में जानें।

#### आरोही एआई का उपयोग कैसे करें:
हमारे मंच पर **[आरोही एआई वॉयस असिस्टेंट](/?tab=arohi)** खोलें और अपनी मातृभाषा में प्रश्न पूछें:
- **[सरकारी एवं निजी नौकरी बोर्ड](/?tab=jobs)** पर नवीनतम रिक्तियां देखें।
- **[आरोही एआई रेज़्यूमे स्कोर विश्लेषक](/?tab=resume)** पर अपना सीवी अपलोड करें।
- **[एमएसएमई बिजनेस एवं स्टार्टअप पोर्टल](/?tab=business)** पर बिजनेस लोन योजनाएं जांचें।
      `,
      or: `
### ଭାରତରେ AI-ଚାଳିତ ଚାକିରି ସନ୍ଧାନର ନୂତନ ଯୁଗ

୨୦୨୬ ରେ ଭାରତୀୟ ପରୀକ୍ଷାର୍ଥୀ ଓ ଯୁବକଯୁବତୀମାନେ ନିଜ ମାତୃଭାଷା **ଓଡ଼ିଆ, ହିନ୍ଦୀ, ବଙ୍ଗାଳୀ, ତେଲୁଗୁ, ତାମିଲ** ରେ AI ସହ କଥା ହୋଇ ସରକାରୀ ଓ ବେସରକାରୀ ନିଯୁକ୍ତି ଖବର ପାଉଛନ୍ତି।

#### ଆରୋହୀ AI ର ପ୍ରମୁଖ ସୁବିଧା:
1. **ମାତୃଭାଷାରେ ସହାୟତା**: ଓଡ଼ିଶା OPSC, OSSSC, OSSC ଓ କେନ୍ଦ୍ରୀୟ SSC, Railway ସିଲାବସ୍ ସହଜରେ ପାଆନ୍ତୁ।
2. **ଲାଇଭ୍ ମକ୍ ଇଣ୍ଟରଭ୍ୟୁ**: AI ଭଏସ୍ ଗାଇଡ୍ ସହ ଇଣ୍ଟରଭ୍ୟୁ ଅଭ୍ୟାସ କରନ୍ତୁ।

#### ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସେବା ଲିଙ୍କ:
- ନିଜର ରେଜୁମେ ସ୍କୋର ଯାଞ୍ଚ କରିବା ପାଇଁ **[ଆରୋହୀ AI ରେଜୁମେ ଆନାଲାଇଜର୍](/?tab=resume)** ବ୍ୟବହାର କରନ୍ତୁ।
- ଲାଇଭ୍ ଚାକିରି ଦେଖିବା ପାଇଁ **[ସରକାରୀ ଓ ବେସରକାରୀ ଯୋଜନା ବୋର୍ଡ](/?tab=jobs)** କୁ ଯାଆନ୍ତୁ।
- ବ୍ୟବସାୟ ଋଣ ପାଇଁ **[MSME ଓ ଷ୍ଟାର୍ଟଅପ୍ ଗାଇଡ୍](/?tab=business)** ପରିଦର୍ଶନ କରନ୍ତୁ।
      `
    }
  },
  {
    id: 'ssc-cgl-2026-preparation-roadmap-cutoffs',
    slug: 'ssc-cgl-2026-preparation-roadmap-cutoffs',
    category: 'sarkari-jobs',
    categoryLabel: 'Sarkari & Private Jobs',
    trendingTag: '🔥 SSC 2026 Official',
    readTime: '7 min read',
    publishDate: 'Aug 03, 2026',
    author: {
      name: 'Rajeshwar Patnaik',
      role: 'Senior Sarkari Exam Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80&referrerpolicy=no-referrer'
    },
    views: 62140,
    shares: 5120,
    isTrending: true,
    isFeatured: true,
    tags: ['SSC CGL 2026', 'Sarkari Result', 'Exam Cutoff', 'Tier 1 Syllabus', 'Government Jobs'],
    relatedTab: 'jobs',
    relatedTabLabel: 'View SSC & Govt Job Notifications',
    linkbacks: [
      { anchorText: 'Sarkari Job Board & Notification Center', tab: 'jobs', context: 'Check live application deadlines, syllabus PDFs, and official notifications.' },
      { anchorText: 'AI School & Exam Syllabus Directory', tab: 'syllabus', context: 'Download topic-wise subject notes and competitive exam patterns.' },
      { anchorText: 'AI Mock Interview Simulator', tab: 'interview', context: 'Practice Tier-2 interview questions with instant voice feedback.' }
    ],
    title: {
      en: 'SSC CGL 2026 Complete Preparation Strategy: Tier 1 & Tier 2 Cutoffs, Syllabus & Booklist',
      hi: 'एसएससी सीजीएल 2026 की संपूर्ण तैयारी रणनीति: टियर 1 और टियर 2 कटऑफ, पाठ्यक्रम और पुस्तकें',
      or: 'SSC CGL ୨୦୨୬ ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରସ୍ତୁତି ରୋଡମ୍ୟାପ୍: ଟାୟାର ୧ ଓ ୨ କଟ୍-ଅଫ୍, ସିଲାବସ୍ ଓ ବହି ସୂଚୀ',
      bn: 'এসএসসি সিজিএল ২০২৬ সম্পূর্ণ প্রস্তুতি কৌশল: টায়ার ১ ও ২ কাটঅফ, সিলেবাস ও সেরা বই'
    },
    summary: {
      en: 'A comprehensive guide for SSC CGL 2026 aspirants covering subject-wise strategy for Quantitative Aptitude, English Comprehension, Reasoning, General Awareness, and Computer Proficiency.',
      hi: 'एसएससी सीजीएल 2026 उम्मीदवारों के लिए क्वांटिटेटिव एप्टीट्यूड, इंग्लिश, रीज़निंग, जनरल अवेयरनेस और कंप्यूटर दक्षता के लिए संपूर्ण रणनीति।',
      or: 'SSC CGL ୨୦୨୬ ପରୀକ୍ଷାର୍ଥୀଙ୍କ ପାଇଁ ଗଣିତ, ଇଂରାଜୀ, ରିଜନିଂ, ଜେନେରାଲ ନଲେଜ୍ ଓ କମ୍ପ୍ୟୁଟର ବିଷୟର ସମ୍ପୂର୍ଣ୍ଣ ମାର୍ଗଦର୍ଶିକା।'
    },
    keyTakeaways: {
      en: [
        'Expected Tier-1 cutoff for UR candidates in 2026 is 142-148 marks.',
        'Computer Knowledge module is qualifying but mandatory; do not neglect it.',
        'Use Arohi AI Resume & Career roadmap tools to match your qualifications with Ministry posts.'
      ],
      hi: [
        '2026 में UR उम्मीदवारों के लिए संभावित टियर-1 कटऑफ 142-148 अंक है।',
        'कंप्यूटर ज्ञान मॉड्यूल अर्हकारी है लेकिन अनिवार्य है।',
        'अपनी योग्यता को मंत्रालय पदों से मिलाने के लिए आरोही एआई टूल्स का उपयोग करें।'
      ],
      or: [
        '୨୦୨୬ UR ପରୀକ୍ଷାର୍ଥୀଙ୍କ ପାଇଁ ସମ୍ଭାବ୍ୟ ଟାୟାର-୧ କଟ-ଅଫ୍ ୧୪୨-୧୪୮ ମାର୍କ।',
        'କମ୍ପ୍ୟୁଟର ଜ୍ଞାନ ବିଷୟ ବାଧ୍ୟତାମୂଳକ।'
      ]
    },
    content: {
      en: `
### Master SSC CGL 2026 with a Data-Backed Roadmap

The Staff Selection Commission (SSC) Combined Graduate Level (CGL) examination remains one of India's most sought-after examinations for recruitment into Group 'B' and 'C' Gazetted and Non-Gazetted positions across Central Ministries.

#### Section-Wise Strategy Breakdown:

1. **Quantitative Aptitude**: Focus heavily on Arithmetic (Percentage, Profit & Loss, SI/CI, Ratio) and Advanced Mathematics (Geometry, Trigonometry, Algebra, Mensuration 3D). Practice 50 questions daily under timed constraints.
2. **English Language & Comprehension**: Master Reading Comprehension, Cloze Tests, Error Spotting, and Idioms & Phrases. 
3. **General Intelligence & Reasoning**: High-scoring area. Practice Syllogism, Coding-Decoding, Blood Relations, and Non-Verbal Reasoning.
4. **General Awareness & Current Affairs**: Focus on Static GK (History, Indian Constitution, Geography, Economics) alongside 8 months of current events.

#### Track Live SSC Notifications & Online Form Dates
Don't miss application deadlines! Visit our **[Live Sarkari Jobs Board](/?tab=jobs)** to get real-time alerts on SSC CGL, SSC CHSL, SSC MTS, and Railway RRB announcements.

#### Evaluate Your Academic Profile
- Verify your eligibility criteria on our **[Class 1-10 School & Exam Syllabus Portal](/?tab=syllabus)**.
- Practice interview skills for Assistant Section Officer (ASO) posts on **[AI Mock Interview Portal](/?tab=interview)**.
- Create a professionally formatted resume for corporate backup options with **[Arohi AI Resume Builder](/?tab=resume)**.
      `,
      hi: `
### एसएससी सीजीएल 2026 की सटीक तैयारी रणनीति

एसएससी सीजीएल परीक्षा केंद्र सरकार के विभिन्न मंत्रालयों में अधिकारी बनने का सबसे लोकप्रिय मार्ग है।

#### अनुभाग-वार रणनीति:
1. **गणित (Quantitative Aptitude)**: अंकगणित और एडवांस मैथ (ज्यामिति, त्रिकोणमिति) पर विशेष ध्यान दें।
2. **अंग्रेजी भाषा**: रीडिंग कॉम्प्रिहेंशन, क्लोज टेस्ट और वोकैब पर पकड़ बनाएं।
3. **रीज़निंग**: पहेलियां और कोडिंग-डीकोडिंग का रोज अभ्यास करें।

#### त्वरित लिंक:
- **[सरकारी नौकरी पोर्टल](/?tab=jobs)** पर नवीनतम फॉर्म भरें।
- **[एआई मॉक इंटरव्यू](/?tab=interview)** पर साक्षात्कार का अभ्यास करें।
- **[रेज़्यूमे स्कोर विश्लेषक](/?tab=resume)** से अपना सीवी बेहतर बनाएं।
      `,
      or: `
### SSC CGL ୨୦୨୬ ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି ମାର୍ଗଦର୍ଶିକା

କେନ୍ଦ୍ର ସରକାରୀ ମନ୍ତ୍ରଣାଳୟରେ ASO, Inspector ଓ Tax Assistant ପଦବୀ ପାଇଁ SSC CGL ସର୍ବୋତ୍ତମ ସୁଯୋଗ।

#### ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସେବା ଲିଙ୍କ:
- **[ସରକାରୀ ଚାକିରି ବୋର୍ଡ](/?tab=jobs)** ରେ SSC, ରେଳବାଇ ଓ ବ୍ୟାଙ୍କିଙ୍ଗ ଖବର ଦେଖନ୍ତୁ।
- **[ଆରୋହୀ AI ମକ୍ ଇଣ୍ଟରଭ୍ୟୁ](/?tab=interview)** ରେ ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି କରନ୍ତୁ।
- **[ମାଗଣା ରେଜୁମେ ନିର୍ମାଣ](/?tab=resume)** ର ଲାଭ ନିଅନ୍ତୁ।
      `
    }
  },
  {
    id: 'pm-mudra-loan-and-pmegp-subsidy-guide-2026',
    slug: 'pm-mudra-loan-and-pmegp-subsidy-guide-2026',
    category: 'msme-business',
    categoryLabel: 'MSME Business & Loans',
    trendingTag: '🔥 MSME Funding 2026',
    readTime: '6 min read',
    publishDate: 'Aug 02, 2026',
    author: {
      name: 'Sunita Mohanty',
      role: 'MSME & Startup Grant Consultant',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80&referrerpolicy=no-referrer'
    },
    views: 51290,
    shares: 4200,
    isTrending: true,
    isFeatured: true,
    tags: ['PM Mudra Loan', 'PMEGP Subsidy', 'MSME Grants', 'Udyam Registration', 'Startup India'],
    relatedTab: 'business',
    relatedTabLabel: 'Calculate Mudra Loan & MSME Grants',
    linkbacks: [
      { anchorText: 'MSME Business & Startup Assistant', tab: 'business', context: 'Check Mudra Shishu/Kishor/Tarun loan criteria and project report steps.' },
      { anchorText: 'PM Government Schemes Portal', tab: 'schemes', context: 'Track Central & State schemes including Subhadra & Vishwakarma Yojana.' },
      { anchorText: 'AECN Franchise Hub', tab: 'franchise', context: 'Apply for an AI Education & Career Node franchise in your district.' }
    ],
    title: {
      en: 'PM Mudra Loan & PMEGP Subsidy 2026: How to Secure Up to ₹20 Lakh Collateral-Free Business Funding',
      hi: 'प्रधानमंत्री मुद्रा लोन और पीएमईजीपी सब्सिडी 2026: बिना किसी गारंटी के ₹20 लाख तक का बिजनेस लोन कैसे पाएं',
      or: 'PM ମୁଦ୍ରା ଋଣ ଓ PMEGP ସବସିଡି ୨୦୨୬: ବିନା ଗ୍ୟାରେଣ୍ଟିରେ ₹୨୦ ଲକ୍ଷ ବ୍ୟବସାୟିକ ଋଣ ପାଇବାର ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରକ୍ରିୟା',
      bn: 'প্রধানমন্ত্রী মুদ্রা ঋণ এবং পিএমইজিপি ভরতুকি ২০২৬: জামানত ছাড়াই ২০ লাখ টাকা পর্যন্ত ব্যবস্থার অর্থায়ন পান'
    },
    summary: {
      en: 'Step-by-step guide to applying for PM Mudra Loan (Shishu, Kishor, Tarun) and Prime Minister Employment Generation Programme (PMEGP) 35% capital subsidy for MSMEs and micro-enterprises.',
      hi: 'सूक्ष्म, लघु और मध्यम उद्यमों (MSME) के लिए पीएम मुद्रा लोन और 35% पूंजी सब्सिडी वाले पीएमईजीपी लोन के आवेदन की संपूर्ण प्रक्रिया।',
      or: 'MSME ଓ ନୂତନ ବ୍ୟବସାୟୀଙ୍କ ପାଇଁ PM ମୁଦ୍ରା ଋଣ ଏବଂ ୩୫% ସବସିଡିଯୁକ୍ତ PMEGP ଋଣ ଆବେଦନ ପ୍ରକ୍ରିୟା।'
    },
    keyTakeaways: {
      en: [
        'Mudra Loan cap upgraded to ₹20 Lakhs for eligible established businesses in 2026.',
        'PMEGP scheme provides up to 35% subsidy for rural applicants and female entrepreneurs.',
        'Use Arohi AI Business Assistant to generate project feasibility outlines.'
      ],
      hi: [
        '2026 में पात्र स्थापित व्यवसायों के लिए मुद्रा ऋण सीमा बढ़ाकर ₹20 लाख कर दी गई है।',
        'PMEGP योजना ग्रामीण आवेदकों और महिला उद्यमियों को 35% तक सब्सिडी प्रदान करती है।',
        'परियोजना व्यवहार्यता रूपरेखा तैयार करने के लिए आरोही एआई बिजनेस असिस्टेंट का उपयोग करें।'
      ],
      or: [
        '୨୦୨୬ ରେ ମୁଦ୍ରା ଋଣ ସୀମା ₹୨୦ ଲକ୍ଷକୁ ବୃଦ୍ଧି କରାଯାଇଛି।',
        'PMEGP ଯୋଜନାରେ ମହିଳା ଓ ଗ୍ରାମାଞ୍ଚଳ ବ୍ୟବସାୟୀଙ୍କ ପାଇଁ ୩୫% ସବସିଡି।',
        'ବ୍ୟବସାୟ ପ୍ରକଳ୍ପ ରିପୋର୍ଟ ପାଇଁ ଆରୋହୀ AI ବ୍ୟବସାୟ ସହାୟକ ବ୍ୟବହାର କରନ୍ତୁ।'
      ]
    },
    content: {
      en: `
### Empowering Indian Entrepreneurs with Collateral-Free Capital

Starting a new business or expanding an existing micro-enterprise in India no longer requires pledging ancestral property or paying exorbitant interest rates. Under the Government of India's flagship initiatives—**PRADHAN MANTRI MUDRA YOJANA (PMMY)** and **PMEGP (Prime Minister Employment Generation Programme)**—entrepreneurs can access up to **₹20 Lakhs** in collateral-free bank loans.

#### Key Categories of PM Mudra Loan:
1. **Shishu**: Loans up to ₹50,000 for new startup ideas and local vendors.
2. **Kishor**: Loans above ₹50,000 up to ₹5 Lakhs for machinery purchase and inventory.
3. **Tarun**: Loans above ₹5 Lakhs up to ₹10 Lakhs for enterprise expansion.
4. **Tarun Plus (New 2026 Benchmark)**: Up to ₹20 Lakhs for entrepreneurs with proven digital repayment track records.

#### PMEGP Capital Subsidy Breakdown:
- **Urban Applicants**: 15% (General Category), 25% (Special Category / Women / SC / ST / OBC / Ex-Servicemen).
- **Rural Applicants**: 25% (General Category), **35% Maximum Subsidy** (Special Category / Women / SC / ST / OBC / Differently-abled).

#### How Arohi AI Simplifies Your Loan Approval:
Navigating bank paperwork can be intimidating. Leverage our tools:
- Calculate eligibility on the **[MSME Business & Startup Portal](/?tab=business)**.
- Explore central and state grant trackers on **[PM Government Schemes Tracker](/?tab=schemes)**.
- Partner with us as a district AI center through the **[AECN Franchise Hub](/?tab=franchise)**.
- Ask questions live to **[Arohi Voice AI Assistant](/?tab=arohi)** in Hindi, Odia, Bengali, or English!
      `,
      hi: `
### बिना किसी गारंटी के बिज़नेस लोन और 35% सब्सिडी पाएं

भारत में नया व्यवसाय शुरू करने के लिए **प्रधानमंत्री मुद्रा योजना** और **PMEGP** के तहत ₹20 लाख तक का ऋण बिना किसी बैंक गारंटी के उपलब्ध है।

#### प्रमुख योजनाएं:
- **शिशु ऋण**: ₹50,000 तक
- **किशोर ऋण**: ₹5 लाख तक
- **तरुण ऋण**: ₹10 लाख से ₹20 लाख तक
- **PMEGP सब्सिडी**: ग्रामीण क्षेत्रों में महिलाओं और विशेष वर्गों के लिए 35% तक सब्सिडी।

#### लिंकbacks:
- **[एमएसएमई बिजनेस गाइड](/?tab=business)** पर लोन पात्रता जांचें।
- **[प्रधानमंत्री योजनाएं पोर्टल](/?tab=schemes)** पर सुभद्रा और मुद्रा योजना देखें।
- **[आरोही वॉयस एआई](/?tab=arohi)** से अपनी भाषा में सलाह लें।
      `,
      or: `
### ବିନା ଗ୍ୟାରେଣ୍ଟିରେ ₹୨୦ ଲକ୍ଷ ବ୍ୟବସାୟିକ ଋଣ ଓ ସବସିଡି

**PM ମୁଦ୍ରା ଯୋଜନା** ଏବଂ **PMEGP** ମାଧ୍ୟମରେ ଭାରତୀୟ ଏମଏସଏମଇ ଓ ମହିଳା ଉଦ୍ୟୋଗୀମାନେ ୩୫% ସବସିଡି ସହ ବ୍ୟବସାୟିକ ଋଣ ପାଇପାରିବେ।

#### ମୁଖ୍ୟ ସେବା ଲିଙ୍କ:
- ନିଜର ବ୍ୟବସାୟିକ ଯୋଜନା ପାଇଁ **[MSME ଓ ଷ୍ଟାର୍ଟଅପ୍ ପୋର୍ଟାଲ୍](/?tab=business)** କୁ ଯାଆନ୍ତୁ।
- **[ସରକାରୀ ଯୋଜନା ବୋର୍ଡ](/?tab=schemes)** ରେ ନୂତନ ସବସିଡି ଯାଞ୍ଚ କରନ୍ତୁ।
- **[AECN ଫ୍ରାଞ୍ଚାଇଜ୍ ହବ୍](/?tab=franchise)** ରୁ ଜିଲ୍ଲା AI ସେଣ୍ଟର ସମ୍ପର୍କରେ ଜାଣନ୍ତୁ।
      `
    }
  },
  {
    id: 'ats-resume-optimization-hacks-2026',
    slug: 'ats-resume-optimization-hacks-2026',
    category: 'career-resume',
    categoryLabel: 'Resume & Interview AI',
    trendingTag: '🔥 Career Hack 2026',
    readTime: '5 min read',
    publishDate: 'Aug 01, 2026',
    author: {
      name: 'Priyanka Das',
      role: 'Lead Corporate Talent Scout',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80&referrerpolicy=no-referrer'
    },
    views: 39800,
    shares: 2890,
    isTrending: true,
    isFeatured: false,
    tags: ['ATS Resume', 'Resume Score', 'AI CV Builder', 'Interview Prep', 'Corporate Jobs'],
    relatedTab: 'resume',
    relatedTabLabel: 'Scan Resume ATS Score',
    linkbacks: [
      { anchorText: 'Arohi AI Resume Score Analyzer', tab: 'resume', context: 'Upload your CV to get an instant 0-100 ATS grade and missing keyword alerts.' },
      { anchorText: 'AI Mock Interview Simulator', tab: 'interview', context: 'Practice behavioral and technical questions with real-time feedback.' },
      { anchorText: 'Career Intelligence Roadmap', tab: 'career', context: 'Explore personalized skill progression and salary benchmarks.' }
    ],
    title: {
      en: '10 Proven ATS Resume Optimization Hacks to Pass Applicant Tracking Systems in 2026',
      hi: '2026 में एप्लिकेंट ट्रैकिंग सिस्टम (ATS) को पार करने के लिए 10 प्रमाणित रेज़्यूमे ऑपटिमाइजेशन हैक्स',
      or: '୨୦୨୬ ରେ ଆପ୍ଲିକାଣ୍ଟ ଟ୍ରାକିଂ ସିଷ୍ଟମ୍ (ATS) କୁ ପାସ୍ କରିବା ପାଇଁ ୧୦ଟି ପ୍ରମାଣିତ ରେଜୁମେ ହ୍ୟାକ୍ସ',
      bn: '২০২৬ সালে অ্যাপ্লিক্যান্ট ট্র্যাকিং সিস্টেম (ATS) অতিক্রম করার জন্য ১০টি পরীক্ষিত জীবনবৃত্তান্ত টিপস'
    },
    summary: {
      en: 'Over 75% of job resumes are rejected by automated ATS software before reaching human recruiters. Learn how to format keywords, structure achievements, and pass corporate filters.',
      hi: '75% से अधिक रेज़्यूमे मानव रिक्रूटर तक पहुंचने से पहले ही स्वचालित एटीएस सॉफ्टवेयर द्वारा अस्वीकृत कर दिए जाते हैं। जानिए सही फॉर्मेटिंग और कीवर्ड्स शामिल करने का तरीका।',
      or: '୭୫% ରୁ ଅଧିକ ରେଜୁମେ ATS ସଫ୍ଟୱେର୍ ଦ୍ୱାରା ବାତିଲ୍ ହୋଇଥାଏ। ଜାଣନ୍ତୁ କିପରି ସଠିକ୍ କୀ-ୱାର୍ଡ ବ୍ୟବହାର କରି ଚାକିରି ପାଇବେ।'
    },
    keyTakeaways: {
      en: [
        'Avoid complex graphics, tables, or non-standard fonts that confuse ATS parsers.',
        'Incorporate exact action verbs and industry keywords from the target job description.',
        'Grade your resume live on Arohi AI Resume Analyzer for 95%+ pass confidence.'
      ],
      hi: [
        'जटिल ग्राफिक्स, टेबल या गैर-मानक फ़ॉन्ट से बचें जो एटीएस पार्सर को भ्रमित करते हैं।',
        'लक्षित नौकरी विवरण से सटीक क्रियाओं और उद्योग के प्रमुख शब्दों को शामिल करें।',
        'आरोही एआई रेज़्यूमे विश्लेषक पर अपने सीवी का मुफ़्त स्कोर प्राप्त करें।'
      ],
      or: [
        'ଗ୍ରାଫିକ୍ସ ଓ ଟେବୁଲ୍ ପରିବର୍ତ୍ତେ ସରଳ ଟେକ୍ସଟ୍ ଫର୍ମାଟ୍ ବ୍ୟବହାର କରନ୍ତୁ।',
        'ଆରୋହୀ AI ରେଜୁମେ ଆନାଲାଇଜର୍ ରେ ମାଗଣାରେ ସ୍କୋର୍ ଯାଞ୍ଚ କରନ୍ତୁ।'
      ]
    },
    content: {
      en: `
### Stop Getting Ghosted: Beat Corporate ATS Software in 2026

Did you know that top MNCs, tech hubs, and Indian startups receive over 500 applications for every open position? To handle this volume, talent teams rely on **Applicant Tracking Systems (ATS)** powered by AI parsing algorithms.

If your resume uses fancy columns, icons, tables, or non-standard section headers, the parser collapses your text into gibberish—resulting in an automatic rejection email within minutes.

#### Top 5 ATS Formatting Golden Rules:
1. **Use Standard Headings**: Stick to "Work Experience", "Education", "Skills", and "Certifications".
2. **Quantify Achievements**: Instead of *"Handled sales calls"*, write *"Accelerated client acquisition by 42% generating ₹15 Lakhs quarterly revenue"*.
3. **Include Keyword Density**: Mirror the exact terms found in the job description (e.g., *React.js, Node.js, Financial Modeling, GST Compliance*).
4. **Clean File Format**: Upload standard .PDF or .DOCX files without image embedding.

#### Test Your Resume Score Immediately
Don't guess if your CV is good enough. Head to our **[Arohi AI Resume Score Analyzer](/?tab=resume)** to get:
- An instant 0–100 ATS compatibility grade.
- Missing high-value keyword suggestions tailored to your target post.
- One-click PDF formatting export.

#### Prepare for Next Career Steps:
- Practice mock panel questions on our **[AI Mock Interview Simulator](/?tab=interview)**.
- Discover high-paying career paths on **[Career Intelligence Roadmap](/?tab=career)**.
- Explore live recruiter vacancies on **[Sarkari & Private Jobs Board](/?tab=jobs)**.
      `,
      hi: `
### कॉर्पोरेट एटीएस सॉफ्टवेयर को 2026 में कैसे मात दें

75% से अधिक सीवी एटीएस सॉफ्टवेयर द्वारा खारिज कर दिए जाते हैं। सही कीवर्ड और साधारण टेक्स्ट फॉर्मेट का उपयोग करके अपना इंटरव्यू कॉल सुनिश्चित करें।

#### मुख्य सुझाव:
- साधारण हेडिंग का उपयोग करें: "Work Experience", "Education", "Skills"।
- अपनी उपलब्धियों को संख्या में व्यक्त करें (उदा. "42% बिक्री बढ़ाई")।
- **[आरोही एआई रेज़्यूमे विश्लेषक](/?tab=resume)** पर अपना सीवी मुफ़्त में जांचें।
- **[एआई मॉक इंटरव्यू](/?tab=interview)** पर अभ्यास करें।
      `,
      or: `
### ATS ରେଜୁମେ ସଫ୍ଟୱେର୍ କୁ କିପରି ସଫଳତାର ସହ ପାସ୍ କରିବେ

ଚାକିରି ପାଇଁ ନିଜର ରେଜୁମେ ପ୍ରସ୍ତୁତ କରୁଛନ୍ତି? ସଫ୍ଟୱେର୍ ଦ୍ୱାରା ରିଜେକ୍ଟ ହେବାରୁ ବଞ୍ଚିବା ପାଇଁ ସରଳ ଫର୍ମାଟ୍ ଓ ସଠିକ୍ କୀ-ୱାର୍ଡ ବ୍ୟବହାର କରନ୍ତୁ।

#### ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଲିଙ୍କ:
- ନିଜର CV ଯାଞ୍ଚ ପାଇଁ **[ଆରୋହୀ AI ରେଜୁମେ ଆନାଲାଇଜର୍](/?tab=resume)** ବ୍ୟବହାର କରନ୍ତୁ।
- **[AI ମକ୍ ଇଣ୍ଟରଭ୍ୟୁ](/?tab=interview)** ରେ ପ୍ରଶ୍ନୋତ୍ତର ଅଭ୍ୟାସ କରନ୍ତୁ।
- **[ଚାକିରି ପୋର୍ଟାଲ୍](/?tab=jobs)** ରେ ଆବେଦନ କରନ୍ତୁ।
      `
    }
  },
  {
    id: 'subhadra-yojana-and-odisha-govt-schemes-2026',
    slug: 'subhadra-yojana-and-odisha-govt-schemes-2026',
    category: 'pm-schemes',
    categoryLabel: 'PM Schemes & Yojanas',
    trendingTag: '🔥 Odisha Special 2026',
    readTime: '6 min read',
    publishDate: 'Jul 30, 2026',
    author: {
      name: 'Subhashree Nayak',
      role: 'Odisha State Policy & Governance Researcher',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80&referrerpolicy=no-referrer'
    },
    views: 82400,
    shares: 7890,
    isTrending: true,
    isFeatured: true,
    tags: ['Subhadra Yojana', 'Odisha Schemes', 'PM Vishwakarma', 'Women Empowerment', 'Kalia Yojana'],
    relatedTab: 'schemes',
    relatedTabLabel: 'Check Subhadra & State Scheme Status',
    linkbacks: [
      { anchorText: 'PM & State Government Schemes Tracker', tab: 'schemes', context: 'Check eligibility criteria, DBT direct transfer dates, and required documents.' },
      { anchorText: 'Arohi AI Multilingual Voice Assistant', tab: 'arohi', context: 'Ask Arohi in Odia about Subhadra debit card activation & installment updates.' },
      { anchorText: 'AECN Franchise Node Portal', tab: 'franchise', context: 'Set up a local Jan Seva & AI Guidance Kiosk in your Panchayat.' }
    ],
    title: {
      en: 'Subhadra Yojana Odisha 2026: Complete Eligibility, Voucher Redemption & Status Tracking Guide',
      hi: 'सुभद्रा योजना ओडिशा 2026: संपूर्ण पात्रता, वाउचर रिडेम्पशन और स्टेटस ट्रैकिंग गाइड',
      or: 'ସୁଭଦ୍ରା ଯୋଜନା ଓଡ଼ିଶା ୨୦୨୬: ସମ୍ପୂର୍ଣ୍ଣ ଯୋଗ୍ୟତା, ଟଙ୍କା ପାଇବା ପ୍ରକ୍ରିୟା ଓ ଷ୍ଟାଟସ୍ ଯାଞ୍ଚ ଗାଇଡ୍',
      bn: 'সুভদ্রা যোজনা ওড়িশা ২০২৬: সম্পূর্ণ যোগ্যতা ও স্ট্যাটাস ট্র্যাকিং নির্দেশিকা'
    },
    summary: {
      en: 'Complete guide for female beneficiaries in Odisha to receive ₹50,000 financial assistance over 5 years under Subhadra Yojana, DBT status check, and NPCI Aadhaar bank linking.',
      hi: 'ओडिशा में महिला लाभार्थियों के लिए सुभद्रा योजना के तहत 5 वर्षों में ₹50,000 की वित्तीय सहायता, डीबीटी स्थिति और एनपीसीआई आधार बैंक लिंकिंग की पूरी जानकारी।',
      or: 'ଓଡ଼ିଶାର ମହିଳାମାନଙ୍କ ପାଇଁ ସୁଭଦ୍ରା ଯୋଜନାରେ ୫ ବର୍ଷରେ ₹୫୦,୦୦୦ ସହାୟତା, DBT ବ୍ୟାଙ୍କ ଲିଙ୍କିଙ୍ଗ୍ ଓ ଷ୍ଟାଟସ୍ ଦେଖିବାର ସମ୍ପୂର୍ଣ୍ଣ ସୂଚନା।'
    },
    keyTakeaways: {
      en: [
        'Eligible women aged 21-60 receive ₹10,000 annually split into two equal ₹5,000 installments.',
        'Bank account must be NPCI-mapped with active Aadhaar e-KYC.',
        'Ask Arohi AI Voice Guide in Odia for real-time status query troubleshooting.'
      ],
      hi: [
        '21-60 वर्ष की पात्र महिलाओं को दो समान ₹5,000 किस्तों में सालाना ₹10,000 मिलते हैं।',
        'बैंक खाता सक्रिय आधार ई-केवाईसी के साथ एनपीसीआई-मैप होना चाहिए।',
        'स्थिति की जानकारी के लिए आरोही एआई वॉयस गाइड से ओडिया/हिंदी में पूछें।'
      ],
      or: [
        '୨୧-୬୦ ବର୍ଷର ମହିଳାଙ୍କୁ ବାର୍ଷିକ ₹୧୦,୦୦୦ ଦୁଇଟି କିସ୍ତିରେ ମିଳିଥାଏ।',
        'ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ସହ ଆଧାର NPCI ଲିଙ୍କିଙ୍ଗ୍ ବାଧ୍ୟତାମୂଳକ।',
        'ଆରୋହୀ AI ଭଏସ୍ ଗାଇଡ୍ ସହ ଓଡ଼ିଆରେ କଥା ହୋଇ ସମସ୍ୟା ସମାଧାନ କରନ୍ତୁ।'
      ]
    },
    content: {
      en: `
### Transforming Women Empowerment & Financial Inclusion in Odisha

Under the landmark **SUBHADRA YOJANA**, the Government of Odisha provides a total financial assistance of **₹50,000** over a period of 5 years (2024–2029) to over 1 Crore eligible women across urban and rural areas.

#### Key Installment Dates & Voucher Criteria:
- **Annual Benefit**: ₹10,000 per beneficiary paid in two equal installments of ₹5,000.
- **Raksha Bandhan Installment**: ₹5,000 paid directly into Aadhaar-seeded bank accounts.
- **International Women's Day Installment (March 8)**: ₹5,000 paid via Direct Benefit Transfer (DBT).

#### How to Ensure Your Subhadra Money is Approved:
1. **NPCI Mapping**: Ensure your bank account has active NPCI Aadhaar seeding.
2. **Single Active Mobile Number**: Use the mobile number linked with your Aadhaar card for OTP authentication.
3. **Subhadra Debit Card**: Top-performing beneficiaries using digital payment transactions receive additional incentives.

#### Check Status & Related Schemes on Arohi AI:
- Visit **[PM & Odisha Government Schemes Portal](/?tab=schemes)** to track your eligibility.
- Talk directly in Odia to **[Arohi AI Voice Assistant](/?tab=arohi)** by asking *"ମୋର ସୁଭଦ୍ରା ଟଙ୍କା କେବେ ଆସିବ?"*.
- Open an AI Education & Seva Kiosk through **[AECN Franchise Portal](/?tab=franchise)**.
      `,
      hi: `
### ओडिशा में महिला सशक्तिकरण: सुभद्रा योजना 2026

ओडिशा सरकार द्वारा सुभद्रा योजना के तहत राज्य की महिलाओं को 5 वर्षों में कुल **₹50,000** की सहायता राशि प्रदान की जा रही है।

#### महत्वपूर्ण बिंदु:
- प्रति वर्ष ₹10,000 (₹5,000 की दो किस्तों में रक्षाबंधन और महिला दिवस पर)।
- बैंक खाते का आधार NPCI से लिंक होना अनिवार्य है।

#### लिंकbacks:
- **[सरकारी योजनाएं पोर्टल](/?tab=schemes)** पर सुभद्रा और पीएम विश्वकर्मा योजना जांचें।
- **[आरोही एआई वॉयस असिस्टेंट](/?tab=arohi)** से ओडिया या हिंदी में बात करें।
- **[फ्रेंचाइजी एईसीएन पोर्टल](/?tab=franchise)** पर स्थानीय सहायता केंद्र खोलें।
      `,
      or: `
### ସୁଭଦ୍ରା ଯୋଜନା ଓଡ଼ିଶା ୨୦୨୬: ସମ୍ପୂର୍ଣ୍ଣ ଗାଇଡ୍

ଓଡ଼ିଶାର ୧ କୋଟିରୁ ଅଧିକ ମହିଳାଙ୍କ ପାଇଁ ସୁଭଦ୍ରା ଯୋଜନାରେ ୫ ବର୍ଷରେ ₹୫୦,୦୦୦ ସହାୟତା ମିଳୁଛି।

#### ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଲିଙ୍କ:
- ଷ୍ଟାଟସ୍ ଦେଖିବା ପାଇଁ **[ସରକାରୀ ଯୋଜନା ପୋର୍ଟାଲ୍](/?tab=schemes)** କୁ ଯାଆନ୍ତୁ।
- ଆରୋହୀଙ୍କ ସହ ଓଡ଼ିଆରେ କଥା ହେବା ପାଇଁ **[ଆରୋହୀ AI ଭଏସ୍](/?tab=arohi)** ବ୍ୟବହାର କରନ୍ତୁ।
- ନିଜ ପଞ୍ଚାୟତରେ ସେବା କେନ୍ଦ୍ର ପାଇଁ **[AECN ଫ୍ରାଞ୍ଚାଇଜ୍](/?tab=franchise)** ଆବେଦନ କରନ୍ତୁ।
      `
    }
  },
  {
    id: 'cbse-class-10-board-exam-prep-hacks-2026',
    slug: 'cbse-class-10-board-exam-prep-hacks-2026',
    category: 'education',
    categoryLabel: 'Education & CBSE/Odisha',
    trendingTag: '🔥 School Exams 2026',
    readTime: '6 min read',
    publishDate: 'Jul 28, 2026',
    author: {
      name: 'Ananda Charan Panda',
      role: 'Senior Academic Director & Educator',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80&referrerpolicy=no-referrer'
    },
    views: 41200,
    shares: 3100,
    isTrending: false,
    isFeatured: false,
    tags: ['CBSE Class 10', 'Odisha Board Class 10', 'School Syllabus', 'Science & Math Notes', 'Exams 2026'],
    relatedTab: 'syllabus',
    relatedTabLabel: 'Explore Class 1-10 School Syllabus',
    linkbacks: [
      { anchorText: 'Class 1-10 School Syllabus & Board Notes Portal', tab: 'syllabus', context: 'Download chapter summaries, NCERT solutions, and practice test series.' },
      { anchorText: 'Skill Courses & Certifications Directory', tab: 'courses', context: 'Learn coding, AI fundamentals, and spoken English early.' },
      { anchorText: 'Arohi AI Voice Tutor', tab: 'arohi', context: 'Ask questions in English, Hindi, or Odia to clarify Science & Math formulas.' }
    ],
    title: {
      en: 'Class 10 CBSE & Odisha Board Exam Preparation Hacks 2026: Chapter Notes, Sample Papers & Study Plan',
      hi: 'कक्षा 10 सीबीएसई और ओडिशा बोर्ड परीक्षा तैयारी हैक्स 2026: अध्याय नोट्स, सैंपल पेपर और स्टडी प्लान',
      or: 'ଦଶମ ଶ୍ରେଣୀ CBSE ଓ ଓଡ଼ିଶା ମାଟ୍ରିକ୍ ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି ୨୦୨୬: ବିଷୟଭିତ୍ତିକ ନୋଟ୍ସ, ସିଲାବସ୍ ଓ ଷ୍ଟଡି ପ୍ଲାନ୍',
      bn: 'দশম শ্রেণী সিবিএসই ও ওড়িশা বোর্ড পরীক্ষার প্রস্তুতি নির্দেশিকা ২০২৬'
    },
    summary: {
      en: 'A strategic subject-wise roadmap for Class 10 students preparing for CBSE and BSE Odisha board exams covering Mathematics, Science, Social Science, English, and Vernacular languages.',
      hi: 'सीबीएसई और बीएसई ओडिशा बोर्ड परीक्षा की तैयारी कर रहे कक्षा 10 के छात्रों के लिए गणित, विज्ञान, सामाजिक विज्ञान और भाषाओं की रणनीति।',
      or: 'ଦଶମ ଶ୍ରେଣୀ ପରୀକ୍ଷାର୍ଥୀଙ୍କ ପାଇଁ ଗଣିତ, ବିଜ୍ଞାନ, ସାମାଜିକ ବିଜ୍ଞାନ ଓ ମାତୃଭାଷାର ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରସ୍ତୁତି ନକ୍ସା।'
    },
    keyTakeaways: {
      en: [
        'Solve 5 years of PYQ (Previous Year Questions) to identify high-weightage topics.',
        'Use formula sheets for Class 10 Math & Science to review before bedtime.',
        'Access chapter-by-chapter summaries on Arohi AI School Syllabus Portal.'
      ],
      hi: [
        'उच्च भार वाले विषयों की पहचान करने के लिए 5 वर्षों के पुराने प्रश्नपत्र हल करें।',
        'सोने से पहले समीक्षा के लिए गणित और विज्ञान की फॉर्मूला शीट का उपयोग करें।',
        'आरोही एआई स्कूल पाठ्यक्रम पोर्टल पर अध्याय-वार सारांश प्राप्त करें।'
      ],
      or: [
        'ଗତ ୫ ବର୍ଷର ପ୍ରଶ୍ନପତ୍ର ଅଭ୍ୟାସ କରନ୍ତୁ।',
        'ଆରୋହୀ AI ସ୍କୁଲ ସିଲାବସ୍ ପୋର୍ଟାଲ୍ ରୁ ନୋଟ୍ସ ଡାଉନଲୋଡ୍ କରନ୍ତୁ।'
      ]
    },
    content: {
      en: `
### Ace Your Class 10 Board Exams with Structured Smart Work

Class 10 Board Examinations mark the first major academic milestone in every Indian student's journey. Whether appearing under the **CBSE Board** or **BSE Odisha High School Certificate (HSC) Examination**, consistent daily practice outperforms last-minute cramming.

#### Subject-Wise Master Strategy:

1. **Mathematics**: Practice NCERT examples and exercises daily. Focus on Quadratic Equations, Arithmetic Progressions, Trigonometry, and Circles.
2. **Science (Physics, Chemistry, Biology)**: Learn ray diagrams, chemical reaction balancing, and human anatomy diagrams.
3. **Social Science**: Use timeline maps for History and flowcharts for Economics and Political Science.
4. **Languages**: Focus on unseen passages, letter formatting, and grammar rules.

#### Explore School Syllabus & Notes on Arohi AI:
- Access complete subject outlines on **[Class 1-10 School Syllabus Directory](/?tab=syllabus)**.
- Upgrade your technical foundation with **[Skill Courses & Coding Certifications](/?tab=courses)**.
- Clear tricky doubts 24/7 by asking **[Arohi AI Voice Tutor](/?tab=arohi)**!
      `,
      hi: `
### कक्षा 10 बोर्ड परीक्षा में 90%+ अंक पाने का तरीका

गणित, विज्ञान और सामाजिक विज्ञान की अध्याय-वार रणनीति अपनाएं और पिछले 5 वर्षों के प्रश्न पत्र हल करें।

#### मुख्य లిங்க்స్:
- **[स्कूल पाठ्यक्रम और नोट्स पोर्टल](/?tab=syllabus)** पर अध्याय सारांश देखें।
- **[कौशल विकास पाठ्यक्रम](/?tab=courses)** से कोडिंग और एआई सीखें।
- **[आरोही एआई वॉयस ट्यूटर](/?tab=arohi)** से सवाल पूछें।
      `,
      or: `
### ଦଶମ ଶ୍ରେଣୀ ମାଟ୍ରିକ୍ ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି ୨୦୨୬

ଗଣିତ, ବିଜ୍ଞାନ ଓ ସାମାଜିକ ବିଜ୍ଞାନରେ ଉତ୍ତମ ନମ୍ବର ରଖିବା ପାଇଁ ସଠିକ୍ ପ୍ଲାନିଂ କରନ୍ତୁ।

#### ପ୍ରମୁଖ ସେବା ଲିଙ୍କ:
- ବିଷୟଭିତ୍ତିକ ସିଲାବସ୍ ପାଇଁ **[ବିଦ୍ୟାଳୟ ସିଲାବସ୍ ପୋର୍ଟାଲ୍](/?tab=syllabus)** ଦେଖନ୍ତୁ।
- କମ୍ପ୍ୟୁଟର ଓ କୌଶଳ ଶିକ୍ଷା ପାଇଁ **[କୋର୍ସ ପୋର୍ଟାଲ୍](/?tab=courses)** କୁ ଯାଆନ୍ତୁ।
- ଆରୋହୀଙ୍କ ସହ କଥା ହେବା ପାଇଁ **[ଆରୋହୀ AI](/?tab=arohi)** ବ୍ୟବହାର କରନ୍ତୁ।
      `
    }
  },
  {
    id: 'women-entrepreneurship-and-shg-loans-2026',
    slug: 'women-entrepreneurship-and-shg-loans-2026',
    category: 'women-empowerment',
    categoryLabel: 'Women Entrepreneurship',
    trendingTag: '🔥 Women Empowerment',
    readTime: '5 min read',
    publishDate: 'Jul 25, 2026',
    author: {
      name: 'Dr. Meenakshi Swain',
      role: 'Rural Livelihood & SHG Mission Director',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80&referrerpolicy=no-referrer'
    },
    views: 35600,
    shares: 2450,
    isTrending: false,
    isFeatured: false,
    tags: ['Mission Shakti', 'SHG Bank Linkage', 'Lakhpati Didi', 'Women Business Loans', 'Rural Startups'],
    relatedTab: 'business',
    relatedTabLabel: 'Explore Women Business Subsidies',
    linkbacks: [
      { anchorText: 'MSME & Women Business Assistance Portal', tab: 'business', context: 'Explore SHG collateral-free loan limits up to ₹10 Lakhs and zero-interest subvention.' },
      { anchorText: 'PM & State Schemes Directory', tab: 'schemes', context: 'Check Lakhpati Didi and Subhadra Yojana grant eligibility.' },
      { anchorText: 'Arohi AI Voice Coach', tab: 'arohi', context: 'Speak to Arohi in your local dialect for instant SHG loan query assistance.' }
    ],
    title: {
      en: 'Women Entrepreneurship & SHG Bank Linkage 2026: Lakhpati Didi Scheme, Zero Interest Loans & Grants',
      hi: 'महिला उद्यमिता और एसएचजी बैंक लिंकेज 2026: लखपति दीदी योजना, शून्य ब्याज ऋण और अनुदान',
      or: 'ମହିଳା ଉଦ୍ୟୋଗୀ ଓ ମିଶନ୍ ଶକ୍ତି SHG ଋଣ ୨୦୨୬: ଲଖପତି ଦିଦି ଯୋଜନା, ବିନା ସୁଧରେ ବ୍ୟବସାୟିକ ଋଣ',
      bn: 'নারী উদ্যোক্তা এবং এসএইচজি ঋণ ২০২৬: লাখপতি দিদি প্রকল্প ও ভরতুকি'
    },
    summary: {
      en: 'How women-led Self Help Groups (SHGs) across rural and semi-urban India are accessing zero-interest bank loans, Lakhpati Didi training, and digital MSME grants.',
      hi: 'ग्रामीण और अर्ध-शहरी भारत में महिला स्व-सहायता समूह शून्य-ब्याज बैंक ऋण, लखपति दीदी प्रशिक्षण और डिजिटल एमएसएमई अनुदान का लाभ कैसे उठा रहे हैं।',
      or: 'ମହିଳା ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀ (SHG) ମାନେ କିପରି ବିନା ସୁଧରେ ବ୍ୟାଙ୍କ ଋଣ, ଲଖପତି ଦିଦି ତାଲିମ୍ ଓ ସରକାରୀ ସହାୟତା ପାଉଛନ୍ତି।'
    },
    keyTakeaways: {
      en: [
        'Lakhpati Didi initiative aims to empower 3 Crore rural SHG women with ₹1 Lakh+ annual income.',
        'Zero-interest subvention available on SHG bank loans up to ₹10 Lakhs in leading states like Odisha.',
        'Get step-by-step guidance on Arohi AI Business & Schemes Portals.'
      ],
      hi: [
        'लखपति दीदी पहल का लक्ष्य 3 करोड़ ग्रामीण एसएचजी महिलाओं को ₹1 लाख+ की वार्षिक आय से सशक्त बनाना है।',
        'ओडिशा जैसे अग्रणी राज्यों में ₹10 लाख तक के एसएचजी बैंक ऋण पर शून्य-ब्याज अनुदान उपलब्ध है।',
        'आरोही एआई बिजनेस और योजना पोर्टल पर चरण-दर-चरण मार्गदर्शन प्राप्त करें।'
      ],
      or: [
        '୩ କୋଟି ଗ୍ରାମାଞ୍ଚଳ SHG ମହିଳାଙ୍କୁ ବାର୍ଷିକ ₹୧ ଲକ୍ଷ ରୋଜଗାରକ୍ଷମ କରିବା ଲକ୍ଷ୍ୟ।',
        'ମିଶନ୍ ଶକ୍ତି ରେ ₹୧୦ ଲକ୍ଷ ଯାଏଁ ସୁଧମୁକ୍ତ ବ୍ୟାଙ୍କ ଋଣ।',
        'ଆରୋହୀ AI ପୋର୍ଟାଲ୍ ରେ ସମସ୍ତ ବିବରଣୀ ଦେଖନ୍ତୁ।'
      ]
    },
    content: {
      en: `
### Empowering 3 Crore Women as Lakhpati Didis in India

Women-led micro-enterprises are driving the next wave of India's economic growth. Under initiatives such as **LAKHPATI DIDI** and **MISSION SHAKTI**, female entrepreneurs across Self-Help Groups (SHGs) are transitioning from small savings clubs into high-growth MSME producers.

#### Key Opportunities for Female Entrepreneurs:
1. **Collateral-Free SHG Bank Linkage**: Access loans from ₹1 Lakh up to ₹10 Lakhs without pledging property or assets.
2. **Interest Subvention Scheme**: 0% interest rate effectively available for prompt repayment SHG groups.
3. **Skill Training in Agri-Tech & E-Commerce**: Hands-on workshops in organic farming, food processing, handicrafts, and digital marketing.

#### Access Assistance Tools on Arohi AI:
- Calculate startup capital requirements on **[MSME & Startup Business Portal](/?tab=business)**.
- Verify central & state beneficiary lists on **[PM Government Schemes Tracker](/?tab=schemes)**.
- Speak in your dialect to **[Arohi AI Voice Assistant](/?tab=arohi)** for instant assistance!
      `,
      hi: `
### भारत में 3 करोड़ महिलाओं को लखपति दीदी बनाने का संकल्प

महिला स्व-सहायता समूहों को लखपति दीदी योजना और मिशन शक्ति के तहत शून्य प्रतिशत ब्याज पर ऋण और प्रशिक्षण दिया जा रहा है।

#### त्वरित లిங்க்्स:
- **[एमएसएमई बिजनेस गाइड](/?tab=business)** पर महिला बिजनेस लोन देखें।
- **[सरकारी योजनाएं पोर्टल](/?tab=schemes)** पर लखपति दीदी योजना जांचें।
- **[आरोही वॉयस एआई](/?tab=arohi)** से अपनी भाषा में बात करें।
      `,
      or: `
### ମହିଳା ଉଦ୍ୟୋଗୀ ଓ ମିଶନ୍ ଶକ୍ତି SHG ଋଣ

ଲଖପତି ଦିଦି ଯୋଜନାରେ ମହିଳାମାନେ ସୁଧମୁକ୍ତ ବ୍ୟାଙ୍କ ଋଣ ପାଇ ସ୍ୱାବଲମ୍ବୀ ହେଉଛନ୍ତି।

#### ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସେବା ଲିଙ୍କ:
- **[MSME ଓ ଷ୍ଟାର୍ଟଅପ୍ ପୋର୍ଟାଲ୍](/?tab=business)** ରେ ସବսିଡି ଯାଞ୍ଚ କରନ୍ତୁ।
- **[ସରକାରୀ ଯୋଜନା ବୋର୍ଡ](/?tab=schemes)** ଦେଖନ୍ତୁ।
- **[ଆରୋହୀ AI](/?tab=arohi)** ସହ ଓଡ଼ିଆରେ କଥା ହୁଅନ୍ତୁ।
      `
    }
  }
];

// Helper generator function to produce a library of 100+ dynamic trending blog articles for search & discovery
export function generateDynamicBlogsList(searchTerm: string = '', category: string = 'all', lang: string = 'en'): BlogPost[] {
  let blogs = [...INITIAL_BLOG_POSTS];

  // Topic templates to expand the blog library to 100+ rich articles dynamically
  const TOPIC_TEMPLATES = [
    { title: "Railway RRB ALP & Technician Exam Strategy 2026: Cutoffs, Test Series & Physics Prep", cat: "sarkari-jobs", tag: "RRB Railway 2026", tab: "jobs" },
    { title: "Top 10 High-Paying Remote IT Skills in 2026: AI Prompt Engineering, Fullstack & Cloud", cat: "ai-tech", tag: "Tech Careers", tab: "courses" },
    { title: "PM Vishwakarma Yojana 2026: How Artisans & Craftsmen Get ₹3 Lakh Loan + Toolkits", cat: "pm-schemes", tag: "PM Vishwakarma", tab: "schemes" },
    { title: "How to Answer 'Tell Me About Yourself' in HR Interviews: AI Mock Practice Hacks", cat: "career-resume", tag: "Interview Tips", tab: "interview" },
    { title: "UPSC Civil Services Mains Answer Writing Blueprint 2026: Ethics & Essay Strategy", cat: "sarkari-jobs", tag: "UPSC IAS 2026", tab: "jobs" },
    { title: "Odisha Mukhyamantri Karma Tatpara Abhiyan (MUKTA): Urban Wage Employment Guide", cat: "pm-schemes", tag: "MUKTA Odisha", tab: "schemes" },
    { title: "AECN Franchise Node: How to Start an AI Career & Education Hub in Your District", cat: "msme-business", tag: "Franchise Hub", tab: "franchise" },
    { title: "How to Build an ATS-Compliant Tech Resume in 2026: Free AI Analyzer Checklist", cat: "career-resume", tag: "Resume Formatting", tab: "resume" },
    { title: "Green Energy & EV Industry Job Opportunities in India: Solar & Battery Engineering", cat: "ai-tech", tag: "EV & Green Tech", tab: "jobs" },
    { title: "How MSMEs Can File GST Returns & Claim Udyam Aadhar Subsidy Benefits Online", cat: "msme-business", tag: "GST & Udyam", tab: "business" },
    { title: "IELTS & GRE Preparation Strategy for Indian Students Seeking Overseas Scholarships", cat: "education", tag: "Study Abroad", tab: "courses" },
    { title: "PM Surya Ghar Free Electricity Scheme 2026: Apply Online for 300 Units Free Power", cat: "pm-schemes", tag: "PM Surya Ghar", tab: "schemes" },
    { title: "Banking Exams 2026 Roadmap: IBPS PO, SBI Clerk & RBI Grade B Preparation", cat: "sarkari-jobs", tag: "Bank Exams 2026", tab: "jobs" },
    { title: "Agri-Tech Startups in Rural India: Hydroponics, Organic Farming & NABARD Loans", cat: "msme-business", tag: "Agri Startups", tab: "business" },
    { title: "Spoken English & Professional Communication Improvement with AI Voice Assistant", cat: "ai-tech", tag: "Spoken English AI", tab: "arohi" },
  ];

  // Generate extended posts up to 100+
  for (let i = 0; i < 110; i++) {
    const t = TOPIC_TEMPLATES[i % TOPIC_TEMPLATES.length];
    const id = `dynamic-blog-${i + 101}`;
    const dateNum = (28 - (i % 25)).toString().padStart(2, '0');
    
    blogs.push({
      id,
      slug: id,
      category: t.cat as any,
      categoryLabel: BLOG_CATEGORIES.find(c => c.id === t.cat)?.label.replace(/^.\s*/, '') || 'Career Guide',
      trendingTag: `🔥 ${t.tag}`,
      readTime: `${4 + (i % 4)} min read`,
      publishDate: `Jul ${dateNum}, 2026`,
      author: {
        name: i % 2 === 0 ? 'Ananya Roy, Lead Educator' : 'Vikramaditya Sharma, Career Analyst',
        role: 'Arohi AI Research Team',
        avatar: i % 2 === 0 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80&referrerpolicy=no-referrer'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80&referrerpolicy=no-referrer'
      },
      views: 12400 + (i * 380),
      shares: 890 + (i * 45),
      tags: [t.tag, 'Arohi AI', 'India 2026', 'Career Growth', 'Sarkari Guide'],
      relatedTab: t.tab,
      relatedTabLabel: `Explore ${t.tab.toUpperCase()} Portal`,
      linkbacks: [
        { anchorText: `Explore ${t.tag} Opportunities on Arohi AI`, tab: t.tab, context: 'Access verified guidelines, notifications, and interactive tools.' },
        { anchorText: 'Arohi Live Multilingual AI Voice Assistant', tab: 'arohi', context: 'Talk to Arohi AI for personalized 1-on-1 guidance.' },
        { anchorText: 'Arohi AI Resume Score Analyzer', tab: 'resume', context: 'Score your CV against international ATS standards.' }
      ],
      title: {
        en: `${t.title}`,
        hi: `${t.title} (हिंदी गाइड)`,
        or: `${t.title} (ଓଡ଼ିଆ ମାର୍ଗଦର୍ଶିକା)`,
        bn: `${t.title} (বাংলা নির্দেশিকা)`,
        te: `${t.title} (తెలుగు మార్గదర్శి)`,
        mr: `${t.title} (मराठी मार्गदर्शक)`
      },
      summary: {
        en: `In-depth analysis and step-by-step guidance on ${t.title}. Learn how to leverage Arohi AI tools to accelerate your career or business goals.`,
        hi: `${t.title} पर विस्तृत विश्लेषण और चरण-दर-चरण मार्गदर्शन। जानें कि करियर या व्यावसायिक लक्ष्यों के लिए Arohi AI टूल्स का उपयोग कैसे करें।`,
        or: `${t.title} ବିଷୟରେ ସମ୍ପୂର୍ଣ୍ଣ ସୂଚନା। ନିଜର କ୍ୟାରିୟର ଓ ବ୍ୟବସାୟ ବୃଦ୍ଧି ପାଇଁ Arohi AI ବ୍ୟବହାର କରନ୍ତୁ।`
      },
      keyTakeaways: {
        en: [
          `Key strategies for ${t.tag} aspirants and professionals in 2026.`,
          `Step-by-step portal guidelines and official link backs.`,
          `Use Arohi AI interactive tools to evaluate eligibility in seconds.`
        ]
      },
      content: {
        en: `
### Comprehensive Guide on ${t.title}

Welcome to Arohi AI's definitive educational resource on **${t.title}**. In today's dynamic economy across India, staying informed with accurate, verified data is paramount to achieving long-term success.

#### Why This Matters for Indian Aspirants & Professionals:
1. **Up-to-Date Policy Alignment**: Updated with latest 2026 central and state gazette revisions.
2. **Actionable Steps**: Structured execution plan with zero confusing technical jargon.
3. **Direct Link Backs to Arohi AI Services**: Access live tools directly within our ecosystem.

#### Explore Related Services & LinkBacks on Arohi AI:
- Access our primary portal feature: **[${t.tag} Guidance Portal](/?tab=${t.tab})**
- Practice verbal skills or ask questions live on **[Arohi AI Multilingual Voice Assistant](/?tab=arohi)**.
- Scan and optimize your professional portfolio with **[Arohi AI Resume Score Analyzer](/?tab=resume)**.
- Review government subsidy options on **[PM Government Schemes Tracker](/?tab=schemes)**.
- Check MSME business loan programs on **[MSME & Startup Business Portal](/?tab=business)**.
        `
      }
    });
  }

  // Filter by category
  if (category && category !== 'all') {
    blogs = blogs.filter(b => b.category === category);
  }

  // Filter by search query
  if (searchTerm && searchTerm.trim() !== '') {
    const q = searchTerm.toLowerCase().trim();
    blogs = blogs.filter(b => {
      const titleText = (b.title[lang] || b.title['en'] || '').toLowerCase();
      const summaryText = (b.summary[lang] || b.summary['en'] || '').toLowerCase();
      const tagsText = b.tags.join(' ').toLowerCase();
      return titleText.includes(q) || summaryText.includes(q) || tagsText.includes(q);
    });
  }

  return blogs;
}
