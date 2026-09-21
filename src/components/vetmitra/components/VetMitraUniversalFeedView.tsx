// Arohi VetMitra - Comprehensive Multi-Species Feed & Ration Studio
// Formulates species-specific rations for:
// 1. Cattle & Buffalo (NASEM 2021 Dairy Screening, DMI, FCM, Forage:Concentrate, CP, ME)
// 2. Goats & Sheep (Body weight gain, flushing, lactation, subabul/fodder balancing)
// 3. Dogs & Puppies (Caloric RER/DER calculation, protein, fat, safe foods, toxic alert)
// 4. Cats & Kittens (Obligate carnivore taurine, high protein, moisture/wet food, low carb)
// 5. Poultry & Backyard Chicken (Layer/Broiler mash formulation, starter vs finisher, calcium)

import React, { useState, useMemo } from 'react';
import { 
  Scale, Calculator, Sparkles, AlertTriangle, CheckCircle2, 
  ArrowRight, RefreshCw, MessageSquare, ShieldCheck, Heart, 
  Info, Plus, Trash2, Sliders, FileText, ChevronRight, Apple, AlertCircle
} from 'lucide-react';
import { VetSpecies, VetLanguage } from '../types';
import { VetMitraRationStudio } from './VetMitraRationStudio';

interface Props {
  language: VetLanguage;
  initialSpecies?: VetSpecies;
  activeAnimal?: {
    name: string;
    species: VetSpecies;
    breed: string;
    weightKg: number;
    milkYieldLDay?: number;
  };
  onSendToChat?: (summaryText: string, species?: VetSpecies) => void;
  onBackToHome?: () => void;
}

