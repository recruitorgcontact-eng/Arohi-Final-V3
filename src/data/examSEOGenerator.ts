// Arohi AI — Pan-India Mega Dynamic SEO Engine & Schema.org Graph Generator
// Powers full multilingual canonical URLs, JSON-LD Quiz microdata, hreflang alternates, and programmatic sitemaps.

import { 
  KG_COUNTRY_INDIA, 
  KG_STATES_MAP, 
  KG_AUTHORITIES_MAP, 
  KG_EXAMS_MAP, 
  KG_STAGES_MAP, 
  KG_SUBJECTS_MAP,
  resolveKGLineage
} from './examKnowledgeGraph';
import { 
  MASTER_SCHOOL_BOARDS_MAP, 
  MasterSchoolBoardDefinition,
  SchoolBoardGrade,
  SchoolBoardGradeSubject 
} from './schoolBoardsKnowledgeGraph';
import { 
  INDIAN_LANGUAGES_REGISTRY, 
  IndianLanguageConfig, 
  SUPPORTED_LANG_CODES,
  getLanguageConfig,
  generateHreflangTags
} from './indianLanguages';
import { MockTest, ExamKnowledgeGraphLineage, ExamSEOMetadata, KGBreadcrumbItem } from '../types/examTypes';

export interface MultilingualExamSEOPage {
  langCode: string;
  langConfig: IndianLanguageConfig;
  canonicalUrl: string;
  title: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
  hreflangs: { rel: string; hreflang: string; href: string }[];
  breadcrumbs: KGBreadcrumbItem[];
  jsonLdQuiz: Record<string, any>;
  jsonLdBreadcrumbs: Record<string, any>;
  jsonLdCourse: Record<string, any>;
}

