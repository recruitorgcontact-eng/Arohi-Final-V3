import { useState, useMemo } from 'react';
import {
  MASTER_AUDIENCES,
  MASTER_PROBLEM_SOLUTIONS,
  MasterAudience,
  MasterProblemSolution,
  searchMasterSeoDatabase
} from '../data/masterSeoEngine';
import { ALL_150_PLUS_LANGUAGES } from '../data/languagesData';
import {
  Search,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Building,
  Store,
  Palette,
  Music,
  Video,
  Code2,
  TrendingUp,
  Calculator,
  HeartHandshake,
  Users,
  Scale,
  Stethoscope,
  Dumbbell,
  Sprout,
  Home,
  Compass,
  Globe,
  Feather,
  BookOpen,
  Award,
  ChevronRight,
  Filter,
  CheckCircle2,
  HelpCircle,
  Zap,
  MessageSquare
} from 'lucide-react';

interface UniversalSolutionsHubProps {
  currentLanguage: string;
  isDarkMode?: boolean;
  onSelectSolution: (problem: MasterProblemSolution) => void;
  onSelectAudience: (audience: MasterAudience) => void;
  onClose?: () => void;
}

const AUDIENCE_ICONS: Record<string, any> = {
  GraduationCap,
  Briefcase,
  Building,
  Store,
  Palette,
  Music,
  Video,
  Code2,
  TrendingUp,
  Calculator,
  HeartHandshake,
  Users,
  Scale,
  Stethoscope,
  Dumbbell,
  Sprout,
  Home,
  Compass,
  Globe,
  Feather,
  BookOpen,
  Award
};

