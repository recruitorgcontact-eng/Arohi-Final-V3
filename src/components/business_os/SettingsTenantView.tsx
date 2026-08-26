import React, { useState } from 'react';
import {
  Building,
  ShieldCheck,
  Save,
  Users,
  Key,
  Globe,
  RotateCcw,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';

export default function SettingsTenantView() {
  const {
    companyProfile,
    updateCompanyProfile,
    roles,
    activeUserRole,
    setActiveUserRole,
    resetToSampleData,
    showToast
  } = useBusinessOS();

  const [name, setName] = useState(companyProfile.name);
  const [tagline, setTagline] = useState(companyProfile.tagline);
  const [gstin, setGstin] = useState(companyProfile.gstin);
  const [pan, setPan] = useState(companyProfile.pan);
  const [email, setEmail] = useState(companyProfile.email);
  const [phone, setPhone] = useState(companyProfile.phone);
  const [city, setCity] = useState(companyProfile.city);
  const [state, setState] = useState(companyProfile.state);
  const [bankAccount, setBankAccount] = useState(companyProfile.bankAccount);
  const [bankIfsc, setBankIfsc] = useState(companyProfile.bankIfsc);
  const [bankName, setBankName] = useState(companyProfile.bankName);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile({
      name,
      tagline,
      gstin,
      pan,
      email,
      phone,
      city,
      state,
      bankAccount,
      bankIfsc,
      bankName
    });
    showToast('Company settings updated successfully.');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 flex items-center justify-center">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Organization Settings & RBAC
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Configure GST profile, banking details, tenant metadata, and security permissions
            </p>
          </div>
        </div>

        <button
          onClick={resetToSampleData}
          className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left 8 cols: Company Profile & GST Settings */}
        <div className="lg:col-span-8 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">Company Identity & GST Registration</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Used across all Tax Invoices, Quotations, and PO documents</p>
          </div>

          <form onSubmit={handleSave} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-[10px]">Legal Entity Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white font-medium focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-[10px]">Company Tagline / Descriptor</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white font-medium focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-[10px]">GSTIN (15-Digit GST Number)</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-violet-600 dark:text-violet-400 font-mono font-bold focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-[10px]">PAN Number</label>
                <input
                  type="text"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-violet-600 dark:text-violet-400 font-mono font-bold focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-[10px]">Official Support Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white font-medium focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-[10px]">Primary Helpline Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white font-medium focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-[10px]">City / Location</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white font-medium focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase text-[10px]">State & State Code</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-zinc-900 dark:text-white font-medium focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Bank details */}
            <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Settlement Bank Account</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 font-bold">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2 text-zinc-900 dark:text-white font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 font-bold">Account Number</label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2 text-zinc-900 dark:text-white font-mono font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 font-bold">IFSC Code</label>
                  <input
                    type="text"
                    value={bankIfsc}
                    onChange={(e) => setBankIfsc(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2 text-zinc-900 dark:text-white font-mono font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Organization Settings</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 4 cols: Multi-Role RBAC Simulator */}
        <div className="lg:col-span-4 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">Active Session Role</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Switch view permissions instantly</p>
          </div>

          <div className="space-y-2">
            {roles.map((role) => (
              <div
                key={role.roleName}
                onClick={() => {
                  setActiveUserRole(role.roleName);
                  showToast(`Session switched to ${role.roleName} mode.`);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                  activeUserRole === role.roleName
                    ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-500 ring-1 ring-violet-500'
                    : 'bg-zinc-50/80 dark:bg-zinc-900/60 border-black/[0.06] dark:border-white/[0.08] hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{role.roleName}</h4>
                  {activeUserRole === role.roleName && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
                  )}
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug">{role.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-[10px] text-zinc-500 dark:text-zinc-400 space-y-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>SOC2 Type II & Indian DPDP Ready</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
