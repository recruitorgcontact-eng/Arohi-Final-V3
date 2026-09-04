import React, { useState } from 'react';
import { 
  GraduationCap, Briefcase, HeartHandshake, Building2, Tractor, Sparkles, 
  Code, Video, Search, BookOpen, Laptop, Stethoscope, Scale, TrendingUp, 
  Home, UserCheck, Globe, Rocket, ShoppingBag, ShieldCheck, Users, Palette, 
  ArrowRight, CheckCircle2, ChevronRight, Mic, Shield, Award, FileText, 
  ArrowLeft, MessageSquare, ChevronDown, ChevronUp, Share2, Check,
  ExternalLink, Sparkle
} from 'lucide-react';
import { TargetAudienceSEO, TARGET_AUDIENCES_SEO } from '../data/seoAudienceData';
import { Language } from '../translations';

interface AudienceLandingPageProps {
  audience: TargetAudienceSEO;
  isDarkMode: boolean;
  language: Language;
  onNavigateToTab: (tab: string, initialPrompt?: string) => void;
  onSelectAudience: (slug: string) => void;
  onOpenDirectory: () => void;
}

export default function AudienceLandingPage({
  audience,
  isDarkMode,
  language,
  onNavigateToTab,
  onSelectAudience,
  onOpenDirectory
}: AudienceLandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Icon dynamic selector helper
  const renderAudienceIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Tractor': return <Tractor className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Video': return <Video className={className} />;
      case 'Search': return <Search className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Laptop': return <Laptop className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'Scale': return <Scale className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Home': return <Home className={className} />;
      case 'UserCheck': return <UserCheck className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Rocket': return <Rocket className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Palette': return <Palette className={className} />;
      default: return <Sparkle className={className} />;
    }
  };

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {}
  };

  // Structured Schema.org JSON-LD for this individual audience page
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://arohiai.com/audience/${audience.slug}`,
        "url": `https://arohiai.com/audience/${audience.slug}`,
        "name": `${audience.title} - Arohi AI Opportunity Engine`,
        "description": audience.metaDescription,
        "isPartOf": {
          "@type": "WebSite",
          "name": "Arohi AI",
          "url": "https://arohiai.com"
        },
        "about": {
          "@type": "Thing",
          "name": audience.title,
          "description": audience.shortDesc
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": audience.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  // Find other audiences for rich internal linking
  const otherAudiences = TARGET_AUDIENCES_SEO.filter(a => a.slug !== audience.slug).slice(0, 6);

  return (
    <div className={`min-h-screen py-6 px-3 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#070814] text-slate-100' : 'bg-[#f8f9fe] text-slate-900'
    }`}>
      {/* Inject Structured Data for Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-2 text-xs font-semibold">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-slate-400">
            <button
              onClick={() => onNavigateToTab('home')}
              className="hover:text-purple-400 transition-colors flex items-center gap-1 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 shrink-0 text-slate-600" />
            <button
              onClick={onOpenDirectory}
              className="hover:text-purple-400 transition-colors shrink-0"
            >
              Target Audiences (20+)
            </button>
            <ChevronRight className="w-3 h-3 shrink-0 text-slate-600" />
            <span className="text-purple-400 font-bold truncate max-w-[200px] sm:max-w-none">
              {audience.title}
            </span>
          </div>

          <button
            onClick={handleCopyShare}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
              isDarkMode 
                ? 'bg-[#15102a] border-[#2e2354] hover:bg-[#1d163d] text-slate-300' 
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
            }`}
            title="Share this tailored portal"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Share Hub</span>
              </>
            )}
          </button>
        </nav>

        {/* Hero Section */}
        <header className={`relative p-6 sm:p-10 rounded-3xl border overflow-hidden shadow-2xl ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#130d2d] via-[#0d0a21] to-[#080616] border-[#31255e]' 
            : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50/60 border-purple-200/80 shadow-purple-500/5'
        }`}>
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-500/15 border border-purple-500/30 text-purple-400">
                  {audience.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  isDarkMode ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}>
                  {audience.badge}
                </span>
              </div>

              <div className="flex items-start sm:items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 shrink-0">
                  {renderAudienceIcon(audience.iconName, "w-8 h-8")}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  {audience.heroHeadline}
                </h1>
              </div>

              <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {audience.shortDesc}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigateToTab('chat', audience.targetPrompt)}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center gap-2.5 shadow-lg shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-purple-200 animate-pulse" />
                  <span>Ask Arohi Voice AI (Instant)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateToTab(audience.recommendedTab)}
                  className={`px-5 py-3.5 rounded-2xl text-sm font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                    isDarkMode
                      ? 'bg-[#1b143d] hover:bg-[#251c52] border-[#382b75] text-purple-200'
                      : 'bg-white hover:bg-slate-50 border-purple-300 text-purple-900 shadow-sm'
                  }`}
                >
                  <span>Open {audience.recommendedTab.toUpperCase()} Tool</span>
                  <ExternalLink className="w-4 h-4 text-purple-400" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 4 Key Benefits Section */}
        <section aria-labelledby="key-benefits-heading" className="space-y-4">
          <h2 id="key-benefits-heading" className="text-lg sm:text-xl font-black flex items-center gap-2 tracking-tight">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Why {audience.title} Choose Arohi AI</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {audience.keyBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex items-start gap-3.5 transition-all ${
                  isDarkMode 
                    ? 'bg-[#0f0b24] border-[#221845] hover:border-purple-500/40' 
                    : 'bg-white border-slate-200/80 hover:border-purple-300 shadow-sm'
                }`}
              >
                <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Specialized Tools Section */}
        <section aria-labelledby="core-tools-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="core-tools-heading" className="text-lg sm:text-xl font-black flex items-center gap-2 tracking-tight">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>Recommended Ecosystem Tools for You</span>
            </h2>
            <span className="text-xs font-bold text-slate-400">100% Free & Live</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {audience.coreTools.map((tool, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateToTab(tool.tab)}
                className={`p-6 rounded-2xl border flex flex-col justify-between gap-4 transition-all group cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gradient-to-b from-[#120e29] to-[#090717] border-[#251b4c] hover:border-purple-500/60 hover:shadow-[0_4px_25px_rgba(124,58,237,0.15)]' 
                    : 'bg-white border-slate-200 hover:border-purple-400 hover:shadow-md'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {tool.icon === 'BookOpen' && <BookOpen className="w-5 h-5" />}
                    {tool.icon === 'Award' && <Award className="w-5 h-5" />}
                    {tool.icon === 'Mic' && <Mic className="w-5 h-5" />}
                    {tool.icon === 'FileText' && <FileText className="w-5 h-5" />}
                    {tool.icon === 'Video' && <Video className="w-5 h-5" />}
                    {tool.icon === 'Briefcase' && <Briefcase className="w-5 h-5" />}
                    {tool.icon === 'Building2' && <Building2 className="w-5 h-5" />}
                    {tool.icon === 'Shield' && <Shield className="w-5 h-5" />}
                    {tool.icon === 'Code' && <Code className="w-5 h-5" />}
                    {tool.icon === 'Globe' && <Globe className="w-5 h-5" />}
                    {tool.icon === 'Rocket' && <Rocket className="w-5 h-5" />}
                    {tool.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                    {tool.icon === 'Scale' && <Scale className="w-5 h-5" />}
                    {!['BookOpen', 'Award', 'Mic', 'FileText', 'Video', 'Briefcase', 'Building2', 'Shield', 'Code', 'Globe', 'Rocket', 'TrendingUp', 'Scale'].includes(tool.icon) && <Sparkles className="w-5 h-5" />}
                  </div>
                  <h3 className={`text-base font-black tracking-tight transition-colors ${
                    isDarkMode ? 'text-white group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-700'
                  }`}>
                    {tool.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {tool.desc}
                  </p>
                </div>

                <div className={`flex items-center gap-1.5 text-xs font-black group-hover:translate-x-1 transition-transform ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  <span>Launch Tool</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* High-Ranking Google FAQ Accordion Section (FAQPage Schema) */}
        <section aria-labelledby="faqs-heading" className="space-y-4">
          <div className="space-y-1">
            <h2 id="faqs-heading" className="text-lg sm:text-xl font-black flex items-center gap-2 tracking-tight">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>Frequently Asked Questions & Expert Guidance</span>
            </h2>
            <p className="text-xs text-slate-400">
              Direct answers matching Google search queries and official compliance guidelines.
            </p>
          </div>

          <div className="space-y-3">
            {audience.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDarkMode 
                      ? 'bg-[#0f0b24] border-[#221845]' 
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-sm cursor-pointer hover:text-purple-400 transition-colors"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className={`px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                      isDarkMode ? 'text-slate-300 border-[#1c1438]' : 'text-slate-600 border-slate-100'
                    }`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Popular Google Search Queries for this Audience */}
        <section aria-labelledby="popular-queries-heading" className="space-y-3">
          <h3 id="popular-queries-heading" className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Popular High-Intent Search Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {audience.popularSearches.map((search, idx) => (
              <button
                key={idx}
                onClick={() => onNavigateToTab('chat', `Tell me everything about: "${search}"`)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#100c26] border-[#231a4c] hover:border-purple-500 text-slate-300 hover:text-white' 
                    : 'bg-white border-slate-200 hover:border-purple-400 text-slate-700 hover:text-purple-900 shadow-sm'
                }`}
              >
                <Search className="w-3 h-3 text-purple-400" />
                <span>{search}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Dense Internal Linking to Other Target Audiences */}
        <section aria-labelledby="other-audiences-heading" className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDarkMode ? 'bg-[#0a0718] border-[#1f163f]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 id="other-audiences-heading" className="text-base sm:text-lg font-black tracking-tight">
                Explore Other Target Audiences
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Arohi AI supports 20+ specialized target personas across India and the globe.
              </p>
            </div>
            <button
              onClick={onOpenDirectory}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>View All 22+ Hubs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherAudiences.map((other) => (
              <button
                key={other.slug}
                onClick={() => {
                  onSelectAudience(other.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer group ${
                  isDarkMode 
                    ? 'bg-[#110d2c] border-[#251c52] hover:border-purple-500/50 hover:bg-[#18123d]' 
                    : 'bg-white border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 shadow-sm'
                }`}
              >
                <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                  {renderAudienceIcon(other.iconName, "w-4 h-4")}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={`text-xs font-black truncate transition-colors ${
                    isDarkMode ? 'text-slate-100 group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-700'
                  }`}>
                    {other.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">
                    {other.category}
                  </p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 shrink-0" />
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
