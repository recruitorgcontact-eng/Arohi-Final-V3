import React, { useState } from 'react';
import {
  X,
  Plus,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  Building,
  FolderKanban,
  CheckCircle2
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';

export default function QuickCreateModal() {
  const {
    quickCreateType,
    setQuickCreateType,
    addLead,
    addCustomer,
    addDeal,
    addQuotation,
    addInvoice,
    addExpense,
    addTask,
    showToast,
    theme
  } = useBusinessOS();

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cloud & Infrastructure');

  if (!quickCreateType) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (quickCreateType === 'lead') {
      addLead({
        name: name || 'Primary Contact',
        company: company || 'New Enterprise Client',
        email: email || 'contact@client.com',
        phone: phone || '+91 98765 43210',
        city: 'Mumbai',
        status: 'new',
        source: 'Inbound',
        estimatedValue: Number(amount) || 450000,
        aiScore: 82,
        aiInsight: 'Captured via Quick Create. Inbound interest in enterprise plan.',
        assignedTo: 'Ananya Sharma',
        tags: ['Quick Lead'],
        lastContactedAt: new Date().toISOString()
      });
    } else if (quickCreateType === 'customer') {
      addCustomer({
        name: company || 'New Client Account',
        contactPerson: name || 'Operations Lead',
        email: email || 'accounts@client.com',
        phone: phone || '+91 98765 00000',
        city: 'Bangalore',
        state: 'Karnataka',
        industry: 'Technology',
        gstin: '29AAACN1234F1Z9',
        lifetimeValue: Number(amount) || 500000,
        outstandingBalance: 0,
        totalInvoicesCount: 1,
        healthScore: 95,
        status: 'active',
        activeContractsCount: 1,
        assignedAccountManager: 'Rohit Verma'
      });
    } else if (quickCreateType === 'deal') {
      addDeal({
        title: title || `${company || 'Enterprise'} - Annual License`,
        customerName: company || 'Enterprise Client',
        contactEmail: email || 'contact@client.com',
        value: Number(amount) || 850000,
        probability: 65,
        stage: 'discovery',
        expectedCloseDate: '2025-03-31',
        assignedRep: 'Ananya Sharma',
        priority: 'high',
        productLine: 'AROHI ONE Business OS',
        notes: 'Created via Quick Dispatch.'
      });
    } else if (quickCreateType === 'invoice') {
      const numVal = Number(amount) || 150000;
      const tax = numVal * 0.18;
      addInvoice({
        invoiceNumber: `INV-2025-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: company || 'Enterprise Client Ltd',
        customerEmail: email || 'billing@client.com',
        customerGstin: '27AAACN5678G1Z2',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [
          {
            id: 'item_1',
            description: title || 'AROHI ONE Business OS Enterprise License',
            quantity: 1,
            unitPrice: numVal,
            taxRate: 18,
            total: numVal
          }
        ],
        subtotal: numVal,
        cgst: tax / 2,
        sgst: tax / 2,
        igst: 0,
        totalTax: tax,
        grandTotal: numVal + tax,
        amountPaid: 0,
        status: 'pending',
        notes: 'Terms: Payment due within 15 days from issue date.',
        upiQrString: `upi://pay?pa=nexusdynamics@hdfcbank&pn=NexusDynamics&am=${numVal + tax}&cu=INR`
      });
    } else if (quickCreateType === 'quote') {
      const numVal = Number(amount) || 250000;
      const tax = numVal * 0.18;
      addQuotation({
        quoteNumber: `QT-2025-${Math.floor(1000 + Math.random() * 9000)}`,
        customerId: 'cust_1',
        customerName: company || 'Prospective Enterprise Client',
        customerEmail: email || 'procurement@client.com',
        customerGstin: '27AAACN5678G1Z2',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [
          {
            id: 'qitem_1',
            description: title || 'Software License & Custom Telephony Integration',
            quantity: 1,
            unitPrice: numVal,
            taxRate: 18,
            total: numVal
          }
        ],
        subtotal: numVal,
        taxTotal: tax,
        discountTotal: 0,
        grandTotal: numVal + tax,
        status: 'sent',
        terms: '30 days price validity. GST extra as applicable.',
        notes: 'Standard enterprise SLA included.',
        paymentTerms: '50% advance, 50% upon deployment.'
      });
    } else if (quickCreateType === 'expense') {
      addExpense({
        title: title || 'Office Operations & Hardware',
        category: 'Software & Cloud Infrastructure',
        amount: Number(amount) || 25000,
        date: new Date().toISOString().split('T')[0],
        paidBy: 'Operations Lead',
        vendorName: company || 'General Corporate Vendor',
        paymentMethod: 'Corporate Card',
        status: 'approved',
        receiptAttached: true,
        taxDeductible: true,
        gstClaimable: true,
        isGstClaimable: true,
        gstin: '21AABCN9876E1Z5'
      });
    } else if (quickCreateType === 'task') {
      addTask({
        projectId: 'proj_1',
        title: title || 'Complete Client Deliverable Milestone',
        description: 'Scheduled via quick dispatch modal.',
        assignedTo: 'Rohit Verma',
        dueDate: '2025-03-10',
        priority: 'high',
        status: 'todo',
        estimatedHours: 8,
        loggedHours: 0
      });
    }

    setQuickCreateType(null);
  };

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-zinc-100 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
          <div>
            <span className="text-[9px] font-semibold uppercase text-violet-600 dark:text-violet-400 tracking-wider">
              Quick Dispatch
            </span>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 capitalize mt-0.5">
              Create New {quickCreateType}
            </h3>
          </div>
          <button
            onClick={() => setQuickCreateType(null)}
            className="p-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          
          {(quickCreateType === 'deal' || quickCreateType === 'task' || quickCreateType === 'expense' || quickCreateType === 'invoice' || quickCreateType === 'quote') && (
            <div className="space-y-1">
              <label className="text-zinc-500 dark:text-zinc-400 font-medium text-[10px]">Title / Description</label>
              <input
                type="text"
                required
                placeholder={quickCreateType === 'task' ? 'Task Title' : 'Item Description'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#F5F5F7] dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>
          )}

          {(quickCreateType === 'lead' || quickCreateType === 'customer' || quickCreateType === 'deal' || quickCreateType === 'invoice' || quickCreateType === 'quote') && (
            <div className="space-y-1">
              <label className="text-zinc-500 dark:text-zinc-400 font-medium text-[10px]">Client / Company Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Tata Advanced Systems, Infosys, Reliance"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-[#F5F5F7] dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>
          )}

          {(quickCreateType === 'lead' || quickCreateType === 'customer') && (
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-zinc-500 dark:text-zinc-400 font-medium text-[10px]">Contact Person</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F5F5F7] dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-500 dark:text-zinc-400 font-medium text-[10px]">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F5F5F7] dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                />
              </div>
            </div>
          )}

          {(quickCreateType === 'lead' || quickCreateType === 'customer' || quickCreateType === 'invoice' || quickCreateType === 'quote') && (
            <div className="space-y-1">
              <label className="text-zinc-500 dark:text-zinc-400 font-medium text-[10px]">Email Address</label>
              <input
                type="email"
                placeholder="contact@enterprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F5F7] dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>
          )}

          {quickCreateType === 'expense' && (
            <div className="space-y-1">
              <label className="text-zinc-500 dark:text-zinc-400 font-medium text-[10px]">Expense Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F5F5F7] dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
              >
                <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                <option value="Office & Facilities">Office & Facilities</option>
                <option value="Hardware & Devices">Hardware & Devices</option>
                <option value="Travel & Meals">Travel & Meals</option>
                <option value="Marketing & Ads">Marketing & Ads</option>
              </select>
            </div>
          )}

          {(quickCreateType === 'lead' || quickCreateType === 'deal' || quickCreateType === 'invoice' || quickCreateType === 'quote' || quickCreateType === 'expense') && (
            <div className="space-y-1">
              <label className="text-zinc-500 dark:text-zinc-400 font-medium text-[10px]">Amount / Value (INR ₹)</label>
              <input
                type="number"
                required
                placeholder="e.g. 500000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#F5F5F7] dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
            <button
              type="button"
              onClick={() => setQuickCreateType(null)}
              className="px-3.5 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-zinc-900 dark:bg-white hover:opacity-90 text-xs font-semibold text-white dark:text-zinc-900 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              Save & Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
