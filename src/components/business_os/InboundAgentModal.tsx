import React, { useState } from 'react';
import {
  X,
  Bot,
  Sparkles,
  PhoneCall,
  Languages,
  Mic,
  FileText,
  CheckCircle2,
  Sliders,
  Building,
  User,
  Clock,
  ShieldCheck,
  Zap,
  Volume2
} from 'lucide-react';
import { InboundVoiceAgent, VoiceProfileId } from './types';
import { useBusinessOS } from './BusinessOSContext';

interface InboundAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentToEdit?: InboundVoiceAgent | null;
}

const VOICE_PROFILES: { id: VoiceProfileId; name: string; description: string; gender: string; sampleAccent: string }[] = [
  {
    id: 'Arohi-Warm-Female',
    name: 'Arohi Warm Female',
    description: 'Polite, clear, friendly tone ideal for front desk and reception',
    gender: 'Female',
    sampleAccent: 'Indian English / Hinglish / Hindi'
  },
  {
    id: 'Arohi-Empathetic-Female',
    name: 'Arohi Empathetic Care',
    description: 'Soft, gentle, compassionate tone ideal for clinics and appointments',
    gender: 'Female',
    sampleAccent: 'Hindi / Odia / English'
  },
  {
    id: 'Arohi-Executive-Male',
    name: 'Arohi Executive Male',
    description: 'Crisp, confident, authoritative tone ideal for sales & enterprise deals',
    gender: 'Male',
    sampleAccent: 'Professional Indian English / Hindi'
  },
  {
    id: 'Arohi-Energetic-Male',
    name: 'Arohi Energetic Support',
    description: 'Dynamic, fast-paced, problem-solving tone for 24/7 technical support',
    gender: 'Male',
    sampleAccent: 'Multilingual 150+ Indian Regional'
  }
];

const LANGUAGES = [
  'Hinglish (Hindi + English)',
  'Hindi (Pure / Shuddh)',
  'English (Indian Standard)',
  'Odia (ଓଡ଼ିଆ)',
  'Bengali (বাংলা)',
  'Tamil (தமிழ்)',
  'Telugu (తెలుగు)',
  'Marathi (मराठी)',
  'Gujarati (ગુજરાતી)',
  'Kannada (ಕನ್ನಡ)',
  'Malayalam (മലയാളം)',
  'Punjabi (ਪੰਜਾਬੀ)',
  '150+ Multilingual Auto-Detect'
];

const DEPARTMENTS: InboundVoiceAgent['department'][] = [
  'Reception & Front Desk',
  'Appointments & Booking',
  'Sales & Qualification',
  'Customer Support',
  'VIP Concierge'
];

