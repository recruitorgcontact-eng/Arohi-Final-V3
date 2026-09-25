// Arohi Radio - Persistent Mini-Player Dock
// Docked at the bottom of the screen; fluidly expands into full-screen immersive player

import React from 'react';
import { useRadio } from '../context/RadioContext';
import { AudioWaveform } from './AudioWaveform';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Heart, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  ChevronUp,
  Maximize2
} from 'lucide-react';

export const PersistentMiniPlayer: React.FC = () => {
  const {
    currentChannel,
    currentProgramme,
    currentStory,
    currentStation,
    playbackMode,
    isPlaying,
    isDucked,
    togglePlayPause,
    nextTrack,
    setIsExpandedPlayerOpen,
    openAskArohi,
    isFavorite,
    toggleFavorite,
    volume,
    setVolume,
    isMuted,
    toggleMute
  } = useRadio();

  const isCurrentFav = isFavorite(playbackMode === 'station' && currentStation ? currentStation.id : currentChannel.id);

  const displayTitle = playbackMode === 'station' && currentStation
    ? currentStation.name
    : currentProgramme.title;

  const displaySubtitle = playbackMode === 'station' && currentStation
    ? `${currentStation.city}, ${currentStation.country} • ${currentStation.genre}`
    : currentStory
      ? currentStory.headline
      : currentProgramme.tagline;

  const accentColor = playbackMode === 'station' ? '#3B82F6' : currentChannel.accentColor;

  return (
    <div className="fixed bottom-16 md:bottom-4 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none">
      <div 
        className="max-w-5xl mx-auto pointer-events-auto rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 p-2 sm:p-2.5 transition-all duration-300 hover:border-white/20 group"
        role="region"
        aria-label="Arohi Radio Mini Player"
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Artwork / Channel Mark & Now Playing Info */}
          <div 
            onClick={() => setIsExpandedPlayerOpen(true)}
            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer select-none"
          >
            {/* Channel Monogram Badge */}
            <div 
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner overflow-hidden border border-white/10 transition-transform group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${accentColor}33, #090D16)`
              }}
            >
              <Radio className="w-5 h-5" style={{ color: accentColor }} />
              {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                  <AudioWaveform isPlaying={isPlaying} accentColor={accentColor} mode="compact" height={16} />
                </div>
              )}
            </div>

            {/* Title & Headline */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full bg-rose-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                  LIVE
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400 truncate">
                  {playbackMode === 'station' && currentStation
                    ? `${currentStation.frequency} • ${currentStation.language}`
                    : `${currentChannel.frequency} • ${currentChannel.shortName}`}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-white truncate leading-tight mt-0.5">
                {displayTitle}
              </h4>
              <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                {displaySubtitle}
              </p>
            </div>
          </div>

          {/* Center/Right: Waveform & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Live Waveform (Hidden on ultra small screens) */}
            <div 
              onClick={() => setIsExpandedPlayerOpen(true)}
              className="hidden lg:flex items-center px-3 py-1 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer"
            >
              <AudioWaveform isPlaying={isPlaying} accentColor={accentColor} barCount={20} height={24} mode="bars" />
            </div>

            {/* "Ask Arohi" Interruption CTA Button */}
            <button
              onClick={() => openAskArohi(currentStory || undefined)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600/30 to-indigo-600/30 hover:from-violet-600/40 hover:to-indigo-600/40 text-violet-200 border border-violet-500/30 text-xs font-medium transition-all shadow-sm active:scale-95"
              title="Interrupt and ask RJ Arohi a question"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              <span>Ask Arohi</span>
            </button>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(playbackMode === 'station' && currentStation ? currentStation.id : currentChannel.id);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
              title={isCurrentFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${isCurrentFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-slate-950 font-bold shadow-lg transition-transform active:scale-90 hover:scale-105"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 20px ${accentColor}44`
              }}
              title={isPlaying ? 'Pause' : 'Play Live'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-slate-950" />
              ) : (
                <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
              )}
            </button>

            {/* Next Track Button */}
            <button
              onClick={nextTrack}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Next Story / Channel"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Volume Quick Control (Desktop only) */}
            <div className="hidden md:flex items-center gap-1.5 pl-1 pr-2 border-l border-white/10">
              <button
                onClick={toggleMute}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                aria-label="Volume slider"
              />
            </div>

            {/* Expand Fullscreen Button */}
            <button
              onClick={() => setIsExpandedPlayerOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Expand Player"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Audio Ducking Indicator Bar (Subtle top line) */}
        {isDucked && (
          <div className="mt-1.5 pt-1 border-t border-violet-500/30 flex items-center justify-between text-[10px] text-violet-300 font-mono animate-pulse">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-violet-400" />
              RJ Arohi speaking on-air • Radio stream ducked
            </span>
            <span className="text-violet-400">15% Vol</span>
          </div>
        )}
      </div>
    </div>
  );
};
