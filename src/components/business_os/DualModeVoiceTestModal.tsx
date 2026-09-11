import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  MessageSquare,
  Activity,
  Send,
  RotateCcw,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Share2,
  Calendar,
  PhoneOutgoing
} from 'lucide-react';
import { TelephonyFlowNode, DEFAULT_TELEPHONY_FLOW_NODES } from './telephonyData';
import { InboundVoiceAgent } from './types';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';
import {
  BackgroundSoundType,
  startAmbientNoise,
  stopAmbientNoise
} from '../../utils/arohiAmbientNoise';
import EnvironmentSoundSelector from './EnvironmentSoundSelector';
import { useBusinessOS } from './BusinessOSContext';

interface DualModeVoiceTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  flowNodes?: TelephonyFlowNode[];
  agent?: InboundVoiceAgent | null;
}

interface TestMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  nodeId?: string;
  nodeTitle?: string;
  toolTriggered?: string;
  timestamp: string;
}

export default function DualModeVoiceTestModal({
  isOpen,
  onClose,
  flowNodes = DEFAULT_TELEPHONY_FLOW_NODES,
  agent
}: DualModeVoiceTestModalProps) {
  const { showToast } = useBusinessOS();
  const [testMode, setTestMode] = useState<'audio' | 'chat'>('audio');
  
  // Call state (for Audio Mode)
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callSeconds, setCallSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Active Flow Node tracking
  const [activeNodeId, setActiveNodeId] = useState<string>('node-greeting');
  const [visitedNodeIds, setVisitedNodeIds] = useState<string[]>(['node-greeting']);

  // Environment & Background Sound State
  const [backgroundSound, setBackgroundSound] = useState<BackgroundSoundType>(agent?.backgroundSound || 'office');
  const [switchLanguageDuringCall, setSwitchLanguageDuringCall] = useState<boolean>(agent?.switchLanguageDuringCall ?? true);

  // Stop ambient sound on modal close/unmount
  useEffect(() => {
    return () => {
      stopAmbientNoise();
      stopArohiVoice();
    };
  }, []);

  // Chat conversation
  const [messages, setMessages] = useState<TestMessage[]>([
    {
      id: 'msg-init',
      sender: 'agent',
      text: flowNodes.find(n => n.id === 'node-greeting')?.config.dialogueText ||
        'ନମସ୍କାର! ଆରୋହୀ ଏଣ୍ଟରପ୍ରାଇଜେସ୍ ତରଫରୁ ସ୍ୱାଗତ। ମୁଁ ଆପଣଙ୍କୁ ଆଜି କିପରି ସାହାଯ୍ୟ କରିପାରିବି? (Namaskar! Welcome to Arohi. How may I assist you today?)',
      nodeId: 'node-greeting',
      nodeTitle: '1. Multilingual Greeting',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Timer for audio call
  useEffect(() => {
    let interval: any;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  // Scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSpeaking]);

  // Clean voice when modal closes or unmounts
  useEffect(() => {
    return () => {
      stopArohiVoice();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  if (!isOpen) return null;

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Speak agent message using Flagship 24kHz HD Voice
  const speakText = (text: string) => {
    if (isMuted) return;

    playArohiVoice(text, {
      voice: 'Zypher',
      language: 'en-IN',
      isMuted: isMuted,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  // Process user input and navigate node flow
  const handleProcessInput = (userQuery: string) => {
    if (!userQuery.trim()) return;

    const userMsg: TestMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userQuery.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Evaluate intent & next node
    const lower = userQuery.toLowerCase();
    let nextNodeId = 'node-intent';
    let agentResponse = '';
    let toolTriggered: string | undefined = undefined;

    if (lower.includes('price') || lower.includes('cost') || lower.includes('catalog') || lower.includes('brochure') || lower.includes('ଦାମ୍') || lower.includes('କାଟାଲଗ୍')) {
      nextNodeId = 'node-whatsapp';
      const node = flowNodes.find(n => n.id === 'node-whatsapp');
      agentResponse = node?.config.dialogueText || 'I have sent our complete product catalog and pricing sheet directly to your WhatsApp number.';
      toolTriggered = 'DISPATCH_WHATSAPP_BROCHURE';
    } else if (lower.includes('payment') || lower.includes('pay') || lower.includes('invoice') || lower.includes('bill') || lower.includes('upi') || lower.includes('ପେମେଣ୍ଟ')) {
      nextNodeId = 'node-razorpay';
      const node = flowNodes.find(n => n.id === 'node-razorpay');
      agentResponse = node?.config.dialogueText || 'I have generated your Razorpay UPI payment link and sent it via SMS. You can complete it while on the call.';
      toolTriggered = 'GENERATE_RAZORPAY_INVOICE_LINK';
    } else if (lower.includes('demo') || lower.includes('meeting') || lower.includes('book') || lower.includes('schedule') || lower.includes('ଡେମୋ') || lower.includes('ମିଟିଂ')) {
      nextNodeId = 'node-booking';
      const node = flowNodes.find(n => n.id === 'node-booking');
      agentResponse = node?.config.dialogueText || 'I have locked tomorrow at 3:00 PM for your product consultation. Confirmation email has been sent.';
      toolTriggered = 'LOCK_CALENDAR_SLOT';
    } else if (lower.includes('human') || lower.includes('agent') || lower.includes('manager') || lower.includes('founder') || lower.includes('speak to someone') || lower.includes('କଥା ହେବି')) {
      nextNodeId = 'node-transfer';
      const node = flowNodes.find(n => n.id === 'node-transfer');
      agentResponse = node?.config.dialogueText || 'Please hold for a moment while I warm-transfer your call to our Senior Operations Manager...';
      toolTriggered = 'SIP_WARM_TRANSFER_TO_HUMAN';
    } else if (lower.includes('thank') || lower.includes('bye') || lower.includes('done') || lower.includes('ଧନ୍ୟବାଦ')) {
      nextNodeId = 'node-closing';
      const node = flowNodes.find(n => n.id === 'node-closing');
      agentResponse = node?.config.dialogueText || 'Thank you so much for calling Arohi Enterprises. Have a productive and pleasant day!';
      toolTriggered = 'SYNC_TO_AROHI_CRM_LEADS';
    } else {
      // General responsive intake
      agentResponse = `Understood! I've noted that. Would you like me to dispatch our catalog on WhatsApp, send an instant payment link, or schedule a priority consultation?`;
      nextNodeId = 'node-intent';
    }

    setActiveNodeId(nextNodeId);
    setVisitedNodeIds(prev => Array.from(new Set([...prev, nextNodeId])));

    const matchedNode = flowNodes.find(n => n.id === nextNodeId);

    setTimeout(() => {
      const botMsg: TestMessage = {
        id: `bot-${Date.now()}`,
        sender: 'agent',
        text: agentResponse,
        nodeId: nextNodeId,
        nodeTitle: matchedNode?.title,
        toolTriggered: toolTriggered,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);

      // If in Audio Mode, speak the message
      if (testMode === 'audio' && callStatus === 'connected') {
        speakText(agentResponse);
      }
    }, 400);
  };

  // Start Audio Call Simulation
  const handleStartCall = () => {
    setCallStatus('connected');
    setCallSeconds(0);
    
    // Play realistic ambient sound in the background if selected
    if (backgroundSound !== 'none') {
      startAmbientNoise(backgroundSound, 0.08);
    }

    const greetingText =
      flowNodes.find(n => n.id === 'node-greeting')?.config.dialogueText ||
      'ନମସ୍କାର! ଆରୋହୀ ଏଣ୍ଟରପ୍ରାଇଜେସ୍ ତରଫରୁ ସ୍ୱାଗତ। ମୁଁ ଆପଣଙ୍କୁ ଆଜି କିପରି ସାହାଯ୍ୟ କରିପାରିବି?';
    speakText(greetingText);
    showToast(`Arohi 24kHz HD Voice Call connected! [Ambient: ${backgroundSound}]`);
  };

  const handleEndCall = () => {
    stopArohiVoice();
    stopAmbientNoise();
    setCallStatus('ended');
    setIsSpeaking(false);
    setIsListening(false);
    showToast('Voice call ended. Audio pipeline reset.');
  };

  const handleResetConversation = () => {
    stopArohiVoice();
    stopAmbientNoise();
    setCallStatus('idle');
    setCallSeconds(0);
    setActiveNodeId('node-greeting');
    setVisitedNodeIds(['node-greeting']);
    setMessages([
      {
        id: 'msg-init',
        sender: 'agent',
        text: flowNodes.find(n => n.id === 'node-greeting')?.config.dialogueText ||
          'ନମସ୍କାର! ଆରୋହୀ ଏଣ୍ଟରପ୍ରାଇଜେସ୍ ତରଫରୁ ସ୍ୱାଗତ। ମୁଁ ଆପଣଙ୍କୁ ଆଜି କିପରି ସାହାଯ୍ୟ କରିପାରିବି?',
        nodeId: 'node-greeting',
        nodeTitle: '1. Multilingual Greeting',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Quick prompt presets for testing
  const quickPrompts = [
    'What is your pricing and product catalog?',
    'Send me an instant invoice payment link',
    'Can you schedule a demo call for tomorrow?',
    'I want to speak with a human manager',
    'ଧନ୍ୟବାଦ, ବହୁତ ଭଲ ଲାଗିଲା (Thank you, done)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-2xl flex flex-col h-[90vh] max-h-[820px] overflow-hidden">
        
        {/* Header with Mode Switcher */}
        <div className="p-4 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Test Agent Studio
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <span>24kHz HD Voice</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Interactive voice &amp; prompt testing sandbox with active node traversal
              </p>
            </div>
          </div>

          {/* DUAL MODE TOGGLE: Test Audio vs Test Chat */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 text-xs font-semibold">
            <button
              onClick={() => {
                setTestMode('audio');
                stopArohiVoice();
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                testMode === 'audio'
                  ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Test Audio</span>
            </button>

            <button
              onClick={() => {
                setTestMode('chat');
                stopArohiVoice();
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                testMode === 'chat'
                  ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Test Chat (Prompt Dev)</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetConversation}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
              title="Reset Test Session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                stopArohiVoice();
                onClose();
              }}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Pathway Inspector Bar */}
        <div className="px-4 py-2 bg-purple-500/5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs overflow-x-auto gap-3 shrink-0">
          <div className="flex items-center gap-2 shrink-0">
            <GitBranch className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="font-bold text-zinc-700 dark:text-zinc-300">Live Active Node:</span>
            <span className="px-2 py-0.5 rounded-lg bg-purple-600 text-white font-bold text-[11px] shadow-xs">
              {flowNodes.find(n => n.id === activeNodeId)?.title || activeNodeId}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 shrink-0">
            <span>Traversed Pathway:</span>
            {visitedNodeIds.map((id, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-zinc-700 dark:text-zinc-300">
                  {id.replace('node-', '')}
                </span>
                {idx < visitedNodeIds.length - 1 && <span className="text-zinc-400">→</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left/Main Column: Audio Call Stage OR Chat History */}
          <div className="flex-1 flex flex-col overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/40">
            
            {/* If in Audio Mode, show the Call Banner */}
            {testMode === 'audio' && (
              <div className="p-4 border-b border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#151518] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md ${
                    callStatus === 'connected' ? 'bg-emerald-600 animate-pulse' : 'bg-zinc-400'
                  }`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">
                        {agent?.name || 'Arohi Executive Intake Agent'}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${callStatus === 'connected' ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                    </div>
                    <p className="text-xs text-zinc-500 font-medium">
                      {callStatus === 'connected' ? `In Call • ${formatSeconds(callSeconds)}` : 'Call Idle (Click Start Audio Call below)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {callStatus === 'connected' ? (
                    <>
                      <button
                        onClick={() => {
                          if (!isMuted) stopArohiVoice();
                          setIsMuted(!isMuted);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                          isMuted
                            ? 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300'
                            : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-black/5 dark:border-white/5'
                        }`}
                        title={isMuted ? 'Unmute Audio' : 'Mute Voice Audio'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={handleEndCall}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
                      >
                        <PhoneOff className="w-4 h-4" />
                        <span>Hang Up</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleStartCall}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-md active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Start Audio Call</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Conversation Log / Spoken Transcripts */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mb-1 px-1">
                    <span className="font-semibold">
                      {msg.sender === 'user' ? 'Caller (You)' : agent?.name || 'Arohi AI Agent'}
                    </span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                    {msg.nodeTitle && (
                      <span className="ml-1 px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20">
                        {msg.nodeTitle}
                      </span>
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.08] text-zinc-900 dark:text-zinc-100 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Tool Hook Card (if triggered) */}
                    {msg.toolTriggered && (
                      <div className="mt-2.5 pt-2 border-t border-black/10 dark:border-white/10 flex items-center gap-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {msg.toolTriggered === 'DISPATCH_WHATSAPP_BROCHURE' && <Share2 className="w-3.5 h-3.5" />}
                        {msg.toolTriggered === 'GENERATE_RAZORPAY_INVOICE_LINK' && <Zap className="w-3.5 h-3.5 text-amber-500" />}
                        {msg.toolTriggered === 'LOCK_CALENDAR_SLOT' && <Calendar className="w-3.5 h-3.5 text-blue-500" />}
                        {msg.toolTriggered === 'SIP_WARM_TRANSFER_TO_HUMAN' && <PhoneOutgoing className="w-3.5 h-3.5 text-rose-500" />}
                        <span>Tool Invoked: {msg.toolTriggered}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isSpeaking && (
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-2 rounded-xl w-fit animate-pulse border border-purple-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Arohi is speaking via 24kHz HD Voice...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts Carousel */}
            <div className="px-4 py-2 border-t border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#121214] flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
              <span className="text-zinc-400 font-semibold shrink-0">Try:</span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleProcessInput(prompt)}
                  className="px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-purple-100 dark:bg-zinc-800 dark:hover:bg-purple-950/40 text-zinc-700 hover:text-purple-700 dark:text-zinc-300 dark:hover:text-purple-300 whitespace-nowrap cursor-pointer transition-colors border border-black/5 dark:border-white/5"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#121214] flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleProcessInput(inputText);
                }}
                placeholder={
                  testMode === 'audio'
                    ? 'Type caller response or speak into your mic...'
                    : 'Type test caller phrase (e.g. price, invoice, demo, or human)...'
                }
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                onClick={() => handleProcessInput(inputText)}
                disabled={!inputText.trim()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>

          </div>

          {/* Right Column: Environment Audio Settings & Flow Graph Preview */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#121214] p-4 flex flex-col gap-4 overflow-y-auto shrink-0">
            {/* Environment Settings Card (Matches Screenshot) */}
            <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <EnvironmentSoundSelector
                selectedSound={backgroundSound}
                onChangeSound={(sound) => {
                  setBackgroundSound(sound);
                  if (callStatus === 'connected') {
                    startAmbientNoise(sound, 0.08);
                  }
                  showToast(`Background sound set to ${sound === 'none' ? 'No sound' : sound}`);
                }}
                switchLanguageDuringCall={switchLanguageDuringCall}
                onToggleSwitchLanguage={(enabled) => {
                  setSwitchLanguageDuringCall(enabled);
                  showToast(enabled ? 'Live language switching enabled' : 'Language locked to initial prompt');
                }}
              />
            </div>

            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-purple-600" />
                <span>Active Flow Hierarchy</span>
              </h4>
              <p className="text-[11px] text-zinc-500">
                Nodes highlighted in purple are currently executing or completed.
              </p>
            </div>

            <div className="space-y-2">
              {flowNodes.map((n) => {
                const isActive = n.id === activeNodeId;
                const isVisited = visitedNodeIds.includes(n.id);

                return (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl border text-xs transition-all ${
                      isActive
                        ? 'border-purple-500 bg-purple-500/10 shadow-xs ring-1 ring-purple-500'
                        : isVisited
                        ? 'border-emerald-500/40 bg-emerald-500/5'
                        : 'border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-zinc-900 dark:text-white truncate max-w-[180px]">
                        {n.title}
                      </span>
                      {isActive ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-600 text-white animate-pulse">
                          Active
                        </span>
                      ) : isVisited ? (
                        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[10px] text-zinc-500 line-clamp-2">
                      {n.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 text-[11px] space-y-1 text-purple-800 dark:text-purple-300">
              <div className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Arohi Audio Pipeline Active</span>
              </div>
              <p className="text-[10px] opacity-90">
                Operating with sub-500ms voice turn latency and continuous 24kHz HD studio neural voice synthesis.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
