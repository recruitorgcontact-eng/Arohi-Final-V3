import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  GitBranch,
  Play,
  Pause,
  Plus,
  Trash2,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Share2,
  Zap,
  Calendar,
  PhoneOutgoing,
  Bot,
  Mic,
  Volume2,
  Link,
  Code2
} from 'lucide-react';
import { TelephonyFlowNode, TelephonyNodeType } from './telephonyData';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';

interface TelephonyNodeDrawerProps {
  node: TelephonyFlowNode | null;
  isOpen: boolean;
  allNodes: TelephonyFlowNode[];
  onClose: () => void;
  onSaveNode: (updatedNode: TelephonyFlowNode) => void;
  onDeleteNode?: (nodeId: string) => void;
}

export default function TelephonyNodeDrawer({
  node,
  isOpen,
  allNodes,
  onClose,
  onSaveNode,
  onDeleteNode
}: TelephonyNodeDrawerProps) {
  const [formData, setFormData] = useState<TelephonyFlowNode>(node || ({} as TelephonyFlowNode));
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'pathways' | 'tools' | 'settings'>('prompt');

  useEffect(() => {
    if (node) {
      setFormData({ ...node });
    }
    return () => {
      stopArohiVoice();
    };
  }, [node]);

  if (!isOpen || !node) return null;

  const handleTextChange = (field: string, val: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const handleConfigChange = (key: string, val: any) => {
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [key]: val
      }
    }));
  };

  // Pathways / Branch rules
  const branchRules = formData.config.branchRules || [];

  const handleAddBranchRule = () => {
    const newRules = [
      ...branchRules,
      {
        condition: 'Caller expresses specific interest',
        nextNodeId: allNodes[0]?.id || 'node-greeting',
        label: 'New Pathway'
      }
    ];
    handleConfigChange('branchRules', newRules);
  };

  const handleUpdateBranchRule = (index: number, updated: { condition: string; nextNodeId: string; label: string }) => {
    const newRules = [...branchRules];
    newRules[index] = updated;
    handleConfigChange('branchRules', newRules);
  };

  const handleRemoveBranchRule = (index: number) => {
    const newRules = branchRules.filter((_, i) => i !== index);
    handleConfigChange('branchRules', newRules);
  };

  const handlePlayVoicePreview = () => {
    const text = formData.config.dialogueText || formData.subtitle || formData.title;
    if (isPlayingPreview) {
      stopArohiVoice();
      setIsPlayingPreview(false);
      return;
    }

    setIsPlayingPreview(true);
    playArohiVoice(text, {
      voice: 'Zypher',
      language: formData.language,
      onStart: () => setIsPlayingPreview(true),
      onEnd: () => setIsPlayingPreview(false),
      onError: () => setIsPlayingPreview(false)
    });
  };

  const handleSave = () => {
    stopArohiVoice();
    onSaveNode(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-[#121214] border-l border-black/[0.08] dark:border-white/[0.08] shadow-2xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Configure Workflow Node
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                  {formData.type.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[280px]">
                {formData.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePlayVoicePreview}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                isPlayingPreview
                  ? 'bg-purple-600 text-white border-purple-500 animate-pulse'
                  : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border-black/5 dark:border-white/5'
              }`}
              title="Preview Spoken Dialogue in Natural Voice"
            >
              {isPlayingPreview ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Voice Test</span>
            </button>

            <button
              onClick={() => {
                stopArohiVoice();
                onClose();
              }}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-black/[0.06] dark:border-white/[0.08] bg-zinc-100/60 dark:bg-zinc-900/60 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              activeTab === 'prompt'
                ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Agent Dialogue &amp; Prompt
          </button>
          <button
            onClick={() => setActiveTab('pathways')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
              activeTab === 'pathways'
                ? 'bg-white dark:bg-zinc-800 text-[#d4af37] shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span>Pathways ({branchRules.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              activeTab === 'tools'
                ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Tool &amp; Action Hooks
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              activeTab === 'settings'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Node Settings
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          
          {/* TAB 1: PROMPT & DIALOGUE */}
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Node Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTextChange('title', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Spoken Dialogue / Voice Prompt Template
                </label>
                <textarea
                  rows={5}
                  value={formData.config.dialogueText || ''}
                  onChange={(e) => handleConfigChange('dialogueText', e.target.value)}
                  placeholder="Enter the exact conversational words spoken by Arohi during this step (supports Odia, Hindi, Hinglish, English)..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono leading-relaxed"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  💡 Natural pause tokens: Use commas and periods for conversational pacing. Sub-45 spoken words is optimal for quick, snappy responses.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Primary Language / Code-Switching Tone
                </label>
                <input
                  type="text"
                  value={formData.language}
                  onChange={(e) => handleTextChange('language', e.target.value)}
                  placeholder="e.g. Odia (ଓଡ଼ିଆ) + English, Hinglish, Formal English..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 text-xs">
                <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Arohi Natural Voice Output</span>
                </div>
                <p className="text-[11px] text-purple-600/90 dark:text-purple-300/80">
                  This dialogue will be spoken using Arohi's natural studio voice with authentic Indian regional inflection.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PATHWAYS & TRANSITIONS */}
          {activeTab === 'pathways' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                    Directed Graph Pathways
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Define conditional branch rules that dictate which node the voice agent transitions to.
                  </p>
                </div>
                <button
                  onClick={handleAddBranchRule}
                  className="px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Pathway</span>
                </button>
              </div>

              {branchRules.length === 0 ? (
                <div className="p-6 rounded-xl border border-dashed border-black/10 dark:border-white/10 text-center space-y-2">
                  <GitBranch className="w-8 h-8 text-zinc-400 mx-auto" />
                  <p className="text-xs text-zinc-500">
                    No custom branch pathways configured for this node.
                  </p>
                  <button
                    onClick={handleAddBranchRule}
                    className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline"
                  >
                    + Add first branch pathway
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {branchRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/70 space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={rule.label}
                            onChange={(e) =>
                              handleUpdateBranchRule(idx, { ...rule, label: e.target.value })
                            }
                            placeholder="Pathway Label (e.g. Inquires on Pricing)"
                            className="font-bold text-zinc-900 dark:text-white bg-transparent border-b border-transparent hover:border-black/20 focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveBranchRule(idx)}
                          className="text-zinc-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                          Semantic Intent Condition
                        </label>
                        <input
                          type="text"
                          value={rule.condition}
                          onChange={(e) =>
                            handleUpdateBranchRule(idx, { ...rule, condition: e.target.value })
                          }
                          placeholder="e.g. Caller mentions price, GST bill, catalog, or brochure"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                          Next Destination Node
                        </label>
                        <select
                          value={rule.nextNodeId}
                          onChange={(e) =>
                            handleUpdateBranchRule(idx, { ...rule, nextNodeId: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none font-medium"
                        >
                          {allNodes.map((n) => (
                            <option key={n.id} value={n.id}>
                              {n.title} ({n.type})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TOOLS & ACTION HOOKS */}
          {activeTab === 'tools' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Mid-Call Action Hook
                </label>
                <select
                  value={formData.config.toolAction || ''}
                  onChange={(e) => handleConfigChange('toolAction', e.target.value || undefined)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
                >
                  <option value="">-- No Tool Action (Conversational Only) --</option>
                  <option value="DISPATCH_WHATSAPP_BROCHURE">📲 DISPATCH_WHATSAPP_BROCHURE (WhatsApp Catalog)</option>
                  <option value="GENERATE_RAZORPAY_INVOICE_LINK">💳 GENERATE_RAZORPAY_INVOICE_LINK (Razorpay UPI Payment)</option>
                  <option value="LOCK_CALENDAR_SLOT">📅 LOCK_CALENDAR_SLOT (Autonomous Demo / Consultation Booking)</option>
                  <option value="SIP_WARM_TRANSFER_TO_HUMAN">📞 SIP_WARM_TRANSFER_TO_HUMAN (Executive Telephony Transfer)</option>
                  <option value="SYNC_TO_AROHI_CRM_LEADS">🗄️ SYNC_TO_AROHI_CRM_LEADS (Autonomous CRM &amp; Ledger)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                  <Link className="w-3.5 h-3.5 text-purple-500" />
                  <span>Custom Webhook Integration</span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  When triggered, Arohi executes this HTTP payload mid-call while the caller remains live on the phone line with seamless voice continuity.
                </p>
                <div className="p-2.5 rounded-lg bg-black/5 dark:bg-black/40 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                  POST /api/arohi-one/voice-agents/webhook/inbound
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS & METADATA */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Node Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleTextChange('type', e.target.value as TelephonyNodeType)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none"
                >
                  <option value="greeting">Start / Greeting Node</option>
                  <option value="intent_branch">Intent Classification Router Node</option>
                  <option value="whatsapp_hook">WhatsApp Brochure Hook Node</option>
                  <option value="razorpay_hook">Razorpay Payment Hook Node</option>
                  <option value="booking_hook">Calendar Booking Hook Node</option>
                  <option value="human_transfer">Warm Transfer Node</option>
                  <option value="closing">End Call / Wrap-up Node</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Subtitle Description
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => handleTextChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Execution Delay (ms)
                </label>
                <input
                  type="number"
                  value={formData.config.delayMs || 300}
                  onChange={(e) => handleConfigChange('delayMs', parseInt(e.target.value) || 300)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>

              {onDeleteNode && formData.id !== 'node-greeting' && (
                <div className="pt-4 border-t border-black/5 dark:border-white/5">
                  <button
                    onClick={() => {
                      if (confirm(`Delete node "${formData.title}"?`)) {
                        onDeleteNode(formData.id);
                        onClose();
                      }
                    }}
                    className="w-full py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete This Node</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/70 dark:bg-zinc-900/50 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              stopArohiVoice();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold cursor-pointer transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Apply Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
