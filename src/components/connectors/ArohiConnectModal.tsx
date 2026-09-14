import React, { useState, useMemo } from 'react';
import { 
  X, Search, Sparkles, ShieldCheck, CheckCircle2, Globe, Link2, 
  Key, Plus, ExternalLink, ArrowRight, RefreshCw, Power, Settings2,
  SlidersHorizontal, Zap, Layers, Trash2, Terminal, AlertCircle
} from 'lucide-react';
import { 
  ALL_CONNECTORS, CONNECTOR_CATEGORIES, 
  getStoredActiveConnectors, removeActiveConnector, saveActiveConnector 
} from '../../data/connectorsData';
import { ConnectorDefinition, ConnectorCategory, ActiveConnectorConfig } from '../../types/connectors';
import ConnectorConfigModal from './ConnectorConfigModal';
import CustomApiBuilderModal from './CustomApiBuilderModal';

interface ArohiConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendPromptToChat?: (promptText: string) => void;
  isDarkMode?: boolean;
}

export default function ArohiConnectModal({
  isOpen,
  onClose,
  onSendPromptToChat,
  isDarkMode = true
}: ArohiConnectModalProps) {
  const [activeConnectors, setActiveConnectors] = useState<ActiveConnectorConfig[]>(() => getStoredActiveConnectors());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Modals for sub-flows
  const [configTargetConnector, setConfigTargetConnector] = useState<ConnectorDefinition | null>(null);
  const [isCustomApiModalOpen, setIsCustomApiModalOpen] = useState(false);
  const [customConnectors, setCustomConnectors] = useState<ConnectorDefinition[]>([]);

  // Filtered connectors
  const displayedConnectors = useMemo(() => {
    const combined = [...ALL_CONNECTORS, ...customConnectors];
    return combined.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.actions.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.samplePrompt.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, customConnectors]);

  // Active connector lookup map
  const activeMap = useMemo(() => {
    const map = new Map<string, ActiveConnectorConfig>();
    activeConnectors.forEach(a => map.set(a.connectorId, a));
    return map;
  }, [activeConnectors]);

  if (!isOpen) return null;

  const handleConnectorSaved = (newConfig: ActiveConnectorConfig) => {
    setActiveConnectors(getStoredActiveConnectors());
  };

  const handleDisconnect = (connectorId: string) => {
    removeActiveConnector(connectorId);
    setActiveConnectors(getStoredActiveConnectors());
  };

  const handleCustomCreated = (newDef: ConnectorDefinition, newConfig: ActiveConnectorConfig) => {
    setCustomConnectors(prev => [newDef, ...prev]);
    setActiveConnectors(getStoredActiveConnectors());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-5xl h-[92vh] max-h-[880px] ${
          isDarkMode ? 'bg-[#070b16] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        } border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col`}
      >
        {/* Top Header */}
        <div className={`px-5 py-4 border-b ${
          isDarkMode ? 'border-slate-800/80 bg-[#090e1f]' : 'border-slate-100 bg-slate-50'
        } flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base sm:text-lg tracking-tight">Arohi Connect™</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {activeConnectors.length} Connected
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Secure universal integrations & custom REST webhooks for AI-driven professional tasks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCustomApiModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/60 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom API</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Connections Quick Strip */}
        {activeConnectors.length > 0 && (
          <div className={`px-5 py-2.5 border-b ${
            isDarkMode ? 'border-slate-800/60 bg-[#0a1024]/50' : 'border-slate-100 bg-slate-50/50'
          } shrink-0 overflow-x-auto flex items-center gap-2.5`}>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5 mr-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Vault:
            </span>
            {activeConnectors.map(c => (
              <div
                key={c.connectorId}
                className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-200 shrink-0"
              >
                <span className="font-medium">{c.name}</span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {c.pingLatencyMs ? `${c.pingLatencyMs}ms` : 'active'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDisconnect(c.connectorId)}
                  className="text-slate-500 hover:text-rose-400 p-0.5 rounded-full"
                  title="Disconnect"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className={`p-4 border-b ${
          isDarkMode ? 'border-slate-800/70 bg-[#080d1b]' : 'border-slate-100 bg-slate-50/80'
        } shrink-0 space-y-3`}>
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100+ connectors, protocols or sample actions (e.g. Sheets, WhatsApp, Tally, Slack)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 focus:outline-none text-slate-200 placeholder:text-slate-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              All Integrations ({ALL_CONNECTORS.length + customConnectors.length})
            </button>
            {CONNECTOR_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Connectors Catalog Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1">
          {displayedConnectors.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <Layers className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm font-medium">No connectors match "{searchQuery}"</p>
              <button
                onClick={() => setIsCustomApiModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white inline-flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Connect via Custom REST API
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {displayedConnectors.map(connector => {
                const active = activeMap.get(connector.id);
                return (
                  <div
                    key={connector.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      active
                        ? isDarkMode
                          ? 'bg-slate-900/60 border-indigo-500/40 shadow-xs'
                          : 'bg-indigo-50/40 border-indigo-200 shadow-xs'
                        : isDarkMode
                          ? 'bg-[#0b1021]/60 hover:bg-[#0e152b]/80 border-slate-800/80 hover:border-slate-700/80'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Top App Row */}
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl p-1.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shrink-0">
                            {connector.logoText || '⚡'}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-xs sm:text-sm text-slate-100">{connector.name}</h3>
                              {active && (
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Active"></span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 capitalize">{connector.category.replace('_', ' ')}</span>
                          </div>
                        </div>

                        {connector.badge && (
                          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {connector.badge}
                          </span>
                        )}
                      </div>

                      {/* Tagline */}
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                        {connector.tagline}
                      </p>

                      {/* Supported Protocols Badges */}
                      <div className="flex flex-wrap gap-1 mb-3.5">
                        {connector.supportedProtocols.map(p => (
                          <span
                            key={p}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400"
                          >
                            {p === 'oauth' ? '1-Click' : p === 'api_key' ? 'API Key' : p === 'webhook' ? 'Webhook' : p === 'direct_intent' ? 'Live Handoff' : 'REST'}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                      {/* Try Prompt in Chat */}
                      {connector.actions[0] && onSendPromptToChat ? (
                        <button
                          type="button"
                          onClick={() => {
                            onSendPromptToChat(connector.actions[0].samplePrompt);
                            onClose();
                          }}
                          className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                          title="Try this action directly in chat"
                        >
                          <span>Try Action</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <div></div>
                      )}

                      {/* Connect / Manage Button */}
                      {active ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setConfigTargetConnector(connector)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Settings2 className="w-3 h-3 text-slate-400" />
                            <span>Config</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDisconnect(connector.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Disconnect"
                          >
                            <Power className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : connector.defaultProtocol === 'direct_intent' ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (connector.actions[0] && onSendPromptToChat) {
                              onSendPromptToChat(connector.actions[0].samplePrompt);
                              onClose();
                            } else {
                              setConfigTargetConnector(connector);
                            }
                          }}
                          className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-600 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Use in Chat</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfigTargetConnector(connector)}
                          className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-xs transition-all cursor-pointer"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className={`px-5 py-3 border-t ${
          isDarkMode ? 'border-slate-800/80 bg-[#090e1f]' : 'border-slate-100 bg-slate-50'
        } flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 shrink-0`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted local credential vault with human-in-the-loop safety approvals.</span>
          </div>

          <button
            onClick={() => setIsCustomApiModalOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer sm:hidden"
          >
            <Plus className="w-3.5 h-3.5" /> Connect Custom API / Webhook
          </button>
        </div>
      </div>

      {/* Sub-modal for Connector Config */}
      {configTargetConnector && (
        <ConnectorConfigModal
          connector={configTargetConnector}
          existingConfig={activeMap.get(configTargetConnector.id)}
          isOpen={Boolean(configTargetConnector)}
          onClose={() => setConfigTargetConnector(null)}
          onSaved={handleConnectorSaved}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Sub-modal for Custom API Builder */}
      {isCustomApiModalOpen && (
        <CustomApiBuilderModal
          isOpen={isCustomApiModalOpen}
          onClose={() => setIsCustomApiModalOpen(false)}
          onCreated={handleCustomCreated}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
