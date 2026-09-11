import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Bot,
  Play,
  Square,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Mic,
  Volume2,
  VolumeX,
  Phone,
  PhoneOff,
  PhoneForwarded,
  Languages,
  ChevronRight,
  Sliders,
  FileCode2,
  Wand2,
  HelpCircle,
  Copy,
  Share2,
  ArrowRight,
  Send,
  Plus,
  Settings,
  Code2,
  GitBranch,
  RefreshCw,
  X,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  Check,
  Radio,
  Eye,
  Edit3,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import {
  ENTERPRISE_VOICE_TEMPLATES,
  VoiceAgentTemplate,
  PromptVariable,
  saveCustomTemplate
} from './arohiPromptTemplateData';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';
import EnvironmentSoundSelector from './EnvironmentSoundSelector';
import { BackgroundSoundType } from '../../utils/arohiAmbientNoise';
import { useBusinessOS } from './BusinessOSContext';
import { VoiceProfileId } from './types';
import GenieAuditModal from './GenieAuditModal';
import GenieTranslationsModal from './GenieTranslationsModal';

interface VoicePromptStudioViewProps {
  initialTemplate?: VoiceAgentTemplate;
  onSwitchToVisualFlow: () => void;
  onOpenTestAgentModal: () => void;
  onOpenPhoneSimulator?: () => void;
}

export const VOICE_DISPLAY_OPTIONS = [
  {
    id: 'Zypher' as const,
    name: 'Arohi (Signature Reception)',
    shortTag: 'Arohi',
    desc: 'Sweet, articulate, professional (~30 yrs) for front desk, clinic reception & support.'
  },
  {
    id: 'Aoede' as const,
    name: 'Meera (Gentle Empathetic Care)',
    shortTag: 'Meera',
    desc: 'Calm, patient, empathetic for healthcare, PwD & civic helplines.'
  },
  {
    id: 'Fenrir' as const,
    name: 'Arjun (Consultative Enterprise B2B)',
    shortTag: 'Arjun',
    desc: 'Sharp, authoritative, consultative for B2B enterprise qualification.'
  },
  {
    id: 'Puck' as const,
    name: 'Kabir (Agile Support & Logistics)',
    shortTag: 'Kabir',
    desc: 'Energetic, fast-paced for delivery confirmations, logistics & quick alerts.'
  }
];

export const getVoiceDisplayName = (voiceId: string) => {
  const match = VOICE_DISPLAY_OPTIONS.find(v => v.id === voiceId);
  return match ? match.name : voiceId;
};

