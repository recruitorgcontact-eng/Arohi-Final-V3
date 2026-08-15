// Master Global & Pan-India SEO Engine: 23 Target Audiences, 100+ Real Life Problems & 150+ Multilingual Intent Mappings

export interface MasterProblemSolution {
  id: string;
  slug: string;
  audienceSlug: string;
  title: string;
  nativeTitles: Record<string, string>; // e.g. { or: '...', hi: '...', bn: '...' }
  problemStatement: string;
  solutionSummary: string;
  howArohiSolvesIt: string[];
  targetPrompt: string;
  keywords: string[];
  nativeKeywords: Record<string, string[]>;
  category: string;
  recommendedTab: 'chat' | 'jobs' | 'career' | 'resume' | 'interview' | 'business' | 'schemes' | 'courses' | 'syllabus' | 'tools' | 'employer' | 'franchise' | 'blogs' | 'solutions' | string;
  faqs: { question: string; answer: string }[];
}

export interface MasterAudience {
  id: string;
  slug: string;
  title: string;
  nativeTitles: Record<string, string>;
  category: string;
  badge: string;
  iconName: string;
  heroHeadline: string;
  shortDesc: string;
  metaDescription: string;
  keywords: string[];
  nativeKeywords: Record<string, string[]>;
  problemCount: number;
  popularProblems: string[]; // problem slugs
  recommendedTab: 'chat' | 'jobs' | 'career' | 'resume' | 'interview' | 'business' | 'schemes' | 'courses' | 'syllabus' | 'tools' | 'employer' | 'franchise' | 'blogs' | 'solutions' | string;
}

