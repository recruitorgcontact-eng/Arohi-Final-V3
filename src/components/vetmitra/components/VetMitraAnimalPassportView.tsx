// Screen 5: Universal Animal Health Card & Passport (for any animal: Cattle, Goats, Dogs, Cats)
// Matching Mockup 5 design layout

import React, { useState } from 'react';
import { 
  ArrowLeft, Edit3, Camera, CheckCircle2, AlertCircle, 
  Clock, ShieldAlert, Sparkles, PhoneCall, Calendar, 
  Weight, Activity, Milk, ChevronRight, Plus, Check
} from 'lucide-react';
import { UniversalAnimalRecord, SAMPLE_ANIMAL_RECORDS } from '../data/mockAnimalsData';
import { VetLanguage, VetSpecies } from '../types';

interface Props {
  language: VetLanguage;
  initialAnimalId?: string;
  onStartConsultOnAnimal: (animal: UniversalAnimalRecord) => void;
  onStartVoiceCallOnAnimal: (animal: UniversalAnimalRecord) => void;
  onBack: () => void;
}

export const VetMitraAnimalPassportView: React.FC<Props> = ({
  language,
  initialAnimalId = 'animal_ganga_cow',
  onStartConsultOnAnimal,
  onStartVoiceCallOnAnimal,
  onBack,
}) => {
  const [animals, setAnimals] = useState<UniversalAnimalRecord[]>(SAMPLE_ANIMAL_RECORDS);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>(initialAnimalId);
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'nutrition' | 'reproduction' | 'records'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);

  const isOdia = language === 'or';
  const currentAnimal = animals.find((a) => a.id === selectedAnimalId) || animals[0];

  return (
    <div className="space-y-4 pb-20 animate-in fade-in-50 duration-300">
      {/* Top Animal Switcher Ribbon */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2">
          {animals.map((a) => {
            const isSelected = a.id === currentAnimal.id;
            return (
              <button
                key={a.id}
                onClick={() => setSelectedAnimalId(a.id)}
                className={`px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <img src={a.photoUrl} alt={a.name} className="w-5 h-5 rounded-full object-cover" />
                <span>{isOdia ? a.nameOdia : a.name}</span>
                <span className="text-[10px] opacity-80 uppercase">({a.species})</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => alert('New Animal Registration form will open. You can tag cows, buffaloes, goats, or pets.')}
          className="px-3 py-1.5 rounded-2xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isOdia ? '+ ପଶୁ ଯୋଡ଼ନ୍ତୁ' : '+ Add Animal'}</span>
        </button>
      </div>

      {/* Animal Hero Profile Card (Matching Mockup 5) */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
        {/* Real Animal Photo Header */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          <img
            src={currentAnimal.photoUrl}
            alt={currentAnimal.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top Tag & Status Pills */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-2xl bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-bold text-xs backdrop-blur-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-950" />
                <span>{currentAnimal.status}</span>
              </span>
            </div>
          </div>

          {/* Bottom Title Info */}
          <div className="absolute bottom-3 left-4 right-4 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {currentAnimal.name}
                </h2>
                <span className="text-lg text-emerald-300 font-semibold">
                  ({currentAnimal.nameOdia})
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium mt-0.5">
                {currentAnimal.breed} • Tag: <span className="font-mono font-bold text-white">{currentAnimal.tagNumber}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white font-medium">
                {currentAnimal.species.toUpperCase()}
              </span>
              {currentAnimal.milkYieldLDay && (
                <span className="text-[11px] px-2.5 py-1 rounded-xl bg-blue-500/40 backdrop-blur-md text-blue-100 font-medium">
                  {currentAnimal.milkYieldLDay} L/day
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center border-b border-slate-100 px-3 bg-slate-50/70 overflow-x-auto scrollbar-none text-xs font-bold text-slate-600">
          {[
            { id: 'overview', label: 'Overview', odia: 'ସମୀକ୍ଷା' },
            { id: 'health', label: 'Health', odia: 'ସ୍ୱାସ୍ଥ୍ୟ' },
            { id: 'nutrition', label: 'Nutrition', odia: 'ପୋଷଣ' },
            { id: 'reproduction', label: 'Reproduction', odia: 'ପ୍ରଜନନ' },
            { id: 'records', label: 'Records', odia: 'ରେକର୍ଡ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              {isOdia ? tab.odia : tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Key Vitals & Production Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-xs text-slate-500 block">{isOdia ? 'ବୟସ' : 'Age'}</span>
              <span className="text-base font-black text-slate-900 block mt-0.5">{currentAnimal.ageYears} yrs</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <span className="text-xs text-slate-500 block">{isOdia ? 'ଓଜନ' : 'Body Weight'}</span>
              <span className="text-base font-black text-slate-900 block mt-0.5">{currentAnimal.weightKg} kg</span>
            </div>

            {currentAnimal.milkYieldLDay ? (
              <>
                <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
                  <span className="text-xs text-blue-700 block">{isOdia ? 'ଦୈନିକ କ୍ଷୀର' : 'Current Yield'}</span>
                  <span className="text-base font-black text-blue-950 block mt-0.5">{currentAnimal.milkYieldLDay} L/day</span>
                  {currentAnimal.recentYieldDropLDay && (
                    <span className="text-[10px] text-rose-600 font-bold block">(drop: {currentAnimal.recentYieldDropLDay} L)</span>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                  <span className="text-xs text-slate-500 block">{isOdia ? 'ଲ୍ୟାକ୍ଟେସନ୍' : 'Lactation No.'}</span>
                  <span className="text-base font-black text-slate-900 block mt-0.5">{currentAnimal.lactationNo}nd</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                  <span className="text-xs text-slate-500 block">{isOdia ? 'ପ୍ରସବ ସମ୍ଭାବ୍ୟ' : 'Exp. Calving'}</span>
                  <span className="text-xs font-black text-slate-900 block mt-0.5">{currentAnimal.expectedCalvingDate}</span>
                </div>
              </>
            ) : (
              <div className="col-span-2 sm:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">{isOdia ? 'ତାପମାତ୍ରା' : 'Temperature'}</span>
                  <span className="text-sm font-black text-slate-900">{currentAnimal.temperatureC}°C (Normal)</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">{isOdia ? 'ଖାଦ୍ୟ ରୁଚି' : 'Appetite'}</span>
                  <span className="text-sm font-black text-emerald-600">{currentAnimal.appetite}</span>
                </div>
              </div>
            )}
          </div>

          {/* Vaccination & Preventive Health Status (Matching Mockup 5) */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-3.5 sm:p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  {isOdia ? 'ଟିକାକରଣ ସ୍ଥିତି (Vaccinations)' : 'Vaccinations (Up to date)'}
                </h4>
              </div>
              <span className="text-xs text-slate-500 font-medium">3/4 Completed</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentAnimal.vaccinations.map((v, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    v.status === 'up_to_date' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {v.status === 'up_to_date' ? '✓' : '!'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block truncate">{v.name}</span>
                    <span className="text-[10px] text-slate-500 block">{v.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Deworming Quick Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs">
              <div className="flex items-center gap-2 text-amber-900">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {isOdia 
                    ? `କୃମିନାଶକ (Deworming): ୧୮ ଦିନ ମଧ୍ୟରେ ଦେବାକୁ ପଡ଼ିବ (${currentAnimal.deworming.medicineName})` 
                    : `Deworming Due in ${currentAnimal.deworming.dueInDays} days (${currentAnimal.deworming.medicineName})`}
                </span>
              </div>
              <span className="text-[11px] font-bold text-amber-800">
                Last: {currentAnimal.deworming.lastDate}
              </span>
            </div>
          </div>

          {/* Arohi Insights Smart Alert Box */}
          {currentAnimal.arohiInsight && (
            <div className="rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                    Arohi Clinical Insights
                  </h5>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {isOdia ? currentAnimal.arohiInsight.messageOdia : currentAnimal.arohiInsight.message}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => onStartConsultOnAnimal(currentAnimal)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>{currentAnimal.arohiInsight.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onStartVoiceCallOnAnimal(currentAnimal)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {isOdia 
                      ? `${currentAnimal.name} ବିଷୟରେ କଥା ହୁଅନ୍ତୁ` 
                      : `Talk about ${currentAnimal.name}`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Recent Animal Activity Log */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              {isOdia ? 'ସାମ୍ପ୍ରତିକ ଇତିହାସ' : 'Recent Activities'}
            </h5>
            <div className="space-y-1.5">
              {currentAnimal.recentActivities.map((act, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-slate-800">{act.title}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{act.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
