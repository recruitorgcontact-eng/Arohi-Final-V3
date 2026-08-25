import React, { useState } from 'react';
import { 
  ArrowLeft, Sparkles, Play, Award, Building, MapPin, 
  Layers, Clock, FileText, CheckCircle2, AlertCircle, 
  ExternalLink, Share2, Brain, Trophy, ShieldCheck, 
  Globe2, BookOpen, ChevronRight, Check, Languages, Code2
} from 'lucide-react';
import { 
  MockTest, 
  ExamKnowledgeGraphLineage, 
  KGLevel 
} from '../../types/examTypes';
import { 
  INDIAN_LANGUAGES_REGISTRY, 
  SUPPORTED_LANG_CODES, 
  getLanguageConfig 
} from '../../data/indianLanguages';
import { getMultilingualExamSEO } from '../../data/examSEOGenerator';
import ExamKGBreadcrumbs from './ExamKGBreadcrumbs';

interface ExamKGLandingPageProps {
  lineage: ExamKnowledgeGraphLineage;
  relatedTests: MockTest[];
  currentTest?: MockTest;
  isDarkMode?: boolean;
  onBack: () => void;
  onSelectTest: (test: MockTest) => void;
  onOpenCustomGeneratorWithTopic?: (topic: string) => void;
  onNavigateBreadcrumb?: (level: KGLevel, id: string, slug: string) => void;
}

