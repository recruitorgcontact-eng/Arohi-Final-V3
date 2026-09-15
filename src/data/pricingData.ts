export interface PricingTier {
  price: number;
  currency?: 'INR' | 'USD';
  symbol?: string;
  name: string;
  margin: number;
  callHoursText: string;
  tokenUsageText: string;
  aiCreditsText: string;
  aiCallsText: string;
  unlimitedChatText: string;
  limits: {
    path1: {
      atsScans: string;
      mockInterviews: string;
      jobMatches: string;
      highlights: string[];
    };
    path2: {
      activeCourses: string;
      mentorHours: string;
      certificates: string;
      highlights: string[];
    };
    path3: {
      msmeFilings: string;
      mudraChecks: string;
      startupReports: string;
      highlights: string[];
    };
    path4: {
      chapterDownloads: string;
      aiQueries: string;
      highlights: string[];
    };
  };
}

export const PATH_DETAILS = {
  path1: {
    title: "Path 1: Career, Jobs & Resume Assistance",
    shortTitle: "Career & Resume Path",
    desc: "Sarkari & Private matching, ATS analyzer, and live mock interview practice.",
    icon: "🎓"
  },
  path2: {
    title: "Path 2: Economical Skill Upgradation",
    shortTitle: "Skill Upgradation Path",
    desc: "Industry-oriented courses. Access high-end AI tutoring and professional syllabus modules.",
    icon: "📖"
  },
  path3: {
    title: "Path 3: Udyam Business Launchpad",
    shortTitle: "Udyam Business Plan",
    desc: "Master MSME business filings, Mudra loan compliance, and Odisha subsidy claims.",
    icon: "🚀"
  },
  path4: {
    title: "Path 4: Class 1-10 Student Support",
    shortTitle: "School Support Path",
    desc: "NCERT-mapped multi-language textbooks, unique chapter notes, and parent-monitored dashboard.",
    icon: "📚"
  }
};

