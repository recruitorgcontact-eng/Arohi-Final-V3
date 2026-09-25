// Arohi Radio - Home View
// Hero "Now Playing" cinematic experience, horizontal 7-channel selector, and "For You" curation

import React from 'react';
import { useRadio } from '../context/RadioContext';
import { AudioWaveform } from '../components/AudioWaveform';
import { 
  Play, 
  Pause, 
  Sparkles, 
  Radio, 
  Users, 
  ChevronRight, 
  Clock, 
  ExternalLink, 
  Bookmark, 
  TrendingUp, 
  Layers, 
  ShieldCheck,
  Headphones,
  Compass
} from 'lucide-react';

export const RadioHomeView: React.FC = () => {
  const {
    currentChannel,
    currentProgramme,
    currentStory,
    isPlaying,
    togglePlayPause,
    playChannel,
    playProgramme,
    openAskArohi,
    setIsExpandedPlayerOpen,
    setActiveTab,
    channels
  } = useRadio();

  const accentColor = currentChannel.accentColor;
  const headline = currentStory?.headline || currentProgramme.tagline;
  const summary = currentStory?.summary || currentProgramme.description;

  return (
    <div className="space-y-10 sm:space-y-12 pb-24">
      
      {/* 1. HERO AREA: IMMERSIVE "NOW PLAYING" */}
      <section 
        className="relative rounded-3xl overflow-hidden border border-white/10 p-6 sm:p-10 lg:p-12 transition-all duration-700 shadow-2xl"
        style={{
          background: `radial-gradient(circle at 75% 20%, ${accentColor}25, #070B14 70%)`
        }}
        aria-label="Now Playing Hero"
      >
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (8 cols): Metadata, Headlines & Controls */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Upper Badge Line */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <span className={`w-2 h-2 rounded-full bg-rose-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                ON AIR NOW
              </span>
              <span className="text-xs font-mono text-slate-400">
                {currentChannel.frequency} • {currentChannel.name}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                <Users className="w-3 h-3 text-slate-400" />
                {(currentChannel.listenerCount + 140).toLocaleString()} Listeners
              </span>
            </div>

            {/* Editorial Title & Programme */}
            <div>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-400 mb-1">
                Programme: {currentProgramme.title} (Host: {currentProgramme.host})
              </p>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {headline}
              </h1>
            </div>

            {/* Story Summary */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans line-clamp-3">
              {summary}
            </p>

            {/* Source Citation */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Wire: <strong className="text-slate-200">{currentStory?.source || currentProgramme.sourceAttribution}</strong></span>
              <span className="text-slate-600">•</span>
              <span>{currentStory?.timestamp || 'Live Update'}</span>
            </div>

            {/* CTA Buttons: LISTEN LIVE & ASK AROHI */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={togglePlayPause}
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-2xl font-bold text-sm text-slate-950 transition-all shadow-xl hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 25px ${accentColor}55`
                }}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-slate-950" />
                    <span>PAUSE BROADCAST</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                    <span>LISTEN LIVE</span>
                  </>
                )}
              </button>

              <button
                onClick={() => openAskArohi(currentStory || undefined)}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-sm transition-all shadow-sm active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-violet-300 animate-pulse" />
                <span>ASK AROHI</span>
              </button>

              <button
                onClick={() => setIsExpandedPlayerOpen(true)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors hidden sm:block"
              >
                Open Studio Deck →
              </button>
            </div>

          </div>

          {/* Right Column (4 cols): Studio Visualizer Dial */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
            <div 
              onClick={() => setIsExpandedPlayerOpen(true)}
              className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border border-white/15 shadow-2xl p-5 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:scale-105 hover:border-white/30"
              style={{
                background: `linear-gradient(145deg, ${accentColor}33, #060912 85%)`
              }}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="font-bold text-white uppercase">{currentChannel.shortName}</span>
                <span className="text-cyan-400">{currentChannel.frequency}</span>
              </div>

              <div className="text-center my-auto">
                <Radio className="w-12 h-12 mx-auto mb-2 text-white/90 group-hover:scale-110 transition-transform" />
                <span className="font-serif text-lg font-bold text-white block">
                  Arohi Radio
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Tap to expand
                </span>
              </div>

              <div className="pt-2 border-t border-white/10">
                <AudioWaveform isPlaying={isPlaying} accentColor={accentColor} barCount={24} height={20} mode="wave" />
              </div>
            </div>

            <p className="text-[11px] font-mono text-slate-400 text-center">
              “Listen. Discover. Ask.”
            </p>
          </div>

        </div>
      </section>

      {/* 2. THE 7 CHANNELS SELECTOR (PREMIUM HORIZONTAL EXPLORER) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              7 Launch Channels
            </h2>
            <p className="text-xs text-slate-400">
              Sovereign AI-curated broadcasts, 24 hours a day
            </p>
          </div>

          <button
            onClick={() => setActiveTab('channels')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>Full Schedules</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Channel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((channel) => {
            const isSelected = currentChannel.id === channel.id;
            return (
              <div
                key={channel.id}
                onClick={() => playChannel(channel.id)}
                className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 group ${
                  isSelected 
                    ? 'bg-slate-900 border-white/30 shadow-xl' 
                    : 'bg-slate-950/60 hover:bg-slate-900/80 border-white/5 hover:border-white/15'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: channel.accentColor }} 
                    />
                    <span className="font-mono text-xs text-slate-400">
                      {channel.frequency}
                    </span>
                  </div>

                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                    LIVE
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {channel.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {channel.tagline}
                  </p>
                </div>

                {/* Current Programme & Play button */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Now Playing</span>
                    <span className="font-medium text-slate-200 truncate block text-[11px]">
                      {channel.currentProgramme.title}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isSelected) {
                        togglePlayPause();
                      } else {
                        playChannel(channel.id);
                      }
                    }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-slate-950 transition-transform active:scale-90"
                    style={{ backgroundColor: channel.accentColor }}
                  >
                    {isSelected && isPlaying ? (
                      <Pause className="w-4 h-4 fill-slate-950" />
                    ) : (
                      <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. "FOR YOU" PERSONALIZED CURATION */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
            For You
          </h2>
          <p className="text-xs text-slate-400">
            Tailored intelligence based on your listening habits and time of day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Morning Briefing */}
          <div 
            onClick={() => playChannel('arohi-news')}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 border border-white/5 hover:border-white/20 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-400 font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Your Morning Briefing
              </span>
              <span className="text-[10px] font-mono text-slate-500">12 mins</span>
            </div>
            <h4 className="font-serif text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              India Today: Science, Economy & Governance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated by RJ Arohi with essential updates on ISRO propulsion tests, UPI milestones, and energy policies.
            </p>
          </div>

          {/* Card 2: Mission 87 Earning Radar */}
          <div 
            onClick={() => playChannel('arohi-business')}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 border border-white/5 hover:border-white/20 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Because you listened to Business
              </span>
              <span className="text-[10px] font-mono text-slate-500">20 mins</span>
            </div>
            <h4 className="font-serif text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              Sovereign Earning & Founder Ladders
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              How youth cadets in Odisha and tier-2 districts are scaling micro-enterprises with Arohi Business OS.
            </p>
          </div>

          {/* Card 3: Deep Focus Ambient */}
          <div 
            onClick={() => playChannel('arohi-music')}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 border border-white/5 hover:border-white/20 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-pink-400 font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5" />
                Recommended for Focus
              </span>
              <span className="text-[10px] font-mono text-slate-500">Continuous</span>
            </div>
            <h4 className="font-serif text-base font-bold text-white group-hover:text-pink-300 transition-colors">
              Deep Flow: Minimalist Synthetic Warmth & 432Hz
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero vocal distractions. Synthesized binaural beats designed for coding, reading, and deep study.
            </p>
          </div>

        </div>
      </section>

      {/* 4. EXPLORE GLOBAL FREQUENCIES TEASER BANNER */}
      <section 
        onClick={() => setActiveTab('explore')}
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-6 group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
              Explore the World Frequencies
            </h3>
            <p className="text-xs text-slate-300">
              Tune in to verified public live radio feeds across Cuttack, Mumbai, Tokyo, London, Paris, and Bern.
            </p>
          </div>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/40 text-blue-200 border border-blue-500/30 text-xs font-semibold transition-all shrink-0">
          Launch Radio Explorer →
        </button>
      </section>

    </div>
  );
};
