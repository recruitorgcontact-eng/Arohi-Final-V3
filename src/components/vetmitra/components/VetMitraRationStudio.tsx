// Arohi VetMitra - Dr. Bhaktahari Mallick Dairy Cow Ration Formulation Studio
// Reverse-engineered master logic specification from RATION CAL. FINAL 2.xlsx
// Approved by Veterinary Surgeon Dr. Bhaktahari Mallick

import React, { useState, useMemo } from 'react';
import { 
  Calculator, Plus, Trash2, Sliders, Info, CheckCircle2, 
  AlertTriangle, RefreshCw, FileText, Sparkles, 
  ShieldCheck, ArrowRight, CornerDownRight, Check, Droplet,
  ChevronDown, ChevronUp, Scale, Zap, Flame, Pill
} from 'lucide-react';
import { VetLanguage } from '../types';
import { 
  AnimalProfile, 
  DR_MALLICK_FEED_DATABASE, 
  RationIngredientInput, 
  calculateDrMallickRation,
  parseFarmerFeedText,
  DrMallickRationEvaluation
} from '../engine/drMallickRationEngine';

interface Props {
  language: VetLanguage;
  onSendToChat?: (summaryText: string) => void;
}

// Preset animal profiles
const WORKBOOK_PRESETS: Array<{ label: string; profile: AnimalProfile; initialRation: RationIngredientInput[] }> = [
  {
    label: 'Dr. Mallick Default Cow (250kg, 8kg Milk, 4.5% Fat, Mid Stage)',
    profile: {
      bodyWeightKg: 250,
      milkYieldKgDay: 8,
      milkFatPercent: 4.5,
      milkProteinPercent: 3.4,
      lactationStage: 'Mid',
      daysPregnant: 0,
      parity: 2,
      targetBwChangeKgDay: 0
    },
    initialRation: [
      { feedId: 'wheat_bran_coarse', asFedKg: 2.50 },
      { feedId: 'mung_chuni', asFedKg: 1.25 },
      { feedId: 'dorb', asFedKg: 0.40 },
      { feedId: 'ground_maize', asFedKg: 1.20 },
      { feedId: 'gnoc', asFedKg: 0.40 },
      { feedId: 'mustard_doc', asFedKg: 0.20 },
      { feedId: 'hybrid_napier', asFedKg: 6.00 },
      { feedId: 'paddy_straw', asFedKg: 1.00 },
      { feedId: 'fresh_azolla', asFedKg: 1.00 },
      { feedId: 'broken_rice', asFedKg: 0.20 }
    ]
  },
  {
    label: 'Standard Crossbred Jersey (400kg, 12kg Milk, 4.2% Fat, Early Stage)',
    profile: {
      bodyWeightKg: 400,
      milkYieldKgDay: 12,
      milkFatPercent: 4.2,
      milkProteinPercent: 3.3,
      lactationStage: 'Early',
      daysPregnant: 0,
      parity: 2,
      targetBwChangeKgDay: 0
    },
    initialRation: [
      { feedId: 'hybrid_napier', asFedKg: 14.0 },
      { feedId: 'paddy_straw', asFedKg: 3.0 },
      { feedId: 'wheat_bran_coarse', asFedKg: 2.5 },
      { feedId: 'ground_maize', asFedKg: 1.8 },
      { feedId: 'mustard_doc', asFedKg: 1.0 },
      { feedId: 'mung_chuni', asFedKg: 1.0 },
      { feedId: 'fresh_azolla', asFedKg: 2.0 }
    ]
  },
  {
    label: 'High-Yield HF Crossbred (480kg, 18kg Milk, 3.8% Fat, Early Stage)',
    profile: {
      bodyWeightKg: 480,
      milkYieldKgDay: 18,
      milkFatPercent: 3.8,
      milkProteinPercent: 3.2,
      lactationStage: 'Early',
      daysPregnant: 0,
      parity: 2,
      targetBwChangeKgDay: 0
    },
    initialRation: [
      { feedId: 'hybrid_napier', asFedKg: 18.0 },
      { feedId: 'paddy_straw', asFedKg: 2.5 },
      { feedId: 'ground_maize', asFedKg: 2.5 },
      { feedId: 'soya_doc', asFedKg: 1.2 },
      { feedId: 'wheat_bran_coarse', asFedKg: 2.0 },
      { feedId: 'mung_chuni', asFedKg: 1.5 },
      { feedId: 'broken_rice', asFedKg: 0.8 }
    ]
  },
  {
    label: 'Indigenous Gir / Desi Cow (340kg, 7kg Milk, 4.8% Fat, Mid Stage)',
    profile: {
      bodyWeightKg: 340,
      milkYieldKgDay: 7,
      milkFatPercent: 4.8,
      milkProteinPercent: 3.5,
      lactationStage: 'Mid',
      daysPregnant: 0,
      parity: 2,
      targetBwChangeKgDay: 0
    },
    initialRation: [
      { feedId: 'hybrid_napier', asFedKg: 10.0 },
      { feedId: 'paddy_straw', asFedKg: 3.5 },
      { feedId: 'wheat_bran_coarse', asFedKg: 1.5 },
      { feedId: 'ground_maize', asFedKg: 1.0 },
      { feedId: 'mustard_doc', asFedKg: 0.6 },
      { feedId: 'biri_chuni', asFedKg: 0.8 }
    ]
  }
];

