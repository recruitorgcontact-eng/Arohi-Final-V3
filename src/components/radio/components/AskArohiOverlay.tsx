// Arohi Radio - Ask Arohi On-Air Conversational Interruption Modal
// Enables real-time two-way dialogue with RJ Arohi, audio ducking, and resume programme workflow

import React, { useState, useEffect, useRef } from 'react';
import { useRadio } from '../context/RadioContext';
import { AIService } from '../services/AIService';
import { audioEngine } from '../services/AudioEngineService';
import { 
  X, 
  Sparkles, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Play, 
  RotateCcw, 
  Radio, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const AskArohiOverlay: React.FC = () => {
  const {
    isAskArohiOpen,
    closeAskArohi,
    resumeProgramme,
    activeStoryForAskArohi,
    currentChannel,
    preferredLanguage,
    playChannel
  } = useRadio();

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [spokenAnswer, setSpokenAnswer] = useState<string | null>(null);
  const [sourceAttribution, setSourceAttribution] = useState<string | null>(null);
  const [followUps, setFollowUps] = useState<string[]>([]);

  const recognitionRef = useRef<unknown>(null);

  // Suggested contextual prompts based on current broadcast
  const contextualPrompts = [
    activeStoryForAskArohi ? 'What was that story you just mentioned?' : 'What happened in India today?',
    'Explain this in Odia (ଓଡ଼ିଆରେ ବୁଝାନ୍ତୁ)',
    'Give me today’s top business stories',
    'What’s happening in sports?',
    'Tell me about Odisha developments',
    'Play something relaxing'
  ];

  // Initialize Web Speech Recognition if available
  useEffect(() => {
    if (!isAskArohiOpen) {
      setSpokenAnswer(null);
      setInputQuery('');
      setIsListening(false);
      return;
    }

    const SpeechRec = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
                      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (SpeechRec) {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = preferredLanguage === 'or' ? 'or-IN' : preferredLanguage === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
        handleSendQuestion(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [isAskArohiOpen, preferredLanguage]);

  if (!isAskArohiOpen) return null;

  const handleToggleVoice = () => {
    if (!recognitionRef.current) {
      alert('Voice speech recognition is not supported in this browser. Please type your query.');
      return;
    }
    const rec = recognitionRef.current as any;
    if (isListening) {
      rec.stop();
      setIsListening(false);
    } else {
      try {
        rec.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSendQuestion = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    // Handle music shortcut
    if (textToSend.toLowerCase().includes('relaxing') || textToSend.toLowerCase().includes('music')) {
      playChannel('arohi-music');
      closeAskArohi();
      return;
    }

    setIsLoading(true);
    setSpokenAnswer(null);

    const result = await AIService.answerQuestion({
      question: textToSend,
      contextStory: activeStoryForAskArohi || undefined,
      channelId: currentChannel.id,
      language: preferredLanguage
    });

    setIsLoading(false);
    setSpokenAnswer(result.answer);
    setSourceAttribution(result.sourceAttribution || null);
    setFollowUps(result.suggestedFollowUps || []);
    setInputQuery('');

    // Speak response out loud on-air with background ducking
    audioEngine.speakVoice(
      result.spokenAudioText, 
      result.languageUsed,
      () => {},
      () => {}
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-2xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Ask RJ Arohi"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-5 sm:p-7 space-y-6 text-slate-100 overflow-hidden">
        
        {/* Top Radial Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  RJ Arohi On-Air Host
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono text-[9px] uppercase tracking-wider">
                  Live Studio
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Broadcasting on {currentChannel.name} ({currentChannel.frequency})
              </p>
            </div>
          </div>

          <button
            onClick={closeAskArohi}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Broadcast Context Tag */}
        {activeStoryForAskArohi && (
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Story Context:
            </span>
            <p className="text-slate-200 font-medium truncate">
              {activeStoryForAskArohi.headline}
            </p>
          </div>
        )}

        {/* Spoken Response Container */}
        {spokenAnswer && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-violet-950/40 via-indigo-950/30 to-slate-900 border border-violet-500/30 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs text-violet-300 font-mono">
              <span className="flex items-center gap-1.5 font-bold">
                <Volume2 className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                RJ Arohi Spoken Response
              </span>
              {sourceAttribution && (
                <span className="text-[10px] text-slate-400">
                  Source: {sourceAttribution}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-sans whitespace-pre-line">
              {spokenAnswer}
            </p>

            {/* Quick Follow-ups */}
            {followUps.length > 0 && (
              <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                {followUps.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (f.includes('Continue') || f.includes('ଚଲାନ୍ତୁ') || f.includes('जारी रखें')) {
                        resumeProgramme();
                      } else {
                        handleSendQuestion(f);
                      }
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-400">
            <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
            <span>RJ Arohi is researching live broadcast wires...</span>
          </div>
        )}

        {/* Suggested Quick Prompt Chips */}
        {!spokenAnswer && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Suggested Listener Questions:
            </span>
            <div className="flex flex-wrap gap-2">
              {contextualPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendQuestion(prompt)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 hover:border-white/10 transition-all text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar: Voice + Text */}
        <div className="space-y-3">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion();
            }}
            className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-white/10 focus-within:border-violet-500/50 transition-colors"
          >
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-2.5 rounded-xl transition-colors ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              title={isListening ? 'Listening... click to stop' : 'Speak to RJ Arohi'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={isListening ? 'Listening to your voice...' : 'Ask RJ Arohi anything on air...'}
              className="flex-1 bg-transparent px-2 py-1 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-semibold transition-all active:scale-95"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Primary Action: CONTINUE THE PROGRAMME */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500">
              Radio volume is smoothly ducked while speaking.
            </span>
            <button
              onClick={resumeProgramme}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-xs transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
              <span>Continue the Programme</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
