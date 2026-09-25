// VanaVeda by Arohi (वनवेद) - Master Application Container
// Root sanctuary coordinating Herbarium, Diagnostic Matrix, Vedic Science, Pranayama/Ojas suite, and Arohi Veda-Vaidya AI Companion

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Globe, 
  BookOpen, 
  Stethoscope, 
  Atom, 
  Wind, 
  Bot, 
  Share2, 
  Sun, 
  Moon,
  Flame,
  Check,
  HeartHandshake,
  Phone
} from 'lucide-react';
import { BotanicalHerbariumExplorer } from './BotanicalHerbariumExplorer';
import { SushrutaDiagnosticMatrix } from './SushrutaDiagnosticMatrix';
import { VedicScienceQuantumExplorer } from './VedicScienceQuantumExplorer';
import { PranayamaOjasDinacharyaSuite } from './PranayamaOjasDinacharyaSuite';
import { ArohiVedaVaidyaChat } from './ArohiVedaVaidyaChat';
import { VanaVedaVoiceCallScreen } from './VanaVedaVoiceCallScreen';
import { vanavedaAudio } from './vanavedaAudio';
import { BotanicalLeafSvg } from './BotanicalLeafSvg';
import { TempleBellIcon } from './TempleBellIcon';
import { SanctuaryAcousticRipple } from './SanctuaryAcousticRipple';

interface Props {
  onBackToArohi: () => void;
  initialTab?: 'herbarium' | 'diagnostic' | 'vedic' | 'sadhana' | 'chat';
}

