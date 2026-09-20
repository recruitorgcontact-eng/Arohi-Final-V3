// Arohi VetMitra - NASEM 2021 Dairy Ration Screening Studio
// Interactive visual calculator implementing CB_Jersey_NASEM_2021_Ration_Calculator.xlsx

import React, { useState, useMemo } from 'react';
import { 
  Calculator, Plus, Trash2, Sliders, Info, CheckCircle2, 
  AlertTriangle, AlertCircle, RefreshCw, FileText, Sparkles, 
  Edit3, ArrowRight, ShieldCheck, Download
} from 'lucide-react';
import { CowAnimalProfile, FeedItem, RationEntry, VetLanguage } from '../types';
import { NASEM_DEFAULT_FEEDS } from '../engine/feedDatabase';
import { calculateNasemRation } from '../engine/nasemRationCalculator';

interface Props {
  language: VetLanguage;
  onSendToChat?: (summaryText: string) => void;
}

const PRESET_COWS: { label: string; profile: CowAnimalProfile }[] = [
  {
    label: 'Standard Jersey CB (400kg, 10L, 4.5% Fat - Workbook Spec)',
    profile: {
      id: 'cow_preset_jersey',
      breed: 'Crossbred Jersey',
      bodyWeightKg: 400,
      milkYieldKgDay: 10,
      milkFatPercent: 4.5,
      milkTrueProteinPercent: 3.5,
      milkLactosePercent: 4.85,
      daysInMilk: 90,
      parity: 2,
      bodyConditionScore: 3.0,
      pregnancyDays: 0,
      species: 'cattle',
    },
  },
  {
    label: 'High Yield HF Crossbred (480kg, 16L, 3.8% Fat)',
    profile: {
      id: 'cow_preset_hf',
      breed: 'Crossbred Holstein Friesian',
      bodyWeightKg: 480,
      milkYieldKgDay: 16,
      milkFatPercent: 3.8,
      milkTrueProteinPercent: 3.2,
      milkLactosePercent: 4.85,
      daysInMilk: 60,
      parity: 2,
      bodyConditionScore: 2.75,
      pregnancyDays: 0,
      species: 'cattle',
    },
  },
  {
    label: 'Indigenous Gir / Sahiwal (360kg, 8L, 4.8% Fat)',
    profile: {
      id: 'cow_preset_gir',
      breed: 'Indigenous Gir / Sahiwal',
      bodyWeightKg: 360,
      milkYieldKgDay: 8,
      milkFatPercent: 4.8,
      milkTrueProteinPercent: 3.6,
      milkLactosePercent: 4.85,
      daysInMilk: 110,
      parity: 1,
      bodyConditionScore: 3.25,
      pregnancyDays: 0,
      species: 'cattle',
    },
  },
];