export const PRICING_TIERS: PricingTier[] = [
  {
    price: 399,
    name: "Starter Plan",
    margin: 199.50,
    callHoursText: "5 Hours of AI Calls / mo",
    tokenUsageText: "10,000 AI Credits",
    aiCreditsText: "10,000 AI Credits",
    aiCallsText: "5 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "5 ATS scans / mo",
        mockInterviews: "2 live simulation runs / mo",
        jobMatches: "15 premium job listings / mo",
        highlights: ["Sarkari application link routing", "Basic resume scoring", "Standard interview guidelines"]
      },
      path2: {
        activeCourses: "1 active course enrollment",
        mentorHours: "5 AI Arohi mentor hours / mo",
        certificates: "1 verified certificate / mo",
        highlights: ["Core interactive software modules", "Chapter progress syncing", "Printable completion digital badges"]
      },
      path3: {
        msmeFilings: "2 business filings / mo",
        mudraChecks: "5 Mudra credit evaluations / mo",
        startupReports: "1 custom startup roadmap",
        highlights: ["MSME Udyam application guide", "Arohi financial advisory chat", "PMEGP subsidy guidelines checklist"]
      },
      path4: {
        chapterDownloads: "10 high-quality chapter downloads / mo",
        aiQueries: "30 Homework AI tutor queries / mo",
        highlights: ["Class 1-10 syllabus guidelines", "Languages & Sciences chapter notes", "Basic subject quiz feedback"]
      }
    }
  },
  {
    price: 699,
    name: "Professional Plan",
    margin: 349.50,
    callHoursText: "10 Hours of AI Calls / mo",
    tokenUsageText: "15,000 AI Credits",
    aiCreditsText: "15,000 AI Credits",
    aiCallsText: "10 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "15 ATS scans / mo",
        mockInterviews: "8 live simulation runs / mo",
        jobMatches: "50 premium job listings / mo",
        highlights: ["Detailed ATS feedback report", "Interactive Voice Call feedback", "Salary negotiation coaching guidelines"]
      },
      path2: {
        activeCourses: "3 active course enrollments",
        mentorHours: "15 AI Arohi mentor hours / mo",
        certificates: "3 verified certificates / mo",
        highlights: ["Advanced technical modules included", "Arohi active real-time coding help", "Downloadable workspace certificate PDFs"]
      },
      path3: {
        msmeFilings: "6 business filings / mo",
        mudraChecks: "15 Mudra credit evaluations / mo",
        startupReports: "3 custom startup roadmaps",
        highlights: ["PMEGP portal document upload guides", "Odisha state scheme mapping", "MSME tax-saving incentives lookup"]
      },
      path4: {
        chapterDownloads: "30 high-quality chapter downloads / mo",
        aiQueries: "100 Homework AI tutor queries / mo",
        highlights: ["Bilingual explanation keys", "Mathematics & Arts syllabus expansion", "Parent progress dashboard email summaries"]
      }
    }
  },
  {
    price: 1699,
    name: "Growth Business Plan",
    margin: 849.50,
    callHoursText: "25 Hours of AI Calls / mo",
    tokenUsageText: "35,000 AI Credits",
    aiCreditsText: "35,000 AI Credits",
    aiCallsText: "25 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "50 ATS scans / mo",
        mockInterviews: "25 live simulation runs / mo",
        jobMatches: "150 premium job listings / mo",
        highlights: ["Industry expert resume remodeling", "Tailored corporate interview loops", "Priority vacancy alert notifications"]
      },
      path2: {
        activeCourses: "10 active course enrollments",
        mentorHours: "40 AI Arohi mentor hours / mo",
        certificates: "10 verified certificates / mo",
        highlights: ["Priority live voice classroom access", "Customized skill assessment paths", "Verified recruiter network sharing link"]
      },
      path3: {
        msmeFilings: "20 business filings / mo",
        mudraChecks: "50 Mudra credit evaluations / mo",
        startupReports: "10 custom startup roadmaps",
        highlights: ["Bankable Project Report template generator", "State-level PMEGP subsidy matching", "Startup India pitch-deck helper tools"]
      },
      path4: {
        chapterDownloads: "100 high-quality chapter downloads / mo",
        aiQueries: "350 Homework AI tutor queries / mo",
        highlights: ["Advanced Olympiad test preparations", "Personalized subject-by-subject study schedules", "One-click teacher review reports"]
      }
    }
  },
  {
    price: 3999,
    name: "Elite Executive Plan",
    margin: 1999.50,
    callHoursText: "60 Hours of AI Calls / mo",
    tokenUsageText: "80,000 AI Credits",
    aiCreditsText: "80,000 AI Credits",
    aiCallsText: "60 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "150 ATS scans / mo",
        mockInterviews: "75 live simulation runs / mo",
        jobMatches: "500 premium job listings / mo",
        highlights: ["Executive search and direct placement pipeline", "Personalized human-led resume audit call", "Pre-screen mock reviews by HR experts"]
      },
      path2: {
        activeCourses: "30 active course enrollments",
        mentorHours: "100 AI Arohi mentor hours / mo",
        certificates: "25 verified certificates / mo",
        highlights: ["Full agency syllabus integration", "One-on-one virtual project assistance", "Enterprise digital badge credentials"]
      },
      path3: {
        msmeFilings: "60 business filings / mo",
        mudraChecks: "150 Mudra credit evaluations / mo",
        startupReports: "30 custom startup roadmaps",
        highlights: ["Full commercial legal entity compliance", "Direct Bank manager loan profiling desk", "Dedicated MSME mentor-assigned manager"]
      },
      path4: {
        chapterDownloads: "300 high-quality chapter downloads / mo",
        aiQueries: "1000 Homework AI tutor queries / mo",
        highlights: ["Elite school curriculum integration", "Interactive VR science lab modules", "Live weekly group mentorship classes"]
      }
    }
  },
  {
    price: 4999,
    name: "Ultimate Premium Plan",
    margin: 2499.50,
    callHoursText: "80 Hours of AI Calls / mo",
    tokenUsageText: "100,000 AI Credits",
    aiCreditsText: "100,000 AI Credits",
    aiCallsText: "80 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "Unlimited scans",
        mockInterviews: "Unlimited live runs",
        jobMatches: "Unlimited job matching",
        highlights: ["Unlimited premium capabilities", "Direct Recruiter matching priority pass", "24/7 dedicated counselor support"]
      },
      path2: {
        activeCourses: "Unlimited active enrollments",
        mentorHours: "Unlimited AI mentor hours",
        certificates: "Unlimited verified certificates",
        highlights: ["Unlimited course accessibility", "Priority server allocation for instant AI responses", "Digital CV credentials repository"]
      },
      path3: {
        msmeFilings: "Unlimited filings",
        mudraChecks: "Unlimited Evaluations",
        startupReports: "Unlimited startup roadmaps",
        highlights: ["Unlimited legal/MSME documentation filings", "Unlimited loan project reports generator", "Startup Odisha pitch panel access"]
      },
      path4: {
        chapterDownloads: "Unlimited chapter downloads",
        aiQueries: "Unlimited Homework AI queries",
        highlights: ["Unlimited learning chapters access", "Direct tutor messaging board integrated", "High-school competitive exams explorer"]
      }
    }
  }
];