// 1. GENERATE RICH SCHEMA.ORG / QUIZ JSON-LD MICRODATA (Google Practice Problems Schema)
export function generateSchemaOrgQuiz(test: MockTest, examLineage: ExamKnowledgeGraphLineage, langCode: string = 'en') {
  const langConfig = getLanguageConfig(langCode);
  const { exam, authority, state } = examLineage;

  // Format questions into Schema.org Question format for Google SERP rich snippets
  const questionsJsonLd = test.questions.slice(0, 10).map((q, idx) => {
    const correctOpt = q.options.find(o => o.id === q.correctAnswer || o.id === (q as any).correctOptionId) || q.options[0];
    return {
      '@type': 'Question',
      name: `Q${idx + 1}: ${q.text.slice(0, 100)}...`,
      text: q.text,
      educationalLevel: exam.eligibility,
      educationalAlignment: {
        '@type': 'AlignmentObject',
        alignmentType: 'educationalSubject',
        targetName: q.subject || exam.name
      },
      suggestedAnswer: q.options.filter(o => o.id !== q.correctAnswer && o.id !== (q as any).correctOptionId).map(o => ({
        '@type': 'Answer',
        text: o.text,
        comment: {
          '@type': 'Comment',
          text: 'Incorrect answer option.'
        }
      })),
      acceptedAnswer: {
        '@type': 'Answer',
        text: correctOpt ? correctOpt.text : '',
        comment: {
          '@type': 'Comment',
          text: q.explanation || 'Verified official answer key explanation provided by Arohi AI Exam Engine.'
        }
      }
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${exam.name} (${test.title}) — Official 2026 CBT Online Mock Test`,
    description: langConfig.seoDescriptionTemplate(exam.name, state.name),
    url: `https://arohiai.com${examLineage.canonicalPath}?lang=${langCode}`,
    educationalUse: 'Practice and Competitive Examination Preparation',
    timeRequired: `PT${test.durationMinutes}M`,
    typicalAgeRange: '14-35',
    provider: {
      '@type': 'Organization',
      name: 'Arohi AI — Pan-India Examination Platform',
      url: 'https://arohiai.com',
      logo: 'https://arohiai.com/logo.png',
      sameAs: [
        'https://twitter.com/ArohiAI',
        'https://facebook.com/ArohiAI',
        'https://linkedin.com/company/arohiai'
      ]
    },
    about: {
      '@type': 'Thing',
      name: `${exam.name} (${authority.shortName})`,
      description: exam.overview
    },
    hasPart: questionsJsonLd
  };
}

// 2. GENERATE COMPLETE MULTILINGUAL SEO METADATA FOR ANY EXAM / TEST
export function getMultilingualExamSEO(test: MockTest, langCode: string = 'en'): MultilingualExamSEOPage {
  const langConfig = getLanguageConfig(langCode);
  const examLineage = test.kgLineage || resolveKGLineage(test);
  const { exam, authority, state, canonicalPath, breadcrumbs } = examLineage;

  const canonicalUrl = `https://arohiai.com${canonicalPath}`;
  const hreflangs = generateHreflangTags(canonicalUrl);

  const title = `${exam.name} ${langConfig.mockTestLabel} 2026 — ${authority.shortName} ${langConfig.freeCbtLabel} | Arohi AI`;
  const metaDescription = langConfig.seoDescriptionTemplate(exam.name, `${state.name} • ${authority.shortName}`);
  const h1 = `${exam.name} ${langConfig.mockTestLabel} 2026 (${authority.shortName}) — ${langConfig.freeCbtLabel}`;

  const keywords = [
    exam.name,
    exam.code,
    authority.shortName,
    authority.name,
    state.name,
    `${exam.shortName} mock test 2026`,
    `${exam.shortName} free cbt practice`,
    `${exam.shortName} official question paper`,
    `${exam.shortName} syllabus pdf`,
    `${exam.shortName} ${langConfig.nameNative} mock test`,
    'Arohi AI All-India Rank',
    'Pan India Exam CBT'
  ];

  // Localized Breadcrumbs
  const localizedBreadcrumbs: KGBreadcrumbItem[] = breadcrumbs.map(b => ({
    ...b,
    labelRegional: langCode !== 'en' ? `${b.label} (${langConfig.nameNative})` : undefined
  }));

  const jsonLdQuiz = generateSchemaOrgQuiz(test, examLineage, langCode);

  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: localizedBreadcrumbs.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `https://arohiai.com${item.url}?lang=${langCode}`
    }))
  };

  const jsonLdCourse = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${exam.name} 2026 Complete CBT Practice Program`,
    description: metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Arohi AI Examination Platform',
      sameAs: 'https://arohiai.com'
    },
    educationalCredentialAwarded: `${exam.name} Readiness Scorecard`,
    occupationalCredentialAwarded: `${authority.name} Candidate Assessment`,
    inLanguage: langConfig.locale
  };

  return {
    langCode,
    langConfig,
    canonicalUrl: `${canonicalUrl}?lang=${langCode}`,
    title,
    metaDescription,
    h1,
    keywords,
    hreflangs,
    breadcrumbs: localizedBreadcrumbs,
    jsonLdQuiz,
    jsonLdBreadcrumbs,
    jsonLdCourse
  };
}

// 3. GENERATE COMPLETE SCHOOL BOARD (CLASSES 1-12) SEO METADATA
export function getSchoolBoardSEO(
  boardId: string, 
  gradeSlug: string, 
  subjectId?: string, 
  langCode: string = 'en'
): MultilingualExamSEOPage | null {
  const board = MASTER_SCHOOL_BOARDS_MAP[boardId];
  if (!board) return null;

  const grade = board.gradesMap[gradeSlug];
  if (!grade) return null;

  const subject = subjectId ? grade.subjects.find(s => s.id === subjectId) : undefined;
  const langConfig = getLanguageConfig(langCode);

  const canonicalPath = subject 
    ? `/school/${board.id}/${grade.gradeSlug}/${subject.id}`
    : `/school/${board.id}/${grade.gradeSlug}`;
  
  const canonicalUrl = `https://arohiai.com${canonicalPath}`;
  const hreflangs = generateHreflangTags(canonicalUrl);

  const titlePrefix = subject ? `${subject.name} - ` : '';
  const title = `${titlePrefix}${grade.title} (${board.code}) 2026 Sample Papers & Mock Tests | Arohi AI`;
  
  const targetEntityName = subject ? `${subject.name} (${grade.title})` : grade.title;
  const metaDescription = langConfig.seoDescriptionTemplate(targetEntityName, `${board.name} • ${board.stateName}`);
  const h1 = `${board.code} ${targetEntityName} 2026 ${langConfig.freeCbtLabel}`;

  const keywords = [
    board.name,
    board.code,
    board.stateName,
    grade.title,
    `Class ${grade.gradeNumber} ${board.code} Sample Papers 2026`,
    `Class ${grade.gradeNumber} ${board.code} Mock Test`,
    `NCERT Class ${grade.gradeNumber} Online Test`,
    `${board.code} Question Bank Solutions`,
    subject ? subject.name : `Class ${grade.gradeNumber} All Subjects`,
    'Arohi AI School Exam Hub'
  ];

  const breadcrumbs: KGBreadcrumbItem[] = [
    {
      id: 'india',
      label: 'India (School Boards)',
      slug: 'india',
      url: '/mocktests',
      level: 'country',
      badge: 'National'
    },
    {
      id: board.stateId,
      label: board.stateName,
      slug: board.stateId,
      url: `/mocktests/state/${board.stateId}`,
      level: 'state',
      badge: 'State / Central'
    },
    {
      id: board.id,
      label: `${board.code} Board`,
      slug: board.id,
      url: `/school/${board.id}`,
      level: 'authority',
      badge: 'Education Board'
    },
    {
      id: grade.gradeSlug,
      label: `Class ${grade.gradeNumber}`,
      slug: grade.gradeSlug,
      url: `/school/${board.id}/${grade.gradeSlug}`,
      level: 'exam',
      badge: `Grade ${grade.gradeNumber}`
    }
  ];

  if (subject) {
    breadcrumbs.push({
      id: subject.id,
      label: subject.name,
      slug: subject.id,
      url: canonicalPath,
      level: 'subject',
      badge: 'Subject'
    });
  }

  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `https://arohiai.com${item.url}?lang=${langCode}`
    }))
  };

  const jsonLdQuiz = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${board.code} ${targetEntityName} Annual Board Mock Test Series 2026`,
    description: metaDescription,
    url: `${canonicalUrl}?lang=${langCode}`,
    educationalUse: 'School Examination and Board Preparation',
    typicalAgeRange: `${5 + grade.gradeNumber}-${7 + grade.gradeNumber}`,
    provider: {
      '@type': 'Organization',
      name: 'Arohi AI — Pan-India School Education Engine',
      url: 'https://arohiai.com'
    }
  };

  const jsonLdCourse = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${board.code} Class ${grade.gradeNumber} Comprehensive Board Preparation`,
    description: metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Arohi AI',
      url: 'https://arohiai.com'
    }
  };

  return {
    langCode,
    langConfig,
    canonicalUrl: `${canonicalUrl}?lang=${langCode}`,
    title,
    metaDescription,
    h1,
    keywords,
    hreflangs,
    breadcrumbs,
    jsonLdQuiz,
    jsonLdBreadcrumbs,
    jsonLdCourse
  };
}

