import React, { useState } from 'react';
import {
  Sparkles,
  PhoneCall,
  Volume2,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Pause,
  Bot,
  ShieldCheck,
  Layers,
  ArrowRight,
  Clock,
  Building,
  User,
  MessageSquare,
  Zap,
  HelpCircle,
  Plus,
  Trash2,
  Calendar,
  Share2,
  Search
} from 'lucide-react';
import {
  INDIAN_VOICE_AVATARS,
  ALL_INDUSTRY_CATEGORIES,
  IndianVoiceAvatar,
  IndustryCategoryMeta,
  CustomCallingAgentConfig,
  saveCustomCallingAgent
} from '../../data/indianVoiceAgentsCatalog';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';

interface CreateCallingAgentWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentCreated: (agent: CustomCallingAgentConfig) => void;
  initialIndustryId?: string;
  initialAvatarId?: string;
}

export default function CreateCallingAgentWizardModal({
  isOpen,
  onClose,
  onAgentCreated,
  initialIndustryId,
  initialAvatarId
}: CreateCallingAgentWizardModalProps) {
  if (!isOpen) return null;

  // Wizard Step: 1 = Avatar & Identity, 2 = Role & Industry, 3 = Workflow & Rules, 4 = Review & Test
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const defaultAvatar = INDIAN_VOICE_AVATARS.find(a => a.id === initialAvatarId) || INDIAN_VOICE_AVATARS[0];
  const defaultIndustry = ALL_INDUSTRY_CATEGORIES.find(i => i.id === initialIndustryId) || ALL_INDUSTRY_CATEGORIES[0];

  const [selectedAvatar, setSelectedAvatar] = useState<IndianVoiceAvatar>(defaultAvatar);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryCategoryMeta>(defaultIndustry);
  
  const [companyName, setCompanyName] = useState<string>('My Business');
  const [roleTitle, setRoleTitle] = useState<string>(selectedAvatar.roleTag);
  const [agentCustomName, setAgentCustomName] = useState<string>(selectedAvatar.name);
  const [primaryLanguage, setPrimaryLanguage] = useState<string>(selectedAvatar.languages[0] || 'Hindi');
  const [secondaryLanguage, setSecondaryLanguage] = useState<string>(selectedAvatar.languages[1] || 'Indian English');
  
  const [greetingText, setGreetingText] = useState<string>(
    `Namaste! Main ${selectedAvatar.name} bol rahi hoon from ${companyName}. Aapki kya sahayata kar sakti hoon?`
  );
  const [primaryObjective, setPrimaryObjective] = useState<string>(selectedIndustry.defaultGoal);
  
  const [questions, setQuestions] = useState<string[]>([...selectedIndustry.suggestedQuestions]);
  const [guardrails, setGuardrails] = useState<string[]>([...selectedIndustry.suggestedGuardrails]);
  const [newQuestionInput, setNewQuestionInput] = useState<string>('');
  const [newGuardrailInput, setNewGuardrailInput] = useState<string>('');

  const [outcomeAction, setOutcomeAction] = useState<'whatsapp_link' | 'calendar_book' | 'crm_lead' | 'transfer_human'>(
    selectedIndustry.defaultOutcome
  );
  const [transferPhone, setTransferPhone] = useState<string>('+91 93379 52401');
  const [operatingHours, setOperatingHours] = useState<string>('24/7 Always Active');
  const [backgroundSound, setBackgroundSound] = useState<'none' | 'office' | 'call_center'>('office');

  // Audition State
  const [isAuditioning, setIsAuditioning] = useState<boolean>(false);
  const [auditionVoiceId, setAuditionVoiceId] = useState<string | null>(null);

  // Avatar Filtering State
  const [avatarSearchQuery, setAvatarSearchQuery] = useState<string>('');
  const [avatarGenderFilter, setAvatarGenderFilter] = useState<'all' | 'female' | 'male'>('all');
  const [industrySearchQuery, setIndustrySearchQuery] = useState<string>('');

  const filteredAvatars = INDIAN_VOICE_AVATARS.filter((avatar) => {
    if (avatarGenderFilter !== 'all' && avatar.gender !== avatarGenderFilter) {
      return false;
    }
    if (!avatarSearchQuery.trim()) return true;
    const q = avatarSearchQuery.toLowerCase();
    return (
      avatar.name.toLowerCase().includes(q) ||
      avatar.region.toLowerCase().includes(q) ||
      avatar.roleTag.toLowerCase().includes(q) ||
      avatar.languages.some((l) => l.toLowerCase().includes(q)) ||
      avatar.bestForIndustries.some((ind) => ind.toLowerCase().includes(q))
    );
  });

  const filteredIndustries = ALL_INDUSTRY_CATEGORIES.filter((ind) => {
    if (!industrySearchQuery.trim()) return true;
    const q = industrySearchQuery.toLowerCase();
    return (
      ind.name.toLowerCase().includes(q) ||
      ind.description.toLowerCase().includes(q) ||
      ind.defaultGoal.toLowerCase().includes(q)
    );
  });

  // When changing Avatar
  const handleSelectAvatar = (avatar: IndianVoiceAvatar) => {
    setSelectedAvatar(avatar);
    setAgentCustomName(avatar.name);
    setRoleTitle(avatar.roleTag);
    setPrimaryLanguage(avatar.languages[0]);
    if (avatar.languages[1]) setSecondaryLanguage(avatar.languages[1]);

    const refreshedGreeting = `Namaste! Main ${avatar.name} baat kar ${avatar.gender === 'female' ? 'rahi hoon' : 'raha hoon'} from ${companyName}. Kaise madad kar ${avatar.gender === 'female' ? 'sakti hoon' : 'sakta hoon'}?`;
    setGreetingText(refreshedGreeting);
  };

  // When changing Industry
  const handleSelectIndustry = (ind: IndustryCategoryMeta) => {
    setSelectedIndustry(ind);
    setPrimaryObjective(ind.defaultGoal);
    setQuestions([...ind.suggestedQuestions]);
    setGuardrails([...ind.suggestedGuardrails]);
    setOutcomeAction(ind.defaultOutcome);
  };

  // Play Audition sample
  const handlePlayVoice = (avatar: IndianVoiceAvatar, customSample?: string) => {
    if (isAuditioning && auditionVoiceId === avatar.id) {
      stopArohiVoice();
      setIsAuditioning(false);
      setAuditionVoiceId(null);
      return;
    }

    stopArohiVoice();
    setIsAuditioning(true);
    setAuditionVoiceId(avatar.id);

    const textToSpeak = customSample || avatar.sampleGreeting;
    playArohiVoice(textToSpeak, {
      voice: avatar.recommendedVoice,
      onEnd: () => {
        setIsAuditioning(false);
        setAuditionVoiceId(null);
      },
      onError: () => {
        setIsAuditioning(false);
        setAuditionVoiceId(null);
      }
    });
  };

  // Add question / guardrail
  const handleAddQuestion = () => {
    if (newQuestionInput.trim()) {
      setQuestions([...questions, newQuestionInput.trim()]);
      setNewQuestionInput('');
    }
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleAddGuardrail = () => {
    if (newGuardrailInput.trim()) {
      setGuardrails([...guardrails, newGuardrailInput.trim()]);
      setNewGuardrailInput('');
    }
  };

  const handleRemoveGuardrail = (idx: number) => {
    setGuardrails(guardrails.filter((_, i) => i !== idx));
  };

  // Final submit
  const handleSaveAndDeploy = () => {
    stopArohiVoice();
    const newAgent: CustomCallingAgentConfig = {
      id: `custom_calling_agent_${Date.now()}`,
      name: agentCustomName || selectedAvatar.name,
      avatarId: selectedAvatar.id,
      avatarName: selectedAvatar.name,
      gender: selectedAvatar.gender,
      industryId: selectedIndustry.id,
      industryName: selectedIndustry.name,
      roleTitle: roleTitle || selectedAvatar.roleTag,
      companyName: companyName || 'My Business',
      primaryLanguage,
      secondaryLanguage,
      voiceProfile: selectedAvatar.recommendedVoice as any,
      tone: selectedAvatar.tone,
      greetingText,
      primaryObjective,
      questionsToAsk: questions,
      guardrails,
      outcomeAction,
      transferPhoneNumber: transferPhone,
      operatingHours,
      backgroundSound,
      createdAt: new Date().toISOString()
    };

    saveCustomCallingAgent(newAgent);
    onAgentCreated(newAgent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in font-sans">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#111319] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto text-left">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border-b border-black/8 dark:border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                  Create AI Calling Agent
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-black uppercase">
                  Zero Code
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Configure your Indian voice avatar, industry persona, and call workflow in under 2 minutes.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopArohiVoice();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Stepper Progress Bar */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900/60 border-b border-black/6 dark:border-white/6 flex items-center justify-between gap-2 overflow-x-auto">
          {[
            { stepNum: 1, label: 'Indian Avatar & Tone' },
            { stepNum: 2, label: 'Industry & Role' },
            { stepNum: 3, label: 'Conversation & Rules' },
            { stepNum: 4, label: 'Preview & Launch' }
          ].map((s) => {
            const isActive = step === s.stepNum;
            const isCompleted = step > s.stepNum;
            return (
              <button
                key={s.stepNum}
                onClick={() => setStep(s.stepNum as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isActive ? 'bg-white text-emerald-700' : isCompleted ? 'bg-emerald-500 text-white' : 'bg-black/10 dark:bg-white/10'
                }`}>
                  {isCompleted ? '✓' : s.stepNum}
                </span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[68vh] overflow-y-auto space-y-6">

          {/* STEP 1: Indian Avatar & Voice */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] text-emerald-600 dark:text-emerald-400">
                  Step 1: Choose Your Indian Voice Avatar
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Select an authentic persona with regional natural inflection, pitch, and multilingual code-switching.
                </p>
              </div>

              {/* Quick Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={avatarSearchQuery}
                    onChange={(e) => setAvatarSearchQuery(e.target.value)}
                    placeholder="Search by name, region, language, or specialty..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex gap-1">
                  {(['all', 'female', 'male'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setAvatarGenderFilter(g)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        avatarGenderFilter === g
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Avatars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredAvatars.map((avatar) => {
                  const isSelected = selectedAvatar.id === avatar.id;
                  const isPlayingThis = isAuditioning && auditionVoiceId === avatar.id;

                  return (
                    <div
                      key={avatar.id}
                      onClick={() => handleSelectAvatar(avatar)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all relative ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500/30'
                          : 'border-black/8 dark:border-white/8 hover:border-emerald-500/40 bg-zinc-50/50 dark:bg-zinc-900/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avatar.avatarBg} text-white flex items-center justify-center text-2xl shadow-sm shrink-0 overflow-hidden relative border border-white/10`}>
                          {avatar.avatarImage ? (
                            <img src={avatar.avatarImage} alt={avatar.name} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            avatar.avatarEmoji
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-sm font-black text-zinc-900 dark:text-white truncate">
                              {avatar.name}
                            </h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 font-mono font-bold">
                              {avatar.gender === 'female' ? 'Female' : 'Male'}
                            </span>
                          </div>

                          <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">
                            {avatar.region}
                          </p>

                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                            {avatar.roleTag}
                          </p>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {avatar.languages.map((l, i) => (
                              <span key={i} className="text-[9px] px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 font-medium">
                                {l}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Audition Button inside card */}
                      <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-zinc-500 truncate max-w-[200px]">
                          Tone: {avatar.tone}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayVoice(avatar);
                          }}
                          className={`px-3 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isPlayingThis
                              ? 'bg-rose-500 text-white shadow-xs'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {isPlayingThis ? (
                            <>
                              <Pause className="w-3 h-3 text-white" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-emerald-500" />
                              <span>Audition Voice</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customize Basic Names & Company */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-black/8 dark:border-white/8 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Calling Identity Settings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 block">
                      Your Business / Organization Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Health Clinic / Solar Bharat / Smart Homes"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 block">
                      Agent Display Name
                    </label>
                    <input
                      type="text"
                      value={agentCustomName}
                      onChange={(e) => setAgentCustomName(e.target.value)}
                      placeholder="e.g. Priya / Arjun / Dr. Ananya"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Industry & Role Definition */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] text-emerald-600 dark:text-emerald-400">
                  Step 2: Select Industry Category &amp; Mission
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Pre-configured prompts, compliance guardrails, and conversation flows mapped to your vertical.
                </p>
              </div>

              {/* Quick Search Industries */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={industrySearchQuery}
                  onChange={(e) => setIndustrySearchQuery(e.target.value)}
                  placeholder="Search industries (e.g. Healthcare, Solar, Real Estate, Legal)..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Industry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredIndustries.map((ind) => {
                  const isSelected = selectedIndustry.id === ind.id;
                  return (
                    <div
                      key={ind.id}
                      onClick={() => handleSelectIndustry(ind)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500/30'
                          : 'border-black/8 dark:border-white/8 hover:border-emerald-500/40 bg-zinc-50/50 dark:bg-zinc-900/40'
                      }`}
                    >
                      <div className="text-2xl mb-1">{ind.icon}</div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                        {ind.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-tight">
                        {ind.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Specific Role & Objective */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-black/8 dark:border-white/8 space-y-3">
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 block">
                    Agent Role Title
                  </label>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g. OPD Appointment Coordinator, Senior Sales Qualifier, COD Confirmation Lead"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 block">
                    Primary Call Goal (What must this agent accomplish?)
                  </label>
                  <textarea
                    rows={2}
                    value={primaryObjective}
                    onChange={(e) => setPrimaryObjective(e.target.value)}
                    placeholder="State what the agent needs to achieve on every call..."
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Workflow, Questions & Guardrails */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] text-emerald-600 dark:text-emerald-400">
                  Step 3: Call Workflow, Questions &amp; Guardrails
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Tell the agent how to begin the call, what details to collect, and what rules to strictly follow.
                </p>
              </div>

              {/* Greeting Script */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-black/8 dark:border-white/8 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Opening Greeting (Spoken in the first 3 seconds)
                  </label>
                  <button
                    type="button"
                    onClick={() => handlePlayVoice(selectedAvatar, greetingText)}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>Audition Greeting</span>
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={greetingText}
                  onChange={(e) => setGreetingText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* 3-4 Key Questions to Collect */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-black/8 dark:border-white/8 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Key Questions the Agent Must Ask
                  </label>
                  <span className="text-[10px] text-zinc-400">One at a time</span>
                </div>

                <div className="space-y-2">
                  {questions.map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white dark:bg-black/40 px-3 py-2 rounded-xl border border-black/5 dark:border-white/5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="flex-1 text-zinc-800 dark:text-zinc-200">{q}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newQuestionInput}
                    onChange={(e) => setNewQuestionInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddQuestion(); } }}
                    placeholder="Add a required question (e.g. Preferred time of visit?)..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Guardrails */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-black/8 dark:border-white/8 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Smart Guardrails &amp; Never-Do Rules
                  </label>
                  <span className="text-[10px] text-zinc-400">Keeps conversations safe</span>
                </div>

                <div className="space-y-2">
                  {guardrails.map((g, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white dark:bg-black/40 px-3 py-2 rounded-xl border border-black/5 dark:border-white/5 text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="flex-1 text-zinc-800 dark:text-zinc-200">{g}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGuardrail(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGuardrailInput}
                    onChange={(e) => setNewGuardrailInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddGuardrail(); } }}
                    placeholder="Add a guardrail (e.g. Never provide medical advice)..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddGuardrail}
                    className="px-3 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Call Outcome & Telephony Behavior */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-black/8 dark:border-white/8 space-y-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                    Automatic Action on Call End
                  </label>
                  <select
                    value={outcomeAction}
                    onChange={(e) => setOutcomeAction(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none"
                  >
                    <option value="calendar_book">Book Slot into Calendar &amp; Send WhatsApp</option>
                    <option value="whatsapp_link">Send WhatsApp Link / UPI QR instantly</option>
                    <option value="crm_lead">Create Qualified Lead in CRM Pipeline</option>
                    <option value="transfer_human">Transfer Call to Human Hotline</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-black/8 dark:border-white/8 space-y-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                    Human Escalation Hotline Number
                  </label>
                  <input
                    type="text"
                    value={transferPhone}
                    onChange={(e) => setTransferPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review, Audition & Launch */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] text-emerald-600 dark:text-emerald-400">
                  Step 4: Review &amp; Deploy AI Calling Agent
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Verify your agent's configuration, listen to the greeting, and launch it to your live caller cockpit.
                </p>
              </div>

              {/* Master Summary Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedAvatar.avatarBg} text-white flex items-center justify-center text-3xl shadow-lg shrink-0 overflow-hidden relative border border-emerald-500/20`}>
                    {selectedAvatar.avatarImage ? (
                      <img src={selectedAvatar.avatarImage} alt={selectedAvatar.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      selectedAvatar.avatarEmoji
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-zinc-900 dark:text-white">
                        {agentCustomName}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                        {selectedIndustry.name}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">
                      {roleTitle} at <strong className="text-zinc-900 dark:text-white">{companyName}</strong>
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Spoken Accent: {selectedAvatar.region} • Tone: {selectedAvatar.tone}
                    </p>
                  </div>
                </div>

                {/* Spoken Audition Bar */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/50 border border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handlePlayVoice(selectedAvatar, greetingText)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                    >
                      {isAuditioning ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Listen to Live Greeting</span>
                        </>
                      )}
                    </button>
                    <span className="text-xs text-zinc-500 italic max-w-sm truncate hidden sm:inline">
                      &ldquo;{greetingText}&rdquo;
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    24kHz HD Voice
                  </span>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                    <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                      🎯 Primary Mission:
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400">{primaryObjective}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                    <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                      ⚡ Action Outcome:
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400 capitalize">
                      {outcomeAction.replace('_', ' ')} • Helpline: {transferPhone}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">
                    📋 Questions to be asked ({questions.length}):
                  </span>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-0.5">
                    {questions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/90 border-t border-black/8 dark:border-white/8 flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  stopArohiVoice();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((step + 1) as any)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveAndDeploy}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-emerald-500/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>Deploy Calling Agent Now</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
