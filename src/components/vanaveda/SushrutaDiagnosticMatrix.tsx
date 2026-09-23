// VanaVeda by Arohi - Sushruta Diagnostic Matrix & Ashta-Vidha Pariksha
// Interactive clinical assessment tool covering Nadi, Jihva, Mala, Mutra, Shabda, Sparsha, Drik, Akriti

import React, { useState } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  Flame, 
  Activity, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  ShieldAlert,
  HelpCircle,
  Layers,
  Heart
} from 'lucide-react';
import { vanavedaAudio } from './vanavedaAudio';
import { BotanicalLeafSvg } from './BotanicalLeafSvg';

interface Question {
  id: string;
  category: string;
  sanskrit: string;
  question: string;
  options: {
    label: string;
    description: string;
    dosha: 'vata' | 'pitta' | 'kapha';
  }[];
}

const ASHTA_VIDHA_QUESTIONS: Question[] = [
  {
    id: 'nadi',
    category: 'Pulse & Rhythm',
    sanskrit: 'नाडी परीक्षा (Nadi Pariksha)',
    question: 'How does your resting pulse and heart rhythm feel right now?',
    options: [
      { label: 'Sarpa Gati (Serpentine)', description: 'Fast, thin, irregular, skips beats, variable velocity', dosha: 'vata' },
      { label: 'Manduka Gati (Frog Leaping)', description: 'Bounding, strong, sharp, warm, prominent systolic jump', dosha: 'pitta' },
      { label: 'Hamsa Gati (Swan Gliding)', description: 'Slow, steady, broad, soft, deep, unhurried wave', dosha: 'kapha' }
    ]
  },
  {
    id: 'jihva',
    category: 'Tongue Morphology',
    sanskrit: 'जिह्वा परीक्षा (Jihva Pariksha)',
    question: 'Observe your tongue in a mirror. What coating and color dominate?',
    options: [
      { label: 'Dry & Cracked', description: 'Thin grey/brown coating, dry surface, tremors, lateral teeth indentations', dosha: 'vata' },
      { label: 'Red Tip & Yellowish Coating', description: 'Deep red margins, yellow/green film in center, sharp prickles', dosha: 'pitta' },
      { label: 'Thick White Sludge (Ama)', description: 'Heavy white greasy coating, swollen edges, excess wet saliva', dosha: 'kapha' }
    ]
  },
  {
    id: 'agni',
    category: 'Digestive Fire & Bowels',
    sanskrit: 'अग्नि एवं कोष्ठ परीक्षा (Agni & Kostha)',
    question: 'How does your appetite and bowel evacuation behave after eating?',
    options: [
      { label: 'Vishamagni (Irregular Fire)', description: 'Erratic hunger, hard dry pellets, bloating, gas colic within 2 hours', dosha: 'vata' },
      { label: 'Tikshnagni (Intense Fire)', description: 'Insatiable hunger, heartburn, loose mucosal stools, irritability if meal delayed', dosha: 'pitta' },
      { label: 'Mandagni (Sluggish Fire)', description: 'Low appetite, heavy fullness, slow greasy bowel movements, post-prandial stupor', dosha: 'kapha' }
    ]
  },
  {
    id: 'sparsha',
    category: 'Skin Texture & Temperature',
    sanskrit: 'स्पर्श परीक्षा (Sparsha Pariksha)',
    question: 'Touch the back of your hand and feet. How does your skin feel?',
    options: [
      { label: 'Cold & Rough', description: 'Dry, flaky, prone to cracking, cold fingers and toes', dosha: 'vata' },
      { label: 'Warm & Flushed', description: 'High local heat, prone to redness, hives, acne, easily perspires', dosha: 'pitta' },
      { label: 'Cool, Moist & Thick', description: 'Soft, well-lubricated, cool to touch, retains water or puffiness', dosha: 'kapha' }
    ]
  },
  {
    id: 'manas',
    category: 'Mental State & Sleep',
    sanskrit: 'मानस एवं निद्रा (Manas & Nidra)',
    question: 'How is your mental focus, stress response, and night sleep quality?',
    options: [
      { label: 'Anxious & Light Sleeper', description: 'Racing thoughts, wakes at 3 AM with heart flutter, vivid dreams', dosha: 'vata' },
      { label: 'Driven, Critical & Impatient', description: 'Sharp focus, easily agitated, wakes up hot with intense dreams', dosha: 'pitta' },
      { label: 'Lethargic, Attached & Heavy', description: 'Deep long sleep, hard to wake up before dawn, mental fog and procrastination', dosha: 'kapha' }
    ]
  }
];

