import React from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2, FileText, Landmark, CreditCard, Tag } from 'lucide-react';
import { PaymentTransaction } from '../../data/adminMockData';

interface TaxInvoiceModalProps {
  transaction: PaymentTransaction | null;
  onClose: () => void;
}

export default function TaxInvoiceModal({ transaction, onClose }: TaxInvoiceModalProps) {
  if (!transaction) return null;

  const invoiceNo = transaction.invoiceNumber || `INV-2026-${transaction.id.replace(/\D/g, '').slice(-4) || '1088'}`;
  const baseAmount = transaction.originalAmount || (transaction.amount > 0 ? transaction.amount : 399);
  const discount = transaction.couponDiscount || (transaction.amount === 0 ? baseAmount : 0);
  const taxableAmount = Math.max(0, transaction.amount);
  const gstRate = 0.18; // 18% GST (9% CGST + 9% SGST)
  const gstAmount = Math.round(taxableAmount * gstRate);
  const netTotal = taxableAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0b0820] border border-cyan-500/40 rounded-3xl w-full max-w-2xl text-slate-200 shadow-2xl shadow-cyan-950/60 overflow-hidden relative my-8">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#120a32] via-[#0e163c] to-[#0c0824] p-5 border-b border-[#2d1b64] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                Official GST Tax Invoice
                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                  PAID & VERIFIED
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">Invoice Ref: {invoiceNo} • SAC Code: 998431 (Online Education & AI Coaching)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Printable Canvas */}
        <div className="p-6 space-y-6 text-xs" id="printable-tax-invoice">
          
          {/* Company & Aspirant Header */}
          <div className="grid grid-cols-2 gap-6 border-b border-[#221648] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  AROHI AI PRIVATE LIMITED
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-medium leading-relaxed">
                Arohi Digital AI Innovation Command Hub<br />
                Technology Corridor, Bhubaneswar, Odisha 751024<br />
                <span className="font-mono text-cyan-300">GSTIN: 21AAKCA9841B1Z8</span><br />
                CIN: U72900OR2026PTC049281
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Billed To (Customer):</span>
              <p className="text-sm font-black text-white mt-1">{transaction.userName || 'Valued Aspirant'}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{transaction.userEmail}</p>
              {transaction.userPhone && <p className="text-[10px] text-slate-400 font-mono">{transaction.userPhone}</p>}
              <p className="text-[10px] text-cyan-400 font-medium mt-1">Place of Supply: Odisha (21)</p>
            </div>
          </div>

          {/* Transaction Metadata Grid */}
          <div className="grid grid-cols-3 gap-3 bg-[#110c2e]/70 border border-[#271954] p-3.5 rounded-2xl">
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-500 block">Invoice Date</span>
              <span className="text-xs font-bold text-white font-mono">{transaction.date}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-500 block">Real Payment Mode</span>
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1 font-mono">
                <CreditCard className="w-3 h-3 text-cyan-400" />
                {transaction.realModeLabel || transaction.method}
              </span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-500 block">Transaction Reference / UTR</span>
              <span className="text-xs font-bold text-purple-300 font-mono break-all">{transaction.utr || transaction.gatewayOrderId || 'VERIFIED-LEDGER'}</span>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-[#271954] rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#140e36] text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-[#271954]">
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">HSN/SAC</th>
                  <th className="p-3 text-right">List Price</th>
                  <th className="p-3 text-right">Discount</th>
                  <th className="p-3 text-right">Net Taxable (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#271954]/50">
                <tr>
                  <td className="p-3">
                    <p className="font-bold text-white text-xs">{transaction.planName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      30 Days Unlimited AI Mentorship, ATS Resume Optimization, CBT Tests, Voice Access
                    </p>
                    {transaction.couponUsed && transaction.couponUsed !== 'None' && (
                      <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-mono mt-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                        <Tag className="w-2.5 h-2.5" /> Applied Coupon: {transaction.couponUsed}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center font-mono text-slate-400">998431</td>
                  <td className="p-3 text-right font-mono text-slate-400">₹{baseAmount}</td>
                  <td className="p-3 text-right font-mono text-emerald-400">-₹{discount}</td>
                  <td className="p-3 text-right font-mono font-bold text-white">₹{taxableAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Calculation Breakdown */}
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="bg-[#110c2e]/40 border border-[#271954] p-3 rounded-2xl text-[10px] text-slate-400 leading-relaxed">
              <p className="font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Digital Verification Note
              </p>
              <p>
                This is a digitally generated computer invoice verified by Arohi AI Financial Ledger. Applicable under Section 31 of CGST Act 2017.
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal (Base Value):</span>
                <span className="font-mono">₹{taxableAmount}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CGST (9%):</span>
                <span className="font-mono">Included in Plan Price</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SGST (9%):</span>
                <span className="font-mono">Included in Plan Price</span>
              </div>
              <div className="flex justify-between font-black text-sm text-[#00e676] border-t border-[#271954] pt-2">
                <span>Total Amount Paid:</span>
                <span className="font-mono">₹{netTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#0e0a2a] border-t border-[#2d1b64] flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono">
            Transaction Mode: {transaction.realModeLabel || transaction.method}
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="bg-[#1b1442] hover:bg-[#2c1f6c] text-slate-200 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#3b2984]"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" /> Print Invoice
            </button>
            <button
              onClick={onClose}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-cyan-950/50"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
