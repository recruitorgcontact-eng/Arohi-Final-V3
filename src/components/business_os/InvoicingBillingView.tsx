import React, { useState } from 'react';
import {
  FileText,
  Plus,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  Download,
  DollarSign,
  CreditCard,
  Building,
  Sparkles,
  X
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { Invoice } from './types';

export default function InvoicingBillingView() {
  const { invoices, markInvoicePaid, deleteInvoice, setQuickCreateType, showToast } = useBusinessOS();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleSendReminder = (invNum: string, client: string) => {
    showToast(`Automated WhatsApp & Email payment reminder sent for ${invNum} to ${client}`);
  };

  const handleDownloadTaxInvoice = (invNum: string) => {
    showToast(`Downloading signed GST Tax Invoice PDF for ${invNum}...`);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              GST Tax Invoicing & Smart Billing Ledger
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Generate compliant GST invoices (CGST/SGST/IGST), UPI dynamic QR codes, and automate payment collections
            </p>
          </div>
        </div>

        <button
          onClick={() => setQuickCreateType('invoice')}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Tax Invoice</span>
        </button>
      </div>

      {/* Invoices Ledger Table */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-50/80 dark:bg-[#18181b] border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Invoice Number</th>
                <th className="py-3 px-4">Client & GSTIN</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Subtotal</th>
                <th className="py-3 px-4">GST</th>
                <th className="py-3 px-4">Total Payable</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-violet-600 dark:text-violet-400 text-xs">{inv.invoiceNumber}</div>
                    <div className="text-[10px] text-zinc-400">Tax Invoice</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-zinc-900 dark:text-white text-xs">{inv.customerName}</div>
                    {inv.customerGstin && (
                      <div className="text-[10px] text-zinc-400 font-mono">GST: {inv.customerGstin}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 text-xs">
                    <div>Issued: {inv.issueDate}</div>
                    <div className="text-[10px] text-zinc-400">Due: {inv.dueDate}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-zinc-800 dark:text-zinc-200">
                    ₹{inv.subtotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-semibold text-zinc-500 dark:text-zinc-400">
                    ₹{inv.totalTax.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white text-xs">
                    ₹{inv.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      inv.status === 'paid'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                        : inv.status === 'overdue'
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/40'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.status !== 'paid' ? (
                        <>
                          <button
                            onClick={() => markInvoicePaid(inv.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => handleSendReminder(inv.invoiceNumber, inv.customerName)}
                            className="px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 text-[10px] font-semibold hover:bg-amber-100 cursor-pointer"
                            title="Send Automated Reminder"
                          >
                            Remind
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">✓ Settled</span>
                      )}
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px] font-semibold cursor-pointer"
                      >
                        View / UPI
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail & UPI QR Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18181b] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-violet-600 dark:text-violet-400 tracking-wider">GST Tax Invoice</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">{selectedInvoice.invoiceNumber}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadTaxInvoice(selectedInvoice.invoiceNumber)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Invoice Layout */}
            <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] space-y-4 text-xs">
              <div className="flex justify-between items-start border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Nexus Dynamics Pvt Ltd</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">Infocity Technology Corridor, Patia, Bhubaneswar, Odisha</p>
                  <p className="text-zinc-400 font-mono text-[10px]">GSTIN: 21AABCN9876E1Z5</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs text-violet-600 dark:text-violet-400">{selectedInvoice.invoiceNumber}</div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">Issued: {selectedInvoice.issueDate}</p>
                  <p className="text-rose-600 dark:text-rose-400 font-semibold text-[11px]">Due: {selectedInvoice.dueDate}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Billed To:</span>
                <h5 className="font-bold text-zinc-900 dark:text-white text-sm">{selectedInvoice.customerName}</h5>
                <p className="text-zinc-500 dark:text-zinc-400">{selectedInvoice.customerEmail}</p>
                {selectedInvoice.customerGstin && (
                  <p className="text-zinc-400 font-mono text-[10px]">GSTIN: {selectedInvoice.customerGstin}</p>
                )}
              </div>

              {/* Items Table */}
              <div className="border border-black/[0.06] dark:border-white/[0.08] rounded-xl overflow-hidden bg-white dark:bg-[#121214]">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Item & Description</th>
                      <th className="p-2.5">Qty</th>
                      <th className="p-2.5">Unit Rate</th>
                      <th className="p-2.5">Tax (GST)</th>
                      <th className="p-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
                    {(selectedInvoice.items || []).map((item) => (
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

              {/* Totals & Dynamic UPI QR Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                
                {/* UPI QR Payment Widget */}
                <div className="bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/40 rounded-xl p-3.5 flex items-center gap-3.5">
                  <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center shrink-0 border border-violet-200">
                    <QrCode className="w-full h-full text-zinc-900" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-violet-700 dark:text-violet-300">Instant UPI Settlement</span>
                    <p className="text-[10.5px] text-zinc-700 dark:text-zinc-300 font-medium">
                      Scan via GPay, PhonePe, Paytm
                    </p>
                    <p className="text-[9.5px] text-zinc-500 dark:text-zinc-400 font-mono">
                      nexusdynamics@hdfcbank
                    </p>
                  </div>
                </div>

                {/* Calculation Summary */}
                <div className="space-y-1.5 bg-white dark:bg-[#121214] p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] text-xs">
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Taxable Subtotal:</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">₹{selectedInvoice.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>CGST (9%):</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">₹{selectedInvoice.cgst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>SGST (9%):</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">₹{selectedInvoice.sgst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xs text-zinc-900 dark:text-white pt-1.5 border-t border-black/[0.06] dark:border-white/[0.08]">
                    <span>Grand Total:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">₹{selectedInvoice.grandTotal.toLocaleString()}</span>
                  </div>
                </div>

              </div>

              {/* Footer Payment Action */}
              {selectedInvoice.status !== 'paid' && (
                <div className="flex justify-end pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                  <button
                    onClick={() => {
                      markInvoicePaid(selectedInvoice.id);
                      setSelectedInvoice(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Record Payment Received</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
