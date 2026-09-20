import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  CreditCard,
  Truck,
  Building2,
  PhoneCall,
  ShieldCheck,
  Plus,
  ArrowRight,
  Filter,
  Layers,
  Bot,
  Volume2,
  VolumeX,
  Copy,
  Trash2,
  Search,
  CheckCircle2,
  PhoneForwarded,
  Sliders,
  ExternalLink,
  RotateCcw,
  Sparkle,
  Radio,
  FileText
} from 'lucide-react';
import {
  VoiceAgentTemplate,
  VoiceAgentCategory,
  getAllVoiceTemplates,
  createBlankVoiceTemplate,
  saveCustomTemplate,
  deleteCustomTemplate
} from './arohiPromptTemplateData';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';
import { useBusinessOS } from './BusinessOSContext';
import { VoiceProfileId } from './types';
import CreateCallingAgentWizardModal from '../calling_agents/CreateCallingAgentWizardModal';
import { CustomCallingAgentConfig } from '../../data/indianVoiceAgentsCatalog';

interface VoiceAgentsTemplatesViewProps {
  onSelectTemplate: (template: VoiceAgentTemplate) => void;
  onCreateFromScratch: () => void;
  onOpenPhoneSimulator?: (agentId?: string) => void;
}

export default function VoiceAgentsTemplatesView({
  onSelectTemplate,
  onCreateFromScratch,
  onOpenPhoneSimulator
}: VoiceAgentsTemplatesViewProps) {
  const { addInboundAgent, setActiveInboundAgentId } = useBusinessOS();

  // Template Catalog State (synced with localStorage engine)
  const [templates, setTemplates] = useState<VoiceAgentTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVoiceFilter, setSelectedVoiceFilter] = useState<string>('All');
  
  // Audition State
  const [auditioningTemplateId, setAuditioningTemplateId] = useState<string | null>(null);
  const [deploySuccessMessage, setDeploySuccessMessage] = useState<string | null>(null);
  const [showWizardModal, setShowWizardModal] = useState<boolean>(false);

  // Reload templates from storage + defaults
  const reloadTemplates = () => {
    const list = getAllVoiceTemplates();
    setTemplates(list);
  };

  const handleWizardAgentCreated = (agent: CustomCallingAgentConfig) => {
    // Map voice profile to InboundVoiceAgent voiceProfile
    let mappedVoice: VoiceProfileId = 'Arohi-Warm-Female';
    if (agent.voiceProfile === 'Fenrir') mappedVoice = 'Arohi-Executive-Male';
    else if (agent.voiceProfile === 'Aoede') mappedVoice = 'Arohi-Empathetic-Female';
    else if (agent.voiceProfile === 'Puck') mappedVoice = 'Arohi-Energetic-Male';

    // Map department
    let department: 'Reception & Front Desk' | 'Sales & Qualification' | 'Appointments & Booking' | 'Customer Support' | 'VIP Concierge' = 'Reception & Front Desk';
    if (agent.industryId === 'real_estate' || agent.industryId === 'b2b_services') {
      department = 'Sales & Qualification';
    } else if (agent.industryId === 'healthcare') {
      department = 'Appointments & Booking';
    } else if (agent.industryId === 'civic_pwd') {
      department = 'VIP Concierge';
    } else if (agent.industryId === 'retail_ecommerce') {
      department = 'Customer Support';
    }

    // Map operating hours to allowed union
    let mappedHours: '24/7 Always Active' | 'Business Hours (9 AM - 7 PM)' | 'After Hours & Weekends' = '24/7 Always Active';
    if (agent.operatingHours === 'Business Hours (9 AM - 7 PM)') {
      mappedHours = 'Business Hours (9 AM - 7 PM)';
    } else if (agent.operatingHours === 'After Hours & Weekends') {
      mappedHours = 'After Hours & Weekends';
    }

    // Also deploy as an active InboundAgent into BusinessOS
    addInboundAgent({
      name: agent.name,
      role: agent.roleTitle || 'AI Calling Specialist',
      department,
      language: agent.primaryLanguage,
      voiceProfile: mappedVoice,
      pitch: 1.0,
      speechRate: 1.0,
      greetingMessage: agent.greetingText,
      businessName: agent.companyName,
      knowledgeBase: `${agent.industryName} - ${agent.roleTitle}\n\nCall Goal:\n${agent.primaryObjective}\n\nKey Questions:\n${agent.questionsToAsk.join('\n')}\n\nGuardrails:\n${agent.guardrails.join('\n')}`,
      autoActions: {
        createCrmLead: true,
        sendWhatsAppNotification: true,
        bookCalendarAppointment: true,
        forwardToHumanOnUrgent: true
      },
      forwardingPhoneNumber: agent.transferPhoneNumber || '+91 93379 52401',
      assignedPhoneNumber: '+91 80 4736 2901',
      operatingHours: mappedHours,
      backgroundSound: (agent.backgroundSound === 'office' || agent.backgroundSound === 'call_center' || agent.backgroundSound === 'none') ? agent.backgroundSound : 'office',
      switchLanguageDuringCall: true,
      isActive: true
    });

    reloadTemplates();
    setDeploySuccessMessage(`🎉 Successfully created "${agent.name}" with Indian Avatar and deployed to active Inbound Agents!`);
  };

  const getVoiceDisplayShort = (voiceId?: string) => {
    switch (voiceId) {
      case 'Zypher': return 'Arohi (Signature)';
      case 'Aoede': return 'Meera (Empathetic)';
      case 'Fenrir': return 'Arjun (Enterprise)';
      case 'Puck': return 'Kabir (Logistics)';
      default: return voiceId ? `${voiceId}` : 'Arohi (Signature)';
    }
  };

  useEffect(() => {
    reloadTemplates();
    return () => {
      stopArohiVoice();
    };
  }, []);

  // Category list
  const categoryFilters: string[] = [
    'All',
    'Inbound Reception',
    'Customer Support',
    'Appointment Booking',
    'Collections & Recovery',
    'Logistics & NDR',
    'Sales & Lead Gen',
    'Government & Civic',
    'Feedback & Surveys',
    'My Custom Agents'
  ];

  // Filter templates
  const filteredTemplates = templates.filter((template) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = template.title.toLowerCase().includes(q);
      const matchDesc = template.description.toLowerCase().includes(q);
      const matchCategory = template.category.toLowerCase().includes(q);
      const matchGreeting = template.greeting.toLowerCase().includes(q);
      const matchVar = template.variables.some(v => v.label.toLowerCase().includes(q) || v.key.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCategory && !matchGreeting && !matchVar) {
        return false;
      }
    }

    // Category match
    if (selectedCategory === 'My Custom Agents') {
      if (!template.isCustom) return false;
    } else if (selectedCategory !== 'All') {
      if (template.category !== selectedCategory) return false;
    }

    // Voice match
    if (selectedVoiceFilter !== 'All') {
      if (template.recommendedVoice !== selectedVoiceFilter) return false;
    }

    return true;
  });

  // Audition greeting
  const handleToggleAudition = (template: VoiceAgentTemplate, e: React.MouseEvent) => {
    e.stopPropagation();

    if (auditioningTemplateId === template.id) {
      stopArohiVoice();
      setAuditioningTemplateId(null);
      return;
    }

    stopArohiVoice();
    setAuditioningTemplateId(template.id);

    // Replace sample variable tokens with default values for natural speech
    let speechText = template.greeting;
    template.variables.forEach(v => {
      speechText = speechText.split(`{${v.key}}`).join(v.defaultValue);
    });

    playArohiVoice(speechText, {
      voice: template.recommendedVoice || 'Zypher',
      onEnd: () => {
        setAuditioningTemplateId(null);
      }
    });
  };

  // Clone template
  const handleCloneTemplate = (template: VoiceAgentTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    const cloned: VoiceAgentTemplate = {
      ...template,
      id: `custom_clone_${Date.now()}`,
      title: `${template.title} (Clone)`,
      isCustom: true,
      lastModified: new Date().toISOString()
    };
    saveCustomTemplate(cloned);
    reloadTemplates();
    setDeploySuccessMessage(`Cloned "${template.title}" to My Custom Agents!`);
    setTimeout(() => setDeploySuccessMessage(null), 4000);
  };

  // Delete custom template
  const handleDeleteTemplate = (templateId: string, templateTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCustomTemplate(templateId);
    reloadTemplates();
    setDeploySuccessMessage(`Deleted custom agent "${templateTitle}".`);
    setTimeout(() => setDeploySuccessMessage(null), 3000);
  };

  // Quick deploy to Inbound Agents
  const handleQuickDeploy = (template: VoiceAgentTemplate, e: React.MouseEvent) => {
    e.stopPropagation();

    // Map voice profile
    let mappedVoice: VoiceProfileId = 'Arohi-Warm-Female';
    if (template.recommendedVoice === 'Fenrir') mappedVoice = 'Arohi-Executive-Male';
    else if (template.recommendedVoice === 'Aoede') mappedVoice = 'Arohi-Empathetic-Female';
    else if (template.recommendedVoice === 'Puck') mappedVoice = 'Arohi-Energetic-Male';

    // Map department
    let department: any = 'Customer Support';
    if (template.category === 'Inbound Reception') department = 'Reception & Front Desk';
    else if (template.category === 'Sales & Lead Gen') department = 'Sales & Qualification';
    else if (template.category === 'Appointment Booking') department = 'Appointments & Booking';
    else if (template.category === 'Government & Civic') department = 'VIP Concierge';

    // Extract business name
    const bVar = template.variables.find(v => v.key === 'businessName' || v.key === 'storeName' || v.key === 'companyName' || v.key === 'kendraName');
    const businessName = bVar ? bVar.defaultValue : 'Arohi Enterprise';

    addInboundAgent({
      name: template.title,
      role: template.persona.split('\n')[0] || `${template.title} Specialist`,
      department,
      language: template.language,
      voiceProfile: mappedVoice,
      pitch: 1.0,
      speechRate: 1.0,
      greetingMessage: template.greeting,
      businessName,
      knowledgeBase: `${template.objective}\n\nFacts & Policies:\n${template.facts}\n\nGuardrails:\n${template.guardrails.join('\n')}`,
      autoActions: {
        createCrmLead: true,
        sendWhatsAppNotification: true,
        bookCalendarAppointment: true,
        forwardToHumanOnUrgent: true
      },
      forwardingPhoneNumber: '+91 93379 52401',
      assignedPhoneNumber: '+91 80 4736 2901',
      operatingHours: '24/7 Always Active',
      backgroundSound: template.backgroundSound || 'office',
      switchLanguageDuringCall: template.switchLanguageDuringCall ?? true,
      isActive: true
    });

    setDeploySuccessMessage(`🎉 Successfully deployed "${template.title}" to active Inbound Agents!`);
  };

  const getTemplateIcon = (id: string, category: string) => {
    switch (category) {
      case 'Appointment Booking':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'Collections & Recovery':
        return <CreditCard className="w-5 h-5 text-emerald-500" />;
      case 'Logistics & NDR':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'Sales & Lead Gen':
        return <Building2 className="w-5 h-5 text-amber-500" />;
      case 'Inbound Reception':
        return <PhoneCall className="w-5 h-5 text-blue-500" />;
      case 'Government & Civic':
        return <ShieldCheck className="w-5 h-5 text-indigo-500" />;
      default:
        return <Bot className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Inbound Reception':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Customer Support':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Collections & Recovery':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Logistics & NDR':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Sales & Lead Gen':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Government & Civic':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'Appointment Booking':
        return 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Notification Banner */}
      {deploySuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-4 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{deploySuccessMessage}</span>
          </div>
          {onOpenPhoneSimulator && (
            <button
              onClick={() => onOpenPhoneSimulator()}
              className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Test in Phone Simulator</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Agent Templates
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-500/20">
              Arohi Voice OS Catalog · 10 Production Blueprints
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
            Battle-tested Indian enterprise telephone agents. Fully equipped with conversational guidance, natural human-like voices, intelligent workflows, and direct CRM webhooks.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShowWizardModal(true)}
            id="create-wizard-agent-btn"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer ring-1 ring-emerald-400/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>⚡ Create Agent in 2 Mins</span>
            <span className="px-1.5 py-0.5 rounded bg-white text-emerald-800 text-[9px] font-black uppercase">NEW</span>
          </button>

          <button
            onClick={() => {
              const blank = createBlankVoiceTemplate();
              saveCustomTemplate(blank);
              onSelectTemplate(blank);
            }}
            id="create-scratch-agent-btn"
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create from scratch</span>
          </button>
        </div>
      </div>

      {/* Search and Voice Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-zinc-50/60 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search templates by role, category, keywords, or variables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <Radio className="w-3.5 h-3.5 text-blue-500" />
            <span>Voice:</span>
          </div>
          <select
            value={selectedVoiceFilter}
            onChange={(e) => setSelectedVoiceFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Voice Styles</option>
            <option value="Zypher">Arohi (Warm &amp; Professional Reception)</option>
            <option value="Aoede">Meera (Gentle Empathetic Care)</option>
            <option value="Fenrir">Arjun (Consultative Enterprise B2B)</option>
            <option value="Puck">Kabir (Agile Support & Logistics)</option>
          </select>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categoryFilters.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = cat === 'All'
            ? templates.length
            : cat === 'My Custom Agents'
              ? templates.filter(t => t.isCustom).length
              : templates.filter(t => t.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-zinc-700 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800' : 'bg-zinc-200/80 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-300'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Templates */}
      {filteredTemplates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-3">
          <Bot className="w-8 h-8 text-zinc-400 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">No agents match your filter</h3>
          <p className="text-xs text-zinc-500">Try adjusting your search terms or select "All" categories.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedVoiceFilter('All');
            }}
            className="px-4 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => {
            const isAuditioning = auditioningTemplateId === template.id;

            return (
              <div
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className="group relative p-5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Custom Agent Top Banner */}
                {template.isCustom && (
                  <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold tracking-wide shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Custom Agent</span>
                  </div>
                )}

                <div className="space-y-3.5">
                  {/* Icon & Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                      {getTemplateIcon(template.id, template.category)}
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getCategoryBadgeClass(template.category)}`}>
                        {template.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                      <span>{template.title}</span>
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  {/* Specs & Capabilities Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                      {template.variables.length} Variables
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                      {template.conversationPhases.length || 5} Phases
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-[11px] font-medium text-blue-600 dark:text-blue-400">
                      {template.language}
                    </span>
                  </div>

                  {/* Spoken Greeting Preview with Audition Wave */}
                  <div className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Radio className="w-3 h-3 text-blue-500" />
                        <span>Opening Spoken Line:</span>
                      </span>

                      {/* Audition Button */}
                      <button
                        onClick={(e) => handleToggleAudition(template, e)}
                        title={isAuditioning ? 'Stop preview' : 'Listen to voice greeting'}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          isAuditioning
                            ? 'bg-rose-500 text-white animate-pulse'
                            : 'bg-zinc-200/80 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200'
                        }`}
                      >
                        {isAuditioning ? (
                          <>
                            <VolumeX className="w-2.5 h-2.5" />
                            <span>Speaking...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-2.5 h-2.5" />
                            <span>Audition Voice</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-zinc-700 dark:text-zinc-300 line-clamp-2 italic font-serif">
                      "{template.greeting}"
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <Bot className="w-3 h-3 text-[#d4af37]" />
                    <span>{getVoiceDisplayShort(template.recommendedVoice)} · Studio Voice</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Clone button */}
                    <button
                      onClick={(e) => handleCloneTemplate(template, e)}
                      title="Clone to My Custom Agents"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete button (custom only) */}
                    {template.isCustom && (
                      <button
                        onClick={(e) => handleDeleteTemplate(template.id, template.title, e)}
                        title="Delete custom agent"
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Quick Deploy button */}
                    <button
                      onClick={(e) => handleQuickDeploy(template, e)}
                      title="Deploy to Inbound Agents for live calling"
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <PhoneForwarded className="w-3 h-3 text-emerald-500" />
                      <span>Deploy</span>
                    </button>

                    {/* Configure in Studio button */}
                    <button
                      onClick={() => onSelectTemplate(template)}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Wizard Modal */}
      {showWizardModal && (
        <CreateCallingAgentWizardModal
          isOpen={showWizardModal}
          onClose={() => setShowWizardModal(false)}
          onAgentCreated={handleWizardAgentCreated}
        />
      )}
    </div>
  );
}
