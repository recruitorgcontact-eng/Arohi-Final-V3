import { useEffect } from 'react';
import { ALL_150_PLUS_LANGUAGES } from '../data/languagesData';
import { getAudienceBySlug, getProblemBySlug } from '../data/masterSeoEngine';
import { Language } from '../translations';

interface SEOHeadProps {
  activeTab?: string;
  selectedState?: string;
  selectedAudience?: string;
  selectedAudienceSlug?: string;
  selectedProblemSlug?: string;
  currentLanguage?: Language;
}

const TAB_SEO_TITLES: Record<string, { title: string; desc: string }> = {
  chat: {
    title: "Arohi AI: ONE AI. INFINITE OPPORTUNITIES. | Sovereign AI Ecosystem in 150+ Languages (arohiai.com)",
    desc: "Arohi AI — ONE AI. INFINITE OPPORTUNITIES. Built by Bharat, Built for Bharat. Live multilingual voice AI & LLM cum LMM solving 100+ real-life problems across exams, business, careers, and welfare in 150+ languages."
  },
  // Flagship Product Suites & Ecosystem Hubs
  assistant: {
    title: "Arohi Assistant - Next-Gen Conversational LLM & Multimodal LMM Copilot | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Experience Arohi Assistant: India's sovereign conversational LLM cum LMM. Real-time multilingual voice chat, live web search grounding, visual document analysis, and deep reasoning across 150+ languages."
  },
  'arohi-assistant': {
    title: "Arohi Assistant - Next-Gen Conversational LLM & Multimodal LMM Copilot | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Experience Arohi Assistant: India's sovereign conversational LLM cum LMM. Real-time multilingual voice chat, live web search grounding, visual document analysis, and deep reasoning across 150+ languages."
  },
  'calling-agents': {
    title: "Arohi Calling Agents - Autonomous Enterprise Telephony & Voice AI | Arohi AI (arohiai.com)",
    desc: "Deploy human-like autonomous outbound & inbound voice calling bots in 150+ regional languages. Ultra-low latency, CRM synchronization, lead qualification, and customer support."
  },
  calling: {
    title: "Arohi Calling Agents - Autonomous Enterprise Telephony & Voice AI | Arohi AI (arohiai.com)",
    desc: "Deploy human-like autonomous outbound & inbound voice calling bots in 150+ regional languages. Ultra-low latency, CRM synchronization, lead qualification, and customer support."
  },
  exams: {
    title: "Arohi Exams - National CBT Mock Test Series & 1v1 Gaming Arena | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Practice real-time CBT mock tests for NEET, JEE Main, UPSC, SSC CGL, Banking, CBSE & CHSE Odisha with instant All-India rank, OMR grading, and 1v1 gaming arena battles powered by Arohi AI."
  },
  mocktests: {
    title: "Arohi Exams - National CBT Mock Test Series & Gaming Arena | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Practice real-time CBT mock tests for NEET, JEE Main, UPSC, SSC CGL, Banking, CBSE & CHSE Odisha with instant All-India rank, OMR grading, and 1v1 gaming arena battles powered by Arohi AI."
  },
  mocktest: {
    title: "Arohi Exams - National CBT Mock Test Series & Gaming Arena | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Practice real-time CBT mock tests for NEET, JEE Main, UPSC, SSC CGL, Banking, CBSE & CHSE Odisha with instant All-India rank, OMR grading, and 1v1 gaming arena battles powered by Arohi AI."
  },
  institutions: {
    title: "Arohi for Institutions & Universities - AI Campus & Placement OS | Arohi AI (arohiai.com)",
    desc: "Empower your university, college, or school with AI-driven student employability intelligence, automated mock interview labs, smart curriculum mapping, and campus placement tracking."
  },
  govt: {
    title: "Arohi for Government & Public Administration - Sovereign Public AI Infrastructure | Arohi AI",
    desc: "Equipping state departments and district administrations with citizen grievance redressal, multilingual scheme navigation, and sovereign AI public service automation."
  },
  opportunities: {
    title: "Arohi Opportunities Engine - Central & State Welfare Schemes, Subsidies, Jobs & Grants | Arohi AI",
    desc: "Search, verify eligibility, and apply for 2,500+ Central and State welfare schemes, PMEGP/Mudra loans, Divyangjan UDID benefits, and freshers vacancies with step-by-step AI guidance."
  },
  'arohi-one-product': {
    title: "Arohi ONE Business OS - All-in-One MSME Operating System & ERP | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Streamline your enterprise with automated GST invoicing, CRM lead pipeline, cashflow radar, inventory stock alerts, legal contracts, and bank-ready MSME DPR reports inside Arohi AI."
  },
  'business-os': {
    title: "Arohi ONE Business OS - All-in-One MSME Operating System | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Streamline your enterprise with automated GST invoicing, CRM lead pipeline, cashflow radar, inventory stock alerts, legal contracts, and bank-ready MSME DPR reports inside Arohi AI."
  },
  businessos: {
    title: "Arohi ONE Business OS - All-in-One MSME Operating System | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Streamline your enterprise with automated GST invoicing, CRM lead pipeline, cashflow radar, inventory stock alerts, legal contracts, and bank-ready MSME DPR reports inside Arohi AI."
  },
  arohione: {
    title: "Arohi ONE Business OS - All-in-One MSME Operating System | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Streamline your enterprise with automated GST invoicing, CRM lead pipeline, cashflow radar, inventory stock alerts, legal contracts, and bank-ready MSME DPR reports inside Arohi AI."
  },
  one: {
    title: "Arohi ONE Business OS - All-in-One MSME Operating System | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Streamline your enterprise with automated GST invoicing, CRM lead pipeline, cashflow radar, inventory stock alerts, legal contracts, and bank-ready MSME DPR reports inside Arohi AI."
  },
  'mission-87': {
    title: "Mission 87: National Youth Economic Activation Movement | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "National sovereign movement activating India's 87 Million NEET youth across 700+ districts into self-reliant economic creators. Five sovereign earning ladders to earn ₹5,000 to ₹1,00,000+ monthly."
  },
  mission87: {
    title: "Mission 87: National Youth Economic Activation Movement | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "National sovereign movement activating India's 87 Million NEET youth across 700+ districts into self-reliant economic creators. Five sovereign earning ladders to earn ₹5,000 to ₹1,00,000+ monthly."
  },
  mission: {
    title: "Mission 87: National Youth Economic Activation Movement | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "National sovereign movement activating India's 87 Million NEET youth across 700+ districts into self-reliant economic creators. Five sovereign earning ladders to earn ₹5,000 to ₹1,00,000+ monthly."
  },
  partner: {
    title: "Arohi AI Partner & Franchise Network - District Dealerships & Campus Ambassadors | Arohi AI",
    desc: "Join India's fastest-growing sovereign AI network. Become an authorized district franchise partner, institution dealer, or campus brand ambassador with recurring revenue sharing."
  },
  partners: {
    title: "Arohi AI Partner & Franchise Network - District Dealerships & Campus Ambassadors | Arohi AI",
    desc: "Join India's fastest-growing sovereign AI network. Become an authorized district franchise partner, institution dealer, or campus brand ambassador with recurring revenue sharing."
  },
  franchise: {
    title: "Arohi AI Partner & Franchise Network - District Dealerships & Campus Ambassadors | Arohi AI",
    desc: "Join India's fastest-growing sovereign AI network. Become an authorized district franchise partner, institution dealer, or campus brand ambassador with recurring revenue sharing."
  },
  employer: {
    title: "Arohi AI Recruiter & Employer Portal - AI Talent Match & Verified Candidate Sourcing | Arohi AI",
    desc: "Post job openings, screen candidates with ATS benchmarks, review AI interview performance scores, and hire top verified talent across India with Arohi AI."
  },
  tools: {
    title: "Arohi AI Tools Hub - 30+ Free Instant Productivity & Career AI Utilities | Arohi AI",
    desc: "Explore 30+ free AI tools: ATS resume score checker, multilingual voice translator, GST calculator, business idea generator, cover letter writer, and prompt enhancer."
  },
  directory: {
    title: "Global Problem & Solutions Directory - 100+ Everyday Challenges Solved | Arohi AI",
    desc: "Browse curated AI solutions for 100+ real-world challenges faced by students, farmers, job seekers, entrepreneurs, PwD, and professionals in 150+ languages."
  },
  solutions: {
    title: "Universal Solutions Hub - 100+ Everyday Problems Solved | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Discover step-by-step verified AI solutions for 100+ real-world challenges across 23 target audiences in 150+ languages with official government portal guidance."
  },
  solution: {
    title: "Universal Solutions Hub - 100+ Everyday Problems Solved | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Discover step-by-step verified AI solutions for 100+ real-world challenges across 23 target audiences in 150+ languages with official government portal guidance."
  },
  audience: {
    title: "Target Audiences & Opportunities Hub | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Tailored AI tools, career roadmaps, and government schemes for Students, MSMEs, Divyangjan, Healthcare, Developers, Farmers, and Job Seekers."
  },
  pricing: {
    title: "Official Plans & Pricing (Starting ₹399/mo) | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Affordable, transparent AI plans: Starter (₹399/mo), Professional (₹699/mo), Growth Business (₹1,699/mo), Elite Executive (₹3,999/mo), and Ultimate Premium (₹4,999/mo)."
  },
  plans: {
    title: "Official Plans & Pricing (Starting ₹399/mo) | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Affordable, transparent AI plans: Starter (₹399/mo), Professional (₹699/mo), Growth Business (₹1,699/mo), Elite Executive (₹3,999/mo), and Ultimate Premium (₹4,999/mo)."
  },
  subscriptions: {
    title: "Official Plans & Pricing (Starting ₹399/mo) | Arohi AI: ONE AI. INFINITE OPPORTUNITIES.",
    desc: "Affordable, transparent AI plans: Starter (₹399/mo), Professional (₹699/mo), Growth Business (₹1,699/mo), Elite Executive (₹3,999/mo), and Ultimate Premium (₹4,999/mo)."
  },
  jobs: {
    title: "Arohi AI Govt & Corporate Jobs Hub - Sarkari Naukri, UPSC, OPSC, SSC & Private Vacancies",
    desc: "Discover verified government and corporate jobs across India and worldwide. Get AI syllabus roadmaps, previous papers, and direct application links."
  },
  resume: {
    title: "Free 100/100 ATS Resume Builder & Word (.docx) Generator | Arohi AI (arohiai.com)",
    desc: "Download free ATS-compliant Microsoft Word (.docx) resumes. Instant ATS score calculation, bullet point upgrades, and keyword optimization."
  },
  interview: {
    title: "AI Voice Mock Interview Simulator & Spoken Feedback | Arohi AI (arohiai.com)",
    desc: "Practice realistic voice interviews for Software, Banking, Civil Services, Sales, and Medical with instant STAR-method scoring."
  },
  career: {
    title: "Arohi AI Career Intelligence & Transition Roadmaps (arohiai.com)",
    desc: "Personalized career roadmaps, skill gap analysis, salary negotiation scripts, and free verified certification guides from top global tech leaders."
  },
  schemes: {
    title: "Government Schemes & Welfare Guide - UDID, PM-Kisan, PMEGP, Mudra | Arohi AI",
    desc: "Search, verify eligibility, and apply for Central & State schemes across Odisha (Subhadra, KALIA), Maharashtra, UP, Bihar, and all Indian states with step-by-step AI guidance."
  },
  business: {
    title: "MSME Project Report (DPR) Generator, Mudra Loans & GST Helper | Arohi AI (arohiai.com)",
    desc: "Generate bank-ready Detailed Project Reports (DPR), calculate PMEGP subsidies, check GST HSN codes, and draft investor pitch decks."
  },
  courses: {
    title: "Free Certified Skill Courses in AI, Coding, Spoken English & Data Science | Arohi AI",
    desc: "Master in-demand skills with free certified courses from Google, Microsoft, and IBM. Step-by-step learning paths in 150+ languages."
  },
  syllabus: {
    title: "School & Board Syllabus Helper - CBSE, ICSE, CHSE Odisha (Class 1-12) | Arohi AI",
    desc: "Instant chapter summaries, math step-by-step solvers, physics derivations, and board exam revision mind maps in Odia, Hindi, and English."
  },
  blogs: {
    title: "100+ Multilingual Knowledge Blogs on AI, Sarkari Jobs, MSME Loans & Exams | Arohi AI",
    desc: "Explore trending guides on government schemes, resume hacks, competitive exam tricks, and business subsidies in 150+ languages."
  },
  privacy: {
    title: "Privacy Policy & Data Security Commitment | Arohi AI (arohiai.com)",
    desc: "Official privacy policy and data governance practices of Arohi AI. Enterprise-grade encryption, DPDP Act compliance, and zero personal data selling."
  },
  terms: {
    title: "Terms of Service & User Agreement | Arohi AI (arohiai.com)",
    desc: "Official terms of service governing the usage of Arohi AI platforms, API, mobile apps, and subscription services."
  },
  refunds: {
    title: "Refund, Cancellation & Billing Policy | Arohi AI (arohiai.com)",
    desc: "Transparent and fair billing, subscription cancellation, and refund policies for all Arohi AI plans and voice credits."
  },
  contact: {
    title: "Contact Us & Support Helpdesk | Arohi AI (arohiai.com)",
    desc: "Connect with the Arohi AI support team for enterprise sales inquiries, franchise partnerships, or technical support."
  },
  faqs: {
    title: "Frequently Asked Questions & Support Center | Arohi AI (arohiai.com)",
    desc: "Find quick answers to common questions about Arohi AI, subscription pricing, Mission 87, exams, voice calling, and multilingual capabilities."
  }
};