export function getTokenLimitForPrice(price: number, currency = 'INR'): number {
  if (currency === 'USD') {
    if (price === 9) return 10000;
    if (price === 39) return 20000;
    if (price === 69) return 40000;
    if (price === 99) return 60000;
    if (price === 199) return 120000;
    if (price === 399) return 250000;
    return 10000;
  }
  if (price === 399) return 10000;
  if (price === 699) return 15000;
  if (price === 1699) return 35000;
  if (price === 3999) return 80000;
  if (price === 4999) return 100000;
  return 10000; // default Starter
}

export const INTERNATIONAL_PRICING_TIERS: PricingTier[] = [
  {
    price: 9,
    currency: 'USD',
    symbol: '$',
    name: "Global Starter",
    margin: 4.5,
    callHoursText: "5 Hours of AI Calls / mo",
    tokenUsageText: "10,000 AI Credits",
    aiCreditsText: "10,000 AI Credits",
    aiCallsText: "5 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "5 ATS scans / mo",
        mockInterviews: "2 live simulation runs / mo",
        jobMatches: "15 global job listings / mo",
        highlights: ["Global resume scoring & tips", "Standard interview guidelines", "Global career path matching"]
      },
      path2: {
        activeCourses: "1 active course enrollment",
        mentorHours: "5 AI Arohi mentor hours / mo",
        certificates: "1 verified certificate / mo",
        highlights: ["Core interactive software modules", "Chapter progress syncing", "Printable digital badges"]
      },
      path3: {
        msmeFilings: "2 business filings / mo",
        mudraChecks: "5 credit evaluations / mo",
        startupReports: "1 custom startup roadmap",
        highlights: ["Global startup launch guide", "Arohi financial advisory chat", "Incorporation guidelines"]
      },
      path4: {
        chapterDownloads: "10 high-quality chapter downloads / mo",
        aiQueries: "30 Homework AI tutor queries / mo",
        highlights: ["Multi-language K-12 syllabus guide", "STEM & Arts chapter notes", "Subject quiz feedback"]
      }
    }
  },
  {
    price: 39,
    currency: 'USD',
    symbol: '$',
    name: "Global Pro Light",
    margin: 19.5,
    callHoursText: "12 Hours of AI Calls / mo",
    tokenUsageText: "20,000 AI Credits",
    aiCreditsText: "20,000 AI Credits",
    aiCallsText: "12 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "15 ATS scans / mo",
        mockInterviews: "8 live simulation runs / mo",
        jobMatches: "50 global job listings / mo",
        highlights: ["Detailed ATS feedback report", "Voice Call feedback", "Salary negotiation coaching"]
      },
      path2: {
        activeCourses: "3 active course enrollments",
        mentorHours: "15 AI Arohi mentor hours / mo",
        certificates: "3 verified certificates / mo",
        highlights: ["Advanced technical modules", "Arohi real-time coding help", "Downloadable workspace certificate PDFs"]
      },
      path3: {
        msmeFilings: "6 business filings / mo",
        mudraChecks: "15 credit evaluations / mo",
        startupReports: "3 custom startup roadmaps",
        highlights: ["Export & import license guide", "Global tax compliance lookup", "Grant & funding matching"]
      },
      path4: {
        chapterDownloads: "30 high-quality chapter downloads / mo",
        aiQueries: "100 Homework AI tutor queries / mo",
        highlights: ["Bilingual explanation keys", "Mathematics & Arts expansion", "Parent progress dashboard email summaries"]
      }
    }
  },
  {
    price: 69,
    currency: 'USD',
    symbol: '$',
    name: "Global Professional",
    margin: 34.5,
    callHoursText: "25 Hours of AI Calls / mo",
    tokenUsageText: "40,000 AI Credits",
    aiCreditsText: "40,000 AI Credits",
    aiCallsText: "25 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "50 ATS scans / mo",
        mockInterviews: "25 live simulation runs / mo",
        jobMatches: "150 global job listings / mo",
        highlights: ["Industry expert resume remodeling", "Tailored corporate interview loops", "Priority vacancy alert notifications"]
      },
      path2: {
        activeCourses: "10 active course enrollments",
        mentorHours: "40 AI Arohi mentor hours / mo",
        certificates: "10 verified certificates / mo",
        highlights: ["Priority live voice classroom access", "Customized skill assessment paths", "Verified recruiter network sharing link"]
      },
      path3: {
        msmeFilings: "20 business filings / mo",
        mudraChecks: "50 credit evaluations / mo",
        startupReports: "10 custom startup roadmaps",
        highlights: ["Bankable Project Report generator", "International cross-border compliance", "Global pitch-deck helper tools"]
      },
      path4: {
        chapterDownloads: "100 high-quality chapter downloads / mo",
        aiQueries: "350 Homework AI tutor queries / mo",
        highlights: ["Advanced Olympiad test preparations", "Personalized subject-by-subject study schedules", "One-click teacher review reports"]
      }
    }
  },
  {
    price: 99,
    currency: 'USD',
    symbol: '$',
    name: "Global Growth Business",
    margin: 49.5,
    callHoursText: "40 Hours of AI Calls / mo",
    tokenUsageText: "60,000 AI Credits",
    aiCreditsText: "60,000 AI Credits",
    aiCallsText: "40 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "100 ATS scans / mo",
        mockInterviews: "50 live simulation runs / mo",
        jobMatches: "300 global job listings / mo",
        highlights: ["Global corporate placement pipeline", "Human-led resume audit", "Pre-screen mock reviews by HR experts"]
      },
      path2: {
        activeCourses: "20 active course enrollments",
        mentorHours: "70 AI Arohi mentor hours / mo",
        certificates: "20 verified certificates / mo",
        highlights: ["Full agency syllabus integration", "One-on-one virtual project assistance", "Enterprise digital credentials"]
      },
      path3: {
        msmeFilings: "40 business filings / mo",
        mudraChecks: "100 credit evaluations / mo",
        startupReports: "20 custom startup roadmaps",
        highlights: ["Full commercial legal entity compliance", "International payment gateways setup", "Dedicated mentor-assigned manager"]
      },
      path4: {
        chapterDownloads: "200 high-quality chapter downloads / mo",
        aiQueries: "700 Homework AI tutor queries / mo",
        highlights: ["International baccalaureate & AP prep", "Interactive VR science lab modules", "Live weekly group mentorship classes"]
      }
    }
  },
  {
    price: 199,
    currency: 'USD',
    symbol: '$',
    name: "Global Executive",
    margin: 99.5,
    callHoursText: "80 Hours of AI Calls / mo",
    tokenUsageText: "120,000 AI Credits",
    aiCreditsText: "120,000 AI Credits",
    aiCallsText: "80 Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "150 ATS scans / mo",
        mockInterviews: "75 live simulation runs / mo",
        jobMatches: "500 global job listings / mo",
        highlights: ["Executive search & C-level placement pipeline", "Personalized human resume audit call", "Direct HR pre-screens"]
      },
      path2: {
        activeCourses: "30 active course enrollments",
        mentorHours: "100 AI Arohi mentor hours / mo",
        certificates: "25 verified certificates / mo",
        highlights: ["Full agency syllabus integration", "One-on-one virtual project assistance", "Enterprise digital badge credentials"]
      },
      path3: {
        msmeFilings: "60 business filings / mo",
        mudraChecks: "150 credit evaluations / mo",
        startupReports: "30 custom startup roadmaps",
        highlights: ["Full entity legal compliance", "Direct Bank manager loan profiling desk", "Dedicated executive mentor manager"]
      },
      path4: {
        chapterDownloads: "300 high-quality chapter downloads / mo",
        aiQueries: "1000 Homework AI tutor queries / mo",
        highlights: ["Elite school curriculum integration", "Interactive VR science lab modules", "Live weekly group mentorship classes"]
      }
    }
  },
  {
    price: 399,
    currency: 'USD',
    symbol: '$',
    name: "Global Enterprise",
    margin: 199.5,
    callHoursText: "150+ Hours of AI Calls / mo",
    tokenUsageText: "250,000 AI Credits",
    aiCreditsText: "250,000 AI Credits",
    aiCallsText: "150+ Hours AI Voice Calls",
    unlimitedChatText: "✨ UNLIMITED AI CHAT INCLUDED",
    limits: {
      path1: {
        atsScans: "Unlimited scans",
        mockInterviews: "Unlimited live runs",
        jobMatches: "Unlimited job matching",
        highlights: ["Unlimited premium capabilities", "Direct Recruiter matching priority pass", "24/7 dedicated counselor support"]
      },
      path2: {
        activeCourses: "Unlimited active enrollments",
        mentorHours: "Unlimited AI mentor hours",
        certificates: "Unlimited verified certificates",
        highlights: ["Unlimited course accessibility", "Priority server allocation for instant AI responses", "Digital CV credentials repository"]
      },
      path3: {
        msmeFilings: "Unlimited filings",
        mudraChecks: "Unlimited Evaluations",
        startupReports: "Unlimited startup roadmaps",
        highlights: ["Unlimited legal/business documentation", "Unlimited loan project reports generator", "Global pitch panel access"]
      },
      path4: {
        chapterDownloads: "Unlimited chapter downloads",
        aiQueries: "Unlimited Homework AI queries",
        highlights: ["Unlimited learning chapters access", "Direct tutor messaging board integrated", "Global competitive exams explorer"]
      }
    }
  }
];