export const VetMitraRationStudio: React.FC<Props> = ({ language, onSendToChat }) => {
  const [feedLibrary, setFeedLibrary] = useState<FeedItem[]>(NASEM_DEFAULT_FEEDS);
  
  // Cow Inputs State (Initialized with the exact workbook values)
  const [cow, setCow] = useState<CowAnimalProfile>(PRESET_COWS[0].profile);

  // Ration Entries State (User can start with sample typical Odisha diet or custom)
  const [ration, setRation] = useState<RationEntry[]>([
    { feedId: 'hybrid_napier', asFedKgDay: 12 },
    { feedId: 'paddy_straw', asFedKgDay: 4 },
    { feedId: 'wheat_bran', asFedKgDay: 2 },
    { feedId: 'ground_maize', asFedKgDay: 1.5 },
    { feedId: 'gnoc', asFedKgDay: 1 },
    { feedId: 'mineral_mixture', asFedKgDay: 0.05 },
  ]);

  const [selectedFeedToAdd, setSelectedFeedToAdd] = useState<string>('soya_doc');
  const [showCustomFeedModal, setShowCustomFeedModal] = useState(false);
  const [customFeedForm, setCustomFeedForm] = useState<Partial<FeedItem>>({
    name: '',
    nameOdia: '',
    category: 'concentrate',
    dmPercent: 90,
    cpPercent: 20,
    ndfPercent: 35,
    adfPercent: 20,
    caPercent: 0.5,
    pPercent: 0.5,
    mgPercent: 0.3,
    kPercent: 1.0,
  });

  // Calculate NASEM 2021 Outputs in Realtime
  const results = useMemo(() => {
    return calculateNasemRation(cow, ration, feedLibrary);
  }, [cow, ration, feedLibrary]);

  const handleUpdateRationWeight = (feedId: string, asFedKg: number) => {
    setRation((prev) =>
      prev.map((entry) => (entry.feedId === feedId ? { ...entry, asFedKgDay: Math.max(0, asFedKg) } : entry))
    );
  };

  const handleAddFeedToRation = () => {
    if (ration.some((r) => r.feedId === selectedFeedToAdd)) {
      return;
    }
    setRation((prev) => [...prev, { feedId: selectedFeedToAdd, asFedKgDay: 1.0 }]);
  };

  const handleRemoveFromRation = (feedId: string) => {
    setRation((prev) => prev.filter((r) => r.feedId !== feedId));
  };

  const handleCreateCustomFeed = () => {
    if (!customFeedForm.name) return;
    const newFeed: FeedItem = {
      id: `custom_${Date.now()}`,
      name: customFeedForm.name || 'Custom Lab Feed',
      nameOdia: customFeedForm.nameOdia || customFeedForm.name || 'କଷ୍ଟମ୍ ଫିଡ୍',
      nameHindi: customFeedForm.name || 'कस्टम आहार',
      category: (customFeedForm.category as any) || 'concentrate',
      dmPercent: Number(customFeedForm.dmPercent) || 90,
      cpPercent: Number(customFeedForm.cpPercent) || 0,
      ndfPercent: Number(customFeedForm.ndfPercent) || 0,
      adfPercent: Number(customFeedForm.adfPercent) || 0,
      caPercent: Number(customFeedForm.caPercent) || 0,
      pPercent: Number(customFeedForm.pPercent) || 0,
      mgPercent: Number(customFeedForm.mgPercent) || 0,
      kPercent: Number(customFeedForm.kPercent) || 0,
      isCustom: true,
    };
    setFeedLibrary((prev) => [newFeed, ...prev]);
    setRation((prev) => [...prev, { feedId: newFeed.id, asFedKgDay: 1.0 }]);
    setShowCustomFeedModal(false);
  };

  const handleClearAllRation = () => {
    setRation((prev) => prev.map((r) => ({ ...r, asFedKgDay: 0 })));
  };

  const handleExportSummary = () => {
    const summary = `🐄 Arohi VetMitra - NASEM 2021 Dairy Screening Summary
Animal: ${cow.breed} | BW: ${cow.bodyWeightKg}kg | Milk: ${cow.milkYieldKgDay}kg (${cow.milkFatPercent}% Fat, ${cow.milkTrueProteinPercent}% Protein)
Milk Energy: ${results.milkEnergyMcalDay.toFixed(2)} Mcal/day
Predicted DMI: ${results.predictedDmiKgDay} kg DM | Actual DMI: ${results.actualDmiKgDay} kg DM
Forage : Concentrate Ratio = ${results.forageToConcentrateRatio.forage}% : ${results.forageToConcentrateRatio.concentrate}%

Nutrient Balances:
${results.comparisons
  .map(
    (c) =>
      `• ${c.nutrientName}: Supplied ${c.supplied} ${c.unit} vs Req ${c.requirement} ${c.unit} (${c.percentTarget}%) => [${c.status}]`
  )
  .join('\n')}

Key Observations:
${results.screeningObservations.map((o) => `⚠️ ${o}`).join('\n') || 'None'}

Practical Recommendations:
${results.recommendations.map((r) => `✓ ${r}`).join('\n')}`;

    if (onSendToChat) {
      onSendToChat(summary);
    } else {
      navigator.clipboard?.writeText(summary);
      alert('Ration summary copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Framework Declaration */}
      <div className="bg-gradient-to-r from-emerald-900/60 via-teal-900/40 to-slate-900/70 border border-emerald-500/30 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-semibold text-emerald-100">
                  NASEM 2021 Dairy Ration Screening Studio
                </h2>
                <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  CB Jersey Engine
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Connecting cow body condition, lactation dynamics, and dry matter intake to evaluate dietary nutrient adequacy.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleExportSummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-medium text-emerald-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{language === 'or' ? 'ଚାଟ୍ କୁ ପଠାନ୍ତୁ' : 'Export to Chat'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Profiles Selector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'or' ? 'କ୍ୱିକ୍ ଆଦର୍ଶ ଗାଈ ପ୍ରୋଫାଇଲ୍ (Presets)' : 'Quick Animal Presets'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESET_COWS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setCow(p.profile)}
              className={`p-2.5 text-left rounded-xl border transition-all text-xs ${
                cow.breed === p.profile.breed && cow.milkYieldKgDay === p.profile.milkYieldKgDay
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="font-medium text-slate-100">{p.label}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                {p.profile.bodyWeightKg} kg • {p.profile.milkYieldKgDay} L/day • {p.profile.daysInMilk} DIM • Parity {p.profile.parity}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Animal Inputs & Ration Feed Entries */}
        <div className="lg:col-span-6 space-y-6">
          {/* Cow Inputs Section */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-200">
                  {language === 'or' ? '୧. ଗାଈର ବିବରଣୀ (Animal Inputs)' : '1. Cow Profile & Milk Inputs'}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Milk Energy: <span className="text-emerald-400 font-bold">{results.milkEnergyMcalDay} Mcal/d</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">
                  {language === 'or' ? 'ଓଜନ (Body Weight)' : 'Body Weight'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={cow.bodyWeightKg}
                    onChange={(e) => setCow({ ...cow, bodyWeightKg: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                  <span className="text-slate-500">kg</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  {language === 'or' ? 'ଦୁଧ ଉତ୍ପାଦନ (Milk)' : 'Milk Yield'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.5"
                    value={cow.milkYieldKgDay}
                    onChange={(e) => setCow({ ...cow, milkYieldKgDay: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                  <span className="text-slate-500">kg/d</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  {language === 'or' ? 'Milk Fat %' : 'Milk Fat %'}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.1"
                    value={cow.milkFatPercent}
                    onChange={(e) => setCow({ ...cow, milkFatPercent: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                  <span className="text-slate-500">%</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">True Protein %</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.1"
                    value={cow.milkTrueProteinPercent}
                    onChange={(e) => setCow({ ...cow, milkTrueProteinPercent: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                  <span className="text-slate-500">%</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Days in Milk (DIM)</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={cow.daysInMilk}
                    onChange={(e) => setCow({ ...cow, daysInMilk: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                  <span className="text-slate-500">d</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Parity (Lactation)</label>
                <select
                  value={cow.parity}
                  onChange={(e) => setCow({ ...cow, parity: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500 focus:outline-none"
                >
                  <option value={1}>1 (First Calver)</option>
                  <option value={2}>2+ (Multiparous)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">BCS (1-5)</label>
                <input
                  type="number"
                  step="0.25"
                  min="1"
                  max="5"
                  value={cow.bodyConditionScore}
                  onChange={(e) => setCow({ ...cow, bodyConditionScore: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Gestation Days</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={cow.pregnancyDays}
                    onChange={(e) => setCow({ ...cow, pregnancyDays: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                  <span className="text-slate-500">d</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Lactose (Fixed)</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    disabled
                    value={cow.milkLactosePercent ?? 4.85}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-400 font-mono cursor-not-allowed"
                  />
                  <span className="text-slate-500">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Ration Builder */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <h3 className="text-sm font-semibold text-slate-200">
                  {language === 'or' ? '୨. ଦୈନିକ ଖାଦ୍ୟ (Proposed Daily Ration)' : '2. Daily Proposed Ration (As-Fed)'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCustomFeedModal(true)}
                  className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{language === 'or' ? '+ ଲ୍ୟାବ୍ ଫିଡ୍ ଯୋଡ଼ନ୍ତୁ' : '+ Custom Lab Feed'}</span>
                </button>
                <button
                  onClick={handleClearAllRation}
                  className="text-[11px] font-medium text-slate-400 hover:text-rose-400 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{language === 'or' ? 'ଖାଲି କରନ୍ତୁ' : 'Reset 0'}</span>
                </button>
              </div>
            </div>

            {/* Feed items list */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {ration.map((entry) => {
                const feed = feedLibrary.find((f) => f.id === entry.feedId);
                if (!feed) return null;
                const dmSupplied = entry.asFedKgDay * (feed.dmPercent / 100);

                return (
                  <div
                    key={entry.feedId}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-200 truncate">
                          {language === 'or' ? feed.nameOdia : feed.name}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            feed.category === 'forage_green'
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                              : feed.category === 'forage_dry'
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                              : feed.category === 'mineral'
                              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                              : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                          }`}
                        >
                          {feed.dmPercent}% DM
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        CP: {feed.cpPercent}% • NDF: {feed.ndfPercent}% • Ca: {feed.caPercent}% • P: {feed.pPercent}%
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          value={entry.asFedKgDay}
                          onChange={(e) => handleUpdateRationWeight(entry.feedId, Number(e.target.value))}
                          className="w-16 bg-transparent text-right text-xs font-mono font-bold text-slate-100 focus:outline-none"
                        />
                        <span className="text-[11px] text-slate-500">kg</span>
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400 w-16 text-right hidden sm:block">
                        ({dmSupplied.toFixed(2)} DM)
                      </div>
                      <button
                        onClick={() => handleRemoveFromRation(entry.feedId)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove feed"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Feed row */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <select
                value={selectedFeedToAdd}
                onChange={(e) => setSelectedFeedToAdd(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                {feedLibrary
                  .filter((f) => !ration.some((r) => r.feedId === f.id))
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {language === 'or' ? f.nameOdia : f.name} ({f.dmPercent}% DM, {f.cpPercent}% CP)
                    </option>
                  ))}
              </select>
              <button
                onClick={handleAddFeedToRation}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'or' ? 'ଯୋଡ଼ନ୍ତୁ' : 'Add Feed'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: NASEM Screening Output & Nutrient Adequacy Table */}
        <div className="lg:col-span-6 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5">
              <div className="text-[11px] text-slate-400 font-medium">Predicted DMI</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-100 mt-1">
                {results.predictedDmiKgDay}{' '}
                <span className="text-xs font-normal text-slate-400">kg DM/d</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">NASEM appetite model</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5">
              <div className="text-[11px] text-slate-400 font-medium">Actual DMI Supplied</div>
              <div
                className={`text-lg sm:text-xl font-bold font-mono mt-1 ${
                  results.dmiBalanceKgDay < -1.0
                    ? 'text-amber-400'
                    : results.dmiBalanceKgDay > 1.5
                    ? 'text-purple-400'
                    : 'text-emerald-400'
                }`}
              >
                {results.actualDmiKgDay}{' '}
                <span className="text-xs font-normal text-slate-400">kg DM/d</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                {results.dmiBalanceKgDay >= 0 ? `+${results.dmiBalanceKgDay}` : results.dmiBalanceKgDay} kg balance
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5">
              <div className="text-[11px] text-slate-400 font-medium">Forage : Concentrate</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-teal-400 mt-1">
                {results.forageToConcentrateRatio.forage} : {results.forageToConcentrateRatio.concentrate}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {results.forageToConcentrateRatio.forage < 40 ? '⚠️ Low roughage risk' : '✓ Safe rumen buffer'}
              </div>
            </div>
          </div>

          {/* Nutrient Comparisons Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">
                  {language === 'or' ? 'ପୋଷକ ତତ୍ତ୍ୱ ଯାଞ୍ଚ ସାରଣୀ (NASEM Screening)' : 'Nutrient Adequacy Screening'}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  &lt;90% = LOW (Deficient) | 90–115% = OK (Balanced) | &gt;115% = HIGH (Excess)
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/70 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Nutrient</th>
                    <th className="py-2.5 px-2">Req Target</th>
                    <th className="py-2.5 px-2">Supplied</th>
                    <th className="py-2.5 px-2">% Target</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {results.comparisons.map((c) => (
                    <tr key={c.nutrientKey} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-3 font-sans font-medium text-slate-200">
                        {c.nutrientName}
                        <span className="block text-[10px] font-normal text-slate-400 font-sans">
                          {c.unit}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-slate-300">{c.requirement}</td>
                      <td className="py-2.5 px-2 font-semibold text-slate-100">{c.supplied}</td>
                      <td className="py-2.5 px-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-300">{c.percentTarget}%</span>
                          <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                            <div
                              className={`h-full rounded-full ${
                                c.status === 'LOW'
                                  ? 'bg-amber-500'
                                  : c.status === 'HIGH'
                                  ? 'bg-purple-400'
                                  : 'bg-emerald-400'
                              }`}
                              style={{ width: `${Math.min(100, c.percentTarget)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                            c.status === 'LOW'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : c.status === 'HIGH'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Observations & Practical Recommendations */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <Info className="w-4 h-4 text-teal-400" />
              <span>{language === 'or' ? 'ମୂଲ୍ୟାଙ୍କନ ଓ ପରାମର୍ଶ (Clinical Insights)' : 'Clinical Ration Insights'}</span>
            </div>

            {results.screeningObservations.length > 0 && (
              <div className="space-y-1.5">
                {results.screeningObservations.map((obs, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-amber-200/90 bg-amber-950/20 border border-amber-500/20 p-2.5 rounded-xl">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{obs}</span>
                  </div>
                ))}
              </div>
            )}

            {results.recommendations.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {results.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-emerald-200/90 bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-xl">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
              * Note: Practical screening targets (16% CP, 28% NDF, 18% ADF, 0.20% Mg, 1.0% K) are calibrated for Indian dairy feeding. Replace generic table values with certified laboratory analysis when available.
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Custom Feed / Lab COA Upload */}
      {showCustomFeedModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-slate-100">
                  {language === 'or' ? 'ଲ୍ୟାବ୍ ରିପୋର୍ଟରୁ ନୂଆ ଖାଦ୍ୟ ଯୋଡ଼ନ୍ତୁ' : 'Add Custom Feed from Lab COA'}
                </h3>
              </div>
              <button
                onClick={() => setShowCustomFeedModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Enter proximate analysis parameters (on Dry Matter basis) from your feed testing laboratory report.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="text-slate-400 block mb-1">Feed Name / Source</label>
                <input
                  type="text"
                  placeholder="e.g., Farm Grown Napier (Batch 4)"
                  value={customFeedForm.name || ''}
                  onChange={(e) => setCustomFeedForm({ ...customFeedForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select
                  value={customFeedForm.category}
                  onChange={(e) => setCustomFeedForm({ ...customFeedForm, category: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="forage_green">Green Fodder</option>
                  <option value="forage_dry">Dry Roughage</option>
                  <option value="concentrate">Concentrate / Meal</option>
                  <option value="mineral">Mineral Supplement</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Dry Matter (DM %)</label>
                <input
                  type="number"
                  step="0.1"
                  value={customFeedForm.dmPercent}
                  onChange={(e) => setCustomFeedForm({ ...customFeedForm, dmPercent: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Crude Protein (CP % of DM)</label>
                <input
                  type="number"
                  step="0.1"
                  value={customFeedForm.cpPercent}
                  onChange={(e) => setCustomFeedForm({ ...customFeedForm, cpPercent: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">NDF % of DM</label>
                <input
                  type="number"
                  step="0.1"
                  value={customFeedForm.ndfPercent}
                  onChange={(e) => setCustomFeedForm({ ...customFeedForm, ndfPercent: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Calcium (Ca %)</label>
                <input
                  type="number"
                  step="0.01"
                  value={customFeedForm.caPercent}
                  onChange={(e) => setCustomFeedForm({ ...customFeedForm, caPercent: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Phosphorus (P %)</label>
                <input
                  type="number"
                  step="0.01"
                  value={customFeedForm.pPercent}
                  onChange={(e) => setCustomFeedForm({ ...customFeedForm, pPercent: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowCustomFeedModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCustomFeed}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs transition-colors"
              >
                Save &amp; Add to Ration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
