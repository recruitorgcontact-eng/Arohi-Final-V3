// VanaVeda by Arohi - Pranayama Breath Pacer, Ojas Vitality Calculator & Sacred Dinacharya
// Combines 4:4:4:4 Sama Vritti / 4:7:8 Anulom Vilom pacer with 432Hz sound chimes and lifestyle rhythm tracker

import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  Sun, 
  Moon, 
  Flame, 
  Volume2, 
  VolumeX, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { vanavedaAudio } from './vanavedaAudio';

interface Props {
  onPrescribeWithArohi: (topic: string) => void;
}

export const PranayamaOjasDinacharyaSuite: React.FC<Props> = ({ onPrescribeWithArohi }) => {
  const [activeTab, setActiveTab] = useState<'pranayama' | 'ojas' | 'dinacharya'>('pranayama');

  // Pranayama Pacer State
  const [pranayamaType, setPranayamaType] = useState<'samavritti' | 'nadi_shodhana' | 'bhramari'>('samavritti');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale (Puraka)' | 'Hold (Kumbhaka)' | 'Exhale (Rechaka)' | 'Rest (Shunya)'>('Inhale (Puraka)');
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Ojas Calculator State
  const [sleepScore, setSleepScore] = useState(7);
  const [digestionScore, setDigestionScore] = useState(7);
  const [stressScore, setStressScore] = useState(5);
  const [ojasCalculated, setOjasCalculated] = useState(false);

  // Dinacharya Checked Items
  const [dinacharyaChecks, setDinacharyaChecks] = useState<Record<string, boolean>>({
    brahma_muhurta: true,
    ushapan: true,
    danta_dhavan: false,
    abhyanga: false,
    pranayama: false,
    madhyahna_bhojan: false,
    sandhya_arati: false,
    ratricharya: false
  });

  const toggleCheck = (id: string) => {
    setDinacharyaChecks(prev => {
      const next = !prev[id];
      if (next) vanavedaAudio.playTempleBell(659.25);
      return { ...prev, [id]: next };
    });
  };

  // Breathing Cycle Timer
  useEffect(() => {
    let timer: any = null;
    if (isActive) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Transition phase
            if (phase === 'Inhale (Puraka)') {
              vanavedaAudio.playTempleBell(587.33); // D5
              setPhase('Hold (Kumbhaka)');
              return 4;
            } else if (phase === 'Hold (Kumbhaka)') {
              vanavedaAudio.playSingingBowl(432);
              setPhase('Exhale (Rechaka)');
              return pranayamaType === 'samavritti' ? 4 : 6;
            } else if (phase === 'Exhale (Rechaka)') {
              vanavedaAudio.playTempleBell(523.25); // C5
              setPhase('Rest (Shunya)');
              return 2;
            } else {
              setCyclesCompleted(c => c + 1);
              vanavedaAudio.playTempleBell(659.25);
              setPhase('Inhale (Puraka)');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase, pranayamaType]);

  const toggleBreathing = () => {
    if (!isActive) {
      vanavedaAudio.playSingingBowl(432);
    }
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setPhase('Inhale (Puraka)');
    setCountdown(4);
    setCyclesCompleted(0);
  };

  // Compute Ojas Score (Scale 0 - 100)
  const computedOjas = Math.min(100, Math.round((sleepScore * 3.5) + (digestionScore * 4.0) + ((10 - stressScore) * 2.5)));

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAF5EC] via-[#F3ECE0] to-[#EFE7D8] dark:from-[#111A13] dark:via-[#162319] dark:to-[#0F1811] rounded-3xl p-6 sm:p-8 border border-[#E7DEC8] dark:border-[#203022] shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/10 dark:bg-[#15803D]/25 border border-[#15803D]/30 text-[#15803D] dark:text-[#4ADE80] text-xs font-bold uppercase tracking-wider mb-3">
            <Wind className="w-3.5 h-3.5" />
            <span>Sadhana & Bio-Rhythm Sanctuary</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2B1B10] dark:text-[#F3F4F6] tracking-tight">
            Pranayama Pacer, Ojas Tracker & Dinacharya
          </h2>
          <p className="mt-2 text-sm text-[#5D4A3A] dark:text-[#9CA3AF] leading-relaxed">
            Integrate sacred daily timing (Dinacharya), bio-resonant breath pacing calibrated to 432Hz acoustic harmonics, and monitor your underlying Ojas (cellular vital resilience).
          </p>
        </div>
      </div>

      {/* Mode Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveTab('pranayama')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'pranayama'
              ? 'bg-[#15803D] text-white shadow-md'
              : 'bg-[#FAF7F2] dark:bg-[#121B14] text-slate-600 dark:text-slate-400 border border-[#E7DEC8] dark:border-[#223324] hover:text-[#15803D]'
          }`}
        >
          💨 Pranayama Breath Pacer
        </button>
        <button
          onClick={() => setActiveTab('ojas')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'ojas'
              ? 'bg-[#15803D] text-white shadow-md'
              : 'bg-[#FAF7F2] dark:bg-[#121B14] text-slate-600 dark:text-slate-400 border border-[#E7DEC8] dark:border-[#223324] hover:text-[#15803D]'
          }`}
        >
          ✨ Ojas Vitality Calculator
        </button>
        <button
          onClick={() => setActiveTab('dinacharya')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'dinacharya'
              ? 'bg-[#15803D] text-white shadow-md'
              : 'bg-[#FAF7F2] dark:bg-[#121B14] text-slate-600 dark:text-slate-400 border border-[#E7DEC8] dark:border-[#223324] hover:text-[#15803D]'
          }`}
        >
          🌅 Sacred Dinacharya Timetable
        </button>
      </div>

      {/* Tab 1: Pranayama Breath Pacer */}
      {activeTab === 'pranayama' && (
        <div className="bg-[#FAF7F2] dark:bg-[#121B14] rounded-3xl border border-[#E7DEC8] dark:border-[#223324] p-6 sm:p-10 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setPranayamaType('samavritti'); resetBreathing(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                pranayamaType === 'samavritti' ? 'bg-[#15803D] text-white' : 'bg-white dark:bg-[#18231a] text-slate-600 dark:text-slate-400'
              }`}
            >
              Sama Vritti (Box 4:4:4:2)
            </button>
            <button
              onClick={() => { setPranayamaType('nadi_shodhana'); resetBreathing(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                pranayamaType === 'nadi_shodhana' ? 'bg-[#15803D] text-white' : 'bg-white dark:bg-[#18231a] text-slate-600 dark:text-slate-400'
              }`}
            >
              Nadi Shodhana (4:4:6:2)
            </button>
          </div>

          {/* Animated Mandala Pulsing Sphere */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer pulsating ring */}
            <div
              className={`absolute inset-0 rounded-full border-4 border-[#15803D]/20 transition-all duration-1000 ${
                phase.includes('Inhale')
                  ? 'scale-110 border-[#15803D]/60'
                  : phase.includes('Exhale')
                  ? 'scale-90 border-[#D97706]/40'
                  : 'scale-100'
              }`}
            />
            {/* Inner Sacred Center */}
            <div
              className={`w-48 h-48 rounded-full bg-gradient-to-br from-[#FAF5EC] to-[#EAE0CD] dark:from-[#18251b] dark:to-[#101712] border-2 border-[#15803D] flex flex-col items-center justify-center p-4 shadow-xl transition-all duration-1000 ${
                phase.includes('Inhale')
                  ? 'scale-105 shadow-[0_0_40px_rgba(21,128,61,0.25)]'
                  : phase.includes('Exhale')
                  ? 'scale-95 shadow-inner'
                  : 'scale-100'
              }`}
            >
              <span className="font-serif font-bold text-sm text-[#15803D] dark:text-[#4ADE80]">
                {phase}
              </span>
              <span className="text-4xl font-mono font-black text-[#2B1B10] dark:text-[#F3F4F6] my-1">
                {countdown}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                Seconds
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Cycles Completed: <strong className="text-[#15803D] text-sm">{cyclesCompleted}</strong>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleBreathing}
              className="px-6 py-3 rounded-2xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isActive ? 'Pause Pranayama' : 'Begin Pranayama'}</span>
            </button>
            <button
              onClick={resetBreathing}
              className="p-3 rounded-2xl bg-white dark:bg-[#18231a] border border-[#E7DEC8] dark:border-[#283929] text-slate-600 dark:text-slate-300 hover:text-[#15803D] cursor-pointer"
              title="Reset counter"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#5D4A3A] dark:text-[#9CA3AF] max-w-md">
            Harmonized with 432Hz bell chimes on each transition to stimulate vagal nerve parasympathetic relaxation.
          </p>
        </div>
      )}

      {/* Tab 2: Ojas Vitality Calculator */}
      {activeTab === 'ojas' && (
        <div className="bg-[#FAF7F2] dark:bg-[#121B14] rounded-3xl border border-[#E7DEC8] dark:border-[#223324] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="max-w-xl">
            <h3 className="font-serif font-black text-xl text-[#2B1B10] dark:text-[#F3F4F6]">
              Ojas (ओजस्) Bio-Resilience Quotient
            </h3>
            <p className="text-xs text-[#5D4A3A] dark:text-[#9CA3AF] mt-1">
              Ojas is the refined biological essence of all 7 Dhatus (tissues). It governs cellular immunity, luminous skin, mental clarity, and stamina. Adjust your 3 core daily pillars below.
            </p>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white dark:bg-[#18231a] rounded-2xl border border-[#E7DEC8] dark:border-[#283929] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#2B1B10] dark:text-[#F3F4F6]">
                  Nidra (Sleep Depth)
                </span>
                <span className="font-mono text-xs font-bold text-[#15803D]">{sleepScore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={sleepScore}
                onChange={(e) => setSleepScore(Number(e.target.value))}
                className="w-full accent-[#15803D]"
              />
              <p className="text-[11px] text-slate-500">Uninterrupted sleep before midnight regenerates bone marrow (Majja).</p>
            </div>

            <div className="p-5 bg-white dark:bg-[#18231a] rounded-2xl border border-[#E7DEC8] dark:border-[#283929] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#2B1B10] dark:text-[#F3F4F6]">
                  Agni (Digestive Fire)
                </span>
                <span className="font-mono text-xs font-bold text-[#D97706]">{digestionScore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={digestionScore}
                onChange={(e) => setDigestionScore(Number(e.target.value))}
                className="w-full accent-[#D97706]"
              />
              <p className="text-[11px] text-slate-500">Zero bloating or tongue coating guarantees optimal Rasa transformation.</p>
            </div>

            <div className="p-5 bg-white dark:bg-[#18231a] rounded-2xl border border-[#E7DEC8] dark:border-[#283929] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#2B1B10] dark:text-[#F3F4F6]">
                  Krodha/Chinta (Stress)
                </span>
                <span className="font-mono text-xs font-bold text-rose-500">{stressScore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stressScore}
                onChange={(e) => setStressScore(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
              <p className="text-[11px] text-slate-500">Excess cortisol and chronic irritation burn subtle biological Ojas.</p>
            </div>
          </div>

          {/* Score Result Gauge */}
          <div className="p-6 bg-[#FAF5EC] dark:bg-[#162319] rounded-2xl border border-[#E7DEC8] dark:border-[#223324] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-4 border-[#15803D] flex flex-col items-center justify-center bg-white dark:bg-[#111A13] shadow-md">
                <span className="text-2xl font-mono font-black text-[#15803D] dark:text-[#4ADE80]">
                  {computedOjas}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400">/ 100</span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#2B1B10] dark:text-[#F3F4F6]">
                  {computedOjas >= 80 ? '🌟 Para Ojas (Supreme Cellular Immunity)' :
                   computedOjas >= 60 ? '🌿 Apara Ojas (Moderate Vitality)' : '⚠️ Ojo-Kshaya (Depleted Vitality)'}
                </h4>
                <p className="text-xs text-[#5D4A3A] dark:text-[#9CA3AF] mt-0.5">
                  {computedOjas >= 80 ? 'Your physical and mental tissues are in supreme sattvic equilibrium.' :
                   computedOjas >= 60 ? 'Good baseline resilience. Needs deeper sleep and Bilva gut support.' : 'Severe depletion. Immediately begin Tulsi Swarasa with raw honey and Brahmi Ghrita.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onPrescribeWithArohi(`My Ojas score is currently ${computedOjas}/100. How can I protect and restore my cellular Ojas through botanical leaves?`)}
              className="px-5 py-2.5 rounded-xl bg-[#15803D] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#166534] transition shrink-0"
            >
              Restore Ojas with Arohi
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Sacred Dinacharya Timetable */}
      {activeTab === 'dinacharya' && (
        <div className="bg-[#FAF7F2] dark:bg-[#121B14] rounded-3xl border border-[#E7DEC8] dark:border-[#223324] p-6 sm:p-8 shadow-sm space-y-4">
          <div className="max-w-xl">
            <h3 className="font-serif font-black text-xl text-[#2B1B10] dark:text-[#F3F4F6]">
              Vedic Circadian Dinacharya Schedule
            </h3>
            <p className="text-xs text-[#5D4A3A] dark:text-[#9CA3AF] mt-1">
              Synchronizing daily activities with the solar and biological dosha clock keeps the immune system impenetrable. Tap to check off completed rituals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {[
              { id: 'brahma_muhurta', time: '04:30 AM - 05:30 AM', name: 'Brahma Muhurta Jagrana', desc: 'Waking at dawn when atmospheric Vata is sattvic and light.' },
              { id: 'ushapan', time: '05:30 AM - 06:00 AM', name: 'Ushapan (Copper Water)', desc: 'Drinking 200ml warm spring water to stimulate colon peristalsis.' },
              { id: 'danta_dhavan', time: '06:00 AM - 06:30 AM', name: 'Danta Dhavan & Kavala', desc: 'Chewing fresh Neem or Babool twig; sesame oil gargle (Gandusha).' },
              { id: 'abhyanga', time: '06:30 AM - 07:00 AM', name: 'Abhyanga (Warm Oil Massage)', desc: 'Warm sesame or mustard oil self-massage before warm herbal bath.' },
              { id: 'pranayama', time: '07:00 AM - 07:30 AM', name: 'Pranayama & 7 Tulsi Leaves', desc: '15 mins Nadi Shodhana breathing followed by chewing 7 fresh holy basil leaves.' },
              { id: 'madhyahna_bhojan', time: '12:00 PM - 01:30 PM', name: 'Madhyahna Bhojana (Peak Sun)', desc: 'Principal meal of the day when solar digestive Agni is at maximum potency.' },
              { id: 'sandhya_arati', time: '06:30 PM - 07:00 PM', name: 'Sandhya Bela & Light Dinner', desc: 'Sunset meditation; light vegetable or leaf soup without heavy curd/cheese.' },
              { id: 'ratricharya', time: '09:30 PM - 10:00 PM', name: 'Nidra Prep & Triphala / Peepal Milk', desc: 'Sip warm Peepal milk decoction; retire before 10 PM to avoid midnight Pitta flare.' },
            ].map((d) => {
              const isDone = dinacharyaChecks[d.id];
              return (
                <div
                  key={d.id}
                  onClick={() => toggleCheck(d.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isDone
                      ? 'bg-white dark:bg-[#18231a] border-[#15803D] dark:border-[#4ADE80] shadow-xs'
                      : 'bg-white/50 dark:bg-[#141E16] border-[#E7DEC8] dark:border-[#223324]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#D97706]">
                        {d.time}
                      </span>
                    </div>
                    <h5 className="font-serif font-bold text-sm text-[#2B1B10] dark:text-[#F3F4F6]">
                      {d.name}
                    </h5>
                    <p className="text-[11px] text-[#5D4A3A] dark:text-[#9CA3AF] leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-[#15803D] border-[#15803D] text-white' : 'border-slate-300 dark:border-slate-700'
                  }`}>
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