export function detectUserCurrency(): 'INR' | 'USD' {
  if (typeof window === 'undefined') return 'USD';
  try {
    const saved = localStorage.getItem('arohi_currency');
    if (saved === 'USD' || saved === 'INR') return saved;

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Asia/Kolkata')) {
      return 'INR';
    }
    const lang = navigator.language || '';
    if (lang === 'en-IN' || lang.endsWith('-IN')) {
      return 'INR';
    }
    // Default to USD for all international users in any country globally
    return 'USD';
  } catch (e) {
    return 'USD'; // Safe fallback to USD for global international accessibility
  }
}

export function getPricingTiers(currency: 'INR' | 'USD' = 'INR'): PricingTier[] {
  return currency === 'USD' ? INTERNATIONAL_PRICING_TIERS : PRICING_TIERS;
}

export interface ArohiOneTier {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  priceINR: number;
  priceUSD: number;
  annualPriceINR: number;
  annualPriceUSD: number;
  trialDays: number;
  trialMinutes: number;
  seats: number | string;
  agentsCount: number | string;
  voiceMinutes: number;
  overageRateINR: number;
  overageRateUSD: number;
  description: string;
  features: string[];
  recommendedFor: string;
  agentsIncluded: string[];
}

export const AROHI_ONE_TIERS: ArohiOneTier[] = [
  {
    id: 'arohi_one_starter',
    name: 'Starter OS',
    tagline: 'Micro-Enterprises & Solo Professionals',
    badge: '03 Days Free Trial',
    priceINR: 4999,
    priceUSD: 149,
    annualPriceINR: 49990, // 2 Months Free
    annualPriceUSD: 1490,
    trialDays: 3,
    trialMinutes: 100,
    seats: 3,
    agentsCount: 2,
    voiceMinutes: 600,
    overageRateINR: 3.90,
    overageRateUSD: 0.12,
    description: 'Autonomous AI Business OS starter pack with unified CRM, appointment management, and 2 active voice agents.',
    recommendedFor: 'Clinics, consultants, local service providers, single-location shops.',
    agentsIncluded: ['Smart AI Receptionist', 'Appointment Scheduling Agent'],
    features: [
      '3 Team / Operator Seats included',
      '2 Active Autonomous Voice Agents',
      '600 Voice Minutes / Month (~10 Hours)',
      '03-Day Free Trial (100 Test Minutes)',
      'Unified Lead & Customer CRM',
      'WhatsApp & Email Automation Bots',
      'Automated Call Transcripts & Summaries',
      '10 Regional Indian Languages + English',
      'Overage: ₹3.90 / minute ($0.12 / min)',
      'Direct Razorpay UPI / Card / NetBanking'
    ]
  },
  {
    id: 'arohi_one_growth',
    name: 'Growth OS',
    tagline: 'The Core Digital Workforce',
    badge: '★ Most Popular',
    isPopular: true,
    priceINR: 14999,
    priceUSD: 399,
    annualPriceINR: 149990, // 2 Months Free
    annualPriceUSD: 3990,
    trialDays: 3,
    trialMinutes: 150,
    seats: 10,
    agentsCount: 5,
    voiceMinutes: 2500,
    overageRateINR: 3.20,
    overageRateUSD: 0.10,
    description: 'The complete AI Workforce replacing 3-5 human telecallers with automated pipelines, outbound sales, and support.',
    recommendedFor: 'Growing SMBs, D2C brands, real estate firms, hospitality, private academies.',
    agentsIncluded: ['Smart Receptionist', 'Inbound Support Desk', 'Outbound Sales Qualifier', 'CSAT Feedback Agent', 'Marketing Follow-up'],
    features: [
      '10 Team / Operator Seats included',
      '5 Active Autonomous Voice Agents',
      '2,500 Voice Minutes / Month (~42 Hours)',
      '03-Day Free Trial (150 Test Minutes)',
      'Multi-Pipeline Deal & Lead Tracking',
      'Automated Outbound Campaign Dialer',
      'Sub-Second Conversational Voice Latency',
      'Webhook, Zapier & API Integrations',
      '50+ Global & Vernacular Languages',
      'Overage: ₹3.20 / minute ($0.10 / min)',
      'Priority Razorpay & Corporate Billing'
    ]
  },
  {
    id: 'arohi_one_scale',
    name: 'Scale OS',
    tagline: 'High-Volume & Regulated BFSI Workforce',
    badge: 'High Performance',
    priceINR: 34999,
    priceUSD: 899,
    annualPriceINR: 349990, // 2 Months Free
    annualPriceUSD: 8990,
    trialDays: 3,
    trialMinutes: 250,
    seats: 25,
    agentsCount: 12,
    voiceMinutes: 7500,
    overageRateINR: 2.50,
    overageRateUSD: 0.08,
    description: 'Heavy-duty enterprise workforce for loan repayments, debt recovery, patient triage, and multi-branch operations.',
    recommendedFor: 'NBFCs, lending institutions, hospitals, educational chains, multi-city sales teams.',
    agentsIncluded: ['Loan Repayment Agent', 'Late-Stage Recovery Specialist', 'Healthcare Triage Desk', 'Admissions Counselor', 'VIP Concierge', '+ 7 more personas'],
    features: [
      '25 Team / Operator Seats included',
      '12 Active Autonomous Voice Agents',
      '7,500 Voice Minutes / Month (~125 Hours)',
      '03-Day Free Trial (250 Test Minutes)',
      'Predictive Parallel Auto-Dialer',
      'Custom Knowledgebase RAG Ingestion',
      'Human-Agent Live Warm Call Handoff',
      'Custom Voice Cloning Studio Included',
      'Full 150+ Multilingual Voice Engine',
      'Overage: ₹2.50 / minute ($0.08 / min)',
      'Dedicated Account Support & SLA'
    ]
  },
  {
    id: 'arohi_one_enterprise',
    name: 'Enterprise OS',
    tagline: 'Sovereign & National Scale Deployment',
    badge: 'Custom Fleet',
    priceINR: 89000,
    priceUSD: 2499,
    annualPriceINR: 890000,
    annualPriceUSD: 24990,
    trialDays: 3,
    trialMinutes: 500,
    seats: 'Unlimited',
    agentsCount: '25+ Custom',
    voiceMinutes: 20000,
    overageRateINR: 1.80,
    overageRateUSD: 0.06,
    description: 'Custom private VPC or on-premise installation with dedicated LLM fine-tuning, core banking integration, and unlimited users.',
    recommendedFor: 'Banks, government bodies, telecom operators, nationwide insurance networks.',
    agentsIncluded: ['Custom Fleet Tailored to Enterprise Specifications'],
    features: [
      'Unlimited User & Operator Seats',
      '25+ Custom Fleet Personas & Workflows',
      '20,000 to 100,000+ Minutes / Month',
      'Dedicated Private VPC / Cloud Run Instance',
      'Custom Fine-Tuned Proprietary Models',
      'Core Banking / ERP Direct Connectors',
      '99.95% Guaranteed Uptime SLA',
      'Dedicated Technical Account Manager',
      'Overage: Down to ₹1.50 - ₹1.80 / min ($0.05 / min)',
      'Corporate Purchase Orders & Invoicing'
    ]
  }
];

