import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Phone,
  PhoneOff,
  PhoneCall,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  Calendar,
  Clock,
  FileText,
  Zap,
  RotateCcw
} from 'lucide-react';
import { InboundVoiceAgent, InboundCallTurnMessage, TelephonyCallRecord, Lead } from './types';
import { useBusinessOS } from './BusinessOSContext';

interface InboundCallSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgent?: InboundVoiceAgent | null;
}

export default function InboundCallSimulatorModal({
  isOpen,
  onClose,
  selectedAgent
}: InboundCallSimulatorModalProps) {
  const { inboundAgents, addCallRecord, addLead, showToast } = useBusinessOS();
  const agent = selectedAgent || inboundAgents[0];

  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const [callerName, setCallerName] = useState('Ankit Sharma');
  const [callerPhone, setCallerPhone] = useState('+91 98450 67890');
  const [callerCompany, setCallerCompany] = useState('Bharat Industrial Tools');
  const [messages, setMessages] = useState<InboundCallTurnMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [extractedLead, setExtractedLead] = useState<any>(null);
  const [extractedAppointment, setExtractedAppointment] = useState<any>(null);
  const [actionItems, setActionItems] = useState<string[]>([]);
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessingTurn]);

  // Handle call timer
  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStatus]);

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = agent?.language?.includes('Hindi') ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendTurn(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [agent]);

  if (!isOpen) return null;

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Speak agent response via Web Speech Synthesis
  const speakText = (text: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = agent?.speechRate || 1.0;
      utterance.pitch = agent?.pitch || 1.0;

      if (agent?.language?.includes('Hindi') || agent?.language?.includes('Hinglish')) {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Start Call Simulation
  const handleStartCall = () => {
    setCallStatus('ringing');
    setCallSeconds(0);
    setMessages([]);
    setExtractedLead(null);
    setExtractedAppointment(null);
    setActionItems([]);

    setTimeout(() => {
      setCallStatus('connected');
      const initialGreeting =
        agent?.greetingMessage ||
        `Namaste! Welcome to ${agent?.businessName || 'our company'}. How may I assist you today?`;

      const greetingMsg: InboundCallTurnMessage = {
        id: `msg_${Date.now()}`,
        role: 'agent',
        text: initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sentiment: 'positive'
      };

      setMessages([greetingMsg]);
      speakText(initialGreeting);
    }, 1200);
  };

  // Process a conversational turn
  const handleSendTurn = async (textToSend: string) => {
    if (!textToSend.trim() || isProcessingTurn || callStatus !== 'connected') return;

    const callerMsg: InboundCallTurnMessage = {
      id: `msg_caller_${Date.now()}`,
      role: 'caller',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, callerMsg];
    setMessages(newHistory);
    setInputText('');
    setIsProcessingTurn(true);

    try {
      const res = await fetch('/api/arohi-one/voice-agents/simulate-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent,
          callerMessage: textToSend.trim(),
          history: newHistory,
          callerName,
          callerPhone,
          businessName: agent?.businessName || 'Our Business'
        })
      });

      const data = await res.json();
      if (data.success && data.turn) {
        const turn = data.turn;
        const agentMsg: InboundCallTurnMessage = {
          id: `msg_agent_${Date.now()}`,
          role: 'agent',
          text: turn.speechResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sentiment: turn.sentiment || 'positive',
          detectedIntent: turn.detectedIntent
        };

        setMessages((prev) => [...prev, agentMsg]);
        speakText(turn.speechResponse);

        if (turn.extractedLead && (turn.extractedLead.name || turn.extractedLead.requirement)) {
          setExtractedLead(turn.extractedLead);
        }
        if (turn.extractedAppointment && (turn.extractedAppointment.date || turn.extractedAppointment.time)) {
          setExtractedAppointment(turn.extractedAppointment);
        }
        if (turn.actionItem) {
          setActionItems((prev) => Array.from(new Set([...prev, turn.actionItem])));
        }
      }
    } catch (err) {
      console.error('Turn simulation error:', err);
      // Client fallback
      const fallbackReply = `Thank you for sharing that with me. I have noted your inquiry and our team will follow up on ${callerPhone}.`;
      const fallbackMsg: InboundCallTurnMessage = {
        id: `msg_agent_${Date.now()}`,
        role: 'agent',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sentiment: 'positive'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakText(fallbackReply);
    } finally {
      setIsProcessingTurn(false);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch {
        showToast('Microphone access unavailable. You can type below to test.');
      }
    }
  };

  // End call and save records
  const handleEndCall = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (isListening) {
      recognitionRef.current?.stop();
    }

    setCallStatus('ended');

    // Create call record
    const summaryText = messages.length > 1
      ? `Inbound call attended by ${agent?.name || 'AI Receptionist'}. Caller: ${callerName}. Handled ${messages.length} conversational turns with ${extractedLead ? 'Lead Qualification' : 'General Inquiry'}.`
      : `Test call completed with ${agent?.name}.`;

    const fullTranscript = messages
      .map((m) => `${m.role === 'agent' ? agent?.name : callerName}: "${m.text}"`)
      .join('\n');

    const callRecord: Omit<TelephonyCallRecord, 'id'> = {
      callType: 'inbound',
      callerName,
      callerPhone,
      companyName: callerCompany,
      durationSeconds: Math.max(15, callSeconds),
      timestamp: 'Just Now',
      agentName: `${agent?.name} (${agent?.role || 'Receptionist'})`,
      sentiment: extractedAppointment ? 'positive' : 'positive',
      callSummary: summaryText,
      actionItems: actionItems.length > 0 ? actionItems : ['Review call transcript in Telephony Logs'],
      audioDuration: formatTimer(Math.max(15, callSeconds)),
      transcriptionSnippet: fullTranscript.slice(0, 300) + '...',
      status: 'completed'
    };

    addCallRecord(callRecord);

    // If lead was extracted and autoActions.createCrmLead is true, create lead
    if (agent?.autoActions?.createCrmLead && messages.length > 1) {
      const newLead: Omit<Lead, 'id' | 'createdAt'> = {
        name: callerName,
        company: callerCompany,
        email: `${callerName.toLowerCase().replace(/[^a-z0-9]/g, '')}@lead.com`,
        phone: callerPhone,
        source: 'Arohi Call',
        status: 'qualified',
        estimatedValue: 85000,
        aiScore: 94,
        aiInsight: `High-intent caller qualified autonomously by ${agent?.name}. Call duration: ${formatTimer(callSeconds)}.`,
        assignedTo: 'Sales Team',
        city: 'Bengaluru / India',
        lastContactedAt: 'Just Now',
        tags: ['Inbound Voice Call', agent?.department || 'Reception', 'AI Qualified'],
        notes: `Call Transcript:\n${fullTranscript}`
      };
      addLead(newLead);
    }

    showToast(`Call ended. Logged to Telephony history & CRM!`);
  };

  const handleReset = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallStatus('idle');
    setCallSeconds(0);
    setMessages([]);
    setExtractedLead(null);
    setExtractedAppointment(null);
    setActionItems([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.1] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  Live Inbound Call Simulator
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {agent?.name}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Test how your AI voice receptionist answers incoming customer phone calls in real-time
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="w-8 h-8 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden text-xs">
          
          {/* Left Column: Phone Setup & Call Status */}
          <div className="lg:col-span-5 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between space-y-4 bg-zinc-50/40 dark:bg-zinc-900/20 overflow-y-auto">
            
            {/* Caller Info Inputs */}
            <div className="space-y-3">
              <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 text-xs">
                <User className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Simulated Inbound Caller Profile</span>
              </span>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Caller Name
                  </label>
                  <input
                    type="text"
                    disabled={callStatus === 'connected' || callStatus === 'ringing'}
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white text-xs disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Caller Phone Number
                  </label>
                  <input
                    type="text"
                    disabled={callStatus === 'connected' || callStatus === 'ringing'}
                    value={callerPhone}
                    onChange={(e) => setCallerPhone(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white text-xs font-mono disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    disabled={callStatus === 'connected' || callStatus === 'ringing'}
                    value={callerCompany}
                    onChange={(e) => setCallerCompany(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white text-xs disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Inbound Agent Summary Card */}
            <div className="bg-purple-50/70 dark:bg-purple-950/30 p-3.5 rounded-2xl border border-purple-200/80 dark:border-purple-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-purple-700 dark:text-purple-300">
                  Target AI Agent
                </span>
                <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                  {agent?.assignedPhoneNumber || '+91 80 4712 9901'}
                </span>
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                {agent?.name}
              </h3>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                {agent?.role} • {agent?.language}
              </p>
              <div className="pt-1 flex flex-wrap gap-1.5 text-[9px]">
                <span className="px-2 py-0.5 rounded-full bg-white dark:bg-zinc-900 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-semibold">
                  {agent?.voiceProfile}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white dark:bg-zinc-900 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-semibold">
                  {agent?.operatingHours}
                </span>
              </div>
            </div>

            {/* Call State & Control Dial Pad */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] space-y-3.5 text-center shadow-xs">
              
              {callStatus === 'idle' && (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Ready to Place Call</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Simulate calling your business number to test {agent?.name}
                    </p>
                  </div>
                  <button
                    onClick={handleStartCall}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Dial Inbound Call</span>
                  </button>
                </div>
              )}

              {callStatus === 'ringing' && (
                <div className="space-y-3 py-2">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mx-auto animate-bounce">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 text-sm">Ringing {agent?.name}...</h4>
                    <p className="text-[11px] text-zinc-500">Connecting via Sovereign IVR...</p>
                  </div>
                </div>
              )}

              {callStatus === 'connected' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>CALL IN PROGRESS</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white">
                      {formatTimer(callSeconds)}
                    </span>
                  </div>

                  {/* Audio Waveform Effect */}
                  <div className="h-6 flex items-center justify-center gap-1 pt-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-200 ${
                          isSpeaking
                            ? 'bg-purple-600 animate-pulse'
                            : isListening
                            ? 'bg-emerald-500 animate-bounce'
                            : 'bg-zinc-300 dark:bg-zinc-700'
                        }`}
                        style={{ height: `${isSpeaking || isListening ? Math.sin(i * 0.8) * 14 + 14 : 6}px` }}
                      ></div>
                    ))}
                  </div>

                  <div className="text-[10px] font-semibold text-purple-600 dark:text-purple-400">
                    {isSpeaking ? `🔊 ${agent?.name} is speaking...` : isListening ? '🎙️ Listening to you...' : '📞 Speak into mic or type below'}
                  </div>

                  {/* Call Action Controls */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={toggleMic}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        isListening
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                      }`}
                    >
                      {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                      <span>{isListening ? 'Listening...' : 'Push to Speak'}</span>
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-2 rounded-xl text-xs cursor-pointer ${
                        isMuted
                          ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}
                      title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={handleEndCall}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all shadow-xs"
                    >
                      <PhoneOff className="w-3.5 h-3.5" />
                      <span>End Call</span>
                    </button>
                  </div>
                </div>
              )}

              {callStatus === 'ended' && (
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Call Completed</h4>
                    <p className="text-[11px] text-zinc-500">Duration: {formatTimer(callSeconds)} • Logged to CRM</p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Start New Test Call</span>
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Live Conversation Transcript & Intelligence Feed */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white dark:bg-[#121214] p-4 sm:p-5 overflow-hidden">
            
            {/* Live Badges for Extracted Intelligence */}
            <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Autonomous Extraction:</span>
              {extractedLead && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Lead Identified: {extractedLead.name || callerName}</span>
                </span>
              )}
              {extractedAppointment && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 flex items-center gap-1 animate-in fade-in">
                  <Calendar className="w-3 h-3" />
                  <span>Slot: {extractedAppointment.date || 'Today'} {extractedAppointment.time || 'Preferred'}</span>
                </span>
              )}
              {messages.length === 0 && (
                <span className="text-[11px] text-zinc-400 italic">Call not connected yet</span>
              )}
            </div>

            {/* Transcript Chat Area */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 min-h-[260px] max-h-[420px]">
              {messages.length === 0 && callStatus === 'idle' && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 space-y-2">
                  <PhoneCall className="w-8 h-8 text-purple-400 opacity-60" />
                  <p className="text-xs font-medium">Click "Dial Inbound Call" to test live voice conversation.</p>
                  <p className="text-[11px] text-zinc-400">You can speak with your microphone or type messages below.</p>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === 'caller' ? 'items-end' : 'items-start'} animate-in fade-in duration-150`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="font-bold text-[10px] text-zinc-500 dark:text-zinc-400">
                      {m.role === 'caller' ? `${callerName} (Caller)` : `${agent?.name} (AI Receptionist)`}
                    </span>
                    <span className="text-[9px] text-zinc-400">{m.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.role === 'caller'
                        ? 'bg-purple-600 text-white rounded-tr-xs shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-tl-xs border border-black/[0.04] dark:border-white/[0.06]'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isProcessingTurn && (
                <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 p-2">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>{agent?.name} is thinking & synthesizing speech...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Test Prompt Chips */}
            {callStatus === 'connected' && (
              <div className="pt-2 pb-2 flex flex-wrap gap-1.5 border-t border-black/[0.06] dark:border-white/[0.08]">
                <span className="text-[10px] text-zinc-400 font-semibold self-center">Sample questions:</span>
                <button
                  type="button"
                  onClick={() => handleSendTurn("Namaste, can you tell me your pricing and services?")}
                  className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-50 text-[10px] text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  "Tell me pricing & services"
                </button>
                <button
                  type="button"
                  onClick={() => handleSendTurn("I want to book an appointment for tomorrow at 4 PM.")}
                  className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-50 text-[10px] text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  "Book appointment for tomorrow 4 PM"
                </button>
                <button
                  type="button"
                  onClick={() => handleSendTurn("Kya aap mujhe GST invoice aur demo bhej sakte hain?")}
                  className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-50 text-[10px] text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  "Demo & GST bill chahiye"
                </button>
              </div>
            )}

            {/* Input Form for Text / Speech Submission */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendTurn(inputText);
              }}
              className="pt-2 flex items-center gap-2"
            >
              <input
                type="text"
                disabled={callStatus !== 'connected' || isProcessingTurn}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  callStatus === 'connected'
                    ? 'Type what the caller says, or click Push to Speak...'
                    : 'Dial call to begin conversation...'
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={callStatus !== 'connected' || !inputText.trim() || isProcessingTurn}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white transition-all shadow-xs cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