export const VetMitraUniversalFeedView: React.FC<Props> = ({
  language,
  initialSpecies = 'cattle',
  activeAnimal,
  onSendToChat,
  onBackToHome,
}) => {
  const isOdia = language === 'or';
  const [selectedSpecies, setSelectedSpecies] = useState<VetSpecies>(
    activeAnimal?.species || initialSpecies || 'cattle'
  );

  // --- GOAT RATION STATE ---
  const [goatWeight, setGoatWeight] = useState<number>(activeAnimal?.species === 'goat' ? activeAnimal.weightKg : 30);
  const [goatPurpose, setGoatPurpose] = useState<'maintenance' | 'growth' | 'lactation' | 'pregnant'>('growth');
  const [goatGreenFodderKg, setGoatGreenFodderKg] = useState<number>(3.0);
  const [goatDryFodderKg, setGoatDryFodderKg] = useState<number>(0.8);
  const [goatConcentrateKg, setGoatConcentrateKg] = useState<number>(0.35);

  // --- DOG DIET STATE ---
  const [dogWeight, setDogWeight] = useState<number>(activeAnimal?.species === 'dog' ? activeAnimal.weightKg : 18);
  const [dogLifeStage, setDogLifeStage] = useState<'puppy' | 'adult_active' | 'adult_neutered' | 'senior' | 'weight_loss'>('adult_active');
  const [dogDietType, setDogDietType] = useState<'home_cooked' | 'commercial_kibble' | 'mixed'>('home_cooked');

  // --- CAT DIET STATE ---
  const [catWeight, setCatWeight] = useState<number>(activeAnimal?.species === 'cat' ? activeAnimal.weightKg : 4.2);
  const [catLifeStage, setCatLifeStage] = useState<'kitten' | 'adult' | 'senior' | 'indoor_low_activity'>('adult');
  const [catMoistureFocus, setCatMoistureFocus] = useState<boolean>(true);

  // -------------------------------------------------------------
  // GOAT CALCULATIONS (ICAR / NRC Small Ruminant Nutrition)
  // -------------------------------------------------------------
  const goatResults = useMemo(() => {
    // DMI requirement: ~3.5% to 4.2% of body weight
    const dmiPercent = goatPurpose === 'lactation' ? 4.2 : goatPurpose === 'growth' ? 3.8 : 3.2;
    const reqDmiKg = Number(((goatWeight * dmiPercent) / 100).toFixed(2));
    
    // Dry Matter provided: Green (20% DM), Dry (88% DM), Concentrate (90% DM)
    const suppliedDmiKg = Number(
      (goatGreenFodderKg * 0.20 + goatDryFodderKg * 0.88 + goatConcentrateKg * 0.90).toFixed(2)
    );

    // Crude Protein requirement: ~60g to 140g based on weight and purpose
    const reqCpGrams = Math.round(
      goatPurpose === 'lactation' ? goatWeight * 3.8 : goatPurpose === 'growth' ? goatWeight * 3.2 : goatWeight * 2.2
    );
    // CP supplied: Green (~2.4% as fed), Dry (~3% as fed), Concentrate (~18% as fed)
    const suppliedCpGrams = Math.round(
      (goatGreenFodderKg * 1000 * 0.024) + (goatDryFodderKg * 1000 * 0.035) + (goatConcentrateKg * 1000 * 0.18)
    );

    const dmiPercentSupplied = reqDmiKg > 0 ? Math.round((suppliedDmiKg / reqDmiKg) * 100) : 100;
    const cpPercentSupplied = reqCpGrams > 0 ? Math.round((suppliedCpGrams / reqCpGrams) * 100) : 100;

    return {
      reqDmiKg,
      suppliedDmiKg,
      dmiPercentSupplied,
      reqCpGrams,
      suppliedCpGrams,
      cpPercentSupplied,
      status: dmiPercentSupplied >= 90 && dmiPercentSupplied <= 115 ? 'balanced' : dmiPercentSupplied < 90 ? 'deficit' : 'surplus',
    };
  }, [goatWeight, goatPurpose, goatGreenFodderKg, goatDryFodderKg, goatConcentrateKg]);

  // -------------------------------------------------------------
  // DOG CALCULATIONS (WSAVA / NRC Canine Nutrient Guidelines)
  // RER = 70 * (BW ^ 0.75)
  // -------------------------------------------------------------
  const dogResults = useMemo(() => {
    const rer = Math.round(70 * Math.pow(dogWeight, 0.75));
    const factorMap = {
      puppy: 2.5,
      adult_active: 1.6,
      adult_neutered: 1.4,
      senior: 1.2,
      weight_loss: 1.0,
    };
    const factor = factorMap[dogLifeStage] || 1.4;
    const dailyKcal = Math.round(rer * factor);

    // Home-cooked distribution: ~30-35% Lean Protein, ~30-35% Complex Carbs/Fiber, ~20-25% Veggies, ~10% Healthy Fats
    const proteinGrams = Math.round((dailyKcal * 0.28) / 4); // 28% protein calories
    const fatGrams = Math.round((dailyKcal * 0.22) / 9);     // 22% fat calories
    const carbGrams = Math.round((dailyKcal * 0.50) / 4);    // 50% complex carbs

    // Approximate cooked meal portion in grams (boiled chicken/egg/paneer + brown rice/dalia + pumpkin/carrots)
    const approxDailyMealGrams = Math.round(dogWeight * 28);

    return {
      rer,
      dailyKcal,
      proteinGrams,
      fatGrams,
      carbGrams,
      approxDailyMealGrams,
    };
  }, [dogWeight, dogLifeStage]);

  // -------------------------------------------------------------
  // CAT CALCULATIONS (AAFCO / Feline Obligate Carnivore Guidelines)
  // RER = 70 * (BW ^ 0.75)
  // -------------------------------------------------------------
  const catResults = useMemo(() => {
    const rer = Math.round(70 * Math.pow(catWeight, 0.75));
    const factorMap = {
      kitten: 2.2,
      adult: 1.2,
      senior: 1.1,
      indoor_low_activity: 1.0,
    };
    const factor = factorMap[catLifeStage] || 1.2;
    const dailyKcal = Math.round(rer * factor);

    // Cats need ~40% calories from protein, high taurine (500mg/kg DM), wet food hydration
    const proteinGrams = Math.round((dailyKcal * 0.40) / 4);
    const fatGrams = Math.round((dailyKcal * 0.35) / 9);
    const waterRequirementMl = Math.round(catWeight * 50); // 50ml/kg daily

    return {
      rer,
      dailyKcal,
      proteinGrams,
      fatGrams,
      waterRequirementMl,
    };
  }, [catWeight, catLifeStage]);

  // Export summary to chat
  const handleExportSummary = (species: VetSpecies) => {
    let text = '';
    if (species === 'goat') {
      text = `🐐 Arohi VetMitra - Goat & Sheep Ration Summary:
Body Weight: ${goatWeight} kg (${goatPurpose})
Daily Dry Matter Intake: Supplied ${goatResults.suppliedDmiKg} kg vs Req ${goatResults.reqDmiKg} kg (${goatResults.dmiPercentSupplied}%)
Crude Protein: Supplied ${goatResults.suppliedCpGrams}g vs Req ${goatResults.reqCpGrams}g (${goatResults.cpPercentSupplied}%)
Daily Diet: Green Fodder ${goatGreenFodderKg}kg, Dry Fodder ${goatDryFodderKg}kg, Balanced Concentrate ${goatConcentrateKg}kg.`;
    } else if (species === 'dog') {
      text = `🐶 Arohi VetMitra - Canine Calorie & Diet Plan:
Weight: ${dogWeight} kg (${dogLifeStage})
Target Daily Energy: ${dogResults.dailyKcal} kcal/day (Base RER: ${dogResults.rer} kcal)
Estimated Protein: ${dogResults.proteinGrams}g, Fats: ${dogResults.fatGrams}g, Complex Carbs: ${dogResults.carbGrams}g
Approx Daily Whole Food Portion: ${dogResults.approxDailyMealGrams}g split into 2 meals.`;
    } else if (species === 'cat') {
      text = `🐱 Arohi VetMitra - Feline Obligate Carnivore Diet Plan:
Weight: ${catWeight} kg (${catLifeStage})
Target Daily Energy: ${catResults.dailyKcal} kcal/day
Target Protein: ${catResults.proteinGrams}g, Essential Water Intake: ${catResults.waterRequirementMl} ml/day
Critical Note: Must include adequate Taurine (fish/organ meats) and wet food to prevent FLUTD.`;
    }

    if (onSendToChat) {
      onSendToChat(text, species);
    } else {
      navigator.clipboard?.writeText(text);
      alert('Ration summary copied to clipboard!');
    }
  };

  return (
    <div className="space-y-5 pb-16 animate-in fade-in-50 duration-300">
      {/* Universal Top Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 border border-white/20 shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide">
                  {isOdia ? 'ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଓ ରାସନ୍ ଷ୍ଟୁଡିଓ (Feed Studio)' : 'Universal Feed & Ration Studio'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-extrabold uppercase border border-emerald-400/30">
                  All Animals
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                {isOdia 
                  ? 'ପ୍ରତ୍ୟେକ ପ୍ରଜାତି (ଗାଈ, ମଇଁଷି, ଛେଳି, କୁକୁର, ବିରାଡ଼ି) ପାଇଁ ବୈଜ୍ଞାନିକ ଖାଦ୍ୟ, କ୍ୟାଲୋରୀ ଓ ପୋଷଣ ଯୋଜନା।' 
                  : 'Scientific feeding benchmarks, NASEM dairy ration, goat weight-gain, and canine/feline calorie formulation.'}
              </p>
            </div>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs self-start sm:self-auto transition-colors"
            >
              {isOdia ? 'ମୂଳ ପୃଷ୍ଠା' : 'Back to Portal'}
            </button>
          )}
        </div>
      </div>

      {/* Animal Species Selector Tabs */}
      <div className="grid grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {[
          { id: 'cattle', labelOr: 'ଗାଈ / ମଇଁଷି', labelEn: 'Cattle & Dairy', icon: '🐄', sub: 'NASEM 2021' },
          { id: 'goat', labelOr: 'ଛେଳି / ମେଣ୍ଢା', labelEn: 'Goat & Sheep', icon: '🐐', sub: 'ICAR Meat/Milk' },
          { id: 'dog', labelOr: 'କୁକୁର (Canine)', labelEn: 'Dog & Puppy', icon: '🐶', sub: 'WSAVA Calorie' },
          { id: 'cat', labelOr: 'ବିରାଡ଼ି (Feline)', labelEn: 'Cat & Kitten', icon: '🐱', sub: 'Carnivore Diet' },
        ].map((item) => {
          const isSelected = selectedSpecies === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedSpecies(item.id as VetSpecies)}
              className={`py-2 px-2 rounded-xl text-center transition-all flex flex-col items-center justify-center ${
                isSelected
                  ? 'bg-white text-emerald-950 font-black shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs mt-0.5 truncate max-w-full">
                {isOdia ? item.labelOr : item.labelEn}
              </span>
              <span className="text-[9px] text-slate-400 font-mono hidden sm:inline">
                {item.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. CATTLE & DAIRY RATION (NASEM 2021 Interactive Engine) */}
      {/* ------------------------------------------------------------- */}
      {selectedSpecies === 'cattle' && (
        <div className="space-y-4">
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isOdia 
                  ? 'NASEM ୨୦୨୧ ଦୁଗ୍ଧ ଗାଈ ରାସନ୍ କାଲକୁଲେଟର୍: ଶରୀର ଓଜନ, ଦୁଗ୍ଧ ଉତ୍ପାଦନ ଓ ଚର୍ବି ଅନୁଯାୟୀ ସନ୍ତୁଳନ।' 
                  : 'NASEM 2021 Dairy Screening: Integrates Body Weight, Milk Yield, Fat%, DMI, and Mineral Balance.'}
              </span>
            </div>
            {onSendToChat && (
              <button
                onClick={() => onSendToChat('ମୋ ଗାଈ ପାଇଁ NASEM ୨୦୨୧ ସନ୍ତୁଳିତ ଦୈନିକ ଖାଦ୍ୟ ଯୋଜନା ଓ ଦାନା ହିସାବ କରନ୍ତୁ।', 'cattle')}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] shrink-0 hover:bg-emerald-500 transition-colors"
              >
                {isOdia ? 'ଚାଟ୍‌ରେ ପଚାରନ୍ତୁ' : 'Ask in Chat'}
              </button>
            )}
          </div>

          {/* Render the full NASEM 2021 Calculator */}
          <VetMitraRationStudio 
            language={language}
            onSendToChat={(summary) => onSendToChat?.(summary, 'cattle')}
          />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. GOAT & SHEEP BALANCED RATION STUDIO */}
      {/* ------------------------------------------------------------- */}
      {selectedSpecies === 'goat' && (
        <div className="space-y-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐐</span>
                <h3 className="text-base font-black text-slate-900">
                  {isOdia ? 'ଛେଳି ଓ ମେଣ୍ଢା ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଓ ଓଜନ ବୃଦ୍ଧି ରାସନ୍' : 'Goat & Sheep Ration & Weight Gain Studio'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isOdia 
                  ? 'ସବୁଜ ଘାସ (ସୁବାବୁଲ, ନେପିୟର), ଶୁଖିଲା କୁଟା ଏବଂ ଦାନା ସନ୍ତୁଳନ କରି ରୁମେନ୍ ବ୍ଲୋଟ୍ (Bloat) ରୁ ରକ୍ଷା କରନ୍ତୁ।' 
                  : 'Formulates Dry Matter (DMI) and Crude Protein (CP) to maximize daily weight gain safely without acute bloat.'}
              </p>
            </div>

            <button
              onClick={() => handleExportSummary('goat')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isOdia ? 'ରାସନ୍ ସାରାଂଶ କପି କରନ୍ତୁ' : 'Export Summary'}</span>
            </button>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Input Parameters */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isOdia ? 'ପଶୁ ବିବରଣୀ ଓ ଲକ୍ଷ୍ୟ' : 'Animal Inputs & Purpose'}</span>
              </h4>

              {/* Weight Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">{isOdia ? 'ଶରୀର ଓଜନ (Body Weight):' : 'Body Weight:'}</span>
                  <span className="font-bold text-slate-900 font-mono">{goatWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  step="1"
                  value={goatWeight}
                  onChange={(e) => setGoatWeight(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>10 kg (Kid)</span>
                  <span>35 kg (Black Bengal/Beetal)</span>
                  <span>70 kg (Buck)</span>
                </div>
              </div>

              {/* Purpose Selector */}
              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium">
                  {isOdia ? 'ପାଳନ ଉଦ୍ଦେଶ୍ୟ (Life Stage):' : 'Physiological State:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'growth', labelOr: 'ଓଜନ ବୃଦ୍ଧି (Meat Growth)', labelEn: 'Fast Growth (Fattening)' },
                    { id: 'lactation', labelOr: 'ଦୁଗ୍ଧବତୀ (Lactating)', labelEn: 'Lactating Doe' },
                    { id: 'maintenance', labelOr: 'ସାଧାରଣ ଯତ୍ନ (Maintenance)', labelEn: 'Maintenance' },
                    { id: 'pregnant', labelOr: 'ଗର୍ଭବତୀ (Late Pregnancy)', labelEn: 'Pregnant' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setGoatPurpose(st.id as any)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all ${
                        goatPurpose === st.id
                          ? 'bg-white border-emerald-500 font-bold text-emerald-950 shadow-xs ring-1 ring-emerald-500'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {isOdia ? st.labelOr : st.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed Allocation Inputs */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <h5 className="text-xs font-bold text-slate-800">
                  {isOdia ? 'ଦୈନିକ ଦିଆଯାଉଥିବା ଖାଦ୍ୟ (Kg/day As-Fed)' : 'Daily Ration Allocation (Kg/day As-Fed)'}
                </h5>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">{isOdia ? 'ସବୁଜ ଘାସ / ସୁବାବୁଲ (Green Fodder):' : 'Green Fodder (Napier/Subabul):'}</span>
                    <span className="font-bold text-emerald-800 font-mono">{goatGreenFodderKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="8.0"
                    step="0.5"
                    value={goatGreenFodderKg}
                    onChange={(e) => setGoatGreenFodderKg(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">{isOdia ? 'ଶୁଖିଲା କୁଟା / ଡାଳ (Dry Fodder):' : 'Dry Fodder / Straw / Tree Leaves:'}</span>
                    <span className="font-bold text-amber-800 font-mono">{goatDryFodderKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.5"
                    step="0.1"
                    value={goatDryFodderKg}
                    onChange={(e) => setGoatDryFodderKg(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">{isOdia ? 'ସନ୍ତୁଳିତ ଦାନା (Concentrate / Mash):' : 'Concentrate Mash (Maize, Bran, Cake):'}</span>
                    <span className="font-bold text-blue-800 font-mono">{goatConcentrateKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.5"
                    step="0.05"
                    value={goatConcentrateKg}
                    onChange={(e) => setGoatConcentrateKg(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right: Real-Time Results & Nutritional Health Score */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-4 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    {isOdia ? 'ପୋଷଣ ସନ୍ତୁଳନ ଯାଞ୍ଚ (Ration Evaluation)' : 'Nutritional Balance Evaluation'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    goatResults.status === 'balanced'
                      ? 'bg-emerald-600 text-white'
                      : goatResults.status === 'deficit'
                      ? 'bg-amber-500 text-white'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {goatResults.status === 'balanced' ? 'Optimal Balance' : goatResults.status === 'deficit' ? 'Underfed' : 'High Energy'}
                  </span>
                </div>

                {/* DMI Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{isOdia ? 'ଶୁଷ୍କ ପଦାର୍ଥ (Dry Matter - DMI):' : 'Dry Matter Intake (DMI):'}</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {goatResults.suppliedDmiKg} / {goatResults.reqDmiKg} kg ({goatResults.dmiPercentSupplied}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        goatResults.dmiPercentSupplied >= 90 && goatResults.dmiPercentSupplied <= 115
                          ? 'bg-emerald-500'
                          : goatResults.dmiPercentSupplied < 90
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(100, goatResults.dmiPercentSupplied)}%` }}
                    />
                  </div>
                </div>

                {/* Crude Protein Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{isOdia ? 'ପ୍ରୋଟିନ୍ (Crude Protein):' : 'Crude Protein (CP):'}</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {goatResults.suppliedCpGrams}g / {goatResults.reqCpGrams}g ({goatResults.cpPercentSupplied}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        goatResults.cpPercentSupplied >= 90 && goatResults.cpPercentSupplied <= 120
                          ? 'bg-emerald-500'
                          : goatResults.cpPercentSupplied < 90
                          ? 'bg-amber-500'
                          : 'bg-purple-500'
                      }`}
                      style={{ width: `${Math.min(100, goatResults.cpPercentSupplied)}%` }}
                    />
                  </div>
                </div>

                {/* Clinical Notes & Cautions */}
                <div className="pt-2 border-t border-emerald-200/80 text-xs space-y-1.5 text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {isOdia 
                        ? 'ଖାଦ୍ୟରେ ୧୫-୨୦ ଗ୍ରାମ୍ ମିନେରାଲ୍ ମିକ୍ସଚର୍ ଓ ଲୁଣ ମିଶାନ୍ତୁ ଯାହାଦ୍ୱାରା ପେଟ ରୋଗ ଓ କାଲସିୟମ୍ ଅଭାବ ହୁଏ ନାହିଁ।' 
                        : 'Include 15-20g mineral mixture and iodized salt daily to maintain trace mineral and phosphorus balance.'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-amber-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      {isOdia 
                        ? 'ଏକାଥରେ ଅତ୍ୟଧିକ ଦାନା (Grain overload) ଦିଅନ୍ତୁ ନାହିଁ। ଏହାଦ୍ୱାରା ଏସିଡୋସିସ୍ ବା ମାରାତ୍ମକ ପେଟ ଫୁଲିବା (Acute Bloat) ହୋଇପାରେ।' 
                        : 'Avoid sudden grain overload to prevent acute lactic acidosis and frothy rumen bloat.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Typical Economical Ration Recipe for Odisha */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isOdia ? 'ଓଡ଼ିଶା ଚାଷୀଙ୍କ ପାଇଁ ଶସ୍ତା ଛେଳି ଦାନା ଫର୍ମୁଲା (୧୦ କିଲୋ)' : 'Economical Homemade Goat Mash Recipe (10 Kg Batch)'}</span>
                </h5>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li>{isOdia ? 'ଭଙ୍ଗା ମକା (Crushed Maize): ୪ କିଲୋ (୪୦%)' : 'Crushed Maize / Broken Rice: 4.0 kg (40%)'}</li>
                  <li>{isOdia ? 'ଗହମ ଚୋକଡ଼ (Wheat Bran): ୩ କିଲୋ (୩୦%)' : 'Wheat Bran / Rice Polish: 3.0 kg (30%)'}</li>
                  <li>{isOdia ? 'ମୁଗ ଚୁନି / ସୋରିଷ ପିଡ଼ିଆ: ୨.୫ କିଲୋ (୨୫%)' : 'Mung Chuni / Mustard Cake: 2.5 kg (25%)'}</li>
                  <li>{isOdia ? 'ମିନେରାଲ୍ ମିକ୍ସଚର୍ + ଲୁଣ: ୦.୫ କିଲୋ (୫%)' : 'Mineral Mixture + Salt: 0.5 kg (5%)'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. CANINE (DOG & PUPPY) NUTRITION & CALORIE STUDIO */}
      {/* ------------------------------------------------------------- */}
      {selectedSpecies === 'dog' && (
        <div className="space-y-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐶</span>
                <h3 className="text-base font-black text-slate-900">
                  {isOdia ? 'କୁକୁର କ୍ୟାଲୋରୀ ଓ ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଯୋଜନା (Canine Nutrition)' : 'Canine Calorie & Meal Formulation Studio'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isOdia 
                  ? 'WSAVA ଏବଂ NRC ମାନକ ଅନୁଯାୟୀ କୁକୁରର ପ୍ରତିଦିନ ଆବଶ୍ୟକ କ୍ୟାଲୋରୀ (Kcal) ଓ ସୁସ୍ଥ ପ୍ରୋଟିନ୍ ନିର୍ଦ୍ଧାରଣ।' 
                  : 'Calculates Resting Energy Requirement (RER) and Daily Energy Requirement (DER) with safe macro ratios.'}
              </p>
            </div>

            <button
              onClick={() => handleExportSummary('dog')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isOdia ? 'ଖାଦ୍ୟ ଚାର୍ଟ କପି କରନ୍ତୁ' : 'Export Meal Plan'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Inputs */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isOdia ? 'କୁକୁରର ବୟସ ଓ ଓଜନ' : 'Dog Profile & Activity'}</span>
              </h4>

              {/* Weight Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">{isOdia ? 'ଶରୀର ଓଜନ:' : 'Body Weight:'}</span>
                  <span className="font-bold text-slate-900 font-mono">{dogWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="0.5"
                  value={dogWeight}
                  onChange={(e) => setDogWeight(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>2 kg (Pomeranian/Pug)</span>
                  <span>18 kg (Indie / Beagle)</span>
                  <span>35 kg (Labrador / GSD)</span>
                </div>
              </div>

              {/* Life Stage */}
              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium">
                  {isOdia ? 'ଜୀବନ ସ୍ତର ଓ କାର୍ଯ୍ୟକ୍ଷମତା:' : 'Life Stage & Energy Profile:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'adult_active', labelOr: 'ପୂର୍ଣ୍ଣାଙ୍ଗ ସକ୍ରିୟ (Active Adult)', labelEn: 'Active Adult (1.6x)' },
                    { id: 'adult_neutered', labelOr: 'ନିଉଟର୍ଡ (Neutered / Indoor)', labelEn: 'Neutered (1.4x)' },
                    { id: 'puppy', labelOr: 'ଛୁଆ କୁକୁର (Growing Puppy)', labelEn: 'Growing Puppy (2.5x)' },
                    { id: 'senior', labelOr: 'ବୟସ୍କ କୁକୁର (Senior 7+ yrs)', labelEn: 'Senior Dog (1.2x)' },
                    { id: 'weight_loss', labelOr: 'ଓଜନ କମାଇବା (Weight Loss)', labelEn: 'Weight Management (1.0x)' },
                  ].map((ls) => (
                    <button
                      key={ls.id}
                      onClick={() => setDogLifeStage(ls.id as any)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all ${
                        dogLifeStage === ls.id
                          ? 'bg-white border-emerald-500 font-bold text-emerald-950 shadow-xs ring-1 ring-emerald-500'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {isOdia ? ls.labelOr : ls.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feeding Type */}
              <div className="space-y-1 pt-2 border-t border-slate-200">
                <label className="text-xs text-slate-600 font-medium">
                  {isOdia ? 'ଖାଦ୍ୟର ପ୍ରକାର:' : 'Feeding Preference:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'home_cooked', label: isOdia ? 'ଘରୋଇ ରନ୍ଧା' : 'Home Cooked' },
                    { id: 'commercial_kibble', label: isOdia ? 'ଡ୍ରାଏ କିବଲ୍' : 'Dry Kibble' },
                    { id: 'mixed', label: isOdia ? 'ମିଶ୍ରିତ ଖାଦ୍ୟ' : 'Mixed Diet' },
                  ].map((dt) => (
                    <button
                      key={dt.id}
                      onClick={() => setDogDietType(dt.id as any)}
                      className={`p-2 rounded-xl text-center border text-xs transition-all ${
                        dogDietType === dt.id
                          ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      {dt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Results & Toxic Foods Alert */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-4 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    {isOdia ? 'ଦୈନିକ କ୍ୟାଲୋରୀ ଲକ୍ଷ୍ୟ' : 'Daily Caloric Target'}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-800 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                    RER: {dogResults.rer} kcal
                  </span>
                </div>

                <div className="text-center py-2 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                  <div className="text-2xl font-black text-emerald-700 font-mono">
                    {dogResults.dailyKcal} <span className="text-xs font-bold text-slate-500">kcal / day</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isOdia 
                      ? `ଦିନକୁ ୨ ଟି ଭୋଜନରେ ପ୍ରାୟ ${Math.round(dogResults.approxDailyMealGrams / 2)} ଗ୍ରାମ୍ ଲେଖାଏଁ ବାଣ୍ଟି ଦିଅନ୍ତୁ।` 
                      : `Split into 2 meals of ~${Math.round(dogResults.approxDailyMealGrams / 2)}g each for balanced digestion.`}
                  </p>
                </div>

                {/* Macro Nutrients */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Protein</span>
                    <span className="font-bold text-slate-900 font-mono">{dogResults.proteinGrams}g</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Fats</span>
                    <span className="font-bold text-slate-900 font-mono">{dogResults.fatGrams}g</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Carbs</span>
                    <span className="font-bold text-slate-900 font-mono">{dogResults.carbGrams}g</span>
                  </div>
                </div>
              </div>

              {/* Toxic Foods Red Flag Banner (Strict Veterinary Safety) */}
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-rose-900 font-black">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{isOdia ? 'କୁକୁର ପାଇଁ ବିଷାକ୍ତ ଖାଦ୍ୟ (କଦାପି ଦିଅନ୍ତୁ ନାହିଁ):' : 'Strictly Toxic Foods (Never Feed Dogs):'}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-rose-950 font-medium">
                  <div className="bg-white/80 p-1.5 rounded-lg border border-rose-100">❌ {isOdia ? 'ପିଆଜ ଓ ରସୁଣ (Onion & Garlic)' : 'Onion & Garlic (Anemia)'}</div>
                  <div className="bg-white/80 p-1.5 rounded-lg border border-rose-100">❌ {isOdia ? 'ଚକୋଲେଟ୍ ଓ କଫି (Chocolate)' : 'Chocolate & Caffeine'}</div>
                  <div className="bg-white/80 p-1.5 rounded-lg border border-rose-100">❌ {isOdia ? 'ଅଙ୍ଗୁର ଓ କିସମିସ୍ (Grapes)' : 'Grapes & Raisins (Kidney Failure)'}</div>
                  <div className="bg-white/80 p-1.5 rounded-lg border border-rose-100">❌ {isOdia ? 'ରନ୍ଧା ହାଡ଼ (Cooked Splinter Bones)' : 'Cooked Poultry Bones'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. FELINE (CAT & KITTEN) OBLIGATE CARNIVORE NUTRITION */}
      {/* ------------------------------------------------------------- */}
      {selectedSpecies === 'cat' && (
        <div className="space-y-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐱</span>
                <h3 className="text-base font-black text-slate-900">
                  {isOdia ? 'ବିରାଡ଼ି ସନ୍ତୁଳିତ କାର୍ନିଭୋର ଖାଦ୍ୟ ଓ ଟରିନ୍ ପୋଷଣ' : 'Feline Carnivore Nutrition & Taurine Studio'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isOdia 
                  ? 'ବିରାଡ଼ି ଜଣେ ପ୍ରକୃତ ମାଂସାହାରୀ (Obligate Carnivore)। ତାକୁ ଉଚ୍ଚ ପ୍ରୋଟିନ୍, ଟରିନ୍ (Taurine) ଓ ପ୍ରଚୁର ପାଣି ଆବଶ୍ୟକ।' 
                  : 'Feline diets require essential amino acids (Taurine, Arginine) and high moisture to prevent FLUTD and renal disease.'}
              </p>
            </div>

            <button
              onClick={() => handleExportSummary('cat')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isOdia ? 'ବିରାଡ଼ି ଖାଦ୍ୟ ଯୋଜନା କପି' : 'Export Cat Plan'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cat Inputs */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isOdia ? 'ବିରାଡ଼ି ପ୍ରୋଫାଇଲ୍' : 'Cat Profile & Activity'}</span>
              </h4>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">{isOdia ? 'ଓଜନ (Weight):' : 'Body Weight:'}</span>
                  <span className="font-bold text-slate-900 font-mono">{catWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="9.0"
                  step="0.1"
                  value={catWeight}
                  onChange={(e) => setCatWeight(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1.5 kg (Kitten)</span>
                  <span>4.0 kg (Average Adult)</span>
                  <span>9.0 kg (Large / Overweight)</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium">
                  {isOdia ? 'ବୟସ ଓ ଜୀବନ ସ୍ତର:' : 'Life Stage:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'adult', labelOr: 'ପୂର୍ଣ୍ଣାଙ୍ଗ (Adult Cat)', labelEn: 'Adult (1.2x)' },
                    { id: 'indoor_low_activity', labelOr: 'ଘରୋଇ ଶାନ୍ତ (Indoor Only)', labelEn: 'Indoor Low Activity (1.0x)' },
                    { id: 'kitten', labelOr: 'ଛୋଟ ଛୁଆ (Growing Kitten)', labelEn: 'Growing Kitten (2.2x)' },
                    { id: 'senior', labelOr: 'ବୟସ୍କ ବିରାଡ଼ି (Senior 8+)', labelEn: 'Senior Feline (1.1x)' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setCatLifeStage(st.id as any)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all ${
                        catLifeStage === st.id
                          ? 'bg-white border-emerald-500 font-bold text-emerald-950 shadow-xs ring-1 ring-emerald-500'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {isOdia ? st.labelOr : st.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wet Food / Hydration check */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1.5 text-xs text-blue-950">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{isOdia ? 'ଆର୍ଦ୍ର ଖାଦ୍ୟ (Wet Food Hydration):' : 'Moisture First Philosophy:'}</span>
                  <input
                    type="checkbox"
                    checked={catMoistureFocus}
                    onChange={(e) => setCatMoistureFocus(e.target.checked)}
                    className="w-4 h-4 accent-blue-600"
                  />
                </div>
                <p className="text-[11px] text-blue-800">
                  {isOdia 
                    ? 'ବିରାଡ଼ି ମାନେ କମ ପାଣି ପିଅନ୍ତି। ତେଣୁ ଓଦା ଖାଦ୍ୟ (Gravy/Canned food/Bone broth) ମୂତ୍ରାଶୟ ପଥର (FLUTD) ରୋକିବାରେ ସାହାଯ୍ୟ କରେ।' 
                    : 'Cats have low thirst drive. Wet food maintains urine dilution and protects against painful FLUTD urethral blockages.'}
                </p>
              </div>
            </div>

            {/* Right Cat Caloric breakdown */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-4 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    {isOdia ? 'ଦୈନିକ କ୍ୟାଲୋରୀ ଓ ଜଳ ଆବଶ୍ୟକତା' : 'Calorie & Hydration Targets'}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-800 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                    RER: {catResults.rer} kcal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-white rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Energy Target</span>
                    <span className="text-xl font-black text-emerald-700 font-mono">{catResults.dailyKcal} kcal</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-blue-100">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Daily Water</span>
                    <span className="text-xl font-black text-blue-700 font-mono">{catResults.waterRequirementMl} ml</span>
                  </div>
                </div>

                {/* Macro breakdown */}
                <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">{isOdia ? 'ପ୍ରୋଟିନ୍ ଆବଶ୍ୟକତା (Crude Protein):' : 'Minimum Crude Protein:'}</span>
                    <span className="font-bold text-slate-900 font-mono">{catResults.proteinGrams} g / day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">{isOdia ? 'ସୁସ୍ଥ ସ୍ନେହସାର (Healthy Fats):' : 'Essential Lipids:'}</span>
                    <span className="font-bold text-slate-900 font-mono">{catResults.fatGrams} g / day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">{isOdia ? 'ଅତ୍ୟାବଶ୍ୟକ ଟରିନ୍ (Taurine):' : 'Essential Taurine:'}</span>
                    <span className="font-bold text-emerald-700">Non-negotiable (Fish/Liver)</span>
                  </div>
                </div>
              </div>

              {/* Feline Safe Home Food Guidance */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  <span>{isOdia ? 'ବିରାଡ଼ି ପାଇଁ ସୁରକ୍ଷିତ ଘରୋଇ ଖାଦ୍ୟ ସୂଚୀ:' : 'Safe Feline Meal Formulations:'}</span>
                </h5>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li>{isOdia ? 'ସିଝା ଚିକେନ୍ (Boiled boneless chicken without salt/masala)' : 'Boiled boneless chicken / egg (zero onion, zero garlic, no spices)'}</li>
                  <li>{isOdia ? 'ମାଛ (Steamed freshwater fish rich in Omega-3 & Taurine)' : 'Steamed freshwater fish rich in natural taurine'}</li>
                  <li>{isOdia ? 'ପାଣି ଫାଉଣ୍ଟେନ୍ କିମ୍ବା ଓଦା ବ୍ରଥ୍ ନିୟମିତ ଯୋଗାନ୍ତୁ' : 'Always keep clean running water / bone broth for kidney flushing'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