export interface ArohiVoiceAgentTier {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  priceINR: number;
  priceUSD: number;
  annualPriceINR: number;
  annualPriceUSD: number;
  trialDays: number;
  trialMinutes: number;
  voiceMinutes: number;
  agentsCount: number | string;
  overageRateINR: number;
  overageRateUSD: number;
  description: string;
  features: string[];
  recommendedFor: string;
}

export const AROHI_CALLING_AGENT_TIERS: ArohiVoiceAgentTier[] = [
  {
    id: 'voice_lite',
    name: 'Voice Lite',
    badge: '03 Days Free Trial',
    priceINR: 2999,
    priceUSD: 79,
    annualPriceINR: 29990,
    annualPriceUSD: 790,
    trialDays: 3,
    trialMinutes: 75,
    voiceMinutes: 500,
    agentsCount: 1,
    overageRateINR: 4.20,
    overageRateUSD: 0.13,
    description: 'Single dedicated AI phone agent for inquiries, reception, or appointment scheduling.',
    recommendedFor: 'Clinics, dental offices, single consultants, local boutiques.',
    features: [
      '1 Dedicated AI Agent Persona',
      '500 Voice Minutes / Month (~8.3 Hours)',
      '03-Day Free Trial (75 Test Minutes)',
      'Inbound & Outbound Calling',
      'Instant Call Recordings & Transcripts',
      'Overage: ₹4.20 / minute ($0.13 / min)',
      'Razorpay Instant Activation'
    ]
  },
  {
    id: 'voice_pro',
    name: 'Voice Pro',
    badge: '★ Best Value',
    isPopular: true,
    priceINR: 9999,
    priceUSD: 269,
    annualPriceINR: 99990,
    annualPriceUSD: 2690,
    trialDays: 3,
    trialMinutes: 150,
    voiceMinutes: 2200,
    agentsCount: 3,
    overageRateINR: 3.40,
    overageRateUSD: 0.10,
    description: '3 synchronized voice agents covering front-desk reception, outbound qualification, and support.',
    recommendedFor: 'D2C brands, hospitality, hotels, coaching institutes, customer service desks.',
    features: [
      '3 Active AI Agent Personas',
      '2,200 Voice Minutes / Month (~36.6 Hours)',
      '03-Day Free Trial (150 Test Minutes)',
      'Simultaneous Multi-Call Handling',
      'Custom Context & Knowledge Injection',
      '50+ Vernacular Languages',
      'Overage: ₹3.40 / minute ($0.10 / min)',
      'Razorpay Instant Activation'
    ]
  },
  {
    id: 'voice_fleet',
    name: 'Voice Fleet',
    badge: 'High Volume',
    priceINR: 24999,
    priceUSD: 649,
    annualPriceINR: 249990,
    annualPriceUSD: 6490,
    trialDays: 3,
    trialMinutes: 250,
    voiceMinutes: 6500,
    agentsCount: 8,
    overageRateINR: 2.60,
    overageRateUSD: 0.08,
    description: 'Fleet of 8 autonomous agents handling high-throughput call centers, reminders, and verification.',
    recommendedFor: 'Real estate developers, admission offices, NBFC telecalling desks.',
    features: [
      '8 Active AI Agent Personas',
      '6,500 Voice Minutes / Month (~108 Hours)',
      '03-Day Free Trial (250 Test Minutes)',
      'Predictive Campaign Auto-Dialer',
      'CRM Webhook & Live Call Handoff',
      'Sub-Second Response Latency',
      'Overage: ₹2.60 / minute ($0.08 / min)',
      'Razorpay Instant Activation'
    ]
  },
  {
    id: 'voice_10k',
    name: 'Voice 10K Pack',
    badge: 'Enterprise Bulk',
    priceINR: 38000,
    priceUSD: 999,
    annualPriceINR: 380000,
    annualPriceUSD: 9990,
    trialDays: 3,
    trialMinutes: 350,
    voiceMinutes: 10000,
    agentsCount: 15,
    overageRateINR: 2.20,
    overageRateUSD: 0.07,
    description: '10,000 voice minutes fleet for aggressive debt recovery, lead verification, and survey blitzes.',
    recommendedFor: 'Debt recovery agencies, finance companies, telecom and utility desks.',
    features: [
      '15 Active AI Agent Personas',
      '10,000 Voice Minutes / Month (~166 Hours)',
      '03-Day Free Trial (350 Test Minutes)',
      'High Concurrency (100+ simultaneous lines)',
      'Strict Regulatory & PII Compliance Mode',
      'Overage: ₹2.20 / minute ($0.07 / min)',
      'Corporate Payment & Custom Invoicing'
    ]
  }
];

