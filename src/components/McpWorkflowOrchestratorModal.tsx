import React, { useState } from 'react';
import { 
  X, Workflow, GitBranch, Layers, Zap, ArrowRight, CheckCircle, 
  Clock, Play, ShieldCheck, Sparkles, Plus, Trash2, Edit3, ChevronRight,
  Car, Stethoscope, Mail, ShoppingBag, Utensils, Plane, Flame, FileText, Check, AlertCircle
} from 'lucide-react';
import { AROHI_REGISTERED_MCP_TOOLS, McpDomain } from '../lib/mcpSchema';

interface McpWorkflowOrchestratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendPromptToChat: (promptText: string) => void;
}

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  toolId: string;
  toolName: string;
  provider: string;
  domain: McpDomain;
  actionTitle: string;
  description: string;
  extractedParams: Record<string, any>;
  dataPassedFromPrevStep?: string;
  estimatedCost?: string;
  estimatedTime?: string;
  status: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'SKIPPED';
}

export interface PresetWorkflowTemplate {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeColor: string;
  intentPrompt: string;
  description: string;
  icon: any;
  steps: Array<Omit<WorkflowStep, 'status'>>;
}

export const PRESET_WORKFLOW_TEMPLATES: PresetWorkflowTemplate[] = [
  {
    id: 'hospital_emergency',
    title: 'Hospital Visit & Medical Care Chain',
    category: 'Healthcare & Emergency',
    badge: '3-Step Emergency',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    intentPrompt: 'Book an Uber cab to Apollo Hospital, schedule doctor appointment with Senior Physician, and order prescribed fever medicines on Tata 1mg',
    description: 'Coordinates ride dispatch, specialist consultation booking, and pharmacy refill in a single seamless chain.',
    icon: Stethoscope,
    steps: [
      {
        id: 'step_1',
        stepNumber: 1,
        toolId: 'mcp_uber_ride_hailing',
        toolName: 'Uber India Ride Dispatcher',
        provider: 'Uber MCP Connector',
        domain: 'ride_hailing',
        actionTitle: 'Book Ride to Apollo Hospital',
        description: 'Dispatch UberGo / Sedan cab from current GPS location to Apollo Hospital Emergency Wing.',
        extractedParams: {
          pickupLocation: 'Current GPS Location',
          dropLocation: 'Apollo Hospital Emergency Wing, Delhi',
          rideClass: 'UberGo / Sedan'
        },
        estimatedCost: '₹320',
        estimatedTime: '3 Mins Pickup'
      },
      {
        id: 'step_2',
        stepNumber: 2,
        toolId: 'mcp_apollo_doctor_appointment',
        toolName: 'Apollo Clinics Doctor Appointment',
        provider: 'Apollo Healthcare MCP',
        domain: 'healthcare_appointments',
        actionTitle: 'Reserve Specialist Consultation Slot',
        description: 'Schedule OPD consultation slot with Dr. Sharma (General Medicine / Internal Specialist).',
        extractedParams: {
          hospitalName: 'Apollo Hospital OPD Wing',
          doctorName: 'Dr. Sharma (Senior Physician)',
          patientName: 'Arohi Patient',
          appointmentDate: 'Today / Next Available',
          appointmentSlot: '11:00 AM'
        },
        dataPassedFromPrevStep: 'Arrival ETA at Hospital synced from Step 1 Uber cab destination',
        estimatedCost: '₹800',
        estimatedTime: 'Instant Reservation'
      },
      {
        id: 'step_3',
        stepNumber: 3,
        toolId: 'mcp_gmail_draft_send',
        toolName: 'Gmail MCP Communication Agent',
        provider: 'Gmail MCP Connector',
        domain: 'email_communication',
        actionTitle: 'Dispatch Appointment & Ride Details to Doctor',
        description: 'Sends formal email notification with cab ETA, patient details, and symptoms summary.',
        extractedParams: {
          recipientEmail: 'reception@apollohospitals.com',
          subject: 'Appointment & Patient Arrival Notification — Arohi Patient',
          bodyText: 'Dear Apollo Team, Arohi Patient is en route via Uber (ETA 15 mins) for 11:00 AM appointment with Dr. Sharma.'
        },
        dataPassedFromPrevStep: 'Includes Uber Driver ETA from Step 1 and Appointment Reference from Step 2',
        estimatedCost: 'Free',
        estimatedTime: '1-Click Launch'
      }
    ]
  },
  {
    id: 'travel_rail_commute',
    title: 'Rail Travel & Station Pickup Chain',
    category: 'Travel & Transport',
    badge: '2-Step Travel',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    intentPrompt: 'Book IRCTC Rajdhani Express Tatkal ticket from Delhi to Mumbai and schedule Uber cab pickup at station',
    description: 'Reserves train tickets on IRCTC and automatically schedules station pickup upon arrival.',
    icon: Car,
    steps: [
      {
        id: 'step_1',
        stepNumber: 1,
        toolId: 'mcp_irctc_rail_booking',
        toolName: 'IRCTC Rail Reservation Agent',
        provider: 'IRCTC Rail MCP Connector',
        domain: 'travel_rail',
        actionTitle: 'Reserve Rajdhani Express Train Ticket',
        description: 'Book 2AC Tatkal / General quota ticket on NDLS to MMCT Rajdhani Express.',
        extractedParams: {
          fromStation: 'New Delhi (NDLS)',
          toStation: 'Mumbai Central (MMCT)',
          travelClass: '2AC',
          trainName: '12952 Rajdhani Express'
        },
        estimatedCost: '₹2,450',
        estimatedTime: 'Instant PNR Generation'
      },
      {
        id: 'step_2',
        stepNumber: 2,
        toolId: 'mcp_uber_ride_hailing',
        toolName: 'Uber India Ride Dispatcher',
        provider: 'Uber MCP Connector',
        domain: 'ride_hailing',
        actionTitle: 'Schedule Station Exit Pickup Cab',
        description: 'Schedules Uber Premier / Sedan cab pickup at NDLS Railway Station Exit Gate 1.',
        extractedParams: {
          pickupLocation: 'NDLS Railway Station Exit 1',
          dropLocation: 'Home / Hotel Destination',
          rideClass: 'Sedan'
        },
        dataPassedFromPrevStep: 'Pickup time scheduled automatically matching Train Departure/Arrival from Step 1',
        estimatedCost: '₹380',
        estimatedTime: '5 Mins'
      }
    ]
  },
  {
    id: 'grocery_and_utilities',
    title: 'Home Essentials & Utility Refill Chain',
    category: 'Home & Utilities',
    badge: '3-Step Utilities',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    intentPrompt: 'Order 10-minute groceries on Blinkit, book Indane LPG gas cylinder refill, and send expense summary to email',
    description: 'Simultaneously handles quick grocery delivery, domestic LPG refill booking, and expense report generation.',
    icon: Flame,
    steps: [
      {
        id: 'step_1',
        stepNumber: 1,
        toolId: 'mcp_blinkit_quick_grocery',
        toolName: 'Blinkit Instant 10-Min Grocery',
        provider: 'Blinkit MCP Connector',
        domain: 'quick_commerce',
        actionTitle: 'Order Fresh Milk, Bread & Eggs',
        description: 'Delivers 2 packs Amul Taaza Milk and 1 Brown Bread in 10 minutes.',
        extractedParams: {
          items: ['Amul Taaza Milk (500ml) x 2', 'Brown Bread x 1'],
          deliveryAddress: 'Home Address, MG Road, Connaught Place'
        },
        estimatedCost: '₹134',
        estimatedTime: '8–10 Mins'
      },
      {
        id: 'step_2',
        stepNumber: 2,
        toolId: 'mcp_indane_gas_refill',
        toolName: 'Indane LPG Gas Cylinder Refill',
        provider: 'Indane Gas MCP Connector',
        domain: 'utility_bills',
        actionTitle: 'Book 14.2kg Domestic LPG Gas Refill',
        description: 'Generates refill booking and BBPS payment link for LPG gas cylinder.',
        extractedParams: {
          consumerId: '7503918274019283',
          billerName: 'Indane Gas'
        },
        estimatedCost: '₹803',
        estimatedTime: 'Guaranteed 24-Hr Delivery'
      },
      {
        id: 'step_3',
        stepNumber: 3,
        toolId: 'mcp_gmail_draft_send',
        toolName: 'Gmail MCP Communication Agent',
        provider: 'Gmail MCP Connector',
        domain: 'email_communication',
        actionTitle: 'Send Expense Receipt Summary to Email',
        description: 'Dispatches itemized household expense statement for groceries and gas refill.',
        extractedParams: {
          recipientEmail: 'user@arohiai.com',
          subject: 'Household Expense Statement — Blinkit & Indane Gas',
          bodyText: 'Itemized breakdown: Groceries ₹134 + LPG Refill ₹803 = Total ₹937'
        },
        dataPassedFromPrevStep: 'Aggregates costs from Step 1 (₹134) & Step 2 (₹803)',
        estimatedCost: 'Free',
        estimatedTime: 'Instant Email'
      }
    ]
  }
];

