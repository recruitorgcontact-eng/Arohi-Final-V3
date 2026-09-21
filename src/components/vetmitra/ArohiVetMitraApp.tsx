// Arohi VetMitra - Comprehensive Livestock & Veterinary Care Platform
// Features dual-layer offline caching (IndexedDB + LocalStorage) for stored animal records & previous consultations

import React, { useState, useEffect } from 'react';
import { 
  Home, MessageSquare, PhoneCall, FileText, AlertTriangle, 
  Languages, Stethoscope, Sparkles, X, Bell, Wifi, WifiOff,
  HardDrive, History, Users, Wheat
} from 'lucide-react';
import { VetSpecies, VetLanguage } from './types';
import { VetMitraHomeView } from './components/VetMitraHomeView';
import { VetMitraChatView } from './components/VetMitraChatView';
import { VetMitraVoiceCallScreen } from './components/VetMitraVoiceCallScreen';
import { VetMitraScannerView } from './components/VetMitraScannerView';
import { VetMitraAnimalPassportView } from './components/VetMitraAnimalPassportView';
import { VetMitraEmergencyView } from './components/VetMitraEmergencyView';
import { VetMitraConsultationHistoryView } from './components/VetMitraConsultationHistoryView';
import { VetMitraOfflineManagerModal } from './components/VetMitraOfflineManagerModal';
import { VetMitraPetCommunityView } from './components/VetMitraPetCommunityView';
import { VetMitraUniversalFeedView } from './components/VetMitraUniversalFeedView';
import { UniversalAnimalRecord, SAMPLE_ANIMAL_RECORDS } from './data/mockAnimalsData';
import { vetOfflineStorage } from './utils/vetOfflineStorage';

interface Props {
  initialSpecies?: VetSpecies;
  initialTab?: string;
  onBackToArohi?: () => void;
  uid?: string;
}

type VetScreenTab = 'home' | 'consult' | 'feed' | 'voice_call' | 'scanner' | 'passport' | 'history' | 'community' | 'emergency';