export const AROHI_ADDONS = [
  {
    id: 'addon_extra_agent',
    name: 'Additional AI Voice Persona',
    priceINR: 2499,
    priceUSD: 69,
    cycle: '/month',
    desc: 'Deploy an extra pre-trained industry AI voice agent with 250 bonus minutes included.'
  },
  {
    id: 'addon_voice_cloning',
    name: 'Executive Voice Cloning Studio',
    priceINR: 9999,
    priceUSD: 199,
    cycle: 'one-time setup + ₹1,499/mo',
    desc: 'Clone the voice of your founder, CEO, or brand ambassador for lifelike automated calls.'
  },
  {
    id: 'addon_virtual_number',
    name: 'Virtual Direct Dial (DID) Number',
    priceINR: 499,
    priceUSD: 10,
    cycle: '/month',
    desc: 'Dedicated local business telephone number (Mumbai, Delhi, Bengaluru, etc.) or US/UK number.'
  },
  {
    id: 'addon_tollfree_number',
    name: 'Indian 1800 Toll-Free Number',
    priceINR: 1499,
    priceUSD: 39,
    cycle: '/month',
    desc: 'Official 1800 toll-free inbound number routed directly to your Arohi AI Receptionist.'
  }
];

export interface ArohiExamPass {
  id: string;
  tier: 'silver' | 'gold' | 'platinum';
  name: string;
  priceINR: number;
  originalPriceINR: number;
  priceUSD: number;
  totalTests: number;
  questionsPerTest: number;
  totalQuestions: number;
  validityDays: number;
  badge: string;
  popular?: boolean;
  description: string;
  features: string[];
}

