// Arohi Saksham - Comprehensive Government Welfare & Legal Protections Explorer for Divyangjan
// Integrated Voice Readout, Portal Links, and Instant Arohi AI Consultation

import React, { useState, useMemo } from 'react';
import { 
  DIVYANGJAN_SCHEMES_DIRECTORY, 
  DivyangjanScheme 
} from '../../data/divyangjanSchemesData';
import { 
  Search, 
  Filter, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Phone, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Award,
  HeartHandshake
} from 'lucide-react';
import { playArohiVoice, stopArohiVoice, sanitizeSpeechText } from '../../utils/arohiVoicePlayer';

interface DivyangjanSchemesExplorerProps {
  isDarkMode?: boolean;
  highContrast?: boolean;
  onConsultSchemeInAI?: (schemeTitle: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Schemes & Rights', icon: '🏛️' },
  { id: 'assistive-devices', label: 'ADIP Free Devices', icon: '♿' },
  { id: 'financial-aid', label: 'UDID & Low Interest Loans', icon: '💰' },
  { id: 'employment', label: '4% Job Reservation', icon: '💼' },
  { id: 'education', label: 'Scribe & Fellowships', icon: '🎓' },
  { id: 'concessions', label: 'Train & Tax Relief', icon: '🚆' },
  { id: 'health-insurance', label: 'Cashless Health Insurance', icon: '🏥' }
];

export const DivyangjanSchemesExplorer: React.FC<DivyangjanSchemesExplorerProps> = ({
  isDarkMode = false,
  highContrast = false,
  onConsultSchemeInAI
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSpeakingSchemeId, setActiveSpeakingSchemeId] = useState<string | null>(null);
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return DIVYANGJAN_SCHEMES_DIRECTORY.filter(scheme => {
      const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        scheme.title.toLowerCase().includes(q) ||
        scheme.hindiTitle.toLowerCase().includes(q) ||
        scheme.odiaTitle.toLowerCase().includes(q) ||
        scheme.shortSummary.toLowerCase().includes(q) ||
        scheme.tags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Voice playback of scheme details
  const handleToggleVoice = (scheme: DivyangjanScheme) => {
    if (activeSpeakingSchemeId === scheme.id) {
      stopArohiVoice();
      setActiveSpeakingSchemeId(null);
      return;
    }

    stopArohiVoice();
    setActiveSpeakingSchemeId(scheme.id);

    const speechScript = `Namaste! Here are the official details for ${scheme.title}. Administered by ${scheme.ministry}. Summary: ${scheme.shortSummary}. Key benefits include: ${scheme.keyBenefits.join('. ')}. Eligibility criteria: ${scheme.eligibility.join('. ')}. To apply or learn more, visit ${scheme.applicationPortal}. For personalized guidance, consult Arohi Saksham AI.`;

    playArohiVoice(sanitizeSpeechText(speechScript), {
      voice: 'Aoede',
      language: 'en-IN',
      onStart: () => setActiveSpeakingSchemeId(scheme.id),
      onEnd: () => setActiveSpeakingSchemeId(null),
      onError: () => setActiveSpeakingSchemeId(null)
    });
  };

  return (
    <div className="w-full space-y-8 font-sans">
      
      {/* Header Info Banner */}
      <div className={`p-6 rounded-3xl border transition-all ${
        highContrast
          ? 'bg-zinc-950 border-amber-500 text-amber-300'
          : isDarkMode
            ? 'bg-gradient-to-br from-emerald-950/40 via-[#0a1410] to-[#070b0d] border-emerald-500/20 text-white'
            : 'bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-emerald-200/70 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Government Frameworks &amp; Welfare Acts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Divyangjan Government Schemes &amp; Rights Directory
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore all central and state welfare provisions: 100% free aids under ADIP, universal digital UDID cards, 4% RPwD reservation, 20 min/hour exam scribe norms, and 4% concessional business loans.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.swavlambancard.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Apply for UDID Card</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://disabilityaffairs.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>DEPwD Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scheme name, keyword (ADIP, UDID, Scribe, Railway, Loan, Reservation)..."
            className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm transition-all focus:outline-none ${
              highContrast
                ? 'bg-black text-amber-300 border-amber-500 focus:border-amber-300'
                : isDarkMode
                  ? 'bg-[#101720] text-white border-white/10 focus:border-emerald-500'
                  : 'bg-white text-slate-900 border-slate-300 focus:border-emerald-500'
            }`}
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  isSelected
                    ? highContrast
                      ? 'bg-amber-400 text-black'
                      : 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : highContrast
                      ? 'bg-zinc-900 text-amber-300 border border-amber-500/40 hover:bg-zinc-800'
                      : isDarkMode
                        ? 'bg-[#131b24] text-slate-300 border border-white/8 hover:bg-[#1a2533]'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => {
          const isSpeaking = activeSpeakingSchemeId === scheme.id;
          const isExpanded = expandedSchemeId === scheme.id;

          return (
            <div
              key={scheme.id}
              className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                highContrast
                  ? 'bg-zinc-950 border-amber-500 text-amber-300'
                  : isDarkMode
                    ? 'bg-[#111722]/90 border-white/8 hover:border-emerald-500/40 text-slate-100 hover:shadow-xl'
                    : 'bg-white border-slate-200/80 hover:border-emerald-500/40 text-slate-900 hover:shadow-xl'
              }`}
            >
              <div className="space-y-4">
                {/* Ministry & Audio Pill */}
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {scheme.ministry}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleVoice(scheme)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isSpeaking
                        ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                        : 'bg-black/5 dark:bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-500 border-black/5 dark:border-white/10'
                    }`}
                    title={isSpeaking ? 'Stop voice readout' : 'Read aloud with Arohi Voice'}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-black tracking-tight leading-snug">
                    {scheme.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {scheme.hindiTitle} · {scheme.odiaTitle}
                  </p>
                </div>

                {/* Short Summary */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {scheme.shortSummary}
                </p>

                {/* Key Benefits */}
                <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Primary Statutory Benefits:</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {scheme.keyBenefits.map((ben, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expanded Details: Eligibility & Documents */}
                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t border-black/5 dark:border-white/5 animate-in fade-in">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                        Eligibility Criteria:
                      </h5>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        {scheme.eligibility.map((el, eIdx) => (
                          <li key={eIdx}>{el}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                        Required Documents:
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {scheme.documentsRequired.map((doc, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-[11px] text-slate-600 dark:text-slate-400 border border-black/5 dark:border-white/5"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {scheme.officialHelpline && (
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Official Helpline: {scheme.officialHelpline}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {isExpanded ? 'Show Less ↑' : 'View Full Details & Docs ↓'}
                </button>

                <div className="flex items-center gap-2">
                  {onConsultSchemeInAI && (
                    <button
                      type="button"
                      onClick={() => onConsultSchemeInAI(scheme.title)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      <span>Ask Arohi AI</span>
                    </button>
                  )}

                  <a
                    href={scheme.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
          <p className="text-base font-bold text-slate-500">No schemes matched your search.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
