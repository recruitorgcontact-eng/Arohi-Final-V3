// Arohi VetMitra - Comprehensive Livestock & Veterinary Care Platform
// Faithfully implementing all 6 Mockup Screens with real stock photography & bottom navigation

import React, { useState } from 'react';
import { 
  Home, MessageSquare, PhoneCall, FileText, AlertTriangle, 
  Languages, Stethoscope, Sparkles, X, Bell
} from 'lucide-react';
import { VetSpecies, VetLanguage } from './types';
import { VetMitraHomeView } from './components/VetMitraHomeView';
import { VetMitraChatView } from './components/VetMitraChatView';
import { VetMitraVoiceCallScreen } from './components/VetMitraVoiceCallScreen';
import { VetMitraScannerView } from './components/VetMitraScannerView';
import { VetMitraAnimalPassportView } from './components/VetMitraAnimalPassportView';
import { VetMitraEmergencyView } from './components/VetMitraEmergencyView';
import { UniversalAnimalRecord, SAMPLE_ANIMAL_RECORDS } from './data/mockAnimalsData';

interface Props {
  initialSpecies?: VetSpecies;
  initialTab?: string;
  onBackToArohi?: () => void;
  uid?: string;
}

type VetScreenTab = 'home' | 'consult' | 'voice_call' | 'scanner' | 'passport' | 'emergency';

export const ArohiVetMitraApp: React.FC<Props> = ({
  initialSpecies = 'cattle',
  initialTab = 'home',
  onBackToArohi,
  uid,
}) => {
  const [activeTab, setActiveTab] = useState<VetScreenTab>('home');
  const [activeSpecies, setActiveSpecies] = useState<VetSpecies>(initialSpecies);
  const [language, setLanguage] = useState<VetLanguage>('or'); // Default to Odia
  const [activeAnimal, setActiveAnimal] = useState<UniversalAnimalRecord>(SAMPLE_ANIMAL_RECORDS[0]);
  const [scannerInitialMode, setScannerInitialMode] = useState<'animal' | 'milk' | 'lab'>('animal');

  const isOdia = language === 'or';

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-5 min-h-screen flex flex-col justify-between font-sans">
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
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                  {activeSpecies}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Healthy Animals • Prosperous Farmers
              </p>
            </div>
          </div>

          {/* Top Actions: Language Selector, Notification Bell & Exit */}
          <div className="flex items-center gap-2">
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
              const found = SAMPLE_ANIMAL_RECORDS.find((a) => a.species === sp);
              if (found) setActiveAnimal(found);
            }}
            language={language}
            onStartConsult={(presetQuery) => setActiveTab('consult')}
            onStartVoiceCall={() => setActiveTab('voice_call')}
            onOpenScanner={(mode) => {
              setScannerInitialMode(mode || 'animal');
              setActiveTab('scanner');
            }}
            onOpenEmergency={() => setActiveTab('emergency')}
            onViewPassport={() => setActiveTab('passport')}
          />
        )}

        {activeTab === 'consult' && (
          <VetMitraChatView
            species={activeSpecies}
            language={language}
            activeAnimal={activeAnimal}
            onStartVoiceCall={() => setActiveTab('voice_call')}
            onOpenEmergencyGuide={() => setActiveTab('emergency')}
            onChangeAnimal={() => setActiveTab('passport')}
          />
        )}

        {activeTab === 'voice_call' && (
          <VetMitraVoiceCallScreen
            species={activeSpecies}
            language={language}
            animalName={activeAnimal.name}
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
            initialAnimalId={activeAnimal.id}
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
            onBack={() => setActiveTab('home')}
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
      <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 max-w-lg w-[95%] bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-1.5 shadow-2xl z-40 flex items-center justify-around">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'home'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{isOdia ? 'ମୂଳ' : 'Home'}</span>
        </button>

        {/* Consult Tab */}
        <button
          onClick={() => setActiveTab('consult')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'consult'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{isOdia ? 'ପରାମର୍ଶ' : 'Consult'}</span>
        </button>

        {/* Center Floating Glowing Voice Call Button (Matching Mockup 1) */}
        <button
          onClick={() => setActiveTab('voice_call')}
          className="w-13 h-13 -mt-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-900/40 border-4 border-white transition-transform active:scale-95"
          title="Live Voice Call"
        >
          <PhoneCall className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase">Voice</span>
        </button>

        {/* Reports / Passport Tab */}
        <button
          onClick={() => setActiveTab('passport')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'passport' || activeTab === 'scanner'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{isOdia ? 'ରେକର୍ଡ' : 'Reports'}</span>
        </button>

        {/* Emergency 1962 Tab */}
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'emergency'
              ? 'text-rose-600 font-black'
              : 'text-slate-500 hover:text-rose-600'
          }`}
        >
          <AlertTriangle className="w-5 h-5 text-rose-500" />
          <span className="text-[10px] mt-0.5 text-rose-600 font-bold">1962</span>
        </button>
      </nav>
    </div>
  );
};

export default ArohiVetMitraApp;
