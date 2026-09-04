import React, { useEffect, useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Sparkles, 
  Building2, 
  ExternalLink, 
  FileText, 
  Award, 
  Users,
  Search,
  CheckCircle2
} from 'lucide-react';
import { 
  MISSION_87_LANGUAGES_SEO, 
  STATE_DEPLOYMENT_SEO_LIST, 
  Mission87LanguageSEO, 
  StateDeploymentSEO 
} from '../../data/mission87SeoData';

interface Mission87RegionalSEOHubProps {
  onOpenChatWithPrompt?: (prompt: string) => void;
  onSelectState?: (state: string) => void;
  isDarkMode?: boolean;
}

export default function Mission87RegionalSEOHub({
  onOpenChatWithPrompt,
  onSelectState,
  isDarkMode = true
}: Mission87RegionalSEOHubProps) {
  const [selectedLang, setSelectedLang] = useState<string>('hi');
  const [selectedStateName, setSelectedStateName] = useState<string>('Uttar Pradesh');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('All');

  // Detect URL parameter for state or language deep linking (e.g. ?state=odisha or ?lang=or)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const stateParam = urlParams.get('state');
      const langParam = urlParams.get('lang');

      if (langParam) {
        const matchedLang = MISSION_87_LANGUAGES_SEO.find(
          l => l.langCode.toLowerCase() === langParam.toLowerCase()
        );
        if (matchedLang) {
          setSelectedLang(matchedLang.langCode);
        }
      }

      if (stateParam) {
        const formatted = stateParam.replace(/-/g, ' ').toLowerCase();
        const matchedState = STATE_DEPLOYMENT_SEO_LIST.find(
          s => s.state.toLowerCase() === formatted
        );
        if (matchedState) {
          setSelectedStateName(matchedState.state);
        }
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  // Update dynamic document title & meta tags when language or state changes in view
  useEffect(() => {
    const currentLangData = MISSION_87_LANGUAGES_SEO.find(l => l.langCode === selectedLang) || MISSION_87_LANGUAGES_SEO[0];
    const currentStateData = STATE_DEPLOYMENT_SEO_LIST.find(s => s.state === selectedStateName) || STATE_DEPLOYMENT_SEO_LIST[0];

    if (currentLangData && currentStateData) {
      // Dynamic Title
      document.title = `${currentLangData.metaTitle} | ${currentStateData.state} Focus (Arohi AI)`;

      // Dynamic Meta Description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${currentLangData.metaDescription} Regional deployment active in ${currentStateData.state} (${currentStateData.targetDistricts.slice(0, 3).join(', ')}).`);
      }
    }
  }, [selectedLang, selectedStateName]);

  const activeLang = MISSION_87_LANGUAGES_SEO.find(l => l.langCode === selectedLang) || MISSION_87_LANGUAGES_SEO[0];
  const activeState = STATE_DEPLOYMENT_SEO_LIST.find(s => s.state === selectedStateName) || STATE_DEPLOYMENT_SEO_LIST[0];

  const filteredStates = STATE_DEPLOYMENT_SEO_LIST.filter(st => {
    const matchesSearch = st.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.targetDistricts.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      st.keyIndustries.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRegion = selectedRegionFilter === 'All' || st.region === selectedRegionFilter;
    return matchesSearch && matchesRegion;
  });

  const handleStateClick = (stateObj: StateDeploymentSEO) => {
    setSelectedStateName(stateObj.state);
    if (onSelectState) {
      onSelectState(stateObj.state);
    }
  };

  return (
    <section id="mission87-regional-hub" className="w-full space-y-8 text-left scroll-mt-20">
      
      {/* Header Section */}
      <div className={`space-y-2 border-b pb-4 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-500">
            <Globe className="w-4 h-4 text-cyan-500" />
            <span>ALL-INDIA 28 STATES & 8 UTs PAN-BHARAT DEPLOYMENT</span>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
            isDarkMode 
              ? 'text-slate-400 bg-white/[0.05] border-white/10' 
              : 'text-slate-600 bg-slate-100 border-slate-200'
          }`}>
            12+ Languages • 700+ Districts Indexed
          </span>
        </div>
        
        <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Pan-India Regional Activation Radar
        </h2>
        <p className={`text-xs sm:text-sm max-w-3xl font-medium leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Access state-specific micro-enterprise blueprints, regional government subsidy alignments (PMEGP, Stand-Up India, Mudra, State Startup Policies), and district-level economic opportunities in your native mother tongue.
        </p>
      </div>

      {/* Multilingual Selector Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Select Your Preferred Regional Language:
          </span>
          <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Active: <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{activeLang.nameEnglish} ({activeLang.nativeName})</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
          {MISSION_87_LANGUAGES_SEO.map((lang) => {
            const isSelected = lang.langCode === selectedLang;
            return (
              <button
                key={lang.langCode}
                onClick={() => setSelectedLang(lang.langCode)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg scale-105'
                    : isDarkMode 
                      ? 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{lang.nativeName}</span>
                <span className={`text-[10px] opacity-80 ${
                  isSelected 
                    ? 'text-slate-950 font-extrabold' 
                    : isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  ({lang.nameEnglish})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Language Manifesto Card */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0e0a29] via-[#091538] to-[#041d24] border border-amber-400/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 uppercase tracking-widest font-mono">
            {activeLang.nameEnglish.toUpperCase()} REGIONAL MANIFESTO
          </span>
          <span className="text-[11px] text-cyan-300 font-semibold">
            {activeLang.callToAction}
          </span>
        </div>

        <h3 className="text-base sm:text-xl font-black text-white leading-snug">
          "{activeLang.metaTitle}"
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
          {activeLang.metaDescription}
        </p>

        <blockquote className="p-3 rounded-xl bg-black/40 border-l-4 border-amber-400 text-xs text-amber-200 italic font-medium">
          "{activeLang.coreTagline}"
        </blockquote>

        {/* Primary Regional Keywords Tags */}
        <div className="pt-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Key Regional Search Phrases:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeLang.primaryKeywords.map((kw, i) => (
              <span
                key={i}
                className="text-[10.5px] font-semibold px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* State & UT Explorer Search + Filters */}
      <div className="space-y-4 pt-4">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by state, district (e.g. Varanasi, Sambalpur, Coimbatore), or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none transition-colors border ${
                isDarkMode 
                  ? 'bg-[#09061c] border-purple-500/30 text-white focus:border-cyan-400' 
                  : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-500 shadow-sm'
              }`}
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'North', 'South', 'East', 'West', 'Central', 'Northeast', 'UT'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegionFilter(region)}
                className={`px-3 py-1.5 rounded-xl text-[10.5px] font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegionFilter === region
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : isDarkMode 
                      ? 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-400' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* State Interactive Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5 max-h-[300px] overflow-y-auto p-2 rounded-2xl border scrollbar-thin ${
          isDarkMode 
            ? 'bg-[#060415] border-white/[0.06] scrollbar-thumb-white/10' 
            : 'bg-slate-50 border-slate-200 shadow-inner'
        }`}>
          {filteredStates.map((st) => {
            const isSelected = st.state === selectedStateName;
            return (
              <button
                key={st.state}
                onClick={() => handleStateClick(st)}
                className={`p-2.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-900/60 to-purple-900/60 border-2 border-cyan-400 shadow-md'
                    : isDarkMode 
                      ? 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06]' 
                      : 'bg-white hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    isSelected 
                      ? 'bg-cyan-400 text-slate-950' 
                      : isDarkMode ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-600 font-bold'
                  }`}>
                    {st.region}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />}
                </div>

                <p className={`text-xs font-black truncate ${
                  isSelected 
                    ? 'text-white' 
                    : isDarkMode ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  {st.state}
                </p>

                <p className={`text-[9.5px] truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Cap: {st.stateCapital}
                </p>
              </button>
            );
          })}
        </div>

      </div>

      {/* Selected State Detailed Blueprint Showcase */}
      {activeState && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c0722] via-[#0b1436] to-[#041e21] border-2 border-cyan-400/50 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {activeState.state} Youth Economic Blueprint
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase">
                  {activeState.region} Zone
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                State Capital: <strong className="text-white">{activeState.stateCapital}</strong> • Key Focus Hubs: {activeState.targetDistricts.join(', ')}
              </p>
            </div>

            <button
              onClick={() => {
                if (onOpenChatWithPrompt) {
                  onOpenChatWithPrompt(`I want to start a youth micro-enterprise in ${activeState.state} (focus districts: ${activeState.targetDistricts.join(', ')}). Based on state industries (${activeState.keyIndustries.join(', ')}) and schemes (${activeState.schemesAligned.join(', ')}), give me a step-by-step ₹5K to ₹50K monthly launch plan.`);
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:scale-105 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Launch {activeState.state} Roadmap in AI</span>
            </button>
          </div>

          {/* 3 Column State Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            {/* Target Districts Hub */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2">
              <div className="text-amber-300 font-black uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Target Activation Districts:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeState.targetDistricts.map((dist, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 font-bold text-[11px]"
                  >
                    📍 {dist}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 pt-1">
                Priority hubs identified for grassroots micro-manufacturing and digital agency networks.
              </p>
            </div>

            {/* Key Regional Industries */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2">
              <div className="text-cyan-300 font-black uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                Key Economic Strengths:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeState.keyIndustries.map((ind, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 font-bold text-[11px]"
                  >
                    ⚡ {ind}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 pt-1">
                Sectors with immediate localized demand and high margin export potential.
              </p>
            </div>

            {/* Government Schemes & Subsidies */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2">
              <div className="text-emerald-300 font-black uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                Aligned Financial Schemes:
              </div>
              <ul className="space-y-1 text-[11px] text-slate-200 font-medium">
                {activeState.schemesAligned.map((scheme, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{scheme}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-slate-400 pt-1">
                Pre-configured DPR project report templates ready in Arohi ONE Business OS.
              </p>
            </div>

          </div>

          {/* Quick Deep Link URL Preview */}
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-300 font-mono">
            <span className="text-[11px] text-slate-400">
              Canonical State SEO Link: <span className="text-cyan-300">https://arohiai.com/mission-87?state={activeState.state.toLowerCase().replace(/\s+/g, '-')}</span>
            </span>
            <button
              onClick={() => {
                const url = `${window.location.origin}/mission-87?state=${activeState.state.toLowerCase().replace(/\s+/g, '-')}`;
                navigator.clipboard.writeText(url);
                alert(`Copied link for ${activeState.state}!`);
              }}
              className="text-xs text-amber-300 hover:text-amber-200 underline font-sans font-bold cursor-pointer"
            >
              Copy Regional Link
            </button>
          </div>

        </div>
      )}

    </section>
  );
}
