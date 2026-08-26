import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Zap,
  CheckCircle2,
  DollarSign,
  Briefcase,
  FileText,
  PhoneCall,
  Loader2
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';

interface CopilotMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    moduleTarget: string;
  };
}

export default function BusinessCopilotDrawer() {
  const {
    isCopilotOpen,
    setIsCopilotOpen,
    companyProfile,
    metrics,
    leads,
    deals,
    invoices,
    expenses,
    setActiveModule,
    showToast,
    theme
  } = useBusinessOS();

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello! I am your Arohi AI Business Copilot for ${companyProfile.name}. I have real-time visibility across your GST invoices, sales pipeline (₹${(metrics.openDealsValue / 100000).toFixed(1)}L), cash reserves (₹${(metrics.cashBalance / 100000).toFixed(1)}L), and team tasks. How can I assist you today?`,
      timestamp: 'Just Now'
    }
  ]);

  if (!isCopilotOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    const userMsg: CopilotMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just Now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Context-aware smart AI answers based on real current state
    setTimeout(() => {
      let aiReply = '';
      let suggestedAction: { label: string; moduleTarget: string } | undefined = undefined;

      const lower = userText.toLowerCase();

      if (lower.includes('revenue') || lower.includes('income') || lower.includes('sales')) {
        aiReply = `Total collected revenue is ₹${metrics.totalRevenue.toLocaleString()} across paid invoices. You currently have ₹${metrics.pendingInvoiceAmount.toLocaleString()} in pending invoices and ₹${metrics.overdueInvoiceAmount.toLocaleString()} overdue. Your active sales pipeline contains ₹${(metrics.openDealsValue / 100000).toFixed(2)} Lakhs in potential enterprise contracts.`;
        suggestedAction = { label: 'Open Invoices & Collections', moduleTarget: 'invoices' };
      } else if (lower.includes('lead') || lower.includes('deal') || lower.includes('pipeline')) {
        aiReply = `You have ${leads.length} active leads and ${deals.length} deals in your pipeline. High priority deal: Tata Advanced Systems (₹12,50,000, 75% Win Probability). Arohi AI Lead Scoring identified 2 hot leads ready for proposal conversion.`;
        suggestedAction = { label: 'Go to Pipeline Kanban', moduleTarget: 'pipeline' };
      } else if (lower.includes('tax') || lower.includes('gst') || lower.includes('invoice')) {
        aiReply = `Your organization GSTIN is ${companyProfile.gstin}. Total GST liability collected on paid invoices is ₹${(invoices.reduce((s, i) => s + (i.status === 'paid' ? i.totalTax : 0), 0)).toLocaleString()} (CGST + SGST). Dynamic UPI QR codes are enabled on all tax invoices.`;
        suggestedAction = { label: 'View GST Ledger', moduleTarget: 'invoices' };
      } else if (lower.includes('expense') || lower.includes('profit') || lower.includes('burn')) {
        const profit = metrics.totalRevenue - metrics.totalExpenses;
        aiReply = `Total operating expenditures logged: ₹${metrics.totalExpenses.toLocaleString()}. Net operating profit stands at ₹${profit.toLocaleString()}. Primary expense category is Cloud & Infrastructure.`;
        suggestedAction = { label: 'View P&L Breakdown', moduleTarget: 'finance' };
      } else if (lower.includes('call') || lower.includes('telephony') || lower.includes('voice')) {
        aiReply = `Arohi Call Telephony gateway is online at +91 80 4712 9900. Inbound AI calls are automatically transcribed with sentiment scores and synchronized to your CRM leads.`;
        suggestedAction = { label: 'Open Arohi Call Console', moduleTarget: 'telephony' };
      } else {
        aiReply = `I have analyzed your business records. All systems are operational. You have ${leads.length} leads in CRM, ₹${(metrics.openDealsValue / 100000).toFixed(1)}L in pipeline deals, and ${invoices.length} billing records. What specific analysis or document would you like me to generate?`;
      }

      const replyMsg: CopilotMessage = {
        id: `reply_${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: 'Just Now',
        suggestedAction
      };

      setMessages(prev => [...prev, replyMsg]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FBFBFD] dark:bg-[#121214] border-l border-black/[0.08] dark:border-white/[0.08] text-zinc-900 dark:text-zinc-100 w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-3.5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <span>Arohi Business Copilot</span>
                <span className="text-[8.5px] font-bold uppercase tracking-wider bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40 px-1.5 py-0.2 rounded-full">AI 3.6</span>
              </h3>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">Real-time Connected Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setIsCopilotOpen(false)}
            className="p-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-medium ${
                msg.sender === 'user'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300'
              }`}>
                {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
              </div>

              <div className={`max-w-[85%] rounded-2xl p-3 space-y-1.5 leading-relaxed text-[11.5px] ${
                msg.sender === 'user'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-tr-none'
                  : 'bg-white dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.08] text-zinc-800 dark:text-zinc-200 rounded-tl-none shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>

                {msg.suggestedAction && (
                  <button
                    onClick={() => {
                      setActiveModule(msg.suggestedAction!.moduleTarget as any);
                      setIsCopilotOpen(false);
                    }}
                    className="w-full mt-2 py-1.5 px-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>{msg.suggestedAction.label}</span>
                    <span>&rarr;</span>
                  </button>
                )}

                <div className={`text-[8.5px] text-right ${msg.sender === 'user' ? 'text-white/60 dark:text-black/60' : 'text-zinc-400 dark:text-zinc-500'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs italic bg-white dark:bg-[#18181b] p-2 rounded-xl border border-black/[0.06] dark:border-white/[0.08] w-fit shadow-xs">
              <Loader2 className="w-3 h-3 animate-spin text-violet-600" />
              <span className="text-[11px]">Analyzing live business ledger...</span>
            </div>
          )}
        </div>

        {/* Preset Prompts */}
        <div className="px-3.5 py-2 bg-white dark:bg-[#18181b] border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-1.5 overflow-x-auto text-[10px]">
          <button
            onClick={() => { setInputQuery('What is our total collected revenue and overdue balance?'); }}
            className="px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-700 dark:text-zinc-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            📊 Revenue Summary
          </button>
          <button
            onClick={() => { setInputQuery('Show our top pipeline deals ready to close'); }}
            className="px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-700 dark:text-zinc-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            💼 Pipeline Deals
          </button>
          <button
            onClick={() => { setInputQuery('What is our GST tax position this quarter?'); }}
            className="px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-700 dark:text-zinc-300 whitespace-nowrap cursor-pointer transition-colors"
          >
            🧾 GST Position
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 border-t border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#121214] flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask Copilot about leads, deals, revenue, GST..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-[#F5F5F7] dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2 rounded-xl bg-zinc-900 dark:bg-white disabled:opacity-30 text-white dark:text-zinc-900 transition-all cursor-pointer shadow-xs hover:opacity-90"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
}
