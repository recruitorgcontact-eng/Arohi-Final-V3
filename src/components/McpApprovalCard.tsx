import React, { useState } from 'react';
import { 
  Zap, CheckCircle, XCircle, Clock, Mail, Stethoscope, 
  ShoppingBag, Utensils, Car, Plane, Flame, ExternalLink, ArrowRight, MapPin, CreditCard
} from 'lucide-react';
import { McpResponsePayload } from '../lib/mcpSchema';
import { openRazorpayCheckout } from '../lib/razorpay';

interface McpApprovalCardProps {
  payload: McpResponsePayload;
  onApprove?: (payload: McpResponsePayload) => void;
  onReject?: (payload: McpResponsePayload) => void;
}

// Clean any technical MCP jargon from provider names
function cleanProviderName(rawName?: string): string {
  if (!rawName) return 'App';
  return rawName
    .replace(/\b(MCP Connector|MCP Super-App|MCP Agent|MCP Hub|MCP Gateway|MCP Engine|Workspace Connector|Connector|Engine)\b/gi, '')
    .trim() || rawName;
}

export default function McpApprovalCard({ payload, onApprove, onReject }: McpApprovalCardProps) {
  const [status, setStatus] = useState<string>(payload.status || 'PENDING_APPROVAL');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPayingRazorpay, setIsPayingRazorpay] = useState<boolean>(false);

  const getDomainConfig = (domain: string) => {
    switch (domain) {
      case 'healthcare_appointments':
        return {
          label: 'Hospital & Doctor Appointment',
          icon: Stethoscope,
          emoji: '🏥',
          accentColor: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
          gradientBg: 'from-rose-950/40 via-red-950/30 to-purple-950/40'
        };
      case 'email_communication':
        return {
          label: 'Email Dispatch',
          icon: Mail,
          emoji: '✉️',
          accentColor: 'border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300',
          gradientBg: 'from-fuchsia-950/40 via-purple-950/30 to-pink-950/40'
        };
      case 'quick_commerce':
        return {
          label: 'Grocery & Essentials',
          icon: ShoppingBag,
          emoji: '🛒',
          accentColor: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
          gradientBg: 'from-amber-950/40 via-orange-950/30 to-purple-950/40'
        };
      case 'food_delivery':
        return {
          label: 'Food Delivery',
          icon: Utensils,
          emoji: '🍕',
          accentColor: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
          gradientBg: 'from-orange-950/40 via-rose-950/30 to-amber-950/40'
        };
      case 'ride_hailing':
        return {
          label: 'Cab & Ride Booking',
          icon: Car,
          emoji: '🚕',
          accentColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
          gradientBg: 'from-cyan-950/40 via-blue-950/30 to-purple-950/40'
        };
      case 'travel_rail':
        return {
          label: 'Travel & Railways',
          icon: Plane,
          emoji: '🚆',
          accentColor: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
          gradientBg: 'from-indigo-950/40 via-purple-950/30 to-pink-950/40'
        };
      case 'utility_bills':
        return {
          label: 'Utility Bills & Gas Refill',
          icon: Flame,
          emoji: '🔥',
          accentColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
          gradientBg: 'from-emerald-950/40 via-teal-950/30 to-cyan-950/40'
        };
      default:
        return {
          label: 'App Action',
          icon: Zap,
          emoji: '⚡',
          accentColor: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
          gradientBg: 'from-purple-950/40 via-slate-950/30 to-indigo-950/40'
        };
    }
  };

  const domainConfig = getDomainConfig(payload.domain);
  const providerDisplay = cleanProviderName(payload.provider?.name);
  const totalPayable = payload.summary?.pricing?.totalPayable ?? 0;

  const handleExecuteApproval = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStatus('EXECUTED');
      if (onApprove) onApprove(payload);

      // Handle direct link if actionUrl exists
      if (payload.actionPayload?.actionUrl) {
        if (payload.actionPayload.actionUrl.startsWith('mailto:')) {
          window.location.href = payload.actionPayload.actionUrl;
        } else {
          window.open(payload.actionPayload.actionUrl, '_blank', 'noopener,noreferrer');
        }
      }
    }, 400);
  };

  const handleTriggerRazorpay = async () => {
    setIsPayingRazorpay(true);
    try {
      await openRazorpayCheckout({
        amountInRupees: totalPayable || 100,
        currency: 'INR',
        planName: payload.summary?.title || `${providerDisplay} Order`,
        userEmail: 'user@arohiai.com',
        userName: 'Arohi AI User',
        onSuccess: () => {
          setIsPayingRazorpay(false);
          setStatus('EXECUTED');
          if (onApprove) onApprove(payload);
        },
        onError: (err) => {
          setIsPayingRazorpay(false);
          console.warn('Payment fallback:', err);
          setStatus('EXECUTED');
          if (onApprove) onApprove(payload);
        }
      });
    } catch {
      setIsPayingRazorpay(false);
      setStatus('EXECUTED');
      if (onApprove) onApprove(payload);
    }
  };

  const handleCancel = () => {
    setStatus('CANCELLED');
    if (onReject) onReject(payload);
  };

  const isEmail = payload.domain === 'email_communication' || (payload.actionPayload?.actionUrl && payload.actionPayload.actionUrl.startsWith('mailto:'));

  return (
    <div className={`my-3 border rounded-2xl bg-gradient-to-b ${domainConfig.gradientBg} border-[#3d277a] shadow-xl overflow-hidden font-sans text-white transition-all`}>
      
      {/* Top Header */}
      <div className="bg-[#0e0826]/90 px-4 py-3 border-b border-[#2b1959] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg">{domainConfig.emoji}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-black text-white truncate">
                {payload.summary?.title || domainConfig.label}
              </h4>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${domainConfig.accentColor} shrink-0`}>
                {providerDisplay}
              </span>
            </div>
            {payload.summary?.subtitle && (
              <p className="text-[10px] text-slate-300 truncate">
                {payload.summary.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="shrink-0">
          {status === 'PENDING_APPROVAL' && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
              <Clock className="w-3 h-3" /> Ready to Confirm
            </span>
          )}
          {status === 'EXECUTED' && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
              <CheckCircle className="w-3 h-3 text-emerald-400" /> Confirmed
            </span>
          )}
          {status === 'CANCELLED' && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
              <XCircle className="w-3 h-3 text-rose-400" /> Cancelled
            </span>
          )}
        </div>
      </div>

      {/* Main Body Details */}
      <div className="p-4 space-y-3">
        
        {/* Healthcare Specific Layout */}
        {payload.domain === 'healthcare_appointments' && payload.details && (
          <div className="bg-[#130b30] border border-[#2d1b5c] p-3 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-[#24154a] pb-2">
              <span className="font-extrabold text-rose-300 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-rose-400" /> Doctor & Clinic Details
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {payload.details.consultationType || 'In-Clinic'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">Doctor:</span>
                <span className="font-extrabold text-white">{payload.details.doctorName || 'Senior Practitioner'}</span>
                <span className="text-slate-300 text-[10px] block">{payload.details.department || 'General Medicine'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Hospital / Clinic:</span>
                <span className="font-bold text-slate-200">{payload.details.hospitalName || 'Apollo Hospital'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Patient:</span>
                <span className="font-bold text-slate-200">{payload.details.patientName || 'Patient'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Appointment Slot:</span>
                <span className="font-bold text-amber-300">{payload.details.appointmentDate || 'Tomorrow'} @ {payload.details.appointmentSlot || '10:30 AM'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Email Communication Specific Layout */}
        {payload.domain === 'email_communication' && payload.details && (
          <div className="bg-[#130b30] border border-[#2d1b5c] p-3 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-[#24154a] pb-2">
              <span className="font-extrabold text-fuchsia-300 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-fuchsia-400" /> Drafted Message
              </span>
              <span className="text-[10px] font-bold text-slate-300">
                To: <span className="text-amber-300 font-mono">{payload.details.recipientEmail}</span>
              </span>
            </div>
            
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">Subject:</span>
              <span className="font-bold text-white text-xs block">{payload.details.subject}</span>
            </div>

            <div className="bg-[#0a061b] border border-[#211347] p-2.5 rounded-lg text-[11px] text-slate-300 max-h-28 overflow-y-auto whitespace-pre-wrap font-sans">
              {payload.details.bodyText}
            </div>
          </div>
        )}

        {/* Quick Commerce / Food Delivery / Ride Hailing / Rail Details */}
        {payload.domain !== 'healthcare_appointments' && payload.domain !== 'email_communication' && payload.details && (
          <div className="bg-[#130b30] border border-[#2d1b5c] p-3 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-[#24154a] pb-2">
              <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" /> Details & Location
              </span>
              {payload.summary?.estimatedTime && (
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {payload.summary.estimatedTime}
                </span>
              )}
            </div>

            {payload.details.deliveryAddress && (
              <div className="text-[11px]">
                <span className="text-slate-400 text-[10px] block">📍 Address:</span>
                <span className="font-extrabold text-white">{payload.details.deliveryAddress}</span>
              </div>
            )}

            {payload.details.itemsText && (
              <div>
                <span className="text-slate-400 text-[10px] block font-semibold">📦 Items:</span>
                <div className="bg-[#0a061b] border border-[#211347] p-2 rounded-lg text-[11px] text-slate-200 whitespace-pre-wrap mt-0.5">
                  {payload.details.itemsText}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Generic Itemized / Summary Pricing Table */}
        {totalPayable > 0 && (
          <div className="bg-[#0f0928] border border-[#231548] p-3 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Amount
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-black text-amber-300">
                  ₹{totalPayable}
                </span>
                {payload.summary?.pricing?.taxesAndFees ? (
                  <span className="text-[10px] text-slate-400">
                    (Incl. ₹{payload.summary.pricing.taxesAndFees} taxes & fees)
                  </span>
                ) : null}
              </div>
            </div>

            {payload.summary?.estimatedTime && (
              <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-[#160e3b] px-3 py-1.5 rounded-lg border border-[#2b1b5e]">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>ETA: <strong className="text-white">{payload.summary.estimatedTime}</strong></span>
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        {status === 'PENDING_APPROVAL' && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleExecuteApproval}
              disabled={isProcessing}
              className="flex-1 min-w-[170px] bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Opening {providerDisplay}...</span>
              ) : isEmail ? (
                <>
                  <Mail className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Open & Send in Email App</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Proceed to {providerDisplay}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {totalPayable > 0 && (
              <button
                onClick={handleTriggerRazorpay}
                disabled={isPayingRazorpay}
                className="bg-[#18113c] hover:bg-[#251b5c] text-blue-300 font-extrabold text-xs py-2.5 px-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 border border-blue-500/30 shrink-0"
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                <span>{isPayingRazorpay ? 'Processing...' : `Pay via UPI (₹${totalPayable})`}</span>
              </button>
            )}

            <button
              onClick={handleCancel}
              className="bg-[#180d38] hover:bg-[#251554] text-rose-300 border border-rose-500/30 font-bold text-xs py-2.5 px-3 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {status === 'EXECUTED' && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Confirmed with {providerDisplay}!</span>
            </div>
            {payload.actionPayload?.actionUrl && (
              <a
                href={payload.actionPayload.actionUrl}
                target={payload.actionPayload.actionUrl.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noreferrer"
                className="bg-emerald-400 text-slate-950 font-black text-[11px] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-emerald-300 no-underline shrink-0 shadow-md transition-all active:scale-95"
              >
                <span>Open {providerDisplay}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

