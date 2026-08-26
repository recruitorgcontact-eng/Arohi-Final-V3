import React, { useState } from 'react';
import {
  Users,
  Plus,
  DollarSign,
  Briefcase,
  FileCheck,
  Building,
  Mail,
  Phone,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { Employee, PayrollRecord } from './types';

export default function HrPayrollView() {
  const { employees, payroll, generateMonthlyPayroll, showToast } = useBusinessOS();
  const [activeTab, setActiveTab] = useState<'employees' | 'payroll'>('employees');

  const totalMonthlyPayrollCost = employees.reduce((sum, e) => sum + e.monthlyCtc, 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              HR, Team Headcount & Automated Indian Payroll
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Employee records, statutory deductions (PF, TDS, PT), and 1-click salary slip generation
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-black/[0.04] dark:border-white/[0.06] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'employees'
                ? 'bg-white dark:bg-[#121214] text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Team Roster ({employees.length})
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'payroll'
                ? 'bg-white dark:bg-[#121214] text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Payroll & Slips ({payroll.length})
          </button>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-1 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Active Staff Count</span>
          <div className="text-xl font-bold text-zinc-900 dark:text-white">{employees.length} Employees</div>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">100% On-role</span>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-1 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Monthly Salary Outflow</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">₹{totalMonthlyPayrollCost.toLocaleString()}</div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Includes PF & TDS deductions</span>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-2 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div>
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Payroll Cycle</span>
            <div className="text-sm font-bold text-zinc-900 dark:text-white">February 2025</div>
          </div>
          <button
            onClick={() => generateMonthlyPayroll('February 2025')}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Process Payroll Batch</span>
          </button>
        </div>
      </div>

      {activeTab === 'employees' ? (
        /* Team Directory */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] hover:border-indigo-400 dark:hover:border-indigo-600 rounded-2xl p-4 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-xs">{emp.name}</h3>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">{emp.role}</p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="text-[11px]">Dept: <strong className="text-zinc-800 dark:text-zinc-200">{emp.department}</strong></div>
                <div className="text-[11px]">Code: <strong className="text-zinc-800 dark:text-zinc-200">{emp.employeeCode}</strong></div>
                <div className="text-[11px] truncate">Email: <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px]">{emp.email}</span></div>
              </div>

              <div className="pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex justify-between items-center text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Monthly CTC:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{emp.monthlyCtc.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Payroll Records Table */
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-50/80 dark:bg-[#18181b] border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Gross CTC</th>
                  <th className="py-3 px-4">Basic + HRA</th>
                  <th className="py-3 px-4">PF (₹1,800)</th>
                  <th className="py-3 px-4">TDS (10%)</th>
                  <th className="py-3 px-4">Net Take-home</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Payslip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
                {payroll.map((pay) => (
                  <tr key={pay.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-zinc-900 dark:text-white text-xs">{pay.employeeName}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">{pay.employeeCode} • {pay.role}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white text-xs">
                      ₹{pay.grossSalary.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400">
                      ₹{(pay.basicSalary + pay.hra).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-rose-600 dark:text-rose-400 font-mono">
                      -₹{pay.pfDeduction.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-rose-600 dark:text-rose-400 font-mono">
                      -₹{pay.tdsDeduction.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                      ₹{pay.netPay.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                        {pay.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => showToast(`Generating PDF Payslip for ${pay.employeeName} (${pay.monthYear})... Downloaded.`)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px] font-semibold cursor-pointer"
                      >
                        PDF Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