export const ArohiVanaVedaApp: React.FC<Props> = ({
  onBackToArohi,
  initialTab = 'herbarium'
}) => {
  const [activeModule, setActiveModule] = useState<'herbarium' | 'diagnostic' | 'vedic' | 'sadhana' | 'chat'>(initialTab);
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('arohi_vanaveda_lang') || 'or'; // Odia default as requested
  });
  const [isDronePlaying, setIsDronePlaying] = useState(false);
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [rippleTriggerKey, setRippleTriggerKey] = useState(0);
  const [activeLeafContext, setActiveLeafContext] = useState<string>('tulsi');
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('arohi_vanaveda_lang', lang);
  };

  const toggleDrone = () => {
    const nextState = vanavedaAudio.toggleTanpuraDrone();
    setIsDronePlaying(nextState);

    // Trigger physical temple bell swinging animation
    setIsBellRinging(true);
    setTimeout(() => setIsBellRinging(false), 2000);

    // Trigger subtle sacred UI acoustic ripple
    setRippleTriggerKey(Date.now());

    if (nextState) {
      vanavedaAudio.playTempleBell(587.33); // D5 high resonance
    } else {
      vanavedaAudio.playTempleBell(440); // A4 calming grounding chime
    }
  };

  const handleConsultLeaf = (leafName: string) => {
    setActiveLeafContext(leafName);
    setActiveModule('chat');
  };

  const handleConsultFromDiagnosis = (summaryText: string) => {
    setActiveModule('chat');
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] dark:bg-[#0A0F0B] text-[#2B1B10] dark:text-[#EDE6D6] transition-colors font-sans antialiased selection:bg-[#15803D]/20 selection:text-[#15803D]">
      {/* Subtle UI Acoustic Ripple Overlay (Triggered by Temple Bell / Tanpura Drone) */}
      <SanctuaryAcousticRipple
        triggerKey={rippleTriggerKey}
        isDroneActive={isDronePlaying}
      />

      {/* Top Sacred Sanctuary Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF5EC]/95 dark:bg-[#0E150F]/95 backdrop-blur-md border-b border-[#E7DEC8] dark:border-[#203022] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Left: Brand Identity & Back to Arohi Hub */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBackToArohi}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-[#18231a] border border-[#E7DEC8] dark:border-[#283929] text-xs font-bold text-[#5D4A3A] dark:text-[#9CA3AF] hover:text-[#15803D] hover:border-[#15803D] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
              title="Return to Arohi AI Master Ecosystem"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Arohi Ecosystem</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#15803D] to-[#166534] flex items-center justify-center shadow-md shadow-[#15803D]/20 text-white font-serif font-black text-lg">
                <BotanicalLeafSvg leafId="tulsi" className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-serif font-black text-base sm:text-xl text-[#15803D] dark:text-[#4ADE80] tracking-tight">
                    VanaVeda
                  </h1>
                  <span className="text-[10px] sm:text-xs font-serif font-bold text-[#B45309] dark:text-[#FBBF24]">
                    वनवेद • ବନବେଦ
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-[#5D4A3A] dark:text-[#9CA3AF] font-medium leading-none">
                  by Arohi AI • Classical Botanical Science
                </p>
              </div>
            </div>
          </div>

          {/* Right Controls: Call Vaidya, Temple Bell & Tanpura Drone, Language Picker */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Voice Call Button */}
            <button
              onClick={() => setIsVoiceCallActive(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 hover:from-emerald-500 hover:to-teal-600 text-white active:scale-95 ring-2 ring-emerald-400/40"
              title="Start Live Voice Call with Arohi Veda-Vaidya"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="font-semibold">{language === 'or' ? 'କଲ୍ ବୈଦ୍ୟ' : language === 'hi' ? 'कॉल वैद्य' : 'Call Vaidya'}</span>
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
            </button>

            {/* Temple Bell & Tanpura Drone Toggle with Interactive Animation & Acoustic Ripple */}
            <div className="relative inline-flex items-center">
              {/* Concentric Local Ripple Waves emanating when bell is struck */}
              {isBellRinging && (
                <>
                  <span className="absolute inset-0 rounded-xl border-2 border-amber-400/80 pointer-events-none temple-ripple-ring-1" />
                  <span className="absolute inset-0 rounded-xl border border-emerald-400/60 pointer-events-none temple-ripple-ring-2" />
                  <span className="absolute inset-0 rounded-xl border border-amber-500/40 pointer-events-none temple-ripple-ring-3" />
                </>
              )}

              <button
                onClick={toggleDrone}
                className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 group overflow-visible ${
                  isDronePlaying
                    ? 'bg-gradient-to-r from-[#15803D] to-[#166534] text-white shadow-[0_0_20px_rgba(21,128,61,0.35)] ring-1 ring-amber-400/40'
                    : 'bg-white dark:bg-[#18231a] text-slate-700 dark:text-slate-300 border border-[#E7DEC8] dark:border-[#283929] hover:border-amber-500/70 hover:shadow-sm'
                }`}
                title="Ring Sacred Temple Bell & Toggle 136.1Hz Cosmic OM Tanpura Drone"
                aria-pressed={isDronePlaying}
              >
                {/* Interactive Animated Temple Bell Icon */}
                <span className="relative flex items-center justify-center p-0.5">
                  <TempleBellIcon
                    size={18}
                    isRinging={isBellRinging}
                    isDroneActive={isDronePlaying}
                    className="transition-transform group-hover:rotate-6"
                  />
                </span>

                <div className="flex flex-col text-left leading-none">
                  <span className="text-[11px] sm:text-xs font-bold flex items-center gap-1">
                    {isDronePlaying ? (
                      <span className="text-amber-200">Drone Active</span>
                    ) : (
                      <span>Temple Bell</span>
                    )}
                    {isDronePlaying && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    )}
                  </span>
                  <span className="text-[8px] sm:text-[9px] opacity-75 font-mono hidden sm:inline">
                    {isDronePlaying ? '136.1Hz OM' : 'Tanpura Drone'}
                  </span>
                </div>
              </button>
            </div>

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="text-xs font-bold bg-white dark:bg-[#18231a] border border-[#E7DEC8] dark:border-[#283929] rounded-xl px-2.5 py-1.5 sm:py-2 text-[#2B1B10] dark:text-[#EDE6D6] focus:outline-none focus:border-[#15803D] cursor-pointer"
            >
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="sa">संस्कृतम् (Sanskrit)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>
        </div>

        {/* Module Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t border-[#E7DEC8]/60 dark:border-[#203022]/60 py-2">
          {[
            { id: 'herbarium', label: '🌿 Botanical Herbarium', desc: '10 Sacred Trees' },
            { id: 'diagnostic', label: '🩺 Sushruta Diagnostic', desc: 'Ashta-Vidha Pariksha' },
            { id: 'vedic', label: '⚛️ Vedic Science & Koshas', desc: 'Rigveda Physics' },
            { id: 'sadhana', label: '💨 Pranayama & Ojas', desc: 'Breath & Dinacharya' },
            { id: 'chat', label: '💬 Arohi Veda-Vaidya', desc: 'Human-like Vaidya' }
          ].map((tab) => {
            const isSelected = activeModule === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveModule(tab.id as any);
                  vanavedaAudio.playTempleBell(523.25);
                }}
                className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#15803D] text-white shadow-md'
                    : 'bg-white/60 dark:bg-[#141E16] text-[#5D4A3A] dark:text-[#9CA3AF] border border-[#E7DEC8] dark:border-[#223324] hover:text-[#15803D] hover:bg-white'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeModule === 'herbarium' && (
          <BotanicalHerbariumExplorer
            language={language}
            onConsultLeafWithArohi={handleConsultLeaf}
          />
        )}

        {activeModule === 'diagnostic' && (
          <SushrutaDiagnosticMatrix
            onConsultResult={handleConsultFromDiagnosis}
          />
        )}

        {activeModule === 'vedic' && (
          <VedicScienceQuantumExplorer
            onConsultVedicNode={(nodeTitle) => {
              setActiveLeafContext(nodeTitle);
              setActiveModule('chat');
            }}
          />
        )}

        {activeModule === 'sadhana' && (
          <PranayamaOjasDinacharyaSuite
            onPrescribeWithArohi={(topic) => {
              setActiveLeafContext(topic);
              setActiveModule('chat');
            }}
            isDronePlaying={isDronePlaying}
            onToggleDrone={toggleDrone}
            isBellRinging={isBellRinging}
          />
        )}

        {activeModule === 'chat' && (
          <div className="h-[750px]">
            <ArohiVedaVaidyaChat
              language={language}
              onLanguageChange={handleLanguageChange}
              selectedLeafContext={activeLeafContext}
              onStartVoiceCall={() => setIsVoiceCallActive(true)}
            />
          </div>
        )}
      </main>

      {/* Live Voice Call Full-Screen Screen */}
      {isVoiceCallActive && (
        <VanaVedaVoiceCallScreen
          language={language === 'or' ? 'or' : language === 'hi' ? 'hi' : 'en'}
          selectedLeafContext={activeLeafContext}
          onEndCall={() => setIsVoiceCallActive(false)}
        />
      )}

      {/* Sacred Botanical Sanctuary Ribbon (Clean & Unobtrusive) */}
      <footer className="mt-16 border-t border-[#E7DEC8]/80 dark:border-[#203022] bg-[#FAF5EC]/60 dark:bg-[#0E150F]/60 py-6 px-4 text-center text-xs text-[#5D4A3A] dark:text-[#9CA3AF] space-y-1.5 backdrop-blur-sm">
        <p className="font-serif font-bold text-xs sm:text-sm text-[#15803D] dark:text-[#4ADE80]">
          VanaVeda by Arohi AI (वनवेद • ବନବେଦ)
        </p>
        <p className="max-w-md mx-auto text-[11px] leading-relaxed opacity-90">
          "Every leaf and tree on earth holds a sacred secret to heal human suffering." Digitizing classical pharmacology from the Rigveda, Atharvaveda, and Maharishi Sushruta into modern sovereign healing sanctuaries.
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 pt-1">
          Part of the unified Arohi AI ecosystem • Digitizing botanical wisdom for a healthier Bharat.
        </p>
      </footer>
    </div>
  );
};
