import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  Link,
  Download,
  Languages,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileSpreadsheet,
  Receipt,
  UserCheck,
  Sparkles,
  Phone,
  Clock,
  ExternalLink
} from 'lucide-react';
import { CallInteractionRecord } from './arohiPromptTemplateData';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';

interface InteractionInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  interaction: CallInteractionRecord | null;
  onSyncToCrm?: (interaction: CallInteractionRecord) => void;
  onIssueInvoice?: (interaction: CallInteractionRecord) => void;
}

export default function InteractionInspectorModal({
  isOpen,
  onClose,
  interaction,
  onSyncToCrm,
  onIssueInvoice
}: InteractionInspectorModalProps) {
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [activePlayingIndex, setActivePlayingIndex] = useState<number | null>(null);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showTranslated, setShowTranslated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [syncedCrm, setSyncedCrm] = useState(false);
  const [invoiceIssued, setInvoiceIssued] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up audio on unmount or close
  useEffect(() => {
    return () => {
      stopArohiVoice();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle full audio playback simulation
  useEffect(() => {
    if (isPlayingFull) {
      const fullText = interaction?.transcript.map(t => `${t.speaker === 'agent' ? 'Aarti: ' : 'Divya: '} ${t.text}`).join('. ') || '';
      playArohiVoice(fullText, { voice: 'Zypher', language: 'hi-IN' });
      
      timerRef.current = setInterval(() => {
        setCurrentTimeSec(prev => {
          if (prev >= (interaction?.durationSeconds || 27)) {
            setIsPlayingFull(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingFull, playbackSpeed, interaction]);

  // Early return placed AFTER all hooks
  if (!isOpen || !interaction) return null;

  const handlePlayTurn = (turnText: string, index: number) => {
    if (activePlayingIndex === index) {
      stopArohiVoice();
      setActivePlayingIndex(null);
    } else {
      stopArohiVoice();
      setIsPlayingFull(false);
      setActivePlayingIndex(index);
      playArohiVoice(turnText, { voice: 'Zypher', language: 'hi-IN' });
      setTimeout(() => {
        setActivePlayingIndex(null);
      }, 3500);
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(interaction.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatSec = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Top Header Bar (Arohi breadcrumb & actions) */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">Interaction</span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-white font-mono">
              {interaction.id}
            </span>
            <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {interaction.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyId}
              title="Copy Interaction ID"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowTranslated(!showTranslated)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                showTranslated
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{showTranslated ? 'Viewing English Translation' : 'Translate'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2-Column Main Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-zinc-100 dark:divide-zinc-800">
          
          {/* Left Column: Overview (Structured Entities extracted by AI) */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Overview
              </h3>

              {/* Native Arohi Business OS Integration Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSyncedCrm(true);
                    onSyncToCrm?.(interaction);
                  }}
                  disabled={syncedCrm}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    syncedCrm
                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                      : 'bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900'
                  }`}
                >
                  <UserCheck className="w-3 h-3" />
                  <span>{syncedCrm ? 'Synced to Arohi CRM' : 'Sync to CRM'}</span>
                </button>

                <button
                  onClick={() => {
                    setInvoiceIssued(true);
                    onIssueInvoice?.(interaction);
                  }}
                  disabled={invoiceIssued}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    invoiceIssued
                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Receipt className="w-3 h-3" />
                  <span>{invoiceIssued ? 'Invoice Drafted' : 'Draft GST Bill'}</span>
                </button>
              </div>
            </div>

            {/* Extracted Variables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {Object.entries(interaction.variables).map(([key, value]) => (
                <div key={key} className="space-y-0.5">
                  <div className="text-[11px] font-medium text-zinc-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 break-words">
                    {String(value)}
                  </div>
                </div>
              ))}
            </div>

            {/* Arohi Native ERP Synergy Card */}
            <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Arohi Sovereign Business OS Advantage</span>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Unlike external telephony wrappers, this interaction has mapped directly into your appointment calendar, generated customer Divya Nair's profile, and prepared an indicative ₹500 invoice ready for reception checkout.
              </p>
            </div>
          </div>

          {/* Right Column: Transcript with Turn-by-Turn Audio Playback */}
          <div className="p-6 overflow-y-auto space-y-5 bg-zinc-50/30 dark:bg-zinc-950/30 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Transcript
              </h3>

              {/* Conversation Initiated Marker */}
              <div className="flex items-center justify-center">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-emerald-500" />
                  <span>Conversation Initiated</span>
                </span>
              </div>

              {/* Turns */}
              <div className="space-y-3 pt-2">
                {interaction.transcript.map((turn, idx) => {
                  const isAgent = turn.speaker === 'agent';
                  const isTurnPlaying = activePlayingIndex === idx;

                  return (
                    <div
                      key={idx}
                      className={`flex gap-3 items-start ${isAgent ? 'justify-start' : 'justify-end'}`}
                    >
                      {isAgent && (
                        <button
                          onClick={() => handlePlayTurn(turn.text, idx)}
                          title="Listen to this line"
                          className={`mt-1 p-1.5 rounded-full transition-all cursor-pointer ${
                            isTurnPlaying
                              ? 'bg-blue-600 text-white animate-pulse'
                              : 'bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-500 hover:text-white text-zinc-700 dark:text-zinc-200'
                          }`}
                        >
                          {isTurnPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        </button>
                      )}

                      <div
                        className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                          isAgent
                            ? 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 shadow-xs'
                            : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                        }`}
                      >
                        <p>{showTranslated && turn.translatedText ? turn.translatedText : turn.text}</p>
                        <div className={`text-[9px] flex items-center justify-between ${isAgent ? 'text-zinc-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
                          <span>{isAgent ? 'Aarti (Arohi AI)' : 'Caller'}</span>
                          <span>{turn.timestamp}</span>
                        </div>
                      </div>

                      {!isAgent && (
                        <button
                          onClick={() => handlePlayTurn(turn.text, idx)}
                          title="Listen to caller"
                          className={`mt-1 p-1.5 rounded-full transition-all cursor-pointer ${
                            isTurnPlaying
                              ? 'bg-blue-600 text-white animate-pulse'
                              : 'bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-500 hover:text-white text-zinc-700 dark:text-zinc-200'
                          }`}
                        >
                          {isTurnPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Conversation Ended Marker */}
              <div className="flex items-center justify-center pt-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-red-400" />
                  <span>Conversation Ended</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Audio Player Bar (Arohi audio playback with visual waveform) */}
        <div className="px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isPlayingFull) {
                  stopArohiVoice();
                  setIsPlayingFull(false);
                } else {
                  setIsPlayingFull(true);
                }
              }}
              className="p-2.5 rounded-full bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 transition-all cursor-pointer"
            >
              {isPlayingFull ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            {/* Visual Waveform Simulator */}
            <div className="flex items-center gap-1 h-6">
              {[12, 24, 18, 28, 14, 20, 32, 16, 26, 10, 18, 24, 30, 22, 14, 20, 28, 16, 12, 22, 18, 10].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${isPlayingFull ? Math.min(28, (h * (1 + (i % 3) * 0.2))) : h * 0.4}px` }}
                  className={`w-0.5 rounded-full transition-all duration-150 ${
                    i / 22 <= currentTimeSec / (interaction.durationSeconds || 27)
                      ? 'bg-blue-600 dark:bg-blue-400'
                      : 'bg-zinc-300 dark:bg-zinc-700'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs font-mono text-zinc-500 font-medium">
              {formatSec(currentTimeSec)} / {formatSec(interaction.durationSeconds)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Controller */}
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              className="px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-none cursor-pointer"
            >
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
            </select>

            <button
              onClick={() => {
                const dummyUrl = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
                const a = document.createElement('a');
                a.href = dummyUrl;
                a.download = `Arohi-Call-${interaction.id}.wav`;
                a.click();
              }}
              title="Download Recording"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
