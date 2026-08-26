import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Building,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  Search,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { PurchaseOrder, Vendor } from './types';

export default function PurchasesVendorsView() {
  const { vendors = [], purchaseOrders = [], updatePOStatus, addPurchaseOrder, addVendor, showToast } = useBusinessOS();
  const [activeTab, setActiveTab] = useState<'pos' | 'vendors'>('pos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPOModalOpen, setIsAddPOModalOpen] = useState(false);
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);

  // New PO form state
  const [poVendorName, setPoVendorName] = useState('');
  const [poItemDesc, setPoItemDesc] = useState('');
  const [poAmount, setPoAmount] = useState('');
  const [poDeliveryDate, setPoDeliveryDate] = useState('');

  // New Vendor form state
  const [vendorName, setVendorName] = useState('');
  const [vendorCategory, setVendorCategory] = useState('Cloud & Infrastructure');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorGstin, setVendorGstin] = useState('');
  const [vendorCity, setVendorCity] = useState('');

  const safePOs = purchaseOrders || [];
  const safeVendors = vendors || [];

  const filteredPOs = safePOs.filter(po => {
    const q = searchQuery.toLowerCase();
    const matchesPoNum = (po?.poNumber || '').toLowerCase().includes(q);
    const matchesVendor = (po?.vendorName || '').toLowerCase().includes(q);
    return matchesPoNum || matchesVendor;
  });

  const filteredVendors = safeVendors.filter(v => {
    const q = searchQuery.toLowerCase();
    const matchesName = (v?.name || '').toLowerCase().includes(q);
    const matchesCat = (v?.category || '').toLowerCase().includes(q);
    const matchesCity = (v?.city || '').toLowerCase().includes(q);
    return matchesName || matchesCat || matchesCity;
  });

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poVendorName.trim() || !poAmount) {
      showToast('Please enter vendor name and total amount');
      return;
    }
    const amt = parseFloat(poAmount) || 0;
    const newPO: Omit<PurchaseOrder, 'id'> = {
      poNumber: `PO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      vendorId: `ven_${Date.now()}`,
      vendorName: poVendorName,
      vendorGstin: '21AAACB9876K1Z5',
      orderDate: new Date().toISOString().split('T')[0],
      date: new Date().toISOString().split('T')[0],
      expectedDelivery: poDeliveryDate || 'In 7 Days',
      itemsCount: 1,
      items: [{
        id: `item_${Date.now()}`,
        description: poItemDesc || 'Enterprise procurement supplies',
        quantity: 1,
        unitPrice: amt,
        taxRate: 18,
        total: amt
      }],
      totalAmount: amt,
      grandTotal: amt,
      status: 'approved',
      approvalBy: 'Finance Executive'
    };
    addPurchaseOrder(newPO);
    setIsAddPOModalOpen(false);
    setPoVendorName('');
    setPoItemDesc('');
    setPoAmount('');
    setPoDeliveryDate('');
  };

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName.trim()) {
      showToast('Please enter vendor name');
      return;
    }
    const newV: Omit<Vendor, 'id'> = {
      name: vendorName,
      category: vendorCategory,
      contactPerson: 'Lead Account Manager',
      email: vendorEmail || 'billing@vendor.in',
      phone: vendorPhone || '+91 98765 43210',
      gstin: vendorGstin || '21AAACI5544K1Z8',
      city: vendorCity || 'Bhubaneswar',
      rating: 4.8,
      totalBilled: 0,
      totalBilledAmount: 0,
      paymentTerms: 'Net 30',
      status: 'active'
    };
    addVendor(newV);
    setIsAddVendorModalOpen(false);
    setVendorName('');
    setVendorEmail('');
    setVendorPhone('');
    setVendorGstin('');
    setVendorCity('');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header & Controls */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                Purchases & Vendor Procurement
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                Issue Purchase Orders (PO), track inbound deliveries, and manage vendor compliance
              </p>
            </div>
          </div>
        </div>

        {/* Tab Toggle & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('pos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pos'
                  ? 'bg-white dark:bg-[#1f1f23] text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Purchase Orders ({safePOs.length})
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'vendors'
                  ? 'bg-white dark:bg-[#1f1f23] text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Approved Vendors ({safeVendors.length})
            </button>
          </div>

          {activeTab === 'pos' ? (
            <button
              onClick={() => setIsAddPOModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Issue PO</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAddVendorModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Vendor</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={activeTab === 'pos' ? "Search PO number or vendor..." : "Search vendor name, category, or city..."}
          className="w-full bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-violet-500 shadow-xs transition-all"
        />
      </div>

      {activeTab === 'pos' ? (
        /* Purchase Orders Table View */
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-50/80 dark:bg-[#18181b] border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">PO Number</th>
                  <th className="py-3 px-4">Vendor</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Items Summary</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
                {filteredPOs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-xs text-zinc-400">
                      No Purchase Orders matching query. Click "Issue PO" to create a new order.
                    </td>
                  </tr>
                ) : (
                  filteredPOs.map((po) => {
                    const itemsDesc = Array.isArray(po?.items) && po.items.length > 0
                      ? po.items.map(i => i?.description || 'Item').join(', ')
                      : `${po?.itemsCount || 1} procurement items`;
                    const amt = po?.grandTotal || po?.totalAmount || 0;
                    const dateDisplay = po?.date || po?.orderDate || 'Recent';

                    return (
                      <tr key={po.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-violet-600 dark:text-violet-400">
                          {po.poNumber}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-zinc-900 dark:text-white text-xs">{po.vendorName}</div>
                          {po.vendorGstin && (
                            <div className="text-[10px] text-zinc-400 font-mono">GST: {po.vendorGstin}</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 text-xs">
                          {dateDisplay}
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate text-zinc-600 dark:text-zinc-300 text-xs">
                          {itemsDesc}
                        </td>
                        <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white text-xs">
                          ₹{amt.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                            po.status === 'received'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                              : po.status === 'approved' || po.status === 'issued'
                              ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/40'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                          }`}>
                            {po.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {po.status !== 'received' ? (
                            <button
                              onClick={() => updatePOStatus(po.id, 'received')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                            >
                              Mark Received
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Stock Inwarded</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Vendors Directory Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredVendors.length === 0 ? (
            <div className="col-span-full py-12 text-center text-xs text-zinc-400">
              No vendors found matching "{searchQuery}".
            </div>
          ) : (
            filteredVendors.map((v) => {
              const billed = v?.totalBilledAmount ?? v?.totalBilled ?? 0;
              return (
                <div 
                  key={v.id} 
                  className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white text-sm">{v.name}</h3>
                        <span className="inline-block mt-0.5 text-[9px] text-violet-700 dark:text-violet-300 font-bold uppercase bg-violet-50 dark:bg-violet-950/50 px-2 py-0.5 rounded-full border border-violet-200 dark:border-violet-800/40">
                          {v.category}
                        </span>
                      </div>
                      <span className="text-[9.5px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700">
                        {v.gstin}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="truncate">{v.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{v.phone}</span>
                      </div>
                      <div className="text-[10.5px] text-zinc-500 dark:text-zinc-400">
                        📍 {v.city}{v.state ? `, ${v.state}` : ''}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">Total Procured:</span>
                    <span className="font-bold text-zinc-900 dark:text-white">₹{billed.toLocaleString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Modal: Issue Purchase Order */}
      {isAddPOModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#18181b] border border-black/[0.08] dark:border-white/[0.1] rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                <span>Issue Purchase Order (PO)</span>
              </h3>
              <button 
                onClick={() => setIsAddPOModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePO} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Vendor Name *</label>
                <input
                  type="text"
                  required
                  value={poVendorName}
                  onChange={(e) => setPoVendorName(e.target.value)}
                  placeholder="e.g., Tata Communications / Google Cloud"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Item Description</label>
                <input
                  type="text"
                  value={poItemDesc}
                  onChange={(e) => setPoItemDesc(e.target.value)}
                  placeholder="e.g., Cloud Bandwidth / SIP Trunk Channels"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Total Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={poAmount}
                    onChange={(e) => setPoAmount(e.target.value)}
                    placeholder="150000"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Delivery Timeline</label>
                  <input
                    type="text"
                    value={poDeliveryDate}
                    onChange={(e) => setPoDeliveryDate(e.target.value)}
                    placeholder="e.g., In 5 Days"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPOModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-xs cursor-pointer active:scale-95"
                >
                  Generate PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Approved Vendor */}
      {isAddVendorModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#18181b] border border-black/[0.08] dark:border-white/[0.1] rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-violet-500" />
                <span>Onboard Approved Vendor</span>
              </h3>
              <button 
                onClick={() => setIsAddVendorModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateVendor} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Vendor Enterprise Name *</label>
                <input
                  type="text"
                  required
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  placeholder="e.g., Airtel Business / AWS India"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={vendorCategory}
                    onChange={(e) => setVendorCategory(e.target.value)}
                    placeholder="Telecom / Cloud / Office"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={vendorCity}
                    onChange={(e) => setVendorCity(e.target.value)}
                    placeholder="Bhubaneswar / Mumbai"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={vendorEmail}
                    onChange={(e) => setVendorEmail(e.target.value)}
                    placeholder="billing@vendor.com"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={vendorGstin}
                    onChange={(e) => setVendorGstin(e.target.value)}
                    placeholder="21AAACB9876K1Z5"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddVendorModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-xs cursor-pointer active:scale-95"
                >
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
