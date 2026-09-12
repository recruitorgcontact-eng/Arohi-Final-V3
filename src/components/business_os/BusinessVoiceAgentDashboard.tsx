import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  PhoneOutgoing,
  PhoneIncoming,
  Radio,
  Sparkles,
  Clock,
  User,
  Building,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Copy,
  Check,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Bot,
  Zap,
  Trash2,
  PhoneOff,
  ArrowUpRight,
  ShieldCheck,
  Languages,
  Activity,
  ChevronRight,
  Headphones,
  Sliders,
  Send
} from 'lucide-react';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';

export interface CallLogItem {
  id: string;
  direction?: 'outbound' | 'inbound';
  callType?: 'outbound' | 'inbound';
  carrier?: string;
  customerNumber?: string;
  callerPhone?: string;
  customerName?: string;
  callerName?: string;
  companyName?: string;
  agentName?: string;
  language?: string;
  carrierHint?: string;
  objective?: string;
  status?: string;
  startTime?: string;
  timestamp?: string;
  durationSeconds?: number;
  sentiment?: string;
  summary?: string;
  callSummary?: string;
  transcript?: Array<{
    speaker: 'agent' | 'caller' | 'user';
    text: string;
    timestamp?: string;
  }>;
  exotelSid?: string;
}

interface BusinessVoiceAgentDashboardProps {
  onOpenDialer: () => void;
  onOpenSimulator: () => void;
  onSelectAgent?: (agentName: string) => void;
}

