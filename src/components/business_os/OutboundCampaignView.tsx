import React, { useState } from 'react';
import {
  PhoneOutgoing,
  Play,
  Pause,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Users,
  Calendar,
  Sparkles,
  PhoneCall,
  FileSpreadsheet,
  Settings,
  ChevronRight,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';
import ExotelDirectDialerModal from './ExotelDirectDialerModal';

export interface OutboundCampaign {
  id: string;
  name: string;
  status: 'active' | 'scheduled' | 'paused' | 'completed';
  agentName: string;
  flowName: string;
  totalContacts: number;
  completedCalls: number;
  answeredCount: number;
  qualifiedCount: number;
  startDate: string;
  callingWindow: string;
  concurrentLines: number;
  scriptOpening: string;
}

const INITIAL_CAMPAIGNS: OutboundCampaign[] = [
  {
    id: 'camp-gst-recovery',
    name: 'Q3 MSME GST Invoicing & Payment Follow-up',
    status: 'active',
    agentName: 'Arohi Invoicing Agent (Odia + Hinglish)',
    flowName: 'Overdue Invoice Recovery Flow',
    totalContacts: 142,
    completedCalls: 98,
    answeredCount: 84,
    qualifiedCount: 62,
    startDate: '2026-09-08',
    callingWindow: '10:30 AM - 05:30 PM IST',
    concurrentLines: 5,
    scriptOpening: 'Namaskar! Main Arohi Accounts se call kar rahi hoon aapke pending tax invoice ke sambandh mein...'
  },
  {
    id: 'camp-healthcare-checkup',
    name: 'Odisha Rural & Semi-Urban Health Checkup Drive',
    status: 'active',
    agentName: 'Arohi Swasthya Caretaker (Odia 100%)',
    flowName: 'Health Consultation & Booking Flow',
    totalContacts: 320,
    completedCalls: 215,
    answeredCount: 196,
    qualifiedCount: 148,
    startDate: '2026-09-07',
    callingWindow: '09:00 AM - 04:00 PM IST',
    concurrentLines: 8,
    scriptOpening: 'ନମସ୍କାର! ଆରୋହୀ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର ତରଫରୁ ଆପଣଙ୍କ ମାଗଣା ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା ପାଇଁ କଲ୍ କରୁଛୁ...'
  },
  {
    id: 'camp-vip-demo',
    name: 'Sovereign Business OS Onboarding Outbound Campaign',
    status: 'scheduled',
    agentName: 'Arohi Executive Growth Agent',
    flowName: 'Enterprise Demo Confirmation Flow',
    totalContacts: 85,
    completedCalls: 0,
    answeredCount: 0,
    qualifiedCount: 0,
    startDate: '2026-09-10',
    callingWindow: '11:00 AM - 06:00 PM IST',
    concurrentLines: 3,
    scriptOpening: 'Hello! This is Arohi calling to confirm your upcoming executive briefing session...'
  }
];

export default function OutboundCampaignView({ onLaunchTestCall }: { onLaunchTestCall?: (openingScript: string) => void }) {
  const { showToast } = useBusinessOS();
  const [campaigns, setCampaigns] = useState<OutboundCampaign[]>(INITIAL_CAMPAIGNS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'scheduled' | 'paused'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExotelDialer, setShowExotelDialer] = useState(false);
  const [isPlayingScriptId, setIsPlayingScriptId] = useState<string | null>(null);

  // New campaign form state
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newAgentName, setNewAgentName] = useState('Arohi Executive Intake Agent');
  const [newScript, setNewScript] = useState('ନମସ୍କାର! ଆରୋହୀ ଏଣ୍ଟରପ୍ରାଇଜେସ୍ ତରଫରୁ ସ୍ୱାଗତ। ମୁଁ ଆପଣଙ୍କ ସହିତ ଏକ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଅପଡେଟ୍ ସେୟାର କରିବାକୁ କଲ୍ କରିଛି।');
  const [newContactsCount, setNewContactsCount] = useState(50);
  const [newLines, setNewLines] = useState(4);

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalContactsAcross = campaigns.reduce((acc, c) => acc + c.totalContacts, 0);
  const totalCompletedCalls = campaigns.reduce((acc, c) => acc + c.completedCalls, 0);
  const totalQualifiedLeads = campaigns.reduce((acc, c) => acc + c.qualifiedCount, 0);
  const averageAnswerRate = totalCompletedCalls > 0 
    ? Math.round((campaigns.reduce((acc, c) => acc + c.answeredCount, 0) / totalCompletedCalls) * 100) 
    : 85;

  const handleToggleStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'active' ? 'paused' : 'active';
        showToast(`Campaign "${c.name}" is now ${nextStatus.toUpperCase()}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handlePlayScript = (camp: OutboundCampaign) => {
    if (isPlayingScriptId === camp.id) {
      stopArohiVoice();
      setIsPlayingScriptId(null);
      return;
    }

    stopArohiVoice();
    setIsPlayingScriptId(camp.id);
    showToast(`Playing Outbound Pitch with Arohi Voice...`);

    playArohiVoice(camp.scriptOpening, {
      voice: 'Zypher',
      onStart: () => setIsPlayingScriptId(camp.id),
      onEnd: () => setIsPlayingScriptId(null),
      onError: () => setIsPlayingScriptId(null)
    });
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;

    const newCamp: OutboundCampaign = {
      id: `camp-${Date.now()}`,
      name: newCampaignName,
      status: 'active',
      agentName: newAgentName,
      flowName: 'Custom Visual Flow',
      totalContacts: newContactsCount,
      completedCalls: 0,
      answeredCount: 0,
      qualifiedCount: 0,
      startDate: new Date().toISOString().split('T')[0],
      callingWindow: '10:00 AM - 06:00 PM IST',
      concurrentLines: newLines,
      scriptOpening: newScript
    };

    setCampaigns(prev => [newCamp, ...prev]);
    setShowCreateModal(false);
    setNewCampaignName('');
    showToast(`Outbound Campaign "${newCamp.name}" launched successfully!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <PhoneOutgoing className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              Outbound Voice Campaign Engine
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Sub-500ms Active Dialer
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Autonomous multi-line outbound voice calling with dynamic 22 Indian languages code-switching
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowExotelDialer(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95 shrink-0"
          >
            <PhoneOutgoing className="w-3.5 h-3.5 text-amber-300" />
            <span>Direct Dial Number (Exotel)</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Outbound Campaign</span>
          </button>
        </div>
      </div>

      {/* KPI Performance Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-1">
            <span>Target Queue</span>
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            {totalContactsAcross.toLocaleString()}
          </div>
          <p className="text-[10px] text-zinc-400 mt-0.5">Contacts across all campaigns</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-1">
            <span>Executed Dials</span>
            <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {totalCompletedCalls.toLocaleString()}
          </div>
          <p className="text-[10px] text-zinc-400 mt-0.5">Completed voice sessions</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-1">
            <span>Answer Rate</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {averageAnswerRate}%
          </div>
          <p className="text-[10px] text-zinc-400 mt-0.5">Live caller pickup ratio</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-1">
            <span>Qualified Conversions</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
          </div>
          <div className="text-2xl font-black text-[#d4af37]">
            {totalQualifiedLeads.toLocaleString()}
          </div>
          <p className="text-[10px] text-zinc-400 mt-0.5">Payment / Demo / Lead Locked</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search campaigns or agents..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.08] text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-stretch sm:self-auto overflow-x-auto text-xs">
          {(['all', 'active', 'scheduled', 'paused'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize cursor-pointer transition-colors ${
                statusFilter === st
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#121214] text-zinc-600 dark:text-zinc-400 border border-black/[0.06] dark:border-white/[0.08]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign List */}
      <div className="space-y-3">
        {filteredCampaigns.map((camp) => {
          const progressPercent = camp.totalContacts > 0 ? Math.round((camp.completedCalls / camp.totalContacts) * 100) : 0;
          const isPlaying = isPlayingScriptId === camp.id;

          return (
            <div
              key={camp.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4 hover:border-purple-500/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {camp.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        camp.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          : camp.status === 'paused'
                          ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                      }`}
                    >
                      {camp.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Assigned Agent: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{camp.agentName}</span> • Flow: <span className="font-semibold text-purple-600 dark:text-purple-400">{camp.flowName}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlayScript(camp)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                      isPlaying
                        ? 'bg-purple-600 text-white border-purple-500 animate-pulse'
                        : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border-black/5 dark:border-white/5'
                    }`}
                    title="Audition Opening Pitch in Arohi Natural Voice"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlaying ? 'Speaking...' : 'Audition Pitch'}</span>
                  </button>

                  <button
                    onClick={() => handleToggleStatus(camp.id)}
                    className={`p-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      camp.status === 'active'
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                        : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                    }`}
                    title={camp.status === 'active' ? 'Pause Campaign' : 'Resume Campaign'}
                  >
                    {camp.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Progress and Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.04] text-xs">
                <div>
                  <span className="text-zinc-400 text-[11px] block">Progress</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {camp.completedCalls} / {camp.totalContacts} ({progressPercent}%)
                  </span>
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-zinc-400 text-[11px] block">Answered &amp; Engaged</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {camp.answeredCount} Calls
                  </span>
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    {camp.completedCalls > 0 ? Math.round((camp.answeredCount / camp.completedCalls) * 100) : 0}% pickup
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 text-[11px] block">Qualified Outcomes</span>
                  <span className="font-bold text-[#d4af37]">
                    {camp.qualifiedCount} Conversions
                  </span>
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    Direct CRM synced
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 text-[11px] block">Concurrency &amp; Window</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {camp.concurrentLines} Lines
                  </span>
                  <span className="text-[10px] text-zinc-500 block mt-1 truncate">
                    {camp.callingWindow}
                  </span>
                </div>
              </div>

              {/* Spoken Script Snippet */}
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 shrink-0">Opening:</span>
                <p className="italic line-clamp-1">{camp.scriptOpening}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE CAMPAIGN MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <PhoneOutgoing className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Create Autonomous Outbound Campaign
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  required
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  placeholder="e.g. Diwali B2B Renewal Calls or GST Reminder"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Assigned Voice Persona
                </label>
                <select
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none font-semibold"
                >
                  <option value="Arohi Executive Intake Agent">Arohi Executive Intake Agent (Signature Voice)</option>
                  <option value="Arohi Invoicing Agent">Arohi Invoicing Agent (Odia + Hinglish)</option>
                  <option value="Arohi Swasthya Caretaker">Arohi Swasthya Caretaker (Native Odia)</option>
                  <option value="Arohi Support Specialist">Arohi Support Specialist (Indian English + Hindi)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Opening Voice Pitch (Spoken Greeting)
                </label>
                <textarea
                  rows={3}
                  required
                  value={newScript}
                  onChange={(e) => setNewScript(e.target.value)}
                  placeholder="Enter the conversational greeting spoken as soon as caller answers..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Target Contacts Count
                  </label>
                  <input
                    type="number"
                    value={newContactsCount}
                    onChange={(e) => setNewContactsCount(parseInt(e.target.value) || 10)}
                    min={1}
                    max={10000}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Max Concurrent Lines
                  </label>
                  <input
                    type="number"
                    value={newLines}
                    onChange={(e) => setNewLines(parseInt(e.target.value) || 1)}
                    min={1}
                    max={20}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Launch Campaign</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {showExotelDialer && (
        <ExotelDirectDialerModal
          isOpen={showExotelDialer}
          onClose={() => setShowExotelDialer(false)}
        />
      )}

    </div>
  );
}
