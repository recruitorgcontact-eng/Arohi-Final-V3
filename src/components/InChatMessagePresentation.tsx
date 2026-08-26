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
  Sliders
} from 'lucide-react';
import { PresentationData, SlideData, exportToPPTX, exportToPDF } from '../lib/documentExporter';

interface InChatMessagePresentationProps {
  presentationData: PresentationData;
  isDarkMode: boolean;
}

export default function InChatMessagePresentation({
  presentationData,
  isDarkMode
}: InChatMessagePresentationProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = presentationData.slides || [];
  const activeSlide: SlideData = slides[currentSlideIndex] || {
    title: presentationData.title || 'Slide Title',
    bullets: ['Key strategic point 1', 'Key strategic point 2']
  };

  const handleDownloadPPTX = async () => {
    setIsExporting(true);
    try {
      await exportToPPTX(presentationData.title || 'Arohi_Presentation', presentationData);
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
          ? 'bg-[#130d2e] border-purple-500/30'
          : 'bg-white border-purple-200'
      }`}
    >
      {/* Deck Header Bar */}
      <div
        className={`px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b ${
          isDarkMode
            ? 'bg-gradient-to-r from-[#20134a] to-[#170e38] border-purple-500/20 text-purple-200'
            : 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 text-purple-900'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-300">
                AI Slide Deck
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
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>{isExporting ? 'Building .PPTX...' : 'Download PPTX'}</span>
          </button>
        </div>
      </div>

      {/* Slide Canvas Simulator (16:9 aspect ratio container) */}
      <div className="p-3 sm:p-5">
        <div
          className={`relative rounded-xl border p-5 sm:p-7 min-h-[280px] sm:min-h-[320px] flex flex-col justify-between transition-all ${
            isDarkMode
              ? 'bg-gradient-to-br from-[#0c0820] to-[#18113b] border-purple-500/20 text-white'
              : 'bg-gradient-to-br from-slate-50 to-purple-50/40 border-purple-100 text-zinc-900 shadow-inner'
          }`}
        >
          {/* Slide Top Banner info */}
          <div>
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-2.5 mb-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Slide {currentSlideIndex + 1} of {slides.length}
              </span>
              <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                16:9 Presentation Format
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {activeSlide.title}
            </h2>
            {activeSlide.subtitle && (
              <p className="text-xs text-purple-600 dark:text-purple-300 italic mt-0.5">
                {activeSlide.subtitle}
              </p>
            )}

            {/* Metric Banner if available */}
            {activeSlide.keyMetric && (
              <div className="my-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 inline-block">
                <div className="text-xl font-black text-purple-600 dark:text-purple-400">
                  {activeSlide.keyMetric.value}
                </div>
                <div className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">
                  {activeSlide.keyMetric.label}
                </div>
              </div>
            )}

            {/* Bullets List */}
            {activeSlide.bullets && activeSlide.bullets.length > 0 && (
              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                {activeSlide.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Callout box */}
            {activeSlide.callout && (
              <div className="mt-4 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-medium flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
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
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-6 bg-purple-600 dark:bg-purple-400 shadow-xs'
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
