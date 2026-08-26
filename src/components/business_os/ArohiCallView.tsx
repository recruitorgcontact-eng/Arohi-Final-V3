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
  Mic
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { TelephonyCallRecord } from './types';

export default function ArohiCallView() {
  const { calls, simulateInboundCall, showToast } = useBusinessOS();
  const [selectedCall, setSelectedCall] = useState<TelephonyCallRecord | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [callerNameInput] = useState('Rajesh Verma');
  const [callerPhoneInput] = useState('+91 98450 12345');

  const handleTestInbound = () => {
    simulateInboundCall(callerNameInput, callerPhoneInput);
  };

  const handleTogglePlay = () => {
    setIsPlayingAudio(!isPlayingAudio);
    showToast(isPlayingAudio ? 'Audio playback paused' : 'Playing AI Voice Call recording snippet...');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Arohi Call — Autonomous AI Telephony & Smart Calling
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Full-duplex voice AI agent: answers customer calls, qualifies enterprise leads, and logs summaries into CRM
            </p>
          </div>
        </div>

        {/* Live Simulator Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleTestInbound}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Simulate Live AI Inbound Call</span>
          </button>
        </div>
      </div>

      {/* AI Voice Agent Status Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 dark:from-purple-950/40 dark:via-[#121214] dark:to-indigo-950/40 border border-purple-200 dark:border-purple-800/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0">
            <Mic className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Virtual IVR Online</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mt-0.5">
              Arohi Voice Core 3.6 • Enterprise Telephony Gateway
            </h3>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
              Assigned Virtual DID: <strong className="text-purple-600 dark:text-purple-400 font-mono">+91 80 4712 9900</strong> (150+ Multilingual AI Support)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-xs w-full md:w-auto">
          <div className="bg-white dark:bg-zinc-900/80 px-3 py-2 rounded-xl border border-black/[0.06] dark:border-white/[0.08]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase">Avg Response Time</span>
            <p className="font-bold text-zinc-900 dark:text-white text-xs">420 ms (Ultra-low)</p>
          </div>
          <div className="bg-white dark:bg-zinc-900/80 px-3 py-2 rounded-xl border border-black/[0.06] dark:border-white/[0.08]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase">AI Lead Conversion</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">84.2% Qualified</p>
          </div>
        </div>
      </div>

      {/* Call History Table & Live Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Calls Log Table */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Recorded Telephony Logs</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Inbound queries, outbound qualification, & AI summaries</p>
            </div>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{calls.length} Total Calls</span>
          </div>

          <div className="space-y-2.5">
            {calls.map((call) => (
              <div
                key={call.id}
                onClick={() => setSelectedCall(call)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedCall?.id === call.id
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
            ))}
          </div>
        </div>

        {/* Call Detail & Audio Player */}
        <div className="lg:col-span-5 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
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
                      <span className="text-xs font-bold text-zinc-900 dark:text-white">Call Recording</span>
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
                <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06] text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-mono">
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

    </div>
  );
}