export const AROHI_EXAM_PASSES: ArohiExamPass[] = [
  {
    id: 'pass_silver_99',
    tier: 'silver',
    name: 'Arohi Exams™ Starter Silver Pass',
    priceINR: 99,
    originalPriceINR: 499,
    priceUSD: 3,
    totalTests: 10,
    questionsPerTest: 100,
    totalQuestions: 1000,
    validityDays: 30,
    badge: 'Starter Speed Prep (30 Days)',
    description: 'Unlock 10 Full-Length CBT Tests (1,000 Questions) across School (Class 1-10) and All Indian Competitive Exams.',
    features: [
      '10 Full-Length CBT Tests (1,000 Questions total)',
      '30 Days Unlimited Portal Access',
      'Dynamic Question & Option Shuffle on every attempt',
      'Official CBT Engine with timer & question palette',
      'Instant Scorecard, All-India Rank (AIR) & Percentile',
      'Official Watermarked Digital Marksheet & PDF Export',
      'School (Class 1-10) & Central/State Competitive Exams'
    ]
  },
  {
    id: 'pass_gold_199',
    tier: 'gold',
    name: 'Arohi Exams™ Gold Pass',
    priceINR: 199,
    originalPriceINR: 899,
    priceUSD: 5,
    totalTests: 25,
    questionsPerTest: 100,
    totalQuestions: 2500,
    validityDays: 90,
    badge: 'Most Popular Choice (90 Days)',
    popular: true,
    description: 'Unlock 25 Full-Length CBT Tests (2,500 Questions) + AI Weakness Diagnostic & 1-Click Tutor.',
    features: [
      '25 Full-Length CBT Tests (2,500 Questions total)',
      '90 Days Unlimited Portal Validity',
      'All Categories Unlocked (School 1-10, AIIMS, OSSSC, SSC, UPSC, Bank, Railway)',
      'AI Weakness Diagnostic & Remedial Practice Reviews',
      '1-Click "Ask Arohi AI" Instant Doubt Clarification in Chat',
      'All-India Leaderboard with Category-Wise Cutoff Benchmarking',
      'Official Performance Marksheet & PDF Export'
    ]
  },
  {
    id: 'pass_platinum_299',
    tier: 'platinum',
    name: 'Arohi Exams™ Platinum Mega Pass',
    priceINR: 299,
    originalPriceINR: 1499,
    priceUSD: 9,
    totalTests: 60,
    questionsPerTest: 100,
    totalQuestions: 6000,
    validityDays: 365,
    badge: 'Maximum Value • 1 Full Year (365 Days)',
    description: 'Unlock 60 Full-Length CBT Tests (6,000 Questions) + Unlimited AI Weakness Re-tests & 1-Click Live Tutor.',
    features: [
      '60 Full-Length CBT Tests (6,000 Questions total)',
      '365 Days (1 Full Year) Complete Access Validity',
      'All 20+ Categories Unlocked (Class 1-10, AIIMS, NEET, JEE, OPSC, SSC, UPSC, Banking)',
      'Unlimited AI Weakness Diagnostic, 7-Day Sprint Plans & Remedial Tests',
      '1-Click "Ask Arohi AI" Instant Doubt Clarification in Live Chat',
      'All-India Leaderboard with State & Category Cutoff Benchmarking',
      'Priority Evaluation with Official Watermarked Digital Certificate & PDF Export'
    ]
  }
];

