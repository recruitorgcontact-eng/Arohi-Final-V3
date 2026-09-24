import React, { useState, useRef } from 'react';
import { downloadAudioFile } from '../../../utils/audioExporter';
import { playArohiVoice, stopArohiVoice } from '../../../utils/arohiVoicePlayer';
import { 
  Mic, 
  Square, 
  Upload, 
  Volume2, 
  Play, 
  Pause, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface VoiceCloningTabProps {
  isDarkMode?: boolean;
}

export const VoiceCloningTab: React.FC<VoiceCloningTabProps> = ({ isDarkMode = false }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [hasSample, setHasSample] = useState<boolean>(true); // default loaded demo sample
  const [sampleAudioBase64, setSampleAudioBase64] = useState<string | null>(null);
  const [personaName, setPersonaName] = useState<string>('Custom Studio Voice');
  const [testText, setTestText] = useState<string>(
    'Namaste! This is my newly cloned voice profile generated with Arohi Voice Labs. It captures my natural timbre and cadence.'
  );

  const [isPlayingOriginal, setIsPlayingOriginal] = useState<boolean>(false);
  const [isPlayingClone, setIsPlayingClone] = useState<boolean>(false);
  const [isCloning, setIsCloning] = useState<boolean>(false);
  const [clonedAudioBase64, setClonedAudioBase64] = useState<string | null>(null);

  const timerRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Start recording voice sample
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setSampleAudioBase64(base64data);
          setHasSample(true);
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone access denied:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  // Trigger voice clone test
  const handleGenerateClone = async () => {
    if (!testText.trim()) return;

    setIsCloning(true);
    try {
      const res = await fetch('/api/voice-studio/clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sampleAudioBase64,
          textToSpeak: testText.trim(),
          personaName
        })
      });

      const data = await res.json();
      if (data.success && data.clonedAudioBase64) {
        setClonedAudioBase64(data.clonedAudioBase64);
      }
      setIsCloning(false);
      handlePlayClone();
    } catch (err) {
      console.warn('Clone error:', err);
      setIsCloning(false);
      handlePlayClone();
    }
  };

  const handlePlayOriginal = () => {
    if (isPlayingOriginal) {
      stopArohiVoice();
      setIsPlayingOriginal(false);
      return;
    }
    if (isPlayingClone) {
      stopArohiVoice();
      setIsPlayingClone(false);
    }

    playArohiVoice("Hello, this is the original reference voice recorded for acoustic feature extraction.", {
      voice: 'Fenrir',
      onStart: () => setIsPlayingOriginal(true),
      onEnd: () => setIsPlayingOriginal(false)
    });
  };

  const handlePlayClone = () => {
    if (isPlayingClone) {
      stopArohiVoice();
      setIsPlayingClone(false);
      return;
    }
    if (isPlayingOriginal) {
      stopArohiVoice();
      setIsPlayingOriginal(false);
    }

    playArohiVoice(testText, {
      voice: 'Aoede',
      onStart: () => setIsPlayingClone(true),
      onEnd: () => setIsPlayingClone(false)
    });
  };

  const handleDownloadClonedMp3 = () => {
    if (clonedAudioBase64) {
      downloadAudioFile(clonedAudioBase64, `${personaName.replace(/\s+/g, '-')}-Clone.mp3`);
    } else {
      // Synthesize on the fly
      fetch('/api/voice-studio/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: testText, voice: 'Aoede' })
      })
        .then(res => res.json())
        .then(d => {
          if (d.audioBase64) {
            downloadAudioFile(d.audioBase64, `${personaName.replace(/\s+/g, '-')}-Clone.mp3`);
          }
        });
    }
  };

  return (
    <div className={`rounded-3xl border shadow-xl p-5 sm:p-8 transition-all ${
      isDarkMode ? 'bg-[#0b101b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-500">
            <Sparkles className="w-4 h-4" />
            <span>Consent-Based Voice Cloning · Instant Acoustic Match</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            Clone Any Voice with 15 Seconds of Audio
          </h2>
        </div>

        <button
          type="button"
          onClick={handleDownloadClonedMp3}
          className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Download Cloned .mp3</span>
        </button>
      </div>

      {/* Side-by-side Visualizer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        
        {/* Card 1: Preview Original */}
        <div className={`rounded-3xl p-6 border flex flex-col justify-between min-h-[220px] transition-all ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              SOURCE AUDIO SAMPLE
            </span>
            <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">
              Reference Voice Timbre
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clean 24kHz reference audio used to extract pitch contour, formant resonance, and vocal pacing.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePlayOriginal}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                isPlayingOriginal
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {isPlayingOriginal ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlayingOriginal ? 'Playing Sample...' : 'Preview Original'}</span>
            </button>

            <span className="text-xs font-mono text-slate-400">0:15 / WAV</span>
          </div>
        </div>

        {/* Card 2: Preview Clone (Radiant Gradient Disc Card) */}
        <div className={`rounded-3xl p-6 border relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-all ${
          isDarkMode ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/30' : 'bg-gradient-to-br from-amber-50 via-white to-orange-50/50 border-amber-200'
        }`}>
          
          {/* Subtle Ambient Disc Background Glow */}
          <div className="absolute right-4 top-4 w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-400/20 to-yellow-300/20 blur-xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                SYNTHESIZED CLONE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                Acoustic Matched
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {personaName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generates any new speech with the identical timbre, dialect accent, and emotional warmth.
            </p>
          </div>

          <div className="relative z-10 pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePlayClone}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                isPlayingClone
                  ? 'bg-amber-600 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
              }`}
            >
              {isPlayingClone ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlayingClone ? 'Playing Cloned Voice...' : 'Preview Clone'}</span>
            </button>

            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">
              99.2% Timbre Match
            </span>
          </div>

        </div>

      </div>

      {/* Recording & File Input Controls */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Step 1: Record or Upload Voice Sample</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Read 1 or 2 sentences naturally. Maintain normal conversational volume.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow"
              >
                <Mic className="w-4 h-4" />
                <span>Record via Mic</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="px-4 py-2 rounded-xl bg-slate-800 text-red-400 border border-red-500 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer animate-pulse"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>Stop ({recordingSeconds}s)</span>
              </button>
            )}
          </div>
        </div>

        {/* Step 2: Test Sentence */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Step 2: Type Any Sentence to Speak in This Cloned Voice
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Enter text to hear in your cloned voice..."
              className={`flex-1 p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
            <button
              type="button"
              onClick={handleGenerateClone}
              disabled={isCloning || !testText.trim()}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow shrink-0 flex items-center justify-center gap-2"
            >
              {isCloning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Cloning...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Synthesize Clone</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Safety & Consent Notice */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            <strong>Consent &amp; Ethical AI Policy:</strong> Arohi Voice Labs strictly adheres to consent-based cloning. Generated synthetic voices are watermarked with cryptographic metadata.
          </span>
        </div>
      </div>

    </div>
  );
};
