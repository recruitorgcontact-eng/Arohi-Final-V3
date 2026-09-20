// Screen 4: Multimodal Camera & Lab Report Scanner View
// Matching Mockup 4 design layout

import React, { useState, useRef } from 'react';
import { 
  Camera, Upload, Sparkles, CheckCircle2, ArrowLeft, 
  RotateCw, Share2, MessageSquare, AlertTriangle, FileText, ChevronRight
} from 'lucide-react';
import { VetLanguage } from '../types';
import { VET_STOCK_IMAGES } from '../data/vetStockImages';

interface Props {
  language: VetLanguage;
  initialMode?: 'animal' | 'milk' | 'lab';
  onBack: () => void;
  onAskArohi: (reportSummary: string) => void;
}

export const VetMitraScannerView: React.FC<Props> = ({
  language,
  initialMode = 'animal',
  onBack,
  onAskArohi,
}) => {
  const [activeMode, setActiveMode] = useState<'animal' | 'milk' | 'lab'>(initialMode);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasCaptured, setHasCaptured] = useState(true); // default true so user sees instant analysis demo
  const [zoomLevel, setZoomLevel] = useState<'0.5x' | '1x' | '2x'>('1x');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isOdia = language === 'or';

  // Dynamic analysis payload based on mode
  const currentResult = activeMode === 'animal' ? {
    title: 'Mild Mastitis (early stage)',
    titleOdia: 'ପ୍ରାଥମିକ ମାଷ୍ଟାଇଟିସ୍ (Mild Mastitis)',
    confidence: '78%',
    description: 'Slight redness, skin warmth, and localized teat swelling detected. No gangrenous discoloration or bloody discharge visible.',
    image: VET_STOCK_IMAGES.udderCheck,
    actions: [
      'Keep the udder completely clean and dry post-milking',
      'Use veterinary antiseptic teat dip (0.5% povidone-iodine)',
      'Perform California Mastitis Test (CMT) or check for clots/flakes',
      'Consult a veterinary officer if hardness persists beyond 48 hours',
    ],
    youMayAlsoTry: [
      'Improve shed flooring sanitation & lime powder dusting',
      'Ensure proper complete milking without leaving residual milk',
      'Check for teat skin cracks or insect bites',
    ]
  } : activeMode === 'milk' ? {
    title: 'Subacute Rumen Acidosis (SARA) Risk',
    titleOdia: 'ଖାଦ୍ୟ ଫାଇବର କମ୍ — ରେସନ୍ ସନ୍ତୁଳନ ଆବଶ୍ୟକ',
    confidence: '84%',
    description: 'Milk slip analysis indicates Fat depression (3.2% vs expected 4.2%) with high SNF (8.5%). Indicates low chewing cud & excess grain/starch.',
    image: VET_STOCK_IMAGES.cattleCloseUp,
    actions: [
      'Increase dry paddy straw / fibrous fodder by 1.5 - 2.0 kg/day',
      'Do not feed raw flour or leftover cooked rice in large quantities',
      'Add 50-80g sodium bicarbonate (baking soda) to daily ration',
      'Divide concentrate feed into 3-4 smaller daily meals',
    ],
    youMayAlsoTry: [
      'Check if cow is chewing cud at least 50-60 times per cud bolus',
      'Inspect dung consistency (check for gas bubbles or undigested grain)',
    ]
  } : {
    title: 'CBC Report: Mild Leukocytosis & Anemia',
    titleOdia: 'ରକ୍ତ ପରୀକ୍ଷା: ସାମାନ୍ୟ ସଂକ୍ରମଣ ଓ ରକ୍ତହୀନତା',
    confidence: '91%',
    description: 'Hemoglobin at 8.2 g/dL (reference 9.0 - 12.0) and elevated total leukocytes (14,200 /uL). Indicates tick-borne hemoprotozoan or internal parasite burden.',
    image: VET_STOCK_IMAGES.dairyMilkAnalyzer,
    actions: [
      'Conduct blood smear examination for Theileria / Babesia parasites',
      'Administer hematinic iron + vitamin B-complex injection as advised by vet',
      'Check mucous membrane of eyes and gums for paleness',
      'Screen for heavy tick or flea burden on the skin',
    ],
    youMayAlsoTry: [
      'Provide organic iron and copper-enriched mineral mixtures',
      'Apply veterinarian-prescribed deltamethrin or flumethrin pour-on',
    ]
  };

  const handleCapture = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasCaptured(true);
    }, 900);
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in-50 duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isOdia ? 'ଫେରନ୍ତୁ' : 'Back'}</span>
        </button>

        <div className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1 text-xs">
          <button
            onClick={() => { setActiveMode('animal'); setHasCaptured(true); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeMode === 'animal'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isOdia ? 'ପଶୁ ଫଟୋ' : 'Animal Photo'}
          </button>
          <button
            onClick={() => { setActiveMode('milk'); setHasCaptured(true); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeMode === 'milk'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isOdia ? 'କ୍ଷୀର ସ୍ଲିପ୍' : 'Milk Analyzer Slip'}
          </button>
          <button
            onClick={() => { setActiveMode('lab'); setHasCaptured(true); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeMode === 'lab'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isOdia ? 'ଲ୍ୟାବ୍ ରିପୋର୍ଟ' : 'Lab Report'}
          </button>
        </div>
      </div>

      {/* Camera Viewfinder Box (Matching Mockup 4) */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-xl h-72 sm:h-80 w-full flex items-center justify-center">
        {/* Live Subject / Photo Preview */}
        <img
          src={currentResult.image}
          alt="Subject Preview"
          className="w-full h-full object-cover object-center opacity-90"
        />

        {/* Framing Guides & Reticle */}
        <div className="absolute inset-8 border-2 border-dashed border-emerald-400/70 rounded-2xl pointer-events-none flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-emerald-300 text-[11px] font-bold">
            {activeMode === 'animal'
              ? 'Position udder / eye / wound inside frame'
              : activeMode === 'milk'
              ? 'Align milk analyzer slip clearly'
              : 'Hold CBC or lab report flat'}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 bg-black/40 backdrop-blur-md p-1 rounded-xl">
          {(['0.5x', '1x', '2x'] as const).map((z) => (
            <button
              key={z}
              onClick={() => setZoomLevel(z)}
              className={`w-7 h-7 rounded-lg text-[10px] font-bold flex items-center justify-center transition-colors ${
                zoomLevel === z ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {z}
            </button>
          ))}
        </div>

        {/* Bottom Shutter Controls */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-2xl bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/70"
            title="Upload from gallery"
          >
            <Upload className="w-5 h-5" />
          </button>

          <button
            onClick={handleCapture}
            className="w-14 h-14 rounded-full bg-white border-4 border-emerald-500 shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-600" />
          </button>

          <button
            onClick={() => setHasCaptured(true)}
            className="w-10 h-10 rounded-2xl bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/70"
            title="Recalculate"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleCapture();
          }}
        />
      </div>

      {/* Analysis Result Card (Matching Mockup 4 Bottom Sheet) */}
      <div className="rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                Analysis Complete • Analyzed by Arohi AI
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {currentResult.title}
            </h3>
            <p className="text-xs font-semibold text-emerald-800">
              {currentResult.titleOdia}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {currentResult.description}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-500/40 flex flex-col items-center justify-center shrink-0">
            <span className="text-sm font-black text-emerald-800">{currentResult.confidence}</span>
            <span className="text-[9px] font-bold text-emerald-600 uppercase">Match</span>
          </div>
        </div>

        {/* Recommended Actions List */}
        <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Recommended Actions</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {currentResult.actions.map((act, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <button
            onClick={() => onAskArohi(`Regarding the ${currentResult.title}: ${currentResult.description}. Please guide me on detailed treatment and feeding.`)}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isOdia ? 'ଆରୋହୀଙ୍କୁ ଅଧିକ ପଚାରନ୍ତୁ' : 'Ask Arohi for More Advice'}</span>
          </button>

          <button
            onClick={() => alert('Report saved to Animal Health Passport.')}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>{isOdia ? 'ସେଭ୍ କରନ୍ତୁ' : 'Save / Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