export default function VoicePromptStudioView({
  initialTemplate = ENTERPRISE_VOICE_TEMPLATES[0],
  onSwitchToVisualFlow,
  onOpenTestAgentModal,
  onOpenPhoneSimulator
}: VoicePromptStudioViewProps) {
  const { addInboundAgent, setActiveInboundAgentId } = useBusinessOS();

  // Template Core State
  const [template, setTemplate] = useState<VoiceAgentTemplate>(initialTemplate);
  const [activeTab, setActiveTab] = useState<'instructions' | 'variables' | 'tools' | 'settings'>('instructions');
  const [promptViewMode, setPromptViewMode] = useState<'edit' | 'preview'>('edit');
  
  // Modals & Drawers
  const [showGenieCopilot, setShowGenieCopilot] = useState<boolean>(true);
  const [showTranslationsModal, setShowTranslationsModal] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

  // Spoken Audition State
  const [isAuditioning, setIsAuditioning] = useState<boolean>(false);
  const [statusNotice, setStatusNotice] = useState<{ message: string; type: 'success' | 'info' | 'warn' } | null>(null);

  // Editable Prompt Fields
  const [agentTitle, setAgentTitle] = useState<string>(template.title);
  const [greeting, setGreeting] = useState<string>(template.greeting);
  const [persona, setPersona] = useState<string>(template.persona);
  const [environment, setEnvironment] = useState<string>(template.environmentAndSituation);
  const [objective, setObjective] = useState<string>(template.objective);
  const [speakingStyle, setSpeakingStyle] = useState<string>(template.speakingStyle);
  const [facts, setFacts] = useState<string>(template.facts);
  const [phases, setPhases] = useState(template.conversationPhases || []);
  const [guardrails, setGuardrails] = useState<string[]>(template.guardrails || []);
  const [variables, setVariables] = useState<PromptVariable[]>(template.variables || []);
  const [recommendedVoice, setRecommendedVoice] = useState<'Zypher' | 'Fenrir' | 'Puck' | 'Aoede' | 'Charon' | 'Kore'>(
    (template.recommendedVoice as any) || 'Zypher'
  );
  const [backgroundSound, setBackgroundSound] = useState<BackgroundSoundType>(template.backgroundSound || 'office');
  const [switchLanguageDuringCall, setSwitchLanguageDuringCall] = useState<boolean>(template.switchLanguageDuringCall ?? true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [voicePitch, setVoicePitch] = useState<number>(1.0);

  // New item inputs
  const [newGuardrailInput, setNewGuardrailInput] = useState<string>('');
  const [newVariableKey, setNewVariableKey] = useState<string>('');
  const [newVariableLabel, setNewVariableLabel] = useState<string>('');
  const [newVariableDefault, setNewVariableDefault] = useState<string>('');
  const [newVariableDesc, setNewVariableDesc] = useState<string>('');
  const [showAddVariableDrawer, setShowAddVariableDrawer] = useState<boolean>(false);

  // Real Tools & Webhooks Configuration State
  const [toolsState, setToolsState] = useState<{
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    endpointUrl: string;
    method: 'POST' | 'GET';
    timeoutMs: number;
    requiresAuth: boolean;
    authToken: string;
  }[]>([
    {
      id: 'check_crm_availability',
      name: 'CRM Availability Checker',
      description: 'Queries calendar slots in real-time to propose open appointment times.',
      enabled: true,
      endpointUrl: 'https://api.arohi.ai/v1/crm/calendar/slots',
      method: 'POST',
      timeoutMs: 1200,
      requiresAuth: true,
      authToken: 'Bearer ak_live_arohi_crm_93379'
    },
    {
      id: 'book_appointment_slot',
      name: 'Direct Calendar Booker',
      description: 'Locks confirmed slots, creates calendar invites, and sends SMS reminders.',
      enabled: true,
      endpointUrl: 'https://api.arohi.ai/v1/crm/calendar/book',
      method: 'POST',
      timeoutMs: 1500,
      requiresAuth: true,
      authToken: 'Bearer ak_live_arohi_crm_93379'
    },
    {
      id: 'dispatch_whatsapp_brochure',
      name: 'WhatsApp Catalog & Brochure Dispatch',
      description: 'Sends official PDF catalogs and Razorpay payment links via WhatsApp Business API.',
      enabled: true,
      endpointUrl: 'https://api.arohi.ai/v1/whatsapp/dispatch-brochure',
      method: 'POST',
      timeoutMs: 2000,
      requiresAuth: true,
      authToken: 'Bearer ak_live_whatsapp_meta_8942'
    },
    {
      id: 'transfer_to_human_agent',
      name: 'SIP Warm Escalation Transfer',
      description: 'Bridges active telephone call to human duty supervisor upon caller distress.',
      enabled: true,
      endpointUrl: 'https://api.arohi.ai/v1/telephony/sip-bridge',
      method: 'POST',
      timeoutMs: 800,
      requiresAuth: false,
      authToken: ''
    },
    {
      id: 'fetch_order_tracking',
      name: 'Live Logistics & NDR Status',
      description: 'Pulls Delhivery/Shiprocket parcel status and captures landmark updates.',
      enabled: false,
      endpointUrl: 'https://api.arohi.ai/v1/logistics/ndr-status',
      method: 'POST',
      timeoutMs: 1800,
      requiresAuth: true,
      authToken: 'Bearer ak_live_shiprocket_3921'
    },
    {
      id: 'create_crm_lead',
      name: 'Arohi CRM Deals & Leads Auto-Sync',
      description: 'Creates qualified prospect leads in Business OS Deals pipeline with call summary.',
      enabled: true,
      endpointUrl: 'https://api.arohi.ai/v1/crm/leads/create',
      method: 'POST',
      timeoutMs: 1000,
      requiresAuth: true,
      authToken: 'Bearer ak_internal_business_os'
    }
  ]);

  // Copilot (Genie) interactive chat state
  const [copilotMessages, setCopilotMessages] = useState<{
    sender: 'user' | 'genie';
    text: string;
    stepId?: string;
    isCard?: boolean;
    suggestedChips?: string[];
  }[]>([
    {
      sender: 'genie',
      text: `Namaste! I am your Arohi Prompt Genie. I optimize Indian enterprise voice agents for sub-25-word cadence, empathetic Hinglish/vernacular flow, and strict financial guardrails. What would you like to refine?`,
      suggestedChips: [
        'Enforce strict cadence (< 20 words/turn)',
        'Add WhatsApp brochure trigger',
        'Add Odia & Hindi bilingual instructions',
        'Harden financial guardrails against false promises'
      ]
    }
  ]);
  const [copilotInput, setCopilotInput] = useState<string>('');
  const [isGenieThinking, setIsGenieThinking] = useState<boolean>(false);
  const [genieUndoHistory, setGenieUndoHistory] = useState<any[]>([]);

  // Sync state if template prop changes
  useEffect(() => {
    setTemplate(initialTemplate);
    setAgentTitle(initialTemplate.title);
    setGreeting(initialTemplate.greeting);
    setPersona(initialTemplate.persona);
    setEnvironment(initialTemplate.environmentAndSituation);
    setObjective(initialTemplate.objective);
    setSpeakingStyle(initialTemplate.speakingStyle);
    setFacts(initialTemplate.facts);
    setPhases(initialTemplate.conversationPhases || []);
    setGuardrails(initialTemplate.guardrails || []);
    setVariables(initialTemplate.variables || []);
    setRecommendedVoice((initialTemplate.recommendedVoice as any) || 'Zypher');
    setBackgroundSound(initialTemplate.backgroundSound || 'office');
    setSwitchLanguageDuringCall(initialTemplate.switchLanguageDuringCall ?? true);
  }, [initialTemplate]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopArohiVoice();
    };
  }, []);

  // Show temporary status notice
  const notify = (message: string, type: 'success' | 'info' | 'warn' = 'success') => {
    setStatusNotice({ message, type });
    setTimeout(() => setStatusNotice(null), 3500);
  };

  // Helper to calculate greeting word count for cadence enforcement
  const greetingWords = greeting.trim().split(/\s+/).filter(Boolean).length;
  const isCadenceWarning = greetingWords > 25;

  // Scan text for undeclared variable tokens {unknown_token}
  const findUndeclaredTokens = () => {
    const fullText = `${greeting} ${persona} ${environment} ${objective} ${speakingStyle} ${facts} ${phases.map(p => p.guidelines.join(' ')).join(' ')} ${guardrails.join(' ')}`;
    const matches: string[] = (fullText.match(/\{([a-zA-Z0-9_]+)\}/g) || []) as string[];
    const declaredKeys = new Set(variables.map(v => v.key));
    const undeclared: string[] = [];
    matches.forEach((m: string) => {
      const key = m.slice(1, -1);
      if (!declaredKeys.has(key) && !undeclared.includes(key)) {
        undeclared.push(key);
      }
    });
    return undeclared;
  };

  const undeclaredTokens = findUndeclaredTokens();

  // Audition Greeting
  const handleToggleAudition = () => {
    if (isAuditioning) {
      stopArohiVoice();
      setIsAuditioning(false);
      return;
    }

    stopArohiVoice();
    setIsAuditioning(true);

    // Resolve variables with sample values
    let speechText = greeting;
    variables.forEach(v => {
      speechText = speechText.split(`{${v.key}}`).join(v.defaultValue);
    });

    playArohiVoice(speechText, {
      voice: recommendedVoice as any,
      onEnd: () => setIsAuditioning(false)
    });
  };

  // Save template to Custom Templates
  const handleSaveTemplate = () => {
    const updated: VoiceAgentTemplate = {
      ...template,
      title: agentTitle,
      greeting,
      persona,
      environmentAndSituation: environment,
      objective,
      speakingStyle,
      facts,
      conversationPhases: phases,
      guardrails,
      variables,
      recommendedVoice,
      backgroundSound,
      switchLanguageDuringCall,
      isCustom: true,
      lastModified: new Date().toISOString()
    };
    saveCustomTemplate(updated);
    setTemplate(updated);
    notify(`Saved "${agentTitle}" to your custom templates!`);
  };

  // Deploy to Inbound Agents
  const handleDeployToInbound = () => {
    let mappedVoice: VoiceProfileId = 'Arohi-Warm-Female';
    if (recommendedVoice === 'Fenrir') mappedVoice = 'Arohi-Executive-Male';
    else if (recommendedVoice === 'Aoede') mappedVoice = 'Arohi-Empathetic-Female';
    else if (recommendedVoice === 'Puck') mappedVoice = 'Arohi-Energetic-Male';

    let department: any = 'Customer Support';
    if (template.category === 'Inbound Reception') department = 'Reception & Front Desk';
    else if (template.category === 'Sales & Lead Gen') department = 'Sales & Qualification';
    else if (template.category === 'Appointment Booking') department = 'Appointments & Booking';
    else if (template.category === 'Government & Civic') department = 'VIP Concierge';

    const bVar = variables.find(v => v.key === 'businessName' || v.key === 'storeName' || v.key === 'companyName');
    const businessName = bVar ? bVar.defaultValue : 'Arohi Enterprise';

    addInboundAgent({
      name: agentTitle,
      role: persona.split('\n')[0] || `${agentTitle} Executive`,
      department,
      language: template.language,
      voiceProfile: mappedVoice,
      pitch: voicePitch,
      speechRate: speechRate,
      greetingMessage: greeting,
      businessName,
      knowledgeBase: `${objective}\n\nFacts & Policies:\n${facts}\n\nGuardrails:\n${guardrails.join('\n')}`,
      autoActions: {
        createCrmLead: true,
        sendWhatsAppNotification: true,
        bookCalendarAppointment: true,
        forwardToHumanOnUrgent: true
      },
      forwardingPhoneNumber: '+91 93379 52401',
      assignedPhoneNumber: '+91 80 4736 2901',
      operatingHours: '24/7 Always Active',
      backgroundSound,
      switchLanguageDuringCall,
      isActive: true
    });

    notify(`🚀 Deployed "${agentTitle}" to active Inbound Agents! Ready for live telephony.`);
  };

  // Call real Gemini Genie Copilot Endpoint
  const handleGenieCustomization = async (instructionText: string) => {
    if (!instructionText.trim() || isGenieThinking) return;

    const userText = instructionText.trim();
    setCopilotInput('');

    // Push user message
    setCopilotMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsGenieThinking(true);

    // Save snapshot for Undo
    setGenieUndoHistory(prev => [
      ...prev,
      { greeting, persona, environment, objective, speakingStyle, facts, phases, guardrails }
    ]);

    try {
      const response = await fetch('/api/voice-genie/customize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instruction: userText,
          template: {
            ...template,
            title: agentTitle,
            greeting,
            persona,
            environmentAndSituation: environment,
            objective,
            speakingStyle,
            facts,
            conversationPhases: phases,
            guardrails,
            variables
          }
        })
      });

      const data = await response.json();

      if (data.updatedTemplate) {
        const u = data.updatedTemplate;
        if (u.greeting) setGreeting(u.greeting);
        if (u.persona) setPersona(u.persona);
        if (u.environmentAndSituation) setEnvironment(u.environmentAndSituation);
        if (u.objective) setObjective(u.objective);
        if (u.speakingStyle) setSpeakingStyle(u.speakingStyle);
        if (u.facts) setFacts(u.facts);
        if (u.conversationPhases && u.conversationPhases.length > 0) setPhases(u.conversationPhases);
        if (u.guardrails && u.guardrails.length > 0) setGuardrails(u.guardrails);
      }

      setCopilotMessages(prev => [
        ...prev,
        {
          sender: 'genie',
          text: data.reply || `I have refined the agent prompt to incorporate your instructions. Cadence and conversational safety are maintained.`,
          suggestedChips: [
            'Test greeting pronunciation',
            'Audit architecture readiness',
            'Translate greeting into Hindi & Odia'
          ]
        }
      ]);

      notify('✨ Genie updated agent instructions!');
    } catch (err) {
      console.error('Genie copilot error:', err);
      setCopilotMessages(prev => [
        ...prev,
        {
          sender: 'genie',
          text: `I encountered an issue connecting to the AI model, but I have noted: "${userText}". You can also adjust the fields directly in the editor.`
        }
      ]);
    } finally {
      setIsGenieThinking(false);
    }
  };

  // Undo last Genie change
  const handleUndoGenie = () => {
    if (genieUndoHistory.length === 0) return;
    const last = genieUndoHistory[genieUndoHistory.length - 1];
    setGreeting(last.greeting);
    setPersona(last.persona);
    setEnvironment(last.environment);
    setObjective(last.objective);
    setSpeakingStyle(last.speakingStyle);
    setFacts(last.facts);
    setPhases(last.phases);
    setGuardrails(last.guardrails);
    setGenieUndoHistory(prev => prev.slice(0, -1));
    notify('Reverted prompt to state before last Genie edit.', 'info');
  };

  // Variable CRUD
  const handleAddVariable = () => {
    if (!newVariableKey.trim() || !newVariableLabel.trim()) return;
    const cleanKey = newVariableKey.trim().replace(/[^a-zA-Z0-9_]/g, '');
    const newVar: PromptVariable = {
      key: cleanKey,
      label: newVariableLabel.trim(),
      defaultValue: newVariableDefault.trim() || 'Sample Value',
      description: newVariableDesc.trim() || 'Custom variable token'
    };
    setVariables(prev => [...prev.filter(v => v.key !== cleanKey), newVar]);
    setNewVariableKey('');
    setNewVariableLabel('');
    setNewVariableDefault('');
    setNewVariableDesc('');
    setShowAddVariableDrawer(false);
    notify(`Added variable {${cleanKey}}!`);
  };

  const handleDeleteVariable = (keyToDelete: string) => {
    setVariables(prev => prev.filter(v => v.key !== keyToDelete));
    notify(`Removed variable {${keyToDelete}}.`);
  };

  // Render text with interactive highlighted variable chips
  const renderTextWithVariableChips = (text: string) => {
    const parts = text.split(/(\{[^}]+\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const varName = part.slice(1, -1);
        const isKnown = variables.some(v => v.key === varName);
        const isTool = varName.includes('check_') || varName.includes('book_') || varName.includes('dispatch_') || varName.includes('transfer_');

        return (
          <span
            key={i}
            className={`inline-flex items-center gap-1 px-2 py-0.5 mx-0.5 rounded-md text-xs font-mono font-medium ${
              isTool
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20'
                : isKnown
                  ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20'
                  : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30'
            }`}
          >
            <span>{`{${varName}}`}</span>
            {!isKnown && !isTool && (
              <span className="text-[9px] text-rose-500 font-sans font-bold">(undeclared)</span>
            )}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-145px)] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs">
      
      {/* Dynamic Status Notice Toast */}
      {statusNotice && (
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-2xl text-xs font-semibold shadow-lg border flex items-center gap-2 animate-fade-in ${
          statusNotice.type === 'success'
            ? 'bg-emerald-600 text-white border-emerald-500'
            : statusNotice.type === 'warn'
              ? 'bg-amber-600 text-white border-amber-500'
              : 'bg-blue-600 text-white border-blue-500'
        }`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{statusNotice.message}</span>
          {onOpenPhoneSimulator && statusNotice.message.includes('Deployed') && (
            <button
              onClick={onOpenPhoneSimulator}
              className="ml-2 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-[11px] font-bold"
            >
              Test Now
            </button>
          )}
        </div>
      )}

      {/* Top Application Bar */}
      <div className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/70 shrink-0 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={agentTitle}
                onChange={(e) => setAgentTitle(e.target.value)}
                className="text-sm font-bold text-zinc-900 dark:text-white bg-transparent border-b border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-blue-500 focus:outline-none px-0 py-0.5 truncate max-w-[220px] sm:max-w-[320px]"
                title="Click to rename voice agent"
              />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shrink-0">
                Arohi Voice OS v1.2
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
              {template.category} · {getVoiceDisplayName(recommendedVoice)} (24kHz HD) · {template.language}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
          {/* Audition Opening Line */}
          <button
            onClick={handleToggleAudition}
            title={isAuditioning ? 'Stop speaking' : 'Audition opening line in 24kHz HD Voice'}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isAuditioning
                ? 'bg-rose-500 text-white animate-pulse'
                : 'border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {isAuditioning ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Audition</span>
              </>
            )}
          </button>

          {/* Multilingual Translations Button */}
          <button
            onClick={() => setShowTranslationsModal(true)}
            className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-all cursor-pointer hidden sm:flex"
            title="View Indian vernacular translations (Hindi, Odia, Bengali, Tamil)"
          >
            <Languages className="w-3.5 h-3.5 text-blue-500" />
            <span>Languages</span>
          </button>

          {/* Architecture Audit Button */}
          <button
            onClick={() => setShowAuditModal(true)}
            className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-all cursor-pointer hidden md:flex"
            title="Audit conversational cadence, state machines & anti-hallucination guardrails"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Audit</span>
          </button>

          {/* Save to Custom Catalog */}
          <button
            onClick={handleSaveTemplate}
            className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Save changes to My Custom Agents"
          >
            <Save className="w-3.5 h-3.5 text-amber-500" />
            <span>Save</span>
          </button>

          {/* Deploy to Inbound Agents */}
          <button
            onClick={handleDeployToInbound}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Deploy as live inbound receptionist in Business OS"
          >
            <PhoneForwarded className="w-3.5 h-3.5" />
            <span>Deploy</span>
          </button>

          {/* Test Agent Dual Mode */}
          <button
            onClick={onOpenTestAgentModal}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Test</span>
          </button>

          {/* Toggle Genie Copilot Drawer */}
          <button
            onClick={() => setShowGenieCopilot(!showGenieCopilot)}
            title="Toggle Arohi Genie Copilot"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              showGenieCopilot
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
            }`}
          >
            <Wand2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Studio Body: Left Nav + Center Editor + Right Genie Drawer */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sub-Navigation */}
        <div className="w-48 border-r border-zinc-200 dark:border-zinc-800 p-3 space-y-1.5 bg-zinc-50/40 dark:bg-zinc-900/40 hidden md:block shrink-0">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'instructions'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-xs border border-zinc-200/80 dark:border-zinc-700'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
            }`}
          >
            <FileCode2 className="w-4 h-4 text-blue-500" />
            <span>Instructions</span>
          </button>

          <button
            onClick={() => setActiveTab('variables')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'variables'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-xs border border-zinc-200/80 dark:border-zinc-700'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-500" />
            <span>Variables</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-bold">
              {variables.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'tools'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-xs border border-zinc-200/80 dark:border-zinc-700'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-500" />
            <span>Tools & Webhooks</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold">
              {toolsState.filter(t => t.enabled).length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-xs border border-zinc-200/80 dark:border-zinc-700'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Settings className="w-4 h-4 text-purple-500" />
            <span>Telephony Settings</span>
          </button>

          {/* Visual Flow Canvas shortcut */}
          <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              onClick={onSwitchToVisualFlow}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <GitBranch className="w-4 h-4" />
              <span>Visual Flow Canvas</span>
            </button>
          </div>
        </div>

        {/* Center Canvas Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: INSTRUCTIONS (FULL PROMPT ENGINEERING & STATE MACHINE) */}
          {activeTab === 'instructions' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Variable Quick-Insert Toolbar */}
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Code2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>Quick Variable Insertion</span>
                  </span>
                  
                  {/* Mode Switcher */}
                  <div className="flex items-center bg-zinc-200/70 dark:bg-zinc-700/60 rounded-lg p-0.5">
                    <button
                      onClick={() => setPromptViewMode('edit')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        promptViewMode === 'edit'
                          ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                          : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                      }`}
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setPromptViewMode('preview')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        promptViewMode === 'preview'
                          ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                          : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Chips Preview</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {variables.map((v) => (
                    <button
                      key={v.key}
                      onClick={() => {
                        navigator.clipboard.writeText(`{${v.key}}`);
                        notify(`Copied {${v.key}} to clipboard!`);
                      }}
                      title={`Default: "${v.defaultValue}". Click to copy token`}
                      className="px-2 py-1 rounded-lg bg-white dark:bg-zinc-700/80 hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-zinc-200 dark:border-zinc-600 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-200 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="text-blue-500">+</span>
                      <span>{`{${v.key}}`}</span>
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setActiveTab('variables')}
                    className="px-2 py-1 rounded-lg text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Manage</span>
                  </button>
                </div>

                {/* Undeclared Tokens Alert */}
                {undeclaredTokens.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Found {undeclaredTokens.length} undeclared token(s): {undeclaredTokens.map(t => `{${t}}`).join(', ')}</span>
                    </div>
                    <button
                      onClick={() => {
                        undeclaredTokens.forEach(t => {
                          setVariables(prev => [...prev, {
                            key: t,
                            label: t.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
                            defaultValue: 'Sample Value',
                            description: 'Auto-registered variable'
                          }]);
                        });
                        notify(`Registered ${undeclaredTokens.length} variable(s)!`);
                      }}
                      className="px-2.5 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold shrink-0 cursor-pointer"
                    >
                      Register All
                    </button>
                  </div>
                )}
              </div>

              {/* 1. Spoken Opening Greeting (Cadence Sensitive) */}
              <div className="space-y-2 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Opening Spoken Greeting
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isCadenceWarning
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    }`}>
                      {greetingWords} words {isCadenceWarning ? '(Long · Indian callers prefer < 25 words)' : '(Optimal Cadence)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowTranslationsModal(true)}
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Languages className="w-3 h-3" />
                      <span>Translate</span>
                    </button>
                  </div>
                </div>

                {promptViewMode === 'edit' ? (
                  <textarea
                    rows={3}
                    value={greeting}
                    onChange={(e) => setGreeting(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans leading-relaxed"
                    placeholder="Hello {userName}, this is Arohi calling from {storeName}..."
                  />
                ) : (
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white leading-relaxed">
                    {renderTextWithVariableChips(greeting)}
                  </div>
                )}
                <p className="text-[11px] text-zinc-400">
                  This is the first sentence spoken when the customer answers the phone. Keep it crisp, warm, and under 25 words.
                </p>
              </div>

              {/* 2. Persona & Indian Voice Character */}
              <div className="space-y-2 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Persona & Indian Voice Identity
                </span>
                {promptViewMode === 'edit' ? (
                  <textarea
                    rows={4}
                    value={persona}
                    onChange={(e) => setPersona(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono leading-relaxed"
                  />
                ) : (
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white leading-relaxed whitespace-pre-wrap font-mono">
                    {renderTextWithVariableChips(persona)}
                  </div>
                )}
              </div>

              {/* 3. Environment & Situation */}
              <div className="space-y-2 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Environment & Operational Context
                </span>
                {promptViewMode === 'edit' ? (
                  <textarea
                    rows={3}
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans leading-relaxed"
                  />
                ) : (
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white leading-relaxed whitespace-pre-wrap">
                    {renderTextWithVariableChips(environment)}
                  </div>
                )}
              </div>

              {/* 4. Objective */}
              <div className="space-y-2 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Call Objective & Success Criteria
                </span>
                {promptViewMode === 'edit' ? (
                  <textarea
                    rows={3}
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans leading-relaxed"
                  />
                ) : (
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white leading-relaxed">
                    {renderTextWithVariableChips(objective)}
                  </div>
                )}
              </div>

              {/* 5. Speaking Style & Cadence Mandate */}
              <div className="space-y-2 p-4 rounded-2xl border border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/10 shadow-xs">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-500" />
                  <span>Speaking Style & Indian Telephony Cadence</span>
                </span>
                {promptViewMode === 'edit' ? (
                  <textarea
                    rows={3}
                    value={speakingStyle}
                    onChange={(e) => setSpeakingStyle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans leading-relaxed"
                  />
                ) : (
                  <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-900 dark:text-white leading-relaxed whitespace-pre-wrap">
                    {renderTextWithVariableChips(speakingStyle)}
                  </div>
                )}
              </div>

              {/* 6. Facts & Numerical Policies */}
              <div className="space-y-2 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Facts & Numerical Policies (Zero Hallucination Anchor)
                </span>
                {promptViewMode === 'edit' ? (
                  <textarea
                    rows={4}
                    value={facts}
                    onChange={(e) => setFacts(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans leading-relaxed"
                  />
                ) : (
                  <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white leading-relaxed whitespace-pre-wrap">
                    {renderTextWithVariableChips(facts)}
                  </div>
                )}
              </div>

              {/* 7. Conversation Phases (Deterministic State Machine) */}
              <div className="space-y-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Conversation State Machine ({phases.length} Phases)
                    </span>
                    <p className="text-[11px] text-zinc-500">
                      Enforces deterministic flow steps so the AI never skips verification or call outcomes.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const nextNum = phases.length + 1;
                      setPhases(prev => [
                        ...prev,
                        {
                          phase: `Phase ${nextNum}`,
                          title: 'New Conversation Step',
                          guidelines: ['Specify exact behavioral guidelines for this phase.']
                        }
                      ]);
                      notify('Added conversation phase!');
                    }}
                    className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Phase</span>
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {phases.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/50 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={p.phase}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPhases(prev => prev.map((item, i) => i === idx ? { ...item, phase: val } : item));
                            }}
                            className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 w-24 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPhases(prev => prev.map((item, i) => i === idx ? { ...item, title: val } : item));
                            }}
                            className="text-xs font-bold text-zinc-900 dark:text-white bg-transparent border-b border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 focus:outline-none flex-1"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          {idx > 0 && (
                            <button
                              onClick={() => {
                                setPhases(prev => {
                                  const arr = [...prev];
                                  const temp = arr[idx - 1];
                                  arr[idx - 1] = arr[idx];
                                  arr[idx] = temp;
                                  return arr;
                                });
                              }}
                              className="p-1 text-zinc-400 hover:text-zinc-600 rounded"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                          )}
                          {idx < phases.length - 1 && (
                            <button
                              onClick={() => {
                                setPhases(prev => {
                                  const arr = [...prev];
                                  const temp = arr[idx + 1];
                                  arr[idx + 1] = arr[idx];
                                  arr[idx] = temp;
                                  return arr;
                                });
                              }}
                              className="p-1 text-zinc-400 hover:text-zinc-600 rounded"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setPhases(prev => prev.filter((_, i) => i !== idx));
                              notify('Removed phase.');
                            }}
                            className="p-1 text-rose-400 hover:text-rose-600 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        value={p.guidelines.join('\n')}
                        onChange={(e) => {
                          const lines = e.target.value.split('\n');
                          setPhases(prev => prev.map((item, i) => i === idx ? { ...item, guidelines: lines } : item));
                        }}
                        className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                        placeholder="Guidelines (one per line)..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. Operational Guardrails */}
              <div className="space-y-3 p-4 rounded-2xl border border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/10 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Operational Guardrails & Safety Boundaries</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {guardrails.map((gr, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <input
                        type="text"
                        value={gr}
                        onChange={(e) => {
                          const val = e.target.value;
                          setGuardrails(prev => prev.map((item, i) => i === idx ? val : item));
                        }}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-amber-200/80 dark:border-amber-800/80 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        onClick={() => {
                          setGuardrails(prev => prev.filter((_, i) => i !== idx));
                          notify('Removed guardrail.');
                        }}
                        className="p-1.5 text-zinc-400 hover:text-rose-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Add Guardrail Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add a new guardrail rule..."
                      value={newGuardrailInput}
                      onChange={(e) => setNewGuardrailInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newGuardrailInput.trim()) {
                          setGuardrails(prev => [...prev, newGuardrailInput.trim()]);
                          setNewGuardrailInput('');
                          notify('Added guardrail!');
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        if (!newGuardrailInput.trim()) return;
                        setGuardrails(prev => [...prev, newGuardrailInput.trim()]);
                        setNewGuardrailInput('');
                        notify('Added guardrail!');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: VARIABLES (DYNAMIC CRUD, IN-USE COUNT & SIMULATOR) */}
          {activeTab === 'variables' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-500" />
                    <span>Dynamic Variable Tokens</span>
                    <span className="px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                      {variables.length} Active
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Variables injected during live telephony from CRM contacts, orders, or dialer payloads.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddVariableDrawer(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-start"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Variable</span>
                </button>
              </div>

              {/* Add Variable Drawer */}
              {showAddVariableDrawer && (
                <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                      Declare New Prompt Variable
                    </span>
                    <button
                      onClick={() => setShowAddVariableDrawer(false)}
                      className="text-zinc-400 hover:text-zinc-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                        Token Key (e.g. customerCity)
                      </label>
                      <input
                        type="text"
                        placeholder="customerCity"
                        value={newVariableKey}
                        onChange={(e) => setNewVariableKey(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                        Display Label
                      </label>
                      <input
                        type="text"
                        placeholder="Customer City"
                        value={newVariableLabel}
                        onChange={(e) => setNewVariableLabel(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                        Default Test Value
                      </label>
                      <input
                        type="text"
                        placeholder="Bhubaneswar"
                        value={newVariableDefault}
                        onChange={(e) => setNewVariableDefault(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        placeholder="City of delivery or residence"
                        value={newVariableDesc}
                        onChange={(e) => setNewVariableDesc(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setShowAddVariableDrawer(false)}
                      className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddVariable}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Save Variable
                    </button>
                  </div>
                </div>
              )}

              {/* Variables Table */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs">
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {variables.map((v) => {
                    // Count occurrences
                    const fullText = `${greeting} ${persona} ${environment} ${objective} ${speakingStyle} ${facts} ${phases.map(p => p.guidelines.join(' ')).join(' ')}`;
                    const occurrences = (fullText.match(new RegExp(`\\{${v.key}\\}`, 'g')) || []).length;

                    return (
                      <div key={v.key} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md border border-blue-500/20">
                              {`{${v.key}}`}
                            </span>
                            <span className="text-xs font-bold text-zinc-900 dark:text-white">
                              {v.label}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                              occurrences > 0
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                            }`}>
                              {occurrences} in use
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500">{v.description}</p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <div className="text-right">
                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Default Value</span>
                            <input
                              type="text"
                              value={v.defaultValue}
                              onChange={(e) => {
                                const val = e.target.value;
                                setVariables(prev => prev.map(item => item.key === v.key ? { ...item, defaultValue: val } : item));
                              }}
                              className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>

                          <button
                            onClick={() => handleDeleteVariable(v.key)}
                            title="Delete variable"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sample Simulator Evaluation */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/80 space-y-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-blue-500" />
                  <span>Live Variable Resolved Greeting Preview</span>
                </span>
                <p className="text-xs font-serif italic text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  "{(() => {
                    let speechText = greeting;
                    variables.forEach(v => {
                      speechText = speechText.split(`{${v.key}}`).join(v.defaultValue);
                    });
                    return speechText;
                  })()}"
                </p>
              </div>

            </div>
          )}

          {/* TAB 3: TOOLS & WEBHOOKS (REAL FUNCTION HOOKS) */}
          {activeTab === 'tools' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-500" />
                  <span>Telephony Tools, CRM Webhooks & Triggers</span>
                </h3>
                <p className="text-xs text-zinc-500">
                  During telephone calls, the AI autonomously invokes these tools to check availability, book slots, send WhatsApp brochures, or warm transfer to human staff.
                </p>
              </div>

              <div className="space-y-3">
                {toolsState.map((tool) => (
                  <div
                    key={tool.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      tool.enabled
                        ? 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xs'
                        : 'border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                            {tool.id}
                          </span>
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">
                            {tool.name}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500">{tool.description}</p>
                      </div>

                      {/* Toggle Switch */}
                      <button
                        onClick={() => {
                          setToolsState(prev => prev.map(t => t.id === tool.id ? { ...t, enabled: !t.enabled } : t));
                          notify(`${tool.enabled ? 'Disabled' : 'Enabled'} tool: ${tool.name}`);
                        }}
                        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                          tool.enabled ? 'bg-emerald-600' : 'bg-zinc-300 dark:bg-zinc-700'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                          tool.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    {/* Expandable Webhook Configuration */}
                    {tool.enabled && (
                      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="sm:col-span-2">
                            <label className="text-[10px] text-zinc-400 font-semibold block mb-0.5">Webhook URL Endpoint</label>
                            <input
                              type="text"
                              value={tool.endpointUrl}
                              onChange={(e) => {
                                const val = e.target.value;
                                setToolsState(prev => prev.map(t => t.id === tool.id ? { ...t, endpointUrl: val } : t));
                              }}
                              className="w-full px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-mono text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-zinc-400 font-semibold block mb-0.5">HTTP Method</label>
                            <select
                              value={tool.method}
                              onChange={(e: any) => {
                                const val = e.target.value;
                                setToolsState(prev => prev.map(t => t.id === tool.id ? { ...t, method: val } : t));
                              }}
                              className="w-full px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[11px]"
                            >
                              <option value="POST">POST (JSON payload)</option>
                              <option value="GET">GET (Query params)</option>
                            </select>
                          </div>
                        </div>

                        {tool.requiresAuth && (
                          <div>
                            <label className="text-[10px] text-zinc-400 font-semibold block mb-0.5">Authorization Header</label>
                            <input
                              type="password"
                              value={tool.authToken}
                              onChange={(e) => {
                                const val = e.target.value;
                                setToolsState(prev => prev.map(t => t.id === tool.id ? { ...t, authToken: val } : t));
                              }}
                              className="w-full px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-mono text-[11px]"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS (VOICE, PITCH, CADENCE & AUDIO) */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-500" />
                  <span>Telephony Engine & Audio Settings</span>
                </h3>
                <p className="text-xs text-zinc-500">
                  Acoustic settings, ambient background soundscape, and conversational speed calibration.
                </p>
              </div>

              {/* Voice Profile Selector */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Neural Voice Persona (24kHz HD Telephony)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VOICE_DISPLAY_OPTIONS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setRecommendedVoice(v.id as any);
                        notify(`Selected ${v.name}`);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        recommendedVoice === v.id
                          ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 ring-1 ring-blue-500/30'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">{v.name}</span>
                        {recommendedVoice === v.id && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-1">{v.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Speech Rate & Pitch Sliders */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Cadence Speed & Pitch Calibration
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-zinc-600 dark:text-zinc-400">Speech Rate</span>
                      <span className="font-mono font-bold text-blue-600">{speechRate.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.3"
                      step="0.05"
                      value={speechRate}
                      onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <span className="text-[10px] text-zinc-400">1.0x is calibrated for Indian telephone audio clarity</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-zinc-600 dark:text-zinc-400">Voice Pitch</span>
                      <span className="font-mono font-bold text-blue-600">{voicePitch.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.2"
                      step="0.05"
                      value={voicePitch}
                      onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <span className="text-[10px] text-zinc-400">Natural harmonic modulation</span>
                  </div>
                </div>
              </div>

              {/* Ambient Audio Selector */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                <EnvironmentSoundSelector
                  selectedSound={backgroundSound}
                  onChangeSound={(sound) => setBackgroundSound(sound)}
                />
              </div>

              {/* Multilingual Adaptation */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                    Dynamic Vernacular Switching
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    If caller speaks Odia or Hindi, Arohi smoothly switches dialect mid-call without disconnecting.
                  </p>
                </div>
                <button
                  onClick={() => setSwitchLanguageDuringCall(!switchLanguageDuringCall)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    switchLanguageDuringCall ? 'bg-emerald-600' : 'bg-zinc-300 dark:bg-zinc-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    switchLanguageDuringCall ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right Drawer: Real Gemini Genie Copilot */}
        {showGenieCopilot && (
          <div className="w-80 lg:w-96 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 flex flex-col justify-between shrink-0 animate-fade-in">
            
            {/* Genie Header */}
            <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Wand2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <span>Arohi Genie Copilot</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {genieUndoHistory.length > 0 && (
                  <button
                    onClick={handleUndoGenie}
                    title="Undo last Genie prompt edit"
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-xs flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="text-[10px]">Undo</span>
                  </button>
                )}
                <button
                  onClick={() => setShowGenieCopilot(false)}
                  className="p-1 rounded-md text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
              {copilotMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`space-y-1.5 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-2xl text-xs leading-relaxed max-w-[90%] ${
                      msg.sender === 'user'
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium'
                        : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Suggested Quick Prompt Chips */}
                  {msg.suggestedChips && msg.suggestedChips.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {msg.suggestedChips.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleGenieCustomization(chip)}
                          className="px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-600 dark:text-blue-300 text-[10px] font-semibold border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer text-left"
                        >
                          ⚡ {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isGenieThinking && (
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                  <span>Genie is analyzing prompt architecture...</span>
                </div>
              )}
            </div>

            {/* Genie Input Box */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGenieCustomization(copilotInput);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask Genie to change tone, add rules..."
                  value={copilotInput}
                  onChange={(e) => setCopilotInput(e.target.value)}
                  disabled={isGenieThinking}
                  className="flex-1 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!copilotInput.trim() || isGenieThinking}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>
        )}

      </div>

      {/* Multilingual Variants Modal */}
      <GenieTranslationsModal
        isOpen={showTranslationsModal}
        onClose={() => setShowTranslationsModal(false)}
        greetingText={greeting}
        recommendedVoice={recommendedVoice}
        onApplyTranslation={(translatedText, langName) => {
          setGreeting(translatedText);
          notify(`Applied ${langName} greeting!`);
        }}
      />

      {/* Architecture Audit Modal */}
      <GenieAuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        template={{
          ...template,
          title: agentTitle,
          greeting,
          persona,
          environmentAndSituation: environment,
          objective,
          speakingStyle,
          facts,
          conversationPhases: phases,
          guardrails,
          variables
        }}
        greetingText={greeting}
        onApplyFixes={(recommendationsText) => {
          handleGenieCustomization(`Fix these audit recommendations: ${recommendationsText}`);
        }}
      />

    </div>
  );
}
