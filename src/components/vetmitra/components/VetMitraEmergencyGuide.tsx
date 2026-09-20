// Arohi VetMitra - Emergency Veterinary Triage Guide
// Life-saving first aid, red flag checklists, and hospital referral protocols

import React from 'react';
import { 
  AlertTriangle, PhoneCall, ShieldAlert, HeartPulse, 
  CheckCircle2, XCircle, ArrowRight 
} from 'lucide-react';
import { VetSpecies, VetLanguage } from '../types';
import { SPECIES_KNOWLEDGE } from '../data/speciesKnowledgeBase';

interface Props {
  species: VetSpecies;
  language: VetLanguage;
  onOpenChatWithQuery?: (query: string) => void;
}

export const VetMitraEmergencyGuide: React.FC<Props> = ({
  species,
  language,
  onOpenChatWithQuery,
}) => {
  const currentSpeciesData = SPECIES_KNOWLEDGE[species];

  return (
    <div className="space-y-6 pb-12">
      {/* Emergency Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/80 via-red-900/40 to-slate-900/80 border border-rose-500/40 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-rose-100">
                {language === 'or' ? 'ଜରୁରୀକାଳୀନ ପଶୁ ଚିକିତ୍ସା ନିର୍ଦ୍ଦେଶିକା' : 'Emergency Triage & First-Aid Protocols'}
              </h2>
              <p className="text-xs sm:text-sm text-rose-200/80 mt-0.5">
                Life-saving decision support for critical situations. When red-flag signs appear, seek immediate professional veterinary care.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-rose-500/30 flex items-center gap-2 text-xs">
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">NATIONAL ANIMAL HELPLINE</span>
                <span className="text-sm font-bold text-rose-300 font-mono">1962</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vital Signs Reference */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <HeartPulse className="w-4 h-4 text-rose-400" />
          <span>Normal Physiological Baseline ({currentSpeciesData.displayName})</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Normal Temperature</div>
            <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">
              {currentSpeciesData.normalPhysiology.temperatureC}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Heart / Pulse Rate</div>
            <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">
              {currentSpeciesData.normalPhysiology.heartRateBpm}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Respiratory Rate</div>
            <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">
              {currentSpeciesData.normalPhysiology.respiratoryRateBpm}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 text-[11px]">Average Gestation</div>
            <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">
              {currentSpeciesData.normalPhysiology.gestationDays}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Conditions Matrix */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">
          Critical Conditions &amp; Action Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSpeciesData.emergencyRedFlags.map((em, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-rose-500/20 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-rose-300">{em.condition}</h4>
                  <div className="text-xs text-rose-200/70 mt-0.5">{em.conditionOdia}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  CRITICAL
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                    Warning Symptoms (ଲକ୍ଷଣ):
                  </span>
                  <span className="text-slate-200">{em.warningSign}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                  <span className="text-[11px] font-semibold text-rose-300 block mb-0.5">
                    Immediate Action (ତୁରନ୍ତ ପଦକ୍ଷେପ):
                  </span>
                  <span className="text-rose-100">{em.immediateAction}</span>
                </div>
              </div>

              {onOpenChatWithQuery && (
                <button
                  onClick={() => onOpenChatWithQuery(`Emergency guidance needed: ${em.condition}`)}
                  className="w-full py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 text-xs font-medium text-slate-300 hover:text-rose-300 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Ask Arohi for Emergency Step-by-Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Strict Veterinary Safety Rules */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Critical Do's and Don'ts in Animal Health</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
            <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Safe First-Aid Practices (Do's)</span>
            </div>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>• Always check and record rectal temperature with a digital thermometer.</li>
              <li>• Keep sick animals isolated in a calm, dry, and well-bedded enclosure.</li>
              <li>• Offer clean drinking water with electrolyte salts when dehydration is detected.</li>
              <li>• Keep drug packages and pesticide labels ready for your attending doctor.</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
            <div className="font-semibold text-rose-300 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              <span>Forbidden Practices (Don'ts)</span>
            </div>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>• NEVER force drench liquid into the mouth of a down or convulsing animal.</li>
              <li>• NEVER administer human NSAIDs (like paracetamol/ibuprofen) to dogs or cats.</li>
              <li>• NEVER forcibly pull retained placenta (ROP) manually — causes uterine rupture.</li>
              <li>• NEVER sell milk from an animal currently undergoing antibiotic treatment.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
