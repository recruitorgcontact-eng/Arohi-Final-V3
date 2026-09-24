import React, { useState, useRef, useEffect } from 'react';
import { REGIONAL_STUDIO_VOICES, StudioVoice } from '../../../data/voiceStudioData';
import { downloadAudioFile } from '../../../utils/audioExporter';
import { playArohiVoice, stopArohiVoice } from '../../../utils/arohiVoicePlayer';
import { 
  Play, 
  Pause, 
  Download, 
  Volume2, 
  Sliders, 
  Sparkles, 
  RotateCcw,
  Check,
  Globe,
  Headphones
} from 'lucide-react';

interface TextToSpeechTabProps {
  isDarkMode?: boolean;
}

export const TextToSpeechTab: React.FC<TextToSpeechTabProps> = ({ isDarkMode = false }) => {
  const [selectedVoice, setSelectedVoice] = useState<StudioVoice>(REGIONAL_STUDIO_VOICES[0]);
  const [inputText, setInputText] = useState<string>(REGIONAL_STUDIO_VOICES[0].sampleText);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('hi');
  const [speed, setSpeed] = useState<number>(1.0);
  const [emotion, setEmotion] = useState<'warm' | 'expressive' | 'calm' | 'authoritative' | 'excited'>('expressive');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastAudioBase64, setLastAudioBase64] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // When voice changes, update default sample text and language
  const handleSelectVoice = (voice: StudioVoice) => {
    setSelectedVoice(voice);
    setInputText(voice.sampleText);
    setSelectedLanguage(voice.languageCode);
    if (isPlaying) {
      stopArohiVoice();
      setIsPlaying(false);
    }
  };

  const handlePlayVoice = async () => {
    if (isPlaying) {
      stopArohiVoice();
      setIsPlaying(false);
      return;
    }

    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      // First check server synthesis endpoint
      const response = await fetch('/api/voice-studio/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText.trim(),
          voice: selectedVoice.name === 'Arjun' ? 'Fenrir' : 'Aoede',
          language: selectedLanguage,
          speed,
          emotion
        })
      });

      const data = await response.json();
      if (data.success && data.audioBase64) {
        setLastAudioBase64(data.audioBase64);
      }

      // Play audio cleanly via ArohiVoicePlayer
      playArohiVoice(inputText.trim(), {
        voice: selectedVoice.name === 'Arjun' ? 'Fenrir' : 'Aoede',
        language: selectedLanguage,
        onStart: () => {
          setIsLoading(false);
          setIsPlaying(true);
        },
        onEnd: () => {
          setIsPlaying(false);
        },
        onError: () => {
          setIsLoading(false);
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.warn('Synthesis play error:', err);
      // Fallback direct voice play
      playArohiVoice(inputText.trim(), {
        voice: 'Aoede',
        language: selectedLanguage,
        onStart: () => {
          setIsLoading(false);
          setIsPlaying(true);
        },
        onEnd: () => {
          setIsPlaying(false);
        }
      });
    }
  };

  const handleDownloadMp3 = () => {
    if (lastAudioBase64) {
      downloadAudioFile(lastAudioBase64, `Arohi-${selectedVoice.name}-${selectedVoice.language}.mp3`);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } else {
      // If not yet synthesized via API, trigger synthesis then download
      setIsLoading(true);
      fetch('/api/voice-studio/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText.trim(),
          voice: selectedVoice.name === 'Arjun' ? 'Fenrir' : 'Aoede',
          language: selectedLanguage
        })
      })
        .then(res => res.json())
        .then(data => {
          setIsLoading(false);
          if (data.audioBase64) {
            setLastAudioBase64(data.audioBase64);
            downloadAudioFile(data.audioBase64, `Arohi-${selectedVoice.name}-${selectedVoice.language}.mp3`);
            setDownloadSuccess(true);
            setTimeout(() => setDownloadSuccess(false), 3000);
          }
        })
        .catch(() => setIsLoading(false));
    }
  };

  return (
    <div className={`rounded-3xl border shadow-xl p-5 sm:p-8 transition-all ${
      isDarkMode ? 'bg-[#0b101b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
            <Headphones className="w-4 h-4" />
            <span>Interactive TTS Studio · 24kHz HD Neural</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            Turn Any Text into Living Indian Voice
          </h2>
        </div>

        {/* Action Buttons: Instant MP3 Download & Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadMp3}
            disabled={isLoading || !inputText.trim()}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
            }`}
            title="Download synthesized audio file instantly as .mp3"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Downloaded .mp3!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download .mp3</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Studio Workspace: Left Voice Picker & Right Text/Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Voice Picker List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
            <span>SELECT VOICE AVATAR</span>
            <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
              {REGIONAL_STUDIO_VOICES.length} Indian Voices
            </span>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
            {REGIONAL_STUDIO_VOICES.map((voice) => {
              const isSelected = selectedVoice.id === voice.id;
              return (
                <button
                  key={voice.id}
                  type="button"
                  onClick={() => handleSelectVoice(voice)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-slate-800/90 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                        : 'bg-emerald-50/60 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                      : isDarkMode
                        ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Tactile Mini Vinyl Disc */}
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${voice.discGradient} p-0.5 shadow-md shrink-0 relative flex items-center justify-center ${
                      isSelected && isPlaying ? 'animate-spin' : ''
                    }`} style={{ animationDuration: '6s' }}>
                      <div className="w-3.5 h-3.5 rounded-full bg-black/60 border border-white/40 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm truncate">{voice.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-slate-700 dark:text-slate-300">
                          {voice.language}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {voice.category} · {voice.tagline}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Text Input Playground, Controls & Waveform Disc */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Voice Banner with Tactile Disc & Details */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${selectedVoice.discGradient} p-1 shadow-lg shrink-0 flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`} style={{ animationDuration: '5s' }}>
                <div className="w-4 h-4 rounded-full bg-black/80 border border-white/50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base">{selectedVoice.name}</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    ({selectedVoice.language})
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedVoice.description}
                </p>
              </div>
            </div>

            {/* Quick Reset Sample Script */}
            <button
              type="button"
              onClick={() => setInputText(selectedVoice.sampleText)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reset to default native sentence"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Text Area Input */}
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              placeholder="Type or paste any text in English, Hindi, Odia, Tamil, Bengali, etc..."
              className={`w-full p-4 rounded-2xl border text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
              }`}
            />

            {/* Text Stats */}
            <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400 dark:text-slate-500 font-mono">
              <span>{inputText.length} characters</span>
              <span>Estimated: ~{Math.ceil(inputText.length / 25)}s audio</span>
            </div>
          </div>

          {/* Fine-Tuning Controls: Speed & Emotion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            {/* Speed Slider */}
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Sliders className="w-3.5 h-3.5" />
                <span>Speed: {speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.6"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-28 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Emotion Selector */}
            <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-xs font-bold text-slate-500">Tone:</span>
              <div className="flex items-center gap-1 text-[11px] font-bold">
                {(['warm', 'expressive', 'calm'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setEmotion(t)}
                    className={`px-2 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                      emotion === t
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Action Strip: Big Play Button & Audio Download */}
          <div className="flex items-center justify-between pt-4 gap-4">
            
            {/* Audio Waveform Indicator */}
            <div className="flex items-center gap-1.5">
              {[4, 8, 12, 16, 20, 14, 18, 10, 6, 12, 16, 8].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isPlaying 
                      ? 'bg-emerald-500 animate-pulse' 
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(6, (height * 1.5) % 24)}px` : '6px',
                    animationDelay: `${i * 80}ms`
                  }}
                />
              ))}
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 ml-2">
                {isPlaying ? '24kHz HD Playing' : 'Ready'}
              </span>
            </div>

            {/* Big Action Button (Play / Pause) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlayVoice}
                disabled={isLoading || !inputText.trim()}
                className="px-6 py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Synthesizing...</span>
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Speech</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play Audio</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
