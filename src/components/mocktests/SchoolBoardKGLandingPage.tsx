import React, { useState } from 'react';
import { 
  ArrowLeft, Sparkles, Play, Award, Building, MapPin, 
  Layers, Clock, FileText, CheckCircle2, AlertCircle, 
  ExternalLink, Share2, Brain, Trophy, ShieldCheck, 
  Globe2, BookOpen, ChevronRight, Check, Languages, Code2, GraduationCap
} from 'lucide-react';
import { 
  MasterSchoolBoardDefinition, 
  SchoolBoardGrade, 
  SchoolBoardGradeSubject,
  ALL_SCHOOL_BOARDS_LIST 
} from '../../data/schoolBoardsKnowledgeGraph';
import { 
  INDIAN_LANGUAGES_REGISTRY, 
  SUPPORTED_LANG_CODES, 
  getLanguageConfig 
} from '../../data/indianLanguages';
import { getSchoolBoardSEO } from '../../data/examSEOGenerator';
import ExamKGBreadcrumbs from './ExamKGBreadcrumbs';

interface SchoolBoardKGLandingPageProps {
  board: MasterSchoolBoardDefinition;
  initialGradeSlug?: string;
  initialSubjectId?: string;
  isDarkMode?: boolean;
  onBack: () => void;
  onStartBoardQuiz?: (board: MasterSchoolBoardDefinition, grade: SchoolBoardGrade, subject?: SchoolBoardGradeSubject) => void;
}

