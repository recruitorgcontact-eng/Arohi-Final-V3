import React, { useState, useEffect } from 'react';
import {
  Languages,
  X,
  Volume2,
  VolumeX,
  Check,
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';

interface GenieTranslationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  greetingText: string;
  recommendedVoice: string;
  onApplyTranslation: (translatedText: string, languageName: string) => void;
}

interface LanguageVariant {
  code: string;
  name: string;
  nativeName: string;
  text: string;
  voice: string;
}

export default function GenieTranslationsModal({
  isOpen,
  onClose,
  greetingText,
  recommendedVoice,
  onApplyTranslation
}: GenieTranslationsModalProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [variants, setVariants] = useState<LanguageVariant[]>([]);
  const [playingCode, setPlayingCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopArohiVoice();
      setPlayingCode(null);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const fetchTranslations = async () => {
      try {
        const res = await fetch('/api/voice-genie/translate-greeting', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            greeting: greetingText,
            targetLanguages: ['Hindi', 'Odia', 'Indian English', 'Bengali', 'Tamil', 'Telugu']
          })
        });
        const data = await res.json();
        if (isMounted && data.translations && data.translations.length > 0) {
          setVariants(data.translations);
        } else {
          throw new Error('No translations received');
        }
      } catch (err) {
        console.warn('Using local translated fallback:', err);
        if (isMounted) {
          setVariants([
            {
              code: 'hi',
              name: 'Hindi',
              nativeName: 'हिंदी',
              text: `नमस्ते! मैं आरोग्य सेवा केंद्र से आरती बोल रही हूँ। मैं आपकी क्या सहायता कर सकती हूँ?`,
              voice: 'Zypher'
            },
            {
              code: 'or',
              name: 'Odia',
              nativeName: 'ଓଡ଼ିଆ',
              text: `ନମସ୍କାର! ମୁଁ ଆରୋହୀ ଏଣ୍ଟରପ୍ରାଇଜ୍ ରୁ ଆରତୀ କହୁଛି। ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?`,
              voice: 'Aoede'
            },
            {
              code: 'hinglish',
              name: 'Hinglish',
              nativeName: 'हिंग्लिश',
              text: greetingText,
              voice: recommendedVoice || 'Zypher'
            },
            {
              code: 'en-in',
              name: 'Indian English',
              nativeName: 'English (India)',
              text: `Hello! Thank you for calling. This is Aarti. How may I assist you today?`,
              voice: 'Fenrir'
            },
            {
              code: 'bn',
              name: 'Bengali',
              nativeName: 'বাংলা',
              text: `নমস্কার! আমি আরোহী থেকে আরতি বলছি। আমি আপনাকে কিভাবে সাহায্য করতে পারি?`,
              voice: 'Aoede'
            }
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTranslations();

    return () => {
      isMounted = false;
      stopArohiVoice();
    };
  }, [isOpen, greetingText, recommendedVoice]);

  const handleAudition = (v: LanguageVariant) => {
    if (playingCode === v.code) {
      stopArohiVoice();
      setPlayingCode(null);
      return;
    }

    stopArohiVoice();
    setPlayingCode(v.code);

    playArohiVoice(v.text, {
      voice: v.voice || recommendedVoice || 'Zypher',
      onEnd: () => setPlayingCode(null)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span>Multilingual Spoken Greeting Engine</span>
                <span className="px-2 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                  150+ Vernacular
                </span>
              </h3>
              <p className="text-[11px] text-zinc-500">
                Audition live dialect pronunciations and apply directly to your agent
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopArohiVoice();
              onClose();
            }}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Translation List */}
        {loading ? (
          <div className="py-12 text-center space-y-3">
            <RefreshCw className="w-7 h-7 text-blue-500 animate-spin mx-auto" />
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Generating native vernacular translations via Arohi AI...
            </p>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            {variants.map((v) => {
              const isPlaying = playingCode === v.code;

              return (
                <div
                  key={v.code}
                  className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/70 space-y-2.5 hover:border-zinc-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-900 dark:text-white">
                        {v.name}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-medium">
                        ({v.nativeName})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Audition Button */}
                      <button
                        onClick={() => handleAudition(v)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          isPlaying
                            ? 'bg-rose-500 text-white animate-pulse'
                            : 'bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <VolumeX className="w-3 h-3" />
                            <span>Speaking...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            <span>Audition</span>
                          </>
                        )}
                      </button>

                      {/* Apply button */}
                      <button
                        onClick={() => {
                          stopArohiVoice();
                          onApplyTranslation(v.text, v.name);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>Use This</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif bg-white/70 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.04]">
                    "{v.text}"
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={() => {
              stopArohiVoice();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
