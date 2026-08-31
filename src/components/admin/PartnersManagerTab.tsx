import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, DollarSign, TrendingUp, Plus, Check, X, ShieldCheck, 
  ExternalLink, Copy, AlertCircle, RefreshCw, CheckCircle2, Clock, 
  Search, Filter, Landmark, Wallet, Award, Edit2, Sliders, ChevronRight
} from 'lucide-react';
import { PartnerProfile, PartnerConversion, PartnerPayout } from '../../types/partner';

interface PartnersManagerTabProps {
  onNavigateTab?: (tab: string) => void;
}

export default function PartnersManagerTab({ onNavigateTab }: PartnersManagerTabProps) {
  const [partners, setPartners] = useState<any[]>([]);
  const [conversions, setConversions] = useState<PartnerConversion[]>([]);
  const [payouts, setPayouts] = useState<PartnerPayout[]>([]);
  const [summary, setSummary] = useState({
    totalPartners: 0,
    totalStudentsOnboarded: 0,
    totalGrossBusiness: 0,
    totalCommissionLiability: 0,
    totalPaidOut: 0,
    totalPendingPayouts: 0,
    netUnpaidBalance: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPartnerForEdit, setSelectedPartnerForEdit] = useState<any | null>(null);
  const [selectedPayoutForAction, setSelectedPayoutForAction] = useState<PartnerPayout | null>(null);
  const [payoutUtrInput, setPayoutUtrInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Partner Form
  const [newPartnerForm, setNewPartnerForm] = useState({
    name: '',
    email: '',
    phone: '',
    referralCode: '',
    pin: '1000',
    commissionRate: 15,
    targetStudents: 1000,
    notes: ''
  });

  // Fetch partners data from server
  const fetchPartnersData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/partners', {
        headers: { 'Authorization': 'Bearer recruit_admin_authorized_token_2026' }
      });
      if (res.ok) {
        const data = await res.json();
        setPartners(data.partners || []);
        setConversions(data.conversions || []);
        setPayouts(data.payouts || []);
        setSummary(data.summary || summary);
      }
    } catch (err) {
      console.warn('Failed to load partners data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnersData();
  }, []);

  // Handle create partner
  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerForm.name || !newPartnerForm.referralCode) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/partner/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer recruit_admin_authorized_token_2026'
        },
        body: JSON.stringify(newPartnerForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAddModalOpen(false);
        setNewPartnerForm({
          name: '',
          email: '',
          phone: '',
          referralCode: '',
          pin: '1000',
          commissionRate: 15,
          targetStudents: 1000,
          notes: ''
        });
        setToastMessage(`Partner ${data.partner.referralCode} created with ${data.partner.commissionRate}% commission!`);
        setTimeout(() => setToastMessage(null), 4000);
        fetchPartnersData();
      } else {
        alert(data.error || 'Failed to create partner');
      }
    } catch (err) {
      alert('Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit partner
  const handleUpdatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPartnerForEdit) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/partner/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer recruit_admin_authorized_token_2026'
        },
        body: JSON.stringify(selectedPartnerForEdit)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSelectedPartnerForEdit(null);
        setToastMessage(`Partner ${data.partner.referralCode} updated successfully.`);
        setTimeout(() => setToastMessage(null), 4000);
        fetchPartnersData();
      }
    } catch (err) {
      alert('Error updating partner');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle payout action
  const handlePayoutAction = async (payoutId: string, action: 'paid' | 'approved' | 'rejected') => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/partner/payout-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer recruit_admin_authorized_token_2026'
        },
        body: JSON.stringify({
          payoutId,
          action,
          utr: payoutUtrInput || `UTR-${Date.now()}`
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSelectedPayoutForAction(null);
        setPayoutUtrInput('');
        setToastMessage(`Payout ${payoutId} marked as ${action.toUpperCase()}`);
        setTimeout(() => setToastMessage(null), 4000);
        fetchPartnersData();
      }
    } catch (err) {
      alert('Error updating payout status');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered partners
  const filteredPartners = partners.filter(p => {
    const matchSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.referralCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Top Banner KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">Active Partners</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{summary.totalPartners}</div>
          <div className="text-[11px] text-slate-400 mt-1">{summary.totalStudentsOnboarded} students onboarded</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">Gross Sales via Partners</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">₹{summary.totalGrossBusiness.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-400 mt-1">15% commission model active</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-400 uppercase">Total 15% Liability</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">₹{summary.totalCommissionLiability.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-slate-400 mt-1">Paid out: ₹{summary.totalPaidOut.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 bg-gradient-to-b from-slate-900 to-amber-950/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 uppercase">Net Unpaid Balance</span>
            <Wallet className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">₹{summary.netUnpaidBalance.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-amber-300 mt-1">{payouts.filter(p => p.status === 'pending').length} pending withdrawal requests</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Influencer & Partner Accounts (15% Commission)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage influencer referral codes, target goals (1,000 students), custom rates, and payout authorizations.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchPartnersData}
              className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs transition-colors"
              title="Refresh Partner Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Partner
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search partner name, code, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none w-full sm:w-auto"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="pending">Pending Approval</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Partners Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-semibold">
                <th className="pb-3 font-semibold">Partner / Influencer</th>
                <th className="pb-3 font-semibold">Referral Code</th>
                <th className="pb-3 font-semibold text-center">Commission</th>
                <th className="pb-3 font-semibold">1,000 Goal Progress</th>
                <th className="pb-3 font-semibold text-right">Gross Sales</th>
                <th className="pb-3 font-semibold text-right">15% Earned</th>
                <th className="pb-3 font-semibold text-right">Unpaid Balance</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPartners.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5">
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{p.email}</div>
                  </td>
                  <td className="py-3.5">
                    <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {p.referralCode}
                    </span>
                  </td>
                  <td className="py-3.5 text-center font-bold text-white">
                    {p.commissionRate || 15}%
                  </td>
                  <td className="py-3.5 min-w-[140px]">
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="text-white font-bold">{p.metrics?.totalStudents || 0}</span>
                      <span className="text-slate-500">/ {p.targetStudents || 1000}</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, p.metrics?.targetProgressPercent || 0)}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3.5 text-right font-mono font-semibold text-white">
                    ₹{(p.metrics?.totalGrossRevenue || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 text-right font-mono font-bold text-emerald-400">
                    ₹{(p.metrics?.totalCommissionEarned || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 text-right font-mono font-bold text-amber-400">
                    ₹{(p.metrics?.unpaidCommissionBalance || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => setSelectedPartnerForEdit({ ...p })}
                      className="p-1.5 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800"
                      title="Edit Partner & Commission Rate"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        window.open(`/?ref=${p.referralCode}`, '_blank');
                      }}
                      className="p-1.5 text-amber-400 hover:text-amber-300 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800"
                      title="Open Direct Referral Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Withdrawal Requests Management Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Landmark className="w-4 h-4 text-emerald-400" />
            Partner Commission Payout Authorization Ledger
          </h3>
          <span className="text-xs text-amber-400 font-semibold">
            {payouts.filter(p => p.status === 'pending').length} Pending Review
          </span>
        </div>

        {payouts.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No withdrawal requests pending or processed.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-semibold">
                  <th className="pb-2">Request ID</th>
                  <th className="pb-2">Partner Code</th>
                  <th className="pb-2">Requested At</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Method & Details</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">UTR Ref</th>
                  <th className="pb-2 text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {payouts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-800/30">
                    <td className="py-3 font-mono text-slate-400">{p.id}</td>
                    <td className="py-3 font-mono font-bold text-amber-400">{p.partnerCode}</td>
                    <td className="py-3 font-mono text-slate-400">{new Date(p.requestedAt).toLocaleDateString('en-GB')}</td>
                    <td className="py-3 font-bold text-white">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3 text-slate-300 font-mono text-[11px]">{p.payoutMethod} • {p.payoutDetails}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-[11px] text-slate-400">{p.utr || '-'}</td>
                    <td className="py-3 text-right space-x-1.5">
                      {p.status !== 'paid' ? (
                        <button
                          onClick={() => {
                            setSelectedPayoutForAction(p);
                            setPayoutUtrInput(`UTR${Date.now().toString().slice(-8)}`);
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg transition-colors"
                        >
                          Mark as Paid
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-bold flex items-center justify-end gap-1">
                          <Check className="w-3.5 h-3.5" /> Settled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Add Partner */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  Create New Partner / Influencer Code
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreatePartner} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Partner / Channel Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Commander Junoon or Tech Odisha"
                    value={newPartnerForm.name}
                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Referral Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. JUNOON1000"
                      value={newPartnerForm.referralCode}
                      onChange={(e) => setNewPartnerForm({ ...newPartnerForm, referralCode: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono font-bold focus:outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Commission Rate (%)</label>
                    <input
                      type="number"
                      min="5"
                      max="50"
                      value={newPartnerForm.commissionRate}
                      onChange={(e) => setNewPartnerForm({ ...newPartnerForm, commissionRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Partner Email</label>
                    <input
                      type="email"
                      placeholder="partner@gmail.com"
                      value={newPartnerForm.email}
                      onChange={(e) => setNewPartnerForm({ ...newPartnerForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Security PIN</label>
                    <input
                      type="password"
                      maxLength={6}
                      value={newPartnerForm.pin}
                      onChange={(e) => setNewPartnerForm({ ...newPartnerForm, pin: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Target Students Goal</label>
                  <input
                    type="number"
                    value={newPartnerForm.targetStudents}
                    onChange={(e) => setNewPartnerForm({ ...newPartnerForm, targetStudents: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-md transition-all mt-2"
                >
                  Create Partner ID
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Edit Partner */}
      <AnimatePresence>
        {selectedPartnerForEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Edit Partner: {selectedPartnerForEdit.referralCode}
                </h3>
                <button onClick={() => setSelectedPartnerForEdit(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleUpdatePartner} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={selectedPartnerForEdit.status}
                    onChange={(e) => setSelectedPartnerForEdit({ ...selectedPartnerForEdit, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Commission Rate (%)</label>
                    <input
                      type="number"
                      value={selectedPartnerForEdit.commissionRate}
                      onChange={(e) => setSelectedPartnerForEdit({ ...selectedPartnerForEdit, commissionRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Target Students</label>
                    <input
                      type="number"
                      value={selectedPartnerForEdit.targetStudents}
                      onChange={(e) => setSelectedPartnerForEdit({ ...selectedPartnerForEdit, targetStudents: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Security PIN</label>
                  <input
                    type="text"
                    value={selectedPartnerForEdit.pin}
                    onChange={(e) => setSelectedPartnerForEdit({ ...selectedPartnerForEdit, pin: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-md transition-all mt-2"
                >
                  Save Partner Settings
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Mark Payout Paid */}
      <AnimatePresence>
        {selectedPayoutForAction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-xs"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Settle Commission Payout
                </h3>
                <button onClick={() => setSelectedPayoutForAction(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Partner Code:</span>
                  <span className="font-mono font-bold text-amber-400">{selectedPayoutForAction.partnerCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount:</span>
                  <span className="font-bold text-white text-sm">₹{selectedPayoutForAction.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Method:</span>
                  <span className="text-slate-200">{selectedPayoutForAction.payoutMethod} ({selectedPayoutForAction.payoutDetails})</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bank UTR / Transaction Reference ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AXIS992817263541 or GPAY3829102"
                    value={payoutUtrInput}
                    onChange={(e) => setPayoutUtrInput(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handlePayoutAction(selectedPayoutForAction.id, 'paid')}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors"
                  >
                    Confirm Payout Paid
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePayoutAction(selectedPayoutForAction.id, 'rejected')}
                    className="px-3 py-2.5 bg-red-950 hover:bg-red-900 text-red-300 font-bold rounded-xl border border-red-800 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
