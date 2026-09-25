// Arohi VetMitra - TMR & Whole-Crop Corn Silage Studio
// Based on SMILE & Odisha F&ARD Dairy Nutritional Extension Guidelines

import React, { useState } from 'react';
import { 
  TMR_RECIPES_ODISHA, 
  SILAGE_QUALITY_CHECKLIST, 
  TmrRecipe,
  SilageQualityCheck 
} from '../data/smileOdishaData';
import { VetLanguage } from '../types';
import { 
  Sparkles, CheckCircle2, AlertTriangle, Scale, Droplet, 
  Leaf, Info, ArrowRight, ShieldCheck, ChevronRight, Check,
  Flame, Award, Layers
} from 'lucide-react';

interface Props {
  language: VetLanguage;
  onSendToChat?: (text: string) => void;
}

export const VetMitraTmrSilageStudio: React.FC<Props> = ({ language, onSendToChat }) => {
  const isOdia = language === 'or';
  const [selectedTmrId, setSelectedTmrId] = useState<string>('tmr_with_corn_silage');
  const [activeTab, setActiveTab] = useState<'tmr' | 'silage' | 'minerals' | 'azolla'>('tmr');

  const activeRecipe = TMR_RECIPES_ODISHA.find(r => r.id === selectedTmrId) || TMR_RECIPES_ODISHA[0];

  const handleShareRecipe = (recipe: TmrRecipe) => {
    const text = `🐄 Odisha Total Mixed Ration (TMR) Formulation: ${recipe.name}
Target: ${recipe.targetCow}
Total Fresh Feed: ${recipe.totalAsFedKg} kg/day | Total DM: ${recipe.totalDmKg} kg/day

Daily Recipe:
${recipe.ingredients.map(i => `• ${i.name}: ${i.asFedKg} kg (DM: ${i.dmKg} kg) — ${i.purpose}`).join('\n')}

Nutritional Balance:
• Crude Protein: ${recipe.cpKg} kg | TDN Energy: ${recipe.tdnKg} kg
• NDF Fiber: ${recipe.ndfPercentDm}% of DM
• Calcium: ${recipe.caG}g | Phosphorus: ${recipe.pG}g | Ca:P Ratio: ${recipe.caPRatio}:1

Key Benefits:
${recipe.benefits.map(b => `✓ ${b}`).join('\n')}`;

    if (onSendToChat) {
      onSendToChat(text);
    } else {
      navigator.clipboard?.writeText(text);
      alert('TMR Recipe copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SMILE & Odisha F&ARD Dairy Feeding Protocol</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
              {isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ ମିଶ୍ରିତ ଖାଦ୍ୟ (TMR), ମକା ସାଇଲେଜ୍ ଓ ଆଜୋଲା ଷ୍ଟୁଡିଓ' : 'Total Mixed Ration (TMR), Maize Silage & Azolla Studio'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {isOdia 
                ? 'ଓଡ଼ିଶାରେ ଚାଷୀମାନେ ଅତ୍ୟଧିକ ଚୋକଡ଼ ଓ ନଡ଼ା ଦେଇ ଫସଫରସ୍ ଅଧିକ ଓ କ୍ୟାଲସିୟମ୍ କମ୍ କରୁଛନ୍ତି। TMR, ମକା ସାଇଲେଜ୍ ଓ ଆଜୋଲା ମାଧ୍ୟମରେ ସନ୍ତୁଳିତ ଖାଦ୍ୟ ପ୍ରସ୍ତୁତ କରନ୍ତୁ।'
                : 'Balanced feeding prevents selective eating, stabilizes rumen pH, and corrects the common high-phosphorus/low-calcium imbalance caused by excessive wheat bran in Odisha.'}
            </p>
          </div>

          {/* Navigation Pill Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-2xl shrink-0">
            <button
              onClick={() => setActiveTab('tmr')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tmr'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isOdia ? '୧. TMR ରେସିପି' : '1. TMR Rations'}
            </button>
            <button
              onClick={() => setActiveTab('silage')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'silage'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isOdia ? '୨. ମକା ସାଇଲେଜ୍ ଯାଞ୍ଚ' : '2. Corn Silage Guide'}
            </button>
            <button
              onClick={() => setActiveTab('minerals')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'minerals'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isOdia ? '୩. ଖଣିଜ ଲବଣ ଓ Ca:P' : '3. Mineral Balancing'}
            </button>
            <button
              onClick={() => setActiveTab('azolla')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'azolla'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isOdia ? '୪. ଆଜୋଲା ଉପକାରିତା' : '4. Azolla Guide'}
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: TOTAL MIXED RATION (TMR) RECIPES */}
      {activeTab === 'tmr' && (
        <div className="space-y-6">
          {/* TMR Option Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TMR_RECIPES_ODISHA.map((recipe) => {
              const isSelected = recipe.id === selectedTmrId;
              return (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedTmrId(recipe.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-emerald-950/50 border-emerald-500/60 shadow-lg ring-1 ring-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        {recipe.id === 'tmr_with_corn_silage' ? 'High Energy Option' : 'Low-Cost Local Option'}
                      </span>
                      <h3 className="text-base font-bold text-slate-100 mt-2">
                        {isOdia ? recipe.nameOdia : recipe.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{recipe.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-emerald-400 block">
                        {recipe.totalAsFedKg} kg Fresh
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 block">
                        ({recipe.totalDmKg} kg DM)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Recipe Deep Dive Display */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-100 font-serif">
                  {isOdia ? activeRecipe.nameOdia : activeRecipe.name}
                </h3>
                <p className="text-xs text-emerald-400 mt-0.5">
                  Calibrated Target: <span className="font-bold">{activeRecipe.targetCow}</span>
                </p>
              </div>

              <button
                onClick={() => handleShareRecipe(activeRecipe)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isOdia ? 'ଏହି ରେସିପି ଚାଟ୍ କୁ ନିଅନ୍ତୁ' : 'Export Recipe'}</span>
              </button>
            </div>

            {/* Scorecard: DM, CP, TDN, Ca, P, Ca:P */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Dry Matter</span>
                <span className="text-base font-bold font-mono text-slate-100">{activeRecipe.totalDmKg} kg</span>
                <span className="text-[10px] text-emerald-400 block font-bold">100% Target Met</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Crude Protein</span>
                <span className="text-base font-bold font-mono text-slate-100">{activeRecipe.cpKg} kg</span>
                <span className="text-[10px] text-emerald-400 block font-bold">Balanced</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">TDN Energy</span>
                <span className="text-base font-bold font-mono text-slate-100">{activeRecipe.tdnKg} kg</span>
                <span className="text-[10px] text-emerald-400 block font-bold">High Density</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">NDF Fibre</span>
                <span className="text-base font-bold font-mono text-slate-100">{activeRecipe.ndfPercentDm}%</span>
                <span className="text-[10px] text-emerald-400 block font-bold">Rumen Safe</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Calcium</span>
                <span className="text-base font-bold font-mono text-slate-100">{activeRecipe.caG} g</span>
                <span className="text-[10px] text-emerald-400 block font-bold">Optimal</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Ca : P Ratio</span>
                <span className="text-base font-bold font-mono text-emerald-300">{activeRecipe.caPRatio} : 1</span>
                <span className="text-[10px] text-emerald-400 block font-bold">Ideal (1.2–1.6)</span>
              </div>
            </div>

            {/* Ingredients Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Daily Ingredient Breakdown (Mix thoroughly before offering)</span>
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 pb-2">
                      <th className="py-2 font-semibold">Feed Ingredient</th>
                      <th className="py-2 font-semibold text-right">As-Fed (kg)</th>
                      <th className="py-2 font-semibold text-right">Dry Matter (kg)</th>
                      <th className="py-2 font-semibold pl-4">Functional Role & Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {activeRecipe.ingredients.map((ing, i) => (
                      <tr key={i} className="hover:bg-slate-800/30">
                        <td className="py-2 text-slate-200 font-sans font-bold">{ing.name}</td>
                        <td className="py-2 text-right text-emerald-300 font-bold">{ing.asFedKg.toFixed(2)}</td>
                        <td className="py-2 text-right text-slate-300">{ing.dmKg.toFixed(2)}</td>
                        <td className="py-2 pl-4 text-slate-400 font-sans text-[11px]">{ing.purpose}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-950 font-bold">
                      <td className="py-2.5 text-slate-100 font-sans">TOTAL DAILY MIX</td>
                      <td className="py-2.5 text-right text-emerald-400">{activeRecipe.totalAsFedKg} kg</td>
                      <td className="py-2.5 text-right text-emerald-400">{activeRecipe.totalDmKg} kg</td>
                      <td className="py-2.5 pl-4 text-emerald-300 font-sans text-[11px]">Ready-to-eat balanced single meal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Benefits List */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Field Benefits for Odisha Dairy Farms:</span>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                {activeRecipe.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WHOLE-PLANT CORN SILAGE QUALITY INSPECTOR */}
      {activeTab === 'silage' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 font-serif">
                  {isOdia ? 'ଉନ୍ନତ ମାନର ସମ୍ପୂର୍ଣ୍ଣ ମକା ସାଇଲେଜ୍ ଚିହ୍ନଟ ପ୍ରଣାଳୀ' : 'How to Identify Good Quality Whole-Plant Corn Silage'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isOdia 
                    ? 'କେଣ୍ଡା ଓ ଦାନା ଥିବା ମକା ଗଛରୁ ସାଇଲେଜ୍ ପ୍ରସ୍ତୁତ କଲେ ଅଧିକ ଶକ୍ତି ମିଳେ। ନିମ୍ନଲିଖିତ ୫ଟି ପଏଣ୍ଟ ଯାଞ୍ଚ କରନ୍ତୁ।'
                    : 'Harvest at 30-35% DM (milky to early dough stage, 90-110 days) with cobs and grains intact.'}
                </p>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {SILAGE_QUALITY_CHECKLIST.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-xs text-slate-200">
                      {isOdia ? item.criterionOdia : item.criterion}
                    </h4>
                    <span className="text-[10px] text-amber-400 font-mono">CRITICAL</span>
                  </div>

                  {/* Good indicator */}
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-300 block">Good Quality:</span>
                      <span className="text-slate-300 text-[11px] leading-relaxed">{item.goodIndicator}</span>
                    </div>
                  </div>

                  {/* Bad indicator */}
                  <div className="flex items-start gap-2 text-xs pt-1 border-t border-slate-900">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-rose-300 block">Avoid / Reject:</span>
                      <span className="text-slate-400 text-[11px] leading-relaxed">{item.badIndicator}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-900">
                    Scientific Reason: {item.scientificReason}
                  </p>
                </div>
              ))}
            </div>

            {/* 5 Steps to Make Silage On-Farm */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                5 Simple Steps to Make Whole-Plant Corn Silage on Farm:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Step 1: Harvest</span>
                  <span className="text-[11px] text-slate-300 leading-tight block">Harvest entire plant at milky to early dough stage (30-35% DM).</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Step 2: Chop</span>
                  <span className="text-[11px] text-slate-300 leading-tight block">Chop to 1-2 cm length (including cobs and grains).</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Step 3: Compact</span>
                  <span className="text-[11px] text-slate-300 leading-tight block">Fill in pit, drum, or bunker and compact tightly to remove all air.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Step 4: Seal</span>
                  <span className="text-[11px] text-slate-300 leading-tight block">Seal completely airtight with heavy plastic sheets and sandbags.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Step 5: Feed</span>
                  <span className="text-[11px] text-slate-300 leading-tight block">Ready in 30-45 days. Feed 10-15 kg fresh silage daily in TMR.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MINERAL BALANCING & ODISHA SPECIFIC ISSUES */}
      {activeTab === 'minerals' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 font-serif">
                {isOdia ? 'ଓଡ଼ିଶାରେ ଖଣିଜ ଲବଣ ଅସନ୍ତୁଳନ ଓ ସମାଧାନ' : 'Mineral Deficiencies & Ca:P Imbalances in Odisha'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                Wheat bran and oil cakes are heavily fed in Odisha, supplying massive amounts of phosphorus (11-12 g/kg) with almost no calcium (1 g/kg). This causes the Ca:P ratio to crash to 0.6:1, causing repeat breeding, milk fever, and silent heat.
              </p>
            </div>

            {/* Mineral Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 pb-2">
                    <th className="py-2 font-semibold">Feed / Ingredient</th>
                    <th className="py-2 font-semibold text-right">Calcium (g/kg DM)</th>
                    <th className="py-2 font-semibold text-right">Phosphorus (g/kg DM)</th>
                    <th className="py-2 font-semibold pl-4">Odisha Field Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <td className="py-2 text-slate-200 font-sans font-bold">Hybrid Napier (green)</td>
                    <td className="py-2 text-right text-emerald-400">3.5</td>
                    <td className="py-2 text-right text-slate-400">0.3</td>
                    <td className="py-2 pl-4 text-emerald-300 font-sans text-[11px]">Good calcium source</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-200 font-sans font-bold">Paddy straw</td>
                    <td className="py-2 text-right text-slate-400">1.8</td>
                    <td className="py-2 text-right text-slate-400">0.2</td>
                    <td className="py-2 pl-4 text-slate-400 font-sans text-[11px]">Low in both Ca and P</td>
                  </tr>
                  <tr className="bg-rose-950/20">
                    <td className="py-2 text-rose-200 font-sans font-bold">Wheat bran (Chokada)</td>
                    <td className="py-2 text-right text-rose-300 font-bold">1.1 (Low)</td>
                    <td className="py-2 text-right text-rose-300 font-bold">11.0 (Very High)</td>
                    <td className="py-2 pl-4 text-rose-300 font-sans text-[11px]">Very high in P, low in Ca (Inverts Ca:P!)</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-200 font-sans font-bold">Mung chuni</td>
                    <td className="py-2 text-right text-slate-300">1.6</td>
                    <td className="py-2 text-right text-amber-300">6.5</td>
                    <td className="py-2 pl-4 text-amber-300 font-sans text-[11px]">High in P</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-200 font-sans font-bold">Mustard DOC / Cake</td>
                    <td className="py-2 text-right text-slate-300">6.5</td>
                    <td className="py-2 text-right text-amber-300">12.0</td>
                    <td className="py-2 pl-4 text-amber-300 font-sans text-[11px]">High in P</td>
                  </tr>
                  <tr className="bg-emerald-950/30">
                    <td className="py-2 text-emerald-200 font-sans font-bold">Limestone (CaCO3) / Sea-Shell</td>
                    <td className="py-2 text-right text-emerald-300 font-black">360.0 (36% Ca)</td>
                    <td className="py-2 text-right text-emerald-300 font-bold">0.0</td>
                    <td className="py-2 pl-4 text-emerald-300 font-sans text-[11px]">Essential calcium corrector (25-35g/day)</td>
                  </tr>
                  <tr className="bg-emerald-950/30">
                    <td className="py-2 text-emerald-200 font-sans font-bold">Quality Mineral Mixture</td>
                    <td className="py-2 text-right text-emerald-300">150 - 200</td>
                    <td className="py-2 text-right text-emerald-300">60 - 80</td>
                    <td className="py-2 pl-4 text-emerald-300 font-sans text-[11px]">Supplies Zn, Mn, Cu, Co, Se (50g/day)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Trace Minerals Grid */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                5 Key Trace Minerals Often Deficient in Odisha:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-amber-300 block mb-0.5">Zinc (Zn)</span>
                  <span className="text-[11px] text-slate-400 block mb-1">Enzymes, hoof health & fertility</span>
                  <span className="text-[10px] text-rose-400 block">Deficiency: Poor hooves, skin lesions, repeat breeding</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-amber-300 block mb-0.5">Manganese (Mn)</span>
                  <span className="text-[11px] text-slate-400 block mb-1">Reproduction & bone development</span>
                  <span className="text-[10px] text-rose-400 block">Deficiency: Silent heat, weak bones, repeat breeding</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-amber-300 block mb-0.5">Copper (Cu)</span>
                  <span className="text-[11px] text-slate-400 block mb-1">Immunity, enzymes, coat pigment</span>
                  <span className="text-[10px] text-rose-400 block">Deficiency: Anemia, infertility, hair depigmentation</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-amber-300 block mb-0.5">Cobalt (Co)</span>
                  <span className="text-[11px] text-slate-400 block mb-1">Rumen microbial Vitamin B12</span>
                  <span className="text-[10px] text-rose-400 block">Deficiency: Poor appetite, low growth, reproductive lag</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-amber-300 block mb-0.5">Selenium (Se)</span>
                  <span className="text-[11px] text-slate-400 block mb-1">Antioxidant & placenta health</span>
                  <span className="text-[10px] text-rose-400 block">Deficiency: Retained placenta, weak calves, mastitis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FRESH AZOLLA GUIDE */}
      {activeTab === 'azolla' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 font-serif">
                  {isOdia ? 'ସତେଜ ଆଜୋଲାର ଭୂମିକା ଓ ବ୍ୟବହାର ନିୟମ' : 'Role of Fresh Azolla in Dairy Rations'}
                </h3>
                <p className="text-xs text-slate-400">
                  Sustainable on-farm protein, vitamin, and mineral booster for dairy cows.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-emerald-300 uppercase tracking-wider">
                  Nutritional Superiority of Azolla:
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-100">18% – 25% Crude Protein (CP)</strong> on dry matter basis with balanced amino acids.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Rich in <strong className="text-slate-100">Vitamins A, B-complex, and Vitamin E</strong> for immunity and fertility.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Excellent source of <strong className="text-slate-100">Calcium (1.69%), Iron, Manganese, and Zinc</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Improves rumen microbial fermentation and fiber digestibility.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Produced easily on-farm in 10×6 ft silpaulin pits at near-zero cost.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-amber-300 uppercase tracking-wider">
                  Critical Feeding Dosage & Rumen Rules:
                </h4>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                  <strong>Daily Dosage:</strong> Feed <strong className="text-white">0.5 to 1.0 kg fresh Azolla</strong> per cow per day (provides approx. <strong className="text-white">0.1 to 0.2 kg Dry Matter</strong>).
                </div>
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 leading-relaxed">
                  <strong>Dr. Mallick 5% DM Rule:</strong> Fresh Azolla contains 95% moisture! Never treat 1 kg fresh Azolla as 1 kg dry matter. Always wash in clean fresh water before mixing with TMR or concentrate.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
