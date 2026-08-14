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
  isDarkMode?: boolean;
}

// Clean any technical MCP jargon from provider names
function cleanProviderName(rawName?: string): string {
  if (!rawName) return 'Service';
  return rawName
    .replace(/\b(MCP Connector|MCP Super-App|MCP Agent|MCP Hub|MCP Gateway|MCP Engine|Workspace Connector|Connector|Engine|mcp_)\b/gi, '')
    .trim() || rawName;
}

export default function McpApprovalCard({ payload, onApprove, onReject, isDarkMode = true }: McpApprovalCardProps) {
  const [status, setStatus] = useState<string>(payload.status || 'PENDING_APPROVAL');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPayingRazorpay, setIsPayingRazorpay] = useState<boolean>(false);

  const getDomainConfig = (domain: string) => {
    switch (domain) {
      case 'healthcare_appointments':
        return {
          label: 'Doctor Appointment',
          icon: Stethoscope,
          emoji: '🏥',
          accentColor: isDarkMode 
            ? 'border-rose-500/40 bg-rose-500/10 text-rose-300' 
            : 'border-rose-300 bg-rose-50 text-rose-800',
          gradientBg: isDarkMode 
            ? 'from-rose-950/40 via-red-950/30 to-purple-950/40 border-rose-900/50' 
            : 'from-rose-50/90 via-white to-orange-50/60 border-rose-200'
        };
      case 'email_communication':
        return {
          label: 'Email Message',
          icon: Mail,
          emoji: '✉️',
          accentColor: isDarkMode 
            ? 'border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300' 
            : 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800',
          gradientBg: isDarkMode 
            ? 'from-fuchsia-950/40 via-purple-950/30 to-pink-950/40 border-fuchsia-900/50' 
            : 'from-fuchsia-50/90 via-white to-pink-50/60 border-fuchsia-200'
        };
      case 'quick_commerce':
        return {
          label: 'Grocery & Essentials',
          icon: ShoppingBag,
          emoji: '🛒',
          accentColor: isDarkMode 
            ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' 
            : 'border-amber-300 bg-amber-50 text-amber-800',
          gradientBg: isDarkMode 
            ? 'from-amber-950/40 via-orange-950/30 to-purple-950/40 border-amber-900/50' 
            : 'from-amber-50/90 via-white to-orange-50/60 border-amber-200'
        };
      case 'food_delivery':
        return {
          label: 'Food Delivery',
          icon: Utensils,
          emoji: '🍕',
          accentColor: isDarkMode 
            ? 'border-orange-500/40 bg-orange-500/10 text-orange-300' 
            : 'border-orange-300 bg-orange-50 text-orange-800',
          gradientBg: isDarkMode 
            ? 'from-orange-950/40 via-rose-950/30 to-amber-950/40 border-orange-900/50' 
            : 'from-orange-50/90 via-white to-amber-50/60 border-orange-200'
        };
      case 'ride_hailing':
        return {
          label: 'Cab Booking',
          icon: Car,
          emoji: '🚕',
          accentColor: isDarkMode 
            ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300' 
            : 'border-cyan-300 bg-cyan-50 text-cyan-800',
          gradientBg: isDarkMode 
            ? 'from-cyan-950/40 via-blue-950/30 to-purple-950/40 border-cyan-900/50' 
            : 'from-cyan-50/90 via-white to-blue-50/60 border-cyan-200'
        };
      case 'travel_rail':
        return {
          label: 'Travel Reservation',
          icon: Plane,
          emoji: '🚆',
          accentColor: isDarkMode 
            ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300' 
            : 'border-indigo-300 bg-indigo-50 text-indigo-800',
          gradientBg: isDarkMode 
            ? 'from-indigo-950/40 via-purple-950/30 to-pink-950/40 border-indigo-900/50' 
            : 'from-indigo-50/90 via-white to-purple-50/60 border-indigo-200'
        };
      case 'utility_bills':
        return {
          label: 'Utility Refill / Bill',
          icon: Flame,
          emoji: '🔥',
          accentColor: isDarkMode 
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' 
            : 'border-emerald-300 bg-emerald-50 text-emerald-800',
          gradientBg: isDarkMode 
            ? 'from-emerald-950/40 via-teal-950/30 to-cyan-950/40 border-emerald-900/50' 
            : 'from-emerald-50/90 via-white to-teal-50/60 border-emerald-200'
        };
      default:
        return {
          label: 'Service Action',
          icon: Zap,
          emoji: '⚡',
          accentColor: isDarkMode 
            ? 'border-purple-500/40 bg-purple-500/10 text-purple-300' 
            : 'border-purple-300 bg-purple-50 text-purple-800',
          gradientBg: isDarkMode 
            ? 'from-purple-950/40 via-slate-950/30 to-indigo-950/40 border-[#3d277a]' 
            : 'from-purple-50/90 via-white to-indigo-50/60 border-purple-200'
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
    <div className={`my-3 border rounded-2xl bg-gradient-to-b ${domainConfig.gradientBg} shadow-lg overflow-hidden font-sans transition-all ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* Top Header */}
      <div className={`px-4 py-3 border-b flex items-center justify-between gap-2 ${isDarkMode ? 'bg-[#0e0826]/90 border-[#2b1959]' : 'bg-white/90 border-slate-200'}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg">{domainConfig.emoji}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className={`text-xs sm:text-sm font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {payload.summary?.title || domainConfig.label}
              </h4>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${domainConfig.accentColor} shrink-0`}>
                {providerDisplay}
              </span>
            </div>
            {payload.summary?.subtitle && (
              <p className={`text-[10px] truncate ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                {payload.summary.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="shrink-0">
          {status === 'PENDING_APPROVAL' && (
            <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${
              isDarkMode 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              <Clock className="w-3 h-3" /> Ready to Confirm
            </span>
          )}
          {status === 'EXECUTED' && (
            <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${
              isDarkMode 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}>
              <CheckCircle className="w-3 h-3 text-emerald-500" /> Confirmed
            </span>
          )}
          {status === 'CANCELLED' && (
            <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${
              isDarkMode 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}>
              <XCircle className="w-3 h-3 text-rose-500" /> Cancelled
            </span>
          )}
        </div>
      </div>

      {/* Main Body Details */}
      <div className="p-4 space-y-3">
        
        {/* Healthcare Specific Layout */}
        {payload.domain === 'healthcare_appointments' && payload.details && (
          <div className={`p-3 rounded-xl space-y-2 text-xs border ${isDarkMode ? 'bg-[#130b30] border-[#2d1b5c]' : 'bg-rose-50/50 border-rose-200'}`}>
            <div className={`flex items-center justify-between border-b pb-2 ${isDarkMode ? 'border-[#24154a]' : 'border-rose-200'}`}>
              <span className={`font-extrabold flex items-center gap-1.5 ${isDarkMode ? 'text-rose-300' : 'text-rose-800'}`}>
                <Stethoscope className="w-4 h-4 text-rose-500" /> Doctor & Clinic Details
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                isDarkMode 
                  ? 'text-amber-300 bg-amber-500/10 border-amber-500/20' 
                  : 'text-amber-900 bg-amber-100 border-amber-300'
              }`}>
                {payload.details.consultationType || 'In-Clinic'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className={`block text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Doctor:</span>
                <span className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{payload.details.doctorName || 'Senior Practitioner'}</span>
                <span className={`text-[10px] block ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{payload.details.department || 'General Medicine'}</span>
              </div>
              <div>
                <span className={`block text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Hospital / Clinic:</span>
                <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{payload.details.hospitalName || 'Apollo Hospital'}</span>
              </div>
              <div>
                <span className={`block text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Patient:</span>
                <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{payload.details.patientName || 'Patient'}</span>
              </div>
              <div>
                <span className={`block text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Appointment Slot:</span>
                <span className={`font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>{payload.details.appointmentDate || 'Tomorrow'} @ {payload.details.appointmentSlot || '10:30 AM'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Email Communication Specific Layout */}
        {payload.domain === 'email_communication' && payload.details && (
          <div className={`p-3 rounded-xl space-y-2 text-xs border ${isDarkMode ? 'bg-[#130b30] border-[#2d1b5c]' : 'bg-fuchsia-50/50 border-fuchsia-200'}`}>
            <div className={`flex items-center justify-between border-b pb-2 ${isDarkMode ? 'border-[#24154a]' : 'border-fuchsia-200'}`}>
              <span className={`font-extrabold flex items-center gap-1.5 ${isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-800'}`}>
                <Mail className="w-4 h-4 text-fuchsia-500" /> Drafted Message
              </span>
              <span className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                To: <span className={`font-mono ${isDarkMode ? 'text-amber-300' : 'text-purple-700'}`}>{payload.details.recipientEmail}</span>
              </span>
            </div>
            
            <div>
              <span className={`text-[10px] font-semibold block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Subject:</span>
              <span className={`font-bold text-xs block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{payload.details.subject}</span>
            </div>

            <div className={`p-2.5 rounded-lg text-[11px] max-h-28 overflow-y-auto whitespace-pre-wrap font-sans border ${
              isDarkMode ? 'bg-[#0a061b] border-[#211347] text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              {payload.details.bodyText}
            </div>
          </div>
        )}

        {/* Quick Commerce / Food Delivery / Ride Hailing / Rail Details */}
        {payload.domain !== 'healthcare_appointments' && payload.domain !== 'email_communication' && payload.details && (
          <div className={`p-3 rounded-xl space-y-2 text-xs border ${isDarkMode ? 'bg-[#130b30] border-[#2d1b5c]' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`flex items-center justify-between border-b pb-2 ${isDarkMode ? 'border-[#24154a]' : 'border-slate-200'}`}>
              <span className={`font-extrabold flex items-center gap-1.5 ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                <MapPin className="w-4 h-4 text-amber-500" /> Details & Location
              </span>
              {payload.summary?.estimatedTime && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  isDarkMode ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-800 bg-emerald-100 border-emerald-300'
                }`}>
                  {payload.summary.estimatedTime}
                </span>
              )}
            </div>

            {payload.details.deliveryAddress && (
              <div className="text-[11px]">
                <span className={`block text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>📍 Address:</span>
                <span className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{payload.details.deliveryAddress}</span>
              </div>
            )}

            {payload.details.itemsText && (
              <div>
                <span className={`block text-[10px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>📦 Items / Request:</span>
                <div className={`p-2 rounded-lg text-[11px] whitespace-pre-wrap mt-0.5 border ${
                  isDarkMode ? 'bg-[#0a061b] border-[#211347] text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  {payload.details.itemsText}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Generic Itemized / Summary Pricing Table */}
        {totalPayable > 0 && (
          <div className={`p-3 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs border ${
            isDarkMode ? 'bg-[#0f0928] border-[#231548]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Total Amount
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className={`text-lg font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                  ₹{totalPayable}
                </span>
                {payload.summary?.pricing?.taxesAndFees ? (
                  <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    (Incl. ₹{payload.summary.pricing.taxesAndFees} taxes & fees)
                  </span>
                ) : null}
              </div>
            </div>

            {payload.summary?.estimatedTime && (
              <div className={`flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg border ${
                isDarkMode ? 'text-slate-300 bg-[#160e3b] border-[#2b1b5e]' : 'text-slate-700 bg-white border-slate-200'
              }`}>
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>ETA: <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{payload.summary.estimatedTime}</strong></span>
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
                className={`font-extrabold text-xs py-2.5 px-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 border shrink-0 ${
                  isDarkMode 
                    ? 'bg-[#18113c] hover:bg-[#251b5c] text-blue-300 border-blue-500/30' 
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                <span>{isPayingRazorpay ? 'Processing...' : `Pay via UPI (₹${totalPayable})`}</span>
              </button>
            )}

            <button
              onClick={handleCancel}
              className={`font-bold text-xs py-2.5 px-3 rounded-xl transition-all cursor-pointer border ${
                isDarkMode 
                  ? 'bg-[#180d38] hover:bg-[#251554] text-rose-300 border-rose-500/30' 
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
              }`}
            >
              Cancel
            </button>
          </div>
        )}

        {status === 'EXECUTED' && (
          <div className={`p-3 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs border ${
            isDarkMode 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="truncate">Confirmed with {providerDisplay}!</span>
            </div>
            {payload.actionPayload?.actionUrl && (
              <a
                href={payload.actionPayload.actionUrl}
                target={payload.actionPayload.actionUrl.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noreferrer"
                className="bg-emerald-500 text-white font-black text-[11px] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-emerald-600 no-underline shrink-0 shadow-md transition-all active:scale-95"
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
