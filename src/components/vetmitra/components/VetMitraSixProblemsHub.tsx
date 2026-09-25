// Arohi VetMitra - 6 Major Dairy Problems Skill & Training Hub
// Field Advisory: Major Problems Reported by Dairy Farmers During Training

import React, { useState } from 'react';
import { 
  SIX_MAJOR_DAIRY_PROBLEMS, 
  SixProblemsCategory 
} from '../data/smileOdishaData';
import { VetLanguage } from '../types';
import { 
  AlertCircle, Droplet, HeartHandshake, Smile, ShieldCheck, 
  Wheat, Sparkles, ChevronRight, CheckCircle2, MessageSquare, 
  ArrowRight, PhoneCall, Lightbulb, BookOpen
} from 'lucide-react';

interface Props {
  language: VetLanguage;
  onSendToChat?: (text: string) => void;
  onStartVoiceConsultation?: (topic: string) => void;
}

export const VetMitraSixProblemsHub: React.FC<Props> = ({ 
  language, 
  onSendToChat,
  onStartVoiceConsultation 
}) => {
  const isOdia = language === 'or';
  const [selectedProblemId, setSelectedProblemId] = useState<string>('feeding_nutrition');

  const activeProblem = SIX_MAJOR_DAIRY_PROBLEMS.find(p => p.id === selectedProblemId) || SIX_MAJOR_DAIRY_PROBLEMS[0];

  const handleAskArohi = (problem: SixProblemsCategory) => {
    const promptText = `I need practical clinical advice on: ${problem.title} (${problem.titleOdia}).
Reported Field Challenges:
${problem.reportedProblems.map(p => `• ${p}`).join('\n')}

Clinical Action Protocol:
${problem.clinicalSolution}

Please guide me step-by-step for my farm in Odisha.`;

    if (onSendToChat) {
      onSendToChat(promptText);
    } else {
      navigator.clipboard?.writeText(promptText);
      alert('Problem topic copied to clipboard!');
    }
  };

  const getProblemIcon = (id: string) => {
    switch (id) {
      case 'feeding_nutrition': return <Wheat className="w-5 h-5 text-amber-400" />;
      case 'milk_production': return <Droplet className="w-5 h-5 text-teal-400" />;
      case 'udder_health_mastitis': return <AlertCircle className="w-5 h-5 text-rose-400" />;
      case 'reproductive_problems': return <HeartHandshake className="w-5 h-5 text-fuchsia-400" />;
      case 'calf_young_stock': return <Smile className="w-5 h-5 text-blue-400" />;
      case 'general_health': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border border-blue-500/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>SMILE & Odisha F&ARD Training Curriculum</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
              {isOdia ? 'ଓଡ଼ିଶା ଦୁଗ୍ଧଚାଷୀଙ୍କ ୬ଟି ପ୍ରମୁଖ ସମସ୍ୟା ଓ ସମାଧାନ' : '6 Major Problems Reported by Dairy Farmers in Odisha'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {isOdia 
                ? 'ପ୍ରଶିକ୍ଷଣ ସମୟରେ ଚାଷୀମାନେ ଜଣାଇଥିବା ୬ଟି ମୁଖ୍ୟ ବିଷୟ: ଖାଦ୍ୟ, ଦୁଧ ହ୍ରାସ, ଥନ ରୋଗ, ପ୍ରଜନନ ସମସ୍ୟା, ବାଛୁରୀ ଯତ୍ନ ଏବଂ ସାଧାରଣ ରୋଗର ଡାକ୍ତରୀ ନିଦାନ।'
                : 'Identified during field training across Odisha: Feeding & nutrition, milk yield persistency, mastitis prevention, repeat breeding, calf survival, and preventive vaccination.'}
            </p>
          </div>
        </div>
      </div>

      {/* 6 Category Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SIX_MAJOR_DAIRY_PROBLEMS.map((problem) => {
          const isSelected = problem.id === selectedProblemId;
          return (
            <button
              key={problem.id}
              onClick={() => setSelectedProblemId(problem.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-950/60 border-blue-500/80 text-blue-100 ring-1 ring-blue-500/40 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-2">
                {getProblemIcon(problem.id)}
              </div>
              <span className="text-[10px] font-mono text-blue-400 font-bold block uppercase tracking-wider">
                Pillar {problem.number}
              </span>
              <h4 className="font-bold text-xs text-slate-100 mt-0.5 line-clamp-2">
                {isOdia ? problem.titleOdia : problem.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Active Problem Panel */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
              {getProblemIcon(activeProblem.id)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                  Pillar {activeProblem.number}
                </span>
                <h3 className="text-lg font-bold text-slate-100 font-serif">
                  {isOdia ? activeProblem.titleOdia : activeProblem.title}
                </h3>
              </div>
              <p className="text-xs text-emerald-400 mt-1 font-medium">
                Training Focus: {activeProblem.trainingFocus}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleAskArohi(activeProblem)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isOdia ? 'ଏହି ସମସ୍ୟା ପଚାରନ୍ତୁ' : 'Consult Arohi on This'}</span>
          </button>
        </div>

        {/* 2-Column Grid: Reported Problems vs Practical Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column: Reported Problems by Odisha Farmers */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Major Problems Reported by Farmers:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeProblem.reportedProblems.map((prob, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Practical Clinical Action Protocol */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-950 border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Arohi VetMitra Clinical Intervention Protocol:</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed font-mono">
              {activeProblem.clinicalSolution}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
              <span>National Animal Helpline: <strong className="text-emerald-300">1962 (Toll Free)</strong></span>
              <span>Supported by: <strong className="text-slate-200">SMILE & F&ARD</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