export default function InboundAgentModal({ isOpen, onClose, agentToEdit }: InboundAgentModalProps) {
  const { addInboundAgent, updateInboundAgent, companyProfile, showToast } = useBusinessOS();

  const [name, setName] = useState(agentToEdit?.name || 'Priya Sharma');
  const [role, setRole] = useState(agentToEdit?.role || 'Autonomous Front Desk Receptionist');
  const [department, setDepartment] = useState<InboundVoiceAgent['department']>(agentToEdit?.department || 'Reception & Front Desk');
  const [language, setLanguage] = useState(agentToEdit?.language || 'Hinglish (Hindi + English)');
  const [voiceProfile, setVoiceProfile] = useState<VoiceProfileId>(agentToEdit?.voiceProfile || 'Arohi-Warm-Female');
  const [pitch, setPitch] = useState(agentToEdit?.pitch || 1.0);
  const [speechRate, setSpeechRate] = useState(agentToEdit?.speechRate || 1.0);
  const [greetingMessage, setGreetingMessage] = useState(
    agentToEdit?.greetingMessage ||
    `Namaste! Welcome to ${companyProfile?.name || 'our company'}. How may I assist you or direct your call today?`
  );
  const [businessName, setBusinessName] = useState(agentToEdit?.businessName || companyProfile?.name || 'Apex Innovations');
  const [knowledgeBase, setKnowledgeBase] = useState(
    agentToEdit?.knowledgeBase ||
    `Business Name: ${companyProfile?.name || 'Our Company'}\nOperating Hours: Monday-Saturday, 9 AM - 7 PM IST.\nServices: AI Business Automation, GST Invoicing, CRM, Telephony.\nPricing: Starting at ₹399/mo.\nLocation: India.\nAppointments: Available daily on 24-hr notice.`
  );
  const [createCrmLead, setCreateCrmLead] = useState(agentToEdit?.autoActions?.createCrmLead ?? true);
  const [sendWhatsAppNotification, setSendWhatsAppNotification] = useState(agentToEdit?.autoActions?.sendWhatsAppNotification ?? true);
  const [bookCalendarAppointment, setBookCalendarAppointment] = useState(agentToEdit?.autoActions?.bookCalendarAppointment ?? true);
  const [forwardToHumanOnUrgent, setForwardToHumanOnUrgent] = useState(agentToEdit?.autoActions?.forwardToHumanOnUrgent ?? true);
  const [forwardingPhoneNumber, setForwardingPhoneNumber] = useState(agentToEdit?.forwardingPhoneNumber || '+91 98765 43210');
  const [assignedPhoneNumber, setAssignedPhoneNumber] = useState(agentToEdit?.assignedPhoneNumber || '+91 80 4712 9905');
  const [operatingHours, setOperatingHours] = useState<InboundVoiceAgent['operatingHours']>(agentToEdit?.operatingHours || '24/7 Always Active');
  const [isActive, setIsActive] = useState(agentToEdit?.isActive ?? true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please provide an agent name');
      return;
    }

    const payload = {
      name: name.trim(),
      role: role.trim(),
      department,
      language,
      voiceProfile,
      pitch,
      speechRate,
      greetingMessage: greetingMessage.trim(),
      businessName: businessName.trim(),
      knowledgeBase: knowledgeBase.trim(),
      autoActions: {
        createCrmLead,
        sendWhatsAppNotification,
        bookCalendarAppointment,
        forwardToHumanOnUrgent
      },
      forwardingPhoneNumber: forwardingPhoneNumber.trim(),
      assignedPhoneNumber: assignedPhoneNumber.trim(),
      operatingHours,
      isActive
    };

    if (agentToEdit) {
      updateInboundAgent(agentToEdit.id, payload);
    } else {
      addInboundAgent(payload);
    }

    onClose();
  };

  const handleTestVoiceSnippet = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(greetingMessage);
      utterance.rate = speechRate;
      utterance.pitch = pitch;
      if (language.includes('Hindi') || language.includes('Hinglish')) {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }
      window.speechSynthesis.speak(utterance);
      showToast(`Playing sample voice preview for ${name}...`);
    } else {
      showToast('Voice preview not supported in current browser');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.1] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                {agentToEdit ? 'Configure Inbound Voice Agent' : 'Create Inbound Business Voice Agent'}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Autonomous AI receptionist that answers phone calls, books slots, & qualifies leads
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                Agent Display Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pooja Sharma, Dr. Receptionist"
                required
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                Designated Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as InboundVoiceAgent['department'])}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-xs"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                Professional Role Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Autonomous Front Desk Receptionist"
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                Business / Entity Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Apex Innovations Pvt Ltd"
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-xs"
              />
            </div>
          </div>

          {/* Language & Voice Profile */}
          <div className="bg-purple-50/50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-200/60 dark:border-purple-800/30 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 text-xs">
                <Languages className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Voice Profile & Multilingual Dialect</span>
              </span>

              <button
                type="button"
                onClick={handleTestVoiceSnippet}
                className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-all shadow-xs"
              >
                <Volume2 className="w-3 h-3" />
                <span>Listen Voice Preview</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                  Primary Dialect
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-xs"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                  Neural Voice Persona
                </label>
                <select
                  value={voiceProfile}
                  onChange={(e) => setVoiceProfile(e.target.value as VoiceProfileId)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-xs"
                >
                  {VOICE_PROFILES.map((vp) => (
                    <option key={vp.id} value={vp.id}>
                      {vp.name} ({vp.gender}) — {vp.sampleAccent}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sliders for Pitch and Speed */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  <span>Voice Pitch</span>
                  <span className="font-mono">{pitch.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.2"
                  step="0.05"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  <span>Speaking Speed</span>
                  <span className="font-mono">{speechRate.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Inbound Greeting Message */}
          <div>
            <label className="block font-semibold text-zinc-800 dark:text-zinc-200 mb-1 flex items-center justify-between">
              <span>Default Inbound Spoken Greeting *</span>
              <span className="text-[10px] text-zinc-400 font-normal">Spoken as soon as caller connects</span>
            </label>
            <textarea
              rows={2}
              value={greetingMessage}
              onChange={(e) => setGreetingMessage(e.target.value)}
              placeholder="e.g. Namaste! Welcome to Apex Innovations. How may I assist you today?"
              required
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-xs resize-none"
            />
          </div>

          {/* Agent Knowledge Base */}
          <div>
            <label className="block font-semibold text-zinc-800 dark:text-zinc-200 mb-1 flex items-center justify-between">
              <span>Business Knowledge Base & FAQs *</span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">Used by AI to answer questions accurately</span>
            </label>
            <textarea
              rows={5}
              value={knowledgeBase}
              onChange={(e) => setKnowledgeBase(e.target.value)}
              placeholder="Include company products, services, doctor schedules, pricing packages, location, working hours, and refund policies..."
              required
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-xs font-mono resize-none leading-relaxed"
            />
          </div>

          {/* Telephony & Forwarding Configuration */}
          <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-3">
            <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Telephony Numbers & Operating Schedule</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Assigned Virtual DID Number
                </label>
                <input
                  type="text"
                  value={assignedPhoneNumber}
                  onChange={(e) => setAssignedPhoneNumber(e.target.value)}
                  placeholder="+91 80 4712 9901"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Human Escalation Phone
                </label>
                <input
                  type="text"
                  value={forwardingPhoneNumber}
                  onChange={(e) => setForwardingPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Operating Schedule
                </label>
                <select
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value as InboundVoiceAgent['operatingHours'])}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white text-xs"
                >
                  <option value="24/7 Always Active">24/7 Always Active</option>
                  <option value="Business Hours (9 AM - 7 PM)">Business Hours (9 AM - 7 PM)</option>
                  <option value="After Hours & Weekends">After Hours & Weekends</option>
                </select>
              </div>
            </div>
          </div>

          {/* Autonomous Actions on Call Completion */}
          <div className="space-y-2">
            <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 text-xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Automated Post-Call Workflows</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={createCrmLead}
                  onChange={(e) => setCreateCrmLead(e.target.checked)}
                  className="w-4 h-4 rounded-md text-purple-600 accent-purple-600"
                />
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white text-xs">Auto-Create CRM Lead</span>
                  <p className="text-[10px] text-zinc-400">Extracts caller name, intent, & budget into CRM Leads</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendWhatsAppNotification}
                  onChange={(e) => setSendWhatsAppNotification(e.target.checked)}
                  className="w-4 h-4 rounded-md text-purple-600 accent-purple-600"
                />
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white text-xs">Send WhatsApp Summary</span>
                  <p className="text-[10px] text-zinc-400">Sends instant alert to business owner on call completion</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bookCalendarAppointment}
                  onChange={(e) => setBookCalendarAppointment(e.target.checked)}
                  className="w-4 h-4 rounded-md text-purple-600 accent-purple-600"
                />
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white text-xs">Auto-Book Appointment</span>
                  <p className="text-[10px] text-zinc-400">Writes booked consultation slots into business calendar</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={forwardToHumanOnUrgent}
                  onChange={(e) => setForwardToHumanOnUrgent(e.target.checked)}
                  className="w-4 h-4 rounded-md text-purple-600 accent-purple-600"
                />
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white text-xs">Escalate Urgent Queries</span>
                  <p className="text-[10px] text-zinc-400">Transfers caller to human phone on emergency detection</p>
                </div>
              </label>
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08]">
            <div>
              <span className="font-semibold text-zinc-900 dark:text-white text-xs">Agent Status</span>
              <p className="text-[10px] text-zinc-400">When active, agent automatically answers incoming phone calls</p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {isActive ? 'Active (Answering Calls)' : 'Paused'}
            </button>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-black/[0.06] dark:border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{agentToEdit ? 'Save Voice Agent' : 'Activate Voice Agent'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
