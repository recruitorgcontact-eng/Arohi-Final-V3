// Screen 6: Emergency Triage & 1962 Referral Modal / View
// Matching Mockup 6 design layout

import React from 'react';
import { 
  PhoneCall, AlertTriangle, ArrowLeft, ShieldAlert, 
  MapPin, CheckCircle2, XCircle, ChevronRight, MessageSquare, ExternalLink
} from 'lucide-react';
import { VetLanguage } from '../types';
import { VET_STOCK_IMAGES } from '../data/vetStockImages';

interface Props {
  language: VetLanguage;
  onClose: () => void;
  onStartChat: (symptom?: string) => void;
}

export const VetMitraEmergencyView: React.FC<Props> = ({
  language,
  onClose,
  onStartChat,
}) => {
  const isOdia = language === 'or';

  const RED_FLAGS = [
    {
      id: 'bloat',
      title: 'Severe Bloat (ପେଟ ଫୁଲିବା)',
      subtitle: 'Breathing difficulty, restlessness, left flank distended like a drum',
      icon: '🫁',
      action: 'Emergency trocar/cannula or stomach tube required by paravet immediately. Do NOT drench oil if choking.',
    },
    {
      id: 'downer',
      title: 'Downer Cow (ଶୋଇରହିବା / Milk Fever)',
      subtitle: 'Unable to stand post-calving, cold ears, S-shaped neck curve',
      icon: '🐄',
      action: 'Immediate IV Calcium Borogluconate administration by veterinary doctor.',
    },
    {
      id: 'poisoning',
      title: 'Toxicity / Poisoning (ବିଷାକ୍ତ କୀଟନାଶକ)',
      subtitle: 'Suspected pesticide, urea intoxication, or poisonous weed grazing',
      icon: '☠️',
      action: 'Keep animal in shade. Give activated charcoal or cold water. Call 1962.',
    },
    {
      id: 'parvo',
      title: 'Puppy Parvovirus Shock',
      subtitle: 'Continuous vomiting, foul bloody diarrhea, hypothermic collapse',
      icon: '🐕',
      action: 'Strict NPO (nothing by mouth). Rapid IV fluid resuscitation needed.',
    },
    {
      id: 'urinary',
      title: 'Feline Urinary Block (FLUTD)',
      subtitle: 'Male cat straining in litterbox, crying in agony, dry bladder or hard stone',
      icon: '🐈',
      action: 'Fatal within 24-48 hours. Emergency urethral catheterization required.',
    },
  ];

  const DOS = [
    'Keep the animal in a safe, quiet, well-ventilated shaded place.',
    'Provide clean drinking water ONLY if the animal is fully conscious and swallowing.',
    'Keep calf or pet warm with dry gunny bags if temperature drops.',
    'Take high-clear photos/videos of vomitus, stool, or lesions for the doctor.',
    'Check pulse, gum color (pink vs pale/blue), and breathing rate.',
  ];

  const DONTS = [
    'DO NOT force-feed or drench liquid medicines into a choking or unconscious animal (aspiration pneumonia risk).',
    'DO NOT administer human paracetamol (Crocin) or pain pills to cats or dogs (fatal toxic liver failure).',
    'DO NOT puncture the rumen bloat with unsterilized rusty knives.',
    'DO NOT drag or beat a downer cow to force standing.',
    'DO NOT delay dialing 1962 during red-flag emergencies.',
  ];

  return (
    <div className="space-y-4 pb-20 animate-in fade-in-50 duration-300">
      {/* Red Alert Header Banner (Matching Mockup 6) */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-rose-500/40">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-xl bg-black/20 hover:bg-black/30 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isOdia ? 'ଫେରନ୍ତୁ' : 'Back'}</span>
          </button>

          <span className="text-[11px] uppercase tracking-wider font-extrabold bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
            Emergency Animal Care
          </span>
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex items-center gap-2 text-rose-200 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-200 animate-bounce" />
            <span>{isOdia ? 'ଜରୁରୀକାଳୀନ ପଶୁ ଚିକିତ୍ସା' : 'Animal Emergency'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {isOdia ? 'ତୁରନ୍ତ ଡାକ୍ତରୀ ସାହାଯ୍ୟ ଆବଶ୍ୟକ କି?' : 'Need urgent veterinary help?'}
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 font-medium">
            Call the National Animal Helpline • Toll-Free 24x7 • Mobile Veterinary Ambulance
          </p>
        </div>

        {/* DIAL 1962 NOW Button */}
        <div className="mt-5">
          <a
            href="tel:1962"
            className="w-full py-3.5 px-6 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-black text-base flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-98"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
            <span>DIAL 1962 NOW (Free 24x7 Ambulance)</span>
          </a>
        </div>

        {/* Location Dispatch Estimate */}
        <div className="mt-4 p-3 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-rose-100">
            <MapPin className="w-4 h-4 text-rose-300" />
            <span>Your Location: <strong>Odisha, India</strong></span>
          </div>
          <span className="text-white font-medium">Dispatches nearest mobile vet clinic</span>
        </div>
      </div>

      {/* Emergency Situations (Red Flags) Carousel/Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>{isOdia ? 'ଜରୁରୀ ବିପଦ ସଙ୍କେତ (Red Flags)' : 'Emergency Situations (Red Flags)'}</span>
          </h3>
          <span className="text-xs text-rose-600 font-bold">Act Immediately</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {RED_FLAGS.map((flag) => (
            <div
              key={flag.id}
              className="p-3.5 rounded-2xl bg-white border border-rose-100 shadow-sm hover:border-rose-300 transition-all space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{flag.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{flag.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{flag.subtitle}</p>
                </div>
              </div>
              <p className="text-[11px] text-rose-900 font-medium bg-rose-50/70 p-2 rounded-xl">
                {flag.action}
              </p>
              <button
                onClick={() => onStartChat(`EMERGENCY: ${flag.title}. Please provide step-by-step immediate first-aid guidance.`)}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <span>{isOdia ? 'ଆରୋହୀଙ୍କୁ ପ୍ରାଥମିକ ଉପଚାର ପଚାରନ୍ତୁ' : 'Ask Arohi for First-Aid'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts While Waiting Grid (Matching Mockup 6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* DO's */}
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Do’s (While Waiting for Vet)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {DOS.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DON'Ts */}
        <div className="bg-rose-50/60 border border-rose-200 rounded-3xl p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-rose-900 font-black text-sm">
            <XCircle className="w-5 h-5 text-rose-600" />
            <span>Don’ts (Never Do This)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {DONTS.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-600 font-bold mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat with Arohi in Emergency Strip */}
      <div className="p-4 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Chat with Arohi Now</h5>
            <p className="text-[11px] text-slate-400">
              Share symptoms, photos, or videos for immediate guidance while help is on the way.
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartChat('My animal is in critical distress. Please guide me on immediate stabilization steps.')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shrink-0 transition-transform active:scale-95"
        >
          Start Emergency Chat
        </button>
      </div>
    </div>
  );
};
