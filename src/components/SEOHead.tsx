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
    title: "Arohi AI - World & India's #1 Multilingual Opportunity Engine in 150+ Languages (arohiai.com)",
    desc: "Chat and talk live with Arohi AI in Odia, Hindi, English, Bengali, Telugu, Tamil, Marathi, Gujarati, Spanish, French & 150+ languages. Solves 100+ real life problems."
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
  tools: {
    title: "Arohi AI Smart Tools Suite - 4K Image Studio, Code Copilot & Music Studio | Arohi AI",
    desc: "Generate 4K AI images, write full-stack code, compose music tracks, and analyze financial data with Arohi AI multi-tool ecosystem."
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
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "INR"
        },
        "description": desc,
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