export const VetMitraRationStudio: React.FC<Props> = ({ language, onSendToChat }) => {
  const isOdia = language === 'or';

  // Active animal profile state
  const [animal, setAnimal] = useState<AnimalProfile>(WORKBOOK_PRESETS[0].profile);

  // Active ration ingredients state
  const [ration, setRation] = useState<RationIngredientInput[]>(WORKBOOK_PRESETS[0].initialRation);

  // Sea-shell elemental Ca percentage (Default: 36%)
  const [shellCaPercent, setShellCaPercent] = useState<number>(36.0);

  // Natural language input parser bar
  const [naturalInputText, setNaturalInputText] = useState('');
  const [selectedFeedToAdd, setSelectedFeedToAdd] = useState<string>('mustard_doc');
  const [showFullNutrients, setShowFullNutrients] = useState(false);

  // Execute Dr. Bhaktahari Mallick's 40-step calculation pipeline in real-time
  const evaluation: DrMallickRationEvaluation = useMemo(() => {
    return calculateDrMallickRation(animal, ration, shellCaPercent);
  }, [animal, ration, shellCaPercent]);

  // Handle feed weight change
  const handleUpdateFeedWeight = (feedId: string, asFedKg: number) => {
    setRation(prev => {
      const existing = prev.find(item => item.feedId === feedId);
      if (existing) {
        return prev.map(item => item.feedId === feedId ? { ...item, asFedKg: Math.max(0, asFedKg) } : item);
      }
      return [...prev, { feedId, asFedKg: Math.max(0, asFedKg) }];
    });
  };

  // Handle adding feed from library
  const handleAddFeed = () => {
    if (ration.some(item => item.feedId === selectedFeedToAdd)) {
      handleUpdateFeedWeight(selectedFeedToAdd, 1.0);
    } else {
      setRation(prev => [...prev, { feedId: selectedFeedToAdd, asFedKg: 1.0 }]);
    }
  };

  // Handle removing feed
  const handleRemoveFeed = (feedId: string) => {
    setRation(prev => prev.filter(item => item.feedId !== feedId));
  };

  // Apply natural language input
  const handleParseNaturalInput = () => {
    if (!naturalInputText.trim()) return;
    const parsed = parseFarmerFeedText(naturalInputText);
    if (parsed.length > 0) {
      setRation(parsed);
      setNaturalInputText('');
    }
  };

  // Load preset
  const handleLoadPreset = (index: number) => {
    setAnimal(WORKBOOK_PRESETS[index].profile);
    setRation(WORKBOOK_PRESETS[index].initialRation);
  };

  // Export summary to chat
  const handleExportToChat = () => {
    const summary = `🐄 Dr. Bhaktahari Mallick Dairy Ration Formulation Report
Animal Profile:
• Body Weight: ${animal.bodyWeightKg} kg | Milk: ${animal.milkYieldKgDay} kg/day (Fat: ${animal.milkFatPercent}%, Protein: ${animal.milkProteinPercent}%)
• Stage: ${animal.lactationStage} | Parity: ${animal.parity} | Pregnant: ${animal.daysPregnant} days

Daily Ration (As-Fed):
${evaluation.ingredientsBreakdown.map(i => `• ${i.name}: ${i.asFedKg} kg (DM: ${i.dmKg} kg, CP: ${i.cpKg} kg, NEL: ${i.nelMcal} Mcal)`).join('\n')}
Total As-Fed: ${evaluation.totalAsFedKg} kg | Total DM: ${evaluation.totalDmKg} kg (Planning DMI: ${evaluation.planningDmiKg} kg)

Key Nutritional Balances:
• Dry Matter: ${evaluation.totalDmKg} kg vs Req ${evaluation.planningDmiKg} kg (${((evaluation.totalDmKg / evaluation.planningDmiKg) * 100).toFixed(0)}%)
• Crude Protein: Req ${evaluation.nutrientComparisons.find(n => n.nutrient.includes('Crude Protein'))?.required} kg | Supplied ${evaluation.nutrientComparisons.find(n => n.nutrient.includes('Crude Protein'))?.supplied} kg
• NEL Energy Balance: ${evaluation.nelBalanceMcal >= 0 ? '+' : ''}${evaluation.nelBalanceMcal} Mcal/day [${evaluation.nelStatus}]
• Starch: ${evaluation.starchPercentDm}% of DM [${evaluation.starchStatus}]
• Forage:Concentrate Ratio: ${evaluation.foragePercent}% : ${evaluation.concentratePercent}% [${evaluation.fcStatus}]
• Ca:P Ratio: ${evaluation.caPRatio}:1 [${evaluation.caPStatus}]
• Sea-Shell (CaCO3) Correction: ${evaluation.seaShellCorrectionG > 0 ? `${evaluation.seaShellCorrectionG} g/day recommended` : 'None required'}
• Common Salt (NaCl 0.5% DM): ${evaluation.automaticNaclG} g/day

Key Observations:
${evaluation.keyObservations.map(o => `⚠️ ${o}`).join('\n')}

Suggested Adjustments:
${evaluation.suggestedAdjustments.map(a => `🔧 ${a}`).join('\n')}`;

    if (onSendToChat) {
      onSendToChat(summary);
    } else {
      navigator.clipboard?.writeText(summary);
      alert('Ration report copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner - Dr. Bhaktahari Mallick Master Formulation Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0 shadow-inner">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white font-serif tracking-tight">
                  {isOdia ? 'ଡାକ୍ତର ଭକ୍ତହରି ମଲ୍ଲିକ ଡାଏରୀ ରାସନ ଫର୍ମୁଲେସନ୍ ଇଞ୍ଜିନ୍' : 'Dr. Bhaktahari Mallick Dairy Ration Studio'}
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  Clinical Master Logic (RATION CAL. FINAL 2.xlsx)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-3xl">
                {isOdia 
                  ? 'ପଶୁ ଶଲ୍ୟଚିକିତ୍ସକ ଡାକ୍ତର ଭକ୍ତହରି ମଲ୍ଲିକଙ୍କ ଅନୁମୋଦିତ ୪୦-ସ୍ତରୀୟ ବୈଜ୍ଞାନିକ ହିସାବ — ୩% Body Weight DMI ନିୟମ, ଷ୍ଟାର୍ଚ ୱିଣ୍ଡୋ, ସ୍ୱୟଂଚାଳିତ ଝିନୁକ ଗୁଣ୍ଡ (CaCO₃) ଏବଂ ୦.୫% ଲୁଣ ସଂଶୋଧନ ସହିତ।'
                  : 'Screening and formulation engine approved by Veterinary Surgeon Dr. Bhaktahari Mallick. Integrates the 3% BW DMI floor rule, starch guardrails, automatic sea-shell (CaCO3) correction, and 0.5% NaCl balance.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto">
            <button
              onClick={handleExportToChat}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{isOdia ? 'ଭେଟମିତ୍ର ଚାଟ୍ କୁ ପଠାନ୍ତୁ' : 'Export to Chat'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Profiles Selector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isOdia ? 'ଆଦର୍ଶ ଗାଈ ପ୍ରୋଫାଇଲ୍ (Presets)' : 'Animal Presets (Dr. Mallick Calibrated)'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {WORKBOOK_PRESETS.map((preset, idx) => {
            const isSelected = animal.bodyWeightKg === preset.profile.bodyWeightKg && animal.milkYieldKgDay === preset.profile.milkYieldKgDay;
            return (
              <button
                key={idx}
                onClick={() => handleLoadPreset(idx)}
                className={`p-3 text-left rounded-xl border transition-all text-xs cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-100 ring-1 ring-emerald-500/40 shadow-sm'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="font-bold text-slate-100 truncate">{preset.label.split('(')[0]}</div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">
                  {preset.profile.bodyWeightKg}kg • {preset.profile.milkYieldKgDay}L • {preset.profile.milkFatPercent}% Fat • {preset.profile.lactationStage}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Natural Language Quick-Input Parser Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-teal-400" />
            <span>{isOdia ? 'ସହଜ ଚାଷୀ ଖାଦ୍ୟ ଇନପୁଟ୍ (Natural Language Feed Parser)' : 'Farmer Natural Language Quick-Input'}</span>
          </label>
          <span className="text-[11px] text-slate-400">
            {isOdia ? 'ଉଦାହରଣ: "6 kg napier, 1 kg straw, 2.5 kg bran, 1 kg azolla"' : 'e.g. "6 kg napier, 1 kg straw, 2.5 kg coarse bran, 1.2 kg maize"'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={naturalInputText}
            onChange={(e) => setNaturalInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleParseNaturalInput()}
            placeholder={isOdia ? 'ଦୈନିକ ଖାଦ୍ୟ ଲେଖନ୍ତୁ (ଯଥା: ୬ କିଲୋ ନେପିୟର, ୧ କିଲୋ ନଡ଼ା, ୨ କିଲୋ ଚୋକଡ଼, ୧ କିଲୋ ମକା)...' : 'Type or paste feeds (e.g. 6 kg napier, 1 kg straw, 2.5 kg coarse bran, 1.2 kg maize)...'}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleParseNaturalInput}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer"
          >
            {isOdia ? 'ଲାଗୁ କରନ୍ତୁ' : 'Apply'}
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Animal Inputs + As-Fed Ingredients (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Animal Inputs Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-200">
                  {isOdia ? '୧. ଗାଈର ପାରାମିଟର (Cow Inputs)' : '1. Cow Profile Inputs'}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Min DMI: {evaluation.planningDmiKg} kg DM
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">
                  {isOdia ? 'ଓଜନ (Body Weight)' : 'Body Weight (BW)'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={animal.bodyWeightKg}
                    onChange={(e) => setAnimal({ ...animal, bodyWeightKg: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-slate-500">kg</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  {isOdia ? 'ଦୁଧ ଉତ୍ପାଦନ (Milk)' : 'Milk Yield'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.5"
                    value={animal.milkYieldKgDay}
                    onChange={(e) => setAnimal({ ...animal, milkYieldKgDay: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-slate-500">kg/d</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  {isOdia ? 'କ୍ଷୀର ଫ୍ୟାଟ୍ (Milk Fat %)' : 'Milk Fat %'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.1"
                    value={animal.milkFatPercent}
                    onChange={(e) => setAnimal({ ...animal, milkFatPercent: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-slate-500">%</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  {isOdia ? 'ପ୍ରୋଟିନ୍ (Protein %)' : 'Milk Protein %'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.1"
                    value={animal.milkProteinPercent}
                    onChange={(e) => setAnimal({ ...animal, milkProteinPercent: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-slate-500">%</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  {isOdia ? 'କ୍ଷୀର ଅବସ୍ଥା (Lactation Stage)' : 'Lactation Stage'}
                </label>
                <select
                  value={animal.lactationStage}
                  onChange={(e) => setAnimal({ ...animal, lactationStage: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Early">Early (16% CP)</option>
                  <option value="Mid">Mid (15% CP)</option>
                  <option value="Late">Late (14% CP)</option>
                  <option value="Dry/Other">Dry/Other (12% CP)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  {isOdia ? 'ଗର୍ଭ ଦିବସ (Pregnancy Days)' : 'Days Pregnant'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={animal.daysPregnant}
                    onChange={(e) => setAnimal({ ...animal, daysPregnant: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-slate-500">d</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Parity</label>
                <input
                  type="number"
                  value={animal.parity}
                  onChange={(e) => setAnimal({ ...animal, parity: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">BW Change Target</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.1"
                    value={animal.targetBwChangeKgDay}
                    onChange={(e) => setAnimal({ ...animal, targetBwChangeKgDay: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-slate-500">kg/d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Ration Builder Table */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-200">
                  {isOdia ? '୨. ଦୈନିକ ଖାଦ୍ୟ ମାତ୍ରା (As-Fed Quantities)' : '2. Proposed Daily Ration (As-Fed)'}
                </h3>
              </div>
              <button
                onClick={() => setRation([])}
                className="text-[11px] text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* Feeds list */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {ration.map((item) => {
                const feed = DR_MALLICK_FEED_DATABASE.find(f => f.id === item.feedId);
                if (!feed) return null;
                const dmSupplied = ((item.asFedKg * feed.dmPercent) / 100).toFixed(2);

                return (
                  <div 
                    key={item.feedId}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-100 truncate">{feed.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded ${feed.category === 'forage' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                          {feed.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {isOdia ? feed.nameOdia : feed.nameHindi} • DM: {feed.dmPercent}%
                        <span className="text-emerald-400 font-mono ml-1.5">({dmSupplied} kg DM)</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={item.asFedKg}
                        onChange={(e) => handleUpdateFeedWeight(item.feedId, Number(e.target.value))}
                        className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-center focus:border-emerald-500 focus:outline-none"
                      />
                      <span className="text-slate-400">kg</span>
                      <button
                        onClick={() => handleRemoveFeed(item.feedId)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Remove feed"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Feed Dropdown */}
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <select
                value={selectedFeedToAdd}
                onChange={(e) => setSelectedFeedToAdd(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                {DR_MALLICK_FEED_DATABASE.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.dmPercent}% DM) — {f.category}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddFeed}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 transition-colors shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Dashboard & Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Scorecard Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Dry Matter Card */}
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                <span>Total DM Intake</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${evaluation.totalDmKg >= evaluation.planningDmiKg * 0.95 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {((evaluation.totalDmKg / evaluation.planningDmiKg) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">
                {evaluation.totalDmKg} <span className="text-xs text-slate-400 font-normal">kg DM</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Min 3% BW Target: <span className="text-slate-200 font-bold">{evaluation.planningDmiKg} kg</span>
              </p>
            </div>

            {/* Energy Balance Card */}
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                <span>NEL Energy</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${evaluation.nelBalanceMcal >= 0 ? 'bg-emerald-500/20 text-emerald-400' : evaluation.nelBalanceMcal >= -1 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {evaluation.nelStatus.split(' ')[0]}
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">
                {evaluation.nelSuppliedMcal} <span className="text-xs text-slate-400 font-normal">Mcal</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Balance: <span className={`font-bold ${evaluation.nelBalanceMcal >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {evaluation.nelBalanceMcal >= 0 ? '+' : ''}{evaluation.nelBalanceMcal} Mcal/d
                </span>
              </p>
            </div>

            {/* Starch % Card */}
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                <span>Starch Density</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${evaluation.starchStatus === 'PRACTICAL RANGE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  18-24%
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">
                {evaluation.starchPercentDm}% <span className="text-xs text-slate-400 font-normal">DM</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">
                {evaluation.starchStatus.split('—')[0]}
              </p>
            </div>

            {/* Forage : Concentrate Card */}
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                <span>Forage : Conc</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${evaluation.fcStatus === 'BALANCED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {evaluation.fcStatus}
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">
                {evaluation.foragePercent}% : {evaluation.concentratePercent}%
              </div>
              <p className="text-[10px] text-slate-400">
                Target: <span className="text-slate-200 font-bold">50-65% Forage</span>
              </p>
            </div>
          </div>

          {/* Automatic Sea-Shell (CaCO3) & Salt (NaCl) Intervention Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Automatic Sea-Shell Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-200">
                      {isOdia ? 'ଝିନୁକ ଗୁଣ୍ଡ ସଂଶୋଧନ (Sea-Shell / CaCO₃)' : 'Automatic Sea-Shell / CaCO3'}
                    </h4>
                    <p className="text-[10px] text-amber-400/80">Dr. Mallick 1.10 : 1 Ca:P Rule</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${evaluation.caPStatus === 'ON TARGET' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {evaluation.caPStatus}
                </span>
              </div>

              <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Current Ca : P Ratio</span>
                  <span className="font-mono font-bold text-slate-100 text-sm">{evaluation.caPRatio} : 1</span>
                  <span className="text-[10px] text-slate-500 block">Target: 1.10 : 1</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Shell Powder Required</span>
                  <span className="font-mono font-black text-amber-300 text-base">
                    {evaluation.seaShellCorrectionG} <span className="text-xs font-normal">g/day</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block">(@ 36% elemental Ca)</span>
                </div>
              </div>

              {evaluation.seaShellCorrectionG > 0 && (
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 leading-tight">
                  Adding <span className="font-bold">{evaluation.seaShellCorrectionG} g</span> shell powder restores calcium from {evaluation.calciumG}g to {evaluation.correctedCaG}g ({evaluation.correctedCaPRatio}:1 ratio).
                </div>
              )}
            </div>

            {/* Automatic Common Salt (NaCl) Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-950/40 to-slate-900 border border-teal-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-teal-200">
                      {isOdia ? 'ସାଧାରଣ ଲୁଣ (Automatic NaCl 0.5% DM)' : 'Automatic Salt (NaCl 0.5% DM)'}
                    </h4>
                    <p className="text-[10px] text-teal-400/80">5g NaCl per kg DM Intake</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-teal-500/20 text-teal-300">
                  Daily Requirement
                </span>
              </div>

              <div className="pt-2 border-t border-teal-500/20 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Total Common Salt</span>
                  <span className="font-mono font-black text-teal-200 text-base">
                    {evaluation.automaticNaclG} <span className="text-xs font-normal">g/day</span>
                  </span>
                  <span className="text-[10px] text-slate-500 block">Mix in morning concentrate</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Provides:</span>
                  <span className="text-[11px] font-mono text-slate-200 block">+{evaluation.sodiumFromNaclG}g Na</span>
                  <span className="text-[11px] font-mono text-slate-200 block">+{evaluation.chlorideFromNaclG}g Cl</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-200 leading-tight">
                Total sodium after salt: <span className="font-bold">{evaluation.totalSodiumG}g</span> | Total chloride: <span className="font-bold">{evaluation.totalChlorideG}g</span>.
              </div>
            </div>
          </div>

          {/* Key Observations & Diagnostic Suggestions (Pages 21 & 28 of spec) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isOdia ? 'କ୍ଲିନିକାଲ୍ ପର୍ଯ୍ୟବେକ୍ଷଣ ଓ ପରାମର୍ଶ (Clinical Diagnostic Summary)' : 'Clinical Observations & Recommendations'}</span>
            </h4>

            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Key Observations:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 pl-5 list-disc">
                {evaluation.keyObservations.map((obs, idx) => (
                  <li key={idx} className="leading-relaxed">{obs}</li>
                ))}
              </ul>
            </div>

            {evaluation.suggestedAdjustments.length > 0 && (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Suggested Adjustments (Dr. Mallick Formulation Vector):</span>
                </div>
                <ul className="space-y-1.5 text-xs text-emerald-200 pl-5 list-disc">
                  {evaluation.suggestedAdjustments.map((adj, idx) => (
                    <li key={idx} className="leading-relaxed">{adj}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Full Nutrient Balance Accordion Table (All 23 Nutrients from Workbook) */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <button
              onClick={() => setShowFullNutrients(!showFullNutrients)}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>{isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ ୨୩-ପୁଷ୍ଟିକର ସାରଣୀ (Complete 23-Nutrient Balance Table)' : 'Comprehensive Nutrient Ledger (All 23 Nutrients)'}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-normal">
                <span>{showFullNutrients ? 'Hide Details' : 'Expand Ledger'}</span>
                {showFullNutrients ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showFullNutrients && (
              <div className="pt-3 border-t border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                      <th className="py-1.5 font-semibold">Nutrient</th>
                      <th className="py-1.5 font-semibold">Unit</th>
                      <th className="py-1.5 font-semibold text-right">Required</th>
                      <th className="py-1.5 font-semibold text-right">Supplied</th>
                      <th className="py-1.5 font-semibold text-right">Adequacy</th>
                      <th className="py-1.5 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {evaluation.nutrientComparisons.map((c, idx) => {
                      const isDeficit = c.status === 'DEFICIT';
                      const isHigh = c.status === 'HIGH';
                      return (
                        <tr key={idx} className="hover:bg-slate-800/20">
                          <td className="py-1.5 text-slate-200 font-sans font-medium">{c.nutrient}</td>
                          <td className="py-1.5 text-slate-400 text-[11px] font-sans">{c.unit}</td>
                          <td className="py-1.5 text-right text-slate-300">{c.required}</td>
                          <td className="py-1.5 text-right text-slate-100 font-bold">{c.supplied}</td>
                          <td className="py-1.5 text-right text-slate-300">{c.adequacyPercent}%</td>
                          <td className="py-1.5 text-right">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-sans ${
                              isDeficit ? 'bg-rose-500/20 text-rose-300' : isHigh ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