export default function McpWorkflowOrchestratorModal({ isOpen, onClose, onSendPromptToChat }: McpWorkflowOrchestratorModalProps) {
  const [customIntent, setCustomIntent] = useState('');
  const [activeTemplate, setActiveTemplate] = useState<PresetWorkflowTemplate>(PRESET_WORKFLOW_TEMPLATES[0]);
  const [currentSteps, setCurrentSteps] = useState<WorkflowStep[]>(
    PRESET_WORKFLOW_TEMPLATES[0].steps.map(s => ({ ...s, status: 'PENDING' }))
  );
  const [isExecutingSequence, setIsExecutingSequence] = useState(false);
  const [activeExecutingIndex, setActiveExecutingIndex] = useState<number | null>(null);
  const [isParsingIntent, setIsParsingIntent] = useState(false);

  if (!isOpen) return null;

  const parseUserIntentToSteps = (promptText: string) => {
    setIsParsingIntent(true);
    const lower = promptText.toLowerCase();

    setTimeout(() => {
      let generatedSteps: WorkflowStep[] = [];

      // Detect Ride / Cab intent
      if (lower.includes('cab') || lower.includes('uber') || lower.includes('ola') || lower.includes('hospital') || lower.includes('ride')) {
        generatedSteps.push({
          id: `step_${Date.now()}_1`,
          stepNumber: generatedSteps.length + 1,
          toolId: 'mcp_uber_ride_hailing',
          toolName: 'Uber India Ride Dispatcher',
          provider: 'Uber MCP Connector',
          domain: 'ride_hailing',
          actionTitle: lower.includes('hospital') ? 'Book Uber Cab to Hospital' : 'Book Uber Cab Ride',
          description: 'Dispatches cab to destination with live driver tracking.',
          extractedParams: {
            pickupLocation: 'Current GPS Location',
            dropLocation: lower.includes('hospital') ? 'Apollo Hospital Emergency / OPD Wing' : 'Target Destination',
            rideClass: 'UberGo / Sedan'
          },
          estimatedCost: '₹340',
          estimatedTime: '3 Mins Pickup',
          status: 'PENDING'
        });
      }

      // Detect Doctor / Hospital intent
      if (lower.includes('doctor') || lower.includes('hospital') || lower.includes('appointment') || lower.includes('apollo') || lower.includes('clinic')) {
        generatedSteps.push({
          id: `step_${Date.now()}_2`,
          stepNumber: generatedSteps.length + 1,
          toolId: 'mcp_apollo_doctor_appointment',
          toolName: 'Apollo Clinics Doctor Scheduler',
          provider: 'Apollo Healthcare MCP',
          domain: 'healthcare_appointments',
          actionTitle: 'Schedule Doctor Appointment',
          description: 'Reserves consultation slot with specialist practitioner.',
          extractedParams: {
            hospitalName: 'Apollo Specialty Hospital',
            doctorName: 'Dr. Sharma (Senior Practitioner)',
            patientName: 'Arohi Patient',
            appointmentDate: 'Tomorrow',
            appointmentSlot: '11:00 AM'
          },
          dataPassedFromPrevStep: generatedSteps.length > 0 ? 'Destination hospital synced from Uber Cab Step' : undefined,
          estimatedCost: '₹800',
          estimatedTime: 'Instant Reservation',
          status: 'PENDING'
        });
      }

      // Detect Train / IRCTC intent
      if (lower.includes('train') || lower.includes('irctc') || lower.includes('rail') || lower.includes('tatkal')) {
        generatedSteps.push({
          id: `step_${Date.now()}_3`,
          stepNumber: generatedSteps.length + 1,
          toolId: 'mcp_irctc_rail_booking',
          toolName: 'IRCTC Rail Reservation Agent',
          provider: 'IRCTC Rail MCP Connector',
          domain: 'travel_rail',
          actionTitle: 'Book Rajdhani Express Train Ticket',
          description: 'Reserves 2AC / 3AC Tatkal ticket with PNR confirmation.',
          extractedParams: {
            fromStation: 'New Delhi (NDLS)',
            toStation: 'Mumbai Central (MMCT)',
            travelClass: '2AC',
            trainName: '12952 Rajdhani Express'
          },
          estimatedCost: '₹2,450',
          estimatedTime: 'Instant PNR',
          status: 'PENDING'
        });
      }

      // Detect Grocery / Medicine / Food intent
      if (lower.includes('grocery') || lower.includes('blinkit') || lower.includes('zepto') || lower.includes('milk') || lower.includes('medicine') || lower.includes('1mg')) {
        generatedSteps.push({
          id: `step_${Date.now()}_4`,
          stepNumber: generatedSteps.length + 1,
          toolId: lower.includes('1mg') ? 'mcp_1mg_pharmacy' : 'mcp_blinkit_quick_grocery',
          toolName: lower.includes('1mg') ? 'Tata 1mg Medicine Refill' : 'Blinkit Instant Grocery',
          provider: lower.includes('1mg') ? 'Tata 1mg MCP' : 'Blinkit MCP Connector',
          domain: lower.includes('1mg') ? 'healthcare_appointments' : 'quick_commerce',
          actionTitle: lower.includes('1mg') ? 'Refill Prescription Medicines' : 'Order Quick Grocery Essentials',
          description: 'Delivers items to home address in 10-15 minutes.',
          extractedParams: {
            items: ['Amul Milk x 2', 'Brown Bread x 1', 'Paracetamol 650mg x 1'],
            deliveryAddress: 'Home Address'
          },
          estimatedCost: '₹185',
          estimatedTime: '10 Mins',
          status: 'PENDING'
        });
      }

      // Detect Email / Gmail notification intent
      if (lower.includes('email') || lower.includes('gmail') || lower.includes('notify') || lower.includes('confirm') || lower.includes('doctor')) {
        generatedSteps.push({
          id: `step_${Date.now()}_5`,
          stepNumber: generatedSteps.length + 1,
          toolId: 'mcp_gmail_draft_send',
          toolName: 'Gmail MCP Communication Agent',
          provider: 'Gmail MCP Connector',
          domain: 'email_communication',
          actionTitle: 'Send Confirmation & Details Email',
          description: 'Drafts and dispatches email with booking receipts and ETAs.',
          extractedParams: {
            recipientEmail: 'doctor@apollohospitals.com',
            subject: 'Multi-Step MCP Workflow Confirmation',
            bodyText: 'Details of cab, doctor appointment, and prescription orders attached.'
          },
          dataPassedFromPrevStep: 'Aggregates ETAs and reference IDs from previous steps',
          estimatedCost: 'Free',
          estimatedTime: 'Instant Email',
          status: 'PENDING'
        });
      }

      // Default fallback if no specific keywords matched
      if (generatedSteps.length === 0) {
        generatedSteps = [
          {
            id: `step_${Date.now()}_default_1`,
            stepNumber: 1,
            toolId: 'mcp_uber_ride_hailing',
            toolName: 'Uber India Ride Dispatcher',
            provider: 'Uber MCP Connector',
            domain: 'ride_hailing',
            actionTitle: 'Step 1: Book Cab Ride',
            description: `Dispatch cab for request: "${promptText}"`,
            extractedParams: { pickupLocation: 'Current Location', dropLocation: 'Target Hospital / Destination' },
            estimatedCost: '₹320',
            estimatedTime: '3 Mins',
            status: 'PENDING'
          },
          {
            id: `step_${Date.now()}_default_2`,
            stepNumber: 2,
            toolId: 'mcp_gmail_draft_send',
            toolName: 'Gmail MCP Communication Agent',
            provider: 'Gmail MCP Connector',
            domain: 'email_communication',
            actionTitle: 'Step 2: Send Confirmation Email',
            description: 'Notify recipient with travel itinerary and details.',
            extractedParams: { recipientEmail: 'client@example.com', subject: 'Ride Confirmation', bodyText: promptText },
            dataPassedFromPrevStep: 'Uber ride driver details and ETA attached',
            estimatedCost: 'Free',
            estimatedTime: '1-Click Launch',
            status: 'PENDING'
          }
        ];
      }

      setCurrentSteps(generatedSteps);
      setIsParsingIntent(false);
    }, 400);
  };

  const handleSelectTemplate = (template: PresetWorkflowTemplate) => {
    setActiveTemplate(template);
    setCustomIntent(template.intentPrompt);
    setCurrentSteps(template.steps.map(s => ({ ...s, status: 'PENDING' })));
  };

  const handleRunSimulation = () => {
    setIsExecutingSequence(true);
    let index = 0;
    setActiveExecutingIndex(0);

    const interval = setInterval(() => {
      setCurrentSteps(prev => 
        prev.map((step, idx) => {
          if (idx < index) return { ...step, status: 'COMPLETED' };
          if (idx === index) return { ...step, status: 'EXECUTING' };
          return { ...step, status: 'PENDING' };
        })
      );

      index++;
      setActiveExecutingIndex(index < currentSteps.length ? index : null);

      if (index > currentSteps.length) {
        clearInterval(interval);
        setCurrentSteps(prev => prev.map(step => ({ ...step, status: 'COMPLETED' })));
        setIsExecutingSequence(false);
      }
    }, 1200);
  };

  const handleSendOrchestrationToChat = () => {
    const intentText = customIntent || activeTemplate.intentPrompt;
    const orchestrationPrompt = `Arohi, execute this multi-step MCP Workflow for my request: "${intentText}". Breakdown:\n${currentSteps.map(s => `${s.stepNumber}. ${s.actionTitle} (${s.provider})`).join('\n')}`;
    
    onSendPromptToChat(orchestrationPrompt);
    onClose();
  };

  const getStepDomainIcon = (domain: McpDomain) => {
    switch (domain) {
      case 'ride_hailing': return Car;
      case 'healthcare_appointments': return Stethoscope;
      case 'email_communication': return Mail;
      case 'quick_commerce': return ShoppingBag;
      case 'food_delivery': return Utensils;
      case 'travel_rail': return Plane;
      case 'utility_bills': return Flame;
      default: return Workflow;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 font-sans overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090618] border border-[#231745] rounded-2xl shadow-[0_0_50px_rgba(124,58,237,0.25)] text-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#120a2e] via-[#1a0f40] to-[#0d0724] border-b border-[#23164a] p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-white shadow-lg">
              <Workflow className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Multi-Step Task Assistant
                </h2>
                <span className="text-[10px] bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border border-amber-500/30 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  MULTI-STEP
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Coordinates multi-step requests like ride booking, doctor appointments, and email confirmation in a seamless sequence.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar">
          
          {/* Complex Intent Input Area */}
          <div className="bg-[#100a28] border border-[#24174d] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" /> Enter Complex Multi-Step Intent
              </label>
              <span className="text-[11px] text-slate-400">
                e.g., <em className="text-slate-300">"Book a cab to hospital & schedule doctor appointment"</em>
              </span>
            </div>

            <div className="relative">
              <textarea
                rows={2}
                value={customIntent}
                onChange={(e) => {
                  setCustomIntent(e.target.value);
                  if (e.target.value.length > 5) {
                    parseUserIntentToSteps(e.target.value);
                  }
                }}
                placeholder="Describe what you want to achieve in plain English..."
                className="w-full bg-[#070414] border border-[#2d1b61] rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent font-medium resize-none"
              />
              {isParsingIntent && (
                <div className="absolute right-3 bottom-3 flex items-center gap-1.5 text-[10px] text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Workflow className="w-3 h-3 animate-spin text-amber-400" />
                  <span>Decomposing Intent...</span>
                </div>
              )}
            </div>

            {/* Quick Presets Bar */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                ⚡ 1-Tap Complex Workflow Templates
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PRESET_WORKFLOW_TEMPLATES.map((tmpl) => {
                  const IconComp = tmpl.icon;
                  const isSelected = activeTemplate.id === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      onClick={() => handleSelectTemplate(tmpl)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                        isSelected 
                          ? 'bg-[#1e1346] border-[#7c3aed] ring-1 ring-[#7c3aed]' 
                          : 'bg-[#0d0822] border-[#211545] hover:bg-[#160c38] hover:border-[#332168]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <IconComp className="w-3.5 h-3.5 text-purple-400" />
                          <span className="truncate">{tmpl.title}</span>
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${tmpl.badgeColor}`}>
                          {tmpl.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2">
                        {tmpl.intentPrompt}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Visual Sequence DAG / Sequence Chain Canvas */}
          <div className="bg-[#0b071c] border border-[#231548] rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#211445] pb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-extrabold text-white">
                  Decomposed Sequence Pipeline ({currentSteps.length} MCP Steps)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Security Checkpoints Included
                </span>
              </div>
            </div>

            {/* Step Sequence DAG Timeline */}
            <div className="space-y-3 relative">
              {currentSteps.map((step, idx) => {
                const IconComponent = getStepDomainIcon(step.domain);
                const isCurrentExecuting = activeExecutingIndex === idx;

                return (
                  <div key={step.id} className="relative">
                    
                    {/* Connecting Pipe Line between steps */}
                    {idx < currentSteps.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500 z-0 h-8 -mb-4 opacity-40" />
                    )}

                    <div className={`relative z-10 border p-3.5 rounded-xl transition-all ${
                      step.status === 'COMPLETED'
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : isCurrentExecuting
                        ? 'bg-[#1d1242] border-[#7c3aed] ring-2 ring-[#7c3aed] shadow-lg'
                        : 'bg-[#120b2e] border-[#25174f]'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                            step.status === 'COMPLETED'
                              ? 'bg-emerald-500 text-slate-950'
                              : isCurrentExecuting
                              ? 'bg-purple-500 text-white animate-bounce'
                              : 'bg-[#22164a] text-purple-300 border border-purple-500/30'
                          }`}>
                            {step.status === 'COMPLETED' ? <Check className="w-4 h-4 stroke-[3]" /> : step.stepNumber}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-white flex items-center gap-1.5">
                                <IconComponent className="w-3.5 h-3.5 text-purple-400" />
                                {step.actionTitle}
                              </span>
                              <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-bold">
                                {step.provider}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          {step.estimatedCost && (
                            <span className="text-[11px] font-black text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              {step.estimatedCost}
                            </span>
                          )}
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                            step.status === 'COMPLETED'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : isCurrentExecuting
                              ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50 animate-pulse'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {step.status}
                          </span>
                        </div>
                      </div>

                      {/* Parameters Grid */}
                      <div className="mt-2.5 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {Object.entries(step.extractedParams).map(([key, val]) => (
                          <div key={key} className="bg-[#090518] px-2.5 py-1.5 rounded-lg border border-[#1e1342] flex items-center justify-between">
                            <span className="text-slate-400 font-mono text-[10px]">{key}:</span>
                            <span className="text-slate-200 font-bold truncate max-w-[200px]">
                              {Array.isArray(val) ? val.join(', ') : String(val)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Data Pipeline Output Passing Indicator */}
                      {step.dataPassedFromPrevStep && (
                        <div className="mt-2 text-[10px] text-purple-300 bg-purple-500/10 border border-purple-500/20 p-2 rounded-lg flex items-center gap-1.5 font-medium">
                          <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span><strong>Data Pipeline:</strong> {step.dataPassedFromPrevStep}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Footer Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d0722] border border-[#211444] p-4 rounded-xl">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span>Ready to orchestrate <strong>{currentSteps.length} real-time MCP tool calls</strong> sequentially.</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleRunSimulation}
                disabled={isExecutingSequence}
                className="flex-1 sm:flex-none bg-[#1d1245] hover:bg-[#2a1a63] text-purple-200 border border-purple-500/30 font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                <span>{isExecutingSequence ? 'Simulating Pipeline...' : 'Simulate DAG Chain'}</span>
              </button>

              <button
                onClick={handleSendOrchestrationToChat}
                className="flex-1 sm:flex-none bg-gradient-to-r from-[#7c3aed] via-[#6d28d9] to-[#3b82f6] hover:from-[#6d28d9] hover:to-[#2563eb] text-white font-black text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Workflow className="w-4 h-4 text-white" />
                <span>Execute in Arohi Chat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
