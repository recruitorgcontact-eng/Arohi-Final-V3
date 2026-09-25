// Arohi Radio - Channels & 24-Hour Programme Schedules View
// Deep-dive into each of the 7 launch channels, timetables, and verified editorial feeds

import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { 
  Play, 
  Pause, 
  Radio, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Calendar 
} from 'lucide-react';
import { Channel } from '../types';

export const RadioChannelsView: React.FC = () => {
  const {
    channels,
    currentChannel,
    isPlaying,
    playChannel,
    playProgramme,
    togglePlayPause
  } = useRadio();

  const [selectedChannelId, setSelectedChannelId] = useState<string>(currentChannel.id);

  const activeChannel = channels.find(c => c.id === selectedChannelId) || channels[0];
  const isCurrentlyPlayingActive = currentChannel.id === activeChannel.id && isPlaying;

  return (
    <div className="space-y-8 pb-24">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
          7 Sovereign Channels
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Curated 24/7 AI-generated programming and verified live feeds across news, business, sports, regional Odia culture, youth careers, music, and world affairs.
        </p>
      </div>

      {/* Horizontal Channel Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {channels.map((ch) => {
          const isSelected = ch.id === activeChannel.id;
          return (
            <button
              key={ch.id}
              onClick={() => setSelectedChannelId(ch.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected 
                  ? 'bg-white/10 text-white border-white/20 shadow-md' 
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border-white/5 hover:border-white/10'
              }`}
            >
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: ch.accentColor }} 
              />
              <span>{ch.shortName}</span>
              <span className="text-[10px] font-mono text-slate-500">
                {ch.frequency}
              </span>
            </button>
          );
        })}
      </div>

      {/* Channel Spotlight Banner */}
      <div 
        className="rounded-3xl p-6 sm:p-8 border border-white/10 transition-all duration-500 shadow-2xl relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at 80% 30%, ${activeChannel.accentColor}25, #080C16 80%)`
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-slate-950"
                style={{ backgroundColor: activeChannel.accentColor }}
              >
                {activeChannel.frequency}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Category: {activeChannel.category}
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ● 24×7 ACTIVE
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {activeChannel.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeChannel.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeChannel.badges.map((b, i) => (
                <span 
                  key={i} 
                  className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Master Play Button for Channel */}
          <button
            onClick={() => {
              if (currentChannel.id === activeChannel.id) {
                togglePlayPause();
              } else {
                playChannel(activeChannel.id);
              }
            }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-slate-950 font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 shrink-0"
            style={{
              backgroundColor: activeChannel.accentColor,
              boxShadow: `0 0 35px ${activeChannel.accentColor}55`
            }}
            title="Tune into this channel"
          >
            {isCurrentlyPlayingActive ? (
              <Pause className="w-7 h-7 fill-slate-950" />
            ) : (
              <Play className="w-7 h-7 fill-slate-950 ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* 24-Hour Programme Timetable */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="font-serif text-lg font-bold text-white">
              Dynamic 24-Hour Schedule: {activeChannel.shortName}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {activeChannel.programmes.length} Scheduled Blocks
          </span>
        </div>

        <div className="space-y-3">
          {activeChannel.programmes.map((prog) => {
            const isPlayingThisProg = isCurrentlyPlayingActive && currentChannel.currentProgramme.id === prog.id;

            return (
              <div
                key={prog.id}
                onClick={() => playProgramme(prog, activeChannel)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${
                  isPlayingThisProg 
                    ? 'bg-slate-900 border-white/30 shadow-lg' 
                    : 'bg-slate-950/60 hover:bg-slate-900/60 border-white/5 hover:border-white/15'
                }`}
              >
                {/* Time & Host */}
                <div className="flex items-start gap-4">
                  <div className="w-14 sm:w-16 text-center shrink-0 pt-0.5">
                    <span className="font-mono text-base font-bold text-white block">
                      {prog.timeSlot}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase block">
                      {prog.durationMinutes}m
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                        {prog.type}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">
                        Host: <strong className="text-slate-200">{prog.host}</strong>
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {prog.title}
                    </h4>

                    <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {prog.topics.map((t, i) => (
                        <span key={i} className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Play Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playProgramme(prog, activeChannel);
                  }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 group-hover:bg-white/15 flex items-center justify-center shrink-0 text-white transition-colors"
                >
                  {isPlayingThisProg ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