export default function SEOHead({
  activeTab,
  selectedState,
  selectedAudience,
  selectedAudienceSlug,
  selectedProblemSlug,
  currentLanguage = 'en'
}: SEOHeadProps) {
  useEffect(() => {
    let title = "Arohi AI - World & India's #1 Multilingual Opportunity Engine (arohiai.com)";
    let desc = "Arohi AI solves 100+ real life problems for Students, Job Seekers, MSMEs, Traders, Divyangjan, Developers, Farmers, and Families in 150+ languages.";
    let jsonLdFaqs: { question: string; answer: string }[] = [];

    const audienceObj = selectedAudienceSlug ? getAudienceBySlug(selectedAudienceSlug) : undefined;
    const problemObj = selectedProblemSlug ? getProblemBySlug(selectedProblemSlug) : undefined;

    if (problemObj) {
      const nativeTitle = problemObj.nativeTitles[currentLanguage] || problemObj.title;
      title = `${nativeTitle} - Instant AI Solution | Arohi AI (arohiai.com)`;
      desc = `${problemObj.solutionSummary} ${problemObj.problemStatement}`;
      jsonLdFaqs = problemObj.faqs;
    } else if (audienceObj) {
      const nativeAudienceTitle = audienceObj.nativeTitles[currentLanguage] || audienceObj.title;
      title = `Arohi AI for ${nativeAudienceTitle} - Solutions & Growth Guide (arohiai.com)`;
      desc = audienceObj.metaDescription;
    } else if (selectedState) {
      title = `Arohi AI ${selectedState} Career, MSME & Opportunity Portal (arohiai.com)`;
      desc = `Explore top jobs, competitive exam prep, MSME setup, and government schemes tailored for ${selectedState} students, job seekers, and entrepreneurs.`;
    } else if (selectedAudience) {
      title = `Arohi AI for ${selectedAudience} - Tailored Opportunities & Tools (arohiai.com)`;
      desc = `Custom AI voice guidance, career roadmaps, tools, and opportunities crafted specifically for ${selectedAudience} on Arohi AI.`;
    } else if (activeTab && TAB_SEO_TITLES[activeTab]) {
      title = TAB_SEO_TITLES[activeTab].title;
      desc = TAB_SEO_TITLES[activeTab].desc;
    }

    if (currentLanguage !== 'en' && !problemObj && !audienceObj) {
      const langItem = ALL_150_PLUS_LANGUAGES.find(l => l.code === currentLanguage);
      const langName = langItem ? `${langItem.native} (${langItem.english})` : currentLanguage.toUpperCase();
      title = `[${langName}] ${title}`;
    }

    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    // Maintain noarchive, index, follow robots directive
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noarchive, index, follow');

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', window.location.href);

    // Update Twitter Cards
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', desc);

    // Dynamic Canonical Link
    const protocol = window.location.protocol;
    const host = window.location.host;
    const currentPath = window.location.pathname;
    const canonicalUrl = `${protocol}//${host}${currentPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Clean up old hreflangs and re-inject top 25 languages + x-default
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach((el) => el.remove());

    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', `${protocol}//${host}${activeTab && activeTab !== 'home' ? `/${activeTab}` : '/'}`);
    document.head.appendChild(xDefault);

    // Inject hreflangs for key regional and global languages
    const TOP_SEO_LANGS = ['en', 'hi', 'or', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'ml', 'pa', 'as', 'es', 'fr', 'de', 'ja', 'zh', 'ar', 'pt', 'ru', 'it', 'ko', 'tr', 'id', 'sw'];
    TOP_SEO_LANGS.forEach((code) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', code);
      const tabSubPath = activeTab && activeTab !== 'home' ? `/${activeTab}` : '';
      link.setAttribute('href', `${protocol}//${host}${tabSubPath}?lang=${code}`);
      document.head.appendChild(link);
    });

    // Inject JSON-LD Schema
    const existingSchema = document.getElementById('arohi-jsonld-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaScript = document.createElement('script');
    schemaScript.id = 'arohi-jsonld-schema';
    schemaScript.type = 'application/ld+json';

    const schemaGraph: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Arohi AI",
        "url": "https://arohiai.com",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": "Web, Android, iOS",
        "description": desc,
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "399.00",
          "highPrice": "4999.00",
          "offerCount": "5",
          "offers": [
            {
              "@type": "Offer",
              "name": "Starter Plan",
              "price": "399.00",
              "priceCurrency": "INR",
              "description": "10,000 AI Credits, 5 Hours AI Voice, Unlimited Chat"
            },
            {
              "@type": "Offer",
              "name": "Professional Plan",
              "price": "699.00",
              "priceCurrency": "INR",
              "description": "15,000 AI Credits, 10 Hours AI Voice, ATS Resumes, 3 Certificates"
            },
            {
              "@type": "Offer",
              "name": "Growth Business Plan",
              "price": "1699.00",
              "priceCurrency": "INR",
              "description": "35,000 AI Credits, 25 Hours AI Voice, MSME DPR Generator, PMEGP Subsidies"
            },
            {
              "@type": "Offer",
              "name": "Elite Executive Plan",
              "price": "3999.00",
              "priceCurrency": "INR",
              "description": "80,000 AI Credits, 60 Hours AI Voice, Commercial Filings & Executive Search"
            },
            {
              "@type": "Offer",
              "name": "Ultimate Premium Plan",
              "price": "4999.00",
              "priceCurrency": "INR",
              "description": "100,000 AI Credits, 80 Hours AI Voice, Unlimited Filings & Dedicated VIP Priority"
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "12840"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Arohi AI",
        "url": "https://arohiai.com",
        "logo": "https://arohiai.com/arohi.png",
        "sameAs": [
          "https://twitter.com/ArohiAI",
          "https://linkedin.com/company/arohiai",
          "https://youtube.com/@ArohiAI"
        ]
      }
    ];

    if (activeTab === 'assistant' || activeTab === 'arohi-assistant') {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Arohi Assistant",
        "description": "Next-Gen Conversational LLM cum LMM AI Copilot with real-time multilingual voice chat, visual document analysis, live search grounding, and deep reasoning in 150+ languages.",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": "Web, Android, iOS"
      });
    }

    if (activeTab === 'calling-agents' || activeTab === 'calling') {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Arohi Calling Agents",
        "description": "Autonomous enterprise telephony and conversational voice AI bots handling inbound customer support, outbound qualification calls, and automated appointment scheduling in 150+ languages.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Cloud Telephony API"
      });
    }

    if (activeTab === 'institutions' || activeTab === 'govt') {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "GovernmentService",
        "name": "Arohi AI for Institutions & Public Administration",
        "serviceType": "Public AI Infrastructure & Campus Placement OS",
        "provider": {
          "@type": "Organization",
          "name": "Arohi AI Bharat"
        }
      });
    }

    if (activeTab === 'opportunities') {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "GovernmentService",
        "name": "Arohi Opportunities Engine",
        "serviceType": "Welfare Schemes, Subsidies & Employment Portal",
        "description": "Eligibility verification and application roadmaps for 2,500+ Central and State welfare schemes, PMEGP subsidies, and Divyangjan UDID assistance."
      });
    }

    if (activeTab === 'mission-87' || activeTab === 'mission87' || activeTab === 'mission') {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        "name": "Mission 87: National Youth Economic Activation Movement",
        "description": "A sovereign national initiative by Arohi AI empowering India's 87 Million NEET youth across 700+ districts with AI agency skills, micro-manufacturing blueprints, and sovereign earning ladders to earn ₹5,000–₹1,00,000+/month.",
        "provider": {
          "@type": "Organization",
          "name": "Arohi AI Bharat",
          "url": "https://arohiai.com"
        }
      });
    }

    if (activeTab === 'mocktests' || activeTab === 'mocktest' || activeTab === 'exams') {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "EducationalApplication",
        "name": "Arohi Exams & Gaming Arena",
        "description": "National CBT mock test series and multiplayer gamified academic battles for NEET, JEE Main, UPSC, SSC, Banking, and Board Exams.",
        "applicationCategory": "EducationalApplication",
        "educationalUse": "Assessment",
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student"
        }
      });
    }

    if (activeTab === 'business-os' || activeTab === 'businessos' || activeTab === 'arohione' || activeTab === 'one' || activeTab === 'arohi-one-product') {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "BusinessAudience",
        "name": "Arohi ONE Business OS",
        "description": "All-in-One AI operating system for MSMEs, Startups, and Enterprises with GST invoicing, CRM pipelines, cashflow forecasting, inventory matrix, and DPR reports."
      });
    }

    if (jsonLdFaqs.length > 0) {
      schemaGraph.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": jsonLdFaqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      });
    }

    schemaScript.text = JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph });
    document.head.appendChild(schemaScript);

  }, [activeTab, selectedState, selectedAudience, selectedAudienceSlug, selectedProblemSlug, currentLanguage]);

  return null;
}
