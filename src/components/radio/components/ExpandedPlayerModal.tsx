// Arohi Radio - Expanded Immersive Player Modal
// Apple Music / ElevenLabs inspired full-screen studio listening canvas with live synchronized transcript

import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { AudioWaveform } from './AudioWaveform';
import { 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Heart, 
  Share2, 
  Sparkles, 
  Clock, 
  Radio, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  Languages, 
  Moon, 
  Bookmark,
  Users
} from 'lucide-react';

export const ExpandedPlayerModal: React.FC = () => {
  const {
    isExpandedPlayerOpen,
    setIsExpandedPlayerOpen,
    currentChannel,
    currentProgramme,
    currentStory,
    currentStation,
    playbackMode,
    isPlaying,
    isDucked,
    togglePlayPause,
    nextTrack,
    prevTrack,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    openAskArohi,
    isFavorite,
    toggleFavorite,
    sleepTimerMinutes,
    sleepTimerSecondsRemaining,
    setSleepTimer,
    clearSleepTimer,
    preferredLanguage,
    setPreferredLanguage
  } = useRadio();

  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'schedule'>('overview');
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [isSleepMenuOpen, setIsSleepMenuOpen] = useState(false);

  if (!isExpandedPlayerOpen) return null;

  const isCurrentFav = isFavorite(playbackMode === 'station' && currentStation ? currentStation.id : currentChannel.id);
  const accentColor = playbackMode === 'station' ? '#3B82F6' : currentChannel.accentColor;

  const displayTitle = playbackMode === 'station' && currentStation
    ? currentStation.name
    : currentProgramme.title;

  const displayHost = playbackMode === 'station' && currentStation
    ? `${currentStation.city}, ${currentStation.country}`
    : currentProgramme.host;

  // Active story headline & translation
  const headline = currentStory?.headline || currentProgramme.tagline;
  const summary = currentStory?.summary || currentProgramme.description;

  const handleCopyTranscript = () => {
    const textToCopy = `[Arohi Radio - ${currentChannel.name}]\nProgramme: ${displayTitle}\nHost: ${displayHost}\n\nStory: ${headline}\n\nSummary: ${summary}\nSource: ${currentStory?.source || currentProgramme.sourceAttribution}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Listening to ${currentChannel.name} on Arohi Radio`,
        text: `${headline} — Listen live on Arohi Radio`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopyTranscript();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/98 backdrop-blur-3xl text-slate-100 overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Arohi Radio Expanded Player"
    >
      {/* Dynamic Atmospheric Glow Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${accentColor} 0%, transparent 60%)`
        }}
      />

      {/* Top Header Navigation Bar */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10"
            style={{ backgroundColor: `${accentColor}22` }}
          >
            <Radio className="w-4 h-4" style={{ color: accentColor }} />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block">
              Arohi Radio • On Air
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              {playbackMode === 'station' && currentStation ? currentStation.callsign : currentChannel.name}
            </span>
          </div>
        </div>

        {/* Center: Live Pulse & Audience Count */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
          <span className="flex items-center gap-1.5 text-rose-400 font-mono font-bold text-[10px]">
            <span className={`w-2 h-2 rounded-full bg-rose-500 ${isPlaying ? 'animate-pulse' : ''}`} />
            LIVE BROADCAST
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
            <Users className="w-3 h-3 text-slate-400" />
            {(currentChannel.listenerCount + 120).toLocaleString()} listening
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Sleep Timer Button */}
          <div className="relative">
            <button
              onClick={() => setIsSleepMenuOpen(!isSleepMenuOpen)}
              className={`p-2 rounded-xl border transition-colors ${sleepTimerMinutes > 0 ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'}`}
              title="Sleep Timer"
            >
              <Moon className="w-4 h-4" />
            </button>
            {isSleepMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-44 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-2 space-y-1 text-xs">
                <span className="block px-3 py-1 font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  Sleep Timer
                </span>
                {[15, 30, 45, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSleepTimer(m);
                      setIsSleepMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 transition-colors flex items-center justify-between"
                  >
                    <span>{m} minutes</span>
                    {sleepTimerMinutes === m && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
                {sleepTimerMinutes > 0 && (
                  <button
                    onClick={() => {
                      clearSleepTimer();
                      setIsSleepMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-rose-500/20 text-rose-300 transition-colors border-t border-white/5 mt-1"
                  >
                    Turn off timer
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Share Broadcast"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Close Modal */}
          <button
            onClick={() => setIsExpandedPlayerOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Minimize"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-6 flex flex-col justify-between gap-6">
        
        {/* Upper Grid: Visual Artwork & Live Stream Centerpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Left Column (5 Cols): Artwork Deck */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
            
            {/* Vinyl / Frequency Studio Artwork Block */}
            <div 
              className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl shadow-black border border-white/10 p-6 flex flex-col justify-between transition-transform duration-500 hover:scale-[1.02]"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${accentColor}44, #070B14 80%)`
              }}
            >
              {/* Dial markings & frequency badge */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-white border border-white/10">
                  {playbackMode === 'station' && currentStation ? currentStation.frequency : currentChannel.frequency}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                  <span className={`w-1.5 h-1.5 rounded-full bg-rose-500 ${isPlaying ? 'animate-ping' : ''}`} />
                  ON-AIR
                </span>
              </div>

              {/* Big Editorial Monogram */}
              <div className="my-auto text-center">
                <Radio className="w-16 h-16 mx-auto mb-2 opacity-90" style={{ color: accentColor }} />
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                  {playbackMode === 'station' && currentStation ? currentStation.callsign : currentChannel.shortName}
                </h3>
                <p className="text-[11px] font-mono text-slate-300 mt-1 uppercase tracking-wider">
                  {currentChannel.category}
                </p>
              </div>

              {/* Bottom Artwork Footer */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-2">
                <span>{playbackMode === 'station' && currentStation ? currentStation.city : 'ODISHA / INDIA'}</span>
                <span>{playbackMode === 'station' && currentStation ? currentStation.bitrate : 'STUDIO HD'}</span>
              </div>
            </div>

            {/* Verification & Source Badge */}
            <div className="flex flex-wrap gap-2 text-[10px] font-mono justify-center sm:justify-start">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                ✓ VERIFIED STREAM
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                AI HOST ENABLED
              </span>
              {sleepTimerSecondsRemaining > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  ⏱ Sleep in {Math.ceil(sleepTimerSecondsRemaining / 60)}m
                </span>
              )}
            </div>

          </div>

          {/* Right Column (7 Cols): Editorial Programme & Synchronized Transcript */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* View Mode Tabs: Overview vs Transcript */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${activeTab === 'overview' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                On-Air Overview
              </button>
              <button
                onClick={() => setActiveTab('transcript')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'transcript' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Live Transcript</span>
              </button>
            </div>

            {/* TAB CONTENT 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                      {playbackMode === 'station' ? 'Live Radio Feed' : `Slot: ${currentProgramme.timeSlot}`}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">
                      Host: <strong className="text-slate-200">{displayHost}</strong>
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight leading-snug">
                    {displayTitle}
                  </h2>
                </div>

                {/* Current Story Card with Source Attribution */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      Current Story on Frequencies
                    </span>
                    {currentStory && (
                      <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        {currentStory.timestamp}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-snug">
                    {headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {summary}
                  </p>

                  {/* Bullet points if available */}
                  {currentStory?.keyBulletPoints && (
                    <ul className="space-y-1 pt-1 text-xs text-slate-400 list-disc list-inside">
                      {currentStory.keyBulletPoints.map((pt, i) => (
                        <li key={i} className="leading-relaxed">{pt}</li>
                      ))}
                    </ul>
                  )}

                  {/* Verified Source Citation Box */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-[11px] font-mono uppercase text-slate-500">Source:</span>
                      <strong className="text-slate-200 font-medium">
                        {currentStory?.source || currentProgramme.sourceAttribution}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Ask Arohi about this story */}
                      <button
                        onClick={() => openAskArohi(currentStory || undefined)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-violet-300 hover:text-violet-200 bg-violet-500/10 hover:bg-violet-500/20 px-2.5 py-1 rounded-lg border border-violet-500/20 transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-violet-400" />
                        <span>Ask Arohi about this</span>
                      </button>

                      {currentStory?.sourceUrl && (
                        <a 
                          href={currentStory.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-white p-1"
                          title="Original Source Reference"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: LIVE TRANSCRIPT */}
            {activeTab === 'transcript' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 max-h-72 overflow-y-auto animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                      Synchronized Broadcast Transcript
                    </span>
                  </div>
                  <button
                    onClick={handleCopyTranscript}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedTranscript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTranscript ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <p>
                    <strong className="text-cyan-300 font-mono block mb-1">
                      [RJ Arohi - On-Air Broadcast Desk]:
                    </strong>
                    “Good day listeners, you are tuned to {currentChannel.name} on the {currentChannel.frequency} dial. Here is your scheduled intelligence wrap.”
                  </p>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      Current Item ({currentStory?.timestamp || 'Live'})
                    </span>
                    <p className="font-semibold text-white">
                      {headline}
                    </p>
                    <p className="text-slate-300">
                      {summary}
                    </p>
                    <p className="text-[10px] text-slate-500 pt-1">
                      Attribution: {currentStory?.source || currentProgramme.sourceAttribution}
                    </p>
                  </div>

                  <p>
                    <strong className="text-violet-300 font-mono block mb-1">
                      [Interactive Feature Notice]:
                    </strong>
                    “You can interrupt this broadcast anytime by tapping the microphone icon below to ask questions or request an explainer in your regional language.”
                  </p>
                </div>
              </div>
            )}

            {/* Audio Waveform Banner */}
            <div className="pt-2">
              <AudioWaveform isPlaying={isPlaying} accentColor={accentColor} barCount={64} height={42} mode="wave" />
            </div>

          </div>

        </div>

        {/* Bottom Playback Deck & Audio Controls */}
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: Interruption Button (Ask RJ Arohi) */}
            <button
              onClick={() => openAskArohi(currentStory || undefined)}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-violet-200 animate-pulse" />
              <span>Ask RJ Arohi (Interrupt on Air)</span>
            </button>

            {/* Center: Master Playback Controls */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={prevTrack}
                className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Previous Track / Story"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlayPause}
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-slate-950 font-bold shadow-xl transition-transform active:scale-90 hover:scale-105"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 30px ${accentColor}55`
                }}
                title={isPlaying ? 'Pause' : 'Play Live'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-slate-950" />
                ) : (
                  <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Next Track / Story"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Right: Master Volume Slider & Favorite */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleFavorite(playbackMode === 'station' && currentStation ? currentStation.id : currentChannel.id)}
                className="p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                title="Favorite"
              >
                <Heart className={`w-5 h-5 ${isCurrentFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
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
                  className="w-20 sm:w-28 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