export default function SchoolBoardKGLandingPage({
  board,
  initialGradeSlug = 'class-10',
  initialSubjectId,
  isDarkMode = true,
  onBack,
  onStartBoardQuiz
}: SchoolBoardKGLandingPageProps) {
  const [selectedGradeSlug, setSelectedGradeSlug] = useState<string>(initialGradeSlug);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | undefined>(initialSubjectId);
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showJsonLdModal, setShowJsonLdModal] = useState(false);

  const currentGrade = board.gradesMap[selectedGradeSlug] || Object.values(board.gradesMap)[0];
  const currentSubject = selectedSubjectId 
    ? currentGrade?.subjects.find(s => s.id === selectedSubjectId) 
    : undefined;

  const seoData = getSchoolBoardSEO(board.id, selectedGradeSlug, selectedSubjectId, selectedLang) || {
    langCode: selectedLang,
    langConfig: getLanguageConfig(selectedLang),
    canonicalUrl: `https://arohiai.com/school/${board.id}/${selectedGradeSlug}?lang=${selectedLang}`,
    title: `${board.code} Class ${currentGrade?.gradeNumber || 10} Mock Test 2026`,
    metaDescription: `${board.name} Classes 1 to 12 Mock Test & Board Exam Series`,
    h1: `${board.code} Class ${currentGrade?.gradeNumber || 10} Official Sample Papers 2026`,
    keywords: [board.name, board.code],
    hreflangs: [],
    breadcrumbs: [],
    jsonLdQuiz: {},
    jsonLdBreadcrumbs: {},
    jsonLdCourse: {}
  };

  const { langConfig } = seoData;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(seoData.canonicalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16 max-w-7xl mx-auto">
      
      {/* 1. TOP NAVIGATION & MULTILINGUAL BAR */}
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
          <span>Back to All Exam &amp; Board Tracks</span>
        </button>

        {/* 12+ Pan-India Language Selector Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold mr-1">
            <Languages className="w-4 h-4 text-purple-400" />
            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Language:</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-[480px]">
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

          <button
            onClick={() => setShowJsonLdModal(!showJsonLdModal)}
            className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              showJsonLdModal
                ? 'bg-purple-600 text-white border-purple-500'
                : isDarkMode
                ? 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
            title="Inspect Google Schema.org School Quiz"
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
              Live Google Search JSON-LD School Schema ({langConfig.nameEnglish} • {langConfig.locale})
            </span>
            <span className="text-[10px] text-slate-400">Class 1-12 Education Taxonomy</span>
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

      {/* BREADCRUMB COMPONENT */}
      <ExamKGBreadcrumbs
        breadcrumbs={seoData.breadcrumbs}
        canonicalPath={seoData.canonicalUrl}
        isDarkMode={isDarkMode}
      />

      {/* 2. SEO HERO HEADER FOR BOARD */}
      <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#1d1245] via-[#100a29] to-[#250d4b] border-purple-500/40 text-white' 
          : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200 text-slate-900 shadow-purple-100'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isDarkMode ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              <MapPin className="w-3.5 h-3.5" />
              <span>{board.stateName}</span>
            </span>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isDarkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-purple-100 text-purple-900 border border-purple-300'
            }`}>
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{board.code}</span>
            </span>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isDarkMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-cyan-100 text-cyan-900 border border-cyan-300'
            }`}>
              <Layers className="w-3.5 h-3.5" />
              <span>Classes 1 to 12</span>
            </span>
          </div>

          <h1 className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {seoData.h1}
          </h1>

          {board.nameRegional && (
            <p className={`text-base font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
              {board.nameRegional}
            </p>
          )}

          <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-3xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {seoData.metaDescription}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-lg border ${
              isDarkMode ? 'bg-black/40 border-purple-500/30 text-purple-300' : 'bg-slate-100 border-slate-200 text-purple-800'
            }`}>
              Canonical: {seoData.canonicalUrl}
            </span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t text-xs ${
          isDarkMode ? 'border-purple-500/20' : 'border-purple-200'
        }`}>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Standard</span>
            <div className={`text-sm font-black truncate ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              {board.curriculumStandard}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Mediums</span>
            <div className={`text-sm font-black truncate ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
              {board.mediumsOfInstruction.join(', ')}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Exam Season</span>
            <div className={`text-sm font-black truncate ${isDarkMode ? 'text-rose-300' : 'text-rose-700'}`}>
              {board.examSeasons}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Official Portal</span>
            <div>
              <a 
                href={board.officialPortal} 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-black text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CLASS & GRADE SELECTOR TABS (CLASSES 1 TO 12) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Select Target Grade / Class (1 to 12)</span>
          </h2>
          <span className={`text-xs font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
            {Object.keys(board.gradesMap).length} Active Tracks
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {Object.entries(board.gradesMap).map(([slug, grade]) => {
            const isSelected = selectedGradeSlug === slug;
            return (
              <button
                key={slug}
                onClick={() => {
                  setSelectedGradeSlug(slug);
                  setSelectedSubjectId(undefined);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-[1.02]'
                      : 'bg-purple-100 border-purple-400 text-purple-900 font-black shadow-sm'
                    : isDarkMode
                    ? 'bg-[#120d2a] border-[#291e56] text-slate-300 hover:bg-[#18113c]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-[10px] uppercase font-bold opacity-75">Grade {grade.gradeNumber}</div>
                <div className="text-xs font-black truncate">{grade.title.split('(')[0]}</div>
                {grade.stream && grade.stream !== 'General' && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-bold mt-1 inline-block ${
                    isDarkMode ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-50 text-cyan-800'
                  }`}>
                    {grade.stream}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. SUBJECTS & MOCK TEST MODULES FOR SELECTED GRADE */}
      {currentGrade && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-base sm:text-lg font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>{currentGrade.title} — Subjects &amp; CBT Question Banks</span>
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Curated in strict accordance with the latest {board.code} syllabus and sample paper blueprint.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentGrade.subjects.map((subject, sIdx) => (
              <div
                key={`${subject.id}-${sIdx}`}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-lg ${
                  isDarkMode 
                    ? 'bg-[#120d2a] border-[#291e56] hover:border-purple-500/60' 
                    : 'bg-white border-slate-200 hover:border-purple-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                      isDarkMode ? 'bg-purple-900/40 text-purple-300 border-purple-500/30' : 'bg-purple-50 text-purple-900 border-purple-200'
                    }`}>
                      {board.code} Class {currentGrade.gradeNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isDarkMode ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    }`}>
                      {subject.cbtQuestionsCount} Practice Qs
                    </span>
                  </div>

                  <h3 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                    {subject.name}
                  </h3>

                  {subject.nameHindi && (
                    <p className={`text-xs font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                      {subject.nameHindi}
                    </p>
                  )}

                  {/* Sample Chapter Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {subject.sampleTopics.slice(0, 4).map((topic, i) => (
                      <span key={`${topic}-${i}`} className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium ${
                        isDarkMode ? 'bg-[#18113c] border-purple-500/20 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}>
                        {topic}
                      </span>
                    ))}
                    {subject.sampleTopics.length > 4 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-lg opacity-60 font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                        +{subject.sampleTopics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className={`pt-3 border-t flex items-center justify-between ${
                  isDarkMode ? 'border-purple-500/10' : 'border-slate-200'
                }`}>
                  <div className="text-xs">
                    <span className={`block text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Total Marks</span>
                    <span className={`font-black ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>{subject.totalMarks} Marks</span>
                  </div>

                  <button
                    onClick={() => onStartBoardQuiz?.(board, currentGrade, subject)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    <span>Practice Paper</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
