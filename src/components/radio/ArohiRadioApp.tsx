// Arohi Radio - Flagship AI Radio Platform
// “A new kind of radio — powered by AI.”
// Apple Music meets ElevenLabs meets intelligent live radio.

import React, { useState } from 'react';
import { RadioProvider, useRadio } from './context/RadioContext';
import { RadioHomeView } from './views/RadioHomeView';
import { RadioChannelsView } from './views/RadioChannelsView';
import { RadioExploreView } from './views/RadioExploreView';
import { RadioSearchView } from './views/RadioSearchView';
import { RadioLibraryView } from './views/RadioLibraryView';
import { PersistentMiniPlayer } from './components/PersistentMiniPlayer';
import { ExpandedPlayerModal } from './components/ExpandedPlayerModal';
import { AskArohiOverlay } from './components/AskArohiOverlay';
import { AudioWaveform } from './components/AudioWaveform';
import { 
  Radio, 
  Home, 
  Layers, 
  Compass, 
  Search, 
  Bookmark, 
  Sparkles, 
  ArrowLeft, 
  Globe, 
  Users, 
  Play, 
  Languages 
} from 'lucide-react';
import { RadioTab, RadioLanguage } from './types';

interface ArohiRadioAppProps {
  onBackToArohi?: () => void;
  isDarkMode?: boolean;
}

const RadioAppInner: React.FC<{ onBackToArohi?: () => void }> = ({ onBackToArohi }) => {
  const {
    activeTab,
    setActiveTab,
    currentChannel,
    isPlaying,
    togglePlayPause,
    openAskArohi,
    preferredLanguage,
    setPreferredLanguage
  } = useRadio();

  // Landing experience state (first visit)
  const [hasStartedListening, setHasStartedListening] = useState(() => {
    try {
      return localStorage.getItem('arohi_radio_welcomed') === 'true';
    } catch {
      return false;
    }
  });

  const handleStartListening = () => {
    setHasStartedListening(true);
    try {
      localStorage.setItem('arohi_radio_welcomed', 'true');
    } catch {
      // ignore
    }
    togglePlayPause();
  };

  // 1. FIRST-VISIT CINEMATIC LANDING SCREEN
  if (!hasStartedListening) {
    return (
      <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
        {/* Atmospheric Glow Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header */}
        <header className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">AROHI RADIO</span>
              <span className="text-[10px] font-mono text-cyan-400 block -mt-1 tracking-widest uppercase">
                Arohi AI Ecosystem
              </span>
            </div>
          </div>

          {onBackToArohi && (
            <button
              onClick={onBackToArohi}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Arohi Platform</span>
            </button>
          )}
        </header>

        {/* Center Hero Monolith */}
        <main className="relative z-10 max-w-3xl mx-auto text-center space-y-8 my-auto py-12">
          
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              A NEW KIND OF RADIO — POWERED BY AI
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
              Listen. Discover. Ask.
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              7 sovereign channels, live verified news, global frequency explorer, and an on-air conversational AI host fluent in English, Odia, and Indian languages.
            </p>
          </div>

          {/* Audio Waveform preview */}
          <div className="max-w-md mx-auto py-4">
            <AudioWaveform isPlaying={true} accentColor="#06B6D4" barCount={48} height={50} mode="wave" />
          </div>

          {/* Start CTA */}
          <div className="pt-2">
            <button
              onClick={handleStartListening}
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm sm:text-base tracking-wide transition-all shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
              <span>START LISTENING</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-slate-500 pt-4">
            <span>✓ 7 Launch Channels</span>
            <span>•</span>
            <span>✓ Zero Hallucinations</span>
            <span>•</span>
            <span>✓ 100% Free Public Audio</span>
          </div>

        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center text-xs font-mono text-slate-500">
          Arohi Radio © {new Date().getFullYear()} • One AI. Infinite Opportunities.
        </footer>
      </div>
    );
  }

  // 2. MAIN APPLICATION WORKSPACE
  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-black">
      
      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Monogram & Brand Title */}
          <div className="flex items-center gap-3">
            {onBackToArohi && (
              <button
                onClick={onBackToArohi}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Back to Arohi Platform"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif text-base font-bold text-white tracking-tight block leading-tight">
                  AROHI RADIO
                </span>
                <span className="text-[9px] font-mono text-cyan-400 block tracking-widest uppercase">
                  AI Broadcast Network
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/5">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'channels', label: '7 Channels', icon: Layers },
              { id: 'explore', label: 'Explore World', icon: Compass },
              { id: 'search', label: 'Search', icon: Search },
              { id: 'library', label: 'Library', icon: Bookmark }
            ].map(({ id, label, icon: Icon }) => {
              const isSelected = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as RadioTab)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Language Toggle & Ask Arohi */}
          <div className="flex items-center gap-2">
            {/* Language Quick Indicator */}
            <div className="relative group">
              <button 
                onClick={() => setActiveTab('library')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 border border-white/5 transition-colors"
                title="Switch Language (Odia / Hindi / English / Bengali)"
              >
                <Languages className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase">{preferredLanguage}</span>
              </button>
            </div>

            {/* Direct Ask Arohi CTA */}
            <button
              onClick={() => openAskArohi()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/30 hover:bg-violet-600/40 text-violet-200 border border-violet-500/30 text-xs font-medium transition-all shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              <span className="hidden sm:inline">Ask Arohi</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8">
        {activeTab === 'home' && <RadioHomeView />}
        {activeTab === 'channels' && <RadioChannelsView />}
        {activeTab === 'explore' && <RadioExploreView />}
        {activeTab === 'search' && <RadioSearchView />}
        {activeTab === 'library' && <RadioLibraryView />}
      </main>

      {/* Mobile Bottom Navigation Bar (Fixed for mobile) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-2xl border-t border-white/10 px-4 py-2 flex items-center justify-around"
        role="navigation"
        aria-label="Mobile Navigation"
      >
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'channels', label: 'Channels', icon: Layers },
          { id: 'explore', label: 'Explore', icon: Compass },
          { id: 'search', label: 'Search', icon: Search },
          { id: 'library', label: 'Library', icon: Bookmark }
        ].map(({ id, label, icon: Icon }) => {
          const isSelected = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id as RadioTab)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
                isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Persistent Mini-Player Dock */}
      <PersistentMiniPlayer />

      {/* Fullscreen Expanded Player Modal */}
      <ExpandedPlayerModal />

      {/* Ask Arohi Conversational On-Air Overlay */}
      <AskArohiOverlay />

    </div>
  );
};

export default function ArohiRadioApp(props: ArohiRadioAppProps) {
  return (
    <RadioProvider>
      <RadioAppInner {...props} />
    </RadioProvider>
  );
}