/**
 * Safely parses a numeric price from a price string, number, or object.
 * Prevents string concatenation bugs where secondary numbers (e.g., "(365 Days Validity)")
 * get merged into astronomical amounts (e.g. ₹2,99,365 instead of ₹299).
 */
export function parseSafePrice(priceInput: string | number | undefined | null): number {
  if (typeof priceInput === 'number') {
    return isNaN(priceInput) || priceInput <= 0 ? 399 : priceInput;
  }
  if (!priceInput || typeof priceInput !== 'string') {
    return 399;
  }

  // 1. If string contains parenthesis, take only the part before '('
  // Example: "₹299 (365 Days Validity)" -> "₹299"
  // Example: "₹199 (90 Days Validity)" -> "₹199"
  // Example: "₹99 (30 Days Validity)" -> "₹99"
  const beforeParenthesis = priceInput.split('(')[0].trim();

  // 2. Also strip any slashes like "/mo", "/year", "/Month"
  const beforeSlash = beforeParenthesis.split('/')[0].trim();

  // 3. Match the first currency or digits sequence
  // Matches e.g. "₹299", "₹ 14,999", "$49", "1,49,990", "99"
  const match = beforeSlash.match(/(?:[₹$]|INR|USD)?\s*([0-9]{1,3}(?:,[0-9]{2,3})*(?:\.[0-9]+)?|[0-9]+(?:\.[0-9]+)?)/i);
  if (match && match[1]) {
    const rawNumberStr = match[1].replace(/,/g, '');
    const val = parseFloat(rawNumberStr);
    if (!isNaN(val) && val > 0) {
      return val;
    }
  }

  // Fallback: match any first numeric sequence in the string
  const fallbackMatch = priceInput.match(/([0-9]+(?:\.[0-9]+)?)/);
  if (fallbackMatch && fallbackMatch[1]) {
    const val = parseFloat(fallbackMatch[1]);
    if (!isNaN(val) && val > 0) return val;
  }

  return 399;
}


