// Screen 5: Universal Animal Health Card & Passport (for any animal: Cattle, Goats, Dogs, Cats)
// Fully integrated with Offline Storage (IndexedDB + LocalStorage) for offline viewing and management

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Edit3, Camera, CheckCircle2, AlertCircle, 
  Clock, ShieldAlert, Sparkles, PhoneCall, Calendar, 
  Weight, Activity, Milk, ChevronRight, Plus, Check,
  WifiOff, History, FileText, ChevronDown, ChevronUp, MessageSquare
} from 'lucide-react';
import { UniversalAnimalRecord, SAMPLE_ANIMAL_RECORDS } from '../data/mockAnimalsData';
import { VetLanguage, VetSpecies } from '../types';
import { vetOfflineStorage, VetConsultationSummary } from '../utils/vetOfflineStorage';
import { VetMitraAddAnimalModal } from './VetMitraAddAnimalModal';
import { VetMitraConsultationHistoryView } from './VetMitraConsultationHistoryView';

interface Props {
  language: VetLanguage;
  initialAnimalId?: string;
  onStartConsultOnAnimal: (animal: UniversalAnimalRecord) => void;
  onStartVoiceCallOnAnimal: (animal: UniversalAnimalRecord) => void;
  onBack: () => void;
  onOpenFeed?: (animal?: UniversalAnimalRecord) => void;
}

