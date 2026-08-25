import React, { useState } from 'react';
import { 
  ChevronRight, MapPin, Building, GraduationCap, Award, 
  Layers, BookOpen, Share2, Check, ExternalLink, Code2, Globe
} from 'lucide-react';
import { KGBreadcrumbItem, KGLevel, ExamSEOMetadata } from '../../types/examTypes';

interface ExamKGBreadcrumbsProps {
  breadcrumbs: KGBreadcrumbItem[];
  canonicalPath?: string;
  seoMeta?: ExamSEOMetadata;
  isDarkMode?: boolean;
  onSelectLevel?: (level: KGLevel, id: string, slug: string) => void;
  className?: string;
}

export default function ExamKGBreadcrumbs({
  breadcrumbs,
  canonicalPath,
  seoMeta,
  isDarkMode = true,
  onSelectLevel,
  className = ''
}: ExamKGBreadcrumbsProps) {
  const [copied, setCopied] = useState(false);
  const [showJsonLd, setShowJsonLd] = useState(false);

  const getLevelIcon = (level: KGLevel) => {
    switch (level) {
      case 'country':
        return <Globe className="w-3.5 h-3.5 text-blue-400" />;
      case 'state':
        return <MapPin className="w-3.5 h-3.5 text-amber-400" />;
      case 'authority':
        return <Building className="w-3.5 h-3.5 text-purple-400" />;
      case 'exam':
        return <Award className="w-3.5 h-3.5 text-rose-400" />;
      case 'stage':
        return <Layers className="w-3.5 h-3.5 text-cyan-400" />;
      case 'subject':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <GraduationCap className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const getLevelBadgeClass = (level: KGLevel) => {
    if (isDarkMode) {
      switch (level) {
        case 'country': return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
        case 'state': return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
        case 'authority': return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
        case 'exam': return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
        case 'stage': return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
        case 'subject': return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      }
    }
    switch (level) {
      case 'country': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'state': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'authority': return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'exam': return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'stage': return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'subject': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
  };

  const handleCopyCanonical = () => {
    const fullUrl = `https://arohiai.com${canonicalPath || (breadcrumbs.length ? breadcrumbs[breadcrumbs.length - 1].url : '')}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Dynamic Breadcrumbs Bar */}
      <nav aria-label="Knowledge Graph Hierarchy" className={`p-2.5 sm:p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-2 shadow-sm ${
        isDarkMode 
          ? 'bg-[#120d2a]/90 border-purple-500/30 backdrop-blur-md' 
          : 'bg-white/95 border-slate-200 backdrop-blur-md shadow-sm'
      }`}>
        {/* Breadcrumb Steps */}
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={`${item.level}-${item.id}`} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`} />
                )}

                <button
                  type="button"
                  onClick={() => onSelectLevel?.(item.level, item.id, item.slug)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all cursor-pointer text-left ${
                    isLast
                      ? isDarkMode
                        ? 'bg-purple-600/30 text-purple-200 font-black border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                        : 'bg-purple-100 text-purple-950 font-black border border-purple-300'
                      : isDarkMode
                      ? 'hover:bg-white/10 text-slate-300 hover:text-white font-medium'
                      : 'hover:bg-slate-100 text-slate-800 hover:text-slate-950 font-semibold'
                  }`}
                  title={`View all exams under ${item.label} (${item.level})`}
                >
                  <span className="shrink-0">{getLevelIcon(item.level)}</span>
                  <span className="truncate max-w-[140px] sm:max-w-[220px]">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded-md border ${getLevelBadgeClass(item.level)}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {/* SEO Tools & Canonical Copy */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto pt-1 sm:pt-0">
          {seoMeta?.structuredDataJsonLd && (
            <button
              type="button"
              onClick={() => setShowJsonLd(!showJsonLd)}
              className={`p-1.5 rounded-lg border text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                showJsonLd
                  ? isDarkMode ? 'bg-purple-600 text-white border-purple-400' : 'bg-purple-600 text-white border-purple-700'
                  : isDarkMode ? 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/10' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title="Inspect Schema.org JSON-LD Structured Data"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">JSON-LD</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyCanonical}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : isDarkMode
                ? 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
            }`}
            title="Copy SEO Canonical URL link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>SEO URL Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy Canonical URL</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* JSON-LD Inspector Drawer */}
      {showJsonLd && seoMeta?.structuredDataJsonLd && (
        <div className={`p-4 rounded-2xl border text-xs font-mono overflow-x-auto ${
          isDarkMode ? 'bg-[#0a0718] border-purple-500/40 text-purple-200' : 'bg-slate-900 border-slate-800 text-purple-300'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/20 mb-2">
            <span className="font-bold text-[11px] text-amber-300">Schema.org JSON-LD Structured Data for Search Crawlers</span>
            <span className="text-[10px] text-slate-400">Targeted SEO Landing Engine</span>
          </div>
          <pre className="text-[11px] leading-relaxed">
            {JSON.stringify(seoMeta.structuredDataJsonLd, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
