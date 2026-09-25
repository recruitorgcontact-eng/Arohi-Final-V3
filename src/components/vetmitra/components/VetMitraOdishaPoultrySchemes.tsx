// Arohi VetMitra - Odisha Poultry Development Schemes 2025-26 Navigator
// Fisheries & Animal Resources Development Department, Government of Odisha Guidelines

import React, { useState } from 'react';
import { 
  ODISHA_POULTRY_SCHEMES_2025_26, 
  ODISHA_POULTRY_ELIGIBILITY, 
  ODISHA_POULTRY_DOCUMENTS, 
  ODISHA_POULTRY_HOW_TO_APPLY,
  PoultrySchemeItem 
} from '../data/smileOdishaData';
import { VetLanguage } from '../types';
import { 
  Building2, Users, FileCheck, CheckCircle2, ChevronRight, 
  Calculator, DollarSign, Sparkles, Phone, Download, ExternalLink,
  Layers, ShieldCheck, ArrowRight, HeartHandshake, Check
} from 'lucide-react';

interface Props {
  language: VetLanguage;
  onSendToChat?: (text: string) => void;
}

export const VetMitraOdishaPoultrySchemes: React.FC<Props> = ({ language, onSendToChat }) => {
  const isOdia = language === 'or';

  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('broiler_farming');
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [isWomenShg, setIsWomenShg] = useState<boolean>(false);

  const activeScheme = ODISHA_POULTRY_SCHEMES_2025_26.find(s => s.id === selectedSchemeId) || ODISHA_POULTRY_SCHEMES_2025_26[0];
  const activeSize = activeScheme.sizes[selectedSizeIndex] || activeScheme.sizes[0];

  const totalCostLakh = activeSize.totalCostLakh;
  const subsidyPercent = isWomenShg ? 60 : 50;
  const subsidyAmountLakh = isWomenShg ? activeSize.subsidy60Lakh : activeSize.subsidy50Lakh;
  const beneficiaryContributionLakh = Number((totalCostLakh - subsidyAmountLakh).toFixed(4));

  const handleShareCalculation = () => {
    const summary = `🐥 Odisha Poultry Development Scheme 2025–26 Calculation
Scheme: ${activeScheme.name} (${activeScheme.system})
Unit Capacity: ${activeSize.capacity}
Beneficiary Type: ${isWomenShg ? 'Women SHG (60% Subsidy)' : 'Individual Farmer / General (50% Subsidy)'}

Financial Summary:
• Total Project Cost: ₹${totalCostLakh} Lakh (₹${(totalCostLakh * 100000).toLocaleString('en-IN')})
• Government Subsidy (${subsidyPercent}%): ₹${subsidyAmountLakh} Lakh (₹${(subsidyAmountLakh * 100000).toLocaleString('en-IN')})
• Farmer / SHG Share: ₹${beneficiaryContributionLakh} Lakh (₹${(beneficiaryContributionLakh * 100000).toLocaleString('en-IN')})

Facilities Supported:
${activeScheme.facilitiesSupported.map(f => `• ${f}`).join('\n')}

Application Procedure:
1. Submit application to Chief District Veterinary Officer (CDVO) or Odisha F&ARD online portal.
2. Documents: Aadhaar, Land records/lease, Bank passbook, SHG resolution (if applicable), Project proposal.`;

    if (onSendToChat) {
      onSendToChat(summary);
    } else {
      navigator.clipboard?.writeText(summary);
      alert('Scheme subsidy details copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-red-950 to-slate-950 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Government of Odisha F&ARD Department (2025–26)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
              {isOdia ? 'ଓଡ଼ିଶା ସରକାର କୁକୁଡ଼ା ପାଳନ ଯୋଜନା (୨୦୨୫-୨୬)' : 'Odisha Poultry Development Schemes 2025–26'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {isOdia 
                ? 'ବ୍ରଏଲର, ଲେୟାର (ଅଣ୍ଡା ଦିଆ), ବତକ ପାଳନ, ଚିକ୍-ରିୟରିଂ ଏବଂ ମିନି ଦାନା ମିଲ୍ ପାଇଁ ୫୦% ରୁ ୬୦% ସରକାରୀ ରିହାତି (ସବସିଡି) ର ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ।'
                : 'Financial assistance and 50% to 60% capital subsidies for commercial broiler, layer, duck farming, chick-rearing units, and mini poultry feed mills.'}
            </p>
          </div>

          <button
            onClick={handleShareCalculation}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <Calculator className="w-4 h-4" />
            <span>{isOdia ? 'ହିସାବ କପି କରନ୍ତୁ' : 'Export Subsidy Report'}</span>
          </button>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ODISHA_POULTRY_SCHEMES_2025_26.map((scheme) => {
          const isSelected = scheme.id === selectedSchemeId;
          return (
            <button
              key={scheme.id}
              onClick={() => {
                setSelectedSchemeId(scheme.id);
                setSelectedSizeIndex(0);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-950/60 border-amber-500/70 text-amber-200 ring-1 ring-amber-500/40 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block truncate">
                {scheme.system.split('(')[0]}
              </span>
              <h4 className="font-bold text-xs text-slate-100 mt-1 line-clamp-2">
                {isOdia ? scheme.nameOdia : scheme.name}
              </h4>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Up to 60% Subsidy
              </span>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Calculator & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Calculator & Project Cost (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-100 font-serif">
                  {isOdia ? activeScheme.nameOdia : activeScheme.name}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  {activeScheme.system}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{activeScheme.objective}</p>
            </div>

            {/* Beneficiary Type Switcher (50% vs 60% WSHG) */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Select Beneficiary Category:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsWomenShg(false)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    !isWomenShg
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Individual / General (50% Subsidy)
                </button>
                <button
                  onClick={() => setIsWomenShg(true)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isWomenShg
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Women SHG (60% Subsidy)</span>
                </button>
              </div>
            </div>

            {/* Capacity / Unit Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Select Unit Capacity / Size:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {activeScheme.sizes.map((sz, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedSizeIndex === idx
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs block font-bold">{sz.capacity}</span>
                    <span className="text-[11px] text-slate-400 block font-mono">₹{sz.totalCostLakh} Lakh</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Big Financial Breakdown Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-950 to-slate-900 border border-amber-500/30 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>Financial Assistance Calculation ({activeSize.capacity})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Project Cost</span>
                  <span className="text-xl font-bold font-mono text-slate-100">
                    ₹{totalCostLakh} <span className="text-xs text-slate-400 font-normal">Lakh</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    ₹{(totalCostLakh * 100000).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
                  <span className="text-[10px] text-amber-300 uppercase tracking-wider block">Govt Subsidy ({subsidyPercent}%)</span>
                  <span className="text-xl font-black font-mono text-amber-300">
                    ₹{subsidyAmountLakh} <span className="text-xs text-amber-200/80 font-normal">Lakh</span>
                  </span>
                  <span className="text-[10px] text-amber-400 block mt-0.5">
                    ₹{(subsidyAmountLakh * 100000).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Farmer / SHG Share</span>
                  <span className="text-xl font-bold font-mono text-slate-200">
                    ₹{beneficiaryContributionLakh} <span className="text-xs text-slate-400 font-normal">Lakh</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Bank loan / Own equity
                  </span>
                </div>
              </div>
            </div>

            {/* Facilities Supported */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Main Facilities Supported Under This Scheme:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {activeScheme.facilitiesSupported.map((fac, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Application Process & Document Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 6 Steps How to Apply */}
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>How to Apply (6 Steps Procedure)</span>
            </h4>

            <div className="space-y-2.5">
              {ODISHA_POULTRY_HOW_TO_APPLY.map((step) => (
                <div key={step.step} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-200">{step.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Documents Required (Checklist):</span>
            </h4>

            <ul className="space-y-1.5 text-xs text-slate-300">
              {ODISHA_POULTRY_DOCUMENTS.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[11px]">{doc}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Authority: CDVO / Block BVO</span>
              <span className="text-amber-400 font-bold">Helpline: 1962</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