export default function ExamKGLandingPage({
  lineage,
  relatedTests,
  currentTest,
  isDarkMode = true,
  onBack,
  onSelectTest,
  onOpenCustomGeneratorWithTopic,
  onNavigateBreadcrumb
}: ExamKGLandingPageProps) {
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showJsonLdModal, setShowJsonLdModal] = useState(false);

  // Active target test for JSON-LD Quiz Schema
  const targetTest = currentTest || (relatedTests.length > 0 ? relatedTests[0] : null);
  
  // Generate live localized SEO Page configuration
  const seoData = targetTest 
    ? getMultilingualExamSEO(targetTest, selectedLang)
    : {
        langCode: selectedLang,
        langConfig: getLanguageConfig(selectedLang),
        canonicalUrl: `https://arohiai.com${lineage.canonicalPath}?lang=${selectedLang}`,
        title: `${lineage.exam.name} Mock Test 2026`,
        metaDescription: lineage.seoMeta.metaDescription,
        h1: lineage.seoMeta.h1,
        keywords: lineage.seoMeta.keywords,
        hreflangs: [],
        breadcrumbs: lineage.breadcrumbs,
        jsonLdQuiz: lineage.seoMeta.structuredDataJsonLd || {},
        jsonLdBreadcrumbs: {},
        jsonLdCourse: {}
      };

  const { langConfig } = seoData;
  const { country, state, authority, exam, stage, subject, canonicalPath } = lineage;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://arohiai.com${canonicalPath}?lang=${selectedLang}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16 max-w-7xl mx-auto">
      
      {/* 1. TOP NAVIGATION, MULTILINGUAL SWITCHER & SEO BAR */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#18113c] hover:bg-[#231952] border-purple-500/30 text-purple-200' 
              : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Exam Tracks</span>
        </button>

        {/* 12+ Pan-India Language Selector Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold mr-1">
            <Languages className="w-4 h-4 text-purple-400" />
            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Language:</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-[500px]">
            {SUPPORTED_LANG_CODES.map((code) => {
              const lang = INDIAN_LANGUAGES_REGISTRY[code];
              const isSelected = selectedLang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setSelectedLang(code)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 scale-105'
                      : isDarkMode
                      ? 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title={`${lang.nameEnglish} (${lang.nameNative})`}
                >
                  <span>{lang.nameNative}</span>
                </button>
              );
            })}
          </div>

          {/* Canonical & JSON-LD Buttons */}
          <button
            onClick={() => setShowJsonLdModal(!showJsonLdModal)}
            className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              showJsonLdModal
                ? 'bg-purple-600 text-white border-purple-500'
                : isDarkMode
                ? 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
            title="Inspect Google Schema.org Quiz & JSON-LD"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Schema.org</span>
          </button>

          <button
            onClick={handleCopyLink}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              copiedLink
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : isDarkMode
                ? 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Page'}</span>
          </button>
        </div>
      </div>

      {/* SCHEMA.ORG JSON-LD PREVIEW DRAWER */}
      {showJsonLdModal && (
        <div className={`p-5 rounded-3xl border text-xs font-mono space-y-3 ${
          isDarkMode ? 'bg-[#090616] border-purple-500/40 text-purple-200' : 'bg-slate-900 border-slate-800 text-purple-300'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
            <span className="font-bold text-amber-300 text-xs">
              Live Google Search JSON-LD Structured Data ({langConfig.nameEnglish} • {langConfig.locale})
            </span>
            <span className="text-[10px] text-slate-400">Schema.org/Quiz + BreadcrumbList + Course</span>
          </div>
          <pre className="text-[11px] leading-relaxed max-h-72 overflow-y-auto">
            {JSON.stringify(
              {
                quizSchema: seoData.jsonLdQuiz,
                breadcrumbsSchema: seoData.jsonLdBreadcrumbs,
                courseSchema: seoData.jsonLdCourse
              },
              null,
              2
            )}
          </pre>
        </div>
      )}

      {/* DYNAMIC RELATIONAL BREADCRUMB COMPONENT */}
      <ExamKGBreadcrumbs
        breadcrumbs={seoData.breadcrumbs}
        canonicalPath={`${canonicalPath}?lang=${selectedLang}`}
        seoMeta={lineage.seoMeta}
        isDarkMode={isDarkMode}
        onSelectLevel={onNavigateBreadcrumb}
      />

      {/* 2. PROGRAMMATIC SEO HERO HEADER & EXAM IDENTITY */}
      <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#1d1245] via-[#100a29] to-[#250d4b] border-purple-500/40 text-white' 
          : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200 text-slate-900 shadow-purple-100'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          {/* Badges Lineage */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isDarkMode ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              <MapPin className="w-3.5 h-3.5" />
              <span>{state.name} Jurisdiction</span>
            </span>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isDarkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-purple-100 text-purple-900 border border-purple-300'
            }`}>
              <Building className="w-3.5 h-3.5" />
              <span>{authority.shortName || authority.name}</span>
            </span>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isDarkMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-cyan-100 text-cyan-900 border border-cyan-300'
            }`}>
              <Layers className="w-3.5 h-3.5" />
              <span>{stage.name}</span>
            </span>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}>
              <Globe2 className="w-3.5 h-3.5" />
              <span>{langConfig.nameNative} ({langConfig.nameEnglish})</span>
            </span>
          </div>

          {/* Dynamic Multilingual H1 */}
          <h1 className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {seoData.h1}
          </h1>

          {exam.nameRegional && (
            <p className={`text-base font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-900'}`}>
              {exam.nameRegional} {exam.nameHindi ? `• ${exam.nameHindi}` : ''}
            </p>
          )}

          {/* SEO Meta Description in Target Language */}
          <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-3xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-900'
          }`}>
            {seoData.metaDescription}
          </p>

          {/* Canonical Path & hreflang Info */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-lg border ${
              isDarkMode ? 'bg-black/40 border-purple-500/30 text-purple-300' : 'bg-slate-100 border-slate-300 text-purple-950 font-bold'
            }`}>
              Canonical: https://arohiai.com{canonicalPath}?lang={selectedLang}
            </span>
            <span className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${
              isDarkMode ? 'bg-purple-950/50 border-purple-800/40 text-cyan-300' : 'bg-purple-100 border-purple-300 text-purple-950 font-bold'
            }`}>
              hreflang: {langConfig.locale.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t text-xs ${
          isDarkMode ? 'border-purple-500/20' : 'border-purple-200'
        }`}>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-black ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Conducting Body</span>
            <div className={`text-sm font-black truncate ${isDarkMode ? 'text-amber-300' : 'text-amber-900'}`}>
              {authority.name}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-black ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              {langConfig.negativeMarkingLabel}
            </span>
            <div className={`text-sm font-black ${isDarkMode ? 'text-rose-300' : 'text-rose-900'}`}>
              {exam.negativeMarking}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-black ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              {langConfig.allIndiaRankLabel}
            </span>
            <div className={`text-sm font-black ${isDarkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
              Real-Time AIR Matrix
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-black ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              Available CBT Papers
            </span>
            <div className={`text-sm font-black ${isDarkMode ? 'text-cyan-300' : 'text-cyan-900'}`}>
              {relatedTests.length} Ready CBT Papers
            </div>
          </div>
        </div>
      </div>

      {/* 3. SYLLABUS & OFFICIAL BLUEPRINT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Exam Blueprint & Key Syllabus */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-5 ${
          isDarkMode ? 'bg-[#120d2a] border-[#291e56]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
            <h2 className={`text-base font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>{langConfig.syllabusLabel}</span>
            </h2>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isDarkMode ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-100 text-purple-900 font-bold'
            }`}>
              {exam.code} Standard
            </span>
          </div>

          <div className="space-y-3">
            <h3 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
              Exam Overview &amp; Eligibility Criteria
            </h3>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-800 font-medium'}`}>
              {exam.overview}
            </p>
            <div className={`p-3 rounded-2xl border text-xs font-medium ${
              isDarkMode ? 'bg-purple-950/20 border-purple-500/20 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-950'
            }`}>
              <span className="font-bold">Eligibility Requirement:</span> {exam.eligibility}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
              Marks Distribution &amp; Negative Marking Scheme
            </h3>
            <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
              isDarkMode ? 'bg-[#18113c] border-purple-500/20 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-xs space-y-0.5">
                <div className="font-bold">{exam.totalMarksPattern}</div>
                <div className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                  {langConfig.negativeMarkingLabel}: {exam.negativeMarking}.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
              High-Yield Syllabus Modules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {exam.syllabusHighlights.map((topic, i) => (
                <div key={i} className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
                  isDarkMode ? 'bg-[#18113c] border-purple-500/15 text-purple-200' : 'bg-purple-50/80 border-purple-200 text-purple-950'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Authority Info & Fast Generator */}
        <div className="space-y-4">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-[#120d2a] border-[#291e56]' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
              Conducting Authority Mandate
            </h3>
            <div className="space-y-2 text-xs">
              <div className="font-black text-sm text-purple-600 dark:text-purple-400">{authority.name}</div>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-800 font-medium'}`}>
                {authority.description || 'Statutory authority administering government and professional examination tracks in India.'}
              </p>
              {authority.website && (
                <a
                  href={authority.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline pt-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* AI Remedial Generator Box */}
          <div className={`p-6 rounded-3xl border relative overflow-hidden space-y-3 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#201344] to-[#120b29] border-purple-500/40 text-white' 
              : 'bg-purple-50 border-purple-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">{langConfig.aiRemedialLabel}</h4>
            </div>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-800 font-medium'}`}>
              Synthesize a tailored mock test paper for {exam.shortName} focusing specifically on your target weak subjects.
            </p>
            <button
              onClick={() => onOpenCustomGeneratorWithTopic?.(exam.name)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Generate AI Custom Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. READY-TO-ATTEMPT MOCK PAPERS FOR THIS LINEAGE */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-base sm:text-lg font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>{langConfig.freeCbtLabel} — {exam.shortName} ({relatedTests.length} Papers)</span>
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-800 font-medium'}`}>
              Official CBT pattern with real countdown timer, negative marking, and All-India Rank benchmarking.
            </p>
          </div>
        </div>

        {relatedTests.length === 0 ? (
          <div className={`p-8 rounded-3xl border text-center space-y-3 ${
            isDarkMode ? 'bg-[#120d2a] border-[#291e56]' : 'bg-white border-slate-200'
          }`}>
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Ready Papers Being Generated for this Track
            </h4>
            <p className={`text-xs max-w-md mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-800 font-medium'}`}>
              You can immediately generate an authentic test with the Arohi AI Exam Engine for {exam.name}.
            </p>
            <button
              onClick={() => onOpenCustomGeneratorWithTopic?.(exam.name)}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Synthesize Test with AI
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTests.map((test, idx) => (
              <div
                key={`${test.id}-${idx}`}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-lg ${
                  isDarkMode 
                    ? 'bg-[#120d2a] border-[#291e56] hover:border-purple-500/60 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]' 
                    : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                      isDarkMode ? 'bg-purple-900/40 text-purple-300 border-purple-500/30' : 'bg-purple-50 text-purple-950 border-purple-300 font-bold'
                    }`}>
                      {test.categoryLabel}
                    </span>
                    {test.featuredBadge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                        isDarkMode ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold'
                      }`}>
                        <Sparkles className="w-3 h-3 text-amber-500" /> {test.featuredBadge}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm font-black leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {test.title}
                  </h3>

                  {test.titleOdia && (
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-950'}`}>
                      {test.titleOdia}
                    </p>
                  )}

                  <p className={`text-xs line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-800 font-medium'}`}>
                    {test.shortDescription}
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
                    <div className={`p-1.5 rounded-xl border ${isDarkMode ? 'bg-[#18113c] border-purple-500/20' : 'bg-slate-50 border-slate-200 text-slate-900 font-bold'}`}>
                      <span className="block text-[9px] text-slate-700 dark:text-slate-400 font-medium">{langConfig.durationLabel}</span>
                      <span className="font-black text-slate-950 dark:text-indigo-300">{test.durationMinutes}m</span>
                    </div>
                    <div className={`p-1.5 rounded-xl border ${isDarkMode ? 'bg-[#18113c] border-purple-500/20' : 'bg-slate-50 border-slate-200 text-slate-900 font-bold'}`}>
                      <span className="block text-[9px] text-slate-700 dark:text-slate-400 font-medium">{langConfig.questionsLabel}</span>
                      <span className="font-black text-slate-950 dark:text-amber-300">{test.totalQuestions} Qs</span>
                    </div>
                    <div className={`p-1.5 rounded-xl border ${isDarkMode ? 'bg-[#18113c] border-purple-500/20' : 'bg-slate-50 border-slate-200 text-slate-900 font-bold'}`}>
                      <span className="block text-[9px] text-slate-700 dark:text-slate-400 font-medium">{langConfig.totalMarksLabel}</span>
                      <span className="font-black text-slate-950 dark:text-emerald-300">{test.totalMarks} M</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-500/10 flex items-center justify-between">
                  <button
                    onClick={() => onSelectTest(test)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    <span>{langConfig.startTestLabel}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
