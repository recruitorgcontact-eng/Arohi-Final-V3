// Arohi Radio - Explore the World Geographic Radio Navigator
// Original geographic station explorer (Not copying Radio Garden) - Clean, editorial, and global

import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { GLOBAL_RADIO_STATIONS, REGIONS_LIST } from '../data/globalRadioStations';
import { RadioStation } from '../types';
import { 
  Globe, 
  MapPin, 
  Radio, 
  Play, 
  Pause, 
  Sparkles, 
  Wifi, 
  Search, 
  Layers, 
  ShieldCheck,
  Headphones
} from 'lucide-react';

export const RadioExploreView: React.FC = () => {
  const {
    currentStation,
    playbackMode,
    isPlaying,
    playStation,
    togglePlayPause
  } = useRadio();

  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePinStation, setActivePinStation] = useState<RadioStation | null>(() => GLOBAL_RADIO_STATIONS[0]);

  const filteredStations = GLOBAL_RADIO_STATIONS.filter((station) => {
    const matchesRegion = selectedRegion === 'All' || station.region === selectedRegion;
    const matchesSearch = searchQuery === '' || 
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.language.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-24">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Globe className="w-5 h-5 text-blue-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            Geographic Frequency Discovery
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Explore the World
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Tune into verified, legal live radio broadcasts across Odisha, India, and premier global cultural capitals.
        </p>
      </div>

      {/* Interactive Geographic Radar Canvas (Original Arohi Design) */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-950 border border-white/10 overflow-hidden shadow-2xl">
        {/* Radar concentric rings */}
        <div className="absolute right-6 -top-12 w-96 h-96 rounded-full border border-blue-500/10 pointer-events-none" />
        <div className="absolute right-18 top-0 w-72 h-72 rounded-full border border-blue-500/15 pointer-events-none" />
        <div className="absolute right-30 top-12 w-48 h-48 rounded-full border border-blue-500/20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold">
              Global Frequency Coordinates
            </span>

            {activePinStation ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activePinStation.city}, {activePinStation.country}</span>
                  <span className="text-slate-600">•</span>
                  <span>{activePinStation.latitude.toFixed(2)}° N, {activePinStation.longitude.toFixed(2)}° E</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {activePinStation.name}
                </h3>
                <p className="text-xs text-slate-300">
                  Current Feed: <strong className="text-white">{activePinStation.currentProgramme}</strong>
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400 pt-1">
                  <span>Language: {activePinStation.language}</span>
                  <span>•</span>
                  <span>Bitrate: {activePinStation.bitrate}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Select any station below to inspect its broadcast node.</p>
            )}

            {activePinStation && (
              <div className="pt-2">
                <button
                  onClick={() => playStation(activePinStation)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                  <span>Tune into {activePinStation.city} Live</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick World Regional Hubs */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2 text-xs">
            {GLOBAL_RADIO_STATIONS.slice(0, 6).map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  setActivePinStation(st);
                  playStation(st);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activePinStation?.id === st.id 
                    ? 'bg-blue-600/20 border-blue-500/40 text-white shadow-sm' 
                    : 'bg-white/5 border-white/5 hover:border-white/10 text-slate-300'
                }`}
              >
                <span className="font-mono text-[10px] text-cyan-400 block uppercase font-bold">
                  {st.city}
                </span>
                <span className="font-medium truncate block text-xs mt-0.5">
                  {st.name}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Regions list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {REGIONS_LIST.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedRegion === reg
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white border-white/5'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city, station, language..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStations.map((station) => {
          const isCurrentStationPlaying = playbackMode === 'station' && currentStation?.id === station.id && isPlaying;

          return (
            <div
              key={station.id}
              onClick={() => {
                setActivePinStation(station);
                playStation(station);
              }}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 group ${
                isCurrentStationPlaying 
                  ? 'bg-slate-900 border-blue-500/40 shadow-xl' 
                  : 'bg-slate-950/60 hover:bg-slate-900/60 border-white/5 hover:border-white/15'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-cyan-400 uppercase text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {station.city}, {station.country}
                  </span>
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                    {station.streamStatus}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {station.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-1">
                  Feed: {station.currentProgramme}
                </p>

                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-500 pt-1">
                  <span>{station.frequency}</span>
                  <span>•</span>
                  <span>{station.language}</span>
                  <span>•</span>
                  <span>{station.genre}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-500">
                  {station.attribution}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isCurrentStationPlaying) {
                      togglePlayPause();
                    } else {
                      setActivePinStation(station);
                      playStation(station);
                    }
                  }}
                  className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white font-bold transition-transform active:scale-90 shadow-md"
                >
                  {isCurrentStationPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
