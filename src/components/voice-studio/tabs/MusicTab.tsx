import React, { useState, useRef } from 'react';
import { downloadAudioFile } from '../../../utils/audioExporter';
import { 
  Music, 
  Play, 
  Pause, 
  Download, 
  Sparkles, 
  Wand2, 
  Disc,
  Clock,
  Volume2
} from 'lucide-react';

interface MusicTabProps {
  isDarkMode?: boolean;
}

export const MusicTab: React.FC<MusicTabProps> = ({ isDarkMode = false }) => {
  const [prompt, setPrompt] = useState<string>(
    'A rich orchestral track, deeply cinematic, symphonic strings, brass and woodwinds, an epic Indian fantasy, triumphant, jubilant, crescendo, finale.'
  );
  const [selectedGenre, setSelectedGenre] = useState<string>('cinematic');
  const [duration, setDuration] = useState<string>('30s');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [trackTitle, setTrackTitle] = useState<string>('Epic Symphony Finale');
  const [trackDuration, setTrackDuration] = useState<string>('0:50');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const GENRE_PRESETS = [
    { id: 'cinematic', label: 'Epic Cinematic', prompt: 'A rich orchestral track, deeply cinematic, symphonic strings, brass and woodwinds, an epic Indian fantasy, triumphant crescendo.' },
    { id: 'indian-classical', label: 'Indian Sitar & Tabla', prompt: 'Pure meditative Indian classical morning raga, melodious sitar, gentle acoustic tanpura and soft tabla rhythms.' },
    { id: 'lo-fi', label: 'Lo-Fi Chill Focus', prompt: 'Warm lo-fi hip hop beat, mellow electric piano, subtle vinyl crackle, calm nighttime study focus.' },
    { id: 'flute', label: 'Bansuri Meditation', prompt: 'Soulful Indian bamboo flute (Bansuri), resonant temple bells, gentle river stream ambient soundscape.' },
    { id: 'synthwave', label: 'Cyber Synthwave', prompt: 'Futuristic electronic synthwave, driving analog basslines, neon arpeggiators, retro 80s Indian cyberpunk.' }
  ];

  const handleSelectPreset = (p: typeof GENRE_PRESETS[0]) => {
    setSelectedGenre(p.id);
    setPrompt(p.prompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          genre: selectedGenre,
          duration
        })
      });

      const data = await res.json();
      if (data.success && data.audioUrl) {
        setAudioUrl(data.audioUrl);
        setTrackTitle(data.title || 'Arohi AI Symphony');
        setTrackDuration(data.duration === '60s' ? '1:00' : data.duration === '15s' ? '0:15' : '0:30');
      }
    } catch (err) {
      console.warn('Music generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      downloadAudioFile(audioUrl, `${trackTitle.replace(/\s+/g, '-')}.mp3`);
    }
  };

  return (
    <div className={`rounded-3xl border shadow-xl p-5 sm:p-8 transition-all ${
      isDarkMode ? 'bg-[#0b101b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-orange-500">
            <Music className="w-4 h-4" />
            <span>AI Music &amp; Ambient Soundscapes · Procedural Audio Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            Compose Original Soundtracks &amp; Ragas from Text
          </h2>
        </div>

        {audioUrl && (
          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-600 dark:text-orange-400 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Track .mp3</span>
          </button>
        )}
      </div>

      {/* Preset Pills */}
      <div className="space-y-2 pb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Composition Style Presets:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {GENRE_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedGenre === p.id
                  ? 'bg-orange-600 text-white shadow-md'
                  : isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Card */}
      <div className={`p-6 rounded-3xl border space-y-4 mb-6 ${
        isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <p className="text-sm sm:text-base italic text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
          "{prompt}"
        </p>

        {/* Generated Track Disc Player */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {/* Spinning Amber Disc */}
            <div className={`w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 p-0.5 shadow-md flex items-center justify-center shrink-0 ${
              isPlaying ? 'animate-spin' : ''
            }`} style={{ animationDuration: '4s' }}>
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-white/60"></div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {trackTitle}
              </h4>
              <span className="text-xs font-mono text-slate-400">
                {trackDuration} · Stereo 44.1kHz
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              disabled={!audioUrl && !isGenerating}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                isPlaying
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:scale-105'
              }`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Compose Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500">Duration:</span>
          {(['15s', '30s', '60s'] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                duration === d
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Composing Soundtrack...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate Audio</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
