import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, Shield, CreditCard, Calendar, Clock, Activity, 
  Settings, CheckCircle2, AlertCircle, FileText, ChevronRight, Coins, 
  Tag, Download, Sparkles, Award, Compass, MessageSquare, Laptop, Globe, ArrowRight
} from 'lucide-react';
import { AdminUser, PaymentTransaction, UserActivityTelemetry } from '../../data/adminMockData';
import TaxInvoiceModal from './TaxInvoiceModal';

interface UserDetailsDrawerProps {
  user: AdminUser | null;
  payments: PaymentTransaction[];
  telemetryLogs: UserActivityTelemetry[];
  onClose: () => void;
  onUpdateStatus: (userId: string, status: 'Active' | 'Suspended' | 'VIP') => void;
  onToggleService: (userId: string, serviceKey: 'path1' | 'path2' | 'path3' | 'path4') => void;
  onTogglePermission: (userId: string, permKey: 'canEditJobs' | 'canApproveApps' | 'canViewFinance') => void;
  onExtendPlan: (userId: string, days: number) => void;
}

export default function UserDetailsDrawer({
  user,
  payments,
  telemetryLogs,
  onClose,
  onUpdateStatus,
  onToggleService,
  onTogglePermission,
  onExtendPlan
}: UserDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'payments' | 'telemetry'>('profile');
  const [selectedInvoiceTxn, setSelectedInvoiceTxn] = useState<PaymentTransaction | null>(null);

  if (!user) return null;

  // Filter payments and telemetry for this specific user
  const userPayments = payments.filter(
    (p) => p.userEmail.toLowerCase() === user.email.toLowerCase()
  );

  const userTelemetry = telemetryLogs.filter(
    (t) => t.userEmail.toLowerCase() === user.email.toLowerCase()
  );

  // Compute total lifetime value
  const totalLTV = user.lifetimeValue !== undefined 
    ? user.lifetimeValue 
    : userPayments.reduce((acc, p) => acc + (p.status === 'Verified' ? p.amount : 0), 0) || (user.totalPaidAmount || 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#090717] border-l border-purple-500/30 text-slate-200 h-full flex flex-col justify-between shadow-2xl shadow-purple-950/80 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="bg-gradient-to-r from-[#120a2e] via-[#0f0b28] to-[#090717] p-5 border-b border-[#2d1b64] flex items-start justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center font-black text-purple-300 text-lg shadow-inner shrink-0 mt-0.5">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-black text-white">{user.name}</h3>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                  user.status === 'VIP' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25' :
                  user.status === 'Suspended' ? 'bg-red-500/15 text-red-400 border border-red-500/25' :
                  'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                }`}>
                  {user.status}
                </span>
                <span className="bg-[#1b1040] text-purple-300 border border-purple-500/30 text-[9px] font-mono px-2 py-0.5 rounded">
                  {user.customerType || 'Govt Aspirant'}
                </span>
              </div>

              <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-500" /> {user.email}</span>
                {user.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-500" /> {user.phone}</span>}
              </p>

              {/* LTV & Plan Badge */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="bg-emerald-950/60 text-[#00e676] border border-emerald-500/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  Lifetime Value (LTV): ₹{totalLTV.toLocaleString()}
                </span>
                <span className="bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono px-2.5 py-0.5 rounded-lg">
                  Plan: {user.activePlanName || 'Free Trial'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Tabs Navigation */}
        <div className="flex border-b border-[#25174e] bg-[#0c0822]/80 px-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-purple-500 text-purple-300 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Profile & Services</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'payments'
                ? 'border-cyan-500 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Real Payments & Invoices ({userPayments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'telemetry'
                ? 'border-amber-500 text-amber-300 bg-amber-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Input Telemetry ({userTelemetry.length})</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5 text-xs font-semibold">
          
          {/* TAB 1: PROFILE & SERVICES */}
          {activeTab === 'profile' && (
            <div className="space-y-4.5">
              
              {/* Account Status Override */}
              <div className="bg-[#110c2e]/60 border border-[#271954] p-4 rounded-2xl">
                <label className="block text-[10px] uppercase font-black text-slate-400 mb-2">
                  Account Status Override
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Active', 'Suspended', 'VIP'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdateStatus(user.id, st)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-black transition-all cursor-pointer border ${
                        user.status === st 
                          ? 'bg-purple-900/40 text-purple-300 border-purple-500 shadow-md' 
                          : 'bg-[#100d28]/70 text-slate-400 border-[#23174b] hover:bg-[#151238]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extend Plan Actions */}
              <div className="bg-[#110c2e]/60 border border-[#271954] p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase font-black text-slate-400">Subscription Validity</span>
                  <span className="text-[10px] font-mono text-cyan-300">Expiry: {user.planExpiryDate || 'In 30 Days'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onExtendPlan(user.id, 7)}
                    className="py-1.5 px-2 bg-[#170e38] hover:bg-[#251558] border border-[#3b207e] text-purple-300 rounded-xl text-[10px] font-bold cursor-pointer transition-all text-center"
                  >
                    + 7 Days Grant
                  </button>
                  <button
                    onClick={() => onExtendPlan(user.id, 30)}
                    className="py-1.5 px-2 bg-[#170e38] hover:bg-[#251558] border border-[#3b207e] text-purple-300 rounded-xl text-[10px] font-bold cursor-pointer transition-all text-center"
                  >
                    + 30 Days Grant
                  </button>
                  <button
                    onClick={() => onExtendPlan(user.id, 90)}
                    className="py-1.5 px-2 bg-[#170e38] hover:bg-[#251558] border border-[#3b207e] text-purple-300 rounded-xl text-[10px] font-bold cursor-pointer transition-all text-center"
                  >
                    + 90 Days Grant
                  </button>
                </div>
              </div>

              {/* Pathway Service Access Toggles */}
              <div className="bg-[#110c2e]/60 border border-[#271954] p-4 rounded-2xl">
                <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5">
                  Platform Pathways Access Control
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'path1' as const, label: 'Path 1: Career & Jobs', color: 'blue' },
                    { key: 'path2' as const, label: 'Path 2: Skill Upgrades', color: 'purple' },
                    { key: 'path3' as const, label: 'Path 3: MSME & Udyam', color: 'emerald' },
                    { key: 'path4' as const, label: 'Path 4: Student Hub', color: 'indigo' },
                  ].map((svc) => (
                    <button
                      key={svc.key}
                      onClick={() => onToggleService(user.id, svc.key)}
                      className={`p-2.5 rounded-xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                        user.services[svc.key]
                          ? 'bg-purple-900/30 border-purple-500 text-purple-200'
                          : 'bg-[#100d28]/70 border-[#221644] text-slate-500'
                      }`}
                    >
                      <span className="text-[11px] font-bold">{svc.label}</span>
                      <span className={`w-2 h-2 rounded-full ${user.services[svc.key] ? 'bg-emerald-400 shadow-[0_0_8px_#00e676]' : 'bg-slate-700'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Administrative Permissions */}
              <div className="bg-[#110c2e]/60 border border-[#271954] p-4 rounded-2xl">
                <label className="block text-[10px] uppercase font-black text-slate-400 mb-2.5">
                  Administrative Delegations
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'canEditJobs' as const, label: 'Job Posting Creator Privileges' },
                    { key: 'canApproveApps' as const, label: 'Candidate Application Evaluator' },
                    { key: 'canViewFinance' as const, label: 'Super Admin Financial Ledger Visibility' },
                  ].map((perm) => (
                    <div key={perm.key} className="flex items-center justify-between p-2 rounded-xl bg-[#0c0822]/60 border border-[#221644]">
                      <span className="text-[11px] text-slate-300 font-medium">{perm.label}</span>
                      <button
                        onClick={() => onTogglePermission(user.id, perm.key)}
                        className={`w-8 h-4.5 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                          user.permissions[perm.key] ? 'bg-cyan-500' : 'bg-slate-800'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                          user.permissions[perm.key] ? 'translate-x-3.5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-Time Synced Module Status */}
              <div className="bg-[#110c2e]/60 border border-[#271954] p-4 rounded-2xl space-y-3">
                <label className="block text-[10px] uppercase font-black text-slate-400">
                  Cloud Synchronized Ecosystem State
                </label>
                
                {/* Gaming Arena Status */}
                <div className="p-2.5 rounded-xl bg-[#0c0822]/80 border border-[#221644] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                      <span>🎮 Arohi Exams & Gaming Arena</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {user.arenaStats 
                        ? `${user.arenaStats.coins.toLocaleString('en-IN')} Coins • ${user.arenaStats.gems} Gems • ${user.arenaStats.targetSubject || 'Grand Clash'}`
                        : 'Active player • Local progress tracking'}
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono font-bold">
                    Synced
                  </span>
                </div>

                {/* Mission 87 Status */}
                <div className="p-2.5 rounded-xl bg-[#0c0822]/80 border border-[#221644] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                      <span>🚀 Mission 87 Bharat Cadet</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {user.mission87 
                        ? `Cadet ID: ${user.mission87.cadetId} • ${user.mission87.primaryTrack} (${user.mission87.district}, ${user.mission87.state})`
                        : 'Cadet profile active & ready for state deployment'}
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono font-bold">
                    Synced
                  </span>
                </div>

                {/* Arohi ONE Business OS */}
                <div className="p-2.5 rounded-xl bg-[#0c0822]/80 border border-[#221644] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                      <span>💼 Arohi ONE Business OS</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {user.businessOs 
                        ? `${user.businessOs.companyName} • ${user.businessOs.leadsCount} Leads • ${user.businessOs.invoicesCount} Invoices`
                        : 'Unified ERP & CRM Workspace initialized'}
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono font-bold">
                    Synced
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: REAL PAYMENTS & INVOICES */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="bg-[#110c2e]/60 border border-[#271954] p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Spent Across Lifetime:</span>
                  <span className="text-xl font-black text-[#00e676] font-mono block mt-0.5">
                    ₹{totalLTV.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Transactions:</span>
                  <span className="text-sm font-bold text-white font-mono block mt-0.5">
                    {userPayments.length} Receipts
                  </span>
                </div>
              </div>

              {userPayments.length === 0 ? (
                <div className="bg-[#0e0a24]/60 border border-[#221644] p-8 rounded-2xl text-center text-slate-500 text-xs">
                  No verified payments on ledger for this aspirant account yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {userPayments.map((pmt) => (
                    <div key={pmt.id} className="bg-[#110c2e]/80 border border-[#2d1b64] p-4 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-xs">{pmt.planName}</div>
                          <span className="text-[10px] text-slate-400 font-mono">{pmt.date}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-[#00e676] font-mono">
                            ₹{pmt.amount}
                          </span>
                          <span className="text-[9px] text-slate-500 block font-mono">
                            {pmt.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-[#0a061c] p-2.5 rounded-xl text-[10px] font-mono">
                        <div>
                          <span className="text-slate-500 block">Payment Mode:</span>
                          <span className="text-cyan-300 font-bold">{pmt.realModeLabel || pmt.method}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">UTR / Gateway Ref:</span>
                          <span className="text-purple-300 font-bold break-all">{pmt.utr || pmt.gatewayOrderId || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => setSelectedInvoiceTxn(pmt)}
                          className="bg-[#1d143c] hover:bg-[#341d6e] border border-[#3d2780] text-cyan-300 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" /> View GST Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: USER ACTIVITY & INPUT TELEMETRY */}
          {activeTab === 'telemetry' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Granular User Actions Timeline
                </span>
                <span className="text-[10px] text-purple-400 font-mono">
                  {userTelemetry.length} Activities Recorded
                </span>
              </div>

              {userTelemetry.length === 0 ? (
                <div className="bg-[#0e0a24]/60 border border-[#221644] p-8 rounded-2xl text-center text-slate-500 text-xs">
                  No recorded activity events for this user in current telemetry session.
                </div>
              ) : (
                <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                  {userTelemetry.map((t) => (
                    <div key={t.id} className="bg-[#110c2e]/70 border border-[#24174c] p-3.5 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#1c1144] text-purple-300 border border-purple-500/30 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                            {t.module}
                          </span>
                          <span className="font-bold text-white text-xs">{t.actionTitle}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{t.timestamp}</span>
                      </div>

                      <div className="bg-[#070414] border border-[#1a1136] p-2.5 rounded-xl font-mono text-[11px] text-slate-200">
                        <span className="text-[8px] uppercase font-bold text-slate-500 block mb-0.5">Input:</span>
                        "{t.inputSnippet}"
                      </div>

                      {t.outputSnippet && (
                        <div className="text-[10px] text-slate-400 pl-1">
                          <strong className="text-emerald-400 font-semibold">Result: </strong>
                          {t.outputSnippet}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#0c0822] border-t border-[#2d1b64] flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono">
            User Record ID: {user.id}
          </span>
          <button
            onClick={onClose}
            className="bg-purple-700 hover:bg-purple-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            Close Console
          </button>
        </div>

      </div>

      {/* Embedded Invoice Modal if selected */}
      {selectedInvoiceTxn && (
        <TaxInvoiceModal
          transaction={selectedInvoiceTxn}
          onClose={() => setSelectedInvoiceTxn(null)}
        />
      )}
    </div>
  );
}