interface Props {
  onConsultResult: (summaryText: string) => void;
}

export const SushrutaDiagnosticMatrix: React.FC<Props> = ({ onConsultResult }) => {
  const [answers, setAnswers] = useState<Record<string, 'vata' | 'pitta' | 'kapha'>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleSelectOption = (qId: string, dosha: 'vata' | 'pitta' | 'kapha') => {
    setAnswers(prev => ({ ...prev, [qId]: dosha }));
    vanavedaAudio.playTempleBell(659.25);
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === ASHTA_VIDHA_QUESTIONS.length;

  const calculateResults = () => {
    setIsCalculated(true);
    vanavedaAudio.playSingingBowl(528);
  };

  const resetAssessment = () => {
    setAnswers({});
    setIsCalculated(false);
  };

  // Compute Dosha Scores
  const doshaTally = { vata: 0, pitta: 0, kapha: 0 };
  Object.values(answers).forEach(d => {
    doshaTally[d] += 1;
  });

  const dominantDosha = (
    doshaTally.vata >= doshaTally.pitta && doshaTally.vata >= doshaTally.kapha ? 'Vata' :
    doshaTally.pitta >= doshaTally.vata && doshaTally.pitta >= doshaTally.kapha ? 'Pitta' : 'Kapha'
  );

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-[#FAF5EC] via-[#F3ECE0] to-[#EFE7D8] dark:from-[#111A13] dark:via-[#162319] dark:to-[#0F1811] rounded-3xl p-6 sm:p-8 border border-[#E7DEC8] dark:border-[#203022] shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B45309]/15 border border-[#B45309]/30 text-[#B45309] dark:text-[#FBBF24] text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Ashta-Vidha Pariksha (अष्टविध परीक्षा)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2B1B10] dark:text-[#F3F4F6] tracking-tight">
            Sushruta Clinical Diagnostic Matrix
          </h2>
          <p className="mt-2 text-sm text-[#5D4A3A] dark:text-[#9CA3AF] leading-relaxed">
            Maharishi Sushruta formulated eight classical clinical diagnostic observations to identify the root pathological imbalance (Vikriti) before physical tissue destruction occurs. Answer the 5 sacred clinical indicators below.
          </p>
        </div>
      </div>

      {!isCalculated ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between gap-4 text-xs font-semibold text-[#5D4A3A] dark:text-[#9CA3AF]">
            <span>Assessment Progress: {answeredCount} / {ASHTA_VIDHA_QUESTIONS.length} Clinical Nodes</span>
            <span className="font-mono font-bold text-[#15803D] dark:text-[#4ADE80]">
              {Math.round((answeredCount / ASHTA_VIDHA_QUESTIONS.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#E7DEC8] dark:bg-[#203022] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#15803D] to-[#D97706] transition-all duration-300 rounded-full"
              style={{ width: `${(answeredCount / ASHTA_VIDHA_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Questions List */}
          <div className="space-y-5">
            {ASHTA_VIDHA_QUESTIONS.map((q, idx) => {
              const selectedValue = answers[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-[#FAF7F2] dark:bg-[#121B14] p-5 sm:p-6 rounded-3xl border border-[#E7DEC8] dark:border-[#223324] shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#B45309] dark:text-[#FBBF24]">
                        Step {idx + 1} • {q.sanskrit}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#2B1B10] dark:text-[#F3F4F6] mt-0.5">
                        {q.question}
                      </h4>
                    </div>
                    {selectedValue && (
                      <CheckCircle2 className="w-5 h-5 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = selectedValue === opt.dosha;
                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleSelectOption(q.id, opt.dosha)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isChosen
                              ? 'bg-white dark:bg-[#18251b] border-[#15803D] dark:border-[#4ADE80] shadow-md ring-2 ring-[#15803D]/20'
                              : 'bg-white/60 dark:bg-[#141E16] border-[#E7DEC8] dark:border-[#203022] hover:bg-white dark:hover:bg-[#172319]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-serif font-bold text-sm text-[#2B1B10] dark:text-[#F3F4F6]">
                                {opt.label}
                              </span>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                opt.dosha === 'vata' ? 'bg-[#B45309]/15 text-[#B45309]' :
                                opt.dosha === 'pitta' ? 'bg-[#D97706]/15 text-[#D97706]' : 'bg-[#15803D]/15 text-[#15803D]'
                              }`}>
                                {opt.dosha}
                              </span>
                            </div>
                            <p className="text-xs text-[#5D4A3A] dark:text-[#9CA3AF] leading-relaxed">
                              {opt.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calculate Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={calculateResults}
              disabled={!isComplete}
              className="px-6 py-3 rounded-2xl bg-[#15803D] hover:bg-[#166534] disabled:opacity-40 text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Compute Sushruta Diagnosis Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-[#FAF7F2] dark:bg-[#121B14] p-6 sm:p-8 rounded-3xl border border-[#E7DEC8] dark:border-[#223324] shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7DEC8] dark:border-[#223324]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] dark:text-[#FBBF24]">
                Clinical Pariksha Complete
              </span>
              <h3 className="font-serif font-black text-2xl text-[#2B1B10] dark:text-[#F3F4F6] mt-1">
                Dominant Imbalance: Aggravated {dominantDosha} Dosha (विकृति)
              </h3>
              <p className="text-xs text-[#5D4A3A] dark:text-[#9CA3AF] mt-1">
                Based on Nadi Pariksha, tongue morphology, Agni state, and autonomic nervous tone.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetAssessment}
                className="px-4 py-2 rounded-xl bg-white dark:bg-[#18231a] border border-[#E7DEC8] dark:border-[#283929] text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-50 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Test</span>
              </button>
              <button
                onClick={() => onConsultResult(`My Sushruta diagnostic score indicates dominant aggravated ${dominantDosha} Dosha (Vata: ${doshaTally.vata}, Pitta: ${doshaTally.pitta}, Kapha: ${doshaTally.kapha}). Please formulate my customized leaf prescription.`)}
                className="px-4 py-2 rounded-xl bg-[#15803D] text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-[#166534] transition"
              >
                <span>Consult Arohi on Remedy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dosha Breakdown Gauge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-[#18231a] rounded-2xl border border-[#E7DEC8] dark:border-[#283929] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#B45309]">Vata Dosha (Wind/Space)</span>
                <span className="font-mono text-xs font-black">{Math.round((doshaTally.vata / 5) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-[#B45309]" style={{ width: `${(doshaTally.vata / 5) * 100}%` }} />
              </div>
              <p className="text-[11px] text-slate-500">Governs neural impulses, cellular transport, and breath rhythm.</p>
            </div>

            <div className="p-4 bg-white dark:bg-[#18231a] rounded-2xl border border-[#E7DEC8] dark:border-[#283929] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#D97706]">Pitta Dosha (Fire/Water)</span>
                <span className="font-mono text-xs font-black">{Math.round((doshaTally.pitta / 5) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-[#D97706]" style={{ width: `${(doshaTally.pitta / 5) * 100}%` }} />
              </div>
              <p className="text-[11px] text-slate-500">Governs enzymatic metabolism, liver transformation, and heat.</p>
            </div>

            <div className="p-4 bg-white dark:bg-[#18231a] rounded-2xl border border-[#E7DEC8] dark:border-[#283929] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#15803D]">Kapha Dosha (Water/Earth)</span>
                <span className="font-mono text-xs font-black">{Math.round((doshaTally.kapha / 5) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-[#15803D]" style={{ width: `${(doshaTally.kapha / 5) * 100}%` }} />
              </div>
              <p className="text-[11px] text-slate-500">Governs lymphatic lubrication, physical immunity, and tissue mass.</p>
            </div>
          </div>

          {/* Recommended Botanical Prescription */}
          <div className="p-5 bg-[#FAF5EC] dark:bg-[#152217] rounded-2xl border-l-4 border-[#15803D] space-y-3">
            <h4 className="font-serif font-bold text-base text-[#15803D] dark:text-[#4ADE80] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Sushruta Prescribed Leaf Formulation for {dominantDosha} Imbalance</span>
            </h4>
            <p className="text-xs text-[#2B1B10] dark:text-[#D1D5DB] leading-relaxed">
              {dominantDosha === 'Vata'
                ? 'Your diagnostic profile indicates nervous system depletion, dry cellular tissues, and erratic Agni. The sovereign botanical protocol requires Parijat leaf decoction for neuromuscular easing paired with Peepal Ksheerapaka at sunset.'
                : dominantDosha === 'Pitta'
                ? 'Your diagnostic profile reveals bile heat in Raktavaha Srotas, high gastric acidity, and accelerated metabolism. The recommended herbal regimen is Neem cold infusion (Hima) at dawn with Arjuna milk decoction to protect cardiac endothelium.'
                : 'Your diagnostic profile demonstrates lymphatic stagnation, mucosal coating (Ama) on the tongue, and sluggish metabolism. The primary botanical intervention is fresh Tulsi juice with black pepper and raw wild honey.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
