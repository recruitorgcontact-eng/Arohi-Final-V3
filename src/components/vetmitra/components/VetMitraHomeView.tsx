// Screen 1: Arohi VetMitra Home Portal matching Mockup 1
import React from 'react';
import { 
  PhoneCall, Stethoscope, Camera, Mic, ChevronRight, 
  AlertTriangle, ShieldCheck, Heart, Sparkles, ArrowRight
} from 'lucide-react';
import { VetSpecies, VetLanguage } from '../types';
import { VET_STOCK_IMAGES } from '../data/vetStockImages';

interface Props {
  activeSpecies: VetSpecies;
  onSelectSpecies: (species: VetSpecies) => void;
  language: VetLanguage;
  onStartConsult: (presetQuery?: string) => void;
  onStartVoiceCall: () => void;
  onOpenScanner: (mode?: 'animal' | 'milk' | 'lab') => void;
  onOpenEmergency: () => void;
  onViewPassport: () => void;
}

export const VetMitraHomeView: React.FC<Props> = ({
  activeSpecies,
  onSelectSpecies,
  language,
  onStartConsult,
  onStartVoiceCall,
  onOpenScanner,
  onOpenEmergency,
  onViewPassport,
}) => {
  const isOdia = language === 'or';

  const COMMON_CONCERNS = [
    {
      id: 'off_feed',
      titleEn: 'Off-feed / No Cudding',
      titleOr: 'ଜାବର କାଟୁନାହିଁ',
      icon: '🌱',
      query: 'ମୋ ଗାଈ ଆଜି ଠିକ୍‌ରେ ଖାଉନାହିଁ ଏବଂ ଜାବର କାଟୁନାହିଁ। କଣ କରିବାକୁ ହେବ?',
      bg: 'bg-emerald-50 border-emerald-100 text-emerald-950',
    },
    {
      id: 'milk_drop',
      titleEn: 'Milk Yield Drop',
      titleOr: 'ଦୁଧ କମିଯିବା',
      icon: '🥛',
      query: 'ମୋ ଗାଈର ଦୁଧ ୧୨ ଲିଟରରୁ ୯ ଲିଟରକୁ କମିଯାଇଛି। ଦୈନିକ ରେସନ୍ ଓ ଖାଦ୍ୟରେ କଣ ବଦଳାଇବି?',
      bg: 'bg-blue-50 border-blue-100 text-blue-950',
    },
    {
      id: 'mastitis',
      titleEn: 'Swollen Udder (Mastitis)',
      titleOr: 'ମାଷ୍ଟାଇଟିସ୍',
      icon: '🐄',
      query: 'ଗାଈର ଥନ ଫୁଲିଯାଇଛି ଏବଂ ଲାଲ୍ ଦିଶୁଛି। ମାଷ୍ଟାଇଟିସ୍ ପରୀକ୍ଷା ଓ ପ୍ରାଥମିକ ଉପଚାର କଣ?',
      bg: 'bg-rose-50 border-rose-100 text-rose-950',
    },
    {
      id: 'scours',
      titleEn: 'Calf Scours / Diarrhea',
      titleOr: 'ଝାଡ଼ା / ଡାଇରିଆ',
      icon: '🐂',
      query: 'ଛୋଟ ବାଛୁରୀର ପତଳା ଝାଡ଼ା ହେଉଛି ଏବଂ ସେ ଛିଡ଼ା ହୋଇପାରୁନାହିଁ। କଣ ତୁରନ୍ତ କରିବି?',
      bg: 'bg-amber-50 border-amber-100 text-amber-950',
    },
    {
      id: 'bloat',
      titleEn: 'Bloat / Stomach Swelling',
      titleOr: 'ପେଟ ଫୁଲିବା',
      icon: '🫁',
      query: 'ପଶୁର ବାମ ପଟ ପେଟ ଢୋଲ ପରି ଫୁଲିଯାଇଛି ଓ ନିଶ୍ୱାସ ନେବାରେ କଷ୍ଟ ହେଉଛି (Acute Bloat)।',
      bg: 'bg-red-50 border-red-100 text-red-950',
    },
  ];

  return (
    <div className="space-y-4 pb-20 animate-in fade-in-50 duration-300">
      {/* Hero Welcome Card with Real Livestock Photography */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-100 shadow-sm">
        {/* Background Decorative Gradient & Tagline */}
        <div className="absolute right-3 top-3 text-right hidden sm:block">
          <span className="text-[11px] font-serif italic text-emerald-800/80 font-medium block">
            Better Animals
          </span>
          <span className="text-[11px] font-serif italic text-emerald-800/80 font-medium block">
            Brighter Tomorrows
          </span>
        </div>

        <div className="p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-left w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-950 font-sans">
              {isOdia ? 'ନମସ୍କାର!' : 'Namaskar!'}
            </h2>
            <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
              {isOdia
                ? 'ଆପଣଙ୍କ ଗାଈ ବା ପଶୁର କଣ ସମସ୍ୟା ଅଛି କୁହନ୍ତୁ...'
                : "Tell me what's happening with your animal today..."}
            </p>
            <p className="text-xs text-slate-600">
              {isOdia
                ? 'କ୍ଷୀର କମିବା, ଜାବର କାଟିବା, ଥନ ଫୁଲିବା ବା ରେସନ୍ ସନ୍ତୁଳନ — ଆରୋହୀ ପ୍ରସ୍ତୁତ।'
                : 'Milk drop, rumination, udder check, or NASEM ration balance — Arohi is ready.'}
            </p>
          </div>

          {/* Real Photo Montage Banner */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white max-w-sm w-full h-44 sm:h-52">
              <img
                src={VET_STOCK_IMAGES.heroGroup}
                alt="Livestock and Pets"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] text-white font-medium">
                    {isOdia ? '୨୪x୭ ଲାଇଭ୍ AI ଚିକିତ୍ସକ ଉପଲବ୍ଧ' : '24x7 Live AI Veterinary Available'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Species Tactile Switcher Cards (Matching Mockup 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          { id: 'cattle' as VetSpecies, label: 'Dairy & Cattle', odia: 'ଗାଈ ଓ ମଇଁଷି', img: VET_STOCK_IMAGES.cattleJersey, icon: '🐄' },
          { id: 'goat' as VetSpecies, label: 'Goats & Sheep', odia: 'ଛେଳି ଓ ମେଣ୍ଢା', img: VET_STOCK_IMAGES.goatPortrait, icon: '🐐' },
          { id: 'dog' as VetSpecies, label: 'Dogs', odia: 'କୁକୁର', img: VET_STOCK_IMAGES.dogLabrador, icon: '🐕' },
          { id: 'cat' as VetSpecies, label: 'Cats', odia: 'ବିରାଡ଼ି', img: VET_STOCK_IMAGES.catPortrait, icon: '🐈' },
        ].map((sp) => {
          const isSelected = activeSpecies === sp.id;
          return (
            <button
              key={sp.id}
              onClick={() => onSelectSpecies(sp.id)}
              className={`relative overflow-hidden rounded-2xl p-3 flex flex-col items-center justify-between text-center transition-all duration-200 border-2 ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-900/20 scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden mb-2 border-2 border-white/60 shadow-sm">
                <img src={sp.img} alt={sp.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold block">{sp.label}</span>
              <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                {sp.odia}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Prompt & Voice Bar (Talk to Arohi...) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <button
            onClick={() => onStartConsult()}
            className="flex-1 text-left px-3 py-2 text-slate-500 text-sm bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors truncate"
          >
            {isOdia ? 'ଆରୋହୀ ସହିତ କଥା ହୁଅନ୍ତୁ (Talk to Arohi)...' : 'Talk to Arohi about your animal...'}
          </button>
          <button
            onClick={() => onOpenScanner('animal')}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0"
            title="Scan animal photo or milk slip"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            onClick={onStartVoiceCall}
            className="w-11 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-800/30 transition-transform active:scale-95 shrink-0"
            title="Live Voice Call"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase shrink-0">
            {isOdia ? 'ତ୍ୱରିତ ପ୍ରଶ୍ନ:' : 'Quick:'}
          </span>
          <button
            onClick={() => onStartConsult(isOdia ? 'ମୋ ଗାଈର ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ କରିବାକୁ ଚାହେଁ' : 'Check animal health')}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
          >
            {isOdia ? 'ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ' : 'Get health advice'}
          </button>
          <button
            onClick={() => onStartConsult(isOdia ? 'ଦୈନିକ NASEM ଖାଦ୍ୟ ରେସନ୍ ପ୍ଲାନ୍ ଦିଅନ୍ତୁ' : 'Calculate daily ration')}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
          >
            {isOdia ? 'ରେସନ୍ ପ୍ଲାନ୍ (NASEM)' : 'Nutrition plan'}
          </button>
          <button
            onClick={() => onViewPassport()}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
          >
            {isOdia ? 'ଟିକାକରଣ ରେକର୍ଡ' : 'Vaccinations'}
          </button>
          <button
            onClick={() => onOpenScanner('lab')}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
          >
            {isOdia ? 'ରିପୋର୍ଟ ଅପଲୋଡ୍' : 'Upload reports'}
          </button>
        </div>
      </div>

      {/* Prominent Emergency 1962 Banner (Matching Mockup 1) */}
      <div 
        onClick={onOpenEmergency}
        className="cursor-pointer rounded-3xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white p-4 sm:p-5 shadow-lg shadow-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black tracking-wide">
                ଜରୁରୀକାଳୀନ ପଶୁ ହେଲ୍ପଲାଇନ୍ ୧୯୬୨
              </span>
            </div>
            <p className="text-xs text-rose-100 font-medium">
              National Animal Helpline 1962 • (Toll-Free 24x7 • Veterinary Ambulance)
            </p>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            window.open('tel:1962');
          }}
          className="px-5 py-2.5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-black text-sm flex items-center justify-center gap-2 shadow-sm shrink-0 self-start sm:self-auto"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 1962</span>
        </button>
      </div>

      {/* Common Concerns Horizontal Carousel */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            {isOdia ? 'ସାଧାରଣ ସମସ୍ୟା (Common Concerns)' : 'Common Concerns'}
          </h3>
          <button
            onClick={() => onStartConsult()}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>{isOdia ? 'ସବୁ ଦେଖନ୍ତୁ' : 'See All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {COMMON_CONCERNS.map((c) => (
            <button
              key={c.id}
              onClick={() => onStartConsult(c.query)}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all hover:shadow-md ${c.bg}`}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-xs font-bold leading-tight line-clamp-1">
                {c.titleEn}
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                {c.titleOr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mission Banner with Rural Farmer & Cow Visual */}
      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 to-teal-900 text-white relative shadow-md">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 relative">
          <div className="space-y-1 max-w-md text-left">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Arohi Mission 87 For Livestock</span>
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold text-white">
              Healthy Animals • Stronger Farmers • Happier Communities
            </h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {isOdia
                ? 'ଓଡ଼ିଶା ତଥା ସାରା ଭାରତର ପଶୁପାଳକ ମାନଙ୍କୁ ସର୍ବୋତ୍ତମ AI ଚିକିତ୍ସା ଓ NASEM ପୋଷଣ ଯୋଗାଇବା ଆମର ଲକ୍ଷ୍ୟ।'
                : 'Democratizing world-class veterinary diagnostics and dairy ration balancing for every rural farmer.'}
            </p>
          </div>

          <button
            onClick={() => onViewPassport()}
            className="px-4 py-2 rounded-2xl bg-white text-emerald-950 font-bold text-xs flex items-center gap-2 hover:bg-emerald-50 transition-colors shrink-0"
          >
            <span>{isOdia ? 'ପାସପୋର୍ଟ ଦେଖନ୍ତୁ' : 'View Animal Passport'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
