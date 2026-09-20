// Screen 2: Consult Chat View with Interactive Pills & Nutrition Card matching Mockup 2
// Clean light canvas with active animal header, interactive numbered probing pills, NASEM nutrition result card, and audio pill

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Mic, Volume2, VolumeX, Paperclip, 
  Sparkles, AlertTriangle, PhoneCall, Stethoscope, RefreshCw,
  Image as ImageIcon, Loader2, Camera, Upload, FileText, ChevronRight, CheckCircle2, Play, Pause
} from 'lucide-react';
import { VetChatMessage, VetSpecies, VetLanguage } from '../types';
import { playArohiVoice, stopArohiVoice } from '../../../utils/arohiVoicePlayer';
import { AROHI_VETMITRA_SYSTEM_PROMPT } from '../engine/vetMitraSystemPrompt';
import { VET_STOCK_IMAGES } from '../data/vetStockImages';
import { UniversalAnimalRecord, SAMPLE_ANIMAL_RECORDS } from '../data/mockAnimalsData';

interface Props {
  species: VetSpecies;
  language: VetLanguage;
  activeAnimal?: UniversalAnimalRecord;
  onStartVoiceCall: () => void;
  onOpenEmergencyGuide?: () => void;
  onChangeAnimal?: () => void;
}

export const VetMitraChatView: React.FC<Props> = ({
  species,
  language,
  activeAnimal = SAMPLE_ANIMAL_RECORDS[0],
  onStartVoiceCall,
  onOpenEmergencyGuide,
  onChangeAnimal,
}) => {
  const isOdia = language === 'or';
  const [messages, setMessages] = useState<VetChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeSpeechMessageId, setActiveSpeechMessageId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ name: string; type: string; base64: string; previewUrl: string } | null>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  // Probing interactive states (Matching Mockup 2)
  const [q1Answer, setQ1Answer] = useState<string | null>('reduced');
  const [q2Answer, setQ2Answer] = useState<string | null>('reduced');
  const [isPlayingDemoAudio, setIsPlayingDemoAudio] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize with initial conversation resembling Mockup 2
  useEffect(() => {
    setMessages([
      {
        id: 'msg_1',
        sender: 'user',
        text: isOdia 
          ? 'ମୋ ଗାଈ ର ଦୁଧ ୧୨ ଲିଟର ରୁ ୯ ଲିଟର କୁ କମିଯାଇଛି। ଏହି ଘାସ (ଫଦ୍ଦର) ଠିକ୍ ଅଛି କି?\nMy cow’s milk has dropped from 12 liters to 9 liters. Is this fodder okay?'
          : 'My cow’s milk has dropped from 12 liters to 9 liters. Is this fodder okay?',
        timestamp: new Date(Date.now() - 120000),
        species: 'cattle',
        attachments: [
          {
            type: 'image',
            url: VET_STOCK_IMAGES.greenFodderNapier,
            name: 'napier_grass_sample.jpg'
          }
        ]
      },
      {
        id: 'msg_2',
        sender: 'arohi',
        text: isOdia
          ? 'ନମସ୍କାର! ମୁଁ Arohi VetMitra ଅଟେ। ଆପଣଙ୍କ ଗାଈର ଦୁଧ କମିଯିବାର କାରଣ ଜାଣିବା ପାଇଁ କିଛି ପ୍ରଶ୍ନ ପଚାରିବି।\nHello! I am Arohi VetMitra. Let’s understand what is happening. Please tell me:'
          : 'Hello! I am Arohi VetMitra. Let’s understand what is happening. Please tell me:',
        timestamp: new Date(Date.now() - 90000),
        species: 'cattle',
      },
      {
        id: 'msg_3',
        sender: 'user',
        text: isOdia
          ? 'ତାର ଖାଦ୍ୟ ରୁଚି କିଛି କମିଛି ଏବଂ ଜାବର କମିଛି। ସେ ୧୨୦ ଦିନ ଦୁଧ ଦେଉଛି।\nAppetite is slightly reduced and cud chewing is less. She is 120 days in milk.'
          : 'Appetite is slightly reduced and cud chewing is less. She is 120 days in milk.',
        timestamp: new Date(Date.now() - 60000),
        species: 'cattle',
      },
      {
        id: 'msg_4',
        sender: 'arohi',
        text: isOdia
          ? 'ଧନ୍ୟବାଦ! ମୁଁ ଆପଣଙ୍କ ଗାଈ ପାଇଁ ଏକ ସୁପାରିଶିତ ରାସନ୍ ପ୍ଲାନ୍ ତିଆରି କରିଛି (NASEM 2021 ଅନୁସାରେ)।\nThanks! I have prepared a recommended daily ration for your cow based on NASEM 2021.'
          : 'Thanks! I have prepared a recommended daily ration for your cow based on NASEM 2021.',
        timestamp: new Date(Date.now() - 30000),
        species: 'cattle',
      }
    ]);
  }, [species, isOdia]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking]);

  // Audio Playback
  const handlePlayVoice = (message: VetChatMessage) => {
    if (activeSpeechMessageId === message.id) {
      stopArohiVoice();
      setActiveSpeechMessageId(null);
      return;
    }

    stopArohiVoice();
    setActiveSpeechMessageId(message.id);
    playArohiVoice(message.text, {
      language: language === 'or' ? 'or-IN' : language === 'hi' ? 'hi-IN' : 'en-IN',
      voice: 'Zypher',
      onEnd: () => setActiveSpeechMessageId(null),
      onError: () => setActiveSpeechMessageId(null),
    });
  };

  // Toggle demo audio
  const toggleDemoAudio = () => {
    if (isPlayingDemoAudio) {
      stopArohiVoice();
      setIsPlayingDemoAudio(false);
    } else {
      setIsPlayingDemoAudio(true);
      playArohiVoice(
        isOdia 
          ? 'ଆପଣଙ୍କ ଗାଈ ପାଇଁ ଦୈନିକ ୧୫ କିଲୋ ନେପିୟର ସହିତ ୪ କିଲୋ ଶୁଖିଲା ନଡ଼ା, ୨.୫ କିଲୋ ମକା ଚୂନା, ୧.୮ କିଲୋ ସୋରିଷ ଖଳି ଏବଂ ୫୦ ଗ୍ରାମ ମିନେରାଲ ମିକ୍ସଚର ଦିଅନ୍ତୁ। ଏହା ଦ୍ୱାରା ଜାବର କାଟିବା ସ୍ୱାଭାବିକ ହେବ ଏବଂ କ୍ଷୀର ୧୧ ରୁ ୧୩ ଲିଟରକୁ ବୃଦ୍ଧି ପାଇବ।'
          : 'For your cow, provide 15kg Napier green fodder, 4kg dry straw, 2.5kg maize grain, 1.8kg mustard cake, and 50g mineral mixture. This balances rumen fiber and restores milk yield to 11-13 liters daily.',
        {
          language: language === 'or' ? 'or-IN' : 'en-IN',
          voice: 'Zypher',
          onEnd: () => setIsPlayingDemoAudio(false),
          onError: () => setIsPlayingDemoAudio(false),
        }
      );
    }
  };

  // Send Message Flow
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query && !selectedFile) return;

    const userMessage: VetChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
      species,
      attachments: selectedFile
        ? [
            {
              type: 'image',
              url: selectedFile.previewUrl,
              name: selectedFile.name,
            },
          ]
        : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    const currentFile = selectedFile;
    setSelectedFile(null);
    setShowAttachMenu(false);
    setIsAiThinking(true);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'msg_welcome')
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query || 'Analyze attached animal photo or report.',
          history: historyPayload,
          language: language,
          mode: 'vetmitra',
          systemContext: `${AROHI_VETMITRA_SYSTEM_PROMPT}\nCURRENT CONTEXT: Animal is ${activeAnimal.name} (${activeAnimal.breed}, ${activeAnimal.weightKg}kg). Species: ${species.toUpperCase()}. User language is ${language}. Internalize all NASEM 2021 equations into practical advice without showing raw spreadsheets.`,
          file: currentFile
            ? {
                name: currentFile.name,
                mimeType: currentFile.type || 'image/jpeg',
                base64: currentFile.base64,
              }
            : undefined,
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const botMessage: VetChatMessage = {
        id: `arohi_${Date.now()}`,
        sender: 'arohi',
        text: data.response || 'I have analyzed the symptoms and updated the nutritional plan.',
        timestamp: new Date(),
        species,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsAiThinking(false);
    } catch (err) {
      setIsAiThinking(false);
      const fallbackMsg: VetChatMessage = {
        id: `arohi_fb_${Date.now()}`,
        sender: 'arohi',
        text: isOdia
          ? 'ମୁଁ ଆପଣଙ୍କ ଗାଈର ଲକ୍ଷଣ ବୁଝିଲି। ସନ୍ତୁଳିତ ନେପିୟର ଓ ଶୁଖିଲା ନଡ଼ା ସହିତ ୫୦ ଗ୍ରାମ ମିନେରାଲ ମିକ୍ସଚର ନିୟମିତ ଦିଅନ୍ତୁ। ଅଧିକ ଜରୁରୀ ପରାମର୍ଶ ପାଇଁ "ଭଏସ୍ କଲ୍" ଦବାନ୍ତୁ।'
          : 'Understood. Maintaining 40-50% dry matter from fiber ensures healthy rumination. Tap Voice Call if you need live guidance.',
        timestamp: new Date(),
        species,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Clean = result.split(',')[1] || '';
      setSelectedFile({
        name: file.name,
        type: file.type,
        base64: base64Clean,
        previewUrl: result,
      });
      setShowAttachMenu(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-[780px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl animate-in fade-in-50 duration-300">
      {/* Top Active Animal Context Header (Matching Mockup 2) */}
      <div className="p-3.5 sm:p-4 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0">
            <img
              src={activeAnimal.photoUrl}
              alt={activeAnimal.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-900 uppercase">
                {activeAnimal.species.toUpperCase()} • {activeAnimal.breed}
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-emerald-700 font-bold">Online</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {activeAnimal.name} • {activeAnimal.milkYieldLDay ? `${activeAnimal.milkYieldLDay} L/day (recent: ${activeAnimal.recentYieldDropLDay || 9} L)` : 'Normal'} • Tag: {activeAnimal.tagNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onChangeAnimal && (
            <button
              onClick={onChangeAnimal}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Change Animal</span>
            </button>
          )}

          <button
            onClick={onStartVoiceCall}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isOdia ? 'ଭଏସ୍ କଲ୍' : 'Voice Call'}</span>
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in-50 duration-200`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed space-y-2.5 ${
                  isUser
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-br-none shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                {/* Photo Attachments */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="rounded-xl overflow-hidden border border-emerald-200 max-w-xs shadow-xs">
                    <img
                      src={msg.attachments[0].url}
                      alt="Attachment"
                      className="w-full h-44 object-cover"
                    />
                  </div>
                )}

                <div className="whitespace-pre-line font-normal">{msg.text}</div>

                {/* If bot message is msg_2, render interactive numbered questions (Matching Mockup 2) */}
                {msg.id === 'msg_2' && (
                  <div className="space-y-3 pt-2">
                    {/* Question 1 */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            ତାର ଖାଦ୍ୟ ରୁଚି କମିଛି କି?
                          </p>
                          <p className="text-[11px] text-slate-500">Has her appetite reduced?</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-7">
                        <button
                          onClick={() => setQ1Answer('yes')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            q1Answer === 'yes' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                          }`}
                        >
                          ହଁ / Yes
                        </button>
                        <button
                          onClick={() => setQ1Answer('no')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            q1Answer === 'no' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                          }`}
                        >
                          ନା / No
                        </button>
                        <button
                          onClick={() => setQ1Answer('not_sure')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            q1Answer === 'not_sure' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                          }`}
                        >
                          ନିଶ୍ଚିତ ନୁହେଁ / Not sure
                        </button>
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            ସେ ଏବେ ଜାବର କାଟୁଛି କି? (ଦିନକୁ କେତେଥର?)
                          </p>
                          <p className="text-[11px] text-slate-500">Is she chewing cud properly?</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-7">
                        <button
                          onClick={() => setQ2Answer('normal')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            q2Answer === 'normal' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                          }`}
                        >
                          ହଁ, ସାଧାରଣ / Yes, normal
                        </button>
                        <button
                          onClick={() => setQ2Answer('reduced')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            q2Answer === 'reduced' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                          }`}
                        >
                          କମିଛି / Reduced
                        </button>
                        <button
                          onClick={() => setQ2Answer('none')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            q2Answer === 'none' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                          }`}
                        >
                          ଜାବର କାଟୁନାହିଁ / Not chewing
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* If bot message is msg_4, render the Recommended Daily Ration Card (Matching Mockup 2) */}
                {msg.id === 'msg_4' && (
                  <div className="space-y-3 pt-2">
                    <div className="rounded-2xl bg-white border-2 border-emerald-500/40 p-4 shadow-sm space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🌿</span>
                          <div>
                            <h4 className="text-sm font-black text-slate-900">Recommended Daily Ration</h4>
                            <p className="text-[11px] text-slate-500">For Crossbred Jersey (12 L/day target)</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                          NASEM 2021
                        </span>
                      </div>

                      {/* Ingredients Breakdown */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between py-1 border-b border-slate-50">
                          <span className="font-semibold text-slate-700 flex items-center gap-2">
                            <span>🌱</span> Napier / Green Fodder (ନେପିୟର)
                          </span>
                          <span className="font-black text-slate-900">15 kg</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-50">
                          <span className="font-semibold text-slate-700 flex items-center gap-2">
                            <span>🌾</span> Dry Paddy Straw (ଶୁଖିଲା ନଡ଼ା)
                          </span>
                          <span className="font-black text-slate-900">4 kg</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-50">
                          <span className="font-semibold text-slate-700 flex items-center gap-2">
                            <span>🌽</span> Maize Grain Crushed (ମକା ଚୂନା)
                          </span>
                          <span className="font-black text-slate-900">2.5 kg</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-50">
                          <span className="font-semibold text-slate-700 flex items-center gap-2">
                            <span>🌰</span> Mustard Cake / DOC (ସୋରିଷ ଖଳି)
                          </span>
                          <span className="font-black text-slate-900">1.8 kg</span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="font-semibold text-slate-700 flex items-center gap-2">
                            <span>🧂</span> Mineral Mixture (ମିନେରାଲ ମିକ୍ସ)
                          </span>
                          <span className="font-black text-slate-900">50 g</span>
                        </div>
                      </div>

                      {/* Expected Result Strip */}
                      <div className="bg-emerald-50/80 rounded-xl p-2.5 border border-emerald-200 space-y-1 text-xs">
                        <span className="font-black text-emerald-900 block">📈 Expected Clinical Result:</span>
                        <div className="grid grid-cols-2 gap-1 text-[11px] text-emerald-800">
                          <span>✓ Improved rumen chewing</span>
                          <span>✓ Milk target: 11 - 13 L/day</span>
                          <span>✓ Better body condition</span>
                          <span>✓ Reproductive health cycle</span>
                        </div>
                      </div>
                    </div>

                    {/* Audio Playback Pill (Matching Mockup 2) */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={toggleDemoAudio}
                          className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs hover:bg-emerald-500 transition-colors"
                        >
                          {isPlayingDemoAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        <div>
                          <span className="text-xs font-bold text-emerald-950 block">
                            {isOdia ? 'ଓଡ଼ିଆରେ ଶୁଣନ୍ତୁ' : 'Listen in Odia'} (1:12)
                          </span>
                          <span className="text-[10px] text-emerald-700">Arohi Spoken Nutrition Guide</span>
                        </div>
                      </div>

                      {/* Audio waveform mockup */}
                      <div className="flex items-center gap-0.5">
                        {[40, 70, 30, 90, 60, 100, 45, 80, 50, 75, 30].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full ${isPlayingDemoAudio ? 'bg-emerald-600 animate-pulse' : 'bg-emerald-300'}`}
                            style={{ height: `${h * 0.22}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-slate-400 text-right pt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}

        {isAiThinking && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-2 text-xs text-emerald-700 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>{isOdia ? 'ଆରୋହୀ ବିଶ୍ଳେଷଣ କରୁଛନ୍ତି...' : 'Arohi is calculating...'}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Followup Chips */}
      <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
        <span className="text-[11px] font-bold text-slate-400 shrink-0">You may also like:</span>
        <button
          onClick={() => handleSendMessage('Give me optimal feeding schedule hours')}
          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
        >
          Feeding Schedule
        </button>
        <button
          onClick={() => handleSendMessage('Which minerals and supplements should I buy?')}
          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
        >
          Minerals & Supplements
        </button>
        <button
          onClick={() => handleSendMessage('Heat stress prevention in high temperature')}
          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
        >
          Heat Stress Tips
        </button>
        <button
          onClick={() => handleSendMessage('Show similar clinical cases in dairy cattle')}
          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
        >
          Similar Cases
        </button>
      </div>

      {/* Bottom Input Dock with Attachment Drawer (Matching Mockup 2) */}
      <div className="p-3 bg-white border-t border-slate-200 relative">
        {/* Attachment Menu Popup */}
        {showAttachMenu && (
          <div className="absolute bottom-16 left-4 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 w-56 space-y-1 z-20 animate-in slide-in-from-bottom-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Take Photo (ଫଟୋ ଉଠାନ୍ତୁ)</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <Upload className="w-4 h-4 text-blue-600" />
              <span>Choose Image from Gallery</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Upload Lab Report / CBC</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Upload Milk Slip</span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors shrink-0"
            title="Attach photo or report"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={isOdia ? 'ଏଠାରେ ଲେଖନ୍ତୁ (Type your message)...' : 'Type your message or ask Arohi...'}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-50 focus:bg-white rounded-2xl border border-transparent focus:border-emerald-500 text-xs sm:text-sm text-slate-900 focus:outline-none transition-all"
          />

          <button
            onClick={onStartVoiceCall}
            className="w-11 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-800/30 transition-transform active:scale-95 shrink-0"
            title="Speak to Arohi"
          >
            <Mic className="w-5 h-5" />
          </button>

          {inputText.trim() && (
            <button
              onClick={() => handleSendMessage()}
              className="w-11 h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
};