export default function UniversalSolutionsHub({
  currentLanguage,
  isDarkMode = true,
  onSelectSolution,
  onSelectAudience,
  onClose
}: UniversalSolutionsHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudienceFilter, setSelectedAudienceFilter] = useState<string>('all');
  const [activeModalProblem, setActiveModalProblem] = useState<MasterProblemSolution | null>(null);

  const currentLangObj = useMemo(() => {
    return ALL_150_PLUS_LANGUAGES.find(l => l.code === currentLanguage) || ALL_150_PLUS_LANGUAGES[0];
  }, [currentLanguage]);

  const { audiences: filteredAudiences, problems: filteredProblems } = useMemo(() => {
    if (!searchQuery.trim()) {
      if (selectedAudienceFilter === 'all') {
        return { audiences: MASTER_AUDIENCES, problems: MASTER_PROBLEM_SOLUTIONS };
      }
      return {
        audiences: MASTER_AUDIENCES.filter(a => a.slug === selectedAudienceFilter),
        problems: MASTER_PROBLEM_SOLUTIONS.filter(p => p.audienceSlug === selectedAudienceFilter)
      };
    }
    const result = searchMasterSeoDatabase(searchQuery, currentLanguage);
    if (selectedAudienceFilter !== 'all') {
      return {
        audiences: result.audiences.filter(a => a.slug === selectedAudienceFilter),
        problems: result.problems.filter(p => p.audienceSlug === selectedAudienceFilter)
      };
    }
    return result;
  }, [searchQuery, selectedAudienceFilter, currentLanguage]);

  return (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} py-8 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-4xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ONE AI. 23+ AUDIENCES. 100+ REAL LIFE SOLUTIONS. 150+ LANGUAGES.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent">
            Arohi AI Master Solutions Directory
          </h1>
          
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Discover tailored AI assistance for your exact daily challenges across India and worldwide in{' '}
            <span className="text-purple-400 font-semibold">{currentLangObj.native} ({currentLangObj.english})</span> and 150+ languages.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto pt-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search any real-life problem, loan, syllabus, job, or tool in ${currentLangObj.english} or native script...`}
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-medium border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-purple-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm focus:border-purple-600'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-200 font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Audience Category Filter Chips */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by Target Audience ({MASTER_AUDIENCES.length})</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedAudienceFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedAudienceFilter === 'all'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              All Audiences ({MASTER_PROBLEM_SOLUTIONS.length}+ Solutions)
            </button>
            {MASTER_AUDIENCES.map((aud) => {
              const isSelected = selectedAudienceFilter === aud.slug;
              const IconComp = AUDIENCE_ICONS[aud.iconName] || Globe;
              const nativeTitle = aud.nativeTitles[currentLanguage] || aud.title;
              return (
                <button
                  key={aud.id}
                  onClick={() => setSelectedAudienceFilter(isSelected ? 'all' : aud.slug)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20'
                      : isDarkMode
                      ? 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{nativeTitle.split('(')[0].trim()}</span>
                  <span className="text-[10px] opacity-70">({aud.problemCount})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 23 Target Audiences Grid */}
        {selectedAudienceFilter === 'all' && !searchQuery && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Explore by Audience Directory (23 Profiles)</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {MASTER_AUDIENCES.map((aud) => {
                const IconComp = AUDIENCE_ICONS[aud.iconName] || Globe;
                const nativeTitle = aud.nativeTitles[currentLanguage] || aud.title;
                return (
                  <div
                    key={aud.id}
                    onClick={() => onSelectAudience(aud)}
                    className={`group relative p-4 rounded-2xl border transition-all cursor-pointer hover:-translate-y-1 ${
                      isDarkMode
                        ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 hover:border-purple-500/50'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-purple-400 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {aud.problemCount} Solutions
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1">
                      {nativeTitle}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {aud.shortDesc}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-semibold text-purple-400">
                      <span>Explore Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 100+ Real Life Problems Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Real-Life Problems & Solutions ({filteredProblems.length} Available)</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Click any problem to view solution details or ask Arohi AI
            </span>
          </div>

          {filteredProblems.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 text-slate-400 space-y-2">
              <p className="font-semibold">No specific solution matched your search query.</p>
              <p className="text-xs text-slate-500">Try searching for keywords like &quot;Mudra loan&quot;, &quot;ATS resume&quot;, &quot;Math&quot;, or &quot;UDID card&quot;.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProblems.map((prob) => {
                const nativeTitle = prob.nativeTitles[currentLanguage] || prob.title;
                const aud = MASTER_AUDIENCES.find(a => a.slug === prob.audienceSlug);
                return (
                  <div
                    key={prob.id}
                    onClick={() => setActiveModalProblem(prob)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg ${
                      isDarkMode
                        ? 'bg-slate-900/70 hover:bg-slate-900 border-slate-800/90 hover:border-purple-500/40'
                        : 'bg-white hover:bg-purple-50/30 border-slate-200 hover:border-purple-300 shadow-sm'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {prob.category}
                        </span>
                        {aud && (
                          <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
                            {aud.title.split('(')[0].trim()}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug">
                        {nativeTitle}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {prob.solutionSummary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSolution(prob);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Ask Arohi AI</span>
                      </button>

                      <span className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Problem Solution Detail Modal */}
      {activeModalProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border shadow-2xl ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  {activeModalProblem.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                  {activeModalProblem.nativeTitles[currentLanguage] || activeModalProblem.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalProblem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Problem Statement */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>The Everyday Problem:</span>
              </p>
              <p className="text-slate-300 leading-relaxed">{activeModalProblem.problemStatement}</p>
            </div>

            {/* How Arohi Solves It */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>How Arohi AI Solves It Step-by-Step:</span>
              </h4>
              <div className="space-y-2">
                {activeModalProblem.howArohiSolvesIt.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Prompt Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Instant Pre-Loaded Prompt</span>
                <span className="text-purple-400">150+ Languages Supported</span>
              </div>
              <p className="text-xs text-slate-300 font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                {activeModalProblem.targetPrompt}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModalProblem(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const prob = activeModalProblem;
                  setActiveModalProblem(null);
                  onSelectSolution(prob);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Solve This with Arohi AI</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
