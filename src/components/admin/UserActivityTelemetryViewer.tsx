import React, { useState, useMemo } from 'react';
import { 
  Activity, Search, Filter, Download, ArrowUpRight, Copy, Check, MessageSquare, 
  Phone, Award, FileText, Compass, CreditCard, Shield, Globe, Smartphone, Laptop,
  Clock, RefreshCw, ChevronDown, ChevronUp, User, Sparkles
} from 'lucide-react';
import { UserActivityTelemetry, INITIAL_USER_TELEMETRY } from '../../data/adminMockData';

interface UserActivityTelemetryViewerProps {
  telemetryLogs?: UserActivityTelemetry[];
  selectedUserEmail?: string | null;
  onSelectUserEmail?: (email: string | null) => void;
}

export default function UserActivityTelemetryViewer({
  telemetryLogs = INITIAL_USER_TELEMETRY,
  selectedUserEmail = null,
  onSelectUserEmail
}: UserActivityTelemetryViewerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedActionType, setSelectedActionType] = useState<string>('all');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered telemetry list
  const filteredLogs = useMemo(() => {
    return telemetryLogs.filter((log) => {
      // User email filter
      if (selectedUserEmail && log.userEmail.toLowerCase() !== selectedUserEmail.toLowerCase()) {
        return false;
      }
      // Module filter
      if (selectedModule !== 'all' && log.module !== selectedModule) {
        return false;
      }
      // Action type filter
      if (selectedActionType !== 'all' && log.actionType !== selectedActionType) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = log.userName.toLowerCase().includes(q);
        const matchesEmail = log.userEmail.toLowerCase().includes(q);
        const matchesTitle = log.actionTitle.toLowerCase().includes(q);
        const matchesInput = log.inputSnippet.toLowerCase().includes(q);
        const matchesLocation = log.ipLocation.toLowerCase().includes(q);
        return matchesName || matchesEmail || matchesTitle || matchesInput || matchesLocation;
      }
      return true;
    });
  }, [telemetryLogs, selectedUserEmail, selectedModule, selectedActionType, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = ['Log ID', 'User Name', 'User Email', 'Action Type', 'Module', 'Action Title', 'User Input Snippet', 'Output Summary', 'Device', 'Location', 'Timestamp'];
    const rows = filteredLogs.map(l => [
      `"${l.id}"`,
      `"${l.userName}"`,
      `"${l.userEmail}"`,
      `"${l.actionType}"`,
      `"${l.module}"`,
      `"${l.actionTitle.replace(/"/g, '""')}"`,
      `"${l.inputSnippet.replace(/"/g, '""')}"`,
      `"${(l.outputSnippet || '').replace(/"/g, '""')}"`,
      `"${l.device}"`,
      `"${l.ipLocation}"`,
      `"${l.timestamp}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `arohi_user_telemetry_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'chat_query':
        return <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />;
      case 'voice_call':
        return <Phone className="w-3.5 h-3.5 text-purple-400" />;
      case 'mocktest_attempt':
        return <Award className="w-3.5 h-3.5 text-amber-400" />;
      case 'resume_analysis':
        return <FileText className="w-3.5 h-3.5 text-blue-400" />;
      case 'roadmap_generated':
        return <Compass className="w-3.5 h-3.5 text-emerald-400" />;
      case 'payment_made':
        return <CreditCard className="w-3.5 h-3.5 text-[#00e676]" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Telemetry Controls Bar */}
      <div className="bg-[#0e0928]/90 border border-[#2b1b58] p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Keyword Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search user inputs, prompts, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#160f38] border border-[#3b2575] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"
            />
          </div>

          {/* Action Type Filter */}
          <select
            value={selectedActionType}
            onChange={(e) => setSelectedActionType(e.target.value)}
            className="bg-[#160f38] border border-[#3b2575] rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Action Types</option>
            <option value="chat_query">💬 Chat Queries & Prompts</option>
            <option value="mocktest_attempt">🏆 CBT Mock Tests</option>
            <option value="voice_call">🎙️ Hands-Free Voice Calls</option>
            <option value="resume_analysis">📄 ATS Resume Scans</option>
            <option value="roadmap_generated">🗺️ Career Roadmaps & DPRs</option>
            <option value="payment_made">💳 Payments & Upgrades</option>
          </select>

          {/* Module Filter */}
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="bg-[#160f38] border border-[#3b2575] rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Modules</option>
            <option value="Arohi LLM Brain">Arohi LLM Brain</option>
            <option value="CBT Mock Tests">CBT Mock Tests</option>
            <option value="Voice Call AI">Voice Call AI</option>
            <option value="ATS Resume Suite">ATS Resume Suite</option>
            <option value="Career Roadmap">Career Roadmap</option>
            <option value="Finance & Billing">Finance & Billing</option>
          </select>
        </div>

        {/* Export & Active Filter Tag */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {selectedUserEmail && (
            <div className="flex items-center gap-1 bg-purple-950/70 border border-purple-500/40 px-2.5 py-1.5 rounded-xl text-[10px] text-purple-300 font-mono">
              <User className="w-3 h-3 text-purple-400" />
              <span>{selectedUserEmail}</span>
              {onSelectUserEmail && (
                <button
                  onClick={() => onSelectUserEmail(null)}
                  className="ml-1 text-slate-400 hover:text-white cursor-pointer font-bold"
                  title="Clear user filter"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          <button
            onClick={handleExportCSV}
            className="bg-[#1b1442] hover:bg-[#2e1f6e] border border-[#3c2885] text-cyan-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Download full CSV of filtered telemetry logs"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Telemetry Stream List */}
      <div className="bg-[#090715]/75 border border-[#2b1b54]/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-3.5 bg-[#120d2c]/65 border-b border-[#2b1b54] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Granular User Input & Action Telemetry
            </h4>
            <span className="bg-purple-950/80 text-purple-300 border border-purple-500/30 text-[9px] font-mono px-2 py-0.5 rounded-full">
              {filteredLogs.length} Events Recorded
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live Ingestion Stream
          </span>
        </div>

        <div className="divide-y divide-[#221644] max-h-[560px] overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              No user input or activity telemetry logs matching the current filter criteria.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isExpanded = expandedLogId === log.id;
              return (
                <div key={log.id} className="p-4 hover:bg-purple-950/15 transition-all text-xs">
                  {/* Summary Header Line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="p-2 bg-[#170e36] border border-[#301c6e] rounded-xl shrink-0 mt-0.5 sm:mt-0">
                        {getActionIcon(log.actionType)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-black text-white text-xs">{log.userName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({log.userEmail})</span>
                          <span className="bg-[#150d32] border border-[#2d1b58] text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded text-cyan-300">
                            {log.module}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-purple-300 mt-0.5">
                          {log.actionTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {log.timestamp}
                      </span>
                      <button
                        onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title={isExpanded ? 'Collapse event' : 'Expand full input & payload'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Immediate Input Preview */}
                  <div className="mt-2.5 bg-[#0e0a24]/80 border border-[#26174a] p-3 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> User Input / Exact Query:
                      </span>
                      <button
                        onClick={() => handleCopy(log.inputSnippet, log.id)}
                        className="text-[9px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors cursor-pointer"
                      >
                        {copiedId === log.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copiedId === log.id ? 'Copied' : 'Copy Prompt'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-200 font-mono leading-relaxed bg-[#070414] p-2.5 rounded-lg border border-[#1b1138]">
                      "{log.inputSnippet}"
                    </p>
                  </div>

                  {/* Expanded Inspector Panel */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-[#221644] grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] animate-in fade-in duration-150">
                      {log.outputSnippet && (
                        <div className="bg-[#120a2e]/60 border border-[#2b1754] p-3 rounded-xl md:col-span-2">
                          <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                            Arohi AI Response / Action Result:
                          </span>
                          <p className="text-slate-300 leading-relaxed font-sans">{log.outputSnippet}</p>
                        </div>
                      )}

                      <div className="bg-[#110c2c]/40 border border-[#231548] p-2.5 rounded-xl flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
                        <div>
                          <span className="text-[8px] uppercase font-bold text-slate-500 block">Device & Client</span>
                          <span className="text-[10px] font-mono text-slate-300">{log.device}</span>
                        </div>
                      </div>

                      <div className="bg-[#110c2c]/40 border border-[#231548] p-2.5 rounded-xl flex items-center gap-2">
                        <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                        <div>
                          <span className="text-[8px] uppercase font-bold text-slate-500 block">IP Location & ISP</span>
                          <span className="text-[10px] font-mono text-slate-300">{log.ipLocation}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
