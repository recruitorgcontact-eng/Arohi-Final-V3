// Arohi Radio - Library & User Profile View
// Favorites, Listening History, Bookmarked Stories, and Multilingual Language Switcher

import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { 
  Heart, 
  Clock, 
  Languages, 
  Sliders, 
  Radio, 
  Trash2, 
  Play, 
  Check, 
  Bookmark, 
  Moon, 
  Wifi, 
  Volume2, 
  User, 
  ExternalLink 
} from 'lucide-react';
import { RadioLanguage } from '../types';

export const RadioLibraryView: React.FC = () => {
  const {
    favorites,
    channels,
    stations,
    playChannel,
    playStation,
    toggleFavorite,
    preferredLanguage,
    setPreferredLanguage,
    sleepTimerMinutes,
    setSleepTimer,
    clearSleepTimer
  } = useRadio();

  const [activeTab, setActiveTab] = useState<'favorites' | 'settings'>('favorites');
  const [audioQuality, setAudioQuality] = useState<'low' | 'standard' | 'hd'>('standard');

  const favoriteChannels = channels.filter(c => favorites.includes(c.id));
  const favoriteStations = stations.filter(s => favorites.includes(s.id));

  const languagesList: Array<{ code: RadioLanguage; name: string; nativeName: string; region: string }> = [
    { code: 'en', name: 'English', nativeName: 'English (Indian/Global)', region: 'National & Global' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ (Odia)', region: 'Odisha & Utkal' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी (Hindi)', region: 'National' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা (Bengali)', region: 'Eastern India' }
  ];

  return (
    <div className="space-y-8 pb-24">
      
      {/* Header Profile Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white text-xl font-bold shadow-xl shadow-cyan-500/20">
            AR
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              Arohi Radio Listener
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Ecosystem: Arohi AI • Sovereign Audio Tier
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === 'favorites' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === 'settings' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Audio & Language
          </button>
        </div>
      </div>

      {/* TAB 1: FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          {favorites.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 mx-auto text-slate-600" />
              <h3 className="font-serif text-lg font-bold text-white">No favorites saved yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Tap the heart icon on any channel or live station to pin it to your personal radio library.
              </p>
            </div>
          ) : (
            <>
              {favoriteChannels.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    <span>Favorite Sovereign Channels ({favoriteChannels.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {favoriteChannels.map((ch) => (
                      <div
                        key={ch.id}
                        onClick={() => playChannel(ch.id)}
                        className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono text-cyan-400 block">{ch.frequency}</span>
                          <h4 className="font-serif text-sm font-bold text-white truncate">{ch.name}</h4>
                          <p className="text-xs text-slate-400 truncate">{ch.currentProgramme.title}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(ch.id);
                            }}
                            className="p-1.5 text-rose-500 hover:bg-white/5 rounded-lg"
                            title="Remove favorite"
                          >
                            <Heart className="w-4 h-4 fill-rose-500" />
                          </button>
                          <button className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {favoriteStations.length > 0 && (
                <div className="space-y-3 pt-4">
                  <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-blue-400" />
                    <span>Favorite Geographic Stations ({favoriteStations.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {favoriteStations.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => playStation(st)}
                        className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono text-blue-400 block">{st.city}, {st.country}</span>
                          <h4 className="font-serif text-sm font-bold text-white truncate">{st.name}</h4>
                          <p className="text-xs text-slate-400 truncate">{st.genre}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(st.id);
                            }}
                            className="p-1.5 text-rose-500 hover:bg-white/5 rounded-lg"
                            title="Remove favorite"
                          >
                            <Heart className="w-4 h-4 fill-rose-500" />
                          </button>
                          <button className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white">
                            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* TAB 2: SETTINGS (LANGUAGE & AUDIO) */}
      {activeTab === 'settings' && (
        <div className="space-y-8 max-w-3xl">
          
          {/* Multilingual Selector */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <Languages className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-serif text-base font-bold text-white">
                  Preferred Broadcast Language
                </h3>
                <p className="text-xs text-slate-400">
                  Select your primary language for on-air explanations, transcripts, and AI host synthesis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {languagesList.map((lang) => {
                const isSelected = preferredLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setPreferredLanguage(lang.code)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-sm'
                        : 'bg-white/5 border-white/5 hover:border-white/10 text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-sm block">{lang.nativeName}</span>
                      <span className="text-xs text-slate-400">{lang.region}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audio Quality & Bandwidth */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-serif text-base font-bold text-white">
                  Audio Quality & Bandwidth Mode
                </h3>
                <p className="text-xs text-slate-400">
                  Optimized for seamless rural 2G/3G/4G connectivity across all Indian districts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { id: 'low', title: 'Data Saver (32 kbps)', desc: 'Optimized for 2G/3G rural networks' },
                { id: 'standard', title: 'Standard (128 kbps)', desc: 'Crystal clear balanced streaming' },
                { id: 'hd', title: 'Studio HD (320 kbps)', desc: 'Full fidelity acoustic master quality' }
              ].map((q) => (
                <button
                  key={q.id}
                  onClick={() => setAudioQuality(q.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    audioQuality === q.id
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-white shadow-sm'
                      : 'bg-white/5 border-white/5 hover:border-white/10 text-slate-300'
                  }`}
                >
                  <span className="font-semibold text-xs block">{q.title}</span>
                  <span className="text-[11px] text-slate-400 block mt-1">{q.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sleep Timer Preset */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-serif text-base font-bold text-white">
                  Bedtime Sleep Timer
                </h3>
                <p className="text-xs text-slate-400">
                  Gently fade out the audio stream automatically when you fall asleep.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {[15, 30, 45, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => setSleepTimer(m)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    sleepTimerMinutes === m
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-white/5 border-white/5 hover:border-white/10 text-slate-300'
                  }`}
                >
                  {m} Minutes
                </button>
              ))}
              {sleepTimerMinutes > 0 && (
                <button
                  onClick={clearSleepTimer}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-all"
                >
                  Cancel Timer
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
