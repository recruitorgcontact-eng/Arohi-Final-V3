import React, { useState } from 'react';
import { 
  Sparkles, Bot, Mic, Share2, ArrowRight, CheckCircle2, 
  GraduationCap, Briefcase, Building2, HeartHandshake, 
  Search, ExternalLink, Zap, Users, ShieldCheck, Globe
} from 'lucide-react';
import { TARGET_AUDIENCES_SEO, TargetAudienceSEO } from '../data/seoAudienceData';

interface ArohiGuideViewProps {
  onOpenChat: (initialPrompt?: string) => void;
  onNavigateTab: (tab: string) => void;
  onSelectAudience: (slug: string) => void;
  onShare: () => void;
  language?: string;
  isDarkMode?: boolean;
}

export const ArohiGuideView: React.FC<ArohiGuideViewProps> = ({
  onOpenChat,
  onNavigateTab,
  onSelectAudience,
  onShare,
  isDarkMode = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Audiences (22)', icon: Users },
    { id: 'Education & Academics', label: '🎓 Students & Class 1–12', icon: GraduationCap },
    { id: 'Career & Employment', label: '💼 Jobs & Careers', icon: Briefcase },
    { id: 'Business & Entrepreneurship', label: '🚀 Startups & MSMEs', icon: Building2 },
    { id: 'Welfare & Society', label: '🇮🇳 Bharat & Inclusion', icon: HeartHandshake },
  ];

  const filteredAudiences = TARGET_AUDIENCES_SEO.filter((aud: TargetAudienceSEO) => {
    // Category match
    const categoryMatch = 
      selectedCategory === 'all' || 
      aud.category === selectedCategory ||
      (selectedCategory === 'Education & Academics' && (aud.category.includes('Education') || aud.category.includes('Teaching'))) ||
      (selectedCategory === 'Career & Employment' && (aud.category.includes('Career') || aud.category.includes('Technology') || aud.category.includes('Human Resources') || aud.category.includes('Freelancing') || aud.category.includes('Government Jobs'))) ||
      (selectedCategory === 'Business & Entrepreneurship' && (aud.category.includes('Business') || aud.category.includes('Startups') || aud.category.includes('Retail') || aud.category.includes('Marketing') || aud.category.includes('Finance'))) ||
      (selectedCategory === 'Welfare & Society' && (aud.category.includes('Accessibility') || aud.category.includes('Agriculture') || aud.category.includes('Women') || aud.category.includes('Elderly') || aud.category.includes('Health') || aud.category.includes('Law') || aud.category.includes('Language') || aud.category.includes('Arts')));

    // Search query match
    const searchMatch = 
      !searchQuery.trim() ||
      aud.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aud.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aud.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aud.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aud.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in slide-in-from-bottom duration-300">
      
      {/* 1. Hero Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg border ${
          isDarkMode 
            ? 'bg-gradient-to-r from-orange-500/20 via-violet-500/20 to-emerald-500/20 text-violet-300 border-violet-500/40' 
            : 'bg-gradient-to-r from-orange-50 via-violet-50 to-emerald-50 text-violet-800 border-violet-300/80 shadow-sm'
        }`}>
          <span className="text-base">🇮🇳</span> Built by Bharat, Built for Bharat • Sovereign LLM & LMM
        </div>

        <div className="space-y-3">
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-pink-500 to-amber-400">AROHI</span>
            <span className={`block text-xl sm:text-2xl md:text-3xl font-bold mt-2 ${isDarkMode ? 'text-violet-200' : 'text-violet-700'}`}>
              One AI. Infinite Opportunities.
            </span>
          </h1>
          <p className={`text-sm sm:text-base max-w-3xl mx-auto font-medium leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            India’s sovereign LLM cum LMM AI ecosystem built for the ambition of young Bharat. Powered by real-time voice in 150+ languages, visual intelligence, and 24/7 guidance for Class 1–12 students, career aspirants, innovators, startups, and businesses. Your dreams, your language, your future—because anyone can be whoever they want to be.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenChat()}
            className="bg-gradient-to-r from-[#7c3aed] to-[#d946ef] hover:from-[#6d28d9] hover:to-[#c084fc] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-2xl shadow-[0_4px_25px_rgba(124,58,237,0.45)] cursor-pointer flex items-center gap-2 transform hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Bot className="w-4.5 h-4.5 text-yellow-300" />
            <span>Open Live AI Chat</span>
          </button>

          <button
            onClick={() => onOpenChat("Hello Arohi! Please start live voice guidance in my preferred language.")}
            className={`${
              isDarkMode 
                ? 'bg-[#1e1548] hover:bg-[#2a1d63] text-violet-200 border-violet-500/40 shadow-md' 
                : 'bg-violet-100 hover:bg-violet-200/80 text-violet-900 border-violet-300 shadow-sm'
            } border font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-2xl cursor-pointer flex items-center gap-2 transform hover:scale-[1.02] active:scale-95 transition-all`}
          >
            <Mic className="w-4.5 h-4.5 text-emerald-500 animate-pulse" />
            <span>Live Voice AI (150+ Langs)</span>
          </button>

          <button
            onClick={onShare}
            className={`${
              isDarkMode 
                ? 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm'
            } border font-extrabold text-xs sm:text-sm py-3.5 px-5 rounded-2xl cursor-pointer flex items-center gap-2 transform hover:scale-[1.02] active:scale-95 transition-all`}
          >
            <Share2 className="w-4 h-4 text-pink-500" />
            <span>Share Platform</span>
          </button>
        </div>
      </div>

      {/* 2. Four Sovereign Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className={`${isDarkMode ? 'bg-[#130f2e] border-violet-900/50' : 'bg-white border-slate-200 shadow-sm'} border rounded-2xl p-5 space-y-2.5 hover:border-violet-500/50 transition-colors`}>
          <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Mic className="w-5 h-5" />
          </div>
          <h2 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>150+ Multilingual Voice AI</h2>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Speak and listen naturally in your mother tongue (Hindi, Odia, Bengali, Tamil, Telugu, Marathi, English & 150+ languages) with zero language barriers.
          </p>
        </div>

        <div className={`${isDarkMode ? 'bg-[#130f2e] border-blue-900/50' : 'bg-white border-slate-200 shadow-sm'} border rounded-2xl p-5 space-y-2.5 hover:border-blue-500/50 transition-colors`}>
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Class 1–12 School Learning</h2>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Interactive doubt clearance, textbook explanations, board exam revision, formula sheets, and homework support for every school champion.
          </p>
        </div>

        <div className={`${isDarkMode ? 'bg-[#130f2e] border-pink-900/50' : 'bg-white border-slate-200 shadow-sm'} border rounded-2xl p-5 space-y-2.5 hover:border-pink-500/50 transition-colors`}>
          <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <h2 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Careers, Resumes & Interviews</h2>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Instant ATS resume optimization in .docx, private & Sarkari job match, and realistic voice mock interview simulations with score analytics.
          </p>
        </div>

        <div className={`${isDarkMode ? 'bg-[#130f2e] border-emerald-900/50' : 'bg-white border-slate-200 shadow-sm'} border rounded-2xl p-5 space-y-2.5 hover:border-emerald-500/50 transition-colors`}>
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5" />
          </div>
          <h2 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Startups, MSMEs & Inclusion</h2>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            PMEGP 35% subsidies, Mudra loans, Udyam registration, and full Divyangjan (PwD) voice-first support & 4% RPwD reservation guidance.
          </p>
        </div>
      </div>

      {/* 3. 20+ Audiences Interactive Grid */}
      <div className={`${isDarkMode ? 'bg-[#0f0b24] border-[#261c4f] shadow-2xl' : 'bg-white border-slate-200 shadow-lg'} border rounded-3xl p-6 sm:p-8 space-y-6`}>
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${isDarkMode ? 'border-[#261c4f]' : 'border-slate-200'}`}>
          <div>
            <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Tailored Intelligence For Every Indian</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Empowering 20+ Specialized Audiences
            </h2>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Select your persona below to unlock dedicated AI prompts, tools, and personalized roadmaps.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student, MSME, exam, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9.5 pr-4 py-2.5 border rounded-xl text-xs focus:outline-none transition-colors ${
                isDarkMode 
                  ? 'bg-[#171236] border-[#2d2163] text-white placeholder-slate-400 focus:border-violet-500' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-violet-600'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : isDarkMode 
                      ? 'bg-[#171236] text-slate-300 border border-[#2d2163] hover:border-violet-500/40 hover:text-white'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-violet-400 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-300' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Audience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {filteredAudiences.map((aud) => (
            <div
              key={aud.id}
              className={`border rounded-2xl p-5 space-y-4 transition-all flex flex-col justify-between group hover:shadow-xl ${
                isDarkMode 
                  ? 'bg-[#140f33] border-[#291e56] hover:border-violet-500/60 hover:shadow-violet-950/40' 
                  : 'bg-slate-50/70 border-slate-200 hover:border-violet-400 hover:shadow-slate-200/80'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md border tracking-wider ${
                    isDarkMode 
                      ? 'bg-violet-950/80 text-violet-300 border-violet-800/40' 
                      : 'bg-violet-100 text-violet-800 border-violet-200'
                  }`}>
                    {aud.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 truncate max-w-[120px]">
                    {aud.badge}
                  </span>
                </div>

                <h3 className={`text-sm font-black transition-colors leading-snug ${
                  isDarkMode 
                    ? 'text-white group-hover:text-violet-300' 
                    : 'text-slate-900 group-hover:text-violet-700'
                }`}>
                  {aud.title}
                </h3>

                <p className={`text-xs line-clamp-3 leading-relaxed font-normal ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {aud.shortDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className={`pt-2 border-t flex items-center gap-2 ${isDarkMode ? 'border-[#23184a]' : 'border-slate-200'}`}>
                <button
                  onClick={() => onOpenChat(aud.targetPrompt)}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-[11px] py-2 px-3 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Bot className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Ask Arohi</span>
                </button>

                <button
                  onClick={() => onSelectAudience(aud.slug)}
                  className={`px-3 py-2 border rounded-xl text-[11px] font-bold cursor-pointer flex items-center gap-1 transition-all ${
                    isDarkMode 
                      ? 'bg-[#1b1542] hover:bg-[#261e5c] text-violet-200 border-violet-500/30' 
                      : 'bg-slate-100 hover:bg-slate-200 text-violet-900 border-violet-200'
                  }`}
                  title="View full persona landing guide"
                >
                  <span>Explore</span>
                  <ExternalLink className="w-3 h-3 text-violet-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAudiences.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>No audience matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-violet-500 hover:underline font-bold"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Sovereign Philosophy Banner */}
      <div className={`border rounded-3xl p-6 sm:p-8 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-r from-[#171038] via-[#1f154d] to-[#171038] border-violet-500/30 shadow-2xl' 
          : 'bg-gradient-to-r from-violet-50 via-indigo-50 to-purple-50 border-violet-200 shadow-md'
      }`}>
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
            isDarkMode 
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
              : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> The Arohi Distinction
          </div>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            General AI asks: <span className={`font-semibold italic ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>"Ask me anything."</span><br />
            Arohi AI asks: <span className={`font-black ${
              isDarkMode 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-pink-300' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-pink-600'
            }`}>"Tell me what you want to achieve."</span>
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed font-medium max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            From Class 1–12 school mastery to dream jobs, startup launches, MSME funding, and accessible governance—Arohi is designed to solve real-world problems for every Indian citizen.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigateTab('syllabus')}
              className={`px-4 py-2.5 border text-xs font-bold rounded-xl cursor-pointer transition-all ${
                isDarkMode 
                  ? 'bg-violet-950/80 hover:bg-violet-900 border-violet-500/40 text-violet-200' 
                  : 'bg-white hover:bg-violet-100/70 border-violet-200 text-violet-900 shadow-sm'
              }`}
            >
              📚 Class 1–12 Syllabus Hub
            </button>
            <button
              onClick={() => onNavigateTab('resume')}
              className={`px-4 py-2.5 border text-xs font-bold rounded-xl cursor-pointer transition-all ${
                isDarkMode 
                  ? 'bg-violet-950/80 hover:bg-violet-900 border-violet-500/40 text-violet-200' 
                  : 'bg-white hover:bg-violet-100/70 border-violet-200 text-violet-900 shadow-sm'
              }`}
            >
              📄 ATS Resume Scorer
            </button>
            <button
              onClick={() => onNavigateTab('business')}
              className={`px-4 py-2.5 border text-xs font-bold rounded-xl cursor-pointer transition-all ${
                isDarkMode 
                  ? 'bg-violet-950/80 hover:bg-violet-900 border-violet-500/40 text-violet-200' 
                  : 'bg-white hover:bg-violet-100/70 border-violet-200 text-violet-900 shadow-sm'
              }`}
            >
              🏦 MSME & Mudra Loan Hub
            </button>
            <button
              onClick={() => onNavigateTab('schemes')}
              className={`px-4 py-2.5 border text-xs font-bold rounded-xl cursor-pointer transition-all ${
                isDarkMode 
                  ? 'bg-violet-950/80 hover:bg-violet-900 border-violet-500/40 text-violet-200' 
                  : 'bg-white hover:bg-violet-100/70 border-violet-200 text-violet-900 shadow-sm'
              }`}
            >
              🏛️ Sarkari Schemes & PwD
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ArohiGuideView;