export const ArohiVetMitraApp: React.FC<Props> = ({
  initialSpecies = 'cattle',
  initialTab = 'home',
  onBackToArohi,
  uid,
}) => {
  const [activeTab, setActiveTab] = useState<VetScreenTab>('home');
  const [activeSpecies, setActiveSpecies] = useState<VetSpecies>(initialSpecies);
  const [language, setLanguage] = useState<VetLanguage>('or'); // Default to Odia
  const [activeAnimal, setActiveAnimal] = useState<UniversalAnimalRecord | null>(null);
  const [storedAnimals, setStoredAnimals] = useState<UniversalAnimalRecord[]>(SAMPLE_ANIMAL_RECORDS);
  const [scannerInitialMode, setScannerInitialMode] = useState<'animal' | 'milk' | 'lab'>('animal');
  const [consultInitialQuery, setConsultInitialQuery] = useState<string | undefined>();

  // Offline Caching & Connectivity State
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);

  const isOdia = language === 'or';

  // Listen to browser network connectivity events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Pre-load stored animals from offline cache
  useEffect(() => {
    loadAnimals();
  }, [activeTab]);

  const loadAnimals = async () => {
    try {
      const records = await vetOfflineStorage.getStoredAnimals();
      if (records && records.length > 0) {
        setStoredAnimals(records);
      }
    } catch (e) {
      console.warn('Failed to load animals from offline storage:', e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-5 min-h-screen flex flex-col justify-between font-sans text-slate-900">
      {/* Top Universal App Bar (Matching Mockup 1) */}
      <header className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Subtitle */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black shadow-md shadow-emerald-800/20 shrink-0">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  Arohi <span className="text-emerald-600">VetMitra™</span>
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                  {activeAnimal ? `${activeAnimal.name} (${activeAnimal.species})` : `${activeSpecies} • 24x7`}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {isOdia ? 'ସୁସ୍ଥ ପଶୁ • ସମୃଦ୍ଧ ପଶୁପାଳକ' : 'Healthy Animals • Prosperous Farmers'}
              </p>
            </div>
          </div>

          {/* Top Actions: Offline Status Pill, Language Selector, Notification Bell & Exit */}
          <div className="flex items-center gap-2">
            {/* Pet Community & Marketplace Button */}
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border text-xs font-bold transition-all ${
                activeTab === 'community'
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
              }`}
              title="Pet Community & Products"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden sm:inline">
                {isOdia ? 'କମ୍ୟୁନିଟି' : 'Community'}
              </span>
            </button>

            {/* Offline Cache Status Pill */}
            <button
              onClick={() => setShowOfflineModal(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border text-xs font-bold transition-all ${
                !isOnline || isSimulatedOffline
                  ? 'bg-amber-100/90 border-amber-300 text-amber-900 animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
              }`}
              title="Click to view offline storage details"
            >
              {!isOnline || isSimulatedOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-[10px] hidden sm:inline">
                    {isOdia ? 'ଅଫ୍‌ଲାଇନ୍' : 'Offline'}
                  </span>
                </>
              ) : (
                <>
                  <HardDrive className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[10px] hidden sm:inline">
                    {isOdia ? 'କ୍ୟାଚ୍ ସକ୍ରିୟ' : 'Offline Ready'}
                  </span>
                </>
              )}
            </button>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-2.5 py-1.5 gap-1.5 text-xs">
              <Languages className="w-3.5 h-3.5 text-emerald-700" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as VetLanguage)}
                className="bg-transparent text-slate-800 font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="or">ଓଡ଼ିଆ (Odia)</option>
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab('passport')}
              className="w-9 h-9 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors"
              title="Animal Health Passport"
            >
              <Bell className="w-4 h-4" />
            </button>

            {onBackToArohi && (
              <button
                onClick={onBackToArohi}
                className="text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Primary Screen View Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <VetMitraHomeView
            activeSpecies={activeSpecies}
            onSelectSpecies={(sp) => {
              setActiveSpecies(sp);
            }}
            language={language}
            onStartConsult={(presetQuery) => {
              setConsultInitialQuery(presetQuery);
              setActiveTab('consult');
            }}
            onStartVoiceCall={() => setActiveTab('voice_call')}
            onOpenScanner={(mode) => {
              setScannerInitialMode(mode || 'animal');
              setActiveTab('scanner');
            }}
            onOpenEmergency={() => setActiveTab('emergency')}
            onViewPassport={() => setActiveTab('passport')}
            onViewHistory={() => setActiveTab('history')}
            onOpenCommunity={() => setActiveTab('community')}
            onOpenFeed={() => setActiveTab('feed')}
          />
        )}

        {activeTab === 'feed' && (
          <VetMitraUniversalFeedView
            language={language}
            initialSpecies={activeSpecies}
            activeAnimal={activeAnimal ? {
              name: activeAnimal.name,
              species: activeAnimal.species,
              breed: activeAnimal.breed,
              weightKg: activeAnimal.weightKg,
              milkYieldLDay: activeAnimal.milkYieldLDay,
            } : undefined}
            onSendToChat={(summaryText, species) => {
              setConsultInitialQuery(summaryText);
              if (species) setActiveSpecies(species);
              setActiveTab('consult');
            }}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'community' && (
          <VetMitraPetCommunityView
            language={language}
            activeAnimal={activeAnimal ? {
              id: activeAnimal.id,
              name: activeAnimal.name,
              species: activeAnimal.species,
              breed: activeAnimal.breed,
              photoUrl: activeAnimal.photoUrl,
            } : undefined}
            onBackToHome={() => setActiveTab('home')}
            onAskVetMitra={(contextText, species) => {
              setConsultInitialQuery(contextText);
              if (species) setActiveSpecies(species);
              setActiveTab('consult');
            }}
            onOpenVoiceCall={() => setActiveTab('voice_call')}
          />
        )}

        {activeTab === 'consult' && (
          <VetMitraChatView
            species={activeSpecies}
            language={language}
            activeAnimal={activeAnimal || undefined}
            initialQuery={consultInitialQuery}
            onClearInitialQuery={() => setConsultInitialQuery(undefined)}
            onStartVoiceCall={() => setActiveTab('voice_call')}
            onOpenEmergencyGuide={() => setActiveTab('emergency')}
            onChangeAnimal={() => setActiveTab('passport')}
          />
        )}

        {activeTab === 'voice_call' && (
          <VetMitraVoiceCallScreen
            species={activeSpecies}
            language={language}
            animalName={activeAnimal?.name}
            animalNameOdia={activeAnimal?.nameOdia}
            animalPhotoUrl={activeAnimal?.photoUrl}
            uid={uid}
            onEndCall={() => setActiveTab('home')}
            onOpenEmergency={() => setActiveTab('emergency')}
          />
        )}

        {activeTab === 'scanner' && (
          <VetMitraScannerView
            language={language}
            initialMode={scannerInitialMode}
            onBack={() => setActiveTab('home')}
            onAskArohi={(summary) => setActiveTab('consult')}
          />
        )}

        {activeTab === 'passport' && (
          <VetMitraAnimalPassportView
            language={language}
            initialAnimalId={activeAnimal?.id || 'all'}
            onStartConsultOnAnimal={(animal) => {
              setActiveAnimal(animal);
              setActiveSpecies(animal.species);
              setActiveTab('consult');
            }}
            onStartVoiceCallOnAnimal={(animal) => {
              setActiveAnimal(animal);
              setActiveSpecies(animal.species);
              setActiveTab('voice_call');
            }}
            onOpenFeed={(animal) => {
              if (animal) {
                setActiveAnimal(animal);
                setActiveSpecies(animal.species);
              }
              setActiveTab('feed');
            }}
            onBack={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'history' && (
          <VetMitraConsultationHistoryView
            language={language}
            animals={storedAnimals}
            selectedAnimalId={activeAnimal?.id || 'all'}
            onBack={() => setActiveTab('home')}
            onSelectAnimalForConsult={(animal) => {
              setActiveAnimal(animal);
              setActiveSpecies(animal.species);
              setActiveTab('consult');
            }}
            onSelectAnimalForCall={(animal) => {
              setActiveAnimal(animal);
              setActiveSpecies(animal.species);
              setActiveTab('voice_call');
            }}
          />
        )}

        {activeTab === 'emergency' && (
          <VetMitraEmergencyView
            language={language}
            onClose={() => setActiveTab('home')}
            onStartChat={(symptom) => setActiveTab('consult')}
          />
        )}
      </main>

      {/* Sticky Bottom Navigation Bar (Matching Mockup 1) */}
      <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 max-w-lg w-[96%] bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-1 shadow-lg shadow-slate-900/10 z-40 flex items-center justify-around">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all ${
            activeTab === 'home'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">{isOdia ? 'ମୂଳ' : 'Home'}</span>
        </button>

        {/* Consult Tab */}
        <button
          onClick={() => setActiveTab('consult')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all ${
            activeTab === 'consult'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">{isOdia ? 'ପରାମର୍ଶ' : 'Consult'}</span>
        </button>

        {/* Feed & Ration Studio Tab (Placed right before Voice Call) */}
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all ${
            activeTab === 'feed'
              ? 'text-amber-600 font-black'
              : 'text-slate-500 hover:text-amber-700'
          }`}
          title="Animal Feed & Ration Studio"
        >
          <Wheat className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-semibold whitespace-nowrap">{isOdia ? 'ଖାଦ୍ୟ' : 'Feed'}</span>
        </button>

        {/* Center Floating Compact Round Voice Call Button */}
        <button
          onClick={() => setActiveTab('voice_call')}
          className={`w-10 h-10 -mt-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-900/30 border-2 border-white transition-all active:scale-95 shrink-0 aspect-square ${
            activeTab === 'voice_call' ? 'ring-2 ring-emerald-400 ring-offset-1' : ''
          }`}
          title={isOdia ? 'ଲାଇଭ୍ ଭଏସ୍ କଲ୍ (Live Voice Call)' : 'Live Voice Call'}
          aria-label="Live Voice Call"
        >
          <PhoneCall className="w-4.5 h-4.5" />
        </button>

        {/* Pet Community & Marketplace Tab */}
        <button
          onClick={() => setActiveTab('community')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all ${
            activeTab === 'community'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">{isOdia ? 'ସମୁଦାୟ' : 'Community'}</span>
        </button>

        {/* Reports / Passport Tab */}
        <button
          onClick={() => setActiveTab('passport')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all ${
            activeTab === 'passport' || activeTab === 'scanner' || activeTab === 'history'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">{isOdia ? 'ରେକର୍ଡ' : 'Records'}</span>
        </button>

        {/* Emergency 1962 Tab */}
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all ${
            activeTab === 'emergency'
              ? 'text-rose-600 font-black'
              : 'text-slate-500 hover:text-rose-600'
          }`}
        >
          <AlertTriangle className="w-5 h-5 text-rose-500" />
          <span className="text-[10px] mt-0.5 text-rose-600 font-bold whitespace-nowrap">1962</span>
        </button>
      </nav>

      {/* Offline Storage Diagnostic & Backup Modal */}
      {showOfflineModal && (
        <VetMitraOfflineManagerModal
          language={language}
          isOnline={isOnline}
          isSimulatedOffline={isSimulatedOffline}
          onToggleSimulatedOffline={(enabled) => setIsSimulatedOffline(enabled)}
          onClose={() => setShowOfflineModal(false)}
          onDataReset={() => {
            loadAnimals();
          }}
        />
      )}
    </div>
  );
};

export default ArohiVetMitraApp;
