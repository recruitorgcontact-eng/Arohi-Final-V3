import React, { useState } from 'react';
import {
  GitBranch,
  Play,
  Plus,
  Trash2,
  Edit3,
  Share2,
  Zap,
  Calendar,
  PhoneOutgoing,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Sliders,
  Copy,
  Download,
  Upload,
  Bot,
  Languages,
  Mic
} from 'lucide-react';
import { TelephonyFlowNode, DEFAULT_TELEPHONY_FLOW_NODES, INDIAN_22_LANGUAGES } from './telephonyData';
import { useBusinessOS } from './BusinessOSContext';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';
import TelephonyNodeDrawer from './TelephonyNodeDrawer';
import DualModeVoiceTestModal from './DualModeVoiceTestModal';

interface TelephonyFlowCanvasProps {
  onTestFlowInSimulator?: (initialGreeting?: string, language?: string) => void;
}

export default function TelephonyFlowCanvas({ onTestFlowInSimulator }: TelephonyFlowCanvasProps) {
  const { showToast } = useBusinessOS();
  const [nodes, setNodes] = useState<TelephonyFlowNode[]>(DEFAULT_TELEPHONY_FLOW_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-greeting');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isPlayingNodePreview, setIsPlayingNodePreview] = useState(false);
  const [activeLanguageFilter, setActiveLanguageFilter] = useState<'all' | 'odia' | 'hindi' | 'english'>('all');

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const handleUpdateNode = (updated: Partial<TelephonyFlowNode>) => {
    setNodes(prev =>
      prev.map(n => (n.id === selectedNodeId ? { ...n, ...updated, config: { ...n.config, ...updated.config } } : n))
    );
    showToast(`Updated node "${selectedNode.title}"`);
  };

  const handleSaveNodeFromDrawer = (updatedNode: TelephonyFlowNode) => {
    setNodes(prev => prev.map(n => n.id === updatedNode.id ? updatedNode : n));
    showToast(`Saved workflow node "${updatedNode.title}"`);
  };

  const handleAddNode = () => {
    const newNodeId = `node-custom-${Date.now()}`;
    const newNode: TelephonyFlowNode = {
      id: newNodeId,
      type: 'intent_branch',
      title: `${nodes.length + 1}. Conversational Logic State`,
      subtitle: 'Custom LLM reasoning and conditional pathway',
      language: '22 Languages Auto',
      iconName: 'Bot',
      color: 'purple',
      config: {
        dialogueText: 'Sure! Let me check that information and guide you right away.',
        delayMs: 300,
        branchRules: []
      }
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(newNodeId);
    setIsDrawerOpen(true);
    showToast('Added new workflow node! Opening configuration drawer...');
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setSelectedNodeId('node-greeting');
    showToast('Node deleted from flow.');
  };

  const handleApplyPreset = (presetName: string) => {
    if (presetName === 'odia-flagship') {
      const odiaNode = nodes.find(n => n.id === 'node-greeting');
      if (odiaNode) {
        handleUpdateNode({
          language: 'Odia (ଓଡ଼ିଆ) + English',
          config: {
            ...odiaNode.config,
            dialogueText: 'ନମସ୍କାର! ଆରୋହୀ ଏଣ୍ଟରପ୍ରାଇଜେସ୍ ତରଫରୁ ସ୍ୱାଗତ। ମୁଁ ଆପଣଙ୍କୁ ଆଜି କିପରି ସାହାଯ୍ୟ କରିପାରିବି? (Namaskar! Welcome to Arohi Enterprises. How may I assist you today?)'
          }
        });
      }
      showToast('Applied Odia Flagship Telephony Preset!');
    } else if (presetName === 'recovery') {
      const greeting = nodes.find(n => n.id === 'node-greeting');
      if (greeting) {
        handleUpdateNode({
          title: '1. Overdue Invoice Courteous Intake',
          language: 'Bilingual Vernacular + English',
          config: {
            ...greeting.config,
            dialogueText: 'Namaskar! Main accounts department se call kar rahi hoon aapke pending GST invoice ke sambandh mein. Kya yeh baat karne ka sahi samay hai?'
          }
        });
      }
      showToast('Applied Courteous Invoice Recovery Flow!');
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(nodes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `arohi_telephony_flow_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported Telephony Flow as JSON!');
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'greeting':
        return <Mic className="w-4 h-4 text-emerald-500" />;
      case 'intent_branch':
        return <GitBranch className="w-4 h-4 text-purple-500" />;
      case 'whatsapp_hook':
        return <Share2 className="w-4 h-4 text-emerald-500" />;
      case 'razorpay_hook':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'booking_hook':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'human_transfer':
        return <PhoneOutgoing className="w-4 h-4 text-rose-500" />;
      case 'closing':
        return <CheckCircle2 className="w-4 h-4 text-zinc-500" />;
      default:
        return <Bot className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Header & Presets Bar */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse"></span>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-newsreader">
              Visual Call Flow & Autonomous Telephony Canvas
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-bold">
              Sub-500ms Runtime
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
            Design drag-and-drop conversational paths with mid-call WhatsApp hooks, instant payment links, and 22-language code-switching
          </p>
        </div>

        {/* Action buttons & Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleApplyPreset('odia-flagship')}
            className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Load Odia First-Class Telephony Flow"
          >
            <span>🇮🇳 Odia (ଓଡ଼ିଆ) Preset</span>
          </button>

          <button
            onClick={() => handleApplyPreset('recovery')}
            className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Load Payment Follow-up Preset"
          >
            <span>₹ Payment Recovery Flow</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-xl border border-black/8 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Export Flow as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={handleAddNode}
            className="px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Add Custom Workflow Node"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Node</span>
          </button>

          <button
            onClick={() => setIsTestModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            title="Test Voice Agent in Audio & Chat Modes"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Agent Studio</span>
          </button>

          {onTestFlowInSimulator && (
            <button
              onClick={() => onTestFlowInSimulator(selectedNode.config.dialogueText, selectedNode.language)}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Simulate Live Call</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split Workspace: Left Canvas / Right Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Left: The Flow Nodes Stack (7 Columns) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">
              Active Call Flow Sequence ({nodes.length} Nodes)
            </span>
            <span className="text-zinc-400 text-[11px]">Click any node or the gear icon to open configuration drawer</span>
          </div>

          <div className="space-y-3">
            {nodes.map((node, index) => {
              const isSelected = node.id === selectedNodeId;
              const isLast = index === nodes.length - 1;

              return (
                <div key={node.id} className="relative">
                  <div
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-white dark:bg-[#15161c] border-[#d4af37] ring-2 ring-[#d4af37]/20 shadow-md'
                        : 'bg-white/80 dark:bg-[#121214]/80 border-black/[0.06] dark:border-white/[0.08] hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          {getNodeIcon(node.type)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                              {node.title}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
                              {node.language}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {node.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {node.config.toolAction && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-[9px] font-mono font-bold">
                            ⚡ {node.config.toolAction}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNodeId(node.id);
                            setIsDrawerOpen(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          title="Configure in Node Drawer"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Dialogue / Branching Preview */}
                    {node.config.dialogueText && (
                      <div className="mt-3 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] text-xs font-sans text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                        "{node.config.dialogueText}"
                      </div>
                    )}

                    {node.config.branchRules && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {node.config.branchRules.map((br, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/40 text-[11px]"
                          >
                            <span className="text-purple-900 dark:text-purple-200 font-medium truncate">
                              {br.condition}
                            </span>
                            <span className="text-[#d4af37] font-bold text-[10px] shrink-0 ml-1">
                              ➔ {br.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Visual Connection Line */}
                  {!isLast && (
                    <div className="flex justify-center py-1">
                      <div className="w-0.5 h-4 bg-gradient-to-b from-[#d4af37] to-zinc-300 dark:to-zinc-700 rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Node Inspector & Vernacular Dialogue Studio (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 sticky top-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                  {getNodeIcon(selectedNode.type)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                    Node Inspector
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400">{selectedNode.id}</span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-300">
                {selectedNode.type.toUpperCase()}
              </span>
            </div>

            {/* Node Title & Subtitle */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Node Title
              </label>
              <input
                type="text"
                value={selectedNode.title}
                onChange={e => handleUpdateNode({ title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Language Profile Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                <span>Vernacular Dialect Profile</span>
                <span className="text-[#d4af37] font-semibold text-[10px]">22 Languages Ready</span>
              </label>
              <select
                value={selectedNode.language}
                onChange={e => handleUpdateNode({ language: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Odia (ଓଡ଼ିଆ) + English">ଓଡ଼ିଆ — Odia (Coastal / Sambalpuri) + English Code-Switch</option>
                <option value="Hinglish (Hindi + English)">हिन्दी — Hinglish (Hindi + English Business)</option>
                <option value="Hindi (Pure / Shuddh)">हिन्दी — Pure Shuddh Hindi</option>
                <option value="Indian English (Corporate)">English — Indian English Corporate</option>
                <option value="Bengali (বাংলা)">বাংলা — Bengali (Kolkata Standard)</option>
                <option value="Telugu (తెలుగు)">తెలుగు — Telugu (Hyderabad / Coastal)</option>
                <option value="Tamil (தமிழ்)">தமிழ் — Tamil (Chennai Standard)</option>
                <option value="Marathi (मराठी)">मराठी — Marathi (Pune / Mumbai)</option>
                <option value="Gujarati (ગુજરાતી)">ગુજરાતી — Gujarati (Commercial)</option>
                <option value="Kannada (ಕನ್ನಡ)">ಕನ್ನಡ — Kannada (Bengaluru Tech)</option>
                <option value="Malayalam (മലയാളം)">മലയാളം — Malayalam (Kochi Standard)</option>
                <option value="Punjabi (ਪੰਜਾਬੀ)">ਪੰਜਾਬੀ — Punjabi (Majhi / Malwai)</option>
                <option value="Assamese (অসমীয়া)">অসমীয়া — Assamese Standard</option>
                <option value="Santali (ᱥᱟᱱᱛᱟᱲᱤ)">ᱥᱟᱱᱛᱟᱲᱤ — Santali (Ol Chiki)</option>
                <option value="Maithili (मैथिली)">मैथिली — Maithili Mithilanchal</option>
                <option value="Urdu (اردو)">اردو — Urdu Corporate</option>
                <option value="Sanskrit (संस्कृतम्)">संस्कृतम् — Sanskrit Vedic/Scholarly</option>
                <option value="Auto-Detect 22 Languages">🌐 All 22 Indian Languages Auto-Detect</option>
              </select>
            </div>

            {/* Spoken Dialogue Text Area */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  AI Spoken Dialogue / Prompt
                </label>
                {/* One-click Odia sample generator */}
                <button
                  type="button"
                  onClick={() => {
                    const odiaItem = INDIAN_22_LANGUAGES.find(l => l.code === 'or');
                    if (odiaItem) {
                      handleUpdateNode({
                        language: 'Odia (ଓଡ଼ିଆ) + English',
                        config: {
                          ...selectedNode.config,
                          dialogueText: odiaItem.defaultGreeting
                        }
                      });
                    }
                  }}
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  Insert Odia Sample
                </button>
              </div>
              <textarea
                rows={4}
                value={selectedNode.config.dialogueText || ''}
                onChange={e =>
                  handleUpdateNode({
                    config: { ...selectedNode.config, dialogueText: e.target.value }
                  })
                }
                placeholder="Type the exact natural dialogue for the AI receptionist to speak..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-xs font-sans text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#d4af37] leading-relaxed resize-none"
              />
            </div>

            {/* Mid-Call Real-Time Business Action Hook */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                <span>Mid-Call Business Action Hook</span>
                <span className="text-purple-600 dark:text-purple-400 text-[10px] font-mono font-bold">Real-Time</span>
              </label>
              <select
                value={selectedNode.config.toolAction || 'NONE'}
                onChange={e =>
                  handleUpdateNode({
                    config: {
                      ...selectedNode.config,
                      toolAction: e.target.value === 'NONE' ? undefined : e.target.value
                    }
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="NONE">None — Conversational Only</option>
                <option value="DISPATCH_WHATSAPP_BROCHURE">📲 DISPATCH_WHATSAPP_BROCHURE (Instant PDF via WhatsApp)</option>
                <option value="GENERATE_RAZORPAY_INVOICE_LINK">⚡ GENERATE_RAZORPAY_INVOICE_LINK (Instant SMS Payment Link)</option>
                <option value="LOCK_CALENDAR_SLOT">📅 LOCK_CALENDAR_SLOT (Book Sales Rep Google Calendar)</option>
                <option value="CHECK_LIVE_INVENTORY">📦 CHECK_LIVE_INVENTORY (Query stock before quoting)</option>
                <option value="SIP_WARM_TRANSFER_TO_HUMAN">📞 SIP_WARM_TRANSFER_TO_HUMAN (Conference manager mobile)</option>
                <option value="SYNC_TO_AROHI_CRM_LEADS">💼 SYNC_TO_AROHI_CRM_LEADS (Create hot lead in CRM)</option>
              </select>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                While on the live phone call, the voice agent executes this action without disconnecting the caller.
              </p>
            </div>

            {/* Test Spoken Dialogue Button with Arohi 24kHz HD Voice */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (!selectedNode.config.dialogueText) {
                    showToast('No dialogue text configured for this node.');
                    return;
                  }
                  if (isPlayingNodePreview) {
                    stopArohiVoice();
                    setIsPlayingNodePreview(false);
                    return;
                  }

                  showToast('Playing node audio via Arohi 24kHz HD Neural Voice...');
                  playArohiVoice(selectedNode.config.dialogueText, {
                    voice: 'Zypher',
                    onStart: () => setIsPlayingNodePreview(true),
                    onEnd: () => setIsPlayingNodePreview(false),
                    onError: () => setIsPlayingNodePreview(false)
                  });
                }}
                className={`w-full py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                  isPlayingNodePreview
                    ? 'bg-purple-600 text-white border-purple-500 animate-pulse'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isPlayingNodePreview ? 'Playing 24kHz HD Voice...' : 'Preview in Arohi 24kHz HD Voice'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Node Configuration Drawer */}
      {isDrawerOpen && selectedNode && (
        <TelephonyNodeDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          node={selectedNode}
          allNodes={nodes}
          onSaveNode={handleSaveNodeFromDrawer}
          onDeleteNode={handleDeleteNode}
        />
      )}

      {/* Dual-Mode Test Agent (Test Audio + Test Chat) */}
      {isTestModalOpen && (
        <DualModeVoiceTestModal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
          flowNodes={nodes}
        />
      )}
    </div>
  );
}
