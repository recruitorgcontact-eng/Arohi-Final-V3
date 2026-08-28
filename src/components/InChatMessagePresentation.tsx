import React, { useState } from 'react';
import {
  Presentation,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  FileText,
  Layers,
  CheckCircle2,
  Share2,
  Eye,
  Sliders,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Palette
} from 'lucide-react';
import {
  PresentationData,
  SlideData,
  PresentationChartData,
  exportToPPTX,
  exportToPDF,
  resolvePresentationTheme,
  PRESENTATION_THEMES,
  PresentationThemeKey
} from '../lib/documentExporter';

interface InChatMessagePresentationProps {
  presentationData: PresentationData;
  isDarkMode: boolean;
}

/**
 * Clean In-Slide Interactive Chart Renderer for Bar, Column, Line, Pie, and Doughnut
 */
function SlideChartRenderer({
  chart,
  themeColors,
  isDarkMode
}: {
  chart: PresentationChartData;
  themeColors: string[];
  isDarkMode: boolean;
}) {
  const labels = chart.labels || [];
  const datasets = chart.datasets || [];
  const primaryDataset = datasets[0] || { values: [] };
  const values = primaryDataset.values || [];
  const maxVal = Math.max(...values, 1);
  const totalVal = values.reduce((a, b) => a + b, 0) || 1;

  if (chart.type === 'pie' || chart.type === 'doughnut') {
    // Calculate SVG pie slices / doughnut segments
    let cumulativePercent = 0;
    const slices = values.map((val, idx) => {
      const percent = (val / totalVal) * 100;
      const startAngle = (cumulativePercent / 100) * 360;
      cumulativePercent += percent;
      const endAngle = (cumulativePercent / 100) * 360;
      const color = themeColors[idx % themeColors.length] || '7C3AED';

      // SVG Arc calculation
      const x1 = 50 + 40 * Math.cos((Math.PI * (startAngle - 90)) / 180);
      const y1 = 50 + 40 * Math.sin((Math.PI * (startAngle - 90)) / 180);
      const x2 = 50 + 40 * Math.cos((Math.PI * (endAngle - 90)) / 180);
      const y2 = 50 + 40 * Math.sin((Math.PI * (endAngle - 90)) / 180);
      const largeArc = percent > 50 ? 1 : 0;
      const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;

      return {
        pathData,
        color: `#${color}`,
        label: labels[idx] || `Item ${idx + 1}`,
        value: val,
        percent: Math.round(percent)
      };
    });

    return (
      <div className="p-3.5 rounded-xl border bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.08] flex flex-col items-center">
        {chart.title && (
          <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-2 text-center flex items-center gap-1.5">
            <PieChartIcon className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>{chart.title}</span>
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <div className="relative w-28 h-28 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {slices.map((s, idx) => (
                <path
                  key={idx}
                  d={s.pathData}
                  fill={s.color}
                  className="transition-all hover:opacity-80 cursor-pointer"
                />
              ))}
              {chart.type === 'doughnut' && (
                <circle cx="50" cy="50" r="22" className="fill-white dark:fill-[#0d091e]" />
              )}
            </svg>
          </div>
          <div className="flex flex-col gap-1.5 text-[11px] max-w-[170px]">
            {slices.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-zinc-600 dark:text-zinc-400 truncate">{s.label}:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{s.value} ({s.percent}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (chart.type === 'line') {
    const points = values.map((val, idx) => {
      const x = (idx / Math.max(values.length - 1, 1)) * 260 + 20;
      const y = 110 - (val / maxVal) * 80;
      return { x, y, val, label: labels[idx] };
    });
    const polylineStr = points.map((p) => `${p.x},${p.y}`).join(' ');
    const primaryColor = `#${themeColors[0] || '7C3AED'}`;

    return (
      <div className="p-3.5 rounded-xl border bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.08]">
        {chart.title && (
          <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>{chart.title}</span>
          </div>
        )}
        <div className="w-full h-32 relative">
          <svg viewBox="0 0 300 130" className="w-full h-full">
            {/* Horizontal Grid lines */}
            <line x1="20" y1="30" x2="280" y2="30" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeDasharray="3 3" />
            <line x1="20" y1="70" x2="280" y2="70" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeDasharray="3 3" />
            <line x1="20" y1="110" x2="280" y2="110" stroke="currentColor" className="text-zinc-300 dark:text-zinc-700" />

            {/* Line */}
            <polyline
              fill="none"
              stroke={primaryColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylineStr}
            />

            {/* Points & Labels */}
            {points.map((p, idx) => (
              <g key={idx}>
                <circle cx={p.x} cy={p.y} r="4.5" fill={primaryColor} stroke="#FFFFFF" strokeWidth="1.5" />
                <text
                  x={p.x}
                  y={p.y - 8}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  className="fill-zinc-900 dark:fill-zinc-100"
                >
                  {p.val}
                </text>
                <text
                  x={p.x}
                  y="124"
                  textAnchor="middle"
                  fontSize="8"
                  className="fill-zinc-500 dark:fill-zinc-400"
                >
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  // Default: Bar / Column Chart
  return (
    <div className="p-3.5 rounded-xl border bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.08]">
      {chart.title && (
        <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>{chart.title}</span>
          </div>
          {datasets.length > 1 && (
            <span className="text-[10px] text-zinc-400">Multi-series</span>
          )}
        </div>
      )}
      <div className="space-y-2 pt-1">
        {labels.map((label, idx) => {
          const val = values[idx] || 0;
          const pct = Math.round((val / maxVal) * 100);
          const colorHex = `#${themeColors[idx % themeColors.length] || '7C3AED'}`;

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-[140px] font-medium">{label}</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{val}</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(pct, 4)}%`, backgroundColor: colorHex }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function InChatMessagePresentation({
  presentationData,
  isDarkMode
}: InChatMessagePresentationProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const slides = presentationData.slides || [];
  const activeSlide: SlideData = slides[currentSlideIndex] || {
    title: presentationData.title || 'Slide Title',
    bullets: ['Key strategic point 1', 'Key strategic point 2']
  };

  const sampleText = slides.map((s) => `${s.title} ${(s.bullets || []).join(' ')}`).join(' ');
  const initialTheme = resolvePresentationTheme(presentationData.theme, presentationData.title, sampleText);
  const [activeThemeKey, setActiveThemeKey] = useState<PresentationThemeKey>(initialTheme.key);

  const currentTheme = resolvePresentationTheme(activeThemeKey, presentationData.title, sampleText);

  const handleDownloadPPTX = async () => {
    setIsExporting(true);
    try {
      await exportToPPTX(presentationData.title || 'Arohi_Presentation', {
        ...presentationData,
        theme: currentTheme.key
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = () => {
    let markdownDoc = `# ${presentationData.title}\n\n`;
    if (presentationData.subtitle) markdownDoc += `*${presentationData.subtitle}*\n\n`;

    slides.forEach((s, idx) => {
      markdownDoc += `## Slide ${idx + 1}: ${s.title}\n`;
      if (s.subtitle) markdownDoc += `*${s.subtitle}*\n`;
      if (s.bullets) {
        s.bullets.forEach((b) => {
          markdownDoc += `- ${b}\n`;
        });
      }
      if (s.chart) {
        markdownDoc += `\n**Chart: ${s.chart.title || 'Data Overview'}** (${s.chart.type})\n`;
        s.chart.labels.forEach((lbl, lIdx) => {
          markdownDoc += `- ${lbl}: ${s.chart?.datasets?.[0]?.values?.[lIdx] || ''}\n`;
        });
        markdownDoc += '\n';
      }
      if (s.callout) markdownDoc += `> Key Takeaway: ${s.callout}\n`;
      markdownDoc += '\n';
    });

    exportToPDF(
      `${presentationData.title || 'Arohi_Presentation'}_Handout`,
      presentationData.title || 'Arohi AI Presentation Handout',
      markdownDoc
    );
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div
      className={`my-4 rounded-2xl border overflow-hidden transition-all shadow-xl ${
        isDarkMode
          ? 'bg-[#100c24] border-black/40'
          : 'bg-white border-zinc-200'
      }`}
      style={{
        borderColor: `#${currentTheme.brandAccent}40`
      }}
    >
      {/* Deck Header Bar */}
      <div
        className={`px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b ${
          isDarkMode
            ? 'bg-gradient-to-r from-[#1b143c] to-[#120d2c] text-zinc-100 border-white/10'
            : 'bg-gradient-to-r from-zinc-50 to-slate-50 text-zinc-900 border-zinc-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl text-white flex items-center justify-center shadow-xs"
            style={{ backgroundColor: `#${currentTheme.brandAccent}` }}
          >
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `#${currentTheme.brandAccent}20`,
                  color: `#${currentTheme.brandAccent}`
                }}
              >
                {currentTheme.name}
              </span>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {slides.length} Slides
              </span>
            </div>
            <h3 className="text-sm font-bold truncate max-w-xs sm:max-w-md">
              {presentationData.title}
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Theme Selector Dropdown */}
          <div className="relative group">
            <button
              className={`p-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all border ${
                isDarkMode
                  ? 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                  : 'bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200 shadow-xs'
              }`}
              title="Change Theme & Palette"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: `#${currentTheme.brandAccent}` }} />
            </button>
            <div className="absolute right-0 top-full mt-1.5 hidden group-hover:flex flex-col gap-1 p-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-30 min-w-[160px]">
              <div className="text-[10px] font-bold text-zinc-400 px-2 py-1 uppercase">Select Theme</div>
              {Object.values(PRESENTATION_THEMES).map((th) => (
                <button
                  key={th.key}
                  onClick={() => setActiveThemeKey(th.key)}
                  className={`px-2 py-1.5 rounded-lg text-xs text-left font-medium flex items-center gap-2 cursor-pointer transition-all ${
                    activeThemeKey === th.key
                      ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: `#${th.brandAccent}` }}
                  />
                  <span className="truncate">{th.name.split(',')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleExportPDF}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all border ${
              isDarkMode
                ? 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                : 'bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200 shadow-xs'
            }`}
            title="Download PDF Handout"
          >
            <FileText className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button
            onClick={handleDownloadPPTX}
            disabled={isExporting}
            style={{
              backgroundColor: `#${currentTheme.brandAccent}`
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all hover:opacity-90"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>{isExporting ? 'Exporting...' : 'Download .PPTX'}</span>
          </button>
        </div>
      </div>

      {/* Slide Canvas Simulator */}
      <div className="p-3 sm:p-5">
        <div
          className={`relative rounded-xl border p-5 sm:p-6 min-h-[300px] flex flex-col justify-between transition-all ${
            isDarkMode
              ? 'bg-gradient-to-br from-[#0a0718] to-[#140f30] border-white/10 text-white'
              : 'bg-gradient-to-br from-slate-50 to-zinc-50 border-zinc-200 text-zinc-900 shadow-inner'
          }`}
        >
          {/* Slide Top Banner info */}
          <div>
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-2.5 mb-3.5">
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: `#${currentTheme.brandAccent}` }}
              >
                {currentTheme.badgeText}
              </span>
              <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                16:9 Widescreen • Native Charts
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {activeSlide.title}
            </h2>
            {activeSlide.subtitle && (
              <p
                className="text-xs italic mt-0.5 font-medium"
                style={{ color: `#${currentTheme.brandAccent}` }}
              >
                {activeSlide.subtitle}
              </p>
            )}

            {/* Split layout: Bullets & Chart/Metrics */}
            <div className="mt-3.5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Bullets & Metric Left Column */}
              <div className={activeSlide.chart ? 'md:col-span-6 space-y-3' : 'md:col-span-12 space-y-3'}>
                {/* Metric Banner if available */}
                {activeSlide.keyMetric && (
                  <div
                    className="p-3 rounded-xl border inline-block"
                    style={{
                      backgroundColor: `#${currentTheme.brandAccent}15`,
                      borderColor: `#${currentTheme.brandAccent}40`
                    }}
                  >
                    <div
                      className="text-xl font-black"
                      style={{ color: `#${currentTheme.brandAccent}` }}
                    >
                      {activeSlide.keyMetric.value}
                    </div>
                    <div className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">
                      {activeSlide.keyMetric.label}
                    </div>
                  </div>
                )}

                {/* Bullets List */}
                {activeSlide.bullets && activeSlide.bullets.length > 0 && (
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    {activeSlide.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: `#${currentTheme.brandAccent}` }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Chart Right Column if present */}
              {activeSlide.chart && (
                <div className="md:col-span-6">
                  <SlideChartRenderer
                    chart={activeSlide.chart}
                    themeColors={currentTheme.chartColors}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}
            </div>

            {/* Callout box */}
            {activeSlide.callout && (
              <div
                className="mt-4 p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2"
                style={{
                  backgroundColor: `#${currentTheme.brandAccent}10`,
                  borderColor: `#${currentTheme.brandAccent}30`,
                  color: isDarkMode ? '#F8FAFC' : '#0F172A'
                }}
              >
                <Sparkles
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: `#${currentTheme.brandAccent}` }}
                />
                <span>{activeSlide.callout}</span>
              </div>
            )}
          </div>

          {/* Slide Footer */}
          <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            <span className="truncate max-w-[220px] font-semibold">{presentationData.title || 'Executive Presentation'}</span>
            <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
          </div>
        </div>

        {/* Carousel Slide Switcher */}
        <div className="mt-3.5 flex items-center justify-between gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none text-zinc-700 dark:text-zinc-200 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Slide dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[240px] py-1 px-2 scrollbar-none">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                style={{
                  backgroundColor: currentSlideIndex === idx ? `#${currentTheme.brandAccent}` : undefined
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-6 shadow-xs'
                    : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none text-zinc-700 dark:text-zinc-200 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