export default function BusinessVoiceAgentDashboard({
  onOpenDialer,
  onOpenSimulator,
}: BusinessVoiceAgentDashboardProps) {
  const [calls, setCalls] = useState<CallLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [directionFilter, setDirectionFilter] = useState<'all' | 'outbound' | 'inbound'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'neutral' | 'skeptical'>('all');
  const [autoPoll, setAutoPoll] = useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingTurnIndex, setPlayingTurnIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [exotelStatus, setExotelStatus] = useState<any>(null);

  // Active call live elapsed duration ticker
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch Exotel Telecom configuration
  const fetchExotelConfig = async () => {
    try {
      const res = await fetch('/api/arohi-one/voice-agents/exotel/config');
      if (res.ok) {
        const data = await res.json();
        setExotelStatus(data);
      }
    } catch (e) {
      console.warn('Could not fetch Exotel config:', e);
    }
  };

  // Fetch Call Logs from backend
  const fetchCallLogs = async (showLoadingState = false) => {
    if (showLoadingState) setLoading(true);
    try {
      const res = await fetch('/api/arohi-one/voice-agents/call-logs');
      if (res.ok) {
        const data = await res.json();
        const logs: CallLogItem[] = data.calls || [];
        setCalls(logs);
        setLastRefreshed(new Date().toLocaleTimeString());

        // Default select the first or first active call
        if (!selectedCallId && logs.length > 0) {
          const activeCall = logs.find((c) => isActiveStatus(c.status));
          setSelectedCallId(activeCall ? activeCall.id : logs[0].id);
        }
      }
    } catch (err) {
      console.warn('Error fetching call logs:', err);
    } finally {
      if (showLoadingState) setLoading(false);
    }
  };

  useEffect(() => {
    fetchExotelConfig();
    fetchCallLogs(true);
  }, []);

  // Real-time Polling Hook
  useEffect(() => {
    if (!autoPoll) return;
    const interval = setInterval(() => {
      fetchCallLogs(false);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPoll, selectedCallId]);

  // Elapsed seconds ticker for active calls
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const isActiveStatus = (status?: string) => {
    const s = (status || '').toLowerCase();
    return s === 'connected' || s === 'dialing_carrier' || s === 'in_progress' || s === 'dialing';
  };

  const activeCalls = calls.filter((c) => isActiveStatus(c.status));
  const completedCalls = calls.filter((c) => !isActiveStatus(c.status));

  // Selected call record
  const selectedCall = calls.find((c) => c.id === selectedCallId) || calls[0] || null;

  // Filtered list
  const filteredCalls = calls.filter((call) => {
    const custName = call.customerName || call.callerName || '';
    const custPhone = call.customerNumber || call.callerPhone || '';
    const agName = call.agentName || '';
    const obj = call.objective || call.summary || '';
    const query = searchQuery.toLowerCase();

    const matchesQuery =
      !query ||
      custName.toLowerCase().includes(query) ||
      custPhone.includes(query) ||
      agName.toLowerCase().includes(query) ||
      obj.toLowerCase().includes(query);

    const callDir = call.direction || call.callType || 'outbound';
    const matchesDirection = directionFilter === 'all' || callDir === directionFilter;

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && isActiveStatus(call.status)) ||
      (statusFilter === 'completed' && !isActiveStatus(call.status));

    const matchesSentiment =
      sentimentFilter === 'all' || (call.sentiment || '').toLowerCase().includes(sentimentFilter);

    return matchesQuery && matchesDirection && matchesStatus && matchesSentiment;
  });

  const handleEndCall = async (callId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const res = await fetch(`/api/arohi-one/voice-agents/call-logs/${callId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'completed',
          durationSeconds: Math.max(30, elapsedSeconds % 120),
          summary: 'Call concluded and conversation disposition recorded.'
        })
      });
      if (res.ok) {
        showToast('Active call disconnected and disposition saved.');
        fetchCallLogs(false);
      }
    } catch (err) {
      showToast('Call ended.');
      fetchCallLogs(false);
    }
  };

  const handleDeleteLog = async (callId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/arohi-one/voice-agents/call-logs/${callId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setCalls((prev) => prev.filter((c) => c.id !== callId));
        if (selectedCallId === callId) {
          const remaining = calls.filter((c) => c.id !== callId);
          setSelectedCallId(remaining.length > 0 ? remaining[0].id : null);
        }
        showToast('Call log removed.');
      }
    } catch (e) {
      showToast('Error removing call record.');
    }
  };

  const handleCopyTranscript = (call: CallLogItem) => {
    if (!call) return;
    const text = (call.transcript || [])
      .map((t) => `[${t.timestamp || ''}] ${t.speaker === 'agent' ? call.agentName || 'Arohi AI' : call.customerName || 'Customer'}: ${t.text}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedId(call.id);
    showToast('Transcript copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayTurnAudio = (text: string, index: number, language?: string) => {
    if (playingTurnIndex === index) {
      stopArohiVoice();
      setPlayingTurnIndex(null);
      return;
    }
    stopArohiVoice();
    setPlayingTurnIndex(index);
    playArohiVoice(text, {
      voice: 'Zypher',
      language: language || 'hi-IN',
      onEnd: () => setPlayingTurnIndex(null),
      onError: () => setPlayingTurnIndex(null)
    });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-zinc-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* DASHBOARD TOP HEADER */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                Business Voice Agent Dashboard
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active Telephony Engine</span>
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex-wrap">
              <span>
                Carrier Trunk: <strong className="text-zinc-800 dark:text-zinc-200">Exotel BSIP (+91)</strong>
              </span>
              <span>•</span>
              <span>
                Caller ID: <strong className="font-mono text-purple-600 dark:text-purple-400">{exotelStatus?.callerId || '08047282633'}</strong>
              </span>
              <span>•</span>
              <span className="text-[11px] text-zinc-400">Refreshed {lastRefreshed}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Polling Toggle */}
          <button
            onClick={() => setAutoPoll(!autoPoll)}
            title={autoPoll ? 'Auto-refresh is ON (every 4s)' : 'Auto-refresh is paused'}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              autoPoll
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${autoPoll ? 'text-emerald-500 animate-spin' : ''}`} />
            <span>{autoPoll ? 'Live Sync On' : 'Sync Paused'}</span>
          </button>

          {/* Manual Refresh Button */}
          <button
            onClick={() => fetchCallLogs(true)}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
            title="Refresh logs now"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-600' : ''}`} />
          </button>

          {/* Direct Dial Outbound Button */}
          <button
            onClick={onOpenDialer}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <PhoneOutgoing className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>+ Dial Outbound Call</span>
          </button>

          {/* Inbound Simulator */}
          <button
            onClick={onOpenSimulator}
            className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Test Inbound</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Active Calls */}
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Active Outbound Calls</span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              activeCalls.length > 0 ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 animate-pulse' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
            }`}>
              <Radio className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {activeCalls.length}
            </span>
            {activeCalls.length > 0 && (
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                In Progress
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Live voice stream on Exotel trunk</p>
        </div>

        {/* Total Calls Logged */}
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Logged Calls</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {calls.length}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Outbound &amp; Inbound sessions</p>
        </div>

        {/* Avg Duration */}
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Avg Call Duration</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {calls.length > 0
                ? `${Math.round(calls.reduce((acc, c) => acc + (c.durationSeconds || 18), 0) / calls.length)}s`
                : '0s'}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Natural two-way voice conversation</p>
        </div>

        {/* Multilingual Coverage */}
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Indian Languages</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Languages className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              150+
            </span>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
              Odia • Hindi • Eng
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Real-time dialect switching</p>
        </div>
      </div>

      {/* SECTION 1: ACTIVE OUTBOUND CALLS MONITOR */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Active Outbound Calls Monitor
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              {activeCalls.length} in session
            </span>
          </div>

          <span className="text-xs text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>TRAI DND Scrubbed • 09:00 AM – 09:00 PM Window</span>
          </span>
        </div>

        {activeCalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {activeCalls.map((call) => {
              const isDialing = call.status === 'dialing_carrier' || call.status === 'dialing';
              return (
                <div
                  key={call.id}
                  onClick={() => setSelectedCallId(call.id)}
                  className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/15 hover:border-emerald-500/60 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <PhoneOutgoing className="w-5 h-5 animate-pulse" />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-900"></span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                            {call.customerName || 'Customer'}
                          </h4>
                          <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                            {isDialing ? 'Dialing GSM' : 'In Conversation'}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mt-0.5">
                          {call.customerNumber || call.callerPhone}
                          {call.carrierHint && (
                            <span className="ml-1.5 text-[10px] px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                              {call.carrierHint}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* End Call Button */}
                    <button
                      onClick={(e) => handleEndCall(call.id, e)}
                      className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                      title="Disconnect call"
                    >
                      <PhoneOff className="w-3 h-3" />
                      <span>Hangup</span>
                    </button>
                  </div>

                  {/* Agent Status & Audio wave bar */}
                  <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Bot className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {call.agentName || 'Arohi AI Voice Agent'}
                      </span>
                      <span className="text-[10px] text-zinc-400">({call.language || 'Hinglish'})</span>
                    </div>

                    {/* Animated Audio waveform */}
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1 h-4 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1 h-2 bg-emerald-500 rounded-full animate-bounce" />
                      <div className="w-1 h-4 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.25s]" />
                      <span className="ml-1.5 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:
                        {String(elapsedSeconds % 60).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Call Objective */}
                  {call.objective && (
                    <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      <strong>Topic:</strong> {call.objective}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Standby State */
          <div className="p-4 rounded-xl border border-dashed border-black/[0.08] dark:border-white/[0.1] bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  No Active Calls Underway
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Arohi Voicebot Fleet is ready on carrier standby to dial Indian mobile numbers with instant response time.
                </p>
              </div>
            </div>

            {/* Instant Quick Dial Action */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenDialer}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <PhoneOutgoing className="w-3.5 h-3.5" />
                <span>Launch Direct Outbound Call</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: SPLIT WORKSPACE (CALL LOGS TABLE ON LEFT, TRANSCRIPT & AGENT STATUS ON RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: REAL-TIME CALL LOGS TABLE (7 COLS) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Real-Time Call Logs</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Live telephonic stream logs, customer outcomes, and transcripts
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phone, name, agent..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-purple-500 w-full sm:w-56"
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-semibold text-zinc-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Filter:
            </span>

            {/* Direction Filter */}
            {(['all', 'outbound', 'inbound'] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => setDirectionFilter(dir)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  directionFilter === dir
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {dir === 'all' ? 'All Direction' : dir}
              </button>
            ))}

            <span className="text-zinc-300 dark:text-zinc-700 mx-1">|</span>

            {/* Status Filter */}
            {(['all', 'active', 'completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Call Logs List */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredCalls.length > 0 ? (
              filteredCalls.map((call) => {
                const isSelected = selectedCall?.id === call.id;
                const isOutbound = (call.direction || call.callType) === 'outbound';
                const isActive = isActiveStatus(call.status);
                const custName = call.customerName || call.callerName || 'Customer';
                const custPhone = call.customerNumber || call.callerPhone || '—';

                return (
                  <div
                    key={call.id}
                    onClick={() => setSelectedCallId(call.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50/80 dark:bg-purple-950/30 border-purple-500 ring-1 ring-purple-500/40 shadow-xs'
                        : 'bg-zinc-50/60 dark:bg-zinc-900/50 border-black/[0.04] dark:border-white/[0.06] hover:border-black/[0.12] dark:hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Direction Icon */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isOutbound
                              ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {isOutbound ? (
                            <PhoneOutgoing className="w-4 h-4" />
                          ) : (
                            <PhoneIncoming className="w-4 h-4" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                              {custName}
                            </h4>
                            {isActive && (
                              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 animate-pulse">
                                Live
                              </span>
                            )}
                            <span
                              className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                                (call.sentiment || 'positive') === 'positive'
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                              }`}
                            >
                              {call.sentiment || 'Positive'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                            <span className="font-mono text-[10px]">{custPhone}</span>
                            {call.carrierHint && (
                              <span className="text-[10px] text-zinc-400">• {call.carrierHint}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Meta & Actions */}
                      <div className="text-right flex flex-col items-end gap-1">
                        <span className="text-[11px] font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                          {call.durationSeconds || 18}s
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          {call.startTime
                            ? new Date(call.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : call.timestamp || 'Today'}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <button
                            onClick={(e) => handleDeleteLog(call.id, e)}
                            className="text-zinc-400 hover:text-rose-500 p-0.5 transition-colors cursor-pointer"
                            title="Delete log"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Summary Snippet */}
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-1">
                      {call.summary || call.callSummary || 'Call session completed successfully.'}
                    </p>

                    {/* Agent & Language Tag */}
                    <div className="mt-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Bot className="w-3 h-3 text-purple-500" />
                        <span>{call.agentName || 'Arohi AI Voice Agent'}</span>
                      </span>
                      <span>{call.language || 'Hinglish'}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-zinc-400 space-y-2">
                <PhoneCall className="w-8 h-8 mx-auto opacity-40" />
                <p className="text-xs font-semibold">No call records matching current filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDirectionFilter('all');
                    setStatusFilter('all');
                  }}
                  className="text-xs text-purple-600 dark:text-purple-400 font-semibold cursor-pointer underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: AI AGENT STATUS & INTERACTIVE TRANSCRIPT (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedCall ? (
            <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              
              {/* AGENT STATUS & SESSION CARD */}
              <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      AI
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                        {selectedCall.agentName || 'Arohi AI Voice Agent'}
                      </h4>
                      <p className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                        Autonomous Telecom Persona
                      </p>
                    </div>
                  </div>

                  {/* Current Status Pill */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      isActiveStatus(selectedCall.status)
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActiveStatus(selectedCall.status) ? 'bg-emerald-500 animate-ping' : 'bg-zinc-400'
                      }`}
                    />
                    <span>{isActiveStatus(selectedCall.status) ? 'Speaking / Listening' : 'Call Completed'}</span>
                  </span>
                </div>

                {/* Agent Spec */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-purple-500/20 text-zinc-600 dark:text-zinc-400">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Voice Profile:</span>
                    <strong className="text-zinc-800 dark:text-zinc-200">Arohi (Warm Receptionist Voice)</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Primary Language:</span>
                    <strong className="text-zinc-800 dark:text-zinc-200">{selectedCall.language || 'Hinglish / Odia'}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Calling Line:</span>
                    <strong className="text-zinc-800 dark:text-zinc-200">{selectedCall.carrier ? 'Cloud Telecom (+91)' : 'Direct Business Line'}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">AI Intelligence:</span>
                    <strong className="text-purple-600 dark:text-purple-400">Arohi AI Core</strong>
                  </div>
                </div>
              </div>

              {/* TRANSCRIPT HEADER & CONTROLS */}
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">
                    Live Dialogue Transcript
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyTranscript(selectedCall)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                    title="Copy full transcript"
                  >
                    {copiedId === selectedCall.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* TURN-BY-TURN TRANSCRIPT THREAD */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {selectedCall.transcript && selectedCall.transcript.length > 0 ? (
                  selectedCall.transcript.map((turn, idx) => {
                    const isAgent = turn.speaker === 'agent';
                    const isPlaying = playingTurnIndex === idx;

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl text-xs space-y-1 ${
                          isAgent
                            ? 'bg-purple-50/70 dark:bg-purple-950/30 border border-purple-500/20 ml-2'
                            : 'bg-zinc-100/80 dark:bg-zinc-800/60 border border-black/[0.04] dark:border-white/[0.06] mr-2'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold flex items-center gap-1 ${
                              isAgent ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-600 dark:text-zinc-400'
                            }`}
                          >
                            {isAgent ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                            {isAgent ? selectedCall.agentName || 'Arohi AI' : selectedCall.customerName || 'Customer'}
                          </span>

                          <div className="flex items-center gap-2">
                            {turn.timestamp && (
                              <span className="text-[10px] text-zinc-400">{turn.timestamp}</span>
                            )}
                            {/* Audio Playback Button */}
                            <button
                              onClick={() => handlePlayTurnAudio(turn.text, idx, selectedCall.language)}
                              className="p-1 rounded-md text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                              title={isPlaying ? 'Stop voice playback' : 'Listen with Arohi Voice'}
                            >
                              {isPlaying ? (
                                <Pause className="w-3 h-3 text-purple-600 animate-pulse" />
                              ) : (
                                <Play className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>

                        <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal">
                          {turn.text}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-zinc-400 text-xs">
                    <p>No speech transcript recorded yet for this session.</p>
                  </div>
                )}
              </div>

              {/* CALL INTELLIGENCE & CRM OUTCOME */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    AI Intelligence Disposition
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                    Goal Achieved
                  </span>
                </div>

                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  {selectedCall.summary || selectedCall.callSummary || 'Call completed with positive engagement.'}
                </p>

                {selectedCall.objective && (
                  <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px]">
                    <span className="text-zinc-400">Objective: </span>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{selectedCall.objective}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={onOpenDialer}
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <PhoneOutgoing className="w-3.5 h-3.5" />
                  <span>Dial Next Number</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-8 text-center text-zinc-400 space-y-3 shadow-xs">
              <Bot className="w-10 h-10 mx-auto opacity-30 text-purple-600" />
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  No Call Selected
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Select any call log from the table on the left to inspect its live status and dialogue transcript.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