export const VetMitraAnimalPassportView: React.FC<Props> = ({
  language,
  initialAnimalId = 'animal_ganga_cow',
  onStartConsultOnAnimal,
  onStartVoiceCallOnAnimal,
  onBack,
  onOpenFeed,
}) => {
  const [animals, setAnimals] = useState<UniversalAnimalRecord[]>(SAMPLE_ANIMAL_RECORDS);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>(initialAnimalId);
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'consultations' | 'nutrition' | 'reproduction' | 'records'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAllConsultationsView, setShowAllConsultationsView] = useState(false);
  const [animalConsultations, setAnimalConsultations] = useState<VetConsultationSummary[]>([]);
  const [expandedConsultId, setExpandedConsultId] = useState<string | null>(null);

  // Quick Vitals Update State
  const [isEditingVitals, setIsEditingVitals] = useState(false);
  const [editMilkYield, setEditMilkYield] = useState<string>('');
  const [editWeight, setEditWeight] = useState<string>('');
  const [editTemp, setEditTemp] = useState<string>('');
  const [saveVitalsSuccess, setSaveVitalsSuccess] = useState(false);

  const isOdia = language === 'or';

  // Load Animals from local offline storage
  useEffect(() => {
    loadStoredAnimals();
  }, []);

  const loadStoredAnimals = async () => {
    try {
      const stored = await vetOfflineStorage.getStoredAnimals();
      if (stored && stored.length > 0) {
        setAnimals(stored);
        if (!stored.some((a) => a.id === selectedAnimalId)) {
          setSelectedAnimalId(stored[0].id);
        }
      }
    } catch (e) {
      console.warn('Could not load animals from storage, using initial state:', e);
    }
  };

  // Keep selectedAnimalId in sync with initialAnimalId
  useEffect(() => {
    if (initialAnimalId && initialAnimalId !== 'all') {
      setSelectedAnimalId(initialAnimalId);
    }
  }, [initialAnimalId]);

  const currentAnimal = animals.find((a) => a.id === selectedAnimalId) || animals[0] || SAMPLE_ANIMAL_RECORDS[0];

  // Load consultations whenever current animal changes
  useEffect(() => {
    if (currentAnimal) {
      loadAnimalConsultations(currentAnimal.id);
      setEditMilkYield(String(currentAnimal.milkYieldLDay || ''));
      setEditWeight(String(currentAnimal.weightKg || ''));
      setEditTemp(String(currentAnimal.temperatureC || '38.5'));
    }
  }, [currentAnimal?.id]);

  const loadAnimalConsultations = async (animalId: string) => {
    try {
      const list = await vetOfflineStorage.getConsultationSummaries(animalId);
      setAnimalConsultations(list);
    } catch (e) {
      console.error('Failed to load animal consultations:', e);
    }
  };

  const handleSaveNewAnimal = async (newAnimal: UniversalAnimalRecord) => {
    await vetOfflineStorage.saveAnimal(newAnimal);
    await loadStoredAnimals();
    setSelectedAnimalId(newAnimal.id);
  };

  const handleSaveVitals = async () => {
    if (!currentAnimal) return;

    const updated: UniversalAnimalRecord = {
      ...currentAnimal,
      milkYieldLDay: editMilkYield ? Number(editMilkYield) : currentAnimal.milkYieldLDay,
      weightKg: editWeight ? Number(editWeight) : currentAnimal.weightKg,
      temperatureC: editTemp ? Number(editTemp) : currentAnimal.temperatureC,
      recentActivities: [
        {
          date: 'Today',
          title: `Vitals updated (Weight: ${editWeight || currentAnimal.weightKg} kg${editMilkYield ? `, Milk: ${editMilkYield} L` : ''})`,
          category: 'milk_check',
        },
        ...currentAnimal.recentActivities,
      ],
    };

    await vetOfflineStorage.saveAnimal(updated);
    setAnimals((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setIsEditingVitals(false);
    setSaveVitalsSuccess(true);
    setTimeout(() => setSaveVitalsSuccess(false), 2500);
  };

  // If farmer clicked "View All Past Consultations"
  if (showAllConsultationsView) {
    return (
      <VetMitraConsultationHistoryView
        language={language}
        selectedAnimalId={currentAnimal.id}
        animals={animals}
        onBack={() => setShowAllConsultationsView(false)}
        onSelectAnimalForConsult={(animal) => {
          setShowAllConsultationsView(false);
          onStartConsultOnAnimal(animal);
        }}
        onSelectAnimalForCall={(animal) => {
          setShowAllConsultationsView(false);
          onStartVoiceCallOnAnimal(animal);
        }}
      />
    );
  }

  return (
    <div className="space-y-4 pb-20 animate-in fade-in-50 duration-300">
      {/* Top Animal Switcher Ribbon & Actions */}
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

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isOdia ? '+ ପଶୁ ଯୋଡ଼ନ୍ତୁ' : '+ Add Animal'}</span>
          </button>
        </div>
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
              <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-bold text-xs backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-slate-950" />
                <span>{currentAnimal.status}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white font-medium text-[11px] flex items-center gap-1">
                <WifiOff className="w-3 h-3 text-emerald-400" />
                <span>{isOdia ? 'ଅଫ୍‌ଲାଇନ୍ ସଂରକ୍ଷିତ' : 'Cached Offline'}</span>
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
              {currentAnimal.milkYieldLDay ? (
                <span className="text-[11px] px-2.5 py-1 rounded-xl bg-blue-500/50 backdrop-blur-md text-blue-100 font-bold">
                  {currentAnimal.milkYieldLDay} L/day
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Section Tabs (Including Previous Consultations) */}
        <div className="flex items-center border-b border-slate-100 px-3 bg-slate-50/70 overflow-x-auto scrollbar-none text-xs font-bold text-slate-600">
          {[
            { id: 'overview', label: 'Overview', odia: 'ସମୀକ୍ଷା' },
            { id: 'consultations', label: `Consultations (${animalConsultations.length})`, odia: `ପୂର୍ବ ପରାମର୍ଶ (${animalConsultations.length})` },
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
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
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
                      {currentAnimal.recentYieldDropLDay ? (
                        <span className="text-[10px] text-rose-600 font-bold block">(drop: {currentAnimal.recentYieldDropLDay} L)</span>
                      ) : null}
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <span className="text-xs text-slate-500 block">{isOdia ? 'ଲ୍ୟାକ୍ଟେସନ୍' : 'Lactation No.'}</span>
                      <span className="text-base font-black text-slate-900 block mt-0.5">{currentAnimal.lactationNo || 2}nd</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <span className="text-xs text-slate-500 block">{isOdia ? 'ପ୍ରସବ ସମ୍ଭାବ୍ୟ' : 'Exp. Calving'}</span>
                      <span className="text-xs font-black text-slate-900 block mt-0.5">{currentAnimal.expectedCalvingDate || 'Normal'}</span>
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

              {/* Quick Update Vitals Button & Editor */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isOdia ? 'ଦୈନିକ ସ୍ୱାସ୍ଥ୍ୟ ଓ କ୍ଷୀର ରେକର୍ଡ ଅପଡେଟ୍ (Offline Sync)' : 'Daily Vitals & Production Update'}</span>
                  </span>
                  <button
                    onClick={() => setIsEditingVitals(!isEditingVitals)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingVitals ? (isOdia ? 'ରଦ୍ଦ କରନ୍ତୁ' : 'Cancel') : (isOdia ? 'ରେକର୍ଡ ଅପଡେଟ୍ କରନ୍ତୁ' : 'Update Vitals')}</span>
                  </button>
                </div>

                {saveVitalsSuccess && (
                  <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-100/80 p-2 rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isOdia ? 'ରେକର୍ଡ ଅଫ୍‌ଲାଇନ୍ ସଫଳତାର ସହ ସଂରକ୍ଷିତ ହେଲା! ✓' : 'Vitals saved offline to storage! ✓'}</span>
                  </div>
                )}

                {isEditingVitals && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-xs">
                    {currentAnimal.species === 'cattle' && (
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          {isOdia ? 'ଆଜିର କ୍ଷୀର (L)' : "Today's Milk (L)"}
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={editMilkYield}
                          onChange={(e) => setEditMilkYield(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900"
                        />
                      </div>
                    )}
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        {isOdia ? 'ଓଜନ (Kg)' : 'Weight (kg)'}
                      </label>
                      <input
                        type="number"
                        value={editWeight}
                        onChange={(e) => setEditWeight(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        {isOdia ? 'ତାପମାତ୍ରା (°C)' : 'Temp (°C)'}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={editTemp}
                        onChange={(e) => setEditTemp(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleSaveVitals}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isOdia ? 'ସଂରକ୍ଷଣ କରନ୍ତୁ' : 'Save Offline'}</span>
                      </button>
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
                  <span className="text-xs text-slate-500 font-medium">Verified in Passport</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentAnimal.vaccinations.map((v, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        v.status === 'up_to_date' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {v.status === 'up_to_date' ? '✓' : '!'}
                      </div>
                      <div className="truncate">
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
                        ? `କୃମିନାଶକ (Deworming): ${currentAnimal.deworming.dueInDays} ଦିନ ମଧ୍ୟରେ ଦେବାକୁ ପଡ଼ିବ (${currentAnimal.deworming.medicineName})` 
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
            </>
          )}

          {/* TAB 2: PREVIOUS CONSULTATIONS (OFFLINE READY) */}
          {activeTab === 'consultations' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-100 p-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-950">
                    {isOdia 
                      ? `${currentAnimal.name} ର ପୂର୍ବ ପରାମର୍ଶ ଇତିହାସ (${animalConsultations.length})` 
                      : `Past Consultations for ${currentAnimal.name} (${animalConsultations.length})`}
                  </span>
                </div>
                <button
                  onClick={() => setShowAllConsultationsView(true)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>{isOdia ? 'ସମସ୍ତ ପଶୁଙ୍କ ଇତିହାସ' : 'All Animals History'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {animalConsultations.length === 0 ? (
                <div className="p-6 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <FileText className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">
                    {isOdia ? 'ଏହି ପଶୁ ପାଇଁ କୌଣସି ପୂର୍ବ ପରାମର୍ଶ ନାହିଁ' : 'No previous consultations recorded yet.'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {isOdia ? 'ତଳେ ଥିବା ବଟନ୍ ଦବାଇ ନୂତନ ପରାମର୍ଶ ଆରମ୍ଭ କରନ୍ତୁ।' : 'Start an AI consultation to automatically build offline health records.'}
                  </p>
                  <button
                    onClick={() => onStartConsultOnAnimal(currentAnimal)}
                    className="mt-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs inline-flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isOdia ? 'ନୂତନ ପରାମର୍ଶ କରନ୍ତୁ' : 'Start Consultation'}</span>
                  </button>
                </div>
              ) : (
                animalConsultations.map((item) => {
                  const isExpanded = expandedConsultId === item.id;
                  return (
                    <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {isOdia && item.chiefComplaintOdia ? item.chiefComplaintOdia : item.chiefComplaint}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{item.formattedDate}</span>
                            <span>•</span>
                            <span className="uppercase font-semibold">{item.channel}</span>
                          </span>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          item.isEmergency ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.isEmergency ? '1962 Emergency' : 'Verified'}
                        </span>
                      </div>

                      {/* Clinical Assessment */}
                      <div className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-900 block mb-0.5">
                          {isOdia ? 'ଡାକ୍ତରୀ ଆକଳନ:' : 'Clinical Assessment:'}
                        </span>
                        <p>{isOdia && item.diagnosisOrAssessmentOdia ? item.diagnosisOrAssessmentOdia : item.diagnosisOrAssessment}</p>
                      </div>

                      {/* Prescribed Care & First Aid */}
                      {item.medicinesOrFirstAid && item.medicinesOrFirstAid.length > 0 && (
                        <div className="text-xs bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl space-y-1">
                          <span className="font-bold text-emerald-900 block">
                            {isOdia ? 'ପ୍ରାଥମିକ ଚିକିତ୍ସା ଓ ଦିଆଯାଇଥିବା ପରାମର୍ଶ:' : 'Advised First Aid & Care:'}
                          </span>
                          {item.medicinesOrFirstAid.map((med, idx) => (
                            <div key={idx} className="text-emerald-950 font-medium flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{med}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Transcript Toggle */}
                      {item.history && item.history.length > 0 && (
                        <div>
                          <button
                            onClick={() => setExpandedConsultId(isExpanded ? null : item.id)}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                          >
                            <span>
                              {isExpanded ? (isOdia ? 'ଆଲୋଚନା ବନ୍ଦ କରନ୍ତୁ' : 'Hide Transcript') : (isOdia ? 'ପୂର୍ଣ୍ଣ ଆଲୋଚନା ଦେଖନ୍ତୁ' : 'View Dialogue Transcript')}
                            </span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isExpanded && (
                            <div className="mt-2 space-y-2 p-2.5 bg-white border border-slate-200 rounded-xl">
                              {item.history.map((h, hIdx) => (
                                <div
                                  key={hIdx}
                                  className={`p-2 rounded-lg text-xs ${
                                    h.sender === 'user' ? 'bg-slate-50 text-slate-800' : 'bg-emerald-50/70 text-slate-900'
                                  }`}
                                >
                                  <span className="text-[10px] font-bold block text-slate-400 uppercase">
                                    {h.sender === 'user' ? 'Farmer' : 'Arohi VetMitra'}
                                  </span>
                                  <p className="mt-0.5 whitespace-pre-wrap">{h.text}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 3: HEALTH */}
          {activeTab === 'health' && (
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">{isOdia ? 'ଶାରୀରିକ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚକାଙ୍କ' : 'Physical Health Metrics'}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block">Temperature:</span>
                    <span className="font-bold text-slate-900">{currentAnimal.temperatureC}°C (Optimal)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block">Body Condition:</span>
                    <span className="font-bold text-slate-900">{currentAnimal.bodyConditionScore} / 5.0 (Healthy)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block">Appetite:</span>
                    <span className="font-bold text-emerald-600">{currentAnimal.appetite}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 block">Rumination/Activity:</span>
                    <span className="font-bold text-slate-900">{currentAnimal.ruminationOrActivity}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NUTRITION */}
          {activeTab === 'nutrition' && (
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">
                    {currentAnimal.species === 'cattle'
                      ? (isOdia ? 'NASEM ୨୦୨୧ ଦୈନିକ ଖାଦ୍ୟ ରାସନ୍ ମାନକ' : 'NASEM 2021 Dairy Ration Guideline')
                      : (isOdia ? 'ପ୍ରଜାତି-ଆଧାରିତ ପୋଷଣ ଓ ଖାଦ୍ୟ ମାନକ' : 'Species-Specific Nutrition Guideline')}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                    {currentAnimal.species}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  {currentAnimal.species === 'cattle'
                    ? (isOdia
                        ? `${currentAnimal.name} (${currentAnimal.weightKg} କିଲୋ) ପାଇଁ ଦୈନିକ ପ୍ରାୟ ୧୮-୨୦ କିଲୋ ସବୁଜ ଘାସ, ୩.୫-୪ କିଲୋ ଶୁଖିଲା କୁଟା, ୩-୩.୫ କିଲୋ କନସେନଟ୍ରେଟ୍ ଦାନା ଓ ୫୦ ଗ୍ରାମ୍ ମିନେରାଲ୍ ମିକ୍ସଚର୍ ଆବଶ୍ୟକ।`
                        : `Target for ${currentAnimal.name} (${currentAnimal.weightKg}kg): ~18-20kg Green Napier + ~4kg Dry Straw + ~3.5kg Dairy Concentrate + 50g Mineral Mixture daily.`)
                    : currentAnimal.species === 'goat'
                    ? (isOdia
                        ? `${currentAnimal.name} (${currentAnimal.weightKg} କିଲୋ) ପାଇଁ ଦୈନିକ ୨.୫-୩ କିଲୋ ସବୁଜ ପତ୍ର/ସୁବାବୁଲ, ୦.୬ କିଲୋ ଶୁଖିଲା ଡାଳ ଓ ୩୫୦ ଗ୍ରାମ୍ ସନ୍ତୁଳିତ ଦାନା ଆବଶ୍ୟକ।`
                        : `Target for ${currentAnimal.name} (${currentAnimal.weightKg}kg): 2.5-3kg Green Fodder + 0.6kg Dry Leaves + 350g Concentrate daily.`)
                    : currentAnimal.species === 'dog'
                    ? (isOdia
                        ? `${currentAnimal.name} (${currentAnimal.weightKg} କିଲୋ) ପାଇଁ ସୁସ୍ଥ ପ୍ରୋଟିନ୍ (ଚିକେନ୍/ଅଣ୍ଡା/ପନୀର), ଭାତ/ଡାଲିଆ ଓ ପରିବା ସହିତ ବିଷାକ୍ତ ଖାଦ୍ୟରୁ ଦୂରେଇ ରଖନ୍ତୁ।`
                        : `Target for ${currentAnimal.name} (${currentAnimal.weightKg}kg): High quality lean protein, complex carbs, zero toxic foods (onion/garlic/chocolate).`)
                    : (isOdia
                        ? `${currentAnimal.name} ପାଇଁ ଟରିନ୍ (Taurine) ଯୁକ୍ତ ମାଂସ/ମାଛ ଏବଂ ପ୍ରଚୁର ପାଣି/ଓଦା ଖାଦ୍ୟ ଅତ୍ୟନ୍ତ ଜରୁରୀ।`
                        : `Obligate carnivore protocol: High animal protein, essential Taurine, and high moisture/wet food.`)}
                </p>

                {onOpenFeed && (
                  <button
                    onClick={() => onOpenFeed(currentAnimal)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>🌾</span>
                    <span>
                      {isOdia 
                        ? `${currentAnimal.name} ପାଇଁ ରାସନ୍ ଷ୍ଟୁଡିଓରେ ସମ୍ପୂର୍ଣ୍ଣ ହିସାବ ଖୋଲନ୍ତୁ` 
                        : `Open Feed & Ration Studio for ${currentAnimal.name}`}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: REPRODUCTION */}
          {activeTab === 'reproduction' && (
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">{isOdia ? 'ପ୍ରଜନନ ଓ ପ୍ରସବ ସ୍ଥିତି' : 'Breeding & Calving Record'}</h4>
                {currentAnimal.reproduction ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Last Service / AI:</span>
                      <span className="font-bold">{currentAnimal.reproduction.lastServiceDate} ({currentAnimal.reproduction.serviceType})</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Expected Calving:</span>
                      <span className="font-bold text-emerald-700">{currentAnimal.reproduction.expectedCalvingDate}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500">No active pregnancy cycle recorded.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: RECORDS */}
          {activeTab === 'records' && (
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">
                    {isOdia ? 'ସମସ୍ତ ପୂର୍ବ ପରାମର୍ଶ ଇତିହାସ ବ୍ରାଉଜ୍ କରନ୍ତୁ' : 'Full Consultation Log Archive'}
                  </h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {isOdia ? 'ଅଫ୍‌ଲାଇନ୍ ଡାଟାବେସ୍‌ରେ ସଂରକ୍ଷିତ ଥିବା ସମସ୍ତ ପରାମର୍ଶ ଦେଖନ୍ତୁ' : 'Access all past diagnoses and transcripts offline'}
                  </p>
                </div>
                <button
                  onClick={() => setShowAllConsultationsView(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  {isOdia ? 'ଖୋଲନ୍ତୁ' : 'Open Archive'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Animal Modal */}
      {showAddModal && (
        <VetMitraAddAnimalModal
          language={language}
          onSave={handleSaveNewAnimal}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};
