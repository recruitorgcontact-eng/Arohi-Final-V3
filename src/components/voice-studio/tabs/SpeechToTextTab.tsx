import React, { useState, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Upload, 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Globe,
  Clock
} from 'lucide-react';

interface SpeechToTextTabProps {
  isDarkMode?: boolean;
}

export const SpeechToTextTab: React.FC<SpeechToTextTabProps> = ({ isDarkMode = false }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>(
    "Namaskar! Kal Odia Bhasa Samilani re amara notun artificial intelligence project launch heba. Sobu block level re citizen services direct voice call re access kari paribe."
  );

  const [languageDetected, setLanguageDetected] = useState<string>('Odia / Indian English (Code-Mixed)');
  const timerRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        setIsTranscribing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          try {
            const res = await fetch('/api/transcribe-audio', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64: base64, mimeType: 'audio/webm' })
            });
            const data = await res.json();
            if (data.success && data.transcript) {
              setTranscript(data.transcript);
              setLanguageDetected(data.detectedLanguage || 'Indic Vernacular Detected');
            }
          } catch (e) {
            console.warn('Transcription error:', e);
          } finally {
            setIsTranscribing(false);
          }
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Mic error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Arohi-Transcription.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`rounded-3xl border shadow-xl p-5 sm:p-8 transition-all ${
      isDarkMode ? 'bg-[#0b101b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-cyan-500">
            <Globe className="w-4 h-4" />
            <span>Speech to Text · 11+ Indian Languages &amp; Code-Switching</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            Transcribe Real Spoken Audio into Pristine Text
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .txt</span>
          </button>
        </div>
      </div>

      {/* Record or Upload Minimalist Box */}
      <div className={`rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all ${
        isRecording 
          ? 'border-red-500 bg-red-500/5' 
          : isDarkMode 
            ? 'border-slate-800 bg-slate-900/40' 
            : 'border-slate-200 bg-slate-50'
      }`}>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">
          Record or upload to test Arohi’s most accurate Indian speech transcription models
        </p>

        <div className="flex items-center justify-center gap-4">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center cursor-pointer"
              title="Click to Record"
            >
              <Mic className="w-6 h-6" />
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="w-14 h-14 rounded-full bg-red-600 text-white hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center cursor-pointer animate-pulse"
              title="Click to Stop"
            >
              <Square className="w-5 h-5 fill-current" />
            </button>
          )}

          <label className="w-14 h-14 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all shadow flex items-center justify-center cursor-pointer">
            <Upload className="w-5 h-5" />
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setIsTranscribing(true);
                  const reader = new FileReader();
                  reader.onloadend = async () => {
                    const base64 = (reader.result as string).split(',')[1];
                    try {
                      const res = await fetch('/api/transcribe-audio', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ audioBase64: base64, mimeType: file.type || 'audio/webm' })
                      });
                      const d = await res.json();
                      if (d.transcript) setTranscript(d.transcript);
                    } finally {
                      setIsTranscribing(false);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>

        {isRecording && (
          <p className="mt-4 text-xs font-mono font-bold text-red-500 animate-pulse">
            Recording in progress... {recordingSeconds}s
          </p>
        )}
      </div>

      {/* Transcription Results */}
      <div className="pt-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span>TRANSCRIPT OUTPUT</span>
          </div>
          <span className="font-mono text-cyan-600 dark:text-cyan-400">
            {languageDetected}
          </span>
        </div>

        <div className={`p-4 rounded-2xl border text-sm sm:text-base leading-relaxed ${
          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          {isTranscribing ? (
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Processing speech acoustics and tokenizing Indian phonemes...</span>
            </div>
          ) : (
            <p>{transcript}</p>
          )}
        </div>
      </div>

    </div>
  );
};
