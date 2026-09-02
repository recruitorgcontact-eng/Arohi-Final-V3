import React, { useState } from 'react';
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Sparkles,
  Play,
  Pause,
  FileText,
  Clock,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  Plus,
  Volume2,
  Mic,
  Bot,
  Settings2,
  Copy,
  Radio,
  Sliders,
  Share2,
  Zap,
  Globe,
  Languages,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { TelephonyCallRecord, InboundVoiceAgent } from './types';
import InboundAgentModal from './InboundAgentModal';
import InboundCallSimulatorModal from './InboundCallSimulatorModal';

type ArohiCallTab = 'agents' | 'telecom' | 'logs' | 'workflows';

export default function ArohiCallView() {
  const {
    calls = [],
    inboundAgents = [],
    activeInboundAgentId,
    setActiveInboundAgentId,
    updateInboundAgent,
    showToast,
    companyProfile
  } = useBusinessOS();

  const safeCalls = calls || [];
  const [activeTab, setActiveTab] = useState<ArohiCallTab>('agents');
  const [selectedCall, setSelectedCall] = useState<TelephonyCallRecord | null>(safeCalls[0] || null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Modals state
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<InboundVoiceAgent | null>(null);
  const [isCallSimulatorOpen, setIsCallSimulatorOpen] = useState(false);
  const [selectedAgentForCall, setSelectedAgentForCall] = useState<InboundVoiceAgent | null>(null);

  const handleOpenSimulator = (agent?: InboundVoiceAgent) => {
    const targetAgent = agent || inboundAgents.find(a => a.id === activeInboundAgentId) || inboundAgents[0];
    setSelectedAgentForCall(targetAgent);
    setIsCallSimulatorOpen(true);
  };

  const handleEditAgent = (agent: InboundVoiceAgent) => {
    setAgentToEdit(agent);
    setIsAgentModalOpen(true);
  };

  const handleCreateAgent = () => {
    setAgentToEdit(null);
    setIsAgentModalOpen(true);
  };

  const handleToggleAgentActive = (agent: InboundVoiceAgent, e: React.MouseEvent) => {
    e.stopPropagation();
    updateInboundAgent(agent.id, { isActive: !agent.isActive });
    showToast(`Voice Agent ${agent.name} is now ${!agent.isActive ? 'Active' : 'Paused'}`);
  };

  const handleCopyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Copied ${label} to clipboard!`);
  };

  const handleTogglePlay = () => {
    setIsPlayingAudio(!isPlayingAudio);
    showToast(isPlayingAudio ? 'Audio playback paused' : 'Playing AI Voice Call recording snippet...');
  };

  const activeAgent = inboundAgents.find(a => a.id === activeInboundAgentId) || inboundAgents[0];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                Arohi Call — Autonomous Inbound Voice Agents
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                150+ Languages
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Deploy AI voice receptionists to attend customer phone calls, qualify leads, and book appointments 24/7
            </p>
          </div>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <button
            onClick={() => handleOpenSimulator(activeAgent)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Test Inbound Call</span>
          </button>

          <button
            onClick={handleCreateAgent}
            className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create Voice Agent</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1 rounded-xl border border-black/[0.04] dark:border-white/[0.06] overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'agents'
              ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Inbound Voice Agents ({inboundAgents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('telecom')}
          className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'telecom'
              ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Numbers & 1-Click Forwarding</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'logs'
              ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call Intelligence Logs ({safeCalls.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('workflows')}
          className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'workflows'
              ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Knowledge & Auto-Actions</span>
        </button>
      </div>

      {/* TAB 1: INBOUND VOICE AGENTS */}
      {activeTab === 'agents' && (
        <div className="space-y-4">
          
          {/* Quick Info Banner */}
          <div className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 dark:from-purple-950/40 dark:via-[#121214] dark:to-indigo-950/40 border border-purple-200 dark:border-purple-800/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0">
                <Mic className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                    Arohi Sovereign Voice Engine Active
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mt-0.5">
                  Autonomous Inbound Telephony Receptionists
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Select any agent below to test inbound conversations, adjust dialect / knowledge, or connect to your phone number.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-white dark:bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-black/[0.06] dark:border-white/[0.08] text-center">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Active Agents</span>
                <p className="font-bold text-purple-600 dark:text-purple-400 text-sm">
                  {inboundAgents.filter(a => a.isActive).length} / {inboundAgents.length}
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-black/[0.06] dark:border-white/[0.08] text-center">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Avg Response</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">380 ms</p>
              </div>
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inboundAgents.map((agent) => {
              const isSelected = agent.id === activeInboundAgentId;
              return (
                <div
                  key={agent.id}
                  onClick={() => setActiveInboundAgentId(agent.id)}
                  className={`bg-white dark:bg-[#121214] rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                      : 'border-black/[0.06] dark:border-white/[0.08] hover:border-purple-300 dark:hover:border-purple-700 shadow-xs'
                  }`}
                >
                  {/* Top Row: Avatar & Status */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-base">
                          {agent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                              {agent.name}
                            </h3>
                            {isSelected && (
                              <span className="px-1.5 py-0.2 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-[9px] font-bold">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                            {agent.role}
                          </p>
                        </div>
                      </div>

                      {/* Active Status Badge */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleAgentActive(agent, e)}
                        className={`px-2 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                          agent.isActive
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700'
                        }`}
                        title="Click to toggle active state"
                      >
                        {agent.isActive ? '● Live' : '○ Paused'}
                      </button>
                    </div>

                    {/* Department & Specs */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-300">
                        <span className="text-[11px] text-zinc-400">Department:</span>
                        <span className="font-semibold text-[11px]">{agent.department}</span>
                      </div>
                      <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-300">
                        <span className="text-[11px] text-zinc-400">Language:</span>
                        <span className="font-semibold text-[11px] text-purple-600 dark:text-purple-400">{agent.language}</span>
                      </div>
                      <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-300">
                        <span className="text-[11px] text-zinc-400">Virtual DID:</span>
                        <span className="font-mono text-[11px] text-zinc-700 dark:text-zinc-200">{agent.assignedPhoneNumber}</span>
                      </div>
                    </div>

                    {/* Sample Greeting Quote */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.06] text-[11px] text-zinc-600 dark:text-zinc-300 italic line-clamp-2">
                      "{agent.greetingMessage}"
                    </div>

                    {/* Automated Feature Badges */}
                    <div className="flex flex-wrap gap-1 text-[9px] pt-1">
                      {agent.autoActions?.createCrmLead && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                          ✓ CRM Leads
                        </span>
                      )}
                      {agent.autoActions?.bookCalendarAppointment && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                          ✓ Auto Booking
                        </span>
                      )}
                      {agent.autoActions?.sendWhatsAppNotification && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                          ✓ WhatsApp Alerts
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSimulator(agent);
                      }}
                      className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Test Call</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAgent(agent);
                      }}
                      className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                      title="Configure Agent Settings"
                    >
                      <Settings2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: TELECOM NUMBERS & 1-CLICK FORWARDING */}
      {activeTab === 'telecom' && (
        <div className="space-y-4">
          
          <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                  1-Click Call Forwarding Setup (Indian Telecom Carriers)
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Dial the quick USSD code below from your business phone (Jio, Airtel, Vi, BSNL) to route incoming customer calls straight to your Arohi AI voice receptionist.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              
              {/* Jio */}
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">Reliance Jio</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    4G / 5G
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">Unconditional (All Calls):</p>
                <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-2 rounded-lg border border-black/[0.06] font-mono text-xs font-bold text-zinc-900 dark:text-white">
                  <span>*401*{activeAgent?.assignedPhoneNumber || '+918047129901'}</span>
                  <button
                    onClick={() => handleCopyCode(`*401*${activeAgent?.assignedPhoneNumber || '+918047129901'}`, 'Jio Forwarding Code')}
                    className="p-1 text-zinc-400 hover:text-purple-600 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-400">To cancel Jio forwarding: Dial <code>*402</code></p>
              </div>

              {/* Airtel */}
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-600 dark:text-red-400 text-sm">Bharti Airtel</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                    4G / 5G
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">Unconditional (All Calls):</p>
                <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-2 rounded-lg border border-black/[0.06] font-mono text-xs font-bold text-zinc-900 dark:text-white">
                  <span>**21*{activeAgent?.assignedPhoneNumber || '+918047129901'}#</span>
                  <button
                    onClick={() => handleCopyCode(`**21*${activeAgent?.assignedPhoneNumber || '+918047129901'}#`, 'Airtel Forwarding Code')}
                    className="p-1 text-zinc-400 hover:text-purple-600 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-400">To cancel Airtel forwarding: Dial <code>##21#</code></p>
              </div>

              {/* Vodafone Idea (Vi) */}
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">Vodafone Idea (Vi)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    GSM
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">Unconditional (All Calls):</p>
                <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-2 rounded-lg border border-black/[0.06] font-mono text-xs font-bold text-zinc-900 dark:text-white">
                  <span>**21*{activeAgent?.assignedPhoneNumber || '+918047129901'}#</span>
                  <button
                    onClick={() => handleCopyCode(`**21*${activeAgent?.assignedPhoneNumber || '+918047129901'}#`, 'Vi Forwarding Code')}
                    className="p-1 text-zinc-400 hover:text-purple-600 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-400">To cancel Vi forwarding: Dial <code>##21#</code></p>
              </div>

              {/* BSNL & Landlines */}
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">BSNL / MTNL</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    National
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">Unconditional (All Calls):</p>
                <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-2 rounded-lg border border-black/[0.06] font-mono text-xs font-bold text-zinc-900 dark:text-white">
                  <span>*21*{activeAgent?.assignedPhoneNumber || '+918047129901'}#</span>
                  <button
                    onClick={() => handleCopyCode(`*21*${activeAgent?.assignedPhoneNumber || '+918047129901'}#`, 'BSNL Forwarding Code')}
                    className="p-1 text-zinc-400 hover:text-purple-600 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-400">To cancel BSNL forwarding: Dial <code>#21#</code></p>
              </div>

            </div>
          </div>

          {/* Carrier Webhook & SIP Trunk Integration */}
          <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Direct SIP Trunk & Telephony Carrier Webhook
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Connect Exotel, Tata Tele Business Services (TTBS), Airtel IQ, or Twilio directly to Arohi Voice Engine.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-mono text-[11px] border border-purple-200 dark:border-purple-800">
                HTTP POST / XML & JSON
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Carrier Inbound Webhook URL:</label>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] font-mono text-xs">
                  <span className="text-purple-600 dark:text-purple-400 truncate">https://arohiai.com/api/arohi-one/voice-agents/webhook/inbound</span>
                  <button
                    onClick={() => handleCopyCode('https://arohiai.com/api/arohi-one/voice-agents/webhook/inbound', 'Webhook URL')}
                    className="p-1 text-zinc-400 hover:text-purple-600 cursor-pointer shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">SIP Domain / Dispatcher:</label>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] font-mono text-xs">
                  <span className="text-zinc-800 dark:text-zinc-200">sip:telephony.arohiai.com:5060</span>
                  <button
                    onClick={() => handleCopyCode('sip:telephony.arohiai.com:5060', 'SIP Domain')}
                    className="p-1 text-zinc-400 hover:text-purple-600 cursor-pointer shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: CALL INTELLIGENCE LOGS */}
      {activeTab === 'logs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Calls Log Table */}
          <div className="lg:col-span-7 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Autonomous Inbound Call Logs</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                  Inbound customer calls attended by Arohi AI voice receptionists
                </p>
              </div>
              <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{safeCalls.length} Calls Recorded</span>
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {safeCalls.map((call) => {
                const isSelected = selectedCall?.id === call.id;
                return (
                  <div
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-500 ring-1 ring-purple-500'
                        : 'bg-zinc-50/80 dark:bg-zinc-900/80 border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          call.callType === 'inbound' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                        }`}>
                          {call.callType === 'inbound' ? <PhoneIncoming className="w-3.5 h-3.5" /> : <PhoneOutgoing className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{call.callerName}</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{call.companyName} • <span className="font-mono text-[10px] text-zinc-400">{call.callerPhone}</span></p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{call.audioDuration}</span>
                        <p className="text-[10px] text-zinc-400">{call.timestamp}</p>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 line-clamp-2 bg-white dark:bg-[#18181b] p-2 rounded-lg border border-black/[0.04] dark:border-white/[0.06]">
                      <strong className="text-purple-600 dark:text-purple-300">AI Summary:</strong> {call.callSummary}
                    </p>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px]">
                      <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] border ${
                        call.sentiment === 'positive'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                      }`}>
                        {call.sentiment} Sentiment
                      </span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">View Transcript & Audio &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call Detail & Audio Player */}
          <div className="lg:col-span-5 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
            {selectedCall ? (
              <div className="space-y-3.5 animate-in fade-in duration-150">
                <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                  <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider">Call Intelligence File</span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">{selectedCall.callerName}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{selectedCall.companyName} ({selectedCall.callerPhone})</p>
                </div>

                {/* Audio Playback Simulator */}
                <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleTogglePlay}
                        className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      >
                        {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">Call Audio Recording</span>
                        <p className="text-[10px] text-zinc-400">{selectedCall.audioDuration} • Dual-channel WAV</p>
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  {/* Audio Waveform visualization */}
                  <div className="h-4 flex items-center gap-1 overflow-hidden pt-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isPlayingAudio ? 'bg-purple-500 animate-pulse' : 'bg-zinc-300 dark:bg-zinc-700'
                        }`}
                        style={{ height: `${Math.sin(i) * 12 + 14}px` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Full Transcription */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Speech-To-Text Transcription</span>
                  </span>
                  <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06] text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {selectedCall.transcriptionSnippet}
                  </div>
                </div>

                {/* AI Extracted Action Items */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>AI Automated Action Items</span>
                  </span>
                  <div className="space-y-1.5">
                    {(selectedCall.actionItems || []).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-50/80 dark:bg-zinc-900/80 p-2 rounded-lg border border-black/[0.04] dark:border-white/[0.06]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-10 text-center text-zinc-400 text-xs font-medium space-y-2">
                <PhoneCall className="w-7 h-7 mx-auto text-zinc-400" />
                <p>Select any recorded call from the left to inspect audio, AI speech transcript, and CRM sync.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 4: KNOWLEDGE & AUTO-ACTIONS */}
      {activeTab === 'workflows' && (
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-6 space-y-5 shadow-xs text-xs">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
              Business Voice Agent Automation Rules
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              When an inbound customer call finishes, Arohi AI automatically triggers the following workflows:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/70 dark:bg-zinc-900/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs">CRM Lead Ingestion</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Extracts caller's name, company, requirement, and estimated deal value directly into CRM Leads pipeline with AI Score.
              </p>
              <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                ● Enabled
              </span>
            </div>

            <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/70 dark:bg-zinc-900/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs">Slot Reservation</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Matches caller's requested time against working hours and books confirmed consultation into the business calendar.
              </p>
              <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                ● Enabled
              </span>
            </div>

            <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/70 dark:bg-zinc-900/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs">Instant WhatsApp Alerts</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Sends full 3-bullet call summary and action items to the business owner or branch manager immediately.
              </p>
              <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                ● Enabled
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Modals */}
      <InboundAgentModal
        isOpen={isAgentModalOpen}
        onClose={() => {
          setIsAgentModalOpen(false);
          setAgentToEdit(null);
        }}
        agentToEdit={agentToEdit}
      />

      <InboundCallSimulatorModal
        isOpen={isCallSimulatorOpen}
        onClose={() => {
          setIsCallSimulatorOpen(false);
          setSelectedAgentForCall(null);
        }}
        selectedAgent={selectedAgentForCall}
      />

    </div>
  );
}