export const MASTER_AUDIENCES: MasterAudience[] = [
  {
    id: 'aud-1',
    slug: 'students-exam-aspirants',
    title: 'School & College Students (Class 1-12 & UG)',
    nativeTitles: {
      or: 'ବିଦ୍ୟାଳୟ ଓ ମହାବିଦ୍ୟାଳୟ ଛାତ୍ରଛାତ୍ରୀ',
      hi: 'स्कूल और कॉलेज के छात्र (कक्षा 1-12 एवं स्नातक)',
      bn: 'স্কুল ও কলেজ ছাত্রছাত্রী',
      te: 'పాఠశాల మరియు కళాశాల విద్యార్థులు',
      ta: 'பள்ளி மற்றும் கல்லூரி மாணவர்கள்',
      mr: 'शाळा आणि कॉलेजचे विद्यार्थी',
      gu: 'શાળા અને કોલેજના વિદ્યાર્થીઓ'
    },
    category: 'Education & Academics',
    badge: 'CBSE, ICSE, CHSE Odisha & State Boards',
    iconName: 'GraduationCap',
    heroHeadline: 'AI Study Mentor for Homework, Board Exams & College Subjects in 150+ Languages',
    shortDesc: 'Solve complex math, get chapter notes, verify derivations, and practice quizzes step-by-step.',
    metaDescription: 'Arohi AI for Students: CBSE/ICSE Class 1-12 study notes, step-by-step math solver, CHSE Odisha syllabus, physics derivations in Odia, Hindi, and 150+ languages.',
    keywords: ['student ai study mentor', 'cbse notes class 12', 'math step by step solver', 'chse odia medium notes', 'physics chemistry derivations ai', 'homework helper app'],
    nativeKeywords: {
      or: ['ଓଡ଼ିଆ ପାଠ୍ୟକ୍ରମ ସହାୟକ', 'ଗଣିତ ସମାଧାନ', 'ଦଶମ ଶ୍ରେଣୀ ନୋଟ୍ସ', 'ଯୁକ୍ତ ୨ ପଦାର୍ଥ ବିଜ୍ଞାନ'],
      hi: ['गणित स्टेप बाय स्टेप हल', 'सीबीएसई क्लास 12 नोट्स', 'भौतिक विज्ञान प्रश्न उत्तर', 'होमवर्क हेल्पर एआई']
    },
    problemCount: 5,
    popularProblems: ['math-step-by-step', 'physics-derivations', 'cbse-board-notes', 'multilingual-essay-writer', 'foreign-language-learning'],
    recommendedTab: 'syllabus'
  },
  {
    id: 'aud-2',
    slug: 'competitive-aspirants',
    title: 'Competitive Exam Aspirants (UPSC, OPSC, SSC, Banking)',
    nativeTitles: {
      or: 'ପ୍ରତିଯୋଗିତାମୂଳକ ପରୀକ୍ଷାର୍ଥୀ (UPSC, OPSC, SSC)',
      hi: 'प्रतियोगी परीक्षा अभ्यर्थी (UPSC, SSC, Banking)',
      bn: 'প্রতিযোগিতামূলক পরীক্ষার্থী',
      te: 'పోటీ పరీక్షల అభ్యర్థులు',
      ta: 'போட்டித் தேர்வு ஆர்வலர்கள்',
      mr: 'स्पर्धा परीक्षा विद्यार्थी (MPSC, UPSC)',
      gu: 'સ્પર્ધાત્મક પરીક્ષાના ઉમેદવારો'
    },
    category: 'Government & Competitive Exams',
    badge: 'UPSC, OPSC, SSC CGL, IBPS, Railways & State PSC',
    iconName: 'Target',
    heroHeadline: 'AI Prelims & Mains Answer Writing Evaluator & Daily Current Affairs Mentor',
    shortDesc: 'Evaluate UPSC/OPSC essays, practice reasoning questions, and get 90-day structured study plans.',
    metaDescription: 'Prepare for UPSC, OPSC OAS, SSC CGL, Banking, and Railways with Arohi AI. Daily editorial summaries, essay evaluation, and current affairs in native languages.',
    keywords: ['upsc mains answer evaluation ai', 'opsc preparation ai mentor', 'ssc cgl reasoning practice', 'daily current affairs odia hindi', 'banking mock test ai'],
    nativeKeywords: {
      or: ['ଓପିଏସସି ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି', 'ସରକାରୀ ଚାକିରି ପ୍ରଶ୍ନୋତ୍ତର', 'ଦୈନିକ ସାମ୍ପ୍ରତିକ ଘଟଣାବଳୀ'],
      hi: ['यूपीएससी मेन्स उत्तर लेखन', 'एसएससी सीजीएल रीजनिंग', 'दैनिक करेंट अफेयर्स इन हिंदी']
    },
    problemCount: 5,
    popularProblems: ['upsc-answer-evaluation', 'current-affairs-editorial', 'ssc-reasoning-tricks', '90-day-exam-timetable', 'mock-exam-question-bank'],
    recommendedTab: 'jobs'
  },
  {
    id: 'aud-3',
    slug: 'entrepreneurs-msme',
    title: 'Entrepreneurs, MSMEs & Startup Founders',
    nativeTitles: {
      or: 'ଉଦ୍ୟୋଗୀ, MSME ଓ ଷ୍ଟାର୍ଟଅପ୍ ପ୍ରତିଷ୍ଠାତା',
      hi: 'उद्यमी, एमएसएमई एवं स्टार्टअप संस्थापक',
      bn: 'উদ্যোক্তা ও এমএসএমই ব্যবসায়ী',
      te: 'వ్యవస్థాపకులు మరియు MSME వ్యాపారవేత్తలు',
      ta: 'தொழில்முனைவோர் மற்றும் MSME நிறுவனர்',
      mr: 'उद्योजक आणि एमएसएमई व्यावसायिक',
      gu: 'ઉદ્યોગસાહસિકો અને MSME સ્થાપકો'
    },
    category: 'Business, Loans & Startups',
    badge: 'PMEGP, Mudra, Stand-Up India, Startup Grants & DPR',
    iconName: 'Building',
    heroHeadline: 'AI Business Consultant for Project Reports (DPR), Govt Subsidies & Unit Economics',
    shortDesc: 'Generate detailed project reports for bank loans, check subsidy eligibility, and draft investor pitch decks.',
    metaDescription: 'Start & scale your business with Arohi AI. Detailed Project Reports (DPR) for Mudra/PMEGP loans, GST compliance, Startup India grants & business plans.',
    keywords: ['dpr generator for bank loan', 'pmegp subsidy eligibility checker', 'mudra loan project report ai', 'startup pitch deck generator', 'business feasibility study ai'],
    nativeKeywords: {
      or: ['ମୁଦ୍ରା ଋଣ ପ୍ରକଳ୍ପ ରିପୋର୍ଟ', 'PMEGP ସବସିଡି ଆବେଦନ', 'ବ୍ୟବସାୟ ଯୋଜନା ପ୍ରସ୍ତୁତି'],
      hi: ['मुद्रा लोन प्रोजेक्ट रिपोर्ट', 'पीएमईजीपी सब्सिडी कैलकुलेटर', 'बिजनेस प्लान एआई']
    },
    problemCount: 5,
    popularProblems: ['pmegp-mudra-loan-dpr', 'detailed-project-report-dpr', 'gst-invoicing-compliance', 'business-unit-economics', 'startup-investor-pitch-deck'],
    recommendedTab: 'business'
  },
  {
    id: 'aud-4',
    slug: 'retailers-shopkeepers',
    title: 'Local Retailers, Kirana & Shop Owners',
    nativeTitles: {
      or: 'ସ୍ଥାନୀୟ ଦୋକାନୀ ଓ ବ୍ୟବସାୟୀ',
      hi: 'स्थानीय दुकानदार एवं खुदरा व्यापारी',
      bn: 'স্থানীয় খুচরা দোকানদার',
      te: 'స్థానిక దుకాణదారులు',
      ta: 'உள்ளூர் சில்லறை கடைக்காரர்கள்',
      mr: 'स्थानिक दुकानदार आणि किरकोळ व्यापारी',
      gu: 'સ્થાનિક દુકાનદારો અને વેપારીઓ'
    },
    category: 'Local Commerce & Retail',
    badge: 'Digital Marketing, WhatsApp Offers & Stock Management',
    iconName: 'Store',
    heroHeadline: 'Smart Retail AI: Local Marketing, WhatsApp Broadcast Offers & Supplier Deals',
    shortDesc: 'Create festive promotional posters, draft WhatsApp customer broadcast messages, and manage shop inventory.',
    metaDescription: 'Empower your local shop with Arohi AI. Create festive discount offers, WhatsApp marketing messages, supplier negotiation scripts, and inventory trackers.',
    keywords: ['local shop marketing ideas', 'whatsapp broadcast promotional message ai', 'kirana store inventory management', 'supplier negotiation script ai'],
    nativeKeywords: {
      or: ['ଦୋକାନ ପ୍ରଚାର ମେସେଜ', 'ହ୍ୱାଟ୍ସଆପ୍ ଅଫର ଡିଜାଇନ', 'ବ୍ୟବସାୟ ବୃଦ୍ଧି ଉପାୟ'],
      hi: ['दुकान के लिए व्हाट्सएप ऑफर', 'किराना स्टोर मार्केटिंग', 'फेस्टिव सेल प्रमोशन']
    },
    problemCount: 4,
    popularProblems: ['whatsapp-broadcast-marketing', 'inventory-supplier-negotiation', 'festive-sale-posters', 'customer-review-responses'],
    recommendedTab: 'business'
  },
  {
    id: 'aud-5',
    slug: 'creative-designers',
    title: 'Creative Designers, Visual Artists & Illustrators',
    nativeTitles: {
      or: 'କଳାକାର, ଡିଜାଇନର ଓ ଚିତ୍ରଶିଳ୍ପୀ',
      hi: 'क्रिएटिव डिजाइनर, कलाकार एवं इलस्ट्रेटर',
      bn: 'ক্রিয়েটিভ ডিজাইনার ও ভিজ্যুয়াল শিল্পী',
      te: 'క్రియేటివ్ డిజైనర్లు మరియు కళాకారులు',
      ta: 'வடிவமைப்பாளர்கள் மற்றும் ஓவியர்கள்',
      mr: 'क्रिएटिव डिझायनर्स आणि कलाकार',
      gu: 'ક્રિએટિવ ડિઝાઇનર્સ અને કલાકારો'
    },
    category: 'Design & Visual Arts',
    badge: '4K AI Text-to-Image, Logo Design & Brand Palettes',
    iconName: 'Palette',
    heroHeadline: 'Ultra-High Definition AI Visual Studio for Concept Art, Logos & UI Layouts',
    shortDesc: 'Generate photorealistic 4K concept imagery, brand color harmonies, typography pairs, and logo concepts.',
    metaDescription: 'Arohi AI Image Studio: Generate 4K photorealistic images, brand logos, vector concept art, and UI/UX palettes from natural language prompts.',
    keywords: ['text to image 4k ai', 'logo concept generator ai', 'color palette generator', 'vector illustration ai generator', 'ui ux visual design helper'],
    nativeKeywords: {
      or: ['AI ଫଟୋ ତିଆରି', 'ଲୋଗୋ ଡିଜାଇନ ସହାୟକ', 'କଳାତ୍ମକ ଚିତ୍ର'],
      hi: ['एआई फोटो जनरेटर 4K', 'लोगो डिजाइन आइडिया', 'ब्रांड कलर पैलेट']
    },
    problemCount: 4,
    popularProblems: ['4k-ai-image-prompts', 'brand-logo-color-palette', 'vector-concept-generation', 'design-critique-layout'],
    recommendedTab: 'tools'
  },
  {
    id: 'aud-6',
    slug: 'musicians-audio-creators',
    title: 'Musicians, Beatmakers & Audio Creators',
    nativeTitles: {
      or: 'ସଙ୍ଗୀତକାର, ଗୀତିକାର ଓ ଅଡିଓ ନିର୍ମାତା',
      hi: 'संगीतकार, गीतकार एवं ऑडियो निर्माता',
      bn: 'সংগীতশিল্পী ও অডিও নির্মাতা',
      te: 'సంగీత దర్శకులు మరియు ఆడియో సృష్టికర్తలు',
      ta: 'இசையமைப்பாளர்கள் மற்றும் பாடல் ஆசிரியர்கள்',
      mr: 'संगीतकार, गीतकार आणि ऑडिओ निर्माते',
      gu: 'સંગીતકારો અને ગીતકારો'
    },
    category: 'Audio & Music Studio',
    badge: 'AI Background Score, Lyrics in 150+ Languages & Chords',
    iconName: 'Music',
    heroHeadline: 'AI Music Studio: Generate Background Scores, Compose Rhymes & Lyrics in Any Language',
    shortDesc: 'Compose melodic instrumental tracks, generate rhyming lyrics in Odia, Hindi, English, and explore chord progressions.',
    metaDescription: 'Create background music, acoustic tracks, song lyrics in 150+ languages, and chord progressions with Arohi AI Music Studio.',
    keywords: ['ai music generator free', 'song lyrics writer in odia hindi', 'chord progression generator', 'podcast intro audio maker', 'ai background soundtrack'],
    nativeKeywords: {
      or: ['ଗୀତ ରଚନା AI', 'ସଙ୍ଗୀତ ଟ୍ୟୁନ୍ ତିଆରି', 'ଓଡ଼ିଆ ଗୀତିକବିତା'],
      hi: ['गाने के बोल लिखने वाला AI', 'बैकग्राउंड म्यूजिक जनरेटर', 'कॉर्ड प्रोग्रेशन']
    },
    problemCount: 4,
    popularProblems: ['ai-background-soundtrack', 'multilingual-lyrics-rhymes', 'chord-progression-finder', 'podcast-audio-scripting'],
    recommendedTab: 'tools'
  },
  {
    id: 'aud-7',
    slug: 'content-creators-influencers',
    title: 'YouTubers, Podcasters & Content Creators',
    nativeTitles: {
      or: 'ୟୁଟ୍ୟୁବର ଓ ସୋସିଆଲ ମିଡିଆ କ୍ରିଏଟର',
      hi: 'यूट्यूबर्स, पॉडकास्टर्स एवं कंटेंट क्रिएटर्स',
      bn: 'ইউটিউবার ও কনটেন্ট নির্মাতা',
      te: 'యూట్యూబర్లు మరియు కంటెంట్ క్రియేటర్లు',
      ta: 'யூடியூபர்கள் மற்றும் உள்ளடக்க படைப்பாளர்கள்',
      mr: 'यूट्यूबर्स आणि सोशल मीडिया क्रिएटर्स',
      gu: 'યુટ્યુબર્સ અને કન્ટેન્ટ ક્રિએટર્સ'
    },
    category: 'Social Media & Video Production',
    badge: 'Viral Video Scripts, High-CTR Titles & Multilingual Subtitles',
    iconName: 'Video',
    heroHeadline: 'Viral Content Studio: High-Retention Scripts, Hook Formulas & High-CTR Video Titles',
    shortDesc: 'Write engaging YouTube scripts, 30-second viral Instagram Reels, and generate SEO tags and subtitles.',
    metaDescription: 'Skyrocket your channel with Arohi AI: YouTube video scripts, viral Reels hooks, CTR-boosting titles, SEO descriptions & captions in 150+ languages.',
    keywords: ['youtube script generator ai', 'viral instagram reels script', 'high ctr youtube title tags', 'multilingual subtitle generator', 'video hook formulas'],
    nativeKeywords: {
      or: ['ୟୁଟ୍ୟୁବ ଭିଡିଓ ସ୍କ୍ରିପ୍ଟ', 'ଭାଇରାଲ ରିଲ୍ସ ଆଇଡିଆ', 'ଭିଡିଓ ଟାଇଟଲ SEO'],
      hi: ['यूट्यूब वीडियो स्क्रिप्ट AI', 'वायरल रील्स स्क्रिप्ट', 'यूट्यूब टाइटल और टैग्स']
    },
    problemCount: 4,
    popularProblems: ['viral-youtube-scripts', 'high-ctr-titles-tags', 'reels-30sec-script-packs', 'multilingual-subtitles'],
    recommendedTab: 'tools'
  },
  {
    id: 'aud-8',
    slug: 'software-developers-engineers',
    title: 'Software Developers & IT Engineers',
    nativeTitles: {
      or: 'ସଫ୍ଟୱେର୍ ଡେଭଲପର ଓ ଆଇଟି ଇଞ୍ଜିନିୟର',
      hi: 'सॉफ्टवेयर डेवलपर्स एवं आईटी इंजीनियर्स',
      bn: 'সফটওয়্যার ডেভেলপার ও আইটি ইঞ্জিনিয়ার',
      te: 'సాఫ్ట్‌వేర్ డెవలపర్లు మరియు ఇంజనీర్లు',
      ta: 'மென்பொருள் உருவாக்குநர்கள்',
      mr: 'सॉफ्टवेअर डेव्हलपर्स आणि इंजिनिअर्स',
      gu: 'સોફ્ટવેર ડેવલપર્સ અને એન્જિનિયર્સ'
    },
    category: 'Technology & Programming',
    badge: 'Code Generation in 40+ Languages, Debugging & SQL Optimization',
    iconName: 'Code2',
    heroHeadline: 'Full-Stack AI Coding Copilot: Debug Runtime Errors, Optimize SQL & Build Complete Apps',
    shortDesc: 'Generate Python, TypeScript, React, Java, Rust code, explain stack traces, and optimize complex database queries.',
    metaDescription: 'Arohi AI for Developers: Code in Python, JS, Go, C++, SQL. Instant runtime bug fixing, API documentation, unit testing, and full-stack project building.',
    keywords: ['ai coding assistant typescript python', 'sql query optimizer ai', 'debug runtime stack trace', 'api docs and test generator', 'leetcode algorithm solver'],
    nativeKeywords: {
      or: ['କୋଡିଂ ସହାୟକ AI', 'ପାଇଥନ ପ୍ରୋଗ୍ରାମିଂ ସମାଧାନ', 'ୱେବସାଇଟ୍ କୋଡ୍'],
      hi: ['कोडिंग असिस्टेंट पायथन रिएक्ट', 'एसक्यूएल क्वेरी ऑप्टिमाइजर', 'बग फिक्सर AI']
    },
    problemCount: 5,
    popularProblems: ['full-stack-code-generator', 'debugging-stack-trace-fix', 'api-docs-unit-tests', 'algorithm-leetcode-solutions', 'database-query-optimization'],
    recommendedTab: 'tools'
  },
  {
    id: 'aud-9',
    slug: 'stock-traders-investors',
    title: 'Stock Market Traders, Investors & Wealth Builders',
    nativeTitles: {
      or: 'ଷ୍ଟକ୍ ମାର୍କେଟ ଟ୍ରେଡର ଓ ନିବେଶକ',
      hi: 'स्टॉक मार्केट ट्रेडर्स, निवेशक एवं वेल्थ प्लानर्स',
      bn: 'শেয়ার বাজার ট্রেডার ও বিনিয়োগকারী',
      te: 'స్టాక్ మార్కెట్ ట్రేడర్లు మరియు పెట్టుబడిదారులు',
      ta: 'பங்குச் சந்தை வர்த்தகர்கள் மற்றும் முதலீட்டாளர்கள்',
      mr: 'शेअर बाजार ट्रेडर्स आणि गुंतवणूकदार',
      gu: 'શેરબજારના ટ્રેડર્સ અને રોકાણકારો'
    },
    category: 'Finance, Trading & Investments',
    badge: 'Candlestick Analysis, Nifty/BankNifty Strategies & SIP Calculator',
    iconName: 'TrendingUp',
    heroHeadline: 'AI Market Intelligence: Price Action Analysis, Option Strategies & Long-Term SIP Planning',
    shortDesc: 'Analyze candlestick patterns, understand risk-reward setups, calculate SIP compounding, and screen fundamental stocks.',
    metaDescription: 'Arohi AI for Traders & Investors: Candlestick chart pattern breakdown, Nifty option strategies, mutual fund SIP calculators, and fundamental stock metrics.',
    keywords: ['candlestick pattern analyzer ai', 'nifty banknifty option strategy ai', 'sip compounding calculator', 'stock fundamental screening ai', 'crypto market trend analysis'],
    nativeKeywords: {
      or: ['ଷ୍ଟକ୍ ମାର୍କେଟ୍ ବିଶ୍ଳେଷଣ', 'ନିଫ୍ଟି ଅପ୍ସନ ଷ୍ଟ୍ରାଟେଜି', 'ମ୍ୟୁଚୁଆଲ୍ ଫଣ୍ଡ SIP କାଲକୁଲେଟର'],
      hi: ['कैंडलस्टिक पैटर्न एनालिसिस', 'निफ्टी ऑप्शन ट्रेडिंग स्ट्रैटेजी', 'एसआईपी कैलकुलेटर AI']
    },
    problemCount: 5,
    popularProblems: ['candlestick-price-action', 'nifty-options-strategy', 'stock-fundamental-screener', 'sip-mutual-fund-compounding', 'crypto-macro-analysis'],
    recommendedTab: 'business'
  },
  {
    id: 'aud-10',
    slug: 'chartered-accountants-tax',
    title: 'Chartered Accountants, Tax & Finance Professionals',
    nativeTitles: {
      or: 'ଚାର୍ଟାର୍ଡ ଆକାଉଣ୍ଟାଣ୍ଟ ଓ ଟ୍ୟାକ୍ସ ବିଶେଷଜ୍ଞ',
      hi: 'चार्टर्ड अकाउंटेंट्स, टैक्स एवं वित्त पेशेवर',
      bn: 'চার্টার্ড অ্যাকাউন্ট্যান্ট ও কর পেশাদার',
      te: 'చార్టర్డ్ అకౌంటెంట్లు మరియు పన్ను నిపుణులు',
      ta: 'பட்டய கணக்காளர்கள் மற்றும் வரி நிபுணர்கள்',
      mr: 'चार्टर्ड अकाउंटंट्स आणि कर व्यावसायिक',
      gu: 'ચાર્ટર્ડ એકાઉન્ટન્ટ્સ અને ટેક્સ પ્રોફેશનલ્સ'
    },
    category: 'Accounting & Taxation',
    badge: 'Income Tax Sections (80C, 80D, 87A), GST & ROC Compliance',
    iconName: 'Calculator',
    heroHeadline: 'AI Tax & Audit Assistant: Income Tax Act Sections, GST Classifications & Balance Sheet Checks',
    shortDesc: 'Quickly look up tax deductions, verify GST HSN codes, draft audit notes, and model corporate cash flows.',
    metaDescription: 'Simplify tax and audit with Arohi AI. Income tax 80C/80D guidance, GST rates, balance sheet reconciliation, ROC compliance checklists.',
    keywords: ['income tax act 80c 80d deductions ai', 'gst hsn code tax classification', 'balance sheet reconciliation helper', 'roc corporate compliance checklist'],
    nativeKeywords: {
      or: ['ଆୟକର ରିହାତି ନିୟମାବଳୀ', 'ଜିଏସଟି ଟ୍ୟାକ୍ସ କାଲକୁଲେଟର', 'ଅଡିଟ୍ ନୋଟ୍ସ'],
      hi: ['इनकम टैक्स धारा 80C 80D', 'जीएसटी एचएसएन कोड खोज', 'बैलेंस शीट मिलान']
    },
    problemCount: 4,
    popularProblems: ['income-tax-deductions-80c', 'balance-sheet-reconciliation', 'corporate-roc-compliance', 'cash-flow-budget-modeling'],
    recommendedTab: 'business'
  },
  {
    id: 'aud-11',
    slug: 'divyangjan-pwd',
    title: 'Divyangjan (Persons with Disabilities / PwD)',
    nativeTitles: {
      or: 'ଦିବ୍ୟାଙ୍ଗଜନ (ଭିନ୍ନକ୍ଷମ ବ୍ୟକ୍ତିବିଶେଷ)',
      hi: 'दिव्यांगजन (विशेष रूप से सक्षम एवं दिव्यांग)',
      bn: 'দিব্যাঙ্গজন ও প্রতিবন্ধী ব্যক্তিবর্গ',
      te: 'దివ్యాంగులు (ప్రత్యేక సామర్థ్యం గల వ్యక్తులు)',
      ta: 'மாற்றுத்திறனாளிகள் (திவ்யாங்ஜன்)',
      mr: 'दिव्यांगजन (विशेष सक्षम व्यक्ती)',
      gu: 'દિવ્યાંગજન (વિશેષ સક્ષમ વ્યક્તિઓ)'
    },
    category: 'Accessibility, Rights & Welfare',
    badge: 'UDID Card, ADIP Appliances, NHFDC Loans & 4% Job Reservation',
    iconName: 'HeartHandshake',
    heroHeadline: 'Empowering Divyangjan with UDID Schemes, 4% Govt Job Norms & Voice Accessibility',
    shortDesc: 'Apply for UDID disability cards, get free motorized wheelchairs under ADIP, access 4% job reservation guidelines, and enjoy hands-free voice AI.',
    metaDescription: 'Arohi AI for Divyangjan: UDID card application, ADIP free aids and appliances, NHFDC 4% business loans, RPwD Act 2016 4% job reservation & scribe norms.',
    keywords: ['udid card online apply guide', 'adip scheme motorized wheelchair free apply', 'nhfdc disability loan 4 percent interest', '4 percent pwd job reservation rules rpwd act 2016', 'scribe extra time rules 20 min exam'],
    nativeKeywords: {
      or: ['ଦିବ୍ୟାଙ୍ଗ ସରକାରୀ ଯୋଜନା', 'UDID କାର୍ଡ ଅନଲାଇନ ଆବେଦନ', '୪ ପ୍ରତିଶତ ଚାକିରି ସଂରକ୍ଷଣ', 'ADIP ମାଗଣା ହୁଇଲଚେୟାର'],
      hi: ['यूडीआईडी कार्ड ऑनलाइन आवेदन', 'एडीआईपी मुफ्त व्हीलचेयर योजना', 'दिव्यांगजन 4% आरक्षण नियम', 'एनएचएफडीसी लोन 4%']
    },
    problemCount: 6,
    popularProblems: ['udid-card-online-apply', 'adip-free-appliances-wheelchair', 'nhfdc-concessional-loans', '4-percent-pwd-reservation', 'scribe-exam-guidelines', 'voice-accessibility-screen-reader'],
    recommendedTab: 'schemes'
  },
  {
    id: 'aud-12',
    slug: 'job-seekers-professionals',
    title: 'Job Seekers & Working Professionals',
    nativeTitles: {
      or: 'ଚାକିରି ଖୋଜୁଥିବା ପ୍ରାର୍ଥୀ ଓ କର୍ମଜୀବୀ',
      hi: 'नौकरी तलाशने वाले एवं कामकाजी पेशेवर',
      bn: 'চাকরিপ্রার্থী ও পেশাজীবী',
      te: 'ఉద్యోగార్థులు మరియు నిపుణులు',
      ta: 'வேலை தேடுபவர்கள் மற்றும் பணியாளர்கள்',
      mr: 'नोकरी शोधणारे आणि कार्यरत व्यावसायिक',
      gu: 'નોકરી શોધનારા અને કાર્યકારી વ્યાવસાયિકો'
    },
    category: 'Career, Resume & Interviews',
    badge: '100/100 ATS Resume (.docx), AI Voice Mock Interview & Salary Negotiation',
    iconName: 'Briefcase',
    heroHeadline: 'Free ATS Resume Builder, Tailored Cover Letters & Live AI Voice Mock Interviews',
    shortDesc: 'Download ATS-perfect Word .docx resumes, practice live voice job interviews with instant scoring, and write tailored cover letters.',
    metaDescription: 'Land your dream job with Arohi AI: Free ATS resume checker (.docx download), customized cover letters, voice mock interviews & salary negotiation scripts.',
    keywords: ['ats resume builder docx free download', 'voice mock interview practice ai', 'cover letter generator for job description', 'salary negotiation email template', 'career switch roadmap to it'],
    nativeKeywords: {
      or: ['ମାଗଣା ରେଜ୍ୟୁମେ ମେକର docx', 'ଇଣ୍ଟରଭ୍ୟୁ ପ୍ରସ୍ତୁତି AI', 'ଚାକିରି ଆବେଦନ ପତ୍ର'],
      hi: ['मुफ्त एटीएस रेज्यूमे मेकर', 'एआई मॉक इंटरव्यू वॉइस प्रैक्टिस', 'कवर लेटर जनरेटर']
    },
    problemCount: 5,
    popularProblems: ['ats-resume-docx-builder', 'custom-cover-letter-maker', 'voice-mock-interview-practice', 'salary-negotiation-scripts', 'career-switch-roadmap'],
    recommendedTab: 'resume'
  },
  {
    id: 'aud-13',
    slug: 'hr-recruiters',
    title: 'HR Managers, Talent Acquisition & Recruiters',
    nativeTitles: {
      or: 'HR ପରିଚାଳକ ଓ ନିଯୁକ୍ତିଦାତା',
      hi: 'एचआर मैनेजर्स एवं टैलेंट रिक्रूटर्स',
      bn: 'এইচআর ম্যানেজার ও রিক্রুটার',
      te: 'హెచ్ఆర్ మేనేజర్లు మరియు రిక్రూటర్లు',
      ta: 'மனிதவள மேலாளர்கள்',
      mr: 'एचआर मॅनेजर्स आणि रिक्रूटर्स',
      gu: 'એચઆર મેનેજર્સ અને ભરતીકારો'
    },
    category: 'Human Resources & Talent',
    badge: 'Job Description Writer, Interview Question Banks & Workplace Policies',
    iconName: 'Users',
    heroHeadline: 'AI Recruitment Suite: Job Description Builder, Technical Question Banks & Policy Manuals',
    shortDesc: 'Draft competitive job postings, generate scenario-based interview question sets, and craft workplace HR policies.',
    metaDescription: 'Streamline hiring with Arohi AI: High-converting job description writer, candidate evaluation rubrics, onboarding guides & employee handbook builder.',
    keywords: ['job description jd writer ai', 'interview question bank generator', 'employee handbook policy maker', 'performance appraisal summary ai'],
    nativeKeywords: {
      or: ['ଜବ୍ ଡେସ୍କ୍ରିପସନ୍ ତିଆରି', 'ଇଣ୍ଟରଭ୍ୟୁ ପ୍ରଶ୍ନ ବ୍ୟାଙ୍କ', 'HR ପଲିସି'],
      hi: ['जॉब डिस्क्रिप्शन राइटर AI', 'इंटरव्यू क्वेश्चन बैंक', 'एचआर पॉलिसी ड्राफ्टर']
    },
    problemCount: 4,
    popularProblems: ['job-description-writer', 'interview-question-bank-generator', 'employee-handbook-policy-maker', 'performance-appraisal-summary'],
    recommendedTab: 'employer'
  },
  {
    id: 'aud-14',
    slug: 'legal-advocates-lawyers',
    title: 'Lawyers, Advocates & Legal Researchers',
    nativeTitles: {
      or: 'ଆଇନଜୀବୀ ଓ ଆଇନ ବିଶେଷଜ୍ଞ',
      hi: 'अधिवक्ता, वकील एवं कानूनी सलाहकार',
      bn: 'আইনজীবী ও আইনি গবেষক',
      te: 'న్యాయవాదులు మరియు లీగల్ రీసెర్చర్లు',
      ta: 'வழக்கறிஞர்கள் மற்றும் சட்ட ஆலோசகர்கள்',
      mr: 'वकील आणि कायदेशीर सल्लागार',
      gu: 'વકીલો અને કાનૂની સંશોધકો'
    },
    category: 'Law, Contracts & Petitions',
    badge: 'Legal Notices, RTI Petitions, Consumer Complaints & Contract Review',
    iconName: 'Scale',
    heroHeadline: 'AI Legal Research & Drafting: Consumer Complaints, RTI Petitions & Contract Review',
    shortDesc: 'Draft professional legal notices, prepare RTI applications, summarize case law precedents, and review NDA agreements.',
    metaDescription: 'Arohi AI for Legal Pros & Citizens: RTI application drafting, legal notices, consumer court petitions, case law summaries & NDA contract analysis.',
    keywords: ['legal notice format drafting ai', 'rti application format online', 'consumer court complaint draft', 'case law precedent research helper', 'nda lease agreement review'],
    nativeKeywords: {
      or: ['RTI ଆବେଦନ ଫର୍ମାଟ୍', 'ଲିଗାଲ ନୋଟିସ୍ ଡ୍ରାଫ୍ଟ', 'ଗ୍ରାହକ ଅଦାଲତ ଅଭିଯୋଗ'],
      hi: ['आरटीआई आवेदन प्रारूप ऑनलाइन', 'लीगल नोटिस ड्राफ्ट', 'उपभोक्ता फोरम शिकायत ड्राफ्ट']
    },
    problemCount: 4,
    popularProblems: ['legal-notice-contract-drafting', 'consumer-court-rti-petitions', 'case-law-research-summaries', 'nda-lease-agreement-review'],
    recommendedTab: 'chat'
  },
  {
    id: 'aud-15',
    slug: 'doctors-healthcare',
    title: 'Doctors, Nurses & Healthcare Professionals',
    nativeTitles: {
      or: 'ଡାକ୍ତର, ନର୍ସ ଓ ସ୍ୱାସ୍ଥ୍ୟସେବୀ',
      hi: 'चिकित्सक, नर्स एवं स्वास्थ्यकर्मी',
      bn: 'চিকিৎসক ও স্বাস্থ্যকর্মী',
      te: 'వైద్యులు మరియు ఆరోగ్య నిపుణులు',
      ta: 'மருத்துவர்கள் மற்றும் செவிலியர்கள்',
      mr: 'डॉक्टर्स आणि आरोग्य कर्मचारी',
      gu: 'ડોકટરો અને આરોગ્ય કર્મચારીઓ'
    },
    category: 'Healthcare & Medical Practice',
    badge: 'Patient Leaflets in 150+ Languages, Medical Papers & Clinical Notes',
    iconName: 'Stethoscope',
    heroHeadline: 'Clinical Communication AI: Patient Education Leaflets & Medical Literature Summaries',
    shortDesc: 'Translate medical instructions into regional languages, summarize clinical research studies, and draft patient wellness handouts.',
    metaDescription: 'Empower medical practice with Arohi AI: Multilingual patient education leaflets, medical journal paper summaries & structured clinical notes.',
    keywords: ['patient education leaflet generator regional language', 'medical research paper summarizer', 'clinical documentation format', 'medical term translator for patients'],
    nativeKeywords: {
      or: ['ରୋଗୀ ଶିକ୍ଷା ପତ୍ରିକା', 'ଡାକ୍ତରୀ ନୋଟ୍ସ', 'ସ୍ୱାସ୍ଥ୍ୟ ସଚେତନତା'],
      hi: ['मरीज शिक्षा पर्चा जनरेटर', 'मेडिकल रिसर्च पेपर सारांश', 'स्वास्थ्य परामर्श नोट्स']
    },
    problemCount: 4,
    popularProblems: ['patient-leaflets-regional-languages', 'medical-research-paper-summaries', 'clinical-documentation-structuring', 'medical-terminology-translator'],
    recommendedTab: 'chat'
  },
  {
    id: 'aud-16',
    slug: 'fitness-diet-enthusiasts',
    title: 'Fitness Enthusiasts, Athletes & Diet Seekers',
    nativeTitles: {
      or: 'ଫିଟନେସ୍ ଓ ସ୍ୱାସ୍ଥ୍ୟ ସଚେତନ ବ୍ୟକ୍ତିବିଶେଷ',
      hi: 'फिटनेस प्रेमी, एथलीट एवं डाइट प्लानर्स',
      bn: 'ফিটনেস প্রেমী ও ডায়েট সন্ধানকারী',
      te: 'ఫిట్‌నెస్ ఔత్సాహికులు మరియు డైట్ ప్లానర్లు',
      ta: 'உடற்பயிற்சி மற்றும் உணவுமுறை ஆர்வலர்கள்',
      mr: 'फिटनेस प्रेमी आणि डाएट प्लॅनर्स',
      gu: 'ફિટનેસ પ્રેમીઓ અને ડાયેટ પ્લાનર્સ'
    },
    category: 'Fitness, Nutrition & Health',
    badge: 'Indian Diet Nutrition, Home Workout Splits & Calorie Counter',
    iconName: 'Dumbbell',
    heroHeadline: 'Personalized Indian Diet Plans, Home Workout Routines & Macro Trackers',
    shortDesc: 'Get customized vegetarian, non-veg, and regional meal plans, tailored gym workouts, and calorie/macro breakdowns.',
    metaDescription: 'Transform your body with Arohi AI: Custom Indian diet charts (Poha, Roti, Dal, Rice macros), home dumbbell workouts, and fat loss / muscle gain guides.',
    keywords: ['custom indian diet plan vegetarian nonveg', 'home workout gym split routine generator', 'indian food calorie macro calculator', 'weight loss meal plan ai'],
    nativeKeywords: {
      or: ['ଭାରତୀୟ ଖାଦ୍ୟ ଡାଏଟ୍ ଚାର୍ଟ', 'ଘରୋଇ ବ୍ୟାୟାମ ତାଲିକା', 'ଓଜନ ହ୍ରାସ ଉପାୟ'],
      hi: ['भारतीय शाकाहारी डाइट प्लान', 'होम वर्कआउट रूटीन', 'कैलोरी और प्रोटीन चार्ट']
    },
    problemCount: 4,
    popularProblems: ['custom-indian-diet-plans', 'home-gym-workout-routines', 'indian-meal-calorie-macro-breakdown', 'habit-tracking-wellness-goals'],
    recommendedTab: 'chat'
  },
  {
    id: 'aud-17',
    slug: 'farmers-agriculture',
    title: 'Farmers, Agri-Entrepreneurs & Rural India',
    nativeTitles: {
      or: 'କୃଷକ ଓ କୃଷି ଉଦ୍ୟୋଗୀ',
      hi: 'किसान, कृषि उद्यमी एवं ग्रामीण भारत',
      bn: 'কৃষক ও কৃষি উদ্যোক্তা',
      te: 'రైతులు మరియు వ్యవసాయ వ్యాపారులు',
      ta: 'விவசாயிகள் மற்றும் வேளாண் தொழில்முனைவோர்',
      mr: 'शेतकरी आणि कृषी उद्योजक',
      gu: 'ખેડૂતો અને કૃષિ સાહસિકો'
    },
    category: 'Agriculture & Rural Development',
    badge: 'PM-Kisan, Crop Diseases, Live Mandi Prices & PM-KUSUM Solar Pumps',
    iconName: 'Sprout',
    heroHeadline: 'Kisan AI Advisor: Crop Disease Remedies, PM-Kisan Schemes & Live Mandi Prices',
    shortDesc: 'Diagnose crop pests, calculate fertilizer doses, check PM-Kisan status, and apply for solar pump subsidies in your mother tongue.',
    metaDescription: 'Arohi AI for Farmers: PM-Kisan installment guide, organic pest control remedies, seasonal crop calendar, Mandi bhav today & PM-KUSUM solar pump subsidy.',
    keywords: ['pm kisan samman nidhi status check ai', 'crop disease diagnosis remedy organic', 'mandi price live updates today', 'pm kusum solar pump subsidy apply', 'dairy poultry mushroom farming guide'],
    nativeKeywords: {
      or: ['ପିଏମ କିଷାନ ଯୋଜନା ତଥ୍ୟ', 'ଫସଲ ରୋଗ ନିରାକରଣ', 'ମଣ୍ଡି ଦର ଆଜିର', 'ସୌର ପମ୍ପ ସବସିଡି'],
      hi: ['पीएम किसान सम्मान निधि योजना', 'फसल रोग निदान उपाय', 'मंडी भाव आज का', 'सोलर पंप योजना कुसुम']
    },
    problemCount: 5,
    popularProblems: ['pm-kisan-status-guide', 'crop-disease-organic-remedies', 'mandi-price-harvest-planning', 'pm-kusum-solar-pump-subsidy', 'dairy-poultry-farming-guides'],
    recommendedTab: 'schemes'
  },
  {
    id: 'aud-18',
    slug: 'homemakers-parents',
    title: 'Homemakers, Parents & Families',
    nativeTitles: {
      or: 'ଗୃହିଣୀ, ଅଭିଭାବକ ଓ ପରିବାର',
      hi: 'गृहिणी, अभिभावक एवं परिवार',
      bn: 'গৃহিণী ও অভিভাবকবৃন্দ',
      te: 'గృహిణులు మరియు తల్లిదండ్రులు',
      ta: 'இல்லத்தரசிகள் மற்றும் பெற்றோர்கள்',
      mr: 'गृहिणी आणि पालक',
      gu: 'ગૃહિણીઓ અને માતાપિતા'
    },
    category: 'Family, Parenting & Household',
    badge: 'Family Budget Planner, Leftover Ingredient Recipes & Bedtime Stories',
    iconName: 'Home',
    heroHeadline: 'Smart Home & Parenting AI: Budget Optimizers, Creative Recipes & Moral Stories',
    shortDesc: 'Manage monthly grocery spending, create delicious meals from leftover ingredients, and generate bedtime stories for kids.',
    metaDescription: 'Manage family life effortlessly with Arohi AI: Household budget tracker, zero-waste leftover cooking recipes, moral bedtime stories & parenting advice.',
    keywords: ['family monthly budget grocery optimizer', 'leftover ingredients recipe generator', 'moral bedtime stories for kids ai', 'child parenting positive habits'],
    nativeKeywords: {
      or: ['ଘରୋଇ ଖର୍ଚ୍ଚ ହିସାବ ଯୋଜନା', 'ସ୍ୱାଦିଷ୍ଟ ରନ୍ଧନ ରେସିପି', 'ପିଲାଙ୍କ ନୀତିକଥା ଗଳ୍ପ'],
      hi: ['घर का बजट और बचत योजना', 'बची हुई सामग्री से रेसिपी', 'बच्चों की प्रेरक कहानियां']
    },
    problemCount: 4,
    popularProblems: ['family-budget-grocery-optimizer', 'leftover-ingredients-recipes', 'moral-bedtime-stories-kids', 'home-organization-chores'],
    recommendedTab: 'chat'
  },
  {
    id: 'aud-19',
    slug: 'travelers-tourists',
    title: 'Travelers, Tourists & Backpackers',
    nativeTitles: {
      or: 'ଭ୍ରମଣକାରୀ ଓ ପର୍ଯ୍ୟଟକ',
      hi: 'यात्री, पर्यटक एवं बैकपैकर्स',
      bn: 'ভ্রমণপিপাসু ও পর্যটক',
      te: 'ప్రయాణికులు మరియు పర్యాటకులు',
      ta: 'பயணிகள் மற்றும் சுற்றுலாப் பயணிகள்',
      mr: 'प्रवासी आणि पर्यटक',
      gu: 'પ્રવાસીઓ અને પ્રવાસીઓ'
    },
    category: 'Travel, Tourism & Hospitality',
    badge: 'Custom Travel Itineraries, Budget Roadmaps & Visa SOPs',
    iconName: 'Compass',
    heroHeadline: 'AI Travel Companion: Day-by-Day Itineraries, Hidden Gems & Visa SOPs',
    shortDesc: 'Plan unforgettable trips with detailed day-by-day itineraries, estimate travel costs, and discover offbeat tourist destinations.',
    metaDescription: 'Plan your dream vacation with Arohi AI: Customized day-by-day travel itineraries, budget estimators, hidden gem spots & visa SOP letter generator.',
    keywords: ['custom travel itinerary day by day planner', 'budget travel cost estimator india world', 'visa application sop statement of purpose', 'offbeat tourist destinations guide'],
    nativeKeywords: {
      or: ['ଭ୍ରମଣ ଯୋଜନା ତାଲିକା', 'କମ୍ ଖର୍ଚ୍ଚରେ ଭ୍ରମଣ ଉପାୟ', 'ଦର୍ଶନୀୟ ସ୍ଥାନ'],
      hi: ['ट्रेवल आइटिनरेरी प्लानर', 'कम बजट में यात्रा प्लान', 'वीजा एसओपी ड्राफ्ट']
    },
    problemCount: 4,
    popularProblems: ['day-by-day-travel-itineraries', 'local-phrasebook-translator', 'visa-application-sop-statement', 'offbeat-hidden-destinations'],
    recommendedTab: 'chat'
  },
  {
    id: 'aud-20',
    slug: 'ngos-social-workers',
    title: 'Non-Profits, NGOs & Social Workers',
    nativeTitles: {
      or: 'ସ୍ୱେଚ୍ଛାସେବୀ ସଂଗଠନ ଓ ସମାଜସେବୀ (NGO)',
      hi: 'गैर-सरकारी संगठन (NGO) एवं सामाजिक कार्यकर्ता',
      bn: 'এনজিও ও সমাজকর্মী',
      te: 'స్వచ్ఛంద సంస్థలు (NGO) మరియు సామాజిక కార్యకర్తలు',
      ta: 'தொண்டு நிறுவனங்கள் (NGO) மற்றும் சமூக சேவகர்கள்',
      mr: 'एनजीओ आणि सामाजिक कार्यकर्ते',
      gu: 'એનજીઓ અને સામાજિક કાર્યકરો'
    },
    category: 'Non-Profit, CSR & Social Impact',
    badge: 'Grant Proposals, CSR Funding Applications & Awareness Slogans',
    iconName: 'Globe',
    heroHeadline: 'AI Social Impact Suite: Grant Proposal Writer, CSR Applications & Slogan Creator',
    shortDesc: 'Write compelling grant applications for international donors, apply for corporate CSR funds, and craft community awareness slogans.',
    metaDescription: 'Empower social causes with Arohi AI: Professional grant proposal generator, CSR funding application writer, community surveys & impact reports.',
    keywords: ['ngo grant proposal writer ai', 'csr funding project application draft', 'community awareness slogans multilingual', 'social impact survey questionnaire'],
    nativeKeywords: {
      or: ['NGO ଅନୁଦାନ ପ୍ରସ୍ତାବ ଡ୍ରାଫ୍ଟ', 'CSR ଫଣ୍ଡ ଆବେଦନ', 'ସାମାଜିକ ସଚେତନତା ସ୍ଲୋଗାନ'],
      hi: ['एनजीओ ग्रांट प्रपोजल राइटर', 'सीएसआर फंडिंग आवेदन', 'सामाजिक जागरूकता नारे']
    },
    problemCount: 4,
    popularProblems: ['ngo-grant-proposals', 'csr-funding-project-applications', 'community-survey-questions', 'awareness-campaign-slogans'],
    recommendedTab: 'chat'
  },
  {
    id: 'aud-21',
    slug: 'senior-citizens-retirees',
    title: 'Senior Citizens, Retirees & Pensioners',
    nativeTitles: {
      or: 'ବରିଷ୍ଠ ନାଗରିକ ଓ ପେନସନଭୋଗୀ',
      hi: 'वरिष्ठ नागरिक, सेवानिवृत्त एवं पेंशनभोगी',
      bn: 'প্রবীণ নাগরিক ও অবসরপ্রাপ্ত ব্যক্তিবর্গ',
      te: 'సీనియర్ సిటిజన్లు మరియు పెన్షనర్లు',
      ta: 'மூத்த குடிமக்கள் மற்றும் ஓய்வூதியதாரர்கள்',
      mr: 'ज्येष्ठ नागरिक आणि निवृत्त कर्मचारी',
      gu: 'વરિષ્ઠ નાગરિકો અને પેન્શનરો'
    },
    category: 'Senior Care, Pensions & Spiritual',
    badge: 'Jeevan Pramaan Digital Life Certificate, SCSS & Spiritual Wisdom',
    iconName: 'Feather',
    heroHeadline: 'Senior Citizen Companion: Digital Life Certificate, Savings Schemes & Spiritual Verses',
    shortDesc: 'Get step-by-step assistance for Jeevan Pramaan submission, explore Senior Citizens Savings Schemes (SCSS), and read Bhagavad Gita/spiritual verses in native scripts.',
    metaDescription: 'Arohi AI for Senior Citizens: Digital Life Certificate (Jeevan Pramaan) guide, SCSS interest rates, simple smartphone technology tutorial & daily spiritual verses.',
    keywords: ['digital life certificate jeevan pramaan online guide', 'senior citizen savings scheme scss interest rules', 'smartphone technology guide for elders', 'bhagavad gita spiritual verses native script'],
    nativeKeywords: {
      or: ['ଜୀବନ ପ୍ରମାଣ ପତ୍ର ଅନଲାଇନ', 'ବରିଷ୍ଠ ନାଗରିକ ସଞ୍ଚୟ ଯୋଜନା', 'ଭଗବଦ୍ ଗୀତା ଶ୍ଳୋକ ଅର୍ଥ'],
      hi: ['जीवन प्रमाण पत्र ऑनलाइन जमा गाइड', 'वरिष्ठ नागरिक बचत योजना', 'गीता के श्लोक अर्थ सहित']
    },
    problemCount: 4,
    popularProblems: ['jeevan-pramaan-digital-certificate', 'senior-citizen-pension-schemes', 'smartphone-tech-tutor-elders', 'spiritual-scripture-reading'],
    recommendedTab: 'schemes'
  },
  {
    id: 'aud-22',
    slug: 'writers-novelists',
    title: 'Writers, Novelists, Screenwriters & Poets',
    nativeTitles: {
      or: 'ଲେଖକ, ଔପନ୍ୟାସିକ ଓ କବି',
      hi: 'लेखक, उपन्यासकार, पटकथा लेखक एवं कवि',
      bn: 'লেখক, ঔপন্যাসিক ও কবি',
      te: 'రచయితలు, నవలా రచయితలు మరియు కవులు',
      ta: 'எழுத்தாளர்கள் மற்றும் கவிஞர்கள்',
      mr: 'लेखक, कादंबरीकार आणि कवी',
      gu: 'લેખકો, નવલકથાકારો અને કવિઓ'
    },
    category: 'Creative Writing & Literature',
    badge: 'Plot Outlines, Dialogue Polishing & World-Building Lore',
    iconName: 'BookOpen',
    heroHeadline: 'AI Literary Muse: Fiction Plot Outlines, Vernacular Dialogues & Character Arcs',
    shortDesc: 'Overcome writer\'s block with deep narrative world-building, natural dialogue polishing in vernacular tongues, and literary query letters.',
    metaDescription: 'Arohi AI for Writers: Novel plot outline builder, three-act structure, dialogue polishing in regional dialects, fantasy world-building & book blurb generator.',
    keywords: ['novel plot outline generator ai', 'dialogue polishing vernacular dialects', 'fantasy world building lore creator', 'book blurb query letter writer'],
    nativeKeywords: {
      or: ['ଗଳ୍ପ ଓ ଉପନ୍ୟାସ ରଚନା AI', 'ସଂଳାପ ଡାଇଲଗ୍ ପ୍ରସ୍ତୁତି', 'କବିତା ରଚନା'],
      hi: ['उपन्यास प्लॉट जनरेटर', 'डायलॉग राइटिंग इन हिंदी', 'किताब का विवरण और कविता']
    },
    problemCount: 4,
    popularProblems: ['novel-plot-outline-builder', 'vernacular-dialogue-polishing', 'world-building-lore-creator', 'book-blurb-query-letter'],
    recommendedTab: 'chat'
  },
  {
    id: 'aud-23',
    slug: 'researchers-phd-scholars',
    title: 'Researchers, PhD Scholars & Academic Faculty',
    nativeTitles: {
      or: 'ଗବେଷକ, PhD ସ୍କଲାର ଓ ଅଧ୍ୟାପକ',
      hi: 'शोधकर्ता, पीएचडी स्कॉलर्स एवं प्राध्यापक',
      bn: 'গবেষক ও পিএইচডি গবেষক',
      te: 'పరిశోధకులు మరియు పిహెచ్‌డి స్కాలర్లు',
      ta: 'ஆராய்ச்சியாளர்கள் மற்றும் பேராசிரியர்கள்',
      mr: 'संशोधक आणि पीएचडी स्कॉलर्स',
      gu: 'સંશોધકો અને પીએચડી વિદ્વાનો'
    },
    category: 'Academic Research & Publishing',
    badge: 'Literature Reviews, APA/IEEE Citation Formatter & Statistical Tests',
    iconName: 'Award',
    heroHeadline: 'AI Research Assistant: Literature Review Synthesis, Citation Formatting & Methodology',
    shortDesc: 'Synthesize insights from dozens of research papers, format citations across APA/IEEE/MLA, and design robust statistical methodologies.',
    metaDescription: 'Accelerate academic research with Arohi AI: Literature review synthesizer, APA / IEEE citation generator, research methodology selector & grant proposal reviews.',
    keywords: ['literature review synthesis ai research', 'apa ieee mla citation formatter online', 'research methodology statistical test selector', 'phd thesis structure helper'],
    nativeKeywords: {
      or: ['ଗବେଷଣା ପ୍ରବନ୍ଧ ସାରାଂଶ', 'ସାଇଟେସନ୍ ଫର୍ମାଟିଂ APA', 'PhD ଥିସିସ୍ ସହାୟକ'],
      hi: ['रिसर्च पेपर लिटरेचर रिव्यू', 'एपीए आईईईई साइटेशन जनरेटर', 'थीसिस रिसर्च मेथाडोलॉजी']
    },
    problemCount: 3,
    popularProblems: ['literature-review-synthesis', 'citation-formatter-apa-ieee', 'research-methodology-statistical-tests'],
    recommendedTab: 'chat'
  }
];

