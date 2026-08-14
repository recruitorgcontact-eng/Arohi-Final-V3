export interface AudienceFAQ {
  question: string;
  answer: string;
}

export interface TargetAudienceSEO {
  id: string;
  slug: string;
  title: string;
  category: string;
  badge: string;
  iconName: string;
  heroHeadline: string;
  shortDesc: string;
  metaDescription: string;
  keywords: string[];
  targetPrompt: string;
  recommendedTab: 'chat' | 'jobs' | 'resume' | 'interview' | 'business' | 'schemes' | 'courses' | 'syllabus';
  keyBenefits: string[];
  coreTools: { title: string; desc: string; icon: string; tab: string }[];
  faqs: AudienceFAQ[];
  popularSearches: string[];
}

export const TARGET_AUDIENCES_SEO: TargetAudienceSEO[] = [
  {
    id: '1',
    slug: 'students-exam-aspirants',
    title: 'Students & Competitive Exam Aspirants',
    category: 'Education & Academics',
    badge: 'CBSE, ICSE, JEE, NEET, UPSC & State Boards',
    iconName: 'GraduationCap',
    heroHeadline: 'AI Study Mentor for Class 1-12, Board Exams & National Competitions',
    shortDesc: 'Instant syllabus notes, mock quizzes, voice-guided concept explanations in 150+ languages, and step-by-step revision schedules.',
    metaDescription: 'Arohi AI for Students: CBSE/ICSE Class 1-12 study notes, JEE/NEET question solvers, UPSC, SSC, and State Board preparation in Odia, Hindi, English, and regional languages.',
    keywords: [
      'student ai study helper', 'cbse syllabus revision ai', 'jee main neet exam preparation ai',
      'upsc ssc study planner', 'chse odisha class 12 notes', 'ai homework solver voice calling',
      'competitive exam mock test ai'
    ],
    targetPrompt: 'Create a 30-day comprehensive revision timetable and daily question practice strategy for my upcoming competitive exams.',
    recommendedTab: 'syllabus',
    keyBenefits: [
      'Voice-guided interactive doubts clearing in your mother tongue',
      'Daily curated mock test series and previous year question breakdowns',
      'Formula cheat sheets, mind maps, and mnemonics generation',
      'Stress-free study schedules aligned with official board timetables'
    ],
    coreTools: [
      { title: 'Class 1-12 Syllabus Engine', desc: 'Chapter summaries, textbook solutions & revision blueprints', icon: 'BookOpen', tab: 'syllabus' },
      { title: 'Skill Certification Hub', desc: 'Free courses in Coding, AI, Data Science & Spoken English', icon: 'Award', tab: 'courses' },
      { title: 'Interactive AI Voice Tutor', desc: 'Ask doubts aloud and get instant conceptual answers', icon: 'Mic', tab: 'chat' }
    ],
    faqs: [
      {
        question: 'How can Arohi AI help students prepare for CBSE and State Board exams?',
        answer: 'Arohi AI breaks down complex curriculum topics into clear bite-sized explanations, creates customized practice worksheets, and provides voice-guided revisions in English, Hindi, Odia, and 150+ languages.'
      },
      {
        question: 'Can Arohi AI solve JEE, NEET, and UPSC questions?',
        answer: 'Yes! You can paste or speak any physics, chemistry, biology, math, or general studies question to receive step-by-step reasoning and conceptual insights.'
      },
      {
        question: 'Is Arohi AI free for students to use?',
        answer: 'Yes, core educational tools including syllabus exploration, basic doubt solving, and skill courses are freely accessible at arohiai.com.'
      }
    ],
    popularSearches: [
      'Class 10 science board exam notes',
      'UPSC prelims daily strategy by AI',
      'Best free AI study planner for students',
      'How to clear JEE physics numericals with AI'
    ]
  },
  {
    id: '2',
    slug: 'job-seekers-professionals',
    title: 'Job Seekers & Working Professionals',
    category: 'Career & Employment',
    badge: 'Freshers, Mid-Level & Executive Careers',
    iconName: 'Briefcase',
    heroHeadline: 'Fast-Track Your Next Career Breakthrough with AI Intelligence',
    shortDesc: 'Automated ATS resume grading, real-time voice mock interviews with AI recruiters, verified job vacancy tracking, and skill gap roadmaps.',
    metaDescription: 'Arohi AI for Job Seekers: Free ATS resume checker, AI voice mock interview simulator, verified Sarkari and Corporate job listings, and career transition blueprints.',
    keywords: [
      'ai resume checker ats score', 'free mock interview simulator ai', 'freshers job finder india',
      'career transition roadmap', 'it software jobs vacancy tracker', 'ai voice interview practice'
    ],
    targetPrompt: 'Review my career profile for high-paying roles, highlight top keyword gaps, and simulate a 5-question mock interview.',
    recommendedTab: 'resume',
    keyBenefits: [
      'Instant ATS resume score calculation with recruiter-approved keyword additions',
      'Live voice-based mock interviews with dynamic feedback and ratings',
      'Automated resume generation in clean editable Microsoft Word (.docx) format',
      'Direct links to verified corporate and public sector hiring opportunities'
    ],
    coreTools: [
      { title: 'ATS Resume Scorer & Docx Builder', desc: 'Analyze CV compatibility and download clean Word templates', icon: 'FileText', tab: 'resume' },
      { title: 'Voice Mock Interview Simulator', desc: 'Real-time AI voice interviewer with scoring feedback', icon: 'Video', tab: 'interview' },
      { title: 'Verified Jobs Board', desc: 'Browse live openings across IT, Banking, Core & Sarkari', icon: 'Briefcase', tab: 'jobs' }
    ],
    faqs: [
      {
        question: 'How does Arohi AI test ATS compatibility for resumes?',
        answer: 'Arohi AI parses your resume layout, font formatting, job-title matches, and critical keyword densities against enterprise Applicant Tracking Systems (ATS) to provide a 0-100 score with actionable fix recommendations.'
      },
      {
        question: 'Can I practice a voice mock interview before my actual job interview?',
        answer: 'Yes! Arohi AI provides an interactive voice interview simulator where AI Arohi speaks to you, asks behavioral and technical questions, and scores your answers in real time.'
      }
    ],
    popularSearches: [
      'Free AI resume checker 2026',
      'How to pass HR behavioral interview with AI practice',
      'Full stack developer jobs freshers India',
      'ATS score calculator free online'
    ]
  },
  {
    id: '3',
    slug: 'divyangjan-pwd',
    title: 'Divyangjan & Persons with Disabilities (PwD)',
    category: 'Accessibility & Inclusion',
    badge: 'RPwD Act 2016, 4% Reservation & UDID Guidance',
    iconName: 'HeartHandshake',
    heroHeadline: 'Dedicated Inclusion, Equal Rights & Accessible AI Opportunities',
    shortDesc: 'Hands-free multilingual voice chat, visual document readers, 4% Govt Job reservation rules, 10-year age relaxations, UDID card setup, and ADIP scheme subsidies.',
    metaDescription: 'Arohi AI for Divyangjan & PwD: Accessible voice guidance in 150+ languages, 4% Sarkari job reservation norms, UDID card support, ADIP aids schemes, and NHFDC loans.',
    keywords: [
      'divyangjan ai assistant', 'pwd sarkari job 4 percent reservation', 'udid card application help',
      'adip scheme assistive aids', 'nhfdc loan for physically disabled', 'accessible voice ai for blind'
    ],
    targetPrompt: 'Explain the 4% government job reservation, age relaxation, and scribe norms for PwD candidates under the RPwD Act 2016.',
    recommendedTab: 'chat',
    keyBenefits: [
      'Complete hands-free voice interaction for visually impaired or mobility-challenged users',
      'Comprehensive step-by-step guidance for UDID (Unique Disability ID) online registration',
      'Full breakdown of RPwD Act 2016 reservations, scribe allowances (20 min/hr), and fee exemptions',
      'Curated lists of remote work opportunities and D&I inclusive employer openings'
    ],
    coreTools: [
      { title: 'Live Voice AI Assistant', desc: '100% hands-free conversational voice engine in 150+ languages', icon: 'Mic', tab: 'chat' },
      { title: 'Government Schemes Guide', desc: 'ADIP aids, NHFDC self-employment loans & Divyang scholarships', icon: 'Shield', tab: 'schemes' },
      { title: 'Accessible Resume & Interview AI', desc: 'Screen-reader friendly resume docx downloads & voice mock prep', icon: 'FileText', tab: 'resume' }
    ],
    faqs: [
      {
        question: 'What benefits does Arohi AI offer to Divyangjan / PwD individuals?',
        answer: 'Arohi AI provides dedicated empowerment across 4 pillars: Government schemes (UDID, ADIP, NHFDC loans), Exam & 4% Sarkari reservation norms (RPwD Act 2016), Multimodal voice/visual accessibility, and ATS accessible resume builders.'
      },
      {
        question: 'How do I apply for a UDID card or ADIP assistive aids?',
        answer: 'Ask Arohi AI directly or open the Schemes portal to get direct links and checklist requirements for swavlambancard.gov.in and disabilityaffairs.gov.in.'
      }
    ],
    popularSearches: [
      'Govt job 4% reservation rules for PwD candidates',
      'How to apply for UDID card online step by step',
      'ADIP free wheelchair and hearing aid scheme details',
      'Accessible voice AI for visually impaired'
    ]
  },
  {
    id: '4',
    slug: 'msme-small-business',
    title: 'MSME & Small Business Owners',
    category: 'Business & Entrepreneurship',
    badge: 'Udyam, Mudra Loan, PMEGP & Stand-Up India',
    iconName: 'Building2',
    heroHeadline: 'Scale Your Enterprise with Instant Govt Funding & Setup AI',
    shortDesc: 'Udyam MSME registration, Mudra & PMEGP loan application guides, GST compliance roadmaps, Startup India grants, and automated pitch deck creation.',
    metaDescription: 'Arohi AI for MSME & Businesses: Apply for Mudra Loan up to ₹10 Lakhs, PMEGP 35% subsidies, Udyam registration, GST filing assistance, and business plan creation.',
    keywords: [
      'msme udyam registration guide', 'mudra loan eligibility ai', 'pmegp subsidy application steps',
      'small business funding india', 'startup pitch deck generator ai', 'gst business registration helper'
    ],
    targetPrompt: 'Guide me step-by-step through obtaining a Mudra Loan of ₹5 Lakhs and generating an Udyam MSME registration checklist for my new shop.',
    recommendedTab: 'business',
    keyBenefits: [
      'Zero-collateral Mudra Loan (Shishu, Kishor, Tarun) eligibility checklist',
      'PMEGP 15% to 35% government capital subsidy computation for manufacturing & service units',
      'Automated professional business plan and financial pitch deck generator',
      'State-specific MSME incentives across Odisha, Maharashtra, Gujarat, Tamil Nadu, and UP'
    ],
    coreTools: [
      { title: 'MSME & Business Setup Hub', desc: 'Udyam, GST, Trade License & Trademark step-by-step checklists', icon: 'Building2', tab: 'business' },
      { title: 'Subsidies & Govt Schemes Finder', desc: 'Instant eligibility lookup for Mudra, PMEGP, Stand-Up India', icon: 'Shield', tab: 'schemes' },
      { title: 'Arohi Business AI Coach', desc: 'Ask business questions, tax rules, and growth strategies 24/7', icon: 'Bot', tab: 'chat' }
    ],
    faqs: [
      {
        question: 'How do I qualify for a Mudra Loan without collateral?',
        answer: 'Under the Pradhan Mantri Mudra Yojana (PMMY), loans up to ₹10 Lakhs require zero collateral. You need a valid Udyam certificate, 6 months bank statements, KYC documents, and a simple project report.'
      },
      {
        question: 'What is the subsidy percentage under PMEGP?',
        answer: 'PMEGP offers up to 25% subsidy in urban areas and up to 35% subsidy in rural areas for special category beneficiaries (SC/ST/OBC/Women/Ex-Servicemen/PwD).'
      }
    ],
    popularSearches: [
      'How to apply for Mudra loan online without collateral',
      'PMEGP 35 percent subsidy project report generator',
      'Udyam registration free online steps 2026',
      'Best government schemes for retail shop owners'
    ]
  },
  {
    id: '5',
    slug: 'farmers-rural-entrepreneurs',
    title: 'Farmers & Agri-Entrepreneurs',
    category: 'Agriculture & Rural Economy',
    badge: 'PM-Kisan, KCC, FPO & Agri Infrastructure Fund',
    iconName: 'Tractor',
    heroHeadline: 'Smart Agriculture, Government Subsidies & Market Intelligence',
    shortDesc: 'Real-time crop disease diagnosis, PM-Kisan instalment status checks, Kisan Credit Card (KCC) low-interest loans, and FPO formation guidance in regional dialects.',
    metaDescription: 'Arohi AI for Farmers & Agriculture: PM-Kisan status, Kisan Credit Card (KCC) loans, Agri Infra Fund subsidies, Mandi price trends, and crop advisory in 150+ languages.',
    keywords: [
      'pm kisan installment check ai', 'kisan credit card kcc apply', 'agriculture loan subsidy india',
      'fpo setup guide', 'crop disease ai voice assistant', 'mandi price live updates'
    ],
    targetPrompt: 'Explain how to apply for a ₹3 Lakh Kisan Credit Card (KCC) loan with 4% interest subvention and PM-Kisan status verification.',
    recommendedTab: 'schemes',
    keyBenefits: [
      'Speak in Odia, Hindi, Telugu, Marathi, Bengali, or your native dialect to get farming advice',
      'Step-by-step guidance for PM-Kisan ₹6,000 annual direct benefit transfer',
      'Agri-Infrastructure Fund (AIF) up to ₹2 Crore loans with 3% interest subvention',
      'Organic farming certifications and cold-storage setup assistance'
    ],
    coreTools: [
      { title: 'Agri Schemes & KCC Finder', desc: 'PM-Kisan, KCC, Soil Health Card & Drone Didi schemes', icon: 'Shield', tab: 'schemes' },
      { title: 'Regional Voice Consultation', desc: 'Ask farming, fertilizer, and weather queries by speaking naturally', icon: 'Mic', tab: 'chat' }
    ],
    faqs: [
      {
        question: 'Can farmers talk to Arohi AI in their local language?',
        answer: 'Yes! Arohi AI supports natural two-way voice conversations in Odia, Hindi, Punjabi, Marathi, Telugu, Tamil, Gujarati, Bengali, and over 150 languages.'
      },
      {
        question: 'How do I claim interest subvention on Kisan Credit Card (KCC)?',
        answer: 'Prompt repayment of KCC loans reduces the effective interest rate from 7% down to 4% per annum via government interest subvention schemes.'
      }
    ],
    popularSearches: [
      'PM kisan 17th 18th installment status check',
      'How to get 3 lakh agriculture loan on KCC',
      'Agri infrastructure fund subsidy application',
      'Farming business ideas with 50 percent government subsidy'
    ]
  },
  {
    id: '6',
    slug: 'women-entrepreneurs-shg',
    title: 'Women Entrepreneurs & Self-Help Groups (SHGs)',
    category: 'Women Empowerment',
    badge: 'Stand-Up India, Subhadra Yojana & Mahila Samman',
    iconName: 'Sparkles',
    heroHeadline: 'Funding, Grants & Mentorship for Women-Led Enterprises',
    shortDesc: 'Unlock ₹10 Lakh to ₹1 Crore Stand-Up India loans, Subhadra Yojana ₹50,000 financial support, Mudra Mahila loans, and digital SHG bookkeeping.',
    metaDescription: 'Arohi AI for Women Entrepreneurs: Stand-Up India funding, Subhadra Yojana Odisha, Mahila Samman Savings, Mudra Tarun loans, and small business launch roadmaps.',
    keywords: [
      'women entrepreneur loan india', 'stand up india scheme for women', 'subhadra yojana apply online',
      'shg loan subsidy', 'mahila udyam nidhi scheme', 'women startup funding grants'
    ],
    targetPrompt: 'Give me a complete list of government grants and low-interest loans available for a woman starting a handicraft/textile business.',
    recommendedTab: 'business',
    keyBenefits: [
      'Stand-Up India bank loans from ₹10 Lakhs to ₹1 Crore with zero collateral guarantees',
      'Complete eligibility and application steps for Odisha Subhadra Yojana (₹50,000 total)',
      'SHG bank linkage and interest subvention calculation under DAY-NRLM',
      'Step-by-step branding, social media marketing, and GST setup'
    ],
    coreTools: [
      { title: 'Business Plan & Funding Setup', desc: 'Craft professional project reports tailored for bank loan approvals', icon: 'Building2', tab: 'business' },
      { title: 'Women Empowerment Schemes', desc: 'Subhadra Yojana, TREAD, Mahila Coir Yojana & Stand-Up India', icon: 'Award', tab: 'schemes' }
    ],
    faqs: [
      {
        question: 'What is the Stand-Up India loan scheme for women?',
        answer: 'Stand-Up India facilitates bank loans between ₹10 Lakhs and ₹1 Crore to at least one woman borrower per bank branch for setting up a greenfield enterprise.'
      },
      {
        question: 'Who is eligible for Subhadra Yojana in Odisha?',
        answer: 'Women residents of Odisha aged 21 to 60 years from eligible families receive ₹10,000 annually (total ₹50,000 over 5 years) directly into their Aadhaar-linked DBT bank accounts.'
      }
    ],
    popularSearches: [
      'Stand Up India loan eligibility for women founders',
      'Subhadra Yojana list and Aadhaar DBT status check',
      'Zero interest loans for women self help groups',
      'Profitable small business ideas for women at home'
    ]
  },
  {
    id: '7',
    slug: 'software-engineers-developers',
    title: 'Software Engineers & Tech Developers',
    category: 'Technology & IT',
    badge: 'Full-Stack, Python, React, AI, Cloud & System Design',
    iconName: 'Code',
    heroHeadline: 'Master System Design, High-Performance Code & AI Architectures',
    shortDesc: 'Live code reviews, algorithmic debuggers, full-stack transition roadmaps (React, Node, Cloud Run, WebSockets), and high-paying tech interview prep.',
    metaDescription: 'Arohi AI for Software Developers: Full-stack roadmaps, system design blueprints, code optimization, live mock tech interviews, and tech job vacancy tracker.',
    keywords: [
      'full stack developer roadmap', 'system design interview prep ai', 'react vite nodejs tutorial',
      'ai code review tool', 'data structures algorithms mock test', 'remote software engineer jobs'
    ],
    targetPrompt: 'Design a scalable, low-latency microservices architecture for a real-time multimodal audio streaming application using WebSockets and Node.js.',
    recommendedTab: 'courses',
    keyBenefits: [
      'Instant debugging and performance benchmarking for JavaScript, TypeScript, Python, and C++',
      'Interactive system design mock interviews with Senior Staff Architect persona',
      'Comprehensive tech stack transition roadmaps with free certified courses',
      'ATS resume optimization highlighting tech keywords and GitHub project impacts'
    ],
    coreTools: [
      { title: 'Tech Certification Courses', desc: 'Structured learning paths for Python, React, Node.js & AI APIs', icon: 'Code', tab: 'courses' },
      { title: 'Technical Voice Mock Interview', desc: 'Practice live DSA, System Design & Behavioral rounds with AI', icon: 'Video', tab: 'interview' },
      { title: 'Tech Jobs Aggregator', desc: 'Browse verified high-growth IT, startup, and remote tech roles', icon: 'Briefcase', tab: 'jobs' }
    ],
    faqs: [
      {
        question: 'How does Arohi AI help engineers prepare for System Design interviews?',
        answer: 'Arohi AI provides structured breakdowns of Distributed Caching, Load Balancing, Database Sharding, Event Streams (Kafka), and CAP Theorem tradeoffs with live back-and-forth interactive questioning.'
      }
    ],
    popularSearches: [
      'Full stack transition roadmap 2026',
      'System design interview questions FAANG',
      'How to optimize React 18 application performance',
      'Python AI developer jobs India'
    ]
  },
  {
    id: '8',
    slug: 'content-creators-influencers',
    title: 'Content Creators, YouTubers & Podcasters',
    category: 'Media & Creative Economy',
    badge: 'Video Scripts, Multilingual Voiceover & Viral Hooks',
    iconName: 'Video',
    heroHeadline: 'Script Viral Content & Expand into 150+ Languages Instantly',
    shortDesc: 'Automated YouTube video scripts, SEO title & description generators, viral hook builders, and natural voiceover reading in regional dialects.',
    metaDescription: 'Arohi AI for Content Creators: YouTube video script generator, viral short hooks, SEO tag finder, multilingual voiceover assistance, and channel monetization tips.',
    keywords: [
      'youtube script generator ai', 'viral tiktok reels hook builder', 'video seo description generator',
      'multilingual voiceover ai', 'content creator monetization guide', 'podcast episode outline ai'
    ],
    targetPrompt: 'Write a high-retention 5-minute YouTube video script with 3 viral hook variations about the future of Artificial Intelligence in India.',
    recommendedTab: 'chat',
    keyBenefits: [
      'Generate high-CTR YouTube video titles, thumbnail text concepts, and SEO tags',
      'Read scripts aloud in natural female (Zypher) voice with native pronunciation',
      'Repurpose long articles into engaging 60-second Shorts/Reels scripts',
      'Translate and localize video scripts across Odia, Hindi, Tamil, Spanish, and French'
    ],
    coreTools: [
      { title: 'Conversational Voice Studio', desc: 'Test and recite scripts with real-time audio playback in 150+ languages', icon: 'Mic', tab: 'chat' },
      { title: 'Digital Marketing & Creator Hub', desc: 'Master audience engagement, brand sponsorships, and SEO algorithms', icon: 'Award', tab: 'courses' }
    ],
    faqs: [
      {
        question: 'Can Arohi AI read my video script out loud in Indian regional languages?',
        answer: 'Yes! Arohi AI features a dedicated Read-Aloud audio engine capable of reciting text word-for-word in Odia, Hindi, Bengali, Tamil, Telugu, English, and over 150 global languages.'
      }
    ],
    popularSearches: [
      'Best AI tool for YouTube video script writing',
      'How to write viral hooks for Instagram reels',
      'Multilingual AI voice generator for creators',
      'YouTube channel monetization checklist'
    ]
  },
  {
    id: '9',
    slug: 'digital-marketers-seo-experts',
    title: 'Digital Marketers & SEO Specialists',
    category: 'Marketing & Growth',
    badge: 'Programmatic SEO, High-Converting Copy & Ad Strategies',
    iconName: 'Search',
    heroHeadline: 'Rank #1 on Google & Supercharge Your Paid Ad Conversion Rates',
    shortDesc: 'Automated Schema.org structured data, high-intent keyword clustering, meta tag builders, programmatic landing page roadmaps, and email copywriting.',
    metaDescription: 'Arohi AI for SEO & Marketers: Programmatic SEO roadmaps, Schema.org generators, high-ranking Google meta tags, Ad copywriting, and search intent analysis.',
    keywords: [
      'programmatic seo ai', 'schema markup json ld generator', 'high intent keyword clustering',
      'google search console ranking tips', 'facebook google ad copy ai', 'on page seo audit tool'
    ],
    targetPrompt: 'Generate a 10-cluster programmatic SEO keyword map and JSON-LD FAQPage Schema for an educational ed-tech platform in India.',
    recommendedTab: 'chat',
    keyBenefits: [
      'Generate valid JSON-LD schemas for FAQPage, SoftwareApplication, Organization, and HowTo',
      'High-CTR Google Search titles and meta descriptions optimized for character limits',
      'Compelling ad copywriting frameworks (AIDA, PAS) for Google Ads and Meta Ads',
      'Complete multilingual SEO strategy for 150+ languages and sub-directories'
    ],
    coreTools: [
      { title: 'Global SEO Directory', desc: 'Explore state, country, and regional multilingual search mappings', icon: 'Globe', tab: 'home' },
      { title: 'Digital Marketing Mastery', desc: 'Free certification paths in SEO, Google Ads, and Performance Marketing', icon: 'Award', tab: 'courses' }
    ],
    faqs: [
      {
        question: 'How does Arohi AI help websites rank higher on Google?',
        answer: 'Arohi AI creates comprehensive topic clusters, generates error-free Schema.org JSON-LD tags, ensures fast load times, and structures content to match search intent for Featured Snippets (Position 0).'
      }
    ],
    popularSearches: [
      'Free JSON LD schema generator for SEO',
      'How to rank for competitive keywords on Google',
      'Programmatic SEO strategy guide',
      'High converting Facebook ad copy examples'
    ]
  },
  {
    id: '10',
    slug: 'teachers-professors-educators',
    title: 'Teachers, Professors & Tutors',
    category: 'Teaching & Pedagogy',
    badge: 'Lesson Plans, Quiz Generators & NEP 2020 Framework',
    iconName: 'BookOpen',
    heroHeadline: 'Empowering Educators with AI Curriculum & Automated Grading',
    shortDesc: 'Instant 45-minute lesson plan creation, multiple-choice question (MCQ) generators, rubric builders, and multilingual teaching aids aligned with NEP 2020.',
    metaDescription: 'Arohi AI for Teachers: Create instant lesson plans, quiz question banks, grading rubrics, classroom activity ideas, and multilingual explanations for students.',
    keywords: [
      'ai lesson plan generator for teachers', 'mcq quiz generator from text', 'nep 2020 lesson plan format',
      'classroom activity ideas ai', 'grading rubric creator', 'multilingual teaching assistant'
    ],
    targetPrompt: 'Create a 45-minute interactive lesson plan with 5 discussion questions and a 5-question MCQ quiz for Class 9 CBSE Physics (Gravitation).',
    recommendedTab: 'syllabus',
    keyBenefits: [
      'Draft standards-aligned lesson plans in seconds with interactive learning outcomes',
      'Generate diverse difficulty MCQ quizzes, fill-in-the-blanks, and short answer rubrics',
      'Simplify complex academic papers into student-friendly analogies',
      'Translate learning material seamlessly into Odia, Hindi, Bengali, Tamil, and English'
    ],
    coreTools: [
      { title: 'K-12 Syllabus Engine', desc: 'Access CBSE and State Board curriculum chapters and learning goals', icon: 'BookOpen', tab: 'syllabus' },
      { title: 'Interactive AI Voice Teaching Aid', desc: 'Pronounce and recite educational texts in 150+ native accents', icon: 'Mic', tab: 'chat' }
    ],
    faqs: [
      {
        question: 'Can teachers use Arohi AI to create question papers?',
        answer: 'Yes! Simply specify the subject, grade level, topic, and number of questions to get ready-to-print MCQs with complete answer keys and explanations.'
      }
    ],
    popularSearches: [
      'AI lesson plan creator for CBSE teachers',
      'How to generate math quizzes with AI',
      'NEP 2020 activity based learning templates',
      'Free teacher tools for classroom presentation'
    ]
  },
  {
    id: '11',
    slug: 'freelancers-remote-workers',
    title: 'Freelancers & Remote Gig Workers',
    category: 'Freelancing & Gig Economy',
    badge: 'Upwork, Fiverr, Global Invoicing & Client Proposals',
    iconName: 'Laptop',
    heroHeadline: 'Win High-Ticket Global Clients & Streamline Invoicing',
    shortDesc: 'High-converting Upwork/Fiverr client proposals, cold email templates, freelance contract drafting, international currency conversion, and portfolio audits.',
    metaDescription: 'Arohi AI for Freelancers: Upwork proposal writer, cold outreach generator, freelance pricing calculator, contract drafting, and remote work career coaching.',
    keywords: [
      'upwork proposal generator ai', 'freelance rate calculator', 'cold outreach email templates',
      'client proposal writing ai', 'remote work jobs international', 'freelance contract template'
    ],
    targetPrompt: 'Write a persuasive Upwork proposal for a $2,500 Full Stack Web Development project addressing the client pain points directly.',
    recommendedTab: 'resume',
    keyBenefits: [
      'Craft tailored, winning freelance bids that address client requirements within 30 seconds',
      'Calculate hourly vs. fixed milestone pricing based on project scope and market benchmarks',
      'Draft standardized freelance scopes of work, confidentiality agreements, and payment milestones',
      'Multi-currency toggle (INR / USD) for instant international rate budgeting'
    ],
    coreTools: [
      { title: 'Freelance Profile & Resume AI', desc: 'Optimize your portfolio bio and freelance resume for international recruiters', icon: 'FileText', tab: 'resume' },
      { title: 'Verified Remote Jobs Board', desc: 'Explore work-from-anywhere openings across global software, marketing, and design', icon: 'Briefcase', tab: 'jobs' }
    ],
    faqs: [
      {
        question: 'How do I write a winning Upwork proposal with Arohi AI?',
        answer: 'Paste the client’s job description into Arohi AI. The system analyzes the specific deliverables, drafts an engaging opening hook, demonstrates relevant technical experience, and includes a clear call to action.'
      }
    ],
    popularSearches: [
      'High converting Upwork proposal template',
      'How to get first freelance client on LinkedIn',
      'Freelance pricing calculator USD to INR',
      'Remote tech jobs for Indian developers'
    ]
  },
  {
    id: '12',
    slug: 'healthcare-wellness-seekers',
    title: 'Healthcare & Wellness Seekers',
    category: 'Health & Lifestyle',
    badge: 'Ayushman Bharat, ABHA Card & Wellness Guidance',
    iconName: 'Stethoscope',
    heroHeadline: 'Understand Medical Terms, Nutrition & Public Healthcare Schemes',
    shortDesc: 'Ayushman Bharat (PM-JAY) ₹5 Lakh health cover eligibility, ABHA health card creation, simplified medical report summaries, and daily wellness habits.',
    metaDescription: 'Arohi AI for Healthcare: Ayushman Bharat PM-JAY eligibility, ABHA card registration steps, nutrition planning, and simplified medical terminology guides.',
    keywords: [
      'ayushman bharat pm jay card apply', 'abha health id card steps', 'medical term simplifier ai',
      'healthy diet nutrition plan ai', 'health insurance subsidy india', 'biju swasthya kalyan yojana bsky'
    ],
    targetPrompt: 'Explain how to check Ayushman Bharat PM-JAY eligibility for ₹5 Lakh cashless treatment and how to generate an ABHA Health ID.',
    recommendedTab: 'schemes',
    keyBenefits: [
      'Step-by-step checklist to apply for Ayushman Bharat PM-JAY ₹5 Lakh cashless hospital cover',
      'Generate 14-digit ABHA (Ayushman Bharat Health Account) card online',
      'State health scheme information including Odisha BSKY / Gopabandhu Jan Arogya Yojana',
      'Clear, accessible explanations of complex lab test reports and medical acronyms'
    ],
    coreTools: [
      { title: 'Healthcare Schemes Portal', desc: 'Instant eligibility finder for PM-JAY, ABHA, and State Health Cards', icon: 'Shield', tab: 'schemes' },
      { title: 'Voice Wellness Consultation', desc: 'Ask nutrition and lifestyle questions in your mother tongue', icon: 'Mic', tab: 'chat' }
    ],
    faqs: [
      {
        question: 'How do I check if my family is eligible for Ayushman Bharat (PM-JAY)?',
        answer: 'You can verify your name on the SECC 2011 database or NFSA ration card list. Eligible families receive up to ₹5 Lakhs per year in cashless hospitalization across empaneled hospitals.'
      }
    ],
    popularSearches: [
      'Ayushman Bharat hospital list near me',
      'How to create ABHA health ID card online',
      'Free cashless health treatment government scheme',
      'Daily balanced diet chart for working professionals'
    ]
  },
  {
    id: '13',
    slug: 'legal-compliance-advisors',
    title: 'Legal Aspirants, Advocates & Citizens',
    category: 'Law & Governance',
    badge: 'Indian Constitution, RTI, Consumer Rights & Legal Drafts',
    iconName: 'Scale',
    heroHeadline: 'Demystifying Indian Law, Legal Drafting & Citizen Rights',
    shortDesc: 'Right to Information (RTI) application drafting, Consumer Court complaint templates, fundamental rights, CLAT exam preparation, and statutory compliance.',
    metaDescription: 'Arohi AI for Legal & Law: RTI application generator, Consumer Protection Act guides, CLAT exam study notes, Indian Penal Code / BNS overview, and legal drafts.',
    keywords: [
      'rti online application format draft', 'consumer complaint format india', 'clat exam prep notes ai',
      'bns bharatiya nyaya sanhita guide', 'fundamental rights citizen guide', 'affidavit rent agreement draft'
    ],
    targetPrompt: 'Draft a standard Right to Information (RTI) application requesting public road repair expenditure details from the municipal corporation.',
    recommendedTab: 'chat',
    keyBenefits: [
      'Automated RTI application drafting formatted for Central and State Public Information Officers',
      'Consumer Court complaint templates with step-by-step e-Daakhil filing instructions',
      'Summarized overviews of the new criminal laws (Bharatiya Nyaya Sanhita, BNSS, BSA)',
      'CLAT and Judicial Services exam preparation question banks and landmark judgments'
    ],
    coreTools: [
      { title: 'Legal & Citizen AI Assistant', desc: 'Ask questions about Indian law, consumer rights, and statutory procedures', icon: 'Scale', tab: 'chat' },
      { title: 'Sarkari Schemes & Citizen Rights', desc: 'Legal aid schemes and public governance grievance portals', icon: 'Shield', tab: 'schemes' }
    ],
    faqs: [
      {
        question: 'Can Arohi AI help me write an RTI application?',
        answer: 'Yes! Arohi AI provides structured RTI drafts specifying the exact department, targeted questions, application fee requirements, and timeline mandates under the RTI Act 2005.'
      }
    ],
    popularSearches: [
      'How to file RTI online step by step format',
      'Consumer court complaint letter template',
      'Bharatiya Nyaya Sanhita section lookup',
      'Free legal aid clinic eligibility India'
    ]
  },
  {
    id: '14',
    slug: 'finance-traders-investors',
    title: 'Traders, Investors & Financial Planners',
    category: 'Finance & Wealth',
    badge: 'Stock Markets, Mutual Funds, Tax Planning & SIP',
    iconName: 'TrendingUp',
    heroHeadline: 'Master Financial Literacy, Mutual Funds & Smart Tax Savings',
    shortDesc: 'SIP compound interest calculators, Old vs. New Tax Regime comparisons, Section 80C/80D tax deductions, mutual fund categories, and risk management.',
    metaDescription: 'Arohi AI for Finance & Investing: SIP compound calculator, New vs Old Tax regime comparison, Section 80C deduction tips, mutual fund investing, and market insights.',
    keywords: [
      'sip mutual fund calculator ai', 'new vs old tax regime calculator 2026', 'income tax saving tips 80c',
      'stock market basics for beginners', 'financial planning investment roadmap', 'nps national pension scheme'
    ],
    targetPrompt: 'Compare the Old vs New Tax Regime for a salary of ₹12 Lakhs and calculate the compound maturity value of a ₹10,000 monthly SIP for 15 years at 12%.',
    recommendedTab: 'chat',
    keyBenefits: [
      'Clear, unbiased comparison between Old and New Income Tax Regimes for all salary slabs',
      'SIP maturity projections, asset allocation models, and emergency fund sizing',
      'Tax saving strategies across ELSS, PPF, NPS, and Health Insurance deductions',
      'Educational risk management concepts for equities, bonds, and government securities'
    ],
    coreTools: [
      { title: 'Financial Intelligence AI', desc: 'Calculate investment yields, tax impacts, and business balance sheets', icon: 'TrendingUp', tab: 'chat' },
      { title: 'Govt Financial Schemes', desc: 'PPF, Sukanya Samriddhi, Atal Pension Yojana & Senior Citizen Savings', icon: 'Shield', tab: 'schemes' }
    ],
    faqs: [
      {
        question: 'Which tax regime is better for salaried employees: Old or New?',
        answer: 'The New Tax Regime offers lower slab rates and a higher basic rebate (up to ₹7 Lakhs+), making it ideal for individuals with fewer deductions. If you have substantial deductions (HRA, Home Loan Interest, 80C), the Old Regime may save more tax.'
      }
    ],
    popularSearches: [
      'New vs Old tax regime salary comparison calculator',
      'Best SIP mutual funds for long term wealth creation',
      'How to save tax on 15 lakh salary in India',
      'Stock market technical analysis basics'
    ]
  },
  {
    id: '15',
    slug: 'real-estate-property-buyers',
    title: 'Homebuyers & Real Estate Inquirers',
    category: 'Real Estate & Housing',
    badge: 'PMAY Housing Subsidy, RERA & Property Registration',
    iconName: 'Home',
    heroHeadline: 'Buy Homes Safely with RERA Checks & PMAY Housing Subsidies',
    shortDesc: 'Pradhan Mantri Awas Yojana (PMAY 2.0) ₹2.67 Lakh interest subsidy, RERA project compliance verification, home loan EMI calculators, and property registry steps.',
    metaDescription: 'Arohi AI for Real Estate: PMAY Urban & Gramin subsidy eligibility, RERA project verification checklist, home loan EMI calculations, and land record registry guide.',
    keywords: [
      'pmay 2.0 subsidy eligibility apply', 'rera registered project check steps', 'home loan emi calculator ai',
      'property registration checklist india', 'bhulekh land record search', 'stamp duty calculator by state'
    ],
    targetPrompt: 'Explain the eligibility criteria for the PMAY Urban 2.0 interest subsidy and provide a checklist for verifying a builder project on RERA.',
    recommendedTab: 'schemes',
    keyBenefits: [
      'Pradhan Mantri Awas Yojana (PMAY Urban & Gramin) credit-linked subsidy eligibility lookup',
      'Comprehensive RERA due-diligence checklist to prevent builder fraud and delays',
      'State-specific land record portal links (Bhulekh, Meebhoomi, Dharani, Banglarbhumi)',
      'Home loan EMI, amortization schedules, and stamp duty cost estimates'
    ],
    coreTools: [
      { title: 'Housing & PMAY Schemes Hub', desc: 'Check PMAY 2.0, affordable housing grants, and state land records', icon: 'Shield', tab: 'schemes' }
    ],
    faqs: [
      {
        question: 'Who is eligible for the PMAY 2.0 Home Loan Subsidy?',
        answer: 'Families belonging to EWS (Economically Weaker Section) and LIG (Low Income Group) purchasing or constructing their first pucca home can qualify for interest subsidies up to ₹2.67 Lakhs.'
      }
    ],
    popularSearches: [
      'PMAY 2.0 application form online 2026',
      'How to verify builder RERA registration certificate',
      'Bhulekh online land record mutation process',
      'Home loan lowest interest rate comparison'
    ]
  },
  {
    id: '16',
    slug: 'senior-citizens-retirees',
    title: 'Senior Citizens & Pensioners',
    category: 'Elderly Care & Social Security',
    badge: 'Atal Pension Yojana, SCSS, Life Certificate & Voice AI',
    iconName: 'UserCheck',
    heroHeadline: 'Effortless Voice Assistance, High-Yield Savings & Pension Access',
    shortDesc: 'Digital Life Certificate (Jeevan Pramaan) face auth, Senior Citizens Savings Scheme (SCSS 8.2% return), Atal Pension Yojana, and voice-assisted navigation.',
    metaDescription: 'Arohi AI for Senior Citizens: Digital Life Certificate submission, SCSS 8.2% interest scheme, Atal Pension Yojana (APY), and easy voice AI in 150+ languages.',
    keywords: [
      'jeevan pramaan digital life certificate online', 'scss senior citizen saving scheme interest',
      'atal pension yojana chart benefits', 'voice ai for elderly parents', 'pension status check portal'
    ],
    targetPrompt: 'Explain how a senior citizen can submit a Jeevan Pramaan digital life certificate from home and details of the Senior Citizen Savings Scheme (SCSS).',
    recommendedTab: 'schemes',
    keyBenefits: [
      '100% natural conversational voice support — no complicated typing needed',
      'Step-by-step guidance for submitting Jeevan Pramaan life certificates via smartphone face authentication',
      'SCSS (8.2% interest) and PM Vaya Vandana Yojana high-interest pension alternatives',
      'Senior citizen tax benefits: Higher basic exemption limit and Section 80TTB interest deductions'
    ],
    coreTools: [
      { title: 'Elderly Social Security & Schemes', desc: 'Jeevan Pramaan, SCSS, APY & Indira Gandhi National Pension', icon: 'Shield', tab: 'schemes' },
      { title: 'Loving Voice Companion', desc: 'Warm, respectful conversation and question answering in 150+ languages', icon: 'Mic', tab: 'chat' }
    ],
    faqs: [
      {
        question: 'Can senior citizens submit their pension Life Certificate from home?',
        answer: 'Yes! Using the Jeevan Pramaan mobile app with Aadhaar Face Authentication, pensioners can submit their annual digital life certificate from anywhere without visiting a bank.'
      }
    ],
    popularSearches: [
      'How to do Jeevan Pramaan face authentication on phone',
      'Senior citizen savings scheme 8.2 percent interest rules',
      'Atal pension yojana monthly pension table',
      'Best voice AI assistant for old age parents'
    ]
  },
  {
    id: '17',
    slug: 'multilingual-vernacular-speakers',
    title: 'Regional & Vernacular Language Speakers',
    category: 'Language & Accessibility',
    badge: '150+ Languages: Odia, Hindi, Bengali, Tamil, Telugu & Marathi',
    iconName: 'Globe',
    heroHeadline: 'Speak Naturally in Your Mother Tongue with Zero Language Barriers',
    shortDesc: 'Native dialect voice calling and text processing across Odia, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Punjabi, Kannada, Malayalam, and 140+ global tongues.',
    metaDescription: 'Arohi AI Multilingual Hub: Converse in 150+ regional languages including Odia, Hindi, Bengali, Tamil, Telugu, Marathi, Kannada, Malayalam, Spanish, French, and Russian.',
    keywords: [
      'odia ai voice assistant', 'hindi speech ai chatbot', 'tamil telugu regional ai',
      'bengali marathi language ai tool', '150 languages live voice call', 'multilingual vernacular ai india'
    ],
    targetPrompt: 'Namaste Arohi! Please explain the Subhadra Yojana in simple Odia / Hindi language so everyone in my village can understand.',
    recommendedTab: 'chat',
    keyBenefits: [
      'Native script understanding (ଓଡ଼ିଆ, हिन्दी, বাংলা, தமிழ், తెలుగు, मराठी, ਪੰਜਾਬੀ, ગુજરાતી)',
      'Sub-millisecond latency voice generation with expressive natural tone',
      'Translate official government gazettes and complex English notices into simple regional dialects',
      'Access all career, job, MSME, and educational tools in your preferred language'
    ],
    coreTools: [
      { title: 'Multilingual Voice AI Hub', desc: 'Real-time two-way voice calling with sweet Zypher voice persona', icon: 'Mic', tab: 'chat' },
      { title: 'Global Region & Language Selector', desc: 'Seamlessly switch across 150+ languages, 28 Indian States & 60+ countries', icon: 'Globe', tab: 'home' }
    ],
    faqs: [
      {
        question: 'Which Indian regional languages are supported by Arohi AI?',
        answer: 'Arohi AI natively supports Odia, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Urdu, Kannada, Malayalam, Punjabi, Assamese, and over 140 global languages.'
      }
    ],
    popularSearches: [
      'Odia AI voice chat app free',
      'Hindi AI assistant for mobile phone',
      'Speak in Bengali or Tamil with AI',
      'Best multilingual AI for rural India'
    ]
  },
  {
    id: '18',
    slug: 'startup-founders-innovators',
    title: 'Startup Founders & Innovators',
    category: 'Startups & Venture',
    badge: 'Startup India, DPIIT Recognition, Seed Fund & Pitch Decks',
    iconName: 'Rocket',
    heroHeadline: 'Build, Fund & Scale High-Growth Venture-Backed Startups',
    shortDesc: 'Startup India DPIIT 3-year tax exemption (Section 80-IAC), Startup India Seed Fund Scheme (SISFS up to ₹50 Lakhs), investor pitch decks, and cap table models.',
    metaDescription: 'Arohi AI for Startups: DPIIT certificate registration, Startup India Seed Fund (SISFS) grants, investor pitch deck generator, and venture capital outreach blueprints.',
    keywords: [
      'startup india seed fund scheme sisfs', 'dpiit recognition benefits 80iac', 'investor pitch deck ai generator',
      'startup funding stages angel vc', 'startup odisha grant apply', 'startup business plan template'
    ],
    targetPrompt: 'Create a compelling 10-slide investor pitch deck structure and outline the step-by-step application process for the Startup India Seed Fund Scheme (SISFS).',
    recommendedTab: 'business',
    keyBenefits: [
      'Complete guide to obtaining DPIIT Startup Recognition and Section 80-IAC 3-year income tax exemption',
      'Startup India Seed Fund Scheme (SISFS): Up to ₹20 Lakhs grant for proof of concept and ₹50 Lakhs for commercialization',
      'State startup grant guides (Startup Odisha ₹20,000/month sustenance allowance, Startup Karnataka, T-Hub)',
      'Automated financial modeling, TAM/SAM/SOM market sizing, and competitive matrix generation'
    ],
    coreTools: [
      { title: 'Startup Pitch & Funding Engine', desc: 'Generate pitch decks, financial plans, and government grant applications', icon: 'Rocket', tab: 'business' },
      { title: 'Arohi Strategic Startup Mentor', desc: 'Brainstorm GTM strategies, pricing models, and investor FAQs with AI', icon: 'Bot', tab: 'chat' }
    ],
    faqs: [
      {
        question: 'What are the benefits of DPIIT Startup Recognition?',
        answer: 'DPIIT recognized startups enjoy 80% rebate on patent filings, 3-year tax exemptions under Section 80-IAC, exemption from Angel Tax (Section 56(2)(viib)), and easier public procurement norms.'
      }
    ],
    popularSearches: [
      'How to apply for Startup India Seed Fund Scheme online',
      'DPIIT recognition certificate benefits and documents',
      'Startup Odisha sustenance allowance application',
      'Winning pitch deck slides for seed round'
    ]
  },
  {
    id: '19',
    slug: 'ecommerce-retail-sellers',
    title: 'E-commerce & Retail Sellers',
    category: 'Retail & Commerce',
    badge: 'Amazon, Flipkart, ONDC, Meesho & Product Listings',
    iconName: 'ShoppingBag',
    heroHeadline: 'Maximize Marketplace Sales on Amazon, Flipkart & ONDC',
    shortDesc: 'High-converting Amazon & Flipkart product title and bullet point generator, ONDC seller onboarding steps, GST invoicing for e-commerce, and inventory tips.',
    metaDescription: 'Arohi AI for E-commerce Sellers: Amazon SEO product listings, Flipkart bullet points, ONDC seller registration, Meesho pricing, and e-commerce growth strategies.',
    keywords: [
      'amazon product listing ai generator', 'flipkart seo bullet points copy', 'ondc seller registration guide',
      'meesho product description writer', 'ecommerce gst registration steps', 'product photoshoot prompt ai'
    ],
    targetPrompt: 'Write high-CTR, SEO-optimized Amazon product listing bullet points and search backend keywords for an organic herbal tea product.',
    recommendedTab: 'business',
    keyBenefits: [
      'Generate keyword-dense product titles and 5 benefit-driven bullet points matching Amazon A9 algorithms',
      'Step-by-step onboarding guide for ONDC (Open Network for Digital Commerce) zero-commission selling',
      'Calculate net marketplace margins after referral fees, closing fees, and logistics deductions',
      'Customer review sentiment analysis and polite automated review response generator'
    ],
    coreTools: [
      { title: 'Business & Marketplace Setup', desc: 'GST, Trade License, Trademark, and ONDC onboarding assistance', icon: 'Building2', tab: 'business' }
    ],
    faqs: [
      {
        question: 'How do I register as a seller on ONDC?',
        answer: 'Sellers can onboard onto ONDC by registering through any network seller application (such as Mystore, SellerApp, Magicpin, or GrowthFalcons) using their GSTIN and bank details.'
      }
    ],
    popularSearches: [
      'How to sell on ONDC network step by step',
      'Amazon SEO product listing optimization tips',
      'Flipkart seller registration documents required',
      'High converting product descriptions for Meesho'
    ]
  },
  {
    id: '20',
    slug: 'sarkari-govt-job-aspirants',
    title: 'Sarkari & Public Sector Exam Aspirants',
    category: 'Government Jobs',
    badge: 'UPSC, SSC CGL, Railway RRB, OPSC, Bank PO & Police',
    iconName: 'ShieldCheck',
    heroHeadline: 'Crack UPSC, SSC, Railways & State PSC Exams with AI Strategy',
    shortDesc: 'Instant Sarkari Result & Admit Card trackers, OPSC/OSSC Odisha notifications, 4% PwD reservation rules, previous year question trends, and voice revision.',
    metaDescription: 'Arohi AI for Sarkari Aspirants: Live Govt Job notifications, UPSC, SSC CGL, Railway RRB, OPSC, Bank PO syllabus notes, admit cards, and mock test papers.',
    keywords: [
      'sarkari result live updates ai', 'upsc prelims syllabus notes', 'ssc cgl preparation strategy 2026',
      'railway rrb alp vacancy notification', 'opsc osssc exam syllabus odisha', 'bank po clerk mock interview'
    ],
    targetPrompt: 'Break down the complete syllabus, marking scheme, and recommended books for SSC CGL 2026 Tier 1 and Tier 2 exams.',
    recommendedTab: 'jobs',
    keyBenefits: [
      'Live synchronized notifications for active Central & State government vacancies',
      'Detailed syllabus breakdowns, cut-off analysis, and exam pattern blueprints',
      'State-specific competitive portals for Odisha (OPSC/OSSSC), Maharashtra (MPSC), UP (UPPSC), and Bihar (BPSC)',
      'Government exam interview simulator with mock panels scoring your personality and current affairs'
    ],
    coreTools: [
      { title: 'Live Sarkari & Public Job Board', desc: 'Real-time sync of official gazettes, employment news & admit cards', icon: 'Briefcase', tab: 'jobs' },
      { title: 'Sarkari Mock Interview Panel', desc: 'Simulate UPSC, Bank PO & OPSC viva voice rounds with AI feedback', icon: 'Video', tab: 'interview' }
    ],
    faqs: [
      {
        question: 'How does Arohi AI keep track of the latest Sarkari jobs?',
        answer: 'Arohi AI aggregates verified notifications from official government portals (UPSC, SSC, Railway Recruitment Boards, State Public Service Commissions, and National Career Service) in real time.'
      }
    ],
    popularSearches: [
      'Sarkari naukri vacancy 2026 official notification',
      'UPSC CSE daily current affairs summary',
      'SSC CGL syllabus and previous year questions PDF',
      'Odisha OPSC civil services notification updates'
    ]
  },
  {
    id: '21',
    slug: 'corporate-hr-recruiters',
    title: 'Corporate HR Managers & Recruiters',
    category: 'Human Resources & Talent',
    badge: 'ATS Screening, Interview Rubrics & Talent Sourcing',
    iconName: 'Users',
    heroHeadline: 'Screen Candidates 10x Faster with AI Resume & Interview Analytics',
    shortDesc: 'Automated job description generation, ATS candidate screening benchmarks, customized technical interview rubrics, and D&I hiring compliance.',
    metaDescription: 'Arohi AI for HR & Recruiters: Automated Job Description generator, ATS screening criteria, technical interview scoring rubrics, and diversity hiring compliance.',
    keywords: [
      'ai candidate screening tool hr', 'job description generator ai', 'interview scorecard rubric hr',
      'talent acquisition benchmarks', 'diversity and inclusion hiring guidelines', 'ats resume parser recruiters'
    ],
    targetPrompt: 'Generate a comprehensive Job Description and 5-point competency scoring rubric for a Lead Full Stack Cloud Architect role.',
    recommendedTab: 'jobs',
    keyBenefits: [
      'Draft standardized, bias-free Job Descriptions targeting top-tier global talent',
      'Generate objective candidate evaluation scorecards across Technical, Problem Solving, and Culture Fit',
      'Test your company job postings against ATS parsing engines to ensure high candidate reach',
      'Comprehensive compliance guidelines for PwD, gender equality, and equal opportunity workplace norms'
    ],
    coreTools: [
      { title: 'ATS Scoring & Resume Audit', desc: 'Audit resume benchmarks and candidate compatibility profiles', icon: 'FileText', tab: 'resume' },
      { title: 'Recruiter Voice Interview Framework', desc: 'Generate standardized interview question tracks with rating rubrics', icon: 'Video', tab: 'interview' }
    ],
    faqs: [
      {
        question: 'How can HR teams use Arohi AI to streamline hiring?',
        answer: 'HR teams can rapidly generate job descriptions, establish ATS keyword benchmarks, conduct structured mock assessments, and source verified talent across regional and national hubs.'
      }
    ],
    popularSearches: [
      'AI tool to write job descriptions fast',
      'How to evaluate software engineer candidate in interview',
      'ATS score benchmark for tech resumes',
      'Diversity and inclusion hiring policy template'
    ]
  },
  {
    id: '22',
    slug: 'creative-artists-writers',
    title: 'Creative Artists, Writers & Designers',
    category: 'Arts & Creative Culture',
    badge: 'Storytelling, Screenplays, Poetry & Visual Art Prompts',
    iconName: 'Palette',
    heroHeadline: 'Ignite Your Creative Spark with AI Storytelling & Design Prompts',
    shortDesc: 'Screenplay formatting, character development, poetry in regional meters, high-converting image generation prompts, and copyright registration advice.',
    metaDescription: 'Arohi AI for Artists & Writers: Creative writing coach, story outline generator, regional poetry, screenwriting formats, and AI image generation prompts.',
    keywords: [
      'creative writing ai assistant', 'screenplay story outline generator', 'odia hindi poetry writer',
      'midjourney stable diffusion prompt helper', 'character development worksheet ai', 'copyright art registration india'
    ],
    targetPrompt: 'Create a compelling 3-act story outline with deep character flaws and emotional arcs set in a heritage Indian coastal town.',
    recommendedTab: 'chat',
    keyBenefits: [
      'Break through writer’s block with dynamic plot twists, dialogue polishing, and world-building',
      'Compose lyrical poetry and verses in Hindi (Chhand/Kavita), Odia (Kabita), and classical styles',
      'Generate photorealistic image creation prompts for cinematic digital art concepts',
      'Copyright registration guidance under the Indian Copyright Act 1957 for literary and artistic works'
    ],
    coreTools: [
      { title: 'Arohi Creative Studio', desc: 'Brainstorm plots, dialogue, character arcs, and poetry in 150+ languages', icon: 'Sparkles', tab: 'chat' },
      { title: 'Graphic & Digital Art Courses', desc: 'Free roadmaps for UI/UX design, digital illustration, and creative storytelling', icon: 'Award', tab: 'courses' }
    ],
    faqs: [
      {
        question: 'Can Arohi AI help me write screenplays and novels?',
        answer: 'Yes! Arohi AI helps develop intricate character arcs, scene-by-scene beat sheets, natural dialogue, and standard screenplay formatting.'
      }
    ],
    popularSearches: [
      'AI story outline generator for novel writers',
      'How to write classical Odia and Hindi poetry with AI',
      'Best prompts for cinematic AI digital art',
      'How to copyright your creative book or script in India'
    ]
  }
];

export function getAudienceBySlug(slug: string): TargetAudienceSEO | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().trim();
  return TARGET_AUDIENCES_SEO.find(a => a.slug === cleanSlug || a.id === cleanSlug);
}
