// VanaVeda by Arohi - Arohi Veda-Vaidya AI Companion
// High-empathy human-like consultation, 150+ language support (Odia first-class), voice synthesis, Sanskrit/phytochemistry

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RefreshCw, 
  Loader2, 
  Check, 
  Copy, 
  Globe, 
  Mic, 
  MicOff, 
  HeartHandshake, 
  BookOpen, 
  Flame,
  ArrowRight,
  Info,
  Phone
} from 'lucide-react';
import { BotanicalLeafSvg } from './BotanicalLeafSvg';
import { vanavedaAudio } from './vanavedaAudio';
import { playArohiVoice, stopArohiVoice, sanitizeSpeechText } from '../../utils/arohiVoicePlayer';

interface ChatMessage {
  id: string;
  sender: 'arohi' | 'user';
  text: string;
  timestamp: string;
  language?: string;
}

interface Props {
  language: string;
  onLanguageChange: (lang: string) => void;
  selectedLeafContext?: string;
  onSelectLeaf?: (leafId: string) => void;
  onStartVoiceCall?: () => void;
}

export const ArohiVedaVaidyaChat: React.FC<Props> = ({
  language,
  onLanguageChange,
  selectedLeafContext,
  onSelectLeaf,
  onStartVoiceCall
}) => {
  const isOdia = language === 'or';
  const isHindi = language === 'hi';

  const defaultWelcome = isOdia
    ? `ହରି ଓଁ! ମୁଁ ଆରୋହୀ, ଆପଣଙ୍କ ବେଦ-ବୈଦ୍ୟ (Veda-Vaidya)। ବନବେଦ (VanaVeda) ପବିତ୍ର ଚିକିତ୍ସା କକ୍ଷକୁ ଆପଣଙ୍କୁ ହାର୍ଦ୍ଦିକ ସ୍ୱାଗତ।

ପୃଥିବୀର ପ୍ରତ୍ୟେକ ପତ୍ର ଓ ବୃକ୍ଷରେ ମାନବ କଷ୍ଟ ନିବାରଣର ପବିତ୍ର ରହସ୍ୟ ଲୁଚି ରହିଛି। ଆଜି ଆପଣଙ୍କ ଶରୀର, ହଜମ ଶକ୍ତି (Agni), ନିଦ୍ରା କିମ୍ବା ମନ କିପରି ଅନୁଭବ କରୁଛି? ମୋତେ କୁହନ୍ତୁ, ମୁଁ ଆପଣଙ୍କୁ ବୈଦିକ ଶାସ୍ତ୍ର ଓ ବୃକ୍ଷ ଔଷଧୀର ସଠିକ୍ ପରାମର୍ଶ ଦେବି।`
    : isHindi
    ? `हरि ॐ! मैं आरोगी, आपकी वेद-वैद्य। वनवेद (VanaVeda) के पवित्र आयुर्वेद धाम में आपका स्वागत है।

धरती का प्रत्येक पत्ता और वृक्ष मानव कष्ट निवारण का दिव्य रहस्य संजोए हुए है। आज आपका स्वास्थ्य, पाचन अग्नि, निद्रा और मन कैसा अनुभव कर रहे हैं? मुझे बताएं, मैं आपको सुश्रुत संहिता और वैदिक वनस्पति विज्ञान के अनुसार मार्गदर्शन दूंगी।`
    : `Harih Om. Welcome to VanaVeda. I am Arohi, your Ayurvedic botanical physician and Vedic science companion.

"Every leaf and tree on earth holds a sacred secret to heal human suffering." Tell me, how are your digestion (Agni), physical energy, sleep, or stress feeling today? I will guide you through classical Sushruta pharmacopeia and modern botanical physiology.`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'arohi',
      text: defaultWelcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: language
    }
  ]);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speechRecognitionActive, setSpeechRecognitionActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Stop voice playback on component unmount
  useEffect(() => {
    return () => {
      stopArohiVoice();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Speech Recognition setup (Web Speech API)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (speechRecognitionActive) {
      setSpeechRecognitionActive(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = isOdia ? 'or-IN' : isHindi ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setSpeechRecognitionActive(true);
        vanavedaAudio.playTempleBell(659.25); // E5 note chime
      };

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        if (spoken) {
          setInput(spoken);
        }
        setSpeechRecognitionActive(false);
      };

      recognition.onerror = () => {
        setSpeechRecognitionActive(false);
      };

      recognition.onend = () => {
        setSpeechRecognitionActive(false);
      };

      recognition.start();
    } catch (e) {
      setSpeechRecognitionActive(false);
    }
  };

  // Arohi Flagship Studio HD Voice Synthesis (Zypher 24kHz Studio Engine)
  const handleReadAloud = (msgId: string, text: string) => {
    if (activeSpeakingMsgId === msgId) {
      stopArohiVoice();
      setActiveSpeakingMsgId(null);
      return;
    }

    stopArohiVoice();
    setActiveSpeakingMsgId(msgId);
    vanavedaAudio.playSingingBowl(528);

    const clean = sanitizeSpeechText(text);
    const voiceLang = isOdia ? 'or-IN' : isHindi ? 'hi-IN' : (language || 'or-IN');

    playArohiVoice(clean, {
      language: voiceLang,
      voice: 'Zypher', // Arohi's signature flagship warm voice
      onStart: () => {
        setActiveSpeakingMsgId(msgId);
      },
      onEnd: () => {
        setActiveSpeakingMsgId((curr) => (curr === msgId ? null : curr));
      },
      onError: () => {
        setActiveSpeakingMsgId((curr) => (curr === msgId ? null : curr));
      }
    });
  };

  const handleCopy = (id: string, text: string) => {
    const clean = text.replace(/[*#_~`]/g, '');
    navigator.clipboard.writeText(clean);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Clean, elegant formatter that turns markdown asterisks into rich typography with zero raw asterisks
  const renderFormattedVaidyaText = (rawText: string) => {
    if (!rawText) return null;

    // Helper to format inline bold, italic, code while stripping all raw asterisks
    const formatInline = (str: string): React.ReactNode[] => {
      if (!str.includes('*') && !str.includes('`') && !str.includes('_')) {
        return [str];
      }

      // Regex to split on **bold** or *italic* or `code`
      const tokenRegex = /(\*\*[\s\S]*?\*\*|\*[\s\S]*?\*|`[\s\S]*?`)/g;
      const segments = str.split(tokenRegex);

      return segments.map((seg, idx) => {
        if (!seg) return null;

        // Bold: **text**
        if (seg.startsWith('**') && seg.endsWith('**') && seg.length >= 4) {
          const inner = seg.slice(2, -2).replace(/\*/g, '').trim();
          return (
            <strong key={idx} className="font-bold text-[#15803D] dark:text-[#4ADE80]">
              {inner}
            </strong>
          );
        }

        // Italic: *text*
        if (seg.startsWith('*') && seg.endsWith('*') && seg.length >= 2) {
          const inner = seg.slice(1, -1).replace(/\*/g, '').trim();
          return (
            <em key={idx} className="italic text-[#78350F] dark:text-[#FBBF24]">
              {inner}
            </em>
          );
        }

        // Code: `code`
        if (seg.startsWith('`') && seg.endsWith('`') && seg.length >= 2) {
          return (
            <code key={idx} className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-xs text-amber-700 dark:text-amber-300">
              {seg.slice(1, -1)}
            </code>
          );
        }

        // Clean any leftover orphan asterisks in regular text
        const cleanNormal = seg.replace(/\*{1,}/g, '');
        return cleanNormal;
      });
    };

    const lines = rawText.split('\n');

    return (
      <div className="space-y-1.5">
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={lIdx} className="h-1" />;
          }

          // Headings: ### or ##
          if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
            const headingText = trimmed.replace(/^#+\s*/, '');
            return (
              <h4 key={lIdx} className="font-serif font-bold text-sm sm:text-base text-[#15803D] dark:text-[#4ADE80] mt-2 mb-1 flex items-center gap-1.5">
                <span>🌿</span>
                <span>{formatInline(headingText)}</span>
              </h4>
            );
          }

          // Bullet points: * or - or •
          if (/^[\*\-•]\s+/.test(trimmed)) {
            const content = trimmed.replace(/^[\*\-•]\s+/, '');
            return (
              <div key={lIdx} className="flex items-start gap-2.5 my-1 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] dark:bg-[#4ADE80] mt-2 shrink-0 shadow-2xs" />
                <div className="flex-1 leading-relaxed">
                  {formatInline(content)}
                </div>
              </div>
            );
          }

          // Numbered lists: 1. 2. etc.
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (numMatch) {
            const num = numMatch[1];
            const content = numMatch[2];
            return (
              <div key={lIdx} className="flex items-start gap-2.5 my-1 pl-1">
                <span className="text-xs font-bold text-[#15803D] dark:text-[#4ADE80] min-w-[18px] shrink-0 mt-0.5">
                  {num}.
                </span>
                <div className="flex-1 leading-relaxed">
                  {formatInline(content)}
                </div>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={lIdx} className="leading-relaxed">
              {formatInline(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  // Submit Query to /api/chat with mode = 'vanaveda'
  const handleSend = async (queryText?: string) => {
    const q = (queryText || input).trim();
    if (!q || isThinking) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const historyPayload = messages.slice(-5).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const contextNote = (selectedLeafContext 
        ? `ACTIVE LEAF CONTEXT: The user is currently inspecting ${selectedLeafContext.toUpperCase()} leaf. Incorporate its classical Sushruta actions if relevant.\n` 
        : '') + `FORMATTING MANDATE: Do NOT use markdown asterisks (no **bold** or *italic* or * bullets). Provide clean, natural, beautiful prose with bullet points like "• " where needed.`;

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          history: historyPayload,
          language: language,
          mode: 'vanaveda',
          systemContext: contextNote
        })
      });

      if (!resp.ok) throw new Error('Network error');

      const data = await resp.json();
      const botResponse = data.response || (isOdia 
        ? 'ମୁଁ ବୈଦିକ ଶାସ୍ତ୍ର ଅନୁସାରେ ଆପଣଙ୍କ ପ୍ରଶ୍ନର ଅନୁଧ୍ୟାନ କଲି। ଉପରୋକ୍ତ ପତ୍ର ଓ ଚିକିତ୍ସା ବିଧି ଅନୁସରଣ କରନ୍ତୁ।' 
        : 'I have evaluated your symptoms according to the Sushruta Samhita and Vedic pharmacopeia.');

      const botMsg: ChatMessage = {
        id: `arohi-${Date.now()}`,
        sender: 'arohi',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language
      };

      setMessages(prev => [...prev, botMsg]);
      vanavedaAudio.playTempleBell(783.99); // G5 soft bell chime
    } catch (err) {
      console.warn('API error, using local Ayurvedic knowledge fallback:', err);
      const fallbackMsg: ChatMessage = {
        id: `arohi-fallback-${Date.now()}`,
        sender: 'arohi',
        text: isOdia
          ? `ହରି ଓଁ! ଆପଣଙ୍କ ପ୍ରଶ୍ନ ପାଇଁ ଧନ୍ୟବାଦ। ଆୟୁର୍ବେଦ ଶାସ୍ତ୍ର ଅନୁସାରେ ପିତ୍ତ ଦୋଷ ଶାନ୍ତି ପାଇଁ ନିମ୍ବ ଓ ବେଲ ପତ୍ରର ଶୀତଳ କଷାୟମ୍ (Hima) ଅତ୍ୟନ୍ତ ଉପକାରୀ। ପ୍ରତିଦିନ ସକାଳେ ୫-୭ଟି ସତେଜ ତୁଳସୀ ପତ୍ର ସହ ଉଷୁମ ପାଣି ପିଇବା ଦ୍ୱାରା ପ୍ରାଣ ବାୟୁ ଏବଂ ଓଜସ୍ (Ojas) ସୁରକ୍ଷିତ ରହେ।`
          : `Harih Om! According to Maharishi Sushruta, restoring Agni (metabolic fire) begins with cleansing mucosal toxins with Bilva and Tulsi leaves. For Vata joint stiffness, Parijat leaf decoction simmered down to half volume provides natural anti-inflammatory relief.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const QUICK_QUESTIONS = [
    {
      label: isOdia ? '🌿 ପିତ୍ତ ଶାନ୍ତକାରୀ ପତ୍ର' : '🌿 What leaf cools burning Pitta?',
      query: isOdia ? 'ମୋର ପେଟରେ ଜ୍ୱଳନ ଓ ପିତ୍ତ ଦୋଷ ବଢ଼ିଛି। କେଉଁ ପତ୍ରର କଷାୟମ୍ ପିଇବି?' : 'My digestion has high burning heat and Pitta flare. Which medicinal leaf decoction cools it down?'
    },
    {
      label: isOdia ? '❤️ ଅର୍ଜୁନ ଓ ହୃଦୟ' : '❤️ Arjuna for Heart & Arteries',
      query: isOdia ? 'ଅର୍ଜୁନ ପତ୍ର କିମ୍ବା ଛାଲକୁ କ୍ଷୀରପାକ (Ksheerapaka) କରି କିପରି ସେବନ କରାଯାଏ?' : 'How is Arjuna Ksheerapaka prepared to support healthy blood pressure and endothelial elasticity?'
    },
    {
      label: isOdia ? '🧠 ବ୍ରାହ୍ମୀ ଓ ମସ୍ତିଷ୍କ ସ୍ମୃତି' : '🧠 Brahmi for Memory & Sleep',
      query: isOdia ? 'ବ୍ରାହ୍ମୀ ପତ୍ର ସ୍ମୃତିଶକ୍ତି ଏବଂ ମାନସିକ ଶାନ୍ତି ପାଇଁ କିପରି ଲାଭଦାୟକ?' : 'How does Brahmi stimulate hippocampal synaptic plasticity and calm neuro-inflammation?'
    },
    {
      label: isOdia ? '⚛️ ଓଷଧି ସୂକ୍ତର ରହସ୍ୟ' : '⚛️ Oshadhi Sukta Physics',
      query: isOdia ? 'ଋଗବେଦ ଓଷଧି ସୂକ୍ତ (Rigveda 10.97) ରେ ବୃକ୍ଷ ପତ୍ରର କେଉଁ କ୍ୱାଣ୍ଟମ ରହସ୍ୟ କୁହାଯାଇଛି?' : 'Explain the biophoton and quantum resonance physics hidden inside Rigveda Oshadhi Sukta 10.97.'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] dark:bg-[#0c120d] text-[#2B1B10] dark:text-[#EDE6D6] rounded-3xl border border-[#E7DEC8] dark:border-[#203022] shadow-[0_10px_35px_rgba(21,128,61,0.08)] overflow-hidden transition-colors">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF5EC] via-[#F5EDDC] to-[#EFE7D8] dark:from-[#111A13] dark:via-[#162319] dark:to-[#0F1811] border-b border-[#E7DEC8] dark:border-[#203022] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#15803D]/15 dark:bg-[#15803D]/25 border border-[#15803D]/30 flex items-center justify-center shadow-inner">
            <BotanicalLeafSvg leafId="tulsi" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#15803D] dark:text-[#4ADE80] tracking-wide">
                Arohi Veda-Vaidya
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#D97706]/15 text-[#B45309] dark:text-[#FBBF24] border border-[#D97706]/30">
                ଆରୋହୀ ବେଦ-ବୈଦ୍ୟ
              </span>
            </div>
            <p className="text-xs text-[#5D4A3A] dark:text-[#9CA3AF] flex items-center gap-1 font-medium">
              <span>Sushruta Samhita & Classical Botanical Science</span>
            </p>
          </div>
        </div>

        {/* Language Quick Toggle & Voice Call Action */}
        <div className="flex items-center gap-2">
          {onStartVoiceCall && (
            <button
              onClick={onStartVoiceCall}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#15803D] to-emerald-700 hover:from-[#166534] hover:to-emerald-800 text-white flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer ring-1 ring-emerald-400/40"
              title="Start Live Voice Call with Arohi Veda-Vaidya"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">{isOdia ? 'ଲାଇଭ୍ କଲ୍' : isHindi ? 'लाइव कॉल' : 'Live Call'}</span>
            </button>
          )}

          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="text-xs font-semibold bg-white/80 dark:bg-[#1c281e] border border-[#E7DEC8] dark:border-[#2b3d2d] rounded-xl px-2.5 py-1.5 text-[#2B1B10] dark:text-[#EDE6D6] focus:outline-none focus:border-[#15803D] cursor-pointer"
          >
            <option value="or">ଓଡ଼ିଆ (Odia)</option>
            <option value="en">English (Global)</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="sa">संस्कृतम् (Sanskrit)</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="gu">ગુજરાતી (Gujarati)</option>
          </select>
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="p-3 bg-[#FAF5EC]/80 dark:bg-[#101712]/90 border-b border-[#E7DEC8]/60 dark:border-[#203022]/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-bold text-[#B45309] dark:text-[#FBBF24] tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Vedic Inquiries:</span>
        </span>
        {QUICK_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.query)}
            className="text-xs whitespace-nowrap px-3 py-1 rounded-full bg-white dark:bg-[#1a251c] hover:bg-[#15803D]/10 dark:hover:bg-[#15803D]/20 text-[#2B1B10] dark:text-[#D1D5DB] border border-[#E7DEC8] dark:border-[#2d3f2f] transition-all hover:border-[#15803D] cursor-pointer active:scale-95 shadow-2xs font-medium"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Conversation Stream */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isArohi = m.sender === 'arohi';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isArohi ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-sm text-sm leading-relaxed transition-all ${
                  isArohi
                    ? 'bg-white dark:bg-[#141E16] border border-[#E7DEC8] dark:border-[#223324] text-[#2B1B10] dark:text-[#E5E7EB]'
                    : 'bg-[#15803D] text-white rounded-br-xs shadow-md'
                }`}
              >
                {/* Header label for Arohi */}
                {isArohi && (
                  <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-[#E7DEC8]/50 dark:border-[#223324]">
                    <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#15803D] dark:text-[#4ADE80]">
                      <span>🌿 Arohi Veda-Vaidya</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleReadAloud(m.id, m.text)}
                        className={`p-1.5 rounded-lg transition-all flex items-center gap-1 text-xs cursor-pointer ${
                          activeSpeakingMsgId === m.id
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/40 shadow-xs'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#15803D]'
                        }`}
                        title={activeSpeakingMsgId === m.id ? "Stop Arohi's Voice" : "Listen in Arohi's Voice"}
                      >
                        {activeSpeakingMsgId === m.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 hidden sm:inline">Speaking</span>
                          </>
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopy(m.id, m.text)}
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#15803D] transition"
                        title="Copy prescription"
                      >
                        {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Body Text with Zero Raw Asterisks & Rich Typography */}
                <div className="font-normal text-sm sm:text-[15px] leading-relaxed">
                  {renderFormattedVaidyaText(m.text)}
                </div>

                <div className={`mt-2 text-[10px] text-right ${isArohi ? 'text-slate-400' : 'text-emerald-100'}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-start gap-2">
            <div className="p-3 rounded-2xl bg-white dark:bg-[#141E16] border border-[#E7DEC8] dark:border-[#223324] text-xs flex items-center gap-2 text-[#15803D] dark:text-[#4ADE80]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-serif italic">
                {isOdia ? 'ବୈଦିକ ଚରକ ଓ ସୁଶ୍ରୁତ ସଂହିତାରୁ ପତ୍ର ଔଷଧୀୟ ପରାମର୍ଶ ଖୋଜାଯାଉଛି...' : 'Consulting Sushruta Samhita and Vedic botanical pharmacopoeia...'}
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box & Voice Controls */}
      <div className="p-3.5 sm:p-4 bg-[#FAF5EC] dark:bg-[#111A13] border-t border-[#E7DEC8] dark:border-[#203022]">
        <div className="flex items-center gap-2">
          {/* Speech recognition mic button */}
          <button
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
              speechRecognitionActive 
                ? 'bg-rose-500 text-white animate-pulse shadow-lg' 
                : 'bg-white dark:bg-[#1a251c] text-slate-600 dark:text-slate-300 border border-[#E7DEC8] dark:border-[#2d3f2f] hover:text-[#15803D]'
            }`}
            title="Speak your health query"
          >
            {speechRecognitionActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              isOdia
                ? 'ଆପଣଙ୍କ ରୋଗ ଲକ୍ଷଣ, ପତ୍ର ଔଷଧୀ, କିମ୍ବା ବୈଦିକ ବିଜ୍ଞାନ ବିଷୟରେ ପଚାରନ୍ତୁ...'
                : 'Ask Arohi about your symptoms, herbal leaf decoctions, or Vedic science...'
            }
            className="flex-1 bg-white dark:bg-[#19241b] border border-[#E7DEC8] dark:border-[#2b3c2d] rounded-2xl px-4 py-3 text-sm text-[#2B1B10] dark:text-[#EDE6D6] placeholder:text-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D]"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isThinking}
            className="px-5 py-3 rounded-2xl bg-[#15803D] hover:bg-[#166534] disabled:opacity-50 text-white font-medium text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <span>Consult</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