// 100+ REAL LIFE PROBLEMS & SOLUTIONS DATABASE
export const MASTER_PROBLEM_SOLUTIONS: MasterProblemSolution[] = [
  // 1. Students & K-12
  {
    id: 'prob-1',
    slug: 'math-step-by-step',
    audienceSlug: 'students-exam-aspirants',
    title: 'Step-by-Step Calculus & Complex Math Solver',
    nativeTitles: {
      or: 'ଗାଣିତିକ ସମସ୍ୟାର ପର୍ଯ୍ୟାୟକ୍ରମେ ସମାଧାନ',
      hi: 'गणित और कैलकुलस का स्टेप-बाय-स्टेप हल'
    },
    problemStatement: 'Students struggle to understand how complex integration, differential equations, and algebraic steps are derived without a 24/7 tutor.',
    solutionSummary: 'Arohi AI explains every mathematical formula, substitution, and logic step-by-step with clear intuitive explanations in any language.',
    howArohiSolvesIt: [
      'Breaks down complex formulas into simple arithmetic operations',
      'Provides visual intuition and real-world analogies for algebraic concepts',
      'Generates 3 similar practice problems with progressive difficulty'
    ],
    targetPrompt: 'Solve this calculus integration problem step-by-step with simple explanations: [Insert Math Equation]',
    keywords: ['step by step math solver', 'calculus derivative integration helper', 'class 12 math solutions online', 'free math ai tutor'],
    nativeKeywords: {
      or: ['ଗଣିତ ସମାଧାନ ଉତ୍ତର', 'କାଲକୁଲସ ସୂତ୍ର ବୁଝାନ୍ତୁ'],
      hi: ['गणित सवाल हल करें', 'कैलकुलस स्टेप बाय स्टेप']
    },
    category: 'Mathematics',
    recommendedTab: 'syllabus',
    faqs: [
      {
        question: 'Can Arohi AI solve trigonometry and calculus problems?',
        answer: 'Yes, Arohi AI can solve algebraic, trigonometric, calculus, geometry, and matrix problems step-by-step with formula explanations.'
      }
    ]
  },
  {
    id: 'prob-2',
    slug: 'physics-derivations',
    audienceSlug: 'students-exam-aspirants',
    title: 'Physics & Chemistry Numerical Derivation Explainer',
    nativeTitles: {
      or: 'ପଦାର୍ଥ ବିଜ୍ଞାନ ସୂତ୍ର ନିଷ୍ପାଦନ ଓ ସମାଧାନ',
      hi: 'भौतिक विज्ञान सूत्र निगमन और संख्यात्मक प्रश्न'
    },
    problemStatement: 'Board exam students often memorize physics derivations without understanding the underlying laws of motion, electromagnetism, and thermodynamics.',
    solutionSummary: 'Arohi AI creates intuitive derivation maps with diagrammatic descriptions and solved numerical examples for CBSE, ICSE, and State Boards.',
    howArohiSolvesIt: [
      'Explains underlying physics principles before mathematically expanding equations',
      'Highlights common calculation pitfalls that cost board exam marks',
      'Provides SI unit conversions and dimensional analysis checks'
    ],
    targetPrompt: 'Explain the complete derivation of [Insert Physics Law/Formula] with step-by-step reasoning for my board exams.',
    keywords: ['physics derivations class 12 cbse', 'chemistry numerical problem solver', 'laws of thermodynamics derivation ai'],
    nativeKeywords: {
      or: ['ପଦାର୍ଥ ବିଜ୍ଞାନ ସୂତ୍ର ନୋଟ୍ସ', 'ରସାୟନ ବିଜ୍ଞାନ ଉତ୍ତର'],
      hi: ['फिजिक्स डेरिवेशन क्लास 12', 'केमिस्ट्री न्यूमेरिकल हल']
    },
    category: 'Science',
    recommendedTab: 'syllabus',
    faqs: [
      {
        question: 'Does Arohi cover State Board physics and chemistry syllabi?',
        answer: 'Yes, Arohi AI covers CBSE, ICSE, and all Indian State Boards including CHSE Odisha, UP Board, Bihar Board, and Maharashtra State Board.'
      }
    ]
  },
  {
    id: 'prob-3',
    slug: 'cbse-board-notes',
    audienceSlug: 'students-exam-aspirants',
    title: 'Class 1-12 Chapter Revision Notes & Mind Maps',
    nativeTitles: {
      or: 'ଦଶମ ଓ ଦ୍ୱାଦଶ ଶ୍ରେଣୀ ଅଧ୍ୟାୟ ଭିତ୍ତିକ ସଂକ୍ଷିପ୍ତ ନୋଟ୍ସ',
      hi: 'कक्षा 1-12 अध्यायवार रिवीजन नोट्स और माइंड मैप्स'
    },
    problemStatement: 'Textbooks are hundreds of pages long; students need bulleted high-yield revision notes before terminal and board examinations.',
    solutionSummary: 'Arohi AI summarizes any chapter into a 1-page high-yield cheat sheet with important definitions, recurring questions, and formula tables.',
    howArohiSolvesIt: [
      'Extracts 10 most repeated exam concepts per chapter',
      'Provides short 1-sentence definitions and key dates',
      'Translates summaries into native languages like Odia, Hindi, and Bengali'
    ],
    targetPrompt: 'Create a high-yield 1-page revision summary for [Subject] Chapter [Chapter Name] for CBSE Class [Grade].',
    keywords: ['class 10 board exam revision notes', 'chse odia medium chapter summary', 'cbse quick revision mind maps'],
    nativeKeywords: {
      or: ['ଅଧ୍ୟାୟ ସଂକ୍ଷିପ୍ତ ନୋଟ୍ସ', 'ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି ସହାୟକ'],
      hi: ['सीबीएसई क्लास 10 नोट्स', 'त्वरित रिवीजन माइंड मैप']
    },
    category: 'Academics',
    recommendedTab: 'syllabus',
    faqs: [
      {
        question: 'Can I get these study notes in Odia or Hindi?',
        answer: 'Yes! Arohi AI natively translates and formulates all chapter summaries in Odia, Hindi, and 150+ regional and global languages.'
      }
    ]
  },
  {
    id: 'prob-4',
    slug: 'multilingual-essay-writer',
    audienceSlug: 'students-exam-aspirants',
    title: 'School & College Essay & Speech Writer in 150+ Languages',
    nativeTitles: {
      or: '୧୫୦+ ଭାଷାରେ ବିଦ୍ୟାଳୟ ପ୍ରବନ୍ଧ ଓ ବକ୍ତୃତା ରଚନା',
      hi: '150+ भाषाओं में निबंध एवं भाषण लेखन'
    },
    problemStatement: 'Writing structured essays on social, scientific, or historical topics with appropriate vocabulary and paragraph transitions is challenging for students.',
    solutionSummary: 'Arohi AI crafts original, high-scoring essays and speeches with introductions, body arguments, counter-perspectives, and inspiring conclusions.',
    howArohiSolvesIt: [
      'Structures essays strictly according to standard marking rubrics',
      'Enriches vocabulary and includes quotes from renowned scholars',
      'Adapts tone from elementary school level to advanced college research'
    ],
    targetPrompt: 'Write a compelling 500-word essay on "[Topic]" in [Language] with an introduction, 3 main points, and a strong conclusion.',
    keywords: ['essay writing helper in hindi odia', 'school speech writer ai', 'college debate topic arguments'],
    nativeKeywords: {
      or: ['ପ୍ରବନ୍ଧ ରଚନା ଓଡ଼ିଆରେ', 'ବକ୍ତୃତା ପ୍ରସ୍ତୁତି ସହାୟକ'],
      hi: ['हिंदी निबंध लेखन', 'स्कूल भाषण प्रतियोगिता']
    },
    category: 'Language & Writing',
    recommendedTab: 'chat',
    faqs: [
      {
        question: 'Can Arohi write speeches for school competitions?',
        answer: 'Yes, specify your topic, duration (e.g. 2 minutes), and target audience, and Arohi generates an engaging, structured speech.'
      }
    ]
  },
  {
    id: 'prob-5',
    slug: 'foreign-language-learning',
    audienceSlug: 'students-exam-aspirants',
    title: 'Interactive Foreign & Regional Spoken Language Tutor',
    nativeTitles: {
      or: 'ବିଦେଶୀ ଓ ଆଞ୍ଚଳିକ ଭାଷା ଶିକ୍ଷଣ ଶିକ୍ଷକ',
      hi: 'विदेशी एवं क्षेत्रीय भाषा शिक्षण ट्यूटर'
    },
    problemStatement: 'Language learners struggle with pronunciation, conversational confidence, and grammatical nuances without a native speaker to practice with.',
    solutionSummary: 'Arohi AI engages in real-time voice and text conversations in 150+ languages, correcting grammar and providing phonetic pronunciation guides.',
    howArohiSolvesIt: [
      'Conducts interactive roleplay conversations (e.g., ordering food in French, job interview in German)',
      'Provides immediate grammar corrections with bilingual explanations',
      'Builds daily vocabulary cards with audio pronunciation'
    ],
    targetPrompt: 'Act as a patient [Language, e.g. German / Spoken English / Sanskrit] teacher. Teach me beginner conversational phrases step-by-step.',
    keywords: ['learn spoken english voice ai', 'german spanish language tutor online', 'sanskrit spoken tutor ai'],
    nativeKeywords: {
      or: ['ଇଂରାଜୀ କଥାବାର୍ତ୍ତା ଶିଖନ୍ତୁ', 'ବିଦେଶୀ ଭାଷା ଶିକ୍ଷା'],
      hi: ['अंग्रेजी बोलना सीखें AI', 'विदेशी भाषा ट्यूटर']
    },
    category: 'Languages',
    recommendedTab: 'chat',
    faqs: [
      {
        question: 'Does Arohi support Indian classical languages like Sanskrit?',
        answer: 'Yes, Arohi AI supports Sanskrit shlokas, grammar (Vyakaran), Sandhi, and translations alongside modern global languages.'
      }
    ]
  },

  // 2. Competitive Exam Aspirants
  {
    id: 'prob-6',
    slug: 'upsc-answer-evaluation',
    audienceSlug: 'competitive-aspirants',
    title: 'UPSC & State PSC Mains Answer Writing Evaluator',
    nativeTitles: {
      or: 'UPSC ଓ OPSC ମେନ୍ସ ଉତ୍ତର ମୂଲ୍ୟାଙ୍କନ',
      hi: 'UPSC एवं स्टेट पीएससी मुख्य परीक्षा उत्तर मूल्यांकन'
    },
    problemStatement: 'Aspirants write hundreds of GS answers but lack affordable, objective, instant evaluation on structure, dimensions (PESTLE), and value additions.',
    solutionSummary: 'Arohi AI analyzes GS answers against official UPSC rubrics, points out missing constitutional articles, case laws, and provides an upgraded model answer.',
    howArohiSolvesIt: [
      'Evaluates answers across Introduction, Body Dimensions, and Way Forward',
      'Suggests relevant committee reports, Supreme Court judgments, and NITI Aayog data',
      'Provides a scored feedback rubric (out of 10 or 15 marks)'
    ],
    targetPrompt: 'Evaluate my UPSC GS Answer against official mains standards. Provide a score out of 10, identify missing dimensions, and provide an upgraded model answer.\n\nQUESTION: [Insert Question]\n\nMY ANSWER: [Insert Answer]',
    keywords: ['upsc mains answer evaluator ai', 'opsc answer writing practice', 'mains gs answer score calculator'],
    nativeKeywords: {
      or: ['UPSC ମେନ୍ସ ଉତ୍ତର ଯାଞ୍ଚ', 'OPSC ପରୀକ୍ଷା ପ୍ରଶ୍ନୋତ୍ତର'],
      hi: ['यूपीएससी मुख्य परीक्षा उत्तर जांच', 'स्टेट पीएससी मॉडल उत्तर']
    },
    category: 'Civil Services',
    recommendedTab: 'jobs',
    faqs: [
      {
        question: 'Can Arohi evaluate answers in regional languages like Hindi or Odia?',
        answer: 'Yes, Arohi evaluates UPSC and State PSC answers written in Odia, Hindi, Marathi, Bengali, Tamil, Telugu, and English.'
      }
    ]
  },
  {
    id: 'prob-7',
    slug: 'current-affairs-editorial',
    audienceSlug: 'competitive-aspirants',
    title: 'Daily Current Affairs & The Hindu/Express Editorial Breakdown',
    nativeTitles: {
      or: 'ଦୈନିକ ସାମ୍ପ୍ରତିକ ଘଟଣାବଳୀ ଓ ସମ୍ପାଦକୀୟ ବିଶ୍ଳେଷଣ',
      hi: 'दैनिक करेंट अफेयर्स एवं संपादकीय विश्लेषण'
    },
    problemStatement: 'Reading multi-page newspapers takes 3 hours daily; aspirants get bogged down in political noise rather than exam-relevant syllabus points.',
    solutionSummary: 'Arohi AI distills top national and international news into crisp GS-1, GS-2, GS-3, and Prelims-specific facts within 5 minutes.',
    howArohiSolvesIt: [
      'Categorizes news items strictly according to UPSC/State PSC syllabus topics',
      'Generates 5 Prelims-style multiple choice questions with explanations',
      'Identifies critical data points, international conventions, and government schemes'
    ],
    targetPrompt: 'Summarize today\'s top national current affairs into UPSC GS-1, GS-2, GS-3 syllabus categories with 5 Prelims practice MCQs.',
    keywords: ['daily current affairs upsc odia hindi', 'the hindu editorial summary ai', 'prelims daily mcq practice'],
    nativeKeywords: {
      or: ['ଆଜିର ଖବର ସାମ୍ପ୍ରତିକ ଘଟଣାବଳୀ', 'UPSC ଦୈନିକ ନୋଟ୍ସ'],
      hi: ['दैनिक करेंट अफेयर्स यूपीएससी', 'द हिंदू एडिटोरियल समरी']
    },
    category: 'Civil Services',
    recommendedTab: 'jobs',
    faqs: [
      {
        question: 'Are the summaries updated daily?',
        answer: 'Yes, Arohi AI leverages real-time multi-engine live search streams across Google News, national portals, and official gazettes.'
      }
    ]
  },
  {
    id: 'prob-8',
    slug: 'ssc-reasoning-tricks',
    audienceSlug: 'competitive-aspirants',
    title: 'SSC CGL, Railway & Banking Quantitative & Reasoning Tricks',
    nativeTitles: {
      or: 'SSC CGL ଓ ବ୍ୟାଙ୍କିଙ୍ଗ୍ ଗଣିତ ଓ ରିଜନିଂ ସର୍ଟକଟ୍',
      hi: 'एसएससी सीजीएल और बैंकिंग शॉर्टकट ट्रिक्स'
    },
    problemStatement: 'In speed-based exams like SSC and Banking, solving a question in 30 seconds requires mental shortcuts rather than long textbook formulas.',
    solutionSummary: 'Arohi AI teaches Vedic math shortcuts, syllogism Venn diagrams, speed calculation tricks, and percentage-to-fraction conversions.',
    howArohiSolvesIt: [
      'Provides 10-second mental calculation shortcuts for complex arithmetic',
      'Explains seating arrangements, blood relations, and coding-decoding puzzles step-by-step',
      'Provides daily timer-based practice problem sets'
    ],
    targetPrompt: 'Explain the fastest 30-second shortcut trick to solve this [Topic, e.g., Time and Work / Syllogism / Seating Arrangement] problem with 3 practice examples.',
    keywords: ['ssc cgl quantitative aptitude shortcut tricks', 'banking reasoning puzzle solver ai', 'rrb railway exam math tricks'],
    nativeKeywords: {
      or: ['SSC ଗଣିତ ସର୍ଟକଟ୍', 'ବ୍ୟାଙ୍କିଙ୍ଗ୍ ପରୀକ୍ଷା ରିଜନିଂ'],
      hi: ['एसएससी मैथ शॉर्टकट ट्रिक', 'बैंकिंग रीजनिंग पजल हल']
    },
    category: 'Competitive Aptitude',
    recommendedTab: 'jobs',
    faqs: [
      {
        question: 'Does Arohi provide explanations for wrong options too?',
        answer: 'Yes, Arohi explains why each distractor option is incorrect and what calculation mistake leads to it.'
      }
    ]
  },
  {
    id: 'prob-9',
    slug: '90-day-exam-timetable',
    audienceSlug: 'competitive-aspirants',
    title: 'Customized 90-Day Exam Study Timetable & Revision Tracker',
    nativeTitles: {
      or: '୯୦ ଦିନିଆ ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି ଟାଇମଟେବୁଲ',
      hi: '90 दिवसीय परीक्षा अध्ययन समय सारिणी'
    },
    problemStatement: 'Most aspirants fail not from lack of effort, but from poor syllabus pacing, burning out before the final 30-day revision phase.',
    solutionSummary: 'Arohi AI creates a day-by-day study roadmap matching your available daily study hours, weak areas, and required mock test dates.',
    howArohiSolvesIt: [
      'Allocates daily topic targets based on syllabus weightage',
      'Schedules spaced-repetition revision slots at 7-day, 21-day, and 60-day marks',
      'Adapts automatically if you miss a study day'
    ],
    targetPrompt: 'Create a realistic 90-day day-by-day study timetable for [Exam, e.g. OPSC OAS / SSC CGL / UPSC Prelims]. I can study [X] hours per day.',
    keywords: ['90 day study plan for upsc', 'ssc cgl preparation timetable', 'competitive exam revision schedule ai'],
    nativeKeywords: {
      or: ['ପରୀକ୍ଷା ଟାଇମଟେବୁଲ୍ ପ୍ରସ୍ତୁତି', 'ଦୈନିକ ପାଠପଢ଼ା ଯୋଜନା'],
      hi: ['यूपीएससी 90 दिन की रणनीति', 'एसएससी टाइमटेबल प्लानर']
    },
    category: 'Study Planning',
    recommendedTab: 'jobs',
    faqs: [
      {
        question: 'Can I adjust the timetable for working professionals?',
        answer: 'Yes, specify your work hours (e.g. 3 hours on weekdays, 8 hours on weekends) and Arohi optimizes the schedule accordingly.'
      }
    ]
  },
  {
    id: 'prob-10',
    slug: 'mock-exam-question-bank',
    audienceSlug: 'competitive-aspirants',
    title: 'AI Mock Question Generator with Negative Marking Simulator',
    nativeTitles: {
      or: 'AI ମକ୍ ଟେଷ୍ଟ ପ୍ରଶ୍ନୋତ୍ତର ବ୍ୟାଙ୍କ',
      hi: 'एआई मॉक टेस्ट एवं प्रश्न बैंक जनरेटर'
    },
    problemStatement: 'Aspirants exhaust available test series and need fresh, unpredicted questions reflecting current examination trends.',
    solutionSummary: 'Arohi AI generates custom 25-question mock tests with standard negative marking rules, difficulty levels, and full analytical explanations.',
    howArohiSolvesIt: [
      'Generates statement-based, match-the-column, and assertion-reason questions',
      'Provides complete rationales for correct and incorrect statements',
      'Calculates net marks with negative marking penalty'
    ],
    targetPrompt: 'Generate a 10-question high-difficulty mock test on [Subject / Topic] matching [Exam Name] pattern with detailed answer explanations.',
    keywords: ['mock test generator ai with negative marking', 'upsc prelims test series free ai', 'state psc mock quiz online'],
    nativeKeywords: {
      or: ['ମକ୍ ଟେଷ୍ଟ ପ୍ରଶ୍ନୋତ୍ତର', 'ପରୀକ୍ଷା ପ୍ରଶ୍ନ ବ୍ୟାଙ୍କ'],
      hi: ['मॉक टेस्ट जनरेटर AI', 'प्रतियोगी परीक्षा प्रश्न बैंक']
    },
    category: 'Testing & Mock Tests',
    recommendedTab: 'jobs',
    faqs: [
      {
        question: 'Can Arohi generate tests on specific topics like Indian Polity or Ancient History?',
        answer: 'Yes, you can request mock questions narrowed down to specific acts, constitutional articles, or historical dynasties.'
      }
    ]
  },

  // 3. Entrepreneurs & MSME
  {
    id: 'prob-11',
    slug: 'pmegp-mudra-loan-dpr',
    audienceSlug: 'entrepreneurs-msme',
    title: 'Mudra, PMEGP & Stand-Up India Loan Scheme Eligibility & Application Guide',
    nativeTitles: {
      or: 'ମୁଦ୍ରା ଓ PMEGP ଋଣ ଯୋଜନା ଯୋଗ୍ୟତା ଏବଂ ଆବେଦନ ପ୍ରକ୍ରିୟା',
      hi: 'मुद्रा और पीएमईजीपी लोन योजना पात्रता एवं आवेदन'
    },
    problemStatement: 'Entrepreneurs face rejection from banks because they do not know the exact subsidy tiers (15-35%), margin money requirements, and eligible project types.',
    solutionSummary: 'Arohi AI calculates your exact subsidy category (Urban vs Rural, General vs Special category), loan limits (up to 50 Lakhs under PMEGP), and lists mandatory documents.',
    howArohiSolvesIt: [
      'Determines eligible subsidy percentage based on applicant category and location',
      'Outlines exact bank branch checklist and portal submission steps (kviconline.gov.in)',
      'Explains difference between Shishu, Kishore, and Tarun Mudra loans'
    ],
    targetPrompt: 'I want to start a [Business Type, e.g. Bakery / Agro-Processing / IT Firm] with a budget of ₹[Amount]. Calculate my PMEGP / Mudra subsidy eligibility and list the required documents.',
    keywords: ['pmegp loan eligibility calculator', 'mudra loan 50 lakh apply online', 'stand up india scheme eligibility subsidy', 'msme bank loan subsidy guide'],
    nativeKeywords: {
      or: ['PMEGP ଋଣ ସବସିଡି ତଥ୍ୟ', 'ମୁଦ୍ରା ଋଣ କିପରି ପାଇବେ', 'ବ୍ୟାଙ୍କ ଋଣ ଯୋଜନା'],
      hi: ['पीएमईजीपी लोन सब्सिडी कैलकुलेटर', 'मुद्रा लोन ऑनलाइन आवेदन']
    },
    category: 'Business Schemes & Subsidies',
    recommendedTab: 'business',
    faqs: [
      {
        question: 'How much subsidy does PMEGP offer for rural entrepreneurs?',
        answer: 'Under PMEGP, rural general category entrepreneurs receive 25% subsidy, while rural special category (SC/ST/OBC/Women/Ex-Servicemen/PwD) receive up to 35% government subsidy.'
      }
    ]
  },
  {
    id: 'prob-12',
    slug: 'detailed-project-report-dpr',
    audienceSlug: 'entrepreneurs-msme',
    title: 'Detailed Project Report (DPR) Generator for Bank Loans',
    nativeTitles: {
      or: 'ବ୍ୟାଙ୍କ ଋଣ ପାଇଁ ବିସ୍ତୃତ ପ୍ରକଳ୍ପ ରିପୋର୍ଟ (DPR) ପ୍ରସ୍ତୁତି',
      hi: 'बैंक ऋण हेतु विस्तृत परियोजना रिपोर्ट (DPR) जनरेटर'
    },
    problemStatement: 'Chartered Accountants charge ₹10,000 to ₹30,000 for a bank DPR; small entrepreneurs cannot afford this upfront cost just to apply for a loan.',
    solutionSummary: 'Arohi AI generates complete, bank-ready Detailed Project Reports with Capital Expenditure, Working Capital, 5-Year Cash Flow Projections, and Break-Even Analysis.',
    howArohiSolvesIt: [
      'Structures Machinery Cost, Raw Material Costs, and Fixed Expenses',
      'Calculates Projected Balance Sheets, Profit & Loss Statements, and DSCR (Debt Service Coverage Ratio)',
      'Formats the report strictly to meet nationalized bank credit appraisal norms'
    ],
    targetPrompt: 'Generate a complete Bank-Ready Detailed Project Report (DPR) for a [Business Type] with an investment of ₹[Total Project Cost]. Include CAPEX, OPEX, 5-year revenue projection, DSCR, and Break-Even point.',
    keywords: ['dpr for bank loan free generator', 'project report for pmegp loan pdf', 'bank ready detailed project report sample', 'dscr calculation formula for business loan'],
    nativeKeywords: {
      or: ['DPR ପ୍ରକଳ୍ପ ରିପୋର୍ଟ ପ୍ରସ୍ତୁତି', 'ବ୍ୟାଙ୍କ ଋଣ ପ୍ରୋଜେକ୍ଟ ରିପୋର୍ଟ'],
      hi: ['बैंक लोन हेतु डीपीआर जनरेटर', 'प्रोजेक्ट रिपोर्ट फॉर लोन']
    },
    category: 'Business Finance',
    recommendedTab: 'business',
    faqs: [
      {
        question: 'Does Arohi include 5-year financial projections in the DPR?',
        answer: 'Yes, Arohi calculates 5-year Sales Projections, Cost of Production, Gross Profit, Depreciation, Net Profit, DSCR, and Break-Even Output.'
      }
    ]
  },
  {
    id: 'prob-13',
    slug: 'gst-invoicing-compliance',
    audienceSlug: 'entrepreneurs-msme',
    title: 'GST Rate Lookup, HSN Code Finder & Compliant Invoice Drafter',
    nativeTitles: {
      or: 'GST ହାର ଯାଞ୍ଚ, HSN କୋଡ୍ ସନ୍ଧାନ ଓ ଇନଭଏସ୍ ଡ୍ରାଫ୍ଟ',
      hi: 'जीएसटी दर खोज, एचएसएन कोड एवं वैध इनवॉइस जनरेटर'
    },
    problemStatement: 'Small business owners struggle with GST rate slabs (5%, 12%, 18%, 28%), HSN code classifications, and invoice compliance errors.',
    solutionSummary: 'Arohi AI finds the exact 6/8 digit HSN code for your product/service, determines applicable CGST/SGST/IGST rates, and drafts GST-compliant invoices.',
    howArohiSolvesIt: [
      'Instant search across thousands of HSN and SAC codes',
      'Generates clean, printable GST invoice templates with tax breakdowns',
      'Explains GST composition scheme eligibility limits'
    ],
    targetPrompt: 'Find the official GST HSN/SAC code and applicable tax rate for [Product/Service Name]. Create a sample GST-compliant invoice format.',
    keywords: ['gst hsn code finder online', 'gst tax invoice format word excel', 'applicable gst rate for product service', 'msme gst composition scheme rules'],
    nativeKeywords: {
      or: ['GST ହାର ଓ HSN କୋଡ୍', 'ବ୍ୟବସାୟ ବିଲ୍ ଫର୍ମାଟ୍'],
      hi: ['जीएसटी एचएसएन कोड खोजें', 'जीएसटी बिल फॉर्मेट']
    },
    category: 'Business Compliance',
    recommendedTab: 'business',
    faqs: [
      {
        question: 'What is the turnover threshold for mandatory GST registration?',
        answer: 'In India, GST registration is mandatory if annual turnover exceeds ₹40 Lakhs for goods (₹20 Lakhs for special category states) and ₹20 Lakhs for services (₹10 Lakhs for special states).'
      }
    ]
  },
  {
    id: 'prob-14',
    slug: 'business-unit-economics',
    audienceSlug: 'entrepreneurs-msme',
    title: 'Business Idea Feasibility, Margins & Unit Economics Calculator',
    nativeTitles: {
      or: 'ବ୍ୟାବସାୟିକ ଲାଭ କ୍ଷତି ଓ ୟୁନିଟ୍ ଇକୋନୋମିକ୍ସ ଆକଳନ',
      hi: 'बिजनेस आइडिया व्यवहार्यता एवं यूनिट इकोनॉमिक्स'
    },
    problemStatement: 'Entrepreneurs launch products without calculating Customer Acquisition Cost (CAC), Lifetime Value (LTV), Gross Margin per unit, and payback periods.',
    solutionSummary: 'Arohi AI runs comprehensive unit economics simulations to reveal true profit margins, fixed overheads, and daily sales needed to sustain profitability.',
    howArohiSolvesIt: [
      'Calculates Cost of Goods Sold (COGS), packaging, shipping, and payment gateway fees per unit',
      'Determines realistic daily, monthly, and yearly revenue thresholds',
      'Identifies competitive advantages and potential market risks'
    ],
    targetPrompt: 'Analyze the business feasibility and unit economics of [Describe Business Idea]. Retail price: ₹[Price], Cost to produce: ₹[Cost]. Calculate profit margins, CAC, and break-even monthly unit sales.',
    keywords: ['business unit economics calculator', 'startup profit margin feasibility analysis', 'customer acquisition cost vs ltv calculation'],
    nativeKeywords: {
      or: ['ବ୍ୟବସାୟ ଲାଭ କାଲକୁଲେଟର', 'ଷ୍ଟାର୍ଟଅପ୍ ଖର୍ଚ୍ଚ ହିସାବ'],
      hi: ['बिजनेस प्रॉफिट मार्जिन कैलकुलेटर', 'यूनिट इकोनॉमिक्स विश्लेषण']
    },
    category: 'Business Strategy',
    recommendedTab: 'business',
    faqs: [
      {
        question: 'Can Arohi analyze local businesses like cloud kitchens or garment boutiques?',
        answer: 'Yes! Arohi models unit economics for manufacturing, retail shops, SaaS startups, cloud kitchens, franchise outlets, and service agencies.'
      }
    ]
  },
  {
    id: 'prob-15',
    slug: 'startup-investor-pitch-deck',
    audienceSlug: 'entrepreneurs-msme',
    title: 'Startup Investor Pitch Deck & Executive Summary Generator',
    nativeTitles: {
      or: 'ଷ୍ଟାର୍ଟଅପ୍ ନିବେଶକ ପିଚ୍ ଡେକ୍ ପ୍ରସ୍ତୁତି',
      hi: 'स्टार्टअप निवेशक पिच डेक एवं कार्यकारी सारांश'
    },
    problemStatement: 'Founders struggle to articulate their value proposition into the standard 10-12 slide investor deck needed for angel investors and venture capital.',
    solutionSummary: 'Arohi AI creates a compelling 10-slide narrative: Problem, Solution, Market Size (TAM/SAM/SOM), Business Model, Traction, Competition, and The Ask.',
    howArohiSolvesIt: [
      'Structures concise slide-by-slide bullet points with high-impact data hooks',
      'Calculates Total Addressable Market (TAM) using verifiable industry benchmarks',
      'Generates a 1-page Executive Summary for email investor outreach'
    ],
    targetPrompt: 'Create a 10-slide investor pitch deck structure and 1-page executive summary for my startup: [Describe Product, Target Market, Current Traction, and Funding Ask].',
    keywords: ['startup pitch deck 10 slide template', 'investor executive summary generator ai', 'tam sam som market sizing ai'],
    nativeKeywords: {
      or: ['ଷ୍ଟାର୍ଟଅପ୍ ପିଚ୍ ଡେକ୍', 'ନିବେଶକ ପ୍ରସ୍ତାବ ପତ୍ର'],
      hi: ['स्टार्टअप पिच डेक टेम्प्लेट', 'इन्वेस्टर समरी ड्राफ्टर']
    },
    category: 'Startups & Investment',
    recommendedTab: 'business',
    faqs: [
      {
        question: 'What are the essential 10 slides in an investor pitch deck?',
        answer: '1. Title & Hook, 2. Problem, 3. Solution, 4. Market Size (TAM/SAM/SOM), 5. Product Demo/Features, 6. Business Model, 7. Go-to-Market Strategy, 8. Competition, 9. Team, 10. Financial Projections & The Ask.'
      }
    ]
  },

  // 4. Divyangjan & PwD
  {
    id: 'prob-16',
    slug: 'udid-card-online-apply',
    audienceSlug: 'divyangjan-pwd',
    title: 'UDID Disability Card Online Application & Status Tracking Guide',
    nativeTitles: {
      or: 'UDID ଦିବ୍ୟାଙ୍ଗ କାର୍ଡ ଅନଲାଇନ ଆବେଦନ ଓ ଯାଞ୍ଚ',
      hi: 'यूडीआईडी कार्ड ऑनलाइन आवेदन एवं स्टेटस ट्रैकिंग'
    },
    problemStatement: 'Persons with disabilities face confusion regarding the Swavlamban portal registration, required medical board assessment hospital documents, and tracking status.',
    solutionSummary: 'Arohi AI provides a step-by-step walkthrough of swavlambancard.gov.in, lists the required civil hospital documents, and explains disability certificate renewal.',
    howArohiSolvesIt: [
      'Explains photo, signature/thumb impression, and Aadhaar verification rules',
      'Outlines CMO / District Medical Board appointment booking procedures',
      'Assists in tracking application status and e-UDID card download'
    ],
    targetPrompt: 'Explain the complete step-by-step process to apply for a UDID (Unique Disability Identity) card online on swavlambancard.gov.in, including required documents and hospital assessment.',
    keywords: ['udid card online apply swavlambancard gov in', 'disability certificate online apply process', 'track udid card application status', 'documents required for udid card'],
    nativeKeywords: {
      or: ['UDID କାର୍ଡ ଆବେଦନ ପ୍ରକ୍ରିୟା', 'ଦିବ୍ୟାଙ୍ଗ ପ୍ରମାଣପତ୍ର କିପରି ପାଇବେ'],
      hi: ['यूडीआईडी कार्ड ऑनलाइन आवेदन', 'दिव्यांग प्रमाण पत्र स्टेटस']
    },
    category: 'Government Schemes & Welfare',
    recommendedTab: 'schemes',
    faqs: [
      {
        question: 'What are the benefits of having a UDID Card?',
        answer: 'The UDID Card serves as a single document of verification nationwide for travel concessions (railway/bus), government job reservations, ADIP free appliances, scholarships, and pension schemes.'
      }
    ]
  },
  {
    id: 'prob-17',
    slug: 'adip-free-appliances-wheelchair',
    audienceSlug: 'divyangjan-pwd',
    title: 'ADIP Scheme Free Motorized Wheelchairs, Hearing Aids & Artificial Limbs',
    nativeTitles: {
      or: 'ADIP ଯୋଜନା ମାଗଣା ହୁଇଲଚେୟାର ଓ ସହାୟକ ଉପକରଣ',
      hi: 'एडीआईपी योजना: मुफ्त मोटराइज्ड व्हीलचेयर एवं कृत्रिम अंग'
    },
    problemStatement: 'High-tech assistive devices like motorized tricycles and smart canes cost ₹35,000+; many eligible individuals are unaware of 100% free government distribution under ADIP.',
    solutionSummary: 'Arohi AI guides applicants through ALIMCO camp registration, income eligibility certificates (up to ₹22,500/month for 100% grant), and required medical approvals.',
    howArohiSolvesIt: [
      'Identifies upcoming ALIMCO distribution camps in your state/district',
      'Checks motorized tricycle eligibility criteria (locomotor disability 40%+ and age 16+)',
      'Provides application forms and income certificate guidelines'
    ],
    targetPrompt: 'How can a person with disability get a free motorized wheelchair / hearing aid / artificial limb under the Central ADIP scheme? List income limits and application steps.',
    keywords: ['adip scheme free motorized wheelchair apply online', 'alimco free hearing aid distribution camp', 'free artificial limbs for disabled in india', 'adip scheme income eligibility criteria'],
    nativeKeywords: {
      or: ['ADIP ମାଗଣା ଉପକରଣ ଯୋଜନା', 'ମାଗଣା ହୁଇଲଚେୟାର କିପରି ପାଇବେ'],
      hi: ['एडीआईपी योजना मुफ्त व्हीलचेयर', 'एलिम्को निशुल्क सहायक उपकरण']
    },
    category: 'Government Schemes & Welfare',
    recommendedTab: 'schemes',
    faqs: [
      {
        question: 'Who is eligible for 100% free aid under the ADIP scheme?',
        answer: 'Individuals with 40% or more certified disability whose monthly family income is up to ₹22,500 are eligible for 100% free aids and assistive devices.'
      }
    ]
  },
  {
    id: 'prob-18',
    slug: 'nhfdc-concessional-loans',
    audienceSlug: 'divyangjan-pwd',
    title: 'NHFDC Concessional Self-Employment Loans (4%-8% Interest)',
    nativeTitles: {
      or: 'NHFDC ସ୍ୱଳ୍ପ ସୁଧ ବ୍ୟବସାୟ ଋଣ (୪% - ୮%)',
      hi: 'एनएचएफडीसी रियायती स्वरोजगार ऋण (4% से 8% ब्याज)'
    },
    problemStatement: 'Disabled entrepreneurs struggle to obtain private bank loans due to high interest rates (12-18%) and collateral demands.',
    solutionSummary: 'Arohi AI explains National Handicapped Finance and Development Corporation (NHFDC) loan programs offering up to ₹25 Lakhs at subsidized 4% to 8% interest.',
    howArohiSolvesIt: [
      'Details Divyangjan Swavalamban Yojana and Vishesh Microfinance Schemes',
      'Identifies State Channelising Agencies (SCAs) and nominated regional banks',
      'Drafts the business plan required for NHFDC loan approval'
    ],
    targetPrompt: 'Explain how to apply for an NHFDC concessional self-employment business loan for persons with disabilities, including interest rates, maximum loan limits, and State Channelising Agencies.',
    keywords: ['nhfdc disability business loan 4 percent', 'divyangjan swavalamban yojana loan apply', 'self employment loan for disabled persons india'],
    nativeKeywords: {
      or: ['ଦିବ୍ୟାଙ୍ଗ ବ୍ୟବସାୟ ଋଣ ଯୋଜନା', 'NHFDC କମ୍ ସୁଧ ଋଣ'],
      hi: ['दिव्यांगजन स्वरोजगार ऋण', 'एनएचएफडीसी लोन 4 प्रतिशत ब्याज']
    },
    category: 'Loans & Subsidies',
    recommendedTab: 'schemes',
    faqs: [
      {
        question: 'What is the interest rate rebate for women with disabilities under NHFDC?',
        answer: 'Women with disabilities receive an additional 1% interest rate rebate under the Divyangjan Swavalamban Yojana.'
      }
    ]
  },
  {
    id: 'prob-19',
    slug: '4-percent-pwd-reservation',
    audienceSlug: 'divyangjan-pwd',
    title: '4% Government Job Reservation & 10-Year Age Relaxation (RPwD Act 2016)',
    nativeTitles: {
      or: 'RPwD ଆଇନ ଅନୁଯାୟୀ ୪% ଚାକିରି ସଂରକ୍ଷଣ ଓ ୧୦ ବର୍ଷ ବୟସ କୋହଳ',
      hi: 'आरपीडब्ल्यूडी एक्ट: 4% सरकारी नौकरी आरक्षण एवं 10 वर्ष आयु छूट'
    },
    problemStatement: 'Candidates are often unaware of mandatory reservation categories (Blindness/Low Vision, Deaf/Hard of Hearing, Locomotor, Autism/Intellectual) in central and state government notifications.',
    solutionSummary: 'Arohi AI details Section 34 of the RPwD Act 2016, 10-year upper age relaxations (up to 15 years for SC/ST PwD), fee exemptions, and roster point calculation.',
    howArohiSolvesIt: [
      'Breaks down 4% reservation clauses across Group A, B, C, and D government posts',
      'Explains application fee exemption norms under SSC, UPSC, and State PSCs',
      'Provides legal reference citations for challenging wrongful disqualifications'
    ],
    targetPrompt: 'Detail the 4% government job reservation, 10-year age relaxation, and examination fee exemptions under the Rights of Persons with Disabilities (RPwD) Act 2016 for competitive recruitment in India.',
    keywords: ['4 percent pwd reservation rpwd act 2016', '10 year age relaxation for disabled in govt jobs', 'upsc ssc exam fee exemption for pwd', 'horizontal reservation rules for disabled candidates'],
    nativeKeywords: {
      or: ['ଦିବ୍ୟାଙ୍ଗ ସରକାରୀ ଚାକିରି ସଂରକ୍ଷଣ', '୧୦ ବର୍ଷ ବୟସ କୋହଳ ନିୟମ'],
      hi: ['दिव्यांग 4% आरक्षण नियम सरकारी नौकरी', '10 वर्ष आयु सीमा छूट']
    },
    category: 'Legal & Rights',
    recommendedTab: 'jobs',
    faqs: [
      {
        question: 'Does the 4% reservation apply to Group A and Group B civil service jobs?',
        answer: 'Yes, under the RPwD Act 2016, 4% reservation is mandatory across all groups of government posts including Group A (IAS, IPS, IRS), Group B, Group C, and Group D.'
      }
    ]
  },
  {
    id: 'prob-20',
    slug: 'scribe-exam-guidelines',
    audienceSlug: 'divyangjan-pwd',
    title: 'Scribe & Reader Norms with 20 Min/Hour Compensatory Extra Time',
    nativeTitles: {
      or: 'ପରୀକ୍ଷାରେ ସ୍କ୍ରାଇବ୍ (ଲେଖକ) ଓ ୨୦ ମିନିଟ୍ ଅତିରିକ୍ତ ସମୟ ନିୟମ',
      hi: 'परीक्षा में स्क्राइब (लेखक) एवं 20 मिनट/घंटा अतिरिक्त समय नियम'
    },
    problemStatement: 'Exam centers frequently harass visually impaired or locomotor disabled candidates, refusing own scribes or denying mandatory compensatory time.',
    solutionSummary: 'Arohi AI provides the official Ministry of Social Justice & Empowerment Office Memorandum guidelines granting own scribe rights and 20 min/hr extra time.',
    howArohiSolvesIt: [
      'Provides printable draft letters to Exam Superintendents citing official GOI guidelines',
      'Explains eligibility for compensatory time even without using a scribe',
      'Clarifies scribe qualification norms (candidates can bring their own scribe)'
    ],
    targetPrompt: 'Explain the official Government of India guidelines regarding Scribe/Reader and 20 minutes per hour compensatory extra time for exams like UPSC, SSC, NTA, and Board exams.',
    keywords: ['scribe rules for competitive exams in india', 'compensatory extra time 20 min per hour disabled', 'own scribe permission letter format for exam center'],
    nativeKeywords: {
      or: ['ପରୀକ୍ଷା ସ୍କ୍ରାଇବ୍ ନିୟମ', '୨୦ ମିନିଟ୍ ଅତିରିକ୍ତ ସମୟ'],
      hi: ['स्क्राइब नियम प्रतियोगी परीक्षा', '20 मिनट अतिरिक्त समय सरकारी नियम']
    },
    category: 'Exams & Rights',
    recommendedTab: 'jobs',
    faqs: [
      {
        question: 'Is compensatory time allowed if a disabled student does not use a scribe?',
        answer: 'Yes! Official Ministry guidelines explicitly state that all candidates with benchmark disabilities are entitled to compensatory time of not less than 20 minutes per hour of exam, whether they use a scribe or not.'
      }
    ]
  },

  // 5. Job Seekers & Professionals
  {
    id: 'prob-21',
    slug: 'ats-resume-docx-builder',
    audienceSlug: 'job-seekers-professionals',
    title: 'Free 100/100 ATS Resume Builder with Microsoft Word (.docx) Export',
    nativeTitles: {
      or: 'ମାଗଣା 100/100 ATS ରେଜ୍ୟୁମେ ମେକର (.docx ଡାଉନଲୋଡ୍)',
      hi: 'मुफ्त 100/100 एटीएस रेज्यूमे बिल्डर (वर्ड .docx डाउनलोड)'
    },
    problemStatement: 'Over 75% of resumes are discarded by Applicant Tracking Systems (ATS) like Workday, Taleo, and Greenhouse because of fancy graphics and unreadable tables.',
    solutionSummary: 'Arohi AI transforms your career experience into a single-column, ATS-parsed Microsoft Word `.docx` resume scoring 95-100 on all recruitment filters.',
    howArohiSolvesIt: [
      'Replaces vague bullet points with quantified XYZ action verbs (e.g. "Increased revenue by 32% by deploying...")',
      'Injects industry-specific hard keywords and skills matching job postings',
      'Exports directly to editable Microsoft Word `.docx` format'
    ],
    targetPrompt: 'Create a 100/100 ATS-compatible resume in `.docx` format for my profile: [Paste Current Resume / Experience and Target Job Role].',
    keywords: ['ats resume builder docx free download', 'free resume checker ats score 100', 'best single column ats resume format word', 'convert pdf resume to ats docx free'],
    nativeKeywords: {
      or: ['ମାଗଣା ATS ରେଜ୍ୟୁମେ ତିଆରି', 'ବାୟୋଡାଟା docx ଡାଉନଲୋଡ୍'],
      hi: ['मुफ्त एटीएस रेज्यूमे मेकर वर्ड', 'सीवी मेकर फ्री डाउनलोड']
    },
    category: 'Resume & Career',
    recommendedTab: 'resume',
    faqs: [
      {
        question: 'Why does Arohi export in .docx instead of only PDF?',
        answer: 'While PDFs sometimes have parsing errors in older corporate ATS engines, a clean `.docx` file guarantees 100% text recognition and allows you to customize it anytime in Microsoft Word.'
      }
    ]
  },
  {
    id: 'prob-22',
    slug: 'voice-mock-interview-practice',
    audienceSlug: 'job-seekers-professionals',
    title: 'AI Voice Mock Interview Simulator with Instant Feedback & Scoring',
    nativeTitles: {
      or: 'AI ଭଏସ୍ ମକ୍ ଇଣ୍ଟରଭ୍ୟୁ ସିମୁଲେଟର',
      hi: 'एआई वॉयस मॉक इंटरव्यू सिम्युलेटर एवं स्कोरिंग'
    },
    problemStatement: 'Job candidates freeze during real interviews due to lack of realistic spoken practice and fear of technical or behavioral questions.',
    solutionSummary: 'Arohi AI conducts live two-way spoken mock interviews, asking role-specific follow-up questions, evaluating clarity, body language cues, and technical depth.',
    howArohiSolvesIt: [
      'Conducts realistic HR and Technical interviews for Software, Banking, Sales, Civil Services, and Healthcare',
      'Evaluates answer structure using the STAR method (Situation, Task, Action, Result)',
      'Provides a final score sheet with areas of improvement'
    ],
    targetPrompt: 'Conduct a realistic 5-question voice mock interview for a [Job Title, e.g. Senior Java Developer / Bank Branch Manager / Digital Marketer] role. Ask questions one by one and evaluate my answers using the STAR method.',
    keywords: ['ai voice mock interview practice free', 'real time spoken interview simulator', 'hr round behavioral interview questions answers', 'star method interview answer generator'],
    nativeKeywords: {
      or: ['ଇଣ୍ଟରଭ୍ୟୁ ମକ୍ ଟେଷ୍ଟ AI', 'ଭଏସ୍ କଲ୍ ଇଣ୍ଟରଭ୍ୟୁ ପ୍ରାକ୍ଟିସ୍'],
      hi: ['एआई मॉक इंटरव्यू वॉइस प्रैक्टिस', 'एचआर इंटरव्यू प्रश्न उत्तर']
    },
    category: 'Interviews & Career',
    recommendedTab: 'interview',
    faqs: [
      {
        question: 'Can I practice mock interviews in languages other than English?',
        answer: 'Yes! Arohi conducts voice mock interviews in English, Hindi, Odia, Spanish, French, German, and 150+ languages.'
      }
    ]
  },
  {
    id: 'prob-23',
    slug: 'custom-cover-letter-maker',
    audienceSlug: 'job-seekers-professionals',
    title: 'Tailored Job Cover Letter Generator Matching Target Job Descriptions',
    nativeTitles: {
      or: 'କମ୍ପାନୀ ଅନୁଯାୟୀ କଭର ଲେଟର ପ୍ରସ୍ତୁତି',
      hi: 'कस्टम जॉब कवर लेटर जनरेटर'
    },
    problemStatement: 'Sending generic cover letters results in less than 2% callback rates; recruiters want letters showing direct relevance to their job description.',
    solutionSummary: 'Arohi AI maps your background directly against the employer\'s requirements, creating a tailored cover letter explaining why you are the ideal fit.',
    howArohiSolvesIt: [
      'Extracts the top 3 core requirements from the employer\'s job description',
      'Highlights your most impressive career achievements that directly address those requirements',
      'Formats the letter in professional business correspondence style'
    ],
    targetPrompt: 'Generate a highly tailored, compelling cover letter for this position.\n\nJOB DESCRIPTION: [Paste JD]\n\nMY BACKGROUND: [Paste Resume/Experience Summary]',
    keywords: ['custom cover letter generator ai for job description', 'professional cover letter word template', 'cover letter for career changer'],
    nativeKeywords: {
      or: ['ଚାକିରି କଭର ଲେଟର', 'ଆବେଦନ ପତ୍ର ଲେଖା'],
      hi: ['कवर लेटर जनरेटर AI', 'नौकरी आवेदन पत्र']
    },
    category: 'Job Application',
    recommendedTab: 'resume',
    faqs: [
      {
        question: 'How long should an effective cover letter be?',
        answer: 'An optimal cover letter is between 250 and 350 words (3 to 4 concise paragraphs) focusing on impact, skills alignment, and cultural enthusiasm.'
      }
    ]
  },
  {
    id: 'prob-24',
    slug: 'salary-negotiation-scripts',
    audienceSlug: 'job-seekers-professionals',
    title: 'Salary Negotiation Scripts, Counter-Offer Email Templates & Market Benchmarks',
    nativeTitles: {
      or: 'ଦରମା ବୃଦ୍ଧି ଓ ଅଫର ବୁଝାମଣା ଇମେଲ୍ ଫର୍ମାଟ୍',
      hi: 'वेतन मोलभाव स्क्रिप्ट एवं काउंटर ऑफर ईमेल'
    },
    problemStatement: 'Most candidates accept the first salary offer without negotiating, leaving 15% to 30% of potential compensation on the table.',
    solutionSummary: 'Arohi AI provides polite, professional salary negotiation scripts and counter-offer emails supported by market compensation benchmarks.',
    howArohiSolvesIt: [
      'Analyzes current market CTC averages for your experience and city',
      'Drafts respectful counter-offer emails balancing gratitude with value justification',
      'Provides scripts for negotiating signing bonuses, remote flexibility, and ESOPs'
    ],
    targetPrompt: 'I received a job offer of ₹[Offered Amount], but my target is ₹[Target Amount] based on my [X years] of experience and skills. Write a professional salary negotiation email to the HR.',
    keywords: ['salary negotiation email script to hr', 'how to negotiate higher salary offer counter proposal', 'polite email asking for more salary package'],
    nativeKeywords: {
      or: ['ଦରମା ବୃଦ୍ଧି ପାଇଁ ଇମେଲ୍', 'HR ଦରମା ବୁଝାମଣା'],
      hi: ['सैलरी नेगोशिएशन ईमेल ड्राफ्ट', 'वेतन वृद्धि हेतु पत्र']
    },
    category: 'Compensation & Career',
    recommendedTab: 'career',
    faqs: [
      {
        question: 'Will HR rescind a job offer if I negotiate salary politely?',
        answer: 'Professional companies almost never revoke an offer for respectful, market-backed negotiation. Arohi\'s templates ensure your communication remains collaborative and value-driven.'
      }
    ]
  },
  {
    id: 'prob-25',
    slug: 'career-switch-roadmap',
    audienceSlug: 'job-seekers-professionals',
    title: 'Non-Tech to Tech & Career Transition Roadmaps with Free Certifications',
    nativeTitles: {
      or: 'ନୂତନ କ୍ୟାରିୟର ପରିବର୍ତ୍ତନ ଯୋଜନା ଓ ରୋଡମ୍ୟାପ୍',
      hi: 'करियर स्विच रोडमैप एवं मुफ्त सर्टिफिकेशन'
    },
    problemStatement: 'Professionals stuck in dead-end jobs want to switch to Data Science, AI, Cloud, or Digital Marketing but do not know which free certifications matter.',
    solutionSummary: 'Arohi AI creates a step-by-step 6-month career transition plan with curated free certifications from Google, Microsoft, IBM, and Harvard.',
    howArohiSolvesIt: [
      'Maps transferable skills from your previous domain to your target field',
      'Provides a monthly skill checklist with capstone project recommendations',
      'Prepares you for transition interview questions like "Why are you switching fields?"'
    ],
    targetPrompt: 'Create a realistic 6-month career transition roadmap to switch from [Current Field, e.g. Mechanical Engineering / Sales / Teaching] to [Target Field, e.g. Data Analytics / Full Stack Web Development / AI Product Management]. Include top free certifications and project ideas.',
    keywords: ['career switch roadmap to data analytics ai', 'non tech to tech transition guide free', 'best free certification courses with certificates'],
    nativeKeywords: {
      or: ['କ୍ୟାରିୟର ପରିବର୍ତ୍ତନ ଉପାୟ', 'ମାଗଣା ସାର୍ଟିଫିକେଟ୍ କୋର୍ସ'],
      hi: ['नॉन-टेक से टेक करियर स्विच', 'डेटा एनालिटिक्स फ्री कोर्स']
    },
    category: 'Career Growth',
    recommendedTab: 'courses',
    faqs: [
      {
        question: 'Does Arohi provide direct links to free certified courses?',
        answer: 'Yes, Arohi curates verified free certification programs from platforms like Google Digital Garage, Microsoft Learn, Coursera Financial Aid, and NPTEL Swayam.'
      }
    ]
  }
];