// 4. PROGRAMMATIC SITEMAP GENERATOR (Produces indexable XML for Google Search Console)
export function generateProgrammaticExamsXmlSitemap(tests: MockTest[]): string {
  const domain = 'https://arohiai.com';
  const urls: string[] = [];

  // Add all exam landing pages in 12 languages
  tests.forEach((test) => {
    const lineage = test.kgLineage || resolveKGLineage(test);
    const path = lineage.canonicalPath;

    SUPPORTED_LANG_CODES.forEach((lang) => {
      urls.push(`
  <url>
    <loc>${domain}${path}?lang=${lang}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    ${SUPPORTED_LANG_CODES.map(l => `<xhtml:link rel="alternate" hreflang="${INDIAN_LANGUAGES_REGISTRY[l].locale.toLowerCase()}" href="${domain}${path}?lang=${l}"/>`).join('\n    ')}
  </url>`);
    });
  });

  // Add all School Boards & Classes 1-12 pages in 12 languages
  Object.values(MASTER_SCHOOL_BOARDS_MAP).forEach((board) => {
    Object.values(board.gradesMap).forEach((grade) => {
      const gradePath = `/school/${board.id}/${grade.gradeSlug}`;
      SUPPORTED_LANG_CODES.forEach((lang) => {
        urls.push(`
  <url>
    <loc>${domain}${gradePath}?lang=${lang}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${SUPPORTED_LANG_CODES.map(l => `<xhtml:link rel="alternate" hreflang="${INDIAN_LANGUAGES_REGISTRY[l].locale.toLowerCase()}" href="${domain}${gradePath}?lang=${l}"/>`).join('\n    ')}
  </url>`);
      });

      // Individual Subjects
      grade.subjects.forEach((subj) => {
        const subjPath = `/school/${board.id}/${grade.gradeSlug}/${subj.id}`;
        SUPPORTED_LANG_CODES.forEach((lang) => {
          urls.push(`
  <url>
    <loc>${domain}${subjPath}?lang=${lang}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    ${SUPPORTED_LANG_CODES.map(l => `<xhtml:link rel="alternate" hreflang="${INDIAN_LANGUAGES_REGISTRY[l].locale.toLowerCase()}" href="${domain}${subjPath}?lang=${l}"/>`).join('\n    ')}
  </url>`);
        });
      });
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}
