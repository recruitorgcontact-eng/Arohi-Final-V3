import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  ArrowRight,
  Download,
  Send,
  CheckCircle2,
  X,
  Printer,
  Sparkles
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { Quotation } from './types';

export default function QuotationsView() {
  const { quotations, convertQuoteToInvoice, deleteQuotation, setQuickCreateType, showToast } = useBusinessOS();
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);

  const handleSimulateSend = (qNum: string) => {
    showToast(`Quotation ${qNum} dispatched via WhatsApp & Email to client.`);
  };

  const handleSimulatePDF = (qNum: string) => {
    showToast(`Generating GST Quotation PDF document for ${qNum}... Download complete.`);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Commercial Quotations & Proposals
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Create professional GST-compliant estimates, calculate CGST/SGST, and convert accepted quotes to Tax Invoices
            </p>
          </div>
        </div>

        <button
          onClick={() => setQuickCreateType('quote')}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Quotation</span>
        </button>
      </div>

      {/* Quotes Table */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-50/80 dark:bg-[#18181b] border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Quote #</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Date & Validity</th>
                <th className="py-3 px-4">Subtotal</th>
                <th className="py-3 px-4">Tax (GST)</th>
                <th className="py-3 px-4">Grand Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
              {quotations.map((quote) => (
                <tr key={quote.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-violet-600 dark:text-violet-400 text-xs">
                    {quote.quoteNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-zinc-900 dark:text-white text-xs">{quote.customerName}</div>
                    <div className="text-[10px] text-zinc-400">{quote.customerEmail}</div>
                  </td>
                  <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 text-xs">
                    <div>Issued: {quote.date}</div>
                    <div className="text-[10px] text-zinc-400">Valid: {quote.validUntil}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-zinc-800 dark:text-zinc-200">
                    ₹{quote.subtotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-semibold text-zinc-500 dark:text-zinc-400">
                    ₹{quote.taxTotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white text-xs">
                    ₹{quote.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      quote.status === 'converted_to_invoice'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                        : quote.status === 'approved'
                        ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/40'
                        : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/40'
                    }`}>
                      {quote.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {quote.status !== 'converted_to_invoice' ? (
                        <button
                          onClick={() => convertQuoteToInvoice(quote.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                        >
                          <span>Convert to Invoice</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">✓ Invoiced</span>
                      )}
                      <button
                        onClick={() => setSelectedQuote(quote)}
                        className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px] font-semibold cursor-pointer"
                      >
                        Preview
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Preview Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18181b] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider">Commercial Estimate</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">{selectedQuote.quoteNumber}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSimulatePDF(selectedQuote.quoteNumber)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => handleSimulateSend(selectedQuote.quoteNumber)}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-semibold flex items-center gap-1.5 text-white cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Client</span>
                </button>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quote Paper Layout Preview */}
            <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-4 text-xs">
              <div className="flex justify-between items-start border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Nexus Dynamics Pvt Ltd</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">Infocity Technology Corridor, Patia, Bhubaneswar, Odisha</p>
                  <p className="text-zinc-400 font-mono text-[10px]">GSTIN: 21AABCN9876E1Z5</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs text-purple-600 dark:text-purple-400">{selectedQuote.quoteNumber}</div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">Date: {selectedQuote.date}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">Valid Until: {selectedQuote.validUntil}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Prepared For:</span>
                <h5 className="font-bold text-zinc-900 dark:text-white text-sm">{selectedQuote.customerName}</h5>
                <p className="text-zinc-500 dark:text-zinc-400">{selectedQuote.customerEmail}</p>
                {selectedQuote.customerGstin && (
                  <p className="text-zinc-400 font-mono text-[10px]">Client GSTIN: {selectedQuote.customerGstin}</p>
                )}
              </div>

              {/* Items Table */}
              <div className="border border-black/[0.06] dark:border-white/[0.08] rounded-xl overflow-hidden bg-white dark:bg-[#121214]">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Item & Description</th>
                      <th className="p-2.5">Qty</th>
                      <th className="p-2.5">Unit Price</th>
                      <th className="p-2.5">GST</th>
                      <th className="p-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
                    {(selectedQuote.items || []).map((item) => (
                      <tr key={item.id}>
                        <td className="p-2.5 text-zinc-900 dark:text-white font-semibold">{item.description}</td>
                        <td className="p-2.5 text-zinc-500 dark:text-zinc-400">{item.quantity}</td>
                        <td className="p-2.5">₹{item.unitPrice.toLocaleString()}</td>
                        <td className="p-2.5 text-zinc-500 dark:text-zinc-400">{item.taxRate}%</td>
                        <td className="p-2.5 text-right font-bold text-zinc-900 dark:text-white">₹{item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 bg-white dark:bg-[#121214] p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">₹{selectedQuote.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Tax (GST 18%):</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">₹{selectedQuote.taxTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xs text-zinc-900 dark:text-white pt-1.5 border-t border-black/[0.06] dark:border-white/[0.08]">
                    <span>Grand Total:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">₹{selectedQuote.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-black/[0.06] dark:border-white/[0.08] pt-3 space-y-1">
                <p><strong>Terms & Conditions:</strong> {selectedQuote.terms}</p>
                <p><strong>Payment Terms:</strong> {selectedQuote.paymentTerms}</p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