export function getAudienceBySlug(slug: string): MasterAudience | undefined {
  return MASTER_AUDIENCES.find(a => a.slug === slug);
}

export function getProblemBySlug(slug: string): MasterProblemSolution | undefined {
  return MASTER_PROBLEM_SOLUTIONS.find(p => p.slug === slug);
}

export function getProblemsForAudience(audienceSlug: string): MasterProblemSolution[] {
  return MASTER_PROBLEM_SOLUTIONS.filter(p => p.audienceSlug === audienceSlug);
}

export function searchMasterSeoDatabase(query: string, language: string = 'en'): {
  audiences: MasterAudience[];
  problems: MasterProblemSolution[];
} {
  const cleanQ = query.toLowerCase().trim();
  if (!cleanQ) {
    return { audiences: MASTER_AUDIENCES, problems: MASTER_PROBLEM_SOLUTIONS };
  }

  const matchedAudiences = MASTER_AUDIENCES.filter(a => {
    return (
      a.title.toLowerCase().includes(cleanQ) ||
      a.category.toLowerCase().includes(cleanQ) ||
      a.keywords.some(k => k.toLowerCase().includes(cleanQ)) ||
      (a.nativeTitles[language] && a.nativeTitles[language].toLowerCase().includes(cleanQ)) ||
      (a.nativeKeywords[language] && a.nativeKeywords[language].some(k => k.toLowerCase().includes(cleanQ)))
    );
  });

  const matchedProblems = MASTER_PROBLEM_SOLUTIONS.filter(p => {
    return (
      p.title.toLowerCase().includes(cleanQ) ||
      p.problemStatement.toLowerCase().includes(cleanQ) ||
      p.solutionSummary.toLowerCase().includes(cleanQ) ||
      p.keywords.some(k => k.toLowerCase().includes(cleanQ)) ||
      (p.nativeTitles[language] && p.nativeTitles[language].toLowerCase().includes(cleanQ)) ||
      (p.nativeKeywords[language] && p.nativeKeywords[language].some(k => k.toLowerCase().includes(cleanQ)))
    );
  });

  return { audiences: matchedAudiences, problems: matchedProblems };
}
