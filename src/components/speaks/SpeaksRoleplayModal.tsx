import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  User, 
  Bot, 
  MapPin, 
  Target, 
  ArrowRight 
} from 'lucide-react';
import { 
  SpeaksRoleplayScenario, 
  SpeaksLanguage 
} from '../../types/speaksTypes';

interface SpeaksRoleplayModalProps {
  scenario: SpeaksRoleplayScenario;
  sourceLanguage: SpeaksLanguage;
  targetLanguage: SpeaksLanguage;
  onClose: () => void;
  isDarkMode?: boolean;
}

interface MessageTurn {
  id: string;
  sender: 'user' | 'ai';
  targetText: string;
  transliteration?: string;
  sourceText?: string;
}

export default function SpeaksRoleplayModal({
  scenario,
  sourceLanguage,
  targetLanguage,
  onClose,
  isDarkMode = true
}: SpeaksRoleplayModalProps) {
  const [messages, setMessages] = useState<MessageTurn[]>([
    {
      id: 'msg-start',
      sender: 'ai',
      targetText: scenario.starterMessage.target,
      transliteration: scenario.starterMessage.transliteration,
      sourceText: scenario.starterMessage.source
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [goals, setGoals] = useState(scenario.goals);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>(scenario.suggestedResponses);

  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLanguage.ttsLocale;
    window.speechSynthesis.speak(utterance);
  };

  // Auto-play starter message
  useEffect(() => {
    const timer = setTimeout(() => {
      speakText(scenario.starterMessage.target);
    }, 500);
    return () => clearTimeout(timer);
  }, [scenario.id]);

  const handleSendSpeech = async (speechText: string) => {
    if (!speechText.trim()) return;

    const userMsg: MessageTurn = {
      id: `user-${Date.now()}`,
      sender: 'user',
      targetText: speechText.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/speaks/roleplay-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: scenario.id,
          systemPrompt: scenario.systemPromptTemplate,
          history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', text: m.targetText })),
          userSpeech: speechText.trim(),
          targetLang: targetLanguage.code,
          sourceLang: sourceLanguage.code
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: MessageTurn = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          targetText: data.replyTarget,
          transliteration: data.replyTransliteration,
          sourceText: data.replySource
        };

        setMessages(prev => [...prev, aiMsg]);
        if (data.suggestedNextReplies && data.suggestedNextReplies.length > 0) {
          setSuggestedReplies(data.suggestedNextReplies);
        }

        // Auto mark first uncompleted goal as progress
        setGoals(prev => {
          const nextGoals = [...prev];
          const firstIncomplete = nextGoals.find(g => !g.completed);
          if (firstIncomplete) {
            firstIncomplete.completed = true;
          }
          return nextGoals;
        });

        // Speak AI response
        speakText(data.replyTarget);
      }
    } catch (err) {
      console.error('Roleplay API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const demo = suggestedReplies[0] || "Hello, I am ready.";
      setInputText(demo);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = targetLanguage.speechRecognitionLocale;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setInputText(transcript);
        handleSendSpeech(transcript);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsRecording(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-3xl h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">{scenario.title}</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {scenario.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI Partner: <strong className="text-slate-300">{scenario.aiPersonaName}</strong> • {scenario.location}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Goals Checklist Ribbon */}
        <div className="px-4 py-2.5 bg-slate-950/40 border-b border-slate-800 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-400">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Scenario Goals:
          </div>
          {goals.map((g) => (
            <div 
              key={g.id}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium transition-all ${
                g.completed
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-bold'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
              }`}
            >
              {g.completed ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              ) : (
                <Circle className="w-3 h-3 text-slate-500" />
              )}
              {g.description}
            </div>
          ))}
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div 
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div 
                className={`max-w-[85%] sm:max-w-md p-4 rounded-2xl shadow-md ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 rounded-br-none font-medium'
                    : 'bg-slate-800/90 border border-slate-700/80 text-white rounded-bl-none'
                }`}
              >
                <div className="text-sm font-semibold leading-relaxed">
                  {m.targetText}
                </div>

                {m.transliteration && (
                  <div className="text-xs text-amber-400/90 font-medium mt-1">
                    🗣️ "{m.transliteration}"
                  </div>
                )}

                {m.sourceText && (
                  <div className="text-[11px] text-slate-400 mt-1 border-t border-slate-700/50 pt-1">
                    {m.sourceText}
                  </div>
                )}

                {m.sender === 'ai' && (
                  <button
                    onClick={() => speakText(m.targetText)}
                    className="mt-2 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" /> Replay Audio
                  </button>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1 shadow-md">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              {scenario.aiPersonaName} is typing...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Replies */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] uppercase font-bold text-slate-500 whitespace-nowrap">Suggested:</span>
          {suggestedReplies.map((r, i) => (
            <button
              key={i}
              onClick={() => handleSendSpeech(r)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 whitespace-nowrap transition-colors flex-shrink-0"
            >
              {r}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center gap-2.5">
          <button
            onClick={startVoice}
            className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-rose-600 text-white ring-4 ring-rose-600/30 animate-pulse'
                : 'bg-orange-500 text-slate-950 hover:brightness-110 shadow-lg'
            }`}
            title="Speak into microphone"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendSpeech(inputText)}
            placeholder={`Speak or type your answer in ${targetLanguage.englishName}...`}
            className="flex-1 px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
          />

          <button
            onClick={() => handleSendSpeech(inputText)}
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-orange-500 text-slate-950 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
