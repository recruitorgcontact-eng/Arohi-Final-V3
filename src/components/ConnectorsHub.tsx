import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Check, Plus, ExternalLink, ShieldCheck, Zap, ArrowRight,
  Sparkles, Lock, X, RefreshCw, Key, Globe, CheckCircle2, ChevronRight,
  Database, FileText, Mail, Calendar, Folder, MessageSquare, Code, CreditCard,
  Building, AlertCircle, ArrowLeft, Layers, Sliders
} from 'lucide-react';
import { 
  AROHI_CONNECTORS, 
  CONNECTOR_CATEGORIES, 
  ConnectorCategory, 
  ConnectorItem 
} from '../data/connectorsData';

interface ConnectorsHubProps {
  isDarkMode?: boolean;
  onOpenChatWithPrompt?: (promptText: string) => void;
  onNavigateHome?: () => void;
  onOpenAuth?: () => void;
}

const STORAGE_KEY_CONNECTED = 'arohi_user_connected_connectors';

export default function ConnectorsHub({
  isDarkMode = true,
  onOpenChatWithPrompt,
  onNavigateHome,
  onOpenAuth
}: ConnectorsHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ConnectorCategory>('all');
  const [selectedConnector, setSelectedConnector] = useState<ConnectorItem | null>(null);
  
  // Track user-connected connectors in local storage
  const [connectedIds, setConnectedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONNECTED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load connected connectors', e);
    }
    // Default core connected items
    return ['google-drive', 'gmail', 'google-calendar', 'google-sheets', 'github', 'postgresql', 'firebase', 'razorpay', 'gem-portal', 'digilocker'];
  });

  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [copiedPromptIdx, setCopiedPromptIdx] = useState<number | null>(null);

  const saveConnectedIds = (ids: string[]) => {
    setConnectedIds(ids);
    try {
      localStorage.setItem(STORAGE_KEY_CONNECTED, JSON.stringify(ids));
    } catch (e) {
      console.warn('Could not save connected connectors', e);
    }
  };

  const handleToggleConnect = (connector: ConnectorItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isCurrentlyConnected = connectedIds.includes(connector.id);

    if (isCurrentlyConnected) {
      // Disconnect
      const updated = connectedIds.filter(id => id !== connector.id);
      saveConnectedIds(updated);
    } else {
      // Connect flow simulation with instant feedback
      setConnectingId(connector.id);
      setTimeout(() => {
        const updated = [...connectedIds, connector.id];
        saveConnectedIds(updated);
        setConnectingId(null);
      }, 700);
    }
  };

  const filteredConnectors = useMemo(() => {
    return AROHI_CONNECTORS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const installedConnectors = useMemo(() => {
    return AROHI_CONNECTORS.filter(c => connectedIds.includes(c.id));
  }, [connectedIds]);

  const handleUsePrompt = (promptText: string) => {
    if (onOpenChatWithPrompt) {
      onOpenChatWithPrompt(promptText);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(promptText);
      alert('Prompt copied to clipboard! Paste it into Arohi Chat.');
    }
  };

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'} font-sans pb-24 transition-colors`}>
      
      {/* Top Header Breadcrumb / Navigation */}
      <div className={`sticky top-0 z-30 ${isDarkMode ? 'bg-[#09090b]/90 border-zinc-800/80' : 'bg-white/90 border-zinc-200/80'} backdrop-blur-md border-b px-4 sm:px-8 py-3.5 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className={`p-2 rounded-xl ${isDarkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'} transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Chat</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight">Ecosystem</span>
            <span className="text-xs text-zinc-500">/</span>
            <span className="text-sm font-black text-purple-400">Connectors & Apps</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
            isDarkMode 
              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40' 
              : 'bg-emerald-50 text-emerald-700 border-emerald-300'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{connectedIds.length} Active Connectors</span>
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800/40">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Arohi AI Ecosystem
              </span>
              <span className="text-xs font-bold text-zinc-400">Model Context Protocol (MCP) & OAuth 2.0</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Connectors & Integrations
            </h1>
            <p className={`mt-2 text-sm sm:text-base ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} max-w-2xl`}>
              Connect Arohi AI directly to your cloud storage, repositories, emails, calendars, and databases to unlock grounded intelligence across your real workflow.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 16+ connectors..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border transition-all ${
                isDarkMode 
                  ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500' 
                  : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-sm'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Installed / Active Ribbon (ChatGPT-style) */}
        {installedConnectors.length > 0 && !searchQuery && selectedCategory === 'all' && (
          <div className="pt-6 pb-2">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Active in Your Workspace ({installedConnectors.length})
              </span>
              <span className="text-[11px] text-zinc-500">Ready for instant chat queries</span>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {installedConnectors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConnector(c)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all shrink-0 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-200 shadow-xs' 
                      : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-800 shadow-sm'
                  }`}
                  title={`${c.name}: Click to view prompts & settings`}
                >
                  <span className="text-base">{c.emoji}</span>
                  <span className="text-xs font-bold">{c.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-4 scrollbar-none">
          {CONNECTOR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-tight whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? (isDarkMode 
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30' 
                        : 'bg-zinc-900 text-white shadow-sm')
                    : (isDarkMode 
                        ? 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80' 
                        : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 border border-zinc-200')
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {filteredConnectors.map((item) => {
            const isConnected = connectedIds.includes(item.id);
            const isConnecting = connectingId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedConnector(item)}
                className={`group relative rounded-3xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isDarkMode 
                    ? 'bg-[#121215] hover:bg-[#18181c] border-zinc-800/90 hover:border-purple-500/50 shadow-lg shadow-black/20' 
                    : 'bg-white hover:bg-zinc-50/90 border-zinc-200/90 hover:border-purple-300 shadow-md shadow-zinc-200/40'
                }`}
              >
                <div>
                  {/* Card Top Row: Emoji Icon + Title + Status Button */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-xs border ${
                        isDarkMode ? 'bg-zinc-800/80 border-zinc-700/60' : 'bg-zinc-100 border-zinc-200'
                      }`}>
                        {item.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base tracking-tight">{item.name}</h3>
                          {item.popular && (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Popular
                            </span>
                          )}
                        </div>
                        <span className={`text-[11px] font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {item.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Connect Toggle Button */}
                    <button
                      onClick={(e) => handleToggleConnect(item, e)}
                      disabled={isConnecting}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-xs ${
                        isConnecting
                          ? 'bg-zinc-700 text-zinc-300 cursor-wait'
                          : isConnected
                            ? (isDarkMode 
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 hover:bg-rose-950/50 hover:text-rose-300 hover:border-rose-500/50' 
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300')
                            : (isDarkMode
                                ? 'bg-zinc-800 hover:bg-purple-600 text-zinc-200 hover:text-white border border-zinc-700/80'
                                : 'bg-zinc-100 hover:bg-purple-600 text-zinc-800 hover:text-white border border-zinc-300')
                      }`}
                      title={isConnected ? "Click to Disconnect" : "Click to Connect"}
                    >
                      {isConnecting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Connecting...</span>
                        </>
                      ) : isConnected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Connect</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Tagline */}
                  <p className={`text-xs font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'} mb-2`}>
                    {item.tagline}
                  </p>

                  {/* Description */}
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} line-clamp-2`}>
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Meta */}
                <div className={`mt-4 pt-3 border-t ${isDarkMode ? 'border-zinc-800/60' : 'border-zinc-100'} flex items-center justify-between text-[11px]`}>
                  <span className={`flex items-center gap-1 font-semibold ${
                    item.privacyLevel === 'Read-Only' 
                      ? 'text-cyan-400' 
                      : item.privacyLevel === 'Zero Retention' 
                        ? 'text-emerald-400' 
                        : 'text-purple-400'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.privacyLevel}</span>
                  </span>

                  <span className="text-zinc-500 group-hover:text-purple-400 font-semibold flex items-center gap-1 transition-colors">
                    View Prompts <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredConnectors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-sm font-medium">No connectors match "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs font-bold text-purple-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Detailed Slide-Over Modal / Drawer */}
      <AnimatePresence>
        {selectedConnector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 border shadow-2xl ${
                isDarkMode ? 'bg-[#131316] border-zinc-800 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
              } custom-scrollbar`}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800/60">
                <div className="flex items-center gap-3.5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border ${
                    isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-200'
                  }`}>
                    {selectedConnector.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold tracking-tight">{selectedConnector.name}</h2>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                        connectedIds.includes(selectedConnector.id)
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {connectedIds.includes(selectedConnector.id) ? 'Connected' : 'Available'}
                      </span>
                    </div>
                    <p className={`text-xs font-semibold ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} mt-0.5`}>
                      {selectedConnector.categoryLabel} • {selectedConnector.authType.toUpperCase()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedConnector(null)}
                  className={`p-2 rounded-full ${isDarkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'} cursor-pointer`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-5 space-y-5 text-xs">
                {/* Description */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500 mb-1.5">Overview</h4>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {selectedConnector.description}
                  </p>
                </div>

                {/* Capabilities */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500 mb-2">Key Capabilities</h4>
                  <div className="space-y-1.5">
                    {selectedConnector.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={`${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} leading-snug font-medium`}>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security & Scopes */}
                <div className={`p-3.5 rounded-2xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-purple-400" /> Security & Permissions
                    </span>
                    <span className="text-[10px] font-black text-emerald-400">{selectedConnector.privacyLevel}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedConnector.scopes.map((sc, idx) => (
                      <code key={idx} className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-800'
                      }`}>
                        {sc}
                      </code>
                    ))}
                  </div>
                </div>

                {/* Ready-to-Use Action Prompts */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500 mb-2.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Ready-to-Use Chat Prompts
                  </h4>
                  <div className="space-y-2.5">
                    {selectedConnector.samplePrompts.map((p, idx) => (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isDarkMode ? 'bg-zinc-900 border-zinc-800/80 hover:border-purple-500/40' : 'bg-zinc-50 border-zinc-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-purple-400">{p.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-200 text-zinc-600'
                          }`}>
                            {p.tag}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed italic ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} mb-2`}>
                          "{p.prompt}"
                        </p>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(p.prompt);
                              setCopiedPromptIdx(idx);
                              setTimeout(() => setCopiedPromptIdx(null), 1500);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                              copiedPromptIdx === idx
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : isDarkMode ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white' : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
                            }`}
                          >
                            {copiedPromptIdx === idx ? 'Copied ✓' : 'Copy'}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedConnector(null);
                              handleUsePrompt(p.prompt);
                            }}
                            className="px-3 py-1 rounded-lg text-[10px] font-extrabold bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                          >
                            <span>Run in Chat</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'} flex items-center justify-between`}>
                <button
                  onClick={() => setSelectedConnector(null)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'} cursor-pointer`}
                >
                  Close
                </button>

                <button
                  onClick={(e) => handleToggleConnect(selectedConnector, e)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
                    connectedIds.includes(selectedConnector.id)
                      ? (isDarkMode 
                          ? 'bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-500/50' 
                          : 'bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300')
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/40'
                  }`}
                >
                  {connectedIds.includes(selectedConnector.id) ? 'Disconnect Connector' : 'Connect to Workspace'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
